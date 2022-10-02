/**@implements {EventTarget} */
export class FakeEventTarget {
	/**@type {{[x:string]:{t: string | number;fn: any}[]}} */
	#listeners={}
	#private
	/**
	 * @param {any} private_data
	 */
	constructor(private_data) {
		this.#private=private_data
		this.#private
	}
	/**
	 * @param {string | number} e
	 * @param {any} fn
	 */
	addEventListener(e,fn) {
		if(this.#listeners[e]) {
			this.#listeners[e].push({t: e,fn: fn})
		} else {
			this.#listeners[e]=[{t: e,fn: fn}]
		}
	}
	/**
	 * @param {string | number} e
	 * @param {any} fn
	 */
	removeEventListener(e,fn) {
		if(this.#listeners[e]) {
			this.#listeners[e].findIndex(v => v.t==e&&v.fn==fn)
		}
	}
	/**
	 * @param {{ type: string | number; }} event
	 */
	dispatchEvent(event) {
		console.log('EventTarget: start dispatchEvent with',event)
		var lis_type=this.#listeners[event.type]
		if(lis_type) {
			for(let j of lis_type) {
				console.log('EventTarget: process listener in dispatchEvent with value',j)
			}
		}
		return false
	}
}
