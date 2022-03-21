/**
 * @arg {FetchRequestState} fetch_state
 */
export function fetch_url(fetch_state, silent = false) {
	if(!fake.window) throw new Error("No window");
	if(!fake.document) throw new Error("No document");
	if(!fetch_state.url) throw new Error("No url to get");
	let repl=get_repl_activator(fetch_state);
	if(repl && !repl.repl_active) {
		if(!fetch_state.no_repl) {
			repl.activate();
		}
	}
	fix_fetch_url(fetch_state);
	let p_url = new URL(fetch_state.url);
	if(!silent) {
		if(repl && !fetch_state.no_repl) {
			repl.pause();
			repl.setPrompt("");
		}
		console.log('fetch_url_tag get', fetch_state.url);
	}
	var new_loc = new FakeLocation;
	const dom_impl_badge = new DOMBadge;
	if(new_loc.location_setup) {
		new_loc.location_setup(dom_impl_badge, fetch_state.url);
	}
	let fake_win=fake.window;
	let fake_doc=fake.document;
	if(fake_win !== null){
		if(fake_doc !== null) {
			fake_win.m_document = fake_doc;
			fake_win.document.location = new_loc;
		}
		fake_win.location = new_loc;
	}
	switch(p_url.protocol) {
		case 'http:': fetch_state.m_start_request_module = http; break;
		case 'https:': fetch_state.m_start_request_module = https; break;
		default: throw new Error("Unknown protocol: " + p_url.protocol);
	}
	run_fetch_algorithm(fetch_state);
}
