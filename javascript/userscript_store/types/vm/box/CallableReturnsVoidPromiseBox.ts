import {Boxed as Boxed} from "./Boxed";
import {Box} from "./mod";
import {VoidPromiseBox} from "../VoidPromiseBox";

export class CallableReturnsVoidPromiseBox extends Box<(...a: Boxed[]) => VoidPromiseBox> {
	type: "function_box" = "function_box";
	return_type: "promise" = "promise";
	promise_return_type_special: 'void_type' = 'void_type';
}
