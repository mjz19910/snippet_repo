//#region String data, ie `D_${string}`
type D_EndpointLikeEndings="Endpoint"|"Command"|"Action";
//#endregion
//#region Enum data, ie `D_${string}`
type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
//#endregion
//#region Entity data, ie `D_EY_${string}`
type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
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
	G_SI_DB_EngagementPanel['targetId'],
	D_Button_TargetId
][number];
type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
type D_UiTargetId="browse-feedFEwhat_to_watch"|"watch-next-feed";
type DCE_Button={
	command: GC_Button;
	targetId: D_Button_TargetId;
};
type TD_Accessibility<T>={
	accessibilityData: TD_Label<T>;
};

type D_ClipInfoButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	icon: T_Icon<"INFO">;
	trackingParams: string;
	accessibilityData: D_Accessibility;
	targetId: "clip-info-button";
	command: TA_OpenPopup<{
		popup: R_ConfirmDialog;
		popupType: "DIALOG";
	}>;
};

type D_ShareButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	// D_Button_SE
	serviceEndpoint: E_ShareEntityService;
	icon: T_Icon<"SHARE">;
	tooltip: "Share";
	trackingParams: string;
	accessibilityData: D_Accessibility;
};
type D_Button_TODO={
	navigationEndpoint: GE_Button_navigation;
}|{
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	text: G_Text;
	icon: Exclude<D_Icon_Button,T_Icon<"CONTENT_CUT">>;
	tooltip: string;
	trackingParams: string;
	accessibilityData: D_Accessibility;
};
type D_CreateClipButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"CONTENT_CUT">;
	tooltip: "Clip";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	targetId: "create-clip-button-action-bar";
	command: A_ChangeEngagementPanelVisibility;
};

type D_SuggestiveButton={
	style: "STYLE_SUGGESTIVE";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	trackingParams: string;
	command: C_Continuation;
};

type D_PlaylistAddButton_Save={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"PLAYLIST_ADD">;
	accessibility: {label: "unknown";};
	tooltip: "Save";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: E_AddToPlaylistService;
};

type D_PlaylistAddButton_Clip={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	icon: T_Icon<"PLAYLIST_ADD">;
	accessibility: {
		label: "Save to";
	};
	tooltip: "Clip";
	trackingParams: string;
	accessibilityData: D_Accessibility;
	command: E_AddToPlaylistService;
};

type D_ButtonCancelAutoplay={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	text: G_Text;
	accessibility: TD_Label<"Cancel auto-play for this video">;
	trackingParams: string;
	accessibilityData: TD_Accessibility<"Cancel auto-play for this video">;
	command: C_GetSurvey;
};
type D_Button_ClipInfoButton={
	style: "STYLE_DEFAULT";
	size: "SIZE_DEFAULT";
	isDisabled: false;
	icon: T_Icon<"INFO">;
	trackingParams: string;
	accessibilityData: TD_Accessibility<"Learn more">;
	targetId: "clip-info-button";
	command: TA_OpenPopup<{
		popup: R_ConfirmDialog;
		popupType: "DIALOG";
	}>;
};

type D_Button_2=
	|D_ClipInfoButton
	|D_ButtonCancelAutoplay
	|D_ShareButton
	|D_CreateClipButton
	|D_SuggestiveButton
	|D_PlaylistAddButton_Save
	|D_PlaylistAddButton_Clip
	|D_Button_ClipInfoButton
	;
;

type D_Button_EX_1_Command=Extract<D_Button,{command: any;}>;
type D_Button_DoExtract<T extends D_Button>=T extends infer Y? Omit<Y,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">:never;
type D_Button_DoOmit<T_Btn extends D_Button,U extends T_DistributedKeyof<T_Btn>>=T_Btn extends infer T? (T extends infer Y? Omit<Y,U>:never) extends infer Z? {[U in keyof Z]: Z[U]}:never:never;
type D_Button_Ex_1_Omit_Size=D_Button_DoOmit<D_Button,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">;

type D_Button_EX_1_Style=Extract<Exclude<D_Button,D_Button_EX_1_Command>,{style: any;}>;
type D_Button_EX_2_Text=Extract<D_Button,{text: any;}>;
type D_Button_NP_1_Style=D_Button_EX_1_Command|D_Button_EX_1_Style;
type D_Button_EX_1_SrvEp=Extract<Exclude<D_Button,D_Button_NP_1_Style>,{serviceEndpoint: any;}>;
type D_Button_NP_1_SrvEp=D_Button_NP_1_Style|D_Button_EX_1_SrvEp;
type D_Button_ER_1_Rest=Exclude<D_Button,D_Button_NP_1_SrvEp>;
type D_Button_SE=T_SE_Signal<M_SendPost,G_ClientSignal>|E_YpcGetOffers|E_ShareEntityService;
type Popup_ShareEntityService=T_DialogPopup_ReuseFlag<R_UnifiedSharePanel>;

