import {get_module_data} from "../get_module_data.js";
import {is_valid_utf8} from "../is_valid_utf8.js";
import {parse_javascript_str} from "../parse_javascript_str.cjs";

export function parse_javascript_test_01() {
	parse_javascript_str("function x(){}");
}
export function parse_javascript_test_02 () {
	const module_data=[get_module_data()];
	parse_javascript_str(module_data[0]);
	let use_valid_utf8_function=false;
	if(use_valid_utf8_function) {
		window.code=is_valid_utf8.toString();
		return;
	}
	window.code=module_data.toString();
}
