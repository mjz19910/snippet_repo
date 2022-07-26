import {on_yt_action} from "../player_plugin_activate/on_yt_action"
import {plugin_overlay_element} from "../elements/plugin_overlay_element"

export function attach_resize_handler() {
	document.addEventListener('yt-action',on_yt_action as (this: Document,ev: Event) => void)
	window.addEventListener("resize",function() {
		plugin_overlay_element.value&&plugin_overlay_element.value.onupdate()
	})
}
