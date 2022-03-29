/**
 * @param {boolean} flag
 * @param {any[]} args
 */
export function dbgln_if(flag, ...args) {
	if(flag) {
		// FIXME: parse {} format str
		console.log(...args);
	}
}
