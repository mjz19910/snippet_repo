type DI_BrowseId_MP={
	b: "browse_id";
	c: "MP";
	z: [
		DIT_Item_AB<"raw_id",T_PrimitiveBox<`MP${string}_${string}`>>,
		DIT_Item_AB<"id",T_PrimitiveBox<string>>,{separator: "_";},DIT_Item_AB<"id",T_PrimitiveBox<string>>
	];
};
