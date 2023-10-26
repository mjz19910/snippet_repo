import {instruction_table_type} from "../as_const.ts";
export type InstructionType=[keyof typeof instruction_table_type,...unknown[]];