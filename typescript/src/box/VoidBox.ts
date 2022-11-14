import {BoxTemplate} from "./template/BoxTemplate.js";
import {BoxVerify} from "./BoxVerify.js";

export class VoidBox
	extends BoxTemplate<"void",void>
	implements BoxVerify<VoidBox,"VoidBox">
{
	readonly type="void";
	readonly extension=null;
	readonly m_verify_name="VoidBox";
	verify_name(name: "VoidBox") {
		return this.m_verify_name==="VoidBox"&&name==="VoidBox";
	}
}
