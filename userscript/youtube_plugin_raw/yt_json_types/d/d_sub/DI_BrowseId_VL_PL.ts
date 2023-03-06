type DI_BrowseId_VL_PL={
	b: "browse_id";
	c: "VL:PL";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_IdTemplate<"VL">>>,
		DI_A_Playlist_PL
	];
};
