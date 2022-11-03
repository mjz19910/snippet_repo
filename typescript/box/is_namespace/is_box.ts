import {Box} from "../Box.js"
import {assume_is_never} from "../helper/assume_is_never.js"
import {cast} from "../helper/cast.js"
import {eat_type} from "../helper/eat_type.js"
import {is_box_object} from "./is_box_object.js"

export function is_box<T>(v: Box|T): v is Box {
	switch(typeof v) {
		case 'bigint': return true
		case 'boolean': return true
		case 'function': return false
		case 'number': return true
		case 'object':{
			if(v === null) return true;
			return is_box_object(v);
		}
		case 'string': return true
		case 'symbol': return true
		case 'undefined': return true
	}
	if(cast<T>(v)) return eat_type(v)
	return assume_is_never(v)
}
