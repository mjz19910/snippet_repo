//#region Extract on Url
type D_EX_YoutubeUrl=Extract<DE_VE83769_Url['url'],`${string}www.youtube.com${string}`>;
type D_EX_YoutubeKidsUrl=Extract<DE_VE83769_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>;
//#endregion
//#region String data, ie `D_${string}`
type D_EndpointLikeEndings="Endpoint"|"Command"|"Action"|"Renderer";
//#endregion
//#region Enum data, ie `D_${string}`
type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
type D_UiTargetId=
	|SI_VE76278_EngagementPanel["targetId"]
	|A_WatchNextContinuation["targetId"]
	|DC_ReloadContinuationItems['targetId']
	;
;
//#endregion
//#region String data
type D_TargetIdStr_Template=`shopping_panel_for_entry_point_${"5"|"22"}`;
type D_TargetIdStr=
	|Extract<D_Menu,{targetId: any;}>["targetId"]
	|A_WatchNextContinuation['targetId']
	|AD_AppendContinuationItems['targetId']
	|AD_UpdateEngagementPanel['targetId']
	|D_Button_targetId
	|D_Button_With_TargetId["targetId"]
	|D_ChipCloudChip_tid['targetId']
	|D_EngagementPanelSectionTargetId
	|D_Menu_TargetId
	|D_TargetIdStr_Template
	|D_TranscriptSearchPanel['targetId']
	|DC_ReloadContinuationItems["targetId"]
	|DC_ScrollToEngagementPanel['targetId']
	|DC_SectionList_TargetId
	|G_SI_DB_EngagementPanel['targetId']
	|RS_Search['targetId']
	|TA_Continuation<"browse-feedFEwhat_to_watch",G_BrowseFeed>['targetId']
	;
;
type D_PlaylistSelfId="WL"|"LL";
type D_PlaylistIdTypeBase="RDMM"|"RD"|"PL"|"UU";
type SD_PlaylistId=
	|`RD${string}`
	|`RDMM${string}`
	|`RDGM${string}`
	|`PL${string}`
	|"WL"
	|"LL"
	;
;
type D_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RD${string}`
	;
;
type D_BrowseIdStr=
	|`FE${D_BrowseEndpointPages}`
	|GU_VE5754_Id
	|`UC${string}`
	|`SP${D_Settings_Id}`
	|`MP${string}_${string}`
	;
;
type WatchUrlFormat=
	|D_WatchPageUrl
	|`/watch?${D_WatchUrlStr}`
	|`/watch?v=${string}&list=RD${string}&start_radio=1&rv=${string}`
	|`/watch?v=${string}&list=RDGM${string}&start_radio=1&rv=${string}`
	|`/watch?v=${string}&playnext=1&list=RD${`CM${`UC${string}`}`}`
	;
;
type D_WatchPageUrl=
	|`/watch?v=${string}&list=RD${string}&index=${number}`
	|`/watch?v=${string}&list=RD${string}&start_radio=1`
	|`/watch?v=${string}&pp=${string}`
	|`/watch?v=${string}&t=${number}s`
	|`/watch?v=${string}`
	;
;
type D_WatchPlaylistUrlFormat=
	|`list=${SD_PlaylistId}`
	|`list=${SD_PlaylistId}&index=${number}`
	|`list=${YtInfinitePlaylistFormat}&start_radio=${1|0}`
	;
;
type D_WatchUrlStr=
	|`v=${string}`
	|`v=${string}&${G_YtWatchUrl}`
	;
;
type D_ChannelPageGridStyleType=
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_CHANNEL_PAGE_GRID"
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT"
	;
;
type D_ContextTypeStr=
	|"channel_creator"
	|"yt_web_remix_unlimited"
	|"yt_web_search"
	|"yt_web_unknown_form_factor_kevlar_w2w"
	|"yt_web_unlimited"
	;
;
type D_Settings_Id=
	|"account"
	|"account_advanced"
	|"account_overview"
	|"report_history"
	|"unlimited"
	|"account_downloads"
	;
;
type D_UrlInfoItemType=
	|"PL"
	|"RD"
	|"RDCM"
	|"RDGM"
	|"RDMM"
	|"UU"
	;
;
type D_VideoCategory=
	|"Autos & Vehicles"
	|"Comedy"
	|"Education"
	|"Entertainment"
	|"Film & Animation"
	|"Gaming"
	|"Howto & Style"
	|"Music"
	|"Nonprofits & Activism"
	|"People & Blogs"
	|"Pets & Animals"
	|"Science & Technology"
	|"Sports"
	|"Travel & Events"
	;
;
type D_VE6827_PageLocation=
	|"history"
	|"library"
	;
;
type D_ApiStatsAdsStr=`ver=${string}&ns=${string}&event=${string}&device=${string}&content_v=${string}&el=${string}&ei=${string}&devicever=${string}&bti=${string}&break_type=${string}&conn=${string}&cpn=${string}&lact=${string}&m_pos=${string}&mt=${string}&p_h=${string}&p_w=${string}&rwt=${string}&sdkv=${string}&slot_pos=${string}&vis=${string}&vol=${string}&wt=${string}&sli=${string}&slfs=${string}&loginael=${string}`;
type D_ApiUrlFormat=`https://www.youtube.com${D_ApiPathFormat_1}`;
type D_ChanLoc=`channel.${string}`;
type D_ChannelId=`UC${string}`;
type T_ChannelIdStr<T extends string>=`UC${T}`;
type D_UUIDString=`${string}-${string}-${string}-${string}-${string}`;
type D_PlaylistUrlParams=`list=${SD_PlaylistId}`;
type D_PlaylistUrlStr=`/playlist?${D_PlaylistUrlParams}`;
type D_RadioPlaylistStr<T extends string>=`RD${T}`;
type D_SD_UrlTypes=`page_type_${YTNavigateFinishDetail["pageType"]}`|UrlTypes;
type D_SettingsIdStr=`SP${G_SettingsEndpointPages}`;
type D_YTExternalEncUrl=`[parse_url_external_1] https://m.youtube.com/premium`;
type D_ResultsPageUrl=`/results?search_query=${string}`;
type D_PlaylistUrlFormat=`/playlist?list=${SD_PlaylistId}`;
type D_FE_SectionId=`FE${"trending"|"history"|"library"|"storefront"|"guide_builder"}`;
type D_EngagementPanelTargetId=
	|"engagement-panel-clip-view"
	|"engagement-panel-error-corrections"
	|"engagement-panel-macro-markers-problem-walkthroughs"
	|"shopping_panel_for_entry_point_5"
	|SI_DB_EngagementPanel_ClipCreate["targetId"]
	|SI_DB_EngagementPanel_MacroMarkers_AutoChapters["targetId"]
	|SI_DB_EngagementPanel_MacroMarkers_DescriptionChapters["targetId"]
	|SI_VE76278_EngagementPanel["targetId"]
	|SI_VE124975_EngagementPanel["targetId"]
	|SI_VE126250_EngagementPanel["targetId"]
	;
