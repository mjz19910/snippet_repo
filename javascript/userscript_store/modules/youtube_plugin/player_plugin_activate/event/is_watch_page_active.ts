import {ytd_page_manager} from "../../youtube_plugin.user"

export function is_watch_page_active() {
	return ytd_page_manager.value&&ytd_page_manager.value.getCurrentPage()&&ytd_page_manager.value.getCurrentPage().nodeName=="YTD-WATCH-FLEXY"
}
