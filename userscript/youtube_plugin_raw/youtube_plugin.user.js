// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.17
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2022
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */

/** @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function cast_as(e,x=e) {
	return x;
}
const as_cast=cast_as;

/** @type {YtdAppElement} */
const YtdAppElement=cast_as({});
/** @type {InstanceType<typeof YtdAppElement>|undefined} */
let ytd_app=void 0;
// #region Use module types
// #endregion
// #region
{
	/** @type {Exclude<typeof window[InjectApiStr],undefined>} */
	let inject_api=window.inject_api??as_cast({});
	window.inject_api=inject_api;
}
/** @type {Map<string, Blob|MediaSource>} */
let created_blobs=new Map;
/** @type {Set<string>} */
let active_blob_set=new Set;
/** @type {SavedData} */
let saved_data=cast_as({});
const is_yt_debug_enabled=false;
/** @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(value: T|X, _constructor_type:U)=>value is X} */
function cast2_c(value,_constructor_type) {
	void value,_constructor_type;
	return true;
}
/** @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(v:T|X, _constructor_type:U)=>X} */
function any_c(value,_constructor_type) {
	if(cast2_c(value,_constructor_type)) {
		return value;
	}
	throw new Error("Failed to cast");
}
/** @template {{length:number;[x:number]:T[number]}} T */
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
/** @template {{length:number;[x:number]:T[number]}} T @arg {T} x */
function make_iterator(x) {
	return new Iterator(x);
}

function yt_watch_page_loaded_handler() {
	if(!is_watch_page_active()) {
		return;
	}
	if(!has_ytd_page_mgr()) {
		console.log("no ytd-page-manager");
		return;
	}
	title_text_overlay_update();
	init_ui_plugin();
	if(!ytd_player) return;
	ytd_player.active_nav=false;
	ytd_player.init_nav=true;
}

let waiting_for_ytd_player=false;
/** @type {number|null} */
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
	/** @type {boolean} */
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
function iterate_ytd_app() {
	if(ytd_app) return false;
	const target_element=get_html_elements(document,"ytd-app")[0];
	if(!target_element) return false;
	on_ytd_app(target_element);
	return true;
}
/** @arg {HTMLElement} element */
function on_ytd_app(element) {
	const element_id="ytd-app";
	if(is_yt_debug_enabled||is_ytd_app_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	window.ytd_app=element;
	ytd_app=any_c(element,YtdAppElement);
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
		if(vis_imm) {
			fire_on_visibility_change_restart_video_playback();
			vis_imm=false;
		}
	} else {
		ytd_app.app_is_visible=false;
	}
	ytd_app.ytp_click_cint=setInterval(() => {
		if(!is_watch_page_active()||!ytd_app) return;
		if(!ytd_app.app_is_visible) {
			vis_imm=true;
			return;
		}
	},15*60*1000);
	document.addEventListener("visibilitychange",function() {
		if(!ytd_app) throw new Error("No ytd-app");
		if(!is_watch_page_active()) return;
		if(document.visibilityState==="visible") {
			ytd_app.app_is_visible=true;
			if(vis_imm) {
				fire_on_visibility_change_restart_video_playback();
				vis_imm=false;
			}
		} else {
			ytd_app.app_is_visible=false;
		}
	});
}

/** @type {Element|null} */
let main_page_app=null;

/** @arg {CustomEventType} event */
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
					let did_run=event.detail.handle_types_fut.run_with(v => v.save_string("body_element",fut_data));
					if(!did_run) {
						console.log("fut failed",...fut_data);
					}
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
			if(main_page_app&&!ytd_app) {
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
				/** @template T @arg {T|undefined} x @arg {(e:T)=>void} w */
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
					/** @type {Promise<void>} */
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

let found_element_count=0;
let expected_element_count=6;
async_plugin_init.__debug=false;

// spell:words monospace
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
function with_ytd_scope() {
	dom_observer.addEventListener("plugin-activate",yt_watch_page_loaded_handler);
	dom_observer.addEventListener("async-plugin-init",async_plugin_init);
}
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
	/** @arg {number} min @arg {number} max @arg {number} overdrive @arg {AudioGainController} gain_controller */
	constructor(min,max,overdrive,gain_controller) {
		this.use_cache=true;
		this.max=max;
		this.min=min;
		this.overdrive=overdrive;
		this.gain_controller=gain_controller;
	}
	/** @arg {number} gain */
	setGain(gain) {
		this.updateRangeElement(gain);
		this.gain_controller.setGain(gain);
	}
	getGain() {
		return this.gain_controller.getGain();
	}
	/** @private */
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
	/** @arg {KeyboardEvent} event */
	onKeyDown(event) {
		if(!this.range_element) return;
		this.gain_controller.last_event=event;
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
	/** @arg {number} new_gain */
	updateRangeElement(new_gain) {
		if(!this.range_element) return;
		this.range_element.value=""+Math.floor(this.max*new_gain);
	}
	/** @arg {CustomEvent<{filter_gain: number|undefined}>} event */
	onStateChange(event) {
		if(event.detail.filter_gain==void 0) {
			this.gain_controller.setGain(1);
			this.updateRangeElement(1);
			return;
		}
		this.gain_controller.setGain(event.detail.filter_gain);
		this.updateRangeElement(event.detail.filter_gain);
	}
	/** @arg {Element} view_parent */
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
if(typeof exports==="object") {
	let exports=get_exports();
	exports.VolumeRange=VolumeRange;
}
/** @arg {string|URL} url */
function to_url(url) {
	if(url instanceof URL) {
		return url;
	} else {
		return new URL(url);
	}
}
/** @arg {Error} rejection @returns {Promise<Response>} */
function fetch_rejection_handler(rejection) {
	if(rejection instanceof DOMException) {
		if(rejection.name==="AbortError") {
			throw rejection;
		}
		if(rejection.message!=="") {
			console.log("fetch_rejection_handler",rejection.name);
			console.log(rejection);
		}
		throw rejection;
	}
	if(rejection instanceof TypeError) {
		if("cause" in rejection) {
			console.log(rejection.message,rejection.name,rejection.cause);
		} else {
			console.log(rejection.message,rejection.name);
		}
		throw rejection;
	}
	console.log("fetch_rejection_handler");
	console.log("\t",rejection);
	throw rejection;
}
class PropertyHandler {
	/** @type {PropertyHandler[]} */
	static instances=[];
	/** @type {Map<{}, {}>} */
	proxy_map=new Map;
	/** @type {{value: any}} */
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
/** @arg {{}} object @arg {PropertyKey} property @arg {PropertyHandler} property_handler */
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
override_prop(window,"getInitialCommand",new PropertyHandler((/** @type {[any,any,any]} */args) => Reflect.apply(...args)));
class ObjectInfo {
	constructor() {
		let [gr_0,gr_1,gr_2]="{{:,:}}".split(":");
		this.chunk_beg=gr_0;
		this.chunk_sep=gr_1;
		this.chunk_end=gr_2;
		this.key_sep=this.chunk_end+this.chunk_sep+this.chunk_beg;
	}
	/** @template U @template {U[]} T @arg {T} a @arg {(value: U) => boolean} b */
	do_filter(a,b) {
		/** @type {U[]} */
		let r=[];
		/** @type {T} */
		let res=cast_as(r);
		for(let i=0;i<a.length;i++) {
			if(b(a[i])) {
				res.push(a[i]);
			}
		}
		return res;
	}
	/** @template U @template {U[]} T @arg {T} a @arg {(value: U) => boolean} [b] @returns {T|[]} */
	filter_keys_of(a,b) {
		if(b) return this.do_filter(a,b);
		return a;
	}
	/** @template {{}} T @arg {T} object @arg {(value: string) => boolean} [filter_function] */
	keys_of(object,filter_function) {
		let object_keys=this.filter_keys_of(get_keys_of(object),filter_function);
		return this.chunk_beg+object_keys.join(this.key_sep)+this.chunk_end;
	}
}
ObjectInfo.instance=new ObjectInfo;
/** @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
function get_keys_of(obj) {
	if(!obj) {
		debugger;
	}
	let rq=Object.keys(obj);
	/** @type {any} */
	let ra=rq;
	return ra;
}
/** @template {{}} T @arg {T} obj @returns {[MaybeKeysArray<T>[0]]} */
function get_keys_of_one(obj) {
	if(!obj) {
		debugger;
	}
	let rq=Object.keys(obj);
	if(rq.length>1) throw new Error("Too many keys");
	/** @type {any} */
	let ra=rq;
	return ra;
}
/** @template {{}} T @arg {T} obj @returns {(keyof T)[]} */
function get_keys_of_ex(obj) {
	let pd=Object.getOwnPropertyDescriptors(obj);
	let l1_pk=get_keys_of(pd);
	/** @type {T} */
	let obj_proto=Object.getPrototypeOf(obj);
	let l2_pd=Object.getOwnPropertyDescriptors(obj_proto);
	let l2_pk=get_keys_of(l2_pd);
	let rq=l1_pk.concat(l2_pk);
	return rq;
}
class IterateApiResultBase {
	iterate_target;
	/** @type {Map<string,keyof YtIterateTarget>} */
	keys_map=new Map;
	/** @arg {YtIterateTarget} iterate */
	constructor(iterate) {
		this.iterate_target=iterate;
		let keys=get_keys_of_ex(iterate);
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
			/** @type {{[x: string]: {}}} */
			let wk=data;
			let value=wk[key];
			let rk=this.keys_map.get(key);
			if(rk===void 0&&key in this.iterate_target) {
				console.log("update keys map new key",key);
				debugger;
			}
			if(rk!==void 0&&this.iterate_target[rk]===void 0) {
				console.log("update keys map remove",key);
				debugger;
			}
			const state={t,path: `${path}.${key}`};
			if(rk!==void 0&&this.iterate_target[rk]) {
				this.iterate_target[rk](state,cast_as(value));
			} else {
				this.default_iter(state,value);
			}
		}
	}
}
/** @typedef {{t:FilterHandlers;path:string}} ApiIterateState */
class YtIterateTarget {
	/** @arg {ApiIterateState} state @arg {AppendContinuationItemsAction} action */
	appendContinuationItemsAction(state,action) {
		check_item_keys(state.path,"appendContinuationItemsAction",get_keys_of(action));
		if(!action.continuationItems) {
			debugger;
		}
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(state.t,"appendContinuationItemsAction.continuationItems",action.continuationItems);
		if(filtered.length>0) {
			action.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg  {ReloadContinuationItemsCommandData} command */
	reloadContinuationItemsCommand({t: state,path},command) {
		check_item_keys(path,"reloadContinuationItemsCommand",get_keys_of(command));
		if(!command.continuationItems) {
			debugger;
		}
		let filtered=state.handlers.renderer_content_item_array.replace_array(state,"reloadContinuationItemsCommand.continuationItems",command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg {ItemSectionData} renderer */
	itemSectionRenderer_with_state(state,renderer) {
		let {t,path}=state;
		check_item_keys(path,"itemSectionRenderer",get_keys_of(renderer));
		t.iteration.default_iter(state,renderer);
		if(renderer.contents===void 0) return;
		renderer.contents=renderer.contents.filter((item) => {
			let keys=get_keys_of(item);
			check_item_keys(path,"itemSectionRenderer.contents[]",keys);
			for(let key of keys) {
				let is_blacklisted=t.blacklisted_item_sections.get(key);
				if(is_blacklisted!==void 0) return !is_blacklisted;
				console.log("filter_handlers: new item section at itemSectionRenderer.contents[]: ",key);
			}
			return true;
		});
	}
	/** @arg {ApiIterateState} state @arg {RichGridData} renderer */
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
/** @arg {string} real_path @arg {string[]} keys @arg {string} path @return {void} @log item_keys_tag */
function check_item_keys(real_path,path,keys) {
	let real_path_arr=real_path.split(".");
	let real_path_arr_dyn={
		get arr() {
			return real_path_arr;
		}
	};
	switch(path) {
		default: console.log("item_keys_tag [ci_1_1_]: new path=%o",path,real_path_arr_dyn); break;
		case "appendContinuationItemsAction.continuationItems[]": break;
		case "appendContinuationItemsAction": break;
		case "itemSectionRenderer.contents[]": break;
		case "itemSectionRenderer": break;
		case "reloadContinuationItemsCommand.continuationItems[]": break;
		case "reloadContinuationItemsCommand": break;
		case "richGridRenderer.contents[]": break;
		case "richGridRenderer.masthead": break;
		case "richGridRenderer": break;
		case "richItemRenderer.content": break;
		case "richItemRenderer": break;
	}
	let mode=null;
	switch(path) {
		default: console.log("item_keys_tag [ci_2_1_]: content path",path,real_path_arr_dyn); break;
		case "appendContinuationItemsAction.continuationItems[]": mode="items"; break;
		case "appendContinuationItemsAction": mode="action"; break;
		case "richItemRenderer.content": mode="items"; break;
		case "richItemRenderer": mode="renderer"; break;
		case "richGridRenderer.contents[]": mode="items"; break;
		case "richGridRenderer.masthead": mode="renderer"; break;
		case "richGridRenderer": mode="action"; break;
		case "itemSectionRenderer.contents[]": mode="items"; break;
		case "itemSectionRenderer": mode="action"; break;
		case "reloadContinuationItemsCommand.continuationItems[]": mode="items"; break;
		case "reloadContinuationItemsCommand": mode="action"; break;
	}
	if(mode==="items") for(let key of keys) switch(key) {
		default: console.log("item_keys_tag [ci_3_0_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
		case "backstagePostThreadRenderer": break;
		case "channelAboutFullMetadataRenderer": break;
		case "channelFeaturedContentRenderer": break;
		case "channelRenderer": break;
		case "commentsEntryPointHeaderRenderer": break;
		case "compactPlaylistRenderer": break;
		case "compactRadioRenderer": break;
		case "compactVideoRenderer": break;
		case "connectedAppRenderer": break;
		case "continuationItemRenderer": break;
		case "gridRenderer": break;
		case "messageRenderer": break;
		case "pageIntroductionRenderer": break;
		case "playlistVideoListRenderer": break;
		case "promotedSparklesWebRenderer": break;
		case "reelShelfRenderer": break;
		case "searchPyvRenderer": break;
		case "settingsOptionsRenderer": break;
		case "shelfRenderer": break;
		case "videoRenderer": break;
		// richGridRenderer.contents[]
		case "richItemRenderer": break;
		case "richSectionRenderer": break;
		// richItemRenderer.content
		case "adSlotRenderer": break;
		case "radioRenderer": break;
		// comments
		case "commentThreadRenderer": break;
		case "commentsHeaderRenderer": break;
		case "feedFilterChipBarRenderer": break;
		case "reelItemRenderer": break;
	}
	keys=keys.filter(e => e!=="trackingParams");
	if(mode==="action") for(let key of keys) switch(key) {
		default: console.log("item_keys_tag [ci_4_0_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
		case "contents": break;
		case "header": break;
		case "targetId": break;
		case "reflowOptions": break;
		case "continuationItems": break;
		case "slot": break;
		case "style": break;
	}
	if(mode==="renderer") for(let key of keys) switch(key) {
		default: console.log("item_keys_tag [ci_5_0_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
		case "content": break;
	}
}
class HandleRendererContentItemArray {
	debug=false;
	/** @arg {string} path @arg {HandleRichGridRenderer|FilterHandlers} base @arg {RichItemRenderer} content_item */
	filter_for_rich_item_renderer(path,base,content_item) {
		let debug_flag_value=false;
		if("filter_handler_debug" in base) {
			if(base.filter_handler_debug) debug_flag_value=base.filter_handler_debug;
		} else if("debug" in base) {
			debug_flag_value=base.debug;
		} else {
			debugger;
		}
		let renderer=content_item.richItemRenderer;
		check_item_keys(path,"richItemRenderer",get_keys_of(renderer));
		console.assert(renderer.content!=void 0,"richItemRenderer has content");
		check_item_keys(path,"richItemRenderer.content",get_keys_of(renderer.content));
		if("adSlotRenderer" in renderer.content) {
			if(debug_flag_value) console.log("adSlotRenderer=",renderer.content.adSlotRenderer);
			return false;
		}
		return true;
	}
	/** @arg {RichSectionRenderer} content_item */
	handle_rich_section_renderer(content_item) {
		let renderer=content_item.richSectionRenderer;
		if("inlineSurveyRenderer" in renderer.content) {
			renderer.content.inlineSurveyRenderer;
			return true;
		}
		if(!("richShelfRenderer" in renderer.content)) {
			console.log("rich section content",renderer.content);
			return true;
		}
		let rich_shelf=renderer.content.richShelfRenderer;
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
	/** @template {BrowseFeedItem[]|WatchNextItem[]|CommentsSectionItem[]|SectionItem[]} T @arg {HandleRichGridRenderer|FilterHandlers} base @arg {string} path @arg {T} arr @returns {T} */
	replace_array(base,path,arr) {
		return cast_as(arr.filter((/** @type {typeof arr[number]} */content_item) => {
			let keys=get_keys_of(content_item);
			check_item_keys(path,`${path}[]`,keys);
			if("richItemRenderer" in content_item) {
				return this.filter_for_rich_item_renderer(path,base,content_item);
			}
			if("commentThreadRenderer" in content_item) return true;
			if("commentsHeaderRenderer" in content_item) return true;
			if("continuationItemRenderer" in content_item) return true;
			if("compactVideoRenderer" in content_item) return true;
			if("compactPlaylistRenderer" in content_item) return true;
			if("feedFilterChipBarRenderer" in content_item) return true;
			if(!("richSectionRenderer" in content_item)) {
				console.log("extra content_item keys "+"["+keys.join("][")+"]",content_item);
				return true;
			};
			return this.handle_rich_section_renderer(content_item);
		}));
	}
}
class HandleRichGridRenderer {
	debug=false;
	/** @readonly */
	class_name="HandleRichGridRenderer";
	/** @readonly */
	entry="richGridRenderer";
	rendererContentItemArray=new HandleRendererContentItemArray;
	/** @arg {string} path @arg {RichGridData} renderer */
	richGridRenderer(path,renderer) {
		check_item_keys(path,"richGridRenderer",get_keys_of(renderer));
		if(this.debug) console.log("run handler richGridRenderer");
		if(renderer.masthead) {
			check_item_keys(path,"richGridRenderer.masthead",get_keys_of(renderer.masthead));
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead;
				/** @type {{masthead: {}}&Omit<typeof renderer,"masthead">} */
				let no_ad_renderer=renderer;
				console.log("masthead",masthead);
				no_ad_renderer.masthead=masthead;
			}
		}
		if(renderer.contents) {
			if(this.debug) console.log("on_contents",path);
			let filtered=this.rendererContentItemArray.replace_array(this,"richGridRenderer.contents",renderer.contents);
			if(filtered.length>0) {
				renderer.contents=filtered;
			}
		}
	}
}
/** @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
function make_search_params(t) {
	let sp=new URLSearchParams(t);
	/** @type {any} */
	let as_any=Object.fromEntries(sp.entries());
	return as_any;
}
class Base64Binary {
	_keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	/* will return a  Uint8Array type */
	/** @arg {string} input */
	decodeByteArray(input) {
		let real_len=input.length-1;
		while(real_len>=0&&input[real_len]==="=") real_len--;
		var byte_len=((real_len+1)/4)*3|0;
		var ab=new ArrayBuffer(byte_len);
		let byte_arr=new Uint8Array(ab);
		this.decode(input,byte_arr);
		return byte_arr;
	}
	/** @arg {string} input */
	decode_str(input) {
		let y=this.decodeByteArray(input);
		return decoder.decode(y);
	}
	/** @arg {string} input @arg {Uint8Array} binary_arr */
	decode(input,binary_arr) {
		var byte_len=(input.length/4)*3|0;
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		var j=0;

		let prev_len=input.length;
		input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
		if(prev_len!==input.length) {
			console.log("removed %o non base64 chars",prev_len-input.length);
			debugger;
			throw new Error("Bad");
		}

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

		return binary_arr;
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
/** @arg {MyReader} reader @arg {number} [writeLength] */
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
	read_any_new(size) {
		this.pos=0;
		return this.read_any(size);
	}
	cur_len=0;
	/** @private @arg {number} [size] */
	read_any(size) {
		this.failed=false;
		if(!size) {
			this.cur_len=this.len;
		} else {
			this.cur_len=this.pos+size;
		}
		/** @type {DataArrType} */
		let data=[];
		let loop_count=0;
		let log_slow=true;
		for(;this.pos<this.cur_len;loop_count++) {
			let cur_byte=this.uint32();
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
		/** @type {DecTypeNum[]} */
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
	/** @template T @arg {()=>T} x */
	revert(x) {
		let prev_pos=this.pos;
		this.pos=this.last_pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	/** @template T @arg {number} pos @arg {()=>T} x */
	revert_to(pos,x) {
		let prev_pos=this.pos;
		this.pos=pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
	}
	/** @arg {number} [length] */
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
		return ret;
	};
	do_uint32_read() {
		let value=0;
		value=(this.buf[this.pos]&127)>>>0;
		if(this.buf[this.pos++]<128) return value;
		value=(value|(this.buf[this.pos]&127)<<7)>>>0;
		if(this.buf[this.pos++]<128) return value;
		value=(value|(this.buf[this.pos]&127)<<14)>>>0;
		if(this.buf[this.pos++]<128) return value;
		value=(value|(this.buf[this.pos]&127)<<21)>>>0;
		if(this.buf[this.pos++]<128) return value;
		value=(value|(this.buf[this.pos]&15)<<28)>>>0;
		if(this.buf[this.pos++]<128) return value;
		if((this.pos+=5)>this.len) {
			this.pos=this.len;
			throw RangeError("index out of range: "+this.pos+" + "+(10||1)+" > "+this.len);
		}
		return value;
	}
	uint64() {
		this.last_pos=this.pos;
		return this.readLongVarint().toBigInt();
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
	/** @arg {Uint8Array} buf @arg {number} end */
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
	/** @arg {number} writeLength */
	indexOutOfRange(writeLength) {
		return RangeError("index out of range: "+this.pos+" + "+(writeLength||1)+" > "+this.len);
	}
	fixed32() {
		/* istanbul ignore if */
		if(this.pos+4>this.len)
			throw this.indexOutOfRange(4);

		return this.readFixed32_end(this.buf,this.pos+=4);
	}
	/** @returns {[number,number]} */
	read_field_description() {
		let cur_byte=this.uint32();
		return [cur_byte&7,cur_byte>>>3];
	}
	log_range_error=false;
	/** @arg {number} fieldId @arg {number} wireType */
	skipTypeEx(fieldId,wireType) {
		if(this.noisy_log_level) console.log("[skip] pos=%o",this.pos);
		let pos_start=this.pos;
		/** @type {DecTypeNum[]} */
		let first_num=[];
		switch(wireType) {
			case 0:
				/** @type {[boolean,bigint,number]} */
				let revert_res=this.revert_to(pos_start,() => {
					try {
						let u64=this.uint64();
						return [true,u64,this.pos];
					} catch {}
					return [false,0n,this.pos];
				});
				let num32=null;
				x: try {
					num32=this.uint32();
				} catch {
					if(revert_res[0]) break x;
					this.failed=true;
					first_num.push(["error"]);
					break;
				}
				let [success_64,num64,new_pos]=revert_res;
				if(success_64&&num32===null) {
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else if(num32===null) {
					this.failed=true;
					first_num.push(["error"]);
				} else if(success_64&&num64!==BigInt(num32)) {
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else {
					first_num.push(["data32",fieldId,num32]);
				}
				if(this.noisy_log_level) console.log("\"field %o: VarInt\": %o",fieldId,first_num[0][1]);
				break;
			case 1:
				first_num.push(["data_fixed64",fieldId,this.fixed64()]);
				break;
			case 2: {
				let size=this.uint32();
				if(this.pos+size>this.cur_len) {
					if(this.log_range_error) console.log("range error at",this.pos,fieldId,"size is too big",size);
					first_num.push(["error"]);
					this.failed=true;
					break;
				}
				let sub_buffer=this.buf.subarray(this.pos,this.pos+size);
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",this.pos,fieldId);
					first_num.push(["error"]);
					this.failed=true;
				}
				first_num.push(['child',fieldId,sub_buffer]);
			} break;
			case 3: {
				let res;
				while((wireType=(res=this.uint32())&7)!==4) {
					let skip_res=this.skipTypeEx(res>>>3,wireType);
					first_num.push(["group",skip_res]);
				}
			} break;
			case 4: {
				first_num.push(["error"]);
				this.failed=true;
			} break;
			case 5: first_num.push(["data_fixed32",fieldId,this.fixed32()]); break;
			default: break;
		}
		return first_num;
	}
}
const base64_dec=new Base64Binary();
/** @arg {string} str */
function decode_b64_proto_obj(str) {
	let buffer=base64_dec.decodeByteArray(str);
	let reader=new MyReader(buffer);
	return reader.try_read_any();
}
/** @arg {string} x */
function decode_url_b64(x) {
	x=x.replaceAll("_","/").replaceAll("-","+");
	return base64_dec.decodeByteArray(x);
}
/** @arg {string} x */
function decode_url_b64_proto_obj(x) {
	x=x.replaceAll("_","/").replaceAll("-","+");
	let ba=base64_dec.decodeByteArray(x);
	let reader=new MyReader(ba);
	return reader.try_read_any();
}
/** @template T @arg {T|undefined} val @returns {T} */
function non_null(val) {
	if(val===void 0) throw new Error();
	return val;
}
/** @template {string} T @arg {T} str @returns {UrlParse<T>} */
function create_from_parse(str) {
	let s=new URL(str);
	/** @type {any} */
	let a=s;
	/** @type {UrlParse<T>} */
	let ret=a;
	return ret;
}
class FilterHandlers {
	/** @arg {ResolverT<Services,ServiceOptions>} res */
	constructor(res) {
		this.handle_types=new HandleTypes(res);
		this.filter_handler_debug=false;
		this.handlers={
			rich_grid: new HandleRichGridRenderer,
			renderer_content_item_array: new HandleRendererContentItemArray,
		};
		this.iteration=new IterateApiResultBase(new YtIterateTarget);
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
			["continuationItemRenderer",false],
			["gridRenderer",false],
			["messageRenderer",false],
			["playlistRenderer",false],
			["playlistVideoListRenderer",false],
			["promotedSparklesWebRenderer",true/*promoted sparkles web (is_ads=true)*/],
			["radioRenderer",false],
			["recognitionShelfRenderer",false],
			["reelShelfRenderer",false],
			["searchPyvRenderer",true/*ads in search (is_ads=true)*/],
			["shelfRenderer",false],
			["shelfRenderer",false],
			["videoRenderer",false],
		]);
		let t=this;
		/** @arg {string} value */
		function whitelist_item(value) {
			t.blacklisted_item_sections.set(value,false);
		}
		whitelist_item("pageIntroductionRenderer");
		whitelist_item("settingsOptionsRenderer");
		whitelist_item("connectedAppRenderer");
	}
	/** @arg {ApiUrlFormatFull} x */
	use_template_url(x) {
		const res_parse=create_from_parse(x);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",x,res_parse);
			throw new Error("unreachable");
		}
		let path_parts=split_string(split_string_once(res_parse.pathname,"/")[1],"/");
		return this.handle_types.x.get("string_parser").get_url_type(path_parts);
	}
	/** @arg {Extract<Split<UrlTypes, ".">,[any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_length_1(target,x) {
		switch(target[0]) {
			default: debugger; break;
			case "browse": return {
				type: target[0],
				/** @type {BrowseResponseContent} */
				data: cast_as(x),
			};
			case "feedback": debugger; return {
				type: target[0],
				/** @type {JsonFeedbackData} */
				data: cast_as(x),
			};
			case "getDatasyncIdsEndpoint": return {
				type: target[0],
				/** @type {DatasyncIdsResponse} */
				data: cast_as(x),
			};
			case "getAccountSwitcherEndpoint": return {
				type: target[0],
				/** @type {GetAccountSwitcherEndpointResult} */
				data: cast_as(x),
			};
			case "get_transcript": return {
				type: target[0],
				/** @type {JsonGetTranscriptData} */
				data: cast_as(x),
			};
			case "guide": return {
				type: target[0],
				/** @type {GuideJsonType} */
				data: cast_as(x),
			};
			case "next": return {
				type: target[0],
				/** @type {YtApiNext} */
				data: cast_as(x),
			};
			case "player": return {
				type: target[0],
				/** @type {PlayerResponse} */
				data: cast_as(x),
			};
		}
		return null;
	}
	/** @arg {Extract<Split<UrlTypes, ".">,[any,any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_length_2(target,x) {
		switch(target[0]) {
			default: debugger; break;
			case "like": return this.convert_like(target,x);
			case "account": return this.convert_account(target,x);
			case "att": return this.convert_res_att(target,x);
			case "live_chat": return this.convert_live_chat(target,x);
			case "notification": return this.convert_notification(target,x)??null;
			case "reel": return this.convert_reel(target,x)??null;
		}
		return null;
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["reel",any]>} target @arg {{}} x @returns {ResponseTypes|void} */
	convert_reel(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "reel_item_watch": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {ReelItemWatch} */
				data: cast_as(x),
			};
			case "reel_watch_sequence": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {ReelWatchSequence} */
				data: cast_as(x),
			};
		}
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["notification",any]>} target @arg {{}} x @returns {ResponseTypes|void} */
	convert_notification(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get_notification_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {GetNotificationMenuJson} */
				data: cast_as(x),
			};
			case "get_unseen_count": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {NotificationGetUnseenCount} */
				data: cast_as(x),
			};
			case "record_interactions": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {YtSuccessResponse} */
				data: cast_as(x),
			};
		}
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["live_chat",any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_live_chat(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get_live_chat_replay": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {GetLiveChatReplay} */
				data: cast_as(x),
			};
		}
		return null;
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["att",any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_res_att(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {AttGet} */
				data: cast_as(x),
			};
		}
		return null;
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["account",any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_account(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "account_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {AccountMenuJson} */
				data: cast_as(x),
			};
			case "accounts_list": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {AccountsListResponse} */
				data: cast_as(x),
			};
			case "set_setting": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {AccountSetSetting} */
				data: cast_as(x),
			};
		}
		return null;
	}
	/** @arg {Extract<Split<UrlTypes, ".">,["like",any]>} target @arg {{}} x @returns {ResponseTypes|null} */
	convert_like(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "like": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {ResponseWithActions} */
				data: cast_as(x),
			};
			case "removelike": return {
				type: `${target[0]}.${target[1]}`,
				/** @type {ResponseWithActions} */
				data: cast_as(x),
			};
		}
		return null;
	}
	/** @arg {UrlTypes} url_type @arg {{}} x @returns {ResponseTypes} */
	get_res_data(url_type,x) {
		/** @type {Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		/** @type {ResponseTypes|null} */
		let res=null;
		switch(target.length) {
			default: debugger; break;
			case 1: res=this.convert_length_1(target,x); break;
			case 2: res=this.convert_length_2(target,x); break;
		}
		if(res) return res;
		console.log("[log_get_res_data]",target,x);
		debugger;
		return {
			_tag: "_Generic",
			type: "_Generic",
			data: x,
		};
	}
	/** @arg {string|URL|Request} request @arg {{}} data */
	on_handle_api(request,data) {
		/** @arg {string|URL|Request} req */
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
		/** @type {ApiUrlFormatFull} */
		let api_url=as_cast(parsed_url.href);
		let url_type=this.use_template_url(api_url);
		if(!url_type) {
			debugger;
			/** @type {UrlTypes} */
			let url_h=as_cast(parsed_url.href);
			url_type=url_h;
		}
		if(!url_type) throw new Error("Unreachable");
		this.handle_any_data(url_type,data);
		let res=this.get_res_data(url_type,data);
		this.handle_types.ResponseTypes(res);
		this.iteration.default_iter({t: this,path: url_type},data);
	}
	/** @arg {UrlTypes|`page_type_${NavigateEventDetail["pageType"]}`} path @arg {SavedDataItem} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @type {AnySavedData} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,channel,playlist",",");
	/** @arg {[()=>NavigateEventDetail['response'], object, []]} apply_args */
	on_initial_data(apply_args) {
		/** @type {NavigateEventDetail['response']} */
		let ret=Reflect.apply(...apply_args);
		if(!("page" in ret)) {
			return ret;
		}
		if(!ret.response) {
			console.log("[unhandled_return_value]",ret);
			debugger;
		}
		if(is_yt_debug_enabled) console.log("[initial_data]",ret);
		page_type_iter(ret.page);
		this.handle_any_data(`page_type_${ret.page}`,cast_as(ret));
		this.handle_types.DataResponsePageType(ret);
		this.iteration.default_iter({t: this,path: ret.page},ret);
		let page_type=window.ytPageType;
		if(!page_type) {
			debugger;
			return ret;
		}
		/** @template {U[]} T @template U @arg {T} a @arg {U} t */
		function includes(a,t) {
			return a.includes(t);
		}
		if(!includes(this.known_page_types,page_type)) {
			console.log("unknown page type",page_type);
			debugger;
		}
		return ret;
	}
	/** @arg {NavigateEventDetail} detail */
	on_page_type_changed(detail) {
		this.handle_types.YtPageState(detail);
	}

}
/** @type {any[]} */
let blob_create_args_arr=[];
let leftover_args=[];
let plr_raw_replace_debug=true;
function plr_raw_replace(/** @type {{ args: { raw_player_response: any; }; }} */ player_config) {
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
/** @type {any[]} */
let mk_tree_arr=[];
function act_found_create_yt_player(/** @type {{ data: { type: string; data: [any, any, any]; }; }} */ event) {
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
		/** @type {{[str:string]:any}} */
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
/** @arg {{ value?: any; value_tr?: any; value_of?: any; noisy_flag?: any; }} cc @arg {string} ms @arg {{}} obj @arg {string} [mc] */
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
	throw 1;
}
let win_watch=new OnWindowProperty;
/** @arg {any} val @arg {MKState} cc */
function new_pv_fn(val,cc, /** @type {any[]} */ ...args) {
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
/** @arg {MKState} cc */
function on_mk_function_property(cc) {
	/** @this {{}} */
	function with_this(/** @type {any} */ ...args) {
		new_pv_fn(this,cc,...args);
	}
	cc.value=with_this;
	ud_func.add(cc.value);
}
const ghost_symbol=Symbol.for("ghost");
class WithGhostSymbol {
	/** @type {boolean|undefined} */
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
	/** @type {Function|null} */
	function_value=null;
	noisy=false;
}
/** @arg {MKState} cc @arg {{}} obj */
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
/** @arg {MKState} cc @arg {{}} obj */
function on_mk_property_set(cc,obj) {
	if(ud_func.has(obj)) cc.value=obj;
	if(any_c(obj,WithGhostSymbol)[ghost_symbol]===undefined) {
		on_mk_new_property(cc,obj);
	} else {
		cc.value=obj;
	}
}
/** @arg {MKState} cc */
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

class CustomEventTarget {
	/** @type {{[str: string]:?(<T extends CustomEventTarget>(this:T, event: CustomEventType) => void)[]}} */
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
	/** @type {Set<MessagePort>} */
	wait_ports=new Set;
	/** @type {Map<MessagePort,ResState[]>} */
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
			let state={
				active: true,
				resolver,
			};
			if(this.port_to_resolvers_map.has(port)) {
				if(this.port_to_resolvers_map.has(port)) this.port_to_resolvers_map.get(port)?.push(state);
			} else {
				this.port_to_resolvers_map.set(port,[state]);
			}
		});
	}
	trace=false;
	/** @arg {MessagePort} port @arg {number} count */
	next_tick_action(port,count) {
		if(this.trace) console.log("tick_trace",count);
		// port.postMessage() -> on_port_message;
		port.postMessage(count);
	}
}
let dom_observer=new DomObserver;


