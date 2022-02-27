import {Box as Box} from "./Box";
import {IBoxImpl} from "./mod";
import {PromiseBox} from "./PromiseBox";

export class CallableReturnPromiseBox extends IBoxImpl<(...a: Box[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
