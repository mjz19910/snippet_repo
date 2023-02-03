//#region Common data
type M_Empty_WCM={webCommandMetadata: {};};
type DC_Params={params: string;};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
//#endregion
//#region ContinuationData
type DC_ResetChannelUnreadCount={};
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
};
type DC_AdsControlFlowOpportunityReceived={
	opportunityType: DE_OpportunityType;
	adSlotAndLayoutMetadata?: D_AdSlotAndLayoutItem[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};
type DC_Continuation_Shape={
	token: string;
	request: DC_Continuation["request"];
};
type DC_Continuation=
	|{
		token: string;
		request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT";
		command: C_ShowReloadUi;
	}
	|{
		token: string;
		request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE";
	}
	|{
		token: string;
		request: "CONTINUATION_REQUEST_TYPE_BROWSE";
		command: C_ShowReloadUi;
	}
	|{
		token: string;
		request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT";
	}
	|{
		token: string;
		request: "CONTINUATION_REQUEST_TYPE_BROWSE";
	}
	;
;
//#region DC_
type DC_EngagementPanelHeaderShowNavigationButton={
	targetId: "engagement-panel-macro-markers-description-chapters";
	navigationButton: R_Button;
};
type DC_GetSurvey={
	endpoint: D_Survey_Watch;
	action: "SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL";
}|{
	endpoint: D_PaidDigitalGoods;
	action: "FOR_D_PaidDigitalGoods";
};
// TODO: #14 Need type of DC_RefreshPlaylist
type DC_RefreshPlaylist={};
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
type DC_AddToPlaylist=
	|{
		listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE";
		onCreateListCommand: E_CreatePlaylistService;
		openMiniplayer: boolean;
		videoId: D_VideoId;
		videoIds: D_VideoId[];
	}
	|{
		openMiniplayer: false;
		openListPanel: true;
		videoId: D_VideoId;
		listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE";
		onCreateListCommand: E_CreatePlaylistService;
		videoIds: D_VideoId[];
	}
	;
;
// TODO #4
type DC_PlaylistPanel={};
// TODO: #15 Need type of DC_MusicShelf
type DC_MusicShelf={};
//#endregion
