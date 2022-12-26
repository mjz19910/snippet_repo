import {Type_yt} from "./Type_yt";
import {SavedData} from "./youtube_plugin.user.js";
import {YtConfigAk} from "./YtConfigAk";
import {__ia_excludeKeysS} from "./support/yt_api/__ia_excludeKeysS";
import {WatchEndpointH} from "./support/yt_api/WatchEndpointH.js";

declare global {
	interface Window {
		yt?: Type_yt;
		ytcfg?: {
			data_: YtConfigAk;
		};
	}
	interface Object {
		__ia_excludeKeysS: typeof __ia_excludeKeysS;
	}
	interface InjectApiYt {
		iterate_tracking_params: () => any[]|undefined;
		saved_maps?: Map<string,Map<string,{}>>;
		saved_data?: SavedData;
		Seen?: {};
		port_state?: {};
		plugin_overlay_element?: {};
		AudioGainController?: {};
		audio_gain_controller?: {};
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
		playlist_arr?: string[];
		page_type_changes?: string[],
		dom_observer?: {};
		yt_handlers?: {};
		blob_create_args_arr?: {};
		yt_state_map?: {};
		PropertyHandler?: {};
	}
	interface Window {
		// Elements
		ytd_player?: HTMLElement;
		ytd_page_manager?: HTMLElement;
		ytd_watch_flexy?: HTMLElement;
		yt_playlist_manager?: HTMLElement;
		ytd_app?: HTMLElement;
		// website environment
		ytPageType?: string;
	}
}
export {};
