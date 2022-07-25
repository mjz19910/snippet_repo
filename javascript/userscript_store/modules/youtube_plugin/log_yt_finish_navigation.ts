import {log_current_video_data} from "./log_current_video_data"
import {log_page_type_change} from "./log_page_type_change"

/**
 * @param {{ detail?: { pageType: string; }; }} event
 */
export function log_yt_finish_navigation(event: {detail?: {pageType: string}}) {
	log_page_type_change(event)
	log_current_video_data()
}
