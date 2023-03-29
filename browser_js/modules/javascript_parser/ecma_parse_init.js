import {get_module_data} from "./get_module_data.js";
import {is_valid_utf8} from "./is_valid_utf8.js";
import window from "./window_def.js";

export {Holder} from "./__global.js";

export function ecma_parse_init() {
	if('code' in window&&window.code) return;
	const module_data=[get_module_data()];
	let use_valid_utf8_function=false;
	if(use_valid_utf8_function) {
		window.code=is_valid_utf8.toString();
		return;
	}
	window.code=module_data.toString();
}
