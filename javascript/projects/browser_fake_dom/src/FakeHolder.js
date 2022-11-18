import {any} from "./any.js";
import {FakeDocument} from "./FakeDocument.js";
import {FakeWindow} from "./FakeWindow.js";
import {BaseBadge} from "../BaseBadge.js/index.js";
import {Badge} from "../Badge.ts/index.js";

export class FakeHolder {
	/**@type {FakeWindow} */
	window;
	/**@type {FakeDocument} */
	document;
	/**@type {FakeDocument} */
	/**@arg {BaseBadge|undefined} badge */
	constructor(badge) {
		Badge.verify(badge);
		this.window=new FakeWindow(new BaseBadge);
		this.document=any({});
	}
	/**
	 * @arg {BaseBadge} badge
	 * @param {(val:FakeHolder) => void} callback
	 */
	with_badge(badge,callback) {
		if(badge.is_valid()) {
			callback(this);
		}
		badge.invalidate();
	}
}
