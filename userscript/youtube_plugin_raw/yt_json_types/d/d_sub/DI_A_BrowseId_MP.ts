type DI_BrowseId_MP={
	b: "browse_id";
	tag: "MP";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`MP${string}_${string}`>>,
		DIT_Item_AB<"id",DIT_Box_Typeof<string>>,{separator: "_";},DIT_Item_AB<"id",DIT_Box_Typeof<string>>
	];
};
