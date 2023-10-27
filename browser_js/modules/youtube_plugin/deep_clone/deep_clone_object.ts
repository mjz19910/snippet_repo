// deno-lint-ignore-file
import {clone_object} from "./clone_object.ts"
import {Seen} from "./Seen.ts"
import {realHTMLElement} from "./realHTMLElement.ts"
import {clone_null_proto_object} from "./clone_null_proto_object.ts"
import {clone_map} from "./clone_map.ts"
import {clone_array} from "./clone_array.ts"

export function deep_clone_object<T extends {}|any[]|Map<any,any>|null>(value: T): T {
	// check for null, it is a primitive
	if(value===null) return value
	if(value instanceof Array) return clone_array(value)
	if(value instanceof Map) return clone_map(value)
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
	// if(!had_func)console.log('proto', str, create.toString().slice(0, 32), create.toString().length)
	return seen_obj
}
