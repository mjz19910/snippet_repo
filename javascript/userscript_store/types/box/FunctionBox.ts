import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class FunctionBox
	extends BoxTemplate<"function_box", (...a: Box[]) => Box>
	implements BoxVerify<FunctionBox, "FunctionBox"> {
	type: "function_box" = "function_box";
	return_type: null = null;
	readonly m_verify_name = "FunctionBox";
	verify_name(name: "FunctionBox") {
		return this.m_verify_name === 'FunctionBox' && name === 'FunctionBox';
	}
}
