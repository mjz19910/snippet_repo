//#region Commands
type C_AddToPlaylist=TE_Endpoint_2<"addToPlaylistCommand",DC_AddToPlaylist>;
type C_AdsControlFlowOpportunityReceived=TE_Endpoint_2<"adsControlFlowOpportunityReceivedCommand",DC_AdsControlFlowOpportunityReceived>;
type C_ChangeKeyedMarkersVisibility=TE_Endpoint_2<"changeKeyedMarkersVisibilityCommand",DC_ChangeKeyedMarkersVisibility>;
type C_Continuation=TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation,M_Next>;
type C_Executor=TE_Endpoint_2<"commandExecutorCommand",DC_Executor>;
type C_FollowUp=TE_Endpoint_2<"addFollowUpSurveyCommand",DC_AddFollowUpSurvey>;
type C_GetSurvey=TE_Endpoint_3<"getSurveyCommand",DC_GetSurvey,MG_Survey_CMD>;
type C_LoadMarkers=TE_Endpoint_2<"loadMarkersCommand",DC_LoadMarkers>;
type C_RefreshPlaylist=TE_Endpoint_2<"refreshPlaylistCommand",DC_RefreshPlaylist>;
type C_RelatedChip=TE_Endpoint_2<"relatedChipCommand",DC_RelatedChip>;
type C_ReloadContinuationItems=TE_Endpoint_2<"reloadContinuationItemsCommand",DC_ReloadContinuationItems>;
type C_RepeatChapter=TE_Endpoint_2<"repeatChapterCommand",DC_RepeatChapter>;
type C_ResetChannelUnreadCount=TE_Endpoint_2<"resetChannelUnreadCountCommand",DC_ResetChannelUnreadCount>;
type C_ShowReloadUi=TE_Endpoint_2<"showReloadUiCommand",DC_ShowReloadUi>;
type C_Loop=TE_Endpoint_2<"loopCommand",DC_Loop>;
//#endregion
type Cmp_Is_Endpoint_3<T extends TE_Endpoint_3<any,any,any>>=T;
type Cmp_Is_Endpoint_2<T extends TE_Endpoint_2<any,any>>=T;
