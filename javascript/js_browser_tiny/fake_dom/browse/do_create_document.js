import {FakeDocument} from "../FakeDocument.js";
import {BrowseBadge} from "./BrowseBadge.js";
import {fake} from "./mod.js";
/**@type {FakeDocument|null} */
export let fake_document = null;
export function init() {
	let fake_window=fake.window;
	if(!fake_window)throw new Error("Init window first");
	fake_document = new FakeDocument(fake_window, new BrowseBadge);
	fake.document = fake_document;
}
