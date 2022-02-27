import {InstructionPushArgs} from "../InstructionPushArgs";
import {InstructionThis} from "../InstructionThis";
import {InstructionGlobal} from "../InstructionGlobal";


export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
