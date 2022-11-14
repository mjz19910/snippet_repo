import {Test} from "../../Test.js";
import {Dispatcher} from "../Dispatcher.js";
import {test_2_critical} from "./test_2_critical.js";

export function run_test_2() {
	let dispatcher=new Dispatcher;
	// Test 2 (test_2_code)
	let test_2=new Test(
		`(class {#name=12;})`,
		"(class {#name=12;})[eof]"
	);
	test_2_critical(dispatcher,test_2);
}
