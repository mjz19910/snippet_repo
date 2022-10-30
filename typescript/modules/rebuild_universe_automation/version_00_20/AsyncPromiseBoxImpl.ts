import {Box} from "../../../box/Box"

export class AsyncPromiseBoxImpl {
	/**@type {"function_box"} */
	type: "function_box" = "function_box";
	/**@type {"Box"} */
	await_type: "Box" = "Box";
	/**@type {"promise_box"} */
	return_type: "promise_box" = "promise_box";
	/**@type {"void_type"} */
	promise_return_type_special: "void_type" = "void_type";
	value: any
	constructor(value:any) {
		this.value = value;
	}
	as_type(to_match:"object"|"function") {
		if(typeof this.value === to_match) {
			return this;
		}
		return null;
	}
	wrap_call():Box {
		throw new Error("Not yet implemented");
	}
}
