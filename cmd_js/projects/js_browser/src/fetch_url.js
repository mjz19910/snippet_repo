import * as http from "http";
import * as https from "https";
import {PageLoaderState} from "./page_loader.js";

/**
 * @arg {PageLoaderState} state
 */
function async_http_get(state) {
	state.fetcher.async_api_use_for_get(state,http);
}
/**
 * @arg {PageLoaderState} state
 */
function async_https_get(state) {
	state.fetcher.async_api_use_for_get(state,https);
}


/**
 * @arg {PageLoaderState} state
 */
export async function fetch_url(state,silent=false) {
	if(!state.url) throw new Error("No url to get");
	console.log("TODO: get_cached_repl_plugin");
	/* let repl=get_cached_repl_plugin(state);
	if(repl&&!repl.repl_active) {
		if(!state.no_repl) {
			repl.activate();
		}
	}
	 */
	console.log("TODO: fix_fetch_url");
	/*fix_fetch_url(state);*/
	let p_url=new URL(state.url);
	p_url;
	if(!silent) {
		/* if(!state.no_repl) {
			repl.pause();
			repl.setPrompt("");
		} */
		console.log('fetch_url_tag get',state.url);
	}
	console.log("TODO: DomBadge");
	console.log("TODO: FakeDocument");
	/* const dom_impl_badge=new DomBadge;
	let new_url=state.url;
	fake.document=new FakeDocument(fake.window,new DomBadge);
	fake.with_badge(dom_impl_badge,(fake) => {
		if(!fake.document) throw new Error("Missing fake document");
		fake.document.location.assign(new_url);
	});
	 */
	console.log("need req mod");
	if(!state.on_incoming_message) throw new Error("No Handler for server response");
	try {
		console.log("todo run fetch algo");
	} catch(err) {
		console.log("Fetch algo error",err);
	}
	if(p_url.protocol==="https:") {
		async_https_get(state);
		return;
	}
	async_http_get(state);
}
