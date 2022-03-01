import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";

export default class FunctionBox extends BoxTemplate<(...a: Box[]) => Box> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
