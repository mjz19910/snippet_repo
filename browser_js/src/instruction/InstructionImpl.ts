import {InstructionImplMap} from "./InstructionImplMap.js";
import {InstructionImplObj} from "./InstructionImplObj.js";
import {InstructionMap} from "./InstructionMap.js";

export interface InstructionImpl<T extends keyof InstructionImplMap> {
	new(): InstructionImplObj<T,InstructionImplMap[T],InstructionMap[T]>;
	instruction_type(): InstructionMap[T]
}

export interface IAppendImpl extends InstructionImpl<"append"> {}
export interface IBreakpointImpl extends InstructionImpl<"breakpoint"> {}
export interface ICallImpl extends InstructionImpl<"call"> {}
export interface ICastImpl extends InstructionImpl<"cast"> {}
export interface IConstructImpl extends InstructionImpl<"construct"> {}
export interface IDropImpl extends InstructionImpl<"drop"> {}
export interface IDupImpl extends InstructionImpl<"dup"> {}
export interface IGetImpl extends InstructionImpl<"get"> {}
export interface IHaltImpl extends InstructionImpl<"halt"> {}
export interface IJeImpl extends InstructionImpl<"je"> {}
export interface IJumpImpl extends InstructionImpl<"jmp"> {}
export interface IModifyOPImpl extends InstructionImpl<"modify_operand"> {}
export interface INopImpl extends InstructionImpl<"nop"> {}
export interface IPeekImpl extends InstructionImpl<"peek"> {}
export interface IPushWindowObjectImpl extends InstructionImpl<"push_window_object"> {}
export interface IPushImpl extends InstructionImpl<"push"> {}
export interface IReturnImpl extends InstructionImpl<"return"> {}
export interface IVMBlockTraceImpl extends InstructionImpl<"vm_block_trace"> {}
export interface IVMCallImpl extends InstructionImpl<"vm_call"> {}
export interface IVMPushArgsImpl extends InstructionImpl<"vm_push_args"> {}
export interface IVMPushIPImpl extends InstructionImpl<"vm_push_ip"> {}
export interface IVMPushSelfImpl extends InstructionImpl<"vm_push_self"> {}
export interface IVMReturnImpl extends InstructionImpl<"vm_return"> {}
