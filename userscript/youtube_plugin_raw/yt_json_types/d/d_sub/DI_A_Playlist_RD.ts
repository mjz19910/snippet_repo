type DI_A_Playlist_RD={
	b: "playlist_id";
	c: "RD";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<`RD${string}`>>,
		T_DI_FromObj<{id: string;}>,
	];
};