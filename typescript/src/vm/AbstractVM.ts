import {Box} from "../box/Box.js"
import {InstructionType} from "../instruction/InstructionType.js"

export interface AbstractVM<T extends any[]> {
	halt(): void;
	execute_instruction(instruction: InstructionType): void
	run(...args: T): Box
}
