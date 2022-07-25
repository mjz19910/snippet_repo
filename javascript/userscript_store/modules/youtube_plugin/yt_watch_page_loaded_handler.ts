import {fix_offset} from "./fix_offset"
import {init_ui_plugin} from "./init_ui_plugin"
import {is_watch_page_active} from "./is_watch_page_active"
import {log_yt_finish_navigation} from "./log_yt_finish_navigation"
import {title_display_toggle} from "./title_display_toggle"
import {title_display_update} from "./title_display_update"
import {title_text_overlay_update} from "./title_text_overlay_update"
import {ui_css_toggle_click_handler} from "./ui_css_toggle_click_handler"
import {update_plugin_overlay} from "./update_plugin_overlay"
import {ytd_app,yt_playlist_manager,ytd_page_manager,ytd_watch_flexy,overlay_content_div,overlay_hide_ui_input,plugin_overlay_element,g_api,on_yt_navigate,on_yt_navigate_finish,ytd_player,debug} from "./youtube_plugin.user"
import {PluginOverlayElement} from "./PluginOverlayElement"

export function yt_watch_page_loaded_handler() {
	if(!ytd_app) {
		console.log("no ytd-app")
		return
	}
	if(!yt_playlist_manager) {
		console.log("no yt-playlist-manager")
		return
	}
	if(!ytd_page_manager) {
		console.log("no ytd-page-manager")
		return
	}
	if(!ytd_watch_flexy) {
		console.log("no ytd-watch-flexy")
		return
	}
	overlay_content_div=document.createElement("div")
	var input_modify_css_style=document.createElement("div")
	overlay_hide_ui_input=document.createElement("div")
	if(!plugin_overlay_element) {
		let overlay_element=PluginOverlayElement.cast(document.createElement("div"))
		g_api.plugin_overlay_element=overlay_element
		overlay_element.id="mz_overlay"
		plugin_overlay_element=overlay_element
		let custom_style_element=document.createElement("style")
		ytd_app.ui_plugin_style_element=custom_style_element
		ytd_watch_flexy.addEventListener("yt-navigate",function(event) {
			for(let handler of on_yt_navigate) {
				handler(event)
			}
		})
		ytd_app.addEventListener("yt-navigate-finish",function(event) {
			for(let handler of on_yt_navigate_finish) {
				handler(event)
			}
		})
	}
	for(let i;i=plugin_overlay_element.childNodes[0];)
		i.remove()
	overlay_content_div.style.userSelect="all"
	overlay_content_div.style.width='max-content'
	plugin_overlay_element.append(overlay_content_div)
	input_modify_css_style.style.float="left"
	overlay_hide_ui_input.style.float="left"
	overlay_hide_ui_input.style.clear="left"
	overlay_hide_ui_input.innerHTML="H"
	overlay_hide_ui_input.onclick=title_display_toggle
	title_text_overlay_update()
	plugin_overlay_element.append(input_modify_css_style)
	plugin_overlay_element.append(overlay_hide_ui_input)
	title_display_update()
	var css_str=`ytd-watch-next-secondary-results-renderer{overflow-x:scroll;height:80vh;}\n/*# sourceURL=yt_css_user */`
	if(ytd_app.ui_plugin_style_element)
		ytd_app.ui_plugin_style_element.innerHTML=css_str
	if(!ytd_player)
		return
	ytd_player.active_nav=false
	plugin_overlay_element.onupdate=fix_offset
	on_yt_navigate_finish[0]=log_yt_finish_navigation
	init_ui_plugin()
	ytd_player.init_nav=true
	input_modify_css_style.innerHTML="C"
	input_modify_css_style.onclick=ui_css_toggle_click_handler
	let current_page_element=ytd_page_manager.getCurrentPage()
	function update_ui_plugin() {
		if(debug)
			console.log('update_ui_plugin')
		setTimeout(update_plugin_overlay)
	};
	current_page_element.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin)
	// visibilitychange handler (resume video when page is visible again)
	let vis_imm=false
	ytd_app.app_is_visible=1
	function fire_on_visibility_change_restart_video_playback() {
		if(!is_watch_page_active())
			return
		if(!ytd_player||!ytd_player.player_)
			return
		if(ytd_player.player_.getPlayerState()!=2)
			return
		ytd_player.pause()
		ytd_player.play()
	}
	document.addEventListener("visibilitychange",function() {
		if(!ytd_app)
			return
		if(!is_watch_page_active())
			return
		if(document.visibilityState==='visible') {
			ytd_app.app_is_visible=1
			if(vis_imm) {
				fire_on_visibility_change_restart_video_playback()
				vis_imm=false
			}
		} else {
			ytd_app.app_is_visible=0
		}
	})
	// spell:ignore cint
	ytd_app.ytp_click_cint=setInterval(() => {
		if(!is_watch_page_active()||!ytd_app)
			return
		if(!ytd_app.app_is_visible) {
			vis_imm=true
			return
		}
	},15*60*1000)
}
