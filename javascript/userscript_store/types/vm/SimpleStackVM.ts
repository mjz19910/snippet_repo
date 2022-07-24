import {InstructionType} from "./instruction/mod"
import {trigger_debug_breakpoint} from "./trigger_debug_breakpoint"
import {BaseStackVM} from "./BaseStackVM"
import {FunctionConstructorBox} from "../box/FunctionConstructorBox"
import {CSSStyleSheetConstructorBox} from "../box/CSSStyleSheetConstructorBox"
import {NewableFunctionBox} from "../box/NewableFunctionBox"
import {Call} from "./instruction/general/Call"

function construct_with_constructor_box<ArgsType extends any[]>(value: CSSStyleSheetConstructorBox|NewableFunctionBox|FunctionConstructorBox,arg_arr: ArgsType) {
	switch(value.instance_type) {
		case 'CSSStyleSheet': return value.factory(...arg_arr)
	}
}

export class SimpleStackVM<T> extends BaseStackVM {
	args_vec: (T extends Array<T>? T:[T])|null
	constructor(instructions: any) {
		super(instructions)
		this.args_vec=null
	}
	reset() {
		super.reset()
		this.args_vec=null
	}
	execute_call_instruction(instruction: Call) {
		// TODO: Fix the other code to use the call handling from
		// the base class
		// Currently we support applying functions
		// this is closer to what you expect, not to just get
		// the name of a member to call
		let number_of_arguments=instruction[1]
		let [target_obj,target_name,...arg_arr]=this.pop_arg_count(number_of_arguments)
		if(typeof target_name=='string') {
			switch(typeof target_obj) {
				case 'object':
					if(target_obj===null)
						throw new Error("Call null func")
					switch(target_obj.type) {
						case 'array_box': throw new Error("Call not a function")
						case 'constructor_box': {
							let ret=construct_with_constructor_box(target_obj,arg_arr)
							this.push(ret)
						} break
						case 'custom_box': {
							let ret=target_obj.as_type('function')
							if(!ret) throw new Error("Call null func")
							if('factory' in ret) {}
						} break
					}
			}
		}
	}
	execute_instruction_raw(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'breakpoint' /*Debug*/: return trigger_debug_breakpoint()
			case 'call' /*Call*/: return this.execute_call_instruction(instruction)
			default: return super.execute_instruction(instruction)
		}
	}
	run(...run_arguments: T extends T[]? T:[T]) {
		this.args_vec=run_arguments
		return super.run()
	}
}
