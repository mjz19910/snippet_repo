type DI_BrowseId_VL_UC={
	a: "DI";
	b: "browse_id";
	c: "VL:UC";
	z: [
		T_DI_FromObj<{raw_id: `VL${T_IdTemplate<"UC",D_UserIdStr>}`}>,
		DI_A_ChannelId_UC
	];
};
