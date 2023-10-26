import {CustomEventTarget} from "./CustomEventTarget.ts"

export function dom_observer_next_tick_action(observer: CustomEventTarget,port: MessagePort,message_id: number) {
	if(observer.trace) console.log("trace_id_"+message_id+":continue")
	port.postMessage(message_id)
}
