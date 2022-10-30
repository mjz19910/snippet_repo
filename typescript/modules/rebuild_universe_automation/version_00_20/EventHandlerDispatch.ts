export class EventHandlerDispatch {
	target_obj
	target_name
	constructor(target_obj: {[x: string]: any},target_name: string) {
		this.target_obj=target_obj
		this.target_name=target_name
	}
	handleEvent(event: Event) {
		this.target_obj[this.target_name](event)
	}
}
