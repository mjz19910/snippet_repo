import {FakeHTMLElement} from "../HTMLElement.js";
export class CastResult {
	/**@readonly*/
	type = "cast_result";
	for_type = "FakeHTMLElement";
	/**@type {FakeHTMLElement|undefined} */
	value;
	/**@returns {true}*/
	is_cast_result() {
		return true;
	}
	/**
	 * @param {FakeHTMLElement} value
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
