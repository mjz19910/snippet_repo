import {Args} from "./Args"
import {ArgsOpcode} from "../opcodes/ArgsOpcode"
import {PushWindowObject as PushWindowObject} from "./WindowObject"
import {PushWindowObjectOpcode} from "../opcodes/PushWindowObjectOpcode"
import {VMPushSelf as VMPushSelf} from "../vm/VMPushSelf"
import {VMPushSelfOpcode as VMPushSelfOpcode} from "../opcodes/VMPushSelfOpcode"

export {
	Args,
	ArgsOpcode,
	VMPushSelf,
	VMPushSelfOpcode,
	PushWindowObject as WindowObject,
	PushWindowObjectOpcode as PushWindowObjectOpcode
}
