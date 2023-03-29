import {is_watch_page_active} from "./event/is_watch_page_active.js"

export function fire_on_visibility_change_restart_video_playback() {
	if(!is_watch_page_active())
		return
	if(!ytd_player.value||!ytd_player.value.player_)
		return
	if(ytd_player.value.player_.getPlayerState()!=2)
		return
	ytd_player.value.pause()
	ytd_player.value.play()
}
