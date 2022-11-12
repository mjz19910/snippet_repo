import {RootTestRunner} from "./TestRunner.js"
import {test_lock} from "./const.js"
import {GenTestCallback} from "./GenTestCallback.js"
export function do_runner_start_test(run: RootTestRunner,name: string,start_cb: GenTestCallback) {
	run.start_test(test_lock,name,start_cb)
}
