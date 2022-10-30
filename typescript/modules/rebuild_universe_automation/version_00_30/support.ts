import {Primitives} from "../../../box/helper/Primitives"
import {RealVoidBox} from "../../../box/RealVoidBox"
import {Breakpoint} from "../../../vm/instruction/debug/Breakpoint"
import {Return as general_Return} from "../../../vm/instruction/general/Return"
import {VMPushSelf} from "../../../vm/instruction/push/mod"
import {Halt as turing_Halt} from "../../../vm/instruction/turing/Halt"
import {DomInstructionType} from "../../../vm/dom_instruction/DomInstructionType"
import {CreateDesc,NewDesc} from "../version_00_20/support"
import {PushWindowObject} from "../../../vm/instruction/PushWindowObject"
import {ArrayBox} from "../../../box/ArrayBox"
import {AsyncFunctionBox} from "../../../box/AsyncFunctionBox"
import {CSSStyleSheetBox} from "../../../box/CSSStyleSheetBox"
import {CSSStyleSheetConstructorBox} from "../../../box/CSSStyleSheetConstructorBox"
import {CSSStyleSheetInitBox} from "../../../box/CSSStyleSheetInitBox"
import {CSSStyleSheetPromiseBox} from "../../../box/CSSStyleSheetPromiseBox"
import {DocumentBox} from "../../../box/DocumentBox"
import {EmptyArrayBox} from "../../../box/EmptyArrayBox"
import {WindowBox} from "../../../box/WindowBox"
import {VoidPromiseBox} from "../../../box/VoidPromiseBox"
import {VoidBox} from "../../../box/VoidBox"
import {TemporaryBox} from "../../../box/temporary_box/TemporaryBox"
import {StackVMBox} from "../../../box/StackVMBox"
import {PromiseBox} from "../../../box/PromiseBox"
import {ObjectBox} from "../../../box/ObjectBox"
import {NodeBox} from "../../../box/NodeBox"
import {NewableFunctionBox} from "../../../box/NewableFunctionBox"
import {MediaListBox} from "../../../box/MediaListBox"
import {InstructionTypeArrayBox} from "../../../box/InstructionTypeArrayBox"
import {GlobalThisBox} from "../../../box/GlobalThisBox"
import {FunctionBox} from "../../../box/FunctionBox"
export {
	turing_Halt as InstructionHalt,
	general_Return as InstructionReturn,
	Breakpoint as InstructionBreakpoint,
	VMPushSelf as InstructionVMPushSelf,
	PushWindowObject as InstructionPushWindowObject,
}

export type State_1={
	depth_ins_map: DomInstructionType[][]
	ins_arr_map: DomInstructionType[][]
	depths: number[]
	ins_mem: DomInstructionType[]
}
export namespace AllImportsForSupport {
	export type AllImportsForSupport_BoxImports=
		ArrayBox|
		AsyncFunctionBox|
		CSSStyleSheetBox|
		CSSStyleSheetConstructorBox|
		CSSStyleSheetInitBox|
		CSSStyleSheetPromiseBox|
		DocumentBox|
		EmptyArrayBox|
		FunctionBox|
		GlobalThisBox|
		InstructionTypeArrayBox|
		MediaListBox|
		NewableFunctionBox|
		NodeBox|
		ObjectBox|
		PromiseBox|
		StackVMBox|
		TemporaryBox|
		VoidBox|
		RealVoidBox|
		VoidPromiseBox|
		WindowBox|
		Primitives
}
export {
	Primitives,
	CreateDesc,
	NewDesc
}
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