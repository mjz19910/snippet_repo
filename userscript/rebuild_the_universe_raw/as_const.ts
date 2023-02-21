import {rebuild_the_universe_plugin} from "./rebuild_the_universe.user";
const {
	InstructionAppendImpl,InstructionBreakpointImpl,InstructionCallImpl,InstructionCastImpl,InstructionConstructImpl,InstructionDropImpl,
	InstructionDupImpl,InstructionGetImpl,InstructionHaltImpl,InstructionJeImpl,InstructionJmpImpl,InstructionModifyOpImpl,InstructionNopImpl,
	InstructionPeekImpl,InstructionPushWindowObjectImpl,InstructionPushImpl,InstructionReturnImpl,InstructionBlockTraceImpl,InstructionVMCallImpl,
	InstructionPushArgsImpl,InstructionVMPushIPImpl,InstructionPushVMObjImpl,InstructionVMReturnImpl,
	UnimplementedInstruction,
}=rebuild_the_universe_plugin;
interface I_InstructionAppend {type: "append";}
interface I_InstructionBreakpoint {type: "breakpoint";}
interface I_InstructionCall {type: "call";}
interface I_InstructionCast {type: "cast";}
interface I_InstructionConstruct {type: "construct";}
interface I_InstructionDrop {type: "drop";}
interface I_InstructionDup {type: "dup";}
interface I_InstructionGet {type: "get";}
interface I_InstructionHalt {type: "halt";}
interface I_InstructionJe {type: "je";}
interface I_InstructionJmp {type: "jmp";}
interface I_InstructionModifyOp {type: "modify_operand";}
interface I_InstructionNop {type: "nop";}
interface I_InstructionPeek {type: "peek";}
interface I_InstructionPushWindowObject {type: "push_window_object";}
interface I_InstructionPush {type: "push";}
interface I_InstructionReturn {type: "return";}
interface I_InstructionBlockTrace {type: "vm_block_trace";}
interface I_InstructionVMCall {type: "vm_call";}
interface I_InstructionPushArgs {type: "vm_push_args";}
interface I_InstructionVMPushIP {type: "vm_push_ip";}
interface I_InstructionPushVMObj {type: "vm_push_self";}
interface I_InstructionVMReturn {type: "vm_return";}
class CI_InstructionAppend implements I_InstructionAppend {readonly type="append";}
class CI_InstructionBreakpoint implements I_InstructionBreakpoint {readonly type="breakpoint";}
class CI_InstructionCall implements I_InstructionCall {readonly type="call";}
class CI_InstructionCast implements I_InstructionCast {readonly type="cast";}
class CI_InstructionConstruct implements I_InstructionConstruct {readonly type="construct";}
class CI_InstructionDrop implements I_InstructionDrop {readonly type="drop";}
class CI_InstructionDup implements I_InstructionDup {readonly type="dup";}
class CI_InstructionGet implements I_InstructionGet {readonly type="get";}
class CI_InstructionHalt implements I_InstructionHalt {readonly type="halt";}
class CI_InstructionJe implements I_InstructionJe {readonly type="je";}
class CI_InstructionJmp implements I_InstructionJmp {readonly type="jmp";}
class CI_InstructionModifyOp implements I_InstructionModifyOp {readonly type="modify_operand";}
class CI_InstructionNop implements I_InstructionNop {readonly type="nop";}
class CI_InstructionPeek implements I_InstructionPeek {readonly type="peek";}
class CI_InstructionPushWindowObject implements I_InstructionPushWindowObject {readonly type="push_window_object";}
class CI_InstructionPush implements I_InstructionPush {readonly type="push";}
class CI_InstructionReturn implements I_InstructionReturn {readonly type="return";}
class CI_InstructionBlockTrace implements I_InstructionBlockTrace {readonly type="vm_block_trace";}
class CI_InstructionVMCall implements I_InstructionVMCall {readonly type="vm_call";}
class CI_InstructionPushArgs implements I_InstructionPushArgs {readonly type="vm_push_args";}
class CI_InstructionVMPushIP implements I_InstructionVMPushIP {readonly type="vm_push_ip";}
class CI_InstructionPushVMObj implements I_InstructionPushVMObj {readonly type="vm_push_self";}
class CI_InstructionVMReturn implements I_InstructionVMReturn {readonly type="vm_return";}
export const instruction_descriptor_arr_type=[
	["append",CI_InstructionAppend],
	["breakpoint",CI_InstructionBreakpoint],
	["call",CI_InstructionCall],
	["cast",CI_InstructionCast],
	["construct",CI_InstructionConstruct],
	["drop",CI_InstructionDrop],
	["dup",CI_InstructionDup],
	["get",CI_InstructionGet],
	["halt",CI_InstructionHalt],
	["je",CI_InstructionJe],
	["jmp",CI_InstructionJmp],
	["modify_operand",CI_InstructionModifyOp],
	["nop",CI_InstructionNop],
	["peek",CI_InstructionPeek],
	["push_window_object",CI_InstructionPushWindowObject],
	["push",CI_InstructionPush],
	["return",CI_InstructionReturn],
	["vm_block_trace",CI_InstructionBlockTrace],
	["vm_call",CI_InstructionVMCall],
	["vm_push_args",CI_InstructionPushArgs],
	["vm_push_ip",CI_InstructionVMPushIP],
	["vm_push_self",CI_InstructionPushVMObj],
	["vm_return",CI_InstructionVMReturn],
] as const;
export const instruction_table_type={
	append: new InstructionAppendImpl,
	breakpoint: new InstructionBreakpointImpl,
	call: new InstructionCallImpl,
	cast: new InstructionCastImpl,
	construct: new InstructionConstructImpl,
	dom_create_element_with_props: new UnimplementedInstruction,
	dom_create_element: new UnimplementedInstruction,
	dom_exec: new UnimplementedInstruction,
	dom_get: new UnimplementedInstruction,
	dom_new: new UnimplementedInstruction,
	dom_peek: new UnimplementedInstruction,
	drop: new InstructionDropImpl,
	dup: new InstructionDupImpl,
	get: new InstructionGetImpl,
	halt: new InstructionHaltImpl,
	je: new InstructionJeImpl,
	jmp: new InstructionJmpImpl,
	modify_operand: new InstructionModifyOpImpl,
	nop: new InstructionNopImpl,
	peek: new InstructionPeekImpl,
	push_window_object: new InstructionPushWindowObjectImpl,
	push: new InstructionPushImpl,
	return: new InstructionReturnImpl,
	vm_block_trace: new InstructionBlockTraceImpl,
	vm_call: new InstructionVMCallImpl,
	vm_push_args: new InstructionPushArgsImpl,
	vm_push_ip: new InstructionVMPushIPImpl,
	vm_push_self: new InstructionPushVMObjImpl,
	vm_return: new InstructionVMReturnImpl,
};