import {any} from "./any.js";
import {DocumentImpl} from "./DocumentImpl.js";
import {DOMBadge} from "./implementation/mod.js";
import {DOMStringList} from "./DOMStringList.js";
import {FakeDocument} from "./FakeDocument.js";
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
import {create_fake, fake} from "./browse/mod.js";

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
		DOMStringList,
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
