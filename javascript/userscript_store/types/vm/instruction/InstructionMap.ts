import {Append} from "./Append"
import {Cast} from "./Cast"
import {ModifyOperand} from "./ModifyOperand"
import {Nop} from "./Nop"
import * as debug from "./debug/mod"
import * as general from "./general/mod"
import * as jump from "./jump/mod"
import * as push from "./push/mod"
import * as stack from "./stack/mod"
import * as turing from "./turing/mod"
import * as vm from "./vm/mod"


export type InstructionMap={
	'append': Append
	'breakpoint': debug.Breakpoint
	'call': general.Call
	'cast': Cast
	'construct': general.Construct
	'drop': stack.Drop
	'dup': stack.Dup
	'get': general.Get
	'halt': turing.Halt
	'je': jump.Je
	'jmp': jump.Jump
	'modify_operand': ModifyOperand
	'nop': Nop
	'peek': stack.Peek
	'push_window_object': push.WindowObject
	'push': stack.Push
	'return': general.Return
	'vm_block_trace': vm.VMBlockTrace
	'vm_call': vm.VMCall
	'vm_push_args': push.Args
	'vm_push_ip': vm.VMPushIP
	'vm_push_self': push.VMPushSelf
	'vm_return': vm.VMReturn
}
