/**
 * @param {number} ms
 */
export function wait(ms) {
	return new Promise(function(a,_r) {
		setTimeout(a,ms)
	})
}
