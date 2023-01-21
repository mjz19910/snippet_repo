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
/** @private @type {SavedData} */
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
	/** @arg {T} x */
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
	/** @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
	addEventListener(type,handler) {
		(this._events[type]??=[]).push(handler);
	}
	/** @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
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
	/** @arg {CustomEventType} event */
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
	/** @arg {null} _v */
	notify_fn(_v) {};
	/** @private @type {Set<MessagePort>} */
	wait_ports=new Set;
	/** @private @type {Map<MessagePort,ResState[]>} */
	port_to_resolvers_map=new Map;
	/** @arg {MessagePort} port */
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
	/** @arg {MessagePort} port @arg {number} cur_count */
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
/** @arg {HTMLElement} element */
function on_ytcp_app(element) {
	ytcp_app=element;
	window.ytcp_app=element;
}
/** @arg {HTMLElement} element */
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
	/** @arg {(args: [any, any, any]) => any} on_target_apply_callback */
	constructor(on_target_apply_callback) {
		this.on_target_apply_callback=on_target_apply_callback;
		PropertyHandler.instances.push(this);
	}
	get() {
		return this.override_value.value;
	}
	/** @arg {any} value */
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
class HandleRichGridRenderer {
	enable_logging=false;
	/** @readonly */
	class_name="HandleRichGridRenderer";
	/** @readonly */
	entry="richGridRenderer";
	/** @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		this.rendererContentItemArray=new HandleRendererContentItemArray(x);
	}
	/** @arg {string} path @arg {RichGrid} renderer */
	richGridRenderer(path,renderer) {
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
	/** @arg {string} key_str @arg {RegExp} key_regexp */
	constructor(key_str,key_regexp) {
		this._keyStr=key_str;
		this.key_regexp=key_regexp;
	}
	/* will return a  Uint8Array type */
	/** @arg {string} input */
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
	/** @arg {number} a @arg {number} b */
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
	/** @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @arg {number} [size] */
	try_read_any(size) {
		try {
			return this.read_any(size);
		} catch {
			return null;
		}
	}
	/** @arg {number} [size] */
	reset_and_read_any(size) {
		return this.read_any(size,0);
	}
	/** @type {boolean} */
	failed=false;
	/** @arg {number} [size] @arg {number} [pos] */
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
		/** @arg {number} r @arg {[index:number,num:number]} v */
		function do_reduce_varint(r,[k,e]) {
			let mul_pos=2**(7*k);
			let mul_res=e*mul_pos;
			let num_ret=r+mul_res;
			if(num_ret>Number.MAX_SAFE_INTEGER) return null;
			return num_ret;
		}
		/** @arg {number} e @arg {number} n @returns {[index:number,num:number]} */
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
	/** @arg {{ type: any; data?: { type: any; data: any[]; }; }} ev */
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
	/** @arg {string|number} ev_name @arg {any} fn */
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
	/** @arg {string} ev_name @arg {(event: { data: { type: any; data: [any, any, any]; }; }) => void} fn */
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
	/** @arg {{}} value @arg {PropertyKey} property_key @arg {object} target @arg {string} property_path @arg {boolean} noisy */
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
	/** @arg {HTMLVideoElement[]} value */
	constructor(value) {
		this.value=value;
	}
}
class YTNavigateFinishEvent {
	/** @arg {Event} value @return {YTNavigateFinishEvent} */
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
	/** @arg {number} gain */
	setGain(gain) {
		this.gain_node.gain.value=gain;
	}
	getGain() {
		return this.gain_node.gain.value;
	}
	/** @arg {HTMLMediaElement[]} media_node_list */
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
	/** @arg {T} services @arg {U} params */
	constructor(services,params) {
		this.services=services;
		this.params=params;
	}
	/** @arg {T} services */
	add_services(services) {
		this.services=services;
	}
	/** @arg {U} params */
	set_params(params) {
		this.params=params;
	}
	/** @arg {keyof U} key */
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
	/** @private @arg {[()=>BrowsePageResponse, object, []]} apply_args */
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
	/** @arg {string} x */
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
class BitmapResult {
	/** @arg {number[]} map_arr @arg {string} bitmap */
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
	/** @public @template {{}} T @arg {`[${string}]`} k @arg {T|undefined} x */
	save_keys(k,x) {
		if(!x) {debugger; return;}
		let ki=split_string_once(split_string_once(k,"[")[1],"]")[0];
		if(this.do_save_keys_obj) {
			if(!(ki in this.save_key_objs)) this.save_key_objs[ki]={
				arr: [],
				/** @arg {{}} o */
				set(o) {this.arr.push(o);}
			};
			this.save_key_objs[ki]?.set(x);
		}
		if(typeof x!=="object") return this.save_string(`[${ki}.type]`,typeof x);
		if(x instanceof Array) return this.save_string(`[${ki}.type]`,"array");
		let keys=this.get_keys_of(x);
		let ret=this.save_string(k,keys.join());
		return ret;
	}
	/** @arg {string} str @returns {Partial<ReturnType<KnownDataSaver["pull_data"]>>} */
	#parse_data(str) {
		return JSON.parse(str);
	}
	#store_data() {
		let data=this.pull_data();
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
	pull_data() {
		return {
			seen_root_visual_elements: this.#seen_root_visual_elements,
			seen_strings: this.#seen_strings,
			seen_numbers: this.#seen_numbers,
			seen_booleans: this.#seen_booleans,
		};
	}
	get_debug_data() {
		return {
			strings_key_index_map: this.#strings_key_index_map,
		};
	}
	/** @arg {string} seen_data */
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
	/** @arg {Partial<ReturnType<KnownDataSaver["pull_data"]>>} x */
	#push_data_to_parent(x) {
		if(x.seen_root_visual_elements) {
			this.#seen_root_visual_elements=x.seen_root_visual_elements;
		}
		if(x.seen_strings) {
			this.#seen_strings=x.seen_strings;
		}
		if(x.seen_booleans) {
			this.#seen_booleans=x.seen_booleans;
		}
		if(x.seen_numbers) {
			this.#seen_numbers=x.seen_numbers;
		}
	}
	/** @type {string|null} */
	#seen_data_json_str=null;
	#loaded_from_storage=false;
	/** @type {number[]} */
	#seen_root_visual_elements=[];
	/** @type {[string,["one",string[]]|["many",string[][]]][]} */
	#seen_strings=[];
	/** @type {[string,["one",number[]]|["many",number[][]]][]} */
	#seen_numbers=[];
	/** @type {[string,{t:boolean;f:boolean}][]} */
	#seen_booleans=[];
	/** @type {number|null|Nullable<{}>} */
	#idle_id=null;
	#onDataChange() {
		if(this.#idle_id!==null) return;
		this.#idle_id=requestIdleCallback(() => {
			this.#idle_id=null;
			this.#store_data();
		});
	}
	/** @type {{[x:string]:number}} */
	#strings_key_index_map={};
	/** @arg {string} key */
	#get_seen_string_item(key) {
		let index=this.#strings_key_index_map[key];
		if(index) return this.#seen_strings[index];
		index=this.#seen_strings.findIndex(e => e[0]===key);
		if(index<0) return;
		this.#strings_key_index_map[key]=index;
		return this.#seen_strings[index];
	}
	/** @type {[string,string|string[]][]} */
	#new_strings=[];
	/** @arg {`[${string}]`} k_arg @arg {string|string[]} x */
	save_string(k_arg,x) {
		if(x===void 0) {debugger; return;}
		let k=split_string_once(split_string_once(k_arg,"[")[1],"]")[0];
		let was_known=true;
		/** @private @type {["one", string[]]|["many",string[][]]} */
		let cur;
		let p=this.#get_seen_string_item(k);
		if(!p) {
			p=[k,cur=["one",[]]];
			let nk=this.#seen_strings.push(p)-1;
			this.#strings_key_index_map[k]=nk;
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
		if(was_known) return false;
		this.#new_strings.push([k,x]);
		this.#onDataChange();
		console.log("store_str [%s] %o",k,x);
		let idx=this.#seen_strings.indexOf(p);
		if(idx<0) {debugger; return;}
		this.show_strings_bitmap(idx);
		debugger;
		return true;
	}
	/** @arg {number} idx */
	show_strings_bitmap(idx) {
		let p=this.#seen_strings[idx];
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		if(cur[0]==="many") {
			let src_data=cur[1];
			let max_len=src_data.map(e => e.length).reduce((a,b) => Math.max(a,b));
			for(let bitmap_src_idx=0;bitmap_src_idx<max_len;bitmap_src_idx++) {
				let bitmap_src=src_data.filter(e => bitmap_src_idx<e.length).map(e => e[bitmap_src_idx]);
				let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
				console.log(` --------- [store["${k}"][${bitmap_src_idx}]] --------- `);
				console.log(index_map.map(e => `"${e}"`).join(","));
				console.log(bitmap);
			}
			return;
		} else {
			let bitmap_src=cur[1];
			let linear_map=bitmap_src.every(e => !e.includes(","));
			if(linear_map) {
				console.log(` --------- [${k}] --------- `);
				console.log(bitmap_src.join(","));
				return;
			}
			let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
			console.log(` --------- [${k}] --------- `);
			console.log(index_map.join(","));
			console.log(bitmap);
		}
	}
	/** @arg {string} x */
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
		let gg=this.pull_data().seen_numbers.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		let g1=gg[1];
		if(g1[0]==="many") return;
		this.save_number("[arr.tracking.trackingParams.f1]",g1[1]);
		let bm=this.generate_bitmap_num(g1[1]).bitmap;
		this.save_string("[tp.f1.b_map]",bm.split("!").map((e,u) => [u,e].join("$")).join(","));
		this.pull_data().seen_strings.find(e => e[0]==="tp.f1.b_map")?.[1]?.[1];
	}
	/** @arg {string[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let map_arr=[...new Set([...bitmap_src.map(e => e.split(",")).flat()])];
		let bitmap="\n"+bitmap_src.map(e => e.split(",").map(e => map_arr.indexOf(e))).map(e => {
			let ta=new Array(map_arr.length).fill(0);
			for(let x of e) ta[x]=1;
			let bs=ta.join("");
			return bs;
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		class BitmapResult {
			/** @arg {string[]} map_arr @arg {string} bitmap */
			constructor(map_arr,bitmap) {
				this.map_arr=map_arr;
				this.bitmap=bitmap;
			}
		}
		return new BitmapResult(map_arr,bitmap);
	}
	/** @arg {number[]} src */
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
	/** @arg {number[]} src */
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
		let gg=yt_plugin.ds.pull_data().seen_numbers.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1][0]==="many") return;
		gg[1][1].sort((a,b) => a-b);
		let g1=gg[1];
		/** @arg {string} str */
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
		/** @arg {string} bm */
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
		/** @arg {string[]} s */
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
	/** @arg {number[]} bitmap_src */
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
		let [,u1]=split_string_once(key,"[");
		let [k,...u2]=split_string(u1,"]");
		k=k+u2.join("]");
		let was_known=true;
		/** @private @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.#seen_numbers.find(e => e[0]===k);
		if(!p) {
			cur=["one",[]];
			p=[k,cur];
			this.#seen_numbers.push(p);
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
		let krc=this.#seen_booleans.find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.#seen_booleans.push(krc);
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
		if(x===void 0) {
			debugger;
			return;
		}
		if(this.#seen_root_visual_elements.includes(x)) return;
		console.log("store [root_visual_element]",x);
		this.#seen_root_visual_elements.push(x);
		this.#new_root_visual_elements.push(x);
		this.#onDataChange();
	}
}
const data_saver=new KnownDataSaver;
/** @template T,U */
class BaseServicePrivate extends ApiBase {
	//#region Public
	/** @arg {ResolverT<T,U>} x */
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
	/** @arg {`[${string}]`} k @arg {string|string[]} x */
	save_string(k,x) {
		this.ds.save_string(k,x);
	}
	/** @arg {`[${string}]`} k @arg {boolean} x */
	save_boolean(k,x) {
		this.ds.save_boolean(k,x);
	}
	/** @arg {`[${string}]`} k @arg {number|number[]} x */
	save_number(k,x) {
		this.ds.save_number(k,x);
	}
	//#endregion
	log_skipped_strings=false;
	#x;
}
/** @template C_T,C_U @extends {BaseServicePrivate<C_T,C_U>} */
class BaseService extends BaseServicePrivate {
	/** @arg {string} x */
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
	/** @arg {DecTypeNum[]} res_e */
	make_param_map(res_e) {
		/** @type {ParamMapType} */
		let ret_map=new Map();
		/** @arg {number} key @arg {ParamMapValue} value */
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
						if(String.fromCharCode(...u8_arr.slice(0,4)).match(/\w{4}/)) break x;
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
	/** @public @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is `${U}${string}`} */
	str_starts_with(x,v) {
		return x.startsWith(v);
	}
	get TODO_true() {
		return true;
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
	/** @public @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f  */
	z(x,f) {
		if(x===void 0) {debugger; return [];}
		if(!x.entries) {debugger; return [];}
		/** @type {U[]} */
		let c=[];
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			let u=f.call(this,a,i);
			c.push(u);
		}
		return c;
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
	/** @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t(x,f) {
		if(!x) return;
		return f.call(this,x);
	}
	/** @template {{}} T @arg {T[]|undefined} x @arg {(this:this,x:T)=>void} f */
	tz(x,f) {
		if(!x) return;
		this.z(x,f);
	}
	/** @arg {string} cf @template {{}} T @arg {T|undefined} x @arg {(this:this,cf:string,x:T)=>void} f */
	t_cf(cf,x,f) {
		if(!x) return;
		f.call(this,cf,x);
	}
	/** @arg {string} cf @template {{}} T @arg {T[]|undefined} x @arg {(this:this,cf:string,x:T)=>void} f */
	tz_cf(cf,x,f) {
		if(!x) return;
		this.z_cf(cf,x,f);
	}
	/** @arg {string} cf @template {{}} U @arg {U[]} x @arg {(this:this,cf:string,x:U,i:number)=>void} f  */
	z_cf(cf,x,f) {
		if(x===void 0) {debugger; return;}
		if(!x.entries) debugger;
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			f.call(this,cf,a,i);
		}
	}
	/** @template {{}} T @arg {(this:this,x:T)=>void} f @returns {(x:T|undefined)=>void} */
	tf(f) {
		return x => this.t(x,f);
	}
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
			rich_grid: new HandleRichGridRenderer(res),
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
	/** @private @arg {ApiUrlFormatFull} x */
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
				/** @type {BrowseResponse} */
				data: as(x),
			};
			case "feedback": return {
				type: target[0],
				/** @type {FeedbackResponse} */
				data: as(x),
			};
			case "getDatasyncIdsEndpoint": return {
				type: target[0],
				/** @type {DatasyncIdsResponse} */
				data: as(x),
			};
			case "getAccountSwitcherEndpoint": return {
				type: target[0],
				/** @type {GetAccountSwitcherEndpointResponse} */
				data: as(x),
			};
			case "get_transcript": return {
				type: target[0],
				/** @type {GetTranscriptResponse} */
				data: as(x),
			};
			case "get_survey": return {
				type: target[0],
				/** @type {GetSurveyResponse} */
				data: as(x),
			};
			case "guide": return {
				type: target[0],
				/** @type {GuideResponse} */
				data: as(x),
			};
			case "next": return {
				type: target[0],
				/** @type {NextResponse} */
				data: as(x),
			};
			case "player": return {
				type: target[0],
				/** @type {R$Player} */
				data: as(x),
			};
			case "search": return {
				type: target[0],
				/** @type {SearchApiResponse} */
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
				/** @private @type {ReelItemWatchResponse} */
				data: as(x),
			};
			case "reel_watch_sequence": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {R$ReelWatchSequenceResponse} */
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
				/** @private @type {GetNotificationMenuResponse} */
				data: as(x),
			};
			case "get_unseen_count": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {NotificationGetUnseenCountResponse} */
				data: as(x),
			};
			case "modify_channel_preference": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {ModifyChannelPreferenceResponse} */
				data: as(x),
			};
			case "record_interactions": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {SuccessResponse} */
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
				/** @type {AttGetResponse} */
				data: as(x),
			};
			case "log": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {AttLogResponse} */
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
				/** @private @type {AccountMenuResponse} */
				data: as(x),
			};
			case "accounts_list": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {AccountsListResponse} */
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
	/** @private @arg {Extract<Split<UrlTypes, ".">,["like",any]>} target @arg {{}} x @returns {_ResponseTypes|null} */
	convert_like(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "dislike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {DislikeResponse} */
				data: as(x),
			};
			case "like": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {LikeLikeResponse} */
				data: as(x),
			};
			case "removelike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {LikeRemoveLikeResponse} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {UrlTypes} url_type @arg {{}} x @returns {_ResponseTypes} */
	get_res_data(url_type,x) {
		/** @private @type {Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		/** @private @type {_ResponseTypes|null} */
		let res=null;
		switch(target[0]) {
			case "account": res=this.convert_account(target,x); break;
			case "att": res=this.convert_res_att(target,x); break;
			case "browse": res=this.convert_browse(target,x); break;
			case "like": res=this.convert_like(target,x); break;
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
				/** @private @type {GetSearchSuggestionsResponse} */
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
				/** @private @type {GetAddToPlaylistResponse} */
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
				/** @private @type {SubscribeResponse} */
				data: as(x),
			};
			case "unsubscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {UnsubscribeResponse} */
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
					/** @private @type {BrowseEditPlaylistResponse} */
					data: as(x),
				};
			}
			case 1: break;
		}
		switch(t[0]) {
			case "browse": return {
				type: t[0],
				/** @type {BrowseResponse} */
				data: as(x),
			};
		}
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
		let url_type=this.use_template_url(api_url);
		const res_parse=this.parse_with_url_parse(api_url);
		let ss1=split_string_once(res_parse.pathname,"/")[1];
		let get_ss2=() => {
			if(this.str_starts_with(ss1,"youtubei/v1/")) {
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
		let res=this.get_res_data(url_type,data);
		this.x.get("handle_types").ResponseTypes(response,res);
		this.iteration.default_iter({t: this,path: url_type},data);
	}
	/** @private @arg {UrlTypes|`page_type_${YTNavigateFinishDetail["pageType"]}`} path @arg {SavedDataItem} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @private @type {AnySavedData} */
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
	/** @arg {YTNavigateFinishDetail} detail */
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
	/** @private @arg {RichItemRenderer} content_item */
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
	/** @private @arg {RichSectionRenderer} content_item */
	handle_rich_section_renderer(content_item) {
		let renderer=content_item.richSectionRenderer;
		/** @type {RichSectionContent} */
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
	/** @public @template {BrowseFeedItem[]|WatchNextItem[]|CommentsSectionItem[]|SectionItem[]} T @arg {T} arr @returns {T} */
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
	/** @arg {ApiIterateState} state @arg {AppendContinuationItemsActionData} action */
	appendContinuationItemsAction(state,action) {
		if(!action.continuationItems) {
			debugger;
		}
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(action.continuationItems);
		if(filtered.length>0) {
			action.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg  {ReloadContinuationItemsCommandData} command */
	reloadContinuationItemsCommand({t: state},command) {
		if(!command.continuationItems) {
			debugger;
		}
		let filtered=state.handlers.renderer_content_item_array.replace_array(command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg {ItemSectionData} renderer */
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
	/** @arg {ApiIterateState} state @arg {RichGrid} renderer */
	richGridRenderer(state,renderer) {
		state.t.handlers.rich_grid.richGridRenderer(state.path,renderer);
		state.path="richGridRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @arg {ApiIterateState} state @arg {{}} renderer */
	compactVideoRenderer(state,renderer) {
		state.path="compactVideoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @arg {ApiIterateState} state @arg {{}} renderer */
	thumbnailOverlayToggleButtonRenderer(state,renderer) {
		state.path="thumbnailOverlayToggleButtonRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @arg {ApiIterateState} state @arg {{}} renderer */
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
	/** @arg {ResolverT<Services, ServiceOptions>} x @arg {YtObjectVisitor} obj_visitor */
	constructor(x,obj_visitor) {
		super(x);
		this.obj_visitor=obj_visitor;
		let keys=this.get_keys_of_ex(obj_visitor);
		for(let i of keys) {
			this.keys_map.set(i,i);
		}
	}
	/** @arg {ApiIterateState} state @arg {{}} data */
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
	/** @arg {{key:RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_param_key(x) {
		this.decode_rid_section(x);
		this.save_string("[rid_key]",x.key);
	}
	/** @arg {{key:RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_section(x) {
		let section=/[A-Z][a-z]+/.exec(x.key);
		if(section) {
			let section_id=section[0].toLowerCase();
			this.save_string("[section_id]",section_id);
		} else {
			debugger;
		}
	}
	/** @arg {{key:RidFormat<string>;value:`0x${string}`}} param */
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
	/** @arg {ResolverT<Services,ServiceOptions>} x */
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
	/** @arg {RC$CsiServiceParamsType} params */
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
	/** @arg {ResolverT<Services, ServiceOptions>} x */
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
		/** @private @arg {string|URL|Request} request @arg {Response} response @arg {JsonDataResponseType} response_obj */
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
			class FakeResponse {
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
			let fake_res=new FakeResponse;
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
	/** @arg {ResolverT<Services, ServiceOptions>} x */
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
/** @extends {BaseService<Services,ServiceOptions>} */
class IndexedDbAccessor extends BaseService {
	/** @public @arg {ResolverT<Services, ServiceOptions>} x @arg {string} db_name */
	constructor(x,db_name,version=1) {
		super(x);
		class DatabaseArguments {
			/** @arg {string} name @arg {number} version */
			constructor(name,version) {
				this.name=name;
				this.version=version;
			}
		}
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
	/** @arg {string} gen_name @arg {string[]} keys */
	constructor(gen_name,keys) {
		this.object_count=0;
		this.gen_name=gen_name;
		this.key_keep_arr=keys;
		this.k1="";
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class CodegenService extends BaseService {
	/** @arg {{}} x2 */
	#is_Thumbnail(x2) {
		return "thumbnails" in x2&&x2.thumbnails instanceof Array&&"url" in x2.thumbnails[0]&&typeof x2.thumbnails[0].url==="string";
	}
	/** @arg {{}} x2 */
	#is_TextT(x2) {
		return typeof x2=="object"&&("simpleText" in x2||("runs" in x2&&x2.runs instanceof Array));
	}
	/** @arg {string[]} req_names @arg {{}} x @arg {string[]} keys @arg {string|number} t_name */
	#generate_renderer_body(req_names,x,keys,t_name) {
		/** @private @type {{[x:string]:{}}} */
		let x1=x;
		/** @private @type {string[]} */
		let ret_arr=[];
		for(let k of keys) {
			if(k=="trackingParams") {ret_arr.push(`this.${k}(x.${k});`); continue;}
			if(k=="clickTrackingParams") {ret_arr.push(`this.${k}(x.${k});`); continue;}
			if(k=="responseContext") {debugger; continue;}
			let x2=x1[k];
			if(typeof x2==="string") {
				if(x2.startsWith("https:")) {
					ret_arr.push(`this.primitive_of(x.${k},"string");`);
					continue;
				}
				let u_count=[...new Set(x2.split("").sort())].join("").length;
				if(x2.includes("%")) {
					if(u_count>13) {
						ret_arr.push(`this.primitive_of(x.${k},"string");`);
						continue;
					}
				}
				console.log("[unique_chars_count]",k,[...new Set(x2.split("").sort())].join("").length);
				ret_arr.push(`if(x.${k}!=="${x2}") debugger;`);
				continue;
			}
			if(typeof x2=="number") {ret_arr.push(`this.primitive_of(x.${k},"number");`);}
			if(typeof x2=="boolean") {ret_arr.push(`if(x.${k}!==${x2}) debugger;`); continue;}
			if(typeof x2!=="object") {debugger; continue;}
			if(x2===null) {ret_arr.push(`if(x.${k}!==null) debugger;`); continue;}
			if(this.#is_TextT(x2)) {ret_arr.push(`this.TextT(x.${k});`); continue;};
			if(x2 instanceof Array) {this.#generate_body_array_item(k,x2,ret_arr); continue;}
			if(this.#is_Thumbnail(x2)) {ret_arr.push(`this.Thumbnail(x.${k});`); continue;}
			if("iconType" in x2) {ret_arr.push(`this.Icon(x.${k});`); continue;}
			if("browseEndpoint" in x2) {ret_arr.push(`this.BrowseEndpoint(x.${k});`); continue;}
			/** @private @type {{}} */
			let o3=x2;
			let c=this.get_name_from_keys(o3);
			if(!c||typeof c==="number") {
				this.#generate_body_default_item(k,ret_arr,req_names,t_name);
				continue;
			}
			if(c.endsWith("Renderer")) {
				let ic=this.uppercase_first(c);
				ret_arr.push(`this.${ic}(x.${k});`);
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
	/** @arg {string} k @arg {string[]} out @arg {string[]} env_names @arg {string|number} def_name */
	#generate_body_default_item(k,out,env_names,def_name) {
		let tn=`${k[0].toUpperCase()}${k.slice(1)}`;
		let mn=tn.replace("Renderer","Data");
		if(mn===def_name) mn+="Data";
		env_names.push(mn);
		out.push(`this.${mn}(x.${k});`);
	}
	/** @arg {string} k @arg {unknown[]} x @arg {string[]} out */
	#generate_body_array_item(k,x,out) {
		if(typeof x[0]!=="object") return;
		if(x[0]===null) return;
		let ret_arr=out;
		/** @private @type {{[x:string]:{};[x:number]:{};}} */
		let io=as(x[0]);
		let c=this.get_name_from_keys(io);
		if(c) {
			let ic=this.uppercase_first(c);
			console.log("array key",c);
			ret_arr.push(`this.z(x.${k},this.${ic});`);
		}
	}
	/** @arg {string} x */
	#generate_padding(x) {
		return x.replaceAll(/(?:d\d!)*d(\d)!/g,(_v,g) => {
			return "\t".repeat(g);
		});
	}
	/** @arg {unknown} x @arg {string|null} r_name */
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
			let tmp0=`
			d1!/** @private @arg {${e}} x */
			d1!${e}(x) {
				d2!x;
				d2!debugger;
			d1!}
			`;
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
				debugger;
			}
		}
	}
	/** @arg {string} o @arg {string} k1 */
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
			if(o.startsWith("RD")) return `TYPE::\`RD$\{string}\``;
			if(o.startsWith("PL")) return `TYPE::\`PL$\{string}\``;
			debugger;
			return "TYPE::string";
		}
		if(k1=="videoId") {console.log("[video_id_json]",o); return "TYPE::string";}
		console.log("[unique_chars_count]",k1,[...new Set(o.split("").sort())].join("").length);
		return o;
	}
	/** @arg {JsonReplacerState} state @arg {{}|null} x @arg {string} k1 */
	json_filter_object(state,x,k1) {
		const {gen_name,key_keep_arr}=state;
		if(x===null) return x;
		/** @type {RC$ResponseContext} */
		if(k1==="responseContext") return "TYPE::RC$ResponseContext";
		/** @type {A$FrameworkUpdates} */
		if(k1==="frameworkUpdates") return "TYPE::A$FrameworkUpdates";
		/** @type {A$LoggingDirectives} */
		if(k1==="loggingDirectives") return "TYPE::A$LoggingDirectives";
		if(k1==="subscriptionButton") return "TYPE::D$SubscriptionButton";
		if(x instanceof Array) {
			if(key_keep_arr.includes(k1)) return [x[0]];
			return [x[0]];
		}
		state.k1=k1;
		let res_type=this.get_json_replacer_type(state,gen_name,x);
		if(res_type!==null) return res_type;
		if(key_keep_arr.includes(k1)) return x;
		state.object_count++;
		if(state.object_count<3) return x;
		return {};
	}
	/** @arg {JsonReplacerState} state @arg {string} k1 @arg {unknown} rep */
	json_replacer(state,k1,rep) {
		/** @type {unknown} */
		let o=rep;
		if(k1==="") return o;
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
	/** @arg {{}} x @arg {string} gen_name */
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
	/** @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} x */
	get_json_replacer_type(state,r,x) {
		let g=() => this.json_auto_replace(x);
		/** @type {D$TextWithRuns} */
		if(x.runs&&x.runs instanceof Array) return "TYPE::D$TextWithRuns";
		/** @type {D$Thumbnail} */
		if(x.thumbnails&&x.thumbnails instanceof Array) return "TYPE::D$Thumbnail";
		/** @type {D$SimpleText} */
		if(x.simpleText) return "TYPE::D$SimpleText";
		if(x.iconType&&typeof x.iconType==="string") return `TYPE::Icon<"${x.iconType}">`;
		if(x.thumbnails) return `TYPE::D$${g()}`;
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
			type_val=`R$${type_val}`;
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
		/** @type {E$Signal_ClientSignal} */
		let u=as(x);
		switch(u.signal) {
			case "CLIENT_SIGNAL": if(u.actions instanceof Array) return "TYPE::E$Signal_ClientSignal"; break;
		}
		debugger;
		return x;
	}
	/** @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} b @arg {string[]} keys */
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
		if(b.accessibilityData) return "TYPE::Accessibility";
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
		if(this.str_starts_with(x,"PL")) {
			let pl=x.slice(2);
			switch(pl.length) {
				case 32: return;
			}
			console.log("[parse_playlist]",pl.length,pl);
			return;
		}
		if(this.str_starts_with(x,"RDMM")) {
			let pl=x.slice(4);
			console.log("[parse_playlist_radio_mm]",pl.length,pl);
			return;
		}
		if(this.str_starts_with(x,"RD")) {
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
		if(this.str_starts_with(x,"UC")) {
			return;
		}
		debugger;
	}
	/** @private @arg {ParseUrlStr_2} x */
	parse_youtube_url_2(x) {
		let [,a]=x;
		this.parse_youtube_url_4(a);
	}
	/** @arg {ParseUrlStr_4} x */
	parse_youtube_url_4(x) {
		let a=split_string_once(x,"/");
		if(a[0]!=="v1") debugger;
		let [,b]=a;
		if(this.str_has_sep(b,"/")) {
			return this.parse_youtube_api_url_5(b);
		}
		this.get_yt_url_type(["youtubei","v1",b]);
	}
	/** @arg {ParseUrlStr_5} x */
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
	/** @public @arg {`RD${string}`} x */
	parse_guide_entry_id(x) {
		/** @private @type {YtUrlInfoItem[]} */
		let arr=[];
		if(this.str_starts_with(x,"RD")) {
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
	/** @arg {string} x */
	create_param_map_dbg(x) {
		debugger;
		let res_e=this.decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @arg {ParamMapType} x */
	parse_get_transcript(x) {
		/** @type {ParamMapValue[]} */
		let transcript_args=[];
		let pMap=x;
		/** @arg {number} x */
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
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
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
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} map */
	parse_serialized_interactions_request(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,map,mk,ta,null);
		parse_key(2);
		parse_key(5);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		debugger;
	}
	parse_key_index=1;
	/** @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta */
	remove_key(x,mk,ta) {
		x.delete(ta);
		let idx=mk.indexOf(ta);
		if(idx>-1) mk.splice(idx,1);
	}
	/** @typedef {(x:ParamMapValue[],idx:number)=>void} ParseCallbackFunction */
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta @arg {ParseCallbackFunction|null} cb */
	parse_key(root,path,x,mk,ta,cb) {
		let tv=x.get(ta);
		this.parse_value(root,path,x,mk,ta,tv,cb);
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta @arg {ParamMapValue[]|undefined} tv @arg {ParseCallbackFunction|null} cb */
	parse_value(root,path,x,mk,ta,tv,cb) {
		/** @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		let new_ns=() => {
			console.log("[parse_value.new_ns]",path);
			/** @type {P$LogItems} */
			console.log("\n\t\"[parse_value.gen_ns] [%s]\",",`${path}.f${ta}`);
			console.log(`-- [parse_value.gen_ns] --\n\n\tcase ${ta}: break;\n`);
			debugger;
			if(tv!==void 0) {
				/** @type {P$PathRoot} */
				this.parse_param_next(root,as(`${path}.f${ta}`),tv);
			}
		};
		let new_path=() => {
			console.log("[parse_value.new_ns]",path);
			/** @type {P$LogItems} */
			console.log("\n\t\"[parse_value.gen_ns] [%s]\",",`${path}.f${ta}`);
			console.log(`
case "${path}": {
	switch(ta) {
		case ${ta}: break;
		default: return new_ns();
	}
	/** @type {P$PathRoot} */
	this.parse_param_next(root,\`\${path}.f\${ta}\`,tv);
} return;
`);
			debugger;
		};
		if(tv!==void 0) {
			x.delete(ta);
			let cx=mk.indexOf(ta);
			if(cx>-1) mk.splice(cx,1);
			if(cb===null) {
				/** @type {P$LogItems} */
				switch(path) {
					default: {
						grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
						this.parse_param_next(root,as(`${path}.f${ta}`),tv);
					} break;
					case "report.params.f28.f1[1].f1.f1[1]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1[1].f1": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1[1]": {
						switch(ta) {
							case 1: break;
							case 3: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "ypc_get_offers.params.f5.f5": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "ypc_get_offers.params.f5": {
						switch(ta) {
							case 1: break;
							case 3: break;
							case 5: break;
							case 9: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "ypc_get_offers.params.f1": {
						switch(ta) {
							case 1: break;
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "ypc_get_offers.params": {
						switch(ta) {
							case 1: break;
							case 3: break;
							case 5: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "tracking.trackingParams.f6": {
						switch(ta) {
							case 12: break;
							case 13: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[7]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[6].f1": {
						switch(ta) {
							case 4: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[6]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[5]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[4]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[3].f1": {
						switch(ta) {
							case 4: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[3]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[2]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1[1]": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1.f1": {
						switch(ta) {
							case 4: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1.f1": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1.f1": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28.f1": {
						switch(ta) {
							case 1: break;
							case 3: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f28": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "browse$param.f93": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "tracking.trackingParams.f19": {
						switch(ta) {
							case 1: break;
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "tracking.trackingParams": {
						switch(ta) {
							case 1: break;
							case 2: break;
							case 3: break;
							case 4: break;
							case 6: break;
							case 9: break;
							case 19: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "tracking.trackingParams.f4": {
						switch(ta) {
							case 1: break;
							case 2: break;
							case 3: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "browse$param.f84": {
						switch(ta) {
							case 5: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "browse.params": {
						switch(ta) {
							case 84: break;
							case 93: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`browse$param.f${ta}`,tv);
					} return;
					case "createBackstagePost.param": {
						switch(ta) {
							case 1: break;
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "entity_key": {
						switch(ta) {
							case 2: break;
							case 4: break;
							case 5: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "subscribe.params.f2": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "subscribe.params": {
						switch(ta) {
							case 2: break;
							case 3: break;
							case 4: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f18.f1": {
						switch(ta) {
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params.f18": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "report.params": {
						switch(ta) {
							case 2: break;
							case 8: break;
							case 11: break;
							case 15: break;
							case 18: break;
							case 25: break;
							case 26: break;
							case 28: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "watch.params.f27": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "get_transcript.params": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "reel.player_params": {
						switch(ta) {
							case 30: break;
							case 71: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "record_notification_interactions.f2.f14.f1": {
						switch(ta) {
							case 1: break;
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "watch.params": {
						switch(ta) {
							case 2: case 3: break; case 7: case 12: case 13: break;
							case 24: case 27: case 33: break;
							case 56: break;
							default: return new_ns();
						}
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} break;
					case "watch.player_params": {
						switch(ta) {
							case 8: break;
							case 9: break;
							case 40: break;
							default: return new_ns();
						}
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} break;
					case "watch.params.f33": {
						switch(ta) {
							case 2: break;
							case 3: break;
							case 4: break;
							case 5: break;
							default: return new_ns();
						}
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} break;
					case "watch.player_params.f40": {
						switch(ta) {
							case 1: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "create_playlist.params": {
						switch(ta) {
							case 84: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "record_notification_interactions": {
						switch(ta) {
							case 2: break;
							case 5: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "create_playlist.params.f84": {
						switch(ta) {
							case 5: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "watch.player_params.f40.f1": {
						switch(ta) {
							case 2: break;
							case 3: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "record_notification_interactions.f2": {
						switch(ta) {
							case 1: break;
							case 14: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
					case "record_notification_interactions.f2.f14": {
						switch(ta) {
							case 1: break;
							case 2: break;
							default: return new_ns();
						}
						/** @type {P$PathRoot} */
						this.parse_param_next(root,`${path}.f${ta}`,tv);
					} return;
				}
				return;
			}
			cb(tv,ta);
		}
	}
	/** @arg {ParamMapValue} tv */
	mapper_use(tv) {
		/** @arg {ParamMapValue} e */
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
	/** @arg {string[]} x */
	report$params(x) {
		this.save_string("[report.params.path]",x.join("$"));
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapValue[]} tva */
	parse_param_next(root,path,tva) {
		if(tva.length>1) {
			let off=1;
			for(let val of tva) {
				let g1=()=>{
					console.log(`\ncase ${JSON.stringify(path)}: /*tva*/{};`);
					console.log(`\n\n\t"[parse_value.gen_ns] [${path}[${off}]]",`);
				}
				let g2=()=>{
					console.log(`\ncase ${JSON.stringify(off)}: break;`);
					console.log(`\n\n\t"[parse_value.gen_ns] [${path}[${off}]]",`);
				};
				switch(path) {
					default: g1(); debugger; return;
					case "report.params.f28.f1[1].f1.f1": /*tva*/{
						switch(off) {
							default: g2(); debugger; return;
							case 1: break;
						}
						this.parse_param_next(root,`${path}[${off}]`,[val]);
					}; return;
					case "report.params.f28.f1": /*tva*/{
						switch(off) {
							default: g2(); debugger; return;
							case 1: break;
							case 2: break;
						}
						this.parse_param_next(root,`${path}[${off}]`,[val]);
					} break;
				}
				off++;
			}
			return;
		}
		let tv=tva[0];
		let key_index=this.parse_key_index;
		if(tv instanceof Map) this.parse_any_param(root,path,new Map(tv));
		/** @arg {number} idx */
		let gen_next_part=(idx) => {
			let case_part="";
			let value_part="\n\t\tswitch(tv) {default: debugger; return;}";
			if(path_parts.length===idx) {
				if(tv instanceof Map) case_part=`${"\n\t\t"}if(tv instanceof Map) return;`;
				switch(typeof tv) {
					case "number": {
						if(tv>128) {
							case_part=`\n\t\tif(typeof tv==="number") return console.log("[param_parse]",path,tv);`;
						} else {
							value_part=`\n\t\tswitch(tv) {\n\t\t\tcase ${tv}: return;\n\t\t\tdefault: debugger; return;\n\t\t}`;
						}
					} break;
					case "string": case_part=`\n\t\tif(typeof tv==="string") return this.save_string(\`[\${path}]\`,tv);`; break;
				}
			}
			console.log(`-- [${path_parts.join(".")},${idx}] --\n
case "${path_parts[idx-1]}": {
	const idx=${idx+1};
	if(path_parts.length===${idx}) {${case_part}${value_part}
	}
	switch(path_parts[${idx}]) {
		default: gd(idx); path_parts[${idx}]===""; break;
	}
} break;`);
		};
		/** @arg {number} idx */
		let gd=(idx) => {
			console.log("[param_next.new_ns]",path_parts.join("."));
			gen_next_part(idx);
			debugger;
		};
		/** @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		/** @arg {number} idx */
		let u=idx => {
			grouped(path_parts.join("$"),() => gd(idx));
		};
		let path_parts=split_string(path,".");
		const idx=1;
		switch(path_parts[0]) {
			default: {
				grouped("gen.new_ns."+path_parts,() => gd(idx));
				switch(path_parts[0]) {}
			} break;
			case "ypc_get_offers": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: gd(idx); path_parts[2]===""; break;
							case "f5": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
									case "f9": {
										const idx=5;
										if(path_parts.length===4) {
											switch(tv) {
												case 2: return;
												default: debugger; return;
											}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
									case "f5": {
										const idx=5;
										if(path_parts.length===4) {
											if(tv instanceof Map) return;
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
											case "f1": {
												const idx=6;
												if(path_parts.length===5) {
													if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
													switch(tv) {default: debugger; return;}
												}
												switch(path_parts[5]) {
													default: gd(idx); path_parts[5]===""; break;
												}
											} break;
										}
									} break;
									case "f3": {
										const idx=5;
										if(path_parts.length===4) {
											switch(tv) {
												case 1: return;
												default: debugger; return;
											}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
							case "f3": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 3: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
									case "f2": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											switch(tv) {
												case 3: return;
												default: debugger; return;
											}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "watch_playlist": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.watch_playlist",() => gd(idx));
					} break;
				}
			} break;
			case "watch_page_url": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "pp": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.watch_page_url",() => gd(idx));
					} break;
				}
			} break;
			case "playlist_edit": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.playlist_edit",() => gd(idx));
					} break;
				}
			} break;
			case "next": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]==="queue_context_params"; break;
					case "queue_context_params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.next",() => gd(idx));
					} break;
				}
			} break;
			case "browse": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.browse",() => gd(idx));
					} break;
				}
			} break;
			case "like": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "likeParams": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.like.likeParams",() => gd(idx));
					} break;
					case "remove_like_params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						grouped("gen.like.remove_like_params",() => gd(idx));
					} break;
				}
			} break;
			case "browse$param": {
				const idx=2;
				if(path_parts.length===1) {
					switch(tv) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "f93": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: gd(idx); path_parts[2]===""; break;
							// browse$param$f93$f1
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									// browse$param$f93$f1$..
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
					case "f84": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: gd(idx); path_parts[2]===""; break;
							// browse$param$f84$f5
							case "f5": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 2: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "entity_key": {
				const idx=2;
				if(path_parts.length===1) {
					switch(tv) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "f5": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {
								case 1: return;
								default: debugger; return;
							}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
						}
					} break;
					// [entity_key.f4]
					case "f4": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
						}
					} break;
					case "f2": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
						}
					} break;
				}
			} break;
			case "createBackstagePost": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "param": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") {
										if(this.str_starts_with(tv,"UC")) {
											return this.parse_channel_id(tv);
										}
										debugger;
										return;
									}
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "tracking": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "parentTrackingParams": u(idx); break;
					// [click.trackingParams]
					case "trackingParams": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							// [click.trackingParams.f19]
							case "f19": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
									// [click.trackingParams.f19.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
									// [click.trackingParams.f19.f2]
									case "f2": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
							// [click.trackingParams.f9]
							case "f9": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="bigint") return this.save_string(`[${path_parts[1]}.${path_parts[2]}]`,tv.toString());
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
							// [click.trackingParams.f6]
							case "f6": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path_parts[1]}.${path_parts[2]}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									case "f13": u(idx); break;
									// [click.trackingParams.f6.f12]
									case "f12": {
										const idx=5;
										if(path_parts.length===4) {
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: gd(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
							// [click.trackingParams.f4]
							case "f4": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									// [click.trackingParams.f4.f3]
									case "f3": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") {
												if(tv<8192) return this.save_number(`[${path}]`,tv);
												return;
											}
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
										}
									} break;
									// [click.trackingParams.f4.f2]
									case "f2": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") {
												if(tv<8192) return this.save_number(`[${path}]`,tv);
												return;
											}
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
										}
									} break;
									// [click.trackingParams.f4.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") {
												let ntv=Math.floor(tv/1000/100);
												return this.save_number(`[${path}]`,ntv);
											}
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
							// [click.trackingParams.f3]
							case "f3": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
									switch(tv) {
										default: "trackingParams.f3"; console.log(`\ncase ${JSON.stringify(tv)}: return;`); return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// [click.trackingParams.f2]
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
									switch(tv) {
										default: console.log("trackingParams.f2"); console.log(`\ncase ${JSON.stringify(tv)}: return;`); return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// [click.trackingParams.f1]
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="number") {
										this.save_number(`[${path}]`,tv);
										return;
									}
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "subscribe": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					// [subscribe.params]
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							// [subscribe.params.f4]
							case "f4": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// "subscribe.params.f3"
							case "f3": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 0: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// ["subscribe", "params", "f2"]
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									// [subscribe.params.f2.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="number") return this.save_number("[subscribe.params.f2.f1]",tv);
											debugger;
											return;
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "report": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					// report$params
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f28": {
								let [,,...sp]=path_parts;
								return this.report$params(sp);
							}
							case "f26": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 14: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
							case "f25": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
							// report$params$f18
							case "f18": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(tv instanceof Map) return;
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
											// ["report", "params", "f18", "f1", "f2"] = url
											case "f2": {
												const idx=6;
												if(path_parts.length===5) {
													if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
													switch(tv) {default: debugger; return;}
												}
												switch(path_parts[5]) {
													default: u(idx); path_parts[5]===""; break;
												}
											} break;
										}
									} break;
								}
							} break;
							case "f15": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 5: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f11": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 0: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f8": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// ["report", "params", "f2"]
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "create_playlist": {
				const idx=3;
				if(path_parts.length===2) {
					switch(tv) {default: debugger; return;}
				}
				switch(path_parts[2]) {
					default: u(idx); path_parts[2]===""; break;
					case "f84": {
						const idx=4;
						if(path_parts.length===3) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[3]) {
							default: u(idx); path_parts[3]===""; break;
							case "f5": {
								const idx=5;
								if(path_parts.length===4) {
									switch(tv) {
										case 2: return;
										default: debugger; return;
									}
								}
								switch(path_parts[4]) {
									default: u(idx); path_parts[4]===""; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "get_transcript": {
				if(path_parts[1]!=="params") debugger;
				const idx=3;
				if(path_parts.length===2) {
					gen_next_part(idx);
					debugger;
				}
				switch(path_parts[2]) {
					default: u(idx); path_parts[2]===""; break;
					case "f6": {
						const idx=4;
						if(path_parts.length===3) {
							switch(tv) {
								case 2: return;
								default: debugger; return;
							}
						}
						switch(path_parts[3]) {
							default: u(idx); path_parts[3]===""; break;
						}
					} break;
					case "f1": {
						const idx=4;
						if(path_parts.length===3) {
							return this.player_f71(key_index,this.join_string(path_parts,"."),tv);
						}
						switch(path_parts[3]) {
							default: u(idx); path_parts[3]===""; break;
						}
					} break;
				}
			} break;
			case "reel": {
				const idx=2;
				if(path_parts.length!==2&&path_parts.length!==3) {
					gen_next_part(idx);
					debugger;
				}
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f71": {
								const idx=4;
								if(path_parts.length===3) {
									return this.player_f71(key_index,this.join_string(path_parts,"."),tv);
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f30": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
						}
					} break;
					case "sequence_params": return gd(idx);
				}
			} break;
			case "record_notification_interactions": {
				const idx=2;
				if(path_parts.length===1) {
					switch(tv) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "f5": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof tv==="number") return this.save_number(`[${path}]`,tv);
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
						}
					} break;
					// ["record_notification_interactions", "f2"]
					case "f2": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 2: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f14": {
								const idx=4;
								let idx_2=idx-1;
								if(path_parts.length===idx_2) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									// ["record_notification_interactions", "f2", "f14", "f2"]
									case "f2": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										console.log("in",path_parts[2]);
										gen_next_part(idx);
										debugger;
									} break;
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(tv instanceof Map) return;
											if(typeof tv==="number") return console.log("[param_parse]",path,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: {
												console.log("in",path_parts[3]);
												gen_next_part(idx);
												debugger;
											} path_parts[4]===""; break;
											// ["record_notification_interactions", "f2", "f14", "f1", "f2"]
											case "f2": {
												const idx=6;
												if(path_parts.length===5) {
													switch(tv) {
														case 6: return;
														case 8: return;
														default: console.log(`\ncase ${tv}: return;`); debugger; return;
													}
												}
												switch(path_parts[5]) {
													default: {
														console.log("in",path_parts[4]);
														gen_next_part(idx);
														debugger;
													} path_parts[5]===""; break;
												}
											} break;
											case "f1": {
												const idx=6;
												if(path_parts.length===5) {
													if(typeof tv==="number") return console.log("[param_parse]",path,tv);
													switch(tv) {default: debugger; return;}
												}
												switch(path_parts[5]) {
													default: {
														console.log("in",path_parts[4]);
														gen_next_part(idx);
														debugger;
													} path_parts[5]===""; break;
												}
											} break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "watch": {
				const idx=2; switch(path_parts[1]) {
					default: u(idx); path_parts[1]===""; break;
					case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) {
								let mk=[...tv.keys()];
								console.log(path_parts,mk);
								return;
							}
							switch(tv) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f9": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f8": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f40": {
								const idx=4;
								if(path_parts.length===idx) {
									if(tv instanceof Map) {
										let mk=[...tv.keys()];
										console.log(path_parts,mk);
										return;
									}
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									case "f1": {
										const idx=5;
										if(path_parts.length===5) {
											switch(tv) {
												case 1: return;
												case 2: return;
												case 3: return;
												default: debugger; return;
											}
										}
										switch(path_parts[4]) {
											default: {
												console.log("in",path_parts[3]);
												gen_next_part(idx);
												debugger;
											} path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							if(tv instanceof Map) return;
							switch(tv) {default: debugger; break;}
							return;
						}
						switch(path_parts[2]) {
							default: u(idx); path_parts[2]===""; break;
							case "f56": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: gd(idx); path_parts[3]===""; break;
								}
							} break;
							case "f27": {
								const idx=4;
								if(path_parts.length===3) {
									if(tv instanceof Map) return;
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											switch(tv) {
												case 1: return;
												default: debugger; return;
											}
										}
										switch(path_parts[4]) {
											default: u(idx); path_parts[4]===""; break;
										}
									} break;
								}
							} break;
							case "f13": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 0: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f12": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
									switch(tv) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f7": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// "watch.params.f3"
							case "f3": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							// ["watch", "params", "f2"]
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										case 2: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f24": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {
										case 1: return;
										default: debugger; return;
									}
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
								}
							} break;
							case "f33": {
								const idx=4;
								if(path_parts.length===3) {
									switch(tv) {default: debugger; break;}
									return;
								}
								switch(path_parts[3]) {
									default: u(idx); path_parts[3]===""; break;
									case "f5": {
										const idx=4;
										if(path_parts.length===idx) {
											if(typeof tv==="number") return console.log("[param_parse]",path,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: {
												console.log("in",path_parts[3]);
												gen_next_part(idx);
												debugger;
											} path_parts[4]===""; break;
										}
									} break;
									case "f4": {
										const idx=4;
										if(path_parts.length===idx) {
											if(typeof tv==="number") return console.log("[param_parse]",path,tv);
											switch(tv) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: {
												console.log("in",path_parts[3]);
												gen_next_part(idx);
												debugger;
											} path_parts[4]===""; break;
										}
									} break;
									// ["watch", "params", "f33", "f3"]
									case "f3": {
										let idx=4;
										if(path_parts.length===4) {
											if(typeof tv==="number") return console.log("[param_parse]",path,tv);
											switch(tv) {default: debugger; return;}
										}
										gen_next_part(idx);
										debugger;
									} break;
									case "f2": {
										const idx=4;
										if(path_parts.length===idx) {
											if(typeof tv==="string") return this.save_string(`[${path}]`,tv);
											switch(tv) {default: debugger; return;}
										}
										gen_next_part(idx);
										debugger;
									} break;
								}
							} break;
						}
					} break;
				} break;
			}
		}
		console.log(`[${path}] [idx=${key_index}]`,root,tv);
	}
	/** @arg {number} key_index @arg {P$PathRoot} p @arg {ParamMapValue} x */
	player_f71(key_index,p,x) {
		switch(x) {
			case 12: return;
			case 15: return;
			default: {
				console.log(`[${p}] [idx=${key_index}]`,x);
				console.log(`-- [player_f71] --\n\n\ncase ${x}: return;`);
			} return;
		}
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_any_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...x.keys()];
		/** @arg {number} ta */
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
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_player_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...x.keys()];
		/** @arg {number} ta */
		let parse_key=(ta) => this.parse_key(root,path,x,mk,ta,null);
		parse_key(8);
		parse_key(9);
		parse_key(30);
		parse_key(40);
		parse_key(57);
		parse_key(71);
		parse_key(72);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(x));
		debugger;
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {ParamMapType} x */
	parse_endpoint_param(root,path,x) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let map_keys=[...x.keys()];
		/** @arg {number} ta */
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
	/** @arg {ParamMapType} x @returns {ParamObjType} */
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
	/** @public @arg {ParamsSection} root @arg {YtUrlFormat} x */
	parse_url(root,x) {
		if(this.str_starts_with(x,"https://")) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with(x,"http://")) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with(x,"android-app://")) {
			return;
		}
		if(this.str_starts_with(x,"ios-app://")) {
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
	/** @arg {YtUrlInfoPlaylist} x */
	get_playlist_url_info_critical(x) {
		switch(x.id.length) {
			case 11: return false;
			case 24: return false;
			case 32: return false;
			default: debugger; return true;
		}
	}
	/** @arg {YtUrlInfoPlaylist} x */
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
		if(this.str_starts_with(x,"@")) {
			if(this.log_channel_handles) console.log("[channel_handle]",x);
			return;
		}
		if(this.str_starts_with(x,"account")) {
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
	/** @public @arg {YtTargetIdType} x */
	parse_target_id(x) {
		if(this.str_starts_with(x,"browse-feed")) {
			console.log("[target_id.browse_feed","browse-feed",split_string_once("browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with(x,"comment-replies-item")) {
			return this.save_enum("comment-replies-item",x);
		}
		if(this.str_starts_with(x,"engagement-panel")) {
			return this.save_enum("engagement-panel",x);
		}
		if(this.str_starts_with(x,"comments")) {
			return this.save_enum("comments",x);
		}
		if(this.str_starts_with(x,"library")) {
			return this.save_enum("library",x);
		}
		if(this.str_starts_with(x,"watch")) {
			return this.save_enum("watch",x);
		}
		if(this.str_starts_with(x,"shopping_panel")) {
			return this.save_enum("shopping_panel",x);
		}
		if(this.str_starts_with(x,"clip")) {
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
	/** @arg {Split<ApiUrlFormat,"/">} x */
	get_url_type(x) {
		switch(x[0]) {
			case "youtubei": return this.get_yt_url_type(x);
			case "getDatasyncIdsEndpoint": break;
			case "getAccountSwitcherEndpoint": break;
			default: return this.api_no_handler(x,x[0]);
		}
		return x[0];
	}
	/** @arg {BrowseEndpointPages} x */
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
		if(this.str_starts_with(x,"FE")) {
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
		if(this.str_starts_with(x,"FE")) {
			let page=split_string_once(x,"FE")[1];
			let known_page=this.parse_known_page(page);
			if(known_page) return;
			if(seen_map.has(page)) return;
			seen_map.add(page);
			console.log("[param_value_with_section] [%s] -> [%s]",x.slice(0,2),page);
		} else if(this.str_starts_with(x,"VL")) {
			let x1=split_string_once(x,"VL")[1];
			if(this.str_starts_with(x1,"LL")) return;
			if(this.str_starts_with(x1,"WL")) return;
			if(this.str_starts_with(x1,"PL")) return;
			console.log("new with param [param_2c_VL]",x,x1);
		} else if(this.str_starts_with(x,"UC")) {
			if(x.slice(2).length===22) return;
			console.log("new with param [param_2c_UC]",x);
		} else if(this.str_starts_with(x,"SP")) {
			let x1=split_string_once(x,"SP")[1];
			switch(x1) {
				case "account": case "account_advanced": case "account_billing": case "account_notifications": case "account_privacy":
				case "account_sharing": case "account_playback": case "account_overview": case "report_history": return;
				case "unlimited": return;
				default: debugger;
			}
			console.log("new with param [param_2c_SP]",x,x1);
		} else if(this.str_starts_with(x,"MP")) {
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
	/** @arg {CodegenService} parent */
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
	/** @public @arg {string} cf @arg {string} x */
	trackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] */
	codegen_new_typedef(x,gen_name,ret_val) {
		return this.codegen.codegen_new_typedef(x,gen_name,ret_val);
	}
	/** @public @arg {string} cf @arg {string} x */
	clickTrackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @type {string[]} */
	known_target_id=[];
	/** @arg {string} root @arg {YtTargetIdType} x */
	targetId(root,x) {
		const cf="targetId";
		this.save_string(`[${root}.${cf}]`,x);
		this.parser.parse_target_id(x);
		if(this.str_starts_with(x,"comment-replies-item-")) return;
		if(this.str_starts_with(x,"shopping_panel_for_entry_point_")) {
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
		if(this.str_starts_with(x,"browse-feed")) {
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
			default: x===""; console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`);
		}
	}
	/** @arg {[D$VE3832$PreconnectUrl]} x */
	parse_preconnect_arr(x) {
		if(x.length!==1) debugger;
		this.parse_preconnect_url(x[0]);
	}
	/** @arg {D$VE3832$PreconnectUrl} x */
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
	/** @arg {ParamsSection} root @arg {WatchPageUrl} x */
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
	/** @arg {string} x */
	videoId(x) {
		this.primitive_of(x,"string");
		this.x.get("indexed_db").put({v: x});
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	params(root,path,x) {
		this.parser.on_endpoint_params(root,path,x);
	}
	/** @arg {PlaylistId} x */
	playlistId(x) {
		this.parser.parse_playlist_id(x);
	}
	/** @public @arg {Extract<M$GeneratedWebCommandMetadata,{rootVe:any}>['rootVe']} x */
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
				/** @type {M$GeneratedWebCommandMetadata[]} */
				let x=[]; x;
			}
		}
		switch(ss) {
			default: debugger;
		}
	}
	/** @arg {BrowseIdType} x */
	browseId(x) {
		this.parser.parse_browse_id(x);
	}
	/** @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {
		if(!this.str_starts_with(x,"/@")) debugger;
	}
	/** @arg {string} x */
	previousCsn(x) {
		console.log(base64_dec.decode_str(x));
	}
	/** @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {
		return this.str_starts_with(x.targetId,w);
	}
	/** @arg {ParamsSection} root @arg {P$PathRoot} path @arg {string} x */
	playerParams(root,path,x) {
		this.parser.on_player_params(root,path,x);
	}
	/** @arg {Extract<M$GeneratedWebCommandMetadata,{rootVe:any}>['rootVe']} x */
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
	/** @template {{}} T @arg {{items: T[]}} x @arg {(this:this,x:T)=>void} f */
	ItemsTemplate(x,f) {
		const {items,...y}=x; this.g(y); // ! #destructure
		this.z(items,f);
	}
	/** @arg {SectionListRendererTemplate<"comment-item-section", "engagement-panel-comments-section">} x */
	SectionListRendererTemplate(x) {
		const cf="SectionListRendererTemplate";
		this.save_keys(`[${cf}]`,x);
		const {sectionListRenderer,...y}=x; this.g(y); // ! #destructure
		this.SectionListDataTemplate(sectionListRenderer);
	}
	/** @template {{}} T @arg {ContentsArrayTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	ContentsArrayTemplate(x,f) {
		const cf="ContentsArrayTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(x.contents,f);
	}
	/** @template T,U @arg {T$ItemSectionRendererTemplate<T,U>} x @arg {(this:this,x:[T,U])=>void} f */
	ItemSectionRendererTemplate(x,f) {
		const cf="ItemSectionRendererTemplate";
		this.save_keys(`[${cf}]`,x);
		const {itemSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.ItemSectionDataTemplate(itemSectionRenderer,f);
	}
	/** @template T,U @arg {ItemSectionDataTemplate<T,U>} x @arg {(this:this,x:[T,U])=>void} f */
	ItemSectionDataTemplate(x,f) {
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=x; this.g(y); // ! #destructure
		f.call(this,[sectionIdentifier,targetId]);
		this.trackingParams("ItemSectionData",trackingParams);
		let k=this.get_keys_of(contents);
		switch(k[0]) {
			default: debugger; break;
		}
	}
	/** @template T @arg {CommandTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	CommandTemplate(x,f) {
		const cf="CommandTemplate";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,command,...y}=x; this.g(y); // ! #destructure
		f.call(this,command);
		this.trackingParams("CommandTemplate",trackingParams);
	}
	/** @template {{}} T @arg {CommandsTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	CommandsTemplate(x,f) {
		const cf="CommandsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {commands,...y}=x; this.g(y); // ! #destructure
		this.z(commands,f);
	}
	/** @template {{}} T @template {CommandsTemplate<T>} C @arg {C} x @arg {(this:this,x:T)=>void} f */
	CommandsTemplate$Omit(x,f) {
		const cf="CommandsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {commands,...y}=x; // ! #destructure
		this.z(commands,f);
		return y;
	}
	/** @arg {string} cf @template {{}} U @template {EndpointTemplate<U>} T @arg {T} x @arg {(this:this,x:Omit<T,"clickTrackingParams"|"commandMetadata">)=>void} f */
	EndpointTemplate(cf,x,f) {
		const {clickTrackingParams,commandMetadata,...y}=x;
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
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
	/** @arg {T$SectionListDataTemplate<"comment-item-section", "engagement-panel-comments-section">} x */
	SectionListDataTemplate(x) {
		this.save_keys(`[SectionListDataTemplate<"comment-item-section","engagement-panel-comments-section">]`,x);
		const {contents,...y}=x; this.g(y); // ! #destructure
		this.SectionListItemTemplate(contents);
	}
	/** @arg {T$SectionListItemTemplate<"comment-item-section","engagement-panel-comments-section">} x */
	SectionListItemTemplate(x) {
		this.ItemSectionDataTemplate(x.itemSectionRenderer,a => {
			let v=this.join_string(a,"-");
			if(v!=="comment-item-section-engagement-panel-comments-section") debugger;
		});
	}
	/** @arg {ItemSectionRendererTemplate_Section<"comments-entry-point">} x */
	ItemSectionRendererTemplate_Section(x) {
		const cf="ItemSectionRendererTemplate_Section";
		this.save_keys(`[${cf}]`,x);
		const {itemSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.ItemSectionDataTemplate_Section(itemSectionRenderer);
	}
	/** @arg {ItemSectionDataTemplate_Section<"comments-entry-point">} x */
	ItemSectionDataTemplate_Section(x) {
		const cf="ItemSectionDataTemplate_Section";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,sectionIdentifier,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.ItemSectionItem);
		this.trackingParams("ItemSectionData",trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @arg {D$SimpleText} x @arg {(this:this,x:{accessibility?:A$Accessibility})=>void} f */
	D$SimpleText(x,f=this.handle_accessibility) {
		const cf="SimpleText";
		if(!x) {debugger; return;}
		if(!("simpleText" in x)) {debugger; return;}
		this.save_keys(`[${cf}]`,x);
		const {simpleText,...y}=x; f.call(this,y);
		this.primitive_of_string(simpleText);
	}
	//#endregion
	//#region web_command_metadata
	/** @arg {M$GeneratedWebCommandMetadata} x */
	WebCommandMetadata(x) {
		const cf="GenericWebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
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
					/** @arg {M$GeneratedWebCommandMetadata} x */
					let typedef_str=this.codegen_new_typedef(x,`G$${url_type_ex}`,true);
					console.log(`
					-- [GeneratedWebCommandMetadata] --\n\n${typedef_str}
					---\n\n\tG$${url_type_ex},
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
					/** @arg {M$GeneratedWebCommandMetadata} x */
					this.codegen_new_typedef(x,`G$VE${cx}`);
					console.log(`\n\tG$VE${cx},`);
					console.log(`\n\tcase ${cx}: return this.GeneratedWebCommandMetadata(x);`);
				} break;
				case 3832: return this.GeneratedWebCommandMetadata(x);
				case 3854: return this.GeneratedWebCommandMetadata(x);
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
	/** @arg {M$GeneratedWebCommandMetadata} x */
	GeneratedWebCommandMetadata(x) {
		if("apiUrl" in x&&"sendPost" in x) {
			const {sendPost,apiUrl}=x;
			this.primitive_of(sendPost,"boolean");
			this.parser.parse_url("GeneratedWebCommandMetadata",apiUrl);
		}
	}
	/** @arg {M$GeneratedWebCommandMetadata} x */
	WebCommandMetadataRVE(x) {
		if(!("rootVe" in x)) return;
		this.rootVe(x.rootVe);
		debugger;
		switch(x.webPageType) {
			default: debugger; return;
			case "WEB_PAGE_TYPE_BROWSE": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_CHANNEL": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_PLAYLIST": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_SEARCH": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_SETTINGS": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_SHORTS": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_UNKNOWN": return this.WebCommandMetadata(x);
			case "WEB_PAGE_TYPE_WATCH": return this.WebCommandMetadata(x);
		}
	}
	/** @arg {M$VE96368$Metadata} x */
	VE96368_WebCommandMetadata(x) {
		const cf="VE96368_WebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {url,webPageType,rootVe: {},apiUrl,...y}=x; this.g(y); // ! #destructure
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {M$VE11487$Metadata} x */
	VE11487_WebCommandMetadata(x) {
		const cf="VE11487_WebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {url,webPageType,rootVe: {},apiUrl,...y}=x; this.g(y); // ! #destructure
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {M$VE3854$Metadata} x */
	VE3854_WebCommandMetadata(x) {
		const cf="VE3854_WebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {url,webPageType,rootVe: {},apiUrl,...y}=x; this.g(y); // ! #destructure
		if(url!=="/") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {M$VE6827$Metadata} x */
	VE6827_WebCommandMetadata(x) {
		const cf="VE6827_WebCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {url,webPageType,rootVe: {},apiUrl,...y}=x; this.g(y); // ! #destructure
		this.t(url,this.VE6827_PageUrl);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {D$VE6827$PageUrl} x */
	VE6827_PageUrl(x) {
		const cf="VE6827_PageUrl";
		/** @type {SplitOnce<D$VE6827$PageUrl,"/">[1]} */
		let su=split_string_once(x,"/")[1];
		let su1=split_string(su,"/");
		if(su1.length===1) {
			let [pt0]=su1;
			this.save_string(`[${cf}]`,`${pt0}`);
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
	//#endregion
	//#region endpoint
	/** @arg {E$CompactLink$navigationEndpoint} x */
	E$CompactLink$navigationEndpoint(x) {
		if("uploadEndpoint" in x) return this.E$UploadEndpoint(x);
		if("signalNavigationEndpoint" in x) return this.E$SignalNavigationEndpoint(x);
		debugger;
	}
	/** @arg {E$SignalNavigationEndpoint} x */
	E$SignalNavigationEndpoint(x) {
		const cf="SignalNavigationEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,signalNavigationEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams("SignalNavigationEndpoint",clickTrackingParams);
		if(commandMetadata.webCommandMetadata.rootVe!==83769) debugger;
		this.CommandMetadata(commandMetadata);
		this.SignalNavigationArgs(signalNavigationEndpoint);
	}
	/** @arg {E$UploadEndpoint} x */
	E$UploadEndpoint(x) {
		const cf="UploadEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,uploadEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$Upload(uploadEndpoint);
	}
	/** @arg {E$Upload} x */
	E$Upload(x) {
		this.save_keys("[E$Upload]",x);
		const {hack,...y}=x; this.g(y); // ! #destructure
		if(hack!==true) debugger;
	}
	/** @arg {E$Signal_ClientSignal} x */
	E$Signal_ClientSignal(x) {
		const cf="SendFeedbackAction";
		this.save_keys(`[E$${cf}]`,x);
		const {signal,actions,...y}=x; this.g(y); // ! #destructure
		if(signal!=="CLIENT_SIGNAL") debugger;
		this.z(actions,x => {
			if("signalAction" in x) return this.A$SignalAction(x);
			if("openPopupAction" in x) return this.A$OpenPopupAction(x);
			if("sendFeedbackAction" in x) return this.A$SendFeedbackAction(x);
			if("showEngagementPanelEndpoint" in x) return this.E$ShowEngagementPanelEndpoint(x);
			this.do_codegen(cf,x);
			debugger;
		});
	}
	/** @arg {Extract<E$Signal_ClientSignal['actions'][number],{showEngagementPanelEndpoint:any}>} x */
	E$ShowEngagementPanelEndpoint(x) {
		const cf="ShowEngagementPanelEndpoint";
		this.save_keys(`[E$${cf}]`,x);
		const {clickTrackingParams,...z}=x;
		let panel_id=this.w(this.w(z));
		switch(panel_id) {
			default: console.log(`-- [ShowEngagementPanelEndpoint] --\n\n\ncase "${panel_id}": break;`); debugger; break;
			case "engagement-panel-searchable-transcript": break;
		};
	}
	/** @arg {A$SendFeedbackAction} x */
	A$SendFeedbackAction(x) {
		const cf="SendFeedbackAction";
		this.save_keys(`[A$${cf}]`,x);
		const {clickTrackingParams,...z}=x;
		let a=this.w(z);
		const {bucket,...y}=a; this.g(y);
		if(bucket!=="Kevlar") debugger;
		if(this.eq_keys(this.get_keys_of(a),["bucket"])) return;
		debugger;
	}
	/** @arg {E$Signal$GetAccountMenu} x */
	E$Signal$GetAccountMenu(x) {
		const cf="Signal$GetAccountMenu";
		this.save_keys(`[E$${cf}]`,x);
		const {signal,actions,...y}=x; this.g(y); // ! #destructure
		if(signal!=="GET_ACCOUNT_MENU") debugger;
		this.z(actions,this.A$OpenPopupAction);
	}
	/** @arg {E$FeedbackEndpoint} x */
	E$FeedbackEndpoint(x) {
		const cf="FeedbackEndpoint";
		this.save_keys(`[E$${cf}]`,x);
		const {clickTrackingParams,commandMetadata,feedbackEndpoint,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$Feedback(feedbackEndpoint);
	}
	/** @arg {E$Feedback} x */
	E$Feedback(x) {
		const cf="FeedbackEndpointData";
		this.save_keys(`[${cf}]`,x);
		const {feedbackToken,uiActions,actions,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(feedbackToken);
		this.UiActions(uiActions);
		this.tz(actions,this.ReplaceEnclosingAction);
	}
	/** @arg {E$NotificationOptOutEndpoint} x */
	E$NotificationOptOutEndpoint(x) {
		const cf="NotificationOptOutEndpoint";
		this.save_keys(`[E$${cf}]`,x);
		const {clickTrackingParams,commandMetadata,notificationOptOutEndpoint: v,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		const {optOutText,serializedOptOut,serializedRecordInteractionsRequest,...y1}=v; this.g(y1);
		this.D$TextWithRuns(optOutText);
		this.primitive_of_string(serializedOptOut);
		this.primitive_of_string(serializedRecordInteractionsRequest);
	}
	/** @arg {E$ShareEntityServiceEndpoint} x */
	E$ShareEntityServiceEndpoint(x) {
		const cf="E$ShareEntityServiceEndpoint";
		this.save_keys(`[E$${cf}]`,x);
		let q=this.CommandsTemplate$Omit(this.w(this.EB$Endpoint(cf,x)),this.A$OpenPopupAction);
		let {serializedShareEntity,...y}=q; this.g(y);
		this.primitive_of_string(serializedShareEntity);
	}
	/** @arg {string} cf @template {EB$Endpoint} T @arg {T} x */
	EB$Endpoint(cf,x) {
		const {clickTrackingParams,commandMetadata,...y}=x; // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		return y;
	}
	/** @arg {EG$MenuServiceEndpoints} x */
	EG$MenuServiceEndpoints(x) {
		const cf="MenuServiceEndpoints";
		this.save_keys(`[${cf}]`,x);
		if("playlistEditEndpoint" in x) return this.E$PlaylistEditEndpoint(x);
		if("getReportFormEndpoint" in x) return this.GetReportFormEndpoint(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E$AddToPlaylistServiceEndpoint(x);
		if("feedbackEndpoint" in x) return this.E$FeedbackEndpoint(x);
		if("notificationOptOutEndpoint" in x) return this.E$NotificationOptOutEndpoint(x);
		if("shareEntityServiceEndpoint" in x) return this.E$ShareEntityServiceEndpoint(x);
		if("likeEndpoint" in x) return this.E$Like(x.likeEndpoint);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		console.log("");
		this.do_codegen("EG$MenuService",x);
	}
	/** @arg {E$AddToPlaylistServiceEndpoint} x */
	E$AddToPlaylistServiceEndpoint(x) {
		let q=this.w(this.EB$Endpoint("AddToPlaylistServiceEndpoint",x));
		let {videoId}=q;
		this.videoId(videoId);
	}
	/** @arg {E$GetReportFormEndpoint} x */
	GetReportFormEndpoint(x) {
		let {params}=this.w({x: x.getReportFormEndpoint});
		this.t(params,a => this.params("GetReportForm","report.params",a));
	}
	/** @arg {E$SubscribeEndpoint} x */
	E$SubscribeEndpoint(x) {
		const cf="SubscribeEndpoint";
		this.save_keys(`[E$${cf}]`,x);
		const {clickTrackingParams,commandMetadata,subscribeEndpoint,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.params(cf,"subscribe.params",subscribeEndpoint.params);
	}
	/** @arg {E$SignalServiceEndpoint} x */
	E$SignalServiceEndpoint(x) {
		const cf="E$SignalServiceEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$SignalService(signalServiceEndpoint);
	}
	/** @arg {E$SignalService} x */
	E$SignalService(x) {
		const cf="SignalServiceEndpointData";
		this.save_keys(`[${cf}]`,x);
		switch(x.signal) {
			case "CLIENT_SIGNAL": return this.E$Signal_ClientSignal(x);
			case "GET_ACCOUNT_MENU": return this.E$Signal$GetAccountMenu(x);
		}
	}
	/** @arg {E$PlaylistEditEndpoint} x */
	E$PlaylistEditEndpoint(x) {
		const cf="PlaylistEditEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,playlistEditEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$PlaylistEdit(playlistEditEndpoint);
	}
	/** @arg {E$PlaylistEdit} x */
	E$PlaylistEdit(x) {
		const cf="PlaylistEditEndpointData";
		this.save_keys(`[${cf}]`,x);
		const {playlistId,actions,params,...y}=x; this.g(y); // ! #destructure
		this.playlistId(playlistId);
		if(actions.length!==1) debugger;
		this.PlaylistAction(actions[0]);
		this.t(params,a => this.params("PlaylistEdit","playlist_edit.params",a));
	}
	/** @private @arg {E$UrlEndpoint} x */
	E$UrlEndpoint(x) {
		const cf="UrlEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,urlEndpoint,...y1}=x; this.g(y1);
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$Url(urlEndpoint);
	}
	/** @private @arg {E$Url} x */
	E$Url(x) {
		const cf="UrlEndpointData";
		this.save_keys(`[${cf}]`,x);
		const {url,target,nofollow,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(url);
		if(target&&target!=="TARGET_NEW_WINDOW") debugger;
		if(nofollow&&!nofollow) debugger;
	}
	/** @arg {E$GetTranscriptEndpoint} x */
	E$GetTranscriptEndpoint(x) {
		const cf="GetTranscriptEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,getTranscriptEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$GetTranscript(getTranscriptEndpoint);
	}
	/** @arg {E$GetTranscript} x */
	E$GetTranscript(x) {
		const cf="GetTranscriptData";
		this.save_keys(`[${cf}]`,x);
		const {params,...y}=x; this.g(y); // ! #destructure
		this.params("GetTranscript","get_transcript.params",params);
	}
	/** @arg {E$BrowseEndpoint} x */
	E$BrowseEndpoint(x) {
		const cf="BrowseEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,browseEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.t(commandMetadata,this.CommandMetadata);
		this.E$Browse(browseEndpoint);
	}
	/** @arg {E$Browse} x */
	E$Browse(x) {
		const cf="Browse";
		this.save_keys(`[${cf}]`,x);
		const {browseId,params,canonicalBaseUrl,...y}=x; this.g(y); // ! #destructure
		this.t(browseId,this.browseId);
		this.t(params,a => this.params(cf,"browse.params",a));
		this.t(canonicalBaseUrl,a => this.parser.parse_url(cf,a));
	}
	/** @arg {YTNavigateFinishDetail['endpoint']} x */
	E$PageEndpoint(x) {
		const cf="PageEndpoint";
		this.save_keys(`[${cf}]`,x);
		if("browseEndpoint" in x) {
			return this.E$BrowseEndpoint(x);
		} else if("watchEndpoint" in x) {
			return this.E$WatchEndpoint(x);
		} else if("reelWatchEndpoint" in x) {
			return this.E$ReelWatchEndpoint(x);
		} else if("searchEndpoint" in x) {
			return this.E$SearchEndpoint(x);
		}
		debugger;
	}
	/** @arg {E$ReelWatchEndpoint} x */
	E$ReelWatchEndpoint(x) {
		const cf="ReelWatchEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,reelWatchEndpoint,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.D$ReelWatch(reelWatchEndpoint);
	}
	/** @arg {E$ReelWatch} x */
	D$ReelWatch(x) {
		const cf="D$ReelWatch";
		this.save_keys(`[${cf}]`,x);
		const {videoId,playerParams,thumbnail,overlay,params,sequenceProvider,sequenceParams,inputType,...y}=x; this.g(y); // ! #destructure
		this.t(videoId,this.videoId);
		this.playerParams("ReelWatch","reel.player_params",playerParams);
		this.t(thumbnail,this.Thumbnail);
		this.ReelPlayerOverlayRenderer(overlay);
		this.params("ReelWatch","get_transcript.params",params);
		this.t(sequenceProvider,a => this.save_enum("REEL_WATCH_SEQUENCE_PROVIDER",a));
		this.t(sequenceParams,a => this.params("ReelWatch","reel.sequence_params",a));
		this.t(inputType,a => this.save_enum("REEL_WATCH_INPUT_TYPE",a));
	}
	/** @arg {E$LikeEndpoint} x */
	E$LikeEndpoint(x) {
		const cf="LikeEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,likeEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$Like(likeEndpoint);
	}
	/** @arg {E$LikeDislike} x */
	E$LikeDislike(x) {
		this.save_keys("[E$LikeDislike]",x);
		const {target: b,status: {},dislikeParams,...a}=x; this.g(a);
		this.LikeApiData(b);
		this.params("Next","next.queue_context_params",dislikeParams);
		this.primitive_of_string(dislikeParams);
	}
	/** @arg {E$LikeIndifferent} x */
	E$LikeIndifferent(x) {
		this.save_keys("[E$LikeIndifferent]",x);
		const {target: b,status: {},removeLikeParams,...a}=x; this.g(a);
		this.LikeApiData(b);
		this.t(removeLikeParams,a => this.params("LikeEndpoint","like.remove_like_params",a));
	}
	/** @arg {MusicLibraryStatusUpdateCommand} x */
	LikeAction(x) {
		this.save_keys("[A$LikeAction]",x);
		if("musicLibraryStatusUpdateCommand" in x) return this.MusicLibraryStatusUpdateCommand(x);
		debugger;
	}
	/** @arg {E$LikeLike} x */
	E$LikeLike(x) {
		this.save_keys("[E$LikeLike]",x);
		const {target: b,status: {},actions,likeParams,...a}=x; this.g(a);
		this.LikeApiData(b);
		this.tz(actions,this.LikeAction);
		this.t(likeParams,a => this.params("LikeEndpoint","like.likeParams",a));
	}
	/** @arg {E$Like} x */
	E$Like(x) {
		this.save_keys("[E$Like]",x);
		switch(x.status) {
			case "DISLIKE": return this.E$LikeDislike(x);
			case "INDIFFERENT": return this.E$LikeIndifferent(x);
			case "LIKE": return this.E$LikeLike(x);
		}
	}
	/** @arg {E$RecordNotificationInteractionsEndpoint} x */
	E$RecordNotificationInteractionsEndpoint(x) {
		const cf="RecordNotificationInteractionsEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,recordNotificationInteractionsEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$RecordNotificationInteractions(recordNotificationInteractionsEndpoint);
	}
	/** @arg {E$RecordNotificationInteractions} x */
	E$RecordNotificationInteractions(x) {
		const cf="RecordNotificationInteractions";
		this.save_keys(`[${cf}]`,x);
		const {serializedInteractionsRequest,...y}=x; this.g(y); // ! #destructure
		this.serializedInteractionsRequest(cf,serializedInteractionsRequest);
	}
	//#endregion {E$}
	//#region general done
	/** @arg {WatchPageResponse} x */
	WatchPageResponse(x) {
		const cf="WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: this.VE3832_WatchPageResponse(x); break;
			default: debugger; break;
		} else {
			this.Generic_WatchPageResponse(x);
		}
	}
	/** @arg {Generic_WatchPageResponse} x */
	Generic_WatchPageResponse(x) {
		const cf="Generic_WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=x; this.g(y); // ! #destructure
		this.E$WatchEndpoint(endpoint);
		this.WatchResponse(response);
		this.PlayerResponse(playerResponse);
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @arg {R$VE3832$WatchPageResponse} x */
	VE3832_WatchPageResponse(x) {
		const cf="WatchPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page: {},preconnect,playerResponse,response,...y}=x; this.g(y); // ! #destructure
		if(rootVe!==3832) debugger;
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[VE3832.${cf}.wp_params]`,wp_params);
		this.E$WatchEndpoint(endpoint);
		if(preconnect!==void 0) this.parse_preconnect_arr(preconnect);
		this.PlayerResponse(playerResponse);
		this.WatchResponse(response);
	}
	/** @arg {R$Watch} x */
	WatchResponse(x) {
		const cf="WatchResponse";
		this.save_keys(`[${cf}]`,x);
		this.x.get("yt_plugin").add_function({
			name: "data",
			data: {
				WatchResponse: x,
			},
		});
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=x; this.g(y); // ! #destructure
		this.ResponseContext(responseContext);
		this.TwoColumnWatchNextResults(contents);
		this.E$WatchEndpoint(currentVideoEndpoint);
		this.trackingParams("WatchResponse",trackingParams);
		this.PlayerOverlayRenderer(playerOverlays);
		this.z(onResponseReceivedEndpoints,a => this.ResponseReceivedEndpointItem("WatchResponse",a));
		this.z(engagementPanels,this.EngagementPanelSectionListRenderer);
		this.DesktopTopbarRenderer(topbar);
		this.z(pageVisualEffects,this.CinematicContainerRenderer);
		this.FrameworkUpdates(frameworkUpdates);
	}
	/** @arg {A$FrameworkUpdates} x */
	FrameworkUpdates(x) {
		const cf="FrameworkUpdates";
		this.save_keys(`[${cf}]`,x);
		const {entityBatchUpdate,elementUpdate,...y}=x; this.g(y); // ! #destructure
		this.EntityBatchUpdateData(entityBatchUpdate);
		this.t(elementUpdate,this.ElementUpdate);
	}
	/** @arg {R$CinematicContainer} x */
	CinematicContainerRenderer(x) {
		const cf="CinematicContainerRenderer";
		this.save_keys(`[${cf}]`,x);
		const {cinematicContainerRenderer,...y}=x; this.g(y); // ! #destructure
		this.CinematicContainer(cinematicContainerRenderer);
	}
	/** @arg {D$CinematicContainer} x */
	CinematicContainer(x) {
		const cf="CinematicContainerData";
		this.save_keys(`[${cf}]`,x);
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=x; this.g(y); // ! #destructure
		if(backgroundImageConfig) 1;
		if(gradientColorConfig) 1;
		if(presentationStyle) 1;
		if(config) 1;
	}
	/** @arg {BrowseEditPlaylistResponse} x */
	BrowseEditPlaylistResponse(x) {
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
	/** @arg {BrowsePageResponse} x */
	BrowsePageResponse(x) {
		const cf="BrowsePageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page,response,expirationTime,previousCsn,...y}=x; this.g(y); // ! #destructure
		this.t(rootVe,a => this.save_number("[BrowsePageResponse.rootVe]",a));
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.E$BrowseEndpoint(endpoint);
		if(page!=="browse") debugger;
		this.BrowseResponse(response);
		this.t(expirationTime,a => this.primitive_of(a,"number"));
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @arg {RC$ResponseContext} x */
	ResponseContext(x) {
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
	/** @arg {RC$A$RelevantStateTags} x */
	RelevantStateTags(x) {
		const cf="RelevantStateTags";
		this.save_keys(`[${cf}]`,x);
		const {relevantStateTags,...y}=x; this.g(y); // ! #destructure
		this.z(relevantStateTags,this.StateTag);
	}
	/** @arg {RC$ConsistencyTokenJar} x */
	ConsistencyTokenJar(x) {
		const cf="ConsistencyTokenJar";
		this.save_keys(`[${cf}]`,x);
		const {encryptedTokenJarContents,expirationSeconds,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @arg {RC$WebResponseContextExtensionData} x */
	WebResponseContextExtensionData(x) {
		const cf="WebResponseContextExtensionData";
		this.save_keys(`[${cf}]`,x);
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=x; this.g(y); // ! #destructure
		if(hasDecorated!==void 0) this.primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,this.YtConfigData);
		this.t(webPrefetchData,this.WebPrefetchData);
	}
	/** @arg {YtConfigData} x */
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
	/** @arg {WebPrefetchData} x */
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
	/** @arg {RC$MainAppWebResponseContext} x */
	MainAppWebResponseContext(x) {
		const cf="MainAppWebResponseContext";
		this.save_keys(`[${cf}]`,x);
		const {datasyncId,loggedOut,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(datasyncId);
		this.primitive_of(loggedOut,"boolean");
	}
	/** @arg {BrowseResponse} x */
	BrowseResponse(x) {
		const cf="BrowseResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,...y1}=x;
		this.ResponseContext(responseContext);
		this.t(header,this.BrowseHeader);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedActions,this.ResponseReceivedAction);
		this.t(contents,this.BrowseContents);
		const {topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,...y2}=y1;
		this.t(topbar,this.DesktopTopbarRenderer);
		this.t(frameworkUpdates,this.EntityBatchUpdate);
		this.t(sidebar,this.BrowseSidebar);
		this.tz(observedStateTags,this.StateTag);
		this.t(cacheMetadata,this.CacheMetadata);
		const {metadata,microformat,maxAgeStoreSeconds,background,...y3}=y2;
		this.t(metadata,this.BrowseMetadata);
		this.t(microformat,this.MicroformatDataRenderer);
		this.t(maxAgeStoreSeconds,a => this.primitive_of(a,"number"));
		this.t(background,this.MusicThumbnailRenderer);
		const {continuationContents,alerts,...y}=y3; this.g(y);
		this.t(continuationContents,this.ContinuationContents);
		this.t(alerts,a => this.Response_alerts(cf,a));
	}
	/** @arg {NonNullable<BrowseResponse['metadata']>} x */
	BrowseMetadata(x) {
		if("channelMetadataRenderer" in x) return this.ChannelMetadataRenderer(x);
		if("playlistMetadataRenderer" in x) return this.PlaylistMetadataRenderer(x);
		debugger;
	}
	/** @arg {BrowseSidebar} x */
	BrowseSidebar(x) {
		if("settingsSidebarRenderer" in x) return this.SettingsSidebarRenderer(x);
		if("playlistSidebarRenderer" in x) return this.PlaylistSidebarRenderer(x);
		debugger;
	}
	/** @arg {DropdownRenderer} x */
	DropdownRenderer(x) {
		const {dropdownRenderer,...y}=x; this.g(y); // ! #destructure
		this.DropdownData(dropdownRenderer);
	}
	/** @arg {DropdownData} x */
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
	/** @arg {PlaylistSidebarRenderer} x */
	PlaylistSidebarRenderer(x) {
		this.PlaylistSidebar(x.playlistSidebarRenderer);
	}
	/** @arg {PlaylistSidebar} x */
	PlaylistSidebar(x) {
		const cf="PlaylistSidebar";
		this.z(x.items,this.PlaylistSidebarItem);
		this.trackingParams(cf,x.trackingParams);
	}
	/** @arg {PlaylistSidebarItem} x */
	PlaylistSidebarItem(x) {
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.PlaylistSidebarPrimaryInfoRenderer(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.PlaylistSidebarSecondaryInfoRenderer(x);
		debugger;
	}
	/** @arg {PlaylistSidebarSecondaryInfoRenderer} x */
	PlaylistSidebarSecondaryInfoRenderer(x) {
		this.PlaylistSidebarSecondaryInfo(x.playlistSidebarSecondaryInfoRenderer);
	}
	/** @arg {PlaylistSidebarSecondaryInfo} x */
	PlaylistSidebarSecondaryInfo(x) {
		this.VideoOwnerRenderer(x.videoOwner);
	}
	/** @arg {VideoOwnerRenderer} x */
	VideoOwnerRenderer(x) {
		this.VideoOwnerData(x.videoOwnerRenderer);
	}
	/** @arg {AlertWithButtonRenderer} x */
	AlertWithButtonRenderer(x) {
		const cf="AlertWithButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {alertWithButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.AlertWithButton(alertWithButtonRenderer);
	}
	/** @arg {AlertWithButton} x */
	AlertWithButton(x) {
		const cf="AlertWithButton";
		this.save_keys(`[${cf}]`,x);
		const {type,text,dismissButton,...y}=x; this.g(y); // ! #destructure
		switch(type) {
			case "INFO": break;
			default: debugger;
		}
		this.D$SimpleText(text);
		this.R$ButtonRenderer(dismissButton);
	}
	/** @arg {R$ButtonRenderer} x */
	R$ButtonRenderer(x) {
		if(!x) {debugger; return;}
		const cf="ButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {buttonRenderer,...y}=x; this.g(y); // ! #destructure
		this.D$Button(buttonRenderer);
	}
	/** @arg {D$Button} x */
	D$Button(x) {
		const cf="ButtonData";
		this.save_keys(`[${cf}]`,x);
		const {accessibility,accessibilityData,command,icon,isDisabled,serviceEndpoint,navigationEndpoint,tooltip,size,style,text,trackingParams,hint,targetId,...y}=x; this.g(y); // ! #destructure
		if(accessibility) return this.LabelData(accessibility);
		this.t(accessibilityData,this.A$Accessibility);
		this.t(command,this.ButtonCommand);
		this.t(icon,this.Icon);
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
		this.t(text,this.TextT);
		this.t_cf(cf,trackingParams,this.trackingParams);
		this.t(hint,this.R$Hint);
		this.t(targetId,a => {
			/** @type {D$Button$TargetId} */
			switch(a) {
				case "clip-info-button": break;
				case "sponsorships-button": return;
				default: console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`); debugger;
			}
			this.targetId(cf,a);
		});
	}
	/** @arg {R$Hint} x */
	R$Hint(x) {
		const cf="HintRenderer";
		this.save_keys(`[${cf}]`,x);
		const {hintRenderer,...y}=x; this.g(y); // ! #destructure
		this.D$Hint(hintRenderer);
	}
	/** @private @arg {D$Hint} x */
	D$Hint(x) {
		const cf="HintRendererData";
		this.save_keys(`[${cf}]`,x);
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=x; this.g(y); // ! #destructure
		if(hintId!=="sponsor-pre-purchase") debugger;
		if(dwellTimeMs!=="60000") debugger;
		this.HintCap(hintCap);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {HintCap} x */
	HintCap(x) {
		const cf="HintCap";
		this.save_keys(`[${cf}]`,x);
		const {impressionCap,...y}=x; this.g(y);
		if(impressionCap!=="1") debugger;
	}
	/** @arg {C$SectionList|MusicShelfContinuation} x */
	ContinuationContents(x) {
		const cf="ContinuationContents";
		this.save_keys(`[${cf}]`,x);
		if("sectionListContinuation" in x) {
			return this.SectionListContinuation(x);
		} else if("musicShelfContinuation" in x) {
			return this.MusicShelfContinuation(x);
		}
		debugger;
	}
	/** @arg {C$SectionList} x */
	SectionListContinuation(x) {
		const cf="SectionListContinuation";
		this.save_keys(`[${cf}]`,x);
		this.SectionListData(x.sectionListContinuation);
	}
	/** @arg {G$SectionList} x */
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
		this.tz(continuations,this.NextContinuationData);
		this.trackingParams(cf,trackingParams);
		this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
	}
	/** @arg {D$SearchFeedSectionList} x */
	SearchFeedSectionListData(x) {
		const cf="SearchFeedSectionListData";
		this.save_keys(`[${cf}]`,x);
		const {contents,continuations,trackingParams,subMenu,hideBottomSeparator,targetId,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.SectionListItem);
		this.tz(continuations,this.NextContinuationData);
		this.trackingParams(cf,trackingParams);
		this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
		this.t(targetId,a => this.targetId(cf,a));
	}
	/** @arg {A$NextContinuationData} x */
	NextContinuationData(x) {
		const cf="NextContinuationData";
		this.save_keys(`[${cf}]`,x);
		this.NextContinuation(x.nextContinuationData);
	}
	/** @arg {D$NextContinuation} x */
	NextContinuation(x) {
		const cf="NextContinuation";
		this.save_keys(`[${cf}]`,x);
		this.clickTrackingParams("NextContinuation",x.clickTrackingParams);
		this.primitive_of(x.continuation,"string");
	}
	/** @arg {$SectionListItem} x */
	SectionListItem(x) {
		const cf="SectionListItem";
		this.save_keys(`[${cf}]`,x);
		if("itemSectionRenderer" in x) {
			return this.ItemSectionRenderer(x);
		} else if("continuationItemRenderer" in x) {
			this.ContinuationItemRenderer(x);
		} else if("musicCarouselShelfRenderer" in x) {
			this.MusicCarouselShelfRenderer(x);
		} else if("musicShelfRenderer" in x) {
			this.MusicShelfRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {MusicCarouselShelfRenderer} x */
	MusicCarouselShelfRenderer(x) {
		const cf="MusicCarouselShelfRenderer";
		this.save_keys(`[${cf}]`,x);
		this.MusicCarouselShelf(x.musicCarouselShelfRenderer);
	}
	/** @arg {MusicShelfRenderer} x */
	MusicShelfRenderer(x) {
		const cf="MusicShelfRenderer";
		this.save_keys(`[${cf}]`,x);
		this.MusicShelf(x.musicShelfRenderer);
	}
	/** @arg {MusicShelf} x */
	MusicShelf(x) {
		const cf="MusicShelf";
		this.save_keys(`[${cf}]`,x);
		this.ContentsArrayTemplate(x,a => {
			if("musicResponsiveListItemRenderer" in a) {
				this.MusicResponsiveListItemRenderer(a);
			} else debugger;
		});
		this.D$TextWithRuns(x.title);
		this.trackingParams("MusicShelf",x.trackingParams);
		this.z(x.continuations,this.ReloadContinuationData);
	}
	/** @arg {ReloadContinuationData} x */
	ReloadContinuationData(x) {
		const cf="ReloadContinuationData";
		this.save_keys(`[${cf}]`,x);
		this.ReloadContinuationDataInner(x.reloadContinuationData);
	}
	/** @arg {ReloadContinuationDataInner} x */
	ReloadContinuationDataInner(x) {
		const cf="ReloadContinuationDataInner";
		this.save_keys(`[${cf}]`,x);
		const {continuation,clickTrackingParams,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(continuation);
		this.clickTrackingParams("ReloadContinuationDataInner",clickTrackingParams);
	}
	/** @arg {MusicResponsiveListItemRenderer} x */
	MusicResponsiveListItemRenderer(x) {
		const cf="MusicResponsiveListItemRenderer";
		this.save_keys(`[${cf}]`,x);
		this.MusicResponsiveListItem(x.musicResponsiveListItemRenderer);
	}
	/** @arg {R$ContinuationItemRenderer} x */
	ContinuationItemRenderer(x) {
		const cf="ContinuationItemRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ContinuationItemData(x.continuationItemRenderer);
	}
	/** @arg {ContinuationItemData} x */
	ContinuationItemData(x) {
		const cf="ContinuationItemData";
		this.save_keys(`[${cf}]`,x);
		const {trigger,continuationEndpoint,button,ghostCards,...y}=x; this.g(y); // ! #destructure
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		// this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.ContinuationEndpointRoot(continuationEndpoint);
		this.t(button,this.R$ButtonRenderer);
		this.t(ghostCards,this.GhostGridRenderer);
	}
	/** @arg {ContinuationEndpointRoot} x */
	ContinuationEndpointRoot(x) {
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
	/** @arg {C$Continuation} x */
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
	/** @arg {CD$Continuation} x */
	ContinuationCommandData(x) {
		const cf="ContinuationCommandData";
		this.save_keys(`[${cf}]`,x);
		this.primitive_of(x.token,"string");
		this.save_enum("CONTINUATION_REQUEST_TYPE",x.request);
	}
	/** @arg {C$Continuation$CommandMetadata} x */
	ContinuationCommandMetadata(x) {
		const cf="ContinuationCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {webCommandMetadata,...y}=x; this.g(y); // ! #destructure
		debugger;
		// this.WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {GhostGridRenderer} x */
	GhostGridRenderer(x) {
		const cf="GhostGridRenderer";
		this.save_keys(`[${cf}]`,x);
		this.GhostGrid(x.ghostGridRenderer);
	}
	/** @arg {GhostGrid} x */
	GhostGrid(x) {
		const cf="GhostGrid";
		this.save_keys(`[${cf}]`,x);
		const {rows,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(rows,"number");
	}
	/** @arg {ItemSectionRenderer} x */
	ItemSectionRenderer(x) {
		const cf="ItemSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {itemSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.ItemSectionData(itemSectionRenderer);
	}
	/** @arg {ItemSectionData} x */
	ItemSectionData(x) {
		const cf="ItemSectionData";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,sectionIdentifier,targetId,header,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.ItemSectionItem);
		this.trackingParams(cf,trackingParams);
		if(targetId) {
			this.primitive_of_string(targetId);
			this.targetId(cf,as(targetId));
			this.save_string("[ItemSectionData.hash]",`section-${sectionIdentifier}-id-${targetId}`);
		} else {
			this.save_string("[ItemSectionData.hash]",`section-${sectionIdentifier}`);
		}
		this.t(header,this.ItemSectionHeaderRenderer);
	}
	/** @arg {ItemSectionHeaderRenderer} x */
	ItemSectionHeaderRenderer(x) {
		this.ItemSectionHeader(x.itemSectionHeaderRenderer);
	}
	/** @arg {ItemSectionHeader} x */
	ItemSectionHeader(x) {
		this.D$TextWithRuns(x.title);
		this.D$TextWithRuns(x.subtitle);
	}
	/** @arg {MusicThumbnailRenderer} x */
	MusicThumbnailRenderer(x) {
		const cf="MusicThumbnailRenderer";
		this.save_keys(`[${cf}]`,x);
		if(!x.musicThumbnailRenderer) debugger;
		this.MusicThumbnailData(x.musicThumbnailRenderer);
	}
	/** @arg {MusicThumbnailData} x */
	MusicThumbnailData(x) {
		const cf="MusicThumbnailData";
		this.save_keys("[]",x);
		this.Thumbnail(x.thumbnail);
		this.save_enum("MUSIC_THUMBNAIL_CROP",x.thumbnailCrop);
		this.save_enum("MUSIC_THUMBNAIL_SCALE",x.thumbnailScale);
		this.trackingParams(cf,x.trackingParams);
	}
	/** @arg {D$Thumbnail} x */
	Thumbnail(x) {
		const cf="Thumbnail";
		this.save_keys(`[${cf}]`,x);
		const {thumbnails,accessibility,isOriginalAspectRatio,...y}=x; this.g(y); // ! #destructure
		this.z(thumbnails,this.ThumbnailItem);
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.A$Accessibility);
	}
	/** @arg {D$ThumbnailItem} x */
	ThumbnailItem(x) {
		const cf="ThumbnailItem";
		this.save_keys(`[${cf}]`,x);
		const {url,width,height,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(url);
		this.t(width,a => this.primitive_of(a,"number"));
		this.t(height,a => this.primitive_of(a,"number"));
	}
	/** @arg {MicroformatDataRenderer} x */
	MicroformatDataRenderer(x) {
		const cf="MicroformatDataRenderer";
		this.save_keys(`[${cf}]`,x);
		const {microformatDataRenderer,...y}=x; this.g(y); // ! #destructure
		this.t(microformatDataRenderer,this.MicroformatData);
	}
	/** @arg {MicroformatData} x */
	MicroformatData(x) {
		const cf="MicroformatData";
		this.save_keys(`[${cf}]`,x);
		let {urlCanonical,title,description,thumbnail,siteName,appName,androidPackage,iosAppStoreId,iosAppArguments,ogType,urlApplinksWeb,urlApplinksIos,urlApplinksAndroid,urlTwitterIos,urlTwitterAndroid,twitterCardType,twitterSiteHandle,schemaDotOrgType,noindex,unlisted,tags,familySafe,availableCountries,linkAlternates,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(urlCanonical);
		this.primitive_of_string(title);
		this.primitive_of_string(description);
		this.Thumbnail(thumbnail);
		this.primitive_of_string(siteName);
		this.primitive_of_string(appName);
		this.primitive_of_string(androidPackage);
		this.primitive_of_string(iosAppStoreId);
		this.primitive_of_string(iosAppArguments);
		this.primitive_of_string(ogType);
		this.primitive_of_string(urlApplinksWeb);
		this.primitive_of_string(urlApplinksIos);
		this.primitive_of_string(urlApplinksAndroid);
		this.primitive_of_string(urlTwitterIos);
		this.primitive_of_string(urlTwitterAndroid);
		this.primitive_of_string(twitterCardType);
		this.primitive_of_string(twitterSiteHandle);
		this.primitive_of_string(schemaDotOrgType);
		this.primitive_of(noindex,"boolean");
		this.primitive_of(unlisted,"boolean");
		this.tz(tags,this.primitive_of_string);
		this.t(familySafe,a => this.primitive_of(a,"boolean"));
		this.tz(availableCountries,this.primitive_of_string);
		this.z(linkAlternates,this.HrefUrl);
	}
	/** @arg {HrefUrl} x */
	HrefUrl(x) {
		const cf="HrefUrl";
		this.save_keys(`[${cf}]`,x);
		const {hrefUrl,...y}=x; this.g(y); // ! #destructure
		this.parser.parse_url("HrefUrl",as(hrefUrl));
	}
	/** @arg {YTNavigateFinishDetail} x */
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
	/** @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType";
		this.save_keys(`[${cf}]`,x);
		this.ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.BrowsePageResponse(x);
			case "watch": return this.WatchPageResponse(x);
			case "channel": return this.ChannelPageResponse(x);
			case "playlist": return this.PlaylistPageResponse(x);
			case "settings": return this.SettingsPageResponse(x);
			case "shorts": return this.ShortsPageResponse(x);
			case "search": return this.SearchPageResponse(x);
			default: break;
		}
		console.log("pt",x);
		debugger;
	}
	/** @private @arg {AccountMenuResponse} x */
	AccountMenuResponse(x) {
		const cf="AccountMenuResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(actions,x => {
			if("openPopupAction" in x) return this.A$OpenPopupAction(x);
			debugger;
		});
		this.trackingParams("AccountMenuResponse",trackingParams);
	}
	/** @arg {Response} response @arg {_ResponseTypes} x */
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
		this.ResponseContext(v.data.responseContext);
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
			case "account.account_menu": return this.AccountMenuResponse(x.data);
			case "account.accounts_list": return this.AccountsListResponse(x.data);
			case "account.set_setting": return this.SetSettingResponse(x.data);
			case "att.get": return this.AttGetResponse(x.data);
			case "att.log": return this.AttLogResponse(x.data);
			case "browse.edit_playlist": return this.BrowseEditPlaylistResponse(x.data);
			case "browse": return this.BrowseResponse(x.data);
			case "feedback": return this.FeedbackResponse(x.data);
			case "get_transcript": return this.GetTranscriptResponse(x.data);
			case "get_survey": return this.GetSurveyResponse(x.data);
			case "getAccountSwitcherEndpoint": return this.GetAccountSwitcherEndpointResponse(x.data);
			case "getDatasyncIdsEndpoint": return this.DatasyncIdsResponse(x.data);
			case "guide": return this.GuideResponse(x.data);
			case "like.like": return this.LikeLikeResponse(x.data);
			case "like.dislike": return this.DislikeResponse(x.data);
			case "like.removelike": return this.LikeRemoveLikeResponse(x.data);
			case "live_chat.get_live_chat_replay": return this.GetLiveChat(x.data);
			case "live_chat.get_live_chat": return this.GetLiveChat(x.data);
			case "music.get_search_suggestions": return this.GetSearchSuggestions(x.data);
			case "next": return this.NextResponse(x.data);
			case "notification.get_notification_menu": return this.GetNotificationMenuResponse(x.data);
			case "notification.get_unseen_count": return this.NotificationGetUnseenCountResponse(x.data);
			case "notification.modify_channel_preference": return this.ModifyChannelPreferenceResponse(x.data);
			case "notification.record_interactions": return this.SuccessResponse(x.data);
			case "player": return this.PlayerResponse(x.data);
			case "playlist.get_add_to_playlist": return this.GetAddToPlaylistResponse(x.data);
			case "reel.reel_item_watch": return this.ReelItemWatchResponse(x.data);
			case "reel.reel_watch_sequence": return this.ReelWatchSequenceResponse(x.data);
			case "share.get_share_panel": return this.GetSharePanel(x.data);
			case "subscription.subscribe": return this.SubscribeResponse(x.data);
			case "subscription.unsubscribe": return this.UnsubscribeResponse(x.data);
			case "search": return this.SearchApiResponse(x.data);
			case "updated_metadata": return this.UpdatedMetadata(x.data);
			case "pdg.get_pdg_buy_flow": return this.GetPdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @arg {GetSurveyResponse} x */
	GetSurveyResponse(x) {
		const cf="GetSurveyResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},trackingParams,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {GetPdgBuyFlow} x */
	GetPdgBuyFlow(x) {
		const cf="GetPdgBuyFlow";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=x; this.g(y); // ! #destructure
		this.A$OpenPopupAction(command);
		this.trackingParams(cf,trackingParams);
		this.FrameworkUpdates(frameworkUpdates);
	}
	/** @arg {OpenPopupAction} x */
	A$OpenPopupAction(x) {
		const cf="OpenPopupAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,openPopupAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.OpenPopupActionData(openPopupAction);
	}
	/** @arg {OpenPopupActionData['popup']} x */
	popup_generic(x) {
		this.AllPopups(x);
	}
	/** @arg {OpenPopupActionData['popupType']} x */
	parse_popup_type(x) {
		switch(x) {
			default: debugger; break;
			case "DIALOG": break;
			case "DROPDOWN": break;
			case "TOAST": break;
			case "TOP_ALIGNED_DIALOG": break;
		}
	}
	/** @arg {OpenPopupActionData} x */
	OpenPopupActionData(x) {
		const cf="OpenPopupActionData";
		this.save_keys(`[${cf}]`,x);
		if("beReused" in x) {
			const {popup,popupType,beReused,...y}=x; this.g(y); // ! #destructure
			this.popup_generic(popup);
			this.parse_popup_type(popupType);
			if(beReused!==true) debugger;
			return;
		}
		const {popup,popupType,...y}=x; this.g(y); // ! #destructure
		this.AllPopups(popup);
		this.parse_popup_type(popupType);
	}
	/** @arg {AllPopups} x */
	AllPopups(x) {
		const cf="AllPopups";
		this.save_keys(`[${cf}]`,x);
		if("confirmDialogRenderer" in x) return this.ConfirmDialogRenderer(x);
		if("multiPageMenuRenderer" in x) return this.MultiPageMenuRenderer(x);
		if("notificationActionRenderer" in x) return this.R$NotificationAction(x);
		if("pdgBuyFlowRenderer" in x) return this.PdgBuyFlowRenderer(x);
		if("unifiedSharePanelRenderer" in x) return this.UnifiedSharePanelRenderer(x);
		if("voiceSearchDialogRenderer" in x) return this.VoiceSearchDialogRenderer(x);
	}
	/** @arg {string} cf @arg {{}} x */
	do_codegen(cf,x) {
		let u_name=this.get_codegen_name(x);
		let gen_name=`${cf}$${u_name}`;
		this.codegen_new_typedef(x,gen_name);
	}
	/** @arg {{[U in string]: unknown}} x */
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
	/** @arg {PdgBuyFlowRenderer} x */
	PdgBuyFlowRenderer(x) {
		const cf="PdgBuyFlowRenderer";
		this.save_keys(`[${cf}]`,x);
		const {pdgBuyFlowRenderer,...y}=x; this.g(y); // ! #destructure
		this.PdgBuyFlow(pdgBuyFlowRenderer);
	}
	/** @arg {PdgBuyFlow} x */
	PdgBuyFlow(x) {
		const cf="PdgBuyFlow";
		this.save_keys(`[${cf}]`,x);
		const {header,content,trackingParams,onCloseCommand,...y}=x; this.g(y); // ! #destructure
		this.PdgBuyFlowHeaderRenderer(header);
		this.z(content,this.SuperVodBuyFlowContentRenderer);
		this.trackingParams(cf,trackingParams);
		this.GetSurveyCommand(onCloseCommand);
	}
	/** @arg {GetSurveyCommand} x */
	GetSurveyCommand(x) {
		const cf="GetSurveyCommand";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {PdgBuyFlowHeaderRenderer} x */
	PdgBuyFlowHeaderRenderer(x) {
		const cf="PdgBuyFlowHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {R$NotificationAction} x */
	R$NotificationAction(x) {
		const cf="NotificationActionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {notificationActionRenderer,...y}=x; this.g(y); // ! #destructure
		this.A$NotificationAction(notificationActionRenderer);
	}
	/** @arg {A$NotificationAction} x */
	A$NotificationAction(x) {
		const cf="NotificationActionData";
		this.save_keys(`[${cf}]`,x);
		const {responseText,actionButton,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(responseText);
		this.t(actionButton,this.R$ButtonRenderer);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {ConfirmDialogRenderer} x */
	ConfirmDialogRenderer(x) {
		const cf="MultiPageMenuRenderer";
		this.save_keys(`[${cf}]`,x);
		const {confirmDialogRenderer,...y}=x; this.g(y); // ! #destructure
		this.ConfirmDialogData(confirmDialogRenderer);
	}
	/** @arg {ConfirmDialogData} x */
	ConfirmDialogData(x) {
		const cf="ConfirmDialogData";
		this.save_keys(`[${cf}]`,x);
		const {title,trackingParams,dialogMessages,confirmButton,cancelButton,primaryIsCancel,...y}=x; this.g(y); // ! #destructure
		this.t(title,this.D$SimpleText);
		this.trackingParams(cf,trackingParams);
		this.z(dialogMessages,this.TextT);
		this.R$ButtonRenderer(confirmButton);
		this.R$ButtonRenderer(cancelButton);
		this.primitive_of(primaryIsCancel,"boolean");
	}
	/** @arg {MultiPageMenuRenderer} x */
	MultiPageMenuRenderer(x) {
		const cf="MultiPageMenuRenderer";
		this.save_keys(`[${cf}]`,x);
		const {multiPageMenuRenderer,...y}=x; this.g(y); // ! #destructure
		this.MultiPageMenu(multiPageMenuRenderer);
	}
	/** @arg {MultiPageMenu} x */
	MultiPageMenu(x) {
		const cf="MultiPageMenu";
		this.save_keys(`[${cf}]`,x);
		switch(x.style) {
			case "MULTI_PAGE_MENU_STYLE_TYPE_CREATION": {
				const {sections,style,trackingParams,...y}=x; this.g(y); // ! #destructure
				this.z(sections,a => {
					if("multiPageMenuSectionRenderer" in a) {
						return this.MultiPageMenuSectionRenderer(a);
					}
					style;
					trackingParams;
					debugger;
				});
			} return;
		}
		if("footer" in x) {
			const {header,sections,footer,style,...y}=x; this.g(y); // ! #destructure
			this.SimpleMenuHeaderRenderer(header);
			this.z(sections,a => {
				if("accountSectionListRenderer" in a) {
					return this.AccountSectionListRenderer(a);
				}
				debugger;
			});
			this.MultiPageMenuSectionRenderer(footer);
			if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER") debugger;
			return;
		}
		switch(x.style) {
			case "MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT": {
				const {trackingParams,style,showLoadingSpinner,...y}=x; this.g(y); // ! #destructure
				this.trackingParams(cf,trackingParams);
			} break;
			case "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS": {
				const {header,sections,trackingParams,style,...y}=x; this.g(y); // ! #destructure
				this.SimpleMenuHeaderRenderer(header);
				this.z(sections,a => {
					if(a.multiPageMenuNotificationSectionRenderer) {
						return this.MultiPageMenuNotificationSectionRenderer(a);
					}
					debugger;
				});
				this.trackingParams(cf,trackingParams);
			} break;
		}
		if("showLoadingSpinner" in x) {
			return;
		}
	}
	/** @arg {MultiPageMenuNotificationSectionRenderer} x */
	MultiPageMenuNotificationSectionRenderer(x) {
		const cf="MultiPageMenuNotificationSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {multiPageMenuNotificationSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.MultiPageMenuNotificationSection(multiPageMenuNotificationSectionRenderer);
	}
	/** @arg {ItemsTemplate<NotificationRenderer>} x */
	MultiPageMenuNotificationSection(x) {
		const cf="MultiPageMenuNotificationSection";
		this.save_keys(`[${cf}]`,x);
		const {items,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.NotificationRenderer);
		this.trackingParams("MultiPageMenuNotificationSection",trackingParams);
	}
	/** @arg {NotificationRenderer} x */
	NotificationRenderer(x) {
		const cf="NotificationRenderer";
		this.save_keys(`[${cf}]`,x);
		const {notificationRenderer,...y}=x; this.g(y); // ! #destructure
		this.Notification(notificationRenderer);
	}
	/** @arg {YtNotification} x */
	Notification(x) {
		const cf="Notification";
		this.save_keys(`[${cf}]`,x);
		const {thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,trackingParams,notificationId,...y}=x; this.g(y); // ! #destructure
		this.Thumbnail(thumbnail);
		this.Thumbnail(videoThumbnail);
		this.TextT(shortMessage);
		this.TextT(sentTimeText);
		this.NavigationEndpoint(navigationEndpoint);
		this.primitive_of(read,"boolean");
		this.E$RecordNotificationInteractionsEndpoint(recordClickEndpoint);
		this.MenuRenderer(contextualMenu);
		this.trackingParams(cf,trackingParams);
		this.primitive_of_string(notificationId);
	}
	/** @arg {"RecordNotificationInteractions"} root @arg {string} x */
	serializedInteractionsRequest(root,x) {
		/** @type {ParamsSection} */
		this.parser.on_serialized_interactions_request_params(root,"record_notification_interactions",x);
	}
	/** @arg {MultiPageMenuSectionRenderer<R$CompactLinkRenderer>} x */
	MultiPageMenuSectionRenderer(x) {
		const cf="MultiPageMenuSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {multiPageMenuSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.MultiPageMenuSection(multiPageMenuSectionRenderer);
	}
	/** @arg {MultiPageMenuSection<R$CompactLinkRenderer>} x */
	MultiPageMenuSection(x) {
		const cf="MultiPageMenuSection";
		this.save_keys(`[${cf}]`,x);
		const {items,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(items,a => {
			if("compactLinkRenderer" in a) return this.CompactLinkRenderer(a);
			debugger;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {R$CompactLinkRenderer} x */
	CompactLinkRenderer(x) {
		const cf="CompactLinkRenderer";
		this.save_keys(`[${cf}]`,x);
		const {compactLinkRenderer,...y}=x; this.g(y); // ! #destructure
		this.CompactLinkData(compactLinkRenderer);
	}
	/** @arg {D$CompactLink} x */
	CompactLinkData(x) {
		const cf="CompactLinkData";
		this.save_keys(`[${cf}]`,x);
		const {icon,title,navigationEndpoint,trackingParams,style,...y}=x; this.g(y); // ! #destructure
		this.Icon(icon);
		this.TextT(title);
		this.t(navigationEndpoint,this.E$CompactLink$navigationEndpoint);
		this.trackingParams(cf,trackingParams);
		switch(style) {
			default: debugger; break;
			case undefined: break;
			case "COMPACT_LINK_STYLE_TYPE_ACCOUNT_SWITCHER_FOOTER": break;
			case "COMPACT_LINK_STYLE_TYPE_CREATION_MENU": break;
			case "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR": break;
		}
	}
	/** @arg {AccountSectionListRenderer} x */
	AccountSectionListRenderer(x) {
		const {accountSectionListRenderer,...y}=x; this.g(y); // ! #destructure
		this.AccountSectionListData(accountSectionListRenderer);
	}
	/** @arg {AccountSectionListData} x */
	AccountSectionListData(x) {
		const cf="SimpleMenuHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {contents,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.AccountItemSectionRenderer);
	}
	/** @arg {AccountItemSectionRenderer} x */
	AccountItemSectionRenderer(x) {
		const {accountItemSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.AccountItemSection(accountItemSectionRenderer);
	}
	/** @arg {AccountItemSection} x */
	AccountItemSection(x) {
		this.ContentsArrayTemplate(x,this.AccountItemSectionContent);
	}
	/** @arg {AccountItemSectionContent} x */
	AccountItemSectionContent(x) {
		if("compactLinkRenderer" in x) {
			return this.CompactLinkRenderer(x);
		} else if("accountItem" in x) {
			return this.AccountItem(x);
		}
		debugger;
	}
	/** @arg {SimpleMenuHeaderRenderer} x */
	SimpleMenuHeaderRenderer(x) {
		const {simpleMenuHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.SimpleMenuHeaderData(simpleMenuHeaderRenderer);
	}
	/** @arg {SimpleMenuHeader} x */
	SimpleMenuHeaderData(x) {
		const cf="SimpleMenuHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {title,buttons,...y}=x; this.g(y); // ! #destructure
		this.TextT(title);
		this.z(buttons,this.R$ButtonRenderer);
	}
	/** @arg {UpdatedMetadata} x */
	UpdatedMetadata(x) {
		const cf="UpdatedMetadata";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},continuation,actions,...y}=x; this.g(y); // ! #destructure
		this.TimedContinuationData(continuation);
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
	/** @arg {UpdateDescriptionAction} x */
	UpdateDescriptionAction(x) {
		const cf="UpdateDescriptionAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateDescriptionAction;
		this.save_keys(`[UpdateDescriptionActionData]`,x1);
		this.D$TextWithRuns(x1.description);
	}
	/** @arg {UpdateTitleAction} x */
	UpdateTitleAction(x) {
		const cf="UpdateTitleAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateTitleAction;
		this.save_keys(`[UpdateTitleActionData]`,x1);
		this.D$TextWithRuns(x1.title);
	}
	/** @arg {UpdateDateTextAction} x */
	UpdateDateTextAction(x) {
		const cf="UpdateDateTextAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateDateTextAction;
		this.save_keys(`[UpdateDateTextActionData]`,x1);
		this.D$SimpleText(x1.dateText);
	}
	/** @arg {UpdateToggleButtonTextAction} x */
	UpdateToggleButtonTextAction(x) {
		const cf="UpdateToggleButtonTextAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateToggleButtonTextAction; x1;
		this.save_keys(`[UpdateToggleButtonTextActionData]`,x1);
		if(x1.buttonId!=="TOGGLE_BUTTON_ID_TYPE_LIKE") debugger;
		this.D$SimpleText(x1.defaultText);
		this.D$SimpleText(x1.toggledText);
	}
	/** @arg {UpdateViewershipAction} x */
	UpdateViewershipAction(x) {
		const cf="UpdateViewershipAction";
		this.save_keys(`[${cf}]`,x);
		let x1=x.updateViewershipAction;
		this.save_keys(`[UpdateViewershipActionData]`,x1);
		this.VideoViewCountRenderer(x1.viewCount);
	}
	/** @arg {VideoViewCountRenderer} x */
	VideoViewCountRenderer(x) {
		const cf="VideoViewCountRenderer";
		this.save_keys(`[${cf}]`,x);
		this.VideoViewCountData(x.videoViewCountRenderer);
	}
	/** @arg {VideoViewCountData} x */
	VideoViewCountData(x) {
		const cf="VideoViewCountData";
		this.save_keys(`[${cf}]`,x);
		const {viewCount,shortViewCount,isLive,extraShortViewCount,...y}=x; this.g(y); // ! #destructure
		this.D$SimpleText(viewCount);
		this.t(shortViewCount,this.D$SimpleText);
		if(isLive!==void 0) this.primitive_of(isLive,"boolean");
		this.t(extraShortViewCount,this.D$SimpleText);
	}
	/** @arg {TimedContinuationData} x */
	TimedContinuationData(x) {
		const cf="TimedContinuationData";
		this.save_keys(`[${cf}]`,x);
		this.TimedContinuationDataInner(x.timedContinuationData);
	}
	/** @arg {TimedContinuationDataInner} x */
	TimedContinuationDataInner(x) {
		const cf="TimedContinuationDataInner";
		this.save_keys(`[${cf}]`,x);
		const {timeoutMs,continuation,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(timeoutMs,"number");
		this.primitive_of_string(continuation);
	}
	/** @arg {SearchApiResponse} x */
	SearchApiResponse(x) {
		const cf="SearchApiResponse";
		this.save_keys(`[${cf}]`,x);
		if("targetId" in x) return this.SearchResponse(x);
		const {responseContext: {},contents,continuationContents,trackingParams,header,...y}=x; this.g(y); // ! #destructure
		this.t(contents,this.TabbedSearchResultsRenderer);
		this.t(continuationContents,this.ContinuationContents);
		this.trackingParams(cf,trackingParams);
		this.t(header,this.MusicHeaderRenderer);
	}
	/** @arg {MusicShelfContinuation} x */
	MusicShelfContinuation(x) {
		const cf="MusicShelfContinuation";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {MusicHeaderRenderer} x */
	MusicHeaderRenderer(x) {
		const cf="MusicHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {SearchResponse} x */
	SearchResponse(x) {
		const cf="SearchResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(estimatedResults);
		this.TwoColumnSearchResultsRenderer(contents);
		this.trackingParams(cf,trackingParams);
		this.DesktopTopbarRenderer(topbar);
		this.z(refinements,this.primitive_of_string);
		this.z(onResponseReceivedCommands,a => {
			if("adsControlFlowOpportunityReceivedCommand" in a) {
				return this.AdsControlFlowOpportunityReceivedCommand(a);
			};
			debugger;
		});
		this.targetId(cf,targetId);
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommand} x */
	AdsControlFlowOpportunityReceivedCommand(x) {
		const cf="AdsControlFlowOpportunityReceivedCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AdsControlFlowOpportunityReceivedCommandData(adsControlFlowOpportunityReceivedCommand);
	}
	/** @arg {TwoColumnSearchResultsRenderer} x */
	TwoColumnSearchResultsRenderer(x) {
		const cf="TwoColumnSearchResultsRenderer";
		this.save_keys(`[${cf}]`,x);
		this.TwoColumnSearchResults(x.twoColumnSearchResultsRenderer);
	}
	/** @arg {TwoColumnSearchResults} x */
	TwoColumnSearchResults(x) {
		const cf="TwoColumnSearchResults";
		this.save_keys(`[${cf}]`,x);
		this.SectionListRenderer(x.primaryContents);
	}
	/** @arg {R$SectionList} x */
	SectionListRenderer(x) {
		const cf="SectionListRenderer";
		this.save_keys(`[${cf}]`,x);
		this.SectionListData(x.sectionListRenderer);
	}
	/** @arg {TabbedSearchResultsRenderer} x */
	TabbedSearchResultsRenderer(x) {
		const cf="TabbedSearchResultsRenderer";
		this.save_keys(`[${cf}]`,x);
		this.TabbedSearchResults(x.tabbedSearchResultsRenderer);
	}
	/** @arg {TabbedSearchResults} x */
	TabbedSearchResults(x) {
		const cf="TabbedSearchResults";
		this.save_keys(`[${cf}]`,x);
		const {tabs: a,...y}=x; this.g(y); // ! #destructure
		this.z(a,this.SearchResultsTabRenderer);
	}
	/** @arg {SearchResultsTabRenderer} x */
	SearchResultsTabRenderer(x) {
		const cf="SearchResultsTabRenderer";
		this.save_keys(`[${cf}]`,x);
		this.SearchResultsTab(x.tabRenderer);
	}
	/** @arg {GetSearchSuggestionsResponse} x */
	GetSearchSuggestions(x) {
		const cf="GetSearchSuggestions";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},trackingParams,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {GetSharePanel} x */
	GetSharePanel(x) {
		const cf="GetSharePanel";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @arg {SubscribeResponse} x */
	SubscribeResponse(x) {
		const cf="SubscribeResponse";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @arg {UnsubscribeResponse} x */
	UnsubscribeResponse(x) {
		const cf="UnsubscribeResponse";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @arg {ModifyChannelPreferenceResponse} x */
	ModifyChannelPreferenceResponse(x) {
		const cf="ModifyChannelPreferenceResponse";
		this.save_keys(`[${cf}]`,x);
		debugger;
	}
	/** @private @arg {R$Player} x */
	PlayerResponse(x) {
		const cf="PlayerResponse";
		this.save_keys(`[${cf}]`,x);
		this.tz(x.annotations,this.PlayerAnnotationsExpandedRenderer);
	}
	/** @arg {LikeLikeResponse} x */
	LikeLikeResponse(x) {
		const cf="LikeLikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.A$OpenPopupAction(x);
			debugger;
		});
	}
	/** @arg {DislikeResponse} x */
	DislikeResponse(x) {
		const cf="DislikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.z(actions,x => {
			if("openPopupAction" in x) return this.A$OpenPopupAction(x);
			debugger;
		});
	}
	/** @arg {LikeRemoveLikeResponse} x */
	LikeRemoveLikeResponse(x) {
		const cf="LikeRemoveLikeResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.A$OpenPopupAction(x);
			debugger;
		}));
	}
	/** @arg {R$ReelWatchSequenceResponse} x */
	ReelWatchSequenceResponse(x) {
		const cf="ReelWatchSequenceResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=x; this.g(y); // ! #destructure
		this.z(entries,a => this.CommandTemplate(a,this.E$ReelWatchEndpoint));
		this.trackingParams("ReelWatchSequenceResponse",trackingParams);
		this.t(continuationEndpoint,this.ContinuationCommand);
	}
	/** @arg {ReelPlayerOverlayRenderer} x */
	ReelPlayerOverlayRenderer(x) {
		const cf="ReelPlayerOverlayRenderer";
		this.save_keys(`[${cf}]`,x);
		const {reelPlayerOverlayRenderer,...y}=x; this.g(y); // ! #destructure
		this.ReelPlayerOverlayData(reelPlayerOverlayRenderer);
	}
	/** @arg {GetLiveChat} x */
	GetLiveChat(x) {
		const cf="GetLiveChat";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=x; this.g(y); // ! #destructure
		this.LiveChatContinuation(a1);
		this.t_cf("GetLiveChat",a2,this.trackingParams);
	}
	/** @arg {LiveChatContinuation} x */
	LiveChatContinuation(x) {
		const cf="LiveChatContinuation";
		this.save_keys(`[${cf}]`,x);
		const {liveChatContinuation,...y}=x; this.g(y); // ! #destructure
		this.LiveChatContinuationData(liveChatContinuation);
	}
	/** @arg {LiveChatContinuationData} x */
	LiveChatContinuationData(x) {
		const cf="LiveChatContinuationData";
		this.save_keys(`[${cf}]`,x);
		const {continuations,actions,actionPanel,itemList,header,ticker,trackingParams,participantsList,popoutMessage,emojis,clientMessages,viewerName,...y}=x; this.g(y); // ! #destructure
		this.z(continuations,a => {
			this.LiveChatContinuationItem(a);
		});
		this.tz(actions,(a => {
			if("replayChatItemAction" in a) {
				return this.ReplayChatItemAction(a);
			} else if("addChatItemAction" in a) {
				return this.AddChatItemAction(a);
			}
			debugger;
		}));
		this.t(actionPanel,this.LiveChatMessageInputRenderer);
		this.t(itemList,this.LiveChatItemListRenderer);
		this.t(header,this.LiveChatHeaderRenderer);
		this.t(ticker,this.LiveChatTickerRenderer);
		this.t_cf(cf,trackingParams,this.trackingParams);
		this.t(participantsList,this.LiveChatParticipantsListRenderer);
		this.t(popoutMessage,this.MessageRenderer);
		this.tz(emojis,(a => {
			this.LiveChatEmoji(a);
		}));
		this.t(clientMessages,this.ClientMessages);
		this.t(viewerName,this.primitive_of_string);
	}
	/** @arg {LiveChatItemListRenderer} x */
	LiveChatItemListRenderer(x) {
		const cf="LiveChatItemListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatItemListRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatItemListRenderer);
	}
	/** @arg {LiveChatMessageInputRenderer} x */
	LiveChatMessageInputRenderer(x) {
		const cf="LiveChatMessageInputRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatMessageInputRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatMessageInputRenderer);
	}
	/** @arg {ReplayChatItemAction} x */
	ReplayChatItemAction(x) {
		const cf="ReplayChatItemAction";
		this.save_keys(`[${cf}]`,x);
		const {replayChatItemAction,...y}=x; this.g(y); // ! #destructure
		this.ReplayChatItemActionData(replayChatItemAction);
	}
	/** @arg {ReplayChatItemActionData} x */
	ReplayChatItemActionData(x) {
		const cf="ReplayChatItemActionData";
		this.save_keys(`[${cf}]`,x);
		const {actions,videoOffsetTimeMsec,...y}=x; this.g(y); // ! #destructure
		this.z(actions,a => {
			if("addChatItemAction" in a) {
				return this.AddChatItemAction(a);
			}
			debugger;
		});
		this.primitive_of_string(videoOffsetTimeMsec);
	}
	/** @arg {AddChatItemAction} x */
	AddChatItemAction(x) {
		const cf="AddChatItemAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,addChatItemAction,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.AddChatItemActionData(addChatItemAction);
	}
	/** @arg {AddChatItemActionData} x */
	AddChatItemActionData(x) {
		const cf="AddChatItemActionData";
		this.save_keys(`[${cf}]`,x);
		const {item,clientId,...y}=x; this.g(y); // ! #destructure
		this.LiveChatItem(item);
		this.t(clientId,this.primitive_of_string);
	}
	/** @arg {LiveChatItem} x */
	LiveChatItem(x) {
		const cf="LiveChatItem";
		this.save_keys(`[${cf}]`,x);
		if("liveChatViewerEngagementMessageRenderer" in x) {
			return this.LiveChatViewerEngagementMessageRenderer(x);
		} else if("liveChatTextMessageRenderer" in x) {
			return this.LiveChatTextMessageRenderer(x);
		} else if("liveChatPlaceholderItemRenderer" in x) {
			return this.LiveChatPlaceholderItemRenderer(x);
		}
		debugger;
	}
	/** @arg {LiveChatViewerEngagementMessageRenderer} x */
	LiveChatViewerEngagementMessageRenderer(x) {
		const cf="LiveChatViewerEngagementMessageRenderer";
		this.save_keys(`[${cf}]`,x);
		this.LiveChatViewerEngagementMessage(x.liveChatViewerEngagementMessageRenderer);
	}
	/** @arg {LiveChatViewerEngagementMessage} x */
	LiveChatViewerEngagementMessage(x) {
		const cf="LiveChatViewerEngagementMessage";
		this.save_keys(`[${cf}]`,x);
		const {id,timestampUsec,icon,message,actionButton,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(id);
		this.primitive_of_string(timestampUsec);
		this.Icon(icon);
		this.D$TextWithRuns(message);
		this.R$ButtonRenderer(actionButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {LiveChatContinuationItem} x */
	LiveChatContinuationItem(x) {
		const cf="LiveChatContinuationItem";
		this.save_keys(`[${cf}]`,x);
		if("invalidationContinuationData" in x) {
			return this.InvalidationContinuationData(x);
		}
		let k=this.get_keys_of(x);
		console.log("[%s]",k[0]);
		debugger;
	}
	/** @arg {InvalidationContinuationData} x */
	InvalidationContinuationData(x) {
		const cf="InvalidationContinuationData";
		this.save_keys(`[${cf}]`,x);
		this.InvalidationContinuationDataInner(x.invalidationContinuationData);
	}
	/** @arg {InvalidationContinuationDataInner} x */
	InvalidationContinuationDataInner(x) {
		const cf="InvalidationContinuationDataInner";
		this.save_keys(`[${cf}]`,x);
		const {invalidationId,timeoutMs,continuation,clickTrackingParams: a1,...y}=x; this.g(y); // ! #destructure
		this.InvalidationIdData(invalidationId);
		if(timeoutMs!==10000) debugger;
		this.primitive_of_string(continuation);
		this.t_cf(cf,a1,this.clickTrackingParams);
	}
	/** @arg {InvalidationIdData} x */
	InvalidationIdData(x) {
		const cf="InvalidationIdData";
		this.save_keys(`[${cf}]`,x);
		const {objectSource,objectId,topic,subscribeToGcmTopics,protoCreationTimestampMs,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(objectSource,"number");
		this.primitive_of_string(objectId);
		this.primitive_of_string(topic);
		let topic_dec=split_string(topic,"~");
		if(topic_dec.length!==3) debugger;
		if(topic_dec[0]!=="chat") debugger;
		this.videoId(topic_dec[1]);
		this.primitive_of(subscribeToGcmTopics,"boolean");
		this.primitive_of_string(protoCreationTimestampMs);
	}
	/** @private @arg {GetNotificationMenuResponse} x */
	GetNotificationMenuResponse(x) {
		const cf="GetNotificationMenuResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(actions,x => {
			if(x.openPopupAction) return this.A$OpenPopupAction(x);
			debugger;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {NextResponse} x */
	NextResponse(x) {
		const cf="NextResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=x;
		this.t(contents,this.NextResponseContents);
		this.t(currentVideoEndpoint,this.E$WatchEndpoint);
		this.trackingParams(cf,trackingParams);
		this.t(playerOverlays,this.PlayerOverlayRenderer);
		this.tz(onResponseReceivedEndpoints,a => this.ResponseReceivedEndpointItem("NextResponse",a));
		this.tz(engagementPanels,(this.EngagementPanelSectionListRenderer));
		const {...y1}=y; this.g(y1);
		this.t(videoReporting,this.ReportFormModalRenderer);
		this.t(queueContextParams,a => this.params("Next","next.queue_context_params",a));
		this.t(continuationContents,this.PlaylistPanelContinuation);
	}
	/** @arg {NextResponseContents} x */
	NextResponseContents(x) {
		const cf="NextResponseContents";
		this.save_keys(`[${cf}]`,x);
		if("twoColumnWatchNextResults" in x) {
			return this.TwoColumnWatchNextResults(x);
		} else if("singleColumnMusicWatchNextResultsRenderer" in x) {
			return this.SingleColumnMusicWatchNextResultsRenderer(x);
		}
		debugger;
	}
	/** @arg {SingleColumnMusicWatchNextResultsRenderer} x */
	SingleColumnMusicWatchNextResultsRenderer(x) {
		const cf="SingleColumnMusicWatchNextResultsRenderer";
		this.save_keys(`[${cf}]`,x);
		this.TabbedRenderer(x.singleColumnMusicWatchNextResultsRenderer);
	}
	/** @arg {TabbedRenderer} x */
	TabbedRenderer(x) {
		const cf="TabbedRenderer";
		this.save_keys(`[${cf}]`,x);
		this.WatchNextTabbedResultsRenderer(x.tabbedRenderer);
	}
	/** @arg {WatchNextTabbedResultsRenderer} x */
	WatchNextTabbedResultsRenderer(x) {
		const cf="WatchNextTabbedResultsRenderer";
		this.save_keys(`[${cf}]`,x);
		this.WatchNextTabbedResults(x.watchNextTabbedResultsRenderer);
	}
	/** @arg {WatchNextTabbedResults} x */
	WatchNextTabbedResults(x) {
		const cf="WatchNextTabbedResults";
		this.save_keys(`[${cf}]`,x);
		this.z(x.tabs,this.TabRenderer);
	}
	/** @arg {R$Tab} x */
	TabRenderer(x) {
		const cf="TabRenderer";
		this.save_keys(`[${cf}]`,x);
		this.TabData(x.tabRenderer);
	}
	/** @arg {R$SectionList} x */
	TabData_section(x) {
		if("sectionListRenderer" in x) {
			this.SectionListRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {RichGridRenderer} x */
	Tab_grid(x) {
		if("richGridRenderer" in x) {
			this.RichGridRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {TabData} x */
	TabData(x) {
		const cf="TabData";
		this.save_keys(`[${cf}]`,x);
		if("tabIdentifier" in x) {
			switch(x.tabIdentifier) {
				case "FEsubscriptions": {
					const {selected,content,tabIdentifier: {},endpoint,accessibility,trackingParams,...y}=x; this.g(y); // ! #destructure
					if(selected!==true) debugger;
					this.SectionListRenderer(content);
					this.trackingParams(cf,trackingParams);
					this.E$BrowseEndpoint(endpoint);
					this.A$Accessibility(accessibility);
				} return;
				case "FEwhat_to_watch": {
					const {selected,content,tabIdentifier: {},trackingParams,...y}=x; this.g(y); // ! #destructure
					if(selected!==true) debugger;
					this.Tab_grid(content);
					this.trackingParams(cf,trackingParams);
				} return;
				default:
			}
			console.log("[new.tab.tab_id]",(/**@arg {{tabIdentifier:string}} e*/e => e)(x).tabIdentifier,this.get_keys_of(x));
			return;
		}
		if("endpoint" in x) {
			const {endpoint,title,selected,content,trackingParams,...y}=x; this.g(y); // ! #destructure
			this.E$BrowseEndpoint(endpoint);
			this.primitive_of_string(title);
			if(selected!==void 0&&selected!==true) debugger;
			this.t(content,this.TabData_section);
			this.trackingParams(cf,trackingParams);
			return;
		}
		const {selected,content,trackingParams,...y}=x; this.g(y); // ! #destructure
		if(selected!==void 0&&selected!==true) debugger;
		this.TabData_section(content);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {TabDataContent} x */
	TabDataContent(x) {
		const cf="TabDataContent";
		this.save_keys(`[${cf}]`,x);
		if("sectionListRenderer" in x) {
			return this.SectionListRenderer(x);
		} else if("richGridRenderer" in x) {
			return this.RichGridRenderer(x);
		} else if("musicQueueRenderer" in x) {
			return this.MusicQueueRenderer(x);
		}
		debugger;
	}
	/** @arg {MusicQueueRenderer} x */
	MusicQueueRenderer(x) {
		const cf="MusicQueueRenderer";
		this.save_keys(`[${cf}]`,x);
		this.MusicQueue(x.musicQueueRenderer);
	}
	/** @arg {MusicQueue} x */
	MusicQueue(x) {
		const cf="MusicQueue";
		this.save_keys(`[${cf}]`,x);
		const {content,hack,...y}=x; this.g(y); // ! #destructure
		this.t(content,this.PlaylistPanelRenderer);
		this.primitive_of(hack,"boolean");
	}
	/** @arg {PlaylistPanelRenderer} x */
	PlaylistPanelRenderer(x) {
		const cf="PlaylistPanelRenderer";
		this.save_keys(`[${cf}]`,x);
		this.PlaylistPanel(x.playlistPanelRenderer);
	}
	/** @arg {PlaylistPanel} x */
	PlaylistPanel(x) {
		const cf="PlaylistPanel";
		this.save_keys(`[${cf}]`,x);
		const {title,contents,currentIndex,...y1}=x;
		this.primitive_of_string(title);
		this.z(contents,this.PlaylistPanelItem);
		this.t(currentIndex,a => this.primitive_of(a,"number"));
		const {playlistId,ownerName,isInfinite,...y2}=y1;
		this.playlistId(playlistId);
		this.t(ownerName,this.D$TextWithRuns);
		this.primitive_of(isInfinite,"boolean");
		const {continuations,shortBylineText,longBylineText,...y3}=y2;
		this.tz(continuations,(this.NextRadioContinuationData));
		this.D$TextWithRuns(shortBylineText);
		this.t(longBylineText,this.D$TextWithRuns);
		const {trackingParams,titleText,...y4}=y3;
		this.trackingParams(cf,trackingParams);
		this.D$TextWithRuns(titleText);
		const {isEditable,previewDescription,numItemsToShow,...y5}=y4; this.g(y5);
		if(isEditable!==true) debugger;
		this.t(previewDescription,this.g);
		if(numItemsToShow!==void 0&&numItemsToShow!==25) debugger;
	}
	/** @arg {PlaylistPanelItem} x */
	PlaylistPanelItem(x) {
		const cf="PlaylistPanelItem";
		this.save_keys(`[${cf}]`,x);
		if("playlistPanelVideoRenderer" in x) {
			this.PlaylistPanelVideoRenderer(x);
		} else if("automixPreviewVideoRenderer") {
			this.AutomixPreviewVideoRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {NextRadioContinuationData} x */
	NextRadioContinuationData(x) {
		const cf="NextRadioContinuationData";
		this.save_keys(`[${cf}]`,x);
		this.NextRadioContinuationDataInner(x.nextRadioContinuationData);
	}
	/** @arg {NextRadioContinuationDataInner} x */
	NextRadioContinuationDataInner(x) {
		const cf="NextRadioContinuationDataInner";
		this.save_keys(`[${cf}]`,x);
		const {continuation,clickTrackingParams,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(continuation);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @arg {PlaylistPanelVideoRenderer} x */
	PlaylistPanelVideoRenderer(x) {
		const cf="PlaylistPanelVideoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playlistPanelVideoRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlaylistPanelVideo(playlistPanelVideoRenderer);
	}
	/** @arg {PlaylistPanelVideo} x */
	PlaylistPanelVideo(x) {
		const cf="PlaylistPanelVideo";
		this.save_keys(`[${cf}]`,x);
		const {title,longBylineText,thumbnail,lengthText,indexText,selected,navigationEndpoint,videoId,shortBylineText,trackingParams,menu,playlistSetVideoId,thumbnailOverlays,lightColorPalette,darkColorPalette,...y}=x; this.g(y);
		this.TextT(title);
		this.D$TextWithRuns(longBylineText);
		this.Thumbnail(thumbnail);
		this.TextT(lengthText);
		this.primitive_of(selected,"boolean");
		this.E$WatchEndpoint(navigationEndpoint);
		this.videoId(videoId);
		this.D$TextWithRuns(shortBylineText);
		this.trackingParams(cf,trackingParams);
		this.MenuRenderer(menu);
		this.primitive_of_string(playlistSetVideoId);
		this.tz(thumbnailOverlays,this.PlaylistPanel_thumbnailOverlay);
	}
	/** @arg {tz<PlaylistPanelVideo['thumbnailOverlays']>} x */
	PlaylistPanel_thumbnailOverlay(x) {
		if("thumbnailOverlayTimeStatusRenderer" in x) return;
		if("thumbnailOverlayResumePlaybackRenderer" in x) return this.ThumbnailOverlayResumePlaybackRenderer(x);
		if("thumbnailOverlayNowPlayingRenderer" in x) return;
		debugger;
	}
	/** @arg {ThumbnailOverlayResumePlaybackRenderer} x */
	ThumbnailOverlayResumePlaybackRenderer(x) {
		const cf="ThumbnailOverlayResumePlaybackRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ThumbnailOverlayResumePlayback(x.thumbnailOverlayResumePlaybackRenderer);
	}
	/** @arg {RichGridRenderer} x */
	RichGridRenderer(x) {
		const cf="RichGridRenderer";
		this.save_keys(`[${cf}]`,x);
		this.RichGrid(x.richGridRenderer);
	}
	/** @arg {RichGrid} x */
	RichGrid(x) {
		const cf="RichGrid";
		this.save_keys(`[${cf}]`,x);
		if("targetId" in x) {
			switch(x.targetId) {
				case "browse-feedFEwhat_to_watch": {
					const {contents,trackingParams,header,targetId: {},reflowOptions,...y}=x; this.g(y); // ! #destructure
					this.z(contents,this.RendererContentItem);
					this.trackingParams(cf,trackingParams);
					this.FeedFilterChipBarRenderer(header);
					this.ReflowOptions(reflowOptions);
				} break;
				default: debugger;
			}
			return;
		}
		const {contents,masthead,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.RendererContentItem);
		this.t(masthead,this.VideoMastheadAdV3Renderer);
	}
	/** @arg {ReflowOptions} x */
	ReflowOptions(x) {
		const {minimumRowsOfVideosAtStart,minimumRowsOfVideosBetweenSections,...y}=x; this.g(y); // ! #destructure
		if(minimumRowsOfVideosAtStart!==2) debugger;
		if(minimumRowsOfVideosBetweenSections!==1) debugger;
	}
	/** @arg {VideoMastheadAdV3Renderer} x */
	VideoMastheadAdV3Renderer(x) {
		const cf="VideoMastheadAdV3Renderer";
		this.save_keys(`[${cf}]`,x);
		this.VideoMastheadAdV3(x.videoMastheadAdV3Renderer);
	}
	/** @arg {R$EngagementPanelSectionList} x */
	EngagementPanelSectionListRenderer(x) {
		const cf="EngagementPanelSectionListRenderer";
		this.save_keys(`[${cf}]`,x);
		this.EngagementPanelSectionList(x.engagementPanelSectionListRenderer);
	}
	/** @arg {EngagementSectionPanelId} x */
	EngagementSectionPanelId(x) {
		this.save_string("[EngagementSectionPanelId]",x);
	}
	/** @template T @arg {ShortsSurfaceIdentifier<T>} x */
	ShortsSurfaceIdentifier(x) {
		const {surface,tag,...y}=x; this.g(y); // ! #destructure
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		return tag;
	}
	/** @arg {Record<"identifier",unknown>} x */
	force_parse_identifier(x) {
		const {identifier,...a}=x; this.g(a);
		x: if(identifier&&typeof identifier==="object"&&"tag" in identifier&&"surface" in identifier) {
			if(identifier.surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") break x;
			let yk=this.get_keys_of(identifier);
			if(!this.eq_keys(yk,["surface","tag"])) debugger;
			let a1=this.ShortsSurfaceIdentifier({tag: identifier.tag,surface: identifier.surface});
			if(a1!=="engagement-panel-structured-description") debugger;
			return;
		}
		debugger;
	}
	/** @arg {EngagementPanelSectionList} x */
	EngagementPanelSectionList(x) {
		const cf="EngagementPanelSectionList";
		this.save_keys(`[${cf}]`,x);
		if("veType" in x) {
			switch(x.veType) {
				default: debugger; break;
				case 76278: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=x;
					if(panelIdentifier!=="comment-item-section") debugger;
					this.EngagementPanelTitleHeaderRenderer(header);
					this.SectionListRenderer(content);
					if(targetId!=="engagement-panel-comments-section") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.A$LoggingDirectives(loggingDirectives);
					if("identifier" in y) {
						this.force_parse_identifier(y);
						return;
					}
					this.g(y);
				} break;
				case 99999: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=x; this.g(y);
					if(panelIdentifier!=="shopping_panel_for_entry_point_5") debugger;
					this.EngagementPanelTitleHeaderRenderer(header);
					this.ProductListRenderer(content);
					if(targetId!=="shopping_panel_for_entry_point_5") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.A$LoggingDirectives(loggingDirectives);
				} break;
				case 126250: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,onShowCommands,loggingDirectives,...y}=x;
					if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
					this.EngagementPanelTitleHeaderRenderer(header);
					this.ContinuationItemRenderer(content);
					if(targetId!=="engagement-panel-searchable-transcript") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.A$LoggingDirectives(loggingDirectives);
					if("identifier" in y) {
						this.force_parse_identifier(y);
						return;
					}
					this.g(y);
				} break;
				case 124975: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,identifier,...y}=x; this.g(y); // ! #destructure
					if(panelIdentifier&&panelIdentifier!=="engagement-panel-structured-description") debugger;
					this.EngagementPanelTitleHeaderRenderer(header);
					this.EngagementPanelSectionListContent(content);
					if(targetId!=="engagement-panel-structured-description") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.A$LoggingDirectives(loggingDirectives);
					if(identifier) {
						let a1=this.ShortsSurfaceIdentifier(identifier);
						if(a1!=="engagement-panel-structured-description") debugger;
					}
				} break;
				case 139722: {
					const {content,header,veType: {},targetId,visibility,loggingDirectives,continuationService,identifier,...y}=x; this.g(y); // ! #destructure
					this.SectionListRenderer(content);
					this.t(header,this.EngagementPanelTitleHeaderRenderer);
					this.targetId(cf,targetId);
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.A$LoggingDirectives(loggingDirectives);
					if(continuationService!=="ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE") debugger;
					if(!identifier) debugger;
					let a1=this.ShortsSurfaceIdentifier(identifier);
					if(a1!=="shorts-comments-panel") debugger;
				} break;
			}
			return;
		}
		switch(x.targetId) {
			default: debugger; break;
			case "engagement-panel-macro-markers-auto-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=x; this.g(y); // ! #destructure
				if(panelIdentifier!=="engagement-panel-macro-markers-auto-chapters") debugger;
				this.EngagementPanelTitleHeaderRenderer(header);
				this.MacroMarkersListRenderer(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.A$LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-ads": {
				const {content,targetId: {},visibility,loggingDirectives,...y}=x; this.g(y); // ! #destructure
				this.AdsEngagementPanelContentRenderer(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.A$LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-clip-create": {
				const {panelIdentifier,header,content,targetId: {},visibility,onShowCommands,loggingDirectives,...y}=x; this.g(y); // ! #destructure
				if(panelIdentifier!=="engagement-panel-clip-create") debugger;
				this.EngagementPanelTitleHeaderRenderer(header);
				this.ClipSectionRenderer(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.z(onShowCommands,this.EngagementPanelSectionShowCommands);
				this.A$LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-macro-markers-description-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=x; this.g(y); // ! #destructure
				if(panelIdentifier!=="engagement-panel-macro-markers-description-chapters") debugger;
				this.EngagementPanelTitleHeaderRenderer(header);
				this.MacroMarkersListRenderer(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.A$LoggingDirectives(loggingDirectives);
			} break;
		}
		// this.t(onShowCommands,a=>this.z(a,this.EngagementPanelSectionShowCommands));
	}
	/** @arg {EngagementPanelSectionShowCommands} x */
	EngagementPanelSectionShowCommands(x) {
		const cf="EngagementPanelSectionShowCommands";
		this.save_keys(`[${cf}]`,x);
		if("changeEngagementPanelVisibilityAction" in x) {
			return this.ChangeEngagementPanelVisibilityAction(x);
		} else if("showEngagementPanelScrimAction" in x) {
			return this.ShowEngagementPanelScrimAction(x);
		} else if("scrollToEngagementPanelCommand" in x) {
			return this.ScrollToEngagementPanelCommand(x);
		}
		debugger;
	}
	/** @arg {ScrollToEngagementPanelCommand} x */
	ScrollToEngagementPanelCommand(x) {
		const cf="ScrollToEngagementPanelCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.ScrollToEngagementPanelData(scrollToEngagementPanelCommand);
	}
	/** @arg {ScrollToEngagementPanelData} x */
	ScrollToEngagementPanelData(x) {
		const cf="ScrollToEngagementPanelData";
		this.save_keys(`[${cf}]`,x);
		this.targetId(cf,x.targetId);
	}
	/** @arg {EngagementPanelSectionListContent} x */
	EngagementPanelSectionListContent(x) {
		const cf="EngagementPanelSectionListContent";
		this.save_keys(`[${cf}]`,x);
		if("adsEngagementPanelContentRenderer" in x) {
			return this.AdsEngagementPanelContentRenderer(x);
		} else if("clipSectionRenderer" in x) {
			return this.ClipSectionRenderer(x);
		} else if("continuationItemRenderer" in x) {
			return this.ContinuationItemRenderer(x);
		} else if("sectionListRenderer" in x) {
			return this.SectionListRendererTemplate(x);
		} else if("structuredDescriptionContentRenderer" in x) {
			return this.StructuredDescriptionContentRenderer(x);
		} else if("macroMarkersListRenderer" in x) {
			return this.MacroMarkersListRenderer(x);
		} else if("productListRenderer" in x) {
			return this.ProductListRenderer(x);
		}
		debugger;
	}
	//#region pause
	//#endregion
	/** @arg {string} cf @arg {EI$ResponseReceived} x */
	ResponseReceivedEndpointItem(cf,x) {
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
			this.AppendContinuationItemsActionData(appendContinuationItemsAction);
		} else {
			debugger;
		}
	}
	/** @arg {AppendContinuationItemsActionData} x */
	AppendContinuationItemsActionData(x) {
		const cf="AppendContinuationItemsActionData";
		this.save_keys(`[${cf}]`,x);
		this.targetId(cf,x.targetId);
		if(this.starts_with_targetId(x,"comment-replies-item-")) {
			return this.CommentRepliesItem(x);
		}
		this.save_string("[ContinuationItem.targetId]",x.targetId);
		switch(x.targetId) {
			case "browse-feedFEwhat_to_watch": this.BrowseFeedAction(x); break;
			case "comments-section": this.CommentsSectionContinuationAction(x); break;
			case "watch-next-feed": this.WatchNextContinuationAction(x); break;
			default: debugger;
		}
	}
	/** @arg {ReloadContinuationItemsCommand} x */
	ReloadContinuationItemsCommand(x) {
		const cf="ReloadContinuationItemsCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,reloadContinuationItemsCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.ReloadContinuationItemsCommandData(reloadContinuationItemsCommand);
	}
	/** @arg {ReloadContinuationItemsCommandData} x */
	ReloadContinuationItemsCommandData(x) {
		const cf="ReloadContinuationItemsCommandData";
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
				this.CommentsHeaderRenderer(item);
			} break;
			default: debugger; break;
		};
	}
	/** @arg {CommentsHeaderRenderer} x */
	CommentsHeaderRenderer(x) {
		const cf="CommentsHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		this.CommentsHeaderData(x.commentsHeaderRenderer);
	}
	/** @arg {CommentsHeaderData} x */
	CommentsHeaderData(x) {
		const cf="CommentsHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(countText);
		this.CommentSimpleboxRenderer(createRenderer);
		this.SortFilterSubMenuRenderer(sortMenu);
		this.trackingParams("CommentsHeaderData",trackingParams);
		this.D$TextWithRuns(titleText);
		this.D$TextWithRuns(commentsCount);
		if(showSeparator!==true) debugger;
		this.z(customEmojis,this.CustomEmoji);
		this.primitive_of_string(unicodeEmojisUrl);
		this.A$LoggingDirectives(loggingDirectives);
	}
	/** @arg {CommentSimpleboxRenderer} x */
	CommentSimpleboxRenderer(x) {
		const cf="CommentSimpleboxRenderer";
		this.save_keys(`[${cf}]`,x);
		const {commentSimpleboxRenderer,...y}=x; this.g(y); // ! #destructure
		this.CommentSimpleboxData(commentSimpleboxRenderer);
	}
	/** @arg {LoadMarkersCommandData} x */
	LoadMarkersCommandData(x) {
		const cf="LoadMarkersCommandData";
		this.save_keys(`[${cf}]`,x);
		const {entityKeys,...y}=x; this.g(y); // ! #destructure
		this.z(entityKeys,this.primitive_of_string);
	}
	/** @arg {ChangeKeyedMarkersVisibilityCommandData} x */
	ChangeKeyedMarkersVisibilityCommandData(x) {
		const cf="ChangeKeyedMarkersVisibilityCommandData";
		this.save_keys(`[${cf}]`,x);
		const {isVisible,key,...y}=x; this.g(y); // ! #destructure
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @arg {R$PlayerOverlay} x */
	PlayerOverlayRenderer(x) {
		const cf="PlayerOverlayRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playerOverlayRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlayerOverlay(playerOverlayRenderer);
	}
	/** @arg {D$PlayerOverlay} x */
	PlayerOverlay(x) {
		const cf="PlayerOverlay";
		this.save_keys(`[${cf}]`,x);
		if("browserMediaSession" in x) {
			return this.BrowserMediaSessionRoot(x);
		}
		const {endScreen,autoplay,shareButton,addToMenu,videoDetails,autonavToggle,decoratedPlayerBarRenderer,...y}=x; this.g(y); // ! #destructure
		this.WatchNextEndScreenRenderer(endScreen);
		this.t(autoplay,this.PlayerOverlayAutoplayRenderer);
		this.R$ButtonRenderer(shareButton);
		this.MenuRenderer(addToMenu);
		this.PlayerOverlayVideoDetailsRenderer(videoDetails);
		this.t(autonavToggle,this.AutoplaySwitchButtonRenderer);
		this.t(decoratedPlayerBarRenderer,this.DecoratedPlayerBarRenderer);
	}
	/** @arg {A$BrowserMediaSession} x */
	BrowserMediaSessionRoot(x) {
		const cf="BrowserMediaSessionRoot";
		this.save_keys(`[${cf}]`,x);
		const {actions,browserMediaSession,...y}=x; this.g(y); // ! #destructure
		this.z(actions,this.LikeButtonRenderer);
		this.BrowserMediaSessionRenderer(browserMediaSession);
	}
	/** @arg {R$LikeButton} x */
	LikeButtonRenderer(x) {
		const cf="LikeButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		this.LikeButton(x.likeButtonRenderer);
	}
	/** @arg {D$LikeButton} x */
	LikeButton(x) {
		const cf="LikeButton";
		this.save_keys(`[${cf}]`,x);
		if("likeCountText" in x) {
			const {target,likeStatus,trackingParams,likesAllowed,serviceEndpoints,likeCount,likeCountText,likeCountTooltipText,likeCountWithLikeText,likeCountWithUnlikeText,dislikeCountText,dislikeCountTooltipText,dislikeCountWithDislikeText,dislikeCountWithUndislikeText,...y}=x; this.g(y); // ! #destructure
			target;
			likeStatus;
			trackingParams;
			likesAllowed;
			serviceEndpoints;
			likeCount;
			likeCountText;
			likeCountTooltipText;
			likeCountWithLikeText;
			likeCountWithUnlikeText;
			dislikeCountText;
			dislikeCountTooltipText;
			dislikeCountWithDislikeText;
			dislikeCountWithUndislikeText;
			return;
		}
		const {target,likeStatus,trackingParams,likesAllowed,serviceEndpoints,...y}=x; this.g(y); // ! #destructure
		this.LikeApiData(target);
		if(likeStatus!=="INDIFFERENT") debugger;
		this.trackingParams(cf,trackingParams);
		this.primitive_of(likesAllowed,"boolean");
		this.z(serviceEndpoints,this.E$LikeEndpoint);
	}
	/** @arg {string} x */
	primitive_of_string(x) {
		this.primitive_of(x,"string");
	}
	/** @arg {MusicLibraryStatusUpdateCommand} x */
	MusicLibraryStatusUpdateCommand(x) {
		const cf="MusicLibraryStatusUpdateCommand";
		this.save_keys(`[${cf}]`,x);
		this.MusicLibraryStatusUpdate(x.musicLibraryStatusUpdateCommand);
	}
	/** @arg {MusicLibraryStatusUpdate} x */
	MusicLibraryStatusUpdate(x) {
		const cf="MusicLibraryStatusUpdate";
		this.save_keys(`[${cf}]`,x);
		const {libraryStatus,addToLibraryFeedbackToken,...y}=x; this.g(y); // ! #destructure
		if(libraryStatus!=="MUSIC_LIBRARY_STATUS_IN_LIBRARY") debugger;
		this.primitive_of_string(addToLibraryFeedbackToken);
	}
	/** @arg {LikeApiData} x */
	LikeApiData(x) {
		const cf="LikeApiData";
		this.save_keys(`[${cf}]`,x);
		if("videoId" in x) return this.videoId(this.w(x));
		if("playlistId" in x) return this.playlistId(this.w(x));
		debugger;
	}
	/** @arg {R$PlayerOverlayAutoplay} x */
	PlayerOverlayAutoplayRenderer(x) {
		const cf="PlayerOverlayAutoplayRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playerOverlayAutoplayRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlayerOverlayAutoplay(playerOverlayAutoplayRenderer);
	}
	/** @arg {D$PlayerOverlayAutoplay} x */
	PlayerOverlayAutoplay(x) {
		const cf="PlayerOverlayAutoplay";
		this.save_keys(`[${cf}]`,x);
		const {title,videoTitle,byline,pauseText,background,countDownSecs,cancelButton,nextButton,trackingParams,closeButton,thumbnailOverlays,preferImmediateRedirect,videoId,publishedTimeText,webShowBigThumbnailEndscreen,webShowNewAutonavCountdown,shortViewCountText,countDownSecsForFullscreen,...y}=x; this.g(y); // ! #destructure
		this.D$SimpleText(title);
		this.D$SimpleText(videoTitle);
		this.D$TextWithRuns(byline);
		this.D$SimpleText(pauseText);
		this.Thumbnail(background);
		if(countDownSecs!==8) debugger;
		this.R$ButtonRenderer(cancelButton);
		this.R$ButtonRenderer(nextButton);
		this.trackingParams("PlayerOverlayAutoplay",trackingParams);
		this.R$ButtonRenderer(closeButton);
		this.z(thumbnailOverlays,this.ThumbnailOverlayItem);
		if(preferImmediateRedirect!==false) debugger;
		this.videoId(videoId);
		this.D$SimpleText(publishedTimeText);
		if(webShowBigThumbnailEndscreen!==false) debugger;
		if(webShowNewAutonavCountdown!==true) debugger;
		this.D$SimpleText(shortViewCountText);
		if(countDownSecsForFullscreen!==3) debugger;
	}
	/** @arg {DecoratedPlayerBarRenderer} x */
	DecoratedPlayerBarRenderer(x) {
		const cf="DecoratedPlayerBarRenderer";
		this.save_keys(`[${cf}]`,x);
		const {decoratedPlayerBarRenderer,...y}=x; this.g(y); // ! #destructure
		this.DecoratedPlayerBar(decoratedPlayerBarRenderer);
	}
	/** @arg {R$PlayerOverlayVideoDetails} x */
	PlayerOverlayVideoDetailsRenderer(x) {
		const cf="PlayerOverlayVideoDetailsRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playerOverlayVideoDetailsRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlayerOverlayVideoDetails(playerOverlayVideoDetailsRenderer);
	}
	/** @arg {R$MenuRenderer} x */
	MenuRenderer(x) {
		const cf="MenuRenderer";
		this.save_keys(`[${cf}]`,x);
		const {menuRenderer,...y}=x; this.g(y); // ! #destructure
		this.R_MenuData(menuRenderer);
	}
	/** @arg {D$Menu} x */
	R_MenuData(x) {
		const cf="MenuData";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,accessibility,items,targetId,loggingDirectives,flexibleItems,topLevelButtons,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.t(accessibility,this.A$Accessibility);
		this.R_MenuItems(items);
		this.t(targetId,a => {
			a;
			debugger;
			// this.targetId(cf,a);
		});
		this.t(loggingDirectives,this.A$LoggingDirectives);
	}
	/** @arg {D$Menu['items']} x */
	R_MenuItems(x) {
		this.tz(x,x => {
			/** @type {G$Menu$items$iterate} */
			if("toggleMenuServiceItemRenderer" in x) return this.toggleMenuServiceItemRenderer(x);
			if("menuServiceItemRenderer" in x) return this.MenuServiceItemRenderer(x);
			if("menuNavigationItemRenderer" in x) return this.menuNavigationItemRenderer(x);
			this.do_codegen("MenuItems",x);
		});
	}
	/** @arg {Extract<G$Menu$items$iterate,{menuNavigationItemRenderer:any}>} x */
	menuNavigationItemRenderer(x) {
		const cf="R$MenuNavigationItem";
		this.save_keys(`[${cf}]`,x);
		this.D$MenuNavigationItem(x.menuNavigationItemRenderer);
	}
	/** @arg {D$MenuNavigationItem} x */
	D$MenuNavigationItem(x) {
		const cf="D$MenuNavigationItem";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,text,icon,navigationEndpoint,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.D$SimpleText(text);
		this.A$OpenPopupAction(navigationEndpoint);
	}
	/** @arg {Extract<G$Menu$items$iterate,{toggleMenuServiceItemRenderer:any}>} x */
	toggleMenuServiceItemRenderer(x) {
		let x1=this.w(x);
		const {defaultIcon,defaultServiceEndpoint,defaultText,toggledIcon,toggledServiceEndpoint,toggledText,trackingParams,isToggled}=x1;
		{const {defaultIcon,defaultServiceEndpoint,defaultText,toggledIcon,toggledServiceEndpoint,toggledText,trackingParams,isToggled,...y}=x1; this.g(y);}
		this.primitive_of(isToggled,"boolean");
		this.MenuServiceItem({
			icon: defaultIcon,
			text: defaultText,
			serviceEndpoint: defaultServiceEndpoint,
			trackingParams,
		});
		this.MenuServiceItem({
			icon: toggledIcon,
			text: toggledText,
			serviceEndpoint: toggledServiceEndpoint,
			trackingParams,
		});
	}
	/** @arg {R$MenuServiceItem} x */
	MenuServiceItemRenderer(x) {
		const cf="MenuServiceItemRenderer";
		this.save_keys(`[${cf}]`,x);
		const {menuServiceItemRenderer,...y}=x; this.g(y); // ! #destructure
		this.MenuServiceItem(menuServiceItemRenderer);
	}
	/** @arg {D$MenuServiceItem<MenuServiceIconTypeStr>} x */
	MenuServiceItem(x) {
		const cf="MenuServiceItem";
		this.save_keys(`[${cf}]`,x);
		const {text,icon,serviceEndpoint,trackingParams,hasSeparator,loggingDirectives,...y}=x; this.g(y); // ! #destructure
		this.t(loggingDirectives,this.A$LoggingDirectives);
		this.TextT(text);
		if(icon) {
			switch(icon.iconType) {
				case "LIBRARY_ADD": break;
				case "LIBRARY_REMOVE": break;
				case "NOT_INTERESTED": break;
				case "FLAG": break;
				case "WATCH_LATER": break;
				case "PLAYLIST_ADD": break;
				case "VISIBILITY_OFF": break;
				case "SHARE": break;
				case "ALIGN_LEFT": break;
				case "SUBTITLES": break;
				default: {
					/** @type {MenuServiceIcon} */
					console.log(`-- [MenuServiceItem] --\n\n\ncase "${icon.iconType}": break;\n--\n\t"${icon.iconType}",\n`); icon.iconType==="";
				} break;
			}
		}
		this.t(icon,this.Icon);
		this.EG$MenuServiceEndpoints(serviceEndpoint);
		this.trackingParams(cf,trackingParams);
		this.t(hasSeparator,a => {if(a!==true) debugger;});
	}
	/** @arg {PlaylistAction} x */
	PlaylistAction(x) {
		const cf="PlaylistAction";
		this.save_keys(`[${cf}]`,x);
		switch(x.action) {
			default: debugger; break;
			case "ACTION_ADD_VIDEO": {
				const {action: {},addedVideoId,...y}=x; this.g(y); // ! #destructure
				this.videoId(addedVideoId);
			} break;
			case "ACTION_REMOVE_VIDEO_BY_VIDEO_ID": {
				const {action: {},removedVideoId,...y}=x; this.g(y); // ! #destructure
				this.videoId(removedVideoId);
			} break;
			case "ACTION_SET_PLAYLIST_VIDEO_ORDER": {
				const {action: {},...y}=x; this.g(y); // ! #destructure
			} break;
		}
	}
	/** @template {string} T @arg {Icon<T>} x */
	Icon(x) {
		const cf="Icon";
		this.save_keys(`[${cf}]`,x);
		const {iconType,...y}=x; this.g(y); // ! #destructure
		this.save_string("[IconType]",iconType);
	}
	/** @arg {M$CommandMetadata} x */
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
		const {webCommandMetadata,...y}=x; this.g(y); // ! #destructure
		this.WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {A$Accessibility} x */
	A$Accessibility(x) {
		const cf="Accessibility";
		this.save_keys(`[${cf}]`,x);
		const {accessibilityData,...y}=x; this.g(y); // ! #destructure
		this.LabelData(accessibilityData);
	}
	/** @arg {A$LabelData} x */
	LabelData(x) {
		const cf="LabelData";
		this.save_keys(`[${cf}]`,x);
		const {label,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(label);
	}
	/** @arg {R$WatchNextEndScreenRenderer} x */
	WatchNextEndScreenRenderer(x) {
		const cf="WatchNextEndScreenRenderer";
		this.save_keys(`[${cf}]`,x);
		const {watchNextEndScreenRenderer,...y}=x; this.g(y); // ! #destructure
		this.WatchNextEndScreen(watchNextEndScreenRenderer);
	}
	/** @arg {WatchNextEndScreen} x */
	WatchNextEndScreen(x) {
		const cf="WatchNextEndScreen";
		this.save_keys(`[${cf}]`,x);
		const {results,title,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(results,this.WatchNextEndScreenItem);
		this.D$SimpleText(title);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {{accessibility?:A$Accessibility}} x */
	handle_accessibility(x) {
		this.save_keys("[default.Accessibility]",x);
		if(x.accessibility) this.A$Accessibility(x.accessibility);
	}
	/** @arg {WatchNextEndScreenItem} x */
	WatchNextEndScreenItem(x) {
		const cf="WatchNextEndScreenItem";
		this.save_keys(`[${cf}]`,x);
		if("endScreenVideoRenderer" in x) {
			return this.EndScreenVideoRenderer(x);
		} else if("endScreenPlaylistRenderer" in x) {
			return this.EndScreenPlaylistRenderer(x);
		}
		debugger;
	}
	/** @arg {EndScreenVideoRenderer} x */
	EndScreenVideoRenderer(x) {
		const cf="EndScreenPlaylistRenderer";
		this.save_keys(`[${cf}]`,x);
		const {endScreenVideoRenderer,...y}=x; this.g(y); // ! #destructure
		this.EndScreenVideo(endScreenVideoRenderer);
	}
	/** @arg {G$ThumbnailOverlayItem} x */
	ThumbnailOverlayItem(x) {
		const cf="ThumbnailOverlayItem";
		this.save_keys(`[${cf}]`,x);
		if("thumbnailOverlayTimeStatusRenderer" in x) {
			return this.ThumbnailOverlayTimeStatusRenderer(x);
		} else if("thumbnailOverlayNowPlayingRenderer" in x) {
			return this.ThumbnailOverlayNowPlayingRenderer(x);
		} else if("thumbnailOverlayBottomPanelRenderer" in x) {
			return this.ThumbnailOverlayBottomPanelRenderer(x);
		} else if("thumbnailOverlayHoverTextRenderer" in x) {
			return this.ThumbnailOverlayHoverTextRenderer(x);
		}
		debugger;
	}
	/** @arg {R$ThumbnailOverlayHoverText} x */
	ThumbnailOverlayHoverTextRenderer(x) {
		const cf="ThumbnailOverlayHoverTextRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ThumbnailOverlayHoverTextData(x.thumbnailOverlayHoverTextRenderer);
	}
	/** @arg {R$ThumbnailOverlayBottomPanel} x */
	ThumbnailOverlayBottomPanelRenderer(x) {
		const cf="ThumbnailOverlayBottomPanelRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ThumbnailOverlayBottomPanelData(x.thumbnailOverlayBottomPanelRenderer);
	}
	/** @arg {R$ThumbnailOverlayNowPlaying} x */
	ThumbnailOverlayNowPlayingRenderer(x) {
		const cf="ThumbnailOverlayNowPlayingRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ThumbnailOverlayNowPlayingData(x.thumbnailOverlayNowPlayingRenderer);
	}
	/** @arg {ThumbnailOverlayNowPlayingData} x */
	ThumbnailOverlayNowPlayingData(x) {
		const cf="ThumbnailOverlayNowPlayingData";
		this.save_keys(`[${cf}]`,x);
		const {text,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(text);
	}
	/** @arg {EndScreenVideo} x */
	EndScreenVideo(x) {
		const cf="EndScreenVideo";
		this.save_keys(`[${cf}]`,x);
		const {videoId,thumbnail,title,thumbnailOverlays,shortBylineText,lengthText,lengthInSeconds,navigationEndpoint,trackingParams,shortViewCountText,publishedTimeText,...y}=x; this.g(y);
		this.videoId(videoId);
		this.Thumbnail(thumbnail);
		this.D$SimpleText(title);
		this.z(thumbnailOverlays,this.ThumbnailOverlayItem);
		this.D$TextWithRuns(shortBylineText);
		this.t(lengthText,this.D$SimpleText);
		this.t(lengthInSeconds,a => this.primitive_of(a,"number"));
		(x => {
			if("watchEndpoint" in x) return this.E$WatchEndpoint(x);
			if("reelWatchEndpoint" in x) return this.E$ReelWatchEndpoint(x);
			this.do_codegen(cf,x);
			debugger;
		})(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
		this.TextT(shortViewCountText);
		this.D$SimpleText(publishedTimeText);
	}
	/** @arg {E$WatchEndpoint} x */
	E$WatchEndpoint(x) {
		const cf="WatchEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,watchEndpoint,...y}=x; this.g(y); // ! #destructure
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
		this.t(commandMetadata,this.WatchEndpointCommandMetadata);
		this.E$Watch(watchEndpoint);
	}
	/** @arg {E$Watch} x */
	E$Watch(x) {
		const cf="WatchEndpointData";
		this.save_keys(`[${cf}]`,x);
		const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig: a1,playerParams,watchEndpointMusicSupportedConfigs: a2,nofollow,...y}=x; this.g(y);
		this.videoId(videoId);
		this.t(playlistId,this.playlistId);
		if(index!==void 0) this.primitive_of(index,"number");
		this.t(playlistSetVideoId,this.primitive_of_string);
		if(params!==void 0) this.params("WatchEndpoint","watch.params",params);
		if(startTimeSeconds!==void 0) this.primitive_of(startTimeSeconds,"number");
		if(continuePlayback!==void 0&&!continuePlayback) debugger;
		this.t(loggingContext,this.VssLoggingContext);
		this.t(watchEndpointSupportedOnesieConfig,this.Html5PlaybackOnesieConfig);
		this.t(a1,this.PrefetchHintConfig);
		this.t(playerParams,a => this.playerParams("WatchEndpoint","watch.player_params",a));
		this.t(a2,this.WatchEndpointMusicConfig);
		if(nofollow!==void 0) this.primitive_of(nofollow,"boolean");
	}
	/** @arg {R$WatchEndpointMusicConfig} x */
	WatchEndpointMusicConfig(x) {
		const cf="WatchEndpointMusicConfig";
		this.save_keys(`[${cf}]`,x);
		this.WatchEndpointMusicConfigData(x.watchEndpointMusicConfig);
	}
	/** @arg {D$WatchEndpointMusicConfig} x */
	WatchEndpointMusicConfigData(x) {
		const cf="WatchEndpointMusicConfigData";
		this.save_keys(`[${cf}]`,x);
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(hasPersistentPlaylistPanel,"boolean");
		switch(musicVideoType) {
			default: debugger; break;
			case "MUSIC_VIDEO_TYPE_ATV": break;
		};
	}
	/** @arg {PrefetchHintConfig} x */
	PrefetchHintConfig(x) {
		const cf="Html5PlaybackOnesieConfig";
		this.save_keys(`[${cf}]`,x);
		this.PrefetchHintConfigData(x.prefetchHintConfig);
	}
	/** @arg {PrefetchHintConfigData} x */
	PrefetchHintConfigData(x) {
		const cf="Html5PlaybackOnesieConfig";
		this.save_keys(`[${cf}]`,x);
		const {prefetchPriority: a1,playbackRelativeSecondsPrefetchCondition: b1,countdownUiRelativeSecondsPrefetchCondition: b2,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(a1,"number");
		if(a1!==0) {
			console.log("prePri",a1);
		}
		if(b1!==void 0) {
			this.primitive_of(b1,"number");
			if(b1!==-3) {console.log("playRelSecPC",b1); debugger;}
		}
		if(b2!==void 0) {
			this.primitive_of(b2,"number");
			if(b2!==-3) console.log("CdUiRelSecPC",b2);
		}
	}
	/** @arg {Html5PlaybackOnesieConfig} x */
	Html5PlaybackOnesieConfig(x) {
		const cf="Html5PlaybackOnesieConfig";
		this.save_keys(`[${cf}]`,x);
		const {html5PlaybackOnesieConfig,...y}=x; this.g(y); // ! #destructure
		this.CommonConfig(html5PlaybackOnesieConfig);
	}
	/** @arg {CommonConfig} x */
	CommonConfig(x) {
		const cf="CommonConfig";
		this.save_keys(`[${cf}]`,x);
		const {commonConfig,...y}=x; this.g(y); // ! #destructure
		this.CommonConfigData(commonConfig);
	}
	/** @arg {CommonConfigData} x */
	CommonConfigData(x) {
		const cf="CommonConfigData";
		this.save_keys(`[${cf}]`,x);
		const {url,...y}=x; this.g(y); // ! #destructure
		this.parser.parse_url("CommonConfigData",url);
	}
	/** @arg {VssLoggingContext} x */
	VssLoggingContext(x) {
		const cf="VssLoggingContext";
		this.save_keys(`[${cf}]`,x);
		const {vssLoggingContext,...y}=x; this.g(y); // ! #destructure
		this.VssLoggingContextData(vssLoggingContext);
	}
	/** @arg {VssLoggingContextData} x */
	VssLoggingContextData(x) {
		const cf="VssLoggingContextData";
		this.save_keys(`[${cf}]`,x);
		const {serializedContextData,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(serializedContextData);
	}
	/** @arg {NonNullable<D$TextRun['navigationEndpoint']>} x */
	handle_text_endpoint(x) {
		if("browseEndpoint" in x) return this.E$BrowseEndpoint(x);
		if("urlEndpoint" in x) return this.E$UrlEndpoint(x);
		if("watchEndpoint" in x) return this.E$WatchEndpoint(x);
		debugger;
	}
	/** @private @arg {D$TextWithRuns} x @arg {(x:NonNullable<D$TextRun['navigationEndpoint']>)=>void} f_run */
	D$TextWithRuns(x,f_run=this.handle_text_endpoint) {
		if(!("runs" in x)) {debugger; return;}
		const cf/*!*/="TextWithRuns";
		this.save_keys(`[${cf}]`,x);
		const {runs,accessibility,...y}=x; this.g(y); // ! #destructure
		this.z(runs,a => this.D$TextRun(a,f_run));
		this.t(accessibility,this.A$Accessibility);
	}
	/** @private @arg {D$TextRun} x @arg {(x:NonNullable<D$TextRun['navigationEndpoint']>)=>void} f_run */
	D$TextRun(x,f_run) {
		const cf="TextRun";
		this.save_keys(`[${cf}]`,x);
		const {text,navigationEndpoint,loggingDirectives,bold,...y}=x; this.g(y); // ! #destructure
		this.t(navigationEndpoint,f_run);
		this.primitive_of_string(text);
	}
	/** @private @arg {R$ThumbnailOverlayTimeStatus} x */
	ThumbnailOverlayTimeStatusRenderer(x) {
		const cf="ThumbnailOverlayTimeStatusRenderer";
		this.save_keys(`[${cf}]`,x);
		const {thumbnailOverlayTimeStatusRenderer,...y}=x; this.g(y); // ! #destructure
		this.ThumbnailOverlayTimeStatus(thumbnailOverlayTimeStatusRenderer);
	}
	/** @private @arg {D$ThumbnailOverlayTimeStatus} x */
	ThumbnailOverlayTimeStatus(x) {
		const cf="ThumbnailOverlayTimeStatus";
		this.save_keys(`[${cf}]`,x);
		const {text,style,...y}=x;
		this.TextT(text);
		switch(style) {
			default: debugger; break;
			case "DEFAULT": break;
			case "LIVE": break;
			case "SHORTS": break;
		}
		if("icon" in y) {
			const {icon,...y1}=y; this.g(y1);
			this.Icon(icon);
		} else this.g(y);
	}
	/** @private @arg {EndScreenPlaylistRenderer} x */
	EndScreenPlaylistRenderer(x) {
		const cf="EndScreenPlaylistRenderer";
		this.save_keys(`[${cf}]`,x);
		const {endScreenPlaylistRenderer,...y}=x; this.g(y); // ! #destructure
		this.EndScreenPlaylist(endScreenPlaylistRenderer);
	}
	/** @private @arg {EndScreenPlaylist} x */
	EndScreenPlaylist(x) {
		const cf="EndScreenPlaylist";
		this.save_keys(`[${cf}]`,x);
		const {playlistId,title,thumbnail,videoCount,longBylineText,videoCountText,navigationEndpoint,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.playlistId(playlistId);
		this.D$SimpleText(title);
		this.Thumbnail(thumbnail);
		this.TextT(longBylineText);
		this.t(videoCount,this.primitive_of_string);
		this.D$TextWithRuns(videoCountText);
		this.E$WatchEndpoint(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {NavigationEndpoint} x */
	NavigationEndpoint(x) {
		const cf="NavigationEndpointRoot";
		this.save_keys(`[${cf}]`,x);
		let a1=x;
		if("urlEndpoint" in a1) {
			this.E$UrlEndpoint(a1);
		} else if("watchEndpoint" in a1) {
			this.E$WatchEndpoint(a1);
		} else if("browseEndpoint" in a1) {
			this.E$BrowseEndpoint(a1);
		} else {
			debugger;
		}
	}
	/** @arg {BrowseEndpointContextSupportedConfigs} x */
	BrowseEndpointContextSupportedConfigs(x) {
		const cf="BrowseEndpointContextSupportedConfigs";
		this.save_keys(`[${cf}]`,x);
		if("browseEndpointContextMusicConfig" in x) {
			return this.BrowseEndpointContextMusicConfig(x);
		}
		debugger;
	}
	/** @arg {BrowseEndpointContextMusicConfig} x */
	BrowseEndpointContextMusicConfig(x) {
		const cf="BrowseEndpointContextMusicConfig";
		this.save_keys(`[${cf}]`,x);
		const {browseEndpointContextMusicConfig,...y}=x; this.g(y); // ! #destructure
		this.BrowseEndpointContextMusicConfigData(browseEndpointContextMusicConfig);
	}
	/** @arg {BrowseEndpointContextMusicConfigData} x */
	BrowseEndpointContextMusicConfigData(x) {
		const cf="BrowseEndpointContextMusicConfigData";
		this.save_keys(`[${cf}]`,x);
		const {pageType,...y}=x; this.g(y); // ! #destructure
		this.save_enum("MUSIC_PAGE_TYPE",pageType);
		switch(pageType) {
			case "MUSIC_PAGE_TYPE_ALBUM": break;
			case "MUSIC_PAGE_TYPE_ARTIST": break;
			case "MUSIC_PAGE_TYPE_USER_CHANNEL": break;
			default: debugger; break;
		}
	}
	/** @arg {M$VE3611$Metadata} x */
	NavigationEndpointCommandMetadata(x) {
		const cf="NavigationEndpointCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {webCommandMetadata,...y}=x; this.g(y); // ! #destructure
		debugger;
		// this.WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {"/gaming"|"/@"|"/channel/UC"} x */
	VE3611_parse_url(x) {
		if(x==="/gaming") return;
		if(this.str_starts_with(x,"/@")) return;
		if(this.str_starts_with(x,"/channel/UC")) return;
		debugger;
	}
	/** @arg {D$TextT} x */
	TextT(x) {
		const cf="TextT";
		this.save_keys(`[${cf}]`,x);
		if("simpleText" in x) {
			return this.D$SimpleText(x);
		} else if("runs" in x) {
			return this.D$TextWithRuns(x);
		}
		debugger;
	}
	/** @arg {WatchEndpointCommandMetadata} x */
	WatchEndpointCommandMetadata(x) {
		const cf="WatchEndpointCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {webCommandMetadata,...y}=x; this.g(y); // ! #destructure
		this.WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {CM$VE3832$Metadata} x */
	VE3832_CommandMetadata(x) {
		const cf="VE3832_CommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {webCommandMetadata,...y}=x; this.g(y); // ! #destructure
		this.WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {A$TwoColumnWatchNextResults} x */
	TwoColumnWatchNextResults(x) {
		const cf="TwoColumnWatchNextResults";
		this.save_keys(`[${cf}]`,x);
		const {twoColumnWatchNextResults,...y}=x; this.g(y); // ! #destructure
		this.TwoColumnWatchNextResultsData(twoColumnWatchNextResults);
	}
	/** @arg {ItemSectionRendererTemplate_Section<any>} x @returns {x is T$ItemSectionRendererTemplate<any,any>} */
	is_ItemSectionRendererTemplate(x) {
		return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);
	}
	/** @arg {Extract<D$TwoColumnWatchNextResults['results']['results']['contents'][number],{itemSectionRenderer:any}>} x */
	handle_results_4(x) {
		if(this.is_ItemSectionRendererTemplate(x)) {
			switch(x.itemSectionRenderer.sectionIdentifier) {
				case "comment-item-section": return this.ItemSectionRenderer(x);
			}
		}
		switch(x.itemSectionRenderer.sectionIdentifier) {
			case "comments-entry-point": return this.ItemSectionRendererTemplate_Section(x);
		}
	}
	/** @arg {D$TwoColumnWatchNextResults['results']['results']['contents'][number]} x */
	handle_results_3(x) {
		if("itemSectionRenderer" in x) return this.handle_results_4(x);
		if("merchandiseShelfRenderer" in x) return this.MerchandiseShelfRenderer(x);
		if("videoPrimaryInfoRenderer" in x) return this.VideoPrimaryInfoRenderer(x);
		if("videoSecondaryInfoRenderer" in x) return this.VideoSecondaryInfoRenderer(x);
		let k=this.get_keys_of(x);
		switch(k.at(0)) {
			default: {
				console.log("[new.WatchResultItem]",x,k.join());
				debugger;
			} break;
		}
	}
	/** @arg {D$TwoColumnWatchNextResults['results']['results']} x */
	handle_results_2(x) {
		this.ContentsArrayTemplate(x,this.handle_results_3);
	}
	/** @arg {D$TwoColumnWatchNextResults['results']} x */
	handle_results_1(x) {
		this.ResultsTemplate(x,this.handle_results_2);
	}
	/** @arg {D$TwoColumnWatchNextResults} x */
	TwoColumnWatchNextResultsData(x) {
		const cf="TwoColumnWatchNextResultsData";
		this.save_keys(`[${cf}]`,x);
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=x; this.g(y); // ! #destructure
		this.handle_results_1(results);
		this.SecondaryResultsTemplate(secondaryResults,a => {
			if("contents" in a) {
				this.z(a.contents,a => {
					if("itemSectionRenderer" in a) {
						this.ItemSectionRendererTemplate(a,a => {
							if(a[0]==="sid-wn-chips"&&a[1]==="watch-next-feed") return;
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
				this.z(a.results,a => {
					if("itemSectionRenderer" in a) {
						this.ItemSectionRenderer(a);
					}
					let k=this.get_keys_of(a);
					switch(k[0]) {
						case "itemSectionRenderer": break;
						case "relatedChipCloudRenderer": break;
					}
				});
			}
		});
		this.t(playlist,a => this.PlaylistTemplate(a,this.PlaylistContent));
		this.t(autoplay,a => this.AutoplayTemplate(a,this.AutoplayContent));
		this.t(conversationBar,this.LiveChatRenderer);
	}
	/** @arg {NotificationGetUnseenCountResponse} x */
	NotificationGetUnseenCountResponse(x) {
		const cf="NotificationGetUnseenCountResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},actions,unseenCount,...y}=x; this.g(y); // ! #destructure
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.UpdateNotificationsUnseenCountAction(x);
			debugger;
		}));
		if(unseenCount!==void 0) this.primitive_of(unseenCount,"number");
	}
	/** @private @arg {UpdateNotificationsUnseenCountAction} x */
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
	/** @private @arg {DatasyncIdsResponse} x */
	DatasyncIdsResponse(x) {
		const cf="DatasyncIdsResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},datasyncIds,...y}=x; this.g(y); // ! #destructure
		this.z(datasyncIds,this.primitive_of_string);
	}
	/** @private @arg {GetAccountSwitcherEndpointResponse} x */
	GetAccountSwitcherEndpointResponse(x) {
		const cf="GetAccountSwitcherEndpointResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},selectText,actions,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(selectText);
		this.z(actions,a => {
			if("getMultiPageMenuAction" in a) {
				return this.GetMultiPageMenuAction(a);
			}
			debugger;
		});
	}
	/** @private @arg {AccountsListResponse} x */
	AccountsListResponse(x) {
		const cf="AccountsListResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},selectText,actions,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(selectText);
		this.z(actions,this.UpdateChannelSwitcherPageAction);
	}
	/** @private @arg {UpdateChannelSwitcherPageAction} x */
	UpdateChannelSwitcherPageAction(x) {
		const cf="UpdateChannelSwitcherPageAction";
		this.save_keys(`[${cf}]`,x);
		const {updateChannelSwitcherPageAction,...y}=x; this.g(y); // ! #destructure
		this.PageAction(updateChannelSwitcherPageAction);
	}
	/** @private @arg {PageAction<ChannelSwitcherPageRenderer>} x */
	PageAction(x) {
		const cf="PageAction";
		this.save_keys(`[${cf}]`,x);
		const {page,...y}=x; this.g(y); // ! #destructure
		this.ChannelSwitcherPageRenderer(page);
	}
	/** @private @arg {ChannelSwitcherPageRenderer} x */
	ChannelSwitcherPageRenderer(x) {
		const cf="UpdateChannelSwitcherPageAction";
		this.save_keys(`[${cf}]`,x);
		const {channelSwitcherPageRenderer,...y}=x; this.g(y); // ! #destructure
		this.ChannelSwitcherPage(channelSwitcherPageRenderer);
	}
	/** @private @arg {ReelItemWatchResponse} x */
	ReelItemWatchResponse(x) {
		const cf="ReelItemWatchResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=x; this.g(y); // ! #destructure
		this.ReelPlayerOverlayRenderer(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.t(replacementEndpoint,this.E$ReelWatchEndpoint);
		this.t(sequenceContinuation,this.primitive_of_string);
		this.DesktopTopbarRenderer(desktopTopbar);
		this.z(engagementPanels,this.EngagementPanelItem);
	}
	/** @private @arg {EngagementPanelItem} x */
	EngagementPanelItem(x) {
		const cf="EngagementPanelItem";
		this.save_keys(`[${cf}]`,x);
		if("engagementPanelSectionListRenderer" in x) {
			return this.EngagementPanelSectionListRenderer(x);
		} else {
			debugger;
		}
	}
	/** @private @arg {AccountSetSetting} x */
	SetSettingResponse(x) {
		const cf="AccountSetSetting";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},settingItemId,...y}=x; this.g(y); // ! #destructure
		if(settingItemId!=="407") debugger;
	}
	/** @private @arg {FeedbackResponse} x */
	FeedbackResponse(x) {
		const cf="FeedbackResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},feedbackResponses,...y}=x; this.g(y); // ! #destructure
		this.z(feedbackResponses,this.FeedbackResponseProcessedStatus);
	}
	/** @private @arg {GetTranscriptResponse} x */
	GetTranscriptResponse(x) {
		const cf="GetTranscriptResponse";
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
	/** @private @arg {SuccessResponse} x */
	SuccessResponse(x) {
		const cf="SuccessResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},success,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(success,"boolean");
	}
	/** @private @arg {AttGetResponse} x */
	AttGetResponse(x) {
		const cf="AttGetResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},challenge,bgChallenge,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(challenge);
		this.AttBgChallenge(bgChallenge);
	}
	/** @private @arg {GuideResponse} x */
	GuideResponse(x) {
		const cf="GuideResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},items,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.GuideItemType);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {GuideItemType} x */
	GuideItemType(x) {
		const cf="GuideItemType";
		this.save_keys(`[${cf}]`,x);
		if("guideSectionRenderer" in x) {
			return this.GuideSectionRenderer(x);
		} else if("guideSubscriptionsSectionRenderer" in x) {
			return this.GuideSubscriptionsSectionRenderer(x);
		}
		debugger;
	}
	/** @private @arg {GuideSectionRenderer} x */
	GuideSectionRenderer(x) {
		const cf="GuideSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {guideSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.GuideSectionData(guideSectionRenderer);
	}
	/** @private @arg {GuideSectionData} x */
	GuideSectionData(x) {
		const cf="GuideSectionData";
		this.save_keys(`[${cf}]`,x);
		const {items,trackingParams,formattedTitle,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.GuideSectionItemType);
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.TextT);
	}
	/** @private @arg {GuideSectionItemType} x */
	GuideSectionItemType(x) {
		if("guideEntryRenderer" in x) return this.GuideEntryRenderer(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.GuideCollapsibleSectionEntryRenderer(x);
		debugger;
	}
	/** @private @arg {LiveChatRenderer} x */
	LiveChatRenderer(x) {
		const cf="LiveChatRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatRenderer);
	}
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
		this.z(contents,this.PlaylistPanelVideoRenderer);
		this.primitive_of_string(title);
		this.primitive_of(currentIndex,"number");
		this.primitive_of_string(playlistId);
		this.D$SimpleText(ownerName);
		this.primitive_of(isInfinite,"boolean");
		this.parser.parse_url("PlaylistContent",playlistShareUrl);
		this.D$SimpleText(shortBylineText);
		this.D$SimpleText(longBylineText);
		this.trackingParams(cf,trackingParams);
		this.D$SimpleText(titleText);
		this.primitive_of(isEditable,"boolean");
		this.MenuRenderer(menu);
		if(localCurrentIndex!==25&&localCurrentIndex!==0) debugger;
		this.MenuRenderer(playlistButtons);
		this.primitive_of(isCourse,"boolean");
		this.D$SimpleText(nextVideoLabel);
	}
	/** @private @arg {ThumbnailOverlayBottomPanelData} x */
	ThumbnailOverlayBottomPanelData(x) {
		const cf="ThumbnailOverlayBottomPanelData";
		this.save_keys(`[${cf}]`,x);
		const {icon,...y}=x; this.g(y); // ! #destructure
		this.Icon(icon);
	}
	/** @private @arg {R$BrowserMediaSession} x */
	BrowserMediaSessionRenderer(x) {
		const cf="BrowserMediaSessionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {browserMediaSessionRenderer,...y}=x; this.g(y); // ! #destructure
		this.BrowserMediaSession(browserMediaSessionRenderer);
	}
	/** @private @arg {AD$BrowserMediaSession} x */
	BrowserMediaSession(x) {
		const cf="BrowserMediaSession";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @private @arg {R$AutoplaySwitchButtonRenderer} x */
	AutoplaySwitchButtonRenderer(x) {
		const cf="AutoplaySwitchButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {autoplaySwitchButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.AutoplaySwitchButton(autoplaySwitchButtonRenderer);
	}
	/** @private @arg {AutoplaySwitchButton} x */
	AutoplaySwitchButton(x) {
		const cf="AutoplaySwitchButton";
		this.save_keys(`[${cf}]`,x);
		const {onEnabledCommand,onDisabledCommand,enabledAccessibilityData,disabledAccessibilityData,trackingParams,enabled,...y}=x; this.g(y); // ! #destructure
		this.SetSettingEndpointAutonavForDesktop(onEnabledCommand);
		this.SetSettingEndpointAutonavForDesktop(onDisabledCommand);
		this.A$Accessibility(enabledAccessibilityData);
		this.A$Accessibility(disabledAccessibilityData);
		this.trackingParams(cf,trackingParams);
		this.primitive_of(enabled,"boolean");
	}
	/** @arg {DecoratedPlayerBar} x */
	DecoratedPlayerBar(x) {
		const cf="DecoratedPlayerBar";
		this.save_keys(`[${cf}]`,x);
		const {playerBar,playerBarActionButton,...y}=x; this.g(y); // ! #destructure
		this.MultiMarkersPlayerBarRenderer(playerBar);
		this.t(playerBarActionButton,this.R$ButtonRenderer);
	}
	/** @arg {D$PlayerOverlayVideoDetails} x */
	PlayerOverlayVideoDetails(x) {
		const cf="PlayerOverlayVideoDetails";
		this.save_keys(`[${cf}]`,x);
		const {title,subtitle,...y}=x; this.g(y); // ! #destructure
		this.D$SimpleText(title);
		this.D$TextWithRuns(subtitle);
	}
	/** @template T @arg {ItemTemplate<T>} x @arg {(x:T)=>void} f */
	ItemTemplate(x,f) {
		const cf="ItemTemplate";
		this.save_keys(`[${cf}]`,x);
		return f.call(this,x.item);
	}
	/** @arg {ReplaceEnclosingAction} x */
	ReplaceEnclosingAction(x) {
		const cf="ReplaceEnclosingAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,replaceEnclosingAction,...y}=x; this.g(y);
		this.ItemTemplate(replaceEnclosingAction,this.ReplaceEnclosingAction_item);
	}
	/** @arg {ReplaceEnclosingAction['replaceEnclosingAction']['item']} x */
	ReplaceEnclosingAction_item(x) {
		if("notificationTextRenderer" in x) return this.NotificationTextRenderer(x);
		if("reelDismissalActionRenderer" in x) return this.ReelDismissalActionRenderer(x);
		this.do_codegen("ReplaceEnclosingAction_item",x);
	}
	/** @arg {NotificationTextRenderer} x */
	NotificationTextRenderer(x) {
		const cf="NotificationTextRenderer";
		this.save_keys(`[${cf}]`,x);
		/** @type {NotificationTextData} */
		let n=this.w(x);
		const {successResponseText,undoText,undoEndpoint,trackingParams,...y}=n; this.g(y);
		this.D$TextWithRuns(successResponseText);
		this.D$TextWithRuns(undoText);
		this.E$UndoFeedbackEndpoint(undoEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {E$UndoFeedbackEndpoint} x */
	E$UndoFeedbackEndpoint(x) {
		const cf="UndoFeedbackEndpoint";
		const {clickTrackingParams,commandMetadata,undoFeedbackEndpoint}=x;
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		{
			const {actions,undoToken,...y}=undoFeedbackEndpoint; this.g(y);
			let act=this.z(actions,a => {
				const {clickTrackingParams,...y}=a;
				this.clickTrackingParams("E$UndoFeedback",clickTrackingParams);
				return this.w(y);
			});
			this.z(act,this.g);
			this.primitive_of_string(undoToken);
		};
	}
	/** @arg {E$Button_serviceEndpoint} x */
	Button_serviceEndpoint(x) {
		const cf="Button_serviceEndpoint";
		this.save_keys(`[${cf}]`,x);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		if("ypcGetOffersEndpoint" in x) return this.YpcGetOffersEndpoint(x);
		this.do_codegen(cf,x);
	}
	/** @arg {E$Button_navigationEndpoint} x */
	Button_navigationEndpoint(x) {
		const cf="Button_navigationEndpoint";
		this.save_keys(`[${cf}]`,x);
		if("shareEntityServiceEndpoint" in x) return this.ShareEntityServiceEndpoint(x);
		this.do_codegen(cf,x);
	}
	/** @arg {E$YpcGetOffersEndpoint} x */
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
	/** @arg {ThumbnailOverlayHoverTextData} x */
	ThumbnailOverlayHoverTextData(x) {
		const cf="ThumbnailOverlayHoverTextData";
		this.save_keys(`[${cf}]`,x);
		const {text,icon,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(text);
		this.Icon(icon);
	}
	/** @arg {CustomEmoji} x */
	CustomEmoji(x) {
		const cf="CustomEmoji";
		this.save_keys(`[${cf}]`,x);
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(emojiId);
		this.z(shortcuts,this.primitive_of_string);
		this.z(searchTerms,this.primitive_of_string);
		this.EmojiImage(image);
		if(isCustomEmoji) {
			debugger;
		} else {
			debugger;
		}
	}
	/** @arg {EmojiImage} x */
	EmojiImage(x) {
		const cf="EmojiImage";
		this.save_keys(`[${cf}]`,x);
		const {accessibility,thumbnails,...y}=x; this.g(y); // ! #destructure
		this.A$Accessibility(accessibility);
		this.z(thumbnails,this.ThumbnailItem);
	}
	/** @arg {SortFilterSubMenuRenderer} x */
	SortFilterSubMenuRenderer(x) {
		const cf="SortFilterSubMenuRenderer";
		this.save_keys(`[${cf}]`,x);
		const {sortFilterSubMenuRenderer,...y}=x; this.g(y); // ! #destructure
		this.SortFilterSubMenuData(sortFilterSubMenuRenderer);
	}
	/** @arg {CommentSimpleboxData} x */
	CommentSimpleboxData(x) {
		const cf="CommentSimpleboxData";
		this.save_keys(`[${cf}]`,x);
		const {submitButton,cancelButton,authorThumbnail,placeholderText,trackingParams,avatarSize,emojiButton,emojiPicker,aadcGuidelinesStateEntityKey,...y}=x; this.g(y); // ! #destructure
		this.R$ButtonRenderer(submitButton);
		this.R$ButtonRenderer(cancelButton);
		this.Thumbnail(authorThumbnail);
		this.D$TextWithRuns(placeholderText);
		this.trackingParams(cf,trackingParams);
		if(avatarSize!=="SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT") debugger;
		this.R$ButtonRenderer(emojiButton);
		this.EmojiPickerRenderer(emojiPicker);
		this.primitive_of_string(aadcGuidelinesStateEntityKey);
	}
	/** @arg {ChannelPageResponse} x */
	ChannelPageResponse(x) {
		const cf="ChannelPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="channel") debugger;
		this.E$BrowseEndpoint(endpoint);
		this.ChannelResponse(response);
		this.primitive_of_string(url);
	}
	/** @arg {PlaylistPageResponse} x */
	PlaylistPageResponse(x) {
		const cf="PlaylistPageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page,response,...y}=x; this.g(y); // ! #destructure
		if(page!=="playlist") debugger;
		this.E$BrowseEndpoint(endpoint);
		this.Api_PlaylistResponse(response);
		this.primitive_of_string(url);
		switch(rootVe) {
			default: debugger; break;
			case void 0: break;
			case 5754: break;
		}
	}
	/** @arg {Extract<SettingsPageResponse,{rootVe:23462}>} x */
	Settings_VE23462(x) {
		const {page,endpoint,response,url,rootVe,...y}=x; this.g(y); // ! #destructure
		if(page!=="settings") debugger;
		this.E$BrowseEndpoint(endpoint);
		this.SettingsResponse(response);
		this.primitive_of_string(url);
		if(rootVe!==23462) debugger;
	}
	/** @arg {SettingsPageResponse} x */
	SettingsPageResponse(x) {
		const cf="SettingsPageResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) return this.Settings_VE23462(x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="settings") debugger;
		this.E$BrowseEndpoint(endpoint);
		this.SettingsResponse(response);
		this.primitive_of_string(url);
	}
	/** @arg {Extract<ShortsPageResponse,{rootVe:37414}>} x */
	Shorts_VE37414(x) {
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=x; this.g(y); // ! #destructure
		if(rootVe!==37414) debugger;
		if(page!=="shorts") debugger;
		this.PlayerResponse(playerResponse);
		this.E$ReelWatchEndpoint(endpoint);
		this.ReelResponse(response);
		this.t(reelWatchSequenceResponse,this.ReelWatchSequenceResponse);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.ReelWatchSequenceResponse(cachedReelWatchSequenceResponse);
	}
	/** @arg {ShortsPageResponse} x */
	ShortsPageResponse(x) {
		const cf="ShortsResponse";
		this.save_keys(`[${cf}]`,x);
		if("rootVe" in x) return this.Shorts_VE37414(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=x; this.g(y); // ! #destructure
		if(page!=="shorts") debugger;
		this.PlayerResponse(playerResponse);
		this.E$ReelWatchEndpoint(endpoint);
		this.ReelResponse(response);
		this.t(reelWatchSequenceResponse,this.ReelWatchSequenceResponse);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(cachedReelWatchSequenceResponse,this.ReelWatchSequenceResponse);
	}
	/** @arg {SearchPageResponse} x */
	SearchPageResponse(x) {
		const cf="GetNotificationMenuJson";
		this.save_keys(`[${cf}]`,x);
		const {page,endpoint,response,url,...y}=x; this.g(y); // ! #destructure
		if(page!=="search") debugger;
		this.E$SearchEndpoint(endpoint);
		this.SearchResponse(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @arg {E$SearchEndpoint} x */
	E$SearchEndpoint(x) {
		const cf="SearchEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,searchEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$Search(searchEndpoint);
	}
	/** @arg {E$Search} x */
	E$Search(x) {
		const cf="Search";
		this.save_keys(`[${cf}]`,x);
		const {query,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(query);
	}
	/** @arg {ItemSectionItem} x */
	ItemSectionItem(x) {
		const cf="ItemSectionItem";
		this.save_keys(`[${cf}]`,x);
		if("continuationItemRenderer" in x) {
			this.ContinuationItemRenderer(x);
		}
	}
	/** @arg {MusicResponsiveListItem} x */
	MusicResponsiveListItem(x) {
		const cf="MusicResponsiveListItem";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {MusicCarouselShelf} x */
	MusicCarouselShelf(x) {
		const cf="MusicCarouselShelf";
		this.save_keys(`[${cf}]`,x);
		const {contents,header,trackingParams,itemSize,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.g);
		this.g(header);
		this.trackingParams(cf,trackingParams);
		if(itemSize!=="COLLECTION_STYLE_ITEM_SIZE_MEDIUM") debugger;
	}
	/** @arg {ChannelMetadataRenderer} x */
	ChannelMetadataRenderer(x) {
		const cf="ChannelMetadataRenderer";
		this.save_keys(`[${cf}]`,x);
		const {channelMetadataRenderer,...y}=x; this.g(y); // ! #destructure
		this.ChannelMetadata(channelMetadataRenderer);
	}
	/** @arg {BrowseHeader} x */
	BrowseHeader(x) {
		const cf="BrowseHeader";
		this.save_keys(`[${cf}]`,x);
		if("feedTabbedHeaderRenderer" in x) {
			return this.FeedTabbedHeaderRenderer(x);
		} else if("c4TabbedHeaderRenderer" in x) {
			return this.C4TabbedHeaderRenderer(x);
		}
		if("playlistHeaderRenderer" in x) return this.PlaylistHeaderRenderer(x);
		debugger;
	}
	/** @arg {PlaylistHeaderRenderer} x */
	PlaylistHeaderRenderer(x) {
		this.PlaylistHeader(x.playlistHeaderRenderer);
	}
	/** @arg {C4TabbedHeaderRenderer} x */
	C4TabbedHeaderRenderer(x) {
		const cf="C4TabbedHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {c4TabbedHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.C4TabbedHeaderData(c4TabbedHeaderRenderer);
	}
	/** @arg {FeedTabbedHeaderRenderer} x */
	FeedTabbedHeaderRenderer(x) {
		const cf="FeedTabbedHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {feedTabbedHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.FeedTabbedHeaderData(feedTabbedHeaderRenderer);
	}
	/** @arg {CacheMetadata} x */
	CacheMetadata(x) {
		const cf="CacheMetadata";
		this.save_keys(`[${cf}]`,x);
		const {isCacheHit,...y}=x; this.g(y); // ! #destructure
		if(!isCacheHit) debugger;
	}
	/** @arg {B$StateTag} x */
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
	/** @arg {SettingsSidebarRenderer} x */
	SettingsSidebarRenderer(x) {
		const cf="SettingsSidebarRenderer";
		this.save_keys(`[${cf}]`,x);
		const {settingsSidebarRenderer,...y}=x; this.g(y); // ! #destructure
		this.SettingsSidebarData(settingsSidebarRenderer);
	}
	/** @arg {EntityBatchUpdate} x */
	EntityBatchUpdate(x) {
		const cf="EntityBatchUpdate";
		this.save_keys(`[${cf}]`,x);
		const {entityBatchUpdate,...y}=x; this.g(y); // ! #destructure
		this.EntityBatchUpdateData(entityBatchUpdate);
	}
	/** @arg {R$DesktopTopbar} x */
	DesktopTopbarRenderer(x) {
		const cf="DesktopTopbarRenderer";
		this.save_keys(`[${cf}]`,x);
		const {desktopTopbarRenderer,...y}=x; this.g(y); // ! #destructure
		this.DesktopTopbarData(desktopTopbarRenderer);
	}
	/** @arg {BrowseContents} x */
	BrowseContents(x) {
		const cf="BrowseContents";
		this.save_keys(`[${cf}]`,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.TwoColumnBrowseResultsRenderer(x);
		if("feedFilterChipBarRenderer" in x) return this.FeedFilterChipBarRenderer(x);
		debugger;
	}
	/** @arg {FeedFilterChipBarRenderer} x */
	FeedFilterChipBarRenderer(x) {
		const {feedFilterChipBarRenderer,...y}=x; this.g(y); // ! #destructure
		this.FeedFilterChipBarData(feedFilterChipBarRenderer);
	}
	/** @arg {R$TwoColumnBrowseResults} x */
	TwoColumnBrowseResultsRenderer(x) {
		const {twoColumnBrowseResultsRenderer,...y}=x; this.g(y); // ! #destructure
		this.TwoColumnBrowseResultsData(twoColumnBrowseResultsRenderer);
	}
	/** @arg {ResponseReceivedAction} x */
	ResponseReceivedAction(x) {
		const cf="ResponseReceivedAction";
		this.save_keys(`[${cf}]`,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.AdsControlFlowOpportunityReceivedCommand(x);
		if("reloadContinuationItemsCommand" in x) return this.ReloadContinuationItemsCommand(x);
		debugger;
	}
	/** @arg {M$ResolveUrlCommandMetadata} x */
	ResolveUrlCommandMetadata(x) {
		const cf="ResolveUrlCommandMetadata";
		this.save_keys(`[${cf}]`,x);
		const {isVanityUrl,parentTrackingParams,...y}=x; this.g(y); // ! #destructure
		if(isVanityUrl!==void 0) this.primitive_of(isVanityUrl,"boolean");
		this.t(parentTrackingParams,a => this.params("ResolveUrlCommandMetadata","tracking.parentTrackingParams",a));
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommandData} x */
	AdsControlFlowOpportunityReceivedCommandData(x) {
		const cf="AdsControlFlowOpportunityReceivedCommandData";
		this.save_keys(`[${cf}]`,x);
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=x; this.g(y); // ! #destructure
		this.save_enum("OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.AdSlotAndLayoutMetadataItem));
		this.primitive_of(isInitialLoad,"boolean");
		this.primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @arg {SearchResultsTab} x */
	SearchResultsTab(x) {
		const cf="SearchResultsTab";
		this.save_keys(`[${cf}]`,x);
		const {endpoint,title,selected,content,tabIdentifier,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.t(endpoint,this.E$SearchEndpoint);
		this.primitive_of_string(title);
		if(selected!==void 0) this.primitive_of(selected,"boolean");
		this.SectionListRenderer(content);
		console.log("[tabIdentifier]",tabIdentifier);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {GetAddToPlaylistResponse} x */
	GetAddToPlaylistResponse(x) {
		const cf="GetAddToPlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.AddToPlaylistRenderer);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {AttLogResponse} x */
	AttLogResponse(x) {
		const cf="AttLogResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},...y}=x; this.g(y); // ! #destructure
	}
	/** @arg {ClientMessages} x */
	ClientMessages(x) {
		const cf="ClientMessages";
		this.save_keys(`[${cf}]`,x);
		const {reconnectMessage,unableToReconnectMessage,fatalError,reconnectedMessage,genericError,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(reconnectMessage);
		this.D$TextWithRuns(unableToReconnectMessage);
		this.D$TextWithRuns(fatalError);
		this.D$TextWithRuns(reconnectedMessage);
		this.D$TextWithRuns(genericError);
	}
	/** @arg {LiveChatEmoji} x */
	LiveChatEmoji(x) {
		const cf="LiveChatEmoji";
		this.save_keys(`[${cf}]`,x);
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,isLocked,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(emojiId);
		this.z(shortcuts,this.primitive_of_string);
		this.z(searchTerms,this.primitive_of_string);
		this.Thumbnail(image);
		this.primitive_of(isCustomEmoji,"boolean");
		this.primitive_of(isLocked,"boolean");
	}
	/** @arg {MessageRenderer} x */
	MessageRenderer(x) {
		const cf="MessageRenderer";
		this.save_keys(`[${cf}]`,x);
		const {messageRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(messageRenderer);
	}
	/** @arg {LiveChatParticipantsListRenderer} x */
	LiveChatParticipantsListRenderer(x) {
		const cf="LiveChatParticipantsListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatParticipantsListRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatParticipantsListRenderer);
	}
	/** @arg {LiveChatTickerRenderer} x */
	LiveChatTickerRenderer(x) {
		const cf="LiveChatTickerRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatTickerRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatTickerRenderer);
	}
	/** @arg {LiveChatHeaderRenderer} x */
	LiveChatHeaderRenderer(x) {
		const cf="LiveChatHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(liveChatHeaderRenderer);
	}
	/** @arg {LiveChatPlaceholderItemRenderer} x */
	LiveChatPlaceholderItemRenderer(x) {
		const cf="LiveChatPlaceholderItemRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatPlaceholderItemRenderer,...y}=x; this.g(y); // ! #destructure
		this.LiveChatPlaceholderItemData(liveChatPlaceholderItemRenderer);
	}
	/** @arg {LiveChatTextMessageRenderer} x */
	LiveChatTextMessageRenderer(x) {
		const cf="LiveChatTextMessageRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatTextMessageRenderer,...y}=x; this.g(y); // ! #destructure
		this.LiveChatTextMessageData(liveChatTextMessageRenderer);
	}
	/** @arg {PlaylistPanelContinuation} x */
	PlaylistPanelContinuation(x) {
		const cf="PlaylistPanelContinuation";
		this.save_keys(`[${cf}]`,x);
		const {playlistPanelContinuation,...y}=x; this.g(y); // ! #destructure
		this.PlaylistPanelContinuationData(playlistPanelContinuation);
	}
	/** @arg {RT$ReportFormModal} x */
	ReportFormModalRenderer(x) {
		const cf="ReportFormModalRenderer";
		this.save_keys(`[${cf}]`,x);
		const {reportFormModalRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(reportFormModalRenderer);
	}
	/** @arg {AutomixPreviewVideoRenderer} x */
	AutomixPreviewVideoRenderer(x) {
		const cf="AutomixPreviewVideoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {automixPreviewVideoRenderer,...y}=x; this.g(y); // ! #destructure
		this.AutomixPreviewVideo(automixPreviewVideoRenderer);
	}
	/** @arg {AutomixPreviewVideo} x */
	AutomixPreviewVideo(x) {
		const cf="AutomixPreviewVideo";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {ThumbnailOverlayResumePlayback} x */
	ThumbnailOverlayResumePlayback(x) {
		const cf="ThumbnailOverlayResumePlayback";
		this.save_keys(`[${cf}]`,x);
		const {percentDurationWatched,...y}=x; this.g(y);
		if(!percentDurationWatched) {debugger; return;}
		/** @type {Percent} */
		switch(percentDurationWatched) {
			case 10: return;
			case 100: return;
			default: debugger; return;
		}
	}
	/** @arg {VideoMastheadAdV3} x */
	VideoMastheadAdV3(x) {
		const cf="VideoMastheadAdV3";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {RendererContentItem} x */
	RendererContentItem(x) {
		const cf="RendererContentItem";
		this.save_keys(`[${cf}]`,x);
		if("richItemRenderer" in x) return this.RichItemRenderer(x);
		if("continuationItemRenderer" in x) return this.ContinuationItemRenderer(x);
		if("richSectionRenderer" in x) return this.RichSectionRenderer(x);
		debugger;
	}
	/** @arg {RichItemRenderer} x */
	RichItemRenderer(x) {
		const cf="RichItemRenderer";
		this.save_keys(`[${cf}]`,x);
		const {richItemRenderer,...y}=x; this.g(y); // ! #destructure
		this.RichItemData(richItemRenderer);
	}
	/** @arg {A$LoggingDirectives} x */
	A$LoggingDirectives(x) {
		const cf="LoggingDirectives";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.Visibility(visibility);
		this.t(gestures,this.LoggingDirectives_gestures);
		if(enableDisplayloggerExperiment!==void 0) this.primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @arg {NonNullable<A$LoggingDirectives['gestures']>} x */
	LoggingDirectives_gestures(x) {
		let inner=this.TypesTemplate(x);
		if(inner!==4) debugger;
	}
	/** @arg {ShowEngagementPanelScrimAction} x */
	ShowEngagementPanelScrimAction(x) {
		const cf="ShowEngagementPanelScrimAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,showEngagementPanelScrimAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.ShowEngagementPanelScrimActionData(showEngagementPanelScrimAction);
	}
	/** @arg {ChangeEngagementPanelVisibilityAction} x */
	ChangeEngagementPanelVisibilityAction(x) {
		const cf="ChangeEngagementPanelVisibilityAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,changeEngagementPanelVisibilityAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.ChangeEngagementPanelVisibilityActionData(changeEngagementPanelVisibilityAction);
	}
	/** @arg {R$EngagementPanelTitleHeaderRenderer} x */
	EngagementPanelTitleHeaderRenderer(x) {
		const cf="EngagementPanelTitleHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {engagementPanelTitleHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.EngagementPanelTitleHeader(engagementPanelTitleHeaderRenderer);
	}
	/** @arg {AdsEngagementPanelContentRenderer} x */
	AdsEngagementPanelContentRenderer(x) {
		const cf="AdsEngagementPanelContentRenderer";
		this.save_keys(`[${cf}]`,x);
		const {adsEngagementPanelContentRenderer,...y}=x; this.g(y); // ! #destructure
		this.AdsEngagementPanelContentData(adsEngagementPanelContentRenderer);
	}
	/** @arg {ClipSectionRenderer} x */
	ClipSectionRenderer(x) {
		const cf="ClipSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {clipSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.ContentsArrayTemplate(clipSectionRenderer,this.ClipCreationRenderer);
	}
	/** @arg {StructuredDescriptionContentRenderer} x */
	StructuredDescriptionContentRenderer(x) {
		const cf="StructuredDescriptionContentRenderer";
		this.save_keys(`[${cf}]`,x);
		const {structuredDescriptionContentRenderer,...y}=x; this.g(y); // ! #destructure
		this.StructuredDescriptionContentData(structuredDescriptionContentRenderer);
	}
	/** @arg {CommentRepliesItem} x */
	CommentRepliesItem(x) {
		const cf="CommentRepliesItem";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.CommentRenderer);
	}
	/** @arg {GetMultiPageMenuAction} x */
	GetMultiPageMenuAction(x) {
		const cf="GetMultiPageMenuAction";
		this.save_keys(`[${cf}]`,x);
		const {getMultiPageMenuAction,...y}=x; this.g(y); // ! #destructure
		this.GetMultiPageMenuActionData(getMultiPageMenuAction);
	}
	/** @arg {FeedbackResponseProcessedStatus} x */
	FeedbackResponseProcessedStatus(x) {
		const cf="FeedbackResponseProcessedStatus";
		this.save_keys(`[${cf}]`,x);
		const {isProcessed,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(isProcessed,"boolean");
	}
	/** @arg {UpdateEngagementPanelAction} x */
	UpdateEngagementPanelAction(x) {
		const cf="UpdateEngagementPanelAction";
		this.save_keys(`[${cf}]`,x);
		const {updateEngagementPanelAction,clickTrackingParams,...y}=x; this.g(y); // ! #destructure
		this.UpdateEngagementPanelData(updateEngagementPanelAction);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @arg {AttBgChallenge} x */
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
		const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a,...y}=x; this.g(y); // ! #destructure
		return a;
	}
	/** @arg {GuideSubscriptionsSectionRenderer} x */
	GuideSubscriptionsSectionRenderer(x) {
		const cf="GuideSubscriptionsSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {guideSubscriptionsSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.GuideSubscriptionsSectionData(guideSubscriptionsSectionRenderer);
	}
	/** @arg {GuideSubscriptionsSectionData} x */
	GuideSubscriptionsSectionData(x) {
		const cf="GuideSubscriptionsSectionData";
		this.save_keys(`[${cf}]`,x);
		const {sort,items,trackingParams,formattedTitle,handlerDatas,...y}=x; this.g(y); // ! #destructure
		if(sort!=="CHANNEL_ACTIVITY") debugger;
		this.z(items,this.GuideSubscriptionsSectionItem);
		this.trackingParams(cf,trackingParams);
		this.D$SimpleText(formattedTitle);
		this.z(handlerDatas,a => {
			switch(a) {
				default: debugger; break;
				case "GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS": break;
				case "GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS": break;
			}
		});
	}
	/** @arg {GuideSubscriptionsSectionItem} x */
	GuideSubscriptionsSectionItem(x) {
		if("guideEntryRenderer" in x) return this.GuideEntryRenderer(x);
		if("guideCollapsibleEntryRenderer" in x) return this.GuideCollapsibleEntryRenderer(x);
		debugger;
	}
	/** @arg {R$ElementUpdate} x */
	ElementUpdate(x) {
		const cf="ElementUpdate";
		this.save_keys(`[${cf}]`,x);
		const {updates,...y}=x; this.g(y); // ! #destructure
		this.z(updates,this.ElementUpdateItem);
	}
	/** @arg {D$ElementUpdate} x */
	ElementUpdateItem(x) {
		const cf="ElementUpdateItem";
		this.save_keys(`[${cf}]`,x);
		if("templateUpdate" in x) return this.TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return this.ResourceStatusInResponseCheck(x);
		debugger;
	}
	/** @arg {R$ResourceStatusInResponseCheck} x */
	ResourceStatusInResponseCheck(x) {
		const cf="ResourceStatusInResponseCheck";
		this.save_keys(`[${cf}]`,x);
		this.ResourceStatusInResponseCheckData(x.resourceStatusInResponseCheck);
	}
	/** @arg {D$ResourceStatusInResponseCheckData} x */
	ResourceStatusInResponseCheckData(x) {
		const cf="ResourceStatusInResponseCheckData";
		this.save_keys(`[${cf}]`,x);
		const {resourceStatuses,serverBuildLabel,...y}=x; this.g(y); // ! #destructure
		this.z(resourceStatuses,this.ElementResourceStatus);
		let ysl=split_string(serverBuildLabel,"_");
		if(ysl[0]!=="boq") debugger;
		ysl[1]!=="youtube-watch-ui";
		let vs=split_string_once(ysl[2],".");
		if(!this.str_starts_with(vs[0],"202301")) debugger;
		switch(ysl[3]) {
			case "p0": break;
			case "p1": break;
			default: debugger; break;
		}
	}
	/** @arg {D$ElementResourceStatus} x */
	ElementResourceStatus(x) {
		const cf="ElementResourceStatus";
		this.save_keys(`[${cf}]`,x);
		const {identifier,status,...y}=x; this.g(y); // ! #destructure
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		let vv=split_string_once(identifier,"|");
		switch(vv[0]) {
			default: console.log(vv); debugger; break;
			case "bottom_sheet_list_option.eml": break;
			case "track_selection_sheet_option.eml": break;
		}
		switch(vv[1]) {
			default: console.log(vv); debugger; break;
			case "cd39732d53f1132c": break;
			case "f3619d8bb085c9a9": break;
		}
	}
	/** @arg {R$TemplateUpdate} x */
	TemplateUpdate(x) {
		const cf="TemplateUpdate";
		this.save_keys(`[${cf}]`,x);
		const {templateUpdate,...y}=x; this.g(y); // ! #destructure
		this.TemplateUpdateData(templateUpdate);
	}
	/** @arg {D$TemplateUpdate} x */
	TemplateUpdateData(x) {
		const cf="TemplateUpdateData";
		this.save_keys(`[${cf}]`,x);
		const {identifier,serializedTemplateConfig,dependencies,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(identifier);
		this.primitive_of_string(serializedTemplateConfig);
		this.tz(dependencies,this.primitive_of_string);
	}
	/** @arg {D$EntityBatchUpdateData} x */
	EntityBatchUpdateData(x) {
		const cf="EntityBatchUpdateData";
		this.save_keys(`[${cf}]`,x);
		const {mutations,timestamp,...y}=x; this.g(y); // ! #destructure
		this.z(mutations,this.EntityMutationItem);
		this.TimestampWithNanos(timestamp);
	}
	/** @arg {TimestampWithNanos} x */
	TimestampWithNanos(x) {
		const cf="TimestampWithNanos";
		this.save_keys(`[${cf}]`,x);
		const {seconds,nanos,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(seconds);
		this.primitive_of(nanos,"number");
	}
	/** @arg {AddToPlaylistCommand} x */
	AddToPlaylistCommand(x) {
		const cf="AddToPlaylistCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,addToPlaylistCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AddToPlaylistCommandData(addToPlaylistCommand);
	}
	/** @arg {AddToPlaylistCommandData} x */
	AddToPlaylistCommandData(x) {
		const cf="AddToPlaylistCommandData";
		this.save_keys(`[${cf}]`,x);
		const {listType,onCreateListCommand,openListPanel,openMiniplayer,videoId,videoIds,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(listType);
		this.CreatePlaylistServiceEndpoint(onCreateListCommand);
		this.primitive_of(openListPanel,"boolean");
		this.primitive_of(openMiniplayer,"boolean");
		this.videoId(videoId);
		this.z(videoIds,this.videoId);
	}
	/** @arg {CreatePlaylistServiceEndpoint} x */
	CreatePlaylistServiceEndpoint(x) {
		const cf="CreatePlaylistServiceEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,createPlaylistServiceEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.CreatePlaylistService(createPlaylistServiceEndpoint);
	}
	/** @arg {CreatePlaylistService} x */
	CreatePlaylistService(x) {
		const cf="CreatePlaylistServiceArgs";
		this.save_keys(`[${cf}]`,x);
		const {params,videoIds,...y}=x; this.g(y); // ! #destructure
		this.t(params,a => this.params("CreatePlaylist","create_playlist.params",a));
		this.z(videoIds,this.videoId);
	}
	/** @arg {SignalAction} x */
	A$SignalAction(x) {
		const cf="SignalAction";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,signalAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.SignalActionData(signalAction);
	}
	/** @arg {SignalActionData} x */
	SignalActionData(x) {
		const cf="SignalActionData";
		this.save_keys(`[${cf}]`,x);
		const {signal,...y}=x; this.g(y); // ! #destructure
		/** @type {SignalEnum} */
		switch(signal) {
			default: console.log(`\ncase "${signal}": break;`); debugger; break;
			case "ENABLE_CHROME_NOTIFICATIONS": break;
			case "HISTORY_BACK": break;
			case "HISTORY_FORWARD": break;
			case "SKIP_NAVIGATION": break;
			case "TOGGLE_TRANSCRIPT_TIMESTAMPS": break;
			case "HELP": break;
		}
	}
	/** @arg {GuideEntryRenderer} x */
	GuideEntryRenderer(x) {
		const cf="GuideEntryRenderer";
		this.save_keys(`[${cf}]`,x);
		const {guideEntryRenderer,...y}=x; this.g(y); // ! #destructure
		this.GuideEntryRoot(guideEntryRenderer);
	}
	/** @arg {NonNullable<Extract<GuideEntryRoot,{serviceEndpoint:any}>['serviceEndpoint']>} x */
	GuideEntryRoot_ser(x) {
		if("reelWatchEndpoint" in x) return this.E$ReelWatchEndpoint(x);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		debugger;
	}
	/** @arg {GuideEntryRoot} x */
	GuideEntryRoot(x) {
		const cf="GuideEntryRoot";
		this.save_keys(`[${cf}]`,x);
		if("serviceEndpoint" in x) {
			const {icon,trackingParams,formattedTitle,accessibility,serviceEndpoint,...y}=x;
			this.Icon(icon);
			this.trackingParams("GuideEntryRoot",trackingParams);
			this.D$SimpleText(formattedTitle);
			this.A$Accessibility(accessibility);
			this.GuideEntryRoot_ser(serviceEndpoint);
			if("isPrimary" in y) {
				const {isPrimary,...y1}=y;
				if(isPrimary!==true) debugger;
				this.g(y1);
				return;
			}
			this.g(y);
			return;
			return;
		}
		if("icon" in x) {
			const {navigationEndpoint,icon,trackingParams,formattedTitle,accessibility,...y}=x;
			this.t(navigationEndpoint,x => {
				if("browseEndpoint" in x) return this.E$BrowseEndpoint(x);
				if("urlEndpoint" in x) return this.E$UrlEndpoint(x);
				debugger;
			});
			this.Icon(icon);
			this.trackingParams("GuideEntryRoot",trackingParams);
			this.D$SimpleText(formattedTitle);
			this.A$Accessibility(accessibility);
			if("isPrimary" in y) {
				const {isPrimary,...y1}=y;
				if(isPrimary!==true) debugger;
				this.g(y1);
				return;
			}
			this.g(y);
			return;
		}
		const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=x; this.g(y); // ! #destructure
		this.E$BrowseEndpoint(navigationEndpoint);
		this.Thumbnail(thumbnail);
		this.GuideEntryBadges(badges);
		this.trackingParams("GuideEntryRoot",trackingParams);
		this.D$SimpleText(formattedTitle);
		this.A$Accessibility(accessibility);
		this.GuideEntryData(entryData);
		this.GuideEntryPresentationStyle(presentationStyle);
	}
	/** @arg {Extract<GuideEntryRoot,{presentationStyle:any}>['presentationStyle']} x */
	GuideEntryPresentationStyle(x) {
		this.save_string("[GuideEntryPresentationStyle]",x);
		switch(x) {
			case "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT": return;
			case "GUIDE_ENTRY_PRESENTATION_STYLE_NONE": return;
			default:
		}
		switch(x) {default: debugger; return;}
	}
	/** @arg {GuideEntryBadges} x */
	GuideEntryBadges(x) {
		const cf="GuideEntryBadges";
		this.save_keys(`[${cf}]`,x);
		const {liveBroadcasting,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(liveBroadcasting,"boolean");
	}
	/** @arg {E$SetSettingEndpointAutonavForDesktop<boolean>} x */
	SetSettingEndpointAutonavForDesktop(x) {
		const cf="SetSettingEndpointAutonavForDesktop";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,setSettingEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.SettingItemAutonavForDesktop(setSettingEndpoint);
	}
	/** @arg {SettingItemAutonavForDesktop<boolean>} x */
	SettingItemAutonavForDesktop(x) {
		const cf="SettingItemAutonavForDesktop";
		this.save_keys(`[${cf}]`,x);
		const {settingItemId,settingItemIdForClient,...y}=x;
		if("boolValue" in y) {
			const {boolValue,...a}=y; this.g(a);
			this.primitive_of(boolValue,"boolean");
		} else {
			debugger;
		}
		switch(settingItemId) {
			default: console.log("[new.server.setting_item_id]",settingItemId); break;
			case "407": break;
		}
		switch(settingItemIdForClient) {
			default: console.log("[new.client.setting_item_id]",settingItemIdForClient); break;
			case "AUTONAV_FOR_DESKTOP": break;
		}
	}
	/** @arg {GuideCollapsibleEntryRenderer} x */
	GuideCollapsibleEntryRenderer(x) {
		const cf="GuideCollapsibleEntryRenderer";
		this.save_keys(`[${cf}]`,x);
		const {guideCollapsibleEntryRenderer,...y}=x; this.g(y); // ! #destructure
		this.GuideCollapsibleEntry(guideCollapsibleEntryRenderer);
	}
	/** @arg {R$PlayerAnnotationsExpanded} x */
	PlayerAnnotationsExpandedRenderer(x) {
		const cf="PlayerAnnotationsExpandedRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playerAnnotationsExpandedRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlayerAnnotationsExpandedData(playerAnnotationsExpandedRenderer);
	}
	/** @arg {VoiceSearchDialogData} x */
	VoiceSearchDialog(x) {
		const cf="VoiceSearchDialog";
		this.save_keys(`[${cf}]`,x);
		const {placeholderHeader,promptHeader,exampleQuery1,exampleQuery2,promptMicrophoneLabel,loadingHeader,connectionErrorHeader,connectionErrorMicrophoneLabel,permissionsHeader,permissionsSubtext,disabledHeader,disabledSubtext,microphoneButtonAriaLabel,exitButton,trackingParams,microphoneOffPromptHeader,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(placeholderHeader);
		this.D$TextWithRuns(promptHeader);
		this.D$TextWithRuns(exampleQuery1);
		this.D$TextWithRuns(exampleQuery2);
		this.D$TextWithRuns(promptMicrophoneLabel);
		this.D$TextWithRuns(loadingHeader);
		this.D$TextWithRuns(connectionErrorHeader);
		this.D$TextWithRuns(connectionErrorMicrophoneLabel);
		this.D$TextWithRuns(permissionsHeader);
		this.D$TextWithRuns(permissionsSubtext);
		this.D$TextWithRuns(disabledHeader);
		this.D$TextWithRuns(disabledSubtext);
		this.D$TextWithRuns(microphoneButtonAriaLabel);
		this.R$ButtonRenderer(exitButton);
		this.trackingParams(cf,trackingParams);
		this.D$TextWithRuns(microphoneOffPromptHeader);
	}
	/** @arg {VoiceSearchDialogRenderer} x */
	VoiceSearchDialogRenderer(x) {
		const cf="VoiceSearchDialogRenderer";
		this.save_keys(`[${cf}]`,x);
		const {voiceSearchDialogRenderer,...y}=x; this.g(y); // ! #destructure
		this.VoiceSearchDialog(voiceSearchDialogRenderer);
	}
	/** @arg {EntityMutationItem} x */
	EntityMutationItem(x) {
		const cf="EntityMutationItem";
		this.save_keys(`[${cf}]`,x);
		const {entityKey,type,options,payload,...y}=x; this.g(y); // ! #destructure
		this.params("EntityMutationItem","entity_key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE"&&type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		this.tf(this.EntityMutationOptions)(options);
		this.tf(this.EntityMutationPayload)(payload);
	}
	/** @arg {EntityMutationPayload} x */
	EntityMutationPayload(x) {
		if("subscriptionStateEntity" in x) return;
		if("transcriptTrackSelectionEntity" in x) return;
		if("transcriptSearchBoxStateEntity" in x) return;
		if("offlineabilityEntity" in x) return;
		if("playlistLoopStateEntity" in x) return;
		if("macroMarkersListEntity" in x) return;
		debugger;
	}
	/** @arg {EntityMutationOptions} x */
	EntityMutationOptions(x) {
		const cf="EntityMutationOptions";
		this.save_keys(`[${cf}]`,x);
		const {persistenceOption,...y}=x; this.g(y); // ! #destructure
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @arg {GuideEntryData} x */
	GuideEntryData(x) {
		const cf="GuideEntryData";
		this.save_keys(`[${cf}]`,x);
		const {guideEntryData,...y}=x; this.g(y); // ! #destructure
		this.GuideEntryDataContent(guideEntryData);
	}
	/** @arg {GuideEntryDataContent} x */
	GuideEntryDataContent(x) {
		const cf="GuideEntryDataContent";
		this.save_keys(`[${cf}]`,x);
		const {guideEntryId,...y}=x; this.g(y); // ! #destructure
		if(this.str_starts_with(guideEntryId,"RD")) {
			console.log("[guideEntryId.RD.length]",guideEntryId.length,guideEntryId);
		} else if(this.str_starts_with(guideEntryId,"UC")) {
			if(guideEntryId.length===24) return;
			console.log("[guideEntryId.UC.length]",guideEntryId.length,guideEntryId);
		} else {
			debugger;
		}
	}
	/** @arg {FeedTabbedHeaderData} x */
	FeedTabbedHeaderData(x) {
		const cf="FeedTabbedHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {title,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(title);
	}
	/** @arg {DesktopTopbarData} x */
	DesktopTopbarData(x) {
		const cf="DesktopTopbarData";
		this.save_keys(`[${cf}]`,x);
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=x; this.g(y); // ! #destructure
		this.TopbarLogoRenderer(logo);
		this.FusionSearchboxRenderer(searchbox);
		this.trackingParams(cf,trackingParams);
		if(countryCode!=="CA") debugger;
		this.z(topbarButtons,this.TopbarButtonItem);
		this.HotkeyDialogRenderer(hotkeyDialog);
		this.R$ButtonRenderer(backButton);
		this.R$ButtonRenderer(forwardButton);
		this.R$ButtonRenderer(a11ySkipNavigationButton);
		this.R$ButtonRenderer(voiceSearchButton);
	}
	/** @arg {TopbarButtonItem} x */
	TopbarButtonItem(x) {
		const cf="TopbarButtonItem";
		this.save_keys(`[${cf}]`,x);
		if("topbarMenuButtonRenderer" in x) {
			return this.TopbarMenuButtonRenderer(x);
		} else if("notificationTopbarButtonRenderer" in x) {
			return this.NotificationTopbarButtonRenderer(x);
		}
	}
	/** @arg {NotificationTopbarButtonRenderer} x */
	NotificationTopbarButtonRenderer(x) {
		const cf="NotificationTopbarButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {notificationTopbarButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.NotificationTopbarButtonData(notificationTopbarButtonRenderer);
	}
	/** @arg {TopbarLogoRenderer} x */
	TopbarLogoRenderer(x) {
		const cf="TopbarLogoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {topbarLogoRenderer,...y}=x; this.g(y); // ! #destructure
		this.TopbarLogo(topbarLogoRenderer);
	}
	/** @arg {FusionSearchboxRenderer} x */
	FusionSearchboxRenderer(x) {
		const cf="FusionSearchboxRenderer";
		this.save_keys(`[${cf}]`,x);
		const {fusionSearchboxRenderer,...y}=x; this.g(y); // ! #destructure
		this.FusionSearchboxData(fusionSearchboxRenderer);
	}
	/** @arg {TopbarMenuButtonRenderer} x */
	TopbarMenuButtonRenderer(x) {
		const cf="TopbarMenuButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {topbarMenuButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.TopbarMenuButton(topbarMenuButtonRenderer);
	}
	/** @arg {Extract<TopbarMenuButton,{menuRequest:any}>['menuRequest']} x */
	TopbarMenu_menuRequest(x) {
		if("signalServiceEndpoint" in x) {
			this.E$SignalServiceEndpoint(x);
		} else {
			debugger;
		}
	}
	/** @arg {TopbarMenuButton} x */
	TopbarMenuButton(x) {
		const cf="TopbarMenuButton";
		this.save_keys(`[${cf}]`,x);
		if("menuRequest" in x) {
			const {trackingParams,accessibility,tooltip,avatar,menuRequest,...y}=x; this.g(y); // ! #destructure
			this.trackingParams(cf,trackingParams);
			this.A$Accessibility(accessibility);
			this.primitive_of_string(tooltip);
			this.Thumbnail(avatar);
			this.TopbarMenu_menuRequest(menuRequest);
		} else if("menuRenderer" in x) {
			const {trackingParams,accessibility,tooltip,icon,menuRenderer,style,...y}=x; this.g(y); // ! #destructure
			this.trackingParams(cf,trackingParams);
			this.A$Accessibility(accessibility);
			this.primitive_of_string(tooltip);
			this.Icon(icon);
			this.MultiPageMenuRenderer(menuRenderer);
			switch(style) {
				default: debugger; break;
				case "STYLE_DEFAULT": break;
			}
		} else {
			debugger;
		}
	}
	/** @arg {D$TwoColumnBrowseResults} x */
	TwoColumnBrowseResultsData(x) {
		const cf="TwoColumnBrowseResultsData";
		this.save_keys(`[${cf}]`,x);
		const {tabs,secondaryContents,...y}=x; this.g(y); // ! #destructure
		this.z(tabs,this.ResultRenderer);
		this.t(secondaryContents,this.SecondaryContents);
	}
	/** @arg {G$ResultRenderer} x */
	ResultRenderer(x) {
		const cf="ResultRenderer";
		this.save_keys(`[${cf}]`,x);
		if("tabRenderer" in x) return this.TabRenderer(x);
		if("expandableTabRenderer" in x) return this.ExpandableTabRenderer(x);
		debugger;
	}
	/** @arg {StructuredDescriptionContentItem} x */
	StructuredDescriptionContentItem(x) {
		const cf="StructuredDescriptionContentItem";
		this.save_keys(`[${cf}]`,x);
		if("videoDescriptionHeaderRenderer" in x) {
			this.VideoDescriptionHeaderRenderer(x);
		} else if("expandableVideoDescriptionBodyRenderer" in x) {
			this.ExpandableVideoDescriptionBodyRenderer(x);
		} else if("videoDescriptionMusicSectionRenderer" in x) {
			this.VideoDescriptionMusicSectionRenderer(x);
		} else if("horizontalCardListRenderer" in x) {
			this.HorizontalCardListRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {TM$Visibility} x */
	Visibility(x) {
		const cf="Visibility";
		this.save_keys(`[${cf}]`,x);
		const {types,...y}=x; this.g(y); // ! #destructure
		switch(types) {
			default: console.log("[Visibility.types]",types); debugger; break;
			case "12": break;
			case "15": break;
		}
	}
	/** @arg {CommentsSectionContinuationAction} x */
	CommentsSectionContinuationAction(x) {
		const cf="CommentsSectionContinuationAction";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.CommentsSectionItem);
	}
	/** @arg {BrowseFeedAction} x */
	BrowseFeedAction(x) {
		const cf="BrowseFeedAction";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.BrowseFeedItem);
	}
	/** @arg {WatchNextContinuationAction} x */
	WatchNextContinuationAction(x) {
		const cf="WatchNextContinuationAction";
		this.save_keys(`[${cf}]`,x);
		const {targetId,continuationItems,...y}=x; this.g(y); // ! #destructure
		this.targetId(cf,targetId);
		this.z(continuationItems,this.WatchNextItem);
	}
	/** @arg {CommentsSectionItem} x */
	CommentsSectionItem(x) {
		const cf="CommentsSectionItem";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {BrowseFeedItem} x */
	BrowseFeedItem(x) {
		const cf="BrowseFeedItem";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {ReelResponse} x */
	ReelResponse(x) {
		const cf="ReelResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=x; this.g(y); // ! #destructure
		this.ReelPlayerOverlayRenderer(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.DesktopTopbarRenderer(desktopTopbar);
		if(!engagementPanels) debugger;
		else {
			this.z(engagementPanels,this.EngagementPanelSectionListRenderer);
		}
	}
	/** @arg {Extract<ReelPlayerOverlayData,{reelPlayerNavigationModel:any}>} x */
	PlayerOverlayWithNavigationModel(x) {
		const cf="PlayerOverlayWithNavigationModel";
		this.save_keys(`[${cf}]`,x);
		const {style,trackingParams,reelPlayerNavigationModel,...y}=x; this.g(y); // ! #destructure
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.trackingParams(cf,trackingParams);
		if(reelPlayerNavigationModel!=="REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED") debugger;
	}
	/** @arg {ReelPlayerOverlayData} x */
	ReelPlayerOverlayData(x) {
		const cf="ReelPlayerOverlayData";
		this.save_keys(`[${cf}]`,x);
		if("reelPlayerNavigationModel" in x) {
			return this.PlayerOverlayWithNavigationModel(x);
		} else if("reelPlayerHeaderSupportedRenderers" in x) {
			return this.PlayerOverlayWithSupportedRenderers(x);
		} else {
			debugger;
		}
	}
	/** @arg {G$SecondaryContents} x */
	SecondaryContents(x) {
		const cf="SecondaryContents";
		this.save_keys(`[${cf}]`,x);
		if("profileColumnRenderer" in x) return this.ProfileColumnRenderer(x);
		if("browseFeedActionsRenderer" in x) return this.BrowseFeedActionsRenderer(x);
		debugger;
	}
	/** @arg {R$ProfileColumnRenderer} x */
	ProfileColumnRenderer(x) {
		const cf="ProfileColumnRenderer";
		this.save_keys(`[${cf}]`,x);
		const {profileColumnRenderer,...y}=x; this.g(y); // ! #destructure
		this.ProfileColumnData(profileColumnRenderer);
	}
	/** @arg {ProfileColumnData} x */
	ProfileColumnData(x) {
		const cf="ProfileColumnData";
		this.save_keys(`[${cf}]`,x);
		const {items,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.ProfileColumnItem);
	}
	/** @arg {ProfileColumnItem} x */
	ProfileColumnItem(x) {
		if("profileColumnUserInfoRenderer" in x) return this.ProfileColumnUserInfoRenderer(x);
		if("profileColumnStatsRenderer" in x) return this.ProfileColumnStatsRenderer(x);
		debugger;
	}
	/** @arg {ProfileColumnUserInfoRenderer} x */
	ProfileColumnUserInfoRenderer(x) {
		const cf="ProfileColumnUserInfoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {profileColumnUserInfoRenderer,...y}=x; this.g(y); // ! #destructure
		this.ProfileColumnUserInfoData(profileColumnUserInfoRenderer);
	}
	/** @arg {ProfileColumnStatsRenderer} x */
	ProfileColumnStatsRenderer(x) {
		const cf="ProfileColumnStatsRenderer";
		this.save_keys(`[${cf}]`,x);
		const {profileColumnStatsRenderer,...y}=x; this.g(y); // ! #destructure
		this.ProfileColumnStatsData(profileColumnStatsRenderer);
	}
	/** @arg {ProfileColumnStatsData} x */
	ProfileColumnStatsData(x) {
		this.ItemsTemplate(x,this.ProfileColumnStatsEntryRenderer);
	}
	/** @arg {ProfileColumnStatsEntryRenderer} x */
	ProfileColumnStatsEntryRenderer(x) {
		const {profileColumnStatsEntryRenderer,...y}=x; this.g(y); // ! #destructure
		this.ProfileColumnStatsEntryData(profileColumnStatsEntryRenderer);
	}
	/** @arg {ProfileColumnStatsEntryData} x */
	ProfileColumnStatsEntryData(x) {
		const {label,value,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(label);
		this.D$SimpleText(value);
	}
	/** @arg {WatchNextItem} x */
	WatchNextItem(x) {
		const cf="WatchNextItem";
		this.save_keys(`[${cf}]`,x);
		if("continuationItemRenderer" in x) return this.ContinuationItemRenderer(x);
		if("compactVideoRenderer" in x) return this.CompactVideoRenderer(x);
		debugger;
	}
	/** @arg {PlaylistPanelContinuationData} x */
	PlaylistPanelContinuationData(x) {
		const cf="PlaylistPanelContinuationData";
		this.save_keys(`[${cf}]`,x);
		const {...y}=x; this.g(y);
	}
	/** @arg {AdsEngagementPanelContentData} x */
	AdsEngagementPanelContentData(x) {
		const cf="AdsEngagementPanelContentData";
		this.save_keys(`[${cf}]`,x);
		const {hack,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(hack,"boolean");
	}
	/** @arg {StructuredDescriptionContentData} x */
	StructuredDescriptionContentData(x) {
		const cf="StructuredDescriptionContentData";
		this.save_keys(`[${cf}]`,x);
		const {items,...y}=x; this.g(y); // ! #destructure
		this.z(items,this.StructuredDescriptionContentItem);
	}
	/** @arg {ProfileColumnUserInfoData} x */
	ProfileColumnUserInfoData(x) {
		const cf="ProfileColumnUserInfoData";
		this.save_keys(`[${cf}]`,x);
		const {title,thumbnail,...y}=x; this.g(y); // ! #destructure
		this.D$SimpleText(title);
		this.Thumbnail(thumbnail);
	}
	/** @arg {ChipCloudChipRenderer} x */
	ChipCloudChipRenderer(x) {
		const cf="ChipCloudChipRenderer";
		this.save_keys(`[${cf}]`,x);
		const {chipCloudChipRenderer,...y}=x; this.g(y); // ! #destructure
		this.ChipCloudChip(chipCloudChipRenderer);
	}
	/** @arg {E$ShareEntityServiceEndpoint} x */
	ShareEntityServiceEndpoint(x) {
		const cf="ShareEntityServiceEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,shareEntityServiceEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.ShareEntityServiceArgs(shareEntityServiceEndpoint);
	}
	/** @arg {E$ShareEntityService} x */
	ShareEntityServiceArgs(x) {
		const cf="ShareEntityServiceArgs";
		this.save_keys(`[${cf}]`,x);
		const {serializedShareEntity,commands,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(serializedShareEntity);
		this.z(commands,this.A$OpenPopupAction);
	}
	/** @arg {E$SignalNavigation} x */
	SignalNavigationArgs(x) {
		const cf="SignalNavigationArgs";
		this.save_keys(`[${cf}]`,x);
		const {signal,...y}=x; this.g(y); // ! #destructure
		this.save_string(`[Signal.signal]`,signal);
		switch(signal) {
			default: console.log("[new.Signal.signal]",signal); break;
			case "CHANNEL_SWITCHER": break;
			case "LIVE_CONTROL_ROOM": break;
		}
	}
	/** @arg {ButtonCommand} x */
	ButtonCommand(x) {
		const cf="ButtonCommand";
		this.save_keys(`[${cf}]`,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.ChangeEngagementPanelVisibilityAction(x);
		if("continuationCommand" in x) return this.ContinuationCommand(x);
		if("openPopupAction" in x) return this.A$OpenPopupAction(x);
		if("signalServiceEndpoint" in x) return this.E$SignalServiceEndpoint(x);
		if("urlEndpoint" in x) return this.E$UrlEndpoint(x);
		if("commandExecutorCommand" in x) return this.CommandExecutorCommand(x);
		if("createBackstagePostEndpoint" in x) {
			this.EndpointTemplate(cf,x,a => {
				this.params("","createBackstagePost.param",this.w(a).createBackstagePostParams);
			});
			return;
		}
		debugger;
	}
	/** @arg {EngagementPanelMenu} x */
	EngagementPanelMenu(x) {
		const cf="EngagementPanelMenu";
		this.save_keys(`[${cf}]`,x);
		if("menuRenderer" in x) return this.MenuRenderer(x);
		if("sortFilterSubMenuRenderer" in x) return this.SortFilterSubMenuRenderer(x);
		debugger;
	}
	/** @arg {EngagementPanelTitleHeader} x */
	EngagementPanelTitleHeader(x) {
		const cf="EngagementPanelTitleHeader";
		this.save_keys(`[${cf}]`,x);
		const {title,menu,contextualInfo,informationButton,visibilityButton,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.t(title,this.TextT);
		this.t(menu,this.EngagementPanelMenu);
		this.t(contextualInfo,this.D$TextWithRuns);
		this.t(informationButton,this.R$ButtonRenderer);
		this.R$ButtonRenderer(visibilityButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {CommandExecutorCommand} x */
	CommandExecutorCommand(x) {
		const cf="CommandExecutorCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandExecutorCommand,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.CommandExecutorData(commandExecutorCommand);
	}
	/** @arg {CommandExecutorData} x */
	CommandExecutorData(x) {
		this.CommandsTemplate(x,this.CommandExecutorAction);
	}
	/** @arg {CommandExecutorAction} x */
	CommandExecutorAction(x) {
		if("changeEngagementPanelVisibilityAction" in x) return this.ChangeEngagementPanelVisibilityAction(x);
		if("scrollToEngagementPanelCommand" in x) return this.ScrollToEngagementPanelCommand(x);
		if("openPopupAction" in x) return this.A$OpenPopupAction(x);
		if("hideEngagementPanelScrimAction" in x) return this.HideEngagementPanelScrimAction(x);
		if("loopCommand" in x) return;
		if("updateToggleButtonStateCommand" in x) return;
		if("changeMarkersVisibilityCommand" in x) return;
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) return;
		debugger;
	}
	/** @arg {HideEngagementPanelScrimAction} x */
	HideEngagementPanelScrimAction(x) {
		const cf="HideEngagementPanelScrimAction";
		const {clickTrackingParams,hideEngagementPanelScrimAction,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.HideEngagementPanelScrimAction_1(hideEngagementPanelScrimAction);
	}
	/** @arg {HideEngagementPanelScrimAction['hideEngagementPanelScrimAction']} x */
	HideEngagementPanelScrimAction_1(x) {
		const {engagementPanelTargetId,...y}=x; this.g(y); // ! #destructure
		switch(engagementPanelTargetId) {
			default: debugger; break;
			case "engagement-panel-clip-create": break;
		}
	}
	/** @arg {PlayerAnnotationsExpandedData} x */
	PlayerAnnotationsExpandedData(x) {
		const cf="PlayerAnnotationsExpandedData";
		this.save_keys(`[${cf}]`,x);
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=x; this.g(y); // ! #destructure
		this.FeaturedChannel(featuredChannel);
		this.primitive_of(allowSwipeDismiss,"boolean");
		this.primitive_of_string(annotationId);
	}
	/** @arg {FeaturedChannel} x */
	FeaturedChannel(x) {
		const cf="TopbarLogo";
		this.save_keys(`[${cf}]`,x);
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(startTimeMs);
		this.primitive_of_string(endTimeMs);
		this.Thumbnail(watermark);
		this.trackingParams(cf,trackingParams);
		this.E$BrowseEndpoint(navigationEndpoint);
		this.primitive_of_string(channelName);
		this.SubscribeButtonRenderer(subscribeButton);
	}
	/** @arg {TopbarLogo} x */
	TopbarLogo(x) {
		const cf="TopbarLogo";
		this.save_keys(`[${cf}]`,x);
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=x; this.g(y); // ! #destructure
		this.Icon(iconImage);
		this.D$TextWithRuns(tooltipText);
		this.E$BrowseEndpoint(endpoint);
		this.trackingParams(cf,trackingParams);
		this.primitive_of_string(overrideEntityKey);
	}
	/** @template {VideoOwnerData} T @arg {T} x */
	VideoOwner$Omit(x) {
		const cf="VideoOwnerData";
		const {thumbnail,title,subscriptionButton,navigationEndpoint,subscriberCountText,trackingParams,...y}=x;
		this.Thumbnail(thumbnail);
		this.D$TextWithRuns(title);
		this.t(subscriptionButton,this.SubscriptionButton);
		this.E$BrowseEndpoint(navigationEndpoint);
		this.t(subscriberCountText,this.D$SimpleText);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @arg {VideoOwnerData} x */
	VideoOwnerData(x) {
		const cf="VideoOwnerData";
		this.save_keys(`[${cf}]`,x);
		if("badges" in x) {
			let u=this.VideoOwner$Omit(x);
			const {badges,membershipButton,...y}=u; this.g(y); // ! #destructure
			this.z(badges,this.MetadataBadgeRenderer);
			this.R$ButtonRenderer(membershipButton);
			return;
		}
		let u=this.VideoOwner$Omit(x);
		const {membershipButton,...y}=u; this.g(y); // ! #destructure
		this.R$ButtonRenderer(membershipButton);
	}
	/** @arg {D$SubscriptionButton} x */
	SubscriptionButton(x) {
		const cf="SubscriptionButton";
		this.save_keys(`[${cf}]`,x);
		const {type,subscribed,...y}=x; this.g(y); // ! #destructure
		if(type!=="FREE") debugger;
		this.t(subscribed,a => this.primitive_of(a,"boolean"));
	}
	/** @arg {AddToPlaylistRenderer} x */
	AddToPlaylistRenderer(x) {
		const cf="AddToPlaylistRenderer";
		this.save_keys(`[${cf}]`,x);
		const {addToPlaylistRenderer,...y}=x; this.g(y); // ! #destructure
		this.AddToPlaylist(addToPlaylistRenderer);
	}
	/** @arg {AddToPlaylist} x */
	AddToPlaylist(x) {
		const cf="AddToPlaylist";
		this.save_keys(`[${cf}]`,x);
		const {playlists,actions,...y}=x; this.g(y); // ! #destructure
		this.z(playlists,this.PlaylistAddToOptionRenderer);
		this.z(actions,this.AddToPlaylistCreateRenderer);
	}
	/** @arg {PlaylistAddToOptionRenderer} x */
	PlaylistAddToOptionRenderer(x) {
		const cf="PlaylistAddToOptionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playlistAddToOptionRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlaylistAddToOption(playlistAddToOptionRenderer);
	}
	/** @arg {AddToPlaylistCreateRenderer} x */
	AddToPlaylistCreateRenderer(x) {
		const cf="AddToPlaylistCreateRenderer";
		this.save_keys(`[${cf}]`,x);
		const {addToPlaylistCreateRenderer,...y}=x; this.g(y); // ! #destructure
		this.AddToPlaylistCreate(addToPlaylistCreateRenderer);
	}
	/** @arg {PlaylistAddToOption} x */
	PlaylistAddToOption(x) {
		const cf="PlaylistAddToOption";
		this.save_keys(`[${cf}]`,x);
		const {playlistId,title,privacy,containsSelectedVideos,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,trackingParams}=x; //,...y}=x; this.g(y); // ! #destructure
		this.playlistId(playlistId);
		this.D$SimpleText(title);
		switch(privacy) {
			default: debugger; break;
			case "PRIVATE": break;
			case "PUBLIC": break;
			case "UNLISTED": break;
		}
		if(containsSelectedVideos!=="NONE") debugger;
		this.Icon(privacyIcon);
		this.E$PlaylistEditEndpoint(addToPlaylistServiceEndpoint);
		this.E$PlaylistEditEndpoint(removeFromPlaylistServiceEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {AddToPlaylistCreate} x */
	AddToPlaylistCreate(x) {
		const cf="AddToPlaylistCreate";
		this.save_keys(`[${cf}]`,x);
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=x; this.g(y); // ! #destructure
		this.CompactLinkRenderer(openCreateLink);
		this.TextInputFormFieldRenderer(nameInput);
		this.DropdownRenderer(privacyInput);
		this.R$ButtonRenderer(createAction);
		this.CreatePlaylistServiceEndpoint(serviceEndpoint);
	}
	/** @arg {TextInputFormFieldRenderer} x */
	TextInputFormFieldRenderer(x) {
		const cf="TextInputFormFieldRenderer";
		this.save_keys(`[${cf}]`,x);
		const {textInputFormFieldRenderer,...y}=x; this.g(y); // ! #destructure
		this.TextInputFormField(textInputFormFieldRenderer);
	}
	/** @arg {TextInputFormField} x */
	TextInputFormField(x) {
		const cf="TextInputFormField";
		this.save_keys(`[${cf}]`,x);
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(label);
		if(maxCharacterLimit!==150) debugger;
		this.primitive_of_string(placeholderText);
		if(validValueRegexp!=="[^<>]*") debugger;
		this.D$TextWithRuns(invalidValueErrorMessage);
		if(required!==true) debugger;
	}
	/** @arg {GuideCollapsibleEntry} x */
	GuideCollapsibleEntry(x) {
		const cf="GuideCollapsibleEntry";
		this.save_keys(`[${cf}]`,x);
		const {expanderItem,expandableItems,collapserItem,...y}=x; this.g(y); // ! #destructure
		this.GuideEntryRenderer(expanderItem);
		this.z(expandableItems,this.GuideEntryRenderer);
		this.GuideEntryRenderer(collapserItem);
	}
	/** @arg {MerchandiseShelfRenderer} x */
	MerchandiseShelfRenderer(x) {
		const cf="MerchandiseShelfRenderer";
		this.save_keys(`[${cf}]`,x);
		const {merchandiseShelfRenderer,...y}=x; this.g(y); // ! #destructure
		this.MerchandiseShelf(merchandiseShelfRenderer);
	}
	/** @arg {VideoPrimaryInfoRenderer} x */
	VideoPrimaryInfoRenderer(x) {
		const cf="VideoPrimaryInfoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {videoPrimaryInfoRenderer,...y}=x; this.g(y); // ! #destructure
		this.VideoPrimaryInfoData(videoPrimaryInfoRenderer);
	}
	/** @arg {VideoSecondaryInfoRenderer} x */
	VideoSecondaryInfoRenderer(x) {
		const cf="VideoSecondaryInfoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {videoSecondaryInfoRenderer,...y}=x; this.g(y); // ! #destructure
		this.VideoSecondaryInfoData(videoSecondaryInfoRenderer);
	}
	/** @arg {MultiMarkersPlayerBarRenderer} x */
	MultiMarkersPlayerBarRenderer(x) {
		const cf="MultiMarkersPlayerBarRenderer";
		this.save_keys(`[${cf}]`,x);
		const {multiMarkersPlayerBarRenderer,...y}=x; this.g(y); // ! #destructure
		this.MultiMarkersPlayerBar(multiMarkersPlayerBarRenderer);
	}
	/** @arg {AdSlotAndLayoutMetadataItem} x */
	AdSlotAndLayoutMetadataItem(x) {
		const cf="AdSlotAndLayoutMetadataItem";
		this.save_keys(`[${cf}]`,x);
		const {adLayoutMetadata,adSlotMetadata,...y}=x; this.g(y); // ! #destructure
		this.z(adLayoutMetadata,this.AdLayoutMetadataItem);
		this.AdSlotMetadata(adSlotMetadata);
	}
	/** @arg {AdSlotMetadata} x */
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
	/** @arg {R$MacroMarkersListRenderer} x */
	MacroMarkersListRenderer(x) {
		const cf="MacroMarkersListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {macroMarkersListRenderer,...y}=x; this.g(y); // ! #destructure
		this.MacroMarkersList(macroMarkersListRenderer);
	}
	/** @arg {MacroMarkersList} x */
	MacroMarkersList(x) {
		const cf="MacroMarkersList";
		this.save_keys(`[${cf}]`,x);
		const {contents,syncButtonLabel,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.MacroMarkersListItemRenderer);
		this.D$TextWithRuns(syncButtonLabel);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {R$ProductList} x */
	ProductListRenderer(x) {
		const cf="ProductListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {productListRenderer,...y}=x; this.g(y); // ! #destructure
		this.ProductList(productListRenderer);
	}
	/** @arg {ProductList} x */
	ProductList(x) {
		const cf="ProductList";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.ProductListItemRenderer);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {VideoDescriptionHeaderRenderer} x */
	VideoDescriptionHeaderRenderer(x) {
		const cf="VideoDescriptionHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {videoDescriptionHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.VideoDescriptionHeaderData(videoDescriptionHeaderRenderer);
	}
	/** @arg {VideoDescriptionHeaderData} x */
	VideoDescriptionHeaderData(x) {
		const cf="VideoDescriptionHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {title,channel,views,publishDate,factoid,channelNavigationEndpoint,channelThumbnail,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(title);
		this.D$SimpleText(channel);
		this.D$SimpleText(views);
		this.D$SimpleText(publishDate);
		this.z(factoid,this.FactoidRenderer);
		this.E$BrowseEndpoint(channelNavigationEndpoint);
		this.Thumbnail(channelThumbnail);
	}
	/** @arg {ExpandableVideoDescriptionBodyRenderer} x */
	ExpandableVideoDescriptionBodyRenderer(x) {
		const cf="ExpandableVideoDescriptionBodyRenderer";
		this.save_keys(`[${cf}]`,x);
		const {expandableVideoDescriptionBodyRenderer,...y}=x; this.g(y); // ! #destructure
		this.ExpandableVideoDescriptionBodyData(expandableVideoDescriptionBodyRenderer);
	}
	/** @arg {ExpandableVideoDescriptionBodyData} x */
	ExpandableVideoDescriptionBodyData(x) {
		const cf="ExpandableVideoDescriptionBodyData";
		this.save_keys(`[${cf}]`,x);
		const {descriptionBodyText,showMoreText,showLessText,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(descriptionBodyText);
		this.D$SimpleText(showMoreText);
		this.D$SimpleText(showLessText);
	}
	/** @arg {VideoDescriptionMusicSectionRenderer} x */
	VideoDescriptionMusicSectionRenderer(x) {
		const cf="VideoDescriptionMusicSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {videoDescriptionMusicSectionRenderer,...y}=x; this.g(y); // ! #destructure
		this.VideoDescriptionMusicSectionData(videoDescriptionMusicSectionRenderer);
	}
	/** @arg {VideoDescriptionMusicSectionData} x */
	VideoDescriptionMusicSectionData(x) {
		const cf="VideoDescriptionMusicSectionData";
		this.save_keys(`[${cf}]`,x);
		const {sectionTitle,carouselLockups,topicLink,premiumUpsellLink,...y}=x; this.g(y); // ! #destructure
		this.D$SimpleText(sectionTitle);
		this.z(carouselLockups,this.CarouselLockupRenderer);
		this.TopicLinkRenderer(topicLink);
		this.D$TextWithRuns(premiumUpsellLink);
	}
	/** @arg {HorizontalCardListRenderer} x */
	HorizontalCardListRenderer(x) {
		const cf="HorizontalCardListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {horizontalCardListRenderer,...y}=x; this.g(y); // ! #destructure
		this.HorizontalCardList(horizontalCardListRenderer);
	}
	/** @arg {HorizontalCardList} x */
	HorizontalCardList(x) {
		const cf="HorizontalCardList";
		this.save_keys(`[${cf}]`,x);
		const {cards,trackingParams,header,style,centerItems,...y}=x; this.g(y); // ! #destructure
		this.z(cards,this.MacroMarkersListItemRenderer);
		this.trackingParams(cf,trackingParams);
		this.RichListHeaderRenderer(header);
		if(style.type!=="HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION") debugger;
		if(centerItems!==false) debugger;
	}
	/** @arg {HorizontalCardList['header']} x */
	RichListHeaderRenderer(x) {
		const cf="RichListHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {richListHeaderRenderer: u,...y}=x; this.g(y); // ! #destructure
		const {title,trackingParams,navigationButton,...z}=u; this.g(z);
		this.D$SimpleText(title);
		this.trackingParams(cf,trackingParams);
		this.R$ButtonRenderer(navigationButton);
	}
	/** @arg {R$CompactVideoRenderer} x */
	CompactVideoRenderer(x) {
		const cf="CompactVideoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {compactVideoRenderer,...y}=x; this.g(y); // ! #destructure
		this.CompactVideoData(compactVideoRenderer);
	}
	/** @arg {FusionSearchboxData} x */
	FusionSearchboxData(x) {
		const cf="FusionSearchboxData";
		this.save_keys(`[${cf}]`,x);
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=x; this.g(y); // ! #destructure
		this.Icon(icon);
		this.D$TextWithRuns(placeholderText);
		this.SearchboxConfig(config);
		this.trackingParams(cf,trackingParams);
		this.E$SearchEndpoint(searchEndpoint);
		this.R$ButtonRenderer(clearButton);
	}
	/** @arg {NotificationTopbarButtonData} x */
	NotificationTopbarButtonData(x) {
		const cf="NotificationTopbarButtonData";
		this.save_keys(`[${cf}]`,x);
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=x; this.g(y); // ! #destructure
		this.Icon(icon);
		this.E$SignalServiceEndpoint(menuRequest);
		if(style!=="NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT") debugger;
		this.trackingParams(cf,trackingParams);
		this.A$Accessibility(accessibility);
		this.primitive_of_string(tooltip);
		this.E$SignalServiceEndpoint(updateUnseenCountEndpoint);
		this.primitive_of(notificationCount,"number");
		if(!this.eq_keys(handlerDatas,["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"])) {
			debugger;
		};
	}
	/** @arg {HotkeyDialogRenderer} x */
	HotkeyDialogRenderer(x) {
		const cf="HotkeyDialogRenderer";
		this.save_keys(`[${cf}]`,x);
		const {hotkeyDialogRenderer,...y}=x; this.g(y); // ! #destructure
		this.HotkeyDialog(hotkeyDialogRenderer);
	}
	/** @arg {ChangeEngagementPanelVisibilityActionData} x */
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
	/** @arg {ShowEngagementPanelScrimActionData} x */
	ShowEngagementPanelScrimActionData(x) {
		const cf="ShowEngagementPanelScrimActionData";
		this.save_keys(`[${cf}]`,x);
		const {engagementPanelTargetId,onClickCommands,...y}=x; this.g(y); // ! #destructure
		if(engagementPanelTargetId!=="engagement-panel-clip-create") debugger;
		this.z(onClickCommands,this.A$OpenPopupAction);
	}
	/** @arg {UpdateEngagementPanelData} x */
	UpdateEngagementPanelData(x) {
		const cf="UpdateEngagementPanelData";
		this.save_keys(`[${cf}]`,x);
		const {content,targetId,...y}=x; this.g(y); // ! #destructure
		this.TranscriptRenderer(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @arg {A$AccountItem} x */
	AccountItem(x) {
		const cf="AccountItem";
		this.save_keys(`[${cf}]`,x);
		const {accountItem,...y}=x; this.g(y); // ! #destructure
		this.AccountItemData(accountItem);
	}
	/** @arg {UiActions} x */
	UiActions(x) {
		const cf="UiActions";
		this.save_keys(`[${cf}]`,x);
		const {hideEnclosingContainer,...y}=x; this.g(y); // ! #destructure
		this.primitive_of(hideEnclosingContainer,"boolean");
	}
	/** @arg {SortFilterSubMenuData} x */
	SortFilterSubMenuData(x) {
		const cf="SortFilterSubMenuData";
		this.save_keys(`[${cf}]`,x);
		const {subMenuItems,title,icon,accessibility,tooltip,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.z(subMenuItems,this.ActionSetPlaylistVideoOrder);
		this.t(title,this.primitive_of_string);
		this.t(icon,this.Icon);
		this.t(accessibility,this.A$Accessibility);
		this.t(tooltip,this.primitive_of_string);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {ActionSetPlaylistVideoOrder} x */
	ActionSetPlaylistVideoOrder(x) {
		const cf="ActionSetPlaylistVideoOrder";
		this.save_keys(`[${cf}]`,x);
		const {title,selected,serviceEndpoint,accessibility,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(title);
		this.primitive_of(selected,"boolean");
		this.ContinuationCommand(serviceEndpoint);
		this.t(accessibility,this.A$Accessibility);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {GetMultiPageMenuActionData} x */
	GetMultiPageMenuActionData(x) {
		const cf="GetMultiPageMenuActionData";
		this.save_keys(`[${cf}]`,x);
		const {menu,...y}=x; this.g(y); // ! #destructure
		this.MultiPageMenuRenderer(menu);
	}
	/** @arg {EmojiPickerRenderer} x */
	EmojiPickerRenderer(x) {
		const cf="EmojiPickerRenderer";
		this.save_keys(`[${cf}]`,x);
		const {emojiPickerRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(emojiPickerRenderer);
	}
	/** @arg {ChannelResponse} x */
	ChannelResponse(x) {
		const cf="ChannelResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,...y}=x; this.g(y); // ! #destructure
		this.TwoColumnBrowseResultsRenderer(contents);
		this.C4TabbedHeaderRenderer(header);
		this.ChannelMetadataRenderer(metadata);
		this.DesktopTopbarRenderer(topbar);
		this.trackingParams(cf,trackingParams);
		this.MicroformatDataRenderer(microformat);
		this.z(onResponseReceivedActions,this.ResetChannelUnreadCountCommand);
	}
	/** @arg {PlaylistResponse} x */
	Api_PlaylistResponse(x) {
		const cf="PlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=x; this.g(y); // ! #destructure
		this.TwoColumnBrowseResultsRenderer(contents);
		this.PlaylistHeaderRenderer(header);
		this.t(alerts,a => this.Response_alerts(cf,a));
		this.PlaylistMetadataRenderer(metadata);
		this.DesktopTopbarRenderer(topbar);
		this.trackingParams(cf,trackingParams);
		this.MicroformatDataRenderer(microformat);
		this.PlaylistSidebarRenderer(sidebar);
	}
	/** @arg {string} cf @arg {NonNullable<PlaylistResponse['alerts']>} x */
	Response_alerts(cf,x) {
		this.z(x,x => {
			if("alertWithButtonRenderer" in x) return this.AlertWithButtonRenderer(x);
			this.do_codegen(`${cf}$alerts$iterate`,x);
		});
	}
	/** @arg {SettingsResponse} x */
	SettingsResponse(x) {
		const cf="SettingsResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=x; this.g(y); // ! #destructure
		this.TwoColumnBrowseResultsRenderer(contents);
		this.DesktopTopbarRenderer(topbar);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.SettingsSidebarRenderer(sidebar);
	}
	/** @arg {D$C4TabbedHeader} x */
	C4TabbedHeaderData(x) {
		const cf="C4TabbedHeaderData";
		this.save_keys(`[${cf}]`,x);
		const {channelId,title,subscribeButton,trackingParams,sponsorButton,navigationEndpoint,avatar,badges,banner,headerLinks,subscriberCountText,tvBanner,mobileBanner,channelHandleText,videosCountText,...y}=x; this.g(y); // ! #destructure
		this.parser.parse_channel_id(channelId);
		this.primitive_of_string(title);
		this.SubscribeButtonRenderer(subscribeButton);
		this.trackingParams(cf,trackingParams);
		this.t(sponsorButton,this.R$ButtonRenderer);
		this.E$BrowseEndpoint(navigationEndpoint);
		this.Thumbnail(avatar);
		this.Thumbnail(banner);
		this.Thumbnail(tvBanner);
		this.Thumbnail(mobileBanner);
		this.ChannelHeaderLinksRenderer(headerLinks);
		this.D$SimpleText(subscriberCountText);
		this.D$TextWithRuns(channelHandleText);
		this.D$TextWithRuns(videosCountText);
		this.tz(badges,(this.MetadataBadgeRenderer));
	}
	/** @arg {SettingsSidebarData} x */
	SettingsSidebarData(x) {
		const cf="SettingsSidebarData";
		this.save_keys(`[${cf}]`,x);
		const {title,items,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(title);
		this.z(items,this.CompactLinkRenderer);
	}
	/** @arg {R$ExpandableTab} x */
	ExpandableTabRenderer(x) {
		const cf="ExpandableTabRenderer";
		this.save_keys(`[${cf}]`,x);
		const {expandableTabRenderer,...y}=x; this.g(y); // ! #destructure
		this.ExpandableTabData(expandableTabRenderer);
	}
	/** @arg {Extract<ReelPlayerOverlayData,{reelPlayerHeaderSupportedRenderers:any}>} x */
	PlayerOverlayWithSupportedRenderers(x) {
		const cf="PlayerOverlayWithSupportedRenderers";
		this.save_keys(`[${cf}]`,x);
		const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,videoInteractions,trackingParams,shareButton,pivotButton,badge,...y}=x; this.g(y); // ! #destructure
		this.LikeButtonRenderer(likeButton);
		this.ReelPlayerHeaderRenderer(reelPlayerHeaderSupportedRenderers);
		this.MenuRenderer(menu);
		this.R$ButtonRenderer(nextItemButton);
		this.R$ButtonRenderer(prevItemButton);
		this.SubscribeButtonRenderer(subscribeButtonRenderer);
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.R$ButtonRenderer(viewCommentsButton);
		this.t(videoInteractions,this.g);
		this.trackingParams(cf,trackingParams);
		this.R$ButtonRenderer(shareButton);
		this.PivotButtonRenderer(pivotButton);
		this.MetadataBadgeRenderer(badge);
	}
	/** @arg {SubscribeButtonRenderer} x */
	SubscribeButtonRenderer(x) {
		const cf="SubscribeButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {subscribeButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.SubscribeButton(subscribeButtonRenderer);
	}
	/** @arg {R$BrowseFeedActions} x */
	BrowseFeedActionsRenderer(x) {
		const cf="BrowseFeedActionsRenderer";
		this.save_keys(`[${cf}]`,x);
		const {browseFeedActionsRenderer,...y}=x; this.g(y); // ! #destructure
		this.BrowseFeedActions(browseFeedActionsRenderer);
	}
	/** @arg {Extract<ChipCloudChip,{targetId:any}>} x */
	ChipCloudChip_tid(x) {
		const cf="ChipCloudChip";
		this.save_keys(`[${cf}]`,x);
		const {style,text,navigationEndpoint,trackingParams,targetId,...y}=x; this.g(y); // ! #destructure
		this.ChipCloudChip_style(style);
		this.TextT(text);
		this.ChipCloudChip_nav(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
		this.t(targetId,a => this.targetId(cf,a));
	}
	/** @arg {ChipCloudChip['style']} x */
	ChipCloudChip_style(x) {
		const cf="ChipCloudChip_style";
		this.save_keys(`[${cf}]`,x);
		this.ChipCloudStyle(x,a => {
			switch(a) {
				case "STYLE_DEFAULT": return;
				case "STYLE_HOME_FILTER": return;
				case "STYLE_REFRESH_TO_NOVEL_CHIP": return;
				default: a===""; debugger;
			}
		});
	}
	/** @arg {ChipCloudChip['navigationEndpoint']} x */
	ChipCloudChip_nav(x) {
		if(!x) {debugger; return;}
		const cf="ChipCloudChip_nav";
		this.save_keys(`[${cf}]`,x);
		if("relatedChipCommand" in x) return this.RelatedChipCommand(x);
		if("continuationCommand" in x) return this.ContinuationCommand(x);
		debugger;
	}
	/** @arg {ChipCloudChip} x */
	ChipCloudChip(x) {
		const cf="ChipCloudChip";
		this.save_keys(`[${cf}]`,x);
		if("targetId" in x) return this.ChipCloudChip_tid(x);
		const {style,text,navigationEndpoint,trackingParams,isSelected,uniqueId,...y}=x; this.g(y); // ! #destructure
		this.ChipCloudChip_style(style);
		this.TextT(text);
		this.ChipCloudChip_nav(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
		this.t(isSelected,a => this.primitive_of(a,"boolean"));
	}
	/** @arg {FeedFilterChipBarData} x */
	FeedFilterChipBarData(x) {
		const cf="FeedFilterChipBarData";
		this.save_keys(`[${cf}]`,x);
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.ChipCloudChipRenderer);
		this.trackingParams(cf,trackingParams);
		this.R$ButtonRenderer(nextButton);
		this.R$ButtonRenderer(previousButton);
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @arg {LiveChatPlaceholderItemData} x */
	LiveChatPlaceholderItemData(x) {
		const cf="LiveChatPlaceholderItemData";
		this.save_keys(`[${cf}]`,x);
		const {id,timestampUsec,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(id);
		this.primitive_of_string(timestampUsec);
	}
	/** @arg {CommentRenderer} x */
	CommentRenderer(x) {
		const cf="CommentRenderer";
		this.save_keys(`[${cf}]`,x);
		const {commentRenderer,...y}=x; this.g(y); // ! #destructure
		this.CommentData(commentRenderer);
	}
	/** @arg {RichItemData} x */
	RichItemData(x) {
		const cf="RichItemData";
		this.save_keys(`[${cf}]`,x);
		const {content,trackingParams,rowIndex,colIndex,...y}=x; this.g(y); // ! #destructure
		this.RichItemContent(content);
		this.trackingParams(cf,trackingParams);
		this.t(rowIndex,a => this.primitive_of(a,"number"));
		this.t(colIndex,a => this.primitive_of(a,"number"));
	}
	/** @arg {LiveChatTextMessageData} x */
	LiveChatTextMessageData(x) {
		const cf="LiveChatTextMessageData";
		this.save_keys(`[${cf}]`,x);
		const {message,authorName,authorPhoto,contextMenuEndpoint,id,authorBadges,timestampUsec,authorExternalChannelId,contextMenuAccessibility,timestampText,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(message);
		this.D$TextWithRuns(authorName);
		this.Thumbnail(authorPhoto);
		this.g(contextMenuEndpoint);
		this.primitive_of_string(id);
		this.tz(authorBadges,(this.LiveChatAuthorBadgeRenderer));
		this.primitive_of_string(timestampUsec);
		this.parser.parse_channel_id(authorExternalChannelId);
		this.A$Accessibility(contextMenuAccessibility);
		this.D$TextWithRuns(timestampText);
	}
	/** @arg {UnifiedSharePanelRenderer} x */
	UnifiedSharePanelRenderer(x) {
		const cf="UnifiedSharePanelRenderer";
		this.save_keys(`[${cf}]`,x);
		const {unifiedSharePanelRenderer,...y}=x; this.g(y); // ! #destructure
		this.UnifiedSharePanel(unifiedSharePanelRenderer);
	}
	/** @arg {AutoplaySetItem} x */
	AutoplaySetItem(x) {
		const cf="AutoplaySetItem";
		this.save_keys(`[${cf}]`,x);
		const {mode,autoplayVideo,nextButtonVideo,...y}=x; this.g(y); // ! #destructure
		if(mode!=="NORMAL") debugger;
		this.E$WatchEndpoint(autoplayVideo);
		this.t(nextButtonVideo,this.E$WatchEndpoint);
	}
	/** @arg {ModifiedSetItem} x */
	ModifiedSetItem(x) {
		const cf="ModifiedSetItem";
		this.save_keys(`[${cf}]`,x);
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=x; this.g(y); // ! #destructure
		this.E$WatchPlaylistEndpoint(autoplayVideo);
		this.E$WatchPlaylistEndpoint(nextButtonVideo);
		this.t(previousButtonVideo,this.E$WatchPlaylistEndpoint);
	}
	/** @arg {ClipCreationRenderer} x */
	ClipCreationRenderer(x) {
		const cf="ClipCreationRenderer";
		this.save_keys(`[${cf}]`,x);
		const {clipCreationRenderer,...y}=x; this.g(y); // ! #destructure
		this.ClipCreationData(clipCreationRenderer);
	}
	/** @arg {WatchPlaylistEndpoint} x */
	E$WatchPlaylistEndpoint(x) {
		const cf="WatchPlaylistEndpoint";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,commandMetadata,watchPlaylistEndpoint,...y}=x; this.g(y); // ! #destructure
		this.clickTrackingParams("WatchPlaylistEndpoint",clickTrackingParams);
		this.CommandMetadata(commandMetadata);
		this.E$WatchPlaylist(watchPlaylistEndpoint);
	}
	/** @arg {E$WatchPlaylist} x */
	E$WatchPlaylist(x) {
		const cf="WatchPlaylist";
		this.save_keys(`[${cf}]`,x);
		const {playlistId,index,params,...y}=x; this.g(y); // ! #destructure
		this.parser.parse_playlist_id(playlistId);
		this.primitive_of(index,"number");
		this.params("WatchPlaylist","watch_playlist.params",params);
	}
	//#endregion
	//#region destructure
	/** @arg {PlaylistSidebarPrimaryInfoRenderer} x */
	PlaylistSidebarPrimaryInfoRenderer(x) {
		const cf="PlaylistSidebarPrimaryInfoRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playlistSidebarPrimaryInfoRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlaylistSidebarPrimaryInfo(playlistSidebarPrimaryInfoRenderer);
	}
	/** @arg {PlaylistMetadataRenderer} x */
	PlaylistMetadataRenderer(x) {
		const cf="PlaylistMetadataRenderer";
		this.save_keys(`[${cf}]`,x);
		const {playlistMetadataRenderer,...y}=x; this.g(y); // ! #destructure
		this.PlaylistMetadata(playlistMetadataRenderer);
	}
	/** @arg {TranscriptRenderer} x */
	TranscriptRenderer(x) {
		const cf="TranscriptRenderer";
		this.save_keys(`[${cf}]`,x);
		const {transcriptRenderer,...y}=x; this.g(y); // ! #destructure
		this.D$Transcript(transcriptRenderer);
	}
	/** @arg {PivotButtonRenderer} x */
	PivotButtonRenderer(x) {
		const cf="PivotButtonRenderer";
		this.save_keys(`[${cf}]`,x);
		const {pivotButtonRenderer,...y}=x; this.g(y); // ! #destructure
		this.PivotButton(pivotButtonRenderer);
	}
	/** @arg {R$MetadataBadgeRenderer} x */
	MetadataBadgeRenderer(x) {
		const cf="MetadataBadgeRenderer";
		this.save_keys(`[${cf}]`,x);
		const {metadataBadgeRenderer,...y}=x; this.g(y); // ! #destructure
		this.MetadataBadgeData(metadataBadgeRenderer);
	}
	/** @arg {LiveChatAuthorBadgeRenderer} x */
	LiveChatAuthorBadgeRenderer(x) {
		const cf="LiveChatAuthorBadgeRenderer";
		this.save_keys(`[${cf}]`,x);
		const {liveChatAuthorBadgeRenderer,...y}=x; this.g(y); // ! #destructure
		this.LiveChatAuthorBadgeData(liveChatAuthorBadgeRenderer);
	}
	/** @arg {ChannelHeaderLinksRenderer} x */
	ChannelHeaderLinksRenderer(x) {
		const cf="ChannelHeaderLinksRenderer";
		this.save_keys(`[${cf}]`,x);
		const {channelHeaderLinksRenderer,...y}=x; this.g(y); // ! #destructure
		this.ChannelHeaderLinks(channelHeaderLinksRenderer);
	}
	/** @arg {ReelPlayerHeaderRenderer} x */
	ReelPlayerHeaderRenderer(x) {
		const cf="ReelPlayerHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		const {reelPlayerHeaderRenderer,...y}=x; this.g(y); // ! #destructure
		this.g(reelPlayerHeaderRenderer);
	}
	/** @arg {VideoPrimaryInfoData} x */
	VideoPrimaryInfoData(x) {
		const cf="VideoPrimaryInfoData";
		this.save_keys(`[${cf}]`,x);
		const {title,viewCount,videoActions,trackingParams,superTitleLink,dateText,relativeDateText,badges,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(title);
		this.t(superTitleLink,this.D$TextWithRuns);
		this.VideoViewCountRenderer(viewCount);
		this.MenuRenderer(videoActions);
		this.trackingParams(cf,trackingParams);
		this.D$SimpleText(dateText);
		this.D$SimpleText(relativeDateText);
		this.tz(badges,(this.MetadataBadgeRenderer));
	}
	/** @arg {MerchandiseShelf} x */
	MerchandiseShelf(x) {
		const cf="MerchandiseShelf";
		this.save_keys(`[${cf}]`,x);
		const {title,items,trackingParams,showText,hideText,actionButton,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(title);
		this.z(items,this.MerchandiseItemRenderer);
		this.trackingParams(cf,trackingParams);
		this.primitive_of_string(showText);
		this.primitive_of_string(hideText);
		this.MenuRenderer(actionButton);
	}
	/** @arg {VideoSecondaryInfoData} x */
	VideoSecondaryInfoData(x) {
		const cf="VideoSecondaryInfoData";
		this.save_keys(`[${cf}]`,x);
		const {owner,description,subscribeButton,metadataRowContainer,showMoreText,showLessText,trackingParams,defaultExpanded,descriptionCollapsedLines,showMoreCommand,showLessCommand,...y}=x; this.g(y); // ! #destructure
		this.VideoOwnerRenderer(owner);
		this.t(description,this.D$TextWithRuns);
		this.SubscribeButtonRenderer(subscribeButton);
		this.MetadataRowContainerRenderer(metadataRowContainer);
		this.D$SimpleText(showMoreText);
		this.D$SimpleText(showLessText);
		this.trackingParams(cf,trackingParams);
		this.primitive_of(defaultExpanded,"boolean");
		this.primitive_of(descriptionCollapsedLines,"number");
		this.t(showMoreCommand,this.CommandExecutorCommand);
		this.t(showLessCommand,this.ChangeEngagementPanelVisibilityAction);
	}
	//#endregion
	//#region type_errors
	/** @arg {{v:minimal_handler_member}} x */
	minimal_handler_member_4(x) {
		const cf="minimal_handler_member";
		this.save_keys(`[${cf}]`,x);
		//@ts-expect-error(2345) !
		const {...y}=x; this.g(y);
	}
	/** @arg {MultiMarkersPlayerBar} x */
	MultiMarkersPlayerBar(x) {
		const cf="MultiMarkersPlayerBar";
		this.save_keys(`[${cf}]`,x);
		const {visibleOnLoad,markersMap,...y}=x; this.g(y); // ! #destructure
		if(visibleOnLoad.key!=="") {
			if(visibleOnLoad.key!=="DESCRIPTION_CHAPTERS") debugger;
		}
		this.z(markersMap,this.MarkerItem);
	}
	/** @arg {MultiMarkersPlayerBar['markersMap'][number]} x */
	MarkerItem(x) {
		switch(x.key) {
			case "DESCRIPTION_CHAPTERS": this.MapTemplate(x,this.DescriptionChapters); break;
			case "HEATSEEKER": this.MapTemplate(x,this.HeatSeekerItemData); break;
		}
	}
	/** @template K,V @arg {MapTemplate<K,V>} x @arg {(this:this,x:V,k:K)=>void} f */
	MapTemplate(x,f) {
		f.call(this,x.value,x.key);
	}
	/** @arg {AdLayoutMetadataItem} x */
	AdLayoutMetadataItem(x) {
		const cf="AdLayoutMetadataItem";
		this.save_keys(`[${cf}]`,x);
		const {layoutType,layoutId,adLayoutLoggingData,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(layoutType);
		this.primitive_of_string(layoutId);
		this.AdLayoutLoggingData(adLayoutLoggingData);
	}
	/** @arg {CompactVideoData} x */
	CompactVideoData(x) {
		const cf="CompactVideoData";
		this.save_keys(`[${cf}]`,x);
		const {videoId,thumbnail,title,thumbnailOverlays,lengthText,longBylineText,publishedTimeText,trackingParams,viewCountText,navigationEndpoint,shortBylineText,shortViewCountText,channelThumbnail,ownerBadges,accessibility,menu,richThumbnail,badges,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(videoId);
		this.Thumbnail(thumbnail);
		this.g(title);
		this.g(thumbnailOverlays);
		this.D$TextWithRuns(lengthText);
		this.D$TextWithRuns(longBylineText);
		this.D$TextWithRuns(publishedTimeText);
		this.trackingParams(cf,trackingParams);
		this.D$TextWithRuns(viewCountText);
		this.g(navigationEndpoint);
		this.D$TextWithRuns(shortBylineText);
		this.D$TextWithRuns(shortViewCountText);
		this.g(channelThumbnail);
		this.t(ownerBadges,this.g);
		this.A$Accessibility(accessibility);
		this.g(menu);
		this.g(richThumbnail);
		this.tz(badges,(this.MetadataBadgeRenderer));
	}
	/** @arg {SearchboxConfig} x */
	SearchboxConfig(x) {
		const cf="SearchboxConfig";
		this.save_keys(`[${cf}]`,x);
		const {webSearchboxConfig,...y}=x; this.g(y); // ! #destructure
		this.WebSearchboxConfig(webSearchboxConfig);
	}
	/** @arg {HotkeyDialog} x */
	HotkeyDialog(x) {
		const cf="HotkeyDialog";
		this.save_keys(`[${cf}]`,x);
		const {title,sections,dismissButton,trackingParams,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(title);
		this.z(sections,this.HotkeyDialogSectionRenderer);
		this.R$ButtonRenderer(dismissButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {A$D$AccountItem} x */
	AccountItemData(x) {
		const cf="AccountItemData";
		this.save_keys(`[${cf}]`,x);
		const {accountByline,accountName,accountPhoto,isDisabled,isSelected,hasChannel,serviceEndpoint,channelHandle,...y}=x; this.g(y); // ! #destructure
		this.D$TextWithRuns(accountByline);
		this.D$TextWithRuns(accountName);
		this.Thumbnail(accountPhoto);
		this.primitive_of(isDisabled,"boolean");
		this.primitive_of(isSelected,"boolean");
		this.primitive_of(hasChannel,"boolean");
		this.g(serviceEndpoint);
		this.D$TextWithRuns(channelHandle);
	}
	/** @arg {D$ExpandableTab} x */
	ExpandableTabData(x) {
		const cf="ExpandableTabData";
		this.save_keys(`[${cf}]`,x);
		const {endpoint,expandedText,title,selected,content,...y}=x; this.g(y); // ! #destructure
		this.g(endpoint);
		this.t(expandedText,this.primitive_of_string);
		this.primitive_of_string(title);
		this.primitive_of(selected,"boolean");
		this.t(content,this.SectionListRenderer);
	}
	/** @template {SubscribeButton} T @arg {T} x */
	SubscribeButton$Omit(x) {
		const cf="SubscribeButton";
		const {buttonText,subscribed,enabled,type,channelId,showPreferences,subscribedButtonText,unsubscribedButtonText,trackingParams,unsubscribeButtonText,serviceEndpoints,subscribeAccessibility,unsubscribeAccessibility,...y}=x;
		this.primitive_of(subscribed,"boolean");
		this.primitive_of(enabled,"boolean");
		this.primitive_of_string(type);
		this.primitive_of_string(channelId);
		this.primitive_of(showPreferences,"boolean");
		this.D$TextWithRuns(buttonText);
		this.D$TextWithRuns(subscribedButtonText);
		this.D$TextWithRuns(unsubscribedButtonText);
		this.trackingParams(cf,trackingParams);
		this.D$TextWithRuns(unsubscribeButtonText);
		this.tz(serviceEndpoints,x => {
			if("subscribeEndpoint" in x) return this.E$SubscribeEndpoint(x);
			if("signalServiceEndpoint" in x) return this.signalServiceEndpoint(x);
			x;
			this.do_codegen(cf,x);
			debugger;
		});
		this.A$Accessibility(subscribeAccessibility);
		this.A$Accessibility(unsubscribeAccessibility);
		return y;
	}
	/** @arg {SubscribeButton} x */
	SubscribeButton(x) {
		const cf="SubscribeButton";
		this.save_keys(`[${cf}]`,x);
		if(!("targetId" in x)) {
			let u=this.SubscribeButton$Omit(x);
			const {...y}=u; this.g(y); // ! #destructure
			return;
		}
		let u=this.SubscribeButton$Omit(x);
		const {notificationPreferenceButton,targetId,subscribedEntityKey,onSubscribeEndpoints,onUnsubscribeEndpoints,...y}=u; this.g(y); // ! #destructure
		this.t(notificationPreferenceButton,this.SubscriptionNotificationToggleButtonRenderer);
		this.primitive_of_string(targetId);
		this.primitive_of_string(subscribedEntityKey);
		this.z(onSubscribeEndpoints,this.E$SubscribeEndpoint);
		this.z(onUnsubscribeEndpoints,this.E$SignalServiceEndpoint);
	}
	/** @arg {E$SignalServiceEndpoint} x */
	signalServiceEndpoint(x) {this.E$SignalServiceEndpoint(x);}
	/** @arg {D$BrowseFeedActions} x */
	BrowseFeedActions(x) {
		const cf="BrowseFeedActions";
		this.save_keys(`[${cf}]`,x);
		const {contents,...y}=x; this.g(y); // ! #destructure
		this.z(contents,this.BrowseFeedContent);
	}
	/** @template {string} T @arg {ChipCloudStyle<T>} x @arg {(this:this,x:T)=>void} f */
	ChipCloudStyle(x,f) {
		const cf="ChipCloudStyle";
		this.save_keys(`[${cf}]`,x);
		const {styleType,...y}=x; this.g(y); // ! #destructure
		f.call(this,styleType);
	}
	/** @arg {RelatedChipCommand} x */
	RelatedChipCommand(x) {
		const cf="RelatedChipCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,relatedChipCommand,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(clickTrackingParams);
		this.RelatedChipCommandData(relatedChipCommand);
	}
	/** @arg {CommentData} x */
	CommentData(x) {
		const cf="CommentData";
		this.save_keys(`[${cf}]`,x);
		const {actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,authorText,authorThumbnail,collapseButton,commentId,contentText,currentUserReplyThumbnail,publishedTimeText,isLiked,voteCount,voteStatus,trackingParams,expandButton,loggingDirectives,...y}=x; this.g(y); // ! #destructure
		this.CommentActionButtonsRenderer(actionButtons);
		this.MenuRenderer(actionMenu);
		this.g(authorEndpoint);
		this.primitive_of(authorIsChannelOwner,"boolean");
		this.D$TextWithRuns(authorText);
		this.Thumbnail(authorThumbnail);
		this.R$ButtonRenderer(collapseButton);
		this.primitive_of_string(commentId);
		this.D$TextWithRuns(contentText);
		this.Thumbnail(currentUserReplyThumbnail);
		this.D$TextWithRuns(publishedTimeText);
		this.primitive_of(isLiked,"boolean");
		this.D$TextWithRuns(voteCount);
		this.primitive_of_string(voteStatus);
		this.trackingParams(cf,trackingParams);
		this.R$ButtonRenderer(expandButton);
		this.A$LoggingDirectives(loggingDirectives);
	}
	/** @arg {RichItemContent} x */
	RichItemContent(x) {
		const cf="RichItemContent";
		this.save_keys(`[${cf}]`,x);
		if("adSlotRenderer" in x) return this.AdSlotRenderer(x);
		if("videoRenderer" in x) return this.VideoRenderer(x);
		if("radioRenderer" in x) return this.RadioRenderer(x);
		if("feedNudgeRenderer" in x) return this.FeedNudgeRenderer(x);
		debugger;
	}
	/** @arg {UnifiedSharePanel} x */
	UnifiedSharePanel(x) {
		const cf="UnifiedSharePanel";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,showLoadingSpinner,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.primitive_of(showLoadingSpinner,"boolean");
	}
	/** @arg {ClipCreationData} x */
	ClipCreationData(x) {
		const cf="ClipCreationData";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,userAvatar,titleInput,scrubber,saveButton,displayName,publicityLabel,cancelButton,adStateOverlay,externalVideoId,publicityLabelIcon,...y}=x; this.g(y); // ! #destructure
		this.trackingParams(cf,trackingParams);
		this.Thumbnail(userAvatar);
		this.ClipCreationTextInputRenderer(titleInput);
		this.ClipCreationScrubberRenderer(scrubber);
		this.R$ButtonRenderer(saveButton);
		this.D$SimpleText(displayName);
		this.primitive_of_string(publicityLabel);
		this.R$ButtonRenderer(cancelButton);
		this.ClipAdStateRenderer(adStateOverlay);
		this.primitive_of_string(externalVideoId);
		this.primitive_of_string(publicityLabelIcon);
	}
	/** @arg {ChannelMetadata} x */
	ChannelMetadata(x) {
		const cf="ChannelMetadata";
		this.save_keys(`[${cf}]`,x);
		const {title,description,rssUrl,externalId,keywords,ownerUrls,androidAppindexingLink,androidDeepLink,availableCountryCodes,avatar,channelUrl,vanityChannelUrl,iosAppindexingLink,isFamilySafe,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(title);
		this.primitive_of_string(description);
		this.primitive_of_string(rssUrl);
		this.primitive_of_string(externalId);
		this.primitive_of_string(keywords);
		let ou=ownerUrls[0];
		if(!this.str_starts_with(ou,"http://www.youtube.com/@")) debugger;
		this.primitive_of_string(androidAppindexingLink);
		this.primitive_of_string(androidDeepLink);
		this.z(availableCountryCodes,this.primitive_of_string);
		this.Thumbnail(avatar);
		this.primitive_of_string(channelUrl);
		this.primitive_of_string(vanityChannelUrl);
		this.primitive_of_string(iosAppindexingLink);
		if(isFamilySafe!==true) debugger;
	}
	/** @arg {ResetChannelUnreadCountCommand} x */
	ResetChannelUnreadCountCommand(x) {
		const cf="ResetChannelUnreadCountCommand";
		this.save_keys(`[${cf}]`,x);
		const {clickTrackingParams,resetChannelUnreadCountCommand,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(clickTrackingParams);
		this.g(resetChannelUnreadCountCommand);
	}
	/** @private @arg {ReelDismissalActionRenderer} x */
	ReelDismissalActionRenderer(x) {
		const cf="ReelDismissalActionRenderer";
		this.save_keys(`[${cf}]`,x);
		const {reelDismissalActionRenderer: {onDismissalCompletionRenderer,trackingParams,...z},...y}=x; this.g(y); this.g(z); // #destructure
		this.trackingParams("ReelDismissalAction",trackingParams);
		this.R$NotificationAction(onDismissalCompletionRenderer);
	}
	/** @private @arg {ChannelSwitcherPage} x */
	ChannelSwitcherPage(x) {
		const cf="ChannelSwitcherPage";
		this.save_keys(`[${cf}]`,x);
		const {contents: [z],header,targetId,...y}=x; this.g(y); // #destructure
		if("buttonRenderer" in z) return this.R$ButtonRenderer(z);
		this.ChannelSwitcherHeaderRenderer(header);
		switch(targetId) {
			default: debugger; break;
		}
	}
	//#endregion
	//#region has_save_keys
	/** @arg {minimal_handler_member} x */
	minimal_handler_member_1(x) {
		const cf="minimal_handler_member";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {PlaylistHeader} x */
	PlaylistHeader(x) {
		const cf="PlaylistHeader";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {MacroMarkersListItemRenderer} x */
	MacroMarkersListItemRenderer(x) {
		const cf="MacroMarkersListItemRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {ProductListItemRenderer} x */
	ProductListItemRenderer(x) {
		const cf="ProductListItemRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {MetadataRowContainerRenderer} x */
	MetadataRowContainerRenderer(x) {
		const cf="MetadataRowContainerRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {TopicLinkRenderer} x */
	TopicLinkRenderer(x) {
		const cf="TopicLinkRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {DescriptionChapters} x */
	DescriptionChapters(x) {
		const cf="DescriptionChapters";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {HeatSeekerItemData} x */
	HeatSeekerItemData(x) {
		const cf="HeatSeekerItemData";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {PlaylistSidebarPrimaryInfo} x */
	PlaylistSidebarPrimaryInfo(x) {
		const cf="PlaylistSidebarPrimaryInfo";
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {PlaylistMetadata} x */
	PlaylistMetadata(x) {
		const cf="PlaylistMetadata";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {AdLayoutLoggingData} x */
	AdLayoutLoggingData(x) {
		const cf="AdLayoutLoggingData";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {D$Transcript} x */
	D$Transcript(x) {
		const cf="Transcript";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,content,...y}=x; this.g(y);
		this.trackingParams(cf,trackingParams);
		this.TranscriptSearchPanelRenderer(content);
	}
	/** @private @arg {TranscriptSearchPanelRenderer} x */
	TranscriptSearchPanelRenderer(x) {
		const cf="TranscriptSearchPanelRenderer";
		this.save_keys(`[${cf}]`,x);
		const {transcriptSearchPanelRenderer: {trackingParams,body,footer,targetId,...y},...z}=x; this.g(y); this.g(z);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
		this.TranscriptSegmentListRenderer(body);
		this.TranscriptFooterRenderer(footer);
	}
	/** @private @arg {TranscriptFooterRenderer} x */
	TranscriptFooterRenderer(x) {
		const cf="TranscriptFooterRenderer";
		this.save_keys(`[${cf}]`,x);
		const {transcriptFooterRenderer: {languageMenu,...y},...z}=x; this.g(y); this.g(z);
		this.SortFilterSubMenuRenderer(languageMenu);
	}
	/** @private @arg {TranscriptSegmentListRenderer} x */
	TranscriptSegmentListRenderer(x) {
		const cf="TranscriptSegmentListRenderer";
		this.save_keys(`[${cf}]`,x);
		const {transcriptSegmentListRenderer: {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y},...z}=x; this.g(y); this.g(z);
		this.z(initialSegments,this.TranscriptSegmentRenderer);
		this.z([noResultLabel,retryLabel],a => this.D$TextWithRuns(a));
		this.primitive_of(touchCaptionsEnabled,"boolean");
	}
	/** @private @arg {TranscriptSegmentRenderer} x */
	TranscriptSegmentRenderer(x) {
		const cf="TranscriptSegmentRenderer";
		this.save_keys(`[${cf}]`,x);
		const {transcriptSegmentRenderer: {startMs,endMs,snippet,startTimeText,trackingParams,accessibility,targetId,...y},...z}=x; this.g(y); this.g(z);
		this.z([startMs,endMs],a => this.primitive_of(a,"string"));
		this.z([snippet,startTimeText],a => this.D$TextWithRuns(a));
		this.trackingParams(cf,trackingParams);
		this.A$Accessibility(accessibility);
		let cc=this.t(targetId,a => this.targetId_arr(split_string_once(a,".")));
		this.t(cc,a => {
			console.log("targetId",a);
		});
	}
	/** @private @arg {[string, `${string}.${string}.${string}`]} x @returns {[string,string,string,string]} */
	targetId_arr([f,a]) {
		let [c,a1]=split_string_once(a,".");
		let [d,a2]=split_string_once(a1,".");
		return [f,c,d,a2];
	}
	/** @private @arg {PivotButton} x */
	PivotButton(x) {
		const cf="PivotButton";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {MetadataBadgeData} x */
	MetadataBadgeData(x) {
		const cf="MetadataBadgeData";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {LiveChatAuthorBadgeData} x */
	LiveChatAuthorBadgeData(x) {
		const cf="LiveChatAuthorBadgeData";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {ChannelHeaderLinks} x */
	ChannelHeaderLinks(x) {
		const cf="ChannelHeaderLinks";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {WebSearchboxConfig} x */
	WebSearchboxConfig(x) {
		const cf="WebSearchboxConfig";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {RelatedChipCommandData} x */
	RelatedChipCommandData(x) {
		const cf="RelatedChipCommandData";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {BrowseFeedContent} x */
	BrowseFeedContent(x) {
		const cf="BrowseFeedContent";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {CommentActionButtonsRenderer} x */
	CommentActionButtonsRenderer(x) {
		const cf="CommentActionButtonsRenderer";
		this.save_keys(`[${cf}]`,x);
		this.CommentActionButtons(this.w(x));
	}
	/** @private @arg {Do$w<CommentActionButtonsRenderer>} x */
	CommentActionButtons(x) {x;}
	/** @private @arg {ClipCreationTextInputRenderer} x */
	ClipCreationTextInputRenderer(x) {
		const cf="ClipCreationTextInputRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ClipCreationTextInput(this.w(x));
	}
	/** @private @arg {Do$w<ClipCreationTextInputRenderer>} x */
	ClipCreationTextInput(x) {x;}
	/** @private @arg {R$ClipCreationScrubber} x */
	ClipCreationScrubberRenderer(x) {
		const cf="ClipCreationScrubberRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ClipCreationScrubber(this.w(x));
	}
	/** @private @arg {Do$w<R$ClipCreationScrubber>} x */
	ClipCreationScrubber(x) {x;}
	/** @private @arg {R$ClipAdState} x */
	ClipAdStateRenderer(x) {
		const cf="ClipAdStateRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ClipAdState(this.w(x));
	}
	/** @private @arg {Do$w<R$ClipAdState>} x */
	ClipAdState(x) {x;}
	/** @private @arg {R$AdSlot} x */
	AdSlotRenderer(x) {
		const cf="AdSlotRenderer";
		this.save_keys(`[${cf}]`,x);
		this.AdSlot(this.w(x));
	}
	/** @private @arg {Do$w<R$AdSlot>} x */
	AdSlot(x) {x;}
	/** @private @arg {R$Video} x */
	VideoRenderer(x) {
		const cf="VideoRenderer";
		this.save_keys(`[${cf}]`,x);
		this.Video(this.w(x));
	}
	/** @private @arg {Do$w<R$Video>} x */
	Video(x) {x;}
	/** @private @arg {R$Radio} x */
	RadioRenderer(x) {
		const cf="RadioRenderer";
		this.save_keys(`[${cf}]`,x);
		this.Radio(this.w(x));
	}
	/** @private @arg {Do$w<R$Radio>} x */
	Radio(x) {x;}
	/** @private @arg {FeedNudgeRenderer} x */
	FeedNudgeRenderer(x) {
		const cf="FeedNudgeRenderer";
		this.save_keys(`[${cf}]`,x);
		this.FeedNudge(this.w(x));
	}
	/** @private @arg {Do$w<FeedNudgeRenderer>} x */
	FeedNudge(x) {x;}
	/** @private @arg {RichSectionRenderer} x */
	RichSectionRenderer(x) {
		const cf="RichSectionRenderer";
		this.save_keys(`[${cf}]`,x);
		this.RichSection(this.w(x));
	}
	/** @private @arg {Do$w<RichSectionRenderer>} x */
	RichSection(x) {x;}
	/** @private @arg {GuideCollapsibleSectionEntryRenderer} x */
	GuideCollapsibleSectionEntryRenderer(x) {
		const cf="GuideCollapsibleSectionEntryRenderer";
		this.save_keys(`[${cf}]`,x);
		this.GuideCollapsibleSectionEntry(this.w(x));
	}
	/** @private @arg {Do$w<GuideCollapsibleSectionEntryRenderer>} x */
	GuideCollapsibleSectionEntry(x) {x;}
	/** @template {{}} T @typedef {T[GetMaybeKeys<T>]} Do$w */
	/** @private @arg {MerchandiseItemRenderer} x */
	MerchandiseItemRenderer(x) {
		const cf="MerchandiseItemRenderer";
		this.save_keys(`[${cf}]`,x);
		this.MerchandiseItem(this.w(x));
	}
	/** @private @arg {Do$w<MerchandiseItemRenderer>} x */
	MerchandiseItem(x) {x;}
	/** @private @arg {CarouselLockupRenderer} x */
	CarouselLockupRenderer(x) {
		const cf="CarouselLockupRenderer";
		this.save_keys(`[${cf}]`,x);
		this.CarouselLockup(this.w(x));
	}
	/** @private @arg {CarouselLockupRenderer[GetMaybeKeys<CarouselLockupRenderer>]} x */
	CarouselLockup(x) {x;}
	/** @private @arg {R$Factoid} x */
	FactoidRenderer(x) {
		const cf="FactoidRenderer";
		this.save_keys(`[${cf}]`,x);
		this.Factoid(this.w(x));
	}
	/** @private @arg {R$Factoid['factoidRenderer']} x */
	Factoid(x) {x;}
	/** @private @arg {ChannelSwitcherHeaderRenderer} x */
	ChannelSwitcherHeaderRenderer(x) {
		const cf="ChannelSwitcherHeaderRenderer";
		this.save_keys(`[${cf}]`,x);
		this.ChannelSwitcherHeader(this.w(x));
	}
	/** @arg {SuperVodBuyFlowContentRenderer} x */
	SuperVodBuyFlowContentRenderer(x) {
		const cf="SuperVodBuyFlowContentRenderer";
		this.save_keys(`[${cf}]`,x);
		this.SuperVodBuyFlowContent(this.w(x));
	}
	/** @arg {ChannelSwitcherHeader} x */
	ChannelSwitcherHeader(x) {x;}
	/** @arg {SuperVodBuyFlowContent} x */
	SuperVodBuyFlowContent(x) {x;}
	/** @private @arg {SubscriptionNotificationToggleButtonRenderer} x */
	SubscriptionNotificationToggleButtonRenderer(x) {
		const cf="SubscriptionNotificationToggleButtonRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {HotkeyDialogSectionRenderer} x */
	HotkeyDialogSectionRenderer(x) {
		const cf="HotkeyDialogSectionRenderer";
		this.save_keys(`[${cf}]`,x);
	}
	//#endregion
	//#region TODO_minimal_member_fns
	/** @private @arg {minimal_handler_member} x ! */
	minimal_handler_member_2(x) {x;}
	//#endregion
}
//#endregion
//#region Start main
console=typeof window==="undefined"? console:(() => window.console)();
main();
//#endregion
