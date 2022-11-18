import {IDValueData} from "../types/IDValueData.js";

/**@arg {IDValueBase} next */
export function get_next({next}) {
	if(next===null)
		throw new Error("Unexpected type");
	if(!(next instanceof IDValueData))
		throw new Error("Unexpected type");
	return next;
}
