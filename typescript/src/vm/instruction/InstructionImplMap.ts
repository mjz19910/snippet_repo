import {InstructionImpl} from "./InstructionImpl.js"
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
import {VMPushArgsOpcode} from "./opcodes/VMPushArgsOpcode.js"
import {VMPushIPOpcode} from "./opcodes/VMPushIPOpcode.js"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode.js"
import {VMReturnOpcode} from "./opcodes/VMReturnOpcode.js"

export type InstructionImplMap={
	'append': InstructionImpl<AppendOpcode>
	'breakpoint': InstructionImpl<BreakpointOpcode>
	'call': InstructionImpl<CallOpcode>
	'cast': InstructionImpl<CastOpcode>
	'construct': InstructionImpl<ConstructOpcode>
	'drop': InstructionImpl<DropOpcode>
	'dup': InstructionImpl<DupOpcode>
	'get': InstructionImpl<GetOpcode>
	'halt': InstructionImpl<HaltOpcode>
	'je': InstructionImpl<JeOpcode>
	'jmp': InstructionImpl<JumpOpcode>
	'modify_operand': InstructionImpl<ModifyOperandOpcode>
	'nop': InstructionImpl<NopOpcode>
	'peek': InstructionImpl<PeekOpcode>
	'push_window_object': InstructionImpl<PushWindowObjectOpcode>
	'push': InstructionImpl<PushOpcode>
	'return': InstructionImpl<ReturnOpcode>
	'vm_block_trace': InstructionImpl<VMBlockTraceOpcode>
	'vm_call': InstructionImpl<VMCallOpcode>
	'vm_push_args': InstructionImpl<VMPushArgsOpcode>
	'vm_push_ip': InstructionImpl<VMPushIPOpcode>
	'vm_push_self': InstructionImpl<VMPushSelfOpcode>
	'vm_return': InstructionImpl<VMReturnOpcode>
}
