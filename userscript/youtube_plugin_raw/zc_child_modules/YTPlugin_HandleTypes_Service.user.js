// ==UserScript==
// @name	YTPlugin HandleTypes Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://*.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/za_userscript_meta/YTPlugin_HandleTypes_Service.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes_Service.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
//#region module setup
const __module_name__="mod$HandleTypes";
if(!window.__youtube_plugin_base_loaded__) {throw new Error("Failed to load base plugin");}
if(__yt_plugin_log_imports__) console.log("Load HandleTypes Service");
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const as=required(bs.as_);
const split_string=bs.split_string;
const split_string_once=bs.split_string_once;
const split_string_once_last=bs.split_string_once_last;
const base64_dec=bs.base64_dec;
const base64_url_dec=bs.base64_url_dec;
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
//#endregion
//#region module init
function init_module() {
	//#region exports
	export_((exports) => {exports.HandleTypes=HandleTypes;});
	//#endregion
	//#region Start main
	console=typeof window==="undefined"? console:(() => window.console)();
	//#endregion
}
//#endregion
//#region module imports
const ServiceMethods=bs.ServiceMethods;
const ServiceResolver=bs.ServiceResolver; ServiceResolver;
const as_any=bs.as_any;
const CodegenService=required(store["mod$CodegenService"]?.CodegenService); CodegenService;
//#endregion
//#region Constants
/** @type {{value:TypedefGenerator|null}} */
const generate_typedef={value: null};
/** @extends {ServiceMethods<LoadAllServices,ServiceOptions>} */
class TypedefGenerator extends ServiceMethods {
	/** @protected @arg {string} cf @arg {{}} x */
	k=(cf,x) => this.save_keys(`[${cf}]`,x);
	/** @arg {D_TypedefGenerator_Popup} x */
	D_TypedefGenerator_Popup(x) {
		const cf="popup_dialog"; cf; this.k(cf,x);
		let x1=this.unpack_popup_dialog(x);
		if(!x1[0]) {debugger; return null;}
		let dialog=x1[1];
		return this.D_TypedefGenerator_Popup_R(dialog);
	}
	/** @arg {D_TypedefGenerator_Popup_R} x */
	D_TypedefGenerator_Popup_R(x) {
		const cf="R_ConfirmDialog"; cf; this.k(cf,x);
		if("confirmDialogRenderer" in x) return "TYPE::Popup_ConfirmDialog";
		if("fancyDismissibleDialogRenderer" in x) return "TYPE::Popup_DismissibleDialog";
		return null;
	}
}
//#endregion
//#region HandleTypesEval
/** @arg {TemplateStringsArray} x */
function raw_template(x) {
	if(x.raw.length>1) {debugger;}
	return x.raw[0].replaceAll("\\`","`").replaceAll("\\${","${");
}
/** @template T @arg {T} v */
function bind_map(v) {
	/** @template U @arg {U} e @returns {[T,U]} */
	return (e) => [v,e];
}; bind_map;
const handle_types_eval_code=raw_template`
class HandleTypesEval extends ServiceMethods {
	//#region KR_ResponseContext
	primitive_str(x) {this.a_primitive_str(x);}
	primitive_of(x,y) {this._primitive_of(x,y);}
	/** @private @arg {D_YtConfig} x */
	D_YtConfig(x) {
		const cf="D_YtConfig"; this.k(cf,x);
		const {visitorData,sessionIndex,rootVisualElementType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.primitive_str(visitorData);
		if(sessionIndex!==0) debugger;
		/** @private @type {\`\${typeof rootVisualElementType}\`} */
		let s=\`\${rootVisualElementType}\`;
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
	//#endregion
	//#region init and static init
	// I use @private stuff that i want in static blocks
	gk=this.get_keys_of;
	/** @private @arg {string} a @arg {{}} b */
	k=(a,b) => this.save_keys(\`[\${a}]\`,b);
	/** @protected @arg {\`[\${string}]\`} k @arg {string|string[]} x */
	save_string_api=this.save_string;
	/** @private @arg {string} cf @arg {unknown} x @arg {boolean} [w] */
	codegen_renderer(cf,x,w) {this.codegen.codegen_renderer(x,cf,w);}
	static {
		/** @typedef {{codegen:CodegenService<{},{}>}} CG_ServiceResolver */
		/** @type {{value:ServiceResolver<CG_ServiceResolver,{}>|null}} */
		let v={value: null};
		let cg=new CodegenService(v);
		let sr=new ServiceResolver({codegen: cg},{});
		let t=new this({value: sr});
		t.codegen_renderer("",{},true);
	}
	//#endregion
	//#region section to support above stuff
	/** @private @arg {{accessibility?:D_Accessibility}} x */
	handle_accessibility(x) {
		this.save_keys("[default.Accessibility]",x);
		if(x.accessibility) this.D_Accessibility(x.accessibility);
	}
	//#endregion
	/** @protected @template {CF_M_y} T_CF  @arg {T_CF} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K],cf:\`\${T_CF}.\${K}\`)=>U} f */
	y(cf,k,x,f) {return f.call(this,this.w(\`y:\${cf}\`,k,x),\`\${cf}.\${k}\`);}
}
window.HandleTypesEval=HandleTypesEval;
//# sourceURL=plugin://extension/youtube_plugin_handle_types.js
`;
eval(handle_types_eval_code);
//#endregion
//#region HandleTypes
/** @template {string} T1 @template {string} T2 @template {string} T3 @template {string} T4 @template {string} T5 */
class UrlParseHelper {
	/** @arg {UrlParseRes<T1,T2,T3,T4,T5>} x */
	constructor(x) {this.x=x;}
	/** @arg {U} cx @template {UrlParseRes<T1,T2,T3,T4,T5>} U @template {`/${T5}`} T @arg {T} pname @returns {cx is Extract<U,{pathname:T}>} */
	get_with_pathname(cx,pname) {return ServiceMethods.is_url_with_pathname(cx,pname);}
}
const ECatcherService=required(store["mod$ECatcherService"]?.ECatcherService);
// [new_fexp_expected]
ECatcherService.known_experiments.push(...[
	[24281897,24448383,24458839,24437577,24441240,24463912,24441239,24451434,24455878,24458634,24450366,24463911,24454001],
].flat());
/** @extends {HandleTypesEval<LoadAllServices,ServiceOptions>}  */
class HandleTypes extends HandleTypesEval {
	/** @private @arg {V_ParamMapType} x @returns {D_ParamObjType} */
	to_param_obj(x) {
		return Object.fromEntries([...x.entries()].map(e => {
			let ei=e[1];
			if(ei instanceof Map) {return [e[0],this.to_param_obj(ei)];}
			return [e[0],ei];
		}));
	}
	/** @private @template {CF_L_TP_Params|CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} mk @arg {T_ParseCallbackFunction<T>} callback */
	make_parse_key(root,path,map,mk,callback) {
		/** @private @arg {number[]} ta */
		let parse_key=(ta) => {
			let t_at=ta.at(-1);
			if(t_at===void 0) return;
			this.parser.parse_value(root,path,map,mk,ta,map.get(t_at),callback);
		};
		return parse_key;
	}
	/** @api @public @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {number} map_entry_key @arg {V_ParamMapValue[]|undefined} map_entry_values @arg {T_ParseCallbackFunction<T>} callback */
	/** @private @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_any_param(root,path,map_entry_key_path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,mk,callback);
		let mk_max=Math.max(...mk,-1);
		for(let i=1;i<mk_max+1;i++) {
			if(!mk.includes(i)) continue;
			map_entry_key_path.push(i);
			parse_key(map_entry_key_path);
			let l=map_entry_key_path.pop();
			if(l!==i) debugger;
		}
		if(this.eq_keys(mk,[])) return;
		console.log(`[new.${path}] [idx=${key_index}]`,path,this.to_param_obj(map));
		{debugger;}
	}
	/** @private @arg {P_ParamParse} path @arg {number[]} map_keys @arg {V_ParamMapValue} map_entry_value @arg {number|null} map_entry_key */
	get_parse_fns(path,map_keys,map_entry_value,map_entry_key=null) {
		let parts=split_string(path,".");
		/** @private @arg {number} idx */
		let gd=(idx) => {console.log("[param_next.next_new_ns]",parts.join(".")); gen_next_part(idx);};
		/** @private @arg {number} idx */
		let u=idx => this.grouped(parts.join("$"),() => gd(idx));
		/** @private @arg {number} idx */
		let gen_next_part=(idx) => {
			let pad="\t\t\t";
			if(idx>parts.length) return;
			/** @type {string[]} */
			let eq_len_arr=[];
			if(parts.length===idx) {
				if(map_entry_value instanceof Map) eq_len_arr.push(`if(map_entry_value instanceof Map) return;`);
				switch(typeof map_entry_value) {
					case "number": eq_len_arr.push(`if(typeof map_entry_value==="number") return this.save_number(\`[$\{path}]\`,map_entry_value);`); break;
					case "string": eq_len_arr.push(`if(typeof map_entry_value==="string") return this.save_string(\`[$\{path}]\`,map_entry_value);`); break;
				}
			}
			eq_len_arr.push("switch(map_entry_value) {default: debugger; return;}");
			let res_case=[`default: {const idx=${idx+1}; u(idx); debugger; parts[${idx}]==="";} break;`];
			if(idx<parts.length) {
				res_case.push(`case "${parts[idx]}": u(idx); debugger; break;`);
			}
			console.log(`\n\n\t"[parse_value.L_gen_next_part] [${path}]",`);
			/** @arg {string[]} arr */
			let gen_for_part_case=(arr,gen_if_case=false) => {
				if(arr.length===1) return arr[0];
				let ret=`\n${pad}\t${arr.join(`\n${pad}\t`)}\n${pad}`;
				if(!gen_if_case) return ret;
				return `{${ret}}`;
			};
			console.log(`
			-- [${parts.join(".")},${idx}] --\n\n
			case "${parts[idx-1]}":
			if(parts.length===${idx}) ${gen_for_part_case(eq_len_arr,true)}
			switch(parts[${idx}]) {${gen_for_part_case(res_case)}}`.slice(1).split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
		};
		let new_path=() => {
			/** @private @type {P_LogItems} */
			console.log("[parse_value.new_path_gen]",path);
			let ak_gen=["",""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`\n\n\tcase "${path}": switch(map_entry_key) {\n\t\t${map_keys.map(e => `case ${e}:`).join(" ")}\n\t\t\treturn this.parse_param_next(root,\`\${path}.f\${map_entry_key}\`,map_entry_key_path,map_entry_values,callback);\n\t\tdefault: new_ns(); debugger; return;\n\t}\n`);
		};
		let new_ns=() => {
			/** @private @type {P_LogItems} */
			console.log("[parse_value.new_ns_gen]",path);
			let ak_gen=["",""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`-- [parse_value.gen_ns] --\n\n\t${map_keys.map(e => `case ${e}:`).join(" ")} \n`);
		};
		return {u,gen_next_part,new_ns,new_path,map_entry_key};
	}
	/** @private @arg {string} ns @arg {()=>void} f */
	grouped(ns,f) {
		console.group(ns);
		f();
		console.groupEnd();
	}
	/** @template {"DE_VE3832_Watch"} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root */
	on_player_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		switch(path)/*player_params*/ {
			default: debugger; return;
			case "watch.player_params":
			case "watch.player_params.f40": case "watch.player_params.f40.f1":
		}
		/** @type {ARG_on_player_params_callback_ty_len1<T,P_ParamParse>[2]} */
		let t_pt=as(map_entry_key_path);
		if(root!=="DE_VE3832_Watch") {debugger; return;}
		switch(t_pt.length) {
			default: debugger; return;
			case 1: {
				switch(t_pt[0]) {
					default: debugger; return;
					case 8: case 9: case 12: case 25: case 40: {
						const rk=this.exact_arr(t_pt[0]);
						this.on_player_params_callback_ty(map_entry_values,rk,path,map_keys,root);
					} break;
				}
			} break;
			case 2: {
				switch(t_pt[0]) {
					default: debugger; return;
					case 40: switch(t_pt[1]) {
						case 1: {
							let [k1,k2]=t_pt;
							const rk=this.exact_arr(k1,k2);
							this.on_player_params_callback_ty(map_entry_values,rk,path,map_keys,root);
						}
					} break;
				}
			} break;
			case 3: {
				switch(t_pt[0]) {
					default: debugger; return;
					case 40:
				}
				if(t_pt[1]!==1) debugger;
				switch(t_pt[2]) {
					default: debugger; return;
					case 2: case 3:
				}
				this.on_player_params_callback_ty(map_entry_values,t_pt,path,map_keys,root);
			}
		}
	}
	/** @template U @template {U[]} T @arg {T} x @returns {Join<{[R in keyof T]:`${T[R]}`},".f">} */
	fmt_arr(x) {
		return as(x.map(v => `${v}`).join(".f"));
	}
	/**
	 * @template {"DE_VE3832_Watch"} T
	 * @arg {ARG_on_player_params_callback_ty_len1<T,P_ParamParse>[2]} map_entry_key_path
	 * @arg {V_ParamMapValue[]} map_entry_values @arg {ARG_PathFor_PlayerParams} path @arg {number[]} map_keys @arg {T} root */
	on_player_params_callback_ty(map_entry_values,map_entry_key_path,path,map_keys,root) {
		let saved_map_keys=map_keys.slice();
		let callback=this.on_player_params_callback.bind(this);
		let map_entry_key=map_entry_key_path.at(-1);
		if(!map_entry_key) {debugger; return;}
		switch(map_entry_key_path.length) {
			case 3: {
				let v_arr=this.fmt_arr(map_entry_key_path);
				this.parse_param_next(root,`watch.player_params.f${v_arr}`,map_entry_key_path,map_entry_values,callback);
				this.on_player_params_callback_ty_len1(root,path,map_entry_key_path,map_entry_values,saved_map_keys);
			} break;
			case 2: {
				let v_arr=this.fmt_arr(map_entry_key_path);
				this.parse_param_next(root,`watch.player_params.f${v_arr}`,map_entry_key_path,map_entry_values,callback);
				this.on_player_params_callback_ty_len1(root,path,map_entry_key_path,map_entry_values,saved_map_keys);
			} break;
			case 1: {
				let v_arr=this.fmt_arr(map_entry_key_path);
				this.parse_param_next(root,`watch.player_params.f${v_arr}`,map_entry_key_path,map_entry_values,callback);
				this.on_player_params_callback_ty_len1(root,path,map_entry_key_path,map_entry_values,saved_map_keys);
			} break;
		}
	}
	/** @template {"DE_VE3832_Watch"} T @template {P_ParamParse} U @arg {ARG_on_player_params_callback_ty_len1<T,U>} x */
	on_player_params_callback_ty_len1(...x) {
		switch(x[0]) {
			case "DE_VE3832_Watch": break;
			default: debugger; break;
		}
	}
	/** @template {CF_L_Params} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root @returns {void} */
	on_endpoint_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		let callback=this.on_endpoint_params_callback.bind(this);
		let map_entry_key=map_entry_key_path.at(-1); map_entry_values;
		if(!map_entry_key) return;
		let saved_map_keys=map_keys.slice();
		let {new_path,new_ns}=this.get_parse_fns(path,saved_map_keys,map_entry_values[0],map_entry_key);
		/** @private @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		/** @private @type {P_LogItems} */
		switch(path)/*endpoint*/ {
			default: {
				grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
				{debugger;}
				/** @private @type {P_ParamParse} */
				return this.parse_param_next(root,as(`${path}.f${map_entry_key}`),map_entry_key_path,map_entry_values,callback);
			}
			case "unsubscribe.params.f1": switch(map_entry_key) {
				case 1:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "unsubscribe.params": switch(map_entry_key) {
				case 1: case 2: case 3:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "reel.params.f3": switch(map_entry_key) {
				case 1: case 2: case 3:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "D_Browse.param.f94.f1.f2": switch(map_entry_key) {
				case 1: case 2: case 3: case 4: case 5:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "D_Browse.param.f94.f1": switch(map_entry_key) {
				case 2:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "D_Browse.param.f94": switch(map_entry_key) {
				case 1: case 5:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "subscribe.params": switch(map_entry_key) {
				case 2: case 3: case 4:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "tracking.trackingParams.f16.f4": switch(map_entry_key) {
				case 1: case 2: case 3:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "D_Browse.param.f93.f1": switch(map_entry_key) {
				case 14:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "entity_key.normal.f2": switch(map_entry_key) {
				case 1:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "playability_status.context_params.f2": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "playability_status.context_params": switch(map_entry_key) {case 1: case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "watch_playlist.params.f27": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "watch_playlist.params": switch(map_entry_key) {case 2: case 3: case 7: case 12: case 13: case 27: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "reel.sequence_params.f5": switch(map_entry_key) {case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "reel.sequence_params": switch(map_entry_key) {case 1: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param.f110.f1.f20": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "reel.params": switch(map_entry_key) {case 1: case 3: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "notification.opt_out": switch(map_entry_key) {case 2: case 3: case 4: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param.f110.f1": switch(map_entry_key) {case 19: case 20: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param.f110": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param": switch(map_entry_key) {case 2: case 84: case 93: case 94: case 110: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`D_Browse.param.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
			case "transcriptTrackSelection.serializedParams": switch(map_entry_key) {case 1: case 2: case 3: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_transcript.params": switch(map_entry_key) {case 1: case 2: case 3: case 5: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f28.f1[].f1.f1[]": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f28.f1[].f1": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f28.f1[]": switch(map_entry_key) {case 1: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f28": switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "notification.record_interactions.f2": case "record_notification_interactions.f2": switch(map_entry_key) {case 1: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "notification.record_interactions": case "record_notification_interactions": switch(map_entry_key) {case 2: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params": switch(map_entry_key) {case 2: case 8: case 11: case 14: case 15: case 18: case 25: case 26: case 27: case 28: case 29: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f18.f1": switch(map_entry_key) {case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "like.removeLikeParams": switch(map_entry_key) {case 1: case 3: case 4: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "like.dislikeParams": switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "watch.params.f33": switch(map_entry_key) {case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "like.likeParams": case "like.dislikeParams": switch(map_entry_key) {case 1: case 4: case 5: case 6: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "tracking.trackingParams.f19": case "AdServingDataEntry.f9": case "slot_ad_serving_data_entry.f1":
			case "tracking.trackingParams.f4": switch(map_entry_key) {case 1: case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "reel.player_params": switch(map_entry_key) {case 30: case 57: case 71: case 72: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "slot_ad_serving_data_entry": switch(map_entry_key) {case 1: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "watch.params": switch(map_entry_key) {case 2: case 3: case 7: case 12: case 13: case 24: case 27: case 33: case 39: case 56: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "tracking.trackingParams.f16": switch(map_entry_key) {case 1: case 2: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "tracking.trackingParams.f6": switch(map_entry_key) {case 12: case 13: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "AdServingDataEntry": switch(map_entry_key) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "watch.player_params": switch(map_entry_key) {case 8: case 9: case 12: case 25: case 40: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "ypc_get_offers.params.f5": switch(map_entry_key) {case 1: case 3: case 5: case 9: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "ypc_get_offers.params": switch(map_entry_key) {case 1: case 3: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "get_report_form.params.f28.f1.f1.f1.f1": switch(map_entry_key) {case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param.f93": case "browse$param.f93":
			case "get_report_form.params.f28.f1": switch(map_entry_key) {case 1: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "D_Browse.param.f84": case "browse$param.f84": switch(map_entry_key) {case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "entity_key.normal":
			case "entity_key.subscribed":
				switch(map_entry_key) {case 2: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// Object type {f1:any;f2:any;}
			case "like.removeLikeParams.f5": case "like.dislikeParams.f4": case "like.likeParams.f6": case "createBackstagePost.params": case "notification.record_interactions.f2.f14.f1": case "record_notification_interactions.f2.f14.f1":
			case "ypc_get_offers.params.f1": case "notification.record_interactions.f2.f14": case "record_notification_interactions.f2.f14":
				switch(map_entry_key) {case 1: case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "create_playlist.params": case "browse$param":
				switch(map_entry_key) {case 84: case 93: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`browse$param.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
			case "get_report_form.params.f18": case "service$create_playlist": case "like.removeLikeParams.f1": case "like.dislikeParams.f1": case "like.likeParams.f1":
			case "get_report_form.params.f18": case "get_report_form.params.f28.f1.f1.f1": case "get_report_form.params.f28.f1.f1": case "get_report_form.params.f28": case "subscribe.params.f2":
			case "watch.params.f27": case "watch.player_params.f40": case "GetNotificationMenu.ctoken": case "ypc_get_offers.params.f5.f5":
				switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "transcript_target_id.param": case "watch.player_params.f40.f1":
				switch(map_entry_key) {case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "slot_ad_serving_data_entry.f3": case "AdServingDataEntry.f10":
				switch(map_entry_key) {case 1: case 6: case 11: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			case "tracking.trackingParams":
				switch(map_entry_key) {
					case 16: case 19: break;
					default: {
						/** @arg {number} x @template {number} T @arg {T} mx @returns {x is T_NumRange<1,T>} */
						function is_in_range(x,mx) {
							if(x<=mx) return true;
							return false;
						}
						if(!is_in_range(map_entry_key,11)) {
							new_ns();
							return;
						}
					}
				}
				return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
		}
	}
	/** @private @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next_arr(root,path,map_entry_key_path,tva,callback) {
		let off=1;
		for(let val of tva) {
			let g1=() => {
				console.log(`
				case ${JSON.stringify(path)}: /*tva*/{this.parse_param_next(root,\`\${path}[]\`,map_entry_key_path,[val],callback);}; return;`);
				console.log(`\n\n\t"[parse_value.gen_ns_g1] [${path}[]]",`);
				console.log("path offset",off);
			};
			switch(path)/*parse_param_next_arr*/ {
				default: g1(); debugger; return;
				case "get_report_form.params.f28.f1": /*tva*/{this.parse_param_next(root,`${path}[]`,map_entry_key_path,[val],callback);}; return;
				case "get_report_form.params.f28.f1[].f1.f1": /*tva*/{this.parse_param_next(root,`${path}[]`,map_entry_key_path,[val],callback);}; return;
			}
			off++;
		}
	}
	/** @private @template {["bigint",number[],bigint]|["group",D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]} T @arg {T} x @returns {x is ["bigint",number[],bigint]} */
	is_bigint(x) {return x[0]==="bigint";}
	parse_key_index=1;
	/** @arg {P_ParamParse} path @arg {V_ParamMapValue} entry */
	handle_map_value(path,entry) {
		if(path==="tracking.trackingParams.f8") return;
		if(typeof entry==="number") {
			if(entry>(65536*4)) return;
			return this.save_number(path,entry);
		}
		if(typeof entry==="string") return this.save_string(path,entry);
		if(entry instanceof Map) return;
		if(this.is_bigint(entry)) return this.handle_bigint(path,entry);
		switch(entry) {default: debugger; return;}
	}
	/** @private @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next(root,path,map_entry_key_path,tva,callback) {
		if(tva.length>1) return this.parse_param_next_arr(root,path,map_entry_key_path,tva,callback);
		if(tva.length!==1) return;
		let map_entry_value=tva[0];
		let key_index=this.parse_key_index;
		if(map_entry_value instanceof Map) this.parse_any_param(root,path,map_entry_key_path,new Map(map_entry_value),callback);
		let parts=split_string(path,".");
		let {u}=this.get_parse_fns(path,[],map_entry_value);
		const idx=1;
		/** @private @type {P_LogItems} */
		switch(parts[0]) {
			case "_level_2_0": {
				const idx=2;
				switch(parts[1]) {
					default: u(idx); debugger; parts[1]===""; break;
					case "_level_2_1": {
						const idx=3;
						if(parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(parts[2]) {default: u(idx); debugger; parts[2]===""; break;}
					} break;
				}
			} break;
			case "_level_1_0": {
				const idx=2;
				if(parts.length!==1) {parts==="";}
				u(idx);
			} break;
			// [default_parse_param_next]
			default: u(idx); debugger; {switch(parts[0]) {case "": break;}} break;
			case "invalidation":
			case "live_chat_replay":
			case "player_seek":
			case "videogoodput": case "unsubscribe":
			case "playability_status":
			case "aadc_guidelines_state_entity_key": case "AdServingDataEntry": case "browse$param": case "create_playlist": case "createBackstagePost":
			case "D_Browse": case "entity_key": case "entity": case "feedback": case "get_report_form": case "get_transcript": case "GetNotificationMenu": case "like":
			case "next_radio": case "next": case "notification": case "playlist_edit": case "reel": case "reload": case "service$create_playlist": case "slot_ad_serving_data_entry":
			case "subscribe": case "subscriptionState": case "TimedContinuation": case "tracking": case "transcriptTrackSelection": case "UndoFeedback":
			case "watch_page_url": case "watch_playlist": case "watch": case "ypc_get_offers": case "ypc_get_offline_upsell": case "YpcGetCart":
			case "record_notification_interactions": case "transcript_target_id": case "watch": {
				if(parts.length===1) return this.handle_map_value(path,map_entry_value);
				switch(parts[1]) {
					default: {
						const idx=2; u(idx); debugger; switch(parts[1]) {
						} parts[1]==="";
					} return;
					case "context_params": case "sparams":
					case "params": case "param": case "normal": case "subscribed": case "feedbackToken": case "ctoken": case "continuation": case "queue_context_params": case "player_params":
					case "key": case "parentTrackingParams": case "trackingParams": case "serializedParams": case "undoToken": case "transactionParams": case "likeParams": case "dislikeParams":
					case "removeLikeParams": case "sequence_params": case "pp": case "record_interactions": case "opt_out":
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f9":
					case "f10": case "f13": case "f14":
					case "f84": case "f93":
				}
				if(parts.length===2) return this.handle_map_value(path,map_entry_value);
				switch(parts[2]) {
					default: {const idx=3; u(idx); debugger; parts[2]==="";} return;
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
					case "f10": case "f11": case "f12": case "f13": case "f14": case "f15": case "f16": case "f18": case "f19":
					case "f24": case "f25": case "f26": case "f27": case "f28": case "f28": case "f29":
					case "f30": case "f33": case "f39": case "f40":
					case "f56": case "f57": case "f71": case "f72": case "f84": case "f93": case "f94": case "f110":
				}
				if(parts.length===3) return this.handle_map_value(path,map_entry_value);
				switch(parts[3]) {
					default: {const idx=4; u(idx); debugger; parts[3]==="";} return;
					case "f1[]":
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f9":
					case "f12": case "f13": case "f14":
				}
				if(parts.length===4) return this.handle_map_value(path,map_entry_value);
				switch(parts[4]) {
					default: {const idx=5; u(idx); debugger; parts[4]==="";} return;
					case "f1": case "f2": case "f3": case "f14": case "f19": case "f20":
				}
				if(parts.length===5) return this.handle_map_value(path,map_entry_value);
				switch(parts[5]) {
					default: {const idx=6; u(idx); debugger; parts[5]==="";} return;
					case "f1[]":
					case "f1": case "f2": case "f3": case "f4": case "f5":
				}
				if(parts.length===6) return this.handle_map_value(path,map_entry_value);
				switch(parts[6]) {
					default: {const idx=7; u(idx); debugger; parts[6]==="";} return;
					case "f1":
				}
				if(parts.length===7) return this.handle_map_value(path,map_entry_value);
				switch(parts[7]) {
					default: {const idx=8; u(idx); debugger; parts[7]==="";} return;
					case "f4":
				}
				if(parts.length!==8) {debugger; break;}
				return this.handle_map_value(path,map_entry_value);
			}
		}
		console.log(`[${path}] [idx=${key_index}]`,root,map_entry_value);
	}
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_number(path,x[1]);
		this.save_string(path,`${x[2]}n`);
	}
	get generate_typedef() {
		if(!generate_typedef.value) throw new Error();
		return generate_typedef.value;
	}
	/** @arg {ResolverT<LoadAllServices,ServiceOptions>} x */
	constructor(x) {
		super(x);
		generate_typedef.value=new TypedefGenerator(x);
	}
	//#endregion
	/** @protected @template {(string|number)[]} T @template {T} R @arg {T} src @arg {R} target @returns {src is R} */
	is_eq_keys(src,target) {return this.eq_keys(src,target);}
	/** @protected @arg {CF_L_TP_Params} root @arg {D_WatchPageUrl} x */
	parse_watch_page_url(root,x) {
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
		this.parser.parse_url(root,x);
		return u3;
	}
	get indexed_db() {
		if(!this.is_normal_service(this)) throw new Error();
		return this.x.get("indexed_db");
	}
	/** @protected @arg {{v:string}} x */
	put_video_args(x) {this.indexed_db.put("video_id",x);}
	/** @protected @arg {string} x */
	videoId(x) {
		if(!this.is_normal_service(this)) return;
		this.a_primitive_str(x);
		this.put_video_args({v: x});
	}
	/** @protected @arg {CF_L_Params} root @arg {P_PathRootStr} path @arg {string} x */
	params(root,path,x) {
		/** @type {number[]} */
		let map_entry_key_path=[];
		this.parser.on_endpoint_params(root,path,map_entry_key_path,x,this.on_endpoint_params_callback.bind(this));
	}
	/** @protected @arg {D_PlaylistId} x */
	playlistId(x) {this.parse_playlist_id(x);}
	/** @protected @arg {CF_L_TP_Params} cf @arg {string} x */
	trackingParams(cf,x) {this.params(cf,"tracking.trackingParams",x);}
	/** @protected @arg {CF_L_CTP_Params} cf @arg {string} x */
	clickTrackingParams(cf,x) {this.params(cf,"tracking.trackingParams",x);}
	/** @private @arg {boolean} x */
	a_primitive_bool(x) {if(typeof x!=="boolean") debugger;}
	//#region templates
	/** @private @arg {string} cf @arg {K} k @template {keyof T} K @public @template {{}} T @arg {T} x */
	HD_(cf,k,x) {
		this.k(cf,x);
		let kx=this.get_keys_of(x);
		if(kx.length!==1) debugger;
		if(kx[0]!==k) debugger;
	}
	/** @protected @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x @arg {(this:this,x:T[K])=>U} f */
	H_(cf,k,x,f) {
		if(!x) {debugger; return;}
		let wr=this.wn(cf,x,k);
		if(!wr) return;
		return f.call(this,wr);
	}
	/** @arg {CF_TD_ItemSection_3} cf1 @protected @template CT,T,U @arg {TD_ItemSection_3<CT,T,U>} x @returns {[contents,sectionIdentifier,targetId]|null} */
	TD_ItemSection_3(cf1,x) {
		const cf2="TD_ItemSection_3";
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf2,trackingParams);
		if(contents.length>0) {
			let cu=contents[0];
			if(typeof cu!=="object"||!cu) {debugger; return null;}
			let k=this.get_keys_of(cu);
			switch(cf1) {
				default: debugger; break;
				case `TD_ItemSection_3<"comment-item-section","comments-section">`: break;
				case `TD_ItemSection_3<"comment-item-section","engagement-panel-comments-section">`: break;
				case `TD_ItemSection_3<"sid-wn-chips","watch-next-feed">`: break;
			}
			switch(k[0]) {
				default: console.log(`-- [TD_Section_3.${cf1}.Section_Info] --\n\n${k.map(e => `case "${e}":`).join("\n")}`); break;
				case "continuationItemRenderer":
				case "compactVideoRenderer":
				case "compactRadioRenderer":
			}
		}
		return [contents,sectionIdentifier,targetId];
	}
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x */
	H_Get(cf,k,x) {return this.wn(cf,x,k);}
	// const cf="TR_ItemSection_2"; const {itemSectionRenderer: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ return a;
	/** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x */
	TR_ItemSection_2(x) {return this.wn("TR_ItemSection_2",x,"itemSectionRenderer");}
	/** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x */
	TR_ItemSection_3(x) {return this.wn("TR_ItemSection_3",x,"itemSectionRenderer");}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		f.call(this,a);
	}
	/** @private @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	T_Autoplay(x,f) {
		const cf="T_Autoplay";
		const {autoplay,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,autoplay);
	}
	/** @private @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	T_Playlist(x,f) {
		const cf="T_Playlist";
		const {playlist,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,playlist);
	}
	/** @private @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	T_SecondaryResults(x,f) {
		const cf="T_SecondaryResults";
		const {secondaryResults,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,secondaryResults);
	}
	/** @private @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {
		const cf="T_Types";
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @private @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {return as(Number.parseInt(x,10));}
		return parse_number(types,_x);
	}
	/** @private @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(this:this,x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint(x,f) {
		const cf="TD_ItemSection_2_CommentsEntryPoint";
		const {contents,trackingParams,sectionIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,f);
		this.trackingParams(cf,trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @protected @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
	GT_ShortsSurfaceIdentifier(x) {
		const cf="GT_ShortsSurfaceIdentifier"; this.k(cf,x);
		const {surface,tag,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		switch(tag) {
			case "engagement-panel-structured-description": break;
			case "shorts-comments-panel": break;
			default: debugger; break;
		}
		return tag;
	}
	/** @protected @arg {G_Text} x */
	G_Text(x) {
		const cf="G_Text"; this.k(cf,x);
		/** @type {T_UnionToPartial<G_Text>} */
		let x1=x;
		const {runs,simpleText,accessibility,...y}=this.s(cf,x1); this.g(y);/*#destructure_done*/
		this.t(simpleText,this.a_primitive_str);
		this.tz(runs,x => this.D_TextRun(x,this.G_TextRun_Endpoint));
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {G_TextRun_Endpoint} x */
	G_TextRun_Endpoint(x) {
		const cf="G_TextRun_Endpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @arg {G_RichSection} x */
	G_RichSection(x) {
		const cf="G_RichSection"; this.k(cf,x);
		if("richShelfRenderer" in x) return this.R_RichShelf(x);
		if("inlineSurveyRenderer" in x) return this.R_InlineSurvey(x);
		if("sourcePivotHeaderRenderer" in x) return this.R_SourcePivotHeader(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.g_k(cf,x); this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @private @arg {`VE${GM_VE_WC_Browse["rootVe"]}`} ve_name @arg {G_DE_Browse_VE} x */
	G_DE_Browse_VE(ve_name,x) {
		const cf="G_DE_Browse_VE";
		if("canonicalBaseUrl" in x) {
			const {browseId: a,params: c,canonicalBaseUrl: d,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(c,c => this.params(cf,"D_Browse.param",c));
			this.GU_VE3611_Url(d);
			return this.GU_E_BrowseId(ve_name,a);
		}
		if("params" in x) {
			const {browseId: a,params: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(c,c => this.params(cf,"D_Browse.param",c));
			return this.GU_E_BrowseId(ve_name,a);
		}
		if("query" in x) {
			const {browseId: a,query: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(b!=="") debugger;
			return this.GU_E_BrowseId(ve_name,a);
		}
		if("browseId" in x) {
			const {browseId: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			return this.GU_E_BrowseId(ve_name,a);
		}
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD"; this.k(cf,x);
		if("channelMetadataRenderer" in x) return this.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.R_Playlist_MD(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar"; this.k(cf,x);
		if("settingsSidebarRenderer" in x) return this.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.R_PlaylistSidebar(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem"; this.k(cf,x);
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @arg {G_RichGridContent} x */
	D_RichGridContent(x) {
		const cf="D_RichGridContent"; this.k(cf,x);
		if("richItemRenderer" in x) return this.R_RichItem(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("richSectionRenderer" in x) return this.R_RichSection(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_RichItemContent} x */
	G_RichItemContent(x) {
		const cf="G_RichItemContent"; this.k(cf,x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("videoRenderer" in x) return this.R_Video(x);
		if("radioRenderer" in x) return this.R_Radio(x);
		if("feedNudgeRenderer" in x) return this.R_FeedNudge(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_DC_CommandExecutor_CommandItem} x */
	G_DC_CommandExecutor_CommandItem(x) {
		const cf="DC_CommandExecutor.command";
		if("updateToggleButtonStateCommand" in x) return this.C_UpdateToggleButtonState(x);
		if("likeEndpoint" in x) return this.E_Like(x);
		if("entityUpdateCommand" in x) return this.C_EntityUpdate(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		if("commandExecutorCommand" in x) return this.C_RepeatChapter(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_DC_GetSurvey_Endpoint} x */
	G_DC_GetSurvey_Endpoint(x) {
		const cf="G_DC_GetSurvey_Endpoint"; this.k(cf,x);
		if("paidDigitalGoods" in x) return this.R_PaidDigitalGoods(x);
		if("watch" in x) return this.D_Survey_Watch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @protected @arg {Response} response @arg {G_ResponseTypes} x */
	G_ResponseTypes(response,x) {
		const cf="G_ResponseTypes"; this.g_k(cf,x);
		if(!response.ok) {
			console.log("not ok",x);
			return;
		}
		/** @private @arg {{type:string}} x */
		let g=x => {return this.save_string("[need_api_type]",x.type);};
		switch(x.type) {case "_Generic": return g(x);}
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
	/** @private @arg {G_NextContents} x */
	G_NextContents(x) {
		const cf="G_NextContents"; this.k(cf,x);
		if("twoColumnWatchNextResults" in x) return this.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		x===""; this.codegen_typedef_all(cf,x);
		x===0;
	}
	/** @arg {string} cf1 @arg {G_ClientSignal["actions"][number]} x */
	G_SignalActionItem(cf1,x) {
		/** @type {`G_SignalActionItem:${cf1}`} */
		const cf2=`G_SignalActionItem:${cf1}`; this.k(cf2,x);
		/** @type {G_ClientSignal_Item} */
		if("openPopupAction" in x) return this.S_Client_Popup(x);
		if("showEngagementPanelEndpoint" in x) return this.E_ShowEngagementPanel(x);
		if("sendFeedbackAction" in x) return this.A_SendFeedback(x);
		if("signalAction" in x) return this.A_Signal(x);
		if("addToPlaylistCommand" in x) return this.C_AddToPlaylist(x);
		this.codegen_typedef_all(cf2,x);
	}
	/** @private @arg {string} cf1 @arg {G_ClientSignal} x */
	G_ClientSignal(cf1,x) {
		const cf2="G_ClientSignal";
		let {actions,...y}=this.Signal_Omit(x,x => {
			this.save_string(`[${cf2}.${cf1}.signal]`,x);
			if(x!=="CLIENT_SIGNAL") debugger;
		}); this.g(y);
		this.z_cf(cf1,actions,this.G_SignalActionItem);
	}
	/** @private @arg {G_WatchNextEndScreenItem} x */
	G_WatchNextEndScreenItem(x) {
		const cf="G_WatchNextEndScreenItem"; this.k(cf,x);
		if("endScreenPlaylistRenderer" in x) return this.R_EndScreenPlaylist(x);
		if("endScreenVideoRenderer" in x) return this.R_EndScreenVideo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_MenuItem} x */
	G_MenuItem(x) {
		const cf="G_MenuItem"; this.g_k(cf,x); this.k(cf,x);
		if("toggleMenuServiceItemRenderer" in x) return this.R_ToggleMenuServiceItem(x);
		if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		this.codegen_typedef_all("MenuItems",x);
		this.G_Text(x);
	}
	/** @private @arg {G_Watch_ResultsItem} x */
	G_Watch_ResultsItem(x) {
		const cf="G_Watch_ResultsItem"; this.k(cf,x);
		let {trackingParams,contents: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.z(a,this.G_WatchResult_ContentsItem);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_3<any,any,any>>} x */
	G_WatchResultItem_ItemSection_3(x) {
		const cf="G_WatchResultItem_ItemSection"; this.k(cf,x);
		this.k(`${cf}.section`,x.itemSectionRenderer);
		if(x.itemSectionRenderer.sectionIdentifier!=="comment-item-section") debugger;
		let u=this.TR_ItemSection_3(x); if(!u) return;
		let u1=this.TD_ItemSection_3(`TD_ItemSection_3<"comment-item-section","comments-section">`,u); if(!u1) return;
		this.ItemSection_3_CommentItemSection(u1);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,{itemSectionRenderer:any}>} x */
	G_WatchResultItem_ItemSectionGroup(x) {
		if(this.is_ItemSectionRendererTemplate(x)) return this.G_WatchResultItem_ItemSection_3(x);
		if(x.itemSectionRenderer.sectionIdentifier!=="comments-entry-point") debugger;
		let u=this.TR_ItemSection_2(x); if(!u) return;
		this.TD_ItemSection_2_CommentsEntryPoint(u,this.R_CommentItemSection_EntryPoint);
	}
	/** @private @arg {G_Watch_ContentsItem} x */
	G_WatchResult_ContentsItem(x) {
		const cf="G_WatchResult_ContentsItem"; this.k(cf,x);
		if("itemSectionRenderer" in x) return this.G_WatchResultItem_ItemSectionGroup(x);
		if("merchandiseShelfRenderer" in x) return this.R_MerchandiseShelf(x);
		if("videoPrimaryInfoRenderer" in x) return this.R_VideoPrimaryInfo(x);
		if("videoSecondaryInfoRenderer" in x) return this.R_VideoSecondaryInfo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_Watch_AnyResultItem} x */
	G_Watch_AnyResultItem(x) {
		const cf="G_SecondaryContentsItem"; this.k(cf,x);
		if("relatedChipCloudRenderer" in x) return this.R_RelatedChipCloud(x);
		if("itemSectionRenderer" in x) return this.RG_Watch_ItemSection(x);
		x===""; this.codegen_typedef_all(cf,x);
		return null;
	}
	/** @private @arg {G_Watch_SecondaryResults_Contents} x */
	G_Watch_SecondaryResults_Contents(x) {
		const cf="G_Watch_SecondaryResults_Contents"; this.k(cf,x);
		const {contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.G_Watch_AnyResultItem);
	}
	/** @private @arg {G_Watch_SecondaryResults} x */
	G_Watch_SecondaryResults(x) {
		const cf="G_Watch_SecondaryResults"; this.k(cf,x);
		if("contents" in x) return this.G_Watch_SecondaryResults_Contents(x);
		if("results" in x) return this.G_Watch_SecondaryResults_Results(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_EngagementPanelSectionShowCommands} x */
	G_EngagementPanelSectionShowCommands(x) {
		const cf="G_EngagementPanelSectionShowCommands"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("showEngagementPanelScrimAction" in x) return this.A_ShowEngagementPanelScrim(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		const cf="G_GuideSectionItem"; this.k(cf,x);
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		if("guideDownloadsEntryRenderer" in x) return this.R_GuideDownloadsEntry(x);
		if("guideCollapsibleEntryRenderer" in x) return this.R_GuideCollapsibleEntry(x);
		if("guideSubscriptionsSectionRenderer" in x) return this.R_GuideSubscriptionsSection(x);
		if("guideSectionRenderer" in x) return this.R_GuideSection(x);
		x===""; this.codegen_typedef_all(cf,x); x==="";
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_SI_DB_EngagementPanel} x */
	G_SI_DB_EngagementPanel(x) {
		const cf="DB_SI_EngagementPanel"; this.k(cf,x);
		switch(x.targetId) {
			default: x===""; debugger; break;
			case "engagement-panel-ads": {
				const {content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.R_AdsEngagementPanelContent(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-clip-create": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,onShowCommands,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-clip-create") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_ClipSection(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
				this.z(onShowCommands,this.G_EngagementPanelSectionShowCommands);
			} break;
			case "engagement-panel-macro-markers-description-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-macro-markers-description-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-macro-markers-auto-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				if(panelIdentifier!=="engagement-panel-macro-markers-auto-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
		}
	}
	/** @private @arg {G_RS_Page_Settings} x */
	G_RS_Page_Settings(x) {
		const cf="R_SettingsPage"; this.k(cf,x);
		if("rootVe" in x) return this.RS_VE23462_Page_Settings(x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		this.GE_Browse(endpoint);
		this.RS_Settings(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {G_RS_Page_Playlist} x */
	G_RS_Page_Playlist(x) {
		const cf="R_PlaylistPage"; this.k(cf,x);
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(page!=="playlist") debugger;
		this.GE_Browse(endpoint);
		this.RS_Playlist(response);
		this.a_primitive_str(url);
		if("rootVe" in y) {
			const {rootVe,...u}=this.s(cf,y); this.g(u);/*#destructure_done*/
			switch(rootVe) {
				default: debugger; break;
				case 5754: break;
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {RS_VE23462_Page_Settings} x */
	RS_VE23462_Page_Settings(x) {
		const cf="Settings_VE23462"; this.k(cf,x);
		const {page,endpoint,response,url,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		this.GE_Browse(endpoint);
		this.RS_Settings(response);
		this.a_primitive_str(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {RS_VE37414_Shorts} x */
	RS_VE37414_Shorts(x) {
		const cf="Shorts_VE37414"; this.k(cf,x);
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
	/** @private @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader"; this.k(cf,x);
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.R_PlaylistHeader(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_RS_Page_Shorts} x */
	G_RS_Page_Shorts(x) {
		const cf="RS_ShortsPage"; this.k(cf,x);
		if("rootVe" in x) return this.RS_VE37414_Shorts(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="shorts") debugger;
		this.RS_Player(playerResponse);
		this.E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,this.RS_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(cachedReelWatchSequenceResponse,this.RS_ReelWatchSequence);
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents"; this.k(cf,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {"G_EY_Entity"} cf @template V @arg {{[U in `${string}Entity`]:V}} x */
	G_EY_Entity_Any(cf,x) {return this.w(`G_EY_Entity_Any:${cf}`,this.get_keys_of(x)[0],x);}
	/**
	 * @private @arg {G_EY_Entity} x
	 * @returns {(G_EY_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?[keyof I,V]|null:null:never)|["unknown",string,{}]}
	 */
	G_EY_Entity(x) {
		const cf="G_EY_Entity"; this.k(cf,x);
		{const cn="subscriptionStateEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="transcriptTrackSelectionEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="transcriptSearchBoxStateEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="offlineabilityEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="playlistLoopStateEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="macroMarkersListEntity"; if(cn in x) return [cn,this.G_EY_Entity_Any(cf,x)];}
		{const cn="superThanksSelectedTierEntity"; if(cn in x) return ["unknown",cn,this.G_EY_Entity_Any(cf,x)];}
		/** @returns {[]|[string]} */
		const get_kl=() => {return this.get_keys_of(x);};
		let kl=get_kl();
		if(kl.length===0) return null;
		let [cn,...cr]=kl;
		if(cr.length!==0) debugger;
		if(!cn) return null;
		x===""; this.codegen_typedef_all(cf,x);
		this.codegen_typedef_all(`${cf}$entity`,this.G_EY_Entity_Any(cf,x));
		return ["unknown",cn,this.G_EY_Entity_Any(cf,x)];
	}
	/** @private @arg {G_TopbarButtonItem} x */
	G_TopbarButtonItem(x) {
		const cf="G_TopbarButtonItem"; this.k(cf,x);
		if("topbarMenuButtonRenderer" in x) return this.R_TopbarMenuButton(x);
		if("notificationTopbarButtonRenderer" in x) return this.R_NotificationTopbarButton(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_BrowseFeed} x */
	G_BrowseFeed(x) {
		const cf="G_BrowseFeed"; this.k(cf,x);
		if("richItemRenderer" in x) return this.R_RichItem(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_SecondaryContents} x */
	G_SecondaryContents(x) {
		const cf="G_SecondaryContents"; this.k(cf,x);
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_WatchNext} x */
	G_WatchNext(x) {
		const cf="G_WatchNext"; this.k(cf,x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_StructuredDescriptionContentItem} x */
	G_StructuredDescriptionContentItem(x) {
		const cf="G_StructuredDescriptionContentItem"; this.k(cf,x);
		if("expandableVideoDescriptionBodyRenderer" in x) return this.R_ExpandableVideoDescriptionBody(x);
		if("horizontalCardListRenderer" in x) return this.R_HorizontalCardList(x);
		if("videoDescriptionHeaderRenderer" in x) return this.R_VideoDescriptionHeader(x);
		if("videoDescriptionMusicSectionRenderer" in x) return this.R_VideoDescriptionMusicSection(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_RS_Subscribe_Action} x */
	G_RS_Subscribe_Action(x) {
		const cf="RS_Subscribe_ActionItem"; this.k(cf,x);
		if("openPopupAction" in x) {
			/** @type {`${typeof cf}_Action`} */
			const cf1=`${cf}_Action`;
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf1,x); this.g(y);
			this.clickTrackingParams(cf1,clickTrackingParams);
			console.log(`[${cf}.openPopupAction]`,openPopupAction);
			return;
		}
		if("addToGuideSectionAction" in x) return this.A_AddToGuideSection(x);
		if("runAttestationCommand" in x) return this.C_RunAttestation(x);
		if("updateSubscribeButtonAction" in x) return this.AU_SubscribeButton(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_Watch_SecondaryResults_G_SectionItem} x */
	G_Watch_SecondaryResults_G_SectionItem(x) {
		const cf="G_Watch_SecondaryResults_G_SectionItem"; this.k(cf,x);
		if("compactRadioRenderer" in x) return this.R_CompactRadio(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		if("compactPlaylistRenderer" in x) return this.R_CompactPlaylist(x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("" in x) return;
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_Watch_SecondaryResults_Results} x */
	G_Watch_SecondaryResults_Results(x) {
		const cf="G_Watch_SecondaryResults_Results"; this.k(cf,x);
		const {results,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(results,this.G_Watch_AnyResultItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_ProfileColumnItem} x */
	G_ProfileColumnItem(x) {
		const cf="G_ProfileColumnItem"; this.k(cf,x);
		if("profileColumnStatsRenderer" in x) return this.R_ProfileColumnStats(x);
		if("profileColumnUserInfoRenderer" in x) return this.R_ProfileColumnUserInfo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_BrowseFeedContent} x */
	G_BrowseFeedContent(x) {
		const cf="G_BrowseFeedContent"; this.k(cf,x);
		if("searchBoxRenderer" in x) return this.R_SearchBox(x);
		if("subFeedSelectorRenderer" in x) return this.R_SubFeedSelector(x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("compactLinkRenderer" in x) return this.R_CompactLink(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_Action_GetNotificationsMenu_Popup} x */
	G_Action_GetNotificationsMenu_Popup(x) {
		const cf="G_Action_GetNotificationsMenu_Popup"; this.k(cf,x);
		const {popup: a,popupType,beReused,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(popupType!=="DROPDOWN") debugger;
		if(beReused!==true) debugger;
		return a;
	}
	/** @private @arg {G_EngagementPanelMenu} x */
	G_EngagementPanelMenu(x) {
		const cf="G_EngagementPanelMenu"; this.k(cf,x);
		if("menuRenderer" in x) return this.R_Menu(x);
		if("sortFilterSubMenuRenderer" in x) return this.R_SortFilterSubMenu(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_LiveChatContinuationItem} x */
	G_LiveChatContinuationItem(x) {
		const cf="G_LiveChatContinuationItem"; this.k(cf,x);
		if("invalidationContinuationData" in x) return this.CD_Invalidation(x);
		if("liveChatReplayContinuationData" in x) return this.CD_LiveChatReplay(x);
		if("playerSeekContinuationData" in x) return this.CD_PlayerSeek(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_RA_LiveChatContinuationActions} x */
	G_LiveChatContinuationActions(x) {
		const cf="G_LiveChatContinuationActions"; this.k(cf,x);
		if("replayChatItemAction" in x) return this.A_ReplayChatItem(x);
		if("addChatItemAction" in x) return this.A_AddChatItem(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent"; this.k(cf,x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("accountItem" in x) return this.A_AccountItem(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_ThumbnailOverlayItem} x */
	G_ThumbnailOverlayItem(x) {
		const cf="G_ThumbnailOverlayItem"; this.k(cf,x);
		// COMPLETED: #11
		if("thumbnailOverlaySidePanelRenderer" in x) return this.R_ThumbnailOverlaySidePanel(x);
		if("thumbnailOverlayHoverTextRenderer" in x) return this.R_ThumbnailOverlayHoverText(x);
		if("thumbnailOverlayNowPlayingRenderer" in x) return this.R_ThumbnailOverlayNowPlaying(x);
		if("thumbnailOverlayBottomPanelRenderer" in x) return this.R_ThumbnailOverlayBottomPanel(x);
		if("thumbnailOverlayTimeStatusRenderer" in x) return this.R_ThumbnailOverlayTimeStatus(x);
		if("thumbnailOverlayToggleButtonRenderer" in x) return this.R_ThumbnailOverlayToggleButton(x);
		if("thumbnailOverlayLoadingPreviewRenderer" in x) return this.R_ThumbnailOverlayLoadingPreview(x);
		if("thumbnailOverlayResumePlaybackRenderer" in x) return this.R_ThumbnailOverlayResumePlayback(x);
		if("thumbnailOverlayEndorsementRenderer" in x) return this.R_ThumbnailOverlayEndorsement(x);
		if("thumbnailOverlayInlineUnplayableRenderer" in x) return this.R_ThumbnailOverlayInlineUnplayable(x);
		this.codegen_typedef_all(`ThumbnailOverlay$${cf}`,x);
	}
	/** @arg {G_PlaylistPanel_Item} x */
	G_PlaylistPanel_Item(x) {
		const cf="G_PlaylistPanel_Item"; this.k(cf,x);
		if("automixPreviewVideoRenderer" in x) return this.R_AutomixPreviewVideo(x);
		if("playlistPanelVideoRenderer" in x) return this.R_PlaylistPanelVideo(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {G_AdditionalDataItem} x */
	G_AdditionalDataItem(x) {
		let d=this.w("G_AdditionalDataItem","userFeedbackEndpointProductSpecificValueData",x);
		switch(d.key) {
			default: debugger; break;
			case "lockup": {
				if(d.value!=="player") debugger;
			} break;
			case "video_id": {
				this.videoId(d.value);
			} break;
		}
	}
	/** @private @arg {G_ChatItem} x */
	G_ChatItem(x) {
		const cf="G_ChatItem"; this.k(cf,x);
		if("liveChatTextMessageRenderer" in x) return;
		if("liveChatPlaceholderItemRenderer" in x) return;
		if("liveChatViewerEngagementMessageRenderer" in x) return;
	}
	/** @private @arg {G_PlayerStoryboards} x */
	G_PlayerStoryboards(x) {
		const cf="G_PlayerStoryboards"; this.k(cf,x);
		if("playerStoryboardSpecRenderer" in x) return;
		if("playerLiveStoryboardSpecRenderer" in x) return;
		this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_TextRun} x @arg {(x:NonNullable<D_TextRun['navigationEndpoint']>)=>void} f_run */
	D_TextRun(x,f_run) {
		const cf="R_TextRun";
		const {text,navigationEndpoint,loggingDirectives,bold,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(navigationEndpoint,f_run);
		this.a_primitive_str(text);
		this.t(loggingDirectives,this.D_LoggingDirectives);
		this.t(bold,this.a_primitive_bool);
	}
	/** @template {CF_T_Commands} T_CF @arg {T_CF} cf @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(cf,x,f) {this.z(this.w(`T_Commands:${cf}`,"commands",x),f);}
	/** @private @arg {P_PathRootStr} sec @template {CF_D_Params} T_CF @arg {T_CF} cf @template {string} T @arg {{params:T;}} x */
	D_Params(cf,x,sec) {const {params: p,...y}=this.s_priv(`D_Params:${cf}`,x); this.g(y); this.params(`${cf}.params`,sec,x.params);}
	//#endregion
	//#region helpers
	/** @protected @template {{}} T @arg {CF_M_s} cf @arg {{} extends T?T_DistributedKeysOf<T> extends []?T:never:never} x */
	gs(cf,x) {this.g(this.s(cf,x));}
	/** @private @template {{}} T @arg {CF_M_s_priv} cf @arg {T} x */
	s_priv(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @private @template {{}} T @arg {CF_M_s} cf @arg {T} x */
	s(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @override @protected @arg {string} cf @arg {{}} x */
	k=(cf,x) => this.save_keys(`[${cf}]`,x);
	/** @protected @arg {string} cf @arg {{}} x */
	g_k=(cf,x) => this.k(cf,x);
	/** @private @template T @arg {CF_T_WCM_Unpack} cf @arg {{webCommandMetadata: T}} x */
	unpack_T_WCM(cf,x) {return this.w(`Unpack:T_WCM:${cf}`,"webCommandMetadata",x);}
	//#endregion
	//#region static & typedefs
	/** @typedef {{}} minimal_handler_member */
	static {this.prototype.minimal_handler_member_2({});}
	// /** @protected @override @type {<U,K extends T_DistributedKeyof<T>,T extends {}>(cf:string,x:T,f:(this:this,x:T[K])=>U)=>U} */
	// H_=super.H_;
	//#endregion
	//#region member functions
	/** @typedef {`${string}${D_EndpointLikeEndings}`} EPL */
	/**
	 * @arg {CF_TE_Endpoint_2} cf1
	 * @template {Extract<keyof T_EP,EPL>} EP_Key @template {TE_Endpoint_2<EPL,{}>} T_EP @arg {T_EP} x @arg {EP_Key} k
	 * @returns {[T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|EP_Key>]}
	 * */
	TE_Endpoint_2(cf1,k,x) {
		const cf2="TE_Endpoint_2";
		const {clickTrackingParams,[k]: endpoint,...y}=this.s_priv(`${cf2}:${cf1}`,x);
		/** @type {`${CF_TE_Endpoint_2}.endpoint`} */
		this.clickTrackingParams(`${cf1}.endpoint`,clickTrackingParams);
		return [endpoint,y];
	}
	/**
	 * @private
	 * @arg {CF_TE_Endpoint_3} cf1
	 * @template {Extract<keyof T_EP,EPL>} EP_Key @template {TE_Endpoint_3<EPL,{},{}>} T_EP @arg {T_EP} x
	 * @arg {EP_Key} k
	 * @returns {[T_EP['commandMetadata'],T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|EP_Key>]}
	 */
	TE_Endpoint_3(cf1,k,x) {
		const cf2="TE_Endpoint_3";
		const {clickTrackingParams,commandMetadata,[k]: a,...y}=this.s_priv(`${cf2}:${cf1}`,x);
		/** @type {`${CF_TE_Endpoint_3}.endpoint`} */
		this.clickTrackingParams(`${cf1}.endpoint`,clickTrackingParams);
		return [commandMetadata,a,y];
	}
	/** @private @arg {CF_TE_Endpoint_Opt_3} cf @template {EPL} EP_Key @template {TE_Endpoint_Opt_3<EP_Key,any,any>} T_EP @arg {EP_Key} k @arg {T_EP} x @returns {[T_EP["commandMetadata"],T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|EP_Key>]} */
	TE_Endpoint_Opt_3(cf,k,x) {
		const {clickTrackingParams,commandMetadata,[k]: endpoint,...y}=this.s_priv(`TE_Endpoint_Opt_3:${cf}`,x);
		/** @type {`${CF_TE_Endpoint_Opt_3}.endpoint`} */
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		return [commandMetadata,endpoint,y];
	}
	/** @override @protected @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
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
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @returns {T[K]|null} */
	w_priv(k,x) {
		if(!(k in x)) {debugger; return null;}
		return x[k];
	}
	/** @override @protected @arg {CF_M_w} cf @arg {SI} k @template {T_DistributedKeyof<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {T[SI]} */
	w(cf,k,x,excl=[]) {
		this.k(cf,x);
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		if(keys.length!==1) debugger;
		let hk=keys[0];
		if(hk!==k) {debugger; throw new Error();}
		let r=x[hk];
		return r;
	}
	/** @protected @arg {string} cf @arg {SI} ex_name @template {T_DistributedKeyof<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {(Exclude<T[SI],null>)|null} */
	wn(cf,x,ex_name,excl=[]) {
		this.k(cf,x);
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		if(keys.length!==1) debugger;
		let k=keys[0];
		if(k!==ex_name) {debugger; return null;}
		let r=x[k];
		return r;
	}
	/** @protected @arg {CF_M_zy} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K][number],i:number)=>U} f */
	zy(cf,k,x,f) {return this.z(this.w(`zy:${cf}`,k,x),f);}
	//#endregion
	//#region CheckedTemplates
	/** @private @template T,U @arg {T_Item<T>} x @arg {(this:this,x:T)=>U} f */
	T_Item=(x,f) => this.y("T_Item","item",x,f);
	/** @arg {CF_T_Icon} cf1 @private @template {string} T @arg {T_Icon<T>} x */
	T_Icon(cf1,x) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.save_string(`[${cf1}.IconType]`,iconType);
	}
	/** @private @arg {CF_T_Icon_Any} cf1 @template {string} T @arg {T_Icon<T>} x @arg {T[]} ty_arr */
	T_Icon_AnyOf(cf1,x,ty_arr) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:any:${cf1}`,x); this.g(y);/*#destructure_done*/
		const is_missing_iconType=!ty_arr.includes(iconType);
		if(is_missing_iconType) {console.log(`[missing_icon.${cf1}]`,iconType);}
		this.save_string("[IconType]",iconType);
		return is_missing_iconType;
	}
	/** @private @arg {CF_TA_OpenPopup} cf1 @template T @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(cf1,x) {
		const cf2="TA_OpenPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(`${cf1}.tracking`,clickTrackingParams);
		return a;
	}
	/** @private @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a}=this.s("T_UrlWrappedValue",x); return a;}
	/** @private @arg {CF_TA_Page} cf @template T @arg {T_Page<T>} x @template U @arg {(this:this,x:T)=>U} f */
	TA_Page(cf,x,f) {f.call(this,this.w(`TA_Page:${cf}`,"page",x));}
	/** @private @arg {CF_TR_MultiPageMenu} cf @template T @arg {TR_MultiPageMenu<T>} x */
	TR_MultiPageMenu(cf,x) {return this.w(`TR_MultiPageMenu:${cf}`,"multiPageMenuRenderer",x);}
	/** @private @arg {CF_T_WCM} cf @template T @template U @arg {{webCommandMetadata:T;}} x @arg {(this:this,x:T)=>U} f */
	T_WCM(cf,x,f) {this.y(`T_WCM:${cf}`,"webCommandMetadata",x,f);}
	//#endregion
	//#region web_command_metadata
	/** @private @arg {Extract<GM_VE_WC_Browse,{rootVe:6827}>} x */
	GM_VE6827_WC(x) {
		const cf="GM_VE6827_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x);/*#destructure_done*/
		this.t(url,this.D_VE6827_PageUrl);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==6827) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if("sendPost" in y) {
			const {sendPost,...y1}=y; this.g(y1);
			if(sendPost!==true) debugger;
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_VE6827_PageUrl} x */
	D_VE6827_PageUrl(x) {
		let [f,...pf]=split_string(x,"/"); if(f!=="") debugger;
		/** @type {D_VE6827_PageUrl_parts} */
		let p=as_any(pf);
		switch(p[0]) {
			default: p[0]===""; debugger; break;
			case "source": {
				let [,id,...u]=p;
				let s2=split_string_once(u[0],'?');
				if(s2.length!==2) debugger;
				this.videoId(id);
				switch(s2[0]) {
					default: s2[0]===""; debugger; break;
					case "shorts": break;
				}
			} break;
			case "hashtag": {
				let [,ht,...u]=p;
				if(u.length===0) {
					this.indexed_db.put("hashtag",{hashtag: ht});
				} else if(u.length===1) {
					switch(u[0]) {
						default: u[0]===""; debugger; break;
						case "shorts": break;
					}
				} else {
				}
			} break;
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
	//#endregion
	//#region general done
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {let [a,y]=this.TE_Endpoint_2("AU_NotificationsUnseenCount","updateNotificationsUnseenCountAction",x); this.g(y); this.AD_UpdateNotificationsUnseenCount(a);}
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H_("A_GetMultiPageMenu","getMultiPageMenuAction",x,this.AD_GetMultiPageMenu);}
	/** @private @arg {A_Signal} x */
	A_Signal(x) {let [a,y]=this.TE_Endpoint_2("A_Signal","signalAction",x); this.g(y); this.AD_Signal(a);}
	/** @private @arg {A_ReplaceEnclosing} x */
	A_ReplaceEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_ReplaceEnclosing","replaceEnclosingAction",x); this.g(y); this.AD_ReplaceEnclosing(a);}
	/** @private @arg {A_ShowEngagementPanelScrim} x */
	A_ShowEngagementPanelScrim(x) {let [a,y]=this.TE_Endpoint_2("A_ShowEngagementPanelScrim","showEngagementPanelScrimAction",x); this.g(y); this.AD_ShowEngagementPanelScrim(a);}
	/** @private @arg {A_HideEnclosing} x */
	A_HideEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_HideEnclosing","hideEnclosingAction",x); this.g(y); this.AD_HideEnclosing(a);}
	/** @private @arg {A_ChangeEngagementPanelVisibility} x */
	A_ChangeEngagementPanelVisibility(x) {let [a,y]=this.TE_Endpoint_2("A_ChangeEngagementPanelVisibility","changeEngagementPanelVisibilityAction",x); this.g(y); this.AD_ChangeEngagementPanelVisibility(a);}
	/** @private @arg {A_HideEngagementPanelScrim} x */
	A_HideEngagementPanelScrim(x) {let [a,y]=this.TE_Endpoint_2("A_HideEngagementPanelScrim","hideEngagementPanelScrimAction",x); this.g(y); this.AD_HideEngagementPanelTargetId(a);}
	/** @private @arg {A_SendFeedback} x */
	A_SendFeedback(x) {let [a,b]=this.TE_Endpoint_2("A_SendFeedback","sendFeedbackAction",x); this.g(b); this.AD_SendFeedback(a);}
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {let [a,y]=this.TE_Endpoint_2("A_AddToGuideSection","addToGuideSectionAction",x); this.g(y); this.AD_AddToGuideSection(a);}
	/** @private @arg {A_AddChatItem} x */
	A_AddChatItem(x) {let [a,y]=this.TE_Endpoint_2("A_AddChatItem","addChatItemAction",x); this.g(y); this.AD_AddChatItem(a);}
	/** @private @arg {A_UndoFeedback} x */
	A_UndoFeedback(x) {let [a,y]=this.TE_Endpoint_2("A_UndoFeedback","undoFeedbackAction",x); this.g(y); this.B_Hack(a);}
	/** @private @arg {A_ReplayChatItem} x */
	A_ReplayChatItem(x) {this.H_("A_ReplayChatItem","replayChatItemAction",x,this.AD_ReplayChatItem);}
	/** @private @arg {A_AccountItem} x */
	A_AccountItem(x) {this.H_("A_AccountItem","accountItem",x,this.AD_AccountItem);}
	/** @private @arg {A_AppendContinuationItems} x */
	A_AppendContinuationItems(x) {let [a,y]=this.TE_Endpoint_2("A_AppendContinuationItems","appendContinuationItemsAction",x); this.g(y); this.AD_AppendContinuationItems(a);}
	/** @private @arg {R_Button} x */
	R_Button(x) {this.H_("R_Button","buttonRenderer",x,this.D_Button);}
	/** @private @arg {R_HotkeyDialogSection} x */
	R_HotkeyDialogSection(x) {this.H_("R_HotkeyDialogSection","hotkeyDialogSectionRenderer",x,this.D_HotkeyDialogSection);}
	/** @private @arg {R_HotkeyDialogSectionOption} x */
	R_HotkeyDialogSectionOption(x) {this.H_("R_HotkeyDialogSectionOption","hotkeyDialogSectionOptionRenderer",x,this.D_HotkeyDialogSectionOption);}
	/** @private @arg {R_PlayerOverlayVideoDetails} x */
	R_PlayerOverlayVideoDetails(x) {this.H_("R_PlayerOverlayVideoDetails","playerOverlayVideoDetailsRenderer",x,this.D_PlayerOverlayVideoDetails);}
	/** @private @arg {R_CinematicContainer} x */
	R_CinematicContainer(x) {this.H_("R_CinematicContainer","cinematicContainerRenderer",x,this.D_CinematicContainer);}
	/** @private @arg {R_TwoColumnWatchNextResults} x */
	R_TwoColumnWatchNextResults(x) {this.H_("R_TwoColumnWatchNextResults","twoColumnWatchNextResults",x,this.D_TwoColumnWatchNextResults);}
	/** @private @arg {R_PlayerOverlay} x */
	R_PlayerOverlay(x) {this.H_("R_PlayerOverlay","playerOverlayRenderer",x,this.D_PlayerOverlay);}
	/** @private @arg {R_DesktopTopbar} x */
	R_DesktopTopbar(x) {this.H_("R_DesktopTopbar","desktopTopbarRenderer",x,this.D_DesktopTopbar);}
	/** @private @arg {R_TopbarLogo} x */
	R_TopbarLogo(x) {this.H_("R_TopbarLogo","topbarLogoRenderer",x,this.D_TopbarLogo);}
	/** @private @arg {R_FusionSearchbox} x */
	R_FusionSearchbox(x) {this.H_("R_FusionSearchbox","fusionSearchboxRenderer",x,this.D_FusionSearchbox);}
	/** @private @arg {R_HotkeyDialog} x */
	R_HotkeyDialog(x) {this.H_("R_HotkeyDialog","hotkeyDialogRenderer",x,this.D_HotkeyDialog);}
	/** @private @arg {R_Microformat} x */
	R_Microformat(x) {this.H_("R_Microformat","microformatDataRenderer",x,this.D_Microformat);}
	/** @private @arg {R_EntityBatchUpdate} x */
	R_EntityBatchUpdate(x) {this.H_("R_EntityBatchUpdate","entityBatchUpdate",x,this.D_EntityBatchUpdate);}
	/** @private @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("R_SettingsSidebar","settingsSidebarRenderer",x,this.D_SettingsSidebar);}
	/** @private @arg {R_CompactLink} x */
	R_CompactLink(x) {this.H_("R_CompactLink","compactLinkRenderer",x,this.D_CompactLink);}
	/** @private @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("PlaylistSidebar","playlistSidebarRenderer",x,this.D_PlaylistSidebar);}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("R_PlaylistSidebarPrimaryInfo","playlistSidebarPrimaryInfoRenderer",x,this.D_PlaylistSidebarPrimaryInfo);}
	/** @private @arg {D_Label} x */
	D_Label(x) {this.H_("Label","label",x,this.a_primitive_str);}
	/** @private @arg {D_Accessibility} x */
	D_Accessibility(x) {this.H_("D_Accessibility","accessibilityData",x,this.D_Label);}
	/** @private @arg {R_Tab} x */
	R_Tab(x) {this.H_("Tab","tabRenderer",x,this.D_Tab);}
	/** @private @arg {R_ExpandableTab} x */
	R_ExpandableTab(x) {this.H_("R_ExpandableTab","expandableTabRenderer",x,this.D_ExpandableTab);}
	/** @private @arg {R_PdgBuyFlow} x */
	R_PdgBuyFlow(x) {this.H_("R_PdgBuyFlow","pdgBuyFlowRenderer",x,this.D_PdgBuyFlow);}
	/** @private @arg {R_SuperVodBuyFlowContent} x */
	R_SuperVodBuyFlowContent(x) {this.H_("R_SuperVodBuyFlowContent","superVodBuyFlowContentRenderer",x,this.D_SuperVodBuyFlowContent);}
	/** @private @arg {R_PdgColorSlider} x */
	R_PdgColorSlider(x) {this.H_("R_PdgColorSlider","pdgColorSliderRenderer",x,this.D_PdgColorSlider);}
	/** @private @arg {R_PdgCommentPreview} x */
	R_PdgCommentPreview(x) {this.H_("R_PdgCommentPreview","pdgCommentPreviewRenderer",x,this.D_PdgCommentPreview);}
	/** @private @arg {R_PdgBuyFlowHeader} x */
	R_PdgBuyFlowHeader(x) {this.H_("R_PdgBuyFlowHeader","pdgBuyFlowHeaderRenderer",x,this.D_PdgBuyFlowHeader);}
	/** @private @arg {R_Menu} x */
	R_Menu(x) {this.H_("R_Menu","menuRenderer",x,this.D_Menu);}
	/** @private @arg {R_MusicQueue} x */
	R_MusicQueue(x) {this.H_("R_MusicQueue","musicQueueRenderer",x,this.D_MusicQueue);}
	/** @private @arg {R_RichGrid} x */
	R_RichGrid(x) {this.H_("R_RichGrid","richGridRenderer",x,this.D_RichGrid);}
	/** @private @arg {R_RichItem} x */
	R_RichItem(x) {this.H_("R_RichItem","richItemRenderer",x,this.D_RichItem);}
	/** @private @arg {R_FeedNudge} x */
	R_FeedNudge(x) {this.H_("R_FeedNudge","feedNudgeRenderer",x,this.D_FeedNudge);}
	/** @private @arg {R_MovingThumbnail} x */
	R_MovingThumbnail(x) {this.H_("R_MovingThumbnail","movingThumbnailRenderer",x,this.D_MovingThumbnail);}
	/** @private @arg {R_Radio} x */
	R_Radio(x) {this.H_("R_Radio","radioRenderer",x,this.D_Radio);}
	/** @private @arg {R_ChildVideo} x */
	R_ChildVideo(x) {this.H_("R_Radio","childVideoRenderer",x,this.D_ChildVideo);}
	/** @private @arg {R_ToggleButton} x */
	R_ToggleButton(x) {this.H_("R_ToggleButton","toggleButtonRenderer",x,this.D_ToggleButton);}
	/** @private @arg {R_Video} x */
	R_Video(x) {this.H_("R_Video","videoRenderer",x,this.D_Video);}
	/** @private @arg {R_ThumbnailOverlayLoadingPreview} x */
	R_ThumbnailOverlayLoadingPreview(x) {this.H_("R_ThumbnailOverlayLoadingPreview","thumbnailOverlayLoadingPreviewRenderer",x,this.D_ThumbnailOverlayLoadingPreview);}
	/** @protected @arg {D_ThumbnailOverlayLoadingPreview} x */
	D_ThumbnailOverlayLoadingPreview(x) {this.H_("D_ThumbnailOverlayLoadingPreview","text",x,this.G_Text);}
	/** @private @arg {R_ChannelThumbnailWithLink} x */
	R_ChannelThumbnailWithLink(x) {this.H_("R_ChannelThumbnailWithLink","channelThumbnailWithLinkRenderer",x,this.D_ChannelThumbnailWithLink);}
	/** @private @arg {D_PaidDigitalGoods} x */
	R_PaidDigitalGoods(x) {this.H_("R_PaidDigitalGoods","paidDigitalGoods",x,this.B_Hack);}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("R_PlayerAnnotationsExpanded","playerAnnotationsExpandedRenderer",x,this.D_PlayerAnnotationsExpanded);}
	/** @private @arg {R_SubscribeButton} x */
	R_SubscribeButton(x) {this.H_("R_SubscribeButton","subscribeButtonRenderer",x,this.D_SubscribeButton);}
	/** @private @arg {R_MP_MenuNotificationSection} x */
	R_MP_MenuNotificationSection(x) {this.H_("D_NotificationMenu_PopupItem","multiPageMenuNotificationSectionRenderer",x,this.D_MP_MenuNotificationSection);}
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("SimpleMenuHeader","simpleMenuHeaderRenderer",x,this.D_SimpleMenuHeader);}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("R_SingleColumnMusicWatchNextResults","singleColumnMusicWatchNextResultsRenderer",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("R_Tabbed","tabbedRenderer",x,this.R_WatchNextTabbedResults);}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("R_WatchNextTabbedResults","watchNextTabbedResultsRenderer",x,this.D_WatchNextTabbedResults);}
	/** @private @arg {R_VoiceSearchDialog} x */
	R_VoiceSearchDialog(x) {this.H_("R_VoiceSearchDialog","voiceSearchDialogRenderer",x,this.D_VoiceSearchDialog);}
	/** @private @arg {R_CommentsHeader} x */
	R_CommentsHeader(x) {this.H_("R_VoiceSearchDialog","commentsHeaderRenderer",x,this.D_CommentsHeader);}
	/** @private @arg {R_CommentSimplebox} x */
	R_CommentSimplebox(x) {this.H_("R_CommentSimplebox","commentSimpleboxRenderer",x,this.D_CommentSimplebox);}
	/** @private @arg {R_SortFilterSubMenu} x */
	R_SortFilterSubMenu(x) {this.H_("R_SortFilterSubMenu","sortFilterSubMenuRenderer",x,this.D_SortFilterSubMenu);}
	/** @private @arg {R_DecoratedPlayerBar} x */
	R_DecoratedPlayerBar(x) {this.H_("R_DecoratedPlayerBar","decoratedPlayerBarRenderer",x,this.D_DecoratedPlayerBar);}
	/** @private @arg {R_AutoplaySwitchButton} x */
	R_AutoplaySwitchButton(x) {this.H_("R_AutoplaySwitchButton","autoplaySwitchButtonRenderer",x,this.D_AutoplaySwitchButton);}
	/** @private @arg {R_PlayerOverlayAutoplay} x */
	R_PlayerOverlayAutoplay(x) {this.H_("R_PlayerOverlayAutoplay","playerOverlayAutoplayRenderer",x,this.D_PlayerOverlayAutoplay);}
	/** @private @arg {R_WatchNextEndScreen} x */
	R_WatchNextEndScreen(x) {this.H_("R_WatchNextEndScreen","watchNextEndScreenRenderer",x,this.D_WatchNextEndScreen);}
	/** @private @arg {R_BrowserMediaSessionRenderer} x */
	R_BrowserMediaSession(x) {this.H_("R_BrowserMediaSession","browserMediaSessionRenderer",x,this.g);}
	/** @private @arg {R_SegmentedLikeDislikeButton} x */
	R_SegmentedLikeDislikeButton(x) {this.H_("R_SegmentedLikeDislikeButton","segmentedLikeDislikeButtonRenderer",x,this.D_SegmentedLikeDislikeButton);}
	/** @private @arg {R_MenuFlexibleItem} x */
	R_MenuFlexibleItem(x) {this.H_("R_MenuFlexibleItem","menuFlexibleItemRenderer",x,this.D_MenuFlexibleItem);}
	/** @private @arg {R_MenuServiceItem} x */
	R_MenuServiceItem(x) {this.H_("R_MenuServiceItem","menuServiceItemRenderer",x,this.RD_MenuServiceItem);}
	/** @private @arg {R_NotificationText} x */
	R_NotificationText(x) {this.H_("R_NotificationText","notificationTextRenderer",x,this.D_NotificationText);}
	/** @private @arg {R_ToggleMenuServiceItem} x */
	R_ToggleMenuServiceItem(x) {this.H_("R_ToggleMenuServiceItem","toggleMenuServiceItemRenderer",x,this.D_ToggleMenuServiceItem);}
	/** @private @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {this.H_("R_MenuNavigationItem","menuNavigationItemRenderer",x,this.D_MenuNavigationItem);}
	/** @private @arg {R_Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H_("R_Html5PlaybackOnesieConfig","html5PlaybackOnesieConfig",x,this.R_CommonConfig);}
	/** @private @arg {R_CommonConfig} x */
	R_CommonConfig(x) {this.H_("R_CommonConfig","commonConfig",x,this.D_CommonConfig);}
	/** @private @arg {D_CommonConfig} x */
	D_CommonConfig(x) {this.H_("D_CommonConfig","url",x,x => this.parser.parse_url("D_CommonConfig.url",x));}
	/** @private @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("R_VssLoggingContext","vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @private @arg {R_AdSlot} x */
	R_AdSlot(x) {this.H_("R_AdSlot","adSlotRenderer",x,this.D_AdSlot);}
	/** @private @arg {R_FulfilledLayout} x */
	R_FulfillmentLayout(x) {
		this.H_("R_FulfillmentLayout","fulfilledLayout",x,x => {
			let k=this.get_keys_of(x);
			switch(k[0]) {case "inFeedAdLayoutRenderer": case "pageTopAdLayoutRenderer": }
			if("inFeedAdLayoutRenderer" in x) return this.R_InFeedAdLayout(x);
			if("pageTopAdLayoutRenderer" in x) return this.R_PageTopAdLayout(x);
		});
	}
	/** @private @arg {R_InFeedAdLayout} x */
	R_InFeedAdLayout(x) {this.H_("R_InFeedAdLayout","inFeedAdLayoutRenderer",x,this.D_InFeedAdLayout);}
	/** @private @arg {R_DisplayAd} x */
	R_DisplayAd(x) {this.H_("R_DisplayAd","displayAdRenderer",x,this.D_DisplayAd);}
	/** @private @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {this.H_("R_ReelPlayerOverlay","reelPlayerOverlayRenderer",x,this.D_ReelPlayerOverlay);}
	/** @private @arg {R_ReelPlayerHeader} x */
	R_ReelPlayerHeader(x) {this.H_("R_ReelPlayerHeader","reelPlayerHeaderRenderer",x,this.D_ReelPlayerHeader);}
	/** @private @arg {R_PivotButton} x */
	R_PivotButton(x) {this.H_("R_PivotButton","pivotButtonRenderer",x,this.D_PivotButton);}
	/** @private @arg {R_EngagementPanelSectionList} x */
	R_EngagementPanelSectionList(x) {this.H_("R_EngagementPanelSectionList","engagementPanelSectionListRenderer",x,this.D_EngagementPanelSectionList);}
	/** @private @arg {R_ConfirmDialog} x */
	R_ConfirmDialog(x) {this.H_("R_ConfirmDialog","confirmDialogRenderer",x,this.D_ConfirmDialog);}
	/** @private @arg {R_AdsEngagementPanelContent} x */
	R_AdsEngagementPanelContent(x) {this.H_("R_AdsEngagementPanelContent","adsEngagementPanelContentRenderer",x,this.B_Hack);}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("R_Notification","notificationRenderer",x,this.D_Notification);}
	/** @private @arg {R_MusicCarouselShelf} x */
	R_MusicCarouselShelf(x) {this.H_("R_MusicCarouselShelf","musicCarouselShelfRenderer",x,this.D_MusicCarouselShelf);}
	/** @private @arg {R_MusicShelf} x */
	R_MusicShelf(x) {this.H_("R_MusicShelf","musicShelfRenderer",x,this.D_MusicShelf);}
	/** @private @arg {R_ContinuationItem} x */
	R_ContinuationItem(x) {this.H_("R_ContinuationItem","continuationItemRenderer",x,this.D_ContinuationItem);}
	/** @private @arg {R_GhostGrid} x */
	R_GhostGrid(x) {this.H_("R_GhostGrid","ghostGridRenderer",x,this.D_GhostGrid);}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {this.H_("R_GuideSubscriptionsSection","guideSubscriptionsSectionRenderer",x,this.D_GuideSubscriptionsSection);}
	/** @private @arg {R_GuideDownloadsEntry} x */
	R_GuideDownloadsEntry(x) {this.H_("R_GuideDownloadsEntry","guideDownloadsEntryRenderer",x,this.D_GuideDownloadsEntry);}
	/** @private @arg {R_GuideCollapsibleEntry} x */
	R_GuideCollapsibleEntry(x) {this.H_("R_GuideCollapsibleEntry","guideCollapsibleEntryRenderer",x,this.D_GuideCollapsibleEntry);}
	/** @private @arg {R_GuideEntryData} x */
	R_GuideEntryData(x) {this.H_("R_GuideEntryData","guideEntryData",x,this.D_GuideEntryData);}
	/** @private @arg {R_GuideCollapsibleSectionEntry} x */
	R_GuideCollapsibleSectionEntry(x) {this.H_("R_GuideCollapsibleSectionEntry","guideCollapsibleSectionEntryRenderer",x,this.D_GuideCollapsibleSectionEntry);}
	/** @private @arg {R_GuideEntry} x */
	R_GuideEntry(x) {this.H_("R_GuideEntry","guideEntryRenderer",x,this.D_GuideEntry);}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H_("R_GuideSection","guideSectionRenderer",x,this.D_GuideSection);}
	/** @private @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {this.H_("R_PlaylistPanelVideo","playlistPanelVideoRenderer",x,this.D_PlaylistPanelVideo);}
	/** @private @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("R_C4TabbedHeader","c4TabbedHeaderRenderer",x,this.D_C4TabbedHeader);}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("FeedTabbedHeader","feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @private @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {this.H_("R_FeedFilterChipBar","feedFilterChipBarRenderer",x,this.D_FeedFilterChipBar);}
	/** @private @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {this.H_("R_TwoColumnBrowseResults","twoColumnBrowseResultsRenderer",x,this.D_TwoColumnBrowseResults);}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("R_AddToPlaylist","addToPlaylistRenderer",x,this.D_AddToPlaylist);}
	/** @private @arg {R_Comment} x */
	R_Comment(x) {this.H_("Comment","commentRenderer",x,this.D_Comment);}
	/** @private @arg {R_ElementUpdate} x */
	R_ElementUpdate(x) {this.H_("ElementUpdate","updates",x,x => this.z(x,this.D_ElementUpdate));}
	/** @private @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H_("TemplateUpdate","templateUpdate",x,this.D_TemplateUpdate);}
	/** @private @arg {R_ProfileColumn} x */
	R_ProfileColumn(x) {this.H_("ProfileColumn","profileColumnRenderer",x,this.D_ProfileColumn);}
	/** @private @arg {R_BrowseFeedActions} x */
	R_BrowseFeedActions(x) {this.H_("BrowseFeedActions","browseFeedActionsRenderer",x,this.D_BrowseFeedActions);}
	/** @private @arg {R_WebSearchboxConfig} x */
	R_WebSearchboxConfig(x) {this.H_("SearchboxConfig","webSearchboxConfig",x,this.D_WebSearchboxConfig);}
	/** @private @arg {R_CompactVideo} x */
	R_CompactVideo(x) {this.H_("R_CompactVideo","compactVideoRenderer",x,this.D_CompactVideo);}
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("Transcript","transcriptRenderer",x,this.D_Transcript);}
	/** @private @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H_("ChipCloudChip","chipCloudChipRenderer",x,this.D_ChipCloudChip);}
	/** @private @arg {R_PrefetchHintConfig} x */
	R_PrefetchHintConfig(x) {this.H_("R_PrefetchHintConfig","prefetchHintConfig",x,this.D_PrefetchHintConfig);}
	/** @private @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("R_ResourceStatusInResponseCheck","resourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("R_MusicThumbnail","musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {R_LiveChat} x */
	R_LiveChat(x) {this.H_("R_LiveChat","liveChatRenderer",x,this.g);}
	/** @private @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("R_ReportFormModal","reportFormModalRenderer",x,this.g);}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	R_WatchEndpointMusicConfig(x) {this.H_("R_WatchEndpointMusicConfig","watchEndpointMusicConfig",x,this.D_WatchEndpointMusicConfig);}
	/** @private @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("R_PlaylistHeader","playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @private @arg {R_StructuredDescriptionContent} x */
	R_StructuredDescriptionContent(x) {this.H_("R_StructuredDescriptionContent","structuredDescriptionContentRenderer",x,this.D_StructuredDescriptionContent);}
	/** @private @arg {R_ProductList} x */
	R_ProductList(x) {this.H_("R_ProductList","productListRenderer",x,this.D_ProductList);}
	/** @private @arg {R_ClipSection} x */
	R_ClipSection(x) {this.H_("R_ClipSection","clipSectionRenderer",x,this.D_ClipSection);}
	/** @private @arg {R_ClipCreation} x */
	R_ClipCreation(x) {this.H_("C_RunAttestation","clipCreationRenderer",x,this.D_ClipCreation);}
	/** @private @arg {R_MacroMarkersList} x */
	R_MacroMarkersList(x) {this.H_("R_MacroMarkersList","macroMarkersListRenderer",x,this.D_MacroMarkersList);}
	/** @private @arg {R_EngagementPanelTitleHeader} x */
	R_EngagementPanelTitleHeader(x) {this.H_("R_EngagementPanelTitleHeader","engagementPanelTitleHeaderRenderer",x,this.D_EngagementPanelTitleHeader);}
	static {this.prototype.R_Hint;}
	/** @private @arg {R_Hint} x */
	R_Hint(x) {this.H_("R_Hint","hintRenderer",x,this.D_Hint);}
	/** @private @arg {R_VideoViewCount} x */
	R_VideoViewCount(x) {this.H_("R_VideoViewCount","videoViewCountRenderer",x,this.D_VideoViewCount);}
	/** @private @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("R_TwoColumnSearchResults","twoColumnSearchResultsRenderer",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {this.H_("R_PlaylistSidebarSecondaryInfo","playlistSidebarSecondaryInfoRenderer",x,this.D_PlaylistSidebarSecondaryInfo);}
	/** @private @arg {R_LikeButton} x */
	R_LikeButton(x) {this.H_("R_LikeButton","likeButtonRenderer",x,this.D_LikeButton);}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("R_TranscriptSearchPanel","transcriptSearchPanelRenderer",x,this.D_TranscriptSearchPanel);}
	/** @private @arg {D_StructuredDescriptionContent} x */
	D_StructuredDescriptionContent(x) {this.H_("D_StructuredDescriptionContent","items",x,x => this.z(x,this.G_StructuredDescriptionContentItem));}
	/** @private @arg {D_ClipSection} x */
	D_ClipSection(x) {this.H_("D_ClipSection","contents",x,x => this.z(x,this.R_ClipCreation));}
	/** @private @arg {R_CompactPlaylist} x */
	R_CompactPlaylist(x) {this.H_("R_CompactPlaylist","compactPlaylistRenderer",x,this.D_CompactPlaylist);}
	/** @private @arg {R_CompactRadio} x */
	R_CompactRadio(x) {this.H_("R_CompactRadio","compactRadioRenderer",x,this.D_CompactRadio);}
	/** @private @arg {R_RelatedChipCloud} x */
	R_RelatedChipCloud(x) {this.H_("R_RelatedChipCloud","relatedChipCloudRenderer",x,this.D_RelatedChipCloud);}
	/** @private @arg {R_ChipCloud} x */
	R_ChipCloud(x) {this.H_("R_ChipCloud","chipCloudRenderer",x,this.D_ChipCloud);}
	/** @private @arg {R_ProfileColumnStats} x */
	R_ProfileColumnStats(x) {this.H_("R_ProfileColumnStats","profileColumnStatsRenderer",x,this.D_ProfileColumnStats);}
	/** @private @arg {D_ProfileColumnStats} x */
	D_ProfileColumnStats(x) {this.H_("D_ProfileColumnStats","items",x,x => this.z(x,this.R_ProfileColumnStatsEntry));}
	/** @private @arg {R_ProfileColumnStatsEntry} x */
	R_ProfileColumnStatsEntry(x) {this.H_("R_ProfileColumnStatsEntry","profileColumnStatsEntryRenderer",x,this.D_ProfileColumnStatsEntry);}
	/** @private @arg {R_ProfileColumnUserInfo} x */
	R_ProfileColumnUserInfo(x) {this.H_("R_ProfileColumnUserInfo","profileColumnUserInfoRenderer",x,this.D_ProfileColumnUserInfo);}
	/** @private @arg {D_BrowseFeedActions} x */
	D_BrowseFeedActions(x) {this.H_("D_BrowseFeedActions","contents",x,x => this.z(x,this.G_BrowseFeedContent));}
	/** @private @arg {R_SearchBox} x */
	R_SearchBox(x) {this.H_("D_ProfileColumn","searchBoxRenderer",x,this.D_SearchBox);}
	/** @private @arg {R_SubFeedSelector} x */
	R_SubFeedSelector(x) {this.H_("R_SubFeedSelector","subFeedSelectorRenderer",x,this.D_SubFeedSelector);}
	/** @private @arg {R_SubFeedOption} x */
	R_SubFeedOption(x) {this.H_("R_SubFeedOption","subFeedOptionRenderer",x,this.D_SubFeedOption);}
	/** @private @arg {R_Channel_MD} x */
	R_Channel_MD(x) {this.H_("R_Channel_MD","channelMetadataRenderer",x,this.D_Channel_MD);}
	/** @private @arg {R_Playlist_MD} x */
	R_Playlist_MD(x) {this.H_("R_Playlist_MD","playlistMetadataRenderer",x,this.D_Playlist_MD);}
	/** @private @arg {R_AlertWithButton} x */
	R_AlertWithButton(x) {this.H_("R_AlertWithButton","alertWithButtonRenderer",x,this.D_AlertWithButton);}
	/** @private @arg {R_ChannelSwitcherPage} x */
	R_ChannelSwitcherPage(x) {this.H_("R_ChannelSwitcherPage","channelSwitcherPageRenderer",x,this.D_ChannelSwitcherPage);}
	/** @private @arg {R_MerchandiseShelf} x */
	R_MerchandiseShelf(x) {this.H_("R_MerchandiseShelf","merchandiseShelfRenderer",x,this.D_MerchandiseShelf);}
	/** @private @arg {R_VideoPrimaryInfo} x */
	R_VideoPrimaryInfo(x) {this.H_("R_VideoPrimaryInfo","videoPrimaryInfoRenderer",x,this.D_VideoPrimaryInfo);}
	/** @private @arg {R_VideoSecondaryInfo} x */
	R_VideoSecondaryInfo(x) {this.H_("R_VideoSecondaryInfo","videoSecondaryInfoRenderer",x,this.D_VideoSecondaryInfo);}
	/** @private @arg {R_TopbarMenuButton} x */
	R_TopbarMenuButton(x) {this.H_("R_TopbarMenuButton","topbarMenuButtonRenderer",x,this.D_TopbarMenuButton);}
	/** @private @arg {R_NotificationTopbarButton} x */
	R_NotificationTopbarButton(x) {this.H_("R_NotificationTopbarButton","notificationTopbarButtonRenderer",x,this.D_NotificationTopbarButton);}
	/** @private @arg {R_CommentsEntryPointHeader} x */
	R_CommentsEntryPointHeader(x) {this.H_("R_CommentsEntryPointHeader","commentsEntryPointHeaderRenderer",x,this.D_CommentsEntryPointHeader);}
	/** @private @arg {R_CommentsEntryPointTeaser} x */
	R_CommentsEntryPointTeaser(x) {this.H_("R_CommentsEntryPointTeaser","commentsEntryPointTeaserRenderer",x,this.D_CommentsEntryPointTeaser);}
	/** @private @arg {R_SectionList} x */
	R_SectionList(x) {this.H_("R_SectionList","sectionListRenderer",x,this.GD_RC_SectionList);}
	/** @private @arg {R_EndScreenPlaylist} x */
	R_EndScreenPlaylist(x) {this.H_("R_EndScreenPlaylist","endScreenPlaylistRenderer",x,this.D_EndScreenPlaylist);}
	/** @private @arg {R_EndScreenVideo} x */
	R_EndScreenVideo(x) {this.H_("R_EndScreenVideo","endScreenVideoRenderer",x,this.D_EndScreenVideo);}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("R_AddToPlaylistCreate","addToPlaylistCreateRenderer",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("R_PlaylistAddToOption","playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {R_VideoDescriptionMusicSection} x */
	R_VideoDescriptionMusicSection(x) {this.H_("R_VideoDescriptionMusicSection","videoDescriptionMusicSectionRenderer",x,this.D_VideoDescriptionMusicSection);}
	/** @private @arg {R_VideoDescriptionHeader} x */
	R_VideoDescriptionHeader(x) {this.H_("R_VideoDescriptionHeader","videoDescriptionHeaderRenderer",x,this.D_VideoDescriptionHeader);}
	/** @private @arg {R_HorizontalCardList} x */
	R_HorizontalCardList(x) {this.H_("R_HorizontalCardList","horizontalCardListRenderer",x,this.D_HorizontalCardList);}
	/** @private @arg {R_ExpandableVideoDescriptionBody} x */
	R_ExpandableVideoDescriptionBody(x) {this.H_("R_ExpandableVideoDescriptionBody","expandableVideoDescriptionBodyRenderer",x,this.D_ExpandableVideoDescriptionBody);}
	/** @private @arg {R_SubscriptionNotificationToggleButton} x */
	R_SubscriptionNotificationToggleButton(x) {this.H_("R_SubscriptionNotificationToggleButton","subscriptionNotificationToggleButtonRenderer",x,this.D_SubscriptionNotificationToggleButton);}
	/** @private @arg {R_CommentActionButtons} x */
	R_CommentActionButtons(x) {this.H_("R_CommentActionButtons","commentActionButtonsRenderer",x,this.g);}
	/** @private @arg {R_HeroPlaylistThumbnail} x */
	R_HeroPlaylistThumbnail(x) {this.H_("R_HeroPlaylistThumbnail","heroPlaylistThumbnailRenderer",x,this.D_HeroPlaylistThumbnail);}
	/** @private @arg {R_PlaylistByline} x */
	R_PlaylistByline(x) {this.H_("R_PlaylistByline","playlistBylineRenderer",x,this.D_PlaylistByline);}
	/** @private @arg {R_ProductListItem} x */
	R_ProductListItem(x) {this.H_("R_ProductListItem","productListItemRenderer",x,this.D_ProductListItem);}
	/** @private @arg {R_ClipCreationTextInput} x */
	R_ClipCreationTextInput(x) {this.H_("R_ClipCreationTextInput","clipCreationTextInputRenderer",x,this.D_ClipCreationTextInput);}
	/** @private @arg {R_ClipAdState} x */
	R_ClipAdState(x) {this.H_("R_ClipAdState","clipAdStateRenderer",x,this.D_ClipAdState);}
	/** @private @arg {R_ClipCreationScrubber} x */
	R_ClipCreationScrubber(x) {this.H_("R_ClipCreationScrubber","clipCreationScrubberRenderer",x,this.D_ClipCreationScrubber);}
	/** @private @arg {R_TranscriptSegmentList} x */
	R_TranscriptSegmentList(x) {this.H_("R_TranscriptSegmentList","transcriptSegmentListRenderer",x,this.D_TranscriptSegmentList);}
	/** @private @arg {R_TranscriptFooter} x */
	R_TranscriptFooter(x) {this.H_("R_TranscriptFooter","transcriptFooterRenderer",x,this.D_TranscriptFooter);}
	/** @private @arg {D_TranscriptFooter} x */
	D_TranscriptFooter(x) {this.H_("D_TranscriptFooter","languageMenu",x,this.R_SortFilterSubMenu);}
	/** @private @arg {R_PlaylistVideoThumbnail} x */
	R_PlaylistVideoThumbnail(x) {this.H_("R_PlaylistVideoThumbnail","playlistVideoThumbnailRenderer",x,this.D_PlaylistVideoThumbnail);}
	/** @private @arg {R_Message} x */
	R_Message(x) {this.H_("R_Message","messageRenderer",x,this.g);}
	/** @private @arg {R_LiveChatParticipantsList} x */
	R_LiveChatParticipantsList(x) {this.H_("R_LiveChatParticipantsList","liveChatParticipantsListRenderer",x,this.g);}
	/** @private @arg {R_LiveChatTicker} x */
	R_LiveChatTicker(x) {this.H_("R_LiveChatTicker","liveChatTickerRenderer",x,this.g);}
	/** @private @arg {R_LiveChatItemList} x */
	R_LiveChatItemList(x) {this.H_("R_LiveChatItemList","liveChatItemListRenderer",x,this.g);}
	/** @private @arg {R_LiveChatHeader} x */
	R_LiveChatHeader(x) {this.H_("R_LiveChatHeader","liveChatHeaderRenderer",x,this.g);}
	/** @private @arg {R_LiveChatMessageInput} x */
	R_LiveChatMessageInput(x) {this.H_("R_LiveChatMessageInput","liveChatMessageInputRenderer",x,this.g);}
	/** @private @arg {R_EmojiPicker} x */
	R_EmojiPicker(x) {this.H_("R_EmojiPicker","emojiPickerRenderer",x,this.g);}
	/** @private @arg {R_ChannelHeaderLinks} x */
	R_ChannelHeaderLinks(x) {this.H_("R_ChannelHeaderLinks","channelHeaderLinksRenderer",x,this.D_ChannelHeaderLinks);}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("R_ChannelSwitcherHeader","channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @private @arg {R_MerchandiseItem} x */
	R_MerchandiseItem(x) {this.H_("R_MerchandiseItem","merchandiseItemRenderer",x,this.D_MerchandiseItem);}
	/** @private @arg {R_VideoOwner} x */
	R_VideoOwner(x) {this.H_("R_VideoOwner","videoOwnerRenderer",x,this.D_VideoOwner);}
	/** @private @arg {R_MusicResponsiveListItem} x */
	R_MusicResponsiveListItem(x) {this.H_("R_MusicResponsiveListItem","musicResponsiveListItemRenderer",x,this.g);}
	/** @private @arg {R_MusicShelfDivider} x */
	R_MusicShelfDivider(x) {this.H_("R_MusicShelfDivider","musicShelfDividerRenderer",x,this.g);}
	/** @private @arg {R_ThumbnailOverlayInlineUnplayable} x */
	R_ThumbnailOverlayInlineUnplayable(x) {this.H_("R_ThumbnailOverlayInlineUnplayable","thumbnailOverlayInlineUnplayableRenderer",x,this.D_ThumbnailOverlayInlineUnplayable);}
	/** @private @arg {R_ThumbnailOverlayEndorsement} x */
	R_ThumbnailOverlayEndorsement(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayEndorsementRenderer",x,this.D_ThumbnailOverlayEndorsement);}
	/** @private @arg {R_ThumbnailOverlayHoverText} x */
	R_ThumbnailOverlayHoverText(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayHoverTextRenderer",x,this.D_ThumbnailOverlayHoverText);}
	/** @private @arg {R_ThumbnailOverlaySidePanel} x */
	R_ThumbnailOverlaySidePanel(x) {this.H_("R_ThumbnailOverlaySidePanel","thumbnailOverlaySidePanelRenderer",x,this.D_ThumbnailOverlaySidePanel);}
	/** @private @arg {R_ThumbnailOverlayBottomPanel} x */
	R_ThumbnailOverlayBottomPanel(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayBottomPanelRenderer",x,this.D_ThumbnailOverlayBottomPanel);}
	/** @private @arg {R_ThumbnailOverlayNowPlaying} x */
	R_ThumbnailOverlayNowPlaying(x) {this.H_("R_ThumbnailOverlayNowPlaying","thumbnailOverlayNowPlayingRenderer",x,this.D_ThumbnailOverlayNowPlaying);}
	/** @private @arg {R_ThumbnailOverlayToggleButton} x */
	R_ThumbnailOverlayToggleButton(x) {this.H_("R_ThumbnailOverlayToggleButton","thumbnailOverlayToggleButtonRenderer",x,this.D_ThumbnailOverlayToggleButton);}
	/** @private @arg {R_ThumbnailOverlayResumePlayback} x */
	R_ThumbnailOverlayResumePlayback(x) {this.H_("R_ThumbnailOverlayResumePlayback","thumbnailOverlayResumePlaybackRenderer",x,this.D_ThumbnailOverlayResumePlayback);}
	/** @private @arg {R_ThumbnailOverlayTimeStatus} x */
	R_ThumbnailOverlayTimeStatus(x) {this.H_("R_ThumbnailOverlayTimeStatus","thumbnailOverlayTimeStatusRenderer",x,this.D_ThumbnailOverlayTimeStatus);}
	/** @private @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("R_TextInputFormField","textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("R_Dropdown","dropdownRenderer",x,this.D_Dropdown);}
	/** @private @arg {R_TopicLink} x */
	R_TopicLink(x) {this.H_("R_TopicLink","topicLinkRenderer",x,this.D_TopicLink);}
	/** @private @arg {R_CarouselLockup} x */
	R_CarouselLockup(x) {this.H_("R_CarouselLockup","carouselLockupRenderer",x,this.D_CarouselLockup);}
	/** @private @arg {R_RichListHeader} x */
	R_RichListHeader(x) {this.H_("R_RichListHeader","richListHeaderRenderer",x,this.D_RichListHeader);}
	/** @private @arg {R_MacroMarkersListItem} x */
	R_MacroMarkersListItem(x) {this.H_("R_MacroMarkersListItem","macroMarkersListItemRenderer",x,this.D_MacroMarkersListItem);}
	/** @private @arg {R_PdgCommentOption} x */
	R_PdgCommentOption(x) {this.H_("R_PdgCommentOption","pdgCommentOptionRenderer",x,this.D_PdgCommentOption);}
	/** @arg {R_RichSection} x */
	R_RichSection(x) {this.H_("R_RichSection","richSectionRenderer",x,this.D_RichSection);}
	/** @arg {R_RichShelf} x */
	R_RichShelf(x) {this.H_("R_RichShelf","richShelfRenderer",x,this.D_RichShelf);}
	/** @arg {R_InlineSurvey} x */
	R_InlineSurvey(x) {this.H_("R_InlineSurvey","inlineSurveyRenderer",x,this.D_InlineSurvey);}
	/** @arg {R_SourcePivotHeader} x */
	R_SourcePivotHeader(x) {this.H_("R_SourcePivotHeader","sourcePivotHeaderRenderer",x,this.D_SourcePivotHeader);}
	/** @arg {R_ProfilePageHeaderInformationViewModel} x */
	R_ProfilePageHeaderInformationViewModel(x) {this.H_("R_ProfilePageHeaderInformationViewModel","profilePageHeaderInformationViewModel",x,this.D_ProfilePageHeaderInformation);}
	/** @arg {R_ProfilePageHeaderTitleViewModel} x */
	R_ProfilePageHeaderTitleViewModel(x) {this.H_("R_ProfilePageHeaderTitleViewModel","profilePageHeaderTitleViewModel",x,this.D_ProfilePageHeaderTitle);}
	/** @private @arg {R_Factoid} x */
	R_Factoid(x) {const cf="R_Factoid"; this.H_(cf,"factoidRenderer",x,this.D_Factoid);}
	/** @private @arg {R_PlaylistPanel} x */
	R_PlaylistPanel(x) {this.H_("R_PlaylistPanel","playlistPanelRenderer",x,this.D_PlaylistPanel);}
	/** @arg {R_RatingSurveyOption} x */
	R_RatingSurveyOption(x) {this.H_("R_RatingSurveyOption","ratingSurveyOptionRenderer",x,this.D_RatingSurveyOption);}
	/** @arg {R_ProfilePageHeaderThumbnailViewModel} x */
	R_ProfilePageHeaderThumbnailViewModel(x) {this.H_("R_ProfilePageHeaderThumbnailViewModel","profilePageHeaderThumbnailViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderMetadataViewModel} x */
	R_ProfilePageHeaderMetadataViewModel(x) {this.H_("R_ProfilePageHeaderMetadataViewModel","profilePageHeaderMetadataViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderButtonRowViewModel} x */
	R_ProfilePageHeaderButtonRowViewModel(x) {this.H_("R_ProfilePageHeaderButtonRowViewModel","profilePageHeaderButtonRowViewModel",x,this.g);}
	/** @arg {R_ExpandableSurveyResponse} x */
	R_ExpandableSurveyResponse(x) {this.H_("R_ExpandableSurveyResponse","expandableSurveyResponseRenderer",x,this.D_ExpandableSurveyResponse);}
	/** @arg {R_RatingSurvey} x */
	R_RatingSurvey(x) {this.H_("R_RatingSurvey","ratingSurveyRenderer",x,this.D_RatingSurvey);}
	/** @arg {R_PageTopAdLayout} x */
	R_PageTopAdLayout(x) {this.H_("R_PageTopAdLayout","pageTopAdLayoutRenderer",x,this.D_PageTopAdLayout);}
	/** @arg {R_AutomixPreviewVideo} x */
	R_AutomixPreviewVideo(x) {this.H_("R_AutomixPreviewVideo","automixPreviewVideoRenderer",x,this.g);}
	/** @arg {R_VideoMastheadAdV3} x */
	R_VideoMastheadAdV3(x) {this.H_("R_VideoMastheadAdV3","videoMastheadAdV3Renderer",x,this.g);}
	/** @private @arg {R_RichMetadata} x */
	R_RichMetadata(x) {this.H_("R_RichMetadata","richMetadataRenderer",x,this.D_RichMetadata);}
	/** @private @arg {R_RichMetadataRow} x */
	R_RichMetadataRow(x) {this.H_("R_RichMetadataRow","richMetadataRowRenderer",x,this.D_RichMetadataRow);}
	/** @private @arg {R_TranscriptSegment} x */
	R_TranscriptSegment(x) {this.H_("R_TranscriptSegment","transcriptSegmentRenderer",x,this.D_TranscriptSegment);}
	/** @private @arg {R_PdgCommentChip} x */
	R_PdgCommentChip(x) {this.H_("R_PdgCommentChip","pdgCommentChipRenderer",x,this.D_PdgCommentChip);}
	/** @private @arg {R_InfoRow} x */
	R_InfoRow(x) {this.H_("R_InfoRow","infoRowRenderer",x,this.D_InfoRow);}
	/** @private @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("R_PrivacyDropdownItem","privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
	/** @private @arg {R_PromotedSparklesWeb} x */
	R_PromotedSparklesWeb(x) {this.H_("R_PromotedSparklesWeb","promotedSparklesWebRenderer",x,this.D_PromotedSparklesWeb);}
	/** @private @arg {R_PlaylistLoopButtonState} x */
	R_PlaylistLoopButtonState(x) {this.H_("R_PlaylistLoopButtonState","playlistLoopButtonStateRenderer",x,this.D_PlaylistLoopButtonState);}
	/** @private @arg {R_PlaylistLoopButton} x */
	R_PlaylistLoopButton(x) {this.H_("R_PlaylistLoopButton","playlistLoopButtonRenderer",x,this.D_PlaylistLoopButton);}
	/** @private @arg {R_Miniplayer} x */
	R_Miniplayer(x) {this.H_("R_Miniplayer","miniplayerRenderer",x,this.D_Miniplayer);}
	/** @private @arg {R_DesktopWatchAds} x */
	R_DesktopWatchAds(x) {this.H_("R_DesktopWatchAds","playerLegacyDesktopWatchAdsRenderer",x,this.D_DesktopWatchAds);}
	/** @private @arg {R_PlayerCaptionsTracklist} x */
	R_PlayerCaptionsTracklist(x) {this.H_("R_Miniplayer","playerCaptionsTracklistRenderer",x,this.D_PlayerCaptionsTracklist);}
	/** @private @arg {R_VideoQualityPromo} x */
	R_VideoQualityPromo(x) {this.H_("R_Miniplayer","videoQualityPromoRenderer",x,this.D_VideoQualityPromo);}
	/** @private @arg {R_PlayerAttestation} x */
	R_PlayerAttestation(x) {this.H_("R_Miniplayer","playerAttestationRenderer",x,this.D_PlayerAttestation);}
	/** @private @arg {R_CardCollection} x */
	R_CardCollection(x) {this.H_("R_Miniplayer","cardCollectionRenderer",x,this.D_CardCollection);}
	/** @private @arg {R_PlayerMicroformat} x */
	R_PlayerMicroformat(x) {this.H_("R_Miniplayer","playerMicroformatRenderer",x,this.D_PlayerMicroformat);}
	/** @private @arg {R_AdPlacement} x */
	R_AdPlacement(x) {this.H_("R_Miniplayer","adPlacementRenderer",x,this.D_AdPlacement);}
	/** @private @arg {R_TextHeader} x */
	R_TextHeader(x) {this.H_("R_TextHeader","textHeaderRenderer",x,this.D_TextHeader);}
	/** @private @arg {R_UnifiedSharePanel} x */
	R_UnifiedSharePanel(x) {this.H_("R_UnifiedSharePanel","unifiedSharePanelRenderer",x,this.D_UnifiedSharePanel);}
	/** @private @arg {R_Card} x */
	R_Card(x) {this.H_("R_Card","cardRenderer",x,this.D_Card);}
	/** @private @arg {R_SimpleCardTeaser} x */
	R_SimpleCardTeaser(x) {this.H_("R_Card","simpleCardTeaserRenderer",x,this.D_SimpleCardTeaser);}
	/** @private @arg {RA_NotificationAction} x */
	RA_NotificationAction(x) {this.H_("RA_NotificationAction","notificationActionRenderer",x,this.AD_Notification);}
	/** @private @arg {RMD_RowContainer} x */
	RMD_RowContainer(x) {this.H_("RMD_RowContainer","metadataRowContainerRenderer",x,this.DMD_RowContainer);}
	/** @private @arg {RMD_Badge} x */
	RMD_Badge(x) {this.H_("RMD_Badge","metadataBadgeRenderer",x,this.DMD_Badge);}
	/** @private @arg {CD_TimedContinuation} x */
	CD_TimedContinuation(x) {this.H_("CD_TimedContinuation","timedContinuationData",x,this.DC_Timed);}
	/** @private @arg {CD_Reload} x */
	CD_Reload(x) {
		this.y("CD_Reload","reloadContinuationData",x,
			x => this.DC_Generic_CTP("D_CD_Reload","reload.continuation",x));
	}
	/** @private @arg {CD_NextRadio} x */
	CD_NextRadio(x) {
		this.y("CD_NextRadio","nextRadioContinuationData",x,
			x => this.DC_Generic_CTP("D_CD_NextRadio","next_radio.continuation",x));
	}
	/** @private @arg {AU_SubscribeButton} x */
	AU_SubscribeButton(x) {this.H_("UA_SubscribeButton","updateSubscribeButtonAction",x,this.AD_SubscribeButton);}
	/** @private @arg {AU_ChannelSwitcherPage} x */
	AU_ChannelSwitcherPage(x) {this.H_("UA_ChannelSwitcherPage","updateChannelSwitcherPageAction",x,this.AD_UpdateChannelSwitcherPage);}
	/** @private @arg {AD_GetMultiPageMenu} x */
	AD_GetMultiPageMenu(x) {this.H_("AD_GetMultiPageMenu","menu",x,x => this.TR_MultiPageMenu("TR_MultiPageMenu_Empty",x));}
	/** @private @arg {AD_Signal} x */
	AD_Signal(x) {
		const cf="AD_Signal"; this.k(cf,x);
		const {signal,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(signal) {
			default: debugger; break;
			case "ENABLE_CHROME_NOTIFICATIONS": case "HELP": case "HISTORY_BACK": case "HISTORY_FORWARD": case "SKIP_NAVIGATION": case "TOGGLE_TRANSCRIPT_TIMESTAMPS":
		}
	}
	/** @private @arg {AD_AppendContinuationItems} x */
	AD_AppendContinuationItems(x) {
		const cf="AD_AppendContinuationItems"; this.targetId(cf,x.targetId); this.k(cf,x);
		if(this.starts_with_targetId(x,"comment-replies-item-")) return this.CommentRepliesItem(x);
		this.save_string("[ContinuationItem.targetId]",x.targetId);
		switch(x.targetId) {
			case "browse-feedFEwhat_to_watch": this.A_BrowseFeed(x); break;
			case "comments-section": this.A_CommentsSectionContinuation$(x); break;
			case "watch-next-feed": this.A_WatchNext(x); break;
			default: x===0; debugger;
		}
	}
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.H_("C_RunAttestation","runAttestationCommand",x,this.D_RunAttestation);}
	/** @arg {C_Innertube} x */
	C_Innertube(x) {this.H_("C_Innertube","innertubeCommand",x,this.E_YpcGetOfflineUpsell);}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",x); this.g(y); this.g(a);}
	/** @private @arg {C_CommandExecutor} x */
	C_CommandExecutor(x) {let [a,b]=this.TE_Endpoint_2("C_CommandExecutor","commandExecutorCommand",x); this.g(b); this.DC_CommandExecutor(a);}
	/** @private @arg {C_Continuation} x */
	C_Continuation(x) {
		const [a,b,y]=this.TE_Endpoint_Opt_3("C_Continuation","continuationCommand",x); this.g(y);
		this.t(a,this.M_Next);
		this.DC_Continuation(b);
	}
	/** @private @arg {C_GetSurvey} x */
	C_GetSurvey(x) {
		const cf="C_GetSurvey"; this.k(cf,x);
		const {clickTrackingParams: a,commandMetadata: b,getSurveyCommand: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,a);
		this.DC_GetSurvey(c);
		const {apiUrl,sendPost,...y1}=this.unpack_T_WCM("MG_Survey_CMD",b); this.g(y1);
		if(apiUrl!=="/youtubei/v1/get_survey") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {C_AdsControlFlowOpportunityReceived} x */
	C_AdsControlFlowOpportunityReceived(x) {
		const cf="C_AdsControlFlowOpportunityReceived"; this.k(cf,x);
		const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_AdsControlFlowOpportunityReceived(adsControlFlowOpportunityReceivedCommand);
	}
	/** @private @arg {C_ScrollToEngagementPanel} x */
	C_ScrollToEngagementPanel(x) {
		const cf="C_ScrollToEngagementPanel"; this.k(cf,x);
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @private @arg {C_AddToPlaylist} x */
	C_AddToPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_AddToPlaylist","addToPlaylistCommand",x); this.g(y); this.DC_AddToPlaylist(a);}
	/** @private @arg {C_ReloadContinuationItems} x */
	C_ReloadContinuationItems(x) {
		const cf="C_ReloadContinuationItems"; this.k(cf,x);
		const {clickTrackingParams,reloadContinuationItemsCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ReloadContinuationItems(reloadContinuationItemsCommand);
	}
	/** @private @arg {C_ShowReloadUi} x */
	C_ShowReloadUi(x) {
		const cf="C_ShowReloadUi"; this.k(cf,x);
		const {clickTrackingParams,showReloadUiCommand: a,...y}=this.s(cf,x); this.g(y);//#destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ShowReloadUi(a);
	}
	/** @private @arg {C_Executor} x */
	C_Executor(x) {
		const cf="C_Executor"; this.k(cf,x);
		const {clickTrackingParams,commandExecutorCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_Executor(commandExecutorCommand);
	}
	/** @private @arg {C_UpdateToggleButtonState} x */
	C_UpdateToggleButtonState(x) {let [a,b]=this.TE_Endpoint_2("C_UpdateToggleButtonState","updateToggleButtonStateCommand",x); this.g(b); this.DC_UpdateToggleButtonState(a);}
	/** @private @arg {C_Loop} x */
	C_Loop(x) {let [a,b]=this.TE_Endpoint_2("C_Loop","loopCommand",x); this.g(b); this.DC_Loop(a);}
	/** @private @arg {C_RelatedChip} x */
	C_RelatedChip(x) {let [a,y]=this.TE_Endpoint_2("C_RelatedChip","relatedChipCommand",x); this.g(y); this.DC_RelatedChip(a);}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.g(a);}
	/** @private @arg {C_RepeatChapter} x */
	C_RepeatChapter(x) {let [a,y]=this.TE_Endpoint_2("C_RepeatChapter","repeatChapterCommand",x); this.g(y); this.DC_RepeatChapter(a);}
	/** @arg {C_FollowUp} x */
	C_FollowUp(x) {let [a,y]=this.TE_Endpoint_2("C_FollowUp","addFollowUpSurveyCommand",x); this.g(y); this.DC_AddFollowUpSurvey(a);}
	/** @private @arg {C_EntityUpdate} x */
	C_EntityUpdate(x) {let [a,y]=this.TE_Endpoint_2("C_EntityUpdate","entityUpdateCommand",x); this.g(y); this.DC_EntityBatchUpdate(a);}
	/** @private @arg {C_EngagementPanelHeaderShowNavigationButton} x */
	C_EngagementPanelHeaderShowNavigationButton(x) {
		let [a,y]=this.TE_Endpoint_2("C_EngagementPanelHeaderShowNavigationButton","engagementPanelHeaderShowNavigationButtonCommand",x); this.g(y);
		this.DC_EngagementPanelHeaderShowNavigationButton(a);
	}
	/** @protected @arg {C_GetPdgBuyFlow} x */
	C_GetPdgBuyFlow(x) {let [a,b,y]=this.TE_Endpoint_3("C_GetPdgBuyFlow","getPdgBuyFlowCommand",x); this.g(y); this.M_GetPdgBuyFlow(a); this.DC_GetPdgBuyFlow(b);}
	/** @private @arg {C_ShowReelsCommentsOverlay} x */
	C_ShowReelsCommentsOverlay(x) {let [a,y]=this.TE_Endpoint_2("C_ShowReelsCommentsOverlay","showReelsCommentsOverlayCommand",x); this.g(y); this.DC_ShowReelsCommentsOverlay(a);}
	/** @private @arg {DC_RepeatChapter} x */
	DC_RepeatChapter(x) {x;}
	/** @private @arg {DC_AddFollowUpSurvey} x */
	DC_AddFollowUpSurvey(x) {x;}
	/** @private @arg {DC_EngagementPanelHeaderShowNavigationButton} x */
	DC_EngagementPanelHeaderShowNavigationButton(x) {x;}
	/** @private @arg {DC_EntityBatchUpdate} x */
	DC_EntityBatchUpdate(x) {x;}
	/** @private @arg {DC_Loop} x */
	DC_Loop(x) {this.y("DC_Loop","loop",x,x => this.ceq(x,this.false_()));}
	/** @private @arg {DC_GetPdgBuyFlow} x */
	DC_GetPdgBuyFlow(x) {x;}
	/** @private @arg {DC_UpdateToggleButtonState} x */
	DC_UpdateToggleButtonState(x) {
		const cf="DC_UpdateToggleButtonState",{toggled: a,buttonId: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(a);
		this.save_enum("TOGGLE_BUTTON_ID_TYPE",b);
	}
	/** @private @arg {DC_RelatedChip} x */
	DC_RelatedChip(x) {
		const cf="DC_RelatedChip"; this.k(cf,x);
		const {targetSectionIdentifier,loadCached,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(targetSectionIdentifier!=="sid-wn-chips") debugger;
		if(loadCached!==true) debugger;
	}
	/** @private @arg {DC_Timed} x */
	DC_Timed(x) {
		const cf="DC_Timed"; this.k(cf,x);
		const {timeoutMs,continuation,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(timeoutMs!==60000) debugger;
		this.params(cf,"TimedContinuation",continuation);
	}
	/** @private @arg {DC_ShowReloadUi} x */
	DC_ShowReloadUi(x) {
		const cf="DC_ShowReloadUi"; this.k(cf,x);
		const {targetId,...y}=this.s(cf,x); this.g(y);//#destructure*/
		this.D_UiTargetId(targetId);
	}
	/** @type {string[]} */
	DC_AddToPlaylist_listTypes=[
		"PLAYLIST_EDIT_LIST_TYPE_QUEUE",
	];
	/** @private @arg {DC_AddToPlaylist} x */
	DC_AddToPlaylist(x) {
		const code_template=(x => {let x1=x.split("/*Start*/")[1]; return x1.split("/*End*/")[0];})(`
		switch(x.listType) {
			default: break;
			case "PLAYLIST_EDIT_LIST_TYPE_QUEUE": /*Start*/{
				const {listType,onCreateListCommand,openListPanel,openMiniplayer,videoId,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.SE_CreatePlaylist(onCreateListCommand);
				this.t(openListPanel,this.a_primitive_bool);
				this.z([openMiniplayer],this.a_primitive_bool);
				this.videoId(videoId);
				this.z(videoIds,this.videoId);
			}/*End*/
		}`);
		const cf="DC_AddToPlaylist";
		this.save_string(`${cf}.listType`,x.listType);
		if(!this.DC_AddToPlaylist_listTypes.includes(x.listType)) {
			let known=this.DC_AddToPlaylist_listTypes;
			this.DC_AddToPlaylist_listTypes.push(x.listType);
			this.codegen_typedef_all(cf,x);
			console.log(`-- [case_gen_list:${cf}.listType] --`,JSON.stringify(this.DC_AddToPlaylist_listTypes,null,"\t"));
			console.log(`-- [js_gen:case_gen_${cf}] --\n\n${known.map(e => `			case ${e}: ${code_template}`).join("\n")}`);
		}
		switch(x.listType) {
			case "PLAYLIST_EDIT_LIST_TYPE_QUEUE": {
				if("openListPanel" in x) {
					const {openMiniplayer,videoId,listType: {},onCreateListCommand,openListPanel,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					this.E_CreatePlaylistService(onCreateListCommand);
					if(openListPanel!==true) debugger;
					if(openMiniplayer!==false) debugger;
					this.a_primitive_bool(openMiniplayer);
					this.videoId(videoId);
					this.z(videoIds,this.videoId);
					return;
				}
				const {openMiniplayer,videoId,listType: {},onCreateListCommand,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.E_CreatePlaylistService(onCreateListCommand);
				this.a_primitive_bool(openMiniplayer);
				this.videoId(videoId);
				this.z(videoIds,this.videoId);
			}
		}
	}
	/** @private @arg {DC_CommandExecutor} x */
	DC_CommandExecutor(x) {this.T_Commands("DC_CommandExecutor",x,this.G_DC_CommandExecutor_CommandItem);}
	/** @private @arg {DC_Continuation} x */
	DC_Continuation(x) {
		if("continuationCommand" in x) debugger;
		const cf="DC_Continuation";
		switch(x.request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE": {
				if("command" in x) {return this.y(cf,"command",this.DC_Continuation_Omit(cf,x),this.C_ShowReloadUi);}
				return this.g(this.DC_Continuation_Omit(cf,x));
			}
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE": return this.g(this.DC_Continuation_Omit(cf,x));
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT": {
				if("command" in x) {return this.y(cf,"command",this.DC_Continuation_Omit(cf,x),this.C_ShowReloadUi);}
				return this.g(this.DC_Continuation_Omit(cf,x));
			}
		}
	}
	/** @private @arg {DC_GetSurvey} x */
	DC_GetSurvey(x) {
		const cf="D_GetSurvey"; this.k(cf,x);
		const {action,endpoint: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if("paidDigitalGoods" in a) {debugger;}
		this.save_string("GetSurvey.action",action);
		switch(action) {
			default: debugger; break;
			case "SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL": {} break;
		}
		this.G_DC_GetSurvey_Endpoint(a);
	}
	/** @protected @arg {D_ToggleButtonIdData} x */
	D_ToggleButtonIdData(x) {this.y("D_ToggleButtonIdData","toggleButtonIdData",x,x => this.T_Id(x,x => this.save_enum("TOGGLE_BUTTON_ID_TYPE",x)));}
	/** @private @arg {D_UnifiedSharePanel} x */
	D_UnifiedSharePanel(x) {
		const cf="D_UnifiedSharePanel";
		const {trackingParams,showLoadingSpinner,...y}=this.s(cf,x);
		this.trackingParams(cf,trackingParams);
		if(showLoadingSpinner!==true) debugger;
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("D_TwoColumnSearchResults","primaryContents",x,this.R_SectionList);}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("D_PlaylistSidebarSecondaryInfo","videoOwner",x,this.R_VideoOwner);}
	/** @arg {D_RichSection} x */
	D_RichSection(x) {
		const cf="D_RichSection"; this.k(cf,x);
		const {content: a,trackingParams: b,fullBleed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_RichSection(a);
		this.trackingParams(cf,b);
		if(fullBleed!==false) debugger;
	}
	cg_mismatch_set=new Set();
	/** @type {[string,string][]} */
	cg_mismatch_list=[];
	/** @private @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player"; this.k(cf,x);
		const {responseContext: {},playabilityStatus,streamingData,playerAds,playbackTracking,videoDetails,playerConfig,storyboards,microformat,cards,trackingParams,attestation,videoQualityPromoSupportedRenderers,captions,adPlacements,frameworkUpdates,...y}=this.s(cf,x);
		this.D_PlayabilityStatus(playabilityStatus);
		this.t(streamingData,this.DD_Streaming);
		this.tz(playerAds,this.R_DesktopWatchAds);
		this.t(playbackTracking,this.D_PlaybackTracking);
		this.t(videoDetails,this.D_VideoDetails);
		this.t(playerConfig,this.D_PlayerConfig);
		this.t(storyboards,this.G_PlayerStoryboards);
		this.t(microformat,this.R_PlayerMicroformat);
		this.t(cards,this.R_CardCollection);
		this.trackingParams(cf,trackingParams);
		this.t(attestation,this.R_PlayerAttestation);
		this.t(videoQualityPromoSupportedRenderers,this.R_VideoQualityPromo);
		this.t(captions,this.R_PlayerCaptionsTracklist);
		this.tz(adPlacements,x => {
			if("adPlacementRenderer" in x) return this.R_AdPlacement(x);
			let ka=this.get_keys_of(x);
			if(ka.length!==0) debugger;
		});
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log("[done.RS_Player.next_key] [%s]",ka[0]);
		}
	}
	/** @private @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cf="RS_Page_Watch"; this.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Watch(endpoint);
		this.RS_Watch(response);
		this.RS_Player(playerResponse);
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this._previousCsn(previousCsn);
	}
	/** @private @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cf="R_WatchPage_VE3832"; this.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.R_TwoColumnWatchNextResults(contents);
		this.E_Watch(currentVideoEndpoint);
		this.trackingParams(cf,trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,this.R_CinematicContainer);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_DesktopTopbar} x */
	D_DesktopTopbar(x) {
		const cf="D_DesktopTopbar";
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
	/** @private @arg {D_FrameworkUpdates} x */
	D_FrameworkUpdates(x) {
		const cf="D_FrameworkUpdates"; this.k(cf,x);
		const {entityBatchUpdate,elementUpdate,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.R_ElementUpdate);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist"; this.k(cf,x);
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="STATUS_SUCCEEDED") debugger;
		let [r]=this.z(actions,x => {
			if("refreshPlaylistCommand" in x) return this.C_RefreshPlaylist(x);
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		});
		this.z(r,a => a);
		this.z(playlistEditResults,this.g);
		this.trackingParams(cf,trackingParams);
	}
	/** @template A1,A2,A3,A4 @template {[(a1:A1,a2:A2,a3:A3,a4:A4,...n:any[])=>void]} T @arg {[T,A1,A2,A3,A4]} arg0 */
	make_bind([func,a1,a2,a3,a4]) {return [func,a1,a2,a3,a4];}
	/** @private */
	log_url=false;
	/** @private @arg {"RS_Page_Browse"} cf @template {RS_Page_Browse} T @arg {T} x */
	RS_BrowsePage_Omit(cf,x) {
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.GE_Browse(endpoint);
		if(page!=="browse") debugger;
		this.RS_Browse(response);
		return y;
	}
	/** @private @arg {RS_Page_Browse} x */
	RS_Page_Browse(x) {
		const cf="RS_Page_Browse"; this.k(cf,x);
		if("rootVe" in x) {
			switch(x.rootVe) {
				case 3854: {
					const {rootVe,expirationTime,...y}=this.RS_BrowsePage_Omit(cf,x); this.g(y);
					this.t(expirationTime,x => this._primitive_of(x,"number"));
					this.save_number(`${cf}.rootVe`,rootVe);
				} break;
				default: debugger; break;
			}
			return;
		}
		if("expirationTime" in x) {
			const {expirationTime,...y}=this.RS_BrowsePage_Omit(cf,x); this.g(y);
			this.t(expirationTime,x => this._primitive_of(x,"number"));
			return;
		}
		if("previousCsn" in x) {
			const {previousCsn,...y}=this.RS_BrowsePage_Omit(cf,x); this.g(y);
			this.t(previousCsn,x => {
				if(typeof x!=="string") {debugger; return;}
				this._previousCsn(x);
			});
			return;
		}
		const {...y}=this.RS_BrowsePage_Omit(cf,x); this.g(y);
	}
	//#region Grouped Endpoints
	// in this case, inferred (E_Page is a index accessed type)
	/** @private @arg {E_Page} x */
	E_Page(x) {
		const cf="E_Page"; this.k(cf,x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("reelWatchEndpoint" in x) return this.E_ReelWatch(x);
		if("_tag" in x) return this.E_Settings(x);
		if("searchEndpoint" in x) return this.E_Search(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {E_Settings} x */
	E_Settings(x) {x;}
	//#region E_ (Endpoints)
	/** @private @arg {GE_Browse} x */
	GE_Browse(x) {
		const cf="GE_Browse";
		let [x2,x4,x5]=this.TE_Endpoint_3(cf,"browseEndpoint",x);
		let ve_name=this.GE_Browse_WCM(x2);
		this.G_DE_Browse_VE(ve_name,x4);
		this.g(x5);
	}
	/** @private @arg {Extract<GE_Browse_WCM,{resolveUrlCommandMetadata:any}>["resolveUrlCommandMetadata"]} x */
	ResolveUrlCommandMetadata(x) {
		x;
	}
	/** @private @arg {GE_Browse_WCM} x */
	GE_Browse_WCM(x) {
		const cf="M_VE_Browse";
		if("resolveUrlCommandMetadata" in x) {
			const {webCommandMetadata: a,resolveUrlCommandMetadata: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.ResolveUrlCommandMetadata(b);
			if(a.rootVe===3854) {
				return this.GM_VE3854_WC(a);
			}
			debugger;
			return this.GM_VE_WC_Browse(a);
		}
		const {webCommandMetadata: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		return this.GM_VE_WC_Browse(a);
	}
	/** @private @arg {E_Watch} x */
	E_Watch(x) {const [a,b,y]=this.TE_Endpoint_3("E_Watch","watchEndpoint",x); this.g(y); this.M_VE3832_Watch(a); this.DE_VE3832_Watch(b);}
	/** @private @arg {E_Upload} x */
	E_Upload(x) {const [a,b,y]=this.TE_Endpoint_3("E_Upload","uploadEndpoint",x); this.g(y); this.M_VE83769(a); this.B_Hack(b);}
	/** @private @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {const [a,b,y]=this.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.DE_YpcGetCart(b);}
	/** @private @arg {E_Subscribe} x */
	E_Subscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Subscribe","subscribeEndpoint",x); this.g(y); this.M_Subscribe(a); this.DE_Subscribe(b);}
	/** @private @arg {E_ReelWatch} x */
	E_ReelWatch(x) {const [a,b,y]=this.TE_Endpoint_3("E_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.DE_ReelWatch(b);}
	/** @private @arg {E_ShowEngagementPanel} x */
	E_ShowEngagementPanel(x) {let [a,b]=this.TE_Endpoint_2("E_ShowEngagementPanel","showEngagementPanelEndpoint",x); this.g(b); this.DE_ShowEngagementPanel(a);}
	/** @private @arg {E_UndoFeedback} x */
	E_UndoFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_UndoFeedback","undoFeedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_UndoFeedback(b);}
	/** @private @arg {E_Url} x */
	E_Url(x) {const [a,b,y]=this.TE_Endpoint_3("E_Url","urlEndpoint",x); this.g(y); this.M_VE83769(a); this.DE_Url(b);}
	/** @private @arg {E_RecordNotificationInteractions} x */
	E_RecordNotificationInteractions(x) {const [a,b,y]=this.TE_Endpoint_3("E_RecordNotificationInteractions","recordNotificationInteractionsEndpoint",x); this.g(y); this.M_RecordInteractions(a); this.DE_RecordNotificationInteractions(b);}
	/** @private @arg {E_GetNotificationMenu} x */
	E_GetNotificationMenu(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetNotificationMenu","getNotificationMenuEndpoint",x); this.g(y); this.M_GetNotificationMenu(a); this.DE_GetNotificationMenu(b);}
	/** @private @arg {E_GetTranscript} x */
	E_GetTranscript(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetTranscript","getTranscriptEndpoint",x); this.g(y); this.M_GetTranscript(a); this.DE_GetTranscript(b);}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {const cf="E_YpcGetOffers",[a,b,y]=this.TE_Endpoint_3(cf,"ypcGetOffersEndpoint",x); this.g(y); this.M_Empty_WCM("M_YpcGetOffers",a); this.D_Params(`D${cf}`,b,"ypc_get_offers.params");}
	/** @private @arg {E_Search} x */
	E_Search(x) {const [a,b,y]=this.TE_Endpoint_3("E_Search","searchEndpoint",x); this.g(y); this.M_VE4724(a); this.DE_Search(b);}
	/** @private @arg {E_CreateBackstagePost} x */
	E_CreateBackstagePost(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreateBackstagePost","createBackstagePostEndpoint",x); this.g(y); this.M_CreateBackstagePost(a); this.DE_CreateBackstagePost(b);}
	/** @private @arg {E_WatchPlaylist} x */
	E_WatchPlaylist(x) {const [a,b,y]=this.TE_Endpoint_3("E_WatchPlaylist","watchPlaylistEndpoint",x); this.g(y); this.M_VE3832_WatchPlaylist(a); this.DE_WatchPlaylist(b);}
	/** @private @arg {E_Like} x */
	E_Like(x) {const [a,b,y]=this.TE_Endpoint_3("E_Like","likeEndpoint",x); this.g(y); this.M_Like(a); this.DE_Like(b);}
	/** @private @arg {E_PlaylistEditor} x */
	E_PlaylistEditor(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEditor","playlistEditorEndpoint",x); this.g(y); this.M_Empty_WCM("DC_PlaylistEditor",a); this.DE_PlaylistEditor(b);}
	/** @private @arg {E_SignalNavigation} x */
	E_SignalNavigation(x) {const [a,b,y]=this.TE_Endpoint_3("E_SignalNavigation","signalNavigationEndpoint",x); this.g(y); this.M_VE83769(a); this.DE_SignalNavigation(b);}
	/** @private @arg {E_ShareEntityService} x */
	E_ShareEntityService(x) {const [a,b,y]=this.TE_Endpoint_3("E_ShareEntityService","shareEntityServiceEndpoint",x); this.g(y); this.M_GetSharePanel(a); this.DE_ShareEntityService(b);}
	/** @private @arg {E_GetReportForm} x */
	E_GetReportForm(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetReportForm","getReportFormEndpoint",x); this.g(y); this.M_FlagGetForm(a); this.DE_GetReportForm(b);}
	/** @private @arg {E_SignalService_SendPost} x */
	E_SignalService_SendPost(x) {const cf="E_SignalService_SendPost",[a,b]=this.T_SE_Signal(cf,x); this.M_SendPost(a); this.G_ClientSignal(cf,b);}
	/** @protected @arg {E_AddToPlaylistService} x */
	E_AddToPlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_AddToPlaylistService","addToPlaylistServiceEndpoint",x); this.g(y); this.M_AddToPlaylistService(a); this.DE_AddToPlaylistService(b);}
	/** @private @arg {E_PlaylistEdit} x */
	E_PlaylistEdit(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","playlistEditEndpoint",x); this.g(y); this.M_EditPlaylist(a); this.DE_PlaylistEdit(b);}
	/** @private @arg {E_Feedback} x */
	E_Feedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","feedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_Feedback(b);}
	/** @private @arg {E_YpcGetOfflineUpsell} x */
	E_YpcGetOfflineUpsell(x) {const [a,y]=this.TE_Endpoint_2("E_YpcGetOfflineUpsell","ypcGetOfflineUpsellEndpoint",x); this.g(y); this.DE_YpcGetOfflineUpsell(a);}
	/** @private @arg {E_CreatePlaylistService} x */
	E_CreatePlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreatePlaylistService","createPlaylistServiceEndpoint",x); this.g(y); this.DS_CreatePlaylist(b); this.M_CreatePlaylist(a);}
	/** @private @arg {E_NotificationOptOut} x */
	E_NotificationOptOut(x) {const cf="E_NotificationOptOut",[a,b,y]=this.TE_Endpoint_3(cf,"notificationOptOutEndpoint",x); this.g(y); this.DE_NotificationOptOut(b); this.M_NotificationOptOut(a);}
	/** @private @arg {E_UserFeedback} x */
	E_UserFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreatePlaylistService","userFeedbackEndpoint",x); this.g(y); this.DE_UserFeedback(b); this.M_UserFeedback(a);}
	/** @private @arg {E_Unsubscribe} x */
	E_Unsubscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Unsubscribe","unsubscribeEndpoint",x); this.g(y); this.DE_Unsubscribe(b); this.M_Unsubscribe(a);}
	/** @private @arg {M_Unsubscribe} x */
	M_Unsubscribe(x) {this.T_WCM("M_Unsubscribe",x,this.GM_Unsubscribe);}
	/** @private @arg {M_GetPdgBuyFlow} x */
	M_GetPdgBuyFlow(x) {this.T_WCM("M_GetPdgBuyFlow",x,this.GM_GetPdgBuyFlow);}
	/** @private @arg {M_UserFeedback} x */
	M_UserFeedback(x) {this.T_WCM("M_UserFeedback",x,this.GM_UserFeedback);}
	/** @private @arg {M_GetTranscript} x */
	M_GetTranscript(x) {this.T_WCM("M_GetTranscript",x,this.GM_GetTranscript);}
	/** @private @arg {M_EditPlaylist} x */
	M_EditPlaylist(x) {this.T_WCM("M_EditPlaylist",x,this.GM_EditPlaylist);}
	/** @private @arg {M_GetSharePanel} x */
	M_GetSharePanel(x) {this.T_WCM("M_GetSharePanel",x,this.GM_GetSharePanel);}
	/** @private @arg {M_Like} x */
	M_Like(x) {this.T_WCM("M_Like",x,this.GM_Like);}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {M_Subscribe} x */
	M_Subscribe(x) {this.T_WCM("M_Subscribe",x,this.GM_Subscribe);}
	/** @private @arg {M_SetSetting} x */
	M_SetSetting(x) {this.T_WCM("M_SetSetting",x,this.GM_SetSetting);}
	/** @private @arg {M_FlagGetForm} x */
	M_FlagGetForm(x) {this.T_WCM("M_FlagGetForm",x,this.GM_FlagGetForm);}
	/** @protected @arg {M_AddToPlaylistService} x */
	M_AddToPlaylistService(x) {this.T_WCM("M_AddToPlaylistService",x,this.GM_AddToPlaylistService);}
	/** @private @arg {M_Feedback} x */
	M_Feedback(x) {this.T_WCM("M_Feedback",x,this.GM_Feedback);}
	/** @private @arg {M_RecordInteractions} x */
	M_RecordInteractions(x) {this.T_WCM("M_RecordInteractions",x,this.GM_RecordInteractions);}
	/** @protected @arg {M_VE3832_WatchPlaylist} x */
	M_VE3832_WatchPlaylist(x) {this.T_WCM("M_VE3832_WatchPlaylist",x,this.GM_VE3832_WatchPlaylist);}
	/** @private @arg {M_VE3832_Watch} x */
	M_VE3832_Watch(x) {this.T_WCM("M_VE3832_Watch",x,this.GM_VE3832_Watch);}
	/** @private @arg {M_VE4724} x */
	M_VE4724(x) {this.T_WCM("M_VE4724",x,this.GM_VE4724);}
	/** @private @arg {M_VE37414} x */
	M_VE37414(x) {this.T_WCM("M_VE37414",x,this.GM_VE37414);}
	/** @private @arg {M_VE83769} x */
	M_VE83769(x) {this.T_WCM("M_VE83769",x,this.GM_VE83769_WC);}
	/** @private @arg {string} cf @arg {M_Empty_WCM} x */
	M_Empty_WCM(cf,x) {this.codegen_typedef_all(cf,x); this.GEN(cf,x);}
	/** @private @arg {M_Next} x */
	M_Next(x) {this.T_WCM("M_Next",x,this.GM_Next);}
	/** @private @arg {M_CreatePlaylist} x */
	M_CreatePlaylist(x) {this.T_WCM("M_CreatePlaylist",x,this.GM_CreatePlaylist);}
	/** @private @arg {M_NotificationOptOut} x */
	M_NotificationOptOut(x) {this.T_WCM("M_NotificationOptOut",x,this.GM_NotificationOptOut);}
	/** @private @arg {GM_SendPost} x */
	GM_SendPost(x) {if(this.w("GM_SendPost","sendPost",x)!==true) debugger;}
	/** @protected @arg {GM_GetPdgBuyFlow} x */
	GM_GetPdgBuyFlow(x) {this.T_GM("GM_GetTranscript",x,x => this.ceq(x,"/youtubei/v1/pdg/get_pdg_buy_flow"));}
	/** @protected @arg {GM_Unsubscribe} x */
	GM_Unsubscribe(x) {this.T_GM("GM_GetTranscript",x,x => this.ceq(x,"/youtubei/v1/subscription/unsubscribe"));}
	/** @private @arg {Extract<GM_WC,{sendPost:boolean;apiUrl:string}>} x */
	GM_WC_Base(x) {const cf="GM_WC_Base",{sendPost,apiUrl}=this.s(cf,x); this._primitive_of(sendPost,"boolean"); return this.parser.parse_url(cf,apiUrl);}
	/** @private @arg {GM_WC} x */
	GM_WC(x) {
		const cf="GM_WC"; this.k(cf,x);
		if("rootVe" in x&&!("apiUrl" in x)) return this.GM_WC_RootVe(x);
		if("apiUrl" in x&&!("rootVe" in x)) return this.GM_WC_ApiUrl(x);
		if("rootVe" in x&&"apiUrl" in x) return this.GM_WC_Ex(x);
		if("sendPost" in x) {
			const {sendPost,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(sendPost!==true) debugger;
			return;
		}
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {Extract<GM_WC,{apiUrl:any}>} x */
	GM_WC_ApiUrl(x) {
		let cx=x.apiUrl;
		switch(x.apiUrl) {
			default: {
				let path_parts=split_string(split_string_once(cx,"/")[1],"/");
				let url_type=this.parser.get_url_type(path_parts);
				if(!url_type) {
					return;
				}
				let url_type_ex=this.join_string(split_string(url_type,"."),"$");
				/** @private @arg {GM_WC} x */
				let typedef_str=this.codegen.codegen_typedef(`G_${url_type_ex}`,x,true);
				const l1="-- [GeneratedWebCommandMetadata] --";
				const r2="return this.GeneratedWebCommandMetadata(x);";
				console.log(`\n${l1}\n\n${typedef_str}\n---\n\n\tG_${url_type_ex},\n---\n\n\tcase "${cx}": ${r2}`);
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
				return this.GM_Browse(x);
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
	/** @private @arg {GM_Like} x */
	GM_Like(x) {
		const cf="GM_Like"; this.g_k(cf,x); this.k(cf,x);
		switch(x.apiUrl) {
			default: debugger; break;
			case "/youtubei/v1/like/removelike": return this.GM_RemoveLike(x);
			case "/youtubei/v1/like/dislike": return this.GM_Dislike(x);
			case "/youtubei/v1/like/like": return this.GM_LikeLike(x);
		}
	}
	/** @private @arg {GM_VE_WC_Browse} x @returns {`VE${GM_VE_WC_Browse["rootVe"]}`} */
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
		return `VE${x.rootVe}`;
	}
	/** @private @arg {Exclude<Extract<GM_WC,{rootVe:any}>,{apiUrl:any}>} x */
	GM_WC_RootVe(x) {
		let cx=x.rootVe;
		switch(x.rootVe) {
			default: {
				x===0;
				/** @private @arg {GM_WC} x */
				this.codegen_str(`G_VE${x}`,x);
				console.log(`\n\tG_VE${cx},`);
				this.codegen_case("GM_WC_RootVe",x,"return this.GeneratedWebCommandMetadata(x);");
			} break;
			case 3832: return this.GM_VE3832_Watch(x);
			case 4724: return this.GM_VE4724(x);
			case 37414: return this.GM_VE37414(x);
			case 83769: return this.GM_VE83769_WC(x);
		}
	}
	/** @private @arg {Extract<GM_WC,{rootVe:any;apiUrl:any}>} x */
	GM_WC_Ex(x) {
		switch(x.rootVe) {
			case 3611: return this.GM_VE3611_WC(x);
			case 3854: return this.GM_VE3854_WC(x);
			case 5754: return this.GM_VE5754_WC(x);
			case 6827: return this.GM_VE6827_WC(x);
			case 11487: return this.GM_VE11487_WC(x);
			case 23462: return this.GM_VE23462_WC(x);
			case 42352: return this.GM_VE42352_WC(x);
			case 96368: return this.GM_VE96368_WC_browse(x);
			default: x===0; debugger; break;
		}
	}
	/** @private @arg {GM_VE3611_WC} x */
	GM_VE3611_WC(x) {
		const cf="GM_VE3611_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE3611_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if(rootVe!==3611) debugger;
	}
	/** @private @arg {GM_VE3854_WC} x @returns {`VE${rootVe}`} */
	GM_VE3854_WC(x) {
		const cf="GM_VE3854_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(url==="/") break x;
		}
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==3854) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE4724_WC} x */
	GM_VE4724(x) {
		const cf="GM_VE4724_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!this.str_starts_with_rx("/results?search_query=",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SEARCH") debugger;
		if(rootVe!==4724) debugger;
	}
	/** @private @arg {GM_VE5754_WC} x */
	GM_VE5754_WC(x) {
		const cf="GM_VE5754_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE5754_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_PLAYLIST") debugger;
		if(rootVe!==5754) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE11487_WC} x */
	GM_VE11487_WC(x) {
		const cf="GM_VE11487_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==11487) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE23462_WC} x */
	GM_VE23462_WC(x) {
		const cf="GM_VE23462_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(url) {
			default: console.log(`-- [GM_VE23462_WC] --\n\n\ncase "${url}":`); break;
			case "/account": break;
			case "/account_notifications": break;
		}
		if(webPageType!=="WEB_PAGE_TYPE_SETTINGS") debugger;
		if(rootVe!==23462) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE37414_WC} x */
	GM_VE37414(x) {
		const cf="GM_VE37414_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(url==="/shorts/") break x;
			let up=split_string_once(url,"/");
			let [p1,p2]=up; if(p1!=="") debugger;
			let u2=split_string_once(p2,"/");
			let [p3,p4]=u2; if(p3!=="shorts") debugger;
			this.videoId(p4);
		}
		if(webPageType!=="WEB_PAGE_TYPE_SHORTS") debugger;
		if(rootVe!==37414) debugger;
	}
	/** @private @arg {GM_VE42352_WC} x */
	GM_VE42352_WC(x) {
		const cf="GM_VE42352_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE42352_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==42352) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE96368_WC_browse} x */
	GM_VE96368_WC_browse(x) {
		const cf="GM_VE96368_WC_browse"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==96368) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_Subscribe} x */
	GM_Subscribe(x) {this.T_GM("GM_Subscribe",x,x => this.ceq(x,"/youtubei/v1/subscription/subscribe"));}
	/** @private @arg {GM_FlagGetForm} x */
	GM_FlagGetForm(x) {this.T_GM("GM_FlagGetForm",x,x => this.ceq(x,"/youtubei/v1/flag/get_form"));}
	/** @protected @arg {GM_GetTranscript} x */
	GM_GetTranscript(x) {this.T_GM("GM_GetTranscript",x,x => this.ceq(x,"/youtubei/v1/get_transcript"));}
	/** @protected @arg {GM_UserFeedback} x */
	GM_UserFeedback(x) {this.ceq(this.w("GM_UserFeedback","ignoreNavigation",x),this.true_());}
	/** @private @arg {GM_EditPlaylist} x */
	GM_EditPlaylist(x) {this.T_GM("GM_EditPlaylist",x,x => this.ceq(x,"/youtubei/v1/browse/edit_playlist"));}
	/** @private @arg {GM_GetSharePanel} x */
	GM_GetSharePanel(x) {this.T_GM("GM_GetSharePanel",x,x => this.ceq(x,"/youtubei/v1/share/get_share_panel"));}
	/** @private @arg {GM_CreateBackstagePost} x */
	GM_CreateBackstagePost(x) {this.T_GM("GM_CreateBackstagePost",x,x => this.ceq(x,"/youtubei/v1/backstage/create_post"));}
	/** @private @arg {GM_RemoveLike} x */
	GM_RemoveLike(x) {this.T_GM("GM_RemoveLike",x,x => this.ceq(x,"/youtubei/v1/like/removelike"));}
	/** @private @arg {GM_Dislike} x */
	GM_Dislike(x) {this.T_GM("GM_Dislike",x,x => this.ceq(x,"/youtubei/v1/like/dislike"));}
	/** @private @arg {GM_LikeLike} x */
	GM_LikeLike(x) {this.T_GM("GM_LikeLike",x,x => this.ceq(x,"/youtubei/v1/like/like"));}
	/** @private @arg {GM_AccountMenu} x */
	GM_AccountMenu(x) {this.T_GM("GM_AccountMenu",x,x => this.ceq(x,"/youtubei/v1/account/account_menu"));}
	/** @private @arg {GM_GetUnseenNotificationCount} x */
	GM_GetUnseenNotificationCount(x) {this.T_GM("GM_GetUnseenNotificationCount",x,x => this.ceq(x,"/youtubei/v1/notification/get_unseen_count"));}
	/** @private @arg {GM_GetNotificationMenu} x */
	GM_GetNotificationMenu(x) {this.T_GM("GM_GetNotificationMenu",x,x => this.ceq(x,"/youtubei/v1/notification/get_notification_menu"));}
	/** @private @arg {GM_Next} x */
	GM_Next(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/next"));}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/ypc/get_cart"));}
	/** @private @arg {GM_CreatePlaylist} x */
	GM_CreatePlaylist(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/playlist/create"));}
	/** @private @arg {GM_SetSetting} x */
	GM_SetSetting(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/account/set_setting"));}
	/** @protected @arg {GM_AddToPlaylistService} x */
	GM_AddToPlaylistService(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/playlist/get_add_to_playlist"));}
	/** @private @arg {"GM_VE3832_WatchPlaylist"|"GM_VE3832_Watch"} cf @arg {T} x @template {GM_VE3832_WatchPlaylist|GM_VE3832_Watch} T */
	GM_VE3832(cf,x) {
		const {rootVe,webPageType,...y}=this.s(cf,x);/*#destructure_omit*/
		if(rootVe!==3832) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
		return y;
	}
	/** @private @arg {GM_VE3832_WatchPlaylist} x */
	GM_VE3832_WatchPlaylist(x) {
		const cf="GM_VE3832_WatchPlaylist";
		const {url,...y}=this.GM_VE3832(cf,x); this.g(y);/*#destructure_done*/
		if(!this.str_starts_with_rx("/playlist",url)) debugger;
	}
	/** @private @arg {GM_VE3832_Watch} x */
	GM_VE3832_Watch(x) {
		const cf="GM_VE3832_Watch";
		const url=this.w(`${cf}:omit`,"url",this.GM_VE3832(cf,x));
		if(!this.str_starts_with_rx("/watch",url)) debugger;
	}
	/** @private @arg {GM_VE83769_WC} x */
	GM_VE83769_WC(x) {
		const cf="GM_VE83769_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE83769_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_UNKNOWN") debugger;
		if(rootVe!==83769) debugger;
	}
	/** @private @arg {GM_Browse} x */
	GM_Browse(x) {this.T_GM("GM_Browse",x,x => this.ceq(x,"/youtubei/v1/browse"));}
	/** @private @arg {GM_RecordInteractions} x */
	GM_RecordInteractions(x) {this.T_GM("GM_RecordInteractions",x,x => this.ceq(x,"/youtubei/v1/notification/record_interactions"));}
	/** @private @arg {GM_Feedback} x */
	GM_Feedback(x) {this.T_GM("GM_Feedback",x,x => this.ceq(x,"/youtubei/v1/feedback"));}
	/** @private @arg {GM_NotificationOptOut} x */
	GM_NotificationOptOut(x) {this.T_GM("GM_NotificationOptOut",x,x => this.ceq(x,"/youtubei/v1/notification/opt_out"));}
	/** @private @arg {DE_Search} x */
	DE_Search(x) {this.H_("DE_Search","query",x,this.a_primitive_str);}
	/** @private @arg {DE_GetTranscript} a */
	DE_GetTranscript(a) {this.D_Params("DE_GetTranscript",a,"get_transcript.params");}
	/** @private @arg {DE_UserFeedback} x */
	DE_UserFeedback(x) {this.y("DE_UserFeedback","additionalDatas",x,x => this.z(x,this.G_AdditionalDataItem));}
	/** @private @arg {DE_ShareEntityService} x */
	DE_ShareEntityService(x) {
		const cf="DE_ShareEntityService";
		const {serializedShareEntity: a,commands: b,...y}=this.s(cf,x); this.g(y);
		let [u1,y1]=this.z(b,x => this.TA_OpenPopup(cf,x));
		this.z(y1,x => {if(x!==void 0) debugger;});
		this.z(u1,this.Popup_ShareEntityService);
	}
	/** @private @arg {DE_YpcGetOfflineUpsell} x */
	DE_YpcGetOfflineUpsell(x) {this.D_Params("DE_YpcGetOfflineUpsell",x,"ypc_get_offline_upsell.params");}
	/** @private @arg {DE_GetReportForm} x */
	DE_GetReportForm(x) {this.D_Params("DE_GetReportForm",x,"get_report_form.params");}
	/** @private @arg {DE_NotificationOptOut} x */
	DE_NotificationOptOut(x) {
		const cf="DE_NotificationOptOut";
		const {optOutText: a,serializedOptOut: b,serializedRecordInteractionsRequest: c,...y}=this.s(cf,x); this.g(y);
		this.G_Text(a);
		let un_b=atob(b);
		let no_uri_b=decodeURIComponent(un_b);
		this.params(cf,"notification.opt_out",no_uri_b);
		this.params(cf,"notification.record_interactions",c);
	}
	/** @private @arg {DE_SignalNavigation} x */
	DE_SignalNavigation(x) {
		const cf="DE_SignalNavigation",a=this.T_Signal(cf,x); this.k(cf,x);
		switch(a) {
			default: this.codegen_case(`${cf}.signal`,a); break;
			case "CHANNEL_SWITCHER":
			case "LIVE_CONTROL_ROOM":
		}
	}
	/** @private @arg {DE_UndoFeedback} x */
	DE_UndoFeedback(x) {
		const cf="DE_UndoFeedback"; this.k(cf,x);
		const {undoToken,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_undo_token(undoToken);
		this.z(actions,this.A_UndoFeedback);
	}
	/** @private @arg {DE_GetNotificationMenu} x */
	DE_GetNotificationMenu(x) {
		const cf="DE_GetNotificationMenu"; this.k(cf,x);
		const {ctoken,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"GetNotificationMenu.ctoken",ctoken);
	}
	/** @private @arg {DE_SuperThanksSelectedTier} x */
	DE_SuperThanksSelectedTier(x) {
		const cf="DE_SuperThanksSelectedTier";
		const {index,key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		console.log("super_thanks_selected_tier.index",index);
		console.log("super_thanks_selected_tier.key",key);
	}
	/** @private @arg {DE_YpcGetCart} x */
	DE_YpcGetCart(x) {
		const cf="DE_YpcGetCart"; this.k(cf,x);
		let sp=this.y(cf,"transactionParams",x,x => x);
		this.params(cf,"YpcGetCart.transactionParams",sp);
	}
	/** @private @arg {DE_Subscribe} x */
	DE_Subscribe(x) {
		const cf="DE_Subscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.D_ChannelId);
		this.params(cf,"subscribe.params",params);
	}
	/** @private @arg {DE_Unsubscribe} x */
	DE_Unsubscribe(x) {
		const cf="DE_Unsubscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.D_ChannelId);
		this.params(cf,"unsubscribe.params",params);
	}
	/** @private @arg {DE_ReelWatch} x */
	DE_ReelWatch(x) {
		const cf="DE_ReelWatch"; this.k(cf,x);
		if("videoId" in x) {
			const {videoId,playerParams,thumbnail,overlay,params,sequenceProvider,sequenceParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(videoId,this.videoId);
			this.params(cf,"reel.player_params",playerParams);
			this.t(thumbnail,this.D_Thumbnail);
			this.R_ReelPlayerOverlay(overlay);
			this.params(cf,"reel.params",params);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(sequenceParams,x => this.params(cf,"reel.sequence_params",x));
			return;
		}
		if("inputType" in x) {
			const {playerParams,overlay,params,sequenceProvider,inputType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.params(cf,"reel.player_params",playerParams);
			this.R_ReelPlayerOverlay(overlay);
			this.params(cf,"reel.params",params);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(inputType,x => {if(x!=="REEL_WATCH_INPUT_TYPE_SEEDLESS") debugger;});
			return;
		}
		this.g(x);
	}
	/** @private @arg {DE_ShowEngagementPanel} x */
	DE_ShowEngagementPanel(x) {
		const cf="D_ShowEngagementPanel"; this.k(cf,x);
		const {panelIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @protected @arg {DE_AddToPlaylistService} x */
	DE_AddToPlaylistService(x) {
		const cf="DE_AddToPlaylistService"; this.k(cf,x);
		const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.videoId(videoId);
	}
	/** @private @arg {DE_PlaylistEdit} x */
	DE_PlaylistEdit(x) {
		const cf="D_PlaylistEdit"; this.k(cf,x);
		const {playlistId,params,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
	/** @private @arg {DE_Feedback} x */
	DE_Feedback(x) {
		const cf="DE_Feedback",u=this.T_OmitKey(cf,"feedbackToken",x,this.DE_Feedback_onToken); this.k(cf,x);
		if(!("uiActions" in u)) return this.g(u);
		const {uiActions,actions,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
		this.D_HideEnclosingContainer(uiActions);
		this.t(actions,x => this.z(x,this.A_ReplaceEnclosing));
	}
	/** @private @arg {DE_VE3832_Watch} x */
	DE_VE3832_Watch(x) {
		// const cf="DE_VE3832_Watch";
		if("playlistSetVideoId" in x) {
			if("params" in x) {
				const cf="DE_VE3832:playlistSetVideoId:params";
				const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig,playerParams,watchEndpointMusicSupportedConfigs,nofollow,playerExtraUrlParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.a_primitive_num(index);
				this.a_primitive_str(playlistSetVideoId);
				this.params(cf,"watch.params",params);
				this.a_primitive_num(startTimeSeconds);
				if(continuePlayback!==false) debugger;
				this.R_VssLoggingContext(loggingContext);
				this.R_Html5PlaybackOnesieConfig(watchEndpointSupportedOnesieConfig);
				this.R_PrefetchHintConfig(watchEndpointSupportedPrefetchConfig);
				this.playerParams("DE_VE3832_Watch","watch.player_params",playerParams,this.on_player_params_callback.bind(this));
				this.R_WatchEndpointMusicConfig(watchEndpointMusicSupportedConfigs);
				this._primitive_of(nofollow,"boolean");
				(([a,...b]) => this.ceq(a.key,"inline")&&this.ceq(b.length,0))(playerExtraUrlParams);
				return;
			}
			x==="";
			this.g(x);
			return;
		}
		if("watchEndpointSupportedPrefetchConfig" in x) return;
		if("watchEndpointSupportedOnesieConfig" in x) return;
		if("playlistId" in x) return;
		if("params" in x) return;
		if("videoId" in x) {
			const cf="DE_VE3832:videoId";
			const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.videoId(videoId);
			return;
		}
		x==="";
		this.g(x);
	}
	/** @private @arg {DE_RecordNotificationInteractions} x */
	DE_RecordNotificationInteractions(x) {
		const cf="DE_RecordNotificationInteractions"; this.k(cf,x);
		const {serializedInteractionsRequest,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"record_notification_interactions",serializedInteractionsRequest);
		this.tz(actions,this.A_HideEnclosing);
	}
	/** @private @arg {DE_MutationItem} x */
	DE_MutationItem(x) {
		const cf="DE_MutationItem"; this.k(cf,x);
		const {entityKey,type,options,payload,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"entity_key.normal",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE"&&type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		this.tf(this.O_DU_Persistence)(options);
		let pr=this.tf(this.G_EY_Entity)(payload);
		if(!pr) return;
		const [pi,px]=pr;
		switch(pi) {
			case "offlineabilityEntity": this.D_EY_Offlineability(px); break;
			case "subscriptionStateEntity": {
				const cf="DS_EY_Subscription";
				const {key,subscribed,...y}=this.s(cf,px); this.g(y);
				this.params(cf,"subscriptionState.key",key);
				// this.params(`${cf}.key`,"entity.key",key);
				if(subscribed!==true) debugger;
			} break;
			case "playlistLoopStateEntity": {
				const cf="DS_EY_PlaylistLoop";
				const {key,state,...y}=this.s(cf,px); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				switch(state) {
					default: debugger; break;
					case "PLAYLIST_LOOP_STATE_NONE":
				}
			} break;
			case "transcriptTrackSelectionEntity": {
				const cf="DS_EY_TranscriptTrackSelection";
				const {key,selectedTrackIndex,serializedParams,...y}=this.s(cf,px); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				if(selectedTrackIndex!==0) debugger;
				this.params(cf,"transcriptTrackSelection.serializedParams",serializedParams);
			} break;
			case "transcriptSearchBoxStateEntity": {
				const cf="DS_EY_TranscriptSearchBox";
				const {key,isHidden,...y}=this.s(cf,px); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				if(isHidden!==false) debugger;
			} break;
			case "macroMarkersListEntity": {
				const cf="EY_MacroMarkersList";
				const {key,...y}=this.s(cf,px); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
			} break;
			case "unknown": {
				let pk=pr[1];
				let x=pr[2];
				if("key" in x) {
					const {key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					console.log(`unknown.${this.uppercase_first(pk)}.key`,key);
				} else {debugger;}
			} break;
		}
	}
	/** @private @arg {DE_CreateBackstagePost} x */
	DE_CreateBackstagePost(x) {const cf="DE_CreateBackstagePost"; this.y(cf,"createBackstagePostParams",x,x => this.params("DE_CreateBackstagePost.params","createBackstagePost.params",x));}
	/** @private @arg {DE_WatchPlaylist} x */
	DE_WatchPlaylist(x) {
		const cf="DE_WatchPlaylist"; this.k(cf,x);
		const {playlistId,index,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_playlist_id(playlistId);
		this.a_primitive_num(index);
		this.params(cf,"watch_playlist.params",params);
	}
	/** @private @arg {DE_PlaylistEditor} x */
	DE_PlaylistEditor(x) {this.y("DE_PlaylistEditor","playlistId",x,this.playlistId);}
	/** @private @arg {DE_Like} x */
	DE_Like(x) {
		const cf="DE_Like"; this.g_k(cf,x); this.k(cf,x);
		switch(x.status) {
			case "INDIFFERENT": {
				const cf="E_LikeIndifferent";
				const {status,target,removeLikeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				this.t(removeLikeParams,x => this.params(cf,"like.removeLikeParams",x));
			} break;
			case "LIKE": {
				const cf="E_LikeLike";
				const {status,target,actions,likeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				actions;
				this.t(likeParams,x => this.params(cf,"like.likeParams",x));
			} break;
			case "DISLIKE": {
				const cf="E_LikeDislike";
				const {status,target,dislikeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				this.t(dislikeParams,x => this.params(cf,"like.dislikeParams",x));
			} break;
		}
	}
	/** @private @template U @arg {CF_T_GM} cf @template T @arg {{sendPost: true;apiUrl: T;}} x @arg {(this:this,x:T)=>U} f */
	T_GM(cf,x,f) {
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(sendPost!==true) debugger;
		return f.call(this,apiUrl);
	}
	/** @type {Map<string,(string|number)[]>} */
	cases_map=new Map;
	/** @arg {CF_D_CaseGen} cf @arg {string|number} val @arg {string} [code] */
	codegen_case(cf,val,code) {
		let known=this.cases_map.get(cf);
		if(!known) {known=[]; this.cases_map.set(cf,known);}
		let val_str=JSON.stringify(val);
		if(!known.includes(val_str)) known.push(val_str);
		if(code) return console.log(`-- [js_gen_code:user_code:${cf}] --\n\n${known.map(e => `case ${e}: ${code}`).join("\n")}`);
		console.log(`-- [js_gen_code:no_code:${cf}] --\n\n${known.map(e => `case ${e}:`).join("\n")}`);
	}
	/** @arg {CF_D_CaseGen} cf @template {string} K @arg {{[U in K]:string|number}} obj @arg {K} key @arg {string} [code] */
	codegen_case_key(cf,obj,key,code) {
		let val=obj[key];
		this.codegen_case(cf,val,code);
	}
	/** @private @arg {CF_T_Signal} cf @template T @arg {T_Signal<T>} x */
	T_Signal(cf,x) {return this.w(`T_Signal:${cf}`,"signal",x);}
	/** @private @arg {string} x */
	parse_undo_token(x) {
		let token_bin=bs.base64_url_dec.decodeByteArray(x);
		if(!token_bin) {debugger; return;}
		this.save_number("undo_token[0]",token_bin[0]);
	}
	/** @private @arg {string} ve_name @arg {GE_Browse['browseEndpoint']['browseId']} x */
	GU_E_BrowseId(ve_name,x) {
		if(this.str_starts_with_rx("UC",x)) return this.D_ChannelId(x);
		if(this.str_starts_with_rx("VL",x)) return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);
		switch(x) {
			case "FEdownloads": case "FEhistory": case "FElibrary": case "FEsubscriptions": case "FEtrending": case "FEwhat_to_watch": break;
			case "FEguide_builder": case "FEstorefront": case "FEhashtag": break;
			case "SPaccount_notifications": case "SPunlimited": case "SPreport_history":
			case "SPaccount_overview": break;
			default: x===""; console.log(`-- [E_Browse_ParseBrowseId.${ve_name}] --\n\n\ncase "${x}":`); break;
		};
	}
	/** @private @arg {GU_VE42352_Url} x */
	GU_VE42352_Url(x) {
		switch(x) {
			case "/feed/downloads": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GU_VE3611_Url} x */
	GU_VE3611_Url(x) {
		if(this.str_starts_with_rx("/@",x)) return;
		let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
		let a1=split_string_once(y,"/");
		switch(a1[0]) {
			default: switch(a1[0]) {
			} debugger; break;
			case "gaming": if(a1.length!==1) debugger; break;
			case "channel": {
				let [,y1]=a1;
				if(this.str_starts_with_rx("UC",y1)) return;
			} break;
		}
	}
	/** @private @arg {GU_VE5754_Url} x */
	GU_VE5754_Url(x) {
		let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
		if(this.str_is_search(y)) {
			let [pp,qp]=split_string_once(y,"?");
			let a1=split_string_once(pp,"/");
			if(a1.length!==1) debugger;
			switch(a1[0]) {
				case "playlist": {
					let p_sp=this.parse_url_search_params(qp);
					this.parse_playlist_id(p_sp.list);
				} break;
			}
		}
	}
	/** @private @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse"; this.k(cf,x);
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
		}
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedActions,this.GA_ResponseReceived);
		this.t(contents,this.G_BrowseContents);
		this.t(topbar,this.R_DesktopTopbar);
		this.t(frameworkUpdates,this.R_EntityBatchUpdate);
		this.t(sidebar,this.G_BrowseSidebar);
		this.tz(observedStateTags,this.B_StateTag);
		this.t(cacheMetadata,this.D_Cache_MD);
		this.t(metadata,this.G_Browse_MD);
		this.t(microformat,this.R_Microformat);
		this.t(maxAgeStoreSeconds,x => this._primitive_of(x,"number"));
		this.t(background,this.R_MusicThumbnail);
		this.t(continuationContents,this.RC_SectionList);
		this.tz_cf(cf,alerts,this.RS_Playlist_AlertItem);
	}
	/** @arg {Omit<Omit<Omit<D_Microformat, `url${string}`>, `ios${string}`>, `twitter${string}`>} x */
	D_Microformat_Other(x) {
		const cf="D_Microformat_Other"; this.k(cf,x);
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
	/** @private @arg {B_HrefUrl} x */
	B_HrefUrl(x) {this.y("B_HrefUrl","hrefUrl",x,x => this.parser.parse_url("B_HrefUrl.url",x));}
	/** @private @arg {D_Microformat} x */
	D_Microformat(x) {
		const cf="D_Microformat"; this.k(cf,x);
		const {url,ios,twitter,other,...y}=this.unwrap_microformat(x); this.g(y);
		{
			const {title,description,thumbnail,siteName,appName,androidPackage,ogType,schemaDotOrgType,noindex,unlisted,tags,familySafe,availableCountries,linkAlternates,...y}=other; this.g(y);
			this.z([title,description,siteName,appName,androidPackage,ogType,schemaDotOrgType],this.a_primitive_str);
			this.D_Thumbnail(thumbnail);
			if(noindex!==false) debugger;
			if(unlisted!==false) debugger;
			this.tz(tags,this.a_primitive_str);
			this.t(familySafe,x => {if(x!==true) debugger;});
			this.tz(availableCountries,this.a_primitive_str);
			this.z(linkAlternates,this.B_HrefUrl);
		}
		{
			const {appArguments,appStoreId,...y}=this.s(`${cf}.ios`,ios); this.g(y);
			this.z([appArguments,appStoreId],this.a_primitive_str);
		}
		{
			const {canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos,...y}=this.s(`${cf}.url`,url); this.g(y);
			this.z([canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos],this.a_primitive_str);
		}
	}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar"; this.k(cf,x);
		const {title,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(items,this.R_CompactLink);
	}
	/** @private @arg {Extract<D_CompactLink,{navigationEndpoint:any}>["navigationEndpoint"]} x */
	D_CompactLink_NavEndpoint(x) {
		const cf="D_CompactLink_NavEndpoint"; this.k(cf,x);
		if("uploadEndpoint" in x) return this.E_Upload(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("signalNavigationEndpoint" in x) return this.E_SignalNavigation(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {"D_CompactLink.Styled"} cf @arg {Extract<D_CompactLink,{style:any}>} x */
	D_CompactLink_Styled(cf,x) {
		switch(x.style) {
			default: x===""; debugger; break;
			case "COMPACT_LINK_STYLE_TYPE_HISTORY_MY_ACTIVITY_LINK": {
				let u=this.D_Link_Omit(cf,x);
				const {style,navigationEndpoint,...y}=this.s(`${cf}:omit`,u); this.g(y);
				this.D_CompactLink_NavEndpoint(navigationEndpoint);
			} break;
			case "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR": {
				let u=this.D_Link_Omit(cf,x);
				const {style,navigationEndpoint,...y}=this.s(`${cf}:omit`,u); this.g(y);
				this.D_CompactLink_NavEndpoint(navigationEndpoint);
			} break;
			case "COMPACT_LINK_STYLE_TYPE_CREATION_MENU": {
				let u=this.D_Link_Omit(cf,x);
				const {icon,style,navigationEndpoint,...y}=this.s(`${cf}.icon`,u); this.g(y);
				this.D_CompactLink_NavEndpoint(navigationEndpoint);
			} break;
		}
	}
	/** @private @arg {D_CompactLink} x */
	D_CompactLink(x) {
		const cf="D_CompactLink"; this.k(cf,x);
		if("style" in x) {return this.D_CompactLink_Styled(`${cf}.Styled`,x);}
		if("icon" in x) {
			let u=this.D_Link_Omit(cf,x);
			const {icon,...y}=this.s(`${cf}.icon`,u); this.g(y);
			switch(x.icon.iconType) {
				case "PERSON_ADD": break;
				default: debugger; break;
			}
			return;
		}
		this.make_codegen_group(cf,x);
	}
	/** @private @template {D_CompactLink} T @arg {CF_D_Link} cf @arg {T} x */
	D_Link_Omit(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow"; this.k(cf,x);
		const {header,content,trackingParams,onCloseCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_PdgBuyFlowHeader(header);
		this.z(content,x => {
			if(!x.superVodBuyFlowContentRenderer) debugger;
			return this.R_SuperVodBuyFlowContent(x);
		});
		this.trackingParams(cf,trackingParams);
		if("getSurveyCommand" in onCloseCommand) {this.C_GetSurvey(onCloseCommand);} else {debugger;}
	}
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar"; this.k(cf,x);
		const {items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_PlaylistSidebarItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @type {string[]} */
	known_target_id=[];
	/** @protected @arg {string} cf1 @arg {D_TargetIdStr} x */
	targetId(cf1,x) {
		const cf2="targetId";
		this.save_string(`[${cf1}.${cf2}]`,x);
		this.parser.parse_target_id(x);
		if(this.str_starts_with(x,"comment-replies-item-")) return;
		if(this.str_starts_with(x,"shopping_panel_for_entry_point_")) {
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
		if(this.str_starts_with(x,"browse-feed")) return;
		switch(x) {
			default: x===""; this.codegen_case(`D_TargetIdStr:${cf2}`,x); break;
			case "clip-info-button":
			case "create-clip-button-action-bar":
			case "comments-section":
			case "engagement-panel-ads": case "engagement-panel-clip-create": case "engagement-panel-comments-section":
			case "engagement-panel-macro-markers-description-chapters": case "engagement-panel-searchable-transcript-search-panel":
			case "engagement-panel-searchable-transcript": case "engagement-panel-structured-description":
			case "engagement-panel-macro-markers-auto-chapters": case "feed_filter_chip_bar_second_chip":
			case "search-feed": case "search-page": case "sponsorships-button":
			case "watch-next-feed": case "watch-related-menu-button":
		}
	}
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
	/** @private @arg {string} cf @arg {string} k_arg @arg {string} x */
	add_string_to_map(cf,k_arg,x) {
		let k=`${cf}:${k_arg}`;
		let group_arr=this.strings_map.get(cf);
		if(!group_arr) this.strings_map.set(cf,group_arr=[]);
		let group_entry=group_arr.find(e => e[0]===k);
		x: {
			if(!group_entry) break x;
			if(group_entry[1].includes(x)) return;
			group_entry[1].push(x);
		}
		group_arr.push([k,[x]]);
	}
	/** @private @type {Map<string,string[]>} */
	missing_codegen_types=new Map;
	/** @private @arg {string} cf @arg {{}} x */
	codegen_typedef_all(cf,x) {
		let res=this.codegen.codegen_typedef(cf,x,true);
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
		{debugger;}
	}
	static {this.prototype.D_Button_SE;}
	/** @private @arg {D_Button_SE} x */
	D_Button_SE(x) {
		const cf="D_Button_SE"; this.k(cf,x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("ypcGetOffersEndpoint" in x) return this.E_YpcGetOffers(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("unsubscribeEndpoint" in x) return this.E_Unsubscribe(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	static {this.prototype.Button_navigationEndpoint;}
	/** @private @arg {GE_Button_navigation} x */
	Button_navigationEndpoint(x) {
		const cf="Button_navigationEndpoint"; this.k(cf,x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @template {string} T @arg {T[]} expected_arr @arg {T[]} missing_arr @arg {CF_onMissingIcon} cf @arg {T_Icon<T>} icon @template {{icon:T_Icon<T>;}} U @arg {U} x */
	onMissingIcon(cf,icon,x,expected_arr,missing_arr) {
		expected_arr.push(icon.iconType);
		missing_arr.push(icon.iconType);
		let arr_items=JSON.stringify(missing_arr,null,"\t");
		console.group("-- [D_Button.codegen] --");
		try {
			console.log("-- [D_Button.icon] --",arr_items);
			this.codegen_typedef_all(cf,x);
		} finally {console.groupEnd();}
	}
	/** @protected @arg {CF_D_Button} cf @arg {Extract<D_Button,{icon:any;}>["icon"]} icon @arg {Extract<D_Button,{icon:any;}>} x */
	D_Button_Icon(cf,icon,x) {
		let missing=this.T_Icon_AnyOf("D_Icon_Button",icon,this.Button_iconType);
		if(missing) this.onMissingIcon(cf,icon,x,this.Button_iconType,this.Button_missing_iconType);
	}
	/** @private @arg {D_Button_NavEP} x */
	D_Button_navigationEndpoint(x) {
		const cf="D_Button.navigationEndpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		debugger;
	}
	/** @private @arg {D_Button} x */
	D_Button(x) {
		/** @type {"D_Button"|`D_Button:${keyof D_Button}`} */
		let cf="D_Button";
		if("serviceEndpoint" in x) cf="D_Button:serviceEndpoint";
		else if("command" in x) cf="D_Button:command";
		else if("style" in x) cf="D_Button:style";
		const {style,size,isDisabled,serviceEndpoint,text,icon,navigationEndpoint,accessibility,tooltip,trackingParams,accessibilityData,targetId,command,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(targetId,x => {
			this.targetId(cf,x);
			switch(x) {
				default: debugger; x===""; break;
				case "clip-info-button":
				case "create-clip-button-action-bar":
			}
		});
		this.t(serviceEndpoint,this.D_Button_SE);
		this.t(style,x => {
			switch(x) {
				default: debugger; x===""; break;
				case "STYLE_PRIMARY":
				case "STYLE_OPACITY":
				case "STYLE_SUGGESTIVE":
				case "STYLE_TEXT":
				case "STYLE_BLUE_TEXT":
				case "STYLE_DEFAULT":
			}
		});
		this.t(isDisabled,x => {if(x!==false) debugger;});
		this.t(text,this.G_Text);
		this.t(icon,x => this.T_Icon(`${cf}.icon`,x));
		this.t(navigationEndpoint,this.D_Button_navigationEndpoint);
		this.t(accessibility,this.D_Label);
		this.t(tooltip,this.a_primitive_str);
		this.trackingParams(cf,trackingParams);
		this.t(accessibilityData,this.D_Accessibility);
		this.t(command,this.GC_Button);
	}
	/** @private @arg {D_PdgBuyFlowHeader} x */
	D_PdgBuyFlowHeader(x) {
		const cf="D_PdgBuyFlowHeader";
		const {text,helpButton,dismissButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.R_Button(helpButton);
		this.R_Button(dismissButton);
	}
	/** @private @arg {RG_Result} x */
	RG_Result(x) {
		const cf="RG_Result"; this.k(cf,x);
		if("tabRenderer" in x) return this.R_Tab(x);
		if("expandableTabRenderer" in x) return this.R_ExpandableTab(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>['endpoint']} x */
	D_Tab_subscriptionsEndpoint(x) {
		const cf="D_Tab_subscriptionsEndpoint"; this.k(cf,x);
		switch(x.commandMetadata.webCommandMetadata.rootVe) {
			default: this.codegen_typedef_all(cf,x); debugger; break;
			case 96368: break;
		}
		this.GE_Browse(x);
	}
	/** @private @arg {D_Tab} x */
	D_Tab(x) {
		const cf="D_Tab"; this.k(cf,x);
		if("tabIdentifier" in x) {
			switch(x.tabIdentifier) {
				default: debugger; break;
				case "FEhistory": {
					const {selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(`${cf}_History`,x); this.g(y);
					if(selected!==true) debugger;
					if(!content.sectionListRenderer) debugger;
					this.R_SectionList(content);
					this.trackingParams(cf,trackingParams);
				} break;
				case "FEsubscriptions": {
					const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(`${cf}_Subscriptions`,x); this.g(y);
					this.D_Tab_subscriptionsEndpoint(endpoint);
					if(selected!==true) debugger;
					if(!content.sectionListRenderer) debugger;
					this.R_SectionList(content);
					this.trackingParams(cf,trackingParams);
				} break;
				case "FEwhat_to_watch": {
					const {selected,content,tabIdentifier: {},trackingParams,...y}=this.s(`${cf}_WhatToWatch`,x); this.g(y);
					if(selected!==true) debugger;
					if(!content.richGridRenderer) debugger;
					this.R_RichGrid(content);
					this.trackingParams(cf,trackingParams);
				} break;
			}
			return;
		}
		if("selected" in x) {return;}
		/** @type {`${cf}_${"R_MusicQueue"}`} */
		const new_cf=`${cf}_${"R_MusicQueue"}`;
		{
			const cf=new_cf;
			const {content,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_MusicQueue(content);
			this.trackingParams(cf,trackingParams);
		}
	}
	/** @private @arg {D_MusicQueue} x */
	D_MusicQueue(x) {
		const cf="D_MusicQueue"; this.k(cf,x);
		const {content,hack,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(content,this.R_PlaylistPanel);
		this.t(hack,x => {if(x!==true) debugger;});
	}
	/** @private @template {D_RichGrid} T @arg {"D_RichGrid"} cf @arg {T} x */
	D_RichGrid_Omit(cf,x) {
		const {contents,header,trackingParams,targetId,reflowOptions,...y}=this.s(cf,x);
		if(targetId!=="browse-feedFEwhat_to_watch") debugger;
		this.z(contents,this.D_RichGridContent);
		this.R_FeedFilterChipBar(header);
		this.trackingParams(cf,trackingParams);
		if(reflowOptions.minimumRowsOfVideosAtStart!==2) debugger;
		if(reflowOptions.minimumRowsOfVideosBetweenSections!==1) debugger;
		return y;
	}
	/** @private @arg {D_RichGrid} x */
	D_RichGrid(x) {
		const cf="D_RichGrid"; this.k(cf,x);
		if("masthead" in x) {
			const {masthead,...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
			this.R_AdSlot(masthead);
			return;
		}
		const {...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
	}
	/** @private @arg {D_RichItem} x */
	D_RichItem(x) {
		const cf="D_RichItem"; this.k(cf,x);
		if("rowIndex" in x) {
			const {content,trackingParams,rowIndex,colIndex,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_RichItemContent(content);
			this.trackingParams(cf,trackingParams);
			this.save_number("Item.pos",[rowIndex,colIndex]);
			return;
		}
		const {content,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_RichItemContent(content);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_VideoLike_richThumbnail} x */
	D_VideoLike_richThumbnail(x) {
		const cf="D_VideoLike_richThumbnail"; this.k(cf,x);
		if("movingThumbnailRenderer" in x) return this.R_MovingThumbnail(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_MovingThumbnail} x */
	D_MovingThumbnail(x) {
		const cf="D_MovingThumbnail"; this.k(cf,x);
		const {movingThumbnailDetails,enableHoveredLogging,enableOverlay,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(movingThumbnailDetails,x => {
			if("logAsMovingThumbnail" in x) {
				const cf="D_MovingThumbnail_Thumbnails";
				const {logAsMovingThumbnail,...y}=this.s(cf,x);
				return this.D_Thumbnail(y);
			}
			this.D_Thumbnail(x);
		});
		if(enableHoveredLogging!==true) debugger;
		if(enableOverlay!==true) debugger;
	}
	/** @private @arg {D_Radio} x */
	D_Radio(x) {
		const cf="D_Radio"; this.k(cf,x);
		let {...y}=this.Omit_Menu_Radio(cf,x);
		const {videos,...z}=this.s(cf,y); this.g(z);/*#destructure_done*/
		this.z(videos,this.R_ChildVideo);
	}
	/** @private @arg {D_ChildVideo} x */
	D_ChildVideo(x) {
		const cf="D_ChildVideo"; this.k(cf,x);
		let y=this.D_ChildVideo_Omit(cf,x);
		this.g(y);
	}
	/** @private @template {D_ChildVideo_Omit} T @arg {"D_ChildVideo"} cf @arg {T} x */
	D_ChildVideo_Omit(cf,x) {
		let {title,navigationEndpoint,lengthText,videoId,...y}=this.s(cf,x);
		this.G_Text(title);
		this.E_Watch(navigationEndpoint);
		this.G_Text(lengthText);
		this.videoId(videoId);
		return y;
	}
	/** @private @template {D_Omit_Menu_Radio&D_Omit_Compact_Player} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	D_Omit_Menu_Radio(cf,x) {
		let {navigationEndpoint,menu,...y}=this.D_Omit_Compact_Player(cf,x);
		this.R_Menu(menu);
		return y;
	}
	/** @private @arg {D_Thumbnail} x */
	D_Thumbnail(x) {
		const cf="D_Thumbnail"; this.k(cf,x);
		const {sampledThumbnailColor,accessibility,isOriginalAspectRatio,thumbnails: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(sampledThumbnailColor,x => this.D_Color(x));
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D_Accessibility);
		this.z(a,this.D_ThumbnailItem);
	}
	/** @private @arg {GR_MP_MenuNotificationSection_Item} x */
	GR_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item"; this.k(cf,x);
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @template {D_CompactPlaylist|D_Radio|D_CompactRadio} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	Omit_Menu_Radio(cf,x) {
		if("adSlotMetadata" in x) {debugger; throw new Error();}
		let u=this.D_Omit_Menu_Radio(cf,x);
		let {playlistId,thumbnail,videoCountText,thumbnailText,longBylineText,videoCountShortText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.playlistId(playlistId);
		this.D_Thumbnail(thumbnail);
		this.G_Text(videoCountText);
		this.G_Text(thumbnailText);
		this.G_Text(longBylineText);
		this.G_Text(videoCountShortText);
		return y;
	}
	/** @private @template T @template {T} U @arg {T} v1 @arg {U} v2 */
	ceq(v1,v2) {if(v1!==v2) {debugger; return false;}; return true;}
	/** @private @returns {true} */
	true_() {return true;}
	/** @private @template {{}} T @arg {string} cf @arg {T} x */
	rl(cf,x) {
		this.k(`${cf}:omit`,x);
		return x;
	}
	/** @private @arg {CF_D_Video_Handle} cf @arg {D_Video} x */
	D_Video_Handle(cf,x) {
		let u=this.D_Video_Omit(cf,x);
		const {descriptionSnippet,publishedTimeText,lengthText,viewCountText,ownerBadges,badges,upcomingEventData,shortViewCountText,isWatched,topStandaloneBadge,richThumbnail,inlinePlaybackEndpoint,owner,buttons,...y}=this.rl(cf,u); this.g(y);/*#destructure_done*/
		this.t(descriptionSnippet,this.G_Text);
		this.t(publishedTimeText,this.G_Text);
		this.t(lengthText,this.G_Text);
		this.t(viewCountText,this.G_Text);
		this.tz(ownerBadges,this.RMD_Badge);
		this.tz(badges,this.RMD_Badge);
		this.t(upcomingEventData,x => {
			const {isReminderSet,startTime,upcomingEventText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(isReminderSet!==false) debugger;
			this.a_primitive_str(startTime);
			this.G_Text(upcomingEventText);
		});
		this.t(owner,this.D_Video_Owner);
		this.t(shortViewCountText,this.G_Text);
		this.t(isWatched,x => this.ceq(x,this.true_()));
		this.t(topStandaloneBadge,this.RMD_Badge);
		this.t(richThumbnail,this.R_MovingThumbnail);
		this.t(inlinePlaybackEndpoint,this.D_Video_inlinePlaybackEndpoint);
		this.tz(buttons,this.R_ToggleButton);
	}
	/** @private @arg {"D_Video_Other"|"D_Video_With:accessibility"|"D_Video_With:owner"|"D_Video_With:videoId"|"D_Video_With:videoId:topStandaloneBadge"|"D_Video_With:videoId:descriptionSnippet"} cf @arg {D_Video} x */
	D_Video_With_Add_IsWatched(cf,x) {
		if("isWatched" in x) return this.D_Video_Handle(`${cf}:isWatched`,x);
		return this.D_Video_Handle(cf,x);
	}
	/** @private @arg {D_Video} x */
	D_Video_With_VideoId(x) {
		const cf="D_Video_With:videoId";
		if("topStandaloneBadge" in x) return this.D_Video_With_Add_IsWatched(`${cf}:topStandaloneBadge`,x);
		if("descriptionSnippet" in x) return this.D_Video_With_Add_IsWatched(`${cf}:descriptionSnippet`,x);
		return this.D_Video_With_Add_IsWatched(cf,x);
	}
	/** @private @arg {D_Video} x */
	D_Video_With_Owner(x) {
		const cf="D_Video_With:owner";
		return this.D_Video_With_Add_IsWatched(cf,x);
	}
	/** @private @arg {D_Video} x */
	D_Video(x) {
		if("accessibility" in x) {
			return this.D_Video_With_Add_IsWatched("D_Video_With:accessibility",x);
		}
		if("owner" in x) return this.D_Video_With_Owner(x);
		if("videoId" in x) return this.D_Video_With_VideoId(x);
		console.log("video.other",this.get_keys_of(x).join());
		debugger;
		this.D_Video_With_Add_IsWatched("D_Video_Other",x);
	}
	/** @private @arg {D_ToggleButton["defaultServiceEndpoint"]} x */
	D_Button_DefServiceEP(x) {
		const cf="D_Button_DefServiceEP"; this.k(cf,x);
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_ToggleButton["toggledServiceEndpoint"]} x */
	D_Button_ToggledServiceEP(x) {
		const cf="D_Button_ToggledServiceEP"; this.k(cf,x);
		if("likeEndpoint" in x) return this.E_Like(x);
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @private @arg {any} z @template {D_ToggleButton} T @arg {CF_D_ToggleButton} cf @arg {T} x @returns {T extends infer V?Omit<V, T_Split<"style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,trackingParams,toggledStyle">[number]>:never} */
	D_ToggleButton_Omit(cf,x,z=null) {
		const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,trackingParams,toggledStyle,...y}=this.s(cf,x); z=y;
		this.save_string("[D_ToggleButton.style]",style.styleType);
		this.ceq(isDisabled,false);
		this.a_primitive_bool(isToggled);
		this.save_string("[D_ToggleButton.defaultIcon.type]",defaultIcon.iconType);
		this.D_Button_DefServiceEP(defaultServiceEndpoint);
		this.D_Button_ToggledServiceEP(toggledServiceEndpoint);
		this.trackingParams(cf,trackingParams);
		this.save_string("[D_ToggleButton.toggledStyle.type]",toggledStyle.styleType);
		return z;
	}
	/** @private @arg {D_ToggleButton} x */
	D_ToggleButton(x) {
		const cf="D_ToggleButton";
		// const {defaultText,toggledText,accessibility,defaultTooltip,toggledTooltip,toggleButtonSupportedData,targetId,accessibilityData,...y}=u; this.g(y);/*#destructure_done*/
		// this.G_Text(defaultText);
		// this.G_Text(toggledText);
		// this.D_Label(accessibility);
		// this.a_primitive_str(defaultTooltip);
		// this.a_primitive_str(toggledTooltip);
		// this.save_string("[D_ToggleButton.targetId]",targetId);
		x: {
			const k="toggledAccessibilityData";
			if(!(k in x)) break x;
			/** @type {`${cf}:${k}`} */
			const cf1=`${cf}:${k}`;
			const {toggledAccessibilityData,accessibilityData,...y}=this.D_ToggleButton_Omit(cf1,x); this.g(y);/*#destructure_done*/
			this.D_Accessibility(toggledAccessibilityData);
			this.D_Accessibility(accessibilityData);
			return;
		}
		x: {
			const k="defaultText";
			if(!(k in x)) break x;
			/** @type {`${cf}:${k}`} */
			const cf1=`${cf}:${k}`;
			const {defaultText,toggledText,accessibility,defaultTooltip,toggledTooltip,accessibilityData,toggleButtonSupportedData,targetId,...y}=this.D_ToggleButton_Omit(cf1,x); this.g(y);/*#destructure_done*/
			return;
		}
		x: {
			const k="accessibilityData";
			if(!(k in x)) break x;
			/** @type {`${cf}:${k}`} */
			const cf1=`${cf}:${k}`;
			const {accessibilityData,accessibility,defaultTooltip,toggledTooltip,toggleButtonSupportedData,targetId,...y}=this.D_ToggleButton_Omit(cf1,x); this.g(y);/*#destructure_done*/
			this.D_Accessibility(accessibilityData);
			this.add_string_to_map(cf,"accessibilityData.accessibilityData.label",accessibilityData.accessibilityData.label);
			this.D_Label(accessibility);
			this.add_string_to_map(cf,"defaultTooltip",defaultTooltip);
			this.add_string_to_map(cf,"toggledTooltip",toggledTooltip);
			this.D_ToggleButtonIdData(toggleButtonSupportedData);
			if(targetId!=="watch-dislike") debugger;
			return;
		}
		x: {
			const k="accessibility";
			if(!(k in x)) break x;
			/** @type {`${cf}:${k}`} */
			const cf1=`${cf}:${k}`;
			const {size,accessibility,defaultTooltip,toggledTooltip,...y}=this.D_ToggleButton_Omit(cf1,x); this.g(y);/*#destructure_done*/
			if(size.sizeType!=="SIZE_DEFAULT") debugger;
			this.D_Label(accessibility);
			this.add_string_to_map(cf,"defaultTooltip",defaultTooltip);
			this.add_string_to_map(cf,"toggledTooltip",toggledTooltip);
			return;
		}
		debugger;
	}
	/** @template T,U @arg {T_Id<T>} x @arg {(this:this,x:T)=>U} f */
	T_Id(x,f) {return f.call(this,x.id);}
	/** @private @arg {CF_D_Menu_Omit} cf @template {{thumbnailOverlays:G_ThumbnailOverlayItem[]}} T @arg {T} x */
	D_Omit_ThumbnailOverlay(cf,x) {
		const {thumbnailOverlays,...y}=this.s(cf,x);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		return y;
	}
	/** @private @arg {D_CompactVideo["navigationEndpoint"]} x */
	D_ThumbnailOverlay_NavEP(x) {
		if("reelWatchEndpoint" in x) return this.E_ReelWatch(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		let k=this.get_keys_of(x);
		k.pop()==="";
	}
	/** @private @template {D_CompactVideo|D_Video} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	D_ThumbnailOverlay_Omit(cf,x) {
		const {trackingParams,menu,title,videoId,navigationEndpoint,thumbnail,longBylineText,shortBylineText,...y}=this.D_Omit_ThumbnailOverlay(cf,x);
		this.trackingParams(cf,trackingParams);
		this.R_Menu(menu);
		this.G_Text(title);
		this.videoId(videoId);
		this.D_ThumbnailOverlay_NavEP(navigationEndpoint);
		this.D_Thumbnail(thumbnail);
		this.G_Text(longBylineText);
		this.G_Text(shortBylineText);
		return y;
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {D_Video} T @arg {T} x */
	D_Video_Omit(cf,x) {
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {ownerText,showActionMenu,channelThumbnailSupportedRenderers,...y}=u;
		this.G_Text(ownerText);
		if(showActionMenu!==false) debugger;
		this.R_ChannelThumbnailWithLink(channelThumbnailSupportedRenderers);
		return y;
	}
	/** @private @arg {D_Video_Owner} x */
	D_Video_Owner(x) {
		const cf="D_Video_Owner"; this.k(cf,x);
		const {thumbnail,navigationEndpoint,accessibility,title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.GE_Browse(navigationEndpoint);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(title);
	}
	/** @private @template {D_ChannelThumbnailWithLink} T @arg {"D_ChannelThumbnailWithLink"} cf @arg {T} x */
	D_ChannelThumbnailWithLink_Omit(cf,x) {
		const {thumbnail,navigationEndpoint,accessibility,...y}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.D_ChannelThumbnail_navigationEndpoint(navigationEndpoint);
		this.D_Accessibility(accessibility);
		return y;
	}
	/** @private @arg {D_ChannelThumbnailWithLink} x */
	D_ChannelThumbnailWithLink(x) {
		const cf="D_ChannelThumbnailWithLink"; this.k(cf,x);
		if("title" in x) {
			const {title,...y}=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
			this.a_primitive_str(title);
			return;
		}
		let y=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
	}
	/** @private @arg {D_ChannelThumbnailWithLink['navigationEndpoint']} x */
	D_ChannelThumbnail_navigationEndpoint(x) {
		const cf="D_ChannelThumbnail_navigationEndpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_Video_inlinePlaybackEndpoint} x */
	D_Video_inlinePlaybackEndpoint(x) {
		const cf="D_Video_inlinePlaybackEndpoint"; this.k(cf,x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_Color} x */
	D_Color(x) {
		if(!this.eq_keys(this.get_keys_of(x),["red","green","blue"])) debugger;
		this.z(Object.values(x),x => this._primitive_of(x,"number"));
	}
	/** @private @arg {D_ThumbnailItem} x */
	D_ThumbnailItem(x) {
		const cf="D_ThumbnailItem"; this.k(cf,x);
		const {url,width,height,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(url);
		this.t(width,x => this._primitive_of(x,"number"));
		this.t(height,x => this._primitive_of(x,"number"));
	}
	/** @protected @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail"; this.k(cf,x);
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Page(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType"; this.k(cf,x);
		this.RC_ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.RS_Page_Browse(x);
			case "watch": return this.RS_WatchPage(x);
			case "channel": return this.RS_ChannelPage(x);
			case "playlist": return this.G_RS_Page_Playlist(x);
			case "settings": return this.G_RS_Page_Settings(x);
			case "shorts": return this.G_RS_Page_Shorts(x);
			case "search": return this.RS_SearchPage(x);
			default: break;
		}
		console.log("pt",x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu"; this.k(cf,x);
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist"; this.k(cf,x);
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey"; this.k(cf,x);
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow"; this.k(cf,x);
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let pu=this.TA_OpenPopup("TA_OpenPopup:R_PdgBuyFlow",command);
		if("pdgBuyFlowRenderer" in pu) {this.R_PdgBuyFlow(pu);}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(cf,trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent"; this.k(cf,x);
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([description,disclaimerText],this.G_Text);
		this.R_Button(buyButton);
		this.trackingParams(cf,trackingParams);
		this.R_PdgCommentPreview(commentPreview);
		this.R_PdgColorSlider(colorSlider);
		console.log("defaultPriceTier",defaultPriceTier);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {D_PdgColorSlider} x */
	D_PdgColorSlider(x) {
		const cf="D_PdgColorSlider"; this.k(cf,x);
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(notches,this.D_NotchesItem);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
		this.G_Text(maxTierValue);
		this.G_Text(minTierValue);
	}
	/** @private @arg {D_NotchesItem} x */
	D_NotchesItem(x) {
		const cf="NotchesItem"; this.k(cf,x);
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(linearGradientCssStyle) {debugger;}
		if(knobColorArgb!==4280191205) debugger;
		this.E_YpcGetCart(purchaseCommand);
		this.G_Text(tierValue);
	}
	/** @private @arg {D_Survey_Watch} x */
	D_Survey_Watch(x) {this.y("D_Survey_Watch","watch",x,this.B_Hack);}
	codegen_group_id=1;
	/** @private @arg {string} cf @arg {{}} x */
	make_codegen_group(cf,x,collapsed=true) {
		let u_name=this.get_codegen_name(x);
		let gca=[`[codegen_group] [#%o] [%s] -> [%s]`,this.codegen_group_id++,cf,u_name];
		if(collapsed) {console.groupCollapsed(...gca);} else {console.group(...gca);}
		console.log("[starting codegen] %s",`[${cf}_${u_name}]`);
		this.codegen.codegen_typedef(`${cf}$${u_name}`,x);
		console.groupEnd();
	}
	/** @private @arg {{[U in string]: unknown}} x */
	_decode_WCM(x) {
		if("rootVe" in x) {return `M_VE${x.rootVe}`;}
		return null;
	}
	renderer_decode_map=new Map([
		["PrefetchHintConfig","R_PrefetchHintConfig"],
	]);
	ignore_incorrect_name_set=new Set([
		"D_CommonConfig",
	]);
	/** @private @arg {object} x1 */
	get_codegen_name(x1) {
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
		let ren_dec=this.renderer_decode_map.get(dec);
		if(ren_dec) {return ren_dec;}
		return this.codegen.get_auto_type_name(x);
	}
	/** @private @arg {RS_UpdateMetadata} x */
	RSU_M(x) {
		const cf="RSU_M"; this.k(cf,x);
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
		this.y("UA_Description","updateDescriptionAction",x,x => {
			this.save_keys(`[UA_DescriptionData]`,x);
			this.G_Text(x.description);
		});
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
	/** @private @arg {RS_Search} x */
	RS_Search(x) {
		const cf="RS_Search"; this.k(cf,x);
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(estimatedResults);
		this.R_TwoColumnSearchResults(contents);
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(topbar);
		this.z(refinements,this.a_primitive_str);
		this.z(onResponseReceivedCommands,x => {
			if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		});
		this.targetId(cf,targetId);
	}
	/** @private @arg {RSG_SearchSuggestions} x */
	RSG_SearchSuggestions(x) {
		const cf="RSG_SearchSuggestions"; this.k(cf,x);
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {B_Hack} x */
	B_Hack(x) {
		const cf="B_Hack"; this.k(cf,x);
		const {hack,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(hack!==true) debugger;
	}
	static {(new this({value: null})).R_PlayerAnnotationsExpanded;}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded"; this.k(cf,x);
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
		this.a_primitive_bool(allowSwipeDismiss);
	}
	/** @private @arg {D_UUIDString} x */
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
		const cf="D_FeaturedChannel"; this.k(cf,x);
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([startTimeMs,endTimeMs],this.a_primitive_str);
		this.D_Thumbnail(watermark);
		this.trackingParams(cf,trackingParams);
		this.GE_Browse(navigationEndpoint);
		this.a_primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
	}
	/** @arg {CF_D_STR} cf @arg {string} x */
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
	/** @private @arg {`UC${string}`} x */
	D_ChannelId(x) {
		const cf="D_ChannelId"; this.k(cf,x);
		if(this.str_starts_with_rx("UC",x)) {
			if(x.length===24) return;
			console.log("[channelId.length]",x.length);
			return;
		}
		this.codegen_str(cf,x);
	}
	/** @private @template {D_SubscribeButton} T @arg {"D_SubscribeButton"} cf @arg {T} x @returns {[u1,x1]} */
	D_SubscribeButton_Omit(cf,x) {
		const {buttonText,subscribed,enabled,type,channelId,trackingParams,showPreferences,...y}=this.s(cf,x);
		this.G_Text(buttonText);
		this._primitive_of(subscribed,"boolean");
		if(enabled!==true) debugger;
		if(type!=="FREE") debugger;
		this.D_ChannelId(channelId);
		this.trackingParams(cf,trackingParams);
		if(showPreferences!==false) debugger;
		let [u1,x1]=this.unwrap_prefix(y,"subscribed");
		return [u1,x1];
	}
	/** @arg {"D_SubscribeButton"} cf @arg {T_RemovePrefix<D_SubscribeButton,"subscribed">} x */
	D_SubButton_Prefix_1(cf,x) {
		const {buttonText,entityKey,...y}=this.s(`${cf}.subscribed`,x); this.g(y);
		this.G_Text(buttonText);
		this.t(entityKey,x => this.params(cf,"entity_key.subscribed",x));
	}
	/** @template {Extract<D_SubscribeButton,{subscribedButtonText:any}>} T @arg {"D_SubscribeButton"} cf @arg {T} x @returns {YRet} */
	D_SubButton_Omit_Button(cf,x) {
		const [sub,o1]=this.D_SubscribeButton_Omit(cf,x);
		this.D_SubButton_Prefix_1(cf,sub);
		let [un_sub,o2]=this.unwrap_prefix(o1,"unsubscribed");
		/** @arg {T_RemovePrefix<D_SubscribeButton,"unsubscribed">} x */
		let r_un_sub=({...x}) => {
			const {buttonText,...y}=this.s(`${cf}.unsubscribed`,x); this.g(y);
			this.G_Text(buttonText);
		};
		r_un_sub(un_sub);
		let [sub_2,o3]=this.unwrap_prefix(o2,"subscribe");
		let [un_sub_2,o4]=this.unwrap_prefix(o3,"unsubscribe");
		/** @arg {T_RemovePrefix<Omit<D_SubscribeButton,`subscribed${string}`>,"subscribe">} x */
		let r_sub_2=({...x}) => {
			const {accessibility,...y}=this.s(`${cf}.subscribe`,x); this.g(y);
			this.D_Accessibility(accessibility);
		};
		r_sub_2(sub_2);
		/** @arg {T_RemovePrefix<Omit<D_SubscribeButton,`unsubscribed${string}`>,"unsubscribe">} x */
		let r_un_sub_2=({...x}) => {
			const {buttonText,accessibility,...y}=this.s(`${cf}.unsubscribe`,x); this.g(y);
			this.G_Text(buttonText);
			this.D_Accessibility(accessibility);
		};
		r_un_sub_2(un_sub_2);
		/** @typedef {typeof o4} YRet */
		return o4;
	}
	/** @private @arg {D_SubscribeButton} x */
	D_SubscribeButton(x) {
		const cf="D_SubscribeButton"; this.k(cf,x);
		const {onSubscribeEndpoints,onUnsubscribeEndpoints,targetId,notificationPreferenceButton,...y}=this.D_SubButton_Omit_Button(cf,x); this.g(y);
		this.z(onSubscribeEndpoints,this.E_Subscribe);
		this.z(onUnsubscribeEndpoints,this.E_SignalService_SendPost);
		this.t(targetId,x => this.ceq(x,"watch-subscribe"));
		this.t(notificationPreferenceButton,this.R_SubscriptionNotificationToggleButton);
	}
	/** @private @arg {RSL_Like} x */
	RSL_Like(x) {
		const cf="RSL_Like"; this.k(cf,x);
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
	}
	/** @private @arg {RSL_Dislike} x */
	RSL_Dislike(x) {
		const cf="RSL_Dislike"; this.k(cf,x);
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
	}
	/** @private @arg {RSL_RemoveLike} x */
	RSL_RemoveLike(x) {
		const cf="RSL_RemoveLike"; this.k(cf,x);
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		}));
	}
	/** @private @arg {RS_ReelWatchSequence} x */
	RS_ReelWatchSequence(x) {
		const cf="RS_ReelWatchSequence"; this.k(cf,x);
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,x => this.T_Command_TP(x,this.E_ReelWatch));
		this.trackingParams(cf,trackingParams);
		this.t(continuationEndpoint,this.C_Continuation);
	}
	/** @private @arg {RS_GetLiveChat} x */
	RS_GetLiveChat(x) {
		const cf="RS_GetLiveChat"; this.k(cf,x);
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_LiveChat(a1);
		this.t_cf(cf,a2,this.trackingParams);
	}
	/** @private @arg {D_NotificationMenu_Popup_SectionItem} x */
	D_NotificationMenu_Popup_SectionItem(x) {
		const cf="D_NotificationMenu_Popup_SectionItem"; this.k(cf,x);
		if("multiPageMenuNotificationSectionRenderer" in x) return this.R_MP_MenuNotificationSection(x);
		x===""; this.codegen_typedef_all(cf,x);
		return null;
	}
	/** @private @arg {D_MP_MenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection"; this.k(cf,x);
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.z(items,this.GR_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {D_NotificationMenu_PopupItem} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem"; this.k(cf,x);
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_NotificationMenu_Popup} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup"; this.k(cf,x);
		const {popupType: a,popup: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(a!=="DROPDOWN") {this.codegen_typedef_all(cf,x); return null;}
		return b;
	}
	/** @private @arg {RSG_NotificationMenu_Action} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action"; this.k(cf,x);
		if("openPopupAction" in x) return this.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		x===""; this.codegen_typedef_all(cf,x);
		return null;
	}
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu"; this.k(cf,x);
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [ar]=this.z(actions,this.RSG_NotificationMenu_Action);
		let [u2]=this.z(ar,this.D_NotificationMenu_Popup);
		let [u3]=this.z(u2,x => this.TR_MultiPageMenu("D_NotificationMenu_PopupItemMenu",x));
		this.z(u3,this.D_NotificationMenu_PopupItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader"; this.k(cf,x);
		const {title,buttons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next"; this.k(cf,x);
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(contents,this.G_NextContents);
		this.t(currentVideoEndpoint,this.E_Watch);
		this.trackingParams(cf,trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.GE_ResponseReceived(cf,a));
		this.tz(engagementPanels,this.R_EngagementPanelSectionList);
		this.t(topbar,this.R_DesktopTopbar);
		this.tz(pageVisualEffects,this.R_CinematicContainer);
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		this.t(videoReporting,this.R_ReportFormModal);
		this.t(queueContextParams,a => this.params(cf,"next.queue_context_params",a));
		this.t(continuationContents,this.RC_PlaylistPanel);
	}
	/** @private @arg {RC_SectionList} x */
	RC_SectionList(x) {this.H_("RC_SectionList","sectionListContinuation",x,this.GD_RC_SectionList);}
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("RC_PlaylistPanel","playlistPanelContinuation",x,this.g);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("RC_LiveChat","liveChatContinuation",x,this.DC_LiveChat);}
	/** @private @arg {RC_MainAppWebResponseContext} x */
	RC_MainAppWebResponseContext(x) {
		const cf="RC_MainAppWebResponseContext"; this.k(cf,x);
		const {datasyncId,loggedOut,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(datasyncId);
		this._primitive_of(loggedOut,"boolean");
	}
	/** @override @protected @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {
		const cf="RC_ResponseContext"; this.k(cf,x);
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(mainAppWebResponseContext,this.RC_MainAppWebResponseContext);
		this.z(serviceTrackingParams,x => {
			if(!this.is_normal_service(this)) return;
			const service_tracking=this.x.get("service_tracking");
			service_tracking.set_service_params(x);
		});
		this.t(webResponseContextExtensionData,this.RC_WR_ContextExtension);
		this.t(consistencyTokenJar,this.RC_ConsistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.a_primitive_num(maxAgeSeconds);
		this.t(stateTags,this.RCA_RelevantStateTags);
	}
	/** @private @arg {RC_ConsistencyTokenJar} x */
	RC_ConsistencyTokenJar(x) {
		const cf="RC_ConsistencyTokenJar"; this.k(cf,x);
		const {encryptedTokenJarContents,expirationSeconds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @private @arg {RC_WR_ContextExtension} x */
	RC_WR_ContextExtension(x) {
		const cf="RC_WR_ContextExtension"; this.k(cf,x);
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(hasDecorated!==void 0) this._primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,this.D_YtConfig);
		this.t(webPrefetchData,this.D_WebPrefetch);
	}
	/** @private @arg {D_WebPrefetch} x */
	D_WebPrefetch(x) {
		const cf="D_WebPrefetch"; this.k(cf,x);
		const {navigationEndpoints,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(navigationEndpoints,x => {
			if("watchEndpoint" in x) {return this.E_Watch(x);}
		});
	}
	/** @private @arg {RCA_RelevantStateTags} x */
	RCA_RelevantStateTags(x) {
		const cf="RCA_RelevantStateTags"; this.k(cf,x);
		const {relevantStateTags,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(relevantStateTags,this.B_StateTag);
	}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults"; this.k(cf,x);
		const {tabs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,this.R_Tab);
	}
	/** @private @arg {D_CommentsHeader} x */
	D_CommentsHeader(x) {
		const cf="D_CommentsHeader"; this.k(cf,x);
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(countText);
		this.R_CommentSimplebox(createRenderer);
		this.R_SortFilterSubMenu(sortMenu);
		this.trackingParams(cf,trackingParams);
		this.G_Text(titleText);
		this.G_Text(commentsCount);
		if(showSeparator!==true) debugger;
		this.z(customEmojis,this.D_CustomEmoji);
		this.parser.parse_url(cf,as(unicodeEmojisUrl));
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_VoiceSearchDialog} x */
	D_VoiceSearchDialog(x) {
		const cf="D_VoiceSearchDialog"; this.k(cf,x);
		const {trackingParams,exitButton,...y}=this.s(cf,x);
		let u=Object.entries(y);
		for(let x of u) {
			let c=x[1];
			if("runs" in c) {
				this.G_Text(c);
				continue;
			}
		}
	}
	/** @private @arg {DC_ScrollToEngagementPanel} x */
	DC_ScrollToEngagementPanel(x) {
		const cf="DC_ScrollToEngagementPanel"; this.k(cf,x);
		const {targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
	}
	//#region pause
	//#endregion
	/** @private @arg {CF_T_SE_Signal} cf @template {{webCommandMetadata:any}} T @template U @arg {T_SE_Signal<T,U>} x @returns {[T,U]} */
	T_SE_Signal(cf,x) {
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @type {`T_SE_Signal:${CF_T_SE_Signal}`} */
		this.clickTrackingParams(`T_SE_Signal:${cf}`,clickTrackingParams);
		return [commandMetadata,signalServiceEndpoint];
	}
	/** @private @template U @template {T_Signal<U>} T @arg {T} x @arg {(t:T["signal"])=>void} f @returns {Omit<T,"signal">} */
	Signal_Omit(x,f) {
		const cf="Signal_Omit";
		const {signal,...y}=this.s(cf,x); f(signal);
		return y;
	}
	/** @private @arg {P_ClientSignal["popup"]} x */
	S_Client_HandlePopup(x) {
		const cf="S_Client_HandlePopup"; this.k(cf,x);
		if("voiceSearchDialogRenderer" in x) return this.R_VoiceSearchDialog(x);
		if("notificationActionRenderer" in x) return this.RA_NotificationAction(x);
		if("confirmDialogRenderer" in x) return this.R_ConfirmDialog(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>['openPopupAction']} x */
	S_Client_OpenPopupAction(x) {
		const cf="S_VoiceSearchPopup_Dialog"; this.k(cf,x);
		const {popup,popupType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.S_Client_HandlePopup(popup);
		switch(popupType) {
			default: debugger; break;
			case "TOAST": case "TOP_ALIGNED_DIALOG": case "DIALOG":
		}
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>} x */
	S_Client_Popup(x) {
		const cf="S_Client_Popup"; this.k(cf,x);
		const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.S_Client_OpenPopupAction(openPopupAction);
	}
	/** @template {{}} T @arg {T} x @arg {keyof T} k */
	T_EP_In(x,k) {return x[k];}
	/** @type {D_UiTargetId[]} */
	reload_ui_target_id_arr=[];
	/** @arg {D_UiTargetId} x */
	D_UiTargetId(x) {
		switch(x) {
			default: if(!this.reload_ui_target_id_arr.includes(x)) {this.reload_ui_target_id_arr.push(x); debugger;} break;
			case "browse-feedFEwhat_to_watch": case "watch-next-feed": case "engagement-panel-comments-section":
		}
	}
	/** @private @arg {DS_CreatePlaylist} x */
	DS_CreatePlaylist(x) {
		const cf="DS_CreatePlaylist"; this.k(cf,x);
		const {params,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(params,x => this.params(cf,"service$create_playlist",x));
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {CF_GE_ResponseReceived} cf @arg {GE_ResponseReceived} x */
	GE_ResponseReceived(cf,x) {
		this.save_keys(`[${cf}.response_endpoint]`,x);
		if("signalServiceEndpoint" in x) {
			/** @type {`${cf}.SE_Signal`} */
			const cf1=`${cf}.SE_Signal`;
			let [a,gc]=this.T_SE_Signal(cf1,x);
			if(!this.eq_keys(this.get_keys_of(a),["webCommandMetadata"])) debugger;
			this.M_SendPost(a);
			/** @type {`${cf1}.data`} */
			const cf2=`${cf1}.data`;
			this.G_ClientSignal(cf2,gc);
		} else if("adsControlFlowOpportunityReceivedCommand" in x) {this.C_AdsControlFlowOpportunityReceived(x);} else if("changeKeyedMarkersVisibilityCommand" in x) {
			const {clickTrackingParams,changeKeyedMarkersVisibilityCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_ChangeKeyedMarkersVisibility(changeKeyedMarkersVisibilityCommand);
		} else if("loadMarkersCommand" in x) {
			const {clickTrackingParams,loadMarkersCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_LoadMarkers(loadMarkersCommand);
		} else if("reloadContinuationItemsCommand" in x) {this.C_ReloadContinuationItems(x);} else if("appendContinuationItemsAction" in x) {
			const {clickTrackingParams,appendContinuationItemsAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(cf,clickTrackingParams);
			this.AD_AppendContinuationItems(appendContinuationItemsAction);
		} else {debugger;}
	}
	/** @private @template {DC_ReloadContinuationItems} T @arg {"DC_ReloadContinuationItems"} cf @arg {T} x */
	DC_ReloadContinuationItems_Omit(cf,x) {
		const {slot,...y}=this.s(cf,x);
		this.save_enum("RELOAD_CONTINUATION_SLOT",x.slot);
		return y;
	}
	/** @private @arg {DC_ReloadContinuationItems} x */
	DC_ReloadContinuationItems(x) {
		const cf="DC_ReloadContinuationItems"; this.k(cf,x);
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.save_string("[Body.targetId]",targetId);
				this.z(continuationItems,a => {this.save_keys("[continuationItem]",a);});
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
		const cf="DC_LoadMarkers"; this.k(cf,x);
		const {entityKeys,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entityKeys,this.a_primitive_str);
	}
	/** @private @arg {DC_ChangeKeyedMarkersVisibility} x */
	DC_ChangeKeyedMarkersVisibility(x) {
		const cf="DC_ChangeKeyedMarkersVisibility"; this.k(cf,x);
		const {isVisible,key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @private @arg {D_PlayerOverlay} x */
	D_PlayerOverlay(x) {
		const cf="D_PlayerOverlay"; this.k(cf,x);
		if("browserMediaSession" in x) return this.D_BrowserMediaSession(x);
		const {endScreen,shareButton,addToMenu,videoDetails,...y}=this.s(cf,x);
		this.R_WatchNextEndScreen(endScreen);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		x: {
			const k="autoplay";
			if(!(k in y)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`; this.k(cf1,x);
			y: {
				const k2="decoratedPlayerBarRenderer";
				if(!(k2 in y)) break y;
				/** @type {`${typeof cf1}:${typeof k2}`} */
				const cf2=`${cf1}:${k2}`; this.k(cf1,x);
				const {autoplay,autonavToggle,decoratedPlayerBarRenderer,...y1}=this.s(cf2,y); this.g(y1);/*#destructure_done*/
				this.R_PlayerOverlayAutoplay(autoplay);
				this.R_AutoplaySwitchButton(autonavToggle);
				this.R_DecoratedPlayerBar(decoratedPlayerBarRenderer);
				return;
			}
			const {autoplay,autonavToggle,...y1}=this.s(cf1,y); this.g(y1);/*#destructure_done*/
			this.R_PlayerOverlayAutoplay(autoplay);
			this.R_AutoplaySwitchButton(autonavToggle);
			return;
		}
		x: {
			const k="decoratedPlayerBarRenderer";
			if(!(k in y)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`; this.k(cf1,x);
			const {decoratedPlayerBarRenderer,...y1}=this.s(cf1,y); this.g(y1);/*#destructure_done*/
			this.R_DecoratedPlayerBar(decoratedPlayerBarRenderer);
			return;
		}
		this.g(y);
	}
	/** @private @arg {AD_Notification} x */
	AD_Notification(x) {
		const cf="AD_Notification"; this.k(cf,x);
		const {responseText,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(responseText);
		this.t(actionButton,this.R_Button);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {AD_ReplaceEnclosing} x */
	AD_ReplaceEnclosing(x) {
		this.T_Item(x,this.AD_ReplaceEnclosing_Item);
		let k=this.gk(x.item);
		switch(k[0]) {
			default: console.log(`-- [AD_ReplaceEnclosing_Info] --\n\n${k.map(e => `case "${e}":`).join("\n")}`); debugger; break;
			case "notificationTextRenderer":
			case "reelDismissalActionRenderer":
			case "notificationMultiActionRenderer":
		}
	}
	/** @arg {AD_ReplaceEnclosing_Item} x */
	AD_ReplaceEnclosing_Item(x) {
		const cf="AD_ReplaceEnclosing_Item"; this.g_k(cf,x); this.k(cf,x);
		if("notificationTextRenderer" in x) return this.R_NotificationText(x);
	}
	/** @private @arg {D_DecoratedPlayerBar} x */
	D_DecoratedPlayerBar(x) {
		const cf="D_DecoratedPlayerBar"; this.k(cf,x);
		const {playerBar,...y}=this.s(cf,x);
		if("playerBarActionButton" in y) {
			const {playerBarActionButton,...y1}=this.s(cf,y); this.g(y1);/*#destructure_done*/
			return this.R_Button(playerBarActionButton);
		}
		this.g(y);
	}
	/** @private @arg {D_AutoplaySwitchButton} x */
	D_AutoplaySwitchButton(x) {
		const cf="D_AutoplaySwitchButton"; this.k(cf,x);
		const {onEnabledCommand,onDisabledCommand,enabledAccessibilityData,disabledAccessibilityData,trackingParams,enabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([onEnabledCommand,onDisabledCommand],(x) => {
			const cf="E_SetSettingAutonavForDesktop";
			const {clickTrackingParams,commandMetadata,setSettingEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(cf,clickTrackingParams);
			if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/account/set_setting") debugger;
			this.M_SetSetting(commandMetadata);
			this.T_DE_SettingItem_AutonavForDesktop(setSettingEndpoint);
		});
		this.D_Accessibility(enabledAccessibilityData);
		this.D_Accessibility(disabledAccessibilityData);
		this.trackingParams(cf,trackingParams);
		this.save_boolean("[autoplay.switch.enabled]",enabled);
	}
	/** @private @arg {T_DE_SettingItem<"407",boolean,"AUTONAV_FOR_DESKTOP">} x */
	T_DE_SettingItem_AutonavForDesktop(x) {
		if("boolValue" in x) {
			const cf="T_DE_SettingItem.407";
			const {settingItemId,boolValue,settingItemIdForClient,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(settingItemId!=="407") debugger;
			this.a_primitive_bool(boolValue);
			if(settingItemIdForClient!=="AUTONAV_FOR_DESKTOP") debugger;
			return;
		}
	}
	/** @private @arg {D_WatchNextEndScreen} x */
	D_WatchNextEndScreen(x) {
		const cf="D_WatchNextEndScreen"; this.k(cf,x);
		const {results,title,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(results,this.G_WatchNextEndScreenItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_BrowserMediaSession} x */
	D_BrowserMediaSession(x) {
		const cf="D_BrowserMediaSession"; this.k(cf,x);
		const {actions,browserMediaSession,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,this.R_LikeButton);
		this.R_BrowserMediaSession(browserMediaSession);
	}
	/** @private @arg {string} x */
	a_primitive_str(x) {this._primitive_of(x,"string");}
	/** @public @arg {string} cf @arg {{}} x */
	GEN(cf,x) {
		let name=this.get_codegen_name(x);
		if(!name) return;
		this.codegen.codegen_renderer(x,`${cf}$${name}`);
		debugger;
	}
	/** @private @arg {D_PlaylistLoopButtonState} x */
	D_PlaylistLoopButtonState(x) {
		const cf="D_PlaylistLoopButtonState";
		this.save_keys(`[${cf}]`,x);
		const {state,button,...y}=this.s(cf,x); this.g(y);
		this.save_enum("PLAYLIST_LOOP_STATE",state);
		this.R_Button(button);
	}
	/** @private @arg {D_PlaylistLoopButton} x */
	D_PlaylistLoopButton(x) {
		const cf="D_PlaylistLoopButton";
		this.save_keys(`[${cf}]`,x);
		const {states,currentState,playlistLoopStateEntityKey,...y}=this.s(cf,x); this.g(y);
		this.z(states,this.R_PlaylistLoopButtonState);
		if(currentState!=="PLAYLIST_LOOP_STATE_NONE") debugger;
		this.a_primitive_str(playlistLoopStateEntityKey);
	}
	/** @private @arg {D_Menu_Button} x */
	D_Menu_Button(x) {
		const cf="D_Menu_Button";
		if("buttonRenderer" in x) return this.R_Button(x);
		if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
		if("playlistLoopButtonRenderer" in x) return this.R_PlaylistLoopButton(x);
		if("toggleButtonRenderer" in x) return this.R_ToggleButton(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	static {
		this.prototype.D_Menu_Button;
	}
	/** @private @arg {D_Menu} x */
	D_Menu(x) {
		const cf="D_Menu";
		x: {
			const k="targetId";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			const {items,trackingParams,accessibility,targetId,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.z(items,this.G_MenuItem);
			this.trackingParams(cf1,trackingParams);
			this.D_Accessibility(accessibility);
			this.targetId(cf1,targetId);
			return;
		}
		x: {
			const k="flexibleItems";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			const {items,trackingParams,topLevelButtons,accessibility,flexibleItems,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.z(items,this.G_MenuItem);
			this.trackingParams(cf1,trackingParams);
			this.z(topLevelButtons,this.D_Menu_Button);
			this.D_Accessibility(accessibility);
			this.z(flexibleItems,this.R_MenuFlexibleItem);
			return;
		}
		x: {
			const k="loggingDirectives";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			y: {
				const k2="trackingParams";
				if(!(k2 in x)) break y;
				/** @type {`${typeof cf1}:${typeof k2}`} */
				const cf2=`${cf1}:${k2}`;
				const {items,trackingParams,accessibility,loggingDirectives,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
				this.z(items,this.G_MenuItem);
				this.trackingParams(cf2,trackingParams);
				this.D_Accessibility(accessibility);
				this.D_LoggingDirectives(loggingDirectives);
				return;
			}
			const {items,accessibility,loggingDirectives,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.z(items,this.G_MenuItem);
			this.D_Accessibility(accessibility);
			this.D_LoggingDirectives(loggingDirectives);
			return;
		}
		x: {
			const k="accessibility";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			const {items,trackingParams,accessibility,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.trackingParams(cf1,trackingParams);
			this.z(items,this.G_MenuItem);
			this.D_Accessibility(accessibility);
			return;
		}
		x: {
			const k="items";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			const {items,trackingParams,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.trackingParams(cf1,trackingParams);
			this.z(items,this.G_MenuItem);
			return;
		}
		x: {
			const k="topLevelButtons";
			if(!(k in x)) break x;
			/** @type {`${typeof cf}:${typeof k}`} */
			const cf1=`${cf}:${k}`;
			const {trackingParams,topLevelButtons,...y}=this.s(cf1,x); this.g(y);/*#destructure_done*/
			this.trackingParams(cf1,trackingParams);
			this.z(topLevelButtons,this.D_Menu_Button);
			return;
		}
		this.g(x);
	}
	/** @private @arg {D_SegmentedLikeDislikeButton} x */
	D_SegmentedLikeDislikeButton(x) {
		const cf="D_SegmentedLikeDislikeButton"; this.k(cf,x);
		if("likeButton" in x) {
			const {likeButton,dislikeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_ToggleButton(likeButton);
			this.R_ToggleButton(dislikeButton);
			return;
		}
		const {style,size,isDisabled,text,serviceEndpoint,icon,tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_string(`[${cf}.style]`,style);
		this.save_string(`[${cf}.size]`,size);
		if(isDisabled!==false) debugger;
		this.G_Text(text);
		this.E_ShareEntityService(serviceEndpoint);
		if(icon.iconType!=="SHARE") debugger;
		if(tooltip!=="Share") debugger;
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibilityData);
	}
	/** @private @arg {DT_MenuFlexibleItem} x */
	D_MenuFlexibleItem(x) {
		const cf="D_MenuFlexibleItem"; this.k(cf,x);
		const {menuItem,topLevelButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_MenuServiceItem(menuItem);
		this.R_Button(topLevelButton);
	}
	/** @private @template T @arg {T_SE_Signal<M_SendPost,T>} x @returns {["Signal",T]} */
	TE_SignalService_I_0(x) {
		const cf="TE_SignalService_I_0"; this.k(cf,x);
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_SendPost(commandMetadata);
		return ["Signal",signalServiceEndpoint];
	}
	/** @private @arg {RD_MenuServiceItem["serviceEndpoint"]} x */
	RD_MenuServiceItem_serviceEndpoint(x) {
		const cf="RD_MenuServiceItem_serviceEndpoint"; this.k(cf,x);
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		if("signalServiceEndpoint" in x) return this.TE_SignalService_I_0(x);
		if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("getReportFormEndpoint" in x) return this.E_GetReportForm(x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("recordNotificationInteractionsEndpoint" in x) return this.E_RecordNotificationInteractions(x);
		if("notificationOptOutEndpoint" in x) return this.E_NotificationOptOut(x);
		x==="";
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @arg {string} cf */
	codegen_all_service_menu_icons(cf) {
		let arr_items=JSON.stringify(this.service_menu_icons,null,"\t");
		console.log(`-- [ServiceMenu.${cf}.icon] --\n%s`,arr_items);
	}
	/** @arg {string} cf @arg {string} x */
	new_service_icon(cf,x) {
		if(this.service_menu_icons.includes(x)) return;
		this.service_menu_icons.push(x);
		this.codegen_all_service_menu_icons(cf);
	}
	/** @private @type {string[]} */
	service_menu_icons=[];
	/** @arg {["Signal",Extract<RD_MenuServiceItem["serviceEndpoint"],{signalServiceEndpoint:any}>["signalServiceEndpoint"]]} x */
	RD_MenuServiceItem_ServiceInfo(x) {
		const cf="RD_MenuServiceItem_ServiceInfo"; this.k(cf,x);
		switch(x[0]) {
			case "Signal": return this.G_ClientSignal(cf,x[1]);
			default: debugger; break;
		}
	}
	/** @private @template {RD_MenuServiceItem} T @arg {"RD_MenuServiceItem"} cf @arg {T} x */
	RD_MenuServiceItem_Omit(cf,x) {
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x);
		this.G_Text(text);
		let res=this.RD_MenuServiceItem_serviceEndpoint(serviceEndpoint);
		this.t(res,this.RD_MenuServiceItem_ServiceInfo);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {Extract<RD_MenuServiceItem,{icon:any}>["icon"]} x */
	RD_MenuServiceItem_Icon(x) {
		let u=x;
		switch(x.iconType) {
			default: this.new_service_icon("RD_MenuServiceItem",u.iconType); break;
			case "ADD_TO_QUEUE_TAIL": case "CONTENT_CUT": case "FLAG": case "NOT_INTERESTED": case "PLAYLIST_ADD": case "REMOVE": case "SHARE": case "WATCH_LATER":
			case "VISIBILITY_OFF":
		}
	}
	/** @type {RD_MenuServiceIconType_1} */
	/** @private @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem(x) {
		const cf="RD_MenuServiceItem"; this.k(cf,x);
		if("loggingDirectives" in x) {
			if("icon" in x) {
				const u=this.RD_MenuServiceItem_Omit(cf,x);
				const {icon,loggingDirectives,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
				this.RD_MenuServiceItem_Icon(icon);
				this.D_LoggingDirectives(loggingDirectives);
				return;
			}
			const u=this.RD_MenuServiceItem_Omit(cf,x);
			const {loggingDirectives,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			this.D_LoggingDirectives(loggingDirectives);
			return;
		}
		if("icon" in x&&"hasSeparator" in x&&"isDisabled" in x) {
			const {...u}=this.RD_MenuServiceItem_Omit(cf,x);
			const {icon,hasSeparator,isDisabled,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			this.RD_MenuServiceItem_Icon(icon);
			this.ceq(hasSeparator,true);
			this.ceq(isDisabled,false);
			return;
		}
	}
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {const cf="D_MenuServiceItem_Omit"; const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); f.call(this,serviceEndpoint); return y;}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem"; this.k(cf,x);
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {string} x */
	DE_Feedback_onToken(x) {
		let fb_dec=base64_url_dec.decodeByteArray(x);
		this.t(fb_dec,x => this.ds.save_number("[feedbackToken.bytes[0..1]]",[x[0],x[1]]));
	}
	/** @private @template {{[U in K]:any}} T @template {keyof T} K @arg {"DE_Feedback"} cf @arg {K} k @arg {T} x @arg {(x:T[K])=>void} f @returns {T_OmitKey<T,K>} */
	T_OmitKey(cf,k,x,f) {const {[k]: a,...y}=this.s(cf,x); f.call(this,a); return as_any(y);}
	/** @private @arg {D_NotificationText} x */
	D_NotificationText(x) {
		const cf="D_NotificationText"; this.k(cf,x);
		if("undoText" in x) {
			const {successResponseText,undoText,undoEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_Text(successResponseText);
			this.G_Text(undoText);
			this.E_UndoFeedback(undoEndpoint);
			this.trackingParams(cf,trackingParams);
			return;
		}
		const {successResponseText,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(successResponseText);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_MenuNavigationItem["navigationEndpoint"]} x */
	D_MenuNavigationItem_Endpoint(x) {
		if("userFeedbackEndpoint" in x) return this.E_UserFeedback(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
	}
	/** @private @arg {D_MenuNavigationItem} x */
	D_MenuNavigationItem(x) {
		const cf="D_MenuNavigationItem"; this.k(cf,x);
		const {trackingParams,text,icon,navigationEndpoint,...y}=this.s(cf,x);/*#destructure_later*/
		this.trackingParams(cf,trackingParams);
		this.G_Text(text);
		switch(icon.iconType) {
			default: this.codegen_typedef_all(cf,x); break;
			case "FEEDBACK": case "INFO":
		}
		this.D_MenuNavigationItem_Endpoint(navigationEndpoint);
		if("accessibility" in y) return this.y(cf,"accessibility",y,this.D_Accessibility);
		this.g(y);
	}
	/** @private @template {D_Microformat} U @arg {U} x */
	unwrap_microformat(x) {
		/** @private @type {Partial<T_RemovePrefix<U,"url">>} */
		let uu={}; uu;
		uu.applinksAndroid;
		let [v,o]=this.unwrap_prefix(x,"url");
		let [v1,o2]=this.unwrap_prefix(o,"ios");
		let [v2,o3]=this.unwrap_prefix(o2,"twitter");
		return {
			url: v,
			ios: v1,
			twitter: v2,
			other: o3,
		};
	}
	/** @private @template {{}} U @arg {U} x @template {string} VV @arg {VV} pf @returns {[T_RemovePrefix<U,VV>,Omit<U,`${VV}${string}`>]} */
	unwrap_prefix(x,pf) {
		/** @private @type {T_RemovePrefix<U,VV>} */
		let un_prefix=as({});
		/** @private @type {Omit<U,`${VV}${string}`>} */
		let other=as({});
		for(let cc of Object.entries(x)) {
			let c1=cc[0];
			if(this.str_starts_with_rx(pf,c1)) {
				let u1x=split_string_once(c1,pf);
				if(u1x.length!==2) continue;
				/** @private @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @private @type {keyof T_RemovePrefix<U,VV>} */
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
	/** @private */
	_decoder=new TextDecoder();
	/** @private @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext"; this.k(cf,x);
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		{
			let x=decodeURIComponent(serializedContextData);
			let b_res=this._decode_b64_url_proto_obj(x);
			if(!b_res) return;
			if(b_res.length!==1) debugger;
			let [r]=b_res;
			if(r[0]==="child"&&r[1]===3) {
				let playlist_id=this._decoder.decode(r[2]);
				if(this.str_starts_with_rx("RD",playlist_id)) {this.playlistId(as(playlist_id));} else {
					switch(r[1]) {
						default:
							console.log("D_VssLoggingContext_serializedContextData_fieldId",r[1]);
							let playlist_id=this._decoder.decode(r[2]);
							console.log("serializedContextData_decode",playlist_id);
							break;
						case 3: {
							let playlist_id=this._decoder.decode(r[2]);
							if(this.str_starts_with_rx("RD",playlist_id)) {this.playlistId(playlist_id); break;}
							if(this.str_starts_with_rx("PL",playlist_id)) {this.playlistId(playlist_id); break;}
							{console.log("serializedContextData_decode(f3).as_playlist_id",playlist_id); break;}
						} break;
					}
				}
			} else {console.log(r);}
		}
	}
	/** @private @arg {TR_ItemSection_2<any,any>} x @returns {x is TR_ItemSection_3<any,any,any>} */
	is_ItemSectionRendererTemplate(x) {return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);}
	/** @private @arg {[R_ContinuationItem[],"comment-item-section","comments-section"]} x */
	ItemSection_3_CommentItemSection(x) {
		if(x[1]!=="comment-item-section") debugger;
		if(x[2]!=="comments-section") debugger;
		this.z(x[0],this.R_ContinuationItem);
	}
	/** @private @arg {T_Results<G_Watch_ResultsItem>} x */
	D_WatchResults(x) {const cf="D_WatchResults",{results: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ return a;}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}:${string}`} */
	str_is_uri(x) {return x.includes(":");}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {return x.includes("?");}
	/** @private @arg {GU_YoutubeUrlRedirect} x */
	GU_YoutubeUrlRedirect(x) {
		const cf="GU_YoutubeUrlRedirect"; this.k(cf,x);
		let [p1,s1]=split_string_once(x,"//"); if(p1!=="https:") debugger;
		let [h,sp]=split_string_once(s1,"/");
		if(h!=="www.youtube.com") debugger;
		if(this.str_is_search(sp)) {
			let [pp,query_search]=split_string_once(sp,"?");
			switch(pp) {
				case "redirect": {
					let parsed_search=this.parse_url_search_params(query_search);
					switch(parsed_search.event) {
						default: {
							const cf="GU_YoutubeUrlRedirect.event";
							this.codegen_case_key(cf,parsed_search,"event");
						} break;
						case "video_description": break;
						case "product_shelf": break;
					}
					let {event,redir_token,q,v,...y}=parsed_search; this.g(y);
					let redir_parts=split_string_once(atob(redir_token),"|");
					if(redir_parts.length===1) {debugger; return;}
					let [p1,p2]=redir_parts.map(x => base64_url_dec.decodeByteArray(x));
					if(!p1||!p2) return;
					for(let i=0;i<3;i++) {
						this.save_next_byte("url.redir_token[0].data",p1,i);
					}
					for(let i=0;i<3;i++) {
						this.save_next_byte("url.redir_token[1].data",p2,i);
					}
					return;
				}
				default: debugger; break;
			}
		}
		this.codegen_str(cf,x);
	}
	/** @private @arg {GU_VE83769_Url_External} b */
	D_YtStudio_Url(b) {
		const cf="D_YtStudio_Url";
		if(!this.str_is_uri(b)) {debugger; return;}
		let x=split_string(split_string_once(b,"//")[1],"/");
		if(x[0]!=="studio.youtube.com") {debugger; return;}
		if(x.length===1) return;
		switch(x.length) {
			case 2: {if(x[1]!=="") debugger;} break;
			case 3: {if(!this.str_starts_with_rx("UC",x[2])) {debugger; return;} } break;
			case 4: {
				if(x[1]!=="channel") {debugger; return;}
				if(x[2]==="UC") {
					let [,,,v3]=x;
					switch(v3) {
						default: this.codegen_case(cf,v3); break;
						case "livestreaming": break;
					}
					return;
				}
				let [,,v2,v3]=x;
				if(!this.str_starts_with_rx("UC",v2)) {debugger; return;}
				switch(v3) {
					default: this.codegen_case(cf,v3); break;
					case "videos": break;
				}

			} break;
		}
	}
	/** @private @arg {D_EX_YoutubeKidsUrl} x */
	D_YoutubeKidsUrl(x) {
		const cf="D_YoutubeKidsUrl"; this.k(cf,x);
		if(x==="https://www.youtubekids.com?source=youtube_web") return;
		if(x==="https://www.youtubekids.com/?source=youtube_web") return;
		this.codegen_str(cf,x);
	}
	/** @private @arg {DU_Url['url']|`https://studio.youtube.com/channel/UC${string}`} x */
	GM_E_Url_TargetUrlType(x) {
		const rp="https://www.youtube.com/redirect?";
		if(this.str_starts_with_rx(rp,x)) {
			/** @type {GU_YoutubeUrlRedirect} */
			let arg_x=as(x);
			return this.GU_YoutubeUrlRedirect(arg_x);
		}
		let sp=this.parse_with_url_parse(x);
		if(this.str_starts_with_rx("https://",sp.href)) {return;}
		this.GU_VE83769_Url(sp.href);
	}
	/** @private @arg {DU_Url} x */
	DE_Url(x) {
		const cf="DE_Url"; this.k(cf,x);
		if(!("target" in x)) {
			const {url,nofollow,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.D_YoutubeUrl(url);
			if(nofollow!==true) debugger;
			return;
		}
		if("nofollow" in x) {
			const {url,target,nofollow,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.GM_E_Url_TargetUrlType(url);
			if(target!=="TARGET_NEW_WINDOW") debugger;
			if(nofollow!==true) debugger;
			return;
		}
		const {url,target,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GM_E_Url_TargetUrlType(url);
		if(target!=="TARGET_NEW_WINDOW") debugger;
	}
	/** @private @arg {Extract<GU_VE83769_Url_External,`${string}://music.youtube.com${string}`>} x */
	handle_yt_music_url(x) {
		switch(x) {
			case "https://music.youtube.com/": break;
			default: debugger; break;
		}
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
				let parsed_url=this.parse_with_url_parse(x);
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
	/** @private @arg {GU_VE83769_Url} x */
	GU_VE83769_Url(x) {
		if(this.str_starts_with_rx("/",x)) {
			switch(x) {
				default: x===""; debugger; break;
				case "/upload": break;
			}
			return;
		}
		let up=this.parse_with_url_parse(x);
		switch(up.host) {
			case "music.youtube.com": return this.handle_yt_music_url(up.href);
			case "studio.youtube.com": return this.D_YtStudio_Url(up.href);
			case "www.youtubekids.com": return this.D_YoutubeKidsUrl(up.href);
			case "tv.youtube.com": return;
			case "www.youtube.com": return this.GU_YoutubeUrlRedirect(up.href);
			case "myactivity.google.com": return;
			case "www.google.com": return;
			default: debugger; break;
		}
		const hn_yt_studio="https://studio.youtube.com";
		const hn_yt_music="https://music.youtube.com";
		const hn_yt_kids="https://www.youtubekids.com";
		const hn_yt_tv="https://tv.youtube.com";
		if(this.str_starts_with_rx(hn_yt_studio,x)) return;
		if(this.str_starts_with_rx(hn_yt_music,x)) return;
		if(this.str_starts_with_rx(hn_yt_kids,x)) return;
		if(this.str_starts_with_rx(hn_yt_tv,x)) return;
	}
	/** @template {number} T @arg {T} x @returns {`${T}`} */
	num_to_string(x) {return `${x}`;}
	/** @private @arg {D_PlayerOverlayAutoplay} x */
	D_PlayerOverlayAutoplay(x) {
		const cf="D_PlayerOverlayAutoplay"; this.k(cf,x);
		let {background,videoTitle,byline,pauseText,countDownSecs,cancelButton,nextButton,closeButton,preferImmediateRedirect,webShowBigThumbnailEndscreen,webShowNewAutonavCountdown,countDownSecsForFullscreen,...y}=this.D_Omit_Compact_Video(cf,x); this.g(y);
		this.G_Text(videoTitle);
		this.G_Text(byline);
		this.G_Text(pauseText);
		this.D_Thumbnail(background);
		let cds=this.num_to_string(countDownSecs);
		switch(cds) {
			default: debugger; break;
			case "3": case "8":
		}
		this.R_Button(cancelButton);
		this.R_Button(nextButton);
		this.R_Button(closeButton);
		if(preferImmediateRedirect) debugger;
		if(webShowBigThumbnailEndscreen) debugger;
		if(!webShowNewAutonavCountdown) debugger;
		if(countDownSecsForFullscreen!==3) debugger;
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {D_Omit_Compact_Player} T @arg {T} x */
	D_Omit_Compact_Player(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {D_Omit_Compact_Video} T @arg {T} x */
	D_Omit_Compact_Video(cf,x) {
		let u=this.D_Omit_Compact_Player(cf,x);
		let {videoId,shortViewCountText,publishedTimeText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.videoId(videoId);
		this.G_Text(publishedTimeText);
		this.G_Text(shortViewCountText);
		return y;
	}
	/** @private @arg {D_ThumbnailsList} x */
	D_ThumbnailsList(x) {
		const cf="D_ThumbnailsList"; this.k(cf,x);
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.t_cf(cf,trackingParams,this.trackingParams);
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
	/**
	 * @private
	 * @template {D_CompactVideo} T @arg {"D_CompactVideo"} cf @arg {T} x
	 * @returns {T_OmitKey<T,Exclude<keyof T,Omit_y>>} */
	D_CompactVideo_Omit(cf,x) {
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {richThumbnail,accessibility,channelThumbnail,badges,viewCountText,shortViewCountText,...y}=u;
		this.t(richThumbnail,this.D_VideoLike_richThumbnail);
		this.D_Accessibility(accessibility);
		this.D_Thumbnail(channelThumbnail);
		this.tz(badges,this.RMD_Badge);
		let og=this.get_omit_gen(y);
		const r1=og.get();
		this.assert_is_omit_key(x,r1,r1);
		r1;
		/** @typedef {keyof typeof y} Omit_y */
		return as_any(r1);
	}
	/** @private @arg {D_CompactVideo} x */
	D_CompactVideo(x) {
		const cf="D_CompactVideo"; this.k(cf,x);
		if("ownerBadges" in x&&"publishedTimeText" in x) {
			let {publishedTimeText,lengthText,ownerBadges,...y}=this.D_CompactVideo_Omit(cf,x); this.g(y);
			this.G_Text(publishedTimeText);
			this.G_Text(lengthText);
			this.z(ownerBadges,this.RMD_Badge);
			return;
		}
		if("ownerBadges" in x) {
			let {ownerBadges,...y}=this.D_CompactVideo_Omit(cf,x); this.g(y);
			this.z(ownerBadges,this.RMD_Badge);
			return;
		}
		if("publishedTimeText" in x) {
			let {publishedTimeText,lengthText,...y}=this.D_CompactVideo_Omit(cf,x); this.g(y);
			this.G_Text(publishedTimeText);
			this.G_Text(lengthText);
			return;
		}
	}
	/** @type {Map<string,[string,string[]][]>} */
	strings_map=new Map;
	/** @private @arg {DMD_Badge} x */
	DMD_Badge(x) {
		const cf="DMD_Badge"; this.k(cf,x);
		this.save_enum("BADGE_STYLE_TYPE",x.style);
		let ia=this.strings_map.get(x.style);
		if(!ia) this.strings_map.set(x.style,ia=[]);
		switch(x.style) {
			default: x===0; debugger; break;
			case "BADGE_STYLE_TYPE_SIMPLE": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.trackingParams(cf,trackingParams);
				ia.push(["label",[label]]);
			} break;
			case "BADGE_STYLE_TYPE_YPC": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.trackingParams(cf,trackingParams);
				ia.push(["label",[label]]);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED_ARTIST": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_VerifiedArtist",icon);
				ia.push(["tooltip",[tooltip]]);
				this.trackingParams(cf,trackingParams);
				ia.push(["accessibilityData.label",[accessibilityData.label]]);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_Verified",icon);
				ia.push(["tooltip",[tooltip]]);
				this.trackingParams(cf,trackingParams);
				ia.push(["accessibilityData.label",[accessibilityData.label]]);
			} break;
			case "BADGE_STYLE_TYPE_LIVE_NOW": {
				const {icon,style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_LiveNow",icon);
				this.trackingParams(cf,trackingParams);
				ia.push(["label",[label]]);
				switch(label) {
					default: debugger; break;
					case "LIVE": break;
					case "PREMIERE": break;
				}
			} break;
			case "BADGE_STYLE_TYPE_COLLECTION": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.trackingParams(cf,trackingParams);
				ia.push(["label",[label]]);
			} break;
		}
	}
	/** @private @arg {D_AdSlot} x */
	D_AdSlot(x) {
		const cf="D_AdSlot"; this.k(cf,x);
		const {adSlotMetadata,fulfillmentContent,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DMD_AdSlot(adSlotMetadata);
		this.R_FulfillmentLayout(fulfillmentContent);
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {D_InFeedAdLayout["renderingContent"]} x */
	D_InFeedAdLayout_Content(x) {
		const cf="D_InFeedAdLayout_Content"; this.k(cf,x);
		if("promotedSparklesWebRenderer" in x) return this.R_PromotedSparklesWeb(x);
		if("displayAdRenderer" in x) return this.R_DisplayAd(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_InFeedAdLayout} x */
	D_InFeedAdLayout(x) {const {adLayoutMetadata: a,renderingContent: b,...y}=this.s("D_InFeedAdLayout",x); this.g(y); this.MG_AdLayout(a); this.D_InFeedAdLayout_Content(b);}
	/** @private @arg {D_DisplayAd} x */
	D_DisplayAd(x) {
		const cf="D_DisplayAd"; this.k(cf,x);
		const {layout,...y}=this.s(cf,x);
		let k=this.get_keys_of(y)[0];
		console.log("[D_DisplayAd.next_key] [%s]",k);
	}
	/** @private @arg {MG_AdLayout['layoutType']} x */
	MG_AdLayout_layoutType(x) {
		this.save_enum("LAYOUT_TYPE",x);
		switch(x) {
			default: break;
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES":
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE":
		}
	}
	/** @private @arg {MG_AdLayout} x */
	MG_AdLayout(x) {
		const cf="MG_AdLayout",{layoutId,...y}=this.s(cf,x); this.k(cf,x);
		let ba_id=base64_dec.decodeByteArray(layoutId);
		this.t(ba_id,([x]) => this.save_number("[AdLayout.layoutId.bytes[0]]",x));
		this.MG_AdLayout_layoutType(y.layoutType);
		switch(y.layoutType) {
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES": const {layoutType: {},...u}=this.s(cf,y); this.g(u);/*#destructure_done*/ break;
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": {
				const {layoutType: {},adLayoutLoggingData,...u}=this.s(cf,y); this.g(u);/*#destructure_done*/
				this.D_AdLayoutLoggingData(adLayoutLoggingData);
			}
		}
	}
	/** @private @arg {"DMD_AdSlot"} cf @arg {DMD_AdSlot} x */
	DMD_AdSlot_Omit(cf,x) {
		const {slotId,slotPhysicalPosition,slotType,...y}=this.s(cf,x);
		this.a_primitive_str(slotId);
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
		return y;
	}
	/** @private @arg {DMD_AdSlot} x */
	DMD_AdSlot(x) {
		const cf="DMD_AdSlot",u=this.DMD_AdSlot_Omit(cf,x); this.k(cf,x);
		if("adSlotLoggingData" in u) {
			const {adSlotLoggingData,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			return this.D_SerializedSlotAdServingDataEntry(adSlotLoggingData);
		}
		this.g(u);
	}
	/** @private @arg {D_SerializedSlotAdServingDataEntry} x */
	D_SerializedSlotAdServingDataEntry(x) {
		const cf="D_SerializedSlotAdServingDataEntry"; this.k(cf,x);
		const {serializedSlotAdServingDataEntry: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"slot_ad_serving_data_entry",a);
	}
	/** @private @arg {D_TwoColumnWatchNextResults} x */
	D_TwoColumnWatchNextResults(x) {
		const cf="D_TwoColumnWatchNextResults"; this.k(cf,x);
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let u=this.D_WatchResults(results);
		this.G_Watch_ResultsItem(u);
		this.T_SecondaryResults(secondaryResults,this.G_Watch_SecondaryResults);
		this.t(playlist,a => this.T_Playlist(a,this.D_PlaylistContent));
		this.t(autoplay,a => this.T_Autoplay(a,this.D_AutoplayContent));
		this.t(conversationBar,this.R_LiveChat);
	}
	/** @private @arg {RSG_GetUnseenCount} x */
	RSG_GetUnseenCount(x) {
		const cf="RSG_GetUnseenCount"; this.k(cf,x);
		const {responseContext: {},actions,unseenCount,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.AU_NotificationsUnseenCount(x);
		}));
		if(unseenCount!==void 0) this.a_primitive_num(unseenCount);
	}
	/** @private @arg {AD_UpdateNotificationsUnseenCount} x */
	AD_UpdateNotificationsUnseenCount(x) {
		const cf="AD_UpdateNotificationsUnseenCount"; this.k(cf,x);
		const {handlerData,unseenCount,timeoutMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(handlerData);
		this.a_primitive_num(unseenCount);
		this.a_primitive_num(timeoutMs);
	}
	/** @private @arg {AD_HideEngagementPanelTargetId} x */
	AD_HideEngagementPanelTargetId(x) {this.y("AD_HideEngagementPanelTargetId","engagementPanelTargetId",x,x => {if(x!=="engagement-panel-clip-create") debugger;});}
	/** @private @arg {AD_UpdateEngagementPanel} x */
	AD_UpdateEngagementPanel(x) {
		const cf="AD_UpdateEngagementPanel"; this.k(cf,x);
		const {content,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {AD_ShowEngagementPanelScrim} x */
	AD_ShowEngagementPanelScrim(x) {
		const cf="AD_ShowEngagementPanelScrim"; this.k(cf,x);
		const {engagementPanelTargetId,onClickCommands,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(engagementPanelTargetId!=="engagement-panel-clip-create") debugger;
		let [n]=this.z(onClickCommands,x => this.TA_OpenPopup("TA_OpenPopup<Popup_ConfirmDialog>",x));
		let [x1]=this.z(n,this.unpack_popup_dialog);
		let [x2]=this.z(x1,x => {
			if(!x[0]) {console.log("Missed popup type",x[1]); return null;}
			return x[1];
		});
		this.z(x2,this.R_ConfirmDialog);
	}
	/** @private @arg {REG_DatasyncIds} x */
	REG_DatasyncIds(x) {
		const cf="REG_DatasyncIds"; this.k(cf,x);
		const {responseContext: {},datasyncIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(datasyncIds,this.a_primitive_str);
	}
	/** @private @arg {REG_AccountSwitcher} x */
	REG_AccountSwitcher(x) {
		const cf="REG_AccountSwitcher"; this.k(cf,x);
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.A_GetMultiPageMenu);
	}
	/** @private @arg {RS_AccountsList} x */
	RS_AccountsList(x) {
		const cf="RS_AccountsList"; this.k(cf,x);
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.AU_ChannelSwitcherPage);
	}
	/** @private @arg {RS_WatchReelItem} x */
	RSW_ReelItem(x) {
		const cf="RSW_ReelItem"; this.k(cf,x);
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.t(replacementEndpoint,this.E_ReelWatch);
		this.t(sequenceContinuation,this.a_primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @private @arg {D_ReelPlayerOverlay} x */
	D_ReelPlayerOverlay(x) {
		const cf="D_ReelPlayerOverlay"; this.k(cf,x);
		if("reelPlayerNavigationModel" in x) {
			const {style: a,trackingParams: b,reelPlayerNavigationModel: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(a!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
			this.trackingParams(cf,b);
			switch(c) {
				default: this.codegen_case(cf,c); this.codegen_typedef_all(cf,x); break;
				case "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED": break;
			}
			return;
		}
		if("videoInteractions" in x) {
			const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,videoInteractions,trackingParams,shareButton,pivotButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_LikeButton(likeButton);
			this.R_ReelPlayerHeader(reelPlayerHeaderSupportedRenderers);
			this.R_Menu(menu);
			this.R_Button(nextItemButton);
			this.R_Button(prevItemButton);
			this.R_SubscribeButton(subscribeButtonRenderer);
			if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
			this.g(videoInteractions);
			this.R_Button(viewCommentsButton);
			this.trackingParams(cf,trackingParams);
			this.R_Button(shareButton);
			this.R_PivotButton(pivotButton);
			return;
		}
		if("likeButton" in x) {
			const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,trackingParams,shareButton,pivotButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
			return;
		}
		const {reelPlayerHeaderSupportedRenderers,nextItemButton,prevItemButton,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerHeader(reelPlayerHeaderSupportedRenderers);
		this.R_Button(nextItemButton);
		this.R_Button(prevItemButton);
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {CF_parse_identifier} cf @arg {Record<"identifier",unknown>} x */
	force_parse_identifier(cf,x) {
		const {identifier,...a}=this.s(`${cf}.identifier`,x); this.g(a);
		x: if(identifier&&typeof identifier==="object"&&"tag" in identifier&&"surface" in identifier) {
			if(identifier.surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") break x;
			let yk=this.get_keys_of(identifier);
			if(!this.eq_keys(yk,["surface","tag"])) debugger;
			switch(identifier.tag) {
				case "engagement-panel-structured-description": break;
				default: debugger; return;
			}
			let a1=this.GT_ShortsSurfaceIdentifier({tag: identifier.tag,surface: identifier.surface});
			if(a1!=="engagement-panel-structured-description") debugger;
			return;
		}
		this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_EngagementPanelSectionList} x */
	D_EngagementPanelSectionList(x) {
		const cf="D_EngagementPanelSectionList"; this.k(cf,x);
		if("veType" in x) {
			switch(x.veType) {
				default: debugger; break;
				case 76278: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.s(cf,x);
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
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					if(panelIdentifier!=="shopping_panel_for_entry_point_5") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_ProductList(content);
					if(targetId!=="shopping_panel_for_entry_point_5") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
				} break;
				case 126250: {
					const {panelIdentifier,header,content,veType: {},targetId,visibility,onShowCommands,loggingDirectives,...y}=this.s(cf,x);
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
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,identifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					if(panelIdentifier&&panelIdentifier!=="engagement-panel-structured-description") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_StructuredDescriptionContent(content);
					if(targetId!=="engagement-panel-structured-description") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(identifier) {
						let a1=this.GT_ShortsSurfaceIdentifier(identifier);
						if(a1!=="engagement-panel-structured-description") debugger;
					}
				} break;
				case 139722: {
					const {content,header,veType: {},targetId,visibility,loggingDirectives,continuationService,identifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					this.R_SectionList(content);
					this.t(header,this.R_EngagementPanelTitleHeader);
					this.targetId(cf,targetId);
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(continuationService!=="ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE") debugger;
					if(!identifier) debugger;
					let a1=this.GT_ShortsSurfaceIdentifier(identifier);
					if(a1!=="shorts-comments-panel") debugger;
				} break;
			}
			return;
		}
		this.G_SI_DB_EngagementPanel(x);
	}
	/** @private @arg {GA_ResponseReceived} x */
	GA_ResponseReceived(x) {
		const cf="GA_ResponseReceived"; this.k(cf,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		if("appendContinuationItemsAction" in x) return this.A_AppendContinuationItems(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_ConfirmDialog} x */
	D_ConfirmDialog(x) {
		const cf="D_ConfirmDialog"; this.k(cf,x);
		const {title,trackingParams,dialogMessages,confirmButton,cancelButton,primaryIsCancel,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(title,this.G_Text);
		this.trackingParams(cf,trackingParams);
		this.z(dialogMessages,this.G_Text);
		this.R_Button(confirmButton);
		this.R_Button(cancelButton);
		this.a_primitive_bool(primaryIsCancel);
	}
	/** @private @arg {RS_SetSetting} x */
	RS_SetSetting(x) {
		const cf="RS_SetSetting"; this.k(cf,x);
		const {responseContext: {},settingItemId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(settingItemId!=="407") debugger;
	}
	/** @private @arg {RS_Feedback} x */
	RS_Feedback(x) {
		const cf="RS_Feedback"; this.k(cf,x);
		const {responseContext: {},feedbackResponses,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(feedbackResponses,this.D_FeedbackResponseProcessedStatus);
	}
	/** @arg {O2} tx @template {{}} T @template {{}} O2 @arg {O2} o2 @template {T_DistributedKeyof<T>} K @arg {T} x @arg {{}} o2 @returns {asserts tx is T_OmitKey<T,Exclude<K,T_DistributedKeyof<O2>>>} */
	assert_is_omit_key(x,o2,tx) {
		/** @typedef {[K,O2]} T_IN_ARGS */
		/** @type {T_IN_ARGS} */
		let u; tx;
		function u1() {u;}
		/**/u1; x; o2;
	}
	/** @private @template {DC_Continuation} T @arg {"DC_Continuation"} cf @arg {T} x @returns {T_OmitKey<T,"token"|"request">} */
	DC_Continuation_Omit(cf,x) {
		const {token,request,...y}=this.s(cf,x);
		this.a_primitive_str(token);
		this.save_enum("CONTINUATION_REQUEST_TYPE",request);
		switch(request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE":
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE":
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT":
		};
		/** @returns {T_OmitKey<T,"token"|"request">|typeof y} */
		function gu() {return y;}
		let u=gu();
		this.assert_is_omit_key(x,y,u);
		return u;
	}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification"; this.k(cf,x);
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.z([thumbnail,videoThumbnail],this.D_Thumbnail);
		this.z([shortMessage,sentTimeText],this.G_Text);
		if(navigationEndpoint.watchEndpoint) {this.E_Watch(navigationEndpoint);} else {debugger;}
		this._primitive_of(read,"boolean");
		if(recordClickEndpoint.recordNotificationInteractionsEndpoint) {this.E_RecordNotificationInteractions(recordClickEndpoint);}
		this.R_Menu(contextualMenu);
		this.parse_number_template(notificationId);
	}
	/** @private @arg {GD_RC_SectionList} x */
	GD_RC_SectionList(x) {
		const cf="GD_RC_SectionList"; this.k(cf,x);
		if("targetId" in x) {
			switch(x.targetId) {
				default: {
					if(this.str_starts_with_rx("browse-feed",x.targetId)) {
						let ss=split_string(x.targetId,"browse-feed");
						if(ss.length!==2) {debugger; return;}
						let sa=ss[1];
						let ll=sa.slice(24);
						if(this.str_starts_with_rx(sa,"UC")&&ll==="featured") {
							/** @returns {`UC${string}`} */
							function wx() {return "UCx";}
							let [cid,fe]=split_string_once_last(sa,"featured",wx());
							if(fe!=="") debugger;
							this.D_ChannelId(cid);
							return;
						}
						console.log("target_id.ll",ll);
						if(this.str_starts_with_rx(sa,"UC")) {
							let floc=sa.indexOf("featured");
							if(floc<0) {debugger; return;}
							let s1=sa.slice(0,floc);
							let s2=sa.slice(floc);
							if(ll!==s2) debugger;
							console.log("[RichGrid.targetId]",x.targetId);
							console.log("[target_id_parse]",s1,s2);
						}
						return;
					};
					debugger;
				} return;
				case "browse-feedFEhistory": return this.D_SectionList_BrowseFeed_History(x);
				case "browse-feedFEsubscriptions": return this.D_SectionList_BrowseFeed_Subscriptions(x);
				case "search-feed": return this.DC_SectionList_SearchFeed(x);
			}
		}
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [u]=this.z(contents,this.TR_SectionListItem_3);
		let [u1]=this.z(u,x => this.TD_ItemSection_3(`TD_ItemSection_3<"comment-item-section","engagement-panel-comments-section">`,x));
		this.z(u1,x => {
			switch(x[1]) {
				default: debugger; break;
				case "comment-item-section": {
					let [x0,,x2]=x;
					if(x2!=="engagement-panel-comments-section") debugger;
					this.z(x0,x => {
						if(!x.continuationItemRenderer) debugger;
						return this.R_ContinuationItem(x);
					});
				} break;
			}
		});
		// this.tz(continuations,this.RD_NextContinuation);
		this.trackingParams(cf,trackingParams);
		// this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		// if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
	}
	/** @private @arg {DC_SectionList_BrowseFeed_Subscriptions} x */
	D_SectionList_BrowseFeed_Subscriptions(x) {
		const cf="D_SectionList_BrowseFeed_Subscriptions"; this.k(cf,x);
		const {contents,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,x => {
			if("itemSectionRenderer" in x) return this.TR_SectionListItem_3_Empty(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
		this.trackingParams(cf,trackingParams);
		if(targetId!=="browse-feedFEsubscriptions") debugger;
	}
	/** @private @arg {DC_SectionList_BrowseFeed_History} x */
	D_SectionList_BrowseFeed_History(x) {
		const cf="D_SectionList_BrowseFeed_History"; this.k(cf,x);
		const {contents,trackingParams,header,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,x => {
			if("itemSectionRenderer" in x) return this.TR_SectionListItem_3_Empty(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
		this.R_TextHeader(header);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="browse-feedFEhistory") debugger;
	}
	/** @private @arg {D_TextHeader} x */
	D_TextHeader(x) {x;}
	/** @private @template T1,T2,T3 @arg {TR_SectionListItem_3<T1,T2,T3>} x */
	TR_SectionListItem_3(x) {
		const cf="SectionListItem"; this.k(cf,x);
		if("itemSectionRenderer" in x) return this.TR_ItemSection_3(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
		if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
	}
	/** @private @arg {D_ContinuationItem} x */
	D_ContinuationItem(x) {
		const cf="D_ContinuationItem"; this.k(cf,x);
		const {trigger,continuationEndpoint,...y}=this.s(cf,x);
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.GE_Continuation(continuationEndpoint);
		if("button" in y) {
			const {button,...a}=this.s(cf,y); this.g(a);/*#destructure_done*/
			this.R_Button(button);
			return;
		}
		if("ghostCards" in y) {
			const {ghostCards,...a}=this.s(cf,y); this.g(a);/*#destructure_done*/
			this.R_GhostGrid(ghostCards);
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_GhostGrid} x */
	D_GhostGrid(x) {
		const cf="D_GhostGrid"; this.k(cf,x);
		const {rows,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(this.get_keys_of(x).join()!=="rows") debugger;
		if(rows!==2) debugger;
	}
	/** @private @arg {GE_Continuation} x */
	GE_Continuation(x) {
		const cf="GE_Continuation"; this.g_k(cf,x); this.k(cf,x);
		if("getNotificationMenuEndpoint" in x) return this.E_GetNotificationMenu(x);
		if("continuationCommand" in x) {this.C_Continuation(x);} else if("getTranscriptEndpoint" in x) {this.E_GetTranscript(x);} else {debugger;}
	}
	/** @private @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript"; this.k(cf,x);
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {return this.AU_EngagementPanel(a);}
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RS_Success} x */
	RS_Success(x) {
		const cf="RS_Success"; this.k(cf,x);
		const {responseContext: {},success,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(success,"boolean");
	}
	/** @private @arg {RS_AttGet} x */
	RS_AttGet(x) {
		const cf="RS_AttGet"; this.k(cf,x);
		const {responseContext: {},challenge,bgChallenge,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(challenge);
		this.D_AttBgChallenge(bgChallenge);
	}
	/** @private @arg {RS_Guide} x */
	RS_Guide(x) {
		const cf="RS_Guide"; this.k(cf,x);
		const {responseContext: {},items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_GuideCollapsibleEntry} x */
	D_GuideCollapsibleEntry(x) {
		const cf="D_GuideCollapsibleEntry"; this.k(cf,x);
		const {expanderItem,expandableItems,collapserItem,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(expanderItem);
		this.z(expandableItems,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
		});
		this.R_GuideEntry(collapserItem);
	}
	/** @private @arg {D_GuideDownloadsEntry} x */
	D_GuideDownloadsEntry(x) {
		const cf="D_GuideDownloadsEntry"; this.k(cf,x);
		const {alwaysShow,entryRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(alwaysShow!==false) debugger;
		if(!entryRenderer.guideEntryRenderer) debugger;
		this.R_GuideEntry(entryRenderer);
	}
	/** @private @arg {D_GuideSubscriptionsSection} x */
	D_GuideSubscriptionsSection(x) {
		const cf="D_GuideSubscriptionsSection"; this.k(cf,x);
		const {sort,items,trackingParams,formattedTitle,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
		const cf="D_GuideSection"; this.k(cf,x);
		const {items,trackingParams,formattedTitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {CF_D_GuideEntry} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.s(cf,x);
		this.D_Accessibility(accessibility);
		this.G_Text(formattedTitle);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @arg {Extract<D_GuideEntry,{targetId:any;}>["targetId"]} x */
	D_GuideEntry_TargetId(x) {
		const cf="D_GuideEntry_TargetId"; this.k(cf,x);
		switch(x) {
			default: this.codegen_case(cf,x); break;
			case "downloads-guide-item":
			case "library-guide-item":
		}
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {Extract<D_GuideEntry,{targetId:any;}>|D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	D_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		if(!navigationEndpoint.browseEndpoint) debugger;
		this.GE_Browse(navigationEndpoint);
		this.T_Icon_AnyOf("D_GuideEntry_Icon",icon,["OFFLINE_DOWNLOAD","VIDEO_LIBRARY_WHITE"]);
		this.D_GuideEntry_TargetId(targetId);
		if(isPrimary!==true) debugger;
	}
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
	parse_guide_entry_id(x) {
		if(this.str_starts_with_rx("UC",x)) {
			if(x.length===24) return;
			console.log("[guideEntryId.channel.length]",x.length);
			return;
		}
		if(this.str_starts_with_rx("PL",x)) {
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
		const cf="D_GuideEntryData"; this.k(cf,x);
		const {guideEntryId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_guide_entry_id(guideEntryId);
	}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_GuideEntryBadges(x) {
		const cf="D_GuideEntryBadges"; this.k(cf,x);
		const {liveBroadcasting,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(liveBroadcasting);
	}
	/** @type {D_GuideEntry_IconType_Obj} */
	D_GuideEntry_IconType={
		WithNavEP: [
			"MY_VIDEOS","TRENDING","WATCH_HISTORY","WATCH_LATER","CLAPPERBOARD","MUSIC","LIVE",
			"GAMING_LOGO","COURSE","TROPHY","NEWS","YOUTUBE_ROUND","FASHION_LOGO","FLAG",
			"CREATOR_STUDIO_RED_LOGO","YOUTUBE_MUSIC","YOUTUBE_KIDS_ROUND","UNPLUGGED_LOGO","SETTINGS",
			"ADD_CIRCLE",
		],
		WithIcon: [
			"HELP","FEEDBACK",
		]
	};
	/** @type {Extract<D_GuideEntry,{icon:any}>['icon']['iconType'][]} */
	D_GuideEntry_MissingIconType=[];
	/** @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry_WithNavEP} x */
	D_GuideEntry_WithNavEP(cf1,x) {
		const cf2="D_GuideEntry_WithNavEP";
		if("targetId" in x) return this.D_GuideEntry_WithTargetId(cf1,x);
		if("isPrimary" in x) {
			const {navigationEndpoint,icon,isPrimary,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.GE_Browse(navigationEndpoint);
			switch(icon.iconType) {
				case "SUBSCRIPTIONS": break;
				case "WHAT_TO_WATCH": break;
				default: debugger; break;
			}
			if(isPrimary!==true) debugger;
			return;
		}
		const {navigationEndpoint,icon,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
		x: {
			let x=navigationEndpoint;
			if("browseEndpoint" in x) {
				this.GE_Browse(x);
				break x;
			}
			if("urlEndpoint" in x) {
				this.E_Url(x);
				break x;
			}
		}
		let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithNavEP:icon",icon,this.D_GuideEntry_IconType.WithNavEP);
		if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithNavEP,this.D_GuideEntry_MissingIconType);
		{
			let x=navigationEndpoint;
			if("urlEndpoint" in x) return this.E_Url(x);
			if("browseEndpoint" in x) return this.GE_Browse(x);;
		}
	}
	/** @private @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry_WithPrimary} x */
	D_GuideEntry_WithPrimary(cf1,x) {
		/** @type {`${cf1}_WithPrimary`} */
		const cf2=`${cf1}_WithPrimary`;
		const {icon,isPrimary,serviceEndpoint,...y}=this.D_GuideEntry_Omit(cf2,x); this.g(y);
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
		}
	}
	/** @private @arg {"D_GuideEntry"} cf1 @arg {D_GuideEntry} x */
	D_GuideEntry_WithIcon(cf1,x) {
		const cf2="D_GuideEntry_WithIcon";
		if("entryData" in x) {
			if("icon" in x) {
				const {navigationEndpoint,icon,entryData,...y}=this.D_GuideEntry_Omit(cf1,x); this.g(y);
				if(!navigationEndpoint.browseEndpoint) debugger;
				this.GE_Browse(navigationEndpoint);
				switch(icon.iconType) {
					default: icon===""; this.codegen_typedef_all(cf1,x); break;
					case "LIKES_PLAYLIST": case "PLAYLISTS":
				}
				return this.R_GuideEntryData(entryData);
			}
			const {...u}=this.D_GuideEntry_Omit(cf1,x);
			const {entryData,navigationEndpoint,thumbnail,badges,presentationStyle,...y}=this.s(cf2,u); this.g(y);/*#destructure_done*/
			this.R_GuideEntryData(entryData);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.GE_Browse(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_GuideEntryBadges(badges);
			if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
			return;
		}
		if("navigationEndpoint" in x) return this.D_GuideEntry_WithNavEP(cf1,x);
		if("isPrimary" in x) return this.D_GuideEntry_WithPrimary(cf1,x);
		if("serviceEndpoint" in x) {
			const {accessibility,formattedTitle,icon,serviceEndpoint,trackingParams,...y}=this.s(cf1,x); this.g(y);
			this.D_Accessibility(accessibility);
			this.G_Text(formattedTitle);
			let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithIcon:icon",icon,this.D_GuideEntry_IconType.WithIcon);
			if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithIcon,this.D_GuideEntry_MissingIconType);
			/** @type {`${cf2}.SE_Signal`} */
			const cf3=`${cf2}.SE_Signal`;
			let [a,b]=this.T_SE_Signal(cf3,serviceEndpoint);
			this.M_SendPost(a);
			/** @type {`${cf3}.data`} */
			const cf4=`${cf3}.data`;
			this.G_ClientSignal(cf4,b);
			this.trackingParams(cf1,trackingParams);
			return;
		}
		if("icon" in x&&"trackingParams" in x&&"formattedTitle" in x&&"accessibility" in x) {
			const {icon,trackingParams,formattedTitle,accessibility,...y}=this.s(cf1,x); this.g(y);
			this.D_Accessibility(accessibility);
			this.trackingParams(cf1,trackingParams);
			this.G_Text(formattedTitle);
			this.D_Accessibility(accessibility);
			return;
		}
		this.codegen_typedef_all(cf1,x);
	}
	/** @private @arg {D_GuideEntry} x */
	D_GuideEntry(x) {
		const cf="D_GuideEntry"; this.k(cf,x);
		if("targetId" in x) return this.D_GuideEntry_WithTargetId(cf,x);
		if("icon" in x) return this.D_GuideEntry_WithIcon(cf,x);
		if("presentationStyle" in x) {
			const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.GE_Browse(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_GuideEntryBadges(badges);
			this.trackingParams(cf,trackingParams);
			this.G_Text(formattedTitle);
			this.D_Accessibility(accessibility);
			this.R_GuideEntryData(entryData);
			switch(presentationStyle) {
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT":
				case "GUIDE_ENTRY_PRESENTATION_STYLE_NONE": break;
				default: console.log(`[D_GuideEntry_PresentationType]\n\n\ncase"${presentationStyle}":`); break;
			}
			return;
		}
		x===""; this.codegen_typedef_all(cf,x); x==="";
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry"; this.k(cf,x);
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(headerEntry);
		this.T_Icon("D_Guide_ExpandIcon",expanderIcon);
		this.T_Icon("D_Guide_CollapseIcon",collapserIcon);
		this.z(sectionItems,this.G_GuideSectionItem);
		if(handlerDatas[0]!=="GUIDE_ACTION_ADD_TO_PLAYLISTS") debugger;
		if(handlerDatas[1]!=="GUIDE_ACTION_REMOVE_FROM_PLAYLISTS") debugger;
		if(handlerDatas.length!==2) debugger;
	}
	/** @private @arg {D_AutoplayContent} x */
	D_AutoplayContent(x) {
		const cf="D_AutoplayContent"; this.k(cf,x);
		const {sets,countDownSecs,modifiedSets,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(sets,this.D_AutoplaySetItem);
		if(countDownSecs&&countDownSecs!==5) debugger;
		if(modifiedSets!==void 0) this.z(modifiedSets,this.D_ModifiedSetItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_PlaylistContent} x */
	D_PlaylistContent(x) {
		const cf="D_PlaylistContent"; this.k(cf,x);
		const {contents,title,currentIndex,playlistId,ownerName,isInfinite,playlistShareUrl,shortBylineText,longBylineText,playerInfoView,trackingParams,titleText,isEditable,menu,localCurrentIndex,playlistButtons,isCourse,nextVideoLabel,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(playerInfoView,x => this.ceq(x,"DO_NOT_CHANGE"));
		this.trackingParams(cf,trackingParams);
		this.z([ownerName,shortBylineText,longBylineText,titleText,nextVideoLabel],this.G_Text);
		this.z(contents,this.R_PlaylistPanelVideo);
		this.a_primitive_str(title);
		this.a_primitive_str(playlistId);
		this.a_primitive_num(currentIndex);
		this.parser.parse_url(cf,playlistShareUrl);
		this.R_Menu(menu);
		this.save_number("Playlist.localCurrentIndex",localCurrentIndex);
		this.R_Menu(playlistButtons);
		this._primitive_of(isInfinite,"boolean");
		this._primitive_of(isEditable,"boolean");
		this._primitive_of(isCourse,"boolean");
	}
	/** @private @arg {D_PlayerOverlayVideoDetails} x */
	D_PlayerOverlayVideoDetails(x) {
		const cf="D_PlayerOverlayVideoDetails"; this.k(cf,x);
		const {title,subtitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(subtitle);
	}
	/** @private @arg {RS_Page_Channel} x */
	RS_ChannelPage(x) {
		const cf="R_ChannelPage"; this.k(cf,x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="channel") debugger;
		this.GE_Browse(endpoint);
		this.RS_Channel(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {RS_Page_Search} x */
	RS_SearchPage(x) {
		const cf="RS_SearchPage"; this.k(cf,x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="search") debugger;
		this.E_Search(endpoint);
		this.RS_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		const cf="D_FeedTabbedHeader"; this.k(cf,x);
		const {title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
	}
	/** @private @arg {D_Cache_MD} x */
	D_Cache_MD(x) {
		const cf="CacheMetadata"; this.k(cf,x);
		const {isCacheHit,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!isCacheHit) debugger;
	}
	/** @private @arg {B_StateTag} x */
	B_StateTag(x) {
		const cf="StateTag"; this.k(cf,x);
		if(x.stateTag!==3) debugger;
		if("instruction" in x) {
			const {stateTag: {},instruction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(instruction!=="STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY") debugger;
			return;
		}
		const {stateTag: {},onStateTagModified,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(onStateTagModified!=="STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE") debugger;
	}
	static {this.prototype.MC_ResolveUrl;}
	/** @private @arg {MC_ResolveUrl} x */
	MC_ResolveUrl(x) {
		const cf="MC_ResolveUrl"; this.k(cf,x);
		const {isVanityUrl,parentTrackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(isVanityUrl!==void 0) this._primitive_of(isVanityUrl,"boolean");
		this.t(parentTrackingParams,a => this.params(cf,"tracking.parentTrackingParams",a));
	}
	/** @private @arg {DC_AdsControlFlowOpportunityReceived} x */
	DC_AdsControlFlowOpportunityReceived(x) {
		const cf="DC_AdsControlFlowOpportunityReceived"; this.k(cf,x);
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_enum("OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.D_AdSlotAndLayoutItem));
		this._primitive_of(isInitialLoad,"boolean");
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC","responseContext",x);}
	/** @private @arg {D_LoggingDirectives} x */
	D_LoggingDirectives(x) {
		const cf="D_LoggingDirectives"; this.k(cf,x);
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.TM_Visibility(visibility);
		this.t(gestures,this.D_LoggingDirectives_Gestures);
		if(enableDisplayloggerExperiment!==void 0) this._primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @private @arg {D_LoggingDirectives_Gestures} x */
	D_LoggingDirectives_Gestures(x) {
		const cf="D_LoggingDirectives_Gestures"; this.g_k(cf,x); this.k(cf,x);
		let inner=this.T_Types(x);
		if(inner!==4) debugger;
	}
	/** @private @arg {TA_Continuation<`comment-replies-item-${string}`,R_Comment>} x */
	CommentRepliesItem(x) {
		const cf="CommentRepliesItem"; this.k(cf,x);
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_Comment);
	}
	/** @private @arg {D_FeedbackResponseProcessedStatus} x */
	D_FeedbackResponseProcessedStatus(x) {
		const cf="D_FeedbackResponseProcessedStatus"; this.k(cf,x);
		const {isProcessed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(isProcessed,"boolean");
	}
	/** @private @arg {AU_EngagementPanel} x */
	AU_EngagementPanel(x) {
		const cf="AU_EngagementPanel"; this.k(cf,x);
		const {updateEngagementPanelAction,clickTrackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.AD_UpdateEngagementPanel(updateEngagementPanelAction);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge"; this.k(cf,x);
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(interpreterUrl,a => {
			let uw=this.UrlWrappedValueT(a);
			this.a_primitive_str(uw);
		});
		this.a_primitive_str(interpreterHash);
		this.a_primitive_str(program);
		if(globalName!=="trayride") debugger;
	}
	/** @private @arg {D_ElementUpdate} x */
	D_ElementUpdate(x) {
		const cf="D_ElementUpdate"; this.k(cf,x);
		if("templateUpdate" in x) return this.R_TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return this.R_ResourceStatusInResponseCheck(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_TemplateUpdate} x */
	D_TemplateUpdate(x) {
		const cf="D_TemplateUpdate"; this.k(cf,x);
		if("dependencies" in x) {
			const {identifier,dependencies,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			let idp=split_string_once(identifier,"|");
			if(idp[0]!=="track_selection_sheet_option.eml") debugger;
			this.save_string("D_TemplateUpdate.identifier.id",idp[0]);
			this.save_string("D_TemplateUpdate.identifier.hash",idp[1]);
			this.t(dependencies,dep_arr => {
				if(dep_arr.length!==1) debugger;
				const dep=dep_arr[0];
				let ddp=split_string_once(dep,"|");
				if(ddp[0]!=="bottom_sheet_list_option.eml") debugger;
				this.save_string(`D_TemplateUpdate.${idp[0]}.deps[0].id`,idp[0]);
				this.save_string(`D_TemplateUpdate.${idp[0]}.deps[0].hash`,idp[1]);
			});
			this.a_primitive_str(a);
		} else {
			const {identifier,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			let idp=split_string_once(identifier,"|");
			if(idp[0]!=="bottom_sheet_list_option.eml") debugger;
			this.a_primitive_str(a);
		}
	}
	/** @private @arg {DC_EntityBatchUpdate} x */
	D_EntityBatchUpdate(x) {
		const cf="D_EntityBatchUpdate"; this.k(cf,x);
		const {mutations,timestamp,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(mutations,this.DE_MutationItem);
		this.D_TimestampWithNanos(timestamp);
	}
	/** @private @arg {D_TimestampWithNanos} x */
	D_TimestampWithNanos(x) {
		const cf="D_TimestampWithNanos"; this.k(cf,x);
		const {seconds,nanos,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(seconds);
		this.a_primitive_num(nanos);
	}
	/** @private @arg {D_EY_Offlineability} x */
	D_EY_Offlineability(x) {
		const cf="D_EY_Offlineability";
		if("command" in x) {
			const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=this.s(cf,x); this.g(y);
			this.params(`${cf}.key`,"entity.key",key);
			console.log(`${cf}.command`,command);
			switch(addToOfflineButtonState) {
				default: debugger; break;
				case "ADD_TO_OFFLINE_BUTTON_STATE_UNKNOWN":
				case "ADD_TO_OFFLINE_BUTTON_STATE_ENABLED":
			}
			if(contentCheckOk!==false) debugger;
			if(racyCheckOk!==false) debugger;
			this.D_LoggingDirectives(loggingDirectives);
			return;
		}
		const {key,addToOfflineButtonState,...y}=this.s(cf,x); this.g(y);
		if(addToOfflineButtonState!=="ADD_TO_OFFLINE_BUTTON_STATE_UNKNOWN") debugger;
		this.params(`${cf}.key`,"entity.key",key);
	}
	/** @private @arg {O_DU_Persistence} x */
	O_DU_Persistence(x) {
		const cf="O_DU_Persistence"; this.k(cf,x);
		const {persistenceOption,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @private @arg {D_TwoColumnBrowseResults} x */
	D_TwoColumnBrowseResults(x) {
		const cf="D_TwoColumnBrowseResults"; this.k(cf,x);
		const {tabs,secondaryContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,this.RG_Result);
		this.t(secondaryContents,this.G_SecondaryContents);
	}
	/** @private @arg {TM_Visibility} x */
	TM_Visibility(x) {
		const cf="TM_Visibility"; this.k(cf,x);
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_string("[Visibility.types]",types);
	}
	/** @private @arg {TA_Continuation<"comments-section",G_CommentsSection>} x */
	A_CommentsSectionContinuation$(x) {
		const cf="A_CommentsSectionContinuation";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,this.g);
	}
	/** @private @arg {TA_Continuation<"browse-feedFEwhat_to_watch",G_BrowseFeed>} x */
	A_BrowseFeed(x) {
		const cf="A_BrowseFeed"; this.k(cf,x);
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_BrowseFeed);
	}
	/** @private @arg {TA_Continuation<"watch-next-feed",G_WatchNext>} x */
	A_WatchNext(x) {
		const cf="A_WatchNext"; this.k(cf,x);
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_WatchNext);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel"; this.k(cf,x);
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {this.z(engagementPanels,this.R_EngagementPanelSectionList);}
	}
	/** @private @arg {M_SendPost} x */
	M_SendPost(x) {this.T_WCM("M_SendPost",x,this.GM_SendPost);}
	/** @private @arg {M_CreateBackstagePost} x */
	M_CreateBackstagePost(x) {this.T_WCM("M_CreateBackstagePost",x,this.GM_CreateBackstagePost);}
	/** @private @arg {M_AccountMenu} x */
	M_AccountMenu(x) {this.T_WCM("M_AccountMenu",x,this.GM_AccountMenu);}
	/** @private @arg {M_GetUnseenNotificationCount} x */
	M_GetUnseenNotificationCount(x) {this.T_WCM("M_GetUnseenNotificationCount",x,this.GM_GetUnseenNotificationCount);}
	/** @private @arg {M_GetNotificationMenu} x */
	M_GetNotificationMenu(x) {this.T_WCM("M_GetNotificationMenu",x,this.GM_GetNotificationMenu);}
	/** @protected @arg {GC_Button} x */
	GC_Button(x) {
		const cf="GC_Button"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		if("signalServiceEndpoint" in x) return this.T_SE_Signal(`${cf}.SE_Signal`,x);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("commandExecutorCommand" in x) return this.C_Executor(x);
		if("createBackstagePostEndpoint" in x) return this.E_CreateBackstagePost(x);
		if("getSurveyCommand" in x) return this.C_GetSurvey(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("showReelsCommentsOverlayCommand" in x) return this.C_ShowReelsCommentsOverlay(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {DC_Executor} x */
	DC_Executor(x) {this.T_Commands("DC_Executor",x,this.AC_Executor);}
	/** @private @arg {AC_Executor} x */
	AC_Executor(x) {
		const cf="AC_Executor"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		if("hideEngagementPanelScrimAction" in x) return this.A_HideEngagementPanelScrim(x);
		if("loopCommand" in x) return this.C_Loop(x);
		if("updateToggleButtonStateCommand" in x) return this.C_UpdateToggleButtonState(x);
		if("changeMarkersVisibilityCommand" in x) {debugger; return this.z([x],a => a);}
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) return this.C_EngagementPanelHeaderShowNavigationButton(x);
		if("entityUpdateCommand" in x) return this.C_EntityUpdate(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @arg {string} cf @arg {{}} x */
	codegen_break(cf,x) {
		this.codegen_typedef_all(`${cf}.commandMetadata`,x);
	}
	/** @type {Map<string,((y:C_UpdateToggleButtonState)=>void)>} */
	h_m=new Map;
	/** @private @arg {D_TopbarLogo} x */
	D_TopbarLogo(x) {
		const cf="D_TopbarLogo"; this.k(cf,x);
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.T_Icon("D_Icon_YoutubeLogo",iconImage);
		this.G_Text(tooltipText);
		this.GE_Browse(endpoint);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_str(overrideEntityKey);
	}
	/** @private @arg {D_AdSlotAndLayoutItem} x */
	D_AdSlotAndLayoutItem(x) {
		const cf="D_AdSlotAndLayoutItem"; this.k(cf,x);
		const {adLayoutMetadata,adSlotMetadata,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(adLayoutMetadata,this.MMD_AdLayout_TopImage);
		this.DMD_AdSlot(adSlotMetadata);
	}
	/** @private @arg {D_FusionSearchbox} x */
	D_FusionSearchbox(x) {
		const cf="D_FusionSearchbox"; this.k(cf,x);
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.T_Icon("D_Icon_Search",icon);
		this.G_Text(placeholderText);
		this.R_WebSearchboxConfig(config);
		this.trackingParams(cf,trackingParams);
		this.E_Search(searchEndpoint);
		this.R_Button(clearButton);
	}
	/** @private @arg {AD_HideEnclosing} x */
	AD_HideEnclosing(x) {this.y("AD_HideEnclosing","notificationId",x,this.a_primitive_str);}
	/** @private @arg {AD_ChangeEngagementPanelVisibility} x */
	AD_ChangeEngagementPanelVisibility(x) {
		const cf="AD_ChangeEngagementPanelVisibility"; this.k(cf,x);
		const {targetId,visibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(targetId) {
			default: targetId===""; this.codegen_case(`${cf}.targetId`,targetId); break;
			case "engagement-panel-clip-create":
			case "engagement-panel-clip-view":
			case "engagement-panel-comments-section":
			case "engagement-panel-error-corrections":
			case "engagement-panel-macro-markers-auto-chapters":
			case "engagement-panel-macro-markers-description-chapters":
			case "engagement-panel-structured-description":

		}
		switch(visibility) {
			default: this.codegen_case(`${cf}.visibility`,visibility); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED":
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN":
		}
	}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript"; this.k(cf,x);
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @private @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel"; this.k(cf,x);
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
		const cf="RS_Playlist"; this.k(cf,x);
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_PlaylistHeader(header);
		this.tz_cf(cf,alerts,this.RS_Playlist_AlertItem);
		this.R_Playlist_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_Microformat(microformat);
		this.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {string} cf1 @arg {NonNullable<RS_Playlist['alerts']>[number]} x */
	RS_Playlist_AlertItem(cf1,x) {
		const cf2="RS_Playlist_AlertItem";
		if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
		this.codegen_typedef_all(`${cf1}$${cf2}`,x);
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings"; this.k(cf,x);
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_FeedFilterChipBar} x */
	D_FeedFilterChipBar(x) {
		const cf="D_FeedFilterChipBar"; this.k(cf,x);
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		this.R_Button(nextButton);
		this.R_Button(previousButton);
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {D_ChipCloudChip} x */
	D_ChipCloudChip(x) {
		const cf="D_ChipCloudChip"; this.k(cf,x);
		if("navigationEndpoint" in x) return this.D_ChipCloudChip_WithNav(cf,x);
		if("isSelected" in x) {
			let d=this.D_ChipCloudChip_Omit(cf,x);
			const {isSelected: a,...y}=this.s(cf,d); this.g(y);/*#destructure_done*/
			if(a!==true) debugger;
			return;
		}
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_WithNav(cf,x) {
		let {style,text,trackingParams,...x1}=this.D_ChipCloudChip_OmitNav(cf,x);
		let ia=this.strings_map.get(cf);
		if(!ia) this.strings_map.set(cf,ia=[]);
		ia.push(["style.styleType",[style.styleType]]);
		this.trackingParams(cf,trackingParams);
		if("isSelected" in x1) {
			const {isSelected: a,...y}=x1; this.g(y);
			this.a_primitive_bool(a);
			return;
		}
		if("uniqueId" in x1) {
			const {uniqueId: b,...y}=x1; this.g(y);/*#destructure_done*/
			if(b!=="ATTRIBUTE_FILTER_TYPE_EXPLORE") debugger;
			return;
		}
		if("targetId" in x1) {
			const {targetId: a,...y}=x1; this.g(y);/*#destructure_done*/
			if(a!=="feed_filter_chip_bar_second_chip") debugger;
			return;
		}
		this.g(x1);
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_OmitNav(cf,x) {
		const {navigationEndpoint: a,...y}=this.s(cf,x);
		this.D_ChipCloudChip_navigationEndpoint(a);
		return y;
	}
	/** @private @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>['navigationEndpoint']} x */
	D_ChipCloudChip_navigationEndpoint(x) {
		const cf="D_ChipCloudChip_navigationEndpoint"; this.k(cf,x);
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("relatedChipCommand" in x) return this.C_RelatedChip(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @arg {CF_D_ChipCloudChip_Omit} cf @private @template {D_ChipCloudChip} T @arg {T} x */
	D_ChipCloudChip_Omit(cf,x) {
		const {style: a,text: b,trackingParams: c,...y}=this.s(cf,x);
		switch(a.styleType) {
			case "STYLE_DEFAULT":
			case "STYLE_HOME_FILTER":
			case "STYLE_REFRESH_TO_NOVEL_CHIP": break;
		}
		this.G_Text(b);
		this.trackingParams(cf,c);
		return y;
	}
	/** @private @arg {D_AutoplaySetItem} x */
	D_AutoplaySetItem(x) {
		const cf="D_AutoplaySetItem"; this.k(cf,x);
		const {mode,autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(mode!=="NORMAL") debugger;
		this.E_Watch(autoplayVideo);
		this.t(nextButtonVideo,this.E_Watch);
		this.t(previousButtonVideo,this.E_Watch);
	}
	/** @private @arg {D_ModifiedSetItem} x */
	D_ModifiedSetItem(x) {
		const cf="D_ModifiedSetItem"; this.k(cf,x);
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_WatchPlaylist(autoplayVideo);
		this.E_WatchPlaylist(nextButtonVideo);
		this.t(previousButtonVideo,this.E_WatchPlaylist);
	}
	/** @private @arg {MG_AdLayout_TopImage} x */
	MMD_AdLayout_TopImage(x) {
		const cf="MMD_AdLayout_TopImage"; this.k(cf,x);
		const {layoutType,layoutId,adLayoutLoggingData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(layoutType);
		this.a_primitive_str(layoutId);
		this.D_AdLayoutLoggingData(adLayoutLoggingData);
	}
	/** @private @arg {D_HotkeyDialog} x */
	D_HotkeyDialog(x) {
		const cf="D_HotkeyDialog"; this.k(cf,x);
		const {title,sections,dismissButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(sections,this.R_HotkeyDialogSection);
		this.R_Button(dismissButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_HotkeyDialogSection} x */
	D_HotkeyDialogSection(x) {
		const cf="D_HotkeyDialogSection"; this.k(cf,x);
		const {title,options: u,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(u,this.R_HotkeyDialogSectionOption);
	}
	/** @private @arg {D_HotkeyDialogSectionOption} x */
	D_HotkeyDialogSectionOption(x) {
		const cf="D_HotkeyDialogSectionOption"; this.k(cf,x);
		const {label,hotkey,...y}=this.s(cf,x);
		this.G_Text(label);
		this.a_primitive_str(hotkey);
		if("hotkeyAccessibilityLabel" in y) {
			const {hotkeyAccessibilityLabel,...y1}=this.s(cf,y); this.g(y1);/*#destructure_done*/
			return this.D_Accessibility(hotkeyAccessibilityLabel);
		}
		this.g(y);
	}
	/** @private @arg {D_CinematicContainer} x */
	D_CinematicContainer(x) {
		const cf="D_CinematicContainer"; this.k(cf,x);
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(backgroundImageConfig,this.D_ThumbnailsList);
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
	/** @private @arg {D_AdLayoutLoggingData} x */
	D_AdLayoutLoggingData(x) {const cf="D_AdLayoutLogging"; this.H_(cf,"serializedAdServingDataEntry",x,x => this.params(cf,"AdServingDataEntry",x));}
	/** @private @arg {D_PrefetchHintConfig} x */
	D_PrefetchHintConfig(x) {
		const cf="D_PrefetchHintConfig"; this.k(cf,x);
		const {prefetchPriority,...y}=this.s(cf,x);/*#destructure_off*/
		this.ceq(prefetchPriority,0);
		if(prefetchPriority!==0) debugger;
		if("countdownUiRelativeSecondsPrefetchCondition" in y) {
			const {countdownUiRelativeSecondsPrefetchCondition: a,...x1}=y; this.g(x1);/*#destructure_done*/
			if(a!==-3) debugger;
			return;
		}
		if("playbackRelativeSecondsPrefetchCondition" in y) {
			const {playbackRelativeSecondsPrefetchCondition: a,...x1}=y; this.g(x1);/*#destructure_done*/
			if(a!==-3) debugger;
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData"; this.k(cf,x);
		const {serverBuildLabel,resourceStatuses: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(serverBuildLabel);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus"; this.k(cf,x);
		const {identifier,status,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.a_primitive_str(identifier);
	}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail"; this.k(cf,x);
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,a);
		this.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel"; this.k(cf,x);
		const {responseContext: {},trackingParams,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel_Action";
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(cf,clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @private @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe"; this.k(cf,x);
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,this.G_RS_Subscribe_Action);
		this.g(newNotificationButton);
		this.trackingParams(cf,trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {T_RemovePrefix<Omit<D_LikeButton,"likesAllowed">, "like">} x */
	D_LikeButton_Like(x) {
		const cf="D_LikeButton.like"; this.k(cf,x);
		const {status,count,countText,countWithLikeText,countWithUnlikeText,countTooltipText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="INDIFFERENT") debugger;
		this.t(count,this.a_primitive_num);
		this.G_Text(countText);
		this.t(countWithLikeText,this.G_Text);
		this.t(countWithUnlikeText,this.G_Text);
		this.t(countTooltipText,this.G_Text);
	}
	/** @private @arg {D_LikeButton} x */
	D_LikeButton(x) {
		const cf="D_LikeButton"; this.k(cf,x);
		const {likesAllowed,...y}=this.s(cf,x);
		if(likesAllowed!==true) debugger;
		let [upt,ur]=this.unwrap_prefix(y,"like");
		this.D_LikeButton_Like(upt);
		{
		}
		let [{...ud},{...r2}]=this.unwrap_prefix(ur,"dislike");
		{
			const cf="D_LikeButton.dislike";
			const {countText,countWithDislikeText,countWithUndislikeText,countTooltipText,...y}=this.s(cf,ud); this.g(y);
		}
		{
			const cf="D_LikeButton.rest";
			const {target,trackingParams,serviceEndpoints,...y}=r2; this.g(y);
			this.D_LikeApi(target);
			this.trackingParams(cf,trackingParams);
			this.z(serviceEndpoints,this.E_Like);
		}
	}
	/** @private @arg {D_LikeApi} x */
	D_LikeApi(x) {
		const cf="D_LikeApi"; this.k(cf,x);
		{
			const cn="videoId";
			if(cn in x) {
				const {[cn]: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				return this[cn](a);
			}
		}
		{
			const cn="playlistId";
			if(cn in x) {
				const {[cn]: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				return this[cn](a);
			}
		}
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {RG_Watch_ItemSection} x */
	RG_Watch_ItemSection(x) {
		let u=this.TR_ItemSection_3(x); if(!u) return;
		let u1=this.TD_ItemSection_3(`TD_ItemSection_3<"sid-wn-chips","watch-next-feed">`,u);
		if(!u1) return;
		let [a,...section_arr]=u1;
		let section_str=this.join_string(section_arr,"-");
		switch(section_str) {
			default: debugger; break;
			case "sid-wn-chips-watch-next-feed": break;
		}
		this.z(a,this.G_Watch_SecondaryResults_G_SectionItem);
		return a;
	}
	/** @private @arg {CF_D_Playlist_Omit} cf @arg {D_CompactPlaylist} x */
	D_Playlist_Omit(cf,x) {
		let {shortBylineText,sidebarThumbnails,shareUrl,thumbnailRenderer,...y}=this.Omit_Menu_Radio(cf,x);
		this.G_Text(shortBylineText);
		this.z(sidebarThumbnails,this.D_Thumbnail);
		this.D_RadioShareUrl(shareUrl);
		return y;
	}
	/** @private @arg {D_CompactPlaylist} x */
	D_CompactPlaylist(x) {
		let y=this.D_Playlist_Omit("D_CompactPlaylist",x);
		const {...p}=y; p;
	}
	/** @private @arg {D_CompactRadio['secondaryNavigationEndpoint']} x */
	D_CompactRadio_NavE(x) {
		if(!x.watchEndpoint) debugger;
		this.E_Watch(x);
	}
	/** @private @arg {string} key @arg {Uint8Array} data @arg {number} [idx] */
	save_next_byte(key,data,idx=0) {
		let f=data[idx];
		/** @type {`${typeof key}.data[${typeof idx}]`} */
		let rk=`${key}.data[${idx}]`;
		/** @type {`${typeof rk}=${typeof f}`} */
		let k=`${rk}=${f}`;
		this.save_number(rk,f);
		this.save_number(k,1);
	}
	/** @private @arg {string} user_key @arg {string} x @arg {number} [idx] */
	save_next_char(user_key,x,idx=0) {
		let f=x[idx];
		/** @type {`${user_key}.data[${typeof idx}]`} */
		let rk=`${user_key}.data[${idx}]`;
		/** @type {`${typeof rk}[${f}]`} */
		let k=`${rk}[${JSON.stringify(f)}]`;
		this.save_string(rk,f);
		let s_url_data=this.ds.get_data_store().get_seen_numbers().find(e => e[0]===k);
		if(!s_url_data) return this.save_number(k,1);
		let wd=s_url_data[1];
		if(wd[0]!=="one") {debugger; return;}
		let [,di]=wd;
		if(!di.length) return this.save_number(k,1);
		let n=di[0]+1;
		this.save_number(k,n);
	}
	/** @api @public @arg {"WL"|"LL"|`PL${string}`|`RD${string}`|`RDMM${string}`|`RDCMUC${string}`} x */
	parse_playlist_id(x) {
		if(x===void 0) {debugger; return;}
		switch(x) {case "LL": case "WL": return; default: }
		// cspell:ignore RDCMUC
		if(this.str_starts_with_rx("RDCMUC",x)) return this.save_next_char("playlist_id.RDCMUC",split_string_once(x,"RDCMUC")[1]);
		if(this.str_starts_with_rx("RDMM",x)) return this.save_next_char("playlist_id.RDMM",split_string_once(x,"RDMM")[1]);
		if(this.str_starts_with_rx("RD",x)) return this.save_next_char("playlist_id.RD",split_string_once(x,"RD")[1]);
		if(this.str_starts_with_rx("PL",x)) return this.save_next_char("playlist_id.PL",split_string_once(x,"PL")[1]);
		this.save_next_char("playlist_id.other",x[0]);
		console.log("[new_parse_playlist_id]",x);
		{debugger;}
	}
	/** @private @arg {D_RadioShareUrl} b */
	D_RadioShareUrl(b) {
		const cf="D_RadioShareUrl";
		let up=this.parse_with_url_parse(b);
		{
			let obj=new UrlParseHelper(up);
			if(obj.get_with_pathname(up,"/watch")) {
				let {...s}=this.parse_url_search_params(up.search);
				if("v" in s) {
					let {v,playnext,list,...y}=this.s(cf,s); this.g(y);/*#destructure_done*/
					/** @returns {{k:1;a:string;}|{k:2;a:`RD${string}`}} */
					let gw=() => ({k: 1,a: v});
					let w=gw();
					if(this.str_starts_with_rx(w.a,"RD")) {w.k=2; w.k==2&&this.parse_playlist_id(w.a);;} else {
						this.save_next_char("share_url.v",w.a[0]);
						this.videoId(w.a);
					}
					if(playnext!=="1") debugger;
					if(!list) debugger; this.parse_playlist_id(list);
					return;
				}
				return;
			}
		}
		{
			let obj=new UrlParseHelper(up);
			if(obj.get_with_pathname(up,"/playlist")) {
				let {...s}=this.parse_url_search_params(up.search);
				if("list" in s) {
					let {list,...y}=this.s(cf,s); this.g(y);/*#destructure_done*/
					let w=list;
					if(this.str_starts_with(w,"PL")) return this.playlistId(w);
				}
				return;
			}
		}
		// let {...s}=this.parse_url_search_params(up.search);
		this.codegen_str(cf,b);
	}
	/** @private @arg {D_CompactRadio} x */
	D_CompactRadio(x) {
		const cf="D_CompactRadio"; this.k(cf,x);
		let {secondaryNavigationEndpoint: a,shareUrl: b,...o}=this.Omit_Menu_Radio(cf,x); o;
		this.D_CompactRadio_NavE(a); this.D_RadioShareUrl(b);
	}
	/** @private @arg {D_RelatedChipCloud} x */
	D_RelatedChipCloud(x) {this.y("D_RelatedChipCloud","content",x,this.R_ChipCloud);}
	/** @private @arg {D_AddToPlaylist} x */
	D_AddToPlaylist(x) {
		const cf="D_AddToPlaylist"; this.k(cf,x);
		const {playlists,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(playlists,this.R_PlaylistAddToOption);
		this.z(actions,this.R_AddToPlaylistCreate);
	}
	/** @private @arg {D_ProfileColumn} x */
	D_ProfileColumn(x) {this.z(this.T_Items("D_ProfileColumn",x),this.G_ProfileColumnItem);}
	/** @private @arg {D_ProfileColumnStatsEntry} x */
	D_ProfileColumnStatsEntry(x) {
		const cf="D_ProfileColumnStatsEntry"; this.k(cf,x);
		const {label,value,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(label);
		this.G_Text(value);
	}
	/** @private @arg {D_ProfileColumnUserInfo} x */
	D_ProfileColumnUserInfo(x) {
		const cf="D_ProfileColumnUserInfo"; this.k(cf,x);
		const {title,thumbnail,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.D_Thumbnail(thumbnail);
	}
	/** @private @arg {D_SubFeedSelector} x */
	D_SubFeedSelector(x) {
		const cf="D_SubFeedSelector"; this.k(cf,x);
		const {title,options,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(options,this.R_SubFeedOption);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_SubFeedOption["navigationEndpoint"]} x */
	D_SubFeedOption_NavEP(x) {
		const cf="D_SubFeedOption_NavEP"; this.k(cf,x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_SubFeedOption} x */
	D_SubFeedOption(x) {
		const cf="D_SubFeedOption"; this.k(cf,x);
		const {name,isSelected,navigationEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(name);
		this.a_primitive_bool(isSelected);
		this.D_SubFeedOption_NavEP(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_WebSearchboxConfig} x */
	D_WebSearchboxConfig(x) {
		const cf="D_WebSearchboxConfig"; this.k(cf,x);
		const {requestLanguage: a,requestDomain: b,hasOnscreenKeyboard: c,focusSearchbox: d,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!this.eq_keys([a,b],["en","ca"])) debugger;
		this.z([!c,d],x => {if(!x) debugger;});
	}
	/** @private @arg {AD_UpdateChannelSwitcherPage} x */
	AD_UpdateChannelSwitcherPage(x) {this.TA_Page("AD_UpdateChannelSwitcherPage",x,this.R_ChannelSwitcherPage);}
	/** @private @arg {AD_SendFeedback} x */
	AD_SendFeedback(x) {const cf="AD_SendFeedback",{bucket,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ if(bucket!=="Kevlar") debugger;}
	/** @private @arg {AD_AddToGuideSection} x */
	AD_AddToGuideSection(x) {
		const cf="AD_AddToGuideSection"; this.k(cf,x);
		const {handlerData,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(handlerData) {
			case "GUIDE_ACTION_ADD_TO_PLAYLISTS": break;
			case "GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS": break;
		}
		this.z(items,this.R_GuideEntry);
	}
	/** @private @arg {AD_SubscribeButton} x */
	AD_SubscribeButton(x) {
		const cf="AD_SubscribeButton"; this.k(cf,x);
		const {subscribed,channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(subscribed);
		this.D_ChannelId(channelId);
	}
	/** @private @arg {D_TopbarMenuButton_MenuItem} x */
	D_TopbarMenuButton_MenuItem(x) {
		const cf="D_TopbarMenuButton_MenuItem"; this.k(cf,x);
		const {sections,trackingParams,style,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.ceq(sections.length,1);
		let n=this.TR_MP_MenuSection(sections[0]);
		let n1=this.T_Items_TP("R_CompactLink_Items",n);
		this.tz(n1,this.R_CompactLink);
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_CREATION") debugger;
	}
	/** @arg {CF_T_Items_TP} cf @template T @private @arg {T_Items_TP<T>} x */
	T_Items_TP(cf,x) {
		const {trackingParams,...y}=this.s(cf,x);/*#destructure_off*/
		this.trackingParams(`T_Items_TP:${cf}`,trackingParams);
		return this.w_priv("items",y);
	}
	/** @arg {CF_T_Items} cf @template T @private @arg {T_Items<T>} x */
	T_Items(cf,x) {return this.w(`T_Items:${cf}`,"items",x);}
	/** @template T @private @arg {TR_MP_MenuSection<T>} x */
	TR_MP_MenuSection(x) {return x.multiPageMenuSectionRenderer;}
	/** @private @arg {"D_TopbarMenuButton"} cf @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton_Omit(cf,x) {
		const {trackingParams,accessibility,tooltip,...y}=this.s(cf,x);
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(tooltip);
		return y;
	}
	/** @private @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton(x) {
		const cf="D_TopbarMenuButton"; this.k(cf,x);
		let u=this.D_TopbarMenuButton_Omit(cf,x);
		if("menuRenderer" in u) {
			const {icon,menuRenderer,style,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			if(icon.iconType!=="VIDEO_CALL") debugger;
			let uv=this.TR_MultiPageMenu("R_TopbarMenu",menuRenderer);
			this.D_TopbarMenuButton_MenuItem(uv);
			if(style!=="STYLE_DEFAULT") debugger;
			return;
		}
		const {avatar,menuRequest,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(avatar);
		let res=this.T_SE_Signal(`${cf}.SE_Signal`,menuRequest);
		this.M_AccountMenu(res[0]);
		this.S_GetAccountMenu(res[1]);
	}
	/** @private @arg {D_NotificationTopbarButton} x */
	D_NotificationTopbarButton(x) {
		const cf="D_NotificationTopbarButton"; this.k(cf,x);
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(icon.iconType!=="NOTIFICATIONS") debugger;
		let [g_menu,menu_signal]=this.T_SE_Signal(`${cf}.menuRequest.T_SE_Signal`,menuRequest);
		this.M_GetNotificationMenu(g_menu);
		this.Signal_GetNotificationsMenu(menu_signal);
		if(style!=="NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT") debugger;
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(tooltip);
		let [m2,s2]=this.T_SE_Signal(`${cf}.U_UnseenCount.T_SE_Signal`,updateUnseenCountEndpoint);
		this.M_GetUnseenNotificationCount(m2);
		this.ceq(s2.signal,"GET_UNSEEN_NOTIFICATION_COUNT");
		this.a_primitive_num(notificationCount);
		this.ceq(handlerDatas.length,1);
		this.ceq(handlerDatas[0],"NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT");
	}
	/** @private @arg {Signal_GetNotificationsMenu} x */
	Signal_GetNotificationsMenu(x) {
		const cf="Signal_GetNotificationsMenu"; this.k(cf,x);
		const {signal,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(signal!=="GET_NOTIFICATIONS_MENU") debugger;
		/** @type {[(G_Action_GetNotificationsMenu["openPopupAction"])[], never[]]} */
		let [u]=this.z(actions,x => this.TA_OpenPopup("G_Action_GetNotificationsMenu",x));
		let [u1]=this.z(u,this.G_Action_GetNotificationsMenu_Popup);
		/** @type {[D_NotificationMenuPopupMenuItem[], never[]]} */
		let [u2]=this.z(u1,x => this.TR_MultiPageMenu("P_NotificationMenu_Popup",x));
		this.z(u2,this.D_NotificationMenuPopupMenuItem);
	}
	/** @private @arg {D_NotificationMenuPopupMenuItem} x */
	D_NotificationMenuPopupMenuItem(x) {
		const cf="D_NotificationMenuPopupMenuItem"; this.k(cf,x);
		const {trackingParams,style,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_2<any, "comments-entry-point">>['itemSectionRenderer']['contents'][number]} x */
	R_CommentItemSection_EntryPoint(x) {
		const cf="R_CommentItemSection_EntryPoint"; this.k(cf,x);
		if("commentsEntryPointHeaderRenderer" in x) return this.R_CommentsEntryPointHeader(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_CommentsEntryPointHeader} x */
	D_CommentsEntryPointHeader(x) {
		const cf="D_CommentsEntryPointHeader"; this.k(cf,x);
		const {headerText,onTap,trackingParams,commentCount,contentRenderer,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(headerText);
		this.C_Executor(onTap);
		this.trackingParams(cf,trackingParams);
		this.G_Text(commentCount);
		this.D_CommentsEntryPointHeader_contentRenderer(contentRenderer);
		if(targetId!=="comments-entry-point-header-identifier") debugger;
	}
	/** @private @arg {D_CommentsEntryPointHeader_contentRenderer} x */
	D_CommentsEntryPointHeader_contentRenderer(x) {
		const cf="D_CommentsEntryPointHeader_contentRenderer"; this.k(cf,x);
		if("commentsEntryPointTeaserRenderer" in x) return this.R_CommentsEntryPointTeaser(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_CommentsEntryPointTeaser} x */
	D_CommentsEntryPointTeaser(x) {
		const cf="D_CommentsEntryPointTeaser"; this.k(cf,x);
		const {teaserAvatar,teaserContent,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!teaserAvatar.accessibility) debugger;
		this.D_Thumbnail(teaserAvatar);
		this.G_Text(teaserContent);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {S_GetAccountMenu} x */
	S_GetAccountMenu(x) {
		const cf="S_GetAccountMenu"; this.k(cf,x);
		const {signal,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(signal!=="GET_ACCOUNT_MENU") debugger;
		let [u]=this.z(actions,x => this.TA_OpenPopup("TA_OpenPopup<D_GetAccountMenu_Popup>",x));
		let [u1]=this.z(u,this.Popup_GetAccountMenu);
		let [u2]=this.z(u1,x => this.TR_MultiPageMenu("TR_MultiPageMenu<MP_AccountMenu>",x));
		this.z(u2,this.MP_AccountMenu);
	}
	/** @private @arg {MP_AccountMenu} x */
	MP_AccountMenu(x) {
		const cf="MP_AccountMenu"; this.k(cf,x);
		const {style,trackingParams,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT") debugger;
		this.trackingParams(cf,trackingParams);
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {D_GetAccountMenu_Popup} x */
	Popup_GetAccountMenu(x) {
		const cf="Popup_GetAccountMenu"; this.k(cf,x);
		const {popup: a,popupType: b,beReused: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(b!=="DROPDOWN") debugger;
		if(c!==true) debugger;
		return a;
	}
	/** @private @arg {D_ChipCloud} x */
	D_ChipCloud(x) {
		const cf="D_ChipCloud"; this.k(cf,x);
		const {chips,trackingParams,horizontalScrollable,nextButton,previousButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(chips,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		if(horizontalScrollable!==false) debugger;
		this.z([nextButton,previousButton],this.R_Button);
	}
	/** @private @arg {D_ReelPlayerHeader} x */
	D_ReelPlayerHeader(x) {
		const cf="D_ReelPlayerHeader"; this.k(cf,x);
		const {reelTitleText,timestampText,channelNavigationEndpoint,channelTitleText,channelThumbnail,trackingParams,accessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(reelTitleText);
		this.G_Text(timestampText);
		this.GE_Browse(channelNavigationEndpoint);
		this.G_Text(channelTitleText);
		this.D_Thumbnail(channelThumbnail);
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
	}
	/** @private @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe"; this.k(cf,x);
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			x;
		});
		this.trackingParams(cf,trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference"; this.k(cf,x);
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			if(!x.openPopupAction) debugger;
			this.g(x.openPopupAction);
		});
		this.trackingParams(cf,trackingParams);
		this.R_EntityBatchUpdate(frameworkUpdates);
		this.D_ChannelId(channelId);
		this.R_SubscriptionNotificationToggleButton(newNotificationButton);
	}
	/** @type {string[]} */
	logged_strings=[];
	group_sub_noti_toggle_btn=false;
	/** @private @arg {D_SubscriptionNotificationToggleButton} x */
	D_SubscriptionNotificationToggleButton(x) {
		const cf="D_SubscriptionNotificationToggleButton"; this.k(cf,x);
		const {states,currentStateId,trackingParams,command,targetId,secondaryIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(this.group_sub_noti_toggle_btn) console.group(`--- [${cf}] ---`);
		let ids=this.exact_arr(states[0].stateId,states[1].stateId,states[2].stateId);
		const n2=2,n3=3,n0=0;
		/** @type {[n2,n3,n0]} */
		const ids_e=[n2,n3,n0];
		let log_states=false;
		if(!this.eq_keys(ids,ids_e)) log_states=true;
		this.z(states,(x,i) => {
			const {nextStateId,stateId,state,...y}=this.s("ToggleButton.state",x); this.g(y);
			if(nextStateId!==stateId) debugger;
			if(log_states) console.log("[button.state_id.%s]",i,stateId);
			this.R_Button(state);
			return stateId;
		});
		if(this.group_sub_noti_toggle_btn) console.groupEnd();
		switch(currentStateId) {
			default: debugger; break;
			case 0: case 2: case 3:
		}
		this.trackingParams(cf,trackingParams);
		this.C_Executor(command);
		switch(targetId) {
			default: if(!this.logged_strings.includes(`${cf}:${targetId}`)) {
				this.logged_strings.push(`${cf}:${targetId}`);
				console.log("[D_SubscriptionNotificationToggleButton.targetId]",targetId);
			} break;
			case "notification-bell": break;
		}
		if(secondaryIcon.iconType!=="EXPAND_MORE") debugger;
	}
	/** @private @arg {D_ExpandableTab} x */
	D_ExpandableTab(x) {
		const cf="D_ExpandableTab"; this.k(cf,x);
		const {endpoint,title,selected,expandedText,content,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.g(endpoint);
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		this.t(expandedText,this.a_primitive_str);
		this.t(content,this.R_SectionList);
	}
	/** @private @arg {D_FeedNudge} x */
	D_FeedNudge(x) {
		const cf="D_FeedNudge"; this.k(cf,x);
		const {lightIconImage,title,subtitle,dismissButton,impressionEndpoint,trackingParams,style,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(lightIconImage);
		this.G_Text(title);
		this.G_Text(subtitle);
		this.R_Button(dismissButton);
		this.E_Feedback(impressionEndpoint);
		this.trackingParams(cf,trackingParams);
		if(style!=="FEED_NUDGE_STYLE_CHIP") debugger;
		this.z(contents,this.R_ChipCloudChip);
	}
	/** @template {number} T @arg {`${T}`} x */
	parse_number_template(x) {
		/** @type {T} */
		let num=as(parseInt(x,10));
		if(Number.isNaN(num)) {debugger;}
		return num;
	}
	/** @private @arg {D_EndScreenPlaylist} x */
	D_EndScreenPlaylist(x) {
		const cf="D_EndScreenPlaylist"; this.k(cf,x);
		const {playlistId,thumbnail,title,trackingParams,longBylineText,videoCountText,videoCount,navigationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.playlistId(playlistId);
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.G_Text(longBylineText);
		this.G_Text(videoCountText);
		this.t(videoCount,this.parse_number_template);
		this.E_Watch(navigationEndpoint);
	}
	/** @private @arg {D_SearchBox} x */
	D_SearchBox(x) {
		const cf="D_SearchBox"; this.k(cf,x);
		const {endpoint,searchButton,clearButton,placeholderText,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GE_Browse(endpoint);
		this.R_Button(searchButton);
		this.R_Button(clearButton);
		this.G_Text(placeholderText);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_Comment} x */
	D_Comment(x) {
		const cf="D_Comment"; this.k(cf,x);
		const {authorText,authorThumbnail,actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,collapseButton,commentId,contentText,currentUserReplyThumbnail,voteCount,isLiked,expandButton,publishedTimeText,voteStatus,trackingParams,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(authorText);
		this.D_Thumbnail(authorThumbnail);
		this.R_CommentActionButtons(actionButtons);
		this.R_Menu(actionMenu);
		this.g(authorEndpoint);
		this.a_primitive_bool(authorIsChannelOwner);
		this.R_Button(collapseButton);
		console.log(`[${cf}.commentId]`,commentId);
		this.G_Text(contentText);
		this.D_Thumbnail(currentUserReplyThumbnail);
		this.G_Text(voteCount);
		this.a_primitive_bool(isLiked);
		this.R_Button(expandButton);
		this.G_Text(publishedTimeText);
		this.ceq(voteStatus,"INDIFFERENT");
		this.trackingParams(cf,trackingParams);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader"; this.k(cf,x);
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Button(playButton);
		this.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.playlistId(playlistId);
		console.log(`${cf}.privacy`,privacy);
		this.R_Button(shufflePlayButton);
		this.trackingParams(cf,trackingParams);
		this.D_EditableDetails(editableDetails);
		this.E_PlaylistEditor(editorEndpoint);
		this.a_primitive_bool(isEditable);
		this.GE_Browse(ownerEndpoint);
		this.z(serviceEndpoints,this.E_PlaylistEdit);
		this.R_Menu(moreActionsMenu);
		this.G_Text(title);
		this.G_Text(numVideosText);
		this.G_Text(descriptionTapText);
		this.g(descriptionText);
		if(!onDescriptionTap.openPopupAction) debugger;
		this.g(onDescriptionTap.openPopupAction);
		this.D_CanShare(shareData);
		this.z(stats,this.G_Text);
		this.z(briefStats,this.G_Text);
		this.z(byline,this.R_PlaylistByline);
		this.G_Text(ownerText);
		this.G_Text(viewCountText);
		this.R_CinematicContainer(cinematicContainer);
	}
	/** @private @arg {D_EditableDetails} x */
	D_EditableDetails(x) {this.y("D_EditableDetails","canDelete",x,x => this.ceq(x,false));}
	/** @private @arg {D_CanShare} x */
	D_CanShare(x) {this.y("D_CanShare","canShare",x,x => this.ceq(x,false));}
	/** @private @arg {D_HeroPlaylistThumbnail} x */
	D_HeroPlaylistThumbnail(x) {
		const cf="D_HeroPlaylistThumbnail"; this.k(cf,x);
		const {thumbnail,maxRatio,trackingParams,onTap,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		if(this.num_to_string(maxRatio)!=="0.5625") debugger;
		this.trackingParams(cf,trackingParams);
		this.E_Watch(onTap);
		this.G_ThumbnailOverlayItem(thumbnailOverlays);
	}
	/** @private @arg {D_PlaylistByline} x */
	D_PlaylistByline(x) {this.y("D_PlaylistByline","text",x,this.G_Text);}
	/** @private @arg {D_WatchEndpointMusicConfig} x */
	D_WatchEndpointMusicConfig(x) {
		const cf="D_WatchEndpointMusicConfig"; this.k(cf,x);
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(hasPersistentPlaylistPanel);
		this.ceq(musicVideoType,"MUSIC_VIDEO_TYPE_ATV");
	}
	/** @private @arg {D_ProductList} x */
	D_ProductList(x) {
		const cf="D_ProductList"; this.k(cf,x);
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_ProductListItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ProductListItem} x */
	D_ProductListItem(x) {
		const cf="D_ProductListItem"; this.k(cf,x);
		const {thumbnail,accessibilityTitle,title,trackingParams,price,onClickCommand,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*///#destructure
		this.D_Thumbnail(thumbnail);
		this.a_primitive_str(accessibilityTitle);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		if(!this.str_starts_with(price,"CA$")) debugger;
		if(!onClickCommand.urlEndpoint) debugger;
		this.E_Url(onClickCommand);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_ClipCreation} x */
	D_ClipCreation(x) {
		const cf="D_ClipCreation"; this.k(cf,x);
		const {trackingParams,userAvatar,titleInput,scrubber,saveButton,displayName,publicityLabel,cancelButton,adStateOverlay,externalVideoId,publicityLabelIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.D_Thumbnail(userAvatar);
		this.R_ClipCreationTextInput(titleInput);
		this.R_ClipCreationScrubber(scrubber);
		this.R_Button(saveButton);
		this.G_Text(displayName);
		switch(publicityLabel) {
			default: debugger; break;
			case "Private":
			case "Unlisted":
			case "Public":
		}
		this.R_Button(cancelButton);
		this.R_ClipAdState(adStateOverlay);
		this.videoId(externalVideoId);
		switch(publicityLabelIcon) {
			default: debugger; break;
			case "PRIVACY_PRIVATE":
			case "PRIVACY_UNLISTED":
			case "PRIVACY_PUBLIC":
		}
	}
	/** @private @arg {D_ClipCreationTextInput} x */
	D_ClipCreationTextInput(x) {
		const cf="D_ClipCreationTextInput"; this.k(cf,x);
		const {placeholderText,maxCharacterLimit,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(placeholderText);
		if(maxCharacterLimit!==140) debugger;
	}
	/** @private @arg {D_ClipAdState} x */
	D_ClipAdState(x) {
		const cf="D_ClipAdState"; this.k(cf,x);
		const {title,body,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(body);
	}
	/** @private @arg {D_ClipCreationScrubber} x */
	D_ClipCreationScrubber(x) {
		const cf="D_ClipCreationScrubber"; this.k(cf,x);
		const {lengthTemplate,maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs,startAccessibility,endAccessibility,durationAccessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(lengthTemplate!=="$clip_length seconds") debugger;
		let u=this.exact_arr(60000,5000,15000,120000);
		let t=this.exact_arr(maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs);
		if(!this.eq_keys(t,u)) debugger;
		this.z([startAccessibility,endAccessibility,durationAccessibility],this.D_Accessibility);
	}
	/** @private @arg {D_MacroMarkersList} x */
	D_MacroMarkersList(x) {
		const cf="D_MacroMarkersList"; this.k(cf,x);
		const {contents,syncButtonLabel,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_MacroMarkersListItem);
		this.G_Text(syncButtonLabel);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_EngagementPanelTitleHeader} x */
	D_EngagementPanelTitleHeader(x) {
		const cf="D_EngagementPanelTitleHeader"; this.k(cf,x);
		const {title,contextualInfo,informationButton,menu,visibilityButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.t(contextualInfo,this.G_Text);
		this.t(informationButton,this.R_Button);
		this.t(menu,this.G_EngagementPanelMenu);
		this.R_Button(visibilityButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_Hint} x */
	D_Hint(x) {
		const cf="D_Hint"; this.k(cf,x);
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.ceq(hintId,"sponsor-pre-purchase");
		this.ceq(dwellTimeMs,"60000");
		this.D_ImpressionCap(hintCap);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ImpressionCap} x */
	D_ImpressionCap(x) {
		const cf="D_ImpressionCap"; this.k(cf,x);
		if(this.w(`Other:${cf}`,"impressionCap",x)!=="1") debugger;
	}
	/** @private @arg {D_VideoViewCount} x */
	D_VideoViewCount(x) {
		const cf="D_VideoViewCount"; this.k(cf,x);
		const {viewCount,shortViewCount,extraShortViewCount,isLive,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(viewCount);
		this.t(shortViewCount,this.G_Text);
		this.t(extraShortViewCount,this.G_Text);
		this.t(isLive,this.a_primitive_bool);
	}
	/** @private @arg {D_TranscriptSearchPanel} x */
	D_TranscriptSearchPanel(x) {
		const cf="D_TranscriptSearchPanel"; this.k(cf,x);
		const {body,footer,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TranscriptSegmentList(body);
		this.R_TranscriptFooter(footer);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
	}
	/** @private @arg {D_TranscriptSegmentList} x */
	D_TranscriptSegmentList(x) {
		const cf="D_TranscriptSegmentList"; this.k(cf,x);
		const {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(initialSegments,this.R_TranscriptSegment);
		this.G_Text(noResultLabel);
		this.G_Text(retryLabel);
		this.a_primitive_bool(touchCaptionsEnabled);
	}
	static {/*remove_this_static*/this.prototype.C_RepeatChapter;}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo"; this.k(cf,x);
		const {thumbnailRenderer,title,stats,menu,navigationEndpoint,badges,description,showMoreText,...y}=this.D_Omit_ThumbnailOverlay(cf,x); this.g(y);
		this.R_PlaylistVideoThumbnail(thumbnailRenderer);
		this.G_Text(title);
		this.z(stats,this.G_Text);
		this.R_Menu(menu);
		this.E_Watch(navigationEndpoint);
		this.z(badges,this.RMD_Badge);
		this.g(description);
		this.G_Text(showMoreText);
	}
	/** @private @arg {D_PlaylistVideoThumbnail} x */
	D_PlaylistVideoThumbnail(x) {
		const cf="D_PlaylistVideoThumbnail"; this.k(cf,x);
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {CF_DC_Generic_CTP} cf @arg {P_PathRootStr} path @arg {DC_Generic_CTP} x */
	DC_Generic_CTP(cf,path,x) {
		const {continuation,clickTrackingParams,...y}=this.s("DC_Generic_CTP",x); this.g(y);
		this.params(cf,path,continuation);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {DC_SectionList_SearchFeed} x */
	DC_SectionList_SearchFeed(x) {
		const cf="DC_SectionList_SearchFeed"; this.k(cf,x);
		const {trackingParams,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		if(targetId!=="search-feed") debugger;
		this.z(contents,this.TR_SectionListItem_3_Empty);
	}
	/** @private @arg {DC_ShowReelsCommentsOverlay} x */
	DC_ShowReelsCommentsOverlay(x) {this.y("DC_ShowReelsCommentsOverlay","engagementPanel",x,this.R_EngagementPanelSectionList);}
	/** @private @arg {DC_LiveChat} x */
	DC_LiveChat(x) {
		const cf="DC_LiveChat"; this.k(cf,x);
		const {continuations,actionPanel,actions,clientMessages,emojis,header,itemList,ticker,trackingParams,participantsList,popoutMessage,viewerName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(continuations,this.G_LiveChatContinuationItem);
		this.t(actionPanel,this.R_LiveChatMessageInput);
		this.tz(actions,this.G_LiveChatContinuationActions);
		this.t(clientMessages,this.D_ClientMessages);
		this.tz(emojis,this.D_LiveChatEmoji);
		this.t(header,this.R_LiveChatHeader);
		this.t(itemList,this.R_LiveChatItemList);
		this.t(ticker,this.R_LiveChatTicker);
		this.trackingParams(cf,trackingParams);
		this.t(participantsList,this.R_LiveChatParticipantsList);
		this.t(popoutMessage,this.R_Message);
		this.t(viewerName,this.a_primitive_str);
	}
	/** @private @arg {D_LiveChatEmoji} x */
	D_LiveChatEmoji(x) {
		const cf="D_LiveChatEmoji"; this.k(cf,x);
		const {isLocked,...y}=this.D_CustomEmoji_Omit(cf,x); this.g(y);
		this.a_primitive_bool(isLocked);
	}
	/** @private @arg {D_ClientMessages} x */
	D_ClientMessages(x) {this.k("D_ClientMessages",x); this.z(Object.values(x),this.G_Text);}
	/** @private @arg {D_CommentSimplebox} x */
	D_CommentSimplebox(x) {
		const cf="D_CommentSimplebox"; this.k(cf,x);
		const {submitButton,cancelButton,aadcGuidelinesStateEntityKey,authorThumbnail,avatarSize,placeholderText,emojiPicker,trackingParams,emojiButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Button(submitButton);
		this.R_Button(cancelButton);
		this.params(cf,"aadc_guidelines_state_entity_key",aadcGuidelinesStateEntityKey);
		this.D_Thumbnail(authorThumbnail);
		if(avatarSize!=="SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT") debugger;
		this.G_Text(placeholderText);
		this.R_EmojiPicker(emojiPicker);
		this.trackingParams(cf,trackingParams);
		this.R_Button(emojiButton);
	}
	/** @protected @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>boolean} f */
	dt(x,f) {if(!x) return; let g=f.call(this,x); if(g) debugger;}
	/** @private @arg {D_SortFilterSubMenu} x */
	D_SortFilterSubMenu(x) {
		const cf="D_SortFilterSubMenu"; this.k(cf,x);
		const {subMenuItems,title,icon,accessibility,tooltip,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(subMenuItems,this.D_ActionSetPlaylistVideoOrder);
		this.t(title,this.a_primitive_str);
		this.dt(icon,x => x.iconType!=="SORT");
		this.t(accessibility,this.D_Accessibility);
		this.t(tooltip,this.a_primitive_str);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ActionSetPlaylistVideoOrder} x */
	D_ActionSetPlaylistVideoOrder(x) {
		const cf="D_ActionSetPlaylistVideoOrder"; this.k(cf,x);
		const {title,selected,continuation,serviceEndpoint,accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		this.t(continuation,this.CD_Reload);
		this.t(serviceEndpoint,this.C_Continuation);
		this.t(accessibility,this.D_Accessibility);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ToggleMenuServiceItem} x */
	D_ToggleMenuServiceItem(x) {
		const cf="D_ToggleMenuServiceItem"; this.k(cf,x);
		const {defaultText,defaultIcon,defaultServiceEndpoint,toggledText,toggledIcon,toggledServiceEndpoint,trackingParams,isToggled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(defaultText);
		if(defaultIcon.iconType!=="LIBRARY_ADD") debugger;
		this.E_Like(defaultServiceEndpoint);
		this.G_Text(toggledText);
		if(toggledIcon.iconType!=="LIBRARY_REMOVE") debugger;
		this.E_Like(toggledServiceEndpoint);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_bool(isToggled);
	}
	/** @arg {D_CustomEmoji['emojiId']} x */
	parse_emoji_id(x) {
		let eid=split_string_once(x,"/");
		this.D_ChannelId(eid[0]);
		console.log(eid[1]);
	}
	/** @arg {D_CustomEmoji['shortcuts'][number]} x */
	parse_emoji_shortcut(x) {
		let fs=split_string_once(x,":");
		let ls=split_string_once_last(fs[1],":",null);
		console.log("[emoji_shortcut_info]",ls[0]);
	}
	/** @private @template {D_CustomEmoji|D_LiveChatEmoji} T @arg {CF_D_CustomEmoji} cf @arg {T} x */
	D_CustomEmoji_Omit(cf,x) {
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,...y}=this.s(cf,x);
		this.parse_emoji_id(emojiId);
		this.z(shortcuts,this.parse_emoji_shortcut);
		this.z(searchTerms,this.a_primitive_str);
		this.D_EmojiImage(image);
		this.a_primitive_bool(isCustomEmoji);
		return y;
	}
	/** @private @arg {D_CustomEmoji} x */
	D_CustomEmoji(x) {this.g(this.D_CustomEmoji_Omit("D_CustomEmoji",x));}
	/**
	 * @private
	 * @arg {D_EmojiImage} x
	 * This might be D_Thumbnail, if the optional properties match,
	 * use that instead of repeating the code
	 * */
	D_EmojiImage(x) {
		const cf="D_EmojiImage"; this.k(cf,x);
		const {accessibility,thumbnails,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.z(thumbnails,this.D_ThumbnailItem);
	}
	/** @private @arg {D_PivotButton} x */
	D_PivotButton(x) {
		const cf="D_PivotButton"; this.k(cf,x);
		const {thumbnail,onClickCommand,trackingParams,contentDescription,soundAttributionTitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.GE_Browse(onClickCommand);
		this.trackingParams(cf,trackingParams);
		this.G_Text(contentDescription);
		this.G_Text(soundAttributionTitle);
	}
	/** @private @arg {D_PlaylistPanelVideo} x */
	D_PlaylistPanelVideo(x) {
		const cf="D_PlaylistPanelVideo"; this.k(cf,x);
		const {thumbnail,thumbnailOverlays,title,trackingParams,videoId,playlistSetVideoId,darkColorPalette,lightColorPalette,longBylineText,shortBylineText,selected,lengthText,menu,navigationEndpoint,...y}=this.s(cf,x);/*#destructure_off*/
		this.D_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.videoId(videoId);
		this.a_primitive_str(playlistSetVideoId);
		this.D_DarkColorPalette(cf,darkColorPalette);
		this.D_LightColorPalette(cf,lightColorPalette);
		this.G_Text(longBylineText);
		this.G_Text(shortBylineText);
		this.a_primitive_bool(selected);
		this.G_Text(lengthText);
		this.R_Menu(menu);
		this.E_Watch(navigationEndpoint);
		if("indexText" in y) return this.y(cf,"indexText",y,this.G_Text);
		let kl=this.get_keys_of(y).length;
		if(kl>0) {
			this.codegen_typedef_all(`${cf}:omit`,y);
		}
		this.g(y);
	}
	/** @type {{[U in string]?:number[]}} */
	lc={};
	/** @arg {string} cf1 @arg {string} cf @arg {string} k @arg {number} x */
	log_color(cf1,cf,k,x) {
		let arr=this.lc[k]??=[];
		if(!arr.includes(x)) {
			arr.push(x);
			console.log(`-- [${cf1}:${cf}:${k}] --\n\n${arr.map(x => `case 0x${x.toString(16)}:`).join(" ")}`);
		}
	};
	/** @private @arg {string} cf1 @arg {D_LightColorPalette} x */
	D_LightColorPalette(cf1,x) {
		const cf="D_LightColorPalette";
		/** @arg {string} k @arg {number} x */
		let log_color=(k,x) => this.log_color(cf1,cf,k,x);
		if("section1Color" in x) {
			const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section1Color: s1_c,section2Color: s2_c,section3Color: s3_c,section4Color: s4_c,...y}=this.s(cf,x); this.g(y);
			{const x=p_tc; switch(x) {default: log_color("l2_p_tc",x); break;}}
			{const x=s_tc; switch(x) {default: log_color("l2_s_tc",x); break;}}
			{const x=s1_c; switch(x) {default: log_color("l2_s1_c",x); break;}}
			{const x=s2_c; switch(x) {default: log_color("l2_s2_c",x); break;}}
			{const x=s3_c; switch(x) {default: log_color("l2_s3_c",x); break;}}
			{const x=s4_c; switch(x) {default: log_color("l2_s4_c",x); break;}}
			return;
		}
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section2Color: s2_c,section4Color: s4_c,...y}=this.s(cf,x); this.g(y);
		{
			const x=p_tc,cf1="l1_p_tc";
			let b=x%256;
			let g=(x>>>8)%256;
			let r=(x>>>16)%256;
			let a=(x>>>24)%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`${cf1}_r`,r); break;
				case 0x10: case 0x11: case 0x13: case 0x14: case 0x15: case 0x18: case 0x19:
			}
			switch(g) {
				default: log_color(`${cf1}_g`,g); break;
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x18: case 0x19:
			}
			switch(b) {
				default: log_color(`${cf1}_b`,b); break;
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x15: case 0x18: case 0x17: case 0x19:
			}
		}
		{
			const x=s_tc,cf1="l1_s_tc";
			let b=x%256;
			let g=(x>>>8)%256;
			let r=(x>>>16)%256;
			let a=(x>>>24)%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`${cf1}_r`,r); break;
				case 0x45:
				case 0x48:
				case 0x4c:
				case 0x52:
				case 0x56:
				case 0x59:
				case 0x5b: case 0x5c:
				case 0x60:
				case 0x62:
				case 0x65:
				case 0x6b:
				case 0x70:
				case 0x75:
				case 0x7a: case 0x7b:
				case 0x7f:
			}
			switch(g) {
				default: log_color(`${cf1}_g`,g); break;
				case 0x52:
				case 0x55: case 0x56:
				case 0x58: case 0x59: case 0x5a: case 0x5b: case 0x5c: case 0x5d: case 0x5e: case 0x5f:
				case 0x60: case 0x61: case 0x62:
				case 0x66:
				case 0x69: case 0x6a: case 0x6b:
			}
			switch(b) {
				default: log_color(`${cf1}_b`,b); break;
				case 0x48:
				case 0x4c:
				case 0x4f:
				case 0x52:
				case 0x54: case 0x55: case 0x56:
				case 0x5a: case 0x5b: case 0x5c:
				case 0x64:
				case 0x66: case 0x67:
				case 0x70:
				case 0x75:
				case 0x7a:
				case 0x7f:
				case 0x84:
				case 0x89:
			}
		}
		{
			const x=s2_c,cf1="l1_s2_c";
			let b=x%256;
			let g=(x>>>8)%256;
			let r=(x>>>16)%256;
			let a=(x>>>24)%256;
			if(a!==0xf2) debugger;
			switch(r) {
				default: log_color(`${cf1}_r`,r); break;
				case 0xf8: case 0xf1: case 0xf2: case 0xf3: case 0xf7:
			}
			switch(g) {
				default: log_color(`${cf1}_g`,g); break;
				case 0xf6: case 0xf5: case 0xf4: case 0xf7: case 0xf1: case 0xf3: case 0xf2: case 0xf8:
			}
			switch(b) {
				default: log_color(`${cf1}_b`,b); break;
				case 0xf1: case 0xf8: case 0xf2: case 0xf6: case 0xf5: case 0xf7:
			}
		}
		{
			const x=s4_c,cf1="l1_s4_c";
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xf2) debugger;
			switch(r) {
				default: log_color(`${cf1}_r`,r); break;
				case 0xdd: case 0xde: case 0xe0: case 0xe1: case 0xe2: case 0xeb: case 0xea:
			}
			switch(g) {
				default: log_color(`${cf1}_g`,g); break;
				case 0xdd: case 0xde: case 0xdf: case 0xe0: case 0xe1: case 0xe3: case 0xe4: case 0xe5: case 0xe6: case 0xe7: case 0xe9: case 0xeb:
			}
			switch(b) {
				default: log_color(`${cf1}_b`,b); break;
				case 0xdd: case 0xde: case 0xdf: case 0xe0: case 0xe6: case 0xe8: case 0xea: case 0xeb:
			}
		}
	}
	/** @private @arg {string} cf1 @arg {D_DarkColorPalette} x */
	D_DarkColorPalette(cf1,x) {
		const cf="D_DarkColorPalette";
		/** @arg {`d${1|2}_${string}`} k @arg {number} x */
		let log_color=(k,x) => this.log_color(cf1,cf,k,x);
		if("section1Color" in x) {
			const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section1Color: s1_c,section2Color: s2_c,section3Color: s3_c,section4Color: s4_c,...y}=this.s(cf,x); this.g(y);
			{const x=p_tc; switch(x) {default: log_color("d2_p_tc",x); break;}}
			{const x=s_tc; switch(x) {default: log_color("d2_s_tc",x); break;}}
			{const x=s1_c; switch(x) {default: log_color("d2_s1_c",x); break;}}
			{const x=s2_c; switch(x) {default: log_color("d2_s2_c",x); break;}}
			{const x=s3_c; switch(x) {default: log_color("d2_s3_c",x); break;}}
			{const x=s4_c; switch(x) {default: log_color("d2_s4_c",x); break;}}
			return;
		}
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section2Color: s2_c,section4Color: s4_c,...y}=this.s(cf,x); this.g(y);
		{
			const x=p_tc,cf1="d1_p_tc";
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_p_tc_r`,r); break;
				case 0xe5: case 0xe6:
				case 0xea:
				case 0xec: case 0xed:
				case 0xfc:
				case 0xff:
			}
			switch(g) {
				default: log_color(`d1_p_tc_g`,g); break;
				case 0xe5:
				case 0xe7: case 0xe8: case 0xe9: case 0xea:
				case 0xec:
				case 0xed:
				case 0xef:
				case 0xf0: case 0xf1: case 0xf2: case 0xf3:
				case 0xf5: case 0xf6:
				case 0xfa: case 0xfb:
				case 0xff:
			}
			switch(b) {
				default: log_color(`d1_p_tc_b`,b); break;
				case 0xe5:
				case 0xe7:
				case 0xea:
				case 0xf5:
				case 0xf8:
				case 0xfb:
				case 0xff:
			}
		}
		{
			const x=s_tc,cf1="d1_s_tc";
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_s_tc_r`,r); break;
				case 0xa3: case 0xa4: case 0xa5:
				case 0xab:
				case 0xaf:
				case 0xb0:
				case 0xc8:
				case 0xcc:
			}
			switch(g) {
				default: log_color(`d1_s_tc_g`,g); break;
				case 0xa3:
				case 0xa5: case 0xa6:
				case 0xa8: case 0xa9: case 0xaa: case 0xab: case 0xac: case 0xad:
				case 0xaf:
				case 0xb2:
				case 0xb4: case 0xb5:
				case 0xb7:
				case 0xb9:
				case 0xbc:
				case 0xbe:
				case 0xc5: case 0xc6: case 0xcc:
			}
			switch(b) {
				default: log_color(`d1_s_tc_b`,b); break;
				case 0xa3:
				case 0xa6:
				case 0xab: case 0xac:
				case 0xae:
				case 0xbf:
				case 0xc3: case 0xc6:
				case 0xcc:
			}
		}
		{
			const x=s2_c;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xf2) debugger;
			switch(r) {
				default: log_color(`d1_s2_c_r`,r); break;
				case 0x05: case 0x06: case 0x07:
				case 0x09:
				case 0x11: case 0x12:
				case 0x15:
				case 0x1a:
				case 0x22: case 0x23:
				case 0x28: case 0x29:
				case 0x2b:
				case 0x31:
				case 0x33:
			}
			switch(g) {
				default: log_color(`d1_s2_c_g`,g); break;
				case 0x07:
				case 0x0a: case 0x0b:
				case 0x0e:
				case 0x10: case 0x11:
				case 0x14:
				case 0x19: case 0x1a: case 0x1b: case 0x1c: case 0x1d:
				case 0x1f:
				case 0x20: case 0x21:
				case 0x23:
				case 0x25: case 0x26: case 0x27:
				case 0x29: case 0x2a: case 0x2b: case 0x2c:
			}
			switch(b) {
				default: log_color(`d1_s2_c_b`,b); break;
				case 0x07:
				case 0x0d:
				case 0x0e:
				case 0x12:
				case 0x16:
				case 0x19: case 0x1a: case 0x1b: case 0x1c:
				case 0x1f:
				case 0x23:
				case 0x26: case 0x27:
				case 0x2b:
				case 0x2f:
				case 0x30:
				case 0x33:
			}
		}
		{
			const x=s4_c,cf1="d1_s4_c";
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xf2) debugger;
			switch(r) {
				default: log_color(`${cf1}_r`,r); break;
				case 0x01: case 0x02: case 0x03: case 0x04:
				case 0x06:
				case 0x08:
				case 0x0a:
				case 0x0c: case 0x0d:
				case 0x11:
				case 0x14: case 0x15:
				case 0x18: case 0x19:
			}
			switch(g) {
				default: log_color(`${cf1}_g`,g); break;
				case 0x03:
				case 0x05:
				case 0x07: case 0x08:
				case 0x0a: case 0x0b: case 0x0c: case 0x0d: case 0x0e: case 0x0f: case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16:
			}
			switch(b) {
				default: log_color(`${cf1}_b`,b); break;
				case 0x03:
				case 0x06: case 0x07: case 0x08: case 0x09:
				case 0x0b: case 0x0c: case 0x0d: case 0x0e: case 0x0f:
				case 0x13:
				case 0x15:
				case 0x17: case 0x18: case 0x19:
			}
		}
	}
	/** @private @arg {D_C4TabbedHeader} x */
	D_C4TabbedHeader(x) {
		const cf="D_C4TabbedHeader"; this.k(cf,x);
		const {channelId,title,navigationEndpoint,avatar,banner,badges,headerLinks,subscribeButton,subscriberCountText,tvBanner,mobileBanner,trackingParams,sponsorButton,channelHandleText,videosCountText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
		this.a_primitive_str(title);
		this.GE_Browse(navigationEndpoint);
		this.D_Thumbnail(avatar);
		this.D_Thumbnail(banner);
		this.tz(badges,this.RMD_Badge);
		this.R_ChannelHeaderLinks(headerLinks);
		this.R_SubscribeButton(subscribeButton);
		this.G_Text(subscriberCountText);
		this.D_Thumbnail(tvBanner);
		this.D_Thumbnail(mobileBanner);
		this.trackingParams(cf,trackingParams);
		this.t(sponsorButton,this.R_Button);
		this.G_Text(channelHandleText);
		this.G_Text(videosCountText);
	}
	/** @private @arg {D_ChannelHeaderLinks} x */
	D_ChannelHeaderLinks(x) {
		const cf="D_ChannelHeaderLinks"; this.k(cf,x);
		this.zy(cf,"primaryLinks",x,this.D_PrimaryLinkItem);
	}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD"; this.k(cf,x);
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_str(description);
		this.a_primitive_str(androidDeepLink);
		this.a_primitive_str(iosAppindexingLink);
		this.ceq(isFamilySafe,true);
		this.a_primitive_str(externalId);
		this.a_primitive_str(androidAppindexingLink);
		this.z(availableCountryCodes,this.a_primitive_str);
		this.D_Thumbnail(avatar);
		this.a_primitive_str(rssUrl);
		this.a_primitive_str(keywords);
		if(ownerUrls.length!==1) debugger;
		let ur=this.parse_with_url_parse(ownerUrls[0]);
		this.ceq(this.str_starts_with_rx("/@",ur.pathname),true);
		this.a_primitive_str(channelUrl);
		this.a_primitive_str(vanityChannelUrl);
	}
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD"; this.k(cf,x);
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_str(iosAppindexingLink);
		this.a_primitive_str(androidAppindexingLink);
	}
	/** @private @arg {D_AlertWithButton} x */
	D_AlertWithButton(x) {
		const cf="D_AlertWithButton"; this.k(cf,x);
		const {type,text,dismissButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(type!=="INFO") debugger;
		this.G_Text(text);
		this.R_Button(dismissButton);
	}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage"; this.k(cf,x);
		const {header,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ChannelSwitcherHeader(header);
		this.ceq(targetId,"ceq");
		this.z(contents,this.G_ChannelSwitcherContent);
	}
	/** @private @arg {D_ChannelSwitcherHeader} x */
	D_ChannelSwitcherHeader(x) {
		const cf="D_ChannelSwitcherHeader"; this.k(cf,x);
		const {title,button,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.R_Button(button);
	}
	/** @private @arg {D_MerchandiseShelf} x */
	D_MerchandiseShelf(x) {
		const cf="D_MerchandiseShelf"; this.k(cf,x);
		const {title,items,trackingParams,showText,hideText,actionButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.z(items,this.R_MerchandiseItem);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_str(showText);
		this.a_primitive_str(hideText);
		this.R_Menu(actionButton);
	}
	/** @private @arg {D_MerchandiseItem} x */
	D_MerchandiseItem(x) {
		const cf="D_MerchandiseItem"; this.k(cf,x);
		const {thumbnail,description,title,price,vendorName,trackingParams,buttonText,buttonCommand,accessibilityTitle,buttonAccessibilityText,fromVendorText,additionalFeesText,regionFormat,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.a_primitive_str(description);
		this.a_primitive_str(title);
		if(!this.str_starts_with(price,"CA$")) debugger;
		this.a_primitive_str(vendorName);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_str(buttonText);
		this.E_Url(buttonCommand);
		this.a_primitive_str(accessibilityTitle);
		this.a_primitive_str(buttonAccessibilityText);
		this.a_primitive_str(fromVendorText);
		this.a_primitive_str(additionalFeesText);
		if(regionFormat!=="REGIONAL_FORMAT_EU") debugger;
	}
	/** @private @arg {D_VideoPrimaryInfo} x */
	D_VideoPrimaryInfo(x) {
		const cf="D_VideoPrimaryInfo"; this.k(cf,x);
		const {title,trackingParams,viewCount,videoActions,superTitleLink,badges,dateText,relativeDateText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.R_VideoViewCount(viewCount);
		this.R_Menu(videoActions);
		this.t(superTitleLink,this.G_Text);
		this.tz(badges,this.RMD_Badge);
		this.G_Text(dateText);
		this.G_Text(relativeDateText);
	}
	/** @private @arg {D_VideoSecondaryInfo} x */
	D_VideoSecondaryInfo(x) {
		const cf="D_VideoSecondaryInfo"; this.k(cf,x);
		const {owner,description,subscribeButton,metadataRowContainer,showMoreText,showLessText,trackingParams,defaultExpanded,descriptionCollapsedLines,showMoreCommand,showLessCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.t(description,this.G_Text);
		this.R_SubscribeButton(subscribeButton);
		this.RMD_RowContainer(metadataRowContainer);
		this.G_Text(showMoreText);
		this.G_Text(showLessText);
		this.R_VideoOwner(owner);
		this.ceq(defaultExpanded,false);
		this.a_primitive_num(descriptionCollapsedLines);
		this.t(showMoreCommand,this.C_Executor);
		this.t(showLessCommand,this.A_ChangeEngagementPanelVisibility);
	}
	/** @private @arg {D_RichMetadata} x */
	D_RichMetadata(x) {
		const cf="D_RichMetadata"; this.k(cf,x);
		switch(x.style) {
			default: this.codegen_case_key(cf,x,"style","break"); break;
			case "RICH_METADATA_RENDERER_STYLE_BOX_ART": {
				const cf="D_RichMetadata_BoxArt";
				const {style: {},thumbnail,title,subtitle,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.D_Thumbnail(thumbnail);
				this.G_Text(title);
				this.G_Text(subtitle);
				this.G_Text(callToAction);
				this.T_Icon(cf,callToActionIcon);
				if(!endpoint.browseEndpoint) debugger;
				this.GE_Browse(endpoint);
				this.trackingParams(cf,trackingParams);
			} break;
			case "RICH_METADATA_RENDERER_STYLE_TOPIC": {
				const cf="D_RichMetadata_Topic";
				const {style: {},thumbnail,title,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.D_Thumbnail(thumbnail);
				this.G_Text(title);
				this.G_Text(callToAction);
				this.T_Icon(cf,callToActionIcon);
				if(!endpoint.browseEndpoint) debugger;
				this.GE_Browse(endpoint);
				this.trackingParams(cf,trackingParams);
			} break;
		}
	}
	/** @private @arg {D_RichMetadataRow} x */
	D_RichMetadataRow(x) {
		const cf="D_RichMetadataRow"; this.k(cf,x);
		if(!x.contents) debugger;
		if(!x.trackingParams) debugger;
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_RichMetadata);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {DMD_RowContainer} x */
	DMD_RowContainer(x) {
		const cf="DMD_RowContainer"; this.k(cf,x);
		const {rows,collapsedItemCount,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(rows,this.R_RichMetadataRow);
		this.save_number(`[${cf}.coll_item_count]`,collapsedItemCount);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {"D_VideoOwner"} cf @arg {D_VideoOwner} x */
	D_VideoOwner_Omit(cf,x) {
		const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,navigationEndpoint,...y}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.G_Text(subscriberCountText);
		this.D_SubscriptionButton(subscriptionButton);
		this.t(membershipButton,this.R_Button);
		this.GE_Browse(navigationEndpoint);
		return y;
	}
	/** @private @arg {D_SubscriptionButton} x */
	D_SubscriptionButton(x) {
		const cf="D_SubscriptionButton"; this.k(cf,x);
		const {type,subscribed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_string("button.type",type);
		this.t(subscribed,this.a_primitive_bool);
	}
	/** @private @arg {D_VideoOwner} x */
	D_VideoOwner(x) {
		const cf="D_VideoOwner"; this.k(cf,x);
		let u=this.D_VideoOwner_Omit(cf,x); const {badges,...y}=this.s(`${cf}:1`,u); this.g(y);/*#destructure_done*/
		this.tz(badges,this.RMD_Badge);
	}
	/** @private @arg {D_MusicCarouselShelf} x */
	D_MusicCarouselShelf(x) {
		const cf="D_MusicCarouselShelf"; this.k(cf,x);
		const {contents,header,trackingParams,itemSize,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.ceq);
		this.g(header);
		this.trackingParams(cf,trackingParams);
		this.ceq(itemSize,"COLLECTION_STYLE_ITEM_SIZE_MEDIUM");
	}
	/** @private @arg {D_MusicShelf} x */
	D_MusicShelf(x) {
		const cf="D_MusicShelf"; this.k(cf,x);
		const {contents,title,trackingParams,continuations,shelfDivider,autoReloadWhenEmpty,bottomButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_MusicResponsiveListItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.z(continuations,this.CD_Reload);
		this.R_MusicShelfDivider(shelfDivider);
		this.ceq(autoReloadWhenEmpty,true);
		this.R_Button(bottomButton);
	}
	/** @private @arg {D_EndScreenVideo} x */
	D_EndScreenVideo(x) {
		const cf="D_EndScreenVideo"; this.k(cf,x);
		const {videoId,shortViewCountText,shortBylineText,thumbnail,thumbnailOverlays,title,trackingParams,lengthInSeconds,lengthText,publishedTimeText,navigationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(videoId);
		this.G_Text(shortViewCountText);
		this.G_Text(shortBylineText);
		this.D_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.t(lengthInSeconds,this.a_primitive_num);
		this.t(lengthText,this.G_Text);
		this.G_Text(publishedTimeText);
		x: {
			let x=navigationEndpoint;
			if("watchEndpoint" in x) {this.E_Watch(x); break x;}
			if(!x.reelWatchEndpoint) debugger;
		}
	}
	/** @private @arg {D_ThumbnailOverlayEndorsement} x */
	D_ThumbnailOverlayEndorsement(x) {
		const cf="D_ThumbnailOverlayEndorsement"; this.k(cf,x);
		const {text,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ThumbnailOverlayHoverText} x */
	D_ThumbnailOverlayHoverText(x) {
		const cf="D_ThumbnailOverlayHoverText"; this.k(cf,x);
		const {text,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		if(icon.iconType!=="PLAY_ALL") debugger;
	}
	make_icon_types_map=() => {
		/** @type {D_ThumbnailOverlaySidePanel_iconTypes} */
		let r=[
			"PLAY_ALL","PLAYLISTS",
		];
		const mi={
			known: r,
			/** @type {string[]} */
			unknown: []
		};
		const k="D_ThumbnailOverlaySidePanel";
		/** @type {Map<typeof k,typeof mi>} */
		let mp=new Map([
			[k,mi]
		]);
		return mp;
	};
	icon_types_map=this.make_icon_types_map();
	/** @private @arg {D_ThumbnailOverlaySidePanel} x */
	D_ThumbnailOverlaySidePanel(x) {
		const cf="D_ThumbnailOverlaySidePanel"; this.k(cf,x);
		const {text,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		let store=this.icon_types_map.get(cf);
		if(!store) return;
		const {known,unknown}=store;
		let missing=this.T_Icon_AnyOf("D_Icon_ThumbnailOverlaySidePanel",icon,known);
		if(missing) this.onMissingIcon(cf,icon,x,known,unknown);
	}
	/** @private @arg {D_ThumbnailOverlayBottomPanel} x */
	D_ThumbnailOverlayBottomPanel(x) {this.y("D_ThumbnailOverlayBottomPanel","icon",x,x => this.T_Icon("D_Icon_Mix",x));}
	/** @private @arg {D_ThumbnailOverlayNowPlaying} x */
	D_ThumbnailOverlayNowPlaying(x) {const cf="D_ThumbnailOverlayNowPlaying"; this.y(cf,"text",x,this.G_Text);}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon_Check",icon);
		if(tooltip!=="Added") debugger;
		this.E_PlaylistEdit(serviceEndpoint);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_1"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon_WatchLater",icon);
		if(tooltip!=="Watch Later") debugger;
		this.E_PlaylistEdit(serviceEndpoint);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix"; this.k(cf,x);
		const {accessibility,icon,tooltip,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(cf,icon);
		if(tooltip!=="Added") debugger;
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_2"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(cf,icon);
		if(tooltip!=="Add to queue") debugger;
		let [wc,s]=this.T_SE_Signal(cf,serviceEndpoint);
		const cf1="D_ToggleButton_ServiceEP.data";
		this.M_SendPost(wc);
		this.G_ClientSignal(cf1,s);
	}
	/**
	 * @private @template {D_ThumbnailOverlayToggleButton} T @arg {"D_ThumbnailOverlayToggleButton"} cf @arg {T} x
	 * @returns {[p1,p2,o2]}
	 * */
	D_ThumbnailOverlayToggleButton_Omit(cf,x) {
		this.k(cf,x);
		let [p1,{...o1}]=this.unwrap_prefix(x,"toggled");
		let [p2,{trackingParams,...o2}]=this.unwrap_prefix(o1,"untoggled");
		this.trackingParams(cf,trackingParams);
		return [p1,p2,o2];
	}
	/** @returns {false} */
	false_() {return false;}
	/** @private @arg {D_ThumbnailOverlayToggleButton} x */
	D_ThumbnailOverlayToggleButton(x) {
		const cf="D_ThumbnailOverlayToggleButton"; this.k(cf,x);
		if("toggledServiceEndpoint" in x) {
			const [o1,o2,{isToggled,...y}]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);
			this.ceq(isToggled,this.false_());
			this.D_ThumbnailOverlayToggleButton_ToggledPrefix_1(o1);
			this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(o2);
			return;
		}
		const [o1,o2,y]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);
		this.D_ThumbnailOverlayToggleButton_ToggledPrefix_2(o1);
		this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(o2);
	}
	/** @private @arg {D_ThumbnailOverlayResumePlayback} x */
	D_ThumbnailOverlayResumePlayback(x) {this.y("D_ThumbnailOverlayResumePlayback","percentDurationWatched",x,x => this.save_number("resume_playback.percentDurationWatched",x));}
	/** @private @arg {D_ThumbnailOverlayTimeStatus} x */
	D_ThumbnailOverlayTimeStatus(x) {
		const cf="D_ThumbnailOverlayTimeStatus"; this.k(cf,x);
		const {style,text,...y}=this.s(cf,x);
		switch(style) {
			default: debugger; break;
			case "DEFAULT":
			case "LIVE":
			case "SHORTS":
		}
		if("icon" in y) {
			const {icon,...u}=this.s(cf,y); this.g(u);/*#destructure_done*/
			switch(icon.iconType) {
				default: debugger; break;
				case "LIVE":
				case "YOUTUBE_SHORTS_FILL_NO_TRIANGLE_RED_16":
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_AddToPlaylistCreate} x */
	D_AddToPlaylistCreate(x) {
		const cf="D_AddToPlaylistCreate"; this.k(cf,x);
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_CompactLink(openCreateLink);
		this.R_TextInputFormField(nameInput);
		this.R_Dropdown(privacyInput);
		this.R_Button(createAction);
		this.E_CreatePlaylistService(serviceEndpoint);
	}
	/** @private @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField"; this.k(cf,x);
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(label);
		if(maxCharacterLimit!==150) debugger;
		this.a_primitive_str(placeholderText);
		if(validValueRegexp!=="[^<>]*") debugger;
		this.G_Text(invalidValueErrorMessage);
		this.ceq(required,true);
	}
	/** @private @arg {D_Dropdown_Privacy} x */
	D_Dropdown(x) {
		const cf="D_Dropdown"; this.k(cf,x);
		const {entries,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,this.R_PrivacyDropdownItem);
		if(label!=="Privacy") debugger;
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption"; this.k(cf,x);
		const {playlistId,title,privacy,containsSelectedVideos,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.playlistId(playlistId);
		this.G_Text(title);
		switch(privacy) {
			default: debugger; break;
			case "PRIVATE":
			case "UNLISTED":
			case "PUBLIC":
		}
		this.ceq(containsSelectedVideos,"NONE");
		this.ceq(privacyIcon.iconType,"PRIVACY_PRIVATE");
		this.E_PlaylistEdit(addToPlaylistServiceEndpoint);
		this.E_PlaylistEdit(removeFromPlaylistServiceEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_RunAttestation} x */
	D_RunAttestation(x) {
		const cf="D_RunAttestation"; this.k(cf,x);
		const {ids,engagementType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ids,this.D_ExternalChannelId);
		if(engagementType!=="ENGAGEMENT_TYPE_SUBSCRIBE") debugger;
	}
	/** @private @arg {D_ExternalChannelId} x */
	D_ExternalChannelId(x) {
		const cf="D_ExternalChannelId"; this.k(cf,x);
		const {externalChannelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(externalChannelId);
	}
	/** @private @arg {D_VideoDescriptionMusicSection} x */
	D_VideoDescriptionMusicSection(x) {
		const cf="D_VideoDescriptionMusicSection"; this.k(cf,x);
		const {sectionTitle,carouselLockups,topicLink,premiumUpsellLink,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(sectionTitle);
		this.z(carouselLockups,this.R_CarouselLockup);
		this.R_TopicLink(topicLink);
		this.G_Text(premiumUpsellLink);
	}
	/** @private @arg {D_TopicLink} x */
	D_TopicLink(x) {
		const cf="D_TopicLink"; this.k(cf,x);
		const {thumbnailDetails,title,trackingParams,endpoint,callToActionIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnailDetails);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.GE_Browse(endpoint);
		if(callToActionIcon.iconType!=="CHEVRON_RIGHT") debugger;
	}
	/** @private @arg {D_CarouselLockup} x */
	D_CarouselLockup(x) {
		const cf="D_CarouselLockup"; this.k(cf,x);
		const {infoRows,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(infoRows,this.R_InfoRow);
	}
	/** @private @arg {D_VideoDescriptionHeader} x */
	D_VideoDescriptionHeader(x) {
		const cf="D_VideoDescriptionHeader"; this.k(cf,x);
		const {title,channel,views,publishDate,factoid,channelNavigationEndpoint,channelThumbnail,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(channel);
		this.G_Text(views);
		this.G_Text(publishDate);
		this.z(factoid,this.R_Factoid);
		this.GE_Browse(channelNavigationEndpoint);
		this.D_Thumbnail(channelThumbnail);
	}
	/** @private @arg {D_Factoid} x */
	D_Factoid(x) {
		const cf="D_Factoid"; this.k(cf,x);
		const {value,label,accessibilityText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(value);
		this.G_Text(label);
		this.a_primitive_str(accessibilityText);
	}
	/** @private @arg {D_HorizontalCardList} x */
	D_HorizontalCardList(x) {
		const cf="D_HorizontalCardList"; this.k(cf,x);
		const {cards,trackingParams,header,style,centerItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(cards,this.R_MacroMarkersListItem);
		this.trackingParams(cf,trackingParams);
		this.R_RichListHeader(header);
		x: {
			let x1=style;
			if("styleType" in x1) {this.ceq(x1.styleType,"HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION"); break x;}
			if("type" in x1) {this.ceq(x1.type,"HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION"); break x;}
			this.ceq(x1+"1",x1+"");
		}
		this.ceq(centerItems,false);
	}
	/** @private @arg {D_RichListHeader} x */
	D_RichListHeader(x) {
		const cf="D_RichListHeader"; this.k(cf,x);
		const {title,trackingParams,navigationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.G_Text(title);
		this.R_Button(navigationButton);
	}
	/** @private @arg {D_MacroMarkersListItem} x */
	D_MacroMarkersListItem(x) {
		const cf="D_MacroMarkersListItem"; this.k(cf,x);
		if("lightColorPalette" in x) {
			const {title,timeDescription,thumbnail,onTap,trackingParams,shareButton,repeatButton,macroMarkerRepeatStateEntityKey,endRepeatCommand,playerStateEntityKey,carouselType,lightColorPalette,darkColorPalette,timeDescriptionA11yLabel,...y}=this.s(cf,x); this.g(y);
			this.G_Text(title);
			this.G_Text(timeDescription);
			this.D_Thumbnail(thumbnail);
			this.E_Watch(onTap);
			this.trackingParams(cf,trackingParams);
			this.R_Button(shareButton);
			this.R_ToggleButton(repeatButton);
			console.log(`${cf}:macroMarkerRepeatStateEntityKey`,macroMarkerRepeatStateEntityKey);
			this.C_Executor(endRepeatCommand);
			console.log(`${cf}:playerStateEntityKey`,playerStateEntityKey);
			if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
			this.D_LightColorPalette(cf,lightColorPalette);
			this.D_DarkColorPalette(cf,darkColorPalette);
			this.a_primitive_str(timeDescriptionA11yLabel);
			return;
		}
		if("playerStateEntityKey" in x) {
			const {title,timeDescription,thumbnail,onTap,trackingParams,shareButton,repeatButton,macroMarkerRepeatStateEntityKey,endRepeatCommand,playerStateEntityKey,carouselType,timeDescriptionA11yLabel,...y}=this.s(cf,x); this.g(y);
			this.G_Text(title);
			this.G_Text(timeDescription);
			this.D_Thumbnail(thumbnail);
			this.E_Watch(onTap);
			this.trackingParams(cf,trackingParams);
			this.R_Button(shareButton);
			this.R_ToggleButton(repeatButton);
			console.log(`${cf}:macroMarkerRepeatStateEntityKey`,macroMarkerRepeatStateEntityKey);
			this.C_CommandExecutor(endRepeatCommand);
			console.log(`${cf}:playerStateEntityKey`,playerStateEntityKey);
			if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
			this.a_primitive_str(timeDescriptionA11yLabel);
			return;
		}
		const {title,timeDescription,thumbnail,onTap,trackingParams,carouselType,layout,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.G_Text(timeDescription);
		this.D_Thumbnail(thumbnail);
		this.E_Watch(onTap);
		this.trackingParams(cf,trackingParams);
		if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
		if(layout!=="MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL") debugger;
	}
	/** @private @arg {D_ExpandableVideoDescriptionBody} x */
	D_ExpandableVideoDescriptionBody(x) {
		const cf="D_ExpandableVideoDescriptionBody"; this.k(cf,x);
		const {descriptionBodyText,showMoreText,showLessText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(descriptionBodyText,this.G_Text);
		this.t(showMoreText,this.G_Text);
		this.t(showLessText,this.G_Text);
	}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview"; this.k(cf,x);
		const {title,authorThumbnail,authorText,commentOptionRenderers,defaultCommentText,editButton,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.D_Thumbnail(authorThumbnail);
		this.G_Text(authorText);
		this.z(commentOptionRenderers,this.R_PdgCommentOption);
		this.G_Text(defaultCommentText);
		this.R_Button(editButton);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {D_PdgCommentOption} x */
	D_PdgCommentOption(x) {
		const cf="D_PdgCommentOption"; this.k(cf,x);
		const {commentText,chipRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(commentText);
		this.R_PdgCommentChip(chipRenderer);
	}
	/** @private @arg {D_HideEnclosingContainer} x */
	D_HideEnclosingContainer(x) {if(!this.eq_keys(this.get_keys_of(x),["hideEnclosingContainer"])) debugger; let q=Object.values(x); if(q.length!==1) debugger; if(q[0]!==true) debugger;}
	/** @private @arg {TR_SectionListItem_3_Empty} x */
	TR_SectionListItem_3_Empty(x) {
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
		if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		if("itemSectionRenderer" in x) {
			return;
		}
		x;
	}
	/** @private @arg {D_PrimaryLinkItem} x */
	D_PrimaryLinkItem(x) {
		const cf="D_PrimaryLinkItem"; this.k(cf,x);
		const {navigationEndpoint,icon,title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Url(navigationEndpoint);
		this.D_Thumbnail(icon);
		this.G_Text(title);
	}
	/** @private @arg {AD_AccountItem} x */
	AD_AccountItem(x) {
		const cf="AD_AccountItem"; this.k(cf,x);
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
	/** @arg {D_InlineSurvey} x */
	D_InlineSurvey(x) {
		const cf="D_InlineSurvey"; this.k(cf,x);
		const {dismissalEndpoint,title,subtitle,inlineContent,response,trackingParams,dismissalText,impressionEndpoints,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.codegen_typedef_all(`${cf}.dismissalEndpoint`,dismissalEndpoint);
		this.G_Text(title);
		this.G_Text(subtitle);
		this.R_CompactVideo(inlineContent);
		this.R_ExpandableSurveyResponse(response);
		this.trackingParams(cf,trackingParams);
		this.G_Text(dismissalText);
		this.z(impressionEndpoints,this.g);
	}
	/** @arg {D_RichShelf} x */
	D_RichShelf(x) {
		const cf="D_RichShelf"; this.k(cf,x);
		/** @type {T_UnionToPartial<D_RichShelf>} */
		let pt=x;
		const {icon,title,contents,trackingParams,menu,showMoreButton,rowIndex,...y}=this.s(cf,pt); this.g(y);
		if(icon) {
			switch(icon.iconType) {
				default: this.codegen_case(`${cf}.icon`,icon.iconType); break;
				case "YOUTUBE_SHORTS_BRAND_24": break;
			}

		}
		this.G_Text(title);
		this.z(contents,this.R_RichItem);
		this.trackingParams(cf,trackingParams);
		this.R_Menu(menu);
		this.R_Button(showMoreButton);
		switch(rowIndex) {
			default: this.codegen_case(`${cf}.rowIndex`,rowIndex); break;
			case 2: case 4: break;
		}
	}
	/** @arg {D_ProfilePageHeaderTitle_Content} x */
	D_ProfilePageHeaderTitle_Content(x) {this.y("D_ProfilePageHeaderTitle_Content","content",x,this.a_primitive_str);}
	/** @arg {D_ProfilePageHeaderTitle} x */
	D_ProfilePageHeaderTitle(x) {this.y("D_ProfilePageHeaderTitle","title",x,this.D_ProfilePageHeaderTitle_Content);}
	/** @arg {D_SourcePivotHeader} x */
	D_SourcePivotHeader(x) {
		const cf="D_SourcePivotHeader"; this.k(cf,x);
		const {headerInformation,buttonRow,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ProfilePageHeaderInformationViewModel(headerInformation);
		this.R_ProfilePageHeaderButtonRowViewModel(buttonRow);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {D_ProfilePageHeaderInformation} x */
	D_ProfilePageHeaderInformation(x) {
		const cf="D_ProfilePageHeaderInformation"; this.k(cf,x);
		const {title,metadata,thumbnail,alignment,onTap,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ProfilePageHeaderTitleViewModel(title);
		this.R_ProfilePageHeaderMetadataViewModel(metadata);
		this.R_ProfilePageHeaderThumbnailViewModel(thumbnail);
		if(alignment!=="a") debugger;
		this.C_Innertube(onTap);
	}
	/** @arg {D_ExpandableSurveyResponse} x */
	D_ExpandableSurveyResponse(x) {
		const cf="D_ExpandableSurveyResponse"; this.k(cf,x);
		const {options,submitButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_RatingSurvey(options);
		this.R_Button(submitButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @arg {D_RatingSurvey} x */
	D_RatingSurvey(x) {
		const cf="D_ExpandableSurveyResponse"; this.k(cf,x);
		const {ratings,trackingParams,notSureButton,undoButton,notSureEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ratings,this.R_RatingSurveyOption);
		this.trackingParams(cf,trackingParams);
		this.R_Button(notSureButton);
		this.R_Button(undoButton);
		this.g(notSureEndpoint);
	}
	/** @arg {D_RatingSurveyOption} x */
	D_RatingSurveyOption(x) {
		const cf="D_ExpandableSurveyResponse"; this.k(cf,x);
		const {responseText,defaultStateIcon,onStateIcon,followUpCommand,responseEndpoint,trackingParams,checked,selected,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(responseText);
		if(defaultStateIcon.iconType!=="STAR_BORDER") debugger;
		if(onStateIcon.iconType!=="STAR") debugger;
		this.C_FollowUp(followUpCommand);
		this.g(responseEndpoint);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_bool(checked);
		this.a_primitive_bool(selected);
	}
	/** @arg {D_PageTopAdLayout} x */
	D_PageTopAdLayout(x) {
		const cf="D_PageTopAdLayout"; this.k(cf,x);
		const {adLayoutMetadata,renderingContent,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_AdLayoutMetadata(adLayoutMetadata);
		this.R_VideoMastheadAdV3(renderingContent);
	}
	/** @arg {D_PlaylistPanel} x */
	D_PlaylistPanel(x) {
		const cf="D_PlaylistPanel"; this.k(cf,x);
		const {title,contents,currentIndex,playlistId,ownerName,isInfinite,continuations,shortBylineText,longBylineText,trackingParams,titleText,isEditable,previewDescription,numItemsToShow,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(title!=="YouTube Mix") debugger;
		this.z(contents,this.G_PlaylistPanel_Item);
		this.t(currentIndex,this.a_primitive_num);
		this.playlistId(playlistId);
		this.t(ownerName,this.G_Text);
		if(isInfinite!==true) debugger;
		this.tz(continuations,this.CD_NextRadio);
		this.G_Text(shortBylineText);
		this.t(longBylineText,this.G_Text);
		this.trackingParams(cf,trackingParams);
		this.G_Text(titleText);
		if(isEditable!==true) debugger;
		this.t(previewDescription,this.g);
		this.t(numItemsToShow,x => {if(x!==25) debugger;});
	}
	/** @arg {D_AdLayoutMetadata} x */
	D_AdLayoutMetadata(x) {
		const cf="D_AdLayoutMetadata";
		const {layoutId,layoutType,adLayoutLoggingData,...y}=this.s(cf,x); this.g(y);
		layoutId;
		if(layoutType!=="LAYOUT_TYPE_VIDEO_DISPLAY_BILLBOARD_IMAGE_BUTTONED") debugger;
		this.D_AdLayoutLoggingData(adLayoutLoggingData);
	}
	/** @private @arg {D_YoutubeUrl} x */
	D_YoutubeUrl(x) {
		const cf="D_YoutubeUrl";
		let [p1,s1]=split_string_once(x,"//"); if(p1!=="https:") debugger;
		let [h,sp]=split_string_once(s1,"/");
		if(h!=="www.youtube.com") debugger;
		if(this.str_is_search(sp)) {
			let [pp,qs]=split_string_once(sp,"?");
			pp; qs;
		} else {
			let pp=sp;
			let p_arr=this.split_str(pp,"/");
			switch(p_arr.length) {
				default: this.codegen_str(cf,x); return;
				case 3: break;
			}
			let [p_0,p_1,...arr_2]=p_arr;
			switch(p_0) {
				default: this.codegen_str(cf,x); return;
				case "channel": break;
			}
			if(!this.str_starts_with(p_1,"UC")) {this.codegen_str(cf,x); return;}
			switch(arr_2[0]) {
				default: this.codegen_str(cf,x); return;
				case "join": break;
			}
			return;
		}
		this.codegen_str(cf,x);
	}
	/** @private @arg {D_InfoRow} x */
	D_InfoRow(x) {
		const cf="D_InfoRow";
		const {title,defaultMetadata,expandedMetadata,expandIcon,trackingParams,infoRowExpandStatusKey,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.t(defaultMetadata,this.G_Text);
		this.t(expandedMetadata,this.G_Text);
		this.t(expandIcon,x => {if(x.iconType!=="EXPAND") debugger;});
		this.trackingParams(cf,trackingParams);
		this.t(infoRowExpandStatusKey,x => {
			switch(x) {
				default: debugger; break;
				case "structured-description-music-section-artists-row-state-id":
				case "structured-description-music-section-licenses-row-state-id":
			}
		});
	}
	/** @arg {VideoGoodPutShape} x */
	VideoGoodPutShape(x) {
		const cf="VideoGoodPutShape";
		const {id,source,range,expire,ip,ms,mm,pl,nh,sparams,signature,key,...y}=this.s(cf,x); this.g(y);
		this.params(cf,"videogoodput.sparams",sparams);
		console.log("[VideoGoodPutShape]",id,source,range,expire,ip,ms,mm,pl,nh,sparams,signature,key);
	}
	/** @type {(["D_VideoPlaybackShape","expire",number])[]} */
	log_buffer=[];
	is_moment_js_loaded=false;
	is_moment_js_loading=false;
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
		for(let log of this.log_buffer) {
			let [cf,name,expiry_date]=log;
			if(cf!=="D_VideoPlaybackShape") {debugger; return;}
			if(name!=="expire") {debugger; return;}
			let lp=this.load_moment_js_if_not_loaded();
			if(lp!==null) {
				await lp;
			}
			let exp_m_from_now=moment(expiry_date*1000).fromNow();
			if(exp_m_from_now==="in 6 hours") continue;
			console.log(`[${cf}.${name}] [${exp_m_from_now}]`);
		}
		this.log_buffer.length=0;
	}
	/** @private @arg {D_VideoPlaybackShape} x */
	D_VideoPlaybackShape(x) {
		const cf="D_VideoPlaybackShape";
		// cspell: ignore aitags requiressl initcwndbps vprv clen fvip lsparams lsig
		const {expire,ei,ip,id,itag,aitags,source,requiressl,mh,mm,mn,ms,mv,mvi,pl,initcwndbps,vprv,mime,ns,gir,clen,dur,lmt,mt,fvip,keepalive,fexp,c,txp,n,sparams,lsparams,lsig,spc,sig,cnr,ratebypass,...y}=this.s(cf,x);
		let expiry_date=this.parse_number_template(expire);
		this.log_buffer.push([cf,"expire",expiry_date]);
		Promise.resolve().then(() => this.run_logger());
		let ei_bin=base64_url_dec.decodeByteArray(ei);
		this.t(ei_bin,x => this.save_next_byte(`${cf}.ei`,x));
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.lsparams`,lsparams);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log("[D_VideoPlaybackShape.next_key] [%s]",ka.shift());
		}
	}
	/** @private @arg {D_PlayabilityStatus} x */
	D_PlayabilityStatus(x) {
		const cf="D_PlayabilityStatus";
		const {status,playableInEmbed,offlineability,miniplayer,contextParams,...y}=this.s(cf,x); this.g(y);
		if(status!=="OK") debugger;
		if(playableInEmbed!==true) debugger;
		this.t(offlineability,this.R_Button);
		this.t(miniplayer,this.R_Miniplayer);
		let ctx=atob(contextParams);
		this.params(cf,"playability_status.context_params",ctx);
	}
	/** @private @arg {D_Miniplayer} x */
	D_Miniplayer(x) {
		const cf="D_Miniplayer";
		const {playbackMode,...y}=this.s(cf,x); this.g(y);
		if(playbackMode!=="PLAYBACK_MODE_ALLOW") debugger;
	}
	/** @private @arg {DD_Streaming} x */
	DD_Streaming(x) {
		const cf="DD_Streaming";
		const {expiresInSeconds,adaptiveFormats,formats,probeUrl,...y}=this.s(cf,x); this.g(y);
		this.parse_number_template(expiresInSeconds);
		this.z(adaptiveFormats,this.D_AdaptiveFormatItem);
		this.z(formats,this.D_FormatItem);
		this.t(probeUrl,x => this.parser.parse_url(cf,x));
	}
	/** @arg {UrlParse<Extract<D_UrlFormat,`https://${string}.googlevideo.com/${string}`>>} x */
	on_google_video_url(x) {
		// cSpell:ignoreRegExp /r\d---sn-.+?"/
		let s_host=split_string_once(x.host,".");
		switch(s_host[1]) {
			case "googlevideo.com": {
				this.save_string("google_video_host",s_host[0]);
				switch(x.pathname) {
					case "/videoplayback": {
						let vp_search=x.search;
						let {...pp}=this.parse_url_search_params(vp_search);
						this.D_VideoPlaybackShape(pp);
					} break;
					case "/initplayback": {
						debugger;
					} break;
					case "/videogoodput": {
						let pp=this.parse_url_search_params(x.search);
						this.VideoGoodPutShape(pp);
					} break;
				}
			} return;
			default:
		}
		/** @private @type {D_UrlFormat|D_ExternalUrlFormat} */
		console.log("[parse_url_external_1]",x);
		{debugger;}
	}
	/** @private @arg {AD_ReplayChatItem} x */
	AD_ReplayChatItem(x) {
		const cf="AD_ReplayChatItem";
		const {actions,videoOffsetTimeMsec,...y}=this.s(cf,x); this.g(y);
		this.z(actions,this.A_AddChatItem);
		this.a_primitive_str(videoOffsetTimeMsec);
	}
	/** @private @arg {AD_AddChatItem} x */
	AD_AddChatItem(x) {
		const cf="AD_AddChatItem";
		const {item,clientId,...y}=this.s(cf,x); this.g(y);
		this.G_ChatItem(item);
		this.t(clientId,x => console.log(`${cf}.clientId`,x));
	}
	/** @private @arg {D_TranscriptSegment} x */
	D_TranscriptSegment(x) {
		const cf="D_TranscriptSegment";
		const {startMs,endMs,snippet,startTimeText,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(startMs);
		this.a_primitive_str(endMs);
		this.G_Text(snippet);
		this.G_Text(startTimeText);
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
		this.t(targetId,x => console.log(`${cf}.targetId`,x));
	}
	/** @private @arg {D_ChipColorPalette} x */
	D_ChipColorPalette(x) {const cf="D_ChipColorPalette"; this.codegen_typedef_all(cf,x); this.GEN(cf,x);}
	/** @private @arg {D_PdgCommentChip} x */
	D_PdgCommentChip(x) {
		const cf="D_PdgCommentChip";
		const {chipText,chipColorPalette,chipIcon,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(chipText);
		this.D_ChipColorPalette(chipColorPalette);
		if(chipIcon.iconType!=="FILL_DOLLAR_SIGN_HEART_12") debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_PrivacyDropdownItem} x */
	D_PrivacyDropdownItem(x) {
		const cf="D_PrivacyDropdownItem";
		const {label,icon,description,int32Value,isSelected,accessibility,...y}=this.s(cf,x); this.g(y);
		this.G_Text(label);
		if(icon.iconType!=="PRIVACY_PUBLIC") debugger;
		this.G_Text(description);
		if(int32Value!==1) debugger;
		if(isSelected!==false) debugger;
		this.D_Label(accessibility);
	}
	/** @private @arg {D_PromotedSparklesWeb} x */
	D_PromotedSparklesWeb(x) {
		const cf="D_PromotedSparklesWeb";
		const {thumbnail,icon,title,description,websiteText,actionButton,navigationEndpoint,impressionCommands,menu,trackingParams,clickLocationTargets,adBadge,...y}=this.s(cf,x); this.g(y);
		thumbnail;
		icon;
		title;
		description;
		websiteText;
		actionButton;
		navigationEndpoint;
		impressionCommands;
		menu;
		trackingParams;
		clickLocationTargets;
		adBadge;
	}
	/** @private @arg {"D_AdaptiveFormatItem"|"D_FormatItem"} cf @arg {D_FormatItem_signatureCipher} x */
	D_Format_signatureCipher(cf,x) {
		/** @type {`${cf}:signatureCipher`} */
		const cf1=`${cf}:signatureCipher`;
		let {s: {},sp,url,...y}=this.parse_url_search_params(x); this.g(y);
		switch(sp) {
			default: debugger; break;
			case "sig": break;
		}
		this.parser.parse_url(cf1,url);
	}
	/** @private @arg {D_AdaptiveFormatItem} x */
	D_AdaptiveFormatItem(x) {
		const cf="D_AdaptiveFormatItem";
		const {itag,url,mimeType,bitrate,width,height,initRange,indexRange,lastModified,contentLength,quality,fps,qualityLabel,projectionType,averageBitrate,colorInfo,highReplication,audioQuality,approxDurationMs,audioSampleRate,audioChannels,loudnessDb,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.D_Range(initRange);
		this.D_Range(indexRange);
		this.a_primitive_str(lastModified);
		this.a_primitive_str(contentLength);
		this.a_primitive_str(quality);
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.a_primitive_num(averageBitrate);
		this.t(colorInfo,this.D_FormatColorInfo);
		this.t(highReplication,x => {if(x!==true) debugger;});
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,x => {
			switch(x) {
				default: debugger; break;
				case "44100": case "48000":
			}
		});
		this.t(audioChannels,x => {
			if(x!==2) debugger;
		});
		this.t(loudnessDb,this.a_primitive_num);
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
	/** @private @arg {D_FormatItem} x */
	D_FormatItem(x) {
		const cf="D_FormatItem";
		const {itag,url,mimeType,bitrate,width,height,lastModified,contentLength,quality,fps,qualityLabel,projectionType,averageBitrate,audioQuality,approxDurationMs,audioSampleRate,audioChannels,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.a_primitive_str(lastModified);
		this.t(contentLength,this.a_primitive_str);
		this.a_primitive_str(quality);
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.a_primitive_num);
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,x => {
			switch(x) {
				default: debugger; break;
				case "44100": case "48000":
			}
		});
		this.t(audioChannels,x => {if(x!==2) debugger;});
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
	/** @private @arg {D_FormatColorInfo} x */
	D_FormatColorInfo(x) {
		const cf="D_Range";
		const {primaries,transferCharacteristics,matrixCoefficients,...y}=this.s(cf,x); this.g(y);
		switch(primaries) {
			default: debugger; break;
			case "COLOR_PRIMARIES_BT709":
		}
		switch(transferCharacteristics) {
			default: debugger; break;
			case "COLOR_TRANSFER_CHARACTERISTICS_BT709":
		}
		switch(matrixCoefficients) {
			default: debugger; break;
			case "COLOR_MATRIX_COEFFICIENTS_BT709":
		}
	}
	/** @private @arg {D_FormatFps} x */
	D_FormatFps(x) {
		let xs=this.num_to_string(x);
		switch(xs) {
			default: switch(xs) {

			}; debugger; break;
			case "13": case "15": case "25": case "30": case "50": case "60":
		}
	}
	/** @private @arg {D_Range} x */
	D_Range(x) {
		const cf="D_Range";
		const {start,end,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(start);
		this.a_primitive_str(end);
	}
	/** @private @arg {D_PlayerConfig} x */
	D_PlayerConfig(x) {
		const cf="D_PlayerConfig"; this.k(cf,x);
	}
	/** @private @arg {D_VideoDetails} x */
	D_VideoDetails(x) {
		const cf="D_VideoDetails"; this.k(cf,x);
	}
	/** @private @arg {D_PlaybackTracking} x */
	D_PlaybackTracking(x) {
		const cf="D_PlaybackTracking"; this.k(cf,x);
		let [a,u]=this.unwrap_prefix(x,"videostats");
		{
			const {defaultFlushIntervalSeconds,delayplayUrl,playbackUrl,scheduledFlushWalltimeSeconds,watchtimeUrl,...y}=a; this.g(y);
		}
		const {atrUrl,ptrackingUrl,qoeUrl,youtubeRemarketingUrl,...y}=u; this.g(y);
		this.D_UrlAndElapsedMediaTime(atrUrl,this.a_primitive_str);
		this.T_BaseUrl(ptrackingUrl,this.a_primitive_str);
		this.T_BaseUrl(qoeUrl,this.a_primitive_str);
		this.t(youtubeRemarketingUrl,x => this.T_BaseUrl(x,this.a_primitive_str));
	}
	/** @private @template {string} T @arg {T_BaseUrl<T>} x @arg {(this:this,x:T)=>void} f */
	T_BaseUrl(x,f) {this.y("T_BaseUrl","baseUrl",x,f);}
	/** @template T @private @arg {D_UrlAndElapsedMediaTime<T>} x @arg {(this:this,x:T)=>void} f */
	D_UrlAndElapsedMediaTime(x,f) {
		const cf="D_UrlAndElapsedMediaTime";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.a_primitive_num(elapsedMediaTimeSeconds);
	}
	/** @private @arg {D_DesktopWatchAds} x */
	D_DesktopWatchAds(x) {
		const cf="D_DesktopWatchAds";
		const {gutParams,playerAdParams,showCompanion,showInstream,useGut,...y}=this.s(cf,x);
		let params_tag=this.B_TagObj(gutParams);
		// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
		if(params_tag!=="\\4061\\ytpwmpu") debugger;
		this.ceq(showCompanion,true);
		this.ceq(showInstream,true);
		this.ceq(useGut,true);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @private @template T @arg {B_TagObj<T>} x */
	B_TagObj(x) {
		const cf="B_TagObj";
		const {tag,...y}=this.s(cf,x);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[done.${cf}.next_key] [${ka.shift()}]`);
		}
		return tag;
	}
	/** @private @arg {D_PlayerCaptionsTracklist} x */
	D_PlayerCaptionsTracklist(x) {
		const cf="D_PlayerCaptionsTracklist";
		const {...y}=this.s(cf,x);
		let ka=this.get_keys_of(y);
		console.log(`[${cf}.next_key] [${ka[0]}]`);
	}
	/** @private @arg {D_VideoQualityPromo} x */
	D_VideoQualityPromo(x) {
		const cf="D_VideoQualityPromo";
		const {triggerCriteria,text,endpoint,trackingParams,snackbar,...y}=this.s(cf,x); this.g(y);
		this.D_TriggerCriteria(triggerCriteria);
		this.G_Text(text);
		this.E_Url(endpoint);
		this.trackingParams(cf,trackingParams);
		this.RA_NotificationAction(snackbar);
	}
	/** @private @arg {D_PlayerAttestation} x */
	D_PlayerAttestation(x) {
		const cf="D_PlayerAttestation";
		const {challenge,botguardData,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(challenge);
		this.D_Botguard(botguardData);
	}
	/** @private @arg {D_Botguard} x */
	D_Botguard(x) {
		const cf="D_Botguard";
		const {program,interpreterSafeUrl,serverEnvironment,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(program);
		let interpreterUrl=this.UrlWrappedValueT(interpreterSafeUrl);
		this.a_primitive_str(interpreterUrl);
		if(serverEnvironment!==1) debugger;
	}
	/** @private @arg {D_CardCollection} x */
	D_CardCollection(x) {
		const cf="D_CardCollection";
		const {cards,headerText,icon,closeButton,trackingParams,allowTeaserDismiss,logIconVisibilityUpdates,...y}=this.s(cf,x); this.g(y);
		this.z(cards,this.R_Card);
		headerText;
		icon;
		closeButton;
		trackingParams;
		allowTeaserDismiss;
		logIconVisibilityUpdates;
	}
	/** @private @arg {D_MicroformatEmbed} x */
	D_MicroformatEmbed(x) {
		const cf="D_CardCollection";
		const {iframeUrl,flashUrl,width,height,flashSecureUrl,...y}=this.s(cf,x); this.g(y);
		iframeUrl;
		flashUrl;
		width;
		height;
		flashSecureUrl;
	}
	/** @private @arg {D_PlayerMicroformat} x */
	D_PlayerMicroformat(x) {
		const cf="D_PlayerMicroformat";
		const {thumbnail,embed,title,description,lengthSeconds,ownerProfileUrl,externalChannelId,isFamilySafe,availableCountries,isUnlisted,hasYpcMetadata,viewCount,category,publishDate,ownerChannelName,liveBroadcastDetails,uploadDate,...y}=this.s(cf,x); this.g(y);
		this.D_Thumbnail(thumbnail);
		this.D_MicroformatEmbed(embed);
		title;
		description;
		lengthSeconds;
		ownerProfileUrl;
		externalChannelId;
		isFamilySafe;
		availableCountries;
		isUnlisted;
		hasYpcMetadata;
		viewCount;
		category;
		publishDate;
		ownerChannelName;
		liveBroadcastDetails;
		uploadDate;
	}
	/** @private @arg {D_AdPlacement} x */
	D_AdPlacement(x) {
		const cf="D_AdPlacement";
		const {config,renderer,...y}=this.s(cf,x); this.g(y);
		config;
		renderer;
	}
	/** @private @arg {Popup_ShareEntityService} x */
	Popup_ShareEntityService(x) {
		const cf="Popup_ShareEntityService";
		const {popup,popupType,beReused,...y}=this.s(cf,x); this.g(y);
		this.R_UnifiedSharePanel(popup);
		if(popupType!=="DIALOG") debugger;
		this.a_primitive_bool(beReused);
	}
	/** @private @arg {"DC_PlayerSeek"} cf @arg {P_PathRootStr} path @arg {DC_Generic} x */
	DC_Generic(cf,path,x) {this.y(cf,"continuation",x,x => this.params(cf,path,x));}
	/** @private @arg {DC_PlayerSeek} x */
	DC_PlayerSeek(x) {this.DC_Generic("DC_PlayerSeek","player_seek.continuation",x);}
	/** @private @arg {CD_PlayerSeek} x */
	CD_PlayerSeek(x) {this.y("CD_PlayerSeek","playerSeekContinuationData",x,this.DC_PlayerSeek);}
	/** @private @arg {DC_LiveChatReplay} x */
	DC_LiveChatReplay(x) {
		const cf="DC_LiveChatReplay";
		const {continuation,timeUntilLastMessageMsec,...y}=this.s(cf,x); this.g(y);
		this.params(cf,"live_chat_replay.continuation",continuation);
		this.a_primitive_num(timeUntilLastMessageMsec);
	}
	/** @private @arg {CD_LiveChatReplay} x */
	CD_LiveChatReplay(x) {this.y("CD_LiveChatReplay","liveChatReplayContinuationData",x,this.DC_LiveChatReplay);}
	/** @private @arg {DC_Invalidation} x */
	DC_Invalidation(x) {
		const cf="DC_Invalidation";
		const {invalidationId,timeoutMs,continuation,clickTrackingParams,...y}=this.s(cf,x); this.g(y);
		this.D_InvalidationId(invalidationId);
		if(timeoutMs!==10000) debugger;
		this.params(cf,"invalidation.continuation",continuation);
		this.t_cf(cf,clickTrackingParams,this.clickTrackingParams);
	}
	/** @private @arg {D_InvalidationId} x */
	D_InvalidationId(x) {
		const cf="D_InvalidationId";
		const {objectSource,objectId,topic,subscribeToGcmTopics,protoCreationTimestampMs,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_num(objectSource);
		console.log(`[${cf}.objectId]`,objectId);
		console.log(`[${cf}.topic]`,topic);
		if(subscribeToGcmTopics!==true) debugger;
		console.log(`[${cf}.protoCreationTimestampMs]`,protoCreationTimestampMs);
	}
	/** @private @arg {CD_Invalidation} x */
	CD_Invalidation(x) {this.y("CD_Invalidation","invalidationContinuationData",x,this.DC_Invalidation);}
	/** @private @arg {D_ThumbnailOverlayInlineUnplayable} x */
	D_ThumbnailOverlayInlineUnplayable(x) {
		const cf="D_ThumbnailOverlayInlineUnplayable";
		const {text,icon,...y}=this.s(cf,x); this.g(y);
		this.G_Text(text);
		this.ceq(icon.iconType,"PLAY_DISABLED");
	}
	/** @private @arg {D_Card} x */
	D_Card(x) {
		const cf="D_Card";
		const {teaser,cueRanges,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.R_SimpleCardTeaser(teaser);
		this.z(cueRanges,this.D_CueRangeItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_CueRangeItem} x */
	D_CueRangeItem(x) {
		const cf="D_CueRangeItem";
		const {startCardActiveMs,endCardActiveMs,teaserDurationMs,iconAfterTeaserMs,...y}=this.s(cf,x); this.g(y);
		if(startCardActiveMs!=="0") debugger;
		if(endCardActiveMs!=="5000") debugger;
		if(teaserDurationMs!=="6000") debugger;
		if(iconAfterTeaserMs!=="5000") debugger;
	}
	/** @private @arg {D_SimpleCardTeaser} x */
	D_SimpleCardTeaser(x) {
		const cf="D_SimpleCardTeaser";
		const {message,trackingParams,prominent,logVisibilityUpdates,onTapCommand,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		this.trackingParams(cf,trackingParams);
		this.ceq(prominent,true);
		this.ceq(logVisibilityUpdates,true);
		this.A_ChangeEngagementPanelVisibility(onTapCommand);
	}
	/** @private @arg {D_TriggerCriteria} x */
	D_TriggerCriteria(x) {
		const cf="D_TriggerCriteria";
		const {connectionWhitelist,joinLatencySeconds,rebufferTimeSeconds,watchTimeWindowSeconds,refractorySeconds,...y}=this.s(cf,x); this.g(y);
		if(connectionWhitelist.length!==1) debugger;
		this.ceq(connectionWhitelist[0],"WIFI");
		if(joinLatencySeconds!==15) debugger;
		if(rebufferTimeSeconds!==10) debugger;
		if(watchTimeWindowSeconds!==180) debugger;
		if(refractorySeconds!==2592000) debugger;
	}
	//#endregion
	//#region TODO_minimal_member_fns
	/** @private @arg {minimal_handler_member} x ! */
	minimal_handler_member_2(x) {x;/*!*/}
	//#endregion
}
//#endregion
init_module();
//#endregion
//#endregion
