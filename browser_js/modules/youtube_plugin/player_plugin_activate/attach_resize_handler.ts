import {on_yt_action} from "./found_elements/on_yt_action.js"
import {plugin_overlay_element} from "./elements/plugin_overlay_element.js"

export function attach_resize_handler() {
	document.addEventListener('yt-action',on_yt_action as (this: Document,ev: Event) => void)
	window.addEventListener("resize",function() {
		plugin_overlay_element.value&&plugin_overlay_element.value.onupdate()
	})
}
