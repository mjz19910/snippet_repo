import {any} from "./any.js";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMBadge} from "./implementation/mod.js";
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
import {FakeElement} from "./FakeElement.js";
import {NullBadge} from "./NullBadge.js";
export {
	create_fake,
	fake,
};
export {
	any,
	DocumentImpl,
	DOMBadge,
	DOMStringList,
	FakeDocument,
	FakeHTMLElement,
	FakeLocation,
	FakeNode,
	FakeStorage,
	FakeWindow,
	FakeElement,
	FakeWindowNoImpl,
	HTMLAnchorElement,
	HTMLDivElement,
	HTMLFormElement,
	HTMLIFrameElement,
	HTMLUnknownElement,
	NullBadge,
};

export function use_imports() {
	return [
		any,
		DocumentImpl,
		DOMBadge,
		DOMStringList,
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
	];
}
