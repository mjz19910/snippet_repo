import {Box} from "./Box.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";
import {PromiseBox} from "./PromiseBox.ts";

export class AsyncFunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Promise<Box>> {
	readonly type="function_box";
	readonly return_type="Promise<Box>";
	readonly await_type="Box";
	wrap_call(target_this: Box,...args: Box[]): Box {
		const ret=this.value.apply(target_this,args);
		return new PromiseBox(ret);
	}
}
