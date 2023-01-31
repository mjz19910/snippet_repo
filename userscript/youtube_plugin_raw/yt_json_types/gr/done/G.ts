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
type GE_Browse_WCM=GE_Browse["commandMetadata"];

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
	T_Icon<D$AnyIconStr>,
	Extract<D_Button,{icon: any;}>['icon'],
	D_InfoRow['expandIcon'],
	D_TopicLink['callToActionIcon'],
	T_Icon<"LIBRARY_REMOVE">,
	D_ThumbnailOverlayHoverText['icon']
][number]>;
// TODO #6
type GD_SD_Item={};
type GE_Button_navigation=SE_ShareEntity|E_Watch|GE_Browse;
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

type GM_Like=GM_Like_1|GM_Dislike|GM_RemoveLike;
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
	|AU_ChannelSwitcherPage
	|AU_NotificationsUnseenCount
	|AU_SubscribeButton
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
][number]; type G_CodecType=[
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
}|{
	webCommandMetadata: GM_WC;
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
type G_ExtraUrlParamItem={
	key: "inline";
};
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
