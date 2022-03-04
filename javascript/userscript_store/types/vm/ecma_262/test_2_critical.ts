import {ITestRunner} from "types/tests_mod/tests";
import {Dispatcher} from "./Dispatcher";
import {lex_js} from "./section_12";
import {Test} from "./Test";
import {to_log_return} from "./to_log_return";
import {g_ecma_262_do_debug_tests} from "./tests";


export function test_2_critical(test_runner: ITestRunner, dispatcher: Dispatcher, test_data: Test) {
	let state = test_data.state;
	if(!state)
		throw new Error("Missing test state");
	state.cur_index = 0;
	let js_r2 = eval(test_data.input);
	if(g_ecma_262_do_debug_tests)
		console.log('js result', js_r2);
	let res_arr = lex_js(state, dispatcher, test_data.input);
	state.cur_index = 0;
	let log_res = res_arr.map(to_log_return.bind(null, state, test_data.input));
	test_data.complete_test(test_runner, log_res.join(""));
	let log_fmt = res_arr.map(() => "%s").join("");
	if(g_ecma_262_do_debug_tests)
		console.log('test_ecma_12_6 res_arr for test_2 ' + log_fmt, ...log_res);
}
