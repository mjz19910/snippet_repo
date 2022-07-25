import {sumOffset} from "./sumOffset"
import {ytd_player,plugin_overlay_element} from "./youtube_plugin.user"

export function fix_offset() {
	if(!ytd_player)
		return
	if(!plugin_overlay_element)
		return
	let player_offset=sumOffset(ytd_player)
	plugin_overlay_element.style.top=player_offset.top_offset+"px"
	plugin_overlay_element.style.left=player_offset.left_offset+"px"
}
