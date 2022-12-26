import {YtdPageManagerElementInterface} from "./YtdPageManagerElementInterface.js";
import {HistoryManager} from "./HistoryManager";


export abstract class YtdAppElementBase_ extends HTMLElement {
	abstract $?: {
		historyManager: HistoryManager;
		["page-manager"]: YtdPageManagerElementInterface;
	};
	abstract app_is_visible?: boolean;
	abstract init_inject?:()=> void;
	abstract ui_plugin_style_element?: HTMLStyleElement;
	abstract ytp_click_cint?: number
}
