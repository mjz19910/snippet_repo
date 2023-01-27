/** @template T @arg {T} x @returns {NonNullable<T>} */
export function as_nn(x) {
	/** @arg {T} x @returns {x is NonNullable<T>} */
	function assume_nonnull(x) {x; return true;}
	if(!assume_nonnull(x))
		throw 1;
	return x;
}
