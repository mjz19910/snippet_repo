import {BoxTemplate} from "../template/BoxTemplate.js";

export class EmptyArrayBox extends BoxTemplate<"array_box",[]> {
	readonly type="array_box";
	readonly item_type="none";
	readonly special="Unit";
}
