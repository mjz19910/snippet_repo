import {sumOffset} from "./sumOffset"
import {ytd_player,plugin_overlay_element} from "./youtube_plugin.user"

export function fix_offset() {
	if(!ytd_player.value)
		return
	if(!plugin_overlay_element.value)
		return
	let player_offset=sumOffset(ytd_player.value)
	plugin_overlay_element.value.style.top=player_offset.top_offset+"px"
	plugin_overlay_element.value.style.left=player_offset.left_offset+"px"
}
