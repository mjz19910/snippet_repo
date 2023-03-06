type DI_BrowseId_SP={
	b: "browse_id";
	c: "SP";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`SP${G_BrowseIdStr_SP_Inner}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<G_BrowseIdStr_SP_Inner>>,
	];
};
