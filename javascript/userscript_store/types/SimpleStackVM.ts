import {InstructionType} from "./vm/instruction/mod";
import StackVMBox from "./vm/box/StackVMBox";
import WindowBox from "./vm/box/WindowBox";
import {trigger_debug_breakpoint} from "./trigger_debug_breakpoint";
import {BaseStackVM} from "./BaseStackVM";

export class SimpleStackVM<T> extends BaseStackVM {
	args_vec: (T extends Array<T> ? T : [T]) | null;
	constructor(instructions: any) {
		super(instructions);
		this.args_vec = null;
	}
	reset() {
		super.reset();
		this.args_vec = null;
	}
	execute_instruction_raw(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'this' /*Special*/: this.push(new StackVMBox(this)); break;
			// TODO: if you ever use this on a worker, change
			// it to use globalThis...
			case 'global' /*Special*/: this.push(new WindowBox(window)); break;
			case 'breakpoint' /*Debug*/: trigger_debug_breakpoint(); break;
			case 'call' /*Call*/: {
				// TODO: Fix the other code to use the call handling from
				// the base class
				// Currently we support applying functions
				// this is closer to what you expect, not to just get
				// the name of a member to call
				let number_of_arguments = instruction[1];
				let [target_obj, target_name, ...arg_arr] = this.pop_arg_count(number_of_arguments);
				if(typeof target_name == 'string') {
					switch(typeof target_obj) {
						case 'object':
							if(target_obj === null)
								throw new Error("Call null func");
							switch(target_obj.type) {
								case 'array_box': throw new Error("Call not a function");
								case 'constructor_box': {
									// are you sure, you just called a constructor! (the correct way)
									let ret = target_obj.factory(...arg_arr);
									this.push(ret);
								}
								case 'custom_box': {
									let ret = target_obj.as_type('function');
									ret;
								} break;
							}
					}
				}
			} break;
			default: super.execute_instruction(instruction); break;
		}
	}
	run(...run_arguments: T extends T[] ? T : [T]) {
		this.args_vec = run_arguments;
		return super.run();
	}
}
