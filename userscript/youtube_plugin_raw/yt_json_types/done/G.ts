//#region G_RS
type G_RS_Page_Playlist=RS_Page_Playlist|RS_VE5754_Page_Playlist;
//#endregion

// all from GR_CD.ts
type G_LiveChatContinuationItem=
	|CD_Invalidation
	|CD_LiveChatReplay
	|CD_PlayerSeek
	;
;

// all from GR_EY.ts
type G_EY_Entity=
	|EY_MacroMarkersList
	|EY_Offlineability
	|EY_TranscriptTrackSelection
	|S_EY_PlaylistLoop
	|S_EY_Subscription
	|S_EY_TranscriptSearchBox
	;
;

// from GR_SI.ts
type G_SI_DB_EngagementPanel=
	|SI_DB_EngagementPanel_Ads
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters
	|SI_DB_EngagementPanel_ClipCreate
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters
	;
;

// from Action Renderers and Actions (GR_RA.ts, GR_A.ts)
type G_RA_LiveChatContinuationActions=
	|A_ReplayChatItem
	|A_AddChatItem
	;
;
type GE_Browse=
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
type G_DE_Browse_VE=DE_VE3611_Browse|DE_VE3854_Browse|DE_VE5754_Browse|DE_VE6827_Browse|DE_VE11487_Browse|DE_VE23462_Browse|DE_VE42352_Browse|DE_VE96368_Browse;
type GM_VE_WC_Browse=GM_VE3611_WC|GM_VE3854_WC|GM_VE5754_WC|GM_VE6827_WC|GM_VE11487_WC|GM_VE23462_WC|GM_VE42352_WC|GM_VE96368_WC_browse;
type GE_Browse_WCM=M_VE3611|M_VE3854|M_VE5754|M_VE6827|M_VE11487|M_VE23462|M_VE42352|M_VE96368;

type GE_ResponseReceived=
	|A_AppendContinuationItems
	|C_AdsControlFlowOpportunityReceived
	|C_ChangeKeyedMarkersVisibility
	|C_LoadMarkers
	|C_ReloadContinuationItems
	|T_SE_Signal<M_SendPost,G_ClientSignal>
	;
;
type GA_FormatItagArr=[
	18,
	133,134,135,136,137,140,160,
	242,243,244,247,248,249,250,251,278,298,299,
	302,303,308,315,394,395,396,397,398,399,
	400,401,
];
type GA_Playlist=A_ActionAddVideo|D_ActionRemoveVideoByVideoId|A_ActionSetPlaylistVideoOrder;
type GC_Button=
	|A_ChangeEngagementPanelVisibility
	|C_Continuation
	|TA_OpenPopup_Empty
	|T_SE_Signal<M_SendPost,G_ClientSignal>
	|E_CreateBackstagePost
	|E_Url
	|C_Executor
	|C_GetSurvey
	|E_AddToPlaylistService
	;
;
type GD_EngagementPanelMenu={
	title: G_Text;
	contextualInfo: G_Text;
	menu: R_SortFilterSubMenu;
	visibilityButton: R_Button;
	trackingParams: string;
};
type GD_Icon=NonNullable<[
	T_Icon<D_AnyIconStr>,
	Extract<D_Button,{icon: any;}>['icon'],
	D_InfoRow['expandIcon'],
	D_TopicLink['callToActionIcon'],
	T_Icon<"LIBRARY_REMOVE">,
	D_ThumbnailOverlayHoverText['icon']
][number]>;
// TODO #6
type GD_SD_Item={};
type GE_Button_navigation=E_ShareEntityService|E_Watch|GE_Browse;
type GE_Continuation=E_GetNotificationMenu|C_Continuation|E_GetTranscript;
type GM_Base={
	url?: D_UrlFormat;
	webPageType?: YtPageTypeEnum;
	apiUrl?: D_ApiPathFormat;
	sendPost?: boolean;
};
type GT_KnownSplit=T_Split<D_KnownGet>[number];
type GV_sub_57yn=[
	"lk",
	"sd",
	"se",
	"sk",
	"sl",
	"ss",
	"sz",
][number];
type GV_sub_5s7n=[
	"76",
	"7d",
	"7s",
	"7y",
	"7z",
	"ee",
	"el"
][number];
type GV_Dig_sn_nx=[
	`57yn${GV_sub_57yn}`,
	`5s7n${GV_sub_5s7n}`,
][number];
type GV_SubDomain=[
	`rr${number}---${"sn-nx"}${string}`
][number];

