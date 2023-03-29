import {page_changed_next_frame} from "./page_changed_next_frame.js";
import {player_overlay_style_source} from "./css/player_overlay_style_source.js";
import {load_volume_range_plugin} from "./load_volume_range_plugin.js";
import {ytd_page_manager} from "./elements/ytd_page_manager.js";
import {debug} from "../debug.js";
import {plugin_overlay_element} from "./elements/plugin_overlay_element.js";
import {yt_navigate_finish_handler_array} from "./yt_navigate_finish_handler_array.js";

export function activate_nav() {
	if(debug.value) console.log('activate_nav:fire');
	load_volume_range_plugin();
	if(!ytd_player.value) return;
	if(!ytd_page_manager.value) return;
	if(ytd_player.value.active_nav) return;
	if(!plugin_overlay_element.value) return;
	ytd_player.value.active_nav=true;
	plugin_overlay_element.value.setAttribute("style",player_overlay_style_source);
	plugin_overlay_element.value.onupdate();
	ytd_page_manager.value.getCurrentPage().append(plugin_overlay_element.value);
	if(yt_navigate_finish_handler_array.length<=0)
		throw new Error("Dummy callback failure");
	yt_navigate_finish_handler_array[0]({});
	ytd_page_manager.value.addEventListener("yt-page-type-changed",function() {
		if(!ytd_player.value) return;
		if(!ytd_page_manager.value) return;
		if(ytd_page_manager.value.getCurrentPage().tagName!="YTD-WATCH-FLEXY") {
			ytd_player.value.is_watch_page_active=false;
			plugin_overlay_element.value&&plugin_overlay_element.value.remove();
			return;
		} else {
			ytd_player.value.is_watch_page_active=true;
		}
		requestAnimationFrame(page_changed_next_frame);
	});
}
