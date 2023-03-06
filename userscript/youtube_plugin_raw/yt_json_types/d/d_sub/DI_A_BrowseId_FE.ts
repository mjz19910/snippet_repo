type DI_BrowseId_FE={
	type: "browse_id";
	tag: "FE";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<T_IdTemplate<"FE">>>,
		DIT_Item_A<"id",DIT_Prim<D_BrowseEndpointPages>>,
	];
};