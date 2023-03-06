type DI_A_Playlist_PL={
	type: "playlist_id";
	tag: "PL";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<T_IdTemplate<"PL">>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,
	];
};