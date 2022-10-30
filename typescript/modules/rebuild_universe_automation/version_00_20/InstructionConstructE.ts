import {Construct} from "../../../vm/instruction/general/Construct"
import {CSSStyleSheetBox} from "./CSSStyleSheetBox";
import {StackVM} from "./StackVM"
import {throw_invalid_error} from "./throw_invalid_error";

export class InstructionConstructE {
	static is_array_empty<T>(arr: T[]): arr is [] {
		if(arr.length === 0)
			return true;
		return false;
	}
	static to_unit_arr<T>(arr: T): []|null {
		if(arr instanceof Array) {
			if(this.is_array_empty(arr)) {
				return arr;
			}
		}
		return null;
	}
	static execute_instruction(vm: StackVM, instruction: Construct) {
		let number_of_arguments = instruction[1];
		if(typeof number_of_arguments != 'number')
			throw throw_invalid_error();
		let [construct_target, ...construct_arr] = vm.pop_arg_count(number_of_arguments);
		const a = construct_target;
		if(typeof a != 'object')
			throw throw_invalid_error();
		if(a === null)
			throw throw_invalid_error();
		if(a.type != 'constructor_box')
			throw throw_invalid_error();
		if(a.instance_type === null) {
			let obj = a.factory(...construct_arr);
			vm.push(obj);
		} else {
			let ty = a;
			{
				/**@type {{s:[options?: CSSStyleSheetInit | undefined], valid_count:1}|{s:[], valid_count:0}} */
				let valid_args = {
					s: [],
					valid_count: 0
				};
				for(let i = 0; i < construct_arr.length; i++) {
					let val = construct_arr[i];
					if(typeof val != 'object')
						continue;
					if(val === null)
						continue;
					if(val.type != 'shape_box')
						continue;
					valid_args = {
						s: [val.value],
						valid_count: 1
					};
				}
				/**@type {CSSStyleSheet} */
				let obj = new a.value(...valid_args.s);
				vm.push(new CSSStyleSheetBox(obj));
			}
		}
		l_log_if(LOG_LEVEL_INFO, "", instruction, ...vm.stack.slice(vm.stack.length - number_of_arguments));
	}
}
