import {Box} from "../box/Box.js"
import {InstructionType} from "./instruction/InstructionType.js"

export interface AbstractVM {
	execute_instruction(instruction: InstructionType): void
	run(): Box
}
