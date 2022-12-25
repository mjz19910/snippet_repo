import {SavedData} from "./youtube_plugin.user";

// YtdPageManagerElement
declare global {
	interface YtdPageManagerElementInterface extends HTMLElement {
		getCurrentPage(): YtCurrentPage;
	}
	interface YTDPlayerElement extends HTMLElement {
		active_nav: boolean;
		player_: {getVideoData(): {video_id: string; eventId: undefined; title: any; author: any;}; getPlayerState(): {};}|null;
		playerResolver_: {
			promise: Promise<void>;
		};
		init_nav: boolean;
		is_watch_page_active: boolean;
		pause(): void;
		play(): void;
	}
	interface YtCurrentPage extends HTMLElement {
		getPlayer(): YTDPlayerElement;
		__has_theater_handler_plugin: boolean|undefined;
	}
}

// ReloadContinuationItemsCommand
declare global {
	type SectionItem=RichItemRendererHolder|RichSectionRendererHolder;
	type ReloadContinuationItemsCommand={
		slot: "RELOAD_CONTINUATION_SLOT_BODY";
		targetId: "browse-feedFEwhat_to_watch";
		continuationItems: SectionItem[];
	};
}

declare global {
	type BrowseFeedItem={};
	type BrowseFeedAction={
		targetId: "browse-feedFEwhat_to_watch";
		continuationItems: BrowseFeedItem[];
	};
}

// CommentsSectionContinuationAction
declare global {
	type CommentsSectionItem={};
	type CommentsSectionContinuationAction={
		targetId: "comments-section";
		continuationItems: CommentsSectionItem[];
	};
}
// WatchNextContinuationAction
declare global {
	type WatchNextItem={
		compactVideoRenderer: CompactVideoRenderer;
	}|{
		continuationItemRenderer: ContinuationItemRenderer;
	};
	interface WatchNextContinuationAction {
		targetId: "watch-next-feed";
		continuationItems: WatchNextItem[];
	}
}

// saved_maps
declare global {
	interface InjectApi {
		saved_maps?: Map<string,Map<string,{}>>;
	}
}

// saved_objects
declare global {
	interface InjectApi {
		saved_data?: SavedData;
	}
}

// ContinuationItem
declare global {
	type ContinuationItem=RendererContentItem;
}

type AdLayoutLoggingData={
	"serializedAdServingDataEntry": string;
};

type AdLayoutMetadata={
	"layoutId": string;
	"layoutType": "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE";
	"adLayoutLoggingData": AdLayoutLoggingData;
};

type UrlWrappedValue={
	"privateDoNotAccessOrElseTrustedResourceUrlWrappedValue": string;
};

type AboutThisAdRenderer={
	"url": UrlWrappedValue;
	trackingParams: string;
};

type DialogPopup={
	aboutThisAdRenderer: AboutThisAdRenderer;
};

type DialogPopupTag={
	"popup": DialogPopup;
	"popupType": "DIALOG";
};

