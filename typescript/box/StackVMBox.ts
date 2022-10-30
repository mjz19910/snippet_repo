import {StackVM} from "../vm/StackVM"
import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"

export class StackVMBox
	extends BoxTemplate<"custom_box",StackVM>
	implements BoxVerify<StackVMBox,"StackVMBox">
{
	readonly type="custom_box"
	readonly box_type="StackVM"
	readonly m_verify_name="StackVMBox"
	verify_name(name: "StackVMBox") {
		return this.m_verify_name==='StackVMBox'&&name==='StackVMBox'
	}
}
