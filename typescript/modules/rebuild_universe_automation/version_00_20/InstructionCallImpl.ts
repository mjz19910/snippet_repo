import {Box} from "../../../box/Box"
import {Call} from "../../../vm/instruction/general/Call"
import {StackVM} from "../../../vm/StackVM"
import {throw_invalid_error} from "./throw_invalid_error"

export class InstructionCallImpl {
	static unbox_value(v: Box) {
		if(typeof v!='object') {
			return v
		} else if(v===null) {
			return v
		} else {
			if(v.type==='void') {
				throw new Error("Attempt to use a box with void type")
			}
			return v.value
		}
	}
	static unbox_args(v_arr: Box[]) {
		return v_arr.map(v => {
			return this.unbox_value(v)
		})
	}
	static execute_instruction(vm: StackVM,instruction: Call) {
		let number_of_arguments=instruction[1]
		if(typeof number_of_arguments!='number')
			throw throw_invalid_error()
		if(number_of_arguments<=1) {
			throw new Error("Not enough arguments for call (min 2, target_this, target_fn)")
		}
		let [target_this,target_fn,...arg_arr]=vm.pop_arg_count(number_of_arguments)
		const a=target_fn
		if(typeof a!='object')
			throw throw_invalid_error()
		if(a===null)
			throw throw_invalid_error()
		if(a.type==='void') {
			throw new Error("Attempt to call a void value")
		}
		if(a.type==='temporary_box') {
			throw new Error("Attempt to use an unknown value (cast it to the type it is)")
		}
		if(a.type==='document_box')
			throw new Error("document_box not supported")
		let b=a.as_type('function')
		if(b===null)
			throw new Error("Type mismatch")
		if(b.type==='function_box') {
			if(b.return_type===null) {
				let ret=b.value.apply(target_this,arg_arr)
				vm.push(ret)
			} else {
				b.wrap_call(target_this,...arg_arr)
			}
		} else if(b.type=='constructor_box') {
			throw new Error("Unexpected constructor")
		} else {
			throw new Error("Unreachable (type of value is never)")
		}
	}
}
