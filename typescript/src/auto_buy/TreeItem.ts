import {InstructionType} from "../vm/instruction/InstructionType.js";

export type TreeItem=[number,'op',InstructionType]|[number,'group',TreeItem[]];
