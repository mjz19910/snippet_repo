import {Box} from "./Box.ts";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class ArrayBox extends BoxTemplate<"array_box",Box[]> {
	readonly type="array_box";
	readonly item_type="Box";
}
