import * as section_12_8_6 from "./ecma_262/lexer/TemplateLiteralComp.js";
import * as section_12_6 from "./ecma_262/lexer/NamesAndKeywords.js";
import * as section_12 from "./ecma_262/lexer/LexGrammarSyntax.js";
import {test_mod_execute_tests} from "./tests_mod/test_mod_execute_tests.js";
import {TestState} from "./TestState";

interface RunTestType {
	run_tests: () => void;
}

async function do_import<T extends RunTestType>(e: string): Promise<T> {
	try {
		let module_: T=await import(e);
		module_load_success(module_);
		return module_;
	} catch(result_1) {
		module_load_failure();
		throw result_1;
	}
}
function module_load_success<T extends RunTestType>(module_: T) {
	module_.run_tests();
	console.log("test completed");
}
function module_load_failure() {
	console.log("failed to load module");
}

export const used_modules=[
	section_12,
	section_12_6,
	section_12_8_6,
]satisfies (readonly RunTestType[]);

let tests=new TestState;

tests.items.push(() => ["section_12",function(): Promise<typeof section_12> {
	return do_import("./ecma_262/lexer/section_12");
}]);
tests.items.push(() => ["section_12_6",function(): Promise<typeof section_12_6> {
	return do_import("./ecma_262/lexer/section_12_6");
}]);
tests.items.push(() => ["section_12_8_6",function(): Promise<typeof section_12_8_6> {
	return do_import("./ecma_262/lexer/section_12_8_6");
}]);

tests.items.push(() => ["test",function() {},[] as []]);

test_mod_execute_tests(tests);
