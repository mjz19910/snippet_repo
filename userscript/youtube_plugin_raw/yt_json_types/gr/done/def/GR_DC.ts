//#region Common data
type DC_Empty_WCM={webCommandMetadata: {};};
type DC_Params={params: string;};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
//#endregion
//#region ContinuationData
type DC_ResetChannelUnreadCount={};
type DC_LoadMarkers={entityKeys: string[];};
type DC_ShowReloadUi={targetId: D_UiTargetId;};
type DC_Loop={loop: false;};
type DC_RepeatChapter={
	repeat: "REPEAT_CHAPTER_TYPE_ENABLE_REPEAT";
	startTimeMs: "0";
	endTimeMs: "60000";
	repeatStateEntityKey: string;
};
type DC_ReloadContinuationItems={
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: G_SectionItem[];
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: R_CommentsHeader[];
};type DC_AdsControlFlowOpportunityReceived={
	opportunityType: DE_OpportunityType;
	adSlotAndLayoutMetadata?: D_AdSlotAndLayoutItem[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};
type DC_ChangeKeyedMarkersVisibility={
	isVisible: true;
	key: "HEATSEEKER";
};
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
type DC_Executor=Record<"commands",AC_Executor[]>;
type DC_AddFollowUpSurvey={followUpOptions: G_FollowUpOption[];followUpText: G_Text;};
type DC_RelatedChip={targetSectionIdentifier: "sid-wn-chips";loadCached: true;};
type DC_GetSurvey_Endpoint=D_PaidDigitalGoods|D_Survey_Watch;
type DC_GetSurvey={endpoint: DC_GetSurvey_Endpoint;action: string;};
// TODO: #14 Need type of DC_RefreshPlaylist
type DC_RefreshPlaylist={};
//#endregion
