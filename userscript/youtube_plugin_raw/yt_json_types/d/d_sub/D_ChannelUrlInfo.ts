type DI_A_ChannelId_UC={
	type: "channel_id";
	tag: "UC";
	info_arr: [
		{
			type: "raw_id",
			info_arr: [T_IdTemplate<"UC",D_UserIdStr>];
		},
		{id: DIT_Prim<string>;},
	];
};
