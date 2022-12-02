import {DomInstructionType} from "./DomInstructionType.js";
import {DomTaggedPack} from "./DomTaggedPack.js";

export type DomInstructionVMBlockTrace=
	[number,"vm_block_trace",'begin',DomInstructionType|null]|
	[number,"vm_block_trace",'call',DomInstructionType|null]|
	[number,"vm_block_trace",'block',number,number]|
	[number,"vm_block_trace",'tagged',DomTaggedPack|null]|
	[number,"vm_block_trace",'tagged_begin',DomTaggedPack|null]|
	[number,"vm_block_trace",'tagged_call',DomTaggedPack|null];
