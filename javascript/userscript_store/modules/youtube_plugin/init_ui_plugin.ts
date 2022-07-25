import {waiting_for_ytd_player,current_timeout,ytd_player} from "./youtube_plugin.user"
import {activate_nav} from "./activate_nav"
import {wait_for_yt_player} from "./wait_for_yt_player"

export function init_ui_plugin() {
	if(waiting_for_ytd_player)
		return
	if(current_timeout===null)
		return
	if(current_timeout>0) {
		clearTimeout(current_timeout)
		current_timeout=0
	}
	if(!ytd_player||!ytd_player.player_) {
		console.log('wait for player')
		waiting_for_ytd_player=true
		wait_for_yt_player().then(function() {
			waiting_for_ytd_player=false
			init_ui_plugin()
		})
		return
	}
	if(!ytd_player.player_.getVideoData) {
		current_timeout=setTimeout(init_ui_plugin,0)
		return
	}
	if(ytd_player.active_nav) {
		console.log('ytd-player:active_nav = true')
		return
	}
	current_timeout=setTimeout(activate_nav,0)
}
