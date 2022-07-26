import {InstructionType} from "../InstructionType"
import {DomInstructionType} from "./DomInstructionType"

export type DomTaggedPack=
	['dom',DomInstructionType]|
	['vm',InstructionType]|
	['dom_mem',number]
