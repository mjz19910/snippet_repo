type DI_BrowseId_FE={
	type: "browse_id";
	tag: "FE";
	z: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<T_IdTemplate<"FE">>>,
		DIT_Item_A<"id",DIT_Box_Typeof<D_BrowseEndpointPages>>,
	];
};