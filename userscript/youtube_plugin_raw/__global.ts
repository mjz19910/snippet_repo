import {RendererContentItemDef} from "./support/yt_api/RendererContentItemDef";
import {MenuServiceItem} from "./support/yt_api/MenuServiceItem.js";
import {SavedData} from "./youtube_plugin.user.js";
import {SectionItemDef} from "./support/yt_api/SectionItemDef";
import {MenuRendererH} from "./support/yt_api/MenuRendererH.js";
import {DialogPopupTag} from "./support/yt_api/DialogPopupTag";
import {RichItemRendererContentDef} from "./support/yt_api/RichItemRendererContentDef";
import {NavigationEndpoint} from "./support/yt_api/NavigationEndpoint.js";
import {ContinuationItemRendererHolder} from "./support/yt_api/ContinuationItemRendererHolder.js";

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
	type SectionItem=SectionItemDef;
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
	type WatchNextItem=CompactVideoRendererHolder|ContinuationItemRendererHolder;
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

// RichItemRenderer
declare global {
	type RichItemRendererContent=RichItemRendererContentDef;
	interface RichItemRenderer {
		content: AdSlotRendererHolder;
		trackingParams?: string;
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
export type CommentsHeaderRendererHolder={
	commentsHeaderRenderer: CommentsHeaderRenderer;
};
export type CommentThreadRendererHolder={
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
export type CommandMetadata={
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
export type MenuRenderer={
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId?: string;
	trackingParams: string;
};
export type Icon={
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
export type OpenPopupAction=ToastPopupTag|DialogPopupTag;
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
};

export interface SignalServiceEndpoints extends ServiceEndpointGeneral {
	signalServiceEndpoint: SignalServiceEndpoint;
};
export interface PlaylistEditEndpointH {
	playlistEditEndpoint: {};
};

export interface AddToPlaylistServiceEndpointH {
	addToPlaylistServiceEndpoint: {};
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
	menu: MenuRendererH;
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
export type CompactPlaylistRendererHolder={
	compactPlaylistRenderer: CompactPlaylistRenderer;
};

// RendererContentItem
declare global {
	type RendererContentItem=RendererContentItemDef;
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

export {};
