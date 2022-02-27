import {InstructionType} from "./types/vm/instruction/mod";
import IAutoBuy from "types/IAutoBuy";
import {SimpleStackVM} from "./SimpleStackVM";

export class EventHandlerVMDispatch extends SimpleStackVM<Event> {
	target_obj;
	constructor(instructions: InstructionType[], target_obj: IAutoBuy) {
		super(instructions);
		this.target_obj = target_obj;
	}
	handleEvent(event: Event) {
		this.reset();
		this.run(event);
	}
}
