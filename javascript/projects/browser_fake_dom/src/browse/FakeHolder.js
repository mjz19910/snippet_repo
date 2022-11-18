import {any} from "../any.js";
import {FakeDocument} from "../FakeDocument.js";
import {FakeWindow} from "../FakeWindow.js";
import {DomBadge} from "../implementation/DomBadge.js";
import {Badge} from "../Badge.js/index.js";

export class FakeHolder {
	/**@type {FakeWindow} */
	window;
	/**@type {FakeDocument} */
	document;
	/**@type {FakeDocument} */
	/**@arg {DomBadge|undefined} badge */
	constructor(badge) {
		Badge.verify(badge);
		this.window=new FakeWindow(new DomBadge);
		this.document=any({});
	}
	/**
	 * @arg {DomBadge} badge
	 * @param {(val:FakeHolder) => void} callback
	 */
	with_badge(badge,callback) {
		if(badge.is_valid()) {
			callback(this);
		}
		badge.invalidate();
	}
}
