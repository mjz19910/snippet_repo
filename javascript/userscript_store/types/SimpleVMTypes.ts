type VMBoxed<T> = {
	value: T
}

export class VMBoxedValue<T> implements VMBoxed<T> {
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
type HasVMValue={[v: string]: VMValue};
type HasVMCallableIndexed = {
	[v: string]: (...v: VMValue[]) => VMValue;
};

export interface StackVM {
	push(value: VMValue):void;
}

export class VMBoxedCallableIndexed extends VMBoxedValue<HasVMCallableIndexed> {};
export class VMBoxedKeyedObject extends VMBoxedValue<HasVMValue>{}
export class VMBoxedArray extends VMBoxedValue<VMValue[]>{}
export class VMBoxedStackVM extends VMBoxedValue<StackVM>{}
export class VMBoxedWindow extends VMBoxedValue<Window>{}
export class VMBoxedGlobalThis extends VMBoxedValue<typeof globalThis> {}

type VMFunctionTypes = VMBoxedFunction | VMBoxedNewableFunction | VMBoxedCallableFunction;
type VMClassTypes = VMFunctionTypes;
type VMValueTypes = VMBoxedCallableIndexed | VMBoxedValue<object> | VMBoxedKeyedObject | VMClassTypes | bigint | boolean | number | string | symbol;
export type VMValue = VMValueTypes | undefined;
type StackInstructionPushArgs = VMValue[];
type InstructionDropArgs = [];
type InstructionGetArgs = [];
type InstructionCallArgs = [number];
type InstructionReturnArgs = [];
type InstructionHaltArgs = [];
type SpecialInstructionPushArgsType = [];
type InstructionThisArgs = [];
type InstructionGlobalArgs = [];
type InstructionBreakpointArgs = [];
type InstructionPush = ['push', ...StackInstructionPushArgs];
type InstructionDrop = ['drop', ...InstructionDropArgs];
type InstructionGet = ['get', ...InstructionGetArgs];
type InstructionCall = ['call', ...InstructionCallArgs];
type InstructionReturn = ['return', ...InstructionReturnArgs];
type InstructionGlobal = ['global', ...InstructionGlobalArgs];
type InstructionThis = ['this', ...InstructionThisArgs];
type InstructionPushArgs = ['push_args', ...SpecialInstructionPushArgsType];
type InstructionBreakpoint = ['breakpoint', ...InstructionBreakpointArgs];
type InstructionHalt = ['halt', ...InstructionHaltArgs];
export type AnyInstructionOperands = StackInstructionPushArgs | InstructionDropArgs | InstructionCallArgs | InstructionGetArgs;

export type IStackInstructionType = InstructionPush | InstructionDrop;
export type IObjectInstructionType = InstructionGet;
export type ICallInstructionType = InstructionCall | InstructionReturn;
export type ITuringInstructionType = InstructionHalt;
export type ISpecialInstructionType = InstructionPushArgs | InstructionThis | InstructionGlobal;
export type IDebugInstructionType = InstructionBreakpoint;
type InstructionType1 = IStackInstructionType | IObjectInstructionType;
type InstructionType2 = ICallInstructionType | ITuringInstructionType;
type InstructionType3 = ISpecialInstructionType | IDebugInstructionType;
type InstructionTypeG1 = InstructionType1 | InstructionType2;
type InstructionTypeG2 = InstructionType2 | InstructionType3;
export type InstructionType = InstructionTypeG1 | InstructionTypeG2;
