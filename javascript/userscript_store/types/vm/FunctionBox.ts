import {Function as VMFunction} from "./vm";
import {Box} from "./Box";

export class FunctionBox extends Box<VMFunction> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
