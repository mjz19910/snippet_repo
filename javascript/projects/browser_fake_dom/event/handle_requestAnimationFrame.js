/**
 * @param {typeof globalThis.setTimeout} setTimeout
 * @returns {(func:FrameRequestCallback)=>number}
 */
export function handle_requestAnimationFrame(setTimeout) {
	/**@type {any} */
	let av=function(/** @type {() => void} */ func) {
		return setTimeout(func)
	}
	return av
}
