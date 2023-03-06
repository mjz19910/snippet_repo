type DI_BrowseId_MP={
	type: "browse_id";
	tag: "MP";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<`MP${string}_${string}`>>,
		DIT_Item_A<"id",DIT_Prim<string>>,{separator: "_";},DIT_Item_A<"id",DIT_Prim<string>>
	];
};
