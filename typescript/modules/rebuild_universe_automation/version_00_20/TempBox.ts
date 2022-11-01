import {NonNull} from "../../../src/NonNull.js"
import {Box} from "../../../box/Box.js"
import {ExtractKey} from "../../../box/ExtractKey.js"
import {Primitives} from "../../../box/helper/Primitives.js"
import {RealVoidBox} from "../../../box/RealVoidBox.js"
import {VoidBox} from "../../../box/VoidBox.js"
import {BaseBox} from "./BaseBox.js"
import {generic_box_with_value_in} from "./generic_box_with_value_in.js"
import {generic_box_with_value_out} from "./generic_box_with_value_out.js"
import {throw_unreachable} from "./throw_unreachable.js"

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
		throw_unreachable()
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
