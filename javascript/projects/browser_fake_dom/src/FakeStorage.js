import {Badge} from "./Badge.ts"

/**@implements {Storage} */
export class FakeStorage {
	/**
	 * @param {FakeStorage} storage
	 * @param {Badge} badge
	 */
	static getStorageType(storage,badge) {
		if(
			badge instanceof Badge&&
			badge.is_valid()&&
			storage instanceof this
		) {
			return storage.getType(badge)
		}
		return null
	}
	#type
	/**@type {{[x:string]:any}} */
	#store={}
	#active=new Set
	/**@type {string[]} */
	#key_order=[]
	/**@arg {string} type */
	constructor(type) {
		this.#type=type
	}
	/**
	 * @param {string | number} n
	 */
	getItem(n) {
		if(this.#active.has(n)) {
			return this.#store[n]
		}
	}
	/**
	 * @param {string | number} n
	 * @param {any} v
	 */
	setItem(n,v) {
		let key=""+n
		this.#active.add(key)
		this.#store[key]=v
		this.#key_order.push(key)
	}
	/**
	 * @param {string | number} n
	 */
	removeItem(n) {
		let key=""+n
		this.#active.delete(key)
		this.#store[key]=void 0
		let idx=this.#key_order.indexOf(key)
		this.#key_order.splice(idx,1)
	}
	/**
	 * @param {Badge} badge
	 */
	getType(badge) {
		if(badge instanceof Badge&&badge.is_valid()) {
			return this.#type
		}
		return null
	}
	get length() {
		return this.#active.size
	}
	clear() {
		for(let ent in this.#active.entries()) {
			this.#store[ent]=void 0
		}
		this.#active.clear()
		this.#key_order.length=0
	}
	/**
	 * @param {number} key_index
	 */
	key(key_index) {
		this.#key_order[key_index]
		return null
	}
}
