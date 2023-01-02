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

/** @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function cast_as(e,x=e) {
	return x;
}

/** @type {YtdAppElement} */
const YtdAppElement=cast_as({});
/** @type {InstanceType<typeof YtdAppElement>|undefined} */
let ytd_app=void 0;
// #region Use module types
// #endregion
// #region
let inject_api_yt={};
{
	/** @type {Exclude<typeof window[InjectApiStr],undefined>} */
	let inject_api=window.inject_api??{};
	window.inject_api=inject_api;
	inject_api.modules=new Map;
	inject_api.modules.set("yt",inject_api_yt);
}

/** @type {Map<string, Blob|MediaSource>} */
let created_blobs=new Map;
inject_api_yt.created_blobs=created_blobs;
/** @type {Set<string>} */
let active_blob_set=new Set;
inject_api_yt.active_blob_set=active_blob_set;

inject_api_yt.saved_maps=new Map;
/** @arg {string} key @arg {Map<string, {}>} map */
function save_new_map(key,map) {
	if(!inject_api_yt.saved_maps) return;
	inject_api_yt.saved_maps.set(key,map);
}
/** @type {SavedData} */
let saved_data=cast_as({});
inject_api_yt.saved_data=saved_data;

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
					if(e_tn==="LINK"&&e instanceof HTMLLinkElement) {
						if(e.rel==="stylesheet") return false;
					}
					if(e.id==="home-page-skeleton") return false;
					// cspell:ignore skeletonhidden
					if(e.id==="watch-page-skeleton"&&(
						e.classList.value==="watch-skeletonhidden"||
						e.classList.value==="watch-skeleton"
					)) return false;
					if(e.id==="player"&&e.classList.value==="skeleton flexy") return false;
					if(e.id==="watch7-content"&&e.classList.value==="watch-main-col") return false;
					if(e_tn=="SCRIPT") return false;
					if(e_tn=="IFRAME") return false;
					if(e_tn=="IRON-ICONSET-SVG") return false;
					if(e_tn=="IRON-A11Y-ANNOUNCER") return false;
					if(e_tn=="svg") return false;
					let fut_data=[e.tagName.toLowerCase(),e.id,e.classList.value];
					let did_run=event.detail.handle_types_fut.run_with(v => v.save_new_string("body_element",fut_data));
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
/** @template {{}} T @arg {T} obj @returns {import("./support/yt_api/_/g/GetMaybeKeys.js").MaybeKeysArray<T>} */
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
		if(!command.continuationItems) {
			debugger;
		}
		if(state.ReloadContinuationItemsCommandData(path,command)) return;
		let filtered=state.handlers.renderer_content_item_array.replace_array(state,"reloadContinuationItemsCommand.continuationItems",command.continuationItems);
		if(filtered.length>0) {
			command.continuationItems=filtered;
		}
	}
	/** @arg {ApiIterateState} state @arg {ItemSectionRendererData} renderer */
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
	/** @arg {ApiIterateState} state @arg {RichGridRendererData} renderer */
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
	/** @arg {string} path @arg {RichGridRendererData} renderer */
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
/** @arg {AppendContinuationItemsAction} o @returns {o is WatchNextContinuationAction} */
function is_watch_next_feed_target(o) {
	return o.targetId==="watch-next-feed";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is CommentsSectionContinuationAction} */
function is_comments_section_next(o) {
	return o.targetId==="comments-section";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is BrowseFeedAction} */
function is_what_to_watch_section(o) {
	return o.targetId==="browse-feedFEwhat_to_watch";
}

/** @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
function make_search_params(t) {
	let sp=new URLSearchParams(t);
	/** @type {any} */
	let as_any=Object.fromEntries(sp.entries());
	return as_any;
}
inject_api_yt.make_search_params=make_search_params;
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
	noisy_log_level=false;
	/** @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @arg {number} [size] */
	read_any(size) {
		let target_len;
		if(!size) {
			target_len=this.len;
		} else {
			target_len=this.pos+size;
		}
		/** @type {DataArrType} */
		let data=[];
		let loop_count=0;
		let log_slow=true;
		let reader=this;
		for(;reader.pos<target_len;loop_count++) {
			let cur_byte=reader.uint32();
			let wireType=cur_byte&7;
			let fieldId=cur_byte>>>3;
			let first_num=reader.skipTypeEx(fieldId,wireType);
			data.push([fieldId,wireType,first_num]);
			if(reader.failed) {
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
		if(this.noisy_log_level) console.log("[skip] pos=%o",this.pos);
		let pos_start=this.pos;
		/** @type {DecTypeNum[]} */
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
					first_num.push(["data",num64]);
					this.pos=new_pos;
				} else {
					first_num.push(["data",num32]);
				}
				if(this.noisy_log_level) console.log("\"field %o: VarInt\": %o",fieldId,first_num[0][1]);
				break;
			case 1:
				this.skip(8);
				break;
			case 2: {
				let size=this.uint32();
				let sub_buffer=this.buf.subarray(this.pos,this.pos+size);
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",this.pos,fieldId);
					this.failed=true;
				}
				first_num.push(['child',sub_buffer]);
			} break;
			case 3: {
				let res;
				while((wireType=(res=this.uint32())&7)!==4) {
					this.skipTypeEx(res>>>3,wireType);
				}
			} break;
			case 4: throw new Error("Invalid state");
			case 5: first_num.push(["data",this.fixed32()]); break;
			default: break;
		}
		return first_num;
	}
}

