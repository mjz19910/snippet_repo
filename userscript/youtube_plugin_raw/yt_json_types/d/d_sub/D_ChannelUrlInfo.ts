type DI_A_ChannelId_UC={
	type: "channel_id";
	tag: "UC";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_IdTemplate<"UC">>>,
		DIT_Item_AB<"id", DIT_Box_Typeof<string>>,
	];
};