type D_SubscriptionNotificationToggleButton={
	states: [
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
	currentStateId: 2;
	trackingParams: string;
	command: C_Executor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};
type D_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RD${string}`
	;
;
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
type DE_SuperThanksSelectedTier={key: string; index: number;};
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
type D_CompactVideo={
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
type D_ReelPlayerOverlay={
	likeButton: R_LikeButton;
	reelPlayerHeaderSupportedRenderers: R_ReelPlayerHeader;
	menu: R_Menu;
	nextItemButton: R_Button;
	prevItemButton: R_Button;
	subscribeButtonRenderer: R_SubscribeButton;
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	viewCommentsButton: R_Button;
	trackingParams: string;
	shareButton: R_Button;
	pivotButton: R_PivotButton;
}|{
	style: "REEL_PLAYER_OVERLAY_STYLE_SHORTS";
	trackingParams: string;
	reelPlayerNavigationModel: "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED";
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
	adInfoRenderer: RL$ActionCompanionAdInfo;
	adVideoId: string;
	impressionPings: T_BaseUrl<`${"https"}://www.youtube.com/pagead/interaction/?${string}`>[];
	adLayoutLoggingData: D_AdLayoutLoggingData;
	associatedCompositePlayerBytesLayoutId?: `${string}-0000-${string}-${string}-${string}`;
};
type D_AlertWithButton={
	type: "INFO";
	text: G_Text;
	dismissButton: R_Button;
};
type D_C4TabbedHeader={
	channelId: `UC${string}`;
	title: string;
	navigationEndpoint: GE_Browse;
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
	authorEndpoint: {};
	contentText: G_Text;
	publishedTimeText: G_Text;
	isLiked: boolean;
	actionMenu: R_Menu;
	commentId: string;
	actionButtons: R_CommentActionButtons;
	authorIsChannelOwner: boolean;
	currentUserReplyThumbnail: D_Thumbnail;
	voteStatus: "INDIFFERENT";
	trackingParams: string;
	voteCount: G_Text;
	expandButton: R_Button;
	collapseButton: R_Button;
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
type D_DecoratedPlayerBar={
	playerBar: R_MultiMarkersPlayerBar;
}|{
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
	navigationEndpoint: GE_Browse;
	channelName: string;
	subscribeButton: R_SubscribeButton;
};
type D_FeedFilterChipBar=Record<"contents",R_ChipCloudChip[]>&{
	trackingParams: string;
	nextButton: R_Button;
	previousButton: R_Button;
	styleType: D_ChannelPageGrid;
};
type D_FusionSearchbox={
	icon: T_Icon<"SEARCH">;
	placeholderText: G_Text;
	config: R_WebSearchboxConfig;
	trackingParams: string;
	searchEndpoint: E_Search;
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
	navigationEndpoint: GE_Browse;
	accessibility: D_Accessibility;
	title: string;
}|{
	thumbnail: D_Thumbnail;
	navigationEndpoint: GE_Browse;
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
type D_ChipCloudChip=
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
	type EG_CompactLink$1=E_Upload|E_SignalNavigation;

type D_CompactLink={
	icon: T_Icon<"PERSON_ADD">;
	title: G_Text;
	trackingParams: string;
}|{
	title: G_Text;
	navigationEndpoint: GE_Browse;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR";
}|{
	icon: T_Icon<"CREATION_UPLOAD">;
	title: G_Text;
	navigationEndpoint: E_Upload;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
}|{
	icon: T_Icon<"CREATION_LIVE">;
	title: G_Text;
	navigationEndpoint: E_SignalNavigation;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_CREATION_MENU";
};
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
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
}|{
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
	button: R_Button;
}|{
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
	ghostCards: R_GhostGrid;
};
type D_AutoplaySetItem={
	mode: "NORMAL";
	autoplayVideo: E_Watch;
	nextButtonVideo?: E_Watch;
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
	repeatButton: R_ToggleButton;
	macroMarkerRepeatStateEntityKey: string;
	endRepeatCommand: C_Executor;
	playerStateEntityKey: string;
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
	lightColorPalette: D_LightColorPalette;
	darkColorPalette: D$DarkColorPalette;
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
type D_PlaylistPanelVideo={
	title: G_Text;
	longBylineText: G_Text;
	thumbnail: D_Thumbnail;
	lengthText: G_Text;
	indexText: G_Text;
	selected: true;
	navigationEndpoint: E_Watch;
	videoId: string;
	shortBylineText: G_Text;
	trackingParams: string;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	playlistSetVideoId: "56B44F6D10557CC6"|string;
	lightColorPalette: {
		section2Color: 4076401393;
		primaryTitleColor: 4279833104;
		secondaryTitleColor: 4286207567;
		section4Color: 4075544541;
	};
	darkColorPalette: {
		section2Color: 4063436571;
		primaryTitleColor: 4294961637;
		secondaryTitleColor: 4291602851;
		section4Color: 4061728525;
	};
};
type D_PlaylistSidebarPrimaryInfo={
	thumbnailRenderer: R_PlaylistVideoThumbnail;
	title: G_Text;
	stats: G_Text[];
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	navigationEndpoint: E_Watch;
	badges: RMD_Badge[];
	description: {};
	showMoreText: G_Text;
};
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
type G_TextRun_Endpoint=E_Url|GE_Browse|E_Watch;
type D_WebPrefetch={navigationEndpoints: E_Watch[];};
type D_Video={
	videoId: /**/string;
	thumbnail: /**/D_Thumbnail;
	title: /**/G_Text;
	descriptionSnippet?: G_Text;
	longBylineText: /**/G_Text;
	publishedTimeText?: G_Text;
	lengthText?: G_Text;
	viewCountText?: G_Text;
	navigationEndpoint: /**/E_Watch;
	ownerBadges?: RMD_Badge[];
	badges?: RMD_Badge[];
	ownerText: /**/G_Text;
	upcomingEventData?: D_UpcomingEvent;
	shortBylineText: /**/G_Text;
	trackingParams: /**/string;
	showActionMenu: /**/false;
	shortViewCountText?: G_Text;
	isWatched?: true;
	menu: /**/R_Menu;
	channelThumbnailSupportedRenderers: /**/R_ChannelThumbnailWithLink;
	thumbnailOverlays: /**/G_ThumbnailOverlayItem[];
	topStandaloneBadge?: RMD_Badge;
	richThumbnail?: R_MovingThumbnail;
	inlinePlaybackEndpoint?: E_Watch;
	owner?: D_Video_Owner;
	buttons?: R_ToggleButton[];
};
type D_Video_inlinePlaybackEndpoint=D_Video['inlinePlaybackEndpoint']&{};
type D_SubFeedOption={
	name: G_Text;
	isSelected: boolean;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};
type D_BrowseEndpointContextMusicConfig={pageType: T_EnumStr<"MUSIC_PAGE_TYPE","ALBUM"|"ARTIST"|"USER_CHANNEL">;};
type D_AdSlot={
	adSlotMetadata: DMD_AdSlot;
	fulfillmentContent: R_FulfilledLayout;
	enablePacfLoggingWeb: boolean;
};
type D_AdLayoutLoggingData={serializedAdServingDataEntry: string;};
type D_AdLayoutMetadata={
	layoutId: string;
	layoutType: "LAYOUT_TYPE_VIDEO_DISPLAY_BILLBOARD_IMAGE_BUTTONED";
	adLayoutLoggingData: D_AdLayoutLoggingData;
};
type D_PageTopAdLayout={
	adLayoutMetadata: D_AdLayoutMetadata;
	renderingContent: R_VideoMastheadAdV3;
};
type D_TextRun={
	text: string;
	navigationEndpoint?: G_TextRun_Endpoint;
	loggingDirectives?: D_LoggingDirectives;
	bold?: boolean;
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
type D_PlaylistId=
	|`RD${string}`
	|`RDMM${string}`
	|`RDGM${string}`
	|`PL${string}`
	|"WL"
	|"LL"
	;
;
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
type D_Omit_Menu_Video_Ex={
	ownerBadges: RMD_Badge[];
};
type D_NotificationMenu_PopupItemMenu=TR_MultiPageMenu<D_NotificationMenu_PopupItem>;
type D_NotificationMenu_Popup={
	popup: D_NotificationMenu_PopupItemMenu;
	popupType: "DROPDOWN";
};
