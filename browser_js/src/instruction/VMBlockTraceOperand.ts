import {DomInstructionType} from "./DomInstructionType.ts";
import {DomTaggedPack} from "./DomTaggedPack.ts";

export type VMBlockTraceOperand=
	["begin",DomInstructionType|null]|
	["call",DomInstructionType|null]|
	["block",number,number]|
	["tagged",DomTaggedPack|null]|
	["tagged_begin",DomTaggedPack|null]|
	["tagged_call",DomTaggedPack|null];
