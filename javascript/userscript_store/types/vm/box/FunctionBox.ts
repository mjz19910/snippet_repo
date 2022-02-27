import {Function as VMFunction} from "../vm";
import {Box} from "./mod";

export class FunctionBox extends Box<VMFunction> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
