declare module 'mp4box' {
  export interface MP4ArrayBuffer extends ArrayBuffer {
    fileStart: number;
  }

  export interface MP4VideoTrack {
    id: number;
    codec: string;
    timescale: number;
    duration: number;
    nb_samples: number;
    video: { width: number; height: number };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    videoTracks: MP4VideoTrack[];
  }

  export interface MP4Sample {
    number: number;
    track_id: number;
    timescale: number;
    cts: number;
    dts: number;
    duration: number;
    is_sync: boolean;
    data: Uint8Array;
  }

  export interface MP4Box {
    write(stream: DataStream): void;
  }

  export interface MP4SampleEntry {
    avcC?: MP4Box;
    hvcC?: MP4Box;
    vpcC?: MP4Box;
    av1C?: MP4Box;
  }

  export interface MP4Trak {
    mdia: { minf: { stbl: { stsd: { entries: MP4SampleEntry[] } } } };
  }

  export interface MP4File {
    onReady?: (info: MP4Info) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: unknown, samples: MP4Sample[]) => void;
    appendBuffer(data: MP4ArrayBuffer): number;
    start(): void;
    stop(): void;
    flush(): void;
    getTrackById(id: number): MP4Trak;
    setExtractionOptions(id: number, user?: unknown, options?: { nbSamples?: number; rapAlignement?: boolean }): void;
  }

  export class DataStream {
    static BIG_ENDIAN: boolean;
    static LITTLE_ENDIAN: boolean;
    constructor(arrayBuffer?: ArrayBuffer, byteOffset?: number, endianness?: boolean);
    buffer: ArrayBuffer;
  }

  export function createFile(): MP4File;

  const MP4BoxModule: {
    createFile: typeof createFile;
    DataStream: typeof DataStream;
  };
  export default MP4BoxModule;
}
