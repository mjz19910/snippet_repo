export abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): Box;
}
