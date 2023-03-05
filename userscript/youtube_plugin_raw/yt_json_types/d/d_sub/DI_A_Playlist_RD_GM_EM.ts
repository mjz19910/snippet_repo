type DI_A_Playlist_RD_GM_EM={
	type: "playlist_id";
	tag: "RD:GM:EM";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<`RDGMEM${string}`>>,
		{id: string;},
	];
};