// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.14
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

console=typeof window==="undefined"? console:(() => window.console)();
var is_node_js=function is_node_js() {
	return false;
};
var destroy_env=() => {};
if(typeof window==="undefined") {
	is_node_js=() => true;
	if(typeof any(globalThis).require==="function") {
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
// #section Use module types
/** @type {import("./__global.js")} */
// #section end

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

class SavedData {
	/** @type {import("./support/yt_api/_abc/AnySavedData.js").AnySavedData} */
	any_data={};
}

let saved_data=new SavedData;
inject_api_yt.saved_data=saved_data;

const yt_debug_enabled=false;
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
/** @type {<T, U>(value: T|U, copy:U)=>value is U} */
function cast2_o(value,copy) {
	void value,copy;
	return true;
}
/** @type {<T, U>(v:T|U, _copy:U)=>U} */
function any_o(value,copy) {
	if(cast2_o(value,copy)) {
		return value;
	}
	throw new Error("Failed to cast");
}

class YtdMastheadContainerChildren {
	/** @type {Element|undefined} */
	center=new Element;
}

class YtdMastheadContainer {
	children=new YtdMastheadContainerChildren;
}

class YtdMastheadWithContainer {
	container=new YtdMastheadContainer;
}

class YtdMasthead {
	$=new YtdMastheadWithContainer;
}

class ShadyChildrenOfYtdApp {
	masthead=new YtdMasthead;
}




/** @type {unique symbol} */
const Gn=Symbol("injectionDeps");

class PagePreparer {
	cancel() {
		throw new Error("Only types");
	}
}


const original_document_createElement=document.createElement;
// @ts-ignore
document.createElement=overwrite_createElement;
// @ts-ignore
class FakeIframeElement {
	constructor() {
		this.__fake_data=new FakeIframeElement.special_base;
	}
}
FakeIframeElement.special_base=class {};
var XG=function() {};
// customElements.define('fake-iframe', FakeIframeElement);

/**
 * @this {Document}
 * @arg {string} n_type
 * @arg {ElementCreationOptions} [options]
 */
function overwrite_createElement(n_type,options) {
	if(n_type!=="iframe"&&n_type!=="IFRAME") {
		return original_document_createElement.call(this,n_type,options);
	}
	class UU {
		n_type=n_type;
		n_opts=options;
	}
	FakeIframeElement.special_base=UU;
	return original_document_createElement.call(this,"fake-iframe");
}

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
	/** @type {InstanceType<typeof YtdAppElement>|undefined} */
	let ytd_app=void 0;
	let found_element_count=0;
	let expected_element_count=6;

	let waiting_for_ytd_player=false;
	/** @type {number|null} */
	let current_timeout=null;

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
	dom_observer.addEventListener("plugin-activate",yt_watch_page_loaded_handler);
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
		if(yt_debug_enabled) console.log("activate_nav:fire");
		if(!ytd_player) return;
		if(!ytd_page_manager) return;
		if(ytd_player.active_nav) return;
		if(!plugin_overlay_element) return;
		ytd_player.active_nav=true;
		plugin_overlay_element.setAttribute("style",player_overlay_style_str);
		plugin_overlay_element.onupdate();
		let page_elem=ytd_page_manager.getCurrentPage();
		page_elem.append(plugin_overlay_element);
		log_current_video_data();
		ytd_page_manager.addEventListener("yt-page-type-changed",function() {
			if(!ytd_player) return;
			let page_elem=get_ytd_page_manager().getCurrentPage();
			setTimeout(function() {
				do_find_video();
			},80);
			if(page_elem.tagName.toLowerCase()!="ytd-watch-flexy") {
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
	/** @arg {CustomEventType} event */
	async function async_plugin_init(event) {
		let plugin_state={};
		let cur_count=1;
		let obj=dom_observer;
		let iter_count=0;
		if(is_node_js()) console.log("start async_plugin");
		try {
			while(true) {
				iter_count++;
				if(cur_count>32) {
					await new Promise((soon) => setTimeout(soon,0));
					cur_count=0;
				}
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
					/** @template {{created?:()=>void;is: string;_legacyForceObservedAttributes?: {};prototype:{_legacyForceObservedAttributes?: {}}}} T @arg {T} a @returns {T} */
					function polymer_register_custom_element(a) {
						if(!window.Polymer.Class) throw new Error("window.Polymer.Class is not a function");
						/** @type {T} */
						var b="function"===typeof a? a:window.Polymer.Class(a);
						a._legacyForceObservedAttributes&&(b.prototype._legacyForceObservedAttributes=a._legacyForceObservedAttributes);
						/** @arg {any} x */
						function any(x) {return x;}
						customElements.define(b.is,any(b));
						return b;
					}
					polymer_register_custom_element({
						is: "fake-iframe",
						fake_iframe: new FakeIframeElement,
						created: function() {
							this.fake_iframe=new FakeIframeElement;
						},
						prototype: XG.prototype,
					});
					plugin_state.polymer_loaded=true;
				}
				// BEGIN(ytd-app): obj.dispatchEvent({type: "find-ytd-app",detail,port});
				{
					let found=iterate_ytd_app();
					if(found) {
						found_element_count++;
					}
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
					let page_elem=ytd_page_manager.getCurrentPage();
					if(!page_elem) break x;
					if(!page_elem.__has_theater_handler_plugin) {
						page_elem.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin);
						page_elem.__has_theater_handler_plugin=true;
					}
					if(yt_debug_enabled) console.log("PageManager:current_page:"+page_elem.tagName.toLowerCase());
					if(page_elem.tagName.toLowerCase()!="ytd-watch-flexy") {
						console.log("found other current_page at iter=",iter_count);
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
					on_ytd_watch_flexy(page_elem);
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
				console.log(iter_count);
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
	async_plugin_init.__debug=false;
	dom_observer.addEventListener("async-plugin-init",async_plugin_init);
	const debug_ytd_app=true;
	/** @arg {HTMLElement} element */
	function on_ytd_app(element) {
		const element_id="ytd-app";
		if(yt_debug_enabled||debug_ytd_app) console.log(`on ${element_id}`);
		element_map.set(element_id,element);
		window.ytd_app=element;
		ytd_app=YtdAppElement.cast(element);
		ytd_app.addEventListener("yt-navigate-finish",function(event) {
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
	class VolumeRange {
		static enabled=true;
		static create_if_needed() {
			if(!this.enabled) return;
			if(!ytd_app) return;
			if(!ytd_app.__shady_children.masthead) return;
			let player_masthead=ytd_app.__shady_children.masthead;
			if(!player_masthead.$) return;
			if(!ytd_app.volume_range&&audio_gain_controller) {
				if(yt_debug_enabled) console.log("create VolumeRange");
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
		/**
		 * @arg {number} min
		 * @arg {number} max
		 * @arg {number} overdrive
		 * @arg {AudioGainController} gain_controller
		 */
		constructor(min,max,overdrive,gain_controller) {
			this.use_cache=true;
			this.max=max;
			this.min=min;
			this.overdrive=overdrive;
			this.gain_controller=gain_controller;
		}
		/**
		 * @arg {number} gain
		 */
		setGain(gain) {
			this.updateRangeElement(gain);
			this.gain_controller.setGain(gain);
			if(!this.use_cache) return;
			history_state_manager.setCacheValue("filter_gain",gain);
		}
		/** @private */
		getGain() {
			if(!this.use_cache) return null;
			return history_state_manager.getCacheValue("filter_gain");
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
		/**
		 * @arg {KeyboardEvent} event
		 */
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
		/**
		 * @arg {CustomEvent<{filter_gain: number|undefined}>} event
		 */
		onStateChange(event) {
			if(event.detail.filter_gain==void 0) {
				this.gain_controller.setGain(1);
				this.updateRangeElement(1);
				return;
			}
			this.gain_controller.setGain(event.detail.filter_gain);
			this.updateRangeElement(event.detail.filter_gain);
		}
		/**
		 * @arg {Element} view_parent
		 */
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
				history_state_manager.addEventListener("update",this.onStateChange.bind(this));
				this.range_element.min=""+this.min;
				this.range_element.max=""+this.overdrive;
				let new_gain=this.calculateGain();
				this.setGain(new_gain);
				this.view_div.append(this.range_element);
			}
			view_parent.insertAdjacentElement("beforebegin",this.view_div);
		}
	}
	function iterate_ytd_app() {
		if(ytd_app) return false;
		const target_element=get_html_elements(document,"ytd-app")[0];
		if(!target_element) return false;
		on_ytd_app(target_element);
		return true;
	}
	class YtdAppElement extends HTMLElement {
		/**@type {HTMLStyleElement|undefined}*/
		ui_plugin_style_element;
		/**@type {VolumeRange|undefined}*/
		volume_range;
		/**@type {boolean|undefined} */
		app_is_visible;
		/**@type {ReturnType<typeof setInterval>|undefined} */
		ytp_click_cint;
		pagePreparer=new PagePreparer;
		/**@arg {HTMLElement} element @return {YtdAppElement} */
		static cast(element) {
			return any_c(element,YtdAppElement);
		}
		__shady_children=new ShadyChildrenOfYtdApp;
		hasNavigated=false;
	}
}

class Seen {
	static debug=false;
	/**
	 * @type {any[]}
	 */
	static all_seen_objs=[];
	static all_seen_map=new Map;
	static seen_gen_counter=1;
	static seen_uid_counter=0;
	/**
	 * @arg {null} value
	 */
	static as_any(value) {
		let weak_info,ret;
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		const index_key=instance_index+"@"+instance_gen;
		if(this.debug) console.log("any",index_key,value);
		value=null;
		if(this.all_seen_map.has(index_key)) {
			weak_info=this.all_seen_map.get(index_key);
			ret=weak_info.deref();
			if(ret!==null) {
				return ret;
			}
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		ret={
			type: "any",
			any_key: index_key,
			obj_id,
		};
		weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @arg {Function|null} value
	 */
	static as_callable(value) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		value=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log("get callable",index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: "callable",
			fn_index_key: index_key,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @arg {null} value
	 */
	static as_constructor(value) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(value);
		value=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log("get constructor",index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: "constructor",
			constructor_key: index_key,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @arg {{} | null} instance
	 * @arg {{ constructor_tag: any; prototype_tag: any; }} prototype_info
	 */
	static as_instance(instance,prototype_info) {
		const [instance_index,instance_gen,ref_obj]=this.see_value(instance);
		instance=null;
		const index_key=instance_index+"@"+instance_gen;
		if(this.all_seen_map.has(index_key)) {
			let seen_info=this.all_seen_map.get(index_key);
			if(this.debug) console.log("get instance",index_key,seen_info.deref());
			if(seen_info.deref()!==null) return seen_info.deref();
		}
		let obj_id=this.seen_uid_counter;
		this.seen_uid_counter++;
		let ret={
			type: "instance",
			index_key,
			prototype_info,
			obj_id
		};
		let weak_info=new WeakRef(ret);
		ref_obj.info=weak_info;
		this.all_seen_map.set(index_key,weak_info);
		return ret;
	}
	/**
	 * @arg {any} value
	 */
	static see_value(value) {
		let index=this.seen_index_of(value);
		iz: if(index>-1) {
			let ref_obj_seen=this.all_seen_objs[index];
			let ref_obj=ref_obj_seen.ref.deref();
			if(ref_obj===null) break iz;
			return [index,this.seen_gen_counter,ref_obj];
		}
		let ref_obj={
			ref: new WeakRef(value)
		};
		index=this.all_seen_objs.push(ref_obj)-1;
		return [index,this.seen_gen_counter,ref_obj];
	}
	/**
	 * @arg {any} value
	 */
	static seen_index_of(value) {
		let arr=this.all_seen_objs;
		let index=-1;
		let remove_cnt=0;
		for(let i=0;i<arr.length;i++) {
			let obj=arr[i];
			let ref=obj.ref;
			let item=ref.deref();
			if(item===null) {
				remove_cnt++;
				continue;
			}
			if(item===value) {
				index=i;
				break;
			}
		}
		if(remove_cnt>arr.length/4) {
			let new_arr=[];
			this.seen_gen_counter++;
			for(let i=0;i<arr.length;i++) {
				let obj=arr[i];
				let ref=obj.ref;
				let item=ref.deref();
				if(item===null) continue;
				new_arr.push(obj);
			}
			this.all_seen_objs=new_arr;
			index=this.seen_index_of(value);
		}
		return index;
	}
}
inject_api_yt.Seen=Seen;

const realHTMLElement=HTMLElement;

/**
 * @type {<T extends any[]>(value:T)=>typeof value}
 */
function clone_array(arr) {
	arr=any_o([],arr);
	for(let [v,i] of arr.entries()) {
		arr[i]=deep_clone(v);
	}
	return arr;
}
/**
 * @type {<T extends Map<any, any>>(map:T)=>typeof map}
 */
function clone_map(map) {
	let arr=Array.from(map);
	let cloned_arr=arr.map(/**@return {[any, any]}*/(map_entry) => [map_entry[0],deep_clone(map_entry[1])]);
	return any_o(new Map(cloned_arr),map);
}
/**@arg {{}} obj*/
function clone_object(obj) {
	let obj_entries=Object.entries(obj);
	let cloned_entries=obj_entries.map((object_entry) => [object_entry[0],deep_clone(object_entry[1])]);
	let clone=Object.fromEntries(cloned_entries);
	return clone;
}
class WithES5Shimmed {
	/**@type {boolean|undefined} */
	es5Shimmed=true;
}
/**
 * @type {<T>(value:T)=>typeof value}
 */
function deep_clone(value) {
	if(typeof value==="object") {
		if(value===null) {
			// null is a primitive
			return value;
		}
		if(value instanceof Array) {
			return clone_array(value);
		}
		if(value instanceof Map) {
			/**@type {typeof value}*/
			let copy=clone_map(value);
			return copy;
		}
		if(Object.getPrototypeOf(value)===null) {
			let obj=clone_object(value);
			Object.setPrototypeOf(obj,null);
			return obj;
		}
		if(Object.getPrototypeOf(value).constructor===Object) {
			return clone_object(value);
		}
		let create=Object.getPrototypeOf(value).constructor;
		let proto=Object.getPrototypeOf(value);
		let str=Object.getPrototypeOf(value).constructor.name;
		let seen_obj=Seen.as_instance(value,{
			constructor_tag: Seen.as_constructor(create),
			prototype_tag: Seen.as_any(proto)
		});
		if(create===HTMLVideoElement) {
			// don't recurse into exact dom elements
			return seen_obj;
		}
		// was the real one shimmed already
		if(any_c(realHTMLElement,WithES5Shimmed).es5Shimmed) {
			// the constructor is still non-shimmed
			if(create===realHTMLElement.prototype.constructor) {
				return seen_obj;
			}
		}
		if(create===realHTMLElement) {
			return seen_obj;
		}
		if(str in window) {
			console.assert(false);
		}
		console.log("proto",str,create.toString().slice(0,32),create.toString().length);
		return seen_obj;
	}
	if(typeof value==="boolean") {
		// booleans are primitive
		return value;
	}
	if(typeof value==="string") {
		// strings are constant
		return value;
	}
	if(typeof value==="number") {
		// numbers are constant
		return value;
	}
	if(typeof value==="function") {
		if(value.name in window) {
			console.assert(false);
		}
		return Seen.as_callable(value);
	}
	if(typeof value==="undefined") {
		console.assert(false);
		return value;
	}
	console.log("unk",typeof value,value);
	return value;
}
/**@arg {string|URL} url */
function to_url(url) {
	if(url instanceof URL) {
		return url;
	} else {
		return new URL(url);
	}
}
/** @typedef {import("./support/yt_api/_abc/JsonDataResponseType.js").JsonDataResponseType} JsonDataResponseType */
/**@arg {string|URL|Request} request @arg {JsonDataResponseType} response_obj */
function fetch_filter_text_then_data_url(request,response_obj) {
	try {
		if(top!==null&&window!==top) {
			console.log('fetch in context with top location',top.location.pathname,location.pathname);
		} else {
			console.log('fetch in context',location.pathname);
		}
	} catch {
		console.log('fetch in context access blocked to top',location.pathname);
	}
	try {
		yt_handlers.on_handle_api(request,response_obj);
	} catch(err) {
		console.log("on_handle_api failed");
		console.log("\t",err);
	}
}
/**
 * @arg {string|URL|Request} request
 * @arg {{}|undefined} options
 * @arg {((arg0: any) => any)|undefined|null} onfulfilled
 * @arg {((arg0: any) => void)|undefined|null} on_rejected
 * @arg {string} response_text
 */
function handle_json_parse(request,options,onfulfilled,on_rejected,response_text) {
	if(yt_debug_enabled) console.log("handle_json_parse",request,options);
	let original_json_parse=JSON.parse;
	if(yt_debug_enabled) console.log("JSON.parse = new Proxy()");
	JSON.parse=new Proxy(original_json_parse,{
		apply: function(...proxy_args) {
			if(yt_debug_enabled) console.log("JSON.parse()");
			let obj=Reflect.apply(...proxy_args);
			if(yt_debug_enabled) console.log("request.url");
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
		JSON.parse=original_json_parse;
	}
	return ret;
}
/**
 * @arg {string|URL|Request} request
 * @arg {{}|undefined} options
 * @arg {((value: any) => any | PromiseLike<any>)|undefined|null} onfulfilled
 * @arg {((reason: any) => any | PromiseLike<any>)|undefined|null} onrejected
 */
function bind_promise_handler(request,options,onfulfilled,onrejected) {
	if(yt_debug_enabled) console.log("handle_json_parse.bind()");
	let ret=handle_json_parse.bind(null,request,options,onfulfilled,onrejected);
	return ret;
}

/**
 * @arg {string|URL|Request} request
 * @arg {{}|undefined} options
 * @arg {Promise<any>} ov
 * @return {Promise<any>}
 */
function handle_fetch_response_2(request,options,ov) {
	return {
		/**@type {<T, TResult2 = never>(onfulfilled?: ((value: T) => T | PromiseLike<T>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null)=>Promise<T | TResult2>} */
		then(onfulfilled,onrejected) {
			return ov.then(bind_promise_handler(request,options,onfulfilled,onrejected));
		},
		/**@type {<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<any>} */
		catch(onrejected) {
			return ov.catch(onrejected);
		},
		finally(onfinally) {
			return ov.finally(onfinally);
		},
		[Symbol.toStringTag]: "Promise",
	};
}
/**
 * @arg {string|URL|Request} request
 * @arg {{}|undefined} options
 * @arg {Response} response
 * @returns {Response}
 */
function fetch_promise_handler(request,options,response) {
	/** @type {["text"]} */
	let handled_keys=["text"];
	class FakeResponse {
		text() {
			if(yt_debug_enabled) console.log("response.text()");
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
/**
 * @arg {Error} rejection
 * @returns {Promise<Response>}
 */
function fetch_rejection_handler(rejection) {
	if(rejection instanceof DOMException) {
		if(rejection.message!=="") {
			console.log("fetch_rejection_handler",rejection);
			console.log(rejection);
		}
		throw rejection;
	}
	if(rejection instanceof TypeError) {
		if('cause' in rejection) {
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
/**
 * @type {typeof fetch | null}
 */
let original_fetch=null;
/**
 * @arg {string|URL|Request} url_or_request @arg {{}} [options]
 * @returns {Promise<Response>}
*/
function fetch_inject(url_or_request,options) {
	if(!original_fetch) throw new Error("No original fetch");
	if(options) {
		console.log("fetch_log_with_options",url_or_request,options);
	}
	if(typeof url_or_request==="string"&&url_or_request.startsWith("https://www.gstatic.com")) {
		return original_fetch(url_or_request,options);
	}
	let ret=original_fetch(url_or_request,options);
	let ret_1=ret.then(fetch_promise_handler.bind(null,url_or_request,options),fetch_rejection_handler);
	return ret_1;
}

fetch_inject.__proxy_target__=window.fetch;

/**
 * @arg {[()=>InitialDataType, object, []]} apply_args
 */
function do_proxy_call_getInitialData(apply_args) {
	return yt_handlers.on_initial_data(apply_args);
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
	/**
	 * @arg {any} value
	 */
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
/**
 * @arg {{}} object
 * @arg {PropertyKey} property
 * @arg {PropertyHandler} property_handler
 */
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
override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
override_prop(window,"getInitialCommand",new PropertyHandler((/**@type {[any,any,any]} */args) => Reflect.apply(...args)));
class ObjectInfo {
	constructor() {
		let [gr_0,gr_1,gr_2]="{{:,:}}".split(":");
		this.chunk_beg=gr_0;
		this.chunk_sep=gr_1;
		this.chunk_end=gr_2;
		this.key_sep=this.chunk_end+this.chunk_sep+this.chunk_beg;
	}
	/**
	 * @arg {{}} object
	 * @arg {((value: string, index: number, array: string[]) => value is string) | undefined} [filter_function]
	 */
	keys_of(object,filter_function) {
		let object_keys=Object.keys(object);
		if(filter_function) object_keys=object_keys.filter(filter_function);
		return this.chunk_beg+object_keys.join(this.key_sep)+this.chunk_end;
	}
}
ObjectInfo.instance=new ObjectInfo;
/**
 * @template {{}} T 
 * @arg {{[P in keyof T]: TypedPropertyDescriptor<T[P]>;}} obj 
 * @arg {T} _real @returns {(keyof T)[]}
 */
function get_keys_of(obj,_real) {
	let rq=Object.keys(obj);
	/** @type {any} */
	let ra=rq;
	return ra;
}
/** @template {{}} T @arg {T} obj @returns {(keyof T)[]} */
function get_keys_of_ex(obj) {
	let pd=Object.getOwnPropertyDescriptors(obj);
	let l1_pk=get_keys_of(pd,obj);
	/** @type {T} */
	let obj_proto=Object.getPrototypeOf(obj);
	let l2_pd=Object.getOwnPropertyDescriptors(obj_proto);
	let l2_pk=get_keys_of(l2_pd,obj);
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
	/**
	 * @arg {ApiIterateState} state
	 * @arg {{}} data
	 */
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
				this.iterate_target[rk](state,any(value));
			} else {
				this.default_iter(state,value);
			}
		}
	}
}
/** @typedef {{t:FilterHandlers;path:string}} ApiIterateState */
class YtIterateTarget {
	/**
	 * @arg {ApiIterateState} state
	 * @arg {AppendContinuationItemsAction} action
	 */
	appendContinuationItemsAction(state,action) {
		debugger;
		check_item_keys(state.path,"appendContinuationItemsAction",Object.keys(action));
		if(state.t.handleAppendContinuationItemsAction(state.path,action)) return;
		state.t.handlers.renderer_content_item_array.replace_array(state.t,"appendContinuationItemsAction.continuationItems",action,"continuationItems");
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {import("./support/yt_api/_abc/r/ReloadContinuationItemsCommand.js").ReloadContinuationItemsCommand} command
	 */
	reloadContinuationItemsCommand({t: state,path},command) {
		check_item_keys(path,"reloadContinuationItemsCommand",Object.keys(command));
		if(state.handleAppendContinuationItemsAction(path,command)) return;
		state.handlers.renderer_content_item_array.replace_array(state,"reloadContinuationItemsCommand.continuationItems",command,"continuationItems");
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {import("./support/yt_api/_abc/ItemSectionRendererData.js").ItemSectionRendererData} renderer
	 */
	itemSectionRenderer(state,renderer) {
		let {t,path}=state;
		check_item_keys(path,"itemSectionRenderer",Object.keys(renderer));
		t.iteration.default_iter(state,renderer);
		if(renderer.contents===void 0) return;
		renderer.contents=renderer.contents.filter((item) => {
			let keys=Object.keys(item);
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
		console.log("compactLinkRenderer",state.path,renderer);
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {import("./support/yt_api/rich/RichGridRendererData.js").RichGridRendererData} renderer
	 */
	richGridRenderer(state,renderer) {
		state.t.handlers.rich_grid.richGridRenderer(state.path,renderer);
		state.path="richGridRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {{}} renderer
	 */
	compactVideoRenderer(state,renderer) {
		state.path="compactVideoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {{}} renderer
	 */
	thumbnailOverlayToggleButtonRenderer(state,renderer) {
		state.path="thumbnailOverlayToggleButtonRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
	/**
	 * @arg {ApiIterateState} state
	 * @arg {{}} renderer
	 */
	videoRenderer(state,renderer) {
		state.path="videoRenderer";
		state.t.iteration.default_iter(state,renderer);
	}
}

/**
 * @arg {string} real_path
 * @arg {string[]} keys
 * @arg {string} path
 * @return {void}
 * @log item_keys_tag
 */
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
	switch(path) {
		default: console.log("item_keys_tag [ci_2_1_]: content path",path,real_path_arr_dyn); break;
		case "appendContinuationItemsAction.continuationItems[]": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_1_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItemRenderer": break;
			case "compactPlaylistRenderer": break;
			case "compactVideoRenderer": break;
			case "commentRenderer": break;
			case "richItemRenderer": break;
		} break;
		case "appendContinuationItemsAction": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_2_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItems": break;
			case "targetId": break;
		} break;
		case "richItemRenderer.content": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_3_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "adSlotRenderer": break;
			case "radioRenderer": break;
			case "videoRenderer": break;
			case "reelItemRenderer": break;
		} break;
		case "richItemRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_4_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "content": break;
			case /*grep-skip*/"trackingParams": break;
		} break;
		case "richGridRenderer.contents[]": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_6_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItemRenderer": break;
			case "richItemRenderer": break;
			case "richSectionRenderer": break;
		} break;
		case "richGridRenderer.masthead": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_5_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "adSlotRenderer": break;
			case "radioRenderer": break;
			case "videoRenderer": break;
		} break;
		case "richGridRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_7_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "contents": break;
			case /*grep-skip*/"trackingParams": break;
			case "header": break;
			case "targetId": break;
			case "reflowOptions": break;
			case "style": break;
			case "masthead": break;
		} break;
		case "itemSectionRenderer.contents[]": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_8_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
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
			case "shelfRenderer": break;
			case "videoRenderer": break;
		} break;
		case "itemSectionRenderer": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_9_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "contents": break;
			case "header": break;
			case "sectionIdentifier": break;
			case "targetId": break;
			case /*grep-skip*/"trackingParams": break;
		} break;
		case "reloadContinuationItemsCommand.continuationItems[]": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_a_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "commentsHeaderRenderer": break;
			case "commentThreadRenderer": break;
			case "continuationItemRenderer": break;
			case "richItemRenderer": break;
			case "richSectionRenderer": break;
		} break;
		case "reloadContinuationItemsCommand": for(let key of keys) switch(key) {
			default: console.log("item_keys_tag [ci_3_b_]: iter content key "+path+" ["+key+"]",real_path_arr_dyn); break;
			case "continuationItems": break;
			case "slot": break;
			case "targetId": break;
		} break;
	}
}

class HandleRendererContentItemArray {
	debug=false;
	/*
	// [B].join("\n");
	// [Mma].join("");
	// Ck("EXPERIMENT_FLAGS",{})["desktop_use_new_history_manager"];
	// function get_Ak(){return ytcfg.data_};
	// function use_Ck(key,fb) {
	//   let Ak=get_Ak();
	//   return a in Ak ?Ak[a]:b;
	// }
	// Ck;
	// Jn().resolve(Cv).currentEndpoint;u5().browserHistory;
	*/
	/** @arg {string} path @arg {HandleRichGridRenderer|FilterHandlers} base @arg {import("./support/yt_api/rich/RichItemRenderer.js").RichItemRenderer} content_item */
	filter_for_rich_item_renderer(path,base,content_item) {
		let renderer=content_item.richItemRenderer;
		check_item_keys(path,"richItemRenderer",Object.keys(renderer));
		console.assert(renderer.content!=void 0,"richItemRenderer has content");
		check_item_keys(path,"richItemRenderer.content",Object.keys(renderer.content));
		if("adSlotRenderer" in renderer.content) {
			if(base.debug) console.log(base.class_name,"adSlotRenderer=",renderer.content.adSlotRenderer);
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
	/**
	 * @arg {HandleRichGridRenderer|FilterHandlers} base
	 * @arg {string} path
	 * @arg {{[U in "continuationItems"|"contents"]?: import("./support/yt_api/_abc/c/ContinuationItem.js").ContinuationItem[]}} obj
	 * @arg {"continuationItems"|"contents"} key
	 */
	replace_array(base,path,obj,key) {
		let arr=obj[key];
		if(!arr) return;
		let filtered=arr.filter((content_item) => {
			let keys=Object.keys(content_item);
			check_item_keys(path,`${path}[]`,keys);
			if("richItemRenderer" in content_item) {
				return this.filter_for_rich_item_renderer(path,base,content_item);
			}
			if("commentThreadRenderer" in content_item) return true;
			if("commentsHeaderRenderer" in content_item) return true;
			if("continuationItemRenderer" in content_item) return true;
			if(!("richSectionRenderer" in content_item)) {
				console.log("extra content_item keys "+"["+keys.join("][")+"]",content_item);
				return true;
			};
			return this.handle_rich_section_renderer(content_item);
		});
		if(filtered.length>0) {
			obj[key]=filtered;
		}
	}
}

class HandleRichGridRenderer {
	debug=false;
	/**@readonly*/
	class_name="HandleRichGridRenderer";
	/**@readonly*/
	entry="richGridRenderer";
	rendererContentItemArray=new HandleRendererContentItemArray;
	/**
	 * @arg {string} path
	 * @arg {import("./support/yt_api/rich/RichGridRendererData.js").RichGridRendererData} renderer
	 */
	richGridRenderer(path,renderer) {
		check_item_keys(path,"richGridRenderer",Object.keys(renderer));
		if(this.debug) console.log("run handler richGridRenderer");
		if(renderer.masthead) {
			check_item_keys(path,"richGridRenderer.masthead",Object.keys(renderer.masthead));
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead;
				console.log("masthead",masthead);
				renderer.masthead=masthead;
			}
		}
		if(renderer.contents) {
			if(this.debug) console.log("on_contents",path);
			this.rendererContentItemArray.replace_array(this,"richGridRenderer.contents",renderer,"contents");
		}
	}
}
/** @typedef {import("./support/yt_api/_abc/c/ContinuationItem.js").ContinuationItem} ContinuationItem */
/** @typedef {import("./support/yt_api/_/AppendContinuationItemsAction.js").AppendContinuationItemsAction} AppendContinuationItemsAction */
// class AppendContinuationItemsAction {
// 	/**@type {ContinuationItem[]} */
// 	continuationItems=[];
// 	targetId="";
// }

/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_abc/w/WatchNextContinuationAction.js").WatchNextContinuationAction} */
function is_watch_next_feed_target(o) {
	return o.targetId==="watch-next-feed";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_abc/c/CommentsSectionContinuationAction.js").CommentsSectionContinuationAction} */
function is_comments_section_next(o) {
	return o.targetId==="comments-section";
}
/** @arg {AppendContinuationItemsAction} o @returns {o is import("./support/yt_api/_abc/b/BrowseFeedAction.js").BrowseFeedAction} */
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


class FilterHandlers {
	constructor() {
		this.debug=false;
		/**@readonly*/
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
	}
	run_mc=false;
	/**
	 * @arg {string} path
	 * @arg {AppendContinuationItemsAction} action
	 */
	handleAppendContinuationItemsAction(path,action) {
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
			/** @type {import("./support/yt_api/_abc/b/BrowseFeedAction.js").BrowseFeedAction} */
			let action_t=action;
			console.log("path",path,`continuation action "${action_t.targetId}"`,action_t.continuationItems);
			// return true;
			return false;
		}
		console.log("path",path,"continuation action",action);
		debugger;
		return false;
	}
	/**
	 * @arg {import("./support/yt_api/_abc/w/WatchResponsePlayer.js").WatchResponsePlayer} data
	 * @arg {string} path
	 */
	on_v1_player(path,data) {
		if(data.playerAds) {
			let old_ads=data.playerAds;
			if(this.debug) console.log(this.class_name+": "+path+".playerAds=",data.playerAds);
			data.playerAds=[];
			any(data.playerAds).old_store=old_ads;
		}
		if(data.adPlacements) {
			if(this.debug) console.log(this.class_name+": "+path+".adPlacements=",data.adPlacements);
			data.adPlacements=[];
		}
		debugger;
	}
	/**
	 * @arg {string} path
	 * @arg {{}} data
	 */
	on_v1_browse(path,data) {
		console.log("browse page",path,data);
	}
	/** 
	 * @template {string} X
	 * @template {string} U
	 * @template {string} V
	 * @template {`https://${X}/${U}?${V}`} T
	 * @arg {{}} state
	 * @arg {T} x 
	 * */
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
			console.log('parse failed (should never happen)',x,res_parse);
			throw new Error("unreachable");
		}
		/** @template T @template U @typedef {import("./support/make/Split.js").Split<T,U>} Split */
		/** @type {Split<import("./support/parse_url/RemoveFirst.js").RemoveFirst<typeof res_parse.pathname>,"/">} */
		let path_parts=res_parse.pathname.slice(1).split("/");
		return this.get_url_type(state,path_parts);
	}
	/** @typedef {import("./support/yt_api/_abc/UrlTypes.js").UrlTypes} UrlTypes */
	/**
	 * @arg {{}} state
	 * @arg {string[]} parts
	 * @returns {UrlTypes}
	 */
	get_url_type(state,parts) {
		let index=0;
		switch(parts[index]) {
			case "youtubei": index++; return this.get_yt_url_type(state,parts,index);
			case "getDatasyncIdsEndpoint": return "getDatasyncIdsEndpoint";
			default: debugger;
		}
		throw new Error("Missing");
	}
	/**
	 * @arg {{}} state
	 * @arg {"live_chat"} base
	 * @arg {string[]} parts
	 * @arg {number} index
	 * @returns {UrlTypes}
	 */
	get_live_chat_type(state,base,parts,index) {
		let cur_part=parts[index];
		switch(cur_part) {
			case "get_live_chat_replay": break;
			default: no_handler({...state,parts,index});
		};
		return `${base}.${cur_part}`;
	}
	/**
	 * @arg {{}} state
	 * @arg {string[]} parts
	 * @arg {number} index
	 * @returns {UrlTypes}
	 */
	get_yt_url_type(state,parts,index) {
		if(parts[1]!=="v1") {
			debugger;
		}
		index++;
		let cur_part=parts[index];
		switch(cur_part) {
			case "att": switch(parts[index+1]) {
				case "get": return "att.get";
				default: no_handler({...state,parts,index});
			}
			case "notification": index++; switch(parts[index]) {
				case "get_unseen_count": return "notification.get_unseen_count";
				case "get_notification_menu": return "notification.get_notification_menu";
				default: no_handler({...state,parts,index});
			}
			case "browse": return "browse";
			case "guide": index++; switch(parts[index]) {
				case void 0: return "guide";
				default: no_handler({...state,parts,index});
			}
			case "reel": index++; switch(parts[index]) {
				case "reel_item_watch": return "reel.reel_item_watch";
				case "reel_watch_sequence": return "reel.reel_watch_sequence";
				default: no_handler({...state,parts,index});
			}
			case "next": return "next";
			case "player": return "player";
			case "live_chat": index++; return this.get_live_chat_type(state,"live_chat",parts,index);
			case "get_transcript": return "get_transcript";
			case "account": return get_account_type(state,cur_part,parts,index+1);
			default: no_handler({...state,parts,index});
		}
	}
	/** @template {UrlTypes} T @arg {T} url_type @arg {{}} json @returns {import("./support/yt_api/_/r/responseTypes.js").responseTypes} */
	get_res_data(url_type,json) {
		switch(url_type) {
			case "att.get": 
			/** @type {import("./support/yt_api/yt/yt_response_att_get.js").yt_response_att_get} */
			let tc={url_type: "att.get",json: any(json)};
			return tc;
			case "browse": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_response_browse.js").yt_response_browse['json']} */
				json: any(json),
			};
			case "guide": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_response_guide.js").yt_response_guide['json']} */
				json: any(json),
			};
			case "notification.get_unseen_count": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_notification_get_unseen_count.js").yt_notification_get_unseen_count['json']} */
				json: any(json),
			};
			case "reel.reel_item_watch": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_response_reel_item_watch.js").yt_response_reel_item_watch['json']} */
				json: any(json),
			};
			case "player": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_response_player.js").yt_response_player['json']} */
				json: any(json),
			};
			case "next": console.log(url_type,json,Object.keys(json)); return {
				url_type,
				/** @type {import("./support/yt_api/yt/YtApiNext.js").YtApiNext} */
				json: any(json),
			};
			case "reel_watch_sequence": return {
				url_type,
				/** @type {import("./support/yt_api/yt/yt_response_reel_watch_sequence.js").yt_response_reel_watch_sequence["json"]} */
				json: any(json),
			};
			case "live_chat.get_live_chat_replay": return {
				url_type,
				json,
			};
			case "notification.get_notification_menu": return {
				url_type,
				/** @type {import("./support/_/notification_get_notification_menu.js").notification_get_notification_menu["json"]} */
				json: any(json),
			};
			default: console.log(url_type,json); debugger;
		}
		if(url_type==="channel") {}
		throw new Error("Stop");
	}
	/** @typedef {import("./support/yt_api/_/r/responseTypes.js").responseTypes} responseTypes */
	/** @arg {responseTypes} input @arg {string|URL|Request} request @arg {URL} parsed_url */
	on_json_type(input,request,parsed_url) {
		try {
			on_json_request({
				...input,
				request,
				parsed_url,
			});
		} catch {
			console.log("api not handled", input.url_type);
		}
	}
	/**
	 * @arg {string|URL|Request} request
	 * @arg {JsonDataResponseType} data
	 */
	on_handle_api(request,data) {
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
		/** @type {`https://${string}/${string}?${string}`} */
		let href_=req_hr_t;
		const url_type=this.use_template_url({request,data},href_);
		let path_url=req_parse.pathname;
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
		switch(res.url_type) {
			case "att.get": this.on_att_get(res.json); break;
			case "player": debugger; this.on_v1_player(api_path,res.json); break;
			default: debugger;
		}
	}
	/**
	 * @param {import("./support/yt_api/_abc/a/AttGetV.js").AttGetV} data
	 */
	on_att_get(data) {
		this.on_response_context("on_att_get",data.responseContext);
		let ok=Object.keys(data);
		if(eq_keys(ok, ['responseContext', 'challenge', 'bgChallenge'])) return;
		// spell:disable-next-line
		const token1="kS9PUbzBzfkpnx636le0IQOnLToPkJ8rDwtv7Zd3CH8";
		/** @type {`a=${number}&a2=${number}&c=${number}&d=${number}&t=${number}&c1a=${number}&hh=${string}`} */
		const chal_as_fmt=`a=5&a2=10&c=1672268443&d=1&t=7200&c1a=1&hh=${token1}`;
		/** @type {import("./test.js").AttChallengeObj} */
		let search_param_obj=make_search_params(chal_as_fmt);
		/** @type {keyof typeof search_param_obj} */
		let i
		for(i	in search_param_obj) {
			switch(i) {
				case "a": break;
				default: debugger;
			}
		}
		data.bgChallenge;
		console.log(data);
		debugger;
	}
	/**
	 * @arg {"on_att_get"} _from
	 * @arg {import("./support/yt_api/_abc/g/GeneralContext.js").GeneralContext} context
	 */
	on_response_context(_from,context) {
		for(let service_tracking_param of context.serviceTrackingParams) {
			switch(service_tracking_param.service) {
				case "CSI": this.on_csi_service(service_tracking_param); break;
				case "ECATCHER": debugger; break;
				case "GFEEDBACK": debugger; break;
				case "GUIDED_HELP":debugger; break;
				default: debugger;
			}
		}
	}
	csi_service={
		/** @type {string|null} */
		GetWatchNext_rid:null,
		/** @type {string|null} */
		GetAttestationChallenge_rid: null,
		/** @type {"WEB"|null} */
		c: null,
		/** @type {"2.20221220.09.00"|null} */
		cver: null,
		/** @type {"1"|null} */
		yt_li: null,
	};
	/**
	 * @param {import("./support/yt_api/_abc/a/CsiServiceParams.js").CsiServiceParams} service
	 */
	on_csi_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "GetWatchNext_rid": this.csi_service[param.key]=param.value; break;
				case "c":{
					if(param.value !=="WEB")debugger;
					this.csi_service[param.key]=param.value;
				} break;
				case "cver":{
					if(param.value !=="2.20221220.09.00")debugger;
					this.csi_service[param.key]=param.value;
				} break;
				case "yt_li": {
					if(param.value !=="1") debugger;
					this.csi_service[param.key]=param.value;
				} break;
				case "GetAttestationChallenge_rid": {
					this.csi_service[param.key]=param.value;
					debugger;
				} break;
				default: debugger;
			}
		}
	}
	/**
	 * @arg {InitialDataType} data
	 */
	handle_page_type(data) {
		const debug=false;
		let page_type=data.page;
		debug&&console.log(this.class_name+": handle_page_type with page_type and response_type",page_type);
		this.handle_any_data(`page_type_${page_type}`,data);
		switch(data.page) {
			case "watch": this.on_v1_player(page_type,data.playerResponse); break;
			case "browse": this.on_v1_browse(page_type,data); break;
			default: console.log("handle_page_type",page_type); debugger;
		}
	}
	/**
	 * @arg {UrlTypes|`page_type_${import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail['pageType']}`} path
	 * @arg {import("./support/yt_api/_abc/SavedDataItem.js").SavedDataItem} data
	 */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @type {import("./support/yt_api/_abc/AnySavedData.js").AnySavedData} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	/** @typedef {import("./support/yt_api/_abc/InitialDataType.js").InitialDataType} InitialDataType */
	/**
	 * @arg {[()=>InitialDataType, object, []]} apply_args
	 */
	on_initial_data(apply_args) {
		/** @type {InitialDataType} */
		let ret=Reflect.apply(...apply_args);
		if(ret.response) {
			if(yt_debug_enabled) console.log(this.class_name+": initial_data:",ret);
			try {
				this.handle_page_type(ret);
				let page_type=window.ytPageType;
				page_type_iter(ret.page);
				switch(page_type) {
					case void 0: return;
					case "settings":
					case "watch": case "browse": case "shorts": case "channel": case "playlist": {

					} break;
					default: debugger;
				}
			} catch(err) {
				console.log(this.class_name+": init filter error");
				console.log(err);
			}
		} else {
			console.log(this.class_name+": unhandled return value:",ret);
			debugger;
		}
		return ret;
	}
}
/**
 * @type {any[]}
 */
let blob_create_args_arr=[];
let leftover_args=[];
inject_api_yt.blob_create_args_arr=blob_create_args_arr;
let yt_handlers=new FilterHandlers;
inject_api_yt.yt_handlers=yt_handlers;
function setup_prototype_modify() {
	/** @type {Map<string, Blob | MediaSource>}*/
	let created_blobs=new Map;
	inject_api_yt.created_blobs=created_blobs;
	/** @type {Set<string>}*/
	let active_blob_set=new Set;
	inject_api_yt.active_blob_set=active_blob_set;
	URL.createObjectURL=new Proxy(URL.createObjectURL,{
		/**
		 * @arg {typeof URL["createObjectURL"]} target
		 * @arg {typeof URL} thisArg
		 * @arg {[Blob | MediaSource]} args
		*/
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
		/**
		 * @arg {typeof URL["revokeObjectURL"]} target
		 * @arg {typeof URL} thisArg
		 * @arg {[string]} args
		*/
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
	let OriginalImage=Image;
	Image=new Proxy(Image,{
		construct(...proxy_args) {
			let c_cls=proxy_args[0];
			let tc=class extends c_cls {
				/** @override */
				get src() {
					return super.src;
				}
				/** @override */
				set src(_src) {
					if(_src.indexOf("/api/stats/qoe?")>-1) return;
					super.src=_src;
				}
			};
			let c_args=proxy_args[1];
			let ret=new tc(...c_args);
			return ret;
		}
	});
	Image=OriginalImage;
}
setup_prototype_modify();
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
/**
 * @type {any[]}
 */
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
		/**@type {{[str:string]:any}} */
		this._events={};
	}
	/**
	 * @arg {{ type: any; data?: { type: any; data: any[]; }; }} ev
	 */
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
	/**
	 * @arg {string | number} ev_name
	 * @arg {any} fn
	 */
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
	/**
	 * @arg {string} ev_name
	 * @arg {(event: { data: { type: any; data: [any, any, any]; }; }) => void} fn
	 */
	addEventListener(ev_name,fn) {
		(this._events[ev_name]??=[]).push({disposed: false,handler: fn});
	}
}
/**
 * @arg {{ value?: any; value_tr?: any; value_of?: any; noisy_flag?: any; }} cc
 * @arg {string} ms
 * @arg {{}} obj
 * @arg {string} [mc]
 */
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
/**
 * @arg {any} val
 * @arg {MKState} cc
 */
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
/**
 * @arg {MKState} cc
 */
function on_mk_function_property(cc) {
	/**@this {{}}*/
	function with_this(/** @type {any} */ ...args) {
		new_pv_fn(this,cc,...args);
	}
	cc.value=with_this;
	ud_func.add(cc.value);
}
const ghost_symbol=Symbol.for("ghost");
class WithGhostSymbol {
	/**@type {boolean|undefined} */
	[ghost_symbol]=true;
}
class MKState {
	[ghost_symbol]=true;
	/**
	 * @arg {{}} value
	 * @arg {PropertyKey} property_key
	 * @arg {object} target
	 * @arg {string} property_path
	 * @arg {boolean} noisy
	 */
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
	/**@type {Function | null} */
	function_value=null;
	noisy=false;
}
/**
 * @arg {MKState} cc
 * @arg {{}} obj
 */
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
/**
 * @arg {MKState} cc
 * @arg {{}} obj
 */
function on_mk_property_set(cc,obj) {
	if(ud_func.has(obj)) cc.value=obj;
	if(any_c(obj,WithGhostSymbol)[ghost_symbol]===undefined) {
		on_mk_new_property(cc,obj);
	} else {
		cc.value=obj;
	}
}
/**
 * @arg {MKState} cc
 */
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
/**
 * @arg {object} target
 * @arg {PropertyKey} property_key
 * @arg {string} property_path
 * @arg {boolean} noisy
 */
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
	/**@type {{[str: string]:?(<T extends CustomEventTarget>(this:T, event: CustomEventType) => void)[]}} */
	_events={};
	/**
	 * @arg {string} type
	 * @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler
	 */
	addEventListener(type,handler) {
		(this._events[type]??=[]).push(handler);
	}
	/**
	 * @arg {string} type
	 * @arg {<T extends CustomEventTarget>(this:T, event: CustomEventType) => void} handler
	 */
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
	/**
	 * @arg {CustomEventType} event
	 */
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
	/**@arg {MessagePort} port @arg {number} count */
	next_tick_action(port,count) {
		if(this.trace) console.log("tick_trace",count);
		// port.postMessage() -> on_port_message;
		port.postMessage(count);
	}
}
let dom_observer=new DomObserver;
inject_api_yt.dom_observer=dom_observer;


class YtdPageManagerElement extends HTMLElement {
	/** @returns {import("./support/yt_api/yt/YtCurrentPage.js").YtCurrentPage} */
	getCurrentPage() {throw 1;}
}

inject_api_yt.playlist_arr??=[];
/**@type {string[]} */
let playlist_arr=inject_api_yt.playlist_arr;
/**
 * @type {YtdPageManagerElement|null}
 */
let ytd_page_manager=null;

function has_ytd_page_mgr() {
	return ytd_page_manager!==null;
}

/** @returns {YtdPageManagerElement}*/
function get_ytd_page_manager() {
	if(ytd_page_manager!==null) {
		return ytd_page_manager;
	}
	throw new Error("No ytd_page_manager");
}

/**
 * @arg {HTMLElement} element
 */
function on_ytd_page_manager(element) {
	const element_id="ytd-page-manager";
	if(yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_page_manager=any_c(element,YtdPageManagerElement);
	window.ytd_page_manager=element;
}
class YtdWatchFlexyElement extends HTMLElement {
	static sel() {

	}
}
/**
 * @type {YtdWatchFlexyElement | null}
 */
let ytd_watch_flexy=null;
/**
 * @arg {HTMLElement} element
 */
function on_ytd_watch_flexy(element) {
	const element_id="ytd-watch-flexy";
	if(yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	ytd_watch_flexy=any_c(element,YtdWatchFlexyElement);
	window.ytd_watch_flexy=element;
	ytd_watch_flexy.addEventListener("yt-navigate",function(event) {
		for(let handler of on_yt_navigate) {
			handler(event);
		}
	});
}
inject_api_yt.page_type_changes??=[];
let page_type_changes=inject_api_yt.page_type_changes;

/** @type {string | null}*/
let last_page_type=null;

function is_watch_page_active() {
	if(!ytd_page_manager?.getCurrentPage()) {
		return false;
	}
	let page_elem=ytd_page_manager.getCurrentPage();
	return page_elem.tagName.toLowerCase()=="ytd-watch-flexy";
}

/**
 * @arg {Node} value
 */
function as_node(value) {
	return value;
}

function page_changed_next_frame() {
	if(!plugin_overlay_element) return;
	if(!has_ytd_page_mgr()) return;
	plugin_overlay_element.onupdate();
	get_ytd_page_manager().getCurrentPage().append(as_node(plugin_overlay_element));
}

/**@type {Map<string, HTMLElement>}*/
let element_map=new Map;
/**@type {Map<string, HTMLVideoElementArrayBox>}*/
let box_map=new Map;
save_new_map("box_map",box_map);

/** @type {import("./support/yt_api/yt/YtdPlayerElement.js").YtdPlayerElement | null} */
let ytd_player=null;
/** @arg {HTMLElement} element */
function on_ytd_player(element) {
	const element_id="ytd-player";
	if(yt_debug_enabled) console.log(`on ${element_id}`);
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
	/**@readonly*/
	type="HTMLVideoElementArrayBox";
	/** @arg {HTMLVideoElement[]} value */
	constructor(value) {
		this.value=value;
	}
}

/** @template T @arg {any} e @returns {T} */
function any(e) {
	return e;
}

class YTNavigateFinishEvent {
	/** @arg {Event} value @return {YTNavigateFinishEvent} */
	static cast(value) {
		/**@type {any} */
		let ret=value;
		return ret;
	}
	/** @type {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} */
	detail=any({});
}

/**
 * @type {((event:YTNavigateFinishEvent)=>void)[]}
 */
let on_yt_navigate_finish=[];

/** @arg {YTNavigateFinishEvent} event */
function log_page_type_change(event) {
	let {detail}=event;
	if(!detail) return;
	setTimeout(() => {
		on_page_type_changed(detail);
	});
}
on_yt_navigate_finish.push(log_page_type_change);
const last_detail_val={value: {}};

/**
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail
 * @arg {import("./support/yt_api/_abc/JsonDataEndpointType.js").JsonDataEndpointType} obj
 * @arg {string[]} path
 * @arg {string[]} skip
 * @arg {number[]} ent_ids
 */
function random_sometimes_break_base_0(detail,obj,path,skip=[],ent_ids=[]) {
	last_detail_val.value=detail;
	ent_ids;
	if(typeof obj!=="object") return;
	/** @type {{}} */
	let oo=obj;
	/** @type {{[x: string]: {}}} */
	let idx_able=oo;
	for(let x of Object.keys(obj)) {
		if(skip.includes(x)) continue;
		console.log(path.concat(x).join("."),idx_able[x]);
		if(Math.random()<(random_factor/5)&&x in idx_able) {
			console.log(path.concat(x).join("."),idx_able[x]);
			debugger;
		}
	}
}
/**
 * @arg {string[]} src
 * @arg {string[]} target
 */
function eq_keys(src,target) {
	if(src.length!==target.length) return false;
	for(let i=0;i<src.length;i++) {
		let a=src[i];
		let b=target[i];
		if(a!==b) return false;
	}
	return true;
}
/**
 * @arg {string[]} keys
 * @arg {string[]} to_remove
 */
function filter_out_keys(keys,to_remove) {
	to_remove=to_remove.slice();
	/** @type {string[]} */
	let ok_e=[];
	for(let i=0;i<keys.length;i++) {
		if(to_remove.includes(keys[i])) {
			let rm_i=to_remove.indexOf(keys[i]);
			to_remove.splice(rm_i,1);
			continue;
		}
		ok_e.push(keys[i]);
	}
	if(to_remove.length>0) {
		console.log("did not remove all target keys",keys,'missing',to_remove);
		debugger;
	}
	return ok_e;
}
const gen_not_want_level_1=["responseContext","contents","trackingParams","topbar"];
/** @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail["response"]} obj */
function pb_0(detail,obj) {
	if(obj.page==="watch") {
		x: {
			let ok=filter_out_keys(Object.keys(obj.response),gen_not_want_level_1);
			if(eq_keys(ok,['currentVideoEndpoint','playerOverlays','onResponseReceivedEndpoints','engagementPanels','pageVisualEffects','frameworkUpdates'])) break x;
			debugger;
		}
		if(Object.keys(obj.response).length!==10) {
			debugger;
		}
	}
	if(detail.pageType==="browse") {
		x: {
			let ok=filter_out_keys(Object.keys(obj.response),gen_not_want_level_1);
			if(!ok.length) break x;
			if(eq_keys(ok,['header','onResponseReceivedActions'])) break x;
			if(eq_keys(ok,['header','observedStateTags'])) break x;
			if(eq_keys(ok,['header'])) break x;
			debugger;
		}
	}
}
const gen_not_want=["page","endpoint","response","url"];
/**
 * @arg {any} obj
 * @arg {string[]} iter_skips
 */
function click_track_do(obj,iter_skips) {
	if("clickTrackingParams" in obj) {
		iter_skips.push("clickTrackingParams");
		if(typeof obj.clickTrackingParams!=="string") {
			debugger;
		}
	}
}
const gen_not_want_level_1_endpoint=["clickTrackingParams","commandMetadata"];
/**
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail["response"]} obj
 * @arg {["detail","response"]} path
 */
function random_sometimes_break_0(detail,obj,path) {
	/** @type {string[]} */
	let iter_skips=[];
	let ok=Object.keys(obj);
	/** @type {string[]} */
	let ok_e=[];
	const gen_not_local=["expirationTime","rootVe","playerResponse","previousCsn","preconnect"];
	for(let i=0;i<ok.length;i++) {
		if(gen_not_want.includes(ok[i])) continue;
		if(gen_not_local.includes(ok[i])) continue;
		ok_e.push(ok[i]);
	}
	let is_this_keys_ok=get_is_ok();
	function get_is_ok() {
		if(!ok_e.length) return true;
		if(eq_keys(ok_e,["reelWatchSequenceResponse","cachedReelWatchSequenceResponse"])) return true;
		debugger;
		return false;
	}
	click_track_do(obj,iter_skips);
	if("rootVe" in obj) {
		iter_skips.push("rootVe");
		console.log("rootVe",obj,obj.rootVe);
	}
	if("page" in obj) {
		iter_skips.push("page");
	}
	if("endpoint" in obj) {
		let ok_1=filter_out_keys(Object.keys(obj.endpoint),gen_not_want_level_1_endpoint);
		function get_is_ok() {
			if(eq_keys(ok_1,["browseEndpoint"])) return true;
			if(eq_keys(ok_1,["reelWatchEndpoint"])) return true;
			if(eq_keys(ok_1,["watchEndpoint"])) return true;
			return false;
		}
		if(!get_is_ok()) {
			console.log(ok_1);
			debugger;
		}
		iter_skips.push("endpoint");
	}
	if("response" in obj) {
		pb_0(detail,obj);
		iter_skips.push("response");
	}
	if("playerResponse" in obj) {
		// UBlockOrigin removes this, so it is now optional
		if("adPlacements" in obj.playerResponse&&obj.playerResponse.adPlacements!==void 0) {
			if(obj.playerResponse.adPlacements.length>0) {
				debugger;
			}
		}
		switch(obj.page) {
			case "watch": {
				let ok_2=Object.keys(obj.playerResponse);
				for(let i=0;i<ok_2.length;i++) {
					let cur=ok_2[i];
					if(cur==="responseContext") continue;
					if(cur==="playabilityStatus") continue;
					if(cur==="streamingData") continue;
					if(cur==="playerAds") continue;
					if(cur==="playbackTracking") continue;
					if(cur==="videoDetails") continue;
					if(cur==="playerConfig") continue;
					if(cur==="storyboards") continue;
					if(cur==="microformat") continue;
					if(cur==="cards") continue;
					if(cur==="trackingParams") continue;
					if(cur==="attestation") continue;
					if(cur==="videoQualityPromoSupportedRenderers") continue;
					if(cur==="adPlacements") continue;
					if(cur==="frameworkUpdates") continue;
					if(cur==="captions") continue;
					if(cur==="endscreen") continue;
					if(cur==="paidContentOverlay") continue;
					debugger;
				}
			} break;
			case "shorts": {
				let ok_2=Object.keys(obj.playerResponse);
				for(let i=0;i<ok_2.length;i++) {
					let cur=ok_2[i];
					if(cur==="responseContext") continue;
					if(cur==="playabilityStatus") continue;
					if(cur==="streamingData") continue;
					if(cur==="playerAds") continue;
					if(cur==="playbackTracking") continue;
					if(cur==="videoDetails") continue;
					if(cur==="playerConfig") continue;
					if(cur==="storyboards") continue;
					if(cur==="microformat") continue;
					if(cur==="cards") continue;
					if(cur==="trackingParams") continue;
					if(cur==="attestation") continue;
					if(cur==="videoQualityPromoSupportedRenderers") continue;
					if(cur==="adPlacements") continue;
					if(cur==="frameworkUpdates") continue;
					if(cur==="captions") continue;
					debugger;
				};
			} break;
		}
		iter_skips.push("playerResponse");
	}
	if("url" in obj) {
		iter_skips.push("url");
		if(typeof obj.url!=="string") {
			debugger;
		}
	}
	if("clickTrackingParams" in obj) {
		iter_skips.push("clickTrackingParams");
	}
	if("reelWatchSequenceResponse" in obj) {
		iter_skips.push("reelWatchSequenceResponse");
	}
	if("expirationTime" in obj) {
		iter_skips.push("expirationTime");
	}
	if(!is_this_keys_ok) {
		console.log(ok_e);
		debugger;
	}
	random_sometimes_break_base_0(detail,obj,path,iter_skips,[0,1]);
	if("response" in obj) {
		return;
	} else {
		/** @type {{}} */
		let c=obj;
		if("endpoint" in c) {
			if(typeof c.endpoint=="object"&&c.endpoint!==null) {
				console.log(Object.keys(c.endpoint));
			} else {
				console.log("playerResponse",obj);
			}
		}
	}
}
/**
 * @arg {{ commandMetadata: { webCommandMetadata?: any; }; }} obj
 */
function on_command_meta(obj) {
	if(Object.keys(obj.commandMetadata).length!==1) {
		console.log("browseEndpoint_commandMetadata",obj.commandMetadata);
	} else {
		console.log("browse web cmd meta",obj.commandMetadata.webCommandMetadata);
	}
	if("webCommandMetadata" in obj.commandMetadata&&obj.commandMetadata.webCommandMetadata.webPageType!==void 0) {
		console.log("web_page_type",obj.commandMetadata.webCommandMetadata.webPageType);
	}
}
/**
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail["endpoint"]} obj
 * @arg {["detail","endpoint"]} path
 */
function random_sometimes_break_1(detail,obj,path) {
	let iter_skips=[];
	if("commandMetadata" in obj) {
		iter_skips.push("commandMetadata");
		on_command_meta(obj);
	}
	if("watchEndpoint" in obj) {
		iter_skips.push("watchEndpoint");
	}
	x: if("browseEndpoint" in obj) {
		iter_skips.push("browseEndpoint");
		if(Object.keys(obj).length!==3) {
			debugger;
		}
		if(obj.browseEndpoint.browseId==="FEwhat_to_watch") break x;
		if(obj.browseEndpoint.browseId==="FEsubscriptions") break x;
		console.log("obj_browseEndpoint",obj.browseEndpoint);
	}
	if("reelWatchEndpoint" in obj) {
		iter_skips.push("reelWatchEndpoint");
		console.log("obj_reelWatchEndpoint",obj.reelWatchEndpoint);
	}
	if("clickTrackingParams" in obj) {
		iter_skips.push("clickTrackingParams");
	}
	random_sometimes_break_base_0(detail,obj,path,iter_skips,[1,1]);
	if("browseEndpoint" in obj) {
		let bid=obj.browseEndpoint.browseId;
		let wpt=obj.commandMetadata.webCommandMetadata.webPageType;
		x: {
			if(wpt==="WEB_PAGE_TYPE_PLAYLIST") break x;
			if(wpt==="WEB_PAGE_TYPE_BROWSE") break x;
			if(wpt==="WEB_PAGE_TYPE_CHANNEL") break x;
			if(wpt==="WEB_PAGE_TYPE_SETTINGS") break x;
			debugger;
		}
		function browse_with_part() {
			let browse_part=bid.slice(2);
			let browse_section=bid.slice(0,2);
			console.log("show browse_section & browse_part",browse_section,browse_part);
		}
		/** @target_type @type {import("./support/yt_api/_abc/b/BrowseEndpointData.js").BrowseEndpointData}  */
		x: {
			if(bid.startsWith("FE")) {
				browse_with_part();
				break x;
			}
			if(bid.startsWith("VL")) {
				browse_with_part();
				break x;
			}
			if(bid.startsWith("SP")) {
				browse_with_part();
				break x;
			}
			if(bid.startsWith("UC")) {
				if(bid.length===24) break x;
				console.log('yt_chan_id length',bid.length);
			}
			debugger;
		}
	}
}

const random_factor=0.2;
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

/**
 * @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail['pageType']} pageType
 */
function page_type_iter(pageType) {
	switch(pageType) {
		case "browse": break;
		case "channel": break;
		case "playlist": break;
		case "shorts": break;
		case "watch": break;
		case "settings": break;
		default: debugger;
	}
}

/** @arg {import("./support/yt_api/yt/YTNavigateFinishEventDetail.js").YTNavigateFinishEventDetail} detail */
function on_page_type_changed(detail) {
	/** @type {(keyof typeof detail)[]} */
	let ok=any(Object.keys(detail));
	for(let x of ok) {
		switch(x) {
			case "response": random_sometimes_break_0(detail,detail[x],["detail",x]); continue;
			case "endpoint": random_sometimes_break_1(detail,detail[x],["detail",x]); continue;
			case "fromHistory": if(typeof detail[x]!=="boolean") {debugger;}; continue;
			case "navigationDoneMs": if(typeof detail[x]!=="number") {debugger;}; continue;
			case "pageType": if(typeof detail[x]!=="string") {debugger;}; continue;
			default:
				console.log('detail',x,detail[x]);
				debugger;
		}
	}
	page_type_iter(detail.pageType);
	if(last_page_type!==detail.pageType) {
		last_page_type=detail.pageType;
		let page_manager_current_tag_name=get_ytd_page_manager().getCurrentPage().tagName.toLowerCase();
		let nav_load_str=`page_type_change: {current_page: "${page_manager_current_tag_name}", pageType: "${detail.pageType}"}`;
		page_type_changes.push(nav_load_str);
		console.log(nav_load_str);
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
/**
 * @arg {string} css_content
 */
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

/**
 * @type {HTMLElement | null}
 */
let yt_playlist_manager=null;
/**
 * @arg {HTMLElement} element
 */
function on_yt_playlist_manager(element) {
	const element_id="yt-playlist-manager";
	if(yt_debug_enabled) console.log(`on ${element_id}`);
	element_map.set(element_id,element);
	yt_playlist_manager=element;
	window.yt_playlist_manager=element;
}

/**@arg {number} value @returns {ReturnType<typeof setTimeout>} */
function as_timeout_type(value) {
	/**@type {any} */
	let value_any=value;
	return value_any;
}

/**@type {[number, number][]}*/
let port_state_log=[];
class MessagePortState {
	/**@type {ReturnType<typeof setTimeout>} */
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
	if(yt_debug_enabled) console.log("msg_port:message %o",event.data);
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

/**@arg {Document|Element} node @arg {string} child_node_tag_name*/
function get_html_elements(node,child_node_tag_name) {
	return node.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",child_node_tag_name);
}


/**
 * @type {((event:{})=>void)[]}
 */
var on_yt_navigate=[];
async function wait_for_yt_player() {
	if(!ytd_player) {
		throw new Error("No ytd_player to await");
	}
	await ytd_player.playerResolver_.promise;
}
/**
 * @arg {HTMLElement} element
 */
function sumOffset(element) {
	let cache={
		top_offset: 0,
		left_offset: 0
	};
	/**@type {HTMLElement | null} */
	let cur_element=null;
	cur_element=element;
	for(;;) {
		cache.top_offset+=cur_element.offsetTop;
		cache.left_offset+=cur_element.offsetLeft;
		/**@type {Element|null}*/
		let next_element=cur_element.offsetParent;
		if(next_element instanceof HTMLElement) {
			cur_element=next_element;
		} else {
			break;
		}
	}
	return cache;
}

/**@return {HTMLDivElement} */
function createOverlayContent() {
	let element=document.createElement("div");
	element.style.userSelect="all";
	element.style.width="max-content";
	return element;
}

/**@type {HTMLDivElement}*/
let overlay_content_div=createOverlayContent();

let input_modify_css_style=document.createElement("div");
input_modify_css_style.style.float="left";
input_modify_css_style.innerHTML="C";
input_modify_css_style.onclick=ui_css_toggle_click_handler;


/**@type {HTMLDivElement}*/
let overlay_hide_ui_input=document.createElement("div");
overlay_hide_ui_input.style.float="left";
overlay_hide_ui_input.style.clear="left";
overlay_hide_ui_input.innerHTML="H";
overlay_hide_ui_input.onclick=title_display_toggle;

/**@returns {PluginOverlayElement} */
function createPluginOverlay() {
	let element=document.createElement("div");
	element.id="mz_overlay";
	element.append(overlay_content_div);
	element.append(input_modify_css_style);
	element.append(overlay_hide_ui_input);
	/**@type {any} */
	let any=element;
	any.onupdate=fix_offset;
	return any;
}

/**@type {PluginOverlayElement} */
let plugin_overlay_element=createPluginOverlay();
inject_api_yt.plugin_overlay_element=plugin_overlay_element;

function fix_offset() {
	if(!ytd_player) return;
	if(!plugin_overlay_element) return;
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
	plugin_overlay_element.onupdate();
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
/**@type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}}*/
function is_yt_fullscreen_change_action(detail) {
	return detail.actionName==="yt-fullscreen-change-action";
}
/**
 * @arg {CustomEvent<{actionName:"yt-fullscreen-change-action", args:[boolean]}>|CustomEvent<{actionName:string}>} event
 */
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
{
	/**@type {any} */
	let any_document=document;
	any_document.addEventListener("yt-action",on_yt_action);
}

function title_display_toggle() {
	title_on=!title_on;
	title_text_overlay_update();
	localStorage["title_save_data"]=JSON.stringify({value: title_on});
}
function update_ui_plugin() {
	if(yt_debug_enabled) console.log("update_ui_plugin");
	setTimeout(plugin_overlay_element.onupdate.bind(plugin_overlay_element));
}


class PluginOverlayElement extends HTMLDivElement {
	onupdate() {}
}

window.addEventListener("resize",function() {
	plugin_overlay_element&&plugin_overlay_element.onupdate();
});
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
	/**@type {(HTMLVideoElement | HTMLAudioElement)[]} */
	attached_element_list=[];
	/**
	 * @type {MediaElementAudioSourceNode[]}
	 */
	media_element_source_list=[];
	/**@type {Event|null}*/
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
	/**
	 * @arg {number} gain
	 */
	setGain(gain) {
		this.gain_node.gain.value=gain;
	}
	/**
	 * @arg {HTMLMediaElement[]} media_node_list
	 */
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

/**
 * @template {string} T
 * @template {{}} U
 * @template {import("./support/make/Split.js").Split<T, ",">} C
 * @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}}
 * @type {import("./support/make/__ia_excludeKeysS.js").__ia_excludeKeysS}
 */
Object.__ia_excludeKeysS=function(/** @type {{ [s: string]: any; } | ArrayLike<any>} */ target,/** @type {string} */ ex_keys_str) {
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
/** @typedef {import("./support/history/HistoryStateManagerI.js").HistoryStateManagerI} HistoryStateManagerI */
/** @typedef {import("./support/history/HistoryStateManagerEventMap.js").HistoryStateManagerEventMap} HistoryStateManagerEventMap */

/** @implements {HistoryStateManagerI} */
class HistoryStateManager extends EventTarget {
	debug=false;
	/** @type {{}|null} */
	cur_state;
	tmp_map=new Map;
	/** @type {string[]} */
	tmp_keys=[];
	is_replacing_custom_state=false;
	/**
	 * @override
	 * @template {string} K
	 * @arg {K} type
	 * @arg {K extends "update"?((this: HistoryStateManagerI, ev: HistoryStateManagerEventMap[K]) => any):EventListenerOrEventListenerObject} listener
	 * @arg {boolean | AddEventListenerOptions} [options]
	 * */
	addEventListener(type,listener,options) {
		super.addEventListener(type,listener,options);
	}
	/**
	 * @arg {{}|null} new_state
	 */
	do_state_update(new_state) {
		this.cur_state=new_state;
		this.dispatchEvent(new CustomEvent("update",{detail: this.cur_state}));
	}
	constructor() {
		super();
		let t=this;
		this.cur_state=this.getHistoryState();
		this.do_state_update(this.cur_state);
		if(this.debug) console.log("initial history state",this.cur_state);
		/**
		 * @arg {{}} obj
		 */
		function remove_yt_data(obj) {
			return Object.__ia_excludeKeysS(obj,"entryTime,endpoint,savedComponentState");
		}
		window.addEventListener("popstate",(event) => {
			/** @type {{[x: string]: {}}|null} */
			let prev_state=this.cur_state;
			/** @type {{[x: string]: {}}|null} */
			let new_state=this.historyStateFromEvent(event);
			let clone=structuredClone(new_state);
			if(prev_state&&new_state) {
				for(let i=0;i<t.tmp_keys.length;i++) {
					let cur_key=t.tmp_keys[i];
					if(prev_state[cur_key]!==void 0&&new_state[cur_key]===void 0) {
						new_state[cur_key]=prev_state[cur_key];
					}
				}
			}
			this.do_state_update(new_state);
			this.is_replacing_custom_state=true;
			history.replaceState(new_state,"");
			this.is_replacing_custom_state=false;
			console.log(clone,this.cur_state,prev_state);
		});
		History.prototype.pushState=new Proxy(History.prototype.pushState,{
			apply(target,thisArg,argArray) {
				let new_state=argArray[0];
				if(t.cur_state) {
					console.log('pushState: h_over_new_state cs=%o:[]',t.is_replacing_custom_state,remove_yt_data(new_state));
					console.log("pushState: h_over_old_state: []",remove_yt_data(t.cur_state));
				} else {
					console.log('pushState: h_over_beg_state: []',remove_yt_data(new_state),t.cur_state);
				}
				x: {
					if(t.is_replacing_custom_state) break x;
					/** @type {{[x: string]: {}}|null} */
					let prev_state=t.cur_state;
					if(prev_state) {
						for(let i=0;i<t.tmp_keys.length;i++) {
							let cur_key=t.tmp_keys[i];
							if(prev_state[cur_key]!==void 0) {
								new_state[cur_key]=prev_state[cur_key];
							}
						}
					}
					console.log("replaceState: h_over_after_rep: []",remove_yt_data(argArray[0]),argArray.length);
				}
				t.do_state_update(new_state);
				return Reflect.apply(target,thisArg,argArray);
			}
		});
		History.prototype.replaceState=new Proxy(History.prototype.replaceState,{
			apply(target,thisArg,argArray) {
				let new_state=argArray[0];
				if(t.cur_state) {
					console.log('replaceState: h_over_new_state cs=%o:[]',t.is_replacing_custom_state,remove_yt_data(new_state));
					console.log("replaceState: h_over_old_state: []",remove_yt_data(t.cur_state));
				} else {
					console.log('replaceState: h_over_beg_state: []',remove_yt_data(new_state),t.cur_state);
				}
				x: {
					if(t.is_replacing_custom_state) break x;
					/** @type {{[x: string]: {}}|null} */
					let prev_state=t.cur_state;
					if(prev_state) {
						for(let i=0;i<t.tmp_keys.length;i++) {
							let cur_key=t.tmp_keys[i];
							if(prev_state[cur_key]!==void 0) {
								new_state[cur_key]=prev_state[cur_key];
							}
						}
					}
					console.log("replaceState: h_over_after_rep: []",remove_yt_data(argArray[0]),argArray.length);
				}
				t.do_state_update(new_state);
				return Reflect.apply(target,thisArg,argArray);
			}
		});
		let xx=Object.getOwnPropertyDescriptor(History.prototype,"state");
		if(!xx) throw 1;
		if(!xx.get) throw 1;
		let hist_state_getter=xx.get;
		Object.defineProperty(History.prototype,"state",{
			"configurable": true,
			"enumerable": true,
			"get": function() {
				return hist_state_getter.call(this);
			}
		});
	}
	/** @arg {PopStateEvent} event */
	historyStateFromEvent(event) {
		/** @type {{}|null} */
		let v=event.state;
		return v;
	}
	/** @template {string} T @arg {T} key */
	getCacheValue(key) {
		if(typeof this.cur_state=="object"&&this.cur_state!==null) {
			if(key in this.cur_state) {
				let {[key]: value}=this.cur_state;
				return value;
			}
		}
		return null;
	}
	/** @returns {{}|null} */
	getHistoryState() {
		return history.state;
	}
	/** @arg {string} key  @arg {{}} value */
	setCacheValue(key,value) {
		this.is_replacing_custom_state=true;
		x: if(typeof this.cur_state==="object"&&this.cur_state!==null) {
			/** @type {{[U in typeof key]?: {}}} */
			let state=this.cur_state;
			if(!this.tmp_keys.includes(key)) this.tmp_keys.push(key);
			if(key in state&&state[key]===value) {
				break x;
			}
			history.replaceState({...state,[key]: value},"");
		} else {
			history.replaceState({[key]: value},"");
		}
		this.is_replacing_custom_state=false;
	}
}
let history_state_manager=new HistoryStateManager();

let volume_plugin_style_element=createStyleElement(volume_plugin_style_source);

function main() {
	start_message_channel_loop();
}
main();

let __res_ia_eks=Object.__ia_excludeKeysS({a: 4,test: 3,b: 1},"test,a,b");
/** @type {{}} */
let __eks_eo=__res_ia_eks;
__eks_eo;

function get_exports() {
	return exports;
}

if(typeof exports==="object") {
	let exports=get_exports();
	exports.SavedData=SavedData;
	exports.Gn=Gn;
}

/**
 * @returns {import("./support/yt_api/_abc/UrlTypes").UrlTypes}
 * @param {{}} state
 * @param {"account"} base
 * @param {string[]} parts
 * @param {number} index
 */
function get_account_type(state,base,parts,index) {
	let cur_part=parts[index];
	switch(cur_part) {
		case "account_menu": break;
		default: no_handler({...state,parts,index});
	}
	return `${base}.${cur_part}`;
}
/** @arg {{parts: string[];index:number}} obj @returns {never} */
function no_handler({parts,index}) {
	console.log('no handler for',parts,parts[index]);
	debugger;
	throw new Error("Stop");
}
