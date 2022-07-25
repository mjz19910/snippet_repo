import {ui_plugin_css_enabled,ytd_app} from "./youtube_plugin.user"

export function ui_css_toggle_click_handler() {
	if(ui_plugin_css_enabled) {
		if(ytd_app&&ytd_app.ui_plugin_style_element) {
			ytd_app.ui_plugin_style_element.remove()
		}
		ui_plugin_css_enabled=false
	} else {
		if(ytd_app&&ytd_app.ui_plugin_style_element) {
			document.head.append(ytd_app.ui_plugin_style_element)
		}
		ui_plugin_css_enabled=true
	}
}
