// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.20
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
/** @private @type {YtdAppElement} */
const YtdAppElement=as({});
/** @private @type {InstanceType<typeof YtdAppElement>|null} */
let ytd_app=null;
/** @private @type {HTMLElement|null} */
let ytcp_app=null;
/** @private @type {HTMLElement|null} */
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
/** @private @type {D_Saved} */
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
	/** @constructor @public @arg {T} x */
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
	/** @api @public @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
	addEventListener(type,handler) {
		(this._events[type]??=[]).push(handler);
	}
	/** @api @public @arg {string} type @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler */
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
	/** @api @public @arg {CustomEventType} event */
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
	/** @private @type {Map<MessagePort,D_ResState[]>} */
	port_to_resolvers_map=new Map;
	/** @api @public @arg {MessagePort} port */
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
	/** @api @public @arg {MessagePort} port @arg {number} cur_count */
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
					data_saver.save_string("[body_element]",fut_data);
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
	/** @constructor @public @arg {(args: [any, any, any]) => any} on_target_apply_callback */
	constructor(on_target_apply_callback) {
		this.on_target_apply_callback=on_target_apply_callback;
		PropertyHandler.instances.push(this);
	}
	get() {
		return this.override_value.value;
	}
	/** @api @public @arg {any} value */
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
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		this.rendererContentItemArray=new HandleRendererContentItemArray(x);
	}
	/** @handler @public @arg {string} path @arg {Todo_D_RichGrid} renderer */
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
	/** @constructor @public @arg {string} key_str @arg {RegExp} key_regexp */
	constructor(key_str,key_regexp) {
		this._keyStr=key_str;
		this.key_regexp=key_regexp;
	}
	/* will return a  Uint8Array type */
	/** @api @public @arg {string} input */
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
	/** @api @public @arg {string} input */
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
	/** @constructor @public @arg {number} a @arg {number} b */
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
	/** @constructor @public @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @api @public @arg {number} [size] */
	try_read_any(size) {
		try {
			return this.read_any(size);
		} catch {
			return null;
		}
	}
	/** @private @arg {number} [size] */
	reset_and_read_any(size) {
		return this.read_any(size,0);
	}
	/** @private */
	_use() {
		this.reset_and_read_any(0);
	}
	static {
		let test_instance=new this(new Uint8Array(0));
		test_instance._use();
	}
	/** @private @type {boolean} */
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
		/** @private @type {D_DataArrType} */
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
		/** @private @type {D_DecTypeNum[]} */
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
	}
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
		/** @private @type {number|null} */
		let res=0;
		for(let i=0;i<varint_entries.length;i++) {
			let cur_res=do_reduce_varint(res,varint_entries[i]);
			if(cur_res===null) return null;
			res=cur_res;
		}
		return res;
	}
	/** @returns {[number[],bigint]|null} */
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
		return [u64_varint,ret];
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
		/** @private @type {D_DecTypeNum[]} */
		let first_num=[];
		switch(wireType) {
			case 0:
				/** @private @type {[true,[number[], bigint],number]|[false,null,number]} */
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
					first_num.push(["data64",fieldId,...num64]);
					this.pos=new_pos;
				} else if(num32===null) {
					this.failed=true;
					first_num.push(["error",fieldId]);
				} else if(revert_res[0]) {
					let [,num64,new_pos]=revert_res;
					if(num64[1]!==BigInt(num32)) {
						first_num.push(["data64",fieldId,...num64]);
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
				/** @private @type {D_DecTypeNum} */
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
	/** @api @public @arg {{ type: any; data?: { type: any; data: any[]; }; }} ev */
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
	/** @api @public @arg {string|number} ev_name @arg {any} fn */
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
	/** @api @public @arg {string} ev_name @arg {(event: { data: { type: any; data: [any, any, any]; }; }) => void} fn */
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
	/** @constructor @public @arg {{}} value @arg {PropertyKey} property_key @arg {object} target @arg {string} property_path @arg {boolean} noisy */
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
	/** @api @public @type {Function|null} */
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
	/** @constructor @public @arg {HTMLVideoElement[]} value */
	constructor(value) {
		this.value=value;
	}
}
class YTNavigateFinishEvent {
	/** @api @public @arg {Event} value @return {YTNavigateFinishEvent} */
	static cast(value) {
		/** @private @type {any} */
		let ret=value;
		return ret;
	}
	/** @api @public @type {YTNavigateFinishDetail} */
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
	/** @api @public @arg {Event} event */
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
	/** @api @public @arg {number} gain */
	setGain(gain) {
		this.gain_node.gain.value=gain;
	}
	getGain() {
		return this.gain_node.gain.value;
	}
	/** @api @public @arg {HTMLMediaElement[]} media_node_list */
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
/** @private @template {string} T @template {{}} U @template {T_Split<T, ",">} C @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}} @type {__ia_excludeKeysS} */
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
	}
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
	/** @constructor @public @arg {T} services @arg {U} params */
	constructor(services,params) {
		this.services=services;
		this.params=params;
	}
	/** @private @arg {U} params */
	set_params(params) {
		this.params=params;
	}
	/** @api @public @arg {keyof U} key */
	get_param(key) {
		if(!this.params) throw new Error("No service params");
		return this.params[key];
	}
	/** @api @public @template {keyof T} V @arg {V} key */
	get(key) {
		if(!this.services) throw new Error("No services");
		return this.services[key];
	}
	/** @private @template {keyof T} V @arg {V} key @arg {Extract<T,{}>[V]} value */
	set(key,value) {
		if(!this.services) throw new Error("No services");
		this.services[key]=value;
	}
	/** @private @arg {keyof T} k */
	_use(k) {
		/** @private @type {any} */
		let x={};
		/** @private @type {U} */
		let u=x;
		this.set_params(u);
		/** @private @type {Extract<T, {}>[keyof T]} */
		let v=x;
		this.set(k,v);
	}
	static {
		let y=new this({a: 1},{});
		y._use("a");
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
		window.yt_plugin?.get_data_saver().num_bitmap_console();
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
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {T_Split<X,string extends S?",":S>} */
function split_string(x,s=as(",")) {
	if(!x) {debugger;}
	let r=x.split(s);
	return as(r);
}
/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {T_SplitOnce<S,D>} */
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
	/** @protected @template T @arg {T[]} x */
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
	/** @protected @arg {unknown} x */
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
	/** @protected @template T @arg {NonNullable<T>} x @arg {T_GetTypeof<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @protected @template {{}} B @template {B} U @arg {{}} x @arg {B} _b @returns {Partial<B>} */
	upgrade_obj(x,_b) {
		/** @private @type {Partial<B>} */
		let cd=x;
		/** @private @type {Partial<U|B>} */
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
	/** @protected @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
	parse_url_search_params(t) {
		let sp=new URLSearchParams(t);
		/** @private @type {any} */
		let as_any=Object.fromEntries(sp.entries());
		return as_any;
	}
	/** @protected @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
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
/** @private @template T */
class BitmapResult {
	/** @constructor @public @arg {T[]} map_arr @arg {string} bitmap */
	constructor(map_arr,bitmap) {
		this.map_arr=map_arr;
		this.bitmap=bitmap;
	}
} class StoreData {
	/** @arg {Partial<ReturnType<StoreData['destructure']>>} src */
	constructor(src) {
		this.update(src);
	}
	/** @arg {[string,StoreData['seen_strings'][number][1][1][number]][]} new_data */
	get_string_store(new_data) {
		const {strings_key_index_map: index,seen_strings: data}=this;
		return {index,data,new_data};
	}
	/** @arg {[string,StoreData['seen_keys'][number][1][1][number]][]} new_data */
	get_keys_store(new_data) {
		const {seen_keys_index: index,seen_keys: data}=this;
		return {index,data,new_data};
	}
	get_seen_booleans() {
		return this.seen_booleans;
	}
	get_seen_root_visual_elements() {
		return this.seen_root_visual_elements;
	}
	/** @api @protected @type {[string,{t:boolean;f:boolean}][]} */
	seen_booleans=[];
	/** @api @protected @type {number[]} */
	seen_root_visual_elements=[];
	/** @api @protected @type {{[x:string]:number}} */
	strings_key_index_map={};
	/** @api @protected @type {{[x:string]:number}} */
	seen_keys_index={};
	/** @api @protected @type {[string,["one",string[]]|["many",string[][]]][]} */
	seen_keys=[];
	/** @api @protected @type {[string,["one",string[]]|["many",string[][]]][]} */
	seen_strings=[];
	/** @api @protected @type {[string,["one",number[]]|["many",number[][]]][]} */
	seen_numbers=[];
	get_seen_numbers() {
		return this.seen_numbers;
	}
	/** @api @public @arg {Partial<ReturnType<StoreData['destructure']>>} other */
	update(other) {
		const {seen_booleans,seen_numbers,seen_root_visual_elements,seen_strings,seen_keys}=other;
		if(seen_booleans) this.seen_booleans=seen_booleans;
		if(seen_numbers) this.seen_numbers=seen_numbers;
		if(seen_root_visual_elements) this.seen_root_visual_elements=seen_root_visual_elements;
		if(seen_strings) this.seen_strings=seen_strings;
		if(seen_keys) this.seen_keys=seen_keys;
	}
	/** @protected */
	destructure() {
		const {seen_booleans,seen_keys,seen_numbers,seen_root_visual_elements,seen_strings}=this;
		return {seen_booleans,seen_keys,seen_numbers,seen_root_visual_elements,seen_strings};
	}
}
class KnownDataSaver extends ApiBase {
	constructor() {
		super();
		this.#load_data();
		this.#store_data();
	}
	/** @private @type {{[x:string]:{arr:any[],set(o:{}):void}}} */
	save_key_objs={};
	do_save_keys_obj=false;
	/** @private @template {string} T @arg {`[${T}]`} x @returns {T} */
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
	/** @api @public @template {{}} T @arg {`[${string}]`} k @arg {T|undefined} x */
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
	/** @no_mod @arg {string} str @returns {Partial<ReturnType<StoreData['destructure']>>} */
	#parse_data(str) {
		let obj=JSON.parse(str);
		return obj;
	}
	#store_data() {
		let data=this.get_data_store();
		for(let v=0;v<data.get_seen_numbers().length;v++) {
			const j=data.get_seen_numbers()[v];
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
	#data_store=new StoreData({});
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
	/** @no_mod @arg {Partial<ReturnType<StoreData['destructure']>>} x */
	#push_data_to_parent(x) {
		let x1=this.get_data_store();
		x1.update(x);
	}
	/** @no_mod @type {string|null} */
	#seen_data_json_str=null;
	#loaded_from_storage=false;
	/** @no_mod @type {number|null|Nullable<{}>} */
	#idle_id=null;
	#onDataChange() {
		if(this.#idle_id!==null) return;
		this.#idle_id=requestIdleCallback(() => {
			this.#idle_id=null;
			this.#store_data();
		});
	}
	#get_string_store() {
		return this.#data_store.get_string_store(this.#new_strings);
	}
	/** @no_mod @type {[string,string|string[]][]} */
	#new_keys=[];
	#get_keys_store() {
		return this.#data_store.get_keys_store(this.#new_keys);
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
	/** @no_mod @type {[string,string|string[]][]} */
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
		/** @private @type {StoreDescription<string>['data'][number]} */
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
		if(this.do_random_breakpoint&&Math.random()>0.999) debugger;
		return true;
	}
	do_random_breakpoint=false;
	/** @api @public @arg {`[${string}]`} k_arg @arg {string|string[]} x */
	save_string(k_arg,x) {
		if(x===void 0) {debugger; return;}
		let k=this.unwrap_brackets(k_arg);
		let store=this.#get_string_store();
		let store_item=this.get_seen_string_item_store(k,store);
		if(!store_item) {
			store_item=[k,["one",[]]];
			let nk=store.data.push(store_item)-1;
			store.index[k]=nk;
		}
		let was_known=this.save_to_data_item(x,store_item);
		if(was_known<0) return false;
		this.#new_strings.push([k,x]);
		this.#onDataChange();
		console.log("store_str [%s] %o",k,x);
		let idx=store.data.indexOf(store_item);
		if(idx<0) {debugger; return;}
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
		let gg=this.get_data_store().get_seen_numbers().find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		let g1=gg[1];
		if(g1[0]==="many") return;
		let sr=g1[1].slice().sort((a,b) => a-b);
		this.save_number("[arr.tracking.trackingParams.f1]",sr);
		let bm=this.generate_bitmap_num(g1[1]).bitmap;
		this.save_string("[tp.f1.b_map]",bm.split("!").map((e,u) => [u,e].join("$")).join(","));
		this.#get_string_store().data.find(e => e[0]==="tp.f1.b_map")?.[1]?.[1];
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
		/** @private @type {0|1} */
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
		let gg=yt_plugin.ds.get_data_store().get_seen_numbers().find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1][0]==="many") return;
		gg[1][1].sort((a,b) => a-b);
		let g1=gg[1];
		/** @private @arg {string} str */
		function find_one_set_bit(str) {
			let rx=/(?<=0)1{1}(?=0)/g;
			/** @private @type {[number,string][]} */
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
	console_code_2() {
		"0:0!1:1".split("!").map(e => e.split(":").map(e => parseInt(e,10))).map((e,i) => [...e,i]).sort(([,a],[,b]) => a-b).map(([a,b,i]) => `${b}$${i}$${a}`);
	}
	/** @private @arg {number[]} bitmap_src */
	generate_bitmap_num(bitmap_src) {
		let {map_arr,bitmap}=this.generate_bitmap_num_raw(bitmap_src);
		let bitmap_rle=this.rle_enc(bitmap);
		return new BitmapResult(map_arr,bitmap_rle);
	}
	/** @no_mod @type {[string,number|number[]][]} */
	#new_numbers=[];
	/** @api @public @arg {`[${string}]`} key @arg {number|number[]} x */
	save_number(key,x) {
		if(x===void 0) {debugger; return;}
		let k=this.unwrap_brackets(key);
		let seen_numbers=this.get_data_store().get_seen_numbers();
		let was_known=true;
		/** @private @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=seen_numbers.find(e => e[0]===k);
		if(!p) {
			cur=["one",[]];
			p=[k,cur];
			seen_numbers.push(p);
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
	/** @no_mod @type {[string,{t:boolean;f:boolean}][]} */
	#new_booleans=[];
	/** @api @public @arg {string} key @arg {boolean} bool */
	save_boolean(key,bool) {
		let krc=this.#data_store.get_seen_booleans().find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.#data_store.get_seen_booleans().push(krc);
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
	/** @no_mod @type {number[]} */
	#new_root_visual_elements=[];
	/** @api @public @arg {number} x */
	save_root_visual_element(x) {
		if(x===void 0) {debugger; return;}
		if(this.#data_store.get_seen_root_visual_elements().includes(x)) return;
		console.log("store [root_visual_element]",x);
		this.#data_store.get_seen_root_visual_elements().push(x);
		this.#new_root_visual_elements.push(x);
		this.#onDataChange();
	}
}
const data_saver=new KnownDataSaver;
/** @private @template T,U */
class BaseServicePrivate extends ApiBase {
	//#region Public
	/** @constructor @public @arg {ResolverT<T,U>} x */
	constructor(x) {
		super();
		this.#x=x;
		/** @protected */
		this.ds=data_saver;
	}
	/** @protected */
	get x() {
		if(!this.#x.value) throw new Error();
		return this.#x.value;
	}
	/** @protected @this {BaseServicePrivate<Services,{}>} */
	get parser() {
		if(!this.#x.value) throw new Error();
		return this.#x.value.get("parser_service");
	}
	/** @protected @this {BaseServicePrivate<Services,{}>} */
	get codegen() {
		if(!this.#x.value) throw new Error();
		return this.#x.value.get("codegen");
	}
	/** @protected @arg {`[${string}]`} k @arg {string|string[]} x */
	save_string(k,x) {
		this.ds.save_string(k,x);
	}
	/** @protected @arg {`[${string}]`} k @arg {boolean} x */
	save_boolean(k,x) {
		this.ds.save_boolean(k,x);
	}
	/** @protected @arg {`[${string}]`} k @arg {number|number[]} x */
	save_number(k,x) {
		this.ds.save_number(k,x);
	}
	//#endregion
	#x;
}
/** @private @template C_T,C_U @extends {BaseServicePrivate<C_T,C_U>} */
class BaseService extends BaseServicePrivate {
	/** @protected @arg {string} x */
	create_param_map(x) {
		let res_e=this._decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @typedef {number|string|['bigint',number[], bigint]|['group',D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]|ParamMapType} ParamMapValue */
	/** @typedef {Map<number,ParamMapValue[]>} ParamMapType */
	/** @typedef {{[x:number]:number|string|ParamObjType}} ParamObjType */
	/** @protected @arg {D_DecTypeNum[]} res_e */
	make_param_map(res_e) {
		/** @private @type {ParamMapType} */
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
				case "data_fixed64": do_set(param[1],["bigint",[],param[2]]); break;
				case "data_fixed32":
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
				case "data64": do_set(param[1],["bigint",param[2],param[3]]); break;
				case "group": do_set(param[1],['group',param[2]]); break;
				case "info": debugger; break;
				case "struct": debugger; break;
				case "error": return null;
				default: debugger; break;
			}
		}
		return ret_map;
	}
	/** @protected @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
	join_string(x,s) {
		if(!x) {debugger;}
		let r=x.join(s);
		return as(r);
	}
	/** @protected @template {string} T @arg {T} str @returns {UrlParse<T>} */
	parse_with_url_parse(str) {
		let s=new URL(str);
		/** @private @type {any} */
		let a=s;
		/** @private @type {UrlParse<T>} */
		let ret=a;
		return ret;
	}
	/** @private @arg {string} str */
	_decode_b64_proto_obj(str) {
		let buffer=base64_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @private */
	_use() {
		this._decode_b64_proto_obj(btoa("\0"));
	}
	static {
		let y=new this({value: new ServiceResolver({},{})});
		y._use();
	}
	/** @protected @arg {string} str */
	_decode_b64_url_proto_obj(str) {
		let buffer=base64_url_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @protected @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,`${string}${U}`>} */
	_2_str_ends_with(x,v) {
		return x.endsWith(v);
	}
	/** @protected @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with(needle,str) {
		return str.startsWith(needle);
	}
	/** @protected */
	get TODO_true() {
		return true;
	}
	/** @protected @template {string} T @template {`${T}${"_"|"-"}${string}`} U @arg {T} ns @arg {U} s */
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
		/** @private @type {T_SplitOnce<NonNullable<T_SplitOnce<U,T>[1]>,"">[1]} */
		let no_ns_part=nn[1];
		this.save_string(`[${ns_name}::${ns}]`,no_ns_part);
	}
	/** @protected @template {string} T @template {string} Sep @template {`${T}${Sep}${string}`} U @arg {T} enum_base @arg {U} enum_str @arg {Sep} sep */
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
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {T_SplitOnce<T,U>[number]} */
	drop_separator(x,sep) {
		let v=split_string_once(x,sep);
		if(v[0]) return v[0];
		let q=v[1];
		if(q) return q;
		return x;
	}
	/** @protected @template {{}} T @arg {T} obj @returns {(keyof T)[]} */
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
	/** @protected @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]}  */
	z(x,f) {
		if(x===void 0) {debugger; return [[],[]];}
		if(!x.entries) {debugger; return [[],[]];}
		/** @private @type {any[]} */
		let c=[];
		/** @private @type {any[]} */
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
	/** @private @type {string[]} */
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
	/** @protected @template {GetMaybeKeys<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {T[SI]} */
	w(x,excl=[]) {
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		if(keys.length!==1) debugger;
		let k=keys[0];
		let r=x[k];
		return r;
	}
	/** @protected @template {GetMaybeKeys<T>} K @template {{}} T @arg {T} x @arg {(x:T[K])=>void} f */
	y(x,f) {f.call(this,this.w(x));}
	/** @protected @template U @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t(x,f) {if(!x) return; return f.call(this,x);}
	/** @protected @template {{}} T @arg {T[]|undefined} x @arg {(this:this,x:T)=>void} f */
	tz(x,f) {
		if(!x) return;
		this.z(x,f);
	}
	/** @protected @template {string} CF_T @arg {CF_T} cf @template {{}} T @arg {T|undefined} x @arg {(this:this,cf:CF_T,x:T)=>void} f */
	t_cf(cf,x,f) {
		if(x===void 0) return;
		f.call(this,cf,x);
	}
	/** @protected @arg {string} cf @template {{}} T @arg {T[]|undefined} x @arg {(this:this,cf:string,x:T)=>void} f */
	tz_cf(cf,x,f) {
		if(x===void 0) return;
		this.z_cf(cf,x,f);
	}
	/** @private @arg {string} cf @template {{}} U @arg {U[]} x @arg {(this:this,cf:string,x:U,i:number)=>void} f  */
	z_cf(cf,x,f) {
		if(x===void 0) {debugger; return;}
		if(!x.entries) debugger;
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			f.call(this,cf,a,i);
		}
	}
	/** @private @arg {U|null} _rv @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t_ex(_rv,f,x) {if(!x) return; return f.call(this,x);}
	/** @protected @template U @template {{}} T @arg {(this:this,x:T)=>U} f */
	tf(f) {
		/** @returns {U|null} */
		function mu() {return null;}
		/** @param {T|undefined} x @returns {U|undefined} */
		return x => this.t_ex(mu(),f,x);
	}
	/** @private @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
	filter_out_keys(keys,to_remove) {
		to_remove=to_remove.slice();
		/** @private @type {Exclude<typeof keys[number],typeof to_remove[number]>[]} */
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
	/** @protected @type {KnownDataSaver['save_keys']} @arg {`[${string}]`} k @arg {{}|undefined} x */
	save_keys(k,x) {
		return this.ds.save_keys(k,x);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class YtHandlers extends BaseService {
	/** @api @public @arg {{}} item */
	filter_renderer_contents_item(item) {
		let keys=this.get_keys_of(item);
		for(let key of keys) {
			let is_blacklisted=this.blacklisted_item_sections.get(key);
			if(is_blacklisted!==void 0) return !is_blacklisted;
			console.log("filter_handlers: new item section at itemSectionRenderer.contents[]: ",key);
		}
		return true;
	}
	/** @constructor @public @arg {ResolverT<Services,ServiceOptions>} res */
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
	/** @api @public @arg {string|URL|Request} request @arg {Response} response @arg {{}} data */
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
		/** @private @type {D_ApiUrlFormat} */
		let api_url=as(parsed_url.href);
		let ht=this.x.get("response_types_handler");
		let url_type=ht.decode_url(api_url);
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
		let res=ht.decode_input(url_type,data);
		ht.run(response,res);
		this.iteration.default_iter({t: this,path: url_type},data);
	}
	/** @private @arg {UrlTypes|`page_type_${YTNavigateFinishDetail["pageType"]}`} path @arg {GD_SD_Item} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @private @type {D_AnySaved} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,search,channel,playlist",",");
	do_initial_data_trace=false;
	/** @api @public @arg {[()=>YTNavigateFinishDetail["response"], object, []]} apply_args */
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
	/** @api @public @arg {YTNavigateFinishDetail} detail */
	on_page_type_changed(detail) {
		try {
			if(this.do_initial_data_trace) console.log('ptc detail',detail);
			this.x.get("ht_caller").run(detail);
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
		/** @private @type {G_RichSection} */
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
	/** @api @public @template {R_BrowseFeed[]|G_WatchNext[]|G_CommentsSection[]|G_SectionItem[]} T @arg {T} arr @returns {T} */
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
	/** @handler @public @arg {ApiIterateState} state @arg {G_AppendContinuationItems} action */
	appendContinuationItemsAction(state,action) {
		if(!action.continuationItems) {
			debugger;
		}
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(action.continuationItems);
		if(filtered.length>0) {
			action.continuationItems=filtered;
		}
	}
	/** @handler @public @arg {ApiIterateState} state @arg  {DC_ReloadContinuationItems} command */
	reloadContinuationItemsCommand({t: state},command) {
		if(!command.continuationItems) {
			debugger;
		}
		let filtered=state.handlers.renderer_content_item_array.replace_array(command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @handler @public @template {{}} T1 @template T2,T3  @arg {ApiIterateState} state @arg {TD_ItemSection_3<T1,T2,T3>} renderer */
	itemSectionRenderer_with_state(state,renderer) {
		let {t}=state;
		t.iteration.default_iter(state,renderer);
		if(renderer.contents===void 0) return;
		renderer.contents=renderer.contents.filter(state.t.filter_renderer_contents_item,state.t);
	}
	/** @handler @public @arg {ApiIterateState} state @arg {Todo_D_RichGrid} renderer */
	richGridRenderer(state,renderer) {
		state.t.handlers.rich_grid.richGridRenderer$(state.path,renderer);
		state.path="richGridRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @handler @public @arg {ApiIterateState} state @arg {{}} renderer */
	compactVideoRenderer(state,renderer) {
		state.path="compactVideoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @handler @public @arg {ApiIterateState} state @arg {{}} renderer */
	thumbnailOverlayToggleButtonRenderer(state,renderer) {
		state.path="thumbnailOverlayToggleButtonRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/** @handler @public @arg {ApiIterateState} state @arg {{}} renderer */
	videoRenderer(state,renderer) {
		state.path="videoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class IterateApiResultBase extends BaseService {
	obj_visitor;
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x @arg {YtObjectVisitor} obj_visitor */
	constructor(x,obj_visitor) {
		super(x);
		this.obj_visitor=obj_visitor;
		/** @private @type {Map<string,keyof YtObjectVisitor>} */
		this.keys_map=new Map;
		let keys=this.get_keys_of_ex(obj_visitor);
		for(let i of keys) {
			this.keys_map.set(i,i);
		}
	}
	/** @api @public @arg {ApiIterateState} state @arg {{}} data */
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
			/** @private @type {{[x: string]: any}} */
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
	/** @private @type {(T_RidFormat<string>)[]} */
	rid_keys=[
		"GetAccountAdvanced_rid","GetAccountBilling_rid","GetAccountDownloads_rid","GetAccountMenu_rid","GetAccountNotifications_rid","GetAccountOverview_rid","GetAccountPlayback_rid","GetAccountPrivacy_rid","GetAccountSharing_rid","GetAccountsList_rid","GetAttestationChallenge_rid","GetGamingDestination_rid","GetHistory_rid","GetHome_rid","GetLibrary_rid","GetLiveChatReplay_rid","GetNotificationsMenu_rid","GetPlayer_rid","GetPlaylist_rid","GetReelItemWatch_rid","GetReelWatchSequence_rid","GetSubscriptions_rid","GetUnseenNotificationCount_rid","GetVideoTranscript_rid","GetWatchNext_rid","GetWatchPageWebCommentReplies_rid","GetWatchPageWebTopLevelComments_rid","GetWebMainAppGuide_rid","RecordNotificationInteractions_rid","RemoveLike_rid",
		"SetSetting_rid",
		"Like_rid",
		"GetAddToPlaylist_rid",
		"EditPlaylist_rid",
	];
	/** @private @arg {{key:T_RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_param_key(x) {
		this.decode_rid_section(x);
		this.save_string("[rid_key]",x.key);
	}
	/** @private @arg {{key:T_RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_section(x) {
		let section=/[A-Z][a-z]+/.exec(x.key);
		if(section) {
			let section_id=section[0].toLowerCase();
			this.save_string("[section_id]",section_id);
		} else {
			debugger;
		}
	}
	/** @private @arg {{key:T_RidFormat<string>;value:`0x${string}`}} param */
	parse_rid_param(param) {
		this.decode_rid_param_key(param);
		if(param.key in this.rid) {
			/** @private @type {T_RidFormat<string>} */
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
	/** @private @type {{[x: T_RidFormat<string>]: `0x${string}`|undefined;}} */
	rid={};
	/** @constructor @public @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		super(x);
		this.data={
			/** @private @type {D_BrowseEndpointPages|null} */
			yt_fn: null,
			/** @private @type {RC_CsiServiceC["value"]|null} */
			c: null,
			/** @private @type {RC_CsiVarTypes["cver"]|null} */
			cver: null,
			/** @private @type {"1"|null} */
			yt_li: null,
			/** @private @type {"1"|null} */
			yt_ad: null,
		};
		for(let x of this.rid_keys) {
			this.rid[x]=void 0;
		}
	}
	/** @private @arg {D_BrowseEndpointPages} value */
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
	/** @api @public @arg {DRC_Csi_SPs} params */
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
		/** @private @type {{name:RC_ECatcherClientName['value'];fexp:number[];version:RC_SomeVer<RC_CsiVarTypes["cver"]>}|null} */
		client: null,
		expected_client_values: {
			/** @private @type {number[]} */
			fexp: [
				[17_14247],
				[94_05964],
				[238_04281,23848210,23882502],
				[239_18597,23934970,23946420,23966208,23983296,23986033,23998056],
				[240_02022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738],
				[241_08447,24120820,24124511,24128088,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24181174,24187043,24187377,24197450],
				[242_00839,24211178,24217535,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24288664,24290971,24291857,24292955,24390675,24396645],
				[244_01504,24402891,24404640,24406313,24406621,24407190,24408888,24414718,24415864,24415866,24416290,24419549,24422508,24424806,24424807,24426636,24429095,24432597,24433679,24434209,24436009,24437575,24438162,24438848,24439361,24439483,24440901,24440903,24441244,24442137,24443373,24447336,24448074,24448246,24450199,24450571,24451033,24452012,24453_129,24453_162,24453_860,24453_874,24453_942,24454_357,24454_363],
				[245_90921,24591046,24591048],
				[246_12269,24613467,24613789,24614043,24615363,24615479,24615664,24615733],
				[393_21826,39321827,39322504,39322574,39322870,39322873,39322953,39322980,39322983,39323013,39323016,39323020,39323023,39323117,39323120],
				[456_86551],
				[24440132,24449113,24450200,24453859,24454920,24458318,24458456],
				[24457196,24294553,24455879],
				[24457638],
			].flat(),
		},
	};
	/** @private @type {number[]} */
	seen_new_expected=[];
	/** @api @public @arg {number[]} x */
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
			if(is_firefox) {
				console.log("[new_fexp_expected]",new_expected);
				return;
			}
			let fexp_log_val;
			if(new_expected.length>1) {
				fexp_log_val=new_expected;
			} else {
				fexp_log_val=new_expected[0];
			}
			if(fexp_log_val instanceof Array) {
				console.log("[new_fexp_expected]",fexp_log_val);
				return;
			}
			console.log("[new_fexp_expected][%o]",fexp_log_val);
		}
		this.data.expected_client_values.fexp;
	}
	/** @api @public @arg {RC_ECatcher_SPs["params"]} params */
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
	/** @private @type {string[]} */
	seen_e_param=[];
	has_new_e_param=false;
	/** @private @arg {Extract<RC_To_SPs<GFeedbackVarMap>[number],{key:"e"}>} param */
	parse_e_param(param) {
		if(this.seen_e_param.includes(param.value)) return;
		this.seen_e_param.push(param.value);
		let inner=param.value.split(",").map(e => parseInt(e,10));
		this.data.e=inner;
		this.has_new_e_param=true;
	}
	/** @api @public @arg {{context: D_ContextTypeStr|null;}} data_target @arg {D_ContextTypeStr} x */
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
	/** @api @public @arg {GFeedbackServiceParamsType} params */
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
	/** @api @public @arg {RC_GuidedHelp_SPs["params"]} params */
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
	/** @private @arg {RC_Csi_SPs} service */
	on_csi_service(service) {
		this.x.get("csi_service").on_params(service.params);
	}
	/** @private @arg {RC_ECatcher_SPs} service */
	on_e_catcher_service(service) {
		this.x.get("e_catcher_service").on_params(service.params);
	}
	/** @private @arg {RC_GFeedback_SPs} service */
	on_g_feedback_service(service) {
		this.x.get("g_feedback_service").on_params(service.params);
	}
	/** @private @arg {RC_GuidedHelp_SPs} service */
	on_guided_help_service(service) {
		this.x.get("guided_help_service").on_params(service.params);
	}
	get handle_types() {
		return this.x.get("handle_types");
	}
	/** @private @arg {RC_GoogleHelp_SPs} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.parser.parse_browse_id(param.value); break;
				default: console.log("[new_param_key]",param); debugger;
			}
		}
	}
	/** @api @public @arg {GRC_ServiceTrackingParams} service_arg */
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
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		class HT_Caller extends HandleTypes {
			/** @public @arg {YTNavigateFinishDetail} detail */
			run(detail) {
				this.YTNavigateFinishDetail.call(this.x.get("handle_types"),detail);
			}
		}
		class RT_Caller extends HandleTypes {
			/** @public @arg {Response} response @arg {G_ResponseTypes} x */
			run(response,x) {
				this.ResponseTypes.call(this.x.get("handle_types"),response,x);
			}
			/** @public @arg {UrlTypes} url_type @arg {{}} x @returns {G_ResponseTypes} */
			decode_input(url_type,x) {
				return this.get_res_data(url_type,x);
			}
			/** @public @arg {D_ApiUrlFormat} url */
			decode_url(url) {
				return this.use_template_url(url);
			}
		}
		this.ht_caller=new HT_Caller(x);
		this.response_types_handler=new RT_Caller(x);
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
	/** @private @type {[(obj: Blob|MediaSource) => string,typeof URL,Blob|MediaSource][]} */
	leftover_args=[];
	modify_global_env() {
		let yt_handlers=this.x.get("yt_handlers");
		/** @private @arg {string|URL|Request} request @arg {Response} response @arg {G_Response} response_obj */
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
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x */
	constructor(x) {
		super(x);
		inject_api.modules??=new Map;
		inject_api.modules.set("yt",this);
	}
	/** @api @public @template {{name:string}} T @arg {T} function_obj */
	add_function(function_obj) {
		if(!this.saved_function_objects) return;
		this.saved_function_objects.push([function_obj.name,function_obj]);
	}
	get_data_saver() {
		return this.ds;
	}
}
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox();
//#endregion
//#region HelperServices
class DatabaseArguments {
	/** @constructor @public @arg {string} name @arg {number} version */
	constructor(name,version) {
		this.name=name;
		this.version=version;
	}
}
/** @extends {BaseService<Services,ServiceOptions>} */
class IndexedDbAccessor extends BaseService {
	/** @constructor @public @arg {ResolverT<Services, ServiceOptions>} x @arg {string} db_name */
	constructor(x,db_name,version=1) {
		super(x);
		this.db_args=new DatabaseArguments(db_name,version);
	}
	database_opening=false;
	database_open=false;
	/** @private @type {Map<string,number>} */
	index=new Map;
	/** @private @type {{v: string}[]} */
	arr=[];
	/** @private @type {{v: string}[]} */
	committed_data=[];
	/** @api @public @template {{v: string}} T @arg {T} obj */
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
	/** @private @template {{v: string}} T @arg {T} obj */
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
		const store_name="video_id";
		const store=transaction.objectStore(store_name);
		this.consume_data_with_store(store_name,store);
	}
	/** @private @arg {"video_id"} store_name @arg {IDBObjectStore} store */
	consume_data_with_store(store_name,store) {
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
				if(is_firefox) {
					console.log(`database [%s:%s] has${"%o"}items`,this.db_args.name,store_name,database_data.length);
				} else {
					console.log("database [%s:%s] has %o items",this.db_args.name,store_name,database_data.length);
				}
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
	/** @constructor @public @arg {string} gen_name @arg {string[]} keys */
	constructor(gen_name,keys) {
		this.object_count=0;
		this.gen_name=gen_name;
		this.key_keep_arr=keys;
		this.k1="";
		/** @api @public @type {{}[]} */
		this.object_store=[];
		/** @api @public @type {Map<{},[number,string]>} */
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
			return `this.E_${u}(${k});`;
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
		ret_arr.push(`const {${keys.join()},...y}=this.sd(cf,x); this.g(y);`);
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
			if("simpleText" in x2) {ret_arr.push(`this.R_SimpleText(${k});`); continue;};
			/** @private @type {R_TextRuns} */
			if("runs" in x2&&x2.runs instanceof Array) {ret_arr.push(`this.R_TextRuns(${k});`); continue;};
			if(x2 instanceof Array) {this.#generate_body_array_item(k,x2,ret_arr); continue;}
			/** @private @type {D_Thumbnail} */
			if(this.#is_Thumbnail(x2)) {ret_arr.push(`this.D_Thumbnail(${k});`); continue;}
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
		if(mn===def_name) mn=`D_${tn}`;
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
				ret_arr.push(`this.z(${k},this.E_${ic});`);
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
			let kk=keys.map(x => this.uppercase_first(x)).find(v => v===e);
			if(!kk) {debugger; return "";}
			/** @private @type {{}} */
			let ucx=x;
			/** @private @type {{[x:string]:unknown}} */
			let x1=ucx;
			let val_2=x1[kk];
			if(typeof val_2!=="object") return "";
			if(val_2===null) return "";
			let keys_2=Object.keys(val_2);
			/** @private @type {string[]} */
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
	/** @private @type {string[]} */
	typedef_cache=[];
	/** @api @public @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] @returns {string|null|void} */
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
		const max_str_len=120;
		if(k1==="apiUrl") return o;
		if(k1==="targetId") return o;
		if(k1==="panelIdentifier") return o;
		if(o.match(/^[A-Z][A-Z_]+[A-Z]$/)) {
			return o;
		}
		if(o.startsWith("https://")) return o;
		if(o.startsWith("http://")) return o;
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
			if(o.startsWith("RD")) return "TYPE::`RD${string}`";
			if(o.startsWith("PL")) return `TYPE::\`PL$\{string}\``;
			debugger;
			return "TYPE::string";
		}
		if(k1=="videoId") {console.log("[video_id_json]",o); return "TYPE::string";}
		console.log("[unique_chars_count]",k1,[...new Set(o.split("").sort())].join("").length);
		return o;
	}
	/** @arg {{[U in string]: unknown}} x */
	is_GuideEntrySimple(x) {
		return x.navigationEndpoint
			&&x.icon
			&&x.trackingParams
			&&x.formattedTitle
			&&x.accessibility;
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
		/** @type {{[U in string]: unknown}} */
		let b=x;
		x: if(this.is_GuideEntrySimple(b)&&typeof b.icon==="object"&&b.icon) {
			/** @type {{iconType?:string}} */
			let ru=b.icon;
			if(!ru.iconType) break x;
			/** @arg {unknown} u @returns {{[x: string]: unknown}|null} */
			function o(u) {
				if(typeof u==='object') {
					/** @type {{}|null} */
					let c=u;
					return c;
				}
				return null;
			}
			let kk=this.get_keys_of(b);
			if(this.eq_keys(kk,["navigationEndpoint","icon","trackingParams","formattedTitle","accessibility","entryData"])) {
				if(!o(b.navigationEndpoint)?.browseEndpoint) {
					/** @type {TD_GuideEntry_EntryData<any>} */
					console.log("[Generate.TD_GuideEntry_EntryData.wrong_endpoint]",this.get_keys_of(b));
					break x;
				}
				return `TYPE::TD_GuideEntry_EntryData<"${ru.iconType}">`;
			}
			/** @type {TD_GuideEntry_Simple<any>} */
			if(!this.eq_keys(kk,["navigationEndpoint","icon","trackingParams","formattedTitle","accessibility"])) {
				console.log("[Generate.TD_GuideEntry_Simple.keys.overflow]",this.get_keys_of(b));
				break x;
			}
			return `TYPE::TD_GuideEntry_Simple<"${ru.iconType}">`;
		}
		if(k1==="") return x;
		/** @private @type {RC_ResponseContext} */
		if(k1==="responseContext") return "TYPE::RC$ResponseContext";
		/** @private @type {A_FrameworkUpdates} */
		if(k1==="frameworkUpdates") return "TYPE::A_FrameworkUpdates";
		/** @private @type {D_LoggingDirectives} */
		if(k1==="loggingDirectives") return "TYPE::A_LoggingDirectives";
		if(k1==="subscriptionButton") return "TYPE::D_SubscriptionButton";
		if(k1==="upcomingEventData") return "TYPE::D_UpcomingEvent";
		let res_type=this.get_replacement_json(state,gen_name,x);
		if(res_type!==null) return res_type;
		if(key_keep_arr.includes(k1)) return x;
		state.object_count++;
		if(state.object_count<3) return x;
		return {};
	}
	/** @private @arg {JsonReplacerState} state @arg {string} k1 @arg {unknown} rep */
	json_replacer(state,k1,rep) {
		/** @private @type {unknown} */
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
		/** @private @type {JsonReplacerState} */
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
		tc=tc.replaceAll(/,$/gm,"");
		tc=tc.replaceAll(/[^[{;,]$/gm,a => `${a};`);
		let ret;
		if(typeof gen_name==="number") {
			ret=`\ntype ArrayType_${gen_name}=${tc}\n`;
		} else {
			ret=`\ntype ${gen_name}=${tc}\n`;
		}
		return ret;
	}
	/** @private @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} x */
	get_replacement_json(state,r,x) {
		let g=() => this.json_auto_replace(x);
		if(state.k1==="webCommandMetadata") return x;
		/** @private @type {R_TextRuns} */
		if(x.runs&&x.runs instanceof Array) return "TYPE::R_TextRuns";
		/** @private @type {D_Thumbnail} */
		if(x.thumbnails&&x.thumbnails instanceof Array) return "TYPE::D_Thumbnail";
		/** @private @type {R_SimpleText} */
		if(x.simpleText) return "TYPE::R_SimpleText";
		/** @private @type {T_Icon<"">} */
		if(x.iconType&&typeof x.iconType==="string") return `TYPE::T_Icon<"${x.iconType}">`;
		if(x.signal) return this.decode_Signal(x);
		x: if(x.thumbnail&&x.navigationEndpoint&&x.accessibility) {
			let pi=state.parent_map.get(x);
			if(!pi) break x;
			if(pi[1]==="owner") {
				return "TYPE::D_Video_Owner";
			}
			console.log(pi);
			debugger;
		}
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
	/** @param {{[U in string]:unknown}} x @returns {string} */
	get_auto_type_name(x) {
		let type_name=this.json_auto_replace_1(x);
		if(type_name==="MetadataBadgeRenderer") {
			return "RMD_Badge";
		}
		x: if(type_name==="OpenPopupAction"&&typeof x.openPopupAction==="object") {
			if(!x.openPopupAction) break x;
			let gn=this.get_name_from_keys(x.openPopupAction);
			if(!gn) break x;
			let gr=this.#_codegen_new_typedef(x.openPopupAction,gn);
			if(!gr) break x;
			let sr=split_string_once(gr.split("\n").map(e => e.trim()).join(""),"=")[1];
			if(!sr) break x;
			return "TA_OpenPopup<"+sr+">";
		}
		if(type_name.endsWith("Action")) {
			let real_val=split_string_once(type_name,"Action")[0];
			if(real_val==="OpenPopup") return type_name;
			return `A_${real_val}`;
		}
		if(type_name.endsWith("Command")) {
			let real_val=split_string_once(type_name,"Command")[0];
			return `C_${real_val}`;
		}
		if(type_name.endsWith("Endpoint")) {
			let real_val=split_string_once(type_name,"Endpoint")[0];
			return `E_${real_val}`;
		}
		if(type_name.endsWith("Renderer")) {
			let real_val=split_string_once(type_name,"Renderer")[0];
			return `R_${real_val}`;
		}
		return type_name;
	}
	/** @param {{[U in string]:unknown}} x */
	json_auto_replace(x) {
		let type_name_str=this.get_auto_type_name(x);
		return `TYPE::${type_name_str}`;
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
		/** @private @type {G_ClientSignal} */
		let u=as(x);
		switch(u.signal) {
			case "CLIENT_SIGNAL": if(u.actions instanceof Array) return `TYPE::GS_Client`; break;
			default: console.log("[need to decode signal] [%s]",u.signal);
		}
		debugger;
		return x;
	}
	/** @private @arg {JsonReplacerState} state @arg {string|null} r @param {{[U in string]:unknown}} b @arg {string[]} keys */
	get_json_replace_type_len_1(state,r,b,keys) {
		let g=() => this.json_auto_replace(b);
		let hg=false
			||false
			//#region action
			||b.addChatItemAction
			||b.appendContinuationItemsAction
			||b.changeEngagementPanelVisibilityAction
			||b.changeEngagementPanelVisibilityAction
			||b.createAction
			||b.getMP_MenuAction
			||b.hideEngagementPanelScrimAction
			||b.openPopupAction
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
			||b.showReloadUiCommand
			||b.updateToggleButtonStateCommand
			//#endregion
			//#region endpoint
			||b.addToPlaylistServiceEndpoint
			||b.addUpcomingEventReminderEndpoint
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
			||b.userFeedbackEndpoint
			||b.watchEndpoint
			||b.watchPlaylistEndpoint
			||b.ypcGetOffersEndpoint
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
			||b.channelThumbnailWithLinkRenderer
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
			||b.movingThumbnailRenderer
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
			||b.subscriptionNotificationToggleButtonRenderer
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
			||b.toggleButtonRenderer
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
			//#region other
			||b.engagementPanelPopupPresentationConfig
			||b.html5PlaybackOnesieConfig
			||b.twoColumnWatchNextResults
			//#endregion
			;
		if(hg) {
			let hr=g();
			if(hr.endsWith("Command")) {
				let sq=split_string_once(hr,"Command");
				if(sq[1]==="") {
					return `TYPE::C_${split_string_once(sq[0],"TYPE::")[1]}`;
				}
				console.log(sq);
				debugger;
			}
			return hr;
		}
		if(b.webCommandMetadata) {
			state.key_keep_arr.push(...Object.keys(b.webCommandMetadata));
			return b;
		}
		/** @private @type {D_Accessibility} */
		if(b.accessibilityData) return "TYPE::D_Accessibility";
		/** @private @type {R_GuideEntryData} */
		if(b.guideEntryData) return "TYPE::R_GuideEntryData";
		if(b.styleType&&typeof b.styleType==="string") return `TYPE::T_StyleType<"${b.styleType}">`;
		if(b.browseId==="FEsubscriptions"&&keys.length===1) return "TYPE::DE_VE96368_Browse";
		console.log("[no_json_replace_type_1] %o [%s] [%s]",b,keys.join(","),g(),"\n",r);
		debugger;
		return null;
	}
	/** @api @public @arg {string} x1 */
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
	/** @unused_api @protected @arg {{}} x @arg {string} r */
	use_generated_members(x,r) {
		let td=new Generate(this);
		td.generate_typedef_and_depth(x,r);
		return td;
	}
	/** @api @public @arg {unknown} x @arg {string|null} r @arg {boolean} [w] */
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
	/** @api @public @arg {YTNavigateFinishDetail['pageType']} x */
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
	/** @api @public @arg {PlaylistId} x */
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
			if(pl.length===11) return;
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
	/** @console_api @public @arg {G_MimeTypeFormat} x */
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
	/** @private @arg {G_CodecType} x */
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
	/** @private @arg {Extract<T_SplitOnce<ParseUrlStr_1,"/">,["api",...any]>} x */
	parse_api_url(x) {
		let a=split_string_once(x[1],"/");
		switch(a[0]) {
			case "stats": this.parse_api_stats_url(a[1]); break;
		}
	}
	/** @private @arg {R_ParseApiUrlStr} x */
	parse_api_stats_url(x) {
		const cf="parse_api_stats_url";
		let a=split_string_once(x,"?");
		switch(a[0]) {
			case "ads": {
				/** @private @type {D_ApiStatsAdsStr} */
				let sp=as(a[1]);
				let v=this.parse_url_search_params(sp);
				this.save_keys(`[${cf}.ads]`,v);
				// spell:disable-next
				const {ver,ns,event,device,content_v,el,ei,devicever,bti,break_type,conn,cpn,lact,m_pos,mt,p_h,p_w,rwt,sdkv,slot_pos,vis,vol,wt,sli,slfs,loginael,...y}/*!*/=v; this.g(y);
			} break;
			default: debugger; break;
		}
	}
	/** @private @arg {Extract<T_SplitOnce<ParseUrlStr_1,"/">,["channel",...any]>} x */
	parse_channel_url(x) {
		if(this.str_starts_with_at_1(x,"UC")) {
			return;
		}
		console.log("[parse_channel_url]",x);
	}
	/** @unused_api @protected @arg {`UC${string}`} x */
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
	/** @private @arg {string} x */
	parse_video_id(x) {
		this.x.get("indexed_db").put({v: x});
	}
	/** @private @arg {Extract<T_SplitOnce<ParseUrlStr_1,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		this.x.get("indexed_db").put({v: x[1]});
	}
	/** @private @arg {Extract<T_SplitOnce<ParseUrlStr_1,"/">,["feed",any]>} x */
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
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
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
	/** @private @arg {P_ParamsSection} root @arg {Extract<T_SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url(root,x) {
		let vv=split_string(x,"&");
		/** @private @type {YtUrlInfoItem[]} */
		let url_info_arr=[];
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @private @type {T_SplitOnce<typeof prop,"=">} */
			let res=split_string_once(prop,"=");
			switch(res[0]) {
				case "v": {
					let value=res[1];
					url_info_arr.push({_tag: "video",id: value});
				} break;
				case "list": {
					let v=res[1];
					if(this.str_starts_with("RD",v)) {
						if(this.str_starts_with("RDMM",v)) {
							url_info_arr.push({_tag: "playlist",type: "RDMM",id: v.slice(4)});
						} else if(this.str_starts_with("RDGM",v)) {
							url_info_arr.push({_tag: "playlist",type: "RDGM",id: v.slice(4)});
						} else if(this.str_starts_with("RDCM",v)) {
							// url_info[playlist] "RDCM" still needs a valid `UC${string}` channel id
							url_info_arr.push({_tag: "playlist",type: "RDCM",id: v.slice(4)});
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
				case "playnext": url_info_arr.push({_tag: "play-next",value: res[1]}); break;
				default: res[0]===""; debugger;
			}
		}
		this.log_url_info_arr(url_info_arr);
	}
	/** @console_api @public @arg {string} x */
	create_param_map_dbg(x) {
		debugger;
		let res_e=this._decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @private @arg {ParamMapType} x */
	parse_get_transcript(x) {
		/** @private @type {ParamMapValue[]} */
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
		/** @private @type {{videoId:string,langParams:string,unk3:1,targetId:"engagement-panel-searchable-transcript-search-panel",unk6:1,unk7:1,unk8:1}|null} */
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
			let param_buf_1=this._decode_b64_url_proto_obj(param_1);
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
	/** @api @public @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	on_endpoint_params(root,path,x) {
		if(x===void 0) {debugger; return;}
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		switch(root) {
			case "D_TemplateUpdate": {
				let buffer=base64_url_dec.decodeByteArray(x);
				if(!buffer) return;
				let reader=new MyReader(buffer);
				reader.pos+=1;
				let res_e=reader.try_read_any();
				if(!res_e) return;
				let [_ru,...ex]=res_e;
				let bi=ex[0];
				if(bi[0]==="data64") {
					let ui=bi[3];
					let rem=ui%300n;
					if(rem>0n) debugger;
					let nu=Number(ui/300n)/1000;
					console.log("[TemplateTime]",nu);
				}
				let param_map=this.make_param_map(res_e);
				this.parse_endpoint_param(root,path,new Map(param_map));
				return;
			}
		}
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		switch(root) {
			case "DE_GetTranscript": return this.parse_get_transcript(param_map);
		}
		this.parse_endpoint_param(root,path,new Map(param_map));
	}
	/** @api @public @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
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
	/** @unused_api @protected @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	on_serialized_interactions_request_params(root,path,x) {
		if(this.cache_interaction_requests.includes(x)) return;
		this.cache_interaction_requests.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_serialized_interactions_request(root,path,param_map);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapType} map */
	parse_serialized_interactions_request(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		parse_key(2);
		parse_key(5);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		debugger;
	}
	parse_key_index=1;
	/** @unused_api @protected @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta */
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
	/** @private @arg {P_PathRoot} path @arg {number[]} map_keys @arg {ParamMapValue} map_entry_value @arg {number|null} map_entry_key */
	get_parse_fns(path,map_keys,map_entry_value,map_entry_key=null) {
		let path_parts=split_string(path,".");
		/** @private @arg {number} idx */
		let gd=(idx) => {console.log("[param_next.next_new_ns]",path_parts.join(".")); gen_next_part(idx);};
		/** @private @arg {number} idx */
		let u=idx => this.grouped(path_parts.join("$"),() => gd(idx));
		/** @private @arg {number} idx */
		let gen_next_part=(idx) => {
			let pad="\t\t\t";
			if(idx>path_parts.length) return;
			let case_part="";
			let value_part=`${pad}\t\tswitch(map_entry_value) {default: debugger; return;}`;
			if(path_parts.length===idx) {
				if(map_entry_value instanceof Map) case_part=`${pad}\t\tif(map_entry_value instanceof Map) return;\n`;
				switch(typeof map_entry_value) {
					case "number": case_part=`${pad}\t\tif(typeof map_entry_value==="number") return this.save_number(\`[$\{path}]\`,map_entry_value);\n`; break;
					case "string": case_part=`${pad}\t\tif(typeof map_entry_value==="string") return this.save_string(\`[$\{path}]\`,map_entry_value);\n`; break;
				}
			}
			let res_case="";
			if(idx<path_parts.length) res_case=`case "${path_parts[idx]}": u(idx); debugger; break;`;
			console.log(`"[parse_value.L_gen_next_part] [${path}]",`);
			console.log(`
			-- [${path_parts.join(".")},${idx}] --\n
			case "${path_parts[idx-1]}": {
				const idx=${idx+1};
				if(path_parts.length===${idx}) {\n${case_part}${value_part}\n${pad}\t}
				switch(path_parts[${idx}]) {default: u(idx); debugger; path_parts[${idx}]===""; break; ${res_case}}
			} break;`.slice(1).split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
		};
		let new_path=() => {
			/** @private @type {P_LogItems} */
			console.log("[parse_value.new_path_gen]",path);
			let ak_gen=["",""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`\n
			case "${path}":
				switch(map_entry_key) {${map_keys.map(e => `case ${e}:`).join(" ")} break; default: new_ns(); debugger; return;}
				/** @private @type {P_PathRoot} */
				return this.parse_param_next(root,\`\${path}.f\${map_entry_key}\`,map_entry_value);\n`.split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
		};
		return {u,gen_next_part,new_path,map_entry_key};
	}
	/** @typedef {(x:ParamMapValue[],idx:number)=>void} ParseCallbackFunction */
	/** @private @type {P_LogItems} */
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapType} map @arg {number[]} map_keys @arg {number} map_entry_key @arg {ParamMapValue[]|undefined} map_entry_value @arg {ParseCallbackFunction|null} callback */
	parse_value(root,path,map,map_keys,map_entry_key,map_entry_value,callback) {
		let saved_map_keys=map_keys.slice();
		/** @private @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		let new_ns=() => {
			console.log("[parse_value.new_ns_gen]",path);
			/** @private @type {P_LogItems} */
			console.log("\n\t\"[parse_value.gen_ns] [%s]\",",`${path}.f${map_entry_key}`);
			console.log(`-- [parse_value.gen_ns] --\n\n\t${saved_map_keys.map(e => `case ${e}:`).join(" ")} \n`);
		};
		if(map_entry_value!==void 0) {
			let new_path=this.get_parse_fns(path,saved_map_keys,map_entry_value[0],map_entry_key).new_path;
			map.delete(map_entry_key);
			let cx=map_keys.indexOf(map_entry_key);
			if(cx>-1) map_keys.splice(cx,1);
			if(callback===null) {
				/** @private @type {P_LogItems} */
				switch(path) {
					default: {
						grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
						debugger;
						return;
					}
					case "service$create_playlist":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "browse$param.f93":
						switch(map_entry_key) {case 1: case 3: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams.f5":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams":
						switch(map_entry_key) {case 1: case 3: case 4: case 5: case 6: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams.f4":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams":
						switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams.f6":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams": case "like.dislikeParams":
						switch(map_entry_key) {case 1: case 4: case 5: case 6: case 7: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "reel.params":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f19": case "AdServingDataEntry.f9": case "slot_ad_serving_data_entry.f1":
					case "tracking.trackingParams.f4": switch(map_entry_key) {case 1: case 2: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "reel.player_params":
						switch(map_entry_key) {case 30: case 71: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "slot_ad_serving_data_entry":
						switch(map_entry_key) {case 1: case 3: case 4: break; default: new_ns(); debugger; return;}
						/** @private @type {P_PathRoot} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.params": switch(map_entry_key) {case 2: case 3: case 7: case 24: case 27: case 33: case 56: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f16": switch(map_entry_key) {case 1: case 2: case 3: case 4: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.params.f33": switch(map_entry_key) {case 2: case 3: case 4: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f6": switch(map_entry_key) {case 12: break; case 13: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "AdServingDataEntry": switch(map_entry_key) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.player_params": switch(map_entry_key) {case 8: case 9: case 12: case 25: case 40: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "ypc_get_offers.params.f5": switch(map_entry_key) {case 1: case 3: case 5: case 9: break; default: new_ns(); debugger; return;} return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "ypc_get_offers.params": switch(map_entry_key) {case 1: case 3: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "report.params.f28.f1.f1.f1.f1": switch(map_entry_key) {case 4: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "report.params.f28.f1": switch(map_entry_key) {case 1: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "browse$param.f84": switch(map_entry_key) {case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "entity_key": switch(map_entry_key) {case 2: case 4: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "createBackstagePost.param": case "record_notification_interactions.f2.f14.f1": case "ypc_get_offers.params.f1": case "record_notification_interactions.f2.f14":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "create_playlist.params": case "browse$param": case "D_Browse.param":
						switch(map_entry_key) {case 84: case 93: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`browse$param.f${map_entry_key}`,map_entry_value);
					case "get_transcript.params": case "report.params.f18": case "report.params.f28.f1.f1.f1": case "report.params.f28.f1.f1": case "report.params.f28": case "subscribe.params.f2": case "watch.params.f27": case "watch.player_params.f40": case "GetNotificationMenu.ctoken": case "ypc_get_offers.params.f5.f5":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f16.f4": case "transcript_target_id.param": case "watch.player_params.f40.f1":
						switch(map_entry_key) {case 2: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "slot_ad_serving_data_entry.f3": case "AdServingDataEntry.f10":
						switch(map_entry_key) {case 1: case 6: case 11: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams":
						switch(map_entry_key) {
							case 16: case 19: break;
							default: {
								if(!is_in_range(map_entry_key,11)) {
									new_ns();
									debugger;
									return;
								}
							}
						}
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "AdServingDataEntry.f10.f1":
					case "AdServingDataEntry.f10.f11":
					case "AdServingDataEntry.f10.f6":
					case "AdServingDataEntry.f13":
					case "AdServingDataEntry.f14":
					case "AdServingDataEntry.f4":
					case "AdServingDataEntry.f5":
					case "AdServingDataEntry.f6":
					case "AdServingDataEntry.f7":
					case "AdServingDataEntry.f9.f1":
					case "AdServingDataEntry.f9.f2":
					case "AdServingDataEntry.f9.f3":
					case "browse$param.f84.f5":
					case "browse$param.f93.f1":
					case "create_playlist.params.f84.f5":
					case "create_playlist.params.f84":
					case "createBackstagePost.param.f1":
					case "createBackstagePost.param.f2":
					case "entity_key.f2":
					case "entity_key.f4":
					case "entity_key.f5":
					case "get_transcript.params.f1":
					case "get_transcript.params.f6":
					case "GetNotificationMenu.ctoken.f1":
					case "like.likeParams.f1.f1":
					case "like.likeParams.f4":
					case "like.likeParams.f5":
					case "like.likeParams.f6.f2":
					case "like.likeParams.f7":
					case "record_notification_interactions.f2.f1":
					case "record_notification_interactions.f2.f14.f1.f1":
					case "record_notification_interactions.f2.f14.f1.f2":
					case "record_notification_interactions.f2.f14.f2":
					case "record_notification_interactions.f2":
					case "record_notification_interactions.f5":
					case "record_notification_interactions":
					case "reel.params.f1":
					case "reel.player_params.f30":
					case "reel.player_params.f71":
					case "reel.sequence_params.f1":
					case "reel.sequence_params":
					case "report.params.f11":
					case "report.params.f15":
					case "report.params.f18.f1.f2":
					case "report.params.f18.f1":
					case "report.params.f2":
					case "report.params.f25":
					case "report.params.f26":
					case "report.params.f28.f1.f1.f1.f1.f4":
					case "report.params.f28.f1.f1.f1[].f1.f4":
					case "report.params.f28.f1.f1.f1[].f1":
					case "report.params.f28.f1.f1.f1[]":
					case "report.params.f28.f1.f3":
					case "report.params.f28.f1[].f1.f1":
					case "report.params.f28.f1[].f1.f1[].f1":
					case "report.params.f28.f1[].f1.f1[]":
					case "report.params.f28.f1[].f1":
					case "report.params.f28.f1[].f3":
					case "report.params.f28.f1[]":
					case "report.params.f8":
					case "report.params":
					case "slot_ad_serving_data_entry.f1.f1":
					case "slot_ad_serving_data_entry.f1.f2":
					case "slot_ad_serving_data_entry.f1.f3":
					case "slot_ad_serving_data_entry.f3.f1":
					case "slot_ad_serving_data_entry.f3.f11":
					case "slot_ad_serving_data_entry.f3.f6":
					case "slot_ad_serving_data_entry.f4":
					case "subscribe.params.f2.f1":
					case "subscribe.params.f3":
					case "subscribe.params.f4":
					case "subscribe.params":
					case "tracking.trackingParams.f10":
					case "tracking.trackingParams.f11":
					case "tracking.trackingParams.f16.f1":
					case "tracking.trackingParams.f16.f2":
					case "tracking.trackingParams.f16.f3":
					case "tracking.trackingParams.f16.f4.f1":
					case "tracking.trackingParams.f16.f4.f2":
					case "tracking.trackingParams.f16.f4.f3":
					case "tracking.trackingParams.f19.f3":
					case "tracking.trackingParams.f4.f2":
					case "tracking.trackingParams.f4.f3":
					case "tracking.trackingParams.f5":
					case "tracking.trackingParams.f7":
					case "tracking.trackingParams.f8":
					case "transcript_target_id.param.f1":
					case "transcript_target_id.param.f2":
					case "transcript_target_id.param.f3":
					case "watch.params.f12":
					case "watch.params.f13":
					case "watch.params.f2":
					case "watch.params.f24":
					case "watch.params.f27.f1":
					case "watch.params.f3":
					case "watch.params.f33.f2":
					case "watch.params.f33.f3":
					case "watch.params.f33.f4":
					case "watch.params.f33.f5":
					case "watch.params.f56":
					case "watch.params.f7":
					case "watch.player_params.f12":
					case "watch.player_params.f25":
					case "watch.player_params.f40.f1.f2":
					case "watch.player_params.f40.f1.f3":
					case "watch.player_params.f8":
					case "watch.player_params.f9":
					case "ypc_get_offers.params.f1.f1":
					case "ypc_get_offers.params.f1.f2":
					case "ypc_get_offers.params.f3":
					case "ypc_get_offers.params.f5.f1":
					case "ypc_get_offers.params.f5.f3":
					case "ypc_get_offers.params.f5.f5.f1":
					case "ypc_get_offers.params.f5.f9":
					case "YpcGetCart.transactionParams":
					case "tracking.parentTrackingParams":
					case "tracking.trackingParams.f1":
					case "tracking.trackingParams.f19.f1":
					case "tracking.trackingParams.f19.f2":
					case "tracking.trackingParams.f2":
					case "tracking.trackingParams.f3":
					case "tracking.trackingParams.f4.f1":
					case "tracking.trackingParams.f6.f12":
					case "tracking.trackingParams.f6.f13":
					case "tracking.trackingParams.f9":
					case "next.queue_context_params":
					case "playlist_edit.params":
					case "watch_page_url.pp":
					case "watch_playlist.params": {
						new_ns();
						debugger;
					}
				}
				return;
			}
			callback(map_entry_value,map_entry_key);
			/** @arg {number} x @template {number} T @arg {T} mx @returns {x is NumRange<1,T>} */
			function is_in_range(x,mx) {
				if(x<=mx) return true;
				return false;
			}
		}
	}
	/** @unused_api @protected @arg {ParamMapValue} map_entry_value */
	mapper_use(map_entry_value) {
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
		let xx=mapper(map_entry_value);
		if(xx instanceof Array) {
			return xx.map(mapper);
		} else {
			return xx;
		}
	}
	/** @unused_api @protected @arg {string[]} x */
	report$params(x) {
		this.save_string("[report.params.path]",x.join("$"));
	}
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapValue[]} tva */
	parse_param_next_arr(root,path,tva) {
		let off=1;
		for(let val of tva) {
			let g1=() => {
				console.log(`
				case ${JSON.stringify(path)}: /*tva*/{
					this.parse_param_next(root,\`\${path}[]\`,[val]);
				}; return;`);
				console.log(`\n\n\t"[parse_value.gen_ns_g1] [${path}[]]",`);
				console.log("path offset",off);
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
	/** @private @template {["bigint",number[],bigint]|["group",D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]} T @arg {T} x @returns {x is ["bigint",number[],bigint]} */
	is_bigint(x) {
		return x[0]==="bigint";
	}
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_number(`[${path}]`,x[1]);
		this.save_string(`[${path}]`,`${x[2]}n`);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapValue[]} tva */
	parse_param_next(root,path,tva) {
		if(tva.length>1) return this.parse_param_next_arr(root,path,tva);
		if(tva.length!==1) return;
		let map_entry_value=tva[0];
		let key_index=this.parse_key_index;
		if(map_entry_value instanceof Map) this.parse_any_param(root,path,new Map(map_entry_value));
		let path_parts=split_string(path,".");
		let pp=this.get_parse_fns(path,[],map_entry_value);
		let u=pp.u;
		const idx=1;
		/** @private @type {P_LogItems} */
		switch(path_parts[0]) {
			default: u(idx); debugger; {switch(path_parts[0]) {case "": break;}} break;
			case "get_report_form": u(idx); break;
			case "service$create_playlist": u(idx); break;
			case "next_continuation": u(idx); break;
			case "aadc_guidelines_state_entity_key": u(idx); break;
			case "TimedContinuation": u(idx); break;
			case "D_Browse": u(idx); break;
			case "GetNotificationMenu": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "ctoken": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[2]==="f1"; break;
									case "f1": u(idx); debugger; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "slot_ad_serving_data_entry": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f1": case "f3": case "f4": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": case "f2": case "f3": case "f6": case "f11": {
								const idx=4;
								if(path_parts.length===3) {
									if(path_parts[1]==="f1") {
										if(path_parts[2]==="f1") return;
										if(path_parts[2]==="f2") return;
										if(path_parts[2]==="f3") return;
										path_parts;
									}
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			case "YpcGetCart": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					// [YpcGetCart.transactionParams]
					case "transactionParams": u(idx); debugger; break;
				}
			} break;
			case "AdServingDataEntry": {
				const idx=2;
				if(path_parts.length===1) switch(map_entry_value) {default: debugger; return;}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f4": case "f5": case "f6": case "f7": case "f9": case "f10": case "f13": case "f14": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
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
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							/** @private @type {P_LogItems} */
							// [watch.player_params.f12]
							// [watch.player_params.f25]
							case "f2": case "f3": case "f7": case "f8": case "f9":
							case "f12": case "f13": case "f24": case "f27": case "f25":
							case "f33": case "f40": case "f56": {
								const idx=4;
								if(path_parts.length===3) {
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									if(this.is_bigint(map_entry_value)) return this.handle_bigint(path,map_entry_value);
									debugger;
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f5": case "f1": case "f2": case "f4":
									case "f3": {
										const idx=5;
										if(path_parts.length===4) return;
										switch(path_parts[4]) {
											case "f2":
											case "f3": break;
											default: u(idx); debugger; path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "entity_key": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f2":
					case "f4":
					case "f5": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: u(idx-1); debugger; return;}
						}
						switch(path_parts[2]) {default: u(idx); debugger; path_parts[2]===""; break;}
					} break;
				}
			} break;
			case "tracking": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "parentTrackingParams":
					// [tracking.trackingParams]
					case "trackingParams": {
						const idx=3;
						/** @private @type {P_LogItems} */
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							// [tracking.trackingParams.f4]
							case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
							case "f10": case "f11": case "f16": case "f19": {
								const idx=4;
								if(path_parts.length===3) {
									if(path_parts[2]==="f8") return;
									if(path_parts[2]==="f9") return;
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									if(this.is_bigint(map_entry_value)) return this.handle_bigint(path,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f2": case "f3": case "f4": case "f12": case "f13":
									// [tracking.trackingParams.f4.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(map_entry_value instanceof Map) return;
											if(calc_skip()) return;
											if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
											switch(map_entry_value) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); debugger; path_parts[4]===""; break;
											case "f1": case "f2": case "f3": {
												const idx=6;
												if(path_parts.length===5) {
													if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
													switch(map_entry_value) {default: u(idx-1); debugger; return;}
												}
												switch(path_parts[5]) {default: u(idx); debugger; path_parts[5]===""; break;}
											} break;
										}
										function calc_skip() {
											if(path_parts[2]==="f4") {
												if(path_parts[3]=="f1") return true;
												if(path_parts[3]=="f2") return true;
												if(path_parts[3]=="f3") return true;
											}
											return false;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "browse$param": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f84": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f5": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "f93": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f3": case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			case "record_notification_interactions": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "f2": case "f5": u(idx); debugger; break;}
			} break;
			case "transcript_target_id": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "param": u(idx); debugger; break;}
			} break;
			case "watch": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": case "player_params": u(idx); debugger; break;}
			} break;
			case "report": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "createBackstagePost": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "param": u(idx); debugger; break;}
			} break;
			case "subscribe": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "ypc_get_offers": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "create_playlist": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "get_transcript": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "like": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "dislikeParams": case "removeLikeParams": case "likeParams": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": case "f2": case "f3": case "f4": case "f5": case "f6":
							case "f7": {
								const idx=4;
								if(path_parts.length===3) {
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f2": case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
											if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
											switch(map_entry_value) {default: debugger; return;}
										}
										switch(path_parts[4]) {default: u(idx); debugger; path_parts[4]===""; break;}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "next": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "queue_context_params": u(idx); debugger; break;}
			} break;
			case "playlist_edit": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "watch_page_url": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "pp": u(idx); debugger; break;}
			} break;
			case "watch_playlist": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "reel": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break; case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break; case "f30": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
							case "f71": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "sequence_params": u(idx); debugger; break;
				}
			} break;
		}
		console.log(`[${path}] [idx=${key_index}]`,root,map_entry_value);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapType} map */
	parse_any_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		let mk_max=Math.max(...mk,-1);
		for(let i=1;i<mk_max+1;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(mk,[])) return;
		console.log(`[new.${path}] [idx=${key_index}]`,path,this.to_param_obj(map));
		debugger;
	}
	/** @private @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapType} map */
	parse_player_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		for(let i=1;i<72;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		parse_key(72);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		debugger;
	}
	/** @api @public @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {ParamMapType} map */
	parse_endpoint_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		for(let i=1;i<40;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		// endpoint.create_playlist.params
		this.parse_value(root,path,map,mk,77,map.get(77),map_entry_value => {
			if(map_entry_value.length===1&&typeof map_entry_value[0]==="string") {
				let bt=this.decode_browse_id(map_entry_value[0]);
				if(!bt) {debugger; return;}
				return this.parse_browse_id(bt);
			}
			debugger;
		});
		for(let i=1;i<300;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(mk,[])) return;
		let param_obj=this.to_param_obj(map);
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
	/** @private @arg {P_ParamsSection} root @arg {Extract<YtUrlFormat,`https://${string}`|`http://${string}`>} x */
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
	/** @unused_api @protected @arg {GM_VE3832_Watch_WC['url']} x */
	parse_url_VE3832(x) {
		if(!this.str_starts_with("/watch?",x)) debugger;
	}
	/** @api @public @arg {P_ParamsSection} root @arg {YtUrlFormat} x */
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
	/** @private @arg {P_ParamsSection} root @arg {ParseUrlStr_1} x */
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
	/** @private @arg {P_ParamsSection} root @arg {ParseUrlWithSearchIn|ParseUrlWithSearchIn_2} x */
	parse_url_with_search(root,x) {
		let a=split_string(x,"?");
		switch(a[0]) {
			case "playlist": this.parse_playlist_page_url(a[1]); break;
			case "watch": this.parse_watch_page_url(root,a[1]); break;
		}
	}
	log_channel_handles=false;
	/** @private @type {YtUrlFormat} */
	/** @private @arg {P_ParamsSection} root @arg {Extract<T_SplitOnce<T_SplitOnce<Exclude<YtUrlFormat,"/">,"/">[1],"/">,[any]>[0]} x */
	parse_url_2(root,x) {
		if(this.str_is_search(x)) {
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
	/** @private @arg {Extract<T_SplitOnce<ParseUrlStr_1,"/">,[`account${string}`]>[0]} x */
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
	/** @unused_api @protected @arg {D_VE6827_PageUrl} x */
	parse_ve_6827_url(x) {
		const cf="parse_ve_6827_url";
		/** @private @type {T_SplitOnce<D_VE6827_PageUrl,"/">[1]} */
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
	/** @private @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {
		return this.str_starts_with(needle,str);
	}
	/** @api @public @arg {YtTargetIdType} x */
	parse_target_id(x) {
		if(this.str_starts_with("browse-feed",x)) {
			console.log("[target_id.browse_feed","browse-feed",split_string_once(x,"browse-feed")[1]);
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
	/** @api @public @arg {T_SplitOnce<ChanLoc,".">} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei",...any]>} x */
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
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "backstage":
				if(x[3]!=="create_post") debugger;
				return {
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "ypc": {
				if(x[3]!=="get_offers") debugger;
				return {
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			}
			default: return this.api_no_handler(x,x[2]);
		}
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","pdg",string]>} x */
	get_pdg_type(x) {
		switch(x[3]) {
			case "get_pdg_buy_flow": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","music",string]>} x */
	get_music_type(x) {
		switch(x[3]) {
			case "get_search_suggestions": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","share",string]>} x */
	get_share_type(x) {
		switch(x[3]) {
			case "get_share_panel": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","playlist",string]>} x */
	get_playlist_type(x) {
		switch(x[3]) {
			case "get_add_to_playlist": break;
			case "create": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","browse",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","subscription",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","reel",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","notification",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","comment",string]>} x */
	get_comment_type(x) {
		switch(x[3]) {
			case "create_comment": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","att",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","like",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","account",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiUrlFormat$1,"/">,["youtubei","v1","live_chat",string]>} x */
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
	/** @api @public @arg {T_Split<D_ApiUrlFormat$1,"/">} x */
	get_url_type(x) {
		switch(x[0]) {
			case "youtubei": return this.get_yt_url_type(x);
			case "getDatasyncIdsEndpoint": break;
			case "getAccountSwitcherEndpoint": break;
			default: return this.api_no_handler(x,x[0]);
		}
		return x[0];
	}
	/** @private @arg {D_BrowseEndpointPages} x */
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
	/** @private @arg {string} x @returns {D_BrowseIdStr|null} */
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
	/** @api @public @arg {D_BrowseIdStr} x */
	parse_browse_id(x) {
		if(this.str_starts_with_r(x,"FE")) {
			let page=split_string_once(x,"FE")[1];
			let known_page=this.parse_known_page(page);
			if(known_page) return;
			if(seen_map.has(page)) return;
			seen_map.add(page);
			console.log("[param_value_with_section] [%s] -> [%s]",x.slice(0,2),page);
			return;
		}
		if(this.str_starts_with_r(x,"VL")) {
			return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);
		}
		if(this.str_starts_with_r(x,"UC")) {
			if(x.slice(2).length===22) return;
			console.log("new with param [param_2c_UC]",x);
			return;
		}
		if(this.str_starts_with_r(x,"SP")) {
			/** @private @type {D_Settings_Id} */
			let x1=split_string_once(x,"SP")[1];
			switch(x1) {
				case "account_advanced":
				case "account_downloads":
				case "account_overview":
				case "account":
				case "report_history":
				case "unlimited":
					return;
				default: console.log(`case "${x1}": `); console.log(`\n|"${x1}"`); debugger;
			}
			console.log("new with param [param_2c_SP]",x,x1);
			return;
		}
		if(this.str_starts_with_r(x,"MP")) {
			let x1=split_string_once(x,"MP")[1];
			let x2=split_string_once(x1,"_");
			switch(x2[0]) {
				case "TRt": break;
				case "REb": break;
				case "LYt": break;
				default: console.log("new with param [param_2c_MP]",x,x1,x2); debugger;
			}
			return;
		}
		debugger;
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
	/** @constructor @public @arg {CodegenService} parent */
	constructor(parent) {
		this.parent=parent;
	}
	get x() {
		return this.parent;
	}
	/** @api @public @arg {{}} x @arg {string} r */
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
	/** @protected @type {GA_FormatItagArr} */
	format_itag_arr=[18,133,134,135,136,137,140,160,242,243,244,247,248,249,250,251,278,298,299,302,303,308,315,394,395,396,397,398,399,400,401];
	/** @protected @type {QualArr} */
	format_quality_label_arr=[
		"2160p50","1440p50","1080p50","720p50",
		"2160p60","1440p60","1080p60","720p60",
		"1080p","720p","480p","360p","240p","144p"
	];
	/** @protected */
	valid_fps_arr=[13,25,30,50,60];
	/** @protected */
	format_quality_arr=["hd2160","hd1440","hd1080","hd720","large","medium","small","tiny"];
}
class ServiceMethods extends ServiceData {
	/** @protected @template T @arg {{pathname:any}} x @arg {T} pathname @returns {x is {pathname:T}} */
	is_url_with_pathname(x,pathname) {
		return x.pathname===pathname;
	}
	/** @protected @arg {UrlTypes} url_type @arg {{}} x @returns {G_ResponseTypes} */
	get_res_data(url_type,x) {
		/** @private @type {T_Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		/** @private @type {G_ResponseTypes|null} */
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
	/** @protected @arg {D_ApiUrlFormat} x */
	use_template_url(x) {
		const res_parse=this.parse_with_url_parse(x);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",x,res_parse);
			throw new Error("unreachable");
		}
		let path_parts=split_string(split_string_once(res_parse.pathname,"/")[1],"/");
		return this.parser.get_url_type(path_parts);
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,[any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_length_1(target,x) {
		switch(target[0]) {
			default: debugger; break;
			case "browse": return {
				type: target[0],
				/** @private @type {RS_Browse} */
				data: as(x),
			};
			case "feedback": return {
				type: target[0],
				/** @private @type {RS_Feedback} */
				data: as(x),
			};
			case "getDatasyncIdsEndpoint": return {
				type: target[0],
				/** @private @type {REG_DatasyncIds} */
				data: as(x),
			};
			case "getAccountSwitcherEndpoint": return {
				type: target[0],
				/** @private @type {REG_AccountSwitcher} */
				data: as(x),
			};
			case "get_transcript": return {
				type: target[0],
				/** @private @type {RSG_Transcript} */
				data: as(x),
			};
			case "get_survey": return {
				type: target[0],
				/** @private @type {RSG_Survey} */
				data: as(x),
			};
			case "guide": return {
				type: target[0],
				/** @private @type {RS_Guide} */
				data: as(x),
			};
			case "next": return {
				type: target[0],
				/** @private @type {RS_Next} */
				data: as(x),
			};
			case "player": return {
				type: target[0],
				/** @private @type {RS_Player} */
				data: as(x),
			};
			case "search": return {
				type: target[0],
				/** @private @type {RS_Search} */
				data: as(x),
			};
			case "updated_metadata": return {
				type: target[0],
				/** @private @type {RSU_M} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["reel",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_reel(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "reel_item_watch": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSW_ReelItem} */
				data: as(x),
			};
			case "reel_watch_sequence": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_ReelWatchSequence} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["notification",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_notification(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "get_notification_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSG_NotificationMenu} */
				data: as(x),
			};
			case "get_unseen_count": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSG_GetUnseenCount} */
				data: as(x),
			};
			case "modify_channel_preference": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSM_ChannelPreference} */
				data: as(x),
			};
			case "record_interactions": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_Success} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["live_chat",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_live_chat(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get_live_chat_replay": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_GetLiveChat} */
				data: as(x),
			};
			case "get_live_chat": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_GetLiveChat} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["att",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_res_att(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AttGet} */
				data: as(x),
			};
			case "log": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AttLog_RC} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["account",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_account(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "account_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AccountMenu} */
				data: as(x),
			};
			case "accounts_list": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AccountsList} */
				data: as(x),
			};
			case "set_setting": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_SetSetting} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["pdg",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_pdg(t,x) {
		switch(t[1]) {
			case "get_pdg_buy_flow": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_PdgBuyFlow} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["music",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_music(t,x) {
		switch(t[1]) {
			case "get_search_suggestions": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SearchSuggestions} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["share",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_share(t,x) {
		switch(t[1]) {
			case "get_share_panel": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SharePanel} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["playlist",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_playlist(t,x) {
		switch(t[1]) {
			case "get_add_to_playlist": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_AddToPlaylist} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["subscription",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_subscription(t,x) {
		switch(t[1]) {
			case "subscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RS_Subscribe} */
				data: as(x),
			};
			case "unsubscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RS_Unsubscribe} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["browse",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_browse(t,x) {
		switch(t.length) {
			case 2: switch(t[1]) {
				case "edit_playlist": return {
					type: `${t[0]}.${t[1]}`,
					/** @private @type {RSB_EditPlaylist} */
					data: as(x),
				};
			}
			case 1: break;
		}
		switch(t[0]) {
			case "browse": return {
				type: t[0],
				/** @private @type {RS_Browse} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["like",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_like(target,x) {
		switch(target[1]) {
			default: debugger; break; case "dislike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_Dislike} */
				data: as(x),
			}; case "like": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_Like} */data: as(x),
			}; case "removelike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_RemoveLike} */data: as(x),
			};
		}
		return null;
	}
	/** @protected @arg {true} x */
	expect_true(x) {
		if(x!==true) debugger;
	}
	/** @protected @arg {P_ParamsSection} cf @arg {string} x */
	trackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @protected @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] */
	codegen_new_typedef(x,gen_name,ret_val) {
		return this.codegen.codegen_new_typedef(x,gen_name,ret_val);
	}
	/** @protected @arg {P_ParamsSection} cf @arg {string} x */
	clickTrackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @private @type {string[]} */
	known_target_id=[];
	/** @protected @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {
		return this.str_starts_with(needle,str);
	}
	/** @protected @arg {string} root @arg {YtTargetIdType} x */
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
		if(this.str_starts_with_r(x,"browse-feed")) return;
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
	/** @protected @arg {[D_VE3832_PreconnectUrl]} x */
	parse_preconnect_arr(x) {
		if(x.length!==1) debugger;
		this.parse_preconnect_url(x[0]);
	}
	/** @private @arg {D_VE3832_PreconnectUrl} x */
	parse_preconnect_url(x) {
		let up=this.parse_with_url_parse(x);
		if(up.pathname!=="/generate_204") debugger;
		let ss1=split_string(up.host,".");
		if(ss1.length!==3) debugger;
		if(ss1[1]!=="googlevideo") debugger;
		if(ss1[2]!=="com") debugger;
		/** @type {T_Split<T_Split<RE_D_VE3832_PreconnectUrl,"/">[2],".">[0]} */
		let ux=as(ss1[0]);
		let ss2=split_string(ux,"---");
		if(!this.str_starts_with_r(ss2[0],"rr")) debugger;
		let ss3=split_string_once(ss2[0],"rr")[1];
		let ss4=split_string_once(ss2[1],"sn-nx")[1];
		console.log("google video rr [%s] sn-nx [%s]",ss3,ss4);
		if(this.str_starts_with("57yn",ss4)) {
			let [,,,,...ss5]=split_string(ss4,"");
			let ss6=this.join_string(ss5,"");
			switch(ss6) {
				case "lk": break;
				case "sd": break;
				case "se": break;
				case "sk": break;
				case "sl": break;
				case "ss": break;
				case "sz": break;
				default: ss6===""; debugger;
			}
		} else if(this.str_starts_with("5s7n",ss4)) {
			let [,,,,...ss5]=split_string(ss4,"");
			let ss6=this.join_string(ss5,"");
			switch(ss6) {
				case "76": break;
				case "7d": break;
				case "7s": break;
				case "7y": break;
				case "7z": break;
				case "ee": break;
				case "el": break;
				default: ss6===""; debugger;
			}
		} else {
			ss4==="";
			debugger;
		}
	}
	/** @protected @arg {P_ParamsSection} root @arg {D_WatchPageUrl} x */
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
	/** @protected @arg {string} x */
	videoId(x) {
		this.primitive_of(x,"string");
		this.x.get("indexed_db").put({v: x});
	}
	/** @protected @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	params(root,path,x) {
		this.parser.on_endpoint_params(root,path,x);
	}
	/** @protected @arg {PlaylistId} x */
	playlistId(x) {
		this.parser.parse_playlist_id(x);
	}
	/** @private @arg {Extract<GM_WC,{rootVe:any}>['rootVe']} x */
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
				/** @private @type {GM_WC[]} */
				let x=[]; x;
			}
		}
		switch(ss) {
			default: debugger;
		}
	}
	/** @protected @arg {D_BrowseIdStr} x */
	browseId(x) {
		this.parser.parse_browse_id(x);
	}
	/** @protected @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {
		if(!this.str_starts_with_r(x,"/@")) debugger;
	}
	/** @protected @arg {string} x */
	previousCsn(x) {
		console.log(base64_dec.decode_str(x));
	}
	/** @protected @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {
		return this.str_starts_with(x.targetId,w);
	}
	/** @protected @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	playerParams(root,path,x) {
		this.parser.on_player_params(root,path,x);
	}
	/** @protected @arg {Extract<GM_WC,{rootVe:any}>['rootVe']} x */
	rootVe(x) {
		this.on_root_visual_element(x);
	}
}
//#endregion
//#endregion
//#region HandleTypes
class HandleTypes extends ServiceMethods {
	/** @protected @arg {`[${string}]`} k @arg {string|string[]} x */
	save_string_api=this.save_string;
	static {
		this.prototype.minimal_handler_member_use();
	}
	/** @private */
	minimal_handler_member_use() {
		this.minimal_handler_member_2({});
	}
	//#region templates
	/** @private @arg {string} cf @public @template {{}} T @arg {T} x */
	HD_(cf,x) {
		this.k(cf,x);
		if(this.get_keys_of(x).length!==1) debugger;
	}
	/** @private @template U @template {GetMaybeKeys<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>U} f */
	H_(cf,x,f) {
		this.k(cf,x);
		return f.call(this,this.w(x));
	}
	/** @private @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	TR_ItemSection_2(x,f) {this.H_("TR_ItemSection_2",x,x => this.TD_ItemSection_2_CommentsEntryPoint(x,f));}
	/** @private @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x @arg {(this:this,x:[CT[],T,U])=>void} f */
	TR_ItemSection_3(x,f) {
		const cf="ItemSectionRendererTemplate";
		const {itemSectionRenderer: a,...y}=this.sd(cf,x); this.g(y);
		this.TD_ItemSection_3(a,f);
	}
	/** @private @template CT,T,U @arg {TD_ItemSection_3<CT,T,U>} x @arg {(this:this,x:[CT[],T,U])=>void} f */
	TD_ItemSection_3(x,f) {
		const cf="TD_ItemSection_3";
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=this.sd(cf,x); this.g(y);
		f.call(this,[contents,sectionIdentifier,targetId]);
		this.trackingParams(cf,trackingParams);
		if(contents.length>0) {
			let cu=contents[0];
			if(typeof cu!=="object"||!cu) {debugger; return;}
			let k=this.get_keys_of(cu);
			switch(k[0]) {
				case "continuationItemRenderer": break;
				default: debugger; break;
			}
		}
	}
	/** @private @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		f.call(this,a);
	}
	/** @private @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(x,f) {
		const cf="T_Commands"; this.k(cf,x);
		this.z(this.w(x),f);
	}
	/** @private @arg {T_Endpoint_CF} cf @arg {(this:this,x:NonNullable<T['commandMetadata']>)=>void} [f_vm] @template {{}} V$M @template {T_Endpoint<V$M>} T @arg {T} x @arg {(this:this,x:Omit<T,"clickTrackingParams"|"commandMetadata">)=>void} f */
	T_Endpoint(cf,x,f,f_vm) {
		const {clickTrackingParams,commandMetadata,...y}=this.sd(cf,x);
		f.call(this,y);
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		if(f_vm===void 0) {
			if(commandMetadata!==void 0) debugger;
			return;
		}
		if(commandMetadata===void 0) return;
		f_vm.call(this,commandMetadata);
	}
	/** @private @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	T_Autoplay(x,f) {
		const cf="T_Autoplay";
		const {autoplay,...y}=this.sd(cf,x); this.g(y);
		f.call(this,autoplay);
	}
	/** @private @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	T_Playlist(x,f) {
		const cf="T_Playlist";
		const {playlist,...y}=this.sd(cf,x); this.g(y);
		f.call(this,playlist);
	}
	/** @private @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	T_SecondaryResults(x,f) {
		const cf="SecondaryResultsTemplate";
		const {secondaryResults,...y}=this.sd(cf,x); this.g(y);
		f.call(this,secondaryResults);
	}
	/** @private @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {
		const cf="T_Types";
		const {types,...y}=this.sd(cf,x); this.g(y);
		/** @private @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {
			return as(Number.parseInt(x,10));
		}
		return parse_number(types,_x);
	}
	/** @private @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint(x,f) {
		const cf="TD_ItemSection_2_CommentsEntryPoint";
		const {contents,trackingParams,sectionIdentifier,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,f);
		this.trackingParams(cf,trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @private @arg {R_SimpleText} x */
	R_SimpleText(x) {
		const cf="R_SimpleText";
		const {simpleText,...y}=this.sd(cf,x); this.handle_accessibility(y);
		this.primitive_str(simpleText);
	}
	//#endregion
	//#region web_command_metadata
	/** @private @arg {GM_VE6827_WC} x */
	GM_VE6827_WC(x) {
		const cf="GM_VE6827_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		this.t(url,this.D_VE6827_PageUrl);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==6827) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {D_VE6827_PageUrl} x */
	D_VE6827_PageUrl(x) {
		let [f,...p]=split_string(x,"/"); if(f!=="") debugger;
		switch(p[0]) {
			default: p[0]===""; debugger; break;
			case "reporthistory": {
				let [,...u]=p;
				if(u.length!==0) debugger;
			} break;
			case "feed": {
				let s2=split_string(p[1],'?');
				let [...u]=s2;
				switch(u[0]) {
					default: u[0]===""; debugger; break;
					case "history":
					case "library":
					case "guide_builder":
					case "trending":
					case "storefront": break;
				}
			} break;
		}
	}
	/** @private @arg {GM_VE23462_WC} x */
	GM_VE23462_WC(x) {
		const cf="GM_VE23462_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		switch(url) {
			default: console.log(`-- [GM_VE23462_WC] --\n\n\ncase "${url}":`); break;
			case "/account": break;
			case "/account_notifications": break;
		}
		if(webPageType!=="WEB_PAGE_TYPE_SETTINGS") debugger;
		if(rootVe!==23462) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE96368_WC_browse} x */
	GM_VE96368_WC_browse(x) {
		const cf="GM_VE96368_WC_browse";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==96368) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {Extract<GM_WC,{apiUrl:any}>} x */
	GM_WC_ApiUrl(x) {
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
				/** @private @arg {GM_WC} x */
				let typedef_str=this.codegen_new_typedef(x,`G_${url_type_ex}`,true);
				const l1="-- [GeneratedWebCommandMetadata] --";
				const r2="return this.GeneratedWebCommandMetadata(x);";
				console.log(`\n${l1}\n\n${typedef_str}\n---\n\n\tG_${url_type_ex},\n---\n\n\tcase "${cx}": ${r2}`);
				debugger;
			} break;
			case "/youtubei/v1/backstage/create_post": return this.GM_WC_Base(x);
			case "/youtubei/v1/like/removelike": return this.GM_WC_Base(x);
			case "/youtubei/v1/like/like": return this.GM_WC_Base(x);
			case "/youtubei/v1/notification/opt_out": return this.GM_WC_Base(x);
			case "/youtubei/v1/notification/record_interactions": return this.GM_WC_Base(x);
			case "/youtubei/v1/playlist/create": return this.GM_WC_Base(x);
			case "/youtubei/v1/flag/get_form": return this.GM_WC_Base(x);
			case "/youtubei/v1/subscription/subscribe": return this.GM_WC_Base(x);
			case "/youtubei/v1/feedback": return this.GM_WC_Base(x);
			case "/youtubei/v1/browse":
				if("rootVe" in x) return this.GM_WC_Ex(x);
				return this.GM_browse(x);
			case "/youtubei/v1/account/account_menu": return this.GM_WC_Base(x);
			case "/youtubei/v1/notification/get_unseen_count": return this.GM_WC_Base(x);
			case "/youtubei/v1/notification/get_notification_menu": return this.GM_WC_Base(x);
			case "/youtubei/v1/get_transcript": return this.GM_WC_Base(x);
			case "/youtubei/v1/next": return this.GM_WC_Base(x);
			case "/youtubei/v1/share/get_share_panel": return this.GM_WC_Base(x);
			case "/youtubei/v1/browse/edit_playlist": return this.GM_WC_Base(x);
			case "/youtubei/v1/playlist/get_add_to_playlist": return this.GM_WC_Base(x);
			case "/youtubei/v1/account/set_setting": return this.GM_WC_Base(x);
			case "/youtubei/v1/ypc/get_offers": return this.GM_WC_Base(x);
		}
		return;
	}
	/** @private @arg {Exclude<Extract<GM_WC,{rootVe:any}>,{apiUrl:any}>} x */
	GM_WC_RootVe(x) {
		let cx=x.rootVe;
		switch(x.rootVe) {
			default: {
				x===0;
				/** @private @arg {GM_WC} x */
				this.codegen_new_typedef(x,`G_VE${cx}`);
				console.log(`\n\tG_VE${cx},`);
				console.log(`\n\tcase ${cx}: return this.GeneratedWebCommandMetadata(x);`);
			} break;
			case 3832: return this.GM_VE3832_Watch_WC(x);
			case 4724: return this.GM_VE4724_WC(x);
			case 37414: return this.GM_VE37414_WC(x);
			case 83769: return this.GM_VE83769_WC(x);
		}
	}
	/** @private @arg {Extract<GM_WC,{rootVe:any;apiUrl:any}>} x */
	GM_WC_Ex(x) {
		switch(x.rootVe) {
			case 3854: return this.GM_VE3854_WC(x);
			case 3611: return this.GM_VE3611_WC(x);
			case 5754: return this.GM_VE5754_WC(x);
			case 6827: return this.GM_VE6827_WC(x);
			case 11487: return this.GM_VE11487_WC(x);
			case 23462: return this.GM_VE23462_WC(x);
			case 42352: return this.GM_VE42352_WC(x);
			case 96368: return this.GM_VE96368_WC_browse(x);
			default: x===0; debugger; break;
		}
	}
	/** @private @arg {GM_VE11487_WC} x */
	GM_VE11487_WC(x) {
		const cf="GM_VE11487_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==11487) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE5754_WC} x */
	GM_VE5754_WC(x) {
		const cf="GM_VE5754_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		let [f,url_playlist_id]=split_string_once(url,"/playlist?list=");
		if(f!=="") debugger;
		this.parser.parse_playlist_id(url_playlist_id);
		if(webPageType!=="WEB_PAGE_TYPE_PLAYLIST") debugger;
		if(rootVe!==5754) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_WC} x */
	GM_WC(x) {
		const cf="GM_WC";
		if("rootVe" in x&&!("apiUrl" in x)) return this.GM_WC_RootVe(x);
		if("apiUrl" in x&&!("rootVe" in x)) return this.GM_WC_ApiUrl(x);
		if("rootVe" in x&&"apiUrl" in x) return this.GM_WC_Ex(x);
		if("sendPost" in x) {
			const {sendPost,...y}=this.sd(cf,x); this.g(y);
			if(sendPost!==true) debugger;
			return;
		}
		x===0;
		debugger;
	}
	/** @private @arg {GM_VE3854_WC} x */
	GM_VE3854_WC(x) {
		const cf="GM_VE3854_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		x: {
			if(url==="/") break x;
			debugger;
		}
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==3854) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {Extract<GM_WC,{sendPost:boolean;apiUrl:string}>} x */
	GM_WC_Base(x) {const cf="GM_WC_Base",{sendPost,apiUrl}=this.sd(cf,x); this.primitive_of(sendPost,"boolean"); return this.parser.parse_url(cf,apiUrl);}
	//#endregion {E_}
	//#region general done
	/** @private @arg {R_Button} x */
	R_Button(x) {this.H_("Button",x,this.D_Button);}
	/** @private @arg {R_HotkeyDialogSection} x */
	R_HotkeyDialogSection(x) {this.H_("HotkeyDialogSection",x,this.D_HotkeyDialogSection);}
	/** @private @arg {R_HotkeyDialogSectionOption} x */
	R_HotkeyDialogSectionOption(x) {this.H_("HotkeyDialogSectionOption",x,this.D_HotkeyDialogSectionOption);}
	/** @private @arg {R_PlayerOverlayVideoDetails} x */
	R_PlayerOverlayVideoDetails(x) {this.H_("PlayerOverlayVideoDetails",x,this.D_PlayerOverlayVideoDetails);}
	/** @private @arg {R_CinematicContainer} x */
	R_CinematicContainer(x) {this.H_("CinematicContainer",x,this.D_CinematicContainer);}
	/** @private @arg {R_TwoColumnWatchNextResults} x */
	R_TwoColumnWatchNextResults(x) {this.H_("R_TwoColumnWatchNextResults",x,this.D_TwoColumnWatchNextResults);}
	/** @private @arg {R_PlayerOverlay} x */
	R_PlayerOverlay(x) {this.H_("R_PlayerOverlay",x,this.D_PlayerOverlay);}
	/** @private @arg {R_DesktopTopbar} x */
	R_DesktopTopbar(x) {this.H_("DesktopTopbar",x,this.D_DesktopTopbar);}
	/** @private @arg {R_TopbarLogo} x */
	R_TopbarLogo(x) {this.H_("DesktopTopbar",x,this.D_TopbarLogo);}
	/** @private @arg {R_FusionSearchbox} x */
	R_FusionSearchbox(x) {this.H_("DesktopTopbar",x,this.D_FusionSearchbox);}
	/** @private @arg {R_HotkeyDialog} x */
	R_HotkeyDialog(x) {this.H_("HotkeyDialog",x,this.D_HotkeyDialog);}
	/** @private @arg {R_WatchPage} x */
	R_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: this.R_VE3832_WatchPage(x); break;
			default: debugger; break;
		} else {
			this.R_Generic_WatchPage(x);
		}
	}
	/** @private @arg {R_WatchPage$1} x */
	R_Generic_WatchPage(x) {
		const cf="R_Generic_WatchPage";
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.sd(cf,x); this.g(y);
		this.E_Watch(endpoint);
		this.RS_Watch(response);
		this.RS_Player(playerResponse);
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @private @arg {R_VE3832_WatchPage} x */
	R_VE3832_WatchPage(x) {
		const cf="R_VE3832_WatchPage";
		const {rootVe,url,endpoint,page: {},preconnect,playerResponse,response,...y}=this.sd(cf,x); this.g(y);
		if(rootVe!==3832) debugger;
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[VE3832.${cf}.wp_params]`,wp_params);
		this.E_Watch(endpoint);
		if(preconnect!==void 0) this.parse_preconnect_arr(preconnect);
		this.RS_Player(playerResponse);
		this.RS_Watch(response);
	}
	/** @private @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch";
		this.x.get("yt_plugin").add_function({
			name: "data",
			data: {
				R_Watch: x,
			},
		});
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.sd(cf,x); this.g(y);
		this.RC_ResponseContext(responseContext);
		this.R_TwoColumnWatchNextResults(contents);
		this.E_Watch(currentVideoEndpoint);
		this.trackingParams(cf,trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,this.R_CinematicContainer);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_DesktopTopbar} x */
	D_DesktopTopbar(x) {
		const cf="D_DesktopTopbar";
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=this.sd(cf,x); this.g(y);
		this.R_TopbarLogo(logo);
		this.R_FusionSearchbox(searchbox);
		this.trackingParams(cf,trackingParams);
		if(countryCode!=="CA") debugger;
		this.z(topbarButtons,this.G_TopbarButtonItem);
		this.R_HotkeyDialog(hotkeyDialog);
		this.R_Button(backButton);
		this.R_Button(forwardButton);
		this.R_Button(a11ySkipNavigationButton);
		this.R_Button(voiceSearchButton);
	}
	/** @private @arg {A_FrameworkUpdates} x */
	A_FrameworkUpdates(x) {
		const cf="A_FrameworkUpdates";
		const {entityBatchUpdate,elementUpdate,...y}=this.sd(cf,x); this.g(y);
		this.D_EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.R_ElementUpdate);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist";
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=this.sd(cf,x); this.g(y);
		if(status!=="STATUS_SUCCEEDED") debugger;
		let [r]=this.z(actions,x => {
			if("refreshPlaylistCommand" in x) return this.C_RefreshPlaylist(x);
			if("openPopupAction" in x) return this.TA_OpenPopup(x);
			debugger;
		});
		this.z(r,a => a);
		this.z(playlistEditResults,this.g);
		this.trackingParams(cf,trackingParams);
	}
	/** @private */
	log_url=false;
	/** @private @arg {R_BrowsePage} x */
	R_BrowsePage(x) {
		const cf="R_BrowsePage";
		const {rootVe,url,endpoint,page,response,expirationTime,previousCsn,...y}=this.sd(cf,x); this.g(y);
		this.t(rootVe,x => this.save_number("[R_BrowsePage.rootVe]",x));
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.E_Browse(endpoint);
		if(page!=="browse") debugger;
		this.RS_Browse(response);
		this.t(expirationTime,x => this.primitive_of(x,"number"));
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @private @arg {E_Browse['browseEndpoint']['browseId']} x */
	E_Browse_ParseBrowseId(x) {
		if(this.str_starts_with("UC",x)) return this.channelId(x);
		if(this.str_starts_with("VL",x)) return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);
		switch(x) {
			case "FEdownloads": case "FEhistory": case "FElibrary": case "FEsubscriptions": case "FEtrending": case "FEwhat_to_watch": break;
			case "FEguide_builder": case "FEstorefront": break;
			case "SPaccount_notifications": case "SPunlimited": case "SPreport_history":
			case "SPaccount_overview": break;
			default: x===""; console.log(`-- [E_Browse_ParseBrowseId] --\n\n\ncase "${x}":`); break;
		};
	}
	/** @private @arg {E_Browse['browseEndpoint']} x */
	DE_Browse_VE(x) {
		const cf="DE_Browse_VE";
		if("params" in x) {
			const {browseId: a,params: c,...y}=this.sd(cf,x); this.g(y);
			this.E_Browse_ParseBrowseId(a);
			this.params(cf,"D_Browse.param",c);
			this.g(y);
			return;
		}
		if("canonicalBaseUrl" in x) {
			const {browseId: a,canonicalBaseUrl: b,...y}=this.sd(cf,x); this.g(y);
			this.E_Browse_ParseBrowseId(a);
			return this._decode_channel_url(b);
		}
		const {browseId: a,...y}=this.sd(cf,x); this.g(y);
		this.E_Browse_ParseBrowseId(a);
		this.g(y);
	}
	/** @private @arg {E_Browse} x */
	E_Browse(x) {const cf="E_Browse"; this.T_Endpoint(cf,x,x => this.y(x,this.DE_Browse_VE),this.M_VE_Browse);}
	/** @private @arg {E_Browse['commandMetadata']} x */
	M_VE_Browse(x) {
		const cf="M_VE_Browse";
		const {webCommandMetadata: a,...y}=this.sd(cf,x); this.g(y);
		this.GM_VE_WC_Browse(a);
	}
	/** @private @arg {E_Browse['commandMetadata']['webCommandMetadata']} x */
	GM_VE_WC_Browse(x) {
		switch(x.rootVe) {
			case 3611: this.GM_VE3611_WC(x); break;
			case 3854: this.GM_VE3854_WC(x); break;
			case 5754: this.GM_VE5754_WC(x); break;
			case 6827: this.GM_VE6827_WC(x); break;
			case 11487: this.GM_VE11487_WC(x); break;
			case 23462: this.GM_VE23462_WC(x); break;
			case 42352: this.GM_VE42352_WC(x); break;
			case 96368: this.GM_VE96368_WC_browse(x); break;
			default: x===""; debugger; break;
		}
		this.GM_WC(x);
	}
	/** @private @arg {GM_VE42352_WC['url']} x */
	_decode_browse_url(x) {
		switch(x) {
			case "/feed/downloads": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GM_VE42352_WC} x */
	GM_VE42352_WC(x) {
		const cf="GM_VE42352_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		this._decode_browse_url(url);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==42352) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE3611_WC} x */
	GM_VE3611_WC(x) {
		const cf="GM_VE3611_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.sd(cf,x); this.g(y);
		this._decode_channel_url(url);
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE37414_WC} x */
	GM_VE37414_WC(x) {
		const cf="GM_VE37414_WC";
		const {url,webPageType,rootVe,...y}=this.sd(cf,x); this.g(y);
		if(url!=="/shorts/") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SHORTS") debugger;
		if(rootVe!==37414) debugger;
	}
	/** @private @arg {GM_VE3611_WC['url']} x */
	_decode_channel_url(x) {
		if(this.str_starts_with("/@",x)) return;
		let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
		let a1=split_string_once(y,"/");
		switch(a1[0]) {
			default: debugger; break;
			case "gaming": if(a1.length!==1) debugger; break;
			case "channel": {
				let [,y1]=a1;
				if(this.str_starts_with("UC",y1)) return;
			} break;
		}
	}
	/** @private @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {
		const cf="RC_ResponseContext";
		const service_tracking=this.x.get("service_tracking");
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=this.sd(cf,x); this.g(y);
		this.t(mainAppWebResponseContext,this.RC_MainAppWebResponseContext);
		this.z(serviceTrackingParams,x => service_tracking.set_service_params(x));
		this.t(webResponseContextExtensionData,this.RC_WR_ContextExtension);
		this.t(consistencyTokenJar,this.RC_ConsistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.primitive_of(maxAgeSeconds,"number");
		this.t(stateTags,this.RCA_RelevantStateTags);
	}
	/** @private @arg {RCA_RelevantStateTags} x */
	RCA_RelevantStateTags(x) {
		const cf="RCA_RelevantStateTags";
		const {relevantStateTags,...y}=this.sd(cf,x); this.g(y);
		this.z(relevantStateTags,this.B_StateTag);
	}
	/** @private @arg {RC_ConsistencyTokenJar} x */
	RC_ConsistencyTokenJar(x) {
		const cf="RC_ConsistencyTokenJar";
		const {encryptedTokenJarContents,expirationSeconds,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @private @arg {RC_WR_ContextExtension} x */
	RC_WR_ContextExtension(x) {
		const cf="RC_WR_ContextExtension";
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=this.sd(cf,x); this.g(y);
		if(hasDecorated!==void 0) this.primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,this.D_YtConfig);
		this.t(webPrefetchData,this.D_WebPrefetch);
	}
	/** @private @arg {D_YtConfig} x */
	D_YtConfig(x) {
		const cf="D_YtConfig";
		const {visitorData,sessionIndex,rootVisualElementType,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(visitorData);
		if(sessionIndex!==0) debugger;
		/** @private @type {`${typeof rootVisualElementType}`} */
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
	/** @private @arg {D_WebPrefetch} x */
	D_WebPrefetch(x) {
		const cf="D_WebPrefetch";
		const {navigationEndpoints,...y}=this.sd(cf,x); this.g(y);
		this.z(navigationEndpoints,x => {
			if("watchEndpoint" in x) {
				return this.E_Watch(x);
			}
			debugger;
		});
	}
	/** @private @arg {RC_MainAppWebResponseContext} x */
	RC_MainAppWebResponseContext(x) {
		const cf="RC_MainAppWebResponseContext";
		const {datasyncId,loggedOut,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(datasyncId);
		this.primitive_of(loggedOut,"boolean");
	}
	/** @private @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse";
		x: {
			let jk=this.get_keys_of(x).join();
			if(jk==="responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar,observedStateTags,cacheMetadata") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar,observedStateTags") break x;
			if(jk==="responseContext,header,trackingParams,onResponseReceivedActions") break x;
			if(jk==="responseContext,contents,trackingParams,topbar,sidebar") break x;
			if(jk==="responseContext,trackingParams,onResponseReceivedActions") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar") break x;
			console.log(`-- [RS_Browse.jk_gen] --\n\nif(jk==="${jk}") break x;`);
			debugger;
		}
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.sd(cf,x); this.g(y);
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedActions,this.A_ResponseReceived);
		this.t(contents,this.G_BrowseContents);
		this.t(topbar,this.R_DesktopTopbar);
		this.t(frameworkUpdates,this.R_EntityBatchUpdate);
		this.t(sidebar,this.G_BrowseSidebar);
		this.tz(observedStateTags,this.B_StateTag);
		this.t(cacheMetadata,this.D_Cache_MD);
		this.t(metadata,this.G_Browse_MD);
		this.t(microformat,this.R_Microformat);
		this.t(maxAgeStoreSeconds,x => this.primitive_of(x,"number"));
		this.t(background,this.R_MusicThumbnail);
		this.t(continuationContents,this.C_SectionList);
		this.t_cf(cf,alerts,this.Response_alerts);
	}
	/** @private @arg {C_SectionList} x */
	C_SectionList(x) {this.H_("C_SectionList",x,this.G_SectionList);}
	/** @private @arg {R_Microformat} x */
	R_Microformat(x) {this.H_("R_Microformat",x,this.D_Microformat);}
	/** @private @arg {R_EntityBatchUpdate} x */
	R_EntityBatchUpdate(x) {this.H_("R_EntityBatchUpdate",x,this.D_EntityBatchUpdate);}
	/** @private @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("R_SettingsSidebar",x,this.D_SettingsSidebar);}
	/** @private @arg {R_CompactLink} x */
	R_CompactLink(x) {this.H_("R_CompactLink",x,this.D_CompactLink);}
	/** @private @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("PlaylistSidebar",x,this.D_PlaylistSidebar);}
	/** @private @arg {D_Microformat} x */
	D_Microformat(x) {
		const cf="D_Microformat";
		let uw=this.unwrap_microformat(x);
		{
			let {tags,familySafe,noindex,unlisted,thumbnail,title,description,schemaDotOrgType,androidPackage,appName,availableCountries,linkAlternates,siteName,ogType,...y}=this.sd(`${cf}.other`,uw.o); this.g(y);
		}
		{let {appArguments,appStoreId,...y}=this.sd(`${cf}.ios`,uw.ios); this.z([appArguments,appStoreId],this.primitive_str); this.g(y);}
		{
			let {canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos,...y}=this.sd(`${cf}.url`,uw.url); this.g(y);
			this.z([canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos],this.primitive_str);
			this.g(y);
		}
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD"; this.k(cf,x);
		if("channelMetadataRenderer" in x) return this.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.R_Playlist_MD(x);
		debugger;
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar"; this.k(cf,x);
		if("settingsSidebarRenderer" in x) return this.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.R_PlaylistSidebar(x);
		debugger;
	}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar";
		const {title,...y}=this.sd(cf,x);
		this.z(this.w(y),this.R_CompactLink);
	}
	/** @private @arg {D_CompactLink} x */
	D_CompactLink(x) {
		const cf="D_CompactLink"; this.k(cf,x);
		if("navigationEndpoint" in x) {
			let u=this.D_Link_Omit(cf,x);
			const {navigationEndpoint,style,...y}=this.sd(`${cf}.nav`,u); this.g(y);
			this.E_Browse(navigationEndpoint);
			if(style!=="COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR") debugger;
			return;
		}
		let u=this.D_Link_Omit(cf,x);
		const {icon,...y}=this.sd(`${cf}.icon`,u); this.g(y);
		switch(x.icon.iconType) {
			case "PERSON_ADD": break;
			default: debugger; break;
		}
	}
	/** @private @template {D_CompactLink} T @arg {D_Link_CF} cf @arg {T} x */
	D_Link_Omit(cf,x) {
		const {title,trackingParams,...y}=this.sd(cf,x);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("R_PlaylistSidebarPrimaryInfo",x,this.D_PlaylistSidebarPrimaryInfo);}
	/** @private @arg {D_Label} x */
	D_Label(x) {this.H_("Label",x,this.primitive_str);}
	/** @private @arg {D_Accessibility} x */
	D_Accessibility(x) {this.H_("D_Accessibility",x,this.D_Label);}
	/** @private @arg {R_Tab} x */
	R_Tab(x) {this.H_("Tab",x,this.D_Tab);}
	/** @private @arg {R_ExpandableTab} x */
	R_ExpandableTab(x) {this.H_("R_ExpandableTab",x,this.D_ExpandableTab);}
	/** @private @arg {R_PdgBuyFlow} x */
	R_PdgBuyFlow(x) {this.H_("R_PdgBuyFlow",x,this.D_PdgBuyFlow);}
	/** @private @arg {R_SuperVodBuyFlowContent} x */
	R_SuperVodBuyFlowContent(x) {this.H_("R_SuperVodBuyFlowContent",x,this.D_SuperVodBuyFlowContent);}
	/** @private @arg {R_PdgColorSlider} x */
	R_PdgColorSlider(x) {this.H_("R_PdgColorSlider",x,this.D_PdgColorSlider);}
	/** @private @arg {R_PdgCommentPreview} x */
	R_PdgCommentPreview(x) {this.H_("R_PdgCommentPreview",x,this.D_PdgCommentPreview);}
	/** @private @arg {R_PdgBuyFlowHeader} x */
	R_PdgBuyFlowHeader(x) {this.H_("R_PdgBuyFlowHeader",x,this.D_PdgBuyFlowHeader);}
	/** @private @arg {R_Menu} x */
	R_Menu(x) {this.H_("R_Menu",x,this.D_Menu);}
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow";
		const {header,content,trackingParams,onCloseCommand,...y}=this.sd(cf,x); this.g(y);
		this.R_PdgBuyFlowHeader(x.header);
		this.z(content,x => {
			if(!x.superVodBuyFlowContentRenderer) debugger;
			return this.R_SuperVodBuyFlowContent(x);
		});
		this.trackingParams(cf,trackingParams);
		if("getSurveyCommand" in onCloseCommand) {
			this.C_GetSurvey(onCloseCommand);
		} else {
			debugger;
		}
	}
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar";
		const {items,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(items,this.PlaylistSidebarItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {PlaylistSidebarItem} x */
	PlaylistSidebarItem(x) {
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		debugger;
	}
	/** @private @template {D_Button} T @arg {D_Button_CF} cf @arg {T} x */
	D_Button_Omit(cf,x) {
		const {accessibilityData,command,icon,isDisabled,serviceEndpoint,navigationEndpoint,tooltip,size,text,trackingParams,hint,targetId,...y}=this.sd(cf,x);
		this.t(accessibilityData,this.D_Accessibility);
		this.t(command,this.GC_Button);
		this.t(icon,this.T_Icon);
		if(isDisabled!==void 0) this.primitive_of(isDisabled,"boolean");
		this.t(serviceEndpoint,this.ES_Button);
		this.t(navigationEndpoint,this.Button_navigationEndpoint);
		if(tooltip&&typeof tooltip!=="string") debugger;
		if(size) {
			switch(size) {
				default: debugger; break;
				case "SIZE_DEFAULT": break;
				case "SIZE_SMALL": break;
			}
		}
		this.t(text,this.G_Text);
		this.t_cf(cf,trackingParams,this.trackingParams);
		this.t(hint,this.R_Hint);
		this.t(targetId,x => {
			/** @private @type {D_Button$TargetId} */
			switch(x) {
				case "clip-info-button": break;
				case "sponsorships-button": return;
				default: console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`); debugger;
			}
			this.targetId(cf,x);
		});
		return y;
	}
	/** @private @arg {D_Button} x */
	D_Button(x) {
		const cf="D_Button";
		if("style" in x&&"accessibility" in x) {
			const {accessibility,style,...y}=this.D_Button_Omit(`${cf}.Mixed`,x); this.g(y);
			if(accessibility) return this.D_Label(accessibility);
			this.t(style,x => this.save_string("[Button.style]",x));
			return;
		}
		if("style" in x) {
			const {style,...y}=this.D_Button_Omit(`${cf}.Styled`,x); this.g(y);
			this.t(style,x => this.save_string("[Button.style]",x));
			return;
		}
		if("accessibility" in x) {
			const {accessibility,...y}=this.D_Button_Omit(`${cf}.WithAccessibility`,x); this.g(y);
			if(accessibility) return this.D_Label(accessibility);
			return;
		}
		const {...y}=this.D_Button_Omit(cf,x); this.g(y);
	}
	/** @private @arg {D_PdgBuyFlowHeader} x */
	D_PdgBuyFlowHeader(x) {
		const cf="D_PdgBuyFlowHeader";
		const {text,helpButton,dismissButton,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(text);
		this.R_Button(helpButton);
		this.R_Button(dismissButton);
		this.codegen_renderer(cf,x);
		debugger;
	}
	/** @private @arg {string} cf @arg {{}} x */
	codegen_renderer(cf,x) {
		this.codegen.generate_renderer(x,cf);
	}
	/** @private @arg {RG_Result} x */
	RG_Result(x) {
		const cf="RG_Result"; this.k(cf,x);
		if("tabRenderer" in x) return this.R_Tab(x);
		if("expandableTabRenderer" in x) return this.R_ExpandableTab(x);
		debugger;
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>['endpoint']} x */
	D_Tab_subscriptionsEndpoint(x) {
		const cf="D_Tab_subscriptionsEndpoint"; this.k(cf,x);
		switch(x.commandMetadata.webCommandMetadata.rootVe) {
			default: this.do_codegen(cf,x); debugger; break;
			case 96368: break;
		}
		this.E_Browse(x);
	}
	/** @private @arg {D_Tab} x */
	D_Tab(x) {
		const cf="D_Tab"; this.k(cf,x);
		if("tabIdentifier" in x) {
			switch(x.tabIdentifier) {
				default: debugger; break;
				case "FEsubscriptions": {
					const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.sd(`${cf}_WhatToWatch`,x); this.g(y);
					this.D_Tab_subscriptionsEndpoint(endpoint);
					if(selected!==true) debugger;
					if(!content.sectionListRenderer) debugger;
					this.R_SectionList(content);
					this.trackingParams(cf,trackingParams);
				} break;
				case "FEwhat_to_watch": {
					const {selected,content,tabIdentifier: {},trackingParams,...y}=this.sd(`${cf}_WhatToWatch`,x); this.g(y);
					if(selected!==true) debugger;
					if(!content.richGridRenderer) debugger;
					this.R_RichGrid(content);
					this.trackingParams(cf,trackingParams);
				} break;
			}
			return;
		}
		debugger;
	}
	/** @private @arg {R_RichGrid} x */
	R_RichGrid(x) {this.H_("R_RichGrid",x,this.D_RichGrid);}
	/** @private @template {D_RichGrid} T @arg {"D_RichGrid"} cf @arg {T} x */
	D_RichGrid_Omit(cf,x) {
		const {contents,header,trackingParams,targetId,reflowOptions,...y}=this.sd(cf,x);
		this.z(contents,x => {
			if("richItemRenderer" in x) return this.R_RichItem(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			debugger;
		});
		this.R_FeedFilterChipBar(header);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="browse-feedFEwhat_to_watch") debugger;
		if(reflowOptions.minimumRowsOfVideosAtStart!==2) debugger;
		if(reflowOptions.minimumRowsOfVideosBetweenSections!==1) debugger;
		return y;
	}
	/** @private @arg {D_RichGrid} x */
	D_RichGrid(x) {
		const cf="D_RichGrid";
		if("masthead" in x) {
			const {masthead,...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
			this.R_AdSlot(masthead);
			return;
		}
		const {...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
	}
	/** @private @arg {R_RichItem} x */
	R_RichItem(x) {this.H_("R_RichItem",x,this.D_RichItem);}
	/** @private @arg {D_RichItem} x */
	D_RichItem(x) {
		const cf="D_RichItem";
		if("rowIndex" in x) {
			const {content,trackingParams,rowIndex,colIndex,...y}=this.sd(cf,x); this.g(y);
			this.G_RichItemContent(content);
			this.trackingParams(cf,trackingParams);
			this.save_number("[Item.pos]",[rowIndex,colIndex]);
			return;
		}
		const {content,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.G_RichItemContent(content);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_RichItemContent} x */
	G_RichItemContent(x) {
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("videoRenderer" in x) return this.R_Video(x);
		if("radioRenderer" in x) return this.R_Radio(x);
		if("feedNudgeRenderer" in x) return this.R_FeedNudge(x);
		debugger;
	}
	/** @private @arg {R_FeedNudge} x */
	R_FeedNudge(x) {this.H_("R_FeedNudge",x,this.D_FeedNudge);}
	/** @private @arg {R_MovingThumbnail} x */
	richThumbnail_Video(x) {
		if(!x) {debugger; return;}
		if("movingThumbnailRenderer" in x) return this.R_MovingThumbnail(x);
		console.log("rich.thumb",x);
		debugger;
	}
	/** @private @arg {R_MovingThumbnail} x */
	R_MovingThumbnail(x) {this.H_("R_MovingThumbnail",x,this.D_MovingThumbnail);}
	/** @private @arg {D_MovingThumbnail} x */
	D_MovingThumbnail(x) {
		const cf="D_MovingThumbnail";
		const {movingThumbnailDetails,enableHoveredLogging,enableOverlay,...y}=this.sd(cf,x); this.g(y);
		this.t(movingThumbnailDetails,x => {
			if("logAsMovingThumbnail" in x) {
				const cf="D_MovingThumbnail_Thumbnails";
				const {logAsMovingThumbnail,...y}=this.sd(cf,x);
				return this.D_Thumbnail(y);
			}
			this.D_Thumbnail(x);
		});
		if(enableHoveredLogging!==true) debugger;
		if(enableOverlay!==true) debugger;
	}
	/** @private @arg {R_Radio} x */
	R_Radio(x) {this.H_("R_Radio",x,this.D_Radio);}
	/** @private @arg {D_Radio} x */
	D_Radio(x) {
		const cf="D_Radio";
		let {...y}=this.Omit_Menu_Radio(cf,x);
		const {videos,...z}=y; this.g(z);
		this.z(videos,this.R_ChildVideo);
	}
	/** @private @arg {R_ChildVideo} x */
	R_ChildVideo(x) {this.H_("R_Radio",x,this.D_ChildVideo);}
	/** @private @arg {D_ChildVideo} x */
	D_ChildVideo(x) {
		const cf="D_ChildVideo";
		let y=this.D_ChildVideo_Omit(cf,x);
		this.g(y);
	}
	/** @private @template {R_ChildVideo_Omit} T @arg {string} cf @arg {T} x */
	D_ChildVideo_Omit(cf,x) {
		let {title,navigationEndpoint,lengthText,videoId,...y}=this.sd(cf,x);
		this.E_Watch(navigationEndpoint);
		return y;
	}
	/** @private @template {R_Omit_Menu_Radio&R_Omit_Compact_Player} T @arg {Omit_Menu_Radio_CF} cf @arg {T} x */
	R_Omit_Menu_Radio(cf,x) {
		let {navigationEndpoint,menu,...y}=this.Omit_Compact_Player(cf,x);
		this.R_Menu(menu);
		return y;
	}
	/** @private @template {D_Radio|D_CompactRadio} T @arg {Omit_Menu_Radio_CF} cf @arg {T} x */
	Omit_Menu_Radio(cf,x) {
		if("adSlotMetadata" in x) {debugger; throw new Error();}
		let u=this.R_Omit_Menu_Radio(cf,x);
		let {playlistId,thumbnail,videoCountText,thumbnailText,longBylineText,videoCountShortText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.playlistId(playlistId);
		this.D_Thumbnail(thumbnail);
		this.R_TextRuns(videoCountText);
		this.R_TextRuns(thumbnailText);
		this.G_Text(longBylineText);
		this.G_Text(videoCountShortText);
		return y;
	}
	/** @private @template T @arg {T} v1 @arg {T} v2 */
	expect_eq(v1,v2) {if(v1!==v2) {debugger; return false;}; return true;}
	/** @private @returns {true} */
	true_() {return true;}
	/** @private @arg {string} cf @arg {D_Video} x */
	D_Video_Handle(cf,x) {
		let {...u}=this.D_Video_Omit(cf,x);
		const {descriptionSnippet,publishedTimeText,lengthText,viewCountText,ownerBadges,badges,upcomingEventData,shortViewCountText,isWatched,topStandaloneBadge,richThumbnail,inlinePlaybackEndpoint,owner,buttons,...y}=u; this.g(y);
		this.t(descriptionSnippet,this.R_TextRuns);
		this.t(publishedTimeText,this.R_SimpleText);
		this.t(lengthText,this.R_SimpleText);
		this.t(viewCountText,this.G_Text);
		this.tz(ownerBadges,this.RMD_Badge);
		this.tz(badges,this.RMD_Badge);
		this.t(upcomingEventData,x => {
			const {isReminderSet,startTime,upcomingEventText,...y}=this.sd(cf,x); this.g(y);
			if(isReminderSet!==false) debugger;
			this.primitive_str(startTime);
			this.R_TextRuns(upcomingEventText);
		});
		this.t(owner,this.D_Video_Owner);
		this.t(shortViewCountText,this.G_Text);
		this.t(isWatched,x => this.expect_eq(x,this.true_()));
		this.t(topStandaloneBadge,this.RMD_Badge);
		this.t(richThumbnail,this.R_MovingThumbnail);
		this.t(inlinePlaybackEndpoint,this.D_Video_inlinePlaybackEndpoint);
		this.tz(buttons,this.R_ToggleButton);
	}
	/** @private @arg {D_Video} x */
	D_Video(x) {
		if("accessibility" in x) {console.log("video.accessibility",this.get_keys_of(x).join()); return this.D_Video_Handle("D_Video_Accessibility",x);}
		if("owner" in x) return this.D_Video_Handle("D_Video_Owner",x);
		if("videoId" in x) {
			if("topStandaloneBadge" in x) {
				return this.D_Video_Handle("D_Video_videoId_3",x);
			}
			if("descriptionSnippet" in x) {
				return this.D_Video_Handle("D_Video_videoId_2",x);
			}
			return this.D_Video_Handle("D_Video_videoId",x);
		}
		console.log("video.other",this.get_keys_of(x).join());
		this.D_Video_Handle("D_Video_Other",x);
	}
	/** @private @arg {R_ToggleButton} x */
	R_ToggleButton(x) {this.H_("R_ToggleButton",x,this.D_ToggleButton);}
	/** @private @arg {R_Video} x */
	R_Video(x) {this.H_("R_Video",x,this.D_Video);}
	/** @private @arg {Omit_Menu_Radio_CF} cf @template {{thumbnailOverlays:D_Video['thumbnailOverlays']}} T @arg {T} x */
	D_Omit_ThumbnailOverlay(cf,x) {
		const {thumbnailOverlays,...y}=this.sd(cf,x);
		this.z(thumbnailOverlays,x => {
			// TODO: #11 Handle thumbnailOverlay Renderers
			// Actually iterate over these renderers
			if("thumbnailOverlaySidePanelRenderer" in x) return;
			if("thumbnailOverlayHoverTextRenderer" in x) return;
			if("thumbnailOverlayNowPlayingRenderer" in x) return;
			if("thumbnailOverlayBottomPanelRenderer" in x) return;
			if("thumbnailOverlayTimeStatusRenderer" in x) return;
			if("thumbnailOverlayToggleButtonRenderer" in x) return;
			if("thumbnailOverlayLoadingPreviewRenderer" in x) return this.R_ThumbnailOverlayLoadingPreview(x);
			if("thumbnailOverlayResumePlaybackRenderer" in x) return;
			if("thumbnailOverlayEndorsementRenderer" in x) return;
			if("thumbnailOverlayInlineUnplayableRenderer" in x) return;
			this.do_codegen(`ThumbnailOverlay$${cf}`,x);
			debugger;
		});
		return y;
	}
	/** @private @arg {R_ThumbnailOverlayLoadingPreview} x */
	R_ThumbnailOverlayLoadingPreview(x) {this.H_("R_ThumbnailOverlayLoadingPreview",x,this.D_ThumbnailOverlayLoadingPreview);}
	/** @protected @arg {D_ThumbnailOverlayLoadingPreview} x */
	D_ThumbnailOverlayLoadingPreview(x) {this.H_("D_ThumbnailOverlayLoadingPreview",x,this.R_TextRuns);}
	/** @private @template {D_CompactVideo|D_Video} T @arg {Omit_Menu_Radio_CF} cf @arg {T} x */
	D_ThumbnailOverlay_Omit(cf,x) {
		const {trackingParams,menu,title,videoId,navigationEndpoint,thumbnail,longBylineText,shortBylineText,...y}=this.D_Omit_ThumbnailOverlay(cf,x);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {Omit_Menu_Radio_CF} cf @template {D_Video} T @arg {T} x */
	D_Video_Omit(cf,x) {
		let {ownerText,showActionMenu,channelThumbnailSupportedRenderers,...y}=this.D_ThumbnailOverlay_Omit(cf,x);
		this.R_TextRuns(ownerText);
		if(showActionMenu!==false) debugger;
		this.R_ChannelThumbnailWithLink(channelThumbnailSupportedRenderers);
		return y;
	}
	/** @private @arg {D_Video_Owner} x */
	D_Video_Owner(x) {
		const cf="D_Video_Owner";
		const {thumbnail,navigationEndpoint,accessibility,title,...y}=this.sd(cf,x); this.g(y);
		this.D_Thumbnail(thumbnail);
		this.E_Browse(navigationEndpoint);
		this.D_Accessibility(accessibility);
		this.primitive_str(title);
	}
	/** @private @arg {R_ChannelThumbnailWithLink} x */
	R_ChannelThumbnailWithLink(x) {this.H_("R_ChannelThumbnailWithLink",x,this.D_ChannelThumbnailWithLink);}
	/** @private @template {D_ChannelThumbnailWithLink} T @arg {string} cf @arg {T} x */
	D_ChannelThumbnailWithLink_Omit(cf,x) {
		const {thumbnail,navigationEndpoint,accessibility,...y}=this.sd(cf,x);
		this.D_Thumbnail(thumbnail);
		this.D_ChannelThumbnail_navigationEndpoint(navigationEndpoint);
		this.D_Accessibility(accessibility);
		return y;
	}
	/** @private @arg {D_ChannelThumbnailWithLink} x */
	D_ChannelThumbnailWithLink(x) {
		const cf="D_ChannelThumbnailWithLink";
		if("title" in x) {
			const {title,...y}=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
			this.primitive_str(title);
			return;
		}
		let y=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
	}
	/** @private @arg {D_ChannelThumbnailWithLink['navigationEndpoint']} x */
	D_ChannelThumbnail_navigationEndpoint(x) {
		const cf="D_ChannelThumbnail_navigationEndpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.E_Browse(x);
		debugger;
	}
	/** @private @arg {E_Watch} x */
	D_Video_inlinePlaybackEndpoint(x) {
		if("watchEndpoint" in x) return this.E_Watch(x);
		debugger;
	}
	/** @private @arg {C_Continuation} x */
	C_Continuation(x) {
		if(!x) {debugger; return;}
		const cf="C_Continuation";
		this.T_Endpoint(cf,x,x => this.y(x,this.DC_Continuation),x => this.y(x,this.GM_Next));
	}
	/** @private @arg {GM_Next} x */
	GM_Next(x) {
		const {sendPost,apiUrl,...y}=x; this.g(y);
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/next") debugger;
	}
	/** @private @arg {DC_Continuation} x */
	DC_Continuation(x) {
		if("continuationCommand" in x) debugger;
		const cf="DC_Continuation";
		if("command" in x) {
			const {command: x1,...b}=this.DC_Continuation_Omit(cf,x); this.g(b);
			this.C_ShowReloadUi(x1);
			return;
		}
		this.g(this.DC_Continuation_Omit(cf,x));
	}
	/** @private @arg {D_Thumbnail} x */
	D_Thumbnail(x) {
		const cf="D_Thumbnail"; this.k(cf,x);
		const {sampledThumbnailColor,accessibility,isOriginalAspectRatio,thumbnails: a,...y}=this.sd(cf,x); this.g(y);
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D_Accessibility);
		this.z(a,this.D_ThumbnailItem);
	}
	/** @private @arg {D_ThumbnailItem} x */
	D_ThumbnailItem(x) {
		const cf="D_ThumbnailItem";
		const {url,width,height,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(url);
		this.t(width,x => this.primitive_of(x,"number"));
		this.t(height,x => this.primitive_of(x,"number"));
	}
	/** @protected @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.sd(cf,x); this.g(y);
		this.E_Page(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this.primitive_of(fromHistory,"boolean");
		this.primitive_of(navigationDoneMs,"number");
	}
	/** @private @arg {YTNavigateFinishDetail['endpoint']} x */
	E_Page(x) {
		if(!("clickTrackingParams" in x)) return;
		if("browseEndpoint" in x) return;
		if("watchEndpoint" in x) return;
		debugger;
	}
	/** @private @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType"; this.k(cf,x);
		this.RC_ResponseContext(x.response.responseContext);
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
	/** @private @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup(x);
			debugger;
			return null;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @protected @arg {Response} response @arg {G_ResponseTypes} x */
	ResponseTypes(response,x) {
		const cf="ResponseTypes"; this.k(cf,x);
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
		/** @private */
		this._current_response_type=x.type;
		/** @private @type {{data:{responseContext:RC_ResponseContext;}}} */
		let v=x;
		this.RC_ResponseContext(v.data.responseContext);
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
			case "account.account_menu": return this.RS_AccountMenu(x.data);
			case "account.accounts_list": return this.RS_AccountsList(x.data);
			case "account.set_setting": return this.RS_SetSetting(x.data);
			case "att.get": return this.RS_AttGet(x.data);
			case "att.log": return this.RS_AttLog_RC(x.data);
			case "browse.edit_playlist": return this.RSB_EditPlaylist(x.data);
			case "browse": return this.RS_Browse(x.data);
			case "feedback": return this.RS_Feedback(x.data);
			case "get_transcript": return this.RSG_Transcript(x.data);
			case "get_survey": return this.RSG_Survey(x.data);
			case "getAccountSwitcherEndpoint": return this.REG_AccountSwitcher(x.data);
			case "getDatasyncIdsEndpoint": return this.REG_DatasyncIds(x.data);
			case "guide": return this.RS_Guide(x.data);
			case "like.like": return this.RSL_Like(x.data);
			case "like.dislike": return this.RSL_Dislike(x.data);
			case "like.removelike": return this.RSL_RemoveLike(x.data);
			case "live_chat.get_live_chat_replay": return this.RS_GetLiveChat(x.data);
			case "live_chat.get_live_chat": return this.RS_GetLiveChat(x.data);
			case "music.get_search_suggestions": return this.RSG_SearchSuggestions(x.data);
			case "next": return this.RS_Next(x.data);
			case "notification.get_notification_menu": return this.RSG_NotificationMenu(x.data);
			case "notification.get_unseen_count": return this.RSG_GetUnseenCount(x.data);
			case "notification.modify_channel_preference": return this.RSM_ChannelPreference(x.data);
			case "notification.record_interactions": return this.RS_Success(x.data);
			case "player": return this.RS_Player(x.data);
			case "playlist.get_add_to_playlist": return this.RSG_AddToPlaylist(x.data);
			case "reel.reel_item_watch": return this.RSW_ReelItem(x.data);
			case "reel.reel_watch_sequence": return this.RS_ReelWatchSequence(x.data);
			case "share.get_share_panel": return this.RSG_SharePanel(x.data);
			case "subscription.subscribe": return this.RS_Subscribe(x.data);
			case "subscription.unsubscribe": return this.RS_Unsubscribe(x.data);
			case "search": return this.RS_Search(x.data);
			case "updated_metadata": return this.RSU_M(x.data);
			case "pdg.get_pdg_buy_flow": return this.RSG_PdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @private @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey";
		const {responseContext: {},trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow";
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.sd(cf,x); this.g(y);
		let pu=this.TA_OpenPopup(command);
		if("pdgBuyFlowRenderer" in pu) {
			this.R_PdgBuyFlow(pu);
		}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(cf,trackingParams);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent";
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.sd(cf,x); this.g(y);
		this.z([description,disclaimerText],this.R_TextRuns);
		this.R_Button(buyButton);
		this.trackingParams(cf,trackingParams);
		this.R_PdgCommentPreview(commentPreview);
		this.R_PdgColorSlider(colorSlider);
		console.log("defaultPriceTier",defaultPriceTier);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {DE_SuperThanksSelectedTier} x */
	DE_SuperThanksSelectedTier(x) {
		const cf="DE_SuperThanksSelectedTier";
		const {index,key,...y}=this.sd(cf,x); this.g(y);
		console.log("super_thanks_selected_tier.index",index);
		console.log("super_thanks_selected_tier.key",key);
	}
	/** @private @arg {D_PdgColorSlider} x */
	D_PdgColorSlider(x) {
		const cf="D_PdgColorSlider";
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.sd(cf,x); this.g(y);
		this.z(notches,this.NotchesItem);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {NotchesItem} x */
	NotchesItem(x) {
		const cf="NotchesItem";
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.sd(cf,x); this.g(y);
		if(linearGradientCssStyle) {
			debugger;
		}
		if(knobColorArgb!==4280191205) debugger;
		this.E_YpcGetCart(purchaseCommand);
		this.R_SimpleText(tierValue);
	}
	/** @private @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {
		const cf="E_YpcGetCart";
		this.T_Endpoint(cf,x,x => this.y(x,this.D_YpcGetCart),this.M_YpcGetCart);
	}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.H_("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {
		const {apiUrl,sendPost,...y}=x; this.g(y);
		if(apiUrl!=="/youtubei/v1/ypc/get_cart") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {D_YpcGetCart} x */
	D_YpcGetCart(x) {
		const cf="D_YpcGetCart";
		let sp=this.w(x);
		this.params(cf,"YpcGetCart.transactionParams",sp);
	}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview";
		const {title,authorThumbnail,authorText,commentOptionRenderers,defaultCommentText,editButton,superThanksSelectedTierEntity,...y}=this.sd(cf,x); this.g(y);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {C_GetSurvey} x */
	C_GetSurvey(x) {
		const cf="C_GetSurvey";
		this.T_Endpoint(cf,x,x => {
			if(!x.getSurveyCommand) debugger;
			this.D_GetSurvey(this.w(x));
		},x => {
			const cf="GetSurveyCommandMetadata"; this.k(cf,x);
			const {apiUrl,sendPost,...y}/*!*/=this.w(x); this.g(y);
			if(apiUrl!=="/youtubei/v1/get_survey") debugger;
			if(sendPost!==true) debugger;
		});
	}
	/** @private @arg {D_GetSurvey} x */
	D_GetSurvey(x) {
		const cf="D_GetSurvey";
		const {action,endpoint: a,...y}=this.sd(cf,x); this.g(y);
		console.log("GetSurvey.action",x.action);
		this.R_PaidDigitalGoods(a);
	}
	/** @private @template T @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(x) {
		const cf="TA_OpenPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		return a;
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
			return x.type.split(".").map(x => {
				if(x.includes("_")) {
					return x.split("_").map(x => this.uppercase_first(x)).join("");
				}
				return this.uppercase_first(x);
			}).join("$");
		}
		let rk=this.filter_keys(this.get_keys_of(x));
		let kk=rk[0];
		return this.uppercase_first(kk);
	}
	/** @private @arg {RSU_M} x */
	RSU_M(x) {
		const cf="RSU_M";
		const {responseContext: {},continuation,actions,...y}=this.sd(cf,x); this.g(y);
		this.RD_TimedContinuation(continuation);
		this.z(actions,x => {
			if("updateViewershipAction" in x) return this.U_Viewership(x);
			if("updateToggleButtonTextAction" in x) return this.U_ToggleButtonText(x);
			if("updateDateTextAction" in x) return this.U_DateText(x);
			if("updateTitleAction" in x) return this.U_Title(x);
			if("updateDescriptionAction" in x) return this.UA_Description(x);
			console.log(x);
		});
	}
	/** @private @arg {UA_Description} x */
	UA_Description(x) {
		const cf="UA_Description"; this.k(cf,x);
		let x1=x.updateDescriptionAction;
		this.save_keys(`[UA_DescriptionData]`,x1);
		this.R_TextRuns(x1.description);
	}
	/** @private @arg {U_Title} x */
	U_Title(x) {
		const cf="UA_Title"; this.k(cf,x);
		let x1=x.updateTitleAction;
		this.save_keys(`[UA_TitleData]`,x1);
		this.R_TextRuns(x1.title);
	}
	/** @private @arg {U_DateText} x */
	U_DateText(x) {
		const cf="UA_DateText"; this.k(cf,x);
		let x1=x.updateDateTextAction;
		this.save_keys(`[UA_DateTextData]`,x1);
		this.R_SimpleText(x1.dateText);
	}
	/** @private @arg {U_ToggleButtonText} x */
	U_ToggleButtonText(x) {
		const cf="UA_ToggleButtonText"; this.k(cf,x);
		let x1=x.updateToggleButtonTextAction; x1;
		this.save_keys(`[UA_ToggleButtonTextData]`,x1);
		if(x1.buttonId!=="TOGGLE_BUTTON_ID_TYPE_LIKE") debugger;
		this.R_SimpleText(x1.defaultText);
		this.R_SimpleText(x1.toggledText);
	}
	/** @private @arg {U_Viewership} x */
	U_Viewership(x) {
		const cf="UA_Viewership"; this.k(cf,x);
		let x1=x.updateViewershipAction;
		this.save_keys(`[UA_ViewershipData]`,x1);
		this.R_VideoViewCount(x1.viewCount);
	}
	/** @private @arg {RS_Search} x */
	RS_Search(x) {
		const cf="RS_Search";
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(estimatedResults);
		this.R_TwoColumnSearchResults(contents);
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(topbar);
		this.z(refinements,this.primitive_str);
		this.z(onResponseReceivedCommands,x => {
			if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
			debugger;
		});
		this.targetId(cf,targetId);
	}
	/** @private @arg {C_AdsControlFlowOpportunityReceived} x */
	C_AdsControlFlowOpportunityReceived(x) {
		const cf="C_AdsControlFlowOpportunityReceived";
		const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_AdsControlFlowOpportunityReceived(adsControlFlowOpportunityReceivedCommand);
	}
	/** @private @arg {RSG_SearchSuggestions} x */
	RSG_SearchSuggestions(x) {
		const cf="RSG_SearchSuggestions";
		const {responseContext: {},trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_PaidDigitalGoods} x */
	R_PaidDigitalGoods(x) {this.H_("R_PaidDigitalGoods",x,this.B_Hack);}
	/** @private @arg {B_Hack} x */
	B_Hack(x) {
		const cf="B_Hack";
		const {hack,...y}=this.sd(cf,x); this.g(y);
		if(hack!==true) debugger;
	}
	/** @private @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player";
		const {responseContext: {},playabilityStatus,...y}=this.sd(cf,x);
		console.log("[RS_Player.next_key]",this.get_keys_of(y)[0]);
		// this.tz(x.annotations,this.R_PlayerAnnotationsExpanded);
	}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("R_PlayerAnnotationsExpanded",x,this.D_PlayerAnnotationsExpanded);}
	static {
		(new this({value: null})).R_PlayerAnnotationsExpanded;
	}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded";
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.sd(cf,x); this.g(y);
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
	}
	/** @private @arg {UUIDString} x */
	parse_uuid(x) {
		let uuid_parts=split_string(x,"-");
		let [_up0,up1,up2,up3,_up4]=uuid_parts;
		if(up1!=="0000") debugger;
		if(split_string(up2,"")[0]!=="2") debugger;
		let bd=parseInt(split_string(up3,"")[0],16).toString(2);
		if(bd.length!==4) debugger;
		if(bd.slice(0,2)!=="10") debugger;
		return uuid_parts;
	}
	/** @private @arg {D_FeaturedChannel} x */
	D_FeaturedChannel(x) {
		const cf="D_FeaturedChannel";
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.sd(cf,x); this.g(y);
		this.z([startTimeMs,endTimeMs],this.primitive_str);
		this.D_Thumbnail(watermark);
		this.trackingParams(cf,trackingParams);
		this.E_Browse(navigationEndpoint);
		this.primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
	}
	/** @private @arg {R_SubscribeButton} x */
	R_SubscribeButton(x) {this.H_("R_SubscribeButton",x,this.D_SubscribeButton);}
	/** @private @arg {`UC${string}`} x */
	channelId(x) {
		if(this.str_starts_with("UC",x)) {
			if(x.length===24) return;
			console.log("[channelId.length]",x.length);
			return;
		}
		debugger;
	}
	/** @private @arg {D_SubscribeButton} x */
	D_SubscribeButton(x) {
		const cf="D_SubscribeButton";
		if("serviceEndpoints" in x) {
			const {buttonText,subscribed,enabled,type,channelId,trackingParams,showPreferences,serviceEndpoints,...y}=this.sd(cf,x);
			this.R_TextRuns(buttonText);
			this.primitive_of(subscribed,"boolean");
			if(enabled!==true) debugger;
			if(type!=="FREE") debugger;
			this.channelId(channelId);
			this.trackingParams(cf,trackingParams);
			if(showPreferences!==false) debugger;
			let [sub,o1]=this.unwrap_prefix(y,"subscribed");
			let [un_sub,o2]=this.unwrap_prefix(o1,"unsubscribed");
			/** @arg {RemovePrefix<D_SubscribeButton,"subscribed">} x */
			let r_sub=({...x}) => {
				if("entityKey" in x) {
					const {buttonText,entityKey,...y}=this.sd(`${cf}.subscribed`,x); this.g(y);
					this.R_TextRuns(buttonText);
					console.log("[subscribed.entityKey]",entityKey);
					return;
				}
				if("buttonText" in x) {
					const {buttonText,...y}=this.sd(`${cf}.subscribed`,x); this.g(y);
					this.R_TextRuns(buttonText);
					return;
				}
				this.g(x);
			};
			r_sub(sub);
			/** @arg {RemovePrefix<D_SubscribeButton,"unsubscribed">} x */
			let r_un_sub=({...x}) => {
				const {buttonText,...y}=this.sd(`${cf}.unsubscribed`,x); this.g(y);
				this.R_TextRuns(buttonText);
			};
			r_un_sub(un_sub);
			let [sub_2,o3]=this.unwrap_prefix(o2,"subscribe");
			let [un_sub_2,{...o4}]=this.unwrap_prefix(o3,"unsubscribe");
			/** @arg {RemovePrefix<Omit<D_SubscribeButton,`subscribed${string}`>,"subscribe">} x */
			let r_sub_2=({...x}) => {
				const {accessibility,...y}=this.sd(`${cf}.subscribe`,x); this.g(y);
				this.D_Accessibility(accessibility);
			};
			r_sub_2(sub_2);
			/** @arg {RemovePrefix<Omit<D_SubscribeButton,`unsubscribed${string}`>,"unsubscribe">} x */
			let r_un_sub_2=({...x}) => {
				const {buttonText,accessibility,...y}=this.sd(`${cf}.unsubscribe`,x); this.g(y);
				this.R_TextRuns(buttonText);
				this.D_Accessibility(accessibility);
			};
			r_un_sub_2(un_sub_2);
			this.g(o4);
			return;
		}
		if("targetId" in x) {
			console.log(`[${cf}.next_key] [%s]`,this.get_keys_of(x)[0]);
			debugger;
			return;
		}
		debugger;
	}
	/** @private @arg {RSL_Like} x */
	RSL_Like(x) {
		const cf="RSL_Like";
		const {responseContext: {},actions,...y}=this.sd(cf,x); this.g(y);
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup(x);
			debugger;
			return null;
		});
	}
	/** @private @arg {RSL_Dislike} x */
	RSL_Dislike(x) {
		const cf="RSL_Dislike";
		const {responseContext: {},actions,...y}=this.sd(cf,x); this.g(y);
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup(x);
			debugger;
			return null;
		});
	}
	/** @private @arg {RSL_RemoveLike} x */
	RSL_RemoveLike(x) {
		const cf="RSL_RemoveLike";
		const {responseContext: {},actions,...y}=this.sd(cf,x); this.g(y);
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.TA_OpenPopup(x);
			debugger;
			return null;
		}));
	}
	/** @private @arg {RS_ReelWatchSequence} x */
	RS_ReelWatchSequence(x) {
		const cf="RS_ReelWatchSequence";
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.z(entries,x => this.T_Command_TP(x,this.E_ReelWatch));
		this.trackingParams(cf,trackingParams);
		this.t(continuationEndpoint,this.C_Continuation);
	}
	/** @private @arg {M_VE37414} x */
	M_VE37414(x) {
		const cf="M_VE37414";
		const {webCommandMetadata: a,...y}=this.sd(cf,x); this.g(y);
		this.GM_VE37414_WC(a);
	}
	/** @private @arg {Omit<E_ReelWatch,"clickTrackingParams"|"commandMetadata">} x */
	IC_ReelWatch(x) {this.H_("IC_ReelWatch",x,this.D_ReelWatch);}
	/** @private @arg {E_ReelWatch} x */
	E_ReelWatch(x) {this.T_Endpoint("E_ReelWatch",x,this.IC_ReelWatch,this.M_VE37414);}
	/** @private @arg {D_ReelWatch} x */
	D_ReelWatch(x) {
		const cf="D_ReelWatch";
		const {videoId,playerParams,thumbnail,overlay,params,sequenceProvider,sequenceParams,inputType,...y}=this.sd(cf,x); this.g(y);
		this.t(videoId,this.videoId);
		this.params(cf,"reel.player_params",playerParams);
		this.params(cf,"reel.params",params);
	}
	/** @private @arg {RS_GetLiveChat} x */
	RS_GetLiveChat(x) {
		const cf="RS_GetLiveChat";
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=this.sd(cf,x); this.g(y);
		this.RC_LiveChat(a1);
		this.t_cf(cf,a2,this.trackingParams);
	}
	/** @private @arg {R_MP_MenuNotificationSection_Item} x */
	R_MP_MenuNotificationSection_Item(x) {
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		console.log(x);
		debugger;
	}
	/** @private @arg {D_NotificationMenu_Popup_SectionItem} x */
	D_NotificationMenu_Popup_SectionItem(x) {
		if("multiPageMenuNotificationSectionRenderer" in x) return this.w(x);
		debugger;
		return;
	}
	/** @private @arg {D_NotificationMenu_PopupItem} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem";
		const {header,sections,style,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this._R_SimpleMenuHeader(header);
		let [iw]=this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		this.z(iw[0].items,this.R_MP_MenuNotificationSection_Item);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_NotificationMenu_Popup} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup";
		const {popupType: a,popup: b,...y}=this.sd(cf,x); this.g(y);
		if(a!=="DROPDOWN") debugger;
		let u=this.TR_MP_Menu(b);
		this.D_NotificationMenu_PopupItem(u);
	}
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.sd(cf,x); this.g(y);
		let [ar]=this.z(actions,x => {
			if(x.openPopupAction) return this.TA_OpenPopup(x);
			debugger;
			return null;
		});
		this.z(ar,x => {
			this.D_NotificationMenu_Popup(x);
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("SimpleMenuHeader",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader";
		const {title,buttons,...y}=this.sd(cf,x); this.g(y);
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next";
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=this.sd(cf,x); this.g(y);
		this.t(contents,this.G_NextContents);
		this.t(currentVideoEndpoint,this.E_Watch);
		this.trackingParams(cf,trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.GE_ResponseReceived(cf,a));
		this.tz(engagementPanels,this.R_EngagementPanelSectionList);
		this.t(videoReporting,this.R_ReportFormModal);
		this.t(queueContextParams,a => this.params(cf,"next.queue_context_params",a));
		this.t(continuationContents,this.RC_PlaylistPanel);
	}
	/** @private @arg {G_NextContents} x */
	G_NextContents(x) {
		if("twoColumnWatchNextResults" in x) return this.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		x===0;
		debugger;
	}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("R_SingleColumnMusicWatchNextResults",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("R_Tabbed",x,this.R_WatchNextTabbedResults);}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("R_WatchNextTabbedResults",x,this.D_WatchNextTabbedResults);}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults";
		const {tabs,...y}=this.sd(cf,x); this.g(y);
		this.z(tabs,this.R_Tab);
	}
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("RC_PlaylistPanel",x,this.DC_PlaylistPanel);}
	/** @private @arg {R_VoiceSearchDialog} x */
	R_VoiceSearchDialog(x) {this.H_("R_VoiceSearchDialog",x,this.D_VoiceSearchDialog);}
	/** @private @arg {R_CommentsHeader} x */
	R_CommentsHeader(x) {this.H_("R_VoiceSearchDialog",x,this.D_CommentsHeader);}
	/** @private @arg {D_CommentsHeader} x */
	D_CommentsHeader(x) {
		const cf="D_CommentsHeader";
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(countText);
		this.R_CommentSimplebox(createRenderer);
		this.R_SortFilterSubMenu(sortMenu);
		this.trackingParams(cf,trackingParams);
		this.R_TextRuns(titleText);
		this.R_TextRuns(commentsCount);
		if(showSeparator!==true) debugger;
		this.z(customEmojis,this.D_CustomEmoji);
		this.parser.parse_url(cf,as(unicodeEmojisUrl));
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {R_CommentSimplebox} x */
	R_CommentSimplebox(x) {this.H_("R_CommentSimplebox",x,this.D_CommentSimplebox);}
	/** @private @arg {R_SortFilterSubMenu} x */
	R_SortFilterSubMenu(x) {this.H_("R_SortFilterSubMenu",x,this.D_SortFilterSubMenu);}
	/** @private @arg {D_VoiceSearchDialog} x */
	D_VoiceSearchDialog(x) {
		const cf="D_VoiceSearchDialog";
		const {trackingParams,exitButton,...y}=this.sd(cf,x);
		let u=Object.entries(y);
		for(let x of u) {
			let c=x[1];
			if("runs" in c) {
				this.R_TextRuns(c);
				continue;
			}
			debugger;
		}

	}
	/** @private @arg {C_ScrollToEngagementPanel} x */
	C_ScrollToEngagementPanel(x) {
		const cf="C_ScrollToEngagementPanel";
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.D_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @private @arg {D_ScrollToEngagementPanel} x */
	D_ScrollToEngagementPanel(x) {
		const cf="D_ScrollToEngagementPanel";
		const {targetId,...y}=this.sd(cf,x); this.g(y);
		this.targetId(cf,targetId);
	}
	//#region pause
	//#endregion
	/** @private @template T @template U @arg {T_ES_Signal<T,U>} x @arg {(this:this,x:T)=>void} f_t @arg {(this:this,x:U)=>void} f_u */
	T_ES_Signal(x,f_t,f_u) {
		const cf="T_ES_Signal";
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.sd(cf,x); this.g(y);
		f_t.call(this,x.commandMetadata);
		f_u.call(this,x.signalServiceEndpoint);
	}
	/** @private @template U @template {T_Signal<U>} T @arg {T} x @arg {(t:U)=>void} f @returns {Omit<T,"signal">} */
	Signal_Omit(x,f) {
		const cf="Signal$Omit";
		const {signal,...y}=this.sd(cf,x); f(signal);
		return y;
	}
	/** @private @arg {Extract<S_Client_Item,TA_OpenPopup<any>>['openPopupAction']['popup']} x */
	S_Client_HandlePopup(x) {
		const cf="S_Client_HandlePopup";
		if("voiceSearchDialogRenderer" in x) return this.R_VoiceSearchDialog(x);
		if("notificationActionRenderer" in x) return this.R_NotificationAction(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {Extract<S_Client_Item,TA_OpenPopup<any>>['openPopupAction']} x */
	S_Client_OpenPopupAction(x) {
		const cf="S_VoiceSearchPopup_Dialog";
		const {popup,popupType,...y}=this.sd(cf,x); this.g(y);
		this.S_Client_HandlePopup(popup);
	}
	/** @private @arg {Extract<S_Client_Item,TA_OpenPopup<any>>} x */
	S_Client_Popup(x) {
		const cf="S_Client_Popup";
		const {clickTrackingParams,openPopupAction,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.S_Client_OpenPopupAction(openPopupAction);
	}
	/** @private @arg {G_ClientSignal} x */
	G_ClientSignal(x) {
		const cf="G_ClientSignal";
		let om=this.Signal_Omit(x,x => {
			this.save_string(`[${cf}.signal]`,x);
			if(x!=="CLIENT_SIGNAL") debugger;
		});
		this.z(this.w(om),x => {
			/** @type {S_Client_Item} */
			if("openPopupAction" in x) return this.S_Client_Popup(x);
			if("showEngagementPanelEndpoint" in x) return this.E_ShowEngagementPanel(x);
			if("sendFeedbackAction" in x) return this.A_SendFeedback(x);
			if("signalAction" in x) return this.A_Signal(x);
			if("addToPlaylistCommand" in x) return this.C_AddToPlaylist(x);
			debugger;
		});
	}
	/** @private @arg {C_AddToPlaylist} x */
	C_AddToPlaylist(x) {this.T_Endpoint("C_AddToPlaylist",x,a => this.DC_AddToPlaylist(this.w(a)));}
	/** @private @arg {DC_AddToPlaylist} x */
	DC_AddToPlaylist(x) {
		const cf="DC_AddToPlaylist";
		const {listType,onCreateListCommand,openListPanel,openMiniplayer,videoId,videoIds,...y}=x; this.g(y);
		console.log(`${cf}.listType`,listType);
		this.ES_CreatePlaylist(onCreateListCommand);
		this.z([openListPanel,openMiniplayer],this.primitive_bool);
		this.videoId(videoId);
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {GE_ResponseReceived_CF} cf @arg {GE_ResponseReceived} x */
	GE_ResponseReceived(cf,x) {
		this.save_keys(`[${cf}.response_endpoint]`,x);
		if("signalServiceEndpoint" in x) {
			this.T_ES_Signal(x,a => {
				a;
				debugger;
			},this.G_ClientSignal);
		} else if("adsControlFlowOpportunityReceivedCommand" in x) {
			this.C_AdsControlFlowOpportunityReceived(x);
		} else if("changeKeyedMarkersVisibilityCommand" in x) {
			const {clickTrackingParams,changeKeyedMarkersVisibilityCommand,...y}=this.sd(cf,x); this.g(y);
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_ChangeKeyedMarkersVisibility(changeKeyedMarkersVisibilityCommand);
		} else if("loadMarkersCommand" in x) {
			const {clickTrackingParams,loadMarkersCommand,...y}=this.sd(cf,x); this.g(y);
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_LoadMarkers(loadMarkersCommand);
		} else if("reloadContinuationItemsCommand" in x) {
			this.C_ReloadContinuationItems(x);
		} else if("appendContinuationItemsAction" in x) {
			const {clickTrackingParams,appendContinuationItemsAction,...y}=this.sd(cf,x); this.g(y);
			this.clickTrackingParams(cf,clickTrackingParams);
			this.G_AppendContinuationItems(appendContinuationItemsAction);
		} else {
			debugger;
		}
	}
	/** @private @arg {G_AppendContinuationItems} x */
	G_AppendContinuationItems(x) {
		const cf="G_AppendContinuationItems"; this.targetId(cf,x.targetId);
		if(this.starts_with_targetId(x,"comment-replies-item-")) return this.CommentRepliesItem(x);
		this.save_string("[ContinuationItem.targetId]",x.targetId);
		switch(x.targetId) {
			case "browse-feedFEwhat_to_watch": this.A_BrowseFeed$(x); break;
			case "comments-section": this.A_CommentsSectionContinuation$(x); break;
			case "watch-next-feed": this.A_WatchNext$(x); break;
			default: x===0; debugger;
		}
	}
	/** @private @arg {C_ReloadContinuationItems} x */
	C_ReloadContinuationItems(x) {
		const cf="C_ReloadContinuationItems";
		const {clickTrackingParams,reloadContinuationItemsCommand,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ReloadContinuationItems(reloadContinuationItemsCommand);
	}
	/** @private @template {DC_ReloadContinuationItems} T @arg {string} cf @arg {T} x */
	DC_ReloadContinuationItems_Omit(cf,x) {
		const {slot,...y}=this.sd(cf,x);
		this.save_enum("RELOAD_CONTINUATION_SLOT",x.slot);
		return y;
	}
	/** @private @arg {DC_ReloadContinuationItems} x */
	DC_ReloadContinuationItems(x) {
		const cf="DC_ReloadContinuationItems";
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.save_string("[Body.targetId]",targetId);
				this.z(continuationItems,a => {
					this.save_keys("[continuationItem]",a);
				});
			} break;
			case "RELOAD_CONTINUATION_SLOT_HEADER": {
				const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.save_string("[Header.targetId]",targetId);
				if(targetId!=="comments-section") debugger;
				this.z(continuationItems,this.R_CommentsHeader);
			} break;
			default: debugger; break;
		};
	}
	/** @private @arg {DC_LoadMarkers} x */
	DC_LoadMarkers(x) {
		const cf="DC_LoadMarkers";
		const {entityKeys,...y}=this.sd(cf,x); this.g(y);
		this.z(entityKeys,this.primitive_str);
	}
	/** @private @arg {DC_ChangeKeyedMarkersVisibility} x */
	DC_ChangeKeyedMarkersVisibility(x) {
		const cf="DC_ChangeKeyedMarkersVisibility";
		const {isVisible,key,...y}=this.sd(cf,x); this.g(y);
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @private @arg {D_PlayerOverlay} x */
	D_PlayerOverlay(x) {
		const cf="D_PlayerOverlay"; this.k(cf,x);
		if("browserMediaSession" in x) {
			return this.A_BrowserMediaSession(x);
		}
		const {endScreen,autoplay,shareButton,addToMenu,autonavToggle,videoDetails,...y}=this.sd(cf,x);
		this.R_WatchNextEndScreen(endScreen);
		this.R_PlayerOverlayAutoplay(autoplay);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		this.t(autonavToggle,this.R_AutoplaySwitchButton);
		this.R_WatchNextEndScreen(endScreen);
		// this.t(autoplay,this.R_PlayerOverlayAutoplay);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		if("decoratedPlayerBarRenderer" in y) {
			return this.R_DecoratedPlayerBar(this.w(y));
		}
		this.g(y);
	}
	/** @private @arg {R_DecoratedPlayerBar} x */
	R_DecoratedPlayerBar(x) {this.H_("R_DecoratedPlayerBar",x,this.D_DecoratedPlayerBar);}
	/** @private @arg {R_NotificationAction} x */
	R_NotificationAction(x) {this.H_("R_NotificationAction ",x,this.D_NotificationAction);}
	/** @private @arg {D_DecoratedPlayerBar} x */
	D_DecoratedPlayerBar(x) {
		const cf="D_DecoratedPlayerBar"; this.k(cf,x);
		const {playerBar,...y}=this.sd(cf,x);
		if("playerBarActionButton" in y) {
			return this.R_Button(this.w(y));
		}
		this.g(y);
	}
	/** @private @arg {R_AutoplaySwitchButton} x */
	R_AutoplaySwitchButton(x) {this.H_("R_AutoplaySwitchButton",x,this.D_AutoplaySwitchButton);}
	/** @private @arg {D_AutoplaySwitchButton} x */
	D_AutoplaySwitchButton(x) {
		const cf="D_AutoplaySwitchButton";
		const {onEnabledCommand,onDisabledCommand,enabledAccessibilityData,disabledAccessibilityData,trackingParams,enabled}=this.sd(cf,x);
		this.z([onEnabledCommand,onDisabledCommand],(x) => {
			const cf="E_SetSettingAutonavForDesktop";
			const {clickTrackingParams,commandMetadata,setSettingEndpoint,...y}=this.sd(cf,x); this.g(y);
			this.clickTrackingParams(cf,clickTrackingParams);
			if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/account/set_setting") debugger;
			this.G_CommandMetadata(commandMetadata,true);
		});
		this.D_Accessibility(enabledAccessibilityData);
		this.D_Accessibility(disabledAccessibilityData);
		this.trackingParams(cf,trackingParams);
		this.save_boolean("[autoplay.switch.enabled]",enabled);
	}
	/** @private @arg {R_PlayerOverlayAutoplay} x */
	R_PlayerOverlayAutoplay(x) {this.H_("R_PlayerOverlayAutoplay",x,this.D_PlayerOverlayAutoplay);}
	/** @private @arg {R_WatchNextEndScreen} x */
	R_WatchNextEndScreen(x) {this.H_("R_WatchNextEndScreen",x,this.D_WatchNextEndScreen);}
	/** @private @arg {D_WatchNextEndScreen} x */
	D_WatchNextEndScreen(x) {
		const cf="D_WatchNextEndScreen";
		const {results,title,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(results,this.G_WatchNextEndScreenItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_WatchNextEndScreenItem} x */
	G_WatchNextEndScreenItem(x) {
		// TODO: #10 #9 Actually handle these
		// Not currently handling any children
		if("endScreenPlaylistRenderer" in x) return this.R_EndScreenPlaylist(x);
		if("endScreenVideoRenderer" in x) return this.R_EndScreenVideo(x);
		debugger;
	}
	/** @private @arg {string} a @arg {{}} b */
	k=(a,b) => this.save_keys(`[${a}]`,b);
	/** @private @template {{}} T @arg {string} cf @arg {T} x */
	sd(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @private @arg {A_BrowserMediaSession} x */
	A_BrowserMediaSession(x) {
		const cf="A_BrowserMediaSession";
		const {actions,browserMediaSession,...y}=this.sd(cf,x); this.g(y);
		this.z(actions,(x => {
			if(!x.likeButtonRenderer) debugger;
			this.R_LikeButton(x);
		}));
		this.R_BrowserMediaSession(browserMediaSession);
	}
	/** @private @arg {R_BrowserMediaSession} x */
	R_BrowserMediaSession(x) {this.H_("R_BrowserMediaSession",x,this.AD_BrowserMediaSession);}
	/** @private @arg {string} x */
	primitive_str(x) {this.primitive_of(x,"string");}
	/** @private @arg {D_Menu} x */
	D_Menu(x) {
		const cf="D_Menu";
		const {trackingParams,accessibility,items,targetId,loggingDirectives,flexibleItems,topLevelButtons,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.t(accessibility,this.D_Accessibility);
		this.tz(items,this.G_MenuItem);
		/** @private @type {D_Menu_TargetId} */
		this.t(targetId,a => this.targetId(cf,a));
		this.t(loggingDirectives,this.D_LoggingDirectives);
	}
	/** @private @arg {G_MenuItem} x */
	G_MenuItem(x) {
		const cf="G_MenuItem"; this.k(cf,x);
		if("toggleMenuServiceItemRenderer" in x) return this.R_ToggleMenuServiceItem(x);
		if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		this.do_codegen("MenuItems",x);
		x;
	}
	/** @private @template T @arg {T_ES_Signal<M_SendPost, T>} x @returns {["signalServiceEndpoint",T]} */
	TE_SignalService_I_0(x) {
		const cf="TE_SignalService_I_0";
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_SendPost(commandMetadata);
		return ["signalServiceEndpoint",signalServiceEndpoint];
	}
	/** @private @arg {RD_MenuServiceItem['serviceEndpoint']} x */
	RD_MenuServiceItem_serviceEndpoint(x) {
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		if("signalServiceEndpoint" in x) return this.TE_SignalService_I_0(x);
		if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("shareEntityServiceEndpoint" in x) return this.ES_ShareEntity(x);
		if("getReportFormEndpoint" in x) return this.E_GetReportForm(x);
		x==="";
		debugger;
	}
	/** @private @arg {E_GetReportForm} x */
	E_GetReportForm(x) {
		const cf="E_GetReportForm";
		const {clickTrackingParams,
			commandMetadata: {
				webCommandMetadata: {sendPost: s,apiUrl: u,...y1},...y2},
			getReportFormEndpoint: {params: p,...y4},...y3}=x; this.z([y1,y2,y3,y4],this.g);
		this.clickTrackingParams(cf,clickTrackingParams);
		if(s!==true) debugger;
		if(u!=="/youtubei/v1/flag/get_form") debugger;
		this.params(cf,"get_report_form",p);
	}
	codegen_all_service_menu_icons() {
		console.log(this.service_menu_icons.join());
	}
	/** @arg {string} x */
	new_service_icon(x) {
		if(this.service_menu_icons.includes(x)) return;
		this.service_menu_icons.push(x);
		this.codegen_all_service_menu_icons();
	}
	/** @private @type {string[]} */
	service_menu_icons=[];
	/** @private @arg {string} cf @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem_Omit(cf,x) {
		const {text,icon,serviceEndpoint,trackingParams,...y}=x;
		this.R_TextRuns(text);
		switch(icon.iconType) {
			default: this.new_service_icon(icon.iconType); break;
			case "NOT_INTERESTED":
			case "ADD_TO_QUEUE_TAIL": break;
		}
		let res=this.RD_MenuServiceItem_serviceEndpoint(serviceEndpoint);
		this.t(res,u => {
			switch(u[0]) {
				case "signalServiceEndpoint": return this.G_ClientSignal(u[1]);
				default: debugger; break;
			}
		});
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @type {RD_MenuServiceIconType_1} */
	/** @private @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem(x) {
		const cf="RD_MenuServiceItem";
		const u=this.RD_MenuServiceItem_Omit(cf,x);
		if("hasSeparator" in u) {
			const {hasSeparator,...y}=u; this.g(y);
			if(hasSeparator!==true) debugger;
			return;
		}
		this.g(u);
	}
	/** @private @arg {R_MenuServiceItem} x */
	R_MenuServiceItem(x) {this.H_("R_MenuServiceItem",x,this.RD_MenuServiceItem);}
	/** @protected @arg {E_AddToPlaylistService} x */
	E_AddToPlaylistService(x) {
		this.T_Endpoint("E_AddToPlaylistService",x,
			x => this.DE_AddToPlaylistService(this.w(x)),
			x => {let {webCommandMetadata: a,...y}=x; this.g(y); this.GM_playlist_get_add_to_playlist(a);});
	}
	/** @protected @arg {GM_playlist_get_add_to_playlist} x */
	GM_playlist_get_add_to_playlist(x) {
		const {apiUrl,sendPost,...y1}=x; this.g(y1);
		if(apiUrl!=="/youtubei/v1/playlist/get_add_to_playlist") debugger;
		if(sendPost!==true) debugger;
	}
	/** @protected @arg {DE_AddToPlaylistService} x */
	DE_AddToPlaylistService(x) {
		const {videoId,...y}=x; this.g(y);
		this.videoId(videoId);
	}
	/** @protected @arg {E_PlaylistEdit} x */
	E_PlaylistEdit(x) {
		const cf="E_PlaylistEdit"; this.k(cf,x);
		const {clickTrackingParams,commandMetadata: {webCommandMetadata,...y1},playlistEditEndpoint,...y}=this.sd(cf,x); this.g(y); this.g(y1);
		this.clickTrackingParams(cf,clickTrackingParams);
		if(webCommandMetadata.apiUrl!=="/youtubei/v1/browse/edit_playlist") debugger;
		this.GM_WC(webCommandMetadata);
		this.D_PlaylistEdit(playlistEditEndpoint);
	}
	/** @private @arg {D_PlaylistEdit} x */
	D_PlaylistEdit(x) {
		const cf="D_PlaylistEdit";
		const {playlistId,params,actions,...y}=this.sd(cf,x); this.g(y);
		this.playlistId(playlistId);
		this.t(params,x => this.params(cf,"playlist_edit.params",x));
		this.z(actions,x => {
			// TODO: #12 Handle playlist actions
			// Just skip them for now
			switch(x.action) {
				case "ACTION_ADD_VIDEO":
				case "ACTION_REMOVE_VIDEO_BY_VIDEO_ID":
				case "ACTION_SET_PLAYLIST_VIDEO_ORDER": break;
				default: debugger; break;
			}
		});
	}
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {
		const cf="D_MenuServiceItem_Omit";
		const {text,serviceEndpoint,trackingParams,...y}=this.sd(cf,x);
		f.call(this,serviceEndpoint);
		return y;
	}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem";
		const {text,serviceEndpoint,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @protected @arg {E_Feedback} x */
	E_Feedback(x) {
		const cf="E_Feedback";
		const {clickTrackingParams,commandMetadata,feedbackEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/feedback") debugger;
		this.G_CommandMetadata(commandMetadata,true);
	}
	/** @private @arg {R_ToggleMenuServiceItem} x */
	R_ToggleMenuServiceItem(x) {this.H_("R_ToggleMenuServiceItem",x,this.D_ToggleMenuServiceItem);}
	/** @private @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {this.H_("R_MenuNavigationItem",x,this.D_MenuNavigationItem);}
	/** @private @arg {D_MenuNavigationItem} x */
	D_MenuNavigationItem(x) {
		const cf="D_MenuNavigationItem";
		const {trackingParams,text,icon,navigationEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.R_SimpleText(text);
		this.TA_OpenPopup(navigationEndpoint);
	}
	/** @private @template {string} T @arg {T_Icon<T>} x */
	T_Icon(x) {
		const cf="T_Icon";
		const {iconType,...y}=this.sd(cf,x); this.g(y);
		this.save_string("[IconType]",iconType);
	}
	/** @private @arg {G_CommandMetadata} x @arg {boolean} handled */
	G_CommandMetadata(x,handled=false) {
		if(handled===false) console.log("TODO",x,[new Error]);
		const cf="G_CommandMetadata";
		if("resolveUrlCommandMetadata" in x) {
			const {webCommandMetadata,resolveUrlCommandMetadata,...y}=this.sd(cf,x); this.g(y);
			debugger;
			// this.WebCommandMetadata(webCommandMetadata);
			this.t(resolveUrlCommandMetadata,this.MC_ResolveUrl);
			return;
		}
		this.GM_WC(this.w(x));
	}
	/** @private @arg {{accessibility?:D_Accessibility}} x */
	handle_accessibility(x) {
		this.save_keys("[default.Accessibility]",x);
		if(x.accessibility) this.D_Accessibility(x.accessibility);
	}
	/** @private @template T @template {string} VV @typedef {{[U in keyof T as `${string&U extends `${VV}${infer U1}${infer I1}`?`${Lowercase<U1>}${I1}`:never}`]:T[U]}} RemovePrefix */
	/** @private @template {D_Microformat} U @arg {U} x */
	unwrap_microformat(x) {
		/** @private @type {Partial<RemovePrefix<U,"url">>} */
		let uu={};
		uu; x;
		uu.applinksAndroid;
		let [v,o]=this.unwrap_prefix(x,"url");
		let [v1,o2]=this.unwrap_prefix(o,"ios");
		let [v2,o3]=this.unwrap_prefix(o2,"twitter");
		return {
			url: v,
			ios: v1,
			twitter: v2,
			o: o3,
		};
	}
	/** @private @template {{}} U @arg {U} x @template {string} VV @arg {VV} pf @returns {[RemovePrefix<U,VV>,Omit<U,`${VV}${string}`>]} */
	unwrap_prefix(x,pf) {
		/** @private @type {RemovePrefix<U,VV>} */
		let un_prefix=as({});
		/** @private @type {Omit<U,`${VV}${string}`>} */
		let other=as({});
		for(let cc of Object.entries(x)) {
			let c1=cc[0];
			if(this.str_starts_with(pf,c1)) {
				let u1x=split_string_once(c1,pf);
				if(u1x.length!==2) continue;
				/** @private @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @private @type {keyof RemovePrefix<U,VV>} */
				let u1=ac;
				un_prefix[u1]=cc[1];
				continue;
			}
			/** @private @type {any} */
			let ac=c1;
			/** @private @type {keyof Omit<U,`${VV}${string}`>} */
			let u1=ac;
			other[u1]=cc[1];
		}
		return [un_prefix,other];
	}
	/** @private @arg {E_Watch} x */
	E_Watch(x) {
		const cf="E_Watch";
		const {clickTrackingParams,commandMetadata,watchEndpoint,...y}=this.sd(cf,x); this.g(y);
		x: if(clickTrackingParams) {
			let x=clickTrackingParams;
			const root=cf;
			const path="tracking.trackingParams";
			let dx=decodeURIComponent(x);
			let res_e=this._decode_b64_url_proto_obj(dx);
			if(!res_e) break x;
			let param_map=this.make_param_map(res_e);
			this.parser.parse_endpoint_param(root,path,new Map(param_map));
		}
		this.t(commandMetadata,this.M_VE3832);
		this.DE_VE3832_Watch(watchEndpoint);
	}
	/** @private @arg {DE_VE3832_Watch} x */
	DE_VE3832_Watch(x) {
		const cf="DE_VE3832_Watch";
		const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig: a1,playerParams,watchEndpointMusicSupportedConfigs: a2,nofollow,playerExtraUrlParams,...y}=this.sd(cf,x); this.g(y);
		this.videoId(videoId);
		this.t(playlistId,this.playlistId);
		if(index!==void 0) this.primitive_of(index,"number");
		this.t(playlistSetVideoId,this.primitive_str);
		if(params!==void 0) this.params(cf,"watch.params",params);
		if(startTimeSeconds!==void 0) this.primitive_of(startTimeSeconds,"number");
		if(continuePlayback!==void 0&&!continuePlayback) debugger;
		this.t(loggingContext,this.R_VssLoggingContext);
		this.t(watchEndpointSupportedOnesieConfig,this.R_Html5PlaybackOnesieConfig);
		this.t(a1,this.R_PrefetchHintConfig);
		this.t(playerParams,a => this.playerParams(cf,"watch.player_params",a));
		this.t(a2,this.R_WatchEndpointMusicConfig);
		if(nofollow!==void 0) this.primitive_of(nofollow,"boolean");
		this.t(playerExtraUrlParams,([a,...b]) => this.expect_eq(a.key,"inline")&&this.expect_eq(b.length,0));
	}
	/** @private @arg {M_VE3832} x */
	M_VE3832(x) {this.H_("M_VE3832",x,this.GM_VE3832_Watch_WC);}
	/** @private @arg {GM_VE3832_Watch_WC} x */
	GM_VE3832_Watch_WC(x) {
		const cf="GM_VE3832_Watch_WC";
		const {rootVe,url,webPageType,...y}=this.sd(cf,x); this.g(y);
		if(rootVe!==3832) debugger;
		if(!this.str_starts_with("/watch",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
	}
	/** @private @arg {R_Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H_("R_Html5PlaybackOnesieConfig",x,this.R_CommonConfig);}
	/** @private @arg {R_CommonConfig} x */
	R_CommonConfig(x) {this.H_("R_CommonConfig",x,this.D_CommonConfig);}
	/** @private @arg {D_CommonConfig} x */
	D_CommonConfig(x) {const cf="D_CommonConfig"; this.H_(cf,x,x => this.parser.parse_url(cf,x));}
	/** @private @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("R_VssLoggingContext",x,this.D_VssLoggingContext);}
	/** @private */
	_decoder=new TextDecoder();
	/** @private @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext";
		const {serializedContextData,...y}=this.sd(cf,x); this.g(y);
		{
			let x=decodeURIComponent(serializedContextData);
			let b_res=this._decode_b64_url_proto_obj(x);
			if(!b_res) return;
			if(b_res.length!==1) debugger;
			let [r]=b_res;
			if(r[0]==="child"&&r[1]===3) {
				let playlist_id=this._decoder.decode(r[2]);
				if(this.str_starts_with("RD",playlist_id)) {
					this.playlistId(as(playlist_id));
				} else {
					console.log("D_VssLoggingContext.serializedContextData.fieldId",r[1]);
					let playlist_id=this._decoder.decode(r[2]);
					console.log("serializedContextData.decode",playlist_id);
					debugger;
				}
			} else {
				console.log(r);
			}
		}
	}
	/** @private @arg {NonNullable<IR_TextRun['navigationEndpoint']>} x */
	handle_text_endpoint(x) {
		if("browseEndpoint" in x) return this.E_Browse(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		debugger;
	}
	/** @arg {(x:NonNullable<IR_TextRun['navigationEndpoint']>)=>void} f_run */
	/** @private @arg {R_TextRuns} x */
	R_TextRuns(x) {
		const cf="R_TextRuns";
		const {runs,accessibility,...y}=this.sd(cf,x); this.g(y);
		this.z(runs,x => this.IR_TextRun(x,this.handle_text_endpoint));
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {IR_TextRun} x @arg {(x:NonNullable<IR_TextRun['navigationEndpoint']>)=>void} f_run */
	IR_TextRun(x,f_run) {
		const cf="R_TextRun";
		const {text,navigationEndpoint,loggingDirectives,bold,...y}=this.sd(cf,x); this.g(y);
		this.t(navigationEndpoint,f_run);
		this.primitive_str(text);
	}
	/** @private @arg {G_Text} x */
	G_Text(x) {
		const cf="G_Text"; this.k(cf,x);
		if("simpleText" in x) return this.R_SimpleText(x);
		if("runs" in x) return this.R_TextRuns(x);
		debugger;
	}
	/** @private @arg {TR_ItemSection_2<any,any>} x @returns {x is TR_ItemSection_3<any,any,any>} */
	is_ItemSectionRendererTemplate(x) {
		return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);
	}
	/** @private @arg {TR_ItemSection_3<{},"comment-item-section","comments-section">} x */
	TR_ItemSection_3_CommentItemSection(x) {this.H_("TR_ItemSection_3_CommentItemSection",x,this.TD_ItemSection_3_CommentItemSection);}
	/** @private @arg {TD_ItemSection_3<{},"comment-item-section","comments-section">} x */
	TD_ItemSection_3_CommentItemSection(x) {
		const cf="TD_ItemSection_3_CommentItemSection"; this.k(cf,x);
		const {sectionIdentifier,targetId,trackingParams,contents: a,...y}=this.sd(cf,x); this.g(y);
		if(x.sectionIdentifier!=="comment-item-section") debugger;
		if(x.targetId!=="comments-section") debugger;
		this.z(a,x => {
			x;
			debugger;
		});
	}
	/** @private @arg {T_Results<D_WatchResult_ResultsItem>} x */
	D_WatchResults(x) {const cf="D_WatchResults",{results: a,...y}=this.sd(cf,x); this.g(y); return a;}
	/** @private @arg {D_WatchResult_ResultsItem} x @returns {G_WatchResult_ContentsItem[]} */
	D_WatchResult_ResultsItem(x) {
		const cf="D_WatchResult_ResultsItem";
		let {trackingParams,contents: a,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		return a;
	}
	/** @private @arg {E_Url} x */
	E_Url(x) {
		const cf="E_Url";
		const {clickTrackingParams,commandMetadata,urlEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_VE83769(commandMetadata);
		this.DE_Url(urlEndpoint);
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}:${string}`} */
	str_is_uri(x) {
		return x.includes(":");
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {
		return x.includes("?");
	}
	/** @private @arg {Extract<DE_Url['url'],`${string}www.youtube.com${string}`>} uv */
	handle_yt_url(uv) {
		let [p1,s1]=split_string_once(uv,"//"); if(p1!=="https:") debugger;
		let [h,sp]=split_string_once(s1,"/");
		if(h!=="www.youtube.com") debugger;
		if(this.str_is_search(sp)) {
			let [pp,qp]=split_string_once(sp,"?");
			switch(pp) {
				case "redirect": {
					console.log("[E_Url.TargetUrl.search_params]",qp);
					return;
				}
				default: debugger; break;
			}
			debugger;
		}
		debugger;
	}
	/** @private @arg {Extract<DE_Url['url']|GU_VE83769_UrlType,`${string}//studio.youtube.com${string}`>} b */
	handle_yt_studio_url(b) {
		if(!this.str_is_uri(b)) {debugger; return;}
		let x=split_string(split_string_once(b,"//")[1],"/");
		if(x[0]!=="studio.youtube.com") {debugger; return;}
		if(x.length===1) return;
		switch(x[1]) {
			default: debugger; break;
			case "": return;
			case "channel": {
				let v=x[2];
				if(!this.str_starts_with("UC",v)) {debugger; return;}
				let v1=x[3];
				switch(v1) {
					default: debugger; break;
					case "videos": if(x.length!==4) debugger; break;
				}
			} break;
		}
	}
	/** @private @arg {Extract<DE_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>} x */
	handle_yt_kids_url(x) {
		if(x==="https://www.youtubekids.com?source=youtube_web") return;
		if(x==="https://www.youtubekids.com/?source=youtube_web") return;
		debugger;
	}
	/** @private @arg {DE_Url['url']|`https://studio.youtube.com/channel/UC${string}`} x */
	GM_E_Url_TargetUrlType(x) {
		const rp="https://www.youtube.com/redirect?";
		if(this.str_starts_with(rp,x)) return this.handle_yt_url(x);
		let sp=this.parse_with_url_parse(x);
		this.GM_VE83769_UrlType(sp.href);
	}
	/** @private @arg {DE_Url} x */
	DE_Url(x) {
		const cf="DE_Url";
		if("nofollow" in x) {
			const {url,target,nofollow,...y}=this.sd(cf,x); this.g(y);
			this.GM_E_Url_TargetUrlType(url);
			if(target!=="TARGET_NEW_WINDOW") debugger;
			if(nofollow!==true) debugger;
			return;
		}
		const {url,target,...y}=this.sd(cf,x); this.g(y);
		this.GM_E_Url_TargetUrlType(url);
		if(target!=="TARGET_NEW_WINDOW") debugger;
	}
	/** @private @arg {M_VE83769} x */
	M_VE83769(x) {this.H_("M_VE83769",x,this.GM_VE83769_WC);}
	/** @private @arg {GM_VE83769_WC} x */
	GM_VE83769_WC(x) {
		const cf="GM_VE83769_WC";
		const {url,webPageType,rootVe,...y}=this.sd(cf,x); this.g(y);
		this.GM_VE83769_UrlType(url);
		if(webPageType!=="WEB_PAGE_TYPE_UNKNOWN") debugger;
		if(rootVe!==83769) debugger;
	}
	/** @private @arg {Extract<GU_VE83769_UrlType,`${string}://music.youtube.com${string}`>} x */
	handle_yt_music_url(x) {
		switch(x) {
			case "https://music.youtube.com/": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GU_VE83769_UrlType} x */
	GM_VE83769_UrlType(x) {
		let up=this.parse_with_url_parse(x);
		switch(up.host) {
			case "music.youtube.com": return this.handle_yt_music_url(up.href);
			case "studio.youtube.com": return this.handle_yt_studio_url(up.href);
			case "www.youtubekids.com": return this.handle_yt_kids_url(up.href);
			case "tv.youtube.com": return;
			default: debugger; break;
		}
		const sh="https://studio.youtube.com",mh="https://music.youtube.com";
		const yk="https://www.youtubekids.com/?source=youtube_web";
		if(this.str_starts_with(sh,x)) return;
		if(this.str_starts_with(mh,x)) return;
		if(this.str_starts_with(yk,x)) return;
		if(this.str_starts_with("https://tv.youtube.com",x)) return;
		switch(x) {
			default: x===""; debugger; break;
			case "/upload": break;
		}
	}
	/** @private @arg {D_PlayerOverlayAutoplay} x */
	D_PlayerOverlayAutoplay(x) {
		const cf="D_PlayerOverlayAutoplay";
		let {background,videoTitle,byline,pauseText,countDownSecs,cancelButton,nextButton,closeButton,preferImmediateRedirect,webShowBigThumbnailEndscreen,webShowNewAutonavCountdown,countDownSecsForFullscreen,...y}=this.Omit_Compact_Video(cf,x); this.g(y);
		this.G_Text(videoTitle);
		this.R_TextRuns(byline);
		this.G_Text(pauseText);
		this.D_Thumbnail(background);
		if(countDownSecs!==8) debugger;
		this.R_Button(cancelButton);
		this.R_Button(nextButton);
		this.R_Button(closeButton);
		if(preferImmediateRedirect) debugger;
		if(webShowBigThumbnailEndscreen) debugger;
		if(!webShowNewAutonavCountdown) debugger;
		if(countDownSecsForFullscreen!==3) debugger;
	}
	/** @private @arg {Omit_Menu_Radio_CF} cf @template {R_Omit_Compact_Player} T @arg {T} x */
	Omit_Compact_Player(cf,x) {
		const {title,trackingParams,...y}=this.sd(cf,x);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {Omit_Menu_Radio_CF} cf @template {R_Omit_Compact_Video} T @arg {T} x */
	Omit_Compact_Video(cf,x) {
		let u=this.Omit_Compact_Player(cf,x);
		let {videoId,shortViewCountText,publishedTimeText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.videoId(videoId);
		this.G_Text(publishedTimeText);
		this.G_Text(shortViewCountText);
		return y;
	}
	/** @private @arg {D_CompactVideo} x */
	D_CompactVideo(x) {
		const cf="D_CompactVideo";
		let {richThumbnail,accessibility,channelThumbnail,badges,ownerBadges,publishedTimeText,lengthText,viewCountText,shortViewCountText,...y}=this.D_ThumbnailOverlay_Omit(cf,x); this.g(y);
		this.richThumbnail_Video(richThumbnail);
		this.D_Accessibility(accessibility);
		console.log("chan.thumb",channelThumbnail);
		this.tz(badges,this.RMD_Badge);
		this.tz(ownerBadges,this.RMD_Badge);
		this.G_Text(publishedTimeText);
	}
	/** @private @arg {RMD_Badge} x */
	RMD_Badge(x) {this.H_("RMD_Badge",x,this.DMD_Badge);}
	/** @private @arg {DMD_Badge} x */
	DMD_Badge(x) {
		const cf="DMD_Badge";
		this.save_enum("BADGE_STYLE_TYPE",x.style);
		switch(x.style) {
			default: x===0; debugger; break;
			case "BADGE_STYLE_TYPE_YPC": {
				const {style: {},trackingParams,label,...y}=this.sd(cf,x); this.g(y);
				this.trackingParams(cf,trackingParams);
				if(label!=="Fundraiser") debugger;
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED_ARTIST": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.sd(cf,x); this.g(y);
				if(icon.iconType!=="OFFICIAL_ARTIST_BADGE") debugger;
				this.T_Icon(icon);
				if(tooltip!=="Official Artist Channel") debugger;
				this.primitive_str(tooltip);
				this.trackingParams(cf,trackingParams);
				if(accessibilityData.label!=="Official Artist Channel") debugger;
				this.D_Label(accessibilityData);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.sd(cf,x); this.g(y);
				if(icon.iconType!=="CHECK_CIRCLE_THICK") debugger;
				this.T_Icon(icon);
				if(tooltip!=="Verified") debugger;
				this.primitive_str(tooltip);
				this.trackingParams(cf,trackingParams);
				this.D_Label(accessibilityData);
			} break;
			case "BADGE_STYLE_TYPE_LIVE_NOW": {
				const {icon,style: {},trackingParams,label,...y}=this.sd(cf,x); this.g(y);
				if(icon.iconType!=="LIVE") debugger;
				this.T_Icon(icon);
				this.trackingParams(cf,trackingParams);
				switch(label) {
					default: debugger; break;
					case "LIVE": break;
					case "PREMIERE": break;
				}
			} break;
			case "BADGE_STYLE_TYPE_COLLECTION": {
				const {style: {},trackingParams,label,...y}=this.sd(cf,x); this.g(y);
				this.trackingParams(cf,trackingParams);
				this.primitive_str(label);
			} break;
		}
	}
	/** @private @arg {R_AdSlot} x */
	R_AdSlot(x) {this.H_("R_AdSlot",x,this.D_AdSlot);}
	/** @private @arg {D_AdSlot} x */
	D_AdSlot(x) {
		const cf="D_AdSlot";
		const {adSlotMetadata,fulfillmentContent,enablePacfLoggingWeb,...y}=this.sd(cf,x); this.g(y);
		this.DM_AdSlot(adSlotMetadata);
		this.R_FulfillmentLayout(fulfillmentContent);
		this.primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {R_FulfillmentLayout} x */
	R_FulfillmentLayout(x) {this.H_("R_FulfillmentLayout",x,this.R_InFeedAdLayout);}
	/** @private @arg {R_InFeedAdLayout} x */
	R_InFeedAdLayout(x) {this.H_("R_InFeedAdLayout",x,this.D_InFeedAdLayout);}
	/** @private @arg {D_InFeedAdLayout} x */
	D_InFeedAdLayout(x) {
		const cf="D_InFeedAdLayout";
		const {adLayoutMetadata: a,renderingContent: b,...y}=this.sd(cf,x); this.g(y);
		this.M_AdLayout(a);
		if("displayAdRenderer" in b) {
			this.R_DisplayAd(b);
		} else {
			debugger;
		}
	}
	/** @private @arg {R_DisplayAd} x */
	R_DisplayAd(x) {this.H_("R_DisplayAd",x,this.D_DisplayAd);}
	/** @private @arg {D_DisplayAd} x */
	D_DisplayAd(x) {
		const cf="D_DisplayAd";
		const {layout,...y}=this.sd(cf,x);
		let k=this.get_keys_of(y)[0];
		console.log("[D_DisplayAd.next_key] [%s]",k);
	}
	/** @private @arg {M_AdLayout} x */
	M_AdLayout(x) {
		const cf="M_AdLayout";
		const {layoutId,layoutType,adLayoutLoggingData,...y}=this.sd(cf,x); this.g(y);
		this.save_enum("LAYOUT_TYPE",layoutType);
		switch(layoutType) {
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES": break; case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": break;
			default: break;
		}
		let ba_id=base64_dec.decodeByteArray(layoutId);
		this.t(ba_id,([x]) => this.save_number("[AdLayout.layoutId.bytes[0]]",x));
		if(adLayoutLoggingData) {
			this.D_AdLayoutLogging(adLayoutLoggingData);
		}
	}
	/** @private @arg {DM_AdSlot} x */
	DM_AdSlot(x) {
		const cf="DM_AdSlot";
		const {slotId,slotPhysicalPosition,slotType,...y}=this.sd(cf,x);
		this.primitive_str(slotId);
		let do_=false;
		if(do_) {
			let sid=split_string(slotId,":");
			let n=(BigInt(sid[0]));
			n/=1000n;
			this.save_number("[AdSlot.slotId[0]]",Number(n));
			this.save_number("[AdSlot.slotId[1..]]",sid.slice(1).map(e => Number.parseInt(e,10)));
		}
		switch(slotPhysicalPosition) {
			case 0:
			case 1: break;
			default: debugger; break;
		}
		switch(slotType) {
			case "SLOT_TYPE_IN_FEED":
			case "SLOT_TYPE_PAGE_TOP": break;
			default: debugger; break;
		}
		if("adSlotLoggingData" in y) {
			const {adSlotLoggingData,...y1}=y; this.g(y1);
			return this.D_SerializedSlotAdServingDataEntry(adSlotLoggingData);
		}
		this.g(y);
	}
	/** @private @arg {D_SerializedSlotAdServingDataEntry} x */
	D_SerializedSlotAdServingDataEntry(x) {
		const cf="D_SerializedSlotAdServingDataEntry";
		const {serializedSlotAdServingDataEntry: a,...y}=this.sd(cf,x); this.g(y);
		this.params(cf,"slot_ad_serving_data_entry",a);
	}
	/** @private @arg {[R_ContinuationItem[],"comment-item-section","comments-section"]} x */
	TR_ItemSection_3_R_1(x) {
		const [a,...b]=x;
		let gen_section_id=this.join_string(b,"-");
		if(gen_section_id!=="comment-item-section-comments-section") debugger;
		this.z(a,this.TR_ItemSection_3_I_1);
	}
	/** @private @arg {Extract<G_WatchResult_ContentsItem,TR_ItemSection_3<any,any,any>>['itemSectionRenderer']['contents'][number]} x */
	TR_ItemSection_3_I_1(x) {
		const cf="TR_ItemSection_3_I_1";
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {Extract<G_WatchResult_ContentsItem,TR_ItemSection_3<any,any,any>>} x */
	G_WatchResultItem_ItemSection_3(x) {
		const cf="G_WatchResultItem_ItemSection"; this.k(cf,x);
		this.k(`${cf}.section`,x.itemSectionRenderer);
		if(x.itemSectionRenderer.sectionIdentifier!=="comment-item-section") debugger;
		this.TR_ItemSection_3(x,this.TR_ItemSection_3_R_1);
	}
	/** @private @arg {Extract<G_WatchResult_ContentsItem,{itemSectionRenderer:any}>} x */
	G_WatchResultItem_ItemSectionGroup(x) {
		if(this.is_ItemSectionRendererTemplate(x)) return this.G_WatchResultItem_ItemSection_3(x);
		if(x.itemSectionRenderer.sectionIdentifier!=="comments-entry-point") debugger;
		this.TR_ItemSection_2(x,this.R_CommentItemSection_EntryPoint);
	}
	/** @private @arg {G_WatchResult_ContentsItem} x */
	G_WatchResult_ContentsItem(x) {
		if("itemSectionRenderer" in x) return this.G_WatchResultItem_ItemSectionGroup(x);
		if("merchandiseShelfRenderer" in x) return this.R_MerchandiseShelf(x);
		if("videoPrimaryInfoRenderer" in x) return this.R_VideoPrimaryInfo(x);
		if("videoSecondaryInfoRenderer" in x) return this.R_VideoSecondaryInfo(x);
		debugger;
	}
	/** @private @arg {Extract<G_SecondaryContentsItem,{itemSectionRenderer:any}>} x */
	RG_Watch_ItemSection(x) {
		this.TR_ItemSection_3(x,a => {
			let [u,...v]=a;
			if(this.join_string(v,"-")==="sid-wn-chips-watch-next-feed") return this.z(u,a => {
				let cf=this.get_name_from_keys(a);
				if(!cf) {debugger; return;}
				this.HD_(`D_${cf}`,a);
				console.log("[found item_section_watch_data]",cf);
				debugger;
			});
			debugger;
			return null;
		});
	}
	/** @private @arg {G_SecondaryContentsItem} x */
	G_SecondaryContentsItem(x) {
		if("itemSectionRenderer" in x) return this.RG_Watch_ItemSection(x);
		let k=this.get_keys_of(x);
		switch(k[0]) {
			case "relatedChipCloudRenderer": break;
			default: debugger; break;
		}
	}
	/** @private @arg {G_Watch_SecondaryResults_Contents} x */
	G_Watch_SecondaryResults_Contents(x) {
		const cf="G_Watch_SecondaryResults_Contents";
		const {contents,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,this.G_SecondaryContentsItem);
	}
	/** @private @arg {G_Watch_SecondaryResults} x */
	G_Watch_SecondaryResults(x) {
		if("contents" in x) return this.G_Watch_SecondaryResults_Contents(x);
		if("results" in x) return this.G_Watch_SecondaryResults_Results(x);
		debugger;
	}
	/** @private @arg {D_TwoColumnWatchNextResults} x */
	D_TwoColumnWatchNextResults(x) {
		const cf="D_TwoColumnWatchNextResults";
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=this.sd(cf,x); this.g(y);
		let u=this.D_WatchResults(results);
		let u1=this.D_WatchResult_ResultsItem(u);
		this.z(u1,this.G_WatchResult_ContentsItem);
		this.T_SecondaryResults(secondaryResults,this.G_Watch_SecondaryResults);
		this.t(playlist,a => this.T_Playlist(a,this.D_PlaylistContent));
		this.t(autoplay,a => this.T_Autoplay(a,this.D_AutoplayContent));
		this.t(conversationBar,this.R_LiveChat);
	}
	/** @private @arg {RSG_GetUnseenCount} x */
	RSG_GetUnseenCount(x) {
		const cf="RSG_GetUnseenCount";
		const {responseContext: {},actions,unseenCount,...y}=this.sd(cf,x); this.g(y);
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.AU_NotificationsUnseenCount(x);
			debugger;
		}));
		if(unseenCount!==void 0) this.primitive_of(unseenCount,"number");
	}
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {
		const cf="UA_NotificationsUnseenCount";
		const {clickTrackingParams,updateNotificationsUnseenCountAction,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.U_NotificationsUnseenCount(updateNotificationsUnseenCountAction);
	}
	/** @private @arg {U_NotificationsUnseenCount} x */
	U_NotificationsUnseenCount(x) {
		const cf="U_NotificationsUnseenCount";
		const {handlerData,unseenCount,timeoutMs,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(handlerData);
		this.primitive_of(unseenCount,"number");
		this.primitive_of(timeoutMs,"number");
	}
	/** @private @arg {REG_DatasyncIds} x */
	REG_DatasyncIds(x) {
		const cf="REG_DatasyncIds";
		const {responseContext: {},datasyncIds,...y}=this.sd(cf,x); this.g(y);
		this.z(datasyncIds,this.primitive_str);
	}
	/** @private @arg {REG_AccountSwitcher} x */
	REG_AccountSwitcher(x) {
		const cf="REG_AccountSwitcher";
		const {responseContext: {},selectText,actions,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(selectText);
		this.z(actions,a => {
			if("getMP_MenuAction" in a) {
				return this.A_MP_GetMenu(a);
			}
			debugger;
		});
	}
	/** @private @arg {A_MP_GetMenu} x */
	A_MP_GetMenu(x) {this.H_("A_MP_GetMenu",x,this.D_MP_GetMenu);}
	/** @private @arg {RS_AccountsList} x */
	RS_AccountsList(x) {
		const cf="RS_AccountsList";
		const {responseContext: {},selectText,actions,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(selectText);
		this.z(actions,this.A_UpdateChannelSwitcherPage);
	}
	/** @private @arg {RSW_ReelItem} x */
	RSW_ReelItem(x) {
		const cf="RSW_ReelItem";
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=this.sd(cf,x); this.g(y);
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.t(replacementEndpoint,this.E_ReelWatch);
		this.t(sequenceContinuation,this.primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @private @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {this.H_("R_ReelPlayerOverlay",x,this.D_ReelPlayerOverlay);}
	/** @private @arg {R_ReelPlayerHeader} x */
	R_ReelPlayerHeader(x) {this.H_("R_ReelPlayerHeader",x,this.D_ReelPlayerHeader);}
	/** @private @arg {R_PivotButton} x */
	R_PivotButton(x) {this.H_("R_PivotButton",x,this.D_PivotButton);}
	/** @private @arg {D_ReelPlayerOverlay} x */
	D_ReelPlayerOverlay(x) {
		const cf="D_ReelPlayerOverlay";
		const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,trackingParams,shareButton,pivotButton,...y}=this.sd(cf,x); this.g(y);
		this.R_LikeButton(likeButton);
		this.R_ReelPlayerHeader(reelPlayerHeaderSupportedRenderers);
		this.R_Menu(menu);
		this.R_Button(nextItemButton);
		this.R_Button(prevItemButton);
		this.R_SubscribeButton(subscribeButtonRenderer);
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.R_Button(viewCommentsButton);
		this.trackingParams(cf,trackingParams);
		this.R_Button(shareButton);
		this.R_PivotButton(pivotButton);
	}
	/** @private @arg {R_EngagementPanelSectionList} x */
	R_EngagementPanelSectionList(x) {this.H_("R_EngagementPanelSectionList",x,this.D_EngagementPanelSectionList);}
	/** @protected @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
	T_ShortsSurfaceIdentifier(x) {
		const cf="T_ShortsSurfaceIdentifier";
		const {surface,tag,...y}=this.sd(cf,x); this.g(y);
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		switch(tag) {
			case "engagement-panel-structured-description": break;
			case "shorts-comments-panel": break;
			default: debugger; break;
		}
		return tag;
	}
	/** @private @arg {string} cf @arg {Record<"identifier",unknown>} x */
	force_parse_identifier(cf,x) {
		const {identifier,...a}=this.sd(`${cf}.identifier`,x); this.g(a);
		x: if(identifier&&typeof identifier==="object"&&"tag" in identifier&&"surface" in identifier) {
			if(identifier.surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") break x;
			let yk=this.get_keys_of(identifier);
			if(!this.eq_keys(yk,["surface","tag"])) debugger;
			switch(identifier.tag) {
				case "engagement-panel-structured-description": break;
				default: debugger; return;
			}
			let a1=this.T_ShortsSurfaceIdentifier({tag: identifier.tag,surface: identifier.surface});
			if(a1!=="engagement-panel-structured-description") debugger;
			return;
		}
		debugger;
	}
	/** @private @arg {D_EngagementPanelSectionList} x */
	D_EngagementPanelSectionList(x) {
		const cf="D_EngagementPanelSectionList"; this.k(cf,x);
		if("veType" in x) {
			switch(x.veType) {
				default: debugger; break;
				case 76278: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.sd(cf,x);
					if(panelIdentifier!=="comment-item-section") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_SectionList(content);
					if(targetId!=="engagement-panel-comments-section") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if("identifier" in y) {
						this.force_parse_identifier(cf,y);
						return;
					}
					this.g(y);
				} break;
				case 99999: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
					if(panelIdentifier!=="shopping_panel_for_entry_point_5") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_ProductList(content);
					if(targetId!=="shopping_panel_for_entry_point_5") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
				} break;
				case 126250: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,onShowCommands,loggingDirectives,...y}=this.sd(cf,x);
					if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_ContinuationItem(content);
					if(targetId!=="engagement-panel-searchable-transcript") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if("identifier" in y) {
						this.force_parse_identifier(cf,y);
						return;
					}
					this.g(y);
				} break;
				case 124975: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,identifier,...y}=this.sd(cf,x); this.g(y);
					if(panelIdentifier&&panelIdentifier!=="engagement-panel-structured-description") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_StructuredDescriptionContent(content);
					if(targetId!=="engagement-panel-structured-description") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(identifier) {
						let a1=this.T_ShortsSurfaceIdentifier(identifier);
						if(a1!=="engagement-panel-structured-description") debugger;
					}
				} break;
				case 139722: {
					const {content,header,veType: {},targetId,visibility,loggingDirectives,continuationService,identifier,...y}=this.sd(cf,x); this.g(y);
					this.R_SectionList(content);
					this.t(header,this.R_EngagementPanelTitleHeader);
					this.targetId(cf,targetId);
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(continuationService!=="ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE") debugger;
					if(!identifier) debugger;
					let a1=this.T_ShortsSurfaceIdentifier(identifier);
					if(a1!=="shorts-comments-panel") debugger;
				} break;
			}
			return;
		}
		this.DB_SI_EngagementPanel(x);
	}
	/** @private @arg {G_EngagementPanelSectionShowCommands} x */
	G_EngagementPanelSectionShowCommands(x) {
		const cf="G_EngagementPanelSectionShowCommands"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.EA_ChangeEngagementPanelVisibility(x);
		if("showEngagementPanelScrimAction" in x) return this.A_ShowEngagementPanelScrim(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		debugger;
	}
	/** @private @arg {DB_SI_EngagementPanel} x */
	DB_SI_EngagementPanel(x) {
		const cf="DB_SI_EngagementPanel";
		switch(x.targetId) {
			default: x===""; debugger; break;
			case "engagement-panel-ads": {
				const {content,targetId,visibility,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
				this.R_AdsEngagementPanelContent(content);
				if(targetId!=="engagement-panel-ads") debugger;
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-clip-create": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,onShowCommands,...y}=this.sd(cf,x); this.g(y);
				if(panelIdentifier!=="engagement-panel-clip-create") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_ClipSection(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
				this.z(onShowCommands,this.G_EngagementPanelSectionShowCommands);
			} break;
			case "engagement-panel-macro-markers-description-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
				if(panelIdentifier!=="engagement-panel-macro-markers-description-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-macro-markers-auto-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
				if(panelIdentifier!=="engagement-panel-macro-markers-auto-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
		}
	}
	/** @private @arg {R_AdsEngagementPanelContent} x */
	R_AdsEngagementPanelContent(x) {this.H_("R_AdsEngagementPanelContent",x,this.B_Hack);}
	/** @private @arg {RS_SetSetting} x */
	RS_SetSetting(x) {
		const cf="RS_SetSetting";
		const {responseContext: {},settingItemId,...y}=this.sd(cf,x); this.g(y);
		if(settingItemId!=="407") debugger;
	}
	/** @private @arg {RS_Feedback} x */
	RS_Feedback(x) {
		const cf="RS_Feedback";
		const {responseContext: {},feedbackResponses,...y}=this.sd(cf,x); this.g(y);
		this.z(feedbackResponses,this.D_FeedbackResponseProcessedStatus);
	}
	/** @private @arg {C_ShowReloadUi} x */
	C_ShowReloadUi(x) {
		const cf="C_ShowReloadUi"; this.k(cf,x);
		const {clickTrackingParams,showReloadUiCommand: {targetId,...y1},...y2}=this.sd(cf,x);
		this.z([y1,y2],this.g);
		this.clickTrackingParams(cf,clickTrackingParams);
		switch(targetId) {
			default: debugger; break;
			case "browse-feedFEwhat_to_watch": case "watch-next-feed":
		}
	}
	/** @private @template {DC_Continuation} T @arg {string} cf @arg {T} x */
	DC_Continuation_Omit(cf,x) {
		const {token,request,...y}=this.sd(cf,x);
		this.primitive_str(token);
		this.save_enum("CONTINUATION_REQUEST_TYPE",request);
		switch(request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE":
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE":
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT":
		};
		return y;
	}
	/** @private @arg {GM_Browse} x */
	GM_browse(x) {
		const cf="GM_browse";
		const {apiUrl,sendPost,...b}=this.sd(cf,x); this.g(b);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("R_Notification",x,this.D_Notification);}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification";
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.z([thumbnail,videoThumbnail],this.D_Thumbnail);
		this.z([shortMessage,sentTimeText],this.R_SimpleText);
		if(navigationEndpoint.watchEndpoint) {
			this.E_Watch(navigationEndpoint);
		} else {
			debugger;
		}
		this.primitive_of(read,"boolean");
		if(recordClickEndpoint.recordNotificationInteractionsEndpoint) {
			this.E_RecordNotificationInteractions(recordClickEndpoint);
		}
	}
	/** @private @arg {E_RecordNotificationInteractions} x */
	E_RecordNotificationInteractions(x) {
		const cf="E_RecordNotificationInteractions";
		this.T_Endpoint(cf,x,a => {
			if(!a.recordNotificationInteractionsEndpoint) debugger;
			this.DE_RecordNotificationInteractions(this.w(a));
		},x => {
			let y=this.w(x),cf="GE_notification_record_interactions";
			const {apiUrl,sendPost,...u}=this.sd(cf,y); this.g(u);
			if(apiUrl!=="/youtubei/v1/notification/record_interactions") debugger;
			if(sendPost!==true) debugger;
		});
	}
	/** @private @arg {DE_RecordNotificationInteractions} x */
	DE_RecordNotificationInteractions(x) {
		const cf="DE_RecordNotificationInteractions";
		const {serializedInteractionsRequest,...y}=this.sd(cf,x);
		this.primitive_str(x.serializedInteractionsRequest);
		if("actions" in y) {
			const {actions,...u}=this.sd(cf,y); this.g(u);
			this.z(actions,a => {
				this.A_HideEnclosing(a);
			});
			return;
		}
		this.g(y);
	}
	/** @private @arg {A_HideEnclosing} x */
	A_HideEnclosing(x) {
		const cf="A_HideEnclosing";
		const {clickTrackingParams,hideEnclosingAction: a,...y}=this.sd(cf,x); this.g(y);
		this.AD_HideEnclosing(a);
	}
	/** @private @arg {E_GetNotificationMenu} x */
	E_GetNotificationMenu(x) {
		const cf="E_GetNotificationMenu";
		this.T_Endpoint(cf,x,x => {
			const u=this.w(x),cf="DE_GetNotificationMenu";
			const {ctoken,...y}=this.sd(cf,u); this.g(y);
			this.params(cf,"GetNotificationMenu.ctoken",ctoken);
			debugger;
		},a => {
			a;
			debugger;
		});
	}
	/** @private @arg {G_SectionList} x */
	G_SectionList(x) {
		const cf="G_SectionList";
		if("targetId" in x) {
			if(this.str_starts_with(x.targetId,"browse-feed")) {
				let ss=split_string(x.targetId,"browse-feed");
				if(ss.length!==2) {debugger; return;}
				let sa=ss[1];
				if(sa==="FEsubscriptions") return;
				let ll=sa.slice(24);
				if(this.str_starts_with(sa,"UC")&&ll==="featured") {
					/** @returns {`UC${string}`} */
					function wx() {return "UCx";}
					let [cid,fe]=split_string_once_last(sa,"featured",wx());
					if(fe!=="") debugger;
					this.channelId(cid);
					return;
				}
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
				case "browse-feedFEsubscriptions": return this.browse_feed_subscriptions(x);
				case "search-feed": return this.D_SearchFeedSectionList(x);
			}
		}
		const {contents,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,this.SectionListItem);
		// this.tz(continuations,this.RD_NextContinuation);
		this.trackingParams(cf,trackingParams);
		// this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		// if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
	}
	/** @private @arg {Extract<G_SectionList,{targetId:"browse-feedFEsubscriptions"}>} x */
	browse_feed_subscriptions(x) {
		const cf="browse_feed_subscriptions";
		const {contents,trackingParams,targetId,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,x => {
			if("itemSectionRenderer" in x) {
				return;
			}
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
	}
	/** @private @arg {D_SearchFeedSectionList} x */
	D_SearchFeedSectionList(x) {
		const cf="D_SearchFeedSectionList";
		const {contents,continuations,trackingParams,subMenu,hideBottomSeparator,targetId,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,this.SectionListItem);
		this.tz(continuations,this.RD_NextContinuation);
		this.trackingParams(cf,trackingParams);
		this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
		this.t(targetId,a => this.targetId(cf,a));
	}
	/** @private @arg {RD_NextContinuation} x */
	RD_NextContinuation(x) {this.H_("RD_NextContinuation",x,this.D_NextContinuation);}
	/** @private @arg {TR_SectionListItem_3<{},{},{}>} x */
	SectionListItem(x) {
		const cf="SectionListItem"; this.k(cf,x); this.k(cf,x);
		if("itemSectionRenderer" in x) {
			// return this.ItemSectionRenderer(x);
			debugger;
			return;
		} else if("continuationItemRenderer" in x) {
			this.R_ContinuationItem(x);
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
	R_ContinuationItem(x) {this.H_("R_ContinuationItem",x,this.D_ContinuationItem);}
	/** @private @arg {D_ContinuationItem} x */
	D_ContinuationItem(x) {
		const cf="D_ContinuationItem"; this.k(cf,x);
		const {trigger,continuationEndpoint,...y}=this.sd(cf,x);
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.GE_Continuation(continuationEndpoint);
		if("button" in y) {
			const {button,...a}=y; this.g(a);
			this.R_Button(button);
			return;
		}
		if("ghostCards" in y) {
			const {ghostCards,...a}=y; this.g(a);
			this.R_GhostGrid(ghostCards);
			return;
		}
		this.g(y);
	}
	/** @private @arg {R_GhostGrid} x */
	R_GhostGrid(x) {
		const cf="R_GhostGrid"; this.k(cf,x);
		if(!x.ghostGridRenderer) debugger;
		let y=this.w(x);
		this.D_GhostGrid(y);
	}
	/** @private @arg {D_GhostGrid} x */
	D_GhostGrid(x) {
		const cf="D_GhostGrid";
		const {rows,...y}=this.sd(cf,x); this.g(y);
		if(this.get_keys_of(x).join()!=="rows") debugger;
		if(x.rows!==2) debugger;
	}
	/** @private @arg {GE_Continuation} x */
	GE_Continuation(x) {
		const cf="GE_Continuation"; this.k(cf,x);
		if("getNotificationMenuEndpoint" in x) return this.E_GetNotificationMenu(x);
		if("continuationCommand" in x) {
			this.C_Continuation(x);
		} else if("getTranscriptEndpoint" in x) {
			this.E_GetTranscript(x);
		} else {
			debugger;
		}
	}
	/** @private @arg {E_GetTranscript} x */
	E_GetTranscript(x) {
		const cf="E_GetTranscript";
		const {clickTrackingParams,commandMetadata,getTranscriptEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		debugger;
		// this.G_CommandMetadata(commandMetadata);
		this.DE_GetTranscript(getTranscriptEndpoint);
	}
	/** @private @arg {DE_GetTranscript} x */
	DE_GetTranscript(x) {
		const cf="DE_GetTranscript";
		const {params,...y}=this.sd(cf,x); this.g(y);
		this.params(cf,"get_transcript.params",params);
	}
	/** @private @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript";
		const {responseContext: {},actions,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {
				return this.UA_EngagementPanel(a);
			}
			debugger;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RS_Success} x */
	RS_Success(x) {
		const cf="RS_Success";
		const {responseContext: {},success,...y}=this.sd(cf,x); this.g(y);
		this.primitive_of(success,"boolean");
	}
	/** @private @arg {RS_AttGet} x */
	RS_AttGet(x) {
		const cf="RS_AttGet";
		const {responseContext: {},challenge,bgChallenge,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(challenge);
		this.D_AttBgChallenge(bgChallenge);
	}
	/** @private @arg {RS_Guide} x */
	RS_Guide(x) {
		const cf="RS_Guide";
		const {responseContext: {},items,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {this.H_("R_GuideSubscriptionsSection",x,this.D_GuideSubscriptionsSection);}
	/** @private @arg {R_GuideDownloadsEntry} x */
	R_GuideDownloadsEntry(x) {this.H_("R_GuideDownloadsEntry",x,this.D_GuideDownloadsEntry);}
	/** @private @arg {R_GuideCollapsibleEntry} x */
	R_GuideCollapsibleEntry(x) {this.H_("R_GuideCollapsibleEntry",x,this.D_GuideCollapsibleEntry);}
	/** @private @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		const cf="G_GuideSectionItem"; this.k(cf,x);
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		if("guideDownloadsEntryRenderer" in x) return this.R_GuideDownloadsEntry(x);
		if("guideCollapsibleEntryRenderer" in x) return this.R_GuideCollapsibleEntry(x);
		if("guideSubscriptionsSectionRenderer" in x) return this.R_GuideSubscriptionsSection(x);
		if("guideSectionRenderer" in x) return this.R_GuideSection(x);
		debugger;
	}
	/** @private @arg {D_GuideCollapsibleEntry} x */
	D_GuideCollapsibleEntry(x) {
		const cf="D_GuideCollapsibleEntry";
		const {expanderItem,expandableItems,collapserItem,...y}=this.sd(cf,x); this.g(y);
		this.R_GuideEntry(expanderItem);
		this.z(expandableItems,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
			debugger;
		});
		this.R_GuideEntry(collapserItem);
	}
	/** @private @arg {D_GuideDownloadsEntry} x */
	D_GuideDownloadsEntry(x) {
		const cf="D_GuideDownloadsEntry";
		const {alwaysShow,entryRenderer,...y}=this.sd(cf,x); this.g(y);
		if(alwaysShow!==false) debugger;
		if(!entryRenderer.guideEntryRenderer) debugger;
		this.R_GuideEntry(entryRenderer);
	}
	/** @private @arg {D_GuideSubscriptionsSection} x */
	D_GuideSubscriptionsSection(x) {
		const cf="D_GuideSubscriptionsSection";
		const {sort,items,trackingParams,formattedTitle,handlerDatas,...y}=this.sd(cf,x); this.g(y);
		if(sort!=="CHANNEL_ACTIVITY") debugger;
		this.z(items,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
			if("guideCollapsibleEntryRenderer" in x) return this.G_GuideSectionItem(x);
			let ua=this.get_keys_of(x);
			if(ua.length>0) console.log("[G_GuideSubscriptionsSectionItem.key]",ua);
		});
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.G_Text);
		if(!this.eq_keys(handlerDatas,["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"])) debugger;
	}
	/** @private @arg {D_GuideSection} x */
	D_GuideSection(x) {
		const cf="D_GuideSection";
		const {items,trackingParams,formattedTitle,...y}=this.sd(cf,x); this.g(y);
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {string} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.sd(cf,x);
		this.D_Accessibility(accessibility);
		this.R_SimpleText(formattedTitle);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {string} cf @arg {D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	GE_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		if(!navigationEndpoint.browseEndpoint) debugger;
		this.E_Browse(navigationEndpoint);
		this.T_Icon(icon);
		switch(icon.iconType) {
			default: debugger; break;
			case "OFFLINE_DOWNLOAD":
			case "VIDEO_LIBRARY_WHITE": break;
		}
		switch(targetId) {
			default: console.log(`case "${x}": break;`); debugger; break;
			case "downloads-guide-item":
			case "library-guide-item": break;
		}
		if(isPrimary!==true) debugger;
	}
	/** @private @arg {R_GuideEntryData} x */
	R_GuideEntryData(x) {this.H_("R_GuideEntryData",x,this.D_GuideEntryData);}
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
	parse_guide_entry_id(x) {
		if(this.str_starts_with("UC",x)) {
			if(x.length===24) return;
			console.log("[guideEntryId.channel.length]",x.length);
			return;
		}
		if(this.str_starts_with("PL",x)) {
			if(x.length===34) return;
			console.log("[guideEntryId.playlist.length]",x.length);
			return;
		}
		switch(x) {
			default: x===""; console.log("new with param [Browse_param_2c_VL]",x); debugger; break;
			case "LL": case "WL":
		}
	}
	/** @private @arg {D_GuideEntryData} x */
	D_GuideEntryData(x) {
		const cf="D_GuideEntryData";
		const {guideEntryId,...y}=this.sd(cf,x); this.g(y);
		this.parse_guide_entry_id(guideEntryId);
	}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_GuideEntryBadges(x) {
		const cf="D_GuideEntryBadges";
		const {liveBroadcasting,...y}=this.sd(cf,x); this.g(y);
		if(liveBroadcasting!==false) debugger;
	}
	/** @private @arg {string} cf @arg {D_GuideEntry} x */
	D_GuideEntry_WithIcon(cf,x) {
		if("entryData" in x) {
			if("icon" in x) {
				const {navigationEndpoint,icon,entryData,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
				if(!navigationEndpoint.browseEndpoint) debugger;
				this.E_Browse(navigationEndpoint);
				switch(icon.iconType) {
					default: icon===""; this.do_codegen(cf,x); break;
					case "LIKES_PLAYLIST": case "PLAYLISTS":
				}
				return this.R_GuideEntryData(entryData);
			}
			const {...u}=this.D_GuideEntry_Omit(cf,x);
			const {entryData,navigationEndpoint,thumbnail,badges,presentationStyle,...y}=u; this.g(y);
			this.R_GuideEntryData(entryData);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.E_Browse(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_GuideEntryBadges(badges);
			if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
			return;
		}
		if("navigationEndpoint" in x) {
			if("targetId" in x) {
				this.GE_GuideEntry_WithTargetId(cf,x);
				return;
			}
			if("isPrimary" in x) {
				const {navigationEndpoint,icon,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
				if(!navigationEndpoint.browseEndpoint) debugger;
				this.E_Browse(navigationEndpoint);
				switch(icon.iconType) {
					case "SUBSCRIPTIONS": break;
					case "WHAT_TO_WATCH": break;
					default: debugger; break;
				}
				if(isPrimary!==true) debugger;
				return;
			}
			const {navigationEndpoint,icon,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
			x: {
				let x=navigationEndpoint;
				if("browseEndpoint" in x) {
					this.E_Browse(x);
					break x;
				}
				if("urlEndpoint" in x) {
					this.E_Url(x);
					break x;
				}
				debugger;
			}
			this.T_Icon(icon);
			switch(icon.iconType) {
				default: icon===""; this.do_codegen(cf,x); break;
				case "MY_VIDEOS": case "TRENDING": case "WATCH_HISTORY": case "WATCH_LATER": case "CLAPPERBOARD": case "MUSIC": case "LIVE":
				case "GAMING_LOGO": case "COURSE": case "TROPHY": case "NEWS": case "YOUTUBE_ROUND": case "FASHION_LOGO": case "FLAG":
				case "CREATOR_STUDIO_RED_LOGO": case "YOUTUBE_MUSIC": case "YOUTUBE_KIDS_ROUND": case "UNPLUGGED_LOGO": case "SETTINGS":
				case "ADD_CIRCLE":
			}
			{
				let x=navigationEndpoint;
				if("urlEndpoint" in x) return this.E_Url(x);
				if("browseEndpoint" in x) return this.E_Browse(x);;
				debugger;
			}
			return;
		}
		if("isPrimary" in x) {
			const {icon,isPrimary,serviceEndpoint,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
			if(icon.iconType!=="TAB_SHORTS") debugger;
			if(isPrimary!==true) debugger;
			x: {
				let x=serviceEndpoint;
				if("reelWatchEndpoint" in x) {
					this.E_ReelWatch(x);
					break x;
				}
				if("signalServiceEndpoint" in x) {
					x.clickTrackingParams;
					x.commandMetadata;
					break x;
				}
				x==="";
				debugger;
			}
			return;
		}
		x;
	}
	/** @private @arg {D_GuideEntry} x */
	D_GuideEntry(x) {
		const cf="D_GuideEntry"; this.k(cf,x);
		if("icon" in x) return this.D_GuideEntry_WithIcon(cf,x);
		if("presentationStyle" in x) {
			const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=this.sd(cf,x); this.g(y);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.E_Browse(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_GuideEntryBadges(badges);
			this.trackingParams(cf,trackingParams);
			this.R_SimpleText(formattedTitle);
			this.D_Accessibility(accessibility);
			this.R_GuideEntryData(entryData);
			switch(presentationStyle) {
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT":
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NONE": break;
				default: console.log(`[D_GuideEntry_PresentationType]\n\n\ncase"${presentationStyle}":`); break;
			}
			return;
		}
		x===0;
		debugger;
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry"; this.k(cf,x);
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=this.sd(cf,x); this.g(y);
		this.R_GuideEntry(headerEntry);
		if(expanderIcon.iconType!=="EXPAND") debugger; this.T_Icon(expanderIcon);
		if(collapserIcon.iconType!=="COLLAPSE") debugger; this.T_Icon(collapserIcon);
		this.z(sectionItems,this.G_GuideSectionItem);
		if(handlerDatas[0]!=="GUIDE_ACTION_ADD_TO_PLAYLISTS") debugger;
		if(handlerDatas[1]!=="GUIDE_ACTION_REMOVE_FROM_PLAYLISTS") debugger;
		if(handlerDatas.length!==2) debugger;
	}
	/** @private @arg {R_GuideCollapsibleSectionEntry} x */
	R_GuideCollapsibleSectionEntry(x) {this.H_("R_GuideCollapsibleSectionEntry",x,this.D_GuideCollapsibleSectionEntry);}
	/** @private @arg {R_GuideEntry} x */
	R_GuideEntry(x) {this.H_("R_GuideEntry",x,this.D_GuideEntry);}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H_("R_GuideSection",x,this.D_GuideSection);}
	/** @private @arg {D_AutoplayContent} x */
	D_AutoplayContent(x) {
		const cf="D_AutoplayContent";
		const {sets,countDownSecs,modifiedSets,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(sets,this.AutoplaySetItem);
		if(countDownSecs&&countDownSecs!==5) debugger;
		if(modifiedSets!==void 0) this.z(modifiedSets,this.ModifiedSetItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_PlaylistContent} x */
	D_PlaylistContent(x) {
		const cf="D_PlaylistContent";
		const {contents,title,currentIndex,playlistId,ownerName,isInfinite,playlistShareUrl,shortBylineText,longBylineText,trackingParams,titleText,isEditable,menu,localCurrentIndex,playlistButtons,isCourse,nextVideoLabel,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.z([ownerName,shortBylineText,longBylineText,titleText,nextVideoLabel],this.R_SimpleText);
		this.z(contents,this.R_PlaylistPanelVideo);
		this.primitive_str(title);
		this.primitive_str(playlistId);
		this.primitive_of(currentIndex,"number");
		this.parser.parse_url(cf,playlistShareUrl);
		this.R_Menu(menu);
		if(localCurrentIndex!==25&&localCurrentIndex!==0) debugger;
		this.R_Menu(playlistButtons);
		this.primitive_of(isInfinite,"boolean");
		this.primitive_of(isEditable,"boolean");
		this.primitive_of(isCourse,"boolean");
	}
	/** @private @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {this.H_("R_PlaylistPanelVideo",x,this.D_PlaylistPanelVideo);}
	/** @private @arg {D_PlayerOverlayVideoDetails} x */
	D_PlayerOverlayVideoDetails(x) {
		const cf="D_PlayerOverlayVideoDetails";
		const {title,subtitle,...y}=this.sd(cf,x); this.g(y);
		this.R_SimpleText(title);
		this.R_TextRuns(subtitle);
	}
	/** @private @arg {ES_Button} x */
	ES_Button(x) {
		const cf="ES_Button";
		if("signalServiceEndpoint" in x) return this.T_ES_Signal(x,this.M_SendPost,this.G_ClientSignal);
		if("ypcGetOffersEndpoint" in x) return this.E_YpcGetOffers(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {GE_Button_navigation} x */
	Button_navigationEndpoint(x) {
		const cf="Button_navigationEndpoint";
		if("shareEntityServiceEndpoint" in x) return this.ES_ShareEntity(x);
		if("browseEndpoint" in x) return this.E_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {
		const cf="E_YpcGetOffers";
		const {clickTrackingParams,commandMetadata,ypcGetOffersEndpoint: a,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		debugger;
		// this.G_CommandMetadata(commandMetadata);
		this.D_YpcGetOffers(a);
	}
	/** @private @arg {D_YpcGetOffers} x */
	D_YpcGetOffers(x) {
		const cf="D_YpcGetOffers";
		const {params,...y}=this.sd(cf,x); this.g(y);
		this.params(cf,"ypc_get_offers.params",params);
	}
	/** @private @arg {R_ChannelPage} x */
	R_ChannelPage(x) {
		const cf="R_ChannelPage";
		const {page,endpoint,response,url,...y}=this.sd(cf,x); this.g(y);
		if(page!=="channel") debugger;
		this.E_Browse(endpoint);
		this.RS_Channel(response);
		this.primitive_str(url);
	}
	/** @private @arg {R_PlaylistPage} x */
	R_PlaylistPage(x) {
		const cf="R_PlaylistPage"; this.k(cf,x);
		const {url,endpoint,page,response,...y}=this.sd(cf,x);
		if(page!=="playlist") debugger;
		this.E_Browse(endpoint);
		this.RS_Playlist(response);
		this.primitive_str(url);
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
		const cf="Settings_VE23462";
		const {page,endpoint,response,url,rootVe,...y}=this.sd(cf,x); this.g(y);
		if(page!=="settings") debugger;
		this.E_Browse(endpoint);
		this.RS_Settings(response);
		this.primitive_str(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {R_SettingsPage} x */
	R_SettingsPage(x) {
		const cf="R_SettingsPage";
		if("rootVe" in x) return this.Settings_VE23462(x);
		const {page,endpoint,response,url,...y}=this.sd(cf,x); this.g(y);
		if(page!=="settings") debugger;
		this.E_Browse(endpoint);
		this.RS_Settings(response);
		this.primitive_str(url);
	}
	/** @private @arg {Extract<R_ShortsPage,{rootVe:37414}>} x */
	Shorts_VE37414(x) {
		const cf="Shorts_VE37414";
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.sd(cf,x); this.g(y);
		if(rootVe!==37414) debugger;
		if(page!=="shorts") debugger;
		this.RS_Player(playerResponse);
		this.E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,this.RS_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.RS_ReelWatchSequence(cachedReelWatchSequenceResponse);
	}
	/** @private @arg {R_ShortsPage} x */
	R_ShortsPage(x) {
		const cf="R_ShortsPage";
		if("rootVe" in x) return this.Shorts_VE37414(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.sd(cf,x); this.g(y);
		if(page!=="shorts") debugger;
		this.RS_Player(playerResponse);
		this.E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,this.RS_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(cachedReelWatchSequenceResponse,this.RS_ReelWatchSequence);
	}
	/** @private @arg {R_SearchPage} x */
	R_SearchPage(x) {
		const cf="R_SearchPage";
		const {page,endpoint,response,url,...y}=this.sd(cf,x); this.g(y);
		if(page!=="search") debugger;
		this.E_Search(endpoint);
		this.RS_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {E_Search} x */
	E_Search(x) {
		const cf="E_Search";
		const {clickTrackingParams,commandMetadata,searchEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_VE4724(commandMetadata);
		this.D_Search(searchEndpoint);
	}
	/** @private @arg {M_VE4724} x */
	M_VE4724(x) {this.H_("M_VE4724",x,this.GM_VE4724_WC);}
	/** @private @arg {GM_VE4724_WC} x */
	GM_VE4724_WC(x) {
		const cf="GM_VE4724_WC";
		const {url,webPageType,rootVe,...y}=this.sd(cf,x); this.g(y);
		if(!this.str_starts_with("/results?search_query=",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SEARCH") debugger;
		if(rootVe!==4724) debugger;
	}
	/** @private @arg {D_Search} x */
	D_Search(x) {this.H_("D_Search",x,this.primitive_str);}
	/** @private @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader"; this.k(cf,x);
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.R_PlaylistHeader(x);
		debugger;
	}
	/** @private @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("R_C4TabbedHeader",x,this.D_C4TabbedHeader);}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("FeedTabbedHeader",x,this.D_FeedTabbedHeader);}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		this.R_TextRuns(this.w(x));
	}
	/** @private @arg {D_Cache_MD} x */
	D_Cache_MD(x) {
		const cf="CacheMetadata";
		const {isCacheHit,...y}=this.sd(cf,x); this.g(y);
		if(!isCacheHit) debugger;
	}
	/** @private @arg {B_StateTag} x */
	B_StateTag(x) {
		const cf="StateTag";
		if(x.stateTag!==3) debugger;
		if("instruction" in x) {
			const {stateTag: {},instruction,...y}=this.sd(cf,x); this.g(y);
			if(instruction!=="STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY") debugger;
			return;
		}
		const {stateTag: {},onStateTagModified,...y}=this.sd(cf,x); this.g(y);
		if(onStateTagModified!=="STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE") debugger;
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents"; this.k(cf,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		debugger;
	}
	/** @private @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {
		this.D_FeedFilterChipBar(this.w(x));
	}
	/** @private @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {
		this.D_TwoColumnBrowseResults(this.w(x));
	}
	/** @private @arg {A_ResponseReceived} x */
	A_ResponseReceived(x) {
		const cf="A_ResponseReceived"; this.k(cf,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		debugger;
	}
	/** @private @arg {MC_ResolveUrl} x */
	MC_ResolveUrl(x) {
		const cf="MC_ResolveUrl";
		const {isVanityUrl,parentTrackingParams,...y}=this.sd(cf,x); this.g(y);
		if(isVanityUrl!==void 0) this.primitive_of(isVanityUrl,"boolean");
		this.t(parentTrackingParams,a => this.params(cf,"tracking.parentTrackingParams",a));
	}
	/** @private @arg {DC_AdsControlFlowOpportunityReceived} x */
	DC_AdsControlFlowOpportunityReceived(x) {
		const cf="DC_AdsControlFlowOpportunityReceived";
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=this.sd(cf,x); this.g(y);
		this.save_enum("OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.DMD_AdSlotAndLayoutItem));
		this.primitive_of(isInitialLoad,"boolean");
		this.primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("R_AddToPlaylist",x,this.D_AddToPlaylist);}
	/** @private @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC",x);}
	/** @private @arg {R_Comment} x */
	R_Comment(x) {this.H_("Comment",x,this.D_Comment);}
	/** @private @arg {R_ElementUpdate} x */
	R_ElementUpdate(x) {this.H_("ElementUpdate",x,x => this.z(x,this.D_ElementUpdate));}
	/** @private @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H_("TemplateUpdate",x,this.D_TemplateUpdate);}
	/** @private @arg {R_ProfileColumn} x */
	R_ProfileColumn(x) {this.H_("ProfileColumn",x,this.D_ProfileColumn);}
	/** @private @arg {R_BrowseFeedActions} x */
	R_BrowseFeedActions(x) {this.H_("BrowseFeedActions",x,this.D_BrowseFeedActions);}
	/** @private @arg {R_WebSearchboxConfig} x */
	R_WebSearchboxConfig(x) {this.H_("SearchboxConfig",x,this.D_WebSearchboxConfig);}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist";
		const {responseContext: {},contents,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_CompactVideo} x */
	R_CompactVideo(x) {this.H_("R_CompactVideo",x,this.D_CompactVideo);}
	/** @private @arg {D_LoggingDirectives} x */
	D_LoggingDirectives(x) {
		const cf="D_LoggingDirectives";
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.TM_Visibility(visibility);
		this.t(gestures,this.D_LoggingDirectives_Gestures);
		if(enableDisplayloggerExperiment!==void 0) this.primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @private @arg {D_LoggingDirectives_Gestures} x */
	D_LoggingDirectives_Gestures(x) {
		const cf="D_LoggingDirectives_Gestures"; this.k(cf,x);
		let inner=this.T_Types(x);
		if(inner!==4) debugger;
	}
	/** @private @arg {EA_ChangeEngagementPanelVisibility} x */
	EA_ChangeEngagementPanelVisibility(x) {
		const cf="EA_ChangeEngagementPanelVisibility";
		const {clickTrackingParams,changeEngagementPanelVisibilityAction,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_ChangeEngagementPanelVisibility(changeEngagementPanelVisibilityAction);
	}
	/** @private @arg {TA_Continuation<`comment-replies-item-${string}`,R_Comment>} x */
	CommentRepliesItem(x) {
		const cf="CommentRepliesItem";
		const {targetId,continuationItems,...y}=this.sd(cf,x); this.g(y);
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_Comment);
	}
	/** @private @arg {D_FeedbackResponseProcessedStatus} x */
	D_FeedbackResponseProcessedStatus(x) {
		const cf="D_FeedbackResponseProcessedStatus";
		const {isProcessed,...y}=this.sd(cf,x); this.g(y);
		this.primitive_of(isProcessed,"boolean");
	}
	/** @private @arg {UA_EngagementPanel} x */
	UA_EngagementPanel(x) {
		const cf="UA_EngagementPanel";
		const {updateEngagementPanelAction,clickTrackingParams,...y}=this.sd(cf,x); this.g(y);
		this.D_UpdateEngagementPanel(updateEngagementPanelAction);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge";
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.sd(cf,x); this.g(y);
		this.t(interpreterUrl,a => {
			let uw=this.UrlWrappedValueT(a);
			this.primitive_str(uw);
		});
		this.primitive_str(interpreterHash);
		this.primitive_str(program);
		if(globalName!=="trayride") debugger;
	}
	/** @private @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {
		const cf="UrlWrappedValueT"; this.k(cf,x);
		return this.w(x);
	}
	/** @private @arg {D_ElementUpdate} x */
	D_ElementUpdate(x) {
		const cf="D_ElementUpdate"; this.k(cf,x);
		if("templateUpdate" in x) return this.R_TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return this.R_ResourceStatusInResponseCheck(x);
		debugger;
	}
	/** @private @arg {D_TemplateUpdate} x */
	D_TemplateUpdate(x) {
		const cf="D_TemplateUpdate"; this.k(cf,x);
		const {identifier,dependencies,serializedTemplateConfig: a,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(a);
	}
	/** @private @arg {D_EntityBatchUpdate} x */
	D_EntityBatchUpdate(x) {
		const cf="D_EntityBatchUpdate";
		const {mutations,timestamp,...y}=this.sd(cf,x); this.g(y);
		this.z(mutations,this.D_EntityMutationItem);
		this.D_TimestampWithNanos(timestamp);
	}
	/** @private @arg {D_TimestampWithNanos} x */
	D_TimestampWithNanos(x) {
		const cf="D_TimestampWithNanos";
		const {seconds,nanos,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(seconds);
		this.primitive_of(nanos,"number");
	}
	/** @private @arg {D_EntityMutationItem} x */
	D_EntityMutationItem(x) {
		const cf="D_EntityMutationItem";
		const {entityKey,type,options,payload,...y}=this.sd(cf,x); this.g(y);
		this.params(cf,"entity_key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE"&&type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		this.tf(this.D_EntityMutationOptions)(options);
		let payload_inner=this.tf(this.EntityMutationPayload)(payload);
		if(payload_inner) {
			let x=payload_inner;
			if("subscribed" in x) return;
			if("state" in x) return;
			if("serializedParams" in x) return;
			if("isHidden" in x) return;
			const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
			this.z([key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives],a => {
				if(a===void 0) debugger;
			});
		}
	}
	/** @private @template V @arg {{[U in `${string}Entity`]:V}} x */
	EN$(x) {return this.w(x);}
	/** @private @arg {G_Entity} x @returns {G_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?V|null:null:never} */
	EntityMutationPayload(x) {
		const cf="EntityMutationPayload"; this.k(cf,x);
		if("subscriptionStateEntity" in x) return this.EN$(x);
		if("transcriptTrackSelectionEntity" in x) return this.EN$(x);
		if("transcriptSearchBoxStateEntity" in x) return this.EN$(x);
		if("offlineabilityEntity" in x) return this.EN$(x);
		if("playlistLoopStateEntity" in x) return this.EN$(x);
		if("macroMarkersListEntity" in x) {let ret=this.EN$(x); console.log(ret); debugger; return null;};
		if("superThanksSelectedTierEntity" in x) {let ret=this.EN$(x); console.log(ret); debugger; return null;};
		let ret=this.EN$(x);
		console.log(ret);
		debugger;
		return null;
	}
	/** @private @arg {D_EntityMutationOptions} x */
	D_EntityMutationOptions(x) {
		const cf="D_EntityMutationOptions";
		const {persistenceOption,...y}=this.sd(cf,x); this.g(y);
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @private @arg {G_TopbarButtonItem} x */
	G_TopbarButtonItem(x) {
		const cf="G_TopbarButtonItem"; this.k(cf,x);
		if("topbarMenuButtonRenderer" in x) return this.R_TopbarMenuButton(x);
		if("notificationTopbarButtonRenderer" in x) return this.R_NotificationTopbarButton(x);
		debugger;
	}
	/** @private @arg {D_TwoColumnBrowseResults} x */
	D_TwoColumnBrowseResults(x) {
		const cf="D_TwoColumnBrowseResults";
		const {tabs,secondaryContents,...y}=this.sd(cf,x); this.g(y);
		this.z(tabs,this.RG_Result);
		this.t(secondaryContents,this.G_SecondaryContents);
	}
	/** @private @arg {TM_Visibility} x */
	TM_Visibility(x) {
		const cf="TM_Visibility";
		const {types,...y}=this.sd(cf,x); this.g(y);
		this.save_string("[Visibility.types]",types);
	}
	/** @private @arg {TA_Continuation<"comments-section",G_CommentsSection>} x */
	A_CommentsSectionContinuation$(x) {
		const cf="A_CommentsSectionContinuation";
		const {targetId,continuationItems,...y}=this.sd(cf,x); this.g(y);
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_CommentsSection);
	}
	/** @private @arg {TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>} x */
	A_BrowseFeed$(x) {
		const cf="A_BrowseFeed";
		const {targetId,continuationItems,...y}=this.sd(cf,x); this.g(y);
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_BrowseFeed);
	}
	/** @private @arg {TA_Continuation<"watch-next-feed",G_WatchNext>} x */
	A_WatchNext$(x) {
		const cf="A_WatchNext$";
		const {targetId,continuationItems,...y}=this.sd(cf,x); this.g(y);
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_WatchNext);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel";
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.sd(cf,x); this.g(y);
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {
			this.z(engagementPanels,this.R_EngagementPanelSectionList);
		}
	}
	/** @private @arg {G_SecondaryContents} x */
	G_SecondaryContents(x) {
		const cf="G_SecondaryContents"; this.k(cf,x);
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		debugger;
	}
	/** @private @arg {G_WatchNext} x */
	G_WatchNext(x) {
		const cf="G_WatchNext"; this.k(cf,x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		debugger;
	}
	/** @private @arg {ES_ShareEntity} x */
	ES_ShareEntity(x) {
		const cf="ES_ShareEntity";
		const {clickTrackingParams,commandMetadata,shareEntityServiceEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/share/get_share_panel") debugger;
		this.GM_WC(commandMetadata.webCommandMetadata);
		this.D_ShareEntityService(shareEntityServiceEndpoint);
	}
	/** @private @arg {D_ShareEntityService} x */
	D_ShareEntityService(x) {
		const cf="D_ShareEntityService";
		const {serializedShareEntity,commands,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(serializedShareEntity);
		this.z(commands,this.TA_OpenPopup);
	}
	/** @private @arg {M_SendPost} x */
	M_SendPost(x) {const cf="M_SendPost",{webCommandMetadata: a,...y}=this.sd(cf,x); this.g(y); this.GM_SendPost(a);}
	/** @private @arg {GM_SendPost} x */
	GM_SendPost(x) {
		const cf="GM_SendPost";
		const {sendPost: a,...y}=this.sd(cf,x); this.g(y);
		if(a!==true) debugger;
	}
	/** @private @arg {GC_Button} x */
	GC_Button(x) {
		const cf="GC_Button"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.EA_ChangeEngagementPanelVisibility(x);
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("openPopupAction" in x) return this.TA_OpenPopup(x);
		if("signalServiceEndpoint" in x) return this.T_ES_Signal(x,this.M_SendPost,this.G_ClientSignal);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("commandExecutorCommand" in x) return this.C_Executor(x);
		if("createBackstagePostEndpoint" in x) return this.E_CreateBackstagePost(x);
		if("getSurveyCommand" in x) return this.C_GetSurvey(x);
		debugger;
	}
	/** @private @arg {E_CreateBackstagePost} x */
	E_CreateBackstagePost(x) {
		const cf="E_CreateBackstagePost";
		this.T_Endpoint(cf,x,a => {
			this.params(cf,"createBackstagePost.param",this.w(this.w(a)));
		},meta => {
			console.log(meta);
			debugger;
		});
	}
	/** @private @arg {C_Executor} x */
	C_Executor(x) {
		const cf="C_Executor";
		const {clickTrackingParams,commandExecutorCommand,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_Executor(commandExecutorCommand);
	}
	/** @private @arg {DC_Executor} x */
	DC_Executor(x) {
		this.T_Commands(x,this.AC_Executor);
	}
	/** @private @arg {AC_Executor} x */
	AC_Executor(x) {
		if("changeEngagementPanelVisibilityAction" in x) return this.EA_ChangeEngagementPanelVisibility(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		if("openPopupAction" in x) return this.TA_OpenPopup(x);
		if("hideEngagementPanelScrimAction" in x) return this.A_HideEngagementPanelScrim(x);
		if("loopCommand" in x) {debugger; return;}
		if("updateToggleButtonStateCommand" in x) {debugger; return;}
		if("changeMarkersVisibilityCommand" in x) {debugger; return;}
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) {debugger; return;}
		debugger;
	}
	/** @private @arg {A_HideEngagementPanelScrim} x */
	A_HideEngagementPanelScrim(x) {
		const cf="A_HideEngagementPanelScrim";
		const {clickTrackingParams,hideEngagementPanelScrimAction,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.R_EngagementPanelTargetId(hideEngagementPanelScrimAction);
	}
	/** @private @arg {R_EngagementPanelTargetId} x */
	R_EngagementPanelTargetId(x) {
		const cf="R_EngagementPanelTargetId";
		const {engagementPanelTargetId,...y}=this.sd(cf,x); this.g(y);
		switch(engagementPanelTargetId) {
			default: debugger; break;
			case "engagement-panel-clip-create": break;
		}
	}
	/** @private @arg {D_TopbarLogo} x */
	D_TopbarLogo(x) {
		const cf="D_TopbarLogo";
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=this.sd(cf,x); this.g(y);
		this.T_Icon(iconImage);
		this.R_TextRuns(tooltipText);
		this.E_Browse(endpoint);
		this.trackingParams(cf,trackingParams);
		this.primitive_str(overrideEntityKey);
	}
	/** @private @arg {DMD_AdSlotAndLayoutItem} x */
	DMD_AdSlotAndLayoutItem(x) {
		const cf="DMD_AdSlotAndLayoutItem";
		const {adLayoutMetadata,adSlotMetadata,...y}=this.sd(cf,x); this.g(y);
		this.z(adLayoutMetadata,this.MMD_AdLayout_1);
		this.DM_AdSlot(adSlotMetadata);
	}
	/** @private @arg {D_FusionSearchbox} x */
	D_FusionSearchbox(x) {
		const cf="D_FusionSearchbox";
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=this.sd(cf,x); this.g(y);
		this.T_Icon(icon);
		this.R_TextRuns(placeholderText);
		this.R_WebSearchboxConfig(config);
		this.trackingParams(cf,trackingParams);
		this.E_Search(searchEndpoint);
		this.R_Button(clearButton);
	}
	/** @private @arg {AD_ChangeEngagementPanelVisibility} x */
	AD_ChangeEngagementPanelVisibility(x) {
		const cf="AD_ChangeEngagementPanelVisibility";
		const {targetId,visibility,...y}=this.sd(cf,x); this.g(y);
		switch(targetId) {
			default: targetId===""; this.codegen_new_typedef(x,"AD_ChangeEngagementPanelVisibility_id"); break;
			case "engagement-panel-clip-create": break;
			case "engagement-panel-clip-view": break;
			case "engagement-panel-comments-section": break;
			case "engagement-panel-structured-description": break;
			case "engagement-panel-macro-markers-auto-chapters": break;
			case "engagement-panel-macro-markers-description-chapters": break;
		}
		switch(visibility) {
			default: this.codegen_new_typedef(x,"ChangeEngagementPanelVisibilityActionData_vis"); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED": break;
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN": break;
		}
	}
	/** @private @arg {D_UpdateEngagementPanel} x */
	D_UpdateEngagementPanel(x) {
		const cf="D_UpdateEngagementPanel";
		const {content,targetId,...y}=this.sd(cf,x); this.g(y);
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("Transcript",x,this.D_Transcript);}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript"; this.k(cf,x);
		const {trackingParams,content: a,...y}=this.sd(cf,x); this.g(y);
		this.R_TranscriptSearchPanel(a);
	}
	/** @private @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel";
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,...y}=this.sd(cf,x); this.g(y);
		this.R_TwoColumnBrowseResults(contents);
		this.R_C4TabbedHeader(header);
		this.R_Channel_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_Microformat(microformat);
		this.z(onResponseReceivedActions,this.C_ResetChannelUnreadCount);
	}
	/** @private @arg {RS_Playlist} x */
	RS_Playlist(x) {
		const cf="RS_Playlist";
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.sd(cf,x); this.g(y);
		this.R_TwoColumnBrowseResults(contents);
		this.R_PlaylistHeader(header);
		this.t(alerts,x => this.Response_alerts(cf,x));
		this.R_Playlist_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_Microformat(microformat);
		this.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {string} cf @arg {NonNullable<RS_Playlist['alerts']>} x */
	Response_alerts(cf,x) {
		this.z(x,x => {
			if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
			this.do_codegen(`${cf}$alerts$iterate`,x);
		});
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings";
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.sd(cf,x); this.g(y);
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_FeedFilterChipBar} x */
	D_FeedFilterChipBar(x) {
		const cf="D_FeedFilterChipBar";
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=this.sd(cf,x); this.g(y);
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		this.R_Button(nextButton);
		this.R_Button(previousButton);
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {boolean} x */
	primitive_bool(x) {
		if(typeof x!=="boolean") debugger;
	}
	/** @private @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H_("ChipCloudChip",x,this.D_ChipCloudChip);}
	/** @private @arg {D_ChipCloudChip} x */
	D_ChipCloudChip(x) {
		const cf="D_ChipCloudChip";
		if("navigationEndpoint" in x) return this.D_ChipCloudChip_WithNav(cf,x);
		if("isSelected" in x) {
			let d=this.D_ChipCloudChip_Omit(cf,x);
			const {isSelected: a,...y}=d; this.g(y);
			if(a!==true) debugger;
			return;
		}
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_WithNav(cf,x) {
		let {style,text,trackingParams,...x1}=this.D_ChipCloudChip_OmitNav(cf,x);
		if("isSelected" in x1) {
			const {isSelected: a,...y}=x1; this.g(y);
			this.primitive_bool(a);
			return;
		}
		if("uniqueId" in x1) {
			const {uniqueId: b,...y}=x1; this.g(y);
			if(b!=="ATTRIBUTE_FILTER_TYPE_EXPLORE") debugger;
			return;
		}
		if("targetId" in x1) {
			const {targetId: a,...y}=x1; this.g(y);
			if(a!=="feed_filter_chip_bar_second_chip") debugger;
			return;
		}
		this.g(x1);
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_OmitNav(cf,x) {
		const {navigationEndpoint: a,...y}=this.sd(cf,x);
		this.D_ChipCloudChip_navigationEndpoint(a);
		return y;
	}
	/** @private @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>['navigationEndpoint']} x */
	D_ChipCloudChip_navigationEndpoint(x) {
		const cf="D_ChipCloudChip_navigationEndpoint";
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("relatedChipCommand" in x) return this.C_RelatedChip(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {C_RelatedChip} x */
	C_RelatedChip(x) {
		this.T_Endpoint("C_RelatedChip",x,x => {
			if(!x.relatedChipCommand) debugger;
			this.DC_RelatedChip(this.w(x));
		});
	}
	/** @private @arg {DC_RelatedChip} x */
	DC_RelatedChip(x) {
		const {targetSectionIdentifier,loadCached,...y}=x; this.g(y);
		if(targetSectionIdentifier!=="sid-wn-chips") debugger;
		if(loadCached!==true) debugger;
	}
	/** @arg {D_ChipCloudChip_Omit_CF} cf @private @template {D_ChipCloudChip} T @arg {T} x */
	D_ChipCloudChip_Omit(cf,x) {
		const {style: a,text: b,trackingParams: c,...y}=this.sd(cf,x);
		switch(a.styleType) {
			case "STYLE_DEFAULT":
			case "STYLE_HOME_FILTER":
			case "STYLE_REFRESH_TO_NOVEL_CHIP": break;
		}
		this.G_Text(b);
		this.trackingParams(cf,c);
		return y;
	}
	/** @private @arg {AutoplaySetItem} x */
	AutoplaySetItem(x) {
		const cf="AutoplaySetItem";
		const {mode,autoplayVideo,nextButtonVideo,...y}=this.sd(cf,x); this.g(y);
		if(mode!=="NORMAL") debugger;
		this.E_Watch(autoplayVideo);
		this.t(nextButtonVideo,this.E_Watch);
	}
	/** @private @arg {ModifiedSetItem} x */
	ModifiedSetItem(x) {
		const cf="ModifiedSetItem";
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.sd(cf,x); this.g(y);
		this.E_WatchPlaylist(autoplayVideo);
		this.E_WatchPlaylist(nextButtonVideo);
		this.t(previousButtonVideo,this.E_WatchPlaylist);
	}
	/** @private @arg {E_WatchPlaylist} x */
	E_WatchPlaylist(x) {
		const cf="E_WatchPlaylist";
		const {clickTrackingParams,commandMetadata,watchPlaylistEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		debugger;
		// this.G_CommandMetadata(commandMetadata);
		this.D_WatchPlaylist(watchPlaylistEndpoint);
	}
	/** @private @arg {D_WatchPlaylist} x */
	D_WatchPlaylist(x) {
		const cf="D_WatchPlaylist";
		const {playlistId,index,params,...y}=this.sd(cf,x); this.g(y);
		this.parser.parse_playlist_id(playlistId);
		this.primitive_of(index,"number");
		this.params(cf,"watch_playlist.params",params);
	}
	/** @private @arg {MMD_AdLayout_1} x */
	MMD_AdLayout_1(x) {
		const cf="MMD_AdLayout_1";
		const {layoutType,layoutId,adLayoutLoggingData,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(layoutType);
		this.primitive_str(layoutId);
		this.D_AdLayoutLogging(adLayoutLoggingData);
	}
	/** @private @arg {D_HotkeyDialog} x */
	D_HotkeyDialog(x) {
		const cf="D_HotkeyDialog";
		const {title,sections,dismissButton,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(title);
		this.z(sections,this.R_HotkeyDialogSection);
		this.R_Button(dismissButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_HotkeyDialogSection} x */
	D_HotkeyDialogSection(x) {
		const cf="D_HotkeyDialogSection"; this.k(cf,x);
		const {title,options: u,...y}=this.sd(cf,x); this.g(y);
		this.z(u,this.R_HotkeyDialogSectionOption);
	}
	/** @private @arg {D_HotkeyDialogSectionOption} x */
	D_HotkeyDialogSectionOption(x) {
		const cf="D_HotkeyDialogSectionOption"; this.k(cf,x);
		const {label,hotkey,...y}=this.sd(cf,x);
		this.R_TextRuns(label);
		this.primitive_str(hotkey);
		if("hotkeyAccessibilityLabel" in y) return this.D_Accessibility(this.w(y));
		this.g(y);
	}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {
		const cf="C_ResetChannelUnreadCount";
		const {clickTrackingParams,resetChannelUnreadCountCommand,...y}=this.sd(cf,x); this.g(y);
		this.primitive_str(clickTrackingParams);
		this.g(resetChannelUnreadCountCommand);
	}
	/** @private @arg {D_CinematicContainer} x */
	D_CinematicContainer(x) {
		const cf="D_CinematicContainer";
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=this.sd(cf,x); this.g(y);
		this.t(backgroundImageConfig,this.R_ThumbnailsList);
		this.D_GradientColorConfig(gradientColorConfig);
		if(presentationStyle&&presentationStyle!=="CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED") debugger;
		if(config.lightThemeBackgroundColor!==4278190080) debugger;
		this.save_keys(`[${cf}.config]`,config);
		for(let u of Object.entries(config)) {
			if(u[0]==="animationConfig") continue;
			if(typeof u[1]==="object") {debugger; continue;}
			this.save_string(`[${cf}.config.${u[0]}]`,`${u[1]}`);
		}
		this.save_keys(`[${cf}.config.animationConfig]`,config.animationConfig);
	}
	/** @private @arg {D_GradientColorConfig} x */
	D_GradientColorConfig(x) {
		{
			let c=x[0];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==0) debugger;
			if(u!=="2566914048") debugger;
		}
		{
			let c=x[1];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(u!=="2130706432") debugger;
		}
		{
			let c=x[2];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==1) debugger;
			if(u!=="4278190080") debugger;
		}
	}
	/** @private @arg {R_ThumbnailsList} x */
	R_ThumbnailsList(x) {
		const cf="R_ThumbnailsList"; this.k(cf,x);
		const {thumbnail,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.D_Thumbnail(thumbnail);
		this.t_cf(cf,trackingParams,this.trackingParams);
	}
	/** @private @arg {D_AdLayoutLogging} x */
	D_AdLayoutLogging(x) {const cf="D_AdLayoutLogging"; this.H_(cf,x,x => this.params(cf,"AdServingDataEntry",x));}
	/** @private @arg {R_PrefetchHintConfig} x */
	R_PrefetchHintConfig(x) {this.H_("R_PrefetchHintConfig",x,this.D_PrefetchHintConfig);}
	/** @private @arg {D_PrefetchHintConfig} x */
	D_PrefetchHintConfig(x) {
		const cf="D_PrefetchHintConfig"; this.k(cf,x);
	}
	/** @private @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("R_ResourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData"; this.k(cf,x);
		const {serverBuildLabel,resourceStatuses: a,...y}=this.sd(cf,x); this.g(y);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus";
		const {identifier,status,...y}=this.sd(cf,x); this.g(y);
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.primitive_str(identifier);
	}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("R_MusicThumbnail",x,this.D_MusicThumbnail);}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail";
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,a);
		this.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {R_LiveChat} x */
	R_LiveChat(x) {this.H_("R_LiveChat",x,this.D_LiveChat);}
	/** @private @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("R_ReportFormModal",x,this.D_ReportFormModal);}
	/** @private @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel";
		const {responseContext: {},trackingParams,actions,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel.actions[]";
			const {clickTrackingParams,openPopupAction,...y}=this.sd(cf,x); this.g(y);
			this.clickTrackingParams(cf,clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @private @arg {RS_Subscribe_ActionItem} x */
	RS_Subscribe_ActionItem(x) {
		const cf="RS_Subscribe_ActionItem";
		if("openPopupAction" in x) {
			const cf1=`${cf}.actions[]`;
			const {clickTrackingParams,openPopupAction,...y}=this.sd(cf1,x); this.g(y);
			this.clickTrackingParams(cf1,clickTrackingParams);
			console.log(`[${cf}.openPopupAction]`,openPopupAction);
			return;
		}
		if("addToGuideSectionAction" in x) return this.A_AddToGuideSection(x);
		if("runAttestationCommand" in x) return this.C_RunAttestation(x);
		if("updateSubscribeButtonAction" in x) return this.A_UpdateSubscribeButton(x);
		debugger;
	}
	/** @private @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe";
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.sd(cf,x); this.g(y);
		this.z(actions,this.RS_Subscribe_ActionItem);
		this.trackingParams(cf,trackingParams);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	R_WatchEndpointMusicConfig(x) {this.H_("R_WatchEndpointMusicConfig",x,this.D_WatchEndpointMusicConfig);}
	/** @private @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("R_PlaylistHeader",x,this.D_PlaylistHeader);}
	/** @private @arg {R_StructuredDescriptionContent} x */
	R_StructuredDescriptionContent(x) {this.H_("R_StructuredDescriptionContent",x,this.D_StructuredDescriptionContent);}
	/** @private @arg {R_ProductList} x */
	R_ProductList(x) {this.H_("R_ProductList",x,this.D_ProductList);}
	/** @private @arg {R_ClipSection} x */
	R_ClipSection(x) {this.H_("R_ClipSection",x,this.D_ClipSection);}
	/** @private @arg {R_MacroMarkersList} x */
	R_MacroMarkersList(x) {this.H_("R_MacroMarkersList",x,this.D_MacroMarkersList);}
	/** @private @arg {R_EngagementPanelTitleHeader} x */
	R_EngagementPanelTitleHeader(x) {this.H_("R_EngagementPanelTitleHeader",x,this.D_EngagementPanelTitleHeader);}
	/** @private @arg {R_Hint} x */
	R_Hint(x) {this.H_("R_Hint",x,this.D_Hint);}
	/** @private @arg {R_VideoViewCount} x */
	R_VideoViewCount(x) {this.H_("R_VideoViewCount",x,this.D_VideoViewCount);}
	/** @private @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("R_TwoColumnSearchResults",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {this.H_("R_PlaylistSidebarSecondaryInfo",x,this.D_PlaylistSidebarSecondaryInfo);}
	/** @private @arg {R_LikeButton} x */
	R_LikeButton(x) {this.H_("R_LikeButton",x,this.D_LikeButton);}
	/** @private @arg {D_LikeButton} x */
	D_LikeButton(x) {
		const cf="D_LikeButton";
		const {likesAllowed,...y}=this.sd(cf,x);
		if(likesAllowed!==true) debugger;
		let [{...up},ur]=this.unwrap_prefix(y,"like");
		{
			const cf="D_LikeButton.like";
			const {status,count,countText,countWithLikeText,countWithUnlikeText,countTooltipText,...y}=this.sd(cf,up); this.g(y);
		}
		let [{...ud},{...r2}]=this.unwrap_prefix(ur,"dislike");
		{
			const cf="D_LikeButton.dislike";
			const {countText,countWithDislikeText,countWithUndislikeText,countTooltipText,...y}=this.sd(cf,ud); this.g(y);
		}
		{
			const cf="D_LikeButton.rest";
			const {target,trackingParams,serviceEndpoints,...y}=r2; this.g(y);
			this.D_LikeApi(target);
			this.trackingParams(cf,trackingParams);
			this.z(serviceEndpoints,this.E_Like);
		}
	}
	/** @private @type {(x:Pick<E_Like,"likeEndpoint">)=>void} */
	E_Like_D({likeEndpoint: a,...y},_=this.g(y)) {this.DE_Like(a);}
	/** @private @arg {E_Like} x */
	E_Like(x) {this.T_Endpoint("E_Like",x,this.E_Like_D,this.E_Like_C);}
	/** @private @arg {D_LikeApi} x */
	D_LikeApi(x) {
		if("videoId" in x) return this.videoId(this.w(x));
		if("playlistId" in x) return this.playlistId(this.w(x));
		debugger;
	}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("R_TranscriptSearchPanel",x,this.D_TranscriptSearchPanel);}
	/** @private @arg {RD_TimedContinuation} x */
	RD_TimedContinuation(x) {this.H_("RD_TimedContinuation",x,this.DD_TimedContinuation);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("RC_LiveChat",x,this.DC_LiveChat);}
	/** @private @arg {G_Watch_SecondaryResults_ItemType_1} x */
	G_Watch_SecondaryResults_ItemType_1(x) {
		if("relatedChipCloudRenderer" in x) return this.R_RelatedChipCloud(x);
		if("itemSectionRenderer" in x) {
			this.TR_ItemSection_3(x,([a,...x]) => {
				let j=this.join_string(x,"-");
				if(j!=="sid-wn-chips-watch-next-feed") debugger;
				this.z(a,x => {
					if("compactRadioRenderer" in x) return this.R_CompactRadio(x);
					if("adSlotRenderer" in x) return this.R_AdSlot(x);
					if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
					if("" in x) return;
					debugger;
				});
			});
			return;
		}
		debugger;
	}
	/** @private @arg {R_CompactRadio} x */
	R_CompactRadio(x) {this.H_("R_CompactRadio",x,this.D_CompactRadio);}
	/** @private @arg {D_CompactRadio} x */
	D_CompactRadio(x) {
		const cf="D_CompactRadio";
		let {...o}=this.Omit_Menu_Radio(cf,x); o;
		// if(!a1.watchEndpoint) debugger;
		// this.E_Watch(a1);
		// let up=this.parse_with_url_parse(shareUrl);
		// if(this.is_url_with_pathname(up,"/watch")) {
		// 	let {...s}=this.parse_url_search_params(up.search);
		// 	{
		// 		let {v,playnext,list,...y}=s; this.g(y);
		// 		console.log("[CompactRadio.v]",v);
		// 		console.log("[CompactRadio.playnext]",playnext);
		// 		console.log("[CompactRadio.list]",list);
		// 	}
		// 	return;
		// }
		// up==="";
		debugger;
	}
	/** @private @arg {G_Watch_SecondaryResults_Results} x */
	G_Watch_SecondaryResults_Results(x) {
		const cf="G_Watch_SecondaryResults_Results";
		const {results,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.z(results,this.G_Watch_SecondaryResults_ItemType_1);
	}
	/** @private @arg {R_RelatedChipCloud} x */
	R_RelatedChipCloud(x) {
		this.H_("RC_LiveChat",x,x => {
			const cf="R_RelatedChipCloud.content"; this.k(cf,x);
			this.R_ChipCloud(this.w(x));
		});
	}
	/** @private @arg {R_ChipCloud} x */
	R_ChipCloud(x) {this.H_("R_ChipCloud",x,this.D_ChipCloud);}
	/** @private @arg {AD_HideEnclosing} x */
	AD_HideEnclosing(x) {this.H_("AD_HideEnclosing",x,this.primitive_str);}
	/** @private @arg {D_AddToPlaylist} x */
	D_AddToPlaylist(x) {
		const cf="D_AddToPlaylist";
		const {playlists,actions,...y}=this.sd(cf,x); this.g(y);
		this.z(playlists,this.R_PlaylistAddToOption);
		this.z(actions,this.R_AddToPlaylistCreate);
	}
	/** @private @arg {D_ProfileColumn} x */
	D_ProfileColumn(x) {this.H_("D_ProfileColumn",x,x => this.z(x,this.G_ProfileColumnItem));}
	/** @private @arg {G_ProfileColumnItem} x */
	G_ProfileColumnItem(x) {
		if("profileColumnStatsRenderer" in x) return this.R_ProfileColumnStats(x);
		if("profileColumnUserInfoRenderer" in x) return this.R_ProfileColumnUserInfo(x);
		debugger;
	}
	/** @private @arg {R_ProfileColumnStats} x */
	R_ProfileColumnStats(x) {this.H_("R_ProfileColumnStats",x,this.D_ProfileColumnStats);}
	/** @private @arg {D_ProfileColumnStats} x */
	D_ProfileColumnStats(x) {this.H_("D_ProfileColumnStats",x,x => this.z(x,this.R_ProfileColumnStatsEntry));}
	/** @private @arg {R_ProfileColumnStatsEntry} x */
	R_ProfileColumnStatsEntry(x) {this.H_("R_ProfileColumnStatsEntry",x,this.D_ProfileColumnStatsEntry);}
	/** @private @arg {D_ProfileColumnStatsEntry} x */
	D_ProfileColumnStatsEntry(x) {
		const cf="D_ProfileColumnStatsEntry";
		const {label,value,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(label);
		this.R_SimpleText(value);
	}
	/** @private @arg {R_ProfileColumnUserInfo} x */
	R_ProfileColumnUserInfo(x) {this.H_("R_ProfileColumnUserInfo",x,this.D_ProfileColumnUserInfo);}
	/** @private @arg {D_ProfileColumnUserInfo} x */
	D_ProfileColumnUserInfo(x) {
		const cf="D_ProfileColumnUserInfo";
		const {title,thumbnail,...y}=this.sd(cf,x); this.g(y);
		this.R_SimpleText(title);
		this.D_Thumbnail(thumbnail);
	}
	/** @private @arg {D_BrowseFeedActions} x */
	D_BrowseFeedActions(x) {this.H_("D_BrowseFeedActions",x,x => this.z(x,this.G_BrowseFeedContent));}
	/** @private @arg {R_SearchBox} x */
	R_SearchBox(x) {this.H_("D_ProfileColumn",x,this.D_SearchBox);}
	/** @private @arg {R_SubFeedSelector} x */
	R_SubFeedSelector(x) {this.H_("R_SubFeedSelector",x,this.D_SubFeedSelector);}
	/** @private @arg {D_SubFeedSelector} x */
	D_SubFeedSelector(x) {
		const cf="D_SubFeedSelector";
		const {title,options,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(title);
		this.z(options,this.R_SubFeedOption);
	}
	/** @private @arg {R_SubFeedOption} x */
	R_SubFeedOption(x) {this.H_("R_SubFeedOption",x,this.D_SubFeedOption);}
	/** @private @arg {D_SubFeedOption} x */
	D_SubFeedOption(x) {
		const cf="D_SubFeedOption";
		const {name,isSelected,navigationEndpoint,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_BrowseFeedContent} x */
	G_BrowseFeedContent(x) {
		if("searchBoxRenderer" in x) return this.R_SearchBox(x);
		if("subFeedSelectorRenderer" in x) return this.R_SubFeedSelector(x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("compactLinkRenderer" in x) return this.R_CompactLink(x);
		debugger;
	}
	/** @private @arg {D_WebSearchboxConfig} x */
	D_WebSearchboxConfig(x) {
		const cf="D_WebSearchboxConfig";
		const {requestLanguage: a,requestDomain: b,hasOnscreenKeyboard: c,focusSearchbox: d,...y}=this.sd(cf,x); this.g(y);
		if(!this.eq_keys([a,b],["en","ca"])) debugger;
		this.z([!c,d],x => {if(!x) debugger;});
	}
	/** @private @arg {R_Channel_MD} x */
	R_Channel_MD(x) {this.H_("R_Channel_MD",x,this.D_Channel_MD);}
	/** @private @arg {R_Playlist_MD} x */
	R_Playlist_MD(x) {this.H_("R_Playlist_MD",x,this.D_Playlist_MD);}
	/** @private @arg {R_AlertWithButton} x */
	R_AlertWithButton(x) {this.H_("R_AlertWithButton",x,this.D_AlertWithButton);}
	/** @private @arg {A_UpdateChannelSwitcherPage} x */
	A_UpdateChannelSwitcherPage(x) {this.H_("A_UpdateChannelSwitcherPage",x,x => {const cf="TA_Page_R_ChannelSwitcherPage",{page: a,...y}=this.sd(cf,x); this.g(y); this.R_ChannelSwitcherPage(a);});}
	/** @private @arg {R_ChannelSwitcherPage} x */
	R_ChannelSwitcherPage(x) {this.H_("R_ChannelSwitcherPage",x,this.D_ChannelSwitcherPage);}
	/** @private @arg {D_MP_GetMenu} x */
	D_MP_GetMenu(x) {let u=this.H_("D_MP_GetMenu",x,x => this.TR_MP_Menu(x)); this.g(u);}
	/** @private @template T @arg {TR_MP_Menu<T>} x */
	TR_MP_Menu(x) {const cf="TR_MP_Menu",{multiPageMenuRenderer: a,...y}=this.sd(cf,x); this.g(y); return a;}
	/** @private @arg {R_MerchandiseShelf} x */
	R_MerchandiseShelf(x) {this.H_("R_MerchandiseShelf",x,this.D_MerchandiseShelf);}
	/** @private @arg {R_VideoPrimaryInfo} x */
	R_VideoPrimaryInfo(x) {this.H_("R_VideoPrimaryInfo",x,this.D_VideoPrimaryInfo);}
	/** @private @arg {R_VideoSecondaryInfo} x */
	R_VideoSecondaryInfo(x) {this.H_("R_VideoSecondaryInfo",x,this.D_VideoSecondaryInfo);}
	/** @protected @arg {Extract<G_WatchResult_ContentsItem,{itemSectionRenderer:any}>} x */
	TR_ItemSection_CommentItemSection(x) {
		if(this.is_ItemSectionRendererTemplate(x)) {
			switch(x.itemSectionRenderer.sectionIdentifier) {
				case "comment-item-section": return this.TR_ItemSection_3_CommentItemSection(x);
				default: debugger; return x;
			}
		}
		switch(x.itemSectionRenderer.sectionIdentifier) {
			case "comments-entry-point": return this.TR_ItemSection_2(x,this.R_CommentItemSection_EntryPoint);
			default: debugger; return x;
		}
	}
	/** @private @arg {R_TopbarMenuButton} x */
	R_TopbarMenuButton(x) {this.H_("R_TopbarMenuButton",x,this.D_TopbarMenuButton);}
	/** @private @arg {D_TopbarMenuButton_MenuItem} x */
	D_TopbarMenuButton_MenuItem(x) {
		const cf="D_TopbarMenuButton_MenuItem";
		const {sections,trackingParams,style,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_CREATION") debugger;
	}
	/** @private @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton(x) {
		const cf="D_TopbarMenuButton";
		if("menuRenderer" in x) {
			const {icon,menuRenderer,trackingParams,accessibility,tooltip,style,...y}=this.sd(cf,x); this.g(y);
			if(icon.iconType!=="VIDEO_CALL") debugger;
			let u=this.TR_MP_Menu(menuRenderer);
			this.D_TopbarMenuButton_MenuItem(u);
			this.trackingParams(cf,trackingParams);
			this.D_Accessibility(accessibility);
			this.primitive_str(tooltip);
			if(style!=="STYLE_DEFAULT") debugger;
			return;
		}
		const {avatar,menuRequest,trackingParams,accessibility,tooltip,...y}=this.sd(cf,x); this.g(y);
		this.D_Thumbnail(avatar);
		this.T_ES_Signal(menuRequest,this.M_AccountMenu,this.S_GetAccountMenu);
	}
	/** @private @arg {M_AccountMenu} x */
	M_AccountMenu(x) {this.H_("M_AccountMenu",x,this.GM_AccountMenu);}
	/** @private @arg {GM_AccountMenu} x */
	GM_AccountMenu(x) {
		const cf="GM_AccountMenu";
		const {sendPost,apiUrl,...y}=this.sd(cf,x); this.g(y);
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/account/account_menu") debugger;
	}
	/** @private @arg {R_NotificationTopbarButton} x */
	R_NotificationTopbarButton(x) {this.H_("R_NotificationTopbarButton",x,this.D_NotificationTopbarButton);}
	/** @private @arg {D_NotificationTopbarButton} x */
	D_NotificationTopbarButton(x) {
		const cf="D_NotificationTopbarButton";
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=this.sd(cf,x); this.g(y);
		if(icon.iconType!=="NOTIFICATIONS") debugger;
		this.T_ES_Signal(menuRequest,this.M_GetNotificationMenu,this.Signal_GetNotificationsMenu);
	}
	/** @private @arg {Signal_GetNotificationsMenu} x */
	Signal_GetNotificationsMenu(x) {
		const cf="Signal_GetNotificationsMenu";
		const {signal,actions,...y}=this.sd(cf,x); this.g(y);
		if(signal!=="GET_NOTIFICATIONS_MENU") debugger;
		let [u]=this.z(actions,this.TA_OpenPopup);
		let [u1]=this.z(u,this.P_NotificationMenu_Popup);
		let [u2]=this.z(u1,this.TR_MP_Menu);
		this.z(u2,this.D_NotificationMenuPopupMenuItem);
	}
	/** @private @arg {D_NotificationMenuPopupMenuItem} x */
	D_NotificationMenuPopupMenuItem(x) {
		const cf="D_NotificationMenuPopupMenuItem";
		const {trackingParams,style,showLoadingSpinner,...y}=this.sd(cf,x); this.g(y);
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {P_NotificationMenu_Popup} x */
	P_NotificationMenu_Popup(x) {
		const cf="P_NotificationMenu_Popup";
		const {popup: a,popupType,beReused,...y}=this.sd(cf,x); this.g(y);
		if(popupType!=="DROPDOWN") debugger;
		if(beReused!==true) debugger;
		return a;
	}
	/** @private @arg {M_GetNotificationMenu} x */
	M_GetNotificationMenu(x) {const cf="M_GetNotificationMenu",{webCommandMetadata: a,...y}=this.sd(cf,x); this.g(y); this.GM_GetNotificationMenu(a);}
	/** @private @arg {GM_GetNotificationMenu} x */
	GM_GetNotificationMenu(x) {
		const cf="GM_GetNotificationMenu";
		const {sendPost,apiUrl,...y}=this.sd(cf,x); this.g(y);
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/notification/get_notification_menu") debugger;
	}
	/** @private @arg {A_SendFeedback} x */
	A_SendFeedback(x) {this.T_Endpoint("A_SendFeedback",x,x => {const cf="A_SendFeedback.rest",{sendFeedbackAction: a,...y}=this.sd(cf,x); this.g(y); this.AD_SendFeedback(a);});}
	/** @private @arg {AD_SendFeedback} x */
	AD_SendFeedback(x) {const cf="AD_SendFeedback",{bucket,...y}=this.sd(cf,x); this.g(y); if(bucket!=="Kevlar") debugger;}
	/** @private @arg {Extract<G_WatchResult_ContentsItem,TR_ItemSection_2<any, "comments-entry-point">>['itemSectionRenderer']['contents'][number]} x */
	R_CommentItemSection_EntryPoint(x) {
		const cf="R_CommentItemSection_EntryPoint";
		if("commentsEntryPointHeaderRenderer" in x) return this.R_CommentsEntryPointHeader(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {S_GetAccountMenu} x */
	S_GetAccountMenu(x) {
		const cf="S_GetAccountMenu";
		const {signal,actions,...y}=this.sd(cf,x); this.g(y);
		if(signal!=="GET_ACCOUNT_MENU") debugger;
		let [u]=this.z(actions,this.TA_OpenPopup);
		let [u1]=this.z(u,this.Popup_GetAccountMenu);
		let [u2]=this.z(u1,this.TR_MP_Menu);
		this.z(u2,this.MP_AccountMenu);
	}
	/** @private @arg {MP_AccountMenu} x */
	MP_AccountMenu(x) {
		const cf="MP_AccountMenu";
		const {style,trackingParams,showLoadingSpinner,...y}=this.sd(cf,x); this.g(y);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT") debugger;
		this.trackingParams(cf,trackingParams);
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {Popup_GetAccountMenu} x */
	Popup_GetAccountMenu(x) {
		const cf="Popup_GetAccountMenu";
		const {popup: a,popupType: b,beReused: c,...y}=this.sd(cf,x); this.g(y);
		if(b!=="DROPDOWN") debugger;
		if(c!==true) debugger;
		return a;
	}
	/** @private @arg {R_SectionList} x */
	R_SectionList(x) {this.H_("R_SectionList",x,this.G_SectionList);}
	/** @private @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe";
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference";
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {G_CommentsSection} x */
	G_CommentsSection(x) {
		const cf="G_CommentsSection";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ExpandableTab} x */
	D_ExpandableTab(x) {
		const cf="D_ExpandableTab";
		const {endpoint,title,selected,expandedText,content,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_FeedNudge} x */
	D_FeedNudge(x) {
		const cf="D_FeedNudge";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_BrowseFeed} x */
	R_BrowseFeed(x) {
		const cf="R_BrowseFeed";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_EndScreenPlaylist} x */
	R_EndScreenPlaylist(x) {this.H_("R_EndScreenPlaylist",x,this.D_EndScreenPlaylist);}
	/** @private @arg {D_EndScreenPlaylist} x */
	D_EndScreenPlaylist(x) {
		const cf="D_EndScreenPlaylist";
		const {playlistId,thumbnail,title,trackingParams,longBylineText,videoCountText,videoCount,navigationEndpoint,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_EndScreenVideo} x */
	R_EndScreenVideo(x) {this.H_("R_EndScreenVideo",x,this.D_EndScreenVideo);}
	/** @private @arg {D_SearchBox} x */
	D_SearchBox(x) {
		const cf="D_SearchBox";
		const {endpoint,searchButton,clearButton,placeholderText,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("R_AddToPlaylistCreate",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("R_PlaylistAddToOption",x,this.D_PlaylistAddToOption);}
	/** @private @arg {D_Comment} x */
	D_Comment(x) {
		const cf="D_Comment";
		const {authorText,authorThumbnail,actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,collapseButton,commentId,contentText,currentUserReplyThumbnail,voteCount,isLiked,expandButton,publishedTimeText,voteStatus,trackingParams,loggingDirectives,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_LiveChat} x */
	D_LiveChat(x) {
		const cf="D_LiveChat";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ReportFormModal} x */
	D_ReportFormModal(x) {
		const cf="D_ReportFormModal";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader";
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_WatchEndpointMusicConfig} x */
	D_WatchEndpointMusicConfig(x) {
		const cf="D_WatchEndpointMusicConfig";
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {
		const cf="A_AddToGuideSection";
		const {clickTrackingParams,addToGuideSectionAction,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {A_UpdateSubscribeButton} x */
	A_UpdateSubscribeButton(x) {this.H_("A_UpdateSubscribeButton",x,this.DAU_SubscribeButton);}
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.H_("C_RunAttestation",x,this.D_RunAttestation);}
	/** @private @arg {D_StructuredDescriptionContent} x */
	D_StructuredDescriptionContent(x) {this.H_("D_StructuredDescriptionContent",x,x => this.z(x,this.G_StructuredDescriptionContentItem));}
	/** @private @arg {D_ProductList} x */
	D_ProductList(x) {
		const cf="D_ProductList";
		const {contents,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ClipSection} x */
	D_ClipSection(x) {this.H_("D_ClipSection",x,x => this.z(x,this.R_ClipCreation));}
	/** @private @arg {R_ClipCreation} x */
	R_ClipCreation(x) {this.H_("C_RunAttestation",x,this.D_ClipCreation);}
	/** @private @arg {D_ClipCreation} x */
	D_ClipCreation(x) {
		const cf="D_ClipCreation";
		const {trackingParams,userAvatar,titleInput,scrubber,saveButton,displayName,publicityLabel,cancelButton,adStateOverlay,externalVideoId,publicityLabelIcon,...y}=this.sd(cf,x); this.g(y);
		this.R_ClipCreationScrubber(scrubber);
		debugger;
	}
	/** @private @template {number[]} T @arg {T} a */
	exact_arr(...a) {
		return a;
	}
	/** @private @arg {R_ClipCreationScrubber} x */
	R_ClipCreationScrubber(x) {this.H_("R_ClipCreationScrubber",x,this.D_ClipCreationScrubber);}
	/** @private @arg {D_ClipCreationScrubber} x */
	D_ClipCreationScrubber(x) {
		const cf="D_ClipCreationScrubber";
		const {lengthTemplate,maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs,startAccessibility,endAccessibility,durationAccessibility,...y}=this.sd(cf,x); this.g(y);
		let u=this.exact_arr(60000,5000,15000,120000);
		let t=this.exact_arr(maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs);
		if(!this.eq_keys(t,u)) debugger;
		this.z([startAccessibility,endAccessibility,durationAccessibility],this.D_Accessibility);
		debugger;
	}
	/** @private @arg {D_MacroMarkersList} x */
	D_MacroMarkersList(x) {
		const cf="D_MacroMarkersList";
		const {contents,syncButtonLabel,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_EngagementPanelTitleHeader} x */
	D_EngagementPanelTitleHeader(x) {
		const cf="D_EngagementPanelTitleHeader";
		const {title,contextualInfo,informationButton,menu,visibilityButton,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_Hint} x */
	D_Hint(x) {
		const cf="D_Hint";
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_VideoViewCount} x */
	D_VideoViewCount(x) {
		const cf="D_VideoViewCount";
		const {viewCount,shortViewCount,extraShortViewCount,isLive,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("D_TwoColumnSearchResults",x,this.R_SectionList);}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("D_PlaylistSidebarSecondaryInfo",x,this.R_VideoOwner);}
	/** @private @arg {DE_Like} x */
	DE_Like(x) {
		const cf="DE_Like"; this.k(cf,x);
		switch(x.status) {
			case "INDIFFERENT": {
				const cf="E_LikeIndifferent";
				const {status,target,removeLikeParams,...y}=this.sd(cf,x); this.g(y);
				this.t(removeLikeParams,x => this.params(cf,"like.removeLikeParams",x));
			} break;
			case "LIKE": {
				const cf="E_LikeLike";
				const {status,target,actions,likeParams,...y}=this.sd(cf,x); this.g(y);
				this.t(likeParams,x => this.params(cf,"like.likeParams",x));
			} break;
			case "DISLIKE": {
				const cf="E_LikeDislike";
				const {status,target,dislikeParams,...y}=this.sd(cf,x); this.g(y);
				this.t(dislikeParams,x => this.params(cf,"like.dislikeParams",x));
			} break;
		}
	}
	/** @private @arg {D_TranscriptSearchPanel} x */
	D_TranscriptSearchPanel(x) {
		const cf="D_TranscriptSearchPanel";
		const {body,footer,trackingParams,targetId,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ToggleButton} x */
	D_ToggleButton(x) {
		const cf="D_ToggleButton";
		const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,trackingParams,toggledStyle,accessibilityData,toggledAccessibilityData,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo";
		const {thumbnailRenderer,title,stats,menu,navigationEndpoint,badges,description,showMoreText,...y}=this.D_Omit_ThumbnailOverlay(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {DD_TimedContinuation} x */
	DD_TimedContinuation(x) {
		const cf="DD_TimedContinuation";
		const {timeoutMs,continuation,...y}=this.sd(cf,x); this.g(y);
		if(timeoutMs!==60000) debugger;
		this.params(cf,"TimedContinuation",continuation);
		debugger;
	}
	/** @private @arg {DC_LiveChat} x */
	DC_LiveChat(x) {
		const cf="DC_LiveChat";
		const {continuations,actionPanel,actions,clientMessages,emojis,header,itemList,ticker,trackingParams,participantsList,popoutMessage,viewerName,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {DC_PlaylistPanel} x */
	DC_PlaylistPanel(x) {
		const cf="DC_PlaylistPanel";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_CommentSimplebox} x */
	D_CommentSimplebox(x) {
		const cf="D_CommentSimplebox";
		const {submitButton,cancelButton,aadcGuidelinesStateEntityKey,authorThumbnail,avatarSize,placeholderText,emojiPicker,trackingParams,emojiButton,...y}=this.sd(cf,x); this.g(y);
		this.R_Button(submitButton);
		this.R_Button(cancelButton);
		this.params(cf,"aadc_guidelines_state_entity_key",aadcGuidelinesStateEntityKey);
		debugger;
	}
	/** @private @arg {D_SortFilterSubMenu} x */
	D_SortFilterSubMenu(x) {
		const cf="D_SortFilterSubMenu";
		const {subMenuItems,title,icon,accessibility,tooltip,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {E_ShowEngagementPanel} x */
	E_ShowEngagementPanel(x) {
		const cf="E_ShowEngagementPanel";
		const {clickTrackingParams,showEngagementPanelEndpoint,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.D_ShowEngagementPanel(showEngagementPanelEndpoint);
	}
	/** @private @arg {D_ShowEngagementPanel} x */
	D_ShowEngagementPanel(x) {
		const cf="D_ShowEngagementPanel";
		const {panelIdentifier,...y}=this.sd(cf,x); this.g(y);
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {AD_BrowserMediaSession} x */
	AD_BrowserMediaSession(x) {
		const cf="AD_BrowserMediaSession";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ToggleMenuServiceItem} x */
	D_ToggleMenuServiceItem(x) {
		const cf="D_ToggleMenuServiceItem";
		const {defaultText,defaultIcon,defaultServiceEndpoint,toggledText,toggledIcon,toggledServiceEndpoint,trackingParams,isToggled,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_CustomEmoji} x */
	D_CustomEmoji(x) {
		const cf="D_CustomEmoji";
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ChipCloud} x */
	D_ChipCloud(x) {
		const cf="D_ChipCloud";
		const {chips,trackingParams,horizontalScrollable,nextButton,previousButton,...y}=this.sd(cf,x); this.g(y);
		this.z(chips,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		if(horizontalScrollable!==false) debugger;
		this.z([nextButton,previousButton],this.R_Button);
	}
	/** @private @arg {D_ReelPlayerHeader} x */
	D_ReelPlayerHeader(x) {
		const cf="D_ReelPlayerHeader";
		const {reelTitleText,timestampText,channelNavigationEndpoint,channelTitleText,channelThumbnail,trackingParams,accessibility,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(reelTitleText);
		this.R_SimpleText(timestampText);
		this.E_Browse(channelNavigationEndpoint);
		this.R_TextRuns(channelTitleText);
		this.D_Thumbnail(channelThumbnail);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_PivotButton} x */
	D_PivotButton(x) {
		const cf="D_PivotButton";
		const {thumbnail,onClickCommand,trackingParams,contentDescription,soundAttributionTitle,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {A_ShowEngagementPanelScrim} x */
	A_ShowEngagementPanelScrim(x) {
		const cf="A_ShowEngagementPanelScrim";
		const {clickTrackingParams,showEngagementPanelScrimAction,...y}=this.sd(cf,x); this.g(y);
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_ShowEngagementPanelScrim(showEngagementPanelScrimAction);
		debugger;
	}
	/** @private @arg {AD_ShowEngagementPanelScrim} x */
	AD_ShowEngagementPanelScrim(x) {
		const cf="AD_ShowEngagementPanelScrim";
		const {engagementPanelTargetId,onClickCommands,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_NextContinuation} x */
	D_NextContinuation(x) {
		const cf="D_NextContinuation";
		const {continuation,clickTrackingParams,...y}=this.sd(cf,x); this.g(y);
		this.params(cf,"next_continuation.continuation",continuation);
		debugger;
	}
	/** @private @arg {D_PlaylistPanelVideo} x */
	D_PlaylistPanelVideo(x) {
		const cf="D_PlaylistPanelVideo";
		const {thumbnail,thumbnailOverlays,title,trackingParams,indexText,videoId,playlistSetVideoId,darkColorPalette,lightColorPalette,longBylineText,shortBylineText,selected,lengthText,menu,navigationEndpoint,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_C4TabbedHeader} x */
	D_C4TabbedHeader(x) {
		const cf="D_C4TabbedHeader";
		const {channelId,title,navigationEndpoint,avatar,banner,badges,headerLinks,subscribeButton,subscriberCountText,tvBanner,mobileBanner,trackingParams,sponsorButton,channelHandleText,videosCountText,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @type {(x:E_Like['commandMetadata'])=>void} */
	E_Like_C(x) {
		const cf="E_Like_C";
		const {webCommandMetadata: a,...y}=this.sd(cf,x); this.g(y);
		switch(a.apiUrl) {
			default: debugger; break;
			case "/youtubei/v1/like/removelike": return this.GM_like_removelike(a);
			case "/youtubei/v1/like/dislike": return this.GM_like_dislike(a);
			case "/youtubei/v1/like/like": return this.GM_like_like(a);
		}
	}
	/** @private @arg {GM_like_removelike} x */
	GM_like_removelike(x) {
		const cf="GM_like_removelike";
		const {apiUrl: a,sendPost: b,...y}=this.sd(cf,x); this.g(y);
		if(a!=="/youtubei/v1/like/removelike") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {GM_like_dislike} x */
	GM_like_dislike(x) {
		const cf="GM_like_dislike";
		const {apiUrl: a,sendPost: b,...y}=this.sd(cf,x); this.g(y);
		if(a!=="/youtubei/v1/like/dislike") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {GM_like_like} x */
	GM_like_like(x) {
		const cf="GM_like_like";
		const {apiUrl: a,sendPost: b,...y}=this.sd(cf,x); this.g(y);
		if(a!=="/youtubei/v1/like/like") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD";
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD";
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_AlertWithButton} x */
	D_AlertWithButton(x) {
		const cf="D_AlertWithButton";
		const {type,text,dismissButton,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage";
		const {header,targetId,contents,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_MerchandiseShelf} x */
	D_MerchandiseShelf(x) {
		const cf="D_MerchandiseShelf";
		const {title,items,trackingParams,showText,hideText,actionButton,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_VideoPrimaryInfo} x */
	D_VideoPrimaryInfo(x) {
		const cf="D_VideoPrimaryInfo";
		const {title,trackingParams,viewCount,videoActions,superTitleLink,badges,dateText,relativeDateText,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_VideoSecondaryInfo} x */
	D_VideoSecondaryInfo(x) {
		const cf="D_VideoSecondaryInfo";
		const {owner,description,subscribeButton,metadataRowContainer,showMoreText,showLessText,trackingParams,defaultExpanded,descriptionCollapsedLines,showMoreCommand,showLessCommand,...y}=this.sd(cf,x); this.g(y);
		this.R_VideoOwner(owner);
	}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {
		const cf="C_RefreshPlaylist"; this.T_Endpoint(cf,x,x => this.D_RefreshPlaylist(this.w(x)));
		const {clickTrackingParams,refreshPlaylistCommand,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {D_RefreshPlaylist} x */
	D_RefreshPlaylist(x) {
		const cf="D_RefreshPlaylist";
		const {...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_VideoOwner} x */
	R_VideoOwner(x) {this.H_("R_VideoOwner",x,this.D_VideoOwner);}
	/** @private @arg {D_VideoOwner} x */
	D_VideoOwner(x) {
		const cf="D_VideoOwner";
		if("badges" in x) {
			const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,navigationEndpoint,badges,...y}=this.sd(cf,x); this.g(y);
			return;
		}
		const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,navigationEndpoint,...y}=this.sd(cf,x); this.g(y);
	}
	/** @private @arg {R_MusicCarouselShelf} x */
	R_MusicCarouselShelf(x) {this.H_("R_MusicCarouselShelf",x,this.D_MusicCarouselShelf);}
	/** @private @arg {D_MusicCarouselShelf} x */
	D_MusicCarouselShelf(x) {
		const cf="D_MusicCarouselShelf";
		const {contents,header,trackingParams,itemSize,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_MusicShelf} x */
	R_MusicShelf(x) {this.H_("R_MusicShelf",x,this.D_MusicShelf);}
	/** @private @arg {D_MusicShelf} x */
	D_MusicShelf(x) {
		const cf="D_MusicShelf";
		const {contents,title,trackingParams,continuations,shelfDivider,autoReloadWhenEmpty,bottomButton,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_EndScreenVideo} x */
	D_EndScreenVideo(x) {
		const cf="D_EndScreenVideo";
		const {videoId,shortViewCountText,shortBylineText,thumbnail,thumbnailOverlays,title,trackingParams,lengthInSeconds,lengthText,publishedTimeText,navigationEndpoint,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_AddToPlaylistCreate} x */
	D_AddToPlaylistCreate(x) {
		const cf="D_AddToPlaylistCreate";
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption";
		const {playlistId,privacy,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,containsSelectedVideos,title,trackingParams,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {DAU_SubscribeButton} x */
	DAU_SubscribeButton(x) {
		const cf="DAU_SubscribeButton";
		const {subscribed,channelId,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_RunAttestation} x */
	D_RunAttestation(x) {
		const cf="D_RunAttestation";
		const {ids,engagementType,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {G_StructuredDescriptionContentItem} x */
	G_StructuredDescriptionContentItem(x) {
		const cf="G_StructuredDescriptionContentItem"; this.k(cf,x);
		if("expandableVideoDescriptionBodyRenderer" in x) return this.R_ExpandableVideoDescriptionBody(x);
		if("horizontalCardListRenderer" in x) return this.R_HorizontalCardList(x);
		if("videoDescriptionHeaderRenderer" in x) return this.R_VideoDescriptionHeader(x);
		if("videoDescriptionMusicSectionRenderer" in x) return this.R_VideoDescriptionMusicSection(x);
		debugger;
	}
	/** @private @arg {R_VideoDescriptionMusicSection} x */
	R_VideoDescriptionMusicSection(x) {this.H_("R_VideoDescriptionMusicSection",x,this.D_VideoDescriptionMusicSection);}
	/** @private @arg {R_VideoDescriptionHeader} x */
	R_VideoDescriptionHeader(x) {this.H_("R_VideoDescriptionHeader",x,this.D_VideoDescriptionHeader);}
	/** @private @arg {R_HorizontalCardList} x */
	R_HorizontalCardList(x) {this.H_("R_HorizontalCardList",x,this.D_HorizontalCardList);}
	/** @private @arg {R_ExpandableVideoDescriptionBody} x */
	R_ExpandableVideoDescriptionBody(x) {this.H_("R_ExpandableVideoDescriptionBody",x,this.D_ExpandableVideoDescriptionBody);}
	/** @private @arg {R_CommentsEntryPointHeader} x */
	R_CommentsEntryPointHeader(x) {this.H_("R_CommentsEntryPointHeader",x,this.D_CommentsEntryPointHeader);}
	/** @private @arg {D_CommentsEntryPointHeader} x */
	D_CommentsEntryPointHeader(x) {
		const cf="D_CommentsEntryPointHeader";
		const {headerText,onTap,trackingParams,commentCount,contentRenderer,targetId,...y}=this.sd(cf,x); this.g(y);
		this.R_TextRuns(headerText);
		this.C_Executor(onTap);
		this.trackingParams(cf,trackingParams);
		this.R_SimpleText(commentCount);
		this.D_CommentsEntryPointHeader_contentRenderer(contentRenderer);
		if(targetId!=="comments-entry-point-header-identifier") debugger;
	}
	/** @private @arg {D_CommentsEntryPointHeader['contentRenderer']} x */
	D_CommentsEntryPointHeader_contentRenderer(x) {
		if("commentsEntryPointTeaserRenderer" in x) return this.R_CommentsEntryPointTeaser(x);
		debugger;
	}
	/** @private @arg {R_CommentsEntryPointTeaser} x */
	R_CommentsEntryPointTeaser(x) {this.H_("R_CommentsEntryPointTeaser",x,this.D_CommentsEntryPointTeaser);}
	/** @private @arg {D_CommentsEntryPointTeaser} x */
	D_CommentsEntryPointTeaser(x) {
		const cf="D_CommentsEntryPointTeaser";
		const {teaserAvatar,teaserContent,trackingParams,...y}=x; this.g(y);
		if(!teaserAvatar.accessibility) debugger;
		this.D_Thumbnail(teaserAvatar);
		if(!teaserContent.simpleText) debugger;
		this.R_SimpleText(teaserContent);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_VideoDescriptionMusicSection} x */
	D_VideoDescriptionMusicSection(x) {
		const cf="D_VideoDescriptionMusicSection";
		const {sectionTitle,carouselLockups,topicLink,premiumUpsellLink,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_VideoDescriptionHeader} x */
	D_VideoDescriptionHeader(x) {
		const cf="D_VideoDescriptionHeader";
		const {title,channel,views,publishDate,factoid,channelNavigationEndpoint,channelThumbnail,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_HorizontalCardList} x */
	D_HorizontalCardList(x) {
		const cf="D_HorizontalCardList";
		const {cards,trackingParams,header,style,centerItems,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ExpandableVideoDescriptionBody} x */
	D_ExpandableVideoDescriptionBody(x) {
		const cf="D_ExpandableVideoDescriptionBody";
		const {descriptionBodyText,showMoreText,showLessText,...y}=this.sd(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_NotificationAction} x */
	D_NotificationAction(x) {
		const cf="D_ExpandableVideoDescriptionBody";
		const {responseText,actionButton,trackingParams,...y}=this.sd(cf,x); this.g(y);
		this.G_Text(responseText);
		this.t(actionButton,this.R_Button);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {ES_CreatePlaylist} x */
	ES_CreatePlaylist(x) {
		const cf="ES_CreatePlaylist"; this.T_Endpoint(cf,x,x => this.y(x,this.DS_CreatePlaylist),u => {
			let x=u.webCommandMetadata;
			const {sendPost,apiUrl,...y}=x; this.g(y);
			if(sendPost!==true) debugger;
			if(apiUrl!=="/youtubei/v1/playlist/create") debugger;
		});
	}
	/** @private @arg {DS_CreatePlaylist} x */
	DS_CreatePlaylist(x) {
		const cf="DS_CreatePlaylist";
		const {params,videoIds,...y}=x; this.g(y);
		this.t(params,x => this.params(cf,"service$create_playlist",x));
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {A_Signal} x */
	A_Signal(x) {
		const cf="D_ExpandableVideoDescriptionBody";
		const {clickTrackingParams,signalAction,...y}=this.sd(cf,x); this.g(y);
		debugger;
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
