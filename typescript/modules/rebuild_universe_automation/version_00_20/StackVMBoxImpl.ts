import {StackVM} from "../../../vm/StackVM.js"

export class StackVMBoxImpl {
	type: "custom_box"
	box_type: "StackVM"
	value: StackVM
	as_type(_a: 'function') {
		return null
	}
	constructor(value: StackVM) {
		this.type='custom_box'
		this.box_type='StackVM'
		this.value=value
	}
}
