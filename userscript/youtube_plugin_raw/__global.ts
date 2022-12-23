import {__ia_excludeKeysS} from "./support/__ia_excludeKeysS";
import {GlobalAttach} from "./support/global_vars.js";
import {GlobalAttach_yt} from "./support/make_yt.js";
import {GlobalAttachWindow} from "./support/make_Window.js";
import {GlobalAttach_ytcfg} from "./support/make_ytcfg.js";

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
	type SectionItem=RichItemRendererItem|RichSectionRendererItem;
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

type AdSlotRenderer={};

// RichItemRenderer
declare global {
	type AdSlotRenderers={
		adSlotRenderer: AdSlotRenderer;
	};
	type RichItemRendererContent=AdSlotRenderers;
	interface RichItemRenderer {
		content: AdSlotRenderers;
	}
	type RichItemRendererItem={
		richItemRenderer: RichItemRenderer;
	};
}

// RichSectionRendererItem
declare global {
	type RichSectionRendererItem={
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
type ContentItemCommentsHeaderRenderer={
	commentsHeaderRenderer: CommentsHeaderRenderer;
};
type ContentItemCommentThreadRenderer={
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
	ghostCards: GhostCards;
};
type ContinuationItemRenderers={
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
type OpenPopupAction=ToastPopupTag;
type ServiceEndpointAction={
	clickTrackingParams: string;
}&({
	addToPlaylistCommand: AddToPlaylistCommand;
}|{
	openPopupAction: OpenPopupAction;
});
type SignalServiceEndpoint={
	signal: "CLIENT_SIGNAL";
	actions: ServiceEndpointAction[];
};
type ServiceEndpointBase<T>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	trackingParams?: string;
}&T;
type SignalServiceEndpoints={
	signalServiceEndpoint: SignalServiceEndpoint;
};
type ServiceEndpoint=
	ServiceEndpointBase<SignalServiceEndpoints>|
	ServiceEndpointBase<{playlistEditEndpoint: {};}>|
	ServiceEndpointBase<{addToPlaylistServiceEndpoint: {};}>|
	ServiceEndpointBase<{feedbackEndpoint: {};}>|
	ServiceEndpointBase<{getReportFormEndpoint: {};}>;
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
	watchEndpoint?: WatchEndpoint;
	browseEndpoint?: BrowseEndpoint;
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
}
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
	thumbnailOverlayNowPlayingRenderer: ThumbnailOverlayNowPlayingRenderer
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
export type CompactVideoRenderers={
	compactVideoRenderer: CompactVideoRenderer;
};

// RendererContentItem
declare global {
	type RendererContentItem=
		RichItemRendererItem|
		RichSectionRendererItem|
		ContentItemCommentsHeaderRenderer|
		ContentItemCommentThreadRenderer|
		ContinuationItemRenderers|
		CompactVideoRenderers|
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
