import {Box} from "../Box"
import {assert_type} from "../helper/assert_type"
import {cast} from "./cast"
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
	if(cast<T>(v)) {
		console.log('chk', v);
		return false
	}
	assert_type<never>(v)
	return false
}
