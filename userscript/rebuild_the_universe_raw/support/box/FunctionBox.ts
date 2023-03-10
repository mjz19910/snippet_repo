import {StackVM} from "../StackVM.js";
import {Box} from "./Box.js";
import {StringBox} from "./StringBox.js";
import {BoxTemplate} from "./template/BoxTemplate.js";
import {VoidBox} from "./VoidBox.js";

export class FunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Box> {
	readonly type="function_box";
	readonly return_type="Box";
	static wrap<T extends ()=>void>(v:T): FunctionBox {
		return new FunctionBox(function() {
			let ret=v();
			if(ret === void 0) {return new VoidBox;}
			throw new Error("bad return");
		});
	}
	static wrap_1<T extends (x: Box)=>void>(v:T): FunctionBox  {
		return new FunctionBox(function(x: Box) {
			let ret=v(x);
			if(ret === void 0) {return new VoidBox;}
			return ret;
		});
	}
	on_get(vm: StackVM,key: string) {
		switch(key) {
			case "toString": {
				let inner_value=this.value[key];
				function bound_executor(this: (...a: Box[]) => Box) {return new StringBox(inner_value.call(this));}
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
