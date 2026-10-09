import { useEffect, useRef, useState } from 'react';
import MP4Box, { type MP4ArrayBuffer, type MP4Sample, type MP4VideoTrack } from 'mp4box';

const LERP_TAU = 8;
const SNAP = 0.002;
const LRU_MAX = 24;
const LEAD = 24;
const WATCHDOG = 60000;

interface BankFrame {
  ts: number; // microseconds
  blob: Blob;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const nextTick = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function getDescription(file: ReturnType<typeof MP4Box.createFile>, trackId: number) {
  const trak = file.getTrackById(trackId);
  for (const entry of trak.mdia.minf.stbl.stsd.entries) {
    const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
    if (box) {
      const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
      box.write(stream);
      return new Uint8Array(stream.buffer, 8); // strip the box header
    }
  }
  return undefined;
}

function demux(buffer: ArrayBuffer) {
  return new Promise<{ track: MP4VideoTrack; samples: MP4Sample[]; description?: Uint8Array }>(
    (resolve, reject) => {
      const file = MP4Box.createFile();
      const samples: MP4Sample[] = [];
      let track: MP4VideoTrack | undefined;

      file.onError = (e) => reject(new Error(e));
      file.onReady = (info) => {
        track = info.videoTracks[0];
        if (!track) {
          reject(new Error('No video track'));
          return;
        }
        file.setExtractionOptions(track.id, null, { nbSamples: Infinity });
        file.start();
      };
      file.onSamples = (_id, _user, batch) => {
        samples.push(...batch);
      };

      const data = buffer.slice(0) as MP4ArrayBuffer;
      data.fileStart = 0;
      file.appendBuffer(data);
      file.flush();

      if (!track) {
        reject(new Error('MP4 not ready'));
        return;
      }
      resolve({ track, samples, description: getDescription(file, track.id) });
    },
  );
}

async function decodeToBank(
  buffer: ArrayBuffer,
  hardwareAcceleration: HardwareAcceleration,
  isCancelled: () => boolean,
): Promise<BankFrame[]> {
  const { track, samples, description } = await demux(buffer);

  const config: VideoDecoderConfig = {
    codec: track.codec,
    codedWidth: track.video.width,
    codedHeight: track.video.height,
    description,
    hardwareAcceleration,
  };
  const support = await VideoDecoder.isConfigSupported(config);
  if (!support.supported) throw new Error(`Unsupported codec ${track.codec}`);

  const bank: BankFrame[] = [];
  const pendingBlobs = new Set<Promise<void>>();
  let decodeError: unknown = null;

  const decoder = new VideoDecoder({
    output: (frame) => {
      const ts = frame.timestamp;
      const canvas = document.createElement('canvas');
      canvas.width = frame.displayWidth;
      canvas.height = frame.displayHeight;
      canvas.getContext('2d')?.drawImage(frame, 0, 0);
      frame.close();

      const job = new Promise<void>((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) bank.push({ ts, blob });
            resolve();
          },
          'image/webp',
          0.82,
        );
      });
      pendingBlobs.add(job);
      job.then(() => pendingBlobs.delete(job));
    },
    error: (e) => {
      decodeError = e;
    },
  });
  decoder.configure(config);

  try {
    for (const sample of samples) {
      if (isCancelled()) throw new Error('cancelled');
      if (decodeError) throw decodeError;

      // Keep decode from running too far ahead of blob encoding.
      while (decoder.decodeQueueSize + pendingBlobs.size > LEAD) {
        await nextTick();
        if (isCancelled()) throw new Error('cancelled');
        if (decodeError) throw decodeError;
      }

      decoder.decode(
        new EncodedVideoChunk({
          type: sample.is_sync ? 'key' : 'delta',
          timestamp: (sample.cts * 1e6) / sample.timescale,
          duration: (sample.duration * 1e6) / sample.timescale,
          data: sample.data,
        }),
      );
    }

    await decoder.flush();
    await Promise.all(pendingBlobs);
    if (decodeError) throw decodeError;
    if (bank.length === 0) throw new Error('No frames decoded');
  } finally {
    if (decoder.state !== 'closed') decoder.close();
  }

  bank.sort((a, b) => a.ts - b.ts);
  return bank;
}

