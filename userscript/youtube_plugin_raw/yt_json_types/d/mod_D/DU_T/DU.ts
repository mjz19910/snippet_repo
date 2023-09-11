import {Ret_ParserService_GetUrlType} from "../../../../zb_plugin_types/types.js";
import {A_WatchNextContinuation,TA_Continuation} from "../../../abc/A.js";
import {AD_AppendContinuationItems,AD_UpdateEngagementPanel} from "../../../abc/AD.js";
import {DC_ScrollToEngagementPanel,DC_SectionList_TargetId} from "../../../abc/C.js";
import {G_AccountPageSettingsSections,G_SI_DB_EngagementPanel,S_PageTypeStr} from "../../../ghi/_group.mod/G.js";
import {GU_GoodPut_ProbeUrl,GU_InitPlaybackUrl,GU_VE83769_Url_External,GU_VideoPlaybackUrl} from "../../../ghi/_group.mod/GU.js";
import {RS_Search} from "../../../r/RS.js";
import {D_ApiPathFormat_1,D_BrowseEndpointPages,D_Button_With_TargetId,D_ChipCloudChip_tid,D_EndpointLikeEndings,D_EngagementPanelSectionTargetId,D_Settings_Id,D_TranscriptSearchPanel} from "../../group_D/D.js";
import {DC_ReloadContinuationItems} from "../../group_D/DC.js";
import {D_Button_targetId} from "../D_T/D_Button.js";

//#region UrlType
export type DU_UrlTypeWithPageType=`page_type_${S_PageTypeStr}`|DU_UrlType;
export type DU_UrlType=NonNullable<Ret_ParserService_GetUrlType>;
//#endregion
//#region TargetId
export type DU_TargetId_ShoppingPanel_EntryPoint=`shopping_panel_for_entry_point_${"5"|"22"}`;
export type DU_TargetId=
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
export type DU_EndpointKey=`${string}${D_EndpointLikeEndings}`;
//#endregion
//#region RetParam
export type RetParam_D32=`TYPE::T_D32<${number}>`;
export type RetParam_D64=`TYPE::T_D64<${bigint}n>`;
export type RetParam_FD32=`TYPE::T_FD32<${number}>`;
export type RetParam_FD64=`TYPE::T_FD64<${bigint}n>`;
export type RetParam_TV_Str=`TYPE::TV_Str<"${string}">`;
export type RetParam_VW_Bigint=`TYPE::T_VW_Bigint<${bigint}n>`;
//#endregion

export type D_ApiStatsAdsStr=`ver=${string}&ns=${string}&event=${string}&device=${string}&content_v=${string}&el=${string}&ei=${string}&devicever=${string}&bti=${string}&break_type=${string}&conn=${string}&cpn=${string}&lact=${string}&m_pos=${string}&mt=${string}&p_h=${string}&p_w=${string}&rwt=${string}&sdkv=${string}&slot_pos=${string}&vis=${string}&vol=${string}&wt=${string}&sli=${string}&slfs=${string}&loginael=${string}`;
export type D_ApiUrlFormat=`https://www.youtube.com${D_ApiPathFormat_1}`;
export type D_ChanLoc=`channel.${string}`;
export type D_PlayerParamsUrl=`pp=${string}`;
export type D_PlaylistUrlFormat=`/playlist?list=${DU_Playlist_Id}`;
export type D_PlaylistUrlParams=`list=${DU_Playlist_Id}`;
export type D_PlaylistUrlStr=`/playlist?${D_PlaylistUrlParams}`;
export type D_RadioPlaylistStr<T extends string>=`RD${T}`;
export type D_ResultsPageUrl=`/results?search_query=${string}`;
export type D_UserIdStr=string;
export type D_UUIDString=`${string}-${string}-${string}-${string}-${string}`;

export type D_TargetIdUuid=`${string}-0000-${string}-${string}-${string}`;

export type W_Some_s=`https://www.youtube.com/channel/UC${string}/join`|`https://www.youtube.com/${string}`;

export type S_YtUrlHttp_Watch=`http://www.youtube.com/watch?${string}`;
export type S_acv1_codec=`avc1.${string}`;


