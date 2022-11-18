import {FakeEventTarget} from "./EventTarget.js";
import {FakeDocument} from "./FakeDocument.js"
import {FakeExternal} from "./FakeExternal.js"
import {no_impl} from "./no_impl.js"
import {FakeWindowType} from "./FakeWindowType.js";
/**@implements {Window}*/
export class FakeWindowNoImpl extends FakeWindowType {
	// spell:ignore onbeforeinput
	onbeforeinput=null;
	oncancel=null;
	/**@arg {any} value @arg {StructuredSerializeOptions} [options] */
	structuredClone(value, options) {
		void options
		return value
	}
	/**@type {Navigator}*/
	get clientInformation() {throw no_impl()}
	/**@type {boolean}*/
	get closed() {throw no_impl()}
	/**@type {CustomElementRegistry}*/
	get customElements() {throw no_impl()}
	/**@type {number}*/
	get devicePixelRatio() {throw no_impl()}
	/**@type {FakeDocument} */
	get document() {throw no_impl()}
	/**@type {Event}*/
	get event() {throw no_impl()}
	/**@type {FakeExternal&{AddSearchProvider:()=>void}}*/
	get external() {throw no_impl()}
	/**@type {Element}*/
	get frameElement() {throw no_impl()}
	/**@type {Window}*/
	get frames() {throw no_impl()}
	/**@type {History}*/
	get history() {throw no_impl()}
	/**@type {number}*/
	get innerHeight() {throw no_impl()}
	/**@type {number}*/
	get innerWidth() {throw no_impl()}
	/**@type {number}*/
	get length() {throw no_impl()}
	/**@type {Location}*/
	get location() {throw no_impl()}
	/**@type {BarProp}*/
	get locationbar() {throw no_impl()}
	/**@type {BarProp}*/
	get menubar() {throw no_impl()}
	/**@returns {string}*/
	get name() {throw no_impl()}
	/**@type {Navigator} */
	get navigator() {throw no_impl()}
	/**@type {null}*/
	get ondevicemotion() {throw no_impl()}
	/**@type {null}*/
	get ondeviceorientation() {throw no_impl()}
	/**@type {null}*/
	get onorientationchange() {throw no_impl()}
	opener() {throw no_impl()}
	/**@type {number}*/
	get orientation() {throw no_impl()}
	/**@type {number}*/
	get outerHeight() {throw no_impl()}
	/**@type {number}*/
	get outerWidth() {throw no_impl()}
	/**@type {number}*/
	get pageXOffset() {throw no_impl()}
	/**@type {number}*/
	get pageYOffset() {throw no_impl()}
	/**@type {Window}*/
	get parent() {throw no_impl()}
	/**@type {BarProp}*/
	get personalbar() {throw no_impl()}
	/**@type {Screen}*/
	get screen() {throw no_impl()}
	/**@type {number}*/
	get screenLeft() {throw no_impl()}
	/**@type {number}*/
	get screenTop() {throw no_impl()}
	/**@type {number}*/
	get screenX() {throw no_impl()}
	/**@type {number}*/
	get screenY() {throw no_impl()}
	/**@type {number}*/
	get scrollX() {throw no_impl()}
	/**@type {number}*/
	get scrollY() {throw no_impl()}
	/**@type {BarProp}*/
	get scrollbars() {throw no_impl()}
	/**@type {Window&typeof globalThis}*/
	get self() {throw no_impl()}
	/**@type {SpeechSynthesis}*/
	get speechSynthesis() {throw no_impl()}
	/**@returns {string}*/
	get status() {throw no_impl()}
	/**@type {BarProp}*/
	get statusbar() {throw no_impl()}
	/**@type {BarProp}*/
	get toolbar() {throw no_impl()}
	/**@type {Window} */
	get top() {
		throw new Error("NoImpl")
	}
	/**@type {VisualViewport} */
	get visualViewport() {throw no_impl()}
	/**@type {Window & typeof globalThis}*/
	get window() {throw no_impl()}
	alert() {throw no_impl()}
	blur() {throw no_impl()}
	cancelIdleCallback() {throw no_impl()}
	captureEvents() {throw no_impl()}
	close() {throw no_impl()}
	/**@returns {boolean}*/
	confirm() {throw no_impl()}
	focus() {throw no_impl()}
	/**@returns {CSSStyleDeclaration} */
	getComputedStyle() {throw no_impl()}
	/**@returns {Selection|null} */
	getSelection() {throw no_impl()}
	/**@returns {MediaQueryList} */
	matchMedia() {throw no_impl()}
	moveBy() {throw no_impl()}
	moveTo() {throw no_impl()}
	/**@returns {Window} */
	open() {throw no_impl()}
	postMessage() {throw no_impl()}
	print() {throw no_impl()}
	/**@returns {string} */
	prompt() {throw no_impl()}
	releaseEvents() {throw no_impl()}
	/**@returns {number}*/
	requestIdleCallback() {throw no_impl()}
	resizeBy() {throw no_impl()}
	resizeTo() {throw no_impl()}
	scroll() {throw no_impl()}
	scrollBy() {throw no_impl()}
	scrollTo() {throw no_impl()}
	stop() {throw no_impl()}
	cancelAnimationFrame() {throw no_impl()}
	/**@type {(a:FrameRequestCallback)=>number}*/
	requestAnimationFrame(a) {throw no_impl(a)}
	/**@type {null}*/
	get onabort() {throw no_impl()}
	/**@type {null}*/
	get onanimationcancel() {throw no_impl()}
	/**@type {null}*/
	get onanimationend() {throw no_impl()}
	/**@type {null}*/
	get onanimationiteration() {throw no_impl()}
	/**@type {null}*/
	get onanimationstart() {throw no_impl()}
	/**@type {null}*/
	get onauxclick() {throw no_impl()}
	/**@type {null}*/
	get onblur() {throw no_impl()}
	/**@type {null}*/
	get oncanplay() {throw no_impl()}
	/**@type {null}*/
	get oncanplaythrough() {throw no_impl()}
	/**@type {null}*/
	get onchange() {throw no_impl()}
	/**@type {null}*/
	get onclick() {throw no_impl()}
	/**@type {null}*/
	get onclose() {throw no_impl()}
	/**@type {null}*/
	get oncontextmenu() {throw no_impl()}
	/**@type {null}*/
	get oncuechange() {throw no_impl()}
	/**@type {null}*/
	get ondblclick() {throw no_impl()}
	/**@type {null}*/
	get ondrag() {throw no_impl()}
	/**@type {null}*/
	get ondragend() {throw no_impl()}
	/**@type {null}*/
	get ondragenter() {throw no_impl()}
	/**@type {null}*/
	get ondragleave() {throw no_impl()}
	/**@type {null}*/
	get ondragover() {throw no_impl()}
	/**@type {null}*/
	get ondragstart() {throw no_impl()}
	/**@type {null}*/
	get ondrop() {throw no_impl()}
	/**@type {null}*/
	get ondurationchange() {throw no_impl()}
	/**@type {null}*/
	get onemptied() {throw no_impl()}
	/**@type {null}*/
	get onended() {throw no_impl()}
	/**@type {null}*/
	get onerror() {throw no_impl()}
	/**@type {null}*/
	get onfocus() {throw no_impl()}
	//spell:ignore onformdata
	/**@type {null}*/
	get onformdata() {throw no_impl()}
	/**@type {null}*/
	get ongotpointercapture() {throw no_impl()}
	/**@type {null}*/
	get oninput() {throw no_impl()}
	/**@type {null}*/
	get oninvalid() {throw no_impl()}
	/**@type {null}*/
	get onkeydown() {throw no_impl()}
	/**@type {null}*/
	get onkeypress() {throw no_impl()}
	/**@type {null}*/
	get onkeyup() {throw no_impl()}
	/**@type {null}*/
	get onload() {throw no_impl()}
	/**@type {null}*/
	get onloadeddata() {throw no_impl()}
	/**@type {null}*/
	get onloadedmetadata() {throw no_impl()}
	/**@type {null}*/
	get onloadstart() {throw no_impl()}
	/**@type {null}*/
	get onlostpointercapture() {throw no_impl()}
	/**@type {null}*/
	get onmousedown() {throw no_impl()}
	/**@type {null}*/
	get onmouseenter() {throw no_impl()}
	/**@type {null}*/
	get onmouseleave() {throw no_impl()}
	/**@type {null}*/
	get onmousemove() {throw no_impl()}
	/**@type {null}*/
	get onmouseout() {throw no_impl()}
	/**@type {null}*/
	get onmouseover() {throw no_impl()}
	/**@type {null}*/
	get onmouseup() {throw no_impl()}
	/**@type {null}*/
	get onpause() {throw no_impl()}
	/**@type {null}*/
	get onplay() {throw no_impl()}
	/**@type {null}*/
	get onplaying() {throw no_impl()}
	/**@type {null}*/
	get onpointercancel() {throw no_impl()}
	/**@type {null}*/
	get onpointerdown() {throw no_impl()}
	/**@type {null}*/
	get onpointerenter() {throw no_impl()}
	/**@type {null}*/
	get onpointerleave() {throw no_impl()}
	/**@type {null}*/
	get onpointermove() {throw no_impl()}
	/**@type {null}*/
	get onpointerout() {throw no_impl()}
	/**@type {null}*/
	get onpointerover() {throw no_impl()}
	/**@type {null}*/
	get onpointerup() {throw no_impl()}
	/**@type {null}*/
	get onprogress() {throw no_impl()}
	/**@type {null}*/
	get onratechange() {throw no_impl()}
	/**@type {null}*/
	get onreset() {throw no_impl()}
	/**@type {null}*/
	get onresize() {throw no_impl()}
	/**@type {null}*/
	get onscroll() {throw no_impl()}
	/**@type {null}*/
	get onsecuritypolicyviolation() {throw no_impl()}
	/**@type {null}*/
	get onseeked() {throw no_impl()}
	/**@type {null}*/
	get onseeking() {throw no_impl()}
	/**@type {null}*/
	get onselect() {throw no_impl()}
	/**@type {null}*/
	get onselectionchange() {throw no_impl()}
	/**@type {null}*/
	get onselectstart() {throw no_impl()}
	/**@type {null}*/
	//spell:ignore onslotchange
	get onslotchange() {throw no_impl()}
	/**@type {null}*/
	get onstalled() {throw no_impl()}
	/**@type {null}*/
	get onsubmit() {throw no_impl()}
	/**@type {null}*/
	get onsuspend() {throw no_impl()}
	/**@type {null}*/
	get ontimeupdate() {throw no_impl()}
	/**@type {null}*/
	get ontoggle() {throw no_impl()}
	/**@type {null}*/
	get ontransitioncancel() {throw no_impl()}
	/**@type {null}*/
	get ontransitionend() {throw no_impl()}
	/**@type {null}*/
	get ontransitionrun() {throw no_impl()}
	/**@type {null}*/
	get ontransitionstart() {throw no_impl()}
	/**@type {null}*/
	get onvolumechange() {throw no_impl()}
	/**@type {null}*/
	get onwaiting() {throw no_impl()}
	// spell:ignore onwebkitanimationend onwebkitanimationiteration onwebkitanimationstart onwebkittransitionend
	/**@type {null}*/
	get onwebkitanimationend() {throw no_impl()}
	/**@type {null}*/
	get onwebkitanimationiteration() {throw no_impl()}
	/**@type {null}*/
	get onwebkitanimationstart() {throw no_impl()}
	/**@type {null}*/
	get onwebkittransitionend() {throw no_impl()}
	/**@type {null}*/
	get onwheel() {throw no_impl()}
	/**@type {null}*/
	get onafterprint() {throw no_impl()}
	/**@type {null}*/
	get onbeforeprint() {throw no_impl()}
	/**@type {null}*/
	get onbeforeunload() {throw no_impl()}
	//spell:ignore ongamepadconnected ongamepaddisconnected
	/**@type {null}*/
	get ongamepadconnected() {throw no_impl()}
	/**@type {null}*/
	get ongamepaddisconnected() {throw no_impl()}
	/**@type {null}*/
	get onhashchange() {throw no_impl()}
	/**@type {null}*/
	get onlanguagechange() {throw no_impl()}
	/**@type {null}*/
	get onmessage() {throw no_impl()}
	/**@type {null}*/
	get onmessageerror() {throw no_impl()}
	/**@type {null}*/
	get onoffline() {throw no_impl()}
	/**@type {null}*/
	get ononline() {throw no_impl()}
	/**@type {null}*/
	get onpagehide() {throw no_impl()}
	/**@type {null}*/
	get onpageshow() {throw no_impl()}
	/**@type {null}*/
	get onpopstate() {throw no_impl()}
	/**@type {null}*/
	get onrejectionhandled() {throw no_impl()}
	/**@type {null}*/
	get onstorage() {throw no_impl()}
	/**@type {null}*/
	get onunhandledrejection() {throw no_impl()}
	/**@type {null}*/
	get onunload() {throw no_impl()}
	/**@type {Storage} */
	get localStorage() {throw no_impl()}
	/**@type {CacheStorage}*/
	get caches() {throw no_impl()}
	/**@type {boolean}*/
	get crossOriginIsolated() {throw no_impl()}
	/**@type {Crypto}*/
	get crypto() {throw no_impl()}
	/**@type {IDBFactory}*/
	get indexedDB() {throw no_impl()}
	/**@type {boolean}*/
	get isSecureContext() {throw no_impl()}
	/**@returns {string} */
	get origin() {throw no_impl()}
	/**@type {Performance}*/
	get performance() {throw no_impl()}
	/**@returns {string} */
	atob() {throw no_impl()}
	/**@returns {string} */
	btoa() {throw no_impl()}
	clearInterval() {throw no_impl()}
	/**@returns {Promise<ImageBitmap>} */
	async createImageBitmap() {throw no_impl()}
	/**@returns {Promise<Response>} */
	async fetch() {throw no_impl()}
	clearTimeout() {throw no_impl()}
	queueMicrotask() {throw no_impl()}
	reportError() {throw no_impl()}
	/**@return {number}*/
	setInterval() {throw no_impl()}
	/**
	 * @arg {(args: any[]) => void} h
	 * @arg {number | undefined} [t]
	 * @arg {any[]} aa@return {number}*/
	setTimeout(h,t,...aa) {throw no_impl(h,t,aa)}
	/**@type {Storage}*/
	get sessionStorage() {throw no_impl()}
}

export function use_types() {
	return [
		FakeExternal
	]
}
