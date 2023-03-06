type DI_A_Playlist_RD_GM_EM={
	type: "playlist_id";
	tag: "RD:GM:EM";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`RDGMEM${string}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,
	];
};