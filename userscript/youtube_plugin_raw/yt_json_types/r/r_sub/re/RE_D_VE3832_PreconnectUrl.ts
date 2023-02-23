type RE_D_VE3832_PreconnectUrl=`https://rr${number}---sn-${string}n${string}.googlevideo.com/generate_204`;
type RE_D_GoogleVideoUrl_Hostname=UrlParse<RE_D_GoogleVideoUrl>["host"];
type RE_D_GoogleVideoUrl=
	|RE_D_VE3832_PreconnectUrl
	|GU_GoodPut_ProbeUrl
	|GU_InitPlaybackUrl
	|GU_VideoPlaybackUrl
	;
;
