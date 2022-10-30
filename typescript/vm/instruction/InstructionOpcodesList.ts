import {AppendOpcode} from "./opcodes/AppendOpcode"
import {BreakpointOpcode} from "./opcodes/BreakpointOpcode"
import {CallOpcode} from "./opcodes/CallOpcode"
import {CastOpcode} from "./opcodes/CastOpcode"
import {ConstructOpcode} from "./opcodes/ConstructOpcode"
import {DropOpcode} from "./opcodes/DropOpcode"
import {DupOpcode} from "./opcodes/DupOpcode"
import {GetOpcode} from "./opcodes/GetOpcode"
import {HaltOpcode} from "./opcodes/HaltOpcode"
import {JeOpcode} from "./opcodes/JeOpcode"
import {JumpOpcode} from "./opcodes/JumpOpcode"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode"
import {NopOpcode} from "./opcodes/NopOpcode"
import {PeekOpcode} from "./opcodes/PeekOpcode"
import {PushOpcode} from "./opcodes/PushOpcode"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode"
import {ReturnOpcode} from "./opcodes/ReturnOpcode"
import {VMBlockTraceOpcode} from "./opcodes/VMBlockTraceOpcode"
import {VMCallOpcode} from "./opcodes/VMCallOpcode"
import {VMPushIPOpcode} from "./opcodes/VMPushIPOpcode"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode"
import {VMReturnOpcode} from "./opcodes/VMReturnOpcode"
import {VMPushArgsOpcode} from "./vm/VMPushArgs"

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
