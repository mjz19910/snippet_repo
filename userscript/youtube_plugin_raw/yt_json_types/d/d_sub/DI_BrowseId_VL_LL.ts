type DI_BrowseId_VL_LL={
	b: "browse_id";
	// ^ b = type
	c: "VL:LL";
	// ^ c = tag
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<"VLLL">>,
		DI_A_Playlist_LL
	];
};
