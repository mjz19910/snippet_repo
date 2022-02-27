import {Function as VMFunction} from "../vm";
import {IBoxImpl} from "./mod";

export class FunctionBox extends IBoxImpl<VMFunction> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