export function useVideoScrub(videoSrc: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [canvasLive, setCanvasLive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!video || !canvas || !ctx) return;

    const state = {
      bank: [] as BankFrame[],
      lru: new Map<number, ImageBitmap | null>(),
      current: 0,
      target: 0,
      ready: false,
      reverted: false,
      painted: false,
      building: false,
      dur: 0,
      lastDrawn: -1,
      span: 1,
      disposed: false,
    };

    // ---- Scroll progress ----
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      state.span = Math.max(1, container.offsetHeight - window.innerHeight);
    };
    const getProgress = () => Math.min(1, Math.max(0, window.scrollY / state.span));
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', measure);

    // ---- Duration ----
    const onMeta = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) state.dur = video.duration;
    };
    onMeta();
    video.addEventListener('loadedmetadata', onMeta);
    video.addEventListener('durationchange', onMeta);

    // ---- Frame bank lookup ----
    const nearestIndex = (t: number) => {
      const { bank } = state;
      const us = t * 1e6;
      let lo = 0;
      let hi = bank.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (bank[mid].ts < us) lo = mid + 1;
        else hi = mid;
      }
      if (lo > 0 && Math.abs(bank[lo - 1].ts - us) <= Math.abs(bank[lo].ts - us)) return lo - 1;
      return lo;
    };

    const warmLRU = (i: number) => {
      const { bank, lru } = state;
      for (let j = i - 1; j <= i + 2; j++) {
        if (j < 0 || j >= bank.length) continue;
        if (lru.has(j)) {
          // Refresh recency.
          const v = lru.get(j)!;
          lru.delete(j);
          lru.set(j, v);
          continue;
        }
        lru.set(j, null);
        createImageBitmap(bank[j].blob)
          .then((bmp) => {
            if (state.disposed || !lru.has(j)) {
              bmp.close();
              return;
            }
            lru.set(j, bmp);
          })
          .catch(() => lru.delete(j));
      }
      while (lru.size > LRU_MAX) {
        const oldest = lru.keys().next().value as number;
        lru.get(oldest)?.close();
        lru.delete(oldest);
      }
    };

    const drawFrame = (t: number) => {
      const i = nearestIndex(t);
      warmLRU(i);
      if (i === state.lastDrawn) return;
      const bmp = state.lru.get(i);
      if (!bmp) return;
      ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
      state.lastDrawn = i;
      if (!state.painted) {
        state.painted = true;
        setCanvasLive(true);
      }
    };

    // ---- rAF loop ----
    let rafId = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;

      const p = getProgress();
      setScrollProgress(p);

      if (state.dur > 0) {
        state.target = p * state.dur;
        if (prefersReducedMotion()) {
          state.current = state.target;
        } else {
          state.current += (state.target - state.current) * (1 - Math.exp(-dt * LERP_TAU));
          if (Math.abs(state.target - state.current) < SNAP) state.current = state.target;
        }

        if (state.ready) {
          drawFrame(state.current);
        } else if (!video.seeking && Math.abs(video.currentTime - state.current) > 0.01) {
          video.currentTime = state.current;
        }
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ---- Frame bank build ----
    let watchdog = 0;
    const revert = () => {
      state.reverted = true;
      state.ready = false;
      state.building = false;
      setCanvasLive(false);
    };

    const build = async () => {
      if (prefersReducedMotion() || typeof VideoDecoder === 'undefined') return;
      state.building = true;
      watchdog = window.setTimeout(() => {
        if (!state.ready) revert();
      }, WATCHDOG);

      const isCancelled = () => state.disposed || state.reverted;

      try {
        const res = await fetch(videoSrc, { mode: 'cors' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();

        let bank: BankFrame[];
        try {
          bank = await decodeToBank(buffer, 'no-preference', isCancelled);
        } catch (err) {
          if (isCancelled()) throw err;
          bank = await decodeToBank(buffer, 'prefer-software', isCancelled);
        }

        if (isCancelled()) return;
        state.bank = bank;
        if (!state.dur && bank.length) state.dur = bank[bank.length - 1].ts / 1e6;
        state.ready = true;
        state.building = false;
        window.clearTimeout(watchdog);
      } catch {
        if (!state.disposed) revert();
        window.clearTimeout(watchdog);
      }
    };

    const onLoad = () => void build();
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    return () => {
      state.disposed = true;
      cancelAnimationFrame(rafId);
      window.clearTimeout(watchdog);
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', measure);
      window.removeEventListener('load', onLoad);
      video.removeEventListener('loadedmetadata', onMeta);
      video.removeEventListener('durationchange', onMeta);
      state.lru.forEach((bmp) => bmp?.close());
      state.lru.clear();
    };
  }, [videoSrc]);

  return { containerRef, videoRef, canvasRef, scrollProgress, canvasLive };
}
