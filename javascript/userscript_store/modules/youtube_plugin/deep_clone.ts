import {any} from "./any"
import {clone_array} from "./clone_array"
import {clone_map} from "./clone_map"
import {clone_object} from "./clone_object"
import {Seen} from "./Seen"
import {realHTMLElement} from "./youtube_plugin.user"

export function deep_clone<T>(value: T): T {
	if(typeof value==='object') {
		if(value===null) {
			// null is a primitive
			return value
		}
		if(value instanceof Array) {
			return clone_array(value)
		}
		if(value instanceof Map) {
			/**@type {typeof value}*/
			let copy: typeof value=clone_map(value)
			return copy
		}
		if(Object.getPrototypeOf(value)===null) {
			let obj: T=clone_object(value)
			Object.setPrototypeOf(obj,null)
			return obj
		}
		if(Object.getPrototypeOf(value).constructor===Object) {
			return clone_object(value)
		}
		let create=Object.getPrototypeOf(value).constructor
		let proto=Object.getPrototypeOf(value)
		let str=Object.getPrototypeOf(value).constructor.name
		let seen_obj=Seen.as_instance(value,{
			constructor_tag: Seen.as_constructor(create),
			prototype_tag: Seen.as_any(proto)
		})
		if(create===HTMLVideoElement) {
			// don't recurse into exact dom elements
			return seen_obj
		}
		// was the real one shimmed already
		if(any<HTMLElement&{es5Shimmed?: boolean}>(realHTMLElement).es5Shimmed) {
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
