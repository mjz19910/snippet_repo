import {plugin_overlay_element} from "./plugin_overlay_element"

export function update_plugin_overlay() {
	if(!plugin_overlay_element.value)
		return
	plugin_overlay_element.value.onupdate()
}
