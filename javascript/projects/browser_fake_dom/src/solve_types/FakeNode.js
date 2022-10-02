/**@implements {EventTarget} */
class FakeEventTarget {
	addEventListener() {
		throw new Error("Not implemented")
	}
	dispatchEvent() {
		console.error("FakeEventTarget: Not implemented")
		return false
	}
	removeEventListener() {
		throw new Error("Not implemented")
	}
}
/**@implements {Node} */
export class FakeNode extends FakeEventTarget {
	/**@returns {string} */
	get baseURI() {
		throw new Error("Not implemented")
	}
	/**@type {NodeListOf<ChildNode>}*/
	get childNodes() {
		throw new Error("Not implemented")
	}
	/**@type {ChildNode|null}*/
	get firstChild() {
		throw new Error("Not implemented")
	}
	/**@type {boolean}*/
	get isConnected() {
		throw new Error("Not implemented")
	}
	/**@type {ChildNode|null}*/
	get lastChild() {
		throw new Error("Not implemented")
	}
	/**@type {ChildNode|null}*/
	get nextSibling() {
		throw new Error("Not implemented")
	}
	/**@returns {string} */
	get nodeName(){
		throw new Error("Not implemented")
	}
	/**@type {number}*/
	get nodeType() {
		throw new Error("Not implemented")
	}
	/**@returns {string} */
	get nodeValue(){
		throw new Error("Not implemented")
	}
	/**@type {Document|null}*/
	get ownerDocument() {
		throw new Error("Not implemented")
	}
	/**@type {HTMLElement}*/
	get parentElement() {
		throw new Error("Not implemented")
	}
	/**@type {ParentNode|null}*/
	get parentNode() {
		throw new Error("Not implemented")
	}
	/**@type {ChildNode|null}*/
	get previousSibling() {
		throw new Error("Not implemented")
	}
	/**@returns {string} */
	get textContent(){
		throw new Error("Not implemented")
	}
	/**@type {<T extends Node>(node:T)=>T}*/
	appendChild() {
		throw new Error("Not implemented")
	}
	/**@type {(deep?:boolean|undefined)=>Node} */
	cloneNode(deep) {
		deep
		throw new Error("Not implemented")
	}
	/**@arg {Node} other@returns {number}*/
	compareDocumentPosition(other) {
		other
		throw new Error("Not implemented")
	}
	/**@returns {boolean}*/
	contains() {
		throw new Error("Not implemented")
	}
	/**@returns {Node}*/
	getRootNode() {
		throw new Error("Not implemented")
	}
	/**@returns {boolean}*/
	hasChildNodes() {
		throw new Error("Not implemented")
	}
	/**@type {<T extends Node>(node: T, child: Node | null) => T}*/
	insertBefore() {
		throw new Error("Not implemented")
	}
	/**@returns {boolean}*/
	isDefaultNamespace() {
		throw new Error("Not implemented")
	}
	/**@returns {boolean}*/
	isEqualNode() {
		throw new Error("Not implemented")
	}
	/**@returns {boolean}*/
	isSameNode() {
		throw new Error("Not implemented")
	}
	/**@returns {string|null}*/
	lookupNamespaceURI() {
		throw new Error("Not implemented")
	}
	/**@returns {string|null}*/
	lookupPrefix() {
		throw new Error("Not implemented")
	}
	normalize() {
		throw new Error("Not implemented")
	}
	/**@type {<T extends Node>(child: T) => T}*/
	removeChild() {
		throw new Error("Not implemented")
	}
	/**@type {<T extends Node>(node: Node, child: T) => T}*/
	replaceChild() {
		throw new Error("Not implemented")
	}
	// DOCUMENT_POSITION enum
	/**@readonly*/
	DOCUMENT_POSITION_DISCONNECTED=1
	/**@readonly*/
	DOCUMENT_POSITION_PRECEDING=2
	/**@readonly*/
	DOCUMENT_POSITION_FOLLOWING=4
	/**@readonly*/
	DOCUMENT_POSITION_CONTAINS=8
	/**@readonly*/
	DOCUMENT_POSITION_CONTAINED_BY=16
	/**@readonly*/
	DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC=32
	// NODE type enum
	/**@readonly*/
	ELEMENT_NODE=1
	/**@readonly*/
	ATTRIBUTE_NODE=2
	/**@readonly*/
	TEXT_NODE=3
	/**@readonly*/
	CDATA_SECTION_NODE=4
	/**@readonly*/
	ENTITY_REFERENCE_NODE=5
	/**@readonly*/
	ENTITY_NODE=6
	/**@readonly*/
	PROCESSING_INSTRUCTION_NODE=7
	/**@readonly*/
	COMMENT_NODE=8
	/**@readonly*/
	DOCUMENT_NODE=9
	/**@readonly*/
	DOCUMENT_TYPE_NODE=10
	/**@readonly*/
	DOCUMENT_FRAGMENT_NODE=11
	/**@readonly*/
	NOTATION_NODE=12
}
