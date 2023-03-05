type DI_A_Playlist_RD_CM_UC={
	type: "playlist_id";
	tag: "RD:CM:UC";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<`RDCMUC${string}`>>,
		{id: string;},
	];
};
