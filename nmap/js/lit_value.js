/** @type {<T extends any[]>(...val_arr: T)=>import("./types/lit_valueT.js").lit_valueT<T>} */
export function lit_value(...val_arr) {
	return ['lit_value', ...val_arr];
}
