type DI_A_Playlist_RD={
	type: "playlist_id";
	tag: "RD";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<`RD${string}`>>,
		DIT_Item_A<"id",DIT_Prim<string>>,
	];
};