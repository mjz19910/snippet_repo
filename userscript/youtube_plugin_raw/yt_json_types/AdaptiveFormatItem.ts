type AudioQuality="AUDIO_QUALITY_MEDIUM";

type Format140={
  itag: 140;
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

type Format137={
  itag: 137;
  url: string;
  mimeType: string;
  bitrate: number;
  width: number;
  height: number;
  initRange: YtRange;
  indexRange: YtRange;
  lastModified: `${number}`;
  contentLength: `${number}`;
  quality: "hd1080";
  fps: 30;
  qualityLabel: "1080p";
  projectionType: "RECTANGULAR";
  averageBitrate: number;
  approxDurationMs: `${number}`;
};
type AdaptiveFormatItem=Format140|Format137;