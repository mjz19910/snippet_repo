import {action_1} from "./action_1.js";
import {DetachedMutationObserver} from "./DetachedMutationObserver.js";
import {ProxyDocumentWriteList} from "./DocumentWriteList.js";
import {do_dom_filter} from "./do_dom_filter.js";
import {enable_jquery_proxy_if_needed} from "./enable_jquery_proxy_if_needed.js";
import {insert_before_enabled} from "./insert_before_enabled.js";
import {page_url_no_protocol} from "./page_url_no_protocol.js";
import {reset_global_event_handlers} from "./reset_global_event_handlers.js";
import {mut_observers} from "./rebuild_the_universe_auto_v0.2.js";
import {do_fetch_load} from "./do_fetch_load.js";

export let real_st: typeof setTimeout;
export let real_si: typeof setInterval;
export let orig_aev: EventTarget['addEventListener'];

export function module_entry_function() {
	if(location.pathname.match('test')) {
		return;
	}
	reset_global_event_handlers();
	enable_jquery_proxy_if_needed();
	document.addEventListener('onContentLoaded',do_dom_filter);
	Node.prototype.insertBefore=new Proxy(Node.prototype.insertBefore,{
		apply(target,thisValue,parameters: [Node,Node]) {
			if(insert_before_enabled(...parameters)) {
				return Reflect.apply(target,thisValue,parameters);
			}
		}
	});
	let document_write_list=new ProxyDocumentWriteList;
	document_write_list.attach_proxy(document);
	window.document_write_list=document_write_list;
	document.stop=function() {};
	function nop_timeout() {
		console.log('nop timeout');
		return -1;
	}
	real_st=setTimeout;
	real_si=setInterval;
	window.setTimeout=nop_timeout as unknown as typeof setTimeout;
	window.setInterval=nop_timeout as unknown as typeof setInterval;
	/**
	 * @param {any[]} v
	 */
	function no_aev(...v: any[]) {
		console.log('aev',v);
	}
	orig_aev=EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener=no_aev;
	function on_dom_load() {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document.addEventListener('DOMContentLoaded',function() {
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
	let page_url=location.href;
	let non_proto_url=page_url_no_protocol();
	if(non_proto_url=="//rebuildtheuniverse.com/mjz_version") {
		do_page_replace();
	} else if(non_proto_url=="//rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(page_url=="https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=mjz_version") {
		do_page_replace();
	} else if(non_proto_url=="//rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(page_url==="https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/?type=real") {
		on_dom_load();
	} else if(non_proto_url=="//rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document_write_list.destroy();
	} else if(page_url==="https://ssh.login.local:9342/rebuild/mirror/rebuildtheuniverse.com/") {
		window.setTimeout=real_st;
		window.setInterval=real_si;
		EventTarget.prototype.addEventListener=orig_aev;
		document_write_list.destroy();
	} else {
		console.log('handle location pathname',location.pathname);
	}
}
