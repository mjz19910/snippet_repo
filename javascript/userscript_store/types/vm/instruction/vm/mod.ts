import {VMCallOpcode} from "../opcodes/VMCallOpcode";
import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode";
import {PushIPOpcode} from "../opcodes/VMPushIPOpcode";
import {PushSelfOpcode} from "../opcodes/VMPushSelfOpcode";
import {ReturnOpcode} from "../opcodes/VMReturnOpcode";
import {Call} from "./VMCall";
import {PushIP} from "./VMPushIP";
import {Return} from "./VMReturn";
import {BlockTrace} from "./VMBlockTrace";
import {PushSelf} from "./VMPushSelf";

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