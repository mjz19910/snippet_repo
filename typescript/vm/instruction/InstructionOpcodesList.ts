import {AppendOpcode} from "./opcodes/AppendOpcode"
import {CastOpcode} from "./opcodes/CastOpcode"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode"
import {NopOpcode} from "./opcodes/NopOpcode"
import * as debug from "./debug/mod"
import * as general from "./general/mod"
import * as jump from "./jump/mod"
import * as push from "./push/mod"
import * as stack from "./stack/mod"
import * as turing from "./turing/mod"
import * as vm from "./vm/mod"


export type InstructionOpcodesList=[
	append: AppendOpcode,
	breakpoint: debug.BreakpointOpcode,
	call: general.CallOpcode,
	cast: CastOpcode,
	construct: general.ConstructOpcode,
	drop: stack.DropOpcode,
	dup: stack.DupOpcode,
	get: general.GetOpcode,
	halt: turing.HaltOpcode,
	je: jump.JeOpcode,
	jump: jump.JumpOpcode,
	modify_op: ModifyOperandOpcode,
	nop: NopOpcode,
	peek: stack.PeekOpcode,
	push_global_object: push.PushWindowObjectOpcode,
	push: stack.PushOpcode,
	return_x: general.ReturnOpcode,
	vm_block_trace: vm.VMBlockTraceOpcode,
	vm_call: vm.VMCallOpcode,
	vm_push_args: push.ArgsOpcode,
	vm_push_ip: vm.VMPushIPOpcode,
	vm_push_self: vm.VMPushSelfOpcode,
	vm_return: vm.VMReturnOpcode
]
