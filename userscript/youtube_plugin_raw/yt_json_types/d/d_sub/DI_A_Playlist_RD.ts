type DI_A_Playlist_RD={
	b: "playlist_id";
	c: "RD";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<`RD${string}`>>,
		DIT_Item_AB<"id",T_PrimitiveBox<string>>,
	];
};