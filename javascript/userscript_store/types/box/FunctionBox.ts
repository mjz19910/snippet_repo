import {Box} from "./Box";
import BoxTemplate from "./BoxTemplate";

export class FunctionBox extends BoxTemplate<"function_box", (...a: Box[]) => Box> {
	type: "function_box" = "function_box";
	return_type: null = null;
}
export default FunctionBox;
