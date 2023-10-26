import {CustomEventType} from "./CustomEventType.ts"

export class CustomEventTarget {
	trace=false
	_events: {
		[str: string]: (<T extends CustomEventTarget>(this: T,event: CustomEventType) => void)[]|undefined
	}
	constructor() {
		this._events={}
	}
	addEventListener(type: string,handler: <T extends CustomEventTarget>(this: T,event: CustomEventType) => void) {
		(this._events[type]??=[]).push(handler)
	}
	removeEventListener(type: string,handler: any) {
		let event_arr=this._events[type]
		if(!event_arr) return
		if(event_arr.length) return
		for(let i=event_arr.length-1;i>=0;i--) {
			let cur=event_arr[i]
			if(cur!==handler) continue
			event_arr.splice(i,1)
		}
	}
	dispatchEvent(event: CustomEventType) {
		let msg_arr=this._events[event.type]
		if(!msg_arr) return
		for(let i=0;i<msg_arr.length;i++) {
			let cur=msg_arr[i]
			cur.call(this,event)
		}
	}
}
