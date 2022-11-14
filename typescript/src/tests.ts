import * as section_12_8_6 from "ecma_262/lexer/section_12_8_6.js";
import * as section_12_6 from "ecma_262/lexer/section_12_6.js";
import * as section_12 from "ecma_262/lexer/section_12.js";
import {test_mod_execute_tests} from "./tests_mod/main.js"
async function do_import<T>(e: string): Promise<T> {
	let errors=[];
	try {
		let module_ = await import(e);
		module_load_success(module_);
		return module_;
	} catch(result_1) {
		errors.push(result_1);
	}
	try {
		let module_ = await import(e+".js");
		module_load_success(module_);
		return module_;
	} catch(result_1) {
		errors.push(result_1);
	}
	module_load_failure();
	throw new AggregateError(errors);
}
function module_load_success(e: {run_tests: () => void}) {
	e.run_tests()
	console.log("test completed")
}
function module_load_failure() {
	console.log("failed to load module")
}

test_mod_execute_tests([
	["section_12_8_6",function(): Promise<typeof section_12_8_6> {return do_import("./ecma_262/section_12_8_6")}],
	["section_12_6",function(): Promise<typeof section_12_6> {return do_import("./ecma_262/section_12_6")}],
	["section_12",function(): Promise<typeof section_12> {return do_import("./ecma_262/section_12")}],
])
