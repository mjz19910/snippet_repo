import {Test} from "ecma_262/Test.js"
import {CanRunTest} from "tests_mod/CanRunTest.js"
import {TestLock} from "tests_mod/TestLock.js"
import {Dispatcher} from "../Dispatcher.js"
import {test_2_critical} from "./test_2_critical.js"
export async function run_test_2(test_runner: CanRunTest,lock: TestLock,dispatcher: Dispatcher) {
	// Test 2 (test_2_code)
	let test_2=new Test(
		`(class {#name=12;})`,
		"(class {#name=12;})[eof]"
	)
	await lock.lock()
	test_2_critical(test_runner,dispatcher,test_2)
	await lock.unlock()
}
