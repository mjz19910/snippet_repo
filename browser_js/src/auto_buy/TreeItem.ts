import {InstructionType} from "../instruction/InstructionType.ts";

export type TreeItem=[number,'op',InstructionType]|[number,'group',TreeItem[]];
