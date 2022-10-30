import {LOG_LEVEL_INFO} from "types/constants.js";
import {InstructionCallImpl} from "./InstructionCallImpl";
import {InstructionConstructE} from "./InstructionConstructE";
import {l_log_if} from "./l_log_if";
import {throw_invalid_error} from "./throw_invalid_error";
import {throw_todo_error} from "./throw_todo_error";

export class DomBuilderVM {
	/**@type {Box} */
	return_value;
	/**@type {number|null} */
	jump_instruction_pointer;
	/**@arg {InstructionType[]} instructions */
	constructor(instructions) {
		this.running = false;
		this.instructions = instructions;
		this.instruction_pointer = 0;
		this.return_value = void 0;
		/**
		 * @type {Box[]}
		 */
		this.stack = [];
		/**
		 * @type {[Box[], InstructionType[]][]}
		 */
		this.exec_stack = [];
		this.jump_instruction_pointer = null;
	}
	/**
	 * @param {Box} v
	 */
	push(v) {
		this.stack.push(v);
	}
	pop() {
		return this.stack.pop();
	}
	/**
	 * @param {number} operand_number_of_arguments
	 * @return {Box[]}
	 */
	pop_arg_count(operand_number_of_arguments) {
		let arguments_arr = [];
		let arg_count = operand_number_of_arguments;
		for(let i = 0; i < arg_count; i++) {
			if(this.stack.length <= 0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	peek_at() {
		return this.stack[0];
	}
	reset() {}
	is_in_instructions() {
		return true;
	}
	flags = {equal: false};
	/**@arg {InstructionType} instruction */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			// case 'exec':{
			// 	this.exec_stack.push([this.stack, this.instructions]);
			// 	let base_ptr=this.stack.length;
			// 	// advance the instruction pointer, when we return we want to resume
			// 	// at the next instruction...
			// 	this.instruction_pointer++;
			// 	this.stack.push(this.instruction_pointer, base_ptr);
			// 	this.stack=[];
			// 	let new_instruction_stream=instruction[1];
			// 	this.instructions=new_instruction_stream;
			// 	this.jump_instruction_pointer=0;
			// 	l_log_if(LOG_LEVEL_INFO, 'exec', ...instruction[1]);
			// } break;
			case 'peek': // {
				throw_todo_error();
			/* let [, op_1, op_2]=instruction;
			let peek_stack=this.exec_stack[op_1][0];
			let base_ptr=peek_stack.at(-1);
			if(typeof base_ptr!='number')throw invalid();
			let at=peek_stack[base_ptr - op_2 - 1];
			this.push(at);
			l_log_if(LOG_LEVEL_INFO, 'peek, pushed value', at, op_2, 'base ptr', base_ptr, 'ex_stack', op_1);
		} break; */
			case 'append': {
				if(this.stack.length <= 0) {
					throw new Error('stack underflow');
				}
				let target = this.pop();
				if(this.stack.length <= 0) {
					throw new Error('stack underflow');
				}
				let child_to_append = this.pop();
				if(typeof child_to_append != 'object')
					throw 1;
				if(typeof target != 'object')
					throw 1;
				if(target === null)
					throw 1;
				if(child_to_append === null)
					throw 1;
				if(this.can_use_box(target) && this.can_use_box(child_to_append)) {
					if(child_to_append.from !== 'create') {
						console.warn('Are you sure you want to move elements around? child_to_append was not an element you created', child_to_append);
					}
					if(target.value && child_to_append.value) {
						target.value.appendChild(child_to_append.value);
					} else {
						console.assert(false, 'box has no value');
					}
				} else {
					target;
					throw new Error("Invalid VMBoxedDomValue");
				}
				l_log_if(LOG_LEVEL_INFO, 'append to dom', [target, child_to_append]);
			} break;
			case 'push' /*Stack*/: {
				for(let i = 0; i < instruction.length - 1; i++) {
					let item = instruction[i + 1];
					this.push(item);
				}
			} break;
			case 'drop' /*Stack*/: this.pop(); break;
			case 'dup': this.push(this.pop()); break;
			case 'get': break;
			case 'call' /*Call*/: InstructionCallImpl.execute_instruction(this, instruction); break;
			case 'return': break;
			case 'halt': break;
			case 'vm_push_args': break;
			case 'vm_push_self': break;
			case 'push_global_object': break;
			case 'breakpoint': break;
			case 'je': break;
			case 'jmp': break;
			case 'vm_return': {
				if(!this.exec_stack.length) {
					this.running = false;
				}
			} break;
			case 'vm_call': break;
			case 'vm_push_ip': break;
			case 'construct' /*Construct*/: InstructionConstructE.execute_instruction(this, instruction); break;
			case 'modify_operand': break;
			default /*Base class*/: {
				console.error("Need instruction: " + instruction[0]);
				debugger;
			} break;
		}
	}
	/**
	 * @param {Box} box
	 * @returns {box is NodeBox}
	 */
	can_use_box(box) {
		if(typeof box == 'object' && box !== null) {
			return box.type === 'instance_box' && box.instance_type === 'Node';
		}
		return false;
	}
	/**
	 * @param {Box} box
	 */
	verify_dom_box(box) {
		if(typeof box != 'object')
			throw new Error("invalid Box (not an object)");
		if(box === null)
			throw new Error("invalid Box (is null)");
		if(box.type === void 0)
			throw new Error("Invalid Box (no type)");
		if(box.type != 'instance_box')
			throw new Error("Unbox failed not an instance box");
		if(box.instance_type != 'Node')
			throw new Error("Unbox failed not an instance box");
		if(typeof box.from != 'string')
			throw new Error("Unbox failed Box.from is not a string");
		if(!(box.value instanceof Node)) {
			throw new Error("Box looks like a Node box but does not contain a Node");
		}
	}
	run() {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let instruction = this.instructions[this.instruction_pointer];
			this.execute_instruction(instruction);
			if(this.jump_instruction_pointer != null) {
				this.instruction_pointer = this.jump_instruction_pointer;
				this.jump_instruction_pointer = null;
			} else {
				this.instruction_pointer++;
			}
			if(this.instruction_pointer >= this.instructions.length) {
				if(this.exec_stack.length > 0) {
					let exec_top = this.exec_stack.pop();
					if(!exec_top)
						throw 1;
					[this.stack, this.instructions] = exec_top;
					// let base_ptr=...
					this.stack.pop();
					let instruction_ptr = this.stack.pop();
					if(instruction_ptr === void 0)
						throw new Error("Stack underflow");
					if(typeof instruction_ptr != 'number')
						throw throw_invalid_error();
					this.instruction_pointer = instruction_ptr;
					l_log_if(LOG_LEVEL_INFO, 'returned to', this.instruction_pointer, this.exec_stack.length);
					continue;
				}
				l_log_if(LOG_LEVEL_INFO, 'reached end of instruction stream, nothing to return too', instruction, this.instructions, this.instruction_pointer);
			}
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
