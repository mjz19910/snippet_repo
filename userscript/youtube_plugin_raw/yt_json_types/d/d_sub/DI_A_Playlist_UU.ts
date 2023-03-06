type DI_A_Playlist_UU={
	b: "playlist_id";
	tag: "UU";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`UU${string}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>
	];
};