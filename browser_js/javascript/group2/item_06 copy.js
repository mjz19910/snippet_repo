{
	/** @template U @template {U} T @arg {U} e @returns {T} */
	function as_cast(e) {
		/** @type {any} */
		let x=e;
		return x;
	}
	let orig_asm_fn = setTempRet0;
	if("__overwritten__" in orig_asm_fn) {
		orig_asm_fn = as_cast(orig_asm_fn.__overwritten__);
	}
	/** @arg {any} a1 */
	function call_orig_fn(a1) {
		console.log('setTempRet0 ::', a1);
		orig_asm_fn(a1);
	}
	call_orig_fn.__overwritten__ = orig_asm_fn;
	setTempRet0 = call_orig_fn;
}
