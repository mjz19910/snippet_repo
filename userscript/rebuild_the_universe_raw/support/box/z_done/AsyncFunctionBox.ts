import {Box} from "./box/Box.js";
import {BoxTemplate} from "./template/BoxTemplate.js";
import {PromiseBox} from "../PromiseBox.js";

export class AsyncFunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Promise<Box>> {
	readonly type="function_box";
	readonly return_type="Promise<Box>";
	readonly await_type="Box";
	wrap_call(target_this: Box,...args: Box[]): Box {
		let ret=this.value.apply(target_this,args);
		return new PromiseBox(ret);
	}
}
