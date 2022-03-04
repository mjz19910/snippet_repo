import {ArrayBox, AsyncFunctionBox, CSSStyleSheetBox, CSSStyleSheetConstructorBox, CSSStyleSheetInitBox, CSSStyleSheetPromiseBox, DocumentBox, EmptyArrayBox, FunctionBox, GlobalThisBox, InstructionTypeArrayBox, MediaListBox, NewableFunctionBox, NodeBox, ObjectBox, PromiseBox, StackVMBox, TemporaryBox, VoidBox, VoidPromiseBox, WindowBox} from "types/box/mod.js";
import {Primitives} from "types/box/Primitives";
import {RealVoidBox} from "types/box/RealVoidBox";
import {DecodeArr, InstructionOpcodesList} from "types/vm/instruction/mod";
import {DomInstructionType} from "types/vm/instruction/vm/VMBlockTrace";
import {CreateDesc, NewDesc} from "../version_00_20/support";

type AnyTypeOfResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
type __v_test_value = | 0;

type InstructionList = DecodeArr<InstructionOpcodesList>;

export type State_1 = {
	depth_ins_map: DomInstructionType[][];
	ins_arr_map: DomInstructionType[][];
	depths: number[];
	ins_mem: DomInstructionType[];
}
export namespace AllImportsForSupport {
	export type AllImportsForSupport_BoxImports =
		ArrayBox |
		AsyncFunctionBox |
		CSSStyleSheetBox |
		CSSStyleSheetConstructorBox |
		CSSStyleSheetInitBox |
		CSSStyleSheetPromiseBox |
		DocumentBox |
		EmptyArrayBox |
		FunctionBox |
		GlobalThisBox |
		InstructionTypeArrayBox |
		MediaListBox |
		NewableFunctionBox |
		NodeBox |
		ObjectBox |
		PromiseBox |
		StackVMBox |
		TemporaryBox |
		VoidBox |
		RealVoidBox |
		VoidPromiseBox |
		WindowBox |
		Primitives;
}
export {
	Primitives,
	CreateDesc,
	NewDesc,
	InstructionList,
	AnyTypeOfResult,
	__v_test_value
};
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
	RealVoidBox,
	VoidPromiseBox,
	WindowBox
}