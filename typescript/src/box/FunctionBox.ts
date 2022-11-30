import {StackVM} from "../vm/StackVM.js";
import {Box} from "./Box.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class FunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Box> {
	readonly type="function_box";
	readonly return_type="null";
	on_get(vm: StackVM,key: string) {
		switch(key) {
			case "toString":
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
