import {SavedData} from "../youtube_plugin.user.js";

declare global {
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
}
