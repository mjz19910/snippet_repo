import {ArrayBox, AsyncFunctionBox, CSSStyleSheetBox, CSSStyleSheetConstructorBox, CSSStyleSheetInitBox, CSSStyleSheetPromiseBox, DocumentBox, EmptyArrayBox, FunctionBox, GlobalThisBox, InstructionTypeArrayBox, MediaListBox, NewableFunctionBox, NodeBox, ObjectBox, PromiseBox, StackVMBox, TemporaryBox, VoidBox, VoidPromiseBox, WindowBox} from "types/box/mod.js";
import {Primitives} from "types/box/Primitives";
import {RealVoidBox} from "types/box/RealVoidBox";
import {Breakpoint} from "types/vm/instruction/debug/Breakpoint";
import {Return as general_Return} from "types/vm/instruction/general/Return";
import {IAppendImpl, IBreakpointImpl, ICallImpl, ICastImpl, IConstructImpl, IDropImpl, IDupImpl, IGetImpl, IHaltImpl, IJeImpl, IJumpImpl, IModifyOPImpl, INopImpl, IPeekImpl, IPushImpl, IPushWindowObjectImpl, IReturnImpl, IVMBlockTraceImpl, IVMCallImpl, IVMPushArgsImpl, IVMPushIPImpl, IVMPushSelfImpl, IVMReturnImpl, PushWindowObject} from "types/vm/instruction/mod";
import {VMPushSelf} from "types/vm/instruction/push/mod";
import {Halt as turing_Halt} from "types/vm/instruction/turing/Halt";
import {DomInstructionType} from "types/vm/instruction/vm/VMBlockTrace";
import {CreateDesc, NewDesc} from "../version_00_20/support";
type x = | 0;
export {
	x,
	turing_Halt as InstructionHalt,
	general_Return as InstructionReturn,
	Breakpoint as InstructionBreakpoint,
	VMPushSelf as InstructionVMPushSelf,
	PushWindowObject as InstructionPushWindowObject,
	IAppendImpl,
	IBreakpointImpl,
	ICallImpl,
	ICastImpl,
	IConstructImpl,
	IDropImpl,
	IDupImpl,
	IGetImpl,
	IHaltImpl,
	IJeImpl,
	IJumpImpl,
	IModifyOPImpl,
	INopImpl,
	IPeekImpl,
	IPushWindowObjectImpl,
	IPushImpl,
	IReturnImpl,
	IVMBlockTraceImpl,
	IVMCallImpl,
	IVMPushArgsImpl,
	IVMPushIPImpl,
	IVMPushSelfImpl,
	IVMReturnImpl,
}

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