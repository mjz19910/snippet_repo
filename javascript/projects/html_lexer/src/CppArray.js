/**@template T */
export class CppArray {
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
