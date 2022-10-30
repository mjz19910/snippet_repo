import {Box} from "../Box"
import {BoxExtractType} from "../helper/BoxExtractType"

export function extract_box(v: Box): BoxExtractType {
	let cur=v
	switch(typeof cur) {
		case 'function': throw new Error("What")
		case 'object': if(cur===null)
			return cur
			if(cur.type==='void') {
				throw new Error("Void in arguments to call")
			}
			if(cur.type==='function_box')
				return cur.value
			if(cur.type==='array_box')
				return cur.value
			if(cur.type==='constructor_box')
				return cur.value
			if(cur.type==='custom_box')
				return cur.value
			if(cur.type==='instance_box')
				return cur.value
			if(cur.type==='object_box')
				return cur.value
			if(cur.type==='promise_box')
				return cur.value
			if(cur.type==='shape_box')
				return cur.value
			if(cur.type==='value_box')
				return cur.value
			throw new Error("Unhandled box in un_box_all")
		case 'bigint':
		case 'boolean':
		case 'number':
		case 'string':
		case 'symbol':
		case 'undefined': return cur
		default: throw new Error("Unexpected typeof "+(typeof cur))
	}
}
