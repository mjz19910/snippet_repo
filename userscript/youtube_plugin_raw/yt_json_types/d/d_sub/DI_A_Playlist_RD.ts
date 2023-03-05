type DI_A_Playlist_RD={
	type: "playlist_id";
	tag: "RD";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<`RD${string}`>>,
		{id: string;},
	];
};