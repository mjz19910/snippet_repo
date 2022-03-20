import {create_fake, fake} from "fake-dom-browse";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMBadge} from "fake-dom-implementation";
import {DOMStringList} from "./DOMStringList.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeLocation} from "./Location.js";
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
	create_fake,
	DocumentImpl,
	DOMBadge,
	DOMStringList,
	fake,
	FakeDocument,
	FakeLocation,
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
		create_fake,
		DocumentImpl,
		DOMBadge,
		DOMStringList,
		fake,
		FakeDocument,
		FakeLocation,
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
