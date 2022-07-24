import {Box} from "../Box"
import {is_box_object} from "./is_box_object"
export function is_box<T>(v: Box | T): v is Box {
	let bb = v
	let rest = typeof bb
	switch(rest) {case 'bigint': return true}
	switch(rest) {case 'boolean': return true}
	switch(rest) {case 'function': {return false}}
	switch(rest) {case 'number': return true}
	switch(rest) {
		case 'object': {
			return is_box_object(v)
		}
	}
	switch(rest) {case 'string': return true;}
	switch(rest) {case 'symbol': return true;}
	switch(rest) {case 'undefined': return true;}
}
