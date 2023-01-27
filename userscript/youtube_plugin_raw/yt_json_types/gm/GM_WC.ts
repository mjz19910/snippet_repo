//#region Templates
type D_Empty_WCM={webCommandMetadata: {};};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
type T_Endpoint_Ex_1<C,T extends string,U>={clickTrackingParams: string; commandMetadata?: C;}&{[I in T]: U};
type T_Endpoint_Ex_2<U extends string,V>={clickTrackingParams: string;}&{[I in U]: V};
type T_Endpoint_Ex<T,U extends `${string}Endpoint`,V>={clickTrackingParams: string; commandMetadata: T;}&{[I in U]: V};
type T_Endpoint_ReqMeta<T={}>={clickTrackingParams: string; commandMetadata: T;};
type T_Endpoint<G_M>={clickTrackingParams: string; commandMetadata?: G_M;};
type T_SE_Signal<T,U>=T_Endpoint_Ex<T,"signalServiceEndpoint",U>;
type TA_OpenPopup<T>={clickTrackingParams: string; openPopupAction: T;};
//#endregion
//#region GU_VE
type GU_VE5754_UrlType=`VL${"LL"|"WL"|`PL${string}`}`;
type GU_VE6827_Url_NoParams="FElibrary"|"FEhistory"|"FEguide_builder"|"SPreport_history";
type GU_VE6827_Url_Params="FEtrending"|"FEstorefront";
type GU_VE6827_UrlType=GU_VE6827_Url_NoParams|GU_VE6827_Url_Params;
type GU_VE23462_UrlType="SPaccount_notifications"|"SPaccount_overview";
type GU_VE83769_UrlType=
	|"/upload"
	|"https://music.youtube.com/"
	|"https://studio.youtube.com/"
	|"https://www.youtubekids.com/?source=youtube_web"
	|`https://studio.youtube.com/channel/UC${string}`
	|"https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
	;
