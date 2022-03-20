import {fake} from "fake-dom-browse";
import {FakeEventTarget} from "./EventTarget.js";
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
		if(fake.document === null)throw new Error("Bad");
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
	/**
	 * @type {any}
	 */
	baseURI;
	/**
	 * @type {any}
	 */
	isConnected;
	/**
	 * @type {any}
	 */
	lastChild;
	/**
	 * @type {any}
	 */
	nextSibling;
	/**
	 * @type {any}
	 */
	nodeName;
	/**
	 * @type {any}
	 */
	nodeType;
	/**
	 * @type {any}
	 */
	nodeValue;
	/**
	 * @type {any}
	 */
	parentElement;
	/**
	 * @type {any}
	 */
	previousSibling;
	/**
	 * @type {any}
	 */
	textContent;
	/**
	 * @type {any}
	 */
	cloneNode;
	/**
	 * @type {any}
	 */
	compareDocumentPosition;
	/**
	 * @type {any}
	 */
	contains;
	/**
	 * @type {any}
	 */
	getRootNode;
	/**
	 * @type {any}
	 */
	hasChildNodes;
	/**
	 * @type {any}
	 */
	isDefaultNamespace;
	/**
	 * @type {any}
	 */
	isEqualNode;
	/**
	 * @type {any}
	 */
	isSameNode;
	/**
	 * @type {any}
	 */
	lookupNamespaceURI;
	/**
	 * @type {any}
	 */
	lookupPrefix;
	/**
	 * @type {any}
	 */
	normalize;
	/**
	 * @type {any}
	 */
	replaceChild;
	/**
	 * @type {any}
	 */
	ATTRIBUTE_NODE;
	/**
	 * @type {any}
	 */
	CDATA_SECTION_NODE;
	/**
	 * @type {any}
	 */
	COMMENT_NODE;
	/**
	 * @type {any}
	 */
	DOCUMENT_FRAGMENT_NODE;
	/**
	 * @type {any}
	 */
	DOCUMENT_NODE;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_CONTAINED_BY;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_CONTAINS;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_DISCONNECTED;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_FOLLOWING;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	/**
	 * @type {any}
	 */
	DOCUMENT_POSITION_PRECEDING;
	/**
	 * @type {any}
	 */
	DOCUMENT_TYPE_NODE;
	/**
	 * @type {any}
	 */
	ELEMENT_NODE;
	/**
	 * @type {any}
	 */
	ENTITY_NODE;
	/**
	 * @type {any}
	 */
	ENTITY_REFERENCE_NODE;
	/**
	 * @type {any}
	 */
	NOTATION_NODE;
	/**
	 * @type {any}
	 */
	PROCESSING_INSTRUCTION_NODE;
	/**
	 * @type {any}
	 */
	TEXT_NODE;
}

export class Element extends FakeNode {
	/**@type {any} */
	tag_description;
	/**
	 * @arg {Element} obj
	 * @param {any} name
	 * @param {any} value
	 */
	static #priv_set(obj, name, value) {
		obj.#priv_access_set(name, value);
	}
	/**
	 * @arg {Element} obj
	 * @param {any} name
	 */
	static #priv_get(obj, name) {
		return obj.#priv_access_get(name);
	}
	/**@type {{get?: (arg0: any) => any;set?: (arg0: any, arg1: {}) => void;}} */
	#proto_priv = {};
	/**@type {{}|undefined} */
	base;
	/**
	 * @param {{ base_object: any; proto_private: { get?: (n: any) => any; set?: (n: any, v: any) => void; }; }} rin
	 */
	constructor(rin) {
		/**@type {{proto_private:{get?: (n: any) => any;set?: (n: any, v: any) => void;}}} */
		var x = {proto_private: {}};
		super(x);
		if(!rin.base_object && x.proto_private) {
			this.#priv_access_set('proto_priv', x.proto_private);
		} else {
			this.#priv_access_set('proto_priv', {});
		}
		rin.proto_private = {
			get: Element.#priv_get.bind(Element, this),
			set: Element.#priv_set.bind(Element, this)
		};
	}
	/**
	 * @param {any} n
	 */
	#priv_access_get(n) {
		switch(n) {
			case 'proto_priv':
				return this.#proto_priv;
			default:
				if(this.#proto_priv.get) {
					return this.#proto_priv.get(n);
				}
		}
	}
	/**
	 * @param {any} n
	 * @param {{}} v
	 */
	#priv_access_set(n, v) {
		switch(n) {
			case 'proto_priv':
				this.#proto_priv = v;
				break;
			default:
				if(this.#proto_priv.set) {
					this.#proto_priv.set(n, v);
				}
				break;
		}
	}
	/**
	 * @param {any} tag_name
	 */
	castNodeTo(tag_name) {
		tag_name;
		return new Result;
	}
}
