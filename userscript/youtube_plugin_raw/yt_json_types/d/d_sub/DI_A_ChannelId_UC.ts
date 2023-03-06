type DI_A_ChannelId_UC={
	b: "channel_id";
	c: "UC";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<T_IdTemplate<"UC">>>,
		DIT_Item_AB<"id", DIT_Box_Typeof<string>>,
	];
};
