import {VMTemplateImpl} from "./VMTemplateImpl";

export class VMTemplate extends VMTemplateImpl {
	/** @param {import("../../../typescript/vm/instruction/InstructionType").InstructionType} instruction */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			default: super.execute_instruction(instruction); break;
		}
	}
}
