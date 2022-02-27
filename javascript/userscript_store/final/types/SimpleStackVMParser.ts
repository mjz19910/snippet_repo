import {InstructionType} from "types/vm/instruction/mod";

export class SimpleStackVMParser {
	static match_regex = /(.+?)(;|$)/gm;
	static parse_int_arg(cur: string[] | number[], arg_loc: number) {
		let cur_item = cur[arg_loc];
		if(typeof cur_item == 'string') {
			let arg: string = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int: string = arg.slice(4, -1);
				cur[arg_loc] = parseInt(str_int, 10);
			}
		}
	}
	static parse_string_with_format_ident(str: string | string[], format_list: any[]) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				return format_list.shift();
			default:
				console.log("%s", 'unsupported format spec %' + format_type);
		}
	}
	static parse_current_instruction(cur: any[], format_list: any) {
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
	static raw_parse_handle_regexp_match(match_parts: string[]) {
		if(!match_parts)
			return;
		let str_data = match_parts[1].trim();
		if(str_data.startsWith("//"))
			return;
		while(str_data.startsWith("/*")) {
			let com_end = str_data.indexOf("*/");
			str_data = str_data.slice(com_end + 2).trim();
		}
		if(!str_data)
			return;
		return str_data.split(",");

	}
	static parse_string_into_raw_instruction_stream(string: string) {
		const parser_max_match_iter = 300;
		let parts, arr = [], i = 0;
		do {
			parts = this.match_regex.exec(string);
			if(!parts)
				break;
			let res = this.raw_parse_handle_regexp_match(parts);
			if(res)
				arr.push(res);
		} while(i++ < parser_max_match_iter);
		if(parts) {
			console.assert(false, 'SimpleStackVM Parser: Iteration limit exceeded (limit=%o)', parser_max_match_iter);
		}
		return arr;
	}
	static parse_instruction_stream_from_string(string: string, format_list: ((err: any) => void)[]): InstructionType[] {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0;i < raw_instructions.length;i++) {
			let cur = raw_instructions[i];
			this.parse_current_instruction(cur, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions);
		return instructions;
	}
	static cook_instruction(instruction: string[], left: [number]): InstructionType {
		const [m_opcode, ...m_parameters] = instruction;
		switch(m_opcode) {
			// variable argument count
			case 'push':
				left[0] = 0;
				return [m_opcode, ...m_parameters];
			// 2 arguments
			case 'call': {
				if(typeof m_parameters[0] === 'number') {
					left[0] -= 2;
					return [m_opcode, m_parameters[0]];
				} else {
					throw new Error("TypeError: Call argument is not parameter count");
				}
			}
			// one argument
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'push_args':
			case 'this':
			case 'global':
			case 'breakpoint':
				left[0]--;
				return [m_opcode];
			default:
				console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_parameters);
				throw new Error("Unexpected opcode when cooking instructions");
		}
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[] = [];
		for(let i = 0;i < raw_instructions.length;i++) {
			const instruction = raw_instructions[i];
			const left: [number] = [instruction.length];
			const cooked_instruction = this.cook_instruction(instruction, left);
			instructions.push(cooked_instruction);
			if(left[0] > 0) {
				throw new Error("Typechecking failure, data left when processing raw instruction stream");
			}
		}
		return instructions;
	}
}
