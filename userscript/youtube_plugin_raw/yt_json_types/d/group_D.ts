//#region G
export type G_LinearAdsItem=R_InstreamVideoAd|R_AdActionInterstitial;
//#endregion
import {T_StringTrim} from "../../support_0_mod/T_Split.js";
import {T_Split} from "../../support_0_mod/T_Split.mod.js";
import {AC_GetDownload,A_ChangeEngagementPanelVisibility,A_SetActivePanelItem,A_WatchNextContinuation} from "../abc/A.js";
import {B_Hack,B_HrefUrl,B_TagObj,B_VEMap} from "../abc/B.js";
import {CD_NextRadio,CD_Reload,C_CommandExecutor,C_Continuation,C_FollowUp,C_GetSurvey,C_Innertube,C_RelatedChip,DR_DC_EntityBatchUpdate} from "../abc/C.js";
import {GD_SD_Item} from "../abc/a_sub/G_empty_obj.js";
import {EG_GetNotificationMenuRequest,E_CreatePlaylistService,E_Feedback,E_Like,E_MuteAd,E_Pinging,E_PlaylistDelete,E_PlaylistEdit,E_PlaylistEditor,E_RecordNotificationInteractions,E_ShareEntityService,E_SignalNavigation,E_SignalService_SendPost,E_UndoFeedback,E_Upload,E_Url,E_Watch,E_WatchPlaylist,E_YpcGetCart,E_YpcGetOffers} from "../e/E.js";
import {E_Search,E_VE11487,E_VE23462,E_VE3611,E_VE37414_ReelWatch,E_VE3854,E_VE42352,E_VE5754,E_VE6827,E_VE96368} from "../e/GR_E_VE.js";
import {GM_VE3854} from "../ghi/_group.mod/GM.js";
import {GU_CaptionTrackItem_BaseUrl,GU_ExternalUrl,GU_GoodPut_ProbeUrl,GU_InitPlaybackUrl,GU_RadioShareUrl,GU_VE11487_Url,GU_VE3611_Url,GU_VE6827_Url,GU_YTExternalUrl} from "../ghi/_group.mod/GU.js";
import {GE_Browse,GR_MP_MenuNotificationSection_Item} from "../ghi/g_.mod/group_GE.js";
import {G_AccountItemSection,G_AccountPageSettingsSections,G_AdPlacementRendererItem,G_BrowseFeedContent,G_CardList_StyleType,G_ChannelSwitcherContent,G_EngagementPanelMenu,G_GuideSectionItem,G_GuideSubscriptionsSectionItem,G_MenuItem,G_PlaylistPanel_Item,G_PlaylistSidebarItem,G_ProfileColumnItem,G_RendererContentItem,G_RichGridContent,G_RichItemContent,G_RichSection,G_SI_DB_EngagementPanel,G_SecondaryContents,G_SettingItemIdEnum,G_SettingsOptionItem,G_StructuredDescriptionContentItem,G_Text,G_ThumbnailOverlayItem,G_TopbarButtonItem,G_WatchNextEndScreenItem,G_YtWatchUrl} from "../ghi/group_G.js";
import {K_AccountLinkProviderKey} from "../k/K.js";
import {MG_AdLayout,MG_AdLayout_DisplayBillboardImageButtoned,M_AccountMenu,M_Empty_WCM,M_Feedback,M_GetUnseenNotificationCount} from "../m/M.js";
import {A_FancyDismissibleDialog,MP_LoadingAccountMenu,MP_LoadingNotificationMenu,R_TopbarMenu,TA_OpenPopup_Empty} from "../nop_q/Popup.js";
import {RA_Notification,RC_CsiServiceC,RC_CsiServiceCVer,RC_CsiVarMap,RG_Result,RMD_Badge,R_AccountSectionList,R_AdActionInterstitial,R_AdHoverTextButton,R_AdPlacementConfig,R_AdSlot,R_AddToPlaylistCreate,R_AttachmentElement,R_AuthorCommentBadge,R_AutoplaySwitchButton,R_BasicColorPaletteData,R_BrowserMediaSessionRenderer,R_Card,R_CarouselLockup,R_ChannelHeaderLinks,R_ChannelSwitcherHeader,R_ChannelThumbnailWithLink,R_Chapter,R_ChildVideo,R_ChipCloud,R_ChipCloudChip,R_CinematicContainer,R_ClipAdState,R_ClipCreation,R_ClipCreationScrubber,R_ClipCreationTextInput,R_Comment,R_CommentActionButtons,R_CommentSimplebox,R_CommentsEntryPointTeaser,R_CommentsHeader,R_CompactLink,R_CompactVideo,R_ContinuationItem,R_DecoratedPlayerBar,R_DescriptionChaptersItem,R_DisplayAd,R_Dropdown,R_DropdownFormField,R_ElementUpdate,R_EmojiPicker,R_EndscreenElement,R_ExpandableSurveyResponse,R_Factoid,R_FeedFilterChipBar,R_FulfilledLayout,R_FusionSearchbox,R_GhostGrid,R_GuideEntry,R_GuideEntryData,R_HeatSeekerItem,R_Heatmap,R_HeroPlaylistThumbnail,R_HotkeyDialog,R_HotkeyDialogSection,R_HotkeyDialogSectionOption,R_InfoCardIcon,R_InfoRow,R_InstreamVideoAd,R_LikeButton,R_LiveChatAuthorBadge,R_MacroMarkersListItem,R_Menu,R_MenuFlexibleItem,R_MenuNavigationItem,R_MenuServiceItem,R_MerchandiseItem,R_MetadataRow,R_MovingThumbnail,R_MultiMarkersPlayerBar,R_MultiPageMenuNotificationSection,R_MusicResponsiveListItem,R_MusicShelfDivider,R_PdgBuyFlowHeader,R_PdgColorSlider,R_PdgCommentChip,R_PdgCommentOption,R_PdgCommentPreview,R_PlayerOverlayAutoplay,R_PlayerOverlayVideoDetails,R_PlaylistAddToOption,R_PlaylistByline,R_PlaylistLoopButton,R_PlaylistPanel,R_PlaylistPanelVideo,R_PlaylistVideoThumbnail,R_PrivacyDropdownItem,R_ProductListItem,R_ProfileColumnStatsEntry,R_ProfilePageHeaderButtonRowViewModel,R_ProfilePageHeaderInformationViewModel,R_ProfilePageHeaderMetadataViewModel,R_ProfilePageHeaderThumbnailViewModel,R_ProfilePageHeaderTitleViewModel,R_PromotedSparklesWeb,R_RatingSurvey,R_RatingSurveyOption,R_ReelItem,R_ResourceStatusInResponseCheck,R_RichItem,R_RichListHeader,R_RichMetadata,R_RichMetadataRow,R_SampledThumbnailColor,R_SearchResultsTab,R_SectionList,R_SegmentedLikeDislikeButton,R_SortFilterSubMenu,R_SponsorCommentBadge,R_SubFeedOption,R_SubscribeButton,R_SuperVodBuyFlowContent,R_Tab,R_TemplateUpdate,R_TextInputFormField,R_ThumbnailOverlayTimeStatus,R_ThumbnailOverlayToggleButton,R_ToggleButton,R_TopbarLogo,R_TopicLink,R_TranscriptFooter,R_TranscriptSearchPanel,R_TranscriptSegment,R_TranscriptSegmentList,R_VideoMastheadAdV3,R_VideoOwner,R_VideoViewCount,R_WatchNextEndScreen,R_WebSearchboxConfig,ToKeyValue} from "../r/group_R.js";
import {R_SimpleCardTeaser} from "../r/r_sub/r/R_SimpleCardTeaser.js";
import {SI_DB_EngagementPanel_ClipCreate,SI_DB_EngagementPanel_MacroMarkers_AutoChapters,SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters,SI_VE124975_EngagementPanel,SI_VE126250_EngagementPanel,SI_VE139722_EngagementPanel,SI_VE76278_EngagementPanel,SI_VE99999_EngagementPanel,S_GetAccountMenu} from "../stu/mod/group_S.js";
import {TD_GuideEntry_Simple,TD_Label,TM_Visibility,TP_Color,TR_MultiPageMenuSection,T_Actions,T_BaseUrl,T_DistributedKeyof,T_ElementId,T_EnumStr,T_ExtractIconType,T_Icon,T_MaybeTemplatedText,T_OmitKey,T_SE_Signal,T_Setting_AutoNavForDesktop,T_Signal,T_SplitOnce,T_StyleType,T_TargetIdStr,T_TrackedItems,T_Types,T_UrlWrappedValue} from "../stu/mod/group_T.js";
import {DC_ReloadContinuationItems} from "./group_DC.js";
import {DE_AdPlacementKind,DE_IconType_Button,DE_MP_MenuStyle,DE_SubmitFeedback,DE_SuperThanksSelectedTier,DE_VE83769_Url_1} from "./group_DE.js";
import {DE_U_ChannelUrl,DE_U_InternalUrl,DU_GuideEntry_Id,DU_Playlist_Id,DU_Playlist_Radio_Id,DU_StartRadio,DU_TargetId_ShoppingPanel_EntryPoint,DU_UrlTypeWithPageType,DU_VideoId,D_ApiStatsAdsStr,D_PlaylistUrlParams,D_ResultsPageUrl,D_TargetIdUuid,D_UUIDString,D_UserIdStr,G_SettingsEndpointPages,S_YtUrlHttp_Watch,T_FeedEntry,T_IdTemplate} from "./mod_D/DU_T/DU.js";
import {D_Button,R_Button} from "./mod_D/D_T/D_Button.js";

//#region String data, ie `D_${string}`
export type D_EndpointLikeEndings="Endpoint"|"Command"|"Action"|"Renderer";
//#endregion
//#region Enum data, ie `D_${string}`
export type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
export type D_UiTargetId=
	|SI_VE76278_EngagementPanel["targetId"]
	|A_WatchNextContinuation["targetId"]
	|DC_ReloadContinuationItems['targetId']
	;
;
//#endregion
//#region String data
export type WatchUrlFormat=
	|D_WatchPageUrl
	|`/watch?${D_WatchUrlStr}`
	|`/watch?v=${string}&list=RD${string}&start_radio=1&rv=${string}`
	|`/watch?v=${string}&list=RDGMEM${string}&start_radio=1&rv=${string}`
	|`/watch?v=${string}&playnext=1&list=${DU_Playlist_Radio_Id}`
	;
;
export type D_WatchPageUrl=
	|`/watch?v=${string}&list=RD${string}&index=${number}&pp=${string}`
	|`/watch?v=${string}&list=RD${string}&index=${number}`
	|`/watch?v=${string}&list=RD${string}&start_radio=1`
	|`/watch?v=${string}&pp=${string}`
	|`/watch?v=${string}&t=${number}s`
	|`/watch?v=${string}`
	|`/v/${string}`
	;
;
export type D_WatchPlaylistUrlFormat=
	|`list=${DU_Playlist_Id}`
	|`list=${DU_Playlist_Id}&index=${number}`
	|`list=${DU_Playlist_Radio_Id}&start_radio=${DU_StartRadio}`
	;
;
export type D_WatchUrlStr=
	|`v=${string}`
	|`v=${string}&${G_YtWatchUrl}`
	;
;
export type D_ChannelPageGridStyleType=
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_CHANNEL_PAGE_GRID"
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT"
	;
;
export type D_ContextTypeStr=
	|"channel_creator"
	|"yt_web_remix_unlimited"
	|"yt_web_search"
	|"yt_web_unknown_form_factor_kevlar_w2w"
	|"yt_web_unlimited"
	;
;
export type D_Settings_Id=
	|"account_advanced"
	|"account_billing"
	|"account_downloads"
	|"account_notifications"
	|"account_overview"
	|"account_playback"
	|"account_privacy"
	|"account_sharing"
	|"account"
	|"report_history"
	|"unlimited"
	;
;
export type D_VideoCategory=
	|"Autos & Vehicles"
	|"Comedy"
	|"Education"
	|"Entertainment"
	|"Film & Animation"
	|"Gaming"
	|"Howto & Style"
	|"Music"
	|"News & Politics"
	|"Nonprofits & Activism"
	|"People & Blogs"
	|"Pets & Animals"
	|"Science & Technology"
	|"Sports"
	|"Travel & Events"
	;
;
export type D_VE6827_PageLocation=
	|"history"
	|"library"
	;
;
export type D_FE_SectionId=T_FeedEntry<"trending"|"history"|"library"|"storefront"|"guide_builder">;
export type D_EngagementPanelTargetId=
	|"engagement-panel-clip-view"
	|"engagement-panel-error-corrections"
	|"engagement-panel-macro-markers-problem-walkthroughs"
	|DU_TargetId_ShoppingPanel_EntryPoint
	|SI_DB_EngagementPanel_ClipCreate["targetId"]
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters["targetId"]
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters["targetId"]
	|SI_VE76278_EngagementPanel["targetId"]
	|SI_VE124975_EngagementPanel["targetId"]
	|SI_VE126250_EngagementPanel["targetId"]
	;
;
export type D_EngagementPanelVisibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
export type D_ButtonSizeType="SIZE_DEFAULT"|"SIZE_SMALL";
export type D_ChannelSwitcherUrlFormat="/channel_switcher";
export type D_ConnectionWhitelistItem="WIFI";
export type D_CountryCode="CA";
export type D_GenSurvey_ActionStr="SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL";
//#endregion
//#region Entity data, ie `D_EY_${string}`
export type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
}|{
	key: string;
	addToOfflineButtonState: "ADD_TO_OFFLINE_BUTTON_STATE_UNKNOWN";
};
//#endregion
export type D_AddToPlaylistCreate={
	openCreateLink: R_CompactLink;
	nameInput: R_TextInputFormField;
	privacyInput: R_Dropdown;
	createAction: R_Button;
	serviceEndpoint: E_CreatePlaylistService;
};
//#region Icons
export type D_Icon_Button=T_Icon<DE_IconType_Button>;
//#endregion
//#region D_Survey
export type D_Survey_Watch={watch: B_Hack;};
//#endregion
export type D_ProfileColumn={items: G_ProfileColumnItem[];};
export type D_EngagementPanelSectionList=
	|G_SI_DB_EngagementPanel
	|SI_VE76278_EngagementPanel
	|SI_VE99999_EngagementPanel
	|SI_VE124975_EngagementPanel
	|SI_VE126250_EngagementPanel
	|SI_VE139722_EngagementPanel
	;
