class SimpleStackVM {
	constructor(instructions) {
		this.instructions = instructions;
		this.stack = [];
		this.instruction_pointer = 0;
		this.not_implemented_opcodes = [
			'break', 'continue',
			'await',
			'var', 'let', 'const',
			'super', 'class', 'extends',
			'try', 'catch', 'finally',
			'arguments',
			'switch', 'case', 'default',
			'delete',
			'for', 'while', 'do', 'if', 'else',
			'enum',
			'export', 'import',
			'function',
			'implements',
			'interface',
			'package',
			'private',
			'protected',
			'public',
			'static',
			'with',
			'yield'
		];
		this.return_value = void 0;
	}
	reset() {
		this.stack.length = 0;
		this.instruction_pointer = 0;
		this.return_value = void 0;
	}
	push(value) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	throw_not_implemented(reason) {
		throw new Error(`${reason} is not implemented`);
	}
	run(...run_arguments) {
		while(this.instruction_pointer < this.instructions.length) {
			let cur_instruction = this.instructions[this.instruction_pointer];
			let [cur_opcode] = cur_instruction;
			if(this.not_implemented_opcodes.includes(cur_opcode)) {
				this.throw_not_implemented(cur_opcode);
			}
			switch(cur_opcode) {
				case 'push': {
					for(let i = 1; i < cur_instruction.length; i++) {
						let item = cur_instruction[i];
						this.push(item);
					}
					break;
				}
				case 'get': {
					let name = this.pop();
					let obj = this.pop();
					this.push(obj[name]);
					break;
				}
				case 'drop': {
					let drop = this.pop();
					void drop;
					break;
				}
				case 'call': {
					let number_of_arguments = cur_instruction[1];
					let arg_arr = [];
					for(let i = 0; i < number_of_arguments; i++) {
						arg_arr.unshift(this.pop());
					}
					let name_to_call = this.pop();
					let obj_base = this.pop();
					let ret = obj_base[name_to_call](...arg_arr);
					this.push(ret);
					break;
				}
				case 'new': {
					let number_of_arguments = cur_instruction[1];
					let init_arr = [];
					for(let i = 0; i < number_of_arguments; i++) {
						init_arr.unshift(this.pop());
					}
					let constructor = this.pop();
					let ret = new constructor(...init_arr);
					this.push(ret);
					break;
				}
				case 'return': {
					let ret = this.pop();
					this.return_value = ret;
					this.returning = true;
					break;
				}
				case 'import'/*Keywords*/: {
					throw new Error("use dyn_import for dynamic imports, static imports are not implemented");
				}
				case 'delete': {
					let name = this.pop();
					let obj = this.pop();
					this.push(delete obj[name]);
					break;
				}
				case 'false': {
					this.push(false);
					break;
				}
				case 'true': {
					this.push(true);
					break;
				}
				case 'dyn_import': {
					let module_spec = this.pop();
					let import_promise = import(module_spec);
					this.push(import_promise);
					break;
				}
				case 'undefined': {
					this.push(undefined);
					break;
				}
				case 'void': {
					this.push(void this.pop());
					break;
				}
				case 'null': {
					this.push(null);
					break;
				}
				case 'throw': {
					let error = this.pop();
					error.vm_ip = this.instruction_pointer;
					throw error;
				}
				case 'this': {
					this.push(this);
					break;
				}
				case 'typeof': {
					let obj = this.pop();
					this.push(typeof obj);
					break;
				}
				case 'instanceof': {
					let obj = this.pop();
					let func = this.pop();
					this.push(obj instanceof func);
					break;
				}
				case 'in': {
					let name = this.pop();
					let obj = this.pop();
					this.push(name in obj);
					break;
				}
				case 'push_args'/*Special*/: {
					this.push(run_arguments);
					break;
				}
				case 'push_window': {
					this.push(window);
					break;
				}
				case 'breakpoint'/*Debug*/: {
					debugger;
					break;
				}
				case 'never': {
					throw new Error("never was executed");
				}
				default:
					console.log('unk opcode', cur_opcode);
					throw new Error("halt");
			}
			if(this.returning) {
				break;
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length === 0, "stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}
class EventHandlerVMDispatch extends SimpleStackVM {
	constructor(instructions, target_obj) {
		super(instructions);
		this.target_obj = target_obj;
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
const handler_test = new EventHandlerVMDispatch([
	['this'],
	['push', 'base_obj'],
	['get'],
	['push', 'background_audio'],
	['get'],
	['push', 'play'],
	['call', 0],
], test_obj);
handler_test.handleEvent({});