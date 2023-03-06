type DI_BrowseId_VL_UC={
	type: "browse_id";
	tag: "VL:UC";
	z: [
		DIT_Item_AB<"raw_id",DIT_Box_Typeof<`VL${T_IdTemplate<"UC",D_UserIdStr>}`>>,
		DI_A_ChannelId_UC
	];
};
