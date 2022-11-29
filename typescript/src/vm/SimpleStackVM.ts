import {BaseStackVM} from "./BaseStackVM.js";

export class SimpleStackVM<T> extends BaseStackVM {
	args_vec: (T extends Array<T>? T:[T])|null;
	constructor(instructions: any) {
		super(instructions);
		this.args_vec=null;
	}
	override reset() {
		super.reset();
		this.args_vec=null;
	}
	override run(...run_arguments: T extends T[]? T:[T]) {
		this.args_vec=run_arguments;
		return super.run();
	}
}
