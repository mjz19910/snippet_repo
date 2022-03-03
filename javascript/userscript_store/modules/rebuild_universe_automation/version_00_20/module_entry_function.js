import {LOG_LEVEL_INFO} from "types/constants.js";
import {action_1} from "./action_1";
import {DetachedMutationObserver} from "./DetachedMutationObserver";
import {DocumentWriteList} from "./DocumentWriteList";
import {do_dom_filter} from "./do_dom_filter";
import {do_load_fire_promise} from "./do_load_fire_promise";
import {enable_jquery_proxy_if_needed} from "./enable_jquery_proxy_if_needed";
import {insert_before_enabled} from "./insert_before_enabled";
import {LoadMutationObserver} from "./LoadMutationObserver";
import {l_log_if} from "./l_log_if";
import {page_url_no_protocol} from "./page_url_no_protocol";
import {reset_global_event_handlers} from "./reset_global_event_handlers";
import {set_jq_proxy} from "./set_jq_proxy";
import {mut_observers} from "./rebuild_the_universe_auto_v0.2";
/**@type {typeof setTimeout} */
let real_st;
/**@type {typeof setInterval} */
let real_si;
/**@type {EventTarget['addEventListener']} */
let orig_aev;
async function do_fetch_load() {
	reset_global_event_handlers();
	window.setTimeout = real_st;
	window.setInterval = real_si;
	EventTarget.prototype.addEventListener = orig_aev;
	await new Promise(function(a) {
		window.addEventListener('load', function lis() {
			setTimeout(a);
			window.removeEventListener('load', lis);
		});
	});
	reset_global_event_handlers();
	let orig_url = location.href;
	let loc_url = location.origin + location.pathname;
	let prev_state = history.state;
	let next_gen = 0;
	if(prev_state && prev_state.gen) {
		next_gen = prev_state.gen + 1;
	}
	let hist_state = {
		gen: next_gen
	};
	let skip = true;
	x: {
		if(skip)
			break x;
		await new Promise(function(a) {
			if(localStorage.justReset === 'true') {
				return a(null);
			}
			window.g_do_load = do_load_fire_promise.bind(null, a);
			document.writeln(`<head></head><body><a href onclick="g_do_load()">load with fetch</a></body>`);
			reset_global_event_handlers();
			document.close();
		});
	}
	reset_global_event_handlers();
	history.pushState(hist_state, '', orig_url);
	const rb_html = await (await fetch(loc_url)).text();
	{
		let la = mut_observers.pop();
		if(!la)
			throw new Error("mut_observers underflow");
		la.disconnect();
	}
	set_jq_proxy(window.$);
	/**
	 * @type {any[]}
	 */
	let arr = [];
	/**@type {any} */
	let any_cur = arr;
	window.adsbygoogle = any_cur;
	window.adsbygoogle.op = window.adsbygoogle.push;
	window.adsbygoogle.push = function(e) {
		// console.log('ads by google push');
		let cs = document.currentScript;
		/**@type {Element|null} */
		let ls = null;
		/**@type {Element|null} */
		let rs;
		if(!cs)
			return;
		window.g_cs ??= [];
		window.g_cs.push(cs);
		let prev = cs.previousElementSibling;
		if(prev && prev instanceof HTMLElement && prev.dataset.adSlot) {
			let ad_slot = cs.previousElementSibling;
			if(prev.previousElementSibling)
				ls = prev.previousElementSibling;
			if(cs.nextElementSibling)
				rs = cs.nextElementSibling;
			if(ad_slot)
				ad_slot.remove();
			cs.remove();
			while(ls && ls instanceof HTMLScriptElement && ls.src && ls.src.includes("adsbygoogle")) {
				let ls_tmp = ls.previousElementSibling;
				ls.remove();
				ls = ls_tmp;
			}
		}
		window.adsbygoogle.op(e);
		do_dom_filter();
	};
	let rb_html_tmp = rb_html.replace(/https:\/\/apis.google.com\/js\/platform.js/, "");
	//spell:disable-next-line
	rb_html_tmp = rb_html_tmp.replace("//script.opentracker.net/?site=rebuildtheuniverse.com", "");
	let rc = 0;
	let did_rep = true;
	function on_html_replace() {
		rc++;
		did_rep = true;
		return "";
	}
	//spell:disable-next-line
	let json_rep_1 = `"\x3Cscript>\\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\\n\\n  ga('create', 'UA-63134422-1', 'auto');\\n  ga('send', 'pageview');\\n\\n\x3C/script>"`;
	let rem_str_1 = JSON.parse(json_rep_1);
	while(did_rep) {
		did_rep = false;
		//spell:disable-next-line
		rb_html_tmp = rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", on_html_replace);
		if(did_rep)
			continue;
		rb_html_tmp = rb_html_tmp.replace(rem_str_1, on_html_replace);
	}
	let script_num = [...rb_html_tmp.matchAll(/<\s*script.*?>/g)].length;
	let loaded_scripts_count = 0;
	console.log(rc);
	mut_observers.push(new LoadMutationObserver(document, function(mut_vec, mut_observer) {
		let log_data_vec = [];
		log_data_vec.push(mut_vec.length, document.body != null);
		/**@type {HTMLScriptElement[]} */
		let added_scripts = [];
		/**@type {HTMLScriptElement[]} */
		let removed_scripts = [];
		for(let i = 0; i < mut_vec.length; i++) {
			let mut_rec = mut_vec[i];
			let add_node_list = mut_rec.addedNodes;
			for(let j = 0; j < add_node_list.length; j++) {
				let cur_node = add_node_list[j];
				if(!cur_node) {
					debugger;
					continue;
				}
				if(cur_node instanceof HTMLScriptElement) {
					added_scripts.push(cur_node);
				}
			}
			let remove_node_list = mut_rec.removedNodes;
			for(let j = 0; j < remove_node_list.length; j++) {
				let cur_node = remove_node_list[j];
				if(cur_node instanceof HTMLScriptElement) {
					removed_scripts.push(cur_node);
				}
			}
		}
		if(document.body)
			log_data_vec.push('b', document.body.children.length);
		else
			log_data_vec.push('h', document.head.children.length);
		log_data_vec.push(document.querySelectorAll("script").length);
		loaded_scripts_count += added_scripts.length;
		if(loaded_scripts_count >= script_num) {
			l_log_if(LOG_LEVEL_INFO, 'observer script count', loaded_scripts_count, script_num);
			console.info('load observer ', ...log_data_vec);
			reset_global_event_handlers();
			mut_observer.disconnect();
		}
	}));
	mut_observers[0].disconnect();
	window.g_page_content = {
		request_content: rb_html,
		cur: rb_html_tmp
	};
	reset_global_event_handlers();
	document.writeln(rb_html_tmp);
	reset_global_event_handlers();
	action_1();
	document.close();
	reset_global_event_handlers();
	window.onunload = function() {
		console.info('unload');
	};
	window.onbeforeunload = function() {
		console.info('before unload');
		if(history.state?.gen !== void 0 && history.state.prev === void 0) {
			// https://rebuildtheuniverse.com/mjz_version/
			history.replaceState({prev: history.state, gen: history.state.gen + 1}, "", orig_url);
		}
	};
}


