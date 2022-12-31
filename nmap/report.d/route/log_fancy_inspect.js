import {inspect} from "util";
/** @arg {any} obj */
export function log_fancy_inspect(obj) {
	console.log(inspect(obj, {colors: true, breakLength: 180})
		.replaceAll(", ", ",\t"));
}
