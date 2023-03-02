//#region Commands
type MC_Continuation=M_Next|M_Browse;
type C_Continuation=
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_WatchNext,M_Next>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_ReelWatchSeq,M_Next>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_Browse,M_Browse>
	;
;
type C_AddToPlaylist=TE_Endpoint_2<"addToPlaylistCommand",DC_AddToPlaylist>;
type C_AdsControlFlowOpportunityReceived=TE_Endpoint_2<"adsControlFlowOpportunityReceivedCommand",DC_AdsControlFlowOpportunityReceived>;
type C_ChangeKeyedMarkersVisibility=TE_Endpoint_2<"changeKeyedMarkersVisibilityCommand",DC_ChangeKeyedMarkersVisibility>;
type C_ChangeMarkersVisibility=TE_Endpoint_2<"changeMarkersVisibilityCommand",DC_ChangeMarkersVisibility>;
type C_CommandExecutor=TE_Endpoint_2<"commandExecutorCommand",DC_CommandExecutor>;
type C_EngagementPanelHeaderShowNavigationButton=TE_Endpoint_2<"engagementPanelHeaderShowNavigationButtonCommand",DC_EngagementPanelHeaderShowNavigationButton>;
type C_EntityUpdate=TE_Endpoint_2<"entityUpdateCommand",DC_EntityBatchUpdate>;
type C_FilterChipTransform=TE_Endpoint_2<"filterChipTransformCommand",DC_ChipUniqueId>;
type C_FollowUp=TE_Endpoint_2<"addFollowUpSurveyCommand",DC_AddFollowUpSurvey>;
type C_GetPdgBuyFlow=TE_Endpoint_3<"getPdgBuyFlowCommand",DC_GetPdgBuyFlow,M_GetPdgBuyFlow>;
type C_GetSurvey=TE_Endpoint_3<"getSurveyCommand",A_GetSurvey,M_GetSurvey>;
type C_Innertube={innertubeCommand: G_DC_Innertube;};
type C_LoadMarkers=TE_Endpoint_2<"loadMarkersCommand",DC_LoadMarkers>;
type C_Loop=TE_Endpoint_2<"loopCommand",DC_Loop>;
type C_MusicLibraryStatusUpdate={musicLibraryStatusUpdateCommand: DC_MusicLibraryStatusUpdate;};
type C_RefreshPlaylist=TE_Endpoint_2<"refreshPlaylistCommand",DC_RefreshPlaylist>;
type C_RelatedChip=TE_Endpoint_2<"relatedChipCommand",DC_RelatedChip>;
type C_ReloadContinuationItems=TE_Endpoint_2<"reloadContinuationItemsCommand",DC_ReloadContinuationItems>;
type C_RepeatChapter=TE_Endpoint_2<"repeatChapterCommand",DC_RepeatChapter>;
type C_ResetChannelUnreadCount=TE_Endpoint_2<"resetChannelUnreadCountCommand",DC_ResetChannelUnreadCount>;
type C_RunAttestation={runAttestationCommand: D_RunAttestation;};
type C_ScrollToEngagementPanel=TE_Endpoint_2<"scrollToEngagementPanelCommand",DC_ScrollToEngagementPanel>;
type C_ShowReloadUi=TE_Endpoint_2<"showReloadUiCommand",DC_ShowReloadUi>;
type C_UpdateToggleButtonState=TE_Endpoint_2<"updateToggleButtonStateCommand",DC_UpdateToggleButtonState>;
//#endregion
//#region Command Data
type DC_AddFollowUpSurvey={followUpOptions: G_FollowUpOption[]; followUpText: G_Text;};
type DC_ChangeMarkersVisibility={entityKeys: string[]; isVisible: boolean;};
type DC_ChipUniqueId={chipUniqueId: "ATTRIBUTE_FILTER_TYPE_EXPLORE";};
type DC_CommandExecutor={commands: G_DC_CommandExecutor_CommandItem[];};
type DC_Continuation_Browse={request: "CONTINUATION_REQUEST_TYPE_BROWSE"; token: string; command?: C_ShowReloadUi;};
type DC_Continuation_ReelWatchSeq={request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE"; token: string;};
type DC_Continuation_WatchNext={request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT"; token: string; command?: C_ShowReloadUi;};
type DC_EntityBatchUpdate={entityBatchUpdate: DR_DC_EntityBatchUpdate;};
type DC_Generic={continuation: string;};
type DC_GetPdgBuyFlow=DC_Params;
type DC_LiveChatReplay={continuation: string; timeUntilLastMessageMsec: number;};
type DC_LoadMarkers={entityKeys: string[];};
type DC_Loop={loop: false;};
type DC_MusicLibraryStatusUpdate={libraryStatus: "MUSIC_LIBRARY_STATUS_IN_LIBRARY"; addToLibraryFeedbackToken: string;};
type DC_Next=DC_Generic_CTP;
type DC_NextRadio=DC_Generic_CTP;
type DC_PlayerSeek=DC_Generic;
type DC_RelatedChip={targetSectionIdentifier: "sid-wn-chips"; loadCached: true;};
type DC_Reload=DC_Generic_CTP;
type DC_ResetChannelUnreadCount={channelId: `UC${string}`;};
type DC_ScrollToEngagementPanel={targetId: SI_VE76278_EngagementPanel["targetId"];};
type DC_SectionList_BrowseFeed_Subscriptions=T_DC_Content_2<"browse-feedFEsubscriptions",TR_SectionListItem_3_Empty>;
type DC_SectionList_SearchFeed=T_DC_Content_2<"search-feed",TR_SectionListItem_3_Empty>;
type DC_SectionList_T=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3_Empty>;
type DC_SectionList_TargetId=Extract<GD_RC_SectionList,{targetId: any;}>["targetId"];
type DC_SectionListBase=T_DC_Content<TR_ItemSection_3<R_ContinuationItem,"comment-item-section",SI_VE76278_EngagementPanel["targetId"]>>;
type DC_ShowReloadUi={targetId: D_UiTargetId;};
type DC_Timed={continuation: string; timeoutMs: D_TimeoutMs;};
type DC_UpdateToggleButtonState={buttonId: "TOGGLE_BUTTON_ID_TYPE_STRUCTURED_DESCRIPTION"; toggled: false;};
//#endregion
type DR_DC_EntityBatchUpdate={mutations: DE_MutationItem[]; timestamp?: D_TimestampWithNanos;};
type CP_Tracking={clickTrackingParams: string;};
type CR_ContinuationItemsFor<T,U,V extends {continuationItems: any;}>={
	slot: U;
	targetId: T;
	continuationItems: V["continuationItems"];
};
