type acv1_codec=`avc1.${string}`;
type AdaptiveFormatItem={
	itag: FormatItag;
	url?: string;
	mimeType: `${"video/mp4"}; codecs="${acv1_codec}"`;
	bitrate: number;
	width?: number;
	height?: number;
	initRange: YtRange;
	indexRange: YtRange;
	lastModified: string;
	contentLength: string;
	quality: FormatQuality;
	fps?: FormatFps;
	qualityLabel?: QualityLabel;
	projectionType: "RECTANGULAR";
	averageBitrate: number;
	colorInfo?: FormatColorInfo;
	highReplication?: true,
	audioQuality?: "AUDIO_QUALITY_MEDIUM";
	approxDurationMs: `${number}`;
	audioSampleRate?: `${AudioSampleRate}`;
	audioChannels?: 2;
	loudnessDb?: number;
	signatureCipher?: `s=${string}&sp=${"sig"}&url=${string}`;
};