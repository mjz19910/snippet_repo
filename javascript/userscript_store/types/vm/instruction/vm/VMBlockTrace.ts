import Box from "types/box/Box";
import {InstructionType} from "../mod";
import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode";
import {CastOperand1} from "../operands/CastOperand1";

export type test_type_1 = ['vm_block_trace', 'begin', null];
type DomInstructionAppend = [number, "append"];
type DomInstructionBP = [number, "breakpoint"];
type DomInstructionCall = [number, "call", number];
type DomInstructionCast = [number, "cast", CastOperand1];
type DomInstructionCons = [number, "construct", number];
type DomInstruction1Arg = [number, "drop" | "push_global_object" | "nop" | "append" | "breakpoint" | "dup" | "get" | "halt" | "return"];
type DomInstructionJe = [number, "je", number]
type DomInstructionJmp = [number, "jmp", number]
type DomInstructionModOp = [number, "modify_operand", number, number]
type DomInstructionPeek = [number, "peek", number]
type DomInstructionPush = [number, "push", ...Box[]];
type DomInstructionVMCall = [number, "vm_call", number] | [number, "vm_push_args"] | [number, "vm_push_ip"] | [number, "vm_push_self"] | [number, "vm_return"];
type DomInstructionBlockTrace =
	[number, VMBlockTraceOpcode, 'begin', DomInstructionTypePack | null] |
	[number, VMBlockTraceOpcode, 'call', DomInstructionTypePack | null] |
	[number, 'vm_block_trace', 'block', number, number] |
	[number, 'vm_block_trace', 'tagged', DomInstructionTaggedTypePack | null] |
	[number, 'vm_block_trace', 'tagged_begin', DomInstructionTaggedTypePack | null] |
	[number, 'vm_block_trace', 'tagged_call', DomInstructionTaggedTypePack | null];
type DomInstructionVMCallAt = [number, "vm_call_at", DomInstructionTaggedTypePack];
type DomInstructionNullMarker = [number, "marker", null];
export type DomInstructionFilter6 = [number, 'dom_filter', any, any, any, any];
export type DomInstructionFilter7 = [number, 'dom_filter', any, any, any, any, any];
export type DomInstructionFilter = DomInstructionFilter6 | DomInstructionFilter7;

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
	DomInstruction1Arg;

export type DomInstructionTypePack = [DomInstructionType];

export type DomInstructionTaggedTypePack =
['dom', DomInstructionType]|
['vm', InstructionType] |
['dom_mem', number];

// vm_block_trace
export type BlockTrace =
	[VMBlockTraceOpcode, 'begin', DomInstructionTypePack | null] |
	[VMBlockTraceOpcode, 'call', DomInstructionTypePack | null] |
	[VMBlockTraceOpcode, 'block', number, number] |
	[VMBlockTraceOpcode, 'tagged', DomInstructionTaggedTypePack | null] |
	[VMBlockTraceOpcode, 'tagged_begin', DomInstructionTaggedTypePack | null] |
	[VMBlockTraceOpcode, 'tagged_call', DomInstructionTaggedTypePack | null];
