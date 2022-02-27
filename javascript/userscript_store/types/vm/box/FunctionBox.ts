import {Function} from "../Function";
import {Box} from "./mod";

export class FunctionBox extends Box<Function> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
