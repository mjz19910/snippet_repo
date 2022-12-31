// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.15
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

/** @type {import("./YtdAppElement.js").YtdAppElement} */
const YtdAppElement=cast_as({});
/** @type {InstanceType<typeof YtdAppElement>|undefined} */
let ytd_app=void 0;
// #region node
var is_node_js=function is_node_js() {
	return false;
};
var destroy_env=() => {};
if(typeof window==="undefined") {
	is_node_js=() => true;
	/** @type {{require:()=>any}&typeof globalThis} */
	let njs_require=cast_as(globalThis);
	if(typeof njs_require.require==="function") {
		let n_env=require("./support/_/init_node_env.js");
		destroy_env=() => {
			n_env.destroy_env(message_channel);
		};
		window=n_env.window;
		History=window.History;
		HTMLElement=window.HTMLElement;
		Image=window.Image;
		document=window.document;
		localStorage=window.localStorage;
		HTMLDivElement=window.HTMLDivElement;
		top=window;
	} else {
		throw new Error("Unable to generate fake window");
	}
}
// #endregion
// #region Use module types
/** @type {import("./__global.js")} */
// #endregion
// #region
/** @typedef {import("../DebugApi_raw/DebugApi.user").InjectApiStr} InjectApiStr */
/** @type {Exclude<typeof window[InjectApiStr],undefined>} */
let inject_api=window.inject_api??{};
window.inject_api=inject_api;
/** @type {InjectApiYt} */
let inject_api_yt={};
inject_api.modules=new Map;
inject_api.modules.set("yt",inject_api_yt);

inject_api_yt.saved_maps=new Map;
/** @arg {string} key @arg {Map<string, {}>} map */
function save_new_map(key,map) {
	if(!inject_api_yt.saved_maps) return;
	inject_api_yt.saved_maps.set(key,map);
}
/** @type {import("./support/yt_api/_/a/SavedData.js").SavedData} */
let saved_data=cast_as({});
inject_api_yt.saved_data=saved_data;

const is_yt_debug_enabled=false;
/** @template T @arg {T&{x:1}} _v */
function assert_is_never(_v) {}
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

/** @type {unique symbol} */
const Gn=Symbol("injectionDeps");

