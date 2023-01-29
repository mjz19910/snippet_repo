// ==UserScript==
// @name	YtPlugin Codegen Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.0
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2022
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/youtube_plugin.user.js
// ==/UserScript==

if(__yt_plugin_log_imports__) console.log("Load Codegen Service");

const __module_name__="mod$CodegenService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const as=required(bs.as_);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {
	bs.do_export(fn,flags,exports,__module_name__);
}
export_(exports => {
	exports.__is_module_flag__=true;
});
class JsonReplacerState {
	/** @constructor @public @arg {string} gen_name @arg {string[]} keys */
	constructor(gen_name,keys) {
		this.object_count=0;
		this.gen_name=gen_name;
		this.key_keep_arr=keys;
		this.k1="";
		/** @api @public @type {unknown[]} */
		this.object_store=[];
		/** @api @public @type {Map<unknown,[number,string]>} */
		this.parent_map=new Map;
	}
}
const BaseService=required(store.mod$YoutubePluginBase).BaseService;
const split_string_once=required(store.mod$YoutubePluginBase).split_string_once;
/** @template {string} T @template {string} D @arg {T} s @arg {D} d */
function split_string_once_last(s,d) {
	return bs.split_string_once_last(s,d,null);
}
/** @template T_LoadAllServices,T_ServiceFlags @extends {BaseService<T_LoadAllServices,T_ServiceFlags>} */
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
	#R_ThumbnailStr() {
		/** @private @type {R_Thumbnail} */
		return "R_Thumbnail";
	}
	/** @no_mod @arg {string[]} req_names @arg {{}} x @arg {string[]} keys @arg {string|number} t_name */
	#codegen_renderer_body(req_names,x,keys,t_name) {
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
			if("simpleText" in x2) {ret_arr.push(`this.D_Text(${k});`); continue;};
			/** @private @type {D_Text} */
			if("runs" in x2&&x2.runs instanceof Array) {ret_arr.push(`this.D_Text(${k});`); continue;};
			if(x2 instanceof Array) {this.#generate_body_array_item(k,x2,ret_arr); continue;}
			if(this.#is_Thumbnail(x2)) {ret_arr.push(`this.${this.#R_ThumbnailStr()}(${k});`); continue;}
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
	#codegen_padding(x) {
		return x.replaceAll(/(?:d\d!)*d(\d)!/g,(_v,g) => {
			return "\t".repeat(g);
		});
	}
	/** @no_mod @arg {unknown} x @arg {string|null} r_name */
	#codegen_renderer(x,r_name=null) {
		if(typeof x!=='object') return null;
		if(x===null) return null;
		/** @private @type {string[]} */
		let req_names=[];
		let k=this.get_name_from_keys(x);
		if(r_name) k=r_name;
		if(k===null) return null;
		console.log("gen renderer for",x);
		let t_name=this.uppercase_first(k);
		let keys=Object.keys(x);
		let body=this.#codegen_renderer_body(req_names,x,keys,t_name);
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
			let body_2=this.#codegen_renderer_body(next_req,x,keys_2,t_name);
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
		let tmp3=this.#codegen_padding(tmp2);
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
	/** @api @public @arg {string} cf @arg {{}} x  @arg {boolean} [ret_val] @returns {string|null|void} */
	codegen_typedef(cf,x,ret_val) {
		let new_typedef=this.#_codegen_typedef(cf,x);
		if(ret_val) return new_typedef;
		if(new_typedef) {
			if(!this.typedef_cache.includes(new_typedef)) {
				this.typedef_cache.push(new_typedef);
				console.log(new_typedef);
			}
		}
	}
	/** @private @arg {string} o @arg {string} k1 */
	typedef_json_replace_string(o,k1) {
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
	/** @arg {string} x */
	filter_typedef_part_gen(x) {
		let x_arr=x.split("\n");
		x_arr=x_arr.map(e => e.trim());
		x_arr=x_arr.map(e => e.match(/;$/)? e.slice(0,-1):e);
		return x_arr.reduce((prev,cur) => {
			if(cur==="") return prev+cur;
			if(cur==="}") return prev+";"+cur;
			if(cur==="]") return prev+";"+cur;
			if(prev.match(/[\w">]$/)) {
				return prev+"; "+cur;
			}
			return prev+cur;
		},"");
	}
	/** @template {{}} T @arg {T} x */
	get_typedef_part(x) {
		let gn=this.get_name_from_keys(x);
		if(!gn) return null;
		let gr=this.#_codegen_typedef(gn,x);
		if(!gr) return null;
		let gr_f=this.filter_typedef_part_gen(gr);
		let sr=split_string_once(gr_f,"=")[1];
		if(!sr) return null;
		if(sr.endsWith(";")) {
			sr=sr.slice(0,-1);
		}
		return sr;
	}
	/** @arg {{}} x @returns {T_SE_Signal<{},{}>} */
	as_T_SE_Signal=x => as(x);
	/** @arg {{}} x @returns {TR_MP_Menu<{}>} */
	as$TR_MP_Menu=x => as(x);
	/** @arg {{}} x @returns {T_Signal<string>} */
	as$T_Signal=x => as(x);
	/** @typedef {string|[string]|{}|null} JsonReplacementType */
	/** @private @arg {JsonReplacerState} state @arg {{[U in string]: unknown}} x @arg {string} k1 @returns {JsonReplacementType} */
	typedef_json_replace_object(state,x,k1) {
		let g=() => this.json_auto_replace(x);
		const {gen_name: r,key_keep_arr}=state;
		if(x instanceof Array) {
			if(key_keep_arr.includes(k1)) return [x[0]];
			return [x[0]];
		}
		x: if(this.is_GuideEntrySimple(x)&&typeof x.icon==="object"&&x.icon) {
			/** @type {{iconType?:string}} */
			let ru=x.icon;
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
			let kk=this.get_keys_of(x);
			if(this.eq_keys(kk,["navigationEndpoint","icon","trackingParams","formattedTitle","accessibility","entryData"])) {
				if(!o(x.navigationEndpoint)?.browseEndpoint) {
					/** @type {TD_GuideEntry_EntryData<any>} */
					console.log("[Generate.TD_GuideEntry_EntryData.wrong_endpoint]",this.get_keys_of(x));
					break x;
				}
				return `TYPE::TD_GuideEntry_EntryData<"${ru.iconType}">`;
			}
			/** @type {TD_GuideEntry_Simple<any>} */
			if(!this.eq_keys(kk,["navigationEndpoint","icon","trackingParams","formattedTitle","accessibility"])) {
				console.log("[Generate.TD_GuideEntry_Simple.keys.overflow]",this.get_keys_of(x));
				break x;
			}
			return `TYPE::TD_GuideEntry_Simple<"${ru.iconType}">`;
		}
		x: if(x.signalServiceEndpoint) {
			let v=this.as_T_SE_Signal(x);
			let sr=this.get_typedef_part(v.signalServiceEndpoint);
			if(!sr) break x;
			let wc=this.get_typedef_part(v.commandMetadata);
			return `TYPE::T_SE_Signal<${wc},${sr}>`;
		}
		x: if(x.multiPageMenuRenderer) {
			let v=this.as$TR_MP_Menu(x);
			let sr=this.get_typedef_part(v.multiPageMenuRenderer);
			if(!sr) break x;
			return `TYPE::TR_MP_Menu<${sr}>`;
		}
		if(state.k1==="webCommandMetadata") return x;
		/** @private @type {D_Text} */
		if(x.runs&&x.runs instanceof Array) return "TYPE::D_Text";
		if(x.thumbnails&&x.thumbnails instanceof Array) return `TYPE::${this.#R_ThumbnailStr()}`;
		/** @private @type {D_Text} */
		if(x.simpleText) return "TYPE::D_Text";
		/** @private @type {T_Icon<"">} */
		if(x.iconType&&typeof x.iconType==="string") return `TYPE::T_Icon<"${x.iconType}">`;
		if(x.signal) {
			let sig_type=this.getType$Signal(x);
			return `TYPE::${sig_type}`;
		}
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
		if(k1==="") return x;
		console.log("[no_json_replace_type] %o [%s] [%s]",x,keys.join(","),g(),"\n",r);
		{debugger;}
		return null;
	}
	/** @private @arg {JsonReplacerState} state @arg {string} k1 @arg {unknown} o */
	typedef_json_replacer(state,k1,o) {
		state.k1=k1;
		/** @private @type {RC_ResponseContext} */
		if(k1==="responseContext") return "TYPE::RC$ResponseContext";
		/** @private @type {A_FrameworkUpdates} */
		if(k1==="frameworkUpdates") return "TYPE::A_FrameworkUpdates";
		/** @private @type {D_LoggingDirectives} */
		if(k1==="loggingDirectives") return "TYPE::A_LoggingDirectives";
		if(k1==="subscriptionButton") return "TYPE::D_SubscriptionButton";
		if(k1==="upcomingEventData") return "TYPE::D_UpcomingEvent";
		if(o===null||o===void 0) return o;
		if(typeof o==="bigint") return o;
		if(typeof o==="boolean") return o;
		if(typeof o==="function") return o;
		if(typeof o==="number") return o;
		if(typeof o==="symbol") return o;
		if(typeof o==="string") return this.typedef_json_replace_string(o,k1);
		if(typeof o!=="object") return o;
		/** @private @type {{[U in string]?:unknown}} */
		let x=o;
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
		let res_type=this.typedef_json_replace_object(state,x,k1);
		if(res_type!==null) return res_type;
		if(state.key_keep_arr.includes(k1)) return x;
		state.object_count++;
		if(state.object_count<3) return x;
		return {};
	}
	/** @no_mod @arg {string} cf @arg {{}} x */
	#_codegen_typedef(cf,x) {
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
		let state=new JsonReplacerState(cf,keys);
		let tc=JSON.stringify(x,this.typedef_json_replacer.bind(this,state),"\t");
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
		if(typeof cf==="number") {
			ret=`\ntype ArrayType_${cf}=${tc}\n`;
		} else {
			ret=`\ntype ${cf}=${tc}\n`;
		}
		return ret;
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
	/** @api @public @param {{[U in string]:unknown}} x @returns {string} */
	get_auto_type_name(x) {
		let type_name=this.json_auto_replace_1(x);
		if(type_name==="MetadataBadgeRenderer") {
			return "RMD_Badge";
		}
		x: if(type_name==="OpenPopupAction"&&typeof x.openPopupAction==="object") {
			if(!x.openPopupAction) break x;
			let sr=this.get_typedef_part(x.openPopupAction);
			if(!sr) break x;
			return "TA_OpenPopup<"+sr+">";
		}
		if(type_name.endsWith("Action")) {
			let real_val=split_string_once_last(type_name,"Action")[0];
			if(real_val==="OpenPopup") return type_name;
			return `A_${real_val}`;
		}
		if(type_name.endsWith("Command")) {
			let real_val=split_string_once_last(type_name,"Command")[0];
			return `C_${real_val}`;
		}
		if(type_name.endsWith("Endpoint")) {
			let real_val=split_string_once_last(type_name,"Endpoint")[0];
			return `E_${real_val}`;
		}
		if(type_name.endsWith("Renderer")) {
			let real_val=split_string_once_last(type_name,"Renderer")[0];
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
	getType$Signal(x) {
		/** @private @type {G_AllSignalTypes} */
		let u=as(x);
		switch(u.signal) {
			case "CLIENT_SIGNAL": {
				if(u.actions instanceof Array) return "GS_Client";
				console.log("[no_actions_arr] %o",u);
				return "GS_Client";
			}
			case "GET_NOTIFICATIONS_MENU": {
				if(!(u.actions instanceof Array)) {
					console.log("[no_actions_arr] %o",u);
				}
				if(u.actions.length!==1) debugger;
				let action=u.actions[0];
				if(!action.openPopupAction) debugger;
				let popup_action=action.openPopupAction;
				if(popup_action.popupType!=="DROPDOWN") debugger;
				let popup=popup_action.popup;
				if(!popup.multiPageMenuRenderer) debugger;
				let mp=popup.multiPageMenuRenderer;
				let k=this.get_keys_of(mp);
				if(!this.eq_keys(k,["trackingParams","style","showLoadingSpinner"])) {
					debugger;
				}
				return "Signal_GetNotificationsMenu";
			}
			default:
		}
		if(this.eq_keys(this.get_keys_of(u),["signal"])) {
			return `T_Signal<"${u.signal}">`;
		}
		const {signal,...y}=u;
		console.log("[need to decode signal] [%s]",signal,y);
		{debugger;}
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
			if(this.str_ends_with(hr,"Command")) {
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
		if(b.button_id) return `TYPE::ButtonId<"${b.button_id}">`;
		console.log("[no_json_replace_type_1] %o [%s] [%s]",b,keys.join(","),g(),"\n",r);
		{debugger;}
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
	use_generated_members(r,x) {
		/** @type {Generate<T_LoadAllServices,T_ServiceFlags>} */
		let td=new Generate(this);
		td.generate_typedef_and_depth(r,x);
		return td;
	}
	/** @api @public @arg {unknown} x @arg {string|null} r @arg {boolean} [w] */
	codegen_renderer(x,r,w) {
		let gen_obj=this.#codegen_renderer(x,r);
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
		ret_arr.push(`if(${k1}!=="${x2}") debugger;`); x;
	}
}

/** @template T,U */
class Generate {
	/** @private @type {Map<string,string>[]} */
	out_arr=[];
	/** @private @type {string[]} */
	str_arr=[];
	/** @constructor @public @arg {CodegenService<T,U>} parent */
	constructor(parent) {
		this.parent=parent;
	}
	get x() {
		return this.parent;
	}
	/** @api @public @arg {string} cf @arg {{}} x */
	generate_typedef_and_depth(cf,x) {
		let gen=this.x.codegen_typedef(cf,x,true);
		if(!gen) return;
		this.str_arr.push(gen);
		let gd=this.x.generate_depth(gen);
		if(!gd) return;
		this.out_arr.push(gd);
	}
}

export_(exports => {
	exports.CodegenService=CodegenService;
	exports.Generate=Generate;
});
