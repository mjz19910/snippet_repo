//#region Common data
type DE_Empty_WCM={webCommandMetadata: {};};
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
}; type DC_AdsControlFlowOpportunityReceived={
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
type D_GenSurvey_ActionStr="SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL";
type DC_Executor=Record<"commands",AC_Executor[]>;
type DC_AddFollowUpSurvey={followUpOptions: G_FollowUpOption[]; followUpText: G_Text;};
type DC_RelatedChip={targetSectionIdentifier: "sid-wn-chips"; loadCached: true;};
// type GDC_GetSurvey_Endpoint=D_PaidDigitalGoods|D_Survey_Watch;
type DC_GetSurvey={
	endpoint: D_Survey_Watch;
	action: "SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL";
}|{
	endpoint: D_PaidDigitalGoods;
	action: "FOR_D_PaidDigitalGoods";
};
// TODO: #14 Need type of DC_RefreshPlaylist
type DC_RefreshPlaylist={};
type DC_Generic={continuation: string;};
type DC_Invalidation={
	invalidationId: D_InvalidationId;
	timeoutMs: 10000;
	continuation: string;
	clickTrackingParams?: string;
};
type DC_LiveChat={
	continuations: G_LiveChatContinuationItem[];
	actions?: G_RA_LiveChatContinuationActions[];
	actionPanel?: R_LiveChatMessageInput;
	itemList?: R_LiveChatItemList;
	header?: R_LiveChatHeader;
	ticker?: R_LiveChatTicker;
	trackingParams: string;
	participantsList?: R_LiveChatParticipantsList;
	popoutMessage?: R_Message;
	emojis?: D_LiveChatEmoji[];
	clientMessages?: D_ClientMessages;
	viewerName?: string;
};
// TODO: #15 Need type of DC_MusicShelf
type DC_MusicShelf={};
type DC_LiveChatReplay={
	timeUntilLastMessageMsec: number;
	continuation: string;
};
// TODO #4
type DC_PlaylistPanel={};
type DC_SectionListBase=T_DC_Content<TR_ItemSection_3<R_ContinuationItem,"comment-item-section","engagement-panel-comments-section">>;
type DC_SectionList_BrowseFeed_ChannelFeatured=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3_Empty>;
type DC_SectionList_BrowseFeed_Subscriptions=T_DC_Content_2<"browse-feedFEsubscriptions",TR_SectionListItem_3_Empty>;
type DC_SectionList_SearchFeed=T_DC_Content_2<"search-feed",TR_SectionListItem_3_Empty>;
type DC_SectionList_T=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3_Empty>;
type DC_Timed={
	timeoutMs: 60000;
	continuation: string;
};
type DC_UpdateToggleButtonState={
	toggled: false;
	buttonId: "TOGGLE_BUTTON_ID_TYPE_STRUCTURED_DESCRIPTION";
};
//#endregion
