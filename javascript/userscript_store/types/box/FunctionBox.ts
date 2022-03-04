import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";

export class FunctionBox extends BoxTemplate<"function_box", (...a: Box[]) => Box> {
	type: "function_box" = "function_box";
	return_type: null = null;
	readonly m_verify_name="FunctionBox";
	verify_name(name:"FunctionBox") {
		if(this.m_verify_name !== 'FunctionBox' || name !== 'FunctionBox'){
			throw new Error("Bad box");
		}
	}
}