/** @template {{length:number;[x:number]:T[number]}} T @arg {T} x */
function make_iterator(x) {
	let i=0;
	return {
		[Symbol.iterator]() {
			return {
				next() {
					i++;
					if(i<=x.length) {
						return {
							value: x[i-1],
							done: false,
						};
					} else {
						return {value: x[x.length-1],done: true};
					}
				}
			};
		}
	};
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
	let plugin_state={};
	plugin_state.show_interesting_elements=true;
	let cur_count=1;
	let obj=dom_observer;
	let iter_count=0;
	if(is_node_js()) console.log("start async_plugin");
	try {
		while(true) {
			if(iter_count!==0) {
				await new Promise((soon) => setTimeout(soon,40));
			}
			iter_count++;
			if(!audio_gain_controller) {
				audio_gain_controller=new AudioGainController;
				AudioGainController.attach_instance();
			}
			VolumeRange.create_if_needed();
			cur_count++;
			x: {
				if(plugin_state.polymer_loaded) break x;
				if(!window.Polymer) break x;
				if(!window.Polymer.Class) break x;
				plugin_state.polymer_loaded=true;
			}
			x: if(plugin_state.show_interesting_elements&&plugin_state.polymer_loaded&&document.body&&document.readyState==="complete") {
				let interesting_body_elements=[...make_iterator(document.body.children)].filter(e => {
					if(e.tagName==="LINK"&&e instanceof HTMLLinkElement) {
						if(e.rel==="stylesheet") return false;
					}
					if(e.id==="home-page-skeleton") return false;
					// cspell:ignore skeletonhidden
					if(e.id==="watch-page-skeleton"&&e.classList.value==="watch-skeletonhidden") return false;
					return e.tagName!=="SCRIPT"&&e.tagName!=="IFRAME"&&e.tagName!=="IRON-ICONSET-SVG"&&e.tagName!=="IRON-A11Y-ANNOUNCER"&&e.tagName!=="svg";
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
			if(is_node_js()&&iter_count>max_find_iter&&found_element_count===0) {
				console.log("wait for plugin ready timeout");
				break;
			}
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
	if(is_node_js()) {
		destroy_env();
		return;
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
const is_ytd_app_debug_enabled=true;
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
			this.range_element.onkeydown=(event) => this.onKeyDown(event);
			this.range_element.min=""+this.min;
			this.range_element.max=""+this.overdrive;
			let new_gain=this.calculateGain();
			this.setGain(new_gain);
			this.view_div.append(this.range_element);
		}
		view_parent.insertAdjacentElement("beforebegin",this.view_div);
	}
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
		if(rejection.message!=="") {
			console.log("fetch_rejection_handler",rejection);
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
inject_api_yt.PropertyHandler=PropertyHandler;
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
/** @template {{}} T @arg {T} obj @returns {import("./support/yt_api/_/b/GetMaybeKeys.js").MaybeKeysArray<T>} */
function get_keys_of(obj) {
	if(!obj) {
		debugger;
	}
	let rq=Object.keys(obj);
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
		debugger;
		check_item_keys(state.path,"appendContinuationItemsAction",get_keys_of(action));
		if(state.t.AppendContinuationItemsAction(state.path,action)) return;
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(state.t,"appendContinuationItemsAction.continuationItems",action.continuationItems);
		if(filtered.length>0) {
			action.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg  {ReloadContinuationItemsCommandData} command */
	reloadContinuationItemsCommand({t: state,path},command) {
		check_item_keys(path,"reloadContinuationItemsCommand",get_keys_of(command));
		if(state.ReloadContinuationItemsCommandData(path,command)) return;
		let filtered=state.handlers.renderer_content_item_array.replace_array(state,"reloadContinuationItemsCommand.continuationItems",command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg {import("./support/yt_api/_/i/ItemSectionRendererData.js").ItemSectionRendererData} renderer */
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
	/** @type {(...x:[ApiIterateState,{}])=>void} */
	webCommandMetadata(state,metadata) {
		if(!state.t.run_mc) return;
		console.log("webCommandMetadata",state.path,metadata);
		state.t.run_mc=false;
	}
	/** @type {(...x:[ApiIterateState,{}])=>void} */
	compactLinkRenderer(state,renderer) {
		if(!state.t.run_mc) return;
		console.log("compactLinkRenderer",state.path,renderer);
		state.t.run_mc=false;
	}
	/** @arg {ApiIterateState} state @arg {import("./support/yt_api/rich/RichGridRendererData.js").RichGridRendererData} renderer */
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
		case "appendContinuationItemsAction": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_1_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItems": break;
			case "targetId": break;
		} break;
		case "richItemRenderer.content": mode="items"; break;
		case "richItemRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_2_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "content": break;
			case "trackingParams": break;
		} break;
		case "richGridRenderer.contents[]": mode="items"; break;
		case "richGridRenderer.masthead": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_3_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "adSlotRenderer": break;
			case "radioRenderer": break;
			case "videoRenderer": break;
		} break;
		case "richGridRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_4_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "contents": break;
			case "trackingParams": break;
			case "header": break;
			case "targetId": break;
			case "reflowOptions": break;
			case "style": break;
			case "masthead": break;
		} break;
		case "itemSectionRenderer.contents[]": mode="items"; break;
		case "itemSectionRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_5_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "contents": break;
			case "header": break;
			case "sectionIdentifier": break;
			case "targetId": break;
			case "trackingParams": break;
		} break;
		case "reloadContinuationItemsCommand.continuationItems[]": mode="items"; break;
		case "reloadContinuationItemsCommand": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_6_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItems": break;
			case "slot": break;
			case "targetId": break;
		} break;
	}
	if(mode==="items") for(let key of keys) switch(key) {
		default: console.log("item_keys_tag [ci_4_0_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
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
		// richItemRenderer.content
		case "adSlotRenderer": break;
		case "radioRenderer": break;
		// comments
		case "commentThreadRenderer": break;
	}
}

class HandleRendererContentItemArray {
	debug=false;
	/** @arg {string} path @arg {HandleRichGridRenderer|FilterHandlers} base @arg {import("./support/yt_api/rich/RichItemRenderer.js").RichItemRenderer} content_item */
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
			if(debug_flag_value) console.log(base.class_name,"adSlotRenderer=",renderer.content.adSlotRenderer);
			return false;
		}
		return true;
	}
	/** @arg {import("./support/yt_api/rich/RichSectionRendererH.js").RichSectionRendererH} content_item */
	handle_rich_section_renderer(content_item) {
		let renderer=content_item.richSectionRenderer;
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
	/** @typedef { import("./support/yt_api/_/r/ReloadContinuationItemsCommandData.js").ReloadContinuationItemsCommandData} ReloadContinuationItemsCommandData */
	/** @typedef {AppendContinuationItemsAction['continuationItems']} T1 */
	/** @typedef  {ReloadContinuationItemsCommandData['continuationItems']} T2 */
	/** @template {T1|T2} T @arg {HandleRichGridRenderer|FilterHandlers} base @arg {string} path @arg {T} arr @returns {T} */
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
	/** @arg {string} path @arg {import("./support/yt_api/rich/RichGridRendererData.js").RichGridRendererData} renderer */
	richGridRenderer(path,renderer) {
		check_item_keys(path,"richGridRenderer",get_keys_of(renderer));
		if(this.debug) console.log("run handler richGridRenderer");
		if(renderer.masthead) {
			check_item_keys(path,"richGridRenderer.masthead",get_keys_of(renderer.masthead));
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead;
				console.log("masthead",masthead);
				renderer.masthead=masthead;
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
/** @typedef {import("./support/yt_api/_/c/ContinuationItem.js").ContinuationItem} ContinuationItem */
/** @typedef {import("./support/yt_api/AppendContinuationItemsAction.js").AppendContinuationItemsAction} AppendContinuationItemsAction */
/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_/w/WatchNextContinuationAction.js").WatchNextContinuationAction} */
function is_watch_next_feed_target(o) {
	return o.targetId==="watch-next-feed";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_/c/CommentsSectionContinuationAction.js").CommentsSectionContinuationAction} */
function is_comments_section_next(o) {
	return o.targetId==="comments-section";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_/b/BrowseFeedAction.js").BrowseFeedAction} */
function is_what_to_watch_section(o) {
	return o.targetId==="browse-feedFEwhat_to_watch";
}

/** @template {string} T @arg {T} t @returns {import("./support/search_params_parse/SearchParamsParse.js").ParseUrlSearchParams<T>} */
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
	decodeArrayBuffer(input) {
		let real_len=input.length-1;
		while(real_len>=0&&input[real_len]==="=") real_len--;
		var byte_len=((real_len+1)/4)*3|0;
		var ab=new ArrayBuffer(byte_len);
		let byte_arr=new Uint8Array(ab);
		this.decode(input,byte_arr);

		return byte_arr;
	}
	/** @arg {string} input @arg {Uint8Array} binary_arr */
	decode(input,binary_arr) {
		var byte_len=(input.length/4)*3|0;
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		var j=0;

		input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");

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
/** @arg {Uint8Array} buf @arg {number} end */
function readFixed32_end(buf,end) {
	return (buf[end-4]
		|buf[end-3]<<8
		|buf[end-2]<<16
		|buf[end-1]<<24)>>>0;
}
/** @arg {MyReader} reader @arg {number} [writeLength] */
function indexOutOfRange(reader,writeLength) {
	return RangeError("index out of range: "+reader.pos+" + "+(writeLength||1)+" > "+reader.len);
}
class MyReader {
	/** @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
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
			console.log("asked to skip from %o to",start_pos,this.pos);
		} else {
			console.log("asked to skip VarInt from %o to",start_pos,this.pos);
		}
	}
	uint32() {
		let value=0;
		this.last_pos=this.pos;
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
	};
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
				/* istanbul ignore if */
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
	/** @arg {number} writeLength */
	indexOutOfRange(writeLength) {
		return RangeError("index out of range: "+this.pos+" + "+(writeLength||1)+" > "+this.len);
	}
	fixed32() {
		/* istanbul ignore if */
		if(this.pos+4>this.len)
			throw this.indexOutOfRange(4);

		return readFixed32_end(this.buf,this.pos+=4);
	}
	/** @returns {[number,number]} */
	read_field_description() {
		let cur_byte=this.uint32();
		return [cur_byte&7,cur_byte>>>3];
	}
	/** @arg {number} fieldId @arg {number} wireType */
	skipTypeEx(fieldId,wireType) {
		console.log("[skip] pos=%o",this.pos);
		let pos_start=this.pos;
		/** @type {(number|bigint)[]} */
		let first_num=[];
		switch(wireType) {
			case 0:
				let [num64,new_pos]=this.revert_to(pos_start,() => {
					try {
						let u64=this.uint64();
						return [u64,this.pos];
					} catch {}
					return [0,this.pos];
				});
				let num32;
				try {
					num32=this.uint32();
				} catch {
					this.failed=true;
					break;
				}
				if(num64!==BigInt(num32)) {
					first_num.push(num64);
					this.pos=new_pos;
				} else {
					first_num.push(num32);
				}
				console.log("\"field %o: VarInt\": %o",fieldId,first_num[0]);
				break;
			case 1:
				this.skip(8);
				break;
			case 2: {
				let size=this.uint32();
				this.buf.subarray(this.pos,this.pos+size);
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",fieldId);
					this.failed=true;
				}
			} break;
			case 3: break;
			case 4: throw new Error("Invalid state");
			case 5: first_num.push(this.fixed32()); break;
			default: break;
		}
		return first_num;
	}
}

const base64_dec=new Base64Binary();

/** @arg {string} str */
function decode_b64_proto_obj(str) {
	let buffer=base64_dec.decodeArrayBuffer(str);
	let loop_count=0;
	/** @type {[number,number,(number|bigint)[]][]} */
	let data=[];
	let reader=new MyReader(buffer);
	for(;loop_count<15&&reader.pos<reader.buf.length;loop_count++) {
		let start_pos=reader.pos;
		let cur_byte=reader.uint32();
		console.log("uint32 consumed from %o to ",start_pos,reader.pos);
		let wireType=cur_byte&7;
		let fieldId=cur_byte>>>3;
		let first_num=reader.skipTypeEx(fieldId,wireType);
		data.push([fieldId,wireType,first_num]);
		if(reader.failed) {
			break;
		}
	}
	let [first,...rest]=data;
	let [fieldId,wireType,as_num]=first;
	/** @arg {[number,number,(number|bigint)[]]} e @returns {[number,number,bigint|number|null]} */
	function filter_rest(e) {
		let [fieldId,wireType,as_num]=e;
		if(as_num.length===0) {
			return [fieldId,wireType,null];
		}
		return [fieldId,wireType,as_num[0]];
	}
	return {
		first_w: wireType,
		first_f: fieldId,
		as_num,
		rest: rest.map(filter_rest),
	};
}

/** @arg {((...x:any[])=>{}|null|undefined)|(new (...x:any[])=>{})} function_obj */
function add_function(function_obj) {
	if(!inject_api.saved_function_objects) return;
	inject_api.saved_function_objects.push([function_obj.name,function_obj]);
}
inject_api.add_function=add_function;

/** @template T @arg {T|undefined} val @returns {T} */
function non_null(val) {
	if(val===void 0) throw new Error();
	return val;
}
add_function(non_null);

class FilterHandlers {
	/** @arg {ResolverT} res */
	constructor(res) {
		this.filter_handler_debug=false;
		/** @readonly */
		this.class_name="FilterHandlers";
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
		this.handle_types=new HandleTypes(res);
		let t=this;
		/** @arg {string} value */
		function whitelist_item(value) {
			t.blacklisted_item_sections.set(value,false);
		}
		whitelist_item("pageIntroductionRenderer");
		whitelist_item("settingsOptionsRenderer");
		whitelist_item("connectedAppRenderer");
	}
	run_mc=false;
	/** @arg {string} path @arg  {ReloadContinuationItemsCommandData} action */
	ReloadContinuationItemsCommandData(path,action) {
		if(is_watch_next_feed_target(action)) {
			// /** @type {WatchNextContinuationAction} */
			// let action_t=action;
			// console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		if(is_comments_section_next(action)) {
			// /** @type {CommentsSectionContinuationAction} */
			// let action_t=action;
			// console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		if(is_what_to_watch_section(action)) {
			/** @type {import("./support/yt_api/_/b/BrowseFeedAction.js").BrowseFeedAction} */
			let action_t=action;
			console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		console.log("path",path,"continuation action",action);
		debugger;
		return false;
	}
	/** @arg {string} path @arg {AppendContinuationItemsAction} action */
	AppendContinuationItemsAction(path,action) {
		if(is_watch_next_feed_target(action)) {
			// /** @type {WatchNextContinuationAction} */
			// let action_t=action;
			// console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		if(is_comments_section_next(action)) {
			// /** @type {CommentsSectionContinuationAction} */
			// let action_t=action;
			// console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		if(is_what_to_watch_section(action)) {
			/** @type {import("./support/yt_api/_/b/BrowseFeedAction.js").BrowseFeedAction} */
			let action_t=action;
			console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		console.log("path",path,"continuation action",action);
		debugger;
		return false;
	}
	/** @template {string} X @template {string} U @template {string} V @template {`https://${X}/${U}?${V}`} T @arg {{}} state @arg {T} x  */
	use_template_url(state,x) {
		/** @template T @typedef {import("./support/url_parse/UrlParse.js").UrlParse<T>} UrlParse */
		/** @template {string} T @arg {T} str @returns {UrlParse<T>} */
		function create_from_parse(str) {
			let s=new URL(str);
			/** @type {any} */
			let a=s;
			/** @type {UrlParse<T>} */
			let ret=a;
			return ret;
		}
		const res_parse=create_from_parse(x);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",x,res_parse);
			throw new Error("unreachable");
		}
		/** @template T @template U @typedef {import("./support/make/Split.js").Split<T,U>} Split */
		/** @type {Split<import("./support/parse_url/RemoveFirst.js").RemoveFirst<typeof res_parse.pathname>,"/">} */
		let path_parts=res_parse.pathname.slice(1).split("/");
		return this.get_url_type(state,path_parts);
	}
	/** @typedef {import("./support/yt_api/_/u/UrlTypes.js").UrlTypes} UrlTypes */
	/** @arg {{}} state @arg {string[]} parts */
	get_url_type(state,parts) {
		let index=0;
		const cur_part=parts[index];
		switch(cur_part) {
			case "youtubei": index++; return this.get_yt_url_type(state,parts,index);
			case "getDatasyncIdsEndpoint": return {name: cur_part};
			default: console.log("get_url_type",cur_part); debugger;
		}
		throw new Error("Missing");
	}
	/** @arg {{}} state @arg {"live_chat"} base @arg {string[]} parts @arg {number} index */
	get_live_chat_type(state,base,parts,index) {
		let cur_part=parts[index];
		switch(cur_part) {
			case "get_live_chat_replay": break;
			default: no_handler({...state,parts,index});
		};
		return {
			/** @type {`${typeof base}.${typeof cur_part}`} */
			name: `${base}.${cur_part}`
		};
	}
	/** @arg {{}} state @arg {string[]} parts @arg {number} index */
	get_yt_url_type(state,parts,index) {
		if(parts[1]!=="v1") {
			debugger;
		}
		index++;
		const cur_part=parts[index];
		switch(cur_part) {
			case "att": {
				const next_part=parts[index+1]; switch(next_part) {
					case "get": return {
						/** @type {`${typeof cur_part}.${typeof next_part}`} */
						name: `${cur_part}.${next_part}`
					};
					default: no_handler({...state,parts,index});
				}
			}
			case "notification": {
				index++; let next_part=parts[index]; switch(next_part) {
					case "get_unseen_count": break;
					case "get_notification_menu": break;
					case "record_interactions": break;
					default: no_handler({...state,parts,index});
				} return {
					/** @type {`${typeof cur_part}.${typeof next_part}`} */
					name: `${cur_part}.${next_part}`
				};
			}
			case "browse": break;
			case "guide": index++; switch(parts[index]) {
				case void 0: break;
				default: no_handler({...state,parts,index});
			} break;
			case "reel": index++; let next_part=parts[index]; switch(next_part) {
				case "reel_item_watch": break;
				case "reel_watch_sequence": break;
				default: no_handler({...state,parts,index});
			} return {
				/** @type {`${typeof cur_part}.${typeof next_part}`} */
				name: `${cur_part}.${next_part}`
			};
			case "next": break;
			case "player": break;
			case "live_chat": index++; return this.get_live_chat_type(state,"live_chat",parts,index);
			case "get_transcript": break;
			case "account": return get_account_type(state,cur_part,parts,index+1);
			case "feedback": index++; if(index<parts.length) {
				let next_part=parts[index]; switch(next_part) {
					default: no_handler({...state,parts,index});
				}
			} break;
			default: no_handler({...state,parts,index});
		}
		return {name: cur_part};
	}
	/** @arg {UrlTypes} url_type @arg {{}} json @returns {import("./support/yt_api/_/r/ResponseTypes.js").ResponseTypes} */
	get_res_data(url_type,json) {
		/** @type {import("./support/make/Split.js").Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		switch(target.length) {
			case 1: switch(target[0]) {
				case "browse": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/_/b/browse_t.js").browse_t["json"]} */
					json: cast_as(json),
				};
				case "feedback": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/_/f/feedback_t.js").feedback_t["json"]} */
					json: cast_as(json),
				};
				case "getDatasyncIdsEndpoint": debugger; return {
					url_type: target[0],
					json,
				};
				case "get_transcript": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/_/g/get_transcript_t.js").get_transcript_t["json"]} */
					json: cast_as(json),
				};
				case "guide": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/yt/GuideJsonType.js").GuideJsonType} */
					json: cast_as(json),
				};
				case "next": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/yt/YtApiNext.js").YtApiNext} */
					json: cast_as(json),
				};
				case "player": return {
					url_type: target[0],
					/** @type {import("./support/yt_api/_/w/WatchResponsePlayer.js").WatchResponsePlayer} */
					json: cast_as(json),
				};
				default: break;
			} break;
			case 2: switch(target[0]) {
				case "account": switch(target[1]) {
					case "account_menu": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/_/a/AccountMenuJson.js").AccountMenuJson} */
						json: cast_as(json),
					};
				};
				case "att": return {
					url_type: `${target[0]}.${target[1]}`,
					/** @type {import("./support/yt_api/_/a/AttGetV.js").AttGetV} */
					json: cast_as(json),
				};
				case "live_chat": switch(target[1]) {
					case "get_live_chat_replay": return {
						url_type: `${target[0]}.${target[1]}`,
						json,
					};
				}
				case "notification": switch(target[1]) {
					case "get_notification_menu": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/_/g/GetNotificationMenuJson.js").GetNotificationMenuJson} */
						json: cast_as(json),
					};
					case "get_unseen_count": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/yt/notification_get_unseen_count_t.js").notification_get_unseen_count_t["json"]} */
						json: cast_as(json),
					};
					case "record_interactions": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/yt/YtSuccessResponse.js").YtSuccessResponse} */
						json: cast_as(json),
					};
				}
				case "reel": switch(target[1]) {
					case "reel_item_watch": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/yt/reel_reel_item_watch_t.js").reel_reel_item_watch_t["json"]} */
						json: cast_as(json),
					};
					case "reel_watch_sequence": return {
						url_type: `${target[0]}.${target[1]}`,
						/** @type {import("./support/yt_api/yt/reel_reel_watch_sequence_t.js").reel_reel_watch_sequence_t["json"]} */
						json: cast_as(json),
					};
				}
				default: break;
			} break;
		}
		console.log("[log_get_res_data]",target,json); debugger; throw new Error("Stop");
	}
	/** @arg {import("./support/yt_api/_/r/ResponseTypes.js").ResponseTypes} input @arg {string|URL|Request} request @arg {URL} parsed_url */
	on_json_type(input,request,parsed_url) {
		try {
			on_json_request({
				...input,
				request,
				parsed_url,
			});
		} catch {
			console.log("api not handled",input.url_type);
		}
	}
	/** @arg {string|URL|Request} request @arg {import("./support/yt_api/_/j/JsonDataResponseType.js").JsonDataResponseType} data */
	on_handle_api(request,data) {
		var {req_hr_t,req_parse,debug}=this.on_handle_api_0(request);
		var {path_url,url_type}=this.on_handle_api_1(req_hr_t,request,data,req_parse);
		if(path_url==="/getDatasyncIdsEndpoint") return;
		let api_parts=req_parse.pathname.slice(1).split("/");
		// spell:ignore youtubei
		if(api_parts[0]!=="youtubei") {
			console.log(this.class_name+": "+"unknown api path",req_parse.pathname);
			return;
		}
		if(api_parts[1]!=="v1") {
			console.log(this.class_name+": "+"unknown api path",req_parse.pathname);
			return;
		}
		let api_path=api_parts.slice(2).join(".");
		debug&&console.log(this.class_name+": "+"on_handle_api api_path",api_parts.slice(0,2).join("/"),api_path);
		this.handle_any_data(url_type,data);
		let res=this.get_res_data(url_type,data);
		this.on_json_type(res,request,req_parse);
		this.handle_types.ResponseTypes(res);
	}
	/** @arg {`https://${string}/${string}?${string}`} req_hr_t @arg {string|URL|Request} request @arg {import("./support/yt_api/_/j/JsonDataResponseType.js").JsonDataResponseType} data @arg {URL} req_parse */
	on_handle_api_1(req_hr_t,request,data,req_parse) {
		/** @type {`https://${string}/${string}?${string}`} */
		let href_=req_hr_t;
		const url_type=this.use_template_url({request,data},href_).name;
		let path_url=req_parse.pathname;
		return {path_url,url_type};
	}

	/** @arg {string|URL|Request} request */
	on_handle_api_0(request) {
		const debug=false;
		function c1() {
			if(typeof request=="string") {
				return {url: to_url(request)};
			}
			if(request instanceof URL) {
				return {url: request};
			}
			return {url: to_url(request.url)};
		}
		let req_parse=c1().url;
		/** @type {any} */
		let req_hr_t=req_parse.href;
		return {req_hr_t,req_parse,debug};
	}
	/** @type {import("./support/yt_api/yt/GuideItemType").GuideItemKeys[]} */
	guide_item_keys=[
		"guideSectionRenderer",
		"guideSubscriptionsSectionRenderer",
	];
	/** @arg {UrlTypes|`page_type_${import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail["pageType"]}`} path @arg {import("./support/yt_api/_/s/SavedDataItem.js").SavedDataItem} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @type {import("./support/yt_api/_/a/AnySavedData.js").AnySavedData} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,channel,playlist",",");
	/** @typedef {import("./support/yt_api/_/d/DataResponsePageType.js").DataResponsePageType} DataResponsePageType */
	/** @arg {[()=>DataResponsePageType, object, []]} apply_args */
	on_initial_data(apply_args) {
		/** @type {DataResponsePageType} */
		let ret=Reflect.apply(...apply_args);
		if(!("page" in ret)) {
			return ret;
		}
		if(!ret.response) {
			console.log(this.class_name+": unhandled return value:",ret);
			debugger;
		}
		if(is_yt_debug_enabled) console.log(this.class_name+": initial_data:",ret);
		page_type_iter(ret.page);
		this.handle_any_data(`page_type_${ret.page}`,cast_as(ret));
		this.handle_types.DataResponsePageType(ret);
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
	/** @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail */
	on_page_type_changed(detail) {
		this.handle_types.YTNavigateFinishEventDetail(detail);
	}

}
/** @type {any[]} */
let blob_create_args_arr=[];
let leftover_args=[];
inject_api_yt.blob_create_args_arr=blob_create_args_arr;
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
		mk(obj,pq,cc.value_tr+"."+pq,cc.noisy_flag);
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
/** @arg {object} target @arg {PropertyKey} property_key @arg {string} property_path @arg {boolean} noisy */
function mk(target,property_key,property_path,noisy=false) {
	return new MKState({},target,property_key,property_path,noisy).run();
}
let yta_str="yt.player.Application";
mk_tree_arr.push(yta_str+".create",yta_str+".createAlternate");
mk(window,"yt","yt",true);
win_watch.addEventListener("new_window_object",act_found_create_yt_player);

class CustomEventType {
	type="event_type";
	detail={};
	port=new MessagePort;
}
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
inject_api_yt.dom_observer=dom_observer;


class YtdPageManagerElement extends HTMLElement {
	/** @returns {import("./support/yt_api/yt/YtCurrentPage.js").YtCurrentPage|undefined} */
	getCurrentPage() {throw 1;}
}

inject_api_yt.playlist_arr??=[];
/** @type {string[]} */
let playlist_arr=inject_api_yt.playlist_arr;
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
inject_api_yt.page_type_changes??=[];
let page_type_changes=inject_api_yt.page_type_changes;

/** @type {string|null} */
let last_page_type=null;

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
save_new_map("box_map",box_map);

