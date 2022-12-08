import {instruction_table_type} from "./as_const";

export {};

export {CSSStyleSheetBox} from "./support/CSSStyleSheetBox";
export {StackVMBox} from "./support/StackVMBox";
export {type Box} from "./support/Box";
export {NumberBox} from "./support/NumberBox";
export {ObjectBox} from "./support/ObjectBox";
export {VoidBox} from "./support/VoidBox";
export {WindowBox} from "./support/WindowBox";
export {StackVM} from "./support/StackVM";

export type InstructionType=[keyof typeof instruction_table_type,...any[]];
