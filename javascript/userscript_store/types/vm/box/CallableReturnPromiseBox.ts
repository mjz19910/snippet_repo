import {Box as Box} from "./Box";
import {Box} from "./mod";
import {PromiseBox} from "./PromiseBox";

export class CallableReturnPromiseBox extends Box<(...a: Box[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