/** @type {import("./support/yt_api/yt/YtdPlayerElement.js").YtdPlayerElement|null} */
let ytd_player=null;
/** @arg {HTMLElement} element */
function on_ytd_player(element) {
	const element_id="ytd-player";
	if(is_yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	/** @type {any} */
	let element_any=element;
	/** @type {import("./support/yt_api/yt/YtdPlayerElement.js").YtdPlayerElement} */
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

/** @template U @template {U} T @arg {U} e @returns {T} */
function cast_as(e) {
	/** @type {any} */
	let x=e;
	return x;
}

class YTNavigateFinishEvent {
	/** @arg {Event} value @return {YTNavigateFinishEvent} */
	static cast(value) {
		/** @type {any} */
		let ret=value;
		return ret;
	}
	/** @type {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} */
	detail=cast_as({});
}

/** @type {((event:YTNavigateFinishEvent)=>void)[]} */
let on_yt_navigate_finish=[];

/** @template {string} U @template {U[]} T @arg {T} src @arg {T} target */
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

/** @typedef {import("./support/yt_api").YtJsonRequest} YtJsonRequest */
/** @typedef {import("./support/yt_api").YtJsonUnsupportedRequest} YtJsonUnsupportedRequest */
/** @arg {YtJsonRequest|YtJsonUnsupportedRequest} request_info */
function on_json_request(request_info) {
	let skip_req_check=true;
	if(skip_req_check) return;
	switch(request_info.url_type) {
		case "att.get": console.log(request_info.url_type,request_info.json); break;
		default: console.log(request_info.url_type,request_info.json); break;
	}
}

/** @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail["pageType"]} pageType */
function page_type_iter(pageType) {
	switch(pageType) {
		case "browse": break;
		case "channel": break;
		case "playlist": break;
		case "shorts": break;
		case "watch": break;
		case "settings": break;
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
inject_api_yt.port_state=port_state;

let slow_message_event=false;
const message_channel_loop_delay=80;
/** @arg {MessageEvent<number>} event */
function on_port_message(event) {
	if(is_yt_debug_enabled) console.log("msg_port:message %o",event.data);
	port_state_log.push([performance.now()-port_state.time_offset,event.data]);
	if(slow_message_event) {
		setTimeout(dispatch_observer_event,message_channel_loop_delay);
		return;
	}
	dispatch_observer_event();
}

let message_channel=new MessageChannel();

function fire_observer_event() {
	dom_observer.notify_with_port(message_channel.port1);
}

let always_dispatch_event=false;
let rep_count=0;
let rep_max=300;
function dispatch_observer_event() {
	rep_count+=1;
	if(always_dispatch_event) {
		return fire_observer_event();
	}
	if(rep_count%rep_max==(rep_max-1)) {
		port_state.cint=setTimeout(fire_observer_event,10);
		return;
	}
	return fire_observer_event();
}

function start_message_channel_loop() {
	message_channel=new MessageChannel();
	message_channel.port2.onmessage=on_port_message;
	if(top===window) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {},
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

inject_api_yt.plugin_overlay_element=plugin_overlay_element;

function fix_offset() {
	if(!ytd_player) return;
	let player_offset=sumOffset(ytd_player);
	plugin_overlay_element.style.top=player_offset.top_offset+"px";
	plugin_overlay_element.style.left=player_offset.left_offset+"px";
}

let title_save=localStorage.getItem("title_save_data");
if(!title_save) {
	title_save="{\"value\":false}";
	localStorage.setItem("title_save_data",title_save);
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
	static attach_instance() {
		if(!window.inject_api) throw new Error("Missing inject_api");
		if(!audio_gain_controller) throw new Error("Missing instance");
		inject_api_yt.audio_gain_controller=audio_gain_controller;
	}
}
inject_api_yt.AudioGainController=AudioGainController;
/** @type {AudioGainController|null} */
let audio_gain_controller=null;

/** @template {string} T @template {{}} U @template {import("./support/make/Split.js").Split<T, ",">} C @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}} @type {import("./support/make/__ia_excludeKeysS.js").__ia_excludeKeysS} */
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
	/** @template {keyof T} V @arg {V} key @returns {NonNullable<this["services"]>[V]} */
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
//#region
/** @typedef {import("./support/Services.js").Services} Services */
/** @typedef {import("./support/ServiceOptions.js").ServiceOptions} ServiceOptions */
/** @typedef {import("./support/ResolverT.js").ResolverT<Services,ServiceOptions>} ResolverT */
async function main() {
	/** @type {ResolverT} */
	const resolver_value={value: null};
	const csi_service=new CsiService(resolver_value);
	const e_catcher_service=new ECatcherService(resolver_value);
	const g_feedback_service=new GFeedbackService(resolver_value);
	const guided_help_service=new GuidedHelpService(resolver_value);
	const service_tracking=new TrackingServices(resolver_value);
	const yt_handlers=new
		HiddenData(new FilterHandlers(resolver_value));
	const log_tracking_params=false;
	const log_click_tracking_params=false;
	inject_api_yt.yt_handlers=yt_handlers;

	// init section
	const service_resolver=new ServiceResolver({
		csi_service,
		e_catcher_service,
		g_feedback_service,
		guided_help_service,
		service_tracking,
		yt_handlers,
	},{
		log_tracking_params,
		log_click_tracking_params,
		noisy_logging: false,
	});
	resolver_value.value=service_resolver;
	on_yt_navigate_finish.push(log_page_type_change);

	// modify global section
	override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
	/** @type {typeof fetch|null} */
	let original_fetch=null;
	fetch_inject.__proxy_target__=window.fetch;
	modify_global_env();

	// wait for plugin requirements
	start_message_channel_loop();

	return;

	// #region hoisted functions below
	/** @typedef {import("./support/yt_api/_/j/JsonDataResponseType.js").JsonDataResponseType} JsonDataResponseType */
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
		/** @type {["text"]} */
		let handled_keys=["text"];
		class FakeResponse {
			text() {
				if(is_yt_debug_enabled) console.log("response.text()");
				return handle_fetch_response_2(request,options,response.text());
			}
		}
		let fake_res=new FakeResponse;
		/** @type {any} */
		let any_x=fake_res;
		/** @type {Response} */
		let fake_res_t=any_x;
		return new Proxy(fake_res_t,{
			get(_obj,key,_proxy) {
				for(let i=0;i<handled_keys.length;i++) {
					if(key in fake_res) {
						if(key==="text") {
							return fake_res[key];
						} else {
							console.log("need new case for new key on fake Response");
							debugger;
						}
					}
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
	/** @arg {[()=>DataResponsePageType, object, []]} apply_args */
	function do_proxy_call_getInitialData(apply_args) {
		return yt_handlers.extract_default((h) => h.on_initial_data(apply_args),() => Reflect.apply(...apply_args));
	}
	function modify_global_env() {
		/** @type {Map<string, Blob|MediaSource>} */
		let created_blobs=new Map;
		inject_api_yt.created_blobs=created_blobs;
		/** @type {Set<string>} */
		let active_blob_set=new Set;
		inject_api_yt.active_blob_set=active_blob_set;
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
	/** @arg {YTNavigateFinishEvent} event */
	function log_page_type_change(event) {
		let {detail}=event;
		if(!detail) return;
		yt_handlers.extract(h => h.on_page_type_changed(detail));
	}
	// #endregion
}
//#endregion
/** @arg {{}} state @arg {"account"} base @arg {string[]} parts @arg {number} index */
function get_account_type(state,base,parts,index) {
	let cur_part=parts[index];
	switch(cur_part) {
		case "account_menu": break;
		default: no_handler({...state,parts,index});
	}
	return {
		/** @type {`${typeof base}.${typeof cur_part}`} */
		name: `${base}.${cur_part}`
	};
}
/** @arg {{parts: string[];index:number}} obj @returns {never} */
function no_handler({parts,index}) {
	console.log("[no_handler_for] [%o] [%s]",parts,parts[index]);
	debugger;
	throw new Error("Stop");
}
/** @template {string} C @template {string} U @template {import("./support/make/Split.js").Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {import("./support/make/Split.js").Split<C,","> extends U[]?C:never} arg1 */
function has_keys(ok_3,arg1) {
	return eq_keys(ok_3,arg1.split(","));
}

/** @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {import("./support/make/Split.js").Split<X,string extends S?",":S>} */
function split_string(x,s=cast_as(",")) {
	let r=x.split(s);
	return cast_as(r);
}

const seen_map=new Set;
/** @arg {import("./support/yt_api/_/b/BrowseIdType.js").BrowseIdType} value */
function parse_browse_id(value) {
	/** @typedef {import("./support/yt_api/_/s/SplitIntoGroups.js").SplitIntoGroups<typeof value,`${string}`>[0]} StartPart */
	/** @template T,U @typedef {import("./support/ExtractAfterStr.js").ExtractAfterStr<T,U>} ExtractAfterStr */
	/** @typedef {ExtractAfterStr<typeof value,"FE">} KnownParts */
	/** @typedef {ExtractAfterStr<typeof value,"VL"|"UC">} KnownParts_VL */
	/** @type {StartPart} */
	let v_2c=cast_as(value.slice(0,2));
	x: switch(v_2c) {
		case "FE": {
			/** @type {KnownParts} */
			let v_ac=cast_as(value.slice(2));
			switch(v_ac) {
				case "history": break x;
				case "library": break x;
				case "subscriptions": break x;
				case "what_to_watch": break x;
				default: break;
			}
			if(seen_map.has(v_ac)) break;
			seen_map.add(v_ac);
			console.log("new [param_value_with_section] [%s] -> [%s]",v_2c,v_ac);
		} break;
		case "VL": let v_4c=value.slice(2,4); switch(v_4c) {
			case "LL": break;
			case "WL": break;
			case "PL": break;
			default:
				/** @type {KnownParts_VL} */
				let ve_ac=value.slice(2);
				console.log("new with param [param_2c_VL]",value,ve_ac);
				debugger;
		} break;
		case "UC": console.log("new with param [param_2c_UC]",value,value.slice(2)); break;
		case "SP": break;
		default: console.log("new [param_value_needed]",v_2c,value); break;
	}
}

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
/** @typedef {import("./types_tmp.js").SaveDataRet} SaveDataRet */
class BaseServicePrivate {
	// #region Public
	/** @arg {ResolverT} x */
	constructor(x) {
		this.#x=x;
		this.load_data();
		this.save_data();
	}
	get x() {
		if(!this.#x.value) throw 1;
		return this.#x.value;
	}
	on_new_data_known() {
		this.save_data();
	}
	on_new_known_str() {
		this.save_known_string();
	}
	on_request_data_removal() {
		this.delete_known_data();
	}
	/** @arg {string} key @arg {string|string[]} x */
	save_new_string(key,x) {
		if(x instanceof Array) {
		} else if(x.startsWith("http://www.youtube.com/channel/UC")) {
			if(this.log_skipped_strings) console.log("skip channel like",key,x);
			return;
		}
		let was_known=true;
		/** @type {["one", string[]]|["many",string[][]]} */
		let cur;
		let p=this.known_strings.find(e => e[0]===key);
		if(!p) {
			p=[key,cur=['one',[]]];
			this.known_strings.push(p);
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
			target[1].push(x);
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
		this.new_known_strings.push([key,x]);
		this.on_new_known_str();
		console.log(key,x);
	}
	/** @arg {string} key @arg {boolean} bool */
	save_new_bool(key,bool) {
		let krc=this.known_booleans.find(e => e[0]===key);
		if(!krc) {
			krc=[key,{t: false,f: false}];
			this.known_booleans.push(krc);
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
		this.changed_known_bool.push([key,kc]);
		this.save_known_bool();
	}
	/** @arg {number} x */
	save_new_root_ve(x) {
		if(this.known_root_ve.includes(x)) return;
		console.log("rootVe",x);
		this.known_root_ve.push(x);
		this.new_known_root_ve.push(x);
		this.on_new_data_known();
	}
	// #endregion
	//#region private
	/** @private */
	log_skipped_strings=false;
	#x;
	/** @private @arg {string} known_data */
	save_local_storage(known_data) {
		localStorage.known_data=known_data;
	}
	/** @private */
	get_local_storage() {
		return localStorage.known_data;
	}
	/** @private */
	delete_known_data() {
		localStorage.removeItem("known_data");
	}
	/** @private @type {number[]} */
	known_root_ve=[];
	/** @private @type {number[]} */
	new_known_root_ve=[];
	/** @private @type {[string,['one',string[]]|['many',string[][]]][]} */
	known_strings=[];
	/** @private @type {[string,string|string[]][]} */
	new_known_strings=[];
	/** @private @type {[string,{t:boolean;f:boolean}][]} */
	known_booleans=[];
	/** @private @type {[string,{t:boolean;f:boolean}][]} */
	changed_known_bool=[];
	/** @private */
	save_data() {
		let data=this.create_save_data();
		let json_str=JSON.stringify(data);
		this.save_local_storage(json_str);
	}
	/** @private */
	save_known_bool() {
		this.save_tmp_data(this.create_save_data());
	}
	/** @private @returns {SaveDataRet} */
	create_save_data() {
		return {
			known_root_ve: this.known_root_ve,
			known_strings: this.known_strings,
			known_bool: this.known_booleans,
		};
	}
	/** @private */
	save_known_string() {
		/** @type {import("./types_tmp.js").SaveDataRet} */
		let data=this.restore_data();
		let tmp_known_str=this.known_strings;
		let arr=this.new_known_strings;
		for(let item of arr) {
			let [key,val]=item;
			let index=tmp_known_str.findIndex(e => e[0]===key);
			if(val instanceof Array) {
				if(index<0) {
					tmp_known_str.push([item[0],["many",[val]]]);
				} else {
					let target=tmp_known_str[index][1];
					if(target[0]==='one') {
						let inner=target[1].map(e => [e]);
						target=["many",inner];
						tmp_known_str[index][1]=target;
					}
					target[1].push(val);
				}
				return;
			}
			if(index<0) {
				tmp_known_str.push([item[0],['one',[val]]]);
				index=tmp_known_str.length-1;
			} else {
				let target=tmp_known_str[index][1];
				if(target[0]==='one') {
					target[1].push(val);
				} else {
					target[1].push([val]);
				}
			}
		}
		this.new_known_strings=[];
		this.save_tmp_data(data);
	}
	/** @private @arg {import("./types_tmp.js").SaveDataRet} data */
	save_tmp_data(data) {
		let json_str=JSON.stringify(data);
		this.save_local_storage(json_str);
	}
	/** @private */
	restore_data() {
		let json_str=this.get_local_storage();
		if(json_str) {
			return this.parse_data(json_str);
		} else {
			return this.create_save_data();
		}
	}
	/** @private @arg {string} str @returns {import("./types_tmp.js").SaveDataRet} */
	parse_data(str) {
		return JSON.parse(str);
	}
	/** @private */
	load_data() {
		let res=this.restore_data();
		if(res.known_root_ve) {
			this.known_root_ve=res.known_root_ve;
		}
		if(res.known_strings) {
			this.known_strings=res.known_strings;
		}
		if(res.known_bool) {
			this.known_booleans=res.known_bool;
		}
	}
}
/** @template {any[]} T @arg {[T,(x:T[number])=>void]} a0  */
function iterate(...[t,u]) {
	for(let item of t) {
		u(item);
	}
}
class BaseService extends BaseServicePrivate {
	/** @arg {any[]} x */
	log(...x) {
		console.log(...x);
	}
}
class CsiService extends BaseService {
	data={
		/** @type {import("./support/yt_api/_/b/BrowseEndpointPages.js").BrowseEndpointPages|null} */
		yt_fn: null,
		/** @type {"WEB"|null} */
		c: null,
		/** @type {"2.20221220.09.00"|null} */
		cver: null,
		/** @type {"1"|null} */
		yt_li: null,
		/** @type {"1"|null} */
		yt_ad: null,
	};
	/** @type {{[x: `${string}_rid`]: `0x${string}`|undefined;}} */
	rid={};
	/** @type {`${string}_rid`[]} */
	rid_keys=[
		"GetAccountMenu_rid","GetAccountSharing_rid","GetAccountNotifications_rid","GetAccountOverview_rid","GetAccountPlayback_rid",
		"GetAccountPrivacy_rid","GetAccountBilling_rid","GetAccountAdvanced_rid",
		"GetSubscriptions_rid",
		"GetNotificationsMenu_rid",
		"RecordNotificationInteractions_rid",
		"GetAttestationChallenge_rid",
		"GetHome_rid",
		"GetPlayer_rid","GetPlaylist_rid",
		"GetUnseenNotificationCount_rid",
		"GetWatchNext_rid",
		"GetWebMainAppGuide_rid",
	];
	/** @arg {ResolverT} x */
	constructor(x) {
		super(x);
		for(let x of this.rid_keys) {
			this.rid[x]=void 0;
		}
	}
	/** @arg {import("./support/yt_api/_/b/BrowseEndpointPages.js").BrowseEndpointPages} value */
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
	/** @arg {import("./support/yt_api/_/c/CsiServiceParamsType.js").CsiServiceParamsType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "c": {
					if(param.value!=="WEB") debugger;
					this.data[param.key]=param.value;
				} continue;
				case "cver": {
					if(param.value!=="2.20221220.09.00") debugger;
					this.data[param.key]=param.value;
				} continue;
				case "yt_li": {
					if(param.value!=="1") debugger;
					this.data[param.key]=param.value;
				} continue;
				case "yt_ad": if(param.value!=="1") debugger; this.data[param.key]=param.value; continue;
				case "yt_fn": if(!this.verify_param_yt_fn(param.value)) debugger; this.data[param.key]=param.value; continue;
			}
			if(param.key in this.rid) {
				/** @type {`${string}_rid`} */
				let rid_key=param.key;
				this.rid[rid_key]=param.value;
				continue;
			} else if(param.key.endsWith("_rid")) {
				this.rid[param.key]=param.value;
				console.log("new [unknown_rid_key][%s][%s]",param.key,param.value);
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
		/** @type {{name: "WEB";fexp:number[];version: "2.20221220"}|null} */
		client: null,
		expected_client_values: {
			fexp: [
				[1714247,9405964,23804281,23882502,23918597,23934970,23946420,23966208,23983296,23986033,23998056,24001373,24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738,24108447,24120820,24135310,24140247,24161116,24162919,24164186,24166867,24169501,24170049,24181174,24187043,24187377,24211178,24219381,24219713,24241378,24248091,24250324,24255163,24255543,24255545,24260378,24262346,24263796,24267564,24268142,24279196,24281896,24283015,24283093,24287604,24288442,24288663,24290971,24291857,24292955,24390675,24396645,24404640,24406313,24406621,24414718,24415864,24415866,24416290,24429095,24433679,24436009,24437562,24437575,24439482,24441244,39322504,39322574],
				[24590921,24217535,24421159,24402891,24443373,24197450,24591046],
				[39323120,39322983,39322873,39323013,39323020,39322863],
				[39322866,39322870,39322980,39323016,45686551],
				[39321827,39323023],
				[24128088,24429904,24124511,24061846,24293752],
			],
		},
	};
	/** @arg {import("./support/yt_api/_/e/ECatcherServiceParams.js").ECatcherServiceParamsType} params */
	on_params(params) {
		/** @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params) {
			/** @type {import("./support/make/Split.js").Split<typeof param.key,".">} */
			let param_parts=cast_as(param.key.split("."));
			if(param_parts[0]!=="client") debugger;
			switch(param_parts[1]) {
				case "version": {
					if(param.value!=="2.20221220") {debugger; break;};
					new_client.version=param.value;
				} break;
				case "name": if(param.value==="WEB") new_client.name=param.value; else debugger; break;
				case "fexp": new_client.fexp=param.value.split(",").map(e => parseInt(e,10)); break;
				default: console.log("new [param_key]",param); debugger;
			}
		}
		if(this.data.client) {
			let prev_client=this.data.client;
			this.data.client={...this.data.client,...new_client};
			let client=this.data.client;
			let expected=this.data.expected_client_values.fexp;
			let new_expected=[];
			x: for(let exp of client.fexp) {
				for(let expected_item of expected) {
					if(expected_item.includes(exp)) continue x;
				}
				new_expected.push(exp);
			}
			if(prev_client.name!==this.data.client.name) {
				console.log({name: prev_client.name},{name: this.data.client.name});
			}
			if(new_expected.length>0) console.log("new_fexp",new_expected);
		} else {
			this.data.client=new_client;
		}

	}
}
class GFeedbackService extends BaseService {
	data={
		/** @type {number[]|null} */
		e: null,
		/** @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @arg {import("./support/yt_api/_/g/GFeedbackServiceType.js").GFeedbackServiceType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": parse_browse_id(param.value); break;
				case "context": {
					if(param.value!=="yt_web_unknown_form_factor_kevlar_w2w") debugger;
					this.data.context=param.value;
				} break;
				case "e": {
					/** @type {number[]} */
					let new_expected=[];
					this.data.e=param.value.split(",").map(e => parseInt(e,10));
					this.data.e.forEach(e => {
						for(let known of this.x.get("e_catcher_service").data.expected_client_values.fexp) {
							if(known.includes(e)) return;
						}
						new_expected.push(e);
					});
					if(new_expected.length>0) console.log("new g_feedback flag_id",new_expected);
				} break;
				case "has_alc_entitlement": break;
				case "has_unlimited_entitlement": break;
				case "ipcc": break;
				case "is_alc_surface": break;
				case "is_casual": break;
				case "is_monetization_enabled": break;
				case "is_owner": break;
				case "is_viewed_live": break;
				case "logged_in": {
					if(param.value=="0") {general_service_state.logged_in=false; break;}
					if(param.value=="1") {general_service_state.logged_in=true; break;}
					debugger;
				} break;
				case "num_shelves": break;
				case "premium_membership": if(param.value!=="non_member") debugger; general_service_state.premium_membership=param.value; break;
				case "route": if(param.value!=="channel.featured") debugger; break;
				default: console.log("new [param_key]",param); debugger;
			}
		}
	}
}
class GuidedHelpService extends BaseService {
	data={
		/** @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @arg {import("./support/yt_api/_/g/GuidedHelpServiceParamsList.js").GuidedHelpServiceParamsList} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "logged_in": {
					if(param.value=="0") {general_service_state.logged_in=false; break;}
					if(param.value=="1") {general_service_state.logged_in=true; break;}
					debugger;
				} break;
				case "context": if(param.value!=="yt_web_unknown_form_factor_kevlar_w2w") debugger; this.data.context=param.value; break;
				default: console.log("new [param_key]",param); debugger;
			}
		}
	}
}
class TrackingServices extends BaseService {
	/** @arg {import("./support/yt_api/_/c/CsiServiceParams.js").CsiServiceParams} service */
	on_csi_service(service) {
		this.x.get("csi_service").on_params(service.params);
	}
	/** @arg {import("./support/yt_api/_/e/ECatcherServiceParams.js").ECatcherServiceParams} service */
	on_e_catcher_service(service) {
		this.x.get("e_catcher_service").on_params(service.params);
	}
	/** @arg {import("./support/yt_api/_/g/GFeedbackServiceParams.js").GFeedbackServiceParams} service */
	on_g_feedback_service(service) {
		this.x.get("g_feedback_service").on_params(service.params);
	}
	/** @arg {import("./support/yt_api/_/g/GuidedHelpServiceParams.js").GuidedHelpServiceParams} service */
	on_guided_help_service(service) {
		this.x.get("guided_help_service").on_params(service.params);
	}
	/** @arg {import("./support/yt_api/_/g/GOOGLE_HELP_service_params.js").GOOGLE_HELP_service_params} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": parse_browse_id(param.value); break;
				default: console.log("new [param_key]",param); debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/a/AllServiceTrackingParams.js").AllServiceTrackingParams[]} params */
	set_service_params(params) {
		for(let service_param_list of params) {
			switch(service_param_list.service) {
				case "CSI": this.on_csi_service(service_param_list); break;
				case "ECATCHER": this.on_e_catcher_service(service_param_list); break;
				case "GFEEDBACK": this.on_g_feedback_service(service_param_list); break;
				case "GUIDED_HELP": this.on_guided_help_service(service_param_list); break;
				case "GOOGLE_HELP": this.on_google_help_service(service_param_list); break;
				default: debugger;
			}
		}
		this.on_complete_set_service_params();
	}
	on_complete_set_service_params() {
		seen_map.clear();
	}
}
//#endregion Service
function get_exports() {
	return exports;
}
if(typeof exports==="object") {
	let exports=get_exports();
	exports.Gn=Gn;
	exports.CsiService=CsiService;
	exports.ECatcherService=ECatcherService;
	exports.GFeedbackService=GFeedbackService;
	exports.GuidedHelpService=GuidedHelpService;
	exports.TrackingServices=TrackingServices;
	exports.FilterHandlers=FilterHandlers;
	exports.ServiceResolver=ServiceResolver;
	exports.FilterHandlers=FilterHandlers;
	exports.HiddenData=HiddenData;
	exports.VolumeRange=VolumeRange;
}
//#region decode_entity_key
/** @name Ys */
class ArrayViewType {
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
	/** @arg {ArrayViewType} v */
	constructor(v) {
		this.arrayView=v;
		this.pos=0;
		this.pendingTagAndType=-1;
	}
}
/** @arg {ArrayViewType} a @arg {number} b */
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
	return base64_dec.decodeArrayBuffer(x);
}
const uint8_string_decoder=new TextDecoder();
/** @arg {BufferSource} x */
function LUa(x) {
	return uint8_string_decoder.decode(x);
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
/** @type {import("./support/RUa_type.js").RUa} */
const RUa_b={
	"2": "fakeChannel",
	"17": "musicAlbumRelease",
	"18": "musicAlbumReleaseDetail",
	"19": "musicAlbumReleaseUserDetail",
	"20": "musicArtist",
	"21": "musicArtistDetail",
	"22": "musicArtistUserDetail",
	"24": "musicPlaylist",
	"28": "musicTrack",
	"29": "musicTrackDetail",
	"30": "musicTrackUserDetail",
	"76": "videoPlaybackPositionEntity",
	"100": "musicShare",
	"119": "playbackData",
	"120": "transfer",
	"121": "musicLibraryEdit",
	"130": "offlineVideoPolicy",
	"141": "downloadStatusEntity",
	"148": "refresh",
	"151": "ytMainVideoEntity",
	"152": "ytMainChannelEntity",
	"155": "ytMainDownloadedVideoEntity",
	"158": "mainDownloadsLibraryEntity",
	"164": "mainDownloadsListEntity",
	"169": "offlineOrchestrationActionWrapperEntity",
	"182": "fakeVideo",
	"198": "offlineVideoStreams",
	"202": "downloadQualityPickerEntity",
	"217": "liveChatPollStateEntity",
	"225": "captionTrack",
	"229": "iconBadgeEntity",
	"234": "musicTrackDownloadMetadataEntity",
	"236": "commerceCartListEntity",
	"242": "orchestrationWebSamplingEntity",
	"245": "logoEntity",
	"246": "offlineabilityEntity",
	"248": "musicPlaylistDownloadMetadataEntity",
	"252": "flowStateEntity",
	"257": "musicDownloadsLibraryEntity",
	"259": "musicAlbumReleaseDownloadMetadataEntity",
	"261": "mainVideoEntity",
	"262": "mainVideoDownloadStateEntity",
	"264": "downloadsPageViewConfigurationEntity",
	"273": "pinnedProductEntity",
	"275": "channelHandle",
	"278": "fakeVideoDescription",
	"279": "fakePlaylist",
	"280": "fakePlaylistEntryCollection",
	"297": "settingEntity",
	"299": "downloadsPageRefreshTokenEntity",
	"306": "mainPlaylistEntity",
	"312": "markersVisibilityOverrideEntity",
	"318": "musicLibraryStatusEntity",
	"329": "macroMarkerEntity",
	"356": "quantityIncrementerEntity",
	"358": "buttonEntity",
	"368": "mainPlaylistVideoEntity",
	"373": "mainPlaylistDownloadStateEntity",
	"393": "emojiFountainDataEntity",
	"406": "continuationTokenEntity"
};
/** @type {{[U in keyof typeof RUa_b]: import("./support/RUa_type.js").RUa[U]}} */
const RUa=RUa_b;
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
	a=new EntityKeyReader(new ArrayViewType([base64_to_array(decodeURIComponent(a))]));
	if(PUa(a,2)) {
		/** @type {string|number|Uint8Array|undefined} */
		var b=Zs(a);
		var c=a.pos;
		/** @type {ArrayViewType|DataView|Uint8Array|string} */
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
	if(!is_keyof_RUa(a)) throw new Error("Invalid state");
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
//#endregion
//#region 
class HandleTypes extends BaseService {
	/** @arg {import("./support/yt_api/_/w/WatchResponsePlayer.js").WatchResponsePlayer} response */
	WatchResponsePlayer(response) {
		let data=response;
		if(data.playerAds) {
			let old_ads=data.playerAds;
			if(is_yt_debug_enabled) console.log("WatchResponsePlayer.playerAds=",data.playerAds);
			data.playerAds=[];
			/** @type {{old_store:typeof data["playerAds"]}&typeof data["playerAds"]} */
			let with_old_store=cast_as(data.playerAds);
			with_old_store.old_store=old_ads;
		}
		if(data.adPlacements) {
			if(is_yt_debug_enabled) console.log("WatchResponsePlayer.adPlacements=",data.adPlacements);
			data.adPlacements=[];
		}
		if(data.endscreen) {
			let elements=data.endscreen.endscreenRenderer.elements;
			for(let element of elements) {
				let ok_2=get_keys_of(element);
				x: {
					if(ok_2[0]==="endscreenElementRenderer"&&ok_2.length===1) break x;
					console.log("[on_page_type_watch_log_element] element ok_2 [%s]",ok_2.join(","));
				}
				if("endscreenElementRenderer" in element) {
					this.endscreenElementRenderer(element.endscreenElementRenderer);
				} else {
					debugger;
				}
			}
			let ok_1=get_keys_of(data.endscreen);
			if(ok_1.length!==1) {
				console.log("[on_page_type_watch_log_0] endscreen ok_1 [%s]",ok_1.join(","));
				debugger;
			}
			let ok_2=get_keys_of(data.endscreen.endscreenRenderer);
			if(eq_keys(ok_2,["elements","startMs","trackingParams"])) return;
			console.log("[on_page_type_watch_log_1] endscreenRenderer ok_2 [%s]",ok_2.join(","));
		}
		let ok=get_keys_of(data);
		for(let key of ok) {
			if(key==="responseContext") continue;
			if(key==="playabilityStatus") continue;
			if(key==="streamingData") continue;
			if(key==="playerAds") continue;
			if(key==="playbackTracking") continue;
			if(key==="captions") continue;
			if(key==="videoDetails") continue;
			if(key==="annotations") continue;
			if(key==="playerConfig") continue;
			if(key==="storyboards") continue;
			if(key==="microformat") continue;
			if(key==="cards") continue;
			if(key==="trackingParams") continue;
			if(key==="attestation") continue;
			if(key==="videoQualityPromoSupportedRenderers") continue;
			if(key==="adPlacements") continue;
			if(key==="frameworkUpdates") continue;
			// other
			if(key==="endscreen") continue;
			console.log("[on_page_type_watch_log_iter]",key);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/b/DesktopTopbarRenderer.js").DesktopTopbarRenderer} renderer */
	DesktopTopbarRenderer(renderer) {
		this.DesktopTopbarRendererData(renderer.desktopTopbarRenderer);
	}
	/** @arg {import("./support/yt_api/_/b/DesktopTopbarRendererData.js").DesktopTopbarRendererData} data */
	DesktopTopbarRendererData(data) {
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...x}=data;
		this.trackingParams(trackingParams);
		this.topbarLogoRenderer(logo.topbarLogoRenderer);
		this.FusionSearchboxRenderer(searchbox);
		this.primitive(countryCode);
		iterate(topbarButtons,x => this.TopbarButtonItem(x));
		this.HotkeyDialogRenderer(hotkeyDialog);
		this.ButtonRenderer(backButton);
		this.ButtonRenderer(forwardButton);
		this.ButtonRenderer(a11ySkipNavigationButton);
		this.ButtonRenderer(voiceSearchButton);
		empty_object(x);
	}
	/** @type {import("./support/yt_api/_/b/valid_titles_for_tabbed_header_renderer_t.js").valid_titles_for_tabbed_header_renderer_t} */
	valid_titles_for_tabbed_header_renderer=[
		"Home",
		"Subscriptions",
	];
	/** @arg {import("./support/yt_api/_/b/FeedTabbedHeaderRenderer.js").FeedTabbedHeaderRenderer} renderer */
	FeedTabbedHeaderRenderer(renderer) {
		let data=renderer.feedTabbedHeaderRenderer;
		if(
			eq_keys(get_keys_of(data),["title"])&&
			data.title.runs.length===1&&
			this.valid_titles_for_tabbed_header_renderer.includes(data.title.runs[0].text)
		) return;
		if(eq_keys(get_keys_of(data),["title"])&&data.title.runs.length===1) {
			console.log("[feed_tabbed_header_new_title]",data.title.runs[0].text);
		} else {
			console.log(renderer.feedTabbedHeaderRenderer);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/b/EntityBatchUpdate.js").EntityBatchUpdate} obj */
	handleEntityBatchUpdate(obj) {
		if(get_keys_of(obj)[0]!=="entityBatchUpdate") {
			console.log("[entity_batch_invalid]",obj);
			return;
		}
		if(is_yt_debug_enabled) console.log("[entity_update_time]",obj.entityBatchUpdate.timestamp);
		this.handle_mutations(obj.entityBatchUpdate.mutations);
	}
	/** @arg {import("./support/yt_api/_/e/EntityMutationItem.js").EntityMutationItem[]} mutations */
	handle_mutations(mutations) {
		for(let mut of mutations) {
			switch(mut.type) {
				case "ENTITY_MUTATION_TYPE_DELETE": {
					let dec=decode_entity_key(mut.entityKey);
					console.log("[mut_del] type=[%s] id=[%s]",dec.entityType,dec.entityId);
					if(eq_keys(get_keys_of(mut.options),["persistenceOption"])) {
						console.log("[mut_del] mut_opt [persistence][%s]",mut.options.persistenceOption);
					} else {
						debugger;
					}
				} break;
				case "ENTITY_MUTATION_TYPE_REPLACE": console.log("[mut_rep]",mut); break;
				default: console.log("[mut]",mut); debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/r/ReloadContinuationItemsCommand.js").ReloadContinuationItemsCommand} command */
	ReloadContinuationItemsCommand(command) {
		let data=command.reloadContinuationItemsCommand;
		for(let item of data.continuationItems) {
			if("richItemRenderer" in item) {
				this.richItemRenderer(item.richItemRenderer);
			} else {
				console.log("[reload_continuation_command_item]",item);
				debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/g/GeneralContext.js").ResponseContext} context */
	responseContext(context) {
		if(!context) {
			debugger;
		}
		let ok=get_keys_of(context);
		for(let key of ok) {key;}
		if(context.maxAgeSeconds!==void 0) {
			general_service_state.maxAgeSeconds=context.maxAgeSeconds;
		}
		let data_sync_id=context.mainAppWebResponseContext.datasyncId;
		general_service_state.mainAppWebResponseContext??={
			datasyncId: data_sync_id.split("|").map(e => e===""? null:e).map(e => {
				if(e===null) return e;
				return BigInt(e);
			})
		};
		if(is_yt_debug_enabled) console.log(general_service_state.mainAppWebResponseContext.datasyncId);
		if(context.mainAppWebResponseContext.loggedOut) {
			general_service_state.logged_in=false;
		}
		this.x.get("service_tracking").set_service_params(context.serviceTrackingParams);
	}
	/** @arg {{playlistVideoListRenderer:import("./support/yt_api/_/p/PlaylistVideoListRendererData.js").PlaylistVideoListRendererData}} renderer */
	playlistVideoListRenderer(renderer) {
		let data=renderer.playlistVideoListRenderer;
		console.log("playlist",data.playlistId);
	}
	/** @arg {import("./support/yt_api/_/i/PageIntroductionRenderer.js").PageIntroductionRenderer} item */
	pageIntroductionRenderer(item) {
		this.PageIntroductionRendererData(item.pageIntroductionRenderer);
	}
	/** @template {{}} T @arg {string} name @arg {T} obj */
	ok(name,obj) {
		let arr=get_keys_of(obj);
		if(arr.length===0) return;
		console.log(name+": not ok",arr.join());
		console.log(name,obj);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/t/TextRun.js").TextRun} run */
	TextRun(run) {
		let {text,navigationEndpoint,bold,...rest}=run;
		return rest;
	}
	/** @typedef {import("./support/yt_api/_/s/YtTextType.js").YtTextType} YtTextType */
	/** @arg {Extract<YtTextType,{runs:any}>} text */
	TextRuns(text) {
		let rest=[];
		for(let run of text.runs) rest.push(this.TextRun(run));
		return rest;
	}
	/** @private @arg {Exclude<YtTextType,{runs:any}>} x */
	SimpleText(x) {
		let {simpleText,accessibility: a,...y}=x;
		if(a) this.Accessibility(a);
		this.primitive(simpleText);
		empty_object(y);
	}
	/** @private @arg {import("./support/yt_api/_/t/TextRun.js").TextRun[]} arr */
	TextRun_va(...arr) {
		iterate(arr,this.TextRun.bind(this));
	}
	/** @private @arg {YtTextType} text */
	YtTextType(text) {
		if(!text) {
			debugger;
			return;
		}
		if("runs" in text) {
			this.TextRun_va(...text.runs);
		} else {
			this.SimpleText(text);
		}
	}
	valid_icon_types=[
		"ACCOUNT_SHARING",
		"ACCOUNT_PRIVACY",
		"ACCOUNT_ADVANCED",
		"ACCOUNT_BILLING",
		"ACCOUNT_SETTINGS",
		"ACCOUNT_PLAYBACK",
		"ACCOUNT_NOTIFICATIONS",
		"CLOSE",
		"SEARCH",
		"SETTINGS",
		"YOUTUBE_LOGO",
	];
	/** @template {string} T @arg {import("./support/yt_api/_/i/Icon.js").Icon<T>} icon */
	Icon(icon) {
		if(!this.valid_icon_types.includes(icon.iconType)) {
			console.log("[new_icon]",icon);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/i/PageIntroductionRendererData.js").PageIntroductionRendererData} data */
	PageIntroductionRendererData(data) {
		if(!("headerText" in data)) {
			debugger;
		}
		let {headerText,...x}=data;
		this.YtTextType(headerText);
		/** @type {typeof x|{}} */
		let y=x;
		if("bodyText" in y) {
			let {bodyText,pageTitle,...z}=y;
			this.YtTextType(bodyText);
			this.YtTextType(pageTitle);
			y=z;
		}
		if("pageTitle" in y) {
			let {pageTitle,...z}=y;
			this.YtTextType(pageTitle);
			y=z;
		}
		if("headerIcon" in y) {
			let {headerIcon,...z}=y;
			this.Icon(headerIcon);
			y=z;
		}
		this.ok("PageIntroductionRendererData",y);
	}
	/** @arg {import("./support/yt_api/_/i/ItemSectionRenderer.js").ItemSectionRenderer} renderer */
	itemSectionRenderer(renderer) {
		if(!renderer.itemSectionRenderer) {
			debugger;
		}
		let data=renderer.itemSectionRenderer;
		this.trackingParams(data.trackingParams);
		let contents=data.contents;
		for(let content_item of contents) {
			let ok_first=get_keys_of(content_item)[0];
			if("playlistVideoListRenderer" in content_item) {
				this.playlistVideoListRenderer(content_item);
			} else if("pageIntroductionRenderer" in content_item) {
				this.pageIntroductionRenderer(content_item);
			} else if("settingsOptionsRenderer" in content_item) {
				this.settingsOptionsRenderer(content_item);
			} else if("connectedAppRenderer" in content_item) {
				this.connectedAppRenderer(content_item);
			} else if("shelfRenderer" in content_item) {
				this.shelfRenderer(content_item);
			} else {
				console.log("[need_section_handler][%s]",ok_first);
				debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/s/SectionListRenderer.js").SectionListRenderer} renderer */
	sectionListRenderer(renderer) {
		let data=renderer.sectionListRenderer;
		if(!data) {
			debugger;
		}
		this.trackingParams(data.trackingParams);
		let contents=data.contents;
		for(let content_item of contents) {
			if("itemSectionRenderer" in content_item) {
				this.itemSectionRenderer(content_item);
			} else if("continuationItemRenderer" in content_item) {
				this.continuationItemRenderer(content_item);
			} else {
				debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/t/TabRenderer.js").TabRenderer} renderer */
	tabRenderer(renderer) {
		this.trackingParams(renderer.trackingParams);
		if("sectionListRenderer" in renderer.content) {
			this.sectionListRenderer(renderer.content);
		};
	}
	/** @arg {import("./support/yt_api/_/t/TwoColumnBrowseResultsRenderer.js").TwoColumnBrowseResultsRenderer} renderer */
	twoColumnBrowseResultsRenderer(renderer) {
		if(get_keys_of(renderer)[0]!=="twoColumnBrowseResultsRenderer") {
			console.log("[handler_invalid]",renderer);
			return;
		}
		let data=renderer.twoColumnBrowseResultsRenderer;
		for(let tab of data.tabs) {
			this.tabRenderer(tab.tabRenderer);
		}
	}
	/** @arg {import("./support/yt_api/_/t/TwoColumnBrowseResultsRenderer.js").TwoColumnBrowseResultsRenderer} contents */
	BrowseResponseContentContents(contents) {
		this.twoColumnBrowseResultsRenderer(contents);
		if(get_keys_of(contents).length!==1||get_keys_of(contents)[0]!=="twoColumnBrowseResultsRenderer") {
			console.log("[on_browse_response_contents]",contents);
		}
	}
	item_by_layout_id=new Map;
	/** @arg {{layoutId:string}} node */
	item_with_layout_id(node) {
		if(this.log_layout_ids) console.log("[node_layout_id] [%s]",node.layoutId);
		this.item_by_layout_id.set(node.layoutId,node);
	}
	log_layout_ids=false;
	/** @arg {import("./support/yt_api/_/b/AdLayoutLoggingData.js").AdLayoutLoggingData} data */
	adLayoutLoggingData(data) {
		let new_data=data.serializedAdServingDataEntry;
		if(saved_data.ad_layout_data) {
			saved_data.ad_layout_data.serializedAdServingDataEntry=new_data;
		} else {
			saved_data.ad_layout_data??={
				serializedAdServingDataEntry: new_data
			};
		}
		let dec=decode_b64_proto_obj(data.serializedAdServingDataEntry);
		console.log("log data entry [%o]",{w: dec.first_w,f: dec.first_f},dec.as_num);
		console.log("log data entry rest",...dec.rest);
		console.log("[log_data_entry] [%s]",data.serializedAdServingDataEntry);
	}
	/** @arg {import("./support/yt_api/_/b/AdLayoutMetadataItem.js").AdLayoutMetadataItem} item */
	AdLayoutMetadataItem(item) {
		switch(item.layoutType) {
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": this.item_with_layout_id(item); break;
			default: debugger;
		}
		this.adLayoutLoggingData(item.adLayoutLoggingData);
	}
	/** @arg {import("./support/yt_api/_/b/AdLayoutMetadataItem.js").AdLayoutMetadataItem[]} metadata */
	adLayoutMetadata(metadata) {
		for(let item of metadata) {
			this.AdLayoutMetadataItem(item);
		}
	}
	log_ad_metadata=false;
	/** @arg {import("./support/yt_api/_/b/AdSlotMetadata.js").AdSlotMetadata} metadata */
	adSlotMetadata(metadata) {
		switch(metadata.slotType) {
			case "SLOT_TYPE_IN_FEED": break;
			default: debugger;
		}
		if(this.log_ad_metadata) {
			console.log("ad slot meta pos",metadata.slotType);
			console.log("ad slot meta slot_id [%s]",metadata.slotId);
			console.log("ad slot meta pos [%o]",metadata.slotPhysicalPosition);
		}
	}
	log_ads_commands=false;
	/** @arg {import("./support/yt_api/_/b/AdsControlFlowOpportunityReceivedCommandData.js").AdsControlFlowOpportunityReceivedCommandData} command */
	adsControlFlowOpportunityReceivedCommand(command) {
		let ok=filter_out_keys(get_keys_of(command),split_string("opportunityType,isInitialLoad,enablePacfLoggingWeb,",","));
		if("adSlotAndLayoutMetadata" in command) {
			for(let item of command.adSlotAndLayoutMetadata) {
				this.adLayoutMetadata(item.adLayoutMetadata);
				this.adSlotMetadata(item.adSlotMetadata);
			}
		}
		if(eq_keys(ok,[])||eq_keys(ok,["adSlotAndLayoutMetadata"])) {
			if(this.log_ads_commands) console.log("[browse_response_rx_ad] is_initial_load [%o]",command.isInitialLoad);
			if(this.log_ads_commands) console.log("[browse_response_rx_ad] PacfLogging_web [%o]",command.enablePacfLoggingWeb);
			if(command.opportunityType!=="OPPORTUNITY_TYPE_ORGANIC_BROWSE_RESPONSE_RECEIVED") debugger;
		} else {
			console.log("[%s] %o",ok.join(","),command);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/r/ResponseReceivedActionItem.js").ResponseReceivedActionItem[]} actions */
	onResponseReceivedActions(actions) {
		for(let action of actions) {
			if("adsControlFlowOpportunityReceivedCommand" in action) {
				this.adsControlFlowOpportunityReceivedCommand(action.adsControlFlowOpportunityReceivedCommand);
			} else if("reloadContinuationItemsCommand" in action) {
				this.ReloadContinuationItemsCommand(action);
			} else {
				debugger;
			}
		}
	}
	/** @arg {import("./support/yt_api/_/b/BrowseResponseContent.js").StateTagItem[]} tags */
	observedStateTags(tags) {
		for(let tag of tags) {
			switch(tag.instruction) {
				case "STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY": break;
				default: console.log(tag); debugger;
			};
		}
	}
	/** @arg {import("./support/yt_api/_/b/BrowseResponseContent.js").BrowseResponseContent} data */
	BrowseResponseContent(data) {
		let {
			trackingParams,responseContext: rc,
			contents,frameworkUpdates,header,topbar,sidebar,
			observedStateTags,cacheMetadata,
			onResponseReceivedActions,
			...rest
		}=data;
		if(rc) this.responseContext(rc);
		this.trackingParams(trackingParams);
		if(contents) this.BrowseResponseContentContents(contents);
		if(data.frameworkUpdates) {
			this.handleEntityBatchUpdate(data.frameworkUpdates);
		}
		if(data.header) this.header(data.header);
		if(data.onResponseReceivedActions) {
			this.onResponseReceivedActions(data.onResponseReceivedActions);
		}
		if(data.topbar) this.topbar(data.topbar);
		if(data.sidebar) this.sidebar(data.sidebar);
		if(data.observedStateTags) {
			this.observedStateTags(data.observedStateTags);
		}
		if(data.cacheMetadata) {
			this.cacheMetadata(data.cacheMetadata);
		}
		let ok=get_keys_of(rest);
		for(let k of ok) {
			assert_is_never(k);
		}
		if(ok.length>0) {
			console.log("[browse_page_context_miss]: [%s]",ok.join(","),data);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/s/CacheMetadata.js").CacheMetadata} meta */
	cacheMetadata(meta) {
		console.log(meta);
	}
	/** @arg {import("./support/yt_api/_/a/AccessibilityData.js").AccessibilityData} data */
	AccessibilityData(data) {
		if(eq_keys(get_keys_of(data),["label"])) return;
		console.log(data);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/a/Accessibility.js").Accessibility} data */
	Accessibility(data) {
		this.AccessibilityData(data.accessibilityData);
	}
	/** @arg {import("./support/yt_api/_/b/YtEndpoint.js").YtEndpoint} ep */
	endpoint(ep) {
		const {clickTrackingParams: a,commandMetadata: b,...ex}=ep;
		this.clickTrackingParams(a);
		this.commandMetadata(b);
		if("signalServiceEndpoint" in ex) return this.SignalServiceEndpointData(ex.signalServiceEndpoint);
		if("watchEndpoint" in ex) return this.WatchEndpointData(ex.watchEndpoint);
		if("urlEndpoint" in ex) return this.UrlEndpointRoot(ex.urlEndpoint);
		if("browseEndpoint" in ex) return this.BrowseEndpointData(ex.browseEndpoint);
		if("searchEndpoint" in ex) return this.SearchEndpointData(ex.searchEndpoint);
		if("setSettingEndpoint" in ep) return this.setSettingEndpoint(ex.setSettingEndpoint);
		if(Object.keys(ex).length>0) {
			console.log("[yt_endpoint] [%s]",Object.keys(ex).join(),ex);
		}
	}
	/** @arg {import("./support/yt_api/_/b/ButtonRendererData.js").DefaultButtonTypes} x */
	DefaultButtonRenderer(x) {
		/** @type {typeof x|{}} */
		let y;
		let style,isDisabled,size,trackingParams;
		({style,size,isDisabled,trackingParams,...y}=x);
		this.trackingParams(trackingParams);
		this.primitives(style,isDisabled,size);
		if("serviceEndpoint" in y) {
			let {serviceEndpoint,...a}=y; y=a;
			this.endpoint(serviceEndpoint);
		}
	}
	/** @arg {import("./support/yt_api/_/b/ButtonRendererData.js").SuggestiveButtonTypes} x */
	SuggestiveButtonRenderer(x) {
		let {style,isDisabled,size,trackingParams,text,...y}=x;
		this.trackingParams(trackingParams);
		this.primitives(style,isDisabled,size);
		this.YtTextType(text);
		if("serviceEndpoint" in y) {
			let {serviceEndpoint,...a}=y;
			empty_object(a);
			this.endpoint(serviceEndpoint);
			return;
		} else if("navigationEndpoint" in y) {
			let {navigationEndpoint,accessibilityData,command,...a}=y;
			empty_object(a);
			this.Accessibility(accessibilityData);
			this.endpoint(command);
			this.endpoint(navigationEndpoint);
			return;
		} else if("accessibilityData" in y) {
			let {accessibilityData,command,...a}=y;
			empty_object(a);
			this.Accessibility(accessibilityData);
			this.endpoint(command);
			return;
		}
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/ButtonRendererData.js").NoStyleButtonTypes_} x */
	NoStyleButtonTypes(x) {
		let {trackingParams,command,...y}=x;
		this.trackingParams(trackingParams);
		this.endpoint(command);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/ButtonRendererData.js").ButtonRendererData} renderer */
	buttonRenderer(renderer) {
		if(!("style" in renderer)) {
			this.NoStyleButtonTypes(renderer);
			return;
		}
		switch(renderer.style) {
			case "STYLE_DEFAULT": this.DefaultButtonRenderer(renderer); break;
			case "STYLE_SUGGESTIVE": this.SuggestiveButtonRenderer(renderer); break;
			case void 0: this.NoStyleButtonTypes(renderer); break;
			default: console.log(renderer); debugger;
		}
	}
	/** @arg {number|string|bigint|boolean} value */
	primitive(value) {
		switch(typeof value) {
			case "bigint":
			case "boolean":
			case "number":
			case "string": {
			} break;
			default: debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/a/AddToPlaylistCommand.js").AddToPlaylistCommand} cmd */
	addToPlaylistCommand(cmd) {
		console.log(cmd);
	}
	/** @arg {import("./support/yt_api/_/s/ServiceEndpointAction.js").ServiceEndpointAction} action */
	ServiceEndpointAction(action) {
		let {clickTrackingParams: ct,...rest}=action;
		this.clickTrackingParams(ct);
		if("addToPlaylistCommand" in rest) {
			this.addToPlaylistCommand(rest.addToPlaylistCommand);
		} else if("openPopupAction" in rest) {
			this.openPopupAction(rest.openPopupAction);
		} else if("signalAction" in action) {
			this.signalAction(action.signalAction);
		} else {
			let k=get_keys_of(rest);
			console.log("[service_action] [%s]",k.join(),rest);
		}
	}
	/** @arg {import("./support/yt_api/_/s/YtSignalAction.js").YtSignalAction} x */
	signalAction(x) {
		switch(x.signal) {
			case "HISTORY_BACK": break;
			case "HISTORY_FORWARD": break;
			default: debugger;
		};
	}
	/** @arg {import("./support/yt_api/_/o/OpenPopupAction.js").OpenPopupAction} obj */
	openPopupAction(obj) {
		switch(obj.popupType) {
			case "DIALOG": this.popup(obj.popup); break;
			case "DROPDOWN": this.popup(obj.popup); break;
			case "TOAST": this.popup(obj.popup); break;
			case "TOP_ALIGNED_DIALOG": this.popup(obj.popup); break;
			default: console.log(obj);
		}
	}
	/** @arg {import("./support/yt_api/_/o/AllPopups.js").AllPopups} x */
	popup(x) {
		let ok=get_keys_of(x);
		switch(ok[0]) {case "aboutThisAdRenderer": if(ok[0] in x) this.renderer(x[ok[0]]); return;}
		switch(ok[0]) {case "confirmDialogRenderer": if(ok[0] in x) this.renderer(x[ok[0]]); return;}
		switch(ok[0]) {case "multiPageMenuRenderer": if(ok[0] in x) this.renderer(x[ok[0]]); return;}
		switch(ok[0]) {case "notificationActionRenderer": if(ok[0] in x) this.renderer(x); return;}
		switch(ok[0]) {
			case "voiceSearchDialogRenderer": if(ok[0] in x) this.renderer(x[ok[0]]); return;
			default: if(ok[0] in x) {console.log("use default for",x,x[ok[0]]); this.renderer(x[ok[0]]);}
		}
		console.log("[unk_popup_info][%s]",ok,x);
	}
	/** @arg {import("./support/yt_api/_/d/GenericRenderer.js").GenericRenderer} x */
	renderer(x) {
		let cr=null;
		let ok=get_keys_of(x);
		iterate(ok,v => {
			switch(v) {
				case "connectionErrorHeader": return;
				case "placeholderHeader": return;
				case "promptHeader": return;
				case "exampleQuery1": return;
				case "exampleQuery2": return;
				case "promptMicrophoneLabel": return;
				case "loadingHeader": return;
				case "connectionErrorHeader": return;
				case "connectionErrorMicrophoneLabel": return;
				case "permissionsHeader": return;
				case "permissionsSubtext": return;
				case "disabledHeader": return;
				case "disabledSubtext": return;
				case "microphoneButtonAriaLabel": return;
				case "exitButton": return;
				case "ghostGridRenderer": return;
				case "microphoneOffPromptHeader": return;
				case "notificationActionRenderer": return;
				case "trackingParams": return;
				case "url": return;
				default: debugger;
			}
		});
		if("placeholderHeader" in x) {
			let {trackingParams: tp,placeholderHeader,promptHeader,exampleQuery1,exampleQuery2,promptMicrophoneLabel,loadingHeader,connectionErrorHeader,connectionErrorMicrophoneLabel,permissionsHeader,permissionsSubtext,disabledHeader,disabledSubtext,microphoneButtonAriaLabel,exitButton,microphoneOffPromptHeader,...c}=x;
			cr=c;
			this.trackingParams(tp);
			this.YtTextType(placeholderHeader);
			this.YtTextType(promptHeader);
			this.YtTextType(exampleQuery1);
			this.YtTextType(exampleQuery2);
			this.YtTextType(promptMicrophoneLabel);
			this.YtTextType(loadingHeader);
			this.YtTextType(connectionErrorHeader);
			this.YtTextType(connectionErrorMicrophoneLabel);
			this.YtTextType(permissionsHeader);
			this.YtTextType(permissionsSubtext);
			this.YtTextType(disabledHeader);
			this.YtTextType(disabledSubtext);
			this.YtTextType(microphoneButtonAriaLabel);
			this.ButtonRenderer(exitButton);
			this.YtTextType(microphoneOffPromptHeader);
		}
		if(!cr&&"notificationActionRenderer" in x) {
			const {notificationActionRenderer: a0,...c}=x; cr=c;
			const {responseText,trackingParams,...a}=a0;
			empty_objects(a);
		}
		if(!cr&&"ghostGridRenderer" in x) {
			const {ghostGridRenderer: a0,...c}=x; cr=c;
			this.ghostGridRenderer(a0);
		}
		if(!cr&&"trackingParams" in x) {
			const {trackingParams: tp,...c}=x; cr=c;
			this.trackingParams(tp);
		}
		if(!cr) return;
		let ok_1=Object.keys(cr);
		if(!ok_1.length) return;
		console.log("[renderer_log] [%s]",Object.keys(cr).join(),cr);
	}
	/** @arg {import("./support/yt_api/_/t/NotificationActionRenderer.js").NotificationActionRenderer} x */
	ToastPopupTag(x) {
		const {notificationActionRenderer: v,...y}=x;
		this.notificationActionRenderer(v);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/d/DropdownPopup.js").DropdownPopup} obj */
	DropdownPopup(obj) {
		console.log(obj);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/n/ConfirmDialogRenderer.js").ConfirmDialogRenderer} data */
	ConfirmDialogRendererData(data) {
		let ok=get_keys_of(data);
		this.ButtonRenderer(data.cancelButton);
		this.ButtonRenderer(data.confirmButton);
		if(eq_keys(ok,["cancelButton","confirmButton","dialogMessages","primaryIsCancel","title","trackingParams"])) return;
		console.log(ok);

	}
	/** @arg {import("./support/yt_api/_/d/DialogPopup.js").DialogPopup} obj */
	DialogPopup(obj) {
		console.log(obj);
	}
	/** @arg {import("./support/yt_api/_/s/SignalServiceEndpoint.js").SignalServiceEndpointData} ep */
	SignalServiceEndpointData(ep) {
		for(let action of ep.actions) {
			this.ServiceEndpointAction(action);
		}
		if(ep.signal!=="CLIENT_SIGNAL") {
			console.log("[new_signal]",ep.signal);
		}
	}
	/** @arg {import("./support/yt_api/_/c/ContinuationCommand.js").ContinuationCommand} cmd */
	continuationCommand(cmd) {
		console.log(cmd);
	}
	/** @arg {import("./support/yt_api/_/u/SimpleMenuHeaderRendererData.js").SimpleMenuHeaderRendererData} renderer */
	simpleMenuHeaderRenderer(renderer) {
		for(let button of renderer.buttons) {
			this.buttonRenderer(button.buttonRenderer);
		}
	}
	/** @arg {import("./support/yt_api/_/u/SimpleMenuHeaderRenderer.js").SimpleMenuHeaderRenderer|import("./support/yt_api/_/b/FeedTabbedHeaderRenderer.js").FeedTabbedHeaderRenderer} header */
	header(header) {
		if("feedTabbedHeaderRenderer" in header) {
			this.FeedTabbedHeaderRenderer(header);
		} else if("simpleMenuHeaderRenderer" in header) {
			this.simpleMenuHeaderRenderer(header.simpleMenuHeaderRenderer);
		} else {
			debugger;
		}
		let ok=filter_out_keys(get_keys_of(header),split_string("feedTabbedHeaderRenderer,simpleMenuHeaderRenderer"));
		if(ok.length>0) {
			console.log("header keys",ok);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/m/MultiPageMenuRendererData.js").MultiPageMenuRendererData} renderer */
	multiPageMenuRenderer(renderer) {
		this.header(renderer.header);
		let ok=filter_out_keys(get_keys_of(renderer),split_string("header,sections,trackingParams",","));
		if(eq_keys(ok,[])) return;
		if(eq_keys(ok,["style"])) return;
		debugger;
	}
	/** @arg {import("./support/yt_api/yt/GuideSubscriptionsSectionRendererData.js").GuideSubscriptionsSectionRendererData} item */
	guideSubscriptionsSectionRenderer(item) {
		let ok=get_keys_of(item);
		let fk=ok[0];
		let {[ok[0]]: first}=item;
		if(eq_keys(ok,["sort","items","trackingParams","formattedTitle","handlerDatas"])) return;
		console.log("guideSubscriptionsSectionRenderer",ok,[fk,first],item);
	}
	/** @typedef {{type: "guideSectionRenderer", value: import("./support/yt_api/yt/GuideSectionRendererData.js").GuideSectionRendererData}} GuideSectionRendererDataBox */
	/** @arg {import("./support/yt_api/yt/GuideItemType.js").GuideItemType} item */
	GuideItemType(item) {
		let ok=get_keys_of(item);
		/** @type {import("./support/yt_api/yt/GuideItemType.js").GuideItemKeys} */
		let key=cast_as(ok[0]);
		if(!key) {
			console.log("[log_GuideItemType]",ok);
		}
		switch(key) {
			case "guideSectionRenderer": if(key in item) {
				let data=item.guideSectionRenderer;
				this.guideSectionRenderer({type: key,value: data});
			} break;
			case "guideSubscriptionsSectionRenderer": if(key in item) this.guideSubscriptionsSectionRenderer(item[key]); break;
			default: return;
		}
	}
	/** @arg {GuideSectionRendererDataBox} box */
	guideSectionRenderer(box) {
		let ok=get_keys_of(box.value);
		/** @type {keyof typeof box["value"]} */
		let fk=cast_as(ok[0]);
		let {[fk]: first}=box.value;
		if(eq_keys(ok,["items","trackingParams"])) return;
		if(eq_keys(ok,["items","trackingParams","formattedTitle"])) return;
		console.log(box.type,ok,[fk,first],box.value);
	}
	/** @arg {import("./support/yt_api/_/w/WatchEndpointData.js").WatchEndpointData} endpoint */
	WatchEndpointData(endpoint) {
		console.log(endpoint);
	}
	/** @arg {import("./support/yt_api/_/c/CommandMetadata.js").CommandMetadata} data */
	commandMetadata(data) {
		this.webCommandMetadata(data.webCommandMetadata);
	}
	/** @arg {import("./support/yt_api/_/b/BrowseEndpointData.js").BrowseEndpointData} endpoint */
	BrowseEndpointData(endpoint) {
		parse_browse_id(endpoint.browseId);
		if("params" in endpoint) {
			console.log("[browse_params] [%s]",endpoint.params);
		}
		if(eq_keys(get_keys_of(endpoint),["browseId"])) return;
		if(has_keys(get_keys_of(endpoint),"browseId,params")) return;
	}
	/** @arg {import("./support/yt_api/_/e/EndscreenElementRendererData.js").EndscreenElementRendererData} renderer */
	endscreenElementRenderer(renderer) {
		switch(renderer.style) {
			case "VIDEO": break;
			case "CHANNEL": break;
			default: console.log("[endscreen_element]",renderer.style); debugger;
		}
		let ok_3=filter_out_keys(get_keys_of(renderer),"style,image,left,width,top,aspectRatio,startMs,endMs,title,metadata,endpoint,trackingParams,id".split(","));
		if(has_keys(ok_3,"thumbnailOverlays")) return;
		if(has_keys(ok_3,"icon,callToAction,dismiss,hovercardButton,isSubscribe")) return;
		console.log("[on_page_type_watch_log_element] element ok_3 [%s]",ok_3.join(","));
		debugger;
	}
	/** @arg {import("./support/yt_api/_/b/GraftedVeItem.js").GraftedVeItem[]} ves */
	graftedVes(ves) {
		for(let ve of ves) {
			this.GraftedVeItem(ve);
		}
	}
	/** @arg {import("./support/yt_api/_/b/GraftedVeItem.js").GraftedVeItem} item */
	GraftedVeItem(item) {
		console.log("csn",item.csn);
		this.veData(item.veData);
	}
	/** @arg {import("./support/yt_api/_/b/VeData.js").VeData} data */
	veData(data) {
		this.trackingParams(data.trackingParams);
		console.log(data);
	}
	/** @arg {import("./support/yt_api/_/b/BrowsePageResponse.js").BrowsePageResponse} data */
	BrowsePageResponse(data) {
		let ok=cast_as(filter_out_keys(get_keys_of(data),split_string("page,endpoint,response,url,expirationTime,graftedVes")));
		if("expirationTime" in data) {
			this.primitive(data.expirationTime);
		}
		if("graftedVes" in data) {
			this.graftedVes(data.graftedVes);
		}
		if("previousCsn" in data) {
			console.log("[BrowsePage_csn]",data.previousCsn);
			this.primitive(data.previousCsn);
		}
		if(!("page" in data)) return;
		this.BrowseResponseContent(data.response);
		this.endpoint(data.endpoint);
		if(eq_keys(ok,[])) return;
		if(has_keys(ok,"expirationTime")) return;
		console.log("[browse_response_top] [%s]",ok.join(","),data);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/d/DataResponsePageType.js").DataResponsePageType} data */
	DataResponsePageType(data) {
		if(!("page" in data)) return;
		let page_type=data.page;
		switch(data.page) {
			case "browse": this.BrowsePageResponse(data); break;
			case "playlist": this.PlaylistPageResponse(data); break;
			case "settings": this.SettingsPageResponse(data); break;
			case "shorts": this.ShortsPageResponse(data); break;
			case "watch": this.WatchPageResponse(data); break;
			case "channel": this.ChannelPageResponse(data); break;
			default: console.log("[handle_page_type] [%s]",page_type); debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/w/WatchPageResponse.js").WatchPageResponse} data */
	WatchPageResponse(data) {
		this.WatchResponsePlayer(data.playerResponse);
	}
	/** @arg {import("./support/yt_api/_/p/PlaylistPageResponse.js").PlaylistPageResponse} data */
	PlaylistPageResponse(data) {
		console.log(data.endpoint);
		console.log(data.response);
		console.log(data.url);
	}
	/** @arg {import("./support/yt_api/_/s/SettingsPageResponse.js").SettingsPageResponse} data */
	on_new_page_url(data) {
		let res=data.url.split("/").slice(1)?.[0].split("_").slice(1);
		if(res) {
			this.save_new_string("page_section",res);
		}
		this.save_new_string("new_page.page_url",data.url);
	}
	/** @arg {import("./support/yt_api/_/s/SettingsPageResponse.js").SettingsPageResponse} data */
	SettingsPageResponse(data) {
		this.endpoint(data.endpoint);
		this.SettingsResponseContent(data.response);
		let split_parts=split_string(data.url,"/");
		/** @type {Uppercase<import("./support/make/Split.js").Split<import("./support/yt_api/_/s/SettingsPageResponse.js").SettingsPageResponse['url'],"/">[1]>} */
		let xx="ACCOUNT"; xx;
		switch(split_parts.length) {
			case 2: let cur_part=split_parts[1]; switch(cur_part) {
				case "account": break;
				case "account_notifications": break;
				case "account_privacy": break;
				case "account_advanced": break;
				case "account_billing": break;
				case "account_sharing": break;
				default: {
					assert_is_never(cur_part);
					this.on_new_page_url(data);
				} break;
			} break;
			default: debugger;
		}
		if(get_keys_of(data).length!==4) {
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/s/ShortsPageResponse.js").ShortsPageResponse} data */
	ShortsPageResponse(data) {
		this.endpoint(data.endpoint);
		console.assert(data.page==="shorts");
		this.playerResponse(data.playerResponse);
		this.reelWatchSequenceResponse(data.reelWatchSequenceResponse);
		this.ShortsResponse(data.response);
		console.log("[shorts_url]",data.url);
	}
	/** @arg {import("./support/yt_api/_/s/ShortsResponse.js").ShortsResponse} response */
	ShortsResponse(response) {
		console.log(response);
	}
	/** @arg {import("./support/yt_api/_/c/ChannelPageResponse.js").ChannelPageResponse} data */
	ChannelPageResponse(data) {
		console.log(data.endpoint);
		console.log(data.response);
		let up=split_string(data.url,"/");
		let x=up[2];
		if(!x) {
			if(!up[1].startsWith("@")) {
				console.log(up[1]);
				debugger;
			}
		} else if(x.startsWith("UC")) {
			let v=x.slice(2);
			if(atob(v).length!==16) {
				console.log("bad channel length",data.url);
			}
		} else {
			console.log("bad channel",data.url);
			debugger;
		}
	}
	static notification={
		/** @type {number|null} */
		unseenCount: null,
	};
	/** @arg {import("./support/yt_api/_/r/ResponseTypes.js").ResponseTypes} res */
	ResponseTypes(res) {
		if("responseContext" in res.json) {
			this.responseContext(res.json.responseContext);
		}
		switch(res.url_type) {
			case "att.get": this.AttGetV(res.json); return;
			case "player": this.WatchResponsePlayer(res.json); return;
			case "guide": this.GuideJsonType(res.json); return;
			case "notification.get_unseen_count": HandleTypes.notification.unseenCount=res.json.unseenCount; return;
			case "notification.get_notification_menu": this.notification_get_notification_menu_t(res); return;
			case "next": this.YtApiNext(res.json); return;
			case "browse": this.BrowseResponseContent(res.json); return;
			case "account.account_menu": this.AccountMenuJson(res.json); return;
			case "reel.reel_item_watch": this.withGeneralContext(res.json); return;
		}
		switch(res.url_type) {
			case "feedback": this.withGeneralContext(res.json); break;
			case "getDatasyncIdsEndpoint": this.xx(res.json); break;
			case "get_transcript": this.withGeneralContext(res.json); break;
			case "live_chat.get_live_chat_replay": this.xx(res.json); break;
			case "notification.record_interactions": this.YtSuccessResponse(res.json); break;
			case "reel.reel_watch_sequence": this.xx(res.json); break;
			default: console.log("missed api type",res); throw new Error("FIXME");
		}
	}
	/** @arg {import("./support/yt_api/yt/YtSuccessResponse.js").YtSuccessResponse} response */
	YtSuccessResponse(response) {
		let {responseContext,...not_context}=response;
		this.responseContext(responseContext);
		if(!response.success) {
			console.log("YtFailure",not_context);
		};
	}
	/** @arg {{}} data */
	xx(data) {
		console.log(data);
	}
	/** @arg {{ responseContext: import("./support/yt_api/_/g/GeneralContext.js").ResponseContext }} data */
	withGeneralContext(data) {
		this.responseContext(data.responseContext);
	}
	/** @arg {import("./support/yt_api/_/o/OpenPopupActionItem.js").OpenPopupActionItem} action */
	OpenPopupActionItem(action) {
		let ok_1=get_keys_of(action);
		if("openPopupAction" in action) {
			switch(action.openPopupAction.popupType) {
				case "DROPDOWN": {
					let popup=action.openPopupAction.popup;
					if("multiPageMenuRenderer" in popup) {
						this.multiPageMenuRenderer(popup.multiPageMenuRenderer);
					} else {
						debugger;
					}
				} break;
				default: console.log("popup type",action.openPopupAction.popupType); debugger;
			}
		}
		if(eq_keys(ok_1,["clickTrackingParams","openPopupAction"])) return;
		debugger;
	}
	/** @arg {import("./support/yt_api/_/g/GetNotificationMenuBox.js").GetNotificationMenuBox} res */
	notification_get_notification_menu_t(res) {
		for(let action of res.json.actions) {
			this.OpenPopupActionItem(action);
		}
		let ok=get_keys_of(res.json);
		if(eq_keys(ok,["responseContext","actions","trackingParams"])) return;
		console.log(ok);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/a/AttGetV.js").AttGetV} data */
	AttGetV(data) {
		let ok=get_keys_of(data);
		if(eq_keys(ok,["responseContext","challenge","bgChallenge"])) return;
		// spell:disable-next-line
		const token1="kS9PUbzBzfkpnx636le0IQOnLToPkJ8rDwtv7Zd3CH8";
		/** @type {`a=${number}&a2=${number}&c=${number}&d=${number}&t=${number}&c1a=${number}&hh=${string}`} */
		const chal_as_fmt=`a=5&a2=10&c=1672268443&d=1&t=7200&c1a=1&hh=${token1}`;
		/** @type {import("./support/AttChallengeObj").AttChallengeObj} */
		let search_param_obj=make_search_params(chal_as_fmt);
		/** @type {keyof typeof search_param_obj} */
		let i;
		for(i in search_param_obj) {
			switch(i) {
				case "a": break;
				default: console.log("[att_param]",i); debugger;
			}
		}
		data.bgChallenge;
		console.log(data);
		debugger;
	}
	/** @arg {import("./support/yt_api/yt/GuideJsonType.js").GuideJsonType} guide */
	GuideJsonType(guide) {
		for(let item of guide.items) {
			this.GuideItemType(item);
		}
		let ok=get_keys_of(guide);
		let ok_res=false;
		if(eq_keys(ok,["responseContext","items","trackingParams"])) ok_res=true;
		if(ok_res) return;
		console.log(ok);
		debugger;
	}
	/** @arg {import("./support/yt_api/yt/YtApiNext.js").YtApiNext} json */
	YtApiNext(json) {
		let {responseContext,trackingParams,onResponseReceivedEndpoints,...rest}=json;
		this.onResponseReceivedEndpoints(onResponseReceivedEndpoints);
		empty_object(rest);
		console.log(json);
	}
	/** @arg {import("./support/yt_api/_/a/AccountMenuJson.js").AccountMenuJson} json */
	AccountMenuJson(json) {
		let {responseContext,actions,trackingParams,...rest}=json;
		this.responseContext(responseContext);
		this.actions(json.actions);
		this.trackingParams(trackingParams);
		empty_object(rest);
	}
	/** @arg {import("./support/yt_api/_/o/OpenPopupAction.js").OpenPopupAction[]} actions */
	actions(actions) {
		for(let action of actions) {
			action;
		}
	}
	/** @arg {import("./support/yt_api/rich/RichItemRendererData.js").RichItemRendererData} data */
	richItemRenderer(data) {
		console.log(data);
	}
	/** @arg {import("./support/yt_api/_/s/ShortsResponsePlayer.js").ShortsResponsePlayer} data */
	playerResponse(data) {
		console.log(data);
	}
	/** @arg {{ responseContext: {}; entries: {}[]; trackingParams: string; }} data */
	reelWatchSequenceResponse(data) {
		console.log(data);
	}
	/** @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail */
	YTNavigateFinishEventDetail(detail) {
		switch(detail.pageType) {
			case "browse":
				this.BrowsePageResponse(detail.response);
				this.endpoint(detail.endpoint);
				break;
			case "channel": {
				this.ChannelPageResponse(detail.response);
				console.log(detail.endpoint);
			} break;
		}
		if(typeof detail.pageType!=="string") debugger;
		if(typeof detail.fromHistory!=="boolean") debugger;
		if(typeof detail.navigationDoneMs!=="number") debugger;
		let ok=filter_out_keys(get_keys_of(detail),split_string("endpoint,pageType,fromHistory,response,navigationDoneMs"));
		if(ok.length>0) console.log("[detail_event] [%s]",ok.join());
		page_type_iter(detail.pageType);
		if(last_page_type!==detail.pageType) {
			last_page_type=detail.pageType;
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
			page_type_changes.push(nav_load_str);
			console.log(nav_load_str);
		}
	}
	/** @arg {import("./support/yt_api/_/s/SettingsResponseContent.js").SettingsResponseContent} data */
	SettingsResponseContent(data) {
		const {responseContext: a,contents: b,sidebar: d,topbar: e,trackingParams: c,...r}=data;
		this.responseContext(a);
		this.TwoColumnBrowseResultsRenderer(b);
		this.trackingParams(c);
		this.sidebar(d);
		this.topbar(e);
		empty_object(r);
	}
	/** @arg {import("./support/yt_api/_/b/DesktopTopbarRenderer.js").DesktopTopbarRenderer} topbar */
	topbar(topbar) {
		this.DesktopTopbarRenderer(topbar);
	}
	/** @arg {import("./support/yt_api/_/t/TwoColumnBrowseResultsRenderer.js").TwoColumnBrowseResultsRenderer} contents */
	TwoColumnBrowseResultsRenderer(contents) {
		this.twoColumnBrowseResultsRenderer(contents);
	}
	/** @arg {import("./support/yt_api/_/i/SettingsOptionItemType.js").SettingsOptionItemType[]} options */
	options(options) {
		for(let option of options) {
			this.SettingsOptionItemType(option);
		}
	}
	/** @arg {import("./support/yt_api/_/i/SettingsOptionRenderer.js").SettingsOptionRenderer} renderer */
	settingsOptionsRenderer(renderer) {
		let data=renderer.settingsOptionsRenderer;
		let k=filter_out_keys(get_keys_of(data),split_string("title,options,hidden,id,text"));
		if(k.length>0) {
			console.log(k);
			debugger;
		}
		if(data.options) this.options(data.options);
		if("text" in data) this.YtTextType(data.text);
		this.YtTextType(data.title);
		if(this.x.get_param("noisy_logging")) console.log(data);
		if(get_keys_of(renderer).length!==1) {
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/i/ConnectedAppRendererData.js").ConnectedAppRendererData} data */
	ConnectedAppRendererData(data) {
		this.connectButton(data.connectButton);
		if(eq_keys(get_keys_of(data),["icon","title","text","connectButton"])) return;
		console.log(data);
	}
	/** @arg {import("./support/yt_api/_/i/ConnectButton").ConnectButton} obj */
	connectButton(obj) {
		if("accountLinkButtonRenderer" in obj) {
			this.accountLinkButtonRenderer(obj.accountLinkButtonRenderer);
		} else if("buttonRenderer" in obj) {
			this.buttonRenderer(obj.buttonRenderer);
		} else {
			console.log(obj);
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/i/AccountLinkButtonRendererData.js").AccountLinkButtonRendererData} obj */
	accountLinkButtonRenderer(obj) {
		let {providerKey,unlinkedButton,...rest}=obj;
		this.providerKey(providerKey);
		this.ButtonRenderer(unlinkedButton);
		if(eq_keys(get_keys_of(rest),[])) return;
		console.log(rest);
	}
	/** @arg {import("./support/yt_api/_/i/AccountLinkProviderKey.js").AccountLinkProviderKey} obj */
	providerKey(obj) {
		if(obj.id==="gpg"&&obj.subject!=="all") {
			let gpg_id=parseInt(obj.subject,10);
			if(Number.isNaN(gpg_id)) {
				debugger;
			}
			return;
		}
		const {id,subject,...rest}=obj;
		if(subject!=='all') debugger;
		if(typeof id!=="string") debugger;
		if(eq_keys(get_keys_of(rest),[])) return;
		console.log(Object.keys(obj));
	}
	/** @arg {import("./support/yt_api/_/b/ButtonRenderer.js").ButtonRenderer} obj */
	ButtonRenderer(obj) {
		this.buttonRenderer(obj.buttonRenderer);
	}
	/** @arg {import("./support/yt_api/_/i/ConnectedAppRenderer.js").ConnectedAppRenderer} data */
	connectedAppRenderer(data) {
		this.ConnectedAppRendererData(data.connectedAppRenderer);
		if(eq_keys(get_keys_of(data),["connectedAppRenderer"])) return;
		console.log(get_keys_of(data.connectedAppRenderer));
		console.log(data.connectedAppRenderer.connectButton);
		console.log(data);
		debugger;
	}
	/** @arg {import("./support/yt_api/_/i/ShelfRenderer.js").ShelfRenderer} data */
	shelfRenderer(data) {
		console.log(data);
	}
	/** @arg {import("./support/yt_api/_/c/ContinuationItemRenderer.js").ContinuationItemRenderer} data */
	continuationItemRenderer(data) {
		this.ContinuationItemRendererData(data.continuationItemRenderer);
	}
	/** @arg {import("./support/yt_api/_/c/ContinuationItemRendererData.js").ContinuationItemRendererData} data */
	ContinuationItemRendererData(data) {
		let {continuationEndpoint,trigger,ghostCards,button,...x}=data;
		this.endpoint(data.continuationEndpoint);
		this.primitive(trigger);
		if(ghostCards) this.renderer(ghostCards);
		console.log(x);
	}
	/** @arg {string} params */
	trackingParams(params) {
		if(this.x.get_param("log_tracking_params")) console.log("tp",params);
	}
	/** @arg {string} params */
	clickTrackingParams(params) {
		if(this.x.get_param("log_click_tracking_params")) console.log("ctp",params);
	}
	/** @arg {import("./support/yt_api/_/j/JsonDataEndpointType.js").JsonDataEndpointType[]} endpoints */
	onResponseReceivedEndpoints(endpoints) {
		iterate(endpoints,(endpoint) => {
			this.endpoint(endpoint);
		});
	}
	/** @arg {import("./support/yt_api/_/i/SettingsOptionItemType.js").SettingsOptionItemType} item */
	SettingsOptionItemType(item) {
		if("channelOptionsRenderer" in item) {
			return this.ChannelOptionsRendererData(item.channelOptionsRenderer);
		} else if("settingsSwitchRenderer" in item) {
			return this.settingsSwitchRenderer(item.settingsSwitchRenderer);
		} else if("settingsCheckboxRenderer" in item) {
			item.settingsCheckboxRenderer;
		} else if("settingsRadioOptionRenderer" in item) {

		}
		this.log("[option_item][%s]",get_keys_of(item).join(),"->",Object.values(item)[0]);
	}
	/** @arg {import("./support/yt_api/_/i/ChannelOptionsRendererData.js").ChannelOptionsRendererData} data */
	ChannelOptionsRendererData(data) {
		let {avatar,avatarAccessibility,avatarEndpoint,links,name,...rest}=data;
		this.ThumbnailsList(avatar);
		this.Accessibility(avatarAccessibility);
		this.endpoint(avatarEndpoint);
		iterate(links,link => this.YtTextType(link));
		this.primitive(name);
		empty_object(rest);
	}
	/** @arg {import("./support/yt_api/_/t/ThumbnailsList.js").ThumbnailsList} v */
	ThumbnailsList(v) {
		if(!v) debugger;
		iterate(v.thumbnails,v => this.Thumbnail(v));
	}
	/** @arg {import("./support/yt_api/_/t/Thumbnail.js").Thumbnail} v */
	Thumbnail(v) {
		let {height,url,width,...rest}=v;
		this.primitive(height);
		this.primitive(url);
		this.primitive(width);
		empty_object(rest);
	}
	/** @arg {import("./support/yt_api/_/w/WebCommandPageType.js").WebCommandPageType} type */
	WebCommandPageType(type) {
		switch(type) {
			case "WEB_PAGE_TYPE_BROWSE": break;
			case "WEB_PAGE_TYPE_CHANNEL": break;
			case "WEB_PAGE_TYPE_PLAYLIST": break;
			case "WEB_PAGE_TYPE_SHORTS": break;
			case "WEB_PAGE_TYPE_WATCH": break;
			case "WEB_PAGE_TYPE_SETTINGS": break;
			case "WEB_PAGE_TYPE_SEARCH": break;
			case "WEB_PAGE_TYPE_UNKNOWN": break;
			default: debugger;
		};
	}
	/** @arg {import("./support/yt_api/_/w/WebCommandMetadata.js").WebCommandMetadata} meta */
	webCommandMetadata(meta) {
		const {apiUrl,url,rootVe,webPageType,sendPost,...y}=meta;
		if(webPageType!==void 0) this.WebCommandPageType(webPageType);
		if(rootVe!==void 0) this.rootVe(rootVe);
		if(apiUrl!==void 0) this.apiUrl(apiUrl);
		if(url!==void 0) this.url(url);
		if(sendPost!==void 0) this.sendPost(sendPost);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/LogoEntity.js").LogoEntity} x */
	topbarLogoRenderer(x) {
		let {trackingParams,iconImage,endpoint,tooltipText,overrideEntityKey,...y}=x;
		this.trackingParams(trackingParams);
		this.Icon(iconImage);
		this.endpoint(endpoint);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/FusionSearchboxRenderer.js").FusionSearchboxRenderer} x */
	FusionSearchboxRenderer(x) {
		let y=x.fusionSearchboxRenderer;
		{
			let {trackingParams,icon,clearButton,config,placeholderText,searchEndpoint,...x}=y;
			this.trackingParams(trackingParams);
			this.Icon(icon);
			this.ButtonRenderer(clearButton);
			let a=config.webSearchboxConfig;
			{
				let {requestDomain,requestLanguage,hasOnscreenKeyboard,focusSearchbox,...x}=a;
				this.primitives(requestDomain,requestLanguage,hasOnscreenKeyboard,focusSearchbox);
				empty_object(x);
			}
			this.YtTextType(placeholderText);
			this.endpoint(searchEndpoint);
			empty_object(x);
		}
	}
	/** @arg {(string | boolean)[]} args */
	primitives(...args) {
		iterate(args,arg => this.primitive(arg));
	}
	/** @arg {import("./support/yt_api/_/b/SearchEndpointData.js").SearchEndpointData} x */
	SearchEndpointData(x) {
		this.primitive(x.query);
	}
	/** @arg {import("./support/yt_api/_/b/TopbarButtonItem.js").TopbarButtonItem} x */
	TopbarButtonItem(x) {
		if("topbarMenuButtonRenderer" in x) {
			x.topbarMenuButtonRenderer;
		} else if("notificationTopbarButtonRenderer" in x) {
			const {notificationTopbarButtonRenderer: y}=x;
			this.notificationTopbarButtonRenderer(y);
		} else {
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/b/NotificationTopbarButtonRendererData.js").NotificationTopbarButtonRendererData} x */
	notificationTopbarButtonRenderer(x) {
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=x;
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/n/NotificationActionRendererData.js").NotificationActionRendererData} x */
	notificationActionRenderer(x) {
		const {responseText,trackingParams,...y}=x;
		this.YtTextType(responseText);
		this.trackingParams(trackingParams);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/hotkeyDialogRenderer.js").HotkeyDialogRenderer} x */
	HotkeyDialogRenderer(x) {
		const {hotkeyDialogRenderer,...v}=x;
		this.hotkeyDialogRenderer(hotkeyDialogRenderer);
		empty_object(v);
	}
	/** @arg {import("./support/yt_api/_/b/HotkeyDialogRendererData.js").HotkeyDialogRendererData} x */
	hotkeyDialogRenderer(x) {
		const {trackingParams,dismissButton,sections,title,...y}=x;
		this.trackingParams(trackingParams);
		iterate(sections,v => v);
		this.YtTextType(title);
		empty_object(y);
	}
	/** @arg {number} x */
	rootVe(x) {
		this.save_new_root_ve(x);
	}
	/** @arg {string} x */
	apiUrl(x) {
		super.save_new_string("apiUrl",x);
	}
	/** @arg {string} x */
	url(x) {
		this.save_new_string("url",x);
	}
	/** @arg {boolean} x */
	sendPost(x) {
		this.save_new_bool("sendPost",x);
	}
	/** @arg {{ placeholderHeader?: import("./support/yt_api/_/s/YtTextType.js").YtTextType; promptHeader?: import("./support/yt_api/_/s/YtTextType.js").YtTextType; }} x */
	voiceSearch(x) {
		let v=Object.keys(x).join();
		this.log(v);
	}
	/** @arg {{ url: string; }} x */
	UrlEndpointRoot(x) {
		const {url,...r}=x;
		if(Object.keys(r).length>0) {
			debugger;
		}
	}
	/** @arg {import("./support/yt_api/_/s/SettingsSidebarRenderer.js").SettingsSidebarRenderer} sidebar */
	sidebar(sidebar) {
		this.settingsSidebarRenderer(sidebar.settingsSidebarRenderer);
	}
	/** @arg {import("./support/yt_api/_/s/SettingsSidebarRendererData.js").SettingsSidebarRendererData} x */
	settingsSidebarRenderer(x) {
		const {items,title,...y}=x;
		iterate(x.items,v => {
			this.LinkRenderer(v.compactLinkRenderer);
		});
		this.YtTextType(x.title);
		if(get_keys_of(y).length>0) console.log('[settings_sidebar]',y);
	}
	/** @arg {import("./support/yt_api/_/s/LinkRenderer.js").LinkRenderer} x */
	LinkRenderer(x) {
		this.endpoint(x.navigationEndpoint);
	}
	/** @arg {import("./support/yt_api/_/g/GhostGridRendererData.js").GhostGridRendererData} x */
	ghostGridRenderer(x) {
		const {rows,...y}=x;
		this.primitive(rows);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/i/SettingsSwitchRendererData.js").SettingsSwitchRendererData} x */
	settingsSwitchRenderer(x) {
		const {title: t_0,subtitle: t_1,enabled,enableServiceEndpoint: ep_0,disableServiceEndpoint: ep_1,id,text: t_2,thumbnail: v_0,trackingParams: tp,...y}=x;
		this.trackingParams(tp);
		this.YtTextType_va(t_0,t_1,t_2);
		this.endpoint_va(ep_0,ep_1);
		if(v_0) this.ThumbnailsList(v_0);
		this.primitives(enabled);
		empty_object(y);
	}
	/** @arg {import("./support/yt_api/_/b/YtEndpoint.js").YtEndpoint[]} arr */
	endpoint_va(...arr) {
		iterate(arr,this.endpoint.bind(this));
	}
	/** @arg {import("./support/yt_api/_/s/YtTextType.js").YtTextType[]} arr */
	YtTextType_va(...arr) {
		iterate(arr.filter(e => !!e),this.YtTextType.bind(this));
	}
	/** @arg {import("./support/yt_api/_/b/SetSettingEndpointData.js").SetSettingEndpointData} x */
	setSettingEndpoint(x) {
		const {boolValue,settingItemId,settingItemIdForClient,...y}=x;
		if(x.boolValue!==void 0) {
			this.primitive(x.boolValue);
		}
		this.save_new_string("setting_id",x.settingItemId);
		this.save_new_string("setting_name",x.settingItemIdForClient);
		this.log_empty_obj(y);
	}
	/** @template {{}} T @arg {T} x @returns {import("./support/yt_api/_/b/GetMaybeKeys.js").MaybeKeysArray<T>} */
	keys(x) {
		return get_keys_of(x);
	}
	/** @arg {{}} x */
	log_empty_obj(x) {
		let k=this.keys(x);
		if(k.length>0) {
			this.log("[not_empty][%s]",k.join());
		}
	}
}
/** @arg {{}} obj */
function empty_object(obj) {
	let keys=get_keys_of(obj);
	if(!keys.length) return;
	console.log("[invalid_empty_obj] [%s] %o",keys.join(),obj);
}
/** @arg {{}[]} x */
function empty_objects(...x) {
	iterate(x,empty_object);
}
//#endregion
console=typeof window==="undefined"? console:(() => window.console)();
main();
