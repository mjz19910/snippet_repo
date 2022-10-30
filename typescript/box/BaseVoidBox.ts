import {BoxVerify} from "./BoxVerify"
import {BoxTemplate} from "./template/BoxTemplate"

export class BaseVoidBox
	extends BoxTemplate<"void",void>
	implements BoxVerify<BaseVoidBox,"BaseVoidBox">
{
	readonly type="void"
	readonly m_verify_name="BaseVoidBox"
	verify_name(name: "BaseVoidBox") {
		return this.m_verify_name==="BaseVoidBox"&&name==="BaseVoidBox"
	}
	as_type(_x: 'function'|'object'): [boolean,null] {
		return [false,null]
	}
}
