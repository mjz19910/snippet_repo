import {CanRunTest} from "types/tests_mod/CanRunTest"
import {LexerStateData} from "./lexer/LexerStateData"
export class Test {
	input: string
	result?: string
	expected: string
	state?: LexerStateData
	constructor(input: string, expected_output: string) {
		this.input = input
		this.expected = expected_output
	}
	complete_test(test_runner: CanRunTest, result: string) {
		this.result = result
		if(this.result !== this.expected) {
			test_runner.report_test_failure()
		} else {
			test_runner.report_test_success()
		}
	}
}
