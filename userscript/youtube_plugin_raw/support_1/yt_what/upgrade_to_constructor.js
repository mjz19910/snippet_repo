/** @template T @arg {T} x @returns {T&{new (): unknown}} */
export function upgrade_to_constructor(x) {
	/** @arg {T} x @returns {x is T&{new (): unknown}} */
	function is_upgrade_type(x) {return x!==null;}
	if(!is_upgrade_type(x))
		throw 1;
	return x;
}
