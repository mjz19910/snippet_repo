import {InstructionType} from "types/vm/instruction/mod";
import {SimpleStackVM} from "./SimpleStackVM";

export class EventHandlerVMDispatch<T> extends SimpleStackVM {
	target_obj: T;
	constructor(instructions: InstructionType[], target_obj: T) {
		super(instructions);
		this.target_obj = target_obj;
	}
	handleEvent(event: any) {
		this.reset();
		this.run(event);
	}
}
