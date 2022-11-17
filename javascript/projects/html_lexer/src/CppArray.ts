export class CppVector<T> extends Array<T> {
    clear() {
        throw new Error("Method not implemented.");
    }
    /** @param {T} arg0 */
    empend(arg0: T) {
		this.push(arg0);
    }
	clear_with_capacity() {
		this.length=0;
	}
	/** @param {T} value */
	append(value: T) {
		this.push(value);
	}
	last() {
		let last_val=this.at(-1);
		if(!last_val) {
			throw new Error("Underflow");
		}
		return last_val;
	}
	size() {
		return this.length;
	}
	is_empty() {
		return this.length===0;
	}
	take_last() {
		this.pop();
	}
}