type ImpressionEndpoint={
	clickTrackingParams: string;
	"loggingUrls": [
		{
			"baseUrl": "https://www.youtube.com/pagead/adview?ai=CR9DJiI6lY62vDMm7n88Pnre6kAngxfL9bfCOlrycEWQQASAAYP2Q9oDMA4IBF2NhLXB1Yi02MjE5ODExNzQ3MDQ5MzcxoAHLt6f4A6gDBMgDCqoEyAFP0EC2FSEYx70zuAUppUfEkYi_mOxY9ayL2TsEqmuwqQ2uR52X5F8mREDx148616YrlzJGcdfwasaotiQufJZQh_1P-F5EUxNcTrvVkGAoIHM-E6HcARQOzmMpiHURkEuWhENDfN2plBxHA5lui-nCj1tpA07TYASPOdBjxm-rT6PJyNg5mzjomgxxcY4JpG3rnZbC1TQ_an4StPQ5YOx-FCxGyY58dQA2TCk1vQwtBzqiGbOgOwWxy0tPKdPvQ51LcGX2i_nxJ8AEyNr865sEiAWjkqTnR5IFCQgTaAF47fX5BqAGboAHncjYB4gHAZAHAqgHgqqxAqgHhAioB6jSG6gHtgeoB-DPG6gH6dQbqAeMzRuoB7HcG6gHpJqxAqgHkZ-xAqgHsJuxAqgH36GxAqgHpqqxAqgHgcYbqAerxRuoB-PZG6gHt6mxAqgH6auxApIIC0FBQUFBQUFBQUFB0ggYCIDAgEAQAhgAMgSBgoAOOgeAgICAgIEEyAkAugs-CAIQBRgWIAgoATADQAFIAFABWCVgAGgAcAGIAQCYAQGiARIKAggBKAH4AQGQAgKoAgXAAgLYAQGAAgGIAgW4E____________wGwFALAFYGAgECKFwoIAxgBKAEwATgBoBcBqReJBEg1yjlletIXDhIK7E7vTqtctFyTaRhu&sigh=f6Ah-ilTPVs&cid=CAESD-D2saJYt_ikQ_sicNcKDQ";
		}
	];
	"pingingEndpoint": {
		"hack": true;
	};
};

type UrlEndpoint={
	url: string;
	target: "TARGET_NEW_WINDOW";
};

type ClickCommand={
	clickTrackingParams: string;
	"commandMetadata": CommandMetadata;
	"urlEndpoint": UrlEndpoint;
};

type RenderingContent={
	"displayAdRenderer": {
		trackingParams: string;
		"layout": "DISPLAY_AD_LAYOUT_TOP_LANDSCAPE_IMAGE";
		"titleText": {
			"simpleText": "Create Lasting Wealth";
		};
		"image": {
			thumbnail: ThumbnailHolder;
			trackingParams: string;
		};
		// spell:ignore Linqto
		"bodyText": SimpleText;
		"secondaryText": SimpleText;
		"badge": {
			"metadataBadgeRenderer": MetadataBadgeRenderer;
		};
		"menu": {
			"menuRenderer": {
				"items": [
					{
						"menuNavigationItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "My Ad Centre";
									}
								];
							};
							"icon": {
								"iconType": "INFO";
							};
							navigationEndpoint: NavigationEndpoint;
							trackingParams: string;
						};
					}
				];
				trackingParams: string;
				"accessibility": {
					"accessibilityData": {
						"label": "Action menu";
					};
				};
			};
		};
		"ctaButton": {
			"buttonRenderer": {
				"style": "STYLE_PRIMARY";
				"text": SimpleText;
				"icon": Icon;
				trackingParams: string;
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			};
		};
		impressionEndpoints: ImpressionEndpoint[];
		"clickCommand": ClickCommand;
		"mediaHoverOverlay": {
			"buttonRenderer": {
				"style": "STYLE_LIGHT_TEXT";
				"text": {
					"simpleText": "Visit site";
				};
				"icon": {
					"iconType": "EXTERNAL_LINK";
				};
				trackingParams: string;
				"iconPosition": "BUTTON_ICON_POSITION_TYPE_RIGHT_OF_TEXT";
			};
		};
		"mediaBadge": {
			"metadataBadgeRenderer": {
				"icon": {
					"iconType": "EXTERNAL_LINK";
				};
				"style": "BADGE_STYLE_TYPE_BLACK";
				trackingParams: string;
			};
		};
	};
};

type InFeedAdLayoutRenderer={
	"adLayoutMetadata": AdLayoutMetadata,
	"renderingContent": RenderingContent;
};

type AdSlotMetadata={
	"slotId": `${number}:${number}:${number}:${number}`;
	"slotType": "SLOT_TYPE_IN_FEED";
	"slotPhysicalPosition": number;
};

