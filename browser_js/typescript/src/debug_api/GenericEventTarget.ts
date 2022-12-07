import {EventListenerValue} from "./EventListenerValue.js"
import {GenericEvent} from "./GenericEvent.js"

export class GenericEventTarget {
	_events: Map<string,EventListenerValue[]>
	constructor() {
		this._events=new Map
	}
	addEventListener(type: string,callback: any,options: boolean|AddEventListenerOptions): void {
		let cur_event_vec=this._events.get(type)
		if(!cur_event_vec) {
			cur_event_vec=[]
			this._events.set(type,cur_event_vec)
		}
		cur_event_vec.push(new EventListenerValue(callback,options))
	}
	removeEventListener(type: string,callback: any,options: boolean|AddEventListenerOptions) {
		let cur_event_vec=this._events.get(type)
		if(!cur_event_vec)
			return
		if(cur_event_vec.length==0)
			return
		for(let i=cur_event_vec.length-1;i>=0;i--) {
			let cur=cur_event_vec[i]
			if(cur.callback!==callback)
				continue
			if(cur.options!==options)
				continue
			cur.callback=null
			cur_event_vec.splice(i,1)
		}
	}
	dispatchEvent(event: GenericEvent) {
		let event_type=event.type
		let cur_event_vec=this._events.get(event_type)
		if(!cur_event_vec)
			return false
		let cur_event_vec_owned=cur_event_vec.slice()
		let can_handle=false
		for(let i=0;i<cur_event_vec_owned.length;i++) {
			let cur=cur_event_vec_owned[i]
			let callback=cur.callback
			if(callback===null)
				continue
			if(typeof callback==='function') {
				callback(event)
				can_handle=true
				continue
			}
			if(callback.handleEvent&&typeof callback.handleEvent==='function') {
				callback.handleEvent(event)
				can_handle=true
			}
		}
		return can_handle
	}
}