type GM_Like=GM_LikeLike|GM_Dislike|GM_RemoveLike;
type GA_EditPlaylist=C_RefreshPlaylist|TA_OpenPopup_Empty;

type RSB_EditPlaylist={
	responseContext: RC_ResponseContext;
	actions: GA_EditPlaylist[];
	status: "STATUS_SUCCEEDED";
	playlistEditResults: {}[];
	trackingParams: string;
};
type G_CardList_StyleType="HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION";
type G_AccountItemSection=A_AccountItem|R_CompactLink;
type G_AccountPageSettingsSections=[
	"advanced",
	"billing",
	"notifications",
	"privacy",
	"sharing",
	"playback",
][number];
type G_Actions=
	|A_AddToGuideSection
	|A_GetMultiPageMenu
	|A_RemoveFromGuideSection
	|UA_ChannelSwitcherPage
	|UA_NotificationsUnseenCount
	|UA_SubscribeButton
	|C_RefreshPlaylist
	|C_RunAttestation
	|TA_OpenPopup_Empty
	;
;
type G_Browse_MD=R_Channel_MD|R_Playlist_MD;
type G_BrowseContents=R_TwoColumnBrowseResults|R_FeedFilterChipBar;
type G_BrowseFeedContent=R_SearchBox|R_SubFeedSelector|R_Button|R_CompactLink;
type G_BrowseHeader=R_FeedTabbedHeader|R_C4TabbedHeader;
type G_BrowseSidebar=
	|R_SettingsSidebar
	|R_PlaylistSidebar
	;
;
type G_ChannelSwitcherContent=R_Button|A_AccountItem;
type G_ChatItem=[
	R_LiveChatTextMessage,
	R_LiveChatPlaceholderItem,
	R_LiveChatViewerEngagementMessage,
][number];
type G_CodecType=[
	G_CodecTypeStr,
	T_SplitOnce<G_GenericCodecType,".">[0]
][number];
type G_CodecTypeStr=[
	"opus",
	"vp9"
][number];
type G_CommandMetadata={
	webCommandMetadata: GM_WC;
	resolveUrlCommandMetadata: MC_ResolveUrl;
}|{webCommandMetadata: GM_WC;};
// COMPLETED: #7
type MC_ResolveUrl={
	isVanityUrl?: boolean;
	parentTrackingParams?: string;
};
type G_EngagementPanelMenu=R_Menu|R_SortFilterSubMenu;
type G_EngagementPanelSectionListItem=[
	R_AdsEngagementPanelContent,
	R_ClipSection,
	R_ContinuationItem,
	R_MacroMarkersList,
	R_ProductList,
	TR_SectionList_3<{},"comment-item-section","engagement-panel-comments-section">,
	R_StructuredDescriptionContent,
][number];
type G_ExtraUrlParamItem={key: "inline";};
type G_FollowUpOption=R_RadioButtonSurveyOption|R_CheckboxSurveyOption;
type G_FormatQuality=[
	"hd2160","hd1440","hd1080","hd720",
	"large","medium","small","tiny",
][number];
type G_GenericCodecType=[
	S_acv1_codec,
	"mp4a.40.2",
	// av1 profile=0 level_id=08M bit_depth=8-bit
	"av01.0.08M.08"
][number];
type G_GuideItem=R_GuideSection|R_GuideSubscriptionsSection;
type G_GuideSectionItem=[
	R_GuideCollapsibleEntry,
	R_GuideCollapsibleSectionEntry,
	R_GuideDownloadsEntry,
	R_GuideEntry,
	R_GuideSection,
	R_GuideSubscriptionsSection,
][number];
type G_GuideSubscriptionsSectionItem=
	|R_GuideEntry
	|R_GuideCollapsibleEntry
	;
