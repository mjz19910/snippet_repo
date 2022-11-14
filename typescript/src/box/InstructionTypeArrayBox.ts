import {InstructionType} from "vm/instruction/InstructionType.js";
import {BoxVerify} from "./BoxVerify.js";
import {BoxTemplate} from "./template/BoxTemplate.js";

export class InstructionTypeArrayBox
	extends BoxTemplate<"array_box",InstructionType[]>
	implements BoxVerify<InstructionTypeArrayBox,"InstructionTypeArrayBox">
{
	readonly type="array_box";
	readonly item_type="instruction_type[]";
	readonly m_verify_name="InstructionTypeArrayBox";
	verify_name(name: "InstructionTypeArrayBox") {
		return this.m_verify_name==='InstructionTypeArrayBox'&&name==='InstructionTypeArrayBox';
	}
}
