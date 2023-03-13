//#region Common data
type DC_Params={params: string;};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
//#endregion
//#region ContinuationData
type DC_ChangeKeyedMarkersVisibility={key: "HEATSEEKER"; isVisible: true;};
type DC_RepeatChapter={
	repeat: "REPEAT_CHAPTER_TYPE_ENABLE_REPEAT";
	startTimeMs: "0";
	endTimeMs: `${number}`;
	repeatStateEntityKey: string;
};
type DC_ReloadContinuationItems={
	targetId: SI_VE76278_EngagementPanel["targetId"];
	continuationItems: R_CommentThread[];
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
}|{
	targetId: D_TargetIdUuid;
	continuationItems: R_RichItem[];
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
}|{
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: G_SectionItem[];
}|{
	targetId: "comments-section";
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
}|{
	targetId: "comments-section";
	continuationItems: R_CommentThread[];
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: R_CommentsHeader[];
}|{
	targetId: D_TargetIdUuid;
	continuationItems: R_FeedFilterChipBar[];
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
}|{
	targetId: SI_VE76278_EngagementPanel["targetId"];
	continuationItems: R_CommentsHeader[];
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
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
type DC_Continuation_Omit_Return<T>=
	Omit<T,"token"|"request"> extends infer y?
	|["BROWSE",y]
	|["REEL_WATCH_SEQUENCE",y]
	|["WATCH_NEXT",y]
	|[null,y]:
	never
	;
;
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
		videoId: DU_VideoId;
		videoIds: DU_VideoId[];
	}
	|{
		openMiniplayer: false;
		openListPanel: true;
		videoId: DU_VideoId;
		listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE";
		onCreateListCommand: E_CreatePlaylistService;
		videoIds: DU_VideoId[];
	}
	;
;
