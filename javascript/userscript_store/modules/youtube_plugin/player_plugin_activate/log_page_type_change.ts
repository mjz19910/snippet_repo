import {ytd_page_manager} from "./elements/ytd_page_manager"
import {playlist_arr} from "../loose_plugins/playlist_arr"

export function log_page_type_change(event: {detail?: {pageType: string}}) {
	let {detail}=event
	if(detail) {
		let s_val=detail.pageType
		switch(s_val) {
			default: {
				if(ytd_page_manager.value) {
					let page_manager_current_tag_name=ytd_page_manager.value.getCurrentPage().tagName.toLowerCase()
					let nav_load_str=`:: current_page ${page_manager_current_tag_name} -> ${detail.pageType}`
					playlist_arr.value?.push(nav_load_str)
					console.log(nav_load_str)
				} else {
					let nav_load_str=`:: current_page = ${detail.pageType}`
					playlist_arr.value?.push(nav_load_str)
					console.log(nav_load_str)
				}
			} return
		}
	}
}
