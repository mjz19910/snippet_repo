//#region group_C

import {D_RunAttestation,D_TimestampWithNanos,D_UiTargetId} from "../d/group_D.js";
import {DC_AddToPlaylist,DC_AdsControlFlowOpportunityReceived,DC_ChangeKeyedMarkersVisibility,DC_EngagementPanelHeaderShowNavigationButton,DC_Generic_CTP,DC_Invalidation,DC_Params,DC_ReloadContinuationItems,DC_RepeatChapter} from "../d/group_DC.js";
import {D_UserIdStr,T_IdTemplate} from "../d/mod_D/DU_T/DU.js";
import {G_DC_CommandExecutor_CommandItem,G_DC_Innertube} from "../ghi/_group.mod/G_DC.js";
import {G_DE_MutationItem,G_FollowUpOption,G_Text} from "../ghi/group_G.js";
import {M_Browse,M_GetPdgBuyFlow,M_GetSurvey,M_Next} from "../m/M.js";
import {R_ContinuationItem} from "../r/R.js";
import {SI_VE76278_EngagementPanel} from "../stu/mod/group_SI.js";
import {TE_Endpoint_2,TE_Endpoint_3,TE_Endpoint_Opt_3,TR_ItemSection_3,TR_SectionListItem_3_Empty,T_DC_Content,T_DC_Content_2} from "../stu/mod/group_T.js";
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
//#endregion
