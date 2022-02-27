import {InstructionType} from "./vm/instruction/mod";
import Box from "./vm/box/Box";

export abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): Box;
}
