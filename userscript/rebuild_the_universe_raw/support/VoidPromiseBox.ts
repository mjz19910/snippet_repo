import {BoxTemplate} from "./BoxTemplate.js";

export class VoidPromiseBox extends BoxTemplate<"promise_box",Promise<void>> {
	readonly type="promise_box";
	readonly inner_type="Promise<void>";
	readonly await_type="void";
}
