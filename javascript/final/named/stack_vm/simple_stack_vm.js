/** @type {import("./__global.js").Holder} */
let holder={
	use() {}
};
holder.use();

export class SimpleStackVM {
	/**
	 * @param {(["this"] | ["push", string] | ["get"] | ["call", number] | ["drop"]|['return']|['halt']|['push_args']|['push_window']|['breakpoint'])[]} instructions
	 */
	constructor(instructions) {
		this.instructions=instructions;
		/** @type {({}|string)[]} */
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
	/**
	 * @param {{}|string} value
	 */
	push(value) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	/**
	 * @param {{}[]} run_arguments
	 */
	run(...run_arguments) {
		this.running=true;
		while(this.instruction_pointer<this.instructions.length&&this.running) {
			let cur_instruction=this.instructions[this.instruction_pointer];
			switch(cur_instruction[0]) {
				case 'push'/*Stack*/: {
					let [,value]=cur_instruction;
					this.push(value);
				} break;
				case 'drop'/*Stack*/: this.pop(); break;
				case 'get'/*Object*/: {
					let name=this.pop();
					let obj=this.pop();
					if(!obj) throw new Error();
					if(typeof obj==='string') throw new Error();
					if(!(typeof name==='string')) throw new Error();
					this.push(obj[name]);
					break;
				}
				case 'call'/*Call*/: {
					let number_of_arguments=cur_instruction[1];
					let arg_arr=[];
					for(let i=0;i<number_of_arguments;i++) {
						arg_arr.unshift(this.pop());
					}
					let name_to_call=this.pop();
					let target=this.pop();
					if(!target) throw new Error();
					if(!(typeof name_to_call==='string')) throw new Error();
					let ret=target[name_to_call](...arg_arr);
					this.push(ret);
					break;
				}
				case 'return'/*Call*/: {
					let ret=this.pop();
					this.return_value=ret;
					break;
				}
				case 'halt'/*Running*/: {
					this.running=false;
					break;
				}
				case 'push_args'/*Special*/: {
					this.push(run_arguments);
					break;
				}
				case 'this'/*Special*/: {
					this.push(this);
					break;
				}
				case 'push_window'/*Special*/: {
					this.push(window);
					break;
				}
				case 'breakpoint'/*Debug*/: {
					debugger;
					break;
				}
				default/*Debug*/: {
					console.log('unk opcode',cur_instruction[0]);
					throw new Error("halt");
				}
			}
			this.instruction_pointer++;
		}
		console.assert(this.stack.length===0,"stack length is not zero, unhandled data on stack");
		return this.return_value;
	}
}