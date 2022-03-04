import {NewableInstancePack} from "./NewableInstancePack";
import {Box} from "./Box";
import {BoxTemplate} from "./BoxTemplate";
import {ObjectBox} from "./ObjectBox";
import {BoxVerify} from "./BoxVerify";
export class NewableFunctionBox
	extends BoxTemplate<"constructor_box", NewableInstancePack<{}>>
	implements BoxVerify<NewableFunctionBox, "NewableFunctionBox"> {
	readonly type = "constructor_box";
	class_value: {new(...a: Box[]): {}};
	readonly instance_type = null;
	readonly arguments = "box[]";
	readonly return = "box";
	constructor(class_value: new (...a: Box[]) => {}, factory_value: NewableInstancePack<{}>) {
		super(factory_value);
		this.class_value = class_value;
	}
	readonly m_verify_name = "NewableFunctionBox";
	verify_name(name: "NewableFunctionBox") {
		return this.m_verify_name === 'NewableFunctionBox' && name === 'NewableFunctionBox';
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
