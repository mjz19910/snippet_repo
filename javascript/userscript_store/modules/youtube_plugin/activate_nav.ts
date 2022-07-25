import {dummy_event_callback} from "./dummy_event_callback"
import {page_changed_next_frame} from "./page_changed_next_frame"
import {debug,ytd_player,ytd_page_manager,plugin_overlay_element,player_overlay_style_str} from "./youtube_plugin.user"
import {VolumeRangePlugin} from "./VolumeRangePlugin"

export function activate_nav() {
	if(debug)
		console.log('activate_nav:fire')
	VolumeRangePlugin()
	if(!ytd_player.value)
		return
	if(!ytd_page_manager.value)
		return
	if(ytd_player.value.active_nav)
		return
	if(!plugin_overlay_element.value)
		return
	ytd_player.value.active_nav=true
	plugin_overlay_element.value.setAttribute("style",player_overlay_style_str)
	plugin_overlay_element.value.onupdate()
	ytd_page_manager.value.getCurrentPage().append(plugin_overlay_element.value)
	dummy_event_callback()
	ytd_page_manager.value.addEventListener("yt-page-type-changed",function() {
		if(!ytd_player.value)
			return
		if(!ytd_page_manager.value)
			return
		if(ytd_page_manager.value.getCurrentPage().tagName!="YTD-WATCH-FLEXY") {
			ytd_player.value.is_watch_page_active=false
			plugin_overlay_element.value&&plugin_overlay_element.value.remove()
			return
		} else {
			ytd_player.value.is_watch_page_active=true
		}
		requestAnimationFrame(page_changed_next_frame)
	})
}
