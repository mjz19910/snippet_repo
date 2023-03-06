type DI_BrowseId_MP={
	type: "browse_id";
	tag: "MP";
	z: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<`MP${string}_${string}`>>,
		DIT_Item_A<"id",DIT_Box_Typeof<string>>,{separator: "_";},DIT_Item_A<"id",DIT_Box_Typeof<string>>
	];
};
