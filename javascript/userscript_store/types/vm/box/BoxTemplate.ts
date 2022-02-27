import {TypeOfResult} from "../TypeOfResult";


export class BoxTemplate<T> {
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
