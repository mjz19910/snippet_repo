// ==UserScript==
// @name	YTPlugin Parser Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Parser_Service.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Parser_Service.user.js
// ==/UserScript==

const __module_name__="mod$ParserService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const as=bs.as_;
const split_string=bs.split_string;
const split_string_once=bs.split_string_once;
const MyReader=bs.MyReader;
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
const seen_map=new Set;
if(__yt_plugin_log_imports__) console.log("Load Parser Service");
/** @template T @arg {T|undefined} x @returns {T} */
function required(x) {
	if(x===void 0) {throw new Error("missing required");}
	return x;
}
const BaseService=required(store["mod$YoutubePluginBase"]).BaseService;
/** @extends {BaseService<LoadAllServices,ServiceOptions>} */
class ParserService extends BaseService {
	log_playlist_parse=false;
	/** @api @public @arg {YTNavigateFinishDetail['pageType']} x */
	parse_page_type(x) {
		switch(x) {
			default: debugger; break;
			case "browse": break;
			case "channel": break;
			case "playlist": break;
			case "search": break;
			case "settings": break;
			case "shorts": break;
			case "watch": break;
		}
	}
	/** @api @public @arg {D_PlaylistId} x */
	parse_playlist_id(x) {
		if(x===void 0) {debugger; return;}
		x: {
			switch(x) {
				case "LL": break;
				case "WL": break;
				default: break x;
			}
			return;
		}
		if(this.str_starts_with_r(x,"PL")) {
			let pl=x.slice(2);
			switch(pl.length) {case 32: return;}
			console.log("[parse_playlist]",pl.length,pl);
			return;
		}
		if(this.str_starts_with_r(x,"RDMM")) {
			let pl=x.slice(4);
			if(pl.length===11) return;
			console.log("[parse_playlist_radio_mm]",pl.length,pl);
			return;
		}
		if(this.str_starts_with_r(x,"RD")) {
			let pl=x.slice(2);
			if(this.log_playlist_parse) console.log("[parse_playlist_radio]",pl.length,pl);
			return;
		}
		console.log("[new_parse_playlist_id]",x);
		{debugger;}
	}
	/** @private @template {`${U}${string}${U}`} I @template {string} U @arg {I} x @arg {U} _w @returns {I extends `${U}${infer V}${U}`?V:never} */
	extract_inner(x,_w) {
		/** @private @type {any} */
		let ac=x.slice(1,-1);
		return ac;
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} u @returns {x is `${string}${U}${string}`|`${U}${string}`|`${string}${U}`} */
	str_has_sep(x,u) {return x.includes(u);}
	/** @console_api @public @arg {G_MimeTypeFormat} x */
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
		{debugger;}
	}
	/** @private @arg {G_CodecType} x */
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
	str_starts_with_at_1(x,w) {return this.str_starts_with_rx(x[1],w);}
	/** @private @template {string[]} T @template {string} U @arg {U} w @arg {T} x @returns {x is [`${U}${string}`,...string[]]} */
	str_starts_with_at_0(x,w) {return this.str_starts_with_rx(x[0],w);}
	/** @private @arg {`query=${string}`} x */
	parse_channel_search_url(x) {
		let sp=this.parse_url_search_params(x);
		if(!this.eq_keys(this.get_keys_of(sp),["query"])) debugger;
		console.log("[found_search_query]",sp.query);
	}
	/** @private @arg {Extract<NS_DP_Parse.ParseUrlStr_2,[`@${string}`,any]>[1]} x */
	parse_channel_section_url(x) {
		if(!this.str_is_search(x)) {return this.parse_channel_section(["channel",x]);}
		let a=split_string(x,"?");
		switch(a[0]) {
			case "search": this.parse_channel_search_url(a[1]); break;
			default: debugger; break;
		}
	}
	/** @private @arg {NS_DP_Parse.ParseUrlStr_2} x */
	parse_url_3(x) {
		if(this.str_starts_with_at_0(x,"@")) {
			this.parse_channel_section_url(x[1]);
			return;
		}
		switch(x[0]) {
			case "feed": return this.parse_feed_url(x);
			case "shorts": return this.parse_shorts_url(x);
			case "channel": return this.parse_channel_url(x);
			case "youtubei": return this.parse_youtube_url_2(x);
			case "api": return this.parse_api_url(x);
			default: debugger; return;
		}
	}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["api",...any]>} x */
	parse_api_url(x) {
		let a=split_string_once(x[1],"/");
		switch(a[0]) {case "stats": this.parse_api_stats_url(a[1]); break;}
	}
	/** @private @arg {NS_DP_Parse.ParseApiUrlStr} x */
	parse_api_stats_url(x) {
		const cf="parse_api_stats_url";
		let a=split_string_once(x,"?");
		switch(a[0]) {
			case "ads": {
				/** @private @type {D_ApiStatsAdsStr} */
				let sp=as(a[1]);
				let {...v}=this.parse_url_search_params(sp);
				this.save_keys(`[${cf}.ads]`,v);
				// spell:disable-next
				const {ver,ns,event,device,content_v,el,ei,devicever,bti,break_type,conn,cpn,lact,m_pos,mt,p_h,p_w,rwt,sdkv,slot_pos,vis,vol,wt,sli,slfs,loginael,...y}/*!*/=v; this.g(y);
			} break;
			default: debugger; break;
		}
	}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["channel",...any]>} x */
	parse_channel_url(x) {
		if(this.str_starts_with_at_1(x,"UC")) {return;}
		console.log("[parse_channel_url]",x);
	}
	/** @unused_api @protected @arg {`UC${string}`} x */
	parse_channel_id(x) {
		if(this.str_starts_with_r(x,"UC")) {return;}
		{debugger;}
	}
	/** @private @arg {NS_DP_Parse.ParseUrlStr_1} x */
	parse_youtube_url_2(x) {
		let [,a]=x;
		this.parse_youtube_url_4(a);
	}
	/** @private @arg {NS_DP_Parse.ParseUrlStr_3} x */
	parse_youtube_url_4(x) {
		let a=split_string_once(x,"/");
		if(a[0]!=="v1") debugger;
		let [,b]=a;
		if(this.str_has_sep(b,"/")) {return this.parse_youtube_api_url_5(b);}
		this.get_yt_url_type(["youtubei","v1",b]);
	}
	/** @private @arg {NS_DP_Parse.ParseUrlStr_4} x */
	parse_youtube_api_url_5(x) {
		let a=split_string_once(x,"/");
		this.get_yt_url_type(["youtubei","v1",...a]);
	}
	/** @api @public @arg {string} x */
	parse_video_id(x) {this.x.get("indexed_db").put("video_id",{v: x});}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {this.x.get("indexed_db").put("video_id",{v: x[1]});}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["feed",any]>} x */
	parse_feed_url(x) {
		let [,a]=x;
		if(this.str_is_search(a)) {return;}
		switch(a) {case "history": return;}
		switch(a) {case "library": return;}
		switch(a) {case "subscriptions": return;}
		switch(a) {
			case "what_to_watch": return;
			default: debugger; return;
		}
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {return x.includes("?");}
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
	parse_guide_entry_id(x) {
		/** @private @type {G_UrlInfoItem[]} */
		let arr=[];
		if(this.str_starts_with_r(x,"RD")) {arr.push({_tag: "playlist",type: "RD",id: x.slice(2)});} else {
			console.log(x);
			debugger;
		}
		this.log_url_info_arr(arr);
	}
	log_start_radio=false;
	/** @private @arg {CF_L_TP_Params} root @arg {Extract<T_SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url(root,x) {
		let vv=split_string(x,"&");
		/** @private @type {G_UrlInfoItem[]} */
		let url_info_arr=[];
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @private @type {T_SplitOnce<typeof prop,"=">} */
			let res=split_string_once(prop,"=");
			switch(res[0]) {
				case "v": {
					let value=res[1];
					url_info_arr.push({_tag: "video",id: value});
				} break;
				case "list": {
					let v=res[1];
					if(this.str_starts_with_rx("RD",v)) {
						if(this.str_starts_with_rx("RDMM",v)) {url_info_arr.push({_tag: "playlist",type: "RDMM",id: v.slice(4)});} else if(this.str_starts_with_rx("RDGM",v)) {url_info_arr.push({_tag: "playlist",type: "RDGM",id: v.slice(4)});} else if(this.str_starts_with_rx("RDCM",v)) {
							// url_info[playlist] "RDCM" still needs a valid `UC${string}` channel id
							url_info_arr.push({_tag: "playlist",type: "RDCM",id: v.slice(4)});
						} else {url_info_arr.push({_tag: "playlist",type: "RD",id: v.slice(2)});}
					} else if(this.str_starts_with_rx(v,"PL")) {url_info_arr.push({_tag: "playlist",type: "PL",id: v.slice(2)});} else {debugger;}
				} break;
				case "rv": url_info_arr.push({_tag: "video-referral",id: res[1]}); break;
				case "pp": {this.on_player_params(root,"watch_page_url.pp",res[1],x => {x;});} break;
				case "start_radio": {if(this.log_start_radio) console.log("[playlist_start_radio]",res[1]);} break;
				case "index": {
					if(this.cache_playlist_index.includes(res[1])) break;
					this.cache_playlist_index.push(res[1]);
					if(this.log_playlist_index) console.log("[playlist_index]",res[1]);
				} break;
				case "t": url_info_arr.push({_tag: "video-referral",id: res[1]}); break;
				case "playnext": url_info_arr.push({_tag: "play-next",value: res[1]}); break;
				default: res[0]===""; debugger;
			}
		}
		this.log_url_info_arr(url_info_arr);
	}
	/** @console_api @public @arg {string} x */
	create_param_map_dbg(x) {
		{debugger;}
		let res_e=this._decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {return null;}
		return this.make_param_map(res_e);
	}
	/** @private @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} param_map @arg {T_ParseCallbackFunction<T>} callback */
	parse_get_transcript(root,path,map_entry_key_path,param_map,callback) {
		this.parse_endpoint_param(root,path,map_entry_key_path,new Map(param_map),callback);
		/** @private @type {V_ParamMapValue[]} */
		let transcript_args=[];
		let pMap=param_map;
		/** @private @arg {number} x */
		function convert_param(x) {
			if(x<=0) {debugger; return;}
			let pf=pMap.get(x);
			if(pf) {
				if(pf.length!==1) debugger;
				transcript_args[x-1]=pf[0];
			}
		}
		this.z([1,2,3,5,6,7,8],a => convert_param(a));
		/** @private @type {{videoId:string,langParams:string,unk3:1,targetId:"engagement-panel-searchable-transcript-search-panel",unk6:1,unk7:1,unk8:1}|null} */
		let transcript_args_dec=null;
		let p0=transcript_args[0];
		let p1=transcript_args[1];
		let p2=transcript_args[2];
		let p4=transcript_args[4];
		let p5=transcript_args[5];
		let p6=transcript_args[6];
		let p7=transcript_args[7];
		x: if(
			typeof p0=='string'&&typeof p1=='string'
			&&p2===1
			&&typeof p4=='string'
			&&p5===1&&p6===1&&p7===1
		) {
			switch(p4) {
				case "engagement-panel-searchable-transcript-search-panel": break;
				default: debugger; break x;
			}
			transcript_args_dec={
				videoId: p0,
				langParams: p1,
				unk3: p2,
				targetId: p4,
				unk6: p5,
				unk7: p6,
				unk8: p7
			};
		}
		x: if(transcript_args_dec) {
			let param_1=decodeURIComponent(transcript_args_dec.langParams);
			let param_buf_1=this._decode_b64_url_proto_obj(param_1);
			if(param_buf_1===null) {debugger; break x;}
			let param_map_1=this.make_param_map(param_buf_1);
			if(!param_map_1) {debugger; break x;}
			let lp_p1=param_map_1.get(1);
			let lp_p2=param_map_1.get(2);
			let lp_p3=param_map_1.get(3);
			y: if(lp_p1&&lp_p2&&typeof lp_p1==='string'&&typeof lp_p2==='string'&&lp_p3 instanceof Map) {
				if(lp_p1!=="asr") break y;
				if(lp_p2!=="en") break y;
				if(lp_p3.size!==0) break y;
				return;
			}
			y: if(lp_p1!==void 0&&lp_p2!==void 0&&lp_p3!==void 0) {
				c: if(lp_p1 instanceof Map) {
					if(lp_p1.size===0) break c;
					let lp_p1_=this.to_param_obj(lp_p1);
					console.log("[lp_p1_]",lp_p1_);
					break y;
				}
				c: if(typeof lp_p2==='string') {
					if(lp_p2==="en") break c;
					console.log("[lp_p2]",lp_p2);
					break y;
				}
				c: if(lp_p3 instanceof Map) {
					if(lp_p3.size===0) break c;
					let lp_p3_=this.to_param_obj(lp_p3);
					console.log("[lp_p3_]",lp_p3_);
					break y;
				}
				return;
			}
			console.log("[get_transcript_args]",transcript_args_dec);
			let param_obj_1=this.to_param_obj(param_map_1);
			console.log("[new_get_transcript_endpoint_param_inner]",param_obj_1);
			debugger;
			return;
		}
		if(transcript_args_dec) {console.log("[get_transcript_args]",transcript_args_dec);}
		let param_obj=this.to_param_obj(param_map);
		console.log("[new_get_transcript_endpoint_params]",param_obj);
		{debugger;}
	}
	/** @api @public @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {string} x @arg {T_ParseCallbackFunction<T>} params_callback */
	on_endpoint_params(root,path,map_entry_key_path,x,params_callback) {
		if(x===void 0) {debugger; return;}
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		switch(root) {
			case "D_TemplateUpdate": {
				let buffer=bs.base64_url_dec.decodeByteArray(x);
				if(!buffer) return;
				let reader=new MyReader(buffer);
				reader.pos+=1;
				let res_e=reader.try_read_any();
				if(!res_e) return;
				let [_ru,...ex]=res_e;
				let bi=ex[0];
				if(bi[0]==="data64") {
					let ui=bi[3];
					let rem=ui%300n;
					if(rem>0n) debugger;
					let nu=Number(ui/300n)/1000;
					console.log("[TemplateTime]",nu);
				}
				let param_map=this.make_param_map(res_e);
				this.parse_endpoint_param(root,path,map_entry_key_path,new Map(param_map),params_callback);
				return;
			}
		}
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		switch(root) {case "DE_GetTranscript": return this.parse_get_transcript(root,path,map_entry_key_path,param_map,params_callback);}
		this.parse_endpoint_param(root,path,map_entry_key_path,new Map(param_map),params_callback);
	}
	/** @api @public @template {CF_L_TP_Params} T @arg {T} root @arg {P_ParamParse} path @arg {string} x @arg {T_ParseCallbackFunction<T>} callback */
	on_player_params(root,path,x,callback) {
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_player_param(root,path,param_map,callback);
	}
	parse_key_index=1;
	/** @unused_api @protected @arg {V_ParamMapType} x @arg {number[]} mk @arg {number} ta */
	remove_key(x,mk,ta) {
		x.delete(ta);
		let idx=mk.indexOf(ta);
		if(idx>-1) mk.splice(idx,1);
	}
	/** @private @type {P_LogItems} */
	/** @api @public @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]|undefined} map_entry_values @arg {T_ParseCallbackFunction<T>} callback */
	parse_value(root,path,map,map_keys,map_entry_key_path,map_entry_values,callback) {
		let last_key=map_entry_key_path.at(-1);
		let saved_map_keys=map_keys.slice();
		if(map_entry_values!==void 0&&last_key) {
			map.delete(last_key);
			let cx=map_keys.indexOf(last_key);
			if(cx>-1) map_keys.splice(cx,1);
			callback(map_entry_values,map_entry_key_path,path,saved_map_keys,root);
		}
	}
	/** @unused_api @protected @arg {V_ParamMapValue} map_entry_value */
	mapper_use(map_entry_value) {
		/** @private @arg {V_ParamMapValue} e */
		let mapper=e => {
			if(e instanceof Map) {
				let min_=Math.min(...e.keys());
				let len=Math.max(...e.keys());
				let x2=this.to_param_obj(e);
				let c3={
					...x2,
					length: len+1,
				};
				return Array(min_).concat(Array.from(c3).map((_u,j) => e.get(j)).slice(min_));
			}
			return e;
		};
		let xx=mapper(map_entry_value);
		if(xx instanceof Array) {return xx.map(mapper);} else {return xx;}
	}
	/** @unused_api @protected @arg {string[]} x */
	report$params(x) {this.save_string("[report.params.path]",x.join("$"));}
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_number(`[${path}]`,x[1]);
		this.save_string(`[${path}]`,`${x[2]}n`);
	}
	/** @private @template {CF_L_TP_Params|CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} mk @arg {T_ParseCallbackFunction<T>} callback */
	make_parse_key(root,path,map,mk,callback) {
		/** @private @arg {number[]} map_entry_key_path */
		let parse_key=(map_entry_key_path) => {
			let t_at=map_entry_key_path.at(-1);
			if(t_at===void 0) return;
			this.parse_value(root,path,map,mk,map_entry_key_path,map.get(t_at),callback);
		};
		return parse_key;
	}
	/** @private @template {CF_L_TP_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_player_param(root,path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,mk,callback);
		for(let i=1;i<72;i++) {
			if(!mk.includes(i)) continue;
			parse_key([i]);
		}
		parse_key([72]);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		{debugger;}
	}
	/** @api @public @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_endpoint_param(root,path,map_entry_key_path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,mk,callback);
		for(let i=1;i<40;i++) {
			if(!mk.includes(i)) continue;
			map_entry_key_path.push(i);
			parse_key(map_entry_key_path);
			map_entry_key_path.pop();
		}
		// endpoint.create_playlist.params
		this.parse_value(root,path,map,mk,[...map_entry_key_path,77],map.get(77),map_entry_value => {
			if(map_entry_value.length===1&&typeof map_entry_value[0]==="string") {
				let bt=this.decode_browse_id(map_entry_value[0]);
				if(!bt) {debugger; return;}
				return this.parse_browse_id(bt);
			}
			debugger;
		});
		for(let i=1;i<300;i++) {
			if(!mk.includes(i)) continue;
			parse_key([i]);
		}
		if(this.eq_keys(mk,[])) return;
		let param_obj=this.to_param_obj(map);
		console.log(`[endpoint.${path}] [idx=${key_index}]`,param_obj);
		{debugger;}
	}
	/** @private @arg {V_ParamMapType} x @returns {D_ParamObjType} */
	to_param_obj(x) {
		return Object.fromEntries([...x.entries()].map(e => {
			let ei=e[1];
			if(ei instanceof Map) {return [e[0],this.to_param_obj(ei)];}
			return [e[0],ei];
		}));
	}
	log_enabled_playlist_id=false;
	/** @private @type {string[]} */
	cache_playlist_index=[];
	/** @private @type {string[]} */
	cache_playlist_id=[];
	/** @private @type {string[]} */
	cache_player_params=[];
	/** @private @arg {CF_L_TP_Params} root @arg {Extract<D_UrlFormat,`https://${string}`|`http://${string}`>} x */
	parse_full_url(root,x) {
		let r=this.parse_with_url_parse(x);
		switch(r.host) {
			case "ad.doubleclick.net": return;
			case "www.googleadservices.com": return;
			case "www.youtube.com": {
				this.parse_url(root,`${r.pathname}${r.search}`);
				return;
			}
			default:
		}
		/** @private @template {UrlParseRes_noSearch<any,string,any,any>|UrlParseRes<any,string,any,any,any>} T @template {string} U @arg {T} x @arg {U} v @returns {x is Extract<T,{host:`${U}${string}`}>} */
		let host_starts_with=(x,v) => {return this.str_starts_with_rx(x.host,v);};
		if(host_starts_with(r,"yt")) {
			let c=split_string(r.pathname,"=");
			let qr=c[1];
			let v=split_string(qr,"-");
			let h=split_string(r.host,".");
			if(this.TODO_true) return;
			console.log("yt_ggpht_url",h[0],c[0],v);
			/** @private @type {D_UrlFormat} */
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
			case "support.google.com": return;
			case "m.youtube.com": return;
			default:
		}
		// cSpell:ignoreRegExp /r\d---sn-.+?"/
		let s_host=split_string_once(r.host,".");
		switch(s_host[1]) {
			case "googlevideo.com": {
				switch(s_host[0]) {
					default: debugger; break;
					case "r1---sn-p5qlsny6": break;
					case "r5---sn-nx57ynsd": break;
				}
				switch(r.pathname) {
					case "/initplayback": r;break;
				}
			} return;
			default:
		}
		/** @private @type {D_UrlFormat|D_ExternalUrlFormat} */
		console.log("[parse_url_external_1]",x);
		{debugger;}
	}
	/** @unused_api @protected @arg {GM_VE3832_Watch['url']} x */
	parse_url_VE3832(x) {if(!this.str_starts_with_rx("/watch?",x)) debugger;}
	/** @api @public @arg {CF_L_TP_Params} root @arg {D_UrlFormat} x */
	parse_url(root,x) {
		if(this.str_starts_with_rx("https://",x)) {return this.parse_full_url(root,x);}
		if(this.str_starts_with_rx("http://",x)) {return this.parse_full_url(root,x);}
		if(this.str_starts_with_rx("android-app://",x)) {return;}
		if(this.str_starts_with_rx("ios-app://",x)) {return;}
		if(x==="/") return;
		let up=split_string_once(x,"/");
		if(up[0]!=="") {
			debugger;
			return;
		}
		this.parse_url_1(root,up[1]);
	}
	/** @private @arg {CF_L_TP_Params} root @arg {NS_DP_Parse.ParseUrlStr_0} x */
	parse_url_1(root,x) {
		let v=split_string_once(x,"/");
		switch(v.length) {
			case 1: this.parse_url_2(root,v[0]); break;
			case 2: this.parse_url_3(v); break;
		}
	}
	log_playlist_index=false;
	/** @private @arg {D_UrlInfoPlaylist} x */
	log_playlist_id(x,critical=false) {
		if(!this.cache_playlist_id.includes(x.id)) {
			this.cache_playlist_id.push(x.id);
			if(this.log_enabled_playlist_id||critical) console.log("[playlist]",x.type,x.id);
		}
	}
	/** @private @arg {D_UrlInfoPlaylist} x */
	get_playlist_url_info_critical(x) {
		switch(x.id.length) {
			case 11: return false;
			case 24: return false;
			case 32: return false;
			default: debugger; return true;
		}
	}
	/** @private @arg {D_UrlInfoPlaylist} x */
	parse_playlist_url_info(x) {
		let is_critical=this.get_playlist_url_info_critical(x);
		this.log_playlist_id(x,is_critical);
	}
	/** @private @arg {G_UrlInfoItem[]} x */
	log_url_info_arr(x) {
		for(let url_info of x) {
			switch(url_info._tag) {
				case "playlist": this.parse_playlist_url_info(url_info); break;
				case "video": this.parse_video_id(url_info.id); break;
				case "video-referral": this.parse_video_id(url_info.id); break;
			}
		}
	}
	/** @private @arg {CF_L_TP_Params} root @arg {ParseUrlWithSearchIn|ParseUrlWithSearchIn_2} x */
	parse_url_with_search(root,x) {
		let a=split_string(x,"?");
		switch(a[0]) {
			case "playlist": this.parse_playlist_page_url(a[1]); break;
			case "watch": this.parse_watch_page_url(root,a[1]); break;
		}
	}
	log_channel_handles=false;
	/** @private @type {D_UrlFormat} */
	/** @private @arg {CF_L_TP_Params} root @arg {Extract<T_SplitOnce<T_SplitOnce<Exclude<D_UrlFormat,"/">,"/">[1],"/">,[any]>[0]} x */
	parse_url_2(root,x) {
		if(this.str_is_search(x)) {return this.parse_url_with_search(root,as(x));}
		if(this.str_starts_with_rx("@",x)) {
			if(this.log_channel_handles) console.log("[channel_handle]",x);
			return;
		}
		if(this.str_starts_with_rx("account",x)) {return this.parse_account_url(x);}
		switch(x) {
			case "channel_switcher": return;
			case "gaming": return;
			case "premium": return;
			case "reporthistory": return;
			case "upload": return;
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
		switch(x) {default: debugger; return;}
	}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,[`account${string}`]>[0]} x */
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
	/** @private @arg {D_PlaylistUrlParams} x */
	parse_playlist_page_url(x) {
		if(x.includes("&")) debugger;
		let y=split_string(x,"=");
		switch(y[0]) {
			case "list": return this.parse_playlist_id(y[1]);
			default: debugger;
		}
	}
	/** @unused_api @protected @arg {D_VE6827_PageUrl} x */
	parse_ve_6827_url(x) {
		const cf="parse_ve_6827_url";
		/** @private @type {T_SplitOnce<D_VE6827_PageUrl,"/">[1]} */
		let su=split_string_once(x,"/")[1];
		let su1=split_string_once(su,"/");
		if(su1.length===1) {
			let [pt0]=su1;
			this.save_string(`[ve_6827.part[0]]`,`${pt0}`);
			switch(pt0) {
				case "reporthistory": return;
				default: debugger; return;
			}
		}
		switch(su1[0]) {
			case "feed": {
				let [pt]=split_string_once(su1[1],"?");
				this.save_string(`[${cf}]`,`${su1[0]}/${pt}`);
				switch(pt) {
					case "trending": break;
					case "library": break;
					case "history": break;
					case "storefront": break;
					case "guide_builder": break;
					default: debugger; break;
				}
			} break;
			case "hashtag": break;
		}
	}
	/** @private @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {return this.str_starts_with_rx(needle,str);}
	/** @api @public @arg {D_TargetIdStr} x */
	parse_target_id(x) {
		if(this.str_starts_with_rx("browse-feed",x)) {
			console.log("[target_id.browse_feed","browse-feed",split_string_once(x,"browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with_rx("comment-replies-item",x)) {return this.save_enum("comment-replies-item",x);}
		if(this.str_starts_with_r(x,"engagement-panel")) {return this.save_enum("engagement-panel",x);}
		if(this.str_starts_with_r(x,"comments")) {return this.save_enum("comments",x);}
		if(this.str_starts_with_r(x,"library")) {return this.save_enum("library",x);}
		if(this.str_starts_with_r(x,"watch")) {return this.save_enum("watch",x);}
		if(this.str_starts_with_r(x,"shopping_panel")) {return this.save_enum("shopping_panel",x);}
		if(this.str_starts_with_r(x,"clip")) {return this.save_enum("clip",x);}
		this.save_string("[target_id]",x);
	}
	/** @api @public @arg {T_SplitOnce<D_ChanLoc,".">} x */
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
		{debugger;}
		return null;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1",string]>} x */
	get_yt_url_type_3(x) {
		switch(x[2]) {
			case "browse": return x[2];
			case "feedback": return x[2];
			case "get_survey": return x[2];
			case "get_transcript": return x[2];
			case "guide": return x[2];
			case "next": return x[2];
			case "player": return x[2];
			case "search": return x[2];
			case "updated_metadata": return x[2];
			default:
		}
		switch(x[2]) {default: console.log("[new_get_yt_url_type_3] [%o] [%s]",x,x[2]); debugger;}
		return x[2];
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei",...any]>} x */
	get_yt_url_type(x) {
		if(x[1]!=="v1") {return this.api_no_handler(x,x[1]);}
		if(x.length===3) {return this.get_yt_url_type_3(x);}
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
			case "pdg": return this.get_pdg_type(x);
			case "flag":
				if(x[3]!=="get_form") debugger;
				return {
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "backstage":
				if(x[3]!=="create_post") debugger;
				return {
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			case "ypc": {
				if(x[3]!=="get_offers") debugger;
				return {
					/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
					x: `${x[2]}.${x[3]}`,
				}.x;
			}
			default: return this.api_no_handler(x,x[2]);
		}
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","pdg",string]>} x */
	get_pdg_type(x) {
		switch(x[3]) {
			case "get_pdg_buy_flow": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","music",string]>} x */
	get_music_type(x) {
		switch(x[3]) {
			case "get_search_suggestions": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","share",string]>} x */
	get_share_type(x) {
		switch(x[3]) {
			case "get_share_panel": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","playlist",string]>} x */
	get_playlist_type(x) {
		switch(x[3]) {
			case "get_add_to_playlist": break;
			case "create": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`,
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","browse",string]>} x */
	get_browse_type(x) {
		switch(x[3]) {
			case "edit_playlist": break;
			default: return this.api_no_handler(x,x[3]);
		}
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","subscription",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","reel",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","notification",string]>} x */
	get_notification_type(x) {
		switch(x[3]) {
			case "get_unseen_count": break;
			case "get_notification_menu": break;
			case "record_interactions": break;
			case "modify_channel_preference": break;
			case "opt_out": break;
			default: x[3]===""; return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","comment",string]>} x */
	get_comment_type(x) {
		switch(x[3]) {
			case "create_comment": break;
			default: return this.api_no_handler(x,x[3]);
		} return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","att",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","like",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","account",string]>} x */
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
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei","v1","live_chat",string]>} x */
	get_live_chat_type(x) {
		switch(x[3]) {
			case "get_live_chat_replay": break;
			case "get_live_chat": break;
			default: return this.api_no_handler(x,x[3]);
		};
		return {
			/** @private @type {`${typeof x[2]}.${typeof x[3]}`} */
			x: `${x[2]}.${x[3]}`
		}.x;
	}
	/** @api @public @arg {T_Split<D_ApiPathFormat_1,"/">} x */
	get_url_type(x) {
		switch(x[0]) {
			case "youtubei": return this.get_yt_url_type(x);
			case "getDatasyncIdsEndpoint": break;
			case "getAccountSwitcherEndpoint": break;
			default: return this.api_no_handler(x,x[0]);
		}
		return x[0];
	}
	/** @private @arg {D_BrowseEndpointPages} x */
	parse_known_page(x) {
		switch(x) {
			case "explore": return true;
			case "guide_builder": return true;
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
			case "hashtag": return true;
			default:
		}
		switch(x) {
			case "": return true;
			default:
		}
		switch(x) {default: debugger; return false;}
	}
	/** @private @arg {string} x @returns {D_BrowseIdStr|null} */
	decode_browse_id(x) {
		if(this.str_starts_with_r(x,"FE")) {
			switch(x) {
				case "FEwhat_to_watch": return x;
				case "FEexplore": return x;
				default: console.log(`--- [decode_browse_id] ---\n\n\ncase "${x}: return x;`); return null;
			}
		}
		return null;
	}
	/** @api @public @arg {D_BrowseIdStr} x */
	parse_browse_id(x) {
		if(this.str_starts_with_r(x,"FE")) {
			let page=split_string_once(x,"FE")[1];
			let known_page=this.parse_known_page(page);
			if(known_page) return;
			if(seen_map.has(page)) return;
			seen_map.add(page);
			console.log("[param_value_with_section] [%s] -> [%s]",x.slice(0,2),page);
			return;
		}
		if(this.str_starts_with_r(x,"VL")) {return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);}
		if(this.str_starts_with_r(x,"UC")) {
			if(x.slice(2).length===22) return;
			console.log("new with param [param_2c_UC]",x);
			return;
		}
		if(this.str_starts_with_r(x,"SP")) {
			/** @private @type {D_Settings_Id} */
			let x1=split_string_once(x,"SP")[1];
			switch(x1) {
				case "account_advanced":
				case "account_downloads":
				case "account_overview":
				case "account":
				case "report_history":
				case "unlimited":
					return;
				default: console.log(`case "${x1}": `); console.log(`\n|"${x1}"`); debugger;
			}
			console.log("new with param [param_2c_SP]",x,x1);
			return;
		}
		if(this.str_starts_with_r(x,"MP")) {
			let x1=split_string_once(x,"MP")[1];
			let x2=split_string_once(x1,"_");
			switch(x2[0]) {
				case "TRt": break;
				case "REb": break;
				case "LYt": break;
				default: console.log("new with param [param_2c_MP]",x,x1,x2); debugger;
			}
			return;
		}
		{debugger;}
	}
}

export_(exports => {
	exports.ParserService=ParserService;
	exports.__is_module_flag__=true;
});
