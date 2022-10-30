import {current_timeout} from "./current_timeout"
import {ytd_player} from "./elements/ytd_player"
import {waiting_for_ytd_player} from "./waiting_for_ytd_player"
import {activate_nav} from "./activate_nav"
import {wait_for_yt_player} from "./wait_for_yt_player"

export function init_ui_plugin() {
	if(waiting_for_ytd_player.value)
		return
	if(current_timeout.value===null)
		return
	if(current_timeout.value>0) {
		clearTimeout(current_timeout.value)
		current_timeout.value=0
	}
	if(!ytd_player.value||!ytd_player.value.player_) {
		console.log('wait for player')
		waiting_for_ytd_player.value=true
		wait_for_yt_player().then(function() {
			waiting_for_ytd_player.value=false
			init_ui_plugin()
		})
		return
	}
	if(!ytd_player.value.player_.getVideoData) {
		current_timeout.value=setTimeout(init_ui_plugin,0)
		return
	}
	if(ytd_player.value.active_nav) {
		console.log('ytd-player:active_nav = true')
		return
	}
	current_timeout.value=setTimeout(activate_nav,0)
}
