import * as http from "http";
import * as https from "https";
import {PageLoaderState} from "./PageLoaderState.js";
import {fix_fetch_url} from "./fix_fetch_url.js";
import {run_fetch_algorithm} from "./run_fetch_algorithm.js";
import {get_cached_repl_plugin} from "./get_cached_repl_plugin.js";
import {RequestModule} from "./RequestModule.js";
import {BaseBadge} from "../../browser_fake_dom/src/BaseBadge.js/index.js";
import {fake,FakeDocument,FakeWindow} from "../../browser_fake_dom/index.js";
/**
 * @arg {PageLoaderState} state
 */
export async function fetch_url(state,silent=false) {
	if(!state.url) throw new Error("No url to get");
	let repl=get_cached_repl_plugin(state);
	if(repl&&!repl.repl_active) {
		if(!state.no_repl) {
			repl.activate();
		}
	}
	fix_fetch_url(state);
	let p_url=new URL(state.url);
	if(!silent) {
		if(!state.no_repl) {
			repl.pause();
			repl.setPrompt("");
		}
		console.log('fetch_url_tag get',state.url);
	}
	const dom_impl_badge=new BaseBadge;
	let new_url=state.url;
	fake.document=new FakeDocument(fake.window,new BaseBadge);
	fake.with_badge(dom_impl_badge,(fake) => {
		if(!fake.document) throw new Error("Missing fake document");
		fake.document.location.assign(new_url);
	});
	let req_mod=state.m_start_request_module;
	switch(p_url.protocol) {
		case 'http:': req_mod.init({is_https: false,value: http}); break;
		case 'https:': req_mod.init({is_https: true,value: https}); break;
		default: throw new Error("Unknown protocol: "+p_url.protocol);
	}
	if(!state.on_incoming_message) throw new Error("No Handler for server response");
	try {
		await run_fetch_algorithm(state);
	} catch(err) {
		console.log("Fetch algo error",err);
	}
}
