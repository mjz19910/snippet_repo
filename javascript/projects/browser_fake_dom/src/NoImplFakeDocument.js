import {FakeNode} from "./FakeNode.js";

export class NoImplFakeDocument extends FakeNode {
	/**@returns {CSSStyleSheet[]} */
	get adoptedStyleSheets() {
		throw new Error("Not implemented");
	}
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
}
