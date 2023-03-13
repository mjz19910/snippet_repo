// ==UserScript==
// @name	YTPlugin ServiceMethods
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ServiceMethods.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_ServiceMethods.user.js
// ==/UserScript==

const {ServiceData,do_export,split_string_once,split_string,as,base64_url_dec,as_any,base64_dec,JsonReplacerState}=require("./YtPlugin_Base.user");

const __module_name__="mod$ServiceMethods";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
export_(exports => {exports.__is_module_flag__=true;});
class ServiceMethods extends ServiceData {
	/** @public @template U @template {{}} T @arg {T|null|undefined|void} x @arg {(this:ServiceMethods,x:T)=>U} f */
	t(x,f) {return this.t_base(x,f);}
	/** @arg {T|undefined} _l @template {string} T @arg {NoInfer<T>} x @returns {(y: NoInfer<T>)=>void} */
	wg(_l,x) {return y => this._cq_infer(x,y);}
	/** @arg {D_ReelPlayerOverlay["reelPlayerNavigationModel"]} t_input_0 */
	test_wg(t_input_0) {
		// @ts-expect-error(2345)
		{const x2=t_input_0; this.t(x2,this.wg(x2,"xREEL_PLAYER_NAVIGATION_MODEL_UNSPECIFIED"));}
	}
	/** @public @arg {string} x @arg {{prev:true}|{cur:true}} is_prev */
	D_VeCsn(x,is_prev={cur: true}) {
		try {
			let csn_dec=atob(x);
			if("prev" in is_prev) {
				console.log("[csn_dec] [old]",csn_dec);
			} else {
				console.log("[csn_dec] [new]",csn_dec);
			}
		} catch(e) {
			console.log("[D_VeCsn_err]",is_prev,e);
			console.log("-- [data] --",x);
		}
	}
	/** @private @arg {string} cf @arg {object} x1 */
	get_codegen_name(cf,x1) {return this.cg.get_codegen_name_obj(cf,x1);}
	/** @public @arg {string} cf @arg {{}} x */
	GEN(cf,x) {
		let name=this.get_codegen_name(cf,x);
		if(!name) return;
		this.#_GEN(`${cf}$${name}`,x);
	}
	/** @arg {`${string}$${string}`} cf @arg {{}} x */
	#_GEN(cf,x) {
		this.cg.codegen_typedef(cf,x,false);
		this.cg.codegen_renderer(cf,x);
		debugger;
	}
	/** @private @template {D_Microformat} U @arg {U} x */
	unwrap_microformat(x) {
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
	/** @public @arg {CF_T_Items_TP} cf @template T @arg {T_TrackedItems<T>} x */
	T_Items_TP(cf,x) {
		const {trackingParams,...y}=this.s(cf,x);/*#destructure_off*/
		this.trackingParams(trackingParams);
		return this.w(cf,"items",y);
	}
	/** @public @template T @arg {TR_MultiPageMenuSection<T>} x */
	TR_MP_MenuSection(x) {return this.wn("TR_MP_MenuSection",x,"multiPageMenuSectionRenderer");}
	/** @arg {D_CustomEmoji['shortcuts'][number]} x */
	parse_emoji_shortcut(x) {
		let fs=split_string_once(x,":");
		let [ls,w]=split_string_once(fs[1],":"); if(w!=="") debugger;
		return ls;
	}
	/** @private @template {{}} T @arg {CF_M_rl} cf @arg {T} x */
	rl(cf,x) {this.k(`${cf}:omit`,x); return x;}
	/** @arg {D_CustomEmoji['emojiId']} x */
	parse_emoji_id(x) {return split_string_once(x,"/");}
	/** @public @template {string} SW @arg {SW} sw @arg {["",string]} x @returns {x is ["",`${SW}${string}`]} */
	str_starts_with_rx_in_arr(x,sw) {
		return this.str_starts_with(x[1],sw);
	}
	/** @public @template {string} T @arg {[T]} x @template {string} U @arg {U} needle @returns {x is [T extends `${infer B}${infer R}`?`${B}${T_Str_Some<R>}${string}${U}`:`${string}${U}`]} */
	str_ends_with_arr(x,needle) {return this.str_starts_with(x[0],needle);}
	/** @public @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x */
	TR_ItemSection_2(x) {return this.wn("TR_ItemSection_2",x,"itemSectionRenderer");}
	/** @public @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>boolean} f */
	dt(x,f) {if(!x) return; let g=f.call(this,x); if(g) debugger;}
	/** @template {CF_T_Commands} T_CF @arg {T_CF} cf @template {{}} T @arg {Record<"commands",T[]>} x @arg {(this:this,x:T)=>void} f */
	T_Commands(cf,x,f) {this.z(this.w(cf,"commands",x),f);}
	/** @private @template T,U @arg {T_Item<T>} x @arg {(this:this,x:T)=>U} f */
	T_Item=(x,f) => this.y("T_Item","item",x,f);
	/** @public @template T @arg {CF_T_OpenPopup_Dropdown} cf @arg {T_OpenPopup_Dropdown<T>} x */
	T_OpenPopup_Dropdown(cf,x) {
		const {popupType,popup,beReused,...y}=this.s(cf,x); this.g(y);
		if(popupType!=="DROPDOWN") return null;
		return popup;
	}
	/** @private @template {string} T @arg {T} x @returns {x is `${string}:${string}`} */
	str_is_uri(x) {return x.includes(":");}
	/** @public @arg {Extract<GU_VE83769_Url_External,`${string}://music.youtube.com${string}`>} x */
	handle_yt_music_url(x) {
		switch(x) {
			case "https://music.youtube.com/": break;
			default: debugger; break;
		}
	}
	/** @public @arg {GU_VE83769_Url_External} b */
	D_YtStudio_Url(b) {
		const cf="D_YtStudio_Url";
		if(!this.str_is_uri(b)) {debugger; return;}
		if(!this.str_starts_with(b,"https://studio.youtube.com")) {debugger; return;}
		let x=split_string(split_string_once(b,"//")[1],"/");
		if(x.length===1) return;
		switch(x.length) {
			case 2: {if(x[1]!=="") debugger;} break;
			case 4: {
				if(x[1]!=="channel") {debugger; return;}
				if(x[2]==="UC") {
					let [,,,v3]=x;
					switch(v3) {
						default: this.cg.codegen_case(cf,v3); break;
						case "livestreaming": break;
					}
					return;
				}
				let [,,v2,v3]=x;
				if(!this.str_starts_with_rx("UC",v2)) {debugger; return;}
				switch(v3) {
					default: this.cg.codegen_case(cf,v3); break;
					case "videos": break;
				}
			} break;
		}
	}
	/** @public @arg {GU_YoutubeKidsUrl_1} x */
	D_YoutubeKidsUrl(x) {
		const cf="D_YoutubeKidsUrl";
		if(x==="https://www.youtubekids.com?source=youtube_web") return;
		if(x==="https://www.youtubekids.com/?source=youtube_web") return;
		this.cg.codegen_str(cf,x);
	}
	/** @private @arg {D_ToggleMenuServiceItem} x */
	D_ToggleMenuServiceItem(x) {
		const cf="D_ToggleMenuServiceItem";
		const {defaultText,defaultIcon,defaultServiceEndpoint,toggledText,toggledIcon,toggledServiceEndpoint,trackingParams,isToggled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(defaultText);
		if(defaultIcon.iconType!=="LIBRARY_ADD") debugger;
		this.E_Like(defaultServiceEndpoint);
		this.G_Text(toggledText);
		if(toggledIcon.iconType!=="LIBRARY_REMOVE") debugger;
		this.E_Like(toggledServiceEndpoint);
		this.trackingParams(trackingParams);
		this.a_primitive_bool(isToggled);
	}
	/** @private @arg {DE_PlaylistEdit} x */
	DE_PlaylistEdit(x) {
		const cf="D_PlaylistEdit";
		const {playlistId,params,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(playlistId,this.playlistId);
		this.t(params,x => this.params("playlist_edit.params",x));
		this.z(actions,x => {
			switch(x.action) {
				case "ACTION_ADD_VIDEO": {
					const cf="A_AddVideo";
					const {action: {},addedVideoId,...y}=this.s(cf,x); this.g(y);
					this.t(addedVideoId,this.videoId);
				} break;
				case "ACTION_REMOVE_VIDEO_BY_VIDEO_ID": {
					const cf="A_RemoveVideoByVideoId";
					const {action: {},removedVideoId,...y}=this.s(cf,x); this.g(y);
					this.videoId(removedVideoId);
				} break;
				case "ACTION_COPY_FROM_PLAYLIST": {
					const cf="A_CopyFromPlaylist";
					const {action: {},sourcePlaylistId,...y}=this.s(cf,x); this.g(y);
					this.playlistId(sourcePlaylistId);
				} break;
				case "ACTION_SET_PLAYLIST_VIDEO_ORDER": {
					const cf="AS_PlaylistVideoOrder";
					const {action: {},...y}=this.s(cf,x); this.g(y);
				} break;
				case "ACTION_SET_PLAYLIST_PRIVACY": {
					const cf="AS_PlaylistPrivacy";
					const {action: {},playlistPrivacy,...y}=this.s(cf,x); this.g(y);
					this.t(playlistPrivacy,x => this.save_primitive(`${cf}.playlistPrivacy`,x));
				} break;
				case "ACTION_SET_PLAYLIST_DESCRIPTION": {
					const cf="AS_PlaylistDescription";
					const {action: {},playlistDescription,...y}=this.s(cf,x); this.g(y);
					this.t(playlistDescription,this.a_primitive_str);
				} break;
				case "ACTION_SET_PLAYLIST_NAME": {
					const cf="AS_PlaylistName";
					const {action: {},playlistName,...y}=this.s(cf,x); this.g(y);
					this.t(playlistName,this.a_primitive_str);
				} break;
				default: debugger; break;
			}
		});
	}
	/** @public @arg {DE_AddToPlaylistService} x */
	DE_AddToPlaylistService(x) {
		const cf="DE_AddToPlaylistService";
		const {videoId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.videoId(videoId);
	}
	/** @arg {GU_VE83769_Url_External} x */
	GU_VE83769_Url_External(x) {
		let x1=this._convert_url_to_obj(x);
		if(x1.hostname!=="googleads.g.doubleclick.net") debugger;
		if(x1.pathname!=="/aclk") debugger;
		let s_map=Object.fromEntries(x1.searchParams.entries());
		{
			/** @type {DE_VE83769_Url_Shape} */
			let x2=as(s_map);
			const {sa,ai,ae,num,cid,sig,client,rf,adurl,...y}=x2; this.g(y);
			let u1=this._convert_url_to_obj(adurl);
			if(u1.hostname!=="plantagreenhouses.ca") debugger;
			if(u1.pathname!=="/") debugger;
			/** @type {DE_VE83769_Url_SearchObj} */
			let x3=as(Object.fromEntries(u1.searchParams.entries()));
			const {gclid,...y1}=x3; this.g(y1);
		}
	}
	/** @arg {(DE_U_InternalUrl|DE_U_ChannelUrl)["url"]} x */
	GU_VE83769_Url_1(x) {
		x: {
			/** @type {DE_U_InternalUrl["url"]} */
			let va=as(x);
			let [p,r]=split_string_once(va,"://"); this.cq(p,"https");
			let [h,u]=split_string_once(r,"/"); this.cq(h,"www.youtube.com");
			switch(u) {
				default: {
					let [x1,x2,x3]=split_string(u,"/"); this.cq(x1,"channel"); this.channelId(x2);
					this.cq(x3,"join");
				} break x;
				case "t/creative_commons": return;
			}
		}
		/** @type {["",typeof x]} */
		let xa=["",x];
		if(this.str_starts_with_rx_in_arr(xa,"https://www.youtube.com/channel/UC")&&this.str_ends_with(xa[1],"/join")) {
			let [,...xu]=xa;
			if(this.str_ends_with_arr(xu,"/join")) {
				xu;
			}
			return;
		}
		x;
		if(this.str_starts_with(x,"https://www.youtube.com/channel/UC")) {
			let r=this._convert_url_to_obj(x);
			r.pathname;
			return;
		}
		x;
		{
			/** @type {DE_U_ChannelUrl["url"]} */
			let va=x;
			let [p,r]=split_string_once(va,"://"); this.cq(p,"https");
			let [h,u]=split_string_once(r,"/"); this.cq(h,"www.youtube.com");
			let v=split_string_once(u,"/");
			if(v.length!==1) debugger;
		}
	}
	/** @public @arg {E_PlaylistEdit} x */
	E_PlaylistEdit(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","playlistEditEndpoint",x); this.g(y); this.M_EditPlaylist(a); this.DE_PlaylistEdit(b);}
	/** @public @arg {E_PlaylistDelete} x */
	E_PlaylistDelete(x) {const [y]=this.TE_Endpoint_3_v2("deletePlaylistEndpoint",x,this.M_PlaylistDelete,this.DE_PlaylistDelete); this.g(y);}
	/** @public @arg {E_AddUpcomingEventReminder} x */
	E_AddUpcomingEventReminder(x) {const [y]=this.TE_Endpoint_3_v2("addUpcomingEventReminderEndpoint",x,this.M_AddUpcomingEventReminder,this.DE_AddUpcomingEventReminder); this.g(y);}
	/** @private @arg {DC_Params} x */
	DE_AddUpcomingEventReminder(x) {this.D_Params("DE_AddUpcomingEventReminder","notification_add_upcoming_event_reminder.params",x);}
	/** @public @arg {E_RemoveUpcomingEventReminder} x */
	E_RemoveUpcomingEventReminder(x) {const [y]=this.TE_Endpoint_3_v2("removeUpcomingEventReminderEndpoint",x,this.M_RemoveUpcomingEventReminder,this.DE_RemoveUpcomingEventReminder); this.g(y);}
	/** @private @arg {DC_Params} x */
	DE_RemoveUpcomingEventReminder(x) {this.D_Params("DE_RemoveUpcomingEventReminder","notification_remove_upcoming_event_reminder.params",x);}
	/** @public @arg {DE_PlaylistDelete} x */
	DE_PlaylistDelete(x) {x;}
	/** @public @arg {E_RecordNotificationInteractions} x */
	E_RecordNotificationInteractions(x) {const [a,b,y]=this.TE_Endpoint_3("E_RecordNotificationInteractions","recordNotificationInteractionsEndpoint",x); this.g(y); this.M_RecordInteractions(a); this.DE_RecordNotificationInteractions(b);}
	/** @public @arg {E_CreatePlaylistService} x */
	E_CreatePlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreatePlaylistService","createPlaylistServiceEndpoint",x); this.g(y); this.DS_CreatePlaylist(b); this.M_CreatePlaylist(a);}
	/** @private @arg {E_NotificationOptOut} x */
	E_NotificationOptOut(x) {const cf="E_NotificationOptOut",[a,b,y]=this.TE_Endpoint_3(cf,"notificationOptOutEndpoint",x); this.g(y); this.DE_NotificationOptOut(b); this.M_NotificationOptOut(a);}
	/** @public @arg {E_UserFeedback} x */
	E_UserFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_UserFeedback","userFeedbackEndpoint",x); this.g(y); this.DE_UserFeedback(b); this.M_UserFeedback(a);}
	/** @private @arg {E_GetReportForm} x */
	E_GetReportForm(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetReportForm","getReportFormEndpoint",x); this.g(y); this.M_FlagGetForm(a); this.DE_GetReportForm(b);}
	/** @private @arg {E_UndoFeedback} x */
	E_UndoFeedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_UndoFeedback","undoFeedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_UndoFeedback(b);}
	/** @public @arg {E_YpcGetOfflineUpsell} x */
	E_YpcGetOfflineUpsell(x) {const [a,y]=this.TE_Endpoint_2("E_YpcGetOfflineUpsell","ypcGetOfflineUpsellEndpoint",x); this.g(y); this.DE_YpcGetOfflineUpsell(a);}
	/** @private @arg {E_GetNotificationMenu} x */
	E_GetNotificationMenu(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetNotificationMenu","getNotificationMenuEndpoint",x); this.g(y); this.M_GetNotificationMenu(a); this.DE_GetNotificationMenu(b);}
	/** @private @arg {E_GetTranscript} x */
	E_GetTranscript(x) {const [a,b,y]=this.TE_Endpoint_3("E_GetTranscript","getTranscriptEndpoint",x); this.g(y); this.M_GetTranscript(a); this.DE_GetTranscript(b);}
	/** @public @arg {E_PlaylistEditor} x */
	E_PlaylistEditor(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEditor","playlistEditorEndpoint",x); this.g(y); this.M_GetSettingsEditor(a); this.DE_PlaylistEditor(b);}
	/** @private @arg {DE_UndoFeedback} x */
	DE_UndoFeedback(x) {
		const cf="DE_UndoFeedback";
		const {undoToken,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_undo_token(undoToken);
		this.z(actions,this.A_UndoFeedback);
	}
	/** @public @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {const [a,b,y]=this.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.DE_YpcGetCart(b);}
	/** @private @arg {DE_YpcGetCart} x */
	DE_YpcGetCart(x) {this.sm.TD_Params("DE_YpcGetCart","ypc_get_cart.transaction_params","transactionParams",x);}
	/** @public @arg {E_ApplicationSettings} x */
	E_ApplicationSettings(x) {const [y]=this.TE_Endpoint_3_v2("applicationSettingsEndpoint",x,this.M_ApplicationSettings,this.B_Hack); this.g(y);}
	/** @public @arg {E_SubmitFeedback} x */
	E_SubmitFeedback(x) {const [y]=this.TE_Endpoint_3_v2("signalServiceEndpoint",x,this.M_Feedback,this.DE_SubmitFeedback); this.g(y);}
	/** @private @arg {DE_SubmitFeedback} x */
	DE_SubmitFeedback(x) {this.sm.cq(this.sm.T_Signal("DE_SubmitFeedback",x),"SUBMIT_FEEDBACK");}
	/** @private @arg {E_UpdatedMetadata} x */
	E_UpdatedMetadata(x) {const [y]=this.TE_Endpoint_3_v2("updatedMetadataEndpoint",x,this.M_UpdatedMetadata,this.D_VideoId); this.g(y);}
	/** @public @arg {E_PerformCommentAction} x */
	E_PerformCommentAction(x) {this.TE_Endpoint_3_v2("performCommentActionEndpoint",x,this.M_PerformCommentAction,this.DE_PerformCommentAction);}
	/** @private @arg {DE_PerformCommentAction} x */
	DE_PerformCommentAction(x) {
		const cf="DE_PerformCommentAction";
		const {action,clientActions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.params("perform_comment.action",action);
		this.z(clientActions,this.A_UpdateCommentVote);
	}
	/** @public @arg {E_CreateCommentReplyDialog} x */
	E_CreateCommentReplyDialog(x) {this.TE_Endpoint_3_v2("createCommentReplyDialogEndpoint",x,this.M_CreateCommentReplyDialog,this.DE_CreateCommentReplyDialog);}
	/** @private @arg {D_IgnoreNavigation} x */
	D_IgnoreNavigation(x) {this.y("D_IgnoreNavigation","ignoreNavigation",x,x => this.cq(x,true));}
	/** @public @arg {E_CreateCommentReply} x */
	E_CreateCommentReply(x) {this.TE_Endpoint_3_v2("createCommentReplyEndpoint",x,this.M_CreateCommentReply,this.DE_CreateCommentReply);}
	/** @private @arg {DE_CreateCommentReply} x */
	DE_CreateCommentReply(x) {this.y("DE_CreateCommentReply","createReplyParams",x,x => this.sm.params("create_reply.params",x));}
	/** @private @arg {DE_CreateCommentReplyDialog} x */
	DE_CreateCommentReplyDialog(x) {
		const cf="DE_CreateCommentReplyDialog";
		const {dialog,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_CommentReplyDialog(dialog);
	}
	/** @public @arg {E_AddToPlaylistService} x */
	E_AddToPlaylistService(x) {const [a,b,y]=this.TE_Endpoint_3("E_AddToPlaylistService","addToPlaylistServiceEndpoint",x); this.g(y); this.M_AddToPlaylistService(a); this.DE_AddToPlaylistService(b);}
	/** @public @arg {E_Feedback} x */
	E_Feedback(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEdit","feedbackEndpoint",x); this.g(y); this.M_Feedback(a); this.DE_Feedback(b);}
	/** @public @arg {E_Search} x */
	E_Search(x) {const [a,b,y]=this.TE_Endpoint_3("E_Search","searchEndpoint",x); this.g(y); this.M_Search(a); this.DE_Search(b);}
	/** @private @arg {DE_Search} x */
	DE_Search(x) {
		const cf="DE_Search";
		const {query,params,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(query);
		this.t(params,x => this.params("search.params",x));
	}
	/** @type {string[]} */
	de_browse_ids=[];
	/** @public @arg {E_VE3611} x */
	E_VE3611(x) {
		if(!this.is_TE_VE(x,3611)) {debugger; return;}
		let [a,b,y]=this.TE_Endpoint_3("E_VE3611","browseEndpoint",x); this.g(y); this.M_VE3611(a); this.DE_VE3611(b);
	}
	/** @public @arg {DE_VE3611} x */
	DE_VE3611(x) {
		const cf="DE_VE3611";
		const {params,browseId,canonicalBaseUrl,query,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(params,x => this.params("ve_3611.params",x));
		this.channelId(browseId);
		this.t(canonicalBaseUrl,x => {
			let sp=split_string_once(x,"/"); this.cq(sp.length,2);
			let [e1,sr]=sp; this.cq(e1,"");
			let s2=split_string_once(sr,"/");
			if(s2.length===1) {
				let [p]=s2;
				let s3=split_string_once(p,"@"); this.cq(s3[0],"");
				this.cq(s3.length,2);
				return;
			}
			switch(s2[0]) {
				default: debugger; return;
				case "channel":
			}
			let [,v3]=s2;
			this.channelId(v3);
		});
		this.t(query,x => this.save_primitive(`${cf}.query`,x));
	}
	/** @public @arg {E_VE3854} x */
	E_VE3854(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE3854(a); this.DE_VE3854(b);}
	/** @public @arg {DE_VE3854} x */
	DE_VE3854(x) {
		const cf="DE_VE3854";
		const {browseId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(browseId!=="FEwhat_to_watch") debugger;
	}
	/** @public @arg {E_VE5754} x */
	E_VE5754(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE5754","browseEndpoint",x); this.g(y); this.M_VE5754(a); this.DE_VE5754(b);}
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
	/** @public @arg {E_VE6827} x */
	E_VE6827(x) {
		let [a,b,{trackingParams,...y}]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE6827(a); this.DE_VE6827(b);
		this.t(trackingParams,this.trackingParams);
	}
	/** @public @arg {DE_VE6827} x */
	DE_VE6827(x) {
		const cf="DE_VE6827";
		const {browseId,params,query,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(browseId) {
			case "FEguide_builder": case "FEhashtag": case "FEhistory": case "FElibrary": case "FEsfv_audio_pivot":
			case "FEstorefront": case "FEtrending": case "SPreport_history":
		}
		this.t(params,x => this.params("ve_6827.params",x));
		this.t(query,x => this.save_primitive(`${cf}.query`,x));
	}
	/** @public @arg {E_VE11487} x */
	E_VE11487(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE11487","browseEndpoint",x); this.g(y); this.M_VE11487(a); this.DE_VE11487(b);}
	/** @public @arg {DE_VE11487} x */
	DE_VE11487(x) {
		const cf="DE_VE11487";
		const {browseId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.cq(browseId,"SPunlimited");
	}
	/** @public @arg {E_VE23462} x */
	E_VE23462(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE23462","browseEndpoint",x); this.g(y); this.M_VE23462(a); this.DE_VE23462(b);}
	/** @public @arg {DE_VE23462} x */
	DE_VE23462(x) {
		const cf="DE_VE23462";
		const {browseId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(browseId) {
			default: {
				if(this.de_browse_ids.includes(browseId)) break;
				this.de_browse_ids.push(browseId);
				console.log(`-- [${cf}.browseId] --\n\n${this.de_browse_ids.map(e => `case "${e}": `).join("")}`);
			} break;
			case "SPaccount_playback": case "SPaccount_privacy": case "SPaccount_sharing": case "SPaccount_billing": case "SPaccount_advanced":
			case "SPaccount_overview": case "SPaccount_notifications":
		}
	}
	/** @public @arg {E_VE42352} x */
	E_VE42352(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE42352","browseEndpoint",x); this.g(y); this.M_VE42352(a); this.DE_VE42352(b);}
	/** @public @arg {DE_VE42352} x */
	DE_VE42352(x) {
		const cf="DE_VE42352";
		const {browseId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.cq(browseId,"FEdownloads");
	}
	/** @public @arg {E_VE96368} x */
	E_VE96368(x) {let [a,b,y]=this.TE_Endpoint_3("E_VE96368","browseEndpoint",x); this.g(y); this.M_VE96368(a); this.DE_VE96368(b);}
	/** @public @arg {DE_VE96368} x */
	DE_VE96368(x) {
		const cf="DE_VE96368";
		const {browseId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.cq(browseId,"FEsubscriptions");
	}
	/** @arg {DU_UrlParams_PageadParallelAdInteraction} x */
	DU_UrlParams_PageadParallelAdInteraction(x) {
		const cf="DU_UrlParams";
		let {ai,sigh,cid,ad_mt,acvw,gv,nb,label,...y}=this.s(cf,x); this.g(y);
		this.save_primitive(`${cf}.label`,x.label);
	}
	/** @public @arg {E_WatchPlaylist} x */
	E_WatchPlaylist(x) {const [a,b,y]=this.TE_Endpoint_3("E_WatchPlaylist","watchPlaylistEndpoint",x); this.g(y); this.M_VE3832(a); this.DE_WatchPlaylist(b);}
	/** @private @arg {DE_WatchPlaylist} x */
	DE_WatchPlaylist(x) {
		const cf="DE_WatchPlaylist";
		const {playlistId,index,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.playlistId(playlistId);
		this.a_primitive_num(index);
		this.params("watch_playlist.params",params);
	}
	/** @public @arg {E_Watch} x */
	E_Watch(x) {
		const cf="E_Watch";
		const {clickTrackingParams: a,commandMetadata: b,watchEndpoint: c,...y}=this.s(cf,x); this.g(y);
		this.t(a,this.clickTrackingParams); this.M_VE3832(b); this.DE_VE3832_Watch(c);
	}
	/** @private @arg {DE_VE3832_Watch} u */
	DE_VE3832_Watch(u) {
		const cf="DE_VE3832_Watch";
		/** @type {Partial<Extract<typeof u extends infer J?J extends infer I?Required<Partial<I>>:never:never,{playlistId:any}>>&Required<{videoId:any}>} */
		let x=u;
		const {videoId,playlistId,index,playlistSetVideoId,params,startTimeSeconds,continuePlayback,loggingContext,watchEndpointSupportedOnesieConfig,watchEndpointSupportedPrefetchConfig,playerParams,watchEndpointMusicSupportedConfigs,nofollow,playerExtraUrlParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.videoId(videoId);
		this.t(playlistId,this.playlistId);
		this.t(index,this.a_primitive_num);
		this.t(playlistSetVideoId,this.a_primitive_str);
		this.t(params,params => this.params("watch.params",params));
		this.t(startTimeSeconds,this.a_primitive_num);
		this.t(continuePlayback,this.a_primitive_bool);
		this.t(loggingContext,x => this.x.get("x_VE").R_VssLoggingContext(x));
		this.t(watchEndpointSupportedOnesieConfig,this.R_Html5PlaybackOnesieConfig);
		this.t(watchEndpointSupportedPrefetchConfig,this.R_PrefetchHintConfig);
		this.t(playerParams,x => this.playerParams("watch.player_params",x));
		this.t(watchEndpointMusicSupportedConfigs,this.R_WatchEndpointMusicConfig);
		this.t(nofollow,this.a_primitive_bool);
		this.t(playerExtraUrlParams,([a,...b]) => this.eq(a.key,"inline")&&this.eq(b.length,0));
	}
	/** @public @arg {E_Like} x */
	E_Like(x) {const [a,b,y]=this.TE_Endpoint_3("E_Like","likeEndpoint",x); this.g(y); this.M_Like(a); this.DE_Like(b);}
	/** @private @arg {DE_Like} x */
	DE_Like(x) {
		const cf="DE_Like"; this.k(cf,x);
		switch(x.status) {
			default: {x===""; this.codegen_typedef(cf,x);} break;
			case "INDIFFERENT": {
				const cf="E_LikeIndifferent";
				const {status,target,removeLikeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				this.t(removeLikeParams,x => this.params("remove_like.params",x));
			} break;
			case "LIKE": {
				const cf="E_LikeLike";
				const {status,target,actions,likeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				actions;
				this.t(likeParams,x => this.params("like.params",x));
			} break;
			case "DISLIKE": {
				const cf="E_LikeDislike";
				const {status,target,dislikeParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				status;
				target;
				this.t(dislikeParams,x => this.params("dislike.params",x));
			} break;
		}
	}
	/** @public @arg {E_ShareEntityService} x */
	E_ShareEntityService(x) {const [a,b,y]=this.TE_Endpoint_3("E_ShareEntityService","shareEntityServiceEndpoint",x); this.g(y); this.M_GetSharePanel(a); this.DE_ShareEntityService(b);}
	/** @private @arg {DE_ShareEntityService} x */
	DE_ShareEntityService(x) {
		const cf="DE_ShareEntityService";
		const {serializedShareEntity: a,commands: b,...y}=this.s(cf,x); this.g(y);
		let [u1,y1]=this.z(b,x => this.xm.TA_OpenPopup(cf,x));
		this.z(y1,x => {if(x!==void 0) debugger;});
		this.z(u1,this.Popup_ShareEntityService);
	}
	/** @public @arg {C_GetPdgBuyFlow} x */
	C_GetPdgBuyFlow(x) {let [a,b,y]=this.TE_Endpoint_3("C_GetPdgBuyFlow","getPdgBuyFlowCommand",x); this.g(y); this.M_GetPdgBuyFlow(a); this.DC_GetPdgBuyFlow(b);}
	/** @private @arg {DC_GetPdgBuyFlow} x */
	DC_GetPdgBuyFlow(x) {
		const cf="DC_GetPdgBuyFlow";
		const {params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let dec_params=atob(params);
		this.params("get_pdg_buy_flow.params",dec_params);
	}
	/** @public @arg {C_CommandExecutor} x */
	C_CommandExecutor(x) {let [a,b]=this.TE_Endpoint_2("C_CommandExecutor","commandExecutorCommand",x); this.g(b); this.DC_CommandExecutor(a);}
	/** @private @arg {DC_CommandExecutor} x */
	DC_CommandExecutor(x) {this.T_Commands("DC_CommandExecutor",x,this.G_DC_CommandExecutor_CommandItem);}
	/** @private @arg {G_DC_CommandExecutor_CommandItem} x */
	G_DC_CommandExecutor_CommandItem(x) {
		const cf="G_DC_CommandExecutor_CommandItem";
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("scrollToEngagementPanelCommand" in x) return this.C_ScrollToEngagementPanel(x);
		if("openPopupAction" in x) return this.xm.TA_OpenPopup("TA_OpenPopup_Empty",x);
		if("hideEngagementPanelScrimAction" in x) return this.A_HideEngagementPanelScrim(x);
		if("loopCommand" in x) return this.C_Loop(x);
		if("updateToggleButtonStateCommand" in x) return this.C_UpdateToggleButtonState(x);
		if("changeMarkersVisibilityCommand" in x) return this.C_ChangeMarkersVisibility(x);
		if("engagementPanelHeaderShowNavigationButtonCommand" in x) return this.C_EngagementPanelHeaderShowNavigationButton(x);
		if("entityUpdateCommand" in x) return this.C_EntityUpdate(x);
		if("likeEndpoint" in x) return this.E_Like(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {C_GetSurvey} x */
	C_GetSurvey(x) {
		const cf="C_GetSurvey";
		const {clickTrackingParams,commandMetadata: b,getSurveyCommand: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(clickTrackingParams);
		this.A_GetSurvey(c);
		const {apiUrl,sendPost,...y1}=this.unpack_T_WCM("MG_Survey_CMD",b); this.g(y1);
		if(apiUrl!=="/youtubei/v1/get_survey") debugger;
		if(sendPost!==true) debugger;
	}
	/** @private @arg {M_VE3611} x */
	M_VE3611(x) {
		const cf="M_VE3611";
		const {webCommandMetadata: a,resolveUrlCommandMetadata: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		return this.GM_VE3611(a);
	}
	/** @public @arg {M_VE3832} x */
	M_VE3832(x) {this.T_WCM("M_VE3832",x,this.GM_VE3832);}
	/** @private @arg {M_VE3854} x */
	M_VE3854(x) {
		const cf="M_VE3854";
		const {webCommandMetadata: a,resolveUrlCommandMetadata: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GM_VE3854(a);
		this.t(b,this.M_ResolveUrlCommand);
	}
	/** @private @arg {M_VE5754} x */
	M_VE5754(x) {this.T_WCM("M_VE5754",x,this.GM_VE5754);}
	/** @private @arg {M_VE6827} x */
	M_VE6827(x) {this.T_WCM("M_VE6827",x,this.GM_VE6827);}
	/** @private @arg {M_VE11487} x */
	M_VE11487(x) {this.T_WCM("M_VE11487",x,this.GM_VE11487);}
	/** @private @arg {M_VE23462} x */
	M_VE23462(x) {this.T_WCM("M_VE23462",x,this.GM_VE23462);}
	/** @private @arg {M_VE42352} x */
	M_VE42352(x) {this.T_WCM("M_VE42352",x,this.GM_VE42352);}
	/** @private @arg {M_VE96368} x */
	M_VE96368(x) {return this.T_WCM("M_VE96368",x,this.GM_VE96368);}
	/** @private @arg {M_Search} x */
	M_Search(x) {this.T_WCM("M_Search",x,this.GM_Search);}
	/** @private @arg {M_GetPdgBuyFlow} x */
	M_GetPdgBuyFlow(x) {this.T_WCM("M_GetPdgBuyFlow",x,this.GM_GetPdgBuyFlow);}
	/** @private @arg {M_EditPlaylist} x */
	M_EditPlaylist(x) {this.T_WCM("M_EditPlaylist",x,this.GM_EditPlaylist);}
	/** @public @arg {M_SendPost} x */
	M_SendPost(x) {this.T_WCM("M_SendPost",x,this.GM_SendPost);}
	/** @private @arg {M_ResolveUrlCommand} x */
	M_ResolveUrlCommand(x) {
		const cf="M_ResolveUrlCommand";
		const {parentTrackingParams,isVanityUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(parentTrackingParams,x => this.trackingParams(x));
		this.t(isVanityUrl,x => this.cq(x,true));
	}
	/** @private @arg {M_NotificationOptOut} x */
	M_NotificationOptOut(x) {this.T_WCM("M_NotificationOptOut",x,this.GM_NotificationOptOut);}
	/** @private @arg {M_FlagGetForm} x */
	M_FlagGetForm(x) {this.T_WCM("M_FlagGetForm",x,this.GM_FlagGetForm);}
	/** @private @arg {M_UserFeedback} x */
	M_UserFeedback(x) {this.T_WCM("M_UserFeedback",x,this.GM_UserFeedback);}
	/** @public @arg {M_Feedback} x */
	M_Feedback(x) {this.T_WCM("M_Feedback",x,this.GM_Feedback);}
	/** @private @arg {M_CreatePlaylist} x */
	M_CreatePlaylist(x) {this.T_WCM("M_CreatePlaylist",x,this.GM_CreatePlaylist);}
	/** @private @arg {M_SetSetting} x */
	M_SetSetting(x) {this.T_WCM("M_SetSetting",x,this.GM_SetSetting);}
	/** @private @arg {M_GetTranscript} x */
	M_GetTranscript(x) {this.T_WCM("M_GetTranscript",x,this.GM_GetTranscript);}
	/** @private @arg {M_GetNotificationMenu} x */
	M_GetNotificationMenu(x) {this.T_WCM("M_GetNotificationMenu",x,this.GM_GetNotificationMenu);}
	/** @private @arg {M_AccountMenu} x */
	M_AccountMenu(x) {this.T_WCM("M_AccountMenu",x,this.GM_AccountMenu);}
	/** @private @arg {M_GetUnseenNotificationCount} x */
	M_GetUnseenNotificationCount(x) {this.T_WCM("M_GetUnseenNotificationCount",x,this.GM_GetUnseenNotificationCount);}
	/** @private @arg {M_GetSettingsEditor} x */
	M_GetSettingsEditor(x) {this.T_WCM("M_GetSettingsEditor",x,this.GM_GetSettingsEditor);}
	/** @public @arg {M_AddUpcomingEventReminder} x */
	M_AddUpcomingEventReminder(x) {this.T_WCM("M_AddUpcomingEventReminder",x,this.GM_AddUpcomingEventReminder);}
	/** @public @arg {M_RemoveUpcomingEventReminder} x */
	M_RemoveUpcomingEventReminder(x) {this.T_WCM("M_RemoveUpcomingEventReminder",x,this.GM_RemoveUpcomingEventReminder);}
	/** @public @arg {M_PlaylistDelete} x */
	M_PlaylistDelete(x) {this.T_WCM("M_PlaylistDelete",x,this.GM_PlaylistDelete);}
	/** @private @arg {M_RecordInteractions} x */
	M_RecordInteractions(x) {this.T_WCM("M_RecordInteractions",x,this.GM_RecordInteractions);}
	/** @private @arg {M_VE12924} x */
	M_ApplicationSettings(x) {this.T_WCM("M_VE12924",x,this.GM_VE12924);}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {M_UpdatedMetadata} x */
	M_UpdatedMetadata(x) {this.T_WCM("M_UpdatedMetadata",x,(x,cf) => this.T_GM(cf,x,x => this.cq(x,"/youtubei/v1/updated_metadata")));}
	/** @private @arg {M_PerformCommentAction} x */
	M_PerformCommentAction(x) {this.T_WCM("M_PerformCommentAction",x,this.GM_PerformCommentAction);}
	/** @private @arg {M_CreateCommentReplyDialog} x */
	M_CreateCommentReplyDialog(x) {this.T_WCM("M_CreateCommentReplyDialog",x,this.GM_CreateCommentReplyDialog);}
	/** @private @arg {M_CreateCommentReply} x */
	M_CreateCommentReply(x) {this.T_WCM("M_CreateCommentReply",x,this.GM_CreateCommentReply);}
	/** @public @arg {M_AddToPlaylistService} x */
	M_AddToPlaylistService(x) {this.T_WCM("M_AddToPlaylistService",x,this.GM_AddToPlaylistService);}
	/** @private @arg {M_Like} x */
	M_Like(x) {this.T_WCM("M_Like",x,this.GM_Like);}
	/** @private @arg {M_GetSharePanel} x */
	M_GetSharePanel(x) {this.T_WCM("M_GetSharePanel",x,this.GM_GetSharePanel);}
	/** @type {string[]} */
	gm_ve_urls=[];
	/** @private @arg {GM_VE3611} x @returns {`VE${rootVe}`} */
	GM_VE3611(x) {
		const cf="GM_VE3611";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE3611_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_CHANNEL") debugger;
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,3611);
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE3832} x */
	GM_VE3832(x) {
		const cf="GM_VE3832";
		const {url,rootVe,webPageType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(this.str_starts_with(url,"/playlist")) break x;
			if(this.str_starts_with(url,"/watch")) break x;
			debugger;
		}
		this.rootVe(rootVe);
		this.cq(rootVe,3832);
		if(webPageType!=="WEB_PAGE_TYPE_WATCH") debugger;
	}
	/** @private @arg {GM_VE3854} x @returns {`VE${rootVe}`} */
	GM_VE3854(x) {
		const cf="GM_VE3854";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		x: {
			if(url==="/") break x;
		}
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,3854);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_Search} x @returns {`VE${rootVe}`} */
	GM_Search(x) {
		const cf="GM_Search";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!this.str_starts_with_rx("/results?search_query=",url)) debugger;
		if(webPageType!=="WEB_PAGE_TYPE_SEARCH") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,4724);
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE5754} x @returns {`VE${rootVe}`} */
	GM_VE5754(x) {
		const cf="GM_VE5754";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE5754_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_PLAYLIST") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,5754);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE6827} x */
	GM_VE6827(x) {
		const cf="GM_VE6827";
		const {url,sendPost,webPageType,rootVe,apiUrl,...y}=this.s(cf,x);/*#destructure_done*/
		this.t(url,this.D_VE6827_Url);
		this.t(sendPost,x => this.cq(x,true));
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,6827);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		if("sendPost" in y) {
			const {sendPost,...y1}=y; this.g(y1);
			if(sendPost!==true) debugger;
			return;
		}
		this.g(y);
	}
	/** @private @arg {GM_VE11487} x @returns {`VE${rootVe}`} */
	GM_VE11487(x) {
		const cf="GM_VE11487";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/premium") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,11487);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE12924} x */
	GM_VE12924(x) {
		const cf="GM_VE12924";
		const {url,webPageType,rootVe,...y}=this.s(cf,x); this.g(y);
		this.sm.cq(url,"/select_site");
		this.sm.cq(webPageType,"WEB_PAGE_TYPE_SETTINGS");
		this.sm.rootVe(rootVe);
		this.cq(rootVe,12924);
	}
	/** @private @arg {GM_VE23462} x @returns {`VE${rootVe}`} */
	GM_VE23462(x) {
		const cf="GM_VE23462";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(url) {
			default: {
				if(this.gm_ve_urls.includes(url)) break;
				this.gm_ve_urls.push(url);
				console.log(`-- [${cf}] --\n\n${this.gm_ve_urls.map(e => `case "${e}":`).join("\n")}`);
			} break;
			case "/account_advanced":
			case "/account_billing":
			case "/account_notifications":
			case "/account_playback":
			case "/account_privacy":
			case "/account_sharing":
			case "/account":
		}
		if(webPageType!=="WEB_PAGE_TYPE_SETTINGS") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,23462);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE42352} x @returns {`VE${rootVe}`} */
	GM_VE42352(x) {
		const cf="GM_VE42352";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GU_VE42352_Url(url);
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,42352);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_VE96368} x @returns {`VE${rootVe}`} */
	GM_VE96368(x) {
		const cf="GM_VE96368";
		const {url,webPageType,rootVe,apiUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(url!=="/feed/subscriptions") debugger;
		if(webPageType!=="WEB_PAGE_TYPE_BROWSE") debugger;
		this.rootVe(rootVe);
		this.cq(rootVe,96368);
		if(apiUrl!=="/youtubei/v1/browse") debugger;
		return `VE${rootVe}`;
	}
	/** @private @arg {GM_Like} x */
	GM_Like(x) {
		const cf="GM_Like"; this.k(cf,x);
		switch(x.apiUrl) {
			default: {x===""; this.codegen_typedef(cf,x);} break;
			case "/youtubei/v1/like/removelike": return this.GM_RemoveLike(x);
			case "/youtubei/v1/like/dislike": return this.GM_Dislike(x);
			case "/youtubei/v1/like/like": return this.GM_LikeLike(x);
		}
	}
	/** @private @arg {GM_EditPlaylist} x */
	GM_EditPlaylist(x) {this.T_GM("GM_EditPlaylist",x,x => this.cq(x,"/youtubei/v1/browse/edit_playlist"));}
	/** @public @arg {GM_GetPdgBuyFlow} x */
	GM_GetPdgBuyFlow(x) {this.T_GM("GM_GetTranscript",x,x => this.cq(x,"/youtubei/v1/pdg/get_pdg_buy_flow"));}
	/** @public @arg {GM_AddToPlaylistService} x */
	GM_AddToPlaylistService(x) {this.T_GM("GM_AddToPlaylistService",x,x => this.cq(x,"/youtubei/v1/playlist/get_add_to_playlist"));}
	/** @private @arg {GM_RemoveLike} x */
	GM_RemoveLike(x) {this.T_GM("GM_RemoveLike",x,x => this.cq(x,"/youtubei/v1/like/removelike"));}
	/** @private @arg {GM_Dislike} x */
	GM_Dislike(x) {this.T_GM("GM_Dislike",x,x => this.cq(x,"/youtubei/v1/like/dislike"));}
	/** @private @arg {GM_LikeLike} x */
	GM_LikeLike(x) {this.T_GM("GM_LikeLike",x,x => this.cq(x,"/youtubei/v1/like/like"));}
	/** @private @arg {GM_RecordInteractions} x */
	GM_RecordInteractions(x) {this.T_GM("GM_RecordInteractions",x,x => this.cq(x,"/youtubei/v1/notification/record_interactions"));}
	/** @public @arg {GM_UserFeedback} x */
	GM_UserFeedback(x) {this.cq(this.w("GM_UserFeedback","ignoreNavigation",x),true);}
	/** @private @arg {GM_GetNotificationMenu} x */
	GM_GetNotificationMenu(x) {this.T_GM("GM_GetNotificationMenu",x,x => this.cq(x,"/youtubei/v1/notification/get_notification_menu"));}
	/** @private @arg {GM_AccountMenu} x */
	GM_AccountMenu(x) {this.T_GM("GM_AccountMenu",x,x => this.cq(x,"/youtubei/v1/account/account_menu"));}
	/** @private @arg {GM_GetUnseenNotificationCount} x */
	GM_GetUnseenNotificationCount(x) {this.T_GM("GM_GetUnseenNotificationCount",x,x => this.cq(x,"/youtubei/v1/notification/get_unseen_count"));}
	/** @private @arg {GM_NotificationOptOut} x */
	GM_NotificationOptOut(x) {this.T_GM("GM_NotificationOptOut",x,x => this.cq(x,"/youtubei/v1/notification/opt_out"));}
	/** @private @arg {GM_FlagGetForm} x */
	GM_FlagGetForm(x) {this.T_GM("GM_FlagGetForm",x,x => this.cq(x,"/youtubei/v1/flag/get_form"));}
	/** @private @arg {GM_Feedback} x */
	GM_Feedback(x) {this.T_GM("GM_Feedback",x,x => this.cq(x,"/youtubei/v1/feedback"));}
	/** @private @arg {GM_SendPost} x */
	GM_SendPost(x) {if(this.w("GM_SendPost","sendPost",x)!==true) debugger;}
	/** @private @arg {GM_CreatePlaylist} x */
	GM_CreatePlaylist(x) {this.T_GM("GM_CreatePlaylist",x,x => this.cq(x,"/youtubei/v1/playlist/create"));}
	/** @private @arg {GM_SetSetting} x */
	GM_SetSetting(x) {this.T_GM("GM_SetSetting",x,x => this.cq(x,"/youtubei/v1/account/set_setting"));}
	/** @private @arg {GM_GetTranscript} x */
	GM_GetTranscript(x) {this.T_GM("GM_GetTranscript",x,x => this.cq(x,"/youtubei/v1/get_transcript"));}
	/** @private @arg {GM_PlaylistDelete} x */
	GM_PlaylistDelete(x) {this.T_GM("GM_PlaylistDelete",x,x => this.cq(x,"/youtubei/v1/playlist/delete"));}
	/** @private @arg {GM_RemoveUpcomingEventReminder} x */
	GM_RemoveUpcomingEventReminder(x) {this.T_GM("GM_RemoveUpcomingEventReminder",x,x => this.cq(x,"/youtubei/v1/notification/remove_upcoming_event_reminder"));}
	/** @private @arg {GM_AddUpcomingEventReminder} x */
	GM_AddUpcomingEventReminder(x) {this.T_GM("GM_AddUpcomingEventReminder",x,x => this.cq(x,"/youtubei/v1/notification/add_upcoming_event_reminder"));}
	/** @private @arg {GM_GetSettingsEditor} x */
	GM_GetSettingsEditor(x) {this.T_GM("GM_GetSettingsEditor",x,x => this.cq(x,"/youtubei/v1/playlist/get_settings_editor"));}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {this.sm.T_GM("GM_YpcGetOffers",x,x => this.sm.cq(x,"/youtubei/v1/ypc/get_cart"));}
	/** @private @arg {GM_PerformCommentAction} x */
	GM_PerformCommentAction(x) {this.sm.T_GM("GM_PerformCommentAction",x,x => this.sm.cq(x,"/youtubei/v1/comment/perform_comment_action"));}
	/** @private @arg {GM_CreateCommentReplyDialog} x */
	GM_CreateCommentReplyDialog(x) {this.D_IgnoreNavigation(x);}
	/** @private @arg {GM_CreateCommentReply} x */
	GM_CreateCommentReply(x) {this.sm.T_GM("GM_CreateCommentReply",x,x => this.sm.cq(x,"/youtubei/v1/comment/create_comment_reply"));}
	/** @private @arg {GM_GetSharePanel} x */
	GM_GetSharePanel(x) {this.T_GM("GM_GetSharePanel",x,x => this.cq(x,"/youtubei/v1/share/get_share_panel"));}
	/** @private @arg {A_UpdateCommentVote} x */
	A_UpdateCommentVote(x) {let [a,y]=this.TE_Endpoint_2("A_UpdateCommentVote","updateCommentVoteAction",x); this.g(y); this.AD_UpdateCommentVote(a);}
	/** @private @arg {AD_UpdateCommentVote} x */
	AD_UpdateCommentVote(x) {
		const cf="AD_UpdateCommentVote";
		const {voteCount,voteStatus,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.sm.t(voteCount,this.sm.G_Text);
		this.save_primitive(`${cf}.voteStatus`,voteStatus);
		switch(voteStatus) {
			case "LIKE":
		}
	}
	/** @private @arg {D_EngagementPanelTargetId} x */
	D_EngagementPanelTargetId(x) {
		const cf="D_EngagementPanelTargetId";
		switch(x) {
			default: x===""; this.cg.codegen_case(`${cf}.targetId`,x); break;
			case "shopping_panel_for_entry_point_22": debugger; break;
			case "shopping_panel_for_entry_point_5":
			case "engagement-panel-clip-create":
			case "engagement-panel-clip-view":
			case "engagement-panel-comments-section":
			case "engagement-panel-error-corrections":
			case "engagement-panel-macro-markers-auto-chapters":
			case "engagement-panel-macro-markers-description-chapters":
			case "engagement-panel-searchable-transcript":
			case "engagement-panel-structured-description":
			case "engagement-panel-macro-markers-problem-walkthroughs":
		}
	}
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
	/** @private @arg {AD_ReplaceEnclosing_Item} x */
	AD_ReplaceEnclosing_Item(x) {
		const cf="AD_ReplaceEnclosing_Item"; this.k(cf,x);
		if("notificationTextRenderer" in x) return this.R_NotificationText(x);
		if("reelDismissalActionRenderer" in x) return this.RA_ReelDismissal(x);
		if("notificationMultiActionRenderer" in x) return this.ht.RA_NotificationMulti(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {A_HideEngagementPanelScrim} x */
	A_HideEngagementPanelScrim(x) {let [a,y]=this.TE_Endpoint_2("A_HideEngagementPanelScrim","hideEngagementPanelScrimAction",x); this.g(y); this.AD_HideEngagementPanelTargetId(a);}
	/** @private @arg {AD_HideEngagementPanelTargetId} x */
	AD_HideEngagementPanelTargetId(x) {this.y("AD_HideEngagementPanelTargetId","engagementPanelTargetId",x,x => {if(x!=="engagement-panel-clip-create") debugger;});}
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
		this.save_primitive(`${cf}.itemIndex`,itemIndex);
	}
	/** @public @arg {A_ShowEngagementPanelScrim} x */
	A_ShowEngagementPanelScrim(x) {let [a,y]=this.TE_Endpoint_2("A_ShowEngagementPanelScrim","showEngagementPanelScrimAction",x); this.g(y); this.AD_ShowEngagementPanelScrim(a);}
	/** @private @arg {AD_ShowEngagementPanelScrim} x */
	AD_ShowEngagementPanelScrim(x) {
		const cf="AD_ShowEngagementPanelScrim";
		const {engagementPanelTargetId,onClickCommands,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(engagementPanelTargetId!=="engagement-panel-clip-create") debugger;
		let [n]=this.z(onClickCommands,x => this.xm.TA_OpenPopup("A_ConfirmDialog",x));
		let [x1]=this.z(n,this.unpack_popup_dialog);
		let [x2]=this.z(x1,x => {
			if(!x[0]) {console.log("Missed popup type",x[1]); return null;}
			return x[1];
		});
		this.z(x2,this.R_ConfirmDialog);
	}
	/** @public @arg {A_AddToToast} x */
	A_AddToToast(x) {let [a,y]=this.TE_Endpoint_2("A_AddToToast","addToToastAction",x); this.g(y); this.AD_AddToToast(a);}
	/** @public @arg {AD_AddToToast} x */
	AD_AddToToast(x) {this.T_Item(x,this.R_NotificationText);}
	/** @public @arg {A_AppendContinuationItems} x */
	A_AppendContinuationItems(x) {let [a,y]=this.TE_Endpoint_2("A_AppendContinuationItems","appendContinuationItemsAction",x); this.g(y); this.AD_AppendContinuationItems(a);}
	/** @private @arg {AD_AppendContinuationItems} x */
	AD_AppendContinuationItems(x) {
		const cf="AD_AppendContinuationItems"; this.targetId(cf,x.targetId);
		if(this.is_yt_uuid_targetId(x)) {
			this.z(x.continuationItems,x => {
				if("richItemRenderer" in x) return this.R_RichItem(x);
				if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
				debugger;
			});
			return;
		}
		if(this.starts_with_targetId(x,"comment-replies-item-")) return this.GA_Continuation_CommentRepliesItem(x);
		if(this.starts_with_targetId(x,"browse-feed")) {
			if(this.starts_with_targetId(x,"browse-feedUC")) {
				const cp0=split_string(x.targetId,"browse-feed")[1];
				let cp=split_string(cp0,"channels");
				this.channelId(cp[0]);
				if(cp[1]!=="156") debugger;
				return;
			}
			switch(x.targetId) {
				case "browse-feedFEwhat_to_watch": {
					this.save_primitive("ContinuationItem.targetId",x.targetId); this.A_BrowseFeed(x);
				} break;
			}
			return;
		}
		switch(x.targetId) {
			case "comments-section": this.A_CommentsSectionContinuation(x); break;
			case "watch-next-feed": this.A_WatchNext(x); break;
			case "engagement-panel-comments-section": this.xr.A_CommentsSectionContinuation_2(x); break;
			default: x===0; debugger;
		}
	}
	/** @private @arg {A_GetSurvey} x */
	A_GetSurvey(x) {
		const cf="A_GetSurvey";
		const {action,endpoint: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if("paidDigitalGoods" in a) {debugger;}
		this.save_primitive("GetSurvey.action",action);
		switch(action) {
			default: debugger; break;
			case "SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL":
		}
		this.G_DC_GetSurvey_Endpoint(a);
	}
	/** @public @arg {A_ChangeEngagementPanelVisibility} x */
	A_ChangeEngagementPanelVisibility(x) {let [a,y]=this.TE_Endpoint_2("A_ChangeEngagementPanelVisibility","changeEngagementPanelVisibilityAction",x); this.g(y); this.AD_ChangeEngagementPanelVisibility(a);}
	/** @private @arg {AD_ChangeEngagementPanelVisibility} x */
	AD_ChangeEngagementPanelVisibility(x) {
		const cf="AD_ChangeEngagementPanelVisibility";
		const {targetId,visibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_EngagementPanelTargetId(targetId);
		switch(visibility) {
			default: this.cg.codegen_case(`${cf}.visibility`,visibility); break;
			case "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED":
			case "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN":
		}
	}
	/** @private @arg {A_HideEnclosing} x */
	A_HideEnclosing(x) {let [a,y]=this.TE_Endpoint_2("A_HideEnclosing","hideEnclosingAction",x); this.g(y); this.AD_HideEnclosing(a);}
	/** @private @arg {AD_HideEnclosing} x */
	AD_HideEnclosing(x) {this.y("AD_HideEnclosing","notificationId",x,this.a_primitive_str);}
	/** @private @arg {A_UndoFeedback} x */
	A_UndoFeedback(x) {let [a,y]=this.TE_Endpoint_2("A_UndoFeedback","undoFeedbackAction",x); this.g(y); this.B_Hack(a);}
	/** @private @arg {S_GetAccountMenu} x */
	S_GetAccountMenu(x) {
		const cf="S_GetAccountMenu";
		const {signal,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(signal!=="GET_ACCOUNT_MENU") debugger;
		let [u]=this.z(actions,this.A_LoadingAccountMenu);
		let [u1]=this.z(u,this.Popup_LoadingAccountMenu);
		let [u2]=this.z(u1,this.R_LoadingAccountMenu);
		this.z(u2,this.MP_LoadingAccountMenu);
	}
	/** @public @arg {A_LoadingAccountMenu} x */
	A_LoadingAccountMenu(x) {return this.xm.TA_OpenPopup("A_LoadingAccountMenu",x);}
	/** @public @arg {Popup_LoadingAccountMenu} x */
	Popup_LoadingAccountMenu(x) {
		const cf="Popup_LoadingAccountMenu";
		const {popup: a,popupType: b,beReused: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(b!=="DROPDOWN") debugger;
		if(c!==true) debugger;
		return a;
	}
	/** @private @arg {R_LoadingAccountMenu} x */
	R_LoadingAccountMenu(x) {return this.TR_MultiPageMenu("R_LoadingAccountMenu",x);}
	/** @public @arg {MP_LoadingAccountMenu} x */
	MP_LoadingAccountMenu(x) {
		const cf="MP_LoadingAccountMenu";
		const {style,trackingParams,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT") debugger;
		this.trackingParams(trackingParams);
		if(showLoadingSpinner!==true) debugger;
	}
	/** @public @arg {RA_ReelDismissal} x */
	RA_ReelDismissal(x) {this.H_s("reelDismissalActionRenderer",x,this.AD_ReelDismissal);}
	/** @public @arg {AD_ReelDismissal} x */
	AD_ReelDismissal(x) {let [a,y]=this.TE_TrackedObj_2("AD_ReelDismissal",x,"onDismissalCompletionRenderer"); this.g(y); this.RA_Notification(a);}
	/** @public @arg {RA_Notification} x */
	RA_Notification(x) {this.H_s("notificationActionRenderer",x,this.AD_Notification);}
	/** @private @arg {AD_Notification} x */
	AD_Notification(x) {
		const cf="AD_Notification";
		const {responseText,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(responseText);
		this.xm.t(actionButton,x => this.xm.R_Button(x));
		this.trackingParams(trackingParams);
	}
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
	/** @public @arg {R_ConfirmDialog} x */
	R_ConfirmDialog(x) {this.H_s("confirmDialogRenderer",x,this.D_ConfirmDialog);}
	/** @private @arg {D_ConfirmDialog} x */
	D_ConfirmDialog(x) {
		const cf="D_ConfirmDialog";
		const {title,trackingParams,dialogMessages,confirmButton,cancelButton,primaryIsCancel,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(title,this.G_Text);
		this.trackingParams(trackingParams);
		this.z(dialogMessages,this.G_Text);
		this.xm.R_Button(confirmButton);
		this.xm.R_Button(cancelButton);
		this.a_primitive_bool(primaryIsCancel);
	}
	/** @private @arg {TM_Visibility} x */
	TM_Visibility(x) {
		const cf="TM_Visibility";
		const {types,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_primitive("Visibility.types",types);
	}
	/** @private @arg {D_Survey_Watch} x */
	D_Survey_Watch(x) {this.y("D_Survey_Watch","watch",x,this.B_Hack);}
	/** @private @arg {D_PaidDigitalGoods} x */
	R_PaidDigitalGoods(x) {this.H_s("paidDigitalGoods",x,this.B_Hack);}
	/** @private @arg {G_DC_GetSurvey_Endpoint} x */
	G_DC_GetSurvey_Endpoint(x) {
		const cf="G_DC_GetSurvey_Endpoint";
		if("paidDigitalGoods" in x) return this.R_PaidDigitalGoods(x);
		if("watch" in x) return this.D_Survey_Watch(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {"D_InfoCardIcon"} cf @arg {D_TrackingParams} x */
	D_TrackingParams(cf,x) {this.y(cf,"trackingParams",x,x => this.trackingParams(x));}
	/** @public @template T,U @arg {T_Id<T>} x @arg {(this:this,x:T)=>U} f */
	T_Id(x,f) {return f.call(this,x.id);}
	/** @public @arg {CF_T_Signal} cf @template T @arg {T_Signal<T>} x */
	T_Signal(cf,x) {return this.w(cf,"signal",x);}
	/** @public @template {{}} U @arg {U} x @template {string} VV @arg {VV} pf @returns {[T_RemovePrefix<U,VV>,Omit<U,`${VV}${string}`>]} */
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
	/** @public @arg {D_ImpressionCap} x */
	D_ImpressionCap(x) {this.cq(this.w("D_ImpressionCap","impressionCap",x),"1");}
	/** @public @arg {D_Hint} x */
	D_Hint(x) {
		const cf="D_Hint";
		const {hintId,dwellTimeMs,hintCap,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.cq(hintId,"sponsor-pre-purchase");
		this.cq(dwellTimeMs,"60000");
		this.D_ImpressionCap(hintCap);
		this.trackingParams(trackingParams);
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
		const cf="D_LikeButton";
		const {likesAllowed,...y}=this.s(cf,x);
		if(likesAllowed!==true) debugger;
		let [upt,ur]=this.unwrap_prefix(y,"like");
		this.D_LikeButton_Like(upt);
		let [ud,{...y1}]=this.unwrap_prefix(ur,"dislike");
		this.D_LikeButton_Dislike(ud);
		if("target" in y1) {
			const {target,trackingParams,serviceEndpoints,...y2}=y1; this.g(y2);
			this.t(target,this.D_LikeApi);
			if(trackingParams) this.trackingParams(trackingParams);
			this.tz(serviceEndpoints,this.E_Like);
		}
	}
	/** @private @arg {D_LikeApi} x */
	D_LikeApi(x) {
		if(!x) {debugger; return;}
		const cf="D_LikeApi";
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_LikeButton} x */
	R_LikeButton(x) {this.H_s("likeButtonRenderer",x,this.D_LikeButton);}
	/** @public @arg {R_Hint} x */
	R_Hint(x) {this.H_s("hintRenderer",x,this.D_Hint);}
	/** @public @arg {R_AboutThisAd} x */
	R_AboutThisAd(x) {this.H_s("aboutThisAdRenderer",x,this.D_AboutThisAd);}
	/** @private @arg {D_AboutThisAd} x */
	D_AboutThisAd(x) {
		const cf="D_AboutThisAd";
		const {url,trackingParams,...y}=this.s(cf,x); this.g(y);
		let url2=this.UrlWrappedValueT(url);
		this.ps.parse_url(cf,as(url2));
	}
	/** @arg {R_FancyDismissibleDialog|R_UnifiedSharePanel|R_ConfirmDialog|R_AboutThisAd} x */
	h_pt(x) {
		if("fancyDismissibleDialogRenderer" in x) return this.R_FancyDismissibleDialog(x);
		if("unifiedSharePanelRenderer" in x) return this.R_UnifiedSharePanel(x);
		if("aboutThisAdRenderer" in x) return this.R_AboutThisAd(x);
		if("confirmDialogRenderer" in x) return this.R_ConfirmDialog(x);
		debugger;
	}
	/** @arg {T_OpenPopup_Dropdown<TR_MultiPageMenu<{style: string;}>>} x @returns {x is Popup_LoadingAccountMenu} */
	is_D_GetAccountMenu_Popup(x) {return x.popup.multiPageMenuRenderer.style==="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT";}
	/** @arg {R_MenuPopup} x */
	R_MenuPopup(x) {this.H_s("menuPopupRenderer",x,this.D_MenuPopup);}
	/** @arg {D_MenuPopup} x */
	D_MenuPopup(x) {this.y("D_MenuPopup","items",x,x => this.z(x,this.R_MenuServiceItem));}
	/** @template {T extends infer U?{} extends U? never:U:never} R @template {{}} T @arg {T} x @returns {x is R} */
	is_not_empty_obj(x) {return this.get_keys_of(x).length>0;}
	/** @template {T extends infer U?{} extends U? never:U:never} R @template {{}} T @arg {T} x @arg {R|null} _x @returns {x is Record<string,never>} */
	is_empty_obj(x,_x=null) {return this.get_keys_of(x).length===0;}
	/** @public @arg {R_ToggleButtonIdData} x */
	R_ToggleButtonIdData(x) {this.y("R_ToggleButtonIdData","toggleButtonIdData",x,this.D_ToggleButtonIdData);}
	/** @public @arg {D_ToggleButtonIdData} x */
	D_ToggleButtonIdData(x) {
		const cf="D_ToggleButtonIdData";
		this.T_Id(x,x => this.save_enum(cf,"TOGGLE_BUTTON_ID_TYPE",x));
	}
	/** @private @arg {D_UnifiedSharePanel} x */
	D_UnifiedSharePanel(x) {
		const cf="D_UnifiedSharePanel";
		const {trackingParams,showLoadingSpinner,...y}=this.s(cf,x);
		this.trackingParams(trackingParams);
		if(showLoadingSpinner!==true) debugger;
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @public @arg {R_UnifiedSharePanel} x */
	R_UnifiedSharePanel(x) {this.H_s("unifiedSharePanelRenderer",x,this.D_UnifiedSharePanel);}
	/** @private @arg {Popup_DL_ShareEntityService} x */
	Popup_ShareEntityService(x) {
		const cf="Popup_ShareEntityService";
		const {popup,popupType,beReused,...y}=this.s(cf,x); this.g(y);
		this.R_UnifiedSharePanel(popup);
		if(popupType!=="DIALOG") debugger;
		this.t(beReused,x => this.cq(x,true));
	}
	/** @public @arg {CF_T_SE_Signal} cf @template {{webCommandMetadata:any}} T @template U @arg {T_SE_Signal<T,U>} x @returns {[T,U]} */
	T_SE_Signal(cf,x) {
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		/** @type {`T_SE_Signal:${CF_T_SE_Signal}`} */
		this.clickTrackingParams(clickTrackingParams);
		return [commandMetadata,signalServiceEndpoint];
	}
	/** @private @template T @arg {CF_T_WCM_Unpack} cf @arg {{webCommandMetadata: T}} x */
	unpack_T_WCM(cf,x) {return this.w(`Unpack:T_WCM:${cf}`,"webCommandMetadata",x);}
	/** @public @arg {R_MenuFlexibleItem} x */
	R_MenuFlexibleItem(x) {this.H_s("menuFlexibleItemRenderer",x,this.DT_MenuFlexibleItem);}
	/** @private @arg {DT_MenuFlexibleItem} x */
	DT_MenuFlexibleItem(x) {
		const cf="DT_MenuFlexibleItem";
		const {menuItem,topLevelButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.ht.G_MenuItem_2(menuItem);
		this.ht.DT_MenuItem_Button(topLevelButton);
	}
	/** @public @arg {D_LoggingDirectives} x */
	D_LoggingDirectives(x) {
		const cf="D_LoggingDirectives";
		const {trackingParams,visibility,gestures,enableDisplayloggerExperiment,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.t(visibility,this.TM_Visibility);
		this.t(gestures,this.D_LoggingDirectives_Gestures);
		if(enableDisplayloggerExperiment!==void 0) this._primitive_of(enableDisplayloggerExperiment,"boolean");
	}
	/** @private @arg {RD_MenuServiceItem} x */
	RD_MenuServiceItem(x) {
		const cf="RD_MenuServiceItem";
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
			this.cq(hasSeparator,true);
			this.cq(isDisabled,false);
			return;
		}
	}
	/** @public @arg {R_MenuServiceItem} x */
	R_MenuServiceItem(x) {this.H_s("menuServiceItemRenderer",x,this.RD_MenuServiceItem);}
	/** @public @arg {R_Menu} x */
	R_Menu(x) {this.H_s("menuRenderer",x,this.D_Menu);}
	/** @private @arg {R_ToggleMenuServiceItem} x */
	R_ToggleMenuServiceItem(x) {this.H_s("toggleMenuServiceItemRenderer",x,this.D_ToggleMenuServiceItem);}
	/** @private @arg {R_CommonConfig} x */
	R_CommonConfig(x) {this.H_s("commonConfig",x,this.D_CommonConfig);}
	/** @private @arg {G_MenuItem} x */
	G_MenuItem(x) {
		const cf="G_MenuItem"; this.k(cf,x);
		if("toggleMenuServiceItemRenderer" in x) return this.R_ToggleMenuServiceItem(x);
		if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
		if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @arg {Record<string,never>} x @returns {x is {}} */
	decay_obj(x) {x; return true;}
	/** @private @arg {D_Menu_WithTargetId["targetId"]} x */
	D_Menu_TargetId(x) {
		switch(x) {
			default: debugger; break;
			case "browse-video-menu-button": break;
			case "playlist-browse-action-menu": break;
			case "watch-related-menu-button": break;
		}
	}
	/** @private @arg {D_Menu_WithTargetId} x */
	D_Menu_WithTargetId(x) {
		const cf="D_Menu_WithTargetId";
		switch(x.targetId) {
			default: this.codegen_typedef(cf,x,false); break;
			case "browse-video-menu-button": {
				if("loggingDirectives" in x) {
					const {items,trackingParams,accessibility,menuPopupAccessibility,topLevelButtons,flexibleItems,loggingDirectives,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					this.xm.t(menuPopupAccessibility,this.xm.D_Label);
					this.tz(items,this.G_MenuItem);
					if(trackingParams) this.trackingParams(trackingParams);
					this.t(accessibility,this.D_Accessibility);
					this.tz(flexibleItems,this.R_MenuFlexibleItem);
					this.tz(topLevelButtons,this.D_Menu_Button);
					this.D_Menu_TargetId(targetId);
					return;
				}
				const {items,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.trackingParams(trackingParams);
				this.z(items,x => {
					if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
					debugger;
				});
				this.D_Accessibility(accessibility);
				this.D_Menu_TargetId(targetId);
			} break;
			case "playlist-browse-action-menu": {
				if("topLevelButtons" in x) {
					const {trackingParams,topLevelButtons,items,accessibility,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					this.trackingParams(trackingParams);
					this.z(topLevelButtons,x => {
						if("buttonRenderer" in x) return this.xm.R_Button(x);
						debugger;
					});
					this.z(items,x => {
						if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
						if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
						debugger;
					});
					this.D_Accessibility(accessibility);
					switch(targetId) {
						default: debugger; break;
					}
					this.D_Menu_TargetId(targetId);
					return;
				}
			} break;
			case "watch-related-menu-button": {
				const {items,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.trackingParams(trackingParams);
				this.z(items,x => {
					if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
					debugger;
				});
				this.D_Accessibility(accessibility);
				this.D_Menu_TargetId(targetId);
				x;
			} break;
		}
	}
	/** @private @arg {D_Menu} x */
	D_Menu(x) {
		const cf="D_Menu";
		if("targetId" in x) return this.D_Menu_WithTargetId(x);
		if("items" in x) return this.D_Menu_WithItems(x);
		if("topLevelButtons" in x) {
			const {trackingParams,topLevelButtons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.trackingParams(trackingParams);
			this.ht.z(topLevelButtons,this.ht.G_Menu_TopLevelButton);
			return;
		}
		x;
		debugger;
	}
	/** @public @arg {CF_T_Icon} cf @template {string} T @arg {T_Icon<T>} x */
	T_Icon(cf,x) {
		const {iconType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_primitive(`${cf}.iconType`,iconType);
		return iconType;
	}
	/**
	 * @param {CF_TE_Endpoint_2} cf
	 * @template {Extract<keyof T_EP,KA_EndpointKey>} T_Key @template {TE_Endpoint_2<KA_EndpointKey,{}>} T_EP @arg {T_EP} x @arg {T_Key} k
	 * @returns {[T_EP[T_Key],Omit<T_EP,"clickTrackingParams"|T_Key>]}
	 */
	TE_Endpoint_2(cf,k,x) {
		const {clickTrackingParams,[k]: endpoint,...y}=this.s(cf,x);
		this.clickTrackingParams(clickTrackingParams);
		return [endpoint,y];
	}
	/**
	 * @protected @template R_D
	 * @template {Extract<keyof T_Endpoint,KA_EndpointKey>} T_Key @template {TE_Endpoint_2<any,any>} T_Endpoint @arg {T_Endpoint} x
	 * @param {T_Key} k
	 * @param {(this:this,x:T_Endpoint[T_Key])=>R_D} f1
	 * @returns {[typeof y,R_D]}
	 */
	TE_Endpoint_2_v2(k,x,f1) {
		let keys=this.get_keys_of(x);
		let s=new JsonReplacerState({
			text_decoder: this._decoder,
			cf: k,keys,is_root: true,
		});
		let cf=this.cg.get_auto_type_name(s,x);
		const {clickTrackingParams,[k]: a,...y}=this.s(cf,x);
		this.clickTrackingParams(clickTrackingParams);
		const r1=f1.call(this,a);
		return [y,r1];
	}
	/**
	 * @arg {CF_TE_TrackedObj_2} cf
	 * @template {Extract<keyof T_EP,KA_EndpointKey>} T_Key @template {TE_TrackedObj_2<KA_EndpointKey,{}>} T_EP @arg {T_EP} x @arg {T_Key} k
	 * @returns {[T_EP[T_Key],Omit<T_EP,"trackingParams"|T_Key>]}
	 */
	TE_TrackedObj_2(cf,x,k) {
		const {trackingParams,[k]: endpoint,...y}=this.s(cf,x);
		this.trackingParams(trackingParams);
		return [endpoint,y];
	}
	/** @public @arg {CF_TE_Endpoint_Opt_3} cf @template {KA_EndpointKey} T_Key @template {TE_Endpoint_Opt_3<T_Key,any,any>} T_EP @arg {T_Key} k @arg {T_EP} x @returns {[T_EP["commandMetadata"],T_EP[T_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|T_Key>]} */
	TE_Endpoint_Opt_3(cf,k,x) {
		const {clickTrackingParams,commandMetadata,[k]: endpoint,...y}=this.s(cf,x);
		/** @type {`${CF_TE_Endpoint_Opt_3}.endpoint`} */
		this.clickTrackingParams(clickTrackingParams);
		return [commandMetadata,endpoint,y];
	}
	/** @public @arg {CF_M_w} cf @arg {K} k @template {keyof T} K @template {{}} T @arg {T} x @returns {T[K]} */
	w(cf,k,x) {this.k(cf,x); return this.ws(k,x);}
	/** @public @arg {K} k @template {keyof T} K @template {{}} T @arg {T} x @returns {T[K]} */
	ws(k,x) {if(x[k]===void 0) debugger; return x[k];}
	/** @public @arg {D_EndscreenElement_EP} x */
	D_EndscreenElement_EP(x) {
		const cf="D_EndscreenElement_EP"; this.k(cf,x);
		if("browseEndpoint" in x) return this.E_VE3611(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("urlEndpoint" in x) return this.xm.E_Url(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @type {DU_VideoId[]} x */
	video_id_list=[];
	/** @type {Set<DU_IdCacheItem>} */
	static id_cache=new Set;
	id_cache=ServiceMethods.id_cache;
	/** @arg {DU_IdCacheItem} x */
	cache_raw_id(x) {
		if(this.id_cache.has(x)) return true;
		this.id_cache.add(x);
		return false;
	}
	video_id_lengths=[11];
	/** @public @arg {DU_VideoId} x */
	videoId(x) {
		if(this.cache_raw_id(`video_id:${x}`)) return;
		if(this.video_id_list.includes(x)) return;
		this.video_id_list.push(x);
		let split=split_string(x,"");
		/** @arg {string[]} x @returns {x is DU_VideoId_Arr} */
		let is_video_id_len=(x) => {return this.video_id_lengths.includes(x.length);};
		if(!is_video_id_len(split)) return;
		/** @type {DU_VideoId_Arr} */
		let res_arr=split;
		switch(res_arr.length) {
			default: debugger; break;
			case 11: break;
		}
	}
	/** @api @public @arg {DU_Browse_Id} x */
	browseId(x) {
		if(this.cache_raw_id(`browse_id:${x}`)) return;
	}
	static_playlist_ids=["WL","LL"];
	/** @public @arg {DU_Playlist_Id} x */
	playlistId(x) {
		if(this.static_playlist_ids.includes(x)) return;
		if(this.cache_raw_id(`playlist_id:${x}`)) return;
	}
	/** @public @arg {DU_GuideEntry_Id} x */
	guideEntryId(x) {
		if(this.cache_raw_id(`guide_entry_id:${x}`)) return;
	}
	/** @public @arg {T_IdTemplate<"UC",D_UserIdStr>} x */
	channelId(x) {
		if(this.cache_raw_id(`channel_id:${x}`)) return;
	}
	/** @public @arg {D_UserIdStr} x */
	userId(x) {
		if(this.cache_raw_id(`user_id:${x}`)) return;
	}
	/** @public @arg {string} x */
	create_param_map(x) {
		let res_e=this._decode_b64_url_proto_obj(x);
		if(!res_e) return null;
		if(res_e.find(e => e[0]==="error")) {return null;}
		return this.make_param_map(res_e);
	}
	/** @public @arg {D_ProtobufObj[]} res_e */
	make_param_map(res_e) {
		/** @private @type {V_ParamMapType} */
		let ret_map=new Map();
		/** @private @arg {number} key @arg {V_ParamMapValue} value */
		let do_set=(key,value) => {
			if(ret_map.has(key)) {
				let v=ret_map.get(key);
				v?.push(value);
			} else {ret_map.set(key,[value]);}
		};
		for(let param of res_e) {
			switch(param[0]) {
				case "data_fixed64": do_set(param[1],["bigint",[],param[2]]); break;
				case "data_fixed32":
				case "data32": do_set(param[1],param[2]); break;
				case "child": {
					const [,,u8_bin_arr,bin_arr]=param;
					x: if(bin_arr) {
						let err=bin_arr.find(e => e[0]==="error");
						if(err) break x;
						let p_map=this.make_param_map(bin_arr);
						if(String.fromCharCode(...u8_bin_arr.slice(0,4)).match(/[\w-]{4}/)) break x;
						if(p_map===null&&u8_bin_arr[0]===0) {
							debugger;
							break;
						}
						if(!p_map) {
							do_set(param[1],["failed",bin_arr]);
							break;
						}
						do_set(param[1],p_map);
						break;
					}
					if(u8_bin_arr[0]===0) {
						do_set(param[1],u8_bin_arr);
						break;
					}
					let dec=this._decoder.decode(u8_bin_arr);
					if(dec===null) {debugger; break;}
					do_set(param[1],dec);
				} break;
				case "data64": do_set(param[1],["bigint",param[2],param[3]]); break;
				case "group": do_set(param[1],['group',param[2]]); break;
				case "info": debugger; break;
				case "struct": debugger; break;
				case "error": return null;
				default: debugger; break;
			}
		}
		return ret_map;
	}
	/** @public @arg {B_Hack} x */
	B_Hack(x) {
		const cf="B_Hack";
		const {hack,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(hack!==true) debugger;
	}
	/** @public @template {string} T @arg {T_UrlWrappedValue<T>} x */
	UrlWrappedValueT(x) {const {privateDoNotAccessOrElseTrustedResourceUrlWrappedValue: a}=this.s("T_UrlWrappedValue",x); return a;}
	/** @public @arg {D_SubscribeButton_SubscribedPrefix} x */
	D_SubscribeButton_SubscribedPrefix(x) {
		const cf="D_SubscribeButton_SubscribedPrefix";
		const {buttonText,entityKey,...y}=this.s(cf,x); this.g(y);
		this.t(buttonText,this.G_Text);
		this.t(entityKey,x => this.params("subscribe_button.entity.key",x));
	}
	/** @public @arg {D_SubscribeButton_UnsubscribedPrefix} x */
	D_SubscribeButton_UnsubscribedPrefix(x) {
		const cf="D_SubscribeButton_UnsubscribedPrefix";
		const {buttonText,...y}=this.s(cf,x); this.g(y);
		this.G_Text(buttonText);
	}
	/** @public @arg {D_SubscribeButton_SubscribePrefix} x */
	D_SubscribeButton_SubscribePrefix(x) {
		const cf="D_SubscribeButton_SubscribePrefix";
		const {accessibility,...y}=this.s(cf,x); this.g(y);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @public @arg {D_SubscribeButton_UnsubscribePrefix} x */
	D_SubscribeButton_UnsubscribePrefix(x) {
		const cf="D_SubscribeButton_UnsubscribePrefix";
		const {buttonText,accessibility,...y}=this.s(`${cf}.unsubscribe`,x); this.g(y);
		this.t(buttonText,this.G_Text);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @arg {R_WatchEndpointMusicConfig} x */
	R_WatchEndpointMusicConfig(x) {this.H_s("watchEndpointMusicConfig",x,this.D_WatchEndpointMusicConfig);}
	/** @private @arg {D_WatchEndpointMusicConfig} x */
	D_WatchEndpointMusicConfig(x) {
		const cf="D_WatchEndpointMusicConfig";
		const {hasPersistentPlaylistPanel,musicVideoType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(hasPersistentPlaylistPanel);
		this.cq(musicVideoType,"MUSIC_VIDEO_TYPE_ATV");
	}
	/** @private @arg {R_PrefetchHintConfig} x */
	R_PrefetchHintConfig(x) {this.H_s("prefetchHintConfig",x,this.D_PrefetchHintConfig);}
	/** @private @arg {D_PrefetchHintConfig} x */
	D_PrefetchHintConfig(x) {
		const cf="D_PrefetchHintConfig";
		const {prefetchPriority,...y}=this.s(cf,x);/*#destructure_off*/
		this.cq(prefetchPriority,0);
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
	D_CommonConfig(x) {this.H_s("url",x,x => this.ps.parse_url("D_CommonConfig.url",x));}
	/** @private @arg {Extract<DE_VE5754,{canonicalBaseUrl:any}>["browseId"]} x */
	DU_VE5754_BrowseId_2(x) {this.browseId(x);}
	seen_map=new Set;
	/** @public @arg {GU_VE83769_Url_Redirect|`https://www.youtube.com/${string}`} x */
	GU_FullYoutubeUrl(x) {
		if(this.str_starts_with(x,"https://www.youtube.com/redirect?")) return this.GU_YoutubeUrlRedirect(as(x));
	}
	/** @public @template {string} T @arg {T} x @returns {x is `${string}?${string}`} */
	str_is_search(x) {return x.includes("?");}
	/** @public @arg {GU_VE83769_Url_Redirect} x */
	GU_YoutubeUrlRedirect(x) {
		const cf="GU_YoutubeUrlRedirect";
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
		this.cg.codegen_str(cf,x);
	}
	/** @template T @arg {T} x @arg {T} y */
	eq(x,y) {if(x!==y) debugger; return x===y;}
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
				let [,v,...u]=p;
				if(u.length===0) {
					v;
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
	/** @public @arg {GE_Browse} x */
	GE_Browse_old(x) {
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
	/** @arg {{endpoint:TE_VE<number>}} x @template {number} T @arg {T} t @returns {x is {endpoint:TE_VE<T>}} */
	is_EP_Val(x,t) {return this.is_TE_VE(x.endpoint,t);}
	/** @public @template {U["commandMetadata"]["webCommandMetadata"]["rootVe"]} T @template {TE_VE_In} U @arg {U} x @arg {T} t @returns {x is TE_VE<T>} */
	is_TE_VE(x,t) {return x.commandMetadata.webCommandMetadata.rootVe===t;}
	/** @private @arg {GU_VE42352_Url} x */
	GU_VE42352_Url(x) {
		switch(x) {
			case "/feed/downloads": break;
			default: debugger; break;
		}
	}
	/** @private @arg {GU_VE3611_Url} x */
	GU_VE3611_Url(x) {
		const cf="GU_VE3611_Url";
		if(this.str_starts_with_rx("/@",x)) {
			let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
			let a1=split_string_once(y,"/");
			if(a1.length!==1) debugger;
			let [x1]=a1;
			let a2=split_string_once(x1,"@"); this.cq(a2[0],"");
			this.save_primitive("channel_handle",a2[1]);
			return;
		}
		let [w,y]=split_string_once(x,"/"); if(w!=="") debugger;
		let a1=split_string_once(y,"/");
		switch(a1[0]) {
			default: switch(a1[0]) {
				case "":
			} debugger; break;
			case "user": {
				if(a1.length!==2) debugger;
				let [,y1]=a1;
				if(this.str_is_search(y1)) debugger;
				let a2=split_string_once(y1,"/");
				if(a2.length!==1) debugger;
				console.log(`${cf}.user.a2`,a2);
			} break;
			case "c": {
				if(a1.length!==2) debugger;
				let [,y1]=a1;
				let a2=split_string_once(y1,"/");
				if(a2.length===2) debugger;
			} break;
			case "gaming": if(a1.length!==1) debugger; break;
			case "channel": {
				let [,y1]=a1;
				if(this.str_starts_with_rx("UC",y1)) return;
			} break;
			case "source": {
				let [,y1]=a1;
				let a2=split_string_once(y1,"/");
				let [,y2]=a2;
				let [path,y3]=split_string_once(y2,"?");
				if(path!=="shorts") debugger;
				let x=this.parse_url_search_params(y3);
				if("bp" in x) {
					const {bp,...y}=x; this.g(y);
					return this.params("shorts.source.bp",bp);
				}
				debugger;
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
					this.playlistId(p_sp.list);
				} break;
			}
		}
	}
	/** @public @arg {D_Accessibility} x */
	D_Accessibility(x) {this.xm.H_s("accessibilityData",x,this.xm.D_Label);}
	/** @public @arg {boolean} x */
	a_primitive_bool(x) {if(typeof x!=="boolean") debugger;}
	/** @public @arg {G_Text} x */
	G_Text(x) {
		if(this.sm!==this) {this.sm.G_Text(x); return;}
		const cf="G_Text";
		if(!x) {debugger; return;}
		const {runs,simpleText,accessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(simpleText,this.a_primitive_str);
		this.tz(runs,this.D_TextRun);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @public @arg {D_Emoji} x */
	D_Emoji(x) {
		const cf="D_Emoji";
		const {emojiId,shortcuts,searchTerms,image,...y}=this.s(cf,x); this.g(y);
		let emoji_parts=this.split_str(emojiId,"");
		if(emoji_parts.length!==2) debugger;
		this.join_string(emoji_parts,"");
		this.save_primitive(`save://Emoji.d/emojiId`,emojiId);
		this.save_primitive(`save://Emoji.d/shortcuts/${emojiId}?custom=${false}`,shortcuts.join(","));
		this.save_primitive(`save://Emoji.d/searchTerms/${emojiId}?custom=${false}`,searchTerms.join(","));
	}
	/** @private @arg {D_Color} x */
	D_Color(x) {
		if(!this.eq_keys(this.get_keys_of(x),["red","green","blue"])) debugger;
		this.z(Object.values(x),x => this._primitive_of(x,"number"));
	}
	/** @public @arg {D_ThumbnailItem} x */
	D_ThumbnailItem(x) {
		const cf="D_ThumbnailItem";
		const {url,width,height,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(url);
		this.t(width,x => this._primitive_of(x,"number"));
		this.t(height,x => this._primitive_of(x,"number"));
	}
	/** @private @arg {R_Html5PlaybackOnesieConfig} x */
	R_Html5PlaybackOnesieConfig(x) {this.H_s("html5PlaybackOnesieConfig",x,this.R_CommonConfig);}
	/** @public @arg {D_Thumbnail} x */
	D_Thumbnail(x) {
		const cf="D_Thumbnail";
		const {lightColorPalette,darkColorPalette,sampledThumbnailColor,accessibility,isOriginalAspectRatio,thumbnails: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(lightColorPalette,x => this.D_LightColorPalette(cf,x));
		this.t(darkColorPalette,x => this.D_DarkColorPalette(cf,x));
		this.t(sampledThumbnailColor,x => this.D_Color(x));
		if(isOriginalAspectRatio!==void 0&&isOriginalAspectRatio!==true) debugger;
		this.t(accessibility,this.D_Accessibility);
		this.z(a,this.D_ThumbnailItem);
	}
	/** @type {{[U in string]?:number[]}} */
	lc={};
	/** @public @arg {string} cf1 @arg {string} cf @arg {string} k @arg {number} x */
	log_color(cf1,cf,k,x) {
		let arr=this.lc[k]??=[];
		if(!arr.includes(x)) {
			arr.push(x);
			arr.sort((a,b) => a-b);
			console.log(`-- [${cf1}:${cf}:${k}] --\n\n${arr.map(x => `case 0x${x.toString(16)}:`).join(" ")}`);
		}
	}
	/** @arg {string} cf1 @arg {number|undefined} x */
	save_rgba(cf1,x) {
		if(!x) return;
		const cf2=`${cf1}_p_tc`;
		let a=(x>>>24)%256,r=(x>>>16)%256,g=(x>>>8)%256,b=x%256;
		this.save_primitive(`${cf2}_r`,r);
		this.save_primitive(`${cf2}_g`,g);
		this.save_primitive(`${cf2}_b`,b);
		this.save_primitive(`${cf2}_a`,a);
	}
	/** @public @arg {"D_PlaylistPanelVideo"|"D_MacroMarkersListItem"|"D_Thumbnail"} cf1 @arg {D_DarkColorPalette} x */
	D_DarkColorPalette(cf1,x) {
		const cf0="D_DarkColorPalette";
		const cf2="dark";
		/** @type {`${cf0}:${cf1}:${cf2}`} */
		const cf3=`${cf0}:${cf1}:${cf2}`;
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section1Color: s1_c,section2Color: s2_c,section3Color: s3_c,section4Color: s4_c,...y}=this.s(cf3,x); this.g(y);
		this.save_rgba(`${cf2}.p_tc`,p_tc);
		this.save_rgba(`${cf2}.s_tc`,s_tc);
		this.save_rgba(`${cf2}.s1_c`,s1_c);
		this.save_rgba(`${cf2}.s2_c`,s2_c);
		this.save_rgba(`${cf2}.s3_c`,s3_c);
		this.save_rgba(`${cf2}.s4_c`,s4_c);
	}
	/** @public @arg {"D_Thumbnail"|"D_PlaylistPanelVideo"|"D_MacroMarkersListItem"} cf1 @arg {D_LightColorPalette} x */
	D_LightColorPalette(cf1,x) {
		const cf0="D_LightColorPalette";
		const cf2="light";
		/** @type {`${cf0}:${cf1}:${cf2}`} */
		const cf3=`${cf0}:${cf1}:${cf2}`;
		const {primaryTitleColor: p_tc,secondaryTitleColor: s_tc,section1Color: s1_c,section2Color: s2_c,section3Color: s3_c,section4Color: s4_c,...y}=this.s(cf3,x); this.g(y);
		this.save_rgba(`${cf2}.p_tc`,p_tc);
		this.save_rgba(`${cf2}.s_tc`,s_tc);
		this.save_rgba(`${cf2}.s1_c`,s1_c);
		this.save_rgba(`${cf2}.s2_c`,s2_c);
		this.save_rgba(`${cf2}.s3_c`,s3_c);
		this.save_rgba(`${cf2}.s4_c`,s4_c);
	}
	/** @public @arg {CF_P_ParamParse} path @template {CF_D_Params} T_CF @arg {T_CF} cf @template {string} T @arg {{params:T;}} x */
	D_Params(cf,path,x) {const {params: p,...y}=this.s(cf,x); this.g(y); this.params(path,x.params);}
	/** @public @arg {string} ns @arg {()=>void} f */
	grouped(ns,f) {
		console.group(ns);
		f();
		console.groupEnd();
	}
	/** @arg {string} path @arg {["bigint",number[],bigint]} x */
	handle_bigint(path,x) {
		this.save_primitive(path,x[1]);
		return this.save_primitive(path,`${x[2]}n`);
	}
	/** @public @arg {string} x @returns {x is D_TargetIdUuid} */
	is_yt_uuid(x) {
		return x.match(/[0-9a-f]{8}-0{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)!==null;
	}
	/** @api @public @arg {DU_TargetId} x */
	parse_target_id(x) {
		const cf="D_TargetIdStr";
		if(this.is_yt_uuid(x)) return;
		if(this.str_starts_with_rx("browse-feed",x)) {
			if(this.str_starts_with(x,"browse-feedUC")) {
				return;
			}
			console.log("[target_id.browse_feed]","browse-feed",split_string_once(x,"browse-feed")[1]);
			return this.save_enum_with_sep("browse-feed",x,"");
		}
		if(this.str_starts_with_rx("comment-replies-item",x)) {return this.save_enum(cf,"comment-replies-item",x);}
		if(this.str_starts_with(x,"engagement-panel")) {return this.save_enum(cf,"engagement-panel",x);}
		if(this.str_starts_with(x,"comments")) {return this.save_enum(cf,"comments",x);}
		if(this.str_starts_with(x,"library")) {return this.save_enum(cf,"library",x);}
		if(this.str_starts_with(x,"watch")) {return this.save_enum(cf,"watch",x);}
		if(this.str_starts_with(x,"shopping_panel")) {return this.save_enum(cf,"shopping_panel",x);}
		if(this.str_starts_with(x,"clip")) {return this.save_enum(cf,"clip",x);}
		this.save_primitive("target_id",x);
	}
	/** @private @type {string[]} */
	known_target_id=[];
	/** @public @arg {string} cf1 @arg {DU_TargetId} x */
	targetId(cf1,x) {
		const cf2="targetId";
		this.parse_target_id(x);
		if(this.is_yt_uuid(x)) return;
		this.save_primitive(`${cf1}.${cf2}`,x);
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
		if(this.str_starts_with(x,"engagement-panel")) {
			let ss=split_string_once(x,"-")[1];
			let s2=split_string_once(ss,"-")[1];
			if(this.str_starts_with(s2,"macro-markers")) {
				let ss=split_string_once(s2,"-")[1];
				let s3=split_string_once(ss,"-")[1];
				switch(s3) {
					default: s3===""; this.cg.codegen_case(`D_TargetIdStr:${cf2}:EngagementPanel:MacroMarkers`,s3); break;
					case "auto-chapters": break;
					case "description-chapters": break;
				}
				return;
			}
			switch(s2) {
				default: s2===""; this.cg.codegen_case(`D_TargetIdStr:${cf2}:EngagementPanel`,s2); break;
				case "ads":
				case "clip-create":
				case "comments-section":
				case "searchable-transcript-search-panel":
				case "searchable-transcript":
				case "structured-description":
			}
			return;
		}
		switch(x) {
			default: x===""; this.cg.codegen_case(`D_TargetIdStr:${cf2}`,x); break;
			case "browse-video-menu-button":
			case "clip-info-button": case "comments-section": case "create-clip-button-action-bar":
			case "feed_filter_chip_bar_second_chip":
			case "playlist-browse-action-menu":
			case "search-feed": case "search-page": case "sponsorships-button":
			case "watch-next-feed": case "watch-related-menu-button": case "watch-supervod-button":
		}
	}
	/** @arg {bigint} x */
	a_primitive_bigint(x) {this._primitive_of(x,"bigint");}
	/** @public @arg {string} x */
	a_primitive_str(x) {this._primitive_of(x,"string");}
	/** @arg {number} x */
	a_primitive_num(x) {
		this._primitive_of(x,"number");
		if(Number.isNaN(x)) debugger;
	}
	/** @arg {`${number}`} x */
	visit_number_template(x) {this.a_primitive_num(this.parse_number_template(x));}
	/** @type {any[]} */
	log_list=[];
	/** @arg {string} path @arg {string} cf2 @arg {number} key_index @arg {any} entry */
	add_log_entry(path,cf2,key_index,entry) {
		this.log_list.push([() => console.log(`-- [handle_value_gen$${cf2}] [idx:${key_index}] [v:${entry}] --\n\ncase "${path}":\n`)]);
	}
	/**
	 * @api @public
	 * @template {CF_L_Params} T
	 * @arg {T} root @arg {CF_P_ParamParse} path @arg {V_ParamMapType} map @arg {number[]} map_keys @arg {number[]} map_entry_key_path @arg {V_ParamMapValue[]|undefined} map_entry_values @arg {T_ParseCallbackFunction<T>} callback
	 * @arg {boolean} is_debug_enabled
	 */
	parse_value(root,path,map,map_keys,map_entry_key_path,map_entry_values,callback,is_debug_enabled) {
		let map_entry_key=map_entry_key_path.at(-1);
		let map_keys_=map_keys.slice();
		if(map_entry_values!==void 0&&map_entry_key) {
			let res=callback(root,path,map_entry_values,map_entry_key_path,map_keys_,is_debug_enabled);
			if(res) {
				map.delete(map_entry_key);
				let cx=map_keys.indexOf(map_entry_key);
				if(cx>-1) map_keys.splice(cx,1);
			} else {
				console.log("not del",path,map_entry_key);
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
	/** @public @arg {string} x */
	clickTrackingParams(x) {this.params("params.click_tracking",x);}
	indexed_db_version=3;
	/** @public @template {keyof DT_DatabaseStoreTypes} U @arg {U} key @arg {DT_DatabaseStoreTypes[U]} value */
	indexed_db_put(key,value) {return this.ht.put(key,value,this.indexed_db_version);}
	/** @public @template {{}} T @arg {CF_M_s} cf @arg {T} x */
	s_priv(cf,x) {
		if(!x) debugger;
		this.k(cf,x);
		return x;
	}
	/**
	 * @public
	 * @param {CF_TE_Endpoint_3} cf
	 * @template {Extract<keyof T_EP,KA_EndpointKey>} T_Key @template {TE_Endpoint_3<KA_EndpointKey,{},{}>} T_EP @arg {T_EP} x
	 * @param {T_Key} k
	 * @returns {[T_EP['commandMetadata'],T_EP[T_Key],Omit<T_EP,"clickTrackingParams"|"commandMetadata"|T_Key>]}
	 */
	TE_Endpoint_3(cf,k,x) {
		if(!x) {debugger; return as_any(null);}
		const {clickTrackingParams,commandMetadata,[k]: a,...y}=this.s(cf,x);
		this.clickTrackingParams(clickTrackingParams);
		return [commandMetadata,a,y];
	}
	/** @public @template T @arg {B_TagObj<T>} x */
	B_TagObj(x) {
		const cf="B_TagObj";
		const {tag,...y}=this.s(cf,x);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[done.${cf}.next_key] [${ka.shift()}]`);
		}
		return tag;
	}
	/** @public @template T @template {T} U @arg {T} v1 @arg {U} v2 */
	ceq(v1,v2) {if(v1!==v2) {debugger; return false;}; return true;}
	/** @public @type {<T extends string[],U extends T[number]>(k:T,r:U[])=>Exclude<T[number],U>[]} */
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
	/** @public @arg {CF_M_wn} cf @arg {SI} ex_name @template {T_DistributedKeyof<T>} SI @template {{}} T @arg {T} x @arg {SI[]} excl @returns {[T[SI]]|null} */
	wn(cf,x,ex_name,excl=[]) {
		this.k(cf,x);
		let ka=this.get_keys_of(x);
		let keys=this.filter_out_keys(ka,excl);
		if(keys.length!==1) debugger;
		let k=keys[0];
		if(k!==ex_name) {debugger; return null;}
		let r=x[k];
		return [r];
	}
	/** @public @template CLS @arg {CLS} cls @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {T} x @arg {(this:CLS,x:T[K])=>U} f */
	H_cls(cls,k,x,f) {
		if(!x) {debugger; return;}
		let keys=this.get_keys_of(x);
		if(keys.length!==1) {debugger; return;}
		let cf=this.get_codegen_name(k,x);
		if(!cf) {debugger; return;}
		/** @type {CF_M_wn} */
		let cf_ty=as(cf);
		let wr=this.wn(cf_ty,x,k);
		if(!wr) return;
		return f.call(cls,wr[0]);
	}
	/** @private @arg {`${number}`} x */
	parse_number(x) {
		if(typeof x!=="string") debugger;
		if(x.includes(".")) return parseFloat(x);
		if(x.includes("e")) return parseFloat(x);
		return parseInt(x,10);
	}
	/** @public @template {number} T @arg {`${T}`} x */
	parse_number_template(x) {
		/** @type {T} */
		let num=as(this.parse_number(x));
		return num;
	}
	/** @template T @arg {any} x @arg {()=>T} _ty @returns {asserts x is T} */
	assert_assume_is_type(x,_ty) {x;}
	/** @template T @template {T_OpenPopup_Dialog<T>} U @arg {U} x @returns {[true,U["popup"]]|[false,U["popupType"]]} */
	unpack_popup_dialog(x) {
		if(x.popupType!=="DIALOG") return [false,x.popupType];
		return [true,x.popup];
	}
	/** @public @template {string} PN @template {string} HR @template {string} HS @template {string} Pr_C @template {string} PRS @template {UrlParseRes<HR,HS,Pr_C,PRS,string>} T @arg {T} x @arg {PN} pathname @template {T extends infer E extends T?E["pathname"] extends PN?E:never:never} R @returns {x is R} */
	static is_url_with_pathname(x,pathname) {
		/** @arg {R} x */
		function use_r(x) {x; use_r_2(x);}
		/** @arg {R} x */
		function use_r_2(x) {x; use_r(x);}
		return x.pathname===pathname;
	}
	/** @typedef {G_ResponseTypes} DecodeReturn */
	/** @public @arg {DU_UrlType} url_type @arg {{}} x @returns {DecodeReturn|null} */
	decode_json_response(url_type,x) {
		/** @private @type {T_Split<DU_UrlType,".">} */
		let target=split_string(url_type,".");
		/** @private @type {DecodeReturn|null} */
		let res=null;
		switch(target[0]) {
			case "account": res=this.decode_return_account(target,x); break;
			case "att": res=this.decode_return_res_att(target,x); break;
			case "browse": res=this.decode_return_browse(target,x); break;
			case "like": res=this.decode_return_like(target,x); break;
			case "live_chat": res=this.decode_return_live_chat(target,x); break;
			case "music": res=this.decode_return_music(target,x); break;
			case "notification": res=this.decode_return_notification(target,x); break;
			case "reel": res=this.decode_return_reel(target,x); break;
			case "subscription": res=this.decode_return_subscription(target,x); break;
			case "playlist": res=this.decode_return_playlist(target,x); break;
			case "share": res=this.decode_return_share(target,x); break;
			case "pdg": res=this.decode_return_pdg(target,x); break;
		}
		switch(target.length) {case 1: res=this.decode_return_length_1(target,x); break;}
		if(res) return res;
		console.log("[log_get_res_data]",target,x);
		{debugger;}
		return {
			type: "_Generic",
			data: x,
		};
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["like",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_like(target,x) {
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
	/**
	 * @param {D_ApiUrlFormat} api_url
	 */
	get_pathname_str(api_url) {
		const res_parse=this._convert_url_to_obj(api_url);
		let ss_arg=split_string_once(res_parse.pathname,"/")[1];
		if(this.str_starts_with_rx("youtubei/v1/",ss_arg)) {
			return split_string_once(ss_arg,"youtubei/v1/")[1];
		} else {
			return ss_arg;
		}
	}
	/** @public @arg {D_ApiUrlFormat} api_url */
	decode_url(api_url) {
		const res_parse=this._convert_url_to_obj(api_url);
		if("_tag" in res_parse) {
			console.log("parse failed (should never happen)",api_url,res_parse);
			throw new Error("unreachable");
		}
		let path_parts=split_string(split_string_once(res_parse.pathname,"/")[1],"/");
		let result=this.ps.get_url_type(path_parts);
		if(!result) {
			let ss2=this.get_pathname_str(api_url);
			return this.join_string(split_string(ss2,"/"),".");
		}
		return result;
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,[any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_length_1(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["reel",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_reel(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["notification",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_notification(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["live_chat",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_live_chat(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["att",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_res_att(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["account",any]>} target @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_account(target,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["pdg",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_pdg(t,x) {
		switch(t[1]) {
			case "get_pdg_buy_flow": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_PdgBuyFlow} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["music",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_music(t,x) {
		switch(t[1]) {
			case "get_search_suggestions": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SearchSuggestions} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["share",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_share(t,x) {
		switch(t[1]) {
			case "get_share_panel": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_SharePanel} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["playlist",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_playlist(t,x) {
		switch(t[1]) {
			case "get_add_to_playlist": return {
				type: `${t[0]}.${t[1]}`,
				/** @private @type {RSG_AddToPlaylist} */
				data: as(x),
			};
			default: debugger; return null;
		}
	}
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["subscription",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_subscription(t,x) {
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
	/** @private @arg {Extract<T_Split<DU_UrlType,".">,["browse",...any]>} t @arg {{}} x @returns {DecodeReturn|null} */
	decode_return_browse(t,x) {
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
	/** @public @arg {true} x */
	expect_true(x) {if(x!==true) debugger;}
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with(str,needle) {return this.str_starts_with_rx(needle,str);}
	/** @public @arg {`/@${string}`} x */
	canonicalBaseUrl(x) {if(!this.str_starts_with(x,"/@")) debugger;}
	/** @public @arg {string} x */
	_previousCsn(x) {console.log(base64_dec.decode_str(x));}
	/** @public @template {{targetId:string}} T @template {string} U @arg {U} w @arg {T} x @returns {x is {targetId:`${U}${string}`}} */
	starts_with_targetId(x,w) {return this.str_starts_with(x.targetId,w);}
	/** @public @template {{targetId:string}} T @arg {T} x @returns {x is {targetId:D_TargetIdUuid}} */
	is_yt_uuid_targetId(x) {return this.is_yt_uuid(x.targetId);}
	/** @public @arg {CF_TD_Params} cf @arg {CF_P_ParamParse} path @arg {K} k @template {`${string}Params`} K @template {{[U in K]:string;}} T @arg {T} x */
	TD_Params(cf,path,k,x) {const {[k]: a}=this.s(cf,x); this.params(path,a);}
	/** @public @arg {CF_T_Icon_Any} cf @template {string} T @arg {T_Icon<T>} x @arg {T[]} ty_arr */
	T_Icon_AnyOf(cf,x,ty_arr) {
		const {iconType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		const is_missing_iconType=!ty_arr.includes(iconType);
		if(is_missing_iconType) {console.log(`[missing_icon.${cf}]`,iconType);}
		this.save_primitive("IconType",iconType);
		return is_missing_iconType;
	}
	/** @public @template {string} T @arg {T[]} expected_arr @arg {T[]} missing_arr @arg {CF_onMissingIcon} cf @arg {T_Icon<T>} icon @template {{icon:T_Icon<T>;}} U @arg {U} x */
	onMissingIcon(cf,icon,x,expected_arr,missing_arr) {
		expected_arr.push(icon.iconType);
		missing_arr.push(icon.iconType);
		let arr_items=JSON.stringify(missing_arr,null,"\t");
		console.group("-- [D_Button.codegen] --");
		try {
			console.log("-- [D_Button.icon] --",arr_items);
			this.codegen_typedef(cf,x);
		} finally {console.groupEnd();}
	}
	/** @private @arg {string} key @arg {Uint8Array} data @arg {number} [idx] */
	save_next_byte(key,data,idx=0) {
		let f=data[idx];
		/** @type {`${typeof key}.data[${typeof idx}]`} */
		let rk=`${key}.data[${idx}]`;
		/** @type {`${typeof rk}=${typeof f}`} */
		let k=`${rk}=${f}`;
		this.save_primitive(rk,f);
		this.save_primitive(k,1);
	}
	/** @public @arg {R_MenuNavigationItem} x */
	R_MenuNavigationItem(x) {this.H_s("menuNavigationItemRenderer",x,this.D_MenuNavigationItem);}
	/** @private @arg {D_MenuNavigationItem} x */
	D_MenuNavigationItem(x) {
		const cf="D_MenuNavigationItem";
		const {trackingParams,text,icon,navigationEndpoint,accessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.G_Text(text);
		if(icon) {
			switch(icon.iconType) {
				default: this.codegen_typedef(cf,x); break;
				case "FEEDBACK": case "INFO":
			}
		}
		this.xr.G_MenuNavigationItem_NavEP(navigationEndpoint);
		this.t(accessibility,this.D_Accessibility);
	}
	/** @private @template {RD_MenuServiceItem} T @arg {"RD_MenuServiceItem"} cf @arg {T} x */
	RD_MenuServiceItem_Omit(cf,x) {
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x);
		this.G_Text(text);
		let res=this.RD_MenuServiceItem_serviceEndpoint(serviceEndpoint);
		this.t(res,([t,x]) => (this.cq(t,"Signal"),this.xm.G_ClientSignal(x)));
		this.trackingParams(trackingParams);
		return y;
	}
	/** @private @type {string[]} */
	service_menu_icons=[];
	/** @arg {string} cf @arg {string} x */
	new_service_icon(cf,x) {
		if(this.service_menu_icons.includes(x)) return;
		this.service_menu_icons.push(x);
		this.cg.codegen_all_service_menu_icons(this.service_menu_icons,cf);
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
		if("buttonRenderer" in x) return this.xm.R_Button(x);
		if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
		if("playlistLoopButtonRenderer" in x) return this.R_PlaylistLoopButton(x);
		if("toggleButtonRenderer" in x) return this.xm.R_ToggleButton(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {DE_Feedback} x */
	DE_Feedback(x) {
		const cf="DE_Feedback";
		const {feedbackToken,uiActions,actions,...y}=this.s(cf,x); this.g(y);
		this.save_b64_binary("DE_Feedback.feedbackToken",feedbackToken);
		this.t(uiActions,this.D_HideEnclosingContainer);
		this.t(actions,x => this.z(x,this.DE_Feedback_ActionItem));
	}
	/** @private @arg {D_HideEnclosingContainer} x */
	D_HideEnclosingContainer(x) {if(!this.eq_keys(this.get_keys_of(x),["hideEnclosingContainer"])) debugger; let q=Object.values(x); if(q.length!==1) debugger; if(q[0]!==true) debugger;}
	/** @private @arg {DE_RecordNotificationInteractions} x */
	DE_RecordNotificationInteractions(x) {
		const cf="DE_RecordNotificationInteractions";
		const {serializedInteractionsRequest,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("notification.record_interactions",serializedInteractionsRequest);
		this.tz(actions,this.A_HideEnclosing);
	}
	/** @private @arg {RD_MenuServiceItem["serviceEndpoint"]} x */
	RD_MenuServiceItem_serviceEndpoint(x) {
		const cf="RD_MenuServiceItem_serviceEndpoint";
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		if("signalServiceEndpoint" in x) return this.TE_SignalService_I_0(x);
		if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
		if("addToPlaylistServiceEndpoint" in x) return this.E_AddToPlaylistService(x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("getReportFormEndpoint" in x) return this.E_GetReportForm(x);
		if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
		if("recordNotificationInteractionsEndpoint" in x) return this.E_RecordNotificationInteractions(x);
		if("notificationOptOutEndpoint" in x) return this.E_NotificationOptOut(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {DE_Feedback_ActionItem} x */
	DE_Feedback_ActionItem(x) {
		if("filterChipTransformCommand" in x) return this.C_FilterChipTransform(x);
		if("replaceEnclosingAction" in x) return this.A_ReplaceEnclosing(x);
		debugger;
	}
	/** @public @arg {R_PlaylistLoopButton} x */
	R_PlaylistLoopButton(x) {this.H_s("playlistLoopButtonRenderer",x,this.D_PlaylistLoopButton);}
	/** @public @arg {R_SegmentedLikeDislikeButton} x */
	R_SegmentedLikeDislikeButton(x) {this.H_s("segmentedLikeDislikeButtonRenderer",x,this.D_SegmentedLikeDislikeButton);}
	/** @private @template T @arg {T_SE_Signal<M_SendPost,T>} x @returns {["Signal",T]} */
	TE_SignalService_I_0(x) {
		const cf="TE_SignalService_I_0";
		const {clickTrackingParams,commandMetadata,signalServiceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(clickTrackingParams);
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
		const cf="D_SegmentedLikeDislikeButton";
		if("likeButton" in x) {
			const {likeButton,dislikeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.xm.R_ToggleButton(likeButton);
			this.xm.R_ToggleButton(dislikeButton);
			return;
		}
		const {style,size,isDisabled,text,serviceEndpoint,icon,tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_primitive(`${cf}.style`,style);
		this.save_primitive(`${cf}.size`,size);
		if(isDisabled!==false) debugger;
		this.G_Text(text);
		this.E_ShareEntityService(serviceEndpoint);
		if(icon.iconType!=="SHARE") debugger;
		if(tooltip!=="Share") debugger;
		this.trackingParams(trackingParams);
		this.D_Accessibility(accessibilityData);
	}
	/** @private @arg {C_FilterChipTransform} x */
	C_FilterChipTransform(x) {let [a,y]=this.TE_Endpoint_2("C_FilterChipTransform","filterChipTransformCommand",x); this.g(y); this.D_ChipUniqueId(a);}
	/** @private @arg {DE_GetReportForm} x */
	DE_GetReportForm(x) {this.D_Params("DE_GetReportForm","get_report_form.params",x);}
	/** @private @arg {DE_NotificationOptOut} x */
	DE_NotificationOptOut(x) {
		const cf="DE_NotificationOptOut";
		const {optOutText: a,serializedOptOut: b,serializedRecordInteractionsRequest: c,...y}=this.s(cf,x); this.g(y);
		this.G_Text(a);
		let un_b=atob(b);
		let no_uri_b=decodeURIComponent(un_b);
		this.params("notification.opt_out",no_uri_b);
		this.params("notification.record_interactions",c);
	}
	/** @private @arg {G_DE_UserFeedback} x */
	DE_UserFeedback(x) {
		const cf="DE_UserFeedback";
		if("additionalDatas" in x) {
			const {additionalDatas,...y}=this.s(cf,x); this.g(y);
			this.z(additionalDatas,this.G_AdditionalDataItem);
			return;
		}
		const {hack,bucketIdentifier,...y}=this.s(cf,x); this.g(y);
		this.cq(hack,true);
		this.save_primitive(`${cf}.bucketIdentifier`,bucketIdentifier);
	}
	/** @private @arg {DC_ChipUniqueId} x */
	D_ChipUniqueId(x) {
		const cf="D_ChipUniqueId";
		const {chipUniqueId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(chipUniqueId) {
			case "ATTRIBUTE_FILTER_TYPE_EXPLORE": break;
		}
	}
	/** @private @arg {R_PlaylistLoopButtonState} x */
	R_PlaylistLoopButtonState(x) {this.H_s("playlistLoopButtonStateRenderer",x,this.D_PlaylistLoopButtonState);}
	/** @private @arg {D_PlaylistLoopButtonState} x */
	D_PlaylistLoopButtonState(x) {
		const cf="D_PlaylistLoopButtonState";
		const {state,button,...y}=this.s(cf,x); this.g(y);
		this.save_enum(cf,"PLAYLIST_LOOP_STATE",state);
		this.xm.R_Button(button);
	}
	/** @private @arg {R_NotificationText} x */
	R_NotificationText(x) {this.H_s("notificationTextRenderer",x,this.D_NotificationText);}
	/** @private @arg {D_NotificationText} x */
	D_NotificationText(x) {
		const cf="D_NotificationText";
		if("undoText" in x) {
			const {successResponseText,undoText,undoEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_Text(successResponseText);
			this.G_Text(undoText);
			this.E_UndoFeedback(undoEndpoint);
			this.trackingParams(trackingParams);
			return;
		}
		const {successResponseText,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(successResponseText);
		this.trackingParams(trackingParams);
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
	/** @public @arg {string} cf @arg {string} x */
	save_b64_binary(cf,x) {
		this.t(base64_url_dec.decodeByteArray(x),x => {
			if(x[0]===0) {
				this.save_primitive(`${cf}.bytes.1`,x[1]);
			}
			this.save_primitive(`${cf}.bytes.0`,x[0]);
		});
	}
	/** @private @arg {string} x */
	parse_undo_token(x) {this.save_b64_binary("undo_token",x);}
	/** @private @arg {DC_ScrollToEngagementPanel} x */
	DC_ScrollToEngagementPanel(x) {
		const cf="DC_ScrollToEngagementPanel";
		const {targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
	}
	/** @public @arg {C_ScrollToEngagementPanel} x */
	C_ScrollToEngagementPanel(x) {
		const cf="C_ScrollToEngagementPanel";
		const {clickTrackingParams,scrollToEngagementPanelCommand,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.clickTrackingParams(clickTrackingParams);
		this.DC_ScrollToEngagementPanel(scrollToEngagementPanelCommand);
	}
	/** @public @arg {C_RepeatChapter} x */
	C_RepeatChapter(x) {let [a,y]=this.TE_Endpoint_2("C_RepeatChapter","repeatChapterCommand",x); this.g(y); this.DC_RepeatChapter(a);}
	/** @private @arg {DC_RepeatChapter} x */
	DC_RepeatChapter(x) {
		const cf="DC_RepeatChapter";
		const {repeat,startTimeMs,endTimeMs,repeatStateEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
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
		const cf="D_LoggingDirectives_Gestures"; this.k(cf,x);
		let inner=this.T_Types(x);
		if(inner!==4) {
			inner===""; this.codegen_typedef(cf,x);
		}
	}
	/** @private @arg {C_UpdateToggleButtonState} x */
	C_UpdateToggleButtonState(x) {let [a,b]=this.TE_Endpoint_2("C_UpdateToggleButtonState","updateToggleButtonStateCommand",x); this.g(b); this.DC_UpdateToggleButtonState(a);}
	/** @private @arg {DC_UpdateToggleButtonState} x */
	DC_UpdateToggleButtonState(x) {
		const cf="DC_UpdateToggleButtonState",{toggled: a,buttonId: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(a);
		this.save_enum(cf,"TOGGLE_BUTTON_ID_TYPE",b);
	}
	/** @private @arg {C_Loop} x */
	C_Loop(x) {let [a,b]=this.TE_Endpoint_2("C_Loop","loopCommand",x); this.g(b); this.DC_Loop(a);}
	/** @private @arg {DC_Loop} x */
	DC_Loop(x) {this.y("DC_Loop","loop",x,x => this.cq(x,false));}
	/** @private @arg {C_EntityUpdate} x */
	C_EntityUpdate(x) {let [a,y]=this.TE_Endpoint_2("C_EntityUpdate","entityUpdateCommand",x); this.g(y); this.R_EntityBatchUpdate(a);}
	/** @public @arg {DC_EntityBatchUpdate} x */
	R_EntityBatchUpdate(x) {this.H_s("entityBatchUpdate",x,this.DR_DC_EntityBatchUpdate);}
	/** @public @arg {DR_DC_EntityBatchUpdate} x */
	DR_DC_EntityBatchUpdate(x) {
		const cf="DR_DC_EntityBatchUpdate";
		const {mutations,timestamp,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(mutations,this.G_DE_MutationItem);
		this.t(timestamp,this.D_TimestampWithNanos);
	}
	/** @private @arg {D_TimestampWithNanos} x */
	D_TimestampWithNanos(x) {
		const cf="D_TimestampWithNanos";
		const {seconds,nanos,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(seconds);
		this.a_primitive_num(nanos);
	}
	/** @private @arg {G_DE_MutationItem} x */
	G_DE_MutationItem(x) {
		switch(x.type) {
			default: debugger; break;
			case "ENTITY_MUTATION_TYPE_DELETE": this.DE_MutationDelete(x); break;
			case "ENTITY_MUTATION_TYPE_REPLACE": this.DU_MutationReplace(x); break;
		}
	}
	/** @private @arg {DE_MutationReplace} x */
	DU_MutationReplace(x) {
		const cf="DU_MutationReplace";
		const {entityKey,type,payload,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("entity.key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_REPLACE") debugger;
		let pr=this.G_EY_Entity(payload);
		if(!pr) return;
		this.XP_EntityPayload(pr);
	}
	/** @private @arg {DS_EY_MacroMarkersList} x */
	DS_EY_MacroMarkersList(x) {
		const cf="DS_EY_MacroMarkersList";
		const {key,...y}=this.s(cf,x);
		this.params("macro_markers_list.entity.key",key);
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
		this.ht.C_Innertube(onActive);
	}
	/** @private @arg {DE_YpcGetOfflineUpsell} x */
	DE_YpcGetOfflineUpsell(x) {this.D_Params("DE_YpcGetOfflineUpsell","ypc_get_offline_upsell.params",x);}
	/** @private @arg {D_MarkersList} x */
	D_MarkersList(x) {
		const cf="D_MarkersList";
		const {markerType,markers,headerTitle,onTap,loggingDirectives,...y}=this.s(cf,x); this.g(y);
		if(markerType!=="MARKER_TYPE_TIMESTAMPS") debugger;
		this.z(markers,this.D_MarkerItem);
		this.G_Text(headerTitle);
		this.ht.C_Innertube(onTap);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_EY_Offlineability} x */
	D_EY_Offlineability(x) {
		const cf="D_EY_Offlineability";
		if("command" in x) {
			const {key,command,addToOfflineButtonState,contentCheckOk,racyCheckOk,loggingDirectives,...y}=this.s(cf,x); this.g(y);
			this.params("entity.key",key);
			this.ht.C_Innertube(command);
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
		this.params("entity.key",key);
	}
	/** @private @arg {DS_EY_TranscriptTrackSelection} x */
	DS_EY_TranscriptTrackSelection(x) {
		const cf="DS_EY_TranscriptTrackSelection";
		const {key,selectedTrackIndex,serializedParams,...y}=this.s(cf,x); this.g(y);
		this.params("transcript_track_selection.entity.key",key);
		this.save_primitive(`${cf}.selectedTrackIndex`,selectedTrackIndex);
		this.params("transcript_track_selection.serialized_params",serializedParams);
	}
	/** @private @arg {DS_EY_Subscription} x */
	DS_EY_Subscription(x) {
		const cf="DS_EY_Subscription";
		const {key,subscribed,...y}=this.s(cf,x); this.g(y);
		this.params("subscription_state.key",key);
		this.a_primitive_bool(subscribed);
	}
	/** @private @arg {DS_EY_PlaylistLoop} x */
	DS_EY_PlaylistLoop(x) {
		const cf="DS_EY_PlaylistLoop";
		const {key,state,...y}=this.s(cf,x); this.g(y);
		this.params("playlist_loop_state.entity.key",key);
		switch(state) {
			default: debugger; break;
			case "PLAYLIST_LOOP_STATE_ALL":
			case "PLAYLIST_LOOP_STATE_NONE":
			case "PLAYLIST_LOOP_STATE_ONE":
		}
	}
	/** @private @arg {DS_EY_TranscriptSearchBox} x */
	DS_EY_TranscriptSearchBox(x) {
		const cf="DS_EY_TranscriptSearchBox";
		const {key,isHidden,...y}=this.s(cf,x); this.g(y);
		this.params("entity.key",key);
		if(isHidden!==false) debugger;
	}
	/** @arg {string} k @arg {{}} x */
	XP_EntityPayload_Any(k,x) {
		const cf="XP_EntityPayload_Any";
		if("key" in x) {
			const {key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			console.log(`unknown.${this.uppercase_first(k)}.key`,key);
			return;
		}
		debugger;
	}
	/** @arg {(G_EY_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?[keyof I,null,V]:never:never)|["unknown",string,{}]} p */
	XP_EntityPayload(p) {
		const [ty,k,x]=p;
		switch(ty) {
			default: debugger; break;
			case "offlineabilityEntity": this.D_EY_Offlineability(x); break;
			case "subscriptionStateEntity": this.DS_EY_Subscription(x); break;
			case "playlistLoopStateEntity": this.DS_EY_PlaylistLoop(x); break;
			case "transcriptTrackSelectionEntity": this.DS_EY_TranscriptTrackSelection(x); break;
			case "transcriptSearchBoxStateEntity": this.DS_EY_TranscriptSearchBox(x); break;
			case "macroMarkersListEntity": this.DS_EY_MacroMarkersList(x); break;
			case "unknown": this.XP_EntityPayload_Any(k,x); break;
		}
	}
	/** @private @arg {"G_EY_Entity"} cf @template V @arg {{[U in `${string}Entity`]:V}} x */
	G_EY_Entity_Any(cf,x) {return this.w(`G_EY_Entity_Any:${cf}`,this.get_keys_of(x)[0],x);}
	/**
	 * @public @arg {G_EY_Entity} x
	 * @returns {(G_EY_Entity extends infer I?I extends {[U in `${string}Entity`]:infer V}?[keyof I,null,V]|null:null:never)|["unknown",string,{}]}
	 */
	G_EY_Entity(x) {
		const cf="G_EY_Entity";
		{const cn="subscriptionStateEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="transcriptTrackSelectionEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="transcriptSearchBoxStateEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="offlineabilityEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="playlistLoopStateEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="macroMarkersListEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="superThanksSelectedTierEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		{const cn="subscriptionNotificationStateEntity"; if(cn in x) return [cn,null,this.G_EY_Entity_Any(cf,x)];}
		/** @returns {[]|[string]} */
		const get_kl=() => {return this.get_keys_of(x);};
		let kl=get_kl();
		if(kl.length===0) return null;
		let [cn,...cr]=kl;
		if(cr.length!==0) debugger;
		if(!cn) return null;
		x===""; this.codegen_typedef(cf,x);
		this.codegen_typedef(`${cf}$entity`,this.G_EY_Entity_Any(cf,x));
		return ["unknown",cn,this.G_EY_Entity_Any(cf,x)];
	}
	/** @private @arg {DE_MutationDelete} x */
	DE_MutationDelete(x) {
		const cf="DE_MutationDelete";
		const {entityKey,type,options,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("entity.key",entityKey);
		if(type!=="ENTITY_MUTATION_TYPE_DELETE") debugger;
		this.tf(this.O_DU_Persistence)(options);
	}
	/** @private @arg {O_DU_Persistence} x */
	O_DU_Persistence(x) {
		const cf="O_DU_Persistence";
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
	/** @public @arg {C_AddToPlaylist} x */
	C_AddToPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_AddToPlaylist","addToPlaylistCommand",x); this.g(y); this.DC_AddToPlaylist(a);}
	/** @private @arg {C_ChangeMarkersVisibility} x */
	C_ChangeMarkersVisibility(x) {let [a,b]=this.TE_Endpoint_2("C_ChangeMarkersVisibility","changeMarkersVisibilityCommand",x); this.g(b); this.DC_ChangeMarkersVisibility(a);}
	/** @public @arg {C_AdsControlFlowOpportunityReceived} x */
	C_AdsControlFlowOpportunityReceived(x) {let [a,b]=this.TE_Endpoint_2("C_AdsControlFlowOpportunityReceived","adsControlFlowOpportunityReceivedCommand",x); this.g(b); this.DC_AdsControlFlowOpportunityReceived(a);}
	/** @public @arg {C_ChangeKeyedMarkersVisibility} x */
	C_ChangeKeyedMarkersVisibility(x) {let [a,b]=this.TE_Endpoint_2("C_ChangeKeyedMarkersVisibility","changeKeyedMarkersVisibilityCommand",x); this.g(b); this.DC_ChangeKeyedMarkersVisibility(a);}
	/** @public @arg {C_LoadMarkers} x */
	C_LoadMarkers(x) {let [a,b]=this.TE_Endpoint_2("C_LoadMarkers","loadMarkersCommand",x); this.g(b); this.DC_LoadMarkers(a);}
	/** @public @arg {C_ReloadContinuationItems} x */
	C_ReloadContinuationItems(x) {let [a,b]=this.TE_Endpoint_2("C_ReloadContinuationItems","reloadContinuationItemsCommand",x); this.g(b); this.DC_ReloadContinuationItems(a);}
	/** @type {string[]} */
	DC_AddToPlaylist_listTypes=[
		"PLAYLIST_EDIT_LIST_TYPE_QUEUE",
	];
	/** @private @arg {DC_AddToPlaylist} x */
	DC_AddToPlaylist(x) {
		const cf="DC_AddToPlaylist";
		this.save_primitive(`${cf}.listType`,x.listType);
		if(!this.DC_AddToPlaylist_listTypes.includes(x.listType)) {
			let known=this.DC_AddToPlaylist_listTypes;
			this.DC_AddToPlaylist_listTypes.push(x.listType);
			this.codegen_typedef(cf,x);
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
			this.params("change_markers_visibility.entity.key",x);
		});
	}
	/** @private @arg {DS_CreatePlaylist} x */
	DS_CreatePlaylist(x) {
		const cf="DS_CreatePlaylist";
		const {params,videoIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(params,x => this.params("create_playlist.params",x));
		this.z(videoIds,this.videoId);
	}
	/** @public @arg {RC_ResponseContext} x */
	RC_ResponseContext(x) {
		if(!x) {debugger; return;}
		const cf="RC_ResponseContext";
		const {mainAppWebResponseContext,serviceTrackingParams,webResponseContextExtensionData,consistencyTokenJar,maxAgeSeconds,stateTags,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(mainAppWebResponseContext,this.RC_MainAppWebResponseContext);
		this.tz(serviceTrackingParams,x => {
			const service_tracking=this.x.get("service_tracking");
			service_tracking.set_service_params(x);
		});
		this.t(webResponseContextExtensionData,this.RC_WR_ContextExtension);
		this.t(consistencyTokenJar,this.RC_ConsistencyTokenJar);
		if(maxAgeSeconds!==void 0) this.a_primitive_num(maxAgeSeconds);
		this.t(stateTags,this.RCA_RelevantStateTags);
	}
	/** @public @arg {R_TwoColumnWatchNextResults} x */
	R_TwoColumnWatchNextResults(x) {this.H_s("twoColumnWatchNextResults",x,this.D_TwoColumnWatchNextResults);}
	/** @private @arg {RC_MainAppWebResponseContext} x */
	RC_MainAppWebResponseContext(x) {
		const cf="RC_MainAppWebResponseContext";
		const {datasyncId,loggedOut,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(datasyncId);
		this._primitive_of(loggedOut,"boolean");
	}
	/** @private @arg {RC_ConsistencyTokenJar} x */
	RC_ConsistencyTokenJar(x) {
		const cf="RC_ConsistencyTokenJar";
		const {encryptedTokenJarContents,expirationSeconds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(encryptedTokenJarContents);
		if(expirationSeconds!=="600") debugger;
	}
	/** @private @arg {RC_WR_ContextExtension} x */
	RC_WR_ContextExtension(x) {
		const cf="RC_WR_ContextExtension";
		const {hasDecorated,ytConfigData,webPrefetchData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(hasDecorated!==void 0) this._primitive_of(hasDecorated,"boolean");
		this.t(ytConfigData,x => this.D_YtConfig(x));
		this.t(webPrefetchData,this.D_WebPrefetch);
	}
	/** @private @arg {D_YtConfig} x */
	D_YtConfig(x) {
		const cf="D_YtConfig";
		const {visitorData,sessionIndex,rootVisualElementType: rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(visitorData);
		if(sessionIndex!==0) debugger;
		this.rootVe(rootVe);
	}
	known_ve_arr=[4724,83769,3611,3832,3854,5754,6827,11487,12924,23462,37414,42352,96368];
	/** @public @arg {D_GM_VeNum} x */
	rootVe(x) {
		if(!this.known_ve_arr.includes(x)) debugger;
	}
	/** @private @arg {RCA_RelevantStateTags} x */
	RCA_RelevantStateTags(x) {
		const cf="RCA_RelevantStateTags";
		const {relevantStateTags,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(relevantStateTags,this.B_StateTag);
	}
	/** @public @arg {B_StateTag} x */
	B_StateTag(x) {
		const cf="StateTag";
		if(x.stateTag!==3) debugger;
		if("instruction" in x) {
			const {stateTag: {},instruction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(instruction!=="STATE_TAG_BROWSE_INSTRUCTION_MARK_AS_DIRTY") debugger;
			return;
		}
		const {stateTag: {},onStateTagModified,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(onStateTagModified!=="STATE_TAG_CACHE_INSTRUCTION_EVICT_RESPONSE") debugger;
	}
	/** @public @arg {R_PlayerOverlay} x */
	R_PlayerOverlay(x) {this.H_s("playerOverlayRenderer",x,this.D_PlayerOverlay);}
	/** @private @arg {D_WebPrefetch} x */
	D_WebPrefetch(x) {
		const cf="D_WebPrefetch";
		const {navigationEndpoints,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(navigationEndpoints,x => {
			if("watchEndpoint" in x) {return this.E_Watch(x);}
		});
	}
	/** @private @arg {T_Results<G_Watch_ResultsItem>} x */
	D_WatchResults(x) {const cf="D_WatchResults",{results: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ return a;}
	/** @private @arg {G_Watch_ResultsItem} x */
	G_Watch_ResultsItem(x) {
		const cf="G_Watch_ResultsItem";
		let {trackingParams,contents: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(a,this.G_WatchResult_ContentsItem);
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
	/** @private @arg {R_RelatedChipCloud} x */
	R_RelatedChipCloud(x) {this.H_s("relatedChipCloudRenderer",x,this.D_RelatedChipCloud);}
	/** @private @arg {G_Watch_AnyResultItem} x */
	G_Watch_AnyResultItem(x) {
		const cf="G_SecondaryContentsItem";
		if("relatedChipCloudRenderer" in x) return this.R_RelatedChipCloud(x);
		if("itemSectionRenderer" in x) return this.RG_Watch_ItemSection(x);
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {G_Watch_SecondaryResults_Contents} x */
	G_Watch_SecondaryResults_Contents(x) {
		const cf="G_Watch_SecondaryResults_Contents";
		const {contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.G_Watch_AnyResultItem);
	}
	/** @private @arg {G_Watch_SecondaryResults_Results} x */
	G_Watch_SecondaryResults_Results(x) {
		const cf="G_Watch_SecondaryResults_Results";
		const {results,trackingParams,continuations,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(results,this.G_Watch_AnyResultItem);
		this.trackingParams(trackingParams);
		if(continuations&&continuations.length>0) debugger;
	}
	/** @private @arg {G_Watch_SecondaryResults} x */
	G_Watch_SecondaryResults(x) {
		const cf="G_Watch_SecondaryResults";
		if("contents" in x) return this.G_Watch_SecondaryResults_Contents(x);
		if("results" in x) return this.G_Watch_SecondaryResults_Results(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_LiveChat} x */
	R_LiveChat(x) {this.H_s("liveChatRenderer",x,this.D_LiveChat);}
	/** @private @arg {D_TwoColumnWatchNextResults} x */
	D_TwoColumnWatchNextResults(x) {
		const cf="D_TwoColumnWatchNextResults";
		const {results,secondaryResults,playlist,autoplay,conversationBar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let u=this.D_WatchResults(results);
		this.G_Watch_ResultsItem(u);
		this.T_SecondaryResults(secondaryResults,this.G_Watch_SecondaryResults);
		this.t(playlist,a => this.T_Playlist(a,this.D_PlaylistContent));
		this.t(autoplay,a => this.T_Autoplay(a,this.D_AutoplayContent));
		this.t(conversationBar,x => {
			if("liveChatRenderer" in x) return this.R_LiveChat(x);
			if("conversationBarRenderer" in x) return this.xr.R_ConversationBar(x);
			debugger;
		});
	}
	/** @private @arg {DC_LoadMarkers} x */
	DC_LoadMarkers(x) {
		const cf="DC_LoadMarkers";
		const {entityKeys,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entityKeys,this.DC_Load_EntityKey);
	}
	/** @private @arg {DC_ChangeKeyedMarkersVisibility} x */
	DC_ChangeKeyedMarkersVisibility(x) {
		const cf="DC_ChangeKeyedMarkersVisibility";
		const {isVisible,key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(isVisible!==true) debugger;
		if(key!=="HEATSEEKER") debugger;
	}
	/** @private @arg {D_PlayerOverlay} x */
	D_PlayerOverlay(x) {
		const cf="D_PlayerOverlay";
		if("browserMediaSession" in x) return this.D_BrowserMediaSession(x);
		const {endScreen,shareButton,addToMenu,videoDetails,...y}=this.s(cf,x);
		this.R_WatchNextEndScreen(endScreen);
		this.xm.R_Button(shareButton);
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
	/** @public @arg {R_DesktopTopbar} x */
	R_DesktopTopbar(x) {this.H_s("desktopTopbarRenderer",x,this.D_DesktopTopbar);}
	/** @private @arg {R_DecoratedPlayerBar} x */
	R_DecoratedPlayerBar(x) {this.H_s("decoratedPlayerBarRenderer",x,this.D_DecoratedPlayerBar);}
	/** @private @arg {R_AutoplaySwitchButton} x */
	R_AutoplaySwitchButton(x) {this.H_s("autoplaySwitchButtonRenderer",x,this.D_AutoplaySwitchButton);}
	/** @private @arg {R_PlayerOverlayAutoplay} x */
	R_PlayerOverlayAutoplay(x) {this.H_s("playerOverlayAutoplayRenderer",x,this.D_PlayerOverlayAutoplay);}
	/** @private @arg {R_WatchNextEndScreen} x */
	R_WatchNextEndScreen(x) {this.H_s("watchNextEndScreenRenderer",x,this.D_WatchNextEndScreen);}
	/** @private @arg {R_PlayerOverlayVideoDetails} x */
	R_PlayerOverlayVideoDetails(x) {this.H_s("playerOverlayVideoDetailsRenderer",x,this.D_PlayerOverlayVideoDetails);}
	/** @public @arg {R_CinematicContainer} x */
	R_CinematicContainer(x) {this.H_s("cinematicContainerRenderer",x,this.D_CinematicContainer);}
	/** @private @arg {D_CinematicContainer} x */
	D_CinematicContainer(x) {
		const cf="D_CinematicContainer";
		const {backgroundImageConfig,gradientColorConfig,presentationStyle,config,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(backgroundImageConfig,this.D_TrackedThumbnail);
		this.D_GradientColorConfig(gradientColorConfig);
		this.t(presentationStyle,x => this.save_enum(cf,"CINEMATIC_CONTAINER_PRESENTATION_STYLE",x));
		this.D_CinematicConfig(config);
	}
	/** @private @arg {D_CinematicContainer["config"]} x */
	D_CinematicConfig(x) {
		const cf="D_CinematicConfig";
		const {lightThemeBackgroundColor,darkThemeBackgroundColor,animationConfig,colorSourceSizeMultiplier,applyClientImageBlur,bottomColorSourceHeightMultiplier,maxBottomColorSourceHeight,colorSourceWidthMultiplier,colorSourceHeightMultiplier,blurStrength,...u}=this.s(cf,x);
		this.save_primitive(`${cf}.lightBackground.color`,lightThemeBackgroundColor);
		this.save_primitive(`${cf}.darkBackground.color`,darkThemeBackgroundColor);
		this.t(x.animationConfig,x => {
			const cf="D_CinematicAnimationConfig";
			const {minImageUpdateIntervalMs,crossfadeDurationMs,crossfadeStartOffset,maxFrameRate,...y}=this.s(cf,x); this.g(y);
			this.save_primitive(`${cf}.minImageUpdateIntervalMs`,minImageUpdateIntervalMs);
			this.save_primitive(`${cf}.crossfadeDurationMs`,crossfadeDurationMs);
			this.save_primitive(`${cf}.crossfadeStartOffset`,crossfadeStartOffset);
			this.save_primitive(`${cf}.maxFrameRate`,maxFrameRate);
		});
		this.save_primitive(`${cf}.colorSourceSizeMultiplier`,colorSourceSizeMultiplier);
		this.t(applyClientImageBlur,x => this.cq(x,true));
		this.t(bottomColorSourceHeightMultiplier,x => this.save_primitive(`${cf}.bottomColorSourceHeightMultiplier`,x));
		this.t(maxBottomColorSourceHeight,x => this.save_primitive(`${cf}.maxBottomColorSourceHeight`,x));
		this.t(colorSourceWidthMultiplier,x => this.save_primitive(`${cf}.colorSourceWidthMultiplier`,x));
		this.t(colorSourceHeightMultiplier,x => this.save_primitive(`${cf}.colorSourceHeightMultiplier`,x));
		this.t(blurStrength,x => this.save_primitive(`${cf}.blurStrength`,x));
		const {watchFullscreenConfig,...y}=u; this.g(y);/*#destructure_done*/
		this.t(watchFullscreenConfig,this.g);
	}
	/** @private @arg {D_PlayerOverlayVideoDetails} x */
	D_PlayerOverlayVideoDetails(x) {
		const cf="D_PlayerOverlayVideoDetails";
		const {title,subtitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(subtitle);
	}
	/** @private @arg {D_PlaylistContent} x */
	D_PlaylistContent(x) {
		const {...u}=this.D_PlaylistContent_Omit(x);/*#destructure_done*/
		if("isEditable" in u) {
			const {isEditable,...y}=u; y;
			this._primitive_of(isEditable,"boolean");
			return;
		}
		const {totalVideos,totalVideosText,endpoint,videoCountText,...u1}=u; u1;
		this.a_primitive_num(totalVideos);
		this.G_Text(totalVideosText);
		this.E_VE5754(endpoint);
		this.G_Text(videoCountText);
		if("menu" in u1&&"playerInfoView" in u1) {
			const {menu,playerInfoView,playlistShareUrl,...y}=u1; this.g(y);
			this.R_Menu(menu);
			return;
		}
		if("menu" in u1) {
			const {menu,playlistShareUrl,...y}=u1; this.g(y);
			this.R_Menu(menu);
			return;
		}
		if("continuations" in u1) {
			const {continuations,badges,playlistShareUrl,...y}=u1; this.g(y);
			this.z(continuations,this.CD_Next);
			this.z(badges,this.RMD_Badge);
			return;
		}
		debugger;
	}
	/** @private @arg {G_Watch_ContentsItem} x */
	G_WatchResult_ContentsItem(x) {
		const cf="G_WatchResult_ContentsItem";
		if("itemSectionRenderer" in x) return this.G_WatchResultItem_ItemSectionGroup(x);
		if("merchandiseShelfRenderer" in x) return this.R_MerchandiseShelf(x);
		if("videoPrimaryInfoRenderer" in x) return this.R_VideoPrimaryInfo(x);
		if("videoSecondaryInfoRenderer" in x) return this.ht.R_VideoSecondaryInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {RG_Watch_ItemSection} x */
	RG_Watch_ItemSection(x) {
		let [u,y]=this.TR_ItemSection(x); this.g(y);
		if(!u) return;
		let u1=this.TD_ItemSection(`TD_ItemSection_3<"sid-wn-chips","watch-next-feed">`,u);
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
	/** @private @arg {D_GradientColorConfig} x */
	D_GradientColorConfig(x) {
		{
			let c=x[0];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==0) debugger;
			this.save_primitive("dark_gradient.0",u);
		}
		{
			let c=x[1];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			this.save_primitive("dark_gradient.1",u);
		}
		{
			let c=x[2];
			/** @private @type {`${typeof c['darkThemeColor']}`} */
			let u=`${c.darkThemeColor}`;
			if(c.startLocation!==1) debugger;
			this.save_primitive("dark_gradient.2",u);
		}
	}
	/** @private @arg {D_AutoplayContent} x */
	D_AutoplayContent(x) {
		const cf="D_AutoplayContent";
		const {sets,countDownSecs,modifiedSets,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(sets,this.D_AutoplaySetItem);
		if(countDownSecs&&countDownSecs!==5) debugger;
		if(modifiedSets!==void 0) this.z(modifiedSets,this.D_ModifiedSetItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistContent} x */
	D_PlaylistContent_Omit(x) {
		const cf="D_PlaylistContent";
		const {contents,title,currentIndex,playlistId,ownerName,isInfinite,shortBylineText,longBylineText,trackingParams,titleText,localCurrentIndex,playlistButtons,isCourse,nextVideoLabel,...y}=this.s(cf,x);/*#destructure_omit*/
		this.trackingParams(trackingParams);
		this.z([ownerName,shortBylineText,longBylineText,titleText,nextVideoLabel],this.G_Text);
		this.z(contents,x => this.xm.R_PlaylistPanelVideo(x));
		this.a_primitive_str(title);
		this.a_primitive_str(playlistId);
		this.a_primitive_num(currentIndex);
		// this.parser.parse_url(cf,playlistShareUrl);
		this.save_primitive("Playlist.localCurrentIndex",localCurrentIndex);
		this.R_Menu(playlistButtons);
		this._primitive_of(isInfinite,"boolean");
		this._primitive_of(isCourse,"boolean");
		return y;
	}
	/**
	 * @private
	 * @arg {Extract<Exclude<GD_RC_SectionList,{targetId:any}>,{contents:any}>["contents"][number]["itemSectionRenderer"]} x
	 * @arg {[R_ContinuationItem[],"comment-item-section","engagement-panel-comments-section"][]} u1
	 * @arg {R_Message[]} u2
	 */
	GD_RC_SectionList_p2_ItemSection(x,u1,u2) {
		if("targetId" in x) {
			let r=this.TD_ItemSection(`TD_ItemSection_3<"comment-item-section","engagement-panel-comments-section">`,x);
			if(r===null) return;
			u1.push(r);
			return;
		}
		let r=this.TD_ItemSection(`TD_ItemSection_1<any>`,x);
		if(r===null) return;
		let [v,...z]=r;
		if(z.length!==0) debugger;
		u2.push(...v);
	}
	/**
	 * @private
	 * @arg {Extract<Exclude<GD_RC_SectionList,{targetId:any}>,{contents:any}>["contents"][number]} x
	 * @arg {[R_ContinuationItem[],"comment-item-section","engagement-panel-comments-section"][]} u1
	 * @arg {R_Message[]} u2
	 */
	GD_RC_SectionList_p2_contentItem(x,u1,u2) {
		const {itemSectionRenderer,...y}=x; this.g(y);
		this.GD_RC_SectionList_p2_ItemSection(itemSectionRenderer,u1,u2);
	}
	/** @public @arg {[R_ContinuationItem[],"comment-item-section","engagement-panel-comments-section"]} x */
	GD_RC_SectionList_res_1(x) {
		let [u,k1,k2]=x;
		if(k1!=="comment-item-section") {debugger; return;}
		if(k2!=="engagement-panel-comments-section") {debugger; return;}
		this.z(u,this.R_ContinuationItem);
	}
	/** @public @arg {Extract<Exclude<GD_RC_SectionList,{targetId:any}>,{contents:any}>} x */
	GD_RC_SectionList_p2(x) {
		const cf="GD_RC_SectionList_p2";
		const {contents: arr,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!arr) {debugger; return;}
		/** @type {[R_ContinuationItem[],"comment-item-section","engagement-panel-comments-section"][]} */
		let ux_1=[];
		/** @type {R_Message[]} */
		let ux_2=[];
		for(let item of arr) this.GD_RC_SectionList_p2_contentItem(item,ux_1,ux_2);
		this.z(ux_1,x => {
			this.GD_RC_SectionList_res_1(x);
		});
		this.trackingParams(trackingParams);
	}
	/** @public @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
	GT_ShortsSurfaceIdentifier(x) {
		const cf="GT_ShortsSurfaceIdentifier";
		const {surface,tag,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		switch(tag) {
			case "engagement-panel-structured-description": break;
			case "shorts-comments-panel": break;
			default: debugger; break;
		}
		return tag;
	}
	/** @public @arg {D_TrackedThumbnail} x */
	D_TrackedThumbnail(x) {
		const cf="D_TrackedThumbnail"; this.codegen_typedef(cf,{x});
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.t_cf(cf,trackingParams,this.trackingParams);
	}
	/** @template {number} T @arg {T} x @returns {`${T}`} */
	num_to_string(x) {return `${x}`;}
	/** @private @arg {D_PlayerOverlayAutoplay} x */
	D_PlayerOverlayAutoplay(x) {
		const cf="D_PlayerOverlayAutoplay";
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
		this.xm.R_Button(cancelButton);
		this.xm.R_Button(nextButton);
		this.xm.R_Button(closeButton);
		if(preferImmediateRedirect) debugger;
		if(webShowBigThumbnailEndscreen) debugger;
		if(!webShowNewAutonavCountdown) debugger;
		if(countDownSecsForFullscreen!==3) debugger;
	}
	/** @private @arg {D_ModifiedSetItem} x */
	D_ModifiedSetItem(x) {
		const cf="D_ModifiedSetItem";
		const {autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(autoplayVideo,this.E_WatchPlaylist);
		this.t(nextButtonVideo,this.E_WatchPlaylist);
		this.t(previousButtonVideo,this.E_WatchPlaylist);
	}
	/** @private @arg {D_AutoplaySetItem_ButtonVideoEP} x */
	D_AutoplaySetItem_ButtonVideoEP(x) {
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("watchPlaylistEndpoint" in x) return this.E_WatchPlaylist(x);
		debugger;
	}
	/** @private @arg {D_AutoplaySetItem} x */
	D_AutoplaySetItem(x) {
		const cf="D_AutoplaySetItem";
		switch(x.mode) {
			case "LOOP": {
				const {mode: {},autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.E_Watch(autoplayVideo);
				this.t(nextButtonVideo,this.E_Watch);
				this.D_AutoplaySetItem_ButtonVideoEP(previousButtonVideo);
			} break;
			case "NORMAL": {
				const {mode: {},autoplayVideo,nextButtonVideo,previousButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.E_Watch(autoplayVideo);
				this.t(nextButtonVideo,this.E_Watch);
				this.t(previousButtonVideo,this.E_Watch);
			} break;
			case "SHUFFLE": {
				const {mode: {},autoplayVideo,nextButtonVideo,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.E_Watch(autoplayVideo);
				this.E_Watch(nextButtonVideo);
			} break;
		}
	}
	/** @public @arg {CF_parse_identifier} cf @arg {Record<"identifier",unknown>} x */
	force_parse_identifier(cf,x) {
		const {identifier,...a}=this.s(cf,x); this.g(a);
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
		this.codegen_typedef(cf,x);
	}
	/** @public @arg {CF_D_Menu_Omit} cf @template {D_Omit_Compact_Player} T @arg {T} x */
	D_Omit_Compact_Player(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		return y;
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {D_Omit_Compact_Video} T @arg {T} x */
	D_Omit_Compact_Video(cf,x) {
		let u=this.D_Omit_Compact_Player(cf,x);
		let {videoId,shortViewCountText,publishedTimeText,...y}=this.xm.D_Omit_ThumbnailOverlay(cf,u);
		this.videoId(videoId);
		this.G_Text(publishedTimeText);
		this.G_Text(shortViewCountText);
		return y;
	}
	/** @private @arg {D_WatchNextEndScreen} x */
	D_WatchNextEndScreen(x) {
		const cf="D_WatchNextEndScreen";
		const {results,title,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(results,this.G_WatchNextEndScreenItem);
		this.G_Text(title);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_BrowserMediaSession} x */
	D_BrowserMediaSession(x) {
		const cf="D_BrowserMediaSession";
		const {actions,browserMediaSession,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,this.R_LikeButton);
		this.R_BrowserMediaSession(browserMediaSession);
	}
	/** @private @arg {string} x */
	DC_Load_EntityKey(x) {this.params("load_markers.entity.key",x);}
	/** @private @arg {D_DecoratedPlayerBar} x */
	D_DecoratedPlayerBar(x) {
		const cf="D_DecoratedPlayerBar";
		const {playerBar,...y}=this.s(cf,x);
		if("playerBarActionButton" in y) {
			const {playerBarActionButton,...y1}=this.s(cf,y); this.g(y1);/*#destructure_done*/
			return this.xm.R_Button(playerBarActionButton);
		}
		this.g(y);
	}
	/** @private @arg {D_AutoplaySwitchButton} x */
	D_AutoplaySwitchButton(x) {
		const cf="D_AutoplaySwitchButton";
		const {onEnabledCommand,onDisabledCommand,enabledAccessibilityData,disabledAccessibilityData,trackingParams,enabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([onEnabledCommand,onDisabledCommand],(x) => {
			const cf="E_SetSettingAutonavForDesktop";
			const {clickTrackingParams,commandMetadata,setSettingEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(clickTrackingParams);
			if(commandMetadata.webCommandMetadata.apiUrl!=="/youtubei/v1/account/set_setting") debugger;
			this.M_SetSetting(commandMetadata);
			this.T_DE_SettingItem_AutonavForDesktop(setSettingEndpoint);
		});
		this.D_Accessibility(enabledAccessibilityData);
		this.D_Accessibility(disabledAccessibilityData);
		this.trackingParams(trackingParams);
		this.a_primitive_bool(enabled);
	}
	/** @private @arg {D_DesktopTopbar} x */
	D_DesktopTopbar(x) {
		const cf="D_DesktopTopbar";
		const {logo,searchbox,trackingParams,countryCode,topbarButtons,hotkeyDialog,backButton,forwardButton,a11ySkipNavigationButton,voiceSearchButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TopbarLogo(logo);
		this.R_FusionSearchbox(searchbox);
		this.trackingParams(trackingParams);
		if(countryCode!=="CA") debugger;
		this.z(topbarButtons,this.G_TopbarButtonItem);
		this.R_HotkeyDialog(hotkeyDialog);
		this.xm.R_Button(backButton);
		this.xm.R_Button(forwardButton);
		this.xm.R_Button(a11ySkipNavigationButton);
		this.xm.R_Button(voiceSearchButton);
	}
	/** @public @arg {R_ProductList} x */
	R_ProductList(x) {this.H_s("productListRenderer",x,this.D_ProductList);}
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
	/** @private @arg {D_RelatedChipCloud} x */
	D_RelatedChipCloud(x) {this.y("D_RelatedChipCloud","content",x,this.R_ChipCloud);}
	/** @private @arg {D_ProductList} x */
	D_ProductList(x) {
		const cf="D_ProductList";
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_ProductListItem);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {D_ReloadContinuationData} x */
	D_ReloadContinuationData(x) {
		const cf="D_ReloadContinuationData";
		const {reloadContinuationData,...y}=this.s(cf,x); this.g(y);
		this.D_Continuation(reloadContinuationData);
	}
	/** @private @arg {D_Continuation} x */
	D_Continuation(x) {
		const cf="D_Continuation";
		const {continuation,clickTrackingParams,...y}=this.s(cf,x); this.g(y);
		this.params("continuation.params",continuation);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @public @arg {R_LiveChatHeader} x */
	R_LiveChatHeader(x) {this.H_s("liveChatHeaderRenderer",x,this.D_LiveChatHeader);}
	/** @private @arg {D_LiveChatHeader} x */
	D_LiveChatHeader(x) {
		const cf="D_LiveChatHeader";
		const {overflowMenu,collapseButton,viewSelector,...y}=this.s(cf,x); this.g(y);
		this.R_Menu(overflowMenu);
		this.xm.R_Button(collapseButton);
		this.R_SortFilterSubMenu(viewSelector);
	}
	/** @public @arg {D_ClientMessages} x */
	D_ClientMessages(x) {this.k("D_ClientMessages",x); this.z(Object.values(x),this.G_Text);}
	/** @private @arg {D_LiveChat} x */
	D_LiveChat(x) {
		const cf="D_LiveChat";
		const {continuations,header,trackingParams,clientMessages,isReplay,initialDisplayState,showHideButton,...y}=this.s(cf,x); this.g(y);
		this.z(continuations,x => {
			if(!x.reloadContinuationData) debugger;
			this.D_ReloadContinuationData(x);
		});
		this.R_LiveChatHeader(header);
		this.trackingParams(trackingParams);
		this.D_ClientMessages(clientMessages);
		this.t(isReplay,this.a_primitive_bool);
		this.save_enum(cf,"LIVE_CHAT_DISPLAY_STATE",initialDisplayState);
		this.xm.R_ToggleButton(showHideButton);
	}
	/** @private @arg {R_TopbarLogo} x */
	R_TopbarLogo(x) {this.H_s("topbarLogoRenderer",x,this.D_TopbarLogo);}
	/** @private @arg {R_FusionSearchbox} x */
	R_FusionSearchbox(x) {this.H_s("fusionSearchboxRenderer",x,this.D_FusionSearchbox);}
	/** @private @arg {R_HotkeyDialog} x */
	R_HotkeyDialog(x) {this.H_s("hotkeyDialogRenderer",x,this.D_HotkeyDialog);}
	/** @private @arg {DC_AdsControlFlowOpportunityReceived} x */
	DC_AdsControlFlowOpportunityReceived(x) {
		const cf="DC_AdsControlFlowOpportunityReceived";
		const {opportunityType,adSlotAndLayoutMetadata,isInitialLoad,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_enum(cf,"OPPORTUNITY_TYPE",opportunityType);
		this.tz(adSlotAndLayoutMetadata,(this.D_AdSlotAndLayoutItem));
		this._primitive_of(isInitialLoad,"boolean");
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {D_HotkeyDialog} x */
	D_HotkeyDialog(x) {
		const cf="D_HotkeyDialog";
		const {title,sections,dismissButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(sections,this.R_HotkeyDialogSection);
		this.xm.R_Button(dismissButton);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_TopbarLogo} x */
	D_TopbarLogo(x) {
		const cf="D_TopbarLogo";
		const {iconImage,tooltipText,endpoint,trackingParams,overrideEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.T_Icon(`${cf}:iconImage`,iconImage);
		this.G_Text(tooltipText);
		this.E_VE3854(endpoint);
		this.trackingParams(trackingParams);
		this.a_primitive_str(overrideEntityKey);
	}
	/** @public @arg {D_SerializedAdServingDataEntry} x */
	D_SerializedAdServingDataEntry(x) {this.H_s("serializedAdServingDataEntry",x,x => this.params("ad_layout.ad_serving_data_entry",x));}
	/** @private @arg {R_DisplayAd} x */
	R_DisplayAd(x) {this.H_s("displayAdRenderer",x,this.D_DisplayAd);}
	/** @private @arg {D_DisplayAd} x */
	D_DisplayAd(x) {
		const cf="D_DisplayAd";
		const {trackingParams,layout,titleText,image,bodyText,secondaryText,badge,menu,ctaButton,impressionEndpoints,clickCommand,mediaHoverOverlay,mediaBadge,...y}=this.s(cf,x);
		let k=this.get_keys_of(y);
		if(k.length>0) console.log("[D_DisplayAd.next_keys]"+" [%s]".repeat(k.length),...k);
	}
	/** @public @arg {D_EmptyMap} x */
	D_EmptyMap(x) {
		const cf="D_ActiveView";
		const {emptyMap,...y}=this.s(cf,x); this.g(y);
		this.cq(emptyMap,true);
	}
	/** @private @arg {D_InFeedAdLayout["renderingContent"]} x */
	D_InFeedAdLayout_Content(x) {
		const cf="D_InFeedAdLayout_Content";
		if("promotedSparklesWebRenderer" in x) return this.xm.R_PromotedSparklesWeb(x);
		if("displayAdRenderer" in x) return this.R_DisplayAd(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_InFeedAdLayout} x */
	R_InFeedAdLayout(x) {this.H_s("inFeedAdLayoutRenderer",x,this.D_InFeedAdLayout);}
	/** @private @arg {D_InFeedAdLayout} x */
	D_InFeedAdLayout(x) {const {adLayoutMetadata: a,renderingContent: b,...y}=this.s("D_InFeedAdLayout",x); this.g(y); this.MG_AdLayout(a); this.D_InFeedAdLayout_Content(b);}
	/** @arg {R_VideoMastheadAdV3} x */
	R_VideoMastheadAdV3(x) {this.H_s("videoMastheadAdV3Renderer",x,this.g);}
	/** @arg {D_PageTopAdLayout} x */
	D_PageTopAdLayout(x) {
		const cf="D_PageTopAdLayout";
		const {adLayoutMetadata,renderingContent,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.MG_AdLayout(adLayoutMetadata);
		this.R_VideoMastheadAdV3(renderingContent);
	}
	/** @private @arg {R_AdActionInterstitial} x */
	R_AdActionInterstitial(x) {this.H_s("adActionInterstitialRenderer",x,this.g);}
	/** @public @arg {R_InstreamVideoAd} x */
	R_InstreamVideoAd(x) {this.H_s("instreamVideoAdRenderer",x,this.D_InstreamVideoAd);}
	/** @private @arg {D_InstreamVideoAd} x */
	D_InstreamVideoAd(x) {
		const cf="D_InstreamVideoAd";
		const {skipOffsetMilliseconds,pings,clickthroughEndpoint,csiParameters,playerVars,playerOverlay,elementId,trackingParams,legacyInfoCardVastExtension,sodarExtensionData,externalVideoId,adLayoutLoggingData,layoutId,...y}=this.s(cf,x); this.g(y);
		this.t(skipOffsetMilliseconds,this.a_primitive_num);
		this.ht.D_Pings(pings);
		if(!clickthroughEndpoint.urlEndpoint) {debugger; return;}
		this.xm.E_Url(clickthroughEndpoint);
		this.z(csiParameters,x => this.ht.D_CsiParameterItem(x));
		this.params("instream_video_ad.player_vars",playerVars);
		this.ht.R_InstreamAdPlayerOverlay(playerOverlay);
		this.save_primitive(`${cf}.elementId`,elementId);
		this.trackingParams(trackingParams);
		if(legacyInfoCardVastExtension!=="") debugger;
		this.ht.D_SodarExtensionData(sodarExtensionData);
		this.videoId(externalVideoId);
		this.D_SerializedAdServingDataEntry(adLayoutLoggingData);
		let buffer=base64_dec.decodeByteArray(layoutId);
		if(buffer) {
			let str=this._decoder.decode(buffer.slice(0,2));
			if(str!==null) console.log(str); else console.log(buffer);
		} else debugger;
	}
	/** @public @arg {R_LinearAdSequence} x */
	R_LinearAdSequence(x) {this.H_s("linearAdSequenceRenderer",x,this.D_LinearAdSequence);}
	/** @private @arg {D_LinearAdSequence} x */
	D_LinearAdSequence(x) {
		const cf="D_LinearAdSequence";
		const {adLayoutMetadata,linearAds,...y}=this.s(cf,x); this.g(y);
		this.MG_AdLayout(adLayoutMetadata);
		this.z(linearAds,this.G_LinearAdsItem);
	}
	/** @private @arg {G_LinearAdsItem} x */
	G_LinearAdsItem(x) {
		if("instreamVideoAdRenderer" in x) return this.R_InstreamVideoAd(x);
		if("adActionInterstitialRenderer" in x) return this.R_AdActionInterstitial(x);
		debugger;
	}
	/** @private @arg {MG_AdLayout} x */
	MG_AdLayout(x) {
		const cf="MG_AdLayout";
		const {layoutType,layoutId,...u}=this.s(cf,x);/*#destructure_later*/
		this.save_enum(`${cf}.layoutType`,"LAYOUT_TYPE",layoutType);
		this.save_b64_binary(`${cf}.layoutId`,layoutId);
		if(!this.is_not_empty_obj(u)) return this.g(u);
		const {adLayoutLoggingData,...y}=u; this.g(y);/*#destructure_done*/
		this.D_SerializedAdServingDataEntry(adLayoutLoggingData);
	}
	/** @private @arg {D_SerializedSlotAdServingDataEntry} x */
	D_SerializedSlotAdServingDataEntry(x) {
		const cf="D_SerializedSlotAdServingDataEntry";
		const {serializedSlotAdServingDataEntry: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("ad_slot_logging_data.serialized_slot_ad_serving_data_entry",a);
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
			this.save_primitive("AdSlot.slotId[0]",Number(n));
			this.save_primitive("AdSlot.slotId[1..]",sid.slice(1).map(e => Number.parseInt(e,10)));
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
	/** @public @arg {DMD_AdSlot} x */
	DMD_AdSlot(x) {
		const cf="DMD_AdSlot",u=this.DMD_AdSlot_Omit(cf,x);
		if("adSlotLoggingData" in u) {
			const {adSlotLoggingData,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			return this.D_SerializedSlotAdServingDataEntry(adSlotLoggingData);
		}
		this.g(u);
	}
	/** @private @arg {D_AdSlotAndLayoutItem} x */
	D_AdSlotAndLayoutItem(x) {
		const cf="D_AdSlotAndLayoutItem";
		const {adLayoutMetadata,adSlotMetadata,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(adLayoutMetadata,this.MG_AdLayout);
		this.DMD_AdSlot(adSlotMetadata);
	}
	/** @private @arg {D_FusionSearchbox} x */
	D_FusionSearchbox(x) {
		const cf="D_FusionSearchbox";
		const {icon,placeholderText,config,trackingParams,searchEndpoint,clearButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.T_Icon("D_Icon_Search",icon);
		this.G_Text(placeholderText);
		this.R_WebSearchboxConfig(config);
		this.trackingParams(trackingParams);
		this.E_Search(searchEndpoint);
		this.xm.R_Button(clearButton);
	}
	/** @private @arg {`ReloadContinuation.slot.${"body"|"header"}.targetId`} cf @arg {DC_ReloadContinuationItems["targetId"]} x */
	DC_ReloadContinuationItem_TargetId(cf,x) {
		if(this.is_yt_uuid(x)) return;
		this.save_primitive(cf,x);
	}
	/** @private @arg {DC_ReloadContinuationItems} x */
	DC_ReloadContinuationItems(x) {
		const cf="DC_ReloadContinuationItems";
		switch(x.slot) {
			case "RELOAD_CONTINUATION_SLOT_BODY": {
				if("continuationItems" in x) {
					const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
					this.targetId(cf,targetId);
					this.DC_ReloadContinuationItem_TargetId("ReloadContinuation.slot.body.targetId",targetId);
					this.z(continuationItems,a => {this.save_primitive("continuationItem",a);});
					return;
				}
				const {targetId,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.DC_ReloadContinuationItem_TargetId("ReloadContinuation.slot.body.targetId",targetId);
			} break;
			case "RELOAD_CONTINUATION_SLOT_HEADER": {
				const {targetId,continuationItems,...y}=this.DC_ReloadContinuationItems_Omit(cf,x); this.g(y);
				this.targetId(cf,targetId);
				this.DC_ReloadContinuationItem_TargetId("ReloadContinuation.slot.header.targetId",targetId);
				this.t(continuationItems,x => this.z_ty(x,x => {
					if("commentsHeaderRenderer" in x) return this.R_CommentsHeader(x);
					if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
					debugger;
				},x[0]));
			} break;
			default: debugger; break;
		};
	}
	/** @public @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {this.H_s("feedFilterChipBarRenderer",x,this.D_FeedFilterChipBar);}
	/** @private @arg {D_FeedFilterChipBar} x */
	D_FeedFilterChipBar(x) {
		const cf="D_FeedFilterChipBar";
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(trackingParams);
		this.xm.t(nextButton,this.xm.R_Button);
		this.xm.t(previousButton,this.xm.R_Button);
		switch(styleType) {
			default: debugger; break;
			case "FEED_FILTER_CHIP_BAR_STYLE_TYPE_CHANNEL_PAGE_GRID": break;
			case "FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT": break;
		}
		this.save_enum(cf,"FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {CD_Next} x */
	CD_Next(x) {this.y("CD_Next","nextContinuationData",x,this.D_CD_Next);}
	/** @private @arg {R_ProductListItem} x */
	R_ProductListItem(x) {this.H_s("productListItemRenderer",x,this.D_ProductListItem);}
	/** @private @arg {R_MerchandiseShelf} x */
	R_MerchandiseShelf(x) {this.H_s("merchandiseShelfRenderer",x,this.D_MerchandiseShelf);}
	/** @private @arg {R_VideoPrimaryInfo} x */
	R_VideoPrimaryInfo(x) {this.H_s("videoPrimaryInfoRenderer",x,this.D_VideoPrimaryInfo);}
	/** @private @arg {D_VideoPrimaryInfo} x */
	D_VideoPrimaryInfo(x) {
		const cf="D_VideoPrimaryInfo";
		const {title,viewCount,videoActions,trackingParams,updatedMetadataEndpoint,superTitleLink,superTitleIcon,badges,dateText,relativeDateText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.R_VideoViewCount(viewCount);
		this.R_Menu(videoActions);
		this.trackingParams(trackingParams);
		this.t(updatedMetadataEndpoint,this.E_UpdatedMetadata);
		this.t(superTitleLink,this.G_Text);
		this.t(superTitleIcon,x => this.T_Icon(cf,x));
		this.tz(badges,this.RMD_Badge);
		this.G_Text(dateText);
		this.t(relativeDateText,this.G_Text);
	}
	/** @private @arg {R_ChipCloud} x */
	R_ChipCloud(x) {this.H_s("chipCloudRenderer",x,this.D_ChipCloud);}
	/** @private @arg {R_WebSearchboxConfig} x */
	R_WebSearchboxConfig(x) {this.H_s("webSearchboxConfig",x,this.D_WebSearchboxConfig);}
	/** @private @arg {R_BrowserMediaSessionRenderer} x */
	R_BrowserMediaSession(x) {this.H_s("browserMediaSessionRenderer",x,this.g);}
	/** @private @arg {R_HotkeyDialogSection} x */
	R_HotkeyDialogSection(x) {this.H_s("hotkeyDialogSectionRenderer",x,this.D_HotkeyDialogSection);}
	/** @public @arg {R_ContinuationItem} x */
	R_ContinuationItem(x) {this.H_s("continuationItemRenderer",x,this.D_ContinuationItem);}
	/** @private @arg {GE_Continuation} x */
	GE_Continuation(x) {
		const cf="GE_Continuation"; this.k(cf,x);
		if("getNotificationMenuEndpoint" in x) return this.E_GetNotificationMenu(x);
		if("continuationCommand" in x) return this.xr.C_Continuation(x);
		if("getTranscriptEndpoint" in x) return this.E_GetTranscript(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_GhostGrid} x */
	R_GhostGrid(x) {this.H_s("ghostGridRenderer",x,this.D_GhostGrid);}
	/** @private @arg {D_GhostGrid} x */
	D_GhostGrid(x) {
		const cf="D_GhostGrid";
		const {rows,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(this.get_keys_of(x).join()!=="rows") debugger;
		if(rows!==2) debugger;
	}
	/** @private @arg {D_ContinuationItem} x */
	D_ContinuationItem(x) {
		const cf="D_ContinuationItem";
		const {trigger,continuationEndpoint,ghostCards,button,...y}=this.s(cf,x); this.g(y);
		this.t(trigger,x => {
			this.cq(x,"CONTINUATION_TRIGGER_ON_ITEM_SHOWN");
			this.save_enum(`${cf}.trigger`,"CONTINUATION_TRIGGER",x);
		});
		this.t(continuationEndpoint,this.GE_Continuation);
		this.t(ghostCards,this.R_GhostGrid);
		this.xm.t(button,this.xm.R_Button);
	}
	/** @public @arg {CF_P_ParamParse} path @arg {DC_Generic_CTP} x */
	DC_Generic_CTP(path,x) {
		const {continuation,clickTrackingParams,...y}=this.s("DC_Generic_CTP",x); this.g(y);
		this.params(path,continuation);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @private @arg {CD_Reload} x */
	CD_Reload(x) {
		this.y("CD_Reload","reloadContinuationData",x,x => this.DC_Generic_CTP("reload.continuation",x));
	}
	/** @public @arg {R_CompactVideo} x */
	R_CompactVideo(x) {this.H_s("compactVideoRenderer",x,this.D_CompactVideo);}
	/** @private @arg {D_CompactVideo} x */
	D_CompactVideo(x) {
		const cf="D_CompactVideo";
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
	/** @arg {R_PageTopAdLayout} x */
	R_PageTopAdLayout(x) {this.H_s("pageTopAdLayoutRenderer",x,this.D_PageTopAdLayout);}
	/** @arg {D_FulfilledLayout_Item} x */
	D_FulfilledLayout_Item(x) {
		if("inFeedAdLayoutRenderer" in x) return this.R_InFeedAdLayout(x);
		if("pageTopAdLayoutRenderer" in x) return this.R_PageTopAdLayout(x);
		debugger;
	}
	/** @private @arg {R_FulfilledLayout} x */
	R_FulfillmentLayout(x) {this.H_s("fulfilledLayout",x,this.D_FulfilledLayout_Item);}
	/** @public @arg {R_AdSlot} x */
	R_AdSlot(x) {this.H_s("adSlotRenderer",x,this.D_AdSlot);}
	/** @private @arg {D_AdSlot} x */
	D_AdSlot(x) {
		const cf="D_AdSlot";
		const {adSlotMetadata,fulfillmentContent,enablePacfLoggingWeb,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DMD_AdSlot(adSlotMetadata);
		this.R_FulfillmentLayout(fulfillmentContent);
		this._primitive_of(enablePacfLoggingWeb,"boolean");
	}
	/** @private @arg {G_Watch_SecondaryResults_G_SectionItem} x */
	G_Watch_SecondaryResults_G_SectionItem(x) {
		const cf="G_Watch_SecondaryResults_G_SectionItem";
		if("compactRadioRenderer" in x) return this.R_CompactRadio(x);
		if("compactVideoRenderer" in x) return this.R_CompactVideo(x);
		if("compactPlaylistRenderer" in x) return this.R_CompactPlaylist(x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("" in x) return;
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_TopbarButtonItem} x */
	G_TopbarButtonItem(x) {
		const cf="G_TopbarButtonItem";
		if("topbarMenuButtonRenderer" in x) return this.R_TopbarMenuButton(x);
		if("notificationTopbarButtonRenderer" in x) return this.R_NotificationTopbarButton(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {SI_DB_EngagementPanel_Ads} x */
	SI_DB_EngagementPanel_Ads(x) {
		const cf="SI_DB_EngagementPanel_Ads";
		const {content,targetId: {},visibility,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_AdsEngagementPanelContent(content);
		if(visibility!=="ENGAGEMENT_PANEL_VISIBILITY_HIDDEN") debugger;
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,{itemSectionRenderer:any}>} x */
	G_WatchResultItem_ItemSectionGroup(x) {
		if(this.is_ItemSectionRendererTemplate(x)) return this.G_WatchResultItem_ItemSection_3(x);
		if(x.itemSectionRenderer.sectionIdentifier!=="comments-entry-point") debugger;
		let u=this.TR_ItemSection_2(x); if(!u) return;
		this.TD_ItemSection_2_CommentsEntryPoint(u,this.R_CommentItemSection_EntryPoint);
	}
	/** @private @arg {G_WatchNextEndScreenItem} x */
	G_WatchNextEndScreenItem(x) {
		const cf="G_WatchNextEndScreenItem";
		if("endScreenPlaylistRenderer" in x) return this.R_EndScreenPlaylist(x);
		if("endScreenVideoRenderer" in x) return this.xm.R_EndScreenVideo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_VideoViewCount} x */
	R_VideoViewCount(x) {this.H_s("videoViewCountRenderer",x,this.D_VideoViewCount);}
	/** @private @arg {D_VideoViewCount} x */
	D_VideoViewCount(x) {
		const cf="D_VideoViewCount";
		const {viewCount,shortViewCount,extraShortViewCount,isLive,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(viewCount);
		this.t(shortViewCount,this.G_Text);
		this.t(extraShortViewCount,this.G_Text);
		this.t(isLive,this.a_primitive_bool);
	}
	/** @private @arg {R_CommentReplyDialog} x */
	R_CommentReplyDialog(x) {this.H_("commentReplyDialogRenderer",x,this.D_CommentReplyDialog);}
	/** @private @arg {D_CommentReplyDialog} x */
	D_CommentReplyDialog(x) {
		const cf="D_CommentReplyDialog";
		const {replyButton,cancelButton,authorThumbnail,editableText,placeholderText,errorMessage,emojiButton,emojiPicker,aadcGuidelinesStateEntityKey,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.R_Button(replyButton);
		this.xm.R_Button(cancelButton);
		this.sm.D_Thumbnail(authorThumbnail);
		this.sm.t(editableText,this.sm.G_Text);
		this.sm.G_Text(placeholderText);
		this.sm.G_Text(errorMessage);
		this.xm.R_Button(emojiButton);
		this.R_EmojiPicker(emojiPicker);
		this.sm.params("aadc_guidelines_state.entity.key",aadcGuidelinesStateEntityKey);
	}
	/** @public @arg {R_EmojiPicker} x */
	R_EmojiPicker(x) {this.H_("emojiPickerRenderer",x,this.D_EmojiPicker);}
	/** @private @arg {D_EmojiPicker} x */
	D_EmojiPicker(x) {
		const cf="D_EmojiPicker";
		const {id,categories,categoryButtons,searchPlaceholderText,searchNoResultsText,pickSkinToneText,trackingParams,clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel,...y}=this.s(cf,x); this.g(y);
		if(id!=="emoji") debugger;
		this.z(categories,x => {
			if("emojiPickerCategoryRenderer" in x) return this.R_EmojiPickerCategory(x);
			x.emojiPickerUpsellCategoryRenderer;
		});
		this.z(categoryButtons,this.R_EmojiPickerCategoryButton);
		this.sm.G_Text(searchPlaceholderText);
		this.sm.G_Text(searchNoResultsText);
		this.sm.G_Text(pickSkinToneText);
		this.z([clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel],x => this.sm.a_primitive_str(x));
	}
	/** @private @arg {R_EmojiPickerCategoryButton} x */
	R_EmojiPickerCategoryButton(x) {this.H_("emojiPickerCategoryButtonRenderer",x,this.D_EmojiPickerCategoryButton);}
	/** @private @arg {D_EmojiPickerCategoryButton} x */
	D_EmojiPickerCategoryButton(x) {
		if("targetId" in x) {
			const cf="D_EmojiPickerCategoryButton:targetId";
			const {categoryId,icon,tooltip,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
			switch(categoryId) {
				default: debugger; break;
				case "people":
			}
			this.sm.T_Icon(`${cf}:icon`,icon);
			if(tooltip!=="People") debugger;
			this.sm.D_Accessibility(accessibility);
			if(targetId!=="emoji-picker-category-button-people") debugger;
			return;
		}
		if(this.is_D_EmojiPickerCategoryButton_ForChannel(x)) {
			const cf="D_EmojiPickerCategoryButton:ForChannel";
			const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
			this.sm.channelId(categoryId);
			this.sm.T_Icon(`${cf}:icon`,icon);
			switch(tooltip) {
				default: debugger; break;
				case "Custom emoji":
				case "YouTube":
			}
			this.sm.D_Accessibility(accessibility);
			return;
		}
		const cf="D_EmojiPickerCategoryButton";
		const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.sm.T_Icon(`${cf}:icon`,icon);
		switch(tooltip) {
			default: debugger; break;
			case "Nature": case "Food": case "Travel": case "Activities": case "Objects": case "Symbols":
		}
		this.sm.D_Accessibility(accessibility);
	}
	/** @private @arg {D_EmojiPickerCategoryButton} x @returns {x is {categoryId: T_IdTemplate<"UC",D_UserIdStr>}} */
	is_D_EmojiPickerCategoryButton_ForChannel(x) {return this.sm.str_starts_with(x.categoryId,"UC");}
	/** @private @arg {R_EmojiPickerCategory} x */
	R_EmojiPickerCategory(x) {this.H_("emojiPickerCategoryRenderer",x,this.D_EmojiPickerCategory);}
	/** @private @arg {D_EmojiPickerCategory} x */
	D_EmojiPickerCategory(x) {
		if(x.categoryType==="CATEGORY_TYPE_GLOBAL") {
			const cf="D_EmojiPickerCategory:Global";
			const {categoryId,title,emojiIds,trackingParams,categoryType,...y}=this.s(cf,x); this.g(y);
			if(!this.sm.str_starts_with(categoryId,"UC")) debugger;
			this.sm.G_Text(title);
			this.z(emojiIds,x => {
				let [channel_id,parsed_emoji]=this.sm.parse_emoji_id(x);
				this.sm.channelId(channel_id);
				this.save_primitive(`${categoryId}.emojiId`,parsed_emoji);
			});
			this.sm.channelId(categoryId);
			this.sm.trackingParams(trackingParams);
			return;
		}
		const cf="D_EmojiPickerCategory";
		const {categoryId,title,emojiIds,trackingParams,imageLoadingLazy,categoryType,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "people": case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.sm.G_Text(title);
		this.z(emojiIds,x => {
			this.save_primitive(`${categoryId}.emojiId`,x);
		});
		this.sm.trackingParams(trackingParams);
		if(imageLoadingLazy!==true) debugger;
		if(categoryType!=="CATEGORY_TYPE_UNICODE") debugger;
	}
	/** @private @arg {D_VideoId} x */
	D_VideoId(x) {this.y("D_VideoId","videoId",x,this.videoId);}
	/** @public @arg {R_VideoOwner} x */
	R_VideoOwner(x) {this.H_s("videoOwnerRenderer",x,this.D_VideoOwner);}
	/** @private @arg {D_VideoOwner} x */
	D_VideoOwner(x) {
		const cf="D_VideoOwner";
		let u=this.D_VideoOwner_Omit(cf,x); const {navigationEndpoint,badges,...y}=this.s(`${cf}:1`,u); this.g(y);/*#destructure_done*/
		this.tz(badges,this.RMD_Badge);
	}
	/** @private @arg {"D_VideoOwner"} cf @arg {D_VideoOwner} x */
	D_VideoOwner_Omit(cf,x) {
		const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,...y}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		this.t(subscriberCountText,this.G_Text);
		this.t(subscriptionButton,this.D_SubscriptionButton);
		this.xm.t(membershipButton,this.xm.R_Button);
		return y;
	}
	/** @private @arg {D_SubscriptionButton} x */
	D_SubscriptionButton(x) {
		const cf="D_SubscriptionButton";
		const {type,subscribed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.save_primitive("button.type",type);
		this.t(subscribed,this.a_primitive_bool);
	}
	/** @private @arg {D_MerchandiseShelf} x */
	D_MerchandiseShelf(x) {
		const cf="D_MerchandiseShelf";
		const {title,items,trackingParams,showText,hideText,actionButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.z(items,this.R_MerchandiseItem);
		this.trackingParams(trackingParams);
		this.a_primitive_str(showText);
		this.a_primitive_str(hideText);
		this.R_Menu(actionButton);
	}
	/** @private @arg {D_ProductListItem} x */
	D_ProductListItem(x) {
		const cf="D_ProductListItem";
		const {thumbnail,accessibilityTitle,title,trackingParams,price,onClickCommand,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*///#destructure
		this.D_Thumbnail(thumbnail);
		this.a_primitive_str(accessibilityTitle);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		if(!this.str_starts_with(price,"CA$")) debugger;
		if(!onClickCommand.urlEndpoint) debugger;
		this.xm.E_Url(onClickCommand);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {DC_RelatedChip} x */
	DC_RelatedChip(x) {
		const cf="DC_RelatedChip";
		const {targetSectionIdentifier,loadCached,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(targetSectionIdentifier!=="sid-wn-chips") debugger;
		if(loadCached!==true) debugger;
		this.ht.tz(contents,this.ht.G_RelatedItem);
	}
	/** @private @arg {C_RelatedChip} x */
	C_RelatedChip(x) {let [a,y]=this.TE_Endpoint_2("C_RelatedChip","relatedChipCommand",x); this.g(y); this.DC_RelatedChip(a);}
	/** @private @arg {D_ChipCloudChip_navigationEndpoint} x */
	D_ChipCloudChip_navigationEndpoint(x) {
		const cf="D_ChipCloudChip_navigationEndpoint";
		if("continuationCommand" in x) return this.xr.C_Continuation(x);
		if("relatedChipCommand" in x) return this.C_RelatedChip(x);
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {"D_ChipCloudChip_WithNav"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_OmitNav(cf,x) {
		const {navigationEndpoint: a,...y}=this.s(cf,x);
		this.D_ChipCloudChip_navigationEndpoint(a);
		return y;
	}
	/** @private @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_WithNav(x) {
		const cf="D_ChipCloudChip_WithNav";
		let {text,trackingParams,...u}=this.D_ChipCloudChip_OmitNav(cf,x);
		this.G_Text(text);
		this.trackingParams(trackingParams);
		if("style" in u) {
			const {style,...z}=u;
			this.D_ChipCloudChip_Style(cf,style);
			if("isSelected" in z) {
				const {isSelected,...y}=z; this.g(y);
				this.a_primitive_bool(isSelected);
				return;
			}
			if("uniqueId" in z) {
				const {uniqueId: b,...y}=z; this.g(y);/*#destructure_done*/
				if(b!=="ATTRIBUTE_FILTER_TYPE_EXPLORE") debugger;
				return;
			}
			if("targetId" in z) {
				const {targetId: a,...y}=z; this.g(y);/*#destructure_done*/
				if(a!=="feed_filter_chip_bar_second_chip") debugger;
				return;
			}
			this.g(z);
			return;
		}
		if("isSelected" in u) {
			const {isSelected,...y}=u; this.g(y);
			this.a_primitive_bool(isSelected);
			return;
		}
		this.g(u);
	}
	/** @arg {CF_D_ChipCloudChip_Omit} cf @private @template {D_ChipCloudChip} T @arg {T} x */
	D_ChipCloudChip_Omit(cf,x) {
		const {text: b,trackingParams: c,...y}=this.s(cf,x);
		this.G_Text(b);
		this.trackingParams(c);
		return y;
	}
	/** @private @arg {string} cf @arg {Extract<D_ChipCloudChip,{style:any}>["style"]} x */
	D_ChipCloudChip_Style(cf,x) {
		let ia=this.xm.get_strings_map_item(cf);
		ia.push(["style.styleType",[x.styleType]]);
		switch(x.styleType) {
			default: debugger; break;
			case "STYLE_DEFAULT":
			case "STYLE_HOME_FILTER":
			case "STYLE_REFRESH_TO_NOVEL_CHIP":
		}
	}
	/** @private @arg {Extract<Exclude<D_ChipCloudChip,{navigationEndpoint:any}>,{isSelected:any}>} x */
	D_ChipCloudChip_WithSelection(x) {
		const cf="D_ChipCloudChip_WithSelection";
		let d=this.D_ChipCloudChip_Omit(cf,x);
		const {style,isSelected,...y}=this.s(cf,d); this.g(y);/*#destructure_done*/
		this.D_ChipCloudChip_Style(cf,style);
		if(isSelected!==true) debugger;
	}
	/** @public @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H_s("chipCloudChipRenderer",x,this.D_ChipCloudChip);}
	/** @private @arg {D_ChipCloudChip} x */
	D_ChipCloudChip(x) {
		if("navigationEndpoint" in x) return this.D_ChipCloudChip_WithNav(x);
		if("isSelected" in x) return this.D_ChipCloudChip_WithSelection(x);
		debugger;
	}
	/** @private @arg {D_ChipCloud} x */
	D_ChipCloud(x) {
		const cf="D_ChipCloud";
		const {chips,trackingParams,horizontalScrollable,nextButton,previousButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(chips,this.R_ChipCloudChip);
		this.trackingParams(trackingParams);
		if(horizontalScrollable!==false) debugger;
		this.xm.z([nextButton,previousButton],this.xm.R_Button);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_2<any,"comments-entry-point">>['itemSectionRenderer']['contents'][number]} x */
	R_CommentItemSection_EntryPoint(x) {
		const cf="R_CommentItemSection_EntryPoint";
		if("commentsEntryPointHeaderRenderer" in x) return this.R_CommentsEntryPointHeader(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_WebSearchboxConfig} x */
	D_WebSearchboxConfig(x) {
		const cf="D_WebSearchboxConfig";
		const {requestLanguage: a,requestDomain: b,hasOnscreenKeyboard: c,focusSearchbox: d,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!this.eq_keys([a,b],["en","ca"])) debugger;
		this.z([!c,d],x => {if(!x) debugger;});
	}
	/** @private @arg {D_HotkeyDialogSection} x */
	D_HotkeyDialogSection(x) {
		const cf="D_HotkeyDialogSection";
		const {title,options: u,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(u,this.R_HotkeyDialogSectionOption);
	}
	/** @private @arg {TA_Continuation<"browse-feedFEwhat_to_watch",G_BrowseFeed>} x */
	A_BrowseFeed(x) {
		const cf="A_BrowseFeed";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,this.G_BrowseFeed);
	}
	/** @private @arg {TA_Continuation<"watch-next-feed",G_WatchNext>} x */
	A_WatchNext(x) {
		const cf="A_WatchNext";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,x => this.xr.G_WatchNext(x));
	}
	/** @private @arg {TA_Continuation<"comments-section",G_CommentsSection>} x */
	A_CommentsSectionContinuation(x) {
		const cf="A_CommentsSectionContinuation";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,x => {
			const cf="G_CommentsSection";
			if("commentThreadRenderer" in x) return this.R_CommentThread(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			x===""; this.codegen_typedef(cf,x);
		});
	}
	/** @private @arg {R_CommentActionButtons} x */
	R_CommentActionButtons(x) {this.H_s("commentActionButtonsRenderer",x,this.D_CommentActionButtons);}
	/** @private @arg {D_CommentActionButtons} x */
	D_CommentActionButtons(x) {
		const cf="D_CommentActionButtons";
		const {likeButton,replyButton,dislikeButton,trackingParams,protoCreationMs,style,...y}=this.s(cf,x); this.g(y);
		this.xm.R_ToggleButton(likeButton);
		this.xm.R_Button(replyButton);
		this.xm.R_ToggleButton(dislikeButton);
		this.trackingParams(trackingParams);
		this.a_primitive_str(protoCreationMs);
		if(style!=="COMMENT_ACTION_BUTTON_STYLE_TYPE_DESKTOP_TOOLBAR") debugger;
	}
	/** @public @arg {R_Comment} x */
	R_Comment(x) {this.H_s("commentRenderer",x,this.D_Comment);}
	/** @private @arg {D_Comment} x */
	D_Comment(x) {
		const cf="D_Comment";
		const {authorText,authorThumbnail,actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,commentId,contentText,currentUserReplyThumbnail,voteCount,isLiked,expandButton,publishedTimeText,voteStatus,trackingParams,collapseButton,sponsorCommentBadge,replyCount,authorCommentBadge,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(authorText);
		this.D_Thumbnail(authorThumbnail);
		this.R_CommentActionButtons(actionButtons);
		this.R_Menu(actionMenu);
		x: {
			let x2=authorEndpoint;
			if(this.is_TE_VE(x2,3611)) {this.E_VE3611(x2); break x;}
			debugger;
		}
		this.a_primitive_bool(authorIsChannelOwner);
		this.a_primitive_str(commentId);
		this.G_Text(contentText);
		this.D_Thumbnail(currentUserReplyThumbnail);
		this.t(voteCount,this.G_Text);
		this.a_primitive_bool(isLiked);
		this.xm.R_Button(expandButton);
		this.G_Text(publishedTimeText);
		this.cq(voteStatus,"INDIFFERENT");
		this.trackingParams(trackingParams);
		this.xm.R_Button(collapseButton);
		sponsorCommentBadge;
		this.t(sponsorCommentBadge,x => this.xr.R_SponsorCommentBadge(x));
		this.t(replyCount,this.a_primitive_num);
		this.t(authorCommentBadge,x => this.xr.R_AuthorCommentBadge(x));
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {TA_Continuation<`comment-replies-item-${string}`,G_CommentRepliesItem>} x */
	GA_Continuation_CommentRepliesItem(x) {
		const cf="GA_Continuation_CommentRepliesItem";
		const {targetId,continuationItems,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.targetId(cf,targetId);
		this.z(continuationItems,x => {
			const cf="G_CommentRepliesItem";
			if("commentRenderer" in x) return this.R_Comment(x);
			if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
			this.codegen_typedef(cf,x);
		});
	}
	/** @public @arg {RMD_Badge} x */
	RMD_Badge(x) {this.H_s("metadataBadgeRenderer",x,this.DMD_Badge);}
	/** @private @arg {DMD_Badge} x */
	DMD_Badge(x) {
		const cf="DMD_Badge";
		this.save_enum(cf,"BADGE_STYLE_TYPE",x.style);
		let ia=this.xm.get_strings_map_item(x.style);
		switch(x.style) {
			default: x===0; debugger; break;
			case "BADGE_STYLE_TYPE_AD": case "BADGE_STYLE_TYPE_COLLECTION":
			case "BADGE_STYLE_TYPE_YPC":
			case "BADGE_STYLE_TYPE_SIMPLE": {
				const {style: {},trackingParams,label,...y}=this.s(cf,x);/*#destructure_later*/
				this.trackingParams(trackingParams);
				ia.push(["label",[label]]);
				if("icon" in y) {
					const {icon,...y1}=y; this.g(y1);
					ia.push(["icon",[icon.iconType]]);
					return;
				}
				this.g(y);
			} break;
			case "BADGE_STYLE_TYPE_MEDIUM_GREY": {
				const {icon,style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_MediumGray",icon);
				this.trackingParams(trackingParams);
				ia.push(["label",[label]]);
			} break;
			case "BADGE_STYLE_TYPE_LIVE_NOW": {
				const {icon,style: {},trackingParams,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_LiveNow",icon);
				this.trackingParams(trackingParams);
				ia.push(["label",[label]]);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED_ARTIST": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_VerifiedArtist",icon);
				ia.push(["tooltip",[tooltip]]);
				this.trackingParams(trackingParams);
				ia.push(["accessibilityData.label",[accessibilityData.label]]);
			} break;
			case "BADGE_STYLE_TYPE_VERIFIED": {
				const {icon,style: {},tooltip,trackingParams,accessibilityData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.T_Icon("DMD_Badge_Verified",icon);
				ia.push(["tooltip",[tooltip]]);
				this.trackingParams(trackingParams);
				ia.push(["accessibilityData.label",[accessibilityData.label]]);
			} break;
		}
	}
	/** @private @arg {TR_ItemSection_2<any,any>} x @returns {x is TR_ItemSection_3<any,any,any>} */
	is_ItemSectionRendererTemplate(x) {return ("sectionIdentifier" in x.itemSectionRenderer)&&("targetId" in x.itemSectionRenderer);}
	/** @private @template {DC_ReloadContinuationItems} T @arg {"DC_ReloadContinuationItems"} cf @arg {T} x */
	DC_ReloadContinuationItems_Omit(cf,x) {
		const {slot,...y}=this.s(cf,x);
		this.save_enum(cf,"RELOAD_CONTINUATION_SLOT",x.slot);
		return y;
	}
	/** @private @arg {DC_Generic_CTP} x */
	D_CD_Next(x) {this.DC_Generic_CTP("next.continuation",x);}
	/** @public @arg {RMD_RowContainer} x */
	RMD_RowContainer(x) {this.H_s("metadataRowContainerRenderer",x,this.DMD_RowContainer);}
	/** @private @arg {R_MerchandiseItem} x */
	R_MerchandiseItem(x) {this.H_s("merchandiseItemRenderer",x,this.D_MerchandiseItem);}
	/** @private @arg {R_EndScreenPlaylist} x */
	R_EndScreenPlaylist(x) {this.H_s("endScreenPlaylistRenderer",x,this.D_EndScreenPlaylist);}
	/** @private @arg {R_TopbarMenuButton} x */
	R_TopbarMenuButton(x) {this.H_s("topbarMenuButtonRenderer",x,this.D_TopbarMenuButton);}
	/** @private @arg {R_NotificationTopbarButton} x */
	R_NotificationTopbarButton(x) {this.H_s("notificationTopbarButtonRenderer",x,this.D_NotificationTopbarButton);}
	/** @private @arg {R_CommentsEntryPointHeader} x */
	R_CommentsEntryPointHeader(x) {this.H_s("commentsEntryPointHeaderRenderer",x,this.D_CommentsEntryPointHeader);}
	/** @public @arg {R_CompactPlaylist} x */
	R_CompactPlaylist(x) {this.H_s("compactPlaylistRenderer",x,this.D_CompactPlaylist);}
	/** @public @arg {R_CompactRadio} x */
	R_CompactRadio(x) {this.H_s("compactRadioRenderer",x,this.D_CompactRadio);}
	/** @public @arg {R_EngagementPanelTitleHeader} x */
	R_EngagementPanelTitleHeader(x) {this.H_s("engagementPanelTitleHeaderRenderer",x,this.D_EngagementPanelTitleHeader);}
	/** @public @arg {R_ClipSection} x */
	R_ClipSection(x) {this.H_s("clipSectionRenderer",x,this.D_ClipSection);}
	/** @private @arg {R_AdsEngagementPanelContent} x */
	R_AdsEngagementPanelContent(x) {this.H_s("adsEngagementPanelContentRenderer",x,this.B_Hack);}
	/** @private @arg {R_CommentsHeader} x */
	R_CommentsHeader(x) {this.H_s("commentsHeaderRenderer",x,this.D_CommentsHeader);}
	/** @private @arg {D_CommentsHeader} x */
	D_CommentsHeader(x) {
		const cf="D_CommentsHeader";
		const {countText,createRenderer,sortMenu,trackingParams,titleText,commentsCount,showSeparator,customEmojis,unicodeEmojisUrl,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(countText,this.G_Text);
		this.R_CommentSimplebox(createRenderer);
		this.t(sortMenu,this.R_SortFilterSubMenu);
		this.trackingParams(trackingParams);
		this.t(titleText,this.G_Text);
		this.t(commentsCount,this.G_Text);
		this.t(showSeparator,x => this.cq(x,true));
		this.tz(customEmojis,this.D_CustomEmoji);
		this.t(unicodeEmojisUrl,x => this.ps.parse_url(cf,x));
		this.t(loggingDirectives,this.D_LoggingDirectives);
	}
	/** @private @arg {R_HotkeyDialogSectionOption} x */
	R_HotkeyDialogSectionOption(x) {this.H_s("hotkeyDialogSectionOptionRenderer",x,this.D_HotkeyDialogSectionOption);}
	/** @public @arg {R_VideoDescriptionCourseSection} x */
	R_VideoDescriptionCourseSection(x) {this.H_s("videoDescriptionCourseSectionRenderer",x,this.D_VideoDescriptionCourseSection);}
	/** @private @arg {D_VideoDescriptionCourseSection} x */
	D_VideoDescriptionCourseSection(x) {
		const cf="D_FeedNudge";
		const {sectionTitle,mediaLockups,...y}=this.s(cf,x); this.g(y);
		this.G_Text(sectionTitle);
		this.z(mediaLockups,this.R_StructuredDescriptionPlaylistLockup);
	}
	/** @private @arg {R_StructuredDescriptionPlaylistLockup} x */
	R_StructuredDescriptionPlaylistLockup(x) {this.H_s("structuredDescriptionPlaylistLockupRenderer",x,this.D_StructuredDescriptionPlaylistLockup);}
	/** @private @arg {D_StructuredDescriptionPlaylistLockup} x */
	D_StructuredDescriptionPlaylistLockup(x) {this.y("D_StructuredDescriptionPlaylistLockup","trackingParams",x,this.trackingParams);}
	/** @private @arg {R_FeedNudge} x */
	R_FeedNudge(x) {this.H_s("feedNudgeRenderer",x,this.D_FeedNudge);}
	/** @private @arg {D_FeedNudge} x */
	D_FeedNudge(x) {
		const cf="D_FeedNudge";
		const {lightIconImage,title,subtitle,dismissButton,impressionEndpoint,trackingParams,style,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(lightIconImage);
		this.G_Text(title);
		this.G_Text(subtitle);
		this.xm.R_Button(dismissButton);
		this.E_Feedback(impressionEndpoint);
		this.trackingParams(trackingParams);
		if(style!=="FEED_NUDGE_STYLE_CHIP") debugger;
		this.z(contents,this.R_ChipCloudChip);
	}
	/** @private @arg {R_Radio} x */
	R_Radio(x) {this.H_s("radioRenderer",x,this.D_Radio);}
	/** @private @arg {D_Radio} x */
	D_Radio(x) {
		const cf="D_Radio";
		let {...y}=this.Omit_Menu_Radio(cf,x);
		const {videos,...z}=this.s(cf,y); this.g(z);/*#destructure_done*/
		this.z(videos,this.R_ChildVideo);
	}
	/** @private @arg {R_ChildVideo} x */
	R_ChildVideo(x) {this.H_s("childVideoRenderer",x,this.D_ChildVideo);}
	/** @private @arg {D_ChildVideo} x */
	D_ChildVideo(x) {
		const cf="D_ChildVideo";
		let y=this.D_ChildVideo_Omit(cf,x);
		this.g(y);
	}
	/** @private @arg {CF_D_Menu_Omit} cf @template {D_Video} T @arg {T} x */
	D_Video_Omit(cf,x) {
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {ownerText,showActionMenu,channelThumbnailSupportedRenderers,...y}=u;
		this.t(ownerText,this.G_Text);
		if(showActionMenu!==false) debugger;
		this.t(channelThumbnailSupportedRenderers,this.R_ChannelThumbnailWithLink);
		return y;
	}
	/** @private @arg {R_ChannelThumbnailWithLink} x */
	R_ChannelThumbnailWithLink(x) {this.H_s("channelThumbnailWithLinkRenderer",x,this.D_ChannelThumbnailWithLink);}
	/** @private @template {D_ChildVideo_Omit} T @arg {"D_ChildVideo"} cf @arg {T} x */
	D_ChildVideo_Omit(cf,x) {
		let {title,navigationEndpoint,lengthText,videoId,...y}=this.s(cf,x);
		this.G_Text(title);
		this.E_Watch(navigationEndpoint);
		this.G_Text(lengthText);
		this.videoId(videoId);
		return y;
	}
	/** @private @arg {D_Video_inlinePlaybackEndpoint} x */
	D_Video_inlinePlaybackEndpoint(x) {
		const cf="D_Video_inlinePlaybackEndpoint";
		if("watchEndpoint" in x) return this.E_Watch(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_TopicLink} x */
	D_TopicLink(x) {
		const cf="D_TopicLink";
		const {thumbnailDetails,title,trackingParams,endpoint,callToActionIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnailDetails);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		x: {const x=endpoint; if(this.is_TE_VE(x,3611)) {this.E_VE3611(x); break x;}; debugger;}
		if(callToActionIcon.iconType!=="CHEVRON_RIGHT") debugger;
	}
	/** @private @arg {R_InfoRow} x */
	R_InfoRow(x) {this.H_s("infoRowRenderer",x,this.D_InfoRow);}
	/** @private @arg {D_InfoRow} x */
	D_InfoRow(x) {
		const cf="D_InfoRow";
		const {title,defaultMetadata,expandedMetadata,expandIcon,trackingParams,infoRowExpandStatusKey,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.t(defaultMetadata,this.G_Text);
		this.t(expandedMetadata,this.G_Text);
		this.t(expandIcon,x => {if(x.iconType!=="EXPAND") debugger;});
		this.trackingParams(trackingParams);
		this.t(infoRowExpandStatusKey,x => {
			switch(x) {
				default: debugger; break;
				case "structured-description-music-section-artists-row-state-id":
				case "structured-description-music-section-licenses-row-state-id":
			}
		});
	}
	/** @private @arg {D_CarouselLockup} x */
	D_CarouselLockup(x) {
		const cf="D_CarouselLockup";
		const {infoRows,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(infoRows,this.R_InfoRow);
	}
	/** @private @template {D_ChannelThumbnailWithLink} T @arg {"D_ChannelThumbnailWithLink"} cf @arg {T} x */
	D_ChannelThumbnailWithLink_Omit(cf,x) {
		const {thumbnail,accessibility,...y}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.D_Accessibility(accessibility);
		return y;
	}
	/** @private @arg {D_ChannelThumbnailWithLink["navigationEndpoint"]} x */
	D_ChannelThumbnail_NavEP(x) {
		const cf="D_ChannelThumbnail_navigationEndpoint";
		if("browseEndpoint" in x) return this.E_VE3611(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_ChannelThumbnailWithLink} x */
	D_ChannelThumbnailWithLink(x) {
		const cf="D_ChannelThumbnailWithLink";
		if("title" in x) {
			const {title,navigationEndpoint,...y}=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
			this.D_ChannelThumbnail_NavEP(navigationEndpoint);
			this.a_primitive_str(title);
			return;
		}
		let {navigationEndpoint,...y}=this.D_ChannelThumbnailWithLink_Omit(cf,x); this.g(y);
		this.D_ChannelThumbnail_NavEP(navigationEndpoint);
	}
	/** @private @arg {D_Video_Owner} x */
	D_Video_Owner(x) {
		const cf="D_Video_Owner";
		const {thumbnail,navigationEndpoint,accessibility,title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.E_VE3611(navigationEndpoint);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(title);
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
		this.t(isWatched,x => this.cq(x,true));
		this.t(topStandaloneBadge,this.RMD_Badge);
		this.t(richThumbnail,this.R_MovingThumbnail);
		this.t(inlinePlaybackEndpoint,this.D_Video_inlinePlaybackEndpoint);
		this.tz(buttons,x => this.xm.R_ToggleButton(x));
	}
	/** @private @arg {"D_Video_Other"|"D_Video_With:accessibility"|"D_Video_With:owner"|"D_Video_With:videoId"|"D_Video_With:videoId:topStandaloneBadge"|"D_Video_With:videoId:descriptionSnippet"} cf @arg {D_Video} x */
	D_Video_With_Add_IsWatched(cf,x) {
		if("isWatched" in x) return this.D_Video_Handle(`${cf}:isWatched`,x);
		return this.D_Video_Handle(cf,x);
	}
	/** @private @arg {R_Video} x */
	R_Video(x) {this.H_s("videoRenderer",x,this.D_Video);}
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
	/** @private @arg {G_RichItemContent} x */
	G_RichItemContent(x) {
		const cf="G_RichItemContent";
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("videoRenderer" in x) return this.R_Video(x);
		if("radioRenderer" in x) return this.R_Radio(x);
		if("feedNudgeRenderer" in x) return this.R_FeedNudge(x);
		if("reelItemRenderer" in x) return this.ht.R_ReelItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_RichItem} x */
	R_RichItem(x) {this.H_s("richItemRenderer",x,this.D_RichItem);}
	/** @private @arg {D_RichItem} x */
	D_RichItem(x) {
		const cf="D_RichItem";
		if("rowIndex" in x) {
			const {content,trackingParams,rowIndex,colIndex,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.G_RichItemContent(content);
			this.trackingParams(trackingParams);
			this.save_primitive("Item.pos",[rowIndex,colIndex]);
			return;
		}
		const {content,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_RichItemContent(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {G_BrowseFeed} x */
	G_BrowseFeed(x) {
		const cf="G_BrowseFeed";
		if("richItemRenderer" in x) return this.R_RichItem(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {Extract<G_Watch_ContentsItem,TR_ItemSection_3<any,any,any>>} x */
	G_WatchResultItem_ItemSection_3(x) {
		const cf="G_WatchResultItem_ItemSection";
		this.k(`${cf}.section`,x.itemSectionRenderer);
		if(x.itemSectionRenderer.sectionIdentifier!=="comment-item-section") debugger;
		let [u,y]=this.TR_ItemSection(x); this.g(y);
		if(!u) return;
		let u1=this.TD_ItemSection(`TD_ItemSection_3<"comment-item-section","comments-section">`,u); if(!u1) return;
		this.ItemSection_3_CommentItemSection(u1);
	}
	/** @private @template {{}} T @arg {[TD_ItemSection_2<T,"comments-entry-point">]} x @arg {(this:this,x:T)=>void} f */
	TD_ItemSection_2_CommentsEntryPoint([x],f) {
		const cf="TD_ItemSection_2_CommentsEntryPoint";
		const {contents,trackingParams,sectionIdentifier,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,f);
		this.trackingParams(trackingParams);
		if(sectionIdentifier!=="comments-entry-point") debugger;
	}
	/** @private @arg {DMD_RowContainer} x */
	DMD_RowContainer(x) {
		const cf="DMD_RowContainer";
		const {rows,collapsedItemCount,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(rows,this.DMD_RowItem);
		this.save_primitive(`${cf}.coll_item_count`,collapsedItemCount);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_MerchandiseItem} x */
	D_MerchandiseItem(x) {
		const cf="D_MerchandiseItem";
		const {thumbnail,description,title,price,vendorName,trackingParams,buttonText,buttonCommand,accessibilityTitle,buttonAccessibilityText,fromVendorText,additionalFeesText,regionFormat,...u}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.a_primitive_str(description);
		this.a_primitive_str(title);
		if(!this.str_starts_with(price,"CA$")) debugger;
		this.a_primitive_str(vendorName);
		this.trackingParams(trackingParams);
		this.a_primitive_str(buttonText);
		this.xm.E_Url(buttonCommand);
		this.a_primitive_str(accessibilityTitle);
		this.a_primitive_str(buttonAccessibilityText);
		this.a_primitive_str(fromVendorText);
		this.a_primitive_str(additionalFeesText);
		if(regionFormat!=="REGIONAL_FORMAT_EU") debugger;
		const {showOpenInNewIcon,...y}=u; this.g(y);/*#destructure_done*/
		this.t(showOpenInNewIcon,x => this.cq(x,true));
	}
	/** @private @arg {D_EngagementPanelTitleHeader} x */
	D_EngagementPanelTitleHeader(x) {
		const cf="D_EngagementPanelTitleHeader";
		const {title,contextualInfo,informationButton,menu,visibilityButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.t(contextualInfo,this.G_Text);
		this.xm.t(informationButton,this.xm.R_Button);
		this.t(menu,this.G_EngagementPanelMenu);
		this.xm.R_Button(visibilityButton);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_EndScreenPlaylist} x */
	D_EndScreenPlaylist(x) {
		const cf="D_EndScreenPlaylist";
		const {playlistId,thumbnail,title,trackingParams,longBylineText,videoCountText,videoCount,navigationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.playlistId(playlistId);
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		this.G_Text(longBylineText);
		this.G_Text(videoCountText);
		this.t(videoCount,this.parse_number_template);
		this.E_Watch(navigationEndpoint);
	}
	/** @private @arg {D_CommentsEntryPointHeader} x */
	D_CommentsEntryPointHeader(x) {
		const cf="D_CommentsEntryPointHeader";
		const {headerText,onTap,trackingParams,commentCount,contentRenderer,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(headerText);
		this.C_CommandExecutor(onTap);
		this.trackingParams(trackingParams);
		this.t(commentCount,this.G_Text);
		this.D_CommentsEntryPointHeader_contentRenderer(contentRenderer);
		if(targetId!=="comments-entry-point-header-identifier") debugger;
	}
	/** @private @arg {D_NotificationTopbarButton} x */
	D_NotificationTopbarButton(x) {
		const cf="D_NotificationTopbarButton";
		const {icon,menuRequest,style,trackingParams,accessibility,tooltip,updateUnseenCountEndpoint,notificationCount,handlerDatas,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(icon.iconType!=="NOTIFICATIONS") debugger;
		let [g_menu,menu_signal]=this.T_SE_Signal(`${cf}.menuRequest.T_SE_Signal`,menuRequest);
		this.M_GetNotificationMenu(g_menu);
		this.Signal_GetNotificationsMenu(menu_signal);
		if(style!=="NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT") debugger;
		this.trackingParams(trackingParams);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(tooltip);
		let [m2,s2]=this.T_SE_Signal(`${cf}.U_UnseenCount.T_SE_Signal`,updateUnseenCountEndpoint);
		this.M_GetUnseenNotificationCount(m2);
		this.cq(s2.signal,"GET_UNSEEN_NOTIFICATION_COUNT");
		this.a_primitive_num(notificationCount);
		this.cq(handlerDatas.length,1);
		this.cq(handlerDatas[0],"NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT");
	}
	/** @private @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton(x) {
		const cf="D_TopbarMenuButton";
		let u=this.D_TopbarMenuButton_Omit(cf,x);
		if("menuRenderer" in u) {
			const {icon,menuRenderer,style,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
			if(icon.iconType!=="VIDEO_CALL") debugger;
			let uv=this.TR_MultiPageMenu("R_TopbarMenu",menuRenderer);
			this.t(uv,this.D_TopbarMenuButton_MenuItem);
			if(style!=="STYLE_DEFAULT") debugger;
			return;
		}
		const {avatar,menuRequest,...y}=this.s(cf,u); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(avatar);
		let [meta,data]=this.T_SE_Signal(`${cf}.SE_Signal`,menuRequest);
		this.M_AccountMenu(meta);
		this.S_GetAccountMenu(data);
	}
	/** @private @arg {D_CompactRadio} x */
	D_CompactRadio(x) {
		const cf="D_CompactRadio";
		let {secondaryNavigationEndpoint: a,shareUrl: b,...o}=this.Omit_Menu_Radio(cf,x); o;
		this.D_CompactRadio_NavE(a); this.D_RadioShareUrl(b);
	}
	/** @private @arg {D_CompactPlaylist} x */
	D_CompactPlaylist(x) {
		let y=this.D_Playlist_Omit("D_CompactPlaylist",x);
		const {...p}=y; p;
	}
	/** @private @arg {D_HotkeyDialogSectionOption} x */
	D_HotkeyDialogSectionOption(x) {
		const cf="D_HotkeyDialogSectionOption";
		const {label,hotkey,...y}=this.s(cf,x);
		this.G_Text(label);
		this.a_primitive_str(hotkey);
		if("hotkeyAccessibilityLabel" in y) {
			const {hotkeyAccessibilityLabel,...y1}=this.s(cf,y); this.g(y1);/*#destructure_done*/
			return this.D_Accessibility(hotkeyAccessibilityLabel);
		}
		this.g(y);
	}
	/** @private @arg {[R_ContinuationItem[],"comment-item-section","comments-section"]} x */
	ItemSection_3_CommentItemSection(x) {
		if(x[1]!=="comment-item-section") debugger;
		if(x[2]!=="comments-section") debugger;
		this.z(x[0],this.R_ContinuationItem);
	}
	/** @public @arg {R_CommentSimplebox} x */
	R_CommentSimplebox(x) {this.H_s("commentSimpleboxRenderer",x,this.D_CommentSimplebox);}
	/** @private @arg {D_CommentSimplebox} x */
	D_CommentSimplebox(x) {
		const cf="D_CommentSimplebox";
		const {submitButton,cancelButton,aadcGuidelinesStateEntityKey,authorThumbnail,avatarSize,placeholderText,emojiPicker,trackingParams,emojiButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.R_Button(submitButton);
		this.xm.R_Button(cancelButton);
		this.params("aadc_guidelines_state.entity.key",aadcGuidelinesStateEntityKey);
		this.D_Thumbnail(authorThumbnail);
		if(avatarSize!=="SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT") debugger;
		this.G_Text(placeholderText);
		this.t(emojiPicker,this.R_EmojiPicker);
		this.trackingParams(trackingParams);
		this.xm.R_Button(emojiButton);
	}
	/** @public @arg {R_CommentThread} x */
	R_CommentThread(x) {this.H_s("commentThreadRenderer",x,this.D_CommentThread);}
	/** @public @arg {R_VideoDescriptionHeader} x */
	R_VideoDescriptionHeader(x) {this.H_s("videoDescriptionHeaderRenderer",x,this.D_VideoDescriptionHeader);}
	/** @private @arg {D_VideoDescriptionHeader} x */
	D_VideoDescriptionHeader(x) {
		const cf="D_VideoDescriptionHeader";
		const {title,channel,views,publishDate,factoid,channelNavigationEndpoint,channelThumbnail,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(channel);
		this.G_Text(views);
		this.G_Text(publishDate);
		this.z(factoid,x => {
			if("factoidRenderer" in x) return this.R_Factoid(x);
			if("viewCountFactoidRenderer" in x) return this.R_ViewCountFactoid(x);
			x===""; debugger;
		});
		this.E_VE3611(channelNavigationEndpoint);
		this.D_Thumbnail(channelThumbnail);
	}
	/** @private @arg {R_ViewCountFactoid} x */
	R_ViewCountFactoid(x) {this.H_s("viewCountFactoidRenderer",x,this.D_ViewCountFactoid);}
	/** @private @arg {D_ViewCountFactoid} x */
	D_ViewCountFactoid(x) {
		const cf="D_ViewCountFactoid";
		const {viewCountEntityKey,factoid,viewCountType,...y}=this.s(cf,x); this.g(y);
		this.params("view_count.entity.key",viewCountEntityKey);
		this.R_Factoid(factoid);
		this.save_enum(cf,"VIEW_COUNT_FACTOID_TYPE",viewCountType);
	}
	/** @private @arg {D_ClipSection} x */
	D_ClipSection(x) {this.H_s("contents",x,x => this.z(x,this.R_ClipCreation));}
	/** @private @arg {G_EngagementPanelMenu} x */
	G_EngagementPanelMenu(x) {
		const cf="G_EngagementPanelMenu";
		if("menuRenderer" in x) return this.R_Menu(x);
		if("sortFilterSubMenuRenderer" in x) return this.R_SortFilterSubMenu(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_CommentReplies} x */
	R_CommentReplies(x) {this.H_s("commentRepliesRenderer",x,this.D_CommentReplies);}
	/** @private @arg {D_CommentReplies} x */
	D_CommentReplies(x) {
		const cf="D_CommentReplies";
		const {contents,trackingParams,viewReplies,hideReplies,targetId,...y}=this.s(cf,x); this.g(y);
		this.z(contents,this.R_ContinuationItem);
		this.trackingParams(trackingParams);
		this.xm.R_Button(viewReplies);
		this.xm.R_Button(hideReplies);
		if(!this.str_starts_with(targetId,"comment-replies-item-")) debugger;
	}
	/** @private @arg {D_CommentThread} x */
	D_CommentThread(x) {
		const cf="D_CommentThread";
		const {comment,replies,trackingParams,renderingPriority,isModeratedElqComment,loggingDirectives,...y}=this.s(cf,x); this.g(y);
		this.R_Comment(comment);
		this.t(replies,this.R_CommentReplies);
		this.trackingParams(trackingParams);
		if(renderingPriority!=="RENDERING_PRIORITY_UNKNOWN") debugger;
		this.cq(isModeratedElqComment,false);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @public @arg {R_RichListHeader} x */
	R_RichListHeader(x) {this.H_s("richListHeaderRenderer",x,this.D_RichListHeader);}
	/** @private @arg {D_RichListHeader} x */
	D_RichListHeader(x) {
		const cf="D_RichListHeader";
		const {title,trackingParams,navigationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.G_Text(title);
		this.xm.R_Button(navigationButton);
	}
	/** @public @arg {R_Factoid} x */
	R_Factoid(x) {this.H_s("factoidRenderer",x,this.D_Factoid);}
	/** @private @arg {D_Factoid} x */
	D_Factoid(x) {
		const cf="D_Factoid";
		const {value,label,accessibilityText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(value);
		this.G_Text(label);
		this.a_primitive_str(accessibilityText);
	}
	/** @public @arg {R_TopicLink} x */
	R_TopicLink(x) {this.H_s("topicLinkRenderer",x,this.D_TopicLink);}
	/** @public @arg {R_CarouselLockup} x */
	R_CarouselLockup(x) {this.H_s("carouselLockupRenderer",x,this.D_CarouselLockup);}
	/** @private @arg {R_RichMetadata} x */
	R_RichMetadata(x) {this.H_s("richMetadataRenderer",x,this.D_RichMetadata);}
	/** @private @arg {D_RichMetadata_BoxArt} x */
	D_RichMetadata_BoxArt(x) {
		const cf="D_RichMetadata_BoxArt";
		const {style: {},thumbnail,title,subtitle,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.t(subtitle,this.G_Text);
		this.G_Text(callToAction);
		this.T_Icon(`${cf}:icon`,callToActionIcon);
		if(this.is_TE_VE(endpoint,3611)) this.E_VE3611(endpoint);
		else debugger;
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_RichMetadata} x */
	D_RichMetadata(x) {
		const cf="D_RichMetadata";
		switch(x.style) {
			default: this.cg.codegen_case_key(cf,x,"style","break"); break;
			case "RICH_METADATA_RENDERER_STYLE_BOX_ART": return this.D_RichMetadata_BoxArt(x);
			case "RICH_METADATA_RENDERER_STYLE_TOPIC": {
				const cf="D_RichMetadata_Topic";
				const {style: {},thumbnail,title,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.D_Thumbnail(thumbnail);
				this.G_Text(title);
				this.G_Text(callToAction);
				this.T_Icon(`${cf}:icon`,callToActionIcon);
				if(this.is_TE_VE(endpoint,3611)) this.E_VE3611(endpoint);
				else debugger;
				this.trackingParams(trackingParams);
			} break;
		}
	}
	/** @public @arg {R_RichMetadataRow} x */
	R_RichMetadataRow(x) {this.H_s("richMetadataRowRenderer",x,this.D_RichMetadataRow);}
	/** @private @arg {D_RichMetadataRow} x */
	D_RichMetadataRow(x) {
		const cf="D_RichMetadataRow";
		if(!x.contents) debugger;
		if(!x.trackingParams) debugger;
		const {contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_RichMetadata);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {R_MetadataRow} x */
	R_MetadataRow(x) {this.H_s("metadataRowRenderer",x,this.D_MetadataRow);}
	/** @private @arg {D_MetadataRow} x */
	D_MetadataRow(x) {
		const cf="D_MetadataRow";
		const {title,contents,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.z(contents,this.G_Text);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {DMD_RowItem} x */
	DMD_RowItem(x) {
		if("metadataRowRenderer" in x) return this.R_MetadataRow(x);
		if("richMetadataRowRenderer" in x) return this.R_RichMetadataRow(x);
		debugger;
	}
	/**
	 * @private
	 * @arg {D_EmojiImage} x
	 * This might be D_Thumbnail, if the optional properties match,
	 * use that instead of repeating the code
	 */
	D_EmojiImage(x) {
		const cf="D_EmojiImage";
		const {accessibility,thumbnails,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Accessibility(accessibility);
		this.z(thumbnails,this.D_ThumbnailItem);
	}
	/** @private @arg {D_CustomEmoji} x */
	D_CustomEmoji(x) {
		let {isLocked,...y}=this.D_CustomEmoji_Omit("D_CustomEmoji",x); this.g(y);
		this.t(isLocked,x => this.cq(x,true));
	}
	/** @public @template {D_CustomEmoji|D_LiveChatEmoji} T @arg {CF_D_CustomEmoji} cf @arg {T} x */
	D_CustomEmoji_Omit(cf,x) {
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,...y}=this.s(cf,x);
		this.parse_emoji_id(emojiId);
		let [s_arr]=this.z(shortcuts,this.parse_emoji_shortcut);
		this.z(s_arr,this.a_primitive_str);
		this.save_primitive(`save://CustomEmoji.d/shortcuts/${emojiId}?custom=${isCustomEmoji}`,shortcuts.join(","));
		this.save_primitive(`save://CustomEmoji.d/searchTerms/${emojiId}?custom=${isCustomEmoji}`,searchTerms.join(","));
		this.D_EmojiImage(image);
		this.a_primitive_bool(isCustomEmoji);
		return y;
	}
	/** @public @arg {CF_TR_MultiPageMenu} cf @template T @template {TR_MultiPageMenu<T>} U @arg {U} x */
	TR_MultiPageMenu(cf,x) {
		let [dk]=this.get_keys_of(x);
		if(dk!=="multiPageMenuRenderer") {debugger; throw new Error("Wrong key");}
		return this.w(cf,dk,x);
	}
	/** @public @arg {R_CommentsSimplebox} x */
	R_CommentsSimplebox(x) {this.H_s("commentsSimpleboxRenderer",x,this.D_CommentsSimplebox);}
	/** @private @arg {D_CommentsSimplebox} x */
	D_CommentsSimplebox(x) {
		const cf="D_CommentsSimplebox";
		const {simpleboxAvatar,simpleboxPlaceholder,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(simpleboxAvatar);
		this.G_Text(simpleboxPlaceholder);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {R_CommentsEntryPointTeaser} x */
	R_CommentsEntryPointTeaser(x) {this.H_s("commentsEntryPointTeaserRenderer",x,this.D_CommentsEntryPointTeaser);}
	/** @private @arg {D_CommentsEntryPointTeaser} x */
	D_CommentsEntryPointTeaser(x) {
		const cf="D_CommentsEntryPointTeaser";
		const {teaserAvatar,teaserContent,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!teaserAvatar.accessibility) debugger;
		this.D_Thumbnail(teaserAvatar);
		this.G_Text(teaserContent);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_CommentsEntryPointHeader_contentRenderer} x */
	D_CommentsEntryPointHeader_contentRenderer(x) {
		const cf="D_CommentsEntryPointHeader_contentRenderer";
		if("commentsEntryPointTeaserRenderer" in x) return this.R_CommentsEntryPointTeaser(x);
		if("commentsSimpleboxRenderer" in x) return this.R_CommentsSimplebox(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {"D_TopbarMenuButton"} cf @arg {D_TopbarMenuButton} x */
	D_TopbarMenuButton_Omit(cf,x) {
		const {trackingParams,accessibility,tooltip,...y}=this.s(cf,x);
		this.trackingParams(trackingParams);
		this.D_Accessibility(accessibility);
		this.a_primitive_str(tooltip);
		return y;
	}
	/** @public @arg {MP_LoadingNotificationMenu} x */
	MP_LoadingNotificationMenu(x) {
		const cf="MP_LoadingNotificationMenu";
		const {trackingParams,style,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {Signal_GetNotificationsMenu} x */
	Signal_GetNotificationsMenu(x) {
		const cf="Signal_GetNotificationsMenu";
		const {signal,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(signal!=="GET_NOTIFICATIONS_MENU") debugger;
		/** @type {[(A_LoadingNotificationsMenu["openPopupAction"])[], never[]]} */
		let [u]=this.z(actions,x => this.xm.TA_OpenPopup("G_Action_GetNotificationsMenu",x));
		let [u1]=this.z(u,this.G_Action_GetNotificationsMenu_Popup);
		/** @type {[MP_LoadingNotificationMenu[], never[]]} */
		let [u2]=this.z(u1,x => this.TR_MultiPageMenu("P_NotificationMenu_Popup",x));
		this.z(u2,this.MP_LoadingNotificationMenu);
	}
	/** @public @arg {Popup_DD_LoadingNotificationsMenu} x */
	G_Action_GetNotificationsMenu_Popup(x) {
		const cf="G_Action_GetNotificationsMenu_Popup";
		const {popup: a,popupType,beReused,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(popupType!=="DROPDOWN") debugger;
		if(beReused!==true) debugger;
		return a;
	}
	/** @public @arg {R_CompactLink} x */
	R_CompactLink(x) {this.H_s("compactLinkRenderer",x,this.D_CompactLink);}
	/** @private @template {D_CompactLink} T @arg {CF_D_Link} cf @arg {T} x */
	D_Link_Omit(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		return y;
	}
	/** @private @arg {Extract<D_CompactLink,{navigationEndpoint:any}>["navigationEndpoint"]} x */
	D_CompactLink_NavEndpoint(x) {
		const cf="D_CompactLink_NavEndpoint";
		if("uploadEndpoint" in x) return this.xm.E_VE83769_Upload(x);
		if("browseEndpoint" in x) {
			if(this.is_TE_VE(x,23462)) return this.E_VE23462(x);
			if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
			this.is_TE_VE(x,this.assume_type.never()); debugger; return;
		}
		if("signalNavigationEndpoint" in x) return this.xm.E_SignalNavigation(x);
		if("urlEndpoint" in x) return this.xm.E_Url(x);
		x===""; this.codegen_typedef(cf,x);
	}
	assume_type={
		/** @returns {never} */
		never() {
			let v={i: 1};
			/** @arg {{i:number}} x @returns {asserts x is never} */
			function assume_never(x) {x;}
			assume_never(v);
			return v;
		}
	};
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
		const cf="D_CompactLink";
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
		this.cg.make_codegen_group(cf,x);
	}
	/** @private @arg {MP_TopbarMenu} x */
	D_TopbarMenuButton_MenuItem(x) {
		const cf="D_TopbarMenuButton_MenuItem";
		const {sections,trackingParams,style,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [n,y1]=this.z(sections,this.TR_MP_MenuSection); this.cq(this.eq_keys(y1,[]),true);
		let [n1,y2]=this.z(n,v => this.T_Items_TP("R_CompactLink_Items",v[0])); this.cq(this.eq_keys(y2,[]),true);
		this.z(n1,x => this.z(x,this.R_CompactLink));
		this.trackingParams(trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_CREATION") debugger;
	}
	/** @private @template {D_Omit_Menu_Radio&D_Omit_Compact_Player} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	D_Omit_Menu_Radio(cf,x) {
		let {navigationEndpoint,menu,...y}=this.D_Omit_Compact_Player(cf,x);
		this.R_Menu(menu);
		return y;
	}
	/** @public @arg {GU_RadioShareUrl} b */
	D_RadioShareUrl(b) {
		/** @template {string} T1 @template {string} T2 @template {string} T3 @template {string} T4 @template {string} T5 */
		class UrlParseHelper {
			/** @arg {UrlParseRes<T1,T2,T3,T4,T5>} x */
			constructor(x) {this.x=x;}
			/** @arg {U} cx @template {UrlParseRes<T1,T2,T3,T4,T5>} U @template {`/${T5}`} T @arg {T} pname @returns {cx is Extract<U,{pathname:T}>} */
			get_with_pathname(cx,pname) {return ServiceMethods.is_url_with_pathname(cx,pname);}
		}
		const cf="D_RadioShareUrl";
		let up=this._convert_url_to_obj(b);
		{
			let obj=new UrlParseHelper(up);
			if(obj.get_with_pathname(up,"/watch")) {
				let {...s}=this.parse_url_search_params(up.search);
				if("v" in s) {
					let {v,playnext,list,...y}=this.s(cf,s); this.g(y);/*#destructure_done*/
					if(playnext!=="1") debugger;
					if(!list) debugger; this.playlistId(list);
					/** @returns {{k:1;a:string;}|{k:2;a:`RD${string}`}} */
					let gw=() => ({k: 1,a: v});
					let w=gw();
					if(this.str_starts_with_rx(w.a,"RD")) {
						w.k=2; w.k==2&&this.playlistId(w.a);
						return;
					}
					this.ht.save_next_char("share_url.v",w.a[0]);
					this.videoId(w.a);
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
		this.cg.codegen_str(cf,b);
	}
	/** @public @template {D_CompactPlaylist|D_Radio|D_CompactRadio} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	Omit_Menu_Radio(cf,x) {
		if("adSlotMetadata" in x) {debugger; throw new Error();}
		let u=this.D_Omit_Menu_Radio(cf,x);
		let {playlistId,thumbnail,videoCountText,thumbnailText,longBylineText,videoCountShortText,...y}=this.xm.D_Omit_ThumbnailOverlay(cf,u);
		this.playlistId(playlistId);
		this.D_Thumbnail(thumbnail);
		this.G_Text(videoCountText);
		this.G_Text(thumbnailText);
		this.G_Text(longBylineText);
		this.G_Text(videoCountShortText);
		return y;
	}
	/** @private @arg {CF_D_Playlist_Omit} cf @arg {D_CompactPlaylist} x */
	D_Playlist_Omit(cf,x) {
		let {shortBylineText,sidebarThumbnails,shareUrl,thumbnailRenderer,...y}=this.Omit_Menu_Radio(cf,x);
		this.G_Text(shortBylineText);
		this.z(sidebarThumbnails,this.D_Thumbnail);
		this.D_RadioShareUrl(shareUrl);
		return y;
	}
	/** @private @arg {D_CompactRadio['secondaryNavigationEndpoint']} x */
	D_CompactRadio_NavE(x) {
		if(!x.watchEndpoint) debugger;
		this.E_Watch(x);
	}
	/** @private @arg {R_ClipCreation} x */
	R_ClipCreation(x) {this.H_s("clipCreationRenderer",x,this.D_ClipCreation);}
	/** @public @arg {R_ClipCreationTextInput} x */
	R_ClipCreationTextInput(x) {this.H_s("clipCreationTextInputRenderer",x,this.D_ClipCreationTextInput);}
	/** @private @arg {D_ClipCreationTextInput} x */
	D_ClipCreationTextInput(x) {
		const cf="D_ClipCreationTextInput";
		const {placeholderText,maxCharacterLimit,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(placeholderText);
		if(maxCharacterLimit!==140) debugger;
	}
	/** @public @arg {R_ClipCreationScrubber} x */
	R_ClipCreationScrubber(x) {this.H_s("clipCreationScrubberRenderer",x,this.D_ClipCreationScrubber);}
	/** @private @arg {D_ClipCreationScrubber} x */
	D_ClipCreationScrubber(x) {
		const cf="D_ClipCreationScrubber";
		const {lengthTemplate,maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs,startAccessibility,endAccessibility,durationAccessibility,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(lengthTemplate!=="$clip_length seconds") debugger;
		let u=this.exact_arr(60000,5000,15000,120000);
		let t=this.exact_arr(maxLengthMs,minLengthMs,defaultLengthMs,windowSizeMs);
		if(!this.eq_keys(t,u)) debugger;
		this.z([startAccessibility,endAccessibility,durationAccessibility],this.D_Accessibility);
	}
	/** @public @arg {R_ClipAdState} x */
	R_ClipAdState(x) {this.H_s("clipAdStateRenderer",x,this.D_ClipAdState);}
	/** @private @arg {D_ClipAdState} x */
	D_ClipAdState(x) {
		const cf="D_ClipAdState";
		const {title,body,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.G_Text(body);
	}
	/** @private @arg {D_ClipCreation} x */
	D_ClipCreation(x) {
		const cf="D_ClipCreation";
		const {trackingParams,userAvatar,titleInput,scrubber,saveButton,displayName,publicityLabel,cancelButton,adStateOverlay,externalVideoId,publicityLabelIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.D_Thumbnail(userAvatar);
		this.R_ClipCreationTextInput(titleInput);
		this.R_ClipCreationScrubber(scrubber);
		this.xm.R_Button(saveButton);
		this.G_Text(displayName);
		switch(publicityLabel) {
			default: debugger; break;
			case "Private":
			case "Unlisted":
			case "Public":
		}
		this.xm.R_Button(cancelButton);
		this.R_ClipAdState(adStateOverlay);
		this.videoId(externalVideoId);
		switch(publicityLabelIcon) {
			default: debugger; break;
			case "PRIVACY_PRIVATE":
			case "PRIVACY_UNLISTED":
			case "PRIVACY_PUBLIC":
		}
	}
	/** @public @template CT,T,U @template {TR_ItemSection_1<CT>|TR_ItemSection_3<CT,T,U>} VU @arg {VU} x @returns {[VU["itemSectionRenderer"],Omit<VU,"itemSectionRenderer">]} */
	TR_ItemSection(x) {
		const cf="TR_ItemSection";
		const {itemSectionRenderer: a,...y}=this.s(cf,x);/*#destructure_done*/
		return [a,y];
	}
	/** @arg {CF_TD_ItemSection} cf @protected @template CT,T,U @template {TD_ItemSection_1<CT>|TD_ItemSection_3<CT,T,U>} VU @arg {VU} x @returns {(VU extends TD_ItemSection_3<CT,T,U>?[VU["contents"],VU["sectionIdentifier"],VU["targetId"]]:[VU["contents"]])|null} */
	TD_ItemSection(cf,x) {
		/** @type {TD_ItemSection_1<CT>|TD_ItemSection_3<CT,T,U>} */
		let u=x;
		if("targetId" in u) {
			const {contents,sectionIdentifier,targetId,trackingParams,...y}=this.s_priv(cf,u); this.g(y);/*#destructure_done*/
			this.trackingParams(trackingParams);
			return as_any([contents,sectionIdentifier,targetId]);
		}
		const {contents,trackingParams,...y}=this.s_priv(cf,u); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		return as_any([contents]);
	}
	/** @private @arg {DE_GetTranscript} x */
	DE_GetTranscript(x) {this.D_Params("DE_GetTranscript","get_transcript.params",x);}
	/** @private @arg {DE_GetNotificationMenu} x */
	DE_GetNotificationMenu(x) {
		const cf="DE_GetNotificationMenu";
		const {ctoken,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("get_notification_menu.ctoken",ctoken);
	}
	/** @typedef {"featured"|"search"} S_BrowseFeedEnd  */
	/** @public @arg {G_DC_SectionList_BrowseFeed_ChannelFeatured} x @returns {[false,null]|[true, [2,`UC${string}${S_BrowseFeedEnd}`,T_IdTemplate<"UC",D_UserIdStr>,string]|[1,`UC${string}${S_BrowseFeedEnd}`,T_IdTemplate<"UC",D_UserIdStr>,S_BrowseFeedEnd]]} */
	is_browse_feedUC(x) {
		if(this.str_starts_with_rx("browse-feed",x.targetId)) {
			let ss=split_string(x.targetId,"browse-feed");
			if(ss.length!==2) return [false,null];
			if(!this.str_starts_with_rx_in_arr(ss,"UC")) return [false,null];
			let sa=ss[1];
			/** @type {G_DC_SectionList_BrowseFeed_ChannelFeatured["targetId"] extends `${"browse-feedUC"}${string}${infer R}`?R:never} */
			let ll=as(sa.slice(24));
			if(!this.str_starts_with_rx("UC",sa)) return [false,null];
			let [cid,fe]=split_string_once(sa,ll); if(fe!=="") debugger;
			return [true,[1,sa,cid,ll]];
		}
		return [false,null];
	}
	/** @public @arg {TR_SectionListItem_3_Empty} x */
	TR_SectionListItem_3_Empty(x) {
		const cf="TR_SectionListItem_3_Empty";
		this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_MusicCarouselShelf} x */
	R_MusicCarouselShelf(x) {this.H_s("musicCarouselShelfRenderer",x,this.D_MusicCarouselShelf);}
	/** @private @arg {D_MusicCarouselShelf} x */
	D_MusicCarouselShelf(x) {
		const cf="D_MusicCarouselShelf";
		const {contents,header,trackingParams,itemSize,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.cq);
		this.g(header);
		this.trackingParams(trackingParams);
		this.cq(itemSize,"COLLECTION_STYLE_ITEM_SIZE_MEDIUM");
	}
	/** @public @arg {R_MusicShelf} x */
	R_MusicShelf(x) {this.H_s("musicShelfRenderer",x,this.D_MusicShelf);}
	/** @private @arg {D_MusicShelf} x */
	D_MusicShelf(x) {
		const cf="D_MusicShelf";
		const {contents,title,trackingParams,continuations,shelfDivider,autoReloadWhenEmpty,bottomButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_MusicResponsiveListItem);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		this.z(continuations,this.CD_Reload);
		this.R_MusicShelfDivider(shelfDivider);
		this.cq(autoReloadWhenEmpty,true);
		this.xm.R_Button(bottomButton);
	}
	/** @private @arg {R_MusicResponsiveListItem} x */
	R_MusicResponsiveListItem(x) {this.H_s("musicResponsiveListItemRenderer",x,this.g);}
	/** @private @arg {R_MusicShelfDivider} x */
	R_MusicShelfDivider(x) {this.H_s("musicShelfDividerRenderer",x,this.g);}
	/** @public @arg {R_SortFilterSubMenu} x */
	R_SortFilterSubMenu(x) {this.H_s("sortFilterSubMenuRenderer",x,this.D_SortFilterSubMenu);}
	/** @private @arg {D_SortFilterSubMenu} x */
	D_SortFilterSubMenu(x) {
		const cf="D_SortFilterSubMenu";
		if("targetId" in x) return this.D_SortFilterSubMenu_WithTargetId(x);
		const {subMenuItems,title,icon,accessibility,tooltip,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(subMenuItems,this.D_ActionSetPlaylistVideoOrder);
		this.t(title,this.a_primitive_str);
		this.dt(icon,x => x.iconType!=="SORT");
		this.t(accessibility,this.D_Accessibility);
		this.t(tooltip,this.a_primitive_str);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_ActionSetPlaylistVideoOrder} x */
	D_ActionSetPlaylistVideoOrder(x) {
		const cf="D_ActionSetPlaylistVideoOrder";
		const {title,selected,continuation,serviceEndpoint,accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		this.t(continuation,this.CD_Reload);
		this.t(serviceEndpoint,x => this.xr.C_Continuation(x));
		this.t(accessibility,this.D_Accessibility);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {Extract<D_SortFilterSubMenu,{targetId:any}>} x */
	D_SortFilterSubMenu_WithTargetId(x) {
		const cf="D_SortFilterSubMenu_WithTargetId";
		switch(x.targetId) {
			default: debugger; break;
			case "live-chat-view-selector-sub-menu": {
				const {subMenuItems,accessibility,trackingParams,targetId: {},...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.z(subMenuItems,x => {
					const {title,selected,continuation,accessibility,subtitle,trackingParams,...y}=this.s(`${cf}.MenuItem`,x); this.g(y);
					this.a_primitive_str(title);
					this.a_primitive_bool(selected);
					this.D_ReloadContinuationData(continuation);
					this.D_Accessibility(accessibility);
					this.a_primitive_str(subtitle);
					this.trackingParams(trackingParams);
				});
				this.D_Accessibility(accessibility);
				this.trackingParams(trackingParams);
			} break;
		}
	}
	/** @public @arg {R_TextHeader} x */
	R_TextHeader(x) {this.H_s("textHeaderRenderer",x,this.D_TextHeader);}
	/** @private @arg {D_TextHeader} x */
	D_TextHeader(x) {
		const cf="D_TextHeader";
		const {title,style,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		switch(style) {
			default: debugger; break;
			case "TEXT_HEADER_RENDERER_STYLE_BOLD":
		}
	}
	/** @private @arg {D_CompactVideo["navigationEndpoint"]} x */
	D_ThumbnailOverlay_NavEP(x) {
		if("reelWatchEndpoint" in x) return this.x.get("x_VE37414").E_VE37414_ReelWatch(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		let k=this.get_keys_of(x);
		k.pop()==="";
	}
	/** @private @template {D_CompactVideo|D_Video} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
	D_ThumbnailOverlay_Omit(cf,x) {
		const {trackingParams,menu,title,videoId,navigationEndpoint,thumbnail,longBylineText,shortBylineText,...y}=this.xm.D_Omit_ThumbnailOverlay(cf,x);
		this.trackingParams(trackingParams);
		this.R_Menu(menu);
		this.G_Text(title);
		this.videoId(videoId);
		this.D_ThumbnailOverlay_NavEP(navigationEndpoint);
		this.D_Thumbnail(thumbnail);
		this.t(longBylineText,this.G_Text);
		this.t(shortBylineText,this.G_Text);
		return y;
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
	/** @public @arg {R_MovingThumbnail} x */
	R_MovingThumbnail(x) {this.H_s("movingThumbnailRenderer",x,this.D_MovingThumbnail);}
	/** @private @arg {D_MovingThumbnail} x */
	D_MovingThumbnail(x) {
		const cf="D_MovingThumbnail";
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
	/** @private @template {D_CompactVideo} T @arg {"D_CompactVideo"} cf @arg {T} x @returns {T_OmitKey<T,Exclude<keyof T,Omit_y>>} */
	D_CompactVideo_Omit(cf,x) {
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {richThumbnail,accessibility,channelThumbnail,badges,viewCountText,shortViewCountText,...y}=u;
		this.t(richThumbnail,this.R_MovingThumbnail);
		this.D_Accessibility(accessibility);
		this.D_Thumbnail(channelThumbnail);
		this.tz(badges,this.RMD_Badge);
		/** @typedef {keyof typeof y} Omit_y */
		return as_any(y);
	}
	/** @private @arg {R_ElementUpdate} x */
	R_ElementUpdate(x) {this.H_s("updates",x,x => this.z(x,this.D_ElementUpdate));}
	/** @private @arg {D_ElementUpdate} x */
	D_ElementUpdate(x) {
		const cf="D_ElementUpdate";
		if("templateUpdate" in x) return this.xr.R_TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return this.xr.R_ResourceStatusInResponseCheck(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {D_FrameworkUpdates} x */
	D_FrameworkUpdates(x) {
		const cf="D_FrameworkUpdates";
		const {entityBatchUpdate,elementUpdate,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DR_DC_EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.R_ElementUpdate);
	}
	/** @public @arg {R_RichGrid} x */
	R_RichGrid(x) {this.H_s("richGridRenderer",x,this.D_RichGrid);}
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
	/** @private @template {D_RichGrid} T @arg {"D_RichGrid"} cf @arg {T} x */
	D_RichGrid_Omit(cf,x) {
		const {contents,header,trackingParams,targetId,reflowOptions,...y}=this.s(cf,x);
		if(targetId!=="browse-feedFEwhat_to_watch") debugger;
		this.z(contents,this.D_RichGridContent);
		this.R_FeedFilterChipBar(header);
		this.trackingParams(trackingParams);
		if(reflowOptions.minimumRowsOfVideosAtStart!==2) debugger;
		if(reflowOptions.minimumRowsOfVideosBetweenSections!==1) debugger;
		return y;
	}
	/** @public @arg {R_SubFeedSelector} x */
	R_SubFeedSelector(x) {this.H_s("subFeedSelectorRenderer",x,this.D_SubFeedSelector);}
	/** @private @arg {D_SubFeedSelector} x */
	D_SubFeedSelector(x) {
		const cf="D_SubFeedSelector";
		const {title,options,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(options,this.R_SubFeedOption);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {R_SubFeedOption} x */
	R_SubFeedOption(x) {this.H_s("subFeedOptionRenderer",x,this.D_SubFeedOption);}
	/** @private @arg {D_SubFeedOption["navigationEndpoint"]} x */
	D_SubFeedOption_NavEP(x) {
		const cf="D_SubFeedOption_NavEP";
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("browseEndpoint" in x) {debugger; return;}
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_SubFeedOption} x */
	D_SubFeedOption(x) {
		const cf="D_SubFeedOption";
		const {name,isSelected,navigationEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(name);
		this.a_primitive_bool(isSelected);
		this.D_SubFeedOption_NavEP(navigationEndpoint);
		this.trackingParams(trackingParams);
	}
	/** @arg {R_RichSection} x */
	R_RichSection(x) {this.H_s("richSectionRenderer",x,this.D_RichSection);}
	/** @arg {D_RichSection} x */
	D_RichSection(x) {
		const cf="D_RichSection";
		const {content: a,trackingParams: b,fullBleed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_RichSection(a);
		this.trackingParams(b);
		if(fullBleed!==false) debugger;
	}
	/** @arg {G_RichSection} x */
	G_RichSection(x) {
		const cf="G_RichSection";
		if("richShelfRenderer" in x) return this.xr.R_RichShelf(x);
		if("inlineSurveyRenderer" in x) return this.xr.R_InlineSurvey(x);
		if("sourcePivotHeaderRenderer" in x) return this.xr.R_SourcePivotHeader(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RichGridContent} x */
	D_RichGridContent(x) {
		const cf="D_RichGridContent";
		if("richItemRenderer" in x) return this.R_RichItem(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("richSectionRenderer" in x) return this.R_RichSection(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {R_MusicQueue} x */
	R_MusicQueue(x) {this.H_s("musicQueueRenderer",x,this.D_MusicQueue);}
	/** @private @arg {D_MusicQueue} x */
	D_MusicQueue(x) {
		const cf="D_MusicQueue";
		const {content,hack,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(content,this.R_PlaylistPanel);
		this.t(hack,x => {if(x!==true) debugger;});
	}
	/** @private @arg {R_PlaylistPanel} x */
	R_PlaylistPanel(x) {this.H_s("playlistPanelRenderer",x,this.D_PlaylistPanel);}
	/** @arg {D_PlaylistPanel} x */
	D_PlaylistPanel(x) {
		const cf="D_PlaylistPanel";
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
		this.trackingParams(trackingParams);
		this.G_Text(titleText);
		if(isEditable!==true) debugger;
		this.t(previewDescription,this.g);
		this.t(numItemsToShow,x => {if(x!==25) debugger;});
	}
	/** @arg {G_PlaylistPanel_Item} x */
	G_PlaylistPanel_Item(x) {
		const cf="G_PlaylistPanel_Item";
		if("automixPreviewVideoRenderer" in x) return this.xr.R_AutomixPreviewVideo(x);
		if("playlistPanelVideoRenderer" in x) return this.xm.R_PlaylistPanelVideo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {CD_NextRadio} x */
	CD_NextRadio(x) {
		this.y("CD_NextRadio","nextRadioContinuationData",x,
			x => this.DC_Generic_CTP("next_radio.continuation",x));
	}
	/** @public @arg {string} cf1 @arg {NonNullable<RS_Playlist['alerts']>[number]} x */
	RS_Playlist_AlertItem(cf1,x) {
		const cf2="RS_Playlist_AlertItem";
		if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
		this.codegen_typedef(`${cf1}$${cf2}`,x);
	}
	/** @public @arg {R_SearchBox} x */
	R_SearchBox(x) {this.H_s("searchBoxRenderer",x,this.D_SearchBox);}
	/** @private @arg {D_SearchBox} x */
	D_SearchBox(x) {
		const cf="D_SearchBox";
		const {endpoint,searchButton,clearButton,placeholderText,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(this.is_TE_VE(endpoint,6827)) this.E_VE6827(endpoint);
		else debugger;
		this.xm.R_Button(searchButton);
		this.xm.R_Button(clearButton);
		this.G_Text(placeholderText);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {R_AlertWithButton} x */
	R_AlertWithButton(x) {this.H_s("alertWithButtonRenderer",x,this.D_AlertWithButton);}
	/** @private @arg {D_AlertWithButton} x */
	D_AlertWithButton(x) {
		const cf="D_AlertWithButton";
		const {type,text,dismissButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(type!=="INFO") debugger;
		this.G_Text(text);
		this.xm.R_Button(dismissButton);
	}
	/** @public @arg {R_ProfileColumnStats} x */
	R_ProfileColumnStats(x) {this.H_s("profileColumnStatsRenderer",x,this.D_ProfileColumnStats);}
	/** @private @arg {D_ProfileColumnStats} x */
	D_ProfileColumnStats(x) {this.H_s("items",x,x => this.z(x,this.R_ProfileColumnStatsEntry));}
	/** @private @arg {R_ProfileColumnStatsEntry} x */
	R_ProfileColumnStatsEntry(x) {this.H_s("profileColumnStatsEntryRenderer",x,this.D_ProfileColumnStatsEntry);}
	/** @private @arg {D_ProfileColumnStatsEntry} x */
	D_ProfileColumnStatsEntry(x) {
		const cf="D_ProfileColumnStatsEntry";
		const {label,value,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(label);
		this.G_Text(value);
	}
	/** @public @arg {R_ProfileColumnUserInfo} x */
	R_ProfileColumnUserInfo(x) {this.H_s("profileColumnUserInfoRenderer",x,this.D_ProfileColumnUserInfo);}
	/** @private @arg {D_ProfileColumnUserInfo} x */
	D_ProfileColumnUserInfo(x) {
		const cf="D_ProfileColumnUserInfo";
		const {title,thumbnail,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.D_Thumbnail(thumbnail);
	}
	/** @public @arg {R_MicroformatData} x */
	R_Microformat(x) {this.H_s("microformatDataRenderer",x,this.D_Microformat);}
	/** @private @arg {D_Microformat} x */
	D_Microformat(x) {
		const cf="D_Microformat";
		const {url,ios,twitter,other,...y}=this.unwrap_microformat(x); this.g(y);
		{
			const {title,description,thumbnail,siteName,appName,androidPackage,ogType,schemaDotOrgType,noindex,unlisted,tags,familySafe,availableCountries,linkAlternates,...y}=other; this.g(y);
			this.z([title,description,siteName,appName,androidPackage,ogType,schemaDotOrgType],this.a_primitive_str);
			this.D_Thumbnail(thumbnail);
			this.a_primitive_bool(noindex);
			this.a_primitive_bool(unlisted);
			this.tz(tags,this.a_primitive_str);
			this.t(familySafe,x => {if(x!==true) debugger;});
			this.tz(availableCountries,this.a_primitive_str);
			this.z(linkAlternates,x => this.ht.B_HrefUrl(x));
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
	/** @public @arg {D_Cache_MD} x */
	D_Cache_MD(x) {
		const cf="D_Cache_MD";
		const {isCacheHit,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!isCacheHit) debugger;
	}
	/** @public @arg {R_ChannelHeaderLinks} x */
	R_ChannelHeaderLinks(x) {this.H_s("channelHeaderLinksRenderer",x,this.D_ChannelHeaderLinks);}
	/** @private @arg {D_ChannelHeaderLinks} x */
	D_ChannelHeaderLinks(x) {
		const cf="D_ChannelHeaderLinks";
		const {primaryLinks,secondaryLinks,...y}=this.s(cf,x); this.g(y);
		this.z(primaryLinks,this.D_PrimaryLinkItem);
		this.tz(secondaryLinks,this.D_PrimaryLinkItem);
	}
	/** @private @arg {D_NavigationLinkItem} x */
	D_PrimaryLinkItem(x) {
		const cf="D_PrimaryLinkItem";
		const {navigationEndpoint,icon,title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.xm.E_Url(navigationEndpoint);
		this.D_Thumbnail(icon);
		this.G_Text(title);
	}
	/** @arg {{}} x @arg {string[]} [k_acc] */
	make_key_for(x,k_acc=[],lim=4) {
		if(lim<=0) return k_acc.join(".");
		if(x instanceof Array) {
			k_acc.push("0");
			return x[0];
		}
		let kk1=Object.keys(x);
		let r=[];
		for(let kx of kk1) {
			if(kx=="clickTrackingParams") continue;
			if(kx=="commandMetadata") continue;
			r.push(kx);
		}
		if(r.length===0) return k_acc.join(".");
		let k1=r[0];
		k_acc.push(k1);
		/** @type {{[U in string]?:unknown}} */
		let xw=x;
		let nv=xw[k1];
		if(typeof nv!=="object") return k_acc.join(".");
		if(nv===null) return k_acc.join(".");
		let nvk=Object.keys(nv);
		r=[];
		for(let kx of nvk) {
			if(kx=="playlistId") continue;
			if(kx=="params") continue;
			r.push(kx);
		}
		k1=r[0];
		k_acc.push(k1);
		xw=nv;
		nv=xw[k1];
		if(typeof nv!=="object") return k_acc.join(".");
		if(nv===null) return k_acc.join(".");
		nv=this.make_key_for(nv,k_acc,2);
		if(typeof nv!=="object") return k_acc.join(".");
		if(nv===null) return k_acc.join(".");
		nvk=Object.keys(nv);
		r=[];
		for(let kx of nvk) {
			if(kx=="action") continue;
			r.push(kx);
		}
		k_acc.push(r[0]);
		return k_acc.join(".");
	}
	/** @public @arg {D_FancyDismissibleDialog} x */
	D_FancyDismissibleDialog(x) {
		const cf="D_FancyDismissibleDialog";
		const {dialogMessage,title,confirmLabel,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(dialogMessage);
		this.G_Text(confirmLabel);
		this.t(title,this.G_Text);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {R_FancyDismissibleDialog} x */
	R_FancyDismissibleDialog(x) {this.H_s("fancyDismissibleDialogRenderer",x,this.D_FancyDismissibleDialog);}
	/** @public @arg {R_PlaylistByline} x */
	R_PlaylistByline(x) {this.H_s("playlistBylineRenderer",x,this.D_PlaylistByline);}
	/** @private @arg {D_PlaylistByline} x */
	D_PlaylistByline(x) {this.y("D_PlaylistByline","text",x,this.G_Text);}
	/** @public @arg {D_CanDelete} x */
	D_EditableDetails(x) {this.y("D_EditableDetails","canDelete",x,this.a_primitive_bool);}
	/** @public @arg {D_CanShare} x */
	D_CanShare(x) {this.y("D_CanShare","canShare",x,this.a_primitive_bool);}
	/** @private @arg {DE_PlaylistEditor} x */
	DE_PlaylistEditor(x) {this.y("DE_PlaylistEditor","playlistId",x,this.playlistId);}
	//#region imports
	/** @arg {D_Menu_WithItems} x */
	D_Menu_WithItems(x) {
		const cf="D_Menu_WithItems";
		const {items,...u1}=this.s(cf,x);
		if(!this.is_not_empty_obj(u1)) return this.g(u1);
		this.z(items,x => {
			if("menuNavigationItemRenderer" in x) return this.R_MenuNavigationItem(x);
			if("menuServiceItemRenderer" in x) return this.R_MenuServiceItem(x);
			debugger;
		});
		const {trackingParams,...u2}=u1;
		this.trackingParams(trackingParams);
		if(!this.is_not_empty_obj(u2)) return this.g(u2);
		const {accessibility,...u3}=u2;
		this.D_Accessibility(accessibility);
		if(!this.is_not_empty_obj(u3)) return this.g(u3);
		let u=u3;
		if("flexibleItems" in u) {
			const {topLevelButtons,flexibleItems,...y}=u; this.g(y);/*#destructure_done*/
			this.z(topLevelButtons,x => {
				if("segmentedLikeDislikeButtonRenderer" in x) return this.R_SegmentedLikeDislikeButton(x);
				if("buttonRenderer" in x) return this.xm.R_Button(x);
				debugger;
			});
			this.z(flexibleItems,this.R_MenuFlexibleItem);
			return;
		}
		if("topLevelButtons" in u) {
			const {topLevelButtons,...y}=u; this.g(y);/*#destructure_done*/
			this.z(topLevelButtons,x => {
				if("buttonRenderer" in x) return this.xm.R_Button(x);
				debugger;
			});
			return;
		}
		if("loggingDirectives" in u) {
			const {loggingDirectives,...y}=u; this.g(y);/*#destructure_done*/
			this.D_LoggingDirectives(loggingDirectives);
			return;
		}
		if("menuPopupAccessibility" in u) {
			const {menuPopupAccessibility,...y}=u; this.g(y);/*#destructure_done*/
			this.xm.D_Label(menuPopupAccessibility);
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
		if("urlEndpoint" in x) return this.xm.E_Url(x);
		if("reelWatchEndpoint" in x) return this.x.get("x_VE37414").E_VE37414_ReelWatch(x);
		x===""; debugger;
	}
	/** @public @arg {Extract<D_TextRun,{navigationEndpoint:any;loggingDirectives:any}>["navigationEndpoint"]} x */
	D_TextRun_NavEP_2(x) {
		if("browseEndpoint" in x) {
			if(this.is_TE_VE(x,3611)) return this.E_VE3611(x);
			if(this.is_TE_VE(x,5754)) return this.E_VE5754(x);
			if(this.is_TE_VE(x,6827)) return this.E_VE6827(x);
			debugger;
			return;
		}
		if("urlEndpoint" in x) return this.xm.E_Url(x);
		if("searchEndpoint" in x) return this.E_Search(x);
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
			this.D_TextRun_NavEP_2(navigationEndpoint);
			this.D_LoggingDirectives(loggingDirectives);
			if("bold" in y) {
				const {bold,...y1}=y; this.g(y1);/*#destructure_done*/
				this.cq(bold,true);
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
	/** @public @arg {R_AdPlacement} x */
	R_AdPlacement(x) {this.H_("adPlacementRenderer",x,this.D_AdPlacement);}
	/** @private @arg {D_AdPlacement} x */
	D_AdPlacement(x) {
		const cf="D_AdPlacement";
		const {config,renderer,adSlotLoggingData,...y}=this.s(cf,x); this.g(y);
		this.R_AdPlacementConfig(config);
		this.ht.G_AdPlacementRendererItem(renderer);
		this.t(adSlotLoggingData,x => this.sm.D_SerializedSlotAdServingDataEntry(x));
	}
	/** @private @arg {R_AdPlacementConfig} x */
	R_AdPlacementConfig(x) {this.H_("adPlacementConfig",x,this.D_AdPlacementConfig);}
	/** @private @arg {D_AdPlacementConfig} x */
	D_AdPlacementConfig(x) {
		const cf="D_AdPlacementConfig";
		const {kind,adTimeOffset,hideCueRangeMarker,...y}=this.s(cf,x); this.g(y);
		this.DE_AdPlacementKind(kind);
		this.t(adTimeOffset,this.D_AdTimeOffset);
		this.sm.cq(hideCueRangeMarker,true);
	}
	/** @private @arg {DE_AdPlacementKind} x */
	DE_AdPlacementKind(x) {
		const cf="DE_AdPlacementKind"; let v=x;
		switch(x) {
			default: console.log(`${cf}.split`,v.split("AD_PLACEMENT_KIND_")); debugger; break;
			case "AD_PLACEMENT_KIND_MILLISECONDS":
			case "AD_PLACEMENT_KIND_END":
			case "AD_PLACEMENT_KIND_SELF_START":
			case "AD_PLACEMENT_KIND_START":
		}
	}
	/** @private @arg {D_AdTimeOffset} x */
	D_AdTimeOffset(x) {
		const cf="D_AdTimeOffset";
		const {offsetStartMilliseconds,offsetEndMilliseconds,...y}=this.s(cf,x); this.g(y);
		this.sm.a_primitive_str(offsetStartMilliseconds);
		this.sm.a_primitive_str(offsetEndMilliseconds);
	}
	//#endregion
	//#region imports
	/** @arg {`${number}`} x */
	_bd=x => this.mb(this.parse_number_template,this.m(x));
	/** @arg {`${number}`} x */
	_pn=x => this.mb(this.a_primitive_num,this._bd(x));
	get bd() {return this._bd.bind(this);}
	get pn() {return this._pn.bind(this);}
	//#endregion
}
export_(exports => {exports.ServiceMethods=ServiceMethods;});
export_(exports => exports.__module_loaded__=true);
