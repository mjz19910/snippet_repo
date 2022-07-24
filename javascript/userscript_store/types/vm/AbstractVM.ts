import Box from "../box/z_/Box";
import {InstructionType} from "./instruction/mod";

export abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void;
	abstract run(): Box;
}
