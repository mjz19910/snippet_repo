//#region Commands
type C_AddToPlaylist=TE_Endpoint_2<"addToPlaylistCommand",DC_AddToPlaylist>;
type C_AdsControlFlowOpportunityReceived=TE_Endpoint_2<"adsControlFlowOpportunityReceivedCommand",DC_AdsControlFlowOpportunityReceived>;
type C_ChangeKeyedMarkersVisibility=TE_Endpoint_2<"changeKeyedMarkersVisibilityCommand",DC_ChangeKeyedMarkersVisibility>;
type C_Continuation=
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_WatchNext,M_Next>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_ReelWatchSeq,M_Empty_WCM>
	|TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation_Browse,M_Empty_WCM>
	;
;
type DC_Continuation_ReelWatchSeq={request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE"; token: string;};
type DC_Continuation_Browse={request: "CONTINUATION_REQUEST_TYPE_BROWSE"; token: string; command: C_ShowReloadUi;};
type DC_Continuation_WatchNext={request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT"; token: string;};
type C_CommandExecutor=TE_Endpoint_2<"commandExecutorCommand",DC_CommandExecutor>;
type C_EngagementPanelHeaderShowNavigationButton=TE_Endpoint_2<"engagementPanelHeaderShowNavigationButtonCommand",DC_EngagementPanelHeaderShowNavigationButton>;
type C_EntityUpdate=TE_Endpoint_2<"entityUpdateCommand",DC_EntityBatchUpdate>;
type C_Executor=TE_Endpoint_2<"commandExecutorCommand",DC_Executor>;
type C_FollowUp=TE_Endpoint_2<"addFollowUpSurveyCommand",DC_AddFollowUpSurvey>;
type C_GetSurvey=TE_Endpoint_3<"getSurveyCommand",DC_GetSurvey,MG_Survey_CMD>;
type C_LoadMarkers=TE_Endpoint_2<"loadMarkersCommand",DC_LoadMarkers>;
type C_Loop=TE_Endpoint_2<"loopCommand",DC_Loop>;
type C_RefreshPlaylist=TE_Endpoint_2<"refreshPlaylistCommand",DC_RefreshPlaylist>;
type C_RelatedChip=TE_Endpoint_2<"relatedChipCommand",DC_RelatedChip>;
type C_ReloadContinuationItems=TE_Endpoint_2<"reloadContinuationItemsCommand",DC_ReloadContinuationItems>;
type C_RepeatChapter=TE_Endpoint_2<"repeatChapterCommand",DC_RepeatChapter>;
type C_ResetChannelUnreadCount=TE_Endpoint_2<"resetChannelUnreadCountCommand",DC_ResetChannelUnreadCount>;
type C_ScrollToEngagementPanel=TE_Endpoint_2<"scrollToEngagementPanelCommand",DC_ScrollToEngagementPanel>;
type C_ShowReloadUi=TE_Endpoint_2<"showReloadUiCommand",DC_ShowReloadUi>;
type C_UpdateToggleButtonState=TE_Endpoint_2<"updateToggleButtonStateCommand",DC_UpdateToggleButtonState>;
//#endregion
