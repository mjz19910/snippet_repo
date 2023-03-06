type DI_A_Playlist_RD_CM_UC={
	type: "playlist_id";
	tag: "RD:CM:UC";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`RDCMUC${string}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,
	];
};
