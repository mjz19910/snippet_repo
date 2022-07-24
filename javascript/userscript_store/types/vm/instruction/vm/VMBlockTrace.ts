import { Box } from "types/box/Box"
import { InstructionType } from "../mod"
import { VMBlockTraceOpcode } from "../opcodes/VMBlockTraceOpcode"
import { CastOperand1 } from "../operands/CastOperand1"

export type test_type_1 = ['vm_block_trace', 'begin', null]
export type DomInstructionAppend = [number, "append"]
export type DomInstructionBP = [number, "breakpoint"]
export type DomInstructionCall = [number, "call", number]
export type DomInstructionCast = [number, "cast", CastOperand1]
export type DomInstructionCons = [number, "construct", number]
export type DomInstructionDrop = [number, "drop"]
export type DomInstructionDup = [number, "dup"]
export type DomInstructionPushGlobalObject = [number, "push_global_object"]
export type DomInstructionNop = [number, "nop"]
export type DomInstructionGet = [number, "get"]
export type DomInstructionHalt = [number, "halt"]
export type DomInstructionReturn = [number, "return"]
export type DomInstructionJe = [number, "je", number]
export type DomInstructionJmp = [number, "jmp", number]
export type DomInstructionModOp = [number, "modify_operand", number, number]
export type DomInstructionPeek = [number, "peek", number]
export type DomInstructionPush = [number, "push", ...Box[]]
export type DomInstructionVMCall = [number, "vm_call", number]
export type DomInstructionVMPushArgs = [number, "vm_push_args"]
export type DomInstructionVMPushIP = [number, "vm_push_ip"]
export type DomInstructionVMPushSelf = [number, "vm_push_self"]
export type DomInstructionVMReturn = [number, "vm_return"]
export type DomInstructionBlockTrace =
	[number, VMBlockTraceOpcode, 'begin', DomInstructionType | null] |
	[number, VMBlockTraceOpcode, 'call', DomInstructionType | null] |
	[number, VMBlockTraceOpcode, 'block', number, number] |
	[number, VMBlockTraceOpcode, 'tagged', DomTaggedPack | null] |
	[number, VMBlockTraceOpcode, 'tagged_begin', DomTaggedPack | null] |
	[number, VMBlockTraceOpcode, 'tagged_call', DomTaggedPack | null]
export type DomInstructionVMCallAt = [number, "vm_call_at", DomTaggedPack]
export type DomInstructionNullMarker = [number, "marker", null]
export type DomInstructionFilter6 = [number, 'dom_filter_6', any, any, any, any]
export type DomInstructionFilter7 = [number, 'dom_filter_7', any, any, any, any, any]
export type DomInstructionFilter = DomInstructionFilter6 | DomInstructionFilter7

export type DomInstructionType = DomInstructionAppend |
	DomInstructionBP |
	DomInstructionBlockTrace |
	DomInstructionVMCallAt |
	DomInstructionNullMarker |
	DomInstructionFilter |
	DomInstructionCall |
	DomInstructionCast |
	DomInstructionCons |
	DomInstructionJe |
	DomInstructionJmp |
	DomInstructionModOp |
	DomInstructionPeek |
	DomInstructionPush |
	DomInstructionVMCall |
	DomInstructionDup |
	DomInstructionDrop |
	DomInstructionPushGlobalObject |
	DomInstructionNop |
	DomInstructionGet |
	DomInstructionHalt |
	DomInstructionReturn |
	DomInstructionVMPushArgs |
	DomInstructionVMPushIP |
	DomInstructionVMPushSelf|
	DomInstructionVMReturn

export type DomTaggedPack =
	['dom', DomInstructionType] |
	['vm', InstructionType] |
	['dom_mem', number]

// vm_block_trace
export type BlockTrace =
	[VMBlockTraceOpcode, 'begin', DomInstructionType | null] |
	[VMBlockTraceOpcode, 'call', DomInstructionType | null] |
	[VMBlockTraceOpcode, 'block', number, number] |
	[VMBlockTraceOpcode, 'tagged', DomTaggedPack | null] |
	[VMBlockTraceOpcode, 'tagged_begin', DomTaggedPack | null] |
	[VMBlockTraceOpcode, 'tagged_call', DomTaggedPack | null]
