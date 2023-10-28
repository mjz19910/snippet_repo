/** @type {<T extends unknown[]>(...val_arr: T)=>["lit_value",T]} */
export function lit_value(...val_arr) {
	return ['lit_value', ...val_arr];
}
