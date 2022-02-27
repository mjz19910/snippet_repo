import {Box, IBox} from "./mod";
import {VoidPromiseBox} from "./VoidPromiseBox";

export class FunctionReturnsVoidPromiseBox extends Box<(...a: IBox[]) => VoidPromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special: 'void_type' = 'void_type';
}
