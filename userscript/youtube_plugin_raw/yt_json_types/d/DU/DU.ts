//#region UrlType
type DU_UrlTypeWithPageType=`page_type_${S_PageTypeStr}`|DU_UrlType;
type DU_UrlType=NonNullable<Ret_ParserService_GetUrlType>;
//#endregion
//#region TargetId
type DU_TargetId_ShoppingPanel_EntryPoint=`shopping_panel_for_entry_point_${"5"|"22"}`;
type DU_TargetId=
	|Extract<D_Menu,{targetId: any;}>["targetId"]
	|A_WatchNextContinuation['targetId']
	|AD_AppendContinuationItems['targetId']
	|AD_UpdateEngagementPanel['targetId']
	|D_Button_targetId
	|D_Button_With_TargetId["targetId"]
	|D_ChipCloudChip_tid['targetId']
	|D_EngagementPanelSectionTargetId
	|D_Menu_TargetId
	|DU_TargetId_ShoppingPanel_EntryPoint
	|D_TranscriptSearchPanel['targetId']
	|DC_ReloadContinuationItems["targetId"]
	|DC_ScrollToEngagementPanel['targetId']
	|DC_SectionList_TargetId
	|G_SI_DB_EngagementPanel['targetId']
	|RS_Search['targetId']
	|TA_Continuation<"browse-feedFEwhat_to_watch",G_BrowseFeed>['targetId']
	;
;
//#endregion
//#region Key type
type DU_EndpointKey=`${string}${D_EndpointLikeEndings}`;
//#endregion
//#region RetParam
type RetParam_D32=`TYPE::T_D32<${number}>`;
type RetParam_D64=`TYPE::T_D64<${bigint}n>`;
type RetParam_FD32=`TYPE::T_FD32<${number}>`;
type RetParam_FD64=`TYPE::T_FD64<${bigint}n>`;
type RetParam_TV_Str=`TYPE::TV_Str<"${string}">`;
type RetParam_VW_Bigint=`TYPE::T_VW_Bigint<${bigint}n>`;
//#endregion

type D_ApiStatsAdsStr=`ver=${string}&ns=${string}&event=${string}&device=${string}&content_v=${string}&el=${string}&ei=${string}&devicever=${string}&bti=${string}&break_type=${string}&conn=${string}&cpn=${string}&lact=${string}&m_pos=${string}&mt=${string}&p_h=${string}&p_w=${string}&rwt=${string}&sdkv=${string}&slot_pos=${string}&vis=${string}&vol=${string}&wt=${string}&sli=${string}&slfs=${string}&loginael=${string}`;
type D_ApiUrlFormat=`https://www.youtube.com${D_ApiPathFormat_1}`;
type D_ChanLoc=`channel.${string}`;
type D_PlayerParamsUrl=`pp=${string}`;
type D_PlaylistUrlFormat=`/playlist?list=${SD_PlaylistId}`;
type D_PlaylistUrlParams=`list=${SD_PlaylistId}`;
type D_PlaylistUrlStr=`/playlist?${D_PlaylistUrlParams}`;
type D_RadioPlaylistStr<T extends string>=`RD${T}`;
type D_ResultsPageUrl=`/results?search_query=${string}`;
type D_UserIdStr=string;
type D_UUIDString=`${string}-${string}-${string}-${string}-${string}`;

type D_TargetIdUuid=`${string}-0000-${string}-${string}-${string}`;

type W_Some_s=`https://www.youtube.com/channel/UC${string}/join`|`https://www.youtube.com/${string}`;

type S_YtUrlHttp_Watch=`http://www.youtube.com/watch?${string}`;
type S_acv1_codec=`avc1.${string}`;


type GV_SubDomain=`${string}${number}---sn-${string}n${string}`;
type G_SettingsEndpointPages=`/account${""|`_${G_AccountPageSettingsSections}`}`;

type LP_LogItems_Str=`like.${"likeParams"|"dislikeParams"|"removeLikeParams"}`;

type P_param_known_like=`${LP_LogItems_Str}.${P_param_known_like_paths}`;

//#region Url Templates & Unions
type DU_VE3832_PreconnectUrl=`https://${GV_SubDomain}.googlevideo.com/generate_204`;
type DFU_GoogleVideoUrl_Hostname=UrlParse<GU_GoogleVideoUrl>["host"];
type GU_GoogleVideoUrl=
	|DU_VE3832_PreconnectUrl
	|GU_GoodPut_ProbeUrl
	|GU_InitPlaybackUrl
	|GU_VideoPlaybackUrl
	;
;
//#endregion
type DU_IdCacheItem=
	|`video_id:${string}`
	|`browse_id:${GU_BrowseId}`
	|`playlist_id:${SD_PlaylistId}`
	|`user_id:${string}`
	|`hashtag_id:${string}`
	|`guide_entry_id:${GU_GuideEntryId}`
	|`channel_id:${T_IdTemplate<"UC",D_UserIdStr>}`
	|`key:start_radio:${0|1}`
	|`video_time:${number}s`
	|`exact:play_next:${1}`
	;
;