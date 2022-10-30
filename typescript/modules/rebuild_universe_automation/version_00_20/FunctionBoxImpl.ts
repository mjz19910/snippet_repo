import {FunctionBox} from "../../../box/FunctionBox"

export class FunctionBoxImpl {
	type: "function_box"
	return_type: null
	value: FunctionBox['value']
	as_type(to_match: 'function') {
		if(typeof this.value===to_match) {
			return this
		}
		return null
	}
	constructor(value: FunctionBox['value']) {
		this.type='function_box'
		this.return_type=null
		this.value=value
	}
}
