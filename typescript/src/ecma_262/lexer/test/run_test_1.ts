import {TestLock} from "src/tests_mod/TestLock.js"
// import {CanRunTest} from "types/tests_mod/TestRunner.js"
import {Dispatcher} from "../Dispatcher.js"
import {Test} from "../../Test.js"
import {test_1_critical} from "./test_1_critical.js"
import {CanRunTest} from "src/tests_mod/CanRunTest.js"
export async function run_test_1(test_runner: CanRunTest,lock: TestLock,dispatcher: Dispatcher) {
	let input=`(function(){let the_var=12;})`
	let test_1=new Test(input,`${input}[eof]`)
	let js_r1=eval(test_1.input)
	void js_r1
	await lock.lock()
	test_1_critical(test_runner,dispatcher,test_1)
	await lock.unlock()
}
