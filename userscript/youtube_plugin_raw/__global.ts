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

// RendererContentItem
declare global {
	interface RichGridRenderer {
		masthead: {
			[str: string]: {}|undefined;
			videoMastheadAdV3Renderer?: {};
		};
		contents: RendererContentItem[];
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

	interface RichItemRenderer {
		content: {
			adSlotRenderer?: {};
		};
	}
	type RichItemRendererItem={
		richItemRenderer: RichItemRenderer;
	};
	type RichSectionRendererItem={
		richSectionRenderer: RichSectionRenderer;
	};
	type CommentsHeaderRenderer={};
	type CommentThreadRenderer={};
	type ContentItemCommentsHeaderRenderer={
		commentsHeaderRenderer: CommentsHeaderRenderer;
	};
	type ContentItemCommentThreadRenderer={
		commentThreadRenderer: CommentThreadRenderer;
	};
	type YtClickTracked={
		clickTrackingParams: string;
	}
	type CommandToken={
		token: string;
	}
	type ContinuationCommand =CommandToken&{
		request: string;
	}
	type WebCommandMetadata0={
		sendPost: boolean;
		apiUrl: string;
	};
	type WebCommandMetadata1={
		apiUrl: string;
		rootVe: number;
		url: string;
		webPageType: string;
	};
	type WebCommandMetadata=WebCommandMetadata0|WebCommandMetadata1;
	type CommandMetadata={
		webCommandMetadata: WebCommandMetadata;
	};
	type YtEndpoint=YtClickTracked&{
		commandMetadata: CommandMetadata;
	}
	type ContinuationEndpoint=YtEndpoint&{
		continuationCommand: ContinuationCommand;
	}
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
	type MenuRenderers={menuRenderer: {};};
	type TrackingParams={
		trackingParams: string;
	};
	type BrowseEndpoint={
		browseId: string;
		canonicalBaseUrl: string;
	}
	type NavigationEndpointsData={
		watchEndpoint: TODO;
	}|{
		browseEndpoint: BrowseEndpoint;
	};
	type NavigationEndpoint={};
	type TODO={};
	type TextRun={
		navigationEndpoint: NavigationEndpoint;
		text: string;
	};
	type TextData={
		runs: TextRun[];
	};

	type CompactVideoRenderer={
		accessibility: TODO;
		badges: TODO[];
		channelThumbnail: TODO;
		lengthText: {accessibility: TODO,simpleText: string;};
		longBylineText: TextData;
		menu: MenuRenderers;
		navigationEndpoint: YtEndpoint&{
			watchEndpoint: TODO;
		};
		publishedTimeText: {simpleText:  string;};
		richThumbnail: TODO;
		shortBylineText: TextData;
		shortViewCountText: {accessibility: TODO,simpleText: string;};
		thumbnail: {thumbnails: TODO[]};
		thumbnailOverlays: TODO[];
		title: {accessibility: TODO,simpleText:  string;};

		videoId: string;

		viewCountText: {simpleText: "15,435 views";};
	};
	type CompactVideoRenderers={
		compactVideoRenderer: CompactVideoRenderer;
	};
	type RendererContentItem=
		RichItemRendererItem|
		RichSectionRendererItem|
		ContentItemCommentsHeaderRenderer|
		ContentItemCommentThreadRenderer|
		ContinuationItemRenderers|
		never;
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
