import {Seen} from "./Seen.js"
import {deep_clone_object} from "./deep_clone_object.js"
import {log_value} from "./log_value.js"

export function deep_clone<T>(value: T): T {
	switch(typeof value) {
		case 'function': {
			if(value.name in window) {
				debugger
			}
			return Seen.as_callable(value)
		}
		case 'object': return deep_clone_object(value)
		case 'bigint': return value
		case 'boolean': return value
		case 'number': return value
		case 'string': return value
		case 'symbol': return value
		case 'undefined': return value
		default: return log_value(value)
	}
}
