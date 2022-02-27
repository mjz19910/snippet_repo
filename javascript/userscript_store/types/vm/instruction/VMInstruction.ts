import {VMInstructionCall} from "./VMInstructionCall";
import {VMInstructionReturn} from "./VMInstructionReturn";
export type VMInstruction = VMInstructionReturn | VMInstructionCall;
