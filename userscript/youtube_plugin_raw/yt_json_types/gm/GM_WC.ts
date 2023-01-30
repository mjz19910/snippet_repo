//#region CommonType
type D_Empty_WCM={webCommandMetadata: {};};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
type DC_Generic_CTP_CF=[
	"D_CD_Reload",
][number];
type D_Params={params: string;};
//#endregion
//#region TemplateStrings
type T_MixPlaylistStr=`RD${string}`;
//#endregion
//#region Templates
type D_EndpointLikeEndings="Endpoint"|"Command"|"Action";
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
	GM_CreateBackstagePost,
	GM_EditPlaylist,
	GM_Browse,
	GM_CreateComment,
	GM_Feedback,
	GM_FlagGetForm,
	GM_GetSurvey,
	GM_GetTranscript,
	GM_GetNotificationMenu,
	GM_Dislike,
	GM_Like,
	GM_RemoveLike,
	GM_Next,
	GM_GetUnseenNotificationCount,
	GM_notification_opt_out,
	GM_RecordInteractions,
	GM_CreatePlaylist,
	GM_AddToPlaylistService,
	GM_SendPost,
	GM_GetSharePanel,
	GM_Subscribe,
	GM_ypc_get_offers,
	GM_YpcGetCart,
][number];
//#endregion