;
type G_HexNibbleStr=T_Split<"abcdef0123456789","">[number];
type G_ItemSectionItems=R_CompactRadio|R_ContinuationItem|R_CompactVideo|R_CompactPlaylist|R_AdSlot;
type G_LinearAdsItem=R_InstreamVideoAd|R_AdActionInterstitial;
type G_MenuItem=R_MenuServiceItem|R_ToggleMenuServiceItem|R_MenuNavigationItem;
type G_MimeTypeFormat=[
	`video/mp4; codecs="${S_acv1_codec}"`,
	`video/mp4; codecs="av01.0.08M.08"`,
	`video/webm; codecs="vp9"`,
	`audio/mp4; codecs="mp4a.40.2"`,
	`audio/webm; codecs="opus"`,
][number];
type G_PopupItem=
	|R_ConfirmDialog
	|TR_MultiPageMenu<{}>
	|RA_NotificationAction
	|R_PdgBuyFlow
	|R_UnifiedSharePanel
	|R_VoiceSearchDialog
	;
;
type G_ProfileColumnItem=R_ProfileColumnUserInfo|R_ProfileColumnStats;
type GC_EngagementPanelSectionShow=A_ChangeEngagementPanelVisibility|
	A_ShowEngagementPanelScrim|
	C_ScrollToEngagementPanel;
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;

type G_Action_GetNotificationsMenu_Popup=T_DropdownPopup_ReuseFlag<P_NotificationMenu_Popup>;
type G_Action_GetNotificationsMenu=TA_OpenPopup<G_Action_GetNotificationsMenu_Popup>;

type G_DC_SectionList=
	|DC_SectionListBase
	|DC_SectionList_SearchFeed
	|DC_SectionList_BrowseFeed_ChannelFeatured
	|DC_SectionList_BrowseFeed_Subscriptions
	;
;
type G_ClientSignal={signal: "CLIENT_SIGNAL"; actions: G_ClientSignal_Item[];};
type G_ClientSignal_Item=[
	A_SendFeedback,
	A_Signal,
	C_AddToPlaylist,
	E_ShowEngagementPanel,
	OP_ClientSignal,
][number];
type G_RichSection=R_RichShelf|R_InlineSurvey|R_SourcePivotHeader;
type G_Text=({runs: D_TextRun[];}|{simpleText: string;})&G_Text_Base;
type G_Text_Base={accessibility?: D_Accessibility;};
type G_SE_MenuService=
	|A_ChangeEngagementPanelVisibility
	|E_AddToPlaylistService
	|E_PlaylistEdit
	|E_Feedback
	|E_SignalService_SendPost
	|E_ShareEntityService
	|E_GetReportForm
	;
;
type G_PlaylistPanel_Item=R_AutomixPreviewVideo|R_PlaylistPanelVideo;
type G_AllSignalTypes=
	|Signal_GetNotificationsMenu
	|G_ClientSignal
	|G_AllSignalServiceEndpoint['signalServiceEndpoint']
	;
;
type G_AllSignalServiceEndpoint=D_NotificationTopbarButton['updateUnseenCountEndpoint'];
type G_AdditionalDataItem=
	|T_UserFeedbackEndpointProductSpecificValueData<"lockup","player">
	|T_UserFeedbackEndpointProductSpecificValueData<"video_id",string>
	;
;
type GRC_ServiceTrackingParams=[
	RC_Csi_SPs,
	RC_ECatcher_SPs,
	RC_GFeedback_SPs,
	RC_GoogleHelp_SPs,
	SP_GuidedHelp_SPs,
][number];
type G_ResponseActions=
	TA_OpenPopup_Empty|
	UA_NotificationsUnseenCount|
	A_RemoveFromGuideSection|
	A_AddToGuideSection|
	never;
