type VMBoxed<T> = {
	value: T
}

class VMBoxedValue<T> implements VMBoxed<T> {
	constructor(value: T) {
		this.value = value;
	}
	value: T;
}

type HasNewableVMValue = {
	new (...a:VMValue[]) : VMValue
}

type HasCallableVMValue = {
	(...a:VMValue[]) : VMValue;
}

export class VMBoxedFunction extends VMBoxedValue<Function> {
	type:"function_box"="function_box";
}
export class VMBoxedNewableFunction extends VMBoxedValue<HasNewableVMValue> {
	type:"constructor_box"="constructor_box";
	constructor_type:"NewableFunction"="NewableFunction";
	from:"typescript"="typescript";
}
export class VMBoxedCSSStyleSheetConstructor extends VMBoxedValue<typeof CSSStyleSheet> {
	type:"constructor_box"="constructor_box";
	from:"javascript"="javascript";
	constructor_type:"CSSStyleSheet"="CSSStyleSheet";
}
export class VMBoxedCallableFunction extends VMBoxedValue<HasCallableVMValue> {
	type:"callable_box"="callable_box";
}
type HasVMValue={
	[v: string]: VMValue
};
type HasVMCallableIndexed = {
	[v: string]: (...v: VMValue[]) => VMValue;
};

export interface StackVM {
	push(value: VMValue) : void;
	pop() : VMValue | undefined;
}

export class VMBoxedCallableIndexed extends VMBoxedValue<HasVMCallableIndexed> {
	type:"callable_index"="callable_index";
};
export class VMBoxedKeyedObject extends VMBoxedValue<HasVMValue>{
	type:"object_index"="object_index";
}
export class VMBoxedArray extends VMBoxedValue<VMValue[]>{
	type:"value_array"="value_array";
}
export class VMBoxedStackVM extends VMBoxedValue<StackVM>{
	type:"StackVM"="StackVM";
}
export class VMBoxedWindow extends VMBoxedValue<Window>{
	type:"window_box"="window_box";
}
export class VMBoxedGlobalThis extends VMBoxedValue<typeof globalThis> {
	type:"global_object_box"="global_object_box";
}
export class VMBoxedNull extends VMBoxedValue<null> {
	type:"primitive"="primitive";
}
export class VMBoxedUndefined extends VMBoxedValue<undefined> {
	type:"primitive"="primitive";
}
export class VMBoxedObject extends VMBoxedValue<object> {
	type:"object"="object";
}
export class VMBoxedInstructionTypeArray extends VMBoxedValue<InstructionType[]>{
	type:"instruction_type_vec"="instruction_type_vec";
}
export class VMBoxedDomValue extends VMBoxedValue<Node> {
	type:"dom_value"="dom_value";
	from:"create"|"get"="create";
}
export class VMBoxedCSSStyleSheet extends VMBoxedValue<CSSStyleSheet> {
	type:"instance_box"="instance_box";
	instance_type:"CSSStyleSheet"="CSSStyleSheet";
}
export class VMBoxedPromise extends VMBoxedValue<Promise<VMValue>> {
	type:"promise"="promise";
}

type VMFunctionTypes = VMBoxedFunction | VMBoxedNewableFunction | VMBoxedCallableFunction;
type VMClassTypes = VMFunctionTypes;
type VMBoxedValueTypes= VMBoxedGlobalThis | VMBoxedDomValue;
type VMObjectTypes = VMBoxedCallableIndexed | VMBoxedKeyedObject | VMBoxedObject;
type VMArrayTypes = VMBoxedArray | VMBoxedInstructionTypeArray;
type VMInstanceTypes = VMBoxedCSSStyleSheet;
export type VMValue = VMBoxedStackVM | VMBoxedWindow |
VMArrayTypes |
VMBoxedUndefined | VMBoxedNull |
VMObjectTypes |
VMClassTypes |
VMBoxedValueTypes |
VMInstanceTypes |
VMBoxedPromise |
VMBoxedCSSStyleSheetConstructor |
bigint | boolean | number | string | symbol | undefined;;
type InstructionPushOperands = VMValue[];
type InstructionDropOperands = [];
type InstructionGetOperands = [];
type InstructionCallOperands = [number];
type InstructionReturnOperands = [];
type InstructionHaltOperands = [];
type InstructionThisOperands = [];
type InstructionGlobalOperands = [];
type InstructionBreakpointOperands = [];
type InstructionPushInstructionPointerOperands = [];
type InstructionPushArgsOperands = [];
type InstructionPush = ['push', ...InstructionPushOperands];
type InstructionDrop = ['drop', ...InstructionDropOperands];
type InstructionDup = ['dup'];
type InstructionGet = ['get', ...InstructionGetOperands];
type InstructionCall = ['call', ...InstructionCallOperands];
type InstructionReturn = ['return', ...InstructionReturnOperands];
type InstructionGlobal = ['global', ...InstructionGlobalOperands];
type InstructionThis = ['this', ...InstructionThisOperands];
type InstructionPushArgs = ['push_args', ...InstructionPushArgsOperands];
type InstructionBreakpoint = ['breakpoint', ...InstructionBreakpointOperands];
type InstructionHalt = ['halt', ...InstructionHaltOperands];
type InstructionPushInstructionPointer = ['push_pc', ...InstructionPushInstructionPointerOperands];
type InstructionConstructOperands = [number];
type InstructionConstruct = ['construct', ...InstructionConstructOperands];
type InstructionModifyOperandOperands = [number,  number];
type InstructionModifyOperand = ['modify_operand', ...InstructionModifyOperandOperands];
type InstructionPeek = ['peek', number,  number];
type DomInstructionAppend = ['dom_append'];
type InstructionExec = ['exec', InstructionType[]];
type InstructionJumpJe = ['je', number];
type InstructionJumpAbs = ['jmp', number];
type SkipItem0_t<T extends [f:string, ...v:any[]], X> = T extends [X, ...infer U] ? U : T[1];
type SkipItem0<T extends [f:any, ...v:any[]]> = SkipItem0_t<T, T[0]>
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
export class VMBoxedInstructionType extends VMBoxedValue<InstructionType> {}
