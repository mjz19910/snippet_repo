import {plugin_overlay_element,ytd_page_manager} from "./youtube_plugin.user"

export function page_changed_next_frame() {
	if(!plugin_overlay_element.value)
		return
	if(!ytd_page_manager.value)
		return
	plugin_overlay_element.value.onupdate()
	ytd_page_manager.value.getCurrentPage().append(plugin_overlay_element.value)
}
