import {Box} from "../ns.js";
import {NewableInstancePack} from "./NewableInstancePack.js";
import {NewableInstancePackBox} from "./NewableInstancePackBox.js";

export class NewableFunctionBox {
	readonly type="constructor_box";
	readonly instance_type="unknown";
	readonly arguments="box[]";
	readonly return="box";
	readonly value_name="[factory_value,class_value]";
	value: {factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {};};
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {}) {
		this.value={factory_value,class_value};
	}
	get_construct_arguments(): {factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {};} {
		return this.value;
	}
	static from_box(value_box: NewableFunctionBox) {
		return new this(value_box.value.factory_value,value_box.value.class_value);
	}
	on_get(vm: StackVMImpl,key: string) {
		switch(key) {
			case 'factory_value': vm.push(new NewableInstancePackBox(this.value.factory_value))
		}
		throw new Error("Method not implemented.");
	}
	factory(...args: Box[]) {
		return this.value.factory_value.make_box(this.value.class_value,args);
	}
}