const base64_dec=new Base64Binary();

/** @arg {string} str */
function decode_b64_proto_obj(str) {
	let buffer=base64_dec.decodeArrayBuffer(str);
	let reader=new MyReader(buffer);
	return reader.read_any();
}
inject_api_yt.decode_b64_proto_obj=decode_b64_proto_obj;

/**
 * @type {[string,{name: string;}][]}
 */
inject_api_yt.saved_function_objects=[];

/** @arg {{name:string}} function_obj */
function add_function(function_obj) {
	if(!inject_api_yt.saved_function_objects) return;
	inject_api_yt.saved_function_objects.push([function_obj.name,function_obj]);
}
inject_api_yt.add_function=add_function;

/** @template T @arg {T|undefined} val @returns {T} */
function non_null(val) {
	if(val===void 0) throw new Error();
	return val;
}
add_function(non_null);

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
			// /** @type {BrowseFeedAction} */
			// let action_t=action;
			// console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// // return true;
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
			/** @type {BrowseFeedAction} */
			let action_t=action;
			console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		console.log("path",path,"continuation action",action);
		debugger;
		return false;
	}
	/** @template {string} X @template {string} U @template {string} V @template {`https://${X}/${U}?${V}`} T @arg {T} x  */
	use_template_url(x) {
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
		/** @type {Split<RemoveFirst<typeof res_parse.pathname>,"/">} */
		let path_parts=res_parse.pathname.slice(1).split("/");
		return this.handle_types.get_url_type(path_parts);
	}
	/** @arg {UrlTypes} url_type @arg {{}} json @returns {ResponseTypes} */
	get_res_data(url_type,json) {
		/** @type {Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		switch(target.length) {
			case 1: switch(target[0]) {
				case "browse": return {
					type: target[0],
					/** @type {BrowseResponseContent} */
					data: cast_as(json),
				};
				case "feedback": return {
					type: target[0],
					/** @type {JsonFeedbackData} */
					data: cast_as(json),
				};
				case "getDatasyncIdsEndpoint": debugger; return {
					type: target[0],
					data: json,
				};
				case "get_transcript": return {
					type: target[0],
					/** @type {get_transcript_t["data"]} */
					data: cast_as(json),
				};
				case "guide": return {
					type: target[0],
					/** @type {GuideJsonType} */
					data: cast_as(json),
				};
				case "next": return {
					type: target[0],
					/** @type {YtApiNext} */
					data: cast_as(json),
				};
				case "player": return {
					type: target[0],
					/** @type {WatchResponsePlayer} */
					data: cast_as(json),
				};
				default: break;
			} break;
			case 2: switch(target[0]) {
				case "account": switch(target[1]) {
					case "account_menu": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {AccountMenuJson} */
						data: cast_as(json),
					};
				};
				case "att": return {
					type: `${target[0]}.${target[1]}`,
					/** @type {AttGet} */
					data: cast_as(json),
				};
				case "live_chat": switch(target[1]) {
					case "get_live_chat_replay": return {
						type: `${target[0]}.${target[1]}`,
						data: json,
					};
				}
				case "notification": switch(target[1]) {
					case "get_notification_menu": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {GetNotificationMenuJson} */
						data: cast_as(json),
					};
					case "get_unseen_count": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {notification_get_unseen_count_t["data"]} */
						data: cast_as(json),
					};
					case "record_interactions": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {YtSuccessResponse} */
						data: cast_as(json),
					};
				}
				case "reel": switch(target[1]) {
					case "reel_item_watch": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {reel_reel_item_watch_t["data"]} */
						data: cast_as(json),
					};
					case "reel_watch_sequence": return {
						type: `${target[0]}.${target[1]}`,
						/** @type {reel_reel_watch_sequence_t["data"]} */
						data: cast_as(json),
					};
				}
				default: break;
			} break;
		}
		console.log("[log_get_res_data]",target,json); debugger; throw new Error("Stop");
	}
	/** @arg {string|URL|Request} request @arg {{}} data */
	on_handle_api(request,data) {
		var {req_hr_t,req_parse: parsed_url,debug}=this.on_handle_api_0(request);
		var {path_url,url_type}=this.on_handle_api_1(req_hr_t,parsed_url);
		if(path_url==="/getDatasyncIdsEndpoint") return;
		let api_parts=parsed_url.pathname.slice(1).split("/");
		// spell:ignore youtubei
		if(api_parts[0]!=="youtubei") {
			console.log("unknown api path",parsed_url.pathname);
			return;
		}
		if(api_parts[1]!=="v1") {
			console.log("unknown api path",parsed_url.pathname);
			return;
		}
		let api_path=api_parts.slice(2).join(".");
		debug&&console.log("on_handle_api api_path",api_parts.slice(0,2).join("/"),api_path);
		this.handle_any_data(url_type,data);
		let res=this.get_res_data(url_type,data);
		this.handle_types.ResponseTypes(res);
	}
	/** @arg {`https://${string}/${string}?${string}`} req_hr_t @arg {URL} req_parse */
	on_handle_api_1(req_hr_t,req_parse) {
		/** @type {`https://${string}/${string}?${string}`} */
		let href_=req_hr_t;
		const url_type=this.use_template_url(href_).name;
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
	/** @arg {UrlTypes|`page_type_${NavigateEventDetail["pageType"]}`} path @arg {SavedDataItem} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @type {AnySavedData} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,channel,playlist",",");
	/** @arg {[()=>YtBrowsePageResponse, object, []]} apply_args */
	on_initial_data(apply_args) {
		/** @type {YtBrowsePageResponse} */
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
	/** @returns {YtCurrentPage|undefined} */
	getCurrentPage() {throw 1;}
}

/** @type {string[]} */
let playlist_arr=[];
inject_api_yt.playlist_arr=playlist_arr;
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
inject_api_yt.page_type_changes=page_type_changes;
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
inject_api_yt.filter_out_keys=filter_out_keys;
/** @arg {NavigateEventDetail["pageType"]} pageType */
function page_type_iter(pageType) {
	switch(pageType) {
		case "browse": case "watch": break;
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

/** @arg {HiddenData<FilterHandlers>} fh */
function start_message_channel_loop(fh) {
	message_channel=new MessageChannel();
	message_channel.port2.onmessage=on_port_message;
	if(top===window) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {
				handle_types_fut: new Future(fh,fh => fh.handle_types),
			},
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
inject_api_yt.AudioGainController=AudioGainController;
/** @type {AudioGainController|null} */
let audio_gain_controller=new AudioGainController;
inject_api_yt.audio_gain_controller=audio_gain_controller;

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
		return v(this.#value);
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
async function main() {
	/** @type {ResolverT<Services,ServiceOptions>} */
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
	let current_page_type="";
	on_yt_navigate_finish.push(log_page_type_change);

	// modify global section
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
	/** @arg {[()=>YtBrowsePageResponse, object, []]} apply_args */
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
	/** @arg {YTNavigateFinishEvent} event */
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
		let page_manager_current_tag_name=ytd_page_manager.getCurrentPage()?.tagName.toLowerCase();
		let nav_load_str=`page_type_change: {current_page_element_tagName: "${page_manager_current_tag_name}", pageType: "${detail.pageType}"}`;
		if(nav_load_str===current_page_type) return;
		current_page_type=nav_load_str;
		page_type_changes.push(nav_load_str);
		console.log(nav_load_str);
		yt_handlers.extract(h => h.on_page_type_changed(detail));
	}
	// #endregion
}
//#endregion
/** @arg {"account"} base @arg {string[]} parts @arg {number} index */
function get_account_type(base,parts,index) {
	let cur_part=parts[index];
	switch(cur_part) {
		case "account_menu": break;
		default: no_handler({parts,index});
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
/** @template {string} C @template {string} U @template {Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {Split<C,","> extends U[]?C:never} arg1 */
function has_keys(ok_3,arg1) {
	return eq_keys(ok_3,arg1.split(","));
}
inject_api_yt.has_keys=has_keys;
/** @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x,s=cast_as(",")) {
	let r=x.split(s);
	return cast_as(r);
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
class BaseServicePrivate {
	// #region Public
	/** @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		this.#x=x;
		this.save_known_data_to_self();
		this.save_known_data_to_storage();
	}
	get x() {
		if(!this.#x.value) throw 1;
		return this.#x.value;
	}
	on_data_known_change() {
		this.save_known_data_to_storage();
	}
	on_request_data_removal() {
		this.delete_known_data();
	}
	/** @arg {string} key */
	delete_old_string_values(key) {
		let p=this.known_strings.find(e => e[0]===key);
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
	/** @arg {string} key @arg {string|string[]} x */
	save_new_string(key,x) {
		if(key==="any") debugger;
		if(!(x instanceof Array)&&x.startsWith("http://www.youtube.com/channel/UC")) {
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
		this.new_known_strings.push([key,x]);
		this.on_data_known_change();
		console.log("store_str [%s]",key,x);
		debugger;
	}
	/** @private @type {[string,['one',number[]]|['many',number[][]]][]} */
	known_numbers=[];
	/** @private @type {[string,number|number[]][]} */
	new_known_numbers=[];
	/** @arg {string} key @arg {number|number[]} x */
	save_number(key,x) {
		if(key==="any") debugger;
		let was_known=true;
		/** @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.known_numbers.find(e => e[0]===key);
		if(!p) {
			cur=['one',[]];
			p=[key,cur];
			this.known_numbers.push(p);
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
		this.new_known_numbers.push([key,x]);
		this.on_data_known_change();
		console.log("store_num [%s]",key,x);
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
		this.save_known_data_to_storage();
	}
	/** @arg {number} x */
	save_new_root_ve(x) {
		if(this.known_root_ve.includes(x)) return;
		console.log("store rootVe [%o]",x);
		this.known_root_ve.push(x);
		this.new_known_root_ve.push(x);
		this.on_data_known_change();
	}
	// #endregion
	//#region private
	/** @private */
	log_skipped_strings=false;
	#x;
	/** @private */
	known_data_str_no_access="";
	/** @private @arg {string} known_data */
	save_local_storage(known_data) {
		if(no_storage_access) {
			this.known_data_str_no_access=known_data;
			return;
		}
		localStorage.known_data=known_data;
	}
	/** @private */
	get_local_storage() {
		if(no_storage_access) return this.known_data_str_no_access;
		return localStorage.known_data;
	}
	/** @private */
	delete_known_data() {
		if(no_storage_access) {
			this.known_data_str_no_access="";
			return;
		}
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
	loaded_from_storage=false;
	/** @private */
	save_known_data_to_storage() {
		let data=this.known_data_from_self();
		for(let v=0;v<data.known_numbers.length;v++) {
			const j=data.known_numbers[v];
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
	known_data_from_self() {
		const {
			known_root_ve,known_strings,known_booleans,
			known_numbers
		}=this;
		return {
			known_root_ve,known_strings,known_numbers,
			known_booleans,
		};
	}
	/**
	 * @private @arg {Partial<ReturnType<BaseServicePrivate['known_data_from_self']>>} x
	 */
	update_known_data_from_parsed(x) {
		const {
			known_root_ve,known_strings,known_booleans,
			known_numbers,
		}=x;
		if(known_root_ve) {
			this.known_root_ve=known_root_ve;
		}
		if(known_strings) {
			this.known_strings=known_strings;
		}
		if(known_booleans) {
			this.known_booleans=known_booleans;
		}
		if(known_numbers) {
			this.known_numbers=known_numbers;
		}
	}
	/** @private */
	get_known_data() {
		if(this.loaded_from_storage) return;
		let json_str=this.get_local_storage();
		if(json_str) {
			let ret=this.parse_data(json_str);
			this.update_known_data_from_parsed(ret);
			this.loaded_from_storage=true;
		}
	}
	/** @private @arg {string} str @returns {Partial<ReturnType<BaseServicePrivate['known_data_from_self']>>} */
	parse_data(str) {
		return JSON.parse(str);
	}
	/** @private */
	save_known_data_to_self() {
		this.get_known_data();
	}
}
/** @template {any[]} T @arg {[T|undefined,(x:T[number])=>void]} a0  */
function iterate(...[t,u]) {
	if(t===void 0) return;
	for(let item of t) {
		u(item);
	}
}
class BaseService extends BaseServicePrivate {
	/** @arg {any[]} x */
	log(...x) {
		console.log(...x);
	}
	/** @template {{}} T @arg {string} key @arg {T} obj @arg {boolean} [handled] */
	save_keys(key,obj,handled) {
		if(handled===void 0) debugger;
		let keys=get_keys_of(obj);
		if(eq_keys(keys,["type","data"])) {
			debugger;
		}
		this.save_new_string(key,keys.join());
	}
	/** @arg {(bigint|string|number|boolean)[]} args */
	primitives(...args) {
		iterate(args,arg => this.primitive(arg));
	}
	/** @arg {bigint|string|number|boolean} value */
	primitive(value) {
		switch(typeof value) {case "bigint": case "boolean": case "number": case "string": break; default: debugger;}
	}
}
class CsiService extends BaseService {
	data={
		/** @type {BrowseEndpointPages|null} */
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
		"GetWatchPageWebTopLevelComments_rid",
	];
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
				[24440901],
				[24422508,24401504],
			].flat(),
		},
	};
	/** @arg {ECatcherServiceParams['params']} params */
	on_params(params) {
		/** @type {NonNullable<this["data"]["client"]>} */
		let new_client={};
		for(let param of params) {
			/** @type {Split<typeof param.key,".">} */
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
		let prev_client=this.data.client;
		if(!prev_client) return this.update_client(new_client);
		this.data.client={...this.data.client,...new_client};
		let client=this.data.client;
		let expected=this.data.expected_client_values.fexp;
		/** @type {number[]} */
		let new_expected=[];
		client.fexp.forEach(e => expected.includes(e)? 0:new_expected.push(e));
		if(prev_client.name!==this.data.client.name) {
			console.log({name: prev_client.name},{name: this.data.client.name});
		}
		if(new_expected.length>0) console.log("new_fexp",new_expected);
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
	/** @arg {ToServiceParams<GFeedbackVarMap>} params */
	on_params(params) {
		let parsed_e=null;
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.handle_types.parse_browse_id(param.value); break;
				case "context": {
					if(param.value!=="yt_web_unknown_form_factor_kevlar_w2w") debugger;
					this.data.context=param.value;
				} break;
				case "e": parsed_e=this.data.e=this.parse_e_param(param); break;
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
			if(parsed_e) this.maybe_new_e();
		}
	}
	maybe_new_e() {
		/** @type {number[]} */
		let new_expected=[];
		let expected=this.x.get("e_catcher_service").data.expected_client_values.fexp;
		this.data.e?.forEach(e => expected.includes(e)? 0:new_expected.push(e));
		if(new_expected.length>0) console.log("new g_feedback flag_id",new_expected);
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
				case "context": if(param.value!=="yt_web_unknown_form_factor_kevlar_w2w") debugger; this.data.context=param.value; break;
				default: console.log("new [param_key]",param); debugger;
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
				default: console.log("new [param_key]",param); debugger;
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
//#endregion Service
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
inject_api_yt.decode_entity_key=decode_entity_key;
//#endregion
//#region HandleTypes
class HandleTypes extends BaseService {
	/** @private @arg {WatchResponsePlayer} x */
	WatchResponsePlayer(x) {
		this.save_keys("WatchResponsePlayer",x,this.TODO_true);
	}
	/**
	 * @param {YtBrowsePageResponse} x
	 */
	YtBrowsePageResponse(x) {
		const {page: a,endpoint: b,response: c,url: d,...y}=x;
		if(a!=="browse") debugger;
		this.yt_endpoint(b);
		this.save_keys("DataResponsePageType",x,true);
		this.parse_url(d);
		this.BrowseResponseContent(c);
		this.empty_object(y);
	}
	/** @arg {NavigateEventDetail['response']} x */
	DataResponsePageType(x) {
		let mt=x;
		this._current_response_type=x.page;
		switch(mt.page) {
			case "browse": return this.YtBrowsePageResponse(mt);
			case "watch": return this.YtWatchPageResponse(mt);
			default: break;
		}
		console.log("pt",x.page,x);
		debugger;
	}
	/**
	 * @param {BrowseResponseContent} x
	 */
	BrowseResponseContent(x) {
		this.save_keys("BrowseResponseContent",x,Object.keys(x).length===7);
		const {trackingParams: a,...y}=x;
		this.trackingParams(a);
		if("responseContext" in y) {
			const {responseContext: res_ctx,contents: cont,header: hd/*tp*/,topbar: tb,onResponseReceivedActions: act_arr,frameworkUpdates: upd,...z}=y;
			this.ResponseContext(res_ctx);
			this.TwoColumnBrowseResultsRenderer(cont);
			this.header(hd);
			this.topbar(tb);
			iterate(act_arr,v => this.ResponseReceivedAction(v));
			this.frameworkUpdates(upd);
			this.empty_object(z);
			return;
		}
		this.empty_object(y);
	}
	/**
	 * @param {DesktopTopbarRenderer} x
	 */
	topbar(x) {
		this.save_keys("DesktopTopbarRenderer",x,this.TODO_true);
	}
	/**
	 * @param {FeedTabbedHeaderRenderer} x
	 */
	header(x) {
		this.save_keys("FeedTabbedHeaderRenderer",x,this.TODO_true);
	}
	/**
	 * @param {EntityBatchUpdate} x
	 */
	frameworkUpdates(x) {
		this.save_keys("EntityBatchUpdate",x,this.TODO_true);
	}
	/**
	 * @param {ResponseReceivedAction} x
	 */
	ResponseReceivedAction(x) {
		this.save_keys("ResponseReceivedAction",x,this.TODO_true);
	}
	/**
	 * @param {WatchEndpointData} x
	 */
	WatchEndpointData(x) {
		this.save_keys("WatchEndpointData",x);
	}
	/**
	 * @param {string} x
	 */
	parse_endpoint_params(x) {
		console.log(x); debugger;
	}
	/**
	 * @param {BrowseIdType} x
	 */
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
				console.log("new [param_value_with_section] [%s] -> [%s]",v_2c,v_ac);
			} break;
			case "VL": let v_4c=x.slice(2,4); switch(v_4c) {
				case "LL": break;
				case "WL": break;
				case "PL": break;
				default:
					/** @type {KnownParts_VL} */
					let ve_ac=x.slice(2);
					console.log("new with param [param_2c_VL]",x,ve_ac);
					debugger;
			} break;
			case "UC": console.log("new with param [param_2c_UC]",x,x.slice(2)); break;
			case "SP": break;
			default: console.log("new [param_value_needed]",v_2c,x); break;
		}
	}
	/**
	 * @param {BrowseEndpointData} x
	 */
	BrowseEndpointData(x) {
		if("params" in x) {
			const {params: a,...y}=x;
			this.parse_endpoint_params(a);
			this.save_keys("BrowseEndpointData_params",x);
			this.empty_object(y);
			return;
		}
		if("browseId" in x) {
			const {browseId: a,...y}=x;
			this.parse_browse_id(a);
			this.save_keys("BrowseEndpointData_browseId",x,true);
			this.empty_object(y);
			return;
		}
		this.save_keys("BrowseEndpointData",x);
		this.empty_object(x);
	}
	/**
	 * @param {SearchEndpointData} x
	 */
	SearchEndpointData(x) {
		this.save_keys("SearchEndpointData",x);
	}
	/**
	 * @param {SetSettingEndpointData} x
	 */
	SetSettingEndpointData(x) {
		this.save_keys("SetSettingEndpointData",x);
	}
	/**
	 * @param {SignalServiceEndpointData} x
	 */
	SignalServiceEndpointData(x) {
		this.save_keys("SignalServiceEndpointData",x);
	}
	/**
	 * @param {UrlEndpointRoot} x
	 */
	UrlEndpointRoot(x) {
		this.save_keys("UrlEndpointRoot",x);
	}
	/** @param {YtEndpoint} x */
	yt_endpoint(x) {
		this.save_keys("YtEndpoint",x,true);
		const {clickTrackingParams: a,commandMetadata: b,...y}=x;
		this.clickTrackingParams(a);
		this.commandMetadata(b);
		if("watchEndpoint" in y) {
			const {watchEndpoint: a,...b}=y;
			this.WatchEndpointData(a);
			this.empty_object(b);
			return;
		}
		if("browseEndpoint" in y) {
			const {browseEndpoint: a,...b}=y;
			this.BrowseEndpointData(a);
			this.empty_object(b);
			return;
		}
		if("searchEndpoint" in y) {
			const {searchEndpoint: a,...b}=y;
			this.SearchEndpointData(a);
			this.empty_object(b);
			return;
		}
		if("setSettingEndpoint" in y) {
			const {setSettingEndpoint: a,...b}=y;
			this.SetSettingEndpointData(a);
			this.empty_object(b);
			return;
		}
		if("signalServiceEndpoint" in y) {
			const {signalServiceEndpoint: a,...b}=y;
			this.SignalServiceEndpointData(a);
			this.empty_object(b);
			return;
		}
		if("urlEndpoint" in y) {
			const {urlEndpoint: a,...b}=y;
			this.UrlEndpointRoot(a);
			this.empty_object(b);
			return;
		}
		this.empty_object(y);
	}
	/** @type {ResponseTypes['type']|null} */
	_current_response_type=null;
	get current_response_type() {
		if(!this._current_response_type) throw 1;
		return this._current_response_type;
	}
	/** @arg {ResponseTypes} x */
	ResponseTypes(x) {
		this._current_response_type=x.type;
		this.save_keys("ResponseTypes",x.data,true);
		if("responseContext" in x.data&&x.data.responseContext) {
			this.ResponseContext(x.data.responseContext);
		}
		switch(x.type) {
			case "account.account_menu": this.AccountMenuJson(x.data); return;
			case "att.get": this.AttGet(x.data); return;
			case "feedback": this.save_keys(x.type,x.data); break;
			case "get_transcript": this.save_keys(x.type,x.data); break;
			case "getDatasyncIdsEndpoint": debugger; this.save_keys(x.type,x.data); break;
			case "guide": this.GuideJsonType(x.data); return;
			case "live_chat.get_live_chat_replay": this.save_keys(x.type,x.data); break;
			case "next": this.YtApiNext(x.data); return;
			case "notification.get_notification_menu": this.notification_get_notification_menu_t(x); return;
			case "notification.get_unseen_count": this.notification_get_unseen_count_t(x); return;
			case "notification.record_interactions": this.YtSuccessResponse(x.data); break;
			case "player": this.WatchResponsePlayer(x.data); return;
			case "reel.reel_item_watch": this.save_keys(x.type,x.data); return;
			case "reel.reel_watch_sequence": this.save_keys(x.type,x.data); break;
			default: this.save_new_string("need_api_type",x.type);
		}
	}
	/** @private @arg {YtSuccessResponse} x */
	YtSuccessResponse(x) {
		this.save_keys("YtSuccessResponse",x);
	}
	/** @private @arg {GetNotificationMenuBox} x */
	notification_get_notification_menu_t(x) {
		this.GetNotificationMenuJson(x.data);
	}
	/** @private @arg {GetNotificationMenuJson} x */
	GetNotificationMenuJson(x) {
		const {responseContext,actions,trackingParams,...y}=x;
		this.ResponseContext(responseContext);
		iterate(actions,v => this.action(v));
		this.trackingParams(trackingParams);
		this.save_keys("GetNotificationMenuJson",x,true);
		this.empty_object(y);
	}
	/** @private @arg {AttGet} x */
	AttGet(x) {
		this.save_keys("AttGet",x,this.TODO_true);
	}
	/** @private @arg {GuideJsonType} x */
	GuideJsonType(x) {
		this.save_keys("GuideJsonType",x,this.TODO_true);
	}
	/** @private @arg {YtApiNext} x */
	YtApiNext(x) {
		let z;
		if("engagementPanels" in x) {
			const {responseContext,trackingParams,onResponseReceivedEndpoints,engagementPanels,...y}=x;
			z=y;
		} else {
			const {responseContext,trackingParams,onResponseReceivedEndpoints,...y}=x;
			z=y;
		}
		this.save_keys("api_next",x,true);
		if(!this.is_empty_object(z)) console.log("[api_next] [%s]",Object.keys(x).join());
	}
	/** @private @arg {AccountMenuJson} x */
	AccountMenuJson(x) {
		this.save_keys("AccountMenuJson",x);
	}
	/** @arg {NavigateEventDetail} x */
	YtPageState(x) {
		this.save_keys("YtPageState",x,this.TODO_true);
	}
	get TODO_true() {
		return true;
	}
	/** @private @arg {notification_get_unseen_count_t} x */
	notification_get_unseen_count_t(x) {
		this.NotificationGetUnseenCountData(x.data);
	}
	/** @private @arg {NotificationGetUnseenCountData} x */
	NotificationGetUnseenCountData(x) {
		const {responseContext,...y}=x;
		this.save_keys("GetUnseenCount",x,true);
		this.ResponseContext(x.responseContext);
		if("actions" in y) {
			const {actions: a,...c}=y;
			iterate(a,x => {
				const {clickTrackingParams,updateNotificationsUnseenCountAction,...y}=x;
				this.clickTrackingParams(x.clickTrackingParams);
				this.UpdateNotificationsUnseenCount(updateNotificationsUnseenCountAction);
				this.empty_object(y);
			});
			this.empty_object(c);
		} else if("unseenCount" in y) {
			this.notification_unseenCount(y);
		}
	}
	/** @arg {{unseenCount:number}} x */
	notification_unseenCount(x) {
		const {unseenCount: a,...c}=x;
		this.save_number("notification.unseenCount",a);
		this.empty_object(c);
	}
	/** @private @template {{}} T @arg {{} extends T?T:never} x */
	empty_object(x) {
		let keys=get_keys_of(x);
		if(!keys.length) return;
		console.log("[empty_object] [%s] %o",keys.join(),x);
		console.log(new Error);
		debugger;
	}
	/** @private @template {{}} T @arg {T} x */
	is_empty_object(x) {
		let keys=get_keys_of(x);
		if(!keys.length) return true;
		return false;
	}
	/** @private @arg {string} x */
	clickTrackingParams(x) {
		if(this.x.get_param("log_click_tracking_params")) console.log("ctp",x);
		this.primitive(x);
	}
	/** @arg {string} x */
	trackingParams(x) {
		if(this.x.get_param("log_tracking_params")) console.log("tp",x);
		this.primitive(x);
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
	/** @template T @arg {T} x @arg {TypeOfType<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @arg {string} x */
	parse_url(x) {
		if(x==="/") return;
		console.log(x); debugger;
	}
	/**
	 * @param {CommandMetadata} x
	 */
	commandMetadata(x) {
		const {webCommandMetadata,...y}=x;
		this.WebCommandMetadata(x.webCommandMetadata);
		this.empty_object(y);
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
	/**
	 * @param {WebCommandMetadata} x
	 */
	WebCommandMetadata(x) {
		if("apiUrl" in x) {
			const {url,webPageType,rootVe,apiUrl,...y}=x;
			this.parse_url(url);
			this.parse_page_type(webPageType);
			this.parse_api_url(apiUrl);
			this.empty_object(y);
		} else {
			debugger;
		}
	}
	/** @arg {string} x */
	parse_api_url(x) {
		if(x.startsWith("/")) {
			let parts=x.slice(1).split("/");
			let url_type=this.get_url_type(parts);
			if(!url_type) debugger;
		} else {
			debugger;
		}
	}
	/** @arg {string[]} parts @arg {number} index */
	get_yt_url_type(parts,index) {
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
					default: no_handler({parts,index});
				}
			}
			case "notification": {
				index++; let next_part=parts[index]; switch(next_part) {
					case "get_unseen_count": break;
					case "get_notification_menu": break;
					case "record_interactions": break;
					default: no_handler({parts,index});
				} return {
					/** @type {`${typeof cur_part}.${typeof next_part}`} */
					name: `${cur_part}.${next_part}`
				};
			}
			case "browse": break;
			case "guide": index++; switch(parts[index]) {
				case void 0: break;
				default: no_handler({parts,index});
			} break;
			case "reel": index++; let next_part=parts[index]; switch(next_part) {
				case "reel_item_watch": break;
				case "reel_watch_sequence": break;
				default: no_handler({parts,index});
			} return {
				/** @type {`${typeof cur_part}.${typeof next_part}`} */
				name: `${cur_part}.${next_part}`
			};
			case "next": break;
			case "player": break;
			case "live_chat": index++; return this.get_live_chat_type("live_chat",parts,index);
			case "get_transcript": break;
			case "account": return get_account_type(cur_part,parts,index+1);
			case "feedback": break;
			default: no_handler({parts,index});
		}
		return {name: cur_part};
	}
	/** @arg {"live_chat"} base @arg {string[]} parts @arg {number} index */
	get_live_chat_type(base,parts,index) {
		let cur_part=parts[index];
		switch(cur_part) {
			case "get_live_chat_replay": break;
			default: no_handler({parts,index});
		};
		return {
			/** @type {`${typeof base}.${typeof cur_part}`} */
			name: `${base}.${cur_part}`
		};
	}
	/** @arg {string[]} parts */
	get_url_type(parts) {
		let index=0;
		const cur_part=parts[index];
		switch(cur_part) {
			case "youtubei": index++; return this.get_yt_url_type(parts,index);
			case "getDatasyncIdsEndpoint": return {name: cur_part};
			default: console.log("get_url_type",cur_part); debugger;
		}
		throw new Error("Missing");
	}
	/**
	 * @param {TwoColumnBrowseResultsRenderer} x
	 */
	TwoColumnBrowseResultsRenderer(x) {
		const {twoColumnBrowseResultsRenderer,...y}=x;
		this.TwoColumnBrowseResultsRendererData(twoColumnBrowseResultsRenderer);
		this.save_keys("TwoColumnBrowseResultsRenderer",x,true);
		this.empty_object(y);
	}
	/**
	 * @param {TwoColumnBrowseResultsRendererData} x
	 */
	TwoColumnBrowseResultsRendererData(x) {
		const {tabs,...y}=x;
		iterate(tabs,v => this.ResultRenderer(v));
		this.empty_object(y);
	}
	/**
	 * @param {ResultRenderer} x
	 */
	ResultRenderer(x) {
		const {tabRenderer,...y}=x;
		this.TabRenderer(tabRenderer);
		this.empty_object(y);
	}
	/**
	 * @param {TabRenderer} x
	 */
	TabRenderer(x) {
		const {content,selected,trackingParams,...y}=x;
		if("richGridRenderer" in content) {
			return;
		}
		if("sectionListRenderer" in content) {
			return;
		}
		this.primitive_of(selected,"boolean");
		this.trackingParams(trackingParams);
		this.empty_object(y);
	}
	/** @private @arg {ResponseContext} x */
	ResponseContext(x) {
		if("maxAgeSeconds" in x) {
			const {maxAgeSeconds: a,...v}=x;
			this.save_number(`${this.current_response_type}.response.maxAgeSeconds`,a);
			x=v;
		}
		const {mainAppWebResponseContext: a,serviceTrackingParams: b,webResponseContextExtensionData: c,...y}=x;
		this.MainAppWebResponseContextData(a);
		let tracking_handler=this.x.get("service_tracking");
		iterate(b,v => tracking_handler.set_service_params(v));
		tracking_handler.on_complete_set_service_params();
		this.WebResponseContextExtensionData(c);
		this.save_keys("ResponseContext",x,this.TODO_true);
		this.empty_object(y);
	}
	/**
	 * @param {MainAppWebResponseContextData} x
	 */
	MainAppWebResponseContextData(x) {x;}
	/**
	 * @param {WebResponseContextExtensionData} x
	 */
	WebResponseContextExtensionData(x) {x;}
	/**
	 * @param {YtWatchPageResponse} x
	 */
	YtWatchPageResponse(x) {x;}
	/**
	 * @param {OpenPopupAction} x
	 */
	action(x) {x;}
}
//#endregion
console=typeof window==="undefined"? console:(() => window.console)();
main();
