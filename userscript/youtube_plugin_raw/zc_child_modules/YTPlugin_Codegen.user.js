// ==UserScript==
// @name	YTPlugin Codegen Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YtPlugin_Codegen.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YtPlugin_Codegen.user.js
// ==/UserScript==

const {as,do_export,split_string_once,split_string,as_any,JsonReplacerState,ServiceWithAccessors}=require("./YtPlugin_Base.user");

if(window.__yt_plugin_log_imports__) console.log("Load Codegen Service");
const __module_name__="mod$CodegenService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
class CodegenService extends ServiceWithAccessors {
	/** @no_mod @arg {{}} x2 */
	#is_Thumbnail(x2) {return "thumbnails" in x2&&x2.thumbnails instanceof Array&&"url" in x2.thumbnails[0]&&typeof x2.thumbnails[0].url==="string";}
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
		/** @private @type {D_Thumbnail} */
		return "D_Thumbnail";
	}
	/** @no_mod @arg {string[]} req_names @arg {{}} x @arg {string[]} keys @arg {string|number} t_name */
	#codegen_renderer_body(req_names,x,keys,t_name) {
		/** @private @type {{[x:string]:{}}} */
		let x1=x;
		/** @private @type {string[]} */
		let ret_arr=[];
		ret_arr.push(`const cf="${t_name}";`);
		ret_arr.push(`const {${keys.join()},...y}=this.s(cf,x); this.g(y);`);
		for(let k of keys) {
			if(k=="trackingParams") {ret_arr.push(`this.${k}(${k});`); continue;}
			if(k=="clickTrackingParams") {ret_arr.push(`this.${k}(${k});`); continue;}
			if(k=="responseContext") {ret_arr.push(`this.RC$ResponseContext(${k});`); continue;}
			let x2=x1[k];
			if(typeof x2==="string") {this.generate_code_for_string(ret_arr,k,x2); continue;}
			if(typeof x2=="number") {ret_arr.push(`this.primitive_of(${k},"number");`);}
			if(typeof x2=="boolean") {ret_arr.push(`if(${k}!==${x2}) debugger;`); continue;}
			if(typeof x2!=="object") {debugger; continue;}
			let new_code=this.generate_code_for_entry(x2,k);
			if(new_code) {ret_arr.push(new_code); continue;}
			if(x2===null) {ret_arr.push(`if(${k}!==null) debugger;`); continue;}
			if("simpleText" in x2) {ret_arr.push(`this.G_Text(${k});`); continue;};
			/** @private @type {G_Text} */
			if("runs" in x2&&x2.runs instanceof Array) {ret_arr.push(`this.G_Text(${k});`); continue;};
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
	/** @arg {string} x */
	get_codegen_name(x) {
		const k=this.uppercase_first(x);
		if(k.endsWith("Renderer")) {
			let ic=this.uppercase_first(split_string_once(k,"Renderer")[0]);
			return `R_${ic}`;
		}
		return `D_${k}`;
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
	#codegen_padding(x) {return x.replaceAll(/(?:d\d!)*d(\d)!/g,(_v,g) => {return "\t".repeat(g);});}
	/** @arg {string[]} keys @arg {object} x @arg {string} e */
	#codegen_required_renderer_names(keys,x,e) {
		let kk=keys.find(v => v===e);
		if(!kk) {debugger; return "";}
		/** @private @type {{}} */
		let ucx=x;
		/** @private @type {{[x:string]:unknown}} */
		let x1=ucx;
		let val_2=x1[kk];
		let gen_data_name=() => {
			if(!kk) throw new Error();
			let kn_pre=this.get_codegen_name(kk);
			if(this.sm.str_starts_with_rx("R_",kn_pre)) {
				let np_arr_2=split_string_once(kn_pre,"R_");
				return `D_${np_arr_2[1]}`;
			}
			return kn_pre;
		};
		let kn=gen_data_name();
		if(typeof val_2!=="object") return "";
		if(val_2===null) return "";
		let keys_2=Object.keys(val_2);
		/** @private @type {string[]} */
		let next_req=[];
		let body_2=this.#codegen_renderer_body(next_req,val_2,keys_2,kn);
		let tmp0=`
		d1!/** @private @arg {${kn}} x */
		d1!${kn}(x) {
			d2!${body_2}
		d1!}
		`;
		if(next_req.length>0) {
			console.log("[renderer_gen_more_req]",next_req);
			debugger;
		}
		return tmp0;
	}
	/** @arg {string[]} req_names @arg {string} code @arg {string[]} keys @arg {object} x */
	#codegen_renderer_finalize(req_names,code,keys,x) {
		let required_names_code_arr=req_names.map(e => this.#codegen_required_renderer_names(keys,x,e));
		let all_code=required_names_code_arr.join("")+code;
		let trimmed_code=all_code.split("\n").map(e => e.trim()).filter(e => e).join("\n");
		let code_with_padding=this.#codegen_padding(trimmed_code);
		return `\n${code_with_padding}`;
	}
	/** @no_mod @arg {`A$R_Test`|`${string}Renderer`} t_name */
	codegen_get_renderer_name(t_name) {
		let np_arr=split_string(t_name,"$");
		switch(np_arr.length) {
			case 1: {
				let tc_name=np_arr[np_arr.length-1];
				let np_arr_2=split_string_once(tc_name,"Renderer");
				if(np_arr_2[1]!=="") debugger;
				return np_arr_2[0];
			}
			case 2: {
				let tc_name=np_arr[1];
				let np_arr_2=split_string_once(tc_name,"R_");
				if(np_arr_2.length!==2) {console.log("[np_arr_2]",np_arr_2); debugger; return null;}
				if(np_arr_2[0]!=="") debugger;
				return np_arr_2[1];
			}
		}
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
		/** @type {`A$R_Test`|`${string}Renderer`} */
		let t_name=as_any(this.uppercase_first(k));
		let keys=Object.keys(x);
		if(keys.length===1) {
			if(keys[0].endsWith("Renderer")) {
				let name=this.codegen_get_renderer_name(t_name);
				// /** @private @arg {$1} x */
				// $1(x) {this.H_("$1","$2",x,this.$3);}
				let self_code=`
				d1!/** @private @arg {R_${name}} x @generated {${t_name}} */
				d1!R_${name}(x) {this.H_("${keys[0]}",x,this.D_${name});}\n`;
				req_names.push(keys[0]);
				return this.#codegen_renderer_finalize(req_names,self_code,keys,x);
			}
			return;
		}
		let body=this.#codegen_renderer_body(req_names,x,keys,t_name);
		let self_code=`
		d1!/** @private @arg {${t_name}} x */
		d1!${t_name}(x) {
			d2!${body}
		d1!}
		`;
		return this.#codegen_renderer_finalize(req_names,self_code,keys,x);
	}
	/** @private @type {string[]} */
	typedef_cache=[];
	/** @arg {string} cf @arg {string[]} arr */
	codegen_all_service_menu_icons(arr,cf) {
		let arr_items=JSON.stringify(arr,null,"\t");
		console.log(`-- [ServiceMenu.${cf}.icon] --\n%s`,arr_items);
	}
	/** @api @public @arg {string} cf @arg {object} x */
	codegen_typedef_impl(cf,x) {
		let k=this.get_name_from_keys(x);
		if(k===null) return null;
		/** @type {{[U in typeof k]?: unknown}} */
		let xv=x;
		let o2=xv[k];
		if(o2==null) return null;
		let keys=Object.keys(x).concat(Object.keys(o2));
		let s=new JsonReplacerState({
			text_decoder: this.sm._decoder,
			cf,keys,is_root: true,
		});
		let new_typedef=this.codegen_typedef_base(s,cf,x);
		if(new_typedef) {
			if(!this.typedef_cache.includes(new_typedef)) {
				this.typedef_cache.push(new_typedef);
				console.log(new_typedef);
			}
		}
		return new_typedef;
	}
	/** @private @type {Map<string,string[]>} */
	missing_codegen_types=new Map;
	/** @api @public @arg {string} cf @arg {object} x @arg {boolean} do_break @arg {boolean} [ret_val] @returns {string|null|void} */
	codegen_typedef(cf,x,do_break,ret_val) {
		let res=this.codegen_typedef_impl(cf,x);
		if(ret_val) return res;
		if(!res) return;
		let ci=this.missing_codegen_types.get(cf);
		if(ci&&ci.includes(res)) return;
		if(!ci) this.missing_codegen_types.set(cf,ci=[]);
		ci.push(res);
		let all_ty_1=ci.map(e => {
			let ss=split_string_once(e,"=");
			if(ss.length==1) throw new Error();
			return ss[1].trim().slice(0,-1);
		});
		let all_types=all_ty_1.reduce((p,c) => p+"|"+c+"\n","");
		console.group(`-- [${cf}.gen_result] --`);
		console.log("\n%s",all_types);
		console.groupEnd();
		if(do_break) {debugger;}
	}
	/** @type {Map<string,(string|number)[]>} */
	cases_map=new Map;
	/** @arg {CF_D_CaseGen} cf @arg {string|number} val */
	codegen_case_cache(cf,val) {
		let arr=this.cases_map.get(cf);
		if(!arr) {arr=[]; this.cases_map.set(cf,arr);}
		let val_str=JSON.stringify(val);
		let has=arr.includes(val_str);
		if(!arr.includes(val_str)) arr.push(val_str);
		return {arr,has};
	}
	/** @protected @arg {(string|number)[]} known @arg {string} [code] */
	codegen_case_result(known,code) {
		if(code) return known.map(e => `case ${e}: ${code}`).join("\n");
		return known.map(e => `case ${e}:`).join("\n");
	}
	/** @api @public @arg {CF_D_CaseGen} cf @arg {string|number} val @arg {string} [code] */
	codegen_case(cf,val,code) {
		let {arr}=this.codegen_case_cache(cf,val);
		console.log(`-- [js_gen_case:${cf}] --\n\n${this.codegen_case_result(arr,code)}`);
	}
	/** @api @public @arg {{arr:(string | number)[]}} obj */
	codegen_case_ret(obj) {
		return this.codegen_case_result(obj.arr);
	}
	/** @arg {CF_D_CaseGen} cf @template {string} K @arg {{[U in K]:string|number}} obj @arg {K} key @arg {string} [code] */
	codegen_case_key(cf,obj,key,code) {
		let val=obj[key];
		this.codegen_case(cf,val,code);
	}
	codegen_group_id=1;
	/** @private @arg {{[U in string]: unknown}} x */
	_decode_WCM(x) {
		if("rootVe" in x) {return `M_VE${x.rootVe}`;}
		return null;
	}
	/** @api @public @arg {string} cf @arg {object} x1 */
	get_codegen_name_obj(cf,x1) {
		let keys=this.get_keys_of(x1);
		let s=new JsonReplacerState({
			text_decoder: this.sm._decoder,
			cf,keys,is_root: true,
		});
		/** @type {{}} */
		let x2=x1;
		/** @type {{[x:string]:unknown;}} */
		let x=x2;
		if(typeof x.type==='string') {
			return x.type.split(".").map(x => {
				if(x.includes("_")) {return x.split("_").map(x => this.uppercase_first(x)).join("");}
				return this.uppercase_first(x);
			}).join("$");
		}
		let wc=x.webCommandMetadata;
		if(typeof wc==="object"&&wc!==null) {
			/** @type {{}} */
			let wo=wc;
			let dec=this._decode_WCM(wo);
			if(dec) return dec;
		}
		let rk=this.filter_keys(this.get_keys_of(x));
		let kk=rk[0];
		if(typeof kk==="number") return null;
		let dec=this.uppercase_first(kk);
		/** @type {"PrefetchHintConfig"} */
		let dt=as(dec);
		let ren_dec=this.renderer_decode_map.get(dt);
		if(ren_dec) {return ren_dec;}
		return this.get_auto_type_name(s,x);
	}
	/** @type {Map<"PrefetchHintConfig","R_PrefetchHintConfig">} */
	renderer_decode_map=new Map([
		["PrefetchHintConfig","R_PrefetchHintConfig"],
	]);
	/** @api @public @arg {string} cf @arg {{}} x */
	make_codegen_group(cf,x,collapsed=true) {
		let u_name=this.get_codegen_name_obj(cf,x);
		let gca=[`[codegen_group] [#%o] [%s] -> [%s]`,this.codegen_group_id++,cf,u_name];
		if(collapsed) {console.groupCollapsed(...gca);} else {console.group(...gca);}
		console.log("[starting codegen] %s",`[${cf}_${u_name}]`);
		this.codegen_typedef_impl(`${cf}$${u_name}`,x);
		console.groupEnd();
	}
	/** @api @public @arg {CF_D_STR} cf @arg {string} x */
	codegen_str(cf,x) {
		if(x.startsWith("UC")) {console.log(`-- [string.${cf}] --\n\ntype D_${cf}=\`UC\${string}\``);}
		if(x.startsWith("https://")) {
			console.log(`-- [string.${cf}] --\n\ntype D_${cf}="${x}"`);
			return;
		}
		if(x.startsWith("http://")) {
			console.log(`-- [string.${cf}] --\n\ntype D_${cf}="${x}"`);
			return;
		}
	}
	/** @api @public @arg {string} o @arg {string} k1 */
	typedef_json_replace_string(o,k1) {
		const max_str_len=120;
		if(k1==="apiUrl") return o;
		if(k1==="targetId") return o;
		if(k1==="panelIdentifier") return o;
		if(o.match(/^[A-Z][A-Z_]+[A-Z]$/)) {return o;}
		if(o.startsWith("https://")||o.startsWith("http://")) {
			let pt=split_string_once(o,"?");
			if(pt.length===1) return o;
			return `TYPE::\`${pt[0]}?\${string}\``;
		}
		if(o.length>max_str_len) {
			console.log("[json_str_too_long]",o.length,o.slice(0,max_str_len+6));
			return "TYPE::string";
		}
		let u_ty_count=[...new Set(o.split("").sort())].join("").length;
		if(o.includes("%")) {if(u_ty_count>13) {return "TYPE::string";} }
		if(k1=="trackingParams") return "TYPE::string";
		if(k1=="clickTrackingParams") return "TYPE::string";
		if(k1=="playlistId") {
			if(o.startsWith("RDMM")) return `TYPE::\`RDMM$\{string}\``;
			if(o.startsWith("RD")) return "TYPE::`RD${string}`";
			if(o.startsWith("PL")) return `TYPE::\`PL$\{string}\``;
			debugger;
			return "TYPE::string";
		}
		if(k1=="videoId") return "TYPE::string";
		if(k1==="playlistSetVideoId") return "TYPE::string";
		let num=Number(k1);
		if(!Number.isNaN(num)) return o;
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
			if(prev.match(/[\w">]$/)) {return prev+"; "+cur;}
			return prev+cur;
		},"");
	}
	/** @arg {JsonReplacerState} s @template {{}} T @arg {T} x */
	get_typedef_part(s,x) {
		let gn=this.get_name_from_keys(x);
		if(!gn) return null;
		let gr=this.codegen_typedef_base(s,gn,x);
		if(!gr) return null;
		let gr_f=this.filter_typedef_part_gen(gr);
		let sr=split_string_once(gr_f,"=")[1];
		if(!sr) return null;
		if(sr.endsWith(";")) {sr=sr.slice(0,-1);}
		return sr;
	}
	/** @arg {{}} x @returns {T_SE_Signal<{},{}>} */
	as_T_SE_Signal=x => as(x);
	/** @arg {{}} x @returns {TR_MultiPageMenu<{}>} */
	as$TR_MultiPageMenu=x => as(x);
	/** @arg {{}} x @returns {T_Signal<string>} */
	as$T_Signal=x => as(x);
	/** @typedef {string|[string]|{}|null} JsonReplacementType */
	/** @private @arg {JsonReplacerState} s @arg {{[U in string|number]: unknown}|Uint8Array} x @arg {string} k1 @returns {JsonReplacementType} */
	typedef_json_replace_object(s,x,k1) {
		if(!s.object_store.includes(x)) {
			s.object_store.push(x);
			let mi=s.object_store.indexOf(x);
			s.parent_map.set(x,[mi,k1]);
		}
		let mi=s.object_store.indexOf(x);
		if(x instanceof Uint8Array) {
			let res=this.sm._decoder.decode(x);
			return `TYPE::V_Uint8Array<"${res}">`;
		}
		let xi=Object.entries(x);
		for(let [k_in,val] of xi) {
			if(s.object_store.includes(val)) continue;
			s.object_store.push(val);
			s.parent_map.set(val,[mi,k_in]);
		}
		if(s.is_root&&k1==="") {
			/** @type {{[U in string|number]: unknown}} */
			let fx={};
			let fk=Object.keys(x);
			for(let kk of fk) {
				if(kk.match(/^\d+$/)) {
					let num=parseInt(kk,10);
					if(num>=50) {
						fx[`0x${num.toString(16)}`]=x[kk];
						continue;
					}
					fx[kk]=x[kk];
					continue;
				}
				fx[kk]=x[kk];
			}
			return fx;
		}
		let g=() => this.json_auto_replace(s,x);
		const {cur_cf: r,key_keep_arr}=s;
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
			let sr=this.get_typedef_part(s,v.signalServiceEndpoint);
			if(!sr) break x;
			let wc=this.get_typedef_part(s,v.commandMetadata);
			let sig_type=`T_SE_Signal<${wc},${sr}>`;
			/** @type {E_SignalService_SendPost} */
			if(sig_type==="T_SE_Signal<M_SendPost,G_ClientSignal>") sig_type="E_SignalService_SendPost";
			return `TYPE::${sig_type}`;
		}
		x: if(x.multiPageMenuRenderer) {
			let v=this.as$TR_MultiPageMenu(x);
			let sr=this.get_typedef_part(s,v.multiPageMenuRenderer);
			if(!sr) break x;
			return `TYPE::TR_MultiPageMenu<${sr}>`;
		}
		if(x.webCommandMetadata) {
			/** @type {{webCommandMetadata:{sendPost?:true;rootVe?:number; apiUrl?:`/youtubei/v1/${string}`;}}} */
			let v=as(x);
			let u1=v.webCommandMetadata.apiUrl;
			let u2=v.webCommandMetadata.rootVe;
			if(u2) return `TYPE::M_VE${u2}`;
			if(u1) {
				let ss=this.sm.split_str(u1,"/");
				if(ss[0]!=="") debugger;
				let [,a2,a3,...rest]=ss;
				if(a2!=="youtubei") debugger;
				if(a3!=="v1") debugger;
				let cq=this.sm.join_string(rest,"_");
				return `TYPE::M_${cq}`;
			}
			/** @type {M_SendPost} */
			if(this.eq_keys(this.get_keys_of(v.webCommandMetadata),["sendPost"])) return "TYPE::M_SendPost";
			return x;
		}
		x: if(x.accessibilityData) {
			/** @type {{accessibilityData?:Partial<D_Label>}} */
			let xu=x;
			if(!xu?.accessibilityData?.label) break x;
			return `TYPE::TD_Accessibility<${JSON.stringify(xu.accessibilityData.label)}>`;
		}
		x: if(x.label) {
			/** @type {Partial<D_Label>} */
			let xu=x;
			if(!xu.label) break x;
			return `TYPE::TD_Label<${JSON.stringify(xu.label)}>`;
		}
		x: if(x.browseEndpoint) {
			/** @type {Partial<GE_Browse>} */
			let xu=x;
			if(!(xu.browseEndpoint&&xu.clickTrackingParams&&xu.commandMetadata)) break x;
			let ve_num=xu.commandMetadata.webCommandMetadata.rootVe;
			return `TYPE::E_VE${ve_num}`;
		}
		x: if(x.urlEndpoint) {
			/** @type {Partial<E_Url>} */
			let xu=x;
			if(!(xu.urlEndpoint&&xu.clickTrackingParams&&xu.commandMetadata)) break x;
			let ve_num=xu.commandMetadata.webCommandMetadata.rootVe;
			if(ve_num!==83769) break x;
			return `TYPE::E_Url`;
		}
		/** @private @type {G_Text} */
		if(x.runs&&x.runs instanceof Array) return "TYPE::G_Text";
		if(x.simpleText) return "TYPE::G_Text";
		if(x.thumbnails&&x.thumbnails instanceof Array) return `TYPE::${this.#R_ThumbnailStr()}`;
		/** @private @type {T_Icon<"">} */
		if(x.iconType&&typeof x.iconType==="string") return `TYPE::T_Icon<"${x.iconType}">`;
		if(x.signal) {
			let sig_type=this.getType$Signal(x);
			return `TYPE::${sig_type}`;
		}
		x: if(x.thumbnail&&x.navigationEndpoint&&x.accessibility) {
			let pi=s.parent_map.get(x);
			if(!pi) break x;
			if(pi[1]==="owner") {return "TYPE::D_Video_Owner";}
			console.log(pi);
			debugger;
		}
		/** @private @type {D_Accessibility} */
		if(x.accessibilityData) return "TYPE::D_Accessibility";
		/** @private @type {R_GuideEntryData} */
		if(x.guideEntryData) return "TYPE::R_GuideEntryData";
		if(x.styleType&&typeof x.styleType==="string") return `TYPE::T_StyleType<"${x.styleType}">`;
		if(x.sizeType&&typeof x.sizeType==="string") return `TYPE::T_SizeType<"${x.sizeType}">`;
		if(x.button_id) return `TYPE::ButtonId<"${x.button_id}">`;
		/** @private @type {D_Label} */
		if(x.label) return "TYPE::D_Label";
		if(x.baseUrl&&"baseUrl" in x&&typeof x.baseUrl==="string") {
			let gen_url=x.baseUrl;
			if(gen_url.startsWith("https://")) {
				let pt=split_string_once(gen_url,"?");
				if(pt.length===1) return `TYPE::T_BaseUrl<${gen_url}>`;
				return `TYPE::T_BaseUrl<\`${pt[0]}?\${string}\`>`;
			}
			return `TYPE::T_BaseUrl<${x.baseUrl}>`;
		}
		if(x.hack&&x.hack===true) return "TYPE::B_Hack";
		if(1 in x) return x;
		/** @private @type {RC_ResponseContext} */
		if(k1==="responseContext") return "TYPE::RC_ResponseContext";
		/** @private @type {D_FrameworkUpdates} */
		if(k1==="frameworkUpdates") return "TYPE::R_FrameworkUpdates";
		/** @private @type {D_LoggingDirectives} */
		if(k1==="loggingDirectives") return "TYPE::D_LoggingDirectives";
		if(k1==="subscriptionButton") return "TYPE::D_SubscriptionButton";
		if(k1==="upcomingEventData") return "TYPE::D_UpcomingEvent";
		if(k1==="impressionCommands") return "TYPE::ImpressionCommand[]";
		if(k1==="clickLocationTargets") return "TYPE::ClickLocationTarget[]";
		if(k1==="playabilityStatus") return "TYPE::D_PlayabilityStatus";
		if(k1==="streamingData") return "TYPE::DD_Streaming";
		if(k1==="heartbeatParams") return "TYPE::D_HeartbeatParams";
		if(k1==="playerAds") return "TYPE::R_DesktopWatchAds";
		if(k1==="playbackTracking") return "TYPE::D_PlaybackTracking";
		if(k1==="videoDetails") return "TYPE::D_VideoDetails";
		if(k1==="playerConfig") return "TYPE::D_PlayerConfig";
		if(k1==="storyboards") return "TYPE::G_PlayerStoryboards";
		let keys=this.filter_keys(this.get_keys_of(x));
		if(keys.length===1) return this.get_json_replace_type_len_1(s,r,x,keys);
		if(s.key_keep_arr.includes(s.cur_key)) return x;
		{
			/** @type {Partial<Popup_DL_ConfirmDialog>} */
			let xt=x;
			if(xt.popup&&xt.popupType) {
				/** @type {Popup_DL_ConfirmDialog} */
				let xr={popup: xt.popup,popupType: xt.popupType};
				return this.x.get("gen_code").D_TypedefGenerator_Popup(xr);
			}
		}
		if(this.eq_keys(keys,["1","2","3"])) return x;
		console.log("[no_json_replace_type] %o [%s] [%s]",x,keys.join(","),g(),"\n",r);
		{debugger;}
		return null;
	}
	/** @private @arg {JsonReplacerState} s @arg {string} k1 @arg {unknown} o */
	typedef_json_replacer(s,k1,o) {
		s.cur_key=k1;
		s.next_key(k1,o);
		if(o===null||o===void 0) return o;
		if(typeof o==="bigint") return `TYPE::V_Bigint<${o}n>`;
		if(typeof o==="boolean") return o;
		if(typeof o==="function") return o;
		if(typeof o==="number") return o;
		if(typeof o==="symbol") return o;
		if(typeof o==="string") return this.typedef_json_replace_string(o,k1);
		if(typeof o!=="object") return o;
		/** @private @type {{[U in string]?:unknown}} */
		let x=o;
		let res_type=this.typedef_json_replace_object(s,x,k1);
		if(res_type!==null) return res_type;
		if(s.key_keep_arr.includes(k1)) return x;
		s.object_count++;
		if(s.object_count<3) return x;
		return {};
	}
	/** @private @arg {JsonReplacerState} s @arg {string} cf @arg {object} x */
	codegen_typedef_base(s,cf,x) {
		let k=this.get_name_from_keys(x);
		if(k===null) return null;
		/** @private @type {{[x: number|string]:{}}} */
		let xa=as(x);
		let o2=xa[k];
		let keys=Object.keys(x).concat(Object.keys(o2));
		if("response" in x&&typeof x.response==='object'&&x.response!==null) {keys=keys.concat(Object.keys(x.response));}
		s.set_cf(cf);
		let tc=JSON.stringify(x,this.typedef_json_replacer.bind(this,s),"\t");
		tc=tc.replaceAll(/\"(\w+)\":/g,(_a,g) => {return g+":";});
		tc=this.sm.replace_until_same(tc,/\[\s+{([^\[\]]*)}\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).join("\n");
			return `{${vi}}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(/\[\s+([^\[\]]*)\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).filter(e => e).join("\n").trimEnd();
			return `${vi}:ARRAY_TAG`;
		});
		tc=tc.replaceAll(":ARRAY_TAG","[]");
		tc=tc.replaceAll(/"TYPE::(.+)"/gm,(_a,x) => {return x.replaceAll("\\\"","\"");});
		tc=tc.replaceAll(/,$/gm,"");
		tc=tc.replaceAll(/[^[{;,]$/gm,a => `${a};`);
		let ret;
		if(typeof cf==="number") {ret=`\ntype ArrayType_${cf}=${tc}\n`;} else {
			cf=cf.replaceAll(".","$d$");
			ret=`\ntype ${cf}=${tc}\n`;
		}
		return ret;
	}
	/** @param {{[U in string]:unknown}} x @returns {Ret_json_auto_replace_1} */
	json_auto_replace_1(x) {
		let o_keys=this.filter_keys(this.get_keys_of(x));
		if(o_keys.length===1) {
			let kk=this.get_name_from_keys(x);
			if(kk) {
				/** @type {Ret_json_auto_raw} */
				let kt=as(kk);
				let rt=this.uppercase_first(kt);
				return rt;
			}
		}
		if(o_keys.length>0) {
			let kk=o_keys[0];
			if(kk) {
				/** @type {Ret_json_auto_raw} */
				let kt=as(kk);
				let rt=this.uppercase_first(kt);
				return rt;
			}
		}
		return "{}";
	}
	/** @api @public @arg {JsonReplacerState} s @param {{[U in string]:unknown}} x @returns {Ret_get_auto_type_name} */
	get_auto_type_name(s,x) {
		let type_name=this.json_auto_replace_1(x);
		if(type_name==="{}") return "{}";
		if(type_name==="MetadataBadgeRenderer") {return "RMD_Badge";}
		x: if(type_name==="OpenPopupAction"&&typeof x.openPopupAction==="object") {
			if(!x.openPopupAction) break x;
			/** @type {TA_OpenPopup<T_OpenPopup_Dialog<{}>|T_OpenPopup_Toast<{}>>} */
			let u=as(x);
			let at=u.openPopupAction;
			switch(at.popupType) {
				case "DIALOG": {
					/** @type {string} */
					let t_name=this.get_auto_type_name(s,at.popup);
					return `TA_OpenPopup<T_OpenPopup_Dialog<${t_name}>>`;
				}
				case "TOAST": {
					let sr=this.get_typedef_part(s,at.popup);
					debugger;
					return `TA_OpenPopup<T_OpenPopup_Toast<${sr}>>`;
				}
				default: {
					let sr=this.get_typedef_part(s,x.openPopupAction);
					if(!sr) break x;
					debugger;
					return as_any(`TA_OpenPopup<${sr}>`);
				}
			}
		}
		/** @template {string} O @arg {O} x @arg {U} _sec @template {string} U @returns {asserts x is Exclude<O,`${string}${U}`>}  */
		function assert_not_ends_with(x,_sec) {x;}
		{
			let split_val=split_string_once(type_name,"Action");
			if(split_val.length===2) {
				let real_val=split_val[0];
				return `A_${real_val}`;
			}
			assert_not_ends_with(type_name,"Action");
		}
		{
			const ed="Command";
			let split_val=split_string_once(type_name,ed);
			if(split_val.length!==1) {
				let real_val=split_val[0];
				return `C_${real_val}`;
			}
			assert_not_ends_with(type_name,ed);
		}
		{
			const ed="Endpoint";
			let split_val=split_string_once(type_name,ed);
			if(split_val.length!==1) {
				let real_val=split_val[0];
				if(real_val==="Browse") {
					console.log(type_name);
					debugger;
					/** @type {GE_Browse} */
					return "GE_Browse";
				}
				return `E_${real_val}`;
			}
			assert_not_ends_with(type_name,ed);
		}
		{
			const ed="Renderer";
			let split_val=split_string_once(type_name,ed);
			if(split_val.length!==1) {
				let real_val=split_val[0];
				return `R_${real_val}`;
			}
			assert_not_ends_with(type_name,ed);
		}
		return `D_${type_name}`;
	}
	/** @arg {JsonReplacerState} s @param {{[U in string]:unknown}} x */
	json_auto_replace(s,x) {
		let type_name_str=this.get_auto_type_name(s,x);
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
				if(u.actions instanceof Array) return "G_ClientSignal";
				console.log("[no_actions_arr] %o",u);
				return "G_ClientSignal";
			}
			case "GET_NOTIFICATIONS_MENU": {
				if(!(u.actions instanceof Array)) {console.log("[no_actions_arr] %o",u);}
				if(u.actions.length!==1) debugger;
				let action=u.actions[0];
				if(!action.openPopupAction) debugger;
				let popup_action=action.openPopupAction;
				switch(popup_action.popupType) {
					default: debugger; break;
					case "DROPDOWN":
				}
				let popup=popup_action.popup;
				if(!popup.multiPageMenuRenderer) debugger;
				let mp=popup.multiPageMenuRenderer;
				let k=this.get_keys_of(mp);
				if(!this.eq_keys(k,["trackingParams","style","showLoadingSpinner"])) {debugger;}
				return "Signal_GetNotificationsMenu";
			}
			default:
		}
		if(this.eq_keys(this.get_keys_of(u),["signal"])) {return `T_Signal<"${u.signal}">`;}
		const {signal,...y}=u;
		console.log("[need to decode signal] [%s]",signal,y);
		{debugger;}
		return x;
	}
	/** @private @arg {JsonReplacerState} s @arg {string|null} r @param {{}} x @arg {(string | number)[]} keys */
	get_json_replace_type_len_1(s,r,x,keys) {
		/** @type {{[U in string]:unknown}} */
		let b=x;
		if(b.browseId==="FEsubscriptions"&&keys.length===1) return "TYPE::DE_VE96368_Browse";
		let g=() => this.json_auto_replace(s,b);
		let hg=false
			||false
			//#region hg
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
			//#endregion
			;
		if(hg) {
			let hr=g();
			if(this.sm.str_ends_with(hr,"Command")) {
				let sq=split_string_once(hr,"Command");
				if(sq[1]==="") {return `TYPE::C_${split_string_once(sq[0],"TYPE::")[1]}`;}
				console.log(sq);
				debugger;
			}
			return hr;
		}
		let g_res=g();
		let k_str=keys.join();
		if(!this.logged_replace_keys.includes(k_str)) {
			this.logged_replace_keys.push(k_str);
			console.log("[json_maybe_replace]%o\n[%s] [%s] [%s]",b,keys.join(","),g(),r);
		}
		return g_res;
	}
	/** @type {string[]} */
	logged_replace_keys=[];
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
		let depth_state={ld: 0,};
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
	/** @api @public @arg {unknown} x @arg {string|null} r @arg {boolean} [w] */
	codegen_renderer(x,r,w) {
		let gen_obj=this.#codegen_renderer(x,r);
		if(w) return gen_obj;
		console.log(gen_obj);
		return null;
	}
	/** @private @arg {string[]} res @arg {string} k1 @arg {string} x */
	generate_code_for_string(res,k1,x) {
		function gen_str() {
			res.push(`this.a_primitive_str(${k1});`);
		}
		if(k1==="playlistId") {if(x.startsWith("RD")) {res.push(`this.str_starts_with("RD",${k1},"string");`);} }
		if(k1=="videoId") return gen_str();
		let x2=x;
		let ret_arr=res;
		if(x2.startsWith("https:")) return gen_str();
		let u_count=[...new Set(x2.split("").sort())].join("").length;
		if(x2.includes("%")) {
			if(u_count>13) return gen_str();
		}
		console.log("[unique_chars_count]",k1,[...new Set(x2.split("").sort())].join("").length);
		ret_arr.push(`if(${k1}!=="${x2}") debugger;`);
	}
}
export_(exports => {
	exports.CodegenService=CodegenService;
});
