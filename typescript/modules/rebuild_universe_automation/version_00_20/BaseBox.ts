import {NonNull} from "../../../api"
import {BaseBoxValue} from "./BaseBoxValue"

export class BaseBox {
	type: 'object_box'
	from: 'BaseBox'
	value: BaseBoxValue
	as_type(v: string) {
		if(typeof this.value===v) {
			return this
		}
		return null
	}
	constructor(value: NonNull<BaseBoxValue>) {
		this.type='object_box'
		this.from='BaseBox'
		switch(typeof value) {
			case 'string': this.value=value; break
			case 'number': this.value=value; break
			case 'bigint': this.value=value; break
			case 'boolean': this.value=value; break
			case 'symbol': this.value=value; break
			case 'undefined': this.value=value; break
			case 'object': this.value=value; break
			case 'function': this.value=value; break
		}
	}
	as_box(
		to_match:
			'string'|
			'number'|
			'bigint'|
			'boolean'|
			'symbol'|
			'undefined'|
			'object'|
			'function'
	) {
		if(typeof this.value===to_match)
			return this
		return null
	}
}
