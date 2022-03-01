import {InstructionType} from "./types/vm/instruction/mod";
import {Box} from "./types/vm/box/Box";
import {FormattableTypes} from "./FormattableTypes";

export class SimpleStackVMParser {
	static match_regex=/(.+?)(;|$)/gm;
	/**@arg {string[] | number[]} cur @arg {number} arg_loc*/
	static parse_int_arg(cur_item: string | number) {
		if(typeof cur_item == 'string') {
			let arg = cur_item;
			if(arg[3] === '()'[0] && arg.at(-1) === "()"[1]) {
				let str_int = arg.slice(4, -1);
				return parseInt(str_int, 10);
			}
		}
	}
	static parse_string_with_format_ident(str: string, format_list: FormattableTypes[]) {
		let format_index = str.indexOf('%');
		let format_type = str[format_index + 1];
		switch(format_type) {
			case 'o':
				let obj = format_list.shift();
				if(!obj)
					throw new Error("Format list underflow");
				return obj;
			default:
				console.log("%s", 'unsupported format spec %' + format_type);
		}
	}
	static parse_current_instruction(cur: (number | string | ((err: Box) => void))[], format_list: FormattableTypes[]) {
		let arg_loc = 1;
		let arg = cur[arg_loc];
		while(arg) {
			if(typeof arg != 'string') {
				arg_loc++;
				arg = cur[arg_loc];
				continue;
			}
			if(arg.slice(0, 3) === 'int') {
				let int_res = this.parse_int_arg(arg);
				if(!int_res)
					throw new Error("Failed to parse int");
				cur[arg_loc] = int_res;
			}
			if(arg.includes('%')) {
				let res = this.parse_string_with_format_ident(arg, format_list);
				if(!res)
					throw new Error("Failed to parse format ident");
				cur[arg_loc] = res;
			}
			arg_loc++;
			arg = cur[arg_loc];
		}
	}
	static raw_parse_handle_regexp_match(m: string[]) {
		let iter = m[1].trim();
		if(iter.startsWith("//"))
			return [];
		while(iter.startsWith("/*")) {
			let j = iter.indexOf("*/");
			iter = iter.slice(j + 2).trim();
		}
		if(!iter)
			return [];
		return iter.split(",");
	}
	static parse_string_into_raw_instruction_stream(string: string): string[][] {
		const parser_max_match_iter = 390;
		let parts: RegExpExecArray | null, arr: string[][] = [], i = 0;
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
	static parse_instruction_stream_from_string(string: string, format_list: FormattableTypes[]) {
		let raw_instructions = this.parse_string_into_raw_instruction_stream(string);
		for(let i = 0;i < raw_instructions.length;i++) {
			let raw_instruction = raw_instructions[i];
			this.parse_current_instruction(raw_instruction, format_list);
		}
		let instructions = this.verify_raw_instructions(raw_instructions); return instructions;
	}
	static verify_instruction(instruction: string[], left: [number]): InstructionType {
		const [m_opcode, ...m_operands] = instruction;
		switch(m_opcode) {
			// variable argument count
			case 'push':
				left[0] = 0;
				return [m_opcode, ...m_operands];
			case 'call' /*1 argument*/:
				left[0] -= 2;
				if(typeof m_operands[0] === 'number' && Number.isFinite(m_operands[0]))
					return [m_opcode, m_operands[0]];
				else {
					console.info("Can't verify that call instruction is valid, argument (%o) is not a number or not finite", m_operands[0]);
					throw new Error("TypeError: Invalid argument");
				}
			case 'drop':
			case 'get':
			case 'return':
			case 'halt':
			case 'push_args':
			case 'this':
			case 'global':
			case 'breakpoint' /*opcode*/:
				left[0]--;
				return [m_opcode];
			default:
				console.info("Info: opcode=%o instruction_parameters=%o", m_opcode, m_operands);
				throw new Error("Unexpected opcode");
		}
	}
	static verify_raw_instructions(raw_instructions: string[][]): InstructionType[] {
		const instructions: InstructionType[] = [];
		for(let i = 0;i < raw_instructions.length;i++) {
			const instruction = raw_instructions[i];
			const left: [number] = [instruction.length];
			const valid_instruction = this.verify_instruction(instruction, left);
			instructions.push(valid_instruction);
			if(left[0] > 0)
				throw new Error("Typechecking failure, data left when processing raw instruction stream");
		}
		return instructions;
	}
}
