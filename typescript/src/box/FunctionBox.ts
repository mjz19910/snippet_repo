import {Box} from "./Box.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class FunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Box> {
	readonly type="function_box";
	readonly return_type="null";
}
