import {InstructionJumpTypes as InstructionJump} from "./interface/InstructionJumpTypes";
import {VMInstruction as VMInstruction} from "./VMInstruction";
import {InstructionExec} from "./InstructionExec";
import {InstructionAppend} from "./InstructionAppend";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import {InstructionConstruct} from "./InstructionConstruct";
import {InstructionPushInstructionPointer} from "./InstructionPushInstructionPointer";
import {InstructionCast as InstructionCast} from "./InstructionCast";
import {InstructionGet} from "./InstructionGet";
import {InstructionDrop} from "./InstructionDrop";
import {InstructionPeek} from "./InstructionPeek";
import {InstructionDup} from "./InstructionDup";
import {InstructionPush} from "./InstructionPush";
import {InstructionReturn} from "./InstructionReturn";
import {InstructionCall} from "./InstructionCall";
import {InstructionHalt} from "./InstructionHalt";
import {InstructionPushArgs} from "./InstructionPushArgs";
import {InstructionThis} from "./InstructionThis";
import {InstructionGlobal} from "./InstructionGlobal";
import {InstructionBreakpoint} from "./InstructionBreakpoint";
import {VMInstructionReturn} from "./VMInstructionReturn";
import {VMInstructionCall} from "./VMInstructionCall";


export type InstructionType =
	// Stack
	InstructionPush |
	InstructionDup |
	InstructionPeek |
	InstructionDrop |
	InstructionGet |
	// FFI Call
	InstructionCall |
	InstructionReturn |
	// Turing
	InstructionHalt |
	// Special
	InstructionPushArgs | InstructionThis | InstructionGlobal |
	// Debug
	InstructionBreakpoint |
	InstructionJump |
	// VM
	VMInstructionReturn |
	VMInstructionCall |
	InstructionPushInstructionPointer |
	InstructionConstruct |
	InstructionModifyOperand |
	InstructionExec |
	InstructionAppend |
	InstructionCast;
