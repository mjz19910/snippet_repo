import {YtPlugin} from "../../zc_child_modules/YTPlugin_Base.user.js";
declare global {
	export interface Window {
		yt_plugin: YtPlugin;
	}
}