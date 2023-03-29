import {InstructionType} from "../instruction/InstructionType.js";

export type TreeItem=[number,'op',InstructionType]|[number,'group',TreeItem[]];