export type GV_SubDomain=`${string}${number}---sn-${string}n${string}`;
export type G_SettingsEndpointPages=`/account${""|`_${G_AccountPageSettingsSections}`}`;

export type LP_LogItems_Str=`like.${"likeParams"|"dislikeParams"|"removeLikeParams"}`;

export type P_param_known_like=`${LP_LogItems_Str}.${P_param_known_like_paths}`;

//#region Url Templates & Unions
export type DU_VE3832_PreconnectUrl=`https://${GV_SubDomain}.googlevideo.com/generate_204`;
export type DU_Str_ChannelUrl=`https://www.youtube.com/${string}`;
export type DFU_GoogleVideoUrl_Hostname=UrlParse<GU_GoogleVideoUrl>["host"];
export type GU_InternalUrl=
	|`https://www.youtube.com/channel/UC${string}/join`
	|"https://www.youtube.com/t/creative_commons"
	;
;
export type GU_GoogleVideoUrl=
	|DU_VE3832_PreconnectUrl
	|GU_GoodPut_ProbeUrl
	|GU_InitPlaybackUrl
	|GU_VideoPlaybackUrl
	;
;
//#endregion
export type DU_IdCacheItem=
	|`video_id:${string}`
	|`browse_id:${DU_Browse_Id}`
	|`playlist_id:${DU_Playlist_Id}`
	|`user_id:${string}`
	|`hashtag_id:${string}`
	|`guide_entry_id:${DU_GuideEntry_Id}`
	|`channel_id:${T_IdTemplate<"UC",D_UserIdStr>}`
	|`key:start_radio:${0|1}`
	|`video_time:${number}s`
	|`exact:play_next:${1}`
	;
;

//#region Aliases
export type DU_UserId=string;
export type DU_VideoId=string;
export type DU_VideoId_Arr=[string,string,string,string,string,string,string,string,string,string,string];
//#endregion
//#region Discriminated Object Union
export type DE_U_ExternalUrl={url: GU_VE83769_Url_External; target: "TARGET_NEW_WINDOW";};
export type DE_U_RedirectUrl={url: `https://www.youtube.com/redirect?${string}`; target: "TARGET_NEW_WINDOW"; nofollow: true;};
export type DE_U_InternalUrl={url: GU_InternalUrl; nofollow: true;};
export type DE_U_ChannelUrl={url: DU_Str_ChannelUrl; nofollow: true;};
//#endregion
//#region Templates
export type T_ChannelIdStr<T extends string>=`UC${T}`;
export type T_FeedEntry<T extends D_BrowseEndpointPages=D_BrowseEndpointPages>=T_IdTemplate<"FE",T>;
export type T_IdTemplate<B extends keyof B_IdTemplateArgs,T extends B_IdTemplateArgs[B]=B_IdTemplateArgs[B]>=`${B}${T}`;
export type B_IdTemplateArgs={
	VL: T_IdTemplate<"PL">|DU_Playlist_Static;
	UC: D_UserIdStr;
	FE: D_BrowseEndpointPages;
	PL: string;
	RD: string;
	RDCMUC: string;
	RDGMEM: string;
	RDMM: string;
	UU: string;
	SP: D_Settings_Id;
	MP: `${string}_${string}`;
};
//#endregion
export type DU_PlaylistId_Base=
	|"PL"
	|"RD"
	|"RDCMUC"
	|"RDGMEM"
	|"RDMM"
	|"UU"
	;
;
//#region DU Template String
export type DU_Browse_Id=T_IdTemplate<"FE">|T_IdTemplate<"VL">|T_IdTemplate<"UC">|T_IdTemplate<"MP">|T_IdTemplate<"SP">;
export type DU_ChannelId=T_IdTemplate<"UC">;
export type DU_GuideEntry_Id=DU_Playlist_Static|T_IdTemplate<"UC">|T_IdTemplate<"PL">|"VLLL";
export type DU_HashtagId=string;
export type DU_Playlist_Id=DU_Playlist_Static|T_IdTemplate<DU_PlaylistId_Base>;
export type DU_Playlist_Radio_Id=T_IdTemplate<Extract<DU_PlaylistId_Base,`RD${string}`>>;
export type DU_Playlist_Static="WL"|"LL";
export type DU_StartRadio=0|1;
//#endregion
