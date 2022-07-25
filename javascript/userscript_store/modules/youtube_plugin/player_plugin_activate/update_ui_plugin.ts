import {update_plugin_overlay} from "./update_plugin_overlay"
import {debug} from "../youtube_plugin.user"

export function update_ui_plugin() {
	if(debug.value)
		console.log('update_ui_plugin')
	setTimeout(update_plugin_overlay)
}
