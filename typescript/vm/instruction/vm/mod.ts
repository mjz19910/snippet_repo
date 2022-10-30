import {VMCallOpcode} from "../opcodes/VMCallOpcode"
import {VMBlockTraceOpcode} from "../opcodes/VMBlockTraceOpcode"
import {VMPushIPOpcode} from "../opcodes/VMPushIPOpcode"
import {VMPushSelfOpcode} from "../opcodes/VMPushSelfOpcode"
import {VMReturnOpcode} from "../opcodes/VMReturnOpcode"
import {VMCall} from "./VMCall"
import {VMPushIP} from "./VMPushIP"
import {VMReturn} from "./VMReturn"
import {VMBlockTrace} from "./VMBlockTrace"
import {VMPushSelf as VMPushSelf} from "./VMPushSelf"

export {
	VMBlockTrace,VMBlockTraceOpcode,
	VMCall,VMCallOpcode,
	VMPushIP,VMPushIPOpcode,
	VMPushSelf,VMPushSelfOpcode,
	VMReturn,VMReturnOpcode,
}
