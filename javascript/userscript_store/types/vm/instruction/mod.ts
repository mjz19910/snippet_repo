import {InstructionAppend} from "./InstructionAppend";
import {InstructionBreakpoint} from "./InstructionBreakpoint";
import {InstructionCast} from "./InstructionCast";
import {InstructionPushGlobalObj} from "./InstructionPushGlobalObj";
import {InstructionHalt} from "./InstructionHalt";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import {InstructionPushArgs} from "./InstructionPushArgs";
import {InstructionReturn} from "./InstructionReturn";
import {InstructionPushVMObj} from "./InstructionPushVMObj";
import * as gen from "./general/mod";
import * as jump from "./jump/mod";
import * as st from "./stack/mod";
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
	InstructionReturn |
	// Jump
	jump.InstructionJumpAbs |
	jump.InstructionJumpJe |
	// Turing
	InstructionHalt |
	// Special
	InstructionPushArgs |
	InstructionPushVMObj |
	InstructionPushGlobalObj |
	// Debug
	InstructionBreakpoint |
	// VM
	vm.InstructionReturn |
	vm.InstructionCall |
	vm.InstructionPushInstructionPtr |
	InstructionModifyOperand |
	InstructionAppend |
	InstructionCast;