;
export type D_EngagementPanelSectionShortsComments=Record<"content",R_SectionList>&{
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
export type D_EngagementPanelSectionTargetId=T_TargetIdStr<
	"engagement-panel",[
		"ads",
		"clip-create",
		"structured-description",
		"comments-section",
		"macro-markers-description-chapters"
	][number]
>;
export type D_EngagementPanelStructuredDescription=Record<"content",{}>&{
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
export type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
export type TD_Accessibility<T>={accessibilityData: TD_Label<T>;};
export type D_SubscriptionNotificationToggleButton_States=[
	{
		stateId: 2;
		nextStateId: 2;
		state: R_Button;
	},
	{
		stateId: 3;
		nextStateId: 3;
		state: R_Button;
	},
	{
		stateId: 0;
		nextStateId: 0;
		state: R_Button;
	}
];

export type D_SubscriptionNotificationToggleButton={
	states: D_SubscriptionNotificationToggleButton_States;
	currentStateId: D_SubscriptionNotificationToggleButton_States[number]["stateId"];
	trackingParams: string;
	command: C_CommandExecutor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};
export type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: D_Thumbnail&R_SampledThumbnailColor;
	title: G_Text;
	navigationEndpoint: E_Watch;
	videoCountText: G_Text;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: G_Text;
	trackingParams: string;
	thumbnailText: G_Text;
	videoCountShortText: G_Text;
	shareUrl: GU_RadioShareUrl;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
export type D_PdgColorSlider={
	notches: D_NotchesItem[];
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
	maxTierValue: G_Text;
	minTierValue: G_Text;
};
export type D_SuperVodBuyFlowContent={
	description: G_Text;
	buyButton: R_Button;
	trackingParams: string;
	commentPreview: R_PdgCommentPreview;
	disclaimerText: G_Text;
	colorSlider: R_PdgColorSlider;
	defaultPriceTier: number;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
export type D_PdgCommentPreview={
	title: G_Text;
	authorThumbnail: D_Thumbnail;
	authorText: G_Text;
	commentOptionRenderers: R_PdgCommentOption[];
	defaultCommentText: G_Text;
	editButton: R_Button;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
export type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: EG_GetNotificationMenuRequest;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: T_SE_Signal<M_GetUnseenNotificationCount,T_Signal<"GET_UNSEEN_NOTIFICATION_COUNT">>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};
export type D_RichSection={
	content: G_RichSection;
	trackingParams: string;
	fullBleed: false;
};
export type D_RichShelf={
	icon?: T_Icon<"YOUTUBE_SHORTS_BRAND_24">;
	title: G_Text;
	contents: R_RichItem[];
	trackingParams: string;
	menu: R_Menu;
	showMoreButton: R_Button;
	rowIndex: 2|4;
};
export type D_InlineSurvey={
	dismissalEndpoint: {};
	title: G_Text;
	subtitle: G_Text;
	inlineContent: R_CompactVideo;
	response: R_ExpandableSurveyResponse;
	trackingParams: string;
	dismissalText: G_Text;
	impressionEndpoints: {}[];
};
export type D_SourcePivotHeader={
	headerInformation: R_ProfilePageHeaderInformationViewModel;
	buttonRow: R_ProfilePageHeaderButtonRowViewModel;
	trackingParams: string;
};
export type D_CompactVideo=
	|{
		videoId: string;
		thumbnail: D_Thumbnail;
		title: G_Text;
		longBylineText: G_Text;
		publishedTimeText: G_Text;
		viewCountText: G_Text;
		lengthText: G_Text;
		navigationEndpoint: E_VE37414_ReelWatch;
		shortBylineText: G_Text;
		badges: RMD_Badge[];
		channelThumbnail: D_Thumbnail;
		trackingParams: string;
		shortViewCountText: G_Text;
		menu: R_Menu;
		thumbnailOverlays: R_ThumbnailOverlayTimeStatus[];
		accessibility: TD_Accessibility<string>;
		richThumbnail: R_MovingThumbnail;
	}
	|{
		videoId: string;
		thumbnail: D_Thumbnail;
		title: G_Text;
		longBylineText: G_Text;
		publishedTimeText: G_Text;
		viewCountText: G_Text;
		lengthText: G_Text;
		navigationEndpoint: E_Watch;
		shortBylineText: G_Text;
		channelThumbnail: D_Thumbnail;
		ownerBadges: RMD_Badge[];
		trackingParams: string;
		shortViewCountText: G_Text;
		menu: R_Menu;
		thumbnailOverlays: G_ThumbnailOverlayItem[];
		accessibility: D_Accessibility;
		richThumbnail?: R_MovingThumbnail;
		badges?: RMD_Badge[];
	}|{
		videoId: string;
		thumbnail: D_Thumbnail;
		title: G_Text;
		longBylineText: G_Text;
		viewCountText: G_Text;
		navigationEndpoint: E_Watch;
		shortBylineText: G_Text;
		badges: RMD_Badge[];
		channelThumbnail: D_Thumbnail;
		ownerBadges: RMD_Badge[];
		trackingParams: string;
		shortViewCountText: G_Text;
		menu: R_Menu;
		thumbnailOverlays: R_ThumbnailOverlayToggleButton[];
		accessibility: D_Accessibility;
		richThumbnail: R_MovingThumbnail;
	};
export type D_ExpandableSurveyResponse={
	options: R_RatingSurvey;
	submitButton: R_Button;
	trackingParams: string;
};
export type D_ProfileColumnStatsEntry={label: G_Text; value: G_Text;};
export type D_ProfileColumnStats={items: R_ProfileColumnStatsEntry[];};
export type D_GuideDownloadsEntry={
	alwaysShow: false;
	entryRenderer: R_GuideEntry;
};
export type D_AccountLinkButton={
	providerKey: K_AccountLinkProviderKey;
	unlinkedButton: R_Button;
};
export type D_ActionCompanionAd={
	headline: T_MaybeTemplatedText<string>;
	description: T_MaybeTemplatedText<string>;
	actionButton: R_Button;
	iconImage: D_TrackedThumbnail;
	bannerImage: D_TrackedThumbnail;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: R_AdHoverTextButton;
	adVideoId: string;
	impressionPings: T_BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: D_SerializedAdServingDataEntry;
	associatedCompositePlayerBytesLayoutId?: D_TargetIdUuid;
};
export type D_AlertWithButton={
	type: "INFO";
	text: G_Text;
	dismissButton: R_Button;
};
export type D_RemarketingPing={remarketingPing: `https://www.youtube.com/pagead/viewthroughconversion/${number}/?${string}`;};

export type D_C4TabbedHeader={
	channelId: T_IdTemplate<"UC",D_UserIdStr>;
	title: string;
	navigationEndpoint: E_VE3611;
	avatar: D_Thumbnail;
	banner: D_Thumbnail;
	badges?: RMD_Badge[];
	headerLinks?: R_ChannelHeaderLinks;
	subscribeButton: R_SubscribeButton;
	subscriberCountText: G_Text;
	tvBanner: D_Thumbnail;
	mobileBanner: D_Thumbnail;
	trackingParams: string;
	sponsorButton?: R_Button;
	channelHandleText: G_Text;
	videosCountText: G_Text;
	visitTracking?: D_RemarketingPing;
};
export type D_CardCollection={
	cards: R_Card[];
	headerText: G_Text;
	icon: R_InfoCardIcon;
	closeButton: R_InfoCardIcon;
	trackingParams: string;
	allowTeaserDismiss: boolean;
	logIconVisibilityUpdates: boolean;
};
export type D_ChipCloud={
	chips: R_ChipCloudChip[];
	trackingParams: string;
	horizontalScrollable: false;
	nextButton: R_Button;
	previousButton: R_Button;
};
export type D_ClipCreation={
	trackingParams: string;
	userAvatar: D_Thumbnail;
	titleInput: R_ClipCreationTextInput;
	scrubber: R_ClipCreationScrubber;
	saveButton: R_Button;
	displayName: G_Text;
	publicityLabel: Capitalize<Lowercase<D_PlaylistAddToOption['privacy']>>;
	cancelButton: R_Button;
	adStateOverlay: R_ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${D_PlaylistAddToOption['privacy']}`;
};
export type D_CommentSimplebox={
	submitButton: R_Button;
	cancelButton: R_Button;
	authorThumbnail: D_Thumbnail;
	placeholderText: G_Text;
	trackingParams: string;
	avatarSize: "SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT";
	emojiButton: R_Button;
	emojiPicker?: R_EmojiPicker;
	aadcGuidelinesStateEntityKey: string;
};
export type D_ConfirmDialog={
	title?: G_Text;
	trackingParams: string;
	dialogMessages: G_Text[];
	confirmButton: R_Button;
	cancelButton: R_Button;
	primaryIsCancel: boolean;
};
export type D_ConnectedApp={
	icon: {};
	title: {};
	text: {};
	connectButton: R_Button;
};
export type D_CopyLink={
	copyButton: R_Button;
	shortUrl: string;
	trackingParams: string;
	style: "COPY_LINK_RENDERER_STYLE_SETTINGS";
};
export type D_DecoratedPlayerBar={playerBar: R_MultiMarkersPlayerBar;}|{
	playerBar: R_MultiMarkersPlayerBar;
	playerBarActionButton: R_Button;
};
export type D_DesktopTopbar={
	logo: R_TopbarLogo;
	searchbox: R_FusionSearchbox;
	trackingParams: string;
	countryCode: D_CountryCode;
	topbarButtons: G_TopbarButtonItem[];
	hotkeyDialog: R_HotkeyDialog;
	backButton: R_Button;
	forwardButton: R_Button;
	a11ySkipNavigationButton: R_Button;
	voiceSearchButton: R_Button;
};
export type D_DisplayAd={
	trackingParams: string;
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: G_Text;
	image: D_TrackedThumbnail;
	bodyText: G_Text;
	secondaryText: G_Text;
	badge: RMD_Badge;
	menu: R_Menu;
	ctaButton: R_Button;
	impressionEndpoints: E_Pinging[];
	clickCommand: E_Url;
	mediaHoverOverlay: R_Button;
	mediaBadge: RMD_Badge;
};
export type D_EngagementPanelTitleHeader={
	title: G_Text;
	contextualInfo?: G_Text;
	informationButton?: R_Button;
	menu?: G_EngagementPanelMenu;
	visibilityButton: R_Button;
	trackingParams: string;
};
export type D_FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: D_Thumbnail;
	trackingParams: string;
	navigationEndpoint: E_VE3611;
	channelName: string;
	subscribeButton: R_SubscribeButton;
};
export type D_FeedFilterChipBar={
	contents: R_ChipCloudChip[];
	trackingParams: string;
	nextButton?: R_Button;
	previousButton?: R_Button;
	styleType: D_ChannelPageGridStyleType;
};
export type D_FusionSearchbox={
	icon: T_Icon<"SEARCH">;
	placeholderText: G_Text;
	config: R_WebSearchboxConfig;
	trackingParams: string;
	searchEndpoint: E_Search;
	clearButton: R_Button;
};
export type D_ChannelOptions={
	avatar: D_Thumbnail;
	avatarEndpoint: {};
	name: string;
	links: G_Text[];
	avatarAccessibility: D_Accessibility;
};
export type D_ChannelThumbnailWithLink={
	thumbnail: D_Thumbnail;
	navigationEndpoint: E_VE3611;
	accessibility: D_Accessibility;
	title: string;
}|{
	thumbnail: D_Thumbnail;
	navigationEndpoint: E_VE3611;
	accessibility: D_Accessibility;
};
export type D_CheckboxSurveyOption={
	responseText: G_Text;
	responseEndpoint: {};
	value: T_Split<"ANSWER_FOLLOWUP_DISAPPOINTING,ANSWER_FOLLOWUP_MEDIOCRE,ANSWER_FOLLOWUP_IRRELEVANT,ANSWER_FOLLOWUP_DIFFERENT,ANSWER_FOLLOWUP_OTHER,ANSWER_FOLLOWUP_RELAXING,ANSWER_FOLLOWUP_USEFUL,ANSWER_REASON_INFORMATIVE,ANSWER_FOLLOWUP_HELPS_FOCUS,ANSWER_FOLLOWUP_ENTERTAINING,ANSWER_FOLLOWUP_NOVEL,ANSWER_FOLLOWUP_INSPIRING,ANSWER_FOLLOWUP_CALMING,ANSWER_FOLLOWUP_ENJOYABLE,ANSWER_FOLLOWUP_LIFE_CHANGING,ANSWER_FOLLOWUP_HEARTWARMING">[number];
	trackingParams: string;
};
export type D_ChildVideo={
	title: G_Text;
	navigationEndpoint: E_Watch;
	lengthText: G_Text;
	videoId: string;
};
export type D_ChildVideo_Omit={
	title: G_Text;
	navigationEndpoint: E_Watch;
	lengthText: G_Text;
	videoId: string;
};
export type D_ThumbnailOverlay_Omit_Keys=[
	"thumbnailOverlays",
	"trackingParams",
	"shortViewCountText",
	"menu",
	"title",
	"videoId",
	"navigationEndpoint",
	"thumbnail",
	"longBylineText",
	"viewCountText",
	"shortBylineText",
][number];
export type D_Video_Omit_Keys=D_ThumbnailOverlay_Omit_Keys|[
	"ownerText",
	"showActionMenu",
	"channelThumbnailSupportedRenderers",
	"inlinePlaybackEndpoint",
][number];
export type D_Video_Omit_Owner_Keys=D_ThumbnailOverlay_Omit_Keys|"owner";
export type D_ChipCloudChip_tid={
	style: T_StyleType<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
}|{
	navigationEndpoint: C_Continuation|C_RelatedChip;
	targetId: "feed_filter_chip_bar_second_chip";
};
export type D_ChipCloudChip_Style=[
	"STYLE_DEFAULT",
	"STYLE_HOME_FILTER",
	"STYLE_REFRESH_TO_NOVEL_CHIP",
][number];
export type D_ChipCloudChip_navigationEndpoint=C_Continuation|C_RelatedChip|E_Feedback;
export type D_ChipCloudChip=
	|{
		text: G_Text;
		navigationEndpoint: D_ChipCloudChip_navigationEndpoint;
		trackingParams: string;
	}
	|{
		text: G_Text;
		navigationEndpoint: C_Continuation;
		trackingParams: string;
		isSelected: false;
	}
	|{
		style: T_StyleType<"STYLE_DEFAULT">;
		text: G_Text;
		navigationEndpoint: C_Continuation;
		trackingParams: string;
		isSelected: false;
	}
	|{
		style: T_StyleType<"STYLE_DEFAULT">;
		text: G_Text;
		navigationEndpoint: C_RelatedChip;
		trackingParams: string;
		isSelected: true;
	}|{
		style: T_StyleType<"STYLE_REFRESH_TO_NOVEL_CHIP">;
		text: G_Text;
		navigationEndpoint: C_Continuation;
		trackingParams: string;
		uniqueId: "ATTRIBUTE_FILTER_TYPE_EXPLORE";
	}
	|{
		style: T_StyleType<D_ChipCloudChip_Style>;
		text: G_Text;
		navigationEndpoint: C_Continuation;
		trackingParams: string;
	}|{
		style: T_StyleType<D_ChipCloudChip_Style>;
		text: G_Text;
		trackingParams: string;
		isSelected: true;
	}|{
		style: T_StyleType<D_ChipCloudChip_Style>;
		text: G_Text;
		navigationEndpoint: C_Continuation;
		trackingParams: string;
		targetId: "feed_filter_chip_bar_second_chip";
	};
export type EG_CompactLink_1=E_Upload|E_SignalNavigation;
export type D_CompactPlaylist={
	playlistId: T_IdTemplate<"PL">;
	thumbnail: D_Thumbnail;
	title: G_Text;
	shortBylineText: G_Text;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	publishedTimeText?: G_Text;
	videoCountShortText: G_Text;
	trackingParams: string;
	sidebarThumbnails: D_Thumbnail[];
	thumbnailText: G_Text;
	ownerBadges?: RMD_Badge[];
	menu: R_Menu;
	shareUrl: `https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`;
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	longBylineText: G_Text;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
export type D_ContinuationItem={
	trigger?: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint?: C_Continuation;
	ghostCards?: R_GhostGrid;
	button?: R_Button;
};
export type D_AutoplaySetItem_ButtonVideoEP=E_Watch|E_WatchPlaylist;
export type D_AutoplaySetItem_NormalOpt={
	mode: "NORMAL";
	autoplayVideo: E_Watch;
	nextButtonVideo: E_Watch;
	previousButtonVideo?: E_Watch;
};
export type D_AutoplaySetItem={
	mode: "NORMAL";
	autoplayVideo: E_Watch;
	nextButtonVideo?: E_Watch;
	previousButtonVideo?: E_Watch;
}|{
	mode: "LOOP";
	autoplayVideo: E_Watch;
	nextButtonVideo: E_Watch;
	previousButtonVideo: E_Watch|E_WatchPlaylist;
}|{
	mode: "SHUFFLE";
	autoplayVideo: E_Watch;
	nextButtonVideo: E_Watch;
};
export type D_EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: G_Text;
	thumbnail: D_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};
export type D_EndScreenVideo={
	videoId: string;
	thumbnail: D_Thumbnail;
	title: G_Text;
	shortBylineText: G_Text;
	lengthText?: G_Text;
	lengthInSeconds?: number;
	navigationEndpoint: E_Watch|E_VE37414_ReelWatch;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
export type D_HeroPlaylistThumbnail={
	thumbnail: D_Thumbnail;
	maxRatio: 0.5625;
	trackingParams: string;
	onTap: E_Watch;
	thumbnailOverlays: G_ThumbnailOverlayItem;
};
export type D_MacroMarkersListItem={
	title: G_Text;
	timeDescription: G_Text;
	thumbnail: D_Thumbnail;
	onTap: E_Watch;
	trackingParams: string;
	shareButton: R_Button;
	repeatButton?: R_ToggleButton;
	macroMarkerRepeatStateEntityKey: string;
	endRepeatCommand?: C_CommandExecutor;
	playerStateEntityKey: string;
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
	lightColorPalette?: D_LightColorPalette;
	darkColorPalette?: D_DarkColorPalette;
	timeDescriptionA11yLabel: `${number} seconds`;
}|{
	title: G_Text;
	timeDescription: G_Text;
	thumbnail: D_Thumbnail;
	onTap: E_Watch;
	trackingParams: string;
	layout: "MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL";
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
};
export type D_Notification={
	thumbnail: D_Thumbnail;
	videoThumbnail: D_Thumbnail;
	shortMessage: G_Text;
	sentTimeText: G_Text;
	navigationEndpoint: E_Watch;
	read: boolean;
	recordClickEndpoint: E_RecordNotificationInteractions;
	contextualMenu: R_Menu;
	trackingParams: string;
	notificationId: `${number}`;
};
export type D_DarkColorPalette_2={
	primaryTitleColor: 4294961637;
	secondaryTitleColor: 4291602851;
	section2Color: 4063436571;
	section4Color: 4061728525;
};
export type D_DarkColorPalette_3={
	primaryTitleColor: 4294963429;
	secondaryTitleColor: 4291605667;
	section2Color: 4063436046;
	section4Color: 4061728263;
};
export type D_DarkColorPalette_4={
	primaryTitleColor: 4294964965;
	secondaryTitleColor: 4291608227;
	section2Color: 4062716698;
	section4Color: 4060875528;
}|{
	primaryTitleColor: 0xffe5f5ff;
	secondaryTitleColor: 0xffa3bccc;
	section2Color: 0xf2112633;
	section4Color: 0xf2081319;
}|{
	primaryTitleColor: number;
	secondaryTitleColor: number;
	section2Color: number;
	section4Color: number;
};
export type D_LightColorPalette_2={
	primaryTitleColor: 4279833104;
	secondaryTitleColor: 4286207567;
	section2Color: 4076401393;
	section4Color: 4075544541;
};
export type D_LightColorPalette_3={
	primaryTitleColor: 4279833616;
	secondaryTitleColor: 4285881676;
	section2Color: 4076401905;
	section4Color: 4075545565;
};
export type D_LightColorPalette_4={
	primaryTitleColor: 4279834128;
	secondaryTitleColor: 4285555272;
	section2Color: 4076402417;
	section4Color: 4075546589;
}|{
	primaryTitleColor: 0xff101619;
	secondaryTitleColor: 0xff4c6675;
	section2Color: 0xf2f1f5f8;
	section4Color: 0xf2dde6eb;
}|{
	primaryTitleColor: number;
	secondaryTitleColor: number;
	section2Color: number;
	section4Color: number;
};
export type D_PlaylistPanelVideo_Base={
	title: G_Text;
	longBylineText: G_Text;
	thumbnail: D_Thumbnail;
	lengthText: G_Text;
	selected: boolean;
	navigationEndpoint: E_Watch;
	videoId: string;
	shortBylineText: G_Text;
	trackingParams: string;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	playlistSetVideoId: string;
	lightColorPalette: D_LightColorPalette;
	darkColorPalette: D_DarkColorPalette;
};
export type D_PlaylistPanelVideo=
	|never
	|D_PlaylistPanelVideo_Base
	|(D_PlaylistPanelVideo_Base&{indexText: G_Text;})
	;
;
export type D_Radio={
	playlistId: `RD${string}`;
	title: G_Text;
	thumbnail: D_Thumbnail;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
	videos: R_ChildVideo[];
	thumbnailText: G_Text;
	longBylineText: G_Text;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	videoCountShortText: G_Text;
};
export type G_TextRun_Endpoint=E_Url|GE_Browse|E_Watch|E_VE37414_ReelWatch;
export type D_WebPrefetch={navigationEndpoints: E_Watch[];};
export type D_Video={
	videoId: string;
	thumbnail: D_Thumbnail;
	title: G_Text;
	descriptionSnippet?: G_Text;
	longBylineText?: G_Text;
	publishedTimeText?: G_Text;
	lengthText?: G_Text;
	viewCountText?: G_Text;
	navigationEndpoint: E_Watch;
	ownerBadges?: RMD_Badge[];
	badges?: RMD_Badge[];
	ownerText?: G_Text;
	upcomingEventData?: D_UpcomingEvent;
	shortBylineText?: G_Text;
	trackingParams: string;
	showActionMenu: false;
	shortViewCountText?: G_Text;
	isWatched?: true;
	menu: R_Menu;
	channelThumbnailSupportedRenderers?: R_ChannelThumbnailWithLink;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	topStandaloneBadge?: RMD_Badge;
	richThumbnail?: R_MovingThumbnail;
	inlinePlaybackEndpoint?: E_Watch;
	owner?: D_Video_Owner;
	buttons?: R_ToggleButton[];
};
export type D_Video_inlinePlaybackEndpoint=D_Video['inlinePlaybackEndpoint']&{};
export type D_SubFeedOption={
	name: G_Text;
	isSelected: boolean;
	navigationEndpoint: E_Watch|GE_Browse;
	trackingParams: string;
};
export type D_BrowseEndpointContextMusicConfig={pageType: T_EnumStr<"MUSIC_PAGE_TYPE","ALBUM"|"ARTIST"|"USER_CHANNEL">;};
export type D_AdSlot={
	adSlotMetadata: DMD_AdSlot;
	fulfillmentContent: R_FulfilledLayout;
	enablePacfLoggingWeb: boolean;
};
export type D_SerializedAdServingDataEntry={serializedAdServingDataEntry: string;};
export type D_PageTopAdLayout={
	adLayoutMetadata: MG_AdLayout_DisplayBillboardImageButtoned;
	renderingContent: R_VideoMastheadAdV3;
};
export type D_Emoji={
	emojiId: "🤣";
	shortcuts: [":rolling_on_the_floor_laughing:"];
	searchTerms: ["rolling"];
	image: D_Thumbnail;
}|{
	emojiId: "☹";
	shortcuts: [":frowning_face:"];
	searchTerms: ["frowning"];
	image: {
		thumbnails: {
			url: "https://www.youtube.com/s/gaming/emoji/7ff574f2/emoji_u2639.png";
			width: 24;
			height: 24;
		}[];
		accessibility: TD_Accessibility<"☹">;
	};
};
export type D_VE3611_TextRun=|{
	text: string;
	navigationEndpoint: E_VE3611;
}|{
	text: string;
	navigationEndpoint: E_Search;
	loggingDirectives: D_LoggingDirectives;
}|{
	text: "https://teespring.com/stores/numberphile";
	navigationEndpoint: E_Url;
	loggingDirectives: D_LoggingDirectives;
}|{
	text: `@${string}`;
	navigationEndpoint: E_VE3611;
	loggingDirectives: D_LoggingDirectives;
};
export type D_VE5754_TextRun={
	text: "Watch Later";
	navigationEndpoint: E_VE5754;
}|{
	text: "Language hacking (Jakt)";
	navigationEndpoint: E_VE5754;
	loggingDirectives: D_LoggingDirectives;
};
export type D_VE6827_TextRun={
	text: "Original sound";
	navigationEndpoint: E_VE6827;
}|{
	text: "#shorts";
	navigationEndpoint: E_VE6827;
	loggingDirectives: D_LoggingDirectives;
}|{
	text: "#lockpicking";
	bold: true;
	navigationEndpoint: E_VE6827;
	loggingDirectives: D_LoggingDirectives;
};
export type D_VE11487_TextRun={
	text: "Get YouTube Premium";
	navigationEndpoint: E_VE11487;
};
export type D_VE83769_TextRun={
	text: "https://www.deviantart.com/zianu/art/...";
	navigationEndpoint: E_Url;
};
export type D_VE_TextRun=
	|D_VE3611_TextRun
	|D_VE5754_TextRun
	|D_VE6827_TextRun
	|D_VE11487_TextRun
	|D_VE83769_TextRun
	;
;
export type D_TextRun_NavEP_1=E_VE37414_ReelWatch|E_Watch|E_VE3611|E_VE5754|E_VE6827|E_VE11487|E_Url;
export type D_TextRun=|{
	text: "☹";
	loggingDirectives: D_LoggingDirectives;
	emoji: D_Emoji;
}|D_VE_TextRun|{text: string;}|{
	text: string;
	strikethrough: true;
}|{
	text: string;
	italics: true;
}|{
	text: "https://www.youtube.com/shorts/noUaYO...";
	navigationEndpoint: E_VE37414_ReelWatch;
}|{
	text: "https://youtu.be/XdnRkI5EM-k";
	navigationEndpoint: E_Watch;
}|{
	text: string;
	bold: boolean;
}|{
	text: string;
	emoji: D_Emoji;
};
export type D_PlaylistPanel={
	title: "YouTube Mix";
	contents: G_PlaylistPanel_Item[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: G_Text;
	isInfinite: true;
	continuations?: CD_NextRadio[];
	shortBylineText: G_Text;
	longBylineText?: G_Text;
	trackingParams: string;
	titleText: G_Text;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};
export type D_Omit_Menu_Video={
	thumbnail: D_Thumbnail;
	longBylineText: G_Text;
	viewCountText: G_Text;
	navigationEndpoint: E_Watch;
	shortBylineText: G_Text;
	menu: R_Menu;
};
export type D_Omit_Menu_Radio={
	navigationEndpoint: E_Watch;
	menu: R_Menu;
};
export type D_Omit_Menu_Video_Ex={ownerBadges: RMD_Badge[];};
export type D_Channel_MD={
	title: string;
	description: string;
	rssUrl: string;
	externalId: T_IdTemplate<"UC",D_UserIdStr>;
	keywords: string;
	ownerUrls: [`http://www.youtube.com/@${string}`];
	avatar: D_Thumbnail;
	channelUrl: string;
	isFamilySafe: true;
	facebookProfileId?: string;
	availableCountryCodes: string[];
	androidDeepLink: string;
	androidAppindexingLink: string;
	iosAppindexingLink: string;
	vanityChannelUrl: `http://www.youtube.com/@${string}`;
	channelConversionUrl?: `https://www.youtube.com/pagead/viewthroughconversion/962985656/?${string}`;
};
export type D_Chapter={
	title: G_Text;
	timeRangeStartMillis: 0;
	onActiveCommand: A_SetActivePanelItem;
	thumbnail: D_Thumbnail;
};
export type D_CommentsEntryPointTeaser={
	teaserAvatar: D_Thumbnail&{accessibility: D_Accessibility;};
	teaserContent: G_Text;
	trackingParams: string;
};
export type D_GuideEntry_PresentationNewContent={
	navigationEndpoint: E_VE3611;
	thumbnail: D_Thumbnail;
	badges: D_LiveBroadcastingBadge;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT";
};
export type D_GuideEntry_PresentationNone={
	navigationEndpoint: E_VE3611;
	thumbnail: D_Thumbnail;
	badges: D_LiveBroadcastingBadge;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
};
export type D_LiveChatTextMessage={
	message: G_Text;
	authorName: G_Text;
	authorPhoto: D_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: T_IdTemplate<"UC",D_UserIdStr>;
	contextMenuAccessibility: D_Accessibility;
	timestampText: G_Text;
};
export type D_MerchandiseItem={
	title: string;
	description: string;
	thumbnail: D_Thumbnail;
	price: `CA$${string}`;
	vendorName: string;
	trackingParams: string;
	buttonText: string;
	buttonCommand: E_Url;
	accessibilityTitle: string;
	buttonAccessibilityText: string;
	fromVendorText: string;
	additionalFeesText: string;
	regionFormat: "REGIONAL_FORMAT_EU";
	showOpenInNewIcon?: true;
};
//#region D_GuideEntry
export type D_GuideEntry_HelpService={
	icon: T_Icon<"HELP">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: E_SignalService_SendPost;
};
export type D_GuideEntry_MyVideosTab={
	navigationEndpoint: E_Url;
	icon: T_Icon<"MY_VIDEOS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
export type D_GuideEntry_OfflineDownloadEntry={
	navigationEndpoint: E_VE42352;
	icon: T_Icon<"OFFLINE_DOWNLOAD">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Downloads">;
	targetId: "downloads-guide-item";
	isPrimary: true;
};
export type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<M_Empty_WCM,{}>|E_VE37414_ReelWatch;
	isPrimary: true;
};
export type D_GuideEntry_Subscriptions={
	navigationEndpoint: E_VE96368;
	icon: T_Icon<"SUBSCRIPTIONS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Subscriptions">;
	isPrimary: true;
};
export type D_GuideEntry_VideoLibrary={
	navigationEndpoint: E_VE6827;
	icon: T_Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Library">;
	targetId: "library-guide-item";
	isPrimary: true;
};
export type D_GuideEntry_WatchHistory={
	navigationEndpoint: E_VE6827;
	icon: T_Icon<"WATCH_HISTORY">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"History">;
};
export type D_GuideEntry_WatchLater={
	navigationEndpoint: E_VE5754;
	icon: T_Icon<"WATCH_LATER">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Watch Later">;
};
export type D_GuideEntry_WhatToWatch={
	navigationEndpoint: E_VE3854;
	icon: T_Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Home">;
	isPrimary: true;
};
export type D_GuideEntry=
	|never
	|{
		navigationEndpoint: E_VE3611;
		thumbnail: D_Thumbnail;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Vsauce2">;
		entryData: R_GuideEntryData;
	}
	|{
		icon: T_Icon<"FEEDBACK">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Send feedback">;
		serviceEndpoint: E_SignalService_SendPost;
	}
	|{
		icon: T_Icon<"EXPAND">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Show more">;
	}
	|D_GuideEntry_HelpService
	|D_GuideEntry_MyVideosTab
	|D_GuideEntry_OfflineDownloadEntry
	|D_GuideEntry_PresentationNewContent
	|D_GuideEntry_PresentationNone
	|D_GuideEntry_ShortsTab
	|D_GuideEntry_Subscriptions
	|D_GuideEntry_VideoLibrary
	|D_GuideEntry_WatchHistory
	|D_GuideEntry_WatchLater
	|D_GuideEntry_WhatToWatch
	|{
		navigationEndpoint: E_VE5754;
		icon: T_Icon<"LIKES_PLAYLIST">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Liked videos">;
		entryData: R_GuideEntryData;
	}
	|{
		navigationEndpoint: E_VE5754;
		icon: T_Icon<"PLAYLISTS">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<string>;
		entryData: R_GuideEntryData;
	}
	|TD_GuideEntry_Simple<"ADD_CIRCLE">
	|TD_GuideEntry_Simple<"CLAPPERBOARD">
	|TD_GuideEntry_Simple<"COURSE">
	|TD_GuideEntry_Simple<"CREATOR_STUDIO_RED_LOGO">
	|TD_GuideEntry_Simple<"FASHION_LOGO">
	|TD_GuideEntry_Simple<"FLAG">
	|TD_GuideEntry_Simple<"GAMING_LOGO">
	|{
		navigationEndpoint: E_VE3611;
		icon: T_Icon<"LIVE">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Live">;
	}
	|{
		navigationEndpoint: E_VE3611;
		icon: T_Icon<"MUSIC">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Music">;
	}
	|TD_GuideEntry_Simple<"NEWS">
	|{
		navigationEndpoint: E_VE23462;
		icon: T_Icon<"SETTINGS">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"Settings">;
	}
	|TD_GuideEntry_Simple<"TRENDING">
	|TD_GuideEntry_Simple<"TROPHY">
	|TD_GuideEntry_Simple<"UNPLUGGED_LOGO">
	|TD_GuideEntry_Simple<"YOUTUBE_KIDS_ROUND">
	|TD_GuideEntry_Simple<"YOUTUBE_MUSIC">
	|{
		navigationEndpoint: E_VE11487;
		icon: T_Icon<"YOUTUBE_ROUND">;
		trackingParams: string;
		formattedTitle: G_Text;
		accessibility: TD_Accessibility<"YouTube Premium">;
	}
	;
;
//#endregion
export type D_GuideEntryData={guideEntryId: DU_GuideEntry_Id;};
// COMPLETED: #13
export type D_FeedNudge={
	lightIconImage: D_Thumbnail;
	title: G_Text;
	subtitle: G_Text;
	dismissButton: R_Button;
	impressionEndpoint: E_Feedback;
	trackingParams: string;
	style: "FEED_NUDGE_STYLE_CHIP";
	contents: R_ChipCloudChip[];
};
export type D_YoutubeUrl=DE_U_InternalUrl["url"]|DE_U_ChannelUrl["url"];
//#region imported
export type D_AboutThisAd={
	url: D_UrlWrappedValue;
	trackingParams: string;
};
export type D_Accessibility={accessibilityData: D_Label;};
export type D_AccountItemSection=Record<"contents",G_AccountItemSection[]>;
export type D_AccountSettingIdList=[407];
export type D_AdHoverTextButton={
	button: R_Button;
	hoverText: G_Text;
	trackingParams: string;
};
export type D_AdLayout={serializedAdServingDataEntry: string;};
export type D_AdPlacement={
	config: R_AdPlacementConfig;
	renderer: G_AdPlacementRendererItem;
	adSlotLoggingData?: D_SerializedSlotAdServingDataEntry;
};
export type D_AdPlacementConfig={
	kind: DE_AdPlacementKind;
	adTimeOffset?: D_AdTimeOffset;
	hideCueRangeMarker: true;
};
export type D_AdTimeOffset={
	offsetStartMilliseconds: `${number}`;
	offsetEndMilliseconds: "-1"|`${number}`;
};
export type QualArr=[
	...make_qual_for_fps<50>,
	...make_qual_for_fps<60>,
	"1080p","720p","480p","360p","240p","144p",
];
export type make_qual_for_fps<T extends 50|60>=[`2160p${T}`,`1440p${T}`,`1080p${T}`,`720p${T}`,];
export type D_QualityLabel=QualArr[number];
export type D_AddToPlaylist={playlists: R_PlaylistAddToOption[];}&T_Actions<R_AddToPlaylistCreate>;
export type D_AnimationConfig={
	minImageUpdateIntervalMs: 10000|5000;
	crossfadeDurationMs: 5000;
	crossfadeStartOffset: 1;
	maxFrameRate: 30;
};
export type D_AnySaved={[U in DU_UrlTypeWithPageType]?: GD_SD_Item;};
export type ApiFormatObj=[
	["youtubei",[["v1",[
	]]]]
];
export type ApiNotificationLast=
	|"get_unseen_count"
	|"get_notification_menu"
	|"record_interactions"
	|"modify_channel_preference"
	;
;
export type DG_ApiUrl=T_Split<T_SplitOnce<D_ApiPathFormat_1,"/">[1],"/">;
export type D_ApiPathFormat_1=
	|"/getAccountSwitcherEndpoint"
	|"/getDatasyncIdsEndpoint"
	|"/youtubei/v1/backstage/create_post"
	|"/youtubei/v1/browse/edit_playlist"
	|"/youtubei/v1/flag/get_form"
	|"/youtubei/v1/notification/opt_out"
	|`/youtubei/v1/ypc/${"get_cart"|"get_offers"}`
	|`/youtubei/v1/${"browse"|"guide"|"next"|"player"}`
	|`/youtubei/v1/account/${"account_menu"|"accounts_list"|"set_setting"}`
	|`/youtubei/v1/att/${"get"|"log"}`
	|`/youtubei/v1/comment/create_comment`
	|`/youtubei/v1/feedback`
	|`/youtubei/v1/get_survey`
	|`/youtubei/v1/get_transcript`
	|`/youtubei/v1/like/${"like"|"dislike"|"removelike"}`
	|`/youtubei/v1/live_chat/${"get_live_chat_replay"|"get_live_chat"}`
	|`/youtubei/v1/music/get_search_suggestions`
	|`/youtubei/v1/notification/${ApiNotificationLast}`
	|`/youtubei/v1/pdg/get_pdg_buy_flow`
	|`/youtubei/v1/playlist/${"get_add_to_playlist"|"create"}`
	|`/youtubei/v1/reel/${"reel_item_watch"|"reel_watch_sequence"}`
	|`/youtubei/v1/search`
	|`/youtubei/v1/share/get_share_panel`
	|`/youtubei/v1/subscription/${"subscribe"|"unsubscribe"}`
	|`/youtubei/v1/updated_metadata`
	|`/s/i/youtube_outline/bars_3/v2/24px.svg`
	;
;
export type D_AttBgChallenge={
	interpreterUrl?: T_UrlWrappedValue<`//www.google.com/js/th/${string}.js`>;
	interpreterHash: string;
	program: string;
	globalName: "trayride";
};
export type D_AudioSampleRate=22050|44100|48000;
export type D_AudioTrackItem={
	captionTrackIndices: number[];
}|{
	captionTrackIndices: number[];
	defaultCaptionTrackIndex: number;
	visibility: "UNKNOWN"|"ON";
	hasDefaultTrack: true;
	captionsInitialState: "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED"|"CAPTIONS_INITIAL_STATE_ON_REQUIRED";
};
export type D_AutoplaySwitchButton={
	onEnabledCommand: T_Setting_AutoNavForDesktop<true>;
	onDisabledCommand: T_Setting_AutoNavForDesktop<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};
export type D_Botguard={
	program: string;
	interpreterSafeUrl: T_UrlWrappedValue<`//www.google.com/js/th/${string}.js`>;
	serverEnvironment: number;
};
export type D_BrowseEndpointPages=[
	"comment_shorts_web_top_level",
	"explore",
	"guide_builder",
	"hashtag",
	"history",
	"library",
	"music_charts",
	"music_explore",
	"music_home",
	"music_library_corpus_artists",
	"music_library_corpus_track_artists",
	"music_library_landing",
	"music_liked_albums",
	"music_liked_playlists",
	"music_liked_videos",
	"music_moods_and_genres_category",
	"music_moods_and_genres",
	"music_new_releases",
	"storefront",
	"subscriptions",
	"trending",
	"what_to_watch",
][number]
	;
export type D_BrowseFeedActions={contents: G_BrowseFeedContent[];};
export type D_Browse_Id<T>={browseId: T;};
export type D_ButtonStyleType=
	|"STYLE_ALERT_INFO"
	|"STYLE_BLUE_TEXT_WITH_INVERSE_THEME"
	|"STYLE_BLUE_TEXT"
	|"STYLE_CALL_TO_ACTION_FILLED"
	|"STYLE_COMPACT_GRAY"
	|"STYLE_DEFAULT"
	|"STYLE_DESTRUCTIVE"
	|"STYLE_INACTIVE_OUTLINE"
	|"STYLE_LIGHT_TEXT"
	|"STYLE_MONO_FILLED_OVERLAY"
	|"STYLE_MONO_FILLED"
	|"STYLE_MONO_OUTLINE"
	|"STYLE_MONO_TONAL_OVERLAY"
	|"STYLE_MONO_TONAL"
	|"STYLE_OPACITY"
	|"STYLE_OVERLAY"
	|"STYLE_PAYMENT"
	|"STYLE_PRIMARY"
	|"STYLE_SUGGESTED_ACTION"
	|"STYLE_SUGGESTIVE"
	|"STYLE_TEXT"
	|"STYLE_UNKNOWN"
	|"STYLE_VISIBLY_DISABLED"
	|"STYLE_WHITE_WITH_BORDER"
	;
;
export type D_Cache_MD={isCacheHit: true;};
export type D_CanShare={canShare: boolean;};
export type D_CanonicalBaseUrl={canonicalBaseUrl: string;};
export type D_TimedTextApi={
	v: DU_VideoId;
	caps?: "asr";
	exp?: "xpo";
	xoaf: `${5}`;
	xoadf?: string;
	xosf?: `${1}`;
	hl: "en-GB";
	ip: "0.0.0.0";
	ipbits: string;
	expire: `${number}`;
	sparams: "ip,ipbits,expire,v,caps,xoaf";
	signature: `${string}.${string}`;
	key: "yt8";
	kind?: "asr";
	lang: string;
};
// D_TimedTextApi["signature"]
export type D_TimedTextApi_Req=Required<D_TimedTextApi>;
export type D_CaptionTrackItem={
	baseUrl: GU_CaptionTrackItem_BaseUrl;
	name: G_Text;
	vssId: "a.en"|".en"|".ar";
	languageCode: "en"|"ar";
	rtl?: true,
	kind?: "asr";
	isTranslatable: true;
};
export type D_CarouselLockup={infoRows: R_InfoRow[];};
export type D_ChannelHeaderLinks={
	primaryLinks: D_NavigationLinkItem[];
	secondaryLinks?: D_NavigationLinkItem[];
};
export type ChannelSubUrlFormat=
	|""
	|"/about"
	|"/channels"
	|"/community"
	|"/featured"
	|"/playlists"
	|"/search"
	|"/shorts"
	|"/streams"
	|"/videos"
	|`/search?query=${string}`;
export type D_ChannelSwitcherHeader={
	title: G_Text;
	button: R_Button;
};
export type D_ChannelSwitcherPage=Record<"contents",G_ChannelSwitcherContent[]>&{
	header: R_ChannelSwitcherHeader;
	targetId: "ceq";
};
export type ChannelUrlFormat=[
	`/@${string}`,
][number];
export type D_CinematicConfig={
	lightThemeBackgroundColor: 4278190080;
	darkThemeBackgroundColor: 4278190080;
	animationConfig?: {
		minImageUpdateIntervalMs: 5000;
		crossfadeDurationMs: 5000;
		crossfadeStartOffset: 1;
		maxFrameRate: 30;
	};
	colorSourceSizeMultiplier: 1.4;
	applyClientImageBlur: true;
	bottomColorSourceHeightMultiplier?: 0.67000002;
	maxBottomColorSourceHeight?: 260;
	colorSourceWidthMultiplier?: 1.5;
	colorSourceHeightMultiplier?: 2;
	blurStrength?: 5;
	watchFullscreenConfig?: {};
};
export type D_CinematicContainer={
	backgroundImageConfig?: D_TrackedThumbnail;
	gradientColorConfig: D_GradientColorConfig;
	presentationStyle?: "CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED";
	config: D_CinematicConfig;
};
export type D_ClientForecastingAd={impressionUrls?: T_BaseUrl<`https://www.youtube.com/api/stats/ads?${D_ApiStatsAdsStr}`>[];};
export type D_ClientMessages={
	reconnectMessage: G_Text;
	unableToReconnectMessage: G_Text;
	fatalError: G_Text;
	reconnectedMessage: G_Text;
	genericError: G_Text;
};
export type D_ClipAdState={
	title: G_Text;
	body: G_Text;
};
export type D_ClipCreationScrubber={
	lengthTemplate: "$clip_length seconds";
	maxLengthMs: 60000;
	minLengthMs: 5000;
	defaultLengthMs: 15000;
	windowSizeMs: 120000;
	startAccessibility: D_Accessibility;
	endAccessibility: D_Accessibility;
	durationAccessibility: D_Accessibility;
};
export type D_ClipCreationTextInput={
	placeholderText: G_Text;
	maxCharacterLimit: 140;
};
export type D_ClipSection={contents: R_ClipCreation[];};
export type D_Color={red: number; green: number; blue: number;};
export type ColorSourceVars={
	colorSourceSizeMultiplier: 1.4;
	bottomColorSourceHeightMultiplier: 0.67;
	maxBottomColorSourceHeight: 260;
	colorSourceWidthMultiplier: 1.5;
	colorSourceHeightMultiplier: 2;
};
export type D_CommentReplies={
	contents: R_ContinuationItem[];
	trackingParams: string;
	viewReplies: R_Button;
	hideReplies: R_Button;
	targetId: `comment-replies-item-${string}`;
};

export type R_CommentReplies={commentRepliesRenderer: D_CommentReplies;};
export type D_CommentThread={
	comment: R_Comment;
	replies?: R_CommentReplies;
	trackingParams: string;
	renderingPriority: "RENDERING_PRIORITY_UNKNOWN";
	isModeratedElqComment: false;
	loggingDirectives: D_LoggingDirectives;
};
export type D_CommentsSimplebox={
	simpleboxAvatar: D_Thumbnail;
	simpleboxPlaceholder: G_Text;
	trackingParams: string;
};

export type R_CommentsSimplebox={commentsSimpleboxRenderer: D_CommentsSimplebox;};
export type D_CommentsEntryPointHeader={
	headerText: G_Text;
	onTap: C_CommandExecutor;
	trackingParams: string;
	commentCount?: G_Text;
	contentRenderer: R_CommentsEntryPointTeaser|R_CommentsSimplebox;
	targetId: "comments-entry-point-header-identifier";
};
export type D_CommentsEntryPointHeader_contentRenderer=D_CommentsEntryPointHeader["contentRenderer"];
export type D_CommentsHeader={
	countText?: G_Text;
	createRenderer: R_CommentSimplebox;
	sortMenu?: R_SortFilterSubMenu;
	trackingParams: string;
	titleText?: G_Text;
	commentsCount?: G_Text;
	showSeparator?: true;
	customEmojis?: D_CustomEmoji[];
	unicodeEmojisUrl?: `type://unicodeEmojisUrl.v/${string}`;
	loggingDirectives?: D_LoggingDirectives;
};
export type D_CommentsHeaderContent={
	continuationItems: [
		R_CommentsHeader
	];
};
export type D_CommonConfig={url: GU_InitPlaybackUrl;};
export type D_CompactLinkStyle=[
	`${"COMPACT_LINK_STYLE_TYPE"}_${[
		"SETTINGS_SIDEBAR",
		"ACCOUNT_SWITCHER_FOOTER"
	][number]}`,
	"COMPACT_LINK_STYLE_TYPE_CREATION_MENU",
][number];
export type DS_CreatePlaylist={
	params?: string;
	videoIds: string[];
};
export type D_CustomEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: D_EmojiImage;
	isCustomEmoji: boolean;
	isLocked?: true;
};
export type D_DarkColorPalette={
	primaryTitleColor: number;
	secondaryTitleColor: number;
	section1Color?: number;
	section2Color: number;
	section3Color?: number;
	section4Color: number;
};
export type D_ProtobufWireFormat=[fieldId: number,wireType: number,arr: D_ProtobufObj[]];
export type D_ProtobufObj=
	|[type: "data32",fieldId: number,value: number]
	|[type: "data_fixed32",fieldId: number,value: number]
	|[type: "data64",fieldId: number,as_arr: number[],value: bigint]
	|[type: "data_fixed64",fieldId: number,value: bigint]
	|[type: "info",fieldId: number,value: number]
	|[type: "child",fieldId: number,as_arr: Uint8Array,parsed_value: D_ProtobufObj[]|null]
	|[type: "struct",fieldId: number,arr: D_ProtobufObj[]]
	|[type: "group",fieldId: number,arr: D_ProtobufObj[]]
	|[type: "error",fieldId: number];
export type D_DesktopWatchAds={
	// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
	gutParams?: B_TagObj<"\\4061\\ytpwmpu">;
	playerAdParams: D_PlayerAdParams;
	showCompanion?: true;
	showInstream?: true;
	useGut?: true;
};
export type D_Dropdown_Privacy={
	entries: R_PrivacyDropdownItem[];
	label?: "Privacy";
};
export type D_Dropdown=D_Dropdown_Privacy;
export type D_CanDelete={canDelete: boolean;};
export type D_ElementResourceStatus={
	identifier: "bottom_sheet_list_option.eml|cd39732d53f1132c"|
	"track_selection_sheet_option.eml|f3619d8bb085c9a9";
	status: "ELEMENTS_RESOURCE_STATUS_ATTACHED";
};
export type D_ElementUpdate=R_TemplateUpdate|R_ResourceStatusInResponseCheck;
// [ELEMENT::structured-description-music-section::@::row-state-id]
export type D_Element_StructuredDescription=T_ElementId<
	"structured-description-music-section",T_ElementId<
		[
			"artists",
			"licenses"
		][number],"row-state-id"
	>
>;
export type D_EmojiImage={
	accessibility: D_Accessibility;
	thumbnails: D_ThumbnailItem[];
};
export type D_Endscreen={
	elements: R_EndscreenElement[];
	startMs: `${number}`;
	trackingParams: string;
};
export type D_EngagementSectionPanelId=T_TargetIdStr<"engagement-panel",[
	"clip-create",
	"structured-description"
][number]>|
	"comment-item-section"|
	string&{type: "string";};
export type D_Enum_GuideAction=T_EnumStr<"GUIDE_ACTION","ADD_TO_PLAYLISTS"|
	"ADD_TO_SUBSCRIPTIONS"
>;
export type D_ExpandableTab={
	endpoint: E_VE3611;
	title: "Search";
	selected: false;
}|{
	endpoint: E_VE3611;
	title: "Search";
	selected: false;
	expandedText: "";
}|{
	endpoint: E_VE3611;
	title: "Search";
	selected: true;
	expandedText: string;
	content: R_SectionList;
};
export type D_ExpandableVideoDescriptionBody={
	descriptionBodyText?: G_Text;
	showMoreText?: G_Text;
	showLessText?: G_Text;
	attributedDescriptionBodyText?: D_AttributedDescription;
};
export type D_Factoid={
	value: G_Text;
	label: G_Text;
	accessibilityText: string;
};
export type D_FancyDismissibleDialog={
	dialogMessage: G_Text;
	title?: G_Text;
	confirmLabel: G_Text;
	trackingParams: string;
};
export type D_FeedTabbedHeader={title: G_Text;};
export type D_FeedbackResponseItem=D_FeedbackResponseProcessedStatus;
export type D_DismissalReasonText={
	trackingParams: string;
	text: G_Text;
	feedbackToken: string;
};
export type R_DismissalReasonText={dismissalReasonTextRenderer: D_DismissalReasonText;};
export type E_SubmitFeedback=T_SE_Signal<M_Feedback,DE_SubmitFeedback>;
export type D_DismissalFollowUp={
	trackingParams: string;
	dismissalReasonsPrompt: G_Text;
	reasons: R_DismissalReasonText[];
	cancelButton: R_Button;
	submitButton: R_Button;
	submitFeedbackEndpoint: E_SubmitFeedback;
	dismissalViewStyle: "DISMISSAL_VIEW_STYLE_COMPACT_TALL";
};
export type R_DismissalFollowUp={dismissalFollowUpRenderer: D_DismissalFollowUp;};
export type D_FeedbackResponseProcessedStatus={
	isProcessed: true;
	followUpDialog?: R_DismissalFollowUp;
};
export type D_FormatColorInfo={
	primaries?: "COLOR_PRIMARIES_BT709"|"COLOR_PRIMARIES_BT2020";
	transferCharacteristics: "COLOR_TRANSFER_CHARACTERISTICS_BT709"|"COLOR_TRANSFER_CHARACTERISTICS_ARIB_STD_B67";
	matrixCoefficients?: "COLOR_MATRIX_COEFFICIENTS_BT709"|"COLOR_MATRIX_COEFFICIENTS_BT2020_NCL";
};
export type G_GetAccountMenuItem=MP_LoadingNotificationMenu|MP_LoadingAccountMenu;
export type D_GhostGrid={rows: number;};
export type D_GoogleLoginExternalUrl={url: "https://accounts.google.com/AddSession?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3D%252F&hl=en-GB&passive=false&service=youtube&uilel=0";}["url"];
export type D_GradientColorConfig=[
	{
		darkThemeColor: TP_Color<0x99000000,"0x99000000">;
		startLocation: 0;
	},
	{darkThemeColor: TP_Color<0x7f000000,"0x7f000000">;},
	{
		darkThemeColor: TP_Color<0xff000000,"0xff000000">;
		startLocation: 1;
	}
];
export type D_GradientColorConfigEnd={
	darkThemeColor: TP_Color<0xff000000,"0xff000000">;
	startLocation: 1;
};
export type D_GradientColorConfigItem=D_GradientColorConfigStart|D_GradientColorConfigMid|D_GradientColorConfigEnd;
export type D_GradientColorConfigMid={darkThemeColor: TP_Color<0x7f000000,"0x7f000000">;};
export type D_GradientColorConfigStart={
	darkThemeColor: TP_Color<0x99000000,"0x99000000">;
	startLocation: 0;
};
export type D_GuideCollapsibleEntry={
	expanderItem: R_GuideEntry;
	expandableItems: R_GuideEntry[];
	collapserItem: R_GuideEntry;
};
export type D_GuideCollapsibleSectionEntry={
	headerEntry: R_GuideEntry;
	expanderIcon: T_Icon<"EXPAND">;
	collapserIcon: T_Icon<"COLLAPSE">;
	sectionItems: G_GuideSectionItem[];
	handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS","GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"];
};
export type D_GuideSection={
	items: G_GuideSectionItem[];
	trackingParams: string;
	formattedTitle?: G_Text;
};
export type D_GuideSubscriptionsSection={
	sort: "CHANNEL_ACTIVITY";
	items: G_GuideSubscriptionsSectionItem[];
	trackingParams: string;
	formattedTitle: G_Text;
	handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"];
};
export type D_HasSeparator={hasSeparator: boolean;};
export type D_HeartbeatParams={
	intervalMilliseconds: `${number}`;
	softFailOnError: boolean;
	heartbeatServerData: string;
};
export type D_HeatSeekerItemData={
	trackingParams: string;
	heatmap: R_Heatmap;
};
export type D_Heatmap={
	maxHeightDp: 40;
	minHeightDp: 4;
	showHideAnimationDurationMillis: 200;
	heatMarkers: {heatMarkerRenderer: {};}[];
	heatMarkersDecorations: {timedMarkerDecorationRenderer: {};}[];
};
export type D_HideEnclosingContainer={hideEnclosingContainer: true;};
export type D_Hint={
	hintId: "sponsor-pre-purchase";
	dwellTimeMs: "60000";
	hintCap: D_ImpressionCap;
	trackingParams: string;
};
export type D_HistoryEntryTime={entryTime: number;};
export type VD_PlaceData={
	placeName: string;
	placeCategory: string;
	rating: `${number}`;
	ratingA11yLabel: "${number} stars";
	reviewsCount: `(${number})`;
	reviewsCountA11yLabel: `${number} reviews`;
	thumbnailUrl: `https://lh5.googleusercontent.com/p/${string}=w${number}-h${number}-n-k-no`;
	onTap: C_Innertube;
	trackingParams: string;
	placeCardA11yHint: "open map";
	openLinkUiStyle: "OPEN_LINK_UI_STYLE_UNSPECIFIED";
	cardStyle: "PLACE_CARD_STYLE_TALL";
};
export type VM_PlaceData={placeDataViewModel: VD_PlaceData;};
export type D_HorizontalCardList={
	cards: (R_MacroMarkersListItem|VM_PlaceData)[];
	trackingParams: string;
	header: R_RichListHeader;
	style: T_StyleType<G_CardList_StyleType>|{type: G_CardList_StyleType;};
	centerItems: false;
};
export type D_HotkeyDialog={
	title: G_Text;
	sections: R_HotkeyDialogSection[];
	dismissButton: R_Button;
	trackingParams: string;
};
export type D_HotkeyDialogSection={
	title: G_Text;
	options: R_HotkeyDialogSectionOption[];
};
export type D_HotkeyDialogSectionOption={
	label: G_Text;
	hotkey: string;
}|{
	label: G_Text;
	hotkey: string;
	hotkeyAccessibilityLabel: D_Accessibility;
};
export type D_ImpressionCap={impressionCap: "1";};
export type D_ImpressionCommand={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://www.youtube.com/pagead/adview?${string}`>[];
	pingingEndpoint: B_Hack;
};
export type D_ClickLocationTarget={
	location: "PROMOTED_SPARKLES_CLICK_LOCATION_AD_BADGE";
	code: 31;
	behaviorType: "PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE_OPEN_AD";
};
export type D_EmptyMap={emptyMap: true;};
export type D_ActiveView={
	viewableCommands: E_Pinging[];
	endOfSessionCommands: E_Pinging[];
	regexUriMacroValidator: D_EmptyMap;
};

export type D_PromotedSparklesWeb={
	thumbnail: D_Thumbnail;
	icon: T_Icon<"EXTERNAL_LINK">;
	title: G_Text;
	description: G_Text;
	websiteText: G_Text;
	actionButton: R_Button;
	navigationEndpoint: E_Url;
	impressionCommands: D_ImpressionCommand[];
	noopTapEndpoints?: E_Pinging[];
	menu: R_Menu;
	activeView?: D_ActiveView;
	trackingParams: string;
	clickLocationTargets: D_ClickLocationTarget[];
	adBadge?: RMD_Badge;
};
export type D_InFeedAdLayout={adLayoutMetadata: MG_AdLayout; renderingContent: R_PromotedSparklesWeb|R_DisplayAd;};
export type D_LinearAdSequence={adLayoutMetadata: MG_AdLayout; linearAds: G_LinearAdsItem[];};
export type D_AdSlotAndLayoutItem={adLayoutMetadata: MG_AdLayout[]; adSlotMetadata: DMD_AdSlot;};
export type D_InfoRow={
	title: G_Text;
	defaultMetadata?: G_Text;
	expandedMetadata?: G_Text;
	expandIcon?: T_Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: D_Element_StructuredDescription;
};
export type D_InvalidationId={
	objectSource: number;
	objectId: string;
	topic: `chat~${string}~${number}`;
	subscribeToGcmTopics: boolean;
	protoCreationTimestampMs: `${number}`;
};
export type D_ItemSectionHeader={
	title: G_Text;
	subtitle: G_Text;
};
export type D_Label={label: string;};
export type D_Letters=T_Split<"abcdefghijklmnopqrstuvwxyz","">[number];
export type D_LikeApi={videoId: string;}|D_PlaylistId;
export type D_LiveBroadcastDetails={
	isLiveNow: true;
	startTimestamp: string;
}|{
	isLiveNow: false;
	startTimestamp: string;
	endTimestamp: string;
};
export type D_LiveBroadcastingBadge={liveBroadcasting: boolean;};
export type D_LiveChatAuthorBadge={
	icon: T_Icon<"MODERATOR">;
	tooltip: string;
	accessibility: D_Accessibility;
};
export type D_LiveChatEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: D_EmojiImage;
	isCustomEmoji: boolean;
	isLocked: boolean;
};
export type D_LiveChatPlaceholderItem={
	id: string;
	timestampUsec: `${number}`;
};
export type D_LiveChatViewerEngagementMessage={
	id: string;
	timestampUsec: `${number}`;
	icon: T_Icon<"YOUTUBE_ROUND">;
	message: G_Text;
	actionButton: R_Button;
	trackingParams: string;
};
export type D_LoggingUrl={baseUrl: string;};
export type D_MP_MenuStyle={style: DE_MP_MenuStyle;};
export type D_MP_Menu_Section={
	notification_menu: R_MultiPageMenuNotificationSection;
	account_section_list: R_AccountSectionList;
	page_menu: TR_MultiPageMenuSection<R_CompactLink>;
};
export type D_MP_Menu_Sections_Items=D_MP_Menu_Section[keyof D_MP_Menu_Section];
export type D_VideoLike_richThumbnail=R_MovingThumbnail;
export type D_MenuServiceIcon={icon: T_Icon<"FLAG">;};
export type D_MenuServiceIconTypeStr=[
	"SUBTITLES",
	"PLAYLIST_ADD",
	"VISIBILITY_OFF",
	"SHARE",
	"ALIGN_LEFT"
][number]|"WATCH_LATER"|"NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE"|(D_MenuServiceIcon['icon']['iconType']);
export type D_MenuServiceItem<T_EI>={
	text: G_Text;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
export type D_MenuServiceItem_Icon<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
export type D_MenuServiceItem_Separated<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
	hasSeparator: true;
};
export type D_MerchandiseShelf={
	title: string;
	items: R_MerchandiseItem[];
	trackingParams: string;
	showText: string;
	hideText: string;
	actionButton: R_Menu;
};
export type D_Microformat={
	urlCanonical: string;
	title: string;
	description: string;
	thumbnail: D_Thumbnail;
	siteName: string;
	appName: string;
	androidPackage: string;
	iosAppStoreId: `${number}`;
	iosAppArguments: string;
	ogType: string;
	urlApplinksWeb: string;
	urlApplinksIos: string;
	urlApplinksAndroid: string;
	urlTwitterIos: string;
	urlTwitterAndroid: string;
	twitterCardType: string;
	twitterSiteHandle: string;
	schemaDotOrgType: string;
	noindex: boolean;
	unlisted: boolean;
	tags?: string[];
	familySafe?: true;
	availableCountries?: string[];
	linkAlternates: B_HrefUrl[];
};
export type D_MicroformatEmbed={
	iframeUrl: `https://www.youtube.com/embed/${string}`;
	flashUrl?: `http://www.youtube.com/v/${string}?version=3&autohide=1`;
	width: number;
	height: number;
	flashSecureUrl?: `https://www.youtube.com/v/${string}?version=3&autohide=1`;
};
export type D_ModifiedSetItem={
	autoplayVideo?: E_WatchPlaylist;
	nextButtonVideo?: E_WatchPlaylist;
	previousButtonVideo?: E_WatchPlaylist;
};
export type D_MovingThumbnail={
	movingThumbnailDetails?: D_Thumbnail|D_MovingThumbnail_Thumbnails;
	enableHoveredLogging: true;
	enableOverlay: true;
};
export type D_MovingThumbnailDetails={
	thumbnails: D_ThumbnailItem[];
	logAsMovingThumbnail: boolean;
};
export type D_MovingThumbnail_Thumbnails={
	thumbnails: {
		url: string;
		width: 320;
		height: 180;
	}[];
	logAsMovingThumbnail: true;
};
export type TG_Key<T>={key: T;};
export type D_MultiMarkersPlayerBar={
	visibleOnLoad: TG_Key<"DESCRIPTION_CHAPTERS"|"">;
	markersMap: [R_DescriptionChaptersItem,R_HeatSeekerItem];
};
export type D_MusicCarouselShelf=Record<"contents",{}[]>&{
	header: {};
	trackingParams: string;
	itemSize: "COLLECTION_STYLE_ITEM_SIZE_MEDIUM";
};
export type D_MusicQueue=Partial<Record<"content",R_PlaylistPanel>>&B_Hack;
export type D_MusicShelf=Record<"contents",R_MusicResponsiveListItem[]>&{
	title: G_Text;
	trackingParams: string;
	continuations: CD_Reload[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};
export type D_MusicThumbnail={
	thumbnail: D_Thumbnail;
	thumbnailCrop: "MUSIC_THUMBNAIL_CROP_UNSPECIFIED";
	thumbnailScale: "MUSIC_THUMBNAIL_SCALE_UNSPECIFIED";
	trackingParams: string;
};
export type D_NotchesItem={
	linearGradientCssStyle?: string;
	knobColorArgb: 4280191205;
	purchaseCommand: E_YpcGetCart;
	tierValue: G_Text;
};
export type D_NotificationText={
	successResponseText: G_Text;
	undoText: G_Text;
	undoEndpoint: E_UndoFeedback;
	trackingParams: string;
}|{
	successResponseText: G_Text;
	trackingParams: string;
};
export type D_OptionAv1Options={
	id: "SETTINGS_OPTIONS_ID_TYPE_AV1_OPTIONS";
	options: G_SettingsOptionItem[];
	title: G_Text;
	hidden: true;
};
export type D_OptionWithText={
	options: G_SettingsOptionItem[];
	title: G_Text;
	text: G_Text;
};
export type D_PageIntroduction={
	bodyText: G_Text;
	headerIcon: T_Icon<"ACCOUNT_ADVANCED">|T_Icon<"ACCOUNT_SHARING">;
	headerText: G_Text;
	pageTitle: G_Text;
};
export type PageTypeList=[
	"watch",
	"browse",
	"channel",
	"playlist",
	"settings",
	"shorts"
];
export type D_PdgBuyFlow={
	header: R_PdgBuyFlowHeader;
	content: R_SuperVodBuyFlowContent[];
	trackingParams: string;
	onCloseCommand: C_GetSurvey;
};
export type D_PdgBuyFlowHeader={
	text: G_Text;
	helpButton: R_Button;
	dismissButton: R_Button;
};
export type D_PdgCommentOption={
	commentText: G_Text;
	chipRenderer: R_PdgCommentChip;
};
export type D_LiveStreamability={
	videoId: DU_VideoId;
	broadcastId?: `${1}`;
	pollDelayMs: `${15000}`;
};
export type R_LiveStreamability={liveStreamabilityRenderer: D_LiveStreamability;};
export type D_PlayabilityOkReason=
	|"This live event has ended."
	|"We're experiencing technical difficulties."
	;
;
export type D_PlaybackTracking={
	atrUrl: D_UrlAndElapsedMediaTime<`https://s.youtube.com/api/stats/atr?${string}`>;
	ptrackingUrl: T_BaseUrl<`https://www.youtube.com/ptracking?${string}`>;
	qoeUrl: T_BaseUrl<`https://s.youtube.com/api/stats/qoe?${string}`>;
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: D_UrlAndElapsedMediaTime<`https://s.youtube.com/api/stats/delayplay?${string}`>;
	videostatsPlaybackUrl: T_BaseUrl<`https://s.youtube.com/api/stats/playback?${string}`>;
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: T_BaseUrl<`https://s.youtube.com/api/stats/watchtime?${string}`>;
	youtubeRemarketingUrl?: T_BaseUrl<`https://www.youtube.com/pagead/viewthroughconversion/${number}/?${string}`>;
};
export type D_PlayerAdParams={
	enabledEngageTypes: string;
	showContentThumbnail: boolean;
};
export type D_PlayerAnnotationsExpanded={
	featuredChannel: D_FeaturedChannel;
	allowSwipeDismiss: boolean;
	annotationId: D_UUIDString;
};
export type D_PlayerAttestation={
	challenge: string;
	botguardData: D_Botguard;
};
export type D_PlayerCaptionsTracklist={
	captionTracks: D_CaptionTrackItem[];
	audioTracks: D_AudioTrackItem[];
	translationLanguages: D_TranslationLanguage[];
	defaultAudioTrackIndex: number;
	openTranscriptCommand?: A_ChangeEngagementPanelVisibility;
};
export type D_PlayerLiveStoryboardSpec={spec: string;};
export type D_PlayerMicroformat={
	thumbnail: D_Thumbnail;
	embed?: D_MicroformatEmbed;
	title: G_Text;
	description?: G_Text;
	lengthSeconds: `${number}`;
	ownerProfileUrl: `http://www.youtube.com/channel/UC${string}`;
	externalChannelId: T_IdTemplate<"UC",D_UserIdStr>;
	isFamilySafe: boolean;
	availableCountries: string[];
	isUnlisted: boolean;
	hasYpcMetadata: boolean;
	viewCount: `${number}`;
	category: D_VideoCategory;
	publishDate: string;
	ownerChannelName: string;
	liveBroadcastDetails?: D_LiveBroadcastDetails;
	uploadDate: string;
	learningResource?: D_LearningResource;
};
export type D_BrowserMediaSession={browserMediaSession: R_BrowserMediaSessionRenderer;}&T_Actions<R_LikeButton>;
export type D_PlayerOverlay={
	endScreen: R_WatchNextEndScreen;
	shareButton: R_Button;
	addToMenu: R_Menu;
	videoDetails: R_PlayerOverlayVideoDetails;
	decoratedPlayerBarRenderer: R_DecoratedPlayerBar;
}|{
	endScreen: R_WatchNextEndScreen;
	autoplay: R_PlayerOverlayAutoplay;
	shareButton: R_Button;
	addToMenu: R_Menu;
	videoDetails: R_PlayerOverlayVideoDetails;
	autonavToggle: R_AutoplaySwitchButton;
}|D_BrowserMediaSession|{
	endScreen: R_WatchNextEndScreen;
	autoplay: R_PlayerOverlayAutoplay;
	shareButton: R_Button;
	addToMenu: R_Menu;
	videoDetails: R_PlayerOverlayVideoDetails;
	autonavToggle: R_AutoplaySwitchButton;
	decoratedPlayerBarRenderer: R_DecoratedPlayerBar;
};
export type D_PlayerOverlayAutoplay={
	title: G_Text;
	videoTitle: G_Text;
	byline: G_Text;
	pauseText: G_Text;
	background: D_Thumbnail;
	countDownSecs: 3|8;
	cancelButton: R_Button;
	nextButton: R_Button;
	trackingParams: string;
	closeButton: R_Button;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	preferImmediateRedirect: false;
	videoId: string;
	publishedTimeText: G_Text;
	webShowNewAutonavCountdown: true;
	webShowBigThumbnailEndscreen: false;
	shortViewCountText: G_Text;
	countDownSecsForFullscreen: 3;
};
export type D_PlayerOverlayVideoDetails={
	title: G_Text;
	subtitle: G_Text;
};
export type D_PlayerStoryboardSpec={spec: string;};
export type D_PlaylistAddToOption={
	title: G_Text;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit;
	trackingParams: string;
}&D_PlaylistId;
export type D_PlaylistByline={text: G_Text;};
export type D_InlineForm={
	formField: R_TextInputFormField;
	editButton: R_Button;
	saveButton: R_Button;
	cancelButton: R_Button;
	textDisplayed?: G_Text;
	style: "INLINE_FORM_STYLE_TITLE"|"INLINE_FORM_STYLE_BODY_TEXT_PLACEHOLDER";
	placeholder?: G_Text;
};
export type R_InlineForm={inlineFormRenderer: D_InlineForm;};
export type D_DropdownFormField={
	dropdown: R_Dropdown;
	key: "playlistEditEndpoint.actions.0.playlistPrivacy";
	onChange: E_PlaylistEdit;
};
export type D_PlaylistHeader={
	title: G_Text;
	numVideosText: G_Text;
	descriptionText: {};
	ownerText: G_Text;
	viewCountText: G_Text;
	shareData: D_CanShare;
	isEditable: boolean;
	privacy: "PRIVATE";
	ownerEndpoint: E_VE3611;
	editableDetails: D_CanDelete;
	trackingParams: string;
	serviceEndpoints: (E_PlaylistEdit|E_PlaylistDelete)[];
	stats: G_Text[];
	briefStats: G_Text[];
	editorEndpoint?: E_PlaylistEditor;
	playlistHeaderBanner: R_HeroPlaylistThumbnail;
	moreActionsMenu: R_Menu;
	playButton: R_Button;
	shufflePlayButton: R_Button;
	onDescriptionTap: A_FancyDismissibleDialog;
	cinematicContainer: R_CinematicContainer;
	byline: R_PlaylistByline[];
	descriptionTapText: G_Text;
	shareButton?: R_Button;
	titleForm?: R_InlineForm|R_InlineForm;
	descriptionForm?: R_InlineForm;
	// key = playlistEditEndpoint.actions.0.playlistPrivacy
	privacyForm?: R_DropdownFormField;
}&D_PlaylistId;
export type D_PlaylistSidebar={
	items: G_PlaylistSidebarItem[];
	trackingParams: string;
};
export type D_PlaylistSidebarSecondaryInfo={videoOwner: R_VideoOwner;};
export type D_PlaylistVideoList={
	playlistId: "WL";
	sortFilterMenu: R_SortFilterSubMenu;
	targetId: "WL";
	trackingParams: string;
};
export type D_PlaylistVideoThumbnail={
	thumbnail: D_Thumbnail;
	trackingParams: string;
};
export type D_PrefetchHintConfig={
	prefetchPriority: 0;
	countdownUiRelativeSecondsPrefetchCondition: -3;
}|{
	prefetchPriority: 0;
	playbackRelativeSecondsPrefetchCondition: -3;
};
export type D_NavigationLinkItem={
	navigationEndpoint: E_Url;
	icon: D_Thumbnail;
	title: G_Text;
};
export type D_PrivacyDropdownItem={
	label: G_Text;
	icon: T_Icon<"PRIVACY_PUBLIC">;
	description: G_Text;
	int32Value: 0|1|2;
	isSelected: boolean;
	accessibility: D_Label;
};
export type D_ProductList={
	contents: R_ProductListItem[];
	trackingParams: string;
};
export type D_ProductListItem={
	title: G_Text;
	accessibilityTitle: string;
	thumbnail: D_Thumbnail;
	price: `CA$${string}`;
	onClickCommand: E_Url;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
};
export type D_ProfileColumnUserInfo={
	title: G_Text;
	thumbnail: D_Thumbnail;
};
export type D_ProfilePageHeaderInformation={
	title: R_ProfilePageHeaderTitleViewModel;
	metadata: R_ProfilePageHeaderMetadataViewModel;
	thumbnail: R_ProfilePageHeaderThumbnailViewModel;
	alignment: string;
	onTap: C_Innertube;
};
export type D_ProfilePageHeaderTitle_Content={content: string;};
export type D_ProfilePageHeaderTitle={title: D_ProfilePageHeaderTitle_Content;};
export type D_RadioButtonSurveyOption={
	option: {};
	submissionEndpoint: {};
	enumName: T_Split<"ANSWER_VWT_INLINE_REGRET_WATCHING,ANSWER_VWT_INLINE_DONT_REGRET_WATCHING,ANSWER_VWT_INLINE_DONT_REGRET_WATCHING,ANSWER_VWT_INLINE_REGRET_WATCHING">[number];
	trackingParams: string;
};
export type D_Range={
	start: `${number}`;
	end: `${number}`;
};
export type D_RatingSurvey={
	ratings: R_RatingSurveyOption[];
	trackingParams: string;
	notSureButton: R_Button;
	undoButton: R_Button;
	notSureEndpoint: {};
};
export type D_RatingSurveyOption={
	responseText: G_Text;
	defaultStateIcon: T_Icon<"STAR_BORDER">;
	onStateIcon: T_Icon<"STAR">;
	followUpCommand: C_FollowUp;
	responseEndpoint: E_Feedback;
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};
export type D_FeedbackToken={feedbackToken: string;};
export type D_ReelItem={
	videoId: D_VideoIdTagStr;
	headline: G_Text;
	thumbnail: D_Thumbnail;
	viewCountText: G_Text;
	navigationEndpoint: E_VE37414_ReelWatch;
	menu: R_Menu;
	trackingParams: string;
	accessibility: D_Accessibility;
	style: "REEL_ITEM_STYLE_AVATAR_CIRCLE";
	dismissalInfo?: D_FeedbackToken;
	videoType: "REEL_VIDEO_TYPE_VIDEO";
	loggingDirectives: D_LoggingDirectives;
};
export type D_ReelPlayerHeader={
	reelTitleText: G_Text;
	timestampText: G_Text;
	channelNavigationEndpoint: E_VE3611;
	channelTitleText: G_Text;
	channelThumbnail: D_Thumbnail;
	trackingParams: string;
	accessibility: D_Accessibility;
};
export type D_ReelShelf={
	title: G_Text;
	items: R_ReelItem[];
	trackingParams: string;
	icon: T_Icon<"YOUTUBE_SHORTS_BRAND_24">;
};
export type D_ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
export type D_ResState={
	active: boolean;
	resolver: () => void;
};
export type D_ResourceStatusInResponseCheck={
	resourceStatuses: D_ElementResourceStatus[];
	serverBuildLabel: `boq_youtube-watch-ui_${number}.${string}_p${number}`;
};
export type D_ResponsePageUrlList=[
	`/${G_SettingsEndpointPages}`
];
export type Todo_D_RichGrid=Record<"contents",G_RendererContentItem[]>&{masthead: R_VideoMastheadAdV3;};
export type D_RichGrid={
	contents: G_RichGridContent[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch";
	reflowOptions: D_ReflowOptions;
}|{
	contents: R_RichItem[];
	trackingParams: string;
	header: R_FeedFilterChipBar;
	targetId: "browse-feedFEwhat_to_watch";
	masthead: R_AdSlot;
	reflowOptions: D_ReflowOptions;
};
export type D_RichItem={
	content: G_RichItemContent;
	trackingParams: string;
	rowIndex: number;
	colIndex: number;
}|{
	content: G_RichItemContent;
	trackingParams: string;
};
export type D_RichListHeader={
	title: G_Text;
	trackingParams: string;
	navigationButton: R_Button;
};
export type D_RootVisualElementType=[
	3611,
	3832,
	3854,
	6827,
	11487,
	23462,
	83769,
	96368,
][number];
export type D_RunAttestation={
	ids: D_ExternalChannelId[];
	engagementType: "ENGAGEMENT_TYPE_SUBSCRIBE";
};
export type D_Saved={
	any_data?: D_AnySaved;
	ad_layout_data?: D_AdLayout;
	data?: {[x: string]: ({}[])|undefined;};
};
export type D_SearchBox={
	endpoint: E_VE6827;
	searchButton: R_Button;
	clearButton: R_Button;
	placeholderText: G_Text;
	trackingParams: string;
};
export type D_SearchPyv={
	ads: R_AdSlot[];
	trackingParams: string;
};
export type D_SearchResultsTab={
	endpoint?: E_Search;
	title: string;
	selected?: boolean;
	content: R_SectionList;
	tabIdentifier: string;
	trackingParams: string;
};
export type D_SegmentedLikeDislikeButton={
	likeButton: R_ToggleButton;
	dislikeButton: R_ToggleButton;
	likeCount?: `${number}`;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	serviceEndpoint: E_ShareEntityService;
	icon: T_Icon<"SHARE">;
	tooltip: "Share";
	trackingParams: string;
	accessibilityData: D_Accessibility;
};
export type D_SerializedSlotAdServingDataEntry={serializedSlotAdServingDataEntry: string;};
export type D_SetSetting={
	settingItemId: `${number}`;
	boolValue?: boolean;
	settingItemIdForClient: G_SettingItemIdEnum;
};
export type D_SettingsCheckbox={
	title: G_Text;
	helpText?: G_Text;
	enabled: boolean;
	enableServiceEndpoint: {};
	disableServiceEndpoint: {};
	disabled: boolean;
};
export type D_SettingsOptions={options: G_SettingsOptionItem[]; title: G_Text;};
export type D_SettingsRadioOption={
	id: "SETTINGS_OPTIONS_ID_TYPE_AV1_SD"|"SETTINGS_OPTIONS_ID_TYPE_AV1_ALWAYS";
	title: G_Text;
	helpText?: G_Text;
	hidden: boolean;
};
export type D_SettingsSidebar={
	title: G_Text;
	items: R_CompactLink[];
};
export type D_SettingsSwitch={
	title: G_Text;
	subtitle: G_Text;
	enabled: boolean;
	enableServiceEndpoint: {};
	disableServiceEndpoint: {};
	id: "SETTINGS_OPTIONS_ID_TYPE_PUSH_NOTIFICATIONS_ENABLED";
	text: G_Text;
	thumbnail?: D_Thumbnail;
	trackingParams: string;
};
export type D_SimpleMenuHeader={
	title: G_Text;
	buttons: R_Button[];
};
export type D_StreamSelectionConfig={maxBitrate: `${number}`;};
export type D_StructuredDescriptionContent={items: G_StructuredDescriptionContentItem[];};
export type D_SubFeedSelector={
	title: G_Text;
	options: R_SubFeedOption[];
	trackingParams: string;
};
export type D_SubscriptionButton={
	type: "FREE";
	subscribed?: boolean;
};
export type D_TabbedSearchResults={tabs: R_SearchResultsTab[];};
export type D_TemplateUpdate={
	identifier: `${TemplateIdentFile}|${string}`;
	serializedTemplateConfig: string;
	dependencies: `${TemplateIdentFile}|${string}`[];
}|{
	identifier: `${TemplateIdentFile}|${string}`;
	serializedTemplateConfig: string;
};
export type TemplateIdentFile="track_selection_sheet_option.eml"|"bottom_sheet_list_option.eml"|"switch_button.eml";
export type D_TextInputFormField={
	label: G_Text;
	value?: string;
	maxCharacterLimit: 150|5000;
	key?: `playlistEditEndpoint.actions.0.${"playlistName"|"playlistDescription"}`;
	onChange?: E_PlaylistEdit;
	placeholderText?: string;
	validValueRegexp: "[^<>]*";
	invalidValueErrorMessage: G_Text;
	isMultiline?: true;
	required?: true;
};
export type D_ThemeBackgroundVars={
	lightThemeBackgroundColor: TP_Color<0xffffff,"0xffffff">;
	darkThemeBackgroundColor: TP_Color<0xff000000,"0xff000000">;
};
export type D_ThumbnailColor=D_Color;
export type D_ThumbnailItem={
	url: string;
	width?: number;
	height?: number;
};
export type D_ThumbnailOverlayBottomPanel={icon: T_Icon<"MIX">;};
export type D_ThumbnailOverlayEndorsement={
	text: G_Text;
	trackingParams: string;
};
export type D_ThumbnailOverlayHoverText={
	text: G_Text;
	icon: T_Icon<"PLAY_ALL">;
};
export type D_ThumbnailOverlayLoadingPreview={text: G_Text;};
export type D_ThumbnailOverlayNowPlaying={text: G_Text;};
export type D_ThumbnailOverlayResumePlayback={percentDurationWatched: Percent;};
export type Percent=[
	10|100,
][number];
export type tz<T extends (any[]|undefined)>=NonNullable<T>[number];
export type D_ThumbnailOverlaySidePanel_iconTypes=[
	"PLAY_ALL",
	"PLAYLISTS",
];
export type D_ThumbnailOverlaySidePanel={
	text: G_Text;
	icon: T_Icon<D_ThumbnailOverlaySidePanel_iconTypes[number]>;
};
export type D_ThumbnailOverlayTimeStatus=
	|D_ThumbnailOverlayTimeStatus_1
	|D_ThumbnailOverlayTimeStatus_2
	|D_ThumbnailOverlayTimeStatus_3
	|{
		text: G_Text;
		style: "UPCOMING";
	}
	;
;
export type D_ThumbnailOverlayTimeStatus_1={
	text: G_Text;
	style: "DEFAULT";
};
export type D_ThumbnailOverlayTimeStatus_2={
	text: G_Text;
	style: "LIVE";
	icon: T_Icon<"LIVE">;
};
export type D_ThumbnailOverlayTimeStatus_3={
	text: G_Text;
	style: "SHORTS";
	icon: T_Icon<"YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16">;
};
export type D_ThumbnailOverlayToggleButton=D_ThumbnailOverlayToggleButton_1|D_ThumbnailOverlayToggleButton_2;
export type D_ThumbnailOverlayToggleButton_1={
	untoggledIcon: T_Icon<"WATCH_LATER">;
	toggledIcon: T_Icon<"CHECK">;
	untoggledTooltip: "Watch Later";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: E_PlaylistEdit;
	toggledServiceEndpoint: E_PlaylistEdit;
	untoggledAccessibility: D_Accessibility;
	toggledAccessibility: D_Accessibility;
	trackingParams: string;
	isToggled: false;
};
export type D_ThumbnailOverlayToggleButton_2={
	untoggledIcon: T_Icon<"ADD_TO_QUEUE_TAIL">;
	toggledIcon: T_Icon<"PLAYLIST_ADD_CHECK">;
	untoggledTooltip: "Add to queue";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: E_SignalService_SendPost;
	untoggledAccessibility: D_Accessibility;
	toggledAccessibility: D_Accessibility;
	trackingParams: string;
};
export type D_TimestampWithNanos={
	seconds: `${number}`;
	nanos: number;
};
export type T_Id<T>={id: T;};
export type D_ToggleButtonIdData=T_Id<"TOGGLE_BUTTON_ID_TYPE_LIKE">;
export type R_ToggleButtonIdData={toggleButtonIdData: D_ToggleButtonIdData;};
export type T_SizeType<T>={sizeType: T;};
export type D_ToggleMenuServiceItem={
	defaultText: G_Text;
	defaultIcon: T_Icon<"LIBRARY_ADD">;
	defaultServiceEndpoint: E_Like;
	toggledText: G_Text;
	toggledIcon: T_Icon<"LIBRARY_REMOVE">;
	toggledServiceEndpoint: E_Like;
	trackingParams: string;
	isToggled: boolean;
};
export type D_Token={token: string;};
export type D_TokenJarDefaultExpirationSeconds=600;
export type D_TopbarLogo={
	iconImage: T_Icon<"YOUTUBE_LOGO">;
	tooltipText: G_Text;
	endpoint: E_VE3854;
	trackingParams: string;
	overrideEntityKey: string;
};
export type D_TopbarMenuButton={
	icon: T_Icon<"VIDEO_CALL">;
	menuRenderer: R_TopbarMenu;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	style: "STYLE_DEFAULT";
}|{
	avatar: D_Thumbnail;
	menuRequest: T_SE_Signal<M_AccountMenu,S_GetAccountMenu>;
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
};
export type D_TopicLink={
	title: G_Text;
	thumbnailDetails: D_Thumbnail;
	endpoint: E_VE3611;
	callToActionIcon: T_Icon<"CHEVRON_RIGHT">;
	trackingParams: string;
};
export type D_TrackingParams={trackingParams: string;};
export type D_Transcript=Record<"content",R_TranscriptSearchPanel>&{trackingParams: string;};
export type D_TranscriptFooter={languageMenu: R_SortFilterSubMenu;};
export type D_TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: G_Text;
	startTimeText: G_Text;
	trackingParams: string;
	accessibility: D_Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};
export type D_TranscriptSegmentList={
	initialSegments: R_TranscriptSegment[];
	noResultLabel: G_Text;
	retryLabel: G_Text;
	touchCaptionsEnabled: boolean;
};
export type D_TranslationLanguage={
	languageCode: string;
	languageName: G_Text;
};
export type D_TriggerCriteria={
	connectionWhitelist: [D_ConnectionWhitelistItem];
	joinLatencySeconds: 15;
	rebufferTimeSeconds: 10;
	watchTimeWindowSeconds: 180;
	refractorySeconds: 2592000;
};
export type D_TwoColumnBrowseResults={
	tabs: RG_Result[];
	secondaryContents?: G_SecondaryContents;
};
export type D_TwoColumnSearchResults={primaryContents: R_SectionList;};
export type D_UnifiedSharePanel={
	trackingParams: string;
	showLoadingSpinner: true;
};
export type D_UpcomingEvent={
	startTime: `${number}`;
	isReminderSet: false;
	upcomingEventText: G_Text;
};
export type D_Url={
	url: string;
	target?: "TARGET_NEW_WINDOW";
	nofollow?: true;
};
export type D_UrlAndElapsedMediaTime<T>={
	baseUrl: T;
	elapsedMediaTimeSeconds: number;
};
export type D_UrlWrappedValue={privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;};
export type D_ViewCountFactoid={
	viewCountEntityKey: string;
	factoid: R_Factoid;
	viewCountType: "VIEW_COUNT_FACTOID_TYPE_CONCURRENT_VIEWERS";
};
export type R_ViewCountFactoid={viewCountFactoidRenderer: D_ViewCountFactoid;};
export type D_VideoDescriptionHeader={
	title: G_Text;
	channel: G_Text;
	views: G_Text;
	publishDate: G_Text;
	factoid: (R_Factoid|R_ViewCountFactoid)[];
	channelNavigationEndpoint: E_VE3611;
	channelThumbnail: D_Thumbnail;
};
export type D_VideoDescriptionMusicSection={
	sectionTitle: G_Text;
	carouselLockups: R_CarouselLockup[];
	topicLink: R_TopicLink;
	premiumUpsellLink: G_Text;
};
export type D_VideoIdTagStr=string&{type: "YtVideoId";};
export type D_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton?: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText?: G_Text;
	trackingParams: string;
	badges?: RMD_Badge[];
	membershipButton?: R_Button;
};
export type TD_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
	membershipButton: R_Button;
}|{
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
	badges: RMD_Badge[];
	membershipButton: R_Button;
}|{
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
	trackingParams: string;
};
export type D_VideoQualityPromo={
	triggerCriteria: D_TriggerCriteria;
	text: G_Text;
	endpoint: E_Url;
	trackingParams: string;
	snackbar: RA_Notification;
};
export type D_VideoViewCount={
	viewCount: G_Text;
	isLive?: boolean;
	extraShortViewCount?: G_Text;
	shortViewCount?: G_Text;
};
export type D_Video_Owner={
	thumbnail: D_Thumbnail;
	navigationEndpoint: E_VE3611;
	accessibility: D_Accessibility;
	title: string;
};
export type D_VisualElementType=keyof B_VEMap;
export type D_VoiceSearchDialog={
	placeholderHeader: G_Text;
	promptHeader: G_Text;
	exampleQuery1: G_Text;
	exampleQuery2: G_Text;
	promptMicrophoneLabel: G_Text;
	loadingHeader: G_Text;
	connectionErrorHeader: G_Text;
	connectionErrorMicrophoneLabel: G_Text;
	permissionsHeader: G_Text;
	permissionsSubtext: G_Text;
	disabledHeader: G_Text;
	disabledSubtext: G_Text;
	microphoneButtonAriaLabel: G_Text;
	exitButton: R_Button;
	trackingParams: string;
	microphoneOffPromptHeader: G_Text;
};
export type D_VssLoggingContext={serializedContextData: string;};
export type D_WatchEndpointMusicConfig={
	hasPersistentPlaylistPanel: boolean;
	musicVideoType: "MUSIC_VIDEO_TYPE_ATV";
};
export type D_WatchNextEndScreen={
	results: G_WatchNextEndScreenItem[];
	title: G_Text;
	trackingParams: string;
};
export type D_WatchNextTabbedResults={tabs: R_Tab[];};
export type D_WebSearchboxConfig={
	requestLanguage: "en";
	requestDomain: "ca";
	hasOnscreenKeyboard: false;
	focusSearchbox: true;
};
export type D_YtConfig={
	visitorData: string;
	sessionIndex: 0;
	rootVisualElementType: D_VisualElementType;
};
//#endregion
export type D_ParamObjType={[x: number]: number|string|D_ParamObjType;};
export type D_LoggingDirectives={
	trackingParams: string;
	visibility?: TM_Visibility;
	enableDisplayloggerExperiment?: boolean;
	gestures?: D_LoggingDirectives_Gestures;
};
//#region D_Button
export type D_Button_With_TargetId=
	|{
		style: "STYLE_SUGGESTIVE";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		text: G_Text;
		serviceEndpoint: E_YpcGetOffers;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Join this channel">;
		targetId: "sponsorships-button";
	}
	;
