import {VMTemplateImpl} from "./VMTemplateImpl";

export class VMTemplate extends VMTemplateImpl {
	/**
	 * @param {InstructionType} instruction
	 */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			default /*Base class*/: super.execute_instruction(instruction); break;
		}
	}
}
