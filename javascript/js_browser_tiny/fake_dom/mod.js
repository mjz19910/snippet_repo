import {any} from "./any.js";
import {create_fake, fake} from "./browse/mod.js";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMBadge} from "./implementation/mod.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeDOMStringList} from "./FakeDOMStringList.js";
import {FakeElement} from "./FakeElement.js";
import {FakeLocation} from "./FakeLocation.js";
import {FakeNode} from "./FakeNode.js";
import {FakeStorage} from "./FakeStorage.js";
import {FakeWindow} from "./FakeWindow.js";
import {FakeWindowNoImpl} from "./FakeWindowNoImpl.js";
import {HTMLAnchorElement} from "./FakeHTMLAnchorElement.js";
import {HTMLDivElement} from "./FakeHTMLDivElement.js";
import {HTMLFormElement} from "./FakeHTMLFormElement.js";
import {HTMLIFrameElement} from "./FakeHTMLIFrameElement.js";
import {HTMLUnknownElement} from "./FakeHTMLUnknownElement.js";
import {NullBadge} from "./NullBadge.js";

export {
	create_fake,
	fake,
};

export {
	any,
	DocumentImpl,
	DOMBadge,
	FakeDOMStringList,
	FakeDocument,
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
	/**@type {{}[][]} */
	let groups=[];
	groups.push([
		create_fake,
		fake
	]);
	groups.push([
		any,
		DocumentImpl,
		DOMBadge,
		FakeDOMStringList,
		FakeDocument,
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
	]);
	return groups;
}
