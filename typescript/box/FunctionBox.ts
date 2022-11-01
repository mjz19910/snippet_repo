import {Box} from "./Box.js"
import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class FunctionBox
	extends BoxTemplate<"function_box",(...a: Box[]) => Box>
	implements BoxVerify<FunctionBox,"FunctionBox">
{
	readonly type="function_box"
	return_type: null=null
	readonly m_verify_name="FunctionBox"
	verify_name(name: "FunctionBox") {
		return this.m_verify_name==='FunctionBox'&&name==='FunctionBox'
	}
}
