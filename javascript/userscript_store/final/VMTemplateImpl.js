export class VMTemplateImpl {
	/** @arg {InstructionType} instruction */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			default: {
				console.log('execute', instruction[0], instruction.slice(1));
			} break;
		}
	}
}
