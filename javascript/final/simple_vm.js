class EventHandlerMultiDispatch {
	constructor(base_obj, action_list) {
		this.base_obj = base_obj;
		this.action_list = action_list;
		this.stack = [];
		this.current_instruction = 0;
	}
	reset() {
		this.stack.length = 0;
		this.current_instruction = 0;
	}
	push_value(value) {
		this.stack.push(value);
	}
	pop_value() {
		return this.stack.pop();
	}
	run(...run_arguments) {
		while(this.current_instruction < this.action_list.length) {
			let [cur_opcode, ...instruction_args] = this.action_list[this.current_instruction];
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
					let obj = this.pop_value();
					this.push_value(obj[instruction_args[0]]);
					break;
				}
				case 'call': {
					let number_of_arguments = instruction_args[0];
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
					for(let item of instruction_args) {
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
			this.current_instruction++;
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
const handler_test = new EventHandlerMultiDispatch(test_obj, [
	['this'],
	['get', 'base_obj'],
	['get', 'background_audio'],
	['push', 'play'],
	['call', 0],
]);
handler_test.run({});