;
//#endregion
export type D_TrackedThumbnail={thumbnail: D_Thumbnail; trackingParams?: string;};
export type D_Thumbnail={
	thumbnails: D_ThumbnailItem[];
	accessibility?: D_Accessibility;
	isOriginalAspectRatio?: true;
	sampledThumbnailColor?: D_ThumbnailColor;
	lightColorPalette?: D_LightColorPalette;
	darkColorPalette?: D_DarkColorPalette;
};
export type D_Omit_Compact_Player={
	title: G_Text;
	trackingParams: string;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
export type D_Omit_Compact_Video=D_Omit_Compact_Player&{
	videoId: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
};
export type D_PaidDigitalGoods={paidDigitalGoods: B_Hack;};
export type D_AudioConfig={
	loudnessDb?: number;
	perceptualLoudnessDb?: number;
	muteOnStart?: true;
	enablePerFormatLoudness?: boolean;
};
export type D_DescriptionChapters={
	chapters: R_Chapter[];
	trackingParams: string;
	onChapterRepeat: TA_OpenPopup_Empty;
};
//#region DoExtract & DoOmit
export type D_Button_DoExtract<T extends D_Button>=T extends infer Y? Omit<Y,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">:never;
export type D_Button_DoOmit<T_Btn extends D_Button,U extends T_DistributedKeyof<T_Btn>>=
	T_Btn extends infer T?
	T_OmitKey<T,U> extends infer Z?
	{
		[U in keyof Z]: Z[U]
	}
	:never
	:never;
export type D_Button_Ex_1_Omit_Size=D_Button_DoOmit<D_Button,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">;
//#endregion
//#region Extract & Exclude from data
export type D_GuideEntry_WithEntryData=Extract<D_GuideEntry,{entryData: any;}>;
export type D_GuideEntry_WithNavEP=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithEntryData>,{navigationEndpoint: any;}>;
export type D_GuideEntry_WithPrimary=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithNavEP>,{isPrimary: any;}>;
export type D_GuideEntry_With_ServiceEndpoint=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithPrimary>,{serviceEndpoint: any;}>;
export type D_GuideEntry_IconType_Obj={
	WithNavEP: Extract<D_GuideEntry_WithNavEP,{icon: any;}>['icon']['iconType'][];
	WithIcon: T_ExtractIconType<D_GuideEntry_With_ServiceEndpoint>[];
};
//#endregion
export type D_Playlist_MD={
	title: string;
	androidAppindexingLink: string;
	iosAppindexingLink: string;
};
export type D_RichMetadataRow={
	contents: R_RichMetadata[];
	trackingParams: string;
};
export type D_RelatedChipCloud={content: R_ChipCloud;};
export type D_LoggingDirectives_Gestures=T_Types<4>;
export type DD_Streaming={
	expiresInSeconds: `${number}`;
	adaptiveFormats: D_AdaptiveFormatItem[];
	formats?: D_FormatItem[];
	probeUrl?: GU_GoodPut_ProbeUrl;
	dashManifestUrl?: `https://manifest.googlevideo.com/api/manifest/dash/expire/${number}/ei/${string}/ip/${string}/id/${string}/source/yt_live_broadcast/requiressl/yes/hfr/all/as/fmp4_audio_clear%2Cwebm_audio_clear%2Cwebm2_audio_clear%2Cfmp4_sd_hd_clear%2Cwebm2_sd_hd_clear/vprv/1/pacing/0/keepalive/yes/fexp/${string}/itag/0/playlist_type/DVR/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Chfr%2Cas%2Cvprv%2Citag%2Cplaylist_type/sig/${string}`;
	hlsManifestUrl?: `https://manifest.googlevideo.com/api/manifest/hls_variant/expire/${number}/ei/${string}/ip/${string}/id/${string}/source/yt_live_broadcast/requiressl/yes/hfr/1/maxh/${string}/maudio/1/vprv/1/go/1/pacing/0/nvgoi/1/keepalive/yes/fexp/${string}/dover/11/itag/0/playlist_type/LIVE/sparams/expire%2Cei%2Cip%2Cid%2Csource%2Crequiressl%2Chfr%2Cmaxh%2Cmaudio%2Cvprv%2Cgo%2Citag%2Cplaylist_type/sig/${string}/file/index.m3u8`;
};
export type DMD_AdSlot={
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_IN_FEED";
	slotPhysicalPosition: 1;
	adSlotLoggingData: D_SerializedSlotAdServingDataEntry;
}|{
	slotId: `${number}:${number}:${number}:${number}`;
	slotType: "SLOT_TYPE_PAGE_TOP";
	slotPhysicalPosition: 0;
};
export type DMD_Badge={
	icon: T_Icon<"PRIVACY_PRIVATE">;
	style: "BADGE_STYLE_TYPE_SIMPLE";
	label: "Private";
	trackingParams: string;
}|{
	style: "BADGE_STYLE_TYPE_AD";
	label: "Ad";
	trackingParams: string;
}|{
	icon: T_Icon<"PRIVACY_UNLISTED">;
	style: "BADGE_STYLE_TYPE_MEDIUM_GREY";
	label: "Unlisted";
	trackingParams: string;
}|{
	style: "BADGE_STYLE_TYPE_SIMPLE";
	label: "New";
	trackingParams: string;
}|{
	icon: T_Icon<"CHECK_CIRCLE_THICK">;
	style: "BADGE_STYLE_TYPE_VERIFIED";
	tooltip: "Verified";
	trackingParams: string;
	accessibilityData: D_Label;
}|{
	icon: T_Icon<"LIVE">;
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "LIVE";
	trackingParams: string;
}|{
	icon: T_Icon<"LIVE">;
	style: "BADGE_STYLE_TYPE_LIVE_NOW";
	label: "PREMIERE";
	trackingParams: string;
}|{
	style: "BADGE_STYLE_TYPE_COLLECTION";
	label: string;
	trackingParams: string;
}|{
	icon: T_Icon<"OFFICIAL_ARTIST_BADGE">;
	style: "BADGE_STYLE_TYPE_VERIFIED_ARTIST";
	tooltip: "Official Artist Channel";
	trackingParams: string;
	accessibilityData: TD_Label<"Official Artist Channel">;
}|{
	style: "BADGE_STYLE_TYPE_YPC";
	label: "Fundraiser";
	trackingParams: string;
};
export type D_MetadataRow={
	title: G_Text;
	contents: G_Text[];
	trackingParams: string;
};
export type DMD_RowItem=R_RichMetadataRow|R_MetadataRow;
export type DMD_RowContainer={
	rows?: DMD_RowItem[];
	collapsedItemCount: number;
	trackingParams: string;
};
export type DRC_CsiVarKV=ToKeyValue<RC_CsiVarMap>|RC_CsiServiceC|RC_CsiServiceCVer;
export type DSS_Context={context: D_ContextTypeStr|null;};

//#region D_VideoPrimaryInfo
export type D_VideoPrimaryInfo={
	title: G_Text;
	viewCount: R_VideoViewCount;
	videoActions: R_Menu;
	trackingParams: string;
	updatedMetadataEndpoint?: E_UpdatedMetadata;
	superTitleLink?: G_Text;
	superTitleIcon?: T_Icon<"LOCATION_PIN">;
	badges?: RMD_Badge[];
	dateText: G_Text;
	relativeDateText?: G_Text;
};
export type GM_UpdatedMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/updated_metadata";
};
export type M_UpdatedMetadata={webCommandMetadata: GM_UpdatedMetadata;};
export type E_UpdatedMetadata={
	clickTrackingParams: string;
	commandMetadata: M_UpdatedMetadata|M_UpdatedMetadata;
	updatedMetadataEndpoint: D_VideoId;
};
export type D_VideoId={videoId: DU_VideoId;};
//#endregion

