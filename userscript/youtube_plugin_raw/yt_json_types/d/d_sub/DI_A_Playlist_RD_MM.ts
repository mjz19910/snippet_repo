type DI_A_Playlist_RD_MM={
	b: "playlist_id";
	c: "RD:MM";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<`RDMM${string}`>>,
		DIT_Item_AB<"id",T_PrimitiveBox<string>>,
	];
};