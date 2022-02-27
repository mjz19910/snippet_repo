import {IBox as IBox} from "./IBox";
import {Box} from "./mod";
import {PromiseBox} from "./PromiseBox";

export class PromiseResultBox extends Box<(...a: IBox[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
