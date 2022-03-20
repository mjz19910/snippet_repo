import {element_to_tree_node} from "fake-dom-api/const";
import {FakeHTMLElement} from "./HTMLElement.js";
import {FakeLocation} from "./Location.js";
import {FakeWindow} from "./FakeWindow.js";
import {DOMBadge} from "fake-dom-implementation";

export class HTMLIFrameElement extends FakeHTMLElement {
	/**@type {{window:FakeWindow}|null} */
	#child_window = null;
	get contentWindow() {
		let dom_impl_badge = new DOMBadge;
		if(typeof this.#child_window == 'undefined') {
			this.#child_window = {window: new FakeWindow(dom_impl_badge)};
			var new_win = this.#child_window.window;
			new_win.location = new FakeLocation;
			if(!new_win.default_document) throw new Error("Invalid");
			new_win.default_document();
			var attr = element_to_tree_node.get(this).private.attributes;
			console.log('iframe', attr.src);
			if(!new_win.location.location_setup) throw new Error("Invalid");
			new_win.location.location_setup(dom_impl_badge, element_to_tree_node.get(this).private.attributes.src);
			return this.#child_window.window;
		}
		return null;
	}
}
