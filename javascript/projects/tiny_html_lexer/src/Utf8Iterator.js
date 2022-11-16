
export class Utf8Iterator {
	/** @param {{ pos: number; }} new_iterator */
	sub(new_iterator) {
		return this.pos-new_iterator.pos;
	}
	/**@arg {number} pos */
	constructor(pos) {
		this.pos=pos;
	}
}
