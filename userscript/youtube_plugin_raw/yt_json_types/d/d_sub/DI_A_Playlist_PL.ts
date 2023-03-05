type DI_A_Playlist_PL={
	type: "playlist_id";
	tag: "PL";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<T_IdTemplate<"PL">>>,
		{id: string;},
	];
};