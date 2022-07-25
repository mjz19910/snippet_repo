import {clone_array} from "./clone_array"
import {clone_map} from "./clone_map"
import {clone_object} from "./clone_object"
import {Seen} from "./Seen"
import {realHTMLElement} from "./const"

function clone_null_proto_object<T>(value: T): T {
	let obj=clone_object(value)
	Object.setPrototypeOf(obj,null)
	return obj
}

export function deep_clone<T>(value: T): T {
	if(typeof value==='object') {
		// check for null, it is a primitive
		if(value===null) return value
		if(value instanceof Array)
			return clone_array(value) as T
		if(value instanceof Map)
			return clone_map(value) as T
		const value_proto=Object.getPrototypeOf(value)
		if(value_proto===null)
			return clone_null_proto_object(value)
		let create=value_proto.constructor
		if(create===void 0||create===null)
			debugger
		if(create===Object)
			return clone_object(value)
		let str=create.name
		let seen_obj=Seen.as_instance(value,{
			constructor_tag: Seen.as_constructor(create),
			prototype_tag: Seen.as_any(value_proto)
		})
		if(create===HTMLVideoElement) {
			// don't recurse into exact dom elements
			return seen_obj
		}
		// was the real one shimmed already
		if((realHTMLElement as {es5Shimmed?: boolean}).es5Shimmed) {
			// the constructor is still non-shimmed
			if(create===realHTMLElement.prototype.constructor) {
				return seen_obj
			}
		}
		if(create===realHTMLElement) {
			return seen_obj
		}
		// you probably want to fix this...
		if(str in window) {
			debugger
		}
		// if(!had_func)console.log('proto', str, create.toString().slice(0, 32), create.toString().length);
		return seen_obj
	}
	if(typeof value==='boolean') {
		// booleans are primitive
		return value
	}
	if(typeof value==='string') {
		// strings are constant
		return value
	}
	if(typeof value==='number') {
		// numbers are constant
		return value
	}
	if(typeof value==='function') {
		if(value.name in window) {
			debugger
		}
		return Seen.as_callable(value)
	}
	if(typeof value==='undefined') {
		// undefined is the signal for a bug.
		debugger
		return value
	}
	console.log('unk',typeof value,value)
	return value
}
