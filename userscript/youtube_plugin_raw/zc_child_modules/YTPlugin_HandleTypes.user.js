// ==UserScript==
// @name	YTPlugin HandleTypes Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://*.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/za_userscript_meta/YTPlugin_HandleTypes.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */

const {as,base64_url_dec,split_string_once,MyReader,split_string,do_export,as_any,JsonReplacerState}=require("./YtPlugin_Base.user"); const {ECatcherService}=require("./YTPlugin_ECatcherService.user"); const {ServiceMethods}=require("./YTPlugin_ServiceMethods.user");

//#region module setup
const __module_name__="mod$HandleTypes";
if(!window.__youtube_plugin_base_loaded__) {throw new Error("Failed to load base plugin");}
if(window.__yt_plugin_log_imports__) console.log("Load HandleTypes Service");
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
//#endregion
// [new_fexp_expected]
ECatcherService.known_experiments.push(...[
	[24409417,24466859,24474437,24477147,24477317],// 3
	[24476774,24481213,4957635],// 1
	[24474438,24478762,39323074],// 2
].flat());
//#region HandleTypes
class HandleTypes extends ServiceMethods {
	//#region remote service plugins
	/** @api @public @arg {IndexedDBService} service @arg {number} old_version @arg {IDBDatabase} db */
	indexed_db_createDatabaseSchema(service,old_version,db) {
		if(old_version<1) {
			service.create_store("video_id",db);
			service.create_store("hashtag_id",db);
			service.create_store("boxed_id",db);
		}
		if(old_version<2) {
			service.create_store("channel_id",db);
			service.create_store("playlist_id",db);
		}
		if(old_version<3) {
			service.create_store("browse_id",db);
		}
	}
	//#endregion
	//#region Template
	/** @private @template {number} T @arg {T_D32<T>} x @arg {(this:void,x:T)=>void} f */
	T_D32(x,f) {
		if(!x) {debugger; return;}
		if(x[0]!=="param_arr") {debugger; return;}
		let pa=x[1];
		if(pa.length!==1) {debugger; return;}
		let [v]=pa;
		if(v[0]!=="data32") {debugger; return;}
		f(v[1]);
	}
	/** @private @template {number} T @arg {T_D32<T>} x */
	T_D32_v(x) {
		if(!x) return null;
		if(x[0]!=="param_arr") return null;
		let pa=x[1];
		if(pa.length!==1) return null;
		let [v]=pa;
		if(v[0]!=="data32") return null;
		return v[1];
	}
	/** @private @template {number} T @template U @arg {T_FD32<T>} x @arg {(this:void,x:T)=>U} f */
	T_FD32(x,f) {
		let x1=this.T_RawChild(x);
		if(!x1) {debugger; return null;}
		let [t,u]=x1;
		if(t!=="data_fixed32") {debugger; return null;}
		return f(u);
	}
	/** @arg {D_ProtobufObj[]} x */
	tr_arr_to_obj(x) {
		if(!x) {debugger; return null;}
		/** @private @type {V_ParamObj} */
		let res_obj={};
		/** @arg {number} id @arg {V_ParamItem} obj */
		const add_obj=(id,obj) => {
			res_obj[id]??=["param_arr",[]];
			res_obj[id][1].push(obj);
		};
		for(let v of x) {
			switch(v[0]) {
				default: debugger; break;
				case "child": {
					let [n,id,a,b]=v;
					if(b===null) {
						let decoded_string=this._decoder.decode(a);
						add_obj(id,["raw_child",a,b,["string",decoded_string]]);
						continue;
					}
					add_obj(id,[n,a,this.tr_arr_to_obj(b)]);
				} break;
				case "data32": {
					let [n,id,a]=v;
					add_obj(id,[n,a]);
				} break;
				case "data64": {
					let [n,id,a,b]=v;
					add_obj(id,[n,a,b]);
				} break;
				case "data_fixed32": {
					let [n,id,a]=v;
					add_obj(id,[n,a]);
				} break;
				case "data_fixed64": {
					let [n,id,a]=v;
					add_obj(id,[n,a]);
				} break;
				case "error": {
					let [n,id]=v;
					add_obj(id,[n,id]);
				} break;
				case "group": {
					let [n,id,a]=v;
					let res=this.tr_arr_to_obj(a);
					if(res) {
						add_obj(id,[n,res]);
					} else {
						debugger;
					}
				} break;
				case "info": {
					let [n,id,a]=v;
					add_obj(id,[n,a]);
				} break;
				case "struct": {
					let [n,id,a]=v;
					let res=this.tr_arr_to_obj(a);
					if(res) {
						add_obj(id,[n,res]);
					} else {
						debugger;
					}
				} break;
			}
		}
		/*
		let x1=this.make_param_map(x);
		if(!x1) {debugger; return null;}
		return this.convert_map_to_obj(x1);*/
		return res_obj;
	}
	/** @arg {V_ParamMapValue} x @returns {V_ParamObj|null} */
	tr_to_param_item(x) {
		if(typeof x==='string') return {0: ["param_arr",[["raw",["string",x]]]]};
		if(typeof x==="number") return {0: ["param_arr",[["raw",["number",x]]]]};
		if(x instanceof Map) {
			let x1=this.tr_map_to_obj(x);
			if(!x1) {debugger; return null;}
			return {0: ["param_arr",[["raw",["V_ParamMapType",x]]]]};
		}
		if(x instanceof Array) {
			if(x[0]==="bigint") return {0: ["param_arr",[["raw",["bigint",x[2]]]]]};
			if(x[0]==="group") {
				const [,r]=x;
				let vr=this.tr_arr_to_obj(r);
				if(!vr) {debugger; return null;}
				return vr;
			}
			if(x[0]==="failed") {debugger; return null;}
			x==="";
			return null;
		}
		if(x instanceof Uint8Array) return {0: ["param_arr",[["raw",["binary",x]]]]};
		x==="";
		return null;
	}
	/** @arg {V_ParamMapType} x @returns {V_ParamObj|null} */
	tr_map_to_obj(x) {
		/** @template T @arg {T[]} x */
		function first(x) {
			if(x.length!==1) return null;
			return x[0];
		}
		/** @type {V_ParamObj} */
		let res={};
		debugger;
		for(let k of x.keys()) {
			let value=x.get(k);
			if(k in res) {
				debugger;
			}
			if(value===void 0) {debugger; continue;}
			res[k]??=["param_arr",[["raw",["array",[]]]]];
			let cv=res[k];
			let ca=cv[1][0];
			if(cv[0]!=="param_arr") {debugger; continue;}
			if(ca[0]!=="raw") {debugger; continue;}
			if(ca[1][0]!=="array") {debugger; continue;}
			const t=ca[1][1];
			if(value.length===0) {
				t.push({});
				continue;
			}
			if(value.length!==1) {
				/** @template T @arg {T|null} x @returns {x is T} */
				function is_not_null(x) {return x!==null;}
				let v1=value.map(x => {
					let r=this.tr_to_param_item(x);
					if(r===null) {debugger; return null;}
					return r;
				}).filter(is_not_null);
				t.push(...v1);
				continue;
			}
			let v2=first(value);
			if(v2===null) {debugger; continue;}
			let v3=this.tr_to_param_item(v2);
			if(v3===null) {debugger; continue;}
			t.push(v3);
		}
		return res;
	}
	/** @type {([type:"number",cf:string,key:string,size:"milliseconds",value:number])[]} */
	log_buffer=[];
	/** @type {Promise<null>|null} */
	loading_promise=null;
	load_moment_js_if_not_loaded() {
		if(this.loading_promise!==null) return this.loading_promise;
		if(this.is_moment_js_loading) return null;
		let s=document.createElement("script");
		s.src="https://momentjs.com/downloads/moment.min.js";
		this.is_moment_js_loading=true;
		this.loading_promise=new Promise((a) => {
			s.onload=() => {
				this.is_moment_js_loaded=true;
				this.loading_promise=null;
				a(null);
			};
			document.head.append(s);
		});
		return this.loading_promise;
	}
	async run_logger() {
		if(this.log_buffer.length===0) return;
		let ms_set=new Set;
		for(let log of this.log_buffer) {
			let [type,cf1,cf2,size,value]=log;
			if(type!=="number") continue;
			if(ms_set.has(value)) continue;
			// `moment(x/1000).toString()` -> "Sun Feb 19 2023 12:32:55 GMT-0700"
			if(value>=0b101111101_010001_0010_100111_001_11110110110_000000000000) {
				ms_set.add(value);
				let skip=true;
				if(skip) break;
				let lp=this.load_moment_js_if_not_loaded();
				if(lp!==null) await lp;
				let moment=require("moment");
				switch(size) {
					case "milliseconds": {
						let as_moment=moment(value/1000);
						let now_moment=moment(); let load_moment=moment(this.client_now);
						let diff_from_load_time=as_moment.diff(load_moment)/1000;
						let diff_from_now=as_moment.diff(now_moment)/1000;
						// skip time that is now
						if(diff_from_now>-5&&diff_from_now<5) break;
						// skip time that is close to first load
						if(diff_from_load_time>-5&&diff_from_load_time<5) break;
						console.group("[run_logger_moment] [moment.js]");
						console.log(`[cf1:${cf1}]`,`[cf2:${cf2}]`,`[type:${type}] [size:${size}]`);
						console.log(`[from_load:${diff_from_load_time}] [${as_moment.from(load_moment)}]`);
						console.log(`[from_now:${diff_from_now}] [${as_moment.from(now_moment)}]`);
						console.groupEnd();
					} break;
				}
				continue;
			}
			console.log(cf1,cf2,value);
		}
	}
	/** @type {number} */
	static client_now=Date.now();
	client_now=HandleTypes.client_now;
	/** @type {number|null} */
	request_start_time=null;
	/** @type {null|Promise<void>} */
	imm_wait_promise=null;
	immediate_run_logger() {
		if(this.imm_wait_promise) return;
		let wait_promise=Promise.resolve().then(this.run_logger.bind(this)).then(() => {
			this.imm_wait_promise=null;
		});
		this.imm_wait_promise=wait_promise;
	}
	/** @template {number} T @arg {T} t @arg {{1:T_D32<number>}} x @returns {x is {1:T_D32<T>}} */
	is_tp_xx(x,t) {return x[1][0]==="param_arr"&&x[1][1][0][1]===t;}
	/** @template {number} T @arg {T} t @arg {{2:T_D32<number>}} x @returns {x is {2:T_D32<T>}} */
	is_tp_xx_2(x,t) {return x[2][0]==="param_arr"&&x[2][1][0][1]===t;}
	/** @private @arg {V_BinaryTimestamp} x */
	V_BinaryTimestamp(x) {
		const cf="V_BinaryTimestamp";
		const {1: request_timestamp_milli_utc,2: f2,3: f3,...y}=this.s(cf,x); this.g(y);
		this.T_D32(request_timestamp_milli_utc,x => {
			this.log_buffer.push(["number",`max_gen:${cf}:binary_ts_gen`,"f1","milliseconds",x]);
			this.immediate_run_logger();
		});
		this.T_FD32(f2,x => {
			if(x<=0b1010111011010101010000001011) return;
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f2] --\n\n[0b${(x).toString(2)}]`);
		});
		this.T_FD32(f3,x => {
			if(x<=0b11111111000011111010011111000000) return;
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f3] --\n\n[0b${(x).toString(2)}]`);
		});
	}
	/** @private @arg {P_ParamParse} cf @arg {V_ParamObj} x */
	decode_binary_object_log_info(cf,x) {
		this._continuation_logged_str.push(cf);
		const n_cf=`P_${cf.replaceAll(".","_")}`;
		this.codegen_typedef_bin(n_cf,x,false);
		let str_arr=[""];
		/** @arg {string} code */
		function ap(code) {str_arr.push(`${"\t".repeat(pad)}${code}`);}
		let pad=1;
		ap(`case "${cf}": {`);
		pad+=1;
		ap(`/** @type {${n_cf}} */`);
		ap("let u=as_any(x);");
		ap(`this.${n_cf}(u);`);
		pad-=1;
		ap(`} break;`);
		console.log(`-- [binary_gen_case:${cf}] --\n${str_arr.join("\n")}`);
		console.log(`-- [binary_gen_function:${cf}] --\n\n/** @private @arg {${n_cf}} x */\n${n_cf}(x) {x;}`);
	}
	/** @protected @template T @arg {[T]} x */
	unwrap_tuple_1(x) {
		if(x.length!==1) return null;
		return x[0];
	}
	/** @protected @template T @arg {T_PArr_1<[T]>} x @returns {T|null} */
	T_RawChild(x) {
		if(x[0]!=="param_arr") {debugger; return null;}
		if(x.length!==2) debugger;
		return this.unwrap_tuple_1(x[1]);
	}
	/** @private @template T @arg {TV_Str<T>} x */
	TV_Str(x) {
		let vv=this.T_RawChild(x);
		if(vv===null) {debugger; return null;}
		let v2=vv;
		if(v2[0]!=="raw_child") return null;
		let v3=v2[3];
		let [a,b]=v3;
		if(a!=="string") {debugger; return null;}
		return b;
	}
	/** @protected @template {(string|number)[]} T @template {T} R @arg {T} src @arg {R} target @returns {src is R} */
	is_eq_keys(src,target) {return this.eq_keys(src,target);}
	/** @template U @template {U[]} T @arg {T} x @returns {Join<{[R in keyof T]:`${T[R]}`},".f">} */
	fmt_arr(x) {
		return as(x.map(v => `${v}`).join(".f"));
	}
	/** @arg {"continuation_token.data.f49"} cf @arg {string} x */
	_continuation_token_data_f49(cf,x) {
		let x1=decodeURIComponent(x);
		let buffer=base64_url_dec.decodeByteArray(x1);
		if(!buffer) {debugger; return;}
		let c_pos=0;
		for(;c_pos<6;c_pos++) this.save_number_one(`${cf}.${c_pos}`,buffer[c_pos]);
		{const n_len=4,na_arr=[...buffer.slice(c_pos,c_pos+n_len)]; this.save_number_arr(`${cf}.${c_pos}-${c_pos+n_len}`,na_arr); c_pos+=n_len;}
		{let n_len=4; console.log(`[continuation_token_data_f49_log] [range:${c_pos}-${c_pos+n_len}]`,buffer.slice(c_pos,c_pos+4));}
	}
	cg_mismatch_set=new Set();
	/** @type {[string,string][]} */
	cg_mismatch_list=[];
	/** @template A1,A2,A3,A4 @template {[(a1:A1,a2:A2,a3:A3,a4:A4,...n:any[])=>void]} T @arg {[T,A1,A2,A3,A4]} arg0 */
	make_bind([func,a1,a2,a3,a4]) {return [func,a1,a2,a3,a4];}
	//#endregion
	//#region moved data methods
	/** @public @arg {D_WebPlayerConfig} x */
	D_WebPlayerConfig(x) {
		const cf="D_WebPlayerConfig";
		const {useCobaltTvosDash,webPlayerActionsPorting,...y}=this.s(cf,x); this.g(y);
		this.ceq(useCobaltTvosDash,true);
		this.D_WebPlayerActionsPorting(webPlayerActionsPorting);
	}
	/** @public @arg {D_WebPlayerActionsPorting} x */
	D_WebPlayerActionsPorting(x) {
		const cf="D_WebPlayerActionsPorting";
		const {getSharePanelCommand,subscribeCommand,unsubscribeCommand,addToWatchLaterCommand,removeFromWatchLaterCommand,...y}=this.s(cf,x); this.g(y);
	}
	/** @public @arg {CF_L_TP_Params} cf @arg {D_WatchPageUrl} x */
	D_WatchPageUrl(cf,x) {
		let u1=split_string_once(x,"/")[1];
		let u2=split_string_once(u1,"?")[1];
		let u3=this.parse_url_search_params(u2);
		let u4=this.keyof_search_params(u2);
		x: {
			if(this.is_eq_keys(u4,this.exact_arr("v"))) {
				u4;
				return;
			}
			if(this.is_eq_keys(u4,this.exact_arr("v","pp"))) break x;
			u4;
			if(this.is_eq_keys(u4,this.exact_arr("v","t"))) break x;
			u4;
			if(this.is_eq_keys(u4,this.exact_arr("v","list","start_radio"))) break x;
			if(this.is_eq_keys(u4,this.exact_arr("v","list","index"))) break x;
			u4==="";
		}
		this.parser.parse_url(cf,x);
		return u3;
	}
	//#endregion
	//#region templates
	/** @private @arg {string} cf @arg {K} k @template {keyof T} K @public @template {{}} T @arg {T} x */
	HD_(cf,k,x) {
		this.k(cf,x);
		let kx=this.get_keys_of(x);
		if(kx.length!==1) debugger;
		if(kx[0]!==k) debugger;
	}
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x */
	H_Get(cf,k,x) {return this.wn(cf,x,k);}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		f.call(this,a);
	}
	//#endregion
	//#region helpers
	/** @protected @template {{}} T @arg {CF_M_s} cf @arg {{} extends T?T_DistributedKeysOf<T> extends []?T:never:never} x */
	gs(cf,x) {this.g(this.s(cf,x));}
	//#endregion
	//#region static & typedefs
	/** @typedef {{}} minimal_handler_member */
	static {this.prototype.minimal_handler_member_2({});}
	//#endregion
	//#region member functions
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @returns {T[K]|null} */
	w_priv(k,x) {
		if(!(k in x)) {debugger; return null;}
		return x[k];
	}
	/** @protected @arg {CF_M_zy} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K][number],i:number)=>U} f */
	zy(cf,k,x,f) {return this.z(this.w(cf,k,x),f);}
	//#endregion
	//#region CheckedTemplates
	/** @private @arg {CF_TA_Page} cf @template T @arg {T_Page<T>} x @template U @arg {(this:this,x:T)=>U} f */
	TA_Page(cf,x,f) {f.call(this,this.w(cf,"page",x));}
	//#endregion
	//#region Action methods
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H_("getMultiPageMenuAction",x,this.AD_GetMultiPageMenu);}
	/** @public @arg {A_AccountItem} x */
	A_AccountItem(x) {this.H_("accountItem",x,this.AD_AccountItem);}
	//#endregion
	//#region Renderer methods
	//#endregion
	//#region CD & AU & C & DC
	/** @private @arg {CD_TimedContinuation} x */
	CD_TimedContinuation(x) {this.H_("timedContinuationData",x,this.DC_Timed);}
	/** @private @arg {AU_ChannelSwitcherPage} x */
	AU_ChannelSwitcherPage(x) {this.H_("updateChannelSwitcherPageAction",x,this.AD_UpdateChannelSwitcherPage);}
	/** @private @arg {AD_GetMultiPageMenu} x */
	AD_GetMultiPageMenu(x) {this.H_("menu",x,x => this.TR_MultiPageMenu("TR_MultiPageMenu_Empty",x));}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @arg {C_FollowUp} x */
	C_FollowUp(x) {let [a,y]=this.TE_Endpoint_2("C_FollowUp","addFollowUpSurveyCommand",x); this.g(y); this.DC_AddFollowUpSurvey(a);}
	/** @private @arg {DC_AddFollowUpSurvey} x */
	DC_AddFollowUpSurvey(x) {
		const cf="DC_AddFollowUpSurvey";
		const {followUpOptions,followUpText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
	}
	/** @private @arg {DC_Timed} x */
	DC_Timed(x) {
		const cf="DC_Timed";
		const {timeoutMs,continuation,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(timeoutMs!==60000) debugger;
		this.params("timed_continuation.data",continuation);
	}
	//#endregion
	//#region E & M & GM & DE
	/** @public @arg {DE_SuperThanksSelectedTier} x */
	DE_SuperThanksSelectedTier(x) {
		const cf="DE_SuperThanksSelectedTier";
		const {index,key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		console.log("super_thanks_selected_tier.index",index);
		console.log("super_thanks_selected_tier.key",key);
	}
	//#endregion
	/** @arg {Omit<Omit<Omit<D_Microformat, `url${string}`>, `ios${string}`>, `twitter${string}`>} x */
	D_Microformat_Other(x) {
		const cf="D_Microformat_Other";
		let {tags,familySafe,noindex,unlisted,thumbnail,title,description,schemaDotOrgType,androidPackage,appName,availableCountries,linkAlternates,siteName,ogType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(tags,this.a_primitive_str);
		this.t(familySafe,x => {if(x!==true) debugger;});
		if(noindex!==false) debugger;
		if(unlisted!==false) debugger;
		this.D_Thumbnail(thumbnail);
		this.z([title,description,schemaDotOrgType,androidPackage,appName,siteName,ogType],this.a_primitive_str);
		this.tz(availableCountries,this.a_primitive_str);
		this.z(linkAlternates,this.B_HrefUrl);
	}
	/** @public @arg {B_HrefUrl} x */
	B_HrefUrl(x) {this.y("B_HrefUrl","hrefUrl",x,x => this.parser.parse_url("B_HrefUrl.url",x));}
	/** @type {NonNullable<D_Button["icon"]>["iconType"][]} */
	Button_iconType=[
		"SHORTS_COMMENT",
	];
	expected_button_iconTypes_ex=[
		"",
		"DELETE",
	];
	/** @type {string[]} */
	Button_missing_iconType=[];
	/** @public @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => {
			if("openPopupAction" in x) return this.A_GetSystemMenu(x);
			return null;
		});
		this.trackingParams(trackingParams);
	}
	/** @public @template T @arg {CF_T_OpenPopup_Dropdown} cf @arg {T_OpenPopup_Dropdown<T>} x */
	T_OpenPopup_Dropdown(cf,x) {
		const {popupType,popup,beReused,...y}=this.s(cf,x); this.g(y);
		if(popupType!=="DROPDOWN") return null;
		return popup;
	}
	/** @public @arg {A_GetSystemMenu} x */
	A_GetSystemMenu(x) {
		const cf="A_GetSystemMenu";
		let pu=this.TA_OpenPopup(cf,x);
		this.Popup_DD_SystemMenu(pu);
	}
	/** @public @arg {Popup_DD_SystemMenu} x */
	Popup_DD_SystemMenu(x) {
		let m=this.T_OpenPopup_Dropdown("Popup_DD_SystemMenu",x);
		this.t(m,this.R_SystemMenu);
	}
	/** @public @arg {R_SystemMenu} x */
	R_SystemMenu(x) {this.t(this.TR_MultiPageMenu("R_SystemMenu",x),this.MP_SystemMenu);}
	/** @public @arg {MP_SystemMenu} x */
	MP_SystemMenu(x) {
		const cf="MP_SystemMenu";
		const {header,sections,trackingParams,style,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_ActiveAccountHeader(header);
		this.trackingParams(trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM") debugger;
	}
	/** @public @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow";
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let pu=this.TA_OpenPopup("TA_OpenPopup:R_PdgBuyFlow",command);
		if("pdgBuyFlowRenderer" in pu) {this.xr.R_PdgBuyFlow(pu);}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	ignore_incorrect_name_set=new Set([
		"D_CommonConfig",
	]);
	/** @public @arg {RS_UpdateMetadata} x */
	RSU_M(x) {
		const cf="RSU_M";
		const {responseContext: {},continuation,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.CD_TimedContinuation(continuation);
		this.z(actions,x => {
			if("updateViewershipAction" in x) return this.AU_Viewership(x);
			if("updateToggleButtonTextAction" in x) return this.AU_ToggleButtonText(x);
			if("updateDateTextAction" in x) return this.AU_DateText(x);
			if("updateTitleAction" in x) return this.AU_Title(x);
			if("updateDescriptionAction" in x) return this.AU_Description(x);
			console.log(x);
		});
	}
	/** @private @arg {AU_Description} x */
	AU_Description(x) {
		const cf="AU_Description";
		this.y(cf,"updateDescriptionAction",x,this.AD_Description);
	}
	/** @private @arg {AD_Description} x */
	AD_Description(x) {
		const cf="AD_Description";
		const {description,...y}=this.s(cf,x); this.g(y);
		this.G_Text(description);
	}
	/** @private @arg {AU_Title} x */
	AU_Title(x) {this.y("UA_Title","updateTitleAction",x,x => this.y("UA_TitleData","title",x,this.G_Text));}
	/** @private @arg {AU_DateText} x */
	AU_DateText(x) {this.y("UA_DateText","updateDateTextAction",x,x => this.y("UA_DateTextData","dateText",x,this.G_Text));}
	/** @private @arg {AU_ToggleButtonText} x */
	AU_ToggleButtonText(x) {
		this.y("AU_ToggleButtonText","updateToggleButtonTextAction",x,x1 => {
			const cf="AU_ToggleButtonTextData";
			const {buttonId,defaultText,toggledText,...y}=this.s(cf,x1); this.g(y);
			if(buttonId!=="TOGGLE_BUTTON_ID_TYPE_LIKE") debugger;
			this.G_Text(defaultText);
			this.G_Text(toggledText);
		});
	}
	/** @private @arg {AU_Viewership} x */
	AU_Viewership(x) {this.y("AU_Viewership","updateViewershipAction",x,x => this.y("AU_ViewershipData","viewCount",x,this.R_VideoViewCount));}
	/** @public @arg {RS_Search} x */
	RS_Search(x) {
		const cf="RS_Search";
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(estimatedResults);
		this.xr.R_TwoColumnSearchResults(contents);
		this.trackingParams(trackingParams);
		this.R_DesktopTopbar(topbar);
		this.z(refinements,this.a_primitive_str);
		this.z(onResponseReceivedCommands,x => {
			if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		});
		this.targetId(cf,targetId);
	}
	/** @public @arg {RSG_SearchSuggestions} x */
	RSG_SearchSuggestions(x) {
		const cf="RSG_SearchSuggestions";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RSL_Like} x */
	RSL_Like(x) {
		const cf="RSL_Like";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
	}
	/** @public @arg {RSL_Dislike} x */
	RSL_Dislike(x) {
		const cf="RSL_Dislike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let ac=this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		if(!ac) return;
		let [r1]=ac;
		this.z(r1,this.g);
	}
	/** @public @arg {RSL_RemoveLike} x */
	RSL_RemoveLike(x) {
		const cf="RSL_RemoveLike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		}));
	}
	/** @public @arg {RS_ReelWatchSequence} x */
	RS_ReelWatchSequence(x) {
		const cf="RS_ReelWatchSequence";
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,x => this.T_Command_TP(x,x => this.x.get("x_VE37414").E_VE37414_ReelWatch(x)));
		this.trackingParams(trackingParams);
		this.t(continuationEndpoint,x => this.xr.C_Continuation(x));
	}
	/** @public @arg {RS_GetLiveChat} x */
	RS_GetLiveChat(x) {
		const cf="RS_GetLiveChat";
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_LiveChat(a1);
		this.t_cf(cf,a2,this.trackingParams);
	}
	/** @private @arg {string} x */
	RS_Next_ContextParams(x) {this.params("next.queue_context.params",x);}
	/** @public @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next";
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(contents,x => this.xr.G_NextContents(x));
		this.t(currentVideoEndpoint,this.E_Watch);
		this.trackingParams(trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.GE_ResponseReceived(cf,a));
		this.tz(engagementPanels,this.R_EngagementPanelSectionList);
		this.t(topbar,this.R_DesktopTopbar);
		this.tz(pageVisualEffects,this.R_CinematicContainer);
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		this.t(videoReporting,x => this.xr.R_ReportFormModal(x));
		this.t(queueContextParams,this.RS_Next_ContextParams);
		this.t(continuationContents,this.RC_PlaylistPanel);
	}
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("playlistPanelContinuation",x,this.g);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("liveChatContinuation",x,this.DC_LiveChat);}
	/** @template {{}} T @arg {T} x @arg {keyof T} k */
	T_EP_In(x,k) {return x[k];}
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {const cf="D_MenuServiceItem_Omit"; const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); f.call(this,serviceEndpoint); return y;}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem";
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(trackingParams);
	}
	/** @template {string} T @arg {string} x @arg {T} tag @returns {string&{_tag:T}} */
	make_str_tag(x,tag) {
		/** @template T */
		class UrlEncodedTag extends String {
			/** @arg {string} str @arg {T} tag */
			constructor(str,tag) {
				super(str);
				this._tag=tag;
			}
		}
		let tagged_obj=new UrlEncodedTag(x,tag);
		return as(tagged_obj);
	}
	/** @template {keyof D_UrlInfoMap} K @arg {K} k @arg {D_UrlInfoMap[K]["url"]} x @returns {D_UrlInfoMap[K]} */
	getInfoForUrl(x,k) {
		switch(k) {
			case "https://www.youtube.com/redirect": {
				let parsed_url=this.tr_url_to_obj(x);
				if("_tag" in parsed_url) throw new Error();
				let parsed_params=this.parse_url_search_params(parsed_url.search);
				if(!("q" in parsed_params)) {debugger; throw new Error();}
				/** @type {GU_YoutubeUrlRedirect_Info} */
				let wt={
					url: x,
					encoded_params: {q: this.make_str_tag(parsed_params.q,"EncodedURIComponent"),}
				};
				return wt;
			}
		}
		throw new Error();
	}
	/** @template {{}} T @arg {T} x */
	get_omit_gen(x) {
		return new (class Gen1 {
			/** @arg {T} x */
			constructor(x) {
				this.x=x;
			}
			/** @arg {T} x */
			set(x) {
				this.x=x;
			}
			/** @returns {T} */
			get() {
				return this.x;
			}
		})(x);
	}
	/** @private @arg {AD_UpdateEngagementPanel} x */
	AD_UpdateEngagementPanel(x) {
		const cf="AD_UpdateEngagementPanel";
		const {content,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xr.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @public @arg {REG_DatasyncIds} x */
	REG_DatasyncIds(x) {
		const cf="REG_DatasyncIds";
		const {responseContext: {},datasyncIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(datasyncIds,this.a_primitive_str);
	}
	/** @public @arg {REG_AccountSwitcher} x */
	REG_AccountSwitcher(x) {
		const cf="REG_AccountSwitcher";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.A_GetMultiPageMenu);
	}
	/** @public @arg {RS_AccountsList} x */
	RS_AccountsList(x) {
		const cf="RS_AccountsList";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.AU_ChannelSwitcherPage);
	}
	/** @public @arg {RS_WatchReelItem} x */
	RSW_ReelItem(x) {
		const cf="RSW_ReelItem";
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(trackingParams);
		this.t(replacementEndpoint,x => this.x.get("x_VE37414").E_VE37414_ReelWatch(x));
		this.t(sequenceContinuation,this.a_primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @public @arg {RS_SetSetting} x */
	RS_SetSetting(x) {
		const cf="RS_SetSetting";
		const {responseContext: {},settingItemId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(settingItemId!=="407") debugger;
	}
	/** @public @arg {RS_Feedback} x */
	RS_Feedback(x) {
		const cf="RS_Feedback";
		const {responseContext: {},feedbackResponses,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(feedbackResponses,x => this.xr.D_FeedbackResponseProcessedStatus(x));
	}
	/** @public @arg {P_ParamParse} cf @arg {string} x */
	decode_binary_obj(cf,x) {
		let binary_arr=this.read_b64_protobuf(decodeURIComponent(x));
		if(!binary_arr) {debugger; return;}
		this.decode_binary_arr(cf,binary_arr);
	}
	/** @private @type {string[]} */
	typedef_cache=[];
	/** @arg {JsonReplacerState} s @arg {V_ParamObj} x @returns {RetParam_BinaryTimestamp|RetParam_VW_2|null} */
	replace_bin_binary_ts(s,x) {
		if(!(1 in x&&2 in x&&3 in x)) return null;
		let f1=i(x[1]); let f2=i(x[2]); let f3=i(x[3]);
		let kk=this.get_keys_of(x);
		/** @type {V_BinaryTimestamp} */
		if(f1&&f2&&f3&&f1[0]==="data32"&&f2[0]==="data_fixed32"&&f3[0]==="data_fixed32"&&this.eq_keys(kk,[1,2,3])) {
			return `TYPE::T_VW<V_BinaryTimestamp>`;
		};
		let gen_json=this.gen_typedef_bin_json(s,x);
		console.log("maybe_handle_bin.do_V_BinaryTimestamp",x,gen_json);
		return `TYPE::T_VW_BinTs<${gen_json},"json">`;
		/** @arg {V_ParamArrBox} x */
		function i(x) {if(x[1].length!==1) return null; return x[1][0];}
	}
	/** @arg {JsonReplacerState} s @arg {V_ParamObj} x @returns {RetParam_ShortTimestamp|null} */
	replace_bin_short_ts(s,x) {
		if(!(1 in x&&2 in x&&3 in x)) return null;
		if(x[1][1].length!==1) return null;
		if(x[2][1].length!==1) return null;
		let f1=x[1][1][0];
		let f2=x[2][1][0];
		if(f1[0]==="data32"&&f2[0]==="data32") {
			let kk=this.get_keys_of(x);
			if(this.eq_keys(kk,[1,2,3])) {
				/** @type {V_ShortTimestamp} */
				let bts={...x,1: ["param_arr",[f1]],2: ["param_arr",[f2]]}; bts;
				return `TYPE::T_VW<V_ShortTimestamp>`;
			}
		}
		let gen_json=this.gen_typedef_bin_json(s,x);
		console.log("maybe_handle_bin.do_V_ShortTimestamp",x,gen_json);
		return null;
	};
	/** @arg {JsonReplacerState} s @arg {V_ParamItem} x @returns {RetParam_child|RetParam_VW_2} */
	v_param_2_child(s,x) {
		if(x[0]!=="child") throw new Error();
		const [,binary_arr,obj]=x;
		if(obj!==null) {
			let bin_ts=this.replace_bin_binary_ts(s,obj);
			if(bin_ts) return bin_ts;
			let short_ts=this.replace_bin_short_ts(s,obj);
			if(short_ts) return short_ts;
			let gen_json=this.gen_typedef_bin_json(s,obj);
			return `TYPE::T_VW_Child<${gen_json},"json">`;
		}
		let decoded_string=this._decoder.decode(binary_arr);
		if(binary_arr[0]===0) {
			console.log("[maybe_handle_bin.do_maybe_string]",x,decoded_string);
			throw new Error();
		}
		return `TYPE::T_VW_Child<"${decoded_string}","string">`;
	}
	/** @arg {V_ParamItem} otu @returns {RetParam_D32} */
	v_param_2_D32(otu) {
		if(otu[0]!=="data32") throw new Error();
		return `TYPE::T_D32<${otu[1]}>`;
	};
	/** @arg {V_ParamItem} otu @returns {RetParam_FD32} */
	v_param_2_FD32(otu) {
		if(otu[0]!=="data_fixed32") throw new Error();
		return `TYPE::T_FD32<${otu[1]}>`;
	};
	/** @arg {V_ParamItem} otu @returns {RetParam_FD64} */
	v_param_2_FD64(otu) {
		if(otu[0]!=="data_fixed64") throw new Error();
		return `TYPE::T_FD64<${otu[1]}n>`;
	};
	/** @arg {JsonReplacerState} s @arg {V_RawBox} otu @returns {RetParam_raw} */
	v_param_2_raw(s,otu) {
		switch(otu[1][0]) {
			case "string": return `TYPE::T_VW_Str<"${otu[1][1]}">`;
			case "bigint": return `TYPE::T_VW_Bigint<${otu[1][1]}n>`;
			case "number": return `TYPE::T_VW_R<"${otu[1][0]}",${otu[1][1]}>`;
		}
		let obj_json=this.gen_typedef_bin_json(s,otu[1][1]);
		return `TYPE::T_VW_R<"${otu[1][0]}",${obj_json}>`;
	};
	/** @arg {[type: "data64", raw_number: number[], value: bigint]} otu @returns {RetParam_VW_Bigint} */
	param_vw_bigint(otu) {
		return `TYPE::T_VW_Bigint<${otu[2]}n>`;
	}
	/** @arg {JsonReplacerState} s @arg {V_ParamItem_RawChild} x @returns {RetParam_raw_child} */
	v_param_rc_def(s,x) {
		let gen_json_binary_arr=this.gen_typedef_bin_json(s,x[1]);
		let obj_json;
		let raw_json="{}";
		if(x[2]===null) {
			obj_json="null";
		} else {
			obj_json=this.gen_typedef_bin_json(s,x[1]);
		}
		return `TYPE::["raw_child",${gen_json_binary_arr},${obj_json},${raw_json}]`;
	};
	/** @arg {JsonReplacerState} s @arg {V_ParamItem_RawChild} x @returns {RetParam_raw_child} */
	v_param_2_raw_child(s,x) {
		let x1=x[3];
		switch(x1[0]) {
			default: return this.v_param_rc_def(s,x);
			case "string": return `TYPE::T_RC_Str<"${x1[1]}">`;
		}
	};
	/** @arg {JsonReplacerState} s @arg {V_ParamItem} x @returns {V_ParamItemFiltered} */
	v_param_item(s,x) {
		switch(x[0]) {
			default: x[0]===""; debugger; return x;
			case "child": return this.v_param_2_child(s,x);
			case "data_fixed32": return this.v_param_2_FD32(x);
			case "data_fixed64": return this.v_param_2_FD64(x);
			case "data32": return this.v_param_2_D32(x);
			case "data64": return this.param_vw_bigint(x);
			case "raw_child": return this.v_param_2_raw_child(s,x);
			case "raw": return this.v_param_2_raw(s,x);
			case "struct": case "group":
			case "error": case "info": return x;
		}
	}
	/** @arg {JsonReplacerState} s @arg {["param_arr", V_ParamItem[]]} x */
	v_param_arr(s,x) {
		let x1=x[1];
		let res=[];
		if(x1.length===1) {
			let x2=x1[0];
			switch(x2[0]) {
				default: debugger; break;
				case "raw": {
					let x3=x2[1];
					switch(x3[0]) {
						default: debugger; break;
						case "string": return `TYPE::TV_Str_R<"${x2[1]}">`;
					}
					debugger;
				} break;
				case "data32": return this.v_param_2_D32(x2);
				case "raw_child": {
					let x3=x2[3];
					if(x2[2]===null) {
						switch(x3[0]) {
							default: break;
							case "string": return `TYPE::TV_Str<"${x3[1]}">`;
						}
					}
					debugger;
				} break;
				case "child": {
					let x3=x2[2]; x3;
					if(x3===null) {debugger; break;}
					let bin_ts=this.replace_bin_binary_ts(s,x3);
					if(bin_ts) return bin_ts;
					let short_ts=this.replace_bin_short_ts(s,x3);
					if(short_ts) return short_ts;
					let gen_json=this.gen_typedef_bin_json(s,x3);
					return `TYPE::T_VW<${gen_json},"json">`;
				}
				case "data_fixed32": break;
				case "data_fixed64": break;
			}
		}
		for(let x2 of x1) {
			res.push(this.v_param_item(s,x2));
		}
		if(res.length===1) return res;
		if(res.every(v => typeof v==="string")) return res;
		if(res.every(v => typeof v!=="string"&&v!==null&&v[0]==="group")) return res;
		debugger;
		return res;
	}
	/** @api @public @arg {JsonReplacerState} s @arg {object|null} x @returns {string|object|null} */
	typedef_json_replace_bin_obj(s,x) {
		if(x===null) return x;
		if(x instanceof Array) {
			if(x.length===1) {
				if(typeof x[0]==="number") {
					return `TYPE::T_Tuple_1<${x[0]}>`;
				}
				return `TYPE::T_Tuple_1<${this.gen_typedef_bin_json(s,x[0])}>`;
			}
			/** @type {D_ProtobufObj|V_ParamArrBox} */
			let x3=as(x);
			switch(x3[0]) {
				case "child": case "data32": case "data_fixed32":
				case "data64": case "data_fixed64": return this.tr_arr_to_obj([x3]);
				case "param_arr": return this.v_param_arr(s,x3);
			}
			if(x3.length===2&&typeof x3[0]==="string") {
				switch(x3[0]) {
					case "error": debugger; break;
				}
			}
			let fx=x[0];
			console.log("[maybe_handle_bin.do_fx]",fx);
			/** @type {(D_ProtobufObj|V_ParamArrBox)[]} */
			let x_t1=x;
			if(x_t1[0][0]==="child") {
				debugger;
				return x_t1;
			}
			console.log("[maybe_handle_bin.do_handle_arr]",x);
			return x;
		}
		if(x instanceof Uint8Array) return `TYPE::T_Uint8Array<${x.length}>`;
		/** @type {(`${number}`|string)[]} */
		let keys=Object.keys(x);
		let kn=keys.map(e => {
			/** @arg {string} _x @returns {asserts _x is `${number}`} */
			function assume_numeric_template(_x) {}
			assume_numeric_template(e);
			return this.parse_number_template(e);
		});
		if(kn.every(x => !Number.isNaN(x))) return x;
		if("message" in x) return x;
		if("type" in x&&"v" in x&&keys.length===2) {
			console.log("[maybe_handle_bin.keys.typed_obj]",x.type,x.v);
			return x;
		}
		console.log("[maybe_handle_bin.keys.string_like]",keys);
		debugger;
		return x;
	}
	/** @api @public @arg {JsonReplacerState} s @arg {string} k @arg {unknown} x @returns {string|symbol|number|boolean|undefined|object|null} */
	typedef_json_replace_bin(s,k,x) {
		s.next_key(k,x);
		switch(typeof x) {
			default: x===""; throw new Error("New type from typeof obj");
			case "undefined": return x;
			case "symbol": return x;
			case "string": return x;
			case "object": return this.typedef_json_replace_bin_obj(s,x);
			case "number": return x;
			case "function": return x;
			case "boolean": return x;
			case "bigint": return `TYPE::V_Bigint<${x}n>`;
		}
	}
	/** @api @public @arg {JsonReplacerState} s @arg {object} x @returns {Ret_gen_json} */
	gen_typedef_bin_json(s,x) {
		let json_res=JSON.stringify(x,this.typedef_json_replace_bin.bind(this,s),"\t");
		json_res=this.replace_until_same(json_res,/\[\s+{([^\[\]]*)}\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).join("\n");
			return `[${vi}]`;
		});
		json_res=json_res.replaceAll(/"TYPE::(.+)"/gm,(_a,/**@type {string} */x) => {
			let [f,...r]=x.replaceAll(/\\"|\\n|\\t/g,(/**@type {string} */v) => {
				if(v==="\\\"") return "\"";
				if(v==="\\n") return "\n";
				if(v==="\\t") return "\t";
				return v;
			}).split("\n");
			r=r.map(e => `\t${e}`);
			return [f,...r].join("\n");
		});
		json_res=json_res.replaceAll(/\"(\w+)\":/g,(_a,g) => {return g+":";});
		return json_res;
	}
	/** @api @public @arg {JsonReplacerState} s @arg {string} cf @arg {object} x @returns {string} */
	gen_typedef_bin(s,cf,x) {
		return `\ntype ${cf}=${this.gen_typedef_bin_json(s,x)};\n`;
	}
	/** @api @public @arg {string} cf @arg {object} x @arg {boolean} [do_break] @returns {string|null|void} */
	codegen_typedef_bin(cf,x,do_break=true) {
		/** @private @type {JsonReplacerState} */
		let s=new JsonReplacerState({
			text_decoder: this._decoder,
			cf,keys: [],is_root: true
		});
		let res_str=this.gen_typedef_bin(s,cf,x);
		if(res_str) {
			if(!this.typedef_cache.includes(res_str)) {
				this.typedef_cache.push(res_str);
				console.log(res_str);
			}
		}
		if(do_break) {debugger;}
	}
	/** @protected @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:[T];}} T @arg {string} cf @arg {T} x @arg {(this:this,x:T[K][0])=>U} f */
	H_d(cf,k,x,f) {
		if(!x) {debugger; return null;}
		this.k(cf,x);
		let keys=this.get_keys_of(x);
		if(keys.length!==1) debugger;
		if(k!=keys[0]) {debugger; return null;}
		const a=x[k];
		if(!a) {debugger; return null;}
		const [value]=a;
		return f.call(this,value);
	}
	/**
	 * @protected
	 * @template V @template {PropertyKey} K @template {{[U in K]:[T];}} T
	 * @arg {K} k @arg {CF_H_a} cf @arg {T} x @arg {(this:this,x:T[K][0])=>V} f
	 * @returns {[y,ret]}
	 */
	H_a(cf,k,x,f,save=false) {
		if(save) this.k(cf,x);
		const {[k]: [a],...y}=this.s(cf,x);
		const ret=f.call(this,a);
		return [y,ret];
	}
	/** @type {string[]} */
	_continuation_logged_str=[];
	/** @private @arg {P_ParamParse} cf @arg {D_ProtobufObj[]} x */
	decode_binary_arr(cf,x) {
		if(x.length===0) debugger;
		let bin_obj=this.tr_arr_to_obj(x);
		if(!bin_obj) {debugger; return;}
		try {
			this.binary_result(cf,bin_obj);
		} catch(e) {
			if(e instanceof Error) {
				this.codegen_typedef_bin(`${cf}.err`,{message: e.message},false);
				this.codegen_typedef_bin(`P_${cf.replaceAll(".","_")}`,bin_obj,false);
			} else {
				debugger;
			}
		}
	}
	/** @private @arg {string} x */
	read_b64_protobuf(x) {
		let buffer=base64_url_dec.decodeByteArray(x);
		if(!buffer) {debugger; return null;}
		let reader=new MyReader(buffer);
		let protobuf_arr=reader.try_read_any();
		if(protobuf_arr===null) return null;
		if(protobuf_arr.find(e => e[0]==="error")) return null;
		return protobuf_arr;
	}
	/** @public @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {return this.AU_EngagementPanel(a);}
		});
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RS_AttGet} x */
	RS_AttGet(x) {
		const cf="RS_AttGet";
		const {responseContext: {},challenge,bgChallenge,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(challenge);
		this.xr.D_AttBgChallenge(bgChallenge);
	}
	/** @public @arg {RS_Guide} x */
	RS_Guide(x) {
		const cf="RS_Guide";
		const {responseContext: {},items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,x => this.xr.G_GuideSectionItem(x));
		this.trackingParams(trackingParams);
	}
	/** @public @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		const [sec,id]=x; if(sec!=="shorts") debugger;
		this.indexed_db_put("video_id",{
			key: `video_id:shorts:${id}`,
			base: "video_id",
			type: "video_id:shorts",v: id
		});
	}
	/** @protected @arg {string} x @returns {D_BrowseIdStr|null} */
	decode_browse_id(x) {
		if(this.str_starts_with(x,"FE")) {
			switch(x) {
				case "FEcomment_shorts_web_top_level":
				case "FEwhat_to_watch":
				case "FEexplore": return x;
				default: console.log(`--- [decode_browse_id] ---\n\n\ncase "${x}:`); return null;
			}
		}
		return null;
	}
	/** @private @type {string[]} */
	cache_playlist_index=[];
	log_start_radio=false;
	log_playlist_index=false;
	/** @public @arg {CF_L_TP_Params} root @arg {Extract<T_SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url_url_arr(root,x) {
		let vv=split_string(x,"&");
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @private @type {T_SplitOnce<typeof prop,"=">} */
			let res=split_string_once(prop,"=");
			switch(res[0]) {
				case "v": this.G_UrlInfoItem({type: "video",id: res[1]}); break;
				case "list": this.parse_guide_entry_id(res[1]); break;
				case "rv": this.G_UrlInfoItem({type: "video-referral",id: res[1]}); break;
				case "pp": {
					if(root==="R_WatchPage_VE3832") {
						const [,playerParams]=res;
						this.playerParams("watch.player_params",playerParams);
					} else {
						debugger;
					}
				} break;
				case "start_radio": {if(this.log_start_radio) console.log("[playlist_start_radio]",res[1]);} break;
				case "index": {
					if(this.cache_playlist_index.includes(res[1])) break;
					this.cache_playlist_index.push(res[1]);
					if(this.log_playlist_index) console.log("[playlist_index]",res[1]);
				} break;
				case "t": this.G_UrlInfoItem({type: "video-referral",id: res[1]}); break;
				case "playnext": this.G_UrlInfoItem({type: "play-next",value: res[1]}); break;
				default: res[0]===""; debugger;
			}
		}
	}
	/** @public @arg {[RE_D_VE3832_PreconnectUrl]} x */
	parse_preconnect_arr(x) {
		if(x.length!==1) debugger;
		this.RE_D_VE3832_PreconnectUrl(x[0]);
	}
	/** @type {string[]} */
	logged_hosts=[];
	log_googlevideo_host=false;
	/** @private @arg {RE_D_GoogleVideoUrl_Hostname} x */
	on_googlevideo_host(x) {
		let url_parts=split_string_once(x,".");
		let [m2]=url_parts;
		let m3=split_string_once(m2,"---");
		let [,mi]=m3;
		/** @type {D_GoogleVideoHostPartition} */
		let host_partition=this.get_host_partition(mi);
		this.D_GoogleVideoHostPartition("url",host_partition);
		const gen_cf="js_gen_case:log_googlevideo_host";
		let ap_z=host_partition.partition;
		// cSpell:ignoreRegExp /"(5u|qx)[a-z]{3}"/
		switch(ap_z) {
			default: {
				let gen=this.cg.codegen_case_cache(`${gen_cf}:host_partition`,host_partition.partition);
				if(gen.has) break;
				console.log(`-- [${gen_cf}:host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
			}; break;
			case "5uald":
			case "a5mek":
			case "ab5l6":
			case "hp57k":
			case "hp57y":
			case "nx5s7":
			case "nx57y":
			case "p5qls":
			case "p5qs7":
			case "qxoed":
		}
		this.save_string("googlevideo_host.selector",host_partition.selector);
		let selector_parts=split_string(host_partition.selector,"");
		switch(selector_parts[0]) {
			default: debugger; {
				switch(selector_parts[0]) {
					case "": break;
				}
			} break;
			case "6": case "7": case "d": case "e": case "l": case "s": case "z": {
				switch(selector_parts[1]) {
					default: debugger; {
						switch(selector_parts[1]) {
						}
					} break;
					case "6": case "d": case "e": case "k":
					case "l": case "s": case "y": case "z":
				}
			}
		}
		if(this.log_googlevideo_host) {
			if(this.logged_hosts.includes(x)) return;
			this.logged_hosts.push(x);
			console.log("[googlevideo_host] [%s]",x);
			Promise.resolve().then(() => this.logged_hosts.length=0);
		}
	}
	/** @private @arg {"RE_D_VE3832_PreconnectUrl"|"D_VideoPlaybackShape_LS_Params"|"url"} cf @arg {D_GoogleVideoHostPartition} x */
	D_GoogleVideoHostPartition(cf,x) {
		this.save_string(`google_video.${cf}.partition`,x.partition);
		this.save_string(`google_video.${cf}.selector`,x.selector);
	}
	/** @private @arg {`rr${number}---sn-${string}n${string}`} x */
	get_google_host_parts_for_part_1(x) {
		let parts_1=split_string(x,"---");
		if(!this.str_starts_with(parts_1[0],"rr")) return null;
		let part_2=split_string_once(parts_1[0],"rr")[1];
		let p=this.get_host_partition(parts_1[1]);
		return {
			/** @type {["rr",`${number}`,"---","sn","-",G_Gv_0,"n",G_Gv_1]} */
			parts: ["rr",part_2,"---",...p.parts],
			partitioned: p,
		};
	}
	/** @private @arg {RE_D_VE3832_PreconnectUrl} x */
	get_google_host_parts(x) {
		let parsed_url_obj=this.tr_url_to_obj(x);
		const host=parsed_url_obj.host;
		let [host_parts_1,empty_1,...y]=split_string(host,".googlevideo.com");
		if(empty_1!=="") debugger; if(y.length!==0) debugger;
		let host_parts_2=this.get_google_host_parts_for_part_1(host_parts_1);
		if(!host_parts_2) {
			return {
				host,
				path: parsed_url_obj.pathname,
				/** @type {[null,"googlevideo","com"]} */
				parts: [null,"googlevideo","com"],
				partitioned: null,
			};
		}
		let dec_parts=host_parts_2.parts;
		return {
			host,
			path: parsed_url_obj.pathname,
			/** @type {[typeof dec_parts,"googlevideo","com"]} */
			parts: [dec_parts,"googlevideo","com"],
			partitioned: host_parts_2.partitioned,
		};
	}
	/** @private @arg {RE_D_VE3832_PreconnectUrl} x */
	RE_D_VE3832_PreconnectUrl(x) {
		const cf="RE_D_VE3832_PreconnectUrl";
		let parts=this.get_google_host_parts(x);
		if(parts.path!=="/generate_204") debugger;
		this.on_googlevideo_host(parts.host);
		if(!parts.parts[0]) {debugger; return;}
		/** @type {`${1|2|3|4|5}`} */
		let num_part=as(parts.parts[0][1]);
		switch(num_part) {
			default: num_part===""; debugger; break;
			case "1": case "2": case "3": case "4": case "5":
		}
		let [,s1,s2,s3,s4,/*s5*/partition,s6,selector]=parts.parts[0];
		let p=parts.partitioned;
		if(!p) {debugger; return;}
		this.D_GoogleVideoHostPartition(cf,p);
		/** @type {G_Gv_0} */
		let p_type=partition;
		console.log(`[google_video_preconnect] ["https-parts://[rr][${s1}][${s2}][${s3}][${s4}][${partition}][${s6}][${selector}][.][googlevideo][.][com]"]`);
		// cSpell:ignoreRegExp /"(vgqsk)"/
		switch(p_type) {
			default: {
				let gen=this.cg.codegen_case_cache(`${cf}.host_partition`,p_type);
				if(gen.has) break;
				console.log(`-- [js_gen_case:${cf}.host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
				debugger;
			}; break;
			case "9gv7e":
			case "nx5s7":
			case "nx57y":
			case "vgqsk":
		}
		switch(p.selector) {
			default: p.selector===""; debugger; break;
			case "6d":
			case "d6":
			case "lk":
			case "sd": case "se": case "sk": case "sl": case "sr": case "ss": case "sz":
			case "76": case "7d": case "7s": case "7y": case "7z":
			case "el": case "ee":
			case "zk": case "zr": case "zy":
		}
	}
	/** @public @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC","responseContext",x);}
	/** @private @arg {AU_EngagementPanel} x */
	AU_EngagementPanel(x) {
		const cf="AU_EngagementPanel";
		const {updateEngagementPanelAction,clickTrackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.AD_UpdateEngagementPanel(updateEngagementPanelAction);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @type {Map<string,((y:C_UpdateToggleButtonState)=>void)>} */
	h_m=new Map;
	/** @public @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel";
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,cacheMetadata,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.xr.R_C4TabbedHeader(header);
		this.xr.R_Channel_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.tz(onResponseReceivedActions,this.C_ResetChannelUnreadCount);
		this.t(cacheMetadata,this.D_Cache_MD);
	}
	/** @public @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel";
		const {responseContext: {},trackingParams,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel_Action";
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @public @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe";
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => this.xr.G_RS_Subscribe_Action(x));
		this.g(newNotificationButton);
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {AD_UpdateChannelSwitcherPage} x */
	AD_UpdateChannelSwitcherPage(x) {this.TA_Page("AD_UpdateChannelSwitcherPage",x,x => this.xr.R_ChannelSwitcherPage(x));}
	/** @public @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe";
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			x;
		});
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {DC_LiveChat} x */
	DC_LiveChat(x) {
		const cf="DC_LiveChat";
		const {continuations,actionPanel,actions,clientMessages,emojis,header,itemList,ticker,trackingParams,participantsList,popoutMessage,viewerName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(continuations,x => this.xr.G_LiveChatContinuationItem(x));
		this.t(actionPanel,x => this.xr.R_LiveChatMessageInput(x));
		this.tz(actions,x => this.xr.G_LiveChatContinuationActions(x));
		this.t(clientMessages,this.D_ClientMessages);
		this.tz(emojis,x => this.xr.D_LiveChatEmoji(x));
		this.t(header,this.R_LiveChatHeader);
		this.t(itemList,x => this.xr.R_LiveChatItemList(x));
		this.t(ticker,x => this.xr.R_LiveChatTicker(x));
		this.trackingParams(trackingParams);
		this.t(participantsList,x => this.xr.R_LiveChatParticipantsList(x));
		this.t(popoutMessage,x => this.xr.R_Message(x));
		this.t(viewerName,this.a_primitive_str);
	}
	/** @private @arg {AD_AccountItem} x */
	AD_AccountItem(x) {
		const cf="AD_AccountItem";
		const {accountName,accountPhoto,isSelected,isDisabled,hasChannel,serviceEndpoint,accountByline,channelHandle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(accountName);
		this.D_Thumbnail(accountPhoto);
		this.a_primitive_bool(isSelected);
		this.a_primitive_bool(isDisabled);
		this.a_primitive_bool(hasChannel);
		this.g(serviceEndpoint);
		this.G_Text(accountByline);
		this.G_Text(channelHandle);
	}
	/** @arg {S_VideoGoodPutShape} x */
	S_VideoGoodPutShape(x) {
		const cf="S_VideoGoodPutShape";
		const {id,source,range,expire,ip,ms,mm,pl,nh,sparams,signature,key,...y}=this.s(cf,x); this.g(y);
		this.save_b64_binary(`${cf}.id`,id);
		this.save_string(`${cf}.source`,source);
		this.save_string(`${cf}.range`,range);
		let exp=this.parse_number_template(expire);
		this.a_primitive_num(exp);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ms`,ms);
		this.save_string(`${cf}.mm`,mm);
		this.save_string(`${cf}.pl`,pl);
		this.save_b64_binary(`${cf}.nh`,nh);
		switch(sparams) {
			default: this.cg.codegen_case(`${cf}.sparams`,sparams); debugger; break;
			case "id,source,range,expire,ip,ms,mm,pl,nh": break;
		}
		this.parse_signature(signature);
		this.save_string(`${cf}.key`,key);
	}
	/** @private @arg {`sn-${string}n${string}`} x @returns {D_GoogleVideoHostPartition} */
	get_host_partition(x) {
		let parts=this.get_gv_parts_impl(x);
		return {
			parts,
			partition: parts[2],
			selector: parts[4],
		};
	}
	/** @private @arg {`sn-${string}n${string}`} x @returns {["sn","-",G_Gv_0,"n",G_Gv_1]} */
	get_gv_parts_impl(x) {
		let ss=split_string(x,"-")[1];
		let idx=5;
		let r1=ss.slice(0,idx);
		let r2=ss.slice(idx+1);
		if(ss[idx]!=="n") debugger;
		this.assert_assume_is_type(r1,/**@returns {G_Gv_0} */() => {throw new Error();});
		this.assert_assume_is_type(r2,/**@returns {G_Gv_1} */() => {throw new Error();});
		return ["sn","-",r1,"n",r2];
	}
	/** @private @arg {D_VideoPlaybackShape_S_Params} x */
	D_VideoPlaybackShape_S_Params(x) {
		const cf1="D_VideoPlaybackShape_S_Params",cf2="video_playback.api_url"; cf2;
		const {expire,ei,ip,aitags,id,itag,source,requiressl,ctier,spc,vprv,xtags,mime,ns,cnr,gir,clen,ratebypass,dur,lmt,...y}=this.s(cf1,x); this.g(y);
		this.a_primitive_str(expire);
		this.a_primitive_str(ei);
		this.a_primitive_str(ip);
		aitags&&this.save_string(`${cf1}.aitags`,aitags);
		this.save_b64_binary(`${cf2}.id`,id);
		itag&&this.save_string(`${cf1}.itag`,itag);
		this.save_string(`${cf1}.source`,source);
		this.save_string(`${cf1}.requiressl`,requiressl);
		this.t(ctier,x => this.ceq("SH",x));
		spc&&this.save_b64_binary(`${cf1}.spc`,spc);
		this.save_string(`${cf1}.vprv`,vprv);
		this.t(xtags,x => this.save_string(`${cf1}.xtags`,x));
		this.save_string(`${cf1}.mime`,mime);
		this.save_b64_binary(`${cf2}.ns`,ns);
		cnr&&this.save_string(`${cf1}.cnr`,cnr);
		if(gir) this.save_string(`${cf1}.gir`,gir);
		this.t(clen,x => {
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		});
		ratebypass&&this.save_string(`${cf1}.ratebypass`,ratebypass);
		let dur_=this.parse_number_template(dur);
		this.a_primitive_num(dur_);
		let lmt_=this.parse_number_template(lmt);
		this.a_primitive_num(lmt_);
	}
	/** @private @arg {D_VideoPlaybackShape_LS_Params} x */
	D_VideoPlaybackShape_LS_Params(x) {
		const cf1="D_VideoPlaybackShape_LS_Params",cf2="video_playback.api_url"; cf2;
		const {mh,mm,mn,ms,mv,mvi,pl,initcwndbps,...y}=this.s(cf1,x); this.g(y);
		this.save_string(`${cf1}.mh`,mh);
		this.save_string(`${cf1}.mm`,mm);
		// cSpell:ignoreRegExp /"sn-(?:(o097zn|9gv7ln|n4v7sn|nx57yn).{2})"/
		let mn_arr=split_string(mn);
		for(let mi of mn_arr) {
			/** @type {D_GoogleVideoHostPartition} */
			let ap=this.get_host_partition(mi);
			this.D_GoogleVideoHostPartition(cf1,ap);
			switch(ap.partition) {
				default: {
					let {partition: x}=ap;
					let gen=this.cg.codegen_case_cache(`js_gen_case:log_videoplayback:${cf1}.mn.host_partition`,x);
					if(gen.has) break;
					console.log(`-- [js_gen_case:log_videoplayback:${cf1}.mn.host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
				}; break;
				case "n4v7s": case "nx57y": case "o097z": case "nx5s7": case "9gv7l":
			}
		}
		this.save_string(`${cf1}.ms`,ms);
		this.save_string(`${cf1}.mv`,mv);
		this.save_string(`${cf1}.mvi`,mvi);
		this.save_string(`${cf1}.pl`,pl);
		{
			let x=initcwndbps;
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		}
	}
	/** @private @arg {D_VideoPlaybackShape_Other} x */
	D_VideoPlaybackShape_Other(x) {
		const cf1="D_VideoPlaybackShape_Other",cf2="video_playback.api_url";
		const {fvip,keepalive,fexp,c,txp,n,lsig,sig,...y1}=this.s(cf1,x);
		this.save_string(`${cf1}.fvip`,fvip);
		keepalive&&this.save_string(`${cf1}.keepalive`,keepalive);
		this.save_string(`${cf1}.fexp`,fexp);
		this.save_string(`${cf1}.c`,c);
		txp&&this.save_string(`${cf1}.txp`,txp);
		this.save_b64_binary(`${cf2}.n`,n);
		this.save_b64_binary(`${cf2}.lsig`,lsig);
		this.t(sig,x => this.save_b64_binary(`${cf2}.sig`,x));
		const {gcr,mt,itag,...y}=y1; this.g(y);
		itag&&this.save_string(`${cf1}.itag`,itag);
		{
			let x=mt;
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		}
		this.t(gcr,x => this.ceq(x,"ca"));
	}
	/** @template T @arg {T} trg @arg {T} src @arg {keyof T} k */
	y_copy_key(trg,src,k) {
		trg[k]=src[k];
	}
	/** @private @template {"sparams"|"lsparams"} K @arg {(keyof D_VideoPlaybackShape)[]} key_list @arg {D_VideoPlaybackShape} x @arg {D_VideoPlaybackShape[K]} params_list @arg {K} target_src_key */
	extract_sparams(key_list,x,params_list,target_src_key) {
		/** @type {{[U in T_Split<typeof params_list>[number]]:D_VideoPlaybackShape[U&keyof D_VideoPlaybackShape]}} */
		let obj_sparams=as({});
		let kk_x=key_list;
		let idx=kk_x.indexOf(target_src_key);
		kk_x.splice(idx,1);
		let kk_sparams=this.split_str(params_list);
		/** @type {any} */
		let xa=x;
		/** @type {typeof obj_sparams} */
		let xt=xa;
		for(let k of kk_sparams) {
			this.y_copy_key(obj_sparams,xt,k);
			let idx=kk_x.indexOf(k);
			kk_x.splice(idx,1);
		}
		return obj_sparams;
	}
	/** @private @arg {"D_VideoPlaybackShape"} cf @arg {D_VideoPlaybackShape} uv */
	extract_shape_params(cf,uv) {
		const {sparams,lsparams}=this.s(cf,uv);
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.lsparams`,lsparams);
		let kk_x=this.get_keys_of(uv);
		let s_params_obj=this.extract_sparams(kk_x,uv,sparams,"sparams");
		let ls_params_obj=this.extract_sparams(kk_x,uv,lsparams,"lsparams");
		/** @typedef {"sparams"|"lsparams"|keyof D_VideoPlaybackShape_S_Params|keyof D_VideoPlaybackShape_LS_Params} OmitY1Keys */
		/** @type {Omit<typeof uv,OmitY1Keys>} */
		let y1=as({});
		/** @type {Exclude<(typeof kk_x)[number],OmitY1Keys>[]} */
		let kk_y1=as(kk_x);
		for(let k of kk_y1) this.y_copy_key(y1,uv,k);
		return {
			s: s_params_obj,
			ls: ls_params_obj,
			y: y1,
		};
	}
	/** @private @arg {D_VideoPlaybackShape} uv */
	D_VideoPlaybackShape(uv) {
		const cf1="D_VideoPlaybackShape";
		const {s,ls,y}=this.extract_shape_params(cf1,uv);
		this.D_VideoPlaybackShape_S_Params(s);
		this.D_VideoPlaybackShape_LS_Params(ls);
		this.D_VideoPlaybackShape_Other(y);
	}
	/** @api @public @arg {UrlParse<Extract<D_UrlFormat,`https://${string}.googlevideo.com/${string}`>>} x */
	on_google_video_url(x) {
		// cSpell:ignoreRegExp /r\d---sn-.+?"/
		let s_host=split_string_once(x.host,".");
		this.on_googlevideo_host(x.host);
		switch(s_host[1]) {
			case "googlevideo.com": {
				switch(x.pathname) {
					case "/videoplayback": {
						let vp_search=x.search;
						let {...pp}=this.parse_url_search_params(vp_search);
						this.D_VideoPlaybackShape(as_any(pp));
					} break;
					case "/initplayback": {
						let ip_search=x.search;
						let {...pp}=this.parse_url_search_params(ip_search);
						pp;
					} break;
					case "/videogoodput": {
						let pp=this.parse_url_search_params(x.search);
						this.S_VideoGoodPutShape(pp);
					} break;
				}
			} return;
			default:
		}
		/** @private @type {D_UrlFormat|GU_ExternalUrl} */
		console.log("[parse_url_external_1]",x);
		{debugger;}
	}
	/** @arg {string} cf @arg {string} sig_str */
	validate_sig(cf,sig_str) {
		if(sig_str.match(/^[0-9A-F]+$/)===null) debugger;
		this.save_number_one(cf,sig_str.length);
		switch(sig_str.length) {
			default: debugger; break;
			case 38: case 40:
		}
	}
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		this.validate_sig("sig.0",sig_0);
		this.validate_sig("sig.1",sig_1);
	}
	/** @public @arg {D_PlayerConfig} x */
	D_PlayerConfig(x) {
		const cf="D_PlayerConfig";
		const {audioConfig,playbackStartConfig,streamSelectionConfig,mediaCommonConfig,webPlayerConfig,...y}=this.s(cf,x); this.g(y);
		this.xr.D_AudioConfig(audioConfig);
		this.t(playbackStartConfig,this.D_StartSeconds);
		this.D_StreamSelectionConfig(streamSelectionConfig);
		this.xr.R_DynamicReadaheadConfig(mediaCommonConfig);
		this.D_WebPlayerConfig(webPlayerConfig);
	}
	/** @public @arg {D_VideoDetails} x */
	D_VideoDetails(x) {
		const cf="D_VideoDetails";
		const {videoId,title,lengthSeconds,keywords,channelId,isOwnerViewing,shortDescription,isCrawlable,thumbnail,allowRatings,viewCount,author,isLowLatencyLiveStream,isPrivate,isUnpluggedCorpus,latencyClass,isLiveContent,...y}=this.s(cf,x); this.g(y);
		this.videoId(videoId);
		this.a_primitive_str(title);
		let num=this.parse_number_template(lengthSeconds);
		this.a_primitive_num(num);
		this.tz(keywords,this.a_primitive_str);
		this.channelId(channelId);
		this.a_primitive_bool(isOwnerViewing);
		this.ceq(isOwnerViewing,false);
		this.a_primitive_str(shortDescription);
		this.ceq(isCrawlable,true);
		this.D_Thumbnail(thumbnail);
		this.a_primitive_bool(allowRatings);
		this.t(viewCount,x => {
			let num=this.parse_number_template(x);
			this.a_primitive_num(num);
		});
		this.a_primitive_str(author);
		this.ceq(isPrivate,false);
		this.ceq(isUnpluggedCorpus,false);
		this.ceq(isLiveContent,false);
	}
	/** @public @arg {D_StartSeconds} x */
	D_StartSeconds(x) {this.y("D_StartSeconds","startSeconds",x,this.a_primitive_num);}
	/** @public @arg {D_StreamSelectionConfig} x */
	D_StreamSelectionConfig(x) {this.y("D_StreamSelectionConfig","maxBitrate",x,x => this.a_primitive_num(this.parse_number_template(x)));}
	/** @arg {D_Menu_WithItems} x */
	D_Menu_WithItems(x) {
		const cf="D_Menu_WithItems";
		const {items,...u_}=this.s(cf,x);
		if(!this.is_not_empty_obj(u_)) return this.g(u_);
		this.z(items,x => {
			if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
			if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
			debugger;
		});
		const {trackingParams,...u2}=u_;
		this.trackingParams(trackingParams);
		if(!this.is_not_empty_obj(u2)) return this.g(u2);
		let u=u2;
		if("flexibleItems" in u) {
			const {topLevelButtons,accessibility,flexibleItems,...y}=u; this.g(y);/*#destructure_done*/
			this.z(topLevelButtons,x => {
				if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
				if("buttonRenderer" in x) return this.R_Button(x);
				debugger;
			});
			this.D_Accessibility(accessibility);
			this.z(flexibleItems,this.R_MenuFlexibleItem);
			return;
		}
		if("topLevelButtons" in u) {
			const {topLevelButtons,accessibility,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Accessibility(accessibility);
			this.z(topLevelButtons,x => {
				if("buttonRenderer" in x) return this.R_Button(x);
				debugger;
			});
			return;
		}
		if("loggingDirectives" in u) {
			const {accessibility,loggingDirectives,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Accessibility(accessibility);
			this.D_LoggingDirectives(loggingDirectives);
			return;
		}
		if("accessibility" in u) {
			const {accessibility,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Accessibility(accessibility);
			return;
		}
		this.g(u);
	}
	/** @private @arg {D_TextRun_NavEP_1} x */
	D_TextRun_NavEP_1(x) {
		const cf="D_TextRun_NavEP_1"; this.k(cf,x);
		if("browseEndpoint" in x) {
			if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
			if(this.is_TE_VE(x,5754)) return this.E_VE5754(x);
			if(this.is_TE_VE(x,6827)) return this.E_VE6827(x);
			if(this.is_TE_VE(x,11487)) return this.E_VE11487(x);
			x===""; debugger;
			return;
		}
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("urlEndpoint" in x) return this.xr.E_VE83769_Url(x);
		if("reelWatchEndpoint" in x) return this.x.get("x_VE37414").E_VE37414_ReelWatch(x);
		x===""; debugger;
	}
	/** @public @arg {D_TextRun} x */
	D_TextRun(x) {
		const cf="D_TextRun";
		const {text,...u}=this.s(cf,x);/*#destructure_done*/
		this.a_primitive_str(text);
		if("strikethrough" in u) {
			const {strikethrough,...y}=u; this.g(y);/*#destructure_done*/
			if(strikethrough!==true) debugger;
			return;
		}
		if("italics" in u) {
			const {italics,...y}=u; this.g(y);/*#destructure_done*/
			if(italics!==true) debugger;
			return;
		}
		if("navigationEndpoint" in u&&"loggingDirectives" in u) {
			const {navigationEndpoint,loggingDirectives,...y}=u;/*#destructure_done*/
			let h=() => {
				let x2=navigationEndpoint;
				if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
				if(this.is_TE_VE(x2,5754)) return this.E_VE5754(x2);
				if(this.is_TE_VE(x2,3611)) return this.E_VE3611(x2);
				debugger;
			};
			h();
			this.D_LoggingDirectives(loggingDirectives);
			if("bold" in y) {
				const {bold,...y1}=y; this.g(y1);/*#destructure_done*/
				this.ceq(bold,true);
				return;
			}
			this.g(y);
			return;
		}
		if("navigationEndpoint" in u) {
			const {navigationEndpoint,...y}=u; this.g(y);/*#destructure_done*/
			this.D_TextRun_NavEP_1(navigationEndpoint);
			return;
		}
		if("bold" in u) {
			const {bold,...y}=u; this.g(y);/*#destructure_done*/
			this.a_primitive_bool(bold);
			return;
		}
		if("emoji" in u) {
			const {emoji,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Emoji(emoji);
			return;
		}
		this.g(u);
	}
	//#region binary
	/** @public @arg {BinaryVe} x */
	BinaryVe(x) {
		switch(x) {
			default: x; debugger; break;
			case 3832:
			case 3854:
			case 5754: break;
		}
	}
	/** @protected @arg {RB_Obj_f19} x @name V_VeDescObj */
	RB_Obj_f19(x) {
		const cf="R_Obj_f19";
		if(2 in x&&!(3 in x)&&!(1 in x)) {
			const {2: f2,...y}=this.s(cf,x); this.g(y);
			this.T_D32(f2,x => this.save_number_one(`${cf}.f2.BinaryVe@base`,x));
			return;
		}
		if(1 in x) {
			const {1: f1,2: f2,...y}=this.s(cf,x); this.g(y);
			this.T_D32(f1,x => this.save_number_one(`${cf}.f1`,x));
			this.T_D32(f2,x => this.save_number_one(`${cf}.f2.BinaryVe@f1`,x));
			this.T_D32(f2,x => this.BinaryVe(x));
			return;
		}
		if(3 in x) /*binary_ve*/ {
			const {2: f2,3: f3,...y}=this.s(cf,x); this.g(y);
			this.T_D32(f2,x => this.save_number_one(`${cf}.f2.BinaryVe@f2`,x));
			this.T_D32(f2,x => this.BinaryVe(x));
			this.T_D32(f3,x => this.save_number_one(`${cf}.f3`,x));
			return;
		}
		this.codegen_typedef_bin(cf,x,false);
	}
	/** @protected @template T @arg {T_VW<T>} x @template U @template {((this:this,x:T)=>U)|null} FT @arg {FT} f @returns {(FT extends null?T:U)} */
	T_VW(x,f) {
		/** @template T @arg {any} _x @arg {()=>T} _ret_ex @returns {asserts _x is T} */
		function assume_ret(_x,_ret_ex) {}
		/** @returns {FT extends null?T:U} */
		function ret_ex() {throw new Error();}
		let ret=null;
		/** @type {T_VW<T>[1]|null} */
		let pa=null;
		/** @type {T_VW<T>[1][0]|null} */
		let v=null;
		if(x[0]==="param_arr") pa=x[1];
		if(pa&&pa.length===1) [v]=pa;
		if(v&&v[0]==="child") {
			if(f===null) {
				let t_ret=v[2];
				assume_ret(t_ret,ret_ex);
				return t_ret;
			} else {
				let u_ret=f.call(this,v[2]);
				assume_ret(u_ret,ret_ex);
				return u_ret;
			}
		}
		assume_ret(ret,ret_ex);
		debugger;
		return ret;
	}
	/** @protected @arg {D_TrackingObj_f16} x */
	PR_TrackingObj_f16(x) {
		const cf="G_PR_TrackingObj_f16";
		const {1: f1,2: f2,3: f3,4: f4,...y}=this.s(cf,x); this.g(y);
		this.T_D32(f1,x => this.save_number_one(`${cf}.f1`,x));
	}
	/** @protected @template {bigint} T @arg {T_VW_Bigint<T>} x */
	T_VW_Bigint(x) {
		let x1=this.T_RawChild(x);
		if(!x1) {debugger; return null;}
		if(x1[0]!=="data64") {debugger; return null;}
		return x1[2];
	}
	/** @protected @arg {H_TrackingObj} x */
	H_TrackingObj(x) {
		const cf="H_TrackingObj",t=this;
		const {1: f1,2: f2,3: f3,4: f4,6: f6,7: f7,8: f8,9: f9,11: f11,16: f16,19: f19,21: f21,...y}=x; this.g(y);
		t.t(f1,x => t.TK_D32(cf,x,"tag"));
		t.t(f2,x => t.TK_D32(cf,x,"id"));
		t.t(f3,x => t.TK_D32(cf,x,"f3"));
		t.VW_BinaryTimestamp(f4);
		t.t_cf(`${cf}_f6`,f6,t.H_TrackingObj_f6);
		t.t(t.t(f7,t.TV_Str),x => t.save_b64_binary(`${cf}.f7`,x));
		t.ms_t(f8,t.T_VW_Bigint);
	}
	/** @arg {VW_BinaryTimestamp} x */
	VW_BinaryTimestamp(x) {this.T_VW(x,this.V_BinaryTimestamp);}
	/** @arg {"H_TrackingObj"} cf @arg {T_D32<number>} x @arg {T_ObjGetNumKey<H_TrackingObj,KM_TrackingObj>} k */
	TK_D32(cf,x,k) {this.T_D32(x,x => this.save_number_one(`${cf}.${k}`,x));}
	/** @template T @arg {T} x @template U @arg {(x:T)=>U} y @returns {M_Optional<U>} */
	ms(x,y) {return this.mt(this.m(x),y);}
	/** @template {{}} T @arg {T|undefined} x @template U @arg {(x:T)=>U} y @returns {M_Optional<U|null>} */
	ms_t(x,y) {return this.ms(x,x => this.t(x,y));}
	/** @template {{}} T @arg {Some<T|null>} x @template U @arg {(x:T)=>U} y @returns {Some<U|null>} */
	mt_t(x,y) {return this.mt(x,x => this.t(x,y));}
	/** @arg {"H_TrackingObj_f6"} cf @arg {H_TrackingObj_f6} x */
	H_TrackingObj_f6(cf,x) {
		if(x[0]!=="param_arr") debugger;
		let [,[a,...y1]]=x; this.ceq(y1.length,0);
		const [t]=a;
		/** @type {["T",H_TrackingObj_f6_Str]|["U",string]|null} */
		let r_str=null;
		switch(t) {
			default: debugger; break;
			case "child": const [,a1]=a; let str=this._decoder.decode(a1); r_str=["U",str]; break;
			case "raw_child": const [,,,b]=a; const [,c]=b; r_str=["T",c];
		}
		if(!r_str) return;
		this.save_string(`${cf}.str`,r_str[1]);
		if(r_str[0]==="U") {
			this.save_string(`${cf}.str.unk`,`${r_str[0]}:${r_str[1]}`);
			return;
		}
		switch(r_str[1]) {
			default: this.save_string(`${cf}.str.default`,r_str); break;
			case "external": break;
			case "list_other": break;
			case "related": break;
			case "related-auto": break;
			case "watch": break;
		}
	}
	/** @arg {"H_TrackingObj"} cf @arg {{tag: H_TrackingObj_Tag,id: H_TrackingObj_Id;}} x */
	P_Tag_TrackingObj(cf,x) {this.TK_D32(cf,x.tag,"tag"); this.TK_D32(cf,x.id,"id");}
	/** @protected @arg {{type:"click_tracking",v:H_TrackingObj}|{type:"tracking",v:H_TrackingObj}} x */
	P_Typed_TrackingObj(x) {
		const cf="P_Typed_TrackingObj";
		const {type,v: z}=x; this.k(cf,z);
		switch(type) {
			case "click_tracking": return this.H_TrackingObj(z);
			case "tracking": return this.H_TrackingObj(z);
		}
	}
	//#region get keys (check for optional keys with `let {ex_key:{}}=x;` and `let {ex_key:{}={}}=x;`)
	/** @private @arg {P_ypc_get_offers_params} x */
	P_ypc_get_offers_params(x) {
		const cf="P_ypc_get_offers_params";
		const {1: a,3: {},5: {},...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_trending_bp} x */
	P_trending_bp(x) {
		const cf="P_trending_bp";
		const {77: a}=this.s(cf,x);
		this.t(this.TV_Str(a),x => this.save_string(`${cf}.f77`,x));
	}
	/** @private @arg {P_aadc_guidelines_state_entity_key} x */
	P_aadc_guidelines_state_entity_key(x) {
		const cf="P_aadc_guidelines_state_entity_key";
		const {2: a,4: {},5: {},...y}=this.s(cf,x);
		this.t(this.TV_Str(a),x => this.save_string(`${cf}.a`,x));
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_create_comment_params} x */
	P_create_comment_params(x) {
		const cf="P_create_comment_params";
		const {2: a,5: {},10: {},...y}=this.s(cf,x);
		this.t(this.TV_Str(a),x => this.videoId(x));
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {PD_continuation_params} x */
	PD_continuation_params(x) {
		const cf="PD_continuation_params";
		const {3: a,...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {PR_continuation_params} x */
	PR_continuation_params(x) {
		const cf="PR_continuation_params";
		const {0x94d81d4: n}=this.s(cf,x);
		this.PD_continuation_params(n);
	}
	/** @private @arg {P_get_pdg_buy_flow_params} x */
	P_get_pdg_buy_flow_params(x) {
		const cf="P_get_pdg_buy_flow_params";
		const {1: f1,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_reel_sequence_params} x */
	P_reel_sequence_params(x) {
		const cf="P_reel_sequence_params";
		const {1: f1,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_continuation_request_reel_watch_sequence_token} x */
	P_continuation_request_reel_watch_sequence_token(x) {
		const cf="P_continuation_request_reel_watch_sequence_token";
		const {1: {}={},3: {},5: {},8: {}={},12: {}={},15: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_transcript_track_selection_serialized_params} x */
	P_transcript_track_selection_serialized_params(x) {
		const cf="P_transcript_track_selection_serialized_params";
		const {1: f1,2: f2,3: f3,6: {},7: {},8: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_transcript_track_selection_entity_key} x */
	P_transcript_track_selection_entity_key(x) {
		const cf="P_transcript_track_selection_entity_key";
		const {2: {},4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_get_transcript_params} x */
	P_get_transcript_params(x) {
		const cf="P_get_transcript_params";
		const {1: f1,2: f2,3: f3,5: {},6: {},7: {},8: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_shorts_source_bp} x */
	P_shorts_source_bp(x) {
		const cf="P_shorts_source_bp";
		const {94: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	PG_subscription_state_key=this.P_subscription_state_key;
	/** @private @arg {P_subscription_state_key} x */
	P_subscription_state_key(x) {
		const cf="P_subscription_state_key";
		const {2: a,4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		this.t(this.TV_Str(a),x => this.channelId(x));
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_create_backstage_post_params} x */
	P_create_backstage_post_params(x) {
		const cf="P_create_backstage_post_params";
		const {1: f1,2: f2,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_load_markers_entity_key} x */
	P_load_markers_entity_key(x) {
		const cf="P_load_markers_entity_key";
		const {2: {},4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_watch_playlist_params} x */
	P_watch_playlist_params(x) {
		const cf="P_watch_playlist_params";
		const {2: {},3: f3,7: {},12: {},13: {},27: f7,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_playlist_loop_state_entity_key} x */
	P_playlist_loop_state_entity_key(x) {
		const cf="P_playlist_loop_state_entity_key";
		const {2: {},4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_entity_key_normal} x */
	P_entity_key_normal(x) {
		const cf="P_entity_key_normal";
		const {2: {},4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_continuation_request_watch_next_token} x */
	P_continuation_request_watch_next_token(x) {
		const cf="P_continuation_request_watch_next_token";
		const {1: f1,2: f2,3: f3,5: f5,6: f6,9: f9,13: f13,14: f4,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_unsubscribe_params} x */
	P_unsubscribe_params(x) {
		const cf="P_unsubscribe_params";
		const {1: f1,2: f2,3: f3,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_subscribe_params} x */
	P_subscribe_params(x) {
		const cf="P_subscribe_params";
		const {2: {},3: f3,4: f4,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_subscribe_button_entity_key} x */
	P_subscribe_button_entity_key(x) {
		const cf="P_subscribe_button_entity_key";
		const {2: a,4: b,5: c,...y}=this.s(cf,x);
		this.t(this.TV_Str(a),this.channelId);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_like_params} x */
	P_like_params(x) {
		const cf="P_like_params";
		const {1: f1,4: f4,5: f5,6: {},7: f7,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_remove_like_params} x */
	P_remove_like_params(x) {
		const cf="P_remove_like_params";
		const {1: f1,3: f3,4: {}={},5: {},6: {}={},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @type {string[]} */
	LP_dislike=[];
	/** @private @arg {P_dislike_params} x */
	P_dislike_params(x) {
		const cf="P_dislike_params";
		const {1: a,3: {}={},2: c,4: d,5: {}={},...y}=this.s(cf,x); this.g(y);
		this.T_VW(a,x => {
			const {1: f1,...y}=x; this.g(y);
			if(f1[0]!=="param_arr") {debugger; return;}
			let [,[a,...y1]]=f1; this.ceq(y1.length,0);
			switch(a[0]) {
				default: debugger; break;
				case "child": {
					let [,bin,]=a;
					let video_id=this._decoder.decode(bin);
					this.videoId(video_id);
				} break;
				case "raw_child": /*D_VideoId*/{
					let [,,,[t,x]]=a;
					if(t!=="string") debugger;
					this.videoId(x);
				} break;
			}
		});
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_entity_key} x */
	P_entity_key(x) {
		const cf="P_entity_key";
		const {2: {},4: f4,5: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_playability_status_context_params} x */
	P_playability_status_context_params(x) {
		const cf="P_playability_status_context_params";
		const {1: f1,2: f2,...y}=this.s(cf,x); this.g(y);
		this.T_D32(f1,x => this.save_number_one(`${cf}.f1`,x));
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_logging_context_serialized_context_data} x */
	P_logging_context_serialized_context_data(x) {
		const cf="P_logging_context_serialized_context_data",t=this;
		const {1: f1,3: f3,...y}=this.s(cf,x); this.g(y);
		this.t_cf(`${cf}.f1`,f1,(cf,x) => this.T_VW(x,x => {
			const {1: f1,...y}=this.s(cf,x);
			let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
		}));
		t.t(t.t(f3,t.TV_Str),this.playlistId);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_reel_params} x */
	P_reel_params(x) {
		const cf="P_reel_params";
		const {1: f1,3: {}={},5: {}={},6: {}={},...y}=this.s(cf,x); this.g(y);
		this.T_D32(f1,x => this.save_number_one(`${cf}.f1`,x));
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_ad_layout_ad_serving_data_entry} x */
	P_ad_layout_ad_serving_data_entry(x) {
		const cf="P_ad_layout_ad_serving_data_entry";
		const {4: {},5: {}={},6: {},7: {},9: {},10: {},13: {},14: {},...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry} x */
	P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry(x) {
		const cf="P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry";
		const {1: f1,3: f3,4: f4,...y}=this.s(cf,x); this.g(y);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @type {string[]} */
	params_to_decode=[];
	/** @private @arg {PD_continuation_request_browse_token} x */
	PD_continuation_request_browse_token(x) {
		const cf="PD_continuation_request_browse_token";
		const {2: f2,3: f3,35: f35,...y}=this.s(cf,x); this.g(y);
		this.t(this.TV_Str(f2),x => {
			this.save_string(`${cf}.f2`,x);
			switch(x) {
				case "FEwhat_to_watch": break;
			}
		});
		this.t(this.TV_Str(f3),x => {
			if(this.params_to_decode.includes(x)) return;
			this.params_to_decode.push(x);
		});
		this.t(f35,x => this.t(this.TV_Str(x),x => {
			if(x!=="browse-feedFEwhat_to_watch") debugger;
		}));
	}
	/** @private @arg {PR_continuation_request_browse_token} x */
	PR_continuation_request_browse_token(x) {
		const cf="PR_continuation_request_browse_token";
		const {0x4c82a9c: a,...y}=this.s(cf,x); this.g(y);
		this.T_VW(a,this.PD_continuation_request_browse_token);
	}
	/** @private @arg {P_create_playlist_params} x */
	P_create_playlist_params(x) {
		const cf="P_create_playlist_params";
		const {1: f1,...y}=this.s(cf,x); this.g(y);
		this.T_D32(f1,x => this.save_number_one(`${cf}.f1`,x));
	}
	/** @private @arg {P_reel_player_params} x */
	P_reel_player_params(x) {
		const cf="P_reel_player_params"; let t=this;
		const {30: f30,57: f57,71: f71,72: f72,...y}=this.s(cf,x); this.g(y);
		/** @template {number} T @arg {T_ObjGetNumKey<P_reel_player_params>} k @arg {T_D32<T>|undefined} v */
		let r=(k,v) => {t.mt_cf(t.mt(t.m(v),x => this.t(x,this.T_D32_v)),`${cf}.${k}`,(cf,x) => t.tn_cf(cf,x,t.save_number_one));};
		r("f30",f30); r("f57",f57); r("f71",f71);
		t.ms(f72,x => this.t(x,this.T_VW_Bigint));
	}
	/** @private @arg {P_ve_6827_params} x */
	P_ve_6827_params(x) {
		const cf="P_ve_6827_params";
		const {77: f77,84: f84,...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_watch_params} x */
	P_watch_params(x) {
		const cf="P_watch_params";
		const {24: f24,...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_watch_player_params} x */
	P_watch_player_params(x) {
		const cf="P_watch_player_params";
		const {12: f12,25: f25,...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_format_item_xtags} x */
	P_format_item_xtags(x) {
		const cf="P_format_item_xtags";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_get_notification_menu_ctoken} x */
	P_get_notification_menu_ctoken(x) {
		const cf="P_get_notification_menu_ctoken";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_notification_opt_out} x */
	P_notification_opt_out(x) {
		const cf="P_notification_opt_out";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_get_report_form_params} x */
	P_get_report_form_params(x) {
		const cf="P_get_report_form_params";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_notification_record_interactions} x */
	P_notification_record_interactions(x) {
		const cf="P_notification_record_interactions";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_player_state_entity_key} x */
	P_player_state_entity_key(x) {
		const cf="P_player_state_entity_key";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	/** @private @arg {P_macro_marker_repeat_state_entity_key} x */
	P_macro_marker_repeat_state_entity_key(x) {
		const cf="P_macro_marker_repeat_state_entity_key";
		const {...y}=this.s(cf,x);
		let u=this.get_keys_of_2(y); if(u.length>0) {let k=u.join(); console.log(`[${cf}.next_key]`,k);}
	}
	//#endregion
	/** @private @arg {P_ParamParse} cf @arg {V_ParamObj} x */
	binary_result(cf,x) {
		switch(cf) {
			case "params.click_tracking": {
				/** @type {H_TrackingObj} */
				let v=as_any(x);
				this.P_Typed_TrackingObj({type: "click_tracking",v});
			} break;
			case "params.tracking": {
				/** @type {H_TrackingObj} */
				let v=as_any(x);
				this.P_Typed_TrackingObj({type: "tracking",v});
			} break;
			case "reel.player_params": {
				/** @type {P_reel_player_params} */
				let u=as_any(x);
				this.P_reel_player_params(u);
			} break;
			case "create_playlist.params": {
				/** @type {P_create_playlist_params} */
				let u=as_any(x);
				this.P_create_playlist_params(u);
			} break;
			case "continuation_request.browse.token": {
				/** @type {PR_continuation_request_browse_token} */
				let u=as_any(x);
				this.PR_continuation_request_browse_token(u);
			} break;
			case "ad_slot_logging_data.serialized_slot_ad_serving_data_entry": {
				/** @type {P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry} */
				let u=as_any(x);
				this.P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry(u);
			} break;
			case "ad_layout.ad_serving_data_entry": {
				/** @type {P_ad_layout_ad_serving_data_entry} */
				let u=as_any(x);
				this.P_ad_layout_ad_serving_data_entry(u);
			} break;
			case "reel.params": {
				/** @type {P_reel_params} */
				let u=as_any(x);
				this.P_reel_params(u);
			} break;
			case "logging_context.serialized_context_data": {
				/** @type {P_logging_context_serialized_context_data} */
				let u=as_any(x);
				this.P_logging_context_serialized_context_data(u);
			} break;
			case "like.params": {
				/** @type {P_like_params} */
				let u=as_any(x);
				this.P_like_params(u);
			} break;
			case "playability_status.context_params": {
				/** @type {P_playability_status_context_params} */
				let u=as_any(x);
				this.P_playability_status_context_params(u);
			} break;
			case "entity.key": {
				/** @type {P_entity_key} */
				let u=as_any(x);
				this.P_entity_key(u);
			} break;
			case "remove_like.params": {
				/** @type {P_remove_like_params} */
				let u=as_any(x);
				this.P_remove_like_params(u);
			} break;
			case "dislike.params": {
				/** @type {P_dislike_params} */
				let u=as_any(x);
				this.P_dislike_params(u);
			} break;
			case "subscribe_button.entity_key": {
				/** @type {P_subscribe_button_entity_key} */
				let u=as_any(x);
				this.P_subscribe_button_entity_key(u);
			} break;
			case "subscribe.params": {
				/** @type {P_subscribe_params} */
				let u=as_any(x);
				this.P_subscribe_params(u);
			} break;
			case "unsubscribe.params": {
				/** @type {P_unsubscribe_params} */
				let u=as_any(x);
				this.P_unsubscribe_params(u);
			} break;
			case "continuation_request.watch_next.token": {
				/** @type {P_continuation_request_watch_next_token} */
				let u=as_any(x);
				this.P_continuation_request_watch_next_token(u);
			} break;
			case "entity_key.normal": {
				/** @type {P_entity_key_normal} */
				let u=as_any(x);
				this.P_entity_key_normal(u);
			} break;
			case "watch_playlist.params": {
				/** @type {P_watch_playlist_params} */
				let u=as_any(x);
				this.P_watch_playlist_params(u);
			} break;
			case "playlist_loop_state.entity.key": {
				/** @type {P_playlist_loop_state_entity_key} */
				let u=as_any(x);
				this.P_playlist_loop_state_entity_key(u);
			} break;
			case "load_markers.entity_key": {
				/** @type {P_load_markers_entity_key} */
				let u=as_any(x);
				this.P_load_markers_entity_key(u);
			} break;
			case "create_backstage_post.params": {
				/** @type {P_create_backstage_post_params} */
				let u=as_any(x);
				this.P_create_backstage_post_params(u);
			} break;
			case "subscription_state.key": {
				/** @type {PG_subscription_state_key} */
				let u=as_any(x);
				this.PG_subscription_state_key(u);
			} break;
			case "shorts.source.bp": {
				/** @type {P_shorts_source_bp} */
				let u=as_any(x);
				this.P_shorts_source_bp(u);
			} break;
			case "get_transcript.params": {
				/** @type {P_get_transcript_params} */
				let u=as_any(x);
				this.P_get_transcript_params(u);
			} break;
			case "transcript_track_selection.entity.key": {
				/** @type {P_transcript_track_selection_entity_key} */
				let u=as_any(x);
				this.P_transcript_track_selection_entity_key(u);
			} break;
			case "transcript_track_selection.serialized_params": {
				/** @type {P_transcript_track_selection_serialized_params} */
				let u=as_any(x);
				this.P_transcript_track_selection_serialized_params(u);
			} break;
			case "continuation_request.reel_watch_sequence.token": {
				/** @type {P_continuation_request_reel_watch_sequence_token} */
				let u=as_any(x);
				this.P_continuation_request_reel_watch_sequence_token(u);
			} break;
			case "reel.sequence_params": {
				/** @type {P_reel_sequence_params} */
				let u=as_any(x);
				this.P_reel_sequence_params(u);
			} break;
			case "get_pdg_buy_flow.params": {
				/** @type {P_get_pdg_buy_flow_params} */
				let u=as_any(x);
				this.P_get_pdg_buy_flow_params(u);
			} break;
			case "continuation.params": {
				/** @type {PR_continuation_params} */
				let u=as_any(x);
				this.PR_continuation_params(u);
			} break;
			case "create_comment.params": {
				/** @type {P_create_comment_params} */
				let u=as_any(x);
				this.P_create_comment_params(u);
			} break;
			case "aadc_guidelines_state.entity_key": {
				/** @type {P_aadc_guidelines_state_entity_key} */
				let u=as_any(x);
				this.P_aadc_guidelines_state_entity_key(u);
			} break;
			case "trending.bp": {
				/** @type {P_trending_bp} */
				let u=as_any(x);
				this.P_trending_bp(u);
			} break;
			case "ypc_get_offers.params": {
				/** @type {P_ypc_get_offers_params} */
				let u=as_any(x);
				this.P_ypc_get_offers_params(u);
			} break;
			case "macro_marker_repeat_state.entity_key": {
				/** @type {P_macro_marker_repeat_state_entity_key} */
				let u=as_any(x);
				this.P_macro_marker_repeat_state_entity_key(u);
			} break;
			case "player_state.entity_key": {
				/** @type {P_player_state_entity_key} */
				let u=as_any(x);
				this.P_player_state_entity_key(u);
			} break;
			case "notification.record_interactions": {
				/** @type {P_notification_record_interactions} */
				let u=as_any(x);
				this.P_notification_record_interactions(u);
			} break;
			case "get_report_form.params": {
				/** @type {P_get_report_form_params} */
				let u=as_any(x);
				this.P_get_report_form_params(u);
			} break;
			case "notification.opt_out": {
				/** @type {P_notification_opt_out} */
				let u=as_any(x);
				this.P_notification_opt_out(u);
			} break;
			case "get_notification_menu.ctoken": {
				/** @type {P_get_notification_menu_ctoken} */
				let u=as_any(x);
				this.P_get_notification_menu_ctoken(u);
			} break;
			case "format_item.xtags": {
				/** @type {P_format_item_xtags} */
				let u=as_any(x);
				this.P_format_item_xtags(u);
			} break;
			case "watch.player_params": {
				/** @type {P_watch_player_params} */
				let u=as_any(x);
				this.P_watch_player_params(u);
			} break;
			case "watch.params": {
				/** @type {P_watch_params} */
				let u=as_any(x);
				this.P_watch_params(u);
			} break;
			case "ve_6827.params": {
				/** @type {P_ve_6827_params} */
				let u=as_any(x);
				this.P_ve_6827_params(u);
			} break;
			case "playlist_edit.params": {
				/** @type {P_playlist_edit_params} */
				let u=as_any(x);
				this.P_playlist_edit_params(u);
			} break;
			case "ve_3611.params": {
				/** @type {P_ve_3611_params} */
				let u=as_any(x);
				this.P_ve_3611_params(u);
			} break;
			default: {
				if(this._continuation_logged_str.includes(cf)) break;
				this.decode_binary_object_log_info(cf,x);
				debugger;
			} break;
		}
	}
	/** @private @arg {P_ve_3611_params} x */
	P_ve_3611_params(x) {x;}
	/** @private @arg {P_playlist_edit_params} x */
	P_playlist_edit_params(x) {x;}
	//#endregion binary
	//#endregion
	//#region TODO_minimal_member_fns
	/** @private @arg {minimal_handler_member} x ! */
	minimal_handler_member_2(x) {x;/*!*/}
	//#endregion
}
//#endregion
export_((exports) => {exports.HandleTypes=HandleTypes;});
