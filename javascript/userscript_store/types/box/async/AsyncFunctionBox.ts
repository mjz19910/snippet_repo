import {Box} from "../Box";
import {BoxTemplate} from "../BoxTemplate";
import {PromiseBox} from "../promise/PromiseBox";
export class AsyncFunctionBox extends BoxTemplate<"function_box", (...a: Box[]) => Promise<Box>> {
	type: "function_box" = "function_box";
	return_type: "promise_box" = "promise_box";
	await_type: "Box" = "Box";
	wrap_call(target_this: Box, ...args: Box[]): Box {
		let ret = this.value.apply(target_this, args);
		return new PromiseBox(ret);
	}
}
export default AsyncFunctionBox;
