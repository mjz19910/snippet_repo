// deno-lint-ignore-file
export class SimpleEventTarget {
	_events: {[str: string]: any}
	constructor() {
		this._events={}
	}
	dispatchEvent(ev: {type: any; data?: {type: any; data: any[]}}) {
		let evt=this._events[ev.type].slice()
		if(evt===undefined)
			return
		for(let i=0;i<evt.length;i++) {
			let hnd=evt[i]
			if(hnd.disposed)
				continue
			let handler=hnd.handler
			handler(ev)
		}
	}
	removeEventListener(ev_name: string|number,fn: any) {
		let evt=this._events[ev_name]
		if(evt===undefined)
			return
		for(let i=0;i<evt.length;i++) {
			let ce=evt[i]
			if(!ce.disposed&&ce.handler===fn) {
				evt.splice(i,1)
				i-=1
			}
		}
	}
	addEventListener(ev_name: string,fn: (event: {data: {type: any; data: [any,any,any]}}) => void) {
		(this._events[ev_name]??=[]).push({disposed: false,handler: fn})
	}
}
