import {ytd_page_manager} from "modules/youtube_plugin/elements/ytd_page_manager"

export function is_watch_page_active() {
	return ytd_page_manager.value&&ytd_page_manager.value.getCurrentPage()&&ytd_page_manager.value.getCurrentPage().nodeName=="YTD-WATCH-FLEXY"
}
