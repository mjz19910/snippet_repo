import Append from "./Append";
import {AppendOpcode} from "./opcodes/AppendOpcode";
import {Cast} from "./Cast";
import {CastOpcode as CastOpcode} from "./opcodes/CastOpcode";
import {ModifyOperand} from "./ModifyOperand";
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode";
import {Nop} from "./Nop";
import {NopOpcode} from "./opcodes/NopOpcode";
import * as debug from "./debug/mod";
import * as general from "./general/mod";
import * as jump from "./jump/mod";
import * as push from "./push/mod";
import * as stack from "./stack/mod";
import * as turing from "./turing/mod";
import * as vm from "./vm/mod";
import {StackVM} from "../StackVM";
import {GlobalObjectOpcode} from "./opcodes/GlobalObjectOpcode";
import {PushSelfOpcode as VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode";
import {CallOpcode} from "./opcodes/CallOpcode";
import {ConstructOpcode} from "./opcodes/ConstructOpcode";
import {GetOpcode} from "./opcodes/GetOpcode";
import {HaltOpcode} from "./opcodes/HaltOpcode";
export {
	Append,
	Cast,
	debug,
	general,
	jump,
	ModifyOperand,
	Nop,
	push,
	stack,
	turing,
	vm,
};

export type InstructionMap={
	'append':Append;
	'breakpoint':debug.Breakpoint
	'call':general.Call
	'cast':Cast;
	'construct':general.Construct
	'drop':stack.Drop
	'dup':stack.Dup
	'get':general.Get
	'halt':turing.Halt
	'je':jump.Je
	'jmp':jump.Jump
	'modify_operand':ModifyOperand
	'nop':Nop
	'peek':stack.Peek
	'push_global_object':push.GlobalObject
	'push':stack.Push
	'return':general.Return
	'vm_block_trace':vm.BlockTrace;
	'vm_call':vm.Call;
	'vm_push_args':push.Args
	'vm_push_ip':vm.PushIP;
	'vm_push_self':push.VMPushSelf
	'vm_return':vm.Return;
}

export type InstructionType = InstructionMap[keyof InstructionMap];


export interface InstructionImplObj<T, C_Ty, I_Type> {
	type:T;
	get_class_type?: () => C_Ty | null;
	run(vm: StackVM, _i: I_Type): void;
}

export interface InstructionImpl<T extends [string, any, any]> {
	new(): InstructionImplObj<T[0], T[1], T[2]>;
}

type IM<T extends keyof InstructionImplMap & keyof InstructionMap>=[T, InstructionImplMap[T], InstructionMap[T]];

export interface IAppendImpl extends InstructionImpl<IM<AppendOpcode>> {}
export interface IBreakpointImpl extends InstructionImpl<IM<debug.BreakpointOpcode>> {}
export interface ICallImpl extends InstructionImpl<IM<CallOpcode>> {}
export interface ICastImpl extends InstructionImpl<IM<CastOpcode>> {}
export interface IConstructImpl extends InstructionImpl<IM<ConstructOpcode>> {}
export interface IDropImpl extends InstructionImpl<IM<stack.DropOpcode>> {}
export interface IDupImpl extends InstructionImpl<IM<stack.DupOpcode>> {}
export interface IGetImpl extends InstructionImpl<IM<GetOpcode>> {}
export interface IHaltImpl extends InstructionImpl<IM<HaltOpcode>> {}
export interface IJeImpl extends InstructionImpl<IM<jump.JeOpcode>> {}
export interface IJumpImpl extends InstructionImpl<IM<jump.JumpOpcode>> {}
export interface IModifyOPImpl extends InstructionImpl<IM<ModifyOperandOpcode>> {}
export interface INopImpl extends InstructionImpl<IM<NopOpcode>> {}
export interface IPeekImpl extends InstructionImpl<IM<stack.PeekOpcode>> {}
export interface IPushGlobalObjectImpl extends InstructionImpl<IM<GlobalObjectOpcode>> {}
export interface IPushImpl extends InstructionImpl<IM<stack.PushOpcode>> {}
export interface IReturnImpl extends InstructionImpl<IM<general.ReturnOpcode>> {}
export interface IVMBlockTraceImpl extends InstructionImpl<IM<vm.BlockTraceOpcode>> {}
export interface IVMCallImpl extends InstructionImpl<IM<vm.CallOpcode>> {}
export interface IVMPushArgsImpl extends InstructionImpl<IM<push.ArgsOpcode>> {}
export interface IVMPushIPImpl extends InstructionImpl<IM<vm.PushIPOpcode>> {}
export interface IVMPushSelfImpl extends InstructionImpl<IM<VMPushSelfOpcode>> {}
export interface IVMReturnImpl extends InstructionImpl<IM<vm.ReturnOpcode>> {}

type i_type_test=InstanceType<IVMReturnImpl>;

type x_1=i_type_test['type'];

export type InstructionImplMap = {
	'append': IAppendImpl;
	'breakpoint': IBreakpointImpl;
	'call': ICallImpl;
	'cast': ICastImpl;
	'construct': IConstructImpl;
	'drop': IDropImpl;
	'dup': IDupImpl;
	'get': IGetImpl;
	'halt': IHaltImpl;
	'je': IJeImpl;
	'jmp': IJumpImpl;
	'modify_operand': IModifyOPImpl;
	'nop': INopImpl;
	'peek': IPeekImpl;
	'push_global_object': IPushGlobalObjectImpl;
	'push': IPushImpl;
	'return': IReturnImpl;
	'vm_block_trace': IVMBlockTraceImpl;
	'vm_call': IVMCallImpl;
	'vm_push_args': IVMPushArgsImpl;
	'vm_push_ip': IVMPushIPImpl;
	'vm_push_self': IVMPushSelfImpl;
	'vm_return': IVMReturnImpl;
}

export type InstructionOpcodesList = [
	append:AppendOpcode,
	breakpoint:debug.BreakpointOpcode,
	call:general.CallOpcode,
	cast:CastOpcode,
	construct:general.ConstructOpcode,
	drop:stack.DropOpcode,
	dup:stack.DupOpcode,
	get:general.GetOpcode,
	halt:turing.HaltOpcode,
	je:jump.JeOpcode,
	jump:jump.JumpOpcode,
	modify_op:ModifyOperandOpcode,
	nop:NopOpcode,
	peek:stack.PeekOpcode,
	push_global_object:push.GlobalObjectOpcode,
	push:stack.PushOpcode,
	return_x:general.ReturnOpcode,
	vm_block_trace:vm.BlockTraceOpcode,
	vm_call:vm.CallOpcode,
	vm_push_args:push.ArgsOpcode,
	vm_push_ip:vm.PushIPOpcode,
	vm_push_self:vm.PushSelfOpcode,
	vm_return:vm.ReturnOpcode,
];
export type Decode<T extends keyof InstructionImplMap> = [T, InstructionImplMap[T]];

export type DecodeArr<T extends (keyof InstructionImplMap)[]>=T extends [] ? [] : T extends [infer X, ...infer U] ? X extends keyof InstructionImplMap ? U extends (keyof InstructionImplMap)[] ? [Decode<X>, ...DecodeArr<U>] : [] : [] : [];