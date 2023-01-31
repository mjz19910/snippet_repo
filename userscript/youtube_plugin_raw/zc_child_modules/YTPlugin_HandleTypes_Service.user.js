// ==UserScript==
// @name	YTPlugin HandleTypes Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.0
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
const __module_name__="mod$HandleTypes";
if(!window.__youtube_plugin_base_loaded__) {
	throw new Error("Failed to load base plugin");
}
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
function export_(fn,flags={global: false}) {
	bs.do_export(fn,flags,exports,__module_name__);
}
export_(exports => {
	exports.__is_module_flag__=true;
});


//#region HandleTypes
/** @arg {TemplateStringsArray} x */
function raw_template(x) {
	if(x.raw.length>1) {
		debugger;
	}
	return x.raw[0].replaceAll("\\`","`").replaceAll("\\${","${");
}
const ServiceMethods=bs.ServiceMethods;
const ServiceResolver=bs.ServiceResolver;
const CodegenService=required(store["mod$CodegenService"]?.CodegenService);
class FakeUseHandleEval {
	static {
		CodegenService;
		ServiceResolver;
	}
}
FakeUseHandleEval;
const handle_types_eval_code=raw_template`
class HandleTypesEval extends ServiceMethods {
	//#region KR_ResponseContext
	/** @private @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {
		const cf="RC_ResponseContext";
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(mainAppWebResponseContext,this.RC_MainAppWebResponseContext);
		this.z(serviceTrackingParams,x => {
			if(!this.is_normal_service(this)) return;
			const service_tracking=this.x.get("service_tracking");
			service_tracking.set_service_params(x);
		});
		this.t(webResponseContextExtensionData,this.RC_WR_ContextExtension);
		this.t(consistencyTokenJar,this.RC_ConsistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.primitive_of(maxAgeSeconds,"number");
		this.t(stateTags,this.RCA_RelevantStateTags);
	}
	/** @private @arg {RC_WR_ContextExtension} x */
	RC_WR_ContextExtension(x) {
		const cf="RC_WR_ContextExtension";
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(hasDecorated!==void 0) this.primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,this.D_YtConfig);
		this.t(webPrefetchData,this.D_WebPrefetch);
	}
	/** @private @arg {D_WebPrefetch} x */
	D_WebPrefetch(x) {
		const cf="D_WebPrefetch";
		const {navigationEndpoints,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(navigationEndpoints,x => {
			if("watchEndpoint" in x) {
				return this.E_Watch(x);
			}
			debugger;
		});
	}
	/** @private @arg {RCA_RelevantStateTags} x */
	RCA_RelevantStateTags(x) {
		const cf="RCA_RelevantStateTags";
		const {relevantStateTags,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(relevantStateTags,this.B_StateTag);
	}
	primitive_str(x) {this.a_primitive_str(x);}
	primitive_of(x,y) {this._primitive_of(x,y);}
	/** @private @arg {RC_ConsistencyTokenJar} x */
	RC_ConsistencyTokenJar(x) {
		const cf="RC_ConsistencyTokenJar";
		const {encryptedTokenJarContents,expirationSeconds,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.primitive_str(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @private @arg {D_YtConfig} x */
	D_YtConfig(x) {
		const cf="D_YtConfig";
		const {visitorData,sessionIndex,rootVisualElementType,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {RC_MainAppWebResponseContext} x */
	RC_MainAppWebResponseContext(x) {
		const cf="RC_MainAppWebResponseContext";
		const {datasyncId,loggedOut,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.primitive_str(datasyncId);
		this.primitive_of(loggedOut,"boolean");
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
	codegen_renderer(cf,x,w) {
		this.codegen.codegen_renderer(x,cf,w);
	}
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
}
window.HandleTypesEval=HandleTypesEval;
//# sourceURL=plugin://extension/youtube_plugin_handle_types.js
`;
eval(handle_types_eval_code);

