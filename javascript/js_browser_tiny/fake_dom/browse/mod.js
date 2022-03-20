import {fake_window, init as window_init} from "./do_create_window.js";
import {fake_document, init as document_init} from "./do_create_document.js";

const create_fake = Object.freeze({
	window:window_init,
	document:document_init,
});

const fake = {
	window:fake_window,
	document:fake_document,
};

export {
	create_fake,
	fake,
}
