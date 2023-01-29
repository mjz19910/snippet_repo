// ==UserScript==
// @name	YTPlugin Parser Service
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

const __module_name__="mod$ParserService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const as=bs.as_;
const split_string=bs.split_string;
const split_string_once=bs.split_string_once;
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {
	bs.do_export(fn,flags,exports,__module_name__);
}
export_(exports => {
	exports.__is_module_flag__=true;
});
const seen_map=new Set;
console.log("Load Parser Service");
/** @template T @arg {T|undefined} x @returns {T} */
function required(x) {
	if(x===void 0) {
		throw new Error("missing required");
	}
	return x;
}
/** @template T @typedef {NonNullable<T>} N */
/** @typedef {N<store['mod$LoadAllServices']>['LoadAllServices']} LoadAllServices */
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
	/** @api @public @arg {PlaylistId} x */
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
			switch(pl.length) {
				case 32: return;
			}
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
	str_has_sep(x,u) {
		return x.includes(u);
	}
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
	/** @private @arg {Extract<NS_DP_Parse.ParseUrlStr_2,[`@${string}`,any]>[1]} x */
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
		switch(a[0]) {
			case "stats": this.parse_api_stats_url(a[1]); break;
		}
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
		if(this.str_starts_with_at_1(x,"UC")) {
			return;
		}
		console.log("[parse_channel_url]",x);
	}
	/** @unused_api @protected @arg {`UC${string}`} x */
	parse_channel_id(x) {
		if(this.str_starts_with_r(x,"UC")) {
			return;
		}
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
		if(this.str_has_sep(b,"/")) {
			return this.parse_youtube_api_url_5(b);
		}
		this.get_yt_url_type(["youtubei","v1",b]);
	}
	/** @private @arg {NS_DP_Parse.ParseUrlStr_4} x */
	parse_youtube_api_url_5(x) {
		let a=split_string_once(x,"/");
		this.get_yt_url_type(["youtubei","v1",...a]);
	}
	/** @private @arg {string} x */
	parse_video_id(x) {
		this.x.get("indexed_db").put({v: x});
	}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		this.x.get("indexed_db").put({v: x[1]});
	}
	/** @private @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["feed",any]>} x */
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
	/** @private @arg {D_GuideEntryData['guideEntryId']} x */
	parse_guide_entry_id(x) {
		/** @private @type {G_UrlInfoItem[]} */
		let arr=[];
		if(this.str_starts_with_r(x,"RD")) {
			arr.push({_tag: "playlist",type: "RD",id: x.slice(2)});
		} else {
			console.log(x);
			debugger;
		}
		this.log_url_info_arr(arr);
	}
	log_start_radio=false;
	/** @private @arg {P_ParamsSection} root @arg {Extract<T_SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
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
					if(this.str_starts_with("RD",v)) {
						if(this.str_starts_with("RDMM",v)) {
							url_info_arr.push({_tag: "playlist",type: "RDMM",id: v.slice(4)});
						} else if(this.str_starts_with("RDGM",v)) {
							url_info_arr.push({_tag: "playlist",type: "RDGM",id: v.slice(4)});
						} else if(this.str_starts_with("RDCM",v)) {
							// url_info[playlist] "RDCM" still needs a valid `UC${string}` channel id
							url_info_arr.push({_tag: "playlist",type: "RDCM",id: v.slice(4)});
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
					this.on_player_params(root,"watch_page_url.pp",res[1]);
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
		if(res_e.find(e => e[0]==="error")) {
			return null;
		}
		return this.make_param_map(res_e);
	}
	/** @private @arg {ParamMapType} x */
	parse_get_transcript(x) {
		/** @private @type {ParamMapValue[]} */
		let transcript_args=[];
		let pMap=x;
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
		if(transcript_args_dec) {
			console.log("[get_transcript_args]",transcript_args_dec);
		}
		let param_obj=this.to_param_obj(x);
		console.log("[new_get_transcript_endpoint_params]",param_obj);
		{debugger;}
	}
	/** @api @public @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {string} x */
	on_endpoint_params(root,path,x) {
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
				this.parse_endpoint_param(root,path,new Map(param_map));
				return;
			}
		}
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		switch(root) {
			case "DE_GetTranscript": return this.parse_get_transcript(param_map);
		}
		this.parse_endpoint_param(root,path,new Map(param_map));
	}
	/** @api @public @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {string} x */
	on_player_params(root,path,x) {
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_player_param(root,path,param_map);
	}
	/** @private @type {string[]} */
	cache_interaction_requests=[];
	/** @unused_api @protected @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {string} x */
	on_serialized_interactions_request_params(root,path,x) {
		if(this.cache_interaction_requests.includes(x)) return;
		this.cache_interaction_requests.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_serialized_interactions_request(root,path,param_map);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapType} map */
	parse_serialized_interactions_request(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		parse_key(2);
		parse_key(5);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		{debugger;}
	}
	parse_key_index=1;
	/** @unused_api @protected @arg {ParamMapType} x @arg {number[]} mk @arg {number} ta */
	remove_key(x,mk,ta) {
		x.delete(ta);
		let idx=mk.indexOf(ta);
		if(idx>-1) mk.splice(idx,1);
	}
	/** @private @arg {string} ns @arg {()=>void} f */
	grouped(ns,f) {
		console.group(ns);
		f();
		console.groupEnd();
	};
	/** @private @arg {P_ParamParse_XX} path @arg {number[]} map_keys @arg {ParamMapValue} map_entry_value @arg {number|null} map_entry_key */
	get_parse_fns(path,map_keys,map_entry_value,map_entry_key=null) {
		let path_parts=split_string(path,".");
		/** @private @arg {number} idx */
		let gd=(idx) => {console.log("[param_next.next_new_ns]",path_parts.join(".")); gen_next_part(idx);};
		/** @private @arg {number} idx */
		let u=idx => this.grouped(path_parts.join("$"),() => gd(idx));
		/** @private @arg {number} idx */
		let gen_next_part=(idx) => {
			let pad="\t\t\t";
			if(idx>path_parts.length) return;
			let case_part="";
			let value_part=`${pad}\t\tswitch(map_entry_value) {default: debugger; return;}`;
			if(path_parts.length===idx) {
				if(map_entry_value instanceof Map) case_part=`${pad}\t\tif(map_entry_value instanceof Map) return;\n`;
				switch(typeof map_entry_value) {
					case "number": case_part=`${pad}\t\tif(typeof map_entry_value==="number") return this.save_number(\`[$\{path}]\`,map_entry_value);\n`; break;
					case "string": case_part=`${pad}\t\tif(typeof map_entry_value==="string") return this.save_string(\`[$\{path}]\`,map_entry_value);\n`; break;
				}
			}
			let res_case="";
			if(idx<path_parts.length) res_case=`case "${path_parts[idx]}": u(idx); debugger; break;`;
			console.log(`"[parse_value.L_gen_next_part] [${path}]",`);
			console.log(`
			-- [${path_parts.join(".")},${idx}] --\n
			case "${path_parts[idx-1]}": {
				const idx=${idx+1};
				if(path_parts.length===${idx}) {\n${case_part}${value_part}\n${pad}\t}
				switch(path_parts[${idx}]) {default: u(idx); debugger; path_parts[${idx}]===""; break; ${res_case}}
			} break;`.slice(1).split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
		};
		let new_path=() => {
			/** @private @type {P_LogItems} */
			console.log("[parse_value.new_path_gen]",path);
			let ak_gen=["",""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`\n
			case "${path}":
				switch(map_entry_key) {${map_keys.map(e => `case ${e}:`).join(" ")} break; default: new_ns(); debugger; return;}
				/** @private @type {P_ParamParse_XX} */
				return this.parse_param_next(root,\`\${path}.f\${map_entry_key}\`,map_entry_value);\n`.split("\n").map(e => e.slice(0,3).trim()+e.slice(3)).join("\n"));
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
	/** @typedef {{[x:number]:number|string|ParamObjType}} ParamObjType */
	/** @typedef {(x:ParamMapValue[],idx:number)=>void} ParseCallbackFunction */
	/** @private @type {P_LogItems} */
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapType} map @arg {number[]} map_keys @arg {number} map_entry_key @arg {ParamMapValue[]|undefined} map_entry_value @arg {ParseCallbackFunction|null} callback */
	parse_value(root,path,map,map_keys,map_entry_key,map_entry_value,callback) {
		let saved_map_keys=map_keys.slice();
		/** @private @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		if(map_entry_value!==void 0) {
			let {new_path,new_ns}=this.get_parse_fns(path,saved_map_keys,map_entry_value[0],map_entry_key);
			map.delete(map_entry_key);
			let cx=map_keys.indexOf(map_entry_key);
			if(cx>-1) map_keys.splice(cx,1);
			if(callback===null) {
				/** @private @type {P_LogItems} */
				switch(path) {
					default: {
						grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
						debugger;
						return;
					}
					case "watch.params":
						switch(map_entry_key) {case 2: case 3: case 7: case 24: case 27: case 33: case 39: case 56: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "get_report_form.f18.f1":
						switch(map_entry_key) {case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "get_report_form.f18":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "get_report_form":
						switch(map_entry_key) {case 2: case 8: case 11: case 14: case 15: case 18: case 27: case 29: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "service$create_playlist":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "browse$param.f93":
						switch(map_entry_key) {case 1: case 3: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams.f5":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.removeLikeParams":
						switch(map_entry_key) {case 1: case 3: case 4: case 5: case 6: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams.f4":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.dislikeParams":
						switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams.f6":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams.f1":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "like.likeParams": case "like.dislikeParams":
						switch(map_entry_key) {case 1: case 4: case 5: case 6: case 7: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "reel.params":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f19": case "AdServingDataEntry.f9": case "slot_ad_serving_data_entry.f1":
					case "tracking.trackingParams.f4": switch(map_entry_key) {case 1: case 2: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "reel.player_params":
						switch(map_entry_key) {case 30: case 71: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "slot_ad_serving_data_entry":
						switch(map_entry_key) {case 1: case 3: case 4: break; default: new_ns(); debugger; return;}
						/** @private @type {P_ParamParse_XX} */
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.params": switch(map_entry_key) {case 2: case 3: case 7: case 24: case 27: case 33: case 56: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f16": switch(map_entry_key) {case 1: case 2: case 3: case 4: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.params.f33": switch(map_entry_key) {case 2: case 3: case 4: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f6": switch(map_entry_key) {case 12: break; case 13: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "AdServingDataEntry": switch(map_entry_key) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "watch.player_params": switch(map_entry_key) {case 8: case 9: case 12: case 25: case 40: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "ypc_get_offers.params.f5": switch(map_entry_key) {case 1: case 3: case 5: case 9: break; default: new_ns(); debugger; return;} return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "ypc_get_offers.params": switch(map_entry_key) {case 1: case 3: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "report.params.f28.f1.f1.f1.f1": switch(map_entry_key) {case 4: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "report.params.f28.f1": switch(map_entry_key) {case 1: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "browse$param.f84": switch(map_entry_key) {case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "entity_key": switch(map_entry_key) {case 2: case 4: case 5: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "createBackstagePost.params": case "record_notification_interactions.f2.f14.f1": case "ypc_get_offers.params.f1": case "record_notification_interactions.f2.f14":
						switch(map_entry_key) {case 1: case 2: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "create_playlist.params": case "browse$param": case "D_Browse.param":
						switch(map_entry_key) {case 84: case 93: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`browse$param.f${map_entry_key}`,map_entry_value);
					case "get_transcript.params": case "report.params.f18": case "report.params.f28.f1.f1.f1": case "report.params.f28.f1.f1": case "report.params.f28": case "subscribe.params.f2": case "watch.params.f27": case "watch.player_params.f40": case "GetNotificationMenu.ctoken": case "ypc_get_offers.params.f5.f5":
						switch(map_entry_key) {case 1: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams.f16.f4": case "transcript_target_id.param": case "watch.player_params.f40.f1":
						switch(map_entry_key) {case 2: case 3: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "slot_ad_serving_data_entry.f3": case "AdServingDataEntry.f10":
						switch(map_entry_key) {case 1: case 6: case 11: break; default: new_ns(); debugger; return;}return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "tracking.trackingParams":
						switch(map_entry_key) {
							case 16: case 19: break;
							default: {
								if(!is_in_range(map_entry_key,11)) {
									new_ns();
									debugger;
									return;
								}
							}
						}
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_value);
					case "AdServingDataEntry.f10.f1":
					case "AdServingDataEntry.f10.f11":
					case "AdServingDataEntry.f10.f6":
					case "AdServingDataEntry.f13":
					case "AdServingDataEntry.f14":
					case "AdServingDataEntry.f4":
					case "AdServingDataEntry.f5":
					case "AdServingDataEntry.f6":
					case "AdServingDataEntry.f7":
					case "AdServingDataEntry.f9.f1":
					case "AdServingDataEntry.f9.f2":
					case "AdServingDataEntry.f9.f3":
					case "browse$param.f84.f5":
					case "browse$param.f93.f1":
					case "create_playlist.params.f84.f5":
					case "create_playlist.params.f84":
					case "createBackstagePost.params.f1":
					case "createBackstagePost.params.f2":
					case "entity_key.f2":
					case "entity_key.f4":
					case "entity_key.f5":
					case "get_transcript.params.f1":
					case "get_transcript.params.f6":
					case "GetNotificationMenu.ctoken.f1":
					case "like.likeParams.f1.f1":
					case "like.likeParams.f4":
					case "like.likeParams.f5":
					case "like.likeParams.f6.f2":
					case "like.likeParams.f7":
					case "record_notification_interactions.f2.f1":
					case "record_notification_interactions.f2.f14.f1.f1":
					case "record_notification_interactions.f2.f14.f1.f2":
					case "record_notification_interactions.f2.f14.f2":
					case "record_notification_interactions.f2":
					case "record_notification_interactions.f5":
					case "record_notification_interactions":
					case "reel.params.f1":
					case "reel.player_params.f30":
					case "reel.player_params.f71":
					case "reel.sequence_params.f1":
					case "reel.sequence_params":
					case "report.params.f11":
					case "report.params.f15":
					case "report.params.f18.f1.f2":
					case "report.params.f18.f1":
					case "report.params.f2":
					case "report.params.f25":
					case "report.params.f26":
					case "report.params.f28.f1.f1.f1.f1.f4":
					case "report.params.f28.f1.f1.f1[].f1.f4":
					case "report.params.f28.f1.f1.f1[].f1":
					case "report.params.f28.f1.f1.f1[]":
					case "report.params.f28.f1.f3":
					case "report.params.f28.f1[].f1.f1":
					case "report.params.f28.f1[].f1.f1[].f1":
					case "report.params.f28.f1[].f1.f1[]":
					case "report.params.f28.f1[].f1":
					case "report.params.f28.f1[].f3":
					case "report.params.f28.f1[]":
					case "report.params.f8":
					case "report.params":
					case "slot_ad_serving_data_entry.f1.f1":
					case "slot_ad_serving_data_entry.f1.f2":
					case "slot_ad_serving_data_entry.f1.f3":
					case "slot_ad_serving_data_entry.f3.f1":
					case "slot_ad_serving_data_entry.f3.f11":
					case "slot_ad_serving_data_entry.f3.f6":
					case "slot_ad_serving_data_entry.f4":
					case "subscribe.params.f2.f1":
					case "subscribe.params.f3":
					case "subscribe.params.f4":
					case "subscribe.params":
					case "tracking.trackingParams.f10":
					case "tracking.trackingParams.f11":
					case "tracking.trackingParams.f16.f1":
					case "tracking.trackingParams.f16.f2":
					case "tracking.trackingParams.f16.f3":
					case "tracking.trackingParams.f16.f4.f1":
					case "tracking.trackingParams.f16.f4.f2":
					case "tracking.trackingParams.f16.f4.f3":
					case "tracking.trackingParams.f19.f3":
					case "tracking.trackingParams.f4.f2":
					case "tracking.trackingParams.f4.f3":
					case "tracking.trackingParams.f5":
					case "tracking.trackingParams.f7":
					case "tracking.trackingParams.f8":
					case "transcript_target_id.param.f1":
					case "transcript_target_id.param.f2":
					case "transcript_target_id.param.f3":
					case "watch.params.f12":
					case "watch.params.f13":
					case "watch.params.f2":
					case "watch.params.f24":
					case "watch.params.f27.f1":
					case "watch.params.f3":
					case "watch.params.f33.f2":
					case "watch.params.f33.f3":
					case "watch.params.f33.f4":
					case "watch.params.f33.f5":
					case "watch.params.f56":
					case "watch.params.f7":
					case "watch.player_params.f12":
					case "watch.player_params.f25":
					case "watch.player_params.f40.f1.f2":
					case "watch.player_params.f40.f1.f3":
					case "watch.player_params.f8":
					case "watch.player_params.f9":
					case "ypc_get_offers.params.f1.f1":
					case "ypc_get_offers.params.f1.f2":
					case "ypc_get_offers.params.f3":
					case "ypc_get_offers.params.f5.f1":
					case "ypc_get_offers.params.f5.f3":
					case "ypc_get_offers.params.f5.f5.f1":
					case "ypc_get_offers.params.f5.f9":
					case "YpcGetCart.transactionParams":
					case "tracking.parentTrackingParams":
					case "tracking.trackingParams.f1":
					case "tracking.trackingParams.f19.f1":
					case "tracking.trackingParams.f19.f2":
					case "tracking.trackingParams.f2":
					case "tracking.trackingParams.f3":
					case "tracking.trackingParams.f4.f1":
					case "tracking.trackingParams.f6.f12":
					case "tracking.trackingParams.f6.f13":
					case "tracking.trackingParams.f9":
					case "next.queue_context_params":
					case "playlist_edit.params":
					case "watch_page_url.pp":
					case "watch_playlist.params": {
						new_ns();
						debugger;
					}
				}
				return;
			}
			callback(map_entry_value,map_entry_key);
			/** @arg {number} x @template {number} T @arg {T} mx @returns {x is T_NumRange<1,T>} */
			function is_in_range(x,mx) {
				if(x<=mx) return true;
				return false;
			}
		}
	}
	/** @unused_api @protected @arg {ParamMapValue} map_entry_value */
	mapper_use(map_entry_value) {
		/** @private @arg {ParamMapValue} e */
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
		if(xx instanceof Array) {
			return xx.map(mapper);
		} else {
			return xx;
		}
	}
	/** @unused_api @protected @arg {string[]} x */
	report$params(x) {
		this.save_string("[report.params.path]",x.join("$"));
	}
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapValue[]} tva */
	parse_param_next_arr(root,path,tva) {
		let off=1;
		for(let val of tva) {
			let g1=() => {
				console.log(`
				case ${JSON.stringify(path)}: /*tva*/{
					this.parse_param_next(root,\`\${path}[]\`,[val]);
				}; return;`);
				console.log(`\n\n\t"[parse_value.gen_ns_g1] [${path}[]]",`);
				console.log("path offset",off);
			};
			switch(path) {
				default: g1(); debugger; return;
				case "report.params.f28.f1[].f1.f1": /*tva*/{
					this.parse_param_next(root,`${path}[]`,[val]);
				}; return;
				case "report.params.f28.f1": /*tva*/{
					this.parse_param_next(root,`${path}[]`,[val]);
				} break;
			}
			off++;
		}
	}
	/** @private @template {["bigint",number[],bigint]|["group",D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]} T @arg {T} x @returns {x is ["bigint",number[],bigint]} */
	is_bigint(x) {
		return x[0]==="bigint";
	}
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_number(`[${path}]`,x[1]);
		this.save_string(`[${path}]`,`${x[2]}n`);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapValue[]} tva */
	parse_param_next(root,path,tva) {
		if(tva.length>1) return this.parse_param_next_arr(root,path,tva);
		if(tva.length!==1) return;
		let map_entry_value=tva[0];
		let key_index=this.parse_key_index;
		if(map_entry_value instanceof Map) this.parse_any_param(root,path,new Map(map_entry_value));
		let path_parts=split_string(path,".");
		let {u}=this.get_parse_fns(path,[],map_entry_value);
		const idx=1;
		/** @private @type {P_LogItems} */
		switch(path_parts[0]) {
			default: u(idx); debugger; {switch(path_parts[0]) {case "": break;}} break;
			case "feedback": u(idx); debugger; break;
			case "get_report_form": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f2": case "f8":
					case "f11": case "f14": case "f15": case "f18":
					case "f27":
					case "f29": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": break;
						}
					} break;
				}
			} break;
			case "service$create_playlist": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f1": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {default: u(idx); debugger; path_parts[2]===""; break;}
					} break;
				}
			} break;
			case "next": u(idx); debugger; break;
			case "aadc_guidelines_state_entity_key": u(idx); debugger; break;
			case "TimedContinuation": u(idx); debugger; break;
			case "D_Browse": u(idx); debugger; break;
			case "GetNotificationMenu": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "ctoken": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[2]==="f1"; break;
									case "f1": u(idx); debugger; break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "slot_ad_serving_data_entry": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f1": case "f3": case "f4": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": case "f2": case "f3": case "f6": case "f11": {
								const idx=4;
								if(path_parts.length===3) {
									if(path_parts[1]==="f1") {
										if(path_parts[2]==="f1") return;
										if(path_parts[2]==="f2") return;
										if(path_parts[2]==="f3") return;
										path_parts;
									}
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			case "YpcGetCart": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					// [YpcGetCart.transactionParams]
					case "transactionParams": u(idx); debugger; break;
				}
			} break;
			case "AdServingDataEntry": {
				const idx=2;
				if(path_parts.length===1) switch(map_entry_value) {default: debugger; return;}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f4": case "f5": case "f6": case "f7": case "f9": case "f10": case "f13": case "f14": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1":
							case "f2":
							case "f3":
							case "f6":
							case "f11": {
								const idx=4;
								if(path_parts.length===3) return;
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			// [watch.player_params]
			case "watch": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					// [watch.player_params.f12]
					case "params":
					case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							/** @private @type {P_LogItems} */
							// [watch.player_params.f12]
							// [watch.player_params.f25]
							case "f2": case "f3": case "f7": case "f8": case "f9":
							case "f12": case "f13": case "f24": case "f27": case "f25":
							case "f39":
							case "f33": case "f40": case "f56": {
								const idx=4;
								if(path_parts.length===3) {
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									if(this.is_bigint(map_entry_value)) return this.handle_bigint(path,map_entry_value);
									debugger;
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f5": case "f1": case "f2": case "f4":
									case "f3": {
										const idx=5;
										if(path_parts.length===4) return;
										switch(path_parts[4]) {
											case "f2":
											case "f3": break;
											default: u(idx); debugger; path_parts[4]===""; break;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "entity_key": {
				const idx=2;
				if(path_parts.length===1) {
					switch(map_entry_value) {default: debugger; return;}
				}
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f2":
					case "f4":
					case "f5": {
						const idx=3;
						if(path_parts.length===2) {
							if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
							if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
							switch(map_entry_value) {default: u(idx-1); debugger; return;}
						}
						switch(path_parts[2]) {default: u(idx); debugger; path_parts[2]===""; break;}
					} break;
				}
			} break;
			case "tracking": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "parentTrackingParams":
					// [tracking.trackingParams]
					case "trackingParams": {
						const idx=3;
						/** @private @type {P_LogItems} */
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							// [tracking.trackingParams.f4]
							case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
							case "f10": case "f11": case "f16": case "f19": {
								const idx=4;
								if(path_parts.length===3) {
									if(path_parts[2]==="f8") return;
									if(path_parts[2]==="f9") return;
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									if(this.is_bigint(map_entry_value)) return this.handle_bigint(path,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f2": case "f3": case "f4": case "f12": case "f13":
									// [tracking.trackingParams.f4.f1]
									case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(map_entry_value instanceof Map) return;
											if(calc_skip()) return;
											if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
											switch(map_entry_value) {default: debugger; return;}
										}
										switch(path_parts[4]) {
											default: u(idx); debugger; path_parts[4]===""; break;
											case "f1": case "f2": case "f3": {
												const idx=6;
												if(path_parts.length===5) {
													if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
													switch(map_entry_value) {default: u(idx-1); debugger; return;}
												}
												switch(path_parts[5]) {default: u(idx); debugger; path_parts[5]===""; break;}
											} break;
										}
										function calc_skip() {
											if(path_parts[2]==="f4") {
												if(path_parts[3]=="f1") return true;
												if(path_parts[3]=="f2") return true;
												if(path_parts[3]=="f3") return true;
											}
											return false;
										}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "browse$param": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "f84": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f5": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "f93": {
						const idx=3;
						if(path_parts.length===2) {
							if(map_entry_value instanceof Map) return;
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f3": case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			case "record_notification_interactions": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "f2": case "f5": u(idx); debugger; break;}
			} break;
			case "transcript_target_id": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "param": u(idx); debugger; break;}
			} break;
			case "watch": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": case "player_params": u(idx); debugger; break;}
			} break;
			case "report": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "createBackstagePost": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1":
							case "f2": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
				}
			} break;
			case "subscribe": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "ypc_get_offers": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "create_playlist": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "get_transcript": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "like": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "dislikeParams": case "removeLikeParams": case "likeParams": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": case "f2": case "f3": case "f4": case "f5": case "f6":
							case "f7": {
								const idx=4;
								if(path_parts.length===3) {
									if(map_entry_value instanceof Map) return;
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {
									default: u(idx); debugger; path_parts[3]===""; break;
									case "f2": case "f1": {
										const idx=5;
										if(path_parts.length===4) {
											if(typeof map_entry_value==="string") return this.save_string(`[${path}]`,map_entry_value);
											if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
											switch(map_entry_value) {default: debugger; return;}
										}
										switch(path_parts[4]) {default: u(idx); debugger; path_parts[4]===""; break;}
									} break;
								}
							} break;
						}
					} break;
				}
			} break;
			case "next": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break;
					case "continuation": u(idx); debugger; break;
					case "queue_context_params": u(idx); debugger; break;
				}
			} break;
			case "playlist_edit": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "watch_page_url": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "pp": u(idx); debugger; break;}
			} break;
			case "watch_playlist": {
				const idx=2;
				switch(path_parts[1]) {default: u(idx); debugger; path_parts[1]===""; break; case "params": u(idx); debugger; break;}
			} break;
			case "reel": {
				const idx=2;
				switch(path_parts[1]) {
					default: u(idx); debugger; path_parts[1]===""; break; case "player_params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break; case "f30": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
							case "f71": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "params": {
						const idx=3;
						if(path_parts.length===2) {
							switch(map_entry_value) {default: debugger; return;}
						}
						switch(path_parts[2]) {
							default: u(idx); debugger; path_parts[2]===""; break;
							case "f1": {
								const idx=4;
								if(path_parts.length===3) {
									if(typeof map_entry_value==="number") return this.save_number(`[${path}]`,map_entry_value);
									switch(map_entry_value) {default: debugger; return;}
								}
								switch(path_parts[3]) {default: u(idx); debugger; path_parts[3]===""; break;}
							} break;
						}
					} break;
					case "sequence_params": u(idx); debugger; break;
				}
			} break;
		}
		console.log(`[${path}] [idx=${key_index}]`,root,map_entry_value);
	}
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapType} map */
	parse_any_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		let mk_max=Math.max(...mk,-1);
		for(let i=1;i<mk_max+1;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(mk,[])) return;
		console.log(`[new.${path}] [idx=${key_index}]`,path,this.to_param_obj(map));
		{debugger;}
	}
	/** @private @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapType} map */
	parse_player_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		for(let i=1;i<72;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		parse_key(72);
		if(this.eq_keys(mk,[])) return;
		console.log(`[player.${path}] [idx=${key_index}]`,this.to_param_obj(map));
		{debugger;}
	}
	/** @api @public @arg {P_ParamsSection} root @arg {P_ParamParse_XX} path @arg {ParamMapType} map */
	parse_endpoint_param(root,path,map) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		/** @private @arg {number} ta */
		let parse_key=(ta) => this.parse_value(root,path,map,mk,ta,map.get(ta),null);
		for(let i=1;i<40;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		// endpoint.create_playlist.params
		this.parse_value(root,path,map,mk,77,map.get(77),map_entry_value => {
			if(map_entry_value.length===1&&typeof map_entry_value[0]==="string") {
				let bt=this.decode_browse_id(map_entry_value[0]);
				if(!bt) {debugger; return;}
				return this.parse_browse_id(bt);
			}
			debugger;
		});
		for(let i=1;i<300;i++) {
			if(!mk.includes(i)) continue;
			parse_key(i);
		}
		if(this.eq_keys(mk,[])) return;
		let param_obj=this.to_param_obj(map);
		console.log(`[endpoint.${path}] [idx=${key_index}]`,param_obj);
		{debugger;}
	}
	/** @private @arg {ParamMapType} x @returns {ParamObjType} */
	to_param_obj(x) {
		return Object.fromEntries([...x.entries()].map(e => {
			let ei=e[1];
			if(ei instanceof Map) {
				return [e[0],this.to_param_obj(ei)];
			}
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
	/** @private @arg {P_ParamsSection} root @arg {Extract<D_UrlFormat,`https://${string}`|`http://${string}`>} x */
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
		let host_starts_with=(x,v) => {
			return this.str_starts_with(x.host,v);
		};
		if(host_starts_with(r,"yt")) {
			let c=split_string(r.pathname,"=");
			let v=split_string(c[1],"-");
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
		let s_host=split_string_once(r.host,".");
		switch(s_host[1]) {
			case "googlevideo.com": {
				let x0=split_string_once(s_host[0],"---");
				let x1=split_string_once(x0[0],"rr");
				if(this.TODO_true) return;
				/** @private @type {GV_SubDomain} */
				console.log("google video sub domain",`rr${x1[1]}`);
			} return;
			default:
		}
		/** @private @type {D_UrlFormat|D_ExternalUrlFormat} */
		console.log("[parse_url_external_1]",x);
		{debugger;}
	}
	/** @unused_api @protected @arg {GM_VE3832_Watch_WC['url']} x */
	parse_url_VE3832(x) {
		if(!this.str_starts_with("/watch?",x)) debugger;
	}
	/** @api @public @arg {P_ParamsSection} root @arg {D_UrlFormat} x */
	parse_url(root,x) {
		if(this.str_starts_with("https://",x)) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with("http://",x)) {
			return this.parse_full_url(root,x);
		}
		if(this.str_starts_with("android-app://",x)) {
			return;
		}
		if(this.str_starts_with("ios-app://",x)) {
			return;
		}
		if(x==="/") return;
		let up=split_string_once(x,"/");
		if(up[0]!=="") {
			debugger;
			return;
		}
		this.parse_url_1(root,up[1]);
	}
	/** @private @arg {P_ParamsSection} root @arg {NS_DP_Parse.ParseUrlStr_0} x */
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
	/** @private @arg {P_ParamsSection} root @arg {ParseUrlWithSearchIn|ParseUrlWithSearchIn_2} x */
	parse_url_with_search(root,x) {
		let a=split_string(x,"?");
		switch(a[0]) {
			case "playlist": this.parse_playlist_page_url(a[1]); break;
			case "watch": this.parse_watch_page_url(root,a[1]); break;
		}
	}
	log_channel_handles=false;
	/** @private @type {D_UrlFormat} */
	/** @private @arg {P_ParamsSection} root @arg {Extract<T_SplitOnce<T_SplitOnce<Exclude<D_UrlFormat,"/">,"/">[1],"/">,[any]>[0]} x */
	parse_url_2(root,x) {
		if(this.str_is_search(x)) {
			return this.parse_url_with_search(root,as(x));
		}
		if(this.str_starts_with("@",x)) {
			if(this.log_channel_handles) console.log("[channel_handle]",x);
			return;
		}
		if(this.str_starts_with("account",x)) {
			return this.parse_account_url(x);
		}
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
		switch(x) {
			default: debugger; return;
		}
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
		let su1=split_string(su,"/");
		if(su1.length===1) {
			let [pt0]=su1;
			this.save_string(`[ve_6827.part[0]]`,`${pt0}`);
			switch(pt0) {
				case "reporthistory": return;
				default: debugger; return;
			}
		}
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
	}
	/** @private @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with_r(str,needle) {
		return this.str_starts_with(needle,str);
	}
	/** @api @public @arg {D_TargetIdStr} x */
	parse_target_id(x) {
		if(this.str_starts_with("browse-feed",x)) {
			console.log("[target_id.browse_feed","browse-feed",split_string_once(x,"browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with("comment-replies-item",x)) {
			return this.save_enum("comment-replies-item",x);
		}
		if(this.str_starts_with_r(x,"engagement-panel")) {
			return this.save_enum("engagement-panel",x);
		}
		if(this.str_starts_with_r(x,"comments")) {
			return this.save_enum("comments",x);
		}
		if(this.str_starts_with_r(x,"library")) {
			return this.save_enum("library",x);
		}
		if(this.str_starts_with_r(x,"watch")) {
			return this.save_enum("watch",x);
		}
		if(this.str_starts_with_r(x,"shopping_panel")) {
			return this.save_enum("shopping_panel",x);
		}
		if(this.str_starts_with_r(x,"clip")) {
			return this.save_enum("clip",x);
		}
		this.save_string("[target_id]",x);
	}
	/** @api @public @arg {T_SplitOnce<ChanLoc,".">} x */
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
		switch(x[2]) {
			default: console.log("[new_get_yt_url_type_3] [%o] [%s]",x,x[2]); debugger;
		}
		return x[2];
	}
	/** @private @arg {Extract<T_Split<D_ApiPathFormat_1,"/">,["youtubei",...any]>} x */
	get_yt_url_type(x) {
		if(x[1]!=="v1") {
			return this.api_no_handler(x,x[1]);
		}
		if(x.length===3) {
			return this.get_yt_url_type_3(x);
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
		if(this.str_starts_with_r(x,"VL")) {
			return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);
		}
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
