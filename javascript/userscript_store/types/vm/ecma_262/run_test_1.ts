import {ITestRunner, TestLock} from "types/tests_mod/tests";
import {Dispatcher} from "./Dispatcher";
import {Test} from "./Test";
import {test_1_critical} from "./test_1_critical";


export async function run_test_1(test_runner: ITestRunner, lock: TestLock, dispatcher: Dispatcher) {
	let input = `(function(){let the_var=12;})`;
	let test_1 = new Test(input, `${input}[eof]`);
	let js_r1 = eval(test_1.input);
	void js_r1;
	await lock.lock();
	test_1_critical(test_runner, dispatcher, test_1);
	await lock.unlock();
}
