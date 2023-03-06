type DI_A_Playlist_RD_CM_UC={
	b: "playlist_id";
	c: "RD:CM:UC";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<`RDCMUC${string}`>>,
		DIT_Item_AB<"id",T_PrimitiveBox<string>>,
	];
};
