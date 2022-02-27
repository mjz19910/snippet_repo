export class EventHandlerDispatch<T, U> {
	target_obj;
	target_fn;
	constructor(target_obj: U, target_fn: (_event: T) => void) {
		this.target_obj = target_obj;
		this.target_fn = target_fn;
	}
	handleEvent(event: T) {
		this.target_fn.call(this.target_obj, event);
	}
}
