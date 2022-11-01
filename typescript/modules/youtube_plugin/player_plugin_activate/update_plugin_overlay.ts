import {plugin_overlay_element} from "./elements/plugin_overlay_element.js"

export function update_plugin_overlay() {
	if(!plugin_overlay_element.value)
		return
	plugin_overlay_element.value.onupdate()
}
