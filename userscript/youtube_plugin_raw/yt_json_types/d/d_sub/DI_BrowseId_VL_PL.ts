type DI_BrowseId_VL_PL={
	b: "browse_id";
	c: "VL:PL";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<T_IdTemplate<"VL">>>,
		DI_A_Playlist_PL
	];
};