//#region D_UrlFormat
export type D_UrlFormat=
	|"/channel_switcher"
	|"/upload"
	|"android-app://com.google.android.youtube/http/youtube.com/premium"
	|`/@${string}`
	|`/@${string}${ChannelSubUrlFormat}`
	|`/account_${G_AccountPageSettingsSections}`
	|`/account`
	|`/api/stats/ads?${string}`
	|`/channel/UC${string}`
	|`/embed/${string}`
	|`/feed/${D_BrowseEndpointPages}`
	|`/feed/trending?${string}`
	|`/gaming`
	|`/playlist?${D_PlaylistUrlParams}`
	|`/shorts/${string}`
	|`/v/${string}?version=3&autohide=1`
	|`/v/${string}`
	|`/watch?${string}`
	|`https://www.youtube.com/pagead/adview?${string}`
	|`https://www.youtube.com/watch?${string}`
	|`https://googleads.g.doubleclick.net/pagead/interaction/?${string}`
	|D_ApiPathFormat_1
	|NonNullable<D_MicroformatEmbed["flashSecureUrl"]>
	|NonNullable<D_MicroformatEmbed["flashUrl"]>
	|D_MicroformatEmbed["iframeUrl"]
	|D_PlayerMicroformat["ownerProfileUrl"]
	|D_ResultsPageUrl
	|DE_VE83769_Url_1["url"]
	|GM_VE3854["url"]
	|GU_ExternalUrl
	|GU_GoodPut_ProbeUrl
	|GU_VE3611_Url
	|GU_VE6827_Url
	|GU_VE6827_Url
	|GU_VE11487_Url
	|GU_YTExternalUrl
	|NonNullable<D_AdaptiveFormatItem["url"]>
	|NonNullable<D_Channel_MD["channelConversionUrl"]>
	|NonNullable<D_CommentsHeader["unicodeEmojisUrl"]>
	|NonNullable<D_FormatItem["url"]>
	|S_YtUrlHttp_Watch
	;
