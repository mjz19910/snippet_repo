// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig
type D_AudioTrack={
	displayName: string;
	id: string;
	audioIsDefault: false;
};
type D_AdaptiveFormatItem={
	itag: number;
	url?: GU_VideoPlaybackUrl;
	mimeType: G_MimeTypeFormat;
	bitrate: number;
	width?: number;
	height?: number;
	initRange: D_Range;
	indexRange: D_Range;
	lastModified: string;
	contentLength: string;
	quality: G_FormatQuality;
	xtags?: string;
	fps?: D_FormatFps;
	qualityLabel?: D_QualityLabel;
	projectionType: "RECTANGULAR";
	audioTrack?: D_AudioTrack;
	averageBitrate?: number;
	colorInfo?: D_FormatColorInfo;
	highReplication?: true;
	audioQuality?: "AUDIO_QUALITY_MEDIUM"|"AUDIO_QUALITY_LOW";
	approxDurationMs: `${number}`;
	audioSampleRate?: `${D_AudioSampleRate}`;
	audioChannels?: 2;
	loudnessDb?: number;
	signatureCipher?: D_FormatItem_SignatureCipher_SP;
	targetDurationSec?: 1;
	maxDvrDurationSec?: 43200;
};