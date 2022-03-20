import {FakeDocument} from "../fake_dom/FakeDocument.js";
import {FakeElement} from "../fake_dom/FakeElement.js";
import {DOMTagDescription} from "./DOMTagDescription.js";
export class DOMTagLoadHandlers {
	/**@argument {FakeDocument} document */
	constructor(document) {
		/**@type {FakeDocument} */
		this.document = document;
	}
	/**
	 * @argument {DOMTagDescription} dom_tag_description
	 * @param {any} state
	 */
	html(state, dom_tag_description) {
		const document_impl = this.document.implementation;
		void state;
		console.log('do_html_load on_tag html');
		if(!dom_tag_description.tagName)
			throw new Error("FIXME: how to handle tagName === null");
		var dom_node = this.document.construct_dom_node(dom_tag_description.tagName);
		/**@type {FakeElement} */
		let fe = dom_node;
		fe.tag_description = dom_tag_description;
		let result = dom_node.castNodeTo(document_impl.element_type_tag);
		if(result.type === 'cast_result') {
			this.document.documentElement = result.release_value();
		} else {
			throw Error("Cast to element failed: dom_node not a valid html documentElement");
		}
	}
}
export function use_types() {
	return [FakeDocument, FakeElement];
}
