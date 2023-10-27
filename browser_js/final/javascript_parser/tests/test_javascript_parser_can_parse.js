import {get_module_data} from "../get_module_data.js";
import {is_valid_utf8} from "../is_valid_utf8.js";
import {parse_javascript_str} from "../parse_javascript_str.cjs";

export function test_javascript_parser_can_parse_named_function_definition() {
	parse_javascript_str("function x(){}");
}

export function test_javascript_parser_can_parse_get_module_data_string () {
	parse_javascript_str(get_module_data());
}

export function test_javascript_parser_can_parse_is_valid_utf8_import() {
	parse_javascript_str(is_valid_utf8.toString());
}

export function test_javascript_parser_can_parse() {
	test_javascript_parser_can_parse_named_function_definition();
	test_javascript_parser_can_parse_get_module_data_string();
	test_javascript_parser_can_parse_is_valid_utf8_import();
}
