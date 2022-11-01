import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class RealVoidBox
	extends BoxTemplate<"real_void",void>
	implements BoxVerify<RealVoidBox,"RealVoidBox">
{
	readonly type="real_void"
	readonly m_verify_name="RealVoidBox"
	verify_name(name: "RealVoidBox") {
		return this.m_verify_name==="RealVoidBox"&&name==="RealVoidBox"
	}
}
