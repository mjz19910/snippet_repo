import {VMCallOpcode} from "../opcodes/VMCallOpcode"
import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode"
import {PushIPOpcode} from "../opcodes/VMPushIPOpcode"
import {PushSelfOpcode} from "../opcodes/VMPushSelfOpcode"
import {ReturnOpcode} from "../opcodes/VMReturnOpcode"
import {VMCall} from "./VMCall"
import {PushIP} from "./VMPushIP"
import {Return} from "./VMReturn"
import {BlockTrace} from "./VMBlockTrace"
import {PushSelf} from "./VMPushSelf"

export {
	VMCallOpcode as VMCallOpcode,
	VMBlockTraceOpcode as BlockTraceOpcode,
	PushIPOpcode,
	PushSelfOpcode,
	ReturnOpcode,
	VMCall as VMCall,
	PushIP,
	Return,
	BlockTrace,
	PushSelf
}