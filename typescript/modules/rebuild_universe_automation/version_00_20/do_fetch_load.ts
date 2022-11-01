import {LOG_LEVEL_INFO} from "../../../src/constants.js"
import {action_1} from "./action_1.js"
import {do_dom_filter} from "./do_dom_filter.js"
import {do_load_fire_promise} from "./do_load_fire_promise.js"
import {LoadMutationObserver} from "./LoadMutationObserver.js"
import {reset_global_event_handlers} from "./reset_global_event_handlers.js"
import {set_jq_proxy} from "./set_jq_proxy.js"
import {mut_observers} from "./rebuild_the_universe_auto_v0.2.js"
import {real_st,real_si,orig_aev} from "./module_entry_function"
import {l_log_if} from "../../../vm/l_log_if.js"

export async function do_fetch_load() {
	reset_global_event_handlers()
	window.setTimeout=real_st
	window.setInterval=real_si
	EventTarget.prototype.addEventListener=orig_aev
	await new Promise(function(a) {
		window.addEventListener('load',function lis() {
			setTimeout(a)
			window.removeEventListener('load',lis)
		})
	})
	reset_global_event_handlers()
	let orig_url=location.href
	let loc_url=location.origin+location.pathname
	let prev_state=history.state
	let next_gen=0
	if(prev_state&&prev_state.gen) {
		next_gen=prev_state.gen+1
	}
	let hist_state={
		gen: next_gen
	}
	let skip=true
	x: {
		if(skip)
			break x
		await new Promise(function(a) {
			if(localStorage.justReset==='true') {
				return a(null)
			}
			window.g_do_load=do_load_fire_promise.bind(null,a)
			document.writeln(`<head></head><body><a href onclick="g_do_load()">load with fetch</a></body>`)
			reset_global_event_handlers()
			document.close()
		})
	}
	reset_global_event_handlers()
	history.pushState(hist_state,'',orig_url)
	const rb_html=await (await fetch(loc_url)).text()
	{
		let la=mut_observers.pop()
		if(!la)
			throw new Error("mut_observers underflow")
		la.disconnect()
	}
	set_jq_proxy(window.$)
	/**
	 * @type {any[]}
	 */
	let arr: any[]=[]
	/**@type {any} */
	let any_cur: any=arr
	window.adsbygoogle=any_cur
	window.adsbygoogle.op=window.adsbygoogle.push
	window.adsbygoogle.push=function(e) {
		// console.log('ads by google push');
		let cs=document.currentScript
		/**@type {Element|null} */
		let ls: Element|null=null
		/**@type {Element|null} */
		let rs: Element|null
		if(!cs)
			return
		window.g_cs??=[]
		window.g_cs.push(cs)
		let prev=cs.previousElementSibling
		if(prev&&prev instanceof HTMLElement&&prev.dataset.adSlot) {
			let ad_slot=cs.previousElementSibling
			if(prev.previousElementSibling)
				ls=prev.previousElementSibling
			if(cs.nextElementSibling)
				rs=cs.nextElementSibling
			if(ad_slot)
				ad_slot.remove()
			cs.remove()
			while(ls&&ls instanceof HTMLScriptElement&&ls.src&&ls.src.includes("adsbygoogle")) {
				let ls_tmp=ls.previousElementSibling
				ls.remove()
				ls=ls_tmp
			}
		}
		window.adsbygoogle.op(e)
		do_dom_filter()
	}
	let rb_html_tmp=rb_html.replace(/https:\/\/apis.google.com\/js\/platform.js/,"")
	//spell:disable-next-line
	rb_html_tmp=rb_html_tmp.replace("//script.opentracker.net/?site=rebuildtheuniverse.com","")
	let rc=0
	let did_rep=true
	function on_html_replace() {
		rc++
		did_rep=true
		return ""
	}
	//spell:disable-next-line
	let json_rep_1=`"\x3Cscript>\\n  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\\n  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\\n  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\\n  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');\\n\\n  ga('create', 'UA-63134422-1', 'auto');\\n  ga('send', 'pageview');\\n\\n\x3C/script>"`
	let rem_str_1=JSON.parse(json_rep_1)
	while(did_rep) {
		did_rep=false
		//spell:disable-next-line
		rb_html_tmp=rb_html_tmp.replace("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",on_html_replace)
		if(did_rep)
			continue
		rb_html_tmp=rb_html_tmp.replace(rem_str_1,on_html_replace)
	}
	let script_num=[...rb_html_tmp.matchAll(/<\s*script.*?>/g)].length
	let loaded_scripts_count=0
	console.log(rc)
	mut_observers.push(new LoadMutationObserver(document,function(mut_vec,mut_observer) {
		let log_data_vec=[]
		log_data_vec.push(mut_vec.length,document.body!=null)
		/**@type {HTMLScriptElement[]} */
		let added_scripts: HTMLScriptElement[]=[]
		/**@type {HTMLScriptElement[]} */
		let removed_scripts: HTMLScriptElement[]=[]
		for(let i=0;i<mut_vec.length;i++) {
			let mut_rec=mut_vec[i]
			let add_node_list=mut_rec.addedNodes
			for(let j=0;j<add_node_list.length;j++) {
				let cur_node=add_node_list[j]
				if(!cur_node) {
					debugger
					continue
				}
				if(cur_node instanceof HTMLScriptElement) {
					added_scripts.push(cur_node)
				}
			}
			let remove_node_list=mut_rec.removedNodes
			for(let j=0;j<remove_node_list.length;j++) {
				let cur_node=remove_node_list[j]
				if(cur_node instanceof HTMLScriptElement) {
					removed_scripts.push(cur_node)
				}
			}
		}
		if(document.body)
			log_data_vec.push('b',document.body.children.length)

		else
			log_data_vec.push('h',document.head.children.length)
		log_data_vec.push(document.querySelectorAll("script").length)
		loaded_scripts_count+=added_scripts.length
		if(loaded_scripts_count>=script_num) {
			l_log_if(LOG_LEVEL_INFO,'observer script count',loaded_scripts_count,script_num)
			console.info('load observer ',...log_data_vec)
			reset_global_event_handlers()
			mut_observer.disconnect()
		}
	}))
	mut_observers[0].disconnect()
	window.g_page_content={
		request_content: rb_html,
		cur: rb_html_tmp
	}
	reset_global_event_handlers()
	document.writeln(rb_html_tmp)
	reset_global_event_handlers()
	action_1()
	document.close()
	reset_global_event_handlers()
	window.onunload=function() {
		console.info('unload')
	}
	window.onbeforeunload=function() {
		console.info('before unload')
		if(history.state?.gen!==void 0&&history.state.prev===void 0) {
			// https://rebuildtheuniverse.com/mjz_version/
			history.replaceState({prev: history.state,gen: history.state.gen+1},"",orig_url)
		}
	}
}
