import {run_tests as ecma_12_8_6_run_tests} from "./vm/ecma_12_8_6";
import {run_tests as ecma_12_6_run_tests} from "./vm/ecma_12_6";
import {run_tests as ecma_terminal_run_tests} from "./vm/ecma_terminal";

type TestResults = {};

class TestRunner {
	total: number = 0;
	successful: number = 0;
	async run_test(test_gen: (v?: TestResults) => Promise<void>, name: string) {
		try {
			this.total++;
			console.log(' -------- ');
			if(test_gen.length > 0) {
				await test_gen(this);
			} else {
				await test_gen();
			}
			this.successful++;
		} catch(e) {
			console.log(`${name} failed`);
		}
	}
}


async function main(): Promise<TestResults> {
	let test_runner = new TestRunner;
	await test_runner.run_test(ecma_12_8_6_run_tests, "ecma_12_8_6");
	await test_runner.run_test(ecma_12_6_run_tests, "ecma_12_6");
	await test_runner.run_test(ecma_terminal_run_tests, "ecma_12_6");
	return test_runner;
}
main().then(function(res) {
	console.log('all tests done');
	console.log(res);
});
