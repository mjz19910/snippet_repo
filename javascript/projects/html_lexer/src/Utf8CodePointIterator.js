export class Utf8CodePointIterator {
    /** @param {Utf8CodePointIterator} arg0 */
    neq(arg0) {
		return !this.eq(arg0);
    }
	inc() {
		++this.pos;
	}
	/**
	 * @param {Utf8CodePointIterator} other_iter
	 */
	eq(other_iter) {
		return this.pos==other_iter.pos;
	}
	deref() {
		return this.target[this.pos].charCodeAt(0);
	}
	/** @param {{ pos: number; }} new_iterator */
	sub(new_iterator) {
		return this.pos-new_iterator.pos;
	}
	/** @type {string[]} */
	target;
	constructor() {
		this.target=[];
		this.pos=0;
	}
}
