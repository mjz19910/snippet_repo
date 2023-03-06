type DI_A_Playlist_RD_MM={
	type: "playlist_id";
	tag: "RD:MM";
	z: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`RDMM${string}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,
	];
};