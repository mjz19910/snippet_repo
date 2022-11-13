import {AnyTypeOfResult} from "./template/AnyTypeOfResult.js";

export class NumberBox {
	type: 'number';
	value: number;
	constructor(value: number) {
		this.type='number';
		this.value=value;
	}
	as_type(input_typeof: AnyTypeOfResult): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
