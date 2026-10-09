import { useEffect, useRef, useState } from 'react';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_090628_7052d8a6-a094-4341-a4a2-ad58493a67a9.mp4';

const MAX_CAPTURE_WIDTH = 960;
const FPS = 30;

export default function BoomerangVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [ready, setReady] = useState(false);

  // Play the video once, capturing every frame to offscreen canvases.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const frames: HTMLCanvasElement[] = [];
    const hasVFC = 'requestVideoFrameCallback' in HTMLVideoElement.prototype;
    let capturing = true;
    let scheduled = false;
    let lastTime = -1;
    let rafId = 0;
    let vfcId = 0;

    const captureFrame = () => {
      const { videoWidth, videoHeight, currentTime } = video;
      if (!videoWidth || !videoHeight || currentTime === lastTime) return;
      lastTime = currentTime;

      const width = Math.min(videoWidth, MAX_CAPTURE_WIDTH);
      const height = Math.round((videoHeight * width) / videoWidth);
      const frame = document.createElement('canvas');
      frame.width = width;
      frame.height = height;
      frame.getContext('2d')?.drawImage(video, 0, 0, width, height);
      frames.push(frame);
    };

    const tick = () => {
      if (!capturing) return;
      captureFrame();
      schedule();
    };

    const schedule = () => {
      if (!capturing) return;
      if (hasVFC) vfcId = video.requestVideoFrameCallback(tick);
      else rafId = requestAnimationFrame(tick);
    };

    const stopCapture = () => {
      capturing = false;
      if (hasVFC && vfcId) video.cancelVideoFrameCallback(vfcId);
      if (rafId) cancelAnimationFrame(rafId);
    };

    const onPlay = () => {
      if (scheduled) return;
      scheduled = true;
      schedule();
    };

    const onEnded = () => {
      stopCapture();
      if (frames.length > 0) {
        framesRef.current = frames;
        setReady(true);
      }
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('ended', onEnded);
    video.currentTime = 0;
    video.play().catch(() => {});

    return () => {
      stopCapture();
      video.removeEventListener('play', onPlay);
      video.removeEventListener('ended', onEnded);
      video.pause();
    };
  }, []);

  // Ping-pong the captured frames on the display canvas at 30fps.
  useEffect(() => {
    if (!ready) return;
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || frames.length === 0) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;

    const interval = 1000 / FPS;
    const last = frames.length - 1;
    let index = 0;
    let direction = 1;
    let lastDraw = 0;
    let rafId = 0;

    const render = (now: number) => {
      if (now - lastDraw >= interval) {
        lastDraw = now - ((now - lastDraw) % interval);
        ctx.drawImage(frames[index], 0, 0);

        if (last > 0) {
          index += direction;
          if (index >= last) {
            index = last;
            direction = -1;
          } else if (index <= 0) {
            index = 0;
            direction = 1;
          }
        }
      }
      rafId = requestAnimationFrame(render);
    };

    ctx.drawImage(frames[0], 0, 0);
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full scale-[1.15] origin-top overflow-hidden">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-top"
          style={{ display: ready ? 'none' : undefined }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover object-top"
          style={{ display: ready ? undefined : 'none' }}
        />
      </div>
    </div>
  );
}
