//#region Templates
type T_ChannelIdStr<T extends string>=`UC${T}`;
type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
type B_IdTemplateArgs={
	VL: T_IdTemplate<"PL">;
	UC: D_UserIdStr;
	FE: D_BrowseEndpointPages;
	PL: string;
	RD: string;
	RDCMUC: string;
	RDGM: string;
	RDMM: string;
	UU: string;
	SP: D_Settings_Id;
};
//#endregion
type DU_PlaylistId_Base=
	|"PL"
	|"RD"
	|"RDCMUC"
	|"RDGM"
	|"RDMM"
	|"UU"
	;
;
//#region Template String
//#region DU
//#endregion
//#region GU
type GU_BrowseId=
	|T_IdTemplate<"FE">
	|GU_VE5754_BrowseId
	|T_IdTemplate<"UC",D_UserIdStr>
	|`SP${D_Settings_Id}`
	|`MP${string}_${string}`
	;
;
type GU_GuideEntryId=
	|SU_PlaylistId
	|T_IdTemplate<"UC",D_UserIdStr>
	|T_IdTemplate<"PL">
	;
;
type GU_VE5754_BrowseId=
	|`VL${SU_PlaylistId}`
	|T_IdTemplate<"VL">
	;
;
//#endregion
//#endregion
//#region Template String Mode
type DM_Radio_ChannelId=`CM${T_IdTemplate<"UC",D_UserIdStr>}`;
type DM_Radio_GeneralId=`GM${string}`;
type DM_Radio_MyMixId=`MM${string}`;
//#endregion
//#region SU
type SU_PlaylistId="WL"|"LL";
//#endregion
//#region SD
type SD_PlaylistId=
	|SU_PlaylistId
	|T_IdTemplate<"UU">
	|T_IdTemplate<"PL">
	|T_IdTemplate<Extract<DU_PlaylistId_Base,`RD${string}`>>
	;
;
//#endregion