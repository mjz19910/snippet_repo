import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode"
import {DomInstructionType} from "./DomInstructionType"
import {DomTaggedPack} from "./DomTaggedPack"

export type VMBlockTrace=
	[VMBlockTraceOpcode,'begin',DomInstructionType|null]|
	[VMBlockTraceOpcode,'call',DomInstructionType|null]|
	[VMBlockTraceOpcode,'block',number,number]|
	[VMBlockTraceOpcode,'tagged',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_begin',DomTaggedPack|null]|
	[VMBlockTraceOpcode,'tagged_call',DomTaggedPack|null]
