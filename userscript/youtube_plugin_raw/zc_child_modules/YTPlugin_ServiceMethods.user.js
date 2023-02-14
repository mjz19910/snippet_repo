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
const split_string=bs.split_string;
const split_string_once=bs.split_string_once;
/** @extends {ServiceData<LoadAllServices,ServiceOptions>} */
class ServiceMethods extends ServiceData {
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
	/** @private @arg {E_Like} x */
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
	/** @private @arg {R_LikeButton} x */
	R_LikeButton(x) {this.H_("R_LikeButton","likeButtonRenderer",x,this.D_LikeButton);}
	/** @protected @arg {R_Hint} x */
	R_Hint(x) {this.H_("R_Hint","hintRenderer",x,this.D_Hint);}
	/** @private @arg {R_ReelPlayerOverlay} x */
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
	/** @private @arg {E_Unsubscribe} x */
	E_Unsubscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Unsubscribe","unsubscribeEndpoint",x); this.g(y); this.DE_Unsubscribe(b); this.M_Unsubscribe(a);}
	/** @private @arg {E_CreateComment} x */
	E_CreateComment(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreateComment","createCommentEndpoint",x); this.g(y); this.DE_CreateComment(b); this.M_CreateComment(a);}
	/** @private @arg {E_ShareEntityService} x */
	E_ShareEntityService(x) {const [a,b,y]=this.TE_Endpoint_3("E_ShareEntityService","shareEntityServiceEndpoint",x); this.g(y); this.M_GetSharePanel(a); this.DE_ShareEntityService(b);}
	/** @protected @arg {C_GetPdgBuyFlow} x */
	C_GetPdgBuyFlow(x) {let [a,b,y]=this.TE_Endpoint_3("C_GetPdgBuyFlow","getPdgBuyFlowCommand",x); this.g(y); this.M_GetPdgBuyFlow(a); this.DC_GetPdgBuyFlow(b);}
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
	/** @private @arg {R_MenuFlexibleItem} x */
	R_MenuFlexibleItem(x) {this.H_("R_MenuFlexibleItem","menuFlexibleItemRenderer",x,this.D_MenuFlexibleItem);}
	/** @private @arg {DT_MenuFlexibleItem} x */
	D_MenuFlexibleItem(x) {
		const cf="D_MenuFlexibleItem"; this.k(cf,x);
		const {menuItem,topLevelButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_MenuServiceItem(menuItem);
		this.R_Button(topLevelButton);
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
	/** @private @arg {Extract<G_UrlInfoItem,{type:`playlist:${string}`}>} x */
	log_playlist_id(x,critical=false) {
		if(!this.cache_playlist_id.includes(x.id)) {
			this.cache_playlist_id.push(x.id);
			if(this.log_enabled_playlist_id||critical) console.log("[playlist]",x.type,x.id);
		}
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
	/** @typedef {string|bigint|number|V_ParamObj} V_ParamObjData */
	/** @typedef {{[x:number]:V_ParamObjData|V_ParamObjData[]}} V_ParamObj */
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
			if(value.length===0) {
				res[k]={};
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
				v1[k]=v1;
				continue;
			}
			let v2=first(value);
			if(v2===null) {debugger; continue;}
			let v3=this.convert_value_item_to_param_item(v2);
			if(v3===null) {debugger; continue;}
			res[k]=v3;
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
		this.V_SerializedContext_BinaryObj(cf,as(r_obj));
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
	/** @private @arg {E_VE3611} x */
	E_VE3611(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE3611","browseEndpoint",x); this.g(y); this.M_VE3611(a); this.DE_VE3611(b);}
	/** @private @arg {E_VE3854} x */
	E_VE3854(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE3854(a); this.DE_VE3854(b);}
	/** @protected @arg {E_VE4724_Search} x */
	E_VE4724_Search(x) {const [a,b,y]=this.TE_Endpoint_3("E_VE4724_Search","searchEndpoint",x); this.g(y); this.M_VE4724(a); this.DE_VE4724_Search(b);}
	/** @private @arg {E_VE5754} x */
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
	/** @private @arg {Extract<G_UrlInfoItem,{type:`playlist:${string}`}>} x */
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
	/** @public @arg {G_UrlInfoItem} value */
	G_UrlInfoItem(value) {
		switch(value.type) {
			default: value===""; debugger; break;
			case "channel_id:UC": this.D_ChannelId(value.id); break;
			case "play-next": value; break;
			case "browse_id:VL": {
				const {type,id,raw_id}=value;
				this.indexed_db_put("browse_id",{key: `browse_id:VL:${id}`,type,id,raw_id});
			} break;
			case "playlist:2:RDCM": {
				this.put_boxed_id(value);
				if(!this.str_starts_with_rx("UC",value.raw_id)) debugger;
				this.D_ChannelId(value.raw_id);
			} break;
			case "playlist:1:LL": case "playlist:1:WL":
			case "playlist:2:RDMM": case "playlist:2:RD": case "playlist:4:UU":
			case "playlist:3:PL": {
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
	/** @public @arg {D_GuideEntryData['guideEntryId']|GU_PlaylistId} id */
	parse_guide_entry_id(id) {
		if(this.str_starts_with_rx("RD",id)) {
			if(this.str_starts_with_rx("RDCMUC",id)) {
				let [,raw_id]=split_string_once(id,"RDCM");
				this.save_next_char("playlist_id.RDCMUC",split_string_once(id,"RDCMUC")[1]);
				this.G_UrlInfoItem({type: "playlist:2:RDCM",id,raw_id});
				return console.log("[guideEntryId.playlist.RDCM.length]",id.length);
			}
			if(this.str_starts_with_rx("RDMM",id)) {
				let [,raw_id]=split_string_once(id,"RDMM");
				this.G_UrlInfoItem({type: "playlist:2:RDMM",id,raw_id,});
				return console.log("[guideEntryId.radio_my_mix.length]",id.length);
			}
			let [,raw_id]=split_string_once(id,"RD");
			this.G_UrlInfoItem({type: "playlist:2:RD",id,raw_id,});
			return console.log("[guideEntryId.radio.length]",id.length);
		}
		if(this.str_starts_with_rx("UC",id)) {
			let [,raw_id]=split_string_once(id,"UC");
			this.G_UrlInfoItem({type: "channel_id:UC",id,raw_id});
			if(id.length===24) return;
			return console.log("[guideEntryId.channel.length]",id.length);
		}
		if(this.str_starts_with_rx("PL",id)) {
			let [,raw_id]=split_string_once(id,"PL");
			this.G_UrlInfoItem({type: "playlist:3:PL",id,raw_id});
			if(id.length===34) return;
			return console.log("[guideEntryId.playlist.length]",id.length);
		}
		if(this.str_starts_with_rx("UU",id)) {
			let [,raw_id]=split_string_once(id,"UU");
			this.G_UrlInfoItem({type: "playlist:4:UU",id,raw_id});
			if(id.length===26) return;
			return console.log("[guideEntryId.uploads_playlist.length]",id.length);
		}
		switch(id) {
			default: id===""; console.log("new with param [Browse_param_2c_VL]",id); debugger; break;
			case "LL": this.G_UrlInfoItem({type: "playlist:1:LL",id: id}); break;
			case "WL": this.G_UrlInfoItem({type: "playlist:1:WL",id: id}); break;
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
					this.indexed_db_put("hashtag",{key: `hashtag:${ht}`,hashtag: ht});
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
	/** @private @arg {D_Label} x */
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
	/** @private @arg {D_ThumbnailItem} x */
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
	/** @private @arg {string} cf1 @arg {D_LightColorPalette} x */
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
	/** @private @arg {string} cf1 @arg {D_DarkColorPalette} x */
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
			let ak_gen=[""].concat(map_keys.map(x => `\t\"[parse_value.gen_ns] [${path}.f${x}]\",`));
			console.log(ak_gen.join("\n"));
			console.log(`\n\tcase "${path}": switch(map_entry_key) {\n\t\t${map_keys.map(e => `case ${e}:`).join(" ")}\n\t\t\treturn this.parse_param_next(root,\`\${path}.f\${map_entry_key}\`,map_entry_key_path,map_entry_values,callback);\n\t\tdefault: new_ns(); debugger; return;\n\t}\n`);
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
	/** @protected @arg {number[]} map_entry_key_path @arg {T_ParseCallbackFunction<T>} callback @template {CF_L_Params} T @arg {T} root @arg {P_ParamParse} path @arg {V_ParamMapValue[]} tva */
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
}
export_(exports => {exports.ServiceMethods=ServiceMethods;});
