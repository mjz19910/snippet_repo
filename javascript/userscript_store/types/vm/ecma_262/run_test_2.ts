import {TestLock} from "types/tests_mod/TestLock";
import {CanRunTests} from "types/tests_mod/ITestRunner";
import {Dispatcher} from "./Dispatcher";
import {Test} from "./Test";
import {test_2_critical} from "./test_2_critical";
export async function run_test_2(test_runner: CanRunTests, lock: TestLock, dispatcher: Dispatcher) {
	// Test 2 (test_2_code)
	let test_2 = new Test(
		`(class {#name=12;})`,
		"(class {#name=12;})[eof]"
	);
	await lock.lock();
	test_2_critical(test_runner, dispatcher, test_2);
	await lock.unlock();
}
