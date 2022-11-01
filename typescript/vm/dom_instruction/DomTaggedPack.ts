import {InstructionType} from "../instruction/InstructionType.js"
import {DomInstructionType} from "./DomInstructionType.js"

export type DomTaggedPack=
	['dom',DomInstructionType]|
	['vm',InstructionType]|
	['dom_mem',number]
