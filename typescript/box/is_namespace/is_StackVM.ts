import {StackVM} from "../../vm/StackVM.js"
import {cast2} from "../helper/cast2.js"

export function is_StackVM<T>(value: T|StackVM): value is StackVM {
	if(value===null) return false
	if(!cast2<any,StackVM>(value)) return false
	if(!value.stack)
		return false
	if(!value.pop_arg_count)
		return false
	return true
}
