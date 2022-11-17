/**@template T @template U */
export class CompressState {
	i=0;
	/** @type {T[]} */
	arr;
	/** @type {T|null} */
	item;
	/** @type {U[]} */
	ret;
	/** @param {T[]} arr */
	constructor(arr) {
		this.arr=arr;
		this.item=null;
		this.ret=[];
	}
}
