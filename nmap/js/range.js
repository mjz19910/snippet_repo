/** @type {<T extends any[]>(...ranges:T[])=>import("./types/rangeT.js").rangeT<T[]>} */
export function range(...ranges) {
	return ['range', ...ranges];
}
