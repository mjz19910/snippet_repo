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

export class VMBoxedFunction extends VMBoxedValue<Function> {}
export class VMBoxedNewableFunction extends VMBoxedValue<HasNewableVMValue> {}
export class VMBoxedCallableFunction extends VMBoxedValue<CallableFunction> {}
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

export class VMBoxedCallableIndexed extends VMBoxedValue<HasVMCallableIndexed> {};
export class VMBoxedKeyedObject extends VMBoxedValue<HasVMValue>{}
export class VMBoxedArray extends VMBoxedValue<VMValue[]>{}
export class VMBoxedStackVM extends VMBoxedValue<StackVM>{}
export class VMBoxedWindow extends VMBoxedValue<Window>{}
export class VMBoxedGlobalThis extends VMBoxedValue<typeof globalThis> {}
export class VMBoxedNull extends VMBoxedValue<null> {}
export class VMBoxedUndefined extends VMBoxedValue<undefined> {}

type VMFunctionTypes = VMBoxedFunction | VMBoxedNewableFunction | VMBoxedCallableFunction;
type VMClassTypes = VMFunctionTypes;
type VMValueTypes = VMBoxedArray|VMBoxedUndefined | VMBoxedNull | VMBoxedCallableIndexed | VMBoxedValue<object> | VMBoxedKeyedObject | VMClassTypes | bigint | boolean | number | string | symbol;
export type VMValue = VMValueTypes;
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
type InstructionGet = ['get', ...InstructionGetOperands];
type InstructionCall = ['call', ...InstructionCallOperands];
type InstructionReturn = ['return', ...InstructionReturnOperands];
type InstructionGlobal = ['global', ...InstructionGlobalOperands];
type InstructionThis = ['this', ...InstructionThisOperands];
type InstructionPushArgs = ['push_args', ...InstructionPushArgsOperands];
type InstructionBreakpoint = ['breakpoint', ...InstructionBreakpointOperands];
type InstructionHalt = ['halt', ...InstructionHaltOperands];
type InstructionPushInstructionPointer = ['push_pc', ...InstructionPushInstructionPointerOperands];
type InstructionConstructOperands = [];
type InstructionConstruct = ['construct', ...InstructionConstructOperands];
type InstructionModifyOperandOperands = [];
type InstructionModifyOperand = ['modify_operand', ...InstructionModifyOperandOperands];
type SkipItem0<T extends [f:string, ...v:any[]], X> = T extends [X, infer U] ? U : T[1];
export type AnyInstructionOperands = InstructionPushOperands | InstructionCallOperands | [];

export type IStackInstructionType = InstructionPush | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
type InstructionType1 = IStackInstructionType | IObjectInstructionType;
type InstructionType2 = ICallInstructionType | ITuringInstructionType;
type InstructionType3 = ISpecialInstructionType | IDebugInstructionType;
type InstructionType4 = InstructionPushInstructionPointer | InstructionConstruct;
type InstructionType5 = InstructionModifyOperand;
type InstructionTypeG1 = InstructionType1 | InstructionType2;
type InstructionTypeG2 = InstructionType3 | InstructionType4;
type InstructionTypeG3 = InstructionType5;
type InstructionTypeG4 = InstructionTypeG1 | InstructionTypeG2;
type InstructionTypeG5 = InstructionTypeG3;
export type InstructionType = InstructionTypeG4 | InstructionTypeG5;
export class VMBoxedInstructionType extends VMBoxedValue<InstructionType> {}
