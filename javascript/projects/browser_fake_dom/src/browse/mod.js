import {init as window_init} from "./do_create_window.js";
import {init as document_init} from "./do_create_document.js";
import {FakeWindow} from "../FakeWindow.js";
import {FakeDocument} from "../FakeDocument.js";
import {DomBadge} from "../implementation/DomBadge.js";
import {Badge} from "../std/Badge.js";

export const create_fake=Object.freeze({
	window: window_init,
	document: document_init,
});

class FakeHolder {
	/**@arg {DomBadge|undefined} badge */
	constructor(badge) {
		Badge.verify(badge);
		this.window=new FakeWindow(new DomBadge);
		this.document=new FakeDocument(this.window,new DomBadge);
	}
	/**
	 * @arg {DomBadge} badge
	 * @param {(val:typeof this) => void} callback
	 */
	with_badge(badge,callback) {
		if(badge.is_valid()) {
			callback(this);
		}
		badge.invalidate();
	}
}

export const fake=new FakeHolder(new DomBadge);
