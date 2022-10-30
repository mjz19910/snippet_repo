import {debug} from "../config/debug"
import {update_plugin_overlay} from "./update_plugin_overlay"

export function update_ui_plugin() {
	if(debug.value) console.log('update_ui_plugin')
	setTimeout(update_plugin_overlay)
}
