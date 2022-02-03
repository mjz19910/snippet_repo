// ==Typescript types imported for extension==
declare var localStorage: LocalStorage;
interface LocalStorage extends Storage {
	auto_buy_history_str: string;
}


declare var window: Window & typeof globalThis;
//interface Window {
//	g_auto_buy;
//}
interface CSSStyleSheet extends StyleSheet {
	readonly cssRules: CSSRuleList;
	readonly ownerRule: CSSRule | null;
	/** @deprecated */
	readonly rules: CSSRuleList;
	/** @deprecated */
	addRule(selector?: string, style?: string, index?: number): number;
	deleteRule(index: number): void;
	insertRule(rule: string, index?: number): number;
	/** @deprecated */
	removeRule(index?: number): void;
	replace(string: string): Promise<CSSStyleSheet>
}
declare var CSSStyleSheet: {
	prototype: CSSStyleSheet;
	new(options?: CSSStyleSheetInit): CSSStyleSheet;
};
interface Document extends Node, DocumentAndElementEventHandlers, DocumentOrShadowRoot, FontFaceSource, GlobalEventHandlers, NonElementParentNode, ParentNode, XPathEvaluatorBase {
	/** Sets or gets the URL for the current document. */
	readonly URL: string;
	/**
	 * Sets or gets the color of all active links in the document.
	 * @deprecated
	 */
	alinkColor: string;
	/**
	 * Returns a reference to the collection of elements contained by the object.
	 * @deprecated
	 */
	readonly all: HTMLAllCollection;
	/**
	 * Retrieves a collection of all a objects that have a name and/or id property. Objects in this collection are in HTML source order.
	 * @deprecated
	 */
	readonly anchors: HTMLCollectionOf<HTMLAnchorElement>;
	/**
	 * Retrieves a collection of all applet objects in the document.
	 * @deprecated
	 */
	readonly applets: HTMLCollection;
	/**
	 * Deprecated. Sets or retrieves a value that indicates the background color behind the object.
	 * @deprecated
	 */
	bgColor: string;
	/** Specifies the beginning and end of the document body. */
	body: HTMLElement;
	/** Returns document's encoding. */
	readonly characterSet: string;
	/**
	 * Gets or sets the character set used to encode the object.
	 * @deprecated This is a legacy alias of `characterSet`.
	 */
	readonly charset: string;
	/** Gets a value that indicates whether standards-compliant mode is switched on for the object. */
	readonly compatMode: string;
	/** Returns document's content type. */
	readonly contentType: string;
	/**
	 * Returns the HTTP cookies that apply to the Document. If there are no cookies or cookies can't be applied to this resource, the empty string will be returned.
	 *
	 * Can be set, to add a new cookie to the element's set of HTTP cookies.
	 *
	 * If the contents are sandboxed into a unique origin (e.g. in an iframe with the sandbox attribute), a "SecurityError" DOMException will be thrown on getting and setting.
	 */
	cookie: string;
	/**
	 * Returns the script element, or the SVG script element, that is currently executing, as long as the element represents a classic script. In the case of reentrant script execution, returns the one that most recently started executing amongst those that have not yet finished executing.
	 *
	 * Returns null if the Document is not currently executing a script or SVG script element (e.g., because the running script is an event handler, or a timeout), or if the currently executing script or SVG script element represents a module script.
	 */
	readonly currentScript: HTMLOrSVGScriptElement | null;
	/** Returns the Window object of the active document. */
	readonly defaultView: (WindowProxy & typeof globalThis) | null;
	/** Sets or gets a value that indicates whether the document can be edited. */
	designMode: string;
	/** Sets or retrieves a value that indicates the reading order of the object. */
	dir: string;
	/** Gets an object representing the document type declaration associated with the current document. */
	readonly doctype: DocumentType | null;
	/** Gets a reference to the root node of the document. */
	readonly documentElement: HTMLElement;
	/** Returns document's URL. */
	readonly documentURI: string;
	/** Sets or gets the security domain of the document. */
	domain: string;
	/** Retrieves a collection of all embed objects in the document. */
	readonly embeds: HTMLCollectionOf<HTMLEmbedElement>;
	/**
	 * Sets or gets the foreground (text) color of the document.
	 * @deprecated
	 */
	fgColor: string;
	/** Retrieves a collection, in source order, of all form objects in the document. */
	readonly forms: HTMLCollectionOf<HTMLFormElement>;
	/** @deprecated */
	readonly fullscreen: boolean;
	/** Returns true if document has the ability to display elements fullscreen and fullscreen is supported, or false otherwise. */
	readonly fullscreenEnabled: boolean;
	/** Returns the head element. */
	readonly head: HTMLHeadElement;
	readonly hidden: boolean;
	/** Retrieves a collection, in source order, of img objects in the document. */
	readonly images: HTMLCollectionOf<HTMLImageElement>;
	/** Gets the implementation object of the current document. */
	readonly implementation: DOMImplementation;
	/**
	 * Returns the character encoding used to create the webpage that is loaded into the document object.
	 * @deprecated This is a legacy alias of `characterSet`.
	 */
	readonly inputEncoding: string;
	/** Gets the date that the page was last modified, if the page supplies one. */
	readonly lastModified: string;
	/**
	 * Sets or gets the color of the document links.
	 * @deprecated
	 */
	linkColor: string;
	/** Retrieves a collection of all a objects that specify the href property and all area objects in the document. */
	readonly links: HTMLCollectionOf<HTMLAnchorElement | HTMLAreaElement>;
	/** Contains information about the current URL. */
	get location(): Location;
	set location(href: string | Location);
	onfullscreenchange: ((this: Document, ev: Event) => any) | null;
	onfullscreenerror: ((this: Document, ev: Event) => any) | null;
	onpointerlockchange: ((this: Document, ev: Event) => any) | null;
	onpointerlockerror: ((this: Document, ev: Event) => any) | null;
	/**
	 * Fires when the state of the object has changed.
	 * @param ev The event
	 */
	onreadystatechange: ((this: Document, ev: Event) => any) | null;
	onvisibilitychange: ((this: Document, ev: Event) => any) | null;
	readonly ownerDocument: null;
	readonly pictureInPictureEnabled: boolean;
	/** Return an HTMLCollection of the embed elements in the Document. */
	readonly plugins: HTMLCollectionOf<HTMLEmbedElement>;
	/** Retrieves a value that indicates the current state of the object. */
	readonly readyState: DocumentReadyState;
	/** Gets the URL of the location that referred the user to the current page. */
	readonly referrer: string;
	/** @deprecated */
	readonly rootElement: SVGSVGElement | null;
	/** Retrieves a collection of all script objects in the document. */
	readonly scripts: HTMLCollectionOf<HTMLScriptElement>;
	readonly scrollingElement: Element | null;
	readonly timeline: DocumentTimeline;
	/** Contains the title of the document. */
	title: string;
	readonly visibilityState: DocumentVisibilityState;
	/**
	 * Sets or gets the color of the links that the user has visited.
	 * @deprecated
	 */
	vlinkColor: string;
	/**
	 * Moves node from another document and returns it.
	 *
	 * If node is a document, throws a "NotSupportedError" DOMException or, if node is a shadow root, throws a "HierarchyRequestError" DOMException.
	 */
	adoptNode<T extends Node>(node: T): T;
	/** @deprecated */
	captureEvents(): void;
	/** @deprecated */
	caretRangeFromPoint(x: number, y: number): Range | null;
	/** @deprecated */
	clear(): void;
	/** Closes an output stream and forces the sent data to display. */
	close(): void;
	/**
	 * Creates an attribute object with a specified name.
	 * @param name String that sets the attribute object's name.
	 */
	createAttribute(localName: string): Attr;
	createAttributeNS(namespace: string | null, qualifiedName: string): Attr;
	/** Returns a CDATASection node whose data is data. */
	createCDATASection(data: string): CDATASection;
	/**
	 * Creates a comment object with the specified data.
	 * @param data Sets the comment object's data.
	 */
	createComment(data: string): Comment;
	/** Creates a new document. */
	createDocumentFragment(): DocumentFragment;
	/**
	 * Creates an instance of the element for the specified tag.
	 * @param tagName The name of an element.
	 */
	createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
	/** @deprecated */
	createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
	createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
	/**
	 * Returns an element with namespace namespace. Its namespace prefix will be everything before ":" (U+003E) in qualifiedName or null. Its local name will be everything after ":" (U+003E) in qualifiedName or qualifiedName.
	 *
	 * If localName does not match the Name production an "InvalidCharacterError" DOMException will be thrown.
	 *
	 * If one of the following conditions is true a "NamespaceError" DOMException will be thrown:
	 *
	 * localName does not match the QName production.
	 * Namespace prefix is not null and namespace is the empty string.
	 * Namespace prefix is "xml" and namespace is not the XML namespace.
	 * qualifiedName or namespace prefix is "xmlns" and namespace is not the XMLNS namespace.
	 * namespace is the XMLNS namespace and neither qualifiedName nor namespace prefix is "xmlns".
	 *
	 * When supplied, options's is can be used to create a customized built-in element.
	 */
	createElementNS(namespaceURI: "http://www.w3.org/1999/xhtml", qualifiedName: string): HTMLElement;
	createElementNS<K extends keyof SVGElementTagNameMap>(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: K): SVGElementTagNameMap[K];
	createElementNS(namespaceURI: "http://www.w3.org/2000/svg", qualifiedName: string): SVGElement;
	createElementNS(namespaceURI: string | null, qualifiedName: string, options?: ElementCreationOptions): Element;
	createElementNS(namespace: string | null, qualifiedName: string, options?: string | ElementCreationOptions): Element;
	createEvent(eventInterface: "AnimationEvent"): AnimationEvent;
	createEvent(eventInterface: "AnimationPlaybackEvent"): AnimationPlaybackEvent;
	createEvent(eventInterface: "AudioProcessingEvent"): AudioProcessingEvent;
	createEvent(eventInterface: "BeforeUnloadEvent"): BeforeUnloadEvent;
	createEvent(eventInterface: "BlobEvent"): BlobEvent;
	createEvent(eventInterface: "ClipboardEvent"): ClipboardEvent;
	createEvent(eventInterface: "CloseEvent"): CloseEvent;
	createEvent(eventInterface: "CompositionEvent"): CompositionEvent;
	createEvent(eventInterface: "CustomEvent"): CustomEvent;
	createEvent(eventInterface: "DeviceMotionEvent"): DeviceMotionEvent;
	createEvent(eventInterface: "DeviceOrientationEvent"): DeviceOrientationEvent;
	createEvent(eventInterface: "DragEvent"): DragEvent;
	createEvent(eventInterface: "ErrorEvent"): ErrorEvent;
	createEvent(eventInterface: "FocusEvent"): FocusEvent;
	createEvent(eventInterface: "FontFaceSetLoadEvent"): FontFaceSetLoadEvent;
	createEvent(eventInterface: "FormDataEvent"): FormDataEvent;
	createEvent(eventInterface: "GamepadEvent"): GamepadEvent;
	createEvent(eventInterface: "HashChangeEvent"): HashChangeEvent;
	createEvent(eventInterface: "IDBVersionChangeEvent"): IDBVersionChangeEvent;
	createEvent(eventInterface: "InputEvent"): InputEvent;
	createEvent(eventInterface: "KeyboardEvent"): KeyboardEvent;
	createEvent(eventInterface: "MediaEncryptedEvent"): MediaEncryptedEvent;
	createEvent(eventInterface: "MediaKeyMessageEvent"): MediaKeyMessageEvent;
	createEvent(eventInterface: "MediaQueryListEvent"): MediaQueryListEvent;
	createEvent(eventInterface: "MediaRecorderErrorEvent"): MediaRecorderErrorEvent;
	createEvent(eventInterface: "MediaStreamTrackEvent"): MediaStreamTrackEvent;
	createEvent(eventInterface: "MessageEvent"): MessageEvent;
	createEvent(eventInterface: "MouseEvent"): MouseEvent;
	createEvent(eventInterface: "MouseEvents"): MouseEvent;
	createEvent(eventInterface: "MutationEvent"): MutationEvent;
	createEvent(eventInterface: "MutationEvents"): MutationEvent;
	createEvent(eventInterface: "OfflineAudioCompletionEvent"): OfflineAudioCompletionEvent;
	createEvent(eventInterface: "PageTransitionEvent"): PageTransitionEvent;
	createEvent(eventInterface: "PaymentMethodChangeEvent"): PaymentMethodChangeEvent;
	createEvent(eventInterface: "PaymentRequestUpdateEvent"): PaymentRequestUpdateEvent;
	createEvent(eventInterface: "PointerEvent"): PointerEvent;
	createEvent(eventInterface: "PopStateEvent"): PopStateEvent;
	createEvent(eventInterface: "ProgressEvent"): ProgressEvent;
	createEvent(eventInterface: "PromiseRejectionEvent"): PromiseRejectionEvent;
	createEvent(eventInterface: "RTCDTMFToneChangeEvent"): RTCDTMFToneChangeEvent;
	createEvent(eventInterface: "RTCDataChannelEvent"): RTCDataChannelEvent;
	createEvent(eventInterface: "RTCPeerConnectionIceErrorEvent"): RTCPeerConnectionIceErrorEvent;
	createEvent(eventInterface: "RTCPeerConnectionIceEvent"): RTCPeerConnectionIceEvent;
	createEvent(eventInterface: "RTCTrackEvent"): RTCTrackEvent;
	createEvent(eventInterface: "SecurityPolicyViolationEvent"): SecurityPolicyViolationEvent;
	createEvent(eventInterface: "SpeechSynthesisErrorEvent"): SpeechSynthesisErrorEvent;
	createEvent(eventInterface: "SpeechSynthesisEvent"): SpeechSynthesisEvent;
	createEvent(eventInterface: "StorageEvent"): StorageEvent;
	createEvent(eventInterface: "SubmitEvent"): SubmitEvent;
	createEvent(eventInterface: "TouchEvent"): TouchEvent;
	createEvent(eventInterface: "TrackEvent"): TrackEvent;
	createEvent(eventInterface: "TransitionEvent"): TransitionEvent;
	createEvent(eventInterface: "UIEvent"): UIEvent;
	createEvent(eventInterface: "UIEvents"): UIEvent;
	createEvent(eventInterface: "WebGLContextEvent"): WebGLContextEvent;
	createEvent(eventInterface: "WheelEvent"): WheelEvent;
	createEvent(eventInterface: string): Event;
	/**
	 * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
	 * @param root The root element or node to start traversing on.
	 * @param whatToShow The type of nodes or elements to appear in the node list
	 * @param filter A custom NodeFilter function to use. For more information, see filter. Use null for no filter.
	 */
	createNodeIterator(root: Node, whatToShow?: number, filter?: NodeFilter | null): NodeIterator;
	/** Returns a ProcessingInstruction node whose target is target and data is data. If target does not match the Name production an "InvalidCharacterError" DOMException will be thrown. If data contains "?>" an "InvalidCharacterError" DOMException will be thrown. */
	createProcessingInstruction(target: string, data: string): ProcessingInstruction;
	/**  Returns an empty range object that has both of its boundary points positioned at the beginning of the document. */
	createRange(): Range;
	/**
	 * Creates a text string from the specified value.
	 * @param data String that specifies the nodeValue property of the text node.
	 */
	createTextNode(data: string): Text;
	/**
	 * Creates a TreeWalker object that you can use to traverse filtered lists of nodes or elements in a document.
	 * @param root The root element or node to start traversing on.
	 * @param whatToShow The type of nodes or elements to appear in the node list. For more information, see whatToShow.
	 * @param filter A custom NodeFilter function to use.
	 */
	createTreeWalker(root: Node, whatToShow?: number, filter?: NodeFilter | null): TreeWalker;
	/**
	 * Executes a command on the current document, current selection, or the given range.
	 * @param commandId String that specifies the command to execute. This command can be any of the command identifiers that can be executed in script.
	 * @param showUI Display the user interface, defaults to false.
	 * @param value Value to assign.
	 * @deprecated
	 */
	execCommand(commandId: string, showUI?: boolean, value?: string): boolean;
	/** Stops document's fullscreen element from being displayed fullscreen and resolves promise when done. */
	exitFullscreen(): Promise<void>;
	exitPictureInPicture(): Promise<void>;
	exitPointerLock(): void;
	/**
	 * Returns a reference to the first object with the specified value of the ID attribute.
	 * @param elementId String that specifies the ID value.
	 */
	getElementById(elementId: string): HTMLElement | null;
	/** Returns a HTMLCollection of the elements in the object on which the method was invoked (a document or an element) that have all the classes given by classNames. The classNames argument is interpreted as a space-separated list of classes. */
	getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
	/**
	 * Gets a collection of objects based on the value of the NAME or ID attribute.
	 * @param elementName Gets a collection of objects based on the value of the NAME or ID attribute.
	 */
	getElementsByName(elementName: string): NodeListOf<HTMLElement>;
	/**
	 * Retrieves a collection of objects based on the specified element name.
	 * @param name Specifies the name of an element.
	 */
	getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
	getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
	getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
	/**
	 * If namespace and localName are "*" returns a HTMLCollection of all descendant elements.
	 *
	 * If only namespace is "*" returns a HTMLCollection of all descendant elements whose local name is localName.
	 *
	 * If only localName is "*" returns a HTMLCollection of all descendant elements whose namespace is namespace.
	 *
	 * Otherwise, returns a HTMLCollection of all descendant elements whose namespace is namespace and local name is localName.
	 */
	getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
	getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
	getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
	/** Returns an object representing the current selection of the document that is loaded into the object displaying a webpage. */
	getSelection(): Selection | null;
	/** Gets a value indicating whether the object currently has focus. */
	hasFocus(): boolean;
	hasStorageAccess(): Promise<boolean>;
	/**
	 * Returns a copy of node. If deep is true, the copy also includes the node's descendants.
	 *
	 * If node is a document or a shadow root, throws a "NotSupportedError" DOMException.
	 */
	importNode<T extends Node>(node: T, deep?: boolean): T;
	/**
	 * Opens a new window and loads a document specified by a given URL. Also, opens a new window that uses the url parameter and the name parameter to collect the output of the write method and the writeln method.
	 * @param url Specifies a MIME type for the document.
	 * @param name Specifies the name of the window. This name is used as the value for the TARGET attribute on a form or an anchor element.
	 * @param features Contains a list of items separated by commas. Each item consists of an option and a value, separated by an equals sign (for example, "fullscreen=yes, toolbar=yes"). The following values are supported.
	 * @param replace Specifies whether the existing entry for the document is replaced in the history list.
	 */
	open(unused1?: string, unused2?: string): Document;
	open(url: string | URL, name: string, features: string): WindowProxy | null;
	/**
	 * Returns a Boolean value that indicates whether a specified command can be successfully executed using execCommand, given the current state of the document.
	 * @param commandId Specifies a command identifier.
	 * @deprecated
	 */
	queryCommandEnabled(commandId: string): boolean;
	/**
	 * Returns a Boolean value that indicates whether the specified command is in the indeterminate state.
	 * @param commandId String that specifies a command identifier.
	 */
	queryCommandIndeterm(commandId: string): boolean;
	/**
	 * Returns a Boolean value that indicates the current state of the command.
	 * @param commandId String that specifies a command identifier.
	 * @deprecated
	 */
	queryCommandState(commandId: string): boolean;
	/**
	 * Returns a Boolean value that indicates whether the current command is supported on the current range.
	 * @param commandId Specifies a command identifier.
	 * @deprecated
	 */
	queryCommandSupported(commandId: string): boolean;
	/**
	 * Returns the current value of the document, range, or current selection for the given command.
	 * @param commandId String that specifies a command identifier.
	 */
	queryCommandValue(commandId: string): string;
	/** @deprecated */
	releaseEvents(): void;
	requestStorageAccess(): Promise<void>;
	/**
	 * Writes one or more HTML expressions to a document in the specified window.
	 * @param content Specifies the text and HTML tags to write.
	 */
	write(...text: string[]): void;
	/**
	 * Writes one or more HTML expressions, followed by a carriage return, to a document in the specified window.
	 * @param content The text and HTML tags to write.
	 */
	writeln(...text: string[]): void;
	addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;

	adoptedStyleSheets: CSSStyleSheet[];
}
declare var document: Document;
interface HTMLElement extends Element, DocumentAndElementEventHandlers, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
	accessKey: string;
	readonly accessKeyLabel: string;
	autocapitalize: string;
	dir: string;
	draggable: boolean;
	hidden: boolean;
	innerText: string;
	lang: string;
	readonly offsetHeight: number;
	readonly offsetLeft: number;
	readonly offsetParent: Element | null;
	readonly offsetTop: number;
	readonly offsetWidth: number;
	outerText: string;
	spellcheck: boolean;
	title: string;
	translate: boolean;
	attachInternals(): ElementInternals;
	click(): void;
	addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare var HTMLElement: {
	prototype: HTMLElement;
	new(): HTMLElement;
};
interface HTMLDivElement extends HTMLElement {
	/**
	 * Sets or retrieves how the object is aligned with adjacent text.
	 * @deprecated
	 */
	align: string;
	addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
	removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLDivElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
}
declare var HTMLDivElement: {
	prototype: HTMLDivElement;
	new(): HTMLDivElement;
};

declare global {
	interface Window {
		g_auto_buy: main.AutoBuy;
		da: any[];
		lightreset(): void;
		specialclick(that: any): void;
	}
}

// ==UserScript==
// @name		 rebuild the universe automation
// @namespace	http://tampermonkey.net/
// @version	  0.1
// @description  try to take over the world!
// @author	   You
// @match		http://rebuildtheuniverse.com/*
// @match		http://rebuildtheuniverse.com
// @match		https://rebuildtheuniverse.com/*
// @match		https://rebuildtheuniverse.com
// @run-at	   document-start
// @grant		none
// ==/UserScript==
// spell:words deref
// spell:words lazyload
// spell:words adsbygoogle deinit totalAtome _targets_achi totalAchi tonext atomepersecond lightreset lightgray
/* eslint-disable no-undef,no-lone-blocks,no-eval */
type TimerTypeTag = 1 | 2;
declare namespace Remote {
	type TimerTypeTag = 1 | 2;
	class RemoteTimer {
		m_remote_to_local_timer_state_map: Map<any, any>;
		m_api_info: typeof RemoteTimerApiInfo;
		constructor(api_info: typeof RemoteTimerApiInfo);
		fire(remote_id): void;
		set(timer_type_tag, remote_id, delay): number;
		verify_timer_type_tag(type_tag: TimerTypeTag): void;
		verify_timer_state(local_state, remote_id): void;
		validate_timer_type_tag(type_tag: TimerTypeTag): boolean;
		validate_timer_state(local_state): boolean;
		clear(remote_id: number);
		do_clear(clear_msg: {v: number, t: number}): void;
	}
	class RemoteWorkerState {
		m_timer: RemoteTimer;
		unique_script_id: number;
		set_timer(timer: RemoteTimer): void;
		timer_set(timer_type_tag: TimerTypeTag, remote_id: number, timeout: number): number;
		do_timer_clear(timer_clear_msg: {t: number, v: number}): void;
	}
	function timer_nop(): void;
	function fire_timer(timer: RemoteTimer, remote_id: number): void;
	let remote_worker_state: RemoteWorkerState;
	var RemoteTimerApiInfo: {
		async_reply_msg_id: 1,
		timer_reply_msg_id: 2,
		reply_msg_id: 100,
		fire_single_msg_id: 101,
		fire_repeating_msg_id: 102,
		remote_reply_msg_id: 200,
		worker_update_code: 201,
		async_worker_ready_msg_id: 202,
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		clear_any_msg_id: 207,
		set_single: "setTimeout",
		set_repeating: "setInterval",
		clear_single: "clearTimeout",
		clear_repeating: "clearInterval"
	};
}

