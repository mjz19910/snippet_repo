import Box from "./Box";
import BoxTemplate from "./BoxTemplate";

export default class ArrayBox extends BoxTemplate<Box[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
