// FakeHTMLElement -> [./FakeElement.js -> [./Element.js], ./FakeDocument.js]
// 
export class Result {
	has_value() {
		return false;
	}
	/**@returns {{}} */
	release_value() {
		throw new Error("No value");
	}
}
