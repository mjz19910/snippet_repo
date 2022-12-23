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
	targetId: string;
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
type OpenPopupAction={};
type ServiceEndpointAction={
	clickTrackingParams: string;
}&({
	addToPlaylistCommand: AddToPlaylistCommand
}|{
	openPopupAction: OpenPopupAction;
});
type SignalServiceEndpoint={
	actions: ServiceEndpointAction[];
};
type ServiceEndpoint={
	signalServiceEndpoint: SignalServiceEndpoint;
};
type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
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
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
};
type NavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpoint;
};
type TODO={};
type TextRun={
	navigationEndpoint: NavigationEndpoint;
	text: string;
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
	label: string;
	style: string;
	trackingParams: string;
};
type MetadataBadgeRenderers={
	metadataBadgeRenderer: MetadataBadgeRenderer;
}
type ThumbnailsHolder={};
type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};

type CompactVideoRenderer={
	accessibility: Accessibility;
	badges: MetadataBadgeRenderers[];
	channelThumbnail: ThumbnailsHolder;
	lengthText: SimpleText;
	longBylineText: TextRuns;
	menu: MenuRenderers;
	navigationEndpoint: NavigationEndpoint;
	publishedTimeText: SimpleText;
	richThumbnail: TODO;
	shortBylineText: TextRuns;
	shortViewCountText: SimpleText;
	thumbnail: {thumbnails: TODO[];};
	thumbnailOverlays: TODO[];
	title: SimpleText;
	videoId: string;
	viewCountText: SimpleText;
};
type CompactVideoRenderers={
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
