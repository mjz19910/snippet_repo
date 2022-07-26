import {SimpleStackVM} from "./simple_stack_vm.mjs"
class EventHandlerVMDispatch extends SimpleStackVM {
	constructor(instructions,target_obj) {
		super(instructions)
		this.target_obj=target_obj
	}
	handleEvent(event) {
		this.reset()
		this.run(event)
	}
}
const test_obj={
	background_audio: {
		play() {
			console.log('test success')
		}
	}
}
const handler_test=new EventHandlerVMDispatch([
	['this'],
	['push','target_obj'],
	['get'],
	['push','background_audio'],
	['get'],
	['push','play'],
	['call',0],
	['drop']
],test_obj)
handler_test.handleEvent({})