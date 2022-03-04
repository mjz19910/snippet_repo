import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";

export class ArrayBox extends BoxTemplate<"array_box", Box[]> {
	type: "array_box" = "array_box";
	item_type: "Box" = "Box";
}
