import {Type_yt} from "./Type_yt";
import {SavedData} from "./youtube_plugin.user.js";
import {YtConfigAk} from "./YtConfigAk";
import {YtdAppElementBase_} from "./YtdAppElementBase_";
import {__ia_excludeKeysS} from "./__ia_excludeKeysS";

declare global {
	interface Window {
		yt?: Type_yt
		ytcfg?: {
			data_: YtConfigAk;
		};
	}
	var YtdAppElementBase: typeof YtdAppElementBase_|undefined;
	interface Object {
		__ia_excludeKeysS: typeof __ia_excludeKeysS;
	}
	interface InjectApi {
		saved_maps?: Map<string,Map<string,{}>>;
		saved_data?: SavedData;
	}
	interface InjectApi {
		Seen?: {};
	}
	interface InjectApi {
		port_state?: {};
	}
	interface InjectApi {
		plugin_overlay_element?: {};
		HTMLMediaElementGainController?: {};
		audio_gain_controller?: {};
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
		ytPageType?: string;
		playlist_arr?: string[];
		// Elements
		ytd_player?: HTMLElement|null;
		ytd_page_manager?: HTMLElement|null;
		ytd_watch_flexy?: HTMLElement|null;
		yt_playlist_manager?: HTMLElement|null;
		ytd_app?: HTMLElement|null;
		page_type_changes?: string[],
		dom_observer?: {};
		yt_handlers?: {};
		blob_create_args_arr?: {};
		yt_state_map?: {};
		PropertyHandler?: {};
	}
}

export {};
