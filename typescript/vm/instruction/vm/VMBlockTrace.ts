import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode.js"
import {DomTaggedPack} from "../../dom_instruction/DomTaggedPack.js"
import {DomInstructionType} from "../../dom_instruction/DomInstructionType.js"

export type VMBlockTrace=
	[VMBlockTraceOpcode,'begin',DomInstructionType|null]|
	[VMBlockTraceOpcode,'call',DomInstructionType|null]|
	[VMBlockTraceOpcode,'block',number,number]|
	[VMBlockTraceOpcode,'tagged',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_begin',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_call',DomTaggedPack|null]
