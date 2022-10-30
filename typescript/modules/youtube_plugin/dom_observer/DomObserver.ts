import {CustomEventTarget} from "./CustomEventTarget"

export class DomObserver extends CustomEventTarget {
	trace=false
	/**@arg {MessagePort} port @arg {number} message_id */
	next_tick_action(port:MessagePort,message_id:number) {
		if(this.trace) console.log("trace_id_"+message_id+":continue")
		port.postMessage(message_id)
	}
}
