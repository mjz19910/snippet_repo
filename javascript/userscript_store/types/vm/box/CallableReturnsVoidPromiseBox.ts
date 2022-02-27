import {Box as Box} from "./Boxed";
import {IBoxImpl} from "./mod";
import {VoidPromiseBox} from "../VoidPromiseBox";

export class CallableReturnsVoidPromiseBox extends IBoxImpl<(...a: Box[]) => VoidPromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special: 'void_type' = 'void_type';
}
