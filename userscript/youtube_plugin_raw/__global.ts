import {Type_yt} from "./Type_yt";
import {Gn, SavedData} from "./youtube_plugin.user.js";
import {YtConfigAk} from "./YtConfigAk";
import {YtdAppElementBase_} from "./YtdAppElementBase_";
import {__ia_excludeKeysS} from "./__ia_excludeKeysS";

declare global {
	interface Window {
		yt?: Type_yt;
		ytcfg?: {
			data_: YtConfigAk;
		};
	}
	var YtdAppElementBase: typeof YtdAppElementBase_|undefined;
	interface Object {
		__ia_excludeKeysS: typeof __ia_excludeKeysS;
	}
	interface InjectApiYt {
		storage?: {
			on_ytd_app: (element: HTMLElement) => void;
		};
		saved_maps?: Map<string,Map<string,{}>>;
		saved_data?: SavedData;
		Seen?: {};
		port_state?: {};
		plugin_overlay_element?: {};
		HTMLMediaElementGainController?: {};
		audio_gain_controller?: {};
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
		ytPageType?: string;
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
	}

	type MBa_1={
		skipCache:false;
		provide: Hn<string>;
		useValue: {};
	};

	type MBa_2={
		skipCache:false;
		provide: Hn<string>;
		useClass: {
			[x: typeof Gn]: Hn<string>[];
		};
	};

	type MBa_3={
		skipCache:false;
		provide: Hn<string>;
		useFactory: (...x:any[])=>any;
		[x: typeof Gn]: Hn<string>[];
	};

	type MBa_Provider=MBa_1|MBa_2|MBa_3;
}
/** @template T */
class Hn<T> {
	constructor(public name: T) {}
}
export {};
