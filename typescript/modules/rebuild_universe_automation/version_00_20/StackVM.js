import MediaListBox from "types/vm/box/MediaListBox.js";
import {InstructionCallImpl} from "./InstructionCallImpl";
import {InstructionCastImpl} from "./InstructionCastImpl";
import {InstructionConstructE} from "./InstructionConstructE";
import {safe_get} from "./safe_get";
import {TempBox} from "./TempBox";
import {throw_invalid_error} from "./throw_invalid_error";
import {WindowBoxImpl} from "./WindowBoxImpl";
import {trigger_debug_breakpoint} from "./trigger_debug_breakpoint";
import {SimpleStackVMParser} from "./SimpleStackVMParser";

export class StackVM {
	/**@arg {InstructionType[]} instructions */
	constructor(instructions) {
		this.instructions = instructions;
		this.instruction_pointer = 0;
		this.running = false;
		this.stack = [];
		this.return_value = void 0;
	}
	/**@type {Box[]} */
	stack;
	/**@arg {Box} value */
	push(value) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	/**@arg {number} distance */
	peek_at(distance) {
		return this.stack.at(-1 - distance);
	}
	/**
	 * @param {number} operand_number_of_arguments
	 */
	pop_arg_count(operand_number_of_arguments) {
		/**@type {Box[]} */
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
	reset() {
		this.running = false;
		this.instruction_pointer = 0;
		this.return_value = void 0;
		this.stack.length = 0;
	}
	/**
	 * @param {number} value
	 */
	is_in_instructions(value) {
		return value >= 0 && value < this.instructions.length;
	}
	/**
	 * @type {{ equal: boolean; }}
	 */
	flags = {
		equal: false,
	};
	/**
	 * @param {InstructionType} instruction
	 */
	execute_instruction(instruction) {
		switch(instruction[0]) {
			case 'je': {
				let [, target] = instruction;
				if(typeof target != 'number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.equal) {
					this.instruction_pointer = target;
				}
			} break;
			case 'jmp': {
				let [, target] = instruction;
				if(typeof target != 'number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer = target;
			} break;
			case 'modify_operand': {
				let [, target, offset] = instruction;
				if(typeof target != 'number')
					throw throw_invalid_error();
				if(typeof offset != 'number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Destination is out of instructions range");
				}
				let instruction_1 = this.instructions[target];
				/**@type {[string, ...any[]]} */
				let instruction_modify = instruction_1;
				let value = null;
				if(this instanceof StackVM) {
					value = this.pop();
				} else {
					let pop_fn = Object.getOwnPropertyDescriptor(this, 'pop');
					if(!pop_fn)
						throw new Error("Previous check should cause this to be unreachable");
					if(pop_fn.get) {
						throw new Error("own property pop was a getter");
					} else {
						console.info(`TODO: add instanceof check`);
						value = pop_fn.value.call(this);
					}
				}
				if(instruction_modify === void 0)
					throw throw_invalid_error();
				instruction_modify[offset] = value;
				let valid_instruction = SimpleStackVMParser.verify_instruction(instruction_modify);
				this.instructions[target] = valid_instruction;
			} break;
			case 'vm_push_ip': {
				instruction;
				if(!this.hasOwnProperty('push')) {
					throw new Error("push_pc requires a stack");
				} else if(this instanceof StackVM) {
					this.push(this.instruction_pointer);
				} else {
					console.info('TODO: add instanceof check to push_pc');
					/**@type {any} */
					let this_as_any = this;
					/**@type {this & {push:StackVM['push'];}} */
					let this_with_push = this_as_any;
					let fn_ptr = safe_get(this_with_push, 'push');
					if(!fn_ptr)
						throw new Error("push_pc requires a stack");
					/**@type {<T, U extends T>(proto:T, o:U)=>T}*/
					function into_typed(proto, obj) {
						void proto;
						return obj;
					}
					let ww2 = into_typed(StackVM.prototype, this);
					if(ww2) {
						fn_ptr.v.call(this, ww2.instruction_pointer);
					} else {
						throw new Error("Property missing or invalid: instruction_pointer");
					}
				}
			} break;
			case 'halt' /*Running*/: {
				instruction;
				this.running = false;
			} break;
			case 'push' /*Stack*/: {
				for(let i = 0; i < instruction.length - 1; i++) {
					let item = instruction[i + 1];
					this.push(item);
				}
			} break;
			case 'drop' /*Stack*/: this.pop(); break;
			case 'dup' /*Stack*/: {
				let top = this.peek_at(0);
				if(!top)
					throw new Error("Stack underflow when executing dup instruction");
				this.push(top);
			} break;
			case 'cast': InstructionCastImpl.execute_instruction(this, instruction); break;
			case 'get' /*Object*/: {
				let target_name = this.pop();
				let target_obj = this.pop();
				if(!target_obj)
					throw throw_invalid_error();
				if(typeof target_name != 'string')
					throw throw_invalid_error();
				if(typeof target_obj != 'object')
					throw throw_invalid_error();
				let get_name = target_name;
				let the_type = target_obj.type;
				/**@arg {Box} opt @arg {string} get_name @returns {Box} */
				function do_box_get(opt, get_name) {
					if(typeof opt != 'object')
						throw throw_invalid_error();
					if(opt === null)
						throw throw_invalid_error();
					switch(opt.type) {
						case "shape_box": {
							let content = opt.value;
							switch(get_name) {
								case 'baseURL': return content['baseURL'];
								case 'disabled': return content['disabled'];
								case 'media':
									let val = content.media;
									if(!val)
										return val;
									if(typeof val === 'string') {
										return val;
									} else {
										return new MediaListBox(val);
									}
								default: throw new Error("Invalid box on get");
							}
						}
						case "array_box": {
							let int_num = parseInt(get_name);
							if(Number.isNaN(int_num))
								throw new Error("Can't parse number");
							let res = opt.value[int_num];
							if(TempBox.is_box_inner(res)) {
								return res;
							} else {
								return res;
							}
						}
						case "constructor_box": throw new Error("Unable to index");
						case "function_box": throw new Error("Unable to index");
						case "promise_box": throw new Error("Unable to index");
						case "void": throw new Error("Unable to index type is void");
						case "object_box": {
							if(opt) {
								if(opt.inner_type === 'unit') {
									console.info('is this (%o) really a unit (ie has no properties)', opt.value);
									throw new Error("Unable to index unit object");
								}
								if(get_name in opt.value) {
									let int_num = parseInt(get_name);
									if(Number.isNaN(int_num)) {
										throw new Error("Figure out how to type check index access to the window object");
									}
									let other_window = opt.value[int_num];
									if(other_window === null)
										return other_window;
									if(typeof other_window === 'string') {
										return other_window;
									}
									return new WindowBoxImpl(other_window);
								}
							}
						}
						case "instance_box": throw new Error("Unable to index instance yet");
					}
				}
				let res = do_box_get(target_obj, target_name);
				console.log('VM: get result', res);
				switch(typeof res) {
					case 'bigint': res;
					case 'boolean': res;
				}
				if(TempBox.is_raw(res)) {
					this.push(res);
				} else if(TempBox.is_box_inner(res)) {
					this.push(res);
				} else {
					if(res === null) {
						this.push(res);
						break;
					}
					this.push(res);
				}
			} break;
			case 'call' /*Call*/: InstructionCallImpl.execute_instruction(this, instruction); break;
			case 'construct' /*Construct*/: InstructionConstructE.execute_instruction(this, instruction); break;
			case 'return' /*Call*/: this.return_value = this.pop(); break;
			case 'breakpoint' /*Debug*/: trigger_debug_breakpoint(); break;
			default: throw new Error("Unexpected instruction: " + instruction[0]); break;
		}
	}
}
