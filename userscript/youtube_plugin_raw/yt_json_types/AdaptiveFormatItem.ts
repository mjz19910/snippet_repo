type FormatItag=[133,134,135,136,140,160,242,243,244,247,249,250,251,278,298,299,302,303,308,315][number];

type AdaptiveFormatItem={
	itag: FormatItag;
	url: string;
	mimeType: string;
	bitrate: number;
	width: number;
	height: number;
	initRange: YtRange;
	indexRange: YtRange;
	lastModified: string;
	contentLength: string;
	quality: FormatQuality;
	fps: FormatFps;
	qualityLabel?: QualityLabel;
	projectionType: "RECTANGULAR";
	averageBitrate: number;
	colorInfo?: FormatColorInfo;
	approxDurationMs: `${number}`;
};
type QualityLabel=["2160p50","1440p50","1080p50","720p","720p50","480p","360p","240p","144p"][number];