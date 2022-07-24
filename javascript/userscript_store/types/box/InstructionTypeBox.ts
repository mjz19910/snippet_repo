import {InstructionType} from "../vm/instruction/mod"
import {BoxTemplate} from "./BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class InstructionTypeBox
	extends BoxTemplate<"instance_box",InstructionType>
	implements BoxVerify<InstructionTypeBox,"InstructionTypeBox"> {
	type: "instance_box"="instance_box"
	inner_type: "InstructionType"="InstructionType"
	readonly m_verify_name="InstructionTypeBox"
	verify_name(name: "InstructionTypeBox") {
		return this.m_verify_name==='InstructionTypeBox'&&name==='InstructionTypeBox'
	}
}
