type DI_A_Playlist_RD_CM_UC={
	b: "playlist_id";
	tag: "RD:CM:UC";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`RDCMUC${string}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>,
	];
};
