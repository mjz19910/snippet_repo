type D_AboutThisAd={url: D_UrlWrappedValue;};
type D_Accessibility={accessibilityData: D_Label;};
type D_AccountItemSection=Record<"contents",G_AccountItemSection[]>;
type D_AccountSettingIdList=[407];
type D_ActionRemoveVideoByVideoId={
	action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID";
	removedVideoId: string;
};
type D_ActionSetPlaylistVideoOrder={
	title: string;
	selected: boolean;
	continuation?: CD_Reload;
	serviceEndpoint?: C_Continuation;
	accessibility?: D_Accessibility;
	trackingParams: string;
};
type D_AdActionInterstitial={};
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
type D_AdPlacement={config: R_AdPlacementConfig; renderer: AdPlacementRendererItem;};
type D_AdPlacementConfig={
	kind: DE_AdPlacementKind;
	adTimeOffset?: D$AdTimeOffset;
	hideCueRangeMarker: true;
};
type D$AdTimeOffset={
	offsetStartMilliseconds: `${number}`;
	offsetEndMilliseconds: "-1";
};
type D_AdaptiveFormatItem={
	itag: number;
	url?: string;
	mimeType: G_MimeTypeFormat;
	bitrate: number;
	width?: number;
	height?: number;
	initRange: D_Range;
	indexRange: D_Range;
	lastModified: string;
	contentLength: string;
	quality: G_FormatQuality;
	fps?: D_FormatFps;
	qualityLabel?: QualityLabel;
	projectionType: "RECTANGULAR";
	averageBitrate: number;
	colorInfo?: D_FormatColorInfo;
	highReplication?: true,
	audioQuality?: "AUDIO_QUALITY_MEDIUM";
	approxDurationMs: `${number}`;
	audioSampleRate?: `${D$AudioSampleRate}`;
	audioChannels?: 2;
	loudnessDb?: number;
	signatureCipher?: `s=${string}&sp=${"sig"}&url=${string}`;
};
type QualArr=[
	...make_qual_for_fps<50>,
	...make_qual_for_fps<60>,
	"1080p","720p","480p","360p","240p","144p",
];
type make_qual_for_fps<T extends 50|60>=[`2160p${T}`,`1440p${T}`,`1080p${T}`,`720p${T}`,];
type QualityLabel=QualArr[number];
type D_AddToPlaylist={
	playlists: R_PlaylistAddToOption[];
}&T_Actions<R_AddToPlaylistCreate>;
type D$AnimationConfig={
	minImageUpdateIntervalMs: 10000|5000;
	crossfadeDurationMs: 5000;
	crossfadeStartOffset: 1;
	maxFrameRate: 30;
};
type D$AnyIconStr=[
	"DELETE",
	"EXPAND_MORE",
	"MIX",
	"MODERATOR",
	"NOTIFICATIONS_ACTIVE",
	"PRIVACY_UNLISTED",
	"SETTINGS",
	"SORT",
	"YOUTUBE_SHORTS_BRAND_24",
][number];
type D_AnySaved={[U in D_SD_UrlTypes]?: GD_SD_Item;};
type ApiFormatObj=[
	["youtubei",[["v1",[
	]]]]
];
type ApiNotificationLast=[
	"get_unseen_count",
	"get_notification_menu",
	"record_interactions",
	"modify_channel_preference"
][number];
type D_ApiPathFormat=`/${Join<url_pathname_parts,"/">}`;
type D_ApiPathFormat_1=[
	"youtubei/v1/ypc/get_offers",
	"youtubei/v1/ypc/get_cart",
	D_ApiPathFormat_2,
][number];
type D_ApiPathFormat_2=[
	"getAccountSwitcherEndpoint",
	"getDatasyncIdsEndpoint",
	"youtubei/v1/browse/edit_playlist",
	"youtubei/v1/notification/opt_out",
	`youtubei/v1/${"browse"|"guide"|"next"|"player"}`,
	`youtubei/v1/account/${"account_menu"|"accounts_list"|"set_setting"}`,
	`youtubei/v1/att/${"get"|"log"}`,
	`youtubei/v1/comment/create_comment`,
	`youtubei/v1/feedback`,
	`youtubei/v1/get_survey`,
	`youtubei/v1/get_transcript`,
	`youtubei/v1/like/${"like"|"dislike"|"removelike"}`,
	`youtubei/v1/live_chat/${"get_live_chat_replay"|"get_live_chat"}`,
	`youtubei/v1/music/get_search_suggestions`,
	`youtubei/v1/notification/${ApiNotificationLast}`,
	`youtubei/v1/pdg/get_pdg_buy_flow`,
	`youtubei/v1/playlist/${"get_add_to_playlist"|"create"}`,
	`youtubei/v1/reel/${"reel_item_watch"|"reel_watch_sequence"}`,
	`youtubei/v1/search`,
	`youtubei/v1/share/get_share_panel`,
	`youtubei/v1/subscription/${"subscribe"|"unsubscribe"}`,
	`youtubei/v1/updated_metadata`,
	"youtubei/v1/flag/get_form",
	"youtubei/v1/backstage/create_post",
][number];
type D_ApiStatsAdsStr=`${never|
	`ver=${string}`
	}&${`ns=${string}`
	}&${`event=${string}`
	}&${`device=${string}`
	}&${`content_v=${string}`
	}&${`el=${string}`
	}&${`ei=${string}`
	}&${`devicever=${string}`
	}&${`bti=${string}`
	}&${`break_type=${string}`
	}&${`conn=${string}`
	}&${`cpn=${string}`
	}&${`lact=${string}`
	}&${`m_pos=${string}`
	}&${`mt=${string}`
	}&${`p_h=${string}`
	}&${`p_w=${string}`
	}&${`rwt=${string}`
	}&${`sdkv=${string}`
	}&${`slot_pos=${string}`
	}&${`vis=${string}`
	}&${`vol=${string}`
	}&${`wt=${string}`
	}&${`sli=${string}`
	}&${`slfs=${string}`
	}&loginael=${string}`
	;
