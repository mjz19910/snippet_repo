import {any} from "./any.js";
import {create_fake, fake} from "fake-dom-browse";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMBadge} from "fake-dom-implementation";
import {DOMStringList} from "./DOMStringList.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeHTMLElement} from "./HTMLElement.js";
import {FakeLocation} from "./Location.js";
import {FakeNode} from "./FakeNode.js";
import {FakeStorage} from "./Storage.js";
import {FakeWindow} from "./FakeWindow.js";
import {FakeWindowNoImpl} from "./FakeWindowNoImpl.js";
import {HTMLAnchorElement} from "./HTMLAnchorElement.js";
import {HTMLDivElement} from "./HTMLDivElement.js";
import {HTMLFormElement} from "./HTMLFormElement.js";
import {HTMLIFrameElement} from "./HTMLIFrameElement.js";
import {HTMLUnknownElement} from "./HTMLUnknownElement.js";
import {NullBadge} from "./NullBadge.js";

export {
	any,
	create_fake,
	DocumentImpl,
	DOMBadge,
	DOMStringList,
	fake,
	FakeDocument,
	FakeHTMLElement,
	FakeLocation,
	FakeNode,
	FakeStorage,
	FakeWindow,
	FakeWindowNoImpl,
	HTMLAnchorElement,
	HTMLDivElement,
	HTMLFormElement,
	HTMLIFrameElement,
	HTMLUnknownElement,
	NullBadge,
};

export function use_imports(){
	return [
		any,
		create_fake,
		DocumentImpl,
		DOMBadge,
		DOMStringList,
		fake,
		FakeDocument,
		FakeHTMLElement,
		FakeLocation,
		FakeNode,
		FakeStorage,
		FakeWindow,
		FakeWindowNoImpl,
		HTMLAnchorElement,
		HTMLDivElement,
		HTMLFormElement,
		HTMLIFrameElement,
		HTMLUnknownElement,
		NullBadge,
	]
}
