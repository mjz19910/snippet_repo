import {Seen} from "./Seen"
import {clone_map} from "./clone_map"
import {clone_array} from "./clone_array"
import {is_object} from "./is_object"
import {deep_clone_object} from "./deep_clone_object"

export function deep_clone<T>(value: T): T {
	if(value===null) return value
	switch(typeof value) {
		case 'function': {
			if(value.name in window) {
				debugger
			}
			return Seen.as_callable(value)
		}
	}
	if(is_object(value)) {
		if(value instanceof Array)
			return clone_array(value) as T
		if(value instanceof Map)
			return clone_map(value) as T
		return deep_clone_object(value)
	}
	switch(typeof value) {case 'bigint': return value}
	switch(typeof value) {case 'boolean': return value}
	switch(typeof value) {case 'number': return value}
	switch(typeof value) {case 'string': return value}
	switch(typeof value) {case 'symbol': return value}
	switch(typeof value) {case 'undefined': return value}
}
