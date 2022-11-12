import {CanRunTest} from "tests_mod/CanRunTest.js";
import {Test} from "../../Test.js";
import {g_ecma_262_do_debug_tests} from "../../tests.js";
import {Dispatcher} from "../Dispatcher.js";
import {lexer_format_callback} from "../lexer_format_callback.js";
import {lex_js} from "../section_12.js";

export function test_1_critical(test_runner: CanRunTest,dispatcher: Dispatcher,test_data: Test) {
	let state=test_data.state
	if(!state)
		throw new Error("Missing test state")
	if(g_ecma_262_do_debug_tests)
		console.log('run tests ecma_terminal')
	// Test 1 (test_1_code)
	let res_arr=lex_js(state,dispatcher,test_data.input)
	for(let i=0;i<res_arr.length;i++) {
		let cur=res_arr[i]
		switch(cur[0]) {
			case true:
			case false: break
			case 'OtherPunctuator': break
			case 'IdentifierName': break
			case 'WhiteSpace': break
			case 'NumericLiteral': break
			case 'RightBracePunctuator': break
			case null: {
				if(cur[1]===0) {
					console.log('token stream eof reached')
				}
			} break
			default: throw new Error("Bad");
		}
	}
	state.cur_index=0
	let log_res=res_arr.map(lexer_format_callback.bind(null,state,test_data.input))
	let log_fmt=res_arr.map(() => "%s").join("")
	test_data.complete_test(test_runner,log_res.join(""))
	if(g_ecma_262_do_debug_tests)
		console.log('test_ecma_12_6 res_arr for test_1 '+log_fmt,...log_res)
}