export function module_entry_function() {
	if(location.pathname.match('test')) {
		return;
	}
	reset_global_event_handlers();
	enable_jquery_proxy_if_needed();
	document.addEventListener('onContentLoaded', do_dom_filter);
	Node.prototype.insertBefore = new Proxy(Node.prototype.insertBefore, {
		/**@arg {[Node, Node]} parameters */
		apply(target, thisValue, parameters) {
			if(insert_before_enabled(...parameters)) {
				return Reflect.apply(target, thisValue, parameters);
			}
		}
	});
	let document_write_list = new DocumentWriteList;
	document_write_list.attach_proxy(document);
	document_write_list.document_write_proxy;
	window.document_write_list = document_write_list;
	document.stop = function() {};
	function nop_timeout() {
		console.log('nop timeout');
		return -1;
	}
	real_st = setTimeout;
	real_si = setInterval;
	window.setTimeout = nop_timeout;
	window.setInterval = nop_timeout;
	/**
	 * @param {any[]} v
	 */
	function no_aev(...v) {
		console.log('aev', v);
	}
	orig_aev = EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener = no_aev;
	function on_dom_load() {
		window.setTimeout = real_st;
		window.setInterval = real_si;
		EventTarget.prototype.addEventListener = orig_aev;
		document.addEventListener('DOMContentLoaded', function() {
			action_1();
		});
	}
	function do_page_replace() {
		mut_observers.push(new DetachedMutationObserver(document));
		reset_global_event_handlers();
		document.writeln("");
		reset_global_event_handlers();
		do_fetch_load();
		document.close();
	}
	let page_url = location.href;
	let non_proto_url = page_url_no_protocol();
	if(non_proto_url == "//rebuildtheuniverse.com/mjz_version") {
		do_page_replace();
	} else if(non_proto_url == "//rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(page_url == "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(non_proto_url == "//rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(page_url === "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(non_proto_url == "//rebuildtheuniverse.com/") {
		window.setTimeout = real_st;
		window.setInterval = real_si;
		EventTarget.prototype.addEventListener = orig_aev;
		document_write_list.destroy();
	} else if(page_url === "https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/") {
		window.setTimeout = real_st;
		window.setInterval = real_si;
		EventTarget.prototype.addEventListener = orig_aev;
		document_write_list.destroy();
	} else {
		console.log('handle location pathname', location.pathname);
	}
}