class YtdPageManagerElement extends HTMLElement {
	/** @returns {YtCurrentPage|undefined} */
	getCurrentPage() {throw 1;}
}

/** @type {string[]} */
let playlist_arr=[];
/** @type {YtdPageManagerElement|null} */
let ytd_page_manager=null;

function has_ytd_page_mgr() {
	return ytd_page_manager!==null;
}

/** @arg {HTMLElement} element */
function on_ytd_page_manager(element) {
	const element_id="ytd-page-manager";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_page_manager=any_c(element,YtdPageManagerElement);
	window.ytd_page_manager=element;
}
/** @type {HTMLElement|null} */
let ytd_watch_flexy=null;
/** @arg {HTMLElement} element */
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
/** @type {string[]} */
let page_type_changes=[];
function is_watch_page_active() {
	if(!ytd_page_manager?.getCurrentPage()) {
		return false;
	}
	return ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()==="ytd-watch-flexy";
}
/** @arg {Node} value */
function as_node(value) {
	return value;
}
function page_changed_next_frame() {
	if(!plugin_overlay_element) return;
	if(!ytd_page_manager) return;
	ytd_page_manager.getCurrentPage()?.append(as_node(plugin_overlay_element));
}

/** @type {Map<string, HTMLElement>} */
let element_map=new Map;
/** @type {Map<string, HTMLVideoElementArrayBox>} */
let box_map=new Map;
/** @type {YtdPlayerElement|null} */
let ytd_player=null;
/** @arg {HTMLElement} element */
function on_ytd_player(element) {
	const element_id="ytd-player";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	/** @type {any} */
	let element_any=element;
	/** @type {YtdPlayerElement} */
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
		/** @type {any} */
		let ret=value;
		return ret;
	}
	/** @type {NavigateEventDetail} */
	detail=cast_as({});
}

/** @type {((event:YTNavigateFinishEvent)=>void)[]} */
let on_yt_navigate_finish=[];

/** @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
function eq_keys(src,target) {
	if(src.length!==target.length) return false;
	for(let i=0;i<src.length;i++) {
		let a=src[i];
		if(!target.includes(a)) return false;
	}
	return true;
}
/** @type {<T extends string[],U extends string[]>(k:string[] extends T?never:T,r:U)=>Exclude<T[number],U[number]>[]} */
function filter_out_keys(keys,to_remove) {
	to_remove=cast_as(to_remove.slice());
	/** @type {Exclude<typeof keys[number],typeof to_remove[number]>[]} */
	let ok_e=[];
	for(let i=0;i<keys.length;i++) {
		if(to_remove.includes(keys[i])) {
			let rm_i=to_remove.indexOf(keys[i]);
			to_remove.splice(rm_i,1);
			continue;
		}
		ok_e.push(cast_as(keys[i]));
	}
	return ok_e;
}
/** @arg {NavigateEventDetail["pageType"]} pageType */
function page_type_iter(pageType) {
	switch(pageType) {
		case "browse": case "channel": break;
		case "playlist": case "settings": break;
		case "shorts": case "watch": break;
		case "search": break;
		default: console.log("[%s]",pageType); debugger;
	}
}

let vis_imm=false;
let css_str=`
	ytd-watch-next-secondary-results-renderer {
		overflow-x:scroll;
		height:80vh;
	}
	/*# sourceURL=yt_css_user */
`;
/** @arg {string} css_content */
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

with_ytd_scope();

/** @arg {HTMLCollectionOf<HTMLElement>} element_list @arg {HTMLVideoElementArrayBox} list_box */
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

/** @type {HTMLElement|null} */
let yt_playlist_manager=null;
/** @arg {HTMLElement} element */
function on_yt_playlist_manager(element) {
	const element_id="yt-playlist-manager";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	yt_playlist_manager=element;
	window.yt_playlist_manager=element;
}

/** @arg {number} value @returns {ReturnType<typeof setTimeout>} */
function as_timeout_type(value) {
	/** @type {any} */
	let value_any=value;
	return value_any;
}

/** @type {[number, number][]} */
let port_state_log=[];
class MessagePortState {
	/** @type {ReturnType<typeof setTimeout>} */
	cint=as_timeout_type(-1);
	port_state_log=port_state_log;
	time_offset=performance.now();
	/** @readonly */
	current_event_type="async-plugin-init";
}
let port_state=new MessagePortState;

let slow_message_event=false;
const message_channel_loop_delay=80;
/** @arg {MessageEvent<number>} event */
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

/** @template T,U */
class Future {
	/** @arg {HiddenData<T>} v @arg {(x:T)=>U} f */
	constructor(v,f) {
		this.v=v;
		this.f=f;
	}
	/** @template V @arg {(x:U)=>V} f */
	run_with(f) {
		let res=this.v.extract(e => {
			let inner=this.f(e);
			f(inner);
			return true;
		});
		if(res===null) return false;
		return res;
	}
}

/** @arg {HiddenData<FilterHandlers>} yt_handlers */
function start_message_channel_loop(yt_handlers) {
	message_channel=new MessageChannel();
	message_channel.port2.onmessage=on_port_message;
	if(top===window) {
		const handle_types_fut=new Future(yt_handlers,v => v.handle_types);
		if(typeof exports==="object") exports.handle_types_fut=handle_types_fut;
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {handle_types_fut},
			port: message_channel.port1,
		});
	}
}

/** @arg {Document|Element} node @arg {string} child_node_tag_name */
function get_html_elements(node,child_node_tag_name) {
	return node.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",child_node_tag_name);
}


