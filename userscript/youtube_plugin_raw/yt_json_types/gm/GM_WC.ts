//#region CommonType
type D_Empty_WCM={webCommandMetadata: {};};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
//#endregion
//#region TemplateStrings
type T_MixPlaylistStr=`RD${string}`;
//#endregion
//#region Templates
type T_DE_SettingItem<T_ItemId,T_V extends boolean,T_ClientItemId extends string>={settingItemId: T_ItemId; boolValue: T_V; settingItemIdForClient: T_ClientItemId;};
type T_GM_PostApi_WithApiUrl<T extends string>={/**/sendPost: true; apiUrl: T;};
type T_SE_Signal<T,U>=TE_Endpoint_Ex<T,"signalServiceEndpoint",U>;
type T_Setting_AutoNavForDesktop<T extends boolean>=TE_SetSetting<"407",T,"AUTONAV_FOR_DESKTOP">;
type TA_CreateObjectFromContinuationMap<T>={[E in keyof T]: TA_Continuation<E,T[E]>}[keyof T];
type TA_OpenPopup<T>={clickTrackingParams: string; openPopupAction: T;};
type TB_ContinuationItemMap_1={"watch-next-feed": G_WatchNext; "comments-section": G_CommentsSection; "browse-feedFEwhat_to_watch": R_BrowseFeed;};
type TB_ContinuationItemMap_2={[V in `comment-replies-item-${string}`]: R_Comment;};
type TB_ContinuationItemMap=TB_ContinuationItemMap_1&TB_ContinuationItemMap_2;
type TE_Endpoint_Ex_1<C,T extends string,U>={clickTrackingParams: string; commandMetadata?: C;}&{[I in T]: U};
type TE_Endpoint_Ex_2<U extends string,V>={clickTrackingParams: string;}&{[I in U]: V};
type TE_Endpoint_Ex<T,U extends `${string}Endpoint`,V>={clickTrackingParams: string; commandMetadata: T;}&{[I in U]: V};
type TE_Endpoint_ReqMeta<T={}>={clickTrackingParams: string; commandMetadata: T;};
type TE_Endpoint<G_M>={clickTrackingParams: string; commandMetadata?: G_M;};
type TE_SetSetting<T_ItemId,T extends boolean,T_ClientItemId extends string>=TE_Endpoint_Ex<M_SetSetting,"setSettingEndpoint",T_DE_SettingItem<T_ItemId,T,T_ClientItemId>>;
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
	GM_SetSetting,
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
	GM_CreatePlaylist,
	GM_playlist_get_add_to_playlist,
	GM_SendPost,
	GM_GetSharePanel,
	GM_Subscribe,
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
	rootVe: 3611; apiUrl: "/youtubei/v1/browse";
};
type GM_VE3832_Watch_WC={
	url: `/watch?${string}`;
	webPageType: "WEB_PAGE_TYPE_WATCH";
	rootVe: 3832;
};
type GM_VE3854_WC={
	url: "/";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 3854; apiUrl: "/youtubei/v1/browse";
};
type GM_VE4724_WC={
	url: `/results?search_query=${string}`;
	webPageType: "WEB_PAGE_TYPE_SEARCH";
	rootVe: 4724;
};
type GM_VE5754_WC={
	url: `/playlist?list=${"WL"|"LL"|`PL${string}`}`;
	webPageType: "WEB_PAGE_TYPE_PLAYLIST";
	rootVe: 5754; apiUrl: "/youtubei/v1/browse";
};
type GM_VE6827_WC={
	url?: D_VE6827_PageUrl;
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 6827; apiUrl: "/youtubei/v1/browse";
};
type GM_VE11487_WC={
	url: "/premium";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 11487; apiUrl: "/youtubei/v1/browse";
};
type GM_VE23462_WC={
	url: "/account"|"/account_notifications";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 23462; apiUrl: "/youtubei/v1/browse";
};
type GM_VE37414_WC={
	url: "/shorts/";
	webPageType: "WEB_PAGE_TYPE_SHORTS";
	rootVe: 37414;
};
type GM_VE42352_WC={
	url: "/feed/downloads";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 42352; apiUrl: "/youtubei/v1/browse";
};
type GM_VE83769_WC={
	url: GU_VE83769_UrlType;
	webPageType: "WEB_PAGE_TYPE_UNKNOWN";
	rootVe: 83769;
};
type GM_VE96368_WC_browse={
	url: "/feed/subscriptions";
	webPageType: "WEB_PAGE_TYPE_BROWSE";
	rootVe: 96368; apiUrl: "/youtubei/v1/browse";
};
//#endregion
//#region GM_ApiUrl
type GM_SetSetting=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/set_setting">;
type GM_AccountMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/account_menu">;
type GM_backstage_create_post=T_GM_PostApi_WithApiUrl<"/youtubei/v1/backstage/create_post">;
type GM_browse_edit_playlist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse/edit_playlist">;
type GM_Browse=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse">;
type GM_comment_create_comment=T_GM_PostApi_WithApiUrl<"/youtubei/v1/comment/create_comment">;
type GM_feedback=T_GM_PostApi_WithApiUrl<"/youtubei/v1/feedback">;
type GM_FlagGetForm=T_GM_PostApi_WithApiUrl<"/youtubei/v1/flag/get_form">;
type GM_get_survey=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_survey">;
type GM_get_transcript=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_transcript">;
type GM_GetNotificationMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_notification_menu">;
type GM_like_dislike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/dislike">;
type GM_like_like=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/like">;
type GM_like_removelike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/removelike">;
type GM_Next=T_GM_PostApi_WithApiUrl<"/youtubei/v1/next">;
type GM_notification_get_unseen_count=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_unseen_count">;
type GM_notification_opt_out=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/opt_out">;
type GM_RecordInteractions=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/record_interactions">;
type GM_CreatePlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/create">;
type GM_playlist_get_add_to_playlist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_add_to_playlist">;
type GM_GetSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_share_panel">;
type GM_Subscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/subscribe">;
type GM_ypc_get_offers=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_offers">;
type GM_YpcGetCart=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_cart">;
type GM_SendPost={sendPost: true;};
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
type M_SetSetting={webCommandMetadata: GM_SetSetting;};
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
type DE_Subscribe={channelIds: string[]; params: string;};
type DE_WatchPlaylist={playlistId: `RD${string}`; index: 13; params: string;};
//#endregion
//#region E_VE
type E_VE3611_Browse=TE_Endpoint_Ex<M_VE3611,"browseEndpoint",DE_VE3611_Browse>;
type E_VE3854_Browse=TE_Endpoint_Ex<M_VE3854,"browseEndpoint",DE_VE3854_Browse>;
type E_VE5754_Browse=TE_Endpoint_Ex<M_VE5754,"browseEndpoint",DE_VE5754_Browse>;
type E_VE6827_Browse=TE_Endpoint_Ex<M_VE6827,"browseEndpoint",DE_VE6827_Browse>;
type E_VE11487_Browse=TE_Endpoint_Ex<M_VE11487,"browseEndpoint",DE_VE11487_Browse>;
type E_VE23462_Browse=TE_Endpoint_Ex<M_VE23462,"browseEndpoint",DE_VE23462_Browse>;
type E_VE42352_Browse=TE_Endpoint_Ex<M_VE42352,"browseEndpoint",DE_VE42352_Browse>;
type E_VE96368_Browse=TE_Endpoint_Ex<M_VE96368,"browseEndpoint",DE_VE96368_Browse>;
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
type AD_AddToGuideSection=T_Items<R_GuideEntry>&{handlerData: Enum_GuideAction;};
type A_AppendContinuationItems={clickTrackingParams: string; appendContinuationItemsAction: AD_AppendContinuationItems;};
type AD_AppendContinuationItems=TA_CreateObjectFromContinuationMap<TB_ContinuationItemMap>;
type A_ChangeEngagementPanelVisibility={clickTrackingParams: string; changeEngagementPanelVisibilityAction: AD_ChangeEngagementPanelVisibility;};
type AD_ChangeEngagementPanelVisibility={targetId: D_EngagementPanelTargetId; visibility: D_EngagementPanelVisibility;};
type A_HideEnclosing={clickTrackingParams: string; hideEnclosingAction: AD_HideEnclosing;};
type AD_HideEnclosing={notificationId: `${number}`;};
type A_HideEngagementPanelScrim={clickTrackingParams: string; hideEngagementPanelScrimAction: AD_HideEngagementPanelTargetId;};
type AD_HideEngagementPanelTargetId={engagementPanelTargetId: "engagement-panel-clip-create";};
type A_RemoveFromGuideSection={clickTrackingParams: string; removeFromGuideSectionAction: AD_RemoveFromGuideSection;};
type AD_RemoveFromGuideSection={handlerData: "GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"; guideEntryId: T_MixPlaylistStr;};
type A_ReplaceEnclosing={clickTrackingParams: string; replaceEnclosingAction: AD_ReplaceEnclosing;};
type AD_ReplaceEnclosing=T_Item<R_NotificationText|RA_ReelDismissal>;
type A_SendFeedback={clickTrackingParams: string; sendFeedbackAction: AD_SendFeedback;};
type AD_SendFeedback={bucket: "Kevlar";};
type A_SetActivePanelItem={clickTrackingParams: string; setActivePanelItemAction: AD_SetActivePanelItem;};
type AD_SetActivePanelItem={};
type A_ShowEngagementPanelScrim={clickTrackingParams: string; showEngagementPanelScrimAction: AD_ShowEngagementPanelScrim;};
type AD_ShowEngagementPanelScrim={
	engagementPanelTargetId: "engagement-panel-clip-create";
	onClickCommands: TA_OpenPopup<{}>[];
};
type A_Signal={clickTrackingParams: string; signalAction: AD_Signal;};
type AD_Signal={signal: E_SignalEnum;};
type A_UndoFeedback={clickTrackingParams: string; undoFeedbackAction: AD_UndoFeedback;};
type AD_UndoFeedback={};
type A_UpdateEngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type AD_UpdateEngagementPanel={
	content: R_Transcript;
	targetId: "engagement-panel-searchable-transcript";
};
type A_UpdateNotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type AD_UpdateNotificationsUnseenCount={
	handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT";
	unseenCount: number;
	timeoutMs: number;
};
//#endregion
//#region Commands
type C_AddToPlaylist={clickTrackingParams: string; addToPlaylistCommand: DC_AddToPlaylist;};
type C_AdsControlFlowOpportunityReceived={clickTrackingParams: string; adsControlFlowOpportunityReceivedCommand: DC_AdsControlFlowOpportunityReceived;};
type DC_AdsControlFlowOpportunityReceived={
	opportunityType: OpportunityTypeOrganicEnum;
	adSlotAndLayoutMetadata?: DMD_AdSlotAndLayoutItem[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};
type C_ChangeKeyedMarkersVisibility={clickTrackingParams: string; changeKeyedMarkersVisibilityCommand: DC_ChangeKeyedMarkersVisibility;};
type DC_ChangeKeyedMarkersVisibility={
	isVisible: true;
	key: "HEATSEEKER";
};
type C_Continuation={clickTrackingParams: string; commandMetadata?: M_Next|M_Next; continuationCommand: DC_Continuation;};
type DC_Continuation={
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE";
}|{
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_BROWSE";
	command: C_ShowReloadUi;
}|{
	token: string;
	request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT";
};
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
type E_AddToPlaylistService=TE_Endpoint_Ex<{webCommandMetadata: GM_playlist_get_add_to_playlist;},"addToPlaylistServiceEndpoint",DE_AddToPlaylistService>;
type DE_AddToPlaylistService={videoId: string;};
type E_CreateBackstagePost=TE_Endpoint_Ex<{webCommandMetadata: GM_backstage_create_post;},"createBackstagePostEndpoint",DE_CreateBackstagePost>;
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type E_CreateComment=TE_Endpoint_Ex<{webCommandMetadata: GM_comment_create_comment;},"createCommentEndpoint",DE_CreateComment>;
type DE_CreateComment={createCommentParams: string;};
type E_Feedback=TE_Endpoint_Ex<M_Feedback,"feedbackEndpoint",DE_Feedback>;
type DE_Feedback={feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];};
type E_GetNotificationMenu=TE_Endpoint_Ex<{webCommandMetadata: GM_GetNotificationMenu;},"getNotificationMenuEndpoint",DE_GetNotificationMenu>;
type DE_GetNotificationMenu={ctoken: string;};
type E_GetReportForm=TE_Endpoint_Ex<M_FlagGetForm,"getReportFormEndpoint",DE_GetReportForm>;
type DE_GetReportForm={params: string;};
type E_GetTranscript=TE_Endpoint_Ex<D_Empty_WCM,"getTranscriptEndpoint",DE_GetTranscript>;
type DE_GetTranscript={params: string;};
type E_Like=TE_Endpoint_Ex<{webCommandMetadata: GM_like_like|GM_like_dislike|GM_like_removelike;},"likeEndpoint",DE_Like>;
type DE_Like=E_LikeIndifferent|E_LikeLike|E_LikeDislike;
type E_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
type E_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
type E_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
type E_NotificationOptOut=TE_Endpoint_Ex<D_Empty_WCM,"notificationOptOutEndpoint",DE_NotificationOptOut>;
type DE_NotificationOptOut={optOutText: R_TextRuns; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type E_PlaylistEdit=TE_Endpoint_Ex<{webCommandMetadata: GM_browse_edit_playlist;},"playlistEditEndpoint",DE_PlaylistEdit>;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type E_PlaylistEditor=TE_Endpoint_Ex<D_Empty_WCM,"playlistEditorEndpoint",DE_PlaylistEditor>;
type DE_PlaylistEditor={playlistId: string;};
type E_RecordNotificationInteractions=TE_Endpoint_Ex<M_RecordInteractions,"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions>;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type E_ReelWatch=TE_Endpoint_Ex<{webCommandMetadata: GM_VE37414_WC;},"reelWatchEndpoint",DE_ReelWatch>;
type DE_ReelWatch={videoId?: string;playerParams: string;thumbnail?: R_Thumbnail;overlay: R_ReelPlayerOverlay;params: string;sequenceProvider?: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";sequenceParams?: string;inputType?: "REEL_WATCH_INPUT_TYPE_SEEDLESS";};
type E_Search=TE_Endpoint_Ex<M_VE4724,"searchEndpoint",DE_Search>;
type DE_Search={query: string;};
type M_Feedback={webCommandMetadata: GM_feedback;};
type E_SetSetting=TE_SetSetting<"407",boolean,"AUTONAV_FOR_DESKTOP">;
type S_Client_Item=[
	E_ShowEngagementPanel,
	A_SendFeedback,
	A_Signal,
	C_AddToPlaylist,
	TA_OpenPopup<TA_OpenPopup_Toast<RA_NotificationAction>|TA_OpenPopup_TopAlignedDialog<R_VoiceSearchDialog>>,
][number];
type TA_OpenPopup_TopAlignedDialog<T>=BTA_OpenPopup_TopAligned<"DIALOG",T>;
type TA_OpenPopup_Toast<T>={popup: T;popupType: "TOAST";};
type E_ShowEngagementPanel={clickTrackingParams: string; showEngagementPanelEndpoint: DE_ShowEngagementPanel;};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type E_SignalNavigation=TE_Endpoint_Ex<M_VE83769,"signalNavigationEndpoint",DE_SignalNavigation>;
type M_Subscribe={webCommandMetadata: GM_Subscribe;};

type E_Subscribe=TE_Endpoint_Ex<M_Subscribe,"subscribeEndpoint",DE_Subscribe>;
type E_UndoFeedback=TE_Endpoint_Ex<D_Empty_WCM,"undoFeedbackEndpoint",DE_UndoFeedback>;
type E_Upload=TE_Endpoint_Ex<D_Empty_WCM,"uploadEndpoint",B_Hack>;
type E_Url=TE_Endpoint_Ex<M_VE83769,"urlEndpoint",DE_Url>;
type E_Watch=TE_Endpoint_Ex_1<M_VE3832,"watchEndpoint",DE_VE3832_Watch>;
type E_WatchPlaylist=TE_Endpoint_Ex<D_Empty_WCM,"watchPlaylistEndpoint",DE_WatchPlaylist>;
type E_YpcGetCart=TE_Endpoint_Ex<M_YpcGetCart,"ypcGetCartEndpoint",DE_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_Ex<D_Empty_WCM,"ypcGetOffersEndpoint",DE_YpcGetOffers>;
type E_YpcGetOfflineUpsell={clickTrackingParams: string; ypcGetOfflineUpsellEndpoint: DE_YpcGetOfflineUpsell;};
type M_CreatePlaylist={webCommandMetadata: GM_CreatePlaylist;};
//#endregion
type SE_CreatePlaylist=TE_Endpoint_Ex<M_CreatePlaylist,"createPlaylistServiceEndpoint",DS_CreatePlaylist>;
type M_GetSharePanel={webCommandMetadata: GM_GetSharePanel;};
type SE_ShareEntity=TE_Endpoint_Ex<M_GetSharePanel,"shareEntityServiceEndpoint",D_ShareEntityService>;
type SE_Signal_SubscribeButton=TE_Endpoint_Ex<M_SendPost,"signalServiceEndpoint",G_ClientSignal>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;

type EX_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;
type ES_Button=T_SE_Signal<M_SendPost,G_ClientSignal>|E_YpcGetOffers;

type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
type RC_SectionList={sectionListContinuation: G_SectionList;};
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type RC_MusicShelf={musicShelfContinuation: {};};
//#region ActionData
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

type RA_ReelDismissal={reelDismissalActionRenderer: AD_ReelDismissal;};
type AD_ReelDismissal={
	onDismissalCompletionRenderer: RA_NotificationAction;
	trackingParams: string;
};
type RA_NotificationAction={notificationActionRenderer: AD_Notification;};
type AD_Notification={
	responseText: G_Text;
	actionButton?: R_Button;
	trackingParams: string;
};
type BB_RA_ReplayChatItem={replayChatItemAction: DA_ReplayChatItem;};
