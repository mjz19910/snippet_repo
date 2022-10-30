import {Box} from "../../../box/Box"
import {StackVMBox} from "../../../box/StackVMBox"
import {WindowBox} from "../../../box/WindowBox"
import {InstructionType} from "../../../vm/instruction/InstructionType"
import {StackVM} from "./StackVM"
import {throw_invalid_error} from "./throw_invalid_error"

export class SimpleStackVM extends StackVM {
	args_vec: Box[]|null
	constructor(instructions: InstructionType[]) {
		super(instructions)
		this.args_vec=null
	}
	reset() {
		super.reset()
		this.args_vec=null
	}
	/**
	 * @param {InstructionType} instruction
	 */
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'vm_push_self' /*Special*/: {
				console.log('VM: vm_push_self')
				this.push(new StackVMBox(this))
			} break
			case 'push_window_object' /*Special*/: {
				console.log('VM: global push')
				this.push(new WindowBox(window))
			} break
			case 'call' /*Call*/: {
				// TODO: Fix the other code to use the call handling from
				// the base class
				// Currently we support applying functions
				// this is closer to what you expect, not to just get
				// the name of a member to call
				let number_of_arguments=instruction[1]
				if(typeof number_of_arguments!='number')
					throw throw_invalid_error()
				let [target_fn,target_this,...arg_arr]=this.pop_arg_count(number_of_arguments)
				if(typeof target_fn!='object')
					throw throw_invalid_error()
				if(target_fn===null)
					throw throw_invalid_error()
				if(typeof target_this!='object')
					throw throw_invalid_error()
				if(target_this===null)
					throw throw_invalid_error()
				if(target_fn.type!="function_box")
					throw throw_invalid_error()
				if(target_fn.return_type==='promise_box') {
					let ret=target_fn.wrap_call(target_this,...arg_arr)
					this.push(ret)
					return
				}
				let ret=target_fn.value.apply(target_this.value,arg_arr)
				console.log('VM: call %o %s(...)\n ... = ['+"%o, ".repeat(arg_arr.length)+"]\n return %o",target_fn,target_this,...arg_arr,ret)
				switch(typeof ret) {
					default: {
						this.push(ret)
					} break
					case 'object': {
						if(ret===null) {
							this.push(null)
							break
						}
						if(ret instanceof StackVM) {
							this.push(new StackVMBox(ret))
						} else {
							throw new Error("Can't box return")
						}
					} break
				}
			} break
			default /*Base class*/: super.execute_instruction(instruction); break
		}
	}
	/**
	 * @param {Box[]} run_arguments
	 */
	run(...run_arguments: Box[]) {
		this.args_vec=run_arguments
		this.running=true
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let instruction=this.instructions[this.instruction_pointer]
			this.execute_instruction(instruction)
			this.instruction_pointer++
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack")
		return this.return_value
	}
}
