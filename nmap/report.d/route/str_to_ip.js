/**
 * @arg {string} str
 */
export function str_to_ip(str) {
	return str.split(".").map(e => parseInt(e));
}
