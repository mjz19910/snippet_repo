import { get_module_data } from "../get_module_data.js";
import { is_valid_utf8 } from "../is_valid_utf8.js";
import { parse_javascript_str } from "../parse_javascript_str.cjs";

export function test_javascript_parser_can_parse_named_function_definition() {
	parse_javascript_str("function x(){}");
}

export function test_javascript_parser_can_parse_get_module_data_string() {
	parse_javascript_str(get_module_data());
}

export function test_javascript_parser_can_parse_is_valid_utf8_import() {
	parse_javascript_str(is_valid_utf8.toString());
}

/** @arg {Deno.TestContext} ctx */
export async function test_javascript_parser_can_parse(ctx) {
	await ctx.step({
		name: "can_parse_named_function_definition",
		fn() {
			test_javascript_parser_can_parse_named_function_definition();
		},
	});
	await ctx.step({
		name: "can_parse_get_module_data_string",
		fn() {
			test_javascript_parser_can_parse_get_module_data_string();
		},
	});
	await ctx.step({
		name: "can_parse_is_valid_utf8_import",
		fn() {
			test_javascript_parser_can_parse_is_valid_utf8_import();
		},
	});
}
Deno.test({
	name: "test_javascript_parser_can_parse",
	async fn(ctx) {
		await test_javascript_parser_can_parse(ctx);
	},
});
