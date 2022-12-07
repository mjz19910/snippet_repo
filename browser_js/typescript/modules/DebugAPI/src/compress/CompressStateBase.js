/**@template T @template U */
export class CompressStateBase {
	/** @type {number} */
	i;
	/** @type {T[]} */
	arr;
	/** @type {U[]} */
	ret;
	/** @arg {number} i @arg {T[]} arr @arg {U[]} ret */
	constructor(i,arr,ret) {
		this.i=i;
		this.arr=arr;
		this.ret=ret;
	}
}
