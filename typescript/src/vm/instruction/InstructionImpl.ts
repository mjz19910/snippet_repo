import {InstructionImplMap} from "./InstructionImplMap.js";
import {InstructionImplObj} from "./InstructionImplObj.js";
import {InstructionMap} from "./InstructionMap.js";
import {AppendOpcode} from "./opcodes/AppendOpcode.js";
import {BreakpointOpcode} from "./opcodes/BreakpointOpcode.js";
import {CallOpcode} from "./opcodes/CallOpcode.js";
import {CastOpcode} from "./opcodes/CastOpcode.js";
import {ConstructOpcode} from "./opcodes/ConstructOpcode.js";
import {DropOpcode} from "./opcodes/DropOpcode.js";
import {DupOpcode} from "./opcodes/DupOpcode.js";
import {GetOpcode} from "./opcodes/GetOpcode.js";
import {HaltOpcode} from "./opcodes/HaltOpcode.js";
import {JeOpcode} from "./opcodes/JeOpcode.js";
import {JumpOpcode} from "./opcodes/JumpOpcode.js";
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode.js";
import {NopOpcode} from "./opcodes/NopOpcode.js";
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode.js";
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode.js";
import {VMPushArgsOpcode} from "./opcodes/VMPushArgsOpcode.js";
import {PeekOpcode} from "./opcodes/PeekOpcode.js";
import {PushOpcode} from "./opcodes/PushOpcode.js";
import {ReturnOpcode} from "./opcodes/ReturnOpcode.js";
import {VMBlockTraceOpcode} from "./opcodes/VMBlockTraceOpcode.js";
import {VMCallOpcode} from "./opcodes/VMCallOpcode.js";
import {VMPushIPOpcode} from "./opcodes/VMPushIPOpcode.js";
import {VMReturnOpcode} from "./opcodes/VMReturnOpcode.js";

export interface InstructionImpl<T extends keyof InstructionImplMap> {
	new(): InstructionImplObj<T,InstructionImplMap[T],InstructionMap[T]>;
	instruction_type(): InstructionMap[T]
}

export interface IAppendImpl extends InstructionImpl<AppendOpcode> {}
export interface IBreakpointImpl extends InstructionImpl<BreakpointOpcode> {}
export interface ICallImpl extends InstructionImpl<CallOpcode> {}
export interface ICastImpl extends InstructionImpl<CastOpcode> {}
export interface IConstructImpl extends InstructionImpl<ConstructOpcode> {}
export interface IDropImpl extends InstructionImpl<DropOpcode> {}
export interface IDupImpl extends InstructionImpl<DupOpcode> {}
export interface IGetImpl extends InstructionImpl<GetOpcode> {}
export interface IHaltImpl extends InstructionImpl<HaltOpcode> {}
export interface IJeImpl extends InstructionImpl<JeOpcode> {}
export interface IJumpImpl extends InstructionImpl<JumpOpcode> {}
export interface IModifyOPImpl extends InstructionImpl<ModifyOperandOpcode> {}
export interface INopImpl extends InstructionImpl<NopOpcode> {}
export interface IPeekImpl extends InstructionImpl<PeekOpcode> {}
export interface IPushWindowObjectImpl extends InstructionImpl<PushWindowObjectOpcode> {}
export interface IPushImpl extends InstructionImpl<PushOpcode> {}
export interface IReturnImpl extends InstructionImpl<ReturnOpcode> {}
export interface IVMBlockTraceImpl extends InstructionImpl<VMBlockTraceOpcode> {}
export interface IVMCallImpl extends InstructionImpl<VMCallOpcode> {}
export interface IVMPushArgsImpl extends InstructionImpl<VMPushArgsOpcode> {}
export interface IVMPushIPImpl extends InstructionImpl<VMPushIPOpcode> {}
export interface IVMPushSelfImpl extends InstructionImpl<VMPushSelfOpcode> {}
export interface IVMReturnImpl extends InstructionImpl<VMReturnOpcode> {}
