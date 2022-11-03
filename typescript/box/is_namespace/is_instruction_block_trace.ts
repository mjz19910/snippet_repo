import {VMBlockTrace} from "../../vm/instruction/vm/VMBlockTrace.js";
import {assume_is_never as assume_is_never} from "../helper/assume_is_never.js";
import {assume_is_number} from "./assume_is_number.js";
import {is_null} from "./is_null.js";
import {assume_is_dom_tagged_pack} from "./assume_is_dom_tagged_pack.js";
import {assume_is_dom_instruction_type} from "./assume_is_dom_instruction_type.js";

export function is_instruction_block_trace<T>(value: T|VMBlockTrace): value is VMBlockTrace {
	if(!(value instanceof Array)) return false;
	switch(value[1]) {
		case 'block': return value.length===4&&assume_is_number(value[2])&&assume_is_number(value[3]);
		case 'begin':
		case 'call': {
			if(is_null(value[2]))
				return true;
			if(assume_is_dom_instruction_type(value[2]))
				return true;
			return false;
		}
		case 'tagged':
		case 'tagged_begin':
		case 'tagged_call': {
			const [,,tag_pack]=value;
			if(is_null(tag_pack)) return true;
			return assume_is_dom_tagged_pack(tag_pack);
		}
		default: return assume_is_never(value);
	}
}