type AdSlotRenderer={
	adSlotMetadata: AdSlotMetadata;
	fulfillmentContent: {
		fulfilledLayout: {
			inFeedAdLayoutRenderer: InFeedAdLayoutRenderer;
		};
	};
	enablePacfLoggingWeb: boolean;
};
type VideoRenderer={};
type RadioRenderer={};
type AdSlotRendererHolder={
	adSlotRenderer: AdSlotRenderer;
};
type VideoRendererHolder={
	videoRenderer: VideoRenderer;
};

type RadioRendererHolder={
	radioRenderer: RadioRenderer;
};

// RichItemRenderer
declare global {
	type RichItemRendererContent=AdSlotRendererHolder|VideoRendererHolder|RadioRendererHolder;
	interface RichItemRenderer {
		content: RichItemRendererContent;
		trackingParams: string;
		rowIndex?: number;
		colIndex?: number;
	}
	type RichItemRendererHolder={
		richItemRenderer: RichItemRenderer;
	};
}

// RichSectionRendererItem
declare global {
	type RichSectionRendererHolder={
		richSectionRenderer: RichSectionRenderer;
	};
}


interface RichShelfRenderer {
	icon: {
		iconType: string;
	}|null;
	title: {
		runs?: {
			text: string;
		}[];
	};
}
interface RichSectionRenderer {
	content: {
		richShelfRenderer: RichShelfRenderer;
	};
}

