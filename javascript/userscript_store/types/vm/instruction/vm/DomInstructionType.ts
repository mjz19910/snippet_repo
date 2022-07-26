import {DomInstructionAppend, DomInstructionBlockTrace, DomInstructionBP, DomInstructionCall, DomInstructionCast, DomInstructionCons, DomInstructionDrop, DomInstructionDup, DomInstructionFilter, DomInstructionGet, DomInstructionHalt, DomInstructionJe, DomInstructionJmp, DomInstructionModOp, DomInstructionNop, DomInstructionNullMarker, DomInstructionPeek, DomInstructionPush, DomInstructionPushGlobalObject, DomInstructionReturn, DomInstructionVMCall, DomInstructionVMCallAt, DomInstructionVMPushArgs, DomInstructionVMPushIP, DomInstructionVMPushSelf, DomInstructionVMReturn} from "./dom_instruction"

export type DomInstructionType=DomInstructionAppend|
	DomInstructionBP|
	DomInstructionBlockTrace|
	DomInstructionVMCallAt|
	DomInstructionNullMarker|
	DomInstructionFilter|
	DomInstructionCall|
	DomInstructionCast|
	DomInstructionCons|
	DomInstructionJe|
	DomInstructionJmp|
	DomInstructionModOp|
	DomInstructionPeek|
	DomInstructionPush|
	DomInstructionVMCall|
	DomInstructionDup|
	DomInstructionDrop|
	DomInstructionPushGlobalObject|
	DomInstructionNop|
	DomInstructionGet|
	DomInstructionHalt|
	DomInstructionReturn|
	DomInstructionVMPushArgs|
	DomInstructionVMPushIP|
	DomInstructionVMPushSelf|
	DomInstructionVMReturn
