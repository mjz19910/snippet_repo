import {InstructionAppend as Append} from "./InstructionAppend";
import {InstructionCast as Cast} from "./InstructionCast";
import {InstructionModifyOperand as ModifyOperand} from "./InstructionModifyOperand";
import * as debug from "./debug/mod";
import * as gen from "./general/mod";
import * as jump from "./jump/mod";
import * as push from "./push/mod";
import * as st from "./stack/mod";
import * as turing from "./turing/mod";
import * as vm from "./vm/mod";
import {StackVM} from "../StackVM";
export {
	gen as GeneralNS,
	Append,
	Cast,
	debug as DebugNS,
	ModifyOperand,
	jump as JumpNS,
	push as PushNS,
	st as StackNS,
	turing as TuringNS,
	vm as VM_NS,
};


export type InstructionType =
	// Stack
	st.Push |
	st.Dup |
	st.Drop |
	st.Peek |
	// FFI
	gen.Get |
	gen.Call |
	gen.Construct |
	gen.Return |
	// Jump
	jump.Jump |
	jump.Je |
	turing.Halt |
	// Push values
	push.PushArgs |
	push.PushVMObj |
	push.PushGlobalObj |
	// Debug
	debug.Breakpoint |
	// VM
	vm.Return |
	vm.Call |
	vm.PushInstructionPtr |
	ModifyOperand |
	Append |
	Cast;

export interface InstructionImplObjCommon {
	run(vm:StackVM, _i:InstructionType):void;
}

interface InstructionImplObj<T> extends InstructionImplObjCommon {
	get_class_type?:()=>T|null;
}

interface InstructionImpl<T> {
	new ():InstructionImplObj<T>;
}

interface AppendImpl extends InstructionImpl<AppendImpl> {}
interface BreakpointImpl extends InstructionImpl<BreakpointImpl> {}
interface CallImpl extends InstructionImpl<CallImpl> {}
interface CastImpl extends InstructionImpl<CastImpl> {}
interface ConstructImpl extends InstructionImpl<ConstructImpl> {}
interface DropImpl extends InstructionImpl<DropImpl> {}
interface DupImpl extends InstructionImpl<DupImpl> {}
interface GetImpl extends InstructionImpl<GetImpl> {}
interface HaltImpl extends InstructionImpl<HaltImpl> {}
interface JeImpl extends InstructionImpl<JeImpl> {}
interface JumpImpl extends InstructionImpl<JumpImpl> {}
interface ModifyOPImpl extends InstructionImpl<ModifyOPImpl> {}
interface NopImpl extends InstructionImpl<NopImpl> {}
interface PeekImpl extends InstructionImpl<PeekImpl> {}
interface PushImpl extends InstructionImpl<PushImpl> {}
interface PushArgsImpl extends InstructionImpl<PushArgsImpl> {}
interface PushGlobalImpl extends InstructionImpl<PushGlobalImpl> {}
interface PushIPImpl extends InstructionImpl<PushIPImpl> {}
interface PushThisImpl extends InstructionImpl<PushThisImpl> {}
interface ReturnImpl extends InstructionImpl<ReturnImpl> {}
interface VMCallImpl extends InstructionImpl<VMCallImpl> {}
interface VMReturnImpl extends InstructionImpl<VMReturnImpl> {}
interface VMBlockTraceImpl extends InstructionImpl<VMBlockTraceImpl> {}


export type InstructionImplMap={
	'append':AppendImpl;
	'breakpoint':BreakpointImpl;
	'call':CallImpl;
	'cast':CastImpl;
	'construct':ConstructImpl;
	'drop':DropImpl;
	'dup':DupImpl;
	'get':GetImpl;
	'halt':HaltImpl;
	'je':JeImpl;
	'jmp':JumpImpl;
	'modify_op':ModifyOPImpl;
	'nop':NopImpl;
	'peek':PeekImpl;
	'push_args':PushArgsImpl;
	'push_global':PushGlobalImpl;
	'push_ip':PushIPImpl;
	'push_this':PushThisImpl;
	'push':PushImpl;
	'return':ReturnImpl;
	'vm_block_trace':VMBlockTraceImpl;
	'vm_call':VMCallImpl;
	'vm_return':VMReturnImpl;
}

export type InstructionOpcodesList=[
	'append',
	'breakpoint',
	'call',
	'cast',
	'construct',
	'drop',
	'dup',
	'get',
	'halt',
	'je',
	'jmp',
	'modify_op',
	'nop',
	'peek',
	'push_args',
	'push_global',
	'push_ip',
	'push_this',
	'push',
	'return',
	'vm_block_trace',
	'vm_call',
	'vm_return',
];

export type Decode<T extends string> =
	T extends 'append' ? [T, AppendImpl] :
	T extends 'breakpoint' ? [T, BreakpointImpl] :
	T extends 'call' ? [T, CallImpl] :
	T extends 'cast' ? [T, CastImpl] :
	T extends 'construct' ? [T, ConstructImpl] :
	T extends 'drop' ? [T, DropImpl] :
	T extends 'dup' ? [T, DupImpl] :
	T extends 'get' ? [T, GetImpl] :
	T extends 'halt' ? [T, HaltImpl] :
	T extends 'je' ? [T, JeImpl] :
	T extends 'jmp' ? [T, JumpImpl] :
	T extends 'modify_op' ? [T, ModifyOPImpl] :
	T extends 'nop' ? [T, NopImpl] :
	T extends 'peek' ? [T, PeekImpl] :
	T extends 'push_args' ? [T, PushArgsImpl] :
	T extends 'push_global' ? [T, PushGlobalImpl] :
	T extends 'push_ip' ? [T, PushIPImpl] :
	T extends 'push_this' ? [T, PushThisImpl] :
	T extends 'push' ? [T, PushImpl] :
	T extends 'return' ? [T, ReturnImpl] :
	T extends 'vm_block_trace' ? [T, VMBlockTraceImpl] :
	T extends 'vm_call' ? [T, VMCallImpl] :
	T extends 'vm_return' ? [T, VMReturnImpl] :
	never;
