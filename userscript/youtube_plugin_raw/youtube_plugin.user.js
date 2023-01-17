// ==UserScript==
// @name	youtube plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.2.18
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
// #region
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
function with_ytd_scope() {
	dom_observer.addEventListener("plugin-activate",yt_watch_page_loaded_handler);
	dom_observer.addEventListener("async-plugin-init",plugin_init);
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
	debug=false;
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
		if(this.debug) console.log("run handler richGridRenderer");
		if(renderer.masthead) {
			if(renderer.masthead.videoMastheadAdV3Renderer) {
				let {videoMastheadAdV3Renderer: _,...masthead}=renderer.masthead;
				/** @private @type {{masthead: {}}&Omit<typeof renderer,"masthead">} */
				let no_ad_renderer=renderer;
				console.log("masthead",masthead);
				no_ad_renderer.masthead=masthead;
			}
		}
		if(renderer.contents) {
			if(this.debug) console.log("on_contents",path);
			let filtered=this.rendererContentItemArray.replace_array(renderer.contents);
			if(filtered.length>0) {
				renderer.contents=filtered;
			}
		}
	}
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
		let decoded=this.decode(input,byte_arr);
		if(!decoded) return null;
		return byte_arr;
	}
	/** @public @arg {string} input */
	decode_str(input) {
		let y=this.decodeByteArray(input);
		if(!y) return null;
		return decoder.decode(y);
	}
	/** @private @arg {string} input @arg {Uint8Array} binary_arr */
	decode(input,binary_arr) {
		var byte_len=(input.length/4)*3|0;
		var chr1,chr2,chr3;
		var enc1,enc2,enc3,enc4;
		var i=0;
		var j=0;

		let prev_len=input.length;
		let new_input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
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
		/** @private @type {DataArrType} */
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
	/** @private @template T @arg {number} pos @arg {()=>T} x */
	revert_to(pos,x) {
		let prev_pos=this.pos;
		this.pos=pos;
		let ret=x();
		this.pos=prev_pos;
		return ret;
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
	/** @returns {[number,number]} */
	read_field_description() {
		let cur_byte=this.uint32();
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
				/** @private @type {[boolean,bigint,number]} */
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
					first_num.push(["error",fieldId]);
					break;
				}
				let [success_64,num64,new_pos]=revert_res;
				if(success_64&&num32===null) {
					first_num.push(["data64",fieldId,num64]);
					this.pos=new_pos;
				} else if(num32===null) {
					this.failed=true;
					first_num.push(["error",fieldId]);
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
					first_num.push(["error",fieldId]);
					this.failed=true;
					break;
				}
				let sub_buffer=this.buf.subarray(this.pos,this.pos+size);
				try {
					this.skip(size);
				} catch {
					console.log("skip failed at",this.pos,fieldId);
					first_num.push(["error",fieldId]);
					this.failed=true;
				}
				first_num.push(["child",fieldId,sub_buffer]);
			} break;
			case 3: {
				let res;
				while((wireType=(res=this.uint32())&7)!==4) {
					let skip_res=this.skipTypeEx(res>>>3,wireType);
					first_num.push(["group",fieldId,skip_res]);
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
const base64_dec=new Base64Binary();
/** @private @type {any[]} */
let blob_create_args_arr=[];
let leftover_args=[];
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
	/** @private @arg {MessagePort} port @arg {number} count */
	next_tick_action(port,count) {
		if(this.trace) console.log("tick_trace",count);
		port.postMessage(count);
	}
}
let dom_observer=new DomObserver;
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

with_ytd_scope();

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
//#region
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn) {
	if(typeof exports==="object") {
		fn(exports);
	}
}
function main() {
	const log_enabled_page_type_change=false;
	/** @private @type {ResolverT<Services,ServiceOptions>} */
	const resolver_value={value: null};
	const services=new Services(resolver_value);
	const yt_handlers=services.yt_handlers;
	const log_tracking_params=false;
	const log_click_tracking_params=false;

	// init section
	const service_resolver=new ServiceResolver(services,{
		log_tracking_params,
		log_click_tracking_params,
		noisy_logging: false,
	});
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
	/** @private @type {typeof fetch|null} */
	let original_fetch=null;
	fetch_inject.__proxy_target__=window.fetch;
	modify_global_env();

	// wait for plugin requirements
	start_message_channel_loop(services.handle_types);
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
	/** @private @arg {[()=>BrowsePageResponse, object, []]} apply_args */
	function do_proxy_call_getInitialData(apply_args) {
		return yt_handlers.on_initial_data(apply_args);
	}
	function modify_global_env() {
		URL.createObjectURL=new Proxy(URL.createObjectURL,{
			/** @private @arg {typeof URL["createObjectURL"]} target @arg {typeof URL} thisArg @arg {[Blob|MediaSource]} args */
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
			/** @private @arg {typeof URL["revokeObjectURL"]} target @arg {typeof URL} thisArg @arg {[string]} args */
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
	// #endregion
}
//#endregion
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {Split<X,string extends S?",":S>} */
function split_string(x,s=as(",")) {
	if(!x) {debugger;}
	let r=x.split(s);
	return as(r);
}
/** @private @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
function join_string(x,s) {
	if(!x) {debugger;}
	let r=x.join(s);
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
// #region Service
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
		if(ret&&"actions" in x) debugger;
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
		const {
			seen_root_visual_elements,seen_strings,seen_booleans,
			seen_numbers,
		}=x;
		if(seen_root_visual_elements) {
			this.#seen_root_visual_elements=seen_root_visual_elements;
		}
		if(seen_strings) {
			this.#seen_strings=seen_strings;
		}
		if(seen_booleans) {
			this.#seen_booleans=seen_booleans;
		}
		if(seen_numbers) {
			this.#seen_numbers=seen_numbers;
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
				let {bitmap,index_map}=this.generate_bitmap(bitmap_src);
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
			let {bitmap,index_map}=this.generate_bitmap(bitmap_src);
			console.log(` --------- [${k}] --------- `);
			console.log(index_map.join(","));
			console.log(bitmap);
		}
	}
	/** @arg {string[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let index_map=[...new Set([...bitmap_src.map(e => e.split(",")).flat()])];
		let bitmap="\n"+bitmap_src.map(e => e.split(",").map(e => index_map.indexOf(e))).map(e => {
			let ta=new Array(index_map.length).fill(0);
			for(let x of e) ta[x]=1;
			return ta.join("");
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		return {
			index_map,
			bitmap
		};
	}
	/** @type {[string,number|number[]][]} */
	#new_numbers=[];
	/** @public @arg {string} key @arg {number|number[]} x */
	save_number(key,x) {
		if(x===void 0) {debugger; return;}
		let was_known=true;
		/** @private @type {["one", number[]]|["many",number[][]]} */
		let cur;
		let p=this.#seen_numbers.find(e => e[0]===key);
		if(!p) {
			cur=["one",[]];
			p=[key,cur];
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
		this.#new_numbers.push([key,x]);
		this.#onDataChange();
		console.log("store_num [%s]",key,x);
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
class BaseServicePrivate extends ApiBase {
	// #region Public
	/** @arg {ResolverT<Services,ServiceOptions>} x */
	constructor(x) {
		super();
		this.#x=x;
		this.ds=data_saver;
	}
	get x() {
		if(!this.#x.value) throw new Error();
		return this.#x.value;
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
	// #endregion
	log_skipped_strings=false;
	#x;
}
class BaseService extends BaseServicePrivate {
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
	/** @public @arg {string} x */
	trackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @public @arg {string} x */
	clickTrackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @public @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,`${string}${U}`>} */
	str_ends_with(x,v) {
		return x.endsWith(v);
	}
	/** @public @template {string} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,`${U}${string}`>} */
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
	/** @public @template {string} T @template {string} Sep @template {`${T[0]}-${string}`} U @arg {T} enum_base @arg {U} enum_str @arg {Sep} sep */
	save_enum_with_sep(enum_base,enum_str,sep) {
		const ns_name="ELEMENT";
		debugger;
		let n1=split_string_once(enum_str,enum_base);
		if(!n1[1]) throw new Error();
		let n2=this.drop_separator(n1[1],sep);
		if(!n2) throw new Error();
		this.save_string(`[${ns_name}::${enum_base}]`,n2[0]);
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {SplitOnce<T,U>[number]|null} */
	drop_separator(x,sep) {
		let v=split_string_once(x,sep);
		if(v[0]) return v[0];
		return v[1]??null;
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
	/** @public @template {{}} U @arg {U[]} x @arg {(this:this,x:U,i:number)=>void} f  */
	z(x,f) {
		if(x===void 0) {debugger; return;}
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			f.call(this,a,i);
		}
	}
	/** @protected @template {{}} T @arg {{} extends T?MaybeKeysArray<T> extends []?T:never:never} x */
	g(x) {
		if(!x) {debugger; return;}
		let keys=this.get_keys_of(x);
		if(!keys.length) return;
		console.log("[empty_object] [%s]",keys.join());
		debugger;
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
		return this.x.get("parser_service").get_url_type(path_parts);
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
				/** @type {PlayerResponse} */
				data: as(x),
			};
			case "search": return {
				type: target[0],
				/** @type {SearchApiResponse} */
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
				/** @private @type {ReelWatchSequenceResponse} */
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
				/** @private @type {GetLiveChatReplayResponse} */
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
			let url_h=as(join_string(split_string(ss2,"/"),"."));
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
class HandleRendererContentItemArray extends BaseService {
	debug=false;
	/** @private @arg {RichItemRenderer} content_item */
	filter_for_rich_item_renderer(content_item) {
		let debug_flag_value=this.x.get_param("noisy_logging");
		let renderer=content_item.richItemRenderer;
		console.assert(renderer.content!=void 0,"richItemRenderer has content");
		if("adSlotRenderer" in renderer.content) {
			if(debug_flag_value) console.log("adSlotRenderer=",renderer.content.adSlotRenderer);
			return false;
		}
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
class CsiService extends BaseService {
	data={
		/** @private @type {BrowseEndpointPages|null} */
		yt_fn: null,
		/** @private @type {CsiServiceC["value"]|null} */
		c: null,
		/** @private @type {CsiVarTypes["cver"]|null} */
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
		if(!this.str_ends_with(param.key,"_rid")) {
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
	/** @arg {CsiServiceParamsType} params */
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
class ECatcherService extends BaseService {
	data={
		/** @private @type {{name:ECatcherClientName['value'];fexp:number[];version:SomeVer<CsiVarTypes["cver"]>}|null} */
		client: null,
		expected_client_values: {
			/** @private @type {number[]} */
			fexp: [
				[1714247],
				[9405964],
				[23804281,23882502,23918597,23934970,23946420,23966208,23983296,23986033,23998056],
				[24002022,24002025,24004644,24007246,24034168,24036947,24059444,24059508,24077241,24080738],
				[24108447],
				[24120820,24124511,24128088],
				[24135310],
				[24140247],
				[24161116,24162919,24164186,24166867,24169501],
				[24181174,24187043,24187377],
				[24197450],
				[24200839],
				[24211178,24217535,24219381,24219713],
				[24241378,24248091],
				[24250324,24255163,24255543,24255545],
				[24260378,24262346,24263796,24267564,24268142],
				[24279196],
				[24281896,24283015,24283093,24287604,24288442,24288663],
				[24290971,24291857,24292955],
				[24390675,24396645],
				[24401504,24402891,24404640,24406313,24406621,24407190,24408888],
				[24414718,24415864,24415866,24416290],
				[24422508,24424806,24426636,24429095],
				[24432597,24433679,24434209,24436009,24437575,24438162,24438848,24439361,24439483],
				[24440901,24440903,24441244,24442137,24443373,24447336,24448074,24448246],
				[24450571,24451033,24453129,24453874],
				[24590921,24591046,24591048],
				[24612269,24613467,24613789,24614043,24615363,24615479,24615664,24615733],
				[39321826,39321827],
				[39322504,39322574,39322870,39322873,39322980,39322983],
				[39323013,39323016,39323020,39323023,39323117,39323120],
				[45686551],
				[],
			].flat()
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
	/** @public @arg {ECatcherServiceParams["params"]} params */
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
	/** @private @arg {Extract<ToServiceParams<GFeedbackVarMap>[number],{key:"e"}>} param */
	parse_e_param(param) {
		return param.value.split(",").map(e => parseInt(e,10));
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
		let parsed_e=null;
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.x.get("parser_service").parse_browse_id(param.value); break;
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
	/** @private @arg {GFeedbackServiceRouteParam} x */
	parse_route_param(x) {
		let h=this.x.get("parser_service");
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
		this.x.get("e_catcher_service").iterate_fexp(this.data.e);
	}
}
class GuidedHelpService extends BaseService {
	data={
		/** @private @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @public @arg {GuidedHelpServiceParams["params"]} params */
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
	/** @private @arg {CsiServiceParams} service */
	on_csi_service(service) {
		this.x.get("csi_service").on_params(service.params);
	}
	/** @private @arg {ECatcherServiceParams} service */
	on_e_catcher_service(service) {
		this.x.get("e_catcher_service").on_params(service.params);
	}
	/** @private @arg {GFeedbackServiceParams} service */
	on_g_feedback_service(service) {
		this.x.get("g_feedback_service").on_params(service.params);
	}
	/** @private @arg {GuidedHelpServiceParams} service */
	on_guided_help_service(service) {
		this.x.get("guided_help_service").on_params(service.params);
	}
	get handle_types() {
		return this.x.get("handle_types");
	}
	/** @private @arg {GoogleHelpServiceParams} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.x.get("parser_service").parse_browse_id(param.value); break;
				default: console.log("[new_param_key]",param); debugger;
			}
		}
	}
	/** @public @arg {AllServiceTrackingParams} service_arg */
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
	}
}
//#endregion Service
//#region decode_entity_key
const decoder=new TextDecoder();
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
class IndexedDbAccessor extends BaseService {
	/** @public @arg {ResolverT<Services, ServiceOptions>} x @arg {string} db_name */
	constructor(x,db_name,version=1) {
		super(x);
		this.db_args={
			name: db_name,
			version,
		};
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
class CodegenService extends BaseService {
	/** @arg {{}} x2 */
	#is_Thumbnail(x2) {
		return "thumbnails" in x2&&x2.thumbnails instanceof Array&&"url" in x2.thumbnails[0]&&typeof x2.thumbnails[0].url==="string";
	}
	/** @arg {{}} x2 */
	#is_TextT(x2) {
		return typeof x2=="object"&&("simpleText" in x2||("runs" in x2&&x2.runs instanceof Array));
	}
	/** @arg {{}} x */
	is_ResponseContext(x) {
		x;
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
			if(k=="responseContext") {console.log("responseContext",x); continue;}
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
			if(this.#is_TextT(x2)) {ret_arr.push(`this.text_t(x.${k});`); continue;};
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
				let ic=this.#uppercase_first(c);
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
			let ic=this.#uppercase_first(c);
			console.log("array key",c);
			ret_arr.push(`this.z(x.${k},this.${ic});`);
		}
		x;
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
		let t_name=this.#uppercase_first(k);
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
	/** @arg {string} x */
	#uppercase_first(x) {
		return x[0].toUpperCase()+x.slice(1);
	}
	/** @public @arg {unknown} x @arg {string|null} r @arg {boolean} [ret_val] @returns {string|null|void} */
	generate_typedef(x,r,ret_val) {
		let cg=this.#generate_typedef(x,r);
		if(ret_val) return cg;
		console.log(cg);
	}
	/** @arg {unknown} x @arg {string|null} r */
	#generate_typedef(x,r=null) {
		let k=this.get_name_from_keys(x);
		if(k===null) return null;
		let tn=k;
		if(r) {
			tn=r;
		}
		if(x===null) return;
		if(x===void 0) return;
		tn=this.#uppercase_first(tn);
		let obj_count=0;
		/** @private @type {{[x: number|string]:{}}} */
		let xa=as(x);
		let o2=xa[k];
		let keys=Object.keys(x).concat(Object.keys(o2));
		const max_str_len=40;
		let tc=JSON.stringify(x,(k1,o) => {
			if(k1==="") return o;
			if(typeof o==="string") {
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
			if(typeof o==="number") return o;
			if(typeof o==="boolean") return o;
			if(typeof o!=="object") throw new Error("handle typeof "+typeof o);
			if(o.runs&&o.runs instanceof Array) return "TYPE::TextWithRuns";
			if(o.simpleText&&typeof o.simpleText==="string") return "TYPE::SimpleText";
			if(o.thumbnails&&o.thumbnails instanceof Array) return "TYPE::Thumbnail";
			if(o.iconType&&typeof o.iconType==="string") return `TYPE::Icon<"${o.iconType}">`;
			if(o.twoColumnWatchNextResults) return `TYPE::TwoColumnWatchNextResults`;
			if(o.browseEndpoint) return `TYPE::BrowseEndpoint`;
			if(o.watchEndpoint) return `TYPE::WatchEndpoint`;
			if(o.signalServiceEndpoint) return `TYPE::SignalServiceEndpoint`;
			if(o.playerOverlayRenderer) return `TYPE::PlayerOverlayRenderer`;
			if(o.desktopTopbarRenderer) return "TYPE::DesktopTopbarRenderer";
			if(o.engagementPanelSectionListRenderer) return "TYPE::EngagementPanelSectionListRenderer";
			if(o.cinematicContainerRenderer) return "TYPE::CinematicContainerRenderer";
			if(o.playlistPanelVideoRenderer) return "TYPE::PlaylistPanelVideoRenderer";
			if(k1==="responseContext") return "TYPE::ResponseContext";
			if(k1==="frameworkUpdates") return "TYPE::FrameworkUpdates";
			if(keys.includes(k1)) {
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
		/** @private @arg {string} s @arg {RegExp} rx @arg {(s:string,v:string)=>string} fn */
		function replace_until_same(s,rx,fn) {
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
		tc=replace_until_same(tc,/\[\s+{([^\[\]]*)}\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).join("\n");
			return `{${vi}}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(/\[\s+([^\[\]]*)\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).filter(e => e).join("\n");
			return `${vi}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(":ARRAY_TAG","[]");
		tc=tc.replaceAll(/"TYPE::(.+)"/gm,(_a,x) => {
			return x.replaceAll("\\\"","\"");
		});
		tc=tc.replaceAll(",",";");
		tc=tc.replaceAll(/[^[{;]$/gm,a => `${a};`);
		let ret;
		if(typeof tn==="number") {
			ret=`\ntype ArrayType_${tn}=${tc}\n`;
		} else {
			ret=`\ntype ${tn}=${tc}\n`;
		}
		return ret;
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
	/** @public @arg {{}} x @arg {string|null} r */
	use_generated_members(x,r=null) {
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
class ParserService extends BaseService {
	log_playlist_parse=false;
	/** @public @arg {PlaylistId} x */
	parse_playlist_id(x) {
		if(x===void 0) {debugger; return;}
		x: {
			switch(x) {
				case "WL": {
					console.log("[parse_playlist_static]",x);
				} break;
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
			case "youtubei": return this.parse_youtubei_api_url(x);
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
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,["youtubei",...any]>} x */
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
	/** @private @arg {Extract<SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url(x) {
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
					this.on_player_params(res[1]);
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
	/** @private @arg {string} x */
	on_player_params(x) {
		let pp_value=x;
		let pp_dec=decodeURIComponent(pp_value);
		if(this.cache_player_params.includes(pp_value)) return;
		this.cache_player_params.push(pp_value);
		let res_e=this.decode_b64_proto_obj(pp_dec);
		if(!res_e) {
			debugger;
			return;
		}
		/** @private @type {Map<number,number>} */
		let param_map=new Map();
		for(let param of res_e) {
			switch(param[0]) {
				case "data32": param_map.set(param[1],param[2]); break;
				default: debugger; break;
			}
		}
		let map_keys=[...param_map.keys()];
		if(this.eq_keys(map_keys,[8,9])) {
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
	/** @private @type {string[]} */
	cache_playlist_index=[];
	/** @private @type {string[]} */
	cache_playlist_id=[];
	/** @private @type {string[]} */
	cache_player_params=[];
	/** @private @arg {Extract<YtUrlFormat,`https://${string}`>} x */
	parse_full_url(x) {
		let r=this.parse_with_url_parse(x);
		switch(r.host) {
			case "ad.doubleclick.net": return;
			case "www.googleadservices.com": return;
			case "www.youtube.com": {
				this.parse_url(`${r.pathname}${r.search}`);
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
	/** @public @arg {YtUrlFormat} x */
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
	/** @private @arg {ParseUrlStr_1} x */
	parse_url_1(x) {
		let v=split_string_once(x,"/");
		switch(v.length) {
			case 1: this.parse_url_2(v[0]); break;
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
	/** @private @arg {ParseUrlWithSearchIn} x */
	parse_url_with_search(x) {
		let a=split_string(x,"?");
		switch(a[0]) {
			case "playlist": this.parse_playlist_page_url(a[1]); break;
			case "watch": this.parse_watch_page_url(a[1]); break;
		}
	}
	log_channel_handles=false;
	/** @private @type {YtUrlFormat} */
	/** @private @arg {Extract<SplitOnce<ParseUrlStr_1,"/">,[any]>[0]} x */
	parse_url_2(x) {
		if(this.str_is_search(x)) return this.parse_url_with_search(x);
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
	/** @public @arg {YtTargetIdType} x */
	parse_target_id(x) {
		if(this.str_starts_with(x,"browse-feed")) {
			return this.save_enum_with_sep("browse-feed",x,"");
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
			case "browse": break;
			case "feedback": break;
			case "get_transcript": break;
			case "guide": break;
			case "next": break;
			case "player": break;
			default: this.api_no_handler(x,x[2]);
		}
		return x[2];
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei",...string[]]>} x */
	get_yt_url_type(x) {
		if(x[1]!=="v1") {
			return this.api_no_handler(x,x[1]);
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
			case "search": return this.get_search_type(x);
		}
		switch(x.length) {
			case 3: return this.get_yt_url_type_3(x);
			default: console.log("[get_yt_url.url_type_new_length]",x); debugger; return null;
		}
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","search",...string[]]>} x */
	get_search_type(x) {
		if(x.length!==3) debugger;
		return x[2];
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","music",...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","share",...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","playlist",...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","browse",...string[]]>} x */
	get_browse_type(x) {
		if(x.length===3) return "browse";
		switch(x[3]) {
			case "edit_playlist": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","subscription",string,...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","reel",string,...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","notification",string,...string[]]>} x */
	get_notification_type(x) {
		switch(x[3]) {
			case "get_unseen_count": break;
			case "get_notification_menu": break;
			case "record_interactions": break;
			case "modify_channel_preference": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","comment",string,...string[]]>} x */
	get_comment_type(x) {
		switch(x[3]) {
			case "create_comment": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","att",string,...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","like",string,...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","account",string,...string[]]>} x */
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
	/** @private @arg {Extract<Split<ApiUrlFormat,"/">,["youtubei","v1","live_chat",...string[]]>} x */
	get_live_chat_type(x) {
		switch(x[3]) {
			case "get_live_chat_replay": break;
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
			case "": return true;
			default:
		}
		switch(x) {default: debugger; return false;}
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
	/** @public @arg {unknown} x @arg {string|null} r */
	generate_typedef_and_depth(x,r) {
		let gen=this.x.generate_typedef(x,r,true);
		if(!gen) return;
		this.str_arr.push(gen);
		let gd=this.x.generate_depth(gen);
		if(!gd) return;
		this.out_arr.push(gd);
	}
}
//#region HandleTypes
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
	/** @arg {PlaylistId} x */
	playlistId(x) {
		this.x.get("parser_service").parse_playlist_id(x);
	}
	/** @public @arg {keyof VEMap} x */
	on_root_visual_element(x) {
		this.ds.save_root_visual_element(x);
		/** @private @type {`${typeof x}`} */
		let ss=`${x}`;
		switch(ss) {
			case "3611": break;
			case "3832": break;
			case "3854": break;
			case "6827": break;
			case "11487": break;
			case "23462": break;
			case "83769": break;
			case "96368": break;
			default: debugger;
		}
	}
	/** @arg {BrowseIdType} x */
	browseId(x) {
		this.x.get("parser_service").parse_browse_id(x);
	}
	/** @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {
		if(!this.str_starts_with(x,"/@")) debugger;
	}
}
class HandleTypes extends ServiceMethods {
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
		const cf="WatchPageResponse";
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=x; this.g(y);
		this.WatchEndpoint(endpoint);
		this.WatchResponse(response);
		this.PlayerResponse(playerResponse);
		let wp_params=this.parse_watch_page_url_generic(url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @arg {VE3832_WatchPageResponse} x */
	VE3832_WatchPageResponse(x) {
		const cf="WatchPageResponse";
		const {rootVe,url,endpoint,page: {},preconnect,playerResponse,response,...y}=x; this.g(y);
		if(rootVe!==3832) debugger;
		let wp_params=this.parse_watch_page_url_3832(url);
		this.save_keys(`[VE3832.${cf}.wp_params]`,wp_params);
		this.WatchEndpoint(endpoint);
		if(preconnect.length!==1) debugger;
		this.parse_preconnect_url(preconnect[0]);
		this.PlayerResponse(playerResponse);
		this.WatchResponse(response);
	}
	/** @arg {VE3832_PreconnectUrl} x */
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
		/** @typedef {SplitIntoGroups<typeof ss4,`${string}`>[0]} StartPart */
		/** @type {StartPart} */
		let ss5=as(ss4.slice(0,2));
		console.log("google video rr [%s] sn-nx [%s]",ss3,ss4);
		if(ss5!=="57") debugger;
	}
	/** @arg {VE3832_WatchPageUrl} x */
	parse_watch_page_url_3832(x) {
		let u1=split_string_once(x,"/")[1];
		let u2=split_string_once(u1,"?")[1];
		let u3=this.parse_url_search_params(u2);
		let u4=this.get_keys_of(u3);
		x: {
			if(this.eq_keys(u4,["v"])) break x;
			if(this.eq_keys(u4,["v","t"])) break x;
			debugger;
		}
		this.x.get("parser_service").parse_url(x);
		return u3;
	}
	/** @arg {GenericWatchPageUrl} x */
	parse_watch_page_url_generic(x) {
		let u1=split_string_once(x,"/")[1];
		let u2=split_string_once(u1,"?")[1];
		let u3=this.parse_url_search_params(u2);
		let u4=this.get_keys_of(u3);
		x: {
			if(this.eq_keys(u4,["v","t"])) break x;
			if(this.eq_keys(u4,["v","list","start_radio"])) break x;
			if(this.eq_keys(u4,["v","list","index"])) break x;
			debugger;
		}
		this.x.get("parser_service").parse_url(x);
		return u3;
	}
	/** @arg {WatchResponse} x */
	WatchResponse(x) {
		this.save_keys("[WatchResponse]",x);
		this.x.get("yt_plugin").add_function({
			name: "data",
			data: {
				WatchResponse: x,
			},
		});
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=x; this.g(y);
		this.ResponseContext(responseContext);
		this.TwoColumnWatchNextResults(contents);
	}
	/** @arg {ChannelPageResponse} x */
	ChannelPageResponse(x) {
		this.save_keys("[ChannelPageResponse]",x);
	}
	/** @arg {PlaylistPageResponse} x */
	PlaylistPageResponse(x) {
		this.save_keys("[PlaylistPageResponse]",x);
	}
	/** @arg {SettingsPageResponse} x */
	SettingsPageResponse(x) {
		this.save_keys("[SettingsPageResponse]",x);
	}
	/** @arg {ShortsPageResponse} x */
	ShortsPageResponse(x) {
		this.save_keys("[ShortsResponse]",x);
	}
	/** @arg {SearchPageResponse} x */
	SearchPageResponse(x) {
		this.save_keys("[GetNotificationMenuJson]",x);
	}
	/** @arg {BrowseEditPlaylistResponse} x */
	BrowseEditPlaylistResponse(x) {
		const cf="BrowseEditPlaylistResponse";
		this.save_keys(`[${cf}]`,x);
		this.z(x.actions,a => this.x.get("handle_types").Action(a));
	}
	log_url=false;
	/** @arg {BrowsePageResponse} x */
	BrowsePageResponse(x) {
		const cf="BrowsePageResponse";
		this.save_keys(`[${cf}]`,x);
		const {rootVe,url,endpoint,page,response,expirationTime,previousCsn,...y}=x; this.g(y);
		if(rootVe) this.save_number("[BrowsePageResponse.rootVe]",rootVe);
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.BrowseEndpoint(x.endpoint);
		if(page!=="browse") debugger;
		this.BrowseResponse(response);
		if(expirationTime) this.primitive_of(expirationTime,"number");
		if(previousCsn!==void 0) this.previousCsn(previousCsn);
	}
	/** @arg {string} x */
	previousCsn(x) {
		console.log(base64_dec.decode_str(x));
	}
	/** @arg {ResponseContext} x */
	ResponseContext(x) {
		this.save_keys("[ResponseContext]",x);
		const service_tracking=this.x.get("service_tracking");
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=x; this.g(y);
		if(mainAppWebResponseContext) this.MainAppWebResponseContext(mainAppWebResponseContext);
		this.z(serviceTrackingParams,a => service_tracking.set_service_params(a));
		if(webResponseContextExtensionData) this.WebResponseContextExtensionData(webResponseContextExtensionData);
		if(consistencyTokenJar) this.ConsistencyTokenJar(consistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.primitive_of(maxAgeSeconds,"number");
		if(stateTags) this.RelevantStateTags(stateTags);
	}
	/** @arg {RelevantStateTags} x */
	RelevantStateTags(x) {
		const cf="RelevantStateTags";
		this.save_keys(`[${cf}]`,x);
		const {relevantStateTags,...y}=x; this.g(y);
	}
	/** @arg {ConsistencyTokenJar} x */
	ConsistencyTokenJar(x) {
		const cf="ConsistencyTokenJar";
		this.save_keys(`[${cf}]`,x);
		const {encryptedTokenJarContents,expirationSeconds,...y}=x; this.g(y);
	}
	/** @arg {WebResponseContextExtensionData} x */
	WebResponseContextExtensionData(x) {
		const cf="WebResponseContextExtensionData";
		this.save_keys(`[${cf}]`,x);
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=x; this.g(y);
		if(hasDecorated!==void 0) this.primitive_of(hasDecorated,"boolean");
		if(ytConfigData) this.YtConfigData(ytConfigData);
		if(webPrefetchData) this.WebPrefetchData(webPrefetchData);
	}
	/** @arg {YtConfigData} x */
	YtConfigData(x) {
		this.save_keys("[YtConfigData]",x);
		const {visitorData,sessionIndex,rootVisualElementType,...y}=x; this.g(y);
		this.primitive_of(visitorData,"string");
		if(sessionIndex!==0) debugger;
		/** @type {`${typeof rootVisualElementType}`} */
		let s=`${rootVisualElementType}`;
		switch(s) {
			case "3832": break;
			case "3854": break;
			case "4724": break;
			case "5754": break;
			case "6827": break;
			case "23462": break;
			case "96368": break;
			default: debugger; break;
		}
	}
	/** @arg {WebPrefetchData} x */
	WebPrefetchData(x) {
		this.save_keys("[WebPrefetchData]",x);
		const {navigationEndpoints,...y}=x; this.g(y);
		this.z(navigationEndpoints,a => {
			if("watchEndpoint" in a) {
				return this.WatchEndpoint(a);
			}
			debugger;
		});
	}
	/** @arg {MainAppWebResponseContext} x */
	MainAppWebResponseContext(x) {
		this.save_keys("[MainAppWebResponseContext]",x);
		const {datasyncId,loggedOut,...y}=x; this.g(y);
		this.primitive_of(datasyncId,"string");
		this.primitive_of(loggedOut,"boolean");
	}
	/** @arg {BrowseResponse} x */
	BrowseResponse(x) {
		const cf="BrowseResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,...y1}=x;
		this.ResponseContext(responseContext);
		if(header) this.BrowseHeader(header);
		this.trackingParams(trackingParams);
		if(onResponseReceivedActions) this.z(onResponseReceivedActions,a => this.ResponseReceivedAction(a));
		if(contents) this.BrowseContents(contents);
		const {topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,...y2}=y1;
		if(topbar) this.DesktopTopbarRenderer(topbar);
		if(frameworkUpdates) this.EntityBatchUpdate(frameworkUpdates);
		if(sidebar) this.SettingsSidebarRenderer(sidebar);
		if(observedStateTags) this.z(observedStateTags,a => this.StateTag(a));
		if(cacheMetadata) this.CacheMetadata(cacheMetadata);
		const {metadata,microformat,maxAgeStoreSeconds,background,...y3}=y2;
		if(metadata) this.ChannelMetadataRenderer(metadata);
		if(microformat) this.MicroformatDataRenderer(microformat);
		if(maxAgeStoreSeconds) this.primitive_of(maxAgeStoreSeconds,"number");
		if(background) this.MusicThumbnailRenderer(background);
		const {continuationContents,alerts,...y}=y3; this.g(y);
		if(continuationContents) this.ContinuationContents(continuationContents);
		if(alerts) this.z(alerts,this.AlertWithButtonRenderer);
	}
	/** @arg {AlertWithButtonRenderer} x */
	AlertWithButtonRenderer(x) {
		const {alertWithButtonRenderer,...y}=x; this.g(y);
		this.AlertWithButton(alertWithButtonRenderer);
	}
	/** @arg {AlertWithButton} x */
	AlertWithButton(x) {
		const {type,text,dismissButton,...y}=x; this.g(y);
		switch(type) {
			case "INFO": break;
			default: debugger;
		}
		this.SimpleText(text);
		this.ButtonRenderer(dismissButton);
	}
	/** @arg {SectionListContinuation|MusicShelfContinuation} x */
	ContinuationContents(x) {
		if("sectionListContinuation" in x) {
			return this.SectionListContinuation(x);
		} else if("musicShelfContinuation" in x) {
			return this.MusicShelfContinuation(x);
		}
		debugger;
	}
	/** @arg {SectionListContinuation} x */
	SectionListContinuation(x) {
		const cf="SectionListContinuation";
		this.save_keys(`[${cf}]`,x);
		this.SectionListData(x.sectionListContinuation);
	}
	/** @arg {SectionListData} x */
	SectionListData(x) {
		const cf="SectionListData";
		this.save_keys(`[${cf}]`,x);
		const {contents,continuations,trackingParams,subMenu,hideBottomSeparator,targetId,...y}=x; this.g(y);
		this.z(contents,a => this.SectionListItem(a));
		if(continuations) this.z(continuations,a => this.NextContinuationData(a));
		this.trackingParams(trackingParams);
		if(subMenu) this.save_keys(`[${cf}.subMenu]`,subMenu);
		if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
		if(targetId) this.save_string(`[${cf}.targetId]`,targetId);
	}
	/** @arg {NextContinuationData} x */
	NextContinuationData(x) {
		this.save_keys("[NextContinuationData]",x);
		this.NextContinuation(x.nextContinuationData);
	}
	/** @arg {NextContinuation} x */
	NextContinuation(x) {
		this.save_keys("[NextContinuation]",x);
		this.clickTrackingParams(x.clickTrackingParams);
		this.primitive_of(x.continuation,"string");
	}
	/** @arg {SectionListItem} x */
	SectionListItem(x) {
		this.save_keys("[SectionListItem]",x);
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
		this.save_keys("[MusicCarouselShelfRenderer]",x);
		this.MusicCarouselShelf(x.musicCarouselShelfRenderer);
	}
	/** @arg {MusicShelfRenderer} x */
	MusicShelfRenderer(x) {
		this.MusicShelf(x.musicShelfRenderer);
	}
	/** @arg {MusicShelf} x */
	MusicShelf(x) {
		this.save_keys("[MusicShelf]",x);
		this.ContentsArrayTemplate(x,a => {
			if("musicResponsiveListItemRenderer" in a) {
				this.MusicResponsiveListItemRenderer(a);
			} else debugger;
		});
		this.TextWithRuns(x.title);
		this.trackingParams(x.trackingParams);
		this.z(x.continuations,a => this.ReloadContinuationData(a));
	}
	/** @arg {ReloadContinuationData} x */
	ReloadContinuationData(x) {
		this.ReloadContinuationDataInner(x.reloadContinuationData);
	}
	/** @arg {ReloadContinuationDataInner} x */
	ReloadContinuationDataInner(x) {
		const {continuation,clickTrackingParams}=x;
		this.primitive_of(continuation,"string");
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @arg {MusicResponsiveListItemRenderer} x */
	MusicResponsiveListItemRenderer(x) {
		this.save_keys("[MusicResponsiveListItemRenderer]",x);
		this.MusicResponsiveListItem(x.musicResponsiveListItemRenderer);
	}
	/** @arg {MusicResponsiveListItem} x */
	MusicResponsiveListItem(x) {
		this.save_keys("[MusicResponsiveListItem]",x);
	}
	/** @template {{}} T @arg {ContentsArrayTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	ContentsArrayTemplate(x,f) {
		this.z(x.contents,f);
	}
	/** @arg {MusicCarouselShelf} x */
	MusicCarouselShelf(x) {
		this.save_keys("[MusicCarouselShelf]",x);
	}
	/** @arg {ContinuationItemRenderer} x */
	ContinuationItemRenderer(x) {
		this.save_keys("[ContinuationItemRenderer]",x);
		this.ContinuationItemData(x.continuationItemRenderer);
	}
	/** @arg {ContinuationItemData} x */
	ContinuationItemData(x) {
		this.save_keys("[ContinuationItemData]",x);
		const {trigger,continuationEndpoint,button,ghostCards,...y}=x; this.g(y);
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		// this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.ContinuationCommand(continuationEndpoint);
		if(button) this.ButtonRenderer(button);
		if(ghostCards) this.GhostGridRenderer(ghostCards);
	}
	/** @arg {ContinuationCommand} x */
	ContinuationCommand(x) {
		const {clickTrackingParams,commandMetadata,continuationCommand}=x;
		this.clickTrackingParams(clickTrackingParams);
		this.ContinuationCommandMetadata(commandMetadata);
		this.ContinuationCommandData(continuationCommand);
	}
	/** @arg {ContinuationCommandData} x */
	ContinuationCommandData(x) {
		this.save_keys("[ContinuationCommandData]",x);
		this.primitive_of(x.token,"string");
		this.save_enum("CONTINUATION_REQUEST_TYPE",x.request);
	}
	/** @arg {ContinuationCommandMetadata} x */
	ContinuationCommandMetadata(x) {
		this.save_keys("[ContinuationCommandMetadata]",x);
		const {webCommandMetadata,...y}=x; this.g(y);
		if("rootVe" in webCommandMetadata) {
			switch(webCommandMetadata.rootVe) {
				case 3832: return this.VE3832_WebCommandMetadata(webCommandMetadata);
				default: debugger; break;
			}
			return;
		}
		this.ContinuationWebCommandMetadata(webCommandMetadata);
	}
	/** @arg {ContinuationWebCommandMetadata} x */
	ContinuationWebCommandMetadata(x) {
		switch(x.apiUrl) {
			case "/youtubei/v1/search": {
				const {sendPost,apiUrl: {},...y}=x; this.g(y);
				this.primitive_of(sendPost,"boolean");
			} break;
			default: debugger; break;
		}
	}
	/** @arg {GhostGridRenderer} x */
	GhostGridRenderer(x) {
		this.save_keys("[GhostGridRenderer]",x);
		this.GhostGrid(x.ghostGridRenderer);
	}
	/** @arg {GhostGrid} x */
	GhostGrid(x) {
		this.save_keys("[GhostGrid]",x);
		const {rows,...y}=x; this.g(y);
		this.primitive_of(rows,"number");
	}
	/** @arg {ItemSectionRenderer} x */
	ItemSectionRenderer(x) {
		this.save_keys("[ItemSectionRenderer]",x);
		this.ItemSectionData(x.itemSectionRenderer);
	}
	/** @arg {ItemSectionData} x */
	ItemSectionData(x) {
		this.save_keys("[ItemSectionData]",x);
		const {contents,trackingParams,sectionIdentifier,targetId,...y}=x; this.g(y);
		this.z(contents,a => this.ItemSectionItem(a));
		this.save_string("[ItemSectionData.hash]",`section-${x.sectionIdentifier}-id-${x.targetId}`);
	}
	/** @arg {ItemSectionItem} x */
	ItemSectionItem(x) {
		this.save_keys("[ItemSectionItem]",x);
	}
	/** @arg {MusicThumbnailRenderer} x */
	MusicThumbnailRenderer(x) {
		this.save_keys("[MusicThumbnailRenderer]",x);
		if(!x.musicThumbnailRenderer) debugger;
		this.MusicThumbnailData(x.musicThumbnailRenderer);
	}
	/** @arg {MusicThumbnailData} x */
	MusicThumbnailData(x) {
		this.save_keys("[MusicThumbnailData]",x);
		this.Thumbnail(x.thumbnail);
		this.save_enum("MUSIC_THUMBNAIL_CROP",x.thumbnailCrop);
		this.save_enum("MUSIC_THUMBNAIL_SCALE",x.thumbnailScale);
		this.trackingParams(x.trackingParams);
	}
	/** @arg {Thumbnail} x */
	Thumbnail(x) {
		this.save_keys("[Thumbnail]",x);
		const {thumbnails,...y}=x; this.g(y);
	}
	/** @arg {MicroformatDataRenderer} x */
	MicroformatDataRenderer(x) {
		this.save_keys("[MicroformatDataRenderer]",x);
		const {microformatDataRenderer,...y}=x; this.g(y);
		if(microformatDataRenderer) this.MicroformatData(microformatDataRenderer);
	}
	/** @arg {MicroformatData} x */
	MicroformatData(x) {
		this.save_keys("[MicroformatData]",x);
		let {urlCanonical,title,...y1}=x;
		let {description,thumbnail,...y2}=y1;
		const {siteName,appName,androidPackage,iosAppStoreId,...y3}=y2;
		const {iosAppArguments,...y4}=y3;
		const {ogType,...y}=y4;
		const {urlApplinksWeb,urlApplinksIos,urlApplinksAndroid,urlTwitterIos,urlTwitterAndroid,...y5}=y;
		const {twitterCardType,twitterSiteHandle,...y6}=y5;
		const {schemaDotOrgType,noindex,unlisted,familySafe,availableCountries,linkAlternates,...y7}=y6;
		this.g(y7);
	}
	/** @arg {ChannelMetadataRenderer} x */
	ChannelMetadataRenderer(x) {
		this.save_keys("[ChannelMetadataRenderer]",x);
	}
	/** @arg {BrowseHeader} x */
	BrowseHeader(x) {
		this.save_keys("[BrowseHeader]",x);
	}
	/** @arg {CacheMetadata} x */
	CacheMetadata(x) {
		this.save_keys("[CacheMetadata]",x);
	}
	/** @arg {StateTag} x */
	StateTag(x) {
		this.save_keys("[StateTag]",x);
	}
	/** @arg {SettingsSidebarRenderer} x */
	SettingsSidebarRenderer(x) {
		this.save_keys("[SettingsSidebarRenderer]",x);
	}
	/** @arg {EntityBatchUpdate} x */
	EntityBatchUpdate(x) {
		this.save_keys("[EntityBatchUpdate]",x);
	}
	/** @arg {DesktopTopbarRenderer} x */
	DesktopTopbarRenderer(x) {
		this.save_keys("[DesktopTopbarRenderer]",x);
	}
	/** @arg {BrowseContents} x */
	BrowseContents(x) {
		this.save_keys("[BrowseContents]",x);
	}
	/** @arg {ResponseReceivedAction} x */
	ResponseReceivedAction(x) {
		this.save_keys("[ResponseReceivedAction]",x);
	}
	/** @arg {BrowseEndpoint} x */
	BrowseEndpoint(x) {
		this.save_keys("[BrowseEndpoint]",x);
		const {clickTrackingParams,commandMetadata,browseEndpoint,...y}=x; this.g(y);
		this.clickTrackingParams(clickTrackingParams);
		if(commandMetadata) this.BrowseCommandMetadata(commandMetadata);
		this.BrowseEndpointData(browseEndpoint);
	}
	/** @arg {BrowseCommandMetadata} x */
	BrowseCommandMetadata(x) {
		this.save_keys("[BrowseCommandMetadata]",x);
		this.BrowseWebCommandMetadata(x.webCommandMetadata);
		if(x.resolveUrlCommandMetadata) this.ResolveUrlCommandMetadata(x.resolveUrlCommandMetadata);
	}
	/** @arg {BrowseWebCommandMetadata} x */
	BrowseWebCommandMetadata(x) {
		if(x.webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(x.apiUrl!=="/youtubei/v1/browse") debugger;
		switch(x.rootVe) {
			default: debugger; break;
			case 11487: this.VE11487_WebCommandMetadata(x); break;
			case 3854: this.VE3854_WebCommandMetadata(x); break;
			case 6827: this.VE6827_WebCommandMetadata(x); break;
			case 96368: this.VE96368_WebCommandMetadata(x); break;
		}
	}
	/** @arg {VE96368_WebCommandMetadata} x */
	VE96368_WebCommandMetadata(x) {
		this.save_keys("[VE96368_WebCommandMetadata]",x);
		if(x.url!=="/feed/subscriptions") debugger;
	}
	/** @arg {VE11487_WebCommandMetadata} x */
	VE11487_WebCommandMetadata(x) {
		this.save_keys("[VE11487_WebCommandMetadata]",x);
		if(x.url!=="/premium") debugger;
	}
	/** @arg {VE3854_WebCommandMetadata} x */
	VE3854_WebCommandMetadata(x) {
		this.save_keys("[VE3854_WebCommandMetadata]",x);
		if(x.url!=="/") debugger;
	}
	/** @arg {VE6827_WebCommandMetadata} x */
	VE6827_WebCommandMetadata(x) {
		this.save_keys("[VE6827_WebCommandMetadata]",x);
		/** @type {SplitOnce<VE6827_PageUrl,"/">[1]} */
		let su=split_string_once(x.url,"/")[1];
		let su1=split_string(su,"/");
		let [pt]=split_string_once(su1[1],"?");
		switch(pt) {
			case "trending": break;
			case "library": break;
			case "history": break;
			case "storefront": break;
			default: debugger; break;
		}
	}
	/** @arg {ResolveUrlCommandMetadata} x */
	ResolveUrlCommandMetadata(x) {
		this.save_keys("[ResolveUrlCommandMetadata]",x);
	}
	/** @arg {BrowseEndpointData} x */
	BrowseEndpointData(x) {
		this.save_keys("[BrowseEndpointData]",x);
		if(x.browseId) this.browseId(x.browseId);
	}
	/** @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const {response,endpoint,...y}=x;
		this.DataResponsePageType(response);
		if(!this.eq_keys(this.get_keys_of(y),["pageType","fromHistory","navigationDoneMs"])) {
			console.log(y);
		}
	}
	/** @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
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
	/** @arg {AllActions} x */
	Action(x) {
		let name_from_keys=this.get_name_from_keys(x);
		if(!name_from_keys) {debugger; return;}
		data_saver.save_keys(`[Action.${name_from_keys}]`,x);
	}
	/** @private @arg {AccountMenuResponse} x */
	AccountMenuResponse(x) {
		if(x.actions) this.z(x.actions,a => this.Action(a));
		this.save_keys("[AccountMenuResponse]",x);
	}
	/** @arg {Response} response @arg {_ResponseTypes} x */
	ResponseTypes(response,x) {
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
		/** @type {{data:{responseContext:ResponseContext;}}} */
		let v=x;
		this.ResponseContext(v.data.responseContext);
		x: if("actions" in x.data) {
			if(x.type==="account.account_menu") break x;
			if(x.type==="notification.get_notification_menu") break x;
			if(x.type==="notification.get_unseen_count") break x;
			if(x.type==="notification.modify_channel_preference") break x;
			if(x.type==="share.get_share_panel") break x;
			if(x.type==="subscription.subscribe") break x;
			if(x.type==="subscription.unsubscribe") break x;
			if(x.type==="browse.edit_playlist") break x;
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
			case "getAccountSwitcherEndpoint": return this.GetAccountSwitcherEndpointResponse(x.data);
			case "getDatasyncIdsEndpoint": return this.DatasyncIdsResponse(x.data);
			case "guide": return this.GuideResponse(x.data);
			case "like.like": return this.LikeLikeResponse(x.data);
			case "like.removelike": return this.LikeRemoveLikeResponse(x.data);
			case "live_chat.get_live_chat_replay": return this.GetLiveChatReplayResponse(x.data);
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
			default: debugger; return g(x);
		}
	}
	/** @arg {SearchApiResponse} x */
	SearchApiResponse(x) {
		const cf="SearchApiResponse";
		this.save_keys(`[${cf}]`,x);
		if("targetId" in x) return this.SearchResponse(x);
		const {responseContext: {},contents,continuationContents,trackingParams,header,...y}=x; this.g(y);
		if(contents) this.TabbedSearchResultsRenderer(contents);
		if(continuationContents) this.ContinuationContents(continuationContents);
		this.trackingParams(trackingParams);
		if(header) this.MusicHeaderRenderer(header);
	}
	/** @arg {MusicShelfContinuation} x */
	MusicShelfContinuation(x) {
		x;
	}
	/** @arg {MusicHeaderRenderer} x */
	MusicHeaderRenderer(x) {
		x;
	}
	/** @arg {SearchResponse} x */
	SearchResponse(x) {
		const cf="SearchResponse";
		this.save_keys(`[${cf}]`,x);
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=x; this.g(y);
		this.primitive_of(estimatedResults,"string");
		this.TwoColumnSearchResultsRenderer(contents);
		this.trackingParams(trackingParams);
		this.DesktopTopbarRenderer(topbar);
		this.z(refinements,a => this.primitive_of(a,"string"));
		this.z(onResponseReceivedCommands,a => {
			if("adsControlFlowOpportunityReceivedCommand" in a) {
				return this.AdsControlFlowOpportunityReceivedCommand(a);
			};
			debugger;
		});
		if(targetId) this.save_string(`[${cf}.targetId]`,targetId);
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommand} x */
	AdsControlFlowOpportunityReceivedCommand(x) {
		this.w(x,this.AdsControlFlowOpportunityReceivedCommandData,split_string("clickTrackingParams"));
	}
	/** @arg {AdsControlFlowOpportunityReceivedCommandData} x */
	AdsControlFlowOpportunityReceivedCommandData(x) {
		x;
	}
	/** @arg {TwoColumnSearchResultsRenderer} x */
	TwoColumnSearchResultsRenderer(x) {
		this.TwoColumnSearchResults(x.twoColumnSearchResultsRenderer);
	}
	/** @arg {TwoColumnSearchResults} x */
	TwoColumnSearchResults(x) {
		this.SectionListRenderer(x.primaryContents);
	}
	/** @arg {SectionListRenderer} x */
	SectionListRenderer(x) {
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
		const {tabs: a,...y}=x; this.g(y);
		this.z(a,a => this.SearchResultsTabRenderer(a));
	}
	/** @arg {SearchResultsTabRenderer} x */
	SearchResultsTabRenderer(x) {
		const cf="SearchResultsTabRenderer";
		this.save_keys(`[${cf}]`,x);
		this.SearchResultsTab(x.tabRenderer);
	}
	/** @arg {SearchResultsTab} x */
	SearchResultsTab(x) {
		const cf="SearchResultsTab";
		this.save_keys(`[${cf}]`,x);
		let ka=this.get_keys_of(x);
		for(let k of ka) {
			this.save_keys(`[${cf}.${k}]`,x[k]);
		}
	}
	/** @arg {GetSearchSuggestionsResponse} x */
	GetSearchSuggestions(x) {
		this.save_keys("[GetSearchSuggestions]",x);
		this.trackingParams(x.trackingParams);
	}
	/** @arg {GetSharePanel} x */
	GetSharePanel(x) {
		const cf="GetSharePanel";
		if(x.actions) this.z(x.actions,a => this.Action(a));
		this.save_keys(`[${cf}]`,x);
	}
	/** @arg {GetAddToPlaylistResponse} x */
	GetAddToPlaylistResponse(x) {
		this.save_keys("[GetAddToPlaylistResponse]",x);
	}
	/** @arg {AttLogResponse} x */
	AttLogResponse(x) {
		this.save_keys("[AttLogResponse]",x);
	}
	/** @arg {SubscribeResponse} x */
	SubscribeResponse(x) {
		if(x.actions) this.z(x.actions,a => this.Action(a));
		this.save_keys("[SubscribeResponse]",x);
	}
	/** @arg {UnsubscribeResponse} x */
	UnsubscribeResponse(x) {
		if(x.actions) this.z(x.actions,a => this.Action(a));
		this.save_keys("[UnsubscribeResponse]",x);
	}
	/** @arg {ModifyChannelPreferenceResponse} x */
	ModifyChannelPreferenceResponse(x) {
		if(x.actions) this.z(x.actions,a => this.Action(a));
		this.save_keys("[ModifyChannelPreferenceResponse]",x);
	}
	/** @private @arg {PlayerResponse} x */
	PlayerResponse(x) {
		this.save_keys("[PlayerResponse]",x);
		this.t(x.annotations,a => this.z(a,a => this.w(a,a => a)));
	}
	/** @public @template {GetMaybeKeys<T>} SI @template {{}} T @arg {T|undefined} x @arg {(this:this,v:T[Exclude<GetMaybeKeys<T>, SI>],k: Exclude<GetMaybeKeys<T>, SI>)=>void} y @arg {SI[]} excl */
	w(x,y,excl=[]) {
		if(x===void 0) return;
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		if(keys.length===0) {
			debugger;
			return;
		}
		for(let k of keys) {
			y.call(this,x[k],k);
		}
	}
	/** @template {{}} T @arg {T|undefined} x @arg {(x:T)=>void} f */
	t(x,f) {
		if(!x) return;
		f(x);
	}
	/** @arg {LikeLikeResponse} x */
	LikeLikeResponse(x) {
		const cf="LikeLikeResponse";
		const {actions,...y}=x;
		this.save_keys(`[${cf}]`,x);
		if(actions) {
			this.z(actions,a => this.Action(a));
		}
		if(!this.eq_keys(this.get_keys_of(y),["responseContext"])) debugger;
	}
	/** @arg {LikeRemoveLikeResponse} x */
	LikeRemoveLikeResponse(x) {
		const cf="LikeRemoveLikeResponse";
		const {responseContext,actions,...y}=x; this.g(y);
		if(actions) this.z(actions,a => this.Action(a));
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {ReelWatchSequenceResponse} x */
	ReelWatchSequenceResponse(x) {
		const cf="ReelWatchSequenceResponse";
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {GetLiveChatReplayResponse} x */
	GetLiveChatReplayResponse(x) {
		this.save_keys("[GetLiveChatReplay]",x);
	}
	/** @private @arg {GetNotificationMenuResponse} x */
	GetNotificationMenuResponse(x) {
		const cf="GetNotificationMenuResponse";
		this.z(x.actions,a => this.Action(a));
		this.save_keys(`[${cf}]`,x);
	}
	/** @private @arg {NextResponse} x */
	NextResponse(x) {
		this.save_keys("[NextResponse]",x);
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=x;
		if(contents) this.NextResponseContents(contents);
		if(currentVideoEndpoint) this.WatchEndpoint(currentVideoEndpoint);
		this.trackingParams(trackingParams);
		if(playerOverlays) this.PlayerOverlayRenderer(playerOverlays);
		if(onResponseReceivedEndpoints) this.z(onResponseReceivedEndpoints,a => this.ResponseReceivedEndpointItem(a));
		if(engagementPanels) this.z(engagementPanels,this.EngagementPanelSectionListRenderer);
		const {videoReporting,queueContextParams,continuationContents,...y1}=y; this.g(y1);
		if(videoReporting) this.ReportFormModalRenderer(videoReporting);
		if(queueContextParams) this.primitive_of(queueContextParams,"string");
		if(continuationContents) this.PlaylistPanelContinuation(continuationContents);
	}
	/** @arg {PlaylistPanelContinuation} x */
	PlaylistPanelContinuation(x) {
		this.save_keys("[PlaylistPanelContinuation]",x);
	}
	/** @arg {ReportFormModalRenderer} x */
	ReportFormModalRenderer(x) {
		this.save_keys("[ReportFormModalRenderer]",x);
	}
	/** @arg {NextResponseContents} x */
	NextResponseContents(x) {
		this.save_keys("[NextResponseContents]",x);
		if("twoColumnWatchNextResults" in x) {
			return this.TwoColumnWatchNextResults(x);
		} else if("singleColumnMusicWatchNextResultsRenderer" in x) {
			return this.SingleColumnMusicWatchNextResultsRenderer(x);
		}
		debugger;
	}
	/** @arg {SingleColumnMusicWatchNextResultsRenderer} x */
	SingleColumnMusicWatchNextResultsRenderer(x) {
		this.save_keys("[SingleColumnMusicWatchNextResultsRenderer]",x);
		this.TabbedRenderer(x.singleColumnMusicWatchNextResultsRenderer);
	}
	/** @arg {TabbedRenderer} x */
	TabbedRenderer(x) {
		this.save_keys("[TabbedRenderer]",x);
		this.WatchNextTabbedResultsRenderer(x.tabbedRenderer);
	}
	/** @arg {WatchNextTabbedResultsRenderer} x */
	WatchNextTabbedResultsRenderer(x) {
		this.save_keys("[WatchNextTabbedResultsRenderer]",x);
		this.WatchNextTabbedResults(x.watchNextTabbedResultsRenderer);
	}
	/** @arg {WatchNextTabbedResults} x */
	WatchNextTabbedResults(x) {
		this.save_keys("[WatchNextTabbedResults]",x);
		this.z(x.tabs,this.TabRenderer);
	}
	/** @arg {TabRenderer} x */
	TabRenderer(x) {
		this.save_keys("[TabRenderer]",x);
		this.TabData(x.tabRenderer);
	}
	/** @arg {TabData} x */
	TabData(x) {
		this.save_keys("[TabData]",x);
		const {endpoint,content,title,trackingParams,unselectable,...y}=x; this.g(y);
		if(endpoint) this.BrowseEndpoint(endpoint);
		if(content) this.TabDataContent(content);
		if(title) this.primitive_of(title,"string");
		this.trackingParams(trackingParams);
		if(unselectable!==void 0) this.primitive_of(unselectable,"boolean");
	}
	/** @arg {TabDataContent} x */
	TabDataContent(x) {
		this.save_keys("[TabDataContent]",x);
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
		this.save_keys("[MusicQueueRenderer]",x);
		this.MusicQueue(x.musicQueueRenderer);
	}
	/** @arg {MusicQueue} x */
	MusicQueue(x) {
		this.save_keys("[MusicQueue]",x);
		const {content,hack,...y}=x; this.g(y);
		if(content) this.PlaylistPanelRenderer(content);
		this.primitive_of(hack,"boolean");
	}
	/** @arg {PlaylistPanelRenderer} x */
	PlaylistPanelRenderer(x) {
		this.save_keys("[PlaylistPanelRenderer]",x);
		this.PlaylistPanel(x.playlistPanelRenderer);
	}
	/** @arg {PlaylistPanel} x */
	PlaylistPanel(x) {
		this.save_keys("[PlaylistPanel]",x);
		const {title,contents,currentIndex,...y1}=x;
		this.primitive_of(title,"string");
		this.z(contents,this.PlaylistPanelItem);
		if(currentIndex) this.primitive_of(currentIndex,"number");
		const {playlistId,ownerName,isInfinite,...y2}=y1;
		this.playlistId(playlistId);
		if(ownerName) this.TextWithRuns(ownerName);
		this.primitive_of(isInfinite,"boolean");
		const {continuations,shortBylineText,longBylineText,...y3}=y2;
		if(continuations) this.z(continuations,this.NextRadioContinuationData);
		this.TextWithRuns(shortBylineText);
		if(longBylineText) this.TextWithRuns(longBylineText);
		const {trackingParams,titleText,...y4}=y3;
		this.trackingParams(trackingParams);
		this.TextWithRuns(titleText);
		const {isEditable,previewDescription,numItemsToShow,...y5}=y4; this.g(y5);
		if(isEditable!==true) debugger;
		if(previewDescription) this.g(previewDescription);
		if(numItemsToShow!==void 0&&numItemsToShow!==25) debugger;
	}
	/** @arg {PlaylistPanelItem} x */
	PlaylistPanelItem(x) {
		if("playlistPanelVideoRenderer" in x) {
			this.PlaylistPanelVideoRenderer(x);
		} else if("automixPreviewVideoRenderer") {
			this.AutomixPreviewVideoRenderer(x);
		} else {
			debugger;
		}
	}
	/** @arg {AutomixPreviewVideoRenderer} x */
	AutomixPreviewVideoRenderer(x) {
		this.save_keys("[AutomixPreviewVideoRenderer]",x);
	}
	/** @arg {AutomixPreviewVideo} x */
	AutomixPreviewVideo(x) {
		this.save_keys("[AutomixPreviewVideo]",x);
	}
	/** @arg {NextRadioContinuationData} x */
	NextRadioContinuationData(x) {
		this.save_keys("[NextRadioContinuationData]",x);
		this.NextRadioContinuationDataInner(x.nextRadioContinuationData);
	}
	/** @arg {NextRadioContinuationDataInner} x */
	NextRadioContinuationDataInner(x) {
		this.save_keys("[NextRadioContinuationDataInner]",x);
		const {continuation,clickTrackingParams,...y}=x; this.g(y);
		this.primitive_of(continuation,"string");
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @arg {PlaylistPanelVideoRenderer} x */
	PlaylistPanelVideoRenderer(x) {
		this.save_keys("[PlaylistPanelVideoRenderer]",x);
		const {playlistPanelVideoRenderer,...y}=x; this.g(y);
		this.PlaylistPanelVideo(playlistPanelVideoRenderer);
	}
	/** @arg {PlaylistPanelVideo} x */
	PlaylistPanelVideo(x) {
		this.save_keys("[PlaylistPanelVideo]",x);
		const {title,longBylineText,...y1}=x;
		this.TextT(title);
		this.TextWithRuns(longBylineText);
		const {thumbnail,lengthText,...y2}=y1;
		this.Thumbnail(thumbnail);
		this.TextT(lengthText);
		const {selected,navigationEndpoint,...y3}=y2;
		this.primitive_of(selected,"boolean");
		this.WatchEndpoint(navigationEndpoint);
		const {videoId,shortBylineText,...y4}=y3;
		this.videoId(videoId);
		this.TextWithRuns(shortBylineText);
		const {trackingParams,menu,...y5}=y4;
		this.trackingParams(trackingParams);
		this.MenuRenderer(menu);
		const {playlistSetVideoId,...y6}=y5;
		this.primitive_of(playlistSetVideoId,"string");
		const {thumbnailOverlays,canReorder,...y7}=y6;
		if(thumbnailOverlays) this.z(thumbnailOverlays,this.ThumbnailOverlayResumePlaybackRenderer);
		if(canReorder!==void 0&&!canReorder) debugger;
		this.g(y7);
	}
	/** @arg {ThumbnailOverlayResumePlaybackRenderer} x */
	ThumbnailOverlayResumePlaybackRenderer(x) {
		this.save_keys("[ThumbnailOverlayResumePlaybackRenderer]",x);
		this.ThumbnailOverlayResumePlayback(x.thumbnailOverlayResumePlaybackRenderer);
	}
	/** @arg {ThumbnailOverlayResumePlayback} x */
	ThumbnailOverlayResumePlayback(x) {
		x;
		debugger;
	}
	/** @arg {RichGridRenderer} x */
	RichGridRenderer(x) {
		this.save_keys("[RichGridRenderer]",x);
		this.RichGrid(x.richGridRenderer);
	}
	/** @arg {RichGrid} x */
	RichGrid(x) {
		this.save_keys("[RichGrid]",x);
		const {contents,masthead,...y}=x; this.g(y);
		this.z(contents,this.RendererContentItem);
		this.VideoMastheadAdV3Renderer(masthead);
	}
	/** @arg {VideoMastheadAdV3Renderer} x */
	VideoMastheadAdV3Renderer(x) {
		this.save_keys("[VideoMastheadAdV3Renderer]",x);
		this.VideoMastheadAdV3(x.videoMastheadAdV3Renderer);
	}
	/** @arg {VideoMastheadAdV3} x */
	VideoMastheadAdV3(x) {
		this.save_keys("[VideoMastheadAdV3]",x);
		debugger;
	}
	/** @arg {RendererContentItem} x */
	RendererContentItem(x) {
		this.save_keys("[RendererContentItem]",x);
		debugger;
	}
	/** @arg {EngagementPanelSectionListRenderer} x */
	EngagementPanelSectionListRenderer(x) {
		this.save_keys("[EngagementPanelSectionListRenderer]",x);
		this.EngagementPanelSectionList(x.engagementPanelSectionListRenderer);
	}
	/** @arg {EngagementPanelSectionList} x */
	EngagementPanelSectionList(x) {
		this.save_keys("[EngagementPanelSectionList]",x);
		const {content,panelIdentifier,header,veType,targetId,visibility,onShowCommands,loggingDirectives,...y}=x; this.g(y);
	}
	/** @arg {AdsEngagementPanelContentRenderer} x */
	AdsEngagementPanelContentRenderer(x) {
		x;
	}
	/** @arg {EngagementPanelSectionListContent} x */
	EngagementPanelSectionListContent(x) {
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
		}
		debugger;
	}
	/**
	 * @param {ClipSectionRenderer} x
	 */
	ClipSectionRenderer(x) {
		x;
	}
	/**
	 * @param {SectionListRendererTemplate<"comment-item-section", "engagement-panel-comments-section">} x
	 */
	SectionListRendererTemplate(x) {
		this.SectionListDataTemplate(x.sectionListRenderer);
	}
	/**
	 * @param {SectionListDataTemplate<"comment-item-section", "engagement-panel-comments-section">} x
	 */
	SectionListDataTemplate(x) {
		x.contents;
	}
	/**
	 * @param {StructuredDescriptionContentRenderer} x
	 */
	StructuredDescriptionContentRenderer(x) {
		x;
	}
	/** @arg {ResponseReceivedEndpointItem} x */
	ResponseReceivedEndpointItem(x) {
		this.save_keys("[ResponseReceivedEndpointItem]",x);
		if("signalServiceEndpoint" in x) {
			const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.SignalServiceEndpointCommandMetadata(commandMetadata);
		} else if("adsControlFlowOpportunityReceivedCommand" in x) {
			const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.AdsControlFlowOpportunityReceivedCommandData(adsControlFlowOpportunityReceivedCommand);
		} else if("changeKeyedMarkersVisibilityCommand" in x) {
			const {clickTrackingParams,changeKeyedMarkersVisibilityCommand,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.ChangeKeyedMarkersVisibilityCommandData(changeKeyedMarkersVisibilityCommand);
		} else if("loadMarkersCommand" in x) {
			const {clickTrackingParams,loadMarkersCommand,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.LoadMarkersCommandData(loadMarkersCommand);
		} else if("reloadContinuationItemsCommand" in x) {
			const {clickTrackingParams,reloadContinuationItemsCommand,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.ReloadContinuationItemsCommandData(reloadContinuationItemsCommand);
		} else if("appendContinuationItemsAction" in x) {
			const {clickTrackingParams,appendContinuationItemsAction,...y}=x; this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			this.AppendContinuationItemsActionData(appendContinuationItemsAction);
		} else {
			debugger;
		}
	}
	/** @private @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {
		return this.str_starts_with(x.targetId,w);
	}
	/** @arg {AppendContinuationItemsActionData} x */
	AppendContinuationItemsActionData(x) {
		this.save_keys("[AppendContinuationItemsActionData]",x);
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
	/** @arg {CommentRepliesItem} x */
	CommentRepliesItem(x) {
		this.save_keys("[CommentRepliesItem]",x);
	}
	/** @arg {WatchNextContinuationAction} x */
	WatchNextContinuationAction(x) {
		this.save_keys("[WatchNextContinuationAction]",x);
	}
	/** @arg {CommentsSectionContinuationAction} x */
	CommentsSectionContinuationAction(x) {
		this.save_keys("[CommentsSectionContinuationAction]",x);
	}
	/** @arg {BrowseFeedAction} x */
	BrowseFeedAction(x) {
		this.save_keys("[BrowseFeedAction]",x);
	}
	/** @arg {ReloadContinuationItemsCommandData} x */
	ReloadContinuationItemsCommandData(x) {
		this.save_keys("[ReloadContinuationItemsCommandData]",x);
		this.save_enum("RELOAD_CONTINUATION_SLOT",x.slot);
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				const {targetId,continuationItems,slot: {},...y}=x; this.g(y);
				this.save_string("[Body.targetId]",targetId);
				this.z(continuationItems,a => {
					this.save_keys("[continuationItem]",a);
				});
			} break;
			case "RELOAD_CONTINUATION_SLOT_HEADER": {
				const {targetId,continuationItems,slot: {},...y}=x; this.g(y);
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
		this.save_keys("[CommentsHeaderRenderer]",x);
		this.CommentsHeaderData(x.commentsHeaderRenderer);
	}
	/** @arg {CommentsHeaderData} x */
	CommentsHeaderData(x) {
		this.save_keys("[CommentsHeaderData]",x);
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=x; this.g(y);
		this.TextWithRuns(countText);
		this.CommentSimpleboxRenderer(createRenderer);
	}
	/** @arg {CommentSimpleboxRenderer} x */
	CommentSimpleboxRenderer(x) {
		this.save_keys("[CommentSimpleboxRenderer]",x);
		const {commentSimpleboxRenderer,...y}=x; this.g(y);
		this.CommentSimpleboxData(commentSimpleboxRenderer);
	}
	/** @arg {CommentSimpleboxData} x */
	CommentSimpleboxData(x) {
		this.save_keys("[CommentSimpleboxData]",x);
	}
	/** @arg {LoadMarkersCommandData} x */
	LoadMarkersCommandData(x) {
		this.save_keys("[LoadMarkersCommandData]",x);
		const {entityKeys,...y}=x; this.g(y);
		this.z(entityKeys,a => this.primitive_of(a,"string"));
	}
	/** @arg {ChangeKeyedMarkersVisibilityCommandData} x */
	ChangeKeyedMarkersVisibilityCommandData(x) {
		this.save_keys("[ChangeKeyedMarkersVisibilityCommandData]",x);
		const {isVisible,key,...y}=x; this.g(y);
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @arg {SignalServiceEndpointCommandMetadata} x */
	SignalServiceEndpointCommandMetadata(x) {
		this.save_keys("[SignalServiceEndpointCommandMetadata]",x);
		const {webCommandMetadata,...y}=x; this.g(y);
		this.SignalServiceEndpointWebCommandMetadata(webCommandMetadata);
	}
	/** @arg {SignalServiceEndpointWebCommandMetadata} x */
	SignalServiceEndpointWebCommandMetadata(x) {
		this.save_keys("[SignalServiceEndpointWebCommandMetadata]",x);
		const {sendPost,...y}=x; this.g(y);
		this.primitive_of(sendPost,"boolean");
	}
	/** @arg {PlayerOverlayRenderer} x */
	PlayerOverlayRenderer(x) {
		this.save_keys("[PlayerOverlayRenderer]",x);
		const {playerOverlayRenderer,...y}=x; this.g(y);
		this.PlayerOverlay(playerOverlayRenderer);
	}
	/** @arg {PlayerOverlay} x */
	PlayerOverlay(x) {
		this.save_keys("[PlayerOverlay]",x);
		if("browserMediaSession" in x) {
			return this.BrowserMediaSessionRoot(x);
		}
		const {endScreen,autoplay,shareButton,addToMenu,videoDetails,autonavToggle,decoratedPlayerBarRenderer,...y}=x; this.g(y);
		this.WatchNextEndScreenRenderer(endScreen);
		if(autoplay) this.PlayerOverlayAutoplayRenderer(autoplay);
		this.ButtonRenderer(shareButton);
		this.MenuRenderer(addToMenu);
		this.PlayerOverlayVideoDetailsRenderer(videoDetails);
		if(autonavToggle) this.AutoplaySwitchButtonRenderer(autonavToggle);
		if(decoratedPlayerBarRenderer) this.DecoratedPlayerBarRenderer(decoratedPlayerBarRenderer);
	}
	/** @arg {BrowserMediaSessionRoot} x */
	BrowserMediaSessionRoot(x) {
		this.save_keys("[BrowserMediaSessionRoot]",x);
		const {actions,browserMediaSession,...y}=x; this.g(y);
		this.z(actions,this.LikeButtonRenderer);
	}
	/** @arg {LikeButtonRenderer} x */
	LikeButtonRenderer(x) {
		this.save_keys("[LikeButtonRenderer]",x);
		this.LikeButton(x.likeButtonRenderer);
	}
	/** @arg {LikeButton} x */
	LikeButton(x) {
		this.save_keys("[LikeButton]",x);
		const {target,likeStatus,trackingParams,likesAllowed,serviceEndpoints,...y}=x; this.g(y);
		this.LikeApiData(target);
		if(likeStatus!=="INDIFFERENT") debugger;
		this.trackingParams(trackingParams);
		this.primitive_of(likesAllowed,"boolean");
		this.z(serviceEndpoints,this.LikeEndpoint);
	}
	/** @arg {LikeEndpoint} x */
	LikeEndpoint(x) {
		this.save_keys("[LikeEndpoint]",x);
		this.LikeEndpointData(x.likeEndpoint);
	}
	/** @arg {LikeEndpointData} x */
	LikeEndpointData(x) {
		this.save_keys("[LikeEndpointData]",x);
		const {target,...y}=x;
		this.LikeApiData(x.target);
		switch(y.status) {
			case "DISLIKE": {
				const {status: {},dislikeParams,...a}=y; this.g(a);
				this.primitive_of(dislikeParams,"string");
			} break;
			case "INDIFFERENT": {
				const {status: {},removeLikeParams,...a}=y; this.g(a);
				this.primitive_of(removeLikeParams,"string");
			} break;
			case "LIKE": {
				const {status: {},actions,likeParams,...a}=y; this.g(a);
				if(actions) this.z(actions,this.MusicLibraryStatusUpdateCommand);
				this.primitive_of(likeParams,"string");
			} break;
		}
	}
	/** @arg {MusicLibraryStatusUpdateCommand} x */
	MusicLibraryStatusUpdateCommand(x) {
		this.MusicLibraryStatusUpdate(x.musicLibraryStatusUpdateCommand);
	}
	/** @arg {MusicLibraryStatusUpdate} x */
	MusicLibraryStatusUpdate(x) {
		this.save_keys("[MusicLibraryStatusUpdate]",x);
		const {libraryStatus,addToLibraryFeedbackToken,...y}=x; this.g(y);
		if(libraryStatus!=="MUSIC_LIBRARY_STATUS_IN_LIBRARY") debugger;
		this.primitive_of(addToLibraryFeedbackToken,"string");
	}
	/** @arg {LikeApiData} x */
	LikeApiData(x) {
		this.save_keys("[LikeApiData]",x);
		const {videoId,...y}=x; this.g(y);
		this.videoId(videoId);
	}
	/** @arg {string} x */
	videoId(x) {
		this.primitive_of(x,"string");
		this.x.get("indexed_db").put({v: x});
	}
	/** @arg {PlayerOverlayAutoplayRenderer} x */
	PlayerOverlayAutoplayRenderer(x) {
		this.save_keys("[PlayerOverlayAutoplayRenderer]",x);
		const {playerOverlayAutoplayRenderer,...y}=x; this.g(y);
		this.PlayerOverlayAutoplay(playerOverlayAutoplayRenderer);
	}
	/** @arg {PlayerOverlayAutoplay} x */
	PlayerOverlayAutoplay(x) {
		this.save_keys("[PlayerOverlayAutoplay]",x);
		const {title,videoTitle,byline,pauseText,background,countDownSecs,cancelButton,nextButton,trackingParams,closeButton,thumbnailOverlays,preferImmediateRedirect,videoId,publishedTimeText,webShowBigThumbnailEndscreen,webShowNewAutonavCountdown,shortViewCountText,countDownSecsForFullscreen,...y}=x; this.g(y);
		this.SimpleText(title);
	}
	/** @arg {AutoplaySwitchButtonRenderer} x */
	AutoplaySwitchButtonRenderer(x) {
		this.save_keys("[AutoplaySwitchButtonRenderer]",x);
	}
	/** @arg {DecoratedPlayerBarRenderer} x */
	DecoratedPlayerBarRenderer(x) {
		this.save_keys("[DecoratedPlayerBarRenderer]",x);
		const {decoratedPlayerBarRenderer,...y}=x; this.g(y);
		this.DecoratedPlayerBar(decoratedPlayerBarRenderer);
	}
	/** @arg {DecoratedPlayerBar} x */
	DecoratedPlayerBar(x) {
		this.save_keys("[DecoratedPlayerBar]",x);
	}
	/** @arg {PlayerOverlayVideoDetailsRenderer} x */
	PlayerOverlayVideoDetailsRenderer(x) {
		this.save_keys("[PlayerOverlayVideoDetailsRenderer]",x);
		const {playerOverlayVideoDetailsRenderer,...y}=x; this.g(y);
		this.PlayerOverlayVideoDetails(playerOverlayVideoDetailsRenderer);
	}
	/** @arg {PlayerOverlayVideoDetails} x */
	PlayerOverlayVideoDetails(x) {
		this.save_keys("[PlayerOverlayVideoDetails]",x);
	}
	/** @arg {MenuRenderer} x */
	MenuRenderer(x) {
		this.save_keys("[MenuRenderer]",x);
		const {menuRenderer,...y}=x; this.g(y);
	}
	/** @arg {MenuData} x */
	MenuData(x) {
		const cf="MenuData";
		this.save_keys(`[${cf}]`,x);
		const {trackingParams,accessibility,items,targetId,...y}=x; this.g(y);
		this.trackingParams(trackingParams);
		this.Accessibility(accessibility);
		this.z(items,a => this.MenuServiceItemRenderer(a));
		if(targetId) this.save_string(`[${cf}.targetId]`,targetId);
	}
	/** @arg {MenuServiceItemRenderer} x */
	MenuServiceItemRenderer(x) {
		this.save_keys("[MenuServiceItemRenderer]",x);
		const {menuServiceItemRenderer,...y}=x; this.g(y);
		this.MenuServiceItemData(menuServiceItemRenderer);
	}
	/** @arg {MenuServiceItemData} x */
	MenuServiceItemData(x) {
		this.save_keys("[MenuServiceItemData]",x);
		const {text,icon,serviceEndpoint,trackingParams,...y}=x; this.g(y);
		this.g(text);
		this.Icon(icon);
		this.ServiceEndpointTemplate(serviceEndpoint,a => this.FeedbackEndpointPlugin(a));
	}
	/** @arg {FeedbackEndpointPlugin} x */
	FeedbackEndpointPlugin(x) {
		this.save_keys("[FeedbackEndpointPlugin]",x);
		if("feedbackEndpoint" in x) {
			x.feedbackEndpoint;
			return;
		}
		debugger;
	}
	/** @arg {FeedbackEndpointData} x */
	FeedbackEndpointData(x) {
		this.save_keys("[FeedbackEndpointData]",x);
	}
	/** @template {string} T @arg {Icon<T>} x */
	Icon(x) {
		this.save_keys("[Icon]",x);
		const {iconType,...y}=x; this.g(y);
		this.save_string("[IconType]",x.iconType);
	}
	/** @template {{}} T @arg {ServiceEndpointTemplate<T>} x @arg {(x:T)=>void} f */
	ServiceEndpointTemplate(x,f) {
		this.save_keys("[ServiceEndpointTemplate]",x);
		const {clickTrackingParams,commandMetadata,...y}=x;
		this.clickTrackingParams(clickTrackingParams);
		this.g(commandMetadata);
		/** @type {{}} */
		let t=as(y);
		f(as(t));
	}
	/** @arg {Accessibility} x */
	Accessibility(x) {
		this.save_keys("[Accessibility]",x);
		const {accessibilityData,...y}=x; this.g(y);
		this.AccessibilityData(accessibilityData);
	}
	/** @arg {AccessibilityData} x */
	AccessibilityData(x) {
		this.save_keys("[AccessibilityData]",x);
		const {label,...y}=x; this.g(y);
		if(label) this.primitive_of(label,"string");
	}
	/** @arg {ButtonRenderer} x */
	ButtonRenderer(x) {
		this.save_keys("[ButtonRenderer]",x);
		const {buttonRenderer,...y}=x; this.g(y);
		this.ButtonData(buttonRenderer);
	}
	/** @arg {ButtonData} x */
	ButtonData(x) {
		this.save_keys("[ButtonData]",x);
	}
	/** @arg {WatchNextEndScreenRenderer} x */
	WatchNextEndScreenRenderer(x) {
		this.save_keys("[WatchNextEndScreenRenderer]",x);
		const {watchNextEndScreenRenderer,...y}=x; this.g(y);
		this.WatchNextEndScreen(watchNextEndScreenRenderer);
	}
	/** @arg {WatchNextEndScreen} x */
	WatchNextEndScreen(x) {
		this.save_keys("[WatchNextEndScreen]",x);
		const {results,title,trackingParams,...y}=x; this.g(y);
		this.z(results,this.WatchNextEndScreenItem);
		this.SimpleText(title,this.handle_accessibility);
		this.trackingParams(trackingParams);
	}
	/** @arg {{accessibility?:Accessibility}} x */
	handle_accessibility(x) {
		if(x.accessibility) this.Accessibility(x.accessibility);
	}
	/** @arg {WatchNextEndScreenItem} x */
	WatchNextEndScreenItem(x) {
		this.save_keys("[WatchNextEndScreenItem]",x);
		if("endScreenVideoRenderer" in x) {
			return this.EndScreenVideoRenderer(x);
		} else if("endScreenPlaylistRenderer" in x) {
			return this.EndScreenPlaylistRenderer(x);
		}
		debugger;
	}
	/** @arg {EndScreenVideoRenderer} x */
	EndScreenVideoRenderer(x) {
		this.save_keys("[EndScreenPlaylistRenderer]",x);
		const {endScreenVideoRenderer,...y}=x; this.g(y);
		this.EndScreenVideo(endScreenVideoRenderer);
	}
	/** @arg {ThumbnailOverlayItem} x */
	ThumbnailOverlayItem(x) {
		this.save_keys("[ThumbnailOverlayItem]",x);
		if("thumbnailOverlayTimeStatusRenderer" in x) {
			return this.ThumbnailOverlayTimeStatusRenderer(x);
		} else if("thumbnailOverlayNowPlayingRenderer" in x) {
			return this.ThumbnailOverlayNowPlayingRenderer(x);
		}
		debugger;
	}
	/** @arg {ThumbnailOverlayNowPlayingRenderer} x */
	ThumbnailOverlayNowPlayingRenderer(x) {
		this.save_keys("[ThumbnailOverlayNowPlayingRenderer]",x);
		this.ThumbnailOverlayNowPlayingData(x.thumbnailOverlayNowPlayingRenderer);
	}
	/** @arg {ThumbnailOverlayNowPlayingData} x */
	ThumbnailOverlayNowPlayingData(x) {
		this.save_keys("[ThumbnailOverlayNowPlayingData]",x);
		const {text,...y}=x; this.g(y);
		this.TextWithRuns(text,this.NavigationEndpoint);
	}
	/** @arg {EndScreenVideo} x */
	EndScreenVideo(x) {
		this.save_keys("[EndScreenVideo]",x);
		const {videoId,thumbnail,title,thumbnailOverlays,shortBylineText,lengthText,...y1}=x;
		this.videoId(videoId);
		this.Thumbnail(thumbnail);
		this.SimpleText(title,this.handle_accessibility);
		this.z(thumbnailOverlays,this.ThumbnailOverlayItem);
		this.TextWithRuns(shortBylineText,this.NavigationEndpoint);
		this.SimpleText(lengthText,this.handle_accessibility);
		const {lengthInSeconds,navigationEndpoint,trackingParams,shortViewCountText,publishedTimeText,...y}=y1;
		this.primitive_of(lengthInSeconds,"number");
		this.WatchEndpoint(navigationEndpoint);
		this.g(y);
	}
	/** @arg {WatchEndpoint} x */
	WatchEndpoint(x) {
		this.save_keys("[WatchEndpoint]",x);
		const {clickTrackingParams,commandMetadata,watchEndpoint,...y}=x; this.g(y);
		this.clickTrackingParams(clickTrackingParams);
		if(commandMetadata) this.WatchEndpointCommandMetadata(commandMetadata);
		this.WatchEndpointData(watchEndpoint);
	}
	/** @arg {WatchEndpointData} x */
	WatchEndpointData(x) {
		this.save_keys("[WatchEndpointData]",x);
		const {videoId,playlistId,index,playlistSetVideoId,params,...y1}=x;
		this.videoId(videoId);
		if(playlistId) this.playlistId(playlistId);
		if(index!==void 0) this.primitive_of(index,"number");
		if(playlistSetVideoId!==void 0) this.primitive_of(playlistSetVideoId,"string");
		if(params!==void 0) this.primitive_of(params,"string");
		const {startTimeSeconds,...y2}=y1;
		if(startTimeSeconds!==void 0) this.primitive_of(startTimeSeconds,"number");
		const {continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,...y3}=y2;
		if(continuePlayback!==void 0&&!continuePlayback) debugger;
		if(loggingContext) this.VssLoggingContext(loggingContext);
		if(watchEndpointSupportedOnesieConfig) this.Html5PlaybackOnesieConfig(watchEndpointSupportedOnesieConfig);
		const {watchEndpointSupportedPrefetchConfig: a1,playerParams,...y4}=y3;
		if(a1) this.PrefetchHintConfig(a1);
		const {watchEndpointMusicSupportedConfigs: a2,...y_end}=y4; this.g(y_end);
	}
	/** @arg {PrefetchHintConfig} x */
	PrefetchHintConfig(x) {
		this.save_keys("[Html5PlaybackOnesieConfig]",x);
		this.PrefetchHintConfigData(x.prefetchHintConfig);
	}
	/** @arg {PrefetchHintConfigData} x */
	PrefetchHintConfigData(x) {
		this.save_keys("[Html5PlaybackOnesieConfig]",x);
		const {prefetchPriority: a1,playbackRelativeSecondsPrefetchCondition: b1,countdownUiRelativeSecondsPrefetchCondition: b2,...y}=x; this.g(y);
		this.primitive_of(a1,"number");
		if(a1!==0) {
			console.log("prePri",a1);
		}
		if(b1!==void 0) {
			this.primitive_of(b1,"number");
			console.log("playRelSecPC",b1);
		}
		if(b2!==void 0) {
			this.primitive_of(b2,"number");
			if(b2!==-3) console.log("CdUiRelSecPC",b2);
		}
	}
	/** @arg {Html5PlaybackOnesieConfig} x */
	Html5PlaybackOnesieConfig(x) {
		this.save_keys("[Html5PlaybackOnesieConfig]",x);
		const {html5PlaybackOnesieConfig,...y}=x; this.g(y);
		this.CommonConfig(html5PlaybackOnesieConfig);
	}
	/** @arg {CommonConfig} x */
	CommonConfig(x) {
		this.save_keys("[CommonConfig]",x);
		const {commonConfig,...y}=x; this.g(y);
		this.CommonConfigData(commonConfig);
	}
	/** @arg {CommonConfigData} x */
	CommonConfigData(x) {
		this.save_keys("[CommonConfigData]",x);
		const {url,...y}=x; this.g(y);
		this.x.get("parser_service").parse_url(url);
	}
	/** @arg {VssLoggingContext} x */
	VssLoggingContext(x) {
		this.save_keys("[VssLoggingContext]",x);
		const {vssLoggingContext,...y}=x; this.g(y);
		this.VssLoggingContextData(vssLoggingContext);
	}
	/** @arg {VssLoggingContextData} x */
	VssLoggingContextData(x) {
		this.save_keys("[VssLoggingContextData]",x);
		const {serializedContextData,...y}=x; this.g(y);
		this.primitive_of(serializedContextData,"string");
	}
	/** @arg {TextWithRuns} x @arg {(x:NavigationEndpoint)=>void} f_run */
	TextWithRuns(x,f_run=this.NavigationEndpoint) {
		if(!("runs" in x)) {debugger; return;}
		this.save_keys("[TextWithRuns]",x);
		const {runs,accessibility,...y}=x; this.g(y);
		this.z(runs,a => this.TextRun(a,f_run));
		if(accessibility) this.Accessibility(accessibility);
	}
	/** @arg {TextRun} x @arg {(x:NavigationEndpoint)=>void} f_run */
	TextRun(x,f_run=this.NavigationEndpoint) {
		const {text,...y}=x;
		if(y.navigationEndpoint) f_run.call(this,{navigationEndpoint: y.navigationEndpoint});
		this.primitive_of(text,"string");
	}
	/** @arg {ThumbnailOverlayTimeStatusRenderer} x */
	ThumbnailOverlayTimeStatusRenderer(x) {
		this.save_keys("[ThumbnailOverlayTimeStatusRenderer]",x);
		const {thumbnailOverlayTimeStatusRenderer,...y}=x; this.g(y);
		this.ThumbnailOverlayTimeStatus(thumbnailOverlayTimeStatusRenderer);
	}
	/** @arg {ThumbnailOverlayTimeStatus} x */
	ThumbnailOverlayTimeStatus(x) {
		this.save_keys("[ThumbnailOverlayTimeStatus]",x);
		const {text,style,...y}=x; this.g(y);
		this.SimpleText(text,this.handle_accessibility);
		if(style!=="DEFAULT") debugger;
	}
	/** @arg {EndScreenPlaylistRenderer} x */
	EndScreenPlaylistRenderer(x) {
		this.save_keys("[EndScreenPlaylistRenderer]",x);
		const {endScreenPlaylistRenderer,...y}=x; this.g(y);
		this.EndScreenPlaylist(endScreenPlaylistRenderer);
	}
	/** @arg {EndScreenPlaylist} x */
	EndScreenPlaylist(x) {
		this.save_keys("[EndScreenPlaylist]",x);
		const {playlistId,title,thumbnail,videoCount,longBylineText,videoCountText,navigationEndpoint,trackingParams,...y}=x; this.g(y);
		this.playlistId(playlistId);
		this.SimpleText(title,this.handle_accessibility);
		this.Thumbnail(thumbnail);
		this.TextT(longBylineText);
		if(videoCount!==void 0) this.primitive_of(videoCount,"string");
		this.TextWithRuns(videoCountText,this.NavigationEndpoint);
		this.WatchEndpoint(navigationEndpoint);
		this.trackingParams(trackingParams);
	}
	/** @arg {NavigationEndpoint} x */
	NavigationEndpoint(x) {
		this.save_keys("[NavigationEndpoint]",x);
		const {navigationEndpoint,...y}=x; this.g(y);
		return this.NavigationEndpointData(navigationEndpoint);
	}
	/** @arg {NavigationEndpointData} x */
	NavigationEndpointData(x) {
		this.save_keys("[NavigationEndpointData]",x);
		const {clickTrackingParams,commandMetadata,browseEndpoint,...y}=x; this.g(y);
		this.clickTrackingParams(clickTrackingParams);
		if(commandMetadata) this.NavigationEndpointCommandMetadata(commandMetadata);
		this.NavigationEndpointBrowseEndpoint(browseEndpoint);
	}
	/** @arg {NavigationEndpointBrowseEndpoint} x */
	NavigationEndpointBrowseEndpoint(x) {
		this.save_keys("[NavigationEndpointBrowseEndpoint]",x);
		const {browseId,canonicalBaseUrl,browseEndpointContextSupportedConfigs: a3,...y}=x; this.g(y);
		this.browseId(browseId);
		if(canonicalBaseUrl) this.canonicalBaseUrl(canonicalBaseUrl);
		if(a3) this.BrowseEndpointContextSupportedConfigs(a3);
	}
	/** @arg {BrowseEndpointContextSupportedConfigs} x */
	BrowseEndpointContextSupportedConfigs(x) {
		this.save_keys("[BrowseEndpointContextSupportedConfigs]",x);
		if("browseEndpointContextMusicConfig" in x) {
			return this.BrowseEndpointContextMusicConfig(x);
		}
		debugger;
	}
	/** @arg {BrowseEndpointContextMusicConfig} x */
	BrowseEndpointContextMusicConfig(x) {
		this.save_keys("[BrowseEndpointContextMusicConfig]",x);
		const {browseEndpointContextMusicConfig,...y}=x; this.g(y);
		this.BrowseEndpointContextMusicConfigData(browseEndpointContextMusicConfig);
	}
	/** @arg {BrowseEndpointContextMusicConfigData} x */
	BrowseEndpointContextMusicConfigData(x) {
		this.save_keys("[BrowseEndpointContextMusicConfigData]",x);
		const {pageType,...y}=x; this.g(y);
		this.save_enum("MUSIC_PAGE_TYPE",pageType);
		switch(pageType) {
			case "MUSIC_PAGE_TYPE_ALBUM": break;
			case "MUSIC_PAGE_TYPE_ARTIST": break;
			case "MUSIC_PAGE_TYPE_USER_CHANNEL": break;
			default: debugger; break;
		}
	}
	/** @arg {NavigationEndpointCommandMetadata} x */
	NavigationEndpointCommandMetadata(x) {
		this.save_keys("[NavigationEndpointCommandMetadata]",x);
		const {webCommandMetadata,...y}=x; this.g(y);
		this.VE3611_WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {VE3611_WebCommandMetadata} x */
	VE3611_WebCommandMetadata(x) {
		this.save_keys("[VE3611_WebCommandMetadata]",x);
		const {url,webPageType,rootVe,apiUrl,...y}=x; this.g(y);
		if(this.str_starts_with(url,"/@")) {
		} else if(this.str_starts_with(url,"/channel/UC")) {
		} else {
			debugger;
		}
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		this.rootVe(rootVe);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @arg {TextT} x */
	TextT(x) {
		this.save_keys("[TextT]",x);
		if("simpleText" in x) {
			return this.SimpleText(x);
		} else if("runs" in x) {
			return this.TextWithRuns(x);
		}
		debugger;
	}
	/** @arg {SimpleText} x @arg {(this:this,x:{accessibility?:Accessibility})=>void} f */
	SimpleText(x,f=this.handle_accessibility) {
		if(!("simpleText" in x)) {debugger; return;}
		this.save_keys("[SimpleText]",x);
		const {simpleText,...y}=x; f.call(this,y);
		this.primitive_of(simpleText,"string");
	}
	/** @arg {WatchEndpointCommandMetadata} x */
	WatchEndpointCommandMetadata(x) {
		this.save_keys("[WatchEndpointCommandMetadata]",x);
		const {webCommandMetadata,...y}=x; this.g(y);
		this.VE3832_WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {VE3832_CommandMetadata} x */
	VE3832_CommandMetadata(x) {
		this.save_keys("[VE3832_CommandMetadata]",x);
		const {webCommandMetadata,...y}=x; this.g(y);
		this.VE3832_WebCommandMetadata(webCommandMetadata);
	}
	/** @arg {VE3832_WebCommandMetadata} x */
	VE3832_WebCommandMetadata(x) {
		this.save_keys("[VE3832_WebCommandMetadata]",x);
		const {url,webPageType,rootVe,...y}=x; this.g(y);
		if(!this.str_starts_with(url,"/watch?")) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
		this.rootVe(rootVe);
	}
	/** @arg {keyof VEMap} x */
	rootVe(x) {
		this.on_root_visual_element(x);
	}
	/** @arg {TwoColumnWatchNextResults} x */
	TwoColumnWatchNextResults(x) {
		this.save_keys("[TwoColumnWatchNextResults]",x);
		const {twoColumnWatchNextResults,...y}=x; this.g(y);
		this.TwoColumnWatchNextResultsData(twoColumnWatchNextResults);
	}
	/** @arg {TwoColumnWatchNextResultsData} x */
	TwoColumnWatchNextResultsData(x) {
		this.save_keys("[TwoColumnWatchNextResultsData]",x);
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=x; this.g(y);
	}
	/** @private @arg {NotificationGetUnseenCountResponse} x */
	NotificationGetUnseenCountResponse(x) {
		if(x.actions) {
			if(x.actions.length!==1) debugger;
			this.z(x.actions,a => this.Action(a));
		}
		this.save_keys("[NotificationGetUnseenCountResponse]",x);
	}
	/** @private @arg {DatasyncIdsResponse} x */
	DatasyncIdsResponse(x) {
		this.save_keys("[DatasyncIdsResponse]",x);
	}
	/** @private @arg {GetAccountSwitcherEndpointResponse} x */
	GetAccountSwitcherEndpointResponse(x) {
		this.save_keys("[GetAccountSwitcherEndpointResponse]",x);
	}
	/** @private @arg {AccountsListResponse} x */
	AccountsListResponse(x) {
		this.save_keys("[AccountsListResponse]",x);
	}
	/** @private @arg {ReelItemWatchResponse} x */
	ReelItemWatchResponse(x) {
		this.save_keys("[ReelItemWatchResponse]",x);
	}
	/** @private @arg {AccountSetSetting} x */
	SetSettingResponse(x) {
		this.save_keys("[AccountSetSetting]",x);
	}
	/** @private @arg {FeedbackResponse} x */
	FeedbackResponse(x) {
		this.save_keys("[FeedbackResponse]",x);
	}
	/** @private @arg {GetTranscriptResponse} x */
	GetTranscriptResponse(x) {
		this.save_keys("[GetTranscriptResponse]",x);
	}
	/** @private @arg {SuccessResponse} x */
	SuccessResponse(x) {
		this.save_keys("[SuccessResponse]",x);
	}
	/** @private @arg {AttGetResponse} x */
	AttGetResponse(x) {
		this.save_keys("[AttGetResponse]",x);
	}
	/** @private @arg {GuideResponse} x */
	GuideResponse(x) {
		this.save_keys("[GuideResponse]",x);
	}
}
//#endregion
console=typeof window==="undefined"? console:(() => window.console)();
main();
