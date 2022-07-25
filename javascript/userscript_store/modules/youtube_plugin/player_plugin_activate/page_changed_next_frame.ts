import {ytd_page_manager} from "../elements/ytd_page_manager"
import {plugin_overlay_element} from "./plugin_overlay_element"

export function page_changed_next_frame() {
	if(!plugin_overlay_element.value)
		return
	if(!ytd_page_manager.value)
		return
	plugin_overlay_element.value.onupdate()
	ytd_page_manager.value.getCurrentPage().append(plugin_overlay_element.value)
}
