class SimpleStackVM {
	constructor(base_obj, instructions) {
		this.base_obj = base_obj;
		this.instructions = instructions;
		this.stack = [];
		this.instruction_pointer = 0;
	}
	reset() {
		this.stack.length = 0;
		this.instruction_pointer = 0;
	}
	push_value(value) {
		this.stack.push(value);
	}
	pop_value() {
		return this.stack.pop();
	}
	run(...run_arguments) {
		while(this.instruction_pointer < this.instructions.length) {
			let cur_instruction = this.instructions[this.instruction_pointer];
			let [cur_opcode] = cur_instruction;
			switch(cur_opcode) {
				case 'push_args': {
					this.push_value(run_arguments);
					break;
				}
				case 'this': {
					this.push_value(this);
					break;
				}
				case 'get': {
					let name = this.pop_value();
					let obj = this.pop_value();
					this.push_value(obj[name]);
					break;
				}
				case 'call': {
					let number_of_arguments = cur_instruction[1];
					let arg_arr = [];
					for(let i = 0; i < number_of_arguments; i++) {
						arg_arr.unshift(this.pop_value());
					}
					let name_to_call = this.pop_value();
					let obj_base = this.pop_value();
					let ret = obj_base[name_to_call](...arg_arr);
					this.push_value(ret);
					break;
				}
				case 'drop': {
					let drop = this.pop_value();
					void drop;
					break;
				}
				case 'breakpoint': {
					debugger;
					break;
				}
				case 'push': {
					for(let i=1;i < cur_instruction.length;i++) {
						let item=cur_instruction[i];
						this.push_value(item);
					}
					break;
				}
				case 'push_window': {
					this.push_value(window);
					break;
				}
				default:
					console.log('unk opcode', cur_opcode);
					throw new Error("halt");
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
	}
	handleEvent(event) {
		this.reset();
		this.run(event);
	}
}
const test_obj = {
	background_audio: {
		play() {
			console.log('test success');
		}
	}
};
const handler_test = new SimpleStackVM(test_obj, [
	['this'],
	['push', 'base_obj'],
	['get'],
	['push', 'background_audio'],
	['get'],
	['push', 'play'],
	['call', 0],
]);
handler_test.run({});