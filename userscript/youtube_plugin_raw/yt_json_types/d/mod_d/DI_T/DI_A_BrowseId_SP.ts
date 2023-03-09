type DI_BrowseId_SP={
	a: "DI";
	b: "browse_id";
	c: "SP";
	z: [
		T_DI_FromObj<{raw_id: `SP${G_BrowseIdStr_SP_Inner}`;}>,
		T_DI_FromObj<{id: G_BrowseIdStr_SP_Inner;}>,
	];
};