;
type D_ApiUrlFormat=`https://www.youtube.com/${D_ApiPathFormat_1}`;
type D_AttBgChallenge={
	interpreterUrl?: T_UrlWrappedValue<`//www.google.com/js/th/${string}.js`>;
	interpreterHash: string;
	program: string;
	globalName: "trayride";
};
type D$AudioSampleRate=[
	44100,48000
][number];
type AudioTrackItem={
	captionTrackIndices: number[];
};
type D_AutomixPreviewVideo={};
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
	serverEnvironment: 1;
};
type D_BrowseEndpointPages=[
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
type D_BrowseFeedActions={
		contents: G_BrowseFeedContent[];
	};
type D_BrowseIdStr=
	|`FE${D_BrowseEndpointPages}`
	|`VL${`${"LL"|"WL"|`PL${string}`}`}`
	|`UC${string}`
	|`SP${D_Settings_Id}`
	|`MP${"TRt"|"REb"|"LYt"}_${string}`;
type D_Browse_Id<T>={browseId: T;};
type AD_BrowserMediaSession={};
type D$ButtonSizeType="SIZE_DEFAULT"|"SIZE_SMALL";
type D$ButtonStyleType=[
	"STYLE_ALERT_INFO",
	"STYLE_BLUE_TEXT_WITH_INVERSE_THEME",
	"STYLE_BLUE_TEXT",
	"STYLE_CALL_TO_ACTION_FILLED",
	"STYLE_COMPACT_GRAY",
	"STYLE_DEFAULT",
	"STYLE_DESTRUCTIVE",
	"STYLE_INACTIVE_OUTLINE",
	"STYLE_LIGHT_TEXT",
	"STYLE_MONO_FILLED_OVERLAY",
	"STYLE_MONO_FILLED",
	"STYLE_MONO_OUTLINE",
	"STYLE_MONO_TONAL_OVERLAY",
	"STYLE_MONO_TONAL",
	"STYLE_OPACITY",
	"STYLE_OVERLAY",
	"STYLE_PAYMENT",
	"STYLE_PRIMARY",
	"STYLE_SUGGESTED_ACTION",
	"STYLE_SUGGESTIVE",
	"STYLE_TEXT",
	"STYLE_UNKNOWN",
	"STYLE_VISIBLY_DISABLED",
	"STYLE_WHITE_WITH_BORDER",
][number];
type D_Button_TargetId=
	|"clip-info-button"
	|"create-clip-button-action-bar"
	|"sponsorships-button"
	;
;
type D_Cache_MD={isCacheHit: true;};
type D_CanShare={canShare: false;};
type D$CanonicalBaseUrl={canonicalBaseUrl: string;};
type CaptionTrackItem={
	baseUrl: string;
	name: G_Text;
	vssId: "a.en";
};
type D_Card={};
type D_CarouselLockup={
	infoRows: R_InfoRow[];
};
type ChanLoc=`channel.${ChanTabStr|""}`;
type ChanTabStr=[
	"about",
	"channels",
	"community",
	"featured",
	"playlists",
	"search",
	"shorts",
	"streams",
	"videos",
][number];
type D_ChannelHeaderLinks={
	primaryLinks: D_PrimaryLinkItem[];
};
type ChannelId=`UC${string}`;
type ChannelIdStr<T extends string>=`UC${T}`;
type D_ChannelPageGrid=
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_CHANNEL_PAGE_GRID"
	|"FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT"
	;
;
type ChannelSubUrl=ChanTabStr;
type ChannelSubUrlFormat=ChannelSubUrl|`search?query=${string}`;
type D_ChannelSwitcherHeader={
	title: G_Text;
	button: R_Button;
};
type D_ChannelSwitcherPage=Record<"contents",G_ChannelSwitcherContent[]>&{
	header: R_ChannelSwitcherHeader;
	targetId: "ceq";
};
type ChannelSwitcherUrlFormat="/channel_switcher";
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
type D_ClipSection={
	contents: R_ClipCreation[];
};
type D_Color={red: number; green: number; blue: number;};
type ColorSourceVars={
	colorSourceSizeMultiplier: 1.4;
	bottomColorSourceHeightMultiplier: 0.67;
	maxBottomColorSourceHeight: 260;
	colorSourceWidthMultiplier: 1.5;
	colorSourceHeightMultiplier: 2;
};
type D_CommentActionButtons={};
type D_CommentThread={
	comment: R_Comment;
	trackingParams: string;
	renderingPriority: "RENDERING_PRIORITY_UNKNOWN";
	isModeratedElqComment: boolean;
	loggingDirectives: D_LoggingDirectives;
};
type D_CommentsEntryPointHeader={
	headerText: G_Text;
	onTap: C_Executor;
	trackingParams: string;
	commentCount: G_Text;
	contentRenderer: R_CommentsEntryPointTeaser;
	targetId: "comments-entry-point-header-identifier";
};
type D_CommentsEntryPointHeader_contentRenderer=D_CommentsEntryPointHeader["contentRenderer"];
type D_CommentsHeader={
	countText: G_Text;
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
type D_CommonConfig={
	url: `https://rr5---sn-nx57ynsd.googlevideo.com/initplayback?${string}`;
};
type D_CompactLinkStyle=[
	`${"COMPACT_LINK_STYLE_TYPE"}_${[
		"SETTINGS_SIDEBAR",
		"ACCOUNT_SWITCHER_FOOTER"
	][number]}`,
	"COMPACT_LINK_STYLE_TYPE_CREATION_MENU",
][number];
type D_ConnectionWhitelistItem="WIFI";
type D_ContextTypeStr=
	|"channel_creator"
	|"yt_web_remix_unlimited"
	|"yt_web_search"
	|"yt_web_unknown_form_factor_kevlar_w2w"
	|"yt_web_unlimited"
	;
type D_CountryCode="CA";
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
type D$DarkColorPalette={
	section1Color: 4281871903;
	section2Color: 4280819991;
	section3Color: 4279833614;
	primaryTitleColor: 4294964453;
	secondaryTitleColor: 4291607459;
	section4Color: 4278979079;
};
type D_DataArrType=[number,number,D_DecTypeNum[]][];
type D_DateText={dateText: G_Text;};
type D_DecTypeNum=
	["data32",number,number]|
	["data_fixed32",number,number]|
	["data64",number,number[],bigint]|
	["data_fixed64",number,bigint]|
	["info",number,number]|
	["child",number,Uint8Array,D_DecTypeNum[]|null]|
	["struct",number,D_DecTypeNum[]]|
	["group",number,D_DecTypeNum[]]|
	["error",number];
type D_DesktopWatchAds={
	gutParams: B_TagObj;
	playerAdParams: PlayerAdParams;
	showCompanion: true;
	showInstream: true;
	useGut: true;
};
type D_Dropdown_Privacy={
	entries: R_PrivacyDropdownItem[];
	label: "Privacy";
};
type D_Dropdown=D_Dropdown_Privacy;
type D_EditableDetails={canDelete: false;};
type D_ElementResourceStatus={
	identifier: "bottom_sheet_list_option.eml|cd39732d53f1132c"|
	"track_selection_sheet_option.eml|f3619d8bb085c9a9";
	status: "ELEMENTS_RESOURCE_STATUS_ATTACHED";
};
type D_ElementUpdate=R_TemplateUpdate|R_ResourceStatusInResponseCheck;// [ELEMENT::structured-description-music-section::@::row-state-id]
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
	startMs?: number;
};
type D_EndscreenElement={
	style: "VIDEO"|"CHANNEL";
	image: {},
	left: number,
	width: number,
	top: number,
	aspectRatio: number,
	startMs: `${number}`,
	endMs: `${number}`,
	title: {},
	metadata: {},
	endpoint: {},
	trackingParams: string,
	id: string;
	thumbnailOverlays: {}[];
};
type D_EngagementSectionPanelId=T_TargetIdStr<"engagement-panel",[
	"clip-create",
	"structured-description"
][number]>|
	"comment-item-section"|
	string&{_tag: "string";};
type D_EntityBatchUpdate={
		mutations: DE_MutationItem[];
		timestamp: D_TimestampWithNanos;
	};
type D_Enum_GuideAction=T_EnumStr<"GUIDE_ACTION","ADD_TO_PLAYLISTS"|
		"ADD_TO_SUBSCRIPTIONS"
	>;
type D_ExpandableTab={
	endpoint: {};
	title: string;
	selected: boolean;
	expandedText?: string;
	content?: R_SectionList;
};
type D_ExpandableVideoDescriptionBody={
	descriptionBodyText: G_Text;
	showMoreText: G_Text;
	showLessText: G_Text;
};// spell:ignore trackclk aclk
type D_ExternalUrlFormat=[
	`https://ad.doubleclick.net/ddm/trackclk/${string}`,
	`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`,
	`https://music.youtube.com${"/"|""}`,
	`${"https:"}//${GV_SubDomain}.googlevideo.com/initplayback?${string}`,
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
type D_FeedTabbedHeader={title: G_Text;};
type D_FeedbackResponseItem=D_FeedbackResponseProcessedStatus;
type D_FeedbackResponseProcessedStatus={isProcessed: true;};
type D_FormatColorInfo={
	primaries: "COLOR_PRIMARIES_BT709";
	transferCharacteristics: "COLOR_TRANSFER_CHARACTERISTICS_BT709";
	matrixCoefficients: "COLOR_MATRIX_COEFFICIENTS_BT709";
};
type D_FormatFps=25|50|60;
type D_FormatItem={
	itag: number;
	url: string;
};
type D_GetAccountMenu_Popup={popup: TR_MultiPageMenu<MP_AccountMenu>; popupType: "DROPDOWN"; beReused: true;};
type D_GhostGrid={rows: number;};
type D_GoogleLoginExternalUrl={
	url: "https://accounts.google.com/AddSession?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den-GB%26next%3D%252F&hl=en-GB&passive=false&service=youtube&uilel=0";
}["url"];
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
	{
		darkThemeColor: TP_Color<0x7f000000,"0x7f000000">;
	},
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
type D_GradientColorConfigMid={
	darkThemeColor: TP_Color<0x7f000000,"0x7f000000">;
};
type D_GradientColorConfigStart={
	darkThemeColor: TP_Color<0x99000000,"0x99000000">;
	startLocation: 0;
};
type D_GuideCollapsibleEntry={
	expanderItem: R_GuideEntry;
	expandableItems: R_GuideEntry[];// G_GuideSectionItem
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
	softFailOnError: boolean;
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
	heatMarkers: {
		heatMarkerRenderer: {};
	}[];
	heatMarkersDecorations: {
		timedMarkerDecorationRenderer: {};
	}[];
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
	style: T_StyleType<G_CardList_StyleType>;
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
type D_InFeedAdLayout={adLayoutMetadata: M_AdLayout_PlayerBytes; renderingContent: R_DisplayAd;};
type R_DisplayAd={displayAdRenderer: D_DisplayAd;};
type D_LinearAdSequence={adLayoutMetadata: M_AdLayout_PlayerBytes; linearAds: G_LinearAdsItem[];};
type D_AdSlotAndLayoutItem={adLayoutMetadata: MMD_AdLayout_TopImage[]; adSlotMetadata: DMD_AdSlot;};
type MG_AdLayout=M_AdLayout_PlayerBytes|MMD_AdLayout_TopImage;
type M_AdLayout_PlayerBytes={layoutType: "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES"; layoutId: string;};
type MMD_AdLayout_TopImage={layoutType: "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE"; layoutId: string; adLayoutLoggingData: D_AdLayoutLoggingData;};
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
type D_KnownGet="NOTIFICATION_SUBSCRIPTION_NOTIFICATIONS,NOTIFICATION_RECOMMENDATION_WEB_CONTROL,NOTIFICATION_COMMENT_WEB_CONTROL,NOTIFICATION_COMMENT_REPLY_OTHER_WEB_CONTROL,NOTIFICATION_USER_MENTION_WEB_CONTROL,NOTIFICATION_RETUBING_WEB_CONTROL,EMAIL_KIDS_NEWSLETTER,EMAIL_BLOCK_ALL,EMAIL_MARKETING_NEWSLETTER,EMAIL_PAID_NEWSLETTER,EMAIL_CREATOR_NEWSLETTER";
type D_Label={label: string;};
type D_Letters=T_Split<"abcdefghijklmnopqrstuvwxyz","">[number];
type D_LightColorPalette={
	section1Color: 4294966779;
	section2Color: 4294505969;
	section3Color: 4294110695;
	primaryTitleColor: 4279833872;
	secondaryTitleColor: 4285554760;
	section4Color: 4293650141;
};
type D_LikeApi={
	videoId: string;
}|{
	playlistId: D_PlaylistId;
};
type D_LikeButton={
	target: D_LikeApi;
	likeStatus: "INDIFFERENT";
	likeCount: number;
	likeCountText: G_Text;
	likeCountWithLikeText: G_Text;
	likeCountWithUnlikeText: G_Text;
	dislikeCountText: G_Text;
	dislikeCountWithDislikeText: G_Text;
	dislikeCountWithUndislikeText: G_Text;
	trackingParams: string;
	likesAllowed: true;
	serviceEndpoints: E_Like[];
	likeCountTooltipText: G_Text;
	dislikeCountTooltipText: G_Text;
};
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
type D_Menu={
	items?: G_MenuItem[];
	trackingParams: string;
	topLevelButtons?: (R_Button|R_SegmentedLikeDislikeButton)[];
	accessibility?: D_Accessibility;
	targetId?: D_Menu_TargetId;
	loggingDirectives?: D_LoggingDirectives;
	flexibleItems?: R_MenuFlexibleItem[];
};
type D_VideoLike_richThumbnail=R_MovingThumbnail;
type D_MenuNavigationItem={
	text: G_Text;
	icon: T_Icon<"INFO">;
	navigationEndpoint: TA_OpenPopup_Empty;
	trackingParams: string;
};
type D$MenuServiceIcon=Extract<[
	{icon: T_Icon<"FLAG">;},
	{}
][number],{icon: any;}>;
type D$MenuServiceIconTypeStr=[
	"SUBTITLES",
	"PLAYLIST_ADD",
	"VISIBILITY_OFF",
	"SHARE",
	"ALIGN_LEFT"
][number]|"WATCH_LATER"|"NOT_INTERESTED"|"LIBRARY_ADD"|"LIBRARY_REMOVE"|(D$MenuServiceIcon['icon']['iconType']);
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
type D_Menu_TargetId="browse-video-menu-button";
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
	noindex: false;
	unlisted: false;
	tags?: string[];
	familySafe?: true;
	availableCountries?: string[];
	linkAlternates: B_HrefUrl[];
};
type D_MicroformatEmbed={
	iframeUrl: `https://www.youtube.com/embed/${string}`;
	flashUrl: `http://www.youtube.com/v/${string}?version=3&autohide=1`;
	width: 480;
	height: 360;
	flashSecureUrl: `https://www.youtube.com/v/${string}?version=3&autohide=1`;
};// TODO #3
type D_Miniplayer={};
type D_ModifiedSetItem={
	autoplayVideo: E_WatchPlaylist;
	nextButtonVideo: E_WatchPlaylist;
	previousButtonVideo?: E_WatchPlaylist;
};
type D_ModifyChannelPreference={};
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
type D_MusicResponsiveListItem={};
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
type D_NotificationMenu_PopupItem={
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
type DC_Continuation_Omit_Return<T,y extends Omit<T,"token"|"request">=Omit<T,"token"|"request">>=
	|["BROWSE",y]
	|["REEL_WATCH_SEQUENCE",y]
	|["WATCH_NEXT",y]
	|[null,y];
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
type D_PdgCommentChip={
	chipText: G_Text;
	chipColorPalette: {
		backgroundColor: 4280191205;
		foregroundTitleColor: 4294967295;
	};
	chipIcon: T_Icon<"FILL_DOLLAR_SIGN_HEART_12">;
	trackingParams: string;
};
type D_PdgCommentOption={
	commentText: G_Text;
	chipRenderer: R_PdgCommentChip;
};
type D_PivotButton={
	thumbnail: D_Thumbnail;
	onClickCommand: GE_Browse;
	trackingParams: string;
	contentDescription: G_Text;
	soundAttributionTitle: G_Text;
};
type D_PlayabilityStatus={
	status: "OK";
	playableInEmbed: boolean;
	offlineability: R_Button;
	miniplayer: R_Miniplayer;
	contextParams: string;
};
type D_PlaybackTracking={
	atrUrl: D_UrlAndElapsedMediaTime;
	ptrackingUrl: T_BaseUrl<never>;
	qoeUrl: T_BaseUrl<never>;
	videostatsDefaultFlushIntervalSeconds: 40;
	videostatsDelayplayUrl: D_UrlAndElapsedMediaTime;
	videostatsPlaybackUrl: T_BaseUrl<never>;
	videostatsScheduledFlushWalltimeSeconds: [10,20,30];
	videostatsWatchtimeUrl: T_BaseUrl<never>;
	youtubeRemarketingUrl?: T_BaseUrl<never>;
};
type PlayerAdParams={
	enabledEngageTypes: string;
	showContentThumbnail: boolean;
};
type D_PlayerAnnotationsExpanded={
	featuredChannel: D_FeaturedChannel;
	allowSwipeDismiss: boolean;
	annotationId: UUIDString;
};
type UUIDString=`${string}-0000-2${string}-a${string}-${string}`;
type D_PlayerAttestation={
	challenge: string;
	botguardData: D_Botguard;
};
type D_PlayerCaptionsTracklist={
	captionTracks: CaptionTrackItem[];
	audioTracks: AudioTrackItem[];
	translationLanguages: D_TranslationLanguage[];
	defaultAudioTrackIndex: number;
};
type D_PlayerConfig={
	audioConfig: D_AudioConfig;
	streamSelectionConfig: D_StreamSelectionConfig;
	mediaCommonConfig: {};
	webPlayerConfig: {};
};
type D_PlayerLiveStoryboardSpec={spec: string;};
type D_PlayerMicroformat={
	thumbnail: D_Thumbnail;
	embed: D_MicroformatEmbed;
	title: G_Text;
	description?: G_Text;
	lengthSeconds: `${number}`;
	ownerProfileUrl: `http://www.youtube.com/channel/UC${string}`;
	externalChannelId: ChannelId;
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
};
type D_PlayerOverlay={
	endScreen: R_WatchNextEndScreen;
	autoplay: R_PlayerOverlayAutoplay;
	shareButton: R_Button;
	addToMenu: R_Menu;
	videoDetails: R_PlayerOverlayVideoDetails;
	autonavToggle: R_AutoplaySwitchButton;
}|A_BrowserMediaSession|{
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
	playlistId: D_PlaylistId;
	title: G_Text;
	privacy: "PRIVATE"|"UNLISTED"|"PUBLIC";
	containsSelectedVideos: "NONE";
	privacyIcon: T_Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: E_PlaylistEdit;
	removeFromPlaylistServiceEndpoint: E_PlaylistEdit;
	trackingParams: string;
};
type D_PlaylistByline={text: G_Text;};
type D_PlaylistHeader={
	playlistId: D_PlaylistId;
	title: G_Text;
	numVideosText: G_Text;
	descriptionText: {};
	ownerText: G_Text;
	viewCountText: G_Text;
	shareData: D_CanShare;
	isEditable: boolean;
	privacy: string;
	ownerEndpoint: GE_Browse;
	editableDetails: D_EditableDetails;
	trackingParams: string;
	serviceEndpoints: E_PlaylistEdit[];
	stats: G_Text[];
	briefStats: G_Text[];
	editorEndpoint: E_PlaylistEditor;
	playlistHeaderBanner: R_HeroPlaylistThumbnail;
	moreActionsMenu: R_Menu;
	playButton: R_Button;
	shufflePlayButton: R_Button;
	onDescriptionTap: TA_OpenPopup_Empty;
	cinematicContainer: R_CinematicContainer;
	byline: R_PlaylistByline[];
	descriptionTapText: G_Text;
};
type D_PlaylistSidebar={
	items: G_PlaylistSidebarItem[];
	trackingParams: string;
};
type D_PlaylistSidebarSecondaryInfo={videoOwner: R_VideoOwner;};
type D_PlaylistUrlParams=`list=${D_PlaylistId}`;
type D_PlaylistUrlStr=`/playlist?${D_PlaylistUrlParams}`;
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
	playbackRelativeSecondsPrefetchCondition?: number;
};
type D_PrimaryLinkItem={
	navigationEndpoint: E_Url;
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
	price: `CA_${string}`;
	onClickCommand: E_Url;
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
type D_RadioPlaylistStr<T extends string>=`RD${T}`;
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
	channelNavigationEndpoint: GE_Browse;
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
// TODO #1
type D_ReportFormModal={};
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
type Todo_D_RichGrid=Record<"contents",R_RendererContentItem[]>&{
	masthead: R_VideoMastheadAdV3;
};
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
	ids: A_ExternalChannelId[];
	engagementType: "ENGAGEMENT_TYPE_SUBSCRIBE";
};
type D_SD_UrlTypes=`page_type_${YTNavigateFinishDetail["pageType"]}`|UrlTypes;
type D_Saved={
	any_data?: D_AnySaved;
	ad_layout_data?: D_AdLayout;
	data?: {[x: string]: ({}[])|undefined;};
};
type DC_ScrollToEngagementPanel={targetId: "engagement-panel-comments-section";};
type D_SearchBox={
	endpoint: {};
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
	endpoint?: E_Search;
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
type D_SerializedSlotAdServingDataEntry={
	serializedSlotAdServingDataEntry: string;
};
type D_SetSetting={
	settingItemId: `${number}`;
	boolValue?: boolean;
	settingItemIdForClient: GT_KnownSplit;
};
type D_SettingsCheckbox={
	title: G_Text;
	helpText?: G_Text;
	enabled: boolean;
	enableServiceEndpoint: {};
	disableServiceEndpoint: {};
	disabled: boolean;
};
type D_Settings_Id=
	|"account"
	|"account_advanced"
	|"account_overview"
	|"report_history"
	|"unlimited"
	|"account_downloads"
	;
;
type D_SettingsIdStr=`SP${G_SettingsEndpointPages}`;
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
type D_ShareEntityService={
	serializedShareEntity: string;
	commands: TA_OpenPopup_Empty[];
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
type D_SortFilterSubMenu={
	subMenuItems: D_ActionSetPlaylistVideoOrder[];
	title?: string;
	icon?: T_Icon<"SORT">;
	accessibility?: D_Accessibility;
	tooltip?: string;
	trackingParams: string;
};
type D_StreamSelectionConfig={
	maxBitrate: `${number};`;
};
type D_StructuredDescriptionContent={items: G_StructuredDescriptionContentItem[];};
type D_SubFeedSelector={
	title: G_Text;
	options: R_SubFeedOption[];
	trackingParams: string;
};
type D_ChannelId=`UC${string}`;
type D_SubscribeButton_Base={
	type: "FREE";
	channelId: D_ChannelId;
};
type D_SubscribeButton_Alts={
	buttonText: G_Text;
	subscribed: false;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
	notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E_Subscribe[];
	onUnsubscribeEndpoints: T_SE_Signal<M_Empty_WCM,{}>[];
}|{
	buttonText: G_Text;
	subscribed: boolean;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	serviceEndpoints: E_Subscribe[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
}|{
	buttonText: G_Text;
	subscribed: true;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	serviceEndpoints: E_Subscribe[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
};
type D_SubscribeButton=D_SubscribeButton_Base&D_SubscribeButton_Alts;
type D_SubscriptionButton={
	type: "FREE";
	subscribed?: boolean;
};
type D_Tab={
	selected: true;
	content: R_RichGrid;
	tabIdentifier: "FEwhat_to_watch";
	trackingParams: string;
}|{
	selected: true;
	content: R_SectionList;
	trackingParams: string;
}|{
	endpoint: E_VE96368_Browse;
	selected: true;
	content: R_SectionList;
	tabIdentifier: "FEsubscriptions";
	accessibility: D_Accessibility;
	trackingParams: string;
}|{
	content: R_MusicQueue;
	trackingParams: string;
};
type D_TabbedSearchResults={
	tabs: R_SearchResultsTab[];
};
type D_TemplateUpdate={
	identifier: `${string}|${string}`;
	serializedTemplateConfig: string;
	dependencies?: `${string}|${string}`[];
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
type D_ThumbnailOverlaySidePanel={
	text: G_Text;
	icon: T_Icon<"PLAY_ALL">;
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
	untoggledServiceEndpoint: T_SE_Signal<M_Empty_WCM,G_ClientSignal>;
	untoggledAccessibility: D_Accessibility;
	toggledAccessibility: D_Accessibility;
	trackingParams: string;
};
type D_TimestampWithNanos={
	seconds: `${number}`;
	nanos: number;
};
type D_Title={title: G_Text;};
type DC_CommandExecutor={
	commands: (C_UpdateToggleButtonState|E_Like)[];
};
type C_CommandExecutor={
	clickTrackingParams: string;
	commandExecutorCommand: DC_CommandExecutor;
};
type T_Id<T>={id: T;};
type D_ToggleButtonIdData={toggleButtonIdData: T_Id<"TOGGLE_BUTTON_ID_TYPE_LIKE">;};

type D_ToggleButton={
	style: T_StyleType<"STYLE_TEXT">;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LIKE"|"DISLIKE"|"LOOP">;
	defaultText: G_Text;
	defaultServiceEndpoint: C_CommandExecutor;
	toggledText: G_Text;
	toggledServiceEndpoint: E_Like;
	accessibility: D_Label;
	trackingParams: string;
	defaultTooltip: string;
	toggledTooltip: string;
	toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
	accessibilityData: D_Accessibility;
	toggleButtonSupportedData: D_ToggleButtonIdData;
	targetId: "watch-like"|"watch-dislike";
};
type D_ToggleButtonText={
	defaultText: G_Text;
	toggledText: G_Text;
	buttonId: "TOGGLE_BUTTON_ID_TYPE_LIKE";
};
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
	endpoint: GE_Browse;
	trackingParams: string;
	overrideEntityKey: string;
};
type D_TopbarMenuButton_MenuItem={
	sections: [TR_MP_MenuSection<R_CompactLink>];
	trackingParams: string;
	style: "MULTI_PAGE_MENU_STYLE_TYPE_CREATION";
};
type R_TopbarMenu=TR_MultiPageMenu<D_TopbarMenuButton_MenuItem>;

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
	// ChannelNavigationEndpointWebCommandMetadata
	endpoint: GE_Browse;
	callToActionIcon: T_Icon<"CHEVRON_RIGHT">;
	trackingParams: string;
};
type D_Tracking={trackingParams: string;};
type D_Transcript=Record<"content",R_TranscriptSearchPanel>&{
	trackingParams: string;
};
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
type DE_UndoFeedback={
	undoToken: string;
	actions: A_UndoFeedback[];
};
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
type D_UrlAndElapsedMediaTime={
	baseUrl: string;
	elapsedMediaTimeSeconds: number;
};
type D_UrlFormat=[
	"android-app://com.google.android.youtube/http/youtube.com/premium",
	"/",
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/${D_ApiPathFormat_1}`,
	`/account${""|`_${G_AccountPageSettingsSections}`}`,
	`/api/stats/ads?${string}`,
	`/channel/UC${string}`,
	`/feed/${D_BrowseEndpointPages}`,
	`/feed/trending?${string}`,
	`/gaming`,
	`/playlist?${string}`,
	`/premium`,
	`/reporthistory`,
	`/shorts/${string}`,
	D_ExternalUrlFormat,
	D_VE6827_PageUrl,
	`/@${string}`,
	"/upload",
	`/results?${string}`,
	`/channel/UC${string}`,
	`/watch?${string}`,
	`http://www.youtube.com/watch?${string}`,
	`https://www.youtube.com/watch?${string}`,
	`https://support.google.com/youtube/answer/${number}`,
	YTExternalUrl,
][number];
type YTExternalEncUrl=[
	`[parse_url_external_1] https://m.youtube.com/premium`,
][number];
type YTExternalUrl=T_SplitOnce<T_SplitOnce<YTExternalEncUrl,"]">[1]," ">[1];
type WatchUrlFormat=[
	D_WatchPageUrl,
	`/watch?${D_WatchUrlStr}`,
	`/watch?v=${string}&list=RD${string}&start_radio=1&rv=${string}`,
	`/watch?v=${string}&list=RDGM${string}&start_radio=1&rv=${string}`,
	`/watch?v=${string}&playnext=1&list=RD${`CM${`UC${string}`}`}`,
][number];
type ResultsPageUrl=`/results?search_query=${string}`;
type PlaylistUrlFormat=`/playlist?list=${D_PlaylistId}`;
type D_UrlFormatStr_2=[
	"/channel_switcher",
	`/@${string}${""|`/${ChannelSubUrlFormat}`}`,
	`/account${""|`_${G_AccountPageSettingsSections}`}`,
	`/channel/UC${string}`,
	`/feed/${D_BrowseEndpointPages}`,
	`/feed/trending?bp=${string}`,
	`/playlist?${D_PlaylistUrlParams}`,
	`/results?search_query=${string}`,
	`/shorts/${string}`,
	`/watch?${D_WatchUrlStr}`,
][number];
type D_UrlInfoItemType=[
	"PL",
	"RD",
	"RDGM",
	"RDMM",
	"RDCM",
][number];
type D_UrlInfoPlaylist={
	_tag: "playlist";
	type: D_UrlInfoItemType;
	id: string;
};
type D_UrlInfoVideo={
	_tag: "video";
	id: string;
};
type D_UrlWrappedValue={privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: string;};
type D_VE3832_PreconnectUrl=`https://rr${number}---sn-nx${string}.googlevideo.com/generate_204`;
type RE_D_VE3832_PreconnectUrl=`https://rr${number}---sn-nx${GV_Dig_sn_nx}.googlevideo.com/generate_204`;
type D_VE6827_PageLocation="history"|
	"library";
type D_VE6827_PageUrl=
	|"/feed/guide_builder"
	|`/feed/history`
	|`/feed/library`
	|`/feed/storefront?${string}`
	|`/feed/trending?${string}`
	|`/hashtag/${string}`
	|`/reporthistory`
	;
;
type FRRes=`FE${"trending"|"history"|"library"|"storefront"|"guide_builder"}`;
type D_VideoCategory=[
	"Science & Technology",
	"Film & Animation",
	"Autos & Vehicles",
	"People & Blogs",
	"Howto & Style",
	"Entertainment",
	"Gaming",
	"Comedy",
	"Music",
][number];
type D_VideoDescriptionHeader={
	title: G_Text;
	channel: G_Text;
	views: G_Text;
	publishDate: G_Text;
	factoid: R_Factoid[];
	// ChannelNavigationEndpointWebCommandMetadata
	channelNavigationEndpoint: GE_Browse;
	channelThumbnail: D_Thumbnail;
};
type D_VideoDescriptionMusicSection={
	sectionTitle: G_Text;
	carouselLockups: R_CarouselLockup[];
	topicLink: R_TopicLink;
	premiumUpsellLink: G_Text;
};
type D_VideoDetails={
	videoId: string;
	channelId: string;
	author: string;
	title: string;
};
type D_VideoIdTagStr=string&{_tag: "YtVideoId";};// TODO #5
type D_VideoMastheadAdV3={};
type D_VideoOwner={
	thumbnail: D_Thumbnail;
	title: G_Text;
	subscriptionButton: D_SubscriptionButton;
	navigationEndpoint: GE_Browse;
	subscriberCountText: G_Text;
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
	endpoint: E_Url;
	trackingParams: string;
	snackbar: RA_NotificationAction;
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
	showMoreCommand?: C_Executor;
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
type D_ViewCount={viewCount: R_VideoViewCount;};
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
type D_WatchNextTabbedResults={
	tabs: R_Tab[];
};
type D_WatchPageUrl=
	|`/watch?v=${string}&list=RD${string}&index=${number}`
	|`/watch?v=${string}&list=RD${string}&start_radio=1`
	|`/watch?v=${string}&pp=${string}`
	|`/watch?v=${string}&t=${number}s`
	|`/watch?v=${string}`
	;
type D_WatchPlaylistUrlFormat=[
		`list=${D_PlaylistId}`,
		`list=${D_PlaylistId}&index=${number}`,
		`list=${YtInfinitePlaylistFormat}&start_radio=${1|0}`
	][number];
type D_WatchUrlStr=[
		`v=${string}`,
		`v=${string}&${G_YtWatchUrl}`
	][number];
type D_WebSearchboxConfig={
	requestLanguage: "en";
	requestDomain: "ca";
	hasOnscreenKeyboard: false;
	focusSearchbox: true;
};
type DE_YpcGetCart={transactionParams: string;};
type D_YtConfig={
	visitorData: string;
	sessionIndex: 0;
	rootVisualElementType: D_VisualElementType;
};