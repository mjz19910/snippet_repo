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
	pop_value(){
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
				case 'get':{
					let obj=this.pop_value();
					this.push_value(obj[instruction_args[0]]);
					break;
				}
				case 'call':{
					let obj=this.pop_value();
					obj[instruction_args[0]](...instruction_args[1]);
					break;
				}
				default:
					console.log('unk opcode', cur_opcode);
					throw new Error("halt");
			}
			this.current_instruction++;
		}
	}
	dispatchEvent(event) {
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
	['push_self'],
	['access', 'base_obj'],
	['access', 'background_audio'],
	['call', 'play', []]
]);
handler_test.run({});