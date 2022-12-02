import {StackVM} from "./StackVM.js";
import {Box} from "./Box.js";
import {StringBox} from "./StringBox.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class FunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Box> {
	readonly type="function_box";
	readonly return_type="Box";
	on_get(vm: StackVM,key: string) {
		switch(key) {
			case "toString": {
				let inner_value=this.value[key];
				function bound_executor(this: (...a: Box[]) => Box) {
					return new StringBox(inner_value.call(this));
				}
				let push_value=new FunctionBox(bound_executor.bind(this.value));
				vm.push(push_value);
			} break;
			case "apply":
			case "call":
			case "bind":
			case "arguments":
			case "caller":
			case "constructor":
			case "length":
			case "name":
		}
	}
}
