import {Decode, DecodeArr, InstructionOpcodesList} from "types/vm/instruction/mod";

type AnyTypeOfResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
type __v_test_value = | 0;

type InstructionList=DecodeArr<InstructionOpcodesList>;

export type State_1={
    depth_ins_map: DomInstructionType[][];
    ins_arr_map: DomInstructionStack;
    depths: number[];
}

export {} from "types/vm/instruction/mod";
export {Primitives} from "types/vm/Primitives";
export {
	ArrayBox,
	AsyncFunctionBox,
	CSSStyleSheetBox,
	CSSStyleSheetConstructorBox,
	CSSStyleSheetInitBox,
	CSSStyleSheetPromiseBox,
	DocumentBox,
	EmptyArrayBox,
	FunctionBox,
	GlobalThisBox,
	InstructionTypeArrayBox,
	MediaListBox,
	NewableFunctionBox,
	NodeBox,
	ObjectBox,
	PromiseBox,
	StackVMBox,
	TemporaryBox,
	VoidBox,
	VoidPromiseBox,
	WindowBox,
} from "types/vm/box/mod.js";
export {
	InstructionList,
	AnyTypeOfResult,
	__v_test_value
};