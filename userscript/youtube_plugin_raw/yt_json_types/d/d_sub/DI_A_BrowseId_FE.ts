type DI_BrowseId_FE={
	b: "browse_id";
	c: "FE";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<T_IdTemplate<"FE">>>,
		DIT_Item_AB<"id",T_PrimitiveBox<D_BrowseEndpointPages>>,
	];
};
type DI_BrowseId_UC={
	b: "browse_id";
	c: "UC";
	z: [DI_A_ChannelId_UC];
};
