import {update_plugin_overlay} from "./update_plugin_overlay"
import {wait_for_yt_player} from "./wait_for_yt_player"
import {ytd_player,playlist_arr,overlay_content_div} from "./youtube_plugin.user"

export function log_current_video_data() {
	if(!ytd_player)
		return
	if(!ytd_player.player_) {
		wait_for_yt_player().then(log_current_video_data)
		return
	}
	const video_data=ytd_player.player_.getVideoData()
	update_plugin_overlay()
	if(video_data.video_id===undefined)
		return
	if(video_data.eventId===void 0)
		return
	const {video_id,title,author}=video_data
	const playlist_log_str=`[${author},${video_id}] ${title}`
	if(playlist_log_str===playlist_arr.at(-1))
		return
	playlist_arr.push(playlist_log_str)
	console.log(playlist_log_str)
	if(!overlay_content_div)
		return
	overlay_content_div.innerText=`[${video_id}] ${title}`
}
