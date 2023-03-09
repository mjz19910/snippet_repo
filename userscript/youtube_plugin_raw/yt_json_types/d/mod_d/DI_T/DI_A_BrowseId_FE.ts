type DI_BrowseId_FE={
	b: "browse_id";
	c: "FE";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"FE">;}>,
		T_DI_FromObj<{id: D_BrowseEndpointPages;}>
	];
};