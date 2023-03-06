type DI_A_Playlist_RD={
	b: "playlist_id";
	c: "RD";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`RD${string}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>,
	];
};