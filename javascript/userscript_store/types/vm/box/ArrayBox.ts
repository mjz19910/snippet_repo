import {Box as Box} from "./Box";
import {Box} from "../box/mod";


export class ArrayBox extends Box<Box[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
