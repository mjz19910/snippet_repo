import {Dispatcher} from "../Dispatcher.js";
import {lex_js} from "../section_12.js";
import {lexer_format_callback} from "../lexer_format_callback.js";
import {Test} from "../../Test.js";

export function test_2_critical(dispatcher: Dispatcher,test_data: Test) {
	let state=test_data.state;
	if(!state)
		throw new Error("Missing test state");
	state.cur_index=0;
	let js_r2=eval(test_data.input);
	console.log('js result',js_r2);
	let res_arr=lex_js(state,dispatcher,test_data.input);
	state.cur_index=0;
	let log_res=res_arr.map(lexer_format_callback.bind(null,state,test_data.input));
	let log_fmt=res_arr.map(() => "%s").join("");
	test_data.complete_test(log_res.join(""));
	console.log('test_ecma_12_6 res_arr for test_2');
	console.log(log_fmt,...log_res);
}
