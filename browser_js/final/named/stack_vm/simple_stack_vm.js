export class SimpleStackVM {
	/** @type {(["this"]|["push", string]|["get"]|["call", number]|["drop"]|['return']|['halt']|['get_argv']|['push_window']|['breakpoint'])[]} */
	instructions;
	/** @arg {SimpleStackVM['instructions']} instructions */
	constructor(instructions) {
		this.instructions=instructions;
		/** @type {{}[]} */
		this.stack=[];
		this.instruction_pointer=0;
		this.return_value=void 0;
		this.running=false;
	}
	reset() {
		this.stack.length=0;
		this.instruction_pointer=0;
		this.return_value=void 0;
		this.running=false;
	}
	/** @arg {{}[]} values */
	push(...values) {
		this.stack.push(...values);
	}
	pop() {
		let top=this.stack.pop();
		if(!top) throw new Error("Stack underflow");
		return top;
	}
	/** @arg {{}[]} run_arguments */
	run(...run_arguments) {
		this.running=true;
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let cur_instruction=this.instructions[this.instruction_pointer];
			let err;
			switch(cur_instruction[0]) {
				case 'push'/*Stack*/: {
					this.push(cur_instruction[1]);
				} break;
				case 'drop'/*Stack*/: {
					this.pop();
				} break;
				case 'get'/*Object*/: {
					let name=this.pop();
					let obj=this.pop();
					if(!(typeof name==='string')) throw new Error("get arg not a string");
					/** @template T @arg {T} _obj @returns {asserts _obj is {[x: string]: {}}}  */
					function assume_can_index_with_string(_obj) {}
					assume_can_index_with_string(obj);
					this.push(obj[name]);
				} break;
				case 'call'/*Call*/: {
					let number_of_arguments=cur_instruction[1];
					let arg_arr=[];
					for(let i=0;i<number_of_arguments;i++) {
						arg_arr.unshift(this.pop());
					}
					let name_to_call=this.pop();
					if(!(typeof name_to_call==='string')) throw new Error("name_to_call not a string");
					let target=this.pop();
					/** @template T @arg {T} _obj @returns {asserts _obj is {[x: string]: (...args:any[])=>any}}  */
					function assume_can_index_with_string_to_function(_obj) {}
					assume_can_index_with_string_to_function(target);
					this.push(target[name_to_call](...arg_arr));
				} break;
				case 'return'/*Call*/: {
					let ret=this.pop();
					this.return_value=ret;
				} break;
				case 'halt'/*Running*/: {
					this.running=false;
				} break;
				case 'get_argv'/*Special*/: {
					this.push(...run_arguments);
				} break;
				case 'this'/*Special*/: {
					this.push(this);
				} break;
				case 'push_window'/*Special*/: {
					this.push(window);
				} break;
				case 'breakpoint'/*Debug*/: {
					debugger;
				} break;
				default/*Debug*/: {
					console.log('unk opcode',cur_instruction[0]);
					err=new Error("halt");
				} throw err;
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}