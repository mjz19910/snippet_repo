import * as jump from "./jump/mod";
import {InstructionExec} from "./InstructionExec";
import {InstructionAppend} from "./InstructionAppend";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import * as gen from "./general/mod";
import * as st from "./stack/mod";
import {VMInstructionPushIP} from "./InstructionPushInstructionPointer";
import {InstructionCast} from "./InstructionCast";
import {InstructionGet} from "./InstructionGet";
import {InstructionPeek} from "./InstructionPeek";
import {InstructionReturn} from "./InstructionReturn";
import {InstructionCall} from "./general/InstructionCall";
import {InstructionHalt} from "./InstructionHalt";
import {InstructionPushArgs} from "./InstructionPushArgs";
import {InstructionThis} from "./InstructionThis";
import {InstructionGlobal} from "./InstructionGlobal";
import {InstructionBreakpoint} from "./InstructionBreakpoint";
import {VMInstructionReturn} from "./VMInstructionReturn";
import {VMInstructionCall} from "./VMInstructionCall";


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
	InstructionCall |
	InstructionReturn |
	// Jump
	jump.InstructionJumpAbs |
	jump.InstructionJumpJe |
	// Turing
	InstructionHalt |
	// Special
	InstructionPushArgs | InstructionThis | InstructionGlobal |
	// Debug
	InstructionBreakpoint |
	// VM
	VMInstructionReturn |
	VMInstructionCall |
	VMInstructionPushIP |
	gen.InstructionConstruct |
	InstructionModifyOperand |
	InstructionExec |
	InstructionAppend |
	InstructionCast;
