import {B_Hack} from "../abc/B.js";
import {DS_CreatePlaylist} from "../d/group_D.js";
import {DC_Params} from "../d/group_D/group_DC.js";
import {DE_VE3832_Watch,DE_Url} from "../d/group_DE/DE_LongObjects.js";
import {G_ClientSignal,G_Text} from "../ghi/_group.mod/G.js";
import {TE_Endpoint_3,TE_SetSetting,TE_Endpoint_2,T_SE_Signal,TE_Endpoint_NoTrack_3,T_BaseUrl,TM_Gen} from "../stu/mod/group_T.js";

//#region Endpoints (E_)
export type E_AddToPlaylistService=TE_Endpoint_3<"addToPlaylistServiceEndpoint",DE_AddToPlaylistService,M_AddToPlaylistService>;
export type E_CreateBackstagePost=TE_Endpoint_3<"createBackstagePostEndpoint",DE_CreateBackstagePost,M_CreateBackstagePost>;
export type E_CreateComment=TE_Endpoint_3<"createCommentEndpoint",DE_CreateComment,M_CreateComment>;
export type E_CreatePlaylistService=TE_Endpoint_3<"createPlaylistServiceEndpoint",DS_CreatePlaylist,M_CreatePlaylist>;
export type E_Feedback=TE_Endpoint_3<"feedbackEndpoint",DE_Feedback,M_Feedback>;
export type E_GetNotificationMenu=TE_Endpoint_3<"getNotificationMenuEndpoint",DE_GetNotificationMenu,M_GetNotificationMenu>;
export type E_GetReportForm=TE_Endpoint_3<"getReportFormEndpoint",DE_GetReportForm,M_FlagGetForm>;
export type E_GetTranscript=TE_Endpoint_3<"getTranscriptEndpoint",DE_GetTranscript,M_GetTranscript>;
export type E_Like=TE_Endpoint_3<"likeEndpoint",DE_Like,M_Like>;
export type E_NotificationOptOut=TE_Endpoint_3<"notificationOptOutEndpoint",DE_NotificationOptOut,M_NotificationOptOut>;
export type E_PlaylistEdit=TE_Endpoint_3<"playlistEditEndpoint",DE_PlaylistEdit,M_EditPlaylist>;
export type E_PlaylistEditor=TE_Endpoint_3<"playlistEditorEndpoint",DE_PlaylistEditor,M_GetSettingsEditor>;
export type E_RecordNotificationInteractions=TE_Endpoint_3<"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions,M_RecordInteractions>;
export type E_SetSetting=TE_SetSetting<"407",boolean,"AUTONAV_FOR_DESKTOP">;
export type E_ShareEntityService=TE_Endpoint_3<"shareEntityServiceEndpoint",DE_ShareEntityService,M_GetSharePanel>;
export type E_ShowEngagementPanel=TE_Endpoint_2<"showEngagementPanelEndpoint",DE_ShowEngagementPanel>;
export type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DE_SignalNavigation,M_Url>;
export type E_SignalService_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;
export type E_SignalService_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
export type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
export type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,M_Feedback>;
export type E_Unsubscribe=TE_Endpoint_3<"unsubscribeEndpoint",DE_Unsubscribe,M_Unsubscribe>;
export type E_Upload=TE_Endpoint_3<"uploadEndpoint",DE_Upload,M_Url>;
export type E_UserFeedback=TE_Endpoint_3<"userFeedbackEndpoint",G_DE_UserFeedback,M_UserFeedback>;
export type E_Watch_2=TE_Endpoint_NoTrack_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
export type E_Watch_3=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
export type E_Watch={
	clickTrackingParams?: string;
	commandMetadata: M_VE3832;
	watchEndpoint: DE_VE3832_Watch;
};
export type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,M_VE3832>;
export type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
export type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",DE_YpcGetOffers,M_YpcGetOffers>;
export type E_YpcGetOfflineUpsell=TE_Endpoint_2<"ypcGetOfflineUpsellEndpoint",DE_YpcGetOfflineUpsell>;
export type E_Url={
	clickTrackingParams: string;
	loggingUrls?: T_BaseUrl<`https://www.youtube.com/pagead/paralleladinteraction?ai=${string}&sigh=${string}&cid=${string}&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&nb=%5BNB%5D&label=video_click_to_advertiser_site`>[];
	commandMetadata: M_Url;
	urlEndpoint: DE_Url;
};
export type E_WebPlayerShareEntityService=TE_Endpoint_3<"webPlayerShareEntityServiceEndpoint",DE_WebPlayerShareEntityService,M_GetWebPlayerSharePanel>;
export type E_AddUpcomingEventReminder=TE_Endpoint_3<"addUpcomingEventReminderEndpoint",DC_Params,M_AddUpcomingEventReminder>;
export type E_RemoveUpcomingEventReminder=TE_Endpoint_3<"removeUpcomingEventReminderEndpoint",DC_Params,M_RemoveUpcomingEventReminder>;
export type M_RemoveUpcomingEventReminder=TM_Gen<GM_RemoveUpcomingEventReminder>;
export type GM_RemoveUpcomingEventReminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/remove_upcoming_event_reminder";
};
export type M_PlaylistDelete=TM_Gen<GM_PlaylistDelete>;
export type GM_PlaylistDelete={sendPost: true; apiUrl: "/youtubei/v1/playlist/delete";};
export type E_PlaylistDelete=TE_Endpoint_3<"deletePlaylistEndpoint",DE_PlaylistDelete,M_PlaylistDelete>;
export type GM_PerformCommentAction={
	sendPost: true;
	apiUrl: "/youtubei/v1/comment/perform_comment_action";
};
export type M_PerformCommentAction=TM_Gen<GM_PerformCommentAction>;
export type AD_UpdateCommentVote={
	voteCount?: G_Text;
	voteStatus: "LIKE";
};
export type A_UpdateCommentVote={
	clickTrackingParams: string;
	updateCommentVoteAction: AD_UpdateCommentVote;
};
export type E_PerformCommentAction=TE_Endpoint_3<"performCommentActionEndpoint",DE_PerformCommentAction,M_PerformCommentAction>;
export type E_Pinging={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://pagead2.googlesyndication.com/pcs/activeview?xai=${string}&sai=${string}&sig=${string}&cid=${string}&acvw=[VIEWABILITY]`|`https://googleads.g.doubleclick.net/pagead/interaction/?ai=${string}&sigh=${string}&label=noop_tap`>[];
	pingingEndpoint: B_Hack;
};
export type E_AdFeedback={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://googleads.g.doubleclick.net/pagead/interaction/?${string}`>[];
	adFeedbackEndpoint: DE_AdFeedback;
};
export type E_MuteAd=TE_Endpoint_2<"muteAdEndpoint",DE_MuteAd>;
//#endregion
export type EG_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
