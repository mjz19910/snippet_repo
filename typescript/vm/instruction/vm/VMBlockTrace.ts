import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode"
import {DomTaggedPack} from "../../dom_instruction/DomTaggedPack"
import {DomInstructionType} from "../../dom_instruction/DomInstructionType"

export type VMBlockTrace=
	[VMBlockTraceOpcode,'begin',DomInstructionType|null]|
	[VMBlockTraceOpcode,'call',DomInstructionType|null]|
	[VMBlockTraceOpcode,'block',number,number]|
	[VMBlockTraceOpcode,'tagged',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_begin',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_call',DomTaggedPack|null]
