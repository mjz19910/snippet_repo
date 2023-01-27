//#region CommonType
type D_Empty_WCM={webCommandMetadata: {};};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
type D_Params={params: string;};
//#endregion
//#region TemplateStrings
type T_MixPlaylistStr=`RD${string}`;
//#endregion
//#region Templates
type T_DE_SettingItem<T_ItemId,T_V extends boolean,T_ClientItemId extends string>={settingItemId: T_ItemId; boolValue: T_V; settingItemIdForClient: T_ClientItemId;};
type T_GM_PostApi_WithApiUrl<T extends string>={/**/sendPost: true; apiUrl: T;};
type T_SE_Signal<T,U>=TE_Endpoint<T,"signalServiceEndpoint",U>;
type T_Setting_AutoNavForDesktop<T extends boolean>=TE_SetSetting<"407",T,"AUTONAV_FOR_DESKTOP">;
type TA_Continuation<T_TargetId,T_ItemType>={targetId: T_TargetId;continuationItems: T_ItemType[];};
type TA_CreateObjectFromContinuationMap<T>={[E in keyof T]: TA_Continuation<E,T[E]>}[keyof T];
type TA_OpenPopup<T>={clickTrackingParams: string; openPopupAction: T;};
type TB_ContinuationItemMap_1={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
type TB_ContinuationItemMap={"browse-feedFEwhat_to_watch": R_BrowseFeed; "comments-section": G_CommentsSection;[x: `comment-replies-item-${string}`]: R_Comment; "watch-next-feed": G_WatchNext;};
type TE_Endpoint_1<C,T extends string,U>={clickTrackingParams: string; commandMetadata?: C;}&{[I in T]: U};
type TE_Endpoint_2<U extends string,V>={clickTrackingParams: string;}&{[I in U]: V};
type TE_Endpoint_Default<T={}>={clickTrackingParams: string; commandMetadata: T;};
type TE_Endpoint_Opt<G_M>={clickTrackingParams: string; commandMetadata?: G_M;};
type TE_Endpoint<T,U extends `${string}Endpoint`,V>=Decay<{clickTrackingParams: string; commandMetadata: T;}&{[I in U]: V}>;
type TE_SetSetting<T_ItemId,T extends boolean,T_ClientItemId extends string>=TE_Endpoint<M_SetSetting,"setSettingEndpoint",T_DE_SettingItem<T_ItemId,T,T_ClientItemId>>;
type TM_GetByVE<T extends B_VEMap[keyof B_VEMap]['CommandMetadata']>=T;
//#endregion
//#region GU_VE
type GU_VE5754_UrlType=`VL${"LL"|"WL"|`PL${string}`}`;
type GU_VE6827_Url_NoParams="FElibrary"|"FEhistory"|"FEguide_builder"|"SPreport_history";
type GU_VE6827_Url_Params="FEtrending"|"FEstorefront";
type GU_VE6827_UrlType=GU_VE6827_Url_NoParams|GU_VE6827_Url_Params;
type GU_VE23462_UrlType="SPaccount_notifications"|"SPaccount_overview";
type GU_VE83769_UrlStr=
	|"/upload"
	;
;
type GU_VE83769_ExternalUrlStr=
	|`https://studio.youtube.com/channel/UC${string}`
	|`https://studio.youtube.com/channel/UC${string}/videos`
	|"https://studio.youtube.com/"
	|"https://studio.youtube.com"
	|"https://music.youtube.com/"
	|"https://music.youtube.com"
	|"https://www.youtubekids.com?source=youtube_web"
	|"https://www.youtubekids.com/?source=youtube_web"
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
	url: GU_VE83769_UrlStr|GU_VE83769_ExternalUrlStr;
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
type E_VE3611_Browse=TE_Endpoint<M_VE3611,"browseEndpoint",DE_VE3611_Browse>;
type E_VE3854_Browse=TE_Endpoint<M_VE3854,"browseEndpoint",DE_VE3854_Browse>;
type E_VE5754_Browse=TE_Endpoint<M_VE5754,"browseEndpoint",DE_VE5754_Browse>;
type E_VE6827_Browse=TE_Endpoint<M_VE6827,"browseEndpoint",DE_VE6827_Browse>;
type E_VE11487_Browse=TE_Endpoint<M_VE11487,"browseEndpoint",DE_VE11487_Browse>;
type E_VE23462_Browse=TE_Endpoint<M_VE23462,"browseEndpoint",DE_VE23462_Browse>;
type E_VE42352_Browse=TE_Endpoint<M_VE42352,"browseEndpoint",DE_VE42352_Browse>;
type E_VE96368_Browse=TE_Endpoint<M_VE96368,"browseEndpoint",DE_VE96368_Browse>;
//#endregion
// TODO: #8 Get the SettingsEndpoint type
type E_Settings={};
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
type AD_AddToGuideSection=T_Items<R_GuideEntry>&{handlerData: D_Enum_GuideAction;};
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
type T_Item<T>={item: T;};
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
type AD_Signal={signal: E_SignalStr;};
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
type DC_Executor=Record<"commands",AC_Executor[]>;
type C_FollowUp={clickTrackingParams: string; addFollowUpSurveyCommand: C_AddFollowUpSurvey;};
type C_AddFollowUpSurvey={
	followUpOptions: G_FollowUpOption[];
	followUpText: R_TextRuns;
};
type C_GetSurvey={clickTrackingParams: string; commandMetadata: MG_Survey_CMD; getSurveyCommand: D_GetSurvey;};
type D_GetSurvey={
	endpoint: R_PaidDigitalGoods;
	action: string;
};
type C_LoadMarkers={clickTrackingParams: string; loadMarkersCommand: DC_LoadMarkers;};
type DC_LoadMarkers={
	entityKeys: string[];
};
type C_RefreshPlaylist={clickTrackingParams: string; refreshPlaylistCommand: D_RefreshPlaylist;};
type D_RefreshPlaylist={};
type C_RelatedChip={clickTrackingParams: string; relatedChipCommand: DC_RelatedChip;};
type DC_RelatedChip={
	targetSectionIdentifier: "sid-wn-chips";
	loadCached: true;
};
type C_ReloadContinuationItems={clickTrackingParams: string; reloadContinuationItemsCommand: DC_ReloadContinuationItems;};
type DC_ReloadContinuationItems={
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: G_SectionItem[];
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: R_CommentsHeader[];
};
type C_RepeatChapter={clickTrackingParams: string; repeatChapterCommand: DC_RepeatChapter;};
type DC_RepeatChapter={
	repeat: "REPEAT_CHAPTER_TYPE_ENABLE_REPEAT";
	startTimeMs: "0";
	endTimeMs: "60000";
	repeatStateEntityKey: string;
};
type C_ResetChannelUnreadCount={clickTrackingParams: string; resetChannelUnreadCountCommand: DC_ResetChannelUnreadCount;};
type DC_ResetChannelUnreadCount={};
type C_ShowReloadUi={clickTrackingParams: string; showReloadUiCommand: DC_ShowReloadUi;};
type DC_ShowReloadUi={targetId: D_UiTargetId;};
//#endregion
//#region Endpoints
type E_AddToPlaylistService=TE_Endpoint<{webCommandMetadata: GM_playlist_get_add_to_playlist;},"addToPlaylistServiceEndpoint",DE_AddToPlaylistService>;
type DE_AddToPlaylistService={videoId: string;};
type E_CreateBackstagePost=TE_Endpoint<{webCommandMetadata: GM_backstage_create_post;},"createBackstagePostEndpoint",DE_CreateBackstagePost>;
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type E_CreateComment=TE_Endpoint<{webCommandMetadata: GM_comment_create_comment;},"createCommentEndpoint",DE_CreateComment>;
type DE_CreateComment={createCommentParams: string;};
type E_Feedback=TE_Endpoint<M_Feedback,"feedbackEndpoint",DE_Feedback>;
type DE_Feedback={feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];};
type E_GetNotificationMenu=TE_Endpoint<{webCommandMetadata: GM_GetNotificationMenu;},"getNotificationMenuEndpoint",DE_GetNotificationMenu>;
type DE_GetNotificationMenu={ctoken: string;};
type E_GetReportForm=TE_Endpoint<M_FlagGetForm,"getReportFormEndpoint",D_Params>;
type E_GetTranscript=TE_Endpoint<D_Empty_WCM,"getTranscriptEndpoint",D_Params>;
type E_Like=TE_Endpoint<{webCommandMetadata: GM_like_like|GM_like_dislike|GM_like_removelike;},"likeEndpoint",DE_Like>;
type DE_Like=DE_Like_NS.DE_Like;
type E_NotificationOptOut=TE_Endpoint<D_Empty_WCM,"notificationOptOutEndpoint",DE_NotificationOptOut>;
type DE_NotificationOptOut={optOutText: R_TextRuns; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type E_PlaylistEdit=TE_Endpoint<{webCommandMetadata: GM_browse_edit_playlist;},"playlistEditEndpoint",DE_PlaylistEdit>;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type E_PlaylistEditor=TE_Endpoint<D_Empty_WCM,"playlistEditorEndpoint",DE_PlaylistEditor>;
type DE_PlaylistEditor={playlistId: string;};
type E_RecordNotificationInteractions=TE_Endpoint<M_RecordInteractions,"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions>;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type E_ReelWatch=TE_Endpoint<{webCommandMetadata: GM_VE37414_WC;},"reelWatchEndpoint",DE_ReelWatch>;
type DE_ReelWatch={videoId: string;}|{thumbnail: R_Thumbnail;}|{playerParams: string; overlay: R_ReelPlayerOverlay; params: string;}|{sequenceProvider: "REEL_WATCH_SEQUENCE_PROVIDER_RPC"; sequenceParams: string;}|{inputType: "REEL_WATCH_INPUT_TYPE_SEEDLESS";};
type E_Search=TE_Endpoint<M_VE4724,"searchEndpoint",DE_Search>;
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
type TA_OpenPopup_Toast<T>={popup: T; popupType: "TOAST";};
type E_ShowEngagementPanel={clickTrackingParams: string; showEngagementPanelEndpoint: DE_ShowEngagementPanel;};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type E_SignalNavigation=TE_Endpoint<M_VE83769,"signalNavigationEndpoint",DE_SignalNavigation>;
type M_Subscribe={webCommandMetadata: GM_Subscribe;};

type E_Subscribe=TE_Endpoint<M_Subscribe,"subscribeEndpoint",DE_Subscribe>;
type E_UndoFeedback=TE_Endpoint<D_Empty_WCM,"undoFeedbackEndpoint",DE_UndoFeedback>;
type E_Upload=TE_Endpoint<D_Empty_WCM,"uploadEndpoint",B_Hack>;
type E_Url=TE_Endpoint<M_VE83769,"urlEndpoint",DE_Url>;
type E_Watch=TE_Endpoint_1<M_VE3832,"watchEndpoint",DE_VE3832_Watch>;
type E_WatchPlaylist=TE_Endpoint<D_Empty_WCM,"watchPlaylistEndpoint",DE_WatchPlaylist>;
type E_YpcGetCart=TE_Endpoint<M_YpcGetCart,"ypcGetCartEndpoint",DE_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint<D_Empty_WCM,"ypcGetOffersEndpoint",D_Params>;
type E_YpcGetOfflineUpsell={clickTrackingParams: string; ypcGetOfflineUpsellEndpoint: D_Params;};
type M_CreatePlaylist={webCommandMetadata: GM_CreatePlaylist;};
//#endregion
type SE_CreatePlaylist=TE_Endpoint<M_CreatePlaylist,"createPlaylistServiceEndpoint",DS_CreatePlaylist>;
type M_GetSharePanel={webCommandMetadata: GM_GetSharePanel;};
type SE_ShareEntity=TE_Endpoint<M_GetSharePanel,"shareEntityServiceEndpoint",D_ShareEntityService>;
type SE_Signal_SubscribeButton=TE_Endpoint<M_SendPost,"signalServiceEndpoint",G_ClientSignal>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;

type EX_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;

type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
// TODO #4
type DC_PlaylistPanel={};
type C_SectionList={sectionListContinuation: DC_SectionList;};
type T_DC_Content<T>={trackingParams: string; contents: T[];};
type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
type DC_SectionList=DC_SectionListBase|DC_SectionList_SearchFeed|DC_SectionList_BrowseFeed_ChannelFeatured|DC_SectionList_BrowseFeed_Subscriptions;
type DC_SectionList_T=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_SearchFeed=T_DC_Content_2<"search-feed",TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_BrowseFeed_Subscriptions=T_DC_Content_2<"browse-feedFEsubscriptions",TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_BrowseFeed_ChannelFeatured=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3<{},{},{}>>;
type DC_SectionListBase=T_DC_Content<TR_SectionListItem_3<{},{},{}>>;
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type DC_LiveChat={
	continuations: G_LiveChatContinuationItem[];
	actions?: G_LiveChatContinuationActions[];
	actionPanel?: R_LiveChatMessageInput;
	itemList?: R_LiveChatItemList;
	header?: R_LiveChatHeader;
	ticker?: R_LiveChatTicker;
	trackingParams?: string;
	participantsList?: R_LiveChatParticipantsList;
	popoutMessage?: R_Message;
	emojis?: D_LiveChatEmoji[];
	clientMessages?: ClientMessages;
	viewerName?: string;
};
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
type RA_ReplayChatItem={replayChatItemAction: DA_ReplayChatItem;};
type G_LiveChatContinuationActions=RA_ReplayChatItem|A_AddChatItem;
type DE_VE3832_Watch={
	videoId: string;
	playlistId: PlaylistId;
	index: number;
	playlistSetVideoId: string;
	params: string;
	startTimeSeconds?: number;
	continuePlayback?: false;
	loggingContext: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig: R_PrefetchHintConfig;
	playerParams: string;
	watchEndpointMusicSupportedConfigs: R_WatchEndpointMusicConfig;
	nofollow?: boolean;
	playerExtraUrlParams: G_ExtraUrlParamItem[];
};
type D_EngagementPanelSectionList=
	|DB_SI_EngagementPanel
	|SI_VE76278_EngagementPanel
	|SI_VE99999_EngagementPanel
	|SI_VE124975_EngagementPanel
	|SI_VE126250_EngagementPanel
	|SI_VE139722_EngagementPanel
	;
;
type SI_VE76278_EngagementPanel={
	panelIdentifier: "comment-item-section";
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 76278;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE99999_EngagementPanel={
	panelIdentifier: "shopping_panel_for_entry_point_5";
	header: R_EngagementPanelTitleHeader;
	content: R_ProductList;
	veType: 99999;
	targetId: "shopping_panel_for_entry_point_5";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE126250_EngagementPanel={
	panelIdentifier: "engagement-panel-searchable-transcript";
	header: R_EngagementPanelTitleHeader;
	content: R_ContinuationItem;
	veType: 126250;
	targetId: "engagement-panel-searchable-transcript";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: B_C_ScrollToEngagementPanel[];
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE124975_EngagementPanel={
	panelIdentifier: "engagement-panel-structured-description";
	header: R_EngagementPanelTitleHeader;
	content: R_StructuredDescriptionContent;
	veType: 124975;
	targetId: "engagement-panel-structured-description";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	identifier?: T_ShortsSurfaceIdentifier<"engagement-panel-structured-description">;
	loggingDirectives: D_LoggingDirectives;
};
type SI_VE139722_EngagementPanel={
	header: R_EngagementPanelTitleHeader;
	content: R_SectionList;
	veType: 139722;
	targetId: "engagement-panel-comments-section";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	identifier: T_ShortsSurfaceIdentifier<"shorts-comments-panel">;
	loggingDirectives: D_LoggingDirectives;
};
type DB_SI_EngagementPanel={
	content: R_AdsEngagementPanelContent;
	targetId: "engagement-panel-ads";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-macro-markers-description-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-description-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-clip-create";
	header: R_EngagementPanelTitleHeader;
	content: R_ClipSection;
	targetId: "engagement-panel-clip-create";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	onShowCommands: G_EngagementPanelSectionShowCommands[];
	loggingDirectives: D_LoggingDirectives;
}|{
	panelIdentifier: "engagement-panel-macro-markers-auto-chapters";
	header: R_EngagementPanelTitleHeader;
	content: R_MacroMarkersList;
	targetId: "engagement-panel-macro-markers-auto-chapters";
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
	loggingDirectives: D_LoggingDirectives;
};
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|B_C_ScrollToEngagementPanel;
type AC_Executor=[
	A_ChangeEngagementPanelVisibility,
	A_HideEngagementPanelScrim,
	TA_OpenPopup<{}>,
	B_C_ScrollToEngagementPanel,
][number];
type GC_EngagementPanelSectionShow=
	|A_ChangeEngagementPanelVisibility
	|A_ShowEngagementPanelScrim
	|B_C_ScrollToEngagementPanel
	;
;
type B_C_ScrollToEngagementPanel={clickTrackingParams: string; scrollToEngagementPanelCommand: D_ScrollToEngagementPanel;};
type D_EngagementPanelSectionShortsComments=Record<"content",R_SectionList>&{
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "shorts-comments-panel";
	};
	loggingDirectives: {};
	targetId: "shorts-comments-panel";
	veType: 139722;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelSectionTargetId=T_TargetIdStr<
	"engagement-panel",[
		"ads",
		"clip-create",
		"structured-description",
		"comments-section",
		"macro-markers-description-chapters",
	][number]
>;
type D_EngagementPanelStructuredDescription=Record<"content",{}>&{
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "engagement-panel-structured-description";
	};
	loggingDirectives: {};
	targetId: "engagement-panel-structured-description";
	veType: 124975;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelTargetId="engagement-panel-comments-section"|"engagement-panel-clip-view"|"engagement-panel-clip-create"|"engagement-panel-structured-description"|"engagement-panel-macro-markers-auto-chapters"|"engagement-panel-macro-markers-description-chapters";
type D_EngagementPanelVisibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";

type D_TargetIdStr=[
	AD_AppendContinuationItems['targetId'],
	TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>['targetId'],
	"comments-section",
	"search-feed",
	D_EngagementPanelSectionTargetId,
	D_ScrollToEngagementPanel['targetId'],
	RS_Search['targetId'],
	D_TranscriptSearchPanel['targetId'],
	AD_UpdateEngagementPanel['targetId'],
	A_WatchNextContinuation['targetId'],
	D_ChipCloudChip_tid['targetId'],
	`shopping_panel_for_entry_point_${"5"|"22"}`,
	"clip-info-button",
	"sponsorships-button",
	D_Menu_TargetId,
	DB_SI_EngagementPanel['targetId'],
][number];
type D_UiTargetId="browse-feedFEwhat_to_watch"|"watch-next-feed";
type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
type R_VE5754_PlaylistPage={
	page: "playlist";
	endpoint: E_Browse;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
type R_VE3832_WatchPage={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [D_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
};
