import {InstructionImplMap} from "./InstructionImplMap.js";
import {InstructionImplObj} from "./InstructionImplObj.js";
import {InstructionMap} from "./InstructionMap.js";
import {Je} from "./jump/Je.js";
import {Jump} from "./jump/Jump.js";
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
import {Drop} from "./stack/Drop.js";
import {Dup} from "./stack/Dup.js";
import {VMPushArgs} from "./vm/VMPushArgs.js";
import {VMPushArgsOpcode} from "./opcodes/VMPushArgsOpcode.js";
import {VMReturn} from "./vm/VMReturn.js";
import {PeekOpcode} from "./opcodes/PeekOpcode.js";
import {PushOpcode} from "./opcodes/PushOpcode.js";
import {ReturnOpcode} from "./opcodes/ReturnOpcode.js";
import {VMBlockTraceOpcode} from "./opcodes/VMBlockTraceOpcode.js";
import {VMCallOpcode} from "./opcodes/VMCallOpcode.js";
import {VMPushIPOpcode} from "./opcodes/VMPushIPOpcode.js";
import {VMReturnOpcode} from "./opcodes/VMReturnOpcode.js";
import {VMBlockTrace} from "./vm/VMBlockTrace.js";
import {Return} from "./general/Return.js";
import {Push} from "./stack/Push.js";
import {PushWindowObject} from "./push/WindowObject.js";
import {Peek} from "./stack/Peek.js";
import {Nop} from "./Nop.js";
import {ModifyOperand} from "./ModifyOperand.js";
import {Append} from "./Append.js";
import {Breakpoint} from "./debug/Breakpoint.js";
import {Call} from "./general/Call.js";
import {Cast} from "./Cast.js";
import {Construct} from "./general/Construct.js";
import {Get} from "./general/Get.js";
import {Halt} from "./turing/Halt.js";
import {VMCall} from "./vm/VMCall.js";

export interface InstructionImpl<T extends keyof InstructionImplMap> {
	new(): InstructionImplObj<T,InstructionImplMap[T],InstructionMap[T]>;
}

export interface IAppendImpl extends InstructionImpl<AppendOpcode> {new(): this,instruction_type(): Append;}
export interface IBreakpointImpl extends InstructionImpl<BreakpointOpcode> {new(): this,instruction_type(): Breakpoint;}
export interface ICallImpl extends InstructionImpl<CallOpcode> {new(): this,instruction_type(): Call;}
export interface ICastImpl extends InstructionImpl<CastOpcode> {new(): this,instruction_type(): Cast;}
export interface IConstructImpl extends InstructionImpl<ConstructOpcode> {new(): this,instruction_type(): Construct;}
export interface IDropImpl extends InstructionImpl<DropOpcode> {new(): this,instruction_type(): Drop;}
export interface IDupImpl extends InstructionImpl<DupOpcode> {new(): this,instruction_type(): Dup;}
export interface IGetImpl extends InstructionImpl<GetOpcode> {new(): this,instruction_type(): Get;}
export interface IHaltImpl extends InstructionImpl<HaltOpcode> {new(): this,instruction_type(): Halt;}
export interface IJeImpl extends InstructionImpl<JeOpcode> {new(): this,instruction_type(): Je;}
export interface IJumpImpl extends InstructionImpl<JumpOpcode> {new(): this,instruction_type(): Jump;}
export interface IModifyOPImpl extends InstructionImpl<ModifyOperandOpcode> {new(): this,instruction_type(): ModifyOperand;}
export interface INopImpl extends InstructionImpl<NopOpcode> {new(): this,instruction_type(): Nop;}
export interface IPeekImpl extends InstructionImpl<PeekOpcode> {new(): this,instruction_type(): Peek;}
export interface IPushWindowObjectImpl extends InstructionImpl<PushWindowObjectOpcode> {new(): this,instruction_type(): PushWindowObject;}
export interface IPushImpl extends InstructionImpl<PushOpcode> {new(): this,instruction_type(): Push;}
export interface IReturnImpl extends InstructionImpl<ReturnOpcode> {new(): this,instruction_type(): Return;}
export interface IVMBlockTraceImpl extends InstructionImpl<VMBlockTraceOpcode> {new(): this,instruction_type(): VMBlockTrace;}
export interface IVMCallImpl extends InstructionImpl<VMCallOpcode> {new(): this,instruction_type(): VMCall;}
export interface IVMPushArgsImpl extends InstructionImpl<VMPushArgsOpcode> {new(): this,instruction_type(): VMPushArgs;}
export interface IVMPushIPImpl extends InstructionImpl<VMPushIPOpcode> {new(): this,instruction_type(): VMPushArgs;}
export interface IVMPushSelfImpl extends InstructionImpl<VMPushSelfOpcode> {new(): this,instruction_type(): VMPushArgs;}
export interface IVMReturnImpl extends InstructionImpl<VMReturnOpcode> {new(): this,instruction_type(): VMReturn;}