//#region GM_ApiUrl
type GM_SetSetting=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/set_setting">;
type GM_AccountMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/account/account_menu">;
type GM_CreateBackstagePost=T_GM_PostApi_WithApiUrl<"/youtubei/v1/backstage/create_post">;
type GM_EditPlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse/edit_playlist">;
type GM_Browse=T_GM_PostApi_WithApiUrl<"/youtubei/v1/browse">;
type GM_CreateComment=T_GM_PostApi_WithApiUrl<"/youtubei/v1/comment/create_comment">;
type GM_Feedback=T_GM_PostApi_WithApiUrl<"/youtubei/v1/feedback">;
type GM_FlagGetForm=T_GM_PostApi_WithApiUrl<"/youtubei/v1/flag/get_form">;
type GM_GetSurvey=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_survey">;
type GM_GetTranscript=T_GM_PostApi_WithApiUrl<"/youtubei/v1/get_transcript">;
type GM_GetNotificationMenu=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_notification_menu">;
type GM_Dislike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/dislike">;
type GM_Like=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/like">;
type GM_RemoveLike=T_GM_PostApi_WithApiUrl<"/youtubei/v1/like/removelike">;
type GM_Next=T_GM_PostApi_WithApiUrl<"/youtubei/v1/next">;
type GM_GetUnseenNotificationCount=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/get_unseen_count">;
type GM_notification_opt_out=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/opt_out">;
type GM_RecordInteractions=T_GM_PostApi_WithApiUrl<"/youtubei/v1/notification/record_interactions">;
type GM_CreatePlaylist=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/create">;
type GM_AddToPlaylistService=T_GM_PostApi_WithApiUrl<"/youtubei/v1/playlist/get_add_to_playlist">;
type GM_GetSharePanel=T_GM_PostApi_WithApiUrl<"/youtubei/v1/share/get_share_panel">;
type GM_Subscribe=T_GM_PostApi_WithApiUrl<"/youtubei/v1/subscription/subscribe">;
type GM_ypc_get_offers=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_offers">;
type GM_YpcGetCart=T_GM_PostApi_WithApiUrl<"/youtubei/v1/ypc/get_cart">;
type GM_SendPost={sendPost: true;};
//#endregion
//#region M_*
type TM_Gen<T>={webCommandMetadata: T;};
type M_VE3611=TM_Gen<GM_VE3611_WC>;
type M_VE3832=TM_Gen<GM_VE3832_Watch_WC>;
type M_VE3854=TM_Gen<GM_VE3854_WC>;
type M_VE4724=TM_Gen<GM_VE4724_WC>;
type M_VE5754=TM_Gen<GM_VE5754_WC>;
type M_VE6827=TM_Gen<GM_VE6827_WC>;
type M_VE11487=TM_Gen<GM_VE11487_WC>;
type M_VE23462=TM_Gen<GM_VE23462_WC>;
type M_VE37414=TM_Gen<GM_VE37414_WC>;
type M_VE42352=TM_Gen<GM_VE42352_WC>;
type M_VE83769=TM_Gen<GM_VE83769_WC>;
type M_VE96368=TM_Gen<GM_VE96368_WC_browse>;
type M_AccountMenu=TM_Gen<GM_AccountMenu>;
type M_Browse=TM_Gen<GM_Browse>;
type M_FlagGetForm=TM_Gen<GM_FlagGetForm>;
type M_GetNotificationMenu=TM_Gen<GM_GetNotificationMenu>;
type M_Next=TM_Gen<GM_Next>;
type M_RecordInteractions=TM_Gen<GM_RecordInteractions>;
type M_SendPost=TM_Gen<GM_SendPost>;
type M_SetSetting=TM_Gen<GM_SetSetting>;
type M_YpcGetCart=TM_Gen<GM_YpcGetCart>;
type M_GetUnseenNotificationCount=TM_Gen<GM_GetUnseenNotificationCount>;
//#endregion
//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611_Browse={browseId: `UC${string}`; canonicalBaseUrl: `/@${string}`;};
type DE_VE3854_Browse=DE_VE<"FEwhat_to_watch">;
type DE_VE5754_Browse=DE_VE<GU_VE5754_UrlType>;
type DE_VE6827_NoParams=DE_VE<GU_VE6827_Url_NoParams>;
type DE_VE6827_Params={browseId: GU_VE6827_Url_Params; params: string;};
type DE_VE6827_Browse=DE_VE6827_NoParams|DE_VE6827_Params;
type DE_VE11487_Browse=DE_VE<"SPunlimited">;
type DE_VE23462_Browse=DE_VE<GU_VE23462_UrlType>;
type DE_VE42352_Browse=DE_VE<"FEdownloads">;
type DE_VE96368_Browse=DE_VE<"FEsubscriptions">;
type DE_Subscribe={channelIds: ChannelId[]; params: string;};
type DE_WatchPlaylist={playlistId: `RD${string}`; index: 13; params: string;};
//#endregion
//#region E_VE
type E_VE3611_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE3611_Browse,M_VE3611>;
type E_VE3854_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE3854_Browse,M_VE3854>;
type E_VE5754_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE5754_Browse,M_VE5754>;
type E_VE6827_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE6827_Browse,M_VE6827>;
type E_VE11487_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE11487_Browse,M_VE11487>;
type E_VE23462_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE23462_Browse,M_VE23462>;
type E_VE42352_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE42352_Browse,M_VE42352>;
type E_VE96368_Browse=TE_Endpoint_3<"browseEndpoint",DE_VE96368_Browse,M_VE96368>;
//#endregion
// TODO: #8 Get the SettingsEndpoint type
type E_Settings={};
type E_Browse=
	|E_VE3611_Browse
	|E_VE3854_Browse
	|E_VE5754_Browse
	|E_VE6827_Browse
	|E_VE11487_Browse
	|E_VE23462_Browse
	|E_VE42352_Browse
	|E_VE96368_Browse
	;
;
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
type A_UpdateEngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type A_UpdateNotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
//#endregion
//#region Commands
type C_AddToPlaylist={clickTrackingParams: string; addToPlaylistCommand: DC_AddToPlaylist;};
type C_AdsControlFlowOpportunityReceived={clickTrackingParams: string; adsControlFlowOpportunityReceivedCommand: DC_AdsControlFlowOpportunityReceived;};
type DC_AdsControlFlowOpportunityReceived={
	opportunityType: DE_OpportunityType;
	adSlotAndLayoutMetadata?: D_AdSlotAndLayoutItem[];
	isInitialLoad: boolean;
	enablePacfLoggingWeb: boolean;
};
type C_ChangeKeyedMarkersVisibility={clickTrackingParams: string; changeKeyedMarkersVisibilityCommand: DC_ChangeKeyedMarkersVisibility;};
type DC_ChangeKeyedMarkersVisibility={
	isVisible: true;
	key: "HEATSEEKER";
};
type C_Continuation=TE_Endpoint_Opt_3<"continuationCommand",DC_Continuation,M_Next>|{clickTrackingParams: string; commandMetadata: M_Next|undefined; continuationCommand: DC_Continuation;};
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
	followUpText: G_Text;
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
type C_Loop={clickTrackingParams: string; loopCommand: DC_Loop;};
type DC_Loop={loop: false;};

