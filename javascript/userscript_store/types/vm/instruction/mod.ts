import {InstructionAppend} from "./InstructionAppend";
import {InstructionBreakpoint} from "./InstructionBreakpoint";
import {InstructionCast} from "./InstructionCast";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import * as gen from "./general/mod";
import * as jump from "./jump/mod";
import * as push from "./push/mod";
import * as st from "./stack/mod";
import * as turing from "./turing/mod";
import * as vm from "./vm/mod";


export type InstructionType =
	// Stack
	st.InstructionPush |
	st.InstructionDup |
	st.InstructionDrop |
	st.InstructionPeek |
	// FFI
	gen.InstructionGet |
	gen.InstructionCall |
	gen.InstructionConstruct |
	gen.InstructionReturn |
	// Jump
	jump.InstructionJumpAbs |
	jump.InstructionJumpJe |
	turing.InstructionHalt |
	// Push values
	push.InstructionPushArgs |
	push.InstructionPushVMObj |
	push.InstructionPushGlobalObj |
	// Debug
	InstructionBreakpoint |
	// VM
	vm.InstructionReturn |
	vm.InstructionCall |
	vm.InstructionPushInstructionPtr |
	InstructionModifyOperand |
	InstructionAppend |
	InstructionCast;
