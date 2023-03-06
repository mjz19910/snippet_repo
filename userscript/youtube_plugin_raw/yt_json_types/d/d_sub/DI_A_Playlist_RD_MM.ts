type DI_A_Playlist_RD_MM={
	type: "playlist_id";
	tag: "RD:MM";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<`RDMM${string}`>>,
		DIT_Item_A<"id",DIT_Prim<string>>,
	];
};