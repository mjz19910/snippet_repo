import {BoxInner} from "final/BaseBox";
import NewableFactory from "../../NewableFactory";
import Primitives from "../../Primitives";
import {StackVM} from "../../StackVM";
import {Box} from "../Box";
import BoxTemplate from "../BoxTemplate";
import {async_box_extract_sub_type} from "./async_box_extract_sub_type";
import PromiseBox from "./PromiseBox";
export type UnboxType = Primitives | BoxInner | null;

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