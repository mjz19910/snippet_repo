import {ObjectBox} from "../../../box/ObjectBox.js"
import {InstructionType} from "../../../vm/instruction/InstructionType.js"
import {SimpleStackVM} from "./SimpleStackVM.js"

export class EventHandlerVMDispatch extends SimpleStackVM {
	target_obj: any
	constructor(instructions: InstructionType[],target_obj: any) {
		super(instructions)
		this.target_obj=target_obj
	}
	handleEvent(event: Event) {
		this.reset()
		this.run(new ObjectBox(event))
	}
}
