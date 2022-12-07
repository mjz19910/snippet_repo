import {Box} from "../ns.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class PromiseBox extends BoxTemplate<"promise_box",Promise<Box>> {
	readonly type="promise_box";
	readonly inner_type='Promise<Box>';
	readonly await_type="Box";
}
