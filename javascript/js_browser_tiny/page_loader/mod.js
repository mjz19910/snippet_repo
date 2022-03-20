import {add_element} from "./add_element.js";
import {do_exec} from "./do_exec.js";
import {do_html_load} from "./do_html_load.js";
import {DOMTagDescription} from "./DOMTagDescription.js";
import {DOMTagLoadHandlers} from "./DOMTagLoadHandlers.js";
import {NodeInternalData} from "./NodeInternalData.js";
import {on_page_data_loaded} from "./on_page_data_loaded.js";
import {resolve_http_url} from "./resolve_http_url.js";
import {wait} from "./wait.js";
import {fetch_url} from "./fetch_url.js";
/**@type {Buffer[]} */
export let data = [];
/** @type {{request?:{}}} */
export let dom_state = {};

export {
	add_element,
	do_exec,
	do_html_load,
	DOMTagDescription,
	DOMTagLoadHandlers,
	NodeInternalData,
	on_page_data_loaded,
	resolve_http_url,
	fetch_url,
	wait,
};

export function use_imports() {
	return [
		add_element,
		do_exec,
		do_html_load,
		DOMTagDescription,
		DOMTagLoadHandlers,
		NodeInternalData,
		on_page_data_loaded,
		resolve_http_url,
		fetch_url,
		wait,
	];
}
