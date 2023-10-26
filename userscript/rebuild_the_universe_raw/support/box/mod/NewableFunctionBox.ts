import {StackVM} from "../../StackVM.ts";
import {Box} from "./Box.ts";
import {NewableInstancePack} from "../interface/NewableInstancePack.ts";
import {NewableInstancePackBox} from "./NewableInstancePackBox.ts";

type ConstructorWithBox=new (...a: Box[]) => Record<never,never>;

export class NewableFunctionBox {
	readonly type="constructor_box";
	readonly instance_type="unknown";
	readonly arguments="box[]";
	readonly return="box";
	readonly value_name="[factory_value,class_value]";
	value: {factory_value: NewableInstancePack<Record<never,never>>,class_value: ConstructorWithBox;};
	static unpack(value: {factory_value: NewableInstancePack<Record<never,never>>; class_value: ConstructorWithBox;}) {return new this(value.factory_value,value.class_value);}
	static from_box(value_box: NewableFunctionBox) {return this.unpack(value_box.value);}
	constructor(factory_value: NewableInstancePack<Record<never,never>>,class_value: ConstructorWithBox) {this.value={factory_value,class_value};}
	get_construct_arguments(): [NewableInstancePack<Record<never,never>>,ConstructorWithBox] {return [this.value.factory_value,this.value.class_value];}
	on_get(vm: StackVM,key: string) {
		switch(key) {case "factory_value": vm.push(new NewableInstancePackBox(this.value.factory_value));}
		throw new Error("Method not implemented.");
	}
	factory(...args: Box[]) {return this.value.factory_value.make_box(this.value.class_value,args);}
}
