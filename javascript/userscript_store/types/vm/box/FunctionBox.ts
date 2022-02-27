import {Box, BoxTemplate} from "./mod";

export class FunctionBox extends BoxTemplate<(...a: Box[]) => Box> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
