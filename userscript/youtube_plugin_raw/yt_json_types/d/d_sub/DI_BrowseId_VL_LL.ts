type DI_BrowseId_VL_LL={
	b: "browse_id";
	// ^ b = type
	c: "VL:LL";
	// ^ c = tag
	z: [
		T_DI_FromObj<{raw_id: "VLLL"}>,
		DI_A_Playlist_LL
	];
};
