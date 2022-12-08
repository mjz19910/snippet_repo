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
		gain_controller: {};
	}
}

// created_blobs
declare global {
	interface Window {
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
	}
}

// ytd_player & ytd_page_manager
declare global {
	interface Window {
		ytPageType?: string;
		playlist_arr?: string[];
		ytd_page_manager?: HTMLElement|null;
		ytd_watch_flexy?: HTMLElement|null;
		yt_playlist_manager?: HTMLElement|null;
		ytd_player?: HTMLElement|null;
		page_type_changes?: string[],
	}
}