//#endregion
//#region Endpoints

type E_AddToPlaylistService=TE_Endpoint_3<"addToPlaylistServiceEndpoint",DE_AddToPlaylistService,M_AddToPlaylistService>;
type M_AddToPlaylistService=TM_Gen<GM_AddToPlaylistService>;
type DE_AddToPlaylistService={videoId: string;};
type E_CreateBackstagePost=TE_Endpoint_3<"createBackstagePostEndpoint",DE_CreateBackstagePost,M_CreateBackstagePost>;
type M_CreateBackstagePost=TM_Gen<GM_CreateBackstagePost>;
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type E_CreateComment=TE_Endpoint_3<"createCommentEndpoint",DE_CreateComment,M_comment_create_comment>;
type M_comment_create_comment=TM_Gen<GM_CreateComment>;
type DE_CreateComment={createCommentParams: string;};
type E_Feedback=TE_Endpoint_3<"feedbackEndpoint",DE_Feedback,M_Feedback>;
type DE_Feedback={feedbackToken: string; uiActions: D_HideEnclosingContainer; actions?: A_ReplaceEnclosing[];};
type E_GetNotificationMenu=TE_Endpoint_3<"getNotificationMenuEndpoint",DE_GetNotificationMenu,M_GetNotificationMenu>;
type DE_GetNotificationMenu={ctoken: string;};
type E_GetReportForm=TE_Endpoint_3<"getReportFormEndpoint",D_Params,M_FlagGetForm>;
type E_GetTranscript=TE_Endpoint_3<"getTranscriptEndpoint",D_Params,D_Empty_WCM>;
type M_Like={webCommandMetadata: GM_Like|GM_Dislike|GM_RemoveLike;};
interface E_Like extends TE_Endpoint_3<"likeEndpoint",DE_Like,M_Like> {};
type DE_Like=DE_Like_NS.DE_Like;
type E_NotificationOptOut=TE_Endpoint_3<"notificationOptOutEndpoint",DE_NotificationOptOut,D_Empty_WCM>;
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type M_EditPlaylist={
	webCommandMetadata: GM_EditPlaylist;
};

type E_PlaylistEdit=TE_Endpoint_3<"playlistEditEndpoint",DE_PlaylistEdit,M_EditPlaylist>;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId: "WL"; params?: string;};
type E_PlaylistEditor=TE_Endpoint_3<"playlistEditorEndpoint",DE_PlaylistEditor,D_Empty_WCM>;
type DE_PlaylistEditor={playlistId: PlaylistId;};
type E_RecordNotificationInteractions=TE_Endpoint_3<"recordNotificationInteractionsEndpoint",DE_RecordNotificationInteractions,M_RecordInteractions>;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type E_ReelWatch=TE_Endpoint_3<"reelWatchEndpoint",DE_ReelWatch,TM_Gen<GM_VE37414_WC>>;
type DE_ReelWatch={videoId: string;}|{thumbnail: R_Thumbnail;}|{playerParams: string; overlay: R_ReelPlayerOverlay; params: string;}|{sequenceProvider: "REEL_WATCH_SEQUENCE_PROVIDER_RPC"; sequenceParams: string;}|{inputType: "REEL_WATCH_INPUT_TYPE_SEEDLESS";};
type E_Search=TE_Endpoint_3<"searchEndpoint",DE_Search,M_VE4724>;
type DE_Search={query: string;};
type M_Feedback=TM_Gen<GM_Feedback>;
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
type E_SignalNavigation=TE_Endpoint_3<"signalNavigationEndpoint",DE_SignalNavigation,M_VE83769>;
type M_Subscribe=TM_Gen<GM_Subscribe>;

