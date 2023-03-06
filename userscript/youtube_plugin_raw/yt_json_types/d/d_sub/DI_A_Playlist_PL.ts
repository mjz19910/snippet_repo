type DI_A_Playlist_PL={
	b: "playlist_id";
	c: "PL";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<T_IdTemplate<"PL">>>,
		DIT_Item_AB<"id",T_BoxTypeof<string>>,
	];
};