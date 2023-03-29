import {plugin_overlay_element} from "./elements/plugin_overlay_element.js";
import {sumOffset} from "./sumOffset.js";

export function fix_offset() {
	if(!ytd_player.value)
		return;
	if(!plugin_overlay_element.value)
		return;
	let player_offset=sumOffset(ytd_player.value);
	plugin_overlay_element.value.style.top=player_offset.top_offset+"px";
	plugin_overlay_element.value.style.left=player_offset.left_offset+"px";
}
