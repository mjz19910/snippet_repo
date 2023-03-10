import {BoxTemplate} from "../template/BoxTemplate.js";

export class GlobalThisBox extends BoxTemplate<"value_box",typeof globalThis> {
	readonly type="value_box";
	readonly inner_value="globalThis";
}
