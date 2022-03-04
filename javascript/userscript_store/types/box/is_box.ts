import {Box} from "./Box";

export function is_box<T>(v: Box | T): v is Box {
	let bb = v;
	let rest = typeof bb;
	switch(rest) {
		case 'bigint': return true;
	}
	switch(rest) {case 'boolean': return true;}
	switch(rest) {
		case 'function': {
			// TODO: figure out how to get the arguments the fn could take
			// TODO: scan all the properties of the global object and objects attached to the
			// global object to find and validate that a certain function takes
			// the right arguments (by memorizing the types from compile time)
			return false;
		}
	}
	switch(rest) {case 'number': return true;}
	switch(rest) {
		case 'object': {
			// TODO
			console.error("todo", bb);
			return false;
		}
	}
	switch(rest) {case 'string': return true;}
	switch(rest) {case 'symbol': return true;}
	switch(rest) {case 'undefined': return true;}
}
