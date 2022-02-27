import {Boxed as Boxed} from "./Boxed";
import {Box} from "./Box";


export class ArrayBox extends Box<Boxed[]> {
	type: "array_box" = "array_box";
	item_type: "value" = "value";
}
