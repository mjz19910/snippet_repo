import {NewableInstancePack} from "./NewableInstancePack.js";
import {Box} from "./Box.js";

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
	readonly m_verify_name="NewableFunctionBox";
	verify_name(name: "NewableFunctionBox") {
		return this.m_verify_name==='NewableFunctionBox'&&name==='NewableFunctionBox';
	}
	factory(...args: Box[]) {
		return this.factory_value(this.class_value,args);
	}
}
