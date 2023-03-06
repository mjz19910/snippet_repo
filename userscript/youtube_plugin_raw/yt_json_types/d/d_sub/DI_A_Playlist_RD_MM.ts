type DI_A_Playlist_RD_MM={
	b: "playlist_id";
	c: "RD:MM";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`RDMM${string}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>,
	];
};