import {create_fake, fake} from "fake-dom-browse";
import {DOMBadge} from "fake-dom";
import {FetchRequestState, fetch_url} from "preload";
import {get_repl_activator} from "repl-support";
import {handle_onPageLoadStarted} from "fake-dom-event";
import {on_page_data_loaded, resolve_http_url} from "page-loader";
/**
 * @param {string} req_url
 */
export function init_wget(req_url) {
	create_fake.window();
	create_fake.document();
	if(!fake.window) return false;
	if(!fake.document) return false;
	handle_onPageLoadStarted(fake.window, {
		href: req_url,
		is_top_level: true,
		dom_impl_badge: new DOMBadge,
	});
	return true;
}
/**
 * @param {string} page_content
 * @param {string} page_url
 */
export function wget_on_static_page_load(page_content, page_url) {
	if(!fake.document) throw new Error("No document");
	if(!fake.window) throw new Error("No window");
	console.log("static page content", '"' + page_content.slice(0, 48) + '"' + "...", page_content.length);
	let static_req_state = new FetchRequestState(page_url);
	on_page_data_loaded(fake.window, fake.document, static_req_state, null, page_content);
	let repl = get_repl_activator(static_req_state);
	if(repl) {
		repl.on_finished();
	}
}
export {
	fetch_url,
	FetchRequestState,
	resolve_http_url,
}