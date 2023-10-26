import {BoxTemplate} from "../template/BoxTemplate.ts";
import {Box} from "./Box.ts";

export class PromiseBox extends BoxTemplate<"promise_box",Promise<Box>> {
	readonly type="promise_box";
	readonly inner_type="Promise<Box>";
	readonly await_type="Box";
}
