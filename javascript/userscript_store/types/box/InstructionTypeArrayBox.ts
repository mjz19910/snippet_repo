import {InstructionType} from "../vm/instruction/mod";
import {BoxTemplate} from "./BoxTemplate";

export class InstructionTypeArrayBox extends BoxTemplate<"array_box", InstructionType[]> {
	type: "array_box" = "array_box";
	item_type: "instruction_type[]" = "instruction_type[]";
	readonly m_verify_name="InstructionTypeArrayBox";
	verify_name(name:"InstructionTypeArrayBox") {
		if(this.m_verify_name !== 'InstructionTypeArrayBox' || name !== 'InstructionTypeArrayBox'){
			throw new Error("Bad box");
		}
	}
}