;
//#endregion
//#region group_D
export type D_TrafficType={trafficType: "ACTIVE_VIEW_TRAFFIC_TYPE_VIDEO";};
export type D_TrackedThumbnail2={
	thumbnail: D_Thumbnail;
	trackingParams: string;
};
export type D_TrackedText={
	text: string;
	trackingParams: string;
};
export type D_TemplatedAdText={
	text: "{TIME_REMAINING}";
	isTemplated: true;
	trackingParams: string;
};
export type D_SodarExtensionData={
	siub: "56-y-0RG";
	bgub: string;
	scs: string;
	bgp: string;
};
export type D_SkipButton={
	message: T_MaybeTemplatedText<"Skip Ads">;
	trackingParams: string;
};
export type D_SkipAd={
	preskipRenderer: R_AdPreview;
	skippableRenderer: R_SkipButton;
	trackingParams: string;
	skipOffsetMilliseconds: 5000;
};

export type D_AdFeedback={
	title: G_Text;
	confirmLabel: G_Text;
	cancelLabel: G_Text;
	reasons: D_ReasonItem[];
	completionMessage: G_Text;
	trackingParams: string;
	impressionEndpoint: E_MuteAd;
};
export type D_SimpleAdBadge={
	text: T_MaybeTemplatedText<"Ad 1 of 2">;
	trackingParams: string;
};
export type D_Pings={
	impressionPings: T_BaseUrl<`https://www.youtube.com/pagead/adview?${string}`>[];
	errorPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	mutePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	unmutePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	pausePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	rewindPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	resumePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	skipPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	closePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	progressPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	fullscreenPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewViewablePings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	endFullscreenPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewMeasurablePings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	abandonPings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewFullyViewableAudibleHalfDurationPings: T_BaseUrl<`https://www.youtube.com/pcs/activeview?${string}`>[];
	completePings: T_BaseUrl<`https://www.youtube.com/pagead/interaction/?${string}`>[];
	activeViewTracking: D_TrafficType|D_TrafficType;
};
export type D_FlyoutCta={
	image: D_TrackedThumbnail2;
	headline: T_MaybeTemplatedText<string>;
	description: D_TrackedText;
	actionButton: R_Button;
	startMs: 1;
	trackingParams: string;
};
export type D_InstreamAdPlayerOverlay={
	skipOrPreviewRenderer: R_SkipAd;
	trackingParams: string;
	visitAdvertiserRenderer: R_Button;
	adBadgeRenderer: R_SimpleAdBadge;
	adDurationRemaining: R_AdDurationRemaining;
	adInfoRenderer: R_AdHoverTextButton;
	flyoutCtaRenderer: R_FlyoutCta;
	adLayoutLoggingData: D_SerializedAdServingDataEntry;
	elementId: string;
};

