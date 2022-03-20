/**
 * @returns {Error}
 * @param {(Function | number | any[] | undefined)[]} a
 */
export function no_impl(...a) {
	a;
	return new Error("NoImpl");
}
