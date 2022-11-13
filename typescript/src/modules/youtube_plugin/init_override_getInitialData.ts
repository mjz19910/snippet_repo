import {do_proxy_call_getInitialData} from "./fetch_result_handler_plugin/do_proxy_call_getInitialData.js";
import {PropertyHandler} from "./PropertyHandler.js";

declare global {
	interface Window {
		getInitialData(): {};
	}
}

export function init_override_getInitialData() {
	Object.defineProperty(
		window,
		"getInitialData",
		new PropertyHandler(do_proxy_call_getInitialData,void 0)
	);
}
