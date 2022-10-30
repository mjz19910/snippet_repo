import {ObjectBoxImpl} from "./ObjectBoxImpl";
import {SimpleStackVM} from "./SimpleStackVM";

export class EventHandlerVMDispatch extends SimpleStackVM {
	/**@arg {InstructionType[]} instructions @arg {any} target_obj */
	constructor(instructions, target_obj) {
		super(instructions);
		this.target_obj = target_obj;
	}
	/**@arg {Event} event */
	handleEvent(event) {
		this.reset();
		this.run(new ObjectBoxImpl(event));
	}
}
