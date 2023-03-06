type DI_BrowseId_SP={
	type: "browse_id";
	tag: "SP";
	z: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`SP${G_BrowseIdStr_SP_Inner}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<G_BrowseIdStr_SP_Inner>>,
	];
};
