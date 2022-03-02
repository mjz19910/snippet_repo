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

interface AppendImpl {}
interface BreakpointImpl {}
interface CallImpl {}
interface CastImpl {}
interface ConstructImpl {}
interface DropImpl {}
interface DupImplImpl {}
interface GetImplImpl {}
interface HaltImpl {}
interface JeImpl {}
interface JumpImpl {}
interface ModifyOPImpl {}
interface NopImpl {}
interface PeekImpl {}
interface PushImpl {}
interface PushArgsImpl {}
interface PushGlobalImpl {}
interface PushIPImpl {}
interface PushThisImpl {}
interface ReturnImpl {}
interface VMCallImpl {}
interface VMReturnImpl {}
interface VMBlockTraceImpl {}

export type Decode<T extends string> =
	T extends 'append' ? [T, AppendImpl] :
	T extends 'breakpoint' ? [T, BreakpointImpl] :
	T extends 'call' ? [T, CallImpl] :
	T extends 'cast' ? [T, CastImpl] :
	T extends 'construct' ? [T, ConstructImpl] :
	T extends 'drop' ? [T, DropImpl] :
	T extends 'dup' ? [T, DupImplImpl] :
	T extends 'get' ? [T, GetImplImpl] :
	T extends 'halt' ? [T, HaltImpl] :
	T extends 'je' ? [T, JeImpl] :
	T extends 'jmp' ? [T, JumpImpl] :
	T extends 'modify_op' ? [T, ModifyOPImpl] :
	T extends 'nop' ? [T, NopImpl] :
	T extends 'peek' ? [T, PeekImpl] :
	T extends 'push' ? [T, PushImpl] :
	T extends 'push_args' ? [T, PushArgsImpl] :
	T extends 'push_global' ? [T, PushGlobalImpl] :
	T extends 'push_ip' ? [T, PushIPImpl] :
	T extends 'push_this' ? [T, PushThisImpl] :
	T extends 'return' ? [T, ReturnImpl] :
	T extends 'vm_call' ? [T, VMCallImpl] :
	T extends 'vm_return' ? [T, VMReturnImpl] :
	T extends 'vm_block_trace' ? [T, VMBlockTraceImpl] :
	never;
