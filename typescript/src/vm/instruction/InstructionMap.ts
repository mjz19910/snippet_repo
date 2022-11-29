import {Append} from "./Append.js"
import {Cast} from "./Cast.js"
import {Breakpoint} from "./debug/Breakpoint.js"
import {DomExec} from "./dom/DomExec";
import {DomPeek} from "./dom/DomPeek";
import {Call} from "./general/Call.js"
import {Construct} from "./general/Construct.js"
import {Get} from "./general/Get.js"
import {Return} from "./general/Return.js"
import {Je} from "./jump/Je.js"
import {Jump} from "./jump/Jump.js"
import {ModifyOperand} from "./ModifyOperand.js"
import {Nop} from "./Nop.js"
import {PushWindowObject} from "./push/WindowObject.js"
import {Drop} from "./stack/Drop.js"
import {Dup} from "./stack/Dup.js"
import {Peek} from "./stack/Peek.js"
import {Push} from "./stack/Push.js"
import {Halt} from "./turing/Halt.js"
import {VMBlockTrace} from "./vm/VMBlockTrace.js"
import {VMCall} from "./vm/VMCall.js"
import {VMPushArgs} from "./vm/VMPushArgs.js"
import {VMPushIP} from "./vm/VMPushIP.js"
import {VMPushSelf} from "./vm/VMPushSelf.js"
import {VMReturn} from "./vm/VMReturn.js"

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
	'dom_exec': DomExec
	'dom_peek': DomPeek
}
