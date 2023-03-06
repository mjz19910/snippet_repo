type DI_BrowseId_SP={
	b: "browse_id";
	c: "SP";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<`SP${G_BrowseIdStr_SP_Inner}`>>,
		DIT_Item_AB<"id",T_BoxTypeof<G_BrowseIdStr_SP_Inner>>,
	];
};
