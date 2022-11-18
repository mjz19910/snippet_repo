import {FakeHTMLElement} from "./FakeHTMLElement.js";
import {FakeLocation} from "./FakeLocation.js";
import {FakeWindow} from "./FakeWindow.js";
import {element_to_tree_node} from "./api/const.js";
import {DomBadge} from "./DomBadge.js/index.js";

export class HTMLIFrameElement extends FakeHTMLElement {
	/**@type {{window:FakeWindow}|null} */
	#child_window=null;
	get contentWindow() {
		let dom_impl_badge=new DomBadge;
		if(typeof this.#child_window=='undefined') {
			this.#child_window={window: new FakeWindow(dom_impl_badge)};
			var new_win=this.#child_window.window;
			new_win.location=new FakeLocation;
			var attr=element_to_tree_node.get(this).private.attributes;
			console.log('iframe',attr.src);
			if(!new_win.location.location_setup) throw new Error("Invalid");
			new_win.location.location_setup(dom_impl_badge,element_to_tree_node.get(this).private.attributes.src);
			return this.#child_window.window;
		}
		return null;
	}
}
