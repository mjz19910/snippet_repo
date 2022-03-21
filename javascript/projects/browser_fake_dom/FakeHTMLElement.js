import {FakeDocument} from "./FakeDocument.js";
import {FakeElement} from "./FakeElement.js";
// FakeHTMLElement -> [./FakeElement.js -> [./Element.js, ./api/CastResult.js], ./FakeDocument.js]
// !!! FakeHTMLElement -> ./FakeElement.js -> ./api/CastResult.js -> FakeHTMLElement.js
/**@implements {HTMLElement} */
export class FakeHTMLElement extends FakeElement {
	/**@returns {string} */
	get accessKey() {
		throw new Error("Not implemented");
	};
	/**@returns {string} */
	get accessKeyLabel() {
		throw new Error("Not implemented");
	};
	after() {
		throw new Error("Not implemented");
	}
	/**@returns {Animation} */
	animate() {
		throw new Error("Not implemented");
	};
	append() {
		throw new Error("Not implemented");
	}
	ariaAtomic = null;
	ariaAutoComplete = null;
	ariaBusy = null;
	ariaChecked = null;
	ariaColCount = null;
	ariaColIndex = null;
	ariaColSpan = null;
	ariaCurrent = null;
	ariaDisabled = null;
	ariaExpanded = null;
	ariaHasPopup = null;
	ariaHidden = null;
	ariaKeyShortcuts = null;
	ariaLabel = null;
	ariaLevel = null;
	ariaLive = null;
	ariaModal = null;
	ariaMultiLine = null;
	ariaMultiSelectable = null;
	ariaOrientation = null;
	ariaPlaceholder = null;
	ariaPosInSet = null;
	ariaPressed = null;
	ariaReadOnly = null;
	ariaRequired = null;
	ariaRoleDescription = null;
	ariaRowCount = null;
	ariaRowIndex = null;
	ariaRowSpan = null;
	ariaSelected = null;
	ariaSetSize = null;
	ariaSort = null;
	ariaValueMax = null;
	ariaValueMin = null;
	ariaValueNow = null;
	ariaValueText = null;
	assignedSlot = null;
	/**@returns {ElementInternals} */
	attachInternals() {
		throw new Error("Not implemented");
	}
	/**@returns {ShadowRoot} */
	attachShadow() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get autocapitalize() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get autofocus() {
		throw new Error("Not implemented");
	}
	before() {
		throw new Error("Not implemented");
	}
	blur() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get childElementCount() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLCollection} */
	get children() {
		throw new Error("Not implemented");
	}
	/**@returns {DOMTokenList} */
	get classList() {
		throw new Error("Not implemented");
	}
	click() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get clientWidth() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get clientHeight() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get clientLeft() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get clientTop() {
		throw new Error("Not implemented");
	}
	closest() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get contentEditable() {
		throw new Error("Not implemented");
	}
	/**@returns {DOMStringMap} */
	get dataset() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get dir() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get draggable() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get enterKeyHint() {
		throw new Error("Not implemented");
	}
	firstElementChild = null;
	focus() {
		throw new Error("Not implemented");
	}
	/**@returns {Animation[]} */
	getAnimations() {
		throw new Error("Not implemented");
	}
	/**@returns {string[]} */
	getAttributeNames() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr | null} */
	getAttributeNode() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr | null} */
	getAttributeNodeNS() {
		throw new Error("Not implemented");
	}
	/**@returns {string | null} */
	getAttributeNS() {
		throw new Error("Not implemented");
	}
	/**@returns {DOMRect} */
	getBoundingClientRect() {
		throw new Error("Not implemented");
	}
	/**@returns {DOMRectList} */
	getClientRects() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLCollectionOf<HTMLElement> & HTMLCollectionOf<SVGElement>} */
	getElementsByTagNameNS() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	hasAttribute() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	hasAttributeNS() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	hasAttributes() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	hasPointerCapture() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get hidden() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get id() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get innerText() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get inputMode() {
		throw new Error("Not implemented");
	}
	/**@returns {Element | null} */
	insertAdjacentElement() {
		throw new Error("Not implemented");
	}
	insertAdjacentHTML() {
		throw new Error("Not implemented");
	}
	insertAdjacentText() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get isContentEditable() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get lang() {
		throw new Error("Not implemented");
	}
	lastElementChild = null;
	/**@returns {string} */
	get localName() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	matches() {
		throw new Error("Not implemented");
	}
	namespaceURI = null;
	nextElementSibling = null;
	/**@returns {number} */
	get offsetWidth() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get offsetHeight() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get offsetLeft() {
		throw new Error("Not implemented");
	}
	offsetParent = null;
	/**@returns {number} */
	get offsetTop() {
		throw new Error("Not implemented");
	}
	onabort = null;
	onanimationcancel = null;
	onanimationend = null;
	onanimationiteration = null;
	onanimationstart = null;
	onauxclick = null;
	onblur = null;
	oncanplay = null;
	oncanplaythrough = null;
	onchange = null;
	onclick = null;
	onclose = null;
	oncontextmenu = null;
	oncopy = null;
	oncuechange = null;
	oncut = null;
	ondblclick = null;
	ondrag = null;
	ondragend = null;
	ondragenter = null;
	ondragleave = null;
	ondragover = null;
	ondragstart = null;
	ondrop = null;
	ondurationchange = null;
	onebkitanimationend = null;
	onemptied = null;
	onended = null;
	onerror = null;
	onfocus = null;
	onformdata = null;
	onfullscreenchange = null;
	onfullscreenerror = null;
	ongotpointercapture = null;
	oninput = null;
	oninvalid = null;
	onkeydown = null;
	onkeypress = null;
	onkeyup = null;
	onload = null;
	onloadeddata = null;
	onloadedmetadata = null;
	onloadstart = null;
	onlostpointercapture = null;
	onmousedown = null;
	onmouseenter = null;
	onmouseleave = null;
	onmousemove = null;
	onmouseout = null;
	onmouseover = null;
	onmouseup = null;
	onpaste = null;
	onpause = null;
	onplay = null;
	onplaying = null;
	onpointercancel = null;
	onpointerdown = null;
	onpointerenter = null;
	onpointerleave = null;
	onpointermove = null;
	onpointerout = null;
	onpointerover = null;
	onpointerup = null;
	onprogress = null;
	onratechange = null;
	onreset = null;
	onresize = null;
	onscroll = null;
	onsecuritypolicyviolation = null;
	onseeked = null;
	onseeking = null;
	onselect = null;
	onselectionchange = null;
	onselectstart = null;
	onslotchange = null;
	onstalled = null;
	onsubmit = null;
	onsuspend = null;
	ontimeupdate = null;
	ontoggle = null;
	ontransitioncancel = null;
	ontransitionend = null;
	ontransitionrun = null;
	ontransitionstart = null;
	onvolumechange = null;
	onwaiting = null;
	onwebkitanimationend = null;
	onwebkitanimationiteration = null;
	onwebkitanimationstart = null;
	onwebkittransitionend = null;
	onwheel = null;
	/**
	 *
	 * @type {Document & FakeDocument}
	*/
	get ownerDocument() {
		throw new Error("Not implemented");
	};
	set ownerDocument(_value) {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get outerHTML() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get outerText() {
		throw new Error("Not implemented");
	}
	/**@returns {DOMTokenList} */
	get part() {
		throw new Error("Not implemented");
	}
	prefix = null;
	prepend() {
		throw new Error("Not implemented");
	}
	previousElementSibling = null;
	releasePointerCapture() {
		throw new Error("Not implemented");
	}
	remove() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr} */
	removeAttributeNode() {
		throw new Error("Not implemented");
	}
	removeAttributeNS() {
		throw new Error("Not implemented");
	}
	replaceChildren() {
		throw new Error("Not implemented");
	}
	replaceWith() {
		throw new Error("Not implemented");
	}
	async requestFullscreen() {
		throw new Error("Not implemented");
	}
	requestPointerLock() {
		throw new Error("Not implemented");
	}
	scroll() {
		throw new Error("Not implemented");
	}
	scrollBy() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get scrollHeight() {
		throw new Error("Not implemented");
	}
	scrollIntoView() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get scrollLeft() {
		throw new Error("Not implemented");
	}
	scrollTo() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get scrollTop() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get scrollWidth() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr | null} */
	setAttributeNode() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr | null} */
	setAttributeNodeNS() {
		throw new Error("Not implemented");
	}
	setAttributeNS() {
		throw new Error("Not implemented");
	}
	setPointerCapture() {
		throw new Error("Not implemented");
	}
	shadowRoot = null;
	/**@returns {string} */
	get slot() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get spellcheck() {
		throw new Error("Not implemented");
	}
	/**@returns {number} */
	get tabIndex() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get tagName() {
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get title() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	toggleAttribute() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	get translate() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean} */
	webkitMatchesSelector() {
		throw new Error("Not implemented");
	}
	constructor() {
		/**@type {{base_object: any;proto_private:{get?: any;set?: any;}}} */
		let x = {
			proto_private: {},
			base_object: null
		};
		super(x);
	}
	/**
	 * @type {<T extends Node>(node:T)=>T} e
	 */
	appendChild(e) {
		void e;
		throw new Error("Not implemented");
	}
	/**
	 *
	 * @type {<T extends Node>(node:T, child:Node)=>T} e
	 * @param {Node} node_b */
	insertBefore(node_a, node_b) {
		void node_a, node_b;
		throw new Error("Not implemented");
	}
	/**
	 * @type {<T extends Node>(child: T) => T}
	 */
	removeChild(child) {
		void child;
		throw new Error("Not implemented");
	}
	/**@returns {ParentNode} */
	get parentNode() {
		throw new Error("Not implemented");
	}
	/**@returns {ChildNode} */
	get firstChild() {
		throw new Error("Not implemented");
	}
	/**@type {NodeListOf<ChildNode>} */
	get childNodes() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get innerHTML() {
		throw new Error("Not implemented");
	}
	set innerHTML(html_value_to_assign) {
		void html_value_to_assign;
		throw new Error("Not implemented");
	}
	/**@returns {string} */
	get className() {
		throw new Error("Not implemented");
	}
	/**@returns {CSSStyleDeclaration} */
	get style() {
		throw new Error("Not implemented");
	}
	set style(style_value_to_set) {
		void style_value_to_set;
		throw new Error("Not implemented");
	}
	/**@returns {NamedNodeMap} */
	get attributes() {
		throw new Error("Not implemented");
	}
	/**
	 * @type {(qualifiedName: string) => string | null}
	 */
	getAttribute(attribute_to_get) {
		void attribute_to_get;
		throw new Error("Not implemented");
	}
	/**
	 * @param {string} key
	 * @param {string} value
	 */
	setAttribute(key, value) {
		void key, value;
		throw new Error("Not implemented");
	}
	/**
	 * @param {any} key_to_remove
	 */
	removeAttribute(key_to_remove) {
		void key_to_remove;
		throw new Error("Not implemented");
	}
	/**
	 * @type {<K extends keyof HTMLElementTagNameMap>(selectors: K)=>NodeListOf<HTMLElementTagNameMap[K]>}
	 */
	querySelectorAll(selectors) {
		void selectors;
		throw new Error("Not implemented");
	}
	/**
	 * @type_ {HTMLElement['querySelector']}
	 * @type {<K extends keyof HTMLElementTagNameMap>(selectors: K)=>HTMLElementTagNameMap[K] | null}
	*/
	querySelector(selector_to_query) {
		void selector_to_query;
		throw new Error("Not implemented");
	}
	/**
	 * @param {string} id_needle
	 */
	getElementById(id_needle) {
		void id_needle;
		throw new Error("Not implemented");
	}
	/**
	 * @type {{(qualifiedName: string): HTMLCollectionOf<Element>;}}
	*/
	getElementsByTagName(qualifiedName) {
		void qualifiedName;
		throw new Error("Not implemented");
	}
	/** @type {HTMLElement['getElementsByClassName']} */
	getElementsByClassName(class_name_needle) {
		void class_name_needle;
		throw new Error("Not implemented");
	}
}
export function init() {
	return FakeHTMLElement;
}
