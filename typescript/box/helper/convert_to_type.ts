import {cast2} from "./cast2.js"

export function convert_to_type<T,U>(v: T|U): U {
	if(cast2<T,U>(v))return v
	throw new Error("conversion failure")
}
