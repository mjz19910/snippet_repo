import {InstructionPeek} from "../InstructionPeek";
import {InstructionDup} from "../InstructionDup";
import {InstructionDrop} from "../InstructionDrop";
import {InstructionPush} from "../InstructionPush";


export type IStackInstructionType = InstructionPush | InstructionDup | InstructionPeek | InstructionDrop;
