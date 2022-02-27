import {IStackInstructionType} from "./interface/IStackInstructionType";
import {IObjectInstructionType} from "../IObjectInstructionType";
import {ICallInstructionType} from "./interface/ICallInstructionType";
import {ITuringInstructionType} from "../ITuringInstructionType";
import {ISpecialInstructionType} from "../ISpecialInstructionType";
import {IDebugInstructionType} from "./interface/IDebugInstructionType";
import {InstructionJumpTypes} from "./interface/InstructionJumpTypes";
import {InstructionExecutionTypes} from "./InstructionExecutionTypes";
import {InstructionExec} from "./InstructionExec";
import {InstructionAppend} from "./InstructionAppend";
import {InstructionModifyOperand} from "./InstructionModifyOperand";
import {InstructionConstruct} from "./InstructionConstruct";
import {InstructionPushInstructionPointer} from "./InstructionPushInstructionPointer";
import {InstructionCast as InstructionCast} from "./InstructionCast";


export type InstructionType =
	IStackInstructionType | IObjectInstructionType |
	ICallInstructionType | ITuringInstructionType |
	ISpecialInstructionType | IDebugInstructionType |
	InstructionJumpTypes | InstructionExecutionTypes |
	InstructionPushInstructionPointer | InstructionConstruct |
	InstructionModifyOperand | InstructionExec |
	InstructionAppend | InstructionCast;
