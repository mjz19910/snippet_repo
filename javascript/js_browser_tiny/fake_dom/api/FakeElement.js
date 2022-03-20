import {FakeHTMLElement} from "../HTMLElement.js";
import {CastResult} from "./CastResult.js";
import {Result} from "./Result.js";
export class FakeElement {
	tag_description = {};
	/**
	 * @param {string} tag_name
	 */
	is_tag(tag_name) {
		console.debug("tag name not handled in is_tag", tag_name)
		return true;
	}
	/**
	 * @param {"html"} tag_name
	 * @returns {CastResult | Result}
	 */
	castNodeTo(tag_name) {
		switch(tag_name) {
			case 'html':if(this.is_tag(tag_name)){
				/**@type {any}*/
				let cast_as=this;
				/**@type {FakeHTMLElement}*/
				let cast_res=cast_as;
				return new CastResult(cast_res);
			}
			default:return new Result;
		}
	}
}
