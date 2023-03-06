type DI_A_ChannelId_UC={
	type: "channel_id";
	tag: "UC";
	info_arr: [
		DIT_Item_A<"raw_id",DIT_Box_Typeof<T_IdTemplate<"UC">>>,
		DIT_Item_A<"id", DIT_Box_Typeof<string>>,
	];
};
