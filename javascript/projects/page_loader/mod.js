import {add_element} from "./add_element.js";
import {do_exec} from "./do_exec.js";
import {DOMTagDescription} from "./DOMTagDescription.js";
import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {NodeInternalData} from "./NodeInternalData.js";
import {resolve_http_url} from "./resolve_http_url.js";
import {wait} from "./wait.js";
import {FetchRequestState} from "./FetchRequestState.js";
/**@type {Buffer[]} */
export let data = [];
/** @type {{request?:{}}} */
export let dom_state = {};

export {
	add_element,
	do_exec,
	DOMTagDescription,
	DOMTagLoadHandlers,
	NodeInternalData,
	resolve_http_url,
	FetchRequestState,
	wait,
};

export function use_imports() {
	return [
		FetchRequestState,
		add_element,
		do_exec,
		DOMTagDescription,
		DOMTagLoadHandlers,
		NodeInternalData,
		resolve_http_url,
		wait,
	];
}
