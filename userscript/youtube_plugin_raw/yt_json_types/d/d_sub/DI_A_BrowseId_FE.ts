type DI_BrowseId_FE={
	b: "browse_id";
	tag: "FE";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_IdTemplate<"FE">>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<D_BrowseEndpointPages>>,
	];
};