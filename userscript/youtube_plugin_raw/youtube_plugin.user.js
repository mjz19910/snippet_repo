// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.19
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2022
// @match	https://*.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
//#region done
//#region basic
/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e,x=e) {
	return x;
}
/** @type {YtdAppElement} */
const YtdAppElement=as({});
/** @type {InstanceType<typeof YtdAppElement>|null} */
let ytd_app=null;
/** @type {HTMLElement|null} */
let ytcp_app=null;
/** @type {HTMLElement|null} */
let ytmusic_app=null;
{
	/** @private @type {Exclude<typeof window[InjectApiStr],undefined>} */
	let inject_api=window.inject_api??as({});
	window.inject_api=inject_api;
}
/** @private @type {Map<string, Blob|MediaSource>} */
let created_blobs=new Map;
/** @private @type {Set<string>} */
let active_blob_set=new Set;
/** @private @type {D__Saved} */
let saved_data=as({});
const is_yt_debug_enabled=false;
/** @private @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(x: T|X, _constructor_type:U)=>x is X} */
function assume_is_instanceof(_value,_constructor_type) {
	return true;
}
/** @private @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(v:T|X, _constructor_type:U)=>X} */
function as_instanceof(value,_constructor_type) {
	if(assume_is_instanceof(value,_constructor_type)) {
		return value;
	}
	throw new Error("Failed to cast");
}
/** @private @template {{length:number;[x:number]:T[number]}} T */
class Iterator {
	i=0;
	/** @public @arg {T} x */
	constructor(x) {
		this.x=x;
	}
	next() {
		if(this.i<this.x.length) {
			let res={
				value: this.x[this.i],
				done: false,
			};
			this.i++;
			return res;
		}
		return {
			value: this.x[this.x.length-1],
			done: true
		};
	}
	[Symbol.iterator]() {
		return this;
	}
}
/** @private @template {{length:number;[x:number]:T[number]}} T @arg {T} x */
function make_iterator(x) {
	return new Iterator(x);
}
//#endregion
//#region ui_plugin & on_${element}
class CustomEventTarget {
	/** @private @type {{[str: string]:?(<T extends CustomEventTarget>(this:T, event: CustomEventType) => void)[]}} */
	_events={};
	/** @public @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
	addEventListener(type,handler) {
		(this._events[type]??=[]).push(handler);
	}
	/** @public @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
	removeEventListener(type,handler) {
		let event_arr=this._events[type];
		if(!event_arr) return;
		if(event_arr.length) return;
		for(let i=event_arr.length-1;i>=0;i--) {
			let cur=event_arr[i];
			if(cur!==handler) continue;
			event_arr.splice(i,1);
		}
	}
	/** @public @arg {CustomEventType} event */
	dispatchEvent(event) {
		let msg_arr=this._events[event.type];
		if(!msg_arr) return;
		for(let i=0;i<msg_arr.length;i++) {
			let cur=msg_arr[i];
			cur.call(this,event);
		}
	}
}
class DomObserver extends CustomEventTarget {
	/** @private @type {Set<MessagePort>} */
	wait_ports=new Set;
	/** @private @type {Map<MessagePort,ResState[]>} */
	port_to_resolvers_map=new Map;
	/** @public @arg {MessagePort} port */
	notify_with_port(port) {
		if(this.wait_ports.has(port)) {
			let list=this.port_to_resolvers_map.get(port);
			if(!list) return;
			if(list.every(e => !e.active)) {
				this.port_to_resolvers_map.set(port,[]);
			}
			for(let x of list) {
				if(x.active) x.resolver();
			}
			if(list[0].active===false) {
				list.shift();
			}
		};
	}
	/** @public @arg {MessagePort} port @arg {number} cur_count */
	wait_for_port(port,cur_count) {
		this.next_tick_action(port,cur_count);
		this.wait_ports.add(port);
		return new Promise((accept) => {
			let resolver=() => {
				state.active=false;
				accept(null);
			};
			let state={active: true,resolver};
			if(this.port_to_resolvers_map.has(port)) {
				if(this.port_to_resolvers_map.has(port)) this.port_to_resolvers_map.get(port)?.push(state);
			} else {
				this.port_to_resolvers_map.set(port,[state]);
			}
		});
	}
	trace=false;
	/** @private @arg {MessagePort} port @arg {number} count */
	next_tick_action(port,count) {
		if(this.trace) console.log("tick_trace",count);
		port.postMessage(count);
	}
}
let dom_observer=new DomObserver;
function yt_watch_page_loaded_handler() {
	if(!is_watch_page_active()) {
		return;
	}
	if(ytd_page_manager===null) {
		console.log("no ytd-page-manager");
		return;
	}
	title_text_overlay_update();
	init_ui_plugin();
	if(!ytd_player) return;
	ytd_player.active_nav=false;
	ytd_player.init_nav=true;
}
dom_observer.addEventListener("plugin-activate",yt_watch_page_loaded_handler);
let waiting_for_ytd_player=false;
/** @private @type {number|null} */
let current_timeout=null;
function init_ui_plugin() {
	if(waiting_for_ytd_player) return;
	if(current_timeout===null)
		return;
	if(typeof current_timeout==="number") {
		if(current_timeout>0) {
			clearTimeout(current_timeout);
			current_timeout=null;
		}
	} else if("hasRef" in current_timeout) {
		clearTimeout(current_timeout);
		current_timeout=null;
	}
	if(!ytd_player||!ytd_player.player_) {
		console.log("wait for player");
		waiting_for_ytd_player=true;
		wait_for_yt_player().then(function() {
			waiting_for_ytd_player=false;
			init_ui_plugin();
		});
		return;
	}
	if(!ytd_player.player_.getVideoData) {
		current_timeout=setTimeout(init_ui_plugin,0);
		return;
	}
	if(ytd_player.active_nav) {
		console.log("ytd-player:active_nav = true");
		return;
	}
	current_timeout=setTimeout(activate_nav,0);
}
function activate_nav() {
	if(is_yt_debug_enabled) console.log("activate_nav:fire");
	if(!ytd_player) return;
	if(!ytd_page_manager) return;
	if(ytd_player.active_nav) return;
	ytd_player.active_nav=true;
	log_current_video_data();
	ytd_page_manager.addEventListener("yt-page-type-changed",function() {
		if(!ytd_player) return;
		if(!ytd_page_manager) return;
		setTimeout(function() {
			do_find_video();
		},80);
		if(ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()!="ytd-watch-flexy") {
			ytd_player.is_watch_page_active=false;
			plugin_overlay_element&&plugin_overlay_element.remove();
			return;
		} else {
			ytd_player.is_watch_page_active=true;
		}
		requestAnimationFrame(page_changed_next_frame);
	});
}
function do_find_video() {
	if(!audio_gain_controller) return;
	const element_list=get_html_elements(document,"video");
	if(element_list.length<=0) return;
	let list=box_map.get("video-list");
	/** @private @type {boolean} */
	let first_run;
	if(list) {
		first_run=false;
	} else {
		first_run=true;
		list=new HTMLVideoElementArrayBox([]);
		box_map.set("video-list",list);
	}
	let new_elements=get_new_video_element_list(element_list,list);
	if(new_elements.length<=0) return;
	audio_gain_controller.attach_element_list(new_elements);
	if(first_run) {
		found_element_count++;
		if(async_plugin_init.__debug) console.log("found video elements");
	} else {
		if(async_plugin_init.__debug) console.log("found extra video elements",new_elements);
	}
}
/** @private @arg {HTMLElement} element */
function on_ytcp_app(element) {
	ytcp_app=element;
	window.ytcp_app=element;
}
/** @private @arg {HTMLElement} element */
function on_ytmusic_app(element) {
	ytmusic_app=element;
	window.ytmusic_app=element;
}
function iterate_ytd_app() {
	if(ytd_app) return false;
	const target_element=get_html_elements(document,"ytd-app")[0];
	if(!target_element) return false;
	on_ytd_app(target_element);
	return true;
}
/** @private @arg {HTMLElement} element */
function on_ytd_app(element) {
	const element_id="ytd-app";
	if(is_yt_debug_enabled||is_ytd_app_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	window.ytd_app=element;
	ytd_app=as_instanceof(element,YtdAppElement);
	ytd_app.addEventListener("yt-navigate-finish",function(event) {
		const target_element=get_html_elements(document,"ytd-page-manager")[0];
		if(!target_element) throw new Error("Missing ytd-page-manager when we have ytd-app");
		on_ytd_page_manager(target_element);
		// might have a new video element from page type change
		setTimeout(function() {
			do_find_video();
		},80);
		let real_event=YTNavigateFinishEvent.cast(event);
		for(let handler of on_yt_navigate_finish) {
			handler(real_event);
		}
	});
	ytd_app.ui_plugin_style_element=ui_plugin_style_element;
	if(document.visibilityState==="visible") {
		ytd_app.app_is_visible=true;
		if(do_restart_video_playback) {
			fire_on_visibility_change_restart_video_playback();
			do_restart_video_playback=false;
		}
	} else {
		ytd_app.app_is_visible=false;
	}
	ytd_app.ytp_click_cint=setInterval(() => {
		if(!is_watch_page_active()||!ytd_app) return;
		if(!ytd_app.app_is_visible) {
			do_restart_video_playback=true;
			return;
		}
	},15*60*1000);
	document.addEventListener("visibilitychange",function() {
		if(!ytd_app) throw new Error("No ytd-app");
		if(!is_watch_page_active()) return;
		if(document.visibilityState==="visible") {
			ytd_app.app_is_visible=true;
			if(do_restart_video_playback) {
				fire_on_visibility_change_restart_video_playback();
				do_restart_video_playback=false;
			}
		} else {
			ytd_app.app_is_visible=false;
		}
	});
}
/** @private @arg {CustomEventType} event */
function plugin_init(event) {
	async_plugin_init(event).then(() => {},(e) => {
		console.log("async error",e);
	});
}
/** @private @type {Element|null} */
let main_page_app=null;
/** @private @arg {CustomEventType} event */
async function async_plugin_init(event) {
	if(event.type!=="async-plugin-init") return;
	let plugin_state={};
	plugin_state.show_interesting_elements=true;
	let cur_count=1;
	let obj=dom_observer;
	let iter_count=0;
	try {
		while(true) {
			if(iter_count!==0) {
				await new Promise((soon) => setTimeout(soon,40));
			}
			iter_count++;
			VolumeRange.create_if_needed();
			cur_count++;
			x: {
				if(plugin_state.polymer_loaded) break x;
				if(!window.Polymer) break x;
				if(!window.Polymer.Class) break x;
				plugin_state.polymer_loaded=true;
			}
			x: if(plugin_state.show_interesting_elements&&plugin_state.polymer_loaded&&document.body) {
				let interesting_body_elements=[...make_iterator(document.body.children)].filter(e => {
					let e_tn=e.tagName;
					if(e_tn=="SPAN") return false;
					if(e_tn=="LINK") return false;
					if(e_tn=="META") return false;
					if(e_tn=="TITLE") return false;
					if(e_tn=="SCRIPT") return false;
					if(e_tn=="IFRAME") return false;
					if(e_tn=="NOSCRIPT") return false;
					if(e_tn==="LINK"&&e instanceof HTMLLinkElement) {
						if(e.rel==="stylesheet") return false;
					}
					if(e_tn=="IRON-ICONSET-SVG") return false;
					if(e_tn=="IRON-A11Y-ANNOUNCER") return false;
					if(e.id==="home-page-skeleton") return false;
					// cspell:ignore skeletonhidden
					if(e.id==="watch-page-skeleton"&&(
						e.classList.value==="watch-skeletonhidden"||
						e.classList.value==="watch-skeleton"
					)) return false;
					if(e.id==="player"&&e.classList.value==="skeleton flexy") return false;
					if(e.id==="watch7-content"&&e.classList.value==="watch-main-col") return false;
					if(e_tn=="svg") return false;
					let fut_data=[e.tagName,e.id,e.classList.value];
					event.detail.handle_types.save_string("[body_element]",fut_data);
					return true;
				});
				if(ytd_app&&interesting_body_elements.includes(ytd_app)&&interesting_body_elements.length===1) break x;
				if(interesting_body_elements.length===1) {
					main_page_app=interesting_body_elements[0];
				} else {
					console.log(interesting_body_elements);
					debugger;
				}
				plugin_state.show_interesting_elements=false;
			}
			// BEGIN(ytd-app): obj.dispatchEvent({type: "find-ytd-app",detail,port});
			{
				let found=iterate_ytd_app();
				if(found) {
					found_element_count++;
				}
			}
			x: {
				if(ytcp_app) break x;
				const target_element=get_html_elements(document,"ytcp-app")[0];
				if(!target_element) break x;
				found_element_count++;
				on_ytcp_app(target_element);
			}
			if(ytcp_app) break;
			x: {
				if(ytmusic_app) break x;
				const target_element=get_html_elements(document,"ytmusic-app")[0];
				if(!target_element) break x;
				found_element_count++;
				on_ytmusic_app(target_element);
			}
			if(ytmusic_app) break;
			if(main_page_app&&!ytd_app) {
				console.log("[found.main_page_app]",main_page_app);
				break;
			}
			// END(ytd-app): obj.dispatchEvent({type: "ytd-app",detail,port});
			// BEGIN(ytd-page-manager): obj.dispatchEvent({type: "find-ytd-page-manager",detail,port});
			x: {
				if(ytd_page_manager) break x;
				const target_element=get_html_elements(document,"ytd-page-manager")[0];
				if(!target_element) break x;
				found_element_count++;
				on_ytd_page_manager(target_element);
			}
			// END(ytd-page-manager): obj.dispatchEvent({type: "ytd-page-manager",detail,port});
			// BEGIN(yt-playlist-manager): obj.dispatchEvent({type: "find-yt-playlist-manager",detail,port});
			x: {
				if(yt_playlist_manager) break x;
				const target_element=get_html_elements(document,"yt-playlist-manager")[0];
				if(!target_element) break x;
				found_element_count++;
				on_yt_playlist_manager(target_element);
			}
			// BEGIN(ytd-watch-flexy): obj.dispatchEvent({type: "find-ytd-watch-flexy",detail,port});
			x: {
				if(ytd_watch_flexy) break x;
				if(!ytd_page_manager) break x;
				if(!ytd_page_manager.getCurrentPage()) break x;
				/** @private @template T @arg {T|undefined} x @arg {(e:T)=>void} w */
				function using(x,w) {
					if(x) {
						w(x);
					}
				}
				if(!ytd_page_manager.getCurrentPage()?.__has_theater_handler_plugin) {
					ytd_page_manager.getCurrentPage()?.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin);
					using(ytd_page_manager.getCurrentPage(),e => e.__has_theater_handler_plugin=true);
				}
				if(is_yt_debug_enabled) console.log("PageManager:current_page:"+ytd_page_manager.getCurrentPage()?.tagName.toLowerCase());
				if(ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()!="ytd-watch-flexy") {
					if(iter_count>100) {
						console.log("found current_page [%s] at iter=%o",ytd_page_manager.getCurrentPage()?.tagName.toLowerCase(),iter_count);
					}
					/** @private @type {Promise<void>} */
					let promise=new Promise((accept,reject) => {
						if(!ytd_page_manager) return reject(new Error("missing data"));
						ytd_page_manager.addEventListener(
							"yt-page-type-changed",
							() => accept(),
							{once: true}
						);
					});
					await promise;
					break x;
				}
				found_element_count++;
				using(ytd_page_manager.getCurrentPage(),on_ytd_watch_flexy);
			}
			// END(ytd-watch-flexy): obj.dispatchEvent({type: "ytd-watch-flexy",detail,port});
			// BEGIN(ytd-player): obj.dispatchEvent({type: "find-ytd-player",detail,port});
			x: {
				if(ytd_player) break x;
				if(!ytd_watch_flexy) break x;
				const target_element=get_html_elements(ytd_watch_flexy,"ytd-player")[0];
				if(!target_element) break x;
				found_element_count++;
				on_ytd_player(target_element);
			}
			// END(ytd-player): obj.dispatchEvent({type: "ytd-player",detail,port});
			// BEGIN(video): obj.dispatchEvent({type: "find-video",detail,port});
			do_find_video();
			// END(video): obj.dispatchEvent({type: "video",detail,port});
			await obj.wait_for_port(event.port,cur_count);
			if(found_element_count>=expected_element_count) {
				obj.dispatchEvent({...event,type: "plugin-activate"});
				break;
			}
			const max_find_iter=7588;
			if(!box_map.has("video-list")) continue;
			if(ytd_page_manager===null) continue;
			if(!ytd_page_manager.getCurrentPage()) continue;
			console.log("[iter_count]",iter_count);
			if(iter_count>max_find_iter) {
				alert("found plugin reqs in iters="+iter_count);
			}
			obj.dispatchEvent({...event,type: "plugin-activate"});
			break;
		}
	} catch(e) {
		console.log("had error in async init",e);
	}
}
//#endregion
//#region dom_observer & yt_plugin_event
let found_element_count=0;
let expected_element_count=6;
async_plugin_init.__debug=false;
let player_overlay_style_str=`
position: absolute;
top: 80px;
left: 68px;
font-size: 1.7rem;
font-weight: 100;
font-family: monospace;
color: var(--c2);
z-index: 1;
mix-blend-mode: difference;
background-blend-mode: normal;
--p0: 100%;
--p1: 100%;
--s0: 0 0 0.8px;
--s1: 0 0 0.8px;
--c0: rgb(255 255 255 / var(--p0));
--c1: rgb(20 20 20 / var(--p1));
--c2: white;
--sc0: var(--s0) var(--c0);
--sc1: var(--s1) var(--c1);
--f0: drop-shadow(var(--sc0));
--f1: drop-shadow(var(--sc1));
filter: var(--f0) var(--f1);
border: 0px solid black;
-webkit-mask-clip: text;
user-select: none;
width: 10px;
`;
const is_ytd_app_debug_enabled=false;
class VolumeRange {
	static enabled=true;
	static create_if_needed() {
		if(!this.enabled) return;
		if(!ytd_app) return;
		if(!ytd_app.__shady_children.masthead) return;
		let player_masthead=ytd_app.__shady_children.masthead;
		if(!player_masthead.$) return;
		if(!ytd_app.volume_range&&audio_gain_controller) {
			if(is_yt_debug_enabled) console.log("create VolumeRange");
			document.head.append(volume_plugin_style_element);
			let volume_range=new VolumeRange(0,100*5,100*5*2,audio_gain_controller);
			let container_dom_parent=player_masthead.$.container.children.center;
			if(!container_dom_parent) {
				throw new Error("Missing masthead container center");
			}
			volume_range.attach_to_element(container_dom_parent);
			ytd_app.volume_range=volume_range;
		}
	}
	/** @private @arg {number} min @arg {number} max @arg {number} overdrive @arg {AudioGainController} gain_controller */
	constructor(min,max,overdrive,gain_controller) {
		this.use_cache=true;
		this.max=max;
		this.min=min;
		this.overdrive=overdrive;
		this.gain_controller=gain_controller;
	}
	/** @private @arg {number} gain */
	setGain(gain) {
		this.updateRangeElement(gain);
		this.gain_controller.setGain(gain);
	}
	getGain() {
		return this.gain_controller.getGain();
	}
	/** */
	calculateGain() {
		if(!this.use_cache) return 1;
		let c_gain=this.getGain();
		if(!(typeof c_gain==="object"||typeof c_gain==="number")) {
			this.setGain(1);
			return 1;
		}
		let c_gain_1=c_gain;
		if(c_gain_1===null) c_gain_1=1;
		if(typeof c_gain_1==="object") throw new Error("Unexpected object");
		return c_gain_1;
	}
	max_compressor_reduction=-0.00011033167538698763;
	/** @private @arg {KeyboardEvent} event */
	onKeyDown(event) {
		if(!this.range_element) return;
		this.gain_controller.onKeyDown(event);
		if(event.key=="f") {
			var compressor_reduction_factor=this.gain_controller.dynamics_compressor.reduction;
			if(compressor_reduction_factor>0) {
				console.log("+",compressor_reduction_factor);
				return;
			}
			let new_gain=Math.log((compressor_reduction_factor)*-1);
			if(new_gain>0) return;
			new_gain=(new_gain*-1)/(Math.log(this.max_compressor_reduction*-1)*-1/2);
			console.log("ng",new_gain,compressor_reduction_factor);
			if(new_gain>this.overdrive) new_gain=this.overdrive;
			if(new_gain<this.min) new_gain=this.min;
			this.setGain(new_gain);
		}
	}
	/** @private @arg {number} new_gain */
	updateRangeElement(new_gain) {
		if(!this.range_element) return;
		this.range_element.value=""+Math.floor(this.max*new_gain);
	}
	/** @private @arg {Element} view_parent */
	attach_to_element(view_parent) {
		if(!this.view_div) {
			let element=document.getElementById("rh_css");
			if(!element) {
				element=document.createElement("div");
				element.id="rh_css";
			}
			this.view_div=element;
		}
		if(!this.range_element) {
			let element=document.getElementById("i_r_css");
			if(element instanceof HTMLInputElement) this.range_element=element;
			if(!this.range_element) {
				if(element) element.remove();
				this.range_element=document.createElement("input");
				this.range_element.type="range";
				this.range_element.id="i_r_css";
				let range_style=this.range_element.style;
				range_style.width="calc(100% + 40px + 8px + 40px)";
				range_style.marginLeft="0";
				range_style.marginRight="0";
			}
			this.range_element.oninput=() => {
				if(!this.range_element) return;
				let range_value=Number.parseInt(this.range_element.value,10);
				this.setGain(range_value/this.max);
			};
			this.range_element.onkeydown=event => this.onKeyDown(event);
			this.range_element.min=""+this.min;
			this.range_element.max=""+this.overdrive;
			let new_gain=this.calculateGain();
			this.setGain(new_gain);
			this.view_div.append(this.range_element);
		}
		view_parent.insertAdjacentElement("beforebegin",this.view_div);
	}
}
/** @private @arg {string|URL} url */
function to_url(url) {
	if(url instanceof URL) {
		return url;
	} else {
		return new URL(url);
	}
}
/** @private @arg {Error} rejection @returns {Promise<Response>} */
function fetch_rejection_handler(rejection) {
	if(rejection instanceof DOMException) {
		throw rejection;
	}
	if(rejection instanceof TypeError) {
		throw rejection;
	}
	console.log("fetch_rejection_handler");
	console.log("\t",rejection);
	throw rejection;
}
class PropertyHandler {
	/** @private @type {PropertyHandler[]} */
	static instances=[];
	/** @private @type {Map<{}, {}>} */
	proxy_map=new Map;
	/** @private @type {{value: any}} */
	override_value={value: void 0};
	/** @public @arg {(args: [any, any, any]) => any} on_target_apply_callback */
	constructor(on_target_apply_callback) {
		this.on_target_apply_callback=on_target_apply_callback;
		PropertyHandler.instances.push(this);
	}
	get() {
		return this.override_value.value;
	}
	/** @public @arg {any} value */
	set(value) {
		if(value===void 0||value===null) {
			this.override_value.value=value;
			return;
		}
		if(this.proxy_map.has(value)) {
			let proxy_override=this.proxy_map.get(value);
			if(!proxy_override) return;
			this.override_value.value=proxy_override;
		} else {
			let t=this;
			let proxy_override=new Proxy(value,{
				apply(...arr) {
					return t.on_target_apply_callback(arr);
				}
			});
			this.proxy_map.set(value,proxy_override);
			this.override_value.value=proxy_override;
		}
	}
}
/** @private @arg {{}} object @arg {PropertyKey} property @arg {PropertyHandler} property_handler */
function override_prop(object,property,property_handler) {
	Object.defineProperty(object,property,{
		get() {
			return property_handler.get();
		},
		set(value) {
			return property_handler.set(value);
		}
	});
}
override_prop(window,"getInitialCommand",new PropertyHandler((/** @private @type {[any,any,any]} */args) => Reflect.apply(...args)));
class ObjectInfo {
	constructor() {
		let [gr_0,gr_1,gr_2]="{{:,:}}".split(":");
		this.chunk_beg=gr_0;
		this.chunk_sep=gr_1;
		this.chunk_end=gr_2;
		this.key_sep=this.chunk_end+this.chunk_sep+this.chunk_beg;
	}
}
ObjectInfo.instance=new ObjectInfo;
class R_HandleRichGrid$ {
	enable_logging=false;
	/** @readonly */
	class_name="HandleRichGridRenderer";
	/** @readonly */
	entry="richGridRenderer";
	/** @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		this.rendererContentItemArray=new HandleRendererContentItemArray(x);
	}
	/** @public @arg {string} path @arg {D__RichGrid} renderer */
	richGridRenderer$(path,renderer) {
		if(this.enable_logging) console.log("run handler richGridRenderer");
		if("masthead" in renderer) {
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead;
				/** @private @type {{masthead?: {}}&Omit<typeof renderer,"masthead">} */
				let no_ad_renderer=renderer;
				console.log("masthead",masthead);
				no_ad_renderer.masthead=masthead;
			}
		}
		if(renderer.contents) {
			if(this.enable_logging) console.log("on_contents",path);
			let filtered=this.rendererContentItemArray.replace_array(renderer.contents);
			if(filtered.length>0) {
				renderer.contents=filtered;
			}
		}
	}
}
class Base64Binary {
	/** @public @arg {string} key_str @arg {RegExp} key_regexp */
	constructor(key_str,key_regexp) {
		this._keyStr=key_str;
		this.key_regexp=key_regexp;
	}
	/* will return a  Uint8Array type */
	/** @public @arg {string} input */
	decodeByteArray(input) {
		let real_len=input.length-1;
		while(real_len>=0&&input[real_len]==="=") real_len--;
		var byte_len=((real_len+1)/4)*3|0;
		var ab=new ArrayBuffer(byte_len);
		let byte_arr=new Uint8Array(ab);
		let decoded=this.decode(input,byte_arr);
		if(!decoded) return null;
		return byte_arr;
	}
	decoder=new TextDecoder();
	/** @public @arg {string} input */
	decode_str(input) {
		let y=this.decodeByteArray(input);
		if(!y) return null;
		return this.decoder.decode(y);
	}
	/** @private @arg {string} input @arg {Uint8Array} binary_arr */
	decode(input,binary_arr) {
		var byte_len=(input.length/4)*3|0;
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		var j=0;

		let prev_len=input.length;
		let new_input=input.replace(this.key_regexp,"");
		if(prev_len!==new_input.length) {
			console.log("removed %o non base64 chars",prev_len-new_input.length);
			console.log("base64_str: \"%s\"",input);
			debugger;
			return false;
		}
		input=new_input;

		for(i=0;i<byte_len;i+=3) {
			//get the 3 octets in 4 ascii chars
			enc1=this._keyStr.indexOf(input.charAt(j++));
			enc2=this._keyStr.indexOf(input.charAt(j++));
			enc3=this._keyStr.indexOf(input.charAt(j++));
			enc4=this._keyStr.indexOf(input.charAt(j++));

			chr1=(enc1<<2)|(enc2>>4);
			chr2=((enc2&15)<<4)|(enc3>>2);
			chr3=((enc3&3)<<6)|enc4;

			binary_arr[i]=chr1;
			if(enc3!=64) binary_arr[i+1]=chr2;
			if(enc4!=64) binary_arr[i+2]=chr3;
		}

		return true;
	}
}
let bigint_val_32=new Uint32Array(2);
let bigint_buf=new BigUint64Array(bigint_val_32.buffer);
class LongBits {
	/** @public @arg {number} a @arg {number} b */
	constructor(a,b) {
		this.lo=a;
		this.hi=b;
	}
	toBigInt() {
		bigint_val_32[0]=this.lo;
		bigint_val_32[1]=this.hi;
		return bigint_buf[0];
	}
}
/** @private @arg {MyReader} reader @arg {number} [writeLength] */
function indexOutOfRange(reader,writeLength) {
	return RangeError("index out of range: "+reader.pos+" + "+(writeLength||1)+" > "+reader.len);
}
class MyReader {
	noisy_log_level=false;
	/** @public @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @public @arg {number} [size] */
	try_read_any(size) {
		try {
			return this.read_any(size);
		} catch {
			return null;
		}
	}
	/** @public @arg {number} [size] */
	reset_and_read_any(size) {
		return this.read_any(size,0);
	}
	/** @type {boolean} */
	failed=false;
	/** @private @arg {number} [size] @arg {number} [pos] */
	read_any(size,pos) {
		let was_failed=this.failed;
		let prev_pos=this.pos;
		let prev_len=this.cur_len;
		if(pos!==void 0) this.pos=pos;
		if(size===void 0) {
			this.cur_len=this.len;
		} else {
			this.cur_len=this.pos+size;
		}
		this.failed=false;
		try {
			return this.read_any_impl();
		} finally {
			this.pos=prev_pos;
			this.cur_len=prev_len;
			this.failed=was_failed;
		}
	}
	cur_len=0;
	/** @private */
	read_any_impl() {
		this.failed=false;
		/** @private @type {DataArrType} */
		let data=[];
		let loop_count=0;
		let log_slow=true;
		for(;this.pos<this.cur_len;loop_count++) {
			let cur_byte=this.uint32();
			if(cur_byte===null) {
				this.failed=true;
				break;
			}
			let wireType=cur_byte&7;
			let fieldId=cur_byte>>>3;
			let first_num=this.skipTypeEx(fieldId,wireType);
			data.push([fieldId,wireType,first_num]);
			if(this.failed) {
				break;
			}
			if(log_slow&&loop_count>128) {
				console.log("taking a long time to read protobuf data");
				log_slow=false;
			}
			if(!log_slow&&loop_count%4096==0) {
				console.log("taking a very long time to read protobuf data",loop_count/4096|0);
			}
		}
		/** @private @type {DecTypeNum[]} */
		let res_arr=[];
		for(let i=0;i<data.length;i++) {
			let cur=data[i];
			let [_fieldId,_type,decoded_data]=cur;
			for(let item of decoded_data) {
				res_arr.push(item);
			}
		}
		return res_arr;
	}
	/** @private @template T @arg {number} pos @arg {()=>T} f */
	revert_to(pos,f) {
		let prev_pos=this.pos;
		this.pos=pos;
		try {
			return f();
		} finally {
			this.pos=prev_pos;
		}
	}
	/** @private @arg {number} [length] */
	skip(length) {
		this.last_pos=this.pos;
		let start_pos=this.pos;
		if(typeof length==="number") {
			/* istanbul ignore if */
			if(this.pos+length>this.len)
				throw indexOutOfRange(this,length);
			this.pos+=length;
		} else {
			do {
				/* istanbul ignore if */
				if(this.pos>=this.len)
					throw indexOutOfRange(this);
			} while(this.buf[this.pos++]&128);
		}
		if(length!==void 0) {
			if(this.noisy_log_level) console.log("asked to skip %o bytes",this.pos-start_pos);
		} else {
			if(this.noisy_log_level) console.log("asked to skip %o bytes of VarInt",this.pos-start_pos);
		}
	}
	uint32() {
		this.last_pos=this.pos;
		let ret=this.do_uint32_read();
		let diff=this.pos-this.last_pos;
		if(diff!==1) {
			if(this.noisy_log_level) console.log("at %o uint32 consumed %o bytes",this.last_pos,diff);
		}
		if(ret===null) throw new Error("Failed to read uint32");
		return ret;
	};
	read_varint() {
		let sa=[this.buf[this.pos]&127];
		while(true) {
			if(this.buf[this.pos++]<128) break;
			sa.push(this.buf[this.pos]&127);
			if(this.pos>this.len) return null;
		}
		return sa;
	}
	do_uint32_read() {
		let varint_arr=this.read_varint();
		if(varint_arr===null) return null;
		/** @private @arg {number} r @arg {[index:number,num:number]} v */
		function do_reduce_varint(r,[k,e]) {
			let mul_pos=2**(7*k);
			let mul_res=e*mul_pos;
			let num_ret=r+mul_res;
			if(num_ret>Number.MAX_SAFE_INTEGER) return null;
			return num_ret;
		}
		/** @private @arg {number} e @arg {number} n @returns {[index:number,num:number]} */
		function into_entries(e,n) {
			return [n,e];
		}
		let varint_entries=varint_arr.map(into_entries);
		/** @type {number|null} */
		let res=0;
		for(let i=0;i<varint_entries.length;i++) {
			let cur_res=do_reduce_varint(res,varint_entries[i]);
			if(cur_res===null) return null;
			res=cur_res;
		}
		return res;
	}
	uint64() {
		this.last_pos=this.pos;
		let u64_varint=this.read_varint();
		if(!u64_varint) return null;
		let ret=u64_varint.map((e,n) => [n,e]).reduce((acc,[k,e]) => {
			let k_=BigInt(k);
			let e_=BigInt(e);
			let mul_pos=2n**(7n*k_);
			let mul_res=e_*mul_pos;
			return acc+mul_res;
		},0n);
		return ret;
	}
	readLongVarint() {
		// tends to deopt with local vars for octet etc.
		var bits=new LongBits(0,0);
		var i=0;
		if(this.len-this.pos>4) { // fast route (lo)
			for(;i<4;++i) {
				// 1st..4th
				bits.lo=(bits.lo|(this.buf[this.pos]&127)<<i*7)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
			// 5th
			bits.lo=(bits.lo|(this.buf[this.pos]&127)<<28)>>>0;
			bits.hi=(bits.hi|(this.buf[this.pos]&127)>>4)>>>0;
			if(this.buf[this.pos++]<128)
				return bits;
			i=0;
		} else {
			for(;i<3;++i) {
				/* istanbul ignore if */
				if(this.pos>=this.len) throw new Error("indexOutOfRange");
				// 1st..3th
				bits.lo=(bits.lo|(this.buf[this.pos]&127)<<i*7)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
			// 4th
			bits.lo=(bits.lo|(this.buf[this.pos++]&127)<<i*7)>>>0;
			return bits;
		}
		if(this.len-this.pos>4) { // fast route (hi)
			for(;i<5;++i) {
				// 6th..10th
				bits.hi=(bits.hi|(this.buf[this.pos]&127)<<i*7+3)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
		} else {
			for(;i<5;++i) {
				if(this.pos>=this.len)
					throw new Error("indexOutOfRange");
				// 6th..10th
				bits.hi=(bits.hi|(this.buf[this.pos]&127)<<i*7+3)>>>0;
				if(this.buf[this.pos++]<128)
					return bits;
			}
		}
		/* istanbul ignore next */
		throw Error("invalid varint encoding");
	}
	readFixed64() {
		if(this.pos+8>this.len)
			throw indexOutOfRange(this,8);
		return new LongBits(
			this.readFixed32_end(this.buf,this.pos+=4),
			this.readFixed32_end(this.buf,this.pos+=4)
		).toBigInt();
	}
	/** @private @arg {Uint8Array} buf @arg {number} end */
	readFixed32_end(buf,end) {
		return (buf[end-4]
			|buf[end-3]<<8
			|buf[end-2]<<16
			|buf[end-1]<<24)>>>0;
	}
	fixed64() {
		this.last_pos=this.pos;
		return this.readFixed64();
	}
	/** @private @arg {number} writeLength */
	indexOutOfRange(writeLength) {
		return RangeError("index out of range: "+this.pos+" + "+(writeLength||1)+" > "+this.len);
	}
	fixed32() {
		/* istanbul ignore if */
		if(this.pos+4>this.len)
			throw this.indexOutOfRange(4);

		return this.readFixed32_end(this.buf,this.pos+=4);
	}
	/** @returns {[number,number]|null} */
	read_field_description() {
		let cur_byte=this.uint32();
		if(!cur_byte) {
			this.failed=true;
			return null;
		}
		return [cur_byte&7,cur_byte>>>3];
	}
	log_range_error=false;
	/** @private @arg {number} fieldId @arg {number} wireType */
	skipTypeEx(fieldId,wireType) {
		if(this.noisy_log_level) console.log("[skip] pos=%o",this.pos);
		let pos_start=this.pos;
		/** @private @type {DecTypeNum[]} */
		let first_num=[];
		switch(wireType) {
			case 0:
				/** @private @type {[true,bigint,number]|[false,null,number]} */
				let revert_res=this.revert_to(pos_start,() => {
					try {
						let u64=this.uint64();
						if(u64===null) return [false,u64,this.pos];
						return [true,u64,this.pos];
					} catch {}
					return [false,null,this.pos];
				});
				let num32=null;
				x: try {
					num32=this.uint32();
				} catch {
					if(revert_res[0]) break x;
					this.failed=true;
					first_num.push(["error",fieldId]);
					break;
				}
				if(revert_res[0]&&num32===null) {
					let [,num64,new_pos]=revert_res;
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else if(num32===null) {
					this.failed=true;
					first_num.push(["error",fieldId]);
				} else if(revert_res[0]) {
					let [,num64,new_pos]=revert_res;
					if(num64!==BigInt(num32)) {
						first_num.push(["data64",fieldId,num64]);
						this.pos=new_pos;
					} else {
						first_num.push(["data32",fieldId,num32]);
					}
				} else {
					first_num.push(["data32",fieldId,num32]);
				}
				if(this.noisy_log_level) console.log("\"field %o: VarInt\": %o",fieldId,first_num[0][1]);
				break;
			case 1:
				let last_pos=this.pos;
				let f64=this.fixed64();
				if(this.pos>this.cur_len) {
					first_num.push(['error',last_pos]);
					break;
				}
				first_num.push(["data_fixed64",fieldId,f64]);
				break;
			case 2: {
				let size=this.uint32();
				if(size===null) {
					first_num.push(["error",fieldId]);
					this.failed=true;
					break;
				}
				if(this.pos+size>this.cur_len) {
					if(this.log_range_error) console.log("range error at",this.pos,fieldId,"size is too big",size);
					first_num.push(["error",fieldId]);
					this.failed=true;
					break;
				}
				let sub_buffer=this.buf.subarray(this.pos,this.pos+size);
				let res=this.try_read_any(size);
				/** @type {DecTypeNum} */
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",this.pos,fieldId);
					first_num.push(["error",fieldId]);
					this.failed=true;
				}
				x: if(res) {
					if(res.findIndex(e => e[0]==="error")>-1) {
						first_num.push(["child",fieldId,sub_buffer,null]);
						break x;
					}
					if(sub_buffer.length===0&&res.length!==0) debugger;
					first_num.push(["child",fieldId,sub_buffer,res]);
				} else {
					first_num.push(["child",fieldId,sub_buffer,null]);
				}
			} break;
			case 3: {
				let res;
				while((wireType=(res=this.uint32())&7)!==4) {
					let skip_res=this.skipTypeEx(res>>>3,wireType);
					if(this.failed) {
						first_num.push(["error",res>>>3]);
						break;
					}
					first_num.push(["group",res>>>3,skip_res]);
				}
			} break;
			case 4: {
				first_num.push(["error",fieldId]);
				this.failed=true;
			} break;
			case 5: first_num.push(["data_fixed32",fieldId,this.fixed32()]); break;
			default: break;
		}
		return first_num;
	}
}
const base64_dec=new Base64Binary("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",/[^A-Za-z0-9\+\/\=]/g);
const base64_url_dec=new Base64Binary("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",/[^A-Za-z0-9\-\_\=]/g);
/** @private @type {any[]} */
let blob_create_args_arr=[];
let plr_raw_replace_debug=true;
function plr_raw_replace(/** @private @type {{ args: { raw_player_response: any; }; }} */ player_config) {
	let raw_plr_rsp=player_config.args.raw_player_response;
	if(raw_plr_rsp===void 0) {
		console.log("yt_cfg",player_config);
		return;
	}
	if(plr_raw_replace_debug) console.log("plr_raw_replace","::","args.raw_player_response.playerAds=",raw_plr_rsp.playerAds);
	raw_plr_rsp.playerAds=[];
	if(plr_raw_replace_debug) console.log("plr_raw_replace","::","args.raw_player_response.adPlacements=",raw_plr_rsp.adPlacements);
	raw_plr_rsp.adPlacements=[];
	return;
}
function plr_raw_replace_embed() {
	return;
}
/** @private @type {any[]} */
let mk_tree_arr=[];
function act_found_create_yt_player(/** @private @type {{ data: { type: string; data: [any, any, any]; }; }} */ event) {
	let tr=event.data.type;
	if(tr!="yt.player.Application.createAlternate"&&tr!="yt.player.Application.create") return;
	let [,,value]=event.data.data;
	let [,player_config,static_config]=value;
	if(!player_config) return;
	if(static_config.isEmbed) {
		void player_config;
		plr_raw_replace_embed();
	} else {
		plr_raw_replace(player_config);
	}
}
let locked_set=new WeakMap();
let ud_func=new WeakSet();
class OnWindowProperty {
	constructor() {
		/** @private @type {{[str:string]:any}} */
		this._events={};
	}
	/** @public @arg {{ type: any; data?: { type: any; data: any[]; }; }} ev */
	dispatchEvent(ev) {
		let evt=this._events[ev.type].slice();
		if(evt===undefined) return;
		for(let i=0;i<evt.length;i++) {
			let hnd=evt[i];
			if(hnd.disposed) continue;
			let handler=hnd.handler;
			handler(ev);
		}
	}
	/** @public @arg {string|number} ev_name @arg {any} fn */
	removeEventListener(ev_name,fn) {
		let evt=this._events[ev_name];
		if(evt===undefined) return;
		for(let i=0;i<evt.length;i++) {
			let ce=evt[i];
			if(!ce.disposed&&ce.handler===fn) {
				evt.splice(i,1);
				i-=1;
			}
		}
	}
	/** @public @arg {string} ev_name @arg {(event: { data: { type: any; data: [any, any, any]; }; }) => void} fn */
	addEventListener(ev_name,fn) {
		(this._events[ev_name]??=[]).push({disposed: false,handler: fn});
	}
}
/** @private @arg {{ value?: any; value_tr?: any; value_of?: any; noisy_flag?: any; }} cc @arg {string} ms @arg {{}} obj @arg {string} [mc] */
function walk_key_path(cc,ms,obj,mc) {
	let fs;
	let mt=ms.match(cc.value_tr);
	if(mt!==null) {
		fs=mt[0];
	} else {
		return mc;
	}
	let f2=ms.slice(fs.length+1);
	let dx=f2.indexOf(".");
	let pq;
	if(dx>-1) {
		pq=f2.slice(0,dx);
	} else {
		pq=f2;
	}
	if(pq.length>0) {
		if((cc.value_tr+"."+pq)==mc) {
			return cc.value_tr+"."+pq;
		}
		new MKState({},obj,pq,`${cc.value_tr}.${pq}`,cc.noisy_flag).run();
		return cc.value_tr+"."+pq;
	}
	throw new Error();
}
let win_watch=new OnWindowProperty;
/** @private @arg {any} val @arg {MKState} cc */
function new_pv_fn(val,cc, /** @private @type {any[]} */ ...args) {
	let ret;
	let act_cb_obj={fired: false,ret: ret};
	win_watch.dispatchEvent({type: "new_window_object",data: {type: cc.value_tr,data: [cc.function_value,val,args,act_cb_obj]}});
	if(!act_cb_obj.fired&&cc.function_value) {
		ret=cc.function_value.apply(val,args);
	} else {
		ret=act_cb_obj.ret;
	}
	return ret;
}
/** @private @arg {MKState} cc */
function on_mk_function_property(cc) {
	/** @this {{}} */
	function with_this(/** @private @type {any} */ ...args) {
		new_pv_fn(this,cc,...args);
	}
	cc.value=with_this;
	ud_func.add(cc.value);
}
const ghost_symbol=Symbol.for("ghost");
class WithGhostSymbol {
	/** @private @type {boolean|undefined} */
	[ghost_symbol]=true;
}
class MKState {
	[ghost_symbol]=true;
	/** @public @arg {{}} value @arg {PropertyKey} property_key @arg {object} target @arg {string} property_path @arg {boolean} noisy */
	constructor(value,target,property_key,property_path,noisy) {
		this.value=value;
		this.property_key=property_key;
		this.target=target;
		this.property_path=property_path;
		this.noisy=noisy;
	}
	run() {
		return mk_run(this);
	}
	value={};
	value_tr="";
	/** @public @type {Function|null} */
	function_value=null;
	noisy=false;
}
/** @private @arg {MKState} cc @arg {{}} obj */
function on_mk_new_property(cc,obj) {
	if(obj instanceof Function) {
		cc.function_value=obj;
		on_mk_function_property(cc);
	} else {
		let mc;
		let ck_i=0;
		let ck_str=mk_tree_arr[ck_i];
		mc=walk_key_path(cc,ck_str,obj,mc);
		for(;ck_i<mk_tree_arr.length;ck_i++) {
			ck_str=mk_tree_arr[ck_i];
			mc=walk_key_path(cc,ck_str,obj,mc);
		}
		cc.value=obj;
	}
}
/** @private @arg {MKState} cc @arg {{}} obj */
function on_mk_property_set(cc,obj) {
	if(ud_func.has(obj)) cc.value=obj;
	if(as_instanceof(obj,WithGhostSymbol)[ghost_symbol]===undefined) {
		on_mk_new_property(cc,obj);
	} else {
		cc.value=obj;
	}
}
/** @private @arg {MKState} cc */
function mk_run(cc) {
	if(locked_set.has(cc.target)&&locked_set.get(cc.target).names.indexOf(cc.property_key)>-1) {
		return cc;
	}
	Object.defineProperty(cc.target,cc.property_key,{
		configurable: true,
		enumerable: true,
		get() {
			return cc.value;
		},
		set(val) {
			on_mk_property_set(cc,val);
		}
	});
	if(locked_set.has(cc.target)) {
		locked_set.get(cc.target).names.push(cc.property_key);
	} else {
		locked_set.set(cc.target,{names: [cc.property_key]});
	}
	return cc;
}
let yta_str="yt.player.Application";
mk_tree_arr.push(yta_str+".create",yta_str+".createAlternate");
new MKState({},window,"yt","yt",true).run();
win_watch.addEventListener("new_window_object",act_found_create_yt_player);
class YtdPageManagerElement extends HTMLElement {
	/** @returns {YtCurrentPage|undefined} */
	getCurrentPage() {throw new Error();}
}
/** @private @type {string[]} */
let playlist_arr=[];
/** @private @type {YtdPageManagerElement|null} */
let ytd_page_manager=null;
/** @private @arg {HTMLElement} element */
function on_ytd_page_manager(element) {
	const element_id="ytd-page-manager";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_page_manager=as_instanceof(element,YtdPageManagerElement);
	window.ytd_page_manager=element;
}
/** @private @type {HTMLElement|null} */
let ytd_watch_flexy=null;
/** @private @arg {HTMLElement} element */
function on_ytd_watch_flexy(element) {
	const element_id="ytd-watch-flexy";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_watch_flexy=element;
	window.ytd_watch_flexy=element;
	ytd_watch_flexy.addEventListener("yt-navigate",function(event) {
		for(let handler of on_yt_navigate) {
			handler(event);
		}
	});
}
/** @private @type {string[]} */
let page_type_changes=[];
function is_watch_page_active() {
	if(!ytd_page_manager?.getCurrentPage()) {
		return false;
	}
	return ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()==="ytd-watch-flexy";
}
/** @private @arg {Node} value */
function as_node(value) {
	return value;
}
function page_changed_next_frame() {
	if(!plugin_overlay_element) return;
	if(!ytd_page_manager) return;
	ytd_page_manager.getCurrentPage()?.append(as_node(plugin_overlay_element));
}
/** @private @type {Map<string, HTMLElement>} */
let element_map=new Map;
/** @private @type {Map<string, HTMLVideoElementArrayBox>} */
let box_map=new Map;
/** @private @type {YtdPlayerElement|null} */
let ytd_player=null;
/** @private @arg {HTMLElement} element */
function on_ytd_player(element) {
	const element_id="ytd-player";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	/** @private @type {any} */
	let element_any=element;
	/** @private @type {YtdPlayerElement} */
	let element_type=element_any;
	ytd_player=element_type;
	window.ytd_player=element;
}
// visibilitychange handler (resume video when page is visible again)
function fire_on_visibility_change_restart_video_playback() {
	if(!is_watch_page_active()) return;
	if(!ytd_player||!ytd_player.player_) return;
	if(ytd_player.player_.getPlayerState()!=2) return;
	ytd_player.pause();
	ytd_player.play();
}
class HTMLVideoElementArrayBox {
	/** @readonly */
	type="HTMLVideoElementArrayBox";
	/** @public @arg {HTMLVideoElement[]} value */
	constructor(value) {
		this.value=value;
	}
}
class YTNavigateFinishEvent {
	/** @public @arg {Event} value @return {YTNavigateFinishEvent} */
	static cast(value) {
		/** @private @type {any} */
		let ret=value;
		return ret;
	}
	/** @public @type {YTNavigateFinishDetail} */
	detail=as({});
}
/** @private @type {((event:YTNavigateFinishEvent)=>void)[]} */
let on_yt_navigate_finish=[];
let do_restart_video_playback=false;
let css_str=`
	ytd-watch-next-secondary-results-renderer {
		overflow-x:scroll;
		height:80vh;
	}
	/*# sourceURL=yt_css_user */
`;
/** @private @arg {string} css_content */
function createStyleElement(css_content) {
	let style=document.createElement("style");
	style.innerHTML=css_content;
	return style;
}
let ui_plugin_style_element=createStyleElement(css_str);
ui_plugin_style_element.innerHTML=css_str;
let ui_plugin_css_enabled=false;
function ui_css_toggle_click_handler() {
	if(ui_plugin_css_enabled) {
		ui_plugin_style_element.remove();
		ui_plugin_css_enabled=false;
	} else {
		document.head.append(ui_plugin_style_element);
		ui_plugin_css_enabled=true;
	}
}
dom_observer.addEventListener("async-plugin-init",plugin_init);
/** @private @arg {HTMLCollectionOf<HTMLElement>} element_list @arg {HTMLVideoElementArrayBox} list_box */
function get_new_video_element_list(element_list,list_box) {
	let new_video_elements=[];
	for(let i=0;i<element_list.length;i++) {
		let item=element_list[i];
		if(!(item instanceof HTMLVideoElement)) continue;
		if(!list_box.value.includes(item)) {
			new_video_elements.push(item);
			list_box.value.push(item);
		}
	}
	return new_video_elements;
}

/** @private @type {HTMLElement|null} */
let yt_playlist_manager=null;
/** @private @arg {HTMLElement} element */
function on_yt_playlist_manager(element) {
	const element_id="yt-playlist-manager";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	yt_playlist_manager=element;
	window.yt_playlist_manager=element;
}
/** @private @type {[number, number][]} */
let port_state_log=[];
class MessagePortState {
	port_state_log=port_state_log;
	time_offset=performance.now();
	/** @readonly */
	current_event_type="async-plugin-init";
}
let port_state=new MessagePortState;

let slow_message_event=false;
const message_channel_loop_delay=80;
/** @private @arg {MessageEvent<number>} event */
function on_port_message(event) {
	if(is_yt_debug_enabled) console.log("msg_port:message %o",event.data);
	port_state_log.push([performance.now()-port_state.time_offset,event.data]);
	if(slow_message_event) {
		setTimeout(fire_observer_event,message_channel_loop_delay);
		return;
	}
	fire_observer_event();
}

let message_channel=new MessageChannel();

function fire_observer_event() {
	dom_observer.notify_with_port(message_channel.port1);
}
/** @private @arg {HandleTypes} handle_types */
function start_message_channel_loop(handle_types) {
	message_channel=new MessageChannel();
	message_channel.port2.onmessage=on_port_message;
	if(top===window) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {handle_types},
			port: message_channel.port1,
		});
	}
}
/** @private @arg {Document|Element} node @arg {string} child_node_tag_name */
function get_html_elements(node,child_node_tag_name) {
	return node.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",child_node_tag_name);
}
/** @private @type {((event:{})=>void)[]} */
var on_yt_navigate=[];
async function wait_for_yt_player() {
	if(!ytd_player) {
		throw new Error("No ytd_player to await");
	}
	await ytd_player.playerResolver_.promise;
}
/** @private @arg {HTMLElement} element */
function sumOffset(element) {
	let cache={
		top_offset: 0,
		left_offset: 0
	};
	/** @private @type {HTMLElement|null} */
	let cur_element=null;
	cur_element=element;
	for(;;) {
		cache.top_offset+=cur_element.offsetTop;
		cache.left_offset+=cur_element.offsetLeft;
		/** @private @type {Element|null} */
		let next_element=cur_element.offsetParent;
		if(next_element instanceof HTMLElement) {
			cur_element=next_element;
		} else {
			break;
		}
	}
	return cache;
}
let overlay_content_div=document.createElement("div");
let input_modify_css_style=document.createElement("div");
let overlay_hide_ui_input=document.createElement("div");
let plugin_overlay_element=document.createElement("div");
overlay_content_div.style.userSelect="all";
overlay_content_div.style.width="max-content";
input_modify_css_style.style.float="left";
input_modify_css_style.innerHTML="C";
input_modify_css_style.onclick=ui_css_toggle_click_handler;
overlay_hide_ui_input.style.float="left";
overlay_hide_ui_input.style.clear="left";
overlay_hide_ui_input.innerHTML="H";
overlay_hide_ui_input.onclick=title_display_toggle;
plugin_overlay_element.id="mz_overlay";
plugin_overlay_element.setAttribute("style",player_overlay_style_str);
plugin_overlay_element.append(overlay_content_div);
plugin_overlay_element.append(input_modify_css_style);
plugin_overlay_element.append(overlay_hide_ui_input);
function update_plugin_overlay_location() {
	if(!ytd_player) return;
	let player_offset=sumOffset(ytd_player);
	plugin_overlay_element.style.top=player_offset.top_offset+"px";
	plugin_overlay_element.style.left=player_offset.left_offset+"px";
}
let no_storage_access=false;
let title_save;
try {
	title_save=localStorage.getItem("title_save_data");
} catch {
	no_storage_access=true;
}
if(!title_save) {
	title_save="{\"value\":false}";
	if(!no_storage_access) {
		localStorage.setItem("title_save_data",title_save);
	}
}
function log_current_video_data() {
	if(!ytd_player) return;
	if(!ytd_player.player_) {
		wait_for_yt_player().then(log_current_video_data);
		return;
	}
	const video_data=ytd_player.player_.getVideoData();
	if(video_data.video_id===undefined) return;
	if(video_data.eventId===void 0) return;
	const {video_id,title,author}=video_data;
	const playlist_log_str=`[${author},${video_id}] ${title}`;
	if(playlist_log_str===playlist_arr.at(-1)) return;
	playlist_arr.push(playlist_log_str);
	console.log(playlist_log_str);
	overlay_content_div.innerText=`[${video_id}] ${title}`;
}
on_yt_navigate_finish.push(log_current_video_data);
let title_text_overlay_enabled=true;
let title_on=JSON.parse(title_save).value;
function title_text_overlay_update() {
	if(title_text_overlay_enabled) {
		overlay_hide_ui_input.style.color="";
		if(title_on) {
			overlay_content_div.style.display="";
		} else {
			overlay_content_div.style.display="none";
		}
	} else {
		overlay_hide_ui_input.style.color="#888";
		overlay_content_div.style.display="none";
	}
}
/** @private @type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}} */
function is_yt_fullscreen_change_action(detail) {
	return detail.actionName==="yt-fullscreen-change-action";
}
/** @private @arg {CustomEvent<{actionName:"yt-fullscreen-change-action", args:[boolean]}>|CustomEvent<{actionName:string}>} event */
function on_yt_action(event) {
	let {detail}=event;
	if(is_yt_fullscreen_change_action(detail)) {
		let {args}=detail;
		update_plugin_overlay_location();
		setTimeout(update_plugin_overlay_location);
		title_text_overlay_enabled=!args[0];
		title_text_overlay_update();
	}
}
document.addEventListener("yt-action",as(on_yt_action));
function title_display_toggle() {
	title_on=!title_on;
	title_text_overlay_update();
	if(no_storage_access) return;
	localStorage["title_save_data"]=JSON.stringify({value: title_on});
}
function update_ui_plugin() {
	if(is_yt_debug_enabled) console.log("update_ui_plugin");
}
let volume_plugin_style_source=`
	#rh_css {
		--w: calc(100% - 16px - 264px - 728px - 225px);
		--cv: calc(100% / 3.98);
		--fo: 0.6px;
		position: absolute;
		left: 168px;
		width: calc(var(--w) / 2);
		z-index: 1;
	}
	@media screen and (max-width: 1260px) {
		#rh_css {
			display: none;
		}
	}
	#i_r_css {
		outline: none;
	}
	@media screen and (prefers-color-scheme: light) {
		#i_r_css {
			--bg-range-color: #ff000040;
			background: #fff;
		}
	}
	@media screen and (prefers-color-scheme: dark) {
		#i_r_css {
			--bg-range-color: #ff000086;
			background: transparent;
		}
	}
	@supports selector(::-webkit-slider-thumb) {
		#i_r_css::-webkit-slider-runnable-track {
			padding: 0;
			margin: 0;
			background: repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), var(--bg-range-color) var(--cv));
		}
		#i_r_css {
			border-style: solid;
			border-width: 0 2.5px;
			border-right-color: #f00;
			border-left-color: #f00;
			appearance: none;
			padding: 0;
			display: block;
			z-index: 1;
		}
		#i_r_css::-webkit-slider-thumb {
			appearance: none;
			width: 4px;
			height: 8px;
			color: #000;
			background: #000;
			border: 0;
		}
	}
	@supports selector(::-moz-range-thumb) {
		#i_r_css::-moz-range-track {
			padding: 0;
			margin: 0;
			height: 8px;
			background: repeating-linear-gradient(90deg, transparent, #ff000014 var(--fo), var(--bg-range-color) var(--cv));
		}
		#i_r_css {
			height: 8px;
			border-style: solid;
			border-width: 0 2.5px;
			border-color: #f00;
			border-right-color: #f00;
			appearance: none;
			padding: 0;
			display: block;
		}
		#i_r_css::-moz-range-thumb {
			appearance: none;
			width: 4px;
			height: 8px;
			color: #000;
			background: #000;
			border: 0;
		}
	}
	/\*# sourceURL=youtube_volume_plugin_style_source*\/
`;
class AudioGainController {
	/** @private @type {(HTMLVideoElement|HTMLAudioElement)[]} */
	attached_element_list=[];
	/** @private @type {MediaElementAudioSourceNode[]} */
	media_element_source_list=[];
	/** @protected @type {Event|null} */
	last_event=null;
	constructor() {
		this.audioCtx=new AudioContext();
		this.gain_node=this.audioCtx.createGain();
		this.dynamics_compressor=this.initCompressor(this.audioCtx.createDynamicsCompressor());
		this.init_node_chain([
			this.dynamics_compressor,
			this.gain_node,
			this.audioCtx.destination,
		]);
	}
	/** @public @arg {Event} event */
	onKeyDown(event) {
		this.last_event=event;
	}
	/** @private @arg {AudioNode[]} node_chain */
	init_node_chain(node_chain) {
		for(let i=0;i<node_chain.length-1;i++) {
			node_chain[i].connect(node_chain[i+1]);
		}
	}
	/** @private @arg {DynamicsCompressorNode} node */
	initCompressor(node) {
		node.knee.value=27;
		node.attack.value=1;
		node.release.value=1;
		node.ratio.value=4;
		node.threshold.value=-24;
		return node;
	}
	/** @public @arg {number} gain */
	setGain(gain) {
		this.gain_node.gain.value=gain;
	}
	getGain() {
		return this.gain_node.gain.value;
	}
	/** @public @arg {HTMLMediaElement[]} media_node_list */
	attach_element_list(media_node_list) {
		for(let i=0;i<media_node_list.length;i++) {
			let video_element=media_node_list[i];
			// video_element.crossOrigin="anonymous";
			if(this.attached_element_list.includes(video_element)) continue;
			let media_element_source=this.audioCtx.createMediaElementSource(video_element);
			media_element_source.connect(this.dynamics_compressor);
			this.attached_element_list.push(video_element);
			this.media_element_source_list.push(media_element_source);
		}
	}
}
/** @private @type {AudioGainController|null} */
let audio_gain_controller=new AudioGainController;
/** @private @template {string} T @template {{}} U @template {Split<T, ",">} C @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}} @type {__ia_excludeKeysS} */
Object.__ia_excludeKeysS=function(/** @private @type {{ [s: string]: any; }|ArrayLike<any>} */ target,/** @private @type {string} */ ex_keys_str) {
	/** @private @type {any} */
	let ex_keys_any=ex_keys_str.split(",");
	/** @private @type {C} */
	let ex_keys=ex_keys_any;
	/** @private @type {C[number]} */
	var key;
	var rest,i=0;
	var obj=Object.fromEntries(Object.entries(target));
	for(;i<ex_keys.length;i++) {
		{
			key=ex_keys[i];
			let {
				[key]: _,
				...rest_
			}=obj;
			rest=rest_;
		};
		obj=rest;
	};
	/** @private @type {any} */
	let res_any=obj;
	/** @private @type {{[I in Exclude<keyof U,C[number]>]:U[I]}} */
	let res=res_any;
	return res;
};
let volume_plugin_style_element=createStyleElement(volume_plugin_style_source);
/** @private @template T,U */
class ServiceResolver {
	/** @private @type {T|null} */
	services=null;
	/** @private @type {U|null} */
	params=null;
	/** @public @arg {T} services @arg {U} params */
	constructor(services,params) {
		this.services=services;
		this.params=params;
	}
	/** @public @arg {T} services */
	set_services(services) {
		this.services=services;
	}
	/** @public @arg {U} params */
	set_params(params) {
		this.params=params;
	}
	/** @public @arg {keyof U} key */
	get_param(key) {
		if(!this.params) throw new Error("No service params");
		return this.params[key];
	}
	/** @public @template {keyof T} V @arg {V} key */
	get(key) {
		if(!this.services) throw new Error("No services");
		return this.services[key];
	}
	/** @public @template {keyof T} V @arg {V} key @arg {Extract<T,{}>[V]} value */
	set(key,value) {
		if(!this.services) throw new Error("No services");
		this.services[key]=value;
	}
}
//#endregion
//#region main
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	if(typeof exports==="object") {
		fn(exports);
	}
}
function main() {
	setTimeout(() => {
		window.yt_plugin?.ds.num_bitmap_console();
	},4000);
	const log_enabled_page_type_change=false;
	/** @private @type {ResolverT<Services,ServiceOptions>} */
	const resolver_value={value: null};
	const services=new Services(resolver_value);
	const yt_handlers=services.yt_handlers;
	const log_tracking_params=false;
	const log_click_tracking_params=false;

	class ServiceFlags {
		log_tracking_params=log_tracking_params;
		log_click_tracking_params=log_click_tracking_params;
		noisy_logging=false;
	}

	// init section
	const service_resolver=new ServiceResolver(services,new ServiceFlags);
	export_((exports) => {
		exports.Services=Services;
		exports.ParserService=ParserService;
		exports.HandleTypes=HandleTypes;
		exports.ServiceResolver=ServiceResolver;
		exports.YtPlugin=YtPlugin;
		exports.VolumeRange=VolumeRange;
		exports.sizeof_js=sizeof_js;
		exports.services=services;
	});
	resolver_value.value=service_resolver;
	on_yt_navigate_finish.push(log_page_type_change);

	// modify global section
	window.yt_plugin=services.yt_plugin;
	override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
	services.modify_env.modify_global_env();

	// wait for plugin requirements
	start_message_channel_loop(services.handle_types);
	/** @private @arg {[()=>R_BrowsePage, object, []]} apply_args */
	function do_proxy_call_getInitialData(apply_args) {
		return yt_handlers.on_initial_data(apply_args);
	}
	let current_page_type="";
	/** @private @arg {YTNavigateFinishEvent} event */
	function log_page_type_change(event) {
		let {detail}=event;
		if(!detail) return;
		if(!ytd_page_manager) {
			const target_element=get_html_elements(document,"ytd-page-manager")[0];
			if(!target_element) {
				throw new Error("Missing ytd_page_manager");
			} else {
				on_ytd_page_manager(target_element);
			}
		}
		if(!ytd_page_manager) throw new Error("Invalid state");
		yt_handlers.on_page_type_changed(detail);
		let page_manager_current_tag_name=ytd_page_manager.getCurrentPage()?.tagName.toLowerCase();
		let nav_load_str=`page_type_change: {current_page_element_tagName: "${page_manager_current_tag_name}", pageType: "${detail.pageType}"}`;
		if(nav_load_str===current_page_type) return;
		current_page_type=nav_load_str;
		page_type_changes.push(nav_load_str);
		if(log_enabled_page_type_change) console.log(nav_load_str);
	}
}
//#endregion
//#region string manipulation
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x,s=as(",")) {
	if(!x) {debugger;}
	let r=x.split(s);
	return as(r);
}
/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {SplitOnce<S,D>} */
function split_string_once(s,d=as(",")) {
	if(s==="") {
		/** @private @type {[]} */
		let r=[];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @private @type {[S]} */
		let r=[s];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @private @type {[string,string]} */
	let r=[a,b];
	/** @private @type {any} */
	let q=r;
	return as(q);
}
/** @private @arg {WA|null} _wa @template {string} WA @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {S extends `${D}${infer U}`?U extends `${WA}${infer A}`?["",`${WA}${A}`]:never:[S]} */
function split_string_once_ex(s,d=as(","),_wa) {
	if(s==="") {
		/** @private @type {[]} */
		let r=[];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @private @type {[S]} */
		let r=[s];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @private @type {[string,string]} */
	let r=[a,b];
	/** @private @type {any} */
	let q=r;
	return as(q);
}
/** @private @arg {WX|null} _wx @template {string} S @template {string} WX @arg {S} s @template {string} D @arg {D} d @returns {S extends `${infer U}${D}`?U extends WX?[WX,""]:never:S extends `${D}${infer U}`?U extends `${WX}${infer A}`?["",`${WX}${A}`]:never:[S]} */
function split_string_once_last(s,d,_wx) {
	if(s==="") {
		/** @private @type {[]} */
		let r=[];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.lastIndexOf(d);
	if(i===-1) {
		/** @private @type {[S]} */
		let r=[s];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @private @type {[string,string]} */
	let r=[a,b];
	/** @private @type {any} */
	let q=r;
	return as(q);
}
//#endregion
//#region ApiBase
const seen_map=new Set;
const general_service_state={
	logged_in: false,
	/** @private @type {{datasyncId: (BigInt|null)[]}|null} */
	mainAppWebResponseContext: null,
	/** @private @type {number|null} */
	maxAgeSeconds: null,
	/** @private @type {"non_member"|null} */
	premium_membership: null,
};
class ApiBase {
	/** @protected @arg {string} x */
	uppercase_first(x) {
		return x[0].toUpperCase()+x.slice(1);
	}
	/** @template T @arg {T[]} x */
	filter_keys(x) {
		let ret=[];
		for(let k of x) {
			if(k==="clickTrackingParams") continue;
			if(k==="commandMetadata") continue;
			ret.push(k);
		}
		if(!ret.length) {
			for(let k of x) {
				if(k==="clickTrackingParams") continue;
				ret.push(k);
			}
		}
		if(!ret.length) {
			for(let k of x) {
				ret.push(k);
			}
		}
		return ret;
	}
	/** @public @arg {unknown} x */
	get_name_from_keys(x) {
		if(typeof x!=='object') return null;
		if(x===null) return null;
		let keys=Object.keys(x);
		for(let c of keys) {
			if(c==="clickTrackingParams") continue;
			if(c==="commandMetadata") continue;
			return c;
		}
		return null;
	}
	/** @protected @template T @arg {NonNullable<T>} x @arg {TypeOfType<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @template {{}} B @template {B} U @arg {{}} x @arg {B} _b @returns {Partial<B>} */
	upgrade_obj(x,_b) {
		/** @type {Partial<B>} */
		let cd=x;
		/** @type {Partial<U|B>} */
		let id=cd;
		return id;
	}
	/** @protected @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length) return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a)) return false;
		}
		return true;
	}
	/** @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
	parse_url_search_params(t) {
		let sp=new URLSearchParams(t);
		/** @private @type {any} */
		let as_any=Object.fromEntries(sp.entries());
		return as_any;
	}
	/** @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
	get_keys_of(obj) {
		if(!obj) {
			debugger;
		}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
}
//#endregion
//#region Service
/** @template T */
class BitmapResult {
	/** @public  @arg {T[]} map_arr @arg {string} bitmap */
	constructor(map_arr,bitmap) {
		this.map_arr=map_arr;
		this.bitmap=bitmap;
	}
}
class KnownDataSaver extends ApiBase {
	constructor() {
		super();
		this.#load_data();
		this.#store_data();
	}
	/** @type {{[x:string]:{arr:any[],set(o:{}):void}}} */
	save_key_objs={};
	do_save_keys_obj=false;
	/** @template {string} T @arg {`[${T}]`} x @returns {T} */
	unwrap_brackets(x) {
		/** @returns {T|null} */
		function gn() {return null;}
		let wv=gn();
		let wa=split_string_once_ex(x,"[",wv);
		let [_s1,s2]=wa;
		let ua=split_string_once_last(s2,"]",wv);
		let [s3,_s4]=ua;
		return s3;
	}
	/** @public @template {{}} T @arg {`[${string}]`} k @arg {T|undefined} x */
	save_keys(k,x) {
		if(!x) {debugger; return;}
		let ki=this.unwrap_brackets(k);
		if(this.do_save_keys_obj) {
			if(!(ki in this.save_key_objs)) this.save_key_objs[ki]={
				arr: [],
				/** @private @arg {{}} o */
				set(o) {this.arr.push(o);}
			};
			this.save_key_objs[ki]?.set(x);
		}
		if(typeof x!=="object") return this.save_string(`[${ki}.type]`,typeof x);
		if(x instanceof Array) return this.save_string(`[${ki}.type]`,"array");
		let store=this.#get_keys_store();
		let keys=this.get_keys_of(x);
		let ret=this.save_to_store("save_keys",k,keys.join(),store);
		return ret;
	}
	/** @no_mod @arg {string} str @returns {Partial<ReturnType<KnownDataSaver["get_data_store"]>>} */
	#parse_data(str) {
		return JSON.parse(str);
	}
	#store_data() {
		let data=this.get_data_store();
		for(let v=0;v<data.seen_numbers.length;v++) {
			const j=data.seen_numbers[v];
			const [_n,[_k,c]]=j;
			for(let i=0;i<c.length;i++) {
				if(c[i]===null) {
					c.splice(i,1);
					i--;
				}
			}
		}
		let json_str=JSON.stringify(data);
		this.#save_local_storage(json_str);
	}
	#load_data() {
		if(this.#loaded_from_storage) return;
		let json_str=this.#get_local_storage();
		if(json_str) {
			let ret=this.#parse_data(json_str);
			this.#push_data_to_parent(ret);
			this.#loaded_from_storage=true;
		}
	}
	#data_store=new class StoreData {
		/** @type {number[]} */
		seen_root_visual_elements=[];
		/** @type {{[x:string]:number}} */
		strings_key_index_map={};
		/** @type {{[x:string]:number}} */
		seen_keys_index={};
		/** @type {[string,["one",string[]]|["many",string[][]]][]} */
		seen_keys=[];
		/** @type {[string,["one",string[]]|["many",string[][]]][]} */
		seen_strings=[];
		/** @type {[string,["one",number[]]|["many",number[][]]][]} */
		seen_numbers=[];
		/** @type {[string,{t:boolean;f:boolean}][]} */
		seen_booleans=[];
		/** @public @arg {Partial<StoreData>} x */
		update(x) {
			const {seen_booleans,seen_numbers,seen_root_visual_elements,seen_strings,seen_keys}=x;
			if(seen_booleans) this.seen_booleans=seen_booleans;
			if(seen_numbers) this.seen_numbers=seen_numbers;
			if(seen_root_visual_elements) this.seen_root_visual_elements=seen_root_visual_elements;
			if(seen_strings) this.seen_strings=seen_strings;
			if(seen_keys) this.seen_keys=seen_keys;
		}
	};
	get_data_store() {
		return this.#data_store;
	}
	/** @no_mod @arg {string} seen_data */
	#save_local_storage(seen_data) {
		if(no_storage_access) {
			this.#seen_data_json_str=seen_data;
			return;
		}
		localStorage.seen_data=seen_data;
	}
	#get_local_storage() {
		if(no_storage_access) return this.#seen_data_json_str;
		return localStorage.getItem("seen_data");
	}
	/** @no_mod @arg {Partial<ReturnType<KnownDataSaver["get_data_store"]>>} x */
	#push_data_to_parent(x) {
		let x1=this.get_data_store();
		x1.update(x);
	}
	/** @type {string|null} */
	#seen_data_json_str=null;
	#loaded_from_storage=false;
	/** @type {number|null|Nullable<{}>} */
	#idle_id=null;
	#onDataChange() {
		if(this.#idle_id!==null) return;
		this.#idle_id=requestIdleCallback(() => {
			this.#idle_id=null;
			this.#store_data();
		});
	}
	#get_string_store() {
		const {strings_key_index_map: index,seen_strings: data}=this.#data_store;
		return {index,data,new_data: this.#new_strings};
	}
	/** @type {[string,string|string[]][]} */
	#new_keys=[];
	#get_keys_store() {
		const {seen_keys_index: index,seen_keys: data}=this.#data_store;
		return {index,data,new_data: this.#new_keys};
	}
	/** @private @arg {string} key @arg {StoreDescription<string>} store */
	get_seen_string_item_store(key,store) {
		const {index,data}=store;
		let idx=index[key];
		if(idx) return data[idx];
		idx=data.findIndex(e => e[0]===key);
		if(idx<0) return this.add_to_index(key,["one",[]],store);
		index[key]=idx;
		return data[idx];
	}
	/** @type {[string,string|string[]][]} */
	#new_strings=[];
	/** @private @arg {string|string[]} x @arg {[string, ["one", string[]] | ["many", string[][]]]} data_item */
	save_to_data_item(x,data_item) {
		let target=data_item[1];
		if(x instanceof Array) {
			return this.add_many_to_data_item(x,data_item);
		} else {
			return this.add_one_to_data_arr(x,target);
		}
	}
	/** @private @arg {string[]} x @arg {[string, ["one", string[]] | ["many", string[][]]]} item */
	add_many_to_data_item(x,item) {
		let target=item[1];
		if(target[0]==="one") {
			let inner=target[1].map(e => [e]);
			target=["many",inner];
			item[1]=target;
		}
		let found=target[1].find(e => this.eq_keys(e,x));
		if(!found) return target[1].push(x);
		return -1;
	}
	/** @private @arg {string} x @arg {["one", string[]] | ["many", string[][]]} target */
	add_one_to_data_arr(x,target) {
		if(target[0]==="one") {
			if(!target[1].includes(x)) return target[1].push(x);
		} else if(target[0]==="many") {
			let res=target[1].find(([e,...r]) => !r.length&&e===x);
			if(!res) return target[1].push([x]);
		}
		return -1;
	}
	/** @private @arg {string} k @arg {StoreDescription<string>['data'][number][1]} x @arg {StoreDescription<string>} store */
	add_to_index(k,x,store) {
		/** @type {StoreDescription<string>['data'][number]} */
		let p=[k,x];
		let nk=store.data.push(p)-1;
		store.index[k]=nk;
		return p;
	}
	/** @private @arg {string} ns @arg {`[${string}]`} ka @arg {string|string[]} x @arg {StoreDescription<string>} store */
	save_to_store(ns,ka,x,store) {
		if(x===void 0) {debugger; return;}
		let k=this.unwrap_brackets(ka);
		let store_item=this.get_seen_string_item_store(k,store);
		let store_index=this.save_to_data_item(x,store_item);
		if(store_index<0) return false;
		store.new_data.push([k,x]);
		this.#onDataChange();
		console.log(`store [${ns}] [${k}] %o`,x);
		let idx=store.data.indexOf(store_item);
		if(idx<0) {debugger; return;}
		this.show_strings_bitmap(ns,idx,store);
		return true;
	}
	/** @public @arg {`[${string}]`} k_arg @arg {string|string[]} x */
	save_string(k_arg,x) {
		if(x===void 0) {debugger; return;}
		let k=this.unwrap_brackets(k_arg);
		let store=this.#get_string_store();
		let store_item=this.get_seen_string_item_store(k,store);
		if(!store_item) {
			store_item=[k,["one",[]]];
			let nk=this.#data_store.seen_strings.push(store_item)-1;
			this.#data_store.strings_key_index_map[k]=nk;
		}
		let was_known=this.save_to_data_item(x,store_item);
		if(was_known<0) return false;
		this.#new_strings.push([k,x]);
		this.#onDataChange();
		console.log("store_str [%s] %o",k,x);
		let idx=this.#data_store.seen_strings.indexOf(store_item);
		if(idx<0) {debugger; return;}
		this.show_strings_bitmap("save_string",idx,store);
		return true;
	}
	/** @private @arg {string} ns @arg {number} idx @arg {StoreDescription<string>} store */
	show_strings_bitmap(ns,idx,store) {
		let p=store.data[idx];
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		if(cur[0]==="many") {
			let src_data=cur[1];
			let max_len=src_data.map(e => e.length).reduce((a,b) => Math.max(a,b));
			for(let bitmap_src_idx=0;bitmap_src_idx<max_len;bitmap_src_idx++) {
				let bitmap_src=src_data.filter(e => bitmap_src_idx<e.length).map(e => e[bitmap_src_idx]);
				let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
				console.log(` --------- [${ns}] [store["${k}"][${bitmap_src_idx}]] --------- `);
				console.log(index_map.map(e => `"${e}"`).join(","));
				console.log(bitmap);
			}
			return;
		} else {
			let bitmap_src=cur[1];
			let linear_map=bitmap_src.every(e => !e.includes(","));
			if(linear_map) {
				console.log(` --------- [${ns}] [${k}] --------- `);
				console.log(bitmap_src.join(","));
				return;
			}
			let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
			console.log(` --------- [${ns}] [${k}] --------- `);
			console.log(index_map.join(","));
			console.log(bitmap);
		}
	}
	/** @private @arg {string} x */
	rle_enc(x) {
		let rle=x.replaceAll(/(1+)|(0+)/g,(v,c1,c2) => {
			let rle=c1?.length??c2?.length;
			if(rle<4) return "!"+v[0]+":"+v.length;
			if(c1?.length!==void 0) return "!"+c1[0]+":"+c1.length;
			if(c2?.length!==void 0) return "!"+c2[0]+":"+c2.length;
			return ["!",c1?.length,"$",c2?.length,":"]+"";
		}).split("!").slice(1);
		return rle.join("!");
	}
	num_bitmap_console() {
		let gg=this.get_data_store().seen_numbers.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		let g1=gg[1];
		if(g1[0]==="many") return;
		this.save_number("[arr.tracking.trackingParams.f1]",g1[1]);
		let bm=this.generate_bitmap_num(g1[1]).bitmap;
		this.save_string("[tp.f1.b_map]",bm.split("!").map((e,u) => [u,e].join("$")).join(","));
		this.get_data_store().seen_strings.find(e => e[0]==="tp.f1.b_map")?.[1]?.[1];
	}
	/** @private @arg {string[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let map_arr=[...new Set([...bitmap_src.map(e => e.split(",")).flat()])];
		let bitmap="\n"+bitmap_src.map(e => e.split(",").map(e => map_arr.indexOf(e))).map(e => {
			let ta=new Array(map_arr.length).fill(0);
			for(let x of e) ta[x]=1;
			let bs=ta.join("");
			return bs;
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		return new BitmapResult(map_arr,bitmap);
	}
	/** @private @arg {number[]} src */
	generate_bitmap_num_raw(src) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(0);
		src.forEach(e => {
			ta[e]=1;
		});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
	}
	/** @private @arg {number[]} src */
	generate_bitmap_num_raw_fill(src,fill_value=0) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(fill_value);
		/** @type {0|1} */
		let replace_value;
		if(fill_value===0) {
			replace_value=1;
		} else {
			replace_value=0;
		}
		src.forEach(e => {
			ta[e]=replace_value;
		});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
	}
	bitmap_console_todo_1() {
		let yt_plugin={
			ds: this,
		};
		let gg=yt_plugin.ds.get_data_store().seen_numbers.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1][0]==="many") return;
		gg[1][1].sort((a,b) => a-b);
		let g1=gg[1];
		/** @private @arg {string} str */
		function find_one_set_bit(str) {
			let rx=/(?<=0)1{1}(?=0)/g;
			/** @type {[number,string][]} */
			let r=[];
			for(;;) {
				let rr=rx.exec(str);
				if(rr===null) return r;
				r.push([rx.lastIndex,rr[0]]);
			}
		}
		let bm=yt_plugin.ds.generate_bitmap_num_raw_fill(g1[1],1).bitmap;
		let mm=find_one_set_bit(bm);
		/** @private @arg {string} bm */
		function unset_bits(bm) {
			let mu=bm.split("");
			for(let u of mm) {
				let [k,v]=u;
				let cx=k-1;
				let off=0;
				if(v.length===2) off=0;
				if(v.length===1) off=1;
				for(let i=cx-1;i<k+v.length-2;i++) {
					let ui=i+off;
					let log_clear=false;
					if(log_clear) console.log("clear",ui,"of",mu[ui]);
					mu[ui]="0";
				}
			}
			return mu;
		}
		/** @private @arg {string[]} s */
		function swap_mask(s) {
			return s.map(e => e==="0"? "1":"0").join("");
		}
		let mu=unset_bits(bm);
		new Map(mm);
		bm;
		yt_plugin.ds.rle_enc(mu.join(""));
		let mc=swap_mask(mu);
		mm=find_one_set_bit(mc);
		mu=unset_bits(mc);
		let mu_=swap_mask(mu);
		let mx=mu_;
		let rle_x=yt_plugin.ds.rle_enc(mx);
		console.log(rle_x.split("!"));
	}
	/** @private @arg {number[]} bitmap_src */
	generate_bitmap_num(bitmap_src) {
		let {map_arr,bitmap}=this.generate_bitmap_num_raw(bitmap_src);
		let bitmap_rle=this.rle_enc(bitmap);
		return new BitmapResult(map_arr,bitmap_rle);
	}
	/** @type {[string,number|number[]][]} */
	#new_numbers=[];
	/** @public @arg {`[${string}]`} key @arg {number|number[]} x */
	save_number(key,x) {
		if(x===void 0) {debugger; return;}
		let k=this.unwrap_brackets(key);
		let was_known=true;
		/** @private @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.#data_store.seen_numbers.find(e => e[0]===k);
		if(!p) {
			cur=["one",[]];
			p=[k,cur];
			this.#data_store.seen_numbers.push(p);
		} else {
			cur=p[1];
		}
		if(x instanceof Array) {
			let target=p[1];
			if(target[0]==="one") {
				let inner=target[1].map(e => [e]);
				target=["many",inner];
				p[1]=target;
			}
			let found=target[1].find(e => this.eq_keys(e,x));
			if(!found) {
				was_known=false;
				target[1].push(x);
			}
		} else {
			if(cur[0]==="one") {
				if(!cur[1].includes(x)) {
					was_known=false;
					cur[1].push(x);
				}
			} else if(cur[0]==="many") {
				let res=cur[1].find(([e,...r]) => !r.length&&e===x);
				if(!res) {
					was_known=false;
					cur[1].push([x]);
				}
			}
		}
		if(was_known) return;
		this.#new_numbers.push([k,x]);
		this.#onDataChange();
		console.log("store_num [%s]",k,x);
	}
	/** @type {[string,{t:boolean;f:boolean}][]} */
	#new_booleans=[];
	/** @public @arg {string} key @arg {boolean} bool */
	save_boolean(key,bool) {
		let krc=this.#data_store.seen_booleans.find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.#data_store.seen_booleans.push(krc);
		}
		let [,kc]=krc;
		if(bool) {
			if(!kc.t) {
				console.log(key,bool);
			}
			kc.t=true;
		} else {
			if(!kc.f) {
				console.log(key,bool);
			}
			kc.f=true;
		}
		this.#new_booleans.push([key,kc]);
		this.#onDataChange();
	}
	/** @type {number[]} */
	#new_root_visual_elements=[];
	/** @public @arg {number} x */
	save_root_visual_element(x) {
		if(x===void 0) {debugger; return;}
		if(this.#data_store.seen_root_visual_elements.includes(x)) return;
		console.log("store [root_visual_element]",x);
		this.#data_store.seen_root_visual_elements.push(x);
		this.#new_root_visual_elements.push(x);
		this.#onDataChange();
	}
}
const data_saver=new KnownDataSaver;
/** @template T,U */
class BaseServicePrivate extends ApiBase {
	//#region Public
	/** @public @arg {ResolverT<T,U>} x */
	constructor(x) {
		super();
		this.#x=x;
		this.ds=data_saver;
	}
	get x() {
		if(!this.#x.value) throw new Error();
		return this.#x.value;
	}
	/** @this {BaseServicePrivate<Services,{}>} */
	get parser() {
		if(!this.#x.value) throw new Error();
		return this.#x.value.get("parser_service");
	}
	/** @this {BaseServicePrivate<Services,{}>} */
	get codegen() {
		if(!this.#x.value) throw new Error();
		return this.#x.value.get("codegen");
	}
	/** @public @arg {`[${string}]`} k @arg {string|string[]} x */
	save_string(k,x) {
		this.ds.save_string(k,x);
	}
	/** @public @arg {`[${string}]`} k @arg {boolean} x */
	save_boolean(k,x) {
		this.ds.save_boolean(k,x);
	}
	/** @public @arg {`[${string}]`} k @arg {number|number[]} x */
	save_number(k,x) {
		this.ds.save_number(k,x);
	}
	//#endregion
	log_skipped_strings=false;
	#x;
}
/** @template C_T,C_U @extends {BaseServicePrivate<C_T,C_U>} */
class BaseService extends BaseServicePrivate {
	/** @public @arg {string} x */
	create_param_map(x) {
		let res_e=this.decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @typedef {number|string|bigint|['group',DecTypeNum[]]|["failed",DecTypeNum[]|null]|ParamMapType} ParamMapValue */
	/** @typedef {Map<number,ParamMapValue[]>} ParamMapType */
	/** @typedef {{[x:number]:number|string|ParamObjType}} ParamObjType */
	/** @public @arg {DecTypeNum[]} res_e */
	make_param_map(res_e) {
		/** @type {ParamMapType} */
		let ret_map=new Map();
		/** @private @arg {number} key @arg {ParamMapValue} value */
		let do_set=(key,value) => {
			if(ret_map.has(key)) {
				let v=ret_map.get(key);
				v?.push(value);
			} else {
				ret_map.set(key,[value]);
			}
		};
		for(let param of res_e) {
			switch(param[0]) {
				case "data_fixed32": case "data_fixed64":
				case "data32": do_set(param[1],param[2]); break;
				case "child": {
					x: if(param[3]) {
						let err=param[3].find(e => e[0]==="error");
						if(err) break x;
						let u8_arr=param[2];
						if(String.fromCharCode(...u8_arr.slice(0,4)).match(/[\w-]{4}/)) break x;
						let p_map=this.make_param_map(param[3]);
						if(!p_map) {
							do_set(param[1],["failed",param[3]]);
							break;
						}
						do_set(param[1],p_map);
						break;
					}
					let decoder=new TextDecoder();
					do_set(param[1],decoder.decode(param[2]));
				} break;
				case "data64": do_set(param[1],param[2]); break;
				case "group": do_set(param[1],['group',param[2]]); break;
				case "info": debugger; break;
				case "struct": debugger; break;
				case "error": return null;
				default: debugger; break;
			}
		}
		return ret_map;
	}
	/** @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
	join_string(x,s) {
		if(!x) {debugger;}
		let r=x.join(s);
		return as(r);
	}
	/** @template {string} T @arg {T} str @returns {UrlParse<T>} */
	parse_with_url_parse(str) {
		let s=new URL(str);
		/** @private @type {any} */
		let a=s;
		/** @private @type {UrlParse<T>} */
		let ret=a;
		return ret;
	}
	/** @public @arg {string} str */
	decode_b64_proto_obj(str) {
		let buffer=base64_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @public @arg {string} str */
	decode_b64_url_proto_obj(str) {
		let buffer=base64_url_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @public @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,`${string}${U}`>} */
	_2_str_ends_with(x,v) {
		return x.endsWith(v);
	}
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with(needle,str) {
		return str.startsWith(needle);
	}
	get TODO_true() {
		return true;
	}
	/** @private @arg {[string, `${string}.${string}.${string}`]} x @returns {[string,string,string,string]} */
	targetId_arr([f,a]) {
		let [c,a1]=split_string_once(a,".");
		let [d,a2]=split_string_once(a1,".");
		return [f,c,d,a2];
	}
	/** @public @arg {string} cf @arg {`${string}.${string}.${number}.${number}`} x */
	parse_transcript_target_id(cf,x) {
		let b=this.parser.targetId_arr(split_string_once(x,"."));
		this.parser.on_endpoint_params(cf,"transcript_target_id.param",b[1]);
	}
	/** @public @template {string} T @template {`${T}${"_"|"-"}${string}`} U @arg {T} ns @arg {U} s */
	save_enum(ns,s) {
		/** @private @type {"_"|"-"} */
		let sep;
		let ns_name="ENUM";
		if(s.includes("-")) {
			sep="-";
			ns_name="ELEMENT";
		} else {
			sep="_";
		}
		let no_ns=split_string_once(s,ns);
		if(!no_ns[1]) throw new Error();
		let nn=split_string_once(no_ns[1],sep);
		if(!nn[1]) throw new Error();
		/** @private @type {SplitOnce<NonNullable<SplitOnce<U,T>[1]>,"">[1]} */
		let no_ns_part=nn[1];
		this.save_string(`[${ns_name}::${ns}]`,no_ns_part);
	}
	/** @public @template {string} T @template {string} Sep @template {`${T}${Sep}${string}`} U @arg {T} enum_base @arg {U} enum_str @arg {Sep} sep */
	save_enum_with_sep(enum_base,enum_str,sep) {
		const ns_name="ELEMENT";
		let n1=split_string_once(enum_str,enum_base);
		if(!n1[1]) throw new Error();
		let n2=n1[1];
		if(sep!=="") {
			let sd=this.drop_separator(n1[1],sep);
			this.save_string(`[${ns_name}::${enum_base}]`,sd);
		} else {
			this.save_string(`[${ns_name}::${enum_base}]`,n2);
		}
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {SplitOnce<T,U>[number]} */
	drop_separator(x,sep) {
		let v=split_string_once(x,sep);
		if(v[0]) return v[0];
		let q=v[1];
		if(q) return q;
		return x;
	}
	/** @public @template {{}} T @arg {T} obj @returns {(keyof T)[]} */
	get_keys_of_ex(obj) {
		let pd=Object.getOwnPropertyDescriptors(obj);
		let l1_pk=this.get_keys_of(pd);
		/** @private @type {T} */
		let obj_proto=Object.getPrototypeOf(obj);
		let l2_pd=Object.getOwnPropertyDescriptors(obj_proto);
		let l2_pk=this.get_keys_of(l2_pd);
		let rq=l1_pk.concat(l2_pk);
		return rq;
	}
	/** @protected @name iterate_obj @arg {{}|undefined} obj @arg {(this:this,k:string,v: {})=>void} fn */
	v(obj,fn) {
		if(obj===void 0) return;
		let arr=Object.entries(obj);
		this.z(arr,e => fn.call(this,e[0],e[1]));
	}
	/** @public @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]}  */
	z(x,f) {
		if(x===void 0) {debugger; return [[],[]];}
		if(!x.entries) {debugger; return [[],[]];}
		/** @type {any[]} */
		let c=[];
		/** @type {any[]} */
		let v=[];
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			let u=f.call(this,a,i);
			if(u!==void 0) {
				c.push(u);
			} else if(u===void 0) {
				v.push(u);
			} else {
				throw new Error();
			}
		}
		return [c,v];
	}
	/** @public @template {GetMaybeKeys<T>} K @template U @template {{}} T @arg {T} x @arg {(this:this,x:T[K][number],i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]}  */
	zw(x,f) {
		return this.z(this.w(x),f);
	}
	/** @type {string[]} */
	logged_keys=[];
	/** @protected @template {{}} T @arg {{} extends T?MaybeKeysArray<T> extends []?T:never:never} x */
	g(x) {
		if(!x) {debugger; return;}
		let keys=this.get_keys_of(x);
		if(!keys.length) return;
		let jk=keys.join();
		if(this.logged_keys.includes(jk)) return;
		this.logged_keys.push(jk);
		console.log("[empty_object] [%s]",jk);
		debugger;
	}
	/** @public @template {GetMaybeKeys<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {T[SI]} */
	w(x,excl=[]) {
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		let k=keys[0];
		let r=x[k];
		return r;
	}
	/** @template {GetMaybeKeys<T>} K @template {{}} T @arg {T} x @arg {(x:T[K])=>void} f */
	y(x,f) {f.call(this,this.w(x));}
	/** @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t(x,f) {if(!x) return; return f.call(this,x);}
	/** @template {{}} T @arg {T[]|undefined} x @arg {(this:this,x:T)=>void} f */
	tz(x,f) {
		if(!x) return;
		this.z(x,f);
	}
	/** @public @arg {string} cf @template {{}} T @arg {T|undefined} x @arg {(this:this,cf:string,x:T)=>void} f */
	t_cf(cf,x,f) {
		if(x===void 0) return;
		f.call(this,cf,x);
	}
	/** @public @arg {string} cf @template {{}} T @arg {T[]|undefined} x @arg {(this:this,cf:string,x:T)=>void} f */
	tz_cf(cf,x,f) {
		if(x===void 0) return;
		this.z_cf(cf,x,f);
	}
	/** @public @arg {string} cf @template {{}} U @arg {U[]} x @arg {(this:this,cf:string,x:U,i:number)=>void} f  */
	z_cf(cf,x,f) {
		if(x===void 0) {debugger; return;}
		if(!x.entries) debugger;
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			f.call(this,cf,a,i);
		}
	}
	/** @public @arg {U|null} _rv @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t_ex(_rv,f,x) {if(!x) return; return f.call(this,x);}
	/** @template U @template {{}} T @arg {(this:this,x:T)=>U} f */
	tf(f) {
		/** @returns {U|null} */
		function mu() {return null;}
		/** @param {T|undefined} x @returns {U|undefined} */
		return x => this.t_ex(mu(),f,x);
	}
	/** @template {{}} T @arg {(this:this,x:T)=>void} f @returns {(x:T)=>void} */
	c1(f) {return x => f.call(this,x);}
	/** @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
	filter_out_keys(keys,to_remove) {
		to_remove=to_remove.slice();
		/** @type {Exclude<typeof keys[number],typeof to_remove[number]>[]} */
		let ok_e=[];
		for(let i=0;i<keys.length;i++) {
			let rm_idx=to_remove.findIndex(e => e===keys[i]);
			if(rm_idx>=0) {
				to_remove.splice(rm_idx,1);
				continue;
			}
			ok_e.push(as(keys[i]));
		}
		return ok_e;
	}
	/** @protected @template {{}} T @arg {T} x */
	is_empty_object(x) {
		let keys=this.get_keys_of(x);
		if(!keys.length) return true;
		return false;
	}
	/** @public @type {this['ds']['save_keys']} @arg {`[${string}]`} k @arg {{}|undefined} x */
	save_keys(k,x) {
		this.ds.save_keys(k,x);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class YtHandlers extends BaseService {
	/** @public @arg {ResolverT<Services,ServiceOptions>} res */
	constructor(res) {
		super(res);
		this.filter_handler_debug=false;
		this.handlers={
			rich_grid: new R_HandleRichGrid$(res),
			renderer_content_item_array: new HandleRendererContentItemArray(res),
		};
		this.iteration=new IterateApiResultBase(res,new YtObjectVisitor);
		this.blacklisted_item_sections=new Map([
			["backstagePostThreadRenderer",false],
			["channelAboutFullMetadataRenderer",false],
			["channelFeaturedContentRenderer",false],
			["channelRenderer",false],
			["commentsEntryPointHeaderRenderer",false],
			["compactPlaylistRenderer",false],
			["compactPromotedVideoRenderer",true/*compact promoted video (is_ads=true)*/],
			["compactRadioRenderer",false],
			["compactVideoRenderer",false],
			["connectedAppRenderer",false],
			["continuationItemRenderer",false],
			["gridRenderer",false],
			["messageRenderer",false],
			["pageIntroductionRenderer",false],
			["playlistRenderer",false],
			["playlistVideoListRenderer",false],
			["promotedSparklesWebRenderer",true/*promoted sparkles web (is_ads=true)*/],
			["radioRenderer",false],
			["recognitionShelfRenderer",false],
			["reelShelfRenderer",false],
			["searchPyvRenderer",true/*ads in search (is_ads=true)*/],
			["settingsOptionsRenderer",false],
			["shelfRenderer",false],
			["shelfRenderer",false],
			["videoRenderer",false],
		]);
	}
	/** @public @arg {string|URL|Request} request @arg {Response} response @arg {{}} data */
	on_handle_api(request,response,data) {
		/** @private @arg {string|URL|Request} req */
		function convert_to_url(req) {
			if(typeof req=="string") {
				return {url: to_url(req)};
			}
			if(req instanceof URL) {
				return {url: req};
			}
			return {url: to_url(req.url)};
		}
		let parsed_url=convert_to_url(request).url;
		/** @private @type {ApiUrlFormatFull} */
		let api_url=as(parsed_url.href);
		let url_type=this.x.get("handle_types").use_template_url(api_url);
		const res_parse=this.parse_with_url_parse(api_url);
		let ss1=split_string_once(res_parse.pathname,"/")[1];
		let get_ss2=() => {
			if(this.str_starts_with("youtubei/v1/",ss1)) {
				return split_string_once(ss1,"youtubei/v1/")[1];
			} else {
				return ss1;
			}
		};
		let ss2=get_ss2();
		if(!url_type) {
			debugger;
			/** @private @type {UrlTypes} */
			let url_h=as(this.join_string(split_string(ss2,"/"),"."));
			url_type=url_h;
		}
		if(!url_type) throw new Error("Unreachable");
		this.handle_any_data(url_type,data);
		let ht=this.x.get("handle_types");
		let res=ht.get_res_data(url_type,data);
		ht.ResponseTypes(response,res);
		this.iteration.default_iter({t: this,path: url_type},data);
	}
	/** @private @arg {UrlTypes|`page_type_${YTNavigateFinishDetail["pageType"]}`} path @arg {SavedDataItem} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @private @type {D__AnySaved} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,search,channel,playlist",",");
	do_initial_data_trace=false;
	/** @public @arg {[()=>YTNavigateFinishDetail["response"], object, []]} apply_args */
	on_initial_data(apply_args) {
		/** @private @type {YTNavigateFinishDetail["response"]} */
		let ret=Reflect.apply(...apply_args);
		if(!("page" in ret)) {
			return ret;
		}
		if(!ret.response) {
			console.log("[unhandled_return_value]",ret);
			debugger;
		}
		if(this.do_initial_data_trace) {
			this.upgrade_obj(ret,{is_initial_data: true}).is_initial_data=true;
			this.upgrade_obj(ret.endpoint,{is_initial_endpoint: true}).is_initial_endpoint=true;
		}
		if(is_yt_debug_enabled) console.log("[initial_data]",ret);
		this.handle_any_data(`page_type_${ret.page}`,as(ret));
		// this.x.get("handle_types").DataResponsePageType(ret);
		this.iteration.default_iter({t: this,path: ret.page},ret);
		let page_type=window.ytPageType;
		if(!page_type) {
			debugger;
			return ret;
		}
		/** @private @template {U[]} T @template U @arg {T} a @arg {U} t */
		function includes(a,t) {
			return a.includes(t);
		}
		if(!includes(this.known_page_types,page_type)) {
			console.log("unknown page type",page_type);
			debugger;
		}
		return ret;
	}
	/** @public @arg {YTNavigateFinishDetail} detail */
	on_page_type_changed(detail) {
		try {
			if(this.do_initial_data_trace) console.log('ptc detail',detail);
			this.x.get("handle_types").YTNavigateFinishDetail(detail);
		} catch(e) {
			console.log("plugin error");
			console.log(e);
		}
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class HandleRendererContentItemArray extends BaseService {
	debug=false;
	/** @private @arg {R_RichItem} content_item */
	filter_for_rich_item_renderer(content_item) {
		let noisy_logging=this.x.get_param("noisy_logging");
		let renderer=content_item.richItemRenderer;
		console.assert(renderer.content!=void 0,"richItemRenderer has content");
		if("adSlotRenderer" in renderer.content) {
			if(noisy_logging) console.log("adSlotRenderer=",renderer.content.adSlotRenderer);
			return false;
		}
		let rc=renderer.content;
		if("videoRenderer" in rc) return true;
		if("radioRenderer" in rc) return true;
		if("feedNudgeRenderer" in rc) return true;
		let rk=this.get_keys_of(rc);
		console.log("[rich_item_renderer.content] [%s]",...rk);
		debugger;
		return true;
	}
	/** @private @arg {R_RichSection} content_item */
	handle_rich_section_renderer(content_item) {
		let renderer=content_item.richSectionRenderer;
		/** @type {G_RichSection} */
		let content=renderer.content;
		if("inlineSurveyRenderer" in content) return true;
		if("sourcePivotHeaderRenderer" in content) return true;
		if(!("richShelfRenderer" in content)) {
			console.log("rich section content",content);
			return true;
		}
		let rich_shelf=content.richShelfRenderer;
		if(rich_shelf.icon) {
			if(rich_shelf.icon.iconType==="YOUTUBE_SHORTS_BRAND_24") {
				return false;
			}
			console.log("rich shelf icon",rich_shelf,rich_shelf.icon);
			return true;
		}
		if(!rich_shelf.title.runs) {
			if(this.debug) console.log("rich shelf title",rich_shelf.title);
			return true;
		}
		if(rich_shelf.title.runs[0]) {
			if(rich_shelf.title.runs[0].text==="Breaking news") {
				return false;
			}
			if(this.debug) console.log("rich shelf title",rich_shelf.title.runs[0]);
			return true;
		}
		console.log("rich shelf",rich_shelf);
		return true;
	}
	/** @public @template {R_BrowseFeed[]|G_WatchNext[]|G_CommentsSection[]|G$SectionItem[]} T @arg {T} arr @returns {T} */
	replace_array(arr) {
		return as(arr.filter((/** @private @type {typeof arr[number]} */content_item) => {
			let keys=this.get_keys_of(content_item);
			if("richItemRenderer" in content_item) {
				return this.filter_for_rich_item_renderer(content_item);
			}
			if("commentThreadRenderer" in content_item) return true;
			if("commentsHeaderRenderer" in content_item) return true;
			if("continuationItemRenderer" in content_item) return true;
			if("compactVideoRenderer" in content_item) return true;
			if("compactPlaylistRenderer" in content_item) return true;
			if("feedFilterChipBarRenderer" in content_item) return true;
			if("commentRenderer" in content_item) return true;
			if("itemSectionRenderer" in content_item) return true;
			if("compactRadioRenderer" in content_item) return true;
			if(!("richSectionRenderer" in content_item)) {
				console.log("extra content_item keys "+"["+keys.join("][")+"]",content_item);
				return true;
			};
			return this.handle_rich_section_renderer(content_item);
		}));
	}
}
/** @typedef {{t:YtHandlers;path:string}} ApiIterateState */
class YtObjectVisitor {
	/** @public @arg {ApiIterateState} state @arg {G_AppendContinuationItems} action */
	appendContinuationItemsAction(state,action) {
		if(!action.continuationItems) {
			debugger;
		}
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(action.continuationItems);
		if(filtered.length>0) {
			action.continuationItems=filtered;
		}
	}
	/** @public @arg {ApiIterateState} state @arg  {DC_ReloadContinuationItems} command */
	reloadContinuationItemsCommand({t: state},command) {
		if(!command.continuationItems) {
			debugger;
		}
		let filtered=state.handlers.renderer_content_item_array.replace_array(command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @public @arg {ApiIterateState} state @arg {D__ItemSection} renderer */
	itemSectionRenderer_with_state(state,renderer) {
		let {t}=state;
		t.iteration.default_iter(state,renderer);
		if(renderer.contents===void 0) return;
		renderer.contents=renderer.contents.filter((item) => {
			let keys=state.t.get_keys_of(item);
			for(let key of keys) {
				let is_blacklisted=t.blacklisted_item_sections.get(key);
				if(is_blacklisted!==void 0) return !is_blacklisted;
				console.log("filter_handlers: new item section at itemSectionRenderer.contents[]: ",key);
			}
			return true;
		});
	}
	/** @public @arg {ApiIterateState} state @arg {D__RichGrid} renderer */
	richGridRenderer(state,renderer) {
		state.t.handlers.rich_grid.richGridRenderer$(state.path,renderer);
		state.path="richGridRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @public @arg {ApiIterateState} state @arg {{}} renderer */
	compactVideoRenderer(state,renderer) {
		state.path="compactVideoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @public @arg {ApiIterateState} state @arg {{}} renderer */
	thumbnailOverlayToggleButtonRenderer(state,renderer) {
		state.path="thumbnailOverlayToggleButtonRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @public @arg {ApiIterateState} state @arg {{}} renderer */
	videoRenderer(state,renderer) {
		state.path="videoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class IterateApiResultBase extends BaseService {
	obj_visitor;
	/** @private @type {Map<string,keyof YtObjectVisitor>} */
	keys_map=new Map;
	/** @public @arg {ResolverT<Services, ServiceOptions>} x @arg {YtObjectVisitor} obj_visitor */
	constructor(x,obj_visitor) {
		super(x);
		this.obj_visitor=obj_visitor;
		let keys=this.get_keys_of_ex(obj_visitor);
		for(let i of keys) {
			this.keys_map.set(i,i);
		}
	}
	/** @public @arg {ApiIterateState} state @arg {{}} data */
	default_iter(state,data) {
		if(data===void 0) {
			return;
		}
		if(typeof data==="string") {
			return;
		}
		let {t,path}=state;
		if(data instanceof Array) {
			for(let [key,value] of data.entries()) {
				this.default_iter({t,path: `${path}[${key}]`},value);
			}
			return;
		}
		for(let key in data) {
			/** @private @type {{[x: string]: {}}} */
			let wk=data;
			let value=wk[key];
			let rk=this.keys_map.get(key);
			let iter_target=this.obj_visitor;
			const state={t,path: `${path}.${key}`};
			if(rk!==void 0) {
				if(this.obj_visitor[rk]===void 0) {
					console.log("update keys map remove",key);
					debugger;
				}
				iter_target[rk](state,as(value));
			} else {
				if(key in this.obj_visitor) {
					console.log("update keys map new key",key);
					debugger;
				}
				this.default_iter(state,value);
			}
		}
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class CsiService extends BaseService {
	data={
		/** @private @type {BrowseEndpointPages|null} */
		yt_fn: null,
		/** @private @type {RC$CsiServiceC["value"]|null} */
		c: null,
		/** @private @type {RC$CsiVarTypes["cver"]|null} */
		cver: null,
		/** @private @type {"1"|null} */
		yt_li: null,
		/** @private @type {"1"|null} */
		yt_ad: null,
	};
	/** @private @type {(RidFormat<string>)[]} */
	rid_keys=[
		"GetAccountAdvanced_rid","GetAccountBilling_rid","GetAccountDownloads_rid","GetAccountMenu_rid","GetAccountNotifications_rid","GetAccountOverview_rid","GetAccountPlayback_rid","GetAccountPrivacy_rid","GetAccountSharing_rid","GetAccountsList_rid","GetAttestationChallenge_rid","GetGamingDestination_rid","GetHistory_rid","GetHome_rid","GetLibrary_rid","GetLiveChatReplay_rid","GetNotificationsMenu_rid","GetPlayer_rid","GetPlaylist_rid","GetReelItemWatch_rid","GetReelWatchSequence_rid","GetSubscriptions_rid","GetUnseenNotificationCount_rid","GetVideoTranscript_rid","GetWatchNext_rid","GetWatchPageWebCommentReplies_rid","GetWatchPageWebTopLevelComments_rid","GetWebMainAppGuide_rid","RecordNotificationInteractions_rid","RemoveLike_rid",
		"SetSetting_rid",
		"Like_rid",
		"GetAddToPlaylist_rid",
		"EditPlaylist_rid",
	];
	/** @private @arg {{key:RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_param_key(x) {
		this.decode_rid_section(x);
		this.save_string("[rid_key]",x.key);
	}
	/** @private @arg {{key:RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_section(x) {
		let section=/[A-Z][a-z]+/.exec(x.key);
		if(section) {
			let section_id=section[0].toLowerCase();
			this.save_string("[section_id]",section_id);
		} else {
			debugger;
		}
	}
	/** @private @arg {{key:RidFormat<string>;value:`0x${string}`}} param */
	parse_rid_param(param) {
		this.decode_rid_param_key(param);
		if(param.key in this.rid) {
			/** @private @type {RidFormat<string>} */
			let rid_key=param.key;
			this.rid[rid_key]=param.value;
			return;
		}
		if(!this._2_str_ends_with(param.key,"_rid")) {
			console.log("new csi param",param);
			debugger;
			return;
		}
		this.rid[param.key]=param.value;
	}
	/** @private @type {{[x: RidFormat<string>]: `0x${string}`|undefined;}} */
	rid={};
	/** @public @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		super(x);
		for(let x of this.rid_keys) {
			this.rid[x]=void 0;
		}
	}
	/** @private @arg {BrowseEndpointPages} value */
	verify_param_yt_fn(value) {
		switch(value) {
			case "history":
			case "library":
			case "subscriptions":
			case "what_to_watch":
				return true;
			default: console.log("[verify_param_bad]",value); debugger; return false;
		};
	}
	/** @public @arg {RC$CsiServiceParamsType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "c": {
					this.save_string(`[CsiService.${param.key}]`,param.value);
					this.data[param.key]=param.value;
				} continue;
				case "cver": this.data[param.key]=param.value; continue;
				case "yt_li": this.data[param.key]=param.value; continue;
				case "yt_ad": this.data[param.key]=param.value; continue;
				case "yt_fn": if(!this.verify_param_yt_fn(param.value)) debugger; this.data[param.key]=param.value; continue;
			}
			this.parse_rid_param(param);
		}
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class ECatcherService extends BaseService {
	data={
		/** @private @type {{name:RC$ECatcherClientName['value'];fexp:number[];version:RC$SomeVer<RC$CsiVarTypes["cver"]>}|null} */
		client: null,
		expected_client_values: {
			/** @private @type {number[]} */
			fexp: [
				[1714247],
				[9405964],
				[23804281],
				[23882502],
				[23918597,23934970,23946420,23966208,23983296,23986033,23998056],
				[24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738],
				[24108447,24120820,24124511,24128088,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24181174,24187043,24187377,24197450],
				//#region @242_
				[24200839,24211178,24217535,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24290971,24291857,24292955,24390675,24396645],
				[24288664],
				//#endregion
				//#region @244_
				[24401504,24402891,24404640,24406313,24406621,24407190,24408888,24414718,24415864,24415866,24416290,24419549,24422508,24424806,24424807,24426636,24429095,24432597,24433679,24434209,24436009,24437575,24438162,24438848,24439361,24439483,24440901,24440903,24441244,24442137,24443373,24447336,24448074,24448246],
				[24450199,24450571,24451033,24452012,24453129,24453874,24453942,24454357],
				//#endregion
				[24590921,24591046,24591048],
				[24612269,24613467,24613789,24614043,24615363,24615479,24615664,24615733],
				[39321826,39321827,39322504,39322574,39322870,39322873,39322953,39322980,39322983,39323013,39323016,39323020,39323023,39323117,39323120],
				[45686551],
				[24453162,24453860],
				[24454363],
			].flat(),
		},
	};
	/** @private @type {number[]} */
	seen_new_expected=[];
	/** @public @arg {number[]} x */
	iterate_fexp(x) {
		let expected=this.data.expected_client_values.fexp;
		/** @private @type {number[]} */
		let new_expected=[];
		x.forEach(e => {
			if(expected.includes(e)) return;
			if(this.seen_new_expected.includes(e)) return;
			this.seen_new_expected.push(e);
			new_expected.push(e);
		});
		if(new_expected.length>0) {
			if(new_expected.length>1) {
				console.log("[new_fexp_expected]",new_expected);
			} else {
				console.log("[new_fexp_expected][%o]",new_expected[0]);
			}
		}
		this.data.expected_client_values.fexp;
	}
	/** @public @arg {RC$ECatcherServiceParams["params"]} params */
	on_params(params) {
		/** @private @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params) {
			switch(param.key) {
				case "client.version": new_client.version=param.value; break;
				case "client.name": new_client.name=param.value; break;
				case "client.fexp": new_client.fexp=param.value.split(",").map(e => parseInt(e,10)); break;
				default: console.log("[new_param_part]",param); debugger;
			}
		}
		let prev_client=this.data.client;
		if(!prev_client) return this.update_client(new_client);
		this.data.client={...this.data.client,...new_client};
		let client=this.data.client;
		this.iterate_fexp(client.fexp);
		if(prev_client.name!==this.data.client.name) {
			console.log({name: prev_client.name},{name: this.data.client.name});
		}
	}
	/** @private @arg {NonNullable<this["data"]["client"]>} client */
	update_client(client) {
		this.data.client=client;
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class GFeedbackService extends BaseService {
	data={
		/** @private @type {number[]|null} */
		e: null,
		/** @private @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
		/** @private @type {GFeedbackServiceRouteParam["value"]|null} */
		route: null,
	};
	get handle_types() {
		return this.x.get("handle_types");
	}
	/** @type {string[]} */
	seen_e_param=[];
	has_new_e_param=false;
	/** @private @arg {Extract<RC$ToServiceParams<GFeedbackVarMap>[number],{key:"e"}>} param */
	parse_e_param(param) {
		if(this.seen_e_param.includes(param.value)) return;
		this.seen_e_param.push(param.value);
		let inner=param.value.split(",").map(e => parseInt(e,10));
		this.data.e=inner;
		this.has_new_e_param=true;
	}
	/** @public @arg {ServiceContextStore} data_target @arg {NonNullable<ServiceContextStore["context"]>} x */
	on_context_param(data_target,x) {
		data_target.context=x;
		switch(x) {
			case "channel_creator": return;
			case "yt_web_remix_unlimited": return;
			case "yt_web_search": return;
			case "yt_web_unknown_form_factor_kevlar_w2w": return;
			case "yt_web_unlimited": return;
			default:
		}
		switch(x) {
			case "": break;
			default: debugger; break;
		}
	}
	/** @public @arg {GFeedbackServiceParamsType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.parser.parse_browse_id(param.value); break;
				case "context": this.on_context_param(this.data,param.value); break;
				case "e": this.parse_e_param(param); break;
				case "has_alc_entitlement": break;
				case "has_unlimited_entitlement": break;
				case "ipcc": break;
				case "is_alc_surface": break;
				case "is_casual": break;
				case "is_monetization_enabled": break;
				case "is_owner": break;
				case "is_viewed_live": break;
				case "has_premium_lite_entitlement": break;
				case "logged_in": {
					if(param.value=="0") {general_service_state.logged_in=false; break;}
					if(param.value=="1") {general_service_state.logged_in=true; break;}
					debugger;
				} break;
				case "num_shelves": break;
				case "premium_membership": if(param.value!=="non_member") debugger; general_service_state.premium_membership=param.value; break;
				case "route": {
					this.parse_route_param(param);
				} break;
				default: console.log("[param_key]",param); debugger;
			}
			this.maybe_new_e();
		}
	}
	/** @private @arg {GFeedbackServiceRouteParam} x */
	parse_route_param(x) {
		let h=this.parser;
		this.data.route=x.value;
		let route_parts=split_string_once(x.value,".");
		switch(route_parts[0]) {
			case "channel": {
				if(route_parts[1]==="") return;
				h.parse_channel_section(route_parts);
			} break;
			default: debugger;
		}
	}
	maybe_new_e() {
		if(!this.data.e) return;
		if(!this.has_new_e_param) return;
		this.x.get("e_catcher_service").iterate_fexp(this.data.e);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class GuidedHelpService extends BaseService {
	data={
		/** @private @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @public @arg {RC$GuidedHelpServiceParams["params"]} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "logged_in": {
					if(param.value=="0") {general_service_state.logged_in=false; break;}
					if(param.value=="1") {general_service_state.logged_in=true; break;}
					debugger;
				} break;
				case "context": this.x.get("g_feedback_service").on_context_param(this.data,param.value); break;
				default: console.log("[new_param_key]",param); debugger;
			}
		}
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class TrackingServices extends BaseService {
	/** @private @arg {RC$CsiServiceParams} service */
	on_csi_service(service) {
		this.x.get("csi_service").on_params(service.params);
	}
	/** @private @arg {RC$ECatcherServiceParams} service */
	on_e_catcher_service(service) {
		this.x.get("e_catcher_service").on_params(service.params);
	}
	/** @private @arg {RC$GFeedbackServiceParams} service */
	on_g_feedback_service(service) {
		this.x.get("g_feedback_service").on_params(service.params);
	}
	/** @private @arg {RC$GuidedHelpServiceParams} service */
	on_guided_help_service(service) {
		this.x.get("guided_help_service").on_params(service.params);
	}
	get handle_types() {
		return this.x.get("handle_types");
	}
	/** @private @arg {RC$GoogleHelpServiceParams} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.parser.parse_browse_id(param.value); break;
				default: console.log("[new_param_key]",param); debugger;
			}
		}
	}
	/** @public @arg {RC$AllServiceTrackingParams} service_arg */
	set_service_params(service_arg) {
		switch(service_arg.service) {
			case "CSI": this.on_csi_service(service_arg); break;
			case "ECATCHER": this.on_e_catcher_service(service_arg); break;
			case "GFEEDBACK": this.on_g_feedback_service(service_arg); break;
			case "GUIDED_HELP": this.on_guided_help_service(service_arg); break;
			case "GOOGLE_HELP": this.on_google_help_service(service_arg); break;
			default: debugger;
		}
	}
}
class Services {
	/** @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		this.csi_service=new CsiService(x);
		this.e_catcher_service=new ECatcherService(x);
		this.g_feedback_service=new GFeedbackService(x);
		this.guided_help_service=new GuidedHelpService(x);
		this.service_tracking=new TrackingServices(x);
		this.parser_service=new ParserService(x);
		this.yt_handlers=new YtHandlers(x);
		this.handle_types=new HandleTypes(x);
		this.codegen=new CodegenService(x);
		this.indexed_db=new IndexedDbAccessor(x,"yt_plugin",2);
		this.yt_plugin=new YtPlugin(x);
		this.modify_env=new ModifyEnv(x);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class ModifyEnv extends BaseService {
	/** @type {[(obj: Blob|MediaSource) => string,typeof URL,Blob|MediaSource][]} */
	leftover_args=[];
	modify_global_env() {
		let yt_handlers=this.x.get("yt_handlers");
		/** @private @arg {string|URL|Request} request @arg {Response} response @arg {G_Response$} response_obj */
		function fetch_filter_text_then_data_url(request,response,response_obj) {
			try {
				yt_handlers.on_handle_api(request,response,response_obj);
			} catch(e) {
				console.log("plugin error");
				console.log(e);
			}
		}
		/** @private @arg {FetchInjectInputArgs} input @arg {{response: Response}} state @arg {((arg0: any) => any)|undefined|null} onfulfilled @arg {((arg0: any) => void)|undefined|null} on_rejected @arg {string} response_text */
		function handle_json_parse({request,options},state,onfulfilled,on_rejected,response_text) {
			if(is_yt_debug_enabled) console.log("handle_json_parse",request,options);
			let original_json_parse=JSON.parse;
			if(is_yt_debug_enabled) console.log("JSON.parse = new Proxy()");
			JSON.parse=new Proxy(original_json_parse,{
				apply: function(...proxy_args) {
					if(is_yt_debug_enabled) console.log("JSON.parse()");
					let obj;
					try {
						obj=Reflect.apply(...proxy_args);
					} catch(e) {
						console.log("target error",e);
						throw e;
					} finally {
						JSON.parse=original_json_parse;
					}
					if(is_yt_debug_enabled) console.log("request.url");
					fetch_filter_text_then_data_url(request,state.response,obj);
					return obj;
				}
			});
			let ret;
			try {
				if(onfulfilled) {
					ret=onfulfilled(response_text);
				} else {
					ret=response_text;
				}
			} catch(err) {
				if(on_rejected) return on_rejected(err);
				throw err;
			} finally {
			}
			return ret;
		}
		/** @private @arg {FetchInjectInputArgs} input @arg {{response: Response}} state @arg {((value: any) => any|PromiseLike<any>)|undefined|null} onfulfilled @arg {((reason: any) => any|PromiseLike<any>)|undefined|null} onrejected */
		function bind_promise_handler(input,state,onfulfilled,onrejected) {
			if(is_yt_debug_enabled) console.log("handle_json_parse.bind()");
			let ret=handle_json_parse.bind(null,input,state,onfulfilled,onrejected);
			return ret;
		}
		/** @private @arg {{input: FetchInjectInputArgs}} input_args @arg {{response: Response}} state @arg {{result:Promise<any>}} result @return {Promise<any>} */
		function handle_fetch_response_2({input},state,result) {
			return {
				/** @private @type {<T, TResult2 = never>(onfulfilled?: ((value: T) => T|PromiseLike<T>)|undefined|null, onrejected?: ((reason: any) => TResult2|PromiseLike<TResult2>)|undefined|null)=>Promise<T|TResult2>} */
				then(onfulfilled,onrejected) {
					return result.result.then(bind_promise_handler(input,state,onfulfilled,onrejected));
				},
				/** @private @type {<TResult = never>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined) => Promise<any>} */
				catch(onrejected) {
					return result.result.catch(onrejected);
				},
				finally(onfinally) {
					return result.result.finally(onfinally);
				},
				[Symbol.toStringTag]: "Promise",
			};
		}
		/** @private @arg {string|URL|Request} request @arg {{}|undefined} options @arg {Response} response @returns {Response} */
		function fetch_promise_handler(request,options,response) {
			class R_Fake {
				text() {
					if(is_yt_debug_enabled) console.log("response.text()");
					return handle_fetch_response_2({input: {request,options}},{response},{result: response.text()});
				}
				get redirected() {
					return response.redirected;
				}
				get ok() {
					return response.ok;
				}
				get status() {
					return response.status;
				}
			}
			let fake_res=new R_Fake;
			/** @private @type {any} */
			let any_x=fake_res;
			/** @private @type {Response} */
			let fake_res_t=any_x;
			return new Proxy(fake_res_t,{
				/** @private @arg {keyof Response} key */
				get(_obj,key,_proxy) {
					/** @private @type {string} */
					let ks=as(key);
					if(ks==="then") {
						return void 0;
					}
					switch(key) {
						case "text": case "redirected": case "ok": case "status": return fake_res[key];
						case "body": return response.body;
						case "headers": return response.headers;
						default: console.log("[new_response_key] [%s]",key); debugger;
					}
					return Reflect.get(response,key);
				}
			});
		}
		/** @private @type {typeof fetch|null} */
		let original_fetch=null;
		/** @private @arg {string|URL|Request} user_request @arg {RequestInit} [request_init] @returns {Promise<Response>} */
		function fetch_inject(user_request,request_init) {
			if(!original_fetch) throw new Error("No original fetch");
			x: if(request_init) {
				if(request_init.method==="HEAD"&&request_init.signal instanceof AbortSignal) break x;
				console.log("[fetch_request_init_data]",user_request,request_init);
			}
			if(typeof user_request==="string"&&user_request.startsWith("https://www.gstatic.com")) {
				return original_fetch(user_request,request_init);
			}
			let ret=original_fetch(user_request,request_init);
			let ret_1=ret.then(fetch_promise_handler.bind(null,user_request,request_init),fetch_rejection_handler);
			return ret_1;
		}
		let t=this;
		URL.createObjectURL=new Proxy(URL.createObjectURL,{
			/** @private @arg {typeof URL["createObjectURL"]} target @arg {typeof URL} thisArg @arg {[Blob|MediaSource]} args */
			apply(target,thisArg,args) {
				let [url_source,...rest]=args;
				if(rest.length>0) {
					t.leftover_args.push([target,thisArg,url_source,...rest]);
				}
				blob_create_args_arr.push(url_source);
				let ret=Reflect.apply(target,thisArg,args);
				created_blobs.set(ret,url_source);
				active_blob_set.add(ret);
				return ret;
			}
		});
		URL.revokeObjectURL=new Proxy(URL.revokeObjectURL,{
			/** @private @arg {typeof URL["revokeObjectURL"]} target @arg {typeof URL} thisArg @arg {[string]} args */
			apply(target,thisArg,args) {
				let val=args[0];
				active_blob_set.delete(val);
				return Reflect.apply(target,thisArg,args);
			}
		});
		original_fetch=window.fetch;
		window.fetch=fetch_inject;
		fetch_inject.__proxy_target__=original_fetch;
		let navigator_sendBeacon=navigator.sendBeacon;
		navigator.sendBeacon=function(...args) {
			if(typeof args[0]==="string"&&args[0].indexOf("/api/stats/qoe")>-1) {
				return true;
			}
			console.log("send_beacon",args[0]);
			return navigator_sendBeacon.call(this,...args);
		};
	}
}
//#endregion Service
//#region YtPlugin
/** @extends {BaseService<Services,ServiceOptions>} */
class YtPlugin extends BaseService {
	/** @private @type {[string,{name: string;}][]} */
	saved_function_objects=[];
	/** @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		super(x);
		inject_api.modules??=new Map;
		inject_api.modules.set("yt",this);
	}
	/** @public @template {{name:string}} T @arg {T} function_obj */
	add_function(function_obj) {
		if(!this.saved_function_objects) return;
		this.saved_function_objects.push([function_obj.name,function_obj]);
	}
}
//#endregion
//#region HelperServices
class DatabaseArguments {
	/** @public @arg {string} name @arg {number} version */
	constructor(name,version) {
		this.name=name;
		this.version=version;
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class IndexedDbAccessor extends BaseService {
	/** @public @arg {ResolverT<Services, ServiceOptions>} x @arg {string} db_name */
	constructor(x,db_name,version=1) {
		super(x);
		this.db_args=new DatabaseArguments(db_name,version);
	}
	database_opening=false;
	database_open=false;
	/** @type {Map<string,number>} */
	index=new Map;
	/** @private @type {{v: string}[]} */
	arr=[];
	/** @private @type {{v: string}[]} */
	committed_data=[];
	/** @public @template {{v: string}} T @arg {T} obj */
	put(obj) {
		if(!obj) {debugger; return;}
		if(!this.database_open) this.requestOpen();
		if(this.arr.length!==this.arr.reduce((r) => r+1,0)) {
			debugger;
		}
		this.push_waiting_obj(obj);
		if(this.arr.length!==this.arr.reduce((r) => r+1,0)) {
			debugger;
		}
	}
	/** @public @template {{v: string}} T @arg {T} obj */
	push_waiting_obj(obj) {
		if(!obj) {debugger; return;}
		let idx=this.index.get(obj.v);
		if(idx!=null) {
			this.arr[idx]=obj;
			return;
		}
		idx=this.arr.push(obj)-1;
		this.index.set(obj.v,idx);
	}
	requestOpen() {
		if(this.database_opening||this.database_open) return;
		this.database_opening=true;
		this.open();
	}
	open() {
		const {name,version}=this.db_args;
		const request=indexedDB.open(name,version);
		this.onOpenRequest(request);
	}
	/** @private @arg {IDBOpenDBRequest} request */
	onOpenRequest(request) {
		request.onsuccess=event => this.onSuccess(request,event);
		request.onerror=event => this.onError(event);
		request.onupgradeneeded=event => this.onUpgradeNeeded(request,event);
	}
	log_all_events=false;
	close_db_on_transaction_complete=false;
	/** @private @arg {IDBOpenDBRequest} request @arg {Event} event */
	onSuccess(request,event) {
		if(this.log_all_events) console.log("OpenDBRequest success",event);
		this.onDatabaseReady(request.result);
	}
	/** @private @arg {IDBDatabase} db */
	onDatabaseReady(db) {
		this.database_opening=false;
		this.database_open=true;
		this.onDatabaseResult(db);
		this.start_transaction(db);
	}
	/** @private @arg {IDBDatabase} db */
	onDatabaseResult(db) {
		db.onerror=event => console.log("IDBDatabase: error",event);
		db.onabort=event => console.log("IDBDatabase: abort",event);
		db.onclose=event => console.log("IDBDatabase: close",event);
		db.onversionchange=event => this.onDatabaseVersionChange(db,event);
	}
	/** @private @arg {IDBDatabase} db @arg {IDBVersionChangeEvent} event */
	onDatabaseVersionChange(db,event) {
		this.database_open=false;
		console.log("IDBDatabase: version_change",event);
		db.close();
	}
	/** @private @arg {IDBDatabase} db */
	start_transaction(db) {
		const transaction=db.transaction("video_id","readwrite");
		transaction.onerror=event => console.log("IDBTransaction: error",event);
		transaction.onabort=event => console.log("IDBTransaction: abort",event);
		transaction.oncomplete=event => this.onTransactionComplete(db,event);
		if(this.arr.length>0) this.consume_data(transaction);
	}
	/** @private @arg {IDBDatabase} db @arg {Event} event */
	onTransactionComplete(db,event) {
		if(this.log_all_events) console.log("IDBTransaction: complete",event);
		for(let i=this.arr.length-1;i>=0;i--) {
			if(!this.committed_data.includes(this.arr[i])) continue;
			this.arr.splice(i,1);
		}
		if(this.arr.length>0) {
			console.log("transaction done, but not all data was committed");
			console.log("[new_data_after_tx_complete]",this.arr);
		} else {
			this.committed_data.length=0;
			this.index.clear();
		}
		this.database_open=false;
		db.close();
	}
	/** @private @arg {IDBTransaction} transaction */
	consume_data(transaction) {
		const store=transaction.objectStore("video_id");
		this.consume_data_with_store(store);
	}
	/** @private @arg {IDBObjectStore} store */
	consume_data_with_store(store) {
		const cursor_req=store.openCursor();
		/** @private @type {{v: string}[]} */
		let database_data=[];
		cursor_req.onsuccess=() => {
			const cursor=cursor_req.result;
			if(cursor) {
				database_data.push(cursor.value);
				cursor.continue();
			} else {
				/** @private @type {Map<string,{v:string}>} */
				let database_map=new Map;
				/** @private @type {Map<string,{v:string}>} */
				let new_data_map=new Map;
				database_data.forEach(e => database_map.set(e.v,e));
				for(let data of this.arr) {
					if(!data) {debugger; continue;}
					if(database_map.has(data.v)) {
						this.committed_data.push(data);
						let ok=this.get_keys_of(data);
						let in_db=database_map.get(data.v);
						if(!in_db) continue;
						let ok_db=this.get_keys_of(in_db);
						if(this.eq_keys(ok,ok_db)) continue;
						console.log("[database_needs_obj_merge]");
						console.log("[obj_merge_new]",data);
						console.log("[obj_merge_cur]",in_db);
						debugger;
					} else if(new_data_map.has(data.v)) {
						this.committed_data.push(data);
						continue;
					} else {
						new_data_map.set(data.v,data);
					}
				}
				[...new_data_map.values()].forEach(e => {
					this.add_data_to_store(store,e);
				});
			}
		};
	}
	/** @private @arg {IDBObjectStore} store @arg {{v:string}} data */
	add_data_to_store(store,data) {
		const request=store.add(data);
		request.onerror=event => console.log("IDBRequest: error",event);
		request.onsuccess=event => {
			if(this.log_all_events) console.log("IDBRequest: success",event);
			this.committed_data.push(data);
		};
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
	onUpgradeNeeded(request,event) {
		if(event.oldVersion===0) {
			this.createLatestDatabaseVersion(request,[]);
			return;
		}
		if(this.log_all_events) console.log("IDBOpenDBRequest: oldVersion",event.oldVersion);
		const db=request.result;
		if(event.oldVersion<1) {
			db.createObjectStore("video_id",{autoIncrement: true});
		}
		if(event.oldVersion<2) {
			if(!request.transaction) throw new Error("No transaction");
			const video_id_store=request.transaction.objectStore("video_id");
			/** @private @type {IDBRequest<{v:string}[]>} */
			let get_all_request=video_id_store.getAll();
			get_all_request.onsuccess=() => {
				db.deleteObjectStore("video_id");
				this.createLatestDatabaseVersion(request,get_all_request.result);
			};
		}
	}
	/** @private @arg {IDBOpenDBRequest} request @arg {{v:string}[]} data_source */
	createLatestDatabaseVersion(request,data_source) {
		const db=request.result;
		const store=db.createObjectStore("video_id",{keyPath: "v"});
		for(let x of data_source) store.put(x);
	}
	/** @private @arg {Event} event */
	onError(event) {
		console.log("idb error",event);
	}
}
class JsonReplacerState {
	/** @public @arg {string} gen_name @arg {string[]} keys */
	constructor(gen_name,keys) {
		this.object_count=0;
		this.gen_name=gen_name;
		this.key_keep_arr=keys;
		this.k1="";
		/** @type {{}[]} */
		this.object_store=[];
		/** @type {Map<{},[number,string]>} */
		this.parent_map=new Map;
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class CodegenService extends BaseService {
	/** @no_mod @arg {{}} x2 */
	#is_Thumbnail(x2) {
		return "thumbnails" in x2&&x2.thumbnails instanceof Array&&"url" in x2.thumbnails[0]&&typeof x2.thumbnails[0].url==="string";
	}
	/** @private @arg {{}} x2 @arg {string} k */
	generate_code_for_entry(x2,k) {
		let kk=this.get_name_from_keys(x2);
		if(kk&&kk.endsWith("Endpoint")) {
			let u=this.uppercase_first(kk);
			return `this.E$${u}(${k});`;
		}
		return null;
	}
	/** @no_mod @arg {string[]} req_names @arg {{}} x @arg {string[]} keys @arg {string|number} t_name */
	#generate_renderer_body(req_names,x,keys,t_name) {
		/** @private @type {{[x:string]:{}}} */
		let x1=x;
		/** @private @type {string[]} */
		let ret_arr=[];
		ret_arr.push(`const cf="${t_name}";`);
		ret_arr.push("this.save_keys(`[${cf}]`,x)");
		ret_arr.push(`const {${keys.join()},...y}=x; this.g(y);`);
		for(let k of keys) {
			if(k=="trackingParams") {ret_arr.push(`this.${k}(cf,${k});`); continue;}
			if(k=="clickTrackingParams") {ret_arr.push(`this.${k}(cf,${k});`); continue;}
			if(k=="responseContext") {ret_arr.push(`this.RC$ResponseContext(${k});`); continue;}
			let x2=x1[k];
			if(typeof x2==="string") {this.generate_code_for_string(ret_arr,k,x2); continue;}
			if(typeof x2=="number") {ret_arr.push(`this.primitive_of(${k},"number");`);}
			if(typeof x2=="boolean") {ret_arr.push(`if(${k}!==${x2}) debugger;`); continue;}
			if(typeof x2!=="object") {debugger; continue;}
			let new_code=this.generate_code_for_entry(x2,k);
			if(new_code) {ret_arr.push(new_code); continue;}
			if(x2===null) {ret_arr.push(`if(${k}!==null) debugger;`); continue;}
			if("simpleText" in x2) {ret_arr.push(`this.D__SimpleText(${k});`); continue;};
			/** @type {R_TextWithRuns} */
			if("runs" in x2&&x2.runs instanceof Array) {ret_arr.push(`this.D__TextWithRuns(${k});`); continue;};
			if(x2 instanceof Array) {this.#generate_body_array_item(k,x2,ret_arr); continue;}
			/** @type {D__Thumbnail} */
			if(this.#is_Thumbnail(x2)) {ret_arr.push(`this.D__Thumbnail(${k});`); continue;}
			if("iconType" in x2) {ret_arr.push(`this.T$Icon(${k});`); continue;}
			/** @private @type {{}} */
			let o3=x2;
			let c=this.get_name_from_keys(o3);
			if(!c||typeof c==="number") {
				this.#generate_body_default_item(k,ret_arr,req_names,t_name);
				continue;
			}
			if(c.endsWith("Renderer")) {
				let ic=this.uppercase_first(split_string_once(c,"Renderer")[0]);
				ret_arr.push(`this.R_${ic}(${k});`);
				continue;
			}
			if(k.endsWith("Renderer")) {
				this.#generate_body_default_item(k,ret_arr,req_names,t_name);
				continue;
			}
			console.log("[gen_body_default_for] [%s]",k,x2);
			this.#generate_body_default_item(k,ret_arr,req_names,t_name);
		}
		let no_pad_arr=ret_arr.map(e => e.trim());
		return no_pad_arr.join("\nd2!");
	}
	/** @no_mod @arg {string} k @arg {string[]} out @arg {string[]} env_names @arg {string|number} def_name */
	#generate_body_default_item(k,out,env_names,def_name) {
		let tn=`${k[0].toUpperCase()}${k.slice(1)}`;
		let mn=tn;
		if(mn===def_name) mn=`D__${tn}`;
		env_names.push(mn);
		out.push(`this.${mn}(${k});`);
	}
	/** @no_mod @arg {string} k @arg {unknown[]} x @arg {string[]} out */
	#generate_body_array_item(k,x,out) {
		if(typeof x[0]!=="object") return;
		if(x[0]===null) return;
		let ret_arr=out;
		/** @private @type {{[x:string]:{};[x:number]:{};}} */
		let io=as(x[0]);
		let c=this.get_name_from_keys(io);
		if(c) {
			if(c.endsWith("Renderer")) {
				let ic=this.uppercase_first(split_string_once(c,"Renderer")[0]);
				ret_arr.push(`this.z(${k},this.R_${ic});`);
				return;
			}
			if(c.endsWith("Endpoint")) {
				let ic=this.uppercase_first(c);
				ret_arr.push(`this.z(${k},this.E$${ic});`);
				return;
			}
			let ic=this.uppercase_first(c);
			ret_arr.push(`this.z(${k},this.${ic});`);
		}
	}
	/** @no_mod @arg {string} x */
	#generate_padding(x) {
		return x.replaceAll(/(?:d\d!)*d(\d)!/g,(_v,g) => {
			return "\t".repeat(g);
		});
	}
	/** @no_mod @arg {unknown} x @arg {string|null} r_name */
	#generate_renderer(x,r_name=null) {
		if(typeof x!=='object') return null;
		if(x===null) return null;
		console.log("gen renderer for",x);
		/** @private @type {string[]} */
		let req_names=[];
		let k=this.get_name_from_keys(x);
		if(r_name) k=r_name;
		if(k===null) return null;
		let t_name=this.uppercase_first(k);
		let keys=Object.keys(x);
		let body=this.#generate_renderer_body(req_names,x,keys,t_name);
		let tmp_1=`
		d1!/** @private @arg {${t_name}} x */
		d1!${t_name}(x) {
			d2!${body}
		d1!}
		`;
		let ex_names=req_names.map(e => {
			let kk=keys.find(u => this.uppercase_first(u)===e);
			if(!kk) {debugger; return "";}
			/** @type {{}} */
			let ucx=x;
			/** @private @type {{[x:string]:unknown}} */
			let x1=ucx;
			let val_2=x1[kk];
			if(typeof val_2!=="object") return "";
			if(val_2===null) return "";
			let keys_2=Object.keys(val_2);
			/** @type {string[]} */
			let next_req=[];
			let body_2=this.#generate_renderer_body(next_req,x,keys_2,t_name);
			let tmp0=`
			d1!/** @private @arg {${e}} x */
			d1!${e}(x) {
				${body_2}
			d1!}
			`;
			console.log("more req",next_req);
			return tmp0;
		});
		tmp_1=ex_names.join("")+tmp_1;
		let tmp2=tmp_1.split("\n").map(e => e.trim()).filter(e => e).join("\n");
		let tmp3=this.#generate_padding(tmp2);
		return `\n${tmp3}`;
	}
	/** @private @arg {string} s @arg {RegExp} rx @arg {(s:string,v:string)=>string} fn */
	replace_until_same(s,rx,fn) {
		let i=0;
		let ps=s;
		do {
			let p=s;
			s=s.replaceAll(rx,fn);
			ps=p;
			if(i>12) break;
		} while(ps!==s);
		return s;
	}
	/** @type {string[]} */
	typedef_cache=[];
	/** @public @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] @returns {string|null|void} */
	codegen_new_typedef(x,gen_name,ret_val) {
		let new_typedef=this.#_codegen_new_typedef(x,gen_name);
		if(ret_val) return new_typedef;
		if(new_typedef) {
			if(!this.typedef_cache.includes(new_typedef)) {
				this.typedef_cache.push(new_typedef);
				console.log(new_typedef);
			}
		}
	}
	/** @private @arg {string} o @arg {string} k1 */
	json_filter_string(o,k1) {
		const max_str_len=40;
		if(k1==="apiUrl") return o;
		if(k1==="targetId") return o;
		if(k1==="panelIdentifier") return o;
		if(o.match(/^[A-Z][A-Z_]+[A-Z]$/)) {
			return o;
		}
		if(o.length>max_str_len) {
			console.log("[json_str_too_long]",o.length,o.slice(0,max_str_len+6));
			return "TYPE::string";
		}
		let u_ty_count=[...new Set(o.split("").sort())].join("").length;
		if(o.includes("%")) {
			if(u_ty_count>13) {
				return "TYPE::string";
			}
		}
		if(k1=="trackingParams") return "TYPE::string";
		if(k1=="clickTrackingParams") return "TYPE::string";
		if(k1=="playlistId") {
			if(o.startsWith("RDMM")) return `TYPE::\`RDMM$\{string}\``;
			if(o.startsWith("RD")) return "TYPE::`RD__{string}`";
			if(o.startsWith("PL")) return `TYPE::\`PL$\{string}\``;
			debugger;
			return "TYPE::string";
		}
		if(k1=="videoId") {console.log("[video_id_json]",o); return "TYPE::string";}
		console.log("[unique_chars_count]",k1,[...new Set(o.split("").sort())].join("").length);
		return o;
	}
	/** @private @arg {JsonReplacerState} state @arg {{}|null} x @arg {string} k1 */
	json_filter_object(state,x,k1) {
		const {gen_name,key_keep_arr}=state;
		if(x===null) return x;
		if(x instanceof Array) {
			if(key_keep_arr.includes(k1)) return [x[0]];
			return [x[0]];
		}
		if(!state.object_store.includes(x)) {
			state.object_store.push(x);
			let mi=state.object_store.indexOf(x);
			state.parent_map.set(x,[mi,k1]);
		}
		let mi=state.object_store.indexOf(x);
		let xi=Object.entries(x);
		for(let [k_in,val] of xi) {
			if(state.object_store.includes(val)) continue;
			state.object_store.push(val);
			state.parent_map.set(val,[mi,k_in]);
		}
		state.k1=k1;
		if(k1==="") return x;
		/** @type {RC$ResponseContext} */
		if(k1==="responseContext") return "TYPE::RC$ResponseContext";
		/** @type {A_FrameworkUpdates} */
		if(k1==="frameworkUpdates") return "TYPE::A_FrameworkUpdates";
		/** @type {A_LoggingDirectives} */
		if(k1==="loggingDirectives") return "TYPE::A_LoggingDirectives";
		if(k1==="subscriptionButton") return "TYPE::D__SubscriptionButton";
		let res_type=this.get_json_replacer_type(state,gen_name,x);
		if(res_type!==null) return res_type;
		if(key_keep_arr.includes(k1)) return x;
		state.object_count++;
		if(state.object_count<3) return x;
		return {};
	}
	/** @private @arg {JsonReplacerState} state @arg {string} k1 @arg {unknown} rep */
	json_replacer(state,k1,rep) {
		/** @type {unknown} */
		let o=rep;
		if(typeof o==="bigint") return o;
		else if(typeof o==="boolean") return o;
		else if(typeof o==="function") return o;
		else if(typeof o==="number") return o;
		else if(typeof o==="symbol") return o;
		else if(typeof o==="undefined") return o;
		else if(typeof o==="string") return this.json_filter_string(o,k1);
		else if(typeof o==="object") return this.json_filter_object(state,o,k1);
		throw new Error();
	}
	/** @no_mod @arg {{}} x @arg {string} gen_name */
	#_codegen_new_typedef(x,gen_name) {
		let k=this.get_name_from_keys(x);
		if(k===null) return null;
		/** @private @type {{[x: number|string]:{}}} */
		let xa=as(x);
		let o2=xa[k];
		let keys=Object.keys(x).concat(Object.keys(o2));
		if("response" in x&&typeof x.response==='object'&&x.response!==null) {
			keys=keys.concat(Object.keys(x.response));
		}
		/** @type {JsonReplacerState} */
		let state=new JsonReplacerState(gen_name,keys);
		let tc=JSON.stringify(x,this.json_replacer.bind(this,state),"\t");
		tc=tc.replaceAll(/\"(\w+)\":/g,(_a,g) => {
			return g+":";
		});
		tc=this.replace_until_same(tc,/\[\s+{([^\[\]]*)}\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).join("\n");
			return `{${vi}}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(/\[\s+([^\[\]]*)\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).filter(e => e).join("\n").trimEnd();
			return `${vi}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(":ARRAY_TAG","[]");
		tc=tc.replaceAll(/"TYPE::(.+)"/gm,(_a,x) => {
			return x.replaceAll("\\\"","\"");
		});
		tc=tc.replaceAll(",",";");
		tc=tc.replaceAll(/[^[{;]$/gm,a => `${a};`);
		let ret;
		if(typeof gen_name==="number") {
			ret=`\ntype ArrayType_${gen_name}=${tc}\n`;
		} else {
			ret=`\ntype ${gen_name}=${tc}\n`;
		}
		return ret;
	}
	/** @private @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} x */
	get_json_replacer_type(state,r,x) {
		let g=() => this.json_auto_replace(x);
		if(state.k1==="webCommandMetadata") return x;
		/** @type {R_TextWithRuns} */
		if(x.runs&&x.runs instanceof Array) return "TYPE::D__TextWithRuns";
		/** @type {D__Thumbnail} */
		if(x.thumbnails&&x.thumbnails instanceof Array) return "TYPE::D__Thumbnail";
		/** @type {R_SimpleText} */
		if(x.simpleText) return "TYPE::D__SimpleText";
		/** @type {T$Icon<"">} */
		if(x.iconType&&typeof x.iconType==="string") return `TYPE::T$Icon<"${x.iconType}">`;
		if(x.popupType) return this.decode_PopupTypeMap(x);
		if(x.signal) return this.decode_Signal(x);
		let keys=this.filter_keys(this.get_keys_of(x));
		if(keys.length===1) return this.get_json_replace_type_len_1(state,r,x,keys);
		if(state.key_keep_arr.includes(state.k1)) return x;
		console.log("[no_json_replace_type] %o [%s] [%s]",x,keys.join(","),g(),"\n",r);
		debugger;
		return null;
	}
	/** @param {{[U in string]:unknown}} x */
	json_auto_replace_1(x) {
		let o_keys=this.filter_keys(this.get_keys_of(x));
		if(o_keys.length===1) {
			let kk=this.get_name_from_keys(x);
			if(kk) return this.uppercase_first(kk);
		}
		if(o_keys.length>0) {
			return this.uppercase_first(o_keys[0]);
		}
		return "{}";
	}
	/** @param {{[U in string]:unknown}} x */
	json_auto_replace(x) {
		let type_val=this.json_auto_replace_1(x);
		if(type_val.endsWith("Endpoint")) {
			type_val=`E$${type_val}`;
		}
		if(type_val.endsWith("Renderer")) {
			type_val=`R_${type_val}`;
		}
		return `TYPE::${type_val}`;
	}
	/** @param {{[U in string]:unknown}} x */
	decode_PopupTypeMap(x) {
		switch(x.popupType) {
			default: debugger; break;
			case "DIALOG":
				let jy=Object.keys(x).filter(e => e!=="popupType").join(":any;");
				console.log("jy",jy);
				return `TYPE::Extract<PopupTypeMap["${x.popupType}"][number],{${jy}}>`;
		}
		return `TYPE::PopupTypeMap["${x.popupType}"]`;
	}
	/** @param {{[U in string]:unknown}} x */
	decode_Signal(x) {
		/** @type {Signal$ClientSignal} */
		let u=as(x);
		switch(u.signal) {
			case "CLIENT_SIGNAL": if(u.actions instanceof Array) return "TYPE::E$Signal_ClientSignal"; break;
		}
		debugger;
		return x;
	}
	/** @private @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} b @arg {string[]} keys */
	get_json_replace_type_len_1(state,r,b,keys) {
		let g=() => this.json_auto_replace(b);
		let hg=false
			||false
			||b.subscriptionNotificationToggleButtonRenderer
			||b.twoColumnWatchNextResults
			//#region action
			||b.changeEngagementPanelVisibilityAction
			||b.openPopupAction
			||b.addChatItemAction
			||b.appendContinuationItemsAction
			||b.changeEngagementPanelVisibilityAction
			||b.createAction
			||b.getMultiPageMenuAction
			||b.hideEngagementPanelScrimAction
			||b.openPopupAction
			||b.replayChatItemAction
			||b.sendFeedbackAction
			||b.showEngagementPanelScrimAction
			||b.signalAction
			||b.updateChannelSwitcherPageAction
			||b.updateDateTextAction
			||b.updateDescriptionAction
			||b.updateEngagementPanelAction
			||b.updateNotificationsUnseenCountAction
			||b.updateTitleAction
			||b.updateToggleButtonTextAction
			||b.updateViewershipAction
			//#endregion
			//#region command
			||b.commandExecutorCommand
			||b.showReloadUiCommand
			||b.addToPlaylistCommand
			||b.adsControlFlowOpportunityReceivedCommand
			||b.changeKeyedMarkersVisibilityCommand
			||b.commandExecutorCommand
			||b.continuationCommand
			||b.getInitialCommand
			||b.getSurveyCommand
			||b.loadMarkersCommand
			||b.loopCommand
			||b.musicLibraryStatusUpdateCommand
			||b.onCloseCommand
			||b.onCreateListCommand
			||b.onDisabledCommand
			||b.onEnabledCommand
			||b.relatedChipCommand
			||b.reloadContinuationItemsCommand
			||b.resetChannelUnreadCountCommand
			||b.scrollToEngagementPanelCommand
			||b.showLessCommand
			||b.showMoreCommand
			||b.showReloadUiCommand
			||b.updateToggleButtonStateCommand
			//#endregion
			//#region endpoint
			||b.addToPlaylistServiceEndpoint
			||b.authorEndpoint
			||b.browseEndpoint
			||b.channelNavigationEndpoint
			||b.contextMenuEndpoint
			||b.continuationEndpoint
			||b.createPlaylistServiceEndpoint
			||b.currentVideoEndpoint
			||b.getAccountSwitcherEndpoint
			||b.getDatasyncIdsEndpoint
			||b.getTranscriptEndpoint
			||b.likeEndpoint
			||b.navigationEndpoint
			||b.notificationOptOutEndpoint
			||b.onResponseReceivedEndpoint
			||b.onSubscribeEndpoint
			||b.onUnsubscribeEndpoint
			||b.playlistEditEndpoint
			||b.recordClickEndpoint
			||b.recordNotificationInteractionsEndpoint
			||b.reelWatchEndpoint
			||b.removeFromPlaylistServiceEndpoint
			||b.replacementEndpoint
			||b.searchEndpoint
			||b.serviceEndpoint
			||b.setSettingEndpoint
			||b.shareEntityServiceEndpoint
			||b.signalNavigationEndpoint
			||b.signalServiceEndpoint
			||b.updateUnseenCountEndpoint
			||b.uploadEndpoint
			||b.urlEndpoint
			||b.watchEndpoint
			||b.watchPlaylistEndpoint
			||b.ypcGetOffersEndpoint
			||b.signalServiceEndpoint
			//#endregion
			//#region renderer
			||b.accountItemSectionRenderer
			||b.accountSectionListRenderer
			||b.addToPlaylistCreateRenderer
			||b.addToPlaylistRenderer
			||b.adsEngagementPanelContentRenderer
			||b.adSlotRenderer
			||b.alertWithButtonRenderer
			||b.automixPreviewVideoRenderer
			||b.autoplaySwitchButtonRenderer
			||b.backstagePostThreadRenderer
			||b.browseFeedActionsRenderer
			||b.browserMediaSessionRenderer
			||b.buttonRenderer
			||b.c4TabbedHeaderRenderer
			||b.channelAboutFullMetadataRenderer
			||b.channelFeaturedContentRenderer
			||b.channelHeaderLinksRenderer
			||b.channelMetadataRenderer
			||b.channelRenderer
			||b.channelSwitcherPageRenderer
			||b.chipCloudChipRenderer
			||b.cinematicContainerRenderer
			||b.clipCreationRenderer
			||b.clipSectionRenderer
			||b.commentRenderer
			||b.commentsEntryPointHeaderRenderer
			||b.commentsHeaderRenderer
			||b.commentSimpleboxRenderer
			||b.commentThreadRenderer
			||b.compactLinkRenderer
			||b.compactPlaylistRenderer
			||b.compactPromotedVideoRenderer
			||b.compactRadioRenderer
			||b.compactVideoRenderer
			||b.confirmDialogRenderer
			||b.connectedAppRenderer
			||b.continuationCommand
			||b.continuationItemRenderer
			||b.createRenderer
			||b.decoratedPlayerBarRenderer
			||b.desktopTopbarRenderer
			||b.dropdownRenderer
			||b.emojiPickerRenderer
			||b.endScreenPlaylistRenderer
			||b.endScreenVideoRenderer
			||b.engagementPanelSectionListRenderer
			||b.engagementPanelTitleHeaderRenderer
			||b.expandableTabRenderer
			||b.expandableVideoDescriptionBodyRenderer
			||b.feedFilterChipBarRenderer
			||b.feedNudgeRenderer
			||b.feedTabbedHeaderRenderer
			||b.fusionSearchboxRenderer
			||b.getSurveyCommand
			||b.ghostGridRenderer
			||b.gridRenderer
			||b.guideCollapsibleEntryRenderer
			||b.guideCollapsibleSectionEntryRenderer
			||b.guideEntryRenderer
			||b.guideSectionRenderer
			||b.guideSubscriptionsSectionRenderer
			||b.hintRenderer
			||b.horizontalCardListRenderer
			||b.hotkeyDialogRenderer
			||b.hotkeyDialogSectionRenderer
			||b.inlineSurveyRenderer
			||b.is_ItemSectionRenderer
			||b.itemSectionHeaderRenderer
			||b.itemSectionRenderer
			||b.likeButtonRenderer
			||b.liveChatAuthorBadgeRenderer
			||b.liveChatHeaderRenderer
			||b.liveChatItemListRenderer
			||b.liveChatMessageInputRenderer
			||b.liveChatParticipantsListRenderer
			||b.liveChatPlaceholderItemRenderer
			||b.liveChatRenderer
			||b.liveChatTextMessageRenderer
			||b.liveChatTickerRenderer
			||b.liveChatViewerEngagementMessageRenderer
			||b.macroMarkersListRenderer
			||b.menuRenderer
			||b.menuServiceItemRenderer
			||b.merchandiseItemRenderer
			||b.merchandiseShelfRenderer
			||b.messageRenderer
			||b.metadataBadgeRenderer
			||b.metadataRowContainerRenderer
			||b.microformatDataRenderer
			||b.multiMarkersPlayerBarRenderer
			||b.multiPageMenuNotificationSectionRenderer
			||b.multiPageMenuRenderer
			||b.multiPageMenuSectionRenderer
			||b.musicCarouselShelfRenderer
			||b.musicQueueRenderer
			||b.musicResponsiveListItemRenderer
			||b.musicShelfRenderer
			||b.musicThumbnailRenderer
			||b.notificationActionRenderer
			||b.notificationRenderer
			||b.notificationTopbarButtonRenderer
			||b.pageIntroductionRenderer
			||b.pdgBuyFlowHeaderRenderer
			||b.pdgBuyFlowRenderer
			||b.pdgColorSliderRenderer
			||b.pdgCommentOptionRenderer
			||b.pdgCommentPreviewRenderer
			||b.pivotButtonRenderer
			||b.playerAnnotationsExpandedRenderer
			||b.playerOverlayAutoplayRenderer
			||b.playerOverlayRenderer
			||b.playerOverlayVideoDetailsRenderer
			||b.playlistAddToOptionRenderer
			||b.playlistHeaderRenderer
			||b.playlistMetadataRenderer
			||b.playlistPanelRenderer
			||b.playlistPanelVideoRenderer
			||b.playlistRenderer
			||b.playlistSidebarPrimaryInfoRenderer
			||b.playlistSidebarRenderer
			||b.playlistSidebarSecondaryInfoRenderer
			||b.playlistVideoListRenderer
			||b.privacyDropdownItemRenderer
			||b.productListRenderer
			||b.profileColumnRenderer
			||b.profileColumnStatsEntryRenderer
			||b.profileColumnStatsRenderer
			||b.profileColumnUserInfoRenderer
			||b.promotedSparklesWebRenderer
			||b.radioRenderer
			||b.recognitionShelfRenderer
			||b.reelPlayerHeaderRenderer
			||b.reelPlayerHeaderSupportedRenderer
			||b.reelPlayerOverlayRenderer
			||b.reelShelfRenderer
			||b.relatedChipCloudRenderer
			||b.reportFormModalRenderer
			||b.richGridRenderer
			||b.richItemRenderer
			||b.richSectionRenderer
			||b.richShelfRenderer
			||b.searchPyvRenderer
			||b.sectionListRenderer
			||b.settingsOptionsRenderer
			||b.settingsSidebarRenderer
			||b.shelfRenderer
			||b.simpleMenuHeaderRenderer
			||b.singleColumnMusicWatchNextResultsRenderer
			||b.sortFilterSubMenuRenderer
			||b.sourcePivotHeaderRenderer
			||b.structuredDescriptionContentRenderer
			||b.subscribeButtonRenderer
			||b.superVodBuyFlowContentRenderer
			||b.tabbedRenderer
			||b.tabbedSearchResultsRenderer
			||b.tabRenderer
			||b.textInputFormFieldRenderer
			||b.thumbnailOverlayBottomPanelRenderer
			||b.thumbnailOverlayHoverTextRenderer
			||b.thumbnailOverlayNowPlayingRenderer
			||b.thumbnailOverlayResumePlaybackRenderer
			||b.thumbnailOverlayTimeStatusRenderer
			||b.thumbnailOverlayToggleButtonRenderer
			||b.topbarLogoRenderer
			||b.topbarMenuButtonRenderer
			||b.transcriptRenderer
			||b.twoColumnBrowseResultsRenderer
			||b.twoColumnSearchResultsRenderer
			||b.unifiedSharePanelRenderer
			||b.videoDescriptionHeaderRenderer
			||b.videoDescriptionMusicSectionRenderer
			||b.videoMastheadAdV3Renderer
			||b.videoOwnerRenderer
			||b.videoPrimaryInfoRenderer
			||b.videoRenderer
			||b.videoSecondaryInfoRenderer
			||b.videoViewCountRenderer
			||b.voiceSearchDialogRenderer
			||b.watchNextEndScreenRenderer
			||b.watchNextTabbedResultsRenderer
			//#endregion
			||b.engagementPanelPopupPresentationConfig
			||b.userFeedbackEndpoint
			;
		if(hg) return g();
		if(b.webCommandMetadata) {
			state.key_keep_arr.push(...Object.keys(b.webCommandMetadata));
			return b;
		}
		/** @type {D__Accessibility} */
		if(b.accessibilityData) return "TYPE::A_Accessibility";
		console.log("[no_json_replace_type_1] %o [%s] [%s]",b,keys.join(","),g(),"\n",r);
		return null;
	}
	/** @public @arg {string} x1 */
	generate_depth(x1) {
		let rxr=/{(?<x>(\s|.)+)}/g.exec(x1);
		if(!rxr?.groups) return null;
		let x=rxr.groups.x.trim().split(/([;{}])/).filter(e => e);
		/** @private @arg {string[]} x */
		function make_depth_arr(x) {
			/** @private @type {[number,string][]} */
			let o=[];
			let depth=0;
			for(let v of x) {
				if(v==="{}"[0]) depth++;
				o.push([depth,v]);
				if(v==="{}"[1]) depth--;
			};
			return o;
		};
		let depth_state={
			ld: 0,
		};
		let da=make_depth_arr(x);
		/** @private @type {string[]} */
		let r1=da.reduce((a,c) => {
			if(c[0]===0) {
				a.push(c[1]);
				return a;
			};
			if(depth_state.ld<1) a.push(c[1]);
			else a.push(a.pop()+c[1]);
			depth_state.ld=c[0];
			return a;
		},[""]);
		let r2=r1.reduce((a,c) => {
			if(c===";") {
				a.push(a.pop()+";","");
				return a;
			};
			a.push(a.pop()+c);
			return a;
		},[""]);
		let trimmed_r2=r2.map(e => e.trim());
		let no_empty_r2=trimmed_r2.filter(e => e);
		let typedef_members=no_empty_r2.map(e => {
			let ss=split_string_once(e,":");
			if(ss.length==1) throw new Error();
			return ss;
		});
		return new Map(typedef_members);
	}
	/** @public @arg {{}} x @arg {string} r */
	use_generated_members(x,r) {
		let td=new Generate(this);
		td.generate_typedef_and_depth(x,r);
		return td;
	}
	/** @public @arg {unknown} x @arg {string|null} r @arg {boolean} [w] */
	generate_renderer(x,r,w) {
		let gen_obj=this.#generate_renderer(x,r);
		if(w) return gen_obj;
		console.log(gen_obj);
		return null;
	}
	/** @private @arg {string[]} res @arg {string} k1 @arg {string} x */
	generate_code_for_string(res,k1,x) {
		if(k1==="playlistId") {
			if(x.startsWith("RD")) {
				res.push(`this.str_starts_with("RD",${k1},"string");`);
			}
		}
		if(k1=="videoId") {res.push(`this.primitive_of(${k1},"string");`); return;}
		let x2=x;
		let ret_arr=res;
		if(x2.startsWith("https:")) {
			ret_arr.push(`this.primitive_of(${k1},"string");`);
			return;
		}
		let u_count=[...new Set(x2.split("").sort())].join("").length;
		if(x2.includes("%")) {
			if(u_count>13) {
				ret_arr.push(`this.primitive_of(${k1},"string");`);
				return;
			}
		}
		console.log("[unique_chars_count]",k1,[...new Set(x2.split("").sort())].join("").length);
		ret_arr.push(`if(${k1}!=="${x2}") debugger;`);
		x;
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class ParserService extends BaseService {
	log_playlist_parse=false;
	/** @public @arg {YTNavigateFinishDetail['pageType']} x */
	parse_page_type(x) {
		switch(x) {
			default: debugger; break;
			case "browse": break;
			case "channel": break;
			case "playlist": break;
			case "search": break;
			case "settings": break;
			case "shorts": break;
			case "watch": break;
		}
	}
	/** @public @arg {PlaylistId} x */
	parse_playlist_id(x) {
		if(x===void 0) {debugger; return;}
		x: {
			switch(x) {
				case "LL": break;
				case "WL": break;
				default: break x;
			}
			return;
		}
		if(this.str_starts_with_r(x,"PL")) {
			let pl=x.slice(2);
			switch(pl.length) {
				case 32: return;
			}
			console.log("[parse_playlist]",pl.length,pl);
			return;
		}
		if(this.str_starts_with_r(x,"RDMM")) {
			let pl=x.slice(4);
			console.log("[parse_playlist_radio_mm]",pl.length,pl);
			return;
		}
		if(this.str_starts_with_r(x,"RD")) {
			let pl=x.slice(2);
			if(this.log_playlist_parse) console.log("[parse_playlist_radio]",pl.length,pl);
			return;
		}
		console.log("[new_parse_playlist_id]",x);
		debugger;
	}
	/** @private @template {`${U}${string}${U}`} I @template {string} U @arg {I} x @arg {U} _w @returns {I extends `${U}${infer V}${U}`?V:never} */
	extract_inner(x,_w) {
		/** @private @type {any} */
		let ac=x.slice(1,-1);
		return ac;
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} u @returns {x is `${string}${U}${string}`|`${U}${string}`|`${string}${U}`} */
	str_has_sep(x,u) {
		return x.includes(u);
	}
	/** @public @arg {MimeTypeFormat} x */
	parse_mime_type(x) {
		let vv=split_string(x,";");
		let vns=split_string(vv[1]," ")[1];
		this.save_string("[mime-type]",vv[0]);
		let v1=split_string(vns,"=")[1];
		let codec_type_raw=this.extract_inner(v1,"\"");
		if(this.str_has_sep(codec_type_raw,".")) {
			let [codec_type]=split_string_once(codec_type_raw,".");
			let h=this.parse_codec_str(codec_type);
			if(h) return;
			console.log(vv[0],codec_type_raw);
			debugger;
			return;
		}
		let h=this.parse_codec_str(codec_type_raw);
		if(h) return;
		console.log(vv[0],codec_type_raw);
		debugger;
	}
	/** @private @arg {CodecType} x */
	parse_codec_str(x) {
		switch(x) {
			case "av01": break;
			case "avc1": break;
			case "mp4a": break;
			case "opus": break;
			case "vp9": break;
			default: return false;
		}
		return true;
	}
	/** @private @template {string[]} T @template {string} U @arg {U} w @arg {T} x @returns {x is [string,`${U}${string}`,...string[]]} */
	str_starts_with_at_1(x,w) {
		return this.str_starts_with(x[1],w);
	}
	/** @private @template {string[]} T @template {string} U @arg {U} w @arg {T} x @returns {x is [`${U}${string}`,...string[]]} */
	str_starts_with_at_0(x,w) {
		return this.str_starts_with(x[0],w);
	}
	/** @private @arg {`query=${string}`} x */
	parse_channel_search_url(x) {
		let sp=this.parse_url_search_params(x);
		if(!this.eq_keys(this.get_keys_of(sp),["query"])) debugger;
		console.log("[found_search_query]",sp.query);
	}
	/** @private @arg {Extract<ParseUrlStr_3,[`@${string}`,any]>[1]} x */
	parse_channel_section_url(x) {
		if(!this.str_is_search(x)) {
			return this.parse_channel_section(["channel",x]);
		}
		let a=split_string(x,"?");
		switch(a[0]) {
			case "search": this.parse_channel_search_url(a[1]); break;
			default: debugger; break;
		}
	}
	/** @private @arg {ParseUrlStr_3} x */
	parse_url_3(x) {
		if(this.str_starts_with_at_0(x,"@")) {
			this.parse_channel_section_url(x[1]);
			return;
		}
		switch(x[0]) {
			case "feed": return this.parse_feed_url(x);
			case "shorts": return this.parse_shorts_url(x);
			case "channel": return this.parse_channel_url(x);
			case "youtubei": return this.parse_youtube_url_2(x);
			case "api": return this.parse_api_url(x);
			default: debugger; return;
		}
	}
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["api",...any]>} x */
	parse_api_url(x) {
		let a=split_string_once(x[1],"/");
		switch(a[0]) {
			case "stats": this.parse_api_stats_url(a[1]); break;
		}
	}
	/** @private @arg {ParseApiUrlStr} x */
	parse_api_stats_url(x) {
		let a=split_string_once(x,"?");
		switch(a[0]) {
			case "ads": {
				/** @type {ApiStatsAdsArgs} */
				let sp=as(a[1]);
				let v=this.parse_url_search_params(sp);
				// spell:disable-next
				const {ver,ns,event,device,content_v,el,ei,devicever,bti,break_type,conn,cpn,lact,m_pos,mt,p_h,p_w,rwt,sdkv,slot_pos,vis,vol,wt,sli,slfs,loginael,...y}=v; this.g(y);
			} break;
			default: debugger; break;
		}
	}
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["channel",...any]>} x */
	parse_channel_url(x) {
		if(this.str_starts_with_at_1(x,"UC")) {
			return;
		}
		console.log("[parse_channel_url]",x);
	}
	/** @public @arg {`UC${string}`} x */
	parse_channel_id(x) {
		if(this.str_starts_with_r(x,"UC")) {
			return;
		}
		debugger;
	}
	/** @private @arg {ParseUrlStr_2} x */
	parse_youtube_url_2(x) {
		let [,a]=x;
		this.parse_youtube_url_4(a);
	}
	/** @private @arg {ParseUrlStr_4} x */
	parse_youtube_url_4(x) {
		let a=split_string_once(x,"/");
		if(a[0]!=="v1") debugger;
		let [,b]=a;
		if(this.str_has_sep(b,"/")) {
			return this.parse_youtube_api_url_5(b);
		}
		this.get_yt_url_type(["youtubei","v1",b]);
	}
	/** @private @arg {ParseUrlStr_5} x */
	parse_youtube_api_url_5(x) {
		let a=split_string_once(x,"/");
		this.get_yt_url_type(["youtubei","v1",...a]);
	}
	/** @public @arg {string} x */
	parse_video_id(x) {
		this.x.get("indexed_db").put({v: x});
	}
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		this.x.get("indexed_db").put({v: x[1]});
	}
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["feed",any]>} x */
	parse_feed_url(x) {
		let [,a]=x;
		if(this.str_is_search(a)) {
			return;
		}
		switch(a) {case "history": return;}
		switch(a) {case "library": return;}
		switch(a) {case "subscriptions": return;}
		switch(a) {
			case "what_to_watch": return;
			default: debugger; return;
		}
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {
		return x.includes("?");
	}
	/** @public @arg {`RD__{string}`} x */
	parse_guide_entry_id(x) {
		/** @private @type {YtUrlInfoItem[]} */
		let arr=[];
		if(this.str_starts_with_r(x,"RD")) {
			arr.push({_tag: "playlist",type: "RD",id: x.slice(2)});
		} else {
			console.log(x);
			debugger;
		}
		this.log_url_info_arr(arr);
	}
	log_start_radio=false;
	/** @private @arg {ParamsSection} root @arg {Extract<SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url(root,x) {
		let vv=split_string(x,"&");
		/** @private @type {YtUrlInfoItem[]} */
		let url_info_arr=[];
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @private @type {SplitOnce<typeof prop,"=">} */
			let res=split_string_once(prop,"=");
			switch(res[0]) {
				case "v": {
					let value=res[1];
					url_info_arr.push({_tag: "video",id: value});
				} break;
				case "list": {
					let v=res[1];
					if(this.str_starts_with(v,"RD")) {
						if(this.str_starts_with(v,"RDMM")) {
							url_info_arr.push({_tag: "playlist",type: "RDMM",id: v.slice(4)});
						} else if(this.str_starts_with(v,"RDGM")) {
							url_info_arr.push({_tag: "playlist",type: "RDGM",id: v.slice(4)});
						} else {
							url_info_arr.push({_tag: "playlist",type: "RD",id: v.slice(2)});
						}
					} else if(this.str_starts_with(v,"PL")) {
						url_info_arr.push({_tag: "playlist",type: "PL",id: v.slice(2)});
					} else {
						debugger;
					}
				} break;
				case "rv": url_info_arr.push({_tag: "video-referral",id: res[1]}); break;
				case "pp": {
					this.on_player_params(root,"watch_page_url.pp",res[1]);
				} break;
				case "start_radio": {
					if(this.log_start_radio) console.log("[playlist_start_radio]",res[1]);
				} break;
				case "index": {
					if(this.cache_playlist_index.includes(res[1])) break;
					this.cache_playlist_index.push(res[1]);
					if(this.log_playlist_index) console.log("[playlist_index]",res[1]);
				} break;
				case "t": url_info_arr.push({_tag: "video-referral",id: res[1]}); break;
				default: debugger;
			}
		}
		this.log_url_info_arr(url_info_arr);
	}
	/** @public @arg {string} x */
	create_param_map_dbg(x) {
		debugger;
		let res_e=this.decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @private @arg {ParamMapType} x */
	parse_get_transcript(x) {
		/** @type {ParamMapValue[]} */
		let transcript_args=[];
		let pMap=x;
		/** @private @arg {number} x */
		function convert_param(x) {
			if(x<=0) {debugger; return;}
			let pf=pMap.get(x);
			if(pf) {
				if(pf.length!==1) debugger;
				transcript_args[x-1]=pf[0];
			}
		}
		this.z([1,2,3,5,6,7,8],a => convert_param(a));
		/** @type {{videoId:string,langParams:string,unk3:1,targetId:"engagement-panel-searchable-transcript-search-panel",unk6:1,unk7:1,unk8:1}|null} */
		let transcript_args_dec=null;
		let p0=transcript_args[0];
		let p1=transcript_args[1];
		let p2=transcript_args[2];
		let p4=transcript_args[4];
		let p5=transcript_args[5];
		let p6=transcript_args[6];
		let p7=transcript_args[7];
		x: if(
			typeof p0=='string'&&typeof p1=='string'
			&&p2===1
			&&typeof p4=='string'
			&&p5===1&&p6===1&&p7===1
		) {
			switch(p4) {
				case "engagement-panel-searchable-transcript-search-panel": break;
				default: debugger; break x;
			}
			transcript_args_dec={
				videoId: p0,
				langParams: p1,
				unk3: p2,
				targetId: p4,
				unk6: p5,
				unk7: p6,
				unk8: p7
			};
		}
		x: if(transcript_args_dec) {
			let param_1=decodeURIComponent(transcript_args_dec.langParams);
			let param_buf_1=this.decode_b64_url_proto_obj(param_1);
			if(param_buf_1===null) {debugger; break x;}
			let param_map_1=this.make_param_map(param_buf_1);
			if(!param_map_1) {debugger; break x;}
			let lp_p1=param_map_1.get(1);
			let lp_p2=param_map_1.get(2);
			let lp_p3=param_map_1.get(3);
			y: if(lp_p1&&lp_p2&&typeof lp_p1==='string'&&typeof lp_p2==='string'&&lp_p3 instanceof Map) {
				if(lp_p1!=="asr") break y;
				if(lp_p2!=="en") break y;
				if(lp_p3.size!==0) break y;
				return;
			}
			y: if(lp_p1!==void 0&&lp_p2!==void 0&&lp_p3!==void 0) {
				c: if(lp_p1 instanceof Map) {
					if(lp_p1.size===0) break c;
					let lp_p1_=this.to_param_obj(lp_p1);
					console.log("[lp_p1_]",lp_p1_);
					break y;
				}
				c: if(typeof lp_p2==='string') {
					if(lp_p2==="en") break c;
					console.log("[lp_p2]",lp_p2);
					break y;
				}
				c: if(lp_p3 instanceof Map) {
					if(lp_p3.size===0) break c;
					let lp_p3_=this.to_param_obj(lp_p3);
					console.log("[lp_p3_]",lp_p3_);
					break y;
				}
				return;
			}
			console.log("[get_transcript_args]",transcript_args_dec);
			let param_obj_1=this.to_param_obj(param_map_1);
			console.log("[new_get_transcript_endpoint_param_inner]",param_obj_1);
			debugger;
			return;
		}
		if(transcript_args_dec) {
			console.log("[get_transcript_args]",transcript_args_dec);
		}
		let param_obj=this.to_param_obj(x);
		console.log("[new_get_transcript_endpoint_params]",param_obj);
		debugger;
	}
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	on_endpoint_params(root,path,x) {
		if(x===void 0) {debugger; return;}
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		switch(root) {
			case "GetTranscript": return this.parse_get_transcript(param_map);
		}
		this.parse_endpoint_param(root,path,new Map(param_map));
	}
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	on_player_params(root,path,x) {
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_player_param(root,path,param_map);
	}
	/** @private @type {string[]} */
	cache_interaction_requests=[];
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	on_serialized_interactions_request_params(root,path,x) {
		if(this.cache_interaction_requests.includes(x)) return;
		this.cache_interaction_requests.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_serialized_interactions_request(root,path,param_map);
	}
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} map */
	parse_serialized_interactions_request(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,map,mk,ta,null);
		parse_key(2);
		parse_key(5);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		debugger;
	}
	parse_key_index=1;
	/** @public @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta */
	remove_key(x,mk,ta) {
		x.delete(ta);
		let idx=mk.indexOf(ta);
		if(idx>-1) mk.splice(idx,1);
	}
	/** @private @arg {string} ns @arg {()=>void} f */
	grouped(ns,f) {
		console.group(ns);
		f();
		console.groupEnd();
	};
	/** @private @arg {P$PathRoot} path @arg {ParamMapValue} tv @arg {number|null} ta */
	get_parse_fns(path,tv,ta=null) {
		let path_parts=split_string(path,".");
		/** @private @arg {number} idx */
		let gd=(idx) => {console.log("[param_next.next_new_ns]",path_parts.join(".")); gen_next_part(idx);};
		/** @private @arg {number} idx */
		let u=idx => this.grouped(path_parts.join("$"),() => gd(idx));
		/** @private @arg {number} idx */
		let gen_next_part=(idx) => {
			if(idx>path_parts.length) return;
			let case_part="";
			let value_part="switch(tv) {default: debugger; return;}";
			if(path_parts.length===idx) {
				if(tv instanceof Map) case_part="if(tv instanceof Map) return;";
				switch(typeof tv) {
					case "number": case_part='if(typeof tv==="number") return this.save_number(`[${path}]`,tv);\n'; break;
					case "string": case_part='if(typeof tv==="string") return this.save_string(`[${path}]`,tv);\n'; break;
				}
			}
			let res_case="";
			if(idx<path_parts.length) res_case=`case "${path_parts[idx]}": u(idx); debugger; break;`;
			console.log(`"[parse_value.L_gen_next_part] [${path}]",`);
			console.log(`
			-- [${path_parts.join(".")},${idx}] --\n
			case "${path_parts[idx-1]}": {
				const idx=${idx+1};
				if(path_parts.length===${idx}) {\n${case_part}${value_part}\n}
				switch(path_parts[${idx}]) {default: u(idx); debugger; path_parts[${idx}]===""; break;${res_case}}
			} break;`.slice(1).split("\n").map(e => e.slice(3)).join("\n"));
		};
		let new_path=() => {
			console.log("[parse_value.new_path_gen]",path);
			/** @type {P$LogItems} */
			console.log("\n\t\"[parse_value.gen_ns] [%s]\",",`${path}.f${ta}`);
			console.log(`
			case "${path}":
				switch(ta) {case ${ta}: break; default: new_ns(); debugger; return;}
				/** @type {P$PathRoot} */
				return this.parse_param_next(root,\`\${path}.f\${ta}\`,tv);\n`.split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
		};
		return {u,gen_next_part,new_path};
	}
	/** @typedef {(x:ParamMapValue[],idx:number)=>void} ParseCallbackFunction */
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta @arg {ParseCallbackFunction|null} cb */
	parse_key(root,path,x,mk,ta,cb) {
		let tv=x.get(ta);
		this.parse_value(root,path,x,mk,ta,tv,cb);
	}
	/** @type {P$LogItems} */
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta @arg {ParamMapValue[]|undefined} tv @arg {ParseCallbackFunction|null} cb */
	parse_value(root,path,x,mk,ta,tv,cb) {
		/** @private @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		let new_ns=() => {
			console.log("[parse_value.new_ns_gen]",path);
			/** @type {P$LogItems} */
			console.log("\n\t\"[parse_value.gen_ns] [%s]\",",`${path}.f${ta}`);
			console.log(`-- [parse_value.gen_ns] --\n\n\tcase ${ta}: \n`);
		};
		if(tv!==void 0) {
			let new_path=this.get_parse_fns(path,tv[0],ta).new_path;
			x.delete(ta);
			let cx=mk.indexOf(ta);
			if(cx>-1) mk.splice(cx,1);
			if(cb===null) {
				/** @type {P$LogItems} */
				switch(path) {
					default: {
						grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
						debugger;
						this.parse_param_next(root,as(`${path}.f${ta}`),tv);
					} break;
					case "AdServingDataEntry.f10":
						switch(ta) {case 1: case 6: case 11: break; default: new_ns(); debugger; return;}
						/** @type {P$PathRoot} */
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "AdServingDataEntry.f9":
					case "tracking.trackingParams.f4":
					case "transcript_target_id.param":
						switch(ta) {case 1: case 2: case 3: break; default: new_ns(); debugger; return;}
						/** @type {P$PathRoot} */
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "AdServingDataEntry":
						switch(ta) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: break; default: new_ns(); debugger; return;}
						/** @type {P$PathRoot} */
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "watch.params":
						switch(ta) {case 7: case 24: break; default: new_ns(); debugger; return;}
						/** @type {P$PathRoot} */
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "watch.player_params":
						switch(ta) {case 12: case 25: break; default: new_ns(); debugger; return;}
						/** @type {P$PathRoot} */
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "ypc_get_offers.params.f5": switch(ta) {case 1: case 3: case 5: case 9: break; default: new_ns(); debugger; return;} return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "ypc_get_offers.params": switch(ta) {case 1: case 3: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "report.params.f28.f1.f1.f1.f1": switch(ta) {case 4: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "browse$param.f93": case "get_transcript.params": case "report.params.f18": case "report.params.f28.f1.f1.f1": case "report.params.f28.f1.f1": case "report.params.f28": case "subscribe.params.f2": case "watch.params.f27": case "watch.player_params.f40":
					case "ypc_get_offers.params.f5.f5": switch(ta) {case 1: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "report.params.f28.f1": switch(ta) {case 1: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "createBackstagePost.param": case "record_notification_interactions.f2.f14.f1": case "ypc_get_offers.params.f1":
					case "record_notification_interactions.f2.f14": switch(ta) {case 1: case 2: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "tracking.trackingParams":
						switch(ta) {
							case 19: break;
							default: {
								if(ta<12) {
									/** @type {NumRange<1,11>} */
									let tu=as(ta);
									ta=tu;
									return this.parse_param_next(root,`${path}.f${tu}`,tv);
								}
							} new_ns(); debugger; return;
						}
						return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "browse$param.f84": switch(ta) {case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
					case "create_playlist.params":
					case "browse$param": switch(ta) {case 84: case 93: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`browse$param.f${ta}`,tv);
					case "entity_key": switch(ta) {case 2: case 4: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${ta}`,tv);
				}
				if(tv!==void 0) {
					/** @type {P$PathRoot} */
					return this.parse_param_next(root,as(`${path}.f${ta}`),tv);
				}
				return;
			}
			cb(tv,ta);
		}
	}
	/** @public @arg {ParamMapValue} tv */
	mapper_use(tv) {
		/** @private @arg {ParamMapValue} e */
		let mapper=e => {
			if(e instanceof Map) {
				let min_=Math.min(...e.keys());
				let len=Math.max(...e.keys());
				let x2=this.to_param_obj(e);
				let c3={
					...x2,
					length: len+1,
				};
				return Array(min_).concat(Array.from(c3).map((_u,j) => e.get(j)).slice(min_));
			}
			return e;
		};
		let xx=mapper(tv);
		// Array.from(xx).slice(1).map(mapper)[0];
		if(xx instanceof Array) {
			return xx.map(mapper);
		} else {
			return xx;
		}
	}
	/** @public @arg {string[]} x */
	report$params(x) {
		this.save_string("[report.params.path]",x.join("$"));
	}
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapValue[]} tva */
	parse_param_next_arr(root,path,tva) {
		let off=1;
		for(let val of tva) {
			let g1=() => {
				console.log(`
				case ${JSON.stringify(path)}: /*tva*/{
					this.parse_param_next(root,\`\${path}[\${off}]\`,[val]);
				}; return;`);
				console.log(`\n\n\t"[parse_value.gen_ns_g1] [${path}[${off}]]",`);
			};
			switch(path) {
				default: g1(); debugger; return;
				case "report.params.f28.f1[].f1.f1": /*tva*/{
					this.parse_param_next(root,`${path}[]`,[val]);
				}; return;
				case "report.params.f28.f1": /*tva*/{
					this.parse_param_next(root,`${path}[]`,[val]);
				} break;
			}
			off++;
		}

	}
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapValue[]} tva */
	parse_param_next(root,path,tva) {
		if(tva.length>1) return this.parse_param_next_arr(root,path,tva);
		if(tva.length!==1) return;
		let tv=tva[0];
		let key_index=this.parse_key_index;
		if(tv instanceof Map) this.parse_any_param(root,path,new Map(tv));
		let path_parts=split_string(path,".");
		let pp=this.get_parse_fns(path,tv);
		let u=pp.u;
		const idx=1;
		/** @type {P$LogItems} */
		switch(path_parts[0]) {
			default: u(idx); debugger; {switch(path_parts[0]) {case "": break;}} break;
			case "AdServingDataEntry": {
				const idx=2;
				if(path_parts.length===1) switch(tv) {default: debugger; return;}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f4": case "f5": case "f6": case "f7": case "f9": case "f10": case "f13":
					case "f14": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1":
							case "f2":
							case "f3":
							case "f6":
							case "f11": {
								const idx=4;
								if(path_parts.length===3) return;
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			// [watch.player_params]
			case "watch": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					// [watch.player_params.f12]
					case "params":
					case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							/** @type {P$LogItems} */
							// [watch.player_params.f12]
							// [watch.player_params.f25]
							case "f2": case "f3": case "f7": case "f8": case "f9":
							case "f12": case "f13": case "f24": case "f27": case "f25":
							case "f33": case "f40": case "f56": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
									if(typeof tv==="bigint") return this.save_string(`[${path}]`,`${tv}n`);
									debugger;
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f5": case "f1": case "f2": case "f4":
									case "f3": u(idx); debugger; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "entity_key": u(idx); debugger; break;
			case "tracking": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "parentTrackingParams":
					// [tracking.trackingParams]
					case "trackingParams": {
						const idx=3;
						/** @type {P$LogItems} */
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							// [tracking.trackingParams.f4]
							case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
							case "f10": case "f11": case "f16": case "f19": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
									if(typeof tv==="bigint") return this.save_string(`[${path}]`,`${tv}n`);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f2": case "f3": case "f12": case "f13":
									// [tracking.trackingParams.f4.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(tv instanceof Map) return;
											if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); debugger; path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "browse$param":
			case "record_notification_interactions":
			case "transcript_target_id":
			case "watch":
			case "GetNotificationMenu":
			case "report":
			case "createBackstagePost":
			case "subscribe":
			case "ypc_get_offers":
			case "create_playlist":
			case "get_transcript":
			case "like":
			case "next":
			case "playlist_edit":
			case "watch_page_url":
			case "watch_playlist":
			case "reel": {
				u(idx);
				debugger;
			} break;
		}
		console.log(`[${path}] [idx=${key_index}]`,root,tv);
	}
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_any_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...x.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,x,mk,ta,null);
		let mk_max=Math.max(...mk,-1);
		for(let i=1;i<mk_max+1;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(mk,[])) return;
		console.log(`[new.${path}] [idx=${key_index}]`,path,this.to_param_obj(x));
		debugger;
	}
	/** @private @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_player_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...x.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,x,mk,ta,null);
		for(let i=1;i<72;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		parse_key(72);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(x));
		debugger;
	}
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_endpoint_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let map_keys=[...x.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,x,map_keys,ta,null);
		for(let i=1;i<40;i++) {
			if(!map_keys.includes(i)) continue;
			parse_key(i);
		}
		// endpoint.create_playlist.params
		this.parse_key(root,path,x,map_keys,77,tv => {
			if(tv.length===1&&typeof tv[0]==="string") {
				let bt=this.decode_browse_id(tv[0]);
				if(!bt) {debugger; return;}
				return this.parse_browse_id(bt);
			}
			debugger;
		});
		for(let i=1;i<300;i++) {
			if(!map_keys.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(map_keys,[])) return;
		let param_obj=this.to_param_obj(x);
		console.log(`[endpoint.${path}] [idx=${key_index}]`,param_obj);
		debugger;
	}
	/** @private @arg {ParamMapType} x @returns {ParamObjType} */
	to_param_obj(x) {
		return Object.fromEntries([...x.entries()].map(e => {
			let ei=e[1];
			if(ei instanceof Map) {
				return [e[0],this.to_param_obj(ei)];
			}
			return [e[0],ei];
		}));
	}
	log_enabled_playlist_id=false;
	/** @private @type {string[]} */
	cache_playlist_index=[];
	/** @private @type {string[]} */
	cache_playlist_id=[];
	/** @private @type {string[]} */
	cache_player_params=[];
	/** @private @arg {ParamsSection} root @arg {Extract<YtUrlFormat,`https://${string}`|`http://${string}`>} x */
	parse_full_url(root,x) {
		let r=this.parse_with_url_parse(x);
		switch(r.host) {
			case "ad.doubleclick.net": return;
			case "www.googleadservices.com": return;
			case "www.youtube.com": {
				this.parse_url(root,`${r.pathname}${r.search}`);
				return;
			}
			default:
		}
		/** @private @template {UrlParseRes_noSearch<any,string,any,any>|UrlParseRes<any,string,any,any,any>} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,{host:`${U}${string}`}>} */
		let host_starts_with=(x,v) => {
			return this.str_starts_with(x.host,v);
		};
		if(host_starts_with(r,"yt")) {
			let c=split_string(r.pathname,"=");
			let v=split_string(c[1],"-");
			let h=split_string(r.host,".");
			if(this.TODO_true) return;
			console.log("yt_ggpht_url",h[0],c[0],v);
			/** @private @type {YtUrlFormat} */
			return;
		}
		switch(r.host) {
			case "www.google.com": return;
			case "i.ytimg.com": return;
			case "studio.youtube.com": return;
			case "music.youtube.com": return;
			case "www.youtubekids.com": return;
			case "tv.youtube.com": return;
			case "www.gstatic.com": return;
			case "support.google.com": return;
			case "m.youtube.com": return;
			default:
		}
		let s_host=split_string_once(r.host,".");
		switch(s_host[1]) {
			case "googlevideo.com": {
				let x0=split_string_once(s_host[0],"---");
				let x1=split_string_once(x0[0],"rr");
				if(this.TODO_true) return;
				/** @private @type {GoogleVideoSubDomain} */
				console.log("google video sub domain",`rr${x1[1]}`);
			} return;
			default:
		}
		/** @private @type {YtUrlFormat|YtExternalUrlFormat} */
		console.log("[parse_url_external_1]",x);
		debugger;
	}
	/** @public @arg {G_VE3832$Watch$WC$Metadata['url']} x */
	parse_url_VE3832(x) {
		if(!this.str_starts_with("/watch?",x)) debugger;
	}
	/** @public @arg {ParamsSection} root @arg {YtUrlFormat} x */
	parse_url(root,x) {
		if(this.str_starts_with("https://",x)) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with("http://",x)) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with("android-app://",x)) {
			return;
		}
		if(this.str_starts_with("ios-app://",x)) {
			return;
		}
		if(x==="/") return;
		let up=split_string_once(x,"/");
		if(up[0]!=="") {
			debugger;
			return;
		}
		this.parse_url_1(root,up[1]);
	}
	/** @private @arg {ParamsSection} root @arg {ParseUrlStr_1} x */
	parse_url_1(root,x) {
		let v=split_string_once(x,"/");
		switch(v.length) {
			case 1: this.parse_url_2(root,v[0]); break;
			case 2: this.parse_url_3(v); break;
		}
	}
	log_playlist_index=false;
	/** @private @arg {YtUrlInfoPlaylist} x */
	log_playlist_id(x,critical=false) {
		if(!this.cache_playlist_id.includes(x.id)) {
			this.cache_playlist_id.push(x.id);
			if(this.log_enabled_playlist_id||critical) console.log("[playlist]",x.type,x.id);
		}
	}
	/** @private @arg {YtUrlInfoPlaylist} x */
	get_playlist_url_info_critical(x) {
		switch(x.id.length) {
			case 11: return false;
			case 24: return false;
			case 32: return false;
			default: debugger; return true;
		}
	}
	/** @private @arg {YtUrlInfoPlaylist} x */
	parse_playlist_url_info(x) {
		let is_critical=this.get_playlist_url_info_critical(x);
		this.log_playlist_id(x,is_critical);
	}
	/** @private @arg {YtUrlInfoItem[]} x */
	log_url_info_arr(x) {
		for(let url_info of x) {
			switch(url_info._tag) {
				case "playlist": this.parse_playlist_url_info(url_info); break;
				case "video": this.parse_video_id(url_info.id); break;
				case "video-referral": this.parse_video_id(url_info.id); break;
			}
		}
	}
	/** @private @arg {ParamsSection} root @arg {ParseUrlWithSearchIn|ParseUrlWithSearchIn_2} x */
	parse_url_with_search(root,x) {
		let a=split_string(x,"?");
		switch(a[0]) {
			case "playlist": this.parse_playlist_page_url(a[1]); break;
			case "watch": this.parse_watch_page_url(root,a[1]); break;
		}
	}
	log_channel_handles=false;
	/** @private @type {YtUrlFormat} */
	/** @private @arg {ParamsSection} root @arg {Extract<SplitOnce<SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1],"/">,[any]>[0]} x */
	parse_url_2(root,x) {
		if(this.str_is_search(x)) {
			x;
			return this.parse_url_with_search(root,as(x));
		}
		if(this.str_starts_with("@",x)) {
			if(this.log_channel_handles) console.log("[channel_handle]",x);
			return;
		}
		if(this.str_starts_with("account",x)) {
			return this.parse_account_url(x);
		}
		switch(x) {
			case "channel_switcher": return;
			case "gaming": return;
			case "premium": return;
			case "reporthistory": return;
			case "upload": return;
			default:
		}
		switch(x) {
			case "getAccountSwitcherEndpoint": return;
			case "getDatasyncIdsEndpoint": return;
			default:
		}
		/** @private @template T @arg {T} x @arg {T} y @returns {[T,T]} */
		function assert_equal_type(x,y) {return [x,y];}
		assert_equal_type(x,{});
		switch(x) {
			default: debugger; return;
		}
	}
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,[`account${string}`]>[0]} x */
	parse_account_url(x) {
		let a=split_string(x,"_");
		if(a.length===1) return;
		switch(a[1]) {
			default: debugger; break;
			case "advanced": break;
			case "billing": break;
			case "notifications": break;
			case "privacy": break;
			case "sharing": break;
			case "playback": break;
		}
		return;
	}
	/** @private @arg {YtPlaylistUrlParamsFormat} x */
	parse_playlist_page_url(x) {
		if(x.includes("&")) debugger;
		let y=split_string(x,"=");
		switch(y[0]) {
			case "list": return this.parse_playlist_id(y[1]);
			default: debugger;
		}
	}
	/** @public @arg {D__VE6827$PageUrl} x */
	parse_ve_6827_url(x) {
		const cf="VE6827_PageUrl";
		/** @type {SplitOnce<D__VE6827$PageUrl,"/">[1]} */
		let su=split_string_once(x,"/")[1];
		let su1=split_string(su,"/");
		if(su1.length===1) {
			let [pt0]=su1;
			this.save_string(`[ve_6827.part[0]]`,`${pt0}`);
			switch(pt0) {
				case "reporthistory": return;
				default: debugger; return;
			}
		}
		let [pt]=split_string_once(su1[1],"?");
		this.save_string(`[${cf}]`,`${su1[0]}/${pt}`);
		switch(pt) {
			case "trending": break;
			case "library": break;
			case "history": break;
			case "storefront": break;
			case "guide_builder": break;
			default: debugger; break;
		}
	}
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {
		return this.str_starts_with(needle,str);
	}
	/** @public @arg {YtTargetIdType} x */
	parse_target_id(x) {
		if(this.str_starts_with("browse-feed",x)) {
			console.log("[target_id.browse_feed","browse-feed",split_string_once("browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with("comment-replies-item",x)) {
			return this.save_enum("comment-replies-item",x);
		}
		if(this.str_starts_with_r(x,"engagement-panel")) {
			return this.save_enum("engagement-panel",x);
		}
		if(this.str_starts_with_r(x,"comments")) {
			return this.save_enum("comments",x);
		}
		if(this.str_starts_with_r(x,"library")) {
			return this.save_enum("library",x);
		}
		if(this.str_starts_with_r(x,"watch")) {
			return this.save_enum("watch",x);
		}
		if(this.str_starts_with_r(x,"shopping_panel")) {
			return this.save_enum("shopping_panel",x);
		}
		if(this.str_starts_with_r(x,"clip")) {
			return this.save_enum("clip",x);
		}
		this.save_string("[target_id]",x);
	}
	/** @public @arg {SplitOnce<ChanLoc,".">} x */
	parse_channel_section(x) {
		switch(x[1]) {
			case "": break;
			case "about": break;
			case "channels": break;
			case "community": break;
			case "featured": break;
			case "playlists": break;
			case "search": break;
			case "shorts": break;
			case "streams": break;
			case "videos": break;
			default: debugger;
		}
	}
	/** @private @arg {string[]} parts @arg {string} cur_part */
	api_no_handler(parts,cur_part) {
		console.log("[no_handler_for] [%o] [%s]",parts,cur_part);
		debugger;
		return null;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1",string]>} x */
	get_yt_url_type_3(x) {
		switch(x[2]) {
			case "browse": return x[2];
			case "feedback": return x[2];
			case "get_survey": return x[2];
			case "get_transcript": return x[2];
			case "guide": return x[2];
			case "next": return x[2];
			case "player": return x[2];
			case "search": return x[2];
			case "updated_metadata": return x[2];
			default:
		}
		switch(x[2]) {
			default: console.log("[new_get_yt_url_type_3] [%o] [%s]",x,x[2]); debugger;
		}
		return x[2];
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei",...any]>} x */
	get_yt_url_type(x) {
		if(x[1]!=="v1") {
			return this.api_no_handler(x,x[1]);
		}
		if(x.length===3) {
			return this.get_yt_url_type_3(x);
		}
		switch(x[2]) {
			case "account": return this.get_account_type(x);
			case "att": return this.get_att_type(x);
			case "browse": return this.get_browse_type(x);
			case "comment": return this.get_comment_type(x);
			case "like": return this.get_like_type(x);
			case "live_chat": return this.get_live_chat_type(x);
			case "notification": return this.get_notification_type(x);
			case "reel": return this.get_reel_type(x);
			case "subscription": return this.get_subscription_type(x);
			case "playlist": return this.get_playlist_type(x);
			case "share": return this.get_share_type(x);
			case "music": return this.get_music_type(x);
			case "pdg": return this.get_pdg_type(x);
			case "flag":
				if(x[3]!=="get_form") debugger;
				return {
					/** @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "backstage":
				if(x[3]!=="create_post") debugger;
				return {
					/** @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "ypc": {
				if(x[3]!=="get_offers") debugger;
				return {
					/** @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			}
			default: return this.api_no_handler(x,x[2]);
		}
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","pdg",string]>} x */
	get_pdg_type(x) {
		switch(x[3]) {
			case "get_pdg_buy_flow": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","music",string]>} x */
	get_music_type(x) {
		switch(x[3]) {
			case "get_search_suggestions": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","share",string]>} x */
	get_share_type(x) {
		switch(x[3]) {
			case "get_share_panel": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","playlist",string]>} x */
	get_playlist_type(x) {
		switch(x[3]) {
			case "get_add_to_playlist": break;
			case "create": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","browse",string]>} x */
	get_browse_type(x) {
		switch(x[3]) {
			case "edit_playlist": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","subscription",string]>} x */
	get_subscription_type(x) {
		switch(x[3]) {
			case "subscribe": break;
			case "unsubscribe": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","reel",string]>} x */
	get_reel_type(x) {
		switch(x[3]) {
			case "reel_item_watch": break;
			case "reel_watch_sequence": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","notification",string]>} x */
	get_notification_type(x) {
		switch(x[3]) {
			case "get_unseen_count": break;
			case "get_notification_menu": break;
			case "record_interactions": break;
			case "modify_channel_preference": break;
			case "opt_out": break;
			default: x[3]===""; return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","comment",string]>} x */
	get_comment_type(x) {
		switch(x[3]) {
			case "create_comment": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","att",string]>} x */
	get_att_type(x) {
		switch(x[3]) {
			case "get": break;
			case "log": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","like",string]>} x */
	get_like_type(x) {
		switch(x[3]) {
			case "like": break;
			case "dislike": break;
			case "removelike": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","account",string]>} x */
	get_account_type(x) {
		switch(x[3]) {
			case "account_menu": break;
			case "accounts_list": break;
			case "set_setting": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","live_chat",string]>} x */
	get_live_chat_type(x) {
		switch(x[3]) {
			case "get_live_chat_replay": break;
			case "get_live_chat": break;
			default: return this.api_no_handler(x,x[3]);
		};
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @public @arg {Split<ApiUrlFormat,"/">} x */
	get_url_type(x) {
		switch(x[0]) {
			case "youtubei": return this.get_yt_url_type(x);
			case "getDatasyncIdsEndpoint": break;
			case "getAccountSwitcherEndpoint": break;
			default: return this.api_no_handler(x,x[0]);
		}
		return x[0];
	}
	/** @private @arg {BrowseEndpointPages} x */
	parse_known_page(x) {
		switch(x) {
			case "explore": return true;
			case "guide_builder": return true;
			case "history": return true;
			case "library": return true;
			case "storefront": return true;
			case "subscriptions": return true;
			case "trending": return true;
			case "what_to_watch": return true;
			default:
		}
		switch(x) {
			case "music_charts": return true;
			case "music_explore": return true;
			case "music_home": return true;
			case "music_library_corpus_artists": return true;
			case "music_library_corpus_track_artists": return true;
			case "music_library_landing": return true;
			case "music_liked_albums": return true;
			case "music_liked_playlists": return true;
			case "music_liked_videos": return true;
			case "music_moods_and_genres_category": return true;
			case "music_moods_and_genres": return true;
			case "music_new_releases": return true;
			default:
		}
		switch(x) {
			case "hashtag": return true;
			default:
		}
		switch(x) {
			case "": return true;
			default:
		}
		switch(x) {default: debugger; return false;}
	}
	/** @public @arg {string} x @returns {BrowseIdType|null} */
	decode_browse_id(x) {
		if(this.str_starts_with_r(x,"FE")) {
			switch(x) {
				case "FEwhat_to_watch": return x;
				case "FEexplore": return x;
				default: console.log(`--- [decode_browse_id] ---\n\n\ncase "${x}: return x;`); return null;
			}
		}
		return null;
	}
	/** @public @arg {BrowseIdType} x */
	parse_browse_id(x) {
		if(this.str_starts_with_r(x,"FE")) {
			let page=split_string_once(x,"FE")[1];
			let known_page=this.parse_known_page(page);
			if(known_page) return;
			if(seen_map.has(page)) return;
			seen_map.add(page);
			console.log("[param_value_with_section] [%s] -> [%s]",x.slice(0,2),page);
		} else if(this.str_starts_with_r(x,"VL")) {
			let x1=split_string_once(x,"VL")[1];
			if(this.str_starts_with(x1,"LL")) return;
			if(this.str_starts_with(x1,"WL")) return;
			if(this.str_starts_with(x1,"PL")) return;
			console.log("new with param [param_2c_VL]",x,x1);
		} else if(this.str_starts_with_r(x,"UC")) {
			if(x.slice(2).length===22) return;
			console.log("new with param [param_2c_UC]",x);
		} else if(this.str_starts_with_r(x,"SP")) {
			let x1=split_string_once(x,"SP")[1];
			switch(x1) {
				case "account": case "account_advanced": case "account_billing": case "account_notifications": case "account_privacy":
				case "account_sharing": case "account_playback": case "account_overview": case "report_history": return;
				case "unlimited": return;
				default: debugger;
			}
			console.log("new with param [param_2c_SP]",x,x1);
		} else if(this.str_starts_with_r(x,"MP")) {
			let x1=split_string_once(x,"MP")[1];
			let x2=split_string_once(x1,"_");
			switch(x2[0]) {
				case "TRt": break;
				case "REb": break;
				case "LYt": break;
				default: console.log("new with param [param_2c_MP]",x,x1,x2); debugger;
			}
		} else {
			debugger;
		}
	}
}
//#endregion
//#region sizeof_js & Generate
let text_encoder=new TextEncoder;
/** @private @type {Map<unknown,number>} */
let sizeof_cache=new Map;
sizeof_cache.set(null,1);
sizeof_cache.set(undefined,1);
let count=0;
/** @private @arg {unknown} obj */
function sizeof_js(obj) {
	let cache=sizeof_cache.get(obj);
	if(cache!==void 0) return cache;
	count++;
	if(count>1024) {
		throw new Error("Too big");
	}
	let size=0;
	x: {
		if(typeof obj=="string") {
			size=text_encoder.encode(obj).length;
			break x;
		}
		if(typeof obj=="number") {
			size=1;
			break x;
		}
		if(obj instanceof EventTarget) {
			size=1;
			break x;
		}
		if(obj instanceof Storage) {
			size=1;
			break x;
		}
		if(typeof obj!=="object") {debugger; return 1;}
		if(obj===null) return 1;
		let ent;
		try {
			ent=Object.entries(obj);
		} catch(e) {
			console.log("failed_to_get_entries",e,obj);
			size=1;
			break x;
		}
		for(let x of ent) {
			size+=sizeof_js(x[1]);
		}
	}
	sizeof_cache.set(obj,size);
	return size;
}
class Generate {
	/** @private @type {Map<string,string>[]} */
	out_arr=[];
	/** @private @type {string[]} */
	str_arr=[];
	/** @public @arg {CodegenService} parent */
	constructor(parent) {
		this.parent=parent;
	}
	get x() {
		return this.parent;
	}
	/** @public @arg {{}} x @arg {string} r */
	generate_typedef_and_depth(x,r) {
		let gen=this.x.codegen_new_typedef(x,r,true);
		if(!gen) return;
		this.str_arr.push(gen);
		let gd=this.x.generate_depth(gen);
		if(!gd) return;
		this.out_arr.push(gd);
	}
}
//#endregion
//#region HandleTypesSupport
/** @extends {BaseService<Services,ServiceOptions>} */
class ServiceData extends BaseService {
	/** @protected @type {FormatItagArr} */
	format_itag_arr=[18,133,134,135,136,137,140,160,242,243,244,247,248,249,250,251,278,298,299,302,303,308,315,394,395,396,397,398,399,400,401];
	/** @protected @type {QualArr} */
	format_quality_label_arr=[
		"2160p50","1440p50","1080p50","720p50",
		"2160p60","1440p60","1080p60","720p60",
		"1080p","720p","480p","360p","240p","144p"
	];
	valid_fps_arr=[13,25,30,50,60];
	format_quality_arr=["hd2160","hd1440","hd1080","hd720","large","medium","small","tiny"];
}
class ServiceMethods extends ServiceData {
	/** @public @arg {UrlTypes} url_type @arg {{}} x @returns {_ResponseTypes} */
	get_res_data(url_type,x) {
		/** @private @type {Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		/** @private @type {_ResponseTypes|null} */
		let res=null;
		switch(target[0]) {
			case "account": res=this.convert_account(target,x); break;
			case "att": res=this.convert_res_att(target,x); break;
			case "browse": res=this.convert_browse(target,x); break;
			case "like": res=this.x.get("handle_types").convert_like(target,x); break;
			case "live_chat": res=this.convert_live_chat(target,x); break;
			case "music": res=this.convert_music(target,x); break;
			case "notification": res=this.convert_notification(target,x); break;
			case "reel": res=this.convert_reel(target,x); break;
			case "subscription": res=this.convert_subscription(target,x); break;
			case "playlist": res=this.convert_playlist(target,x); break;
			case "share": res=this.convert_share(target,x); break;
			case "pdg": res=this.convert_pdg(target,x); break;
		}
		switch(target.length) {
			case 1: res=this.convert_length_1(target,x); break;
		}
		if(res) return res;
		console.log("[log_get_res_data]",target,x);
		debugger;
		return {
			type: "_Generic",
			data: x,
		};
	}
	/** @public @arg {ApiUrlFormatFull} x */
	use_template_url(x) {
		const res_parse=this.parse_with_url_parse(x);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",x,res_parse);
			throw new Error("unreachable");
		}
		let path_parts=split_string(split_string_once(res_parse.pathname,"/")[1],"/");
		return this.parser.get_url_type(path_parts);
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,[any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_length_1(target,x) {
		switch(target[0]) {
			default: debugger; break;
			case "browse": return {
				type: target[0],
				/** @type {R_Browse} */
				data: as(x),
			};
			case "feedback": return {
				type: target[0],
				/** @type {R_Feedback} */
				data: as(x),
			};
			case "getDatasyncIdsEndpoint": return {
				type: target[0],
				/** @type {R_DatasyncIds} */
				data: as(x),
			};
			case "getAccountSwitcherEndpoint": return {
				type: target[0],
				/** @type {R_GetAccountSwitcherEndpoint} */
				data: as(x),
			};
			case "get_transcript": return {
				type: target[0],
				/** @type {R_GetTranscript} */
				data: as(x),
			};
			case "get_survey": return {
				type: target[0],
				/** @type {R_GetSurvey} */
				data: as(x),
			};
			case "guide": return {
				type: target[0],
				/** @type {R_Guide} */
				data: as(x),
			};
			case "next": return {
				type: target[0],
				/** @type {R_Next} */
				data: as(x),
			};
			case "player": return {
				type: target[0],
				/** @type {R_Player} */
				data: as(x),
			};
			case "search": return {
				type: target[0],
				/** @type {R_Search} */
				data: as(x),
			};
			case "updated_metadata": return {
				type: target[0],
				/** @type {UpdatedMetadata} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["reel",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_reel(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "reel_item_watch": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {D__ReelItemWatch} */
				data: as(x),
			};
			case "reel_watch_sequence": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_ReelWatchSequence} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["notification",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_notification(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "get_notification_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_GetNotificationMenu} */
				data: as(x),
			};
			case "get_unseen_count": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_NotificationGetUnseenCount} */
				data: as(x),
			};
			case "modify_channel_preference": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_ModifyChannelPreference} */
				data: as(x),
			};
			case "record_interactions": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_Success} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["live_chat",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_live_chat(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get_live_chat_replay": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {GetLiveChat} */
				data: as(x),
			};
			case "get_live_chat": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {GetLiveChat} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["att",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_res_att(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {R_AttGet} */
				data: as(x),
			};
			case "log": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {R_AttLog$RC} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["account",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_account(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "account_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_AccountMenu} */
				data: as(x),
			};
			case "accounts_list": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R_AccountsList} */
				data: as(x),
			};
			case "set_setting": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {AccountSetSetting} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["pdg",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_pdg(t,x) {
		switch(t[1]) {
			case "get_pdg_buy_flow": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {GetPdgBuyFlow} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["music",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_music(t,x) {
		switch(t[1]) {
			case "get_search_suggestions": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {R_GetSearchSuggestions} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["share",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_share(t,x) {
		switch(t[1]) {
			case "get_share_panel": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {GetSharePanel} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["playlist",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_playlist(t,x) {
		switch(t[1]) {
			case "get_add_to_playlist": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {R_GetAddToPlaylist} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["subscription",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_subscription(t,x) {
		switch(t[1]) {
			case "subscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {R_Subscribe} */
				data: as(x),
			};
			case "unsubscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {R_Unsubscribe} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<UrlTypes, ".">,["browse",...any]>} t @arg {{}} x @returns {_ResponseTypes|null} */
	convert_browse(t,x) {
		switch(t.length) {
			case 2: switch(t[1]) {
				case "edit_playlist": return {
					type: `${t[0]}.${t[1]}`,
					/** @private @type {R_BrowseEditPlaylist} */
					data: as(x),
				};
			}
			case 1: break;
		}
		switch(t[0]) {
			case "browse": return {
				type: t[0],
				/** @type {R_Browse} */
				data: as(x),
			};
		}
	}
	/** @public @arg {Extract<Split<UrlTypes, ".">,["like",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_like(target,x) {
		switch(target[1]) {
			default: debugger; break; case "dislike": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {R_Dislike} */
				data: as(x),
			}; case "like": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {R_LikeLike} */data: as(x),
			}; case "removelike": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {R_LikeRemoveLike} */data: as(x),
			};
		}
		return null;
	}
	/** @public @arg {true} x */
	expect_true(x) {
		if(x!==true) debugger;
	}
	/** @public @arg {string} cf @arg {string} x */
	trackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @public @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] */
	codegen_new_typedef(x,gen_name,ret_val) {
		return this.codegen.codegen_new_typedef(x,gen_name,ret_val);
	}
	/** @public @arg {string} cf @arg {string} x */
	clickTrackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @type {string[]} */
	known_target_id=[];
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {
		return this.str_starts_with(needle,str);
	}
	/** @public @arg {string} root @arg {YtTargetIdType} x */
	targetId(root,x) {
		const cf="targetId";
		this.save_string(`[${root}.${cf}]`,x);
		this.parser.parse_target_id(x);
		if(this.str_starts_with_r(x,"comment-replies-item-")) return;
		if(this.str_starts_with_r(x,"shopping_panel_for_entry_point_")) {
			switch(x) {
				case "shopping_panel_for_entry_point_22": return;
				case "shopping_panel_for_entry_point_5": return;
				default:
			}
			if(!this.known_target_id.includes(x)) {
				this.known_target_id.push(x);
				console.log("[target_id.shopping_panel_for_entry_point] [%s]",x);
			}
			return;
		}
		if(this.str_starts_with_r(x,"browse-feed")) {
			return this.parser.parse_target_id(x);
		};
		switch(x) {
			case "clip-info-button": return;
			case "comments-section": return;
			case "engagement-panel-ads": return;
			case "engagement-panel-clip-create": return;
			case "engagement-panel-comments-section": return;
			case "engagement-panel-macro-markers-description-chapters": return;
			case "engagement-panel-searchable-transcript-search-panel": return;
			case "engagement-panel-searchable-transcript": return;
			case "engagement-panel-structured-description": return;
			case "engagement-panel-macro-markers-auto-chapters": return;
			case "feed_filter_chip_bar_second_chip": return;
			case "search-feed": return;
			case "search-page": return;
			case "sponsorships-button": return;
			case "watch-next-feed": return;
			case "browse-video-menu-button": return;
			default: x===""; console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`);
		}
	}
	/** @public @arg {[D__VE3832$PreconnectUrl]} x */
	parse_preconnect_arr(x) {
		if(x.length!==1) debugger;
		this.parse_preconnect_url(x[0]);
	}
	/** @private @arg {D__VE3832$PreconnectUrl} x */
	parse_preconnect_url(x) {
		let up=this.parse_with_url_parse(x);
		if(up.pathname!=="/generate_204") debugger;
		let ss1=split_string(up.host,".");
		if(ss1.length!==3) debugger;
		if(ss1[1]!=="googlevideo") debugger;
		if(ss1[2]!=="com") debugger;
		let ss2=split_string(ss1[0],"---");
		if(!this.str_starts_with(ss2[0],"rr")) debugger;
		let ss3=split_string_once(ss2[0],"rr")[1];
		let ss4=split_string_once(ss2[1],"sn-nx")[1];
		console.log("google video rr [%s] sn-nx [%s]",ss3,ss4);
		/** @typedef {SplitIntoGroups<typeof ss4,`${string}`>} PartGroups */
		/** @typedef {Extract<PartGroups,["57",...any]>} PartGroups_1 */
		/** @typedef {Extract<PartGroups,["5s",...any]>} PartGroups_2 */
		if(this.str_starts_with(ss4,"57yn")) {
			/** @type {PartGroups_1[2]} */
			let ss5=as(ss4.slice(4));
			switch(ss5) {
				case "lk": break;
				case "sd": break;
				case "se": break;
				case "sk": break;
				case "sl": break;
				case "ss": break;
				case "sz": break;
				default: debugger;
			}
		} else if(this.str_starts_with(ss4,"5s7n")) {
			/** @type {PartGroups_2[2]} */
			let ss5=as(ss4.slice(4));
			switch(ss5) {
				case "76": break;
				case "7d": break;
				case "7s": break;
				case "7y": break;
				case "7z": break;
				case "ee": break;
				case "el": break;
				default: debugger;
			}
		} else {
			debugger;
		}
	}
	/** @public @arg {ParamsSection} root @arg {WatchPageUrl} x */
	parse_watch_page_url(root,x) {
		let u1=split_string_once(x,"/")[1];
		let u2=split_string_once(u1,"?")[1];
		let u3=this.parse_url_search_params(u2);
		let u4=this.get_keys_of(u3);
		x: {
			if(this.eq_keys(u4,["v"])) break x;
			if(this.eq_keys(u4,["v","pp"])) break x;
			if(this.eq_keys(u4,["v","t"])) break x;
			if(this.eq_keys(u4,["v","list","start_radio"])) break x;
			if(this.eq_keys(u4,["v","list","index"])) break x;
			debugger;
		}
		this.parser.parse_url(root,x);
		return u3;
	}
	/** @public @arg {string} x */
	videoId(x) {
		this.primitive_of(x,"string");
		this.x.get("indexed_db").put({v: x});
	}
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	params(root,path,x) {
		this.parser.on_endpoint_params(root,path,x);
	}
	/** @public @arg {PlaylistId} x */
	playlistId(x) {
		this.parser.parse_playlist_id(x);
	}
	/** @public @arg {Extract<G_WC$Metadata,{rootVe:any}>['rootVe']} x */
	on_root_visual_element(x) {
		this.ds.save_root_visual_element(x);
		/** @private @type {`${typeof x}`} */
		let ss=`${x}`;
		switch(ss) {
			case "3611": return;
			case "3832": return;
			case "3854": return;
			case "4724": return;
			case "5754": return;
			case "6827": return;
			case "11487": return;
			case "23462": return;
			case "37414": return;
			case "83769": return;
			case "96368": return;
			default: {
				/** @type {G_WC$Metadata[]} */
				let x=[]; x;
			}
		}
		switch(ss) {
			default: debugger;
		}
	}
	/** @public @arg {BrowseIdType} x */
	browseId(x) {
		this.parser.parse_browse_id(x);
	}
	/** @public @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {
		if(!this.str_starts_with_r(x,"/@")) debugger;
	}
	/** @public @arg {string} x */
	previousCsn(x) {
		console.log(base64_dec.decode_str(x));
	}
	/** @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {
		return this.str_starts_with(x.targetId,w);
	}
	/** @public @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	playerParams(root,path,x) {
		this.parser.on_player_params(root,path,x);
	}
	/** @public @arg {Extract<G_WC$Metadata,{rootVe:any}>['rootVe']} x */
	rootVe(x) {
		this.on_root_visual_element(x);
	}
}
//#endregion
//#endregion
//#region HandleTypes
class HandleTypes extends ServiceMethods {
	/** @private */
	//@ts-expect-error(6133)
	minimal_handler_member_use() {
		this.minimal_handler_member_2({});
	}
	//#region templates
	/** @private @template {{}} T @arg {T$R_ItemSection$1<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	T$R_ItemSection$1(x,f) {this.H$R_("T$R_ItemSection$1",x,a => this.T$D__ItemSection$CommentsEntryPoint(a,f));}
	/** @template {{}} T @arg {{items: T[]}} x @arg {(this:this,x:T)=>void} f */
	ItemsTemplate(x,f) {
		const cf/**/="ItemsTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(this.w(x),f);
	}
	/** @template {{}} T @arg {T$Contents<T[]>} x @arg {(this:this,x:T)=>void} f */
	ContentsArrayTemplate(x,f) {
		const cf="ContentsArrayTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(this.w(x),f);
	}
	/** @template CT,T,U @arg {T$R_ItemSection<CT,T,U>} x @arg {(this:this,x:[CT[],T,U])=>void} f */
	ItemSectionRendererTemplate(x,f) {
		const cf="ItemSectionRendererTemplate";
		this.save_keys(`[${cf}]`,x);
		this.ItemSectionDataTemplate(this.w(x),f);
	}
	/** @template CT,T,U @arg {T$D__ItemSection<CT,T,U>} x @arg {(this:this,x:[CT[],T,U])=>void} f */
	ItemSectionDataTemplate(x,f) {
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=x; this.g(y); // ! #destructure
		f.call(this,[contents,sectionIdentifier,targetId]);
		this.trackingParams("ItemSectionData",trackingParams);
		let k=this.get_keys_of(contents);
		switch(k[0]) {
			default: debugger; break;
		}
	}
	/** @template T @arg {T$Command<T>} x @arg {(this:this,x:T)=>void} f */
	CommandTemplate(x,f) {
		const cf="CommandTemplate";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,...y}=x;
		this.trackingParams(cf,trackingParams);
		f.call(this,this.w(y));
	}
	/** @template {{}} T @arg {T$Commands<T>} x @arg {(this:this,x:T)=>void} f */
	CommandsTemplate(x,f) {
		const cf="CommandsTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(this.w(x),f);
	}
	/** @template U @template {{}} T @template {T$Commands<T>} C @arg {C} x @arg {(this:this,x:T)=>U} f @returns {[Omit<C, "commands">,[Extract<U, {}>[], Extract<U, void>[]]]}  */
	CommandsTemplate$Omit(x,f) {
		const cf="CommandsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {commands,...y}=x;
		let ca=this.z(commands,f);
		return [y,ca];
	}
	/** @private @arg {string} cf @arg {(this:this,x:NonNullable<T['commandMetadata']>)=>void} f_v$m @template {{}} U @template {{}} V$M @template {T$Endpoint<U,V$M>} T @arg {T} x @arg {(this:this,x:Omit<T,"clickTrackingParams"|"commandMetadata">)=>void} f */
	T$Endpoint(cf,x,f,f_v$m) {
		const {clickTrackingParams,commandMetadata,...y}=x;
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		this.t(commandMetadata,a => f_v$m.call(this,a));
		this.save_keys("[ServiceEndpointTemplate]",y);
		f.call(this,y);
	}
	/** @template T @arg {T$Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	AutoplayTemplate(x,f) {
		const cf="AutoplayTemplate";
		this.save_keys(`[${cf}]`,x);
		const {autoplay,...y}=x; this.g(y); // ! #destructure
		f.call(this,autoplay);
	}
	/** @template T @arg {T$Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	PlaylistTemplate(x,f) {
		const cf="PlaylistTemplate";
		this.save_keys(`[${cf}]`,x);
		const {playlist,...y}=x; this.g(y); // ! #destructure
		f.call(this,playlist);
	}
	/** @template T @arg {T$ResultsTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	ResultsTemplate(x,f) {
		const cf="ResultsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {results,...y}=x; this.g(y); // ! #destructure
		f.call(this,results);
	}
	/** @template T @arg {T$SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	SecondaryResultsTemplate(x,f) {
		const cf="SecondaryResultsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {secondaryResults,...y}=x; this.g(y); // ! #destructure
		f.call(this,secondaryResults);
	}
	/** @template {number} T @arg {T$TypesTemplate<T>} x @arg {T|null} _x @returns {T} */
	TypesTemplate(x,_x=null) {
		/** @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {
			return as(Number.parseInt(x,10));
		}
		return parse_number(x.types,_x);
	}
	/** @private @template {{}} T @arg {T$D__ItemSection$1<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	T$D__ItemSection$CommentsEntryPoint(x,f) {
		const cf="ItemSectionDataTemplate_Section";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,sectionIdentifier,...y}=x; this.g(y); // ! #destructure
		this.z(contents,f);
		this.trackingParams("ItemSectionData",trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @private @arg {R_SimpleText} x @arg {(this:this,x:{accessibility?:D__Accessibility})=>void} f */
	D__SimpleText(x,f=this.handle_accessibility) {
		const cf="SimpleText";
		this.save_keys(`[${cf}]`,x);
		const {simpleText,...y}=x; f.call(this,y);
		this.primitive_of_string(simpleText);
	}
	//#endregion
	//#region web_command_metadata
	/** @private @arg {G_WC$Metadata} x */
	WebCommandMetadata(x) {
		const cf="GenericWebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x&&"apiUrl" in x) {
			switch(x.rootVe) {
				case 3854: return this.G_VE3854$WC$Metadata(x);
				default: debugger; break;
			}
		}
		if("apiUrl" in x) {
			let cx=x.apiUrl;
			switch(x.apiUrl) {
				default: {
					let path_parts=split_string(split_string_once(cx,"/")[1],"/");
					let url_type=this.parser.get_url_type(path_parts);
					if(!url_type) {
						debugger;
						return;
					}
					let url_type_ex=this.join_string(split_string(url_type,"."),"$");
					/** @private @arg {G_WC$Metadata} x */
					let typedef_str=this.codegen_new_typedef(x,`G_${url_type_ex}`,true);
					console.log(`
					-- [GeneratedWebCommandMetadata] --\n\n${typedef_str}
					---\n\n\tG_${url_type_ex},
					---\n\n\tcase "${cx}": return this.GeneratedWebCommandMetadata(x);`);
					debugger;
				} break;
				case "/youtubei/v1/backstage/create_post": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/like/removelike": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/like/like": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/notification/opt_out": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/notification/record_interactions": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/playlist/create": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/flag/get_form": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/subscription/subscribe": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/feedback": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/browse": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/account/account_menu": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/notification/get_unseen_count": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/notification/get_notification_menu": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/get_transcript": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/next": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/share/get_share_panel": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/browse/edit_playlist": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/playlist/get_add_to_playlist": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/account/set_setting": return this.GeneratedWebCommandMetadata(x);
				case "/youtubei/v1/ypc/get_offers": return this.GeneratedWebCommandMetadata(x);
			}
			return;
		}
		if("rootVe" in x) {
			let cx=x.rootVe;
			switch(x.rootVe) {
				default: {
					/** @private @arg {G_WC$Metadata} x */
					this.codegen_new_typedef(x,`G_VE${cx}`);
					console.log(`\n\tG_VE${cx},`);
					console.log(`\n\tcase ${cx}: return this.GeneratedWebCommandMetadata(x);`);
				} break;
				case 3832: return this.G_VE3832$Watch$WC$Metadata(x);
				case 4724: return this.GeneratedWebCommandMetadata(x);
				case 6827: return this.GeneratedWebCommandMetadata(x);
				case 11487: return this.GeneratedWebCommandMetadata(x);
				case 96368: return this.GeneratedWebCommandMetadata(x);
				case 83769: return this.GeneratedWebCommandMetadata(x);
				case 37414: return this.GeneratedWebCommandMetadata(x);
			}
			return;
		}
		if("sendPost" in x) {
			const {sendPost,...y}=x; this.g(y);
			if(sendPost!==true) debugger;
			return;
		}
		debugger;
	}
	/** @private @arg {G_VE3832$Watch$WC$Metadata} x */
	G_VE3832$Watch$WC$Metadata(x) {
		const {url,webPageType,rootVe,...y}=x; this.g(y);
		x: {if(this.str_starts_with("/watch?",url)) break x; debugger;}
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
		if(rootVe!==3832) debugger;
	}
	/** @private @arg {G_VE3854$WC$Metadata} x */
	G_VE3854$WC$Metadata(x) {
		const {url,webPageType,rootVe,apiUrl,...y}=x; this.g(y);
		x: {
			if(url==="/") break x;
			debugger;
		}
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==3854) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {G_WC$Metadata} x */
	GeneratedWebCommandMetadata(x) {
		if("apiUrl" in x&&"sendPost" in x) {
			const {sendPost,apiUrl}=x;
			this.primitive_of(sendPost,"boolean");
			this.parser.parse_url("GeneratedWebCommandMetadata",apiUrl);
		}
	}
	//#endregion {E$}
	//#region general done
	/** @private @arg {string} cf @public @template {{}} T @arg {T} x */
	H$Data(cf,x) {this.save_keys(`[D__${cf}]`,x);}
	/** @template {GetMaybeKeys<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>void} f */
	H$R_(cf,x,f) {
		this.save_keys(`[R_${cf}]`,x);
		f.call(this,this.w(x));
	}
	/** @private @arg {R_Button} x */
	R_Button(x) {this.H$R_("Button",x,this.D__Button);}
	/** @private @arg {R_HotkeyDialogSection} x */
	R_HotkeyDialogSection(x) {this.H$R_("HotkeyDialogSection",x,this.D__HotkeyDialogSection);}
	/** @private @arg {R_HotkeyDialogSectionOption} x */
	R_HotkeyDialogSectionOption(x) {this.H$R_("HotkeyDialogSectionOption",x,this.D__HotkeyDialogSectionOption);}
	/** @private @arg {R_PlayerOverlayVideoDetails} x */
	R_PlayerOverlayVideoDetails(x) {this.H$R_("PlayerOverlayVideoDetails",x,this.D__PlayerOverlayVideoDetails);}
	/** @private @arg {R_CinematicContainer} x */
	R_CinematicContainer(x) {this.H$R_("CinematicContainer",x,this.D__CinematicContainer);}
	/** @private @arg {R_WatchPage} x */
	R_WatchPage(x) {
		const cf="WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: this.R_VE3832_WatchPage(x); break;
			default: debugger; break;
		} else {
			this.R_Generic_WatchPage(x);
		}
	}
	/** @private @arg {R_WatchPage$1} x */
	R_Generic_WatchPage(x) {
		const cf="Generic_WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=x; this.g(y); // ! #destructure
		this.E$WatchEndpoint(endpoint);
		this.R_Watch(response);
		this.R_Player(playerResponse);
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @private @arg {R_VE3832$WatchPage} x */
	R_VE3832_WatchPage(x) {
		const cf="WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page: {},preconnect,playerResponse,response,...y}=x; this.g(y); // ! #destructure
		if(rootVe!==3832) debugger;
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[VE3832.${cf}.wp_params]`,wp_params);
		this.E$WatchEndpoint(endpoint);
		if(preconnect!==void 0) this.parse_preconnect_arr(preconnect);
		this.R_Player(playerResponse);
		this.R_Watch(response);
	}
	/** @private @arg {R_Watch} x */
	R_Watch(x) {
		const cf="WatchResponse";
		this.save_keys(`[${cf}]`,x);
		this.x.get("yt_plugin").add_function({
			name: "data",
			data: {
				R_Watch: x,
			},
		});
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=x; this.g(y); // ! #destructure
		this.RC$ResponseContext(responseContext);
		this.A_TwoColumnWatchNextResults(contents);
		this.E$WatchEndpoint(currentVideoEndpoint);
		this.trackingParams("WatchResponse",trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,a => this.EI$ResponseReceived("WatchResponse",a));
		this.z(engagementPanels,_x => {debugger;});
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,this.R_CinematicContainer);
		this.FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {R_TwoColumnWatchNextResults} x */
	A_TwoColumnWatchNextResults(x) {this.H$R_("TwoColumnWatchNextResults",x,this.D__TwoColumnWatchNextResults);}
	/** @private @arg {R_PlayerOverlay} x */
	R_PlayerOverlay(x) {this.H$R_("NotificationAction",x,this.D__PlayerOverlay);}
	/** @private @arg {R_DesktopTopbar} x */
	R_DesktopTopbar(x) {this.H$R_("DesktopTopbar",x,this.D__DesktopTopbar);}
	/** @private @arg {R_TopbarLogo} x */
	R_TopbarLogo(x) {this.H$R_("DesktopTopbar",x,this.TopbarLogo);}
	/** @private @arg {R_FusionSearchbox} x */
	R_X_FusionSearchbox(x) {this.H$R_("DesktopTopbar",x,this.FusionSearchboxData);}
	/** @private @arg {D__DesktopTopbar} x */
	D__DesktopTopbar(x) {
		const cf="DesktopTopbar";
		this.save_keys(`[D__${cf}]`,x);
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=x; this.g(y); // ! #destructure
		this.R_TopbarLogo(logo);
		this.R_X_FusionSearchbox(searchbox);
		this.trackingParams(cf,trackingParams);
		if(countryCode!=="CA") debugger;
		this.z(topbarButtons,this.TopbarButtonItem);
		this.R_HotkeyDialog(hotkeyDialog);
		this.R_Button(backButton);
		this.R_Button(forwardButton);
		this.R_Button(a11ySkipNavigationButton);
		this.R_Button(voiceSearchButton);
	}
	/** @private @arg {R_HotkeyDialog} x */
	R_HotkeyDialog(x) {this.H$R_("HotkeyDialog",x,this.D__HotkeyDialog);}
	/** @private @arg {A_FrameworkUpdates} x */
	FrameworkUpdates(x) {
		const cf="FrameworkUpdates";
		this.save_keys(`[${cf}]`,x);
		const {entityBatchUpdate,elementUpdate,...y}=x; this.g(y); // ! #destructure
		this.D__EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.ElementUpdate);
	}
	/** @private @arg {R_BrowseEditPlaylist} x */
	R_BrowseEditPlaylist(x) {
		const cf="BrowseEditPlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=x; this.g(y); // ! #destructure
		if(status!=="STATUS_SUCCEEDED") debugger;
		this.z(actions,a => {
			a;
			debugger;
		});
		this.z(playlistEditResults,this.g);
		this.trackingParams(cf,trackingParams);
	}
	log_url=false;
	/** @private @arg {R_BrowsePage} x */
	R_BrowsePage(x) {
		const cf="BrowsePageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page,response,expirationTime,previousCsn,...y}=x; this.g(y); // ! #destructure
		this.t(rootVe,a => this.save_number("[R_BrowsePage.rootVe]",a));
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.E$Browse(endpoint);
		if(page!=="browse") debugger;
		this.R_Browse(response);
		this.t(expirationTime,a => this.primitive_of(a,"number"));
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @private @arg {E$Browse} x */
	E$Browse(x) {
		const cf="Browse";
		this.save_keys(`[E$${cf}]`,x);
		this.T$Endpoint("E$Browse",x,a => {
			let u=this.w(a);
			let {browseId,...y}=u; this.g(y);
			switch(u.browseId) {
				case "SPaccount_notifications": break;
				case "FEwhat_to_watch": break;
				default: debugger; break;
			};
		},x => {
			let y=this.w(x);
			switch(y.rootVe) {
				case 3854: this.G_VE3854$WC$Metadata(y); break;
				case 23462: this.G_VE23462$WC$Metadata(y); break;
				default: debugger; break;
			}
			this.WebCommandMetadata(this.w(x));
		});
		x;
	}
	/** @private @arg {G_VE23462$WC$Metadata} x */
	G_VE23462$WC$Metadata(x) {
		const cf="VE23462.Metadata";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,webPageType,...y}=x; this.g(y);
		if(webPageType!=="WEB_PAGE_TYPE_SETTINGS") debugger;
	}
	/** @public @arg {D__Browse$Id<"">} x */
	E$D__Browse(x) {
		const cf="D__Browse";
		this.save_keys(`[${cf}]`,x);
		const {browseId,...y}=x; this.g(y);
		if(x.browseId!=="") debugger;
	}
	/** @private @arg {RC$ResponseContext} x */
	RC$ResponseContext(x) {
		const cf="ResponseContext";
		this.save_keys(`[${cf}]`,x);
		const service_tracking=this.x.get("service_tracking");
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=x; this.g(y); // ! #destructure
		this.t(mainAppWebResponseContext,this.MainAppWebResponseContext);
		this.z(serviceTrackingParams,a => service_tracking.set_service_params(a));
		this.t(webResponseContextExtensionData,this.WebResponseContextExtensionData);
		this.t(consistencyTokenJar,this.ConsistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.primitive_of(maxAgeSeconds,"number");
		this.t(stateTags,this.RelevantStateTags);
	}
	/** @private @arg {RC$A_RelevantStateTags} x */
	RelevantStateTags(x) {
		const cf="RelevantStateTags";
		this.save_keys(`[${cf}]`,x);
		const {relevantStateTags,...y}=x; this.g(y); // ! #destructure
		this.z(relevantStateTags,this.StateTag);
	}
	/** @private @arg {RC$ConsistencyTokenJar} x */
	ConsistencyTokenJar(x) {
		const cf="ConsistencyTokenJar";
		this.save_keys(`[${cf}]`,x);
		const {encryptedTokenJarContents,expirationSeconds,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @private @arg {RC$WebResponseContextExtensionData} x */
	WebResponseContextExtensionData(x) {
		const cf="WebResponseContextExtensionData";
		this.save_keys(`[${cf}]`,x);
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=x; this.g(y); // ! #destructure
		if(hasDecorated!==void 0) this.primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,this.YtConfigData);
		this.t(webPrefetchData,this.WebPrefetchData);
	}
	/** @private @arg {D__YtConfig} x */
	YtConfigData(x) {
		const cf="YtConfigData";
		this.save_keys(`[${cf}]`,x);
		const {visitorData,sessionIndex,rootVisualElementType,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(visitorData);
		if(sessionIndex!==0) debugger;
		/** @type {`${typeof rootVisualElementType}`} */
		let s=`${rootVisualElementType}`;
		switch(s) {
			case "3611": return;
			case "3832": return;
			case "3854": return;
			case "4724": return;
			case "5754": return;
			case "6827": return;
			case "11487": return;
			case "23462": return;
			case "37414": return;
			case "83769": return;
			case "96368": return;
			default: debugger; break;
		}
	}
	/** @private @arg {D__WebPrefetch} x */
	WebPrefetchData(x) {
		const cf="WebPrefetchData";
		this.save_keys(`[${cf}]`,x);
		const {navigationEndpoints,...y}=x; this.g(y); // ! #destructure
		this.z(navigationEndpoints,a => {
			if("watchEndpoint" in a) {
				return this.E$WatchEndpoint(a);
			}
			debugger;
		});
	}
	/** @private @arg {RC$MainAppWebResponseContext} x */
	MainAppWebResponseContext(x) {
		const cf="MainAppWebResponseContext";
		this.save_keys(`[${cf}]`,x);
		const {datasyncId,loggedOut,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(datasyncId);
		this.primitive_of(loggedOut,"boolean");
	}
	/** @private @arg {R_Browse} x */
	R_Browse(x) {
		const cf="BrowseResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,...y1}=x;
		this.RC$ResponseContext(responseContext);
		this.t(header,this.BrowseHeader);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedActions,this.ResponseReceivedAction);
		this.t(contents,this.BrowseContents);
		const {topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,...y2}=y1;
		this.t(topbar,this.R_DesktopTopbar);
		this.t(frameworkUpdates,this.R_EntityBatchUpdate);
		this.t(sidebar,this.BrowseSidebar);
		this.tz(observedStateTags,this.StateTag);
		this.t(cacheMetadata,this.CacheMetadata);
		const {metadata,microformat,maxAgeStoreSeconds,background,...y3}=y2;
		this.t(metadata,this.BrowseMetadata);
		this.t(microformat,this.R_MicroformatData);
		this.t(maxAgeStoreSeconds,a => this.primitive_of(a,"number"));
		this.t(background,this.R_MusicThumbnail);
		const {continuationContents,alerts,...y}=y3; this.g(y);
		this.t(continuationContents,_x => {debugger;});
		this.t(alerts,a => this.Response_alerts(cf,a));
	}
	/** @private @arg {{}} x */
	R_MicroformatData(x) {this.emf("R_MicroformatData",x);}
	/** @private @arg {R_EntityBatchUpdate} x */
	R_EntityBatchUpdate(x) {this.H$R_("NotificationAction",x,this.D__EntityBatchUpdate);}
	/** @private @arg {NonNullable<R_Browse['metadata']>} x */
	BrowseMetadata(x) {this.emf("BrowseMetadata",x);}
	/** @private @arg {string} cf @arg {{}} x */
	emf(cf,x) {this.save_keys(`[${cf}]`,x); debugger;}
	/** @private @arg {BrowseSidebar} x */
	BrowseSidebar(x) {
		if("settingsSidebarRenderer" in x) return this.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.R_PlaylistSidebar(x);
		debugger;
	}
	/** @private @arg {{}} x */
	R_SettingsSidebar(x) {this.emf("SettingsSidebarRenderer",x);}
	/** @public @arg {D__Dropdown} x */
	DropdownData(x) {
		const {entries,label,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(label);
		this.z(entries,x => {
			if("privacyDropdownItemRenderer" in x) {
				return;
			}
			this.do_codegen("Dropdown",x);
		});
	}
	/** @private @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H$R_("PlaylistSidebar",x,this.D__PlaylistSidebar);}
	/** @private @arg {D__PlaylistSidebar} x */
	D__PlaylistSidebar(x) {
		const cf="PlaylistSidebar";
		this.save_keys(`[${cf}]`,x);
		this.z(x.items,this.PlaylistSidebarItem);
		this.trackingParams(cf,x.trackingParams);
	}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.emf("PlaylistSidebarPrimaryInfoRenderer",x);}
	/** @private @arg {PlaylistSidebarItem} x */
	PlaylistSidebarItem(x) {
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		debugger;
	}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {
		x; debugger;
	}
	/** @public @arg {D__AlertWithButton} x */
	AlertWithButton(x) {
		const cf="AlertWithButton";
		this.save_keys(`[${cf}]`,x);
		const {type,text,dismissButton,...y}=x; this.g(y); // ! #destructure
		switch(type) {
			case "INFO": break;
			default: debugger;
		}
		this.D__SimpleText(text);
		this.R_Button(dismissButton);
	}
	/** @private @arg {D__Label} x */
	D__Label(x) {this.H$R_("Label",x,this.primitive_of_string);}
	/** @private @arg {D__Accessibility} x */
	D__Accessibility(x) {this.H$R_("A_Accessibility",x,this.D__Label);}
	/** @private @arg {D__Button} x */
	D__Button(x) {
		const cf="ButtonData";
		this.save_keys(`[${cf}]`,x);
		const {accessibility,accessibilityData,command,icon,isDisabled,serviceEndpoint,navigationEndpoint,tooltip,size,style,text,trackingParams,hint,targetId,...y}=x; this.g(y); // ! #destructure
		if(accessibility) return this.D__Label(accessibility);
		this.t(accessibilityData,this.D__Accessibility);
		this.t(command,this.ButtonCommand);
		this.t(icon,this.T$Icon);
		if(isDisabled!==void 0) this.primitive_of(isDisabled,"boolean");
		this.t(serviceEndpoint,this.Button_serviceEndpoint);
		this.t(navigationEndpoint,this.Button_navigationEndpoint);
		if(tooltip&&typeof tooltip!=="string") debugger;
		if(size) {
			switch(size) {
				default: debugger; break;
				case "SIZE_DEFAULT": break;
				case "SIZE_SMALL": break;
			}
		}
		this.t(style,a => this.save_string("[Button.style]",a));
		this.t(text,this.G_Text);
		this.t_cf(cf,trackingParams,this.trackingParams);
		this.t(hint,_x => {debugger;});
		this.t(targetId,a => {
			/** @type {D__Button$TargetId} */
			switch(a) {
				case "clip-info-button": break;
				case "sponsorships-button": return;
				default: console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`); debugger;
			}
			this.targetId(cf,a);
		});
	}
	/** @public @arg {D__ThumbnailOverlayLoadingPreview} x */
	D__ThumbnailOverlayLoadingPreview(x) {
		const cf_="D__ThumbnailOverlayLoadingPreview";
		this.save_keys(`[${cf_}]`,x);
		this.D__TextWithRuns(this.w(x));
	}
	/** @public @arg {D__PdgBuyFlowHeader} x */
	D__PdgBuyFlowHeader(x) {
		const cf="D__PdgBuyFlowHeader";
		this.save_keys(`[${cf}]`,x);
		const {}=x;
		this.codegen_renderer(cf,x);
		debugger;
	}
	/** @private @arg {string} cf @arg {{}} x */
	codegen_renderer(cf,x) {
		this.codegen.generate_renderer(x,cf);
	}
	/** @private @arg {R_G_Result} x */
	R_Result(x) {
		const cf="ResultRenderer";
		this.save_keys(`[${cf}]`,x);
		if("tabRenderer" in x) return this.R_Tab(x);
		if("expandableTabRenderer" in x) return this.R_ExpandableTab(x);
		debugger;
	}
	/** @private @arg {R_Tab} x */
	R_Tab(x) {this.H$R_("Tab",x,this.D__Tab);}
	/** @private @arg {D__Tab} x */
	D__Tab(x) {
		const cf="Tab";
		this.save_keys(`[${cf}]`,x);
		{x;}
	}
	/** @private @arg {R_ExpandableTab} x */
	R_ExpandableTab(x) {this.H$R_("R_ExpandableTab",x,this.D__ExpandableTab);}
	/** @private @arg {D__ExpandableTab} x */
	D__ExpandableTab(x) {
		const cf="ExpandableTab";
		this.save_keys(`[${cf}]`,x);
		{x;}
	}
	/** @private @arg {E$Continuation} x */
	ContinuationCommand(x) {
		if(!x) {debugger; return;}
		const cf="ContinuationCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,continuationCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams("ContinuationCommand",clickTrackingParams);
		if(commandMetadata) {
			if("apiUrl" in commandMetadata.webCommandMetadata) {
				return this.WebCommandMetadata(commandMetadata.webCommandMetadata);
			}
			debugger;
		}
		this.ContinuationCommandData(continuationCommand);
	}
	/** @private @arg {CD__Continuation} x */
	ContinuationCommandData(x) {
		const cf="ContinuationCommandData";
		this.save_keys(`[${cf}]`,x);
		this.primitive_of(x.token,"string");
		this.save_enum("CONTINUATION_REQUEST_TYPE",x.request);
	}
	/** @private @arg {D__Thumbnail} x */
	D__Thumbnail(x) {
		const cf="D__Thumbnail";
		this.save_keys(`[${cf}]`,x);
		const {sampledThumbnailColor,accessibility,isOriginalAspectRatio,...y}=x;
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D__Accessibility);
		this.z(this.w(y),this.D__ThumbnailItem);
	}
	/** @private @arg {D__ThumbnailItem} x */
	D__ThumbnailItem(x) {
		const cf="D__ThumbnailItem";
		this.save_keys(`[${cf}]`,x);
		const {url,width,height,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(url);
		this.t(width,a => this.primitive_of(a,"number"));
		this.t(height,a => this.primitive_of(a,"number"));
	}
	/** @public @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail";
		this.save_keys(`[${cf}]`,x);
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=x; this.g(y); // ! #destructure
		this.E$PageEndpoint(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this.primitive_of(fromHistory,"boolean");
		this.primitive_of(navigationDoneMs,"number");
	}
	/** @private @arg {YTNavigateFinishDetail['endpoint']} x */
	E$PageEndpoint(x) {
		if(!("clickTrackingParams" in x)) return;
		if("browseEndpoint" in x) return;
		if("watchEndpoint" in x) return;
		debugger;
	}
	/** @private @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType";
		this.save_keys(`[${cf}]`,x);
		this.RC$ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.R_BrowsePage(x);
			case "watch": return this.R_WatchPage(x);
			case "channel": return this.R_ChannelPage(x);
			case "playlist": return this.R_PlaylistPage(x);
			case "settings": return this.R_SettingsPage(x);
			case "shorts": return this.R_ShortsPage(x);
			case "search": return this.R_SearchPage(x);
			default: break;
		}
		console.log("pt",x);
		debugger;
	}
	/** @private @arg {R_AccountMenu} x */
	R_AccountMenu(x) {
		const cf="AccountMenuResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(actions,x => {
			if("openPopupAction" in x) return this.A_OpenPopupAction(x);
			debugger;
			return null;
		});
		this.trackingParams("AccountMenuResponse",trackingParams);
	}
	/** @public @arg {Response} response @arg {_ResponseTypes} x */
	ResponseTypes(response,x) {
		const cf="ResponseTypes";
		this.save_keys(`[${cf}]`,x);
		if(!response.ok) {
			console.log("not ok",x);
			return;
		}
		/** @private @arg {{type:string}} x */
		let g=x => {
			return this.save_string("[need_api_type]",x.type);
		};
		switch(x.type) {
			case "_Generic": return g(x);
		}
		this._current_response_type=x.type;
		/** @type {{data:{responseContext:RC$ResponseContext;}}} */
		let v=x;
		this.RC$ResponseContext(v.data.responseContext);
		x: if("actions" in x.data) {
			if(x.type==="account.account_menu") break x;
			if(x.type==="browse.edit_playlist") break x;
			if(x.type==="like.dislike") break x;
			if(x.type==="notification.get_notification_menu") break x;
			if(x.type==="notification.get_unseen_count") break x;
			if(x.type==="notification.modify_channel_preference") break x;
			if(x.type==="share.get_share_panel") break x;
			if(x.type==="subscription.subscribe") break x;
			if(x.type==="subscription.unsubscribe") break x;
			if(x.type==="updated_metadata") break x;
			if(x.type==="get_transcript") break x;
			debugger;
		}
		switch(x.type) {
			case "account.account_menu": return this.R_AccountMenu(x.data);
			case "account.accounts_list": return this.R_AccountsList(x.data);
			case "account.set_setting": return this.R_SetSetting(x.data);
			case "att.get": return this.R_AttGet(x.data);
			case "att.log": return this.R_AttLog(x.data);
			case "browse.edit_playlist": return this.R_BrowseEditPlaylist(x.data);
			case "browse": return this.R_Browse(x.data);
			case "feedback": return this.R_Feedback(x.data);
			case "get_transcript": return this.R_GetTranscript(x.data);
			case "get_survey": return this.R_GetSurvey(x.data);
			case "getAccountSwitcherEndpoint": return this.R_E$GetAccountSwitcher(x.data);
			case "getDatasyncIdsEndpoint": return this.R_DatasyncIds(x.data);
			case "guide": return this.R_Guide(x.data);
			case "like.like": return this.R_LikeLike(x.data);
			case "like.dislike": return this.R_Dislike(x.data);
			case "like.removelike": return this.R_LikeRemoveLike(x.data);
			case "live_chat.get_live_chat_replay": return this.R_GetLiveChat(x.data);
			case "live_chat.get_live_chat": return this.R_GetLiveChat(x.data);
			case "music.get_search_suggestions": return this.R_GetSearchSuggestions(x.data);
			case "next": return this.R_Next(x.data);
			case "notification.get_notification_menu": return this.R_GetNotificationMenu(x.data);
			case "notification.get_unseen_count": return this.R_GetUnseenCount(x.data);
			case "notification.modify_channel_preference": return this.R_ModifyChannelPreference(x.data);
			case "notification.record_interactions": return this.R_Success(x.data);
			case "player": return this.R_Player(x.data);
			case "playlist.get_add_to_playlist": return this.R_GetAddToPlaylist(x.data);
			case "reel.reel_item_watch": return this.R_ReelItemWatch(x.data);
			case "reel.reel_watch_sequence": return this.R_ReelWatchSequence(x.data);
			case "share.get_share_panel": return this.R_GetSharePanel(x.data);
			case "subscription.subscribe": return this.R_Subscribe(x.data);
			case "subscription.unsubscribe": return this.R_Unsubscribe(x.data);
			case "search": return this.R_Search(x.data);
			case "updated_metadata": return this.R_UpdatedMetadata(x.data);
			case "pdg.get_pdg_buy_flow": return this.R_GetPdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @private @arg {R_GetSurvey} x */
	R_GetSurvey(x) {
		const cf="GetSurveyResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},trackingParams,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {GetPdgBuyFlow} x */
	R_GetPdgBuyFlow(x) {
		const cf="GetPdgBuyFlow";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=x; this.g(y); // ! #destructure
		this.A_OpenPopupAction(command);
		this.trackingParams(cf,trackingParams);
		this.FrameworkUpdates(frameworkUpdates);
	}
	/** @template T @arg {T$A_OpenPopup<T>} x */
	A_OpenPopupAction(x) {
		const cf="OpenPopupAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,...y}=x;
		this.clickTrackingParams(cf,clickTrackingParams);
		return this.w(y);
	}
	/** @private @arg {string} cf @arg {{}} x */
	do_codegen(cf,x) {
		let u_name=this.get_codegen_name(x);
		let gen_name=`${cf}$${u_name}`;
		this.codegen_new_typedef(x,gen_name);
	}
	/** @private @arg {{[U in string]: unknown}} x */
	get_codegen_name(x) {
		if(typeof x.type==='string') {
			return x.type.split(".").map(e => {
				if(e.includes("_")) {
					return e.split("_").map(e => this.uppercase_first(e)).join("");
				}
				return this.uppercase_first(e);
			}).join("$");
		}
		let rk=this.filter_keys(this.get_keys_of(x));
		let kk=rk[0];
		return this.uppercase_first(kk);
	}
	/** @template T @arg {T$R_ContinuationItem<T>} x */
	R_T$ContinuationItem(x) {
		const {continuationItemRenderer,...y}=x; this.g(y);
		return this.w(this.T$ContinuationItemData(continuationItemRenderer));
	}
	/** @template T @arg {T$D__ContinuationItem<T>} x */
	T$ContinuationItemData(x) {
		const {trigger,...y}=x;
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		return y;
	}
	/** @private @arg {R_Menu} x */
	R_Menu(x) {this.H$R_("NotificationAction",x,this.D__Menu);}
	/** @private @arg {UpdatedMetadata} x */
	R_UpdatedMetadata(x) {
		const cf="UpdatedMetadata";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},continuation,actions,...y}=x; this.g(y); // ! #destructure
		((_x) => {debugger;})(continuation);
		this.z(actions,a => {
			if("updateViewershipAction" in a) {
				return this.UpdateViewershipAction(a);
			} else if("updateToggleButtonTextAction" in a) {
				return this.UpdateToggleButtonTextAction(a);
			} else if("updateDateTextAction" in a) {
				return this.UpdateDateTextAction(a);
			} else if("updateTitleAction" in a) {
				return this.UpdateTitleAction(a);
			} else if("updateDescriptionAction" in a) {
				return this.UpdateDescriptionAction(a);
			}
			console.log(a);
		});
	}
	/** @private @arg {UpdateDescriptionAction} x */
	UpdateDescriptionAction(x) {
		const cf="UpdateDescriptionAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateDescriptionAction;
		this.save_keys(`[UpdateDescriptionActionData]`,x1);
		this.D__TextWithRuns(x1.description);
	}
	/** @private @arg {UpdateTitleAction} x */
	UpdateTitleAction(x) {
		const cf="UpdateTitleAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateTitleAction;
		this.save_keys(`[UpdateTitleActionData]`,x1);
		this.D__TextWithRuns(x1.title);
	}
	/** @private @arg {UpdateDateTextAction} x */
	UpdateDateTextAction(x) {
		const cf="UpdateDateTextAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateDateTextAction;
		this.save_keys(`[UpdateDateTextActionData]`,x1);
		this.D__SimpleText(x1.dateText);
	}
	/** @private @arg {UpdateToggleButtonTextAction} x */
	UpdateToggleButtonTextAction(x) {
		const cf="UpdateToggleButtonTextAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateToggleButtonTextAction; x1;
		this.save_keys(`[UpdateToggleButtonTextActionData]`,x1);
		if(x1.buttonId!=="TOGGLE_BUTTON_ID_TYPE_LIKE") debugger;
		this.D__SimpleText(x1.defaultText);
		this.D__SimpleText(x1.toggledText);
	}
	/** @private @arg {UpdateViewershipAction} x */
	UpdateViewershipAction(x) {
		const cf="UpdateViewershipAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateViewershipAction;
		this.save_keys(`[UpdateViewershipActionData]`,x1);
		((_x) => {debugger;})(x1.viewCount);
	}
	/** @private @arg {R_Search} x */
	R_Search(x) {
		const cf="SearchResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(estimatedResults);
		((_x) => {debugger;})(contents);
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(topbar);
		this.z(refinements,this.primitive_of_string);
		this.z(onResponseReceivedCommands,a => {
			if("adsControlFlowOpportunityReceivedCommand" in a) {
				return this.AdsControlFlowOpportunityReceivedCommand(a);
			};
			debugger;
		});
		this.targetId(cf,targetId);
	}
	/** @private @arg {C$AdsControlFlowOpportunityReceived} x */
	AdsControlFlowOpportunityReceivedCommand(x) {
		const cf="AdsControlFlowOpportunityReceivedCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AdsControlFlowOpportunityReceivedCommandData(adsControlFlowOpportunityReceivedCommand);
	}
	/** @private @arg {R_GetSearchSuggestions} x */
	R_GetSearchSuggestions(x) {
		const cf="GetSearchSuggestions";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},trackingParams,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_Player} x */
	R_Player(x) {
		const cf="PlayerResponse";
		this.save_keys(`[${cf}]`,x);
		this.tz(x.annotations,this.R_PlayerAnnotationsExpanded);
	}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {x;}
	/** @private @arg {R_LikeLike} x */
	R_LikeLike(x) {
		const cf="LikeLikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.A_OpenPopupAction(x);
			debugger;
			return null;
		});
	}
	/** @private @arg {R_Dislike} x */
	R_Dislike(x) {
		const cf="DislikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.z(actions,x => {
			if("openPopupAction" in x) return this.A_OpenPopupAction(x);
			debugger;
			return null;
		});
	}
	/** @private @arg {R_LikeRemoveLike} x */
	R_LikeRemoveLike(x) {
		const cf="LikeRemoveLikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.A_OpenPopupAction(x);
			debugger;
			return null;
		}));
	}
	/** @private @arg {R_ReelWatchSequence} x */
	R_ReelWatchSequence(x) {
		const cf="ReelWatchSequenceResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=x; this.g(y); // ! #destructure
		this.z(entries,a => this.CommandTemplate(a,this.E$ReelWatchEndpoint));
		this.trackingParams("ReelWatchSequenceResponse",trackingParams);
		this.t(continuationEndpoint,this.ContinuationCommand);
	}
	/** @private @arg {E$ReelWatchEndpoint} x */
	E$ReelWatchEndpoint(x) {this.H$R_("NotificationAction",x,_a => {debugger;});}
	/** @private @arg {LiveChatContinuation} x */
	LiveChatContinuation(x) {x; debugger;}
	/** @private @arg {GetLiveChat} x */
	R_GetLiveChat(x) {
		const cf="GetLiveChat";
		this.save_keys(`[R_${cf}]`,x);
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=x; this.g(y); // ! #destructure
		this.LiveChatContinuation(a1);
		this.t_cf("GetLiveChat",a2,this.trackingParams);
	}
	/** @private @arg {R_GetNotificationMenu} x */
	R_GetNotificationMenu(x) {
		const cf="GetNotificationMenu";
		this.save_keys(`[R_${cf}]`,x);
		const {responseContext: {},actions,trackingParams,...y}=x; this.g(y); // ! #destructure
		let [ar]=this.z(actions,x => {
			if(x.openPopupAction) return this.A_OpenPopupAction(x);
			debugger;
			return null;
		});
		this.z(ar,a=>{
			switch(a.popupType) {
				default: debugger; break;
				case "DROPDOWN": {
					let x=this.w(a.popup);
					const {header,sections,style,trackingParams,...y}=x; this.g(y);
					this.R_SimpleMenuHeader(header);
					this.z(sections,a=>{
						a;
					})
					if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
					this.trackingParams(cf,trackingParams);
				} break;
			}
		})
		debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_SimpleMenuHeader} x */
	R_SimpleMenuHeader(x) {this.H$R_("SimpleMenuHeader",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {x;}
	/** @private @arg {R_Next} x */
	R_Next(x) {
		const cf="Next";
		this.save_keys(`[R_${cf}]`,x);
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=x;
		this.t(contents,((_x) => {debugger;}));
		this.t(currentVideoEndpoint,this.E$WatchEndpoint);
		this.trackingParams(cf,trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.EI$ResponseReceived("NextResponse",a));
		this.tz(engagementPanels,((_x) => {debugger;}));
		const {...y1}=y; this.g(y1);
		this.t(videoReporting,this.R_ReportFormModal);
		this.t(queueContextParams,a => this.params("Next","next.queue_context_params",a));
		this.t(continuationContents,this.R_PlaylistPanelContinuation);
	}
	/** @private @arg {PlaylistPanelContinuation} x */
	R_PlaylistPanelContinuation(x) {this.H$R_("PlaylistPanelContinuation",x,a => {a; debugger;});}
	/** @template T @arg {I$ShortsSurfaceIdentifier<T>} x */
	I$ShortsSurfaceIdentifier(x) {
		const {surface,tag,...y}=x; this.g(y); // ! #destructure
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		return tag;
	}
	/** @private @arg {C$ScrollToEngagementPanel} x */
	C$ScrollToEngagementPanel(x) {
		const cf="ScrollToEngagementPanelCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.D_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @private @arg {D_ScrollToEngagementPanel} x */
	D_ScrollToEngagementPanel(x) {
		const cf="ScrollToEngagementPanelData";
		this.save_keys(`[${cf}]`,x);
		this.targetId(cf,x.targetId);
	}
	//#region pause
	//#endregion
	/** @private @template T @arg {E$T$SignalService<T>} x */
	E$SignalServiceEndpoint(x) {x;}
	/** @private @arg {string} cf @arg {EI$ResponseReceived} x */
	EI$ResponseReceived(cf,x) {
		this.save_keys(`[${cf}.response_endpoint]`,x);
		if("signalServiceEndpoint" in x) {
			this.E$SignalServiceEndpoint(x);
		} else if("adsControlFlowOpportunityReceivedCommand" in x) {
			this.AdsControlFlowOpportunityReceivedCommand(x);
		} else if("changeKeyedMarkersVisibilityCommand" in x) {
			const {clickTrackingParams,changeKeyedMarkersVisibilityCommand,...y}=x; this.g(y); // ! #destructure
			this.clickTrackingParams(cf,clickTrackingParams);
			this.ChangeKeyedMarkersVisibilityCommandData(changeKeyedMarkersVisibilityCommand);
		} else if("loadMarkersCommand" in x) {
			const {clickTrackingParams,loadMarkersCommand,...y}=x; this.g(y); // ! #destructure
			this.clickTrackingParams(cf,clickTrackingParams);
			this.LoadMarkersCommandData(loadMarkersCommand);
		} else if("reloadContinuationItemsCommand" in x) {
			this.ReloadContinuationItemsCommand(x);
		} else if("appendContinuationItemsAction" in x) {
			const {clickTrackingParams,appendContinuationItemsAction,...y}=x; this.g(y); // ! #destructure
			this.clickTrackingParams(cf,clickTrackingParams);
			this.G_AppendContinuationItems(appendContinuationItemsAction);
		} else {
			debugger;
		}
	}
	/** @private @arg {G_AppendContinuationItems} x */
	G_AppendContinuationItems(x) {
		const cf="G_AppendContinuationItems";
		this.save_keys(`[${cf}]`,x);
		this.targetId(cf,x.targetId);
		if(this.starts_with_targetId(x,"comment-replies-item-")) {
			return this.CommentRepliesItem(x);
		}
		this.save_string("[ContinuationItem.targetId]",x.targetId);
		switch(x.targetId) {
			case "browse-feedFEwhat_to_watch": this.A_BrowseFeed$(x); break;
			case "comments-section": this.A_CommentsSectionContinuation$(x); break;
			case "watch-next-feed": this.A_WatchNext$(x); break;
			default: debugger;
		}
	}
	/** @private @arg {ReloadContinuationItemsCommand} x */
	ReloadContinuationItemsCommand(x) {
		const cf="ReloadContinuationItemsCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,reloadContinuationItemsCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ReloadContinuationItems(reloadContinuationItemsCommand);
	}
	/** @private @arg {DC_ReloadContinuationItems} x */
	DC_ReloadContinuationItems(x) {
		const cf="DC_ReloadContinuationItems";
		this.save_keys(`[${cf}]`,x);
		this.save_enum("RELOAD_CONTINUATION_SLOT",x.slot);
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				const {targetId,continuationItems,slot: {},...y}=x; this.g(y); // ! #destructure
				this.targetId(cf,targetId);
				this.save_string("[Body.targetId]",targetId);
				this.z(continuationItems,a => {
					this.save_keys("[continuationItem]",a);
				});
			} break;
			case "RELOAD_CONTINUATION_SLOT_HEADER": {
				const {targetId,continuationItems,slot: {},...y}=x; this.g(y); // ! #destructure
				this.targetId(cf,targetId);
				this.save_string("[Header.targetId]",targetId);
				if(targetId!=="comments-section") debugger;
				if(continuationItems.length!==1) debugger;
				const [item]=continuationItems;
				((_x) => {debugger;})(item);
			} break;
			default: debugger; break;
		};
	}
	/** @private @arg {D__LoadMarkersCommand} x */
	LoadMarkersCommandData(x) {
		const cf="LoadMarkersCommandData";
		this.save_keys(`[${cf}]`,x);
		const {entityKeys,...y}=x; this.g(y); // ! #destructure
		this.z(entityKeys,this.primitive_of_string);
	}
	/** @private @arg {D__ChangeKeyedMarkersVisibilityCommand} x */
	ChangeKeyedMarkersVisibilityCommandData(x) {
		const cf="ChangeKeyedMarkersVisibilityCommandData";
		this.save_keys(`[${cf}]`,x);
		const {isVisible,key,...y}=x; this.g(y); // ! #destructure
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @private @arg {D__PlayerOverlay} x */
	D__PlayerOverlay(x) {
		const cf="PlayerOverlay";
		this.save_keys(`[${cf}]`,x);
		if("browserMediaSession" in x) {
			return this.BrowserMediaSessionRoot(x);
		}
		const {endScreen,shareButton,addToMenu,videoDetails,...y}=x; this.g(y);
		this.R_WatchNextEndScreen(endScreen);
		// this.t(autoplay,this.R_PlayerOverlayAutoplay);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		// this.t(autonavToggle,this.R_AutoplaySwitchButton);
		// this.t(decoratedPlayerBarRenderer,this.R_DecoratedPlayerBar);
	}
	/** @private @arg {R_WatchNextEndScreen} x */
	R_WatchNextEndScreen(x) {x;}
	/** @private @arg {A_BrowserMediaSession} x */
	BrowserMediaSessionRoot(x) {
		const cf="BrowserMediaSessionRoot";
		this.save_keys(`[${cf}]`,x);
		const {actions,browserMediaSession,...y}=x; this.g(y); // ! #destructure
		this.z(actions,((_x) => {debugger;}));
		((_x) => {debugger;})(browserMediaSession);
	}
	/** @private @arg {string} x */
	primitive_of_string(x) {
		this.primitive_of(x,"string");
	}
	/** @private @arg {D__Menu} x */
	D__Menu(x) {
		const cf="Menu";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,accessibility,items,targetId,loggingDirectives,flexibleItems,topLevelButtons,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.t(accessibility,this.D__Accessibility);
		this.tz(items,this.G_Menu$items$iterate);
		/** @type {D__Menu$targetId} */
		this.t(targetId,a => this.targetId(cf,a));
		this.t(loggingDirectives,this.A_LoggingDirectives);
	}
	/** @private @arg {G_Menu$items$iterate} x */
	G_Menu$items$iterate(x) {
		if("toggleMenuServiceItemRenderer" in x) return ((_x) => {debugger;})(x);
		if("menuServiceItemRenderer" in x) return ((_x) => {debugger;})(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		this.do_codegen("MenuItems",x);
		x;
	}
	/** @private @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {
		const cf="R_MenuNavigationItem";
		this.save_keys(`[${cf}]`,x);
		this.D__MenuNavigationItem(this.w(x));
	}
	/** @private @arg {D__MenuNavigationItem} x */
	D__MenuNavigationItem(x) {
		const cf="D__MenuNavigationItem";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,text,icon,navigationEndpoint,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.D__SimpleText(text);
		this.A_OpenPopupAction(navigationEndpoint);
	}
	/** @template {string} T @arg {T$Icon<T>} x */
	T$Icon(x) {
		const cf="Icon";
		this.save_keys(`[${cf}]`,x);
		const {iconType,...y}=x; this.g(y); // ! #destructure
		this.save_string("[IconType]",iconType);
	}
	/** @private @arg {G_Metadata} x */
	CommandMetadata(x) {
		const cf="CommandMetadata";
		this.save_keys(`[${cf}]`,x);
		if("resolveUrlCommandMetadata" in x) {
			const {webCommandMetadata,resolveUrlCommandMetadata,...y}=x; this.g(y); // ! #destructure
			debugger;
			// this.WebCommandMetadata(webCommandMetadata);
			this.t(resolveUrlCommandMetadata,this.ResolveUrlCommandMetadata);
			return;
		}
		this.WebCommandMetadata(this.w(x));
	}
	/** @private @arg {{accessibility?:D__Accessibility}} x */
	handle_accessibility(x) {
		this.save_keys("[default.Accessibility]",x);
		if(x.accessibility) this.D__Accessibility(x.accessibility);
	}
	/** @template T @typedef {{[U in keyof T as `${string&U extends `toggled${infer U1}${infer I1}`?`${Lowercase<U1>}${I1}`:never}`]:T[U]}} RemoveToggled */
	/** @template T @typedef {{[U in keyof T as `${string&U extends `untoggled${infer U1}${infer I1}`?`${Lowercase<U1>}${I1}`:never}`]:T[U]}} RemoveUnToggled */
	/** @template {{}} U @arg {U} x @returns {[RemoveToggled<U>,RemoveUnToggled<U>,Omit<U,`toggled${string}`|`untoggled${string}`>]} */
	unwrap_toggled(x) {
		/** @type {RemoveToggled<U>} */
		let tog=as({});
		/** @type {RemoveUnToggled<U>} */
		let untoggled=as({});
		/** @type {Omit<U,`toggled${string}`|`untoggled${string}`>} */
		let other=as({});
		for(let cc of Object.entries(x)) {
			let c1=cc[0];
			if(this.str_starts_with("toggled",c1)) {
				let u1x=split_string_once(c1,"toggled");
				/** @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @type {keyof RemoveToggled<U>} */
				let u1=ac;
				tog[u1]=cc[1];
				continue;
			}
			if(this.str_starts_with("untoggled",c1)) {
				let u1x=split_string_once(c1,"untoggled");
				/** @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @type {keyof RemoveUnToggled<U>} */
				let u1=ac;
				untoggled[u1]=cc[1];
				continue;
			}
		}
		return [tog,untoggled,other];
	}
	/** @private @arg {E$WatchEndpoint} x */
	E$WatchEndpoint(x) {
		const cf="WatchEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,watchEndpoint,...y}=x; this.g(y); // ! #destructure
		x: if(clickTrackingParams) {
			let x=clickTrackingParams;
			let root=cf;
			const path="tracking.trackingParams";
			let dx=decodeURIComponent(x);
			let res_e=this.decode_b64_url_proto_obj(dx);
			if(!res_e) break x;
			for(let i=0;i<res_e.length;i++) {
				if(res_e[i][0]==="child") {
					console.log(res_e[i]);
				}
			}
			let param_map=this.make_param_map(res_e);
			this.parser.parse_endpoint_param(root,path,new Map(param_map));
		}
		this.t(commandMetadata,this.CM$VE3832$Metadata);
		this.E$Watch(watchEndpoint);
	}
	/** @private @arg {CM$VE3832$Metadata} x */
	CM$VE3832$Metadata(x) {x;}
	/** @private @arg {E$Watch} x */
	E$Watch(x) {
		const cf="E$Watch";
		this.save_keys(`[${cf}]`,x);
		const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig: a1,playerParams,watchEndpointMusicSupportedConfigs: a2,nofollow,playerExtraUrlParams,...y}=x; this.g(y);
		this.videoId(videoId);
		this.t(playlistId,this.playlistId);
		if(index!==void 0) this.primitive_of(index,"number");
		this.t(playlistSetVideoId,this.primitive_of_string);
		if(params!==void 0) this.params("WatchEndpoint","watch.params",params);
		if(startTimeSeconds!==void 0) this.primitive_of(startTimeSeconds,"number");
		if(continuePlayback!==void 0&&!continuePlayback) debugger;
		this.t(loggingContext,this.R_VssLoggingContext);
		this.t(watchEndpointSupportedOnesieConfig,this.R_Html5PlaybackOnesieConfig);
		this.t(a1,this.PrefetchHintConfig);
		this.t(playerParams,a => this.playerParams("WatchEndpoint","watch.player_params",a));
		this.t(a2,this.WatchEndpointMusicConfig);
		if(nofollow!==void 0) this.primitive_of(nofollow,"boolean");
		this.t(playerExtraUrlParams,([a,...b]) => {if(a.key!=="inline") debugger; if(b.length>0) debugger;});
	}
	/** @private @arg {Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H$R_("Html5PlaybackOnesieConfig",x,a => {a; debugger;});}
	/** @private @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {x;}
	/** @private @arg {NonNullable<R_TextRun['navigationEndpoint']>} x */
	handle_text_endpoint(x) {
		if("browseEndpoint" in x) return this.E$Browse(x);
		if("urlEndpoint" in x) return this.E$UrlEndpoint(x);
		if("watchEndpoint" in x) return this.E$WatchEndpoint(x);
		debugger;
	}
	/** @pub @arg {E$UrlEndpoint} x */
	E$UrlEndpoint(x) {x;}
	/** @private @arg {R_TextWithRuns} x @arg {(x:NonNullable<R_TextRun['navigationEndpoint']>)=>void} f_run */
	D__TextWithRuns(x,f_run=this.handle_text_endpoint) {
		if(!("runs" in x)) {debugger; return;}
		const cf/*!*/="TextWithRuns";
		this.save_keys(`[${cf}]`,x);
		const {runs,accessibility,...y}=x; this.g(y); // ! #destructure
		this.z(runs,a => this.D__TextRun(a,f_run));
		this.t(accessibility,this.D__Accessibility);
	}
	/** @private @arg {R_TextRun} x @arg {(x:NonNullable<R_TextRun['navigationEndpoint']>)=>void} f_run */
	D__TextRun(x,f_run) {
		const cf="TextRun";
		this.save_keys(`[${cf}]`,x);
		const {text,navigationEndpoint,loggingDirectives,bold,...y}=x; this.g(y); // ! #destructure
		this.t(navigationEndpoint,f_run);
		this.primitive_of_string(text);
	}
	/** @private @arg {G_Text} x */
	G_Text(x) {
		const cf="TextT";
		this.save_keys(`[${cf}]`,x);
		if("simpleText" in x) {
			return this.D__SimpleText(x);
		} else if("runs" in x) {
			return this.D__TextWithRuns(x);
		}
		debugger;
	}
	/** @private @arg {T$R_ItemSection$1<any,any>} x @returns {x is T$R_ItemSection<any,any,any>} */
	is_ItemSectionRendererTemplate(x) {
		return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);
	}
	/** @arg {D__TwoColumnWatchNextResults['results']['results']['contents'][number]} x */
	handle_results_3(x) {
		if("itemSectionRenderer" in x) return this.T$R_ItemSection$CommentItemSection(x);
		if("merchandiseShelfRenderer" in x) return this.R_MerchandiseShelf(x);
		if("videoPrimaryInfoRenderer" in x) return this.R_VideoPrimaryInfo(x);
		if("videoSecondaryInfoRenderer" in x) return this.R_VideoSecondaryInfo(x);
		debugger;
	}
	/** @arg {{}} x */
	/** @private @arg {R_MerchandiseShelf} x */
	R_MerchandiseShelf(x) {this.H$R_("MerchandiseShelf",x,a => {a; debugger;});}
	/** @arg {{}} x */
	/** @private @arg {R_VideoPrimaryInfo} x */
	R_VideoPrimaryInfo(x) {this.H$R_("VideoPrimaryInfo",x,a => {a; debugger;});}
	/** @arg {{}} x */
	/** @private @arg {R_VideoSecondaryInfo} x */
	R_VideoSecondaryInfo(x) {this.H$R_("VideoSecondaryInfo",x,a => {a; debugger;});}
	/** @private @arg {Extract<D__TwoColumnWatchNextResults['results']['results']['contents'][number],{itemSectionRenderer:any}>} x */
	T$R_ItemSection$CommentItemSection(x) {
		if(this.is_ItemSectionRendererTemplate(x)) {
			switch(x.itemSectionRenderer.sectionIdentifier) {
				case "comment-item-section": return this.T$R_ItemSection$2$CommentItemSection(x);
			}
		}
		switch(x.itemSectionRenderer.sectionIdentifier) {
			case "comments-entry-point": return this.T$R_ItemSection$1(x,a => {a; debugger;});
		}
	}
	/** @arg {T$R_ItemSection<{},"comment-item-section","comments-section">} x */
	T$R_ItemSection$2$CommentItemSection(x) {this.H$R_("NotificationAction",x,a => {a; debugger;});}
	/** @arg {T$D__ItemSection<{},"comment-item-section","comments-section">} x */
	T$D__ItemSection$2CommentItemSection(x) {x;}
	/** @template T @arg {T$ResultsTemplate<T$AR_Contents<T>>} x */
	D__TwoColumnWatchNextResults$results(x) {x;}
	/** @arg {R_ItemSection} x */
	/** @private @arg {R_ItemSection} x */
	R_ItemSection(x) {this.H$R_("ItemSection",x,this.D__ItemSection);}
	/** @private @arg {D__ItemSection} x */
	D__ItemSection(x) {x; debugger;}
	/** @private @arg {D__TwoColumnWatchNextResults} x */
	D__TwoColumnWatchNextResults(x) {
		const cf="TwoColumnWatchNextResultsData";
		this.save_keys(`[${cf}]`,x);
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=x; this.g(y); // ! #destructure
		this.D__TwoColumnWatchNextResults$results(results);
		this.SecondaryResultsTemplate(secondaryResults,a => {
			if("contents" in a) {
				this.z(a.contents,a => {
					if("itemSectionRenderer" in a) {
						this.ItemSectionRendererTemplate(a,a => {
							if(a[1]==="sid-wn-chips"&&a[2]==="watch-next-feed") {
								this.z(a[0],a => {
									let cf=this.get_name_from_keys(a);
									if(!cf) {debugger; return;}
									this.H$Data(cf,a);
									console.log("[found item_section_watch_data]",cf);
								});
								return;
							}
							debugger;
						});
					}
					let k=this.get_keys_of(a);
					switch(k[0]) {
						case "itemSectionRenderer": break;
						case "relatedChipCloudRenderer": break;
					}
				});
			} else if("results" in a) {
				this.z(a.results,x => {
					if("itemSectionRenderer" in x) return this.R_ItemSection(x);
					if("relatedChipCloudRenderer" in x) return this.R_RelatedClipCloud(x);
					debugger;
				});
			}
		});
		this.t(playlist,a => this.PlaylistTemplate(a,this.PlaylistContent));
		this.t(autoplay,a => this.AutoplayTemplate(a,this.AutoplayContent));
		this.t(conversationBar,this.R_LiveChat);
	}
	/** @private @arg {R_RelatedChipCloud} x */
	R_RelatedClipCloud(x) {this.H$R_("NotificationAction",x,a => {this.R_ChipCloud(a.content);});}
	/** @private @arg {R_ChipCloud} x */
	R_ChipCloud(x) {this.H$R_("NotificationAction",x,this.D__ChipCloud);}
	/** @private @arg {D__ChipCloudData} x */
	D__ChipCloud(x) {x;}
	/** @private @arg {R_NotificationGetUnseenCount} x */
	R_GetUnseenCount(x) {
		const cf="NotificationGetUnseenCountResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,unseenCount,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.UpdateNotificationsUnseenCountAction(x);
			debugger;
		}));
		if(unseenCount!==void 0) this.primitive_of(unseenCount,"number");
	}
	/** @private @arg {A_UpdateNotificationsUnseenCount} x */
	UpdateNotificationsUnseenCountAction(x) {
		const cf="UpdateNotificationsUnseenCountAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,updateNotificationsUnseenCountAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams("UpdateNotificationsUnseenCountAction",clickTrackingParams);
		this.UpdateNotificationsUnseenCount(updateNotificationsUnseenCountAction);
	}
	/** @private @arg {UpdateNotificationsUnseenCount} x */
	UpdateNotificationsUnseenCount(x) {
		const cf="UpdateNotificationsUnseenCount";
		this.save_keys(`[${cf}]`,x);
		const {handlerData,unseenCount,timeoutMs,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(handlerData);
		this.primitive_of(unseenCount,"number");
		this.primitive_of(timeoutMs,"number");
	}
	/** @private @arg {R_DatasyncIds} x */
	R_DatasyncIds(x) {
		const cf="DatasyncIdsResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},datasyncIds,...y}=x; this.g(y); // ! #destructure
		this.z(datasyncIds,this.primitive_of_string);
	}
	/** @private @arg {R_GetAccountSwitcherEndpoint} x */
	R_E$GetAccountSwitcher(x) {
		const cf="GetAccountSwitcherEndpointResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},selectText,actions,...y}=x; this.g(y); // ! #destructure
		this.D__TextWithRuns(selectText);
		this.z(actions,a => {
			if("getMultiPageMenuAction" in a) {
				return this.A_GetMultiPageMenu(a);
			}
			debugger;
		});
	}
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H$R_("GetMultiPageMenu",x,this.D__GetMultiPageMenu);}
	/** @private @arg {D__A_GetMultiPageMenu} x */
	D__GetMultiPageMenu(x) {x;}
	/** @private @arg {R_AccountsList} x */
	R_AccountsList(x) {
		const cf="AccountsListResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},selectText,actions,...y}=x; this.g(y); // ! #destructure
		this.D__TextWithRuns(selectText);
		this.z(actions,this.A_UpdateChannelSwitcherPage);
	}
	/** @private @arg {A_UpdateChannelSwitcherPage} x */
	A_UpdateChannelSwitcherPage(x) {this.H$R_("NotificationAction",x,a => {a; debugger;});}
	/** @private @arg {D__ReelItemWatch} x */
	R_ReelItemWatch(x) {
		const cf="ReelItemWatchResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=x; this.g(y); // ! #destructure
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.t(replacementEndpoint,this.E$ReelWatchEndpoint);
		this.t(sequenceContinuation,this.primitive_of_string);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.EngagementPanelItem);
	}
	/** @private @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {x;}
	/** @private @arg {EngagementPanelItem} x */
	EngagementPanelItem(x) {
		const cf="EngagementPanelItem";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {AccountSetSetting} x */
	R_SetSetting(x) {
		const cf="AccountSetSetting";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},settingItemId,...y}=x; this.g(y); // ! #destructure
		if(settingItemId!=="407") debugger;
	}
	/** @private @arg {R_Feedback} x */
	R_Feedback(x) {
		const cf="FeedbackResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},feedbackResponses,...y}=x; this.g(y); // ! #destructure
		this.z(feedbackResponses,this.FeedbackResponseProcessedStatus);
	}
	/** @arg {D__MultiPageMenu} x */
	D__MultiPageMenu(x) {
		const cf="D__MultiPageMenu";
		this.save_keys(`[${cf}]`,x);
		if(x.sections) {
			let z=x.sections[0];
			if("multiPageMenuNotificationSectionRenderer" in z) {
				return this.MultiPageMenuNotificationSection(z.multiPageMenuNotificationSectionRenderer);
			}
		}
	}
	/** @private @arg {{trackingParams:string;}&T$Items<R_Notification|T$R_ContinuationItem<E$GetNotificationMenuEndpoint>>} x */
	MultiPageMenuNotificationSection(x) {
		const cf="MultiPageMenuNotificationSection";
		this.save_keys(`[${cf}]`,x);
		const {items,trackingParams,...y}=x; this.g(y); // ! #destructure
		let xr=this.z(items,x => {
			if("notificationRenderer" in x) return this.R_Notification(x);
			if("continuationItemRenderer" in x) return this.T$ContinuationItemRenderer(x);
			debugger;
		});
		this.z(xr[0],x => {
			if("getNotificationMenuEndpoint" in x) return this.E$GetNotificationMenuEndpoint(x);
			debugger;
		});
		debugger;
		this.trackingParams("MultiPageMenuNotificationSection",trackingParams);
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {x;}
	/** @private @arg {E$GetNotificationMenuEndpoint} x */
	E$GetNotificationMenuEndpoint(x) {x;}
	/** @private @template T @arg {T$R_ContinuationItem<T>} x */
	T$ContinuationItemRenderer(x) {
		const cf="T$ContinuationItemRenderer";
		this.save_keys(`[${cf}]`,x);
		return this.w(this.T$ContinuationItemData(this.w(x)));
	}
	/** @arg {G_SectionList} x */
	SectionListData(x) {
		const cf="SectionListData";
		this.save_keys(`[${cf}]`,x);
		if("targetId" in x) {
			if(this.str_starts_with(x.targetId,"browse-feed")) {
				let ss=split_string(x.targetId,"browse-feed");
				if(ss.length!==2) {debugger; return;}
				let sa=ss[1];
				let ll=sa.slice(24);
				if(this.str_starts_with(sa,"UC")&&ll==="featured") return;
				console.log("target_id.ll",ll);
				if(this.str_starts_with(sa,"UC")) {
					let floc=sa.indexOf("featured");
					if(floc<0) {debugger; return;}
					let s1=sa.slice(0,floc);
					let s2=sa.slice(floc);
					if(ll!==s2) debugger;
					console.log("[RichGrid.targetId]",x.targetId);
					console.log("[target_id_parse]",s1,s2);
					debugger;
				}
				return;
			}
			switch(x.targetId) {
				default: debugger; return;
				case "search-feed": return this.SearchFeedSectionListData(x);
			}
		}
		const {contents,continuations,trackingParams,subMenu,hideBottomSeparator,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.SectionListItem);
		this.tz(continuations,this.RD__NextContinuation);
		this.trackingParams(cf,trackingParams);
		this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
	}
	/** @private @arg {D__SearchFeedSectionList} x */
	SearchFeedSectionListData(x) {
		const cf="SearchFeedSectionListData";
		this.save_keys(`[${cf}]`,x);
		const {contents,continuations,trackingParams,subMenu,hideBottomSeparator,targetId,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.SectionListItem);
		this.tz(continuations,this.RD__NextContinuation);
		this.trackingParams(cf,trackingParams);
		this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
		this.t(targetId,a => this.targetId(cf,a));
	}
	/** @private @arg {RD__NextContinuation} x */
	RD__NextContinuation(x) {x;}
	/** @private @arg {$SectionListItem} x */
	SectionListItem(x) {
		const cf="SectionListItem";
		this.save_keys(`[${cf}]`,x);
		if("itemSectionRenderer" in x) {
			// return this.ItemSectionRenderer(x);
			debugger;
			return;
		} else if("continuationItemRenderer" in x) {
			this.ContinuationItemRenderer(x);
		} else if("musicCarouselShelfRenderer" in x) {
			// this.MusicCarouselShelfRenderer(x);
			debugger;
			return;
		} else if("musicShelfRenderer" in x) {
			// this.MusicShelfRenderer(x);
			debugger;
			return;
		} else {
			debugger;
		}
	}
	/** @private @arg {R_ContinuationItem} x */
	ContinuationItemRenderer(x) {
		const cf="ContinuationItemRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ContinuationItemData(x.continuationItemRenderer);
	}
	/** @private @arg {D__ContinuationItem} x */
	ContinuationItemData(x) {
		const cf="ContinuationItemData";
		this.save_keys(`[${cf}]`,x);
		const {trigger,continuationEndpoint,button,ghostCards,...y}=x; this.g(y); // ! #destructure
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		// this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.G_ContinuationEndpoint(continuationEndpoint);
		this.t(button,this.R_Button);
		this.t(ghostCards,((_x) => {debugger;}));
	}
	/** @private @arg {G_ContinuationEndpoint} x */
	G_ContinuationEndpoint(x) {
		const cf="ContinuationEndpointRoot";
		this.save_keys(`[${cf}]`,x);
		if("continuationCommand" in x) {
			this.ContinuationCommand(x);
		} else if("getTranscriptEndpoint" in x) {
			this.E$GetTranscriptEndpoint(x);
		} else {
			debugger;
		}
	}
	/** @private @arg {E$GetTranscript} x */
	E$GetTranscriptEndpoint(x) {
		const cf="GetTranscriptEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,getTranscriptEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.DE$GetTranscript(getTranscriptEndpoint);
	}
	/** @private @arg {DE$GetTranscript} x */
	DE$GetTranscript(x) {
		const cf="GetTranscriptData";
		this.save_keys(`[${cf}]`,x);
		const {params,...y}=x; this.g(y); // ! #destructure
		this.params("GetTranscript","get_transcript.params",params);
	}
	/** @private @arg {R_GetTranscript} x */
	R_GetTranscript(x) {
		const cf="R_GetTranscript";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {
				return this.UpdateEngagementPanelAction(a);
			}
			debugger;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_Success} x */
	R_Success(x) {
		const cf="SuccessResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},success,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(success,"boolean");
	}
	/** @private @arg {R_AttGet} x */
	R_AttGet(x) {
		const cf="AttGetResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},challenge,bgChallenge,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(challenge);
		this.AttBgChallenge(bgChallenge);
	}
	/** @private @arg {R_Guide} x */
	R_Guide(x) {
		const cf="GuideResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},items,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.GuideItemType);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_GuideItem} x */
	GuideItemType(x) {
		const cf="GuideItemType";
		this.save_keys(`[${cf}]`,x);
		if("guideSectionRenderer" in x) {
			return this.R_GuideSection(x);
		} else if("guideSubscriptionsSectionRenderer" in x) {
			return this.R_GuideSubscriptionsSection(x);
		}
		debugger;
	}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {x;}
	/** @private @arg {D__GuideSection} x */
	D__GuideSection(x) {
		const cf="GuideSectionData";
		this.save_keys(`[${cf}]`,x);
		const {items,trackingParams,formattedTitle,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		debugger;
	}
	/** @private @arg {{}} x */
	R_GuideCollapsibleSectionEntry(x) {x;}
	/** @private @arg {{}} x */
	R_GuideEntry(x) {x;}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H$R_("GuideSection",x,this.D__GuideSection);}
	/** @private @arg {AutoplayContent} x */
	AutoplayContent(x) {
		const cf="AutoplayContent";
		this.save_keys(`[${cf}]`,x);
		const {sets,countDownSecs,modifiedSets,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(sets,this.AutoplaySetItem);
		if(countDownSecs&&countDownSecs!==5) debugger;
		if(modifiedSets!==void 0) this.z(modifiedSets,this.ModifiedSetItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {PlaylistContent} x */
	PlaylistContent(x) {
		const cf="PlaylistContent";
		this.save_keys(`[${cf}]`,x);
		const {contents,title,currentIndex,playlistId,ownerName,isInfinite,playlistShareUrl,shortBylineText,longBylineText,trackingParams,titleText,isEditable,menu,localCurrentIndex,playlistButtons,isCourse,nextVideoLabel,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.z([ownerName,shortBylineText,longBylineText,titleText,nextVideoLabel],a => this.D__SimpleText(a));
		this.z(contents,this.R_PlaylistPanelVideo);
		this.primitive_of_string(title);
		this.primitive_of_string(playlistId);
		this.primitive_of(currentIndex,"number");
		this.parser.parse_url("PlaylistContent",playlistShareUrl);
		this.R_Menu(menu);
		if(localCurrentIndex!==25&&localCurrentIndex!==0) debugger;
		this.R_Menu(playlistButtons);
		this.primitive_of(isInfinite,"boolean");
		this.primitive_of(isEditable,"boolean");
		this.primitive_of(isCourse,"boolean");
	}
	/** @private @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {x;}
	/** @private @arg {D__PlayerOverlayVideoDetails} x */
	D__PlayerOverlayVideoDetails(x) {
		const cf="PlayerOverlayVideoDetails";
		this.save_keys(`[${cf}]`,x);
		const {title,subtitle,...y}=x; this.g(y); // ! #destructure
		this.D__SimpleText(title);
		this.D__TextWithRuns(subtitle);
	}
	/** @template T @arg {T$Item<T>} x @arg {(x:T)=>void} f */
	ItemTemplate(x,f) {
		const cf="ItemTemplate";
		this.save_keys(`[${cf}]`,x);
		return f.call(this,x.item);
	}
	/** @private @template T @arg {E$Button_serviceEndpoint<T>} x */
	Button_serviceEndpoint(x) {
		const cf="Button_serviceEndpoint";
		this.save_keys(`[${cf}]`,x);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		if("ypcGetOffersEndpoint" in x) return this.YpcGetOffersEndpoint(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {E$Button_navigationEndpoint} x */
	Button_navigationEndpoint(x) {
		const cf="Button_navigationEndpoint";
		this.save_keys(`[${cf}]`,x);
		if("shareEntityServiceEndpoint" in x) return this.ShareEntityServiceEndpoint(x);
		if("browseEndpoint" in x) return this.E$Browse(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {E$YpcGetOffersEndpoint} x */
	YpcGetOffersEndpoint(x) {
		const cf="YpcGetOffersEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,ypcGetOffersEndpoint: x1,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		const cf1="YpcGetOffers";
		this.save_keys(`[${cf1}]`,x1);
		const {params,...y1}=x1; this.g(y1);
		this.params(cf1,"ypc_get_offers.params",params);
	}
	/** @private @arg {R_ChannelPage} x */
	R_ChannelPage(x) {
		const cf="ChannelPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="channel") debugger;
		this.E$Browse(endpoint);
		this.R_Channel(response);
		this.primitive_of_string(url);
	}
	/** @private @arg {R_PlaylistPage} x */
	R_PlaylistPage(x) {
		const cf="PlaylistPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {url,endpoint,page,response,...y}=x;
		if(page!=="playlist") debugger;
		this.E$Browse(endpoint);
		this.R_Api_Playlist(response);
		this.primitive_of_string(url);
		if("rootVe" in y) {
			switch(this.w(y)) {
				default: debugger; break;
				case 5754: break;
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {Extract<R_SettingsPage,{rootVe:23462}>} x */
	Settings_VE23462(x) {
		const {page,endpoint,response,url,rootVe,...y}=x; this.g(y); // ! #destructure
		if(page!=="settings") debugger;
		this.E$Browse(endpoint);
		this.R_Settings(response);
		this.primitive_of_string(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {R_SettingsPage} x */
	R_SettingsPage(x) {
		const cf="SettingsPageResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) return this.Settings_VE23462(x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="settings") debugger;
		this.E$Browse(endpoint);
		this.R_Settings(response);
		this.primitive_of_string(url);
	}
	/** @private @arg {Extract<R_ShortsPage,{rootVe:37414}>} x */
	Shorts_VE37414(x) {
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=x; this.g(y); // ! #destructure
		if(rootVe!==37414) debugger;
		if(page!=="shorts") debugger;
		this.R_Player(playerResponse);
		this.E$ReelWatchEndpoint(endpoint);
		this.R_Reel(response);
		this.t(reelWatchSequenceResponse,this.R_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.R_ReelWatchSequence(cachedReelWatchSequenceResponse);
	}
	/** @private @arg {R_ShortsPage} x */
	R_ShortsPage(x) {
		const cf="ShortsResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) return this.Shorts_VE37414(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=x; this.g(y); // ! #destructure
		if(page!=="shorts") debugger;
		this.R_Player(playerResponse);
		this.E$ReelWatchEndpoint(endpoint);
		this.R_Reel(response);
		this.t(reelWatchSequenceResponse,this.R_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(cachedReelWatchSequenceResponse,this.R_ReelWatchSequence);
	}
	/** @private @arg {R_SearchPage} x */
	R_SearchPage(x) {
		const cf="GetNotificationMenuJson";
		this.save_keys(`[${cf}]`,x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="search") debugger;
		this.E$SearchEndpoint(endpoint);
		this.R_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {E$Search} x */
	E$SearchEndpoint(x) {
		const cf="SearchEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,searchEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.D__Search(searchEndpoint);
	}
	/** @private @arg {D__Search} x */
	D__Search(x) {x;}
	/** @private @arg {BrowseHeader} x */
	BrowseHeader(x) {
		const cf="BrowseHeader";
		this.save_keys(`[${cf}]`,x);
		if("feedTabbedHeaderRenderer" in x) {
			return this.R_FeedTabbedHeader(x);
		} else if("c4TabbedHeaderRenderer" in x) {
			return this.R_C4TabbedHeader(x);
		}
		if("playlistHeaderRenderer" in x) return this.R_PlaylistHeader(x);
		debugger;
	}
	/**
	 * @param {R_C4TabbedHeader} x
	 */
	R_C4TabbedHeader(x) {this.H$R_("C4TabbedHeader",x,a => {a; debugger;});}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H$R_("FeedTabbedHeader",x,this.D__FeedTabbedHeader);}
	/** @private @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {
		x; debugger;
	}
	/** @private @arg {D__FeedTabbedHeader} x */
	D__FeedTabbedHeader(x) {
		this.D__TextWithRuns(this.w(x));
	}
	/** @private @arg {CacheMetadata} x */
	CacheMetadata(x) {
		const cf="CacheMetadata";
		this.save_keys(`[${cf}]`,x);
		const {isCacheHit,...y}=x; this.g(y); // ! #destructure
		if(!isCacheHit) debugger;
	}
	/** @private @arg {B$StateTag} x */
	StateTag(x) {
		const cf="StateTag";
		this.save_keys(`[${cf}]`,x);
		if(x.stateTag!==3) debugger;
		if("instruction" in x) {
			const {stateTag: {},instruction,...y}=x; this.g(y); // ! #destructure
			if(instruction!=="STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY") debugger;
			return;
		}
		const {stateTag: {},onStateTagModified,...y}=x; this.g(y); // ! #destructure
		if(onStateTagModified!=="STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE") debugger;
	}
	/** @private @arg {BrowseContents} x */
	BrowseContents(x) {
		const cf="BrowseContents";
		this.save_keys(`[${cf}]`,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		debugger;
	}
	/** @private @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {
		this.FeedFilterChipBarData(this.w(x));
	}
	/** @private @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {
		this.TwoColumnBrowseResultsData(this.w(x));
	}
	/** @private @arg {ResponseReceivedAction} x */
	ResponseReceivedAction(x) {
		const cf="ResponseReceivedAction";
		this.save_keys(`[${cf}]`,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.AdsControlFlowOpportunityReceivedCommand(x);
		if("reloadContinuationItemsCommand" in x) return this.ReloadContinuationItemsCommand(x);
		debugger;
	}
	/** @private @arg {M$ResolveUrlCommandMetadata} x */
	ResolveUrlCommandMetadata(x) {
		const cf="ResolveUrlCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {isVanityUrl,parentTrackingParams,...y}=x; this.g(y); // ! #destructure
		if(isVanityUrl!==void 0) this.primitive_of(isVanityUrl,"boolean");
		this.t(parentTrackingParams,a => this.params("ResolveUrlCommandMetadata","tracking.parentTrackingParams",a));
	}
	/** @private @arg {DC$AdsControlFlowOpportunityReceived} x */
	AdsControlFlowOpportunityReceivedCommandData(x) {
		const cf="AdsControlFlowOpportunityReceivedCommandData";
		this.save_keys(`[${cf}]`,x);
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=x; this.g(y); // ! #destructure
		this.save_enum("OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.AdSlotAndLayoutMetadataItem));
		this.primitive_of(isInitialLoad,"boolean");
		this.primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {R_GetAddToPlaylist} x */
	R_GetAddToPlaylist(x) {
		const cf="GetAddToPlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {x;}
	/** @private @arg {R_AttLog$RC} x */
	R_AttLog(x) {
		const cf="AttLogResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},...y}=x; this.g(y); // ! #destructure
	}
	/** @private @arg {A_LoggingDirectives} x */
	A_LoggingDirectives(x) {
		const cf="LoggingDirectives";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.Visibility(visibility);
		this.t(gestures,this.LoggingDirectives_gestures);
		if(enableDisplayloggerExperiment!==void 0) this.primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @private @arg {NonNullable<A_LoggingDirectives['gestures']>} x */
	LoggingDirectives_gestures(x) {
		let inner=this.TypesTemplate(x);
		if(inner!==4) debugger;
	}
	/** @private @arg {E$ChangeEngagementPanelVisibilityAction} x */
	ChangeEngagementPanelVisibilityAction(x) {
		const cf="ChangeEngagementPanelVisibilityAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,changeEngagementPanelVisibilityAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.ChangeEngagementPanelVisibilityActionData(changeEngagementPanelVisibilityAction);
	}
	/** @private @arg {T$A_Continuation<`comment-replies-item-${string}`,R_Comment>} x */
	CommentRepliesItem(x) {
		const cf="CommentRepliesItem";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_Comment);
	}
	/** @private @arg {R_Comment} x */
	R_Comment(x) {this.H$R_("Comment",x,a => {a; debugger;});}
	/** @private @arg {FeedbackResponseProcessedStatus} x */
	FeedbackResponseProcessedStatus(x) {
		const cf="FeedbackResponseProcessedStatus";
		this.save_keys(`[${cf}]`,x);
		const {isProcessed,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(isProcessed,"boolean");
	}
	/** @private @arg {UpdateEngagementPanelAction} x */
	UpdateEngagementPanelAction(x) {
		const cf="UpdateEngagementPanelAction";
		this.save_keys(`[${cf}]`,x);
		const {updateEngagementPanelAction,clickTrackingParams,...y}=x; this.g(y); // ! #destructure
		this.UpdateEngagementPanelData(updateEngagementPanelAction);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {AttBgChallenge} x */
	AttBgChallenge(x) {
		const cf="AttBgChallenge";
		this.save_keys(`[${cf}]`,x);
		const {interpreterUrl,interpreterHash,program,globalName,...y}=x; this.g(y); // ! #destructure
		let uw=this.UrlWrappedValueT(interpreterUrl);
		this.primitive_of_string(uw);
		this.primitive_of_string(interpreterHash);
		this.primitive_of_string(program);
		if(globalName!=="trayride") debugger;
	}
	/** @template {string} T @arg {UrlWrappedValueT<T>} x */
	UrlWrappedValueT(x) {
		const cf="UrlWrappedValueT";
		this.save_keys(`[${cf}]`,x);
		return this.w(x);
	}
	/** @private @arg {R_ElementUpdate} x */
	ElementUpdate(x) {
		const cf="ElementUpdate";
		this.save_keys(`[${cf}]`,x);
		const {updates,...y}=x; this.g(y); // ! #destructure
		this.z(updates,this.ElementUpdateItem);
	}
	/** @private @arg {D__ElementUpdate} x */
	ElementUpdateItem(x) {
		const cf="ElementUpdateItem";
		this.save_keys(`[${cf}]`,x);
		if("templateUpdate" in x) return this.R_TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return this.ResourceStatusInResponseCheck(x);
		debugger;
	}
	/** @arg {R_TemplateUpdate} x */
	/** @private @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H$R_("TemplateUpdate",x,a => {a; debugger;});}
	/** @private @arg {D__EntityBatchUpdateData} x */
	D__EntityBatchUpdate(x) {
		const cf="EntityBatchUpdateData";
		this.save_keys(`[${cf}]`,x);
		const {mutations,timestamp,...y}=x; this.g(y); // ! #destructure
		this.z(mutations,this.EntityMutationItem);
		this.TimestampWithNanos(timestamp);
	}
	/** @private @arg {TimestampWithNanos} x */
	TimestampWithNanos(x) {
		const cf="TimestampWithNanos";
		this.save_keys(`[${cf}]`,x);
		const {seconds,nanos,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(seconds);
		this.primitive_of(nanos,"number");
	}
	/** @private @arg {EntityMutationItem} x */
	EntityMutationItem(x) {
		const cf="EntityMutationItem";
		this.save_keys(`[${cf}]`,x);
		const {entityKey,type,options,payload,...y}=x; this.g(y); // ! #destructure
		this.params("EntityMutationItem","entity_key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE"&&type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		this.tf(this.EntityMutationOptions)(options);
		let payload_inner=this.tf(this.EntityMutationPayload)(payload);
		if(payload_inner) {
			let x=payload_inner;
			if("subscribed" in x) return;
			if("state" in x) return;
			if("serializedParams" in x) return;
			const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=x; this.g(y);
			this.z([key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives],a => {
				if(a===void 0) debugger;
			});
		}
	}
	/** @private @template V @arg {{[U in `${string}Entity`]:V}} x */
	EN$(x) {return this.w(x);}
	/** @private @arg {EntityMutationPayload} x @returns {EntityMutationPayload extends infer I?I extends {[U in `${string}Entity`]:infer V}?V|null:null:never} */
	EntityMutationPayload(x) {
		const cf="EntityMutationPayload";
		this.save_keys(`[${cf}]`,x);
		if("subscriptionStateEntity" in x) return this.EN$(x);
		if("transcriptTrackSelectionEntity" in x) return this.EN$(x);
		if("transcriptSearchBoxStateEntity" in x) {let ret=this.EN$(x); console.log(ret); debugger; return null;};
		if("offlineabilityEntity" in x) return this.EN$(x);
		if("playlistLoopStateEntity" in x) return this.EN$(x);
		if("macroMarkersListEntity" in x) {let ret=this.EN$(x); console.log(ret); debugger; return null;};
		if("superThanksSelectedTierEntity" in x) {let ret=this.EN$(x); console.log(ret); debugger; return null;};
		let ret=this.EN$(x);
		console.log(ret);
		debugger;
		return null;
	}
	/** @private @arg {EntityMutationOptions} x */
	EntityMutationOptions(x) {
		const cf="EntityMutationOptions";
		this.save_keys(`[${cf}]`,x);
		const {persistenceOption,...y}=x; this.g(y); // ! #destructure
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @private @arg {TopbarButtonItem} x */
	TopbarButtonItem(x) {
		const cf="TopbarButtonItem";
		this.save_keys(`[${cf}]`,x);
		{x;};
	}
	/** @private @arg {D__TwoColumnBrowseResults} x */
	TwoColumnBrowseResultsData(x) {
		const cf="TwoColumnBrowseResultsData";
		this.save_keys(`[${cf}]`,x);
		const {tabs,secondaryContents,...y}=x; this.g(y); // ! #destructure
		this.z(tabs,this.R_Result);
		this.t(secondaryContents,this.SecondaryContents);
	}
	/** @private @arg {TM$Visibility} x */
	Visibility(x) {
		const cf="Visibility";
		this.save_keys(`[${cf}]`,x);
		const {types,...y}=x; this.g(y); // ! #destructure
		this.save_string("[Visibility.types]",types);
	}
	/** @private @arg {T$A_Continuation<"comments-section",G_CommentsSection>} x */
	A_CommentsSectionContinuation$(x) {
		const cf="CommentsSectionContinuationAction";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_CommentsSection);
	}
	/** @private @arg {T$A_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>} x */
	A_BrowseFeed$(x) {
		const cf="BrowseFeedAction";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_BrowseFeed);
	}
	/** @private @arg {T$A_Continuation<"watch-next-feed",G_WatchNext>} x */
	A_WatchNext$(x) {
		const cf="A_WatchNext$";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.WatchNextItem);
	}
	/** @private @arg {R_Reel} x */
	R_Reel(x) {
		const cf="ReelResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=x; this.g(y); // ! #destructure
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {
			this.z(engagementPanels,((_x) => {debugger;}));
		}
	}
	/** @private @arg {G_SecondaryContents} x */
	SecondaryContents(x) {
		const cf="SecondaryContents";
		this.save_keys(`[${cf}]`,x);
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		debugger;
	}
	/** @private @arg {R_ProfileColumn} x */
	R_ProfileColumn(x) {this.H$R_("ProfileColumn",x,a => {a; debugger;});}
	/** @private @arg {R_BrowseFeedActions} x */
	R_BrowseFeedActions(x) {this.H$R_("BrowseFeedActions",x,a => {a; debugger;});}
	/** @private @arg {G_WatchNext} x */
	WatchNextItem(x) {
		const cf="WatchNextItem";
		this.save_keys(`[${cf}]`,x);
		if("continuationItemRenderer" in x) return ((_x) => {debugger;})(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		debugger;
	}
	/** @private @arg {R_CompactVideo} x */
	R_CompactVideo(x) {x;}
	/** @private @arg {E$ShareEntityService} x */
	ShareEntityServiceEndpoint(x) {
		const cf="ShareEntityServiceEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,shareEntityServiceEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.ShareEntityServiceArgs(shareEntityServiceEndpoint);
	}
	/** @private @arg {D__ShareEntityService} x */
	ShareEntityServiceArgs(x) {
		const cf="ShareEntityServiceArgs";
		this.save_keys(`[${cf}]`,x);
		const {serializedShareEntity,commands,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(serializedShareEntity);
		this.z(commands,this.A_OpenPopupAction);
	}
	/** @private @arg {G_Button$command} x */
	ButtonCommand(x) {
		const cf="ButtonCommand";
		this.save_keys(`[${cf}]`,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.ChangeEngagementPanelVisibilityAction(x);
		if("continuationCommand" in x) return this.ContinuationCommand(x);
		if("openPopupAction" in x) return this.A_OpenPopupAction(x);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		if("urlEndpoint" in x) return this.E$UrlEndpoint(x);
		if("commandExecutorCommand" in x) return this.CommandExecutorCommand(x);
		if("createBackstagePostEndpoint" in x) {
			this.T$Endpoint(cf,x,a => {
				this.params(cf,"createBackstagePost.param",this.w(this.w(a)));
			},meta => {
				console.log(meta);
				debugger;
			});
			return;
		}
		debugger;
	}
	/** @private @arg {E$CommandExecutorCommand} x */
	CommandExecutorCommand(x) {
		const cf="CommandExecutorCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandExecutorCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandExecutorData(commandExecutorCommand);
	}
	/** @private @arg {D__CommandExecutor} x */
	CommandExecutorData(x) {
		this.CommandsTemplate(x,this.CommandExecutorAction);
	}
	/** @private @arg {CommandExecutorAction} x */
	CommandExecutorAction(x) {
		if("changeEngagementPanelVisibilityAction" in x) return this.ChangeEngagementPanelVisibilityAction(x);
		if("scrollToEngagementPanelCommand" in x) return this.C$ScrollToEngagementPanel(x);
		if("openPopupAction" in x) return this.A_OpenPopupAction(x);
		if("hideEngagementPanelScrimAction" in x) return this.HideEngagementPanelScrimAction(x);
		if("loopCommand" in x) return;
		if("updateToggleButtonStateCommand" in x) return;
		if("changeMarkersVisibilityCommand" in x) return;
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) return;
		debugger;
	}
	/** @private @arg {HideEngagementPanelScrimAction} x */
	HideEngagementPanelScrimAction(x) {
		const cf="HideEngagementPanelScrimAction";
		const {clickTrackingParams,hideEngagementPanelScrimAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.HideEngagementPanelScrimAction_1(hideEngagementPanelScrimAction);
	}
	/** @private @arg {HideEngagementPanelScrimAction['hideEngagementPanelScrimAction']} x */
	HideEngagementPanelScrimAction_1(x) {
		const {engagementPanelTargetId,...y}=x; this.g(y); // ! #destructure
		switch(engagementPanelTargetId) {
			default: debugger; break;
			case "engagement-panel-clip-create": break;
		}
	}
	/** @private @arg {D__TopbarLogo} x */
	TopbarLogo(x) {
		const cf="TopbarLogo";
		this.save_keys(`[${cf}]`,x);
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=x; this.g(y); // ! #destructure
		this.T$Icon(iconImage);
		this.D__TextWithRuns(tooltipText);
		this.E$Browse(endpoint);
		this.trackingParams(cf,trackingParams);
		this.primitive_of_string(overrideEntityKey);
	}
	/** @template {D__VideoOwner} T @arg {T} x */
	VideoOwner$Omit(x) {
		const cf="VideoOwnerData";
		const {thumbnail,title,subscriptionButton,navigationEndpoint,subscriberCountText,trackingParams,...y}=x;
		this.D__Thumbnail(thumbnail);
		this.D__TextWithRuns(title);
		this.t(subscriptionButton,this.SubscriptionButton);
		this.E$Browse(navigationEndpoint);
		this.t(subscriberCountText,this.D__SimpleText);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {D__SubscriptionButton} x */
	SubscriptionButton(x) {
		const cf="SubscriptionButton";
		this.save_keys(`[${cf}]`,x);
		const {type,subscribed,...y}=x; this.g(y); // ! #destructure
		if(type!=="FREE") debugger;
		this.t(subscribed,a => this.primitive_of(a,"boolean"));
	}
	/** @private @arg {AdSlotAndLayoutMetadataItem} x */
	AdSlotAndLayoutMetadataItem(x) {
		const cf="AdSlotAndLayoutMetadataItem";
		this.save_keys(`[${cf}]`,x);
		const {adLayoutMetadata,adSlotMetadata,...y}=x; this.g(y); // ! #destructure
		this.z(adLayoutMetadata,this.AdLayoutMetadataItem);
		this.AdSlotMetadata(adSlotMetadata);
	}
	/** @private @arg {AdSlotMetadata} x */
	AdSlotMetadata(x) {
		const cf="AdSlotMetadata";
		this.save_keys(`[${cf}]`,x);
		const {slotId,slotType,slotPhysicalPosition,...y}=x; this.g(y); // ! #destructure
		let do_=false;
		if(do_) {
			let sid=split_string(slotId,":");
			let n=(BigInt(sid[0]));
			n/=1000n;
			this.save_number("[AdSlot.slotId[0]]",Number(n));
			this.save_number("[AdSlot.slotId[1..]]",sid.slice(1).map(e => Number.parseInt(e,10)));
		}
		if(slotType!=="SLOT_TYPE_IN_FEED") debugger;
		if(slotPhysicalPosition!==1) debugger;
	}
	/** @private @arg {D__FusionSearchbox} x */
	FusionSearchboxData(x) {
		const cf="FusionSearchboxData";
		this.save_keys(`[${cf}]`,x);
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=x; this.g(y); // ! #destructure
		this.T$Icon(icon);
		this.D__TextWithRuns(placeholderText);
		this.R_WebSearchboxConfig(config);
		this.trackingParams(cf,trackingParams);
		this.E$SearchEndpoint(searchEndpoint);
		this.R_Button(clearButton);
	}
	/** @private @arg {R_WebSearchboxConfig} x */
	R_WebSearchboxConfig(x) {this.H$R_("SearchboxConfig",x,this.D__WebSearchboxConfig);}
	/** @private @arg {D__WebSearchboxConfig} x */
	D__WebSearchboxConfig(x) {
		const cf="WebSearchboxConfig";
		this.save_keys(`[${cf}]`,x);
		{x;}
	}
	/** @private @arg {D__ChangeEngagementPanelVisibilityAction} x */
	ChangeEngagementPanelVisibilityActionData(x) {
		const cf="ChangeEngagementPanelVisibilityActionData";
		this.save_keys(`[${cf}]`,x);
		const {targetId,visibility,...y}=x; this.g(y); // ! #destructure
		switch(targetId) {
			default: targetId===""; this.codegen_new_typedef(x,"ChangeEngagementPanelVisibilityActionData_id"); break;
			case "engagement-panel-clip-create": break;
			case "engagement-panel-clip-view": break;
			case "engagement-panel-comments-section": break;
			case "engagement-panel-structured-description": break;
			case "engagement-panel-macro-markers-auto-chapters": break;
		}
		switch(visibility) {
			default: this.codegen_new_typedef(x,"ChangeEngagementPanelVisibilityActionData_vis"); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED": break;
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN": break;
		}
	}
	/** @private @arg {D__UpdateEngagementPanel} x */
	UpdateEngagementPanelData(x) {
		const cf="UpdateEngagementPanelData";
		this.save_keys(`[${cf}]`,x);
		const {content,targetId,...y}=x; this.g(y); // ! #destructure
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H$R_("Transcript",x,a => {a; debugger;});}
	/** @private @arg {R_Channel} x */
	R_Channel(x) {
		const cf="ChannelResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,...y}=x; this.g(y); // ! #destructure
		this.R_TwoColumnBrowseResults(contents);
		this.R_C4TabbedHeader(header);
		this.R_ChannelMetadata(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_MicroformatData(microformat);
		this.z(onResponseReceivedActions,this.ResetChannelUnreadCountCommand);
	}
	/** @private @arg {R_ChannelMetadata} x */
	R_ChannelMetadata(x) {this.H$R_("ChannelMetadata",x,a => {a; debugger;});}
	/** @private @arg {R_Playlist} x */
	R_Api_Playlist(x) {
		const cf="PlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=x; this.g(y); // ! #destructure
		this.R_TwoColumnBrowseResults(contents);
		this.R_PlaylistHeader(header);
		this.t(alerts,a => this.Response_alerts(cf,a));
		this.R_PlaylistMetadata(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_MicroformatData(microformat);
		this.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {R_PlaylistMetadata} x */
	R_PlaylistMetadata(x) {this.H$R_("PlaylistMetadata",x,a => {a; debugger;});}
	/** @private @arg {string} cf @arg {NonNullable<R_Playlist['alerts']>} x */
	Response_alerts(cf,x) {
		this.z(x,x => {
			if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
			this.do_codegen(`${cf}$alerts$iterate`,x);
		});
	}
	/** @private @arg {R_AlertWithButton} x */
	R_AlertWithButton(x) {this.H$R_("AlertWithButton",x,a => {a; debugger;});}
	/** @private @arg {R_Settings} x */
	R_Settings(x) {
		const cf="SettingsResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=x; this.g(y); // ! #destructure
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D__FeedFilterChipBar} x */
	FeedFilterChipBarData(x) {
		const cf="FeedFilterChipBarData";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		this.R_Button(nextButton);
		this.R_Button(previousButton);
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H$R_("ChipCloudChip",x,a => {a; debugger;});}
	/** @private @arg {AutoplaySetItem} x */
	AutoplaySetItem(x) {
		const cf="AutoplaySetItem";
		this.save_keys(`[${cf}]`,x);
		const {mode,autoplayVideo,nextButtonVideo,...y}=x; this.g(y); // ! #destructure
		if(mode!=="NORMAL") debugger;
		this.E$WatchEndpoint(autoplayVideo);
		this.t(nextButtonVideo,this.E$WatchEndpoint);
	}
	/** @private @arg {ModifiedSetItem} x */
	ModifiedSetItem(x) {
		const cf="ModifiedSetItem";
		this.save_keys(`[${cf}]`,x);
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=x; this.g(y); // ! #destructure
		this.E$WatchPlaylistEndpoint(autoplayVideo);
		this.E$WatchPlaylistEndpoint(nextButtonVideo);
		this.t(previousButtonVideo,this.E$WatchPlaylistEndpoint);
	}
	/** @private @arg {WatchPlaylistEndpoint} x */
	E$WatchPlaylistEndpoint(x) {
		const cf="WatchPlaylistEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,watchPlaylistEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams("WatchPlaylistEndpoint",clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$WatchPlaylist(watchPlaylistEndpoint);
	}
	/** @private @arg {E$WatchPlaylist} x */
	E$WatchPlaylist(x) {
		const cf="WatchPlaylist";
		this.save_keys(`[${cf}]`,x);
		const {playlistId,index,params,...y}=x; this.g(y); // ! #destructure
		this.parser.parse_playlist_id(playlistId);
		this.primitive_of(index,"number");
		this.params("WatchPlaylist","watch_playlist.params",params);
	}
	/** @template K,V @arg {MapTemplate<K,V>} x @arg {(this:this,x:V,k:K)=>void} f */
	MapTemplate(x,f) {
		f.call(this,x.value,x.key);
	}
	/** @private @arg {M$AdLayoutMetadata$1} x */
	AdLayoutMetadataItem(x) {
		const cf="AdLayoutMetadataItem";
		this.save_keys(`[${cf}]`,x);
		const {layoutType,layoutId,adLayoutLoggingData,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(layoutType);
		this.primitive_of_string(layoutId);
		this.AdLayoutLoggingData(adLayoutLoggingData);
	}
	/** @private @arg {D__HotkeyDialog} x */
	D__HotkeyDialog(x) {
		const cf="D__HotkeyDialog";
		this.save_keys(`[${cf}]`,x);
		const {title,sections,dismissButton,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.D__TextWithRuns(title);
		this.z(sections,this.R_HotkeyDialogSection);
		this.R_Button(dismissButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D__HotkeyDialogSection} x */
	D__HotkeyDialogSection(x) {
		const cf="D__HotkeyDialogSection";
		this.save_keys(`[${cf}]`,x);
		const {title,...y}=x;
		let u=this.w(y);
		this.z(u,this.R_HotkeyDialogSectionOption);
	}
	/** @private @arg {D__HotkeyDialogSectionOption} x */
	D__HotkeyDialogSectionOption(x) {
		const cf="D__HotkeyDialogSectionOption";
		this.save_keys(`[${cf}]`,x);
		const {label,hotkey,...y}=x;
		this.save_string(`[${cf}.label]`,label.runs[0].text);
		this.save_string(`[${cf}.hotkey]`,hotkey);
		if("hotkeyAccessibilityLabel" in y) {
			let ka=this.w(y);
			this.save_string(`[${cf}.hotkey_label]`,ka.accessibilityData.label);
			this.D__Accessibility(ka);
		}
	}
	/** @template {D__SubscribeButton} T @arg {T} x */
	SubscribeButton$Omit(x) {
		const cf="SubscribeButton";
		this.save_keys(`[${cf}]`,x);
		const {buttonText,subscribed,enabled,type,channelId,showPreferences,subscribedButtonText,unsubscribedButtonText,trackingParams,unsubscribeButtonText,serviceEndpoints,subscribeAccessibility,unsubscribeAccessibility,...y}=x;
		this.primitive_of(subscribed,"boolean");
		this.primitive_of(enabled,"boolean");
		this.primitive_of_string(type);
		this.primitive_of_string(channelId);
		this.primitive_of(showPreferences,"boolean");
		this.D__TextWithRuns(buttonText);
		this.D__TextWithRuns(subscribedButtonText);
		this.D__TextWithRuns(unsubscribedButtonText);
		this.trackingParams(cf,trackingParams);
		this.D__TextWithRuns(unsubscribeButtonText);
		this.tz(serviceEndpoints,x => {
			if("subscribeEndpoint" in x) return this.E$SubscribeEndpoint(x);
			if("signalServiceEndpoint" in x) return this.signalServiceEndpoint(x);
			x;
			this.do_codegen(cf,x);
			debugger;
		});
		this.D__Accessibility(subscribeAccessibility);
		this.D__Accessibility(unsubscribeAccessibility);
		return y;
	}
	/** @arg {E$SubscribeEndpoint} x */
	E$SubscribeEndpoint(x) {x;}
	/** @template T @arg {E$T$SignalService<T>} x */
	signalServiceEndpoint(x) {this.E$SignalServiceEndpoint(x);}
	/** @template {string} T @arg {ChipCloudStyle<T>} x @arg {(this:this,x:T)=>void} f */
	ChipCloudStyle(x,f) {
		const cf="ChipCloudStyle";
		this.save_keys(`[${cf}]`,x);
		const {styleType,...y}=x; this.g(y); // ! #destructure
		f.call(this,styleType);
	}
	/** @private @arg {C$ResetChannelUnreadCount} x */
	ResetChannelUnreadCountCommand(x) {
		const cf="ResetChannelUnreadCountCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,resetChannelUnreadCountCommand,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(clickTrackingParams);
		this.g(resetChannelUnreadCountCommand);
	}
	/** @private @arg {D__CinematicContainer} x */
	D__CinematicContainer(x) {
		const cf="CinematicContainerData";
		this.save_keys(`[${cf}]`,x);
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=x; this.g(y); // ! #destructure
		this.t(backgroundImageConfig,this.R_ThumbnailsList);
		this.D__GradientColorConfig(gradientColorConfig);
		if(presentationStyle&&presentationStyle!=="CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED") debugger;
		this.g(config);
	}
	/** @private @arg {D__GradientColorConfig} x */
	D__GradientColorConfig(x) {
		{
			let c=x[0];
			/** @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==0) debugger;
			if(u!=="2566914048") debugger;
		}
		{
			let c=x[1];
			/** @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(u!=="2130706432") debugger;
		}
		{
			let c=x[2];
			/** @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==1) debugger;
			if(u!=="4278190080") debugger;
		}
	}
	/** @private @arg {R_ThumbnailsList} x */
	R_ThumbnailsList(x) {
		const cf="ThumbnailsList";
		this.save_keys(`[${cf}]`,x);
		this.D__Thumbnail(x.thumbnail);
	}
	/** @private @arg {D__AdLayoutLogging} x */
	AdLayoutLoggingData(x) {
		const cf="AdLayoutLoggingData";
		this.save_keys(`[${cf}]`,x);
		this.parser.on_endpoint_params(cf,"AdServingDataEntry",this.w(x));
	}
	/** @private @arg {R_LiveChat} x */
	R_LiveChat(x) {
		const cf="LiveChatRenderer";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {RT$ReportFormModal} x */
	R_ReportFormModal(x) {
		const cf="ReportFormModalRenderer";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {GetSharePanel} x */
	R_GetSharePanel(x) {
		const cf="GetSharePanel";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R_Subscribe} x */
	R_Subscribe(x) {
		const cf="SubscribeResponse";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R_Unsubscribe} x */
	R_Unsubscribe(x) {
		const cf="UnsubscribeResponse";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R_ModifyChannelPreference} x */
	R_ModifyChannelPreference(x) {
		const cf="ModifyChannelPreference";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {G_CommentsSection} x */
	G_CommentsSection(x) {
		const cf="CommentsSectionItem";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R_BrowseFeed} x */
	R_BrowseFeed(x) {
		const cf="BrowseFeedItem";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	WatchEndpointMusicConfig(x) {
		const cf="WatchEndpointMusicConfig";
		this.save_keys(`[${cf}]`,x);
		x; debugger;
	}
	/** @private @arg {PrefetchHintConfig} x */
	PrefetchHintConfig(x) {
		const cf="Html5PlaybackOnesieConfig";
		this.save_keys(`[${cf}]`,x);
		x; debugger;
	}
	/** @private @arg {R_ResourceStatusInResponseCheck} x */
	ResourceStatusInResponseCheck(x) {
		const cf="ResourceStatusInResponseCheck";
		this.save_keys(`[${cf}]`,x);
		x; debugger;
	}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {
		const cf="MusicThumbnailRenderer";
		this.save_keys(`[${cf}]`,x);
		if(!x.musicThumbnailRenderer) debugger;
		x; debugger;
	}
	//#endregion
	//#region TODO_minimal_member_fns
	/** @private @arg {minimal_handler_member} x ! */
	minimal_handler_member_2(x) {x;/*!*/}
	//#endregion
}
//#endregion
//#region Start main
console=typeof window==="undefined"? console:(() => window.console)();
main();
//#endregion
