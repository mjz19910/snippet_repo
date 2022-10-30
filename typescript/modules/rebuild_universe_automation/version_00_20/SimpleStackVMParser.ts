import {not_reached} from "./not_reached";

export class SimpleStackVMParser {
	static match_regex = /(.+?)(;|$)/gm;
	/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
	static parse_int_arg(cur, arg_loc) {
		let cur_item = cur[arg_loc];
		if(typeof cur_item == 'string') {
			let arg = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int = arg.slice(4, -1);
				cur[arg_loc] = parseInt(str_int, 10);
			}
		}
	}
	/**
	 * @param {string | string[]} str
	 * @param {any[]} format_list
	 */
	static parse_string_with_format_ident(str, format_list) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				return format_list.shift();
			default:
				console.assert(false, "Assertion failed: %s", 'unsupported format spec %' + format_type);
		}
	}
	/**
	 * @param {any[]} cur
	 * @param {any[]} format_list
	 */
	static parse_current_instruction(cur, format_list) {
		let arg_loc = 1;
		let arg = cur[arg_loc];
		while(arg) {
			if(arg.slice(0, 3) === 'int')
				this.parse_int_arg(cur, arg_loc);
			if(arg.includes('%')) {
				let res = this.parse_string_with_format_ident(arg, format_list);
				cur[arg_loc] = res;
			}
			arg_loc++;
			arg = cur[arg_loc];
		}
	}
	/**
	 * @param {string[]} m
	 */
	static raw_parse_handle_regexp_match(m) {
		let iter = m[1].trim();
		if(iter.startsWith("//"))
			return;
		while(iter.startsWith("/*")) {
			let j = iter.indexOf("*/");
			iter = iter.slice(j + 2).trim();
		}
		if(!iter)
			return null;
		return iter.split(",");
	}
	/**
	 * @param {string} string
	 */
	static parse_string_into_raw_instruction_stream(string) {
		const parser_max_match_iter = 300; let parts, arr = [], i = 0;
		do {
			parts = this.match_regex.exec(string);
			if(!parts)
				break;
			let res = this.raw_parse_handle_regexp_match(parts);
			if(res)
				arr.push(res);
		} while(parts && i++ < parser_max_match_iter);
		if(parts)
			console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
		return arr;
	}
	/**
	 * @param {string} string
	 * @param {any[]} format_list
	 */
	static parse_instruction_stream_from_string(string, format_list) {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0; i < raw_instructions.length; i++) {
			let raw_instruction = raw_instructions[i];
			this.parse_current_instruction(raw_instruction, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions); return instructions;
	}
	/**@arg {string[]} instruction @returns {InstructionType}*/
	static verify_instruction(instruction) {
		let num_to_parse = instruction.length;
		/**@type {InstructionType|null} */
		let ret = null;
		switch(instruction[0]) {
			case 'push': {
				num_to_parse = 0;
				const [, ...push_operands] = instruction;
				ret = [instruction[0], ...push_operands];
			} break;
			case 'call' /*1 argument*/: {
				if(typeof instruction[1] === 'number' && Number.isFinite(instruction[1])) {
					num_to_parse -= 2;
					ret = [instruction[0], instruction[1]];
				} else {
					console.info("Operand is", instruction[1]);
					throw new Error("Invalid operand");
				}
			} break;
			case 'cast': {
				let m_arg = instruction[1];
				switch(m_arg) {
					case 'object_index':
					case 'object_index_to_function':
					case 'vm_function':
						num_to_parse -= 2;
						ret = [instruction[0], m_arg];
				}
				if(num_to_parse === 0)
					break;
				throw new Error("Assertion failed: cast operand `" + m_arg + "` is invalid");
			}
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'vm_push_args':
			case 'vm_push_self':
			case 'push_global_object':
			case 'breakpoint' /*opcode*/: {
				num_to_parse--;
				ret = [instruction[0]];
			} break;
			default: throw new Error("Verify: Unexpected opcode, opcode was `" + instruction[0] + "`");
		}
		if(num_to_parse > 0)
			throw new Error("Typechecking failure, data left when processing raw instruction stream");
		if(ret !== null) {
			return ret;
		}
		not_reached();
	}
	/** @arg {string[][]} raw_instructions @return {InstructionType[]} */
	static verify_raw_instructions(raw_instructions) {
		/**@type{InstructionType[]}*/
		const instructions = [];
		for(let i = 0; i < raw_instructions.length; i++) {
			instructions.push(this.verify_instruction(raw_instructions[i]));
		}
		return instructions;
	}
}
