//#region Templates
type T_ChannelIdStr<T extends string>=`UC${T}`;
type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
type B_IdTemplateArgs={
	VL: DU_Playlist_Id;
	FE: D_BrowseEndpointPages;
	PL: string;
	RD: string;
	RDCM: "";
	RDGM: "";
	RDMM: "";
	UU: string;
	SP: D_Settings_Id;
};
//#endregion
type DU_PlaylistId_Base=
	|"PL"
	|"RD"
	|"RDCM"
	|"RDGM"
	|"RDMM"
	|"UU"
	;
;
//#region Template String
//#region DU
type DU_Browse_Playlist_Id=T_IdTemplate<"VL">;
type DU_Channel_Id=T_ChannelIdStr<D_UserIdStr>;
type DU_FeedBrowse_Id=T_IdTemplate<"FE">;
type DU_Playlist_Id=`PL${string}`;
type DU_Playlist_UserUploads_Id=T_IdTemplate<"UU">;
type DU_Radio_Id=T_IdTemplate<"RD">;
//#endregion
//#region GU
type GU_Radio_Id=
	|`RD${DM_Radio_GeneralId|DM_Radio_ChannelId|DM_Radio_MyMixId}`
	|DU_Radio_Id
	;
;
type GU_BrowseId=
	|DU_FeedBrowse_Id
	|GU_VE5754_BrowseId
	|DU_Channel_Id
	|`SP${D_Settings_Id}`
	|`MP${string}_${string}`
	;
;
type GU_GuideEntryId=
	|SU_PlaylistId
	|DU_Channel_Id
	|DU_Playlist_Id
	;
;
type GU_VE5754_BrowseId=
	|`VL${SU_PlaylistId}`
	|DU_Browse_Playlist_Id
	;
;
//#endregion
//#endregion
//#region Template String Mode
type DM_Radio_ChannelId=`CM${DU_Channel_Id}`;
type DM_Radio_GeneralId=`GM${string}`;
type DM_Radio_MyMixId=`MM${string}`;
//#endregion
//#region SU
type SU_PlaylistId="WL"|"LL";
//#endregion
//#region SD
type SD_PlaylistId=
	|SU_PlaylistId
	|DU_Playlist_UserUploads_Id
	|DU_Playlist_Id
	|GU_Radio_Id
	;
;
//#endregion