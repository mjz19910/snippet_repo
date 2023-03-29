import {RootTestRunner} from "./TestRunner.js";
import {TestState} from "../TestState.js";

export async function test_mod_execute_tests(test_arr: TestState<any[],any>): Promise<void> {
	let test_runner=new RootTestRunner;
	console.log(` --- Starting tests --- `);
	test_runner.pre_start_set_test_count(test_arr.items.length);
	for(let i=0;i<test_arr.items.length;i++) {
		let [test_name, run_test, test_args]=test_arr.items[i]();
		test_runner.start_test(test_name, test_args, run_test);
	}
	await test_runner.wait();
	test_runner.on_done();
}
