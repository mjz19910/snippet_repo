import {Box} from "./Box";

export class EmptyArrayBox extends Box<[]> {
	type: "array_box" = "array_box";
}
