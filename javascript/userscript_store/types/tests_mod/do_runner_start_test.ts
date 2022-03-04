import {RootTestRunner} from "./TestRunner";
import {test_lock} from "./const";
import {GenTestCallback} from "./GenTestCallback";
export function do_runner_start_test(run: RootTestRunner, name: string, start_cb: GenTestCallback) {
	run.start_test(test_lock, name, start_cb);
}
