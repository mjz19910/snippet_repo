import {BoxTemplate, Box} from "./mod";

export class ArrayBox extends BoxTemplate<Box[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
