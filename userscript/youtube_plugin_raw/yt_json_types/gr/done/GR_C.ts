//#region Commands
type C_AddToPlaylist={clickTrackingParams: string; addToPlaylistCommand: DC_AddToPlaylist;};
type C_AdsControlFlowOpportunityReceived={clickTrackingParams: string; adsControlFlowOpportunityReceivedCommand: DC_AdsControlFlowOpportunityReceived;};
type DC_AdsControlFlowOpportunityReceived={
	opportunityType: DE_OpportunityType;
	adSlotAndLayoutMetadata?: D_AdSlotAndLayoutItem[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};
type C_ChangeKeyedMarkersVisibility={clickTrackingParams: string; changeKeyedMarkersVisibilityCommand: DC_ChangeKeyedMarkersVisibility;};
type DC_ChangeKeyedMarkersVisibility={
	isVisible: true;
	key: "HEATSEEKER";
};
type C_Continuation=TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation,M_Next>|{clickTrackingParams: string; commandMetadata: M_Next|undefined; continuationCommand: DC_Continuation;};
type DC_Continuation={
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE";
}|{
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_BROWSE";
	command: C_ShowReloadUi;
}|{
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT";
};
type C_Executor={clickTrackingParams: string; commandExecutorCommand: DC_Executor;};
type DC_Executor=Record<"commands",AC_Executor[]>;
type C_FollowUp={clickTrackingParams: string; addFollowUpSurveyCommand: C_AddFollowUpSurvey;};
type C_AddFollowUpSurvey={
	followUpOptions: G_FollowUpOption[];
	followUpText: G_Text;
};
type C_GetSurvey={clickTrackingParams: string; commandMetadata: MG_Survey_CMD; getSurveyCommand: D_GetSurvey;};
type D_GetSurvey={
	endpoint: R_PaidDigitalGoods;
	action: string;
};
type C_LoadMarkers={clickTrackingParams: string; loadMarkersCommand: DC_LoadMarkers;};
type DC_LoadMarkers={
	entityKeys: string[];
};
type C_RefreshPlaylist={clickTrackingParams: string; refreshPlaylistCommand: D_RefreshPlaylist;};
type D_RefreshPlaylist={};
type C_RelatedChip={clickTrackingParams: string; relatedChipCommand: DC_RelatedChip;};
type DC_RelatedChip={
	targetSectionIdentifier: "sid-wn-chips";
	loadCached: true;
};
type C_ReloadContinuationItems={clickTrackingParams: string; reloadContinuationItemsCommand: DC_ReloadContinuationItems;};
type DC_ReloadContinuationItems={
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: G_SectionItem[];
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: R_CommentsHeader[];
};
type C_RepeatChapter={clickTrackingParams: string; repeatChapterCommand: DC_RepeatChapter;};
type DC_RepeatChapter={
	repeat: "REPEAT_CHAPTER_TYPE_ENABLE_REPEAT";
	startTimeMs: "0";
	endTimeMs: "60000";
	repeatStateEntityKey: string;
};
type C_ResetChannelUnreadCount={clickTrackingParams: string; resetChannelUnreadCountCommand: DC_ResetChannelUnreadCount;};
type DC_ResetChannelUnreadCount={};
type C_ShowReloadUi={clickTrackingParams: string; showReloadUiCommand: DC_ShowReloadUi;};
type DC_ShowReloadUi={targetId: D_UiTargetId;};
type C_Loop={clickTrackingParams: string; loopCommand: DC_Loop;};
type DC_Loop={loop: false;};
//#endregion
