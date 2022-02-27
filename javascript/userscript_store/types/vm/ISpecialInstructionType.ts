import {InstructionPushArgs} from "./instruction/InstructionPushArgs";
import {InstructionThis} from "./instruction/InstructionThis";
import {InstructionGlobal} from "./instruction/InstructionGlobal";


export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
