import {YtdPageManagerElementInterface} from "./YtdPageManagerElementInterface.js";
import {HistoryManager} from "./HistoryManager";
import {ShadyChildrenOfYtdApp} from "./ShadyChildrenOfYtdApp";

export abstract class YtdAppElementBase_ extends HTMLElement {
	abstract $?: {
		historyManager: HistoryManager;
		["page-manager"]: YtdPageManagerElementInterface;
	};
	abstract app_is_visible?: boolean;
	abstract init_inject():void;
	abstract ui_plugin_style_element?: HTMLStyleElement;
	abstract ytp_click_cint?: number;
	abstract __shady_children:ShadyChildrenOfYtdApp;
	abstract volume_range: AbstractVolumeRange|undefined;
}
abstract class AbstractVolumeRange {
	abstract setGain(gain:number): void;
	abstract max_compressor_reduction:number;
	abstract onKeyDown(event:KeyboardEvent): void;
	/**
	 * @param {Element} view_parent
	 */
	abstract attach_to_element(view_parent:Element): void;
}
