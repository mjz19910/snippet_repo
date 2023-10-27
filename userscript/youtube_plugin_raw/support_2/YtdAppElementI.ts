import {VolumeRange} from "../zc_child_modules/YTPlugin_Base.user.js";
import {YtdShadyChildrenOfYtdApp} from "./YtdShadyChildrenOfYtdApp.ts";
export interface YtdAppElementI extends HTMLElement {
	/** @type {HTMLStyleElement|undefined} */
	ui_plugin_style_element?: HTMLStyleElement;
	/** @type {VolumeRange|undefined} */
	volume_range?: VolumeRange;
	/** @type {boolean|undefined} */
	app_is_visible?: boolean;
	/** @type {ReturnType<typeof setInterval>|undefined} */
	ytp_click_cint?: number;
	/** @type {YtdShadyChildrenOfYtdApp} */
	__shady_children: YtdShadyChildrenOfYtdApp;
	hasNavigated: boolean;
}