type CommentsHeaderRenderer={};
type CommentThreadRenderer={};
type CommentsHeaderRendererHolder={
	commentsHeaderRenderer: CommentsHeaderRenderer;
};
type CommentThreadRendererHolder={
	commentThreadRenderer: CommentThreadRenderer;
};
type CommandToken={
	token: string;
};
type ContinuationCommand=CommandToken&{
	request: string;
};
type WebCommandMetadata={
	sendPost?: boolean;
	apiUrl?: string;
	rootVe?: number;
	url?: string;
	webPageType?: string;
};
type CommandMetadata={
	webCommandMetadata: WebCommandMetadata;
};
type ContinuationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
type GhostGridRenderer={
	rows: number;
};
type GhostCards={
	ghostGridRenderer: GhostGridRenderer;
};
type ContinuationItemRenderer={
	trigger: string;
	continuationEndpoint: ContinuationEndpoint;
	button?: {
		"buttonRenderer": {
			"style": "STYLE_SUGGESTIVE",
			"size": "SIZE_DEFAULT",
			"isDisabled": false,
			"text": TextRuns;
			trackingParams: string;
			"command": {
				"clickTrackingParams": string;
				"commandMetadata": CommandMetadata;
				continuationCommand?: ContinuationCommand;
			},
		};
	};
	ghostCards?: GhostCards;
};
type ContinuationItemRendererHolder={
	continuationItemRenderer: ContinuationItemRenderer;
};
type MenuRenderer={
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
	trackingParams: string;
};
type Icon={
	iconType: string;
};
type CreatePlaylistServiceEndpoint={
	params: string;
	videoIds: string[];
};
type OnCreateListCommand={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
type AddToPlaylistCommand={
	listType: string;
	onCreateListCommand: OnCreateListCommand;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};
type NotificationActionRenderer={
	responseText: SimpleText;
	trackingParams: string;
};
type ToastPopup={
	notificationActionRenderer: NotificationActionRenderer;
};
type ToastPopupTag={
	popup: ToastPopup;
	popupType: "TOAST";
};
type OpenPopupAction=ToastPopupTag|DialogPopupTag;
type OpenPopupActionHolder={
	clickTrackingParams: string;
	openPopupAction: OpenPopupAction;
};
type AddToPlaylistCommandHolder={
	clickTrackingParams: string;
	addToPlaylistCommand: AddToPlaylistCommand;
};
type ServiceEndpointAction=AddToPlaylistCommandHolder|OpenPopupActionHolder;
type SignalServiceEndpoint={
	signal: "CLIENT_SIGNAL";
	actions: ServiceEndpointAction[];
};
type ServiceEndpointGeneral={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};
export type TrackedServiceEndpointGeneral={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	trackingParams: string;
}

interface SignalServiceEndpoints extends ServiceEndpointGeneral {
	signalServiceEndpoint: SignalServiceEndpoint;
};
interface PlaylistEditEndpointH {
	playlistEditEndpoint: {};
};

interface AddToPlaylistServiceEndpointH {
	addToPlaylistServiceEndpoint: {};
};

interface FeedbackEndpointH {
	feedbackEndpoint: {};
};

interface GetReportFormEndpointH {
	getReportFormEndpoint: {};
};

type ServiceEndpoint=
	SignalServiceEndpoints|
	PlaylistEditEndpointH|
	AddToPlaylistServiceEndpointH|
	FeedbackEndpointH|
	GetReportFormEndpointH;
type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
	trackingParams?: string;
	hasSeparator?: boolean;
};
type MenuServiceItem={
	menuServiceItemRenderer: MenuServiceItemRenderer;
};
type MenuRenderers={
	menuRenderer: MenuRenderer;
};
type CommonConfig={
	url: string;
};
type PlaybackOnesieConfig={
	commonConfig: CommonConfig;
};
type WatchEndpointConfig={
	html5PlaybackOnesieConfig: PlaybackOnesieConfig;
};
type WatchEndpoint={
	nofollow: boolean;
	videoId: string;
	params?: string;
	startTimeSeconds?: number;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
};
type NavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
}|{
	openPopupAction: OpenPopupAction;
}|{
	watchEndpoint: WatchEndpoint;
}|{
	browseEndpoint: BrowseEndpoint;
};
type BrowseEndpoint={
	browseId: string;
	canonicalBaseUrl: string;
};
type TextRun={
	text: string;
	navigationEndpoint?: NavigationEndpoint;
};
type TextRuns={
	runs: TextRun[];
};
type AccessibilityData={
	label: string;
};
type Accessibility={
	accessibilityData: AccessibilityData;
};
type MetadataBadgeRenderer={
	icon?: Icon;
	label?: string;
	style: string;
	tooltip?: string;
	trackingParams: string;
	accessibilityData?: AccessibilityData;
};
type MetadataBadgeRenderers={
	metadataBadgeRenderer: MetadataBadgeRenderer;
};
type ThumbnailsHolder={};
type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};
type Thumbnail={
	url: string;
	width: number;
	height: number;
};
interface ThumbnailHolder {
	thumbnails: Thumbnail[];
};
type ACTION_ADD_VIDEO={
	addedVideoId: string;
	action: "ACTION_ADD_VIDEO";
};
type ACTION_REMOVE_VIDEO_BY_VIDEO_ID={
	action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID";
	removedVideoId: string;
};
type _ACTIONS=ACTION_ADD_VIDEO|ACTION_REMOVE_VIDEO_BY_VIDEO_ID;

type PlaylistEditEndpoint={
	playlistId: string;
	actions: _ACTIONS[];
};

type ThumbnailOverlayToggleButtonRenderer={
	isToggled?: boolean;
	untoggledIcon: Icon;
	toggledIcon: Icon;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		playlistEditEndpoint?: PlaylistEditEndpoint;
		signalServiceEndpoint?: SignalServiceEndpoint;
	};
	toggledServiceEndpoint?: {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		playlistEditEndpoint: PlaylistEditEndpoint;
	};
	untoggledAccessibility: Accessibility;
	toggledAccessibility: Accessibility;
	trackingParams: string;
};

type ThumbnailOverlayTimeStatusRenderer={
	text: SimpleText;
	style: "DEFAULT";
};

type ThumbnailOverlayResumePlaybackRenderer={
	percentDurationWatched: number;
};

type ThumbnailOverlayNowPlayingRenderer={
	text: TextRuns;
};

