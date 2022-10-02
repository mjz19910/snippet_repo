import {FakeDocument} from "../browser_fake_dom/src/FakeDocument"
import {FakeElement} from "../browser_fake_dom/src/FakeElement"
import {DOMTagDescription} from "./DOMTagDescription.js"
export class DOMTagLoadHandlers {
	/**@argument {FakeDocument} document */
	constructor(document) {
		/**@type {FakeDocument} */
		this.document=document
	}
	/**
	 * @argument {DOMTagDescription} dom_tag_description
	 * @param {any} state
	 */
	html(state,dom_tag_description) {
		const document_impl=this.document.implementation
		void state
		console.log('do_html_load on_tag html')
		if(!dom_tag_description.tagName)
			throw new Error("FIXME: how to handle tagName === null")
		var dom_node=this.document.construct_dom_node(dom_tag_description.tagName)
		/**@type {FakeElement} */
		let fe=dom_node
		fe.tag_description=dom_tag_description
		let result=dom_node.castNodeTo(document_impl.element_type_tag)
		if(result.type==='cast_result') {
			// !!! FakeHTMLElement -> ./api/CastResult.js -> FakeHTMLElement.js
			/**@type {any}*/
			let av=result.release_value()
			this.document.documentElement=av
		} else {
			throw Error("Cast to element failed: dom_node not a valid html documentElement")
		}
	}
}
export function use_types() {
	return [FakeDocument,FakeElement]
}