export const TIMER_SINGLE = 1;
export const TIMER_REPEATING = 2;
export const TIMER_TAG_COUNT = 3;
export const AUDIO_ELEMENT_VOLUME = 0.58;
declare class DocumentWriteList {
	list: any[];
	attached: boolean;
	end_symbol: Symbol;
	document_write: Document['write'];
	attached_document: Document;
	document_write_proxy: Document['write'];
	write(args_spread: [Document['write'], Document, string[]]): void;
	attach_proxy(document: Document): void;
	destroy(should_try_to_destroy: true): void;
}
declare class UniqueIdGenerator {
	m_current: number;
	set_current(current_value: number): void
	current(): number;
	next(): number;
}
declare class PromiseExecutorHandle {
	m_closed: boolean;
	m_accept;
	m_reject;
	constructor(accept, reject);
	accept(value): void;
	reject(error): void;
	closed(): boolean;
	close(): void;
}
declare namespace StringTuringTools {
	type First<T extends string> = T extends `${infer U}${string}` ? U : ''
	type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : ''

	type Reverse<U extends string> = U extends ''
		? ''
		: U extends '1' | '0'
		? U
		: `${Reverse<RemoveFirst<U>>}${First<U>}`

	type Last<T extends string> = First<Reverse<T>>
	type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>
	type Data = 'abcd';
	type RevData = Reverse<Data>;
	type T1 = Reverse<RemoveFirst<Data>>;
}
declare namespace ArrayTuringTools {
	type FirstStr<T extends string> = T extends `${infer U}${string}` ? U : ''
	type RemoveFirstStr<T extends string> = T extends `${string}${infer U}` ? U : ''
	type First<T extends any[]> = T extends [infer U, ...any[]] ? U : []
	type RemoveFirst<T extends any[]> = T extends [any, ...infer U] ? U : []
	type ReverseStr<U extends string> = U extends '' ? '' : `${ReverseStr<RemoveFirstStr<U>>}${FirstStr<U>}`
	type ReverseArr<U extends any[]> = U extends [] ? [] : [...Reverse<RemoveFirst<U>>, First<U>];

