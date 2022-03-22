import * as http from "http";
import * as https from "https";
import {create_fake, fake} from "../browser_fake_dom/mod.js";
import {FetchRequestState} from "./FetchRequestState.js";
import {fix_fetch_url} from "./fix_fetch_url.js";
import {run_fetch_algorithm} from "./run_fetch_algorithm.js";
/**
 * @arg {FetchRequestState} state
 */
export function fetch_url(state, silent = false) {
	if(!state.url) throw new Error("No url to get");
	let get_repl_activator = (/** @type {FetchRequestState} */ _state) => {
		console.log('todo get_repl_activator');
		return {
			repl_active: false,
			pause() {},
			activate() {},
			/**
			 * @param {string} _v
			 */
			setPrompt(_v) {}
		};
	};
	let repl = get_repl_activator(state);
	if(repl && !repl.repl_active) {
		if(!state.no_repl) {
			repl.activate();
		}
	}
	fix_fetch_url(state);
	let p_url = new URL(state.url);
	if(!silent) {
		if(repl && !state.no_repl) {
			repl.pause();
			repl.setPrompt("");
		}
		console.log('fetch_url_tag get', state.url);
	}
	//const dom_impl_badge = new DOMBadge;
	//let new_url=fetch_state.url;
	/* fake.with_badge(dom_impl_badge, (fake) => {
		if(!fake.document)throw new Error("Missing fake document");
		fake.document.location.assign(new_url);
	}); */
	switch(p_url.protocol) {
		case 'http:': state.m_start_request_module = http; break;
		case 'https:': state.m_start_request_module = https; break;
		default: throw new Error("Unknown protocol: " + p_url.protocol);
	}
	if(!fake.window)
		create_fake.window();
	if(!fake.document)
		create_fake.document();
	if(!state.on_incoming_message)
		throw new Error("No Handler for server response");
	run_fetch_algorithm(state);
}
