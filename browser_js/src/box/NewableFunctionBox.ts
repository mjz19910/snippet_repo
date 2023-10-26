import {StackVM} from "../ns_import_type.ts";
import {Box} from "./Box.ts";
import {NewableInstancePack} from "./NewableInstancePack.ts";
import {NewableInstancePackBox} from "./NewableInstancePackBox.ts";



export class NewableFunctionBox {
	readonly type="constructor_box";
	readonly instance_type="unknown";
	readonly arguments="box[]";
	readonly return="box";
	readonly value_name="[factory_value,class_value]";
	value: {factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {};};
	static unpack(value: {factory_value: any; class_value: any;}) {
		return new this(value.factory_value,value.class_value);
	}
	static from_box(value_box: NewableFunctionBox) {
		return this.unpack(value_box.value);
	}
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {}) {
		this.value={factory_value,class_value};
	}
	get_construct_arguments(): [NewableInstancePack<{}>,new (...a: Box[]) => {}] {
		return [this.value.factory_value,this.value.class_value];
	}
	on_get(vm: StackVM,key: string) {
		switch(key) {
			case 'factory_value': vm.push(new NewableInstancePackBox(this.value.factory_value))
		}
		throw new Error("Method not implemented.");
	}
	factory(...args: Box[]) {
		return this.value.factory_value.make_box(this.value.class_value,args);
	}
}
