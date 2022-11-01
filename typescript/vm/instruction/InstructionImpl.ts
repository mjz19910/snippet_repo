import {CSSStyleSheetConstructorBox} from "../../box/CSSStyleSheetConstructorBox.ts"
import {InstructionImplMap} from "./InstructionImplMap.ts"
import {InstructionImplObj} from "./InstructionImplObj.ts"
import {InstructionMap} from "./InstructionMap.ts"
import { Je } from "./jump/Je.ts"
import { Jump } from "./jump/Jump.ts"
import {AppendOpcode} from "./opcodes/AppendOpcode.ts"
import {BreakpointOpcode} from "./opcodes/BreakpointOpcode.ts"
import {CallOpcode} from "./opcodes/CallOpcode.ts"
import {CastOpcode} from "./opcodes/CastOpcode.ts"
import {ConstructOpcode} from "./opcodes/ConstructOpcode.ts"
import { DropOpcode } from "./opcodes/DropOpcode.ts"
import { DupOpcode } from "./opcodes/DupOpcode.ts"
import {GetOpcode} from "./opcodes/GetOpcode.ts"
import {HaltOpcode} from "./opcodes/HaltOpcode.ts"
import { JeOpcode } from "./opcodes/JeOpcode.ts"
import { JumpOpcode } from "./opcodes/JumpOpcode.ts"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode.ts"
import {NopOpcode} from "./opcodes/NopOpcode.ts"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode.ts"
import {VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode.ts"
import { Drop } from "./stack/Drop.ts"
import { Dup } from "./stack/Dup.ts"
import { VMPushArgs } from "./vm/VMPushArgs.ts"
import { VMPushArgsOpcode } from "./vm/VMPushArgsOpcode";
import { VMReturn } from "./vm/VMReturn.ts"

export interface InstructionImpl<T extends keyof InstructionMap> {
	new(): InstructionImplObj<T,InstructionImplMap[T],InstructionMap[T]>
}

export interface IAppendImpl extends InstructionImpl<AppendOpcode> {new(): this}
export interface IBreakpointImpl extends InstructionImpl<BreakpointOpcode> {new(): this}
export interface ICallImpl extends InstructionImpl<CallOpcode> {new(): this}
export interface ICastImpl extends InstructionImpl<CastOpcode> {new(): this}
export interface IConstructImpl extends InstructionImpl<ConstructOpcode> {new(): this}
export interface IDropImpl extends InstructionImpl<DropOpcode> {new(): this, instruction_type(): Drop}
export interface IDupImpl extends InstructionImpl<DupOpcode> {new(): this, instruction_type(): Dup}
export interface IGetImpl extends InstructionImpl<GetOpcode> {new(): this}
export interface IHaltImpl extends InstructionImpl<HaltOpcode> {new(): this}
export interface IJeImpl extends InstructionImpl<JeOpcode> {new(): this, instruction_type(): Je}
export interface IJumpImpl extends InstructionImpl<JumpOpcode> {new(): this, instruction_type(): Jump}
export interface IModifyOPImpl extends InstructionImpl<ModifyOperandOpcode> {new(): this}
export interface INopImpl extends InstructionImpl<NopOpcode> {new(): this}
export interface IPeekImpl extends InstructionImpl<PeekOpcode> {new(): this, instruction_type(): Jump}
export interface IPushWindowObjectImpl extends InstructionImpl<PushWindowObjectOpcode> {new(): this}
export interface IPushImpl extends InstructionImpl<PushOpcode> {new(): this, instruction_type(): Jump}
export interface IReturnImpl extends InstructionImpl<ReturnOpcode> {new(): this, instruction_type(): Jump}
export interface IVMBlockTraceImpl extends InstructionImpl<VMBlockTraceOpcode> {new(): this, instruction_type(): Jump}
export interface IVMCallImpl extends InstructionImpl<VMCallOpcode> {new(): this}
export interface IVMPushArgsImpl extends InstructionImpl<VMPushArgsOpcode> {new(): this, instruction_type(): VMPushArgs}
export interface IVMPushIPImpl extends InstructionImpl<VMPushIPOpcode> {new(): this, instruction_type(): VMPushArgs}
export interface IVMPushSelfImpl extends InstructionImpl<VMPushSelfOpcode> {new(): this, instruction_type(): VMPushArgs}
export interface IVMReturnImpl extends InstructionImpl<VMReturnOpcode> {new(): this, instruction_type(): VMReturn}
