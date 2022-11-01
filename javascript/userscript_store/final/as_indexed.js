import {can_cast_indexed} from "./can_cast_indexed";

/** @type {<T extends {}>(...v:[T, keyof T])=>T|null} */
export function as_indexed(value) {
	if(can_cast_indexed(value)) {
		return value;
	}
	return null;
}
