import {InstructionImplObj} from "./InstructionImplObj.ts"
import {InstructionType} from "./InstructionType.ts"
import {debug,general,jump,push,stack,vm} from "./mod.ts"
import {ConstructOpcode} from "./opcodes/ConstructOpcode.ts"
import {GetOpcode} from "./opcodes/GetOpcode.ts"
import {HaltOpcode} from "./opcodes/HaltOpcode.ts"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode.ts"
import {NopOpcode} from "./opcodes/NopOpcode.ts"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode.ts"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode.ts"
import {
	IConstructImpl,IDropImpl,IDupImpl,IGetImpl,IHaltImpl,IJeImpl,IJumpImpl,IModifyOPImpl,INopImpl,InstructionImpl,IPeekImpl,IPushImpl,IPushWindowObjectImpl,IReturnImpl,IVMBlockTraceImpl,IVMCallImpl,IVMPushArgsImpl,IVMPushIPImpl,IVMPushSelfImpl,IVMReturnImpl
} from "./InstructionImpl.ts"
import {InstructionMapGet} from "./InstructionMapGet.ts"
import {AppendOpcode} from "./opcodes/AppendOpcode.ts"
import {BreakpointOpcode} from "./opcodes/BreakpointOpcode.ts"
import {CallOpcode} from "./opcodes/CallOpcode.ts"
import {CastOpcode} from "./opcodes/CastOpcode.ts"

export type InstructionImplMap={
	'append': InstructionImpl<AppendOpcode>
	'breakpoint': InstructionImpl<BreakpointOpcode>
	'call': InstructionImpl<CallOpcode>
	'cast': InstructionImpl<CastOpcode>
	'construct': InstructionImpl<ConstructOpcode>
	'drop': InstructionImpl<DropOpcode>
	'dup': IDupImpl
	'get': IGetImpl
	'halt': IHaltImpl
	'je': IJeImpl
	'jmp': IJumpImpl
	'modify_operand': IModifyOPImpl
	'nop': INopImpl
	'peek': IPeekImpl
	'push_window_object': IPushWindowObjectImpl
	'push': IPushImpl
	'return': IReturnImpl
	'vm_block_trace': IVMBlockTraceImpl
	'vm_call': IVMCallImpl
	'vm_push_args': IVMPushArgsImpl
	'vm_push_ip': IVMPushIPImpl
	'vm_push_self': IVMPushSelfImpl
	'vm_return': IVMReturnImpl
}
