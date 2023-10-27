/** @type {<T extends unknown[]>(...ranges:T[])=>import("./types/rangeT.js").rangeT<T[]>} */
export function range(...ranges) {
	return ['range', ...ranges];
}
