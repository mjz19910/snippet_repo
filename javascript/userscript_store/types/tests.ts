import {test_mod_execute_tests} from "./tests_mod/main"
async function do_import(e: string): Promise<void> {
	try {
		return module_load_success(await import(e))
	} catch(result_1) {
		return module_load_failure()
	}
}
function module_load_success(e:{run_tests: () => void}) {
	e.run_tests()
	console.log("test completed")
}
function module_load_failure() {
	console.log("failed to load module")
}

test_mod_execute_tests([
	["section_12_8_6",()=>do_import("./ecma_262/section_12_8_6")],
	["section_12_6",()=>do_import("./ecma_262/section_12_6")],
	["section_12",()=>do_import("./ecma_262/section_12")],
])
