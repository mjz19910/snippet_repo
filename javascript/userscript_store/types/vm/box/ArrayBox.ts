import {Box as Box} from "./Box";
import {IBoxImpl} from "../box/mod";


export class ArrayBox extends IBoxImpl<Box[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
