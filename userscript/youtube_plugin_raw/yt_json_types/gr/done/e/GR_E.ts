//#region Endpoints
// TODO: #8 Get the SettingsEndpoint type
type E_Settings={_tag: "E_Settings";};

type E_AddToPlaylistService=TE_Endpoint_3<"addToPlaylistServiceEndpoint",DE_AddToPlaylistService,M_AddToPlaylistService>;
type E_CreateBackstagePost=TE_Endpoint_3<"createBackstagePostEndpoint",DE_CreateBackstagePost,M_CreateBackstagePost>;
type E_CreateComment=TE_Endpoint_3<"createCommentEndpoint",DE_CreateComment,M_CreateComment>;
type E_Feedback=TE_Endpoint_3<"feedbackEndpoint",DE_Feedback,M_Feedback>;
type E_GetNotificationMenu=TE_Endpoint_3<"getNotificationMenuEndpoint",DE_GetNotificationMenu,M_GetNotificationMenu>;
type E_GetReportForm=TE_Endpoint_3<"getReportFormEndpoint",DE_GetReportForm,M_FlagGetForm>;
type E_GetTranscript=TE_Endpoint_3<"getTranscriptEndpoint",DE_GetTranscript,DE_Empty_WCM>;
interface E_Like extends TE_Endpoint_3<"likeEndpoint",DE_Like,M_Like> {};
type E_NotificationOptOut=TE_Endpoint_3<"notificationOptOutEndpoint",DE_NotificationOptOut,DE_Empty_WCM>;
type E_PlaylistEdit=TE_Endpoint_3<"playlistEditEndpoint",DE_PlaylistEdit,M_EditPlaylist>;
type E_PlaylistEditor=TE_Endpoint_3<"playlistEditorEndpoint",DE_PlaylistEditor,DE_Empty_WCM>;
type E_RecordNotificationInteractions=TE_Endpoint_3<"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions,M_RecordInteractions>;
type E_ReelWatch=TE_Endpoint_3<"reelWatchEndpoint",DE_ReelWatch,TM_Gen<GM_VE37414_WC>>;
type E_Search=TE_Endpoint_3<"searchEndpoint",DE_Search,M_VE4724>;
type E_SetSetting=TE_SetSetting<"407",boolean,"AUTONAV_FOR_DESKTOP">;
type G_ClientSignal={
	signal: "CLIENT_SIGNAL";
	actions: G_ClientSignal_Item[];
};
type Popup_ClientSignal=TA_OpenPopup_Toast<RA_NotificationAction>|TA_OpenPopup_TopAlignedDialog<R_VoiceSearchDialog>;
type OpenPopup_ClientSignal=TA_OpenPopup<Popup_ClientSignal>;
type G_ClientSignal_Item=[
	A_SendFeedback,
	A_Signal,
	C_AddToPlaylist,
	E_ShowEngagementPanel,
	OpenPopup_ClientSignal,
][number];
type E_ShowEngagementPanel=TE_Endpoint_2<"showEngagementPanelEndpoint",DE_ShowEngagementPanel>;
type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DE_SignalNavigation,M_VE83769>;
type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,M_Feedback>;
type E_Upload=TE_Endpoint_3<"uploadEndpoint",B_Hack,M_VE83769>;
type E_Url=TE_Endpoint_3<"urlEndpoint",DU_DE_Url,M_VE83769>;
type E_Watch=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,DE_Empty_WCM>;
type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",DE_YpcGetOffers,DE_Empty_WCM>;
type E_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
type E_YpcGetOfflineUpsell=TE_Endpoint_2<"ypcGetOfflineUpsellEndpoint",DE_YpcGetOfflineUpsell>;
//#endregion
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type DE_PlaylistEditor={playlistId: D_PlaylistId;};
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type DE_ReelWatch={videoId: string;}|{thumbnail: R_Thumbnail;}|{playerParams: string; overlay: R_ReelPlayerOverlay; params: string;}|{sequenceProvider: "REEL_WATCH_SEQUENCE_PROVIDER_RPC"; sequenceParams: string;}|{inputType: "REEL_WATCH_INPUT_TYPE_SEEDLESS";};
type DE_Search={query: string;};
type DE_AddToPlaylistService={videoId: string;};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_Feedback={feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];};
type DE_GetNotificationMenu={ctoken: string;};
type DE_Like=DE_Like_NS.DE_Like;
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
