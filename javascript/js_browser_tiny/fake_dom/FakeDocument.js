import {document_element_factory, FakeElement} from "fake-dom-api";
import {Badge} from "fake-dom-std";
import {HTMLState} from "mjz-html-parser";
import {DocumentImpl, FakeWindow} from "./mod.js";
import {FakeHTMLElement} from "./HTMLElement.js";
import {FakeNode} from "./FakeNode.js";
import {any} from "./any.js";
/**@implements {Document} */
export class FakeDocument extends FakeNode {
	/**@type {null}*/
	get ownerDocument() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get URL() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get alinkColor() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLAllCollection} */
	get all() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLAnchorElement>} */
	get anchors() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollection} */
	get applets() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get bgColor() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLElement} */
	get body() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get characterSet() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get charset() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get compatMode() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get contentType() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get cookie() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLOrSVGScriptElement | null} */
	get currentScript() {
		throw new Error("Not implemented");
	}
	/**@type {typeof window} */
	get defaultView() {
		return any(this.m_defaultView);
	}
	set defaultView(value) {
		this.m_defaultView = any(value);
	}
	/**@type {string} */
	get designMode() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get dir() {
		throw new Error("Not implemented");
	}
	/**@type {DocumentType} */
	get doctype() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get documentURI() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get domain() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLEmbedElement>} */
	get embeds() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get fgColor() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLFormElement>} */
	get forms() {
		throw new Error("Not implemented");
	}
	/**@type {boolean} */
	get fullscreen() {
		throw new Error("Not implemented");
	}
	/**@type {boolean} */
	get fullscreenEnabled() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLHeadElement} */
	get head() {
		throw new Error("Not implemented");
	}
	/**@type {boolean} */
	get hidden() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLImageElement>} */
	get images() {
		throw new Error("Not implemented");
	}
	get implementation() {
		return new DocumentImpl;
	}
	/**@type {string} */
	get inputEncoding() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get lastModified() {
		throw new Error("Not implemented");
	}
	/**@type {string} */
	get linkColor() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>} */
	get links() {
		throw new Error("Not implemented");
	}
	/**@type {Location} */
	get location() {
		return this.m_location;
	}
	set location(value) {
		this.m_location = any(value);
	}
	onfullscreenchange = null;
	onfullscreenerror = null;
	onpointerlockchange = null;
	onpointerlockerror = null;
	onreadystatechange = null;
	onvisibilitychange = null;
	/**@type {boolean}*/
	get pictureInPictureEnabled() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLEmbedElement>}*/
	get plugins() {
		throw new Error("Not implemented");
	}
	/**@type {DocumentReadyState}*/
	get readyState() {
		throw new Error("Not implemented");
	}
	/**@type {string}*/
	get referrer() {
		throw new Error("Not implemented");
	}
	/**@type {SVGSVGElement|null}*/
	get rootElement() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollectionOf<HTMLScriptElement>}*/
	get scripts() {
		throw new Error("Not implemented");
	}
	/**@type {Element}*/
	get scrollingElement() {
		throw new Error("Not implemented");
	}
	/**@type {DocumentTimeline}*/
	get timeline() {
		throw new Error("Not implemented");
	}
	/**@type {string}*/
	get title() {
		throw new Error("Not implemented");
	}
	/**@type {DocumentVisibilityState}*/
	get visibilityState() {
		throw new Error("Not implemented");
	}
	/**@type {string}*/
	get vlinkColor() {
		throw new Error("Not implemented");
	}
	/**@type {<T extends Node>(node: T) => T} */
	adoptNode() {
		throw new Error("Not implemented");
	}
	captureEvents() {
		throw new Error("Not implemented");
	}
	/**@returns {Range|null}*/
	caretRangeFromPoint() {
		throw new Error("Not implemented");
	}
	clear() {
		throw new Error("Not implemented");
	}
	close() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr} */
	createAttribute() {
		throw new Error("Not implemented");
	}
	/**@returns {Attr} */
	createAttributeNS() {
		throw new Error("Not implemented");
	}
	/**@returns {CDATASection}*/
	createCDATASection() {
		throw new Error("Not implemented");
	}
	/**@returns {Comment}*/
	createComment() {
		throw new Error("Not implemented");
	}
	/**@returns {DocumentFragment}*/
	createDocumentFragment() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLElement}*/
	createElement() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLElement&SVGElement}*/
	createElementNS() {
		throw new Error("Not implemented");
	}
	/**@type {<T extends Event>()=>T}*/
	createEvent() {
		throw new Error("Not implemented");
	}
	/**@returns {NodeIterator}*/
	createNodeIterator() {
		throw new Error("Not implemented");
	}
	/**@returns {ProcessingInstruction}*/
	createProcessingInstruction() {
		throw new Error("Not implemented");
	}
	/**@returns {Range}*/
	createRange() {
		throw new Error("Not implemented");
	}
	/**@returns {Text}*/
	createTextNode() {
		throw new Error("Not implemented");
	}
	/**@returns {TreeWalker}*/
	createTreeWalker() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	execCommand() {
		throw new Error("Not implemented");
	}
	async exitFullscreen() {
		throw new Error("Not implemented");
	}
	async exitPictureInPicture() {
		throw new Error("Not implemented");
	}
	exitPointerLock() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLElement|null}*/
	getElementById() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLCollectionOf<Element>}*/
	getElementsByClassName() {
		throw new Error("Not implemented");
	}
	/**@returns {NodeListOf<HTMLElement>}*/
	getElementsByName() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLCollectionOf<any>}*/
	getElementsByTagName() {
		throw new Error("Not implemented");
	}
	/**@returns {HTMLCollectionOf<HTMLElement>&HTMLCollectionOf<SVGElement>}*/
	getElementsByTagNameNS() {
		throw new Error("Not implemented");
	}
	/**@returns {Selection|null}*/
	getSelection() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	hasFocus() {
		throw new Error("Not implemented");
	}
	/**@returns {Promise<boolean>}*/
	async hasStorageAccess() {
		throw new Error("Not implemented");
	}
	/**@type {<T extends Node>()=>T}*/
	importNode() {
		throw new Error("Not implemented");
	}
	/**@returns {Document&Window}*/
	open() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	queryCommandEnabled() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	queryCommandIndeterm() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	queryCommandState() {
		throw new Error("Not implemented");
	}
	/**@returns {boolean}*/
	queryCommandSupported() {
		throw new Error("Not implemented");
	}
	/**@returns {string}*/
	queryCommandValue() {
		throw new Error("Not implemented");
	}
	releaseEvents() {
		throw new Error("Not implemented");
	}
	async requestStorageAccess() {
		throw new Error("Not implemented");
	}
	write() {
		throw new Error("Not implemented");
	}
	writeln() {
		throw new Error("Not implemented");
	}
	oncopy() {
		throw new Error("Not implemented");
	}
	oncut() {
		throw new Error("Not implemented");
	}
	onpaste() {
		throw new Error("Not implemented");
	}
	/**@returns {Element|null}*/
	get activeElement() {
		throw new Error("Not implemented");
	}
	/**@type {Element|null}*/
	get fullscreenElement() {
		throw new Error("Not implemented");
	}
	/**@type {Element|null}*/
	get pictureInPictureElement() {
		throw new Error("Not implemented");
	}
	/**@type {Element|null}*/
	get pointerLockElement() {
		throw new Error("Not implemented");
	}
	/**@type {StyleSheetList} */
	get styleSheets() {
		throw new Error("Not implemented");
	}
	/**@returns {Element|null}*/
	elementFromPoint() {
		throw new Error("Not implemented");
	}
	/**@returns {Element[]}*/
	elementsFromPoint() {
		throw new Error("Not implemented");
	}
	/**@returns {Animation[]}*/
	getAnimations() {
		throw new Error("Not implemented");
	}
	/**@type {FontFaceSet}*/
	get fonts() {
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
	oncuechange = null;
	ondblclick = null;
	ondrag = null;
	ondragend = null;
	ondragenter = null;
	ondragleave = null;
	ondragover = null;
	ondragstart = null;
	ondrop = null;
	ondurationchange = null;
	onemptied = null;
	onended = null;
	onerror = null;
	onfocus = null;
	onformdata = null;
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
	/**@type {number} */
	get childElementCount() {
		throw new Error("Not implemented");
	}
	/**@type {HTMLCollection}*/
	get children() {
		throw new Error("Not implemented");
	}
	/**@type {Element | null}*/
	get firstElementChild() {
		throw new Error("Not implemented");
	}
	/**@type {Element | null}*/
	get lastElementChild() {
		throw new Error("Not implemented");
	}
	append() {
		throw new Error("Not implemented");
	}
	prepend() {
		throw new Error("Not implemented");
	}
	querySelector() {
		throw new Error("Not implemented");
	}
	/**@returns {NodeListOf<any>} */
	querySelectorAll() {
		throw new Error("Not implemented");
	}
	replaceChildren() {
		throw new Error("Not implemented");
	}
	/**@returns {XPathExpression} */
	createExpression() {
		throw new Error("Not implemented");
	}
	/**@returns {XPathNSResolver} */
	createNSResolver() {
		throw new Error("Not implemented");
	}
	/**@returns {XPathResult} */
	evaluate() {
		throw new Error("Not implemented");
	}
	/**@type {any} */
	doc_root;
	/**@type {any} */
	#dom_script_element_added_callback;
	#window_badge;
	/**@type {import("./types/callback_types.js").HTMLParserCallback|undefined} */
	html_parser_callback;
	document_tag_handlers = {};
	/**@type {HTMLElement} */
	documentElement = new FakeHTMLElement;
	/**
	 * @param {any} f
	 */
	set_dom_script_element_added_callback(f) {
		this.#dom_script_element_added_callback = f;
	}
	/**
	 * @param {any} dom_script_element
	 */
	add_script_to_document(dom_script_element) {
		if(this.#dom_script_element_added_callback)
			this.#dom_script_element_added_callback(dom_script_element);
	}
	/**
	 * @param {import("./types/TagName.js").TagName|string} a
	 * @returns {Element&FakeElement}
	 */
	construct_dom_node(a) {
		return document_element_factory.construct_dom_node(a);
	}
	/**
	 * @arg {import("./types/callback_types.js").HTMLParserCallback} f
	 */
	setHTMLParserCallback(f) {
		this.html_parser_callback = f;
	}
	/**
	 * @param {HTMLState} state
	 * @param {string} s
	 */
	parseHTMLContent(state, s) {
		if(this.html_parser_callback) {
			return this.html_parser_callback(state, s);
		}
	}
	#private_data;
	/**
	 * @argument {FakeWindow} window
	 * @argument {Badge} window_badge
	 */
	constructor(window, window_badge) {
		if(!window_badge.is_valid()) {
			throw window_badge.create_validation_error();
		}
		let x={};
		super(x);
		this.#private_data=x;
		this.#private_data;
		this.#window_badge = window_badge;
		void this.#window_badge;
		this.m_location = window.location;
		this.m_defaultView = window;
	}
}
