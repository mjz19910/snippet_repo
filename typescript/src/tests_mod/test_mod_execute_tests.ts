import {RootTestRunner} from "./TestRunner.js";
import {GenTestCallbackTemplate} from "./GenTestCallbackTemplate.js";

export async function test_mod_execute_tests(test_arr: (<C, U extends C[]>()=>[string, GenTestCallbackTemplate<U>, ...U])[]): Promise<void> {
	let test_runner=new RootTestRunner;
	console.log(` --- Starting tests --- `);
	test_runner.pre_start_set_test_count(test_arr.length);
	for(let i=0;i<test_arr.length;i++) {
		let [test_name, run_test, ...test_args]=test_arr[i]();
		test_runner.start_test(test_name, test_args, run_test);
	}
	await test_runner.wait();
	test_runner.on_done();
}
