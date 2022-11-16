import * as http from "http"
import * as https from "https"
import {create_fake, fake} from "../browser_fake_dom/src/browse/mod.js";
import {PageLoaderFetchRequestState} from "./PageLoaderFetchRequestState.js"
import {fix_fetch_url} from "./fix_fetch_url.js"
import {run_fetch_algorithm} from "./run_fetch_algorithm.js"
import {get_cached_repl_plugin} from "./get_cached_repl_plugin.js";
/**
 * @arg {PageLoaderFetchRequestState} state
 */
export async function fetch_url(state,silent=false) {
	if(!state.url) throw new Error("No url to get");
	let repl=get_cached_repl_plugin(state);
	if(repl&&!repl.repl_active) {
		if(!state.no_repl) {
			repl.activate()
		}
	}
	fix_fetch_url(state)
	let p_url=new URL(state.url)
	if(!silent) {
		if(repl&&!state.no_repl) {
			repl.pause()
			repl.setPrompt("")
		}
		console.log('fetch_url_tag get',state.url)
	}
	//const dom_impl_badge = new DOMBadge
	//let new_url=fetch_state.url
	/* fake.with_badge(dom_impl_badge, (fake) => {
		if(!fake.document)throw new Error("Missing fake document")
		fake.document.location.assign(new_url)
	}); */
	switch(p_url.protocol) {
		case 'http:': state.m_start_request_module=http; break
		case 'https:': state.m_start_request_module=https; break
		default: throw new Error("Unknown protocol: "+p_url.protocol)
	}
	if(!fake.window)
		create_fake.window()
	if(!fake.document)
		create_fake.document()
	if(!state.on_incoming_message)
		throw new Error("No Handler for server response")
	await run_fetch_algorithm(state)
}
