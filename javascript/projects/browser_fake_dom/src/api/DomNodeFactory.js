import {FakeElement} from "../FakeElement.js";
import {doc_js_has_obj} from "./const.js"
export class DomNodeFactory {
	#node_factory={
		handled_tags: ["A","DIV","FORM","IFRAME","SCRIPT","UNKNOWN"],
		/**
		 * @argument {import("../types/TagName.js").TagName|string} tagName
		 **/
		createNode(tagName) {
			switch(tagName) {
				case "A": return new HTMLAnchorElement
				case "DIV": return new HTMLDivElement
				case "FORM": return new HTMLFormElement
				case "IFRAME": return new HTMLIFrameElement
				case "SCRIPT": return new HTMLScriptElement
				case "UNKNOWN": return new HTMLUnknownElement
				default: throw new Error("element type not handled for `"+tagName.toLowerCase()+"`")
			}
		},
		/**@argument {import("../types/TagName.js").TagName|string} tagName*/
		hasElementConstructorForTagName(tagName) {
			return this.handled_tags.includes(tagName)
		},
		createDefaultNode() {
			return new HTMLUnknownElement
		}
	}
	/**
	 * @argument {import("../types/TagName.js").TagName|string} tagName
	 * @returns {Element & FakeElement} */
	construct_dom_node(tagName) {
		if(!this.#node_factory.hasElementConstructorForTagName(tagName)) {
			console.log("might need constructor for dom:",tagName.toLowerCase())
			const o=this.#node_factory.createDefaultNode()
			/**@type {any} */
			const t1=o
			return t1
		}
		const o=this.#node_factory.createNode(tagName)
		/**@type {any} */
		const t1=o
		return t1
	}
	/**
	 * @param {{tagName: string;}} dom_base_tree_node
	 */
	custom_construct_dom(dom_base_tree_node) {
		if(doc_js_has_obj.has(dom_base_tree_node)) {
			return doc_js_has_obj.get(dom_base_tree_node)
		}
		var tagName=dom_base_tree_node.tagName.toUpperCase()
		var ret=this.construct_dom_node(tagName)
		/**@type {any} */
		let ret_any=ret
		/**@type {{base: {tagName: string;};}} */
		let with_base=ret_any
		with_base.base=dom_base_tree_node
		doc_js_has_obj.set(dom_base_tree_node,ret)
		return ret
	}
}
