type DI_A_Playlist_PL={
	b: "playlist_id";
	tag: "PL";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_IdTemplate<"PL">>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>,
	];
};