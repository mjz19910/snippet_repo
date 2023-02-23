type D_MacroMarkersInfoItem={
	infoText: G_Text;
	menu: R_Menu;
};
type R_MacroMarkersInfoItem={macroMarkersInfoItemRenderer: D_MacroMarkersInfoItem;};
type D_GoogleVideoHostPartitionRet<T extends D_GoogleVideoPathname>={
	host: `rr${number}---sn-${string}n${string}.googlevideo.com`;
	path: T;
	parts: ["rr",`${number}`,"---","sn","-",G_Gv_0,"n",G_Gv_1,".","googlevideo",".","com"];
	partitioned: D_GoogleVideoHostPartition;
};
type D_GoogleVideoPathname=UrlParse<RE_D_GoogleVideoUrl>["pathname"];
type D_InitPlayback={
	source: "youtube";
	oeis: "1";
	c: "WEB";
	oad: "3200";
	ovd: "3200";
	oaad: "11000";
	oavd: "11000";
	ocs: "700";
	oewis: "1";
	oputc: "1";
	ofpcc: "1";
	msp: "1";
	odepv: "1";
	id: "55c84a1a739ba4f3";
	ip: `${number}.${number}.${number}.${number}`;
	initcwndbps: "581250";
	mt: "1677051923";
	oweuc: "";
};