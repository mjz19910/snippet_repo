type DI_BrowseId_VL_UC={
	type: "browse_id";
	tag: "VL:UC";
	info_arr: [
		DIT_Item<"raw_id",DIT_Prim<`VL${T_IdTemplate<"UC",D_UserIdStr>}`>>,
		DI_A_ChannelId_UC
	];
};
