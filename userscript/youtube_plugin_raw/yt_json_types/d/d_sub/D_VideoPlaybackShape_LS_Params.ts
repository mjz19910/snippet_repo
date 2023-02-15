// cSpell:ignoreRegExp /"sn-(?:nx57yn(?:lk|sl)|n4v7sn(?:ls|ly))"/
type G_VideoHostnames_Gen_0=T_Split<D_googlevideo_host_9gv7ln[number],".">[0];
type G_VideoHostnames_Gen_1=T_Split<D_googlevideo_host_p5qs7n[number],".">[0];
type G_VideoHostnames_Gen=G_VideoHostnames_Gen_0|G_VideoHostnames_Gen_1;
type G_VideoHostnames=|G_VideoHostnames_U|G_VideoHostnames_Gen;
type G_VideoHostnames_U=
	|"sn-n4v7snls"
	|"sn-n4v7snly"
	;
;
type D_VideoPlaybackShape_LS_Params={
	mh: "B2";
	mm: `${31},${26}`;
	// cspell:disable-next
	mn: `${G_VideoHostnames},${G_VideoHostnames}`;
	ms: "au,onr";
	mv: "m";
	mvi: "3";
	pl: "24";
	// cspell:disable-next
	initcwndbps: `${number}`;
};
