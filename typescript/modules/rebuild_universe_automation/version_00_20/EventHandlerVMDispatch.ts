import {ObjectBox} from "../../../box/ObjectBox"
import {InstructionType} from "../../../vm/instruction/InstructionType"
import {SimpleStackVM} from "./SimpleStackVM"

export class EventHandlerVMDispatch extends SimpleStackVM {
	target_obj:any
	constructor(instructions:InstructionType[],target_obj:any) {
		super(instructions)
		this.target_obj=target_obj
	}
	handleEvent(event:Event) {
		this.reset()
		this.run(new ObjectBox(event))
	}
}
