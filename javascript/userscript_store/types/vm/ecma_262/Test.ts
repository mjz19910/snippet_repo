import {CanRunTests as CanRunTests} from "types/tests_mod/ITestRunner";
import {LexerStateData} from "./LexerStateData.1";
export class Test {
	input: string;
	result?: string;
	expected: string;
	state?: LexerStateData;
	constructor(input: string, expected_output: string) {
		this.input = input;
		this.expected = expected_output;
	}
	complete_test(test_runner: CanRunTests, result: string) {
		this.result = result;
		if(this.result !== this.expected) {
			test_runner.report_test_failure();
		} else {
			test_runner.report_test_success();
		}
	}
}
