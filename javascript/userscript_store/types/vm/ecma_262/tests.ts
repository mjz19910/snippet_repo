import {ITestRunnerNode, TestLock} from "types/tests";
import {Dispatcher} from "./Dispatcher";
import {LexReturnType} from "./LexReturnType";
import {LexerStateData, lex_js} from "./section_12";

const debug = false;
export function null_to_str<T extends any, U extends Exclude<T, null>>(e: U | null) {
	if(e === null) return 'null';
	return e;
}

class Test {
	input: string;
	result?: string
	expected: string;
	state?: LexerStateData;
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
	}
}

function to_log_return(state:LexerStateData, code: string, res: LexReturnType) {
	if(res[0]) {
		let ret: [typeof res[0], string] = [res[0], code.slice(state.cur_index, state.cur_index + res[1])];
		state.cur_index += res[1];
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
	if(state.cur_index <= (code.length - 1)) {
		return `E\`${code[state.cur_index]}\``;
	}
	console.log('eof with', res);
	return `[eof]`;
}

function test_2_critical(test_runner: ITestRunnerNode, dispatcher:Dispatcher, test_data:Test) {
	let state=test_data.state;
	if(!state)throw new Error("Missing test state");
	state.cur_index = 0;
	let js_r2 = eval(test_data.input);
	if(debug)console.log('js result', js_r2);
	let res_arr = lex_js(state, dispatcher, test_data.input);
	state.cur_index = 0;
	let log_res = res_arr.map(to_log_return.bind(null, state, test_data.input));
	test_data.complete_test(test_runner, log_res.join(""));
	let log_fmt = res_arr.map(() => "%s").join("");
	if(debug)console.log('test_ecma_12_6 res_arr for test_2 ' + log_fmt, ...log_res);
}

export async function run_test_2(test_runner: ITestRunnerNode, lock: TestLock, dispatcher:Dispatcher){
	// Test 2 (test_2_code)
	let test_2 = new Test(
		`(class {#name=12;})`,
		"(class {#name=12;})[eof]"
	);
	await lock.lock();
	test_2_critical(test_runner, dispatcher, test_2);
	await lock.unlock();
}

function test_1_critical(test_runner: ITestRunnerNode, dispatcher: Dispatcher, test_data: Test){
	let state=test_data.state;
	if(!state)throw new Error("Missing test state");
	if(debug)console.log('run tests ecma_terminal');
	// Test 1 (test_1_code)
	let res_arr = lex_js(state, dispatcher, test_data.input);
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
	state.cur_index = 0;
	let log_res = res_arr.map(to_log_return.bind(null, state, test_data.input));
	let log_fmt = res_arr.map(() => "%s").join("");
	test_data.complete_test(test_runner, log_res.join(""));
	if(debug)console.log('test_ecma_12_6 res_arr for test_1 ' + log_fmt, ...log_res);
}

export async function run_test_1(test_runner:ITestRunnerNode, lock:TestLock, dispatcher:Dispatcher) {
	let input=`(function(){let the_var=12;})`;
	let test_1 = new Test(input,`${input}[eof]`);
	let js_r1 = eval(test_1.input);
	void js_r1;
	await lock.lock();
	test_1_critical(test_runner, dispatcher, test_1);
	await lock.unlock();
}
