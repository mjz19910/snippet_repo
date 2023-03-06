type DI_A_Playlist_RD={
	type: "playlist_id";
	tag: "RD";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`RD${string}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,
	];
};