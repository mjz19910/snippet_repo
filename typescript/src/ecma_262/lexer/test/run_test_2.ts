import {Test} from "../../Test.js";
import {Dispatcher} from "../Dispatcher.js";
import {test_2_critical} from "./test_2_critical.js";

export function run_test_2() {
	let input=`(class {#name=12;})`;
	let dispatcher=new Dispatcher(input);
	// Test 2 (test_2_code)
	let test_2=new Test(input,"(class {#name=12;})[eof]");
	test_2_critical(dispatcher,test_2);
}
