import {FakeDocument} from "./FakeDocument.js";

export function get_FakeXMLDocument() {
	/**@implements {XMLDocument} */
	class FakeXMLDocument extends FakeDocument {}
	return FakeXMLDocument;
}
