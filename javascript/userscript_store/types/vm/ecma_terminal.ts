import {TestLock, ITestRunnerNode} from "types/tests";
import {Dispatcher} from "./Dispatcher";
import {ecma_base} from "./ecma_base";
import {ecma_return_type} from "./ecma_return_type";

function lex_input_element(ecma_dispatcher: Dispatcher, str: string, index: number): ecma_return_type {
	let max_item = null, max_val = 0;
	let item_info = null;
	let cur_res = ecma_dispatcher.WhiteSpace(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.WhiteSpace;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	cur_res = ecma_dispatcher.LineTerminator(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.LineTerminator;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	cur_res = ecma_dispatcher.Comment(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.Comment;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	cur_res = ecma_dispatcher.CommonToken(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.CommonToken;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	if(debug)console.log(item_info_type_to_string(item_info));
	return [max_item, max_val];
}
enum ItemInfoType {
	Invalid,
	InputElement,
	WhiteSpace,
	DivPunctuator,
	RightBracePunctuator,
	LineTerminator,
	Comment,
	CommonToken,
	TemplateSubstitutionTail
}
function item_info_type_to_string(value: ItemInfoType | null) {
	if(value === null) return null;
	switch(value) {
		case ItemInfoType.InputElement: return 'InputElement';
	}
	switch(value) {
		case ItemInfoType.WhiteSpace: return 'WhiteSpace';
	}
	if(value != ItemInfoType.Invalid) {
		console.assert(false, `Handle (enum ItemTypeInfo).(${value}).to_string()`);
		return "Invalid";
	}
	return "Invalid";
}
const debug = false;

function lex_input_element_or_div(ecma_dispatcher: Dispatcher, str: string, index: number): ecma_return_type {
	let max_item = null, max_val = 0;
	let item_info: ItemInfoType | null = null;
	let cur_res = lex_input_element(ecma_dispatcher, str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.InputElement;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	cur_res = ecma_dispatcher.DivPunctuator(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.DivPunctuator;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	cur_res = ecma_dispatcher.RightBracePunctuator(str, index);
	if(cur_res[0] && cur_res[1] > max_val) {
		item_info = ItemInfoType.RightBracePunctuator;
		max_item = cur_res[0];
		max_val = cur_res[1];
	}
	if(debug) {
		console.log('lex_input_element_or_div', item_info_type_to_string(item_info));
	}
	return [max_item, max_val];
}

export class ecma_terminal extends ecma_base {
	do_let_parse(str: string, index: number, outputs: ecma_return_type[] = []): ecma_return_type {
		void outputs;
		let res1 = this.InputElementRegExpOrTemplateTail(str, index);
		void res1;
		return [null, 0];
	}
	InputElementDiv(str: string, index: number): ecma_return_type {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator,
		// RightBracePunctuator
		// !RegularExpressionLiteral
		// !TemplateSubstitutionTail
		let ret = lex_input_element_or_div(this.m_dispatcher, str, index);
		if(ret[0]) {
			return ret;
		} else {
			return [null, 0];
		}
	}
	InputElementRegExp(str: string, index: number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// !DivPunctuator
		// RightBracePunctuator
		// RegularExpressionLiteral
		// !TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let item_info: ItemInfoType | null = null;
		void item_info;
		let cur_res = lex_input_element(this.m_dispatcher, str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			item_info = ItemInfoType.InputElement;
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RightBracePunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RegularExpressionLiteral(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	InputElementRegExpOrTemplateTail(str: string, index: number): ecma_return_type {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// RegularExpressionLiteral,
		// TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let item_info: ItemInfoType | null = null;
		void item_info;
		let cur_res = lex_input_element(this.m_dispatcher, str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			item_info = ItemInfoType.InputElement;
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.RegularExpressionLiteral(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.TemplateSubstitutionTail(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			//max_item = 'r_brace';
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
	InputElementTemplateTail(str: string, index: number) {
		// WhiteSpace, LineTerminator, Comment, CommonToken
		// DivPunctuator
		// TemplateSubstitutionTail
		let max_item = null, max_val = 0;
		let item_info: ItemInfoType | null = null;
		void item_info;
		let cur_res = lex_input_element(this.m_dispatcher, str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			item_info = ItemInfoType.InputElement;
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.DivPunctuator(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			item_info = ItemInfoType.DivPunctuator;
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		cur_res = this.m_dispatcher.TemplateSubstitutionTail(str, index);
		if(cur_res[0] && cur_res[1] > max_val) {
			item_info = ItemInfoType.TemplateSubstitutionTail;
			max_item = cur_res[0];
			max_val = cur_res[1];
		}
		return [max_item, max_val];
	}
}


export function TODO_err(): Error {
	let err = new Error("TODO");
	Error.captureStackTrace(err, TODO_err);
	return err;
}

let cur_index = 0;

function js_lex_input_or_regexp_or_template_tail(dispatcher: Dispatcher, str: string, res_arr: ecma_return_type[]) {
	let res = dispatcher.InputElementRegExpOrTemplateTail(str, cur_index);
	if(res[0]) {
		cur_index += res[1];
	}
	res_arr.push(res);
	while(res[0]) {
		res = dispatcher.InputElementRegExpOrTemplateTail(str, cur_index);
		res_arr.push(res);
		if(res[0]) {
			let mat = str.slice(cur_index, cur_index + res[1]);
			if(mat === 'let') {
				let res_arr: ecma_return_type[] = [];
				let res_mul = dispatcher.ecma_terminal.do_let_parse(str, cur_index, res_arr);
				if(res_mul[0] === null) {
					// TODO: do this
					console.error('TODO: term_lexer.do_let_parse');
				}
				if(res_mul[0]) {
					cur_index += res_mul[1];
					continue;
				}
			}
			cur_index += res[1];
		}
	}
}

function js_lex_input_or_div(term_lexer: Dispatcher, str: string, res_arr: ecma_return_type[]) {
	let res = term_lexer.InputElementDiv(str, cur_index);
	if(res[0]) {
		cur_index += res[1];
	}
	res_arr.push(res);
	do {
		res = term_lexer.InputElementDiv(str, cur_index);
		res_arr.push(res);
		if(!res[0]) continue;
		cur_index += res[1];
	} while(res[0]);
}

function lex_js(dispatcher: Dispatcher, str: string) {
	let res_arr: ecma_return_type[] = [];
	cur_index = 0;
	while(cur_index <= (str.length - 1)) {
		let start_len = cur_index;
		js_lex_input_or_regexp_or_template_tail(dispatcher, str, res_arr);
		if(cur_index <= (str.length - 1)) {
			let last = res_arr.pop();
			if(debug)console.log('not done');
			if(debug)console.log('last', last);
		}
		if(start_len === cur_index) {
			if(debug)console.log('length not changed');
			break;
		}
		start_len = cur_index;
		js_lex_input_or_div(dispatcher, str, res_arr);
		if(res_arr.length > 0 && cur_index <= (str.length - 1)) {
			let last = res_arr.pop();
			if(!last) throw new Error("Unreachable");
			if(last[0]) {

			}
			if(debug)console.log('not done');
			if(debug)console.log('last', last);
		} else {
			break;
		}
		if(start_len === cur_index) {
			console.log('length not changed');
			break;
		}
	}
	return res_arr;
}

function to_log_return(code: string, res: ecma_return_type) {
	if(res[0]) {
		let ret: [typeof res[0], string] = [res[0], code.slice(cur_index, cur_index + res[1])];
		cur_index += res[1];
		if(!ret[1].includes(',')) {
			return ret[1];
		}
		if(ret[1].includes("`") && !ret[1].includes("'")) {
			return `"${ret[1]}"`;
		}
		if(ret[1].includes("'") && !ret[1].includes("`")) {
			return `\`${ret[1]}\``;
		}
		return `'${ret[1]}'`;
	}
	if(cur_index <= (code.length - 1)) {
		return `E\`${code[cur_index]}\``;
	}
	return ` @@E(${res.map(null_to_str).join(",")})`;
}

function null_to_str<T extends any, U extends Exclude<T, null>>(e: U | null) {
	if(e === null) return 'null';
	return e;
}

class Test {
	input: string;
	result?: string
	expected: string;
	constructor(input: string, expected_output:string) {
		this.input = input;
		this.expected=expected_output;
	}
	complete_test(test_runner:ITestRunnerNode, result:string) {
		this.result=result;
		if(this.result !== this.expected) {
			test_runner.report_test_failure();
		} else {
			test_runner.report_test_success();
		}
		console.assert(this.result === this.expected, "Assertion failed: Test result matches expected");
	}
}

function test_1_critical(test_runner: ITestRunnerNode, dispatcher:Dispatcher, test_2:Test) {
	let js_r2 = eval(test_2.input);
	if(debug)console.log('js result', js_r2);
	let res_arr = lex_js(dispatcher, test_2.input);
	cur_index = 0;
	let log_res = res_arr.map(to_log_return.bind(null, test_2.input));
	test_2.complete_test(test_runner, log_res.join(""));
	let log_fmt = res_arr.map(() => "%s").join("");
	if(debug)console.log('test_ecma_12_6 res_arr for test_2 ' + log_fmt, ...log_res);
}

async function run_tests_2(test_runner: ITestRunnerNode, lock: TestLock, dispatcher:Dispatcher){
	// Test 2 (test_2_code)
	let test_2 = new Test(
		`(class {#name=12;})`,
		"(class {#name=12;}) @@E(null,0)"
	);
	await lock.lock();
	test_1_critical(test_runner, dispatcher, test_2);
	await lock.unlock();
}

function run_test_1_critical(test_runner: ITestRunnerNode, dispatcher: Dispatcher, test_data: Test){
	if(debug)console.log('run tests ecma_terminal');
	// Test 1 (test_1_code)
	let res_arr = lex_js(dispatcher, test_data.input);
	for(let i=0;i<res_arr.length;i++){
		let cur=res_arr[i];
		switch(cur[0]){
			case true:
			case false:break;
			case 'OtherPunctuator':break;
			case 'IdentifierName':break;
			case 'WhiteSpace':break;
			case 'NumericLiteral':break;
			case 'RightBracePunctuator':break;
			case null:{
				if(cur[1] === 0){
					console.log('token stream eof reached');
				}
			} break;
			default:console.log(cur);throw new Error("Bad");
		}
	}
	cur_index = 0;
	let log_res = res_arr.map(to_log_return.bind(null, test_data.input));
	let log_fmt = res_arr.map(() => "%s").join("");
	test_data.complete_test(test_runner, log_res.join(""));
	if(debug)console.log('test_ecma_12_6 res_arr for test_1 ' + log_fmt, ...log_res);
}

async function run_tests_impl(test_runner:ITestRunnerNode, lock:TestLock, dispatcher:Dispatcher) {
	let test_1 = new Test(
		`(function(){let the_var=12;})`,
		"(function(){let the_var=12;}) @@E(null,0)"
	);
	let js_r1 = eval(test_1.input);
	void js_r1;
	await lock.lock();
	run_test_1_critical(test_runner, dispatcher, test_1);
	await lock.unlock();
}

class TestState {
	promise: Promise<void> | null = null;
	resolver: ((value: void | PromiseLike<void>) => void) | null = null;
	success: boolean = false;
}

const test_state = new TestState;

export function run_tests(test_runner:ITestRunnerNode, lock: TestLock) {
	let dispatcher = new Dispatcher;
	test_runner.start_async_template<Dispatcher>(run_tests_impl, test_runner, lock, dispatcher);
	test_runner.start_async_template<Dispatcher>(run_tests_2, test_runner, lock, dispatcher);
}
