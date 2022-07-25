import {plugin_overlay_element,ytd_page_manager} from "./youtube_plugin.user"

export function page_changed_next_frame() {
	if(!plugin_overlay_element)
		return
	if(!ytd_page_manager)
		return
	plugin_overlay_element.onupdate()
	ytd_page_manager.getCurrentPage().append(plugin_overlay_element)
}
