type DI_BrowseId_VL_UC={
	b: "browse_id";
	c: "VL:UC";
	z: [
		DIT_Item_AB<"raw_id",T_BoxTypeof<`VL${T_IdTemplate<"UC",D_UserIdStr>}`>>,
		DI_A_ChannelId_UC
	];
};
