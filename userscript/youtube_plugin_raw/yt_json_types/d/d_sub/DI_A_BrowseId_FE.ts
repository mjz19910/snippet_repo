type DI_BrowseId_FE={
	b: "browse_id";
	c: "FE";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<T_IdTemplate<"FE">>>,
		DIT_Item_AB<"id",T_BoxTypeof<D_BrowseEndpointPages>>,
	];
};