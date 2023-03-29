import {LexerStateData} from "./lexer/LexerStateData.js";

export class Test {
	input: string;
	result?: string;
	expected: string;
	state: LexerStateData;
	constructor(input: string,expected_output: string) {
		this.input=input;
		this.expected=expected_output;
		this.state={
			cur_index: 0,
		};
	}
	complete_test(result: string) {
		this.result=result;
	}
}
