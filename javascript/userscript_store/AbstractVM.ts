import {InstructionType} from "./types/vm/instruction/mod";
import Box from "./types/vm/box/Box";

export abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): Box;
}
