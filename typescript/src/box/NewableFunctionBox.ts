import {StackVM} from "../vm/StackVM.js";
import {Box} from "./Box.js";
import {NewableInstancePack} from "./NewableInstancePack.js";

export class NewableFunctionBox {
	readonly type="constructor_box";
	readonly instance_type="unknown";
	readonly arguments="box[]";
	readonly return="box";
	factory_value: NewableInstancePack<{}>;
	class_value: new (...a: Box[]) => {};
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {}) {
		this.factory_value=factory_value;
		this.class_value=class_value;
	}
	get_construct_arguments(): [NewableInstancePack<{}>,new (...a: Box[]) => {}] {
		return [this.factory_value,this.class_value];
	}
	static from_box(value_box: NewableFunctionBox) {
		return new this(value_box.factory_value,value_box.class_value);
	}
	on_get(vm: StackVM,key: string) {
		vm;key;
		throw new Error("Method not implemented.");
	}
	factory(...args: Box[]) {
		return this.factory_value.make_box(this.class_value,args);
	}
}
