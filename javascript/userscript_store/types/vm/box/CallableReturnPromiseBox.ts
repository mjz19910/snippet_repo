import {Box, BoxTemplate} from "./mod";
import {PromiseBox} from "./PromiseBox";

export class PromiseResultBox extends BoxTemplate<(...a: Box[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
