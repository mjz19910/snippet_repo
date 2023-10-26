import {Dispatcher} from "../Dispatcher.ts";
import {lexer_format_callback} from "../lexer_format_callback.ts";
import {lex_js} from "../lex_js";

export function run_test_2(Test: any) {
	let input=`(class {#name=12;})`;
	let dispatcher=new Dispatcher(input);
	let test_data=new Test(input,"(class {#name=12;})[eof]");
	let state=test_data.state;
	state.cur_index=0;
	let js_r2=eval(test_data.input);
	console.log('js result',js_r2);
	let res_arr=lex_js(state,dispatcher,test_data.input);
	state.cur_index=0;
	let log_res=res_arr.map(lexer_format_callback.bind(null,state,test_data.input));
	let log_fmt=res_arr.map(() => "%s").join("");
	test_data.complete_test(log_res.join(""));
	console.log('test_ecma_12 res_arr for test_2');
	console.log(log_fmt,...log_res);
}
