type DI_BrowseId_MP={
	type: "browse_id";
	tag: "MP";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<`MP${string}_${string}`>>,
		{id: string;},{separator: "_";},{id: string;}
	];
};
