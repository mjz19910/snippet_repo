export class FormData {
	constructor() {
		/**
		 * @type {any[]}
		 */
		this.k=[]
		/**
		 * @type {any[]}
		 */
		this.v=[]
	}
	/**
	 * @param {any} k
	 * @param {any} v
	 */
	append(k,v) {
		this.k.push(k)
		this.v.push(v)
	}
}
