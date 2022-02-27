import {Box, IBox} from "./mod";

export class ArrayBox extends Box<IBox[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
