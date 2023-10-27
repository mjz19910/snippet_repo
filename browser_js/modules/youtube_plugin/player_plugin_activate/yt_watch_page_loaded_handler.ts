// deno-lint-ignore-file
import {fix_offset} from "./fix_offset.ts";
import {init_ui_plugin} from "./init_ui_plugin.ts";
import {is_watch_page_active} from "./event/is_watch_page_active.ts";
import {title_display_toggle} from "./title_display_toggle.ts";
import {title_display_update} from "./title_display_update.ts";
import {title_text_overlay_update} from "./title_text_overlay_update.ts";
import {ui_css_toggle_click_handler} from "./ui_css_toggle_click_handler.ts";
import {PluginOverlayElement} from "./elements/PluginOverlayElement.ts";
import {update_ui_plugin} from "./update_ui_plugin.ts";
import {fire_on_visibility_change_restart_video_playback} from "./fire_on_visibility_change_restart_video_playback.ts";
import {ytd_page_manager} from "./elements/ytd_page_manager.ts";
import {ytd_app} from "./elements/ytd_app.ts";
import {ytd_watch_flexy} from "./elements/ytd_watch_flexy.ts";
import {yt_playlist_manager} from "./elements/yt_playlist_manager.ts";
import {overlay_content_div} from "./elements/overlay_content_div.ts";
import {overlay_hide_ui_input} from "./elements/overlay_hide_ui_input.ts";
import {plugin_overlay_element} from "./elements/plugin_overlay_element.ts";
import {g_api} from "../g_api.ts";
import {yt_navigate_handler_array} from "./yt_navigate_handler_array.ts";
import {yt_navigate_finish_handler_array} from "./yt_navigate_finish_handler_array.ts";
function log_yt_finish_navigation() {}
export function yt_watch_page_loaded_handler() {
	if(!ytd_app.value) {
		console.log("no ytd-app");
		return;
	}
	if(!yt_playlist_manager.value) {
		console.log("no yt-playlist-manager");
		return;
	}
	if(!ytd_page_manager.value) {
		console.log("no ytd-page-manager");
		return;
	}
	if(!ytd_watch_flexy.value) {
		console.log("no ytd-watch-flexy");
		return;
	}
	overlay_content_div.value=document.createElement("div");
	var input_modify_css_style=document.createElement("div");
	overlay_hide_ui_input.value=document.createElement("div");
	if(!plugin_overlay_element.value) {
		let overlay_element=PluginOverlayElement.cast(document.createElement("div"));
		if(g_api.value) g_api.value.plugin_overlay_element=overlay_element;
		overlay_element.id="mz_overlay";
		plugin_overlay_element.value=overlay_element;
		let custom_style_element=document.createElement("style");
		ytd_app.value.ui_plugin_style_element=custom_style_element;
		ytd_watch_flexy.value.addEventListener("yt-navigate",function(event) {
			for(let handler of yt_navigate_handler_array) {
				handler(event);
			}
		});
		ytd_app.value.addEventListener("yt-navigate-finish",function(event) {
			for(let handler of yt_navigate_finish_handler_array) {
				handler(event);
			}
		});
	}
	for(let i;i=plugin_overlay_element.value.childNodes[0];)
		i.remove();
	overlay_content_div.value.style.userSelect="all";
	overlay_content_div.value.style.width='max-content';
	plugin_overlay_element.value.append(overlay_content_div.value);
	input_modify_css_style.style.float="left";
	overlay_hide_ui_input.value.style.float="left";
	overlay_hide_ui_input.value.style.clear="left";
	overlay_hide_ui_input.value.innerHTML="H";
	overlay_hide_ui_input.value.onclick=title_display_toggle;
	title_text_overlay_update();
	plugin_overlay_element.value.append(input_modify_css_style);
	plugin_overlay_element.value.append(overlay_hide_ui_input.value);
	title_display_update();
	var css_str=`ytd-watch-next-secondary-results-renderer{overflow-x:scroll;height:80vh;}\n/*# sourceURL=yt_css_user */`;
	if(ytd_app.value.ui_plugin_style_element)
		ytd_app.value.ui_plugin_style_element.innerHTML=css_str;
	if(!ytd_player.value) return;
	ytd_player.value.active_nav=false;
	plugin_overlay_element.value.onupdate=fix_offset;
	yt_navigate_finish_handler_array[0]=log_yt_finish_navigation;
	init_ui_plugin();
	ytd_player.value.init_nav=true;
	input_modify_css_style.innerHTML="C";
	input_modify_css_style.onclick=ui_css_toggle_click_handler;
	let current_page_element=ytd_page_manager.value.getCurrentPage();
	current_page_element.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin);
	let vis_imm=false;
	ytd_app.value.app_is_visible=1;
	document.addEventListener("visibilitychange",() => {
		if(!ytd_app.value)
			return;
		if(!is_watch_page_active())
			return;
		if(document.visibilityState==='visible') {
			ytd_app.value.app_is_visible=1;
			if(vis_imm) {
				fire_on_visibility_change_restart_video_playback();
				vis_imm=false;
			}
		} else {
			ytd_app.value.app_is_visible=0;
		}
	});
	ytd_app.value.ytp_click_cint=setInterval(() => {
		if(!is_watch_page_active()||!ytd_app.value)
			return;
		if(!ytd_app.value.app_is_visible) {
			vis_imm=true;
			return;
		}
	},15*60*1000);
}
