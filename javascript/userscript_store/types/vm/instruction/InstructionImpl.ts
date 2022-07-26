import {InstructionImplObj} from "./InstructionImplObj"
import {InstructionMapGet} from "./InstructionMapGet"
import {debug, general, jump, push, stack, vm} from "./mod"
import {AppendOpcode} from "./opcodes/AppendOpcode"
import {CallOpcode} from "./opcodes/CallOpcode"
import {CastOpcode} from "./opcodes/CastOpcode"
import {ConstructOpcode} from "./opcodes/ConstructOpcode"
import {GetOpcode} from "./opcodes/GetOpcode"
import {HaltOpcode} from "./opcodes/HaltOpcode"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode"
import {NopOpcode} from "./opcodes/NopOpcode"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode"

export interface InstructionImpl<T extends [string,any,any]> {
	new(): InstructionImplObj<T[0],T[1],T[2]>
}

export interface IAppendImpl extends InstructionImpl<InstructionMapGet<AppendOpcode>> {}
export interface IBreakpointImpl extends InstructionImpl<InstructionMapGet<debug.BreakpointOpcode>> {}
export interface ICallImpl extends InstructionImpl<InstructionMapGet<CallOpcode>> {}
export interface ICastImpl extends InstructionImpl<InstructionMapGet<CastOpcode>> {}
export interface IConstructImpl extends InstructionImpl<InstructionMapGet<ConstructOpcode>> {}
export interface IDropImpl extends InstructionImpl<InstructionMapGet<stack.DropOpcode>> {}
export interface IDupImpl extends InstructionImpl<InstructionMapGet<stack.DupOpcode>> {}
export interface IGetImpl extends InstructionImpl<InstructionMapGet<GetOpcode>> {}
export interface IHaltImpl extends InstructionImpl<InstructionMapGet<HaltOpcode>> {}
export interface IJeImpl extends InstructionImpl<InstructionMapGet<jump.JeOpcode>> {}
export interface IJumpImpl extends InstructionImpl<InstructionMapGet<jump.JumpOpcode>> {}
export interface IModifyOPImpl extends InstructionImpl<InstructionMapGet<ModifyOperandOpcode>> {}
export interface INopImpl extends InstructionImpl<InstructionMapGet<NopOpcode>> {}
export interface IPeekImpl extends InstructionImpl<InstructionMapGet<stack.PeekOpcode>> {}
export interface IPushWindowObjectImpl extends InstructionImpl<InstructionMapGet<PushWindowObjectOpcode>> {}
export interface IPushImpl extends InstructionImpl<InstructionMapGet<stack.PushOpcode>> {}
export interface IReturnImpl extends InstructionImpl<InstructionMapGet<general.ReturnOpcode>> {}
export interface IVMBlockTraceImpl extends InstructionImpl<InstructionMapGet<vm.VMBlockTraceOpcode>> {}
export interface IVMCallImpl extends InstructionImpl<InstructionMapGet<vm.VMCallOpcode>> {}
export interface IVMPushArgsImpl extends InstructionImpl<InstructionMapGet<push.ArgsOpcode>> {}
export interface IVMPushIPImpl extends InstructionImpl<InstructionMapGet<vm.VMPushIPOpcode>> {}
export interface IVMPushSelfImpl extends InstructionImpl<InstructionMapGet<VMPushSelfOpcode>> {}
export interface IVMReturnImpl extends InstructionImpl<InstructionMapGet<vm.VMReturnOpcode>> {}
