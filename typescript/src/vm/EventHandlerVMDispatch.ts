import {InstructionType} from "./instruction/InstructionType.js"
import {AutoBuyInterface} from "./AutoBuyInterface.js"
import {SimpleStackVM} from "./SimpleStackVM.js"

export class EventHandlerVMDispatch extends SimpleStackVM<Event> {
	target_obj
	constructor(instructions: InstructionType[],target_obj: AutoBuyInterface) {
		super(instructions)
		this.target_obj=target_obj
	}
	handleEvent(event: Event) {
		this.reset()
		this.run(event)
	}
}
