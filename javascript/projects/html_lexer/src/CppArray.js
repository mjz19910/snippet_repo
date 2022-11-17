/**@template T */
export class CppVector {
    /** @param {T} arg0 */
    empend(arg0) {
		this.inner.push(arg0);
    }
	clear_with_capacity() {
		this.inner.length=0;
	}
	/**
	 * @param {T} value
	 */
	append(value) {
		this.inner.push(value);
	}
	last() {
		let last_val=this.inner.at(-1);
		if(!last_val) {
			throw new Error("Underflow");
		}
		return last_val;
	}
	/** @param {number} arg0 */
	at(arg0) {
		let value=this.inner.at(arg0);
		if(!value) throw new Error("Out of range");
		return value;
	}
	size() {
		return this.inner.length;
	}
	/**@type {T[]} */
	inner=[];
	is_empty() {
		return this.inner.length===0;
	}
	take_last() {
		this.inner.pop();
	}
	[Symbol.iterator]() {
		return this.inner[Symbol.iterator]();
	}
}
