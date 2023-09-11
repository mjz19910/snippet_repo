//#region group_C

import {D_RunAttestation,D_TimestampWithNanos,D_UiTargetId} from "../d/group_D.js";
import {DC_AddToPlaylist,DC_AdsControlFlowOpportunityReceived,DC_ChangeKeyedMarkersVisibility,DC_EngagementPanelHeaderShowNavigationButton,DC_Generic_CTP,DC_Invalidation,DC_Params,DC_ReloadContinuationItems,DC_RepeatChapter} from "../d/group_DC.js";
import {D_UserIdStr,T_IdTemplate} from "../d/mod_D/DU_T/DU.js";
import {G_DC_CommandExecutor_CommandItem,G_DC_Innertube} from "../ghi/_group.mod/G_DC.js";
import {G_DE_MutationItem,G_FollowUpOption,G_Text} from "../ghi/group_G.js";
import {M_Browse,M_GetPdgBuyFlow,M_GetSurvey,M_Next} from "../m/M.js";
import {R_ContinuationItem} from "../r/group_R.js";
import {SI_VE76278_EngagementPanel} from "../stu/mod/group_SI.js";
import {TE_Endpoint_2,TE_Endpoint_3,TE_Endpoint_Opt_3,TR_ItemSection_3,TR_SectionListItem_3_Empty,T_DC_Content,T_DC_Content_2} from "../stu/group_T.js";
import {A_GetSurvey} from "./A.js";

//#region Commands
export type MC_Continuation=M_Next|M_Browse;
export type C_Continuation=
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_WatchNext,M_Next>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_ReelWatchSeq,M_Next>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_Browse,M_Browse>
	;
