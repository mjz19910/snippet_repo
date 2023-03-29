import {clone_object} from "./clone_object.js"

export function clone_null_proto_object<T>(value: T): T {
	let obj=clone_object(value)
	Object.setPrototypeOf(obj,null)
	return obj
}
