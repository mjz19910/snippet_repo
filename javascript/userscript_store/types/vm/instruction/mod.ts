import {InstructionAppend} from "./InstructionAppend";
import {InstructionBreakpoint} from "./InstructionBreakpoint";
import {InstructionCast} from "./InstructionCast";
import {InstructionGet} from "./InstructionGet";
import {InstructionGlobal} from "./InstructionGlobal";
import {InstructionHalt} from "./InstructionHalt";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import {InstructionPeek} from "./InstructionPeek";
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
	// TODO: convert to base stack ptr access
	InstructionPeek |
	// FFI property access
	InstructionGet |
	// FFI Call
	gen.InstructionCall |
	InstructionReturn |
	// Jump
	jump.InstructionJumpAbs |
	jump.InstructionJumpJe |
	// Turing
	InstructionHalt |
	// Special
	InstructionPushArgs | InstructionPushVMObj | InstructionGlobal |
	// Debug
	InstructionBreakpoint |
	// VM
	vm.VMInstructionReturn |
	vm.VMInstructionCall |
	vm.VMInstructionPushInstructionPtr |
	gen.InstructionConstruct |
	InstructionModifyOperand |
	InstructionAppend |
	InstructionCast;
