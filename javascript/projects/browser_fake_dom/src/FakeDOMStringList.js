import {Badge} from "./Badge.ts/index.js"
import {error_factory} from "./error_factory.js/index.js"
export class FakeDOMStringList extends Array {
	/**@type {{[x:string|number]:any} & string[]} */
	#strings=[]
	constructor(dom_impl_badge=new Badge) {
		super()
		if(!dom_impl_badge.is_valid()) {
			throw error_factory.createIllegalConstructorError()
		}
	}
	/**
	 * @param {string[]} value
	 */
	setBackingArray(dom_impl_badge=new Badge,value) {
		if(!dom_impl_badge) {
			throw new Error("no badge")
		}
		for(let i=0;i<value.length;i++) {
			this[i]=value
		}
		this.#strings=value
	}
	/**
	 * @param {string} v
	 */
	contains(v) {
		return this.#strings.indexOf(v)!=-1
	}
	/**
	 * @param {string | number} v
	 */
	item(v) {
		return this.#strings[v]
	}
	[Symbol.toStringTag]="DOMStringList"
	[Symbol.iterator]=Array.prototype.values.bind(this.#strings)
	get length() {
		return this.#strings.length
	}
}
