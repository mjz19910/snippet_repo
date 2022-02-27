import {IBox as IBox} from "./IBox";
import {BoxTemplate} from "./mod";
import {PromiseBox} from "./PromiseBox";

export class PromiseResultBox extends BoxTemplate<(...a: IBox[]) => PromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	await_type: "value" = "value";
}
