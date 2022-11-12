import {Box} from "../box/Box.js"
import {InstructionType} from "./instruction/InstructionType.js"

export abstract class AbstractVM {
	abstract execute_instruction(instruction: InstructionType): void
	abstract run(): Box
}