	type Reverse<U extends any[] | string> = U extends string ? ReverseStr<U> : U extends any[] ? ReverseArr<U> : never;
	type Data = [1, 2, 3, 4];
	type RevDataStr = Reverse<"Data">;
	type RevDataArr = Reverse<Data>;
}
// STRING MANIPULATION TOOLS
type First<T extends string> = T extends `${infer U}${string}` ? U : ''
type RemoveFirst<T extends string> = T extends `${string}${infer U}` ? U : ''

type Reverse<U extends string> = U extends '' ? '' : `${Reverse<RemoveFirst<U>>}${First<U>}`

type Last<T extends string> = First<Reverse<T>>
type RemoveLast<T extends string> = Reverse<RemoveFirst<Reverse<T>>>
type ReturnValue<T> = T extends (...a: any[]) => infer U ? U : never;
type ReturnValueV<T> = T extends (...a: any[]) => infer U ? U : never;

declare var atomepersecond: number;
declare var totalAtome: number;
declare var prestige: number;

interface ElementCSSInlineStyle {
	style: CSSStyleDeclaration;
}

// declare var window:Window;

declare module main {
	function timer_nop(): void;
	class WorkerState {
		rejected: boolean;
		valid: boolean;
		connected: boolean;
		worker_code: Blob;
		timer: Timer;
		executor_handle: PromiseExecutorHandle;
		worker: Worker;
		worker_url: string;
		constructor(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle);
		init(): void;
		set_promise_executor_handle(handle: PromiseExecutorHandle): void;
		on_result(result): void;
		dispatch_message(result): void;
		postMessage(data): void;
		static has_global_state(): boolean;
		static has_old_global_state_value(worker_state_value: WorkerState): boolean;
		static equals_global_state(worker_state_value: WorkerState): boolean;
		static maybe_delete_old_global_state_value(worker_state_value: WorkerState): void;
		static maybe_delete_old_global_state(): boolean;
		static delete_old_global_state(): void;
		static destroy_old_worker_state(worker_state_value: WorkerState, before_destroy_call_name: ""): void;
		static get_global_state(): void;
		static set_global_state(worker_state_value: WorkerState): void;
		static delete_global_state(): void;
		static get global_state_key(): "g_worker_state";
		destroy(): void;
	}
	class TimerStateData {
		type: TimerTypeTag;
		active: boolean;
		target_function: Function;
		target_arguments: any[];
	}
	type message203 = {
		t: 203,
		v: {
			t: number,
			v: number
		}
	};
	type message204 = {
		t: 204,
		v: {
			t: number,
			v: number
		}
	};
	type message205 = {
		t: 205,
		v: number
	};
	type message206 = {
		t: 206,
		v: number
	};
	class Timer {
		id_generator: UniqueIdGenerator;
		m_remote_id_to_main_state_map: Map<number, TimerStateData>;
		weak_worker_state: WeakRef<WorkerState>;
		m_api_map: Map<
			"setTimeout" | "setInterval" | "clearTimeout" | "clearInterval",
			typeof setTimeout | typeof setInterval | typeof clearInterval | typeof clearTimeout
		>;
		m_api_info: TimerApiInfo;
		base_id: number;
		constructor(id_generator, api_info: TimerApiInfo);
		set_worker_state(worker_state_value: WorkerState);
		verify_timer_type_tag(type_tag: TimerTypeTag): void;
		verify_timer_state(main_state: TimerStateData, remote_id: number): void;
		validate_timer_type_tag(type_tag: TimerTypeTag): boolean;
		validate_timer_state(main_state: TimerStateData): boolean;
		fire(timer_mode_tag: TimerTypeTag, remote_id: number): void;
		set(timer_mode_tag: TimerTypeTag, handler: TimerHandler, delay, target_arguments: any[]): number;
		is_main_state_stored_by_id(remote_id: number): boolean;
		get_main_state_by_id(remote_id: number): TimerStateData;
		store_main_state_by_id(remote_id: number, main_state: TimerStateData): void;
		delete_main_state_by_id(remote_id: number): void;
		main_state_entries(): IterableIterator<[number, TimerStateData]>;
		on_result(timer_result_msg: {t: 205 | 206, v: number}): void;
		force_clear(timer_mode_tag: TimerTypeTag, remote_id: number): ReturnValue<typeof this.clear>;
		clear(timer_mode_tag: TimerTypeTag, remote_id): void;
		destroy(): void;
	}
	class VerifyError extends Error {
		name: "VerifyError";
		constructor(message: string);
	}
	function VERIFY(assert_result: boolean, assert_message: string): void;
	function verify_worker_code_callback(verify_obj): void;
	type TimerApiInfo = {
		set_single_msg_id: 203,
		set_repeating_msg_id: 204,
		clear_single_msg_id: 205,
		clear_repeating_msg_id: 206,
		set_single: "setTimeout",
		clear_single: "clearTimeout",
		set_repeating: "setInterval",
		clear_repeating: "clearInterval"
	};
	function create_worker_state(worker_code_blob: Blob, timer: Timer, executor_handle: PromiseExecutorHandle): WorkerState;
	const setTimeout_global: typeof setTimeout;
	function remoteSetTimeout(handler, timeout, ...target_arguments): number;
	const clearTimeout_global: typeof clearTimeout;
	function remoteClearTimeout(id?: number): void;
	const setInterval_global: typeof setInterval;
	function remoteSetInterval(handler: TimerHandler, timeout?: number, ...target_arguments: any[]): number;
	const clearInterval_global: typeof clearInterval;
	function remoteClearInterval(id?: number): void;
	function move_timers_to_worker_promise_executor(executor_accept, executor_reject): {
		get(): WorkerState;
	};
	function remove_element_callback(e: HTMLScriptElement): void
	function remove_bad_dom_script_element(): void;
	class EventHandlerDispatch {
		target_obj: any;
		target_name: string;
		constructor(target_obj, target_name);
		handleEvent(event): void;
	}
	type StackInstructionTypeCategory = ['push', ...any[]] | ['drop'];
	type ObjectInstructionTypeCategory = ['get'];
	type CallInstructionTypeCategory = ['call', number] | ['return'];
	type TuringInstructionTypeCategory = ['halt'];
	type SpecialInstructionTypeCategory = ['push_args'] | ['this'] | ['push_window'];
	type DebugInstructionTypeCategory = ['breakpoint'];
	type InstructionType = StackInstructionTypeCategory
		| ObjectInstructionTypeCategory
		| CallInstructionTypeCategory
		| TuringInstructionTypeCategory
		| SpecialInstructionTypeCategory
		| DebugInstructionTypeCategory;
	class SimpleStackVM<ReturnType, StackItemType> {
		instructions: InstructionType[];
		instruction_pointer: number;
		stack: StackItemType[];
		return_value: ReturnType;
		running: boolean;
		constructor(instructions);
		reset(): void;
		push(value: StackItemType): void;
		pop(): StackItemType;
		run(...run_arguments): ReturnType;
	}
	class EventHandlerVMDispatch extends SimpleStackVM<any, any> {
		target_obj: any;
		constructor(instructions, target_obj);
		handleEvent(event): void;
	}
	class CompressionStatsCalculator {
		hit_counts: number[];
		cache: string[];
		constructor();
		map_values(): this['hit_counts'];
		map_keys(): this['cache']
		add_hit(index: number);
		add_item(key: string);
		reset();
		calc_compression_stats(arr, win_size): any[];
		calc_for_stats_window_size(stats_arr, arr, win_size): void;
		calc_for_stats_index(stats_arr, arr, index): void;
	}
	class BaseCompression {
		did_compress(src: string[], dst: string[]): boolean;
		did_decompress(src: string[], dst: string[]): boolean;
		compress_result(src: string[], dst: string[]): [boolean, string[]];
		decompress_result(src, dst): [boolean, string[]];
	}
	class CompressedArray extends Array<string>{}
	class UncompressedArray extends Array<string>{}
	class MulCompression extends BaseCompression {
		stats_calculator: CompressionStatsCalculator;
		compression_stats: any[];
		constructor();
		try_compress(arr: UncompressedArray): [boolean, CompressedArray | null];
		try_decompress(arr: CompressedArray): [boolean, UncompressedArray];
		compress_array(arr: UncompressedArray): CompressedArray;
	}
	function calc_ratio(arr: number[]): number | 0;
	class AverageRatio {
		arr: number[];
		history: number[];
		count: number;
		len: number;
		history_len: number;
		weight: number;
		human_duration: string;
		constructor(max_len: number, max_history_len: number, weight: number, human_duration: string, initial_arr: number[]);
		add(value: number, from_prev: boolean, debug: boolean): boolean;
		can_average(): boolean;
		get_average(): number;
	}
	interface RecordType {
		on_child_start(root): void;
		on_child_run(root): void;
	}
	class BaseRecord {
		root: RecordType;
		constructor(root: RecordType);
		start(): void;
		run(): void;
	}
	class AsyncDelayRecord extends BaseRecord {
		cint: number;
		target_obj: any;
		target_get_member_name: string;
		label: string;
		timeout: number;
		constructor(root: RecordType, target_obj: any, get_member_name: string, label: string);
		start(): void;
		run(self?: this): void;
	}
	class AnyRecordRoot {
		children: BaseRecord[];
		constructor();
		on_child_start(record: BaseRecord): void;
		on_child_run(record: BaseRecord): void;
	}
	class AverageRatioRoot {
		map: Map<string, AverageRatio>;
		ordered_keys: string[];
		constructor();
		set_ordered_keys(ordered_keys: string[]): void;
		can_average(key: string): boolean;
		get_average(key: string): number;
		push_ratio(ratio_tuple: [key: string, ratio: AverageRatio]): void;
		push(value: number): void;
	}
	class AutoBuyState {
		debug: boolean;
		arr: number[];
		ratio: number;
		compressor_stats: any[];
		arr_max_len: number;
		val: number;
		ratio_mode: 0 | 1 | 2 | 3;
		locked_cycles: number;
		record_root: AnyRecordRoot;
		is_init_complete: boolean;
		avg: AverageRatioRoot;
		prev_atomepersecond: number;
		ratio_mult: number;
		div: number;
		constructor();
		init();
		calc_ratio(): number | 0;
		append_value(value: number);
		update_ratio_mode()
		get_mul_modifier(): number;
		get_near_val(): [number, number];
		cycle_log(): void;
		update(): void;
		reset(): void;
	}
	function auto_buy_unload_handler(): void;
	type TimeoutCintItem = [0, number, string];
	type CIntItem = TimeoutCintItem;
	var timeplayed: number;
	function lightreset(): void;
	function lightreset_inject(): void;
	function async_compress(self: AutoBuy): void;
	//return this.extra * Math.pow(pow_base, pow_num) / div;
	//<typeof this.extra, typeof pow_base, typeof pow_num, typeof div>
	type get_delay_change_return_type<I extends number, N1 extends number, N2 extends number, N3 extends number> = I;
	class AutoBuy {
		delay: number;
		extra: number;
		iter_count: number
		epoch_len: number
		background_audio: HTMLAudioElement;
		state: AutoBuyState
		cint_arr: CIntItem[];
		skip_save: boolean
		state_history_arr: string[] | CompressedArray;
		compressor: MulCompression;
		constructor();
		pre_init(): void;
		async_pre_init(): Promise<void>;
		save_state_history_arr(): void;
		load_state_history_arr(arr: string[]): void;
		delay_arr: number[];
		get_delay_arr_data(forced_action: string): string;
		save_delay_arr(): void;
		display_style_sheet: CSSStyleSheet;
		history_element: HTMLDivElement;
		delay_element: HTMLDivElement;
		hours_played_element: HTMLDivElement;
		percent_ratio_element: HTMLDivElement;
		percent_ratio_change_element: HTMLDivElement;
		state_log_element: HTMLDivElement;
		dom_pre_init(): void;
		state_history_arr_max_len: number;
		init_dom(): void;
		global_init(): void;
		cint: number;
		destroy(): void;
		parse_single_int(string: string): number;
		default_split(string: string): string[];
		parse_delay_arr(data: string): number[];
		load_delay_arr(): number[];
		update_dom(self?: this): void;
		init(): void;
		delayed_init(self?: this): void;
		state_history_clear_for_reset(): void;
		state_history_append(value: string): void;
		history_element_click_handler(event: Event): void;
		calc_delay_extra(): number;
		pre_total: number;
		main(self?: this): void;
		step_iter_start(): void;
		get_delay_change(pow_base: number, pow_num: number, div: number):
			get_delay_change_return_type<typeof this.extra, typeof pow_base, typeof pow_num, typeof div>;
		update_delay(change: number, decrease: boolean): void;
		do_delay_dec(pow_terms, div): void;
		do_delay_inc(pow_terms, div): void;
		large_decrease(): void;
		normal_decrease(): void;
		rare_begin_or_faster_delay(self?: this): void;
		faster_delay(self?: this): void;
		fast_unit_delay(self?: this): void;
		fast_unit(self?: this): void;
		slow_final(self?: this): void;
		bonus(self?: this): void;
		special_delay(self?: this): void;
		is_special_done(special_buyable: {done: boolean, cost: number}): boolean;
		do_special(self?: this): boolean;
		bonus_delay(self?: this): void;
		special(self?: this): void;
		initial_special(self?: this): void;
		rare_begin(self?: this): void;
		reset_delay_trigger(self?: this): void;
		reset_delay_start(self?: this): void;
		reset_delay_run(self?: this): void;
		reset_delay_init(self?: this): void;
	}
	const auto_buy_obj: AutoBuy;
	class AsyncTrigger<S, W, N> {
		m_set_flag: boolean;
		trigger_handler: any;
		promise_set: Promise<S>;
		m_set: (value: S) => void;
		m_set_error: (reason?: any) => void;
		constructor();
		set(cnt: S): void;
		set_error(opt_error: any): void;
		wait(): Promise<W>;
		m_can_notify: boolean;
		m_notify: (value: N) => void;
		notify(cnt: N): void;
		m_notify_error: (reason?: any) => void;
		notify_error(error: any): void;
		notify_promise: Promise<N>;
		notified(): Promise<N>;
	}
	type PromiseResult<T extends Promise<any>> = T extends Promise<infer U> ? U : never;
	class Sub<N, V>{
		run(v: N, n: V): number;
	}
	class WhileDoLoop extends TypeRun<any> {}
	class IfStatement extends TypeRun<any> {}
	class TypeRun<T> {
		run_arg1(using_val: T): void;
	}
	//spell: disable-next-line
	class TypeRunOper<A, B> extends TypeRun<A | B>{
		run_arg2(right: A, left: B): void;
	}
	//spell: disable-next-line
	class TypeRunLtEq<A, B> extends TypeRunOper<A, B>{}
	class AsyncSemaphore {
		count: number;
		notify_waiters_vec: AsyncTrigger<any, void, number>[];
		constructor();
		inc(cnt: number): Promise<void>;
		dec(cnt: number): Promise<void>;
	}
	function do_auto_unit_promote(): void;
	function map_to_tuple(e: any, i: any): [typeof e, typeof this[typeof i]];
	function to_tuple_arr(keys: any[], values: any): ReturnValue<typeof keys.map>;
	function promise_exec(a: (value: void) => void): void;
	function do_async_wait(delay: number): Promise<void>;
	function array_sample_end(arr: string[], rem_target_len: number): string[];
	function char_len_of<T extends string>(arr: T[]): number;
	var allspec:any[];
	//spell:words specialsbought atomsinvest checkspec specaps noti plurials updateprogress achiSpec
	function specialclick_inject(that: typeof allspec[number]): void;
	function on_page_is_loaded(): void;
	var g_proxy_state;
	class ProxyHandlers {
		count_arr: number[];
		constructor(root: any);
		so_init(): void;
		weak_root: WeakRef<KeepSome>;
		generic(
			type: string,
			call_args: [target: object, propertyKey: PropertyKey, value: any, receiver?: any]
				| [target: object, propertyKey: PropertyKey, receiver?: any]
				| [target: Function, thisArgument: any, argumentsList: ArrayLike<any>],
			from: any[]
		): void;
		set_(
			obj: any,
			call_args: [
				target: object,
				propertyKey: PropertyKey,
				value: any,
				receiver?: any
			],
			from: (string | number | null)[]
		): boolean;
		get_(
			obj: any,
			call_args: [
				target: object,
				propertyKey: PropertyKey,
				receiver?: any
			],
			from: (string | number | null)[]
		): any;
		apply_(
			obj: any,
			call_args: [
				target: Function, thisArgument: any,
				argumentsList: ArrayLike<any>
			],
			from: (string | number | null)[]
		): any;
		defineProperty_(
			obj: any,
			call_args: [
				target: object,
				propertyKey: PropertyKey,
				attributes: PropertyDescriptor
			],
			from: (string | number | null)[]
		): boolean;
		getOwnPropertyDescriptor_(
			obj: any,
			call_args: [
				target: object,
				propertyKey: PropertyKey
			],
			from: (string | number | null)[]
		): PropertyDecorator;
	}
	class KeepSome extends Array {
		constructor();
		push(value: any): number;
		push_at<T extends 0>(index: T, value: any): number;
		push_at<T extends number>(index: T, value: any): number | void;
		push_va(...a: any[]):void;
	}
	function define_property_value(obj: any, name: any, value: any, ...props:[writable?:boolean, enumerable?:boolean, configurable?:boolean]):void;
	function define_property_get_set(obj: any, name: any, get_set_obj: any, ...props:[enumerable:boolean, configurable:boolean]):void;
	function define_property_get_void(obj: any, name: any, ...props:[enumerable?:boolean, configurable?:boolean]):void;
	function define_property_set_callback(obj: any, name: any, set: any, ...props:[enumerable?:boolean, configurable?:boolean]):void;
	function got_jquery(jquery_func):void;
	function proxy_jquery():void;
	function pace_finish_proxy_apply(func:Function, this_v:any, args:ArrayLike<any>):void;
	function on_game_data_set():void;
	function on_timers_moved():void;
	function dom_add_elm_filter(elm:HTMLScriptElement):boolean;
	function main():void;
}