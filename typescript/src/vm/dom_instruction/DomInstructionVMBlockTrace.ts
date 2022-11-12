import {VMBlockTraceOpcode} from "../instruction/opcodes/VMBlockTraceOpcode.js";
import {DomInstructionType} from "./DomInstructionType.js";
import {DomTaggedPack} from "./DomTaggedPack.js";

export type DomInstructionVMBlockTrace=
	[number,VMBlockTraceOpcode,'begin',DomInstructionType|null]|
	[number,VMBlockTraceOpcode,'call',DomInstructionType|null]|
	[number,VMBlockTraceOpcode,'block',number,number]|
	[number,VMBlockTraceOpcode,'tagged',DomTaggedPack|null]|
	[number,VMBlockTraceOpcode,'tagged_begin',DomTaggedPack|null]|
	[number,VMBlockTraceOpcode,'tagged_call',DomTaggedPack|null];
