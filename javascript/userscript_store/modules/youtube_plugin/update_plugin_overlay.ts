import {plugin_overlay_element} from "./youtube_plugin.user"

export function update_plugin_overlay() {
	if(!plugin_overlay_element.value)
		return
	plugin_overlay_element.value.onupdate()
}
