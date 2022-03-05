import {Args} from "./Args";
import {ArgsOpcode} from "../opcodes/ArgsOpcode";
import {PushWindowObject as PushWindowObject} from "./WindowObject";
import {PushWindowObjectOpcode} from "../opcodes/PushWindowObjectOpcode";
import {PushSelf as VMPushSelf} from "../vm/VMPushSelf";
import {PushSelfOpcode as VMPushSelfOpcode} from "../opcodes/VMPushSelfOpcode";
export {
	Args,
	ArgsOpcode,
	VMPushSelf,
	VMPushSelfOpcode,
	PushWindowObject as WindowObject,
	PushWindowObjectOpcode as PushWindowObjectOpcode
}
