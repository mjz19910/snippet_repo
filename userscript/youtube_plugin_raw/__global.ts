import {ClickTrackedAndCommandMetadataWatchEndpointH} from "./support/yt_api/WatchEndpointH.js";
import {__ia_excludeKeysS} from "./__ia_excludeKeysS";


export type YtWatchPage={
	/** @readonly */
	page:"watch";
	endpoint:ClickTrackedAndCommandMetadataWatchEndpointH;
}

type YtConfigAk={[U in string]: any};
declare global {
	interface Window {
		yt?: {
			config_: YtConfigAk
		}
		ytcfg?: {
			data_: YtConfigAk;
		};
	}
}
class HistoryManager {
	replaceState(a: any,b: any,c: any) {
		a;b;c;
	}
}

export abstract class YtdAppElementBase_ extends HTMLElement {
	abstract $: {
		historyManager: HistoryManager
	}
}
declare global {
	var YtdAppElementBase: typeof YtdAppElementBase_|undefined;
}
declare global {
	interface Object {
		__ia_excludeKeysS: typeof __ia_excludeKeysS;
	}
}

// CommentsSectionContinuationAction
declare global {
}
// WatchNextContinuationAction
declare global {
}
// saved_maps
declare global {
	interface InjectApi {
		saved_maps?: Map<string,Map<string,{}>>;
		saved_data?: SavedData;
	}
}

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

// PropertyHandler
declare global {
	interface InjectApi {
		PropertyHandler?: {};
	}
}

export {};
