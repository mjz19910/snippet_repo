type DI_BrowseId_SP={
	type: "browse_id";
	tag: "SP";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<`SP${G_BrowseIdStr_SP_Inner}`>>,
		DIT_Item_A<"id",DIT_Prim<G_BrowseIdStr_SP_Inner>>,
	];
};
