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
export class VMBoxedNull extends VMBoxedValue<null> {}
export class VMBoxedUndefined extends VMBoxedValue<undefined> {}

type VMFunctionTypes = VMBoxedFunction | VMBoxedNewableFunction | VMBoxedCallableFunction;
type VMClassTypes = VMFunctionTypes;
type VMValueTypes = VMBoxedArray|VMBoxedUndefined | VMBoxedNull | VMBoxedCallableIndexed | VMBoxedValue<object> | VMBoxedKeyedObject | VMClassTypes | bigint | boolean | number | string | symbol;
export type VMValue = VMValueTypes;
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
type InstructionPushInstructionPointer = ['push_pc'];
type InstructionConstruct = ['construct'];
type InstructionModifyOperand = ['modify_operand'];
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
type InstructionType4 = InstructionPushInstructionPointer | InstructionConstruct;
type InstructionType5 = InstructionModifyOperand;
type InstructionTypeG1 = InstructionType1 | InstructionType2;
type InstructionTypeG2 = InstructionType3 | InstructionType4;
type InstructionTypeG3 = InstructionType5;
type InstructionTypeG4 = InstructionTypeG1 | InstructionTypeG2;
type InstructionTypeG5 = InstructionTypeG3;
export type InstructionType = InstructionTypeG4 | InstructionTypeG5;