/** @type {((event:{})=>void)[]} */
var on_yt_navigate=[];
async function wait_for_yt_player() {
	if(!ytd_player) {
		throw new Error("No ytd_player to await");
	}
	await ytd_player.playerResolver_.promise;
}
/** @arg {HTMLElement} element */
function sumOffset(element) {
	let cache={
		top_offset: 0,
		left_offset: 0
	};
	/** @type {HTMLElement|null} */
	let cur_element=null;
	cur_element=element;
	for(;;) {
		cache.top_offset+=cur_element.offsetTop;
		cache.left_offset+=cur_element.offsetLeft;
		/** @type {Element|null} */
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
overlay_content_div.style.userSelect="all";
overlay_content_div.style.width="max-content";

let input_modify_css_style=document.createElement("div");
input_modify_css_style.style.float="left";
input_modify_css_style.innerHTML="C";
input_modify_css_style.onclick=ui_css_toggle_click_handler;
let overlay_hide_ui_input=document.createElement("div");
overlay_hide_ui_input.style.float="left";
overlay_hide_ui_input.style.clear="left";
overlay_hide_ui_input.innerHTML="H";
overlay_hide_ui_input.onclick=title_display_toggle;
let plugin_overlay_element=document.createElement("div");
plugin_overlay_element.id="mz_overlay";
plugin_overlay_element.append(overlay_content_div);
plugin_overlay_element.append(input_modify_css_style);
plugin_overlay_element.append(overlay_hide_ui_input);
plugin_overlay_element.setAttribute("style",player_overlay_style_str);
function fix_offset() {
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
		overlay_hide_ui_input.style.color='';
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
/** @type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}} */
function is_yt_fullscreen_change_action(detail) {
	return detail.actionName==="yt-fullscreen-change-action";
}
/** @arg {CustomEvent<{actionName:"yt-fullscreen-change-action", args:[boolean]}>|CustomEvent<{actionName:string}>} event */
function on_yt_action(event) {
	let {detail}=event;
	if(is_yt_fullscreen_change_action(detail)) {
		let {args}=detail;
		fix_offset();
		setTimeout(fix_offset);
		title_text_overlay_enabled=!args[0];
		title_text_overlay_update();
	}
}
document.addEventListener("yt-action",cast_as(on_yt_action));

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
	/** @type {(HTMLVideoElement|HTMLAudioElement)[]} */
	attached_element_list=[];
	/** @type {MediaElementAudioSourceNode[]} */
	media_element_source_list=[];
	/** @type {Event|null} */
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
	/** @arg {AudioNode[]} node_chain */
	init_node_chain(node_chain) {
		for(let i=0;i<node_chain.length-1;i++) {
			node_chain[i].connect(node_chain[i+1]);
		}
	}
	/** @arg {DynamicsCompressorNode} node */
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
/** @type {AudioGainController|null} */
let audio_gain_controller=new AudioGainController;

/** @template {string} T @template {{}} U @template {Split<T, ",">} C @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}} @type {__ia_excludeKeysS} */
Object.__ia_excludeKeysS=function(/** @type {{ [s: string]: any; }|ArrayLike<any>} */ target,/** @type {string} */ ex_keys_str) {
	/** @type {any} */
	let ex_keys_any=ex_keys_str.split(",");
	/** @type {C} */
	let ex_keys=ex_keys_any;
	/** @type {C[number]} */
	var key;
	var rest,i=0,
		obj=Object.fromEntries(Object.entries(target));
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
	/** @type {any} */
	let res_any=obj;
	/** @type {{[I in Exclude<keyof U,C[number]>]:U[I]}} */
	let res=res_any;
	return res;
};

let volume_plugin_style_element=createStyleElement(volume_plugin_style_source);
/** @template T,U */
class ServiceResolver {
	/** @type {T|null} */
	services=null;
	/** @type {U|null} */
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
	/** @template {keyof T} V @arg {V} key */
	get(key) {
		if(!this.services) throw new Error("No services");
		return this.services[key];
	}
}

/** @template T */
class HiddenData {
	#value;
	/** @arg {T} value */
	constructor(value) {
		this.#value=value;
	}
	/** @template U @arg {(v:T)=>U|null} v */
	extract(v) {
		try {
			return v(this.#value);
		} catch(e) {
			console.log("target error");
			console.log(e);
			return null;
		}
	}
	/** @template U @arg {(v:T)=>U} v @arg {()=>U} def */
	extract_default(v,def) {
		try {
			return v(this.#value);
		} catch(e) {
			console.log("target error");
			console.log(e);
			return def();
		}
	}
}
function get_exports() {
	return exports;
}
//#region
function main() {
	const log_enabled_page_type_change=false;
	/** @arg {YTNavigateFinishEvent} event */
	function log_page_type_change(event) {
		let {detail}=event;
		if(!detail) return;
		yt_handlers.extract(h => h.on_page_type_changed(detail));
		if(!ytd_page_manager) {
			const target_element=get_html_elements(document,"ytd-page-manager")[0];
			if(!target_element) {
				throw new Error("Missing ytd_page_manager");
			} else {
				on_ytd_page_manager(target_element);
			}
		}
		if(!ytd_page_manager) throw new Error("Invalid state");
		let page_manager_current_tag_name=ytd_page_manager.getCurrentPage()?.tagName.toLowerCase();
		let nav_load_str=`page_type_change: {current_page_element_tagName: "${page_manager_current_tag_name}", pageType: "${detail.pageType}"}`;
		if(nav_load_str===current_page_type) return;
		current_page_type=nav_load_str;
		page_type_changes.push(nav_load_str);
		if(log_enabled_page_type_change) console.log(nav_load_str);
	}
	/** @type {ResolverT<Services,ServiceOptions>} */
	const resolver_value={value: null};
	const services=new Services(resolver_value);
	const yt_handlers=services.yt_handlers;
	const yt_plugin=new YtPlugin;
	const log_tracking_params=false;
	const log_click_tracking_params=false;

	// init section
	const service_resolver=new ServiceResolver(services,{
		log_tracking_params,
		log_click_tracking_params,
		noisy_logging: false,
	});
	if(typeof exports==="object") {
		let exports=get_exports();
		exports.Services=Services;
		exports.YtUrlParser=YtUrlParser;
	}
	resolver_value.value=service_resolver;
	yt_plugin.init();
	yt_plugin.set_yt_handlers(yt_handlers);
	let current_page_type="";
	on_yt_navigate_finish.push(log_page_type_change);

	// modify global section
	window.yt_plugin=yt_plugin;
	override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
	/** @type {typeof fetch|null} */
	let original_fetch=null;
	fetch_inject.__proxy_target__=window.fetch;
	modify_global_env();

	// wait for plugin requirements
	start_message_channel_loop(yt_handlers);
	return;
	// #region hoisted functions below
	/** @arg {string|URL|Request} request @arg {JsonDataResponseType} response_obj */
	function fetch_filter_text_then_data_url(request,response_obj) {
		yt_handlers.extract(h => h.on_handle_api(request,response_obj));
	}
	/** @arg {string|URL|Request} request @arg {{}|undefined} options @arg {((arg0: any) => any)|undefined|null} onfulfilled @arg {((arg0: any) => void)|undefined|null} on_rejected @arg {string} response_text */
	function handle_json_parse(request,options,onfulfilled,on_rejected,response_text) {
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
				fetch_filter_text_then_data_url(request,obj);
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
	/** @arg {string|URL|Request} request @arg {{}|undefined} options @arg {((value: any) => any|PromiseLike<any>)|undefined|null} onfulfilled @arg {((reason: any) => any|PromiseLike<any>)|undefined|null} onrejected */
	function bind_promise_handler(request,options,onfulfilled,onrejected) {
		if(is_yt_debug_enabled) console.log("handle_json_parse.bind()");
		let ret=handle_json_parse.bind(null,request,options,onfulfilled,onrejected);
		return ret;
	}
	/** @arg {string|URL|Request} request @arg {{}|undefined} options @arg {Promise<any>} ov @return {Promise<any>} */
	function handle_fetch_response_2(request,options,ov) {
		return {
			/** @type {<T, TResult2 = never>(onfulfilled?: ((value: T) => T|PromiseLike<T>)|undefined|null, onrejected?: ((reason: any) => TResult2|PromiseLike<TResult2>)|undefined|null)=>Promise<T|TResult2>} */
			then(onfulfilled,onrejected) {
				return ov.then(bind_promise_handler(request,options,onfulfilled,onrejected));
			},
			/** @type {<TResult = never>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined) => Promise<any>} */
			catch(onrejected) {
				return ov.catch(onrejected);
			},
			finally(onfinally) {
				return ov.finally(onfinally);
			},
			[Symbol.toStringTag]: "Promise",
		};
	}
	/** @arg {string|URL|Request} request @arg {{}|undefined} options @arg {Response} response @returns {Response} */
	function fetch_promise_handler(request,options,response) {
		class FakeResponse {
			text() {
				if(is_yt_debug_enabled) console.log("response.text()");
				return handle_fetch_response_2(request,options,response.text());
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
		/** @type {any} */
		let any_x=fake_res;
		/** @type {Response} */
		let fake_res_t=any_x;
		return new Proxy(fake_res_t,{
			/** @arg {keyof Response} key */
			get(_obj,key,_proxy) {
				/** @type {string} */
				let ks=cast_as(key);
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
	/** @arg {string|URL|Request} user_request @arg {RequestInit} [request_init] @returns {Promise<Response>} */
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
	/** @arg {[()=>BrowsePageResponse, object, []]} apply_args */
	function do_proxy_call_getInitialData(apply_args) {
		return yt_handlers.extract_default((h) => h.on_initial_data(apply_args),() => Reflect.apply(...apply_args));
	}
	function modify_global_env() {
		URL.createObjectURL=new Proxy(URL.createObjectURL,{
			/** @arg {typeof URL["createObjectURL"]} target
			 @arg {typeof URL} thisArg
			 @arg {[Blob|MediaSource]} args */
			apply(target,thisArg,args) {
				let [url_source,...rest]=args;
				if(rest.length>0) {
					leftover_args.push([target,thisArg,rest]);
				}
				blob_create_args_arr.push(url_source);
				let ret=Reflect.apply(target,thisArg,args);
				created_blobs.set(ret,url_source);
				active_blob_set.add(ret);
				return ret;
			}
		});
		URL.revokeObjectURL=new Proxy(URL.revokeObjectURL,{
			/** @arg {typeof URL["revokeObjectURL"]} target
			 @arg {typeof URL} thisArg
			 @arg {[string]} args */
			apply(target,thisArg,args) {
				let val=args[0];
				active_blob_set.delete(val);
				return Reflect.apply(target,thisArg,args);
			}
		});
		original_fetch=fetch;
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
	// #endregion
}
//#endregion
/** @template {string} C @template {string} U @template {Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {Split<C,","> extends U[]?C:never} arg1 */
function has_keys(ok_3,arg1) {
	return eq_keys(ok_3,arg1.split(","));
}
/** @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x,s=cast_as(",")) {
	if(!x) {debugger;}
	let r=x.split(s);
	return cast_as(r);
}
/** @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {SplitOnce<S,D>} */
function split_string_once(s,d=cast_as(",")) {
	if(s==="") {
		/** @type {[]} */
		let r=[];
		/** @type {any} */
		let q=r;
		return cast_as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @type {[S]} */
		let r=[s];
		/** @type {any} */
		let q=r;
		return cast_as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @type {[string,string]} */
	let r=[a,b];
	/** @type {any} */
	let q=r;
	return cast_as(q);
}
const seen_map=new Set;
const general_service_state={
	logged_in: false,
	/** @type {{datasyncId: (BigInt|null)[]}|null} */
	mainAppWebResponseContext: null,
	/** @type {number|null} */
	maxAgeSeconds: null,
	/** @type {"non_member"|null} */
	premium_membership: null,
};
// #region Service
class KnownDataSaver {
	constructor() {
		this.load_data();
		this.store_data();
	}
	/** @private @arg {string} str @returns {Partial<ReturnType<KnownDataSaver['pull_data_from_parent']>>} */
	parse_data(str) {
		return JSON.parse(str);
	}
	/** @private */
	store_data() {
		let data=this.pull_data_from_parent();
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
		this.save_local_storage(json_str);
	}
	/** @private */
	load_data() {
		if(this.loaded_from_storage) return;
		let json_str=this.get_local_storage();
		if(json_str) {
			let ret=this.parse_data(json_str);
			this.push_data_to_parent(ret);
			this.loaded_from_storage=true;
		}
	}
	/** @private */
	pull_data_from_parent() {
		const {
			seen_root_visual_elements,seen_strings,seen_booleans,
			seen_numbers
		}=this;
		return {
			seen_root_visual_elements,seen_strings,seen_numbers,
			seen_booleans,
		};
	}
	/** @private @arg {string} seen_data */
	save_local_storage(seen_data) {
		if(no_storage_access) {
			this.seen_data_json_str=seen_data;
			return;
		}
		localStorage.seen_data=seen_data;
	}
	/** @private */
	get_local_storage() {
		if(no_storage_access) return this.seen_data_json_str;
		return localStorage.getItem("seen_data");
	}
	/** @private @arg {Partial<ReturnType<KnownDataSaver['pull_data_from_parent']>>} x */
	push_data_to_parent(x) {
		const {
			seen_root_visual_elements,seen_strings,seen_booleans,
			seen_numbers,
		}=x;
		if(seen_root_visual_elements) {
			this.seen_root_visual_elements=seen_root_visual_elements;
		}
		if(seen_strings) {
			this.seen_strings=seen_strings;
		}
		if(seen_booleans) {
			this.seen_booleans=seen_booleans;
		}
		if(seen_numbers) {
			this.seen_numbers=seen_numbers;
		}
	}
	/** @private */
	delete_data() {
		if(no_storage_access) {
			this.seen_data_json_str=null;
			return;
		}
		localStorage.removeItem("seen_data");
	}
	/** @private @type {string|null} */
	seen_data_json_str=null;
	/** @private */
	loaded_from_storage=false;
	/** @protected @type {number[]} */
	seen_root_visual_elements=[];
	/** @protected @type {[string,['one',string[]]|['many',string[][]]][]} */
	seen_strings=[];
	/** @protected @type {[string,['one',number[]]|['many',number[][]]][]} */
	seen_numbers=[];
	/** @protected @type {[string,{t:boolean;f:boolean}][]} */
	seen_booleans=[];
	/** @protected */
	onDataChangeAction() {this.store_data();}
	/** @protected */
	onDataClearAction() {this.delete_data();}
}
class BaseServicePrivate extends KnownDataSaver {
	// #region Public
	/** @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		super();
		this.#x=x;
	}
	get x() {
		if(!this.#x.value) throw 1;
		return this.#x.value;
	}
	onDataChange() {
		this.onDataChangeAction();
	}
	/** @arg {string} key */
	delete_old_string_values(key) {
		let p=this.seen_strings.find(e => e[0]===key);
		if(!p) return;
		let [,cur]=p;
		/** @arg {["one", string[]]|["many", string[][]]} x */
		function to_obj(x) {return {key: x[0],values: x[1]};}
		let obj=to_obj(cur);
		switch(obj.key) {
			case "one": obj.values.length=0; break;
			case "many": throw new Error("Tried to delete key with many for each value");
		};
	}
	/** @private @type {[string,string|string[]][]} */
	new_strings=[];
	/** @arg {string} key @arg {string|string[]} x */
	save_string(key,x) {
		if(x===void 0) {
			debugger;
			return;
		}
		if(!(x instanceof Array)&&x.startsWith("http://www.youtube.com/channel/UC")) {
			if(this.log_skipped_strings) console.log("skip channel like",key,x);
			return;
		}
		let was_known=true;
		/** @type {["one", string[]]|["many",string[][]]} */
		let cur;
		let p=this.seen_strings.find(e => e[0]===key);
		if(!p) {
			p=[key,cur=['one',[]]];
			this.seen_strings.push(p);
		} else {
			cur=p[1];
		}
		if(x instanceof Array) {
			let target=p[1];
			if(target[0]==='one') {
				let inner=target[1].map(e => [e]);
				target=["many",inner];
				p[1]=target;
			}
			let found=target[1].find(e => eq_keys(e,x));
			if(!found) {
				was_known=false;
				target[1].push(x);
			}
		} else {
			if(cur[0]==='one') {
				if(!cur[1].includes(x)) {
					was_known=false;
					cur[1].push(x);
				}
			} else if(cur[0]==='many') {
				let res=cur[1].find(([e,...r]) => !r.length&&e===x);
				if(!res) {
					was_known=false;
					cur[1].push([x]);
				}
			}
		}
		if(was_known) return;
		this.new_strings.push([key,x]);
		this.onDataChange();
		console.log("store_str [%s] %o",key,x);
		debugger;
	}
	/** @private @type {[string,number|number[]][]} */
	new_numbers=[];
	/** @arg {string} key @arg {number|number[]} x */
	save_number(key,x) {
		if(x===void 0) {
			debugger;
			return;
		}
		let was_known=true;
		/** @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.seen_numbers.find(e => e[0]===key);
		if(!p) {
			cur=['one',[]];
			p=[key,cur];
			this.seen_numbers.push(p);
		} else {
			cur=p[1];
		}
		if(x instanceof Array) {
			let target=p[1];
			if(target[0]==='one') {
				let inner=target[1].map(e => [e]);
				target=["many",inner];
				p[1]=target;
			}
			let found=target[1].find(e => eq_keys(e,x));
			if(!found) {
				was_known=false;
				target[1].push(x);
			}
		} else {
			if(cur[0]==='one') {
				if(!cur[1].includes(x)) {
					was_known=false;
					cur[1].push(x);
				}
			} else if(cur[0]==='many') {
				let res=cur[1].find(([e,...r]) => !r.length&&e===x);
				if(!res) {
					was_known=false;
					cur[1].push([x]);
				}
			}
		}
		if(was_known) return;
		this.new_numbers.push([key,x]);
		this.onDataChange();
		console.log("store_num [%s]",key,x);
	}
	/** @private @type {[string,{t:boolean;f:boolean}][]} */
	new_booleans=[];
	/** @arg {string} key @arg {boolean} bool */
	save_boolean(key,bool) {
		let krc=this.seen_booleans.find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.seen_booleans.push(krc);
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
		this.new_booleans.push([key,kc]);
		this.onDataChange();
	}
	/** @private @type {number[]} */
	new_root_visual_elements=[];
	/** @arg {number} x */
	save_root_visual_element(x) {
		if(x===void 0) {
			debugger;
			return;
		}
		if(this.seen_root_visual_elements.includes(x)) return;
		console.log("store [root_visual_element]",x);
		this.seen_root_visual_elements.push(x);
		this.new_root_visual_elements.push(x);
		this.onDataChange();
	}
	// #endregion
	/** @private */
	log_skipped_strings=false;
	#x;
}
class BaseService extends BaseServicePrivate {
	/** @template {string} T @template {`${T}${"_"|"-"}${string}`} U @arg {T} ns @arg {U} s */
	save_enum(ns,s) {
		/** @type {"_"|"-"} */
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
		/** @type {SplitOnce<NonNullable<SplitOnce<U,T>[1]>,"">[1]} */
		let no_ns_part=nn[1];
		this.save_string(`${ns_name}::${ns}`,no_ns_part);
	}
	/** @protected @name iterate_obj @arg {{}|undefined} obj @arg {(k:string,v: {})=>void} fn */
	v(obj,fn) {
		if(obj===void 0) return;
		let arr=Object.entries(obj);
		this.z(arr,e => fn(e[0],e[1]));
	}
	/** @template {{}} T @arg {T|undefined} x @arg {(v:T[MaybeKeysArray<T>[number]],k: MaybeKeysArray<T>[number])=>void} y */
	w(x,y) {
		if(x===void 0) return;
		let keys=get_keys_of(x);
		if(keys.length===0) {
			debugger;
			return;
		}
		for(let k of keys) {
			y(x[k],k);
		}
	}
	// x is reserved for the first arg
	// y reserved for unpack target
	/** @protected @template U @arg {U[]|undefined} x @arg {(this:this,x:U,i:number)=>void} y  */
	z(x,y) {
		if(x===void 0) return;
		for(let it of x.entries()) {
			const [i,a]=it;
			y.call(this,a,i);
		}
	}
	/** @protected @template {{}} T @arg {{} extends T?MaybeKeysArray<T> extends []?T:never:never} x */
	empty_object(x) {
		let keys=get_keys_of(x);
		if(!keys.length) return;
		console.log("[empty_object] [%s]",keys.join());
		debugger;
	}
	g=this.empty_object;
	/** @protected @template {{}} T @arg {T} x */
	is_empty_object(x) {
		let keys=get_keys_of(x);
		if(!keys.length) return true;
		return false;
	}
	/** @template {{}} T @arg {string} k @arg {T} x */
	save_keys(k,x) {
		if(typeof x!=="object") {
			this.save_string(`${k}.type`,typeof x);
			return;
		}
		if(x instanceof Array) {
			this.save_string(`${k}.type`,"array");
			return;
		}
		let keys=get_keys_of(x);
		if(eq_keys(keys,["type","data"])) {
			debugger;
		}
		this.save_string(k,keys.join());
	}
}
class CsiService extends BaseService {
	data={
		/** @type {BrowseEndpointPages|null} */
		yt_fn: null,
		/** @type {"WEB"|null} */
		c: null,
		/** @type {CsiVarTypes['cver']|null} */
		cver: null,
		/** @type {"1"|null} */
		yt_li: null,
		/** @type {"1"|null} */
		yt_ad: null,
	};
	/** @type {(RidFormat<string>)[]} */
	rid_keys=[
		/* `Record${string}_rid` */"RecordNotificationInteractions_rid",
		// settings
		"SetSetting_rid",
		/* `Get${string}_rid` & settings*/"GetAccountMenu_rid","GetAccountSharing_rid","GetAccountNotifications_rid","GetAccountOverview_rid","GetAccountPlayback_rid","GetAccountPrivacy_rid","GetAccountBilling_rid","GetAccountAdvanced_rid",
		/* Notification */"GetNotificationsMenu_rid","GetUnseenNotificationCount_rid",
		/* one word after section */"GetHome_rid","GetPlayer_rid","GetPlaylist_rid","GetSubscriptions_rid",
		/* other*/"GetReelItemWatch_rid","GetWatchNext_rid","GetWebMainAppGuide_rid","GetWatchPageWebTopLevelComments_rid","GetAttestationChallenge_rid",
		/* destinations */ "GetGamingDestination_rid",
		"GetAccountsList_rid",
		/*reel_watch*/"GetReelWatchSequence_rid",
		"GetLibrary_rid","GetHistory_rid",
		/*`Remove${string}_rid`*/"RemoveLike_rid",
		"GetLiveChatReplay_rid",
		"GetAccountDownloads_rid",
	];
	/** @type {{[x: RidFormat<string>]: `0x${string}`|undefined;}} */
	rid={};
	/** @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		super(x);
		for(let x of this.rid_keys) {
			this.rid[x]=void 0;
		}
	}
	/** @arg {BrowseEndpointPages} value */
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
	/** @arg {CsiServiceParamsType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "c": {
					if(param.value!=="WEB") debugger;
					this.data[param.key]=param.value;
				} continue;
				case "cver": this.data[param.key]=param.value; continue;
				case "yt_li": {
					if(param.value!=="1") debugger;
					this.data[param.key]=param.value;
				} continue;
				case "yt_ad": if(param.value!=="1") debugger; this.data[param.key]=param.value; continue;
				case "yt_fn": if(!this.verify_param_yt_fn(param.value)) debugger; this.data[param.key]=param.value; continue;
			}
			/** @template {string} T @arg {T} x @returns {x is `${string}_rid`} */
			function get_ends_with(x) {x; return x.endsWith("_rid");}
			/** @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is `${U}${string}_rid`} */
			function get_starts_with(x,v) {x; return x.startsWith(v);}
			if(param.key in this.rid) {
				/** @type {RidFormat<string>} */
				let rid_key=param.key;
				this.rid[rid_key]=param.value;
				continue;
			} else if(get_ends_with(param.key)) {
				if(get_starts_with(param.key,"Get")) {
					console.log("[new_get_rid][%s][%s]",param.key,param.value);
					param.key;
				} else if(get_starts_with(param.key,"Record")) {
					console.log("[new_record_rid][%s][%s]",param.key,param.value);
				} else if(get_starts_with(param.key,"Set")) {
					console.log("[new_set_rid][%s][%s]",param.key,param.value);
				} else {
					console.log("[new_rid_section][%s]",param.key);
				}
				this.rid[param.key]=param.value;
				continue;
			} else {
				console.log("new csi param",param);
			}
			console.log("new csi param",param); debugger;
		}
	}
}
class ECatcherService extends BaseService {
	data={
		/** @type {{name: "WEB";fexp:number[];version: SomeVer<CsiVarTypes['cver']>}|null} */
		client: null,
		expected_client_values: {
			/** @type {number[]} */
			fexp: [
				[1714247,9405964,23804281,23882502,23918597,23934970,23946420,23966208,23983296,23986033,23998056,24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738,24108447,24120820,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24181174,24187043,24187377,24211178,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24290971,24291857,24292955,24390675,24396645,24404640,24406313,24406621,24414718,24415864,24415866,24416290,24429095,24433679,24436009,24437575,24438162,24438848,24439361,24439483,24441244,39322504,39322574],
				[39322873,39322983,39323013,39323020,39323120,45686551],
				[24591046,24197450,24590921,24402891,24217535],
				[39323016,39323023,39323117],
				[24440901,24443373],
				[24401504,24422508],
				[24442137],
				[24447336],
			].flat(),
		},
	};
	/** @type {number[]} */
	seen_new_expected=[];
	/** @arg {number[]} x */
	iterate_fexp(x) {
		let expected=this.data.expected_client_values.fexp;
		/** @type {number[]} */
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
	/** @arg {ECatcherServiceParams['params']} params */
	on_params(params) {
		/** @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params) {
			switch(param.key) {
				case "client.version": {
					if(param.value!=="2.20230104") {debugger; break;};
					new_client.version=param.value;
				} break;
				case "client.name": if(param.value==="WEB") new_client.name=param.value; else debugger; break;
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
	/** @arg {NonNullable<this["data"]["client"]>} client */
	update_client(client) {
		this.data.client=client;
	}
}
class GFeedbackService extends BaseService {
	data={
		/** @type {number[]|null} */
		e: null,
		/** @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
		/** @type {GFeedbackServiceRouteParam['value']|null} */
		route: null,
	};
	get handle_types() {
		let res=this.x.get("yt_handlers").extract(e => e)?.handle_types;
		if(!res) throw new Error();
		return res;
	}
	/** @arg {Extract<ToServiceParams<GFeedbackVarMap>[number],{key:"e"}>} param */
	parse_e_param(param) {
		return param.value.split(",").map(e => parseInt(e,10));
	}
	/** @arg {ServiceContextStore} data_target @arg {NonNullable<ServiceContextStore['context']>} x */
	on_context_param(data_target,x) {
		data_target.context=x;
		switch(x) {
			case "yt_web_search": return;
			case "yt_web_unknown_form_factor_kevlar_w2w": return;
			default:
		}
		switch(x) {
			case "": break;
			default: debugger; break;
		}
	}
	/** @arg {GFeedbackServiceParamsType} params */
	on_params(params) {
		let parsed_e=null;
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.handle_types.parse_browse_id(param.value); break;
				case "context": this.on_context_param(this.data,param.value); break;
				case "e": parsed_e=this.data.e=this.parse_e_param(param); break;
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
			if(parsed_e) this.maybe_new_e();
		}
	}
	/** @arg {GFeedbackServiceRouteParam} x */
	parse_route_param(x) {
		let h=this.x.get("string_parser");
		this.data.route=x.value;
		let route_parts=split_string(x.value,".");
		switch(route_parts[0]) {
			case "channel": h.parse_channel_section(route_parts[1]); break;
			default: debugger;
		}
	}
	maybe_new_e() {
		if(!this.data.e) return;
		this.x.get("e_catcher_service").iterate_fexp(this.data.e);
	}
}
class GuidedHelpService extends BaseService {
	data={
		/** @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @arg {GuidedHelpServiceParams['params']} params */
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
class TrackingServices extends BaseService {
	/** @arg {CsiServiceParams} service */
	on_csi_service(service) {
		this.x.get("csi_service").on_params(service.params);
	}
	/** @arg {ECatcherServiceParams} service */
	on_e_catcher_service(service) {
		this.x.get("e_catcher_service").on_params(service.params);
	}
	/** @arg {GFeedbackServiceParams} service */
	on_g_feedback_service(service) {
		this.x.get("g_feedback_service").on_params(service.params);
	}
	/** @arg {GuidedHelpServiceParams} service */
	on_guided_help_service(service) {
		this.x.get("guided_help_service").on_params(service.params);
	}
	get handle_types() {
		let res=this.x.get("yt_handlers").extract(e => e)?.handle_types;
		if(!res) throw new Error();
		return res;
	}
	/** @arg {GoogleHelpServiceParams} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.handle_types.parse_browse_id(param.value); break;
				default: console.log("[new_param_key]",param); debugger;
			}
		}
	}
	/** @arg {AllServiceTrackingParams} service_arg */
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
	on_complete_set_service_params() {
		seen_map.clear();
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
		this.string_parser=new YtUrlParser(x);
		this.yt_handlers=new HiddenData(new FilterHandlers(x));
	}
}
//#endregion Service
//#region decode_entity_key
/** @name Ys */
class ServiceArrayViewType {
	/** @arg {Uint8Array[]} v */
	constructor(v) {
		this.arrays=v;
		this.arrayIdx=0;
		this.arrayPos=0;
		this.totalLength=0;
		v.forEach(c => this.append(c));
	}
	/** @arg {number} a */
	isFocused(a) {
		return a>=this.arrayPos&&a<this.arrayPos+this.arrays[this.arrayIdx].length;
	}
	/** @arg {number} a */
	focus(a) {
		if(!this.isFocused(a))
			for(a<this.arrayPos&&(this.arrayPos=this.arrayIdx=0);this.arrayPos+this.arrays[this.arrayIdx].length<=a&&this.arrayIdx<this.arrays.length;)
				this.arrayPos+=this.arrays[this.arrayIdx].length,
					this.arrayIdx+=1;
	}
	/** @arg {Uint8Array} a */
	append(a) {
		/** @type {boolean|Uint8Array} */
		var b=0===this.arrays.length? !1:(b=this.arrays[this.arrays.length-1])&&b.buffer===a.buffer&&b.byteOffset+b.length===a.byteOffset;
		b? (b=this.arrays[this.arrays.length-1],
			this.arrays[this.arrays.length-1]=new Uint8Array(b.buffer,b.byteOffset,b.length+a.length),
			this.arrayPos=this.arrayIdx=0):this.arrays.push(a);
		this.totalLength+=a.length;
	}
}
/** @name OUa */
class EntityKeyReader {
	/** @arg {ServiceArrayViewType} v */
	constructor(v) {
		this.arrayView=v;
		this.pos=0;
		this.pendingTagAndType=-1;
	}
}
/** @arg {ServiceArrayViewType} a @arg {number} b */
function IUa(a,b) {
	a.focus(b);
	return a.arrays[a.arrayIdx][b-a.arrayPos];
}
/** @arg {EntityKeyReader} a */
function Zs(a) {
	var b=IUa(a.arrayView,a.pos);
	++a.pos;
	if(128>b)
		return b;
	for(var c=b&127,d=1;128<=b;)
		b=IUa(a.arrayView,a.pos),
			++a.pos,
			d*=128,
			c+=(b&127)*d;
	return c;
}
/** @arg {string} x @name Rd */
function base64_to_array(x) {
	return base64_dec.decodeByteArray(x);
}
const decoder=new TextDecoder();
/** @type {lua_strs} */
const lua_strs=["AUTO_CHAPTERS","HEATSEEKER","DESCRIPTION_CHAPTERS","topbar"];
/** @arg {BufferSource} x */
function LUa(x) {
	let res=decoder.decode(x);
	if(!is_in_arr(lua_strs,res)) {
		console.log("[new_lua_str] [%s]",res);
		lua_strs.push(as_cast(res));
	}
	if(!is_in_arr(lua_strs,res)) throw 1;
	return res;
}
/** @template {any[]} T @arg {T} arr @arg {string} x @returns {x is T[number]} */
function is_in_arr(arr,x) {
	return arr.includes(x);
}
/** @arg {EntityKeyReader} a @arg {number} b */
function PUa(a,b) {
	var c=a.pendingTagAndType;
	for(a.pendingTagAndType=-1;a.pos+1<=a.arrayView.totalLength;) {
		0>c&&(c=Zs(a));
		var d=c>>3
			,f=c&7;
		if(d===b)
			return !0;
		if(d>b) {
			a.pendingTagAndType=c;
			break;
		}
		c=-1;
		switch(f) {
			case 0:
				Zs(a);
				break;
			case 1:
				a.pos+=8;
				break;
			case 2:
				d=Zs(a);
				a.pos+=d;
				break;
			case 5:
				a.pos+=4;
		}
	}
	return !1;
}
/** @type {RUa_from_enum_map} */
const RUa={
	2: "fakeChannel",
	17: "musicAlbumRelease",
	18: "musicAlbumReleaseDetail",
	19: "musicAlbumReleaseUserDetail",
	20: "musicArtist",
	21: "musicArtistDetail",
	22: "musicArtistUserDetail",
	24: "musicPlaylist",
	28: "musicTrack",
	29: "musicTrackDetail",
	30: "musicTrackUserDetail",
	76: "videoPlaybackPositionEntity",
	100: "musicShare",
	119: "playbackData",
	120: "transfer",
	121: "musicLibraryEdit",
	130: "offlineVideoPolicy",
	141: "downloadStatusEntity",
	148: "refresh",
	151: "ytMainVideoEntity",
	152: "ytMainChannelEntity",
	155: "ytMainDownloadedVideoEntity",
	158: "mainDownloadsLibraryEntity",
	164: "mainDownloadsListEntity",
	169: "offlineOrchestrationActionWrapperEntity",
	182: "fakeVideo",
	198: "offlineVideoStreams",
	202: "downloadQualityPickerEntity",
	217: "liveChatPollStateEntity",
	225: "captionTrack",
	229: "iconBadgeEntity",
	234: "musicTrackDownloadMetadataEntity",
	236: "commerceCartListEntity",
	242: "orchestrationWebSamplingEntity",
	245: "logoEntity",
	246: "offlineabilityEntity",
	248: "musicPlaylistDownloadMetadataEntity",
	252: "flowStateEntity",
	257: "musicDownloadsLibraryEntity",
	259: "musicAlbumReleaseDownloadMetadataEntity",
	261: "mainVideoEntity",
	262: "mainVideoDownloadStateEntity",
	264: "downloadsPageViewConfigurationEntity",
	273: "pinnedProductEntity",
	275: "channelHandle",
	278: "fakeVideoDescription",
	279: "fakePlaylist",
	280: "fakePlaylistEntryCollection",
	297: "settingEntity",
	299: "downloadsPageRefreshTokenEntity",
	306: "mainPlaylistEntity",
	312: "markersVisibilityOverrideEntity",
	318: "musicLibraryStatusEntity",
	329: "macroMarkerEntity",
	356: "quantityIncrementerEntity",
	358: "buttonEntity",
	368: "mainPlaylistVideoEntity",
	373: "mainPlaylistDownloadStateEntity",
	393: "emojiFountainDataEntity",
	406: "continuationTokenEntity"
};
/** @type {(this:number,...c: any[])=>any[]} @this {number} */
function za() {
	for(var a=Number(this),b=[],c=a;c<arguments.length;c++)
		b[c-a]=arguments[c];
	return b;
};
class Bl extends Error {
	/** @arg {string} [a] */
	constructor(a) {
		var b=za.apply(1,arguments);
		super(a);
		this.args=b.slice();
	}
};
/** @arg {Bl} exception */
function $n(exception) {
	console.log("report error");
	console.log(exception);
}
/** @arg {[string]} gs */
function decode_entity_key(...gs) {
	/** @type {[Bl|string|number|EntityKeyReader|undefined]} */
	let [a]=gs;
	// a = new OUa(new Ys([Rd(decodeURIComponent(a))]));
	a=new EntityKeyReader(new ServiceArrayViewType([base64_to_array(decodeURIComponent(a))]));
	if(PUa(a,2)) {
		/** @type {ReturnType<typeof LUa>|number|Uint8Array|undefined} */
		var b=Zs(a);
		var c=a.pos;
		/** @type {ServiceArrayViewType|DataView|Uint8Array|string} */
		var d=a.arrayView;
		c=void 0===c? 0:c;
		var f=void 0===b? -1:b;
		c=void 0===c? 0:c;
		f=void 0===f? -1:f;
		if(d.totalLength&&f) {
			0>f&&(f=d.totalLength-c);
			d.focus(c);
			if(!(c-d.arrayPos+f<=d.arrays[d.arrayIdx].length)) {
				/** @type {number|Uint8Array} */
				var h=d.arrayIdx,
					/** @type {number|Uint8Array} */
					l=d.arrayPos;
				d.focus(c+f-1);
				l=new Uint8Array(d.arrayPos+d.arrays[d.arrayIdx].length-l);
				for(var n=0,p=h;p<=d.arrayIdx;p++)
					l.set(d.arrays[p],n),
						n+=d.arrays[p].length;
				d.arrays.splice(h,d.arrayIdx-h+1,l);
				d.arrayIdx=0;
				d.arrayPos=0;
				d.focus(c);
			}
			h=d.arrays[d.arrayIdx];
			d=new DataView(h.buffer,h.byteOffset+c-d.arrayPos,f);
		} else
			d=new DataView(new ArrayBuffer(0));
		d=new Uint8Array(d.buffer,d.byteOffset,d.byteLength);
		a.pos+=b;
		b=d;
	} else
		b=void 0;
	b=b? LUa(b):void 0;
	a=PUa(a,4)? Zs(a):void 0;
	if(!a) throw new Error("Invalid state");
	/** @template {number} T @arg {T} v @returns {v is keyof typeof RUa} */
	function is_keyof_RUa(v) {
		return v in RUa;
	}
	if(!b) return null;
	if(!is_keyof_RUa(a)) {
		if(!lua_strs.includes(b)) {
			debugger;
			return null;
		}
		return {
			entityTypeFieldNumber: a,
			entityType: null,
			entityId: b
		};
	}
	d=RUa[a];
	if("undefined"===typeof d)
		throw a=new Bl("Failed to recognize field number",{
			name: "EntityKeyHelperError",
			fieldNumber: a
		}),
		$n(a),
		a;
	return {
		entityTypeFieldNumber: a,
		entityType: d,
		entityId: b
	};
}
class YtPlugin {
	/** @type {[string,{name: string;}][]} */
	saved_function_objects=[];
	constructor() {
		this.created_blobs=created_blobs;
		this.active_blob_set=active_blob_set;
		this.saved_maps=new Map;
		this.saved_data=saved_data;
		this.PropertyHandler=PropertyHandler;
		this.make_search_params=make_search_params;
		this.decode_b64_proto_obj=decode_url_b64_proto_obj;
		this.blob_create_args_arr=blob_create_args_arr;
		this.dom_observer=dom_observer;
		this.playlist_arr=playlist_arr;
		this.page_type_changes=page_type_changes;
		this.filter_out_keys=filter_out_keys;
		this.port_state=port_state;
		this.plugin_overlay_element=plugin_overlay_element;
		this.AudioGainController=AudioGainController;
		this.audio_gain_controller=audio_gain_controller;
		this.has_keys=has_keys;
		this.decode_entity_key=decode_entity_key;
	}
	init() {
		this.add_function(non_null);
		this.save_new_map("box_map",box_map);
		inject_api.modules??=new Map;
		inject_api.modules.set("yt",this);
	}
	/** @arg {string} key @arg {Map<string, {}>} map */
	save_new_map(key,map) {
		if(!this.saved_maps) return;
		this.saved_maps.set(key,map);
	}
	/** @arg {HiddenData<FilterHandlers>} value */
	set_yt_handlers(value) {
		this.yt_handlers=value;
	}
	/** @arg {{name:string}} function_obj */
	add_function(function_obj) {
		if(!this.saved_function_objects) return;
		this.saved_function_objects.push([function_obj.name,function_obj]);
	}
	/** @arg {AppendContinuationItemsAction} o @returns {o is WatchNextContinuationAction} */
	is_watch_next_feed_target(o) {
		return o.targetId==="watch-next-feed";
	}
	/** @arg {AppendContinuationItemsAction} o @returns {o is CommentsSectionContinuationAction} */
	is_comments_section_next(o) {
		return o.targetId==="comments-section";
	}
	/** @arg {AppendContinuationItemsAction} o @returns {o is BrowseFeedAction} */
	is_what_to_watch_section(o) {
		return o.targetId==="browse-feedFEwhat_to_watch";
	}
}
//#endregion
class IndexedDbAccessor {
	/** @arg {string} db_name */
	constructor(db_name,version=1) {
		this.db_args={
			name: db_name,
			version,
		};
	}
	database_opening=false;
	database_open=false;
	/** @type {{v: string}[]} */
	arr=[];
	/** @type {{v: string}[]} */
	committed_data=[];
	/** @arg {{v: string}} obj */
	put(obj) {
		if(this.database_open) {
			this.arr.push(obj);
			return;
		}
		this.requestOpen();
		this.arr.push(obj);
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
	/** @arg {IDBOpenDBRequest} request */
	onOpenRequest(request) {
		request.onsuccess=event => this.onSuccess(request,event);
		request.onerror=event => this.onError(event);
		request.onupgradeneeded=event => this.onUpgradeNeeded(request,event);
	}
	log_all_events=false;
	close_db_on_transaction_complete=false;
	/** @arg {IDBOpenDBRequest} request @arg {Event} event */
	onSuccess(request,event) {
		if(this.log_all_events) console.log("OpenDBRequest success",event);
		this.onDatabaseReady(request.result);
	}
	/** @arg {IDBDatabase} db */
	onDatabaseReady(db) {
		this.database_opening=false;
		this.database_open=true;
		this.onDatabaseResult(db);
		this.start_transaction(db);
	}
	/** @arg {IDBDatabase} db */
	onDatabaseResult(db) {
		db.onerror=event => console.log("IDBDatabase: error",event);
		db.onabort=event => console.log("IDBDatabase: abort",event);
		db.onclose=event => console.log("IDBDatabase: close",event);
		db.onversionchange=event => this.onDatabaseVersionChange(db,event);
	}
	/** @arg {IDBDatabase} db @arg {IDBVersionChangeEvent} event */
	onDatabaseVersionChange(db,event) {
		this.database_open=false;
		console.log("IDBDatabase: version_change",event);
		db.close();
	}
	/** @arg {IDBDatabase} db */
	start_transaction(db) {
		const transaction=db.transaction("video_id","readwrite");
		transaction.onerror=event => console.log("IDBTransaction: error",event);
		transaction.onabort=event => console.log("IDBTransaction: abort",event);
		transaction.oncomplete=event => this.onTransactionComplete(db,event);
		if(this.arr.length>0) this.consume_data(transaction);
	}
	/** @arg {IDBDatabase} db @arg {Event} event */
	onTransactionComplete(db,event) {
		if(this.log_all_events) console.log("IDBTransaction: complete",event);
		for(let i=this.arr.length-1;i>=0;i--) {
			if(!this.committed_data.includes(this.arr[i])) continue;
			this.arr.splice(i,1);
		}
		if(this.arr.length>0) {
			console.log("transaction done, but not all data was committed");
		} else {
			this.committed_data.length=0;
		}
		this.database_open=false;
		db.close();
	}
	/** @arg {IDBTransaction} transaction */
	consume_data(transaction) {
		const store=transaction.objectStore("video_id");
		this.consume_data_with_store(store);
	}
	/** @arg {IDBObjectStore} store */
	consume_data_with_store(store) {
		const cursor_req=store.openCursor();
		/** @type {{v: string}[]} */
		let database_data=[];
		cursor_req.onsuccess=() => {
			const cursor=cursor_req.result;
			if(cursor) {
				database_data.push(cursor.value);
				cursor.continue();
			} else {
				/** @type {Map<string,{v:string}>} */
				let database_map=new Map;
				/** @type {Map<string,{v:string}>} */
				let new_data_map=new Map;
				database_data.forEach(e => database_map.set(e.v,e));
				for(let data of this.arr) {
					if(database_map.has(data.v)) {
						this.committed_data.push(data);
						let ok=get_keys_of(data);
						let in_db=database_map.get(data.v);
						if(!in_db) continue;
						let ok_db=get_keys_of(in_db);
						if(eq_keys(ok,ok_db)) continue;
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
	/** @arg {IDBObjectStore} store @arg {{v:string}} data */
	add_data_to_store(store,data) {
		const request=store.add(data);
		request.onerror=event => console.log("IDBRequest: error",event);
		request.onsuccess=event => {
			if(this.log_all_events) console.log("IDBRequest: success",event);
			this.committed_data.push(data);
		};
	}
	/** @arg {IDBOpenDBRequest} request @arg {IDBVersionChangeEvent} event */
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
			/** @type {IDBRequest<{v:string}[]>} */
			let get_all_request=video_id_store.getAll();
			get_all_request.onsuccess=() => {
				db.deleteObjectStore("video_id");
				this.createLatestDatabaseVersion(request,get_all_request.result);
			};
		}
	}
	/** @arg {IDBOpenDBRequest} request @arg {{v:string}[]} data_source */
	createLatestDatabaseVersion(request,data_source) {
		const db=request.result;
		const store=db.createObjectStore("video_id",{keyPath: "v"});
		for(let x of data_source) store.put(x);
	}
	/** @arg {Event} event */
	onError(event) {
		console.log('idb error',event);
	}
}
const indexed_db=new IndexedDbAccessor("yt_plugin",2);
class YtUrlParser extends BaseService {
	/** @template {string[]} T @template {string} U @arg {U} w @arg {T} x @returns {x is [string,`${U}${string}`,...string[]]} */
	str_starts_with_at_1(x,w) {
		return this.str_starts_with(x[1],w);
	}
	/** @template {string[]} T @template {string} U @arg {U} w @arg {T} x @returns {x is [`${U}${string}`,...string[]]} */
	str_starts_with_at_0(x,w) {
		return this.str_starts_with(x[0],w);
	}
	/** @arg {`query=${string}`} x */
	parse_channel_search_url(x) {
		let sp=make_search_params(x);
		if(!eq_keys(get_keys_of(sp),["query"])) debugger;
		console.log("[found_search_query]",sp.query);
	}
	/** @arg {Extract<ParseUrlStr_3,[`@${string}`,any]>[1]} x */
	parse_channel_section_url(x) {
		if(!this.str_is_search(x)) {
			return this.parse_channel_section(x);
		}
		let a=split_string(x,"?");
		switch(a[0]) {
			case "search": this.parse_channel_search_url(a[1]); break;
			default: debugger; break;
		}
	}
	/** @arg {ParseUrlStr_3} x */
	parse_url_3(x) {
		if(this.str_starts_with_at_0(x,"@")) {
			this.parse_channel_section_url(x[1]);
			return;
		}
		switch(x[0]) {
			case "feed": return this.parse_feed_url(x);
			case "shorts": return this.parse_shorts_url(x);
			case "channel": return this.parse_channel_url(x);
			case "youtubei": return this.parse_youtubei_api_url(x);
			case "api": return this.parse_api_url(x);
			default: debugger; return;
		}
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["api",...any]>} x */
	parse_api_url(x) {
		let a=split_string_once(x[1],"/");
		switch(a[0]) {
			case "stats": this.parse_api_stats_url(a[1]); break;
		}
	}
	/** @arg {ParseApiUrlStr} x */
	parse_api_stats_url(x) {
		let a=split_string_once(x,"?");
		switch(a[0]) {
			case "ads": {
				let v=make_search_params(a[1]);
				// spell:disable-next
				const {ver,ns,event,device,content_v,el,ei,devicever,bti,break_type,conn,cpn,lact,m_pos,mt,p_h,p_w,rwt,sdkv,slot_pos,vis,vol,wt,sli,slfs,loginael,...y}=v; this.g(y);
			} break;
			default: debugger; break;
		}
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["channel",...any]>} x */
	parse_channel_url(x) {
		if(this.str_starts_with_at_1(x,"UC")) {
			return;
		}
		console.log("[parse_channel_url]",x);
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["youtubei",...any]>} x */
	parse_youtubei_api_url(x) {
		let [,a]=x;
		let b=split_string_once(a,"/");
		if(b[0]!=="v1") debugger;
		let [,c]=b;
		switch(c) {
			case "browse": break;
			case "next": break;
			default: console.log(a); debugger;
		}
	}
	/** @arg {string} x */
	parse_video_id(x) {
		indexed_db.put({v: x});
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		this.parse_video_id(x[1]);
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["feed",any]>} x */
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
	/** @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {
		return x.includes("?");
	}
	/** @arg {`RD${string}`} x */
	parse_guide_entry_id(x) {
		/** @type {YtUrlInfoItem[]} */
		let arr=[];
		if(this.str_starts_with(x,"RD")) {
			arr.push({_tag: "playlist",type: "RD",id: x.slice(2)});
		} else {
			console.log(x);
			debugger;
		}
		this.log_url_info_arr(arr);
	}
	/** @arg {YtWatchUrlParamsFormat} x */
	parse_watch_page_url(x) {
		let vv=split_string(x,"&");
		/** @type {YtUrlInfoItem[]} */
		let url_info_arr=[];
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @type {SplitOnce<typeof prop,"=">} */
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
						} else {
							url_info_arr.push({_tag: "playlist",type: "RD",id: v.slice(2)});
						}
					} else if(this.str_starts_with(v,"PL")) {
						url_info_arr.push({_tag: "playlist",type: "PL",id: v.slice(2)});
					} else {
						debugger;
					}
				} break;
				case "pp": {
					this.on_player_params(res[1]);
				} break;
				case "start_radio": console.log("[playlist_start_radio]",res[1]); break;
				case "index": {
					if(this.cache_playlist_index.includes(res[1])) break;
					this.cache_playlist_index.push(res[1]);
					if(this.log_playlist_index) console.log("[playlist_index]",res[1]);
				} break;
				default: debugger;
			}
		}
		this.log_url_info_arr(url_info_arr);
	}
	/** @arg {string} x */
	on_player_params(x) {
		let pp_value=x;
		let pp_dec=decodeURIComponent(pp_value);
		if(this.cache_player_params.includes(pp_value)) return;
		this.cache_player_params.push(pp_value);
		let res_e=decode_b64_proto_obj(pp_dec);
		if(!res_e) {
			debugger;
			return;
		}
		/** @type {Map<number,number>} */
		let param_map=new Map();
		for(let param of res_e) {
			switch(param[0]) {
				case "data32": param_map.set(param[1],param[2]); break;
				default: debugger; break;
			}
		}
		let map_keys=[...param_map.keys()];
		if(eq_keys(map_keys,[8,9])) {
			let p8=param_map.get(8);
			let p9=param_map.get(9);
			if(p8!==void 0&&p9!==void 0) {
				if(p8===1&&p9===1) return;
			}
		}
		console.log("[new_player_params]",Object.fromEntries(param_map.entries()));
		debugger;
	}
	log_enabled_playlist_id=false;
	/** @type {string[]} */
	cache_playlist_index=[];
	/** @type {string[]} */
	cache_playlist_id=[];
	/** @type {string[]} */
	cache_player_params=[];
	/** @arg {string} x @arg {URL} url */
	parse_account_google_com_url(x,url) {
		if(url.pathname==="/AddSession") return;
		console.log("[parse_url_external_2]",x);
	}
	/** @arg {Extract<YtUrlFormat,`https://${string}`>} x */
	parse_full_url(x) {
		let r=create_from_parse(x);
		switch(r.host) {
			case "ad.doubleclick.net": return;
			case "www.googleadservices.com": return;
			case "www.youtube.com": {
				this.parse_url(`${r.pathname}${r.search}`);
				return;
			}
			default:
		}
		/** @template {UrlParseRes_noSearch<any,string,any,any>} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,{host:`${U}${string}`}>} */
		let host_starts_with=(x,v) => {
			return this.str_starts_with(x.host,v);
		};
		if(host_starts_with(r,"yt")) {
			let c=split_string(r.pathname,"=");
			let v=split_string(c[1],"-");
			let h=split_string(r.host,".");
			console.log('yt_ggpht_url',h[0],c[0],v);
			return;
		}
		switch(r.host) {
			case "www.google.com": return;
			case "i.ytimg.com": return;
			default:
		}
		console.log("[parse_url_external_1]",x);
		debugger;
	}
	/** @arg {YtUrlFormat} x */
	parse_url(x) {
		if(this.str_starts_with(x,"https://")) {
			return this.parse_full_url(x);
		}
		if(x==="/") return;
		let up=split_string_once(x,"/");
		if(up[0]!=="") {
			debugger;
			return;
		}
		this.parse_url_1(up[1]);
	}
	/** @arg {ParseUrlStr_1} x */
	parse_url_1(x) {
		let v=split_string_once(x,"/");
		switch(v.length) {
			case 1: this.parse_url_2(v[0]); break;
			case 2: this.parse_url_3(v); break;
		}
	}
	log_playlist_index=false;
	/** @arg {YtUrlInfoPlaylist} x */
	log_playlist_id(x,critical=false) {
		if(this.cache_playlist_id.includes(x.id)) return;
		this.cache_playlist_id.push(x.id);
		if(this.log_enabled_playlist_id||critical) console.log("[playlist]",x.type,x.id);
	}
	/** @arg {YtUrlInfoItem[]} x */
	log_url_info_arr(x) {
		for(let url_info of x) {
			switch(url_info._tag) {
				case "playlist": {
					switch(url_info.id.length) {
						case 11: this.log_playlist_id(url_info); continue;
						default: debugger; break;
					}
					this.log_playlist_id(url_info,true);
				} break;
				case "video": indexed_db.put({v: url_info.id}); break;
			}
		}
	}
	/** @type {YtUrlFormat} */
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,[any]>[0]} x */
	parse_url_2(x) {
		if(this.str_is_search(x)) {
			let a=split_string(x,"?");
			switch(a[0]) {
				case "playlist": this.parse_playlist_page_url(a[1]); break;
				case "watch": this.parse_watch_page_url(a[1]); break;
			}
			return;
		}
		if(this.str_starts_with(x,"@")) {
			console.log("[channel_handle]",x);
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
			default:
		}
		switch(x) {
			default: debugger; return;
		}
	}
	/** @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,[`account${string}`]>[0]} x */
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
	/** @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,`${U}${string}`>} */
	str_starts_with(x,v) {
		return x.startsWith(v);
	}
	/** @arg {YtPlaylistUrlParamsFormat} x */
	parse_playlist_page_url(x) {
		if(x.includes("&")) debugger;
		let y=split_string(x,"=");
		switch(y[0]) {
			case "list": {
				if(y[1]==="WL") return;
				if(this.str_starts_with_at_1(y,"RD")) {
					if(this.str_starts_with_at_1(y,`RD${"MM"}`)) {
						return;
					}
					console.log(y);
					debugger;
					return;
				};
				if(this.str_starts_with_at_1(y,"PL")) {
					let [,v]=y; v;
					return;
				};
				console.log(y);
				debugger;
			} break;
			default: debugger;
		}
	}
	/** @arg {YtTargetIdType} x */
	parse_target_id(x) {
		if(this.str_starts_with(x,"browse-feed")) {
			return;
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
		console.log("[new_parse_target_id]",x);
		debugger;
	}
	/** @arg {ChanTabStr} x */
	parse_channel_section(x) {
		switch(x) {
			case "featured": break;
			case "videos": break;
			case "playlists": break;
			case "community": break;
			case "channels": break;
			case "about": break;
			case "search": break;
			case "streams": break;
			case "shorts": break;
			default: debugger;
		}
	}
	/** @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
	make_search_params(t) {
		let sp=new URLSearchParams(t);
		return as_cast(Object.fromEntries(sp.entries()));
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei",...string[]]>} x */
	get_yt_url_type(x) {
		if(x[1]!=="v1") {
			return this.api_no_handler(x,x[1]);
		}
		switch(x.length) {
			case 4: return this.get_yt_url_type_4(x);
			case 3: return this.get_yt_url_type_3(x);
			default: console.log("[get_yt_url.url_type_new_length]",x); debugger; return null;
		}
	}
	/** @arg {string[]} parts @arg {string} cur_part */
	api_no_handler(parts,cur_part) {
		console.log("[no_handler_for] [%o] [%s]",parts,cur_part);
		debugger;
		return null;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1",string]>} x */
	get_yt_url_type_3(x) {
		switch(x[2]) {
			case "browse": break;
			case "feedback": break;
			case "get_transcript": break;
			case "guide": break;
			case "next": break;
			case "player": break;
			default: this.api_no_handler(x,x[2]);
		}
		console.log('get_yt_url_type_3',x.slice(1));
		return x[2];
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1",string,string]>} x */
	get_yt_url_type_4(x) {
		switch(x[2]) {
			case "account": return this.get_account_type(x);
			case "att": return this.get_att_type(x);
			case "comment": return this.get_comment_type(x);
			case "like": return this.get_like_type(x);
			case "live_chat": return this.get_live_chat_type(x);
			case "notification": return this.get_notification_type(x);
			case "reel": return this.get_reel_type(x);
			case "subscription": return this.get_subscription_type(x);
			default: return this.api_no_handler(x,x[2]);
		}
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","subscription",string,...string[]]>} x */
	get_subscription_type(x) {
		switch(x[3]) {
			case "subscribe": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","reel",string,...string[]]>} x */
	get_reel_type(x) {
		switch(x[3]) {
			case "reel_item_watch": break;
			case "reel_watch_sequence": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","notification",string,...string[]]>} x */
	get_notification_type(x) {
		switch(x[3]) {
			case "get_unseen_count": break;
			case "get_notification_menu": break;
			case "record_interactions": break;
			case "modify_channel_preference": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","comment",string,...string[]]>} x */
	get_comment_type(x) {
		switch(x[3]) {
			case "create_comment": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","att",string,...string[]]>} x */
	get_att_type(x) {
		switch(x[3]) {
			case "get": break;
			case "log": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","like",string,...string[]]>} x */
	get_like_type(x) {
		switch(x[3]) {
			case "like": break;
			case "removelike": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","account",string,...string[]]>} x */
	get_account_type(x) {
		switch(x[3]) {
			case "account_menu": break;
			case "accounts_list": break;
			case "set_setting": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","live_chat",...string[]]>} x */
	get_live_chat_type(x) {
		switch(x[3]) {
			case "get_live_chat_replay": break;
			default: return this.api_no_handler(x,x[3]);
		};
		return {
			/** @type {`${typeof x[2]}.${typeof x[3]}`} */
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
}
//#region HandleTypes
class HandleTypes extends BaseService {
	/** @template {{}} T @arg {Maybe<T>} x @returns {x is T} */
	maybe_has_value(x) {
		return Object.keys(x).length>0;
	}
	/** @template {{}} T @arg {Maybe<T>} x @arg {(x:T)=>void} f */
	maybe(x,f) {
		if(!this.maybe_has_value(x)) return;
		f(x);
	}
	/** @private @arg {PlayerResponse} x */
	PlayerResponse(x) {
		this.save_keys("PlayerResponse",x);
		let t=this;
		/** @this {typeof t} @arg {typeof x} x */
		function p1(x) {
			const {responseContext: a,annotations: b,attestation: c,adPlacements: d,...y}=x;
			this.ResponseContext(a);
			this.z(b,a => {
				if(get_keys_of_one(a)[0]!=="playerAnnotationsExpandedRenderer") debugger;
				this.PlayerAnnotationsExpandedRenderer(a);
			});
			if(c) this.PlayerAttestationRenderer(c);
			this.z(d,a => this.maybe(a,a => this.AdPlacementRenderer(a)));
			return y;
		}
		let a=p1.call(this,x);
		/** @this {typeof t} @arg {typeof a} x */
		function p2(x) {
			const {playabilityStatus: b,playbackTracking: c,playerAds: d,playerConfig: e,...y}=x;
			this.PlayabilityStatus(b);
			if(c) this.PlaybackTracking(c);
			this.z(d,a => {
				if(get_keys_of_one(a)[0]!=="playerLegacyDesktopWatchAdsRenderer") debugger;
				this.w(a,a => this.DesktopWatchAdsData(a));
			});
			if(e) this.PlayerConfig(e);
			return y;
		}
		let b=p2.call(this,a);
		/** @this {typeof t} @arg {typeof b} x */
		function p3(x) {
			const {paidContentOverlay: a,trackingParams: c,videoQualityPromoSupportedRenderers: d,endscreen: e,...y}=x;
			if(a) {
				if(get_keys_of_one(a)[0]!=="paidContentOverlayRenderer") debugger;
				this.w(a,a => this.PaidContentOverlayRenderer(a));
			}
			this.trackingParams(c);
			this.w(d,a => this.VideoQualityPromoData(a));
			if(e) this.EndscreenRenderer(e);
			return y;
		}
		let c=p3.call(this,b);
		/** @this {typeof t} @arg {typeof c} x */
		function p4(x) {
			const {videoDetails: a,storyboards: b,streamingData: d,heartbeatParams: e,...y}=x;
			if(a) this.VideoDetails(a);
			if(b) this.storyboards(b);
			if(d) this.StreamingData(d);
			if(e) this.HeartbeatParams(e);
			return y;
		}
		let d=p4.call(this,c);
		/** @this {typeof t} @arg {typeof d} x */
		function p5(x) {
			const {captions: a,cards: b,frameworkUpdates: c,microformat: e,...y}=x;
			if(a) this.PlayerCaptionsTracklistRenderer(a);
			if(b) this.CardCollectionRenderer(b);
			this.FrameworkUpdates(c);
			if(e) this.PlayerMicroformatRenderer(e);
			return y;
		}
		let y=p5.call(this,d); this.g(y);
	}
	/** @arg {PlayerStoryboardSpecRenderer|PlayerLiveStoryboardSpecRenderer} x */
	storyboards(x) {
		if("playerStoryboardSpecRenderer" in x) {
			this.PlayerStoryboardSpecRenderer(x);
		} else if("playerLiveStoryboardSpecRenderer" in x) {
			this.PlayerLiveStoryboardSpecRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {PlayerLiveStoryboardSpecRenderer} x */
	PlayerLiveStoryboardSpecRenderer(x) {
		const {playerLiveStoryboardSpecRenderer: a,...y}=x; this.g(y);
		this.PlayerLiveStoryboardSpecData(a);
	}
	/** @arg {PlayerLiveStoryboardSpecData} x */
	PlayerLiveStoryboardSpecData(x) {
		const {spec: a,...y}=x; this.g(y);
		this.primitive_of(a,"string");
	}
	/** @arg {BrowsePageResponse} x */
	YtBrowsePageResponse(x) {
		let {page: a,endpoint: b,response: c,url: d,previousCsn: e,...y}=x;
		if(a!=="browse") debugger;
		this.BrowseEndpoint(b,a => this.BrowseWebCommandMetadata(a));
		this.save_keys("DataResponsePageType",x);
		this.x.get("string_parser").parse_url(d);
		this.BrowseResponseContent(c);
		if(e) this.previousCsn(e);
		this.g(y);
	}
	/** @template {WebCommandMetadataTemplateType} T @arg {BrowseEndpoint<T>} x @arg {(v:T)=>void} f */
	BrowseEndpoint(x,f) {
		const {clickTrackingParams: a,commandMetadata: b,browseEndpoint: c,...y}=x; this.g(y);
		this.clickTrackingParams(a);
		this.BrowseCommandMetadata(b,f);
		this.BrowseEndpointData(c);
	}
	/** @template {WebCommandMetadataTemplateType} T @arg {BrowseCommandMetadata<T>} x @arg {(v:T)=>void} f */
	BrowseCommandMetadata(x,f) {
		if("resolveUrlCommandMetadata" in x) {
			this.ResolveUrlCommandMetadata(x.resolveUrlCommandMetadata);
		}
		if("webCommandMetadata" in x) {
			f(x.webCommandMetadata);
		}
	}
	/** @arg {BrowseWebCommandMetadata} x */
	BrowseWebCommandMetadata(x) {
		const {url,webPageType,rootVe,apiUrl,...y}=x; this.g(y);
		if(x.url!=="/") debugger;
		if(x.webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(x.rootVe!==3854) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {NavigateEventDetail['response']} x */
	DataResponsePageType(x) {
		let mt=x;
		this._current_response_type=x.page;
		switch(mt.page) {
			case "browse": return this.YtBrowsePageResponse(mt);
			case "watch": return this.YtWatchPageResponse(mt);
			case "channel": return this.YtChannelPageResponse(mt);
			case "playlist": return this.YtPlaylistPageResponse(mt);
			case "settings": return this.YtSettingsPageResponse(mt);
			case "shorts": return this.YtShortsResponse(mt);
			case "search": return this.SearchPageResponse(mt);
			default: break;
		}
		console.log("pt",x.page,x);
		debugger;
	}
	/** @template {{clickTrackingParams: string}} T @arg {T} x */
	handle_clickTrackingParams(x) {
		const {clickTrackingParams: a,...y}=x;
		if(a!==void 0) this.clickTrackingParams(a);
		return y;
	}
	/** @arg {ResponseReceivedAction} x */
	ResponseReceivedAction(x) {
		if("adsControlFlowOpportunityReceivedCommand" in x) {
			return this.AdsControlFlowOpportunityReceivedCommand(x);
		} else if("reloadContinuationItemsCommand" in x) {
			return this.ReloadContinuationItemsCommand(x);
		}
		debugger;
	}
	/** @arg {ReloadContinuationItemsCommand} x */
	ReloadContinuationItemsCommand(x) {
		const {clickTrackingParams: a,reloadContinuationItemsCommand: b,...y}=x; this.g(y);
		this.clickTrackingParams(a);
		this.ReloadContinuationItemsCommandData(b);
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommand} x */
	AdsControlFlowOpportunityReceivedCommand(x) {
		let a=this.handle_clickTrackingParams(x);
		this.w(a,a => this.AdsControlFlowOpportunityReceivedCommandData(a));
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommandData} x */
	AdsControlFlowOpportunityReceivedCommandData(x) {
		const {opportunityType: a,adSlotAndLayoutMetadata: b,isInitialLoad: c,enablePacfLoggingWeb: d,...y}=x; this.g(y);
		if(a!=="OPPORTUNITY_TYPE_ORGANIC_BROWSE_RESPONSE_RECEIVED") debugger;
		this.z(b,a => this.AdSlotAndLayoutMetadataItem(a));
		this.z([c,d],a => this.primitive_of(a,"boolean"));
	}
	/** @arg {AdSlotAndLayoutMetadataItem} x */
	AdSlotAndLayoutMetadataItem(x) {
		const {adLayoutMetadata: a,adSlotMetadata: b,...y}=x; this.g(y);
		this.z(a,a => this.AdLayoutMetadataItem(a));
		this.AdSlotMetadata(b);
	}
	/** @arg {AdLayoutMetadataItem} x */
	AdLayoutMetadataItem(x) {
		const {layoutType: a,layoutId: b,adLayoutLoggingData: c,...y}=x; this.g(y);
		if(a!=="LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE") debugger;
		this.primitive_of(b,"string");
		this.AdLayoutLoggingData(c);
	}
	/** @arg {AdLayoutLoggingData} x */
	AdLayoutLoggingData(x) {
		const {serializedAdServingDataEntry: a,...y}=x; this.g(y);
		this.primitive_of(a,"string");
	}
	/** @arg {BrowseResponseContent} x */
	BrowseResponseContent(x) {
		this.save_keys("BrowseResponseContent",x);
		const {
			trackingParams: a,
			responseContext: res_ctx,contents: cont,
			header: hd/*tp*/,topbar: tb,sidebar: sb,
			onResponseReceivedActions: act_arr,
			frameworkUpdates: upd,cacheMetadata: cm,
			observedStateTags: ost,
			...y
		}=x;
		this.trackingParams(a);
		this.ResponseContext(res_ctx);
		this.z(act_arr,a => this.ResponseReceivedAction(a));
		this.z(ost,a => this.StateTag(a));
		if(cont) this.BrowseContents(cont);
		if(hd) {
			if("feedTabbedHeaderRenderer" in hd) {
				this.w(hd,a => this.FeedTabbedHeaderData(a));
			} else if("c4TabbedHeaderRenderer" in hd) {
				this.w(hd,a => this.C4TabbedHeaderData(a));
			} else {
				debugger;
			}
		}
		if(tb) {
			if("desktopTopbarRenderer" in tb) {
				this.w(tb,a => this.DesktopTopbarData(a));
			} else {
				debugger;
			}
		}
		if(upd) {
			if("entityBatchUpdate" in upd) {
				this.w(upd,a => this.EntityBatchUpdateData(a));
			} else {
				debugger;
			}
		}
		if(sb) this.SettingsSidebarRenderer(sb);
		if(cm) this.CacheMetadata(cm);
		this.g(y);
	}
	/** @arg {BrowseContents} x */
	BrowseContents(x) {
		if("twoColumnBrowseResultsRenderer" in x) {
			return this.TwoColumnBrowseResultsRenderer(x);
		}
		if("feedFilterChipBarRenderer" in x) {
			return this.FeedFilterChipBarRenderer(x);
		}
	}
	/** @arg {string} x */
	parse_endpoint_params(x) {
		let arr=decode_url_b64(x);
		let reader=new MyReader(arr);
		let res=reader.try_read_any();
		if(!res) return;
		const [f0]=res;
		if(f0[0]!=="child") {
			console.log(f0);
			return;
		}
		console.log(...res);
		let [,field_id,data]=f0;
		reader.pos=data.byteOffset;
		let more=reader.try_read_any(data.byteLength);
		if(more&&!more.find(e => e[0]==="error")) {
			const [f0]=more;
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)={message}",
				field_id,data.length
			);
			console.log("{message}",f0);
		} else {
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)=\"%s\"",
				field_id,data.length,decoder.decode(data)
			);
		}
	}
	/** @arg {BrowseIdType} x */
	parse_browse_id(x) {
		/** @typedef {SplitIntoGroups<typeof x,`${string}`>[0]} StartPart */
		/** @typedef {ExtractAfterStr<typeof x,"FE">} KnownParts */
		/** @typedef {ExtractAfterStr<typeof x,"VL"|"UC">} KnownParts_VL */
		/** @type {StartPart} */
		let v_2c=cast_as(x.slice(0,2));
		x: switch(v_2c) {
			case "FE": {
				/** @type {KnownParts} */
				let v_ac=cast_as(x.slice(2));
				switch(v_ac) {
					case "history": break x;
					case "library": break x;
					case "subscriptions": break x;
					case "what_to_watch": break x;
					default: break;
				}
				if(seen_map.has(v_ac)) break;
				seen_map.add(v_ac);
				console.log("[param_value_with_section] [%s] -> [%s]",v_2c,v_ac);
			} break;
			case "VL": let v_4c=x.slice(2,4); switch(v_4c) {
				case "LL": break;
				case "WL": break;
				case "PL": break;
				default:
					/** @type {KnownParts_VL} */
					let ve_ac=x.slice(2);
					console.log("new with param [param_2c_VL]",x,ve_ac);
			} break;
			case "UC": {
				if(x.slice(2).length===22) return;
				console.log("new with param [param_2c_UC]",x,x.slice(2));
			} break;
			case "SP": break;
			default: console.log("[param_value_needed]",v_2c,x); break;
		}
	}
	/** @arg {BrowseEndpointData} x */
	BrowseEndpointData(x) {
		const {params: a,browseId: b,canonicalBaseUrl: c,...y}=x;
		if(a) this.parse_endpoint_params(decodeURIComponent(a));
		if(b) this.parse_browse_id(b);
		this.save_keys("BrowseEndpointData",x);
		this.g(y);
	}
	/** @arg {UrlEndpointData} x */
	UrlEndpointRoot(x) {
		if("target" in x) {
			const {url,target,...y}=x;
			this.parse_url(url);
			if(target!=="TARGET_NEW_WINDOW") debugger;
			this.g(y);
			return;
		}
		const {url,...y}=x;
		this.parse_url(url);
		this.save_keys("UrlEndpointRoot",x);
		this.g(y);
	}
	/** @arg {YtUrlFormat} x */
	parse_url(x) {
		this.x.get("string_parser").parse_url(x);
	}
	/** @arg {ChangeKeyedMarkersVisibilityCommand} x */
	ChangeKeyedMarkersVisibilityCommand(x) {
		const {isVisible,key,...v}=x;
		this.primitive_of(isVisible,"boolean");
		if(key!=="HEATSEEKER") debugger;
		this.empty_object(v);
	}
	/** @arg {LoadMarkersCommandData} x */
	LoadMarkersCommand(x) {
		const {entityKeys: a,...y}=x;
		this.z(a,a => {
			let res=decode_b64_proto_obj(decodeURIComponent(a));
			let res_2=decode_entity_key(a);
			if(!res_2) {
				debugger;
				return;
			}
			if(lua_strs.includes(res_2.entityId)) return;
			console.log("[entity_key]",res_2,res);
		});
		this.g(y);
	}
	/** @arg {CreateCommentEndpointData} x */
	CreateCommentEndpointData(x) {
		let res=decode_url_b64_proto_obj(decodeURIComponent(x.createCommentParams));
		if(!res) {
			console.log("failed to decode create_comment_params");
			return;
		}
		if(res[0][0]==="child"&&res[0][1]===2) {
			console.log("fieldId",res[0][1],"str",decoder.decode(res[0][2]),"rest",res.slice(1));
		} else {
			console.log(res);
		}
	}
	endpoint_data_map=new class {
		constructor() {
			this._map=new Map(Object.entries(this._obj_map));
		}
		/** @type {endpoint_data_handler_names} */
		_obj_map={
			continuationCommand: "ContinuationCommand",
			commandMetadata: "CommandMetadata",
			watchEndpoint: "WatchEndpointData",
			browseEndpoint: "BrowseEndpointData",
			searchEndpoint: "SearchEndpointData",
			setSettingEndpoint: "SetSettingEndpointData",
			signalServiceEndpoint: "SignalServiceEndpointData",
			urlEndpoint: "UrlEndpointRoot",
			signalNavigationEndpoint: "SignalNavigationEndpointData",
			signOutEndpoint: "SignOutEndpointData",
			getAccountsListInnertubeEndpoint: "GetAccountsListInnertubeEndpointData",
			loadMarkersCommand: "LoadMarkersCommand",
			changeKeyedMarkersVisibilityCommand: "ChangeKeyedMarkersVisibilityCommand",
			createCommentEndpoint: "CreateCommentEndpointData",
			confirmDialogEndpoint: "ConfirmDialogEndpointData",
			reloadContinuationItemsCommand: "ReloadContinuationItemsCommandData",
			appendContinuationItemsAction: "AppendContinuationItemsAction",
			liveChatItemContextMenuEndpoint: "LiveChatItemContextMenuEndpointData",
			openPopupAction: "OpenPopupActionData",
		};
		/** @template {keyof endpoint_data_handler_names} T @arg {T} k */
		has_key(k) {
			return this._map.has(k);
		}
		/** @template {keyof endpoint_data_handler_names} T @arg {T} k */
		has(k) {
			if(!this._map.has(k)) return false;
			let key=this._map.get(k);
			if(key===null) return false;
			if(key===void 0) return false;
			return true;
		}
		/** @template {keyof endpoint_data_handler_names} T @arg {T} k @returns {Extract<endpoint_data_handler_names[T],string>} */
		get(k) {
			let key=this._map.get(k);
			if(!key) throw new Error();
			return as_cast(key);
		}
	};
	/** @arg {YtEndpoint} x */
	yt_endpoint(x) {
		if(!x) {debugger; return;}
		this.save_keys("YtEndpoint",x);
		const {
			clickTrackingParams: a,
			...y
		}=x;
		if(a) this.clickTrackingParams(a);
		/** @template {keyof endpoint_data_handler_names} T @arg {T} v @returns {endpoint_data_handler_names[T]} */
		let q=(v) => this.endpoint_data_map.get(v);
		let m=get_keys_of(y);
		if(m.length===0) return;
		let [k]=m;
		k="commandMetadata";
		{const {[k]: a}=y; if(a) this[q(k)](a);}
		k="browseEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="searchEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="setSettingEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="signalServiceEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="urlEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="watchEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="signalNavigationEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="signOutEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="getAccountsListInnertubeEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="changeKeyedMarkersVisibilityCommand";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="loadMarkersCommand";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="createCommentEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="confirmDialogEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="reloadContinuationItemsCommand";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="appendContinuationItemsAction";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="liveChatItemContextMenuEndpoint";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="openPopupAction";
		{const {[k]: a}=y; if(a) return this[q(k)](a);} k="continuationCommand";
		/** @type {[YtEndpoint,endpoint_data_handler_names]} */
		{const {[k]: a}=y; if(a) return this[q(k)](a);}
		let yc=get_keys_of(y);
		for(let ya of yc) {
			/** @type {endpoint_data_handler_names} */
			if(!this.endpoint_data_map.has_key(ya)) {
				console.log('[new_ep_data] [%s]',ya);
				debugger;
			}
		}
	}
	/** @arg {AppendContinuationItemsAction} x */
	AppendContinuationItemsAction(x) {
		this.parse_target_id(x.targetId);
	}
	/** @arg {YtTargetIdType} x */
	parse_target_id(x) {
		this.x.get("string_parser").parse_target_id(x);
	}
	/** @type {ResponseTypes['type']|NavigateEventDetail['response']['page']|null} */
	_current_response_type=null;
	get current_response_type() {
		if(!this._current_response_type) throw 1;
		return this._current_response_type;
	}
	/** @arg {ResponseTypes} x */
	ResponseTypes(x) {
		this._current_response_type=x.type;
		/** @arg {{type:string}} x */
		let g=x => {
			return this.save_string("need_api_type",x.type);
		};
		switch(x.type) {
			case "account.account_menu": return this.AccountMenuJson(x.data);
			case "account.accounts_list": return this.AccountsListResponse(x.data);
			case "account.set_setting": return this.AccountSetSetting(x.data);
			case "att.get": return this.AttGet(x.data);
			case "browse": return this.BrowseResponseContent(x.data);
			case "feedback": return this.JsonFeedbackData(x.data);
			case "get_transcript": return this.JsonGetTranscriptData(x.data);
			case "getAccountSwitcherEndpoint": return this.GetAccountSwitcherEndpointResult(x.data);
			case "getDatasyncIdsEndpoint": return this.DatasyncIdsResponse(x.data);
			case "guide": return this.GuideJsonType(x.data);
			case "like.like": return this.ResponseWithActions(x.data);
			case "like.removelike": return this.ResponseWithActions(x.data);
			case "next": return this.YtApiNext(x.data);
			case "notification.get_notification_menu": return this.GetNotificationMenuJson(x.data);
			case "notification.get_unseen_count": return this.NotificationGetUnseenCount(x.data);
			case "notification.record_interactions": return this.YtSuccessResponse(x.data);
			case "player": return this.PlayerResponse(x.data);
			case "reel.reel_item_watch": return this.ReelItemWatch(x.data);
			case "reel.reel_watch_sequence": return this.ReelWatchSequence(x.data);
			case "live_chat.get_live_chat_replay": return this.GetLiveChatReplay(x.data);
			default: debugger; break;
		}
		switch(x.type) {
			case "_Generic": return g(x);
			default: return g(x);
		}
	}
	/** @arg {GetLiveChatReplay} x */
	GetLiveChatReplay(x) {
		const {responseContext: a,continuationContents: b,...y}=x;
		this.ResponseContext(a);
		this.iter_continuationContents(b);
		this.g(y);
	}
	/** @arg {LiveChatContinuation} x */
	iter_continuationContents(x) {
		if("liveChatContinuation" in x) {
			this.w(x,a => this.LiveChatContinuationData(a));
		} else {
			debugger;
		}
	}
	/** @arg {LiveChatContinuationData} x */
	LiveChatContinuationData(x) {
		this.z(x.actions,a => this.ReplayChatItemAction(a));
		this.z(x.continuations,a => this.LiveChatContinuationItem(a));
	}
	/** @arg {ReplayChatItemAction} x */
	ReplayChatItemAction(x) {
		if("replayChatItemAction" in x) {
			const {replayChatItemAction: a,...y}=x;
			this.ReplayChatItemActionData(x.replayChatItemAction);
			this.empty_object(y);
		} else {
			debugger;
		}
	}
	/** @arg {LiveChatContinuationItem} x */
	LiveChatContinuationItem(x) {
		if("liveChatReplayContinuationData" in x) {
			this.w(x,a => this.LiveChatReplayContinuationData(a));
		} else if("playerSeekContinuationData" in x) {
			this.w(x,a => this.GenericContinuationData(a));
		} else {
			debugger;
		}
	}
	/** @arg {GenericContinuationData} x */
	GenericContinuationData(x) {
		const {continuation: a,...y}=x;
		this.primitive_of(a,"string");
		this.g(y);
	}
	/** @arg {LiveChatReplayContinuationData} x */
	LiveChatReplayContinuationData(x) {
		this.primitive_of(x.continuation,"string");
		this.primitive_of(x.timeUntilLastMessageMsec,"number");
	}
	/** @arg {ReplayChatItemActionData} x */
	ReplayChatItemActionData(x) {
		this.primitive_of(x.videoOffsetTimeMsec,"string");
		this.z(x.actions,a => this.AddChatItemAction(a));
	}
	/** @arg {AddChatItemAction} x */
	AddChatItemAction(x) {
		if("addChatItemAction" in x) {
			const {clickTrackingParams: a,addChatItemAction: b,...y}=x; this.g(y);
			if(a) this.clickTrackingParams(a);
			this.AddChatItemActionData(b);
		} else {
			debugger;
		}
	}
	/** @arg {AddChatItemActionData} x */
	AddChatItemActionData(x) {
		const {clientId: a,item: b,...y}=x; this.g(y);
		this.primitive_of(a,"string");
		this.LiveChatItem(x.item);
	}
	/** @arg {LiveChatItem} x */
	LiveChatItem(x) {
		if("liveChatTextMessageRenderer" in x) {
			this.LiveChatTextMessageRenderer(x);
		} else if("liveChatPlaceholderItemRenderer" in x) {
			this.LiveChatPlaceholderItemRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {LiveChatPlaceholderItemRenderer} x */
	LiveChatPlaceholderItemRenderer(x) {
		this.LiveChatPlaceholderItemData(x.liveChatPlaceholderItemRenderer);
	}
	/** @arg {LiveChatPlaceholderItemData} x */
	LiveChatPlaceholderItemData(x) {
		const {id: a,timestampUsec: b,...y}=x; this.g(y);
		this.primitive_of(a,"string");
		this.primitive_of(b,"string");
	}
	/** @arg {LiveChatTextMessageRenderer} x */
	LiveChatTextMessageRenderer(x) {
		this.w(x,a => this.LiveChatTextMessageData(a));
	}
	/** @arg {LiveChatTextMessageData} x */
	LiveChatTextMessageData(x) {
		const {
			message: a,authorName: b,authorPhoto: c,contextMenuEndpoint: d,
			id: e,timestampUsec: f,authorBadges: g,authorExternalChannelId: h,contextMenuAccessibility: i,
			timestampText: j,...y
		}=x;
		this.z([a,b,j],a => this.text_t(a));
		this.Thumbnail(c);
		this.yt_endpoint(d);
		this.z([e,f],a => this.primitive_of(a,"string"));
		this.parse_external_channel_id(h);
		this.Accessibility(i);
		if(g) this.z(g,a => this.LiveChatAuthorBadgeRenderer(a));
		this.g(y);
	}
	/** @arg {LiveChatAuthorBadgeRenderer} x */
	LiveChatAuthorBadgeRenderer(x) {
		if("liveChatAuthorBadgeRenderer" in x) {
			this.w(x,a => {
				const {accessibility: b,icon: c,tooltip: d,...y}=a;
				this.Accessibility(b);
				this.Icon(c);
				this.g(y);
			});
		} else {
			debugger;
		}
	}
	/** @arg {`UC${string}`} x */
	parse_external_channel_id(x) {
		let chan_parts=split_string_once(x,"UC");
		if(chan_parts[0]!=="") debugger;
		let cr=chan_parts[1];
		if(cr.length===22) return;
		console.log("[channel_id] %s %s","UC",cr);
	}
	/** @arg {LiveChatItemContextMenuEndpointData} x */
	LiveChatItemContextMenuEndpointData(x) {
		const {params: a,...y}=x; this.g(y);
		this.primitive_of(a,"string");
	}
	/** @arg {HeartbeatParams} x */
	HeartbeatParams(x) {
		const {heartbeatServerData: a,intervalMilliseconds: b,softFailOnError: c,...y}=x; this.g(y);
		this.z([a,b],a => this.primitive_of(a,"string"));
		this.primitive_of(c,"boolean");
	}
	/** @arg {CardCollectionRenderer} x */
	CardCollectionRenderer(x) {
		const {cardCollectionRenderer: a,...y}=x; this.g(y);
		this.CardCollectionData(a);
	}
	/** @arg {CardCollectionData} x */
	CardCollectionData(x) {
		const {
			cards: a,headerText: b,icon: c,closeButton: d,
			trackingParams: e,allowTeaserDismiss: f,logIconVisibilityUpdates: g,...y
		}=x; this.g(y);
		this.z(a,a => a);
		this.text_t(b);
		this.z([c,d],a => this.InfoCardIconRenderer(a));
		this.trackingParams(e);
		this.z([f,g],a => this.primitive_of(a,"boolean"));
	}
	/** @arg {InfoCardIconRenderer} x */
	InfoCardIconRenderer(x) {
		const {infoCardIconRenderer: a,...y}=x; this.g(y);
		this.InfoCardIconData(a);
	}
	/** @arg {InfoCardIconData} x */
	InfoCardIconData(x) {
		const {trackingParams: a,...y}=x; this.g(y);
		this.trackingParams(a);
	}
	/** @arg {PlayerMicroformatRenderer} x */
	PlayerMicroformatRenderer(x) {
		const {playerMicroformatRenderer: a,...y}=x; this.g(y);
		this.PlayerMicroformatData(a);
	}
	/** @arg {PlayerMicroformatData} x */
	PlayerMicroformatData(x) {
		let t=this;
		/** @this {typeof t} @arg {PlayerMicroformatData} x */
		function p1(x) {
			const {thumbnail: a,embed: b,title: c,description: d,...y}=x;
			this.Thumbnail(a);
			this.MicroformatEmbed(b);
			this.text_t(c);
			if(d) this.text_t(d);
			return y;
		}
		let a=p1.call(this,x);
		/** @this {typeof t} @arg {typeof a} x */
		function p2(x) {
			const {lengthSeconds: b,ownerProfileUrl: c,externalChannelId: d,isFamilySafe: e,...y}=x;
			this.primitive_of(b,"string");
			this.parse_channel_url(c);
			return y;
		}
		let b=p2.call(this,a);
		/** @this {typeof t} @arg {typeof b} x */
		function p3(x) {
			const {availableCountries: a,isUnlisted: c,hasYpcMetadata: d,viewCount: e,...y}=x;
			this.z(a,a => this.save_string("country_code",a));
			this.z([c,d],a => this.primitive_of(a,"boolean"));
			this.primitive_of(e,"string");
			return y;
		}
		let c=p3.call(this,b);
		/** @this {typeof t} @arg {typeof c} x */
		function p4(x) {
			const {category: a,publishDate: b,ownerChannelName: d,liveBroadcastDetails: e,...y}=x;
			/** @type {YtCategoryStr} */
			this.save_string("video.category",a);
			this.z([b,d],a => this.primitive_of(a,"string"));
			if(e) this.LiveBroadcastDetails(e);
			return y;
		}
		let d=p4.call(this,c);
		/** @this {typeof t} @arg {typeof d} x */
		function p5(x) {
			const {uploadDate: a,...y}=x;
			this.primitive_of(a,"string");
			return y;
		}
		let y=p5.call(this,d); this.g(y);
	}
	/** @arg {LiveBroadcastDetails} x */
	LiveBroadcastDetails(x) {
		const {startTimestamp: b,...y}=x;
		this.primitive_of(b,"string");
		if(y.isLiveNow) {
			const {isLiveNow: {},...a}=y; this.g(a);
		} else {
			const {isLiveNow: {},endTimestamp: c,...a}=y; this.g(a);
		}
	}
	log_user_channel_url=false;
	/** @arg {FullChannelUrlFormat} x */
	parse_channel_url(x) {
		let r=create_from_parse(x);
		let chan_part=split_string_once(r.pathname,"/")[1];
		let channel_id=split_string_once(chan_part,"/");
		switch(channel_id[0]) {
			case "channel": if(channel_id[1].startsWith("UC")) {
				this.parse_external_channel_id(channel_id[1]);
			} else {
				debugger;
			} break;
			case "user": {
				if(this.log_user_channel_url) console.log("[parse_channel_url] [%s]",`${channel_id[0]}/${channel_id[1]}`);
			} break;
			default: debugger;
		}
	}
	/** @arg {MicroformatEmbed} x */
	MicroformatEmbed(x) {
		const {iframeUrl: a,flashUrl: b,width: c,height: d,flashSecureUrl: e,...y}=x; this.g(y);
		this.z([a,b,e],a => this.primitive_of(a,"string"));
		this.primitive_of(x.flashSecureUrl,"string");
		this.z([c,d],a => this.primitive_of(a,"number"));
	}
	/** @private @arg {GetNotificationMenuJson} x */
	GetNotificationMenuJson(x) {
		const {responseContext,actions,trackingParams,...y}=x;
		this.ResponseContext(responseContext);
		this.z(actions,a => this.OpenPopupAction(a));
		this.trackingParams(trackingParams);
		this.save_keys("GetNotificationMenuJson",x);
		this.g(y);
	}
	/** @private @arg {YtApiNext} x */
	YtApiNext(x) {
		let z;
		/** @template {YtApiNext} T @arg {T} x @returns {Omit<T,"engagementPanels">} */
		let g=x => {
			if("engagementPanels" in x) {
				const {engagementPanels: a,...y}=x;
				this.z(a,a => this.EngagementPanel(a));
				return y;
			}
			return x;
		};
		if("currentVideoEndpoint" in x) {
			const v=this.filter_response_endpoints(g(x));
			const {
				responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,topbar,pageVisualEffects,frameworkUpdates,
				...y
			}=v; z=y;
			this.ResponseContext(responseContext);
		} else if("engagementPanels" in x) {
			const v=this.filter_response_endpoints(g(x));
			const {responseContext,trackingParams,...y}=v; z=y;
			this.ResponseContext(responseContext);
		} else {
			const v=this.filter_response_endpoints(g(x));
			const {responseContext,trackingParams,...y}=v; z=y;
			this.ResponseContext(responseContext);
			this.trackingParams(trackingParams);
		}
		this.save_keys("api_next",x);
		if(!this.is_empty_object(z)) console.log("[api_next] [%s]",Object.keys(x).join());
	}
	/** @private @arg {NotificationGetUnseenCount} x */
	NotificationGetUnseenCount(x) {
		const {responseContext: a,...y}=x;
		this.ResponseContext(a);
		this.save_keys("GetUnseenCount",x);
		if("actions" in x) {
			this.ResponseWithActions(x);
		} else if("unseenCount" in y) {
			this.notification_unseenCount(y);
		}
	}
	/** @arg {ResponseWithActions} x */
	ResponseWithActions(x) {
		const {responseContext: a,actions: b,...c}=x;
		this.ResponseContext(a);
		this.z(b,a => this.ResponseActions(a));
		this.empty_object(c);
	}
	/** @arg {ResponseActions} x */
	ResponseActions(x) {
		if("updateNotificationsUnseenCountAction" in x) {
			this.UpdateNotificationsUnseenCountAction(x);
		} else if("openPopupAction" in x) {
			this.OpenPopupAction(x);
		} else if("removeFromGuideSectionAction" in x) {
			this.RemoveFromGuideSectionAction(x);
		} else if("addToGuideSectionAction" in x) {
			this.AddToGuideSectionAction(x);
		} else {
			debugger;
		}
	}
	/** @arg {AddToGuideSectionAction} x */
	AddToGuideSectionAction(x) {
		const {addToGuideSectionAction: a,clickTrackingParams: b,...y}=x;
		this.AddToGuideSectionActionData(a);
		this.clickTrackingParams(b);
		this.g(y);
	}
	/** @arg {AddToGuideSectionActionData} x */
	AddToGuideSectionActionData(x) {
		const {handlerData: a,items: b,...y}=x;
		switch(a) {
			case "GUIDE_ACTION_ADD_TO_PLAYLISTS": break;
			default: debugger;
		};
		this.z(b,a => this.GuideEntryRenderer(a));
		this.g(y);
	}
	/** @arg {RemoveFromGuideSectionAction} x */
	RemoveFromGuideSectionAction(x) {
		const {removeFromGuideSectionAction: a,clickTrackingParams: b,...y}=x;
		this.RemoveFromGuideSectionActionData(a);
		this.clickTrackingParams(b);
		this.g(y);
	}
	/** @arg {RemoveFromGuideSectionActionData} x */
	RemoveFromGuideSectionActionData(x) {
		const {handlerData: a,guideEntryId: b,...y}=x;
		switch(a) {
			case "GUIDE_ACTION_REMOVE_FROM_PLAYLISTS": break;
			default: debugger; break;
		}
		this.parse_guide_entry_id(b);
		this.g(y);
	}
	/** @arg {`RD${string}`} x */
	parse_guide_entry_id(x) {
		this.x.get("string_parser").parse_guide_entry_id(x);
	}
	/** @arg {GuideEntryRenderer} x */
	GuideEntryRenderer(x) {
		const {guideEntryRenderer: a,...y}=x;
		this.GuideEntryRendererData(a);
		this.g(y);
	}
	/** @arg {GuideEntryRendererData} x */
	GuideEntryRendererData(x) {
		const {
			accessibility: a,navigationEndpoint: b,icon: c,trackingParams: d,formattedTitle: e,entryData: f,isPrimary: g,
			...h
		}=x;
		this.Accessibility(a);
		if(b) this.yt_endpoint(b);
		this.Icon(c);
		this.trackingParams(d);
		this.text_t(e);
		if(f) this.GuideEntryData(f);
		if(g) this.primitive_of(g,"boolean");
		let {serviceEndpoint: i,targetId: j,...y}=h;
		if(i) this.ServiceEndpoint(i,a => this.ServiceEndpointPlugin(a));
		if(j) this.parse_target_id(j);
		this.g(y);
	}
	/** @arg {GuideEntryServicePlugins} x */
	ServiceEndpointPlugin(x) {
		if("reelWatchEndpoint" in x) {
			const {reelWatchEndpoint: a,...y}=x; this.g(y);
			return this.ReelWatchEndpointData(a);
		} else if("signalServiceEndpoint" in x) {
			const {signalServiceEndpoint: a,...y}=x; this.g(y);
			this.SignalServiceEndpointData(a);
		} else {
			debugger;
		}
		x.signalServiceEndpoint;
	}
	/** @template {{}} T @arg {ServiceEndpoint<T>} x @arg {(x:T)=>void} f */
	ServiceEndpoint(x,f) {
		const {clickTrackingParams: a,commandMetadata: b,...y}=x;
		/** @type {any} */
		let c=y;
		f(as_cast(c));
	}
	/** @arg {GuideEntryData} x */
	GuideEntryData(x) {
		if(!x) {debugger; return;}
		const {guideEntryData: a,...y}=x; this.g(y);
		this.GuideEntryDataContent(a);
	}
	/** @arg {GuideEntryDataContent} x */
	GuideEntryDataContent(x) {
		const {guideEntryId: a,...y}=x; this.g(y);
		this.parse_guide_entry_id(a);
	}
	/** @arg {UpdateNotificationsUnseenCountAction} x */
	UpdateNotificationsUnseenCountAction(x) {
		const {clickTrackingParams: a,updateNotificationsUnseenCountAction: b,...y}=x;
		this.clickTrackingParams(a);
		this.UpdateNotificationsUnseenCount(b);
		this.g(y);
	}
	/** @arg {{unseenCount:number}} x */
	notification_unseenCount(x) {
		const {unseenCount: a,...c}=x;
		this.save_number("notification.unseenCount",a);
		this.empty_object(c);
	}
	/** @private @arg {string} x */
	clickTrackingParams(x) {
		if(this.x.get_param("log_click_tracking_params")) console.log("ctp",x);
		this.primitive_of(x,"string");
	}
	/** @arg {string} x */
	trackingParams(x) {
		if(this.x.get_param("log_tracking_params")) console.log("tp",x);
		this.primitive_of(x,"string");
	}
	/** @arg {UpdateNotificationsUnseenCount} x */
	UpdateNotificationsUnseenCount(x) {
		const {handlerData,timeoutMs,...y}=x;
		switch(handlerData) {
			case "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT": break;
			default: debugger;
		}
		this.primitive_of(timeoutMs,"number");
		this.notification_unseenCount(y);
	}
	/** @template T @arg {NonNullable<T>} x @arg {TypeOfType<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @arg {CommandMetadata} x */
	CommandMetadata(x) {
		const {webCommandMetadata: a,...y}=x;
		this.WebCommandMetadata(a);
		this.g(y);
	}
	/** @arg {YtPageTypeEnum} x */
	parse_page_type(x) {
		switch(x) {
			case "WEB_PAGE_TYPE_BROWSE": case "WEB_PAGE_TYPE_CHANNEL": case "WEB_PAGE_TYPE_PLAYLIST": case "WEB_PAGE_TYPE_SEARCH":
			case "WEB_PAGE_TYPE_SETTINGS": case "WEB_PAGE_TYPE_SHORTS": case "WEB_PAGE_TYPE_WATCH":
			case "WEB_PAGE_TYPE_UNKNOWN": break;
			default: console.log("[new_page_type] [%s]",x); debugger; break;
		}
	}
	/** @arg {WebCommandMetadata} x */
	WebCommandMetadata(x) {
		const {url: a,webPageType: b,rootVe: c,apiUrl: d,sendPost: e,ignoreNavigation: f,...y}=x;
		this.z([e,f],a => a!==void 0? this.primitive_of(a,"boolean"):0);
		if(a!==void 0) this.parse_url(a);
		if(d!==void 0) this.parse_url(d);
		if(b!==void 0) this.parse_page_type(b);
		if(c!==void 0) this.save_root_visual_element(c);
		this.g(y);
	}
	/** @arg {TwoColumnBrowseResultsRenderer} x */
	TwoColumnBrowseResultsRenderer(x) {
		if(!x) {
			debugger;
		}
		const {twoColumnBrowseResultsRenderer,...y}=x;
		this.TwoColumnBrowseResultsData(twoColumnBrowseResultsRenderer);
		this.save_keys("TwoColumnBrowseResultsRenderer",x);
		this.g(y);
	}
	/** @arg {TwoColumnBrowseResultsData} x */
	TwoColumnBrowseResultsData(x) {
		const {tabs: a,secondaryContents: b,...y}=x;
		this.z(a,a => this.ResultRenderer(a));
		if(b) this.SecondaryContents(b);
		this.g(y);
	}
	/** @arg {ResultRenderer} x */
	ResultRenderer(x) {
		if("tabRenderer" in x) {
			const {tabRenderer: a,...y}=x;
			this.TabRenderer(a);
			return this.g(y);
		}
		if("expandableTabRenderer" in x) {
			const {expandableTabRenderer: a,...y}=x;
			this.ExpandableTabData(a);
			return this.g(y);
		}
		debugger;
	}
	/** @arg {ExpandableTabData} x */
	ExpandableTabData(x) {
		const {endpoint: a,title: b,selected: c,expandedText: d,content: e,...y}=x;
		this.yt_endpoint(a);
		this.save_string("title",b);
		this.primitive_of(c,"boolean");
		if(d) this.primitive_of(d,"string");
		if(e) {
			if("sectionListRenderer" in e) {
				this.w(e,a => this.SectionListData(a,a => {
					console.log(a);
					debugger;
				}));
			} else debugger;
		}
		return this.g(y);
	}
	/** @arg {TabData} x */
	TabRenderer(x) {
		if("content" in x) {
			const {content: a,selected: b,trackingParams: c,...y}=x;
			if("richGridRenderer" in a) {
				return;
			}
			if("sectionListRenderer" in a) {
				return;
			}
			this.primitive_of(b,"boolean");
			this.trackingParams(c);
			this.g(y);
			return;
		}
		const {endpoint: a,title: b,trackingParams: c,...y}=x;
		this.yt_endpoint(a);
		this.primitive_of(b,"string");
		this.trackingParams(c);
		this.g(y);
	}
	/** @private @arg {ResponseContext} x */
	ResponseContext(x) {
		this.save_keys("ResponseContext",x);
		const {
			mainAppWebResponseContext: a,serviceTrackingParams: b,webResponseContextExtensionData: c,
			maxAgeSeconds: d,stateTags: e,consistencyTokenJar: f,
			...y
		}=x;
		this.MainAppWebResponseContextData(a);
		let tracking_handler=this.x.get("service_tracking");
		this.z(b,a => tracking_handler.set_service_params(a));
		tracking_handler.on_complete_set_service_params();
		this.WebResponseContextExtensionData(c);
		d&&this.save_number(`${this.current_response_type}.response.maxAgeSeconds`,d);
		e&&this.RelevantStateTags(e);
		f&&this.ConsistencyTokenJarData(f);
		this.g(y);
	}
	/** @arg {MainAppWebResponseContextData} x */
	MainAppWebResponseContextData(x) {
		const {datasyncId,loggedOut,...y}=x;
		this.g(y);
	}
	/** @arg {WebResponseContextExtensionData} x */
	WebResponseContextExtensionData(x) {
		const {ytConfigData: a,webPrefetchData: b,hasDecorated: c,...y}=x;
		if(a) this.YtConfigData(a);
		if(b) this.WebPrefetchData(b);
		if(c!==void 0) this.primitive_of(c,"boolean");
		this.g(y);
	}
	/** @arg {YtConfigData} x */
	YtConfigData(x) {
		const {rootVisualElementType: a,sessionIndex: b,visitorData: c,...y}=x;
		this.save_root_visual_element(a);
		this.save_number("YtConfigData.rootVisualElementType",a);
		this.save_number("YtConfigData.sessionIndex",b);
		this.primitive_of(c,"string");
		this.g(y);
	}
	/** @arg {YtWatchPageResponse} x */
	YtWatchPageResponse(x) {
		const {page: a,playerResponse: b,endpoint: c,response: d,url: e,previousCsn: f,...y}=x;
		if(a!=="watch") debugger;
		this.PlayerResponse(b);
		this.yt_endpoint(c);
		this.WatchNextResponse(d);
		this.parse_url(e);
		if(f) this.previousCsn(f);
		this.g(y);
	}
	/** @arg {string} x */
	previousCsn(x) {
		let csn=base64_dec.decode_str(x.replaceAll(".","="));
		console.log("[prev_csn]",csn);
	}
	/** @arg {WatchNextResponse} x */
	WatchNextResponse(x) {
		let t=this;
		/** @this {typeof t} @arg {typeof x} x */
		function p1(x) {
			const {currentVideoEndpoint: a,engagementPanels: b,frameworkUpdates: c,onResponseReceivedEndpoints: d,...y}=x;
			this.yt_endpoint(a);
			this.z(b,a => this.EngagementPanelSectionListRenderer(a));
			if(c) this.FrameworkUpdates(c);
			this.z(d,a => this.yt_endpoint(a));
			return y;
		}
		/** @this {typeof t} @arg {typeof x} x */
		function p2(x) {
			const {pageVisualEffects: b,playerOverlays: c,responseContext: d,topbar: e,...y}=p1.call(this,x);
			this.z(b,a => this.CinematicContainerRenderer(a));
			return y;
		}
		const {trackingParams: a,contents: b,...y}=p2.call(this,x);
		this.trackingParams(a);
		if(b) this.TwoColumnWatchNextResults(b);
		this.g(y);
	}
	/** @arg {CinematicContainerRenderer} x */
	CinematicContainerRenderer(x) {
		if("cinematicContainerRenderer" in x) {
			return this.w(x,a => this.CinematicContainerData(a));
		}
		debugger;
	}
	/** @arg {CinematicContainerData} x */
	CinematicContainerData(x) {
		const {backgroundImageConfig: a,gradientColorConfig: b,presentationStyle: c,config: d,...y}=x; this.g(y);
		if(a) this.ThumbnailsList(a);
		this.GradientColorConfigStart(b[0]);
		this.GradientColorConfigMid(b[1]);
		this.GradientColorConfigEnd(b[2]);
		if(b.length!==3) debugger;
		switch(c) {
			case "CINEMATIC_CONTAINER_PRESENTATION_STYLE_DYNAMIC_BLURRED": break;
			case void 0: break;
			default: debugger;
		}
		this.PageVisualEffectsConfig(d);
	}
	/** @arg {GradientColorConfigEnd} x */
	GradientColorConfigEnd(x) {
		if(x.darkThemeColor!==0xff000000) debugger;
		if(x.startLocation!==1) debugger;
	}
	/** @arg {GradientColorConfigMid} x */
	GradientColorConfigMid(x) {
		if(x.darkThemeColor!==0x7f000000) debugger;
	}
	/** @arg {GradientColorConfigStart} x */
	GradientColorConfigStart(x) {
		if(x.darkThemeColor!==0x99000000) debugger;
		if(x.startLocation!==0) debugger;
	}
	/** @arg {PageVisualEffectsConfig} x */
	PageVisualEffectsConfig(x) {
		let a=this.parse_theme_background_vars(x);
		let b=this.parse_color_source_vars(a);
		const {animationConfig: c,applyClientImageBlur: d,blurStrength: e,...y}=b; this.g(y);
		this.AnimationConfig(c);
		this.primitive_of(d,"boolean");
		if(e!==5) debugger;
	}
	/** @arg {AnimationConfig} x */
	AnimationConfig(x) {
		const {minImageUpdateIntervalMs: a,crossfadeDurationMs: b,crossfadeStartOffset: c,maxFrameRate: d,...y}=x; this.g(y);
		switch(a) {
			case 10000: break;
			case 5000: break;
			default: debugger;
		}
		if(b!==5000) debugger;
		if(c!==1) debugger;
		if(d!==30) debugger;
	}
	/** @template {ThemeBackgroundVars} T @arg {T} x @returns {Omit<T,keyof ThemeBackgroundVars>} */
	parse_theme_background_vars(x) {
		const {lightThemeBackgroundColor: a,darkThemeBackgroundColor: b,...y}=x;
		if(a!==0xffffff) console.log("light theme background color",a);
		if(b!==0xff000000) console.log("dark theme background color",b);
		return y;
	}
	/** @template {number} T  @arg {T} a @arg {T} b */
	float_cmp(a,b) {
		let epsilon=0.0000001;
		let table=[
			a>(b-epsilon),
			a<(b-epsilon),
			a>(b+epsilon),
			a<(b+epsilon),
			b>(a-epsilon),
			b<(a-epsilon),
			b>(a+epsilon),
			b<(a+epsilon),
		];
		table;
		if(a>(b-epsilon)&&a<(b+epsilon)) return true;
		return false;
	}
	/** @template {ColorSourceVars} T @arg {T} x @returns {Omit<T,keyof ColorSourceVars>}  */
	parse_color_source_vars(x) {
		const {
			colorSourceHeightMultiplier: a,colorSourceSizeMultiplier: b,
			colorSourceWidthMultiplier: c,bottomColorSourceHeightMultiplier: d,
			maxBottomColorSourceHeight: e,
			...y
		}=x;
		if(a!==2) debugger;
		if(b!==1.4) debugger;
		if(c!==1.5) debugger;
		if(!this.float_cmp(d,0.67)) debugger;
		if(e!==260) debugger;
		return y;
	}
	/** @arg {GradientColorConfigItem} x */
	GradientColorConfigItem(x) {
		if("startLocation" in x) {
			const {darkThemeColor: b,startLocation: c,...z}=x; this.g(z);
			console.log("gradient dark theme color",b.toString(16));
			console.log("gradient start location",c);
			return;
		}
		const {darkThemeColor: b,...y}=x; this.g(y);
		console.log("gradient dark theme color",b.toString(16));
	}
	/** @arg {ThumbnailsList} x */
	ThumbnailsList(x) {
		const {thumbnail,trackingParams,...y}=x; this.g(y);
		this.Thumbnail(x.thumbnail);
	}
	/** @arg {TwoColumnWatchNextResults} x */
	TwoColumnWatchNextResults(x) {
		const {twoColumnWatchNextResults: a,...y}=x;
		this.TwoColumnWatchNextResultsData(a);
		this.g(y);
	}
	/** @arg {EngagementPanelSectionListRenderer} x */
	EngagementPanelSectionListRenderer(x) {
		const {engagementPanelSectionListRenderer: a,...y}=x;
		this.EngagementPanelSectionListData(a);
		this.g(y);
	}
	/** @arg {FrameworkUpdates} x */
	FrameworkUpdates(x) {
		if(!x) {debugger; return;}
		const {entityBatchUpdate: a,elementUpdate: b,...y}=x;
		this.EntityBatchUpdateData(a);
		if(b) this.ElementUpdate(b);
		this.g(y);
	}
	/** @arg {ElementUpdate} x */
	ElementUpdate(x) {
		const {updates: a,...y}=x;
		this.z(a,a => this.ElementUpdateItem(a));
		this.g(y);
	}
	/** @arg {ElementUpdateItem} x */
	ElementUpdateItem(x) {
		if("templateUpdate" in x) {
			const {templateUpdate: a,...y}=x; this.g(y);
			this.TemplateUpdateData(a);
		} else if("resourceStatusInResponseCheck" in x) {
			const {resourceStatusInResponseCheck: a,...y}=x; this.g(y);
			this.ResourceStatusInResponseCheckData(a);
		} else {
			debugger;
		}
	}
	/** @arg {TemplateUpdateData} x */
	TemplateUpdateData(x) {
		const {identifier: a,serializedTemplateConfig: b,dependencies: c,...y}=x; this.g(y);
		let id=a.split("|");
		console.log(id);
		this.decode_template_protobuf(b);
		this.z(c,a => {
			let id=a.split("|");
			console.log(id);
		});
		this.empty_object(y);
	}
	/** @arg {MyReader} reader @arg {DecTypeNum[]} results */
	unpack_children_reader_result(reader,results) {
		/** @type {DecTypeNum[]} */
		let out=[];
		for(let item of results) {
			switch(item[0]) {
				case "child": {
					let buffer=item[2];
					reader.pos=buffer.byteOffset;
					let res=reader.try_read_any(buffer.byteLength);
					if(!res) {out.push(item); break;}
					let unpack=this.unpack_children_reader_result(reader,res);
					if(!unpack) {out.push(item); break;}
					out.push(["struct",item[1],unpack]);
				} break;
				case "info": break;
				default: out.push(item); break;
				case "error": return null;
			}
		}
		return out;
	}
	/** @arg {string} x */
	decode_template_protobuf(x) {
		let binary=decode_url_b64(x);
		let reader=new MyReader(binary);
		reader.pos=7;
		let packed_reader_results=reader.try_read_any();
		if(!packed_reader_results) return;
		let no_children=this.unpack_children_reader_result(reader,packed_reader_results);
		if(!no_children) return;
		let root_data=[];
		for(let struct of no_children) {
			switch(struct[0]) {
				case "child": {
					let res=struct[2];
					console.log("[template_child_iter_child]",res);
				} break;
				case "struct": {
					/** @type {Map<number,DecTypeNum[][]>} */
					let struct_map=new Map;
					let res=struct[2];
					for(let member of res) {
						if(member[0]!=="struct") {
							console.log(member);
							continue;
						}
						let [,field,value]=member;
						let cur=struct_map.get(field);
						if(cur) {
							cur.push(value);
							continue;
						}
						struct_map.set(field,[value]);
					}
					let at_1=struct_map.get(1);
					if(!at_1) continue;
					let at_2=struct_map.get(2);
					if(!at_2) continue;
					let at_1_f=at_1.map(a => this.decode_template_element(a));
					let at_2_f=at_2.map(a => this.decode_template_element(a));
					at_1_f.forEach(a => {
						const {children,...y}=a;
						/** @type {[typeof y|typeof children]} */
						let out=[y];
						if(children) out.push(children);
						console.log("[template_child_iter_1]",...out);
						a;
					});
					at_2_f.forEach(a => {
						const {children,...y}=a;
						/** @type {[typeof y|typeof children]} */
						let out=[y];
						if(children) out.push(children);
						iterate_template_element(children);
						/** @arg {TemplateElement} x */
						function iterate_template_element(x) {
							let res=Object.entries(x);
							for(let i of res) {
								console.log('template_iter',i);
							}
						}
						console.log("[template_child_iter_2]",...out);
						a;
					});
				} break;
				default: root_data.push(struct);
			}
		}
		console.log("template_root_data",...root_data);
	}
	/** @arg {DecTypeNum[]} x */
	decode_template_element(x) {
		let a=this.decode_template_element_1(x);
		return this.decode_template_element_2(a);
	}
	/** @arg {TemplateElement} x */
	decode_template_element_2(x) {
		let res_obj={};
		if(x.f_n1!==void 0) res_obj.index_unk_1=x.f_n1;
		if(x.f_n3!==void 0) res_obj.type_enum_3=x.f_n3;
		if(x.f_n2!==void 0) res_obj.attr_enum_2=x.f_n2;
		if(x.f_o4!==void 0) res_obj.children=x.f_o4;
		let r=filter_out_keys(get_keys_of(x),split_string("f_n1,f_n2,f_n3,f_o4"));
		if(r.length>0) debugger;
		return res_obj;
	}
	/** @arg {DecTypeNum[]} x */
	decode_template_element_1(x) {
		/** @type {TemplateElement} */
		let res_obj={};
		for(let it of x) {
			switch(it[0]) {
				case "data32": {
					let [,f,v]=it;
					res_obj[`f_n${f}`]=v;
				} break;
				case "data_fixed32": res_obj[`f_n${it[1]}`]=it[2]; break;
				case "child": res_obj[`f_s${it[1]}`]=decoder.decode(it[2]); break;
				case "struct": {
					let [,f,v]=it;
					res_obj[`f_o${f}`]=this.decode_template_element_1(v);
				} break;
				case "data64": res_obj[`f_n${it[1]}`]=it[2]; break;
				case "data_fixed64": res_obj[`f_n${it[1]}`]=it[2]; break;
				default: debugger;
			}
		}
		return res_obj;
	}
	/** @arg {ResourceStatusInResponseCheckData} x */
	ResourceStatusInResponseCheckData(x) {
		const {resourceStatuses: a,serverBuildLabel: b,...y}=x; this.g(y);
		this.z(a,a => this.ElementResourceStatus(a));
		let pp=split_string(b,"_");
		if(pp.length!==4) debugger;
		if(pp[0]!=="boq") debugger;
		if(pp[1]!=="youtube-watch-ui") debugger;
		let pp_ver=pp[2];
		let ver=split_string(pp_ver,".");
		console.log('[server_build]',`${ver[0]}.${ver[1]}_${pp[3]}`);
	}
	/** @arg {ElementResourceStatus} x */
	ElementResourceStatus(x) {
		if(x.status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		console.log("[ElementResourceStatus_identifier]",split_string_once(x.identifier,"|"));
	}
	/** @arg {OpenPopupAction} x */
	OpenPopupAction(x) {
		const {clickTrackingParams: a,openPopupAction: b,...y}=x;
		this.clickTrackingParams(a);
		this.OpenPopupActionData(b);
		this.g(y);
	}
	/** @arg {OpenPopupActionData} x */
	OpenPopupActionData(x) {
		const {popup: a,popupType: b,...y}=x;
		x.popup;
		this.g(y);
	}
	/** @arg {YtChannelPageResponse} x */
	YtChannelPageResponse(x) {
		const {page,endpoint,response,url,...y}=x;
		this.yt_endpoint(endpoint);
		this.ChannelResponse(response);
		this.parse_url(url);
		this.g(y);
	}
	/** @arg {YtPlaylistPageResponse} x */
	YtPlaylistPageResponse(x) {
		const {page,endpoint,response,url,...y}=x;
		if(page!=="playlist") debugger;
		this.yt_endpoint(endpoint);
		this.PlaylistResponse(response);
		this.parse_url(url);
		this.g(y);
	}
	/** @arg {PlaylistResponse} x */
	PlaylistResponse(x) {
		const {responseContext: a,contents: b,header: c,metadata: d,trackingParams: e,topbar: f,microformat: g,sidebar: h,...y}=x;
		this.ResponseContext(a);
		this.TwoColumnBrowseResultsRenderer(b);
		this.PlaylistHeaderRenderer(c);
		this.PlaylistMetadataRenderer(d);
		this.trackingParams(e);
		this.DesktopTopbarRenderer(f);
		this.MicroformatDataRenderer(g);
		this.PlaylistSidebarRenderer(h);
		y;
	}
	/** @arg {DesktopTopbarRenderer} x */
	DesktopTopbarRenderer(x) {this.w(x,a => this.DesktopTopbarData(a));}
	/** @arg {YtSettingsPageResponse} x */
	YtSettingsPageResponse(x) {
		const {page: {},endpoint: a,response: b,url: c,...y}=x;
		this.yt_endpoint(a);
		this.SettingsResponseContent(b);
		this.parse_url(c);
		this.g(y);
	}
	/** @template {{onResponseReceivedEndpoints: YtEndpoint[]}|{}} T @arg {T} x @returns {Omit<T,"onResponseReceivedEndpoints">} */
	filter_response_endpoints(x) {
		if("onResponseReceivedEndpoints" in x) {
			const {onResponseReceivedEndpoints: a,...y}=x;
			this.z(a,ep => this.yt_endpoint(ep));
			return y;
		}
		return x;
	}
	/** @arg {SettingsResponseContent} x */
	SettingsResponseContent(x) {
		const {
			responseContext: a,contents: b,trackingParams: tp,topbar: c,sidebar: d,...y
		}=this.filter_response_endpoints(x);
		this.ResponseContext(a);
		this.TwoColumnBrowseResultsRenderer(b);
		if(get_keys_of_one(c)[0]!=="desktopTopbarRenderer") debugger;
		this.w(c,c => this.DesktopTopbarData(c));
		this.renderer(d);
		this.trackingParams(tp);
		this.g(y);
	}
	/** @arg {SettingsSidebarData} x */
	SettingsSidebarData(x) {
		const {items: a,title: b,...y}=x;
		this.z(a,a => this.CompactLinkRenderer(a));
		this.text_t(b);
		this.g(y);
	}
	/** @arg {TextRun} x */
	TextRun(x) {
		const {text: a,bold: b,navigationEndpoint: c,...y}=x;
		this.primitive_of(a,"string");
		if(b) this.primitive_of(b,"boolean");
		if(c) this.yt_endpoint(c);
		this.g(y);
	}
	/** @private @arg {TextT} x */
	text_t(x) {
		if(!x) {
			debugger;
			return;
		}
		const {runs: a,accessibility: b,simpleText: c,...y}=x;
		if(a) this.z(a,a => this.TextRun(a));
		if(b) this.Accessibility(b);
		if(c) this.primitive_of(c,"string");
		this.g(y);
	}
	/** @arg {CompactLinkRenderer} x */
	CompactLinkRenderer(x) {
		const {compactLinkRenderer,...y}=x;
		this.CompactLinkData(x.compactLinkRenderer);
		this.g(y);
	}
	/** @arg {GeneralRenderer} x */
	renderer(x) {
		if("settingsSidebarRenderer" in x) {
			const {settingsSidebarRenderer: a,...y}=x;
			this.SettingsSidebarData(a);
			this.g(y);
		}
	}
	/** @arg {YtShortsResponse} x */
	YtShortsResponse(x) {
		const {page: a,endpoint: b,response: c,playerResponse: d,reelWatchSequenceResponse: e,url: f,...y}=x;
		if(a!=="shorts") debugger;
		this.ReelWatchEndpoint(b);
		this.ReelResponse(c);
		this.PlayerResponse(d);
		this.ReelWatchSequenceResponse(e);
		this.parse_url(f);
		this.g(y);
	}
	/** @arg {RelevantStateTags} x */
	RelevantStateTags(x) {
		const {relevantStateTags: a,...y}=x;
		this.z(a,a => this.StateTag(a));
		this.g(y);
	}
	/** @arg {StateTag} x */
	StateTag(x) {
		if("onStateTagModified" in x) {
			const {stateTag: a,onStateTagModified: b,...y}=x;
			switch(b) {
				case "STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE": break;
				default: debugger;
			}
			this.g(y);
			return;
		}
		const {stateTag: a,instruction: b,...y}=x;
		switch(a) {
			case 3: break;
			default: debugger;
		}
		switch(b) {
			case "STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY": break;
			default: debugger;
		}
		this.g(y);
	}
	/** @arg {ConsistencyTokenJarData} x */
	ConsistencyTokenJarData(x) {
		const {encryptedTokenJarContents: a,expirationSeconds: b,...y}=x;
		this.primitive_of(a,"string");
		this.save_number("ConsistencyTokenJar.expirationSeconds",parseInt(b,10));
		if(b!=="600") debugger;
		this.g(y);
	}
	/** @type {string|null} */
	my_main_channel_id=null;
	/** @type {[string,string][]} */
	alt_channel_ids=[];
	/** @arg {DatasyncIdsResponse} x */
	DatasyncIdsResponse(x) {
		const {responseContext: a,datasyncIds: b,...y}=x;
		this.ResponseContext(a);
		/** @type {string[][]} */
		let c=[];
		this.z(b,a => c.push(a.split("||")));
		this.z(c,chan_id => {
			if(chan_id[1]==="") {
				this.save_string("my_main_channel_id",chan_id[0]);
				this.my_main_channel_id=chan_id[0];
			}
		});
		this.z(c,chan_ids => {
			if(chan_ids[1]!=="") {
				if(this.alt_channel_ids.findIndex(e => e[0]===chan_ids[0])<0) {
					this.alt_channel_ids.push([chan_ids[0],chan_ids[1]]);
				}
				this.save_string("my_brand_channel_id",chan_ids);
			}
		});
		if(this.my_main_channel_id) {
			this.alt_channel_ids.forEach(a => {
				if(a[1]!==this.my_main_channel_id) {
					console.log("alt channel not owned by main google account channel",a);
					debugger;
				}
			});
		}
		this.g(y);
	}
	/** @arg {GetAccountSwitcherEndpointResult} x */
	GetAccountSwitcherEndpointResult(x) {
		if(x.code!=="SUCCESS") {
			console.log("request failed",x);
			return;
		}
		const {code: {},data: a,...y}=x;
		this.GetAccountSwitcherEndpointResponse(a);
		this.g(y);
	}
	/** @arg {GetAccountSwitcherEndpointResponse} x */
	GetAccountSwitcherEndpointResponse(x) {
		const {responseContext: a,actions: b,selectText: c,...y}=x;
		this.ResponseContext(a);
		this.z(b,a => this.GetMultiPageMenuAction(a));
		if(!c) debugger;
		this.text_t(c);
		this.g(y);
	}
	/** @arg {GetMultiPageMenuAction} x */
	GetMultiPageMenuAction(x) {
		const {getMultiPageMenuAction: a,...y}=x;
		this.GetMultiPageMenuActionData(a);
		this.g(y);
	}
	/** @arg {GetMultiPageMenuActionData} x */
	GetMultiPageMenuActionData(x) {
		const {menu: a,...y}=x;
		this.MultiPageMenuRenderer(a);
		this.g(y);
	}
	/** @arg {MultiPageMenuRenderer} x */
	MultiPageMenuRenderer(x) {
		this.MultiPageMenuData(x.multiPageMenuRenderer);
	}
	/** @arg {MultiPageMenuData} x */
	MultiPageMenuData(x) {
		if(x.style!=="MULTI_PAGE_MENU_STYLE_TYPE_SWITCHER") debugger;
		const {header: a,sections: b,footer: c,style: {},...y}=x;
		this.SimpleMenuHeaderRenderer(a);
		this.z(b,a => this.AccountSectionListRenderer(a));
		this.MultiPageMenuSectionRenderer(c);
		this.g(y);
	}
	/** @arg {SimpleMenuHeaderRenderer} x */
	SimpleMenuHeaderRenderer(x) {
		this.SimpleMenuHeaderData(x.simpleMenuHeaderRenderer);
	}
	/** @arg {SimpleMenuHeaderData} x */
	SimpleMenuHeaderData(x) {
		const {buttons: a,title: b,...y}=x;
		this.z(a,a => this.ButtonRenderer(a));
		this.text_t(b);
		this.g(y);
	}
	/** @arg {AccountSectionListRenderer} x */
	AccountSectionListRenderer(x) {
		this.AccountSectionListData(x.accountSectionListRenderer);
	}
	/** @arg {AccountSectionListData} x */
	AccountSectionListData(x) {
		this.z(x.contents,v => this.AccountItemSectionRenderer(v));
	}
	/** @arg {AccountItemSectionRenderer} x */
	AccountItemSectionRenderer(x) {
		this.AccountItemSectionData(x.accountItemSectionRenderer);
	}
	/** @arg {AccountItemSectionData} x */
	AccountItemSectionData(x) {
		this.z(x.contents,v => {
			if("accountItem" in v) return this.AccountItem(v);
			this.CompactLinkData(v.compactLinkRenderer);
		});
	}
	/** @arg {AccountItem} x */
	AccountItem(x) {
		this.AccountItemData(x.accountItem);
	}
	/** @arg {MultiPageMenuSectionRenderer} x */
	MultiPageMenuSectionRenderer(x) {
		this.MultiPageMenuSectionData(x.multiPageMenuSectionRenderer);
	}
	/** @arg {MultiPageMenuSectionData} x */
	MultiPageMenuSectionData(x) {
		const {items: a,...y}=x;
		this.z(a,v => this.CompactLinkRenderer(v));
		this.g(y);
	}
	/** @arg {ButtonRenderer} x */
	ButtonRenderer(x) {
		const {buttonRenderer,...v}=x;
		this.ButtonData(x.buttonRenderer);
		this.empty_object(v);
	}
	/** @arg {WebPrefetchData} x */
	WebPrefetchData(x) {
		const {navigationEndpoints: a,...y}=x;
		this.z(a,v => this.yt_endpoint(v));
		this.g(y);
	}
	/** @arg {ReloadContinuationItemsCommandData} x */
	ReloadContinuationItemsCommandData(x) {
		this.z(x.continuationItems,v => {
			this.SectionItem(v);
		});
	}
	/** @arg {SectionItem} x */
	SectionItem(x) {
		if("richItemRenderer" in x) {
			const {richItemRenderer,...y}=x;
			this.RichItemData(x.richItemRenderer);
			this.g(y);
			return;
		} else if("richSectionRenderer" in x) {
			const {richSectionRenderer: a,...y}=x;
			this.RichSectionData(a);
			this.g(y);
			return;
		} else if("commentsHeaderRenderer" in x) {
			this.w(x,v => this.CommentsHeaderData(v));
		} else if("commentThreadRenderer" in x) {
			this.w(x,v => this.CommentThreadData(v));
		} else if("compactVideoRenderer" in x) {
			this.w(x,v => this.CompactVideoData(v));
		} else if("continuationItemRenderer" in x) {
			this.w(x,v => this.ContinuationItemData(v));
		} else {
			this.g(x);
		}
	}
	/** @arg {ContinuationItemData} x */
	ContinuationItemData(x) {
		const {trigger: a,continuationEndpoint: b,button: c,ghostCards: d,...y}=x;
		switch(a) {
			case "CONTINUATION_TRIGGER_ON_ITEM_SHOWN": break;
			default: debugger;
		}
		this.yt_endpoint(b);
		if(c) this.ButtonRenderer(c);
		if(d) this.GhostGridRenderer(d);
		this.g(y);
	}
	/** @arg {GhostGridRenderer} x */
	GhostGridRenderer(x) {
		const {ghostGridRenderer: a,...y}=x; this.g(y);
		this.GhostGridData(a);
	}
	/** @arg {GhostGridData} x */
	GhostGridData(x) {
		const {rows: a,...y}=x; this.g(y);
		switch(a) {
			default: debugger;
		}
	}
	/** @arg {RichItemData} x */
	RichItemData(x) {
		const {content: a,rowIndex: b,colIndex: c,...y}=x;
		this.RichItemContent(a);
		if(b!==void 0) this.primitive_of(b,"number");
		if(c!==void 0) this.primitive_of(c,"number");
		this.g(y);
	}
	/** @arg {RichItemContent} x */
	RichItemContent(x) {
		if("adSlotRenderer" in x) {
			const {adSlotRenderer: a,...y}=x;
			this.AdSlotData(a);
			this.g(y);
			return;
		}
		if("radioRenderer" in x) {
			const {radioRenderer: a,...y}=x;
			this.RadioData(a);
			this.g(y);
			return;
		}
		if("videoRenderer" in x) {
			const {videoRenderer: a,...y}=x;
			this.VideoData(a);
			this.g(y);
			return;
		}
		this.empty_object(x);
	}
	/** @arg {RadioData} x */
	RadioData(x) {
		const {...y}=x;
		this.g(y);
	}
	/** @arg {VideoData} x */
	VideoData(x) {
		const {...y}=x;
		this.g(y);
	}
	/** @arg {RichSectionData} x */
	RichSectionData(x) {
		const {content: a,...y}=x;
		this.RichSectionContent(a);
		this.g(y);
	}
	/** @template T @arg {PageAction<T>} x @arg {(x:T)=>void} f */
	PageAction(x,f) {
		const {page: a,...y}=x; this.g(y);
		f(a);
	}
	/** @arg {RichSectionContent} x */
	RichSectionContent(x) {
		if("richShelfRenderer" in x) {
			const {richShelfRenderer: a,...y}=x;
			this.RichShelfData(a);
			this.g(y);
			return;
		}
		if("inlineSurveyRenderer" in x) {
			const {inlineSurveyRenderer: a,...y}=x;
			this.InlineSurveyData(a);
			this.g(y);
			return;
		}
		this.empty_object(x);
	}
	/** @arg {AdSlotData} x */
	AdSlotData(x) {
		const {adSlotMetadata: a,fulfillmentContent: b,enablePacfLoggingWeb: c,...y}=x;
		this.AdSlotMetadata(a);
		this.FulfillmentContent(b);
		this.primitive_of(c,"boolean");
		this.g(y);
	}
	/** @arg {RichShelfData} x */
	RichShelfData(x) {
		const {icon: a,title: b,...y}=x;
		this.Icon(a);
		this.text_t(b);
		this.g(y);
	}
	/** @arg {AdSlotMetadata} x */
	AdSlotMetadata(x) {
		const {slotId: a,slotType: b,slotPhysicalPosition: c,...y}=x;
		let ss=split_string(a,":");
		this.z(ss,a => this.primitive_of(a,"string"));
		this.save_string("AdSlot.slotType",b);
		this.save_number("AdSlot.slotPhysicalPosition",c);
		this.g(y);
	}
	/** @arg {Accessibility} x */
	Accessibility(x) {
		if(!x) {
			debugger;
			return;
		}
		const {accessibilityData: a,...y}=x;
		this.AccessibilityData(a);
		this.g(y);
	}
	/** @arg {AccessibilityData} x */
	AccessibilityData(x) {
		if(!x) {
			debugger;
			return;
		}
		const {label: a,...y}=x;
		if(a) this.primitive_of(a,"string");
		this.g(y);
	}
	/** @arg {AccountsListResponse} x */
	AccountsListResponse(x) {
		const {responseContext: a,selectText: b,actions: c,...y}=x;
		this.ResponseContext(a);
		this.text_t(b);
		this.z(c,v => this.UpdateChannelSwitcherPageAction(v));
		this.save_keys("AccountsListResponse",x);
		this.g(y);
	}
	/** @arg {UpdateChannelSwitcherPageAction} x */
	UpdateChannelSwitcherPageAction(x) {
		const {updateChannelSwitcherPageAction: a,...y}=x; this.g(y);
		this.PageAction(a,a => this.ChannelSwitcherPageRenderer(a));
	}
	/** @arg {ChannelSwitcherPageRenderer} x */
	ChannelSwitcherPageRenderer(x) {
		const {channelSwitcherPageRenderer: a,...y}=x; this.g(y);
		this.ChannelSwitcherPage(a);
	}
	/** @arg {ChannelSwitcherPage} x */
	ChannelSwitcherPage(x) {
		const {contents,header,targetId,...y}=x;
		this.z(x.contents,a => this.ChannelSwitcherContent(a));
		this.parse_target_id(targetId);
		this.g(y);
	}
	/** @arg {ChannelSwitcherContent} x */
	ChannelSwitcherContent(x) {
		if("accountItemRenderer" in x) {
			this.w(x,a => this.AccountItemData(a));
		} else if("buttonRenderer" in x) {
			this.w(x,a => this.ButtonData(a));
		} else {
			debugger;
		}
	}
	/** @arg {AccountItemData} x */
	AccountItemData(x) {
		const {
			accountName: a,accountPhoto: b,isSelected: c,isDisabled: d,hasChannel: e,
			serviceEndpoint: f,accountByline: g,channelHandle: h,
			...y
		}=x;
		this.z([a,g,h],a => this.text_t(a));
		this.z([c,d,e],a => this.primitive_of(a,"boolean"));
		this.yt_endpoint(f);
		if(get_keys_of_one(b)[0]!=="thumbnails") debugger;
		this.Thumbnail(b);
		this.g(y);
	}
	/** @arg {ThumbnailItem} x */
	ThumbnailItem(x) {
		const {url: a,width: b,height: c,...y}=x;
		this.parse_url(a);
		this.z([b,c],v => v!==void 0&&this.primitive_of(v,"number"));
		this.g(y);
	}
	/** @arg {ButtonData} x */
	ButtonData(x) {
		this.save_keys("ButtonData",x);
		const {
			accessibility: a,command: b,icon: c,isDisabled: d,serviceEndpoint: e,size: f,style: g,text: h,trackingParams: i,
			navigationEndpoint: j,
			...y
		}=x;
		switch(g) {
			case "STYLE_DEFAULT": break;
			case "STYLE_SUGGESTIVE": break;
			case "STYLE_PRIMARY": break;
			case "STYLE_TEXT": break;
			case "STYLE_UNKNOWN": break;
			case void 0: break;
			default: debugger;
		}
		switch(f) {
			case "SIZE_DEFAULT": break;
			case "SIZE_SMALL": break;
			case void 0: break;
			default: debugger;
		}
		if(a) {
			if("accessibilityData" in a) {
				this.save_string("button_accessibility","accessibility_Accessibility");
				this.Accessibility(a);
			} else {
				this.save_string("button_accessibility","accessibility_AccessibilityData");
				this.AccessibilityData(a);
			}
		}
		if(b) this.yt_endpoint(b);
		if(c) {
			switch(c.iconType) {
				case "DELETE": break;
				case "NOTIFICATIONS_ACTIVE": break;
				case "NOTIFICATIONS_NONE": break;
				case "NOTIFICATIONS_OFF": break;
				case "SETTINGS": break;
				default: debugger; break;
			}
			this.Icon(c);
		}
		if(d) this.primitive_of(d,"boolean");
		if(e) this.yt_endpoint(e);
		if(i) this.trackingParams(i);
		if(h) this.text_t(h);
		if(j) this.yt_endpoint(j);
		{
			const {targetId: a,accessibilityData: b,...z}=y;
			if(a) this.parse_target_id(a);
			if(b) {
				if("accessibilityData" in b) {
					this.save_string("button_accessibility","accessibilityData_Accessibility");
					this.Accessibility(b);
				} else {
					this.save_string("button_accessibility","accessibilityData_AccessibilityData");
					this.AccessibilityData(b);
				}
			}
			this.empty_object(z);
		}
	}
	/** @arg {AnyIcon} x*/
	Icon(x) {
		if(!x) {debugger; return;}
		const {iconType: a,...y}=x;
		this.save_string(`icon_type`,a);
		this.g(y);
	}
	/** @arg {CommentsHeaderData} x */
	CommentsHeaderData(x) {
		this.save_keys("CommentsHeaderRenderer",x);
		const {
			countText: a,createRenderer: b,sortMenu: c,trackingParams: d,titleText: e,commentsCount: f,
			showSeparator: g,customEmojis: h,unicodeEmojisUrl: i,loggingDirectives: j,
			...y
		}=x;
		this.z([a,e,f],v => this.text_t(v));
		if(get_keys_of_one(b)[0]!=="commentSimpleboxRenderer") debugger;
		this.w(b,b => this.CommentSimpleboxData(b));
		if(get_keys_of_one(c)[0]!=="sortFilterSubMenuRenderer") debugger;
		this.w(c,c => this.SortFilterSubMenuData(c));
		this.trackingParams(d);
		this.primitive_of(g,"boolean");
		this.z(h,v => this.CustomEmoji(v));
		this.parse_url(i);
		this.LoggingDirectives(j);
		this.g(y);
	}
	/** @arg {SortFilterSubMenuData} x */
	SortFilterSubMenuData(x) {
		const {subMenuItems: a,title: b,icon: c,accessibility: d,tooltip: e,trackingParams: f,...y}=x;
		this.z(a,v => this.ActionSetPlaylistVideoOrder(v));
		this.primitive_of(b,"string");
		if(c) this.Icon(c);
		if(d) this.Accessibility(d);
		e!==void 0&&this.primitive_of(e,"string");
		this.trackingParams(f);
		this.g(y);
	}
	/** @arg {ResolveUrlCommandMetadata} x */
	ResolveUrlCommandMetadata(x) {
		const {isVanityUrl: a,parentTrackingParams: b,...y}=x;
		if(a) this.primitive_of(a,"boolean");
		this.save_keys("resolveUrlCommandMetadata",x);
		if(b) this.trackingParams(b);
		this.g(y);
	}
	/** @arg {CommentSimpleboxData} x */
	CommentSimpleboxData(x) {
		const {
			submitButton: a,cancelButton: b,authorThumbnail: c,
			placeholderText: d,trackingParams: e,avatarSize: f,emojiButton: g,
			emojiPicker: h,aadcGuidelinesStateEntityKey: i,
			...y
		}=x;
		this.z([a,b,g],a => this.ButtonRenderer(a));
		this.z([d],a => this.text_t(a));
		this.trackingParams(e);
		this.save_string("avatarSizeEnum",f);
		this.EmojiPickerRenderer(h);
		this.primitive_of(i,"string");
		this.save_keys("CommentSimpleboxData",x);
		this.g(y);
	}
	/** @arg {ReelItemWatch} x */
	ReelItemWatch(x) {
		const {responseContext: a,overlay: b,status: c,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=x;
		this.ResponseContext(a);
		this.w(b,a => this.ReelPlayerOverlayData(a));
		switch(c) {
			case "REEL_ITEM_WATCH_STATUS_SUCCEEDED": break;
			default: debugger;
		}
		this.g(y);
	}
	/** @arg {EngagementPanelSectionListRenderer} x */
	EngagementPanel(x) {
		if("engagementPanelSectionListRenderer" in x) {
			this.w(x,a => this.EngagementPanelSectionListData(a));
		} else {
			debugger;
		}
	}
	/** @arg {SecondaryContents} x */
	SecondaryContents(x) {
		this.save_keys("SecondaryContents",x);
		if("profileColumnRenderer" in x) {
			this.w(x,a => this.ProfileColumnData(a));
		} else if("browseFeedActionsRenderer" in x) {
			this.w(x,a => this.BrowseFeedActions(a));
		} else {
			debugger;
		}
	}
	/** @arg {BrowseFeedActions} x */
	BrowseFeedActions(x) {
		if(get_keys_of_one(x)[0]!=="contents") debugger;
		this.w(x,a => this.z(a,a => this.BrowseFeedContent(a)));
	}
	/** @arg {BrowseFeedContent} x */
	BrowseFeedContent(x) {
		let [k]=get_keys_of(x);
		if("buttonRenderer" in x) {
			this.w(x,a => this.ButtonData(a));
		}
		switch(k) {
			case "buttonRenderer": break;
		}
	}
	/** @arg {ProfileColumnData} x */
	ProfileColumnData(x) {
		if(get_keys_of_one(x)[0]!=="items") debugger;
		this.w(x,a => this.z(a,b => {
			if("profileColumnUserInfoRenderer" in b) {
				this.w(b,a => this.ProfileColumnUserInfoData(a));
				return;
			} else if("profileColumnStatsRenderer" in b) {
				this.w(b,c => this.ProfileColumnStatsData(c));
				return;
			} else {
				debugger;
			}
		}));
	}
	/** @arg {ProfileColumnStatsData} x */
	ProfileColumnStatsData(x) {
		if(get_keys_of_one(x)[0]!=="items") debugger;
		this.w(x,d => this.z(d,e => {
			if(get_keys_of_one(e)[0]!=="profileColumnStatsEntryRenderer") debugger;
			this.w(e,f => this.ProfileColumnStatsEntryData(f));
		}));
	}
	/** @arg {ProfileColumnStatsEntryData} x */
	ProfileColumnStatsEntryData(x) {
		const {label: a,value: b,...y}=x;
		this.z([a,b],a => this.text_t(a));
		this.g(y);
	}
	/** @arg {ProfileColumnUserInfoData} x */
	ProfileColumnUserInfoData(x) {
		this.Thumbnail(x.thumbnail);
	}
	/** @arg {Thumbnail} x */
	Thumbnail(x) {
		const {thumbnails: a,accessibility: b,...y}=x;
		this.z(a,a => this.ThumbnailItem(a));
		if(b) this.Accessibility(b);
		this.g(y);
	}
	/** @template T @template U @arg {SectionListData<T,U>} x @arg {(x:T,v:U)=>void} f */
	SectionListData(x,f) {
		this.save_keys("SectionListData",x);
		const {contents: a,trackingParams: b,...y}=x;
		this.z(a,a => this.SectionListItem(a,f));
		this.trackingParams(b);
		this.g(y);
	}
	/** @template T @template U @arg {SectionListItem<T,U>} x @arg {(x:T,v:U)=>void} f */
	SectionListItem(x,f) {
		if("itemSectionRenderer" in x) {
			this.w(x,a => this.ItemSectionData(a,f));
		} else {
			debugger;
		}
	}
	/** @template T @template U @arg {ItemSectionData<T,U>} x @arg {(x:T,v:U)=>void} f */
	ItemSectionData(x,f) {
		this.save_keys("SectionListData",x);
		const {contents: a,trackingParams: b,sectionIdentifier,targetId,...y}=x;
		this.z(a,a => this.ItemSectionItem(a));
		this.trackingParams(b);
		f(sectionIdentifier,targetId);
		this.g(y);
	}
	/** @type {ItemSectionItemMap} */
	item_section_map={
		connectedAppRenderer: "ConnectedAppData",
		pageIntroductionRenderer: "PageIntroductionData",
		playlistVideoListRenderer: "PlaylistVideoListData",
		searchPyvRenderer: "SearchPyvData",
		settingsOptionsRenderer: "SettingsOptionsData",
		shelfRenderer: "ShelfData",
		videoRenderer: "VideoData",
		reelShelfRenderer: "ReelShelfData",
	};
	/** @arg {ItemSectionItem} x */
	ItemSectionItem(x) {
		let t=this;
		let y=get_keys_of(x);
		let [k]=y;
		/** @arg {typeof t} t @template T @arg {T|undefined} x @arg {{}} b @returns {asserts x is T} */
		let n=(t,x,b) => {if(!x) throw new Error(); t.g(b);};
		k="connectedAppRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.ConnectedAppData(a);
		}
		k="pageIntroductionRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.PageIntroductionData(a);
		}
		k="playlistVideoListRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.PlaylistVideoListData(a);
		}
		k="settingsOptionsRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.SettingsOptionsData(a);
		}
		k="shelfRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.ShelfData(a);
		}
		k="searchPyvRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.SearchPyvData(a);
		}
		k="videoRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.VideoData(a);
		}
		k="reelShelfRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.ReelShelfData(a);
		}
		k="continuationItemRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.ContinuationItemData(a);
		}
		k="commentsEntryPointHeaderRenderer";
		if(k in x) {
			const {[k]: a,...b}=x; n(this,a,b);
			return this.CommentsEntryPointHeaderData(a);
		}
		let m=get_keys_of(x);
		for(let k of m) {
			if(k in this.item_section_map) continue;
			console.log('[new_section_item] [%s]',k);
			debugger;
		}
	}
	/** @arg {CommentsEntryPointHeaderData} x */
	CommentsEntryPointHeaderData(x) {
		const {headerText: a,onTap: b,trackingParams: c,commentCount: d,contentRenderer: e,targetId: f,...y}=x; this.g(y);
		this.z([a,d],this.text_t);
		this.CommandExecutorCommand(b);
		this.trackingParams(c);
		this.CommentsEntryPointTeaserRenderer(e);
		if(f!=="comments-entry-point-header-identifier") debugger;
	}
	/** @arg {CommandExecutorCommand} x */
	CommandExecutorCommand(x) {
		const {clickTrackingParams,commandExecutorCommand,...y}=x; this.g(y);
		this.clickTrackingParams(clickTrackingParams);
		this.CommandsTemplate(x.commandExecutorCommand,a => this.CommandExecutorData(a));
	}
	/** @arg {ChangeEngagementPanelVisibilityActionData} x */
	ChangeEngagementPanelVisibilityActionData(x) {
		this.save_enum("engagement-panel",x.targetId);
		this.save_enum("ENGAGEMENT_PANEL_VISIBILITY",x.visibility);
	}
	/** @arg {ScrollToEngagementPanelData} x */
	ScrollToEngagementPanelData(x) {
		this.save_enum("engagement-panel",x.targetId);
		this.parse_target_id(x.targetId);
	}
	/** @arg {CommandExecutorAction} x */
	CommandExecutorData(x) {
		const {clickTrackingParams,...y}=x;
		if("changeEngagementPanelVisibilityAction" in y) {
			this.ChangeEngagementPanelVisibilityActionData(y.changeEngagementPanelVisibilityAction);
		} else if("scrollToEngagementPanelCommand" in y) {
			this.ScrollToEngagementPanelData(y.scrollToEngagementPanelCommand);
		} else if("openPopupAction" in y) {
			this.OpenPopupActionData(y.openPopupAction);
		} else {
			let td=this.generate_typedef(x);
			console.log(td);
			debugger;
		}
	}
	/** @arg {ChangeEngagementPanelVisibilityAction} x */
	ChangeEngagementPanelVisibilityAction(x) {
		const {clickTrackingParams,changeEngagementPanelVisibilityAction,...y}=x; this.g(y);
	}
	/** @template T @arg {CommandsTemplate<T>} x @arg {(x:T)=>void} f */
	CommandsTemplate(x,f) {
		this.z(x.commands,f);
	}
	/** @arg {CommentsEntryPointTeaserRenderer} x */
	CommentsEntryPointTeaserRenderer(x) {
		this.CommentsEntryPointTeaserData(x.commentsEntryPointTeaserRenderer);
	}
	/** @arg {CommentsEntryPointTeaserData} x */
	CommentsEntryPointTeaserData(x) {
		const {teaserAvatar: a,teaserContent: b,trackingParams: c,...y}=x; this.g(y);
		this.Thumbnail(a);
		this.text_t(b);
		this.trackingParams(c);
	}
	/** @arg {ReelShelfData} x */
	ReelShelfData(x) {
		const {icon: a,items: b,title: c,trackingParams: d,...y}=x; this.g(y);
		this.Icon(a);
		this.z(b,a => this.ReelItemRenderer(a));
		this.text_t(c);
		this.trackingParams(d);
	}
	/** @arg {ReelItemRenderer} x */
	ReelItemRenderer(x) {
		const {reelItemRenderer: a,...y}=x; this.g(y);
		this.ReelItemData(a);
	}
	/** @arg {ReelItemData} x */
	ReelItemData(x) {
		const {
			accessibility: a,headline: b,loggingDirectives: c,menu: d,videoId: e,thumbnail: f,
			viewCountText: g,navigationEndpoint: h,trackingParams: i,style: j,videoType: k,
			...y
		}=x; this.g(y);
		this.Accessibility(a);
		this.text_t(b);
		this.LoggingDirectives(c);
		this.MenuRenderer(d);
		this.primitive_of(e,"string");
		this.Thumbnail(f);
		this.text_t(g);
		this.NavigationEndpoint(h,a => this.w(a,a => this.ReelWatchEndpointData(a)));
		this.trackingParams(i);
		this.save_enum("REEL_ITEM_STYLE",j);
		this.save_enum("REEL_VIDEO_TYPE",k);
	}
	/** @template T @arg {NavigationEndpoint<T>} x @arg {(x:Omit<NavigationEndpoint<T>,"clickTrackingParams"|"commandMetadata">)=>void} f */
	NavigationEndpoint(x,f) {
		const {clickTrackingParams: a,commandMetadata: b,...y}=x;
		this.clickTrackingParams(a);
		this.CommandMetadata(b);
		f(y);
	}
	/** @arg {MenuRenderer} x */
	MenuRenderer(x) {
		this.MenuData(x.menuRenderer);
	}
	/** @arg {MenuData} x */
	MenuData(x) {
		this.Accessibility(x.accessibility);
		this.z(x.items,a => this.MenuServiceItem(a));
	}
	/** @arg {MenuServiceItem} x */
	MenuServiceItem(x) {
		this.MenuServiceItemRenderer(x.menuServiceItemRenderer);
	}
	/** @arg {MenuServiceItemRenderer} x */
	MenuServiceItemRenderer(x) {
		console.log(x.serviceEndpoint);
		debugger;
	}
	/** @arg {SearchPyvData} x */
	SearchPyvData(x) {
		const {ads,trackingParams,...y}=x; this.g(y);
		this.z(ads,a => this.AdSlotRenderer(a));
		this.trackingParams(trackingParams);
	}
	/** @arg {AdSlotRenderer} x */
	AdSlotRenderer(x) {
		this.AdSlotData(x.adSlotRenderer);
	}
	/** @arg {PlayerStoryboardSpecRenderer} x */
	PlayerStoryboardSpecRenderer(x) {
		const {playerStoryboardSpecRenderer: a,...y}=x;
		this.PlayerStoryboardSpecData(a);
		this.g(y);
	}
	/** @arg {AccountSetSetting} x */
	AccountSetSetting(x) {
		this.save_keys("AccountSetSetting",x);
		const {responseContext: a,settingItemId: b,...y}=x;
		switch(b) {
			case "407": break;
			default: debugger; break;
		}
		this.g(y);
	}
	/** @template T @arg {CommandTemplate<T>} x @arg {(x:T)=>void} f */
	CommandTemplate(x,f) {
		if("command" in x) {
			const {command: a,trackingParams: b}=x;
			f(a);
			this.trackingParams(b);
		} else {
			debugger;
		}
	}
	/** @arg {ReelWatchSequence} x */
	ReelWatchSequence(x) {
		this.save_keys("ReelWatchSequence",x);
		const {responseContext: a,entries: b,trackingParams,continuationEndpoint,...y}=x;
		this.ReelWatchEntries(b);
		this.trackingParams(trackingParams);
		this.ContinuationEndpoint(continuationEndpoint);
		this.g(y);
	}
	/** @arg {ContinuationEndpoint} x */
	ContinuationEndpoint(x) {
		const {commandMetadata: a,continuationCommand: b,...y}=this.handle_clickTrackingParams(x); this.g(y);
		if(a) this.CommandMetadata(a);
		this.ContinuationCommand(b);
	}
	/** @arg {ContinuationCommand} x */
	ContinuationCommand(x) {
		const {request: a,token: b,...y}=x; this.g(y);
		this.save_enum("CONTINUATION_REQUEST_TYPE",a);
		this.decode_continuation_token(b);
	}
	/** @arg {EncodedURIComponent} x */
	decode_continuation_token(x) {
		let dec=decode_url_b64_proto_obj(decodeURIComponent(x));
		console.log("[continuation_token]",dec);
	}
	/** @arg {CommandTemplate<ReelWatchEndpoint>[]} x */
	ReelWatchEntries(x) {
		this.z(x,a => this.CommandTemplate(a,a => this.ReelWatchEndpoint(a)));
	}
	/** @template {EndpointBase} T @arg {T} x */
	handle_common_endpoint(x) {
		const {clickTrackingParams: a,commandMetadata: b,...y}=x;
		this.clickTrackingParams(a);
		if(b) this.CommandMetadata(b);
		return y;
	}
	/** @arg {ReelWatchEndpoint} x */
	ReelWatchEndpoint(x) {
		if("reelWatchEndpoint" in x) {
			const {reelWatchEndpoint,...y}=this.handle_common_endpoint(x); this.g(y);
			this.ReelWatchEndpointData(reelWatchEndpoint);
		} else {
			debugger;
		}
	}
	/** @arg {ReelWatchEndpointData} x */
	ReelWatchEndpointData(x) {
		const {videoId: a,playerParams: b,overlay: c,params: d,sequenceProvider: f,inputType: g,...y}=x; this.g(y);
		let h_=this.x.get("string_parser");
		if(a) h_.parse_video_id(a);
		let dec_1=decode_url_b64_proto_obj(b);
		if(dec_1) console.log("[reel_watch_endpoint_player_params]",...dec_1);
		let dec_2=decode_url_b64_proto_obj(decodeURIComponent(d));
		if(dec_2) console.log("[reel_watch_endpoint_params]",...dec_2);

	}
	/** @arg {JsonFeedbackData} x */
	JsonFeedbackData(x) {
		this.save_keys("JsonFeedbackData",x);
		const {responseContext: a,...y}=x;
		this.g(y);
	}
	/** @arg {JsonGetTranscriptData} x */
	JsonGetTranscriptData(x) {
		this.save_keys("JsonGetTranscriptData",x);
		const {responseContext: a,actions: b,trackingParams: c,...y}=x;
		this.ResponseContext(a);
		this.z(b,a => this.UpdateEngagementPanelAction(a));
		this.trackingParams(c);
		this.g(y);
	}
	/** @arg {UpdateEngagementPanelAction} x */
	UpdateEngagementPanelAction(x) {
		const {clickTrackingParams: a,updateEngagementPanelAction: b,...y}=x; this.g(y);
		this.clickTrackingParams(a);
		this.UpdateEngagementPanelData(b);
	}
	/** @arg {UpdateEngagementPanelData} x */
	UpdateEngagementPanelData(x) {
		const {content: a,targetId: b,...y}=x; this.g(y);
		this.TranscriptRenderer(a);
		this.parse_target_id(b);
	}
	/** @arg {TranscriptRenderer} x */
	TranscriptRenderer(x) {
		const {transcriptRenderer: a,...y}=x; this.g(y);
		this.TranscriptData(a);
	}
	/** @arg {TranscriptData} x */
	TranscriptData(x) {
		const {content: a,trackingParams: b,...y}=x; this.g(y);
		this.TranscriptSearchPanelRenderer(a);
		this.trackingParams(b);
	}
	/** @arg {TranscriptSearchPanelRenderer} x */
	TranscriptSearchPanelRenderer(x) {
		const {transcriptSearchPanelRenderer: a,...y}=x; this.g(y);
		this.TranscriptSearchPanelData(a);
	}
	/** @arg {TranscriptSearchPanelData} x */
	TranscriptSearchPanelData(x) {
		const {body: a,footer: b,trackingParams: c,targetId: d,...y}=x; this.g(y);
		this.TranscriptSegmentListRenderer(a);
		this.TranscriptFooterRenderer(b);
		this.trackingParams(c);
		this.parse_target_id(d);
	}
	/** @arg {TranscriptFooterRenderer} x */
	TranscriptFooterRenderer(x) {
		const {transcriptFooterRenderer: a,...y}=x; this.g(y);
		this.TranscriptFooterData(a);
	}
	/** @arg {TranscriptFooterData} x */
	TranscriptFooterData(x) {
		const {languageMenu: a,...y}=x; this.g(y);
		this.SortFilterSubMenuRenderer(a);
	}
	/** @arg {SortFilterSubMenuRenderer} x */
	SortFilterSubMenuRenderer(x) {
		const {sortFilterSubMenuRenderer: a,...y}=x; this.g(y);
		this.SortFilterSubMenuData(a);
	}
	/** @arg {TranscriptSegmentListRenderer} x */
	TranscriptSegmentListRenderer(x) {
		const {transcriptSegmentListRenderer: a,...y}=x; this.g(y);
		this.TranscriptSegmentListData(a);
	}
	/** @arg {TranscriptSegmentListData} x */
	TranscriptSegmentListData(x) {
		const {initialSegments: a,noResultLabel: b,retryLabel: c,touchCaptionsEnabled: d,...y}=x; this.g(y);
		this.z(a,a => this.TranscriptSegmentRenderer(a));
		this.z([b,c],a => this.text_t(a));
		this.primitive_of(d,"boolean");
	}
	/** @arg {TranscriptSegmentRenderer} x */
	TranscriptSegmentRenderer(x) {
		if("transcriptSegmentRenderer" in x) {
			this.w(x,a => this.TranscriptSegmentData(a));
		} else {
			debugger;
		}
	}
	/** @arg {TranscriptSegmentData} x */
	TranscriptSegmentData(x) {
		const {startMs: a,endMs: b,snippet: c,startTimeText: d,trackingParams: e,accessibility: f,...y}=x; this.g(y);
		this.z([a,b],a => this.primitive_of(a,"string"));
		this.z([c,d],a => this.text_t(a));
		this.trackingParams(e);
		this.Accessibility(f);
	}
	/** @arg {PlayerStoryboardSpecData} x */
	PlayerStoryboardSpecData(x) {
		if(!x) {
			debugger;
			return;
		}
		const {spec: a,...y}=x;
		this.primitive_of(a,"string");
		this.g(y);
	}
	/** @arg {SearchPageResponse} x */
	SearchPageResponse(x) {
		const {page: a,endpoint: b,response: c,url: d,...y}=x; this.g(y);
		if(a!=="search") debugger;
		this.SearchEndpoint(b);
		this.SearchResponse(c);
		this.parse_url(d);
	}
	/** @arg {SearchResponse} x */
	SearchResponse(x) {
		const {responseContext: a,estimatedResults: b,contents: c,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=x; this.g(y);
		this.ResponseContext(a);
		this.primitive_of(b,"string");
		this.TwoColumnSearchResultsRenderer(c);
		if(targetId!=="search-page") debugger;
	}
	/** @arg {TwoColumnSearchResultsRenderer} x */
	TwoColumnSearchResultsRenderer(x) {
		const {twoColumnSearchResultsRenderer: a,...y}=x; this.g(y);
		this.TwoColumnSearchResults(a);
	}
	/** @arg {TwoColumnSearchResults} x */
	TwoColumnSearchResults(x) {
		const {primaryContents: a,...y}=x; this.g(y);
		this.SectionListRenderer(a,a => {
			console.log(a);
			debugger;
		});
	}
	/** @template T,U @arg {SectionListRenderer<T,U>} x @arg {(x:T,v:U)=>void} f */
	SectionListRenderer(x,f) {
		const {sectionListRenderer: a,...y}=x; this.g(y);
		this.SectionListData(a,f);
	}
	/** @arg {SearchEndpoint} x */
	SearchEndpoint(x) {
		let a=this.handle_clickTrackingParams(x);
		const {commandMetadata: b,searchEndpoint: c,...y}=a; this.g(y);
		this.SearchCommandMetadata(b);
		this.SearchEndpointData(c);
	}
	/** @arg {SearchCommandMetadata} x */
	SearchCommandMetadata(x) {
		const {webCommandMetadata: a,...y}=x; this.g(y);
		this.SearchWebCommandMetadata(a);
	}
	/** @arg {SearchWebCommandMetadata} x */
	SearchWebCommandMetadata(x) {
		const {url: a,webPageType: b,rootVe: c,...y}=x; this.g(y);
		this.parse_url(a);
		if(b!=="WEB_PAGE_TYPE_SEARCH") debugger;
		this.save_root_visual_element(c);
	}
	/** @arg {EngagementPanelSectionListData} x */
	EngagementPanelSectionListData(x) {
		const {content: a,targetId: b,visibility: c,loggingDirectives: d,...y}=x; y;
		this.EngagementPanelSectionListContent(a);
		this.save_enum("engagement-panel",b);
		this.save_enum("ENGAGEMENT_PANEL_VISIBILITY",c);
		this.LoggingDirectives(d);
	}
	/** @arg {EngagementPanelSectionListContent} x */
	EngagementPanelSectionListContent(x) {
		if("adsEngagementPanelContentRenderer" in x) {
			return this.w(x,a => this.AdsEngagementPanelContentData(a));
		} else if("clipSectionRenderer" in x) {
			return this.w(x,a => this.ClipSection(a));
		} else if("structuredDescriptionContentRenderer" in x) {
			return this.StructuredDescriptionContentRenderer(x);
		} else if("sectionListRenderer" in x) {
			return this.SectionListRenderer(x,(a,b) => {
				if(eq_keys([a,b],["comment-item-section","engagement-panel-comments-section"])) return;
				console.log(a);
				debugger;
			});
		}
		console.log(x);
		debugger;
	}
	/** @arg {ClipSection} x */
	ClipSection(x) {
		this.z(x.contents,a => this.ClipCreationRenderer(a));
	}
	/** @arg {ClipCreationRenderer} x */
	ClipCreationRenderer(x) {
		this.ClipCreationData(x.clipCreationRenderer);
	}
	/** @arg {ClipCreationData} x */
	ClipCreationData(x) {
		this.w(x,(a,k) => this.save_keys(`ClipCreationData.${k}`,a));
	}
	/** @arg {AdsEngagementPanelContentRenderer} x */
	AdsEngagementPanelContentRenderer(x) {
		if("adsEngagementPanelContentRenderer" in x) {
			this.AdsEngagementPanelContentData(x.adsEngagementPanelContentRenderer);
		} else {
			debugger;
		}
	}
	/** @arg {AdsEngagementPanelContentData} x */
	AdsEngagementPanelContentData(x) {
		if("hack" in x) return;
		debugger;
	}
	/** @arg {ModifyChannelPreference} x */
	ModifyChannelPreference(x) {
		this.g(x);
	}
	/** @arg {SettingsSidebarRenderer} x */
	SettingsSidebarRenderer(x) {
		const {settingsSidebarRenderer: a,...y}=x; this.g(y);
		this.SettingsSidebarData(a);
	}
	/** @arg {CacheMetadata} x */
	CacheMetadata(x) {
		const {isCacheHit: a,...y}=x; this.g(y);
		this.primitive_of(a,"boolean");
	}
	/** @arg {ShelfData} x */
	ShelfData(x) {
		const {title: a,content: b,trackingParams: c,menu: d,subscribeButton: e,...y}=x; this.g(y);
		this.g(a);
		this.ShelfItem(b);
		this.trackingParams(c);
		if(d) this.g(d);
		if(e) this.g(e);
	}
	/** @arg {ShelfItem} x */
	ShelfItem(x) {
		this.GridRenderer(x.gridRenderer);
	}
	/** @arg {GridRenderer} x */
	GridRenderer(x) {
		this.z(x.items,a => this.GridVideoRenderer(a));
	}
	/** @arg {GridVideoRenderer} x */
	GridVideoRenderer(x) {
		this.GridVideoData(x.gridVideoRenderer);
	}
	/** @arg {GridVideoData} x */
	GridVideoData(x) {
		this.z(x.badges,a => this.g(a));
	}
	/** @arg {SettingsOptionsData} x */
	SettingsOptionsData(x) {
		this.z(x.options,a => this.SettingsOptionItem(a));
	}
	/** @arg {SettingsOptionItem} x */
	SettingsOptionItem(x) {
		if("channelOptionsRenderer" in x) {
			this.ChannelOptionsData(x.channelOptionsRenderer);
		}
	}
	/** @arg {ChannelOptionsData} x */
	ChannelOptionsData(x) {
		this.Thumbnail(x.avatar);
		this.Accessibility(x.avatarAccessibility);
		console.log(x.avatarEndpoint);
		debugger;
	}
	/** @arg {PlaylistVideoListData} x */
	PlaylistVideoListData(x) {
		this.parse_playlist_id(x.playlistId);
	}
	/** @arg {"WL"} x */
	parse_playlist_id(x) {
		if(x!=="WL") debugger;
	}
	/** @arg {PageIntroductionData} x */
	PageIntroductionData(x) {
		this.text_t(x.bodyText);
		debugger;
	}
	/** @arg {ReelPlayerOverlayData} x */
	ReelPlayerOverlayData(x) {
		const {style: a,trackingParams: b,reelPlayerNavigationModel: c,...y}=x; this.g(y);
		if(a!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.trackingParams(b);
		if(c!=="REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED") debugger;
	}
	/** @arg {ConnectedAppData} x */
	ConnectedAppData(x) {
		this.ButtonRenderer(x.connectButton);
	}
	/** @arg {PlaylistSidebarRenderer} x */
	PlaylistSidebarRenderer(x) {
		this.g(x.playlistSidebarRenderer);
	}
	/** @arg {MicroformatDataRenderer} x */
	MicroformatDataRenderer(x) {
		this.g(x.microformatDataRenderer);
	}
	/** @arg {PlaylistMetadataRenderer} x */
	PlaylistMetadataRenderer(x) {
		this.g(x.playlistMetadataRenderer);
	}
	/** @arg {PlaylistHeaderRenderer} x */
	PlaylistHeaderRenderer(x) {
		this.PlaylistHeader(x.playlistHeaderRenderer);
	}
	/** @arg {PlaylistHeader} x */
	PlaylistHeader(x) {
		this.z(x.briefStats,a => this.text_t(a));
	}
	/** @arg {CommentThreadData} x */
	CommentThreadData(x) {
		this.CommentRenderer(x.comment);
	}
	/** @arg {CommentRenderer} x */
	CommentRenderer(x) {
		this.CommentData(x.commentRenderer);
	}
	/** @arg {CommentData} x */
	CommentData(x) {
		this.CommentActionButtonsRenderer(x.actionButtons);
	}
	/** @arg {CommentActionButtonsRenderer} x */
	CommentActionButtonsRenderer(x) {
		this.CommentActionButtonsData(x.commentActionButtonsRenderer);
	}
	/** @arg {CommentActionButtonsData} x */
	CommentActionButtonsData(x) {
		this.g(x);
	}
	/** @arg {C4TabbedHeaderData} x */
	C4TabbedHeaderData(x) {
		this.parse_channel_id(x.channelId);
	}
	/** @arg {`UC${string}`} x */
	parse_channel_id(x) {
		let r=split_string_once(x,"UC");
		if(r[0]!=="") debugger;
	}
	/** @arg {ConfirmDialogEndpointData} x */
	ConfirmDialogEndpointData(x) {
		this.ConfirmDialogRenderer(x.content);
	}
	/** @arg {ConfirmDialogRenderer} x */
	ConfirmDialogRenderer(x) {
		this.ConfirmDialogData(x.confirmDialogRenderer);
	}
	/** @arg {ConfirmDialogData} x */
	ConfirmDialogData(x) {
		this.ButtonRenderer(x.cancelButton);
	}
	/** @arg {CompactVideoData} x */
	CompactVideoData(x) {
		this.Accessibility(x.accessibility);
	}
	/** @arg {PlayerConfig} x */
	PlayerConfig(x) {
		this.AudioConfig(x.audioConfig);
	}
	/** @arg {AudioConfig} x */
	AudioConfig(x) {
		x;
	}
	/** @arg {VideoDetails} x */
	VideoDetails(x) {
		this.primitive_of(x.author,"string");
	}
	/** @arg {StreamingData} x */
	StreamingData(x) {
		this.z(x.adaptiveFormats,a => this.AdaptiveFormatItem(a));
	}
	/** @type {FormatItag[]} */
	format_itag_arr=[133,134,135,136,137,140,160,242,243,244,247,248,249,250,251,278,298,299,302,303,308,315];
	/** @arg {AdaptiveFormatItem} x */
	AdaptiveFormatItem(x) {
		const {
			itag,url,mimeType,bitrate,width: w,height: h,initRange,indexRange,
			...a
		}=x;
		if(!this.format_itag_arr.includes(itag)) {
			debugger;
		}
		this.primitive_of(url,"string");
		this.save_string("mime-type",mimeType);
		this.primitive_of(bitrate,"number");
		if(w) this.primitive_of(w,"number");
		if(h) this.primitive_of(h,"number");
		this.YtRange(initRange);
		this.YtRange(indexRange);
		const {
			lastModified,contentLength,quality,fps,
			qualityLabel: ql,projectionType,averageBitrate,colorInfo: ci,
			highReplication,
			audioQuality,
			approxDurationMs,
			audioSampleRate,audioChannels,loudnessDb,
			...y
		}=a; this.g(y);
		switch(highReplication) {
			case true:
			case void 0: break;
			default: debugger;
		}
		this.primitive_of(lastModified,"string");
		this.primitive_of(contentLength,"string");
		this.parse_format_quality(quality);
		if(fps) this.parse_format_fps(fps);
		if(ql) this.parse_format_quality_label(ql);
		if(projectionType!=="RECTANGULAR") debugger;
		this.primitive_of(averageBitrate,"number");
		if(ci) this.FormatColorInfo(ci);
		this.primitive_of(approxDurationMs,"string");
		if(audioSampleRate) this.parse_audio_sample_rate(audioSampleRate);
		if(audioChannels&&audioChannels!==2) debugger;
		if(loudnessDb) this.primitive_of(loudnessDb,"number");
	}
	/** @arg {`${AudioSampleRate}`} x */
	parse_audio_sample_rate(x) {
		switch(x) {
			case "44100": break;
			case "48000": break;
			default: debugger;
		}
	}
	/** @arg {FormatColorInfo} x */
	FormatColorInfo(x) {
		const {primaries: a,transferCharacteristics: b,matrixCoefficients: c,...y}=x; this.g(y);
		switch(a) {case "COLOR_PRIMARIES_BT709": break; default: debugger;};
		switch(b) {case "COLOR_TRANSFER_CHARACTERISTICS_BT709": break; default: debugger;};
		switch(c) {case "COLOR_MATRIX_COEFFICIENTS_BT709": break; default: debugger;};
	}
	/** @type {QualArr} */
	format_quality_label_arr=[
		"2160p50","1440p50","1080p50","720p50",
		"2160p60","1440p60","1080p60","720p60",
		"1080p","720p","480p","360p","240p","144p"
	];
	/** @arg {QualityLabel} x */
	parse_format_quality_label(x) {
		if(!this.format_quality_label_arr.includes(x)) {
			debugger;
		}
	}
	valid_fps_arr=[25,30,50,60];
	/** @arg {FormatFps} x */
	parse_format_fps(x) {
		if(!this.valid_fps_arr.includes(x)) {
			debugger;
		}
	}
	format_quality_arr=["hd2160","hd1440","hd1080","hd720","large","medium","small","tiny"];
	/** @arg {FormatQuality} x */
	parse_format_quality(x) {
		if(!this.format_quality_arr.includes(x)) {
			debugger;
		}
	}
	/** @arg {YtRange} x */
	YtRange(x) {
		this.z([x.end,x.start],a => this.primitive_of(a,"string"));
	}
	/** @arg {VideoQualityPromoData} x */
	VideoQualityPromoData(x) {
		this.EndpointTemplate(x.endpoint,a => this.w(a,a => this.UrlEndpointData(a)));
		console.log("VideoQualityPromo.endpoint",x.endpoint);
	}
	/** @arg {UrlEndpointData} x */
	UrlEndpointData(x) {
		const {url,...y}=x;
		this.parse_url(url);
		if("target" in y) {
			const {target,...z}=y;
			if(target!=="TARGET_NEW_WINDOW") debugger;
			this.g(z);
		} else {
			this.g(y);
		}
	}
	/** @template T @arg {EndpointTemplate<T>} x @arg {(x:T)=>void} f */
	EndpointTemplate(x,f) {
		const {clickTrackingParams: a,commandMetadata: b,...y}=x;
		this.clickTrackingParams(a);
		this.CommandMetadata(b);
		/** @type {any} */
		let c=y;
		/** @type {T} */
		let d=as_cast(c);
		f(d);
	}
	/** @arg {TwoColumnWatchNextResultsData['results']['results']} x1 */
	TwoColumnWatchNextResultsData_0(x1) {
		this.ContentTemplate(x1,x2 => {
			if("itemSectionRenderer" in x2) {
				return this.TwoColumnWatchNextResultsData_1(x2);
			} else if("videoPrimaryInfoRenderer" in x2) {
				return this.VideoPrimaryInfoRenderer(x2);
			} else if("videoSecondaryInfoRenderer" in x2) {
				return this.VideoSecondaryInfoRenderer(x2);
			}
			debugger;
		});
	}
	/** @arg {Extract<TwoColumnWatchNextResultsData['results']['results']['contents'][number],{itemSectionRenderer:any}>} x */
	TwoColumnWatchNextResultsData_1(x) {
		return this.ItemSectionRenderer(x,(a,b) => {
			switch(a) {
				case "comment-item-section": if(b!=="comments-section") debugger; return;
				case "comments-entry-point": if(b!==void 0) debugger; return;
				default:
			}
			console.log(a);
			debugger;
		});
	}
	/** @arg {TwoColumnWatchNextResultsData} x */
	TwoColumnWatchNextResultsData(x) {
		const {results: a,secondaryResults: b,playlist: c,autoplay: d,conversationBar: e,...y}=x; this.g(y);
		this.ResultsTemplate(a,x1 => {
			let [k]=get_keys_of(x1);
			switch(k) {
				case "contents": break;
				case "trackingParams": break;
				default: debugger;
			}
			this.TwoColumnWatchNextResultsData_0(x1);
		});
		this.SecondaryResultsTemplate(b,x => {
			let [k]=get_keys_of(x);
			switch(k) {
				case "contents": break;
				case "results": break;
				case "trackingParams": break;
				default: debugger;
			}
			if("contents" in x) {
				return this.SecondaryResultsContent_0(x);
			} else if("results" in x) {
				return this.ResultsArrTemplate(x,this.SecondaryResultsContent_1);
			}
			debugger;
		});
		if(c) this.PlaylistTemplate(c,a => this.PlaylistContent(a));
		if(d) this.AutoplayTemplate(d,a => this.AutoplayContent(a));
		if(e) {
			if("liveChatRenderer" in e) {
				this.LiveChatRenderer(e);
			} else {
				let k=Object.keys(e)[0];
				let rd=this.generate_renderer(e[k]);
				console.log(rd);
				let td=this.generate_typedef(e[k]);
				console.log(td);
				console.log("generated [%s]",k,e);
				debugger;
			}
		}
	}
	/** @template T @arg {ResultsArrTemplate<T>} x @arg {(x:T)=>void} f */
	ResultsArrTemplate(x,f) {
		const {trackingParams: a,results: b,...y}=x; this.g(y);
		this.trackingParams(a);
		this.z(b,f);
	}
	/** @arg {ContentsTemplate<RelatedChipCloudRenderer|ItemSectionRenderer<never,never>>} x1 */
	SecondaryResultsContent_0(x1) {
		this.ContentTemplate(x1,this.SecondaryResultsContent_1);
	}
	/** @arg {RelatedChipCloudRenderer|ItemSectionRenderer<never,never>} x2 */
	SecondaryResultsContent_1(x2) {
		if("itemSectionRenderer" in x2) {
			return this.SecondaryResultsContent_2(x2);
		} else if("relatedChipCloudRenderer" in x2) {
			x2.relatedChipCloudRenderer;
		}
		x2;
		let [k]=get_keys_of(x2);
		k;
		debugger;
	}
	/** @arg {ItemSectionRenderer<never,never>} x3 */
	SecondaryResultsContent_2(x3) {
		return this.ItemSectionRenderer(x3,(a,v) => {
			console.log([a,v]);
			debugger;
		});
	}
	/** @arg {LiveChatRenderer} x */
	LiveChatRenderer(x) {
		this.LiveChatData(x.liveChatRenderer);
	}
	/** @arg {LiveChatData} x */
	LiveChatData(x) {
		x;
		debugger;
	}
	/** @arg {PlaylistContent} x */
	PlaylistContent(x) {
		x;
		debugger;
	}
	/** @template T @arg {PlaylistTemplate<T>} x @arg {(x:T)=>void} f */
	PlaylistTemplate(x,f) {
		if(!x) {debugger; return;}
		f(x.playlist);
	}
	/** @template T @arg {SecondaryResultsTemplate<T>} x @arg {(x:T)=>void} f */
	SecondaryResultsTemplate(x,f) {
		f(x.secondaryResults);
	}
	/** @arg {VideoSecondaryInfoRenderer} x */
	VideoSecondaryInfoRenderer(x) {
		this.VideoSecondaryInfoData(x.videoSecondaryInfoRenderer);
	}
	/** @arg {VideoSecondaryInfoData} x */
	VideoSecondaryInfoData(x) {
		const {owner,subscribeButton,metadataRowContainer,showMoreText,showLessText,trackingParams,defaultExpanded,descriptionCollapsedLines,...y}=x; this.g(y);
		this.VideoOwnerRenderer(owner);
		this.SubscribeButtonRenderer(subscribeButton);
	}
	/** @arg {SubscribeButtonRenderer} x */
	SubscribeButtonRenderer(x) {
		this.SubscribeButtonData(x.subscribeButtonRenderer);
	}
	/** @arg {SubscribeButtonData} x */
	SubscribeButtonData(x) {
		const {
			buttonText: a,subscribed: b,enabled: c,type: d,channelId: e,showPreferences: f1,trackingParams: f2,
			subscribeAccessibility: f3,subscribedButtonText: f4,subscribedEntityKey: f5,onSubscribeEndpoints: f6,
			unsubscribeAccessibility: f7,unsubscribeButtonText: f8,unsubscribedButtonText: g1,onUnsubscribeEndpoints: g2,
			notificationPreferenceButton: g3,targetId: g4,
			...y
		}=x; this.g(y);
		this.primitive_of(b,"boolean");
		if(c!==true) debugger;
		if(d!=="FREE") debugger;
		this.parse_channel_id(e);
		if(f1!==false) debugger;
		this.trackingParams(f2);
		this.Accessibility(f3);
		this.z([a,f4,f8,g1],this.text_t);
		this.SubscriptionNotificationToggleButtonRenderer(g3);
		if(g4!=="watch-subscribe") debugger;
	}
	/** @arg {SubscriptionNotificationToggleButtonData} x */
	SubscriptionNotificationToggleButtonData(x) {
		this.CommandExecutorCommand(x.command);
		console.log(x.currentStateId);
		this.Icon(x.secondaryIcon);
		this.z(x.states,a => {
			console.log('[state_id]',[a.stateId,a.nextStateId]);
			this.ButtonRenderer(a.state);
		});
	}
	/** @arg {SubscriptionNotificationToggleButtonRenderer} x */
	SubscriptionNotificationToggleButtonRenderer(x) {
		this.SubscriptionNotificationToggleButtonData(x.subscriptionNotificationToggleButtonRenderer);
	}
	/** @arg {VideoOwnerRenderer} x */
	VideoOwnerRenderer(x) {
		this.VideoOwnerData(x.videoOwnerRenderer);
	}
	/** @arg {VideoOwnerData} x */
	VideoOwnerData(x) {
		this.BrowseEndpoint(x.navigationEndpoint,a => {
			if(a.apiUrl!=="/youtubei/v1/browse") debugger;
			if(a.rootVe!==3611) {console.log(a); debugger;}
			this.parse_url(a.url);
			if(a.webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		});
	}
	/** @arg {VideoPrimaryInfoRenderer} x */
	VideoPrimaryInfoRenderer(x) {
		this.VideoPrimaryInfoData(x.videoPrimaryInfoRenderer);
	}
	/** @template T @template U @arg {ItemSectionRenderer<T,U>} x @arg {(x:T,v:U)=>void} f */
	ItemSectionRenderer(x,f) {
		this.ItemSectionData(x.itemSectionRenderer,f);
	}
	/** @template T @arg {ContentsTemplate<T>} x @arg {(x:T)=>void} f */
	ContentTemplate(x,f) {
		const {trackingParams,contents,...y}=x; this.g(y);
		this.z(x.contents,a => f(a));
	}
	/** @template T @arg {ResultsTemplate<T>} x @arg {(x:T)=>void} f */
	ResultsTemplate(x,f) {
		f(x.results);
	}
	/** @template T @arg {AutoplayTemplate<T>} x @arg {(x:T)=>void} f */
	AutoplayTemplate(x,f) {
		if(!x) {debugger; return;}
		f(x.autoplay);
	}
	/** @arg {AutoplayContent} x */
	AutoplayContent(x) {
		this.z(x.modifiedSets,a => this.ModifiedSetItem(a));
	}
	/** @arg {ModifiedSetItem} x */
	ModifiedSetItem(x) {
		console.log("ModifiedSetItem.autoplayVideo",x.autoplayVideo);
	}
	/** @arg {EmojiPickerRenderer} x */
	EmojiPickerRenderer(x) {
		this.g(x.emojiPickerRenderer);
	}
	/** @arg {PlayerAttestationRenderer} x */
	PlayerAttestationRenderer(x) {
		this.PlayerAttestation(x.playerAttestationRenderer);
	}
	/** @arg {PlayerAttestation} x */
	PlayerAttestation(x) {
		this.BotguardData(x.botguardData);
	}
	/** @arg {BotguardData} x */
	BotguardData(x) {
		const {program,interpreterSafeUrl,serverEnvironment,...y}=x; this.g(y);
		this.UrlWrappedValueT(interpreterSafeUrl,a => a);
	}
	/** @template {string} T @arg {UrlWrappedValueT<T>} x @arg {(x:T)=>void} f */
	UrlWrappedValueT(x,f) {
		f(x.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue);
	}
	/** @arg {PaidContentOverlayRenderer} x */
	PaidContentOverlayRenderer(x) {
		this.trackingParams(x.trackingParams);
	}
	/** @arg {EndscreenRenderer} x */
	EndscreenRenderer(x) {
		this.EndscreenData(x.endscreenRenderer);
	}
	/** @arg {EndscreenData} x */
	EndscreenData(x) {
		this.z(x.elements,a => this.EndscreenElementRenderer(a));
	}
	/** @arg {EndscreenElementRenderer} x */
	EndscreenElementRenderer(x) {
		this.EndscreenElementData(x.endscreenElementRenderer);
	}
	/** @arg {EndscreenElementData} x */
	EndscreenElementData(x) {
		this.primitive_of(x.aspectRatio,"number");
	}
	/** @arg {PlayerCaptionsTracklistRenderer} x */
	PlayerCaptionsTracklistRenderer(x) {
		this.PlayerCaptionsTracklistData(x.playerCaptionsTracklistRenderer);
	}
	/** @arg {PlayerCaptionsTracklistData} x */
	PlayerCaptionsTracklistData(x) {
		this.z(x.audioTracks,a => {
			this.z(a.captionTrackIndices,a => {
				this.primitive_of(a,"number");
			});
		});
		this.z(x.captionTracks,a => {
			this.primitive_of(a.baseUrl,"string");
			if(a.vssId!=="a.en") debugger;
			this.text_t(a.name);
		});
		x.defaultAudioTrackIndex;
		this.z(x.translationLanguages,a => a);
	}
	/** @arg {TranslationLanguage} x */
	TranslationLanguage(x) {
		const {languageCode: a,languageName: {simpleText: b},...y}=x; this.g(y);
		this.primitive_of(a,"string");
		this.primitive_of(b,"string");
	}
	/** @arg {ActionSetPlaylistVideoOrder} x */
	ActionSetPlaylistVideoOrder(x) {
		this.Accessibility(x.accessibility);
	}
	/** @arg {CustomEmoji} x */
	CustomEmoji(x) {
		this.primitive_of(x.emojiId,"string");
		this.EmojiImage(x.image);
	}
	/** @arg {EmojiImage} x */
	EmojiImage(x) {
		this.Accessibility(x.accessibility);
		this.z(x.thumbnails,a => this.ThumbnailItem(a));
	}
	/** @arg {LoggingDirectives} x */
	LoggingDirectives(x) {
		this.primitive_of(x.enableDisplayloggerExperiment,"boolean");
	}
	/** @arg {FulfillmentContent} x */
	FulfillmentContent(x) {
		this.FulfilledLayout(x.fulfilledLayout);
	}
	/** @arg {FulfilledLayout} x */
	FulfilledLayout(x) {
		this.InFeedAdLayoutData(x.inFeedAdLayoutRenderer);
	}
	/** @arg {InFeedAdLayoutData} x */
	InFeedAdLayoutData(x) {
		this.AdLayoutMetadata(x.adLayoutMetadata);
	}
	/** @arg {AdLayoutMetadata} x */
	AdLayoutMetadata(x) {
		this.primitive_of(x.layoutId,"string");
		switch(x.layoutType) {
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES": break;
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": break;
			default: debugger; break;
		}
		if(x.adLayoutLoggingData) this.AdLayoutLoggingData(x.adLayoutLoggingData);
	}
	/** @arg {DesktopTopbarData} x */
	DesktopTopbarData(x) {
		this.ButtonRenderer(x.a11ySkipNavigationButton);
	}
	/** @arg {SignalNavigationEndpointData} x */
	SignalNavigationEndpointData(x) {
		switch(x.signal) {
			case "CHANNEL_SWITCHER": break;
			default: debugger;
		}
	}
	/** @arg {SignOutEndpointData} x */
	SignOutEndpointData(x) {
		this.primitive_of(x.hack,"boolean");
	}
	/** @arg {GetAccountsListInnertubeEndpointData} x */
	GetAccountsListInnertubeEndpointData(x) {
		switch(x.requestType) {
			case "ACCOUNTS_LIST_REQUEST_TYPE_CHANNEL_SWITCHER": break;
			default: debugger;
		}
	}
	/** @arg {PlayerAnnotationsExpandedRenderer} x */
	PlayerAnnotationsExpandedRenderer(x) {
		this.PlayerAnnotationsExpandedData(x.playerAnnotationsExpandedRenderer);
	}
	/** @arg {PlayerAnnotationsExpandedData} x */
	PlayerAnnotationsExpandedData(x) {
		x;
	}
	/** @arg {PlayabilityStatus} x */
	PlayabilityStatus(x) {
		decode_url_b64_proto_obj(x.contextParams);
	}
	/** @arg {PlaybackTracking} x */
	PlaybackTracking(x) {
		this.UrlAndElapsedMediaTime(x.atrUrl);
	}
	/** @arg {UrlAndElapsedMediaTime} x */
	UrlAndElapsedMediaTime(x) {
		this.primitive_of(x.baseUrl,"string");
		if(x.elapsedMediaTimeSeconds===void 0) {
			debugger;
		}
	}
	/** @arg {DesktopWatchAdsData} x */
	DesktopWatchAdsData(x) {
		this.GutParams(x.gutParams);
	}
	/** @arg {GutParams} x */
	GutParams(x) {
		const {tag: a,...y}=x; this.g(y);
		this.primitive_of(a,"string");
	}
	/** @arg {InlineSurveyData} x */
	InlineSurveyData(x) {
		console.log(x.dismissalEndpoint);
		debugger;
	}
	/** @arg {ChannelResponse} x */
	ChannelResponse(x) {
		this.TwoColumnBrowseResultsRenderer(x.contents);
	}
	/** @arg {SearchEndpointData} x */
	SearchEndpointData(x) {
		const {query: a,...y}=x; this.g(y);
		this.primitive_of(a,"string");
	}
	/** @arg {SetSettingEndpointData} x */
	SetSettingEndpointData(x) {
		if(x.boolValue!==void 0) {
			this.primitive_of(x.boolValue,"boolean");
		}
		console.log("[setting_item_id]",x.settingItemId);
	}
	/** @arg {SignalServiceEndpointData} x */
	SignalServiceEndpointData(x) {
		this.z(x.actions,a => this.ServiceEndpointAction(a));
	}
	/** @arg {ServiceEndpointAction} x */
	ServiceEndpointAction(x) {
		this.clickTrackingParams(x.clickTrackingParams);
	}
	/** @arg {FeedFilterChipBarRenderer} x */
	FeedFilterChipBarRenderer(x) {
		this.FeedFilterChipBarData(x.feedFilterChipBarRenderer);
	}
	/** @arg {FeedFilterChipBarData} x */
	FeedFilterChipBarData(x) {
		this.z(x.contents,a => this.ChipCloudChipRenderer(a));
	}
	/** @arg {ChipCloudChipRenderer} x */
	ChipCloudChipRenderer(x) {
		this.ChipCloudChipData(x.chipCloudChipRenderer);
	}
	/** @arg {ChipCloudChipData} x */
	ChipCloudChipData(x) {
		x.isSelected;
		this.RelatedChipCommand(x.navigationEndpoint);
	}
	/** @arg {RelatedChipCommand} x */
	RelatedChipCommand(x) {
		const {clickTrackingParams: a,relatedChipCommand: b,...y}=x; this.g(y);
		this.clickTrackingParams(a);
		this.RelatedChipCommandData(b);
	}
	/** @arg {RelatedChipCommandData} x */
	RelatedChipCommandData(x) {
		const {...y}=x; this.g(y);
		switch(x.targetSectionIdentifier) {
			case "sid-wn-chips": break;
			default: debugger;
		}
		if(!x.loadCached) debugger;
	}
	/** @arg {ChipCloudData} x */
	ChipCloudData(x) {
		x;
		debugger;
	}
	/** @arg {FeedTabbedHeaderData} x */
	FeedTabbedHeaderData(x) {
		this.text_t(x.title);
	}
	/** @arg {EntityBatchUpdateData} x */
	EntityBatchUpdateData(x) {
		this.z(x.mutations,a => this.EntityMutationItem(a));
		this.TimestampWithNanos(x.timestamp);
	}
	/** @arg {TimestampWithNanos} x */
	TimestampWithNanos(x) {
		this.primitive_of(x.nanos,"number");
		this.primitive_of(x.seconds,"string");
	}
	/** @arg {EntityMutationItem} x */
	EntityMutationItem(x) {
		let dec=decode_url_b64_proto_obj(decodeURIComponent(x.entityKey));
		dec;
	}
	/** @arg {WatchEndpointData} x */
	WatchEndpointData(x) {
		this.x.get("string_parser").parse_video_id(x.videoId);
	}
	/** @private @arg {AccountMenuJson} x */
	AccountMenuJson(x) {
		this.z(x.actions,a => this.OpenPopupActionData(a));
	}
	/** @arg {NavigateEventDetail} x */
	YtPageState(x) {
		switch(x.pageType) {
			case "browse": x.response; break;
		};
	}
	/** @private @arg {YtSuccessResponse} x */
	YtSuccessResponse(x) {
		this.ResponseContext(x.responseContext);
	}
	/** @arg {AttGet} x */
	AttGet(x) {
		this.AttBgChallenge(x.bgChallenge);
	}
	/** @template {string} T  @arg {UrlWrappedValueT<T>} x @arg {(x:T)=>void} f */
	t_url_unwrap(x,f) {
		f(x.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue);
	}
	att_log_debug=false;
	/** @arg {AttBgChallenge} x */
	AttBgChallenge(x) {
		this.t_url_unwrap(x.interpreterUrl,a => {
			let c=a;
			// spell:disable-next-line
			if(a!=="//www.google.com/js/th/G-wi0KRrIjmTWIDOn44AFVMvZ_aKLO1c96DfwAE3d4M.js") {
				/** @type {TrayrideJsHash} */
				console.log("new trayride interpreter",c.split("/").slice(5)[0].split(".")[0]);
			}
		});
		if(this.att_log_debug) console.log("[bg_interpreter_url]",x.interpreterUrl.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue);
	}
	/** @arg {GuideJsonType} x */
	GuideJsonType(x) {
		this.z(x.items,a => this.GuideItemType(a));
	}
	/** @arg {GuideItemType} x */
	GuideItemType(x) {
		if("guideSectionRenderer" in x) {
			this.GuideSectionData(x.guideSectionRenderer);
		}
	}
	/** @arg {GuideSectionData} x */
	GuideSectionData(x) {
		this.z(x.items,a => this.GuideSectionItemType(a));
		this.trackingParams(x.trackingParams);
		if(x.formattedTitle) this.text_t(x.formattedTitle);
	}
	/** @arg {GuideSectionItemType} x */
	GuideSectionItemType(x) {
		if("guideEntryRenderer" in x) {
			this.GuideEntryRenderer(x);
		} else if("guideCollapsibleSectionEntryRenderer" in x) {
			this.GuideCollapsibleSectionEntry(x.guideCollapsibleSectionEntryRenderer);
		} else {
			debugger;
		}
	}
	/** @arg {GuideCollapsibleSectionEntry} x */
	GuideCollapsibleSectionEntry(x) {
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=x; this.g(y);
		this.GuideEntryRenderer(headerEntry);
	}
	/** @arg {ReelWatchSequenceResponse} x */
	ReelWatchSequenceResponse(x) {
		this.ContinuationEndpoint(x.continuationEndpoint);
	}
	/** @arg {ReelResponse} x */
	ReelResponse(x) {
		this.DesktopTopbarRenderer(x.desktopTopbar);
	}
	/** @arg {CompactLinkData} x */
	CompactLinkData(x) {
		console.log(x.navigationEndpoint);
	}
	/** @arg {{}} x @arg {string|null} r_name */
	generate_renderer(x,r_name=null) {
		/** @type {string[]} */
		let req_names=[];
		/** @arg {{[x:string]:any}} x @arg {string[]} keys @arg {string} t_name */
		function gen_body(x,keys,t_name) {
			let ret_arr=[];
			for(let k of keys) {
				if(k==="trackingParams") {
					ret_arr.push(`
					this.trackingParams(x.${k});
					`.trim());
					continue;
				}
				if(typeof x[k]==='string') {
					let v=x[k];
					if(v.startsWith("https:")) {
						ret_arr.push(`
						this.primitive_of(x.${k},"string");
						`.trim());
						continue;
					}
					ret_arr.push(`
					if(x.${k}!=="${x[k]}") debugger;
					`.trim());
					continue;
				}
				if(typeof x[k]!=='object') {
					ret_arr.push(`
					if(x.${k}!==${x[k]}) debugger;
					`.trim());
					continue;
				}
				let tn=`${k[0].toUpperCase()}${k.slice(1)}`;
				let mn=tn.replace("Renderer","Data");
				if(mn===t_name) mn+="Data";
				req_names.push(mn);
				ret_arr.push(`
				this.${mn}(x.${k});
				`.trim());
			}
			return ret_arr.join("\nd4!");
		}
		/** @arg {string} x */
		function gen_padding(x) {
			return x.replaceAll(/d(\d)!/g,(_v,g) => {
				return " ".repeat(g);
			});
		}
		let keys=Object.keys(x);
		let k=keys[0];
		let t_name=`${k[0].toUpperCase()}${k.slice(1)}`;
		if(r_name) {
			t_name=r_name;
		}
		let tmp_1=`
		d2!/** @arg {${t_name}} x */
		d2!${t_name}(x) {
			d4!${gen_body(x,keys,t_name)}
		d2!}
		`;
		let ex_names=req_names.map(e => {
			let tmp0=`
			d2!/** @arg {${e}} x */
			d2!${e}(x) {
				d4!x;
				d4!debugger;
			d2!}
			`;
			return tmp0;
		});
		tmp_1=ex_names.join("")+tmp_1;
		let tmp2=tmp_1.split("\n").map(e => e.trim()).filter(e => e).join("\n");
		let tmp3=gen_padding(tmp2);
		console.log("gen renderer for",x);
		return `\n${tmp3}`;
	}
	/** @arg {{[x: string]:{}}} x */
	generate_typedef(x) {
		let keys=Object.keys(x);
		let k;
		for(let c of keys) {
			if(c==="clickTrackingParams") continue;
			k=c;
			break;
		}
		if(!k) return null;
		let tn=`${k[0].toUpperCase()}${k.slice(1)}`;
		let obj_count=0;
		let o2=x[k];
		let keys_2=Object.keys(o2);
		let wk=keys.concat(keys_2);
		let tc=JSON.stringify(x,(x,o) => {
			if(typeof o==="string") return "string";
			if(typeof o==="number") return o;
			if(typeof o==="boolean") return o;
			if(typeof o!=="object") throw new Error("handle typeof "+typeof o);
			if(o.runs&&o.runs instanceof Array) {
				return "TYPE::TextT";
			}
			if(o.simpleText&&typeof o.simpleText==='string') {
				return "TYPE::SimpleText";
			}
			if(o.thumbnails&&o.thumbnails instanceof Array) {
				return "TYPE::Thumbnail";
			}
			if(wk.includes(x)) {
				if(o instanceof Array) return [o[0]];
				return o;
			}
			if(o instanceof Array) return [o[0]];
			obj_count++;
			if(obj_count<2) return o;
			if(o instanceof Array) return [{}];
			return {};
		},"\t");
		tc=tc.replaceAll(/\"(\w+)\":/g,(_a,g) => {
			return g+":";
		});
		/** @arg {string} s */
		function one_array_to_any_arr(s,dep=0) {
			if(dep<8&&s.match(/\[\s+{/)) {
				s=s.replaceAll(/\[\s+{(.+)}\s+\]/g,(_a,v) => {
					return `{${one_array_to_any_arr(v)}}[]`;
				});
			}
			return s;
		}
		tc=one_array_to_any_arr(tc);
		tc=tc.replaceAll("\"string\"","string");
		tc=tc.replaceAll(/"TYPE::(.+?)"/g,(_a,x) => {
			return x;
		});
		tc=tc.replaceAll(",",";");
		tc=tc.replaceAll(/[^[{;]$/gm,a => `${a};`);
		return `\ntype ${tn}=${tc}\n`;
	}
	/** @arg {StructuredDescriptionContentRenderer} x */
	StructuredDescriptionContentRenderer(x) {
		this.StructuredDescriptionContentData(x.structuredDescriptionContentRenderer);
	}
	/** @arg {StructuredDescriptionContentData} x */
	StructuredDescriptionContentData(x) {
		this.z(x.items,a => this.StructuredDescriptionContentItem(a));
	}
	/** @arg {StructuredDescriptionContentItem} x */
	StructuredDescriptionContentItem(x) {
		if("videoDescriptionHeaderRenderer" in x) {
			this.VideoDescriptionHeaderRenderer(x);
		} else if("expandableVideoDescriptionBodyRenderer" in x) {
			let k=get_keys_of(x.expandableVideoDescriptionBodyRenderer);
			if(k.length>0) debugger;
		} else {
			debugger;
		}
	}
	/** @arg {VideoDescriptionHeaderRenderer} x */
	VideoDescriptionHeaderRenderer(x) {
		this.VideoDescriptionHeaderData(x.videoDescriptionHeaderRenderer);
	}
	/** @arg {VideoDescriptionHeaderData} x */
	VideoDescriptionHeaderData(x) {
		const {channel,channelNavigationEndpoint,channelThumbnail,title,views,publishDate,factoid,...y}=x; this.g(y);
		this.text_t(channel);
		this.BrowseEndpoint(channelNavigationEndpoint,a => {
			const {url: b,webPageType: c,rootVe: d,apiUrl: e,...z}=a; this.g(z);
			this.parse_url(b);
			if(c!=="WEB_PAGE_TYPE_CHANNEL") debugger;
			if(d!==3611) debugger;
			if(e!=="/youtubei/v1/browse") debugger;
		});
		this.Thumbnail(channelThumbnail);
		this.text_t(title);
		this.text_t(views);
		this.text_t(publishDate);
		this.z(factoid,a => this.FactoidRenderer(a));
	}
	/** @arg {FactoidRenderer} x */
	FactoidRenderer(x) {
		this.FactoidData(x.factoidRenderer);
	}
	/** @arg {FactoidData} x */
	FactoidData(x) {
		this.primitive_of(x.accessibilityText,"string");
		this.text_t(x.label);
		this.text_t(x.value);
	}
	/** @arg {AdPlacementRenderer} x */
	AdPlacementRenderer(x) {
		this.AdPlacementData(x.adPlacementRenderer);
	}
	/** @arg {AdPlacementData} x */
	AdPlacementData(x) {
		this.AdPlacementConfig(x.config);
		this.AdPlacementRendererItem(x.renderer);
	}
	/** @arg {AdPlacementRendererItem} x */
	AdPlacementRendererItem(x) {
		if("clientForecastingAdRenderer" in x) {
			return this.ClientForecastingAdRenderer(x);
		} else if("adBreakServiceRenderer" in x) {
			return this.AdBreakServiceRenderer(x);
		} else if("linearAdSequenceRenderer" in x) {
			return this.LinearAdSequenceRenderer(x);
		} else if("instreamVideoAdRenderer" in x) {
			return this.InstreamVideoAdRenderer(x);
		} else if("actionCompanionAdRenderer" in x) {
			return this.ActionCompanionAdRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {AdPlacementConfig} x */
	AdPlacementConfig(x) {
		this.AdPlacementConfigData(x.adPlacementConfig);
	}
	/** @template {string} T @template {`${T}_${string}`} U @arg {T} ns @arg {U} x @returns {SplitOnce<SplitOnce<U,T>[1],"_">[1]} */
	parse_enum(ns,x) {
		let r=split_string_once(x,ns);
		if(!r[1]) throw new Error("Invalid enum");
		let q=split_string_once(r[1],"_");
		return q[1];
	}
	/** @arg {AdPlacementConfigData} x */
	AdPlacementConfigData(x) {
		const {kind: rk,adTimeOffset: ato,hideCueRangeMarker: hcr,...y}=x; this.g(y);
		let kind=this.parse_enum("AD_PLACEMENT_KIND",x.kind);
		switch(kind) {
			case "END": break;
			case "START": break;
			case "SELF_START": break;
			default: debugger;
		}
		if(ato) this.AdTimeOffset(ato);
		if(hcr!==true) debugger;
	}
	/** @arg {AdTimeOffset} x */
	AdTimeOffset(x) {
		this.primitive_of(x.offsetStartMilliseconds,"string");
		if(x.offsetEndMilliseconds!=="-1") debugger;
	}
	/** @arg {AdBreakServiceRenderer} x */
	AdBreakServiceRenderer(x) {
		this.AdBreakServiceData(x.adBreakServiceRenderer);
	}
	/** @arg {AdBreakServiceData} x */
	AdBreakServiceData(x) {
		if(x.prefetchMilliseconds!=="10000") debugger;
		this.primitive_of(x.getAdBreakUrl,"string");
	}
	/** @arg {LinearAdSequenceRenderer} x */
	LinearAdSequenceRenderer(x) {
		this.LinearAdSequenceData(x.linearAdSequenceRenderer);
	}
	/** @arg {LinearAdSequenceData} x */
	LinearAdSequenceData(x) {
		const {linearAds: a,adLayoutMetadata: b,...y}=x; this.g(y);
		this.z(a,a => this.LinearAdsItem(a));
		this.AdLayoutMetadata(b);
	}
	/** @arg {LinearAdsItem} x */
	LinearAdsItem(x) {
		if("instreamVideoAdRenderer" in x) {
			this.InstreamVideoAdRenderer(x);
		} else if("adActionInterstitialRenderer" in x) {
			this.AdActionInterstitialRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {AdActionInterstitialRenderer} x */
	AdActionInterstitialRenderer(x) {
		this.AdActionInterstitialData(x.adActionInterstitialRenderer);
	}
	/** @arg {AdActionInterstitialData} x */
	AdActionInterstitialData(x) {
		this.save_keys("AdActionInterstitial",x);
	}
	/** @arg {ClientForecastingAdRenderer} x */
	ClientForecastingAdRenderer(x) {
		this.ClientForecastingAdData(x.clientForecastingAdRenderer);
	}
	/** @arg {ClientForecastingAdData} x */
	ClientForecastingAdData(x) {
		const {impressionUrls: a,...y}=x; this.g(y);
		this.z(a,a => this.BaseUrl(a));
	}
	/** @template {ParsableBaseUrlFormat} T @arg {BaseUrl<T>} x */
	BaseUrl(x) {
		const {baseUrl: a,...y}=x; this.g(y);
		this.parse_url(a);
	}
	/** @arg {InstreamVideoAdRenderer} x */
	InstreamVideoAdRenderer(x) {
		this.InstreamVideoAdData(x.instreamVideoAdRenderer);
	}
	/** @arg {InstreamVideoAdData} x */
	InstreamVideoAdData(x) {
		const {skipOffsetMilliseconds,pings,clickthroughEndpoint,csiParameters,playerVars,playerOverlay,elementId,trackingParams,legacyInfoCardVastExtension,sodarExtensionData,externalVideoId,adLayoutLoggingData,layoutId,...y}=x;
		this.g(y);
	}
	/** @arg {ActionCompanionAdRenderer} x */
	ActionCompanionAdRenderer(x) {
		this.ActionCompanionAdData(x.actionCompanionAdRenderer);
	}
	/** @arg {`${string}-0000-${string}-${string}-${string}`} x */
	parse_layout_id(x) {
		let v=split_string(x,"-");
		if(v[1]!=="0000") debugger;
	}
	/** @arg {ActionCompanionAdData} x */
	ActionCompanionAdData(x) {
		const {
			headline,description,actionButton,iconImage,bannerImage,
			navigationEndpoint: x2,trackingParams,adInfoRenderer: x3,
			adVideoId,impressionPings,adLayoutLoggingData: x4,
			associatedCompositePlayerBytesLayoutId: x1,
			...y
		}=x; this.g(y);
		this.AdLayoutLoggingData(x4);
		this.ActionCompanionAdInfoRenderers(x3);
		let uep_data=this.UrlEndpoint(x2);
		(([T,U,V]) => {
			this.z(T,this.BaseUrl);
			console.log("urls",T);
			console.log("meta",U);
			console.log("ep",V);
		})(uep_data);
		if(x1) this.parse_layout_id(x1);
	}
	/**
	 * @template {BaseUrl<any>[]} T
	 * @template {WebCommandMetadataTemplateType} U
	 * @template {{url: string;}} V
	 * @arg {UrlEndpoint<T,U,V>} x
	 * @returns {[T,U,V]} */
	UrlEndpoint(x) {
		const {clickTrackingParams: a,loggingUrls: T,commandMetadata: U,urlEndpoint: V,...y}=x; this.g(y);
		this.clickTrackingParams(x.clickTrackingParams);
		return [T,U,V];
	}
	/** @arg {ActionCompanionAdInfoRenderers} x */
	ActionCompanionAdInfoRenderers(x) {
		if("adHoverTextButtonRenderer" in x) {
			return this.AdHoverTextButtonRenderer(x);
		}
		debugger;
	}
	/** @arg {AdHoverTextButtonRenderer} x */
	AdHoverTextButtonRenderer(x) {
		this.AdHoverTextButtonData(x.adHoverTextButtonRenderer);
	}
	/** @arg {AdHoverTextButtonData} x */
	AdHoverTextButtonData(x) {
		this.ButtonRenderer(x.button);
		this.text_t(x.hoverText);
		this.trackingParams(x.trackingParams);
	}
	/** @arg {VideoPrimaryInfoData} x */
	VideoPrimaryInfoData(x) {
		const {title,viewCount,videoActions,trackingParams,badges,dateText,relativeDateText,...y}=x; this.g(y);
		this.z(x.badges,this.MetadataBadgeRenderer);
		this.z([x.dateText,x.relativeDateText],this.text_t);
		this.text_t(x.title);
		this.trackingParams(x.trackingParams);
	}
	/** @arg {MetadataBadgeRenderer} x */
	MetadataBadgeRenderer(x) {
		const {metadataBadgeRenderer: a,...y}=x; this.g(y);
		this.MetadataBadgeData(a);
	}
	/** @arg {MetadataBadgeData} x */
	MetadataBadgeData(x) {
		const {icon: a,style: b,label: c,tooltip: d,trackingParams: e,accessibilityData: f,...y}=x; this.g(y);
		this.Icon(a);
		this.save_enum("BADGE_STYLE_TYPE",b);
		console.log("meta label",c);
		if(d) console.log("meta tooltip",d);
		this.trackingParams(e);
		if(f) this.AccessibilityData(f);
	}
}
//#endregion
console=typeof window==="undefined"? console:(() => window.console)();
main();
