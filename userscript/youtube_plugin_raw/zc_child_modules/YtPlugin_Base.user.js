// ==UserScript==
// @name	YTPlugin Base Plugin
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://*.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/za_userscript_meta/YtPlugin_Base.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YtPlugin_Base.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
//#region module init
const __module_name__="mod$YoutubePluginBase";
/** @arg {keyof PluginStore} module_name @template {BaseModuleType} T @arg {(x:T)=>void} fn @arg {{global:boolean}} flags @arg {T} exports */
function do_export(fn,flags,exports,module_name) {
	/** @typedef {typeof exports} ExportsT */
	if(typeof exports==="object") {fn(exports);} else {
		/** @type {ExportsT} */
		let exports;
		if(flags.global) {
			/** @type {{}} */
			let win_exp=window;
			exports=as(win_exp);
		} else {
			window.__plugin_modules__??={};
			let all_modules=window.__plugin_modules__;
			exports=as(all_modules[module_name]??{});
			/** @type {{[U in keyof PluginStore]?:BaseModuleType}} */
			let ok_modules=all_modules;
			ok_modules[module_name]=as(exports);
		}
		fn(as(exports));
	}
}
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
function get_exports() {
	window.__plugin_modules__??={};
	let all_modules=window.__plugin_modules__;
	/** @type {{[U in keyof PluginStore]?:BaseModuleType}} */
	let ok_modules=all_modules;
	return ok_modules;
}
/** @template T @arg {T|undefined} x @returns {T} */
function required(x) {
	if(x===void 0) {throw new Error("missing required");}
	return x;
}
const path_map={
	/** @type {["mod","YoutubePluginBase"]} */
	["./YtPlugin_Base.user"]: ["mod","YoutubePluginBase"],
	/** @type {["mod","SupportService"]} */
	["./YTPlugin_Support_Service.user"]: ["mod","SupportService"],
	/** @type {["mod","ECatcherService"]} */
	["./YTPlugin_ECatcherService_Plugin.user"]: ["mod","ECatcherService"],
	/** @type {["mod","ServiceMethods"]} */
	["./YTPlugin_ServiceMethods.user"]: ["mod","ServiceMethods"],
	/** @type {["raw","DebugApi"]} */
	["../DebugApi_raw/DebugApi.user.js"]: ["raw","DebugApi"],
	/** @type {["mod","ServiceLoaderPlugin"]} */
	["./YtPlugin_ServiceLoader_Plugin.user"]: ["mod","ServiceLoaderPlugin"],
	/** @type {["mod","CodegenService"]} */
	["./YTPlugin_Codegen.user"]: ["mod","CodegenService"],
	/** @type {["mod","HandleTypes"]} */
	["./YTPlugin_HandleTypes.user"]: ["mod","HandleTypes"],
	/** @type {["mod","IndexedDBService"]} */
	["./YTPlugin_IndexedDB.user"]: ["mod","IndexedDBService"],
	/** @type {["mod","ParserService"]} */
	["./YTPlugin_Parser_Service.user"]: ["mod","ParserService"],
	/** @type {["sys","moment"]} */
	["moment"]: ["sys","moment"],
};
/** @template {keyof typeof path_map} T @arg {T} x */
function require(x) {
	window.__plugin_modules__??={};
	let M=window.__plugin_modules__;
	if(x===void 0) {throw new Error("missing required");}
	let loc=path_map[x];
	if(loc[0]==="raw") {
		let imp=M[loc[1]];
		return imp;
	}
	if(loc[0]==="sys") {
		return window[loc[1]];
	}
	let imp=M[`${loc[0]}$${loc[1]}`];
	if(!imp) {debugger; throw new Error("missing require path map");}
	return imp;
}
/** @template T @arg {T|null} x @returns {T} */
function non_null(x) {
	if(x===null) {throw new Error("null not expected");}
	return x;
}
export_(exports => {
	exports.non_null=non_null;
	exports.require=require;
},{global: true});
export_(exports => {
	exports.get_exports=get_exports;
	exports.do_export=do_export;
});
const log_imports=false;
export_(exports => {exports.__yt_plugin_log_imports__=log_imports;},{global: true});
export_(exports => {exports.__is_module_flag__=true;});
if(log_imports) console.log("Load PluginBase");
//#endregion
//#region basic
/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e,x=e) {return x;}
/** @private @template U @template T @arg {U} e @arg {any} [x] @returns {T} */
function as_any(e,x=e) {return x;}
export_(exports => {
	exports.as=as;
	exports.as_any=as_any;
});
//#endregion
//#region helper
/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {T_SplitOnce<S,D>} */
function split_string_once(s,d=as(",")) {
	if(!s) {debugger; return as_any([]);}
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
//#region constants
/** @private @type {YtdAppElement} */
const YtdAppElement=as({});
const is_yt_debug_enabled=false;
//#endregion
//#region vars
/** @private @type {InstanceType<typeof YtdAppElement>|null} */
let ytd_app=null;
/** @private @type {HTMLElement|null} */
let ytcp_app=null;
/** @private @type {HTMLElement|null} */
let ytmusic_app=null;
/** @private @type {Map<string, Blob|MediaSource>} */
let created_blobs=new Map;
/** @private @type {Set<string>} */
let active_blob_set=new Set;
/** @private @type {D_Saved} */
let saved_data=as({});
//#endregion
/** @private @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(x: T|X, _constructor_type:U)=>asserts x is X} */
function assume_assert_is_instanceof(_value,_constructor_type) {}
/** @private @type {<T, U extends abstract new (...args: any) => any, X extends InstanceType<U>>(v:T|X, _constructor_type:U)=>X} */
function as_instanceof(value,_constructor_type) {
	assume_assert_is_instanceof(value,_constructor_type);
	return value;
}
/** @private @template {{length:number;[x:number]:T[number]}} T */
class Iterator {
	i=0;
	/** @constructor @public @arg {T} x */
	constructor(x) {this.x=x;}
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
	[Symbol.iterator]() {return this;}
}
/** @private @template {{length:number;[x:number]:T[number]}} T @arg {T} x */
function make_iterator(x) {return new Iterator(x);}
//#endregion
//#region ui_plugin & on_${element}
class CustomEventTarget {
	/** @private @type {J_CustomEventTargetEvents} */
	_events={};
	/** @api @public @arg {J_HandlerInfoArgs} args */
	addEventListener(...args) {
		let [type,handler]=args;
		let ht1=this._events[type];
		if(ht1) {
			/** @type {NonNullable<J_CustomEventTargetEvents[keyof J_CustomEventTargetEvents]>[number][]} */
			let handlers=ht1;
			handlers.push(handler);
		} else {
			ht1=this._events[type]=[];
			/** @type {NonNullable<J_CustomEventTargetEvents[keyof J_CustomEventTargetEvents]>[number][]} */
			let handlers=ht1;
			handlers.push(handler);
		}
	}
	/** @api @public @arg {J_HandlerInfoArgs} args */
	removeEventListener(...args) {
		let [type,handler]=args;
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
			/** @type {(this: CustomEventTarget, event: CustomEventType) => void} */
			let cur=as(msg_arr[i]);
			cur.call(this,event);
		}
	}
}
export_(exports => {exports.CustomEventTarget=CustomEventTarget;});
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
			if(list.every(e => !e.active)) {this.port_to_resolvers_map.set(port,[]);}
			for(let x of list) {if(x.active) x.resolver();}
			if(list[0].active===false) {list.shift();}
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
			if(this.port_to_resolvers_map.has(port)) {if(this.port_to_resolvers_map.has(port)) this.port_to_resolvers_map.get(port)?.push(state);} else {this.port_to_resolvers_map.set(port,[state]);}
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
let waiting_for_ytd_player=false;
/** @private @type {number|null} */
let current_timeout=null;
function do_find_video() {
	if(!audio_gain_controller) return;
	const element_list=get_html_elements(document,"video");
	if(element_list.length<=0) return;
	let list=box_map.get("video-list");
	/** @private @type {boolean} */
	let first_run;
	if(list) {first_run=false;} else {
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
	} else {if(async_plugin_init.__debug) console.log("found extra video elements",new_elements);}
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
		setTimeout(function() {do_find_video();},80);
		let real_event=YTNavigateFinishEvent.cast(event);
		for(let handler of on_yt_navigate_finish) {handler(real_event);}
	});
	ytd_app.ui_plugin_style_element=ui_plugin_style_element;
	if(document.visibilityState==="visible") {
		ytd_app.app_is_visible=true;
		if(do_restart_video_playback) {
			fire_on_visibility_change_restart_video_playback();
			do_restart_video_playback=false;
		}
	} else {ytd_app.app_is_visible=false;}
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
		} else {ytd_app.app_is_visible=false;}
	});
}
/** @private @arg {AsyncPluginInitEvent} event */
function _plugin_init(event) {async_plugin_init(event).then(() => {},(e) => {console.log("async error",e);});}
/** @private @type {Element|null} */
let main_page_app=null;
/** @private @arg {AsyncPluginInitEvent} event */
async function async_plugin_init(event) {
	let plugin_state={};
	plugin_state.show_interesting_elements=true;
	let cur_count=1;
	let obj=dom_observer;
	let iter_count=0;
	try {
		while(true) {
			if(iter_count!==0) {await new Promise((soon) => setTimeout(soon,40));}
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
					if(e_tn==="LINK"&&e instanceof HTMLLinkElement) {if(e.rel==="stylesheet") return false;}
					if(e_tn=="IRON-ICONSET-SVG") return false;
					if(e_tn=="IRON-A11Y-ANNOUNCER") return false;
					if(e.id==="home-page-skeleton") return false;
					// cspell: ignore skeletonhidden
					if(e.id==="watch-page-skeleton"&&(
						e.classList.value==="watch-skeletonhidden"||
						e.classList.value==="watch-skeleton"
					)) return false;
					if(e.id==="player"&&e.classList.value==="skeleton flexy") return false;
					if(e.id==="watch7-content"&&e.classList.value==="watch-main-col") return false;
					if(e_tn=="svg") return false;
					let fut_data=[e.tagName,e.id,e.classList.value];
					window.yt_plugin?.save_string_arr("body_element",fut_data);
					return true;
				});
				if(ytd_app&&interesting_body_elements.includes(ytd_app)&&interesting_body_elements.length===1) break x;
				if(interesting_body_elements.length===1) {main_page_app=interesting_body_elements[0];} else {
					console.log(interesting_body_elements);
					debugger;
				}
				plugin_state.show_interesting_elements=false;
			}
			// BEGIN(ytd-app): obj.dispatchEvent({type: "find-ytd-app",detail,port});
			{
				let found=iterate_ytd_app();
				if(found) {found_element_count++;}
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
				event.detail.elements.on_yt_playlist_manager(target_element);
			}
			// BEGIN(ytd-watch-flexy): obj.dispatchEvent({type: "find-ytd-watch-flexy",detail,port});
			x: {
				if(ytd_watch_flexy) break x;
				if(!ytd_page_manager) break x;
				if(!ytd_page_manager.getCurrentPage()) break x;
				/** @private @template T @arg {T|undefined} x @arg {(e:T)=>void} w */
				function using(x,w) {if(x) {w(x);} }
				if(!ytd_page_manager.getCurrentPage()?.__has_theater_handler_plugin) {
					ytd_page_manager.getCurrentPage()?.addEventListener("yt-set-theater-mode-enabled",update_ui_plugin);
					using(ytd_page_manager.getCurrentPage(),e => e.__has_theater_handler_plugin=true);
				}
				if(is_yt_debug_enabled) console.log("PageManager:current_page:"+ytd_page_manager.getCurrentPage()?.tagName.toLowerCase());
				if(ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()!="ytd-watch-flexy") {
					if(iter_count>100) {console.log("found current_page [%s] at iter=%o",ytd_page_manager.getCurrentPage()?.tagName.toLowerCase(),iter_count);}
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
			if(iter_count>max_find_iter) {alert("found plugin reqs in iters="+iter_count);}
			obj.dispatchEvent({...event,type: "plugin-activate"});
			break;
		}
	} catch(e) {console.log("had error in async init",e);}
}
//#endregion
//#region dom_observer & yt_plugin_event
let found_element_count=0;
let expected_element_count=6;
async_plugin_init.__debug=false;
let _player_overlay_style_str=`
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
			if(!container_dom_parent) {throw new Error("Missing masthead container center");}
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
	getGain() {return this.gain_controller.getGain();}
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
function to_url(url) {if(url instanceof URL) {return url;} else {return new URL(url);} }
/** @private @arg {Error} rejection @returns {Promise<Response>} */
function fetch_rejection_handler(rejection) {
	if(rejection instanceof DOMException) {throw rejection;}
	if(rejection instanceof TypeError) {throw rejection;}
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
	get() {return this.override_value.value;}
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
			let proxy_override=new Proxy(value,{apply(...arr) {return t.on_target_apply_callback(arr);} });
			this.proxy_map.set(value,proxy_override);
			this.override_value.value=proxy_override;
		}
	}
}
/** @private @arg {{}} object @arg {PropertyKey} property @arg {PropertyHandler} property_handler */
function override_prop(object,property,property_handler) {
	Object.defineProperty(object,property,{
		get() {return property_handler.get();},
		set(value) {return property_handler.set(value);}
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
class R_HandleRichGrid_Base {
	enable_logging=false;
	/** @readonly */
	class_name="HandleRichGridRenderer";
	/** @readonly */
	entry="richGridRenderer";
	/** @constructor @public @arg {DefaultServiceResolver} x */
	constructor(x) {this.rendererContentItemArray=new HandleRendererContentItemArray(x);}
	/** @handler @public @arg {string} path @arg {Todo_D_RichGrid} renderer */
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
			if(filtered.length>0) {renderer.contents=filtered;}
		}
	}
}
// based on https://web.archive.org/web/20190504040958/http://ntt.cc/2008/01/19/base64-encoder-decoder-with-javascript.html
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
	/** @arg {Uint8Array} binary_arr */
	encode(binary_arr) {
		let output="";
		let chr1,chr2,chr3;
		let enc1,enc2,enc3,enc4;
		chr1=chr2=chr3=0;
		enc1=enc2=enc3=enc4=0;
		let i=0;
		do {
			chr1=binary_arr[i++];
			chr2=binary_arr[i++];
			chr3=binary_arr[i++];
			enc1=chr1>>2;
			enc2=((chr1&3)<<4)|(chr2>>4);
			enc3=((chr2&15)<<2)|(chr3>>6);
			enc4=chr3&63;
			if(isNaN(chr2)) {
				output+=this._keyStr.charAt(enc1);
				output+=this._keyStr.charAt(enc2);
			} else if(isNaN(chr3)) {
				output+=this._keyStr.charAt(enc1);
				output+=this._keyStr.charAt(enc2);
				output+=this._keyStr.charAt(enc3);
				enc4=64;
			} else {
				output+=this._keyStr.charAt(enc1);
				output+=this._keyStr.charAt(enc2);
				output+=this._keyStr.charAt(enc3);
				output+=this._keyStr.charAt(enc4);
			}
			chr1=chr2=chr3=0;
			enc1=enc2=enc3=enc4=0;
		} while(i<binary_arr.length);
		return output;
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
function indexOutOfRange(reader,writeLength) {return RangeError("index out of range: "+reader.pos+" + "+(writeLength||1)+" > "+reader.len);}
class MyReader {
	noisy_log_level=false;
	/** @constructor @public @arg {Uint8Array} buf  */
	constructor(buf) {
		this.buf=buf;
		this.pos=0;
		this.len=buf.length;
		this.last_pos=0;
	}
	/** @api @public @arg {number} off */
	offset(off) {
		this.pos+=off;
		this.last_pos=this.pos;
	}
	/** @api @public @arg {number} size */
	read_bytes(size) {
		let ret=this.buf.slice(this.pos,this.pos+size);
		this.pos+=size;
		return ret;
	}
	/** @api @public @arg {number} [size] */
	try_read_any(size) {try {return this.read_any(size);} catch {return null;} }
	/** @private @arg {number} [size] */
	reset_and_read_any(size) {return this.read_any(size,0);}
	/** @private */
	_use() {this.reset_and_read_any(0);}
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
		if(size===void 0) {this.cur_len=this.len;} else {this.cur_len=this.pos+size;}
		this.failed=false;
		try {return this.read_any_impl();} finally {
			this.pos=prev_pos;
			this.cur_len=prev_len;
			this.failed=was_failed;
		}
	}
	cur_len=0;
	/** @private */
	read_any_impl() {
		this.failed=false;
		/** @private @type {D_ProtobufWireFormat[]} */
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
			if(this.failed) {break;}
			if(log_slow&&loop_count>128) {
				console.log("taking a long time to read protobuf data");
				log_slow=false;
			}
			if(!log_slow&&loop_count%4096==0) {console.log("taking a very long time to read protobuf data",loop_count/4096|0);}
		}
		/** @private @type {D_ProtobufObj[]} */
		let res_arr=[];
		for(let i=0;i<data.length;i++) {
			let cur=data[i];
			let [_fieldId,_type,decoded_data]=cur;
			for(let item of decoded_data) {res_arr.push(item);}
		}
		return res_arr;
	}
	/** @private @template T @arg {number} pos @arg {()=>T} f */
	revert_to(pos,f) {
		let prev_pos=this.pos;
		this.pos=pos;
		try {return f();} finally {this.pos=prev_pos;}
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
		if(length!==void 0) {if(this.noisy_log_level) console.log("asked to skip %o bytes",this.pos-start_pos);} else {if(this.noisy_log_level) console.log("asked to skip %o bytes of VarInt",this.pos-start_pos);}
	}
	uint32() {
		this.last_pos=this.pos;
		let ret=this.do_uint32_read();
		let diff=this.pos-this.last_pos;
		if(diff!==1) {if(this.noisy_log_level) console.log("at %o uint32 consumed %o bytes",this.last_pos,diff);}
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
		function into_entries(e,n) {return [n,e];}
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
	indexOutOfRange(writeLength) {return RangeError("index out of range: "+this.pos+" + "+(writeLength||1)+" > "+this.len);}
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
		/** @private @type {D_ProtobufObj[]} */
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
				x: try {num32=this.uint32();} catch {
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
					} else {first_num.push(["data32",fieldId,num32]);}
				} else {first_num.push(["data32",fieldId,num32]);}
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
				/** @private @type {D_ProtobufObj} */
				try {this.skip(size);} catch {
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
				} else {first_num.push(["child",fieldId,sub_buffer,null]);}
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
/** @private @type {any[]} */
let mk_tree_arr=[];
function act_found_create_yt_player(/** @private @type {{ data: { type: string; data: [any, any, any]; }; }} */ event) {
	function plr_raw_replace_embed() {return;}
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
	let tr=event.data.type;
	if(tr!="yt.player.Application.createAlternate"&&tr!="yt.player.Application.create") return;
	let [,,value]=event.data.data;
	let [,player_config,static_config]=value;
	if(!player_config) return;
	if(static_config.isEmbed) {
		void player_config;
		plr_raw_replace_embed();
	} else {plr_raw_replace(player_config);}
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
	addEventListener(ev_name,fn) {(this._events[ev_name]??=[]).push({disposed: false,handler: fn});}
}
/** @private @arg {{ value?: any; value_tr?: any; value_of?: any; noisy_flag?: any; }} cc @arg {string} ms @arg {{}} obj @arg {string} [mc] */
function walk_key_path(cc,ms,obj,mc) {
	let fs;
	let mt=ms.match(cc.value_tr);
	if(mt!==null) {fs=mt[0];} else {return mc;}
	let f2=ms.slice(fs.length+1);
	let dx=f2.indexOf(".");
	let pq;
	if(dx>-1) {pq=f2.slice(0,dx);} else {pq=f2;}
	if(pq.length>0) {
		if((cc.value_tr+"."+pq)==mc) {return cc.value_tr+"."+pq;}
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
	if(!act_cb_obj.fired&&cc.function_value) {ret=cc.function_value.apply(val,args);} else {ret=act_cb_obj.ret;}
	return ret;
}
/** @private @arg {MKState} cc */
function on_mk_function_property(cc) {
	/** @this {{}} */
	function with_this(/** @private @type {any} */ ...args) {new_pv_fn(this,cc,...args);}
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
	run() {return mk_run(this);}
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
	if(as_instanceof(obj,WithGhostSymbol)[ghost_symbol]===undefined) {on_mk_new_property(cc,obj);} else {cc.value=obj;}
}
/** @private @arg {MKState} cc */
function mk_run(cc) {
	if(locked_set.has(cc.target)&&locked_set.get(cc.target).names.indexOf(cc.property_key)>-1) {return cc;}
	Object.defineProperty(cc.target,cc.property_key,{
		configurable: true,
		enumerable: true,
		get() {return cc.value;},
		set(val) {on_mk_property_set(cc,val);}
	});
	if(locked_set.has(cc.target)) {locked_set.get(cc.target).names.push(cc.property_key);} else {locked_set.set(cc.target,{names: [cc.property_key]});}
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
	ytd_watch_flexy.addEventListener("yt-navigate",function(event) {for(let handler of on_yt_navigate) {handler(event);} });
}
/** @private @type {string[]} */
let page_type_changes=[];
function is_watch_page_active() {
	if(!ytd_page_manager?.getCurrentPage()) {return false;}
	return ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()==="ytd-watch-flexy";
}
/** @private @arg {Node} value */
function as_node(value) {return value;}
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
	constructor(value) {this.value=value;}
}
class YTNavigateFinishEvent {
	/** @api @public @arg {Event} value @return {YTNavigateFinishEvent} */
	static cast(value) {
		/** @private @type {any} */
		let ret=value;
		return ret;
	}
	/** @api @public @type {G_NavFinishDetail} */
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
dom_observer.addEventListener("async-plugin-init",_plugin_init);
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

function fire_observer_event() {dom_observer.notify_with_port(message_channel.port1);}
/** @private @arg {AsyncPluginEventDetail["handle_types"]} handle_types @arg {AsyncPluginEventDetail["elements"]} elements */
function start_message_channel_loop(handle_types,elements) {
	message_channel=new MessageChannel();
	message_channel.port2.onmessage=on_port_message;
	if(top===window) {
		dom_observer.dispatchEvent({
			type: port_state.current_event_type,
			detail: {
				handle_types,
				elements,
			},
			port: message_channel.port1,
		});
	}
}
/** @private @arg {Document|Element} node @arg {string} child_node_tag_name */
function get_html_elements(node,child_node_tag_name) {return node.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",child_node_tag_name);}
/** @private @type {((event:{})=>void)[]} */
var on_yt_navigate=[];
async function wait_for_yt_player() {
	if(!ytd_player) {throw new Error("No ytd_player to await");}
	await ytd_player.playerResolver_.promise;
}
function _close_div_scope() {
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
	plugin_overlay_element.setAttribute("style",_player_overlay_style_str);
	plugin_overlay_element.append(overlay_content_div);
	plugin_overlay_element.append(input_modify_css_style);
	plugin_overlay_element.append(overlay_hide_ui_input);
	dom_observer.addEventListener("plugin-activate",yt_watch_page_loaded_handler);
	document.addEventListener("yt-action",on_yt_action);
	/** @private @type {string[]} */
	let playlist_arr=[];
	on_yt_navigate_finish.push(log_current_video_data);
	function title_text_overlay_update() {
		if(title_text_overlay_enabled) {
			overlay_hide_ui_input.style.color="";
			if(title_on) {overlay_content_div.style.display="";} else {overlay_content_div.style.display="none";}
		} else {
			overlay_hide_ui_input.style.color="#888";
			overlay_content_div.style.display="none";
		}
	}
	function page_changed_next_frame() {
		if(!plugin_overlay_element) return;
		if(!ytd_page_manager) return;
		ytd_page_manager.getCurrentPage()?.append(as_node(plugin_overlay_element));
	}
	function yt_watch_page_loaded_handler() {
		if(!is_watch_page_active()) {return;}
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
		ytd_page_manager.addEventListener("yt-page-type-changed",function() {
			if(!ytd_player) return;
			if(!ytd_page_manager) return;
			setTimeout(function() {do_find_video();},80);
			if(ytd_page_manager.getCurrentPage()?.tagName.toLowerCase()!="ytd-watch-flexy") {
				ytd_player.is_watch_page_active=false;
				plugin_overlay_element&&plugin_overlay_element.remove();
				return;
			} else {ytd_player.is_watch_page_active=true;}
			requestAnimationFrame(page_changed_next_frame);
		});
	}
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
				if(next_element instanceof HTMLElement) {cur_element=next_element;} else {break;}
			}
			return cache;
		}
		let player_offset=sumOffset(ytd_player);
		plugin_overlay_element.style.top=player_offset.top_offset+"px";
		plugin_overlay_element.style.left=player_offset.left_offset+"px";
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
	/** @private @arg {Event|CustomEvent<{actionName:"yt-fullscreen-change-action", args:[boolean]}>|CustomEvent<{actionName:string}>} event */
	function on_yt_action(event) {
		if(!("detail" in event)) {
			console.log("[on_yt_action] event [yt-action] has no detail (not a CustomEvent)");
			return;
		}
		let {detail}=event;
		if(is_yt_fullscreen_change_action(detail)) {
			let {args}=detail;
			update_plugin_overlay_location();
			setTimeout(update_plugin_overlay_location);
			title_text_overlay_enabled=!args[0];
			title_text_overlay_update();
		}
	}
	function title_display_toggle() {
		title_on=!title_on;
		title_text_overlay_update();
		if(no_storage_access) return;
		localStorage["title_save_data"]=JSON.stringify({value: title_on});
	}
}
let no_storage_access=false;
let title_save;
try {title_save=localStorage.getItem("title_save_data");} catch {no_storage_access=true;}
if(!title_save) {
	title_save="{\"value\":false}";
	if(!no_storage_access) {localStorage.setItem("title_save_data",title_save);}
}
export_(exports => {exports.no_storage_access=no_storage_access;});
let title_text_overlay_enabled=true;
let title_on=JSON.parse(title_save).value;
/** @private @type {(detail:any)=>detail is {actionName:"yt-fullscreen-change-action", args:[boolean]}} */
function is_yt_fullscreen_change_action(detail) {return detail.actionName==="yt-fullscreen-change-action";}
function update_ui_plugin() {if(is_yt_debug_enabled) console.log("update_ui_plugin");}
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
	@media screen and (max-width: 1260px) {#rh_css {display: none;}}
	#i_r_css {outline: none;}
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
	onKeyDown(event) {this.last_event=event;}
	/** @private @arg {AudioNode[]} node_chain */
	init_node_chain(node_chain) {for(let i=0;i<node_chain.length-1;i++) {node_chain[i].connect(node_chain[i+1]);} }
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
	setGain(gain) {this.gain_node.gain.value=gain;}
	getGain() {return this.gain_node.gain.value;}
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
/** @private @template {string} T @template {{}} U @template {T_Split<T,",">} C @returns {{[I in Exclude<keyof U,C[number]>]:U[I]}} @type {__ia_excludeKeysS} */
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
/** @private @template T @template U */
class ServiceResolver {
	/** @constructor @public @arg {T} services @arg {U} params */
	constructor(services,params) {
		this.services=services;
		this.params=params;
	}
	/** @api @public @arg {keyof U} key */
	get_param(key) {return this.params[key];}
	/** @api @public @template {keyof T} V @arg {V} key */
	get(key) {return this.services[key];}
}
//#endregion
//#region main
function yt_plugin_base_main() {
	const {ServiceLoader}=require("./YtPlugin_ServiceLoader_Plugin.user");
	const log_enabled_page_type_change=false;
	/** @private @type {DefaultServiceResolver} */
	const resolver_value={
		value: null,
		listeners: [],
	};
	const services=new ServiceLoader(resolver_value);
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
	export_((exports) => {exports.services=services;});
	resolver_value.value=service_resolver;
	services.on_resolve_services(resolver_value.listeners,service_resolver);
	_close_div_scope();
	on_yt_navigate_finish.push(log_page_type_change);

	// modify global section
	window.yt_plugin=services.yt_plugin;
	override_prop(window,"getInitialData",new PropertyHandler(do_proxy_call_getInitialData));
	services.modify_env.modify_global_env();

	// required for message_channel_loop
	/** @private @arg {HTMLElement} element */
	function on_yt_playlist_manager(element) {
		const element_id="yt-playlist-manager";
		if(is_yt_debug_enabled) console.log(`on ${element_id}`);
		element_map.set(element_id,element);
		yt_playlist_manager=element;
		services.yt_plugin.yt_playlist_manager=element;
	}

	// wait for plugin requirements
	start_message_channel_loop(services.handle_types,{on_yt_playlist_manager});
	/** @private @arg {[()=>G_NavFinishDetail["response"], object, []]} apply_args */
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
			if(!target_element) {throw new Error("Missing ytd_page_manager");} else {on_ytd_page_manager(target_element);}
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
export_((exports) => {
	exports.ServiceResolver=ServiceResolver;
	exports.VolumeRange=VolumeRange;
	exports.sizeof_js=sizeof_js;
});
//#endregion
//#region string manipulation
/** @private @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {T_Split<X,string extends S?",":S>} */
function split_string(x,s=as(",")) {
	if(!x) {debugger;}
	let r=x.split(s);
	return as(r);
}
/** @private @arg {WA|null} _wa @template {string} WA @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {TI_SplitOnce<WA,S,D>} */
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
/** @private @arg {WA|null} _wx @template {string} S @template {string} WA @arg {S} s @template {string} D @arg {D} d @returns {TI_SplitOnce_NE<WA,S,D>} */
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
const general_service_state={
	logged_in: false,
	/** @private @type {{datasyncId: (BigInt|null)[]}|null} */
	mainAppWebResponseContext: null,
	/** @private @type {number|null} */
	maxAgeSeconds: null,
	/** @private @type {"non_member"|null} */
	premium_membership: null,
};
class ApiBase2 {
	/** @public @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf<T>} */
	get_keys_of(obj) {
		if(!obj) {debugger;}
		let rq=Object.keys(obj).map(v => {
			/** @returns {number|string} */
			function mk() {return parseInt(v,10);}
			/** @type {string|number} */
			let pn=mk();
			if(Number.isNaN(pn)) return v;
			if(pn!=v) return v;
			return pn;
		});
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	/** @protected @template {string|number|bigint|boolean} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length) return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a)) return false;
		}
		return true;
	}
}
export_(exports => {exports.ApiBase2=ApiBase2;});
class ApiBase extends ApiBase2 {
	/** @protected @template {any[]} T @arg {T} a */
	exact_arr(...a) {return a;}
	xa=this.exact_arr;
	/** @protected @template {string} S @arg {S} x @returns {Capitalize<S>} */
	uppercase_first(x) {
		let rr=x[0].toUpperCase()+x.slice(1);
		/** @type {Capitalize<S>} */
		let rt=as(rr);
		return rt;
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
		if(!ret.length) {for(let k of x) {ret.push(k);} }
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
	_primitive_of(x,y) {if(typeof x!==y) debugger;}
	/** @protected @template {{}} B @template {B} U @arg {{}} x @arg {B} _b @returns {Partial<B>} */
	upgrade_obj(x,_b) {
		/** @private @type {Partial<B>} */
		let cd=x;
		/** @private @type {Partial<U|B>} */
		let id=cd;
		return id;
	}
	/** @protected @template {string} T @arg {T} t @returns {TP_ParseUrlSearchParams<T>} */
	parse_url_search_params(t) {
		let sp=new URLSearchParams(t);
		/** @private @type {any} */
		let as_any=Object.fromEntries(sp.entries());
		return as_any;
	}
	/** @protected @template {string} T @arg {T} t @returns {TP_KeyofSearchParams<T>} */
	keyof_search_params(t) {
		let tmp=this.parse_url_search_params(t);
		let ret=[];
		for(let k in tmp) {ret.push(k);}
		/** @type {any} */
		let as_any=ret;
		/** @type {TP_KeyofSearchParams<T>} */
		let ret_val=as_any;
		return ret_val;
	}
}
//#endregion
//#region Service
class ServiceWithResolver extends ApiBase {
	#x;
	/** @constructor @public @arg {DefaultServiceResolver} x */
	constructor(x) {
		super();
		this.#x=x;
	}
	/** @protected @returns {NonNullable<DefaultServiceResolver["value"]>} */
	get x() {return as_any(this.#x.value);}
	/** @arg {(x:DefaultServiceResolver_2)=>void} cb */
	addOnServicesListener(cb) {this.#x.listeners.push(cb);}
}
class PrivateAccessorCache extends ServiceWithResolver {
	get x_Renderer() {return this.x.get("x_Renderer");}
	get handle_types() {return this.x.get("handle_types");}
	get indexed_db() {return this.x.get("indexed_db");}
	get parser() {return this.x.get("parser_service");}
	get codegen() {return this.x.get("codegen");}
	get service_methods(/**/) {return this.x.get("service_methods");}
	get x_methods() {return this.x.get("x_methods");}
	get save_db() {return this.x.get("save_db");}
}
class ServiceWithAccessors extends ServiceWithResolver {
	get parser() {return this.x.get("parser_service");}
	get cg() {return this.x.get("codegen");}
	get sm(/**/) {return this.x.get("service_methods");}
	get xm() {return this.x.get("x_methods");}
	get save_db() {return this.x.get("save_db");}
	//#region Service Cache
	/** @private */
	get z_xr() {return this.x.get("x_Renderer");}
	/** @private */
	get z_ht() {return this.x.get("handle_types");}
	/** @private */
	get z_ix() {return this.x.get("indexed_db");}
	/** @type {PrivateAccessorCache["x_Renderer"]|null} */
	_xr=null;
	get xr() {
		if(this._xr) return this._xr;
		this._xr=this.z_xr;
		return this._xr;
	}
	/** @type {PrivateAccessorCache["handle_types"]|null} */
	_ht=null;
	get ht() {
		if(this._ht) return this._ht;
		this._ht=this.z_ht;
		return this._ht;
	}
	/** @type {PrivateAccessorCache["indexed_db"]|null} */
	_ix=null;
	get ix() {
		if(this._ix) return this._ix;
		this._ix=this.z_ix;
		return this._ix;
	}
	//#endregion
}
class TextDecoderExt {
	decoder=new TextDecoder("utf-8",{fatal: false});
	/** @arg {BufferSource} buffer */
	decode(buffer) {
		try {
			return this.decoder.decode(buffer);
		} catch {
			return null;
		}
	}
}
class ServiceWithMembers extends ServiceWithAccessors {
	/** @public */
	_decoder=new TextDecoderExt;
	/** @protected @type {string[]} */
	logged_keys=[];
}
class BaseService extends ServiceWithMembers {
	/** @public @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {T} x @arg {(this:this,x:T[K])=>U} f */
	H_s(k,x,f) {
		let tm=this;

		x: if(!(tm instanceof ServiceData)) {
			/** @type {(...args:any[])=>void} */
			let a_fn=f;
			if(a_fn===this.xm.D_Label) break x;
			if(a_fn!==void 0) break x;
			debugger; return;
		}
		this.sm.H_cls(this,k,x,f);
	}
	/** @public @template U @arg {CF_T_GM} cf @template T @arg {{sendPost: true;apiUrl: T;}} x @arg {(this:this,x:T)=>U} f */
	T_GM(cf,x,f) {
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(sendPost!==true) debugger;
		return f.call(this,apiUrl);
	}
	/** @api @public @template {{}} T @arg {CF_M_s} cf @arg {T} x */
	s(cf,x) {
		if(!x) debugger;
		this.sm.k(cf,x);
		return x;
	}
	/** @public @template {CF_M_y} T_CF  @arg {T_CF} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K],cf:`${T_CF}.${K}`)=>U} f */
	y(cf,k,x,f) {return f.call(this,this.sm.w(cf,k,x),`${cf}.${k}`);}
	/**
	 * @protected @template {CF_T_WCM} T_CF @arg {T_CF} cf @template {{webCommandMetadata:any;}} T @template U @arg {T} x @arg {(this:this,x:T["webCommandMetadata"],cf:`G${T_CF}`)=>U} f
	 * @returns {[U,Omit<T,"webCommandMetadata">]}
	 * */
	T_WCM(cf,x,f) {
		const {webCommandMetadata: a,...y}=this.s(cf,x);
		let ret=f.call(this,a,`G${cf}`);
		return [ret,y];
	}
	/**
	 * @protected @template R_D,R_M
	 * @template {Extract<keyof T_Endpoint,KA_EndpointKey>} T_Key @template {TE_Endpoint_3<any,any,any>} T_Endpoint @arg {T_Endpoint} x
	 * @param {T_Key} k
	 * @param {(this:this,x:T_Endpoint["commandMetadata"])=>R_M} f1 @arg {(this:this,x:T_Endpoint[T_Key])=>R_D} f2
	 * @returns {[typeof y,R_M,R_D]}
	 */
	TE_Endpoint_3_v2(k,x,f1,f2) {
		let keys=this.get_keys_of(x);
		let s=new JsonReplacerState({
			text_decoder: this._decoder,
			cf: k,keys,is_root: true,
		});
		let cf=this.cg.get_auto_type_name(s,x);
		const {clickTrackingParams,commandMetadata,[k]: a,...y}=this.s(cf,x); y;
		this.sm.clickTrackingParams(clickTrackingParams);
		const r1=f1.call(this,commandMetadata),r2=f2.call(this,a);
		return [y,r1,r2];
	}
	/** @public @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {T} x @arg {(this:this,x:T[K])=>U} f */
	H_(k,x,f) {
		if(f===void 0) {debugger; return;}
		this.sm.H_cls(this,k,x,f);
	}
	//#region string replace
	/** @public @arg {string} s @arg {RegExp} rx @arg {(s:string,v:string)=>string} fn */
	replace_until_same(s,rx,fn) {
		if(s===void 0) debugger;
		let i=0;
		let ps=s;
		do {
			let p=s;
			let ts=s.replaceAll(rx,fn);
			if(ts===void 0) debugger;
			s=ts;
			ps=p;
			if(i>12) break;
		} while(ps!==s);
		return s;
	}
	/** @arg {string} x */
	trim_brackets(x) {
		/** @type {`[${string}]`} */
		let y=as(x);
		return this.save_db.unwrap_brackets(y);
	}
	//#endregion
	//#region make
	/** @arg {string} k @template T @arg {T} x @returns {make_one_t<T>} */
	make_one_t(k,x) {const b="item",c="one"; return {a: "group_value",b,c,f: k,z: [x]};}
	/** @arg {string} k @template T @arg {T[]} x @returns {make_arr_t<T>} */
	make_arr_t(k,x) {const b="item",c="arr"; return {a: "group_value",b,c,f: k,z: [x]};}
	//#endregion
	//#region save
	/** @protected @arg {string} k @arg {bigint} x */
	save_bigint(k,x) {return this.save_db.data_store.get_store("bigint").save_data(k,this.make_one_t(k,x));}
	/** @protected @arg {string} k @arg {boolean} x */
	save_boolean_one(k,x) {return this.save_db.data_store.get_store("boolean").save_data(k,this.make_one_t(k,x));}
	/** @public @arg {string} k @arg {{}} x */
	save_keys(k,x) {this.save_db.data_store.get_store("keys").save_keys(k,x);}
	/** @protected @arg {string} k @arg {string} x */
	save_string(k,x) {return this.save_db.data_store.get_store("string").save_data(k,this.make_one_t(k,x));}
	/** @public @arg {string} k @arg {string[]} x */
	save_string_arr(k,x) {return this.save_db.data_store.get_store("string").save_data(k,this.make_arr_t(k,x));}
	/** @protected @arg {string} k @arg {number} x */
	save_number(k,x) {return this.save_db.data_store.get_store("number").save_data(k,this.make_one_t(k,x));}
	/** @protected @arg {string} k @arg {number[]} x */
	save_number_arr(k,x) {return this.save_db.data_store.get_store("number").save_data(k,this.tag_num_like(k,x));}
	/** @protected @arg {string} k @arg {Uint8Array} x */
	save_number_bin(k,x) {
		return this.save_db.save_to_data_store("number",this.tag_num_like(k,x));
		//	return this.save_db.data_store.get_store("number").save_data(k,this.tag_num_like(k,x));
	}
	/** @protected @arg {D_GM_VeNum} x */
	save_ve_element(x) {
		const k="ve_element";
		this.save_db.data_store.get_store("root_visual_element").save_data(k,this.make_one_t(k,x));
	}
	//#endregion
	/** @arg {string} k @arg {number[]|Uint8Array} a */
	tag_num_like(k,a) {
		let r=[];
		let ty;
		if(a instanceof Uint8Array) {
			ty=`__type__\0uint8\0array\0\0`;
		} else {
			ty="__type__\0number\0array\0\0";
		}
		for(let v of ty) r.push(v.charCodeAt(0));
		return this.make_arr_t(k,[...r,...a]);
	}
	/** @protected @arg {string} cf @template {string} T @template {`${T}${"_"|"-"}${string}`} U @arg {T} ns @arg {U} k */
	save_enum(cf,ns,k) {return this.save_db.save_enum_impl(cf,ns,k);}
	//#region accessors
	//#endregion
	//#region redirect member functions
	/** @public @arg {string} cf @arg {{}} x */
	codegen_typedef(cf,x,do_break=true) {this.cg.codegen_typedef(cf,x,do_break,false);}
	//#endregion
	//#region template methods that make objects
	/**
	 * @param {Z_Item} z @arg {J} j @arg {T_Key} key
	 * @template J @template Z_Item @template T_Key
	 * @returns {{key:T_Key,a: "ST:D";b:"boxed_id",j:J,w:"/db/key/a/b/j/w/z",z:[Z_Item]}}
	 * */
	make_ST_jz(key,j,z) {return {key,a: "ST:D",b: "boxed_id",j,w: "/db/key/a/b/j/w/z",z: [z]};}
	/**
	 * @param {Z_Item} z @arg {J} j @arg {T_Key} key
	 * @template J @template Z_Item @template T_Key
	 * @returns {{a: "SS:D";b:"boxed_id",j:J,z:[Z_Item],key:T_Key}}
	 * */
	make_SS_abjz(key,j,z) {return {a: "SS:D",b: "boxed_id",j,z: [z],key};}
	/**
	 * @param {Z} z @arg {B} b @arg {C} c
	 * @template B,C @template Z
	 * @returns {{a: "DI:A";b:B,c:C,z:Z}}
	 * */
	make_abcz(b,c,z) {return {a: "DI:A",b,c,z};}
	/**
	 * @param {Z} z @arg {B} b
	 * @template B @template Z
	 * @returns {{a: "DI:A";b:B,w:"a/b/w/z"; z:[Z]}}
	 * */
	make_abwz(b,z) {return {a: "DI:A",b,w: "a/b/w/z",z: [z]};}
	/**
	 * @param {T} z @arg {K} b
	 * @template K @template T
	 * @returns {DI_T_abwz_item<K,T>}
	 * */
	make_abwz_item(b,z) {return {a: "DI:A",b,w: "/item/a/b/w/z",z: [z]};}
	/**
	 * @param {Z} z @arg {K} k
	 * @template K @template Z
	 * @returns {{a:"key_value"; k:K,w: "/item/a/k/w/z",z:[Z]}}
	 * */
	make_akz(k,z) {return {a: "key_value",k,w: "/item/a/k/w/z",z: [z]};}
	/**
	 * @param {Z} z @arg {A} a @arg {E} e
	 * @template A,E @template Z
	 * @returns {{a:A,e:E,z:[Z]}}
	 * */
	make_aez(a,e,z) {return {a,e,z: [z]};}
	/** @template {string} Z @param {Z} z @returns {T_PrimitiveBox_E<Z,"string">} */
	make_prim_v(z) {return {a: "primitive",e: "string",z: [z]};}
	//#endregion
	/** @public @template {string} X @arg {X} x @template {string} S @arg {S} s @returns {X extends infer X1?T_Split<X1,string extends S?",":S>:never} */
	split_str(x,s=as(",")) {
		if(!x) {debugger;}
		let r=x.split(s);
		return as(r);
	}
	/** @public @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
	join_string(x,s) {
		if(!x) {debugger;}
		let r=x.join(s);
		return as(r);
	}
	/** @protected @template {`https://${string}`|`http://${string}`} T @arg {T} str @returns {UrlParse<T>} */
	_convert_url_to_obj(str) {
		let s=new URL(str);
		/** @private @type {any} */
		let a=s;
		/** @private @type {UrlParse<T>} */
		let ret=a;
		return ret;
	}
	/** @protected @arg {string} str */
	_decode_b64_proto_obj(str) {
		let buffer=base64_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @protected @arg {string} str */
	_decode_b64_url_proto_obj(str) {
		let buffer=base64_url_dec.decodeByteArray(str);
		if(!buffer) return null;
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @public @template {string} T @template {string} U @arg {T} str @arg {U} ends_str @returns {x is (T extends `${infer B}${infer R}`?`${B}${Some<R>}${string}${U}`:`${string}${U}`)} */
	str_ends_with(str,ends_str) {return str.endsWith(ends_str);}
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_rx(needle,str) {return str.startsWith(needle);}
	/** @protected */
	get TODO_true() {return true;}
	/** @protected @template {string} T @template {string} Sep @template {`${T}${Sep}${string}`} U @arg {T} enum_base @arg {U} enum_str @arg {Sep} sep */
	save_enum_with_sep(enum_base,enum_str,sep) {
		const ns_name="ELEMENT";
		let n1=split_string_once(enum_str,enum_base);
		if(!n1[1]) throw new Error();
		let n2=n1[1];
		if(sep!=="") {
			let sd=this.drop_separator(n1[1],sep);
			this.save_string(`${ns_name}::${enum_base}`,sd);
		} else {this.save_string(`${ns_name}::${enum_base}`,n2);}
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
	/** @protected @template {{}} T @arg {T} x */
	is_empty_object(x) {
		let keys=this.get_keys_of(x);
		if(!keys.length) return true;
		return false;
	}
	/** @private @template {{}} T @arg {T extends Record<string, never>?T:{} extends T?T_DistributedKeysOf<T> extends []?T:never:never} x */
	on_empty_object(x) {
		if(!x) {debugger; return;}
		let keys=this.get_keys_of(x);
		if(!keys.length) return;
		let jk=keys.join();
		if(this.logged_keys.includes(jk)) return;
		this.logged_keys.push(jk);
		console.log("[empty_object] [%s]",jk);
		debugger;
	}
	//#region short names
	/** @protected @name iterate_obj @arg {{}|undefined} x @arg {(this:this,k:string,v: {})=>void} f */
	v(x,f) {if(x===void 0) return; this.z(Object.entries(x),e => f.call(this,e[0],e[1]));}
	/** @public @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]}  */
	z(x,f) {
		if(x===void 0||!x.entries) {debugger; return [[],[]];}
		/** @private @type {any[]} */
		let c=[];
		/** @private @type {any[]} */
		let v=[];
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			let u=f.call(this,a,i);
			if(u!=null) {c.push(u); continue;}
			v.push(u);
		}
		return [c,v];
	}
	/** @protected @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]} @arg {T} _ex */
	z_ty(x,f,_ex) {return this.z(x,f);}
	// takes undefined (as None), returns undefined (as None)
	/** @protected @template {string} CF @arg {CF} cf @template {{}} T @arg {T[]|undefined} x @arg {(this:this,cf:CF,x:T)=>void} f */
	tz_cf(cf,x,f) {if(x===void 0) return; return this.z_cf(cf,x,f);}
	// takes (undefined | non-array) (as None), returns undefined (as None)
	/** @protected @template {string} CF @arg {CF} cf @template {{}} U @arg {U[]} x @arg {(this:this,cf:CF,x:U,i:number)=>void} f  */
	z_cf(cf,x,f) {if(x===void 0||!x.entries) {debugger; return;} return this.z(x,(x,i) => f.call(this,cf,x,i));}
	/** @protected @template {{}} T @arg {T extends Record<string, never>?T:{} extends T?T_DistributedKeysOf<T> extends []?T:never:never} x */
	g(x) {this.on_empty_object(x);}
	/** @public @template {{}} T @arg {({} extends T?T_DistributedKeysOf<T> extends []?T:never:never)|null|undefined} x */
	tg_base(x) {this.t_base(x,this.g);}
	// takes nullish (as None), returns null (as None)
	/** @public @template U @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>U} f */
	t_base(x,f) {if(x==null) return null; return f.call(this,x);}
	/** @public @template U @template {{}} T @arg {T[]|null|undefined} x @arg {(this:this,x:T)=>U} f */
	tz(x,f) {if(x==null) return null; return this.z(x,f);}
	// takes null (as None), returns undefined (as None)
	/** @protected @template {string} CF_T @arg {CF_T} cf @template {{}} T @arg {T|null} x @arg {(this:this,cf:CF_T,x:T)=>void} f */
	tn_cf(cf,x,f) {if(x===null) return; f.call(this,cf,x);}
	// takes undefined (as None), returns null (as None)
	/** @protected @template {string} CF_T @arg {CF_T} cf @template T @template U @arg {T|undefined} x @arg {(this:this,cf:CF_T,x:T)=>U} f */
	t_cf(cf,x,f) {if(x===void 0) return null; return f.call(this,cf,x);}
	// takes undefined (as None), returns undefined (as None)
	/** @private @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	tv(f,x) {if(!x) return; return f.call(this,x);}
	// closes over x, returns t map fn
	/** @protected @template Z @template {{}} Y @arg {(this:this,y:Y)=>Z} x @returns {(y:Y|undefined)=>Z|undefined} */
	tf=x => y => this.tv(x,y);
	//#region T_Optional
	/** @template T @arg {T} x @returns {Some<T>} */
	some(x) {return {type: "s",v: x};}
	/** @template T @arg {T} x @returns {Some<T>} */
	m(x) {return this.some(x);}
	/** @template T @arg {Some<T>} x */
	mw(x) {
		/** @template ST @template {this} CU */
		class SomeEx {
			/** @arg {CU} cls @arg {Some<ST>} x */
			constructor(cls,x) {
				this.cls=cls;
				this.some=x;
			}
			/** @arg {(this:this["cls"],x:ST)=>U} f @template U */
			mc(f) {
				let s=f.call(this.cls,this.some.v);
				return new SomeEx(this.cls,this.cls.m(s));
			}
		}
		return new SomeEx(this,x);
	}
	/** @template T @arg {Some<T>} x @returns {T} */
	mu(x) {return x.v;}
	/** @arg {(this:this,x:T)=>U} y @template T @arg {Some<T>} x @template U @returns {Some<U>} */
	mt(x,y) {return this.m(y.call(this,x.v));}
	/** @arg {(this:this,x:T)=>U} y @template {{}} T @template {Some<T[]>} Opt @arg {Opt} x @template U */
	mz(x,y) {return this.mt(x,x => this.z(x,y));}
	/** @arg {(this:this,x:T)=>U} f @template T @arg {Some<T>} m @template U */
	mb(f,m) {return this.mt(m,f);}
	/** @template T @arg {T} x @template U @arg {(this:this,x:T)=>U} y @returns {Some<U>} */
	ms(x,y) {return this.mt(this.m(x),y);}
	/** @template {{}} T @arg {T|undefined} x @template U @arg {(this:this,x:T)=>U} y @returns {Some<U|null>} */
	ms_t(x,y) {return this.ms(x,x => this.t_base(x,y));}
	/** @template {{}} T @arg {Some<T|null>} x @template U @arg {(this:this,x:T)=>U} y @returns {Some<U|null>} */
	mt_t(x,y) {return this.mt(x,x => this.t_base(x,y));}
	/** @template {string} T_CF @arg {T_CF} cf @arg {(this:this,cf:T_CF,x:T)=>U} f @template T @arg {Some<T>} m @template U @returns {Some<U|null>} */
	mt_cf(m,cf,f) {return this.mt(m,x => this.t_cf(cf,x,f));}
	//#endregion
}
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
	/** @constructor @public @arg {DefaultServiceResolver} res */
	constructor(res) {
		super(res);
		this.filter_handler_debug=false;
		this.handlers={
			rich_grid: new R_HandleRichGrid_Base(res),
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
			if(typeof req=="string") {return {url: to_url(req)};}
			if(req instanceof URL) {return {url: req};}
			return {url: to_url(req.url)};
		}
		let parsed_url=convert_to_url(request).url;
		/** @private @type {D_ApiUrlFormat} */
		let api_url=as(parsed_url.href);
		let url_type=this.sm.decode_url(api_url);
		const res_parse=this._convert_url_to_obj(api_url);
		let ss1=split_string_once(res_parse.pathname,"/")[1];
		let get_ss2=() => {
			if(this.str_starts_with_rx("youtubei/v1/",ss1)) {return split_string_once(ss1,"youtubei/v1/")[1];} else {return ss1;}
		};
		let ss2=get_ss2();
		if(!url_type) {
			debugger;
			/** @private @type {DU_UrlType} */
			let url_h=as(this.join_string(split_string(ss2,"/"),"."));
			url_type=url_h;
		}
		if(!url_type) throw new Error("Unreachable");
		this.handle_any_data(url_type,data);
		let res=this.sm.decode_input(url_type,data);
		if(res) {this.x.get("x_GenericApi").G_ResponseTypes(response,res);} else {console.log("failed to decode_input");}
		this.iteration.default_iter({t: this,path: url_type},data);
	}
	/** @private @arg {DU_UrlType|`page_type_${G_NavFinishDetail["pageType"]}`} path @arg {GD_SD_Item} data */
	handle_any_data(path,data) {
		saved_data.any_data??={};
		/** @private @type {D_AnySaved} */
		let merge_obj={[path]: data};
		saved_data.any_data={...saved_data.any_data,...merge_obj};
		this.iteration.default_iter({t: this,path},data);
	}
	known_page_types=split_string("settings,watch,browse,shorts,search,channel,playlist",",");
	do_initial_data_trace=false;
	/** @api @public @arg {[()=>G_NavFinishDetail["response"], object, []]} apply_args */
	on_initial_data(apply_args) {
		/** @private @type {G_NavFinishDetail["response"]} */
		let ret=Reflect.apply(...apply_args);
		if(!("page" in ret)) {return ret;}
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
		switch(ret.page) {
			case "browse": {
				const x=ret;
				x: if("rootVe" in x) {if(x.rootVe!==3854) break x; this.x.get("x_EventInput").DataResponsePageType(x); break;}
				x: if("rootVe" in x) {if(x.rootVe!==6827) break x; this.x.get("x_EventInput").DataResponsePageType(x); break;}
				x: if("rootVe" in x) {if(x.rootVe!==96368) break x; this.x.get("x_EventInput").DataResponsePageType(x); break;}
				if(this.sm.is_TE_VE(x.endpoint,3854)) {
				}
			} break;
			case "channel":
			case "playlist":
			case "search":
			case "settings":
			case "shorts":
			case "watch": this.x.get("x_EventInput").DataResponsePageType(ret); break;
		}
		this.iteration.default_iter({t: this,path: ret.page},ret);
		let page_type=window.ytPageType;
		if(!page_type) {
			debugger;
			return ret;
		}
		/** @private @template {U[]} T @template U @arg {T} a @arg {U} t */
		function includes(a,t) {return a.includes(t);}
		if(!includes(this.known_page_types,page_type)) {
			console.log("unknown page type",page_type);
			debugger;
		}
		return ret;
	}
	/** @api @public @arg {G_NavFinishDetail} detail */
	on_page_type_changed(detail) {
		try {
			if(this.do_initial_data_trace) console.log('ptc detail',detail);
			this.x.get("x_EventInput").YTNavigateFinishDetail(detail);
		} catch(e) {
			console.log("plugin error");
			console.log(e);
			debugger;
			try {
				this.x.get("x_EventInput").YTNavigateFinishDetail(detail);
			} catch {}
		}
	}
}
class HandleRendererContentItemArray extends BaseService {
	flag_log_debug=false;
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
		if("reelItemRenderer" in rc) return true;
		let rk=this.get_keys_of(rc);
		console.log("[rich_item_renderer.content] [%s]",...rk);
		{debugger;}
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
			if(rich_shelf.icon.iconType==="YOUTUBE_SHORTS_BRAND_24") {return false;}
			console.log("rich shelf icon",rich_shelf,rich_shelf.icon);
			return true;
		}
		let t=rich_shelf.title;
		if(t.runs) {if(t.runs[0].text==="Breaking news") return false;}
		// console.log("rich shelf",rich_shelf);
		// debugger;
		return true;
	}
	/** @api @public @template {(G_RendererContentItem|Extract<(DC_ReloadContinuationItems|AD_AppendContinuationItems),{continuationItems:any}>["continuationItems"][number])[]} T @arg {T} arr @returns {T} */
	replace_array(arr) {
		return as(arr.filter((/** @private @type {typeof arr[number]} */content_item) => {
			if("richItemRenderer" in content_item) {return this.filter_for_rich_item_renderer(content_item);}
			if(!("richSectionRenderer" in content_item)) return true;
			return this.handle_rich_section_renderer(content_item);
		}));
	}
}
/** @typedef {{t:YtHandlers;path:string}} ApiIterateState */
class YtObjectVisitor {
	/** @handler @public @arg {ApiIterateState} state @arg {AD_AppendContinuationItems} action */
	appendContinuationItemsAction(state,action) {
		if(!action.continuationItems) {debugger;}
		let filtered=state.t.handlers.renderer_content_item_array.replace_array(action.continuationItems);
		if(filtered.length>0) {action.continuationItems=filtered;}
	}
	/** @handler @public @arg {ApiIterateState} state @arg  {DC_ReloadContinuationItems} command */
	reloadContinuationItemsCommand({t: state},command) {
		if(!("continuationItems" in command)) return;
		/** @type {(typeof command)["continuationItems"][number][]} */
		let iterable_items=command.continuationItems;
		let filtered=state.handlers.renderer_content_item_array.replace_array(iterable_items);
		if(filtered.length>0) {command.continuationItems=as(filtered);}
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
		state.t.handlers.rich_grid.richGridRenderer(state.path,renderer);
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
class IterateApiResultBase extends BaseService {
	/** @constructor @public @arg {DefaultServiceResolver} x @arg {YtObjectVisitor} obj_visitor */
	constructor(x,obj_visitor) {
		super(x);
		this.obj_visitor=obj_visitor;
		/** @private @type {Map<string,keyof YtObjectVisitor>} */
		this.keys_map=new Map;
		let keys=this.get_keys_of_ex(obj_visitor);
		for(let i of keys) {this.keys_map.set(i,i);}
	}
	/** @api @public @arg {ApiIterateState} state @arg {{}} data */
	default_iter(state,data) {
		if(data===void 0) {return;}
		if(typeof data==="string") {return;}
		let {t,path}=state;
		if(data instanceof Array) {
			for(let [key,value] of data.entries()) {this.default_iter({t,path: `${path}[${key}]`},value);}
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
		this.save_string("rid_key",x.key);
	}
	/** @private @arg {{key:T_RidFormat<string>;value:`0x${string}`}} x */
	decode_rid_section(x) {
		let section=/[A-Z][a-z]+/.exec(x.key);
		if(section) {
			let section_id=section[0].toLowerCase();
			this.save_string("section_id",section_id);
		} else {debugger;}
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
		if(!this.str_ends_with(param.key,"_rid")) {
			console.log("new csi param",param);
			debugger;
			return;
		}
		this.rid[param.key]=param.value;
	}
	/** @private @type {{[x: T_RidFormat<string>]: `0x${string}`|undefined;}} */
	rid={};
	/** @constructor @public @arg {DefaultServiceResolver} x */
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
		for(let x of this.rid_keys) {this.rid[x]=void 0;}
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
					this.save_string(`CsiService.${param.key}`,param.value);
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
class GFeedbackService extends BaseService {
	data={
		/** @private @type {number[]|null} */
		e: null,
		/** @private @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
		/** @private @type {SP_GFeedbackServiceRouteParam["value"]|null} */
		route: null,
	};
	get handle_types() {return this.x.get("handle_types");}
	/** @private @type {string[]} */
	seen_e_param=[];
	has_new_e_param=false;
	/** @private @arg {Extract<RC_To_SPs<SP_GFeedbackVarMap>[number],{key:"e"}>} param */
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
	/** @api @public @arg {SP_GFeedbackServiceParamsType} params */
	on_params(params) {
		for(let param of params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.sm.browseId(param.value); break;
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
				case "route": {this.parse_route_param(param);} break;
				default: console.log("[param_key]",param); debugger;
			}
			this.maybe_new_e();
		}
	}
	/** @private @arg {SP_GFeedbackServiceRouteParam} x */
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
class GuidedHelpService extends BaseService {
	data={
		/** @private @type {"yt_web_unknown_form_factor_kevlar_w2w"|null} */
		context: null,
	};
	/** @api @public @arg {SP_GuidedHelp_SPs["params"]} params */
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
	/** @private @arg {RC_Csi_SPs} service */
	on_csi_service(service) {this.x.get("csi_service").on_params(service.params);}
	/** @private @arg {RC_ECatcher_SPs} service */
	on_e_catcher_service(service) {this.x.get("e_catcher_service").on_params(service.params);}
	/** @private @arg {RC_GFeedback_SPs} service */
	on_g_feedback_service(service) {this.x.get("g_feedback_service").on_params(service.params);}
	/** @private @arg {SP_GuidedHelp_SPs} service */
	on_guided_help_service(service) {this.x.get("guided_help_service").on_params(service.params);}
	get handle_types() {return this.x.get("handle_types");}
	/** @private @arg {RC_GoogleHelp_SPs} service */
	on_google_help_service(service) {
		for(let param of service.params) {
			switch(param.key) {
				case "browse_id_prefix": if(param.value!=="") debugger; break;
				case "browse_id": this.sm.browseId(param.value); break;
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
class ModifyEnv extends BaseService {
	/** @private @type {[(obj: Blob|MediaSource) => string,typeof URL,Blob|MediaSource][]} */
	leftover_args=[];
	modify_global_env() {
		let yt_handlers=this.x.get("yt_handlers");
		let handle_types=this.x.get("handle_types");
		/** @private @arg {string|URL|Request} request @arg {Response} response @arg {G_RS_AllResponses} response_obj */
		function fetch_filter_text_then_data_url(request,response,response_obj) {
			try {yt_handlers.on_handle_api(request,response,response_obj);} catch(e) {
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
					try {obj=Reflect.apply(...proxy_args);} catch(e) {
						console.log("target error",e);
						throw e;
					} finally {JSON.parse=original_json_parse;}
					if(is_yt_debug_enabled) console.log("request.url");
					fetch_filter_text_then_data_url(request,state.response,obj);
					return obj;
				}
			});
			let ret;
			try {if(onfulfilled) {ret=onfulfilled(response_text);} else {ret=response_text;} } catch(err) {
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
				then(onfulfilled,onrejected) {return result.result.then(bind_promise_handler(input,state,onfulfilled,onrejected));},
				/** @private @type {<TResult = never>(onrejected?: ((reason: any) => TResult|PromiseLike<TResult>)|null|undefined) => Promise<any>} */
				catch(onrejected) {return result.result.catch(onrejected);},
				finally(onfinally) {return result.result.finally(onfinally);},
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
				get redirected() {return response.redirected;}
				get ok() {return response.ok;}
				get status() {return response.status;}
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
					if(ks==="then") {return void 0;}
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
			if(typeof user_request==="string"&&user_request.startsWith("https://www.gstatic.com")) {return original_fetch(user_request,request_init);}
			handle_types.request_start_time=Date.now();
			let ret=original_fetch(user_request,request_init);
			let ret_1=ret.then(fetch_promise_handler.bind(null,user_request,request_init),fetch_rejection_handler);
			return ret_1;
		}
		let t=this;
		URL.createObjectURL=new Proxy(URL.createObjectURL,{
			/** @private @arg {typeof URL["createObjectURL"]} target @arg {typeof URL} thisArg @arg {[Blob|MediaSource]} args */
			apply(target,thisArg,args) {
				let [url_source,...rest]=args;
				if(rest.length>0) {t.leftover_args.push([target,thisArg,url_source,...rest]);}
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
			if(typeof args[0]==="string"&&args[0].indexOf("/api/stats/qoe")>-1) {return true;}
			console.log("send_beacon",args[0]);
			return navigator_sendBeacon.call(this,...args);
		};
	}
}
//#endregion Service
//#region YtPlugin
class YtPlugin extends BaseService {
	static init_once=false;
	/** @arg {YtPlugin} instance */
	static do_init(instance) {
		if(this.init_once) return;
		this.init_once=true;
		export_(exports => {
			exports.modules=new Map;
			exports.modules.set("yt",instance);
		});
	}
	get indexed_db() {return this.x.get("indexed_db");}
	/** @private @type {[string,{name: string;}][]} */
	saved_function_objects=[];
	/** @constructor @public @arg {DefaultServiceResolver} x */
	constructor(x) {
		super(x);
		YtPlugin.do_init(this);
	}
	/** @type {HTMLElement|null} */
	yt_playlist_manager=null;
	/** @api @public @template {{name:string}} T @arg {T} function_obj */
	add_function(function_obj) {
		if(!this.saved_function_objects) return;
		this.saved_function_objects.push([function_obj.name,function_obj]);
	}
}
function h_detect_firefox() {
	let ua=navigator.userAgent;
	return ua.includes("Gecko/")&&ua.includes("Firefox/");
}
const is_firefox=h_detect_firefox();
export_(exports => {exports.is_firefox=is_firefox;});
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
	if(count>1024) {throw new Error("Too big");}
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
		try {ent=Object.entries(obj);} catch(e) {
			console.log("failed_to_get_entries",e,obj);
			size=1;
			break x;
		}
		for(let x of ent) {size+=sizeof_js(x[1]);}
	}
	sizeof_cache.set(obj,size);
	return size;
}
//#endregion
//#region HandleTypesSupport
class ServiceData extends BaseService {
	/** @protected @type {GA_FormatItagNum[]} */
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
//#endregion
class ParentWalker {
	/** @arg {JsonReplacerState} store @arg {unknown} obj */
	constructor(store,obj) {
		this.store=store;
		this.obj=obj;
	}
	get() {
		return this.obj;
	}
	get_parent() {
		let parent_info=this.store.parent_map.get(this.obj);
		if(!parent_info) return null;
		let [index]=parent_info;
		return new ParentWalker(this.store,this.store.object_store[index]);
	}
}
class JsonReplacerState {
	/** @constructor @public @arg {D_JsonReplacerArgs} args */
	constructor(args) {
		this.object_count=0;
		this.cur_cf=args.cf;
		this.key_keep_arr=args.keys;
		this.is_root=args.is_root;
		/** @api @public @type {unknown[]} */
		this.object_store=[];
		/** @api @public @type {Map<unknown,[number,string]>} */
		this.parent_map=new Map;
		this.text_decoder=args.text_decoder;
		/** @type {string[]} */
		this.cf_stack=[];
		this.cur_key="";
		/** @api @public @type {unknown[]} */
		this.object_store=[];
		/** @api @public @type {Map<unknown,[number,string]>} */
		this.parent_map=new Map;
	}
	/** @arg {string} cf */
	set_cf(cf) {
		this.cf_stack.push(this.cur_cf);
		this.cur_cf=cf;
	}
	pop_cf() {
		this.cur_cf=required(this.cf_stack.pop());
	}
	/** @arg {unknown} x */
	get_parent_walker(x) {
		return new ParentWalker(this,x);
	}
	/** @arg {string} key @arg {unknown} obj */
	next_key(key,obj) {
		let s=this;
		let x=obj;
		if(!s.object_store.includes(x)) {
			s.object_store.push(x);
			let mi=s.object_store.indexOf(x);
			s.parent_map.set(x,[mi,key]);
			if(mi%300==290) debugger;
		}
	}
	/** @arg {object|null} obj */
	next_key_obj(obj) {
		let s=this;
		let x=obj;
		if(x instanceof Uint8Array) return;
		if(x===null) return;
		let mi=s.object_store.indexOf(x);
		let xi=Object.entries(x);
		for(let [k_in,val] of xi) {
			if(s.object_store.includes(val)) continue;
			s.object_store.push(val);
			s.parent_map.set(val,[mi,k_in]);
		}
	}
}
export_(exports => {exports.JsonReplacerState=JsonReplacerState;});
//#region exports
export_((exports) => {
	exports.ServiceData=ServiceData;
});
export_((exports) => {
	exports.split_string_once=split_string_once;
	exports.base64_dec=base64_dec;
	exports.AudioGainController=AudioGainController;
	exports.split_string_once_last=split_string_once_last;
	exports.make_iterator=make_iterator;
	exports.yt_plugin_base_main=yt_plugin_base_main;
});
export_(exports => {exports.ApiBase=ApiBase;});
export_(exports => {exports.ServiceWithResolver=ServiceWithResolver;});
export_(exports => {exports.ServiceWithAccessors=ServiceWithAccessors;});
export_(exports => {
	exports.BaseService=BaseService;
	exports.YtPlugin=YtPlugin;
	exports.ModifyEnv=ModifyEnv;
	exports.CsiService=CsiService;
	exports.GFeedbackService=GFeedbackService;
	exports.GuidedHelpService=GuidedHelpService;
	exports.TrackingServices=TrackingServices;
	exports.YtHandlers=YtHandlers;
});
export_(exports => {exports.start_message_channel_loop=start_message_channel_loop;});
export_(exports => {
	exports.MyReader=MyReader;
	exports.split_string=split_string;
	exports.split_string_once_ex=split_string_once_ex;
});
export_(exports => {exports.base64_url_dec=base64_url_dec;});
export_(exports => {exports.is_firefox=is_firefox;});
export_(exports => exports.__module_loaded__=true);
//#endregion
//#region global exports
export_((exports) => {exports.__youtube_plugin_base_loaded__=true;},{global: true});
//#endregion
