import {instruction_table_type} from "../as_const";


export type InstructionType=[keyof typeof instruction_table_type,...any[]];
