//#region Endpoints
type E_AddToPlaylistService=TE_Endpoint_3<"addToPlaylistServiceEndpoint",DE_AddToPlaylistService,M_AddToPlaylistService>;
type DE_AddToPlaylistService={videoId: string;};
type E_CreateBackstagePost=TE_Endpoint_3<"createBackstagePostEndpoint",DE_CreateBackstagePost,M_CreateBackstagePost>;
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type E_CreateComment=TE_Endpoint_3<"createCommentEndpoint",DE_CreateComment,M_CreateComment>;
type DE_CreateComment={createCommentParams: string;};
type E_Feedback=TE_Endpoint_3<"feedbackEndpoint",DE_Feedback,M_Feedback>;
type DE_Feedback={feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];};
type E_GetNotificationMenu=TE_Endpoint_3<"getNotificationMenuEndpoint",DE_GetNotificationMenu,M_GetNotificationMenu>;
type DE_GetNotificationMenu={ctoken: string;};
type E_GetReportForm=TE_Endpoint_3<"getReportFormEndpoint",DC_Params,M_FlagGetForm>;
type E_GetTranscript=TE_Endpoint_3<"getTranscriptEndpoint",DC_Params,DC_Empty_WCM>;
interface E_Like extends TE_Endpoint_3<"likeEndpoint",DE_Like,M_Like> {};
type DE_Like=DE_Like_NS.DE_Like;
type E_NotificationOptOut=TE_Endpoint_3<"notificationOptOutEndpoint",DE_NotificationOptOut,DC_Empty_WCM>;
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type E_PlaylistEdit=TE_Endpoint_3<"playlistEditEndpoint",DE_PlaylistEdit,M_EditPlaylist>;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type E_PlaylistEditor=TE_Endpoint_3<"playlistEditorEndpoint",DE_PlaylistEditor,DC_Empty_WCM>;
type DE_PlaylistEditor={playlistId: D_PlaylistId;};
type E_RecordNotificationInteractions=TE_Endpoint_3<"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions,M_RecordInteractions>;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type E_ReelWatch=TE_Endpoint_3<"reelWatchEndpoint",DE_ReelWatch,TM_Gen<GM_VE37414_WC>>;
type DE_ReelWatch={videoId: string;}|{thumbnail: R_Thumbnail;}|{playerParams: string; overlay: R_ReelPlayerOverlay; params: string;}|{sequenceProvider: "REEL_WATCH_SEQUENCE_PROVIDER_RPC"; sequenceParams: string;}|{inputType: "REEL_WATCH_INPUT_TYPE_SEEDLESS";};
type E_Search=TE_Endpoint_3<"searchEndpoint",DE_Search,M_VE4724>;
type DE_Search={query: string;};
type E_SetSetting=TE_SetSetting<"407",boolean,"AUTONAV_FOR_DESKTOP">;
type S_Client_Item=[
	E_ShowEngagementPanel,
	A_SendFeedback,
	A_Signal,
	C_AddToPlaylist,
	TA_OpenPopup<TA_OpenPopup_Toast<RA_NotificationAction>|TA_OpenPopup_TopAlignedDialog<R_VoiceSearchDialog>>,
][number];
type E_ShowEngagementPanel={clickTrackingParams: string; showEngagementPanelEndpoint: DE_ShowEngagementPanel;};
type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DU_SignalNavigation,M_VE83769>;
type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,DC_Empty_WCM>;
type E_Upload=TE_Endpoint_3<"uploadEndpoint",B_Hack,DC_Empty_WCM>;
type E_Url=TE_Endpoint_3<"urlEndpoint",DU_DE_Url,M_VE83769>;
type E_Watch=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,DC_Empty_WCM>;
type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",DC_Params,DC_Empty_WCM>;
type E_YpcGetOfflineUpsell={clickTrackingParams: string; ypcGetOfflineUpsellEndpoint: DC_Params;};
//#endregion
type E_Settings={_tag:"E_Settings"};