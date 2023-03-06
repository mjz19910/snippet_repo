type DI_A_ChannelId_UC={
	b: "channel_id";
	c: "UC";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<T_IdTemplate<"UC">>>,
		DIT_Item_AB<"id", T_BoxTypeof<string>>,
	];
};
