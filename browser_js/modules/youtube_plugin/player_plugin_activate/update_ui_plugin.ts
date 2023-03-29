import {debug} from "../debug.js"
import {update_plugin_overlay} from "./update_plugin_overlay.js"

export function update_ui_plugin() {
	if(debug.value) console.log('update_ui_plugin')
	setTimeout(update_plugin_overlay)
}
