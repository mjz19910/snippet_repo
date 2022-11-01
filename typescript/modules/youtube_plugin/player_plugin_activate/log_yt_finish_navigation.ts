import {log_current_video_data} from "./log_current_video_data.js"
import {log_page_type_change} from "./log_page_type_change.js"

export function log_yt_finish_navigation(event: {detail?: {pageType: string}}) {
	log_page_type_change(event)
	log_current_video_data()
}