;
type D_EngagementPanelVisibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
type D_ButtonSizeType="SIZE_DEFAULT"|"SIZE_SMALL";
type D_ChannelSwitcherUrlFormat="/channel_switcher";
type D_ConnectionWhitelistItem="WIFI";
type D_CountryCode="CA";
type D_GenSurvey_ActionStr="SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL";
//#endregion
//#region Entity data, ie `D_EY_${string}`
type D_EY_Offlineability={
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
type D_AddToPlaylistCreate={
	openCreateLink: R_CompactLink;
	nameInput: R_TextInputFormField;
	privacyInput: R_Dropdown;
	createAction: R_Button;
	serviceEndpoint: E_CreatePlaylistService;
};
//#region Icons
type D_Icon_Button=T_Icon<DE_IconType_Button>;
//#endregion
//#region 
type D_Survey_Watch={watch: B_Hack;};
//#endregion
type D_ProfileColumn={items: G_ProfileColumnItem[];};
type D_EngagementPanelSectionList=
	|G_SI_DB_EngagementPanel
	|SI_VE76278_EngagementPanel
	|SI_VE99999_EngagementPanel
	|SI_VE124975_EngagementPanel
	|SI_VE126250_EngagementPanel
	|SI_VE139722_EngagementPanel
	;
;
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
		"macro-markers-description-chapters"
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
type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
type TD_Accessibility<T>={accessibilityData: TD_Label<T>;};
type D_SubscriptionNotificationToggleButton_States=[
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

type D_SubscriptionNotificationToggleButton={
	states: D_SubscriptionNotificationToggleButton_States;
	currentStateId: D_SubscriptionNotificationToggleButton_States[number]["stateId"];
	trackingParams: string;
	command: C_CommandExecutor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};
type D_CompactRadio={
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
	shareUrl: D_RadioShareUrl;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type D_PdgColorSlider={
	notches: D_NotchesItem[];
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
	maxTierValue: G_Text;
	minTierValue: G_Text;
};
type D_SuperVodBuyFlowContent={
	description: G_Text;
	buyButton: R_Button;
	trackingParams: string;
	commentPreview: R_PdgCommentPreview;
	disclaimerText: G_Text;
	colorSlider: R_PdgColorSlider;
	defaultPriceTier: number;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
type D_PdgCommentPreview={
	title: G_Text;
	authorThumbnail: D_Thumbnail;
	authorText: G_Text;
	commentOptionRenderers: R_PdgCommentOption[];
	defaultCommentText: G_Text;
	editButton: R_Button;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
type D_NotificationTopbarButton={
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
type D_RichSection={
	content: G_RichSection;
	trackingParams: string;
	fullBleed: false;
};
type D_RichShelf={
	icon?: T_Icon<"YOUTUBE_SHORTS_BRAND_24">;
	title: G_Text;
	contents: R_RichItem[];
	trackingParams: string;
	menu: R_Menu;
	showMoreButton: R_Button;
	rowIndex: 2|4;
};
type D_InlineSurvey={
	dismissalEndpoint: {};
	title: G_Text;
	subtitle: G_Text;
	inlineContent: R_CompactVideo;
	response: R_ExpandableSurveyResponse;
	trackingParams: string;
	dismissalText: G_Text;
	impressionEndpoints: {}[];
};
type D_SourcePivotHeader={
	headerInformation: R_ProfilePageHeaderInformationViewModel;
	buttonRow: R_ProfilePageHeaderButtonRowViewModel;
	trackingParams: string;
};
type D_CompactVideo=
	|{
		videoId: string;
		thumbnail: D_Thumbnail;
		title: G_Text;
		longBylineText: G_Text;
		publishedTimeText: G_Text;
		viewCountText: G_Text;
		lengthText: G_Text;
		navigationEndpoint: E_ReelWatch;
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
type D_ExpandableSurveyResponse={
	options: R_RatingSurvey;
	submitButton: R_Button;
	trackingParams: string;
};
type D_ProfileColumnStatsEntry={label: G_Text; value: G_Text;};
type D_ProfileColumnStats={items: R_ProfileColumnStatsEntry[];};
type D_GuideDownloadsEntry={
	alwaysShow: false;
	entryRenderer: R_GuideEntry;
};
type D_AccountLinkButton={
	providerKey: K_AccountLinkProviderKey;
	unlinkedButton: R_Button;
};
type D_ActionCompanionAd={
	headline: D_TemplatedText;
	description: D_TemplatedText;
	actionButton: R_Button;
	iconImage: D_ThumbnailsList;
	bannerImage: D_ThumbnailsList;
	navigationEndpoint: {};
	trackingParams: string;
	adInfoRenderer: R_AdHoverTextButton;
	adVideoId: string;
	impressionPings: T_BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: D_SerializedAdServingDataEntry;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};
type D_AlertWithButton={
	type: "INFO";
	text: G_Text;
	dismissButton: R_Button;
};
type D_RemarketingPing={remarketingPing: `https://www.youtube.com/pagead/viewthroughconversion/962985656/?${string}`;};

type D_C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: E_VE3611;
	avatar: D_Thumbnail;
	banner: D_Thumbnail;
	badges?: RMD_Badge[];
	headerLinks: R_ChannelHeaderLinks;
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
type D_CardCollection={
	cards: R_Card[];
	headerText: G_Text;
	icon: R_InfoCardIcon;
	closeButton: R_InfoCardIcon;
	trackingParams: string;
	allowTeaserDismiss: boolean;
	logIconVisibilityUpdates: boolean;
};
type D_ChipCloud={
	chips: R_ChipCloudChip[];
	trackingParams: string;
	horizontalScrollable: false;
	nextButton: R_Button;
	previousButton: R_Button;
};
type D_ClipCreation={
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
type D_Comment={
	authorText: G_Text;
	authorThumbnail: D_Thumbnail;
	authorEndpoint: GE_Browse;
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
	replyCount?: number;
	loggingDirectives: D_LoggingDirectives;
};
type D_CommentSimplebox={
	submitButton: R_Button;
	cancelButton: R_Button;
	authorThumbnail: D_Thumbnail;
	placeholderText: G_Text;
	trackingParams: string;
	avatarSize: "SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT";
	emojiButton: R_Button;
	emojiPicker: R_EmojiPicker;
	aadcGuidelinesStateEntityKey: string;
};
type D_ConfirmDialog={
	title?: G_Text;
	trackingParams: string;
	dialogMessages: G_Text[];
	confirmButton: R_Button;
	cancelButton: R_Button;
	primaryIsCancel: boolean;
};
type D_ConnectedApp={
	icon: {};
	title: {};
	text: {};
	connectButton: R_Button;
};
type D_CopyLink={
	copyButton: R_Button;
	shortUrl: string;
	trackingParams: string;
	style: "COPY_LINK_RENDERER_STYLE_SETTINGS";
};
type D_DecoratedPlayerBar={playerBar: R_MultiMarkersPlayerBar;}|{
	playerBar: R_MultiMarkersPlayerBar;
	playerBarActionButton: R_Button;
};
type D_DesktopTopbar={
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
type D_DisplayAd={
	layout: "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
	titleText: G_Text;
	image: D_ThumbnailsList;
	bodyText: G_Text;
	secondaryText: G_Text;
	badge: DMD_Badge;
	menu: R_Menu;
	ctaButton: R_Button;
	impressionEndpoints: {}[];
	clickCommand: {};
	mediaHoverOverlay: R_Button;
	mediaBadge: DMD_Badge;
	trackingParams: string;
};
type D_EngagementPanelTitleHeader={
	title: G_Text;
	contextualInfo?: G_Text;
	informationButton?: R_Button;
	menu?: G_EngagementPanelMenu;
	visibilityButton: R_Button;
	trackingParams: string;
};
type D_FeaturedChannel={
	startTimeMs: `${number}`;
	endTimeMs: `${number}`;
	watermark: D_Thumbnail;
	trackingParams: string;
	navigationEndpoint: E_VE3611;
	channelName: string;
	subscribeButton: R_SubscribeButton;
};
type D_FeedFilterChipBar={
	contents: R_ChipCloudChip[];
	trackingParams: string;
	nextButton?: R_Button;
	previousButton?: R_Button;
	styleType: D_ChannelPageGridStyleType;
};
type D_FusionSearchbox={
	icon: T_Icon<"SEARCH">;
	placeholderText: G_Text;
	config: R_WebSearchboxConfig;
	trackingParams: string;
	searchEndpoint: E_VE4724_Search;
	clearButton: R_Button;
};
type D_ChannelOptions={
	avatar: D_Thumbnail;
	avatarEndpoint: {};
	name: string;
	links: G_Text[];
	avatarAccessibility: D_Accessibility;
};
type D_ChannelThumbnailWithLink={
	thumbnail: D_Thumbnail;
	navigationEndpoint: null;
	accessibility: D_Accessibility;
	title: string;
}|{
	thumbnail: D_Thumbnail;
	navigationEndpoint: E_VE3611;
	accessibility: D_Accessibility;
};
type D_CheckboxSurveyOption={
	responseText: G_Text;
	responseEndpoint: {};
	value: T_Split<"ANSWER_FOLLOWUP_DISAPPOINTING,ANSWER_FOLLOWUP_MEDIOCRE,ANSWER_FOLLOWUP_IRRELEVANT,ANSWER_FOLLOWUP_DIFFERENT,ANSWER_FOLLOWUP_OTHER,ANSWER_FOLLOWUP_RELAXING,ANSWER_FOLLOWUP_USEFUL,ANSWER_REASON_INFORMATIVE,ANSWER_FOLLOWUP_HELPS_FOCUS,ANSWER_FOLLOWUP_ENTERTAINING,ANSWER_FOLLOWUP_NOVEL,ANSWER_FOLLOWUP_INSPIRING,ANSWER_FOLLOWUP_CALMING,ANSWER_FOLLOWUP_ENJOYABLE,ANSWER_FOLLOWUP_LIFE_CHANGING,ANSWER_FOLLOWUP_HEARTWARMING">[number];
	trackingParams: string;
};
type D_ChildVideo={
	title: G_Text;
	navigationEndpoint: E_Watch;
	lengthText: G_Text;
	videoId: string;
};
type D_ChildVideo_Omit={
	title: G_Text;
	navigationEndpoint: E_Watch;
	lengthText: G_Text;
	videoId: string;
};
type D_ThumbnailOverlay_Omit_Keys=[
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
type D_Video_Omit_Keys=D_ThumbnailOverlay_Omit_Keys|[
	"ownerText",
	"showActionMenu",
	"channelThumbnailSupportedRenderers",
	"inlinePlaybackEndpoint",
][number];
type D_Video_Omit_Owner_Keys=D_ThumbnailOverlay_Omit_Keys|"owner";
type D_ChipCloudChip_tid={
	style: T_StyleType<"STYLE_DEFAULT"|"STYLE_HOME_FILTER"|"STYLE_REFRESH_TO_NOVEL_CHIP">;
	text: G_Text;
	trackingParams: string;
	targetId: "feed_filter_chip_bar_second_chip";
}|{
	navigationEndpoint: C_Continuation|C_RelatedChip;
	targetId: "feed_filter_chip_bar_second_chip";
};
type D_ChipCloudChip_Style=[
	"STYLE_DEFAULT",
	"STYLE_HOME_FILTER",
	"STYLE_REFRESH_TO_NOVEL_CHIP",
][number];
type D_ChipCloudChip_navigationEndpoint=C_Continuation|C_RelatedChip|E_Feedback;
type D_ChipCloudChip=
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
type EG_CompactLink_1=E_VE83769_Upload|E_SignalNavigation;
type D_CompactPlaylist={
	playlistId: `PL${string}`;
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
type D_ContinuationItem={
	trigger?: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint?: C_Continuation;
	ghostCards?: R_GhostGrid;
	button?: R_Button;
};
type D_AutoplaySetItem_ButtonVideoEP=E_Watch|E_WatchPlaylist;
type D_AutoplaySetItem_NormalOpt={
	mode: "NORMAL";
	autoplayVideo: E_Watch;
	nextButtonVideo: E_Watch;
	previousButtonVideo?: E_Watch;
};
type D_AutoplaySetItem={
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
type D_EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: G_Text;
	thumbnail: D_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};
type D_EndScreenVideo={
	videoId: string;
	thumbnail: D_Thumbnail;
	title: G_Text;
	shortBylineText: G_Text;
	lengthText?: G_Text;
	lengthInSeconds?: number;
	navigationEndpoint: E_Watch|E_ReelWatch;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type D_HeroPlaylistThumbnail={
	thumbnail: D_Thumbnail;
	maxRatio: 0.5625;
	trackingParams: string;
	onTap: E_Watch;
	thumbnailOverlays: G_ThumbnailOverlayItem;
};
type D_MacroMarkersListItem={
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
type D_Notification={
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
type D_DarkColorPalette_2={
	primaryTitleColor: 4294961637;
	secondaryTitleColor: 4291602851;
	section2Color: 4063436571;
	section4Color: 4061728525;
};
type D_DarkColorPalette_3={
	primaryTitleColor: 4294963429;
	secondaryTitleColor: 4291605667;
	section2Color: 4063436046;
	section4Color: 4061728263;
};
type D_DarkColorPalette_4={
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
type D_LightColorPalette_2={
	primaryTitleColor: 4279833104;
	secondaryTitleColor: 4286207567;
	section2Color: 4076401393;
	section4Color: 4075544541;
};
type D_LightColorPalette_3={
	primaryTitleColor: 4279833616;
	secondaryTitleColor: 4285881676;
	section2Color: 4076401905;
	section4Color: 4075545565;
};
type D_LightColorPalette_4={
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
type D_PlaylistPanelVideo_Base={
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
type D_PlaylistPanelVideo=
	|never
	|D_PlaylistPanelVideo_Base
	|(D_PlaylistPanelVideo_Base&{indexText: G_Text;})
	;
;
type D_Radio={
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
type G_TextRun_Endpoint=E_VE83769_Url|GE_Browse|E_Watch|E_ReelWatch;
type D_WebPrefetch={navigationEndpoints: E_Watch[];};
type D_Video_inlinePlaybackEndpoint=D_Video['inlinePlaybackEndpoint']&{};
type D_SubFeedOption={
	name: G_Text;
	isSelected: boolean;
	navigationEndpoint: E_Watch|GE_Browse;
	trackingParams: string;
};
type D_BrowseEndpointContextMusicConfig={pageType: T_EnumStr<"MUSIC_PAGE_TYPE","ALBUM"|"ARTIST"|"USER_CHANNEL">;};
type D_AdSlot={
	adSlotMetadata: DMD_AdSlot;
	fulfillmentContent: R_FulfilledLayout;
	enablePacfLoggingWeb: boolean;
};
type D_SerializedAdServingDataEntry={serializedAdServingDataEntry: string;};
type D_PageTopAdLayout={
	adLayoutMetadata: MG_AdLayout_DisplayBillboardImageButtoned;
	renderingContent: R_VideoMastheadAdV3;
};
type D_Emoji={
	emojiId: "🤣";
	shortcuts: [":rolling_on_the_floor_laughing:"];
	searchTerms: ["rolling"];
	image: D_Thumbnail;
};
type D_VE3611_TextRun=|{
	text: string;
	navigationEndpoint: E_VE3611;
}|{
	text: `@${string}`;
	navigationEndpoint: E_VE3611;
	loggingDirectives: D_LoggingDirectives;
};
type D_VE5754_TextRun={
	text: "Watch Later";
	navigationEndpoint: E_VE5754;
};
type D_VE6827_TextRun={
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
type D_VE11487_TextRun={
	text: "Get YouTube Premium";
	navigationEndpoint: E_VE11487;
};
type D_VE83769_TextRun={
	text: "https://www.deviantart.com/zianu/art/...";
	navigationEndpoint: E_VE83769_Url;
};
type D_VE_TextRun=
	|D_VE3611_TextRun
	|D_VE5754_TextRun
	|D_VE6827_TextRun
	|D_VE11487_TextRun
	|D_VE83769_TextRun
	;
;
type D_TextRun=|D_VE_TextRun|{
	text: string;
}|{
	text: string;
	strikethrough: true;
}|{
	text: string;
	italics: true;
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
type D_PlaylistPanel={
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
type D_Omit_Menu_Video={
	thumbnail: D_Thumbnail;
	longBylineText: G_Text;
	viewCountText: G_Text;
	navigationEndpoint: E_Watch;
	shortBylineText: G_Text;
	menu: R_Menu;
};
type D_Omit_Menu_Radio={
	navigationEndpoint: E_Watch;
	menu: R_Menu;
};
type D_Omit_Menu_Video_Ex={ownerBadges: RMD_Badge[];};
type D_Channel_MD={
	title: string;
	description: string;
	rssUrl: string;
	externalId: `UC${string}`;
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
type D_Chapter={
	title: G_Text;
	timeRangeStartMillis: 0;
	onActiveCommand: A_SetActivePanelItem;
	thumbnail: D_Thumbnail;
};
type D_CommentsEntryPointTeaser={
	teaserAvatar: D_Thumbnail&{accessibility: D_Accessibility;};
	teaserContent: G_Text;
	trackingParams: string;
};
type D_GridVideo={
	badges: {}[];
	channelThumbnail: D_Thumbnail;
	menu: R_Menu;
	navigationEndpoint: {};
	shortBylineText: G_Text;
	shortViewCountText: G_Text;
	thumbnail: D_Thumbnail;
	thumbnailOverlay: G_ThumbnailOverlayItem[];
	title: G_Text;
	trackingParams: string;
	videoId: string;
	viewCountText: G_Text;
};
type D_GuideEntry_PresentationNewContent={
	navigationEndpoint: E_VE3611;
	thumbnail: D_Thumbnail;
	badges: D_LiveBroadcastingBadge;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT";
};
type D_GuideEntry_PresentationNone={
	navigationEndpoint: E_VE3611;
	thumbnail: D_Thumbnail;
	badges: D_LiveBroadcastingBadge;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
};
type D_LiveChatTextMessage={
	message: G_Text;
	authorName: G_Text;
	authorPhoto: D_Thumbnail;
	contextMenuEndpoint: {};
	id: string;
	authorBadges?: R_LiveChatAuthorBadge[];
	timestampUsec: `${number}`;
	authorExternalChannelId: `UC${string}`;
	contextMenuAccessibility: D_Accessibility;
	timestampText: G_Text;
};
type D_MerchandiseItem={
	title: string;
	description: string;
	thumbnail: D_Thumbnail;
	price: `CA$${string}`;
	vendorName: string;
	trackingParams: string;
	buttonText: string;
	buttonCommand: E_VE83769_Url;
	accessibilityTitle: string;
	buttonAccessibilityText: string;
	fromVendorText: string;
	additionalFeesText: string;
	regionFormat: "REGIONAL_FORMAT_EU";
};
//#region D_GuideEntry
type D_GuideEntry_HelpService={
	icon: T_Icon<"HELP">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: E_SignalService_SendPost;
};
type D_GuideEntry_MyVideosTab={
	navigationEndpoint: E_VE83769_Url;
	icon: T_Icon<"MY_VIDEOS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
};
type D_GuideEntry_OfflineDownloadEntry={
	navigationEndpoint: E_VE42352;
	icon: T_Icon<"OFFLINE_DOWNLOAD">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Downloads">;
	targetId: "downloads-guide-item";
	isPrimary: true;
};
type D_GuideEntry_ShortsTab={
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: D_Accessibility;
	serviceEndpoint: T_SE_Signal<M_Empty_WCM,{}>|E_ReelWatch;
	isPrimary: true;
};
type D_GuideEntry_Subscriptions={
	navigationEndpoint: E_VE96368;
	icon: T_Icon<"SUBSCRIPTIONS">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Subscriptions">;
	isPrimary: true;
};
type D_GuideEntry_VideoLibrary={
	navigationEndpoint: E_VE6827;
	icon: T_Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Library">;
	targetId: "library-guide-item";
	isPrimary: true;
};
type D_GuideEntry_WatchHistory={
	navigationEndpoint: E_VE6827;
	icon: T_Icon<"WATCH_HISTORY">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"History">;
};
type D_GuideEntry_WatchLater={
	navigationEndpoint: E_VE5754;
	icon: T_Icon<"WATCH_LATER">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Watch Later">;
};
type D_GuideEntry_WhatToWatch={
	navigationEndpoint: E_VE3854;
	icon: T_Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: G_Text;
	accessibility: TD_Accessibility<"Home">;
	isPrimary: true;
};
type D_GuideEntry=
	|never
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
type D_GuideEntryData={guideEntryId: "WL"|"LL"|`UC${string}`|`PL${string}`;};
// COMPLETED: #13
type D_FeedNudge={
	lightIconImage: D_Thumbnail;
	title: G_Text;
	subtitle: G_Text;
	dismissButton: R_Button;
	impressionEndpoint: E_Feedback;
	trackingParams: string;
	style: "FEED_NUDGE_STYLE_CHIP";
	contents: R_ChipCloudChip[];
};
type D_YoutubeUrl=DU_InternalUrl["url"]|DU_ChannelUrl["url"];
//#region imported
type D_AboutThisAd={
	url: D_UrlWrappedValue;
	trackingParams: string;
};
type D_Accessibility={accessibilityData: D_Label;};
type D_AccountItemSection=Record<"contents",G_AccountItemSection[]>;
type D_AccountSettingIdList=[407];
type A_RemoveVideoByVideoId={
	action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID";
	removedVideoId: string;
};
type D_AdBreakService={
	prefetchMilliseconds: "10000";
	getAdBreakUrl: string;
};
type D_AdHoverTextButton={
	button: R_Button;
	hoverText: G_Text;
	trackingParams: string;
};
type D_AdLayout={serializedAdServingDataEntry: string;};
type D_AdPlacement={config: R_AdPlacementConfig; renderer: G_AdPlacementRendererItem;};
type D_AdPlacementConfig={
	kind: DE_AdPlacementKind;
	adTimeOffset?: D_AdTimeOffset;
	hideCueRangeMarker: true;
};
type D_AdTimeOffset={
	offsetStartMilliseconds: `${number}`;
	offsetEndMilliseconds: "-1";
};
type QualArr=[
	...make_qual_for_fps<50>,
	...make_qual_for_fps<60>,
	"1080p","720p","480p","360p","240p","144p",
];
type make_qual_for_fps<T extends 50|60>=[`2160p${T}`,`1440p${T}`,`1080p${T}`,`720p${T}`,];
type D_QualityLabel=QualArr[number];
type D_AddToPlaylist={playlists: R_PlaylistAddToOption[];}&T_Actions<R_AddToPlaylistCreate>;
type D_AnimationConfig={
	minImageUpdateIntervalMs: 10000|5000;
	crossfadeDurationMs: 5000;
	crossfadeStartOffset: 1;
	maxFrameRate: 30;
};
type D_AnySaved={[U in D_SD_UrlTypes]?: GD_SD_Item;};
type ApiFormatObj=[
	["youtubei",[["v1",[
	]]]]
];
type ApiNotificationLast=
	|"get_unseen_count"
	|"get_notification_menu"
	|"record_interactions"
	|"modify_channel_preference"
	;
;
type DG_ApiUrl=T_Split<T_SplitOnce<D_ApiPathFormat_1,"/">[1],"/">;
type D_ApiPathFormat_1=
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
	;
;
type D_AttBgChallenge={
	interpreterUrl?: T_UrlWrappedValue<`//www.google.com/js/th/${string}.js`>;
	interpreterHash: string;
	program: string;
	globalName: "trayride";
};
type D_AudioSampleRate=44100|48000;
type D_AudioTrackItem={
	captionTrackIndices: number[];
}|{
	captionTrackIndices: number[];
	defaultCaptionTrackIndex: number;
	visibility: "UNKNOWN";
	hasDefaultTrack: true;
	captionsInitialState: "CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED";
};
type D_AutoplaySwitchButton={
	onEnabledCommand: T_Setting_AutoNavForDesktop<true>;
	onDisabledCommand: T_Setting_AutoNavForDesktop<false>;
	enabledAccessibilityData: D_Accessibility;
	disabledAccessibilityData: D_Accessibility;
	trackingParams: string;
	enabled: boolean;
};
type D_Botguard={
	program: string;
	interpreterSafeUrl: T_UrlWrappedValue<`//www.google.com/js/th/${string}.js`>;
	serverEnvironment: number;
};
type D_BrowseEndpointPages=[
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
type D_BrowseFeedActions={contents: G_BrowseFeedContent[];};
type D_Browse_Id<T>={browseId: T;};
type D_ButtonStyleType=
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
type D_Cache_MD={isCacheHit: true;};
type D_CanShare={canShare: boolean;};
type D_CanonicalBaseUrl={canonicalBaseUrl: string;};
type D_TimedTextApi={
	v: D_VideoId;
	caps?: "asr";
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
type D_TimedTextApi_Req=Required<D_TimedTextApi>;
type D_CaptionTrackItem_BaseUrl=
	|`https://www.youtube.com/api/timedtext?v=${D_TimedTextApi["v"]}&caps=${D_TimedTextApi_Req["caps"]}&xoaf=${D_TimedTextApi["xoaf"]}&xosf=${D_TimedTextApi_Req["xosf"]}&hl=${D_TimedTextApi["hl"]}&ip=${D_TimedTextApi["ip"]}&ipbits=${D_TimedTextApi["ipbits"]}&expire=${D_TimedTextApi["expire"]}&sparams=${D_TimedTextApi["sparams"]}&signature=${D_TimedTextApi["signature"]}&key=${D_TimedTextApi["key"]}&kind=${D_TimedTextApi_Req["kind"]}&lang=${D_TimedTextApi["lang"]}`
	|`https://www.youtube.com/api/timedtext?v=${D_TimedTextApi["v"]}&caps=${D_TimedTextApi_Req["caps"]}&xoaf=${D_TimedTextApi["xoaf"]}&xoadf=${D_TimedTextApi_Req["xoadf"]}&xosf=${D_TimedTextApi_Req["xosf"]}&hl=${D_TimedTextApi["hl"]}&ip=${D_TimedTextApi["ip"]}&ipbits=${D_TimedTextApi["ipbits"]}&expire=${D_TimedTextApi["expire"]}&sparams=${D_TimedTextApi["sparams"]}&signature=${D_TimedTextApi["signature"]}&key=${D_TimedTextApi["key"]}&kind=${D_TimedTextApi_Req["kind"]}&lang=${D_TimedTextApi["lang"]}`
	;

type D_CaptionTrackItem={
	baseUrl: D_CaptionTrackItem_BaseUrl;
	name: G_Text;
	vssId: "a.en"|".en";
	languageCode: "en";
	kind?: "asr";
	isTranslatable: true;
};
type D_CarouselLockup={infoRows: R_InfoRow[];};
type D_ChannelHeaderLinks={
	primaryLinks: D_NavigationLinkItem[];
	secondaryLinks?: D_NavigationLinkItem[];
};
type ChannelSubUrlFormat=
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
type D_ChannelSwitcherHeader={
	title: G_Text;
	button: R_Button;
};
type D_ChannelSwitcherPage=Record<"contents",G_ChannelSwitcherContent[]>&{
	header: R_ChannelSwitcherHeader;
	targetId: "ceq";
};
type ChannelUrlFormat=[
	`/@${string}`,
][number];
type D_CinematicContainer={
	backgroundImageConfig?: D_ThumbnailsList;
	gradientColorConfig: D_GradientColorConfig;
	presentationStyle?: "CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED";
	config: {
		lightThemeBackgroundColor: 4278190080;
		darkThemeBackgroundColor: 4278190080;
		animationConfig: {
			minImageUpdateIntervalMs: 5000;
			crossfadeDurationMs: 5000;
			crossfadeStartOffset: 1;
			maxFrameRate: 30;
		};
		colorSourceSizeMultiplier: 1.4;
		applyClientImageBlur: true;
		bottomColorSourceHeightMultiplier: 0.67000002;
		maxBottomColorSourceHeight: 260;
		colorSourceWidthMultiplier: 1.5;
		colorSourceHeightMultiplier: 2;
		blurStrength: 5;
	};
};
type D_ClientForecastingAd={impressionUrls: T_BaseUrl<`https://www.youtube.com/api/stats/ads?${D_ApiStatsAdsStr}`>[];};
type D_ClientMessages={
	reconnectMessage: G_Text;
	unableToReconnectMessage: G_Text;
	fatalError: G_Text;
	reconnectedMessage: G_Text;
	genericError: G_Text;
};
type D_ClipAdState={
	title: G_Text;
	body: G_Text;
};
type D_ClipCreationScrubber={
	lengthTemplate: "$clip_length seconds";
	maxLengthMs: 60000;
	minLengthMs: 5000;
	defaultLengthMs: 15000;
	windowSizeMs: 120000;
	startAccessibility: D_Accessibility;
	endAccessibility: D_Accessibility;
	durationAccessibility: D_Accessibility;
};
type D_ClipCreationTextInput={
	placeholderText: G_Text;
	maxCharacterLimit: 140;
};
type D_ClipSection={contents: R_ClipCreation[];};
type D_Color={red: number; green: number; blue: number;};
type ColorSourceVars={
	colorSourceSizeMultiplier: 1.4;
	bottomColorSourceHeightMultiplier: 0.67;
	maxBottomColorSourceHeight: 260;
	colorSourceWidthMultiplier: 1.5;
	colorSourceHeightMultiplier: 2;
};
type D_CommentReplies={
	contents: R_ContinuationItem[];
	trackingParams: string;
	viewReplies: R_Button;
	hideReplies: R_Button;
	targetId: `comment-replies-item-${string}`;
};

type R_CommentReplies={
	commentRepliesRenderer: D_CommentReplies;
};
type D_CommentThread={
	comment: R_Comment;
	replies?: R_CommentReplies;
	trackingParams: string;
	renderingPriority: "RENDERING_PRIORITY_UNKNOWN";
	isModeratedElqComment: false;
	loggingDirectives: D_LoggingDirectives;
};
type D_CommentsSimplebox={
	simpleboxAvatar: D_Thumbnail;
	simpleboxPlaceholder: G_Text;
	trackingParams: string;
};

type R_CommentsSimplebox={
	commentsSimpleboxRenderer: D_CommentsSimplebox;
};
type D_CommentsEntryPointHeader={
	headerText: G_Text;
	onTap: C_CommandExecutor;
	trackingParams: string;
	commentCount?: G_Text;
	contentRenderer: R_CommentsEntryPointTeaser|R_CommentsSimplebox;
	targetId: "comments-entry-point-header-identifier";
};
type D_CommentsEntryPointHeader_contentRenderer=D_CommentsEntryPointHeader["contentRenderer"];
type D_CommentsHeader={
	countText?: G_Text;
	createRenderer: R_CommentSimplebox;
	sortMenu: R_SortFilterSubMenu;
	trackingParams: string;
	titleText: G_Text;
	commentsCount: G_Text;
	showSeparator: true;
	customEmojis: D_CustomEmoji[];
	unicodeEmojisUrl: string;
	loggingDirectives: D_LoggingDirectives;
};
type D_CommentsHeaderContent={
	continuationItems: [
		R_CommentsHeader
	];
};
type D_CommonConfig={url: `https://rr5---sn-nx57ynsd.googlevideo.com/initplayback?${string}`;};
type D_CompactLinkStyle=[
	`${"COMPACT_LINK_STYLE_TYPE"}_${[
		"SETTINGS_SIDEBAR",
		"ACCOUNT_SWITCHER_FOOTER"
	][number]}`,
	"COMPACT_LINK_STYLE_TYPE_CREATION_MENU",
][number];
type DS_CreatePlaylist={
	params?: string;
	videoIds: string[];
};
type D_CustomEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: D_EmojiImage;
	isCustomEmoji: boolean;
};
type D_DarkColorPalette={
	primaryTitleColor: number;
	secondaryTitleColor: number;
	section1Color?: number;
	section2Color: number;
	section3Color?: number;
	section4Color: number;
};
type D_ProtobufWireFormat=[fieldId: number,wireType: number,arr: D_ProtobufObj[]];
type D_ProtobufObj=
	|[type: "data32",fieldId: number,value: number]
	|[type: "data_fixed32",fieldId: number,value: number]
	|[type: "data64",fieldId: number,as_arr: number[],value: bigint]
	|[type: "data_fixed64",fieldId: number,value: bigint]
	|[type: "info",fieldId: number,value: number]
	|[type: "child",fieldId: number,as_arr: Uint8Array,parsed_value: D_ProtobufObj[]|null]
	|[type: "struct",fieldId: number,arr: D_ProtobufObj[]]
	|[type: "group",fieldId: number,arr: D_ProtobufObj[]]
	|[type: "error",fieldId: number];
type D_DesktopWatchAds={
	// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
	gutParams: B_TagObj<"\\4061\\ytpwmpu">;
	playerAdParams: D_PlayerAdParams;
	showCompanion: true;
	showInstream: true;
	useGut: true;
};
type D_Dropdown_Privacy={
	entries: R_PrivacyDropdownItem[];
	label: "Privacy";
};
type D_Dropdown=D_Dropdown_Privacy;
type D_CanDelete={canDelete: boolean;};
type D_ElementResourceStatus={
	identifier: "bottom_sheet_list_option.eml|cd39732d53f1132c"|
	"track_selection_sheet_option.eml|f3619d8bb085c9a9";
	status: "ELEMENTS_RESOURCE_STATUS_ATTACHED";
};
type D_ElementUpdate=R_TemplateUpdate|R_ResourceStatusInResponseCheck;
// [ELEMENT::structured-description-music-section::@::row-state-id]
type D_Element_StructuredDescription=T_ElementId<
	"structured-description-music-section",T_ElementId<
		[
			"artists",
			"licenses"
		][number],"row-state-id"
	>
>;
type D_EmojiImage={
	accessibility: D_Accessibility;
	thumbnails: D_ThumbnailItem[];
};
type D_Endscreen={
	elements: R_EndscreenElement[];
	startMs: `${number}`;
	trackingParams: string;
};
type D_EngagementSectionPanelId=T_TargetIdStr<"engagement-panel",[
	"clip-create",
	"structured-description"
][number]>|
	"comment-item-section"|
	string&{_tag: "string";};
type D_Enum_GuideAction=T_EnumStr<"GUIDE_ACTION","ADD_TO_PLAYLISTS"|
	"ADD_TO_SUBSCRIPTIONS"
>;
type D_ExpandableTab={
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
type D_ExpandableVideoDescriptionBody={
	descriptionBodyText?: G_Text;
	showMoreText?: G_Text;
	showLessText?: G_Text;
};
// spell:ignore trackclk aclk
type D_ExternalUrlFormat=[
	`https://ad.doubleclick.net/ddm/trackclk/${string}`,
	`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`,
	`https://music.youtube.com${"/"|""}`,
	`${"https:"}//${GV_SubDomain}.googlevideo.com/initplayback?${string}`,
	D_CommonConfig["url"],
	`https://studio.youtube.com${"/"|""}`,
	`https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273`,
	`https://www.google.com/get/videoqualityreport/`,
	`https://www.googleadservices.com/pagead/aclk?${string}`,
	// ApiStatsAdsArgs
	`https://www.youtube.com/api/stats/ads?${string}`,
	`https://www.youtubekids.com${"/"|""}?source=youtube_web`,
	`https://yt${number}.ggpht.com/${string}=s88-c-k-c0x00ffffff-no-rj`,
	`https://www.gstatic.com/youtube/img/watch/yt_music_channel.jpeg`
][number];
type D_Factoid={
	value: G_Text;
	label: G_Text;
	accessibilityText: string;
};
type D_FancyDismissibleDialog={
	dialogMessage: G_Text;
	title?: G_Text;
	confirmLabel: G_Text;
	trackingParams: string;
};
type D_FeedTabbedHeader={title: G_Text;};
type D_FeedbackResponseItem=D_FeedbackResponseProcessedStatus;
type D_FeedbackResponseProcessedStatus={isProcessed: true;};
type D_FormatColorInfo={
	primaries?: "COLOR_PRIMARIES_BT709";
	transferCharacteristics: "COLOR_TRANSFER_CHARACTERISTICS_BT709";
	matrixCoefficients?: "COLOR_MATRIX_COEFFICIENTS_BT709";
};
type G_GetAccountMenuItem=MP_NotificationsMenu|MP_AccountMenu;
type D_GhostGrid={rows: number;};
type D_GoogleLoginExternalUrl={url: "https://accounts.google.com/AddSession?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3D%252F&hl=en-GB&passive=false&service=youtube&uilel=0";}["url"];
//cspell:ignore ynlk ynsd ynse ynsk ynsl ynss ynsz
type D_GoogleVideo_sn_nx_dig_src=[
	"rr1.sn-nx57ynlk.googlevideo.com. 1755 IN A      74.125.5.166",
	"rr1.sn-nx57ynsd.googlevideo.com. 1595 IN A      173.194.56.166",
	"rr1.sn-nx57ynse.googlevideo.com. 705 IN A       173.194.56.6",
	"rr1.sn-nx57ynsk.googlevideo.com. 345 IN A       173.194.56.198",
	"rr1.sn-nx57ynsl.googlevideo.com. 1672 IN A      173.194.56.38",
	"rr1.sn-nx57ynss.googlevideo.com. 1756 IN A      173.194.56.70",
	"rr1.sn-nx57ynsz.googlevideo.com. 1202 IN A      173.194.56.102",
	"rr1.sn-nx5s7n76.googlevideo.com. 1141 IN A      74.125.5.6",
	"rr1.sn-nx5s7n7d.googlevideo.com. 1755 IN A      74.125.5.38",
	"rr1.sn-nx5s7n7s.googlevideo.com. 1755 IN A      173.194.152.6",
	"rr1.sn-nx5s7n7y.googlevideo.com. 1168 IN A      74.125.5.198",
	"rr1.sn-nx5s7n7z.googlevideo.com. 758 IN A       173.194.152.166",
	"rr1.sn-nx5s7nee.googlevideo.com. 1666 IN A      74.125.5.230",
	"rr1.sn-nx5s7nel.googlevideo.com. 1754 IN A      173.194.56.134"
];
type D_GradientColorConfig=[
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
type D_GradientColorConfigEnd={
	darkThemeColor: TP_Color<0xff000000,"0xff000000">;
	startLocation: 1;
};
type D_GradientColorConfigItem=D_GradientColorConfigStart|D_GradientColorConfigMid|D_GradientColorConfigEnd;
type D_GradientColorConfigMid={darkThemeColor: TP_Color<0x7f000000,"0x7f000000">;};
type D_GradientColorConfigStart={
	darkThemeColor: TP_Color<0x99000000,"0x99000000">;
	startLocation: 0;
};
type D_GuideCollapsibleEntry={
	expanderItem: R_GuideEntry;
	expandableItems: R_GuideEntry[];
	collapserItem: R_GuideEntry;
};
type D_GuideCollapsibleSectionEntry={
	headerEntry: R_GuideEntry;
	expanderIcon: T_Icon<"EXPAND">;
	collapserIcon: T_Icon<"COLLAPSE">;
	sectionItems: G_GuideSectionItem[];
	handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS","GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"];
};
type D_GuideSection={
	items: G_GuideSectionItem[];
	trackingParams: string;
	formattedTitle?: G_Text;
};
type D_GuideSubscriptionsSection={
	sort: "CHANNEL_ACTIVITY";
	items: G_GuideSubscriptionsSectionItem[];
	trackingParams: string;
	formattedTitle: G_Text;
	handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"];
};
type D_HasSeparator={hasSeparator: boolean;};
type D_HeartbeatParams={
	intervalMilliseconds: `${number}`;
	softFailOnError: false;
	heartbeatServerData: string;
};
type D_HeatSeekerItemData={
	trackingParams: string;
	heatmap: R_Heatmap;
};
type D_Heatmap={
	maxHeightDp: 40;
	minHeightDp: 4;
	showHideAnimationDurationMillis: 200;
	heatMarkers: {heatMarkerRenderer: {};}[];
	heatMarkersDecorations: {timedMarkerDecorationRenderer: {};}[];
};
type D_HideEnclosingContainer={hideEnclosingContainer: true;};
type D_Hint={
	hintId: "sponsor-pre-purchase";
	dwellTimeMs: "60000";
	hintCap: D_ImpressionCap;
	trackingParams: string;
};
type D_HistoryEntryTime={entryTime: number;};
type D_HorizontalCardList={
	cards: R_MacroMarkersListItem[];
	trackingParams: string;
	header: R_RichListHeader;
	style: T_StyleType<G_CardList_StyleType>|{type: G_CardList_StyleType;};
	centerItems: false;
};
type D_HotkeyDialog={
	title: G_Text;
	sections: R_HotkeyDialogSection[];
	dismissButton: R_Button;
	trackingParams: string;
};
type D_HotkeyDialogSection={
	title: G_Text;
	options: R_HotkeyDialogSectionOption[];
};
type D_HotkeyDialogSectionOption={
	label: G_Text;
	hotkey: string;
}|{
	label: G_Text;
	hotkey: string;
	hotkeyAccessibilityLabel: D_Accessibility;
};
type D_ImpressionCap={impressionCap: "1";};
type D_ImpressionCommand={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://www.youtube.com/pagead/adview?${string}`>[];
	pingingEndpoint: B_Hack;
};
type D_ClickLocationTarget={
	location: "PROMOTED_SPARKLES_CLICK_LOCATION_AD_BADGE";
	code: 31;
	behaviorType: "PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE_OPEN_AD";
};
type E_Pinging={
	clickTrackingParams: string;
	loggingUrls: T_BaseUrl<`https://pagead2.googlesyndication.com/pcs/activeview?xai=${string}&sai=${string}&sig=${string}&cid=${string}&acvw=[VIEWABILITY]`|`https://googleads.g.doubleclick.net/pagead/interaction/?ai=${string}&sigh=${string}&label=noop_tap`>[];
	pingingEndpoint: B_Hack;
};
type D_EmptyMap={emptyMap: true;};
type D_ActiveView={
	viewableCommands: E_Pinging[];
	endOfSessionCommands: E_Pinging[];
	regexUriMacroValidator: D_EmptyMap;
};

type D_PromotedSparklesWeb={
	thumbnail: D_Thumbnail;
	icon: T_Icon<"EXTERNAL_LINK">;
	title: G_Text;
	description: G_Text;
	websiteText: G_Text;
	actionButton: R_Button;
	navigationEndpoint: E_VE83769_Url;
	impressionCommands: D_ImpressionCommand[];
	noopTapEndpoints?: E_Pinging[];
	menu: R_Menu;
	activeView?: D_ActiveView;
	trackingParams: string;
	clickLocationTargets: D_ClickLocationTarget[];
	adBadge?: RMD_Badge;
};
type D_InFeedAdLayout={adLayoutMetadata: MG_AdLayout; renderingContent: R_PromotedSparklesWeb|R_DisplayAd;};
type D_LinearAdSequence={adLayoutMetadata: MG_AdLayout; linearAds: G_LinearAdsItem[];};
type D_AdSlotAndLayoutItem={adLayoutMetadata: MG_AdLayout[]; adSlotMetadata: DMD_AdSlot;};
type D_InfoRow={
	title: G_Text;
	defaultMetadata?: G_Text;
	expandedMetadata?: G_Text;
	expandIcon?: T_Icon<"EXPAND">;
	trackingParams: string;
	infoRowExpandStatusKey?: D_Element_StructuredDescription;
};
type D_InstreamVideoAd={
	skipOffsetMilliseconds: number;
	pings: {};
	clickthroughEndpoint: {};
	csiParameters: {}[];
	playerVars: string;
	playerOverlay: {};
	elementId: string;
	trackingParams: string;
	legacyInfoCardVastExtension: string;
	sodarExtensionData: {};
	externalVideoId: string;
	adLayoutLoggingData: {};
	layoutId: string;
};
type D_InvalidationId={
	objectSource: number;
	objectId: string;
	topic: `chat~${string}~${number}`;
	subscribeToGcmTopics: boolean;
	protoCreationTimestampMs: `${number}`;
};
type D_ItemSectionHeader={
	title: G_Text;
	subtitle: G_Text;
};
type D_Label={label: string;};
type D_Letters=T_Split<"abcdefghijklmnopqrstuvwxyz","">[number];
type D_LikeApi={videoId: string;}|{playlistId: SD_PlaylistId;};
type D_LiveBroadcastDetails={
	isLiveNow: true;
	startTimestamp: string;
}|{
	isLiveNow: false;
	startTimestamp: string;
	endTimestamp: string;
};
type D_LiveBroadcastingBadge={liveBroadcasting: boolean;};
type D_LiveChatAuthorBadge={
	icon: T_Icon<"MODERATOR">;
	tooltip: string;
	accessibility: D_Accessibility;
};
type D_LiveChatEmoji={
	emojiId: `UC${string}/${string}`;
	shortcuts: `:${string}:`[];
	searchTerms: string[];
	image: D_EmojiImage;
	isCustomEmoji: boolean;
	isLocked: boolean;
};
type D_LiveChatPlaceholderItem={
	id: string;
	timestampUsec: `${number}`;
};
type D_LiveChatViewerEngagementMessage={
	id: string;
	timestampUsec: `${number}`;
	icon: T_Icon<"YOUTUBE_ROUND">;
	message: G_Text;
	actionButton: R_Button;
	trackingParams: string;
};
type D_LoggingUrl={baseUrl: string;};
type D_MP_MenuNotificationSection={trackingParams: string; items: GR_MP_MenuNotificationSection_Item[];};
type D_MP_MenuStyle={style: DE_MP_MenuStyle;};
type D_MP_Menu_Section={
	notification_menu: R_MP_MenuNotificationSection;
	account_section_list: R_AccountSectionList;
	page_menu: TR_MP_MenuSection<R_CompactLink>;
};
type D_MP_Menu_Sections_Items=D_MP_Menu_Section[keyof D_MP_Menu_Section];
type D_MacroMarkersList={
	contents: R_MacroMarkersListItem[];
	syncButtonLabel: G_Text;
	trackingParams: string;
};
type D_VideoLike_richThumbnail=R_MovingThumbnail;
type D_MenuServiceIcon={icon: T_Icon<"FLAG">;};
type D_MenuServiceIconTypeStr=[
	"SUBTITLES",
	"PLAYLIST_ADD",
	"VISIBILITY_OFF",
	"SHARE",
	"ALIGN_LEFT"
][number]|"WATCH_LATER"|"NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE"|(D_MenuServiceIcon['icon']['iconType']);
type D_MenuServiceItem<T_EI>={
	text: G_Text;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
type D_MenuServiceItem_Icon<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
type D_MenuServiceItem_Separated<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
	hasSeparator: true;
};
type D_MerchandiseShelf={
	title: string;
	items: R_MerchandiseItem[];
	trackingParams: string;
	showText: string;
	hideText: string;
	actionButton: R_Menu;
};
type D_Microformat={
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
type D_MicroformatEmbed={
	iframeUrl: `https://www.youtube.com/embed/${string}`;
	flashUrl: `http://www.youtube.com/v/${string}?version=3&autohide=1`;
	width: number;
	height: number;
	flashSecureUrl: `https://www.youtube.com/v/${string}?version=3&autohide=1`;
};
type D_ModifiedSetItem={
	autoplayVideo?: E_WatchPlaylist;
	nextButtonVideo?: E_WatchPlaylist;
	previousButtonVideo?: E_WatchPlaylist;
};
type D_MovingThumbnail={
	movingThumbnailDetails?: D_Thumbnail|D_MovingThumbnail_Thumbnails;
	enableHoveredLogging: true;
	enableOverlay: true;
};
type D_MovingThumbnailDetails={
	thumbnails: D_ThumbnailItem[];
	logAsMovingThumbnail: boolean;
};
type D_MovingThumbnail_Thumbnails={
	thumbnails: {
		url: string;
		width: 320;
		height: 180;
	}[];
	logAsMovingThumbnail: true;
};
type T_Key<T>={key: T;};
type D_MultiMarkersPlayerBar={
	visibleOnLoad: T_Key<"DESCRIPTION_CHAPTERS"|"">;
	markersMap: [R_DescriptionChaptersItem,R_HeatSeekerItem];
};
type D_MusicCarouselShelf=Record<"contents",{}[]>&{
	header: {};
	trackingParams: string;
	itemSize: "COLLECTION_STYLE_ITEM_SIZE_MEDIUM";
};
type D_MusicQueue=Partial<Record<"content",R_PlaylistPanel>>&B_Hack;
type D_MusicShelf=Record<"contents",R_MusicResponsiveListItem[]>&{
	title: G_Text;
	trackingParams: string;
	continuations: CD_Reload[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};
type D_MusicThumbnail={
	thumbnail: D_Thumbnail;
	thumbnailCrop: "MUSIC_THUMBNAIL_CROP_UNSPECIFIED";
	thumbnailScale: "MUSIC_THUMBNAIL_SCALE_UNSPECIFIED";
	trackingParams: string;
};
type D_NotchesItem={
	linearGradientCssStyle?: string;
	knobColorArgb: 4280191205;
	purchaseCommand: E_YpcGetCart;
	tierValue: G_Text;
};
type D_NotificationMenuPopupMenuItem={
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
	showLoadingSpinner: true;
};
type D_PopupItemMenu={
	header: R_SimpleMenuHeader;
	sections: D_NotificationMenu_Popup_SectionItem[];
	style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS";
	trackingParams: string;
};
type D_NotificationMenu_Popup_SectionItem=R_MP_MenuNotificationSection;
type D_NotificationText={
	successResponseText: G_Text;
	undoText: G_Text;
	undoEndpoint: E_UndoFeedback;
	trackingParams: string;
}|{
	successResponseText: G_Text;
	trackingParams: string;
};
type D_OptionAv1Options={
	id: "SETTINGS_OPTIONS_ID_TYPE_AV1_OPTIONS";
	options: G_SettingsOptionItem[];
	title: G_Text;
	hidden: true;
};
type D_OptionWithText={
	options: G_SettingsOptionItem[];
	title: G_Text;
	text: G_Text;
};
type D_PageIntroduction={
	bodyText: G_Text;
	headerIcon: T_Icon<"ACCOUNT_ADVANCED">|T_Icon<"ACCOUNT_SHARING">;
	headerText: G_Text;
	pageTitle: G_Text;
};
type PageTypeList=[
	"watch",
	"browse",
	"channel",
	"playlist",
	"settings",
	"shorts"
];
type D_PdgBuyFlow={
	header: R_PdgBuyFlowHeader;
	content: R_SuperVodBuyFlowContent[];
	trackingParams: string;
	onCloseCommand: C_GetSurvey;
};
type D_PdgBuyFlowHeader={
	text: G_Text;
	helpButton: R_Button;
	dismissButton: R_Button;
};
type D_PdgCommentOption={
	commentText: G_Text;
	chipRenderer: R_PdgCommentChip;
};
type D_PlayabilityStatus={
	status: "OK";
	playableInEmbed: boolean;
	offlineability?: R_Button;
	miniplayer?: R_Miniplayer;
	contextParams: string;
};
type D_PlaybackTracking={
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
type D_PlayerAdParams={
	enabledEngageTypes: string;
	showContentThumbnail: boolean;
};
type D_PlayerAnnotationsExpanded={
	featuredChannel: D_FeaturedChannel;
	allowSwipeDismiss: boolean;
	annotationId: D_UUIDString;
};
type D_PlayerAttestation={
	challenge: string;
	botguardData: D_Botguard;
};
type D_PlayerCaptionsTracklist={
	captionTracks: D_CaptionTrackItem[];
	audioTracks: D_AudioTrackItem[];
	translationLanguages: D_TranslationLanguage[];
	defaultAudioTrackIndex: number;
	openTranscriptCommand?: A_ChangeEngagementPanelVisibility;
};
type D_PlayerLiveStoryboardSpec={spec: string;};
type D_PlayerMicroformat={
	thumbnail: D_Thumbnail;
	embed?: D_MicroformatEmbed;
	title: G_Text;
	description?: G_Text;
	lengthSeconds: `${number}`;
	ownerProfileUrl: `http://www.youtube.com/channel/UC${string}`;
	externalChannelId: D_ChannelId;
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
type D_PlayerOverlay={
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
type D_PlayerOverlayAutoplay={
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
type D_PlayerOverlayVideoDetails={
	title: G_Text;
	subtitle: G_Text;
};
type D_PlayerStoryboardSpec={spec: string;};
type D_PlaylistAddToOption={
	playlistId: SD_PlaylistId;
	title: G_Text;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit;
	trackingParams: string;
};
type D_PlaylistByline={text: G_Text;};
type D_InlineForm={
	formField: R_TextInputFormField;
	editButton: R_Button;
	saveButton: R_Button;
	cancelButton: R_Button;
	textDisplayed: G_Text;
	style: "INLINE_FORM_STYLE_TITLE";
};
type R_InlineForm={inlineFormRenderer: D_InlineForm;};
type D_DropdownFormField={
	dropdown: R_Dropdown;
	key: "playlistEditEndpoint.actions.0.playlistPrivacy";
	onChange: E_PlaylistEdit;
};
type R_DropdownFormField={dropdownFormFieldRenderer: D_DropdownFormField;};

type D_PlaylistHeader={
	playlistId: SD_PlaylistId;
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
};
type D_PlaylistSidebar={
	items: G_PlaylistSidebarItem[];
	trackingParams: string;
};
type D_PlaylistSidebarSecondaryInfo={videoOwner: R_VideoOwner;};
type D_PlaylistVideoList={
	playlistId: "WL";
	sortFilterMenu: R_SortFilterSubMenu;
	targetId: "WL";
	trackingParams: string;
};
type D_PlaylistVideoThumbnail={
	thumbnail: D_Thumbnail;
	trackingParams: string;
};
type D_PrefetchHintConfig={
	prefetchPriority: 0;
	countdownUiRelativeSecondsPrefetchCondition: -3;
}|{
	prefetchPriority: 0;
	playbackRelativeSecondsPrefetchCondition: -3;
};
type D_NavigationLinkItem={
	navigationEndpoint: E_VE83769_Url;
	icon: D_Thumbnail;
	title: G_Text;
};
type D_PrivacyDropdownItem={
	label: G_Text;
	icon: T_Icon<"PRIVACY_PUBLIC">;
	description: G_Text;
	int32Value: 1;
	isSelected: false;
	accessibility: D_Label;
};
type D_ProductList={
	contents: R_ProductListItem[];
	trackingParams: string;
};
type D_ProductListItem={
	title: G_Text;
	accessibilityTitle: string;
	thumbnail: D_Thumbnail;
	price: `CA$${string}`;
	onClickCommand: E_VE83769_Url;
	trackingParams: string;
	loggingDirectives: D_LoggingDirectives;
};
type D_ProfileColumnUserInfo={
	title: G_Text;
	thumbnail: D_Thumbnail;
};
type D_ProfilePageHeaderInformation={
	title: R_ProfilePageHeaderTitleViewModel;
	metadata: R_ProfilePageHeaderMetadataViewModel;
	thumbnail: R_ProfilePageHeaderThumbnailViewModel;
	alignment: string;
	onTap: C_Innertube;
};
type D_ProfilePageHeaderTitle_Content={content: string;};
type D_ProfilePageHeaderTitle={title: D_ProfilePageHeaderTitle_Content;};
type D_RadioButtonSurveyOption={
	option: {};
	submissionEndpoint: {};
	enumName: T_Split<"ANSWER_VWT_INLINE_REGRET_WATCHING,ANSWER_VWT_INLINE_DONT_REGRET_WATCHING,ANSWER_VWT_INLINE_DONT_REGRET_WATCHING,ANSWER_VWT_INLINE_REGRET_WATCHING">[number];
	trackingParams: string;
};
type D_Range={
	start: `${number}`;
	end: `${number}`;
};
type D_RatingSurvey={
	ratings: R_RatingSurveyOption[];
	trackingParams: string;
	notSureButton: R_Button;
	undoButton: R_Button;
	notSureEndpoint: {};
};
type D_RatingSurveyOption={
	responseText: G_Text;
	defaultStateIcon: T_Icon<"STAR_BORDER">;
	onStateIcon: T_Icon<"STAR">;
	followUpCommand: C_FollowUp;
	responseEndpoint: {};
	trackingParams: string;
	checked: boolean;
	selected: boolean;
};
type D_ReelItem={
	videoId: D_VideoIdTagStr;
	headline: G_Text;
	thumbnail: D_Thumbnail;
	viewCountText: G_Text;
	navigationEndpoint: E_ReelWatch;
	menu: R_Menu;
	trackingParams: string;
	accessibility: D_Accessibility;
	style: "REEL_ITEM_STYLE_AVATAR_CIRCLE";
	videoType: "REEL_VIDEO_TYPE_VIDEO";
	loggingDirectives: D_LoggingDirectives;
};
type D_ReelPlayerHeader={
	reelTitleText: G_Text;
	timestampText: G_Text;
	channelNavigationEndpoint: E_VE3611;
	channelTitleText: G_Text;
	channelThumbnail: D_Thumbnail;
	trackingParams: string;
	accessibility: D_Accessibility;
};
type D_ReelShelf={
	title: G_Text;
	items: R_ReelItem[];
	trackingParams: string;
	icon: T_Icon<"YOUTUBE_SHORTS_BRAND_24">;
};
type D_ReflowOptions={
	minimumRowsOfVideosAtStart: 2;
	minimumRowsOfVideosBetweenSections: 1;
};
type D_ResState={
	active: boolean;
	resolver: () => void;
};
type D_ResourceStatusInResponseCheck={
	resourceStatuses: D_ElementResourceStatus[];
	serverBuildLabel: `boq_youtube-watch-ui_${number}.${string}_p${number}`;
};
type D_ResponsePageUrlList=[
	`/${G_SettingsEndpointPages}`
];
type Todo_D_RichGrid=Record<"contents",G_RendererContentItem[]>&{masthead: R_VideoMastheadAdV3;};
type D_RichGrid={
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
type D_RichItem={
	content: G_RichItemContent;
	trackingParams: string;
	rowIndex: number;
	colIndex: number;
}|{
	content: G_RichItemContent;
	trackingParams: string;
};
type D_RichListHeader={
	title: G_Text;
	trackingParams: string;
	navigationButton: R_Button;
};
type D_RootVisualElementType=[
	3611,
	3832,
	3854,
	6827,
	11487,
	23462,
	83769,
	96368,
][number];
type D_RunAttestation={
	ids: D_ExternalChannelId[];
	engagementType: "ENGAGEMENT_TYPE_SUBSCRIBE";
};
type D_Saved={
	any_data?: D_AnySaved;
	ad_layout_data?: D_AdLayout;
	data?: {[x: string]: ({}[])|undefined;};
};
type D_SearchBox={
	endpoint: E_VE6827;
	searchButton: R_Button;
	clearButton: R_Button;
	placeholderText: G_Text;
	trackingParams: string;
};
type D_SearchPyv={
	ads: R_AdSlot[];
	trackingParams: string;
};
type D_SearchResultsTab={
	endpoint?: E_VE4724_Search;
	title: string;
	selected?: boolean;
	content: R_SectionList;
	tabIdentifier: string;
	trackingParams: string;
};
type D_SegmentedLikeDislikeButton={
	likeButton: R_ToggleButton;
	dislikeButton: R_ToggleButton;
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
type D_SerializedSlotAdServingDataEntry={serializedSlotAdServingDataEntry: string;};
type D_SetSetting={
	settingItemId: `${number}`;
	boolValue?: boolean;
	settingItemIdForClient: G_SettingItemIdEnum;
};
type D_SettingsCheckbox={
	title: G_Text;
	helpText?: G_Text;
	enabled: boolean;
	enableServiceEndpoint: {};
	disableServiceEndpoint: {};
	disabled: boolean;
};
type D_SettingsOptions={options: G_SettingsOptionItem[]; title: G_Text;};
type D_SettingsRadioOption={
	id: "SETTINGS_OPTIONS_ID_TYPE_AV1_SD"|"SETTINGS_OPTIONS_ID_TYPE_AV1_ALWAYS";
	title: G_Text;
	helpText?: G_Text;
	hidden: boolean;
};
type D_SettingsSidebar={
	title: G_Text;
	items: R_CompactLink[];
};
type D_SettingsSwitch={
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
type D_Shelf=Record<"content",G_ShelfItem>&{
	title: {};
	trackingParams: string;
	menu?: {};
	subscribeButton?: {};
};
type D_SimpleMenuHeader={
	title: G_Text;
	buttons: R_Button[];
};
type D_StreamSelectionConfig={maxBitrate: `${number}`;};
type D_StructuredDescriptionContent={items: G_StructuredDescriptionContentItem[];};
type D_SubFeedSelector={
	title: G_Text;
	options: R_SubFeedOption[];
	trackingParams: string;
};
type D_SubscriptionButton={
	type: "FREE";
	subscribed?: boolean;
};
type D_TabbedSearchResults={tabs: R_SearchResultsTab[];};
type D_TemplateUpdate={
	identifier: `track_selection_sheet_option.eml|${string}`;
	serializedTemplateConfig: string;
	dependencies: [`bottom_sheet_list_option.eml|${string}`];
}|{
	identifier: `bottom_sheet_list_option.eml|${string}`;
	serializedTemplateConfig: string;
};
type D_TemplatedText={
	text: string;
	isTemplated: false;
	trackingParams: string;
};
type D_TextInputFormField={
	label: G_Text;
	maxCharacterLimit: 150;
	placeholderText: string;
	validValueRegexp: "[^<>]*";
	invalidValueErrorMessage: G_Text;
	required: true;
};
type D_ThemeBackgroundVars={
	lightThemeBackgroundColor: TP_Color<0xffffff,"0xffffff">;
	darkThemeBackgroundColor: TP_Color<0xff000000,"0xff000000">;
};
type D_ThumbnailColor=D_Color;
type D_ThumbnailItem={
	url: string;
	width?: number;
	height?: number;
};
type D_ThumbnailOverlayBottomPanel={icon: T_Icon<"MIX">;};
type D_ThumbnailOverlayEndorsement={
	text: G_Text;
	trackingParams: string;
};
type D_ThumbnailOverlayHoverText={
	text: G_Text;
	icon: T_Icon<"PLAY_ALL">;
};
type D_ThumbnailOverlayLoadingPreview={text: G_Text;};
type D_ThumbnailOverlayNowPlaying={text: G_Text;};
type D_ThumbnailOverlayResumePlayback={percentDurationWatched: Percent;};
type Percent=[
	10|100,
][number];
type tz<T extends (any[]|undefined)>=NonNullable<T>[number];
type D_ThumbnailOverlaySidePanel_iconTypes=[
	"PLAY_ALL",
	"PLAYLISTS",
];
type D_ThumbnailOverlaySidePanel={
	text: G_Text;
	icon: T_Icon<D_ThumbnailOverlaySidePanel_iconTypes[number]>;
};
type D_ThumbnailOverlayTimeStatus=D_ThumbnailOverlayTimeStatus_1|D_ThumbnailOverlayTimeStatus_2|D_ThumbnailOverlayTimeStatus_3;
type D_ThumbnailOverlayTimeStatus_1={
	text: G_Text;
	style: "DEFAULT";
};
type D_ThumbnailOverlayTimeStatus_2={
	text: G_Text;
	style: "LIVE";
	icon: T_Icon<"LIVE">;
};
type D_ThumbnailOverlayTimeStatus_3={
	text: G_Text;
	style: "SHORTS";
	icon: T_Icon<"YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16">;
};
type D_ThumbnailOverlayToggleButton=D_ThumbnailOverlayToggleButton_1|D_ThumbnailOverlayToggleButton_2;
type D_ThumbnailOverlayToggleButton_1={
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
type D_ThumbnailOverlayToggleButton_2={
	untoggledIcon: T_Icon<"ADD_TO_QUEUE_TAIL">;
	toggledIcon: T_Icon<"PLAYLIST_ADD_CHECK">;
	untoggledTooltip: "Add to queue";
	toggledTooltip: "Added";
	untoggledServiceEndpoint: E_SignalService_SendPost;
	untoggledAccessibility: D_Accessibility;
	toggledAccessibility: D_Accessibility;
	trackingParams: string;
};
type D_TimestampWithNanos={
	seconds: `${number}`;
	nanos: number;
};
type T_Id<T>={id: T;};
type D_ToggleButtonIdData=T_Id<"TOGGLE_BUTTON_ID_TYPE_LIKE">;
type R_ToggleButtonIdData={toggleButtonIdData: D_ToggleButtonIdData;};
type T_SizeType<T>={sizeType: T;};
type D_ToggleMenuServiceItem={
	defaultText: G_Text;
	defaultIcon: T_Icon<"LIBRARY_ADD">;
	defaultServiceEndpoint: E_Like;
	toggledText: G_Text;
	toggledIcon: T_Icon<"LIBRARY_REMOVE">;
	toggledServiceEndpoint: E_Like;
	trackingParams: string;
	isToggled: boolean;
};
type D_Token={token: string;};
type D_TokenJarDefaultExpirationSeconds=600;
type D_TopbarLogo={
	iconImage: T_Icon<"YOUTUBE_LOGO">;
	tooltipText: G_Text;
	endpoint: E_VE3854;
	trackingParams: string;
	overrideEntityKey: string;
};
type D_TopbarMenu={
	sections: [TR_MP_MenuSection<R_CompactLink>];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
};
type D_TopbarMenuButton={
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
type D_TopicLink={
	title: G_Text;
	thumbnailDetails: D_Thumbnail;
	endpoint: E_VE3611;
	callToActionIcon: T_Icon<"CHEVRON_RIGHT">;
	trackingParams: string;
};
type D_TrackingParams={trackingParams: string;};
type D_Transcript=Record<"content",R_TranscriptSearchPanel>&{trackingParams: string;};
type D_TranscriptFooter={languageMenu: R_SortFilterSubMenu;};
type D_TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: G_Text;
	startTimeText: G_Text;
	trackingParams: string;
	accessibility: D_Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};
type D_TranscriptSegmentList={
	initialSegments: R_TranscriptSegment[];
	noResultLabel: G_Text;
	retryLabel: G_Text;
	touchCaptionsEnabled: boolean;
};
type D_TranslationLanguage={
	languageCode: string;
	languageName: G_Text;
};
type D_TriggerCriteria={
	connectionWhitelist: [D_ConnectionWhitelistItem];
	joinLatencySeconds: 15;
	rebufferTimeSeconds: 10;
	watchTimeWindowSeconds: 180;
	refractorySeconds: 2592000;
};
type D_TwoColumnBrowseResults={
	tabs: RG_Result[];
	secondaryContents?: G_SecondaryContents;
};
type D_TwoColumnSearchResults={primaryContents: R_SectionList;};
type D_UnifiedSharePanel={
	trackingParams: string;
	showLoadingSpinner: true;
};
type D_UpcomingEvent={
	startTime: `${number}`;
	isReminderSet: false;
	upcomingEventText: G_Text;
};
type D_Url={
	url: string;
	target?: "TARGET_NEW_WINDOW";
	nofollow?: true;
};
type D_UrlAndElapsedMediaTime<T>={
	baseUrl: T;
	elapsedMediaTimeSeconds: number;
};
type YTExternalUrl=T_SplitOnce<T_SplitOnce<D_YTExternalEncUrl,"]">[1]," ">[1];
type D_UrlInfoPlaylist={_tag: "playlist"; type: D_UrlInfoItemType; id: string;};
type D_UrlInfoVideo={_tag: "video"; id: string;};
type D_UrlVideoReferral={_tag: "video-referral"; id: string;};
type D_UrlPlayNext={_tag: "play-next"; value: string;};
type D_UrlWrappedValue={privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;};
type D_VideoDescriptionHeader={
	title: G_Text;
	channel: G_Text;
	views: G_Text;
	publishDate: G_Text;
	factoid: R_Factoid[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: E_VE3611;
	channelThumbnail: D_Thumbnail;
};
type D_VideoDescriptionMusicSection={
	sectionTitle: G_Text;
	carouselLockups: R_CarouselLockup[];
	topicLink: R_TopicLink;
	premiumUpsellLink: G_Text;
};
type D_VideoIdTagStr=string&{_tag: "YtVideoId";};
type D_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton?: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText?: G_Text;
	trackingParams: string;
	badges?: RMD_Badge[];
	membershipButton?: R_Button;
};
type TD_VideoOwner={
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
type D_VideoPrimaryInfo={
	title: G_Text;
	viewCount: R_VideoViewCount;
	videoActions: R_Menu;
	trackingParams: string;
	superTitleLink?: G_Text;
	badges?: RMD_Badge[];
	dateText: G_Text;
	relativeDateText: G_Text;
};
type D_VideoQualityPromo={
	triggerCriteria: D_TriggerCriteria;
	text: G_Text;
	endpoint: E_VE83769_Url;
	trackingParams: string;
	snackbar: RA_Notification;
};
type D_VideoSecondaryInfo={
	owner: R_VideoOwner;
	description?: G_Text;
	subscribeButton: R_SubscribeButton;
	metadataRowContainer: RMD_RowContainer;
	showMoreText: G_Text;
	showLessText: G_Text;
	trackingParams: string;
	defaultExpanded: false;
	descriptionCollapsedLines: number;
	showMoreCommand?: C_CommandExecutor;
	showLessCommand?: A_ChangeEngagementPanelVisibility;
};
type D_VideoViewCount={
	viewCount: G_Text;
	isLive?: boolean;
	extraShortViewCount?: G_Text;
	shortViewCount?: G_Text;
};
type D_Video_Owner={
	thumbnail: D_Thumbnail;
	navigationEndpoint: GE_Browse;
	accessibility: D_Accessibility;
	title: string;
};
type D_VisualElementType=keyof B_VEMap;
type D_VoiceSearchDialog={
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
type D_VssLoggingContext={serializedContextData: string;};
type D_WatchEndpointMusicConfig={
	hasPersistentPlaylistPanel: boolean;
	musicVideoType: "MUSIC_VIDEO_TYPE_ATV";
};
type D_WatchNextEndScreen={
	results: G_WatchNextEndScreenItem[];
	title: G_Text;
	trackingParams: string;
};
type D_WatchNextTabbedResults={tabs: R_Tab[];};
type D_WebSearchboxConfig={
	requestLanguage: "en";
	requestDomain: "ca";
	hasOnscreenKeyboard: false;
	focusSearchbox: true;
};
type D_YtConfig={
	visitorData: string;
	sessionIndex: 0;
	rootVisualElementType: D_VisualElementType;
};
//#endregion
type D_ParamObjType={[x: number]: number|string|D_ParamObjType;};
type D_LoggingDirectives={
	trackingParams: string;
	visibility?: TM_Visibility;
	enableDisplayloggerExperiment?: boolean;
	gestures?: D_LoggingDirectives_Gestures;
};
//#region D_Button
type D_Button_With_TargetId=
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
type D_ThumbnailsList={thumbnail: D_Thumbnail; trackingParams?: string;};
type D_Thumbnail={
	thumbnails: D_ThumbnailItem[];
	accessibility?: D_Accessibility;
	isOriginalAspectRatio?: true;
	sampledThumbnailColor?: D_ThumbnailColor;
	lightColorPalette?: D_LightColorPalette;
	darkColorPalette?: D_DarkColorPalette;
};
type D_Omit_Compact_Player={
	title: G_Text;
	trackingParams: string;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type D_Omit_Compact_Video=D_Omit_Compact_Player&{
	videoId: string;
	shortViewCountText: G_Text;
	publishedTimeText: G_Text;
};
type D_PaidDigitalGoods={paidDigitalGoods: B_Hack;};
type D_AudioConfig={
	loudnessDb?: number;
	perceptualLoudnessDb?: number;
	enablePerFormatLoudness?: boolean;
};
type D_DescriptionChapters={
	chapters: R_Chapter[];
	trackingParams: string;
	onChapterRepeat: TA_OpenPopup_Empty;
};
//#region DoExtract & DoOmit
type D_Button_DoExtract<T extends D_Button>=T extends infer Y? Omit<Y,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">:never;
type D_Button_DoOmit<T_Btn extends D_Button,U extends T_DistributedKeyof<T_Btn>>=
	T_Btn extends infer T?
	T_OmitKey<T,U> extends infer Z?
	{
		[U in keyof Z]: Z[U]
	}
	:never
	:never;
type D_Button_Ex_1_Omit_Size=D_Button_DoOmit<D_Button,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">;
//#endregion
//#region Extract & Exclude from data
type D_GuideEntry_WithEntryData=Extract<D_GuideEntry,{entryData: any;}>;
type D_GuideEntry_WithNavEP=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithEntryData>,{navigationEndpoint: any;}>;
type D_GuideEntry_WithPrimary=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithNavEP>,{isPrimary: any;}>;
type D_GuideEntry_With_ServiceEndpoint=Extract<Exclude<D_GuideEntry,D_GuideEntry_WithPrimary>,{serviceEndpoint: any;}>;
type D_GuideEntry_IconType_Obj={
	WithNavEP: Extract<D_GuideEntry_WithNavEP,{icon: any;}>['icon']['iconType'][];
	WithIcon: T_ExtractIconType<D_GuideEntry_With_ServiceEndpoint>[];
};
//#endregion
type D_UrlInfoMap={["https://www.youtube.com/redirect"]: GU_YoutubeUrlRedirect_Info;};
type D_VideoId=string;
type D_Youtube_Streaming_ProbeUrl=`https://rr${number}---sn-${string}n${string}.googlevideo.com/videogoodput?id=${string}&source=${string}&range=${string}&expire=${number}&ip=${D_VideoPlaybackShape["ip"]}&ms=${string}&mm=${string}&pl=${string}&nh=${string}&sparams=${string}&signature=${D_TimedTextApi["signature"]}&key=${string}`;
type D_Playlist_MD={
	title: string;
	androidAppindexingLink: string;
	iosAppindexingLink: string;
};
type D_RichMetadataRow={
	contents: R_RichMetadata[];
	trackingParams: string;
};
type D_RelatedChipCloud={content: R_ChipCloud;};
type D_LoggingDirectives_Gestures=T_Types<4>;
type DD_Streaming={
	expiresInSeconds: `${number}`;
	adaptiveFormats: D_AdaptiveFormatItem[];
	formats: D_FormatItem[];
	probeUrl?: D_Youtube_Streaming_ProbeUrl;
};
type DMD_AdSlot={
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
type DMD_Badge={
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
type D_MetadataRow={
	title: G_Text;
	contents: G_Text[];
	trackingParams: string;
};
type DMD_RowItem=R_RichMetadataRow|R_MetadataRow;
type DMD_RowContainer={
	rows?: DMD_RowItem[];
	collapsedItemCount: number;
	trackingParams: string;
};
type DRC_Csi_SPs=RC_To_SPs<RC_CsiVarMap>|(RC_CsiServiceC|RC_CsiServiceCVer)[];
type DSS_Context={context: D_ContextTypeStr|null;};
type DT_MenuFlexibleItem={
	menuItem: R_MenuServiceItem;
	topLevelButton: R_Button;
};
type D_PlayerParamsUrl=`pp=${string}`;
