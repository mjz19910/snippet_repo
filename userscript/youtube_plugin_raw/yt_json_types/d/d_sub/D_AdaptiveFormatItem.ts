// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig
type D_AudioTrack={
	displayName: string;
	id: string;
	audioIsDefault: false;
};
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
	signatureCipher?: D_FormatItem_signatureCipher;
};
type D_FormatItem_signatureCipher=`s=${string}&sp=${"sig"}&url=https://rr${number}---sn-${string}n${string}.googlevideo.com/videoplayback%3Fexpire%3D${D_VPS_Req["expire"]}%26ei%3D${D_VPS_Req["ei"]}%26ip%3D${D_VPS_Req["ip"]}%26id%3D${D_VPS_Req["id"]}%26itag%3D${D_VPS_Req["itag"]}%26aitags%3D${NonNullable<D_VPS_Req["aitags"]>}%26source%3D${D_VPS_Req["source"]}%26requiressl%3D${D_VPS_Req["requiressl"]}%26mh%3D${D_VPS_Req["mh"]}%26mm%3D${D_VPS_Req["mm"]}%26mn%3D${D_VPS_Req["mn"]}%26ms%3D${D_VPS_Req["ms"]}%26mv%3D${D_VPS_Req["mv"]}%26mvi%3D${D_VPS_Req["mvi"]}%26pl%3D${D_VPS_Req["pl"]}%26initcwndbps%3D${D_VPS_Req["initcwndbps"]}%26spc%3D${D_VPS_Req["spc"]}%26vprv%3D${D_VPS_Req["vprv"]}%26mime%3D${D_VPS_Req["mime"]}%26ns%3D${D_VPS_Req["ns"]}%26gir%3D${D_VPS_Req["gir"]}%26clen%3D${D_VPS_Req["clen"]}%26dur%3D${D_VPS_Req["dur"]}%26lmt%3D${D_VPS_Req["lmt"]}%26mt%3D${D_VPS_Req["mt"]}%26fvip%3D${D_VPS_Req["fvip"]}%26keepalive%3D${D_VPS_Req["keepalive"]}%26fexp%3D${D_VPS_Req["fexp"]}%26c%3D${D_VPS_Req["c"]}%26txp%3D${D_VPS_Req["txp"]}%26n%3D${D_VPS_Req["n"]}%26sparams%3D${D_VPS_Req["sparams"]}%26sig%3D${D_VPS_Req["sig"]}%26lsparams%3D${D_VPS_Req["lsparams"]}%26lsig%3D${D_VPS_Req["lsig"]}`;
