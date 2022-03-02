import VoidBox from "types/vm/box/VoidBox.js";
import {BaseBox} from "./BaseBox";
import {throw_unreachable_error} from "./throw_unreachable_error";

/**@typedef {import("api").NonNull<BoxInner>} NonNullInner */
/**@typedef {import("types/vm/instruction/mod.js").InstructionType} InstructionType */
/**@typedef {import("types/vm/box/ExtractKey").default<Box, 'value'>} BoxInner */
export class TempBox extends BaseBox {
	/**
	 * @arg {Box} v
	 * @returns {v is import("types/vm/mod.js").Primitives}
	*/
	static is_raw(v) {
		if(v === null)
			return true;
		switch(typeof v) {
			case 'object': return false;
			case 'function': return false;
			default: v; return true;
		}
	}
	/**
	 * @arg {Box} v
	 * @returns {v is {value:BoxInner}}
	 * */
	static is_box_inner(v) {
		switch(typeof v) {
			case 'object':
				if(v === null)
					return false;
				return true;
		}
		return false;
	}
	/**@arg {Box} v */
	static make_box(v) {
		if(this.is_box_inner(v)) {
			return v;
		}
		if(typeof v === 'function')
			return new this(v);
		if(typeof v === 'object') {
			if(v === null)
				return v;
		}
		throw_unreachable_error();
	}
	/**@type {NonNullInner|null} */
	m_as_box;
	/**@arg {NonNullInner} value */
	constructor(value) {
		if(value === null) {
			super(new VoidBox);
			this.m_as_box = value;
		} else {
			super(value);
			this.m_as_box = null;
		}
	}
}