export type D_LightColorPalette={
	primaryTitleColor: number;
	secondaryTitleColor: number;
	section1Color?: number;
	section2Color: number;
	section3Color?: number;
	section4Color: number;
};
export type D_MenuServiceItemDownload={
	serviceEndpoint: E_OfflineVideo;
	trackingParams: string;
};
export type D_InstreamVideoAd={
	skipOffsetMilliseconds?: number;
	pings: D_Pings;
	clickthroughEndpoint: E_Url;
	csiParameters: D_CsiParameterItem[];
	playerVars: string;
	playerOverlay: R_InstreamAdPlayerOverlay;
	elementId: string;
	trackingParams: string;
	legacyInfoCardVastExtension: string;
	sodarExtensionData: D_SodarExtensionData;
	externalVideoId: string;
	adLayoutLoggingData: D_SerializedAdServingDataEntry;
	layoutId: "TUcDnyC2fuGT3fcz";
};
export type D_DownloadButton={
	trackingParams: string;
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	targetId: "watch-download-button";
	command: E_OfflineVideo;
};
export type D_CsiParameterItem={
	key: "ad_at";
	value: "15_2_1";
};
export type D_AdPreview={
	thumbnail: {
		thumbnail: D_Thumbnail;
		trackingParams: string;
	};
	trackingParams: string;
	templatedCountdown: R_TemplatedAdText;
	durationMilliseconds: 5000;
};
export type D_AdDurationRemaining={
	templatedCountdown: D_TemplatedAdText;
	trackingParams: string;
};
export type D_AdBreakService={
	prefetchMilliseconds: "10000";
	getAdBreakUrl: `https://www.youtube.com/get_midroll_info?ei=${string}&index=${number}&cpn=[CPN]&lact=[LACT]&vis=[VIS]&ad_block=[AD_BLOCK]&tsla=[TSLA]&bid=[BISCOTTI_ID]&dt=[DT]&flash=[FLASH]&frm=[FRM]&ca_type=[CA_TYPE]&u_tz=[U_TZ]&u_his=[U_HIS]&u_java=[U_JAVA]&u_h=[U_H]&u_w=[U_W]&u_ah=[U_AH]&u_aw=[U_AW]&u_cd=[U_CD]&u_nplug=[U_NPLUG]&u_nmime=[U_NMIME]&p_w=[P_W]&p_h=[P_H]&c=WEB&cver=2.20230309.08.00&m_pos_ms=-1`;
};
export type D_GetMidrollInfoParams={
	ei: string; m_pos: `${number}`; token: string; index: `${number}`;
	cpn: "[CPN]";
	lact: "[LACT]";
	vis: "[VIS]";
	ad_block: "[AD_BLOCK]";
	tsla: "[TSLA]";
	bid: "[BISCOTTI_ID]";
	dt: "[DT]";
	flash: "[FLASH]";
	frm: "[FRM]";
	ca_type: "[CA_TYPE]";
	u_tz: "[U_TZ]";
	u_his: "[U_HIS]";
	u_java: "[U_JAVA]";
	u_h: "[U_H]";
	u_w: "[U_W]";
	u_ah: "[U_AH]";
	u_aw: "[U_AW]";
	u_cd: "[U_CD]";
	u_nplug: "[U_NPLUG]";
	u_nmime: "[U_NMIME]";
	p_w: "[P_W]";
	p_h: "[P_H]";
	c: "WEB";
	cver: "2.20230309.08.00";
	m_pos_ms: "-1";
};

