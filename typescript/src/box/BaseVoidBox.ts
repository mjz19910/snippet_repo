import {BoxVerify} from "./BoxVerify.js"
import {BoxTemplate} from "./template/BoxTemplate.js"

export class BaseVoidBox
	extends BoxTemplate<"void",void>
	implements BoxVerify<BaseVoidBox,"BaseVoidBox">
{
	readonly type="void"
	readonly m_verify_name="BaseVoidBox"
	verify_name(name: "BaseVoidBox") {
		return this.m_verify_name==="BaseVoidBox"&&name==="BaseVoidBox"
	}
}
