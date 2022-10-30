import {Cast} from "../../../vm/instruction/Cast"
import {StackVM} from "../../../vm/StackVM"
import {throw_invalid_error} from "./throw_invalid_error"
import {throw_todo_error} from "./throw_todo_error"

export class InstructionCastImpl {
	static execute_instruction(vm:StackVM,instruction:Cast) {
		let obj=vm.pop()
		if(!obj)
			throw throw_invalid_error()
		console.log('VM: cast_object',instruction[1],obj)
		if(typeof obj!='object')
			throw throw_invalid_error()
		switch(instruction[1]) {
			case 'object_index': throw_todo_error()
			case 'object_index_to_function': throw_todo_error()
			case 'vm_function': throw_todo_error()
			default: throw new Error("Missing cast to "+instruction[1])
		}
	}
}
