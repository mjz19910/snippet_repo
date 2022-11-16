/**@template T */
export class CppArray {
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
}
