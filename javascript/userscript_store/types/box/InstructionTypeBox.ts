import {InstructionType} from "../vm/instruction/mod"
import {BoxTemplate} from "./template/BoxTemplate"
import {BoxVerify} from "./BoxVerify"
export class InstructionTypeBox
	extends BoxTemplate<"instance_box",InstructionType>
	implements BoxVerify<InstructionTypeBox,"InstructionTypeBox"> {
	readonly type="instance_box"
	readonly inner_type="InstructionType"
	readonly m_verify_name="InstructionTypeBox"
	verify_name(name: "InstructionTypeBox") {
		return this.m_verify_name==='InstructionTypeBox'&&name==='InstructionTypeBox'
	}
}
