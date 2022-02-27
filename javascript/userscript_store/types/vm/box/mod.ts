import {Primitives} from "../Primitives";
import {TypeOfResult} from "../TypeOfResult";
import ValueBoxes from "../ValueBoxes";

export type TBox = ValueBoxes | Primitives | null;

export class Box<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
	get_matching_typeof(to_match: TypeOfResult) {
		if(typeof this.value === to_match)
			return this;
		return null;
	}
}
