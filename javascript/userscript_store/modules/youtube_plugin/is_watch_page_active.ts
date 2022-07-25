import {ytd_page_manager} from "./youtube_plugin.user"

export function is_watch_page_active() {
	return ytd_page_manager&&ytd_page_manager.getCurrentPage()&&ytd_page_manager.getCurrentPage().nodeName=="YTD-WATCH-FLEXY"
}
