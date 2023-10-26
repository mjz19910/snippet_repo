import {StackVM} from "../vm/StackVM.ts";
import {Box} from "./Box.ts";
import {StringBox} from "./StringBox.ts";
import {BoxTemplate} from "./template/BoxTemplate.ts";
import {VoidBox} from "./VoidBox.ts";

export class FunctionBox extends BoxTemplate<"function_box",(...a: Box[]) => Box> {
	readonly type="function_box";
	readonly return_type="Box";
	static wrap<T extends ()=>void>(v:T): FunctionBox {
		return new FunctionBox(function() {
			const ret=v();
			if(ret === void 0) {
				return new VoidBox;
			}
			throw new Error("bad return");
		});
	}
	static wrap_1<T extends (x: Box)=>void>(v:T): FunctionBox  {
		return new FunctionBox(function(x: Box) {
			const ret=v(x);
			if(ret === void 0) {
				return new VoidBox;
			}
			return ret;
		});
	}
	on_get_toString(vm: StackVM,inner_value: () => string) {
		function bound_executor(this: (...a: Box[]) => Box) {
			return new StringBox(inner_value.call(this));
		}
		const push_value=new FunctionBox(bound_executor.bind(this.value));
		vm.push(push_value);
	}
	on_get(vm: StackVM,key: string) {
		switch(key) {
			case "toString": this.on_get_toString(vm,this.value[key]); break;
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
