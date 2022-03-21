// FakeHTMLElement -> [./FakeElement.js -> [./Element.js, ./api/CastResult.js], ./FakeDocument.js]
// !!! FakeHTMLElement -> ./api/CastResult.js -> FakeHTMLElement.js
import {FakeHTMLElementType} from "./FakeHTMLElementType.js";
export class CastResult {
	/**@readonly*/
	type = "cast_result";
	for_type = "FakeHTMLElement";
	/**@type {FakeHTMLElementType|undefined} */
	value;
	/**@returns {true}*/
	is_cast_result() {
		return true;
	}
	/**
	 * @param {FakeHTMLElementType} value
	 */
	constructor(value) {
		if(!value)throw new Error("Bad");
		this.value=value;
	}
	has_value(){
		return this.value !== void 0;
	}
	release_value() {
		let {value}=this;
		if(!value)throw new Error("Value required in release_value");
		this.value=void 0;
		return value;
	}
}
