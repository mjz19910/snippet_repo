import {InstructionType} from "../vm/instruction/InstructionType.js"
import {BoxTemplate} from "./template/BoxTemplate.js"
import {BoxVerify} from "./BoxVerify.js"

export class InstructionTypeBox
	extends BoxTemplate<"instance_box",InstructionType>
	implements BoxVerify<InstructionTypeBox,"InstructionTypeBox">
{
	readonly type="instance_box"
	readonly instance_type="InstructionType"
	readonly m_verify_name="InstructionTypeBox"
	verify_name(name: "InstructionTypeBox") {
		return this.m_verify_name==='InstructionTypeBox'&&name==='InstructionTypeBox'
	}
}
