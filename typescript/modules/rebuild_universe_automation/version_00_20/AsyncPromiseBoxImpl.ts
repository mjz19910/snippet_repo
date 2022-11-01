import {Box} from "../../../box/Box.js"

export class AsyncPromiseBoxImpl {
	type: "function_box"
	await_type: "Box"
	return_type: "promise_box"
	promise_return_type_special: "void_type"
	value: any
	constructor(value: any) {
		this.type='function_box'
		this.await_type='Box'
		this.return_type='promise_box'
		this.promise_return_type_special='void_type'
		this.value=value
	}
	as_type(to_match: "object"|"function") {
		if(typeof this.value===to_match) {
			return this
		}
		return null
	}
	wrap_call(): Box {
		throw new Error("Not yet implemented")
	}
}