;
export type C_AddToPlaylist=TE_Endpoint_2<"addToPlaylistCommand",DC_AddToPlaylist>;
export type C_AdsControlFlowOpportunityReceived=TE_Endpoint_2<"adsControlFlowOpportunityReceivedCommand",DC_AdsControlFlowOpportunityReceived>;
export type C_ChangeKeyedMarkersVisibility=TE_Endpoint_2<"changeKeyedMarkersVisibilityCommand",DC_ChangeKeyedMarkersVisibility>;
export type C_ChangeMarkersVisibility=TE_Endpoint_2<"changeMarkersVisibilityCommand",DC_ChangeMarkersVisibility>;
export type C_CommandExecutor=TE_Endpoint_2<"commandExecutorCommand",DC_CommandExecutor>;
export type C_EngagementPanelHeaderShowNavigationButton=TE_Endpoint_2<"engagementPanelHeaderShowNavigationButtonCommand",DC_EngagementPanelHeaderShowNavigationButton>;
export type C_EntityUpdate=TE_Endpoint_2<"entityUpdateCommand",DC_EntityBatchUpdate>;
export type C_FilterChipTransform=TE_Endpoint_2<"filterChipTransformCommand",DC_ChipUniqueId>;
export type C_FollowUp=TE_Endpoint_2<"addFollowUpSurveyCommand",DC_AddFollowUpSurvey>;
export type C_GetPdgBuyFlow=TE_Endpoint_3<"getPdgBuyFlowCommand",DC_GetPdgBuyFlow,M_GetPdgBuyFlow>;
export type C_GetSurvey=TE_Endpoint_3<"getSurveyCommand",A_GetSurvey,M_GetSurvey>;
export type C_Innertube={innertubeCommand: G_DC_Innertube;};
export type C_LoadMarkers=TE_Endpoint_2<"loadMarkersCommand",DC_LoadMarkers>;
export type C_Loop=TE_Endpoint_2<"loopCommand",DC_Loop>;
export type C_MusicLibraryStatusUpdate={musicLibraryStatusUpdateCommand: DC_MusicLibraryStatusUpdate;};
export type C_RefreshPlaylist=TE_Endpoint_2<"refreshPlaylistCommand",DC_RefreshPlaylist>;
export type C_RelatedChip=TE_Endpoint_2<"relatedChipCommand",DC_RelatedChip>;
export type C_ReloadContinuationItems=TE_Endpoint_2<"reloadContinuationItemsCommand",DC_ReloadContinuationItems>;
export type C_RepeatChapter=TE_Endpoint_2<"repeatChapterCommand",DC_RepeatChapter>;
export type C_ResetChannelUnreadCount=TE_Endpoint_2<"resetChannelUnreadCountCommand",DC_ResetChannelUnreadCount>;
export type C_RunAttestation={
	clickTrackingParams?: string;
	runAttestationCommand: D_RunAttestation;
};
export type C_ScrollToEngagementPanel=TE_Endpoint_2<"scrollToEngagementPanelCommand",DC_ScrollToEngagementPanel>;
export type C_ShowReloadUi=TE_Endpoint_2<"showReloadUiCommand",DC_ShowReloadUi>;
export type C_UpdateToggleButtonState=TE_Endpoint_2<"updateToggleButtonStateCommand",DC_UpdateToggleButtonState>;
//#endregion
//#region DC (Command Data)
export type DC_AddFollowUpSurvey={followUpOptions: G_FollowUpOption[]; followUpText: G_Text;};
export type DC_ChangeMarkersVisibility={entityKeys: string[]; isVisible: boolean;};
export type DC_ChipUniqueId={chipUniqueId: "ATTRIBUTE_FILTER_TYPE_EXPLORE";};
export type DC_CommandExecutor={commands: G_DC_CommandExecutor_CommandItem[];};
export type DC_Continuation_Browse={request: "CONTINUATION_REQUEST_TYPE_BROWSE"; token: string; command?: C_ShowReloadUi;};
export type DC_Continuation_ReelWatchSeq={request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE"; token: string;};
export type DC_Continuation_WatchNext={request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT"; token: string; command?: C_ShowReloadUi;};
export type DC_EntityBatchUpdate={entityBatchUpdate: DR_DC_EntityBatchUpdate;};
export type DC_Generic={continuation: string;};
export type DC_GetPdgBuyFlow=DC_Params;
export type DC_LiveChatReplay={continuation: string; timeUntilLastMessageMsec: number;};
export type DC_LoadMarkers={entityKeys: string[];};
export type DC_Loop={loop: false;};
export type DC_MusicLibraryStatusUpdate={libraryStatus: "MUSIC_LIBRARY_STATUS_IN_LIBRARY"; addToLibraryFeedbackToken: string;};
export type DC_Next=DC_Generic_CTP;
export type DC_NextRadio=DC_Generic_CTP;
export type DC_PlayerSeek=DC_Generic;
export type DC_Reload=DC_Generic_CTP;
export type DC_ResetChannelUnreadCount={channelId: T_IdTemplate<"UC",D_UserIdStr>;};
export type DC_ScrollToEngagementPanel={targetId: SI_VE76278_EngagementPanel["targetId"];};
export type DC_SectionList_BrowseFeed_Subscriptions=T_DC_Content_2<"browse-feedFEsubscriptions",TR_SectionListItem_3_Empty>;
export type DC_SectionList_SearchFeed=T_DC_Content_2<"search-feed",TR_SectionListItem_3_Empty>;
export type DC_SectionList_T=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3_Empty>;
export type DC_SectionList_TargetId=Extract<GD_RC_SectionList,{targetId: any;}>["targetId"];
export type DC_SectionListBase=T_DC_Content<TR_ItemSection_3<R_ContinuationItem,"comment-item-section",SI_VE76278_EngagementPanel["targetId"]>>;
export type DC_ShowReloadUi={targetId: D_UiTargetId;};
export type DC_Timed={continuation: string; timeoutMs: D_TimeoutMs;};
export type DC_UpdateToggleButtonState={buttonId: "TOGGLE_BUTTON_ID_TYPE_STRUCTURED_DESCRIPTION"; toggled: false;};
//#endregion DC (Command Data)
export type DR_DC_EntityBatchUpdate={mutations: G_DE_MutationItem[]; timestamp?: D_TimestampWithNanos;};
export type CP_Tracking={clickTrackingParams: string;};
export type CR_ContinuationItemsFor<T,U,V extends {continuationItems: any;}>={
	slot: U;
	targetId: T;
	continuationItems: V["continuationItems"];
};
//#endregion group_C
//#region CD (ContinuationData)
export type CD_Invalidation={invalidationContinuationData: DC_Invalidation;};
export type CD_LiveChatReplay={liveChatReplayContinuationData: DC_LiveChatReplay;};
export type CD_Next={nextContinuationData: DC_Next;};
export type CD_NextRadio={nextRadioContinuationData: DC_NextRadio;};
export type CD_PlayerSeek={playerSeekContinuationData: DC_PlayerSeek;};
export type CD_Reload={reloadContinuationData: DC_Reload;};
export type CD_TimedContinuation={timedContinuationData: DC_Timed;};
//#endregion CD
//#region CF
import {CF_GetAutoTypename as CF_GetAutoTypename,CF_ShortTypeName} from "../_rtv_wrong/Ret_get_auto_type_name.js";
import {Ret_json_auto_replace_1} from "../_rtv_wrong/Ret_json_auto_replace_1.js";
import {T_ExtractImport,T_Split} from "../stu/group_T.js";
import {P_LogItems} from "../nop_q/P_LogItems.js";

export type CF_add_string_to_map=T_ExtractImport<"CF_add_string_to_map">|"CF_add_string_to_map";
export type CF_D_CaseGen=T_ExtractImport<"CF_D_CaseGen">|"CF_D_CaseGen";
export type CF_D_ChipCloudChip_Omit=T_ExtractImport<"CF_D_ChipCloudChip_Omit">|"CF_D_ChipCloudChip_Omit";
export type CF_D_CustomEmoji=T_ExtractImport<"CF_D_CustomEmoji">|"CF_D_CustomEmoji";
export type CF_D_GuideEntry=T_ExtractImport<"CF_D_GuideEntry">|"CF_D_GuideEntry";
export type CF_D_Link=T_ExtractImport<"CF_D_Link">|"CF_D_Link";
export type CF_D_Menu_Omit=T_ExtractImport<"CF_D_Menu_Omit">|"CF_D_Menu_Omit"|GCF_D_Menu;
export type CF_D_Params=T_ExtractImport<"CF_D_Params">|"CF_D_Params";
export type CF_D_Playlist_Omit=T_ExtractImport<"CF_D_Playlist_Omit">|"CF_D_Playlist_Omit";
export type CF_D_STR=T_ExtractImport<"CF_D_STR">|"CF_D_STR";
export type CF_D_ToggleButton=T_ExtractImport<"CF_D_ToggleButton">|"CF_D_ToggleButton";
export type CF_D_Video_Handle=T_ExtractImport<"CF_D_Video_Handle">|"CF_D_Video_Handle";
export type CF_DC_Generic_CTP=T_ExtractImport<"CF_DC_Generic_CTP">|"CF_DC_Generic_CTP";
export type CF_decode_continuation_token=T_ExtractImport<"CF_decode_continuation_token">|"CF_decode_continuation_token";
export type CF_GE_ResponseReceived=T_ExtractImport<"CF_GE_ResponseReceived">|"CF_GE_ResponseReceived";
export type CF_H_a=T_ExtractImport<"CF_H_a">|"CF_H_a";
export type CF_L_CTP_Params=T_ExtractImport<"CF_L_CTP_Params">|"CF_L_CTP_Params";
export type CF_L_Params=T_ExtractImport<"CF_L_Params">|"CF_L_Params";
export type CF_L_TP_Params=T_ExtractImport<"CF_L_TP_Params">|"CF_L_TP_Params";
export type CF_M_H_d=T_ExtractImport<"CF_M_H_d">|"CF_M_H_d";
export type CF_M_HD=T_ExtractImport<"CF_M_HD">|"CF_M_HD";
export type GCF_M_k=
	|`${CF_M_rl}:omit`
	|CF_M_H_d
	|CF_M_HD
	|CF_M_s
	|CF_M_w
	|CF_M_wn
	;
;
export type CF_M_k=T_ExtractImport<"CF_M_k">|"CF_M_k"|GCF_M_k;
export type CF_M_rl=T_ExtractImport<"CF_M_rl">|"CF_M_rl"|CF_D_Video_Handle;
export type CF_M_s=T_ExtractImport<"CF_M_s">|"CF_M_s"|CF_s;
export type CF_M_VE=T_ExtractImport<"CF_M_VE">|"CF_M_VE";
export type CF_M_w=T_ExtractImport<"CF_M_w">|"CF_M_w"|CF_w;
export type CF_s=
	|CF_D_ChipCloudChip_Omit
	|CF_D_CustomEmoji
	|CF_D_GuideEntry
	|CF_D_Link
	|CF_D_Menu_Omit
	|CF_D_Params
	|CF_D_ToggleButton
	|CF_H_a
	|CF_P_EntityKey
	|CF_parse_identifier
	|CF_RS_Page_Browse
	|CF_RS_Page_Type1
	|CF_T_Attachment
	|CF_T_GM
	|CF_T_Icon
	|CF_T_Icon_Any
	|CF_T_Items_TP
	|CF_T_OpenPopup_Dialog
	|CF_T_OpenPopup_Dropdown
	|CF_T_SE_Signal
	|CF_T_WCM
	|CF_TA_OpenPopup
	|CF_TD_ItemSection
	|CF_TD_Params
	|CF_TE_Endpoint_2
	|CF_TE_Endpoint_3
	|CF_TE_Endpoint_Opt_3
	|CF_TE_TrackedObj_2
	|CF_GetAutoTypename
	;
;
export type CF_GetAutoTypename=
	|"{}"
	|`D_${"PrefetchHintConfig"}`
	|`TA_OpenPopup<T_OpenPopup_Dialog<${string}>>`
	|`TA_OpenPopup<T_OpenPopup_Toast<${string}>>`
	|CF_ShortTypeName
	;
;
export type CF_ShortTypeName=
	|"R_TwoColumnBrowseResults"
	|"A_OpenPopup"
	|`C_${T_Split<Extract<Ret_json_auto_replace_1,`${string}Command`>,"Command">[0]}`
	|`R_${T_Split<Extract<Ret_json_auto_replace_1,`${string}Renderer`>,"Renderer">[0]}`
	|"GE_Browse"
	|"RMD_Badge"
	;
;
export type CF_w=
	|CF_M_y
	|CF_M_zy
	|CF_T_Commands
	|CF_T_Items
	|CF_T_Items_TP
	|CF_T_Signal
	|CF_TA_Page
	|CF_TR_MultiPageMenu
	;
;
export type CF_M_wn=T_ExtractImport<"CF_M_wn">|"CF_M_wn";
export type CF_M_y=T_ExtractImport<"CF_M_y">|"CF_M_y";
export type CF_M_zy=T_ExtractImport<"CF_M_zy">|"CF_M_zy";
export type CF_onMissingIcon=T_ExtractImport<"CF_onMissingIcon">|"CF_onMissingIcon";
export type CF_P_EntityKey=T_ExtractImport<"CF_P_EntityKey">|"CF_P_EntityKey";
export type CF_parse_identifier=T_ExtractImport<"CF_parse_identifier">|"CF_parse_identifier";
export type CF_RS_Page_Browse=T_ExtractImport<"CF_RS_Page_Browse">|"CF_RS_Page_Browse";
export type CF_RS_Page_Type1=T_ExtractImport<"CF_RS_Page_Type1">|"CF_RS_Page_Type1";
export type CF_T_Attachment=T_ExtractImport<"CF_T_Attachment">|"CF_T_Attachment";
export type CF_T_Commands=T_ExtractImport<"CF_T_Commands">|"CF_T_Commands";
export type CF_T_Endpoint=T_ExtractImport<"CF_T_Endpoint">|"CF_T_Endpoint";
export type CF_T_GM=T_ExtractImport<"CF_T_GM">|"CF_T_GM";
export type CF_T_Icon_Any=T_ExtractImport<"CF_T_Icon_Any">|"CF_T_Icon_Any";
export type CF_T_Icon=T_ExtractImport<"CF_T_Icon">|"CF_T_Icon";
export type CF_T_Items_TP=T_ExtractImport<"CF_T_Items_TP">|"CF_T_Items_TP";
export type CF_T_Items=T_ExtractImport<"CF_T_Items">|"CF_T_Items";
export type CF_T_OpenPopup_Dialog="T_OpenPopup_Dialog"|"T_OpenPopup_Dialog";
export type CF_T_OpenPopup_Dropdown=T_ExtractImport<"CF_T_OpenPopup_Dropdown">|"CF_T_OpenPopup_Dropdown";
export type CF_T_SE_Signal_P1=T_ExtractImport<"CF_T_SE_Signal_P1">|"CF_T_SE_Signal_P1";
export type CF_T_SE_Signal=T_ExtractImport<"CF_T_SE_Signal">|"CF_T_SE_Signal";
export type CF_T_Signal=T_ExtractImport<"CF_T_Signal">|"CF_T_Signal";
export type CF_T_WCM_Unpack=T_ExtractImport<"CF_T_WCM_Unpack">|"CF_T_WCM_Unpack";
export type CF_T_WCM=T_ExtractImport<"CF_T_WCM">|"CF_T_WCM";
export type CF_TA_OpenPopup=T_ExtractImport<"CF_TA_OpenPopup">|"CF_TA_OpenPopup";
export type CF_TA_Page=T_ExtractImport<"CF_TA_Page">|"CF_TA_Page";
export type CF_TD_ItemSection=T_ExtractImport<"CF_TD_ItemSection">|"CF_TD_ItemSection";
export type CF_TD_Params=T_ExtractImport<"CF_TD_Params">|"CF_TD_Params";
export type CF_TE_Endpoint_2=T_ExtractImport<"CF_TE_Endpoint_2">|"CF_TE_Endpoint_2";
export type CF_TE_Endpoint_3=T_ExtractImport<"CF_TE_Endpoint_3">|"CF_TE_Endpoint_3";
export type CF_TE_Endpoint_Opt_3=T_ExtractImport<"CF_TE_Endpoint_Opt_3">|"CF_TE_Endpoint_Opt_3";
export type CF_TE_TrackedObj_2=T_ExtractImport<"CF_TE_TrackedObj_2">|"CF_TE_TrackedObj_2";
export type CF_TR_MultiPageMenu=T_ExtractImport<"CF_TR_MultiPageMenu">|"CF_TR_MultiPageMenu";

export type CF_P_ParamParse=
	|"_level_1_0"
	|"_level_2_0._level_2_1"
	|T_ExtractImport<"CF_P_ParamParse">
	|P_param_category
	;
;

export type GCF_D_Menu=CF_D_Video_Handle|CF_D_Playlist_Omit;

//#endregion CF
export type P_param_category=P_LogItems extends []? never:P_LogItems[number] extends `[${string}] [${infer U}]`? U:never;
export type P_param=Extract<P_param_category,`${string}.params.${string}`>;
export type P_param_known_like_paths=[
	"f1.f1",
	"f1",
	"f2",
	"f3",
	"f4.f1",
	"f4.f2",
	"f4",
	"f5.f1",
	"f5.f2",
	"f5",
	"f6.f1",
	"f6.f2",
	"f6",
	"f7"
][number];
export type P_param_tracking<T extends string="tracking">=[
	`${T}.parentTrackingParams`,
	`${T}.trackingParams.f1`,
	`${T}.trackingParams.f19.f1`,
	`${T}.trackingParams.f19.f2`,
	`${T}.trackingParams.f19`,
	`${T}.trackingParams.f2`,
	`${T}.trackingParams.f3`,
	`${T}.trackingParams.f4.f1`,
	`${T}.trackingParams.f4.f2`,
	`${T}.trackingParams.f4.f3`,
	`${T}.trackingParams.f4`,
	`${T}.trackingParams.f6.f12`,
	`${T}.trackingParams.f6.f13`,
	`${T}.trackingParams.f6`,
	`${T}.trackingParams.f9`,
	`${T}.trackingParams`
][number];