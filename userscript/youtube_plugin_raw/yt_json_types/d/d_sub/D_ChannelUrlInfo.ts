type DI_A_ChannelId_UC={
	type: "channel_id";
	tag: "UC";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Prim<T_IdTemplate<"UC">>>,
		DIT_Item_A<"id", DIT_Prim<string>>,
	];
};
