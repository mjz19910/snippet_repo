import {Box} from "../../../box/Box"

export class PromiseBox {
	type: "promise_box"
	inner_type: "Promise"
	template_types: ["Box"]
	value: Promise<Box>
	as_type(type: "object"|"function") {
		if(typeof this.value===type)
			return this
		return null
	}
	/**@arg {Promise<Box>} value */
	constructor(value: Promise<Box>) {
		this.type="promise_box"
		this.inner_type="Promise"
		this.template_types=["Box"]
		this.value=value
	}
}
