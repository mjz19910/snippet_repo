// ==UserScript==
// @name	YTPlugin ServiceMethods
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ServiceMethods.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ServiceMethods.user.js
// ==/UserScript==
const __module_name__="mod$ServiceMethods";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
const base64_dec=bs.base64_dec;
const as=bs.as_;
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
const ServiceData=bs.ServiceData;
const split_string_once=bs.split_string_once;
/** @extends {ServiceData<LoadAllServices,ServiceOptions>} */
class ServiceMethods extends ServiceData {
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_number(path,x[1]);
		return this.save_string(path,`${x[2]}n`);
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
	/** @protected @arg {CF_D_CaseGen} cf @arg {string|number} val @arg {string} [code] */
	codegen_case(cf,val,code) {
		let {arr}=this.codegen_case_cache(cf,val);
		console.log(`-- [js_gen_case:${cf}] --\n\n${this.codegen_case_result(arr,code)}`);
	}
	/** @protected @arg {string} x @returns {x is `${string}-0000-${string}`} */
	is_yt_uuid(x) {
		return x.match(/[0-9a-f]{8}-0{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)!==null;
	}
	/** @api @public @arg {D_TargetIdStr} x */
	parse_target_id(x) {
		if(this.is_yt_uuid(x)) return;
		if(this.str_starts_with_rx("browse-feed",x)) {
			if(this.str_starts_with(x,"browse-feedUC")) {
				return;
			}
			console.log("[target_id.browse_feed]","browse-feed",split_string_once(x,"browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with_rx("comment-replies-item",x)) {return this.save_enum("comment-replies-item",x);}
		if(this.str_starts_with(x,"engagement-panel")) {return this.save_enum("engagement-panel",x);}
		if(this.str_starts_with(x,"comments")) {return this.save_enum("comments",x);}
		if(this.str_starts_with(x,"library")) {return this.save_enum("library",x);}
		if(this.str_starts_with(x,"watch")) {return this.save_enum("watch",x);}
		if(this.str_starts_with(x,"shopping_panel")) {return this.save_enum("shopping_panel",x);}
		if(this.str_starts_with(x,"clip")) {return this.save_enum("clip",x);}
		this.save_string("target_id",x);
	}
	/** @private @type {string[]} */
	known_target_id=[];
	/** @protected @arg {string} cf1 @arg {D_TargetIdStr} x */
	targetId(cf1,x) {
		const cf2="targetId";
		this.parse_target_id(x);
		if(this.is_yt_uuid(x)) return;
		this.save_string(`${cf1}.${cf2}`,x);
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
			case "watch-supervod-button":
			case "browse-video-menu-button":
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
	/** @protected @arg {string} x */
	a_primitive_str(x) {this._primitive_of(x,"string");}
	/** @protected @arg {string} x */
	videoId(x) {
		if(!this.is_normal_service(this)) return;
		this.a_primitive_str(x);
		this.indexed_db_put("video_id",{key: `video_id:normal:${x}`,type: "normal",v: x});
	}
	/** @private @template {["bigint",number[],bigint]|["group",D_DecTypeNum[]]|["failed",D_DecTypeNum[]|null]} T @arg {T} x @returns {x is ["bigint",number[],bigint]} */
	is_bigint(x) {return x[0]==="bigint";}
	/** @arg {P_ParamParse} path @arg {V_ParamMapValue} entry */
	handle_map_value(path,entry) {
		if(typeof entry==="string") {
			switch(path) {
				case "continuation_token.data.f49": return this.x.get("handle_types").continuation_token_data_f49(path,entry);
				case "load_markers.entity_key.f2": case "reel_request_continuation.token.f12":
				case "continuation_token.data.f53.f8": {
					this.save_string(path,entry);
				} break;
				case "get_pdg_buy_flow.params.f1.f2": case "entity_key.normal.f2": case "continuation_token.data$sub_obj$f3.f1.f5.f1":
				case "tracking.trackingParams.f11": {
					this.D_ChannelId(as(entry));
				} break;
				case "reel_request_continuation.token.f15.f6.f1": case "reel_request_continuation.token.f3.f1": case "continuation_token.data.f53.f4.f4": case "watch_request_continuation.token.f6.f4.f4": case "watch_request_continuation.token.f2.f2": case "continuation_token.data$sub_obj$f3.f1.f5.f2":
				case "continuation_token.data$sub_obj$f3.f3.f48687757.f1": case "ypc_get_offers.params.f5.f5.f1": case "ypc_get_offers.params.f5.f1": case "get_pdg_buy_flow.params.f1.f1": case "entity_key.normal.f2.f1": case "create_comment.params.f2": case "like.likeParams.f1.f1": case "like.removeLikeParams.f1.f1": case "like.dislikeParams.f1.f1": case "subscribe.params.f4":
				case "unsubscribe.params.f2": {
					this.videoId(entry);
				} break;
				case "continuation_token.data.f110.f3.f15.f2.f1": {
					// f110=token_value; f3=command f15=showReloadUiCommand; f2=targetId; f1=value;
					this.targetId(`Binary.value:${path}`,as(entry));
				} break;
				case null: {
				} break;
				case null: break;
				case "continuation_token.data.f72":
				case "continuation_token.data.f49.f6":
				case "continuation_token.data.f15":
				case "watch_request_continuation.token.f5": {
					/** @type {`sub.${path}`} */
					const cf=`sub.${path}`;
					this.x.get("handle_types").decode_continuation_token(cf,entry);
				} break;
				case "watch_request_continuation.token.f9.f1.f4":
				case "tracking.trackingParams.f6": {
					this.save_string(path,entry);
				} break;
				case "reel_request_continuation.token.f1":
				case "reel.sequence_params.f1": {
					this.videoId(entry);
				} break;
				case "entity_key.subscribed.f2":
				case "ypc_get_offers.params.f1.f2": {
					this.D_ChannelId(as(entry));
				} break;
				default: {
					let new_data=this.save_string(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$value_save_string] [v:${entry}] --\n\ncase "${x}":\n`);
						debugger;
					}
				} return;
			}
			return;
		}
		if(typeof entry==="number") {
			switch(path) {
				default: {
					if(entry<1000) {
						this.save_number(path,entry);
						return;
					}
					let new_data=this.save_number(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$value_save_number] [v:${entry}] --\n\ncase "${x}":\n`);
						debugger;
					}
				} return;
				case "AdServingDataEntry.f7": {
					this.save_number(path,entry);
				} return;
				case "tracking.trackingParams.f2":
				case "tracking.trackingParams.f16.f2":
				case "watch_request_continuation.token.f9.f1.f4.f13": return;
				case "reel_request_continuation.token.f15.f6.f10.f2": case "reel_request_continuation.token.f15.f6.f9.f2": case "reel_request_continuation.token.f15.f6.f10.f1.f1": case "reel_request_continuation.token.f15.f6.f9.f1.f1": case "reel_request_continuation.token.f15.f6.f8.f2":
				case "reel_request_continuation.token.f15.f6.f8.f1.f1": case "reel_request_continuation.token.f15.f6.f5.f2": case "reel_request_continuation.token.f15.f6.f5.f1": case "reel_request_continuation.token.f15.f6.f2.f6": case "reel_request_continuation.token.f15.f3":
				case "reel_request_continuation.token.f15.f1": case "reel_request_continuation.token.f5.f3": case "reel_request_continuation.token.f3.f4": case "reel_request_continuation.token.f3.f3": case "reel.player_params.f57": case "unsubscribe.params.f1.f1": case "subscribe.params.f2.f1":
				case "tracking.trackingParams.f3": case "continuation_token.data.f53.f4.f15": case "entity_key.normal.f4": case "playability_status.context_params.f2.f1": case "playability_status.context_params.f1": case "reel.params.f6": case "reel.player_params.f30": case "reel.sequence_params.f5.f3":
				case "reel.params.f1": case "reel.player_params.f71": case "reel_request_continuation.token.f15.f6.f7.f1.f1": case "reel_request_continuation.token.f15.f6.f6.f1[].f2": case "reel_request_continuation.token.f15.f6.f6.f1[].f1":
				case "tracking.trackingParams.f1": {
					this.save_number(path,entry);
				} return;
				case "watch_request_continuation.token.f9.f1.f4.f13[]": return;
				// {[x:"f4"|"f13"]:"STORE::Playlist.localCurrentIndex";}
				case "watch_playlist.params.f4": case "watch_playlist.params.f13": {
				} return;
				// {[x:"f2.f7"]:"STORE::Playlist.localCurrentIndex";}
				case "watch_request_continuation.token.f2.f7": return;
				case "reel_request_continuation.token.f15.f6.f4.f1": case "reel_request_continuation.token.f15.f6.f3.f2": case "reel_request_continuation.token.f15.f6.f3.f1": case "reel.params.f3.f3": case "reel.params.f3.f2": case "reel.params.f3.f1":
				case "tracking.trackingParams.f16.f4.f3": case "tracking.trackingParams.f16.f4.f2": case "tracking.trackingParams.f16.f4.f1": case "slot_ad_serving_data_entry.f1.f3": case "slot_ad_serving_data_entry.f1.f2": case "slot_ad_serving_data_entry.f1.f1":
				case "AdServingDataEntry.f9.f3": case "AdServingDataEntry.f9.f2": case "AdServingDataEntry.f9.f1": case "tracking.trackingParams.f4.f1": case "tracking.trackingParams.f4.f2": case "tracking.trackingParams.f4.f3":
				case "like.removeLikeParams.f5.f1": case "like.removeLikeParams.f5.f2": case "like.likeParams.f6.f1": case "like.likeParams.f6.f2": case "like.dislikeParams.f4.f1": case "like.dislikeParams.f4.f2": case "notification.record_interactions.f5":
				case "reel_request_continuation.token.f15.f6.f7.f1[].f1":
				case "notification.record_interactions.f2.f14.f1.f1": {
				} return;
			}
		}
		if(entry instanceof Map) return;
		if(entry instanceof Uint8Array) {
			switch(path) {
				default: {
					this.save_number(path,[...entry]);
				} break;
			}
			return;
		}
		if(this.is_bigint(entry)) {
			switch(path) {
				default: {
					let new_data=this.handle_bigint(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$value_handle_bigint] [v:${entry[2]}n] --\n\ncase "${x}":\n`);
						debugger;
					}
				} return;
				case "tracking.trackingParams.f8":
				case "reel_request_continuation.token.f3.f6":
				case "reel.player_params.f72":
				case "tracking.trackingParams.f9":
				case "watch_request_continuation.token.f9.f1.f1[].f1": return;
			}
		}
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
			case "video_playback":
			case "url": case "player": case "sub": case "adaptive_format":
			case "aadc_guidelines_state": case "AdServingDataEntry": case "macro_marker_repeat_state": case "player_state":
			case "change_markers_visibility": case "continuation_token": case "create_comment": case "createBackstagePost":
			case "entity_key": case "entity":
			case "get_pdg_buy_flow": case "get_report_form": case "get_transcript": case "GetNotificationMenu":
			case "invalidation":
			case "like": case "live_chat_replay": case "load_markers":
			case "next_radio": case "next": case "notification":
			case "player_seek": case "playability_status": case "playlist_edit":
			case "reel": case "reload": case "watch_request_continuation": case "reel_request_continuation":
			case "service$create_playlist": case "slot_ad_serving_data_entry": case "subscribe": case "subscriptionState":
			case "TimedContinuation": case "tracking": case "transcriptTrackSelection":
			case "unsubscribe":
			case "watch_playlist": case "watch":
			case "ypc_get_offers": case "ypc_get_offline_upsell": case "YpcGetCart": {
				if(parts.length===1) return this.handle_map_value(path,map_entry_value);
				switch(parts[1]) {
					default: {
						const idx=2; u(idx); debugger; switch(parts[1]) {
							case "":
							case "":
						} parts[1]==="";
					} return;
					case "sig": case "api_url":
					case "heartbeat_params": case "watch_request_continuation": case "data$sub_obj$f3":
					case "context_params": case "data": case "token": case "entity_key": case "xtags":
					case "params": case "normal": case "subscribed": case "ctoken": case "continuation": case "queue_context_params": case "player_params":
					case "key": case "parentTrackingParams": case "trackingParams": case "serializedParams": case "transactionParams": case "likeParams": case "dislikeParams":
					case "removeLikeParams": case "sequence_params": case "record_interactions": case "opt_out":
					case "f1": case "f3": case "f4": case "f5": case "f6": case "f7": case "f9":
					case "f10": case "f13": case "f14":
				}
				if(parts.length===2) return this.handle_map_value(path,map_entry_value);
				switch(parts[2]) {
					default: {const idx=3; u(idx); debugger; parts[2]==="";} return;
					case "token": case "n": case "ns":
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
					case "f10": case "f11": case "f12": case "f13": case "f14": case "f15": case "f16": case "f18": case "f19":
					case "f24": case "f25": case "f26": case "f27": case "f28": case "f28": case "f29":
					case "f30": case "f33": case "f39": case "f40": case "f49":
					case "f53": case "f56": case "f57": case "f71": case "f72": case "f110":
				}
				if(parts.length===3) return this.handle_map_value(path,map_entry_value);
				switch(parts[3]) {
					default: {
						const idx=4; switch(parts[3]) {
						}; u(idx); debugger; parts[3]==="";
					} return;
					case "f1[]":
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
					case "f12": case "f13": case "f14": case "f15": case "f24": case "f25": case "f28": case "f31": case "f36":
					case "f45": case "f47":
					case "f48687757":
				}
				if(parts.length===4) return this.handle_map_value(path,map_entry_value);
				switch(parts[4]) {
					default: {const idx=5; u(idx); debugger; parts[4]==="";} return;
					case "f1[]": case "params":
					case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
					case "f10": case "f11": case "f15": case "f25": case "f37":
				}
				if(parts.length===5) return this.handle_map_value(path,map_entry_value);
				switch(parts[5]) {
					default: {const idx=6; u(idx); debugger; parts[5]==="";} return;
					case "f1[]": case "f13[]":
					case "f1": case "f2": case "f3": case "f6": case "f13":
				}
				if(parts.length===6) return this.handle_map_value(path,map_entry_value);
				switch(parts[6]) {
					default: {const idx=7; u(idx); debugger; parts[6]==="";} return;
					case "f1": case "f2":
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
	/** @private @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next_arr(root,path,map_entry_key_path,tva,callback) {
		let off=1;
		for(let val of tva) {
			off++;
			let g1=() => {
				console.log(`\n\t"[parse_value.gen_ar] [${path}[]]",`);
				console.log(`\n\tcase ${JSON.stringify(path)}:\n`);
				console.log("path offset",off);
			};
			switch(path)/*parse_param_next_arr*/ {
				default: g1(); debugger; continue;
				case "reel_request_continuation.token.f15.f6.f6.f1":
				case "reel_request_continuation.token.f15.f6.f7.f1":
				case "watch_request_continuation.token.f9.f1.f4.f13":
				case "get_report_form.params.f28.f1":
				case "get_report_form.params.f28.f1[].f1.f1":
				case "watch_request_continuation.token.f9.f1.f1": {
					this.parse_param_next(root,`${path}[]`,map_entry_key_path,[val],callback);
				}; continue;
			}
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
		switch(path) {
			// binary tab enum
			// /** @type {B_BinaryBrowseTab} */
			// case "D_Browse.param.f110.f1": switch(map_entry_key) {
			// 	case 2: case 3: case 6: case 7: case 8: case 9: case 10: case 11: case 15: case 19: case 20:
			// 		return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
			// 	default: new_ns(); debugger; return;
			// }
		}
		/** @private @type {P_LogItems} */
		switch(path)/*endpoint*/ {
			default: {
				grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
				{debugger;}
				/** @private @type {P_ParamParse} */
				return this.parse_param_next(root,as(`${path}.f${map_entry_key}`),map_entry_key_path,map_entry_values,callback);
			}
			case "video_playback.api_url.n": switch(map_entry_key) {
				case 15: case 45:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "continuation_token.data$sub_obj$f3.f3.f48687757": switch(map_entry_key) {
				case 1:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "continuation_token.data$sub_obj$f3.f3": switch(map_entry_key) {
				case 48687757:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "continuation_token.data$sub_obj$f3.f1.f5": switch(map_entry_key) {
				case 1: case 2:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "continuation_token.data$sub_obj$f3.f1": switch(map_entry_key) {
				case 5:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "continuation_token.data$sub_obj$f3": switch(map_entry_key) {
				case 1: case 3: case 4: case 6:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default: new_ns(); debugger; return;
			}
			case "get_pdg_buy_flow.params":
			// case "D_Browse.param.f110.f1.f20":
			case "get_report_form.params.f18": case "service$create_playlist": case "like.removeLikeParams.f1": case "like.dislikeParams.f1": case "like.likeParams.f1": case "get_report_form.params.f28.f1[].f1.f1[]": case "get_report_form.params.f18": case "get_report_form.params.f28.f1.f1.f1": case "get_report_form.params.f28.f1.f1": case "get_report_form.params.f28": case "reel_request_continuation.token.f15.f6.f4": case "watch.params.f27": case "watch.player_params.f40": case "GetNotificationMenu.ctoken": case "ypc_get_offers.params.f5.f5": case "reel_request_continuation.token.f15.f6.f7.f1[]": case "subscribe.params.f2": case "reel_request_continuation.token.f15.f6.f6": case "reel_request_continuation.token.f15.f6.f7.f1": case "reel_request_continuation.token.f15.f6.f9.f1": case "continuation_token.data.f110.f3.f15.f2": case "reel_request_continuation.token.f15.f6.f7": case "reel_request_continuation.token.f15.f6.f8.f1": case "create_comment.params.f5": case "unsubscribe.params.f1": case "playability_status.context_params.f2": case "watch_request_continuation.token.f14": case "watch_playlist.params.f27":
			// case "D_Browse.param.f110":
			case "entity_key.normal.f2": case "get_report_form.params.f28": case "reel_request_continuation.token.f15.f6.f10.f1":
			case "get_report_form.params.f28.f1[].f1": {
				switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "get_report_form.params.f18.f1":
			// case "D_Browse.param.f94.f1":
			case "reel_request_continuation.token.f15.f6.f11": {
				switch(map_entry_key) {case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel_request_continuation.token.f5": case "continuation_token.data.f110":
			case "reel.sequence_params.f5": {
				switch(map_entry_key) {case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "get_report_form.params.f28.f1.f1.f1.f1": {
				switch(map_entry_key) {case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "D_Browse.param.f84": case "browse.params.f84": {
			// 	switch(map_entry_key) {case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// }
			case "reel_request_continuation.token.f15.f6.f2":
			case "continuation_token.data.f49": {
				switch(map_entry_key) {case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_request_continuation.token.f9.f1.f4": {
				switch(map_entry_key) {case 13: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "D_Browse.param.f93.f1": {
			// 	switch(map_entry_key) {case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// }
			case "continuation_token.data.f110.f3": {
				switch(map_entry_key) {case 15: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "D_Browse.param.f94.f1.f2.f4":
			case "like.removeLikeParams.f5": case "like.dislikeParams.f4": case "like.likeParams.f6": case "createBackstagePost.params": case "notification.record_interactions.f2.f14.f1": case "notification.record_interactions.f2.f14.f1": case "ypc_get_offers.params.f1": case "notification.record_interactions.f2.f14": case "notification.record_interactions.f2.f14":
			case "reel_request_continuation.token.f15.f6.f11.f2": case "reel_request_continuation.token.f15.f6.f10": case "reel_request_continuation.token.f15.f6.f6.f1[]": case "reel_request_continuation.token.f15.f6.f9": case "reel_request_continuation.token.f15.f6.f8": case "reel_request_continuation.token.f15.f6.f3": case "reel_request_continuation.token.f15.f6.f5":
			case "playability_status.context_params": {
				switch(map_entry_key) {case 1: case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "get_report_form.params.f28.f1[]": case "watch_request_continuation.token.f9.f1.f1[]": case "watch_request_continuation.token.f9":
			case "get_report_form.params.f28.f1": {
				switch(map_entry_key) {case 1: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch.player_params.f40.f1":
			case "continuation_token.data.f110.f3.f15": {
				switch(map_entry_key) {case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel.sequence_params": {
				switch(map_entry_key) {case 1: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "notification.record_interactions": {
				switch(map_entry_key) {case 2: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_request_continuation.token.f2.f36":
			case "next.continuation.f2.f36": {
				switch(map_entry_key) {case 5: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "tracking.trackingParams.f6": {
				switch(map_entry_key) {case 12: case 13: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "notification.record_interactions.f2": {
				switch(map_entry_key) {case 1: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "create_playlist.params": case "browse.params": {
			// 	switch(map_entry_key) {case 84: case 93: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// }
			case "get_pdg_buy_flow.params.f1":
			case "tracking.trackingParams.f19": case "AdServingDataEntry.f9": case "slot_ad_serving_data_entry.f1": case "unsubscribe.params": case "reel.params.f3": case "tracking.trackingParams.f16.f4":
			case "tracking.trackingParams.f4": {
				switch(map_entry_key) {case 1: case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "slot_ad_serving_data_entry": {
				switch(map_entry_key) {case 1: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel_request_continuation.token.f15": {
				switch(map_entry_key) {case 1: case 3: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "ypc_get_offers.params": {
				switch(map_entry_key) {case 1: case 3: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "slot_ad_serving_data_entry.f3":
			case "AdServingDataEntry.f10": {
				switch(map_entry_key) {case 1: case 6: case 11: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "subscribe.params": {
				switch(map_entry_key) {case 2: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "player_state.entity_key": case "macro_marker_repeat_state.entity_key": case "load_markers.entity_key": case "change_markers_visibility.entity_key": case "entity_key.normal": case "entity_key.subscribed":
			case "aadc_guidelines_state.entity_key": {
				switch(map_entry_key) {case 2: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "create_comment.params": {
				switch(map_entry_key) {case 2: case 5: case 10: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "continuation_token.data.f53":
			case "watch_request_continuation.token.f6": {
				switch(map_entry_key) {case 4: case 6: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "tracking.trackingParams.f16":
			case "watch_request_continuation.token.f9.f1": {
				switch(map_entry_key) {case 1: case 2: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel_request_continuation.token.f3": {
				switch(map_entry_key) {case 1: case 3: case 4: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "continuation_token.data.f53.f4": {
				switch(map_entry_key) {case 4: case 6: case 15: case 25: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_request_continuation.token.f6.f4": {
				switch(map_entry_key) {case 4: case 6: case 15: case 37: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "next.continuation": {
				switch(map_entry_key) {case 1: case 2: case 3: case 16: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel.params": {
				switch(map_entry_key) {case 1: case 3: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "notification.opt_out": {
				switch(map_entry_key) {case 2: case 3: case 4: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch.params.f33": {
				switch(map_entry_key) {case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel.player_params": {
				switch(map_entry_key) {case 30: case 57: case 71: case 72: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "ypc_get_offers.params.f5": {
				switch(map_entry_key) {case 1: case 3: case 5: case 9: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "D_Browse.param.f94.f1.f2": {
			// 	switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// }
			case "like.removeLikeParams": {
				switch(map_entry_key) {case 1: case 3: case 4: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "like.dislikeParams": {
				switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "like.likeParams": case "like.dislikeParams": {
				switch(map_entry_key) {case 1: case 4: case 5: case 6: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch.player_params": {
				switch(map_entry_key) {case 8: case 9: case 12: case 25: case 40: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			/** @private @type {P_LogItems} */
			case "transcriptTrackSelection.serializedParams": {
				switch(map_entry_key) {case 1: case 2: case 3: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel_request_continuation.token": {
				switch(map_entry_key) {case 1: case 3: case 5: case 8: case 12: case 15: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "continuation_token.data": {
				switch(map_entry_key) {case 1: case 15: case 49: case 53: case 72: case 110: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "get_transcript.params": {
				switch(map_entry_key) {case 1: case 2: case 3: case 5: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "next.continuation.f2": {
				switch(map_entry_key) {case 2: case 4: case 7: case 25: case 28: case 31: case 36: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_request_continuation.token": {
				switch(map_entry_key) {case 1: case 2: case 3: case 5: case 6: case 9: case 13: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_playlist.params": {
				switch(map_entry_key) {case 1: case 2: case 3: case 4: case 7: case 12: case 13: case 27: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			// case "D_Browse.param": {
			// 	switch(map_entry_key) {case 2: case 5: case 23: case 77: case 84: case 93: case 94: case 110: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			// }
			case "AdServingDataEntry": {
				switch(map_entry_key) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch_request_continuation.token.f2": {
				switch(map_entry_key) {case 2: case 4: case 6: case 7: case 24: case 25: case 28: case 36: case 47: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "watch.params": {
				switch(map_entry_key) {case 2: case 3: case 7: case 12: case 13: case 24: case 27: case 33: case 39: case 56: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "reel_request_continuation.token.f15.f6": {
				switch(map_entry_key) {
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
			case "get_report_form.params": {
				switch(map_entry_key) {case 2: case 8: case 11: case 14: case 15: case 18: case 25: case 26: case 27: case 28: case 29: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: new_ns(); debugger; return;}
			}
			case "tracking.trackingParams": {
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
	}
	/** @public @arg {CF_L_Params} root @arg {P_ParamParse} path @arg {string} x */
	params(root,path,x) {
		/** @type {number[]} */
		let map_entry_key_path=[];
		this.on_endpoint_params(root,path,map_entry_key_path,x,this.on_endpoint_params_callback.bind(this));
	}
	/** @private @type {string[]} */
	cache_player_params=[];
	/** @api @public @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {string} x @arg {T_ParseCallbackFunction<T>} params_callback */
	on_endpoint_params(root,path,map_entry_key_path,x,params_callback) {
		if(x===void 0) {debugger; return;}
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_endpoint_param(root,path,map_entry_key_path,new Map(param_map),params_callback);
	}
	/** @api @public @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_endpoint_param(root,path,map_entry_key_path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let mk=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,mk,callback);
		for(let i=1;i<300;i++) {
			if(!mk.includes(i)) continue;
			map_entry_key_path.push(i);
			parse_key(map_entry_key_path);
			map_entry_key_path.pop();
		}
		if(this.eq_keys(mk,[])) return;
		let param_obj=this.to_param_obj(map);
		console.log(`[endpoint.${path}] [idx=${key_index}]`,param_obj);
		{debugger;}
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
	parse_key_index=1;
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
	/** @private @arg {V_ParamMapType} x @returns {D_ParamObjType} */
	to_param_obj(x) {
		return Object.fromEntries([...x.entries()].map(e => {
			let ei=e[1];
			if(ei instanceof Map) {return [e[0],this.to_param_obj(ei)];}
			return [e[0],ei];
		}));
	}
	/** @protected @arg {CF_L_CTP_Params} cf @arg {string} x */
	clickTrackingParams(cf,x) {this.x.get("handle_types").params(cf,"tracking.trackingParams",x);}
	/** @protected @arg {CF_D_STR} cf @arg {string} x */
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
	get indexed_db() {
		return this.x.get("indexed_db");
	}
	indexed_db_version=3;
	/** @protected @arg {AGA_push_waiting_obj_noVersion} args */
	indexed_db_put(...args) {
		this.indexed_db.put(...args,this.indexed_db_version);
	}
	/** @protected @arg {`UC${string}`} raw_id */
	D_ChannelId(raw_id) {
		const cf="D_ChannelId"; this.k(cf,raw_id);
		if(this.str_starts_with_rx("UC",raw_id)) {
			const [a,id]=split_string_once(raw_id,"UC"); if(a!=="") debugger;
			this.indexed_db_put("channel_id",{key: `channel_id:UC:${raw_id}`,type: "channel_id:UC",id,raw_id});
			if(raw_id.length===24) return;
			console.log("[channelId.length]",raw_id.length);
			return;
		}
		this.codegen_str(cf,raw_id);
	}
	/** @protected @template {{}} T @arg {CF_M_s_priv} cf @arg {T} x */
	s_priv(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @typedef {`${string}${D_EndpointLikeEndings}`} EPL */
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
	/** @protected @template T @arg {B_TagObj<T>} x */
	B_TagObj(x) {
		const cf="B_TagObj";
		const {tag,...y}=this.s(cf,x);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[done.${cf}.next_key] [${ka.shift()}]`);
		}
		return tag;
	}
	/** @protected @template T @template {T} U @arg {T} v1 @arg {U} v2 */
	ceq(v1,v2) {if(v1!==v2) {debugger; return false;}; return true;}
	/** @public @arg {CF_L_TP_Params} cf @arg {string} x */
	trackingParams(cf,x) {this.x.get("handle_types").params(cf,"tracking.trackingParams",x);}
	/** @private @type {Map<string,string[]>} */
	missing_codegen_types=new Map;
	/** @protected @arg {string} cf @arg {{}} x */
	codegen_typedef_all(cf,x,do_break=true) {
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
		if(do_break) {debugger;}
	}
	/** @protected @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
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
	/** @private @arg {`${number}`} x */
	parse_number(x) {
		if(typeof x!=="string") debugger;
		if(x.includes(".")) return parseFloat(x);
		if(x.includes("e")) return parseFloat(x);
		return parseInt(x,10);
	}
	/** @protected @template {number} T @arg {`${T}`} x */
	parse_number_template(x) {
		/** @type {T} */
		let num=as(this.parse_number(x));
		return num;
	}
	k=this.save_keys;
	/** @api @public @template {{}} T @arg {CF_M_s} cf @arg {T} x */
	s(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/** @template T @template {T_OpenPopup_Dialog<T>} U @arg {U} x @returns {[true,U["popup"]]|[false,U["popupType"]]} */
	unpack_popup_dialog(x) {
		if(x.popupType!=="DIALOG") return [false,x.popupType];
		return [true,x.popup];
	}
	/** @override @returns {"unknown"|"normal"} */
	get service_type() {return "normal";}
	/** @public @template {string} PN @template {string} HR @template {string} HS @template {string} Pr_C @template {string} PRS @template {UrlParseRes<HR,HS,Pr_C,PRS,string>} T @arg {T} x @arg {PN} pathname @template {T extends infer E extends T?E["pathname"] extends PN?E:never:never} R @returns {x is R} */
	static is_url_with_pathname(x,pathname) {
		/** @arg {R} x */
		function use_r(x) {x; use_r_2(x);}
		/** @arg {R} x */
		function use_r_2(x) {x; use_r(x);}
		return x.pathname===pathname;
	}
	/** @protected @arg {UrlTypes} url_type @arg {{}} x @returns {G_ResponseTypes|null} */
	get_res_data(url_type,x) {
		/** @private @type {T_Split<UrlTypes, ".">} */
		let target=split_string(url_type,".");
		/** @private @type {G_ResponseTypes|null} */
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
			case "pdg": res=this.convert_pdg(target,x); break;
		}
		switch(target.length) {case 1: res=this.convert_length_1(target,x); break;}
		if(res) return res;
		console.log("[log_get_res_data]",target,x);
		{debugger;}
		return {
			type: "_Generic",
			data: x,
		};
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["like",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_like(target,x) {
		switch(target[1]) {
			default: debugger; break; case "dislike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_Dislike} */
				data: as(x),
			}; case "like": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_Like} */data: as(x),
			}; case "removelike": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSL_RemoveLike} */data: as(x),
			};
		}
		return null;
	}
	/** @protected @arg {D_ApiUrlFormat} x */
	use_template_url(x) {
		const res_parse=this.parse_with_url_parse(x);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",x,res_parse);
			throw new Error("unreachable");
		}
		let path_parts=split_string(split_string_once(res_parse.pathname,"/")[1],"/");
		return this.parser.get_url_type(path_parts);
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,[any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_length_1(target,x) {
		switch(target[0]) {
			default: debugger; break;
			case "browse": return {
				type: target[0],
				/** @private @type {RS_Browse} */
				data: as(x),
			};
			case "feedback": return {
				type: target[0],
				/** @private @type {RS_Feedback} */
				data: as(x),
			};
			case "getDatasyncIdsEndpoint": return {
				type: target[0],
				/** @private @type {REG_DatasyncIds} */
				data: as(x),
			};
			case "getAccountSwitcherEndpoint": return {
				type: target[0],
				/** @private @type {REG_AccountSwitcher} */
				data: as(x),
			};
			case "get_transcript": return {
				type: target[0],
				/** @private @type {RSG_Transcript} */
				data: as(x),
			};
			case "get_survey": return {
				type: target[0],
				/** @private @type {RSG_Survey} */
				data: as(x),
			};
			case "guide": return {
				type: target[0],
				/** @private @type {RS_Guide} */
				data: as(x),
			};
			case "next": return {
				type: target[0],
				/** @private @type {RS_Next} */
				data: as(x),
			};
			case "player": return {
				type: target[0],
				/** @private @type {RS_Player} */
				data: as(x),
			};
			case "search": return {
				type: target[0],
				/** @private @type {RS_Search} */
				data: as(x),
			};
			case "updated_metadata": return {
				type: target[0],
				/** @private @type {RS_UpdateMetadata} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["reel",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_reel(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "reel_item_watch": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_WatchReelItem} */
				data: as(x),
			};
			case "reel_watch_sequence": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_ReelWatchSequence} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["notification",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_notification(target,x) {
		switch(target[1]) {
			default: debugger; return null;
			case "get_notification_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSG_NotificationMenu} */
				data: as(x),
			};
			case "get_unseen_count": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSG_GetUnseenCount} */
				data: as(x),
			};
			case "modify_channel_preference": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RSM_ChannelPreference} */
				data: as(x),
			};
			case "record_interactions": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_Success} */
				data: as(x),
			};
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["live_chat",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_live_chat(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get_live_chat_replay": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_GetLiveChat} */
				data: as(x),
			};
			case "get_live_chat": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_GetLiveChat} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["att",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_res_att(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "get": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AttGet} */
				data: as(x),
			};
			case "log": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AttLog_RC} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["account",any]>} target @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_account(target,x) {
		switch(target[1]) {
			default: debugger; break;
			case "account_menu": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AccountMenu} */
				data: as(x),
			};
			case "accounts_list": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_AccountsList} */
				data: as(x),
			};
			case "set_setting": return {
				type: `${target[0]}.${target[1]}`,
				/** @private @type {RS_SetSetting} */
				data: as(x),
			};
		}
		return null;
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["pdg",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_pdg(t,x) {
		switch(t[1]) {
			case "get_pdg_buy_flow": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_PdgBuyFlow} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["music",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_music(t,x) {
		switch(t[1]) {
			case "get_search_suggestions": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SearchSuggestions} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["share",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_share(t,x) {
		switch(t[1]) {
			case "get_share_panel": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SharePanel} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["playlist",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_playlist(t,x) {
		switch(t[1]) {
			case "get_add_to_playlist": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_AddToPlaylist} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["subscription",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_subscription(t,x) {
		switch(t[1]) {
			case "subscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RS_Subscribe} */
				data: as(x),
			};
			case "unsubscribe": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RS_Unsubscribe} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<UrlTypes, ".">,["browse",...any]>} t @arg {{}} x @returns {G_ResponseTypes|null} */
	convert_browse(t,x) {
		switch(t.length) {
			case 2: switch(t[1]) {
				case "edit_playlist": return {
					type: `${t[0]}.${t[1]}`,
					/** @private @type {RSB_EditPlaylist} */
					data: as(x),
				};
			}
			case 1: break;
		}
		switch(t[0]) {
			case "browse": return {
				type: t[0],
				/** @private @type {RS_Browse} */
				data: as(x),
			};
		}
	}
	/** @protected @arg {true} x */
	expect_true(x) {if(x!==true) debugger;}
	/** @protected @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with(str,needle) {return this.str_starts_with_rx(needle,str);}
	/** @private @arg {Extract<GM_All,{rootVe:any}>['rootVe']} x */
	on_root_visual_element(x) {
		this.ds.save_root_visual_element(x);
		/** @private @type {`${typeof x}`} */
		let ss=`${x}`;
		switch(ss) {
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
			default: {
				/** @private @type {GM_All[]} */
				let x=[]; x;
			}
		}
		switch(ss) {default: debugger;}
	}
	/** @protected @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {if(!this.str_starts_with(x,"/@")) debugger;}
	/** @protected @arg {string} x */
	_previousCsn(x) {console.log(base64_dec.decode_str(x));}
	/** @protected @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {return this.str_starts_with(x.targetId,w);}
	/** @protected @arg {Extract<GM_All,{rootVe:any}>['rootVe']} x */
	rootVe(x) {this.on_root_visual_element(x);}
	/** @protected @arg {"DE_CreateComment"} cf @arg {P_ParamParse} path @arg {K} k @template {`${string}Params`} K @template {{[U in K]:string;}} T @arg {T} x */
	TD_Params(cf,k,path,x) {const {[k]: a}=x; this.params(cf,path,a);}
}
export_(exports => {exports.ServiceMethods=ServiceMethods;});
