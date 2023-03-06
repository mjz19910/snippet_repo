type DI_A_Playlist_UU={
	b: "playlist_id";
	c: "UU";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<`UU${string}`>>,
		DIT_Item_AB<"id",T_BoxTypeof<string>>
	];
};