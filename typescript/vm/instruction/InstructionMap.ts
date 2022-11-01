import {Append} from "./Append.ts"
import {Cast} from "./Cast.ts"
import {Breakpoint} from "./debug/Breakpoint.ts"
import {Call} from "./general/Call.ts"
import {Construct} from "./general/Construct.ts"
import {Get} from "./general/Get.ts"
import {Return} from "./general/Return.ts"
import {Je} from "./jump/Je.ts"
import {Jump} from "./jump/Jump.ts"
import {ModifyOperand} from "./ModifyOperand.ts"
import {Nop} from "./Nop.ts"
import {PushWindowObject} from "./push/WindowObject.ts"
import {Drop} from "./stack/Drop.ts"
import {Dup} from "./stack/Dup.ts"
import {Peek} from "./stack/Peek.ts"
import {Push} from "./stack/Push.ts"
import {Halt} from "./turing/Halt.ts"
import {VMBlockTrace} from "./vm/VMBlockTrace.ts"
import {VMCall} from "./vm/VMCall.ts"
import {VMPushArgs} from "./vm/VMPushArgs.ts"
import {VMPushIP} from "./vm/VMPushIP.ts"
import {VMPushSelf} from "./vm/VMPushSelf.ts"
import {VMReturn} from "./vm/VMReturn.ts"

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
	'vm_push_args': VMPushArgs
	'vm_push_ip': VMPushIP
	'vm_push_self': VMPushSelf
	'vm_return': VMReturn
}
