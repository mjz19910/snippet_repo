import {InjectAPIStr as InjectAPIStr_} from "../DebugAPI_raw/DebugAPI.user";

// YtdPageManagerElement
declare global {
	class YtdPageManagerElement extends HTMLElement {
		getCurrentPage(): YtCurrentPage;
	}
	class YtCurrentPage extends HTMLElement {
		getPlayer(): YTDPlayerElement;
	}
}

// ReloadContinuationItemsCommand
declare global {
	type SectionItem={
		richItemRenderer: RichItemRenderer;
	}|{
		richSectionRenderer: RichSectionRenderer;
	};
	type ReloadContinuationItemsCommand={
		slot: "RELOAD_CONTINUATION_SLOT_BODY";
		targetId: "browse-feedFEwhat_to_watch";
		continuationItems: SectionItem[];
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
	type CompactVideoRenderer={};
	type ContinuationItemRenderer={};
	type WatchNextItem={
		compactVideoRenderer: CompactVideoRenderer;
	}|{
		continuationItemRenderer: ContinuationItemRenderer;
	};
	class WatchNextContinuationAction {
		targetId: "watch-next-feed";
		continuationItems: WatchNextItem[];
	}
}

// InjectAPI['saved_maps']
declare global {
	interface InjectAPI {
		saved_maps?: Map<string,Map<string,{}>>;
	}
}

// ContinuationItem
declare global {
	type ContinuationItem=RendererContentItem;
}

// RendererContentItem
declare global {
	class RichGridRenderer {
		masthead: {
			[str: string]: {}|undefined;
			videoMastheadAdV3Renderer?: {};
		};
		contents: RendererContentItem[];
	}
	class RichShelfRenderer {
		icon: {
			iconType: string;
		}|null;
		title: {
			runs: {
				text: string;
			}[];
		};
	}
	class RichSectionRenderer {
		content: {
			richShelfRenderer: RichShelfRenderer;
		};
	}

	class RichItemRenderer {
		content: {
			adSlotRenderer?: {};
		};
	}
	type RendererContentItem={
		richItemRenderer: RichItemRenderer;
	}|{
		richSectionRenderer: RichSectionRenderer;
	};
}

// InjectApiStr
declare global {
	const InjectAPIStr: typeof InjectAPIStr_;
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
	interface InjectAPI {
		Seen?: {};
	}
}

// port_state
declare global {
	interface InjectAPI {
		port_state?: {};
	}
}

// plugin_overlay_element
declare global {
	interface InjectAPI {
		plugin_overlay_element?: {};
	}
}

// HTMLMediaElementGainController
declare global {
	interface InjectAPI {
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
	interface InjectAPI {
		dom_observer?: {};
	}
}


// YTFilterHandlers
declare global {
	interface InjectAPI {
		yt_handlers?: {};
	}
}

// URL.createObjectURL Proxy
declare global {
	interface InjectAPI {
		blob_create_args_arr?: {};
	}
}

// YTIterateAllBase.update_state
declare global {
	interface InjectAPI {
		yt_state_map?: {};
	}
}

// export
declare global {
	interface InjectAPI {
		PropertyHandler?: {};
	}
}
