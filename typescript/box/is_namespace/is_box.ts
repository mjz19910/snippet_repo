import {Box} from "../Box"
import {eat_never} from "../helper/eat_never"
import {cast} from "../helper/cast"
import {eat_type} from "../helper/eat_type"
import {is_box_object} from "./is_box_object"

export function is_box<T>(v: Box|T): v is Box {
	switch(typeof v) {
		case 'bigint': return true
		case 'boolean': return true
		case 'function': return false
		case 'number': return true
		case 'object': return is_box_object(v)
		case 'string': return true
		case 'symbol': return true
		case 'undefined': return true
	}
	if(cast<T>(v)) return eat_type(v)
	return eat_never(v)
}
