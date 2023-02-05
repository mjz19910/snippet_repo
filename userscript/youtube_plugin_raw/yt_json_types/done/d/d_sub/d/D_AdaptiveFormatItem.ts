// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig

type D_FormatItem_url=`https://rr5---sn-nx5s7nel.googlevideo.com/videoplayback?${D_VideoPlayback_SearchParams}`;
type D_AdaptiveFormatItem={
	itag: number;
	url?: D_FormatItem_url;
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
	highReplication?: true;
	audioQuality?: "AUDIO_QUALITY_MEDIUM"|"AUDIO_QUALITY_LOW";
	approxDurationMs: `${number}`;
	audioSampleRate?: `${D_AudioSampleRate}`;
	audioChannels?: 2;
	loudnessDb?: number;
	signatureCipher?: D_FormatItem_signatureCipher;
};
type D_FormatItem_signatureCipher=`s=${string}&sp=${"sig"}&url=https://rr3---sn-nx57ynsl.googlevideo.com/videoplayback%3Fexpire%3D%24%7BD_VideoPlaybackShape%5B%22expire%22%5D%7D%26ei%3D%24%7BD_VideoPlaybackShape%5B%22ei%22%5D%7D%26ip%3D%24%7BD_VideoPlaybackShape%5B%22ip%22%5D%7D%26id%3D%24%7BD_VideoPlaybackShape%5B%22id%22%5D%7D%26itag%3D%24%7BD_VideoPlaybackShape%5B%22itag%22%5D%7D%26aitags%3D%24%7BD_VideoPlaybackShape%5B%22aitags%22%5D%7D%26source%3D%24%7BD_VideoPlaybackShape%5B%22source%22%5D%7D%26requiressl%3D%24%7BD_VideoPlaybackShape%5B%22requiressl%22%5D%7D%26mh%3D%24%7BD_VideoPlaybackShape%5B%22mh%22%5D%7D%26mm%3D%24%7BD_VideoPlaybackShape%5B%22mm%22%5D%7D%26mn%3D%24%7BD_VideoPlaybackShape%5B%22mn%22%5D%7D%26ms%3D%24%7BD_VideoPlaybackShape%5B%22ms%22%5D%7D%26mv%3D%24%7BD_VideoPlaybackShape%5B%22mv%22%5D%7D%26mvi%3D%24%7BD_VideoPlaybackShape%5B%22mvi%22%5D%7D%26pl%3D%24%7BD_VideoPlaybackShape%5B%22pl%22%5D%7D%26initcwndbps%3D%24%7BD_VideoPlaybackShape%5B%22initcwndbps%22%5D%7D%26spc%3D%24%7BD_VideoPlaybackShape%5B%22spc%22%5D%7D%26vprv%3D%24%7BD_VideoPlaybackShape%5B%22vprv%22%5D%7D%26mime%3D%24%7BD_VideoPlaybackShape%5B%22mime%22%5D%7D%26ns%3D%24%7BD_VideoPlaybackShape%5B%22ns%22%5D%7D%26gir%3D%24%7BD_VideoPlaybackShape%5B%22gir%22%5D%7D%26clen%3D%24%7BD_VideoPlaybackShape%5B%22clen%22%5D%7D%26dur%3D%24%7BD_VideoPlaybackShape%5B%22dur%22%5D%7D%26lmt%3D%24%7BD_VideoPlaybackShape%5B%22lmt%22%5D%7D%26mt%3D%24%7BD_VideoPlaybackShape%5B%22mt%22%5D%7D%26fvip%3D%24%7BD_VideoPlaybackShape%5B%22fvip%22%5D%7D%26keepalive%3D%24%7BD_VideoPlaybackShape%5B%22keepalive%22%5D%7D%26fexp%3D%24%7BD_VideoPlaybackShape%5B%22fexp%22%5D%7D%26c%3D%24%7BD_VideoPlaybackShape%5B%22c%22%5D%7D%26txp%3D%24%7BD_VideoPlaybackShape%5B%22txp%22%5D%7D%26n%3D%24%7BD_VideoPlaybackShape%5B%22n%22%5D%7D%26sparams%3D%24%7BD_VideoPlaybackShape%5B%22sparams%22%5D%7D%26sig%3D%24%7BD_VideoPlaybackShape%5B%22sig%22%5D%7D%26lsparams%3D%24%7BD_VideoPlaybackShape%5B%22lsparams%22%5D%7D%26lsig%3D%24%7BD_VideoPlaybackShape%5B%22lsig%22%5D%7D`;
