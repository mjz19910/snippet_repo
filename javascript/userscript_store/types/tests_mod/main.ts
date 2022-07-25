import {RootTestRunner} from "./TestRunner"
import {do_runner_start_test} from "./do_runner_start_test"
import {GenTestCallback} from "./GenTestCallback"
export async function test_mod_execute_tests(test_arr: [string,GenTestCallback][]): Promise<void> {
	let run=new RootTestRunner
	console.log(` --- Starting tests --- `)
	run.pre_start_set_test_count(test_arr.length)
	for(let i=0;i<test_arr.length;i++) {
		do_runner_start_test(run,...test_arr[i])
	}
	await run.wait()
	run.on_done()
}
