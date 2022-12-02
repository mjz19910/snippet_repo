import {DomInstructionType} from "../dom_instruction/DomInstructionType.js";
import {DomTaggedPack} from "../dom_instruction/DomTaggedPack.js";

export type VMBlockTraceOperand=
	["begin",DomInstructionType|null]|
	["call",DomInstructionType|null]|
	["block",number,number]|
	["tagged",DomTaggedPack|null]|
	["tagged_begin",DomTaggedPack|null]|
	["tagged_call",DomTaggedPack|null];
