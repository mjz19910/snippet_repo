import {CastResult} from "./CastResult.js/index.js"
import {FakeNode} from "./FakeNode.js"
import {Result} from "./Result.js"
// FakeHTMLElement -> [./FakeElement.js -> [./Element.js, ./api/CastResult.js], ./FakeDocument.js]
export class FakeElement extends FakeNode {
	tag_description={}
	/**@type {{get?: (arg0: any) => any;set?: (arg0: any, arg1: {}) => void;}} */
	#prototype={}
	/**@type {{}|undefined} */
	base
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 * @param {any} value
	 */
	static #private_set=(obj,name,value) => {
		obj.#instance_private_set(name,value)
	}
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 */
	static #private_get=(obj,name) => {
		return obj.#instance_private_get(name)
	}
	/**
	 * @param {{ base_object: any; proto_private: { get?: (n: any) => any; set?: (n: any, v: any) => void; }; }} rin
	 */
	constructor(rin) {
		/**@type {{proto_private:{get?: (n: any) => any;set?: (n: any, v: any) => void;}}} */
		var x={proto_private: {}}
		super(x)
		if(!rin.base_object&&x.proto_private) {
			this.#instance_private_set('prototype',x.proto_private)
		} else {
			this.#instance_private_set('prototype',{})
		}
		rin.proto_private={
			get: FakeElement.#private_get.bind(FakeElement,this),
			set: FakeElement.#private_set.bind(FakeElement,this)
		}
	}
	/**
	 * @param {'prototype'} n
	 */
	#instance_private_get=(n) => {
		switch(n) {
			case 'prototype':
				return this.#prototype
			default:
				if(this.#prototype.get) {
					return this.#prototype.get(n)
				}
		}
	}
	/**
	 * @param {'prototype'} n
	 * @param {{}} v
	 */
	#instance_private_set=(n,v) => {
		switch(n) {
			case 'prototype':
				this.#prototype=v
				break
			default:
				if(this.#prototype.set) {
					this.#prototype.set(n,v)
				}
				break
		}
	}
	/**
	 * @param {string} tag_name
	 */
	is_tag(tag_name) {
		console.debug("tag name not handled in is_tag",tag_name)
		return true
	}
	/**
	 * @param {"html"} tag_name
	 * @returns {CastResult | Result}
	 */
	castNodeTo(tag_name) {
		switch(tag_name) {
			case 'html': if(this.is_tag(tag_name)) {
				/**@type {any}*/
				let cast_as=this
				let cast_res=cast_as
				return new CastResult(cast_res)
			}
			default: return new Result
		}
	}
}
