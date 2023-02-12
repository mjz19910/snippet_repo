type RE_D_VE3832_PreconnectUrl=
	|"https://rr1---sn-nx5s7n7s.googlevideo.com/generate_204"
	|"https://rr2---sn-nx57ynsz.googlevideo.com/generate_204"
	|"https://rr3---sn-nx5s7n7d.googlevideo.com/generate_204"
	|"https://rr3---sn-nx5s7nee.googlevideo.com/generate_204"
	|"https://rr4---sn-nx5s7nel.googlevideo.com/generate_204"
	|"https://rr4---sn-nx57ynsd.googlevideo.com/generate_204"
	|"https://rr5---sn-nx5s7n7y.googlevideo.com/generate_204"
	|"https://rr5---sn-nx57ynsk.googlevideo.com/generate_204"
	;
;
type RE_D_GoogleVideoUrl_Hostname=UrlParse<RE_D_VE3832_PreconnectUrl|Extract<D_UrlFormat,`https://${string}.googlevideo.com/${string}`>>["host"];