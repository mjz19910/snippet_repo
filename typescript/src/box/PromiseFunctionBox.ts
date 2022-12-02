import {Box} from "./Box.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class PromiseFunctionBox extends BoxTemplate<"function_box",(...args: Box[]) => Promise<Box>> {
	readonly type="function_box";
}
