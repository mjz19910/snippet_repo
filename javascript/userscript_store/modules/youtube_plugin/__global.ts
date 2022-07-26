declare global {
	interface Window {
		g_api?: {
			Seen?: {}
			PropertyHandler?: {}
			yt_state?: Map<string,{}>
			blob_create_args_arr?: any[]
			yt_handlers?: {}
			dom_observer?: {}
			port_state?: {}
			plugin_overlay_element?: HTMLElement|null
			yt_watch_page_loaded_handler?: () => void
			gain_controller?: {}
		}
		ytPageType?: string
		playlist_arr?: string[]
		ytd_page_manager?: HTMLElement|null
		ytd_watch_flexy?: HTMLElement|null
		ytd_app?: HTMLElement|null
		yt_playlist_manager?: HTMLElement|null
		ytd_player?: HTMLElement|null
	}
}
