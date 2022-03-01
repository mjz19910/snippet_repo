import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";
import PromiseBox from "./PromiseBox";

export default class PromiseResultBox extends BoxTemplate<(...a: Box[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
