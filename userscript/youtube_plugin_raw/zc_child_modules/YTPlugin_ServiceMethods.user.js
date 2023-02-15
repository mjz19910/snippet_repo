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
const __module_name__="mod$ServiceMethods",store=required(window.__plugin_modules__),bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
const base64_dec=bs.base64_dec; const base64_url_dec=bs.base64_url_dec; const as=bs.as_;
const ServiceData=bs.ServiceData;
const split_string=bs.split_string; const split_string_once=bs.split_string_once;
const as_any=bs.as_any;
/** @extends {ServiceData<LoadAllServices,ServiceOptions>} */
class ServiceMethods extends ServiceData {
	/** @template {CF_T_Commands} T_CF @arg {T_CF} cf @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(cf,x,f) {this.z(this.w(`T_Commands:${cf}`,"commands",x),f);}
	get handle_types() {
		return this.x.get("handle_types");
	}
	/** @private @template T,U @arg {T_Item<T>} x @arg {(this:this,x:T)=>U} f */
	T_Item=(x,f) => this.y("T_Item","item",x,f);
	/** @private @template {string} T @arg {T} x @returns {x is `${string}:${string}`} */
	str_is_uri(x) {return x.includes(":");}
	/** @private @arg {string} x */
	GU_YoutubeUrlRedirect_RedirectToken(x) {
		let token_str=atob(x);
		let token_parts=split_string_once(token_str,"|");
		if(token_parts.length===1) {debugger; return;}
		let [p1,p2]=token_parts.map(x => base64_url_dec.decodeByteArray(x));
		if(!(p1&&p2)) return;
		for(let i=0;i<3;i++) {
			this.save_next_byte("url.redir_token[0].data",p1,i);
		}
		for(let i=0;i<3;i++) {
			this.save_next_byte("url.redir_token[1].data",p2,i);
		}
	}
	/** @private @arg {GU_YoutubeUrlRedirect_Event} x */
	GU_YoutubeUrlRedirect_Event(x) {
		switch(x) {
			default: debugger; break;
			case "":
			case "channel_banner":
			case "endscreen":
			case "product_shelf":
			case "video_description":
		}
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
	/** @private @arg {Extract<GU_VE83769_Url_External,`${string}://music.youtube.com${string}`>} x */
	handle_yt_music_url(x) {
		switch(x) {
			case "https://music.youtube.com/": break;
			default: debugger; break;
		}
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
		this.save_enum("CONTINUATION_REQUEST_TYPE",request);
		switch(request) {
			default: debugger; break;
			case "CONTINUATION_REQUEST_TYPE_BROWSE": {
				this.x.get("handle_types").decode_continuation_token(cf,token);
			} break;
			case "CONTINUATION_REQUEST_TYPE_REEL_WATCH_SEQUENCE": {
				this.params(cf,"continuation_request.reel_watch_sequence.token",token);
			} break;
			case "CONTINUATION_REQUEST_TYPE_WATCH_NEXT": {
				this.params(cf,"continuation_request.watch_next.token",token);
			} break;
		};
		/** @returns {T_OmitKey<T,"token"|"request">|typeof y} */
		function gu() {return y;}
		let u=gu();
		this.assert_is_omit_key(x,y,u);
		return u;
	}
	/** @type {this["handle_types"]|null} */
	_b_cls=null;
	get b_cls() {
		if(this._b_cls) return this._b_cls;
		this._b_cls=this.handle_types;
		return this._b_cls;
	}
	/** @private @arg {DC_ShowReelsCommentsOverlay} x */
	DC_ShowReelsCommentsOverlay(x) {this.y("DC_ShowReelsCommentsOverlay","engagementPanel",x,x => this.b_cls.R_EngagementPanelSectionList(x));}
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
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Added") debugger;
		this.E_PlaylistEdit(serviceEndpoint);
	}
	/** @protected @arg {E_PlaylistEdit} x */
	E_PlaylistEdit(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","playlistEditEndpoint",x); this.g(y); this.M_EditPlaylist(a); this.DE_PlaylistEdit(b);}
	/** @private @arg {M_EditPlaylist} x */
	M_EditPlaylist(x) {this.T_WCM("M_EditPlaylist",x,this.GM_EditPlaylist);}
	/** @private @arg {GM_EditPlaylist} x */
	GM_EditPlaylist(x) {this.T_GM("GM_EditPlaylist",x,x => this.ceq(x,"/youtubei/v1/browse/edit_playlist"));}
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
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_1, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_1(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_1"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Watch Later") debugger;
		this.E_PlaylistEdit(serviceEndpoint);
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "toggled">} x */
	D_ThumbnailOverlayToggleButton_ToggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_ToggledPrefix"; this.k(cf,x);
		const {accessibility,icon,tooltip,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Added") debugger;
	}
	/** @private @arg {T_RemovePrefix<D_ThumbnailOverlayToggleButton_2, "untoggled">} x */
	D_ThumbnailOverlayToggleButton_UntoggledPrefix_2(x) {
		const cf="D_ThumbnailOverlayToggleButton_UntoggledPrefix_2"; this.k(cf,x);
		const {accessibility,icon,tooltip,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.T_Icon(`${cf}:icon`,icon);
		if(tooltip!=="Add to queue") debugger;
		let [wc,s]=this.T_SE_Signal(cf,serviceEndpoint);
		const cf1="D_ToggleButton_ServiceEP.data";
		this.M_SendPost(wc);
		this.G_ClientSignal(cf1,s);
	}
	/** @type {Map<string,[string,string[]][]>} */
	strings_map=new Map;
	/** @private @arg {CF_add_string_to_map} cf @arg {"defaultTooltip"|"toggledTooltip"|"accessibilityData.accessibilityData.label"} k_arg @arg {string} x */
	add_string_to_map(cf,k_arg,x) {
		/** @type {`${typeof cf}::${typeof k_arg}`} */
		let k=`${cf}::${k_arg}`; this.save_string(k,x);
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
	/** @private @arg {Extract<G_ClientSignal_Item,TA_OpenPopup<any>>} x */
	S_Client_Popup(x) {
		const cf="S_Client_Popup"; this.k(cf,x);
		const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.S_Client_OpenPopupAction(openPopupAction);
	}
	/** @private @arg {AD_Signal} x */
	AD_Signal(x) {
		const cf="AD_Signal";
		const {signal,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(signal) {
			default: debugger; break;
			case "ENABLE_CHROME_NOTIFICATIONS": case "HELP": case "HISTORY_BACK": case "HISTORY_FORWARD": case "SKIP_NAVIGATION": case "TOGGLE_TRANSCRIPT_TIMESTAMPS":
		}
	}
	/** @protected @arg {R_ConfirmDialog} x */
	R_ConfirmDialog(x) {this.H_("R_ConfirmDialog","confirmDialogRenderer",x,this.D_ConfirmDialog);}
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
	/** @private @arg {R_VoiceSearchDialog} x */
	R_VoiceSearchDialog(x) {this.H_("R_VoiceSearchDialog","voiceSearchDialogRenderer",x,this.D_VoiceSearchDialog);}
	/** @private @arg {D_VoiceSearchDialog} x */
	D_VoiceSearchDialog(x) {
		const cf="D_VoiceSearchDialog"; this.k(cf,x);
		const {trackingParams,exitButton,...y}=this.s(cf,x);
		this.trackingParams(cf,trackingParams);
		this.R_Button(exitButton);
		let u=Object.entries(y);
		for(let x of u) {
			let c=x[1];
			if("runs" in c) {
				this.G_Text(c);
				continue;
			}
		}
	}
	/** @private @arg {P_ClientSignal["popup"]} x */
	S_Client_HandlePopup(x) {
		const cf="S_Client_HandlePopup"; this.k(cf,x);
		if("voiceSearchDialogRenderer" in x) return this.R_VoiceSearchDialog(x);
		if("notificationActionRenderer" in x) return this.RA_Notification(x);
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
	/** @private @arg {AD_SendFeedback} x */
	AD_SendFeedback(x) {const cf="AD_SendFeedback",{bucket,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ if(bucket!=="Kevlar") debugger;}
	/** @private @arg {A_SendFeedback} x */
	A_SendFeedback(x) {let [a,b]=this.TE_Endpoint_2("A_SendFeedback","sendFeedbackAction",x); this.g(b); this.AD_SendFeedback(a);}
	/** @private @arg {E_ShowEngagementPanel} x */
	E_ShowEngagementPanel(x) {let [a,b]=this.TE_Endpoint_2("E_ShowEngagementPanel","showEngagementPanelEndpoint",x); this.g(b); this.DE_ShowEngagementPanel(a);}
	/** @private @arg {DE_ShowEngagementPanel} x */
	DE_ShowEngagementPanel(x) {
		const cf="D_ShowEngagementPanel"; this.k(cf,x);
		const {panelIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(panelIdentifier!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @private @arg {A_Signal} x */
	A_Signal(x) {let [a,y]=this.TE_Endpoint_2("A_Signal","signalAction",x); this.g(y); this.AD_Signal(a);}
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
	/** @protected @arg {string} cf1 @arg {G_ClientSignal} x */
	G_ClientSignal(cf1,x) {
		const cf2="G_ClientSignal";
		let {actions,...y}=this.Signal_Omit(x,x => {
			this.save_string(`${cf2}.${cf1}.signal`,x);
			if(x!=="CLIENT_SIGNAL") debugger;
		}); this.g(y);
		this.z_cf(cf1,actions,this.G_SignalActionItem);
	}
	/** @private @template U @template {T_Signal<U>} T @arg {T} x @arg {(t:T["signal"])=>void} f @returns {Omit<T,"signal">} */
	Signal_Omit(x,f) {
		const cf="Signal_Omit";
		const {signal,...y}=this.s(cf,x); f(signal);
		return y;
	}
	/** @private @arg {TM_Visibility} x */
	TM_Visibility(x) {
		const cf="TM_Visibility"; this.k(cf,x);
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_string("Visibility.types",types);
	}
	/** @protected @arg {M_SendPost} x */
	M_SendPost(x) {this.T_WCM("M_SendPost",x,this.GM_SendPost);}
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
	/** @private @arg {D_Survey_Watch} x */
	D_Survey_Watch(x) {this.y("D_Survey_Watch","watch",x,this.B_Hack);}
	/** @private @arg {D_PaidDigitalGoods} x */
	R_PaidDigitalGoods(x) {this.H_("R_PaidDigitalGoods","paidDigitalGoods",x,this.B_Hack);}
	/** @private @arg {G_DC_GetSurvey_Endpoint} x */
	G_DC_GetSurvey_Endpoint(x) {
		const cf="G_DC_GetSurvey_Endpoint"; this.k(cf,x);
		if("paidDigitalGoods" in x) return this.R_PaidDigitalGoods(x);
		if("watch" in x) return this.D_Survey_Watch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @protected @arg {"D_InfoCardIcon"} cf @arg {D_TrackingParams} x */
	D_TrackingParams(cf,x) {this.y(cf,"trackingParams",x,x => this.trackingParams(cf,x));}
	/** @protected @template T,U @arg {T_Id<T>} x @arg {(this:this,x:T)=>U} f */
	T_Id(x,f) {return f.call(this,x.id);}
	/** @private @arg {"AD_ChangeEngagementPanelVisibility"} cf @arg {D_EngagementPanelTargetId} x */
	D_EngagementPanelTargetId(cf,x) {
		switch(x) {
			default: x===""; this.codegen_case(`${cf}.targetId`,x); break;
			case "engagement-panel-clip-create":
			case "engagement-panel-clip-view":
			case "engagement-panel-comments-section":
			case "engagement-panel-error-corrections":
			case "engagement-panel-macro-markers-auto-chapters":
			case "engagement-panel-macro-markers-description-chapters":
			case "engagement-panel-searchable-transcript":
			case "engagement-panel-structured-description":
		}
	}
	/** @protected @arg {RA_Notification} x */
	RA_Notification(x) {this.H_("RA_NotificationAction","notificationActionRenderer",x,this.AD_Notification);}
	/** @private @arg {AD_Notification} x */
	AD_Notification(x) {
		const cf="AD_Notification"; this.k(cf,x);
		const {responseText,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(responseText);
		this.t(actionButton,this.R_Button);
		this.trackingParams(cf,trackingParams);
	}
	/** @protected @template {string} T @arg {T_BaseUrl<T>} x @arg {(this:this,x:T)=>void} f */
	T_BaseUrl(x,f) {
		const cf="T_BaseUrl";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.t(elapsedMediaTimeSeconds,this.a_primitive_num);
	}
	/** @protected @arg {CF_T_Signal} cf @template T @arg {T_Signal<T>} x */
	T_Signal(cf,x) {return this.w(`T_Signal:${cf}`,"signal",x);}
	/** @protected @template {{}} U @arg {U} x @template {string} VV @arg {VV} pf @returns {[T_RemovePrefix<U,VV>,Omit<U,`${VV}${string}`>]} */
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
	/** @protected @arg {D_ImpressionCap} x */
	D_ImpressionCap(x) {
		const cf="D_ImpressionCap"; this.k(cf,x);
		if(this.w(`Other:${cf}`,"impressionCap",x)!=="1") debugger;
	}
	/** @protected @arg {D_Hint} x */
	D_Hint(x) {
		const cf="D_Hint"; this.k(cf,x);
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.ceq(hintId,"sponsor-pre-purchase");
		this.ceq(dwellTimeMs,"60000");
		this.D_ImpressionCap(hintCap);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {D_LikeButton_Like} x */
	D_LikeButton_Like(x) {
		const cf="D_LikeButton.like";
		const {status,count,countText,countWithLikeText,countWithUnlikeText,countTooltipText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(status) {
			default: debugger; break;
			case "DISLIKE":
			case "INDIFFERENT":
		}
		this.t(count,this.a_primitive_num);
		this.G_Text(countText);
		this.t(countWithLikeText,this.G_Text);
		this.t(countWithUnlikeText,this.G_Text);
		this.t(countTooltipText,this.G_Text);
	}
	/** @private @arg {D_LikeButton_Dislike} x */
	D_LikeButton_Dislike(x) {
		const cf="D_LikeButton.dislike";
		const {countText,countWithDislikeText,countWithUndislikeText,countTooltipText,...y}=this.s(cf,x); this.g(y);
		this.G_Text(countText);
		this.t(countWithDislikeText,this.G_Text);
		this.t(countWithUndislikeText,this.G_Text);
		this.t(countTooltipText,this.G_Text);
	}
	/** @private @arg {D_LikeButton} x */
	D_LikeButton(x) {
		const cf="D_LikeButton"; this.k(cf,x);
		const {likesAllowed,...y}=this.s(cf,x);
		if(likesAllowed!==true) debugger;
		let [upt,ur]=this.unwrap_prefix(y,"like");
		this.D_LikeButton_Like(upt);
		let [ud,{...y1}]=this.unwrap_prefix(ur,"dislike");
		this.D_LikeButton_Dislike(ud);
		if("target" in y1) {
			const cf="D_LikeButton.rest";
			const {target,trackingParams,serviceEndpoints,...y2}=y1; this.g(y2);
			this.t(target,this.D_LikeApi);
			if(trackingParams) this.trackingParams(cf,trackingParams);
			this.tz(serviceEndpoints,this.E_Like);
		}
	}
	/** @protected @arg {string} cf @arg {{}} x */
	g_k=(cf,x) => this.k(cf,x);
	/** @protected @arg {E_Like} x */
	E_Like(x) {const [a,b,y]=this.TE_Endpoint_3("E_Like","likeEndpoint",x); this.g(y); this.M_Like(a); this.DE_Like(b);}
	/** @private @arg {M_Like} x */
	M_Like(x) {this.T_WCM("M_Like",x,this.GM_Like);}
	/** @private @arg {D_LikeApi} x */
	D_LikeApi(x) {
		if(!x) {debugger; return;}
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
	/** @protected @arg {R_LikeButton} x */
	R_LikeButton(x) {this.H_("R_LikeButton","likeButtonRenderer",x,this.D_LikeButton);}
	/** @protected @arg {R_Hint} x */
	R_Hint(x) {this.H_("R_Hint","hintRenderer",x,this.D_Hint);}
	/** @protected @arg {R_ReelPlayerOverlay} x */
	R_ReelPlayerOverlay(x) {this.H_("R_ReelPlayerOverlay","reelPlayerOverlayRenderer",x,this.D_ReelPlayerOverlay);}
	/** @private @arg {R_ReelPlayerHeader} x */
	R_ReelPlayerHeader(x) {this.H_("R_ReelPlayerHeader","reelPlayerHeaderRenderer",x,this.D_ReelPlayerHeader);}
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
	/** @private @arg {R_PivotButton} x */
	R_PivotButton(x) {this.H_("R_PivotButton","pivotButtonRenderer",x,this.D_PivotButton);}
	/** @private @arg {A_AddToToast} x */
	A_AddToToast(x) {x;}
	/** @private @arg {D_PivotButton} x */
	D_PivotButton(x) {
		const cf="D_PivotButton"; this.k(cf,x);
		const {thumbnail,onClickCommand,trackingParams,contentDescription,soundAttributionTitle,backgroundColor,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(thumbnail,this.D_Thumbnail);
		this.t(onClickCommand,x => {
			if("addToToastAction" in x) return this.A_AddToToast(x);
			if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
			x;
		});
		if(trackingParams) this.trackingParams(cf,trackingParams);
		this.t(contentDescription,this.G_Text);
		this.t(soundAttributionTitle,this.G_Text);
		this.t(backgroundColor,x => {
			switch(x) {
				default: debugger; break;
				case "THEME_ATTRIBUTE_OVERLAY_BACKGROUND_MEDIUM":
			}
		});
	}
	/** @protected @arg {R_Button} x */
	R_Button(x) {this.H_("R_Button","buttonRenderer",x,this.D_Button);}
	/** @private @arg {D_Button_targetId} x */
	D_Button_targetId(x) {
		let cf="D_Button_targetId";
		switch(x) {
			default: debugger; x===""; break;
			case "watch-supervod-button":
			case "clip-info-button":
			case "create-clip-button-action-bar":
			case "sponsorships-button":
		}
		this.targetId(cf,x);
	}
	/** @private @arg {DE_Unsubscribe} x */
	DE_Unsubscribe(x) {
		const cf="DE_Unsubscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.D_ChannelId);
		this.params(cf,"unsubscribe.params",params);
	}
	/** @private @arg {D_Button_NavEP} x */
	D_Button_NavEP(x) {
		const cf="D_Button_NavEP"; this.k(cf,x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("urlEndpoint" in x) return this.E_VE83769_Url(x);
		if("createCommentReplyDialogEndpoint" in x) return;
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {GM_YpcGetOffers} x */
	GM_YpcGetOffers(x) {this.T_GM("GM_YpcGetOffers",x,x => this.ceq(x,"/youtubei/v1/ypc/get_offers"));}
	/** @private @arg {GM_CreateComment} x */
	GM_CreateComment(x) {this.T_GM("GM_CreateComment",x,x => this.ceq(x,"/youtubei/v1/comment/create_comment"));}
	/** @protected @arg {GM_Unsubscribe} x */
	GM_Unsubscribe(x) {this.T_GM("GM_GetTranscript",x,x => this.ceq(x,"/youtubei/v1/subscription/unsubscribe"));}
	/** @private @arg {M_YpcGetOffers} x */
	M_YpcGetOffers(x) {this.T_WCM("M_YpcGetOffers",x,this.GM_YpcGetOffers);}
	/** @private @arg {M_CreateComment} x */
	M_CreateComment(x) {this.T_WCM("M_CreateComment",x,this.GM_CreateComment);}
	/** @private @arg {M_Unsubscribe} x */
	M_Unsubscribe(x) {this.T_WCM("M_Unsubscribe",x,this.GM_Unsubscribe);}
	/** @private @arg {E_Unsubscribe} x */
	E_Unsubscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Unsubscribe","unsubscribeEndpoint",x); this.g(y); this.DE_Unsubscribe(b); this.M_Unsubscribe(a);}
	/** @private @arg {E_CreateComment} x */
	E_CreateComment(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreateComment","createCommentEndpoint",x); this.g(y); this.DE_CreateComment(b); this.M_CreateComment(a);}
	/** @protected @arg {E_ShareEntityService} x */
	E_ShareEntityService(x) {const [a,b,y]=this.TE_Endpoint_3("E_ShareEntityService","shareEntityServiceEndpoint",x); this.g(y); this.M_GetSharePanel(a); this.DE_ShareEntityService(b);}
	/** @protected @arg {C_GetPdgBuyFlow} x */
	C_GetPdgBuyFlow(x) {let [a,b,y]=this.TE_Endpoint_3("C_GetPdgBuyFlow","getPdgBuyFlowCommand",x); this.g(y); this.M_GetPdgBuyFlow(a); this.DC_GetPdgBuyFlow(b);}
	/** @private @arg {M_GetPdgBuyFlow} x */
	M_GetPdgBuyFlow(x) {this.T_WCM("M_GetPdgBuyFlow",x,this.GM_GetPdgBuyFlow);}
	/** @protected @arg {GM_GetPdgBuyFlow} x */
	GM_GetPdgBuyFlow(x) {this.T_GM("GM_GetTranscript",x,x => this.ceq(x,"/youtubei/v1/pdg/get_pdg_buy_flow"));}
	/** @private @arg {M_GetSharePanel} x */
	M_GetSharePanel(x) {this.T_WCM("M_GetSharePanel",x,this.GM_GetSharePanel);}
	/** @private @arg {GM_GetSharePanel} x */
	GM_GetSharePanel(x) {this.T_GM("GM_GetSharePanel",x,x => this.ceq(x,"/youtubei/v1/share/get_share_panel"));}
	/** @protected @arg {CF_TA_OpenPopup} cf1 @template T @arg {TA_OpenPopup<T>} x */
	TA_OpenPopup(cf1,x) {
		const cf2="TA_OpenPopup";
		const {clickTrackingParams,openPopupAction: a,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(`${cf1}.tracking`,clickTrackingParams);
		return a;
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
	/** @private @arg {R_UnifiedSharePanel} x */
	R_UnifiedSharePanel(x) {this.H_("R_UnifiedSharePanel","unifiedSharePanelRenderer",x,this.D_UnifiedSharePanel);}
	/** @private @arg {Popup_ShareEntityService} x */
	Popup_ShareEntityService(x) {
		const cf="Popup_ShareEntityService";
		const {popup,popupType,beReused,...y}=this.s(cf,x); this.g(y);
		this.R_UnifiedSharePanel(popup);
		if(popupType!=="DIALOG") debugger;
		this.a_primitive_bool(beReused);
	}
	/** @private @arg {DE_ShareEntityService} x */
	DE_ShareEntityService(x) {
		const cf="DE_ShareEntityService";
		const {serializedShareEntity: a,commands: b,...y}=this.s(cf,x); this.g(y);
		let [u1,y1]=this.z(b,x => this.TA_OpenPopup(cf,x));
		this.z(y1,x => {if(x!==void 0) debugger;});
		this.z(u1,this.Popup_ShareEntityService);
	}
	/** @private @arg {D_Button_SE} x */
	D_Button_SE(x) {
		const cf="D_Button_SE"; this.k(cf,x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("ypcGetOffersEndpoint" in x) return this.E_YpcGetOffers(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("unsubscribeEndpoint" in x) return this.E_Unsubscribe(x);
		if("createCommentEndpoint" in x) return this.E_CreateComment(x);
		if("getPdgBuyFlowCommand" in x) return this.C_GetPdgBuyFlow(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_Button} x */
	D_Button(x) {
		/** @type {"D_Button"|`D_Button:${"serviceEndpoint"|"navigationEndpoint"|"command"|"style"}`} */
		let cf="D_Button";
		if("serviceEndpoint" in x) cf="D_Button:serviceEndpoint";
		else if("navigationEndpoint" in x) cf="D_Button:navigationEndpoint";
		else if("command" in x) cf="D_Button:command";
		else if("style" in x) cf="D_Button:style";
		const {style,size,isDisabled,serviceEndpoint,text,icon,navigationEndpoint,accessibility,tooltip,trackingParams,hint,iconPosition,accessibilityData,targetId,command,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(hint,this.R_Hint);
		this.t(iconPosition,x => this.save_enum("BUTTON_ICON_POSITION_TYPE",x));
		this.t(targetId,this.D_Button_targetId);
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
		this.t(navigationEndpoint,this.D_Button_NavEP);
		this.t(accessibility,this.D_Label);
		this.t(tooltip,this.a_primitive_str);
		this.t(trackingParams,x => this.trackingParams(cf,x));
		this.t(accessibilityData,this.D_Accessibility);
		this.t(command,this.GC_Button);
	}
	/** @private @arg {GM_Next} x */
	GM_Next(x) {this.T_GM("GM_Next",x,x => this.ceq(x,"/youtubei/v1/next"));}
	/** @private @arg {GM_Browse} x */
	GM_Browse(x) {this.T_GM("GM_Browse",x,x => this.ceq(x,"/youtubei/v1/browse"));}
	/** @private @arg {MC_Continuation} x */
	MC_Continuation(x) {
		this.T_WCM("MC_Continuation",x,x => {
			switch(x.apiUrl) {
				default: debugger; break;
				case "/youtubei/v1/browse": this.GM_Browse(x); break;
				case "/youtubei/v1/next": this.GM_Next(x); break;
			}
		});
	}
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
	/** @protected @arg {C_Continuation} x */
	C_Continuation(x) {
		const [a,b,y]=this.TE_Endpoint_Opt_3("C_Continuation","continuationCommand",x); this.g(y);
		this.t(a,this.MC_Continuation);
		this.DC_Continuation(b);
	}
	/** @protected @arg {CF_T_SE_Signal} cf @template {{webCommandMetadata:any}} T @template U @arg {T_SE_Signal<T,U>} x @returns {[T,U]} */
	T_SE_Signal(cf,x) {
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @type {`T_SE_Signal:${CF_T_SE_Signal}`} */
		this.clickTrackingParams(`T_SE_Signal:${cf}`,clickTrackingParams);
		return [commandMetadata,signalServiceEndpoint];
	}
	/** @protected @arg {C_CommandExecutor} x */
	C_Executor(x) {
		const cf="C_Executor"; this.k(cf,x);
		const {clickTrackingParams,commandExecutorCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_CommandExecutor(commandExecutorCommand);
	}
	/** @private @arg {E_CreateBackstagePost} x */
	E_CreateBackstagePost(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreateBackstagePost","createBackstagePostEndpoint",x); this.g(y); this.M_CreateBackstagePost(a); this.DE_CreateBackstagePost(b);}
	/** @protected @arg {C_GetSurvey} x */
	C_GetSurvey(x) {
		const cf="C_GetSurvey"; this.k(cf,x);
		const {clickTrackingParams: a,commandMetadata: b,getSurveyCommand: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,a);
		this.DC_GetSurvey(c);
		const {apiUrl,sendPost,...y1}=this.unpack_T_WCM("MG_Survey_CMD",b); this.g(y1);
		if(apiUrl!=="/youtubei/v1/get_survey") debugger;
		if(sendPost!==true) debugger;
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
	/** @protected @arg {GM_AddToPlaylistService} x */
	GM_AddToPlaylistService(x) {this.T_GM("GM_AddToPlaylistService",x,x => this.ceq(x,"/youtubei/v1/playlist/get_add_to_playlist"));}
	/** @private @template T @arg {CF_T_WCM_Unpack} cf @arg {{webCommandMetadata: T}} x */
	unpack_T_WCM(cf,x) {return this.w(`Unpack:T_WCM:${cf}`,"webCommandMetadata",x);}
	/** @protected @arg {M_AddToPlaylistService} x */
	M_AddToPlaylistService(x) {this.T_WCM("M_AddToPlaylistService",x,this.GM_AddToPlaylistService);}
	/** @protected @arg {DE_AddToPlaylistService} x */
	DE_AddToPlaylistService(x) {
		const cf="DE_AddToPlaylistService"; this.k(cf,x);
		const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.videoId(videoId);
	}
	/** @protected @arg {E_AddToPlaylistService} x */
	E_AddToPlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_AddToPlaylistService","addToPlaylistServiceEndpoint",x); this.g(y); this.M_AddToPlaylistService(a); this.DE_AddToPlaylistService(b);}
	/** @private @arg {C_ShowReelsCommentsOverlay} x */
	C_ShowReelsCommentsOverlay(x) {let [a,y]=this.TE_Endpoint_2("C_ShowReelsCommentsOverlay","showReelsCommentsOverlayCommand",x); this.g(y); this.DC_ShowReelsCommentsOverlay(a);}
	/** @protected @arg {E_Feedback} x */
	E_Feedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","feedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_Feedback(b);}
	/** @protected @arg {GC_Button} x */
	GC_Button(x) {
		const cf="GC_Button"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		if("signalServiceEndpoint" in x) return this.T_SE_Signal(`${cf}.SE_Signal`,x);
		if("urlEndpoint" in x) return this.E_VE83769_Url(x);
		if("commandExecutorCommand" in x) return this.C_Executor(x);
		if("createBackstagePostEndpoint" in x) return this.E_CreateBackstagePost(x);
		if("getSurveyCommand" in x) return this.C_GetSurvey(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("showReelsCommentsOverlayCommand" in x) return this.C_ShowReelsCommentsOverlay(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {R_MenuFlexibleItem} x */
	R_MenuFlexibleItem(x) {this.H_("R_MenuFlexibleItem","menuFlexibleItemRenderer",x,this.D_MenuFlexibleItem);}
	/** @private @arg {DT_MenuFlexibleItem} x */
	D_MenuFlexibleItem(x) {
		const cf="D_MenuFlexibleItem"; this.k(cf,x);
		const {menuItem,topLevelButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_MenuServiceItem(menuItem);
		this.R_Button(topLevelButton);
	}
	/** @protected @arg {D_LoggingDirectives} x */
	D_LoggingDirectives(x) {
		const cf="D_LoggingDirectives"; this.k(cf,x);
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(cf,trackingParams);
		this.t(visibility,this.TM_Visibility);
		this.t(gestures,this.D_LoggingDirectives_Gestures);
		if(enableDisplayloggerExperiment!==void 0) this._primitive_of(enableDisplayloggerExperiment,"boolean");
	}
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
	/** @private @arg {R_MenuServiceItem} x */
	R_MenuServiceItem(x) {this.H_("R_MenuServiceItem","menuServiceItemRenderer",x,this.RD_MenuServiceItem);}
	/** @protected @arg {R_Menu} x */
	R_Menu(x) {this.H_("R_Menu","menuRenderer",x,this.D_Menu);}
	/** @private @arg {R_ToggleMenuServiceItem} x */
	R_ToggleMenuServiceItem(x) {this.H_("R_ToggleMenuServiceItem","toggleMenuServiceItemRenderer",x,this.D_ToggleMenuServiceItem);}
	/** @private @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {this.H_("R_MenuNavigationItem","menuNavigationItemRenderer",x,this.D_MenuNavigationItem);}
	/** @private @arg {R_CommonConfig} x */
	R_CommonConfig(x) {this.H_("R_CommonConfig","commonConfig",x,this.D_CommonConfig);}
	/** @private @arg {G_MenuItem} x */
	G_MenuItem(x) {
		const cf="G_MenuItem"; this.g_k(cf,x); this.k(cf,x);
		if("toggleMenuServiceItemRenderer" in x) return this.R_ToggleMenuServiceItem(x);
		if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		this.codegen_typedef_all("MenuItems",x);
		this.G_Text(x);
	}
	/** @private @arg {D_Menu} x */
	D_Menu(x) {
		const cf="D_Menu";
		const {items,trackingParams,accessibility,menuPopupAccessibility,topLevelButtons,flexibleItems,loggingDirectives,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(menuPopupAccessibility,this.D_Label);
		this.tz(items,this.G_MenuItem);
		if(trackingParams) this.trackingParams(cf,trackingParams);
		this.t(accessibility,this.D_Accessibility);
		this.tz(flexibleItems,this.R_MenuFlexibleItem);
		this.tz(topLevelButtons,this.D_Menu_Button);
		this.t(targetId,x => {
			switch(x) {
				default: switch(x) {
				} debugger; break;
				case "browse-video-menu-button":
				case "watch-related-menu-button":
			}
			this.targetId(cf,x);
		});
	}
	/** @private @arg {D_ReelPlayerOverlay} x */
	D_ReelPlayerOverlay(x) {
		const cf="D_ReelPlayerOverlay";
		const {style,trackingParams,reelPlayerNavigationModel,likeButton,reelPlayerHeaderSupportedRenderers,menu,subscribeButtonRenderer,pivotButton,multimixAttributionLabel,viewCommentsButton,videoInteractions,shareButton,nextItemButton,prevItemButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.trackingParams(cf,trackingParams);
		switch(reelPlayerNavigationModel) {
			default: this.codegen_case(cf,reelPlayerNavigationModel); this.codegen_typedef_all(cf,x); break;
			case void 0:
			case "REEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED":
		}
		if(style!=="REEL_PLAYER_OVERLAY_STYLE_SHORTS") debugger;
		this.t(likeButton,this.R_LikeButton);
		this.t(reelPlayerHeaderSupportedRenderers,this.R_ReelPlayerHeader);
		this.t(menu,this.R_Menu);
		this.t(subscribeButtonRenderer,this.R_SubscribeButton);
		this.t(pivotButton,this.R_PivotButton);
		this.t(multimixAttributionLabel,this.R_ReelMultimixAttributionLabel);
		this.t(videoInteractions,this.g);
		this.t(nextItemButton,this.R_Button);
		this.t(prevItemButton,this.R_Button);
		this.t(shareButton,this.R_Button);
		this.t(viewCommentsButton,this.R_Button);
		this.trackingParams(cf,trackingParams);
	}
	/** @protected @arg {CF_T_Icon} cf1 @template {string} T @arg {T_Icon<T>} x */
	T_Icon(cf1,x) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:${cf1}`,x); this.g(y);/*#destructure_done*/
		this.save_string(`${cf1}:icon.iconType`,iconType);
	}
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
	/** @protected @arg {CF_TE_Endpoint_Opt_3} cf @template {EPL} EP_Key @template {TE_Endpoint_Opt_3<EP_Key,any,any>} T_EP @arg {EP_Key} k @arg {T_EP} x @returns {[T_EP["commandMetadata"],T_EP[EP_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|EP_Key>]} */
	TE_Endpoint_Opt_3(cf,k,x) {
		const {clickTrackingParams,commandMetadata,[k]: endpoint,...y}=this.s_priv(`TE_Endpoint_Opt_3:${cf}`,x);
		/** @type {`${CF_TE_Endpoint_Opt_3}.endpoint`} */
		this.clickTrackingParams(`${cf}.endpoint`,clickTrackingParams);
		return [commandMetadata,endpoint,y];
	}
	/** @protected @arg {A_ChangeEngagementPanelVisibility} x */
	A_ChangeEngagementPanelVisibility(x) {let [a,y]=this.TE_Endpoint_2("A_ChangeEngagementPanelVisibility","changeEngagementPanelVisibilityAction",x); this.g(y); this.AD_ChangeEngagementPanelVisibility(a);}
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
	/** @protected @template {CF_M_y} T_CF  @arg {T_CF} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K],cf:`${T_CF}.${K}`)=>U} f */
	y(cf,k,x,f) {return f.call(this,this.w(`y:${cf}`,k,x),`${cf}.${k}`);}
	/** @protected @arg {D_EndscreenElement_EP} x */
	D_EndscreenElement_EP(x) {
		const cf="D_EndscreenElement_EP"; this.k(cf,x);
		if("browseEndpoint" in x) return this.E_VE3611(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("urlEndpoint" in x) return this.E_VE83769_Url(x);
		debugger;
	}
	log_enabled_playlist_id=false;
	/** @private @type {string[]} */
	cache_playlist_id=[];
	/** @private @arg {Extract<G_UrlInfo,{type:`playlist:${string}`}>} x */
	log_playlist_id(x,critical=false) {
		if(!this.cache_playlist_id.includes(x.id)) {
			this.cache_playlist_id.push(x.id);
			if(this.log_enabled_playlist_id||critical) console.log("[playlist]",x.type,x.id);
		}
	}
	/** @protected @arg {string} user_key @arg {string} x @arg {number} [idx] */
	save_next_char(user_key,x,idx=0) {
		let f=x[idx];
		/** @type {`${user_key}.data[${typeof idx}]`} */
		let rk=`${user_key}.data[${idx}]`;
		/** @type {`${typeof rk}[${f}]`} */
		let k=`${rk}[${JSON.stringify(f)}]`;
		this.save_string(rk,f);
		let s_url_data=this.ds.get_data_store().get_seen_numbers().find(e => e[0]===k);
		if(!s_url_data) {this.save_number(k,1); return;}
		let wd=s_url_data[1];
		if(wd[0]!=="one") {debugger; return;}
		let [,di]=wd;
		if(!di.length) {this.save_number(k,1); return;}
		let n=di[0]+1;
		this.save_number(k,n);
	}
	/** @api @public @arg {"WL"|"LL"|`UU${string}`|`PL${string}`|`RD${string}`|`RDMM${string}`|`RDCMUC${string}`} x */
	parse_playlist_id(x) {
		if(x===void 0) {debugger; return;}
		switch(x) {case "LL": case "WL": return; default: }
		// cspell:ignore RDCMUC
		if(this.str_starts_with_rx("RDCMUC",x)) return this.save_next_char("playlist_id.RDCMUC",split_string_once(x,"RDCMUC")[1]);
		if(this.str_starts_with_rx("RDMM",x)) return this.save_next_char("playlist_id.RDMM",split_string_once(x,"RDMM")[1]);
		if(this.str_starts_with_rx("RD",x)) return this.save_next_char("playlist_id.RD",split_string_once(x,"RD")[1]);
		if(this.str_starts_with_rx("PL",x)) return this.save_next_char("playlist_id.PL",split_string_once(x,"PL")[1]);
		if(this.str_starts_with_rx("UU",x)) return this.save_next_char("playlist_id.UU",split_string_once(x,"UU")[1]);
		this.save_next_char("playlist_id.other",x[0]);
		console.log("[new_parse_playlist_id]",x);
		{debugger;}
	}
	/** @protected @arg {D_PlaylistId} x */
	playlistId(x) {this.parse_playlist_id(x);}
	/** @arg {V_ParamMapValue} x @returns {V_ParamObjData|null} */
	convert_value_item_to_param_item(x) {
		if(typeof x==='string') return x;
		if(typeof x==="number") return x;
		if(x instanceof Map) {
			let x1=this.convert_map_to_obj(x);
			if(!x1) {debugger; return null;}
			return x1;
		}
		if(x instanceof Array) {
			if(x[0]==="bigint") return x[2];
			if(x[0]==="group") {
				const [,r]=x;
				let vr=this.convert_arr_to_obj(r);
				if(!vr) {debugger; return null;}
				return vr;
			}
			if(x[0]==="failed") {debugger; return null;}
			x==="";
			return null;
		}
		if(x instanceof Uint8Array) return x;
		x==="";
		return null;
	}
	/** @typedef {string|bigint|number|Uint8Array|["begin"]|["end"]|V_ParamObj} V_ParamObjData */
	/** @typedef {{[x:number]:V_ParamObjData[]}} V_ParamObj */
	/** @arg {V_ParamMapType} x @returns {V_ParamObj|null} */
	convert_map_to_obj(x) {
		/** @template T @arg {T[]} x */
		function first(x) {
			if(x.length!==1) return null;
			return x[0];
		}
		/** @type {V_ParamObj} */
		let res={};
		for(let k of x.keys()) {
			let value=x.get(k);
			if(k in res) {
				debugger;
			}
			if(value===void 0) {debugger; continue;}
			res[k]??=[];
			if(value.length===0) {
				res[k].push({});
				continue;
			}
			if(value.length!==1) {
				/** @template T @arg {T|null} x @returns {x is T} */
				function is_not_null(x) {return x!==null;}
				/** @type {V_ParamObjData[]} */
				let v1=value.map(x => {
					let r=this.convert_value_item_to_param_item(x);
					if(r===null) {debugger; return null;}
					return r;
				}).filter(is_not_null);
				res[k].push(["begin"],...v1,["end"]);
				continue;
			}
			let v2=first(value);
			if(v2===null) {debugger; continue;}
			let v3=this.convert_value_item_to_param_item(v2);
			if(v3===null) {debugger; continue;}
			res[k].push(v3);
		}
		return res;
	}
	/** @arg {D_DecTypeNum[]} x */
	convert_arr_to_obj(x) {
		let x1=this.make_param_map(x);
		if(!x1) {debugger; return null;}
		return this.convert_map_to_obj(x1);
	}
	/** @private */
	_decoder=new TextDecoder();
	/** @private @arg {"D_QoeLoggingContext"|"D_VssLoggingContext"} cf1 @arg {V_SerializedContext_BinaryObj} x */
	V_SerializedContext_BinaryObj(cf1,x) {
		const cf_base="V_SerializedContext_BinaryObj";
		/** @type {`${cf_base}:${cf1}`} */
		const cf2=`${cf_base}:${cf1}`;
		const {1: {1: f1_f12,...y2},...y1}=this.s(cf2,x); this.g(y1); this.g(y2);
		if(f1_f12!==12) debugger;
		this.save_number(`${cf2}:f1:f12`,f1_f12);
	}
	/** @private @arg {"D_QoeLoggingContext"|"D_VssLoggingContext"} cf @arg {string} x */
	V_SerializedContextData(cf,x) {
		let x1=decodeURIComponent(x);
		let b_res=this._decode_b64_url_proto_obj(x1);
		if(!b_res) {debugger; return;}
		if(b_res.length!==1) debugger;
		let r_obj=this.convert_arr_to_obj(b_res);
		if(!r_obj) {debugger; return;}
		this.V_SerializedContext_BinaryObj(cf,as_any(r_obj));
		let [r]=b_res;
		switch(r[0]) {
			default: debugger; break;
			case "child": switch(r[1]) {
				case 1: break;
				case 3: {
					let playlist_id=this._decoder.decode(r[2]);
					if(this.str_starts_with_rx("RD",playlist_id)) {this.playlistId(as(playlist_id));} else {
						switch(r[1]) {
							default:
								this.save_string(`${cf}.serializedContextData.fieldId`,r[1]);
								let playlist_id=this._decoder.decode(r[2]);
								this.save_string(`${cf}.serializedContextData.decode`,playlist_id);
								break;
							case 3: {
								let playlist_id=this._decoder.decode(r[2]);
								if(this.str_starts_with_rx("RD",playlist_id)) {this.playlistId(playlist_id); break;}
								if(this.str_starts_with_rx("PL",playlist_id)) {this.playlistId(playlist_id); break;}
								{this.save_string(`${cf}.serializedContextData.decode(f3).as_playlist_id`,playlist_id); break;}
							}
						}
					}
				}
			} break;
		}
	}
	/** @private @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext"; this.k(cf,x);
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.V_SerializedContextData(cf,serializedContextData);
	}
	/** @private @arg {D_SerializedContextData} x */
	D_QoeLoggingContext(x) {
		const cf="D_QoeLoggingContext"; this.k(cf,x);
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.V_SerializedContextData(cf,serializedContextData);
	}
	/** @protected @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("R_VssLoggingContext","vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @protected @arg {E_ReelWatch} x */
	E_ReelWatch(x) {const [a,b,y]=this.TE_Endpoint_3("E_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.DE_VE37414_ReelWatch(b);}
	/** @protected @arg {E_VE83769_Upload} x */
	E_VE83769_Upload(x) {const [a,b,y]=this.TE_Endpoint_3("E_VE83769_Upload","uploadEndpoint",x); this.g(y); this.M_VE83769(a); this.B_Hack(b);}
	/** @protected @arg {B_Hack} x */
	B_Hack(x) {
		const cf="B_Hack"; this.k(cf,x);
		const {hack,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(hack!==true) debugger;
	}
	/** @private @arg {DC_GetPdgBuyFlow} x */
	DC_GetPdgBuyFlow(x) {
		const cf="DC_GetPdgBuyFlow";
		const {params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let dec_params=atob(params);
		this.params(cf,"get_pdg_buy_flow.params",dec_params);
	}
	/** @protected @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a}=this.s("T_UrlWrappedValue",x); return a;}
	/** @protected @arg {R_SubscribeButton} x */
	R_SubscribeButton(x) {this.H_("R_SubscribeButton","subscribeButtonRenderer",x,this.D_SubscribeButton);}
	/** @private @arg {D_SubscribeButton_SubscribedPrefix} x */
	D_SubscribeButton_SubscribedPrefix(x) {
		const cf="D_SubscribeButton_SubscribedPrefix";
		const {buttonText,entityKey,...y}=this.s(cf,x); this.g(y);
		this.t(buttonText,this.G_Text);
		this.t(entityKey,x => this.params(cf,"entity_key.subscribed",x));
	}
	/** @private @arg {D_SubscribeButton_UnsubscribedPrefix} x */
	D_SubscribeButton_UnsubscribedPrefix(x) {
		const cf="D_SubscribeButton_UnsubscribedPrefix";
		const {buttonText,...y}=this.s(cf,x); this.g(y);
		this.G_Text(buttonText);
	}
	/** @private @arg {D_SubscribeButton_SubscribePrefix} x */
	D_SubscribeButton_SubscribePrefix(x) {
		const cf="D_SubscribeButton_SubscribePrefix";
		const {accessibility,...y}=this.s(cf,x); this.g(y);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {D_SubscribeButton_UnsubscribePrefix} x */
	D_SubscribeButton_UnsubscribePrefix(x) {
		const cf="D_SubscribeButton_UnsubscribePrefix";
		const {buttonText,accessibility,...y}=this.s(`${cf}.unsubscribe`,x); this.g(y);
		this.t(buttonText,this.G_Text);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @protected @arg {R_SubscriptionNotificationToggleButton} x */
	R_SubscriptionNotificationToggleButton(x) {this.H_("R_SubscriptionNotificationToggleButton","subscriptionNotificationToggleButtonRenderer",x,this.D_SubscriptionNotificationToggleButton);}
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
	/** @private @arg {D_SubscribeButton} x */
	D_SubscribeButton(x) {
		const cf="D_SubscribeButton";
		const {enabled,buttonText,subscribed,type,channelId,trackingParams,showPreferences,...y1}=this.s(cf,x);
		this.a_primitive_bool(enabled);
		this.t(buttonText,this.G_Text);
		this.t(subscribed,this.a_primitive_bool);
		this.t(type,x => this.ceq(x,"FREE"));
		this.t(channelId,this.D_ChannelId);
		if(trackingParams) this.trackingParams(cf,trackingParams);
		this.t(showPreferences,this.a_primitive_bool);
		let [p1,o1]=this.unwrap_prefix(y1,"subscribed");
		this.D_SubscribeButton_SubscribedPrefix(p1);
		let [p2,o2]=this.unwrap_prefix(o1,"unsubscribed");
		this.D_SubscribeButton_UnsubscribedPrefix(p2);
		let [p3,o3]=this.unwrap_prefix(o2,"subscribe");
		this.D_SubscribeButton_SubscribePrefix(p3);
		let [p4,{...o4}]=this.unwrap_prefix(o3,"unsubscribe");
		this.D_SubscribeButton_UnsubscribePrefix(p4);
		const {onSubscribeEndpoints,onUnsubscribeEndpoints,targetId,notificationPreferenceButton,...y2}=o4;
		this.tz(onSubscribeEndpoints,this.E_Subscribe);
		this.tz(onUnsubscribeEndpoints,this.E_SignalService_SendPost);
		this.t(targetId,x => this.ceq(x,"watch-subscribe"));
		this.t(notificationPreferenceButton,this.R_SubscriptionNotificationToggleButton);
		const {serviceEndpoints,...y}=y2; this.g(y);
		this.tz(serviceEndpoints,x => {
			if("subscribeEndpoint" in x) return this.E_Subscribe(x);
			if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
			debugger;
		});
	}
	/** @private @arg {R_ReelMultimixAttributionLabel} x */
	R_ReelMultimixAttributionLabel(x) {this.H_("R_ReelMultimixAttributionLabel","reelMultimixAttributionLabelRenderer",x,this.D_ReelMultimixAttributionLabel);}
	/** @private @arg {D_ReelMultimixAttributionLabel} x */
	D_ReelMultimixAttributionLabel(x) {
		const cf="D_ReelMultimixAttributionLabel";
		const {icon,title,command,a11yLabel,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.T_Icon(cf,icon);
		this.G_Text(title);
		if(!command.watchEndpoint) debugger;
		this.E_Watch(command);
		this.a_primitive_str(a11yLabel);
		this.trackingParams(cf,trackingParams);
	}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	R_WatchEndpointMusicConfig(x) {this.H_("R_WatchEndpointMusicConfig","watchEndpointMusicConfig",x,this.D_WatchEndpointMusicConfig);}
	/** @private @arg {D_WatchEndpointMusicConfig} x */
	D_WatchEndpointMusicConfig(x) {
		const cf="D_WatchEndpointMusicConfig"; this.k(cf,x);
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(hasPersistentPlaylistPanel);
		this.ceq(musicVideoType,"MUSIC_VIDEO_TYPE_ATV");
	}
	/** @private @arg {R_PrefetchHintConfig} x */
	R_PrefetchHintConfig(x) {this.H_("R_PrefetchHintConfig","prefetchHintConfig",x,this.D_PrefetchHintConfig);}
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
	/** @private @arg {D_CommonConfig} x */
	D_CommonConfig(x) {this.H_("D_CommonConfig","url",x,x => this.parser.parse_url("D_CommonConfig.url",x));}
	/** @protected @arg {E_VE3611} x */
	E_VE3611(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE3611","browseEndpoint",x); this.g(y); this.M_VE3611(a); this.DE_VE3611(b);}
	/** @private @arg {E_VE3854} x */
	E_VE3854(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE3854(a); this.DE_VE3854(b);}
	/** @protected @arg {E_VE4724_Search} x */
	E_VE4724_Search(x) {const [a,b,y]=this.TE_Endpoint_3("E_VE4724_Search","searchEndpoint",x); this.g(y); this.M_VE4724(a); this.DE_VE4724_Search(b);}
	/** @protected @arg {E_VE5754} x */
	E_VE5754(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE5754","browseEndpoint",x); this.g(y); this.M_VE5754(a); this.DE_VE5754(b);}
	/** @private @arg {E_VE6827} x */
	E_VE6827(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE6827(a); this.DE_VE6827(b);}
	/** @private @arg {E_VE11487} x */
	E_VE11487(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE11487(a); this.DE_VE11487(b);}
	/** @private @arg {E_VE23462} x */
	E_VE23462(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE23462","browseEndpoint",x); this.g(y); this.M_VE23462(a); this.DE_VE23462(b);}
	/** @private @arg {E_VE42352} x */
	E_VE42352(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE42352","browseEndpoint",x); this.g(y); this.M_VE42352(a); this.DE_VE42352(b);}
	/** @protected @arg {E_VE83769_Url} x */
	E_VE83769_Url(x) {const [a,b,y]=this.TE_Endpoint_3("E_VE83769_Url","urlEndpoint",x); this.g(y); this.M_VE83769(a); this.DE_VE83769_Url(b);}
	/** @private @arg {E_VE96368} x */
	E_VE96368(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE96368","browseEndpoint",x); this.g(y); this.M_VE96368(a); this.DE_VE96368(b);}
	/** @protected @arg {E_SignalService_SendPost} x */
	E_SignalService_SendPost(x) {const cf="E_SignalService_SendPost",[a,b]=this.T_SE_Signal(cf,x); this.M_SendPost(a); this.G_ClientSignal(cf,b);}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {const cf="E_YpcGetOffers",[a,b,y]=this.TE_Endpoint_3(cf,"ypcGetOffersEndpoint",x); this.g(y); this.M_YpcGetOffers(a); this.D_Params(`D${cf}`,b,"ypc_get_offers.params");}
	/** @private @arg {DE_VE3611} x */
	DE_VE3611(x) {x;}
	/** @private @arg {DE_VE3854} x */
	DE_VE3854(x) {x;}
	/** @private @arg {DE_VE4724_Search} x */
	DE_VE4724_Search(x) {this.H_("DE_VE4724_Search","query",x,this.a_primitive_str);}
	/** @arg {G_PlaylistUrlInfo|G_ChannelUrlInfo} value*/
	put_boxed_id(value) {
		const {type,id}=value;
		this.indexed_db_put("boxed_id",{key: `boxed_id:${type}:${id}`,type,id});
	}
	/** @private @arg {Extract<G_UrlInfo,{type:`playlist:${string}`}>} x */
	get_playlist_url_info_critical(x) {
		if(x.type==="playlist:1:LL") return false;
		if(x.type==="playlist:1:WL") return false;
		switch(x.raw_id.length) {
			case 11: return false;
			case 24: return false;
			case 32: return false;
			default: debugger; return true;
		}
	}
	/** @public @arg {G_UrlInfo} value */
	G_UrlInfoItem(value) {
		switch(value.type) {
			default: value===""; debugger; break;
			case "channel_id:UC": this.D_ChannelId(value.raw_id); break;
			case "play-next": value; break;
			case "browse_id:VL": {
				const {type,id,raw_id}=value;
				this.indexed_db_put("browse_id",{key: `browse_id:VL:${id}`,type,id,raw_id});
			} break;
			case "playlist:2:RDCM": {
				const {id,raw_id}=value;
				this.indexed_db_put("playlist_id",{key: `playlist_id:RDCM:${id}`,type: "playlist_id:RDCM",id,raw_id});
				if(!this.str_starts_with_rx("UC",id)) debugger;
				this.D_ChannelId(id);
			} break;
			case "playlist:1:LL": case "playlist:1:WL": {
				const {id}=value;
				const oo={
					/** @type {`playlist_id:self:${typeof id}`} */
					key: `playlist_id:self:${id}`,
					type: "self",
					id,
				};
				this.indexed_db_put("playlist_id",oo);
			} break;
			case "playlist:2:RDMM": case "playlist:2:RD":
			case "playlist:4:UU": case "playlist:3:PL": {
				const {type,id,raw_id}=value;
				let type_2=split_string(type,":")[2];
				this.indexed_db_put("playlist_id",{key: `playlist_id:${type_2}:${id}`,type: `playlist_id:${type_2}`,id,raw_id});
				this.put_boxed_id(value);
				let is_critical=this.get_playlist_url_info_critical(value);
				this.log_playlist_id(value,is_critical);
			} break;
			case "video": this.videoId(value.id); break;
			case "video-referral": this.videoId(value.id); break;
		}
	}
	/** @private @arg {`VLPL${string}`} x */
	DU_VE5754_BrowseId_VL(x) {
		const [a,id]=split_string_once(x,"VL"); if(a!=="") debugger;
		this.G_UrlInfoItem({type: "browse_id:VL",id,raw_id: x});
		this.parse_guide_entry_id(id);
	}
	/** @public @arg {D_GuideEntryData['guideEntryId']|GU_PlaylistId} raw_id */
	parse_guide_entry_id(raw_id) {
		if(this.str_starts_with_rx("RD",raw_id)) {
			if(this.str_starts_with_rx("RDCMUC",raw_id)) {
				let [,id]=split_string_once(raw_id,"RDCM");
				this.save_next_char("playlist_id.RDCMUC",split_string_once(raw_id,"RDCMUC")[1]);
				this.G_UrlInfoItem({type: "playlist:2:RDCM",id,raw_id});
				return console.log("[guideEntryId.playlist.RDCM.length]",raw_id.length);
			}
			if(this.str_starts_with_rx("RDMM",raw_id)) {
				let [,id]=split_string_once(raw_id,"RDMM");
				this.G_UrlInfoItem({type: "playlist:2:RDMM",id,raw_id});
				return console.log("[guideEntryId.radio_my_mix.length]",raw_id.length);
			}
			let [,id]=split_string_once(raw_id,"RD");
			this.G_UrlInfoItem({type: "playlist:2:RD",id,raw_id});
			return console.log("[guideEntryId.radio.length]",raw_id.length);
		}
		if(this.str_starts_with_rx("UC",raw_id)) {
			let [,id]=split_string_once(raw_id,"UC");
			this.G_UrlInfoItem({type: "channel_id:UC",id,raw_id});
			if(raw_id.length===24) return;
			return console.log("[guideEntryId.channel.length]",raw_id.length);
		}
		if(this.str_starts_with_rx("PL",raw_id)) {
			let [,id]=split_string_once(raw_id,"PL");
			this.G_UrlInfoItem({type: "playlist:3:PL",id,raw_id});
			if(raw_id.length===34) return;
			return console.log("[guideEntryId.playlist.length]",raw_id.length);
		}
		if(this.str_starts_with_rx("UU",raw_id)) {
			let [,id]=split_string_once(raw_id,"UU");
			this.G_UrlInfoItem({type: "playlist:4:UU",id,raw_id});
			if(raw_id.length===26) return;
			return console.log("[guideEntryId.uploads_playlist.length]",raw_id.length);
		}
		switch(raw_id) {
			default: raw_id===""; console.log("new with param [Browse_param_2c_VL]",raw_id); debugger; break;
			case "LL": this.G_UrlInfoItem({type: "playlist:1:LL",id: raw_id}); break;
			case "WL": this.G_UrlInfoItem({type: "playlist:1:WL",id: raw_id}); break;
		}
	}
	/** @private @arg {Extract<DE_VE5754,{canonicalBaseUrl:any}>["browseId"]} x */
	DU_VE5754_BrowseId_2(x) {
		if(this.str_starts_with(x,"VL")) this.DU_VE5754_BrowseId_VL(x);
	}
	seen_map=new Set;
	/** @private @arg {D_BrowseEndpointPages} x */
	parse_known_page(x) {
		switch(x) {
			case "comment_shorts_web_top_level":
			case "explore":
			case "guide_builder":
			case "history":
			case "library":
			case "storefront":
			case "subscriptions":
			case "trending":
			case "what_to_watch": return true;
			default:
		}
		switch(x) {
			case "music_charts":
			case "music_explore":
			case "music_home":
			case "music_library_corpus_artists":
			case "music_library_corpus_track_artists":
			case "music_library_landing":
			case "music_liked_albums":
			case "music_liked_playlists":
			case "music_liked_videos":
			case "music_moods_and_genres_category":
			case "music_moods_and_genres":
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
	/** @api @public @arg {D_BrowseIdStr} x */
	parse_browse_id(x) {
		if(this.str_starts_with(x,"FE")) {
			let page=split_string_once(x,"FE")[1];
			let known_page=this.parse_known_page(page);
			if(known_page) return;
			if(this.seen_map.has(page)) return;
			this.seen_map.add(page);
			console.log("[param_value_with_section] [%s] -> [%s]",x.slice(0,2),page);
			return;
		}
		if(this.str_starts_with(x,"VL")) {return this.parse_guide_entry_id(split_string_once(x,"VL")[1]);}
		if(this.str_starts_with(x,"UC")) {
			if(x.slice(2).length===22) return;
			console.log("new with param [param_2c_UC]",x);
			return;
		}
		if(this.str_starts_with(x,"SP")) {
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
		if(this.str_starts_with(x,"MP")) {
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
	/** @protected @arg {D_BrowseIdStr} x */
	browseId(x) {this.parse_browse_id(x);}
	/** @private @arg {DE_VE5754} x */
	DE_VE5754(x) {
		const cf="DE_VE5754";
		if("canonicalBaseUrl" in x) {
			const {browseId,canonicalBaseUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.DU_VE5754_BrowseId_2(browseId);
			return;
		}
		if("browseId" in x) return this.y(cf,"browseId",x,this.browseId);
		debugger;
	}
	/** @private @arg {DE_VE6827} x */
	DE_VE6827(x) {x;}
	/** @private @arg {DE_VE11487} x */
	DE_VE11487(x) {x;}
	/** @private @arg {DE_VE23462} x */
	DE_VE23462(x) {x;}
	/** @private @arg {DE_ReelWatch} x */
	DE_VE37414_ReelWatch(x) {
		const cf="DE_ReelWatch"; this.k(cf,x);
		if("videoId" in x) {
			const {videoId,playerParams,thumbnail,overlay,params,loggingContext,sequenceProvider,sequenceParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(videoId,this.videoId);
			this.params(cf,"reel.player_params",playerParams);
			this.t(thumbnail,this.D_Thumbnail);
			this.R_ReelPlayerOverlay(overlay);
			this.params(cf,"reel.params",params);
			if(loggingContext) {
				this.D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			this.t(sequenceProvider,x => this.ceq(x,"REEL_WATCH_SEQUENCE_PROVIDER_RPC"));
			this.t(sequenceParams,x => this.params(cf,"reel.sequence_params",x));
			return;
		}
		if("inputType" in x) {
			const {playerParams,overlay,params,sequenceProvider,inputType,loggingContext,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.params(cf,"reel.player_params",playerParams);
			this.R_ReelPlayerOverlay(overlay);
			this.params(cf,"reel.params",params);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(inputType,x => {if(x!=="REEL_WATCH_INPUT_TYPE_SEEDLESS") debugger;});
			if(loggingContext) {
				this.D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			return;
		}
		this.g(x);
	}
	/** @private @arg {DE_VE42352} x */
	DE_VE42352(x) {x;}
	/** @private @arg {GU_YoutubeUrlRedirect|`https://www.youtube.com/${string}`} x */
	GU_FullYoutubeUrl(x) {
		if(this.str_starts_with(x,"https://www.youtube.com/redirect?")) return this.GU_YoutubeUrlRedirect(as(x));
	}
	/** @private @arg {DU_Url['url']|`https://studio.youtube.com/channel/UC${string}`} x */
	GM_E_VE83769_Url_TargetUrlType(x) {
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
			case "www.youtube.com": return this.GU_FullYoutubeUrl(up.href);
			case "myactivity.google.com": return;
			case "www.google.com": return;
			case "www.googleadservices.com": return;
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
	/** @protected @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {return x.includes("?");}
	/** @private @arg {GU_YoutubeUrlRedirect} x */
	GU_YoutubeUrlRedirect(x) {
		const cf="GU_YoutubeUrlRedirect"; this.k(cf,x);
		let [p1,s1]=split_string_once(x,"//"); if(p1!=="https:") debugger;
		let [h,sp]=split_string_once(s1,"/");
		if(h!=="www.youtube.com") debugger;
		if(this.str_is_search(sp)) {
			let [pp,query_search]=split_string_once(sp,"?");
			if(pp!=="redirect") debugger;
			let parsed_search=this.parse_url_search_params(query_search);
			let {event,redir_token,q,...y}=parsed_search;
			this.GU_YoutubeUrlRedirect_Event(event);
			this.GU_YoutubeUrlRedirect_RedirectToken(redir_token);
			this.a_primitive_str(q);
			if("v" in y) {
				let {v,...y1}=y; this.g(y1);
				this.a_primitive_str(v);
				return;
			}
			this.g(y);
			return;
		}
		this.codegen_str(cf,x);
	}
	/** @private @arg {DU_Url} x */
	DE_VE83769_Url(x) {
		const cf="DE_VE83769_Url"; this.k(cf,x);
		const {url,...u}=this.s(cf,x);/*#destructure_later*/
		this.GM_E_VE83769_Url_TargetUrlType(url);
		if("nofollow" in u&&"target" in u) {
			const {target,nofollow,...y}=u; this.g(y); /*#destructure_done*/
			if(target!=="TARGET_NEW_WINDOW") debugger;
			if(nofollow!==true) debugger;
			return;
		}
		if("nofollow" in u) {
			const {nofollow,...y}=u; this.g(y);/*#destructure_done*/
			if(nofollow!==true) debugger;
			return;
		}
		if("target" in u) {
			const {target,...y}=u; this.g(y); /*#destructure_done*/
			if(target!=="TARGET_NEW_WINDOW") debugger;
			return;
		}
		this.g(u);
	}
	/** @private @arg {DE_VE96368} x */
	DE_VE96368(x) {x;}
	/** @private @arg {M_VE3611|M_VE3611} x */
	M_VE3611(x) {
		const cf="M_VE3611";
		const {webCommandMetadata: a,resolveUrlCommandMetadata: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		return this.GM_VE3611(a);
	}
	/** @protected @arg {M_VE3832} x */
	M_VE3832(x) {this.T_WCM("M_VE3832",x,this.GM_VE3832);}
	/** @private @arg {M_VE3854} x */
	M_VE3854(x) {
		const cf="M_VE3854";
		const {webCommandMetadata: a,resolveUrlCommandMetadata: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GM_VE3854(a);
		this.t(b,this.M_ResolveUrlCommand);
	}
	/** @private @arg {M_VE4724} x */
	M_VE4724(x) {this.T_WCM("M_VE4724",x,this.GM_VE4724);}
	/** @private @arg {M_VE5754} x */
	M_VE5754(x) {this.T_WCM("M_VE5754",x,this.GM_VE5754);}
	/** @private @arg {M_VE6827} x */
	M_VE6827(x) {this.T_WCM("M_VE83769",x,this.GM_VE6827);}
	/** @private @arg {M_VE11487} x */
	M_VE11487(x) {this.T_WCM("M_VE83769",x,this.GM_VE11487);}
	/** @private @arg {M_VE23462} x */
	M_VE23462(x) {this.T_WCM("M_VE83769",x,this.GM_VE23462);}
	/** @private @arg {M_VE37414} x */
	M_VE37414(x) {this.T_WCM("M_VE37414",x,this.GM_VE37414);}
	/** @private @arg {M_VE42352} x */
	M_VE42352(x) {this.T_WCM("M_VE42352",x,this.GM_VE42352);}
	/** @private @arg {M_VE83769} x */
	M_VE83769(x) {this.T_WCM("M_VE83769",x,this.GM_VE83769);}
	/** @private @arg {M_VE96368} x */
	M_VE96368(x) {return this.T_WCM("M_VE96368",x,this.GM_VE96368);}
	/** @private @arg {GM_VE3832} x */
	GM_VE3832(x) {
		const cf="GM_VE3832_WatchPlaylist";
		const {url,rootVe,webPageType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(this.str_starts_with(url,"/playlist")) break x;
			if(this.str_starts_with(url,"/watch")) break x;
			debugger;
		}
		if(rootVe!==3832) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
	}
	/** @private @arg {GM_VE3611} x @returns {`VE${rootVe}`} */
	GM_VE3611(x) {
		const cf="GM_VE3611_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE3611_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if(rootVe!==3611) debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE3854} x @returns {`VE${rootVe}`} */
	GM_VE3854(x) {
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
	/** @private @arg {GM_VE4724} x @returns {`VE${rootVe}`} */
	GM_VE4724(x) {
		const cf="GM_VE4724_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!this.str_starts_with_rx("/results?search_query=",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SEARCH") debugger;
		if(rootVe!==4724) debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {M_ResolveUrlCommand} x */
	M_ResolveUrlCommand(x) {
		const cf="GM_VE_ResolveUrl_C_MD";
		const {parentTrackingParams,isVanityUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(parentTrackingParams,x => this.trackingParams(cf,x));
		this.t(isVanityUrl,x => this.ceq(x,true));
	}
	/** @protected @arg {E_WatchPlaylist} x */
	E_WatchPlaylist(x) {const [a,b,y]=this.TE_Endpoint_3("E_WatchPlaylist","watchPlaylistEndpoint",x); this.g(y); this.M_VE3832(a); this.DE_WatchPlaylist(b);}
	/** @private @arg {DE_WatchPlaylist} x */
	DE_WatchPlaylist(x) {
		const cf="DE_WatchPlaylist"; this.k(cf,x);
		const {playlistId,index,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_playlist_id(playlistId);
		this.a_primitive_num(index);
		this.params(cf,"watch_playlist.params",params);
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
	/** @private @arg {DE_VE3832_Watch} x */
	DE_VE3832_Watch(x) {
		// const cf="DE_VE3832_Watch";
		if("playlistSetVideoId" in x) {
			if("params" in x) {
				const cls_=this.b_cls;
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
				this.playerParams("DE_VE3832_Watch","watch.player_params",playerParams,cls_.on_player_params_callback.bind(cls_));
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
		if("startTimeSeconds" in x) return;
		if("videoId" in x) {
			const cf="DE_VE3832:videoId";
			const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.videoId(videoId);
			return;
		}
		x==="";
		this.g(x);
	}
	/** @private @arg {DE_CreateComment} x */
	DE_CreateComment(x) {this.TD_Params("DE_CreateComment","createCommentParams","create_comment.params",x);}
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
	/** @protected @arg {E_SignalNavigation} x */
	E_SignalNavigation(x) {const [a,b,y]=this.TE_Endpoint_3("E_SignalNavigation","signalNavigationEndpoint",x); this.g(y); this.M_VE83769(a); this.DE_SignalNavigation(b);}
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
	/** @private @arg {GM_VE5754} x @returns {`VE${rootVe}`} */
	GM_VE5754(x) {
		const cf="GM_VE5754_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE5754_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_PLAYLIST") debugger;
		if(rootVe!==5754) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE6827} x */
	GM_VE6827(x) {
		const cf="GM_VE6827"; this.k(cf,x);
		const {url,sendPost,webPageType,rootVe,apiUrl,...y}=this.s(cf,x);/*#destructure_done*/
		this.t(url,this.D_VE6827_Url);
		this.t(sendPost,x => this.ceq(x,true));
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
	/** @private @arg {GU_VE6827_Url} x */
	D_VE6827_Url(x) {
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
					this.indexed_db_put("hashtag_id",{key: `hashtag_id:${ht}`,hashtag: ht});
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
	/** @private @arg {GM_VE11487} x @returns {`VE${rootVe}`} */
	GM_VE11487(x) {
		const cf="GM_VE11487_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==11487) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE23462} x @returns {`VE${rootVe}`} */
	GM_VE23462(x) {
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
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE37414} x @returns {`VE${rootVe}`} */
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
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE42352} x @returns {`VE${rootVe}`} */
	GM_VE42352(x) {
		const cf="GM_VE42352_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE42352_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==42352) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE83769} x */
	GM_VE83769(x) {
		const cf="GM_VE83769_WC"; this.k(cf,x);
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE83769_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_UNKNOWN") debugger;
		if(rootVe!==83769) debugger;
	}
	/** @private @arg {GM_VE96368} x @returns {`VE${rootVe}`} */
	GM_VE96368(x) {
		const cf="GM_VE96368_WC_browse"; this.k(cf,x);
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		if(rootVe!==96368) debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @protected @arg {GE_Browse} x */
	GE_Browse(x) {
		const cf="GE_Browse"; this.k(cf,x);
		if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
		if(this.is_TE_VE(x,3854)) return this.E_VE3854(x);
		if(this.is_TE_VE(x,5754)) return this.E_VE5754(x);
		if(this.is_TE_VE(x,6827)) return this.E_VE6827(x);
		if(this.is_TE_VE(x,11487)) return this.E_VE11487(x);
		if(this.is_TE_VE(x,23462)) return this.E_VE23462(x);
		if(this.is_TE_VE(x,42352)) return this.E_VE42352(x);
		if(this.is_TE_VE(x,96368)) return this.E_VE96368(x);
		debugger;
	}
	/** @private @template {number} T @arg {TE_VE_In} x @arg {T} t @returns {x is TE_VE<T>} */
	is_TE_VE(x,t) {
		return x.commandMetadata.webCommandMetadata.rootVe===t;
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
	/** @private @arg {G_TextRun_Endpoint} x */
	G_TextRun_Endpoint(x) {
		const cf="G_TextRun_Endpoint"; this.k(cf,x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("urlEndpoint" in x) return this.E_VE83769_Url(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("reelWatchEndpoint" in x) return this.E_ReelWatch(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @protected @arg {D_Label} x */
	D_Label(x) {this.H_("Label","label",x,this.a_primitive_str);}
	/** @protected @arg {D_Accessibility} x */
	D_Accessibility(x) {this.H_("D_Accessibility","accessibilityData",x,this.D_Label);}
	/** @protected @arg {boolean} x */
	a_primitive_bool(x) {if(typeof x!=="boolean") debugger;}
	/** @protected @arg {G_Text} x */
	G_Text(x) {
		const cf="G_Text"; this.k(cf,x);
		const {runs,simpleText,accessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(simpleText,this.a_primitive_str);
		this.tz(runs,this.D_TextRun);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {D_TextRun} x */
	D_TextRun(x) {
		const cf="R_TextRun";
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
			this.G_TextRun_Endpoint(navigationEndpoint);
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
			this.G_TextRun_Endpoint(navigationEndpoint);
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
	/** @private @arg {D_Emoji} x */
	D_Emoji(x) {
		const cf="D_Emoji";
		const {emojiId,shortcuts,searchTerms,image,...y}=this.s(cf,x); this.g(y);
		let emoji_parts=this.split_str(emojiId,"");
		if(emoji_parts.length!==2) debugger;
		this.join_string(emoji_parts,"");
		this.save_string(`save://Emoji.d/emojiId`,emojiId);
		this.save_string(`save://Emoji.d/shortcuts/${emojiId}?custom=${false}`,shortcuts.join(","));
		this.save_string(`save://Emoji.d/searchTerms/${emojiId}?custom=${false}`,searchTerms.join(","));
	}
	/** @private @arg {D_Color} x */
	D_Color(x) {
		if(!this.eq_keys(this.get_keys_of(x),["red","green","blue"])) debugger;
		this.z(Object.values(x),x => this._primitive_of(x,"number"));
	}
	/** @protected @arg {D_ThumbnailItem} x */
	D_ThumbnailItem(x) {
		const cf="D_ThumbnailItem"; this.k(cf,x);
		const {url,width,height,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(url);
		this.t(width,x => this._primitive_of(x,"number"));
		this.t(height,x => this._primitive_of(x,"number"));
	}
	/** @private @arg {R_Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H_("R_Html5PlaybackOnesieConfig","html5PlaybackOnesieConfig",x,this.R_CommonConfig);}
	/** @public @arg {E_Watch} x */
	E_Watch(x) {
		const cf="E_Watch";
		if("clickTrackingParams" in x) {
			const [a,b,y]=this.TE_Endpoint_3(cf,"watchEndpoint",x); this.g(y); this.M_VE3832(a); this.DE_VE3832_Watch(b);
		} else {
			const {commandMetadata: a,watchEndpoint: b,...y}=this.s(cf,x); this.g(y); this.M_VE3832(a); this.DE_VE3832_Watch(b);
		}
	}
	/** @protected @arg {D_Thumbnail} x */
	D_Thumbnail(x) {
		const cf="D_Thumbnail"; this.k(cf,x);
		const {lightColorPalette,darkColorPalette,sampledThumbnailColor,accessibility,isOriginalAspectRatio,thumbnails: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(lightColorPalette,x => this.D_LightColorPalette(`${cf}.light`,x));
		this.t(darkColorPalette,x => this.D_DarkColorPalette(`${cf}.dark`,x));
		this.t(sampledThumbnailColor,x => this.D_Color(x));
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D_Accessibility);
		this.z(a,this.D_ThumbnailItem);
	}
	/** @type {{[U in string]?:number[]}} */
	lc={};
	/** @private @arg {string} cf1 @arg {string} cf @arg {string} k @arg {number} x */
	log_color(cf1,cf,k,x) {
		let arr=this.lc[k]??=[];
		if(!arr.includes(x)) {
			arr.push(x);
			arr.sort((a,b) => a-b);
			console.log(`-- [${cf1}:${cf}:${k}] --\n\n${arr.map(x => `case 0x${x.toString(16)}:`).join(" ")}`);
		}
	};
	/** @protected @arg {string} cf1 @arg {D_DarkColorPalette} x */
	D_DarkColorPalette(cf1,x) {
		const cf="D_DarkColorPalette";
		/** @arg {`d${1|2}_${string}`} k @arg {number} x */
		let log_color=(k,x) => this.log_color(cf1,cf,k,x);
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section2Color: s2_c,section4Color: s4_c,...y}=this.s(cf,x);
		{
			const x=p_tc;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_p_tc_r`,r); break;
				case 0xe5: case 0xe6:
				case 0xea:
				case 0xec: case 0xed:
				case 0xe7: case 0xe9: case 0xeb: case 0xee:
				case 0xf0: case 0xf1: case 0xf4: case 0xf9:
				case 0xfc:
				case 0xff:
			}
			switch(g) {
				default: log_color(`d1_p_tc_g`,g); break;
				case 0xe5:
				case 0xe6: case 0xe7: case 0xe8: case 0xe9: case 0xea: case 0xeb: case 0xec: case 0xed: case 0xee: case 0xef:
				case 0xf0: case 0xf1: case 0xf2: case 0xf3: case 0xf4: case 0xf5: case 0xf6:
				case 0xf8: case 0xf9: case 0xfa: case 0xfb:
				case 0xff:
			}
			switch(b) {
				default: log_color(`d1_p_tc_b`,b); break;
				case 0xe5:
				case 0xe6: case 0xe7:
				case 0xea:
				case 0xf2: case 0xf4: case 0xf5: case 0xf6:
				case 0xf8:
				case 0xfb: case 0xfc: case 0xfd:
				case 0xff:
			}
		}
		{
			const x=s_tc;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_s_tc_r`,r); break;
				case 0xa3: case 0xa4: case 0xa5: case 0xa6:
				case 0xa9: case 0xaa: case 0xab: case 0xac: case 0xaf:
				case 0xb0: case 0xb2: case 0xb3: case 0xb6:
				case 0xba: case 0xbd:
				case 0xc2: case 0xc3:
				case 0xc8: case 0xcc:
			}
			switch(g) {
				default: log_color(`d1_s_tc_g`,g); break;
				case 0xa3: case 0xa4: case 0xa5: case 0xa6: case 0xa7:
				case 0xa8: case 0xa9: case 0xaa: case 0xab: case 0xac: case 0xad: case 0xaf:
				case 0xb1: case 0xb2: case 0xb3: case 0xb4: case 0xb5: case 0xb6: case 0xb7:
				case 0xb8: case 0xb9: case 0xba: case 0xbb: case 0xbc: case 0xbd: case 0xbe:
				case 0xc1: case 0xc3: case 0xc5: case 0xc6: case 0xcc:
			}
			switch(b) {
				default: log_color(`d1_s_tc_b`,b); break;
				case 0xb0: case 0xb8: case 0xbb: case 0xbe: case 0xc7: case 0xc8: case 0xc9:
				case 0xa3: case 0xa5: case 0xa6: case 0xa7:
				case 0xab: case 0xac: case 0xae:
				case 0xbf:
				case 0xc3: case 0xc6:
				case 0xcc:
			}
		}
		{
			const x=s2_c;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_s2_c_r`,r); break;
				case 0x05: case 0x06: case 0x07: case 0x09: case 0x0a:
				case 0x11: case 0x12: case 0x15:
				case 0x19: case 0x1a: case 0x1e: case 0x1d: case 0x1f: case 0x16: case 0x1b:
				case 0x20: case 0x21: case 0x22: case 0x23: case 0x24: case 0x26: case 0x27:
				case 0x28: case 0x29: case 0x2a: case 0x2b: case 0x2c: case 0x2f:
				case 0x31: case 0x33:
			}
			switch(g) {
				default: log_color(`d1_s2_c_g`,g); break;
				case 0x22: case 0x28: case 0x2e: case 0x24: case 0x33:
				case 0x07: case 0x08: case 0x09: case 0x0a: case 0x0b: case 0x0e: case 0x0f:
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
				case 0x18: case 0x19: case 0x1a: case 0x1b: case 0x1c: case 0x1d: case 0x1f:
				case 0x20: case 0x21: case 0x23: case 0x25: case 0x26: case 0x27:
				case 0x29: case 0x2a: case 0x2b: case 0x2c:
			}
			switch(b) {
				default: log_color(`d1_s2_c_b`,b); break;
				case 0x06: case 0x07: case 0x0c: case 0x0d: case 0x0e:
				case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
				case 0x18: case 0x19: case 0x1a: case 0x1b: case 0x1c: case 0x1d: case 0x1e: case 0x1f:
				case 0x21: case 0x23: case 0x25: case 0x26: case 0x27:
				case 0x29: case 0x2b: case 0x2c: case 0x2d: case 0x2f:
				case 0x30: case 0x31: case 0x33:
			}
		}
		{
			const x=s4_c;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`d1_s4_c_r`,r); break;
				case 0x01: case 0x02: case 0x03: case 0x04: case 0x05: case 0x06: case 0x07:
				case 0x08: case 0x0a: case 0x0c: case 0x0d: case 0x0b: case 0x0e: case 0x0f:
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
				case 0x18: case 0x19:
			}
			switch(g) {
				default: log_color(`d1_s4_c_g`,g); break;
				case 0x19:
				case 0x03: case 0x04: case 0x05: case 0x07:
				case 0x08: case 0x09: case 0x0a: case 0x0b: case 0x0c: case 0x0d: case 0x0e: case 0x0f:
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
			}
			switch(b) {
				default: log_color(`d1_s4_c_b`,b); break;
				case 0x01: case 0x03: case 0x06: case 0x07:
				case 0x08: case 0x09: case 0x0a: case 0x0b: case 0x0c: case 0x0d: case 0x0e: case 0x0f:
				case 0x10: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17:
				case 0x18: case 0x19:
			}
		}
		if("section1Color" in y) {
			return;
		}
		this.g(y);
	}
	/** @protected @arg {string} cf1 @arg {D_LightColorPalette} x */
	D_LightColorPalette(cf1,x) {
		const cf="D_LightColorPalette";
		/** @arg {string} k @arg {number} x */
		let log_color=(k,x) => this.log_color(cf1,cf,k,x);
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section2Color: s2_c,section4Color: s4_c,...y}=this.s(cf,x);
		{
			const x=p_tc;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`l1_p_tc_r`,r); break;
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17: case 0x18: case 0x19:
			}
			switch(g) {
				default: log_color(`l1_p_tc_g`,g); break;
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17: case 0x18: case 0x19:
			}
			switch(b) {
				default: log_color(`l1_p_tc_b`,b); break;
				case 0x10: case 0x11: case 0x12: case 0x13: case 0x14: case 0x15: case 0x16: case 0x17: case 0x18: case 0x19:
			}
		}
		{
			const x=s_tc;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			if(a!==0xff) debugger;
			switch(r) {
				default: log_color(`l1_s_tc_r`,r); break;
				case 0x45:
				case 0x48: case 0x4c: case 0x4f:
				case 0x50: case 0x52: case 0x53: case 0x55: case 0x56: case 0x57:
				case 0x59: case 0x5a: case 0x5b: case 0x5d: case 0x5c:
				case 0x60: case 0x61: case 0x62: case 0x63: case 0x65:
				case 0x6b:
				case 0x70: case 0x75: case 0x76:
				case 0x7a: case 0x7b: case 0x7f:
			}
			switch(g) {
				default: log_color(`l1_s_tc_g`,g); break;
				case 0x52: case 0x53: case 0x54: case 0x55: case 0x56: case 0x57:
				case 0x58: case 0x59: case 0x5a: case 0x5b: case 0x5c: case 0x5d: case 0x5e: case 0x5f:
				case 0x60: case 0x61: case 0x62: case 0x63: case 0x64: case 0x65: case 0x66:
				case 0x69: case 0x6a: case 0x6b:
			}
			switch(b) {
				default: log_color(`l1_s_tc_b`,b); break;
				case 0x45:
				case 0x48: case 0x4c: case 0x4f:
				case 0x51: case 0x52: case 0x54: case 0x55: case 0x56: case 0x57:
				case 0x5a: case 0x5b: case 0x5c:
				case 0x64: case 0x65: case 0x66: case 0x67:
				case 0x68: case 0x69: case 0x6b: case 0x6d:
				case 0x70: case 0x75:
				case 0x7a: case 0x7c: case 0x7f:
				case 0x84:
				case 0x89:
			}
		}
		{
			const x=s2_c;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			switch(r) {
				default: log_color(`l1_s2_c_r`,r); break;
				case 0xf4: case 0xf5: case 0xf6:
				case 0xf8: case 0xf1: case 0xf2: case 0xf3: case 0xf7:
			}
			switch(g) {
				default: log_color(`l1_s2_c_g`,g); break;
				case 0xf6: case 0xf5: case 0xf4: case 0xf7: case 0xf1: case 0xf3: case 0xf2: case 0xf8:
			}
			switch(b) {
				default: log_color(`l1_s2_c_b`,b); break;
				case 0xf1: case 0xf8: case 0xf2: case 0xf6: case 0xf5: case 0xf7:
			}
			switch(a) {
				default: log_color(`l1_s2_c_a`,r); break;
				case 0xf2: case 0xff:
			}
		}
		{
			const x=s4_c;
			let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
			switch(r) {
				default: log_color(`l1_s4_c_r`,r); break;
				case 0xdf: case 0xe4: case 0xe5: case 0xe8: case 0xe9:
				case 0xdd: case 0xde: case 0xe0: case 0xe1: case 0xe2: case 0xeb: case 0xea:
			}
			switch(g) {
				default: log_color(`l1_s4_c_g`,g); break;
				case 0xe2: case 0xe8: case 0xea:
				case 0xdd: case 0xde: case 0xdf: case 0xe0: case 0xe1: case 0xe3: case 0xe4: case 0xe5: case 0xe6: case 0xe7: case 0xe9: case 0xeb:
			}
			switch(b) {
				default: log_color(`l1_s4_c_b`,b); break;
				case 0xe5: case 0xe7: case 0xe9:
				case 0xdd: case 0xde: case 0xdf: case 0xe0: case 0xe6: case 0xe8: case 0xea: case 0xeb:
			}
			switch(a) {
				default: log_color(`l1_s4_c_a`,r); break;
				case 0xf2: case 0xff:
			}
		}
		if("section1Color" in y) {
			const {section1Color: s1_c,section3Color: s3_c,...y1}=y; this.g(y1);
			{
				const x=s1_c;
				let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
				if(a!==0xff) debugger;
				switch(r) {
					default: log_color(`l1_s1_c_r`,r); break;
				}
				switch(g) {
					default: log_color(`l1_s1_c_g`,g); break;
				}
				switch(b) {
					default: log_color(`l1_s1_c_b`,b); break;
				}
			}
			{
				const x=s3_c;
				let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
				if(a!==0xff) debugger;
				switch(r) {
					default: log_color(`l1_s3_c_r`,r); break;
				}
				switch(g) {
					default: log_color(`l1_s3_c_g`,g); break;
				}
				switch(b) {
					default: log_color(`l1_s3_c_b`,b); break;
				}
			}
			return;
		}
		this.g(y);
	}
	/** @protected @arg {P_ParamParse} sec @template {CF_D_Params} T_CF @arg {T_CF} cf @template {string} T @arg {{params:T;}} x */
	D_Params(cf,x,sec) {const {params: p,...y}=this.s_priv(`D_Params:${cf}`,x); this.g(y); this.params(`${cf}.params`,sec,x.params);}
	/** @protected @template {{}} T @arg {T} obj @returns {T_DistributedKeysOf_2<T>} */
	get_keys_of_2(obj) {
		if(!obj) {debugger;}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	/**
	 * @protected @arg {CF_T_WCM} cf @template {{webCommandMetadata:any;}} T @template U @arg {T} x @arg {(this:this,x:T["webCommandMetadata"])=>U} f
	 * @returns {[U,Omit<T, "webCommandMetadata">]}
	 * */
	T_WCM(cf,x,f) {
		const {webCommandMetadata: a,...y}=this.s(`T_WCM:${cf}`,x);
		let ret=f.call(this,a);
		return [ret,y];
	}
	/** @protected @template U @arg {CF_T_GM} cf @template T @arg {{sendPost: true;apiUrl: T;}} x @arg {(this:this,x:T)=>U} f */
	T_GM(cf,x,f) {
		const {sendPost,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(sendPost!==true) debugger;
		return f.call(this,apiUrl);
	}
	/** @api @public @template {CF_L_TP_Params} T @arg {T} cf @arg {P_ParamParse} path @arg {string} x @arg {T_ParseCallbackFunction<T>} callback */
	playerParams(cf,path,x,callback) {this.on_player_params(cf,path,x,callback);}
	/** @api @public @template {CF_L_TP_Params} T @arg {T} root @arg {P_ParamParse} path @arg {string} x @arg {T_ParseCallbackFunction<T>} callback */
	on_player_params(root,path,x,callback) {
		x=decodeURIComponent(x);
		if(this.cache_player_params.includes(x)) return;
		this.cache_player_params.push(x);
		let param_map=this.create_param_map(x);
		if(param_map===null) {debugger; return;}
		this.parse_player_param(root,path,param_map,callback);
	}
	/** @private @template {CF_L_TP_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_player_param(root,path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let map_keys=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,map_keys,callback);
		for(let i=1;i<100;i++) {
			if(!map_keys.includes(i)) continue;
			parse_key([i]);
		}
		if(this.eq_keys(map_keys,[])) return;
		let {new_ns}=this.get_parse_fns(path,map_keys,null);
		new_ns();
		let param_obj=this.to_param_obj(map);
		console.log(`[player.${path}] [idx=${key_index}]`,param_obj);
		{debugger;}
	}
	/** @private @arg {string} ns @arg {()=>void} f */
	grouped(ns,f) {
		console.group(ns);
		f();
		console.groupEnd();
	}
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
	/** @arg {number} x */
	a_primitive_num(x) {
		this._primitive_of(x,"number");
		if(Number.isNaN(x)) debugger;
	}
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
		let key_index=this.parse_key_index;
		let ret=false;
		if(typeof entry==="string") {
			switch(path) {
				case "continuation_token.data.f49": {
					this.x.get("handle_types").continuation_token_data_f49(path,entry);
					ret=true;
				} break;
				case "load_markers.entity_key.f2":
				case "continuation_token.data.f53.f8": {
					this.save_string(path,entry);
					ret=true;
				} break;
				case "get_pdg_buy_flow.params.f1.f2": case "entity_key.normal.f2":
				case "tracking.trackingParams.f11": {
					this.D_ChannelId(as(entry));
					ret=true;
				} break;
				case "continuation_token.data.f53.f4.f4":
				case "ypc_get_offers.params.f5.f5.f1": case "ypc_get_offers.params.f5.f1": case "get_pdg_buy_flow.params.f1.f1": case "entity_key.normal.f2.f1": case "create_comment.params.f2": case "like.likeParams.f1.f1": case "like.removeLikeParams.f1.f1": case "like.dislikeParams.f1.f1": case "subscribe.params.f4":
				case "unsubscribe.params.f2": {
					this.videoId(entry);
					ret=true;
				} break;
				case "continuation_token.data.f110.f3.f15.f2.f1": {
					// f110=token_value; f3=command f15=showReloadUiCommand; f2=targetId; f1=value;
					this.targetId(`Binary.value:${path}`,as(entry));
					ret=true;
				} break;
				case "tracking.trackingParams.f7":
				case "continuation_token.data.f72":
				case "continuation_token.data.f49.f6":
				case "continuation_token.data.f15": {
					/** @type {`sub.${path}`} */
					const cf=`sub.${path}`;
					this.x.get("handle_types").decode_continuation_token(cf,entry);
					ret=true;
				} break;
				case "tracking.trackingParams.f6": {
					this.save_string(path,entry);
					ret=true;
				} break;
				case "continuation_request.watch_next.token.f2.f2":
				case "reel.sequence_params.f1": {
					this.videoId(entry);
					ret=true;
				} break;
				case "entity_key.subscribed.f2":
				case "ypc_get_offers.params.f1.f2": {
					this.D_ChannelId(as(entry));
					ret=true;
				} break;
				default: {
					let new_data=this.save_string(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$do_save_str] [idx:${key_index}] [v:${entry}] --\n\ncase "${x}":\n`);
						debugger;
					}
					ret=false;
				} break;
			}
		} else if(typeof entry==="number") {
			switch(path) {
				default: {
					let new_data=this.save_number(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$do_save_num] [v:${entry}] --\n\ncase "${x}":\n`);
						debugger;
					}
					ret=false;
				} break;
				case "ad_serving_data_entry.f7": {
					this.save_number(path,entry);
					ret=true;
				} break;
				case "tracking.trackingParams.f2":
				case "tracking.trackingParams.f16.f2": {
					ret=true;
				} break;
				case "reel.player_params.f57": case "unsubscribe.params.f1.f1": case "subscribe.params.f2.f1":
				case "tracking.trackingParams.f3": case "continuation_token.data.f53.f4.f15": case "entity_key.normal.f4": case "playability_status.context_params.f2.f1": case "playability_status.context_params.f1": case "reel.params.f6": case "reel.player_params.f30": case "reel.sequence_params.f5.f3":
				case "reel.params.f1": case "reel.player_params.f71":
				case "tracking.trackingParams.f1": {
					this.save_number(path,entry);
					ret=true;
				} break;
				// {[x:"f4"|"f13"]:"STORE::Playlist.localCurrentIndex";}
				case "watch_playlist.params.f4": case "watch_playlist.params.f13": {
					ret=true;
				} break;
				case "next.continuation.f2.f7": case "reel.params.f3.f3": case "reel.params.f3.f2": case "reel.params.f3.f1":
				case "tracking.trackingParams.f16.f4.f3": case "tracking.trackingParams.f16.f4.f2": case "tracking.trackingParams.f16.f4.f1":
				case "ad_serving_data_entry.f9.f3": case "ad_serving_data_entry.f9.f2": case "ad_serving_data_entry.f9.f1": case "tracking.trackingParams.f4.f1": case "tracking.trackingParams.f4.f2": case "tracking.trackingParams.f4.f3":
				case "like.removeLikeParams.f5.f1": case "like.removeLikeParams.f5.f2": case "like.likeParams.f6.f1": case "like.likeParams.f6.f2": case "like.dislikeParams.f4.f1": case "like.dislikeParams.f4.f2": case "notification.record_interactions.f5":
				case "notification.record_interactions.f2.f14.f1.f1": {
					ret=true;
				} break;
			}
		} else if(entry instanceof Map) {
			switch(path) {
				default: {
					let x=path; x;
					let entry_keys=[...entry.keys()];
					console.log(`-- [handle_value_gen$do_save_obj] [map_keys:${entry_keys}] --\n\ncase "${x}":\n`);
					debugger;
					ret=false;
				} break;
				case "tracking.trackingParams.f4": {
					ret=true;
				} break;
			}
		} else if(entry instanceof Uint8Array) {
			switch(path) {
				default: {
					let new_data=this.save_number(path,[...entry]);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$do_save_u8_arr] [v:${entry}n] --\n\ncase "${x}":\n`);
						debugger;
					}
					ret=false;
				} break;
			}
		} else if(this.is_bigint(entry)) {
			switch(path) {
				default: {
					let new_data=this.handle_bigint(path,entry);
					if(new_data) {
						let x=path; x;
						console.log(`-- [handle_value_gen$do_save_bigint] [v:${entry[2]}n] --\n\ncase "${x}":\n`);
						debugger;
					}
					ret=false;
				} break;
				case "tracking.trackingParams.f8":
				case "reel.player_params.f72":
				case "tracking.trackingParams.f9": break;
			}
		}
		return ret;
	}
	/** @api @public @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {number} map_entry_key @arg {V_ParamMapValue[]|undefined} map_entry_values @arg {T_ParseCallbackFunction<T>} callback */
	/** @private @arg {number[]} map_entry_key_path @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {T_ParseCallbackFunction<T>} callback */
	parse_any_param(root,path,map_entry_key_path,map,callback) {
		this.parse_key_index++;
		let key_index=this.parse_key_index;
		let map_keys=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,map_keys,callback);
		let map_keys_limit=Math.max(...map_keys,-1);
		for(let i=1;i<map_keys_limit+1;i++) {
			if(!map_keys.includes(i)) continue;
			map_entry_key_path.push(i);
			parse_key(map_entry_key_path);
			let l=map_entry_key_path.pop();
			if(l!==i) debugger;
		}
		if(this.eq_keys(map_keys,[])) return;
		let {new_ns}=this.get_parse_fns(path,map_keys,null);
		new_ns();
		let param_obj=this.to_param_obj(map);
		console.log(`[new.${path}] [idx=${key_index}]`,path,param_obj);
		{debugger;}
	}
	/** @private @arg {P_ParamParse} path @arg {number[]} map_keys @arg {V_ParamMapValue|null} map_entry_value @arg {number|null} map_entry_key */
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
			let ak_gen=[""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`\n\tcase "${path}": switch(map_entry_key) {\n\t\t${map_keys.map(e => `case ${e}:`).join(" ")}\n\t\t\treturn this.parse_param_next(root,\`\${path}.f\${map_entry_key}\`,map_entry_key_path,map_entry_values,callback);\n\t\tdefault: \n\t}\n`);
		};
		let new_ns=() => {
			/** @private @type {P_LogItems} */
			console.log("[parse_value.new_ns_gen]",path);
			let ak_gen=[""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`-- [parse_value.gen_ns] --\n\n\t${map_keys.map(e => `case ${e}:`).join(" ")} \n`);
		};
		return {u,gen_next_part,new_ns,new_path,map_entry_key};
	}
	/** @protected @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva @returns {boolean} */
	parse_param_next(root,path,map_entry_key_path,tva,callback) {
		let parts=split_string(path,".");
		if(tva.length===0) {
			let {u}=this.get_parse_fns(path,[],null);
			/** @private @type {P_LogItems} */
			switch(parts[0]) {
				// [default_parse_param_empty]
				default: {
					const idx=1; u(idx); debugger;
				} break;
			}
			return true;
		}
		if(tva.length>1) return this.parse_param_next_arr(root,path,map_entry_key_path,tva,callback);
		let map_entry_value=tva[0];
		let {u}=this.get_parse_fns(path,[],map_entry_value);
		if(map_entry_value instanceof Map) this.parse_any_param(root,path,map_entry_key_path,new Map(map_entry_value),callback);
		/** @private @type {P_LogItems} */
		switch(parts[0]) {
			case "_level_1_0": break;
			case "_level_2_0": {
				const idx=2;
				switch(parts[1]) {
					default: u(idx); debugger; parts[1]===""; break;
					case "_level_2_1": {
						const idx=3;
						if(parts.length===2) return this.handle_map_value(path,map_entry_value);
						switch(parts[2]) {default: u(idx); debugger; switch(parts[2]) {case "": }; break;}
					} break;
				}
			} break;
			// [default_parse_param_next]
			default: {
				const idx=1; u(idx); debugger; switch(parts[1]) {case "": }
			} break;
			case "D_0x94d81d4":
			case "get_notification_menu": case "timed_continuation": case "continuation_request": case "next_response": case "ypc_get_cart": case "ad_slot_logging_data":
			case "adaptive_format":
			case "aadc_guidelines_state": case "ad_serving_data_entry": case "macro_marker_repeat_state": case "player_state":
			case "change_markers_visibility": case "continuation_token": case "create_comment": case "createBackstagePost":
			case "entity_key": case "entity":
			case "get_pdg_buy_flow": case "get_report_form": case "get_transcript":
			case "invalidation":
			case "like": case "live_chat_replay": case "load_markers":
			case "next_radio": case "next": case "notification":
			case "player_seek": case "playability_status": case "playlist_edit":
			case "reel": case "reload":
			case "service$create_playlist": case "ad_slot_logging_data": case "subscribe": case "subscriptionState":
			case "timed_continuation": case "tracking": case "transcriptTrackSelection":
			case "unsubscribe":
			case "watch_playlist": case "watch":
			case "ypc_get_offers": case "ypc_get_offline_upsell": break;
		}
		if(parts.length===1) return this.handle_map_value(path,map_entry_value);
		switch(parts[1]) {
			default: {
				const idx=2; u(idx); debugger; switch(parts[1]) {case "": }
			} break;
			case "watch_next":
			case "transaction_params":
			case "serialized_slot_ad_serving_data_entry":
			case "reel_watch_sequence":
			case "binary_token":
			case "context_params": case "data": case "entity_key": case "xtags":
			case "params": case "normal": case "subscribed": case "ctoken": case "continuation": case "queue_context_params": case "player_params":
			case "key": case "parentTrackingParams": case "trackingParams": case "serializedParams": case "likeParams": case "dislikeParams":
			case "removeLikeParams": case "sequence_params": case "record_interactions": case "opt_out":
			case "f1": case "f4": case "f5": case "f6": case "f7": case "f9": case "f10": case "f13": case "f14":
		}
		if(parts.length===2) return this.handle_map_value(path,map_entry_value);
		switch(parts[2]) {
			default: {
				const idx=3; u(idx); debugger; switch(parts[2]) {case "": }
			} break;
			case "token":
			case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
			case "f10": case "f11": case "f12": case "f13": case "f14": case "f15": case "f16": case "f18": case "f19":
			case "f24": case "f25": case "f26": case "f27": case "f28": case "f28": case "f29":
			case "f30": case "f33": case "f39": case "f40": case "f49":
			case "f53": case "f56": case "f57": case "f71": case "f72": case "f110":
		}
		if(parts.length===3) return this.handle_map_value(path,map_entry_value);
		switch(parts[3]) {
			default: {
				const idx=4; u(idx); debugger; switch(parts[3]) {case "": }
			} break;
			case "f1[]":
			case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
			case "f12": case "f13": case "f14": case "f15": case "f25": case "f28": case "f31": case "f36":
		}
		if(parts.length===4) return this.handle_map_value(path,map_entry_value);
		switch(parts[4]) {
			default: {
				const idx=5; u(idx); debugger; switch(parts[4]) {case "": }
			} break;
			case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f7": case "f8": case "f9":
			case "f10": case "f11": case "f15": case "f19": case "f20": case "f25": case "f28": case "f36":
		}
		if(parts.length===5) return this.handle_map_value(path,map_entry_value);
		switch(parts[5]) {
			default: {
				const idx=6; u(idx); debugger; switch(parts[5]) {case "": }
			} break;
			case "f1[]":
			case "f1": case "f2": case "f3": case "f4": case "f5": case "f6": case "f8": case "f15":
		}
		if(parts.length===6) return this.handle_map_value(path,map_entry_value);
		switch(parts[6]) {
			default: {
				const idx=7; u(idx); debugger; switch(parts[6]) {case "": }
			} break;
			case "f1":
		}
		if(parts.length===7) return this.handle_map_value(path,map_entry_value);
		switch(parts[7]) {
			default: {
				const idx=8; u(idx); debugger; switch(parts[7]) {case "": }
			} break;
			case "f4":
		}
		if(parts.length!==8) {debugger; return false;}
		return this.handle_map_value(path,map_entry_value);
	}
	/** @private @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
	parse_param_next_arr(root,path,map_entry_key_path,tva,callback) {
		let off=1;
		let ret=true;
		for(let val of tva) {
			off++;
			let g1=() => {
				console.log(`\n\t"[parse_value.gen_ar] [${path}[]]",`);
				console.log(`\n\tcase ${JSON.stringify(path)}:\n`);
				console.log("path offset",off);
			};
			switch(path)/*parse_param_next_arr*/ {
				default: g1(); ret=false; continue;
				case "continuation_request.watch_next.token.f9.f1.f1":
				case "get_report_form.params.f28.f1":
				case "get_report_form.params.f28.f1[].f1.f1": {
					let res=this.parse_param_next(root,`${path}[]`,map_entry_key_path,[val],callback);
					if(res===false) ret=false;
				}; continue;
			}
		}
		return ret;
	}
	/**
	 * @template {CF_PlayerParams} T
	 * @arg {ARG_on_player_params_callback_ty_len1<T,P_ParamParse>[2]} map_entry_key_path
	 * @arg {V_ParamMapValue[]} map_entry_values @arg {ARG_PathFor_PlayerParams} path @arg {number[]} map_keys @arg {T} root @returns {boolean} */
	on_player_params_callback_ty(map_entry_values,map_entry_key_path,path,map_keys,root) {
		let saved_map_keys=map_keys.slice();
		let map_entry_key=map_entry_key_path.at(-1);
		if(!map_entry_key) {debugger; return false;}
		switch(map_entry_key_path.length) {
			default: break;
			case 1: case 2:
			case 3: return this.on_player_params_callback_ty_len1(root,path,map_entry_key_path,map_entry_values,saved_map_keys);
		}
		return false;
	}
	/** @template {CF_PlayerParams} T @template {P_ParamParse} U @arg {ARG_on_player_params_callback_ty_len1<T,U>} x */
	on_player_params_callback_ty_len1(...x) {
		const [a1,a2,a3,a4,a5]=x;
		switch(a1) {
			default: debugger; return false;
			case "DE_VE3832_Watch": case "R_WatchPage_VE3832":
		}
		console.log("[info_on_player_params_callback_ty_len1]",a2,a3,a4,a5);
		debugger;
		return false;
	}
	/** @typedef {"DE_VE3832_Watch"|"R_WatchPage_VE3832"} CF_PlayerParams */
	/** @template {CF_PlayerParams} T @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values @arg {P_ParamParse} path @arg {number[]} map_keys @arg {T} root @returns {boolean} */
	on_player_params_callback(root,path,map_entry_values,map_entry_key_path,map_keys) {
		switch(path)/*player_params*/ {
			default: debugger; return false;
			case "watch.player_params":
			case "watch.player_params.f40": case "watch.player_params.f40.f1":
		}
		/** @type {ARG_on_player_params_callback_ty_len1<T,P_ParamParse>[2]} */
		let t_pt=as(map_entry_key_path);
		switch(root) {
			default: debugger; return false;
			case "DE_VE3832_Watch":
			case "R_WatchPage_VE3832":
		}
		switch(t_pt.length) {
			default: debugger; return false;
			case 1: {
				switch(t_pt[0]) {
					default: debugger; return false;
					case 8: case 9: case 12: case 25: case 40: {
						const rk=this.exact_arr(t_pt[0]);
						return this.on_player_params_callback_ty(map_entry_values,rk,path,map_keys,root);
					}
				}
			}
			case 2: switch(t_pt[0]) {
				default: debugger; return false;
				case 40: switch(t_pt[1]) {
					case 1: {
						let [k1,k2]=t_pt;
						const rk=this.exact_arr(k1,k2);
						return this.on_player_params_callback_ty(map_entry_values,rk,path,map_keys,root);
					}
				}
			}
			case 3: {
				switch(t_pt[0]) {
					default: debugger; return false;
					case 40:
				}
				if(t_pt[1]!==1) debugger;
				switch(t_pt[2]) {
					default: debugger; return false;
					case 2: case 3:
				}
				return this.on_player_params_callback_ty(map_entry_values,t_pt,path,map_keys,root);
			}
		}
	}
	/** @template {CF_L_Params} T @arg {P_ParamParse} path @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]} map_entry_values  @arg {number[]} map_keys @arg {T} root @returns {boolean} */
	on_endpoint_params_callback(root,path,map_entry_values,map_entry_key_path,map_keys) {
		let callback=this.on_endpoint_params_callback.bind(this);
		let map_entry_key=map_entry_key_path.at(-1);
		if(!map_entry_key) return false;
		let map_keys_=map_keys.slice();
		let {new_path}=this.get_parse_fns(path,map_keys_,map_entry_values[0],map_entry_key);
		/** @private @arg {string} ns @arg {()=>void} f */
		let grouped=(ns,f) => {
			console.group(ns);
			f();
			console.groupEnd();
		};
		switch(path) {
			// binary tab enum
			/** @type {B_BinaryBrowseTab} */
			case "continuation_token.data.f110.f3": switch(map_entry_key) {
				case 2: case 3: case 6: case 7: case 8: case 9: case 10: case 11: case 15: case 19: case 20:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
		}
		/** @private @type {P_LogItems} */
		switch(path)/*endpoint*/ {
			default: {
				grouped("[parse_value."+split_string_once(path,".")[0]+"]",new_path);
				{debugger;}
				/** @private @type {P_ParamParse} */
				return this.parse_param_next(root,as(`${path}.f${map_entry_key}`),map_entry_key_path,map_entry_values,callback);
			}
			case "continuation_request.watch_next.token.f9.f1": switch(map_entry_key) {
				case 1: case 3: case 4:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f9": switch(map_entry_key) {
				case 1: case 3:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token": switch(map_entry_key) {
				case 3: case 9: case 13: case 14:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f2.f36": switch(map_entry_key) {
				case 5: case 8:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f2": switch(map_entry_key) {
				case 2: case 6: case 25: case 28: case 36:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token": switch(map_entry_key) {
				case 2: case 3: case 9: case 13: case 14:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f6.f4": switch(map_entry_key) {
				case 4: case 6: case 15:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f6": switch(map_entry_key) {
				case 4: case 8:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token.f2": switch(map_entry_key) {
				case 2:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "continuation_request.watch_next.token": switch(map_entry_key) {
				case 2: case 3: case 6:
					return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
				default:
			} break;
			case "get_pdg_buy_flow.params":
			case "get_report_form.params.f18": case "service$create_playlist": case "like.removeLikeParams.f1": case "like.dislikeParams.f1": case "like.likeParams.f1": case "get_report_form.params.f28.f1[].f1.f1[]": case "get_report_form.params.f18": case "get_report_form.params.f28.f1.f1.f1": case "get_report_form.params.f28.f1.f1": case "get_report_form.params.f28": case "watch.params.f27": case "watch.player_params.f40": case "get_notification_menu.ctoken": case "ypc_get_offers.params.f5.f5": case "subscribe.params.f2": case "continuation_token.data.f110.f3.f15.f2": case "create_comment.params.f5": case "unsubscribe.params.f1": case "playability_status.context_params.f2": case "watch_playlist.params.f27":
			case "entity_key.normal.f2": case "get_report_form.params.f28":
			case "get_report_form.params.f28.f1[].f1": {
				switch(map_entry_key) {case 1: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_report_form.params.f18.f1": {
				switch(map_entry_key) {case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "continuation_token.data.f110":
			case "reel.sequence_params.f5": {
				switch(map_entry_key) {case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_report_form.params.f28.f1.f1.f1.f1": {
				switch(map_entry_key) {case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "continuation_token.data.f49": {
				switch(map_entry_key) {case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "like.removeLikeParams.f5": case "like.dislikeParams.f4": case "like.likeParams.f6": case "createBackstagePost.params": case "notification.record_interactions.f2.f14.f1": case "notification.record_interactions.f2.f14.f1": case "ypc_get_offers.params.f1": case "notification.record_interactions.f2.f14": case "notification.record_interactions.f2.f14":
			case "playability_status.context_params": {
				switch(map_entry_key) {case 1: case 2: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_report_form.params.f28.f1[]":
			case "get_report_form.params.f28.f1": {
				switch(map_entry_key) {case 1: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "watch.player_params.f40.f1":
			case "continuation_token.data.f110.f3.f15": {
				switch(map_entry_key) {case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "reel.sequence_params": {
				switch(map_entry_key) {case 1: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "notification.record_interactions": {
				switch(map_entry_key) {case 2: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "next.continuation.f2.f36": {
				switch(map_entry_key) {case 5: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "tracking.trackingParams.f6": {
				switch(map_entry_key) {case 12: case 13: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "notification.record_interactions.f2": {
				switch(map_entry_key) {case 1: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_pdg_buy_flow.params.f1":
			case "tracking.trackingParams.f19": case "ad_serving_data_entry.f9": case "unsubscribe.params": case "reel.params.f3": case "tracking.trackingParams.f16.f4":
			case "tracking.trackingParams.f4": {
				switch(map_entry_key) {case 1: case 2: case 3: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "ad_slot_logging_data.serialized_slot_ad_serving_data_entry": {
				switch(map_entry_key) {case 1: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "ypc_get_offers.params": {
				switch(map_entry_key) {case 1: case 3: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "ad_serving_data_entry.f10": {
				switch(map_entry_key) {case 1: case 6: case 11: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "subscribe.params": {
				switch(map_entry_key) {case 2: case 3: case 4: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "player_state.entity_key": case "macro_marker_repeat_state.entity_key": case "load_markers.entity_key": case "change_markers_visibility.entity_key": case "entity_key.normal": case "entity_key.subscribed":
			case "aadc_guidelines_state.entity_key": {
				switch(map_entry_key) {case 2: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "create_comment.params": {
				switch(map_entry_key) {case 2: case 5: case 10: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "continuation_token.data.f53":
			case "tracking.trackingParams.f16":
			case "continuation_token.data.f53.f4": {
				switch(map_entry_key) {case 4: case 6: case 15: case 25: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "next.continuation": {
				switch(map_entry_key) {case 1: case 2: case 3: case 16: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "reel.params": {
				switch(map_entry_key) {case 1: case 3: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "notification.opt_out": {
				switch(map_entry_key) {case 2: case 3: case 4: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "watch.params.f33": {
				switch(map_entry_key) {case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "reel.player_params": {
				switch(map_entry_key) {case 30: case 57: case 71: case 72: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "ypc_get_offers.params.f5": {
				switch(map_entry_key) {case 1: case 3: case 5: case 9: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "like.removeLikeParams": {
				switch(map_entry_key) {case 1: case 3: case 4: case 5: case 6: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "like.dislikeParams": {
				switch(map_entry_key) {case 1: case 2: case 3: case 4: case 5: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "like.likeParams": case "like.dislikeParams": {
				switch(map_entry_key) {case 1: case 4: case 5: case 6: case 7: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "watch.player_params": {
				switch(map_entry_key) {case 8: case 9: case 12: case 25: case 40: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			/** @private @type {P_LogItems} */
			case "transcriptTrackSelection.serializedParams": {
				switch(map_entry_key) {case 1: case 2: case 3: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "continuation_request.reel_watch_sequence.token": {
				switch(map_entry_key) {case 1: case 3: case 5: case 8: case 12: case 15: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "continuation_token.data": {
				switch(map_entry_key) {case 1: case 15: case 49: case 53: case 72: case 110: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_transcript.params": {
				switch(map_entry_key) {case 1: case 2: case 3: case 5: case 6: case 7: case 8: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "next.continuation.f2": {
				switch(map_entry_key) {case 2: case 4: case 7: case 25: case 28: case 31: case 36: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "watch_playlist.params": {
				switch(map_entry_key) {case 1: case 2: case 3: case 4: case 7: case 12: case 13: case 27: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "ad_serving_data_entry": {
				switch(map_entry_key) {case 4: case 5: case 6: case 7: case 9: case 10: case 13: case 14: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "watch.params": {
				switch(map_entry_key) {case 2: case 3: case 7: case 12: case 13: case 24: case 27: case 33: case 39: case 56: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "get_report_form.params": {
				switch(map_entry_key) {case 2: case 8: case 11: case 14: case 15: case 18: case 25: case 26: case 27: case 28: case 29: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback); default: }
			} break;
			case "tracking.trackingParams": {
				switch(map_entry_key) {
					case 16: case 19: return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
					default: {
						/** @arg {number} x @template {number} T @arg {T} mx @returns {x is T_NumRange<1,T>} */
						function is_in_range(x,mx) {
							if(x<=mx) return true;
							return false;
						}
						if(!is_in_range(map_entry_key,11)) break;
						return this.parse_param_next(root,`${path}.f${map_entry_key}`,map_entry_key_path,map_entry_values,callback);
					}
				}
			} break;
		}
		return false;
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
		let map_keys=[...map.keys()];
		let parse_key=this.make_parse_key(root,path,map,map_keys,callback);
		for(let i=1;i<300;i++) {
			if(!map_keys.includes(i)) continue;
			map_entry_key_path.push(i);
			parse_key(map_entry_key_path);
			map_entry_key_path.pop();
		}
		if(this.eq_keys(map_keys,[])) return;
		let {new_ns}=this.get_parse_fns(path,map_keys,null);
		new_ns();
		let param_obj=this.to_param_obj(map);
		console.log(`[endpoint.${path}] [idx=${key_index}]`,param_obj);
		{debugger;}
	}
	/** @private @template {CF_L_TP_Params|CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {T_ParseCallbackFunction<T>} callback */
	make_parse_key(root,path,map,map_keys,callback) {
		/** @private @arg {number[]} map_entry_key_path */
		let parse_key=(map_entry_key_path) => {
			let map_entry_key=map_entry_key_path.at(-1);
			if(map_entry_key===void 0) return;
			let map_entry_values=map.get(map_entry_key);
			this.parse_value(root,path,map,map_keys,map_entry_key_path,map_entry_values,callback);
		};
		return parse_key;
	}
	parse_key_index=1;
	/** @api @public @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]|undefined} map_entry_values @arg {T_ParseCallbackFunction<T>} callback */
	parse_value(root,path,map,map_keys,map_entry_key_path,map_entry_values,callback) {
		let map_entry_key=map_entry_key_path.at(-1);
		let map_keys_=map_keys.slice();
		if(map_entry_values!==void 0&&map_entry_key) {
			let res=callback(root,path,map_entry_values,map_entry_key_path,map_keys_);
			if(res) {
				map.delete(map_entry_key);
				let cx=map_keys.indexOf(map_entry_key);
				if(cx>-1) map_keys.splice(cx,1);
			} else {
				debugger;
			}
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
	clickTrackingParams(cf,x) {this.params(cf,"tracking.trackingParams",x);}
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
			this.indexed_db_put("channel_id",{key: `channel_id:UC:${id}`,type: "channel_id:UC",id,raw_id});
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
	trackingParams(cf,x) {this.params(cf,"tracking.trackingParams",x);}
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
	/** @private @arg {AD_ChangeEngagementPanelVisibility} x */
	AD_ChangeEngagementPanelVisibility(x) {
		const cf="AD_ChangeEngagementPanelVisibility";
		const {targetId,visibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_EngagementPanelTargetId(cf,targetId);
		switch(visibility) {
			default: this.codegen_case(`${cf}.visibility`,visibility); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED":
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN":
		}
	}
	/** @private @arg {D_ThumbnailOverlayInlineUnplayable} x */
	D_ThumbnailOverlayInlineUnplayable(x) {
		const cf="D_ThumbnailOverlayInlineUnplayable";
		const {text,icon,...y}=this.s(cf,x); this.g(y);
		this.G_Text(text);
		this.ceq(icon.iconType,"PLAY_DISABLED");
	}
	/** @private @arg {D_ThumbnailOverlayHoverText} x */
	D_ThumbnailOverlayHoverText(x) {
		const cf="D_ThumbnailOverlayHoverText"; this.k(cf,x);
		const {text,icon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		if(icon.iconType!=="PLAY_ALL") debugger;
	}
	/** @private @arg {D_ThumbnailOverlayBottomPanel} x */
	D_ThumbnailOverlayBottomPanel(x) {const cf="D_ThumbnailOverlayBottomPanel"; this.y(cf,"icon",x,x => this.T_Icon(`${cf}:icon`,x));}
	/** @private @arg {D_ThumbnailOverlayEndorsement} x */
	D_ThumbnailOverlayEndorsement(x) {
		const cf="D_ThumbnailOverlayEndorsement"; this.k(cf,x);
		const {text,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.trackingParams(cf,trackingParams);
	}
	make_icon_types_map() {
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
	}
	icon_types_map=this.make_icon_types_map();
	/** @protected @arg {CF_T_Icon_Any} cf1 @template {string} T @arg {T_Icon<T>} x @arg {T[]} ty_arr */
	T_Icon_AnyOf(cf1,x,ty_arr) {
		const cf2="T_Icon";
		const {iconType,...y}=this.s_priv(`${cf2}:any:${cf1}`,x); this.g(y);/*#destructure_done*/
		const is_missing_iconType=!ty_arr.includes(iconType);
		if(is_missing_iconType) {console.log(`[missing_icon.${cf1}]`,iconType);}
		this.save_string("IconType",iconType);
		return is_missing_iconType;
	}
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
	/** @protected @template {string} T @arg {T[]} expected_arr @arg {T[]} missing_arr @arg {CF_onMissingIcon} cf @arg {T_Icon<T>} icon @template {{icon:T_Icon<T>;}} U @arg {U} x */
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
	/** @protected @arg {D_ThumbnailOverlayLoadingPreview} x */
	D_ThumbnailOverlayLoadingPreview(x) {this.H_("D_ThumbnailOverlayLoadingPreview","text",x,this.G_Text);}
	/** @private @arg {D_ThumbnailOverlayNowPlaying} x */
	D_ThumbnailOverlayNowPlaying(x) {const cf="D_ThumbnailOverlayNowPlaying"; this.y(cf,"text",x,this.G_Text);}
	/** @private @arg {R_ThumbnailOverlayBottomPanel} x */
	R_ThumbnailOverlayBottomPanel(x) {this.H_("R_ThumbnailOverlayBottomPanel","thumbnailOverlayBottomPanelRenderer",x,this.D_ThumbnailOverlayBottomPanel);}
	/** @private @arg {R_ThumbnailOverlayEndorsement} x */
	R_ThumbnailOverlayEndorsement(x) {this.H_("R_ThumbnailOverlayEndorsement","thumbnailOverlayEndorsementRenderer",x,this.D_ThumbnailOverlayEndorsement);}
	/** @private @arg {R_ThumbnailOverlayHoverText} x */
	R_ThumbnailOverlayHoverText(x) {this.H_("R_ThumbnailOverlayHoverText","thumbnailOverlayHoverTextRenderer",x,this.D_ThumbnailOverlayHoverText);}
	/** @private @arg {R_ThumbnailOverlayInlineUnplayable} x */
	R_ThumbnailOverlayInlineUnplayable(x) {this.H_("R_ThumbnailOverlayInlineUnplayable","thumbnailOverlayInlineUnplayableRenderer",x,this.D_ThumbnailOverlayInlineUnplayable);}
	/** @private @arg {R_ThumbnailOverlayLoadingPreview} x */
	R_ThumbnailOverlayLoadingPreview(x) {this.H_("R_ThumbnailOverlayLoadingPreview","thumbnailOverlayLoadingPreviewRenderer",x,this.D_ThumbnailOverlayLoadingPreview);}
	/** @private @arg {R_ThumbnailOverlayNowPlaying} x */
	R_ThumbnailOverlayNowPlaying(x) {this.H_("R_ThumbnailOverlayNowPlaying","thumbnailOverlayNowPlayingRenderer",x,this.D_ThumbnailOverlayNowPlaying);}
	/** @private @arg {R_ThumbnailOverlayResumePlayback} x */
	R_ThumbnailOverlayResumePlayback(x) {this.H_("R_ThumbnailOverlayResumePlayback","thumbnailOverlayResumePlaybackRenderer",x,this.D_ThumbnailOverlayResumePlayback);}
	/** @private @arg {R_ThumbnailOverlaySidePanel} x */
	R_ThumbnailOverlaySidePanel(x) {this.H_("R_ThumbnailOverlaySidePanel","thumbnailOverlaySidePanelRenderer",x,this.D_ThumbnailOverlaySidePanel);}
	/** @private @arg {R_ThumbnailOverlayTimeStatus} x */
	R_ThumbnailOverlayTimeStatus(x) {this.H_("R_ThumbnailOverlayTimeStatus","thumbnailOverlayTimeStatusRenderer",x,this.D_ThumbnailOverlayTimeStatus);}
	/** @private @arg {R_ThumbnailOverlayToggleButton} x */
	R_ThumbnailOverlayToggleButton(x) {this.H_("R_ThumbnailOverlayToggleButton","thumbnailOverlayToggleButtonRenderer",x,this.D_ThumbnailOverlayToggleButton);}
	/** @protected @arg {G_ThumbnailOverlayItem} x */
	G_ThumbnailOverlayItem(x) {
		const cf="G_ThumbnailOverlayItem"; this.k(cf,x);
		if("thumbnailOverlayBottomPanelRenderer" in x) return this.R_ThumbnailOverlayBottomPanel(x);
		if("thumbnailOverlayEndorsementRenderer" in x) return this.R_ThumbnailOverlayEndorsement(x);
		if("thumbnailOverlayHoverTextRenderer" in x) return this.R_ThumbnailOverlayHoverText(x);
		if("thumbnailOverlayInlineUnplayableRenderer" in x) return this.R_ThumbnailOverlayInlineUnplayable(x);
		if("thumbnailOverlayLoadingPreviewRenderer" in x) return this.R_ThumbnailOverlayLoadingPreview(x);
		if("thumbnailOverlayNowPlayingRenderer" in x) return this.R_ThumbnailOverlayNowPlaying(x);
		if("thumbnailOverlayResumePlaybackRenderer" in x) return this.R_ThumbnailOverlayResumePlayback(x);
		if("thumbnailOverlaySidePanelRenderer" in x) return this.R_ThumbnailOverlaySidePanel(x);
		if("thumbnailOverlayTimeStatusRenderer" in x) return this.R_ThumbnailOverlayTimeStatus(x);
		if("thumbnailOverlayToggleButtonRenderer" in x) return this.R_ThumbnailOverlayToggleButton(x);
		this.codegen_typedef_all(`ThumbnailOverlay$${cf}`,x);
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
	/** @private @type {string[]} */
	service_menu_icons=[];
	/** @arg {string} cf @arg {string} x */
	new_service_icon(cf,x) {
		if(this.service_menu_icons.includes(x)) return;
		this.service_menu_icons.push(x);
		this.codegen_all_service_menu_icons(cf);
	}
	/** @arg {string} cf */
	codegen_all_service_menu_icons(cf) {
		let arr_items=JSON.stringify(this.service_menu_icons,null,"\t");
		console.log(`-- [ServiceMenu.${cf}.icon] --\n%s`,arr_items);
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
	/** @private @arg {D_Menu_Button} x */
	D_Menu_Button(x) {
		const cf="D_Menu_Button";
		if("buttonRenderer" in x) return this.R_Button(x);
		if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
		if("playlistLoopButtonRenderer" in x) return this.R_PlaylistLoopButton(x);
		if("toggleButtonRenderer" in x) return this.R_ToggleButton(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {DE_CreateBackstagePost} x */
	DE_CreateBackstagePost(x) {const cf="DE_CreateBackstagePost"; this.y(cf,"createBackstagePostParams",x,x => this.params("DE_CreateBackstagePost.params","createBackstagePost.params",x));}
	/** @private @arg {DE_Feedback} x */
	DE_Feedback(x) {
		const cf="DE_Feedback";
		const {feedbackToken,uiActions,actions,...y}=this.s(cf,x); this.g(y);
		this.save_b64_binary("feedbackToken",feedbackToken);
		this.t(uiActions,this.D_HideEnclosingContainer);
		this.t(actions,x => this.z(x,this.DE_Feedback_ActionItem));
	}
	/** @private @arg {GM_RemoveLike} x */
	GM_RemoveLike(x) {this.T_GM("GM_RemoveLike",x,x => this.ceq(x,"/youtubei/v1/like/removelike"));}
	/** @private @arg {GM_Dislike} x */
	GM_Dislike(x) {this.T_GM("GM_Dislike",x,x => this.ceq(x,"/youtubei/v1/like/dislike"));}
	/** @private @arg {GM_LikeLike} x */
	GM_LikeLike(x) {this.T_GM("GM_LikeLike",x,x => this.ceq(x,"/youtubei/v1/like/like"));}
	/** @private @arg {M_CreateBackstagePost} x */
	M_CreateBackstagePost(x) {this.T_WCM("M_CreateBackstagePost",x,this.GM_CreateBackstagePost);}
	/** @private @arg {E_Subscribe} x */
	E_Subscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Subscribe","subscribeEndpoint",x); this.g(y); this.M_Subscribe(a); this.DE_Subscribe(b);}
	/** @private @arg {C_ShowReloadUi} x */
	C_ShowReloadUi(x) {
		const cf="C_ShowReloadUi"; this.k(cf,x);
		const {clickTrackingParams,showReloadUiCommand: a,...y}=this.s(cf,x); this.g(y);//#destructure
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ShowReloadUi(a);
	}
	/** @private @arg {D_HideEnclosingContainer} x */
	D_HideEnclosingContainer(x) {if(!this.eq_keys(this.get_keys_of(x),["hideEnclosingContainer"])) debugger; let q=Object.values(x); if(q.length!==1) debugger; if(q[0]!==true) debugger;}
	/** @private @arg {D_MenuNavigationItem["navigationEndpoint"]} x */
	D_MenuNavigationItem_Endpoint(x) {
		if("userFeedbackEndpoint" in x) return this.E_UserFeedback(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
	}
	/** @private @arg {AD_HideEnclosing} x */
	AD_HideEnclosing(x) {this.y("AD_HideEnclosing","notificationId",x,this.a_primitive_str);}
	/** @private @arg {A_HideEnclosing} x */
	A_HideEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_HideEnclosing","hideEnclosingAction",x); this.g(y); this.AD_HideEnclosing(a);}
	/** @private @arg {DE_RecordNotificationInteractions} x */
	DE_RecordNotificationInteractions(x) {
		const cf="DE_RecordNotificationInteractions"; this.k(cf,x);
		const {serializedInteractionsRequest,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"notification.record_interactions",serializedInteractionsRequest);
		this.tz(actions,this.A_HideEnclosing);
	}
	/** @protected @arg {E_RecordNotificationInteractions} x */
	E_RecordNotificationInteractions(x) {const [a,b,y]=this.TE_Endpoint_3("E_RecordNotificationInteractions","recordNotificationInteractionsEndpoint",x); this.g(y); this.M_RecordInteractions(a); this.DE_RecordNotificationInteractions(b);}
	/** @private @arg {M_RecordInteractions} x */
	M_RecordInteractions(x) {this.T_WCM("M_RecordInteractions",x,this.GM_RecordInteractions);}
	/** @private @arg {GM_RecordInteractions} x */
	GM_RecordInteractions(x) {this.T_GM("GM_RecordInteractions",x,x => this.ceq(x,"/youtubei/v1/notification/record_interactions"));}
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
	/** @private @arg {DE_Feedback_ActionItem} x */
	DE_Feedback_ActionItem(x) {
		const cf="DE_Feedback"; this.k(cf,x);
		if("filterChipTransformCommand" in x) return this.C_FilterChipTransform(x);
		if("replaceEnclosingAction" in x) return this.A_ReplaceEnclosing(x);
		debugger;
	}
	/** @private @arg {DE_Subscribe} x */
	DE_Subscribe(x) {
		const cf="DE_Subscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.D_ChannelId);
		this.params(cf,"subscribe.params",params);
	}
	/** @private @arg {GM_CreateBackstagePost} x */
	GM_CreateBackstagePost(x) {this.T_GM("GM_CreateBackstagePost",x,x => this.ceq(x,"/youtubei/v1/backstage/create_post"));}
	/** @private @arg {M_Subscribe} x */
	M_Subscribe(x) {this.T_WCM("M_Subscribe",x,this.GM_Subscribe);}
	/** @private @arg {DC_ShowReloadUi} x */
	DC_ShowReloadUi(x) {
		const cf="DC_ShowReloadUi"; this.k(cf,x);
		const {targetId,...y}=this.s(cf,x); this.g(y);//#destructure*/
		this.D_UiTargetId(targetId);
	}
	/** @type {D_UiTargetId[]} */
	reload_ui_target_id_arr=[];
	/** @arg {D_UiTargetId} x */
	D_UiTargetId(x) {
		if(this.is_yt_uuid(x)) return;
		switch(x) {
			default: if(!this.reload_ui_target_id_arr.includes(x)) {this.reload_ui_target_id_arr.push(x); debugger;} break;
			case "comments-section":
			case "browse-feedFEwhat_to_watch": case "watch-next-feed": case "engagement-panel-comments-section":
		}
	}
	/** @private @arg {R_PlaylistLoopButton} x */
	R_PlaylistLoopButton(x) {this.H_("R_PlaylistLoopButton","playlistLoopButtonRenderer",x,this.D_PlaylistLoopButton);}
	/** @private @arg {R_SegmentedLikeDislikeButton} x */
	R_SegmentedLikeDislikeButton(x) {this.H_("R_SegmentedLikeDislikeButton","segmentedLikeDislikeButtonRenderer",x,this.D_SegmentedLikeDislikeButton);}
	/** @private @template T @arg {T_SE_Signal<M_SendPost,T>} x @returns {["Signal",T]} */
	TE_SignalService_I_0(x) {
		const cf="TE_SignalService_I_0"; this.k(cf,x);
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.M_SendPost(commandMetadata);
		return ["Signal",signalServiceEndpoint];
	}
	/** @private @arg {D_PlaylistLoopButton} x */
	D_PlaylistLoopButton(x) {
		const cf="D_PlaylistLoopButton";
		const {states,currentState,playlistLoopStateEntityKey,...y}=this.s(cf,x); this.g(y);
		this.z(states,this.R_PlaylistLoopButtonState);
		if(currentState!=="PLAYLIST_LOOP_STATE_NONE") debugger;
		this.a_primitive_str(playlistLoopStateEntityKey);
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
		this.save_string(`${cf}.style`,style);
		this.save_string(`${cf}.size`,size);
		if(isDisabled!==false) debugger;
		this.G_Text(text);
		this.E_ShareEntityService(serviceEndpoint);
		if(icon.iconType!=="SHARE") debugger;
		if(tooltip!=="Share") debugger;
		this.trackingParams(cf,trackingParams);
		this.D_Accessibility(accessibilityData);
	}
	/** @private @arg {GM_Subscribe} x */
	GM_Subscribe(x) {this.T_GM("GM_Subscribe",x,x => this.ceq(x,"/youtubei/v1/subscription/subscribe"));}
	/** @private @arg {E_NotificationOptOut} x */
	E_NotificationOptOut(x) {const cf="E_NotificationOptOut",[a,b,y]=this.TE_Endpoint_3(cf,"notificationOptOutEndpoint",x); this.g(y); this.DE_NotificationOptOut(b); this.M_NotificationOptOut(a);}
	/** @private @arg {E_UserFeedback} x */
	E_UserFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreatePlaylistService","userFeedbackEndpoint",x); this.g(y); this.DE_UserFeedback(b); this.M_UserFeedback(a);}
	/** @private @arg {E_GetReportForm} x */
	E_GetReportForm(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetReportForm","getReportFormEndpoint",x); this.g(y); this.M_FlagGetForm(a); this.DE_GetReportForm(b);}
	/** @private @arg {C_FilterChipTransform} x */
	C_FilterChipTransform(x) {let [a,y]=this.TE_Endpoint_2("C_FilterChipTransform","filterChipTransformCommand",x); this.g(y); this.D_ChipUniqueId(a);}
	/** @private @arg {A_ReplaceEnclosing} x */
	A_ReplaceEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_ReplaceEnclosing","replaceEnclosingAction",x); this.g(y); this.AD_ReplaceEnclosing(a);}
	/** @private @arg {AD_ReplaceEnclosing} x */
	AD_ReplaceEnclosing(x) {
		this.T_Item(x,this.AD_ReplaceEnclosing_Item);
		let k=this.get_keys_of(x.item);
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
	/** @private @arg {DE_UserFeedback} x */
	DE_UserFeedback(x) {
		const cf="DE_UserFeedback";
		if("additionalDatas" in x) {
			const {additionalDatas,...y}=this.s(cf,x); this.g(y);
			this.z(additionalDatas,this.G_AdditionalDataItem);
			return;
		}
		const {hack,bucketIdentifier,...y}=this.s(cf,x); this.g(y);
		this.ceq(hack,true);
		this.save_string(`${cf}.bucketIdentifier`,bucketIdentifier);
	}
	/** @private @arg {M_NotificationOptOut} x */
	M_NotificationOptOut(x) {this.T_WCM("M_NotificationOptOut",x,this.GM_NotificationOptOut);}
	/** @private @arg {M_FlagGetForm} x */
	M_FlagGetForm(x) {this.T_WCM("M_FlagGetForm",x,this.GM_FlagGetForm);}
	/** @private @arg {M_UserFeedback} x */
	M_UserFeedback(x) {this.T_WCM("M_UserFeedback",x,this.GM_UserFeedback);}
	/** @protected @returns {true} */
	true_() {return true;}
	/** @protected @arg {GM_UserFeedback} x */
	GM_UserFeedback(x) {this.ceq(this.w("GM_UserFeedback","ignoreNavigation",x),this.true_());}
	/** @private @arg {D_ChipUniqueId} x */
	D_ChipUniqueId(x) {
		const cf="D_ChipUniqueId";
		const {chipUniqueId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(chipUniqueId) {
			case "ATTRIBUTE_FILTER_TYPE_EXPLORE": break;
		}
	}
	/** @private @arg {R_PlaylistLoopButtonState} x */
	R_PlaylistLoopButtonState(x) {this.H_("R_PlaylistLoopButtonState","playlistLoopButtonStateRenderer",x,this.D_PlaylistLoopButtonState);}
	/** @private @arg {D_PlaylistLoopButtonState} x */
	D_PlaylistLoopButtonState(x) {
		const cf="D_PlaylistLoopButtonState";
		const {state,button,...y}=this.s(cf,x); this.g(y);
		this.save_enum("PLAYLIST_LOOP_STATE",state);
		this.R_Button(button);
	}
	/** @private @arg {GM_NotificationOptOut} x */
	GM_NotificationOptOut(x) {this.T_GM("GM_NotificationOptOut",x,x => this.ceq(x,"/youtubei/v1/notification/opt_out"));}
	/** @private @arg {GM_FlagGetForm} x */
	GM_FlagGetForm(x) {this.T_GM("GM_FlagGetForm",x,x => this.ceq(x,"/youtubei/v1/flag/get_form"));}
	/** @private @arg {R_NotificationText} x */
	R_NotificationText(x) {this.H_("R_NotificationText","notificationTextRenderer",x,this.D_NotificationText);}
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
	/** @private @arg {E_UndoFeedback} x */
	E_UndoFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_UndoFeedback","undoFeedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_UndoFeedback(b);}
	/** @private @arg {DE_UndoFeedback} x */
	DE_UndoFeedback(x) {
		const cf="DE_UndoFeedback"; this.k(cf,x);
		const {undoToken,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_undo_token(undoToken);
		this.z(actions,this.A_UndoFeedback);
	}
	/** @override @protected @arg {string} k @arg {number|number[]|Uint8Array} x @arg {boolean} [force_update] */
	save_number(k,x,force_update=false) {
		if(x instanceof Uint8Array) x=[...x];
		return super.save_number(k,x,force_update);
	}
	/** @protected @arg {string} cf @arg {string} x */
	save_b64_binary(cf,x) {
		let buffer=base64_url_dec.decodeByteArray(x);
		if(!buffer) {debugger; return;}
		this.save_number(`${cf}.bytes.0-2`,buffer.slice(0,2));
	}
	/** @private @arg {string} x */
	parse_undo_token(x) {
		this.save_b64_binary("undo_token",x);
	}
	/** @private @arg {M_Feedback} x */
	M_Feedback(x) {this.T_WCM("M_Feedback",x,this.GM_Feedback);}
	/** @private @arg {GM_Feedback} x */
	GM_Feedback(x) {this.T_GM("GM_Feedback",x,x => this.ceq(x,"/youtubei/v1/feedback"));}
	/** @private @arg {A_UndoFeedback} x */
	A_UndoFeedback(x) {let [a,y]=this.TE_Endpoint_2("A_UndoFeedback","undoFeedbackAction",x); this.g(y); this.B_Hack(a);}
	/** @private @arg {GM_SendPost} x */
	GM_SendPost(x) {if(this.w("GM_SendPost","sendPost",x)!==true) debugger;}
	/** @protected @arg {R_ToggleButton} x */
	R_ToggleButton(x) {this.H_("R_ToggleButton","toggleButtonRenderer",x,this.D_ToggleButton);}
	/** @private @private @arg {any} z @template {D_ToggleButton} T @arg {CF_D_ToggleButton} cf @arg {T} x @returns {T extends infer V?Omit<V, T_Split<"trackingParams">[number]>:never} */
	D_ToggleButton_Omit(cf,x,z=null) {
		const {trackingParams,...y}=this.s(cf,x); z=y;
		this.trackingParams(cf,trackingParams);
		return z;
	}
	/** @private @arg {M_CreatePlaylist} x */
	M_CreatePlaylist(x) {this.T_WCM("M_CreatePlaylist",x,this.GM_CreatePlaylist);}
	/** @protected @arg {C_CommandExecutor} x */
	C_CommandExecutor(x) {let [a,b]=this.TE_Endpoint_2("C_CommandExecutor","commandExecutorCommand",x); this.g(b); this.DC_CommandExecutor(a);}
	/** @private @arg {DC_CommandExecutor} x */
	DC_CommandExecutor(x) {this.T_Commands("DC_CommandExecutor",x,this.G_DC_CommandExecutor_CommandItem);}
	/** @private @arg {DC_ScrollToEngagementPanel} x */
	DC_ScrollToEngagementPanel(x) {
		const cf="DC_ScrollToEngagementPanel"; this.k(cf,x);
		const {targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
	}
	/** @protected @arg {C_ScrollToEngagementPanel} x */
	C_ScrollToEngagementPanel(x) {
		const cf="C_ScrollToEngagementPanel"; this.k(cf,x);
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(cf,clickTrackingParams);
		this.DC_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @private @arg {G_DC_CommandExecutor_CommandItem} x */
	G_DC_CommandExecutor_CommandItem(x) {
		const cf="G_DC_CommandExecutor_CommandItem"; this.k(cf,x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
		if("hideEngagementPanelScrimAction" in x) return this.A_HideEngagementPanelScrim(x);
		if("loopCommand" in x) return this.C_Loop(x);
		if("updateToggleButtonStateCommand" in x) return this.C_UpdateToggleButtonState(x);
		if("changeMarkersVisibilityCommand" in x) return this.C_ChangeMarkersVisibility(x);
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) return this.C_EngagementPanelHeaderShowNavigationButton(x);
		if("entityUpdateCommand" in x) return this.C_EntityUpdate(x);
		if("likeEndpoint" in x) return this.E_Like(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @protected @arg {C_RepeatChapter} x */
	C_RepeatChapter(x) {let [a,y]=this.TE_Endpoint_2("C_RepeatChapter","repeatChapterCommand",x); this.g(y); this.DC_RepeatChapter(a);}
	/** @private @arg {DC_RepeatChapter} x */
	DC_RepeatChapter(x) {
		const cf="DC_RepeatChapter";
		const {repeat,startTimeMs,endTimeMs,repeatStateEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @private @arg {D_ToggleButton} x */
	D_ToggleButton(x) {
		const cf_base="D_ToggleButton";
		x: {
			const k="toggledAccessibilityData";
			if(!(k in x)) break x;
			/** @type {`${cf_base}:${k}`} */
			const cf1=`${cf_base}:${k}`;
			y: {
				const k2="size";
				if(!(k2 in x)) break y;
				/** @type {`${cf1}:${k2}`} */
				const cf2=`${cf1}:${k2}`;
				const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,toggledStyle,...u}=this.D_ToggleButton_Omit(cf2,x);
				this.save_string(`${cf2}.style`,style.styleType);
				this.ceq(isDisabled,false);
				this.a_primitive_bool(isToggled);
				this.save_string(`${cf2}.defaultIcon.type`,defaultIcon.iconType);
				this.E_PerformCommentAction(defaultServiceEndpoint/*1*/);
				this.E_PerformCommentAction(toggledServiceEndpoint/*1*/);
				this.save_string(`${cf2}.defaultIcon.type`,toggledStyle.styleType);
				const {size,defaultTooltip,toggledTooltip,accessibilityData,toggledAccessibilityData,...y}=u; this.g(y);/*#destructure_done*/
				if(size.sizeType!=="SIZE_DEFAULT") debugger;
				this.add_string_to_map(cf2,"defaultTooltip",defaultTooltip);
				this.add_string_to_map(cf2,"toggledTooltip",toggledTooltip);
				this.D_Accessibility(accessibilityData);
				this.D_Accessibility(toggledAccessibilityData);
				return;
			}
			const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,toggledStyle,...u}=this.D_ToggleButton_Omit(cf1,x);
			this.save_string(`${cf1}.style`,style.styleType);
			this.ceq(isDisabled,false);
			this.a_primitive_bool(isToggled);
			this.save_string(`${cf1}.defaultIcon.type`,defaultIcon.iconType);
			this.C_RepeatChapter(defaultServiceEndpoint);
			this.C_CommandExecutor(toggledServiceEndpoint);
			this.save_string(`${cf1}.defaultIcon.type`,toggledStyle.styleType);
			const {toggledAccessibilityData,accessibilityData,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Accessibility(toggledAccessibilityData);
			this.D_Accessibility(accessibilityData);
			return;
		}
		x: {
			const k="defaultText";
			if(!(k in x)) break x;
			/** @type {`${cf_base}:${k}`} */
			const cf1=`${cf_base}:${k}`;
			y: {
				const k2="style";
				if(!(k2 in x)) break y;
				/** @type {`${cf1}:${k2}`} */
				const cf2=`${cf1}:${k2}`;
				const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,toggledStyle,...u}=this.D_ToggleButton_Omit(cf2,x);
				this.save_string(`${cf2}.style`,style.styleType);
				this.ceq(isDisabled,false);
				this.a_primitive_bool(isToggled);
				this.save_string(`${cf2}.defaultIcon.type`,defaultIcon.iconType);
				this.C_CommandExecutor(defaultServiceEndpoint);
				this.E_Like(toggledServiceEndpoint);
				this.save_string(`${cf2}.defaultIcon.type`,toggledStyle.styleType);
				const {defaultText,toggledText,accessibility,defaultTooltip,toggledTooltip,accessibilityData,toggleButtonSupportedData,targetId,...y}=u; this.g(y);/*#destructure_done*/
				this.G_Text(defaultText);
				this.G_Text(toggledText);
				this.D_Label(accessibility);
				this.add_string_to_map(cf2,"defaultTooltip",defaultTooltip);
				this.add_string_to_map(cf2,"toggledTooltip",toggledTooltip);
				this.add_string_to_map(cf2,"accessibilityData.accessibilityData.label",accessibilityData.accessibilityData.label);
				this.D_ToggleButtonIdData(toggleButtonSupportedData);
				if(targetId!=="watch-like") debugger;
				return;
			}
			const {defaultText,toggledText,...y}=this.D_ToggleButton_Omit(cf1,x); this.g(y);/*#destructure_done*/
			this.G_Text(defaultText);
			this.G_Text(toggledText);
			return;
		}
		x: {
			const k="accessibilityData";
			if(!(k in x)) break x;
			/** @type {`${cf_base}:${k}`} */
			const cf1=`${cf_base}:${k}`;
			const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,toggledStyle,...u}=this.D_ToggleButton_Omit(cf1,x);
			this.save_string(`${cf1}.style`,style.styleType);
			this.ceq(isDisabled,false);
			this.a_primitive_bool(isToggled);
			this.save_string(`${cf1}.defaultIcon.type`,defaultIcon.iconType);
			this.C_CommandExecutor(defaultServiceEndpoint);
			this.E_Like(toggledServiceEndpoint);
			this.save_string(`${cf1}.defaultIcon.type`,toggledStyle.styleType);
			const {accessibilityData,accessibility,defaultTooltip,toggledTooltip,toggleButtonSupportedData,targetId,...y}=u; this.g(y);/*#destructure_done*/
			this.D_Accessibility(accessibilityData);
			this.add_string_to_map(cf1,"accessibilityData.accessibilityData.label",accessibilityData.accessibilityData.label);
			this.D_Label(accessibility);
			this.add_string_to_map(cf1,"defaultTooltip",defaultTooltip);
			this.add_string_to_map(cf1,"toggledTooltip",toggledTooltip);
			this.D_ToggleButtonIdData(toggleButtonSupportedData);
			if(targetId!=="watch-dislike") debugger;
			return;
		}
		x: {
			const k="accessibility";
			if(!(k in x)) break x;
			/** @type {`${cf_base}:${k}`} */
			const cf1=`${cf_base}:${k}`;
			const {style,isDisabled,isToggled,defaultIcon,defaultServiceEndpoint,toggledServiceEndpoint,toggledStyle,...u}=this.D_ToggleButton_Omit(cf1,x);
			this.save_string(`${cf1}.style`,style.styleType);
			this.ceq(isDisabled,false);
			this.a_primitive_bool(isToggled);
			this.save_string(`${cf1}.defaultIcon.type`,defaultIcon.iconType);
			this.E_SignalService_SendPost(defaultServiceEndpoint);
			this.E_SignalService_SendPost(toggledServiceEndpoint);
			this.save_string(`${cf1}.defaultIcon.type`,toggledStyle.styleType);
			const {size,accessibility,defaultTooltip,toggledTooltip,...y}=u; this.g(y);/*#destructure_done*/
			if(size.sizeType!=="SIZE_DEFAULT") debugger;
			this.D_Label(accessibility);
			this.add_string_to_map(cf1,"defaultTooltip",defaultTooltip);
			this.add_string_to_map(cf1,"toggledTooltip",toggledTooltip);
			return;
		}
		debugger;
	}
	/** @private @template {number} T @arg {T_Types<T>} x @arg {T|null} _x @returns {T} */
	T_Types(x,_x=null) {
		const cf="T_Types";
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @private @template {number} T @template {`${T}`} U @arg {U} x @arg {T|null} _v @returns {T} */
		function parse_number(x,_v) {return as(Number.parseInt(x,10));}
		return parse_number(types,_x);
	}
	/** @private @arg {D_LoggingDirectives_Gestures} x */
	D_LoggingDirectives_Gestures(x) {
		const cf="D_LoggingDirectives_Gestures"; this.g_k(cf,x); this.k(cf,x);
		let inner=this.T_Types(x);
		if(inner!==4) debugger;
	}
	/** @private @arg {C_UpdateToggleButtonState} x */
	C_UpdateToggleButtonState(x) {let [a,b]=this.TE_Endpoint_2("C_UpdateToggleButtonState","updateToggleButtonStateCommand",x); this.g(b); this.DC_UpdateToggleButtonState(a);}
	/** @private @arg {DC_UpdateToggleButtonState} x */
	DC_UpdateToggleButtonState(x) {
		const cf="DC_UpdateToggleButtonState",{toggled: a,buttonId: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(a);
		this.save_enum("TOGGLE_BUTTON_ID_TYPE",b);
	}
	/** @private @arg {C_Loop} x */
	C_Loop(x) {let [a,b]=this.TE_Endpoint_2("C_Loop","loopCommand",x); this.g(b); this.DC_Loop(a);}
	/** @private @arg {DC_Loop} x */
	DC_Loop(x) {this.y("DC_Loop","loop",x,x => this.ceq(x,this.false_()));}
	/** @returns {false} */
	false_() {return false;}
	/** @private @arg {A_HideEngagementPanelScrim} x */
	A_HideEngagementPanelScrim(x) {let [a,y]=this.TE_Endpoint_2("A_HideEngagementPanelScrim","hideEngagementPanelScrimAction",x); this.g(y); this.AD_HideEngagementPanelTargetId(a);}
	/** @private @arg {AD_HideEngagementPanelTargetId} x */
	AD_HideEngagementPanelTargetId(x) {this.y("AD_HideEngagementPanelTargetId","engagementPanelTargetId",x,x => {if(x!=="engagement-panel-clip-create") debugger;});}
	/** @private @arg {C_EntityUpdate} x */
	C_EntityUpdate(x) {let [a,y]=this.TE_Endpoint_2("C_EntityUpdate","entityUpdateCommand",x); this.g(y); this.R_EntityBatchUpdate(a);}
	/** @protected @arg {DC_EntityBatchUpdate} x */
	R_EntityBatchUpdate(x) {this.H_("R_EntityBatchUpdate","entityBatchUpdate",x,this.DR_DC_EntityBatchUpdate);}
	/** @public @arg {DR_DC_EntityBatchUpdate} x */
	DR_DC_EntityBatchUpdate(x) {
		const cf="DR_DC_EntityBatchUpdate";
		const {mutations,timestamp,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(mutations,this.DE_MutationItem);
		this.t(timestamp,this.D_TimestampWithNanos);
	}
	/** @private @arg {D_TimestampWithNanos} x */
	D_TimestampWithNanos(x) {
		const cf="D_TimestampWithNanos"; this.k(cf,x);
		const {seconds,nanos,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(seconds);
		this.a_primitive_num(nanos);
	}
	/** @private @arg {DE_MutationItem} x */
	DE_MutationItem(x) {
		const cf="DE_MutationItem"; this.k(cf,x);
		switch(x.type) {
			default: debugger; break;
			case "ENTITY_MUTATION_TYPE_DELETE": this.DU_MutationDelete(x); break;
			case "ENTITY_MUTATION_TYPE_REPLACE": this.DU_MutationReplace(x); break;
		}
	}
	/** @private @arg {DU_MutationReplace} x */
	DU_MutationReplace(x) {
		const cf="DU_MutationReplace";
		const {entityKey,type,payload,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"entity_key.normal",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		let pr=this.G_EY_Entity(payload);
		if(!pr) return;
		this.XP_EntityPayload(pr);
	}
	/** @private @arg {DS_EY_MacroMarkersList} x */
	DS_EY_MacroMarkersList(x) {
		const cf="DS_EY_MacroMarkersList";
		const {key,...y}=this.s(cf,x);
		this.params(`${cf}.key`,"entity.key",key);
		if("externalVideoId" in y) {
			const {externalVideoId,markersList,...y1}=y; this.g(y1);
			this.videoId(externalVideoId);
			this.D_MarkersList(markersList);
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_MarkerItem} x */
	D_MarkerItem(x) {
		const cf="D_MarkerItem";
		const {title,startMillis,durationMillis,thumbnailDetails,onActive,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.a_primitive_str(startMillis);
		if(durationMillis!=="10000") debugger;
		this.D_Thumbnail(thumbnailDetails);
		this.C_Innertube(onActive);
	}
	/** @protected @arg {C_Innertube} x */
	C_Innertube(x) {this.H_("C_Innertube","innertubeCommand",x,this.G_DC_Innertube);}
	/** @arg {A_SetActivePanelItem} x */
	A_SetActivePanelItem(x) {let [a,y]=this.TE_Endpoint_2("A_SetActivePanelItem","setActivePanelItemAction",x); this.g(y); this.AD_SetActivePanelItem(a);}
	/** @private @arg {AD_SetActivePanelItem} x */
	AD_SetActivePanelItem(x) {
		const cf="AD_SetActivePanelItem";
		const {panelTargetId,itemIndex,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(panelTargetId) {
			default: debugger; break;
			case "engagement-panel-macro-markers-auto-chapters":
		}
		this.save_number(`${cf}.itemIndex`,itemIndex);
	}
	/** @private @arg {E_YpcGetOfflineUpsell} x */
	E_YpcGetOfflineUpsell(x) {const [a,y]=this.TE_Endpoint_2("E_YpcGetOfflineUpsell","ypcGetOfflineUpsellEndpoint",x); this.g(y); this.DE_YpcGetOfflineUpsell(a);}
	/** @private @arg {DE_YpcGetOfflineUpsell} x */
	DE_YpcGetOfflineUpsell(x) {this.D_Params("DE_YpcGetOfflineUpsell",x,"ypc_get_offline_upsell.params");}
	/** @arg {G_DC_Innertube} x */
	G_DC_Innertube(x) {
		const cf="G_DC_Innertube"; this.k(cf,x);
		if("setActivePanelItemAction" in x) return this.A_SetActivePanelItem(x);
		if("ypcGetOfflineUpsellEndpoint" in x) return this.E_YpcGetOfflineUpsell(x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		debugger;
	}
	/** @private @arg {D_MarkersList} x */
	D_MarkersList(x) {
		const cf="D_MarkersList";
		const {markerType,markers,headerTitle,onTap,loggingDirectives,...y}=this.s(cf,x); this.g(y);
		if(markerType!=="MARKER_TYPE_TIMESTAMPS") debugger;
		this.z(markers,this.D_MarkerItem);
		this.G_Text(headerTitle);
		this.C_Innertube(onTap);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_EY_Offlineability} x */
	D_EY_Offlineability(x) {
		const cf="D_EY_Offlineability";
		if("command" in x) {
			const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=this.s(cf,x); this.g(y);
			this.params(`${cf}.key`,"entity.key",key);
			this.C_Innertube(command);
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
	/** @arg {(G_EY_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?[keyof I,V]:never:never)|["unknown",string,{}]} p */
	XP_EntityPayload(p) {
		const [k,x]=p;
		switch(k) {
			case "offlineabilityEntity": this.D_EY_Offlineability(x); break;
			case "subscriptionStateEntity": {
				const cf="DS_EY_Subscription";
				const {key,subscribed,...y}=this.s(cf,x); this.g(y);
				this.params(cf,"subscriptionState.key",key);
				this.a_primitive_bool(subscribed);
			} break;
			case "playlistLoopStateEntity": {
				const cf="DS_EY_PlaylistLoop";
				const {key,state,...y}=this.s(cf,x); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				switch(state) {
					default: debugger; break;
					case "PLAYLIST_LOOP_STATE_ALL":
					case "PLAYLIST_LOOP_STATE_NONE":
					case "PLAYLIST_LOOP_STATE_ONE":
				}
			} break;
			case "transcriptTrackSelectionEntity": {
				const cf="DS_EY_TranscriptTrackSelection";
				const {key,selectedTrackIndex,serializedParams,...y}=this.s(cf,x); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				if(selectedTrackIndex!==0) debugger;
				this.params(cf,"transcriptTrackSelection.serializedParams",serializedParams);
			} break;
			case "transcriptSearchBoxStateEntity": {
				const cf="DS_EY_TranscriptSearchBox";
				const {key,isHidden,...y}=this.s(cf,x); this.g(y);
				this.params(`${cf}.key`,"entity.key",key);
				if(isHidden!==false) debugger;
			} break;
			case "macroMarkersListEntity": this.DS_EY_MacroMarkersList(x); break;
			case "unknown": {
				const cf="XP_EntityPayload.unknown";
				let pk=p[1];
				let x=p[2];
				if("key" in x) {
					const {key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					console.log(`unknown.${this.uppercase_first(pk)}.key`,key);
				} else {debugger;}
			} break;
		}
	}
	/** @private @arg {"G_EY_Entity"} cf @template V @arg {{[U in `${string}Entity`]:V}} x */
	G_EY_Entity_Any(cf,x) {return this.w(`G_EY_Entity_Any:${cf}`,this.get_keys_of(x)[0],x);}
	/**
	 * @public @arg {G_EY_Entity} x
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
	/** @private @arg {DU_MutationDelete} x */
	DU_MutationDelete(x) {
		const cf="DU_MutationDelete";
		const {entityKey,type,options,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params(cf,"entity_key.normal",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE") debugger;
		this.tf(this.O_DU_Persistence)(options);
	}
	/** @private @arg {O_DU_Persistence} x */
	O_DU_Persistence(x) {
		const cf="O_DU_Persistence"; this.k(cf,x);
		const {persistenceOption,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(persistenceOption!=="ENTITY_PERSISTENCE_OPTION_INMEMORY_AND_PERSIST") debugger;
	}
	/** @private @arg {C_EngagementPanelHeaderShowNavigationButton} x */
	C_EngagementPanelHeaderShowNavigationButton(x) {
		let [a,y]=this.TE_Endpoint_2("C_EngagementPanelHeaderShowNavigationButton","engagementPanelHeaderShowNavigationButtonCommand",x); this.g(y);
		this.DC_EngagementPanelHeaderShowNavigationButton(a);
	}
	/** @private @arg {DC_EngagementPanelHeaderShowNavigationButton} x */
	DC_EngagementPanelHeaderShowNavigationButton(x) {
		const cf="DC_EngagementPanelHeaderShowNavigationButton";
		const {targetId,navigationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @private @arg {C_AddToPlaylist} x */
	C_AddToPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_AddToPlaylist","addToPlaylistCommand",x); this.g(y); this.DC_AddToPlaylist(a);}
	/** @private @arg {C_ChangeMarkersVisibility} x */
	C_ChangeMarkersVisibility(x) {let [a,b]=this.TE_Endpoint_2("C_ChangeMarkersVisibility","changeMarkersVisibilityCommand",x); this.g(b); this.DC_ChangeMarkersVisibility(a);}
	/** @type {string[]} */
	DC_AddToPlaylist_listTypes=[
		"PLAYLIST_EDIT_LIST_TYPE_QUEUE",
	];
	/** @private @arg {DC_AddToPlaylist} x */
	DC_AddToPlaylist(x) {
		const cf="DC_AddToPlaylist";
		this.save_string(`${cf}.listType`,x.listType);
		if(!this.DC_AddToPlaylist_listTypes.includes(x.listType)) {
			let known=this.DC_AddToPlaylist_listTypes;
			this.DC_AddToPlaylist_listTypes.push(x.listType);
			this.codegen_typedef_all(cf,x);
			console.log(`-- [case_gen_list:${cf}.listType] --`,JSON.stringify(this.DC_AddToPlaylist_listTypes,null,"\t"));
			console.log(`-- [js_gen:case_gen_${cf}] --\n\n${known.map(e => `			case ${e}:`).join("\n")}`);
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
	/** @private @arg {DC_ChangeMarkersVisibility} x */
	DC_ChangeMarkersVisibility(x) {
		const cf="DC_ChangeMarkersVisibility";
		const {isVisible,entityKeys,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(isVisible);
		this.z(entityKeys,x => {
			this.params(`${cf}.entity_key`,"change_markers_visibility.entity_key",x);
		});
	}
	/** @protected @arg {E_CreatePlaylistService} x */
	E_CreatePlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreatePlaylistService","createPlaylistServiceEndpoint",x); this.g(y); this.DS_CreatePlaylist(b); this.M_CreatePlaylist(a);}
	/** @private @arg {DS_CreatePlaylist} x */
	DS_CreatePlaylist(x) {
		const cf="DS_CreatePlaylist"; this.k(cf,x);
		const {params,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(params,x => this.params(cf,"service$create_playlist",x));
		this.z(videoIds,this.videoId);
	}
	/** @private @arg {GM_CreatePlaylist} x */
	GM_CreatePlaylist(x) {this.T_GM("GM_CreatePlaylist",x,x => this.ceq(x,"/youtubei/v1/playlist/create"));}
	/** @protected @arg {E_PerformCommentAction} x */
	E_PerformCommentAction(x) {x; debugger;}
}
export_(exports => {exports.ServiceMethods=ServiceMethods;});
