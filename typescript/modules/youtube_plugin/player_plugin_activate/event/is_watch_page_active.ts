import {ytd_page_manager} from "../elements/ytd_page_manager.js"

export function is_watch_page_active() {
	if(!ytd_page_manager.value) return false;
	if(!ytd_page_manager.value.getCurrentPage()) return false;
	return ytd_page_manager.value.getCurrentPage().nodeName=="YTD-WATCH-FLEXY"
}
