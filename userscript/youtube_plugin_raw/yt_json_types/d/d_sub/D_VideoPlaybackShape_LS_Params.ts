// cSpell:ignoreRegExp /"sn-(?:9gv7ln.{2})"/
// cSpell:ignoreRegExp /"sn-(?:n4v7sn.{2})"/
// cSpell:ignoreRegExp /"sn-(?:nx57yn.{2})"/
// cSpell:ignoreRegExp /"sn-(?:q4flrn.{2})"/
// cSpell:ignoreRegExp /"sn-(?:o097zn.{2})"/
// cSpell:ignore googlevideo_host_q4flrn
type G_VideoHostnames_Gen_0=T_Split<D_GV_o097zn[number],".">[0];
type G_VideoHostnames_Gen=
	|"sn-9gv7lnes"|"sn-9gv7lnez"|"sn-9gv7lnle"|"sn-9gv7lns7"
	|"sn-n4v7snee"|"sn-n4v7sney"|"sn-n4v7snl7"|"sn-n4v7snll"|"sn-n4v7snlr"|"sn-n4v7snls"|"sn-n4v7snly"|"sn-n4v7sns7"|"sn-n4v7snse"
	|"sn-nx57ynlk"|"sn-nx57ynsd"|"sn-nx57ynse"|"sn-nx57ynsk"|"sn-nx57ynsl"|"sn-nx57ynss"|"sn-nx57ynsz"
	|"sn-p5qs7n6d"|"sn-p5qs7nsk"|"sn-p5qs7nsr"|"sn-p5qs7nzk"|"sn-p5qs7nzr"|"sn-p5qs7nzy"
	|"sn-q4flrn7k"|"sn-q4flrn7r"|"sn-q4flrn7y"
	|"sn-q4flrne6"|"sn-q4flrne7"|"sn-q4flrnee"|"sn-q4flrnek"|"sn-q4flrnel"|"sn-q4flrner"|"sn-q4flrnes"|"sn-q4flrney"|"sn-q4flrnez"
	|"sn-q4flrnl6"|"sn-q4flrnl7"|"sn-q4flrnld"|"sn-q4flrnle"|"sn-q4flrnlz"
	|"sn-q4flrnsd"|"sn-q4flrnsk"|"sn-q4flrnsl"|"sn-q4flrnss"
	|"sn-tt1e7n7k"|"sn-tt1e7nls"|"sn-tt1e7nlz"
	|"sn-o097znsd"|"sn-o097znse"|"sn-o097znsk"|"sn-o097znsl"|"sn-o097znsr"|"sn-o097znss"|"sn-o097znsz"
	|"sn-o097znz7"|"sn-o097znzd"|"sn-o097znze"|"sn-o097znzk"|"sn-o097znzr"
	;
;
type G_VideoHostnames=G_VideoHostnames_Gen;
type D_VideoPlaybackShape_LS_Params={
	mh: "B2";
	mm: `${31},${26}`;
	// cspell:disable-next
	mn: `${G_VideoHostnames}`;
	ms: "au,onr";
	mv: "m";
	mvi: "3";
	pl: "24";
	// cspell:disable-next
	initcwndbps: `${number}`;
};
