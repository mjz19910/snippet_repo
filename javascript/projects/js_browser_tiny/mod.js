import {handle_onPageLoadStarted} from "../browser_fake_dom/event/mod.js";
import {create_fake, DOMBadge, fake} from "../browser_fake_dom/mod.js";
import {on_page_data_loaded} from "../page_loader/on_page_data_loaded.js";
import {resolve_http_url, fetch_url} from "../page_loader/mod.js";
import {FetchRequestState} from "../page_loader/FetchRequestState.js";
/**
 * @arg {string} req_url
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
 * @arg {Uint8Array} page_content
 * @arg {string} page_url
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
	resolve_http_url,
	fetch_url,
	FetchRequestState,
};

export const use_mod = {
	get imports() {
		/**@type {{}[]}*/
		let t = [
			resolve_http_url,
			fetch_url,
			FetchRequestState,
		];
		return t;
	}
};

export function get_use_data() {
	return use_mod;
}