type G_ResponseTypes=
	|B_GenericResponseType
	|WD_account_account_menu
	|WD_account_set_setting
	|WD_accounts_list
	|WD_att_get
	|WD_att_log
	|WD_browse
	|WD_browse_edit_playlist
	|WD_feedback
	|WD_get_notification_menu
	|WD_get_survey
	|WD_get_transcript
	|WD_GetAccountSwitcherEndpoint
	|WD_getDatasyncIdsEndpoint
	|WD_guide
	|WD_like_dislike
	|WD_like_like
	|WD_like_removelike
	|WD_live_chat_get_live_chat
	|WD_live_chat_get_live_chat_replay
	|WD_music_get_search_suggestions
	|WD_next
	|WD_notification_get_unseen_count
	|WD_notification_modify_channel_preference
	|WD_notification_record_interactions
	|WD_pdg_get_pdg_buy_flow
	|WD_player
	|WD_playlist_get_add_to_playlist
	|WD_reel_reel_item_watch
	|WD_reel_reel_watch_sequence
	|WD_search
	|WD_share_get_share_panel
	|WD_subscription_subscribe
	|WD_subscription_unsubscribe
	|WD_update_metadata
	;
;
type G_RichGridContent=R_RichItem|R_ContinuationItem;
type G_RichItemContent=R_AdSlot|R_Video|R_Radio|R_FeedNudge;
type G_SecondaryContents=R_ProfileColumn|R_BrowseFeedActions;
type G_SectionItem=[
	R_RichItem,
	R_RichSection,
	R_CommentsHeader,
	R_CommentThread,
	R_CompactVideo,
	R_ContinuationItem,
][number];
type G_SettingsEndpointPages=`/account${""|`_${G_AccountPageSettingsSections}`}`;
type G_SettingsOptionItem=
	R_ChannelOptions|
	R_SettingsSwitch|
	R_SettingsCheckbox|
	R_SettingsRadioOption|
	R_CopyLink;
type G_ShelfItem={gridRenderer: R_Grid;};
type G_ShortsSurfaceIdentifier_ValidTag=
	|"engagement-panel-structured-description"
	|"shorts-comments-panel"
	;
;
type G_StructuredDescriptionContentItem=[
	R_ExpandableVideoDescriptionBody,
	R_HorizontalCardList,
	R_VideoDescriptionHeader,
	R_VideoDescriptionMusicSection,
][number];

type D_ThumbnailOverlayInlineUnplayable={};

type R_ThumbnailOverlayInlineUnplayable={thumbnailOverlayInlineUnplayableRenderer: D_ThumbnailOverlayInlineUnplayable;};

type G_ThumbnailOverlayItem=
	|R_ThumbnailOverlayBottomPanel
	|R_ThumbnailOverlayHoverText
	|R_ThumbnailOverlayLoadingPreview
	|R_ThumbnailOverlayNowPlaying
	|R_ThumbnailOverlayTimeStatus
	|R_ThumbnailOverlayToggleButton
	|R_ThumbnailOverlayResumePlayback
	|R_ThumbnailOverlayEndorsement
	|R_ThumbnailOverlaySidePanel
	|R_ThumbnailOverlayInlineUnplayable
	;
;
type G_TopbarButtonItem=R_TopbarMenuButton|R_NotificationTopbarButton;
type G_UrlInfoItem=D_UrlInfoPlaylist|D_UrlInfoVideo|D_UrlVideoReferral|D_UrlPlayNext;
type G_WatchNext=R_CompactVideo|R_ContinuationItem;
type G_WatchNextEndScreenItem=R_EndScreenPlaylist|
	R_EndScreenVideo;
type G_YtWatchUrl=[
	D_PlayerParamsUrl,
	D_WatchPlaylistUrlFormat,
][number];
type G_PlaylistSidebarItem=R_PlaylistSidebarPrimaryInfo|R_PlaylistSidebarSecondaryInfo;
