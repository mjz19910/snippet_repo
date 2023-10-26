import {InstructionType} from "./InstructionType.ts"
import {DomInstructionType} from "./DomInstructionType.ts"

export type DomTaggedPack=
	['dom',DomInstructionType]|
	['vm',InstructionType]|
	['dom_mem',number]
