import {Boxed as Boxed} from "./Boxed";
import {Box} from "./mod";
import {PromiseBox} from "../PromiseBox";

export class CallableReturnPromiseBox extends Box<(...a: Boxed[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
