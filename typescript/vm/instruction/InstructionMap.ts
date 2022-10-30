import {Append} from "./Append"
import {Cast} from "./Cast"
import {Breakpoint} from "./debug/Breakpoint"
import {Call} from "./general/Call"
import {Construct} from "./general/Construct"
import {Get} from "./general/Get"
import {Return} from "./general/Return"
import {Je} from "./jump/Je"
import {Jump} from "./jump/Jump"
import {ModifyOperand} from "./ModifyOperand"
import {Nop} from "./Nop"
import {PushWindowObject} from "./PushWindowObject"
import {Drop} from "./stack/Drop"
import {Dup} from "./stack/Dup"
import {Peek} from "./stack/Peek"
import {Push} from "./stack/Push"
import {Halt} from "./turing/Halt"
import {VMBlockTrace} from "./vm/VMBlockTrace"
import {VMCall} from "./vm/VMCall"
import {VMPushIP} from "./vm/VMPushIP"
import {VMPushSelf} from "./vm/VMPushSelf"
import {VMReturn} from "./vm/VMReturn"


export type InstructionMap={
	'append': Append
	'breakpoint': Breakpoint
	'call': Call
	'cast': Cast
	'construct': Construct
	'drop': Drop
	'dup': Dup
	'get': Get
	'halt': Halt
	'je': Je
	'jmp': Jump
	'modify_operand': ModifyOperand
	'nop': Nop
	'peek': Peek
	'push_window_object': PushWindowObject
	'push': Push
	'return': Return
	'vm_block_trace': VMBlockTrace
	'vm_call': VMCall
	'vm_push_ip': VMPushIP
	'vm_push_self': VMPushSelf
	'vm_return': VMReturn
}
