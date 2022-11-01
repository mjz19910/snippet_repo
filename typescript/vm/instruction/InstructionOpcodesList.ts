import {AppendOpcode} from "./opcodes/AppendOpcode.js"
import {BreakpointOpcode} from "./opcodes/BreakpointOpcode.js"
import {CallOpcode} from "./opcodes/CallOpcode.js"
import {CastOpcode} from "./opcodes/CastOpcode.js"
import {ConstructOpcode} from "./opcodes/ConstructOpcode.js"
import {DropOpcode} from "./opcodes/DropOpcode.js"
import {DupOpcode} from "./opcodes/DupOpcode.js"
import {GetOpcode} from "./opcodes/GetOpcode.js"
import {HaltOpcode} from "./opcodes/HaltOpcode.js"
import {JeOpcode} from "./opcodes/JeOpcode.js"
import {JumpOpcode} from "./opcodes/JumpOpcode.js"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode.js"
import {NopOpcode} from "./opcodes/NopOpcode.js"
import {PeekOpcode} from "./opcodes/PeekOpcode.js"
import {PushOpcode} from "./opcodes/PushOpcode.js"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode.js"
import {ReturnOpcode} from "./opcodes/ReturnOpcode.js"
import {VMBlockTraceOpcode} from "./opcodes/VMBlockTraceOpcode.js"
import {VMCallOpcode} from "./opcodes/VMCallOpcode.js"
import {VMPushIPOpcode} from "./opcodes/VMPushIPOpcode.js"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode.js"
import {VMReturnOpcode} from "./opcodes/VMReturnOpcode.js"
import {VMPushArgsOpcode} from "./opcodes/VMPushArgsOpcode.js"

export type InstructionOpcodesList=[
	append: AppendOpcode,
	breakpoint: BreakpointOpcode,
	call: CallOpcode,
	cast: CastOpcode,
	construct: ConstructOpcode,
	drop: DropOpcode,
	dup: DupOpcode,
	get: GetOpcode,
	halt: HaltOpcode,
	je: JeOpcode,
	jump: JumpOpcode,
	modify_op: ModifyOperandOpcode,
	nop: NopOpcode,
	peek: PeekOpcode,
	push_global_object: PushWindowObjectOpcode,
	push: PushOpcode,
	return_x: ReturnOpcode,
	vm_block_trace: VMBlockTraceOpcode,
	vm_call: VMCallOpcode,
	vm_push_args: VMPushArgsOpcode,
	vm_push_ip: VMPushIPOpcode,
	vm_push_self: VMPushSelfOpcode,
	vm_return: VMReturnOpcode
]
