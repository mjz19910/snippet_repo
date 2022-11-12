import {RegIdFunction} from "./RegIdFunction.js"
import {AnyFunction} from "./AnyFunction.js"

export function has_reg_id(v: AnyFunction): v is RegIdFunction {
	if(v.hasOwnProperty('reg_id')) {
		return true
	}
	return false
}
