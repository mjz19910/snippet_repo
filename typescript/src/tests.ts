import {section_12_8_6} from "ecma_262/lexer/section_12_8_6.js";
import {test_mod_execute_tests} from "./tests_mod/main.js"
async function do_import<T>(e: string): Promise<T> {
	try {
		let module_ = await import(e);
		module_load_success(module_);
		return module_;
	} catch(result_1) {
		module_load_failure();
		throw result_1;
	}
}
function module_load_success(e: {run_tests: () => void}) {
	e.run_tests()
	console.log("test completed")
}
function module_load_failure() {
	console.log("failed to load module")
}

test_mod_execute_tests([
	["section_12_8_6",function(): Promise<section_12_8_6> {return do_import("./ecma_262/section_12_8_6")}],
	["section_12_6",() => do_import("./ecma_262/section_12_6")],
	["section_12",() => do_import("./ecma_262/section_12")],
])
