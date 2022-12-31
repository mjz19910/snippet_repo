import {SavedData} from "../a/SavedData";

declare global {
	interface InjectApiYt {
		saved_maps?: Map<string,Map<string,{}>>;
		saved_data?: SavedData;
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