type E_Subscribe=TE_Endpoint_3<"subscribeEndpoint",DE_Subscribe,M_Subscribe>;
type E_UndoFeedback=TE_Endpoint_3<"undoFeedbackEndpoint",DE_UndoFeedback,D_Empty_WCM>;
type E_Upload=TE_Endpoint_3<"uploadEndpoint",B_Hack,D_Empty_WCM>;
type E_Url=TE_Endpoint_3<"urlEndpoint",DE_Url,M_VE83769>;
type E_Watch=TE_Endpoint_3<"watchEndpoint",DE_VE3832_Watch,M_VE3832>;
type E_WatchPlaylist=TE_Endpoint_3<"watchPlaylistEndpoint",DE_WatchPlaylist,D_Empty_WCM>;
type E_YpcGetCart=TE_Endpoint_3<"ypcGetCartEndpoint",DE_YpcGetCart,M_YpcGetCart>;
type E_YpcGetOffers=TE_Endpoint_3<"ypcGetOffersEndpoint",D_Params,D_Empty_WCM>;
type E_YpcGetOfflineUpsell={clickTrackingParams: string; ypcGetOfflineUpsellEndpoint: D_Params;};
type M_CreatePlaylist=TM_Gen<GM_CreatePlaylist>;
//#endregion
type SE_CreatePlaylist=TE_Endpoint_3<"createPlaylistServiceEndpoint",DS_CreatePlaylist,M_CreatePlaylist>;
type M_GetSharePanel=TM_Gen<GM_GetSharePanel>;
type SE_ShareEntity=TE_Endpoint_3<"shareEntityServiceEndpoint",D_ShareEntityService,M_GetSharePanel>;
type SE_Signal_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;

type EX_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;

type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
// TODO #4
type DC_PlaylistPanel={};
type C_SectionList={sectionListContinuation: DC_SectionList;};
type T_DC_Content<T>={trackingParams: string; contents: T[];};
type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
type T_DC_Content_3<SectionId_T extends string,TargetId_T extends string,T_Content>={contents: T_Content[]; trackingParams: string; sectionIdentifier: SectionId_T; targetId: TargetId_T;};
type DC_SectionList=
	|DC_SectionListBase
	|DC_SectionList_SearchFeed
	|DC_SectionList_BrowseFeed_ChannelFeatured
	|DC_SectionList_BrowseFeed_Subscriptions
	;
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
	trackingParams: string;
	participantsList?: R_LiveChatParticipantsList;
	popoutMessage?: R_Message;
	emojis?: D_LiveChatEmoji[];
	clientMessages?: D_ClientMessages;
	viewerName?: string;
};
type RC_MusicShelf={musicShelfContinuation: {};};
//#region ActionData
//#endregion
type G_LiveChatContinuationItem=
	|CD_Invalidation
	|CD_LiveChatReplay
	|CD_PlayerSeek
	;
;
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
	onShowCommands: C_ScrollToEngagementPanel[];
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
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;
type AC_Executor=[
	A_ChangeEngagementPanelVisibility,
	A_HideEngagementPanelScrim,
	C_ScrollToEngagementPanel,
	C_Loop,
	C_UpdateToggleButtonState,
	TA_OpenPopup<{}>,
][number];
type DC_UpdateToggleButtonState={
	toggled: false;
	buttonId: "TOGGLE_BUTTON_ID_TYPE_STRUCTURED_DESCRIPTION";
};

type C_UpdateToggleButtonState={
	clickTrackingParams: string;
	updateToggleButtonStateCommand: DC_UpdateToggleButtonState;
};
type GC_EngagementPanelSectionShow=
	|A_ChangeEngagementPanelVisibility
	|A_ShowEngagementPanelScrim
	|C_ScrollToEngagementPanel
	;
;
type C_ScrollToEngagementPanel={clickTrackingParams: string; scrollToEngagementPanelCommand: DC_ScrollToEngagementPanel;};
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
	DC_ScrollToEngagementPanel['targetId'],
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
	D_Button$TargetId,
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