;
//#endregion
//#region GM_WC
type GM_WC=[
	GM_VE3611_WC,
	GM_VE3832_Watch_WC,
	GM_VE3854_WC,
	GM_VE4724_WC,
	GM_VE5754_WC,
	GM_VE6827_WC,
	GM_VE11487_WC,
	GM_VE23462_WC,
	GM_VE37414_WC,
	GM_VE42352_WC,
	GM_VE83769_WC,
	GM_VE96368_WC_browse,
	GM_account_set_setting,
	GM_AccountMenu,
	GM_backstage_create_post,
	GM_browse_edit_playlist,
	GM_Browse,
	GM_comment_create_comment,
	GM_feedback,
	GM_FlagGetForm,
	GM_get_survey,
	GM_get_transcript,
	GM_GetNotificationMenu,
	GM_like_dislike,
	GM_like_like,
	GM_like_removelike,
	GM_Next,
	GM_notification_get_unseen_count,
	GM_notification_opt_out,
	GM_RecordInteractions,
	GM_playlist_create,
	GM_playlist_get_add_to_playlist,
	GM_SendPost,
	GM_share_get_share_panel,
	GM_subscription_subscribe,
	GM_ypc_get_offers,
	GM_YpcGetCart,
][number];
//#endregion
//#region GM_VE
type GM_VE3611_WC={
	url:
	|`/channel/UC${string}`
	|`/@${string}`
	|"/gaming"
	;
	webPageType: "WEB_PAGE_TYPE_CHANNEL";
	rootVe: 3611;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832_Watch_WC={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE3854_WC={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724_WC={
	url: `/results?search_query=${string}`;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type GM_VE5754_WC={
	url: `/playlist?list=${"WL"|"LL"|`PL${string}`}`;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827_WC={
	url?: D_VE6827_PageUrl;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE11487_WC={
	url: "/premium";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE23462_WC={
	url: "/account"|"/account_notifications";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414_WC={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE42352_WC={
	url: "/feed/downloads";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352;
	apiUrl: "/youtubei/v1/browse";
};
type GM_VE83769_WC={
	url: GU_VE83769_UrlType;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368_WC_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368;
	apiUrl: "/youtubei/v1/browse";
};
//#endregion
//#region GM_ApiUrl
type GM_account_set_setting={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/set_setting";
};
type GM_AccountMenu={
	sendPost: true;
	apiUrl: "/youtubei/v1/account/account_menu";
};
type GM_backstage_create_post={
	sendPost: true;
	apiUrl: "/youtubei/v1/backstage/create_post";
};
type GM_browse_edit_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};
type GM_Browse={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse";
};
type GM_comment_create_comment={
	apiUrl: "/youtubei/v1/comment/create_comment";
	sendPost: true;
};
type GM_feedback={
	sendPost: true;
	apiUrl: "/youtubei/v1/feedback";
};
type GM_FlagGetForm={
	sendPost: true;
	apiUrl: "/youtubei/v1/flag/get_form";
};
type GM_get_survey={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_survey";
};
type GM_get_transcript={
	sendPost: true;
	apiUrl: "/youtubei/v1/get_transcript";
};
type GM_GetNotificationMenu={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_notification_menu";
};
type GM_like_dislike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/dislike";
};
type GM_like_like={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/like";
};
type GM_like_removelike={
	sendPost: true;
	apiUrl: "/youtubei/v1/like/removelike";
};
type GM_Next={
	sendPost: true;
	apiUrl: "/youtubei/v1/next";
};
type GM_notification_get_unseen_count={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/get_unseen_count";
};
type GM_notification_opt_out={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/opt_out";
};
type GM_RecordInteractions={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/record_interactions";
};
type GM_playlist_create={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/create";
};
type GM_playlist_get_add_to_playlist={
	sendPost: true;
	apiUrl: "/youtubei/v1/playlist/get_add_to_playlist";
};
type GM_share_get_share_panel={
	sendPost: true;
	apiUrl: "/youtubei/v1/share/get_share_panel";
};
type GM_subscription_subscribe={
	sendPost: true;
	apiUrl: "/youtubei/v1/subscription/subscribe";
};
type GM_ypc_get_offers={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_offers";
};
type GM_YpcGetCart={
	sendPost: true;
	apiUrl: "/youtubei/v1/ypc/get_cart";
};
type GM_SendPost={
	sendPost: true;
};
//#endregion
//#region M_*
type M_VE3611={webCommandMetadata: GM_VE3611_WC;};
type M_VE3832={webCommandMetadata: GM_VE3832_Watch_WC;};
type M_VE3854={webCommandMetadata: GM_VE3854_WC;};
type M_VE4724={webCommandMetadata: GM_VE4724_WC;};
type M_VE5754={webCommandMetadata: GM_VE5754_WC;};
type M_VE6827={webCommandMetadata: GM_VE6827_WC;};
type M_VE11487={webCommandMetadata: GM_VE11487_WC;};
type M_VE23462={webCommandMetadata: GM_VE23462_WC;};
type M_VE37414={webCommandMetadata: GM_VE37414_WC;};
type M_VE42352={webCommandMetadata: GM_VE42352_WC;};
type M_VE83769={webCommandMetadata: GM_VE83769_WC;};
type M_VE96368={webCommandMetadata: GM_VE96368_WC_browse;};
type M_AccountMenu={webCommandMetadata: GM_AccountMenu;};
type M_Browse={webCommandMetadata: GM_Browse;};
type M_FlagGetForm={webCommandMetadata: GM_FlagGetForm;};
type M_GetNotificationMenu={webCommandMetadata: GM_GetNotificationMenu;};
type M_Next={webCommandMetadata: GM_Next;};
type M_RecordInteractions={webCommandMetadata: GM_RecordInteractions;};
type M_SendPost={webCommandMetadata: GM_SendPost;};
type M_YpcGetCart={webCommandMetadata: GM_YpcGetCart;};
//#endregion
//#region DE_VE
type DE_VE3611_Browse={browseId: `UC${string}`; canonicalBaseUrl: `/@${string}`;};
type DE_VE3854_Browse={browseId: "FEwhat_to_watch";};
type DE_VE5754_Browse={browseId: GU_VE5754_UrlType;};
type DE_VE6827_NoParams={browseId: GU_VE6827_Url_NoParams;};
type DE_VE6827_Params={browseId: GU_VE6827_Url_Params; params: string;};
type DE_VE6827_Browse=DE_VE6827_NoParams|DE_VE6827_Params;
type DE_VE11487_Browse={browseId: "SPunlimited";};
type DE_VE23462_Browse={browseId: GU_VE23462_UrlType;};
type DE_VE42352_Browse={browseId: "FEdownloads";};
type DE_VE96368_Browse={browseId: "FEsubscriptions";};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_GetNotificationMenu={ctoken: string;};
type DE_Subscribe={channelIds: string[]; params: string;};
type DE_WatchPlaylist={playlistId: `RD${string}`; index: 13; params: string;};
//#endregion
//#region E_VE
type E_VE3611_Browse=T_Endpoint_Ex<M_VE3611,"browseEndpoint",DE_VE3611_Browse>;
type E_VE3854_Browse=T_Endpoint_Ex<M_VE3854,"browseEndpoint",DE_VE3854_Browse>;
type E_VE5754_Browse=T_Endpoint_Ex<M_VE5754,"browseEndpoint",DE_VE5754_Browse>;
type E_VE6827_Browse=T_Endpoint_Ex<M_VE6827,"browseEndpoint",DE_VE6827_Browse>;
type E_VE11487_Browse=T_Endpoint_Ex<M_VE11487,"browseEndpoint",DE_VE11487_Browse>;
type E_VE23462_Browse=T_Endpoint_Ex<M_VE23462,"browseEndpoint",DE_VE23462_Browse>;
type E_VE42352_Browse=T_Endpoint_Ex<M_VE42352,"browseEndpoint",DE_VE42352_Browse>;
type E_VE96368_Browse=T_Endpoint_Ex<M_VE96368,"browseEndpoint",DE_VE96368_Browse>;
//#endregion
type E_Browse=[
	E_VE3611_Browse,
	E_VE3854_Browse,
	E_VE5754_Browse,
	E_VE6827_Browse,
	E_VE11487_Browse,
	E_VE23462_Browse,
	E_VE42352_Browse,
	E_VE96368_Browse,
][number];
//#region Actions 
type A_AddToGuideSection={clickTrackingParams: string; addToGuideSectionAction: AD_AddToGuideSection;};
type A_AppendContinuationItems={clickTrackingParams: string; appendContinuationItemsAction: AD_AppendContinuationItems;};
type A_ChangeEngagementPanelVisibility={clickTrackingParams: string; changeEngagementPanelVisibilityAction: AD_ChangeEngagementPanelVisibility;};
type A_HideEnclosing={clickTrackingParams: string; hideEnclosingAction: AD_HideEnclosing;};
type A_HideEngagementPanelScrim={clickTrackingParams: string; hideEngagementPanelScrimAction: AD_HideEngagementPanelTargetId;};
type A_RemoveFromGuideSection={clickTrackingParams: string; removeFromGuideSectionAction: AD_RemoveFromGuideSection;};
type A_ReplaceEnclosing={clickTrackingParams: string; replaceEnclosingAction: AD_ReplaceEnclosing;};
type A_SendFeedback={clickTrackingParams: string; sendFeedbackAction: AD_SendFeedback;};
type A_SetActivePanelItem={clickTrackingParams: string; setActivePanelItemAction: AD_SetActivePanelItem;};
type A_ShowEngagementPanelScrim={clickTrackingParams: string; showEngagementPanelScrimAction: AD_ShowEngagementPanelScrim;};
type A_Signal={clickTrackingParams: string; signalAction: AD_Signal;};
type A_UndoFeedback={clickTrackingParams: string; undoFeedbackAction: AD_UndoFeedback;};
type A_UpdateEngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: D_UpdateEngagementPanel;};
type A_UpdateNotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
//#endregion
//#region Commands
type C_AddToPlaylist={addToPlaylistCommand: DC_AddToPlaylist; clickTrackingParams: string;};
type C_AdsControlFlowOpportunityReceived={clickTrackingParams: string; adsControlFlowOpportunityReceivedCommand: DC_AdsControlFlowOpportunityReceived;};
type C_ChangeKeyedMarkersVisibility={clickTrackingParams: string; changeKeyedMarkersVisibilityCommand: DC_ChangeKeyedMarkersVisibility;};
type C_Continuation={clickTrackingParams: string; commandMetadata?: M_Next|M_Next; continuationCommand: DC_Continuation;};
type C_Executor={clickTrackingParams: string; commandExecutorCommand: DC_Executor;};
type C_FollowUp={clickTrackingParams: string; addFollowUpSurveyCommand: C_AddFollowUpSurvey;};
type C_GetSurvey={clickTrackingParams: string; commandMetadata: MG_Survey_CMD; getSurveyCommand: D_GetSurvey;};
type C_LoadMarkers={clickTrackingParams: string; loadMarkersCommand: DC_LoadMarkers;};
type C_RefreshPlaylist={clickTrackingParams: string; refreshPlaylistCommand: D_RefreshPlaylist;};
type C_RelatedChip={clickTrackingParams: string; relatedChipCommand: DC_RelatedChip;};
type C_ReloadContinuationItems={clickTrackingParams: string; reloadContinuationItemsCommand: DC_ReloadContinuationItems;};
type C_RepeatChapter={clickTrackingParams: string; repeatChapterCommand: CD_RepeatChapter;};
type C_ResetChannelUnreadCount={clickTrackingParams: string; resetChannelUnreadCountCommand: D_ResetChannelUnreadCount;};
type C_ShowReloadUi={clickTrackingParams: string; showReloadUiCommand: D_ShowReloadUi;};
//#endregion
//#region Endpoints
type E_AddToPlaylistService=T_Endpoint_Ex<{webCommandMetadata: GM_playlist_get_add_to_playlist;},"addToPlaylistServiceEndpoint",DE_AddToPlaylistService>;
type E_CreateBackstagePost=T_Endpoint_Ex<{webCommandMetadata: GM_backstage_create_post;},"createBackstagePostEndpoint",DE_CreateBackstagePost>;
type E_CreateComment=T_Endpoint_Ex<{webCommandMetadata: GM_comment_create_comment;},"createCommentEndpoint",DE_CreateComment>;
type E_Feedback=T_Endpoint_Ex<{webCommandMetadata: GM_feedback;},"feedbackEndpoint",DE_Feedback>;
type E_GetNotificationMenu=T_Endpoint_Ex<{webCommandMetadata: GM_GetNotificationMenu;},"getNotificationMenuEndpoint",DE_GetNotificationMenu>;
type E_GetReportForm=T_Endpoint_Ex<M_FlagGetForm,"getReportFormEndpoint",DE_GetReportForm>;
type E_GetTranscript=T_Endpoint_Ex<D_Empty_WCM,"getTranscriptEndpoint",DE_GetTranscript>;
type E_Like=T_Endpoint_Ex<{webCommandMetadata: GM_like_like|GM_like_dislike|GM_like_removelike;},"likeEndpoint",DE_Like>;
type E_NotificationOptOut=T_Endpoint_Ex<D_Empty_WCM,"notificationOptOutEndpoint",AE_NotificationOptOut>;
type E_PlaylistEdit=T_Endpoint_Ex<{webCommandMetadata: GM_browse_edit_playlist;},"playlistEditEndpoint",D_PlaylistEdit>;
type E_PlaylistEditor=T_Endpoint_Ex<D_Empty_WCM,"playlistEditorEndpoint",DE_PlaylistEditor>;
type E_RecordNotificationInteractions=T_Endpoint_Ex<M_RecordInteractions,"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions>;
type E_ReelWatch=T_Endpoint_Ex<{webCommandMetadata: GM_VE37414_WC;},"reelWatchEndpoint",D_ReelWatch>;
type E_Search=T_Endpoint_Ex<M_VE4724,"searchEndpoint",D_Search>;
type E_SetSettingAutonavForDesktop<T extends boolean>=T_Endpoint_Ex<{webCommandMetadata: GM_account_set_setting;},"setSettingEndpoint",SettingItemAutonavForDesktop<T>>;
type E_ShowEngagementPanel={clickTrackingParams: string; showEngagementPanelEndpoint: D_ShowEngagementPanel;};
type E_SignalNavigation=T_Endpoint_Ex<M_VE83769,"signalNavigationEndpoint",DS_Navigation>;
type E_Subscribe=T_Endpoint_Ex<{webCommandMetadata: GM_subscription_subscribe;},"subscribeEndpoint",DE_Subscribe>;
type E_UndoFeedback=T_Endpoint_Ex<D_Empty_WCM,"undoFeedbackEndpoint",D_UndoFeedback>;
type E_Upload=T_Endpoint_Ex<D_Empty_WCM,"uploadEndpoint",B_Hack>;
type E_Url=T_Endpoint_Ex<M_VE83769,"urlEndpoint",DE_Url>;
type E_Watch=T_Endpoint_Ex_1<M_VE3832,"watchEndpoint",DE_VE3832_Watch>;
type E_WatchPlaylist=T_Endpoint_Ex<D_Empty_WCM,"watchPlaylistEndpoint",DE_WatchPlaylist>;
type E_YpcGetCart=T_Endpoint_Ex<M_YpcGetCart,"ypcGetCartEndpoint",D_YpcGetCart>;
type E_YpcGetOffers=T_Endpoint_Ex<D_Empty_WCM,"ypcGetOffersEndpoint",D_YpcGetOffers>;
type E_YpcGetOfflineUpsell={clickTrackingParams: string; ypcGetOfflineUpsellEndpoint: D_YpcGetOfflineUpsell;};
//#endregion
type SE_CreatePlaylist=T_Endpoint_Ex<{webCommandMetadata: {sendPost: true; apiUrl: "/youtubei/v1/playlist/create";};},"createPlaylistServiceEndpoint",DS_CreatePlaylist>;
type ES_ShareEntity=T_Endpoint_Ex<{webCommandMetadata: GM_share_get_share_panel;},"shareEntityServiceEndpoint",D_ShareEntityService>;
type SE_Signal_SubscribeButton=T_Endpoint_Ex<M_SendPost,"signalServiceEndpoint",G_ClientSignal>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;

type EX_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
type ES_Button=T_SE_Signal<M_SendPost,G_ClientSignal>|E_YpcGetOffers;

type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
type RC_SectionList={sectionListContinuation: G_SectionList;};
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type RC_MusicShelf={musicShelfContinuation: {};};
//#region ActionData
type AD_AppendContinuationItems=
	|TA_Continuation<"watch-next-feed",G_WatchNext>
	|TA_Continuation<"comments-section",G_CommentsSection>
	|TA_Continuation<`comment-replies-item-${string}`,R_Comment>
	|TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>
	;
;
type AD_ShowEngagementPanelScrim={
	engagementPanelTargetId: "engagement-panel-clip-create";
	onClickCommands: TA_OpenPopup<{}>[];
};
type AD_UpdateNotificationsUnseenCount={
	handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT";
	unseenCount: number;
	timeoutMs: number;
};
type AD_UndoFeedback={};
type AD_ReplaceEnclosing=T_Item<R_NotificationText|RA_ReelDismissal>;
type AD_SetActivePanelItem={};
type AD_AddToGuideSection=T_Items<R_GuideEntry>&{handlerData: DE_AddToGuideSectionHandler;};
type AD_ChangeEngagementPanelVisibility={
	targetId:
	|"engagement-panel-comments-section"
	|"engagement-panel-clip-view"
	|"engagement-panel-clip-create"
	|"engagement-panel-structured-description"
	|"engagement-panel-macro-markers-auto-chapters"
	|"engagement-panel-macro-markers-description-chapters"
	;
	visibility: 
	|"ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"
	|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};

//#endregion

type CD_Invalidation={invalidationContinuationData: DC_Invalidation;};
type CD_LiveChatReplay={liveChatReplayContinuationData: DC_LiveChatReplay;};
type CD_Next={nextContinuationData: DC_Generic_CTP;};
type CD_NextRadio={nextRadioContinuationData: DC_Generic_CTP;};
type CD_PlayerSeek={playerSeekContinuationData: DC_Generic;};
type CD_Reload={reloadContinuationData: DC_Generic_CTP;};
type CD_TimedContinuation={timedContinuationData: DC_Timed;};
type DC_Generic={continuation: string;};
type DC_Invalidation={
	invalidationId: D_InvalidationId;
	timeoutMs: 10000;
	continuation: string;
	clickTrackingParams?: string;
};
type DC_LiveChatReplay={
	timeUntilLastMessageMsec: number;
	continuation: string;
};
type DC_Timed={
	timeoutMs: 60000;
	continuation: string;
};

