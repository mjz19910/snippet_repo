//#region Templates
type T_ChannelIdStr<T extends string>=`UC${T}`;
type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
type B_IdTemplateArgs={
	VL: T_IdTemplate<"PL">|DU_Playlist_Static;
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
type DU_Browse_Id=T_IdTemplate<"FE">|T_IdTemplate<"VL">|T_IdTemplate<"UC">|T_IdTemplate<"MP">|T_IdTemplate<"SP">;
type DU_Playlist_Id=DU_Playlist_Static|T_IdTemplate<DU_PlaylistId_Base>;
type DU_Playlist_Radio_Id=T_IdTemplate<Extract<DU_PlaylistId_Base,`RD${string}`>>;
type DU_GuideEntry_Id=DU_Playlist_Static|T_IdTemplate<"UC">|T_IdTemplate<"PL">|"VLLL";
type DU_Playlist_Static="WL"|"LL";
//#endregion
//#endregion