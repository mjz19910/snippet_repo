class VMBoxed<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
}
/* --- VM Value supporting types ---
IsVMIndexed, IsVMValueNewable, IsVMValueCallable, IsVMCallableIndexed
*/
type VMNewableValue = {
	new(...a: VMValue[]): VMValue;
};
type VMCallableValue = {
	(...a: VMValue[]): VMValue;
};
type VMIndexed<T> = {
	[v: string]: T;
};
/* --- VM Value supporting interfaces ---
StackVM
*/
export interface StackVM {
	push(value: VMValue): void;
	pop(): VMValue | undefined;
}

/* --- VM Value (classes) ---
VMBoxedFunction, VMNewableFunction, VMBoxedCSSStyleSheetConstructor
VMCallableFunction, VMIndexedCallableValue, VMBoxedIndexedObjectValue
*/
export class VMBoxedFunction extends VMBoxed<Function> {
	type: "function_box" = "function_box";
}
export class VMNewableFunction extends VMBoxed<VMNewableValue> {
	type: "constructor_box" = "constructor_box";
	constructor_type: "NewableFunction" = "NewableFunction";
	from: "typescript" = "typescript";
}
export class VMBoxedCSSStyleSheetConstructor extends VMBoxed<typeof CSSStyleSheet> {
	type: "constructor_box" = "constructor_box";
	from: "javascript" = "javascript";
	constructor_type: "CSSStyleSheet" = "CSSStyleSheet";
}
export class VMCallableFunction extends VMBoxed<VMCallableValue> {
	type: "callable_box" = "callable_box";
}
export class VMIndexedCallableValue extends VMBoxed<VMIndexed<VMCallableValue>> {
	type: "callable_index" = "callable_index";
};
export class VMIndexedObjectValue extends VMBoxed<VMIndexed<VMValue>>{
	type: "object_index" = "object_index";
}
export class VMBoxedArray extends VMBoxed<VMValue[]>{
	type: "value_array" = "value_array";
}
export class VMBoxedStackVM extends VMBoxed<StackVM>{
	type: "StackVM" = "StackVM";
}
export class VMBoxedWindow extends VMBoxed<Window>{
	type: "window_box" = "window_box";
}
export class VMBoxedGlobalThis extends VMBoxed<typeof globalThis> {
	type: "global_object_box" = "global_object_box";
}
export class VMBoxedNull extends VMBoxed<null> {
	type: "primitive" = "primitive";
}
export class VMBoxedUndefined extends VMBoxed<undefined> {
	type: "primitive" = "primitive";
}
export class VMBoxedObject extends VMBoxed<object> {
	type: "object" = "object";
}
export class VMBoxedInstructionTypeArray extends VMBoxed<InstructionType[]>{
	type: "instruction_type_vec" = "instruction_type_vec";
}
export class VMBoxedDomValue extends VMBoxed<Node> {
	type: "dom_value" = "dom_value";
	from: "create" | "get" = "create";
}
export class VMBoxedCSSStyleSheet extends VMBoxed<CSSStyleSheet> {
	type: "instance_box" = "instance_box";
	instance_type: "CSSStyleSheet" = "CSSStyleSheet";
}
export class VMBoxedPromise extends VMBoxed<Promise<VMValue>> {
	type: "promise" = "promise";
}

// --- VM Value (types) ---

type VMFunctionTypes = VMBoxedFunction | VMNewableFunction | VMCallableFunction;
type VMClassTypes = VMFunctionTypes;
type VMBoxedValueTypes = VMBoxedGlobalThis | VMBoxedDomValue;
type VMObjectTypes = VMIndexedCallableValue | VMIndexedObjectValue | VMBoxedObject;
type VMArrayTypes = VMBoxedArray | VMBoxedInstructionTypeArray;
type VMInstanceTypes = VMBoxedCSSStyleSheet;
export type VMValue = VMBoxedStackVM | VMBoxedWindow |
	VMArrayTypes |
	VMObjectTypes |
	VMClassTypes |
	VMBoxedValueTypes |
	VMInstanceTypes |
	VMBoxedPromise |
	VMBoxedCSSStyleSheetConstructor |
	bigint | boolean | number | string | symbol | null | undefined;

// --- Instruction ---
type InstructionPush = ['push', ...VMValue[]];
type InstructionDrop = ['drop'];
type InstructionDup = ['dup'];
type InstructionGet = ['get'];
type InstructionCall = ['call', number];
type InstructionReturn = ['return'];
type InstructionGlobal = ['global'];
type InstructionThis = ['this'];
type InstructionPushArgs = ['push_args'];
type InstructionBreakpoint = ['breakpoint'];
type InstructionHalt = ['halt'];
type InstructionPushInstructionPointer = ['push_pc'];
type InstructionConstruct = ['construct', number];
type InstructionModifyOperand = ['modify_operand', number, number];
type InstructionPeek = ['peek', number, number];
type DomInstructionAppend = ['dom_append'];
type InstructionExec = ['exec', InstructionType[]];
type InstructionJumpJe = ['je', number];
type InstructionJumpAbs = ['jmp', number];
type SkipItem0_t<T extends [f: string, ...v: any[]], X> = T extends [X, ...infer U] ? U : T[1];
type SkipItem0<T extends [f: any, ...v: any[]]> = SkipItem0_t<T, T[0]>
export type AnyInstructionOperands = SkipItem0<InstructionType>;

export type IStackInstructionType = InstructionPush | InstructionPeek | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
export type IInstructionJumpType = InstructionJumpJe | InstructionJumpAbs;
export type IDomInstructions = DomInstructionAppend;
export type InstructionType = IStackInstructionType | IObjectInstructionType |
	ICallInstructionType | ITuringInstructionType |
	ISpecialInstructionType | IDebugInstructionType | IInstructionJumpType |
	InstructionPushInstructionPointer | InstructionConstruct |
	InstructionModifyOperand | InstructionDup | InstructionExec;
export class VMBoxedInstructionType extends VMBoxed<InstructionType> {}
