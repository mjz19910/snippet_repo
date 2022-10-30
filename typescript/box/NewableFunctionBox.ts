import {NewableInstancePack} from "./NewableInstancePack"
import {Box} from "./Box"
import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"

export class NewableFunctionBox
	extends BoxTemplate<"constructor_box",NewableInstancePack<{}>>
	implements BoxVerify<NewableFunctionBox,"NewableFunctionBox">
{
	readonly type="constructor_box"
	class_value: new(...a: Box[])=>{}
	readonly instance_type=null
	readonly arguments="box[]"
	readonly return="box"
	constructor(factory_value: NewableInstancePack<{}>,class_value: new (...a: Box[]) => {}) {
		super(factory_value)
		this.class_value=class_value
	}
	readonly m_verify_name="NewableFunctionBox"
	verify_name(name: "NewableFunctionBox") {
		return this.m_verify_name==='NewableFunctionBox'&&name==='NewableFunctionBox'
	}
	factory(...args: Box[]) {
		return this.value(this.class_value, args)
	}
}
