export class EventHandlerDispatch<T> {
	target_obj: T
	target_fn
	constructor(target_obj: T,target_fn: (this: T,event: Event) => void) {
		this.target_obj=target_obj
		this.target_fn=target_fn
	}
	do_handle_event(event: Event) {
		this.target_fn.call(this.target_obj,event)
	}
	handleEvent(v: Event) {
		this.do_handle_event(v)
	}
}
