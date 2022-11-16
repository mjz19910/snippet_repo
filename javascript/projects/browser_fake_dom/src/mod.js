import {create_fake,fake} from "./browse/mod.js";
import {FakeDOMImplementation} from "./FakeDOMImplementation.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeDOMStringList} from "./FakeDOMStringList.js";
import {FakeElement} from "./FakeElement.js";
import {HTMLAnchorElement} from "./FakeHTMLAnchorElement.js";
import {HTMLDivElement} from "./FakeHTMLDivElement.js";
import {HTMLFormElement} from "./FakeHTMLFormElement.js";
import {HTMLIFrameElement} from "./FakeHTMLIFrameElement.js";
import {HTMLUnknownElement} from "./FakeHTMLUnknownElement.js";
import {FakeLocation} from "./FakeLocation.js";
import {FakeNode} from "./FakeNode.js";
import {FakeStorage} from "./FakeStorage.js";
import {FakeWindow} from "./FakeWindow.js";
import {FakeWindowNoImpl} from "./FakeWindowNoImpl.js";
import {DomBadge} from "./implementation/mod.js";
import {NullBadge} from "./NullBadge.js";

export function use_imports() {
	/**@type {{}[][]} */
	let groups=[];
	groups.push([
		create_fake,
		fake
	]);
	groups.push([
		FakeDOMImplementation,
		DomBadge,
		FakeDOMStringList,
		FakeDocument,
		FakeElement,
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
