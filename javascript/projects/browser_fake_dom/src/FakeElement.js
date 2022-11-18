export class FakeElement {
	tag_description={};
	/**@type {{get?: (arg0: any) => any;set?: (arg0: any, arg1: {}) => void;}} */
	#prototype={};
	/**@type {{}|undefined} */
	base;
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 * @param {any} value
	 */
	static #private_set=(obj,name,value) => {
		obj.#instance_private_set(name,value);
	};
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 */
	static #private_get=(obj,name) => {
		return obj.#instance_private_get(name);
	};
	/**
	 * @param {{ base_object: any; proto_private: { get?: (n: any) => any; set?: (n: any, v: any) => void; }; }} rin
	 */
	constructor(rin) {
		this.#instance_private_set('prototype',{});
		rin.proto_private={
			get: FakeElement.#private_get.bind(FakeElement,this),
			set: FakeElement.#private_set.bind(FakeElement,this)
		};
	}
	/**
	 * @param {'prototype'} n
	 */
	#instance_private_get=(n) => {
		switch(n) {
			case 'prototype':
				return this.#prototype;
			default:
				if(this.#prototype.get) {
					return this.#prototype.get(n);
				}
		}
	};
	/**
	 * @param {'prototype'} n
	 * @param {{}} v
	 */
	#instance_private_set=(n,v) => {
		switch(n) {
			case 'prototype':
				this.#prototype=v;
				break;
			default:
				if(this.#prototype.set) {
					this.#prototype.set(n,v);
				}
				break;
		}
	};
	/**
	 * @param {string} tag_name
	 */
	is_tag(tag_name) {
		console.debug("tag name not handled in is_tag",tag_name);
		return true;
	}
}
