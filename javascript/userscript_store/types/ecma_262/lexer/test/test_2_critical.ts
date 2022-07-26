import {Test} from "types/ecma_262/Test"
import {g_ecma_262_do_debug_tests} from "types/ecma_262/tests"
import {CanRunTest} from "types/tests_mod/CanRunTest"
import {Dispatcher} from "../Dispatcher"
import {lex_js} from "../section_12"
import {lexer_format_callback as lexer_format_callback} from "../lexer_format_callback"
export function test_2_critical(test_runner: CanRunTest,dispatcher: Dispatcher,test_data: Test) {
	let state=test_data.state
	if(!state)
		throw new Error("Missing test state")
	state.cur_index=0
	let js_r2=eval(test_data.input)
	if(g_ecma_262_do_debug_tests)
		console.log('js result',js_r2)
	let res_arr=lex_js(state,dispatcher,test_data.input)
	state.cur_index=0
	let log_res=res_arr.map(lexer_format_callback.bind(null,state,test_data.input))
	test_data.complete_test(test_runner,log_res.join(""))
	let log_fmt=res_arr.map(() => "%s").join("")
	if(g_ecma_262_do_debug_tests)
		console.log('test_ecma_12_6 res_arr for test_2 '+log_fmt,...log_res)
}
