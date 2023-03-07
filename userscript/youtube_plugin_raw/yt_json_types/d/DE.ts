type DE_SubmitFeedback=T_Signal<"SUBMIT_FEEDBACK">;


//#region String Enum
type DE_AdPlacementKind=T_EnumStr<"AD_PLACEMENT_KIND","END"|"SELF_START"|"START">;
type DE_OpportunityType=T_EnumStr<"OPPORTUNITY_TYPE",T_EnumStr<"ORGANIC",T_EnumStr<"BROWSE"|"WATCH_NEXT","RESPONSE_RECEIVED">>>;
type DE_IconType_Button=
	|"SETTINGS"|"DELETE"
	|"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
	|"CHEVRON_RIGHT"|"CHEVRON_LEFT"|"REMOVE"|"INFO"|"CLOSE"|"MICROPHONE_ON"
	;
;
type DE_MP_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",
	|"SWITCHER"
	|"CREATION"
	|"NOTIFICATIONS"
	|"ACCOUNT"
>;
//#endregion
//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611_BaseUrl=
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
type DE_VE3611={
	params?: string; browseId: T_IdTemplate<"UC",D_UserIdStr>;
	canonicalBaseUrl?: DE_VE3611_BaseUrl;
	query?: string;
};
type DE_VE3854=DE_VE<"FEwhat_to_watch">;
type DE_VE5754=DE_VE<T_IdTemplate<"VL">>|{
	browseId: T_IdTemplate<"VL">;
	canonicalBaseUrl: `/playlist?list=PL${string}`;
};
type DE_VE6827={
	browseId: GU_VE6827_Id;
	params?: string;
	query?: "";
};
type DE_VE11487=DE_VE<"SPunlimited">;
type DE_VE23462=DE_VE<GU_VE23462_Id>;
type DE_VE42352=DE_VE<"FEdownloads">;
type DE_VE96368=DE_VE<"FEsubscriptions">;
//#endregion
//#region DE_
//#region Objects
type DE_AdditionalDatas={additionalDatas: G_AdditionalDataItem[];};
type DE_AddToPlaylistService={videoId: string;};
type DE_AdFeedback={content: R_AdFeedback;};
type DE_BucketIdentifier={bucketIdentifier: "live_chat"; hack: true;};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_Feedback_ActionItem=C_FilterChipTransform|A_ReplaceEnclosing;
type DE_Feedback={feedbackToken: string; uiActions?: D_HideEnclosingContainer; actions?: DE_Feedback_ActionItem[];};
type DE_GetNotificationMenu={ctoken: string;};
type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
type DE_MuteAd={type: "HIDE"; actions: A_HideEnclosing[];};
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type DE_PerformCommentAction={action: string; clientActions: A_UpdateCommentVote[];};
type DE_PlaylistDelete=D_PlaylistId;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId?: "WL"; params?: string;};
type DE_PlaylistEditor=D_PlaylistId;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type DE_Search={params?: string; query: string;};
type DE_Settings={browseId: "SPaccount_overview";};
type DE_ShareEntityService={serializedShareEntity: string; commands: A_ShareEntityService[];};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
type DE_Subscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
type DE_Unsubscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
type DE_Upload=B_Hack;
type DE_VE83769_Url_SearchObj={gclid: string;};
type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
type DE_WebPlayerShareEntityService={serializedShareEntity: string;};
type DE_YpcGetCart={transactionParams: string;};
//#endregion
//#region Only params
type DE_GetReportForm=DC_Params;
type DE_GetTranscript=DC_Params;
type DE_YpcGetOffers=DC_Params;
type DE_YpcGetOfflineUpsell=DC_Params;
//#endregion
//#endregion
//#region Unions
type G_DE_MutationItem=DE_MutationReplace|DE_MutationDelete;
type G_DE_UserFeedback=DE_AdditionalDatas|DE_BucketIdentifier;
//#endregion
