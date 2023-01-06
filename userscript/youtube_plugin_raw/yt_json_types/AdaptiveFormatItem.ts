type AudioQuality="AUDIO_QUALITY_MEDIUM";

type AdaptiveFormatItem={
  itag: FormatItag;
  url: string;
  mimeType: string;
  bitrate: number;
  initRange: YtRange;
  indexRange: YtRange;
  lastModified: `${number}`;
  contentLength: `${number}`;
  quality: "tiny";
  projectionType: "RECTANGULAR";
  averageBitrate: number;
  highReplication: true;
  audioQuality: AudioQuality;
  approxDurationMs: `${number}`;
  audioSampleRate: `${44100}`;
  audioChannels: 2;
  // {start:-13.83;end:-13.83;}
  loudnessDb: number;
};