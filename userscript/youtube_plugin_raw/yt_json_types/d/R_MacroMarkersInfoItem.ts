type D_MacroMarkersInfoItem={
	infoText: G_Text;
	menu: R_Menu;
};
type R_MacroMarkersInfoItem={macroMarkersInfoItemRenderer: D_MacroMarkersInfoItem;};
type D_GoogleVideoHostPartitionRet={
	host: `rr${number}---sn-${string}n${string}.googlevideo.com`;
	path: "/generate_204";
	parts: ["rr",`${number}`,"---","sn","-",G_Gv_0,"n",G_Gv_1,".","googlevideo",".","com"];
	partitioned: D_GoogleVideoHostPartition;
};