import {NonNull} from "../../../api"
import {Box} from "../../../box/Box"
import {ExtractKey} from "../../../box/ExtractKey"
import {Primitives} from "../../../box/helper/Primitives"
import {RealVoidBox} from "../../../box/RealVoidBox"
import {VoidBox} from "../../../box/VoidBox"
import {BaseBox} from "./BaseBox"
import {throw_unreachable_error} from "./throw_unreachable_error"

/**@no_typedef {import("api").NonNull<BoxInner>} NonNullInner */
/**@no_typedef {import("types/vm/instruction/mod.js").InstructionType} InstructionType */
/**@no_typedef {import("types/vm/box/ExtractKey").default<import("types/vm/box/Box.js").Box, 'value'>} BoxInner */
type generic_box_with_value_out={value: NonNull<ExtractKey<Box,'value'>>}
type generic_box_with_value_in=Primitives|null|generic_box_with_value_out
export class TempBox extends BaseBox {
	static is_raw(v: Box): v is Primitives {
		if(v===null)
			return true
		switch(typeof v) {
			case 'object': return false
			case 'function': return false
			default: v; return true
		}
	}
	static is_box_inner(v: generic_box_with_value_in): v is generic_box_with_value_out {
		switch(typeof v) {
			case 'object':
				if(v===null)
					return false
				return true
		}
		return false
	}
	static make_box(v: Box): TempBox|Box {
		if(this.is_box_inner(v)) {
			return v
		}
		if(typeof v==='function')
			return new this(v)
		if(typeof v==='object') {
			if(v===null)
				return v
		}
		throw_unreachable_error()
	}
	m_as_box: NonNull<ExtractKey<Box,'value'>>|null
	constructor(value: NonNull<ExtractKey<Box,'value'>>|null) {
		if(value===null) {
			super(new VoidBox)
			this.m_as_box=value
		} else if(value===void 0) {
			super(new RealVoidBox)
		} else {
			super(value)
			this.m_as_box=null
		}
	}
}
