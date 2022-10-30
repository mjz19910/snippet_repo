import {DomInstructionType} from "./DomInstructionType"
import {DomTaggedPack} from "./DomTaggedPack"
import {VMBlockTraceOpcode} from "../instruction/vm/mod"

export type DomInstructionVMBlockTrace=
	[number,VMBlockTraceOpcode,'begin',DomInstructionType|null]|
	[number,VMBlockTraceOpcode,'call',DomInstructionType|null]|
	[number,VMBlockTraceOpcode,'block',number,number]|
	[number,VMBlockTraceOpcode,'tagged',DomTaggedPack|null]|
	[number,VMBlockTraceOpcode,'tagged_begin',DomTaggedPack|null]|
	[number,VMBlockTraceOpcode,'tagged_call',DomTaggedPack|null]
