//#region Endpoints (E_)
// TODO: #8 Get the SettingsEndpoint type
type E_Settings={_tag: "E_Settings";};

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
type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DE_SignalNavigation,M_VE83769>;
type E_SignalService_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;
type E_SignalService_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,M_Feedback>;
type DE_VE83769_Url_SearchObj={gclid: string;};
type DE_VE83769_Url_1$d$ad_url2={
	utm_term: "";
	utm_campaign: "DISPLAY campaign for \"web development\" landing page";
	utm_source: "adwords";
	utm_medium: "ppc";
	hsa_acc: `${number}`;
	hsa_cam: `${number}`;
	hsa_grp: `${number}`;
	hsa_ad: `${number}`;
	hsa_src: "d";
	hsa_tgt: "";
	hsa_kw: "";
	hsa_mt: "";
	hsa_net: "adwords";
	hsa_ver: "3";
	gclid: string;
};
type DE_VE83769_Url_Shape={
	sa: "l";
	ai: string;
	ae: "1";
	num: "1";
	cid: string;
	sig: string;
	client: `ca-pub-${number}`;
	rf: "3";
	adurl: `https://plantagreenhouses.ca/?gclid=${string}`|`https://www.newdawndevelopments.com/service/custom-homes?gclid=${string}&hsa_ver=3&hsa_net=adwords&hsa_mt=&hsa_kw=&hsa_tgt=&hsa_src=d&hsa_ad=${number}&hsa_grp=${number}&hsa_cam=${number}&hsa_acc=${number}&utm_medium=ppc&utm_source=adwords&utm_campaign=DISPLAY+campaign+for+%22web+development%22+landing+page&utm_term=`;
};
type DE_VE83769_Url_1={
	url: `https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`;
	target: "TARGET_NEW_WINDOW";
};

type E_Watch=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>|{
	watchEndpoint: DE_VE3832_Watch;
	commandMetadata: M_VE3832;
};
type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,M_VE3832>;
type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",DE_YpcGetOffers,M_YpcGetOffers>;
type E_YpcGetOfflineUpsell=TE_Endpoint_2<"ypcGetOfflineUpsellEndpoint",DE_YpcGetOfflineUpsell>;
type E_UserFeedback=TE_Endpoint_3<"userFeedbackEndpoint",G_DE_UserFeedback,M_UserFeedback>;
type E_Unsubscribe=TE_Endpoint_3<"unsubscribeEndpoint",DE_Unsubscribe,M_Unsubscribe>;
type E_WebPlayerShareEntityService={
	clickTrackingParams: string;
	commandMetadata: M_GetWebPlayerSharePanel;
	webPlayerShareEntityServiceEndpoint: DE_WebPlayerShareEntityService;
};
type E_AddUpcomingEventReminder={
	clickTrackingParams: string;
	commandMetadata: M_AddUpcomingEventReminder;
	addUpcomingEventReminderEndpoint: DC_Params;
};
type E_RemoveUpcomingEventReminder={
	clickTrackingParams: string;
	commandMetadata: M_RemoveUpcomingEventReminder;
	removeUpcomingEventReminderEndpoint: DC_Params;
};
type E_PlaylistDelete={
	clickTrackingParams: string;
	commandMetadata: M_PlaylistDelete;
	deletePlaylistEndpoint: DE_PlaylistDelete;
};
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
type E_MuteAd={
	clickTrackingParams: string;
	muteAdEndpoint: DE_MuteAd;
};
type E_PerformCommentAction={performCommentActionEndpoint: {};};
//#endregion
type EG_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
type E_Page=YTNavigateFinishDetail['endpoint'];
