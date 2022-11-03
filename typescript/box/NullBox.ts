import {AnyTypeOfResult} from "./template/AnyTypeOfResult.js";


export class NullBox {
	type: 'null';
	value: null;
	constructor(value: null) {
		this.type='null';
		this.value=value;
	}
	as_type(input_typeof: AnyTypeOfResult): this|null {
		return typeof this.value===input_typeof? this:null;
	}
}
