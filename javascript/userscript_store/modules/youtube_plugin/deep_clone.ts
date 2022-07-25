import {clone_object} from "./clone_object"
import {Seen} from "./Seen"
import {realHTMLElement} from "./const"
import {clone_map} from "./clone_map"
import {clone_array} from "./clone_array"

function clone_null_proto_object<T>(value: T): T {
	let obj=clone_object(value)
	Object.setPrototypeOf(obj,null)
	return obj
}

function deep_clone_object<T extends {}>(value: T): T {
	// check for null, it is a primitive
	if(value===null) return value
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

export function deep_clone<T>(value: T): T {
	if(value === null) return value
	if(value === void 0) return value
	switch(typeof value) {
		case 'bigint': return value
		case 'boolean': return value
		case 'function': {
			if(value.name in window) {
				debugger
			}
			return Seen.as_callable(value)
		}
		case 'number': return value
		case 'object': {
			if(value instanceof Array)
				return clone_array(value) as T
			if(value instanceof Map)
				return clone_map(value) as T
			return deep_clone_object(value)
		}
		case 'string': return value
		case 'symbol': return value
		case 'undefined': return value
	}
	value
	if(typeof value==='object') return deep_clone_object(value)
	// check for boolean values
	if(typeof value==='boolean') return value
	// check for string values
	if(typeof value==='string') return value
	// check for numeric values
	if(typeof value==='number') return value
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
