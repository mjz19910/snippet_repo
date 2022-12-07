import {CompressStateBase} from "./CompressStateBase.js";

/**@template T @template U @extends {CompressStateBase<T,U>} */
export class CompressState extends CompressStateBase {
	/** @type {T|null} */
	item;
	/** @param {T[]} arr */
	constructor(arr) {
		super(0,arr,[]);
		this.item=null;
	}
}
