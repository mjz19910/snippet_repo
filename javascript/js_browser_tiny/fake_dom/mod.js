import {DOMBadge} from "fake-dom-implementation";
import {FakeWindow} from "./FakeWindow.js";
import {FakeDocument} from "./FakeDocument.js";
import {create_fake, fake} from "fake-dom-browse";
import {HTMLIFrameElement} from "./HTMLIFrameElement.js";
import {HTMLDivElement} from "./HTMLDivElement.js";
import {HTMLFormElement} from "./HTMLFormElement.js";
import {HTMLUnknownElement} from "./HTMLUnknownElement.js";
import {HTMLAnchorElement} from "./HTMLAnchorElement.js";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMStringList} from "./DOMStringList.js";
import {FakeLocation} from "./Location.js";

export {
	create_fake,
	DocumentImpl,
	DOMBadge,
	DOMStringList,
	fake,
	FakeDocument,
	FakeLocation,
	FakeWindow,
	HTMLAnchorElement,
	HTMLDivElement,
	HTMLFormElement,
	HTMLIFrameElement,
	HTMLUnknownElement,
};

export function use_imports(){
	return [
		create_fake,
		DocumentImpl,
		DOMBadge,
		DOMStringList,
		fake,
		FakeDocument,
		FakeLocation,
		FakeWindow,
		HTMLAnchorElement,
		HTMLDivElement,
		HTMLFormElement,
		HTMLIFrameElement,
		HTMLUnknownElement,
	]
}
