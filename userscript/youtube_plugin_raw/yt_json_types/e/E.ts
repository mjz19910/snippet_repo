//#region Endpoints (E_)
type E_AddToPlaylistService=TE_Endpoint_3<"addToPlaylistServiceEndpoint",DE_AddToPlaylistService,M_AddToPlaylistService>;
type E_CreateBackstagePost=TE_Endpoint_3<"createBackstagePostEndpoint",DE_CreateBackstagePost,M_CreateBackstagePost>;
type E_CreateComment=TE_Endpoint_3<"createCommentEndpoint",DE_CreateComment,M_CreateComment>;
type E_CreatePlaylistService=TE_Endpoint_3<"createPlaylistServiceEndpoint",DS_CreatePlaylist,M_CreatePlaylist>;
type E_Feedback=TE_Endpoint_3<"feedbackEndpoint",DE_Feedback,M_Feedback>;
type E_GetNotificationMenu=TE_Endpoint_3<"getNotificationMenuEndpoint",DE_GetNotificationMenu,M_GetNotificationMenu>;
type E_GetReportForm=TE_Endpoint_3<"getReportFormEndpoint",DE_GetReportForm,M_FlagGetForm>;
type E_GetTranscript=TE_Endpoint_3<"getTranscriptEndpoint",DE_GetTranscript,M_GetTranscript>;
type E_Like=TE_Endpoint_3<"likeEndpoint",DE_Like,M_Like>;
type E_NotificationOptOut=TE_Endpoint_3<"notificationOptOutEndpoint",DE_NotificationOptOut,M_NotificationOptOut>;
type E_PlaylistEdit=TE_Endpoint_3<"playlistEditEndpoint",DE_PlaylistEdit,M_EditPlaylist>;
type E_PlaylistEditor=TE_Endpoint_3<"playlistEditorEndpoint",DE_PlaylistEditor,M_GetSettingsEditor>;
type E_RecordNotificationInteractions=TE_Endpoint_3<"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions,M_RecordInteractions>;
type E_SetSetting=TE_SetSetting<"407",boolean,"AUTONAV_FOR_DESKTOP">;
type E_ShareEntityService=TE_Endpoint_3<"shareEntityServiceEndpoint",DE_ShareEntityService,M_GetSharePanel>;
type E_ShowEngagementPanel=TE_Endpoint_2<"showEngagementPanelEndpoint",DE_ShowEngagementPanel>;
type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DE_SignalNavigation,M_Url>;
type E_SignalService_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;
type E_SignalService_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,M_Feedback>;
type E_Unsubscribe=TE_Endpoint_3<"unsubscribeEndpoint",DE_Unsubscribe,M_Unsubscribe>;
type E_Upload=TE_Endpoint_3<"uploadEndpoint",DE_Upload,M_Url>;
type E_UserFeedback=TE_Endpoint_3<"userFeedbackEndpoint",G_DE_UserFeedback,M_UserFeedback>;
type E_Watch_2=TE_Endpoint_NoTrack_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
type E_Watch_3=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
type E_Watch={
	clickTrackingParams?: string;
	commandMetadata: M_VE3832;
	watchEndpoint: DE_VE3832_Watch;
};
type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,M_VE3832>;
type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",DE_YpcGetOffers,M_YpcGetOffers>;
type E_YpcGetOfflineUpsell=TE_Endpoint_2<"ypcGetOfflineUpsellEndpoint",DE_YpcGetOfflineUpsell>;
type E_Url={
	clickTrackingParams: string;
	loggingUrls?: T_BaseUrl<`https://www.youtube.com/pagead/paralleladinteraction?ai=${string}&sigh=${string}&cid=${string}&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&nb=%5BNB%5D&label=video_click_to_advertiser_site`>[];
	commandMetadata: M_Url;
	urlEndpoint: DE_Url;
};
type E_WebPlayerShareEntityService=TE_Endpoint_3<"webPlayerShareEntityServiceEndpoint",DE_WebPlayerShareEntityService,M_GetWebPlayerSharePanel>;
type E_AddUpcomingEventReminder=TE_Endpoint_3<"addUpcomingEventReminderEndpoint",DC_Params,M_AddUpcomingEventReminder>;
type E_RemoveUpcomingEventReminder=TE_Endpoint_3<"removeUpcomingEventReminderEndpoint",DC_Params,M_RemoveUpcomingEventReminder>;
type M_RemoveUpcomingEventReminder=TM_Gen<GM_RemoveUpcomingEventReminder>;
type GM_RemoveUpcomingEventReminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/remove_upcoming_event_reminder";
};
type M_PlaylistDelete=TM_Gen<GM_PlaylistDelete>;
type GM_PlaylistDelete={sendPost: true; apiUrl: "/youtubei/v1/playlist/delete";};
type E_PlaylistDelete=TE_Endpoint_3<"deletePlaylistEndpoint",DE_PlaylistDelete,M_PlaylistDelete>;
type GM_PerformCommentAction={
	sendPost: true;
	apiUrl: "/youtubei/v1/comment/perform_comment_action";
};
type M_PerformCommentAction=TM_Gen<GM_PerformCommentAction>;
type AD_UpdateCommentVote={
	voteCount?: G_Text;
	voteStatus: "LIKE";
};
type A_UpdateCommentVote={
	clickTrackingParams: string;
	updateCommentVoteAction: AD_UpdateCommentVote;
};
type E_PerformCommentAction=TE_Endpoint_3<"performCommentActionEndpoint",DE_PerformCommentAction,M_PerformCommentAction>;
type E_Pinging={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://pagead2.googlesyndication.com/pcs/activeview?xai=${string}&sai=${string}&sig=${string}&cid=${string}&acvw=[VIEWABILITY]`|`https://googleads.g.doubleclick.net/pagead/interaction/?ai=${string}&sigh=${string}&label=noop_tap`>[];
	pingingEndpoint: B_Hack;
};
type E_AdFeedback={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://googleads.g.doubleclick.net/pagead/interaction/?${string}`>[];
	adFeedbackEndpoint: DE_AdFeedback;
};
type E_MuteAd=TE_Endpoint_2<"muteAdEndpoint",DE_MuteAd>;
//#endregion
type EG_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
