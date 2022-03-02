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

export type Decode<T extends string>=
T extends 'append'? [T, AppendImpl] : never;
