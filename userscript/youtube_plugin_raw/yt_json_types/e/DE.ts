//#region DE_
//#region Objects
type DE_AddToPlaylistService={videoId: string;};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_Feedback=
	|{feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];}
	|{feedbackToken: string;}
	;
;
type DE_GetNotificationMenu={ctoken: string;};
type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type DE_PlaylistEditor={playlistId: D_PlaylistId;};
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type D_SerializedContextData={
	serializedContextData: string;
};
type D_LoggingContext={
	vssLoggingContext: D_SerializedContextData;
	qoeLoggingContext: D_SerializedContextData;
};

type DE_ReelWatch=
	|never
	|{
		videoId: string;
		playerParams: string;
		thumbnail: D_Thumbnail;
		overlay: R_ReelPlayerOverlay;
		params: string;
		loggingContext?: {
			vssLoggingContext: D_SerializedContextData;
			qoeLoggingContext: D_SerializedContextData;
		};
		sequenceProvider?: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";
		sequenceParams?: string;
	}
	|{
		playerParams: string;
		overlay: R_ReelPlayerOverlay;
		params: string;
		sequenceProvider: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";
		inputType: "REEL_WATCH_INPUT_TYPE_SEEDLESS";
		loggingContext?: D_LoggingContext;
	}
	;
;
type DE_Search={query: string;};
type DE_ShareEntityService={serializedShareEntity: string; commands: TA_OpenPopup<Popup_ShareEntityService>[];};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
//#endregion
//#region Only params
type DE_GetReportForm=DC_Params;
type DE_GetTranscript=DC_Params;
type DE_YpcGetOffers=DC_Params;
type DE_YpcGetOfflineUpsell=DC_Params;
//#endregion