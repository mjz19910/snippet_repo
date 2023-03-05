//#region Templates
type T_ChannelIdStr<T extends string>=`UC${T}`;
type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
type B_IdTemplateArgs={
	VL: T_IdTemplate<"PL">|SU_PlaylistId;
	UC: D_UserIdStr;
	FE: D_BrowseEndpointPages;
	PL: string;
	RD: string;
	RDCMUC: string;
	RDGM: string;
	RDMM: string;
	UU: string;
	SP: D_Settings_Id;
	MP: `${string}_${string}`;
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
	|T_IdTemplate<"VL">
	|T_IdTemplate<"UC">
	|T_IdTemplate<"MP">
	|T_IdTemplate<"SP">
	;
;
type GU_GuideEntryId=
	|SU_PlaylistId
	|T_IdTemplate<"UC">
	|T_IdTemplate<"PL">
	;
;
//#endregion
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