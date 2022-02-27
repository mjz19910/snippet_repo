import {Function} from "../Function";
import {BoxTemplate} from "./mod";

export class FunctionBox extends BoxTemplate<Function> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
