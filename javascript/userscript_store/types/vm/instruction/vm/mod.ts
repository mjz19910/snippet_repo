import {VMCallOpcode} from "../opcodes/VMCallOpcode";
import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode";
import {PushIPOpcode} from "../opcodes/VMPushIPOpcode";
import {PushSelfOpcode} from "../opcodes/VMPushSelfOpcode";
import {ReturnOpcode} from "../opcodes/VMReturnOpcode";
import {Call} from "./Call";
import {PushIP} from "./PushIP";
import {Return} from "./Return";
import {BlockTrace} from "./BlockTrace";
import {PushSelf} from "./PushSelf";

export {
	VMCallOpcode as CallOpcode,
	VMBlockTraceOpcode as BlockTraceOpcode,
	PushIPOpcode,
	PushSelfOpcode,
	ReturnOpcode,
	Call,
	PushIP,
	Return,
	BlockTrace,
	PushSelf
};