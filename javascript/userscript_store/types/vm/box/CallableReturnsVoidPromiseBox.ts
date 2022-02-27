import {VoidPromiseBox} from "../VoidPromiseBox";
import {Box} from "./mod";

export class FunctionReturnsVoidPromiseBox extends Box<(...a: Box[]) => VoidPromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special: 'void_type' = 'void_type';
}
