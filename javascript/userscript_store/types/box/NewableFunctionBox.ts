import {NewableInstancePack} from "./NewableInstancePack";
import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {ObjectBox} from "./ObjectBox";

export class NewableFunctionBox extends BoxTemplate<"constructor_box", NewableInstancePack<{}>> {
	readonly type: "constructor_box" = "constructor_box";
	class_value: {new(...a: Box[]): {}};
	readonly instance_type = null;
	readonly arguments: "box[]" = "box[]";
	readonly return: "box" = "box";
	constructor(class_value: new (...a: Box[]) => {}, factory_value: NewableInstancePack<{}>) {
		super(factory_value);
		this.class_value = class_value;
	}
	readonly m_verify_name="NewableFunctionBox";
	verify_name(name:"NewableFunctionBox") {
		if(this.m_verify_name !== 'NewableFunctionBox' || name !== 'NewableFunctionBox'){
			throw new Error("Bad box");
		}
	}
	as_type(x: 'function' | 'object') {
		if(typeof this.value === x) {
			return this;
		}
		return null;
	}
	factory(...args: Box[]) {
		let res = new this.class_value(...args);
		return new ObjectBox(res);
	}
}
