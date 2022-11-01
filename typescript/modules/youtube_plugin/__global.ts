import {GApiType} from "./g_api/GApiType.js"

export {}

declare global {
	interface Window {
		g_api?: GApiType
		ytPageType?: string
		playlist_arr?: string[]
		ytd_page_manager?: HTMLElement|null
		ytd_watch_flexy?: HTMLElement|null
		ytd_app?: HTMLElement|null
		yt_playlist_manager?: HTMLElement|null
		ytd_player?: HTMLElement|null
	}
}