//#region DE (DE_OfflineVideo)
export type DE_OfflineVideo={
	videoId: string;
	onAddCommand: AC_GetDownload;
	action?: "ACTION_ADD";
};
//#endregion

//#region D_Menu
export type D_PlaylistId={playlistId: DU_Playlist_Id;};
export type D_PlaylistContent={
	title: string;
	contents: R_PlaylistPanelVideo[];
	currentIndex: number;
	playlistId: string;
	totalVideos: number;
	ownerName: G_Text;
	isInfinite: false;
	shortBylineText: G_Text;
	longBylineText: G_Text;
	totalVideosText: G_Text;
	trackingParams: string;
	titleText: G_Text;
	isEditable: true;
	endpoint: E_VE5754;
	localCurrentIndex: number;
	playlistButtons: R_Menu;
	badges: RMD_Badge[];
	videoCountText: G_Text;
	onReorderEndpoint: E_PlaylistEdit;
	isCourse: false;
	nextVideoLabel: G_Text;
};

export type D_Menu_Button=
	|R_PlaylistLoopButton
	|R_Button
	|R_ToggleButton
	|R_SegmentedLikeDislikeButton
	;
;
export type D_Menu_old={
	items?: G_MenuItem[];
	trackingParams: string;
	topLevelButtons?: (D_Menu_Button)[];
	accessibility?: D_Accessibility;
	targetId?: "browse-video-menu-button";
	loggingDirectives?: D_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};
