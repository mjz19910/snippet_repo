import {InstructionType} from "../vm/instruction/mod";
import {BoxTemplate} from "./BoxTemplate";
import {BoxVerify} from "./BoxVerify";
export class InstructionTypeArrayBox
	extends BoxTemplate<"array_box", InstructionType[]>
	implements BoxVerify<InstructionTypeArrayBox, "InstructionTypeArrayBox"> {
	type: "array_box" = "array_box";
	item_type: "instruction_type[]" = "instruction_type[]";
	readonly m_verify_name = "InstructionTypeArrayBox";
	verify_name(name: "InstructionTypeArrayBox") {
		return this.m_verify_name === 'InstructionTypeArrayBox' && name === 'InstructionTypeArrayBox';
	}
}