type ThumbnailOverlay={
	thumbnailOverlayResumePlaybackRenderer: ThumbnailOverlayResumePlaybackRenderer;
}|{
	thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer;
}|{
	thumbnailOverlayToggleButtonRenderer: ThumbnailOverlayToggleButtonRenderer;
}|{
	thumbnailOverlayNowPlayingRenderer: ThumbnailOverlayNowPlayingRenderer;
};
interface MovingThumbnailDetails extends ThumbnailHolder {
	logAsMovingThumbnail: boolean;
};
type MovingThumbnailRenderer={
	movingThumbnailDetails?: MovingThumbnailDetails;
	enableHoveredLogging: true,
	enableOverlay: true;
};
export type RichThumbnail={
	movingThumbnailRenderer: MovingThumbnailRenderer;
};
type CompactVideoRenderer={
	accessibility: Accessibility;
	badges?: MetadataBadgeRenderers[];
	channelThumbnail: ThumbnailsHolder;
	lengthText: SimpleText;
	longBylineText: TextRuns;
	menu: MenuRenderers;
	navigationEndpoint: NavigationEndpoint;
	publishedTimeText: SimpleText;
	richThumbnail?: RichThumbnail;
	shortBylineText: TextRuns;
	shortViewCountText: SimpleText;
	thumbnail: ThumbnailHolder;
	thumbnailOverlays: ThumbnailOverlay[];
	title: SimpleText;
	ownerBadges?: MetadataBadgeRenderers[];
	trackingParams: string;
	videoId: string;
	viewCountText: SimpleText;
};
export type CompactVideoRendererHolder={
	compactVideoRenderer: CompactVideoRenderer;
};

type CompactPlaylistRenderer={};
type CompactPlaylistRendererHolder={
	compactPlaylistRenderer: CompactPlaylistRenderer;
};

// RendererContentItem
declare global {
	type RendererContentItem=
		RichItemRendererHolder|
		RichSectionRendererHolder|
		CommentsHeaderRendererHolder|
		CommentThreadRendererHolder|
		ContinuationItemRendererHolder|
		CompactVideoRendererHolder|
		CompactPlaylistRendererHolder|
		never;
}

// RichGridRenderer
declare global {
	interface RichGridRenderer {
		masthead: {
			[str: string]: {}|undefined;
			videoMastheadAdV3Renderer?: {};
		};
		contents: RendererContentItem[];
	}
}

// ResState
declare global {
	type ResState={
		active: boolean;
		resolver: () => void;
	};
}

export {};

// Seen
declare global {
	interface InjectApi {
		Seen?: {};
	}
}

// port_state
declare global {
	interface InjectApi {
		port_state?: {};
	}
}

// plugin_overlay_element
declare global {
	interface InjectApi {
		plugin_overlay_element?: {};
	}
}

// HTMLMediaElementGainController
declare global {
	interface InjectApi {
		HTMLMediaElementGainController?: {};
		audio_gain_controller?: {};
	}
}

// created_blobs
declare global {
	interface Window {
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
	}
}

// filter_on_initial_data
declare global {
	interface Window {
		ytPageType?: string;
	}
}

// log_current_video_data
declare global {
	interface Window {
		playlist_arr?: string[];
	}
}

// Elements
declare global {
	interface Window {
		ytd_player?: HTMLElement|null;
		ytd_page_manager?: HTMLElement|null;
		ytd_watch_flexy?: HTMLElement|null;
		yt_playlist_manager?: HTMLElement|null;
		ytd_app?: HTMLElement|null;
	}
}

// log_page_type_change
declare global {
	interface Window {
		page_type_changes?: string[],
	}
}

// dom_observer
declare global {
	interface InjectApi {
		dom_observer?: {};
	}
}


// YTFilterHandlers
declare global {
	interface InjectApi {
		yt_handlers?: {};
	}
}

// URL.createObjectURL Proxy
declare global {
	interface InjectApi {
		blob_create_args_arr?: {};
	}
}

// YTIterateAllBase.update_state
declare global {
	interface InjectApi {
		yt_state_map?: {};
	}
}

// export
declare global {
	interface InjectApi {
		PropertyHandler?: {};
	}
}