export type D_Menu_WithItems={
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	menuPopupAccessibility: TD_Label<"List of menu actions">;
}|{
	items: R_MenuServiceItem[];
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	loggingDirectives: D_LoggingDirectives;
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: R_Button[];
	accessibility: TD_Accessibility<"Action menu">;
}|{
	items: (R_MenuNavigationItem|R_MenuServiceItem)[];
	trackingParams: string;
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: (R_SegmentedLikeDislikeButton|R_Button)[];
	accessibility: TD_Accessibility<"More actions">;
	flexibleItems: R_MenuFlexibleItem[];
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
};
export type D_Menu_WithTargetId=|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "browse-video-menu-button";
}|{
	items: (R_MenuServiceItem|R_MenuNavigationItem)[];
	trackingParams: string;
	topLevelButtons: R_Button[];
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "playlist-browse-action-menu";
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "watch-related-menu-button";
}|{
	items: R_MenuServiceItem[];
	trackingParams: string;
	topLevelButtons: (R_PlaylistLoopButton|R_SegmentedLikeDislikeButton)[];
	accessibility: D_Accessibility;
	menuPopupAccessibility: TD_Label<"List of menu actions">;
	flexibleItems: R_MenuFlexibleItem[];
	loggingDirectives: D_LoggingDirectives;
	targetId: "browse-video-menu-button";
}|{
	items: (R_MenuNavigationItem|R_MenuServiceItem)[];
	trackingParams: string;
	accessibility: TD_Accessibility<"Action menu">;
	targetId: "playlist-browse-action-menu";
};
export type G_Menu_TopLevelButton=R_PlaylistLoopButton|R_ToggleButton|R_Button;
export type D_Menu_WithButtons={
	trackingParams: string;
	topLevelButtons: G_Menu_TopLevelButton[];
};

export type D_Menu=D_Menu_WithItems|D_Menu_WithTargetId|D_Menu_WithButtons;
export type R_MenuPopup={menuPopupRenderer: D_MenuPopup;};
export type D_MenuPopup={items: R_MenuServiceItem[];};
//#endregion
export type D_LoggingContext={
	vssLoggingContext: D_SerializedContextData;
	qoeLoggingContext: D_SerializedContextData;
};
export type D_SerializedContextData={serializedContextData: string;};
export type D_SimpleCardTeaser={
	message: G_Text;
	trackingParams: string;
	prominent: true;
	logVisibilityUpdates: true;
	onTapCommand?: A_ChangeEngagementPanelVisibility;
};
export type D_FrameworkUpdates={entityBatchUpdate: DR_DC_EntityBatchUpdate; elementUpdate?: R_ElementUpdate;};
export type D_CommandRunItem={
	startIndex: number;
	length: number;
	onTap: C_Innertube;
	loggingDirectives?: D_LoggingDirectives;
};
export type D_StyleRunItem=({
	fontColor: number;
	fontName: string;
	weight: number;
}|{
	styleRunExtensions: {
		styleRunColorMapExtension: {
			colorMap: [
				{key: "USER_INTERFACE_THEME_DARK",value: 0xffffffff;},
				{key: "USER_INTERFACE_THEME_LIGHT",value: 0xff131313;}
			];
		};
	};
})&{
	startIndex: number;
	length: number;
};
export type D_AttributedDescription={
	content: string;
	commandRuns?: D_CommandRunItem[];
	styleRuns?: D_StyleRunItem[];
	attachmentRuns?: R_AttachmentElement[];
	decorationRuns?: R_TextDecorator[];
};
export type D_Card={
	teaser: R_SimpleCardTeaser;
	content?: D_Card_Content;
	cueRanges: D_CueRangeItem[];
	icon?: R_InfoCardIcon;
	trackingParams: string;
	cardId?: `${bigint}`;
	feature?: "cards";
};
export type D_MultiPageMenuNotificationSection=T_TrackedItems<GR_MP_MenuNotificationSection_Item>;
export type SG_LearningResource="How-to"|"Experiment";
export type D_LearningResource={
	learningResourceType: [SG_LearningResource];
	educationalLevel?: ["Beginner"];
	educationalLevelCountry?: "US";
};
export type D_Comment={
	authorText: G_Text;
	authorThumbnail: D_Thumbnail;
	authorEndpoint: E_VE3611;
	contentText: G_Text;
	publishedTimeText: G_Text;
	isLiked: boolean;
	actionMenu: R_Menu;
	commentId: `${string}.${string}`;
	actionButtons: R_CommentActionButtons;
	authorIsChannelOwner: boolean;
	currentUserReplyThumbnail: D_Thumbnail;
	voteStatus: "INDIFFERENT";
	trackingParams: string;
	voteCount?: G_Text;
	expandButton: R_Button;
	collapseButton: R_Button;
	sponsorCommentBadge?: R_SponsorCommentBadge;
	replyCount?: number;
	authorCommentBadge?: R_AuthorCommentBadge;
	loggingDirectives: D_LoggingDirectives;
};
export type D_SponsorCommentBadge={
	customBadge: D_Thumbnail;
	tooltip: string;
};
export type D_ExternalChannelId={externalChannelId: T_IdTemplate<"UC",D_UserIdStr>;};
export type D_BasicColorPaletteData={
	backgroundColor: 4287137928;
	foregroundTitleColor: 4294967295;
};
export type D_AuthorCommentBadge={
	icon: T_Icon<"CHECK_CIRCLE_THICK">;
	color: R_BasicColorPaletteData;
	authorText: G_Text;
	authorEndpoint: E_VE3611;
	iconTooltip: "Verified";
};
//#region D_GoogleVideoHostPartition
// cSpell:ignoreRegExp /"(\dualdn?|5u[a]e[z]|qx[o]e[d]|vg[q]s[rk]|vg[q]s)"/
export namespace GV_Parts_NS {
	export const done_func=(num: number) => (num*2)/*[GV_0]*/+num/*[TypeArr]*/+1/*[B]*/+2/*[S]*/;
	export type G_GV_idx0=
		|"5"|"9"
		|"a"
		|"h"|"n"|"o"|"p"
		|"q"|"t"|"v"
		;
	;
	export type G_GV_idx1=
		T_Split<T_StringTrim<`
		0
		4
		5
		8
		b
		g
		p
		t
		u
		x
		`>,`
		`>
		;
	;
	export type G_GV_idx2=
		T_Split<T_StringTrim<`
		1
		5
		9
		a
		f
		m
		o
		q
		v
		`>,`
		`>
		;
	;
	export type G_GV_idx3=
		T_Split<T_StringTrim<`
		7
		e
		l
		s
		z
		`>,`
		`>
		;
	;
	export type G_GV_idx4=
		T_Split<T_StringTrim<`
		6
		7
		d
		e
		k
		l
		r
		s
		y
		z
		`>,`
		`>
		;
	;
	export type G_GV_Base=
		|"5ua" // done_func(2) = 9
		|"9gv" // done_func(3) = 12
		|"a5m" // done_func(3) = 12
		|"ab5" // done_func(2) = 9
		|"hp5" // done_func(2) = 9
		|"n4v" // done_func(1) = 6
		|"n8v" // done_func(1) = 6
		|"nx5" // done_func(2) = 9
		|"o09" // done_func(1) = 6
		|"p5q" // done_func(2) = 9
		|"q4f" // done_func(3) = 12
		|"qxo" // done_func(2) = 9
		|"t0a" // done_func(2) = 9
		|"tt1" // done_func(2) = 9
		|"vgq" // done_func(2) = 9
		;
	;
}
export type G_GV_0=
	|"5uaez" // 2 [dig_final] [dig_user@5ua:ez:[6,7,e,l,r,y]]
	|"5uald" // 2 [dig_final] [dig_user@5ua:ld:[l,s,z]]
	|"9gv7e" // 2 [dig_final] [dig_user@9gv:7e:[e,l]]
	|"9gv7l" // 2 [dig_final] [dig_user@9gv:7l:[e,l,s]]
	|"9gv7z" // 2 [dig_final] [dig_user@9gv:7z:[7]]
	|"a5mek" // 2 [dig_final] [dig_user@a5m:ek:[6,d,s,z]]
	|"a5mlr" // 2 [dig_final] [dig_user@a5m:lr:[e,l]]
	|"a5mse" // 2 [dig_final] [dig_user@a5m:se:[7,e,l]]
	|"ab5l6" // 2 [dig_final] [dig_user@ab5:l6:[d,k,r]]
	|"ab5sz" // 2 [dig_final] [dig_user@ab5:sz:[l,z]]
	|"hp57k" // 2 [dig_final] [dig_user@hp5:7k:[6,d,k]]
	|"hp57y" // 2 [dig_final] [dig_user@hp5:7y:[7,e,l,s]]
	|"n4v7s" // 2 [dig_final] [dig_user@n4v:7s:[e,l,s]]
	|"n8v7z" // 2 [dig_final] [dig_user@n8v:7z:[l,s,z]]
	|"nx5s7" // 2 [dig_final] [dig_user@nx5:s7:[7,e]]
	|"nx57y" // 2 [dig_final] [dig_user@nx5:7y:[l,s]]
	|"o097z" // 2 [dig_final] [dig_user@o09:7z:[s,z]]
	|"p5qdd" // 2 [dig_final] [dig_user@p5q:dd:[7]]
	|"p5qls" // 2 [dig_final] [dig_user@p5q:ls:[6,7,d,r,y]]
	|"p5qs7" // 2 [dig_final] [dig_user@p5q:s7:[6,s,z]]
	|"q4fl6" // 2 [dig_final] [dig_user@q4f:l6:[6,l,s,z]]
	|"q4flr" // 2 [dig_final] [dig_user@q4f:lr:[7,e,l,s]]
	|"q4fze" // 2 [dig_final] [dig_user@q4f:ze:[7,e]]
	|"qxo7r" // 2 [dig_final] [dig_user@qxo:7r:[7]]
	|"qxoed" // 2 [dig_final] [dig_user@qxo:ed:[7,e]]
	|"t0a7l" // 2 [dig_final] [dig_user@t0a:7l:[7,e]]
	|"t0a7s" // 2 [dig_final] [dig_user@t0a:7s:[7]]
	|"tt1e7" // 2 [dig_final] [dig_user@tt1:e7:[7,l]]
	|"tt1el" // 2 [dig_final] [dig_user@tt1:el:[7,e]]
	|"vgqsk" // 2 [dig_final] [dig_user@vgq:sk:[6,e,l,s,z]]
	|"vgqsr" // 2 [dig_final] [dig_user@vgq:sr:[e,l,s,z]]
	;
;
// cSpell:ignoreRegExp /rr1.sn-\w+?\.googlevideo\.com\. \d+ IN A\s+\d+\.\d+\.\d+\.\d+/
// cSpell:ignoreRegExp /sn-\w+?\.googlevideo\.com.?"/
export type PT_DigDomain=[
	// dig results
	``,
];
export type PT_TypeS_NoRep=[
];
export type PT_TypeS=[
	["5ua",GV_gen_g3_t2<"5ua",["ez","ld"]>],
	["9gv",GV_gen_g3_t2<"9gv7",["e","l","z"]>],
	["a5m",GV_gen_g3_t2<"a5m",["ek","lr","se"]>],
	["ab5",GV_gen_g3_t2<"ab5",["l6","sz"]>],
	["hp5",GV_gen_g3_t2<"hp57",["k","y"]>],
	["n4v",GV_gen_g3_t2<"n4v",["7s","7z"]>],
	["n8v",GV_gen_g2_t1<"n8v7z">],
	["nx5",GV_gen_g3_t2<"nx5",["s7","7y"]>],
	["o09",GV_gen_g2_t1<"o097z">],
	["p5q",GV_gen_g3_t2<"p5q",["ls","s7"]>],
	["q4f",GV_gen_g3_t2<"q4f",["l6","lr","ze"]>],
	["qxo",GV_gen_g3_t2<"qxo",["7r","ed"]>],
	["t0a",GV_gen_g3_t2<"t0a7",["l","s"]>],
	["tt1",GV_gen_g3_t2<"tt1e",["7","l"]>],
	["vgq",GV_gen_g3_t2<"vgqs",["k","r"]>],
];
export type PT_TypeArr=[
	["5uaez",[
		"6l","6s",
		"7e",
		"e6","ed","ek","el","er","es","ey","ez",
		"l6","ld","le","lk","ll","lr","ls","ly","lz",
		"r6","rr","ry","rz",
		"y6","ys","yy","yz","z6","zd","zr","zy","zz",
	]],
	["5uald",[
		"l7","ll","lr","ls",
		"s6","sd","se","sk","sl","sr","ss","sy","sz",
		"z7","ze",
	]],
	["9gv7e",[
		"e6","ed","ek",
		"ls",
	]],
	["9gv7l",[
		"es","ez",
		"le",
		"s7",
	]],
	["9gv7z",[
		"76","7e",
	]],
	["a5mek",[
		"6d","6k","6l","6r","6s","6z",
		"d6","de","dl","ds","dz",
		"sd","sy",
		"zk","zl","zr","zs",
	]],
	["a5mlr",[
		"ek",
		"l6","ll","ls","lz",
	]],
	["a5mse",[
		"76","7l","7s","7z",
		"ek","er","es",
		"l7","le","ll",
	]],
	["ab5l6",[
		"dr","dy",
		"k6","kd",
		"r6","rd","rk","rl","rr","rs","rz",
	]],
	["ab5sz",[
		"ld","lk","ly",
		"z6","zd","ze","zk","zl","zr","zs","zy","zz",
	]],
	["hp57k",[
		"6r","6y",
		"d6","dd","dk","dr","ds","dy","dz",
		"k7",
	]],
	["hp57y",[
		"7r","7y",
		"e7","ee",
		"l6","lr","ly",
		"s7","se","sl","ss",
	]],
	["n4v7s",[
		"ee","ey",
		"l7","ll","lr","ls","ly",
		"s7","se",
	]],
	["n8v7z",[
		"lk","lr","ly",
		"s6","s7","sd","se","sk","sl","sr","ss","sy","sz",
		"z7","ze","zl",
	]],
	["nx5s7",[
		"7d","7s","7y","7z","76",
		"ee","el",
	]],
	["nx57y",[
		"lk",
		"sd","se","sk","sl","ss","sz",
	]],
	["o097z",[
		"sd","se","sk","sl","sr","ss","sz",
		"z7","zd","ze","zk","zr",
	]],
	["p5qls",[
		"6l",
		"7d","7l","7s","76",
		"d6","dd","dk","dr","dz",
		"rl","rr",
		"y6",
	]],
	["p5qs7",[
		"6d",
		"sk","sr",
		"zk","zr","zy",
	]],
	["q4fl6",[
		"66","6d","6s","6z",
		"lz",
		"s6","s7","sd","sk","sl","sr","ss","sy",
		"z6","z7","zy",
	]],
	["q4flr",[
		"7k","7r","7y",
		"e6","e7","ee","ek","el","er","es","ey","ez",
		"l6","l7","ld","le","lz",
		"sd","sk","sl","ss",
	]],
	["q4fze",[
		"7e","7l","7s",
		"ee",
	]],
	["qxo7r",[
		"7k","7r","7y",
	]],
	["qxoed",[
		"7k",
		"e7","ee",
	]],
	["t0a7l",[
		"7d",
		"ee",
	]],
	["t0a7s",[
		"7d",
	]],
	["tt1e7",[
		"7k",
		"ls","lz",
	]],
	["tt1el",[
		"7l",
		"el",
	]],
	["vgqsk",[
		"66","6s","6z",
		"e6","ed","ek","es","ez",
		"ld","lk","ll","lr","ls","ly","lz",
		"s7","se","sk",
		"z7","ze","zl","zs","zz",
	]],
	["vgqsr",[
		"e6","ed","ek","es","ez",
		"l6","ld","lk","ll","ls","lz",
		"s6","sd","sr","sy",
		"z6","z7","zd","zk","zs","zz",
	]],
];
export type G_GV_1_List=[
	"6d","6k","6l","6r","6s","6y","6z",
	"7d","7l","7s","7s","7y","7z","76",
	"d6","dd","de","dk","dl","dr","ds","ds","dy","dz",
	"ee","el","es","ey","ez",
	"k7","l7","le","lk","ll","lr","ls","ly",
	"rl","rr",
	"s7","s6","sd","se","sk","sl","sr","ss","sy","sz",
	"y6","z7",
	"zd","ze","zk","zl","zr","zs","zy",
];
export type G_GV_1_List_0=[
	"6",
	"7",
	"d",
	"e",
	"k",
	"l",
	"r",
	"s",
	"y",
	"z",
];
export type G_GV_1_List_1=[
	/*     */"6","7","d","e","k","l","r","s","y","z",
];
export type G_GV_11="6"|"7"|"d"|"e"|"k"|"l"|"r"|"s"|"y"|"z";
export type G_GV_1=
	|`6${Exclude<G_GV_11,"7"|"e"|"k"|"s">|" "}`
	|`7${Exclude<G_GV_11,"7"|"e">|" "}`
	|`d${Exclude<G_GV_11,"7"|"e"|"k">|" "}`
	|`e${Exclude<G_GV_11,"d"|"r">|" "}`
	|`k${Extract<G_GV_11,"6"|"d">|" "}`
	|`l${G_GV_11}`
	|`r${Extract<G_GV_11,"6"|"l"|"r">|" "}`
	|`s${G_GV_11}`
	|`z${G_GV_11}`
	;
;
export type D_GoogleVideoHostPartition={
	parts: ["sn","-",G_GV_0,"n",G_GV_1],
	partition: G_GV_0,
	selector: G_GV_1,
};
//#endregion
