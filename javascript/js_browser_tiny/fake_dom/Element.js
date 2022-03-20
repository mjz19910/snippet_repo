import {CastResult} from "./api/CastResult.js";
import {FakeEventTarget} from "./EventTarget.js";
import {FakeHTMLElement} from "./HTMLElement.js";
import {fake} from "./mod.js";
export class Result {
	has_value() {
		return false;
	}
	/**@returns {{}} */
	release_value() {
		throw new Error("No value");
	}
}
/**@implements {Node} */
class FakeNode extends FakeEventTarget {
	/**@type {NodeListOf<ChildNode>} */
	get childNodes() {
		let oo = {
			length: 0,

			item() {},
			forEach() {},
		};
		/**@type {any} */
		let o_any = oo;
		return o_any;
	};
	/**@returns {ChildNode | null} */
	get firstChild() {
		return null;
	};
	get ownerDocument() {
		if(fake.document === null) throw new Error("Bad");
		return fake.document;
	}
	/**@type {ParentNode|null} */
	get parentNode() {
		return null;
	};
	/**@type {<T extends Node>(node: T) => T} */
	appendChild(node) {
		return node;
	};
	/**@type {<T extends Node>(node: T, child: Node | null) => T} */
	insertBefore(node, child) {
		child;
		return node;
	};
	/**@type {<T extends Node>(child: T) => T} */
	removeChild(child) {
		return child;
	}
	/**@type {string}*/
	get baseURI() {throw new Error("NoImpl");}
	/**@type {boolean}*/
	get isConnected() {throw new Error("NoImpl");}
	/**@type {ChildNode}*/
	get lastChild() {throw new Error("NoImpl");}
	/**@type {ChildNode}*/
	get nextSibling() {throw new Error("NoImpl");}
	/**@type {string}*/
	get nodeName() {throw new Error("NoImpl");}
	/**@type {number}*/
	get nodeType() {throw new Error("NoImpl");}
	/**@type {string}*/
	get nodeValue() {throw new Error("NoImpl");}
	/**@type {HTMLElement}*/
	get parentElement() {throw new Error("NoImpl");}
	/**@type {ChildNode}*/
	get previousSibling() {throw new Error("NoImpl");}
	/**@type {string}*/
	get textContent() {throw new Error("NoImpl");}
	/**@returns {Node}*/
	cloneNode() {throw new Error("NoImpl");}
	/**@returns {number}*/
	compareDocumentPosition() {throw new Error("NoImpl");}
	/**@returns {boolean}*/
	contains() {throw new Error("NoImpl");}
	/**@returns {Node}*/
	getRootNode() {throw new Error("NoImpl");}
	/**@returns {boolean}*/
	hasChildNodes() {throw new Error("NoImpl");}
	/**@returns {boolean}*/
	isDefaultNamespace() {throw new Error("NoImpl");}
	/**@returns {boolean}*/
	isEqualNode() {throw new Error("NoImpl");}
	/**@returns {boolean}*/
	isSameNode() {throw new Error("NoImpl");}
	/**@returns {string}*/
	lookupNamespaceURI() {throw new Error("NoImpl");}
	/**@returns {string}*/
	lookupPrefix() {throw new Error("NoImpl");}
	normalize() {throw new Error("NoImpl");}
	/**@type {<T extends Node>(node:Node,child:T)=>T}*/
	replaceChild() {throw new Error("NoImpl");}
	ELEMENT_NODE = 1;
	ATTRIBUTE_NODE = 2;
	TEXT_NODE = 3;
	CDATA_SECTION_NODE = 4;
	ENTITY_REFERENCE_NODE = 5;
	ENTITY_NODE = 6;
	PROCESSING_INSTRUCTION_NODE = 7;
	COMMENT_NODE = 8;
	DOCUMENT_NODE = 9;
	DOCUMENT_TYPE_NODE = 10;
	DOCUMENT_FRAGMENT_NODE = 11;
	NOTATION_NODE =12;
	DOCUMENT_POSITION_DISCONNECTED = 1;
	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;
	DOCUMENT_POSITION_PRECEDING = 2;
	DOCUMENT_POSITION_FOLLOWING = 4;
	DOCUMENT_POSITION_CONTAINS = 8;
	DOCUMENT_POSITION_CONTAINED_BY = 16;
}

export class FakeElement extends FakeNode {
	tag_description = {};
	/**@type {{get?: (arg0: any) => any;set?: (arg0: any, arg1: {}) => void;}} */
	#prototype = {};
	/**@type {{}|undefined} */
	base;
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 * @param {any} value
	 */
	static #private_set(obj, name, value) {
		obj.#instance_private_set(name, value);
	}
	/**
	 * @arg {FakeElement} obj
	 * @param {any} name
	 */
	static #private_get(obj, name) {
		return obj.instance_private_get(name);
	}
	/**
	 * @param {{ base_object: any; proto_private: { get?: (n: any) => any; set?: (n: any, v: any) => void; }; }} rin
	 */
	constructor(rin) {
		/**@type {{proto_private:{get?: (n: any) => any;set?: (n: any, v: any) => void;}}} */
		var x = {proto_private: {}};
		super(x);
		if(!rin.base_object && x.proto_private) {
			this.#instance_private_set('prototype', x.proto_private);
		} else {
			this.#instance_private_set('prototype', {});
		}
		rin.proto_private = {
			get: FakeElement.#private_get.bind(FakeElement, this),
			set: FakeElement.#private_set.bind(FakeElement, this)
		};
	}
	/**
	 * @param {'prototype'} n
	 */
	instance_private_get(n) {
		switch(n) {
			case 'prototype':
				return this.#prototype;
			default:
				if(this.#prototype.get) {
					return this.#prototype.get(n);
				}
		}
	}
	/**
	 * @param {'prototype'} n
	 * @param {{}} v
	 */
	#instance_private_set(n, v) {
		switch(n) {
			case 'prototype':
				this.#prototype = v;
				break;
			default:
				if(this.#prototype.set) {
					this.#prototype.set(n, v);
				}
				break;
		}
	}
	/**
	 * @param {string} tag_name
	 */
	is_tag(tag_name) {
		console.debug("tag name not handled in is_tag", tag_name)
		return true;
	}
	/**
	 * @param {"html"} tag_name
	 * @returns {CastResult | Result}
	 */
	castNodeTo(tag_name) {
		switch(tag_name) {
			case 'html':if(this.is_tag(tag_name)){
				/**@type {any}*/
				let cast_as=this;
				/**@type {FakeHTMLElement}*/
				let cast_res=cast_as;
				return new CastResult(cast_res);
			}
			default:return new Result;
		}
	}
}
