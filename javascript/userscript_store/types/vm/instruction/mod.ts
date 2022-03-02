import {Append as Append, AppendOpcode} from "./Append";
import {Cast, CastOpcode as CastOpcode} from "./Cast";
import {ModifyOperand, ModifyOperandOpcode} from "./ModifyOperand";
import {Nop, NopOpcode} from "./Nop";
import * as debug from "./debug/mod";
import * as general from "./general/mod";
import * as jump from "./jump/mod";
import * as push from "./push/mod";
import * as stack from "./stack/mod";
import * as turing from "./turing/mod";
import * as vm from "./vm/mod";
import {StackVM} from "../StackVM";
import {GlobalObjectOpcode} from "./push/PushGlobalObject";
import {PushSelfOpcode as VMPushSelfOpcode} from "./vm/PushSelf";
import {CallOpcode} from "./general/Call";
import {ConstructOpcode} from "./general/Construct";
import {GetOpcode} from "./general/Get";
import {HaltOpcode} from "./turing/Halt";
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


export type InstructionType =
	Nop |
	// Stack
	stack.Push |
	stack.Dup |
	stack.Drop |
	stack.Peek |
	// FFI
	general.Get |
	general.Call |
	general.Construct |
	general.Return |
	// Jump
	jump.Jump |
	jump.Je |
	turing.Halt |
	// Push values
	push.Args |
	push.VMPushSelf |
	push.GlobalObject |
	// Debug
	debug.Breakpoint |
	// VM
	vm.Return |
	vm.Call |
	vm.PushIP |
	ModifyOperand |
	Append |
	Cast;

export interface InstructionImplObjCommon {
	run(vm: StackVM, _i: InstructionType): void;
}

interface InstructionImplObj<T, N> extends InstructionImplObjCommon {
	type:N;
	get_class_type?: () => T | null;
}

interface InstructionImpl<T extends [any, any]> {
	new(): InstructionImplObj<T[0], T[1]>;
}

type IM<T extends keyof InstructionImplMap>=[T, InstructionImplMap[T]];

interface AppendImpl extends InstructionImpl<IM<AppendOpcode>> {}
interface BreakpointImpl extends InstructionImpl<IM<debug.BreakpointOpcode>> {}
interface CallImpl extends InstructionImpl<IM<CallOpcode>> {}
interface CastImpl extends InstructionImpl<IM<CastOpcode>> {}
interface ConstructImpl extends InstructionImpl<IM<ConstructOpcode>> {}
interface DropImpl extends InstructionImpl<IM<stack.DropOpcode>> {}
interface DupImpl extends InstructionImpl<IM<stack.DupOpcode>> {}
interface GetImpl extends InstructionImpl<IM<GetOpcode>> {}
interface HaltImpl extends InstructionImpl<IM<HaltOpcode>> {}
interface JeImpl extends InstructionImpl<IM<jump.JeOpcode>> {}
interface JumpImpl extends InstructionImpl<IM<jump.JumpOpcode>> {}
interface ModifyOPImpl extends InstructionImpl<IM<ModifyOperandOpcode>> {}
interface NopImpl extends InstructionImpl<IM<NopOpcode>> {}
interface PeekImpl extends InstructionImpl<IM<stack.PeekOpcode>> {}
interface PushGlobalObjectImpl extends InstructionImpl<IM<GlobalObjectOpcode>> {}
interface PushImpl extends InstructionImpl<IM<stack.PushOpcode>> {}
interface ReturnImpl extends InstructionImpl<IM<general.ReturnOpcode>> {}
interface VMBlockTraceImpl extends InstructionImpl<IM<vm.BlockTraceOpcode>> {}
interface VMCallImpl extends InstructionImpl<IM<vm.CallOpcode>> {}
interface VMPushArgsImpl extends InstructionImpl<IM<push.ArgsOpcode>> {}
interface VMPushIPImpl extends InstructionImpl<IM<vm.PushIPOpcode>> {}
interface VMPushSelfImpl extends InstructionImpl<IM<VMPushSelfOpcode>> {}
interface VMReturnImpl extends InstructionImpl<IM<vm.ReturnOpcode>> {}


export type InstructionImplMap = {
	'append': AppendImpl;
	'breakpoint': BreakpointImpl;
	'call': CallImpl;
	'cast': CastImpl;
	'construct': ConstructImpl;
	'drop': DropImpl;
	'dup': DupImpl;
	'get': GetImpl;
	'halt': HaltImpl;
	'je': JeImpl;
	'jmp': JumpImpl;
	'modify_operand': ModifyOPImpl;
	'nop': NopImpl;
	'peek': PeekImpl;
	'push_global_object': PushGlobalObjectImpl;
	'push': PushImpl;
	'return': ReturnImpl;
	'vm_push_args': VMPushArgsImpl;
	'vm_push_self': VMPushSelfImpl;
	'vm_push_ip': VMPushIPImpl;
	'vm_block_trace': VMBlockTraceImpl;
	'vm_call': VMCallImpl;
	'vm_return': VMReturnImpl;
}

export type InstructionOpcodesList = [
	AppendOpcode,
	CallOpcode,
	CastOpcode,
	ConstructOpcode,
	debug.BreakpointOpcode,
	general.ReturnOpcode,
	GetOpcode,
	turing.HaltOpcode,
	jump.JeOpcode,
	jump.JumpOpcode,
	ModifyOperandOpcode,
	NopOpcode,
	push.ArgsOpcode,
	push.GlobalObjectOpcode,
	stack.DropOpcode,
	stack.DupOpcode,
	stack.PeekOpcode,
	stack.PushOpcode,
	vm.BlockTraceOpcode,
	vm.CallOpcode,
	vm.PushIPOpcode,
	vm.PushSelfOpcode,
	vm.ReturnOpcode,
];
type kt=InstructionImplMap[InstructionOpcodesList[number]];
export type Decode<T extends keyof InstructionImplMap> = [T, InstructionImplMap[T]];