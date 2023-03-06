type DI_A_ChannelId_UC={
	b: "channel_id";
	c: "UC";
	z: [
		T_DI_FromObj<{raw_id: T_IdTemplate<"UC">;}>,
		T_DI_FromObj<{id: string;}>,
	];
};
