import {IAppendImpl,IBreakpointImpl,ICallImpl,ICastImpl,IConstructImpl,IDropImpl,IDupImpl,IGetImpl,IHaltImpl,IJeImpl,IJumpImpl,IModifyOPImpl,INopImpl,IPeekImpl,IPushWindowObjectImpl,IPushImpl,IReturnImpl,IVMBlockTraceImpl,IVMCallImpl,IVMPushArgsImpl,IVMPushIPImpl,IVMPushSelfImpl,IVMReturnImpl} from "./mod"


export type InstructionImplMap={
	'append': IAppendImpl
	'breakpoint': IBreakpointImpl
	'call': ICallImpl
	'cast': ICastImpl
	'construct': IConstructImpl
	'drop': IDropImpl
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
