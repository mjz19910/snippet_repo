import {Box} from "../box/Box.js";
import {do_box_get} from "../modules/rebuild_the_universe/src/do_box_get.js";
import {InstructionCallImpl} from "../modules/rebuild_the_universe/src/InstructionCallImpl.js";
import {InstructionCastImpl} from "../modules/rebuild_the_universe/src/InstructionCastImpl.js";
import {InstructionConstructImpl} from "../modules/rebuild_the_universe/src/InstructionConstructImpl.js";
import {into_typed} from "../modules/rebuild_the_universe/src/into_typed.js";
import {safe_get} from "../modules/rebuild_the_universe/src/safe_get.js";
import {StackVMFlags} from "./StackVMFlags.js";
import {TempBox} from "../modules/rebuild_the_universe/src/TempBox.js";
import {throw_invalid_error} from "../modules/rebuild_the_universe/src/throw_invalid_error.js";
import {InstructionType} from "./instruction/InstructionType.js";
import {SimpleStackVMParser} from "./SimpleStackVMParser.js";
import {trigger_debug_breakpoint} from "./trigger_debug_breakpoint.js";

export class StackVM {
	instructions: InstructionType[];
	instruction_pointer: number;
	running: boolean;
	stack: Box[];
	return_value: Box;
	flags: StackVMFlags;
	constructor(instructions: InstructionType[]) {
		this.instructions=instructions;
		this.instruction_pointer=0;
		this.running=false;
		this.stack=[];
		this.return_value=void 0;
		this.flags=new StackVMFlags;
	}
	push(value: Box) {
		this.stack.push(value);
	}
	pop() {
		return this.stack.pop();
	}
	peek_at(distance: number) {
		return this.stack.at(-1-distance);
	}
	pop_arg_count(operand_number_of_arguments: number) {
		let arguments_arr: Box[]=[];
		let arg_count=operand_number_of_arguments;
		for(let i=0;i<arg_count;i++) {
			if(this.stack.length<=0) {
				throw new Error('stack underflow in pop_arg_count');
			}
			arguments_arr.unshift(this.pop());
		}
		return arguments_arr;
	}
	reset() {
		this.running=false;
		this.instruction_pointer=0;
		this.return_value=void 0;
		this.stack.length=0;
	}
	is_in_instructions(value: number) {
		return value>=0&&value<this.instructions.length;
	}
	execute_backup_vm_push_ip() {
		let this_with_push: {push: StackVM['push'];}=this;
		let fn_ptr=safe_get(this_with_push,"push");
		if(!fn_ptr)
			throw new Error("push_pc requires a stack");
		let this_as_StackVM=into_typed<StackVM>(this);
		if('instruction_pointer' in this_as_StackVM) {
			fn_ptr.call(this,this_as_StackVM.instruction_pointer);
		} else {
			throw new Error("Property missing or invalid: instruction_pointer");
		}
	}
	execute_instruction(instruction: InstructionType) {
		switch(instruction[0]) {
			case 'je': {
				let [,target]=instruction;
				if(typeof target!='number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				if(this.flags.equal) {
					this.instruction_pointer=target;
				}
			} break;
			case 'jmp': {
				let [,target]=instruction;
				if(typeof target!='number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Jump target is out of instructions range");
				}
				this.instruction_pointer=target;
			} break;
			case 'modify_operand': {
				let [,target,offset]=instruction;
				if(typeof target!='number')
					throw throw_invalid_error();
				if(typeof offset!='number')
					throw throw_invalid_error();
				if(this.is_in_instructions(target)) {
					throw new Error("RangeError: Destination is out of instructions range");
				}
				let instruction_1=this.instructions[target];
				let instruction_modify: [string,...any[]]=instruction_1;
				let value=null;
				if(this instanceof StackVM) {
					value=this.pop();
				} else {
					let pop_fn=Object.getOwnPropertyDescriptor(this,'pop');
					if(!pop_fn)
						throw new Error("Previous check should cause this to be unreachable");
					if(pop_fn.get) {
						throw new Error("own property pop was a getter");
					} else {
						console.info(`TODO: add instanceof check`);
						value=pop_fn.value.call(this);
					}
				}
				if(instruction_modify===void 0)
					throw throw_invalid_error();
				instruction_modify[offset]=value;
				let valid_instruction=SimpleStackVMParser.verify_instruction(instruction_modify,[0]);
				this.instructions[target]=valid_instruction;
			} break;
			case 'vm_push_ip': {
				if(!this.hasOwnProperty('push')) {
					throw new Error("push_pc requires a stack");
				} else if(this instanceof StackVM) {
					this.push(this.instruction_pointer);
				} else {
					throw new Error("Unreachable");
				}
			} break;
			case 'halt' /*Running*/: {
				instruction;
				this.running=false;
			} break;
			case 'push' /*Stack*/: {
				for(let i=0;i<instruction.length-1;i++) {
					let item=instruction[i+1];
					this.push(item);
				}
			} break;
			case 'drop' /*Stack*/: this.pop(); break;
			case 'dup' /*Stack*/: {
				let top=this.peek_at(0);
				if(!top)
					throw new Error("Stack underflow when executing dup instruction");
				this.push(top);
			} break;
			case 'cast': InstructionCastImpl.execute_instruction(this,instruction); break;
			case 'get' /*Object*/: {
				let target_name=this.pop();
				let target_obj=this.pop();
				if(!target_obj)
					throw throw_invalid_error();
				if(typeof target_name!='string')
					throw throw_invalid_error();
				if(typeof target_obj!='object')
					throw throw_invalid_error();
				let res=do_box_get(target_obj,target_name);
				console.log('VM: get result',res);
				switch(typeof res) {
					case 'bigint': res;
					case 'boolean': res;
				}
				if(TempBox.is_raw(res)) {
					this.push(res);
				} else if(TempBox.is_box_inner(res)) {
					this.push(res);
				} else {
					if(res===null) {
						this.push(res);
						break;
					}
					this.push(res);
				}
			} break;
			case 'call' /*Call*/: InstructionCallImpl.execute_instruction(this,instruction); break;
			case 'construct' /*Construct*/: InstructionConstructImpl.execute_instruction(this,instruction); break;
			case 'return' /*Call*/: this.return_value=this.pop(); break;
			case 'breakpoint' /*Debug*/: trigger_debug_breakpoint(); break;
			default: throw new Error("Unexpected instruction: "+instruction[0]); break;
		}
	}
}
