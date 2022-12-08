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

// filter_on_initial_data
declare global {
	interface Window {
		ytPageType?: string;
	}
}
declare global {
	interface Window {
	}
}

// log_current_video_data
declare global {
	interface Window {
		playlist_arr?: string[];
	}
}

declare global {
	interface Window {
		ytd_player?: HTMLElement|null;
	}
}

declare global {
	interface Window {
		ytd_page_manager?: HTMLElement|null;
	}
}

declare global {
	interface Window {
		ytd_watch_flexy?: HTMLElement|null;
	}
}

declare global {
	interface Window {
		yt_playlist_manager?: HTMLElement|null;
	}
}

// log_page_type_change
declare global {
	interface Window {
		page_type_changes?: string[],
	}
}
