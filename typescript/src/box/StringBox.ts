import {AnyTypeOfResult} from "./template/AnyTypeOfResult.js";


export class StringBox {
	type: 'string';
	value: string;
	constructor(value: string) {
		this.type='string';
		this.value=value;
	}
	as_type(input_typeof: AnyTypeOfResult): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
