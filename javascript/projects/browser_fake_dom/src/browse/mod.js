import {init as window_init} from "./do_create_window.js"
import {init as document_init} from "./do_create_document.js"
import {FakeWindow} from "../../FakeWindow.js"
import {FakeDocument} from "../FakeDocument.js"
import {Badge} from "../std/Badge.js"

const create_fake=Object.freeze({
	window: window_init,
	document: document_init,
})

const fake={
	/**@type {FakeWindow|null}*/
	window: null,
	/**@type {FakeDocument|null}*/
	document: null,
	/**
	 * @arg {Badge} badge
	 * @param {(val:typeof this) => void} callback
	 */
	with_badge(badge,callback) {
		if(badge.is_valid()) {
			callback(this)
		}
		badge.invalidate()
	},
}

export {
	create_fake,
	fake,
}
