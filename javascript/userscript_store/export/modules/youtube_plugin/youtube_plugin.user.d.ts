export {}

declare global {
	interface Window {
		ytPageType?: string
		playlist_arr?: string[]
		ytd_page_manager?: HTMLElement|null
		ytd_watch_flexy?: HTMLElement|null
		ytd_app?: HTMLElement|null
		yt_playlist_manager?: HTMLElement|null
		ytd_player?: HTMLElement|null
	}
	var window: Window&typeof globalThis
}