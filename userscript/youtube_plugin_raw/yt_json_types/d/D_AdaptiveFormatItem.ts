type D_AdaptiveFormatItem={
	itag: number;
	url?: string;
	mimeType: G_MimeTypeFormat;
	bitrate: number;
	width?: number;
	height?: number;
	initRange: D_Range;
	indexRange: D_Range;
	lastModified: string;
	contentLength: string;
	quality: G_FormatQuality;
	fps?: D_FormatFps;
	qualityLabel?: QualityLabel;
	projectionType: "RECTANGULAR";
	averageBitrate: number;
	colorInfo?: D_FormatColorInfo;
	highReplication?: true,
	audioQuality?: "AUDIO_QUALITY_MEDIUM";
	approxDurationMs: `${number}`;
	audioSampleRate?: `${D$AudioSampleRate}`;
	audioChannels?: 2;
	loudnessDb?: number;
	signatureCipher?: `s=${string}&sp=${"sig"}&url=${string}`;
};
type QualArr=[
	...make_qual_for_fps<50>,
	...make_qual_for_fps<60>,
	"1080p","720p","480p","360p","240p","144p",
];
type make_qual_for_fps<T extends 50|60>=[`2160p${T}`,`1440p${T}`,`1080p${T}`,`720p${T}`,];
type QualityLabel=QualArr[number];