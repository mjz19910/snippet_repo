import {do_proxy_call_getInitialData} from "./fetch_result_handler_plugin/do_proxy_call_getInitialData.js";
import {override_prop} from "./property_handler_plugin/override_prop.js";
import {PropertyHandler} from "./property_handler_plugin/PropertyHandler.js";

declare global {
	interface Window {
		getInitialData(): {}
	}
}

export function init_override_getInitialData() {
	override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
}
