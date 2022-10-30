import {AppendOpcode} from "./opcodes/AppendOpcode"
import {CallOpcode} from "./opcodes/CallOpcode"
import {CastOpcode} from "./opcodes/CastOpcode"
import {ConstructOpcode} from "./opcodes/ConstructOpcode"
import {GetOpcode} from "./opcodes/GetOpcode"
import {PushWindowObjectOpcode} from "./opcodes/PushWindowObjectOpcode"
import {HaltOpcode} from "./opcodes/HaltOpcode"
import {ModifyOperandOpcode} from "./opcodes/ModifyOperandOpcode"
import {NopOpcode} from "./opcodes/NopOpcode"
import {VMPushSelfOpcode as VMPushSelfOpcode} from "./opcodes/VMPushSelfOpcode"
import * as debug from "./debug/mod"
import * as general from "./general/mod"
import * as jump from "./jump/mod"
import * as push from "./push/mod"
import * as stack from "./stack/mod"
import * as vm from "./vm/mod"
import {InstructionImpl} from "./InstructionImpl"
import {InstructionMapGet} from "./InstructionMapGet"
import {PushWindowObject} from "./PushWindowObject"

export {
	PushWindowObject as PushWindowObject,
	debug,
	general,
	jump,
	push,
	stack,
	vm,
}
