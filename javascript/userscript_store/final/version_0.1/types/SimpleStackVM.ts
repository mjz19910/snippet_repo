import {InstructionType} from "types/vm/instruction/mod";
import {IndexedFnBox} from "types/vm/box/IndexedFunctionBox";
import InstructionTypeArrayBox from "types/vm/box/InstructionTypeArrayBox";
import {StackVM} from "types/StackVM";
import {IBox} from "types/vm/box/IBox";
import GlobalThisBox from "types/vm/box/GlobalThisBox";
import ArrayBox from "types/vm/box/ArrayBox";
import {IndexBox} from "types/vm/index_access/IndexBox";
import {StackVMBox} from "types/vm/box/StackVMBox";
import WindowBox from "types/vm/box/WindowBox";

export class SimpleStackVM implements StackVM {
	instructions: InstructionType[];
	stack: IBox[];
	instruction_pointer: number;
	return_value: IBox;
	running: boolean;
	constructor(instructions: InstructionType[]) {
		this.instructions = instructions;
		this.stack = [];
		this.instruction_pointer = 0;
		this.return_value = void 0;
		this.running = false;
	}
	reset() {
		this.stack.length = 0;
		this.instruction_pointer = 0;
		this.return_value = void 0;
		this.running = false;
	}
	push(value: IBox) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	pop_arg_count(arg_count: number): IBox[] {
		let ret = [];
		for(let i = 0;i < arg_count;i++) {
			if(this.stack.length <= 0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			ret.unshift(this.pop());
		}
		return ret;
	}
	run(...run_arguments: IBox[]) {
		this.running = true;
		while(this.instruction_pointer < this.instructions.length && this.running) {
			let cur_instruction = this.instructions[this.instruction_pointer];
			let [cur_opcode, ...instruction_parameters] = cur_instruction;
			switch(cur_opcode) {
				case 'push' /*Stack*/: {
					for(let i = 1;i < cur_instruction.length;i++) {
						let item = cur_instruction[i];
						if(item instanceof Array) {
							this.push(new InstructionTypeArrayBox(item));
						} else {
							this.push(item);
						}
					}
					break;
				}
				case 'drop' /*Stack*/: {
					let drop = this.pop();
					void drop;
					break;
				}
				case 'get' /*Object*/: {
					let name = this.pop();
					if(!name)
						throw new Error("Invalid");
					let obj = this.pop();
					if(!obj)
						throw new Error("Invalid");
					if(obj instanceof IndexBox && typeof name === 'string') {
						this.push(obj.value[name]);
					}
					break;
				}
				case 'call' /*Call*/: {
					let number_of_arguments = instruction_parameters[0];
					if(number_of_arguments === void 0) {
						throw new Error("Invalid call operand");
					}
					if(typeof number_of_arguments != 'number')
						throw new Error("Invalid");
					let arg_arr = [];
					for(let i = 0;i < number_of_arguments;i++) {
						arg_arr.unshift(this.pop());
					}
					let name_to_call = this.pop();
					let target = this.pop();
					if(!target)
						throw "Bad";
					if(!name_to_call)
						throw "Bad";
					if(target instanceof IndexedFnBox && typeof name_to_call === 'string') {
						let ret = target.value[name_to_call](...arg_arr);
						switch(typeof ret) {
							case 'function':
							case 'object':
								console.log('convert', ret);
								throw new Error("Conversion needed");
							case 'string': case 'number': case 'bigint': case 'boolean': case 'symbol':
								this.push(ret);
								break;
							case 'undefined':
								this.push(ret);
								break;
							default:
								console.warn("return value unable to be pushed", ret);
								throw new Error("Can't box return value");
						}
					}
					break;
				}
				case 'return' /*Call*/: this.return_value = this.pop(); break;
				case 'halt' /*Running*/: this.running = false; break;
				case 'push_args' /*Special*/: this.push(new ArrayBox(run_arguments)); break;
				case 'this' /*Special*/: this.push(new StackVMBox(this)); break;
				case 'global' /*Special*/: {
					if(window)
						this.push(new WindowBox(window));
					else
						this.push(new GlobalThisBox(globalThis));
					break;
				}
				case 'breakpoint' /*Debug*/: {
					debugger;
					break;
				}
				default /*Debug*/: {
					console.log('unk opcode', cur_opcode);
					throw new Error("halt");
				}
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
