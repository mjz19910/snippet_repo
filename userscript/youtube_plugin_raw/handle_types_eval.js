import {as_ as as,ServiceMethods,split_string_once} from "./zc_child_modules/YTPlugin_Base_Plugin.user";
import {TypedefGenerator} from "./zc_child_modules/YTPlugin_HandleTypes_Service.user";
import {IndexedDBService} from "./zc_child_modules/YTPlugin_IndexedDB_Service.user";
/** @returns {never} */
function n() {throw new Error("Make never type");}
n;
/** @template CLS_T,CLS_U @extends {ServiceMethods<CLS_T,CLS_U>} */
export class HandleTypesEval_ extends ServiceMethods {
	/** @protected @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a}=this.s("T_UrlWrappedValue",x); return a;}
	/** @protected @arg {CF_TA_Page} cf @template T @arg {T_Page<T>} x @template U @arg {(this:this,x:T)=>U} f */
	TA_Page(cf,x,f) {f.call(this,this.w(`TA_Page:${cf}`,"page",x));}
	/** @protected @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {
		const cf="T_Types";
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @private @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {return as(Number.parseInt(x,10));}
		return parse_number(types,_x);
	}
	/** @protected @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	T_Autoplay(x,f) {
		const cf="T_Autoplay";
		const {autoplay,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,autoplay);
	}
	/** @protected @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	T_SecondaryResults(x,f) {
		const cf="T_SecondaryResults";
		const {secondaryResults,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,secondaryResults);
	}
	/** @protected @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(this:this,x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint(x,f) {
		const cf="TD_ItemSection_2_CommentsEntryPoint";
		const {contents,trackingParams,sectionIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,f);
		this.trackingParams(cf,trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @protected @arg {string} cf @arg {K} k @template {keyof T} K @public @template {{}} T @arg {T} x */
	HD_(cf,k,x) {
		this.k(cf,x);
		let kx=this.get_keys_of(x);
		if(kx.length!==1) debugger;
		if(kx[0]!==k) debugger;
	}
	/** @protected @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	T_Playlist(x,f) {
		const cf="T_Playlist";
		const {playlist,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		f.call(this,playlist);
	}
	/** @protected @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
	T_ShortsSurfaceIdentifier(x) {
		const cf="T_ShortsSurfaceIdentifier"; this.k(cf,x);
		const {surface,tag,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		switch(tag) {
			case "engagement-panel-structured-description": break;
			case "shorts-comments-panel": break;
			default: debugger; break;
		}
		return tag;
	}
	/** @protected @arg {CF_TD_ItemSection_3} cf1 @template CT,T,U @arg {TD_ItemSection_3<CT,T,U>} x @returns {[contents,sectionIdentifier,targetId]|null} */
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
	/** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x */
	TR_ItemSection_2(x) {return this.wn("TR_ItemSection_2",x,"itemSectionRenderer");}
	/** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x */
	TR_ItemSection_3(x) {return this.wn("TR_ItemSection_3",x,"itemSectionRenderer");}
	/** @protected @arg {CF_T_Icon} cf1 @template {string} T @arg {T_Icon<T>} x @arg {T} w */
	T_Icon(cf1,x,w) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		if(iconType!==w) debugger;
		this.save_string(`[${cf1}.IconType]`,iconType);
	}
	/** @protected @template T,U @arg {T_Item<T>} x @arg {(this:this,x:T)=>U} f */
	T_Item(x,f) {this.y("T_Item","item",x,f);}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		f.call(this,a);
	}
	/** @protected @arg {boolean} x */
	a_primitive_bool(x) {if(typeof x!=="boolean") debugger;}
	/** @protected @template {CF_T_Commands} T_CF @arg {T_CF} cf @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(cf,x,f) {this.z(this.w(`T_Commands:${cf}`,"commands",x),f);}
	/** @protected @template T @arg {CF_T_WCM_Unpack} cf @arg {{webCommandMetadata: T}} x */
	unpack_T_WCM(cf,x) {return this.w(`Unpack:T_WCM:${cf}`,"webCommandMetadata",x);}
	/** @protected @arg {CF_TE_Endpoint_Opt_3} cf @template {EPL} EP_Key @template {TE_Endpoint_Opt_3<EP_Key,any,any>} T_EP @arg {EP_Key} k @arg {T_EP} x @returns {[T_EP["commandMetadata"],T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|EP_Key>]} */
	TE_Endpoint_Opt_3(cf,k,x) {
		const {clickTrackingParams,commandMetadata,[k]: endpoint,...y}=this.s_priv(`TE_Endpoint_Opt_3:${cf}`,x);
		/** @type {`${CF_TE_Endpoint_Opt_3}.endpoint`} */
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		return [commandMetadata,endpoint,y];
	}
	/** @protected @arg {D_PlaylistId} x */
	playlistId(x) {this.parser.parse_playlist_id(x);}
	/** @protected @arg {CF_T_Icon_Any} cf1 @template {string} T @arg {T_Icon<T>} x @arg {T[]} ty_arr */
	T_Icon_AnyOf(cf1,x,ty_arr) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:any:${cf1}`,x); this.g(y);/*#destructure_done*/
		const is_missing_iconType=!ty_arr.includes(iconType);
		if(is_missing_iconType) {console.log(`[missing_icon.${cf1}]`,iconType);}
		this.save_string("[IconType]",iconType);
		return is_missing_iconType;
	}
	/** @protected @arg {string} x */
	a_primitive_str(x) {this._primitive_of(x,"string");}
	/** @protected @arg {{v:string}} x */
	put_video_args(x) {this.indexed_db.put("video_id",x);}
	/** @protected @arg {string} x */
	videoId(x) {
		if(!this.is_normal_service(this)) return;
		this.a_primitive_str(x);
		this.put_video_args({v: x});
	}
	/** @protected @arg {CF_T_WCM} cf @template T @template U @arg {{webCommandMetadata:T;}} x @arg {(this:this,x:T)=>U} f */
	T_WCM(cf,x,f) {this.y(`T_WCM:${cf}`,"webCommandMetadata",x,f);}
	/** @protected @arg {CF_L_Params} root @arg {P_PathRootStr} path @arg {string} x */
	params(root,path,x) {
		/** @type {number[]} */
		let map_entry_key_path=[];
		this.parser.on_endpoint_params(root,path,map_entry_key_path,x,this.on_endpoint_params_callback.bind(this));
	}
	/** @protected @arg {P_PathRootStr} sec @template {CF_D_Params} T_CF @arg {T_CF} cf @template {string} T @arg {{params:T;}} x */
	D_Params(cf,x,sec) {const {params: p,...y}=this.s_priv(`D_Params:${cf}`,x); this.g(y); this.params(`${cf}.params`,sec,p);}
	/** @private @template {{}} T @arg {CF_M_s_priv} cf @arg {T} x */
	s_priv(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @protected @arg {CF_TA_OpenPopup} cf1 @template T @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(cf1,x) {
		const cf2="TA_OpenPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(`${cf1}.tracking`,clickTrackingParams);
		return a;
	}
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
	/** @protected @arg {string} cf @arg {{}} x */
	g_k=(cf,x) => this.k(cf,x);
	/** @protected @arg {CF_L_TP_Params} cf @arg {string} x */
	trackingParams(cf,x) {cf; x; throw new Error();}
	/** @protected @arg {CF_L_CTP_Params} cf @arg {string} x */
	clickTrackingParams(cf,x) {cf; x; throw new Error();}
	/** @typedef {`${string}${D_EndpointLikeEndings}`} EPL */
	/**
	 * @arg {CF_TE_Endpoint_2} cf1
	 * @template {Extract<keyof T_EP,EPL>} EP_Key @template {TE_Endpoint_2<EPL,{}>} T_EP @arg {T_EP} x @arg {EP_Key} k
	 * @returns {[T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|EP_Key>]}
	 * */
	TE_Endpoint_2(cf1,k,x) {cf1; k; x; throw new Error();}
	/**
	 * @protected
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
	/** @protected @arg {CF_TR_MultiPageMenu} cf @template T @arg {TR_MultiPageMenu<T>} x @returns {T} */
	TR_MultiPageMenu(cf,x) {cf; x; throw new Error();}
	/** @protected @arg {CF_M_w} cf @arg {SI} k @template {T_DistributedKeyof<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {T[SI]} */
	w(cf,k,x,excl=[]) {cf; k; x; excl; throw new Error();}
	/** @protected @template {CF_M_y} T_CF  @arg {T_CF} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K],cf:`${T_CF}.${K}`)=>U} f @returns {U} */
	y(cf,k,x,f) {cf; k; x; f; throw new Error();}
	/** @type {IndexedDBService} */
	get indexed_db() {throw new Error();}
	/** @protected @arg {G_Text} x */
	G_Text(x) {x;}
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
	/** @protected @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x @arg {(this:this,x:T[K])=>U} f */
	H_(cf,k,x,f) {
		if(!x) {debugger; return;}
		let wr=this.wn(cf,x,k);
		if(!wr) return;
		return f.call(this,wr);
	}
	/** @protected @arg {string} a @arg {{}} b */
	k=(a,b) => this.save_keys(`[${a}]`,b);
	/** @protected @template {{}} T @arg {CF_M_s} cf @arg {T} x */
	s(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @type {TypedefGenerator} */
	get generate_typedef() {
		throw new Error();
	}
	/** @template {"DE_VE3832_Watch"} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root */
	on_player_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		map_entry_values; map_entry_key_path; path; map_keys; root;
	}
	/** @template {CF_L_Params} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root @returns {void} */
	on_endpoint_params_callback(map_entry_values,map_entry_key_path,path,map_keys,root) {
		map_entry_values; map_entry_key_path; path; map_keys; root;
	}
	/** @protected @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next(root,path,map_entry_key_path,tva,callback) {
		root; path; map_entry_key_path; tva; callback;
	}
	/** @protected @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {x;}
	/** @protected @arg {D_YtConfig} x */
	D_YtConfig(x) {x;}
	/** @protected */
	gk=this.get_keys_of;
	// /** @protected @arg {D_CF_D_Params} cf @template U @template {string} T @arg {{params:T;}} x @arg {(this:this,x:DC_Params['params'],cf:string)=>U} f */
	// D_Params(cf,x,f) {const {params: p,...y}=this.s(`D_CF_D_Params:${cf}`,x); this.g(y); return f.call(this,x.params,cf);}
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s_priv(cf,x) {this.s(cf,x);}
	// /** @protected @template {{}} T @arg {D_CF_s} cf @arg {T} x @returns {T} */
	// s(cf,x) {cf; x; n();}
	// /** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Command_TP(x,f) {x; f;}
	// /** @protected @template CT,T,U @arg {TR_ItemSection_3<CT,T,U>} x @returns {TD_ItemSection_3<CT, T, U>} */
	// TR_ItemSection_3(x) {x; n();}
	// /** @protected @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x @returns {TD_ItemSection_2<T, "comments-entry-point">} */
	// TR_ItemSection_2(x) {x; n();}
	// /** @protected @template {{}} T @arg {TD_ItemSection_2<T,"comments-entry-point">} x @arg {(x:T)=>void} f */
	// TD_ItemSection_2_CommentsEntryPoint(x,f) {x; f; n();}
	// /** @protected @template T @arg {T_SecondaryResults<T>} x @arg {(this:this,x:T)=>void} f */
	// T_SecondaryResults(x,f) {x; f;}
	// /** @protected @template T @arg {T_Playlist<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Playlist(x,f) {x; f;}
	// /** @protected @template T @arg {T_Autoplay<T>} x @arg {(this:this,x:T)=>void} f */
	// T_Autoplay(x,f) {x; f;}
	// /** @protected @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	// T_Types(x,_x=null) {x; n();}
	// /** @protected @template U @template {T_DistributedKeyof<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>U} f @returns {U} */
	// H_(cf,x,f) {cf; x; f; n();}
	// /** @protected @arg {G_Text} x */
	// G_Text(x) {x;}
}
