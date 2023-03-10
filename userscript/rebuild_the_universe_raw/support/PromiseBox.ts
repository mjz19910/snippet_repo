import {BoxTemplate} from "./box/template/BoxTemplate.js";
import {Box} from "./box/z_done/box/Box.js";

export class PromiseBox extends BoxTemplate<"promise_box",Promise<Box>> {
	readonly type="promise_box";
	readonly inner_type="Promise<Box>";
	readonly await_type="Box";
}
