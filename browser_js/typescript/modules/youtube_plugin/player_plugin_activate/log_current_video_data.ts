import {overlay_content_div} from "./elements/overlay_content_div.js"
import {playlist_arr} from "./playlist_arr.js"
import {update_plugin_overlay} from "./update_plugin_overlay.js"
import {wait_for_yt_player} from "./wait_for_yt_player.js"

export function log_current_video_data() {
	if(!ytd_player.value) return
	if(!ytd_player.value.player_) {
		wait_for_yt_player().then(log_current_video_data)
		return
	}
	if(!playlist_arr.value) return
	const video_data=ytd_player.value.player_.getVideoData()
	update_plugin_overlay()
	if(video_data.video_id===undefined)
		return
	if(video_data.eventId===void 0)
		return
	const {video_id,title,author}=video_data
	const playlist_log_str=`[${author},${video_id}] ${title}`
	if(playlist_log_str===playlist_arr.value.at(-1))
		return
	playlist_arr.value.push(playlist_log_str)
	console.log(playlist_log_str)
	if(!overlay_content_div.value)
		return
	overlay_content_div.value.innerText=`[${video_id}] ${title}`
}
