import {init as window_init} from "./do_create_window.js";
import {init as document_init} from "./do_create_document.js";
import {FakeWindow} from "../FakeWindow.js";
import {FakeDocument} from "../FakeDocument.js";

const create_fake = Object.freeze({
	window:window_init,
	document:document_init,
});

const fake = {
	/**@type {FakeWindow|null}*/
	window:null,
	/**@type {FakeDocument|null}*/
	document:null,
};

export {
	create_fake,
	fake,
}
