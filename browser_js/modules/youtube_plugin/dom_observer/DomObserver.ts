import {CustomEventTarget} from "./CustomEventTarget.js";

export class DomObserver extends CustomEventTarget {
	override trace=false;
	next_tick_action(port: MessagePort,message_id: number) {
		if(this.trace) console.log("trace_id_"+message_id+":continue");
		port.postMessage(message_id);
	}
}
