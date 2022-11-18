import {any} from "./any.js";
import {get_FakeDOMImplementation} from "./FakeDOMImplementation.js";
import {FakeHTMLElement} from "./FakeHTMLElement.js";
import {FakeWindow} from "./FakeWindow.js";
import {NoImplFakeDocument} from "./NoImplFakeDocument.js";

export class FakeArgsHolder {
	/**@type {any[]} */
	static values=[];
}

/** @implements {Node} */
class FakeNode {
	baseURI="";
	childNodes=any([]);
	firstChild=any(null);
	isConnected=any(null);
}

/**@implements {DocumentType} */
class FakeDocumentType extends FakeNode {
	name="";
	ownerDocument=any({});
	constructor() {
		super();
	}
}

/** @implements {DOMImplementation} */
class FakeDOMImplementation {
	/**@type {"html"} */
	element_type_tag="html";
	/**
	 * @returns {XMLDocument}
	 * @param {string|null} namespace
	 * @param {string | null} qualName
	 * @param {DocumentType | null | undefined} doctype
	 */
	createDocument(namespace,qualName,doctype) {
		let doc=new FakeXMLDocument;
		let args=[namespace,qualName,doctype];
		doc.args=args;
		return doc;
	}
	/**
	 * @param {any} qualifiedName
	 * @param {any} publicId
	 * @param {any} systemId
	 */
	createDocumentType(qualifiedName,publicId,systemId) {
		return new FakeDocumentType(qualifiedName,publicId,systemId);
	}
	/**
	 * @param {string} title
	 */
	createHTMLDocument(title) {
		let v=false;
		if(v) {
			this.X.createHTMLDocument(title);
		}
		let new_document=new FakeDocument;
		new_document.m_title=title;
		return new_document;
	}
	/** @param {any[]} args @returns {true} */
	hasFeature(...args) {
		console.log('has feature request',...args,"pretending that it is supported");
		return true;
	}
}


/**@implements {Document} */
export class FakeDocument extends NoImplFakeDocument {
	delayed_values={
		FakeDOMImplementation: null,
	};
	async delayed_init() {
		this.delayed_values.FakeDOMImplementation=await get_FakeDOMImplementation();
	}
	/**@type {DOMImplementation} */
	get implementation() {
		return new FakeDOMImplementation;
	}
	/**@type {HTMLElement} */
	get documentElement() {
		return new FakeHTMLElement;
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
		this.m_location=any(value);
	}
	onfullscreenchange=null;
	onfullscreenerror=null;
	onpointerlockchange=null;
	onpointerlockerror=null;
	onreadystatechange=null;
	onvisibilitychange=null;
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
	/**@type {string|null} */
	m_title=null;
	/**@type {string}*/
	get title() {
		if(this.m_title===null) {
			throw new Error("No document title");
		}
		return this.m_title;
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
	onabort=null;
	onanimationcancel=null;
	onanimationend=null;
	onanimationiteration=null;
	onanimationstart=null;
	onauxclick=null;
	onblur=null;
	oncanplay=null;
	oncanplaythrough=null;
	onchange=null;
	onclick=null;
	onclose=null;
	oncontextmenu=null;
	oncuechange=null;
	ondblclick=null;
	ondrag=null;
	ondragend=null;
	ondragenter=null;
	ondragleave=null;
	ondragover=null;
	ondragstart=null;
	ondrop=null;
	ondurationchange=null;
	onemptied=null;
	onended=null;
	onerror=null;
	onfocus=null;
	//spell:ignore onformdata
	onformdata=null;
	ongotpointercapture=null;
	oninput=null;
	oninvalid=null;
	onkeydown=null;
	onkeypress=null;
	onkeyup=null;
	onload=null;
	onloadeddata=null;
	onloadedmetadata=null;
	onloadstart=null;
	onlostpointercapture=null;
	onmousedown=null;
	onmouseenter=null;
	onmouseleave=null;
	onmousemove=null;
	onmouseout=null;
	onmouseover=null;
	onmouseup=null;
	onpause=null;
	onplay=null;
	onplaying=null;
	onpointercancel=null;
	onpointerdown=null;
	onpointerenter=null;
	onpointerleave=null;
	onpointermove=null;
	onpointerout=null;
	onpointerover=null;
	onpointerup=null;
	onprogress=null;
	onratechange=null;
	onreset=null;
	onresize=null;
	onscroll=null;
	onsecuritypolicyviolation=null;
	onseeked=null;
	onseeking=null;
	onselect=null;
	onselectionchange=null;
	onselectstart=null;
	//spell:ignore onslotchange
	onslotchange=null;
	onstalled=null;
	onsubmit=null;
	onsuspend=null;
	ontimeupdate=null;
	ontoggle=null;
	ontransitioncancel=null;
	ontransitionend=null;
	ontransitionrun=null;
	ontransitionstart=null;
	onvolumechange=null;
	onwaiting=null;
	// spell:ignore onwebkitanimationend onwebkitanimationiteration onwebkitanimationstart onwebkittransitionend
	onwebkitanimationend=null;
	onwebkitanimationiteration=null;
	onwebkitanimationstart=null;
	onwebkittransitionend=null;
	onwheel=null;
	// spell:ignore onbeforeinput
	onbeforeinput=null;
	oncancel=null;
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
	/**@type {typeof window} */
	get defaultView() {
		return any(this.m_defaultView);
	}
	set defaultView(value) {
		if(value instanceof FakeWindow) {
			this.m_defaultView=value;
		} else {
			throw new Error("set defaultView to value not instanceof FakeWindow");
		}
	}
}

/**@implements {XMLDocument} */
class FakeXMLDocument extends FakeDocument {
	/**@type {any[]} */
	args=[];
}