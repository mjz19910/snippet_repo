import {ytd_app} from "./elements/ytd_app.js"
import {ui_plugin_css_enabled} from "./ui_plugin_css_enabled.ts"

export function ui_css_toggle_click_handler() {
	if(ui_plugin_css_enabled.value) {
		if(ytd_app.value&&ytd_app.value.ui_plugin_style_element) {
			ytd_app.value.ui_plugin_style_element.remove()
		}
		ui_plugin_css_enabled.value=false
	} else {
		if(ytd_app.value&&ytd_app.value.ui_plugin_style_element) {
			document.head.append(ytd_app.value.ui_plugin_style_element)
		}
		ui_plugin_css_enabled.value=true
	}
}