/** @template {string} T1 @template {string} T2 @template {string} T3 @template {string} T4 @template {string} T5 */
class UrlParseHelper {
	/** @arg {UrlParseRes<T1,T2,T3,T4,T5>} x */
	constructor(x) {
		this.x=x;
	}
	/** @arg {U} cx @template {UrlParseRes<T1,T2,T3,T4,T5>} U @template {`/${T5}`} T @arg {T} pname @returns {cx is Extract<U,{pathname:T}>} */
	get_with_pathname(cx,pname) {
		return ServiceMethods.is_url_with_pathname(cx,pname);
	}
}
const ECatcherService=required(store["mod$ECatcherService"]?.ECatcherService);
// [new_fexp_expected]
ECatcherService.known_experiments.push(...[
	[],
].flat());
/** @template Cls_T,Cls_U @extends {HandleTypesEval<Cls_T,Cls_U>}  */
class HandleTypes extends HandleTypesEval {
	//#region moved members
	//#region templates
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x */
	H_Get(cf,k,x) {return this.wn(cf,x,k);}
	// const cf="TR_ItemSection_2"; const {itemSectionRenderer: a,...y}=this.s(cf,x); this.g(y); return a;
	/** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x */
	TR_ItemSection_2(x) {return this.wn("TR_ItemSection_2",x,"itemSectionRenderer");}
	/** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x */
	TR_ItemSection_3(x) {return this.wn("TR_ItemSection_3",x,"itemSectionRenderer");}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		f.call(this,a);
	}
	/** @private @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	T_Autoplay(x,f) {
		const cf="T_Autoplay";
		const {autoplay,...y}=this.s(cf,x); this.g(y);//#destructure_off
		f.call(this,autoplay);
	}
	/** @private @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	T_Playlist(x,f) {
		const cf="T_Playlist";
		const {playlist,...y}=this.s(cf,x); this.g(y);//#destructure_off
		f.call(this,playlist);
	}
	/** @private @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	T_SecondaryResults(x,f) {
		const cf="T_SecondaryResults";
		const {secondaryResults,...y}=this.s(cf,x); this.g(y);//#destructure_off
		f.call(this,secondaryResults);
	}
	/** @private @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {
		const cf="T_Types";
		const {types,...y}=this.s(cf,x); this.g(y);//#destructure_off
		/** @private @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {
			return as(Number.parseInt(x,10));
		}
		return parse_number(types,_x);
	}
	/** @private @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint(x,f) {
		const cf="TD_ItemSection_2_CommentsEntryPoint";
		const {contents,trackingParams,sectionIdentifier,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,f);
		this.trackingParams(cf,trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @arg {(x:NonNullable<R_TextRun['navigationEndpoint']>)=>void} f_run */
	/** @protected @arg {G_Text} x */
	G_Text(x) {
		const cf="G_Text";
		const {runs,simpleText,accessibility,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(simpleText,this.a_primitive_str);
		this.tz(runs,x => this.R_TextRun(x,this.R_TextRun_Endpoint));
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {R_TextRun_Endpoint} x */
	R_TextRun_Endpoint(x) {
		const cf="R_TextRun_Endpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.E_Browse(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_TextRun} x @arg {(x:NonNullable<R_TextRun['navigationEndpoint']>)=>void} f_run */
	R_TextRun(x,f_run) {
		const cf="R_TextRun";
		const {text,navigationEndpoint,loggingDirectives,bold,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(navigationEndpoint,f_run);
		this.a_primitive_str(text);
		this.t(loggingDirectives,this.D_LoggingDirectives);
		this.t(bold,this.a_primitive_bool);
	}
	//#endregion
	/** @template {CF_T_Commands} T_CF @arg {T_CF} cf1 @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(cf1,x,f) {
		const cf2="T_Commands"; this.k(cf1,x);
		this.z(this.w(`${cf2}:${cf1}`,"commands",x),f);
	}
	/** @private @template {CF_D_Params} T_CF @arg {T_CF} cf @template U @template {string} T @arg {{params:T;}} x @arg {(this:this,x:T,cf:T_CF)=>U} f */
	D_Params(cf,x,f) {const {params: p,...y}=this.s_priv(`D_Params:${cf}`,x); this.g(y); return f.call(this,x.params,cf);}
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
	/** @private @template T @arg {CF_T_WCM_Unpack} cf @arg {{webCommandMetadata: T}} x */
	unpack_T_WCM(cf,x) {return this.w(`Unpack:T_WCM:${cf}`,"webCommandMetadata",x);}
	//#endregion
	//#region static & typedefs
	/** @typedef {{}} minimal_handler_member */
	static {
		this.prototype.minimal_handler_member_2({});
	}
	// /** @protected @override @type {<U,K extends T_DistributedKeyof<T>,T extends {}>(cf:string,x:T,f:(x:T[K])=>U)=>U} */
	// H_=super.H_;
	//#region Temporary
	/** @private @arg {string} cf @arg {K} k @template {keyof T} K @public @template {{}} T @arg {T} x */
	HD_(cf,k,x) {
		this.k(cf,x);
		let kx=this.get_keys_of(x);
		if(kx.length!==1) debugger;
		if(kx[0]!==k) debugger;
	}
	/** @protected @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>U} f */
	H_(cf,k,x,f) {
		if(!x) {debugger; return;}
		let wr=this.wn(cf,x,k);
		if(!wr) return;
		return f.call(this,wr);
	}
	/** @arg {CF_TD_ItemSection_3} cf1 @protected @template CT,T,U @arg {TD_ItemSection_3<CT,T,U>} x @returns {[contents,sectionIdentifier,targetId]|null} */
	TD_ItemSection_3(cf1,x) {
		const cf2="TD_ItemSection_3";
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);//#destructure_off
		this.trackingParams(cf2,trackingParams);
		if(contents.length>0) {
			let cu=contents[0];
			if(typeof cu!=="object"||!cu) {debugger; return null;}
			let k=this.get_keys_of(cu);
			switch(k[0]) {
				case "continuationItemRenderer": break;
				default: console.log(`-- [TD_Section_3_Info] --\n\n${k.map(e => `case "${e}":`).join("\n")}`); break;
			}
		}
		return [contents,sectionIdentifier,targetId];
	}
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
	/** @private @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
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
	/** @protected @arg {CF_M_w} cf @arg {SI} k @template {T_DistributedKeyof<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {T[SI]} */
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
	/** @protected @template {CF_M_y} T_CF  @arg {T_CF} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K],cf:`${T_CF}.${K}`)=>U} f */
	y(cf,k,x,f) {return f.call(this,this.w(`y:${cf}`,k,x),`${cf}.${k}`);}
	/** @protected @arg {CF_M_zy} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K][number],i:number)=>U} f */
	zy(cf,k,x,f) {return this.z(this.w(`zy:${cf}`,k,x),f);}
	//#endregion
	//#region CheckedTemplates
	/** @private @template T,U @arg {T_Item<T>} x @arg {(this:this,x:T)=>U} f */
	T_Item=(x,f) => this.y("T_Item","item",x,f);
	/** @arg {CF_T_Icon} cf1 @private @template {string} T @template {string} U @arg {T_Icon<T>} x @arg {U extends T?U:never} w */
	T_Icon(cf1,x,w) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);//#destructure_off
		if(iconType!==w) debugger;
		this.save_string(`[${cf1}.IconType]`,iconType);
	}
	/** @private @arg {CF_T_Icon_Any} cf1 @template {string} T @arg {T_Icon<T>} x @arg {T[]} ty_arr */
	T_Icon_AnyOf(cf1,x,ty_arr) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:any:${cf1}`,x); this.g(y);//#destructure_off
		const is_not_in_set=!ty_arr.includes(iconType);
		if(is_not_in_set) {console.log("[missing_icon]",iconType);}
		this.save_string("[IconType]",iconType);
		return is_not_in_set;
	}
	/** @private @arg {CF_TA_OpenPopup} cf1 @template T @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(cf1,x) {
		const cf2="TA_OpenPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);//#destructure_off
		this.clickTrackingParams(`${cf1}.tracking`,clickTrackingParams);
		return a;
	}
	/** @protected @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
	T_ShortsSurfaceIdentifier(x) {
		const cf="T_ShortsSurfaceIdentifier";
		const {surface,tag,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		switch(tag) {
			case "engagement-panel-structured-description": break;
			case "shorts-comments-panel": break;
			default: debugger; break;
		}
		return tag;
	}
	/** @private @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a}=this.s("T_UrlWrappedValue",x); return a;}
	/** @private @arg {CF_TA_Page} cf @template T @arg {TA_Page<T>} x @template U @arg {(this:this,x:T)=>U} f */
	TA_Page(cf,x,f) {f.call(this,this.w(`TA_Page:${cf}`,"page",x));}
	/** @private @arg {CF_TR_MultiPageMenu} cf @template T @arg {TR_MultiPageMenu<T>} x */
	TR_MultiPageMenu(cf,x) {return this.w(`TR_MultiPageMenu:${cf}`,"multiPageMenuRenderer",x);}
	//#endregion
	//#region web_command_metadata
	/** @private @arg {GM_VE6827_WC} x */
	GM_VE6827_WC(x) {
		const cf="GM_VE6827_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(url,this.D_VE6827_PageUrl);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==6827) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {D_VE6827_PageUrl} x */
	D_VE6827_PageUrl(x) {
		let [f,...p]=split_string(x,"/"); if(f!=="") debugger;
		switch(p[0]) {
			default: p[0]===""; debugger; break;
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
	/** @private @arg {GM_VE23462_WC} x */
	GM_VE23462_WC(x) {
		const cf="GM_VE23462_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		switch(url) {
			default: console.log(`-- [GM_VE23462_WC] --\n\n\ncase "${url}":`); break;
			case "/account": break;
			case "/account_notifications": break;
		}
		if(webPageType!=="WEB_PAGE_TYPE_SETTINGS") debugger;
		if(rootVe!==23462) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE96368_WC_browse} x */
	GM_VE96368_WC_browse(x) {
		const cf="GM_VE96368_WC_browse";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==96368) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {Extract<GM_WC,{apiUrl:any}>} x */
	GM_WC_ApiUrl(x) {
		let cx=x.apiUrl;
		switch(x.apiUrl) {
			default: {
				let path_parts=split_string(split_string_once(cx,"/")[1],"/");
				let url_type=this.parser.get_url_type(path_parts);
				if(!url_type) {
					debugger;
					return;
				}
				let url_type_ex=this.join_string(split_string(url_type,"."),"$");
				/** @private @arg {GM_WC} x */
				let typedef_str=this.codegen_new_typedef(`G_${url_type_ex}`,x,true);
				const l1="-- [GeneratedWebCommandMetadata] --";
				const r2="return this.GeneratedWebCommandMetadata(x);";
				console.log(`\n${l1}\n\n${typedef_str}\n---\n\n\tG_${url_type_ex},\n---\n\n\tcase "${cx}": ${r2}`);
				debugger;
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
				return this.GM_browse(x);
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
	/** @private @arg {Exclude<Extract<GM_WC,{rootVe:any}>,{apiUrl:any}>} x */
	GM_WC_RootVe(x) {
		let cx=x.rootVe;
		switch(x.rootVe) {
			default: {
				x===0;
				/** @private @arg {GM_WC} x */
				this.codegen_str(`G_VE${cx}`,x);
				console.log(`\n\tG_VE${cx},`);
				console.log(`\n\tcase ${cx}: return this.GeneratedWebCommandMetadata(x);`);
			} break;
			case 3832: return this.GM_VE3832_Watch_WC(x);
			case 4724: return this.GM_VE4724_WC(x);
			case 37414: return this.GM_VE37414_WC(x);
			case 83769: return this.GM_VE83769_WC(x);
		}
	}
	/** @private @arg {Extract<GM_WC,{rootVe:any;apiUrl:any}>} x */
	GM_WC_Ex(x) {
		switch(x.rootVe) {
			case 3854: return this.GM_VE3854_WC(x);
			case 3611: return this.GM_VE3611_WC(x);
			case 5754: return this.GM_VE5754_WC(x);
			case 6827: return this.GM_VE6827_WC(x);
			case 11487: return this.GM_VE11487_WC(x);
			case 23462: return this.GM_VE23462_WC(x);
			case 42352: return this.GM_VE42352_WC(x);
			case 96368: return this.GM_VE96368_WC_browse(x);
			default: x===0; debugger; break;
		}
	}
	/** @private @arg {GM_VE11487_WC} x */
	GM_VE11487_WC(x) {
		const cf="GM_VE11487_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==11487) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE5754_WC} x */
	GM_VE5754_WC(x) {
		const cf="GM_VE5754_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let [f,url_playlist_id]=split_string_once(url,"/playlist?list=");
		if(f!=="") debugger;
		this.parser.parse_playlist_id(url_playlist_id);
		if(webPageType!=="WEB_PAGE_TYPE_PLAYLIST") debugger;
		if(rootVe!==5754) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_WC} x */
	GM_WC(x) {
		const cf="GM_WC";
		if("rootVe" in x&&!("apiUrl" in x)) return this.GM_WC_RootVe(x);
		if("apiUrl" in x&&!("rootVe" in x)) return this.GM_WC_ApiUrl(x);
		if("rootVe" in x&&"apiUrl" in x) return this.GM_WC_Ex(x);
		if("sendPost" in x) {
			const {sendPost,...y}=this.s(cf,x); this.g(y);//#destructure_off
			if(sendPost!==true) debugger;
			return;
		}
		x===0;
		this.do_codegen(cf,x);
	}
	/** @private @arg {GM_VE3854_WC} x */
	GM_VE3854_WC(x) {
		const cf="GM_VE3854_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		x: {
			if(url==="/") break x;
			debugger;
		}
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==3854) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {Extract<GM_WC,{sendPost:boolean;apiUrl:string}>} x */
	GM_WC_Base(x) {const cf="GM_WC_Base",{sendPost,apiUrl}=this.s(cf,x); this._primitive_of(sendPost,"boolean"); return this.parser.parse_url(cf,apiUrl);}
	//#endregion
	//#region general done
	cg_mismatch_set=new Set();
	/** @type {[string,string][]} */
	cg_mismatch_list=[];
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
	/** @private @arg {R_WatchPage} x */
	R_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: this.R_WatchPage_VE3832(x); break;
			default: debugger; break;
		} else {
			this.R_WatchPage_Generic(x);
		}
	}
	/** @private @arg {R_WatchPage_Generic} x */
	R_WatchPage_Generic(x) {
		const cf="R_WatchPage_Generic";
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.E_Watch(endpoint);
		this.RS_Watch(response);
		this.RS_Player(playerResponse);
		let wp_params=this.parse_watch_page_url(cf,url);
		this.save_keys(`[${cf}.wp_params]`,wp_params);
		if(previousCsn!==void 0) this._previousCsn(previousCsn);
	}
	/** @private @arg {R_WatchPage_VE3832} x */
	R_WatchPage_VE3832(x) {
		const cf="R_WatchPage_VE3832";
		const {rootVe,url,endpoint,page: {},preconnect,playerResponse,response,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		if(this.is_normal_service(this)) {
			this.x.get("yt_plugin").add_function({
				name: "data",
				data: {
					R_Watch: x,
				},
			});
		}
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RC_ResponseContext(responseContext);
		this.R_TwoColumnWatchNextResults(contents);
		this.E_Watch(currentVideoEndpoint);
		this.trackingParams(cf,trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,this.R_CinematicContainer);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_DesktopTopbar} x */
	D_DesktopTopbar(x) {
		const cf="D_DesktopTopbar";
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {A_FrameworkUpdates} x */
	A_FrameworkUpdates(x) {
		const cf="A_FrameworkUpdates";
		const {entityBatchUpdate,elementUpdate,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.R_ElementUpdate);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist";
		const {responseContext: {},status,actions,playlistEditResults,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(status!=="STATUS_SUCCEEDED") debugger;
		let [r]=this.z(actions,x => {
			if("refreshPlaylistCommand" in x) return this.C_RefreshPlaylist(x);
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			debugger;
		});
		this.z(r,a => a);
		this.z(playlistEditResults,this.g);
		this.trackingParams(cf,trackingParams);
	}
	/** @template A1,A2,A3,A4 @template {[(a1:A1,a2:A2,a3:A3,a4:A4,...n:any[])=>void]} T @arg {[T,A1,A2,A3,A4]} arg0 */
	make_bind([func,a1,a2,a3,a4]) {
		return [func,a1,a2,a3,a4];
	}
	/** @private @arg {C_RefreshPlaylist} e */
	C_RefreshPlaylist(e) {
		let [r,r2]=this.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",e);
		this.D_RefreshPlaylist(r);
		this.g(r2);
	}
	/** @private */
	log_url=false;
	/** @private @arg {R_BrowsePage} x */
	R_BrowsePage(x) {
		const cf="R_BrowsePage";
		const {rootVe,url,endpoint,page,response,expirationTime,previousCsn,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(rootVe,x => this.save_number("R_BrowsePage.rootVe",x));
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		this.E_Browse(endpoint);
		if(page!=="browse") debugger;
		this.RS_Browse(response);
		this.t(expirationTime,x => this._primitive_of(x,"number"));
		if(previousCsn!==void 0) this._previousCsn(previousCsn);
	}
	//#region Grouped Endpoints
	// in this case, inferred (E_Page is a index accessed type)
	/** @private @arg {E_Page} x */
	E_Page(x) {
		const cf="E_Page"; this.k(cf,x);
		if("browseEndpoint" in x) return this.E_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		this.do_codegen(cf,x);
	}
	//#region E_ (Endpoints)
	/** @private @arg {E_Watch} x */
	E_Watch(x) {let [a,b,y]=this.TE_Endpoint_3("E_Watch","watchEndpoint",x); this.g(y); this.M_VE3832(a); this.DE_VE3832_Watch(b);}
	/** @private @arg {E_Upload} x */
	E_Upload(x) {let [a,b,y]=this.TE_Endpoint_3("E_Upload","uploadEndpoint",x); this.g(y); this.DC_Empty_WCM(a); this.B_Hack(b);}
	/** @private @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {let [a,b,y]=this.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.D_YpcGetCart(b);}
	/** @private @arg {E_Subscribe} x */
	E_Subscribe(x) {let [a,b,y]=this.TE_Endpoint_3("E_Subscribe","subscribeEndpoint",x); this.g(y); this.M_Subscribe(a); this.DE_Subscribe(b);}
	/** @private @arg {E_ReelWatch} x */
	E_ReelWatch(x) {let [a,b,y]=this.TE_Endpoint_3("E_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.D_ReelWatch(b);}
	/** @private @arg {E_ShowEngagementPanel} x */
	E_ShowEngagementPanel(x) {
		const cf="E_ShowEngagementPanel";
		let [a,b]=this.TE_Endpoint_2(cf,"showEngagementPanelEndpoint",x);
		this.D_ShowEngagementPanel(a);
		this.g(b);
	}
	/** @private @arg {E_GetReportForm} x */
	E_GetReportForm(x) {
		const cf="E_GetReportForm";
		let [a,b,y]=this.TE_Endpoint_3(cf,"getReportFormEndpoint",x); this.g(y);//#destructure
		this.D_Params(`D${cf}`,b,(x,cf) => this.params(cf,"get_report_form",x));
		this.M_FlagGetForm(a);
	}
	/** @protected @arg {E_AddToPlaylistService} x */
	E_AddToPlaylistService(x) {
		let [a,b,y]=this.TE_Endpoint_3("E_AddToPlaylistService","addToPlaylistServiceEndpoint",x); this.g(y);
		this.M_AddToPlaylistService(a);
		this.DE_AddToPlaylistService(b);
	}
	/** @protected @arg {E_PlaylistEdit} x */
	E_PlaylistEdit(x) {
		const cf="E_PlaylistEdit"; this.k(cf,x);
		const {clickTrackingParams,commandMetadata: {webCommandMetadata,...y1},playlistEditEndpoint,...y}=this.s(cf,x); this.g(y); this.g(y1);
		this.clickTrackingParams(cf,clickTrackingParams);
		if(webCommandMetadata.apiUrl!=="/youtubei/v1/browse/edit_playlist") debugger;
		this.GM_WC(webCommandMetadata);
		this.D_PlaylistEdit(playlistEditEndpoint);
	}
	/** @protected @arg {E_Feedback} x */
	E_Feedback(x) {
		const cf="E_Feedback";
		const {clickTrackingParams,commandMetadata,feedbackEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/feedback") debugger;
		this.M_Feedback(commandMetadata);
		this.DE_Feedback(feedbackEndpoint);
	}
	/** @private @arg {E_UndoFeedback} x */
	E_UndoFeedback(x) {x; debugger;}
	/** @private @arg {E_Url} x */
	E_Url(x) {let [a,b,y]=this.TE_Endpoint_3("E_Url","urlEndpoint",x); this.g(y); this.M_VE83769(a); this.DE_Url(b);}
	/** @private @arg {E_RecordNotificationInteractions} x */
	E_RecordNotificationInteractions(x) {let [a,b,y]=this.TE_Endpoint_3("E_RecordNotificationInteractions","recordNotificationInteractionsEndpoint",x); this.g(y); this.M_RecordInteractions(a); this.DE_RecordNotificationInteractions(b);}
	/** @private @arg {E_GetNotificationMenu} x */
	E_GetNotificationMenu(x) {let [a,b,y]=this.TE_Endpoint_3("E_GetNotificationMenu","getNotificationMenuEndpoint",x); this.g(y); this.M_GetNotificationMenu(a); this.DE_GetNotificationMenu(b);}
	/** @private @arg {E_GetTranscript} x */
	E_GetTranscript(x) {let [a,b,y]=this.TE_Endpoint_3("E_GetTranscript","getTranscriptEndpoint",x); this.g(y); this.DC_Empty_WCM(a); this.DC_GetTranscript_Params("get_transcript.params",b);}
	/** @private @arg {"get_transcript.params"} path @arg {DC_Params} a */
	DC_GetTranscript_Params(path,a) {this.D_Params(`DE_GetTranscript`,a,(x,cf) => this.params(cf,path,x));}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {const cf="E_GetTranscript",[a,b,y]=this.TE_Endpoint_3(cf,"ypcGetOffersEndpoint",x); this.g(y); this.DC_Empty_WCM(a); this.D_Params(`D${cf}`,b,(params,cf) => this.params(`${cf}.params`,"ypc_get_offers.params",params));}
	/** @private @arg {E_Search} x */
	E_Search(x) {
		const cf="E_Search";
		const {clickTrackingParams,commandMetadata: a,searchEndpoint: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_VE4724(a);
		this.D_Search(b);
	}
	/** @private @arg {E_CreateBackstagePost} x */
	E_CreateBackstagePost(x) {
		const cf="E_CreateBackstagePost";
		let [a,b,y]=this.TE_Endpoint_3(cf,"createBackstagePostEndpoint",x); this.g(y);
		this.DE_CreateBackstagePost(b);
		this.M_CreateBackstagePost(a);
	}
	/** @private @arg {E_WatchPlaylist} x */
	E_WatchPlaylist(x) {
		const cf="E_WatchPlaylist";
		const {clickTrackingParams,commandMetadata: a,watchPlaylistEndpoint: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.do_codegen(cf,x); a;
		// this.G_CommandMetadata(commandMetadata);
		this.D_WatchPlaylist(b);
	}
	/** @private @arg {E_Like} x */
	E_Like(x) {
		let [a,b,y]=this.TE_Endpoint_3("E_Like","likeEndpoint",x); this.g(y);
		this.M_Like(a);
		this.DE_Like(b);
	}
	/** @private @arg {E_PlaylistEditor} x */
	E_PlaylistEditor(x) {
		let [a,b,y]=this.TE_Endpoint_3("E_PlaylistEditor","playlistEditorEndpoint",x); this.g(y);
		this.DE_PlaylistEditor(b);
		this.DC_Empty_WCM(a);
	}
	/** @private @arg {GE_Browse['browseEndpoint']['browseId']} x */
	E_Browse_ParseBrowseId(x) {
		if(this.str_starts_with("UC",x)) return this.D_ChannelId(x);
		if(this.str_starts_with("VL",x)) return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);
		switch(x) {
			case "FEdownloads": case "FEhistory": case "FElibrary": case "FEsubscriptions": case "FEtrending": case "FEwhat_to_watch": break;
			case "FEguide_builder": case "FEstorefront": break;
			case "SPaccount_notifications": case "SPunlimited": case "SPreport_history":
			case "SPaccount_overview": break;
			default: x===""; console.log(`-- [E_Browse_ParseBrowseId] --\n\n\ncase "${x}":`); break;
		};
	}
	/** @private @arg {GE_Browse} x */
	E_Browse(x) {let [x2,x4,x5]=this.TE_Endpoint_3("E_Browse","browseEndpoint",x); this.M_VE_Browse(x2); this.DE_Browse_VE(x4); this.g(x5);}
	/** @private @arg {DE_GetNotificationMenu} x */
	DE_GetNotificationMenu(x) {
		const cf="DE_GetNotificationMenu";
		const {ctoken,...y}=this.s(cf,x); this.g(y);
		this.params(cf,"GetNotificationMenu.ctoken",ctoken);
		debugger;
	}
	/** @private @arg {GE_Browse['browseEndpoint']} x */
	DE_Browse_VE(x) {
		const cf="DE_Browse_VE";
		if("params" in x) {
			const {browseId: a,params: c,...y}=this.s(cf,x); this.g(y);//#destructure
			this.E_Browse_ParseBrowseId(a);
			this.params(cf,"D_Browse.param",c);
			this.g(y);
			return;
		}
		if("canonicalBaseUrl" in x) {
			const {browseId: a,canonicalBaseUrl: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.E_Browse_ParseBrowseId(a);
			return this._decode_channel_url(b);
		}
		const {browseId: a,...y}=this.s(cf,x); this.g(y);//#destructure
		this.E_Browse_ParseBrowseId(a);
		this.g(y);
	}
	/** @private @type {(x:M_Like)=>void} */
	M_Like(x) {
		const cf="M_Like";
		const {webCommandMetadata: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		switch(a.apiUrl) {
			default: debugger; break;
			case "/youtubei/v1/like/removelike": return this.GM_like_removelike(a);
			case "/youtubei/v1/like/dislike": return this.GM_like_dislike(a);
			case "/youtubei/v1/like/like": return this.GM_like_like(a);
		}
	}
	/** @private @arg {GE_Browse['commandMetadata']} x */
	M_VE_Browse(x) {
		const cf="M_VE_Browse";
		const {webCommandMetadata: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.GM_VE_WC_Browse(a);
	}
	/** @private @arg {GE_Browse['commandMetadata']['webCommandMetadata']} x */
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
	}
	/** @private @arg {GM_VE42352_WC['url']} x */
	_decode_browse_url(x) {
		switch(x) {
			case "/feed/downloads": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GM_VE42352_WC} x */
	GM_VE42352_WC(x) {
		const cf="GM_VE42352_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this._decode_browse_url(url);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==42352) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
	}
	/** @private @arg {GM_VE3611_WC} x */
	GM_VE3611_WC(x) {
		const cf="GM_VE3611_WC";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this._decode_channel_url(url);
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if(rootVe!==3611) debugger;
	}
	/** @private @arg {GM_VE37414_WC} x */
	GM_VE37414_WC(x) {
		const cf="GM_VE37414_WC";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(url!=="/shorts/") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SHORTS") debugger;
		if(rootVe!==37414) debugger;
	}
	/** @private @arg {GM_VE3611_WC['url']} x */
	_decode_channel_url(x) {
		if(this.str_starts_with("/@",x)) return;
		let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
		let a1=split_string_once(y,"/");
		switch(a1[0]) {
			default: debugger; break;
			case "gaming": if(a1.length!==1) debugger; break;
			case "channel": {
				let [,y1]=a1;
				if(this.str_starts_with("UC",y1)) return;
			} break;
		}
	}
	/** @private @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse";
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
			debugger;
		}
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedActions,this.A_ResponseReceived);
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
		this.t(continuationContents,this.C_SectionList);
		this.t_cf(cf,alerts,this.Response_alerts);
	}
	/** @private @arg {C_SectionList} x */
	C_SectionList(x) {this.H_("C_SectionList","sectionListContinuation",x,this.G_SectionList);}
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
	/** @arg {Omit<Omit<Omit<D_Microformat, `url${string}`>, `ios${string}`>, `twitter${string}`>} x */
	D_Microformat_Other(x) {
		const cf="D_Microformat_Other";
		let {tags,familySafe,noindex,unlisted,thumbnail,title,description,schemaDotOrgType,androidPackage,appName,availableCountries,linkAlternates,siteName,ogType,...y}=this.s(cf,x); this.g(y);
		this.tz(tags,this.a_primitive_str);
		this.t(familySafe,x => {if(x!==true) debugger;});
		if(noindex!==false) debugger;
		if(unlisted!==false) debugger;
		this.R_Thumbnail(thumbnail);
		this.z([title,description,schemaDotOrgType,androidPackage,appName,siteName,ogType],this.a_primitive_str);
		this.tz(availableCountries,this.a_primitive_str);
		this.z(linkAlternates,this.B_HrefUrl);
	}
	/** @private @arg {B_HrefUrl} x */
	B_HrefUrl(x) {this.y("B_HrefUrl","hrefUrl",x,x => this.parser.parse_url("B_HrefUrl.url",x));}
	/** @private @arg {D_Microformat} x */
	D_Microformat(x) {
		const cf="D_Microformat";
		let {url,ios,twitter,other,...y}=this.unwrap_microformat(x); this.g(y);
		{
		}
		{
			let {appArguments,appStoreId,...y}=this.s(`${cf}.ios`,ios); this.g(y);
			this.z([appArguments,appStoreId],this.a_primitive_str);
		}
		{
			let {canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos,...y}=this.s(`${cf}.url`,url); this.g(y);
			this.z([canonical,applinksAndroid,applinksIos,applinksWeb,twitterAndroid,twitterIos],this.a_primitive_str);
		}
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD"; this.k(cf,x);
		if("channelMetadataRenderer" in x) return this.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.R_Playlist_MD(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar"; this.k(cf,x);
		if("settingsSidebarRenderer" in x) return this.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.R_PlaylistSidebar(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar";
		const {title,items,...y}=this.s(cf,x); this.g(y);
		this.z(items,this.R_CompactLink);
	}
	/** @private @arg {"D_CompactLink.Styled"} cf @arg {Extract<D_CompactLink,{style:any}>} x */
	D_CompactLink_Styled(cf,x) {
		switch(x.style) {
			default: debugger; break;
			case "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR": break;
			case "COMPACT_LINK_STYLE_TYPE_CREATION_MENU": {
				let u=this.D_Link_Omit(cf,x);
				const {icon,style: {},navigationEndpoint,...y}=this.s(`${cf}.icon`,u); this.g(y);
				this.E_Upload(navigationEndpoint);
			} break;
		}
	}
	/** @private @arg {DC_Empty_WCM} x */
	DC_Empty_WCM(x) {x; debugger;}
	/** @private @arg {D_CompactLink} x */
	D_CompactLink(x) {
		const cf="D_CompactLink"; this.k(cf,x);
		if("style" in x) {
			return this.D_CompactLink_Styled(`${cf}.Styled`,x);
		}
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
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow";
		const {header,content,trackingParams,onCloseCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_PdgBuyFlowHeader(header);
		this.z(content,x => {
			if(!x.superVodBuyFlowContentRenderer) debugger;
			return this.R_SuperVodBuyFlowContent(x);
		});
		this.trackingParams(cf,trackingParams);
		if("getSurveyCommand" in onCloseCommand) {
			this.C_GetSurvey(onCloseCommand);
		} else {
			debugger;
		}
	}
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar";
		const {items,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(items,this.G_PlaylistSidebarItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem"; this.k(cf,x);
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		this.do_codegen(cf,x);
	}
	/** @private @type {string[]} */
	known_target_id=[];
	/** @protected @arg {string} root @arg {D_TargetIdStr} x */
	targetId(root,x) {
		const cf="targetId";
		this.save_string(`[${root}.${cf}]`,x);
		this.parser.parse_target_id(x);
		if(this.str_starts_with_r(x,"comment-replies-item-")) return;
		if(this.str_starts_with_r(x,"shopping_panel_for_entry_point_")) {
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
		if(this.str_starts_with_r(x,"browse-feed")) return;
		switch(x) {
			case "clip-info-button": case "comments-section":
			case "engagement-panel-ads": case "engagement-panel-clip-create": case "engagement-panel-comments-section":
			case "engagement-panel-macro-markers-description-chapters": case "engagement-panel-searchable-transcript-search-panel":
			case "engagement-panel-searchable-transcript": case "engagement-panel-structured-description":
			case "engagement-panel-macro-markers-auto-chapters": case "feed_filter_chip_bar_second_chip":
			case "search-feed": case "search-page": case "sponsorships-button": case "watch-next-feed":
			case "browse-video-menu-button":
			case "create-clip-button-action-bar": break;
			default: x===""; console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}: return;`);
		}
	}
	/** @type {NonNullable<D_Button["icon"]>["iconType"][]} */
	expected_button_iconTypes=[
		"DELETE","NOTIFICATIONS_ACTIVE","NOTIFICATIONS_NONE","NOTIFICATIONS_OFF","SETTINGS",
	];
	/** @private @template {D_Button} T @arg {CF_D_Button} cf @arg {T} x */
	D_Button_Omit(cf,x) {
		const {accessibilityData,command,icon,isDisabled,serviceEndpoint,navigationEndpoint,tooltip,size,text,trackingParams,hint,targetId,...y}=this.s(cf,x);
		this.t(accessibilityData,this.D_Accessibility);
		this.t(command,this.GC_Button);
		this.t(icon,x => this.T_Icon_AnyOf("D_Icon_Button",x,this.expected_button_iconTypes));
		if(isDisabled!==void 0) this._primitive_of(isDisabled,"boolean");
		this.t(serviceEndpoint,this.D_Button_SE);
		this.t(navigationEndpoint,this.Button_navigationEndpoint);
		if(tooltip&&typeof tooltip!=="string") debugger;
		if(size) {
			switch(size) {
				default: debugger; break;
				case "SIZE_DEFAULT": break;
				case "SIZE_SMALL": break;
			}
		}
		this.t(text,this.G_Text);
		this.t_cf(cf,trackingParams,this.trackingParams);
		this.t(hint,this.R_Hint);
		this.t(targetId,x => {
			/** @private @type {D_Button_TargetId} */
			switch(x) {
				default: console.log("[new.case.%s]",cf,`\n\ncase ${JSON.stringify(x)}:`); debugger; break;
				case "clip-info-button":
				case "sponsorships-button":
				case "create-clip-button-action-bar":
			}
			this.targetId(cf,x);
		});
		return y;
	}
	/** @private @arg {D_Button} x */
	D_Button(x) {
		const cf="D_Button";
		if("style" in x&&"accessibility" in x) {
			const {accessibility,style,...y}=this.D_Button_Omit(`${cf}.Mixed`,x); this.g(y);
			if(accessibility) return this.D_Label(accessibility);
			this.t(style,x => this.save_string("[Button.style]",x));
			return;
		}
		if("style" in x) {
			const {style,...y}=this.D_Button_Omit(`${cf}.Styled`,x); this.g(y);
			this.t(style,x => this.save_string("[Button.style]",x));
			return;
		}
		if("accessibility" in x) {
			const {accessibility,...y}=this.D_Button_Omit(`${cf}.WithAccessibility`,x); this.g(y);
			if(accessibility) return this.D_Label(accessibility);
			return;
		}
		const {...y}=this.D_Button_Omit(cf,x); this.g(y);
	}
	/** @private @arg {D_PdgBuyFlowHeader} x */
	D_PdgBuyFlowHeader(x) {
		const cf="D_PdgBuyFlowHeader";
		const {text,helpButton,dismissButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(text);
		this.R_Button(helpButton);
		this.R_Button(dismissButton);
	}
	/** @private @arg {RG_Result} x */
	RG_Result(x) {
		const cf="RG_Result"; this.k(cf,x);
		if("tabRenderer" in x) return this.R_Tab(x);
		if("expandableTabRenderer" in x) return this.R_ExpandableTab(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>['endpoint']} x */
	D_Tab_subscriptionsEndpoint(x) {
		const cf="D_Tab_subscriptionsEndpoint"; this.k(cf,x);
		switch(x.commandMetadata.webCommandMetadata.rootVe) {
			default: this.do_codegen(cf,x); debugger; break;
			case 96368: break;
		}
		this.E_Browse(x);
	}
	/** @private @arg {D_Tab} x */
	D_Tab(x) {
		const cf="D_Tab"; this.k(cf,x);
		if("tabIdentifier" in x) {
			switch(x.tabIdentifier) {
				default: debugger; break;
				case "FEsubscriptions": {
					const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(`${cf}_WhatToWatch`,x); this.g(y);
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
		if("selected" in x) {
			return;
		}
		/** @type {`${cf}_${"R_MusicQueue"}`} */
		const new_cf=`${cf}_${"R_MusicQueue"}`;
		{
			const cf=new_cf;
			const {content,trackingParams,...y}=this.s(cf,x); this.g(y);
			this.R_MusicQueue(content);
			this.trackingParams(cf,trackingParams);
		}
	}
	/** @private @arg {R_MusicQueue} x */
	R_MusicQueue(x) {this.H_("R_MusicQueue","musicQueueRenderer",x,this.D_MusicQueue);}
	/** @private @arg {D_MusicQueue} x */
	D_MusicQueue(x) {
		const cf="D_MusicQueue";
		const {content,hack,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(content,this.R_PlaylistPanel);
		this.t(hack,x => {if(x!==true) debugger;});
	}
	/** @private @arg {R_RichGrid} x */
	R_RichGrid(x) {this.H_("R_RichGrid","richGridRenderer",x,this.D_RichGrid);}
	/** @private @template {D_RichGrid} T @arg {"D_RichGrid"} cf @arg {T} x */
	D_RichGrid_Omit(cf,x) {
		const {contents,header,trackingParams,targetId,reflowOptions,...y}=this.s(cf,x);
		this.z(contents,x => {
			if("richItemRenderer" in x) return this.R_RichItem(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			debugger;
		});
		this.R_FeedFilterChipBar(header);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="browse-feedFEwhat_to_watch") debugger;
		if(reflowOptions.minimumRowsOfVideosAtStart!==2) debugger;
		if(reflowOptions.minimumRowsOfVideosBetweenSections!==1) debugger;
		return y;
	}
	/** @private @arg {D_RichGrid} x */
	D_RichGrid(x) {
		const cf="D_RichGrid";
		if("masthead" in x) {
			const {masthead,...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
			this.R_AdSlot(masthead);
			return;
		}
		const {...y}=this.D_RichGrid_Omit(cf,x); this.g(y);
	}
	/** @private @arg {R_RichItem} x */
	R_RichItem(x) {this.H_("R_RichItem","richItemRenderer",x,this.D_RichItem);}
	/** @private @arg {D_RichItem} x */
	D_RichItem(x) {
		const cf="D_RichItem";
		if("rowIndex" in x) {
			const {content,trackingParams,rowIndex,colIndex,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.G_RichItemContent(content);
			this.trackingParams(cf,trackingParams);
			this.save_number("Item.pos",[rowIndex,colIndex]);
			return;
		}
		const {content,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_RichItemContent(content);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_RichItemContent} x */
	G_RichItemContent(x) {
		const cf="G_RichItemContent"; this.k(cf,x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("videoRenderer" in x) return this.R_Video(x);
		if("radioRenderer" in x) return this.R_Radio(x);
		if("feedNudgeRenderer" in x) return this.R_FeedNudge(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_FeedNudge} x */
	R_FeedNudge(x) {this.H_("R_FeedNudge","feedNudgeRenderer",x,this.D_FeedNudge);}
	/** @private @arg {D_VideoLike_richThumbnail} x */
	D_VideoLike_richThumbnail(x) {
		const cf="D_VideoLike_richThumbnail"; this.k(cf,x);
		if("movingThumbnailRenderer" in x) return this.R_MovingThumbnail(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_MovingThumbnail} x */
	R_MovingThumbnail(x) {this.H_("R_MovingThumbnail","movingThumbnailRenderer",x,this.D_MovingThumbnail);}
	/** @private @arg {D_MovingThumbnail} x */
	D_MovingThumbnail(x) {
		const cf="D_MovingThumbnail";
		const {movingThumbnailDetails,enableHoveredLogging,enableOverlay,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(movingThumbnailDetails,x => {
			if("logAsMovingThumbnail" in x) {
				const cf="D_MovingThumbnail_Thumbnails";
				const {logAsMovingThumbnail,...y}=this.s(cf,x);
				return this.R_Thumbnail(y);
			}
			this.R_Thumbnail(x);
		});
		if(enableHoveredLogging!==true) debugger;
		if(enableOverlay!==true) debugger;
	}
	/** @private @arg {R_Radio} x */
	R_Radio(x) {this.H_("R_Radio","radioRenderer",x,this.D_Radio);}
	/** @private @arg {D_Radio} x */
	D_Radio(x) {
		const cf="D_Radio";
		let {...y}=this.Omit_Menu_Radio(cf,x);
		const {videos,...z}=y; this.g(z);
		this.z(videos,this.R_ChildVideo);
	}
	/** @private @arg {R_ChildVideo} x */
	R_ChildVideo(x) {this.H_("R_Radio","childVideoRenderer",x,this.D_ChildVideo);}
	/** @private @arg {D_ChildVideo} x */
	D_ChildVideo(x) {
		const cf="D_ChildVideo";
		let y=this.D_ChildVideo_Omit(cf,x);
		this.g(y);
	}
	/** @private @template {R_ChildVideo_Omit} T @arg {"D_ChildVideo"} cf @arg {T} x */
	D_ChildVideo_Omit(cf,x) {
		let {title,navigationEndpoint,lengthText,videoId,...y}=this.s(cf,x);
		this.E_Watch(navigationEndpoint);
		return y;
	}
	/** @private @template {R_Omit_Menu_Radio&R_Omit_Compact_Player} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	R_Omit_Menu_Radio(cf,x) {
		let {navigationEndpoint,menu,...y}=this.Omit_Compact_Player(cf,x);
		this.R_Menu(menu);
		return y;
	}
	/** @private @template {D_CompactPlaylist|D_Radio|D_CompactRadio} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	Omit_Menu_Radio(cf,x) {
		if("adSlotMetadata" in x) {debugger; throw new Error();}
		let u=this.R_Omit_Menu_Radio(cf,x);
		let {playlistId,thumbnail,videoCountText,thumbnailText,longBylineText,videoCountShortText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.playlistId(playlistId);
		this.R_Thumbnail(thumbnail);
		this.G_Text(videoCountText);
		this.G_Text(thumbnailText);
		this.G_Text(longBylineText);
		this.G_Text(videoCountShortText);
		return y;
	}
	/** @private @template T @arg {T} v1 @arg {T} v2 */
	ceq(v1,v2) {if(v1!==v2) {debugger; return false;}; return true;}
	/** @private @returns {true} */
	true_() {return true;}
	/** @private @arg {CF_D_Video_Handle} cf @arg {D_Video} x */
	D_Video_Handle(cf,x) {
		let u=this.D_Video_Omit(cf,x);
		const {descriptionSnippet,publishedTimeText,lengthText,viewCountText,ownerBadges,badges,upcomingEventData,shortViewCountText,isWatched,topStandaloneBadge,richThumbnail,inlinePlaybackEndpoint,owner,buttons,...y}=u; this.g(y);
		this.t(descriptionSnippet,this.G_Text);
		this.t(publishedTimeText,this.G_Text);
		this.t(lengthText,this.G_Text);
		this.t(viewCountText,this.G_Text);
		this.tz(ownerBadges,this.RMD_Badge);
		this.tz(badges,this.RMD_Badge);
		this.t(upcomingEventData,x => {
			const {isReminderSet,startTime,upcomingEventText,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {D_Video} x */
	D_Video(x) {
		if("accessibility" in x) {console.log("video.accessibility",this.get_keys_of(x).join()); return this.D_Video_Handle("D_Video_Accessibility",x);}
		if("owner" in x) return this.D_Video_Handle("D_Video_Owner",x);
		if("videoId" in x) {
			if("topStandaloneBadge" in x) {
				return this.D_Video_Handle("D_Video_videoId_3",x);
			}
			if("descriptionSnippet" in x) {
				return this.D_Video_Handle("D_Video_videoId_2",x);
			}
			return this.D_Video_Handle("D_Video_videoId",x);
		}
		console.log("video.other",this.get_keys_of(x).join());
		this.D_Video_Handle("D_Video_Other",x);
	}
	/** @private @arg {R_ToggleButton} x */
	R_ToggleButton(x) {this.H_("R_ToggleButton","toggleButtonRenderer",x,this.D_ToggleButton);}
	/** @private @arg {D_ToggleButton} x */
	D_ToggleButton(x) {
		const cf="D_ToggleButton";
		const {style,isDisabled,isToggled,defaultIcon,defaultText,defaultServiceEndpoint,toggledText,toggledServiceEndpoint,accessibility,trackingParams,defaultTooltip,toggledTooltip,toggledStyle,accessibilityData,toggleButtonSupportedData,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.save_string("[D_ToggleButton.style]",style.styleType);
		this.ceq(isDisabled,false);
		this.ceq(isToggled,false);
		this.save_string("[D_ToggleButton.defaultIcon.type]",defaultIcon.iconType);
		if(!defaultServiceEndpoint.commandExecutorCommand) debugger;
		this.C_CommandExecutor(defaultServiceEndpoint);
		// this.C_RepeatChapter(defaultServiceEndpoint);
		// this.C_Executor(toggledServiceEndpoint);
		this.E_Like(toggledServiceEndpoint);
		this.trackingParams(cf,trackingParams);
		this.save_string("[D_ToggleButton.toggledStyle.type]",toggledStyle.styleType);
		this.D_Accessibility(accessibilityData);
		// this.D_Accessibility(toggledAccessibilityData);
		this.D_ToggleButtonIdData(toggleButtonSupportedData);
		if(targetId===void 0) {debugger; return;}
		this.save_string("[D_ToggleButton.targetId]",targetId);
	}
	/** @private @arg {D_ToggleButtonIdData} x */
	D_ToggleButtonIdData(x) {
		const {toggleButtonIdData: a,...y}=x; this.g(y);
		this.save_enum("TOGGLE_BUTTON_ID_TYPE",a.id);
	}
	/** @private @arg {C_CommandExecutor} x */
	C_CommandExecutor(x) {let [a,b]=this.TE_Endpoint_2("C_CommandExecutor","commandExecutorCommand",x); this.g(b); this.DC_CommandExecutor(a);}
	/** @private @arg {DC_CommandExecutor} x */
	DC_CommandExecutor(x) {
		this.T_Commands("DC_CommandExecutor",x,x => {
			const cf="DC_CommandExecutor.command"; this.k(cf,x);
			if("updateToggleButtonStateCommand" in x) return this.C_UpdateToggleButtonState(x);
			if("likeEndpoint" in x) return this.E_Like(x);
			this.do_codegen(cf,x);
			debugger;
		});
	}
	/** @private @arg {R_Video} x */
	R_Video(x) {this.H_("R_Video","videoRenderer",x,this.D_Video);}
	/** @private @arg {CF_D_Menu_Omit} cf @template {{thumbnailOverlays:D_Video['thumbnailOverlays']}} T @arg {T} x */
	D_Omit_ThumbnailOverlay(cf,x) {
		const {thumbnailOverlays,...y}=this.s(cf,x);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		return y;
	}
	/** @private @arg {R_ThumbnailOverlayLoadingPreview} x */
	R_ThumbnailOverlayLoadingPreview(x) {this.H_("R_ThumbnailOverlayLoadingPreview","thumbnailOverlayLoadingPreviewRenderer",x,this.D_ThumbnailOverlayLoadingPreview);}
	/** @protected @arg {D_ThumbnailOverlayLoadingPreview} x */
	D_ThumbnailOverlayLoadingPreview(x) {this.H_("D_ThumbnailOverlayLoadingPreview","text",x,this.G_Text);}
	/** @private @template {D_CompactVideo|D_Video} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	D_ThumbnailOverlay_Omit(cf,x) {
		const {trackingParams,menu,title,videoId,navigationEndpoint,thumbnail,longBylineText,shortBylineText,...y}=this.D_Omit_ThumbnailOverlay(cf,x);
		this.trackingParams(cf,trackingParams);
		this.R_Menu(menu);
		this.G_Text(title);
		this.videoId(videoId);
		this.E_Watch(navigationEndpoint);
		this.R_Thumbnail(thumbnail);
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
		const cf="D_Video_Owner";
		const {thumbnail,navigationEndpoint,accessibility,title,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Thumbnail(thumbnail);
		this.E_Browse(navigationEndpoint);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(title);
	}
	/** @private @arg {R_ChannelThumbnailWithLink} x */
	R_ChannelThumbnailWithLink(x) {this.H_("R_ChannelThumbnailWithLink","channelThumbnailWithLinkRenderer",x,this.D_ChannelThumbnailWithLink);}
	/** @private @template {D_ChannelThumbnailWithLink} T @arg {"D_ChannelThumbnailWithLink"} cf @arg {T} x */
	D_ChannelThumbnailWithLink_Omit(cf,x) {
		const {thumbnail,navigationEndpoint,accessibility,...y}=this.s(cf,x);
		this.R_Thumbnail(thumbnail);
		this.D_ChannelThumbnail_navigationEndpoint(navigationEndpoint);
		this.D_Accessibility(accessibility);
		return y;
	}
	/** @private @arg {D_ChannelThumbnailWithLink} x */
	D_ChannelThumbnailWithLink(x) {
		const cf="D_ChannelThumbnailWithLink";
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
		if("browseEndpoint" in x) return this.E_Browse(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_Video_inlinePlaybackEndpoint} x */
	D_Video_inlinePlaybackEndpoint(x) {
		const cf="D_Video_inlinePlaybackEndpoint"; this.k(cf,x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {C_Continuation} x */
	C_Continuation(x) {
		if(!x) {debugger; return;}
		const cf="C_Continuation";
		// x => this.y(cf,x,"webCommandMetadata",this.GM_Next)
		if(x.commandMetadata) {
			this.GM_Next(x.commandMetadata.webCommandMetadata);
		}
		this.DC_Continuation(x.continuationCommand);
		let [a,b,y]=this.TE_Endpoint_Opt_3(cf,"continuationCommand",x); this.g(y);
		a;
		b;
	}
	/** @private @arg {GM_Next} x */
	GM_Next(x) {
		const cf="GM_Next";
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/next") debugger;
	}
	/** @private @arg {DC_Continuation} x */
	DC_Continuation(x) {
		if("continuationCommand" in x) debugger;
		const cf="DC_Continuation";
		if("command" in x) {
			const {command: x1,...b}=this.DC_Continuation_Omit(cf,x); this.g(b);
			this.C_ShowReloadUi(x1);
			return;
		}
		this.g(this.DC_Continuation_Omit(cf,x));
	}
	/** @private @arg {D_Color} x */
	D_Color(x) {
		if(!this.eq_keys(this.get_keys_of(x),["red","green","blue"])) debugger;
		this.z(Object.values(x),x => this._primitive_of(x,"number"));
	}
	/** @private @arg {R_Thumbnail} x */
	R_Thumbnail(x) {
		const cf="R_Thumbnail"; this.k(cf,x);
		const {sampledThumbnailColor,accessibility,isOriginalAspectRatio,thumbnails: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(sampledThumbnailColor,x => this.D_Color(x));
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D_Accessibility);
		this.z(a,this.D_ThumbnailItem);
	}
	/** @private @arg {D_ThumbnailItem} x */
	D_ThumbnailItem(x) {
		const cf="D_ThumbnailItem";
		const {url,width,height,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(url);
		this.t(width,x => this._primitive_of(x,"number"));
		this.t(height,x => this._primitive_of(x,"number"));
	}
	/** @protected @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.E_Page(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this._primitive_of(navigationDoneMs,"number");
	}
	/** @private @arg {YTNavigateFinishDetail["response"]} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType"; this.k(cf,x);
		this.RC_ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.R_BrowsePage(x);
			case "watch": return this.R_WatchPage(x);
			case "channel": return this.R_ChannelPage(x);
			case "playlist": return this.R_PlaylistPage(x);
			case "settings": return this.R_SettingsPage(x);
			case "shorts": return this.R_ShortsPage(x);
			case "search": return this.R_SearchPage(x);
			default: break;
		}
		console.log("pt",x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			debugger;
			return null;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @protected @arg {Response} response @arg {G_ResponseTypes} x */
	ResponseTypes(response,x) {
		const cf="ResponseTypes"; this.k(cf,x);
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
			debugger;
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
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist";
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow";
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let pu=this.TA_OpenPopup("TA_OpenPopup:R_PdgBuyFlow",command);
		if("pdgBuyFlowRenderer" in pu) {
			this.R_PdgBuyFlow(pu);
		}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(cf,trackingParams);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent";
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z([description,disclaimerText],this.G_Text);
		this.R_Button(buyButton);
		this.trackingParams(cf,trackingParams);
		this.R_PdgCommentPreview(commentPreview);
		this.R_PdgColorSlider(colorSlider);
		console.log("defaultPriceTier",defaultPriceTier);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {DE_SuperThanksSelectedTier} x */
	DE_SuperThanksSelectedTier(x) {
		const cf="DE_SuperThanksSelectedTier";
		const {index,key,...y}=this.s(cf,x); this.g(y);//#destructure_off
		console.log("super_thanks_selected_tier.index",index);
		console.log("super_thanks_selected_tier.key",key);
	}
	/** @private @arg {D_PdgColorSlider} x */
	D_PdgColorSlider(x) {
		const cf="D_PdgColorSlider";
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(notches,this.NotchesItem);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
		this.G_Text(maxTierValue);
		this.G_Text(minTierValue);
	}
	/** @private @arg {D_NotchesItem} x */
	NotchesItem(x) {
		const cf="NotchesItem";
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(linearGradientCssStyle) {
			debugger;
		}
		if(knobColorArgb!==4280191205) debugger;
		this.E_YpcGetCart(purchaseCommand);
		this.G_Text(tierValue);
	}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {
		const cf="GM_YpcGetCart";
		const {apiUrl,sendPost,...y}=this.s(cf,x); this.g(y);//#destructure
		if(apiUrl!=="/youtubei/v1/ypc/get_cart") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {DE_YpcGetCart} x */
	D_YpcGetCart(x) {
		const cf="D_YpcGetCart";
		let sp=this.y(cf,"transactionParams",x,x => x);
		this.params(cf,"YpcGetCart.transactionParams",sp);
	}
	/** @private @arg {C_GetSurvey} x */
	C_GetSurvey(x) {
		const cf="C_GetSurvey";
		const {clickTrackingParams: a,commandMetadata: b,getSurveyCommand: c,...y}=this.s(cf,x); this.g(y);
		this.clickTrackingParams(cf,a);
		this.D_GetSurvey(c);
		const {apiUrl,sendPost,...y1}=this.unpack_T_WCM("MG_Survey_CMD",b); this.g(y1);
		if(apiUrl!=="/youtubei/v1/get_survey") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {D_GetSurvey} x */
	D_GetSurvey(x) {
		const cf="D_GetSurvey";
		const {action,endpoint: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		console.log("GetSurvey.action",action);
		this.R_PaidDigitalGoods(a);
	}
	codegen_group_id=1;
	/** @private @arg {string} cf @arg {{}} x */
	make_codegen_group(cf,x,collapsed=true) {
		let u_name=this.get_codegen_name(x);
		let gca=[`[codegen_group] [#%o] [%s] -> [%s]`,this.codegen_group_id++,cf,u_name];
		if(collapsed) {
			console.groupCollapsed(...gca);
		} else {
			console.group(...gca);
		}
		console.log("[starting codegen] %s",`[${cf}_${u_name}]`);
		this.codegen_new_typedef(`${cf}$${u_name}`,x);
		console.groupEnd();
	}
	/** @private @arg {string} cf @arg {object} x */
	do_codegen(cf,x) {
		let u_name=this.get_codegen_name(x);
		this.codegen_new_typedef(`${cf}$${u_name}`,x);
	}
	/** @private @arg {{[U in string]: unknown}} x */
	_decode_WCM(x) {
		if("rootVe" in x) {
			return `M_VE${x.rootVe}`;
		}
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
				if(x.includes("_")) {
					return x.split("_").map(x => this.uppercase_first(x)).join("");
				}
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
		if(ren_dec) {
			return ren_dec;
		}
		return this.codegen.get_auto_type_name(x);
	}
	/** @private @arg {RSU_M} x */
	RSU_M(x) {
		const cf="RSU_M";
		const {responseContext: {},continuation,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RD_TimedContinuation(continuation);
		this.z(actions,x => {
			if("updateViewershipAction" in x) return this.U_Viewership(x);
			if("updateToggleButtonTextAction" in x) return this.U_ToggleButtonText(x);
			if("updateDateTextAction" in x) return this.U_DateText(x);
			if("updateTitleAction" in x) return this.U_Title(x);
			if("updateDescriptionAction" in x) return this.UA_Description(x);
			console.log(x);
		});
	}
	/** @private @arg {AU_Description} x */
	UA_Description(x) {
		const cf="UA_Description"; this.k(cf,x);
		let x1=x.updateDescriptionAction;
		this.save_keys(`[UA_DescriptionData]`,x1);
		this.G_Text(x1.description);
	}
	/** @private @arg {AU_Title} x */
	U_Title(x) {
		const cf="UA_Title"; this.k(cf,x);
		let x1=x.updateTitleAction;
		this.save_keys(`[UA_TitleData]`,x1);
		this.G_Text(x1.title);
	}
	/** @private @arg {AU_DateText} x */
	U_DateText(x) {
		const cf="UA_DateText"; this.k(cf,x);
		let x1=x.updateDateTextAction;
		this.save_keys(`[UA_DateTextData]`,x1);
		this.G_Text(x1.dateText);
	}
	/** @private @arg {U_ToggleButtonText} x */
	U_ToggleButtonText(x) {
		const cf="UA_ToggleButtonText"; this.k(cf,x);
		let x1=x.updateToggleButtonTextAction; x1;
		this.save_keys(`[UA_ToggleButtonTextData]`,x1);
		if(x1.buttonId!=="TOGGLE_BUTTON_ID_TYPE_LIKE") debugger;
		this.G_Text(x1.defaultText);
		this.G_Text(x1.toggledText);
	}
	/** @private @arg {AU_Viewership} x */
	U_Viewership(x) {
		const cf="UA_Viewership"; this.k(cf,x);
		let x1=x.updateViewershipAction;
		this.save_keys(`[UA_ViewershipData]`,x1);
		this.R_VideoViewCount(x1.viewCount);
	}
	/** @private @arg {RS_Search} x */
	RS_Search(x) {
		const cf="RS_Search";
		const {responseContext: {},estimatedResults,contents,trackingParams,topbar,refinements,onResponseReceivedCommands,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(estimatedResults);
		this.R_TwoColumnSearchResults(contents);
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(topbar);
		this.z(refinements,this.a_primitive_str);
		this.z(onResponseReceivedCommands,x => {
			if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
			debugger;
		});
		this.targetId(cf,targetId);
	}
	/** @private @arg {C_AdsControlFlowOpportunityReceived} x */
	C_AdsControlFlowOpportunityReceived(x) {
		const cf="C_AdsControlFlowOpportunityReceived";
		const {clickTrackingParams,adsControlFlowOpportunityReceivedCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_AdsControlFlowOpportunityReceived(adsControlFlowOpportunityReceivedCommand);
	}
	/** @private @arg {RSG_SearchSuggestions} x */
	RSG_SearchSuggestions(x) {
		const cf="RSG_SearchSuggestions";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_PaidDigitalGoods} x */
	R_PaidDigitalGoods(x) {this.H_("R_PaidDigitalGoods","paidDigitalGoods",x,this.B_Hack);}
	/** @private @arg {B_Hack} x */
	B_Hack(x) {
		const cf="B_Hack";
		const {hack,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(hack!==true) debugger;
	}
	/** @private @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player";
		const {responseContext: {},playabilityStatus,...y}=this.s(cf,x);
		console.log("[RS_Player.next_key]",this.get_keys_of(y)[0]);
		// this.tz(x.annotations,this.R_PlayerAnnotationsExpanded);
	}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("R_PlayerAnnotationsExpanded","playerAnnotationsExpandedRenderer",x,this.D_PlayerAnnotationsExpanded);}
	static {
		(new this({value: null})).R_PlayerAnnotationsExpanded;
	}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded";
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
		this.a_primitive_bool(allowSwipeDismiss);
	}
	/** @private @arg {UUIDString} x */
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
		const cf="D_FeaturedChannel";
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z([startTimeMs,endTimeMs],this.a_primitive_str);
		this.R_Thumbnail(watermark);
		this.trackingParams(cf,trackingParams);
		this.E_Browse(navigationEndpoint);
		this.a_primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
	}
	/** @private @arg {R_SubscribeButton} x */
	R_SubscribeButton(x) {this.H_("R_SubscribeButton","subscribeButtonRenderer",x,this.D_SubscribeButton);}
	/** @arg {D_STR_CF} cf @arg {string} x */
	codegen_str(cf,x) {
		if(x.startsWith("UC")) {
			console.log(`-- [string.${cf}] --\n\ntype D_${cf}=UC\${string}`);
		}
		cf;
		x;
	}
	/** @private @arg {`UC${string}`} x */
	D_ChannelId(x) {
		const cf="D_ChannelId";
		if(this.str_starts_with("UC",x)) {
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
		if("entityKey" in x) {
			const {buttonText,entityKey,...y}=this.s(`${cf}.subscribed`,x); this.g(y);
			this.G_Text(buttonText);
			console.log("[subscribed.entityKey]",entityKey);
			return;
		}
		if("buttonText" in x) {
			const {buttonText,...y}=this.s(`${cf}.subscribed`,x); this.g(y);
			this.G_Text(buttonText);
			return;
		}
		this.g(x);
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
		const cf="D_SubscribeButton";
		if("serviceEndpoints" in x) {
			const {serviceEndpoints,...y}=this.D_SubButton_Omit_Button(cf,x);
			this.z(serviceEndpoints,this.E_Subscribe);
			this.g(y);
			return;
		}
		if("targetId" in x) {
			const {targetId,notificationPreferenceButton,onSubscribeEndpoints,onUnsubscribeEndpoints,...y}=this.D_SubButton_Omit_Button(cf,x); this.g(y);
			this.ceq(targetId,"watch-subscribe");
			this.t(notificationPreferenceButton,this.R_SubscriptionNotificationToggleButton);
			return;
		}
		this.do_codegen(cf,x);
	}
	/** @private @arg {DE_Subscribe} x */
	DE_Subscribe(x) {
		const cf="DE_Subscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);
		this.z(x.channelIds,this.D_ChannelId);
		this.params(cf,"subscribe.params",params);
	}
	/** @private @arg {M_Subscribe} x */
	M_Subscribe(x) {x;}
	/** @private @arg {RSL_Like} x */
	RSL_Like(x) {
		const cf="RSL_Like";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			debugger;
			return null;
		});
	}
	/** @private @arg {RSL_Dislike} x */
	RSL_Dislike(x) {
		const cf="RSL_Dislike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			debugger;
			return null;
		});
	}
	/** @private @arg {RSL_RemoveLike} x */
	RSL_RemoveLike(x) {
		const cf="RSL_RemoveLike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			debugger;
			return null;
		}));
	}
	/** @private @arg {RS_ReelWatchSequence} x */
	RS_ReelWatchSequence(x) {
		const cf="RS_ReelWatchSequence";
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(entries,x => this.T_Command_TP(x,this.E_ReelWatch));
		this.trackingParams(cf,trackingParams);
		this.t(continuationEndpoint,this.C_Continuation);
	}
	/** @private @arg {M_VE37414} x */
	M_VE37414(x) {
		const cf="M_VE37414";
		const {webCommandMetadata: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.GM_VE37414_WC(a);
	}
	/** @private @arg {DE_ReelWatch} x */
	D_ReelWatch(x) {
		const cf="D_ReelWatch";
		if("videoId" in x) {
			debugger;
			const {videoId}=this.s(cf,x);
			this.t(videoId,this.videoId);
			return;
		}
		if("inputType" in x) {
			debugger;
			const {inputType}=this.s(cf,x);
			this.t(inputType,x => {if(x!=="REEL_WATCH_INPUT_TYPE_SEEDLESS") debugger;});
			return;
		}
		if("sequenceParams" in x) {
			debugger;
			const {sequenceProvider,sequenceParams}=this.s(cf,x);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(sequenceParams,x => this.params(cf,"reel.sequence_params",x));
			return;
		}
		if("thumbnail" in x) {
			debugger;
			return;
		}
		const {playerParams,overlay,params,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.params(cf,"reel.player_params",playerParams);
		this.R_ReelPlayerOverlay(overlay);
		this.params(cf,"reel.params",params);
	}
	/** @private @arg {RS_GetLiveChat} x */
	RS_GetLiveChat(x) {
		const cf="RS_GetLiveChat";
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RC_LiveChat(a1);
		this.t_cf(cf,a2,this.trackingParams);
	}
	/** @private @arg {R_MP_MenuNotificationSection_Item} x */
	R_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item";
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_NotificationMenu_Popup_SectionItem} x */
	D_NotificationMenu_Popup_SectionItem(x) {
		const cf="D_NotificationMenu_Popup_SectionItem"; this.k(cf,x);
		if("multiPageMenuNotificationSectionRenderer" in x) return this.R_MP_MenuNotificationSection(x);
		this.do_codegen(cf,x);
		return null;
	}
	/** @private @arg {R_MP_MenuNotificationSection} x */
	R_MP_MenuNotificationSection(x) {this.H_("D_NotificationMenu_PopupItem","multiPageMenuNotificationSectionRenderer",x,this.D_MP_MenuNotificationSection);}
	/** @private @arg {D_MP_MenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection";
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(items,this.R_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {D_NotificationMenu_PopupItem} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem";
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_NotificationMenu_Popup} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup";
		const {popupType: a,popup: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(a!=="DROPDOWN") {this.do_codegen(cf,x); return null;}
		return b;
	}
	/** @private @arg {RSG_NotificationMenu_Action} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action"; this.k(cf,x);
		if(x.openPopupAction) return this.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		this.do_codegen(cf,x);
		return null;
	}
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let [ar]=this.z(actions,this.RSG_NotificationMenu_Action);
		let [u2]=this.z(ar,this.D_NotificationMenu_Popup);
		let [u3]=this.z(u2,x => this.TR_MultiPageMenu("D_NotificationMenu_PopupItemMenu",x));
		this.z(u3,this.D_NotificationMenu_PopupItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("SimpleMenuHeader","simpleMenuHeaderRenderer",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader";
		const {title,buttons,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next";
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(contents,this.G_NextContents);
		this.t(currentVideoEndpoint,this.E_Watch);
		this.trackingParams(cf,trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.GE_ResponseReceived(cf,a));
		this.tz(engagementPanels,this.R_EngagementPanelSectionList);
		this.t(topbar,this.R_DesktopTopbar);
		this.tz(pageVisualEffects,this.R_CinematicContainer);
		this.t(frameworkUpdates,this.A_FrameworkUpdates);
		this.t(videoReporting,this.R_ReportFormModal);
		this.t(queueContextParams,a => this.params(cf,"next.queue_context_params",a));
		this.t(continuationContents,this.RC_PlaylistPanel);
	}
	/** @private @arg {G_NextContents} x */
	G_NextContents(x) {
		const cf="G_NextContents"; this.k(cf,x);
		if("twoColumnWatchNextResults" in x) return this.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		this.do_codegen(cf,x);
		x===0;
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("R_SingleColumnMusicWatchNextResults","singleColumnMusicWatchNextResultsRenderer",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("R_Tabbed","tabbedRenderer",x,this.R_WatchNextTabbedResults);}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("R_WatchNextTabbedResults","watchNextTabbedResultsRenderer",x,this.D_WatchNextTabbedResults);}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults";
		const {tabs,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(tabs,this.R_Tab);
	}
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("RC_PlaylistPanel","playlistPanelContinuation",x,this.DC_PlaylistPanel);}
	/** @private @arg {R_VoiceSearchDialog} x */
	R_VoiceSearchDialog(x) {this.H_("R_VoiceSearchDialog","voiceSearchDialogRenderer",x,this.D_VoiceSearchDialog);}
	/** @private @arg {R_CommentsHeader} x */
	R_CommentsHeader(x) {this.H_("R_VoiceSearchDialog","commentsHeaderRenderer",x,this.D_CommentsHeader);}
	/** @private @arg {D_CommentsHeader} x */
	D_CommentsHeader(x) {
		const cf="D_CommentsHeader";
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {R_CommentSimplebox} x */
	R_CommentSimplebox(x) {this.H_("R_CommentSimplebox","commentSimpleboxRenderer",x,this.D_CommentSimplebox);}
	/** @private @arg {R_SortFilterSubMenu} x */
	R_SortFilterSubMenu(x) {this.H_("R_SortFilterSubMenu","sortFilterSubMenuRenderer",x,this.D_SortFilterSubMenu);}
	/** @private @arg {D_VoiceSearchDialog} x */
	D_VoiceSearchDialog(x) {
		const cf="D_VoiceSearchDialog";
		const {trackingParams,exitButton,...y}=this.s(cf,x);
		let u=Object.entries(y);
		for(let x of u) {
			let c=x[1];
			if("runs" in c) {
				this.G_Text(c);
				continue;
			}
			debugger;
		}

	}
	/** @private @arg {C_ScrollToEngagementPanel} x */
	C_ScrollToEngagementPanel(x) {
		const cf="C_ScrollToEngagementPanel";
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @private @arg {DC_ScrollToEngagementPanel} x */
	DC_ScrollToEngagementPanel(x) {
		const cf="DC_ScrollToEngagementPanel";
		const {targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.targetId(cf,targetId);
	}
	//#region pause
	//#endregion
	/** @private @arg {CF_T_SE_Signal} cf @template {{webCommandMetadata:any}} T @template U @arg {T_SE_Signal<T,U>} x @returns {[T,U]} */
	T_SE_Signal(cf,x) {
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		/** @type {`T_SE_Signal:${CF_T_SE_Signal}`} */
		this.clickTrackingParams(`T_SE_Signal:${cf}`,clickTrackingParams);
		return [commandMetadata,signalServiceEndpoint];
	}
	/** @private @template U @template {T_Signal<U>} T @arg {T} x @arg {(t:U)=>void} f @returns {Omit<T,"signal">} */
	Signal_Omit(x,f) {
		const cf="Signal_Omit";
		const {signal,...y}=this.s(cf,x); f(signal);
		return y;
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>['openPopupAction']['popup']} x */
	S_Client_HandlePopup(x) {
		const cf="S_Client_HandlePopup"; this.k(cf,x);
		if("voiceSearchDialogRenderer" in x) return this.R_VoiceSearchDialog(x);
		if("notificationActionRenderer" in x) return this.R_NotificationAction(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>['openPopupAction']} x */
	S_Client_OpenPopupAction(x) {
		const cf="S_VoiceSearchPopup_Dialog";
		const {popup,popupType,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.S_Client_HandlePopup(popup);
		switch(popupType) {
			default: debugger; break;
			case "TOAST": case "TOP_ALIGNED_DIALOG":
		}
	}
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>} x */
	S_Client_Popup(x) {
		const cf="S_Client_Popup";
		const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.S_Client_OpenPopupAction(openPopupAction);
	}
	/** @private @arg {G_ClientSignal} x */
	G_ClientSignal(x) {
		const cf="G_ClientSignal";
		let {actions,...y}=this.Signal_Omit(x,x => {
			this.save_string(`[${cf}.signal]`,x);
			if(x!=="CLIENT_SIGNAL") debugger;
		}); this.g(y);
		this.z(actions,x => {
			/** @type {G_ClientSignal_Item} */
			if("openPopupAction" in x) return this.S_Client_Popup(x);
			if("showEngagementPanelEndpoint" in x) return this.E_ShowEngagementPanel(x);
			if("sendFeedbackAction" in x) return this.A_SendFeedback(x);
			if("signalAction" in x) return this.A_Signal(x);
			if("addToPlaylistCommand" in x) return this.C_AddToPlaylist(x);
			debugger;
		});
	}
	/** @private @arg {DE_ShowEngagementPanel} x */
	D_ShowEngagementPanel(x) {
		const cf="D_ShowEngagementPanel";
		const {panelIdentifier,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {A_Signal} x */
	A_Signal(x) {let [a,y]=this.TE_Endpoint_2("A_Signal","signalAction",x); this.g(y); this.AD_Signal(a);}
	/** @private @arg {AD_Signal} x */
	AD_Signal(x) {
		const cf="AD_Signal";
		const {signal,...y}=this.s(cf,x); this.g(y);/*#destructure*/
		switch(signal) {
			default: debugger; break;
			case "ENABLE_CHROME_NOTIFICATIONS": case "HELP": case "HISTORY_BACK": case "HISTORY_FORWARD": case "SKIP_NAVIGATION": case "TOGGLE_TRANSCRIPT_TIMESTAMPS":
		}
	}
	/** @template {{}} T @arg {T} x @arg {keyof T} k */
	T_EP_In(x,k) {
		return x[k];
	}
	/** @private @arg {C_AddToPlaylist} x */
	C_AddToPlaylist(x) {
		let [a]=this.TE_Endpoint_2("C_AddToPlaylist","addToPlaylistCommand",x);
		this.DC_AddToPlaylist(a);
	}
	/** @private @arg {DC_AddToPlaylist} x */
	DC_AddToPlaylist(x) {
		const cf="DC_AddToPlaylist";
		const {listType,onCreateListCommand,openListPanel,openMiniplayer,videoId,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure*/
		console.log(`${cf}.listType`,listType);
		this.SE_CreatePlaylist(onCreateListCommand);
		this.z([openListPanel,openMiniplayer],this.a_primitive_bool);
		this.videoId(videoId);
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {SE_CreatePlaylist} x */
	SE_CreatePlaylist(x) {
		const cf="ES_CreatePlaylist"; let [u,b]=this.TE_Endpoint_3(cf,"createPlaylistServiceEndpoint",x);
		this.DS_CreatePlaylist(b);
		{
			let x=u.webCommandMetadata;
			const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure*/
			if(sendPost!==true) debugger;
			if(apiUrl!=="/youtubei/v1/playlist/create") debugger;
		}
	}
	/** @private @arg {DS_CreatePlaylist} x */
	DS_CreatePlaylist(x) {
		const cf="DS_CreatePlaylist";
		const {params,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure*/
		this.t(params,x => this.params(cf,"service$create_playlist",x));
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {CF_GE_ResponseReceived} cf @arg {GE_ResponseReceived} x */
	GE_ResponseReceived(cf,x) {
		this.save_keys(`[${cf}.response_endpoint]`,x);
		if("signalServiceEndpoint" in x) {
			let [a,gc]=this.T_SE_Signal(`${cf}.SE_Signal`,x);
			if(!this.eq_keys(this.get_keys_of(a),["webCommandMetadata"])) debugger;
			this.M_SendPost(a);
			this.G_ClientSignal(gc);
		} else if("adsControlFlowOpportunityReceivedCommand" in x) {
			this.C_AdsControlFlowOpportunityReceived(x);
		} else if("changeKeyedMarkersVisibilityCommand" in x) {
			const {clickTrackingParams,changeKeyedMarkersVisibilityCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_ChangeKeyedMarkersVisibility(changeKeyedMarkersVisibilityCommand);
		} else if("loadMarkersCommand" in x) {
			const {clickTrackingParams,loadMarkersCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.clickTrackingParams(cf,clickTrackingParams);
			this.DC_LoadMarkers(loadMarkersCommand);
		} else if("reloadContinuationItemsCommand" in x) {
			this.C_ReloadContinuationItems(x);
		} else if("appendContinuationItemsAction" in x) {
			const {clickTrackingParams,appendContinuationItemsAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.clickTrackingParams(cf,clickTrackingParams);
			this.G_AppendContinuationItems(appendContinuationItemsAction);
		} else {
			debugger;
		}
	}
	/** @private @arg {AD_AppendContinuationItems} x */
	G_AppendContinuationItems(x) {
		const cf="G_AppendContinuationItems"; this.k(cf,x); this.targetId(cf,x.targetId);
		if(this.starts_with_targetId(x,"comment-replies-item-")) return this.CommentRepliesItem(x);
		this.save_string("[ContinuationItem.targetId]",x.targetId);
		switch(x.targetId) {
			case "browse-feedFEwhat_to_watch": this.A_BrowseFeed$(x); break;
			case "comments-section": this.A_CommentsSectionContinuation$(x); break;
			case "watch-next-feed": this.A_WatchNext(x); break;
			default: x===0; debugger;
		}
	}
	/** @private @arg {C_ReloadContinuationItems} x */
	C_ReloadContinuationItems(x) {
		const cf="C_ReloadContinuationItems";
		const {clickTrackingParams,reloadContinuationItemsCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ReloadContinuationItems(reloadContinuationItemsCommand);
	}
	/** @private @template {DC_ReloadContinuationItems} T @arg {"DC_ReloadContinuationItems"} cf @arg {T} x */
	DC_ReloadContinuationItems_Omit(cf,x) {
		const {slot,...y}=this.s(cf,x);
		this.save_enum("RELOAD_CONTINUATION_SLOT",x.slot);
		return y;
	}
	/** @private @arg {DC_ReloadContinuationItems} x */
	DC_ReloadContinuationItems(x) {
		const cf="DC_ReloadContinuationItems";
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.save_string("[Body.targetId]",targetId);
				this.z(continuationItems,a => {
					this.save_keys("[continuationItem]",a);
				});
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
		const cf="DC_LoadMarkers";
		const {entityKeys,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(entityKeys,this.a_primitive_str);
	}
	/** @private @arg {DC_ChangeKeyedMarkersVisibility} x */
	DC_ChangeKeyedMarkersVisibility(x) {
		const cf="DC_ChangeKeyedMarkersVisibility";
		const {isVisible,key,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @private @arg {D_PlayerOverlay} x */
	D_PlayerOverlay(x) {
		const cf="D_PlayerOverlay"; this.k(cf,x);
		if("browserMediaSession" in x) {
			return this.A_BrowserMediaSession(x);
		}
		const {endScreen,autoplay,shareButton,addToMenu,autonavToggle,videoDetails,...y}=this.s(cf,x);
		this.R_WatchNextEndScreen(endScreen);
		this.R_PlayerOverlayAutoplay(autoplay);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		this.t(autonavToggle,this.R_AutoplaySwitchButton);
		this.R_WatchNextEndScreen(endScreen);
		// this.t(autoplay,this.R_PlayerOverlayAutoplay);
		this.R_Button(shareButton);
		this.R_Menu(addToMenu);
		this.R_PlayerOverlayVideoDetails(videoDetails);
		if("decoratedPlayerBarRenderer" in y) {
			const {decoratedPlayerBarRenderer,...y1}=y; this.g(y1);
			return this.R_DecoratedPlayerBar(decoratedPlayerBarRenderer);
		}
		this.g(y);
	}
	/** @private @arg {R_DecoratedPlayerBar} x */
	R_DecoratedPlayerBar(x) {this.H_("R_DecoratedPlayerBar","decoratedPlayerBarRenderer",x,this.D_DecoratedPlayerBar);}
	/** @private @arg {RA_NotificationAction} x */
	R_NotificationAction(x) {this.H_("R_NotificationAction","notificationActionRenderer",x,this.D_NotificationAction);}
	/** @private @arg {AD_Notification} x */
	D_NotificationAction(x) {
		const cf="D_NotificationAction";
		const {responseText,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(responseText);
		this.t(actionButton,this.R_Button);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_DecoratedPlayerBar} x */
	D_DecoratedPlayerBar(x) {
		const cf="D_DecoratedPlayerBar"; this.k(cf,x);
		const {playerBar,...y}=this.s(cf,x);
		if("playerBarActionButton" in y) {
			const {playerBarActionButton,...y1}=y; this.g(y1);
			return this.R_Button(playerBarActionButton);
		}
		this.g(y);
	}
	/** @private @arg {R_AutoplaySwitchButton} x */
	R_AutoplaySwitchButton(x) {this.H_("R_AutoplaySwitchButton","autoplaySwitchButtonRenderer",x,this.D_AutoplaySwitchButton);}
	/** @private @arg {D_AutoplaySwitchButton} x */
	D_AutoplaySwitchButton(x) {
		const cf="D_AutoplaySwitchButton";
		const {onEnabledCommand,onDisabledCommand,enabledAccessibilityData,disabledAccessibilityData,trackingParams,enabled,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z([onEnabledCommand,onDisabledCommand],(x) => {
			const cf="E_SetSettingAutonavForDesktop";
			const {clickTrackingParams,commandMetadata,setSettingEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @template {object} T @template U @arg {CF_T_WCM} cf @arg {{webCommandMetadata:T;}} x @arg {(this:this,x:T)=>U} f*/
	T_WCM(cf,x,f) {this.y(`T_WCM:${cf}`,"webCommandMetadata",x,f);}
	/** @private @arg {M_SetSetting} x */
	M_SetSetting(x) {this.T_WCM("M_SetSetting",x,this.GM_SetSetting);}
	/** @private @arg {GM_SetSetting} x */
	GM_SetSetting({sendPost,apiUrl,...y}) {if(apiUrl!=="/youtubei/v1/account/set_setting") debugger; this.g(y);}
	/** @private @arg {T_DE_SettingItem<"407",boolean,"AUTONAV_FOR_DESKTOP">} x */
	T_DE_SettingItem_AutonavForDesktop(x) {
		if("boolValue" in x) {
			const cf="T_DE_SettingItem.407";
			const {settingItemId,boolValue,settingItemIdForClient,...y}=this.s(cf,x); this.g(y);/*#destructure*/
			if(settingItemId!=="407") debugger;
			this.a_primitive_bool(boolValue);
			if(settingItemIdForClient!=="AUTONAV_FOR_DESKTOP") debugger;
			return;
		}
		debugger;
	}
	/** @private @arg {R_PlayerOverlayAutoplay} x */
	R_PlayerOverlayAutoplay(x) {this.H_("R_PlayerOverlayAutoplay","playerOverlayAutoplayRenderer",x,this.D_PlayerOverlayAutoplay);}
	/** @private @arg {R_WatchNextEndScreen} x */
	R_WatchNextEndScreen(x) {this.H_("R_WatchNextEndScreen","watchNextEndScreenRenderer",x,this.D_WatchNextEndScreen);}
	/** @private @arg {D_WatchNextEndScreen} x */
	D_WatchNextEndScreen(x) {
		const cf="D_WatchNextEndScreen";
		const {results,title,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(results,this.G_WatchNextEndScreenItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_WatchNextEndScreenItem} x */
	G_WatchNextEndScreenItem(x) {
		const cf="G_WatchNextEndScreenItem"; this.k(cf,x);
		if("endScreenPlaylistRenderer" in x) return this.R_EndScreenPlaylist(x);
		if("endScreenVideoRenderer" in x) return this.R_EndScreenVideo(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {A_BrowserMediaSession} x */
	A_BrowserMediaSession(x) {
		const cf="A_BrowserMediaSession";
		const {actions,browserMediaSession,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(actions,(x => {
			if(!x.likeButtonRenderer) debugger;
			this.R_LikeButton(x);
		}));
		this.R_BrowserMediaSession(browserMediaSession);
	}
	/** @private @arg {R_BrowserMediaSession} x */
	R_BrowserMediaSession(x) {this.H_("R_BrowserMediaSession","browserMediaSessionRenderer",x,this.AD_BrowserMediaSession);}
	/** @private @arg {string} x */
	a_primitive_str(x) {this._primitive_of(x,"string");}
	/** @private @arg {D_Menu} x */
	D_Menu(x) {
		const cf="D_Menu";
		const {trackingParams,accessibility,items,targetId,loggingDirectives,flexibleItems,topLevelButtons,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.t(accessibility,this.D_Accessibility);
		this.tz(items,this.G_MenuItem);
		/** @private @type {D_Menu_TargetId} */
		this.t(targetId,a => this.targetId(cf,a));
		this.t(loggingDirectives,this.D_LoggingDirectives);
		this.tz(flexibleItems,this.R_MenuFlexibleItem);
		this.tz(topLevelButtons,x => {
			const cf="D_Menu_Button"; this.k(cf,x);
			if("buttonRenderer" in x) return this.R_Button(x);
			if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
			this.do_codegen(cf,x);
		});
	}
	/** @private @arg {R_SegmentedLikeDislikeButton} x */
	R_SegmentedLikeDislikeButton(x) {this.H_("R_SegmentedLikeDislikeButton","segmentedLikeDislikeButtonRenderer",x,this.D_SegmentedLikeDislikeButton);}
	/** @private @arg {D_SegmentedLikeDislikeButton} x */
	D_SegmentedLikeDislikeButton(x) {
		const cf="D_SegmentedLikeDislikeButton";
		if("likeButton" in x) {
			const {likeButton,dislikeButton,...y}=this.s(cf,x); this.g(y);
			this.R_ToggleButton(likeButton);
			this.R_ToggleButton(dislikeButton);
			return;
		}
		const {style,size,isDisabled,text,serviceEndpoint,icon,tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);
		this.save_string(`[${cf}.style]`,style);
		this.save_string(`[${cf}.size]`,size);
		if(isDisabled!==false) debugger;
	}
	/** @private @arg {R_MenuFlexibleItem} x */
	R_MenuFlexibleItem(x) {this.H_("R_MenuFlexibleItem","menuFlexibleItemRenderer",x,this.D_MenuFlexibleItem);}
	/** @private @arg {DT_MenuFlexibleItem} x */
	D_MenuFlexibleItem(x) {
		const cf="D_MenuFlexibleItem";
		const {menuItem,topLevelButton,...y}=this.s(cf,x); this.g(y);
		this.R_MenuServiceItem(menuItem);
		this.R_Button(topLevelButton);
	}
	/** @private @arg {G_MenuItem} x */
	G_MenuItem(x) {
		const cf="G_MenuItem"; this.k(cf,x);
		if("toggleMenuServiceItemRenderer" in x) return this.R_ToggleMenuServiceItem(x);
		if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		this.do_codegen("MenuItems",x);
		this.G_Text(x);
	}
	/** @private @template T @arg {T_SE_Signal<M_SendPost,T>} x @returns {["signalServiceEndpoint",T]} */
	TE_SignalService_I_0(x) {
		const cf="TE_SignalService_I_0";
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_SendPost(commandMetadata);
		return ["signalServiceEndpoint",signalServiceEndpoint];
	}
	/** @private @arg {G_SE_MenuService} x */
	RD_MenuServiceItem_serviceEndpoint(x) {
		const cf="RD_MenuServiceItem_serviceEndpoint"; this.k(cf,x);
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		if("signalServiceEndpoint" in x) {
			x;
			return this.TE_SignalService_I_0(x);
		}
		if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("shareEntityServiceEndpoint" in x) return this.ES_ShareEntity(x);
		if("getReportFormEndpoint" in x) return this.E_GetReportForm(x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("" in x) return;
		this.do_codegen(cf,x);
		x==="";
		this.do_codegen(cf,x);
	}
	/** @private @arg {M_FlagGetForm} x */
	M_FlagGetForm(x) {
		const {webCommandMetadata: {sendPost: s,apiUrl: u,...y1},...y2}=x; this.z([y1,y2],this.g);;
		if(s!==true) debugger;
		if(u!=="/youtubei/v1/flag/get_form") debugger;
	}
	codegen_all_service_menu_icons() {
		console.log(this.service_menu_icons.join());
	}
	/** @arg {string} x */
	new_service_icon(x) {
		if(this.service_menu_icons.includes(x)) return;
		this.service_menu_icons.push(x);
		this.codegen_all_service_menu_icons();
	}
	/** @private @type {string[]} */
	service_menu_icons=[];
	/** @private @arg {"RD_MenuServiceItem"} cf @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem_Omit(cf,x) {
		const {text,icon,serviceEndpoint,trackingParams,...y}=x;
		this.G_Text(text);
		switch(icon.iconType) {
			default: this.new_service_icon(icon.iconType); break;
			case "NOT_INTERESTED":
			case "ADD_TO_QUEUE_TAIL": break;
		}
		let res=this.RD_MenuServiceItem_serviceEndpoint(serviceEndpoint);
		this.t(res,u => {
			switch(u[0]) {
				case "signalServiceEndpoint": return this.G_ClientSignal(u[1]);
				default: debugger; break;
			}
		});
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @type {RD_MenuServiceIconType_1} */
	/** @private @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem(x) {
		const cf="RD_MenuServiceItem";
		const u=this.RD_MenuServiceItem_Omit(cf,x);
		const {hasSeparator,isDisabled,...y}=u; this.g(y);
		this.t(hasSeparator,x => this.ceq(x,true));
		this.t(isDisabled,x => this.ceq(x,false));
	}
	/** @private @arg {R_MenuServiceItem} x */
	R_MenuServiceItem(x) {this.H_("R_MenuServiceItem","menuServiceItemRenderer",x,this.RD_MenuServiceItem);}
	/** @protected @arg {M_AddToPlaylistService} x */
	M_AddToPlaylistService(x) {this.T_WCM("M_AddToPlaylistService",x,this.GM_AddToPlaylistService);}
	/** @protected @arg {GM_AddToPlaylistService} x */
	GM_AddToPlaylistService(x) {
		const cf="GM_AddToPlaylistService";
		const {apiUrl,sendPost,...y1}=this.s(cf,x); this.g(y1);/*#destructure*/
		if(apiUrl!=="/youtubei/v1/playlist/get_add_to_playlist") debugger;
		if(sendPost!==true) debugger;
	}
	/** @protected @arg {DE_AddToPlaylistService} x */
	DE_AddToPlaylistService(x) {
		const cf="DE_AddToPlaylistService";
		const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure*/
		this.videoId(videoId);
	}
	/** @private @arg {DE_PlaylistEdit} x */
	D_PlaylistEdit(x) {
		const cf="D_PlaylistEdit";
		const {playlistId,params,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {const cf="D_MenuServiceItem_Omit"; const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); f.call(this,serviceEndpoint); return y;}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem";
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {M_Feedback} x */
	M_Feedback(x) {this.T_WCM("M_Feedback",x,this.GM_Feedback);}
	/** @private @arg {GM_Feedback} x */
	GM_Feedback(x) {
		const cf="GM_Feedback";
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/feedback") debugger;
	}
	/** @private @arg {DE_Feedback} x */
	DE_Feedback(x) {
		const cf="DE_Feedback";
		const {feedbackToken,uiActions,actions,...y}=this.s(cf,x); this.g(y);
		let fb_dec=base64_url_dec.decodeByteArray(feedbackToken);
		this.t(fb_dec,x => this.ds.save_number("[feedbackToken.bytes[0..1]]",[x[0],x[1]]));
		this.D_HideEnclosingContainer(uiActions);
		this.t(actions,x => this.z(x,this.A_ReplaceEnclosing));
	}
	/** @private @arg {A_ReplaceEnclosing} x */
	A_ReplaceEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_ReplaceEnclosing","replaceEnclosingAction",x); this.g(y); this.AD_ReplaceEnclosing(a);}
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
		const cf="AD_ReplaceEnclosing_Item"; this.k(cf,x);
		if("notificationTextRenderer" in x) return this.R_NotificationText(x);
	}
	/** @private @arg {R_NotificationText} x */
	R_NotificationText(x) {this.H_("R_NotificationText","notificationTextRenderer",x,this.D_NotificationText);}
	/** @private @arg {D_NotificationText} x */
	D_NotificationText(x) {
		const cf="D_NotificationText";
		const {successResponseText,undoText,undoEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(successResponseText);
		this.G_Text(undoText);
		this.E_UndoFeedback(undoEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_ToggleMenuServiceItem} x */
	R_ToggleMenuServiceItem(x) {this.H_("R_ToggleMenuServiceItem","toggleMenuServiceItemRenderer",x,this.D_ToggleMenuServiceItem);}
	/** @private @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {this.H_("R_MenuNavigationItem","menuNavigationItemRenderer",x,this.D_MenuNavigationItem);}
	/** @private @arg {D_MenuNavigationItem} x */
	D_MenuNavigationItem(x) {
		const cf="D_MenuNavigationItem";
		const {trackingParams,text,icon,navigationEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.G_Text(text);
		if(icon.iconType!=="INFO") debugger;
		this.TA_OpenPopup("TA_OpenPopup_Empty",navigationEndpoint);
	}
	/** @private @template {D_Microformat} U @arg {U} x */
	unwrap_microformat(x) {
		/** @private @type {Partial<T_RemovePrefix<U,"url">>} */
		let uu={};
		uu; x;
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
			if(this.str_starts_with(pf,c1)) {
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
	/** @private @arg {DE_VE3832_Watch} x */
	DE_VE3832_Watch(x) {
		const cf="DE_VE3832_Watch";
		const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig: a1,playerParams,watchEndpointMusicSupportedConfigs: a2,nofollow,playerExtraUrlParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.videoId(videoId);
		this.t(playlistId,this.playlistId);
		if(index!==void 0) this._primitive_of(index,"number");
		this.t(playlistSetVideoId,this.a_primitive_str);
		if(params!==void 0) this.params(cf,"watch.params",params);
		if(startTimeSeconds!==void 0) this._primitive_of(startTimeSeconds,"number");
		if(continuePlayback!==void 0&&!continuePlayback) debugger;
		this.t(loggingContext,this.R_VssLoggingContext);
		this.t(watchEndpointSupportedOnesieConfig,this.R_Html5PlaybackOnesieConfig);
		this.t(a1,this.R_PrefetchHintConfig);
		this.t(playerParams,a => this.playerParams(cf,"watch.player_params",a));
		this.t(a2,this.R_WatchEndpointMusicConfig);
		if(nofollow!==void 0) this._primitive_of(nofollow,"boolean");
		this.t(playerExtraUrlParams,([a,...b]) => this.ceq(a.key,"inline")&&this.ceq(b.length,0));
	}
	/** @private @arg {M_VE3832} x */
	M_VE3832(x) {this.T_WCM("M_VE3832",x,this.GM_VE3832_Watch_WC);}
	/** @private @arg {GM_VE3832_Watch_WC} x */
	GM_VE3832_Watch_WC(x) {
		const cf="GM_VE3832_Watch_WC";
		const {rootVe,url,webPageType,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(rootVe!==3832) debugger;
		if(!this.str_starts_with("/watch",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
	}
	/** @private @arg {R_Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H_("R_Html5PlaybackOnesieConfig","html5PlaybackOnesieConfig",x,this.R_CommonConfig);}
	/** @private @arg {R_CommonConfig} x */
	R_CommonConfig(x) {this.H_("R_CommonConfig","commonConfig",x,this.D_CommonConfig);}
	/** @private @arg {D_CommonConfig} x */
	D_CommonConfig(x) {this.H_("D_CommonConfig","url",x,x => this.parser.parse_url("D_CommonConfig.url",x));}
	/** @private @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("R_VssLoggingContext","vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @private */
	_decoder=new TextDecoder();
	/** @private @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);//#destructure_off
		{
			let x=decodeURIComponent(serializedContextData);
			let b_res=this._decode_b64_url_proto_obj(x);
			if(!b_res) return;
			if(b_res.length!==1) debugger;
			let [r]=b_res;
			if(r[0]==="child"&&r[1]===3) {
				let playlist_id=this._decoder.decode(r[2]);
				if(this.str_starts_with("RD",playlist_id)) {
					this.playlistId(as(playlist_id));
				} else {
					switch(r[1]) {
						default:
							console.log("D_VssLoggingContext_serializedContextData_fieldId",r[1]);
							let playlist_id=this._decoder.decode(r[2]);
							console.log("serializedContextData_decode",playlist_id);
							debugger;
							break;
						case 3: {
							let playlist_id=this._decoder.decode(r[2]);
							console.log("serializedContextData_decode(f3).as_playlist_id",playlist_id);
						} break;
					}
				}
			} else {
				console.log(r);
			}
		}
	}
	/** @private @arg {TR_ItemSection_2<any,any>} x @returns {x is TR_ItemSection_3<any,any,any>} */
	is_ItemSectionRendererTemplate(x) {
		return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);
	}
	/** @private @arg {[TD_ItemSection_3_I_1[], "comment-item-section", "comments-section"]} x */
	ItemSection_3_CommentItemSection(x) {
		if(x[1]!=="comment-item-section") debugger;
		if(x[2]!=="comments-section") debugger;
		this.z(x[0],this.TD_ItemSection_3_I_1);
	}
	/** @private @arg {TD_ItemSection_3_I_1} x */
	TD_ItemSection_3_I_1(x) {
		const cf="TR_ItemSection_3_I_1"; this.k(cf,x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {T_Results<G_Watch_ResultsItem>} x */
	D_WatchResults(x) {const cf="D_WatchResults",{results: a,...y}=this.s(cf,x); this.g(y); return a;}
	/** @private @arg {G_Watch_ResultsItem} x @returns {G_Watch_ContentsItem[]} */
	D_WatchResult_ResultsItem(x) {
		const cf="D_WatchResult_ResultsItem";
		let {trackingParams,contents: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		return a;
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}:${string}`} */
	str_is_uri(x) {
		return x.includes(":");
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {
		return x.includes("?");
	}
	/** @private @arg {D_EX_YoutubeUrl} x */
	D_YoutubeUrl(x) {
		const cf="D_YoutubeUrl";
		let [p1,s1]=split_string_once(x,"//"); if(p1!=="https:") debugger;
		let [h,sp]=split_string_once(s1,"/");
		if(h!=="www.youtube.com") debugger;
		if(this.str_is_search(sp)) {
			let [pp,qp]=split_string_once(sp,"?");
			switch(pp) {
				case "redirect": {
					console.log("[E_Url.TargetUrl.search_params]",qp);
					return;
				}
				default: debugger; break;
			}
			debugger;
		}
		this.codegen_str(cf,x);
	}
	/** @private @arg {Extract<DU_DE_Url['url']|GU_VE83769_Url_Internal,`${string}//studio.youtube.com${string}`>} b */
	handle_yt_studio_url(b) {
		if(!this.str_is_uri(b)) {debugger; return;}
		let x=split_string(split_string_once(b,"//")[1],"/");
		if(x[0]!=="studio.youtube.com") {debugger; return;}
		if(x.length===1) return;
		switch(x[1]) {
			default: debugger; break;
			case "": return;
			case "channel": {
				let v=x[2];
				if(!this.str_starts_with("UC",v)) {debugger; return;}
				let v1=x[3];
				switch(v1) {
					default: debugger; break;
					case "videos": if(x.length!==4) debugger; break;
				}
			} break;
		}
	}
	/** @private @arg {D_EX_YoutubeKidsUrl} x */
	D_YoutubeKidsUrl(x) {
		const cf="D_YoutubeKidsUrl";
		if(x==="https://www.youtubekids.com?source=youtube_web") return;
		if(x==="https://www.youtubekids.com/?source=youtube_web") return;
		this.codegen_str(cf,x);
	}
	/** @private @arg {DU_DE_Url['url']|`https://studio.youtube.com/channel/UC${string}`} x */
	GM_E_Url_TargetUrlType(x) {
		const rp="https://www.youtube.com/redirect?";
		if(this.str_starts_with(rp,x)) return this.D_YoutubeUrl(x);
		let sp=this.parse_with_url_parse(x);
		if(this.str_starts_with("https://",sp.href)) {
			return;
		}
		this.GM_VE83769_UrlType(sp.href);
	}
	/** @private @arg {DU_DE_Url} x */
	DE_Url(x) {
		const cf="DE_Url";
		if("nofollow" in x) {
			const {url,target,nofollow,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.GM_E_Url_TargetUrlType(url);
			if(target!=="TARGET_NEW_WINDOW") debugger;
			if(nofollow!==true) debugger;
			return;
		}
		const {url,target,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.GM_E_Url_TargetUrlType(url);
		if(target!=="TARGET_NEW_WINDOW") debugger;
	}
	/** @private @arg {M_VE83769} x */
	M_VE83769(x) {this.T_WCM("M_VE83769",x,this.GM_VE83769_WC);}
	/** @private @arg {GM_VE83769_WC} x */
	GM_VE83769_WC(x) {
		const cf="GM_VE83769_WC";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.GM_VE83769_UrlType(url);
		if(webPageType!=="WEB_PAGE_TYPE_UNKNOWN") debugger;
		if(rootVe!==83769) debugger;
	}
	/** @private @arg {Extract<GU_VE83769_Url_External,`${string}://music.youtube.com${string}`>} x */
	handle_yt_music_url(x) {
		switch(x) {
			case "https://music.youtube.com/": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GU_VE83769_Url_Internal|GU_VE83769_Url_External} x */
	GM_VE83769_UrlType(x) {
		let up=this.parse_with_url_parse(x);
		switch(up.host) {
			case "music.youtube.com": return this.handle_yt_music_url(up.href);
			case "studio.youtube.com": return this.handle_yt_studio_url(up.href);
			case "www.youtubekids.com": return this.D_YoutubeKidsUrl(up.href);
			case "tv.youtube.com": return;
			default: debugger; break;
		}
		const hn_yt_studio="https://studio.youtube.com";
		const hn_yt_music="https://music.youtube.com";
		const hn_yt_kids="https://www.youtubekids.com";
		const hn_yt_tv="https://tv.youtube.com";
		if(this.str_starts_with(hn_yt_studio,x)) return;
		if(this.str_starts_with(hn_yt_music,x)) return;
		if(this.str_starts_with(hn_yt_kids,x)) return;
		if(this.str_starts_with(hn_yt_tv,x)) return;
		switch(x) {
			default: x===""; debugger; break;
			case "/upload": break;
		}
	}
	/** @template {number} T @arg {T} x @returns {`${T}`} */
	num_to_string(x) {
		return `${x}`;
	}
	/** @private @arg {D_PlayerOverlayAutoplay} x */
	D_PlayerOverlayAutoplay(x) {
		const cf="D_PlayerOverlayAutoplay";
		let {background,videoTitle,byline,pauseText,countDownSecs,cancelButton,nextButton,closeButton,preferImmediateRedirect,webShowBigThumbnailEndscreen,webShowNewAutonavCountdown,countDownSecsForFullscreen,...y}=this.Omit_Compact_Video(cf,x); this.g(y);
		this.G_Text(videoTitle);
		this.G_Text(byline);
		this.G_Text(pauseText);
		this.R_Thumbnail(background);
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
	/** @private @arg {CF_D_Menu_Omit} cf @template {R_Omit_Compact_Player} T @arg {T} x */
	Omit_Compact_Player(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {R_Omit_Compact_Video} T @arg {T} x */
	Omit_Compact_Video(cf,x) {
		let u=this.Omit_Compact_Player(cf,x);
		let {videoId,shortViewCountText,publishedTimeText,...y}=this.D_Omit_ThumbnailOverlay(cf,u);
		this.videoId(videoId);
		this.G_Text(publishedTimeText);
		this.G_Text(shortViewCountText);
		return y;
	}
	/** @private @arg {D_CompactVideo} x */
	D_CompactVideo(x) {
		const cf="D_CompactVideo";
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {richThumbnail,accessibility,channelThumbnail,badges,ownerBadges,publishedTimeText,lengthText,viewCountText,shortViewCountText,...y}=u; this.g(y);
		this.t(richThumbnail,this.D_VideoLike_richThumbnail);
		this.D_Accessibility(accessibility);
		console.log("chan.thumb",channelThumbnail);
		this.tz(badges,this.RMD_Badge);
		this.tz(ownerBadges,this.RMD_Badge);
		this.G_Text(publishedTimeText);
	}
	/** @private @arg {RMD_Badge} x */
	RMD_Badge(x) {this.H_("RMD_Badge","metadataBadgeRenderer",x,this.DMD_Badge);}
	/** @private @arg {DMD_Badge} x */
	DMD_Badge(x) {
		const cf="DMD_Badge";
		this.save_enum("BADGE_STYLE_TYPE",x.style);
		switch(x.style) {
			default: x===0; debugger; break;
			case "BADGE_STYLE_TYPE_SIMPLE": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.trackingParams(cf,trackingParams);
				if(label!=="New") debugger;
			} break;
			case "BADGE_STYLE_TYPE_YPC": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.trackingParams(cf,trackingParams);
				if(label!=="Fundraiser") debugger;
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED_ARTIST": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.T_Icon("DMD_Badge_VerifiedArtist",icon,"OFFICIAL_ARTIST_BADGE");
				if(tooltip!=="Official Artist Channel") debugger;
				this.a_primitive_str(tooltip);
				this.trackingParams(cf,trackingParams);
				if(accessibilityData.label!=="Official Artist Channel") debugger;
				this.D_Label(accessibilityData);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.T_Icon("DMD_Badge_Verified",icon,"CHECK_CIRCLE_THICK");
				if(tooltip!=="Verified") debugger;
				this.a_primitive_str(tooltip);
				this.trackingParams(cf,trackingParams);
				this.D_Label(accessibilityData);
			} break;
			case "BADGE_STYLE_TYPE_LIVE_NOW": {
				const {icon,style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.T_Icon("DMD_Badge_LiveNow",icon,"LIVE");
				this.trackingParams(cf,trackingParams);
				switch(label) {
					default: debugger; break;
					case "LIVE": break;
					case "PREMIERE": break;
				}
			} break;
			case "BADGE_STYLE_TYPE_COLLECTION": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.trackingParams(cf,trackingParams);
				this.a_primitive_str(label);
			} break;
		}
	}
	/** @private @arg {R_AdSlot} x */
	R_AdSlot(x) {this.H_("R_AdSlot","adSlotRenderer",x,this.D_AdSlot);}
	/** @private @arg {D_AdSlot} x */
	D_AdSlot(x) {
		const cf="D_AdSlot";
		const {adSlotMetadata,fulfillmentContent,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.DMD_AdSlot(adSlotMetadata);
		this.R_FulfillmentLayout(fulfillmentContent);
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {R_FulfillmentLayout} x */
	R_FulfillmentLayout(x) {this.H_("R_FulfillmentLayout","fulfilledLayout",x,this.R_InFeedAdLayout);}
	/** @private @arg {R_InFeedAdLayout} x */
	R_InFeedAdLayout(x) {this.H_("R_InFeedAdLayout","inFeedAdLayoutRenderer",x,this.D_InFeedAdLayout);}
	/** @private @arg {D_InFeedAdLayout} x */
	D_InFeedAdLayout(x) {
		const cf="D_InFeedAdLayout";
		const {adLayoutMetadata: a,renderingContent: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.M_AdLayout(a);
		if("displayAdRenderer" in b) {
			this.R_DisplayAd(b);
		} else {
			debugger;
		}
	}
	/** @private @arg {R_DisplayAd} x */
	R_DisplayAd(x) {this.H_("R_DisplayAd","displayAdRenderer",x,this.D_DisplayAd);}
	/** @private @arg {D_DisplayAd} x */
	D_DisplayAd(x) {
		const cf="D_DisplayAd";
		const {layout,...y}=this.s(cf,x);
		let k=this.get_keys_of(y)[0];
		console.log("[D_DisplayAd.next_key] [%s]",k);
	}
	/** @private @arg {MG_AdLayout['layoutType']} x */
	D_AdLayout_TypeStr(x) {
		this.save_enum("LAYOUT_TYPE",x);
		switch(x) {
			default: break;
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES":
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE":
		}
	}
	/** @private @arg {MG_AdLayout} x */
	M_AdLayout(x) {
		const cf="M_AdLayout";
		const {layoutId,...y}=this.s(cf,x);//#destructure_later
		let ba_id=base64_dec.decodeByteArray(layoutId);
		this.t(ba_id,([x]) => this.save_number("[AdLayout.layoutId.bytes[0]]",x));
		this.D_AdLayout_TypeStr(y.layoutType);
		switch(y.layoutType) {
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES": const {layoutType: {},...u}=y; this.g(u); break;
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": {
				const {layoutType: {},adLayoutLoggingData,...u}=y; this.g(u);//#destructure
				this.D_AdLayoutLogging(adLayoutLoggingData);
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
		const cf="DMD_AdSlot",u=this.DMD_AdSlot_Omit(cf,x);
		if("adSlotLoggingData" in u) {
			const {adSlotLoggingData,...y}=u; this.g(y);
			return this.D_SerializedSlotAdServingDataEntry(adSlotLoggingData);
		}
		this.g(u);
	}
	/** @private @arg {D_SerializedSlotAdServingDataEntry} x */
	D_SerializedSlotAdServingDataEntry(x) {
		const cf="D_SerializedSlotAdServingDataEntry";
		const {serializedSlotAdServingDataEntry: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.params(cf,"slot_ad_serving_data_entry",a);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_3<any,any,any>>} x */
	G_WatchResultItem_ItemSection_3(x) {
		const cf="G_WatchResultItem_ItemSection"; this.k(cf,x);
		this.k(`${cf}.section`,x.itemSectionRenderer);
		if(x.itemSectionRenderer.sectionIdentifier!=="comment-item-section") debugger;
		let u=this.TR_ItemSection_3(x); if(!u) return;
		let u1=this.TD_ItemSection_3(`TD_ItemSection_3<"comment-item-section">`,u); if(!u1) return;
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
		this.do_codegen(cf,x);
	}
	/** @private @arg {G_Watch_AnyResultItem} x */
	G_Watch_AnyResultItem(x) {
		const cf="G_SecondaryContentsItem"; this.k(cf,x);
		if("relatedChipCloudRenderer" in x) return this.R_RelatedChipCloud(x);
		if("itemSectionRenderer" in x) return this.RG_Watch_ItemSection(x);
		this.do_codegen(cf,x);
		return null;
	}
	/** @private @arg {G_Watch_SecondaryResults_Contents} x */
	G_Watch_SecondaryResults_Contents(x) {
		const cf="G_Watch_SecondaryResults_Contents";
		const {contents,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.G_Watch_AnyResultItem);
	}
	/** @private @arg {G_Watch_SecondaryResults} x */
	G_Watch_SecondaryResults(x) {
		const cf="G_Watch_SecondaryResults"; this.k(cf,x);
		if("contents" in x) return this.G_Watch_SecondaryResults_Contents(x);
		if("results" in x) return this.G_Watch_SecondaryResults_Results(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_TwoColumnWatchNextResults} x */
	D_TwoColumnWatchNextResults(x) {
		const cf="D_TwoColumnWatchNextResults";
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let u=this.D_WatchResults(results);
		let u1=this.D_WatchResult_ResultsItem(u);
		this.z(u1,this.G_WatchResult_ContentsItem);
		this.T_SecondaryResults(secondaryResults,this.G_Watch_SecondaryResults);
		this.t(playlist,a => this.T_Playlist(a,this.D_PlaylistContent));
		this.t(autoplay,a => this.T_Autoplay(a,this.D_AutoplayContent));
		this.t(conversationBar,this.R_LiveChat);
	}
	/** @private @arg {RSG_GetUnseenCount} x */
	RSG_GetUnseenCount(x) {
		const cf="RSG_GetUnseenCount";
		const {responseContext: {},actions,unseenCount,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.AU_NotificationsUnseenCount(x);
			debugger;
		}));
		if(unseenCount!==void 0) this._primitive_of(unseenCount,"number");
	}
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {
		const cf="UA_NotificationsUnseenCount";
		const {clickTrackingParams,updateNotificationsUnseenCountAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.U_NotificationsUnseenCount(updateNotificationsUnseenCountAction);
	}
	/** @private @arg {AD_UpdateNotificationsUnseenCount} x */
	U_NotificationsUnseenCount(x) {
		const cf="U_NotificationsUnseenCount";
		const {handlerData,unseenCount,timeoutMs,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(handlerData);
		this._primitive_of(unseenCount,"number");
		this._primitive_of(timeoutMs,"number");
	}
	/** @private @arg {REG_DatasyncIds} x */
	REG_DatasyncIds(x) {
		const cf="REG_DatasyncIds";
		const {responseContext: {},datasyncIds,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(datasyncIds,this.a_primitive_str);
	}
	/** @private @arg {REG_AccountSwitcher} x */
	REG_AccountSwitcher(x) {
		const cf="REG_AccountSwitcher";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(selectText);
		this.z(actions,this.A_GetMultiPageMenu);
	}
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H_("A_GetMultiPageMenu","getMultiPageMenuAction",x,this.AD_GetMultiPageMenu);}
	/** @private @arg {RS_AccountsList} x */
	RS_AccountsList(x) {
		const cf="RS_AccountsList";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(selectText);
		this.z(actions,this.AU_ChannelSwitcherPage);
	}
	/** @private @arg {RSW_ReelItem} x */
	RSW_ReelItem(x) {
		const cf="RSW_ReelItem";
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.t(replacementEndpoint,this.E_ReelWatch);
		this.t(sequenceContinuation,this.a_primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @private @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {this.H_("R_ReelPlayerOverlay","reelPlayerOverlayRenderer",x,this.D_ReelPlayerOverlay);}
	/** @private @arg {R_ReelPlayerHeader} x */
	R_ReelPlayerHeader(x) {this.H_("R_ReelPlayerHeader","reelPlayerHeaderRenderer",x,this.D_ReelPlayerHeader);}
	/** @private @arg {R_PivotButton} x */
	R_PivotButton(x) {this.H_("R_PivotButton","pivotButtonRenderer",x,this.D_PivotButton);}
	/** @private @arg {D_ReelPlayerOverlay} x */
	D_ReelPlayerOverlay(x) {
		const cf="D_ReelPlayerOverlay";
		const {likeButton,reelPlayerHeaderSupportedRenderers,menu,nextItemButton,prevItemButton,subscribeButtonRenderer,style,viewCommentsButton,trackingParams,shareButton,pivotButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	}
	/** @private @arg {R_EngagementPanelSectionList} x */
	R_EngagementPanelSectionList(x) {this.H_("R_EngagementPanelSectionList","engagementPanelSectionListRenderer",x,this.D_EngagementPanelSectionList);}
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
			let a1=this.T_ShortsSurfaceIdentifier({tag: identifier.tag,surface: identifier.surface});
			if(a1!=="engagement-panel-structured-description") debugger;
			return;
		}
		this.do_codegen(cf,x);
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
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
					const {panelIdentifier,header,content,veType: {},targetId,visibility,loggingDirectives,identifier,...y}=this.s(cf,x); this.g(y);//#destructure_off
					if(panelIdentifier&&panelIdentifier!=="engagement-panel-structured-description") debugger;
					this.R_EngagementPanelTitleHeader(header);
					this.R_StructuredDescriptionContent(content);
					if(targetId!=="engagement-panel-structured-description") debugger;
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(identifier) {
						let a1=this.T_ShortsSurfaceIdentifier(identifier);
						if(a1!=="engagement-panel-structured-description") debugger;
					}
				} break;
				case 139722: {
					const {content,header,veType: {},targetId,visibility,loggingDirectives,continuationService,identifier,...y}=this.s(cf,x); this.g(y);//#destructure_off
					this.R_SectionList(content);
					this.t(header,this.R_EngagementPanelTitleHeader);
					this.targetId(cf,targetId);
					if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
					this.D_LoggingDirectives(loggingDirectives);
					if(continuationService!=="ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE") debugger;
					if(!identifier) debugger;
					let a1=this.T_ShortsSurfaceIdentifier(identifier);
					if(a1!=="shorts-comments-panel") debugger;
				} break;
			}
			return;
		}
		this.DB_SI_EngagementPanel(x);
	}
	/** @private @arg {G_EngagementPanelSectionShowCommands} x */
	G_EngagementPanelSectionShowCommands(x) {
		const cf="G_EngagementPanelSectionShowCommands"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("showEngagementPanelScrimAction" in x) return this.A_ShowEngagementPanelScrim(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		this.do_codegen(cf,x); x==="";
		this.do_codegen(cf,x);
	}
	/** @private @arg {A_ShowEngagementPanelScrim} x */
	A_ShowEngagementPanelScrim(x) {
		const cf="A_ShowEngagementPanelScrim";
		const {clickTrackingParams,showEngagementPanelScrimAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_ShowEngagementPanelScrim(showEngagementPanelScrimAction);
	}
	/** @private @arg {AD_ShowEngagementPanelScrim} x */
	AD_ShowEngagementPanelScrim(x) {
		const cf="AD_ShowEngagementPanelScrim";
		const {engagementPanelTargetId,onClickCommands,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(engagementPanelTargetId!=="engagement-panel-clip-create") debugger;
		let [n]=this.z(onClickCommands,x => this.TA_OpenPopup("TA_OpenPopup<Popup_ConfirmDialog>",x));
		let [x1]=this.z(n,this.unpack_popup_dialog);
		let [x2]=this.z(x1,x => {
			if(!x[0]) {console.log("Missed popup type",x[1]); return null;}
			return x[1];
		});
		this.z(x2,this.R_ConfirmDialog);
	}
	/** @private @arg {R_ConfirmDialog} x */
	R_ConfirmDialog(x) {this.H_("R_ConfirmDialog","confirmDialogRenderer",x,this.D_ConfirmDialog);}
	/** @private @arg {D_ConfirmDialog} x */
	D_ConfirmDialog(x) {
		const cf="D_ConfirmDialog";
		const {title,trackingParams,dialogMessages,confirmButton,cancelButton,primaryIsCancel,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(title,this.G_Text);
		this.trackingParams(cf,trackingParams);
		this.z(dialogMessages,this.G_Text);
		this.R_Button(confirmButton);
		this.R_Button(cancelButton);
		this.a_primitive_bool(primaryIsCancel);
	}
	/** @private @arg {G_SI_DB_EngagementPanel} x */
	DB_SI_EngagementPanel(x) {
		const cf="DB_SI_EngagementPanel";
		switch(x.targetId) {
			default: x===""; debugger; break;
			case "engagement-panel-ads": {
				const {content,targetId,visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
				this.R_AdsEngagementPanelContent(content);
				if(targetId!=="engagement-panel-ads") debugger;
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-clip-create": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,onShowCommands,...y}=this.s(cf,x); this.g(y);//#destructure_off
				if(panelIdentifier!=="engagement-panel-clip-create") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_ClipSection(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
				this.z(onShowCommands,this.G_EngagementPanelSectionShowCommands);
			} break;
			case "engagement-panel-macro-markers-description-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
				if(panelIdentifier!=="engagement-panel-macro-markers-description-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "engagement-panel-macro-markers-auto-chapters": {
				const {panelIdentifier,header,content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
				if(panelIdentifier!=="engagement-panel-macro-markers-auto-chapters") debugger;
				this.R_EngagementPanelTitleHeader(header);
				this.R_MacroMarkersList(content);
				if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
		}
	}
	/** @private @arg {R_AdsEngagementPanelContent} x */
	R_AdsEngagementPanelContent(x) {this.H_("R_AdsEngagementPanelContent","adsEngagementPanelContentRenderer",x,this.B_Hack);}
	/** @private @arg {RS_SetSetting} x */
	RS_SetSetting(x) {
		const cf="RS_SetSetting";
		const {responseContext: {},settingItemId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(settingItemId!=="407") debugger;
	}
	/** @private @arg {RS_Feedback} x */
	RS_Feedback(x) {
		const cf="RS_Feedback";
		const {responseContext: {},feedbackResponses,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(feedbackResponses,this.D_FeedbackResponseProcessedStatus);
	}
	/** @private @arg {C_ShowReloadUi} x */
	C_ShowReloadUi(x) {
		const cf="C_ShowReloadUi"; this.k(cf,x);
		const {clickTrackingParams,showReloadUiCommand: {targetId,...y1},...y2}=this.s(cf,x);
		this.z([y1,y2],this.g);
		this.clickTrackingParams(cf,clickTrackingParams);
		switch(targetId) {
			default: debugger; break;
			case "browse-feedFEwhat_to_watch": case "watch-next-feed":
		}
	}
	/** @private @template {DC_Continuation} T @arg {"DC_Continuation"} cf @arg {T} x */
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
		return y;
	}
	/** @private @arg {GM_Browse} x */
	GM_browse(x) {
		const cf="GM_browse";
		const {apiUrl,sendPost,...b}=this.s(cf,x); this.g(b);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("R_Notification","notificationRenderer",x,this.D_Notification);}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification";
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.z([thumbnail,videoThumbnail],this.R_Thumbnail);
		this.z([shortMessage,sentTimeText],this.G_Text);
		if(navigationEndpoint.watchEndpoint) {
			this.E_Watch(navigationEndpoint);
		} else {
			debugger;
		}
		this._primitive_of(read,"boolean");
		if(recordClickEndpoint.recordNotificationInteractionsEndpoint) {
			this.E_RecordNotificationInteractions(recordClickEndpoint);
		}
		this.R_Menu(contextualMenu);
		this.parse_number_template(notificationId);
	}
	/** @private @arg {M_RecordInteractions} x */
	M_RecordInteractions(x) {this.T_WCM("M_RecordInteractions",x,this.GM_RecordInteractions);}
	/** @private @arg {GM_RecordInteractions} a */
	GM_RecordInteractions(a) {
		const cf="GM_RecordInteractions";
		const {apiUrl,sendPost,...u}=this.s(cf,a); this.g(u);
		if(apiUrl!=="/youtubei/v1/notification/record_interactions") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {DE_RecordNotificationInteractions} x */
	DE_RecordNotificationInteractions(x) {
		const cf="DE_RecordNotificationInteractions";
		const {serializedInteractionsRequest,actions,...y}=this.s(cf,x); this.g(y);
		this.params(cf,"record_notification_interactions",serializedInteractionsRequest);
		this.tz(actions,this.A_HideEnclosing);
	}
	/** @private @arg {A_HideEnclosing} x */
	A_HideEnclosing(x) {
		const cf="A_HideEnclosing";
		const {clickTrackingParams,hideEnclosingAction: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_HideEnclosing(a);
	}
	/** @private @arg {DC_SectionList} x */
	G_SectionList(x) {
		const cf="G_SectionList";
		if("targetId" in x) {
			if(this.str_starts_with(x.targetId,"browse-feed")) {
				let ss=split_string(x.targetId,"browse-feed");
				if(ss.length!==2) {debugger; return;}
				let sa=ss[1];
				if(sa==="FEsubscriptions") return;
				let ll=sa.slice(24);
				if(this.str_starts_with(sa,"UC")&&ll==="featured") {
					/** @returns {`UC${string}`} */
					function wx() {return "UCx";}
					let [cid,fe]=split_string_once_last(sa,"featured",wx());
					if(fe!=="") debugger;
					this.D_ChannelId(cid);
					return;
				}
				console.log("target_id.ll",ll);
				if(this.str_starts_with(sa,"UC")) {
					let floc=sa.indexOf("featured");
					if(floc<0) {debugger; return;}
					let s1=sa.slice(0,floc);
					let s2=sa.slice(floc);
					if(ll!==s2) debugger;
					console.log("[RichGrid.targetId]",x.targetId);
					console.log("[target_id_parse]",s1,s2);
					debugger;
				}
				return;
			}
			switch(x.targetId) {
				default: debugger; return;
				case "browse-feedFEsubscriptions": return this.D_SectionList_BrowseFeed_Subscriptions(x);
				case "search-feed": return this.DC_SectionList_SearchFeed(x);
			}
		}
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let [u]=this.z(contents,this.TR_SectionListItem_3);
		let [u1]=this.z(u,x => this.TD_ItemSection_3("TR_SectionListItem_3_Empty",x));
		u1;
		// this.tz(continuations,this.RD_NextContinuation);
		this.trackingParams(cf,trackingParams);
		// this.t(subMenu,a => this.save_keys(`[${cf}.subMenu]`,a));
		// if(hideBottomSeparator!==void 0) this.save_boolean(`[${cf}.hideBottomSeparator]`,hideBottomSeparator);
	}
	/** @private @arg {DC_SectionList_BrowseFeed_Subscriptions} x */
	D_SectionList_BrowseFeed_Subscriptions(x) {
		const cf="D_SectionList_BrowseFeed_Subscriptions";
		const {contents,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,x => {
			if("itemSectionRenderer" in x) {
				return;
			}
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
			if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		});
		this.trackingParams(cf,trackingParams);
		if(targetId!=="browse-feedFEsubscriptions") debugger;
	}
	/** @private @arg {R_MusicCarouselShelf} x */
	R_MusicCarouselShelf(x) {this.H_("R_MusicCarouselShelf","musicCarouselShelfRenderer",x,this.D_MusicCarouselShelf);}
	/** @private @arg {R_MusicShelf} x */
	R_MusicShelf(x) {this.H_("R_MusicShelf","musicShelfRenderer",x,this.D_MusicShelf);}
	/** @private @template T1,T2,T3 @arg {TR_SectionListItem_3<T1,T2,T3>} x */
	TR_SectionListItem_3(x) {
		const cf="SectionListItem"; this.k(cf,x);
		if("itemSectionRenderer" in x) return this.TR_ItemSection_3(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("musicCarouselShelfRenderer" in x) return this.R_MusicCarouselShelf(x);
		if("musicShelfRenderer" in x) return this.R_MusicShelf(x);
		debugger;
	}
	/** @private @arg {R_ContinuationItem} x */
	R_ContinuationItem(x) {this.H_("R_ContinuationItem","continuationItemRenderer",x,this.D_ContinuationItem);}
	/** @private @arg {D_ContinuationItem} x */
	D_ContinuationItem(x) {
		const cf="D_ContinuationItem"; this.k(cf,x);
		const {trigger,continuationEndpoint,...y}=this.s(cf,x);
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		this.save_enum("CONTINUATION_TRIGGER",trigger);
		this.GE_Continuation(continuationEndpoint);
		if("button" in y) {
			const {button,...a}=y; this.g(a);
			this.R_Button(button);
			return;
		}
		if("ghostCards" in y) {
			const {ghostCards,...a}=y; this.g(a);
			this.R_GhostGrid(ghostCards);
			return;
		}
		this.g(y);
	}
	/** @private @arg {R_GhostGrid} x */
	R_GhostGrid(x) {this.H_("R_GhostGrid","ghostGridRenderer",x,this.D_GhostGrid);}
	/** @private @arg {D_GhostGrid} x */
	D_GhostGrid(x) {
		const cf="D_GhostGrid";
		const {rows,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(this.get_keys_of(x).join()!=="rows") debugger;
		if(rows!==2) debugger;
	}
	/** @private @arg {GE_Continuation} x */
	GE_Continuation(x) {
		const cf="GE_Continuation"; this.k(cf,x);
		if("getNotificationMenuEndpoint" in x) return this.E_GetNotificationMenu(x);
		if("continuationCommand" in x) {
			this.C_Continuation(x);
		} else if("getTranscriptEndpoint" in x) {
			this.E_GetTranscript(x);
		} else {
			debugger;
		}
	}
	/** @private @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {
				return this.UA_EngagementPanel(a);
			}
			debugger;
		});
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {RS_Success} x */
	RS_Success(x) {
		const cf="RS_Success";
		const {responseContext: {},success,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this._primitive_of(success,"boolean");
	}
	/** @private @arg {RS_AttGet} x */
	RS_AttGet(x) {
		const cf="RS_AttGet";
		const {responseContext: {},challenge,bgChallenge,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(challenge);
		this.D_AttBgChallenge(bgChallenge);
	}
	/** @private @arg {RS_Guide} x */
	RS_Guide(x) {
		const cf="RS_Guide";
		const {responseContext: {},items,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {this.H_("R_GuideSubscriptionsSection","guideSubscriptionsSectionRenderer",x,this.D_GuideSubscriptionsSection);}
	/** @private @arg {R_GuideDownloadsEntry} x */
	R_GuideDownloadsEntry(x) {this.H_("R_GuideDownloadsEntry","guideDownloadsEntryRenderer",x,this.D_GuideDownloadsEntry);}
	/** @private @arg {R_GuideCollapsibleEntry} x */
	R_GuideCollapsibleEntry(x) {this.H_("R_GuideCollapsibleEntry","guideCollapsibleEntryRenderer",x,this.D_GuideCollapsibleEntry);}
	/** @private @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		const cf="G_GuideSectionItem"; this.k(cf,x);
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		if("guideDownloadsEntryRenderer" in x) return this.R_GuideDownloadsEntry(x);
		if("guideCollapsibleEntryRenderer" in x) return this.R_GuideCollapsibleEntry(x);
		if("guideSubscriptionsSectionRenderer" in x) return this.R_GuideSubscriptionsSection(x);
		if("guideSectionRenderer" in x) return this.R_GuideSection(x);
		this.do_codegen(cf,x); x==="";
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_GuideCollapsibleEntry} x */
	D_GuideCollapsibleEntry(x) {
		const cf="D_GuideCollapsibleEntry";
		const {expanderItem,expandableItems,collapserItem,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_GuideEntry(expanderItem);
		this.z(expandableItems,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
			debugger;
		});
		this.R_GuideEntry(collapserItem);
	}
	/** @private @arg {D_GuideDownloadsEntry} x */
	D_GuideDownloadsEntry(x) {
		const cf="D_GuideDownloadsEntry";
		const {alwaysShow,entryRenderer,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(alwaysShow!==false) debugger;
		if(!entryRenderer.guideEntryRenderer) debugger;
		this.R_GuideEntry(entryRenderer);
	}
	/** @private @arg {D_GuideSubscriptionsSection} x */
	D_GuideSubscriptionsSection(x) {
		const cf="D_GuideSubscriptionsSection";
		const {sort,items,trackingParams,formattedTitle,handlerDatas,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		const cf="D_GuideSection";
		const {items,trackingParams,formattedTitle,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(cf,trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {"D_GuideEntry"} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.s(cf,x);
		this.D_Accessibility(accessibility);
		this.G_Text(formattedTitle);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	GE_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		if(!navigationEndpoint.browseEndpoint) debugger;
		this.E_Browse(navigationEndpoint);
		this.T_Icon_AnyOf("D_GuideEntry_Icon",icon,["OFFLINE_DOWNLOAD","VIDEO_LIBRARY_WHITE"]);
		switch(targetId) {
			default: console.log(`case "${x}": break;`); debugger; break;
			case "downloads-guide-item":
			case "library-guide-item": break;
		}
		if(isPrimary!==true) debugger;
	}
	/** @private @arg {R_GuideEntryData} x */
	R_GuideEntryData(x) {this.H_("R_GuideEntryData","guideEntryData",x,this.D_GuideEntryData);}
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
	parse_guide_entry_id(x) {
		if(this.str_starts_with("UC",x)) {
			if(x.length===24) return;
			console.log("[guideEntryId.channel.length]",x.length);
			return;
		}
		if(this.str_starts_with("PL",x)) {
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
		const cf="D_GuideEntryData";
		const {guideEntryId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.parse_guide_entry_id(guideEntryId);
	}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_GuideEntryBadges(x) {
		const cf="D_GuideEntryBadges";
		const {liveBroadcasting,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(liveBroadcasting!==false) debugger;
	}
	/** @type {Extract<Exclude<Extract<D_GuideEntry,{navigationEndpoint:any}>,{isPrimary:any}>,{icon:any}>['icon']['iconType'][]} */
	D_GuideEntry_IconTypes=[
		"MY_VIDEOS","TRENDING","WATCH_HISTORY","WATCH_LATER","CLAPPERBOARD","MUSIC","LIVE",
		"GAMING_LOGO","COURSE","TROPHY","NEWS","YOUTUBE_ROUND","FASHION_LOGO","FLAG",
		"CREATOR_STUDIO_RED_LOGO","YOUTUBE_MUSIC","YOUTUBE_KIDS_ROUND","UNPLUGGED_LOGO","SETTINGS",
		"ADD_CIRCLE",
	];
	/** @arg {"D_GuideEntry"} cf @arg {Extract<Exclude<D_GuideEntry,{entryData:any}>,{navigationEndpoint:any}>} x */
	D_GuideEntry_2(cf,x) {
		if("targetId" in x) this.GE_GuideEntry_WithTargetId(cf,x);
		if("isPrimary" in x) {
			const {navigationEndpoint,icon,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.E_Browse(navigationEndpoint);
			switch(icon.iconType) {
				case "SUBSCRIPTIONS": break;
				case "WHAT_TO_WATCH": break;
				default: debugger; break;
			}
			if(isPrimary!==true) debugger;
			return;
		}
		const {navigationEndpoint,icon,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		x: {
			let x=navigationEndpoint;
			if("browseEndpoint" in x) {
				this.E_Browse(x);
				break x;
			}
			if("urlEndpoint" in x) {
				this.E_Url(x);
				break x;
			}
			debugger;
		}
		let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_Icon",icon,[]);
		if(is_not_in_set) {
			this.do_codegen(cf,x);
		}
		{
			let x=navigationEndpoint;
			if("urlEndpoint" in x) return this.E_Url(x);
			if("browseEndpoint" in x) return this.E_Browse(x);;
			debugger;
		}
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {D_GuideEntry} x */
	D_GuideEntry_WithIcon(cf,x) {
		if("entryData" in x) {
			if("icon" in x) {
				const {navigationEndpoint,icon,entryData,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
				if(!navigationEndpoint.browseEndpoint) debugger;
				this.E_Browse(navigationEndpoint);
				switch(icon.iconType) {
					default: icon===""; this.do_codegen(cf,x); break;
					case "LIKES_PLAYLIST": case "PLAYLISTS":
				}
				return this.R_GuideEntryData(entryData);
			}
			const {...u}=this.D_GuideEntry_Omit(cf,x);
			const {entryData,navigationEndpoint,thumbnail,badges,presentationStyle,...y}=u; this.g(y);
			this.R_GuideEntryData(entryData);
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.E_Browse(navigationEndpoint);
			this.R_Thumbnail(thumbnail);
			this.D_GuideEntryBadges(badges);
			if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
			return;
		}
		if("navigationEndpoint" in x) return this.D_GuideEntry_2(cf,x);
		if("isPrimary" in x) {
			const {icon,isPrimary,serviceEndpoint,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
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
				debugger;
			}
			return;
		}
		const {accessibility,formattedTitle,icon,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure*/
		this.D_Accessibility(accessibility);
		this.G_Text(formattedTitle);
		this.ceq(icon.iconType,"HELP");
		let [cm,se_des]=this.T_SE_Signal(`${cf}.SE_Signal`,serviceEndpoint);
		this.g(cm.webCommandMetadata);
		this.g(se_des);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_GuideEntry} x */
	D_GuideEntry(x) {
		const cf="D_GuideEntry"; this.k(cf,x);
		if("icon" in x) return this.D_GuideEntry_WithIcon(cf,x);
		if("presentationStyle" in x) {
			const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=this.s(cf,x); this.g(y);//#destructure_off
			if(!navigationEndpoint.browseEndpoint) debugger;
			this.E_Browse(navigationEndpoint);
			this.R_Thumbnail(thumbnail);
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
		this.do_codegen(cf,x); x==="";
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry"; this.k(cf,x);
		const {headerEntry,expanderIcon,collapserIcon,sectionItems,handlerDatas,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_GuideEntry(headerEntry);
		this.T_Icon("D_Guide_ExpandIcon",expanderIcon,"EXPAND");
		this.T_Icon("D_Guide_CollapseIcon",collapserIcon,"COLLAPSE");
		this.z(sectionItems,this.G_GuideSectionItem);
		if(handlerDatas[0]!=="GUIDE_ACTION_ADD_TO_PLAYLISTS") debugger;
		if(handlerDatas[1]!=="GUIDE_ACTION_REMOVE_FROM_PLAYLISTS") debugger;
		if(handlerDatas.length!==2) debugger;
	}
	/** @private @arg {R_GuideCollapsibleSectionEntry} x */
	R_GuideCollapsibleSectionEntry(x) {this.H_("R_GuideCollapsibleSectionEntry","guideCollapsibleSectionEntryRenderer",x,this.D_GuideCollapsibleSectionEntry);}
	/** @private @arg {R_GuideEntry} x */
	R_GuideEntry(x) {this.H_("R_GuideEntry","guideEntryRenderer",x,this.D_GuideEntry);}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H_("R_GuideSection","guideSectionRenderer",x,this.D_GuideSection);}
	/** @private @arg {D_AutoplayContent} x */
	D_AutoplayContent(x) {
		const cf="D_AutoplayContent";
		const {sets,countDownSecs,modifiedSets,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(sets,this.AutoplaySetItem);
		if(countDownSecs&&countDownSecs!==5) debugger;
		if(modifiedSets!==void 0) this.z(modifiedSets,this.ModifiedSetItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_PlaylistContent} x */
	D_PlaylistContent(x) {
		const cf="D_PlaylistContent";
		const {contents,title,currentIndex,playlistId,ownerName,isInfinite,playlistShareUrl,shortBylineText,longBylineText,trackingParams,titleText,isEditable,menu,localCurrentIndex,playlistButtons,isCourse,nextVideoLabel,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.z([ownerName,shortBylineText,longBylineText,titleText,nextVideoLabel],this.G_Text);
		this.z(contents,this.R_PlaylistPanelVideo);
		this.a_primitive_str(title);
		this.a_primitive_str(playlistId);
		this._primitive_of(currentIndex,"number");
		this.parser.parse_url(cf,playlistShareUrl);
		this.R_Menu(menu);
		if(localCurrentIndex!==25&&localCurrentIndex!==0) debugger;
		this.R_Menu(playlistButtons);
		this._primitive_of(isInfinite,"boolean");
		this._primitive_of(isEditable,"boolean");
		this._primitive_of(isCourse,"boolean");
	}
	/** @private @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {this.H_("R_PlaylistPanelVideo","playlistPanelVideoRenderer",x,this.D_PlaylistPanelVideo);}
	/** @private @arg {D_PlayerOverlayVideoDetails} x */
	D_PlayerOverlayVideoDetails(x) {
		const cf="D_PlayerOverlayVideoDetails";
		const {title,subtitle,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.G_Text(subtitle);
	}
	/** @private @arg {D_Button_SE} x */
	D_Button_SE(x) {
		const cf="D_Button_SE";
		if("signalServiceEndpoint" in x) return this.T_SE_Signal(`${cf}.SE_Signal`,x);
		if("ypcGetOffersEndpoint" in x) return this.E_YpcGetOffers(x);
		this.do_codegen(cf,x); x==="";
		this.do_codegen(cf,x);
	}
	/** @private @arg {GE_Button_navigation} x */
	Button_navigationEndpoint(x) {
		const cf="Button_navigationEndpoint";
		if("shareEntityServiceEndpoint" in x) return this.ES_ShareEntity(x);
		if("browseEndpoint" in x) return this.E_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_ChannelPage} x */
	R_ChannelPage(x) {
		const cf="R_ChannelPage";
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(page!=="channel") debugger;
		this.E_Browse(endpoint);
		this.RS_Channel(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {R_PlaylistPage} x */
	R_PlaylistPage(x) {
		const cf="R_PlaylistPage"; this.k(cf,x);
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(page!=="playlist") debugger;
		this.E_Browse(endpoint);
		this.RS_Playlist(response);
		this.a_primitive_str(url);
		if("rootVe" in y) {
			const {rootVe,...u}=y; this.g(u);
			switch(rootVe) {
				default: debugger; break;
				case 5754: break;
			}
			return;
		}
		this.g(y);
	}
	/** @private @arg {Extract<R_SettingsPage,{rootVe:23462}>} x */
	Settings_VE23462(x) {
		const cf="Settings_VE23462";
		const {page,endpoint,response,url,rootVe,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(page!=="settings") debugger;
		this.E_Browse(endpoint);
		this.RS_Settings(response);
		this.a_primitive_str(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {R_SettingsPage} x */
	R_SettingsPage(x) {
		const cf="R_SettingsPage";
		if("rootVe" in x) return this.Settings_VE23462(x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(page!=="settings") debugger;
		this.E_Browse(endpoint);
		this.RS_Settings(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {Extract<R_ShortsPage,{rootVe:37414}>} x */
	Shorts_VE37414(x) {
		const cf="Shorts_VE37414";
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {R_ShortsPage} x */
	R_ShortsPage(x) {
		const cf="R_ShortsPage";
		if("rootVe" in x) return this.Shorts_VE37414(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(page!=="shorts") debugger;
		this.RS_Player(playerResponse);
		this.E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,this.RS_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(cachedReelWatchSequenceResponse,this.RS_ReelWatchSequence);
	}
	/** @private @arg {R_SearchPage} x */
	R_SearchPage(x) {
		const cf="R_SearchPage";
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(page!=="search") debugger;
		this.E_Search(endpoint);
		this.RS_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {M_VE4724} x */
	M_VE4724(x) {this.T_WCM("M_VE4724",x,this.GM_VE4724_WC);}
	/** @private @arg {GM_VE4724_WC} x */
	GM_VE4724_WC(x) {
		const cf="GM_VE4724_WC";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(!this.str_starts_with("/results?search_query=",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SEARCH") debugger;
		if(rootVe!==4724) debugger;
	}
	/** @private @arg {DE_Search} x */
	D_Search(x) {this.H_("D_Search","query",x,this.a_primitive_str);}
	/** @private @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader"; this.k(cf,x);
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.R_PlaylistHeader(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("R_C4TabbedHeader","c4TabbedHeaderRenderer",x,this.D_C4TabbedHeader);}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("FeedTabbedHeader","feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		const cf="D_FeedTabbedHeader";
		const {title,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
	}
	/** @private @arg {D_Cache_MD} x */
	D_Cache_MD(x) {
		const cf="CacheMetadata";
		const {isCacheHit,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(!isCacheHit) debugger;
	}
	/** @private @arg {B_StateTag} x */
	B_StateTag(x) {
		const cf="StateTag";
		if(x.stateTag!==3) debugger;
		if("instruction" in x) {
			const {stateTag: {},instruction,...y}=this.s(cf,x); this.g(y);//#destructure_off
			if(instruction!=="STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY") debugger;
			return;
		}
		const {stateTag: {},onStateTagModified,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(onStateTagModified!=="STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE") debugger;
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents"; this.k(cf,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {this.H_("R_FeedFilterChipBar","feedFilterChipBarRenderer",x,this.D_FeedFilterChipBar);}
	/** @private @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {this.H_("R_TwoColumnBrowseResults","twoColumnBrowseResultsRenderer",x,this.D_TwoColumnBrowseResults);}
	/** @private @arg {A_ResponseReceived} x */
	A_ResponseReceived(x) {
		const cf="A_ResponseReceived"; this.k(cf,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	static {
		this.prototype.MC_ResolveUrl;
	}
	/** @private @arg {MC_ResolveUrl} x */
	MC_ResolveUrl(x) {
		const cf="MC_ResolveUrl";
		const {isVanityUrl,parentTrackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(isVanityUrl!==void 0) this._primitive_of(isVanityUrl,"boolean");
		this.t(parentTrackingParams,a => this.params(cf,"tracking.parentTrackingParams",a));
	}
	/** @private @arg {DC_AdsControlFlowOpportunityReceived} x */
	DC_AdsControlFlowOpportunityReceived(x) {
		const cf="DC_AdsControlFlowOpportunityReceived";
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.save_enum("OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.DMD_AdSlotAndLayoutItem));
		this._primitive_of(isInitialLoad,"boolean");
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("R_AddToPlaylist","addToPlaylistRenderer",x,this.D_AddToPlaylist);}
	/** @private @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC","responseContext",x);}
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
	/** @private @arg {D_LoggingDirectives} x */
	D_LoggingDirectives(x) {
		const cf="D_LoggingDirectives";
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.TM_Visibility(visibility);
		this.t(gestures,this.D_LoggingDirectives_Gestures);
		if(enableDisplayloggerExperiment!==void 0) this._primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @private @arg {D_LoggingDirectives_Gestures} x */
	D_LoggingDirectives_Gestures(x) {
		const cf="D_LoggingDirectives_Gestures"; this.k(cf,x);
		let inner=this.T_Types(x);
		if(inner!==4) debugger;
	}
	/** @private @arg {A_ChangeEngagementPanelVisibility} x */
	A_ChangeEngagementPanelVisibility(x) {
		const cf="EA_ChangeEngagementPanelVisibility";
		const {clickTrackingParams,changeEngagementPanelVisibilityAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_ChangeEngagementPanelVisibility(changeEngagementPanelVisibilityAction);
	}
	/** @private @arg {TA_Continuation<`comment-replies-item-${string}`,R_Comment>} x */
	CommentRepliesItem(x) {
		const cf="CommentRepliesItem";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_Comment);
	}
	/** @private @arg {D_FeedbackResponseProcessedStatus} x */
	D_FeedbackResponseProcessedStatus(x) {
		const cf="D_FeedbackResponseProcessedStatus";
		const {isProcessed,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this._primitive_of(isProcessed,"boolean");
	}
	/** @private @arg {AU_EngagementPanel} x */
	UA_EngagementPanel(x) {
		const cf="UA_EngagementPanel";
		const {updateEngagementPanelAction,clickTrackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_UpdateEngagementPanel(updateEngagementPanelAction);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge";
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_TemplateUpdate} x */
	D_TemplateUpdate(x) {
		const cf="D_TemplateUpdate"; this.k(cf,x);
		const {identifier,dependencies,serializedTemplateConfig: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		let idp=split_string_once(identifier,"|");
		console.log(idp);
		this.tz(dependencies,dep => {
			let ddp=split_string_once(dep,"|");
			console.log("[dtu_info]",idp[0],ddp);
		});
		this.a_primitive_str(a);
	}
	/** @private @arg {D_EntityBatchUpdate} x */
	D_EntityBatchUpdate(x) {
		const cf="D_EntityBatchUpdate";
		const {mutations,timestamp,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(mutations,this.DE_MutationItem);
		this.D_TimestampWithNanos(timestamp);
	}
	/** @private @arg {D_TimestampWithNanos} x */
	D_TimestampWithNanos(x) {
		const cf="D_TimestampWithNanos";
		const {seconds,nanos,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(seconds);
		this._primitive_of(nanos,"number");
	}
	/** @private @arg {DE_MutationItem} x */
	DE_MutationItem(x) {
		const cf="DE_MutationItem";
		const {entityKey,type,options,payload,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.params(cf,"entity_key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE"&&type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		this.tf(this.DE_PersistenceOption)(options);
		let pr=this.tf(this.G_EY_Entity)(payload);
		if(!pr) return;
		const [pi,px]=pr;
		switch(pi) {
			case "offlineabilityEntity": {
				const cf="D_EY_Offlineability";
				const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
				console.log(`${cf}.command`,command);
				switch(addToOfflineButtonState) {
					default: debugger; break;
					case "ADD_TO_OFFLINE_BUTTON_STATE_UNKNOWN":
					case "ADD_TO_OFFLINE_BUTTON_STATE_ENABLED":
				}
				if(contentCheckOk!==false) debugger;
				if(racyCheckOk!==false) debugger;
				this.D_LoggingDirectives(loggingDirectives);
			} break;
			case "subscriptionStateEntity": {
				const cf="DS_EY_Subscription";
				const {key,subscribed,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
				if(subscribed!==true) debugger;
			} break;
			case "playlistLoopStateEntity": {
				const cf="DS_EY_PlaylistLoop";
				const {key,state,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
				switch(state) {
					default: debugger; break;
					case "PLAYLIST_LOOP_STATE_NONE":
				}
			} break;
			case "transcriptTrackSelectionEntity": {
				const cf="DS_EY_TranscriptTrackSelection";
				const {key,selectedTrackIndex,serializedParams,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
				if(selectedTrackIndex!==0) debugger;
				this.params(cf,"transcriptTrackSelection.serializedParams",serializedParams);
			} break;
			case "transcriptSearchBoxStateEntity": {
				const cf="DS_EY_TranscriptSearchBox";
				const {key,isHidden,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
				if(isHidden!==false) debugger;
			} break;
			case "macroMarkersListEntity": {
				const cf="EY_MacroMarkersList";
				const {key,...y}=this.s(cf,px); this.g(y);//#destructure_off
				console.log(`${cf}.key`,key);
			} break;
			case "unknown": {
				let pk=pr[1];
				let x=pr[2];
				if("key" in x) {
					const {key,...y}=this.s(cf,x); this.g(y);//#destructure_off
					console.log(`unknown.${this.uppercase_first(pk)}.key`,key);
				} else {
					debugger;
				}
			} break;
		}
	}
	/** @private @arg {"G_EY_Entity"} cf @template V @arg {{[U in `${string}Entity`]:V}} x */
	G_EY_Entity_Any(cf,x) {return this.w(`G_EY_Entity_Any:${cf}`,this.get_keys_of(x)[0],x);}
	/** 
	 * @private @arg {G_EY_Entity} x
	 * @returns {(G_EY_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?[keyof I,V]|null:null:never)|["unknown",string,{}]}
	 */
	G_EY_Entity(x) {
		const cf="G_EY_Entity";
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
		this.do_codegen(cf,x);
		this.do_codegen(`${cf}$entity`,this.G_EY_Entity_Any(cf,x));
		return ["unknown",cn,this.G_EY_Entity_Any(cf,x)];
	}
	/** @private @arg {DE_PersistenceOption} x */
	DE_PersistenceOption(x) {
		const cf="DE_PersistenceOption";
		const {persistenceOption,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @private @arg {G_TopbarButtonItem} x */
	G_TopbarButtonItem(x) {
		const cf="G_TopbarButtonItem"; this.k(cf,x);
		if("topbarMenuButtonRenderer" in x) return this.R_TopbarMenuButton(x);
		if("notificationTopbarButtonRenderer" in x) return this.R_NotificationTopbarButton(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_TwoColumnBrowseResults} x */
	D_TwoColumnBrowseResults(x) {
		const cf="D_TwoColumnBrowseResults";
		const {tabs,secondaryContents,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(tabs,this.RG_Result);
		this.t(secondaryContents,this.G_SecondaryContents);
	}
	/** @private @arg {TM_Visibility} x */
	TM_Visibility(x) {
		const cf="TM_Visibility";
		const {types,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.save_string("[Visibility.types]",types);
	}
	/** @private @arg {TA_Continuation<"comments-section",G_CommentsSection>} x */
	A_CommentsSectionContinuation$(x) {
		const cf="A_CommentsSectionContinuation";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_CommentsSection);
	}
	/** @private @arg {TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>} x */
	A_BrowseFeed$(x) {
		const cf="A_BrowseFeed";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.targetId(cf,targetId);
		this.z(continuationItems,this.R_BrowseFeed);
	}
	/** @private @arg {TA_Continuation<"watch-next-feed",G_WatchNext>} x */
	A_WatchNext(x) {
		const cf="A_WatchNext";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_WatchNext);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel";
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(cf,trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {
			this.z(engagementPanels,this.R_EngagementPanelSectionList);
		}
	}
	/** @private @arg {G_SecondaryContents} x */
	G_SecondaryContents(x) {
		const cf="G_SecondaryContents"; this.k(cf,x);
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {G_WatchNext} x */
	G_WatchNext(x) {
		const cf="G_WatchNext"; this.k(cf,x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {SE_ShareEntity} x */
	ES_ShareEntity(x) {
		const cf="ES_ShareEntity";
		const {clickTrackingParams,commandMetadata,shareEntityServiceEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/share/get_share_panel") debugger;
		this.GM_WC(commandMetadata.webCommandMetadata);
		this.D_ShareEntityService(shareEntityServiceEndpoint);
	}
	/** @private @arg {D_ShareEntityService} x */
	D_ShareEntityService(x) {
		const cf="D_ShareEntityService";
		const {serializedShareEntity,commands,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(serializedShareEntity);
		this.z(commands,x => this.TA_OpenPopup("TA_OpenPopup_Empty",x));
	}
	/** @private @arg {M_SendPost} x */
	M_SendPost(x) {const cf="M_SendPost",{webCommandMetadata: a,...y}=this.s(cf,x); this.g(y); this.GM_SendPost(a);}
	/** @private @arg {GM_SendPost} x */
	GM_SendPost(x) {
		const cf="GM_SendPost";
		const {sendPost: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(a!==true) debugger;
	}
	/** @private @arg {GC_Button} x */
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
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {DE_CreateBackstagePost} x */
	DE_CreateBackstagePost(x) {const cf="DE_CreateBackstagePost"; this.y(cf,"createBackstagePostParams",x,x => this.params("DE_CreateBackstagePost.params","createBackstagePost.params",x));}
	/** @private @arg {M_CreateBackstagePost} x */
	M_CreateBackstagePost(x) {this.T_WCM("M_CreateBackstagePost",x,this.GM_CreateBackstagePost);}
	/** @private @arg {GM_CreateBackstagePost} x */
	GM_CreateBackstagePost(x) {
		const cf="GM_CreateBackstagePost";
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);
	}
	/** @private @arg {C_Executor} x */
	C_Executor(x) {
		const cf="C_Executor";
		const {clickTrackingParams,commandExecutorCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_Executor(commandExecutorCommand);
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
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) {debugger; return this.z([x],a => a);}
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @arg {string} cf @arg {{}} x */
	codegen_break(cf,x) {
		this.do_codegen(`${cf}.commandMetadata`,x);
		debugger;
	}
	/** @type {Map<string,((y:C_UpdateToggleButtonState)=>void)>} */
	h_m=new Map;
	/** @private @arg {C_UpdateToggleButtonState} x */
	C_UpdateToggleButtonState(x) {
		const cf="C_UpdateToggleButtonState",{clickTrackingParams: a,updateToggleButtonStateCommand: b,...y}=this.s(cf,x); this.g(y);
		this.clickTrackingParams(cf,a);
		this.DC_UpdateToggleButtonState(b);
	}
	/** @private @arg {DC_UpdateToggleButtonState} x */
	DC_UpdateToggleButtonState(x) {
		const cf="DC_UpdateToggleButtonState",{toggled: a,buttonId: b,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_bool(a);
		this.buttonState_buttonId(b);
	}
	/** @private @arg {DC_UpdateToggleButtonState['buttonId']} x */
	buttonState_buttonId(x) {
		const cf="buttonState_buttonId";
		this.save_enum("TOGGLE_BUTTON_ID_TYPE",x);
		let ret=this.codegen_new_typedef("buttonState_buttonId",{button_id: x},true);
		if(ret) {
			this.save_string(`[${cf}]`,ret);
		}
	}
	/** @private @arg {C_Loop} x */
	C_Loop(x) {let [a,b]=this.TE_Endpoint_2("C_Loop","loopCommand",x); this.g(b); this.DC_Loop(a);}
	/** @private @arg {DC_Loop} x */
	DC_Loop(x) {const {loop,...y}=x; this.g(y); this.ceq(loop,this.false_());}
	/** @private @arg {A_HideEngagementPanelScrim} x */
	A_HideEngagementPanelScrim(x) {
		const cf="A_HideEngagementPanelScrim";
		const {clickTrackingParams,hideEngagementPanelScrimAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.R_EngagementPanelTargetId(hideEngagementPanelScrimAction);
	}
	/** @private @arg {AD_HideEngagementPanelTargetId} x */
	R_EngagementPanelTargetId(x) {
		const cf="R_EngagementPanelTargetId";
		const {engagementPanelTargetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		switch(engagementPanelTargetId) {
			default: debugger; break;
			case "engagement-panel-clip-create": break;
		}
	}
	/** @private @arg {D_TopbarLogo} x */
	D_TopbarLogo(x) {
		const cf="D_TopbarLogo";
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.T_Icon("D_Icon_YoutubeLogo",iconImage,"YOUTUBE_LOGO");
		this.G_Text(tooltipText);
		this.E_Browse(endpoint);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_str(overrideEntityKey);
	}
	/** @private @arg {D_AdSlotAndLayoutItem} x */
	DMD_AdSlotAndLayoutItem(x) {
		const cf="DMD_AdSlotAndLayoutItem";
		const {adLayoutMetadata,adSlotMetadata,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(adLayoutMetadata,this.MMD_AdLayout_1);
		this.DMD_AdSlot(adSlotMetadata);
	}
	/** @private @arg {D_FusionSearchbox} x */
	D_FusionSearchbox(x) {
		const cf="D_FusionSearchbox";
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.T_Icon("D_Icon_Search",icon,"SEARCH");
		this.G_Text(placeholderText);
		this.R_WebSearchboxConfig(config);
		this.trackingParams(cf,trackingParams);
		this.E_Search(searchEndpoint);
		this.R_Button(clearButton);
	}
	/** @private @arg {AD_ChangeEngagementPanelVisibility} x */
	AD_ChangeEngagementPanelVisibility(x) {
		const cf="AD_ChangeEngagementPanelVisibility";
		const {targetId,visibility,...y}=this.s(cf,x); this.g(y);//#destructure_off
		switch(targetId) {
			default: targetId===""; this.codegen_new_typedef("AD_ChangeEngagementPanelVisibility_id",x); break;
			case "engagement-panel-clip-create": break;
			case "engagement-panel-clip-view": break;
			case "engagement-panel-comments-section": break;
			case "engagement-panel-structured-description": break;
			case "engagement-panel-macro-markers-auto-chapters": break;
			case "engagement-panel-macro-markers-description-chapters": break;
		}
		switch(visibility) {
			default: this.codegen_new_typedef("ChangeEngagementPanelVisibilityActionData_vis",x); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED": break;
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN": break;
		}
	}
	/** @private @arg {AD_UpdateEngagementPanel} x */
	D_UpdateEngagementPanel(x) {
		const cf="D_UpdateEngagementPanel";
		const {content,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("Transcript","transcriptRenderer",x,this.D_Transcript);}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript"; this.k(cf,x);
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @private @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel";
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		const cf="RS_Playlist";
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_TwoColumnBrowseResults(contents);
		this.R_PlaylistHeader(header);
		this.t(alerts,x => this.Response_alerts(cf,x));
		this.R_Playlist_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.R_Microformat(microformat);
		this.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {string} cf @arg {NonNullable<RS_Playlist['alerts']>} x */
	Response_alerts(cf,x) {
		this.z(x,x => {
			if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
			this.do_codegen(`${cf}$alerts$iterate`,x);
		});
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings";
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(cf,trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_FeedFilterChipBar} x */
	D_FeedFilterChipBar(x) {
		const cf="D_FeedFilterChipBar";
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		this.R_Button(nextButton);
		this.R_Button(previousButton);
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {boolean} x */
	a_primitive_bool(x) {
		if(typeof x!=="boolean") debugger;
	}
	/** @private @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H_("ChipCloudChip","chipCloudChipRenderer",x,this.D_ChipCloudChip);}
	/** @private @arg {D_ChipCloudChip} x */
	D_ChipCloudChip(x) {
		const cf="D_ChipCloudChip";
		if("navigationEndpoint" in x) return this.D_ChipCloudChip_WithNav(cf,x);
		if("isSelected" in x) {
			let d=this.D_ChipCloudChip_Omit(cf,x);
			const {isSelected: a,...y}=d; this.g(y);
			if(a!==true) debugger;
			return;
		}
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_WithNav(cf,x) {
		let {style,text,trackingParams,...x1}=this.D_ChipCloudChip_OmitNav(cf,x);
		if("isSelected" in x1) {
			const {isSelected: a,...y}=x1; this.g(y);
			this.a_primitive_bool(a);
			return;
		}
		if("uniqueId" in x1) {
			const {uniqueId: b,...y}=x1; this.g(y);
			if(b!=="ATTRIBUTE_FILTER_TYPE_EXPLORE") debugger;
			return;
		}
		if("targetId" in x1) {
			const {targetId: a,...y}=x1; this.g(y);
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
		const cf="D_ChipCloudChip_navigationEndpoint";
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("relatedChipCommand" in x) return this.C_RelatedChip(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {C_RelatedChip} x */
	C_RelatedChip(x) {let [a,y]=this.TE_Endpoint_2("C_RelatedChip","relatedChipCommand",x); this.g(y); this.DC_RelatedChip(a);}
	/** @private @arg {DC_RelatedChip} x */
	DC_RelatedChip(x) {
		const cf="DC_RelatedChip";
		const {targetSectionIdentifier,loadCached,...y}=this.s(cf,x); this.g(y);//#destructure
		if(targetSectionIdentifier!=="sid-wn-chips") debugger;
		if(loadCached!==true) debugger;
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
	/** @private @arg {AutoplaySetItem} x */
	AutoplaySetItem(x) {
		const cf="AutoplaySetItem";
		const {mode,autoplayVideo,nextButtonVideo,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(mode!=="NORMAL") debugger;
		this.E_Watch(autoplayVideo);
		this.t(nextButtonVideo,this.E_Watch);
	}
	/** @private @arg {D_ModifiedSetItem} x */
	ModifiedSetItem(x) {
		const cf="ModifiedSetItem";
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.E_WatchPlaylist(autoplayVideo);
		this.E_WatchPlaylist(nextButtonVideo);
		this.t(previousButtonVideo,this.E_WatchPlaylist);
	}
	/** @private @arg {DE_WatchPlaylist} x */
	D_WatchPlaylist(x) {
		const cf="D_WatchPlaylist";
		const {playlistId,index,params,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.parser.parse_playlist_id(playlistId);
		this._primitive_of(index,"number");
		this.params(cf,"watch_playlist.params",params);
	}
	/** @private @arg {M_AdLayout_TopImage} x */
	MMD_AdLayout_1(x) {
		const cf="MMD_AdLayout_1";
		const {layoutType,layoutId,adLayoutLoggingData,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(layoutType);
		this.a_primitive_str(layoutId);
		this.D_AdLayoutLogging(adLayoutLoggingData);
	}
	/** @private @arg {D_HotkeyDialog} x */
	D_HotkeyDialog(x) {
		const cf="D_HotkeyDialog";
		const {title,sections,dismissButton,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.z(sections,this.R_HotkeyDialogSection);
		this.R_Button(dismissButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_HotkeyDialogSection} x */
	D_HotkeyDialogSection(x) {
		const cf="D_HotkeyDialogSection"; this.k(cf,x);
		const {title,options: u,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.z(u,this.R_HotkeyDialogSectionOption);
	}
	/** @private @arg {D_HotkeyDialogSectionOption} x */
	D_HotkeyDialogSectionOption(x) {
		const cf="D_HotkeyDialogSectionOption";
		const {label,hotkey,...y}=this.s(cf,x);
		this.G_Text(label);
		this.a_primitive_str(hotkey);
		if("hotkeyAccessibilityLabel" in y) {
			const {hotkeyAccessibilityLabel,...y1}=y; this.g(y1);
			return this.D_Accessibility(hotkeyAccessibilityLabel);
		}

		this.g(y);
	}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {
		const cf="C_ResetChannelUnreadCount";
		const {clickTrackingParams,resetChannelUnreadCountCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(clickTrackingParams);
		this.g(resetChannelUnreadCountCommand);
	}
	/** @private @arg {D_CinematicContainer} x */
	D_CinematicContainer(x) {
		const cf="D_CinematicContainer";
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.t(backgroundImageConfig,this.R_ThumbnailsList);
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
	/** @private @arg {R_ThumbnailsList} x */
	R_ThumbnailsList(x) {
		const cf="R_ThumbnailsList"; this.k(cf,x);
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Thumbnail(thumbnail);
		this.t_cf(cf,trackingParams,this.trackingParams);
	}
	/** @private @arg {D_AdLayoutLogging} x */
	D_AdLayoutLogging(x) {const cf="D_AdLayoutLogging"; this.H_(cf,"serializedAdServingDataEntry",x,x => this.params(cf,"AdServingDataEntry",x));}
	/** @private @arg {R_PrefetchHintConfig} x */
	R_PrefetchHintConfig(x) {this.H_("R_PrefetchHintConfig","prefetchHintConfig",x,this.D_PrefetchHintConfig);}
	/** @private @arg {D_PrefetchHintConfig} x */
	D_PrefetchHintConfig(x) {
		const cf="D_PrefetchHintConfig"; this.k(cf,x);
		const {prefetchPriority,countdownUiRelativeSecondsPrefetchCondition,playbackRelativeSecondsPrefetchCondition,...y}=x; this.g(y);
		this.ceq(prefetchPriority,0);
		if(prefetchPriority!==0) debugger;
	}
	/** @private @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("R_ResourceStatusInResponseCheck","resourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData"; this.k(cf,x);
		const {serverBuildLabel,resourceStatuses: a,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(serverBuildLabel);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus";
		const {identifier,status,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.a_primitive_str(identifier);
	}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("R_MusicThumbnail","musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail";
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,a);
		this.R_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {R_LiveChat} x */
	R_LiveChat(x) {this.H_("R_LiveChat","liveChatRenderer",x,this.D_LiveChat);}
	/** @private @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("R_ReportFormModal","reportFormModalRenderer",x,this.D_ReportFormModal);}
	/** @private @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel";
		const {responseContext: {},trackingParams,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel_Action";
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
			this.clickTrackingParams(cf,clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @private @arg {RS_Subscribe_ActionItem} x */
	RS_Subscribe_ActionItem(x) {
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
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe";
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(actions,this.RS_Subscribe_ActionItem);
		this.g(newNotificationButton);
		this.trackingParams(cf,trackingParams);
		this.A_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	R_WatchEndpointMusicConfig(x) {this.H_("R_WatchEndpointMusicConfig","watchEndpointMusicConfig",x,this.D_WatchEndpointMusicConfig);}
	/** @private @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("R_PlaylistHeader","playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @private @arg {R_StructuredDescriptionContent} x */
	R_StructuredDescriptionContent(x) {this.H_("R_StructuredDescriptionContent","structuredDescriptionContentRenderer",x,this.D_StructuredDescriptionContent);}
	/** @private @arg {D_StructuredDescriptionContent} x */
	D_StructuredDescriptionContent(x) {this.H_("D_StructuredDescriptionContent","items",x,x => this.z(x,this.G_StructuredDescriptionContentItem));}
	/** @private @arg {G_StructuredDescriptionContentItem} x */
	G_StructuredDescriptionContentItem(x) {
		const cf="G_StructuredDescriptionContentItem"; this.k(cf,x);
		if("expandableVideoDescriptionBodyRenderer" in x) return this.R_ExpandableVideoDescriptionBody(x);
		if("horizontalCardListRenderer" in x) return this.R_HorizontalCardList(x);
		if("videoDescriptionHeaderRenderer" in x) return this.R_VideoDescriptionHeader(x);
		if("videoDescriptionMusicSectionRenderer" in x) return this.R_VideoDescriptionMusicSection(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_ProductList} x */
	R_ProductList(x) {this.H_("R_ProductList","productListRenderer",x,this.D_ProductList);}
	/** @private @arg {R_ClipSection} x */
	R_ClipSection(x) {this.H_("R_ClipSection","clipSectionRenderer",x,this.D_ClipSection);}
	/** @private @arg {D_ClipSection} x */
	D_ClipSection(x) {this.H_("D_ClipSection","contents",x,x => this.z(x,this.R_ClipCreation));}
	/** @private @arg {R_ClipCreation} x */
	R_ClipCreation(x) {this.H_("C_RunAttestation","clipCreationRenderer",x,this.D_ClipCreation);}
	/** @private @arg {R_MacroMarkersList} x */
	R_MacroMarkersList(x) {this.H_("R_MacroMarkersList","macroMarkersListRenderer",x,this.D_MacroMarkersList);}
	/** @private @arg {R_EngagementPanelTitleHeader} x */
	R_EngagementPanelTitleHeader(x) {this.H_("R_EngagementPanelTitleHeader","engagementPanelTitleHeaderRenderer",x,this.D_EngagementPanelTitleHeader);}
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
	/** @private @arg {T_RemovePrefix<Omit<D_LikeButton,"likesAllowed">, "like">} x */
	D_LikeButton_Like(x) {
		const cf="D_LikeButton.like";
		const {status,count,countText,countWithLikeText,countWithUnlikeText,countTooltipText,...y}=this.s(cf,x); this.g(y);
		status;
		count;
		countText;
		countWithLikeText;
		countWithUnlikeText;
		countTooltipText;
	}
	/** @private @arg {D_LikeButton} x */
	D_LikeButton(x) {
		const cf="D_LikeButton";
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
	/** @private @arg {GM_RemoveLike} x */
	GM_like_removelike(x) {
		const cf="GM_like_removelike";
		const {apiUrl: a,sendPost: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(a!=="/youtubei/v1/like/removelike") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {GM_Dislike} x */
	GM_like_dislike(x) {
		const cf="GM_like_dislike";
		const {apiUrl: a,sendPost: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(a!=="/youtubei/v1/like/dislike") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {GM_Like} x */
	GM_like_like(x) {
		const cf="GM_like_like";
		const {apiUrl: a,sendPost: b,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(a!=="/youtubei/v1/like/like") debugger;
		if(b!==true) debugger;
	}
	/** @private @arg {D_LikeApi} x */
	D_LikeApi(x) {
		const cf="D_LikeApi";
		{
			const cn="videoId";
			if(cn in x) {
				const {[cn]: a,...y}=this.s(cf,x); this.g(y);
				return this[cn](a);
			}
		}
		{
			const cn="playlistId";
			if(cn in x) {
				const {[cn]: a,...y}=this.s(cf,x); this.g(y);
				return this[cn](a);
			}
		}
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("R_TranscriptSearchPanel","transcriptSearchPanelRenderer",x,this.D_TranscriptSearchPanel);}
	/** @private @arg {CD_TimedContinuation} x */
	RD_TimedContinuation(x) {this.H_("RD_TimedContinuation","timedContinuationData",x,this.DC_Timed);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("RC_LiveChat","liveChatContinuation",x,this.DC_LiveChat);}
	/** @private @arg {G_Watch_SecondaryResults_G_SectionItem} x */
	G_Watch_SecondaryResults_G_SectionItem(x) {
		const cf="G_Watch_SecondaryResults_G_SectionItem";
		if("compactRadioRenderer" in x) return this.R_CompactRadio(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		if("compactPlaylistRenderer" in x) return this.R_CompactPlaylist(x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("" in x) return;
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
		this.G_Text(x);
	}
	/** @private @arg {RG_Watch_ItemSection} x */
	RG_Watch_ItemSection(x) {
		let u=this.TR_ItemSection_3(x); if(!u) return;
		let u1=this.TD_ItemSection_3(`TD_ItemSection_3<"watch-next-feed">`,u);
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
	/** @private @arg {R_CompactPlaylist} x */
	R_CompactPlaylist(x) {this.H_("R_CompactPlaylist","compactPlaylistRenderer",x,this.D_CompactPlaylist);}
	/** @private @arg {CF_D_Playlist_Omit} cf @arg {D_CompactPlaylist} x */
	D_Playlist_Omit(cf,x) {
		let {shortBylineText,sidebarThumbnails,shareUrl,thumbnailRenderer,...y}=this.Omit_Menu_Radio(cf,x);
		this.G_Text(shortBylineText);
		this.z(sidebarThumbnails,this.R_Thumbnail);
		this.D_CompactRadio_shareUrl(shareUrl);
		return y;
	}
	/** @private @arg {D_CompactPlaylist} x */
	D_CompactPlaylist(x) {
		let y=this.D_Playlist_Omit("D_CompactPlaylist",x);
		const {...p}=y; p;
	}
	/** @private @arg {R_CompactRadio} x */
	R_CompactRadio(x) {this.H_("R_CompactRadio","compactRadioRenderer",x,this.D_CompactRadio);}
	/** @private @arg {D_CompactRadio['secondaryNavigationEndpoint']} x */
	D_CompactRadio_NavE(x) {
		if(!x.watchEndpoint) debugger;
		this.E_Watch(x);
	}
	/** @private @arg {D_CompactRadio['shareUrl']} b */
	D_CompactRadio_shareUrl(b) {
		const cf="D_CompactRadio_shareUrl";
		let up=this.parse_with_url_parse(b);
		{
			let obj=new UrlParseHelper(up);
			if(obj.get_with_pathname(up,"/watch")) {
				let {...s}=this.parse_url_search_params(up.search);
				if("v" in s) {
					let {v,playnext,list,...y}=s; this.g(y);
					console.log("[CompactRadio.v]",v);
					console.log("[CompactRadio.playnext]",playnext);
					console.log("[CompactRadio.list]",list);
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
					let {list,...y}=s; this.g(y);
					console.log("[CompactRadio.list]",list);
					return;
				}
				return;
			}
		}
		// let {...s}=this.parse_url_search_params(up.search);
		this.codegen_str(cf,b);
	}
	/** @private @arg {D_CompactRadio} x */
	D_CompactRadio(x) {
		const cf="D_CompactRadio";
		let {secondaryNavigationEndpoint: a,shareUrl: b,...o}=this.Omit_Menu_Radio(cf,x); o;
		this.D_CompactRadio_NavE(a); this.D_CompactRadio_shareUrl(b);
	}
	/** @private @arg {G_Watch_SecondaryResults_Results} x */
	G_Watch_SecondaryResults_Results(x) {
		const cf="G_Watch_SecondaryResults_Results";
		const {results,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(results,this.G_Watch_AnyResultItem);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_RelatedChipCloud} x */
	R_RelatedChipCloud(x) {this.H_("R_RelatedChipCloud","relatedChipCloudRenderer",x,this.D_RelatedChipCloud);}
	/** @private @arg {D_RelatedChipCloud} x */
	D_RelatedChipCloud(x) {this.y("D_RelatedChipCloud","content",x,this.R_ChipCloud);}
	/** @private @arg {R_ChipCloud} x */
	R_ChipCloud(x) {this.H_("R_ChipCloud","chipCloudRenderer",x,this.D_ChipCloud);}
	/** @private @arg {AD_HideEnclosing} x */
	AD_HideEnclosing(x) {this.y("AD_HideEnclosing","notificationId",x,this.a_primitive_str);}
	/** @private @arg {D_AddToPlaylist} x */
	D_AddToPlaylist(x) {
		const cf="D_AddToPlaylist";
		const {playlists,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(playlists,this.R_PlaylistAddToOption);
		this.z(actions,this.R_AddToPlaylistCreate);
	}
	/** @private @arg {D_ProfileColumn} x */
	D_ProfileColumn(x) {this.z(this.T_Items("D_ProfileColumn",x),this.G_ProfileColumnItem);}
	/** @private @arg {G_ProfileColumnItem} x */
	G_ProfileColumnItem(x) {
		const cf="G_ProfileColumnItem"; this.k(cf,x);
		if("profileColumnStatsRenderer" in x) return this.R_ProfileColumnStats(x);
		if("profileColumnUserInfoRenderer" in x) return this.R_ProfileColumnUserInfo(x);
		this.do_codegen(cf,x); x===0;
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_ProfileColumnStats} x */
	R_ProfileColumnStats(x) {this.H_("R_ProfileColumnStats","profileColumnStatsRenderer",x,this.D_ProfileColumnStats);}
	/** @private @arg {D_ProfileColumnStats} x */
	D_ProfileColumnStats(x) {this.H_("D_ProfileColumnStats","items",x,x => this.z(x,this.R_ProfileColumnStatsEntry));}
	/** @private @arg {R_ProfileColumnStatsEntry} x */
	R_ProfileColumnStatsEntry(x) {this.H_("R_ProfileColumnStatsEntry","profileColumnStatsEntryRenderer",x,this.D_ProfileColumnStatsEntry);}
	/** @private @arg {D_ProfileColumnStatsEntry} x */
	D_ProfileColumnStatsEntry(x) {
		const cf="D_ProfileColumnStatsEntry";
		const {label,value,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(label);
		this.G_Text(value);
	}
	/** @private @arg {R_ProfileColumnUserInfo} x */
	R_ProfileColumnUserInfo(x) {this.H_("R_ProfileColumnUserInfo","profileColumnUserInfoRenderer",x,this.D_ProfileColumnUserInfo);}
	/** @private @arg {D_ProfileColumnUserInfo} x */
	D_ProfileColumnUserInfo(x) {
		const cf="D_ProfileColumnUserInfo";
		const {title,thumbnail,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.R_Thumbnail(thumbnail);
	}
	/** @private @arg {D_BrowseFeedActions} x */
	D_BrowseFeedActions(x) {this.H_("D_BrowseFeedActions","contents",x,x => this.z(x,this.G_BrowseFeedContent));}
	/** @private @arg {R_SearchBox} x */
	R_SearchBox(x) {this.H_("D_ProfileColumn","searchBoxRenderer",x,this.D_SearchBox);}
	/** @private @arg {R_SubFeedSelector} x */
	R_SubFeedSelector(x) {this.H_("R_SubFeedSelector","subFeedSelectorRenderer",x,this.D_SubFeedSelector);}
	/** @private @arg {D_SubFeedSelector} x */
	D_SubFeedSelector(x) {
		const cf="D_SubFeedSelector";
		const {title,options,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.z(options,this.R_SubFeedOption);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_SubFeedOption} x */
	R_SubFeedOption(x) {this.H_("R_SubFeedOption","subFeedOptionRenderer",x,this.D_SubFeedOption);}
	/** @private @arg {D_SubFeedOption} x */
	D_SubFeedOption(x) {
		const cf="D_SubFeedOption";
		const {name,isSelected,navigationEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(name);
		this.a_primitive_bool(isSelected);
		this.E_Watch(navigationEndpoint);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_BrowseFeedContent} x */
	G_BrowseFeedContent(x) {
		const cf="G_BrowseFeedContent"; this.k(cf,x);
		if("searchBoxRenderer" in x) return this.R_SearchBox(x);
		if("subFeedSelectorRenderer" in x) return this.R_SubFeedSelector(x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("compactLinkRenderer" in x) return this.R_CompactLink(x);
		this.do_codegen(cf,x); x===0;
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_WebSearchboxConfig} x */
	D_WebSearchboxConfig(x) {
		const cf="D_WebSearchboxConfig";
		const {requestLanguage: a,requestDomain: b,hasOnscreenKeyboard: c,focusSearchbox: d,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(!this.eq_keys([a,b],["en","ca"])) debugger;
		this.z([!c,d],x => {if(!x) debugger;});
	}
	/** @private @arg {R_Channel_MD} x */
	R_Channel_MD(x) {this.H_("R_Channel_MD","channelMetadataRenderer",x,this.D_Channel_MD);}
	/** @private @arg {R_Playlist_MD} x */
	R_Playlist_MD(x) {this.H_("R_Playlist_MD","playlistMetadataRenderer",x,this.D_Playlist_MD);}
	/** @private @arg {R_AlertWithButton} x */
	R_AlertWithButton(x) {this.H_("R_AlertWithButton","alertWithButtonRenderer",x,this.D_AlertWithButton);}
	/** @private @arg {AD_UpdateChannelSwitcherPage} x */
	AD_UpdateChannelSwitcherPage(x) {this.TA_Page("AD_UpdateChannelSwitcherPage",x,this.R_ChannelSwitcherPage);}
	/** @private @arg {AU_ChannelSwitcherPage} x */
	AU_ChannelSwitcherPage(x) {this.H_("AU_ChannelSwitcherPage","updateChannelSwitcherPageAction",x,this.AD_UpdateChannelSwitcherPage);}
	/** @private @arg {R_ChannelSwitcherPage} x */
	R_ChannelSwitcherPage(x) {this.H_("R_ChannelSwitcherPage","channelSwitcherPageRenderer",x,this.D_ChannelSwitcherPage);}
	/** @private @arg {AD_GetMultiPageMenu} x */
	AD_GetMultiPageMenu(x) {this.H_("AD_GetMultiPageMenu","menu",x,x => this.TR_MultiPageMenu("TR_MultiPageMenu_Empty",x));}
	/** @private @arg {R_MerchandiseShelf} x */
	R_MerchandiseShelf(x) {this.H_("R_MerchandiseShelf","merchandiseShelfRenderer",x,this.D_MerchandiseShelf);}
	/** @private @arg {R_VideoPrimaryInfo} x */
	R_VideoPrimaryInfo(x) {this.H_("R_VideoPrimaryInfo","videoPrimaryInfoRenderer",x,this.D_VideoPrimaryInfo);}
	/** @private @arg {R_VideoSecondaryInfo} x */
	R_VideoSecondaryInfo(x) {this.H_("R_VideoSecondaryInfo","videoSecondaryInfoRenderer",x,this.D_VideoSecondaryInfo);}
	/** @private @arg {R_TopbarMenuButton} x */
	R_TopbarMenuButton(x) {this.H_("R_TopbarMenuButton","topbarMenuButtonRenderer",x,this.D_TopbarMenuButton);}
	/** @private @arg {D_TopbarMenuButton_MenuItem} x */
	D_TopbarMenuButton_MenuItem(x) {
		const cf="D_TopbarMenuButton_MenuItem";
		const {sections,trackingParams,style,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.ceq(sections.length,1);
		let n=this.TR_MP_MenuSection(sections[0]);
		let n1=this.T_Items("R_CompactLink_Items",n);
		this.z(n1,this.R_CompactLink);
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_CREATION") debugger;
	}
	/** @arg {CF_T_Items} cf @template T @private @arg {T_Items<T>} x */
	T_Items(cf,x) {return this.w(`T_Items:${cf}`,"items",x);}
	/** @template T @private @arg {TR_MP_MenuSection<T>} x */
	TR_MP_MenuSection(x) {return x.multiPageMenuSectionRenderer;}
	/** @private @arg {"D_TopbarMenuButton"} cf @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton_Omit(cf,x) {
		const {trackingParams,accessibility,tooltip,...y}=this.s(cf,x);//#destructure
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(tooltip);
		return y;
	}
	/** @private @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton(x) {
		const cf="D_TopbarMenuButton";
		let u=this.D_TopbarMenuButton_Omit(cf,x);
		if("menuRenderer" in u) {
			const {icon,menuRenderer,style,...y}=u; this.g(y);//#destructure
			if(icon.iconType!=="VIDEO_CALL") debugger;
			let uv=this.TR_MultiPageMenu("R_TopbarMenu",menuRenderer);
			this.D_TopbarMenuButton_MenuItem(uv);
			if(style!=="STYLE_DEFAULT") debugger;
			return;
		}
		const {avatar,menuRequest,...y}=u; this.g(y);//#destructure
		this.R_Thumbnail(avatar);
		let res=this.T_SE_Signal(`${cf}.SE_Signal`,menuRequest);
		this.M_AccountMenu(res[0]);
		this.S_GetAccountMenu(res[1]);
	}
	/** @private @arg {M_AccountMenu} x */
	M_AccountMenu(x) {this.T_WCM("M_AccountMenu",x,this.GM_AccountMenu);}
	/** @private @arg {GM_AccountMenu} x */
	GM_AccountMenu(x) {
		const cf="GM_AccountMenu";
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/account/account_menu") debugger;
	}
	/** @private @arg {R_NotificationTopbarButton} x */
	R_NotificationTopbarButton(x) {this.H_("R_NotificationTopbarButton","notificationTopbarButtonRenderer",x,this.D_NotificationTopbarButton);}
	/** @private @arg {D_NotificationTopbarButton} x */
	D_NotificationTopbarButton(x) {
		const cf="D_NotificationTopbarButton";
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(icon.iconType!=="NOTIFICATIONS") debugger;
		let [g_menu,menu_signal]=this.T_SE_Signal(`${cf}.menuRequest.T_SE_Signal`,menuRequest);
		this.M_GetNotificationMenu(g_menu);
		this.Signal_GetNotificationsMenu(menu_signal);
		this.ceq(style,"NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT");
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
		this._primitive_of(tooltip,"string");
		let [m2,s2]=this.T_SE_Signal(`${cf}.U_UnseenCount.T_SE_Signal`,updateUnseenCountEndpoint);
		this.M_GetUnseenNotificationCount(m2);
		this.ceq(s2.signal,"GET_UNSEEN_NOTIFICATION_COUNT");
		this.a_primitive_num(notificationCount);
		this.ceq(handlerDatas.length,1);
		this.ceq(handlerDatas[0],"NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT");
	}
	/** @private @arg {M_GetUnseenNotificationCount} x */
	M_GetUnseenNotificationCount(x) {this.T_WCM("M_GetUnseenNotificationCount",x,this.GM_GetUnseenNotificationCount);}
	/** @private @arg {GM_GetUnseenNotificationCount} x */
	GM_GetUnseenNotificationCount(x) {
		const {sendPost,apiUrl,...y}=this.s("GM_GetUnseenNotificationCount",x); this.g(y);
		if(apiUrl!=="/youtubei/v1/notification/get_unseen_count") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {Signal_GetNotificationsMenu} x */
	Signal_GetNotificationsMenu(x) {
		const cf="Signal_GetNotificationsMenu";
		const {signal,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		const cf="D_NotificationMenuPopupMenuItem";
		const {trackingParams,style,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {G_Action_GetNotificationsMenu_Popup} x */
	G_Action_GetNotificationsMenu_Popup(x) {
		const cf="G_Action_GetNotificationsMenu_Popup";
		const {popup: a,popupType,beReused,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(popupType!=="DROPDOWN") debugger;
		if(beReused!==true) debugger;
		return a;
	}
	/** @private @arg {M_GetNotificationMenu} x */
	M_GetNotificationMenu(x) {const cf="M_GetNotificationMenu",{webCommandMetadata: a,...y}=this.s(cf,x); this.g(y); this.GM_GetNotificationMenu(a);}
	/** @private @arg {GM_GetNotificationMenu} x */
	GM_GetNotificationMenu(x) {
		const cf="GM_GetNotificationMenu";
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(sendPost!==true) debugger;
		if(apiUrl!=="/youtubei/v1/notification/get_notification_menu") debugger;
	}
	/** @private @arg {A_SendFeedback} x */
	A_SendFeedback(x) {let [a,b]=this.TE_Endpoint_2("A_SendFeedback","sendFeedbackAction",x); this.g(b); this.AD_SendFeedback(a);}
	/** @private @arg {AD_SendFeedback} x */
	AD_SendFeedback(x) {const cf="AD_SendFeedback",{bucket,...y}=this.s(cf,x); this.g(y); if(bucket!=="Kevlar") debugger;}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_2<any, "comments-entry-point">>['itemSectionRenderer']['contents'][number]} x */
	R_CommentItemSection_EntryPoint(x) {
		const cf="R_CommentItemSection_EntryPoint";
		if("commentsEntryPointHeaderRenderer" in x) return this.R_CommentsEntryPointHeader(x);
		this.do_codegen(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_CommentsEntryPointHeader} x */
	R_CommentsEntryPointHeader(x) {this.H_("R_CommentsEntryPointHeader","commentsEntryPointHeaderRenderer",x,this.D_CommentsEntryPointHeader);}
	/** @private @arg {D_CommentsEntryPointHeader} x */
	D_CommentsEntryPointHeader(x) {
		const cf="D_CommentsEntryPointHeader";
		const {headerText,onTap,trackingParams,commentCount,contentRenderer,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(headerText);
		this.C_Executor(onTap);
		this.trackingParams(cf,trackingParams);
		this.G_Text(commentCount);
		this.D_CommentsEntryPointHeader_contentRenderer(contentRenderer);
		if(targetId!=="comments-entry-point-header-identifier") debugger;
	}
	/** @private @arg {D_CommentsEntryPointHeader_contentRenderer} x */
	D_CommentsEntryPointHeader_contentRenderer(x) {
		const cf="D_CommentsEntryPointHeader_contentRenderer";
		if("commentsEntryPointTeaserRenderer" in x) return this.R_CommentsEntryPointTeaser(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_CommentsEntryPointTeaser} x */
	R_CommentsEntryPointTeaser(x) {this.H_("R_CommentsEntryPointTeaser","commentsEntryPointTeaserRenderer",x,this.D_CommentsEntryPointTeaser);}
	/** @private @arg {D_CommentsEntryPointTeaser} x */
	D_CommentsEntryPointTeaser(x) {
		const cf="D_CommentsEntryPointTeaser";
		const {teaserAvatar,teaserContent,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure
		if(!teaserAvatar.accessibility) debugger;
		this.R_Thumbnail(teaserAvatar);
		if(!teaserContent.simpleText) debugger;
		this.G_Text(teaserContent);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {S_GetAccountMenu} x */
	S_GetAccountMenu(x) {
		const cf="S_GetAccountMenu";
		const {signal,actions,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(signal!=="GET_ACCOUNT_MENU") debugger;
		let [u]=this.z(actions,x => this.TA_OpenPopup("TA_OpenPopup<D_GetAccountMenu_Popup>",x));
		let [u1]=this.z(u,this.Popup_GetAccountMenu);
		let [u2]=this.z(u1,x => this.TR_MultiPageMenu("TR_MultiPageMenu<MP_AccountMenu>",x));
		this.z(u2,this.MP_AccountMenu);
	}
	/** @private @arg {MP_AccountMenu} x */
	MP_AccountMenu(x) {
		const cf="MP_AccountMenu";
		const {style,trackingParams,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT") debugger;
		this.trackingParams(cf,trackingParams);
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {D_GetAccountMenu_Popup} x */
	Popup_GetAccountMenu(x) {
		const cf="Popup_GetAccountMenu";
		const {popup: a,popupType: b,beReused: c,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(b!=="DROPDOWN") debugger;
		if(c!==true) debugger;
		return a;
	}
	/** @private @arg {R_SectionList} x */
	R_SectionList(x) {this.H_("R_SectionList","sectionListRenderer",x,this.G_SectionList);}
	/** @private @arg {R_EndScreenPlaylist} x */
	R_EndScreenPlaylist(x) {this.H_("R_EndScreenPlaylist","endScreenPlaylistRenderer",x,this.D_EndScreenPlaylist);}
	/** @private @arg {R_EndScreenVideo} x */
	R_EndScreenVideo(x) {this.H_("R_EndScreenVideo","endScreenVideoRenderer",x,this.D_EndScreenVideo);}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("R_AddToPlaylistCreate","addToPlaylistCreateRenderer",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("R_PlaylistAddToOption","playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {AU_SubscribeButton} x */
	AU_SubscribeButton(x) {this.H_("AU_SubscribeButton","updateSubscribeButtonAction",x,this.DAU_SubscribeButton);}
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.H_("C_RunAttestation","runAttestationCommand",x,this.D_RunAttestation);}
	/** @private @arg {R_VideoDescriptionMusicSection} x */
	R_VideoDescriptionMusicSection(x) {this.H_("R_VideoDescriptionMusicSection","videoDescriptionMusicSectionRenderer",x,this.D_VideoDescriptionMusicSection);}
	/** @private @arg {R_VideoDescriptionHeader} x */
	R_VideoDescriptionHeader(x) {this.H_("R_VideoDescriptionHeader","videoDescriptionHeaderRenderer",x,this.D_VideoDescriptionHeader);}
	/** @private @arg {R_HorizontalCardList} x */
	R_HorizontalCardList(x) {this.H_("R_HorizontalCardList","horizontalCardListRenderer",x,this.D_HorizontalCardList);}
	/** @private @arg {R_ExpandableVideoDescriptionBody} x */
	R_ExpandableVideoDescriptionBody(x) {this.H_("R_ExpandableVideoDescriptionBody","expandableVideoDescriptionBodyRenderer",x,this.D_ExpandableVideoDescriptionBody);}
	/** @private @arg {D_ChipCloud} x */
	D_ChipCloud(x) {
		const cf="D_ChipCloud";
		const {chips,trackingParams,horizontalScrollable,nextButton,previousButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(chips,this.R_ChipCloudChip);
		this.trackingParams(cf,trackingParams);
		if(horizontalScrollable!==false) debugger;
		this.z([nextButton,previousButton],this.R_Button);
	}
	/** @private @arg {D_ReelPlayerHeader} x */
	D_ReelPlayerHeader(x) {
		const cf="D_ReelPlayerHeader";
		const {reelTitleText,timestampText,channelNavigationEndpoint,channelTitleText,channelThumbnail,trackingParams,accessibility,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(reelTitleText);
		this.G_Text(timestampText);
		this.E_Browse(channelNavigationEndpoint);
		this.G_Text(channelTitleText);
		this.R_Thumbnail(channelThumbnail);
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibility);
	}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("D_TwoColumnSearchResults","primaryContents",x,this.R_SectionList);}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("D_PlaylistSidebarSecondaryInfo","videoOwner",x,this.R_VideoOwner);}
	/** @private @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe";
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			x;
			debugger;
		});
		this.trackingParams(cf,trackingParams);
		this.A_FrameworkUpdates(frameworkUpdates);
		debugger;
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference";
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			if(!x.openPopupAction) debugger;
			this.g(x.openPopupAction);
		});
		this.trackingParams(cf,trackingParams);
		this.R_EntityBatchUpdate(frameworkUpdates);
		this.D_ChannelId(channelId);
		this.R_SubscriptionNotificationToggleButton(newNotificationButton);
		debugger;
	}
	/** @type {string[]} */
	logged_strings=[];
	/** @private @arg {R_SubscriptionNotificationToggleButton} x */
	R_SubscriptionNotificationToggleButton(x) {this.H_("R_SubscriptionNotificationToggleButton","subscriptionNotificationToggleButtonRenderer",x,this.D_SubscriptionNotificationToggleButton);}
	/** @private @arg {D_SubscriptionNotificationToggleButton} x */
	D_SubscriptionNotificationToggleButton(x) {
		const cf="D_SubscriptionNotificationToggleButton";
		const {states,currentStateId,trackingParams,command,targetId,secondaryIcon,...y}=this.s(cf,x); this.g(y);
		console.groupCollapsed();
		this.z(states,(x,i) => {
			const {nextStateId,stateId,state,...y}=this.s("ToggleButton.state",x); this.g(y);
			if(nextStateId!==stateId) {
				debugger;
			}
			console.log("[button.state_id.%s]",i,stateId);
			this.R_Button(state);
		});
		console.groupEnd();
		if(currentStateId!==2) debugger;
		this.trackingParams(cf,trackingParams);
		this.C_Executor(command);
		if(!this.logged_strings.includes(`${cf}:${targetId}`)) {
			this.logged_strings.push(`${cf}:${targetId}`);
			console.log("[D_SubscriptionNotificationToggleButton.targetId]",targetId);
		}
		if(secondaryIcon.iconType!=="EXPAND_MORE") debugger;
	}
	/** @private @arg {G_CommentsSection} x */
	G_CommentsSection(x) {
		const cf="G_CommentsSection";
		const {...y}=this.s(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ExpandableTab} x */
	D_ExpandableTab(x) {
		const cf="D_ExpandableTab";
		const {endpoint,title,selected,expandedText,content,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.g(endpoint);
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		this.t(expandedText,this.a_primitive_str);
		this.t(content,this.R_SectionList);
		debugger;
	}
	/** @private @arg {D_FeedNudge} x */
	D_FeedNudge(x) {
		const cf="D_FeedNudge";
		const {...y}=this.s(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {R_BrowseFeed} x */
	R_BrowseFeed(x) {
		const cf="R_BrowseFeed";
		const {...y}=this.s(cf,x); this.g(y);
		debugger;
	}
	/** @template {number} T @arg {`${T}`} x */
	parse_number_template(x) {
		/** @type {T} */
		let num=as(parseInt(x,10));
		if(Number.isNaN(num)) {
			debugger;
		}
		return num;
	}
	/** @private @arg {D_EndScreenPlaylist} x */
	D_EndScreenPlaylist(x) {
		const cf="D_EndScreenPlaylist";
		const {playlistId,thumbnail,title,trackingParams,longBylineText,videoCountText,videoCount,navigationEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.playlistId(playlistId);
		this.R_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.G_Text(longBylineText);
		this.G_Text(videoCountText);
		this.t(videoCount,this.parse_number_template);
		this.E_Watch(navigationEndpoint);
	}
	/** @private @arg {D_SearchBox} x */
	D_SearchBox(x) {
		const cf="D_SearchBox";
		const {endpoint,searchButton,clearButton,placeholderText,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.g(endpoint);
		this.R_Button(searchButton);
		this.R_Button(clearButton);
		this.G_Text(placeholderText);
		this.trackingParams(cf,trackingParams);
		debugger;
	}
	/** @private @arg {D_Comment} x */
	D_Comment(x) {
		const cf="D_Comment";
		const {authorText,authorThumbnail,actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,collapseButton,commentId,contentText,currentUserReplyThumbnail,voteCount,isLiked,expandButton,publishedTimeText,voteStatus,trackingParams,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(authorText);
		this.R_Thumbnail(authorThumbnail);
		this.R_CommentActionButtons(actionButtons);
		this.R_Menu(actionMenu);
		this.g(authorEndpoint);
		this.a_primitive_bool(authorIsChannelOwner);
		this.R_Button(collapseButton);
		console.log(`[${cf}.commentId]`,commentId);
		this.G_Text(contentText);
		this.R_Thumbnail(currentUserReplyThumbnail);
		this.G_Text(voteCount);
		this.a_primitive_bool(isLiked);
		this.R_Button(expandButton);
		this.G_Text(publishedTimeText);
		this.ceq(voteStatus,"INDIFFERENT");
		this.trackingParams(cf,trackingParams);
		this.D_LoggingDirectives(loggingDirectives);
		debugger;
	}
	/** @private @arg {R_CommentActionButtons} x */
	R_CommentActionButtons(x) {this.H_("R_CommentActionButtons","commentActionButtonsRenderer",x,this.D_CommentActionButtons);}
	/** @private @arg {D_CommentActionButtons} x */
	D_CommentActionButtons(x) {
		const cf="D_CommentActionButtons";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_LiveChat} x */
	D_LiveChat(x) {
		const cf="D_LiveChat";
		const {...y}=this.s(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_ReportFormModal} x */
	D_ReportFormModal(x) {
		const cf="D_ReportFormModal";
		const {...y}=this.s(cf,x); this.g(y);
		debugger;
	}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader";
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Button(playButton);
		this.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.playlistId(playlistId);
		console.log(`${cf}.privacy`,privacy);
		this.R_Button(shufflePlayButton);
		this.trackingParams(cf,trackingParams);
		this.D_EditableDetails(editableDetails);
		this.E_PlaylistEditor(editorEndpoint);
		this.a_primitive_bool(isEditable);
		this.E_Browse(ownerEndpoint);
		this.z(serviceEndpoints,this.E_PlaylistEdit);
		this.R_Menu(moreActionsMenu);
		this.G_Text(title);
		this.G_Text(numVideosText);
		this.G_Text(descriptionTapText);
		this.ceq(descriptionText,null);
		if(!onDescriptionTap.openPopupAction) debugger;
		this.g(onDescriptionTap.openPopupAction);
		this.D_CanShare(shareData);
		this.z(stats,this.G_Text);
		this.z(briefStats,this.G_Text);
		this.z(byline,this.R_PlaylistByline);
		this.G_Text(ownerText);
		this.G_Text(viewCountText);
		this.R_CinematicContainer(cinematicContainer);
		debugger;
	}
	/** @private @arg {DE_PlaylistEditor} x */
	DE_PlaylistEditor(x) {this.y("DE_PlaylistEditor","playlistId",x,this.playlistId);}
	/** @private @arg {D_EditableDetails} x */
	D_EditableDetails(x) {this.y("D_EditableDetails","canDelete",x,x => this.ceq(x,false));}
	/** @private @arg {D_CanShare} x */
	D_CanShare(x) {this.y("D_CanShare","canShare",x,x => this.ceq(x,false));}
	/** @private @arg {R_HeroPlaylistThumbnail} x */
	R_HeroPlaylistThumbnail(x) {this.H_("R_HeroPlaylistThumbnail","heroPlaylistThumbnailRenderer",x,this.D_HeroPlaylistThumbnail);}
	/** @private @arg {D_HeroPlaylistThumbnail} x */
	D_HeroPlaylistThumbnail(x) {
		const cf="D_HeroPlaylistThumbnail";
		const {thumbnail,maxRatio,trackingParams,onTap,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_PlaylistByline} x */
	R_PlaylistByline(x) {this.H_("R_PlaylistByline","playlistBylineRenderer",x,this.D_PlaylistByline);}
	/** @private @arg {D_PlaylistByline} x */
	D_PlaylistByline(x) {this.y("D_PlaylistByline","text",x,this.G_Text);}
	/** @private @arg {D_WatchEndpointMusicConfig} x */
	D_WatchEndpointMusicConfig(x) {
		const cf="D_WatchEndpointMusicConfig";
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_bool(hasPersistentPlaylistPanel);
		this.ceq(musicVideoType,"MUSIC_VIDEO_TYPE_ATV");
		debugger;
	}
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {
		const cf="A_AddToGuideSection";
		const {clickTrackingParams,addToGuideSectionAction,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.clickTrackingParams(cf,clickTrackingParams);
		this.AD_AddToGuideSection(addToGuideSectionAction);
		debugger;
	}
	/** @private @arg {AD_AddToGuideSection} x */
	AD_AddToGuideSection(x) {
		const cf="AD_AddToGuideSection";
		const {handlerData,items,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_ProductList} x */
	D_ProductList(x) {
		const cf="D_ProductList";
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.R_ProductListItem);
		this.trackingParams(cf,trackingParams);
		debugger;
	}
	/** @private @arg {R_ProductListItem} x */
	R_ProductListItem(x) {this.H_("R_ProductListItem","productListItemRenderer",x,this.D_ProductListItem);}
	/** @private @arg {D_ProductListItem} x */
	D_ProductListItem(x) {
		const cf="D_ProductListItem";
		const {thumbnail,accessibilityTitle,title,trackingParams,price,onClickCommand,loggingDirectives,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_ClipCreation} x */
	D_ClipCreation(x) {
		const cf="D_ClipCreation";
		const {trackingParams,userAvatar,titleInput,scrubber,saveButton,displayName,publicityLabel,cancelButton,adStateOverlay,externalVideoId,publicityLabelIcon,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.R_Thumbnail(userAvatar);
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
	/** @private @arg {R_ClipCreationTextInput} x */
	R_ClipCreationTextInput(x) {this.H_("R_ClipCreationTextInput","clipCreationTextInputRenderer",x,this.D_ClipCreationTextInput);}
	/** @private @arg {D_ClipCreationTextInput} x */
	D_ClipCreationTextInput(x) {
		const cf="D_ClipCreationTextInput";
		const {placeholderText,maxCharacterLimit,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ClipAdState} x */
	R_ClipAdState(x) {this.H_("R_ClipAdState","clipAdStateRenderer",x,this.D_ClipAdState);}
	/** @private @arg {D_ClipAdState} x */
	D_ClipAdState(x) {
		const cf="D_ClipAdState";
		const {title,body,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ClipCreationScrubber} x */
	R_ClipCreationScrubber(x) {this.H_("R_ClipCreationScrubber","clipCreationScrubberRenderer",x,this.D_ClipCreationScrubber);}
	/** @private @arg {D_ClipCreationScrubber} x */
	D_ClipCreationScrubber(x) {
		const cf="D_ClipCreationScrubber";
		const {lengthTemplate,maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs,startAccessibility,endAccessibility,durationAccessibility,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(lengthTemplate!=="$clip_length seconds") debugger;
		let u=this.exact_arr(60000,5000,15000,120000);
		let t=this.exact_arr(maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs);
		if(!this.eq_keys(t,u)) debugger;
		this.z([startAccessibility,endAccessibility,durationAccessibility],this.D_Accessibility);
	}
	/** @private @arg {D_MacroMarkersList} x */
	D_MacroMarkersList(x) {
		const cf="D_MacroMarkersList";
		const {contents,syncButtonLabel,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.R_MacroMarkersListItem);
		this.G_Text(syncButtonLabel);
		this.trackingParams(cf,trackingParams);
		debugger;
	}
	/** @private @arg {D_EngagementPanelTitleHeader} x */
	D_EngagementPanelTitleHeader(x) {
		const cf="D_EngagementPanelTitleHeader";
		const {title,contextualInfo,informationButton,menu,visibilityButton,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.t(contextualInfo,this.G_Text);
		this.t(informationButton,this.R_Button);
		this.t(menu,this.G_EngagementPanelMenu);
		this.R_Button(visibilityButton);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {G_EngagementPanelMenu} x */
	G_EngagementPanelMenu(x) {
		const cf="G_EngagementPanelMenu";
		if("menuRenderer" in x) return this.R_Menu(x);
		if("sortFilterSubMenuRenderer" in x) return this.R_SortFilterSubMenu(x);
		this.do_codegen(cf,x);
		debugger;
	}
	/** @private @arg {D_Hint} x */
	D_Hint(x) {
		const cf="D_Hint";
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.ceq(hintId,"sponsor-pre-purchase");
		this.ceq(dwellTimeMs,"60000");
		this.D_ImpressionCap(hintCap);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ImpressionCap} x */
	D_ImpressionCap(x) {
		const cf="D_ImpressionCap";
		if(this.w(cf,"impressionCap",x)!=="1") debugger;
	}
	/** @private @arg {D_VideoViewCount} x */
	D_VideoViewCount(x) {
		const cf="D_VideoViewCount";
		const {viewCount,shortViewCount,extraShortViewCount,isLive,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(viewCount);
		this.t(shortViewCount,this.G_Text);
		this.t(extraShortViewCount,this.G_Text);
		this.t(isLive,this.a_primitive_bool);
	}
	/** @private @arg {DE_Like} x */
	DE_Like(x) {
		const cf="DE_Like"; this.k(cf,x);
		switch(x.status) {
			case "INDIFFERENT": {
				const cf="E_LikeIndifferent";
				const {status,target,removeLikeParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
				status;
				target;
				this.t(removeLikeParams,x => this.params(cf,"like.removeLikeParams",x));
			} break;
			case "LIKE": {
				const cf="E_LikeLike";
				const {status,target,actions,likeParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
				status;
				target;
				actions;
				this.t(likeParams,x => this.params(cf,"like.likeParams",x));
			} break;
			case "DISLIKE": {
				const cf="E_LikeDislike";
				const {status,target,dislikeParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
				status;
				target;
				this.t(dislikeParams,x => this.params(cf,"like.dislikeParams",x));
			} break;
		}
	}
	/** @private @arg {D_TranscriptSearchPanel} x */
	D_TranscriptSearchPanel(x) {
		const cf="D_TranscriptSearchPanel";
		const {body,footer,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_TranscriptSegmentList(body);
		this.R_TranscriptFooter(footer);
		this.trackingParams(cf,trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
		debugger;
	}
	/** @private @arg {R_TranscriptSegmentList} x */
	R_TranscriptSegmentList(x) {this.H_("R_TranscriptSegmentList","transcriptSegmentListRenderer",x,this.D_TranscriptSegmentList);}
	/** @private @arg {D_TranscriptSegmentList} x */
	D_TranscriptSegmentList(x) {
		const cf="D_TranscriptSegmentList";
		const {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_TranscriptFooter} x */
	R_TranscriptFooter(x) {this.H_("R_TranscriptFooter","transcriptFooterRenderer",x,this.D_TranscriptFooter);}
	/** @private @arg {D_TranscriptFooter} x */
	D_TranscriptFooter(x) {this.H_("D_TranscriptFooter","languageMenu",x,this.R_SortFilterSubMenu);}
	static {/*remove_this_static*/this.prototype.C_RepeatChapter;}
	/** @private @arg {C_RepeatChapter} x */
	C_RepeatChapter(x) {this.TE_Endpoint_2("C_RepeatChapter","repeatChapterCommand",x);}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo";
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
	/** @private @arg {R_PlaylistVideoThumbnail} x */
	R_PlaylistVideoThumbnail(x) {this.H_("R_PlaylistVideoThumbnail","playlistVideoThumbnailRenderer",x,this.D_PlaylistVideoThumbnail);}
	/** @private @arg {D_PlaylistVideoThumbnail} x */
	D_PlaylistVideoThumbnail(x) {
		const cf="D_PlaylistVideoThumbnail";
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Thumbnail(thumbnail);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {DC_Timed} x */
	DC_Timed(x) {
		const cf="DC_Timed";
		const {timeoutMs,continuation,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(timeoutMs!==60000) debugger;
		this.params(cf,"TimedContinuation",continuation);
	}
	/** @private @arg {DC_LiveChat} x */
	DC_LiveChat(x) {
		const cf="DC_LiveChat";
		const {continuations,actionPanel,actions,clientMessages,emojis,header,itemList,ticker,trackingParams,participantsList,popoutMessage,viewerName,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
	/** @private @arg {R_Message} x */
	R_Message(x) {this.H_("R_Message","messageRenderer",x,this.D_Message);}
	/** @private @arg {D_Message} x */
	D_Message(x) {
		const cf="D_Message";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_LiveChatParticipantsList} x */
	R_LiveChatParticipantsList(x) {this.H_("R_LiveChatParticipantsList","liveChatParticipantsListRenderer",x,this.D_LiveChatParticipantsList);}
	/** @private @arg {D_LiveChatParticipantsList} x */
	D_LiveChatParticipantsList(x) {
		const cf="D_LiveChatParticipantsList";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_LiveChatTicker} x */
	R_LiveChatTicker(x) {this.H_("R_LiveChatTicker","liveChatTickerRenderer",x,this.D_LiveChatTicker);}
	/** @private @arg {D_LiveChatTicker} x */
	D_LiveChatTicker(x) {
		const cf="D_LiveChatTicker";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_LiveChatItemList} x */
	R_LiveChatItemList(x) {this.H_("R_LiveChatItemList","liveChatItemListRenderer",x,this.D_LiveChatItemList);}
	/** @private @arg {D_LiveChatItemList} x */
	D_LiveChatItemList(x) {
		const cf="D_LiveChatItemList";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_LiveChatHeader} x */
	R_LiveChatHeader(x) {this.H_("R_LiveChatHeader","liveChatHeaderRenderer",x,this.D_LiveChatHeader);}
	/** @private @arg {D_LiveChatHeader} x */
	D_LiveChatHeader(x) {
		const cf="D_LiveChatHeader";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_LiveChatEmoji} x */
	D_LiveChatEmoji(x) {
		const cf="D_LiveChatEmoji";
		const {isLocked,...y}=this.D_CustomEmoji_Omit(cf,x); this.g(y);//#destructure_off
		this.a_primitive_bool(isLocked);
	}
	/** @private @arg {D_ClientMessages} x */
	D_ClientMessages(x) {this.k("D_ClientMessages",x); this.z(Object.values(x),this.G_Text);}
	/** @private @arg {G_LiveChatContinuationItem} x */
	G_LiveChatContinuationItem(x) {
		const cf="G_LiveChatContinuationItem"; this.k(cf,x);
		if("invalidationContinuationData" in x) return;
		if("liveChatReplayContinuationData" in x) return;
		if("playerSeekContinuationData" in x) return;
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_LiveChatMessageInput} x */
	R_LiveChatMessageInput(x) {this.H_("R_LiveChatMessageInput","liveChatMessageInputRenderer",x,this.D_LiveChatMessageInput);}
	/** @private @arg {D_LiveChatMessageInput} x */
	D_LiveChatMessageInput(x) {
		const cf="D_LiveChatMessageInput";
		this.do_codegen(cf,x);
	}
	/** @private @arg {G_RA_LiveChatContinuationActions} x */
	G_LiveChatContinuationActions(x) {
		const cf="G_LiveChatContinuationActions";
		this.do_codegen(cf,x);
	}
	/** @private @arg {DC_PlaylistPanel} x */
	DC_PlaylistPanel(x) {
		const cf="DC_PlaylistPanel";
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_CommentSimplebox} x */
	D_CommentSimplebox(x) {
		const cf="D_CommentSimplebox";
		const {submitButton,cancelButton,aadcGuidelinesStateEntityKey,authorThumbnail,avatarSize,placeholderText,emojiPicker,trackingParams,emojiButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Button(submitButton);
		this.R_Button(cancelButton);
		this.params(cf,"aadc_guidelines_state_entity_key",aadcGuidelinesStateEntityKey);
		this.R_Thumbnail(authorThumbnail);
		if(avatarSize!=="SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT") debugger;
		this.G_Text(placeholderText);
		this.R_EmojiPicker(emojiPicker);
		this.trackingParams(cf,trackingParams);
		this.R_Button(emojiButton);
	}
	/** @private @arg {R_EmojiPicker} x */
	R_EmojiPicker(x) {this.H_("R_EmojiPicker","emojiPickerRenderer",x,this.D_EmojiPicker);}
	/** @private @arg {D_EmojiPicker} x */
	D_EmojiPicker(x) {
		const cf="D_EmojiPicker";
		this.do_codegen(cf,x);
	}
	/** @protected @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>boolean} f */
	dt(x,f) {if(!x) return; let g=f.call(this,x); if(!g) debugger;}
	/** @private @arg {D_SortFilterSubMenu} x */
	D_SortFilterSubMenu(x) {
		const cf="D_SortFilterSubMenu";
		const {subMenuItems,title,icon,accessibility,tooltip,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(subMenuItems,this.D_ActionSetPlaylistVideoOrder);
		this.t(title,this.a_primitive_str);
		this.dt(icon,x => x.iconType!=="SORT");
		this.t(accessibility,this.D_Accessibility);
		this.t(tooltip,this.a_primitive_str);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_ActionSetPlaylistVideoOrder} x */
	D_ActionSetPlaylistVideoOrder(x) {
		const cf="D_ActionSetPlaylistVideoOrder";
		const {title,selected,continuation,serviceEndpoint,accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {AD_BrowserMediaSession} x */
	AD_BrowserMediaSession(x) {
		const cf="AD_BrowserMediaSession";
		this.do_codegen(cf,x);
	}
	/** @private @arg {D_ToggleMenuServiceItem} x */
	D_ToggleMenuServiceItem(x) {
		const cf="D_ToggleMenuServiceItem";
		const {defaultText,defaultIcon,defaultServiceEndpoint,toggledText,toggledIcon,toggledServiceEndpoint,trackingParams,isToggled,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(defaultText);
		if(defaultIcon.iconType!=="LIBRARY_ADD") debugger;
		this.E_Like(defaultServiceEndpoint);
		this.G_Text(toggledText);
		if(toggledIcon.iconType!=="LIBRARY_REMOVE") debugger;
		this.E_Like(toggledServiceEndpoint);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_bool(isToggled);
		debugger;
	}
	/** @arg {D_CustomEmoji['emojiId']} x */
	parse_emoji_id(x) {
		let eid=split_string_once(x,"/");
		this.D_ChannelId(eid[0]);
		console.log(eid[1]);
		debugger;
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
	 * This might be R_Thumbnail, if the optional properties match,
	 * use that instead of repeating the code
	 * */
	D_EmojiImage(x) {
		const cf="D_EmojiImage";
		const {accessibility,thumbnails,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_Accessibility(accessibility);
		this.z(thumbnails,this.D_ThumbnailItem);
	}
	/** @private @arg {D_PivotButton} x */
	D_PivotButton(x) {
		const cf="D_PivotButton";
		const {thumbnail,onClickCommand,trackingParams,contentDescription,soundAttributionTitle,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Thumbnail(thumbnail);
		this.E_Browse(onClickCommand);
		this.trackingParams(cf,trackingParams);
		this.G_Text(contentDescription);
		this.G_Text(soundAttributionTitle);
	}
	/** @private @arg {D_PlaylistPanelVideo} x */
	D_PlaylistPanelVideo(x) {
		const cf="D_PlaylistPanelVideo";
		const {thumbnail,thumbnailOverlays,title,trackingParams,indexText,videoId,playlistSetVideoId,darkColorPalette,lightColorPalette,longBylineText,shortBylineText,selected,lengthText,menu,navigationEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.G_Text(indexText);
		this.videoId(videoId);
		this.a_primitive_str(playlistSetVideoId);
		this.ceq(darkColorPalette.primaryTitleColor,4294961637);
		this.ceq(darkColorPalette.secondaryTitleColor,4294961637);
		this.ceq(darkColorPalette.section2Color,4294961637);
		this.ceq(darkColorPalette.section4Color,4294961637);
		this.ceq(lightColorPalette.primaryTitleColor,4294961637);
		this.ceq(lightColorPalette.secondaryTitleColor,4294961637);
		this.ceq(lightColorPalette.section2Color,4294961637);
		this.ceq(lightColorPalette.section4Color,4294961637);
		this.G_Text(longBylineText);
		this.G_Text(shortBylineText);
		this.ceq(selected,true);
		this.G_Text(lengthText);
		this.R_Menu(menu);
		this.E_Watch(navigationEndpoint);
	}
	/** @private @arg {D_C4TabbedHeader} x */
	D_C4TabbedHeader(x) {
		const cf="D_C4TabbedHeader";
		const {channelId,title,navigationEndpoint,avatar,banner,badges,headerLinks,subscribeButton,subscriberCountText,tvBanner,mobileBanner,trackingParams,sponsorButton,channelHandleText,videosCountText,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_ChannelId(channelId);
		this.a_primitive_str(title);
		this.E_Browse(navigationEndpoint);
		this.R_Thumbnail(avatar);
		this.R_Thumbnail(banner);
		this.tz(badges,this.RMD_Badge);
		this.R_ChannelHeaderLinks(headerLinks);
		this.R_SubscribeButton(subscribeButton);
		this.G_Text(subscriberCountText);
		this.R_Thumbnail(tvBanner);
		this.R_Thumbnail(mobileBanner);
		this.trackingParams(cf,trackingParams);
		this.t(sponsorButton,this.R_Button);
		this.G_Text(channelHandleText);
		this.G_Text(videosCountText);
	}
	/** @private @arg {R_ChannelHeaderLinks} x */
	R_ChannelHeaderLinks(x) {this.H_("R_ChannelHeaderLinks","channelHeaderLinksRenderer",x,this.D_ChannelHeaderLinks);}
	/** @private @arg {D_ChannelHeaderLinks} x */
	D_ChannelHeaderLinks(x) {
		const cf="D_ChannelHeaderLinks";
		this.zy(cf,"primaryLinks",x,this.D_PrimaryLinkItem);
	}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD";
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(title);
		this.a_primitive_str(description);
		this.a_primitive_str(androidDeepLink);
		this.a_primitive_str(iosAppindexingLink);
		this.ceq(isFamilySafe,true);
		this.a_primitive_str(externalId);
		this.a_primitive_str(androidAppindexingLink);
		this.z(availableCountryCodes,this.a_primitive_str);
		this.R_Thumbnail(avatar);
		this.a_primitive_str(rssUrl);
		this.a_primitive_str(keywords);
		if(ownerUrls.length!==1) debugger;
		let ur=this.parse_with_url_parse(ownerUrls[0]);
		this.ceq(this.str_starts_with("/@",ur.pathname),true);
		this.a_primitive_str(channelUrl);
		this.a_primitive_str(vanityChannelUrl);
		debugger;
	}
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD";
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(title);
		this.a_primitive_str(iosAppindexingLink);
		this.a_primitive_str(androidAppindexingLink);
		debugger;
	}
	/** @private @arg {D_AlertWithButton} x */
	D_AlertWithButton(x) {
		const cf="D_AlertWithButton";
		const {type,text,dismissButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		if(type!=="INFO") debugger;
		this.G_Text(text);
		this.R_Button(dismissButton);
		debugger;
	}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage";
		const {header,targetId,contents,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_ChannelSwitcherHeader(header);
		this.ceq(targetId,"ceq");
		this.z(contents,this.G_ChannelSwitcherContent);
	}
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent"; this.k(cf,x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("accountItem" in x) this.A_AccountItem(x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("R_ChannelSwitcherHeader","channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @private @arg {D_ChannelSwitcherHeader} x */
	D_ChannelSwitcherHeader(x) {
		const cf="D_ChannelSwitcherHeader";
		const {title,button,...y}=this.s(cf,x); this.g(y);//#destructure_off
		title;
		button;
	}
	/** @private @arg {D_MerchandiseShelf} x */
	D_MerchandiseShelf(x) {
		const cf="D_MerchandiseShelf";
		const {title,items,trackingParams,showText,hideText,actionButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(title);
		this.z(items,this.R_MerchandiseItem);
		this.trackingParams(cf,trackingParams);
		this.a_primitive_str(showText);
		this.a_primitive_str(hideText);
		this.R_Menu(actionButton);
	}
	/** @private @arg {R_MerchandiseItem} x */
	R_MerchandiseItem(x) {this.H_("R_MerchandiseItem","merchandiseItemRenderer",x,this.D_MerchandiseItem);}
	/** @private @arg {D_MerchandiseItem} x */
	D_MerchandiseItem(x) {
		const cf="D_MerchandiseItem";
		const {thumbnail,description,title,price,vendorName,trackingParams,buttonText,buttonCommand,accessibilityTitle,buttonAccessibilityText,fromVendorText,additionalFeesText,regionFormat,...y}=this.s(cf,x); this.g(y);//#destructure_off
		thumbnail;
		description;
		title;
		price;
		vendorName;
		trackingParams;
		buttonText;
		buttonCommand;
		accessibilityTitle;
		buttonAccessibilityText;
		fromVendorText;
		additionalFeesText;
		regionFormat;
	}
	/** @private @arg {D_VideoPrimaryInfo} x */
	D_VideoPrimaryInfo(x) {
		const cf="D_VideoPrimaryInfo";
		const {title,trackingParams,viewCount,videoActions,superTitleLink,badges,dateText,relativeDateText,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		const cf="D_VideoSecondaryInfo";
		const {owner,description,subscribeButton,metadataRowContainer,showMoreText,showLessText,trackingParams,defaultExpanded,descriptionCollapsedLines,showMoreCommand,showLessCommand,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.trackingParams(cf,trackingParams);
		this.t(description,this.G_Text);
		this.R_SubscribeButton(subscribeButton);
		this.RMD_RowContainer(metadataRowContainer);
		this.G_Text(showMoreText);
		this.G_Text(showLessText);
		this.R_VideoOwner(owner);
		this.ceq(defaultExpanded,false);
		this._primitive_of(descriptionCollapsedLines,"number");
		this.t(showMoreCommand,this.C_Executor);
		this.t(showLessCommand,this.A_ChangeEngagementPanelVisibility);
	}
	/** @private @arg {RMD_RowContainer} x */
	RMD_RowContainer(x) {this.H_("RMD_RowContainer","metadataRowContainerRenderer",x,this.DMD_RowContainer);}
	/** @private @arg {DMD_RowContainer} x */
	DMD_RowContainer(x) {
		const cf="DMD_RowContainer";
		const {rows,collapsedItemCount,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.tz(rows,this.g);
		this.save_number(`[${cf}.coll_item_count]`,collapsedItemCount);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_VideoOwner} x */
	R_VideoOwner(x) {this.H_("R_VideoOwner","videoOwnerRenderer",x,this.D_VideoOwner);}
	/** @private @arg {D_RefreshPlaylist} x */
	D_RefreshPlaylist(x) {
		const cf="D_RefreshPlaylist"; this.k(cf,x);
		this.do_codegen(cf,x);
	}
	/** @private @arg {"D_VideoOwner"} cf @arg {D_VideoOwner} x */
	D_VideoOwner_Omit(cf,x) {
		const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,navigationEndpoint,...y}=this.s(cf,x);
		this.R_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.G_Text(subscriberCountText);
		this.D_SubscriptionButton(subscriptionButton);
		this.t(membershipButton,this.R_Button);
		this.E_Browse(navigationEndpoint);
		return y;
	}
	/** @private @arg {D_SubscriptionButton} x */
	D_SubscriptionButton(x) {
		const cf="D_SubscriptionButton";
		const {type,subscribed,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.save_string("button.type",type);
		this.t(subscribed,this.a_primitive_bool);
	}
	/** @private @arg {D_VideoOwner} x */
	D_VideoOwner(x) {let u=this.D_VideoOwner_Omit("D_VideoOwner",x); const {badges,...y}=u; this.g(y);}
	/** @private @arg {D_MusicCarouselShelf} x */
	D_MusicCarouselShelf(x) {
		const cf="D_MusicCarouselShelf";
		const {contents,header,trackingParams,itemSize,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.ceq);
		this.g(header);
		this.trackingParams(cf,trackingParams);
		this.ceq(itemSize,"COLLECTION_STYLE_ITEM_SIZE_MEDIUM");
		debugger;
	}
	/** @private @arg {D_MusicShelf} x */
	D_MusicShelf(x) {
		const cf="D_MusicShelf";
		const {contents,title,trackingParams,continuations,shelfDivider,autoReloadWhenEmpty,bottomButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(contents,this.R_MusicResponsiveListItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.z(continuations,this.CD_Reload);
		this.R_MusicShelfDivider(shelfDivider);
		this.ceq(autoReloadWhenEmpty,true);
		this.R_Button(bottomButton);
		debugger;
	}
	/** @private @arg {R_MusicResponsiveListItem} x */
	R_MusicResponsiveListItem(x) {this.H_("R_MusicResponsiveListItem","musicResponsiveListItemRenderer",x,this.D_MusicResponsiveListItem);}
	/** @private @arg {D_MusicResponsiveListItem} x */
	D_MusicResponsiveListItem(x) {
		const cf="D_MusicResponsiveListItem";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_MusicShelfDivider} x */
	R_MusicShelfDivider(x) {this.H_("R_MusicShelfDivider","musicShelfDividerRenderer",x,this.D_MusicShelfDivider);}
	/** @private @arg {D_MusicShelfDivider} x */
	D_MusicShelfDivider(x) {
		const cf="D_MusicShelfDivider";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {CF_DC_Generic_CTP} cf @arg {P_PathRootStr} path @arg {DC_Generic_CTP} x */
	DC_Generic_CTP(cf,path,x) {
		const {continuation,clickTrackingParams,...y}=this.s("DC_Generic_CTP",x); this.g(y);
		this.params(cf,path,continuation);
		this.clickTrackingParams(cf,clickTrackingParams);
	}
	/** @private @arg {CD_Reload} x */
	CD_Reload(x) {this.y("CD_Reload","reloadContinuationData",x,x => this.DC_Generic_CTP("D_CD_Reload","reload.continuation",x));}
	/** @private @arg {D_EndScreenVideo} x */
	D_EndScreenVideo(x) {
		const cf="D_EndScreenVideo";
		const {videoId,shortViewCountText,shortBylineText,thumbnail,thumbnailOverlays,title,trackingParams,lengthInSeconds,lengthText,publishedTimeText,navigationEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_str(videoId);
		this.G_Text(shortViewCountText);
		this.G_Text(shortBylineText);
		this.R_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.G_Text(title);
		this.trackingParams(cf,trackingParams);
		this.t(lengthInSeconds,this.a_primitive_num);
		this.t(lengthText,this.G_Text);
		this.G_Text(publishedTimeText);
		x: {
			let x=navigationEndpoint;
			if("watchEndpoint" in x) {
				this.E_Watch(x); break x;
			}
			if(!x.reelWatchEndpoint) debugger;
		}
	}
	/** @private @arg {G_ThumbnailOverlayItem} x */
	G_ThumbnailOverlayItem(x) {
		const cf="G_ThumbnailOverlayItem"; this.k(cf,x);
		// TODO: #11 Handle thumbnailOverlay Renderers
		// Actually iterate over these renderers
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
		this.do_codegen(`ThumbnailOverlay$${cf}`,x);
		debugger;
	}
	/** @private @arg {R_ThumbnailOverlayInlineUnplayable} x */
	R_ThumbnailOverlayInlineUnplayable(x) {this.H_("R_ThumbnailOverlayInlineUnplayable","thumbnailOverlayInlineUnplayableRenderer",x,this.D_ThumbnailOverlayInlineUnplayable);}
	/** @private @arg {D_ThumbnailOverlayInlineUnplayable} x */
	D_ThumbnailOverlayInlineUnplayable(x) {
		const cf="D_ThumbnailOverlayInlineUnplayable";
		const {...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ThumbnailOverlayEndorsement} x */
	R_ThumbnailOverlayEndorsement(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayEndorsementRenderer",x,this.D_ThumbnailOverlayEndorsement);}
	/** @private @arg {D_ThumbnailOverlayEndorsement} x */
	D_ThumbnailOverlayEndorsement(x) {
		const cf="D_ThumbnailOverlayEndorsement";
		const {text,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ThumbnailOverlayHoverText} x */
	R_ThumbnailOverlayHoverText(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayHoverTextRenderer",x,this.D_ThumbnailOverlayHoverText);}
	/** @private @arg {D_ThumbnailOverlayHoverText} x */
	D_ThumbnailOverlayHoverText(x) {
		const cf="D_ThumbnailOverlayHoverText";
		const {text,icon,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ThumbnailOverlaySidePanel} x */
	R_ThumbnailOverlaySidePanel(x) {this.H_("R_ThumbnailOverlaySidePanel","thumbnailOverlaySidePanelRenderer",x,this.D_ThumbnailOverlaySidePanel);}
	/** @private @arg {D_ThumbnailOverlaySidePanel} x */
	D_ThumbnailOverlaySidePanel(x) {
		const cf="D_ThumbnailOverlaySidePanel";
		const {text,icon,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_ThumbnailOverlayBottomPanel} x */
	R_ThumbnailOverlayBottomPanel(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayBottomPanelRenderer",x,this.D_ThumbnailOverlayBottomPanel);}
	/** @private @arg {D_ThumbnailOverlayBottomPanel} x */
	D_ThumbnailOverlayBottomPanel(x) {this.y("D_ThumbnailOverlayBottomPanel","icon",x,x => this.T_Icon("D_Icon_Mix",x,"MIX"));}
	/** @private @arg {R_ThumbnailOverlayNowPlaying} x */
	R_ThumbnailOverlayNowPlaying(x) {this.H_("R_ThumbnailOverlayNowPlaying","thumbnailOverlayNowPlayingRenderer",x,this.D_ThumbnailOverlayNowPlaying);}
	/** @private @arg {D_ThumbnailOverlayNowPlaying} x */
	D_ThumbnailOverlayNowPlaying(x) {const cf="D_ThumbnailOverlayNowPlaying"; this.y(cf,"text",x,this.G_Text);}
	/** @private @arg {R_ThumbnailOverlayToggleButton} x */
	R_ThumbnailOverlayToggleButton(x) {this.H_("R_ThumbnailOverlayToggleButton","thumbnailOverlayToggleButtonRenderer",x,this.D_ThumbnailOverlayToggleButton);}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon_Check",icon,"CHECK");
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_1";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon_WatchLater",icon,"WATCH_LATER");
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix";
		const {accessibility,icon,tooltip,...y}=this.s(cf,x); this.g(y);
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon:PLAYLIST_ADD_CHECK",icon,"PLAYLIST_ADD_CHECK");
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_2";
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);
		this.D_Accessibility(accessibility);
		this.T_Icon("D_Icon:ADD_TO_QUEUE_TAIL",icon,"ADD_TO_QUEUE_TAIL");
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
		const cf="D_ThumbnailOverlayToggleButton";
		if("toggledServiceEndpoint" in x) {
			const [o1,o2,{isToggled,...y}]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);//#destructure_off
			this.ceq(isToggled,this.false_());
			this.D_ThumbnailOverlayToggleButton_ToggledPrefix_1(o1);
			this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(o2);
			return;
		}
		const [o1,o2,y]=this.D_ThumbnailOverlayToggleButton_Omit(cf,x); this.g(y);//#destructure_off
		this.D_ThumbnailOverlayToggleButton_ToggledPrefix_2(o1);
		this.D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(o2);
	}
	/** @private @arg {R_ThumbnailOverlayResumePlayback} x */
	R_ThumbnailOverlayResumePlayback(x) {this.H_("R_ThumbnailOverlayResumePlayback","thumbnailOverlayResumePlaybackRenderer",x,this.D_ThumbnailOverlayResumePlayback);}
	/** @private @arg {D_ThumbnailOverlayResumePlayback} x */
	D_ThumbnailOverlayResumePlayback(x) {this.y("D_ThumbnailOverlayResumePlayback","percentDurationWatched",x,x => this.save_number("resume_playback.percentDurationWatched",x));}
	/** @arg {string} cf @arg {object} x */
	cfl(cf,x) {
		this.k(cf,x);
		let ka=this.get_keys_of(x).join(); ka;
		console.log(`[gen_new_info.${cf}]`,x);
		this.codegen_new_typedef(cf,x);
		debugger;
	}
	/** @private @arg {R_ThumbnailOverlayTimeStatus} x */
	R_ThumbnailOverlayTimeStatus(x) {this.H_("R_ThumbnailOverlayTimeStatus","thumbnailOverlayTimeStatusRenderer",x,this.D_ThumbnailOverlayTimeStatus);}
	/** @private @arg {D_ThumbnailOverlayTimeStatus} x */
	D_ThumbnailOverlayTimeStatus(x) {
		const cf="D_ThumbnailOverlayTimeStatus";
		const {style,text,...y}=this.s(cf,x);
		switch(style) {
			default: debugger; break;
			case "DEFAULT":
			case "LIVE":
			case "SHORTS":
		}
		if("icon" in y) {
			const {icon,...u}=y; this.g(u);
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
		const cf="D_AddToPlaylistCreate";
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.R_CompactLink(openCreateLink);
		this.R_TextInputFormField(nameInput);
		this.R_Dropdown(privacyInput);
		this.R_Button(createAction);
		this.SE_CreatePlaylist(serviceEndpoint);
		debugger;
	}
	/** @private @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("R_TextInputFormField","textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @private @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField";
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("R_Dropdown","dropdownRenderer",x,this.D_Dropdown);}
	/** @private @arg {D_Dropdown_Privacy} x */
	D_Dropdown(x) {
		const cf="D_Dropdown";
		const {entries,label,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption";
		const {playlistId,title,privacy,containsSelectedVideos,privacyIcon,addToPlaylistServiceEndpoint,removeFromPlaylistServiceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);//#destructure_off
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
		debugger;
	}
	/** @private @arg {DAU_SubscribeButton} x */
	DAU_SubscribeButton(x) {
		const cf="DAU_SubscribeButton";
		const {subscribed,channelId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.a_primitive_bool(subscribed);
		this.D_ChannelId(channelId);
	}
	/** @private @arg {D_RunAttestation} x */
	D_RunAttestation(x) {
		const cf="D_RunAttestation";
		const {ids,engagementType,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(ids,this.A_ExternalChannelId);
		if(engagementType!=="ENGAGEMENT_TYPE_SUBSCRIBE") debugger;
	}
	/** @private @arg {A_ExternalChannelId} x */
	A_ExternalChannelId(x) {
		const cf="A_ExternalChannelId";
		const {externalChannelId,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.D_ChannelId(externalChannelId);
	}
	/** @private @arg {D_VideoDescriptionMusicSection} x */
	D_VideoDescriptionMusicSection(x) {
		const cf="D_VideoDescriptionMusicSection";
		const {sectionTitle,carouselLockups,topicLink,premiumUpsellLink,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(sectionTitle);
		this.z(carouselLockups,this.R_CarouselLockup);
		this.R_TopicLink(topicLink);
		this.G_Text(premiumUpsellLink);
	}
	/** @private @arg {R_TopicLink} x */
	R_TopicLink(x) {this.H_("R_TopicLink","topicLinkRenderer",x,this.D_TopicLink);}
	/** @private @arg {D_TopicLink} x */
	D_TopicLink(x) {
		const cf="D_TopicLink";
		const {thumbnailDetails,title,trackingParams,endpoint,callToActionIcon,...y}=this.s(cf,x); this.g(y);//#destructure_off
		thumbnailDetails;
		title;
		trackingParams;
		endpoint;
		callToActionIcon;
	}
	/** @private @arg {R_CarouselLockup} x */
	R_CarouselLockup(x) {this.H_("R_CarouselLockup","carouselLockupRenderer",x,this.D_CarouselLockup);}
	/** @private @arg {D_CarouselLockup} x */
	D_CarouselLockup(x) {
		const cf="D_CarouselLockup";
		const {infoRows,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_VideoDescriptionHeader} x */
	D_VideoDescriptionHeader(x) {
		const cf="D_VideoDescriptionHeader";
		const {title,channel,views,publishDate,factoid,channelNavigationEndpoint,channelThumbnail,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.G_Text(channel);
		this.G_Text(views);
		this.G_Text(publishDate);
		this.z(factoid,this.R_Factoid);
		this.E_Browse(channelNavigationEndpoint);
		this.R_Thumbnail(channelThumbnail);
	}
	/** @private @arg {R_Factoid} x */
	R_Factoid(x) {const cf="R_Factoid"; this.H_(cf,"factoidRenderer",x,this.D_Factoid);}
	/** @private @arg {D_Factoid} x */
	D_Factoid(x) {
		const cf="D_Factoid";
		const {value,label,accessibilityText,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_HorizontalCardList} x */
	D_HorizontalCardList(x) {
		const cf="D_HorizontalCardList";
		const {cards,trackingParams,header,style,centerItems,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.z(cards,this.R_MacroMarkersListItem);
		this.trackingParams(cf,trackingParams);
		this.R_RichListHeader(header);
		this.ceq(style.styleType,"HORIZONTAL_CARD_LIST_STYLE_TYPE_ENGAGEMENT_PANEL_SECTION");
		this.ceq(centerItems,false);
		debugger;
	}
	/** @private @arg {R_RichListHeader} x */
	R_RichListHeader(x) {this.H_("R_RichListHeader","richListHeaderRenderer",x,this.D_RichListHeader);}
	/** @private @arg {D_RichListHeader} x */
	D_RichListHeader(x) {
		const cf="D_RichListHeader";
		const {title,trackingParams,navigationButton,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {R_MacroMarkersListItem} x */
	R_MacroMarkersListItem(x) {this.H_("R_MacroMarkersListItem","macroMarkersListItemRenderer",x,this.D_MacroMarkersListItem);}
	/** @private @arg {D_MacroMarkersListItem} x */
	D_MacroMarkersListItem(x) {
		const cf="D_MacroMarkersListItem";
		const {title,timeDescription,...y}=this.s(cf,x);
		console.log(`[${cf}.next_key]`,this.get_keys_of(y)[0]);
	}
	/** @private @arg {D_ExpandableVideoDescriptionBody} x */
	D_ExpandableVideoDescriptionBody(x) {
		const cf="D_ExpandableVideoDescriptionBody";
		const {descriptionBodyText,showMoreText,showLessText,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(descriptionBodyText);
		this.G_Text(showMoreText);
		this.G_Text(showLessText);
	}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview";
		const {title,authorThumbnail,authorText,commentOptionRenderers,defaultCommentText,editButton,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);//#destructure_off
		this.G_Text(title);
		this.R_Thumbnail(authorThumbnail);
		this.G_Text(authorText);
		this.z(commentOptionRenderers,this.R_PdgCommentOption);
		this.G_Text(defaultCommentText);
		this.R_Button(editButton);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
	}
	/** @private @arg {R_PdgCommentOption} x */
	R_PdgCommentOption(x) {this.H_("R_PdgCommentOption","pdgCommentOptionRenderer",x,this.D_PdgCommentOption);}
	/** @private @arg {D_PdgCommentOption} x */
	D_PdgCommentOption(x) {
		const cf="D_PdgCommentOption";
		const {commentText,chipRenderer,...y}=this.s(cf,x); this.g(y);//#destructure_off
	}
	/** @private @arg {D_HideEnclosingContainer} x */
	D_HideEnclosingContainer(x) {if(!this.eq_keys(this.get_keys_of(x),["hideEnclosingContainer"])) debugger; let q=Object.values(x); if(q.length!==1) debugger; if(q[0]!==true) debugger;}
	/** @private @arg {DC_SectionList_SearchFeed} x */
	DC_SectionList_SearchFeed(x) {x; debugger;}
	/** @private @arg {R_PlaylistPanel} x */
	R_PlaylistPanel(x) {x; debugger;}
	/** @private @arg {D_PrimaryLinkItem} x */
	D_PrimaryLinkItem(x) {x; debugger;}
	/** @private @arg {A_AccountItem} x */
	A_AccountItem(x) {x; debugger;}
	//#endregion
	//#region TODO_minimal_member_fns
	/** @private @arg {minimal_handler_member} x ! */
	minimal_handler_member_2(x) {x;/*!*/}
	//#endregion
}
//#endregion
//#region exports
export_((exports) => {
	exports.HandleTypes=HandleTypes;
});
//#endregion
//#region Start main
console=typeof window==="undefined"? console:(() => window.console)();
//#endregion
//#endregion
