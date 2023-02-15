// ==UserScript==
// @name	YTPlugin HandleTypes Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://*.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/za_userscript_meta/YTPlugin_HandleTypes.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_HandleTypes.user.js
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
const base64_url_dec=bs.base64_url_dec;
const MyReader=bs.MyReader;
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
const ServiceMethods=required(store["mod$ServiceMethods"]).ServiceMethods;
const ServiceResolver=bs.ServiceResolver; ServiceResolver;
const as_any=bs.as_any;
const CodegenService=required(store["mod$CodegenService"]).CodegenService; CodegenService;
const ss=required(store["mod$SupportService"]);
//#endregion
//#region Constants
/** @type {{value:InstanceType<(typeof ss)["TypedefGenerator"]>|null}} */
const generate_typedef={value: null};
//#endregion
//#region HandleTypesEval
/** @arg {TemplateStringsArray} x */
function raw_template(x) {
	if(x.raw.length>1) {debugger;}
	return x.raw[0].replaceAll("\\`","`").replaceAll("\\${","${");
}
class JsonReplacerState {
	/** @constructor @public @arg {string} gen_name @arg {string[]} keys @arg {boolean} is_root */
	constructor(gen_name,keys,is_root) {
		this.object_count=0;
		this.gen_name=gen_name;
		this.key_keep_arr=keys;
		this.is_root=is_root;
		this.k1="";
		/** @api @public @type {unknown[]} */
		this.object_store=[];
		/** @api @public @type {Map<unknown,[number,string]>} */
		this.parent_map=new Map;
	}
}
const handle_types_eval_code=raw_template`
class HandleTypesEval extends ServiceMethods {}
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
	[],
].flat());
class HandleTypes extends HandleTypesEval {
	/** @template U @template {U[]} T @arg {T} x @returns {Join<{[R in keyof T]:`${T[R]}`},".f">} */
	fmt_arr(x) {
		return as(x.map(v => `${v}`).join(".f"));
	}
	/** @arg {"continuation_token.data.f49"} cf @arg {string} x */
	continuation_token_data_f49(cf,x) {
		let x1=decodeURIComponent(x);
		let buffer=base64_url_dec.decodeByteArray(x1);
		if(!buffer) {debugger; return;}
		let c_pos=0;
		for(;c_pos<6;c_pos++) this.save_number(`${cf}.${c_pos}`,buffer[c_pos]);
		{const n_len=4,na_arr=[...buffer.slice(c_pos,c_pos+n_len)]; this.save_number(`${cf}.${c_pos}-${c_pos+n_len}`,na_arr); c_pos+=n_len;}
		{let n_len=4; console.log(`[continuation_token_data_f49_log] [range:${c_pos}-${c_pos+n_len}]`,buffer.slice(c_pos,c_pos+4));}
	}
	get generate_typedef() {
		if(!generate_typedef.value) throw new Error();
		return generate_typedef.value;
	}
	/** @arg {ResolverT<LoadAllServices,ServiceOptions>} x */
	constructor(x) {
		super(x);
		generate_typedef.value=new ss.TypedefGenerator(x);
		this.RS_handle=new ss.HandleRS(x);
	}
	//#endregion
	/** @protected @template {(string|number)[]} T @template {T} R @arg {T} src @arg {R} target @returns {src is R} */
	is_eq_keys(src,target) {return this.eq_keys(src,target);}
	/** @public @arg {CF_L_TP_Params} root @arg {D_WatchPageUrl} x */
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
	/** @api @public @arg {IndexedDBService} service @arg {number} old_version @arg {IDBDatabase} db */
	indexed_db_createDatabaseSchema(service,old_version,db) {
		if(old_version<1) {
			service.create_store("video_id",db);
			service.create_store("hashtag_id",db);
			service.create_store("boxed_id",db);
		}
		if(old_version<2) {
			service.create_store("channel_id",db);
			service.create_store("playlist_id",db);
		}
		if(old_version<3) {
			service.create_store("browse_id",db);
		}
	}
	//#region templates
	/** @private @arg {string} cf @arg {K} k @template {keyof T} K @public @template {{}} T @arg {T} x */
	HD_(cf,k,x) {
		this.k(cf,x);
		let kx=this.get_keys_of(x);
		if(kx.length!==1) debugger;
		if(kx[0]!==k) debugger;
	}
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{[U in string]:{};}} T @arg {string} cf @arg {T} x */
	H_Get(cf,k,x) {return this.wn(cf,x,k);}
	// const cf="TR_ItemSection_2"; const {itemSectionRenderer: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/ return a;
	/** @public @template {{}} T @arg {TR_ItemSection_2<T,"comments-entry-point">} x */
	TR_ItemSection_2(x) {return this.wn("TR_ItemSection_2",x,"itemSectionRenderer");}
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		f.call(this,a);
	}
	/** @public @template {G_ShortsSurfaceIdentifier_ValidTag} T @arg {T_ShortsSurfaceIdentifier<T>} x */
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
	/** @arg {G_RichSection} x */
	G_RichSection(x) {
		const cf="G_RichSection"; this.k(cf,x);
		if("richShelfRenderer" in x) return this.R_RichShelf(x);
		if("inlineSurveyRenderer" in x) return this.R_InlineSurvey(x);
		if("sourcePivotHeaderRenderer" in x) return this.R_SourcePivotHeader(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD"; this.k(cf,x);
		if("channelMetadataRenderer" in x) return this.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.R_Playlist_MD(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar"; this.k(cf,x);
		if("settingsSidebarRenderer" in x) return this.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.R_PlaylistSidebar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem"; this.k(cf,x);
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RichGridContent} x */
	D_RichGridContent(x) {
		const cf="D_RichGridContent"; this.k(cf,x);
		if("richItemRenderer" in x) return this.R_RichItem(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		if("richSectionRenderer" in x) return this.R_RichSection(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RichItemContent} x */
	G_RichItemContent(x) {
		const cf="G_RichItemContent"; this.k(cf,x);
		if("adSlotRenderer" in x) return this.R_AdSlot(x);
		if("videoRenderer" in x) return this.R_Video(x);
		if("radioRenderer" in x) return this.R_Radio(x);
		if("feedNudgeRenderer" in x) return this.R_FeedNudge(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @protected @arg {Response} response @arg {G_ResponseTypes} x */
	G_ResponseTypes(response,x) {
		const cf="G_ResponseTypes"; this.g_k(cf,x);
		if(!response.ok) {
			console.log("not ok",x);
			return;
		}
		/** @private @arg {{type:string}} x */
		let g=x => {return this.save_string("need_api_type",x.type);};
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
			case "player": return this.RS_handle.RS_Player(x.data);
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
		x===""; this.codegen_typedef(cf,x);
		x===0;
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
		x===""; this.codegen_typedef(cf,x); x==="";
		x===""; this.codegen_typedef(cf,x);
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
		this.RS_handle.RS_Player(playerResponse);
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RS_Page_Shorts} x */
	G_RS_Page_Shorts(x) {
		const cf="RS_ShortsPage"; this.k(cf,x);
		if("rootVe" in x) return this.RS_VE37414_Shorts(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,previousCsn,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="shorts") debugger;
		this.E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.RS_handle.RS_Player(playerResponse);
		this.t(reelWatchSequenceResponse,this.RS_ReelWatchSequence);
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(previousCsn,x => this.D_VeCsn(x,true));
		this.t(cachedReelWatchSequenceResponse,this.RS_ReelWatchSequence);
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents"; this.k(cf,x);
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_SecondaryContents} x */
	G_SecondaryContents(x) {
		const cf="G_SecondaryContents"; this.k(cf,x);
		if("profileColumnRenderer" in x) return this.R_ProfileColumn(x);
		if("browseFeedActionsRenderer" in x) return this.R_BrowseFeedActions(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RS_Subscribe_Action} x */
	G_RS_Subscribe_Action(x) {
		const cf="RS_Subscribe_ActionItem"; this.k(cf,x);
		if("openPopupAction" in x) {
			/** @type {`${typeof cf}_Action`} */
			const cf1=`${cf}_Action`;
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf1,x); this.g(y);
			this.clickTrackingParams(clickTrackingParams);
			console.log(`[${cf}.openPopupAction]`,openPopupAction);
			return;
		}
		if("addToGuideSectionAction" in x) return this.A_AddToGuideSection(x);
		if("runAttestationCommand" in x) return this.C_RunAttestation(x);
		if("updateSubscribeButtonAction" in x) return this.AU_SubscribeButton(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_ProfileColumnItem} x */
	G_ProfileColumnItem(x) {
		const cf="G_ProfileColumnItem"; this.k(cf,x);
		if("profileColumnStatsRenderer" in x) return this.R_ProfileColumnStats(x);
		if("profileColumnUserInfoRenderer" in x) return this.R_ProfileColumnUserInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseFeedContent} x */
	G_BrowseFeedContent(x) {
		const cf="G_BrowseFeedContent"; this.k(cf,x);
		if("searchBoxRenderer" in x) return this.R_SearchBox(x);
		if("subFeedSelectorRenderer" in x) return this.R_SubFeedSelector(x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("compactLinkRenderer" in x) return this.R_CompactLink(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @arg {G_Action_GetNotificationsMenu_Popup} x */
	G_Action_GetNotificationsMenu_Popup(x) {
		const cf="G_Action_GetNotificationsMenu_Popup"; this.k(cf,x);
		const {popup: a,popupType,beReused,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(popupType!=="DROPDOWN") debugger;
		if(beReused!==true) debugger;
		return a;
	}
	/** @private @arg {G_LiveChatContinuationItem} x */
	G_LiveChatContinuationItem(x) {
		const cf="G_LiveChatContinuationItem"; this.k(cf,x);
		if("invalidationContinuationData" in x) return this.CD_Invalidation(x);
		if("liveChatReplayContinuationData" in x) return this.CD_LiveChatReplay(x);
		if("playerSeekContinuationData" in x) return this.CD_PlayerSeek(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RA_LiveChatContinuationActions} x */
	G_LiveChatContinuationActions(x) {
		const cf="G_LiveChatContinuationActions"; this.k(cf,x);
		if("replayChatItemAction" in x) return this.A_ReplayChatItem(x);
		if("addChatItemAction" in x) return this.A_AddChatItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent"; this.k(cf,x);
		if("buttonRenderer" in x) return this.R_Button(x);
		if("accountItem" in x) return this.A_AccountItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @arg {G_PlaylistPanel_Item} x */
	G_PlaylistPanel_Item(x) {
		const cf="G_PlaylistPanel_Item"; this.k(cf,x);
		if("automixPreviewVideoRenderer" in x) return this.R_AutomixPreviewVideo(x);
		if("playlistPanelVideoRenderer" in x) return this.R_PlaylistPanelVideo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_ChatItem} x */
	G_ChatItem(x) {
		const cf="G_ChatItem"; this.k(cf,x);
		if("liveChatTextMessageRenderer" in x) return;
		if("liveChatPlaceholderItemRenderer" in x) return;
		if("liveChatViewerEngagementMessageRenderer" in x) return;
	}
	//#endregion
	//#region helpers
	/** @protected @template {{}} T @arg {CF_M_s} cf @arg {{} extends T?T_DistributedKeysOf<T> extends []?T:never:never} x */
	gs(cf,x) {this.g(this.s(cf,x));}
	//#endregion
	//#region static & typedefs
	/** @typedef {{}} minimal_handler_member */
	static {this.prototype.minimal_handler_member_2({});}
	// /** @protected @override @type {<U,K extends T_DistributedKeyof<T>,T extends {}>(cf:string,x:T,f:(this:this,x:T[K])=>U)=>U} */
	// H_=super.H_;
	//#endregion
	//#region member functions
	/** @protected @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @returns {T[K]|null} */
	w_priv(k,x) {
		if(!(k in x)) {debugger; return null;}
		return x[k];
	}
	/** @protected @arg {CF_M_zy} cf @template U @arg {K} k @template {T_DistributedKeyof<T>} K @template {{}} T @arg {T} x @arg {(this:this,x:T[K][number],i:number)=>U} f */
	zy(cf,k,x,f) {return this.z(this.w(`zy:${cf}`,k,x),f);}
	//#endregion
	//#region CheckedTemplates
	/** @private @arg {CF_TA_Page} cf @template T @arg {T_Page<T>} x @template U @arg {(this:this,x:T)=>U} f */
	TA_Page(cf,x,f) {f.call(this,this.w(`TA_Page:${cf}`,"page",x));}
	/** @public @arg {CF_TR_MultiPageMenu} cf @template T @arg {TR_MultiPageMenu<T>} x */
	TR_MultiPageMenu(cf,x) {return this.w(`TR_MultiPageMenu:${cf}`,"multiPageMenuRenderer",x);}
	//#endregion
	//#region web_command_metadata
	//#endregion
	//#region general done
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {let [a,y]=this.TE_Endpoint_2("AU_NotificationsUnseenCount","updateNotificationsUnseenCountAction",x); this.g(y); this.AD_UpdateNotificationsUnseenCount(a);}
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H_("A_GetMultiPageMenu","getMultiPageMenuAction",x,this.AD_GetMultiPageMenu);}
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {let [a,y]=this.TE_Endpoint_2("A_AddToGuideSection","addToGuideSectionAction",x); this.g(y); this.AD_AddToGuideSection(a);}
	/** @private @arg {A_AddChatItem} x */
	A_AddChatItem(x) {let [a,y]=this.TE_Endpoint_2("A_AddChatItem","addChatItemAction",x); this.g(y); this.AD_AddChatItem(a);}
	/** @private @arg {A_ReplayChatItem} x */
	A_ReplayChatItem(x) {this.H_("A_ReplayChatItem","replayChatItemAction",x,this.AD_ReplayChatItem);}
	/** @private @arg {A_AccountItem} x */
	A_AccountItem(x) {this.H_("A_AccountItem","accountItem",x,this.AD_AccountItem);}
	/** @private @arg {R_Microformat} x */
	R_Microformat(x) {this.H_("R_Microformat","microformatDataRenderer",x,this.D_Microformat);}
	/** @private @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("R_SettingsSidebar","settingsSidebarRenderer",x,this.D_SettingsSidebar);}
	/** @public @arg {R_CompactLink} x */
	R_CompactLink(x) {this.H_("R_CompactLink","compactLinkRenderer",x,this.D_CompactLink);}
	/** @private @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("PlaylistSidebar","playlistSidebarRenderer",x,this.D_PlaylistSidebar);}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("R_PlaylistSidebarPrimaryInfo","playlistSidebarPrimaryInfoRenderer",x,this.D_PlaylistSidebarPrimaryInfo);}
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
	/** @private @arg {R_MusicQueue} x */
	R_MusicQueue(x) {this.H_("R_MusicQueue","musicQueueRenderer",x,this.D_MusicQueue);}
	/** @private @arg {R_RichGrid} x */
	R_RichGrid(x) {this.H_("R_RichGrid","richGridRenderer",x,this.D_RichGrid);}
	/** @public @arg {R_RichItem} x */
	R_RichItem(x) {this.H_("R_RichItem","richItemRenderer",x,this.D_RichItem);}
	/** @private @arg {R_FeedNudge} x */
	R_FeedNudge(x) {this.H_("R_FeedNudge","feedNudgeRenderer",x,this.D_FeedNudge);}
	/** @private @arg {R_MovingThumbnail} x */
	R_MovingThumbnail(x) {this.H_("R_MovingThumbnail","movingThumbnailRenderer",x,this.D_MovingThumbnail);}
	/** @private @arg {R_Radio} x */
	R_Radio(x) {this.H_("R_Radio","radioRenderer",x,this.D_Radio);}
	/** @private @arg {R_ChildVideo} x */
	R_ChildVideo(x) {this.H_("R_Radio","childVideoRenderer",x,this.D_ChildVideo);}
	/** @private @arg {R_Video} x */
	R_Video(x) {this.H_("R_Video","videoRenderer",x,this.D_Video);}
	/** @private @arg {R_ChannelThumbnailWithLink} x */
	R_ChannelThumbnailWithLink(x) {this.H_("R_ChannelThumbnailWithLink","channelThumbnailWithLinkRenderer",x,this.D_ChannelThumbnailWithLink);}
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
	/** @public @arg {R_CommentSimplebox} x */
	R_CommentSimplebox(x) {this.H_("R_CommentSimplebox","commentSimpleboxRenderer",x,this.D_CommentSimplebox);}
	/** @public @arg {R_CommentsSimplebox} x */
	R_CommentsSimplebox(x) {this.H_("R_CommentsSimplebox","commentsSimpleboxRenderer",x,this.D_CommentsSimplebox);}
	/** @public @arg {R_SortFilterSubMenu} x */
	R_SortFilterSubMenu(x) {this.H_("R_SortFilterSubMenu","sortFilterSubMenuRenderer",x,this.D_SortFilterSubMenu);}
	/** @public @arg {R_AdSlot} x */
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
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("R_Notification","notificationRenderer",x,this.D_Notification);}
	/** @private @arg {R_MusicCarouselShelf} x */
	R_MusicCarouselShelf(x) {this.H_("R_MusicCarouselShelf","musicCarouselShelfRenderer",x,this.D_MusicCarouselShelf);}
	/** @private @arg {R_MusicShelf} x */
	R_MusicShelf(x) {this.H_("R_MusicShelf","musicShelfRenderer",x,this.D_MusicShelf);}
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
	/** @public @arg {R_PlaylistPanelVideo} x */
	R_PlaylistPanelVideo(x) {this.H_("R_PlaylistPanelVideo","playlistPanelVideoRenderer",x,this.D_PlaylistPanelVideo);}
	/** @private @arg {R_C4TabbedHeader} x */
	R_C4TabbedHeader(x) {this.H_("R_C4TabbedHeader","c4TabbedHeaderRenderer",x,this.D_C4TabbedHeader);}
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("FeedTabbedHeader","feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @public @arg {R_FeedFilterChipBar} x */
	R_FeedFilterChipBar(x) {this.H_("R_FeedFilterChipBar","feedFilterChipBarRenderer",x,this.D_FeedFilterChipBar);}
	/** @private @arg {R_TwoColumnBrowseResults} x */
	R_TwoColumnBrowseResults(x) {this.H_("R_TwoColumnBrowseResults","twoColumnBrowseResultsRenderer",x,this.D_TwoColumnBrowseResults);}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("R_AddToPlaylist","addToPlaylistRenderer",x,this.D_AddToPlaylist);}
	/** @public @arg {R_Comment} x */
	R_Comment(x) {this.H_("Comment","commentRenderer",x,this.D_Comment);}
	/** @private @arg {R_ElementUpdate} x */
	R_ElementUpdate(x) {this.H_("ElementUpdate","updates",x,x => this.z(x,this.D_ElementUpdate));}
	/** @public @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H_("TemplateUpdate","templateUpdate",x,this.D_TemplateUpdate);}
	/** @public @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("R_ResourceStatusInResponseCheck","resourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @private @arg {R_ProfileColumn} x */
	R_ProfileColumn(x) {this.H_("ProfileColumn","profileColumnRenderer",x,this.D_ProfileColumn);}
	/** @private @arg {R_BrowseFeedActions} x */
	R_BrowseFeedActions(x) {this.H_("BrowseFeedActions","browseFeedActionsRenderer",x,this.D_BrowseFeedActions);}
	/** @public @arg {R_CompactVideo} x */
	R_CompactVideo(x) {this.H_("R_CompactVideo","compactVideoRenderer",x,this.D_CompactVideo);}
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("Transcript","transcriptRenderer",x,this.D_Transcript);}
	/** @public @arg {R_ChipCloudChip} x */
	R_ChipCloudChip(x) {this.H_("ChipCloudChip","chipCloudChipRenderer",x,this.D_ChipCloudChip);}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("R_MusicThumbnail","musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("R_ReportFormModal","reportFormModalRenderer",x,this.g);}
	/** @private @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("R_PlaylistHeader","playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @public @arg {R_VideoViewCount} x */
	R_VideoViewCount(x) {this.H_("R_VideoViewCount","videoViewCountRenderer",x,this.D_VideoViewCount);}
	/** @private @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("R_TwoColumnSearchResults","twoColumnSearchResultsRenderer",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {this.H_("R_PlaylistSidebarSecondaryInfo","playlistSidebarSecondaryInfoRenderer",x,this.D_PlaylistSidebarSecondaryInfo);}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("R_TranscriptSearchPanel","transcriptSearchPanelRenderer",x,this.D_TranscriptSearchPanel);}
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
	/** @public @arg {R_CommentsEntryPointTeaser} x */
	R_CommentsEntryPointTeaser(x) {this.H_("R_CommentsEntryPointTeaser","commentsEntryPointTeaserRenderer",x,this.D_CommentsEntryPointTeaser);}
	/** @public @arg {R_SectionList} x */
	R_SectionList(x) {this.H_("R_SectionList","sectionListRenderer",x,this.GD_RC_SectionList);}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("R_AddToPlaylistCreate","addToPlaylistCreateRenderer",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("R_PlaylistAddToOption","playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {R_CommentActionButtons} x */
	R_CommentActionButtons(x) {this.H_("R_CommentActionButtons","commentActionButtonsRenderer",x,this.D_CommentActionButtons);}
	/** @private @arg {R_HeroPlaylistThumbnail} x */
	R_HeroPlaylistThumbnail(x) {this.H_("R_HeroPlaylistThumbnail","heroPlaylistThumbnailRenderer",x,this.D_HeroPlaylistThumbnail);}
	/** @private @arg {R_PlaylistByline} x */
	R_PlaylistByline(x) {this.H_("R_PlaylistByline","playlistBylineRenderer",x,this.D_PlaylistByline);}
	/** @public @arg {R_ClipCreationTextInput} x */
	R_ClipCreationTextInput(x) {this.H_("R_ClipCreationTextInput","clipCreationTextInputRenderer",x,this.D_ClipCreationTextInput);}
	/** @public @arg {R_ClipAdState} x */
	R_ClipAdState(x) {this.H_("R_ClipAdState","clipAdStateRenderer",x,this.D_ClipAdState);}
	/** @public @arg {R_ClipCreationScrubber} x */
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
	/** @public @arg {R_LiveChatHeader} x */
	R_LiveChatHeader(x) {this.H_("R_LiveChatHeader","liveChatHeaderRenderer",x,this.D_LiveChatHeader);}
	/** @private @arg {R_LiveChatMessageInput} x */
	R_LiveChatMessageInput(x) {this.H_("R_LiveChatMessageInput","liveChatMessageInputRenderer",x,this.g);}
	/** @private @arg {R_EmojiPicker} x */
	R_EmojiPicker(x) {this.H_("R_EmojiPicker","emojiPickerRenderer",x,this.D_EmojiPicker);}
	/** @private @arg {R_ChannelHeaderLinks} x */
	R_ChannelHeaderLinks(x) {this.H_("R_ChannelHeaderLinks","channelHeaderLinksRenderer",x,this.D_ChannelHeaderLinks);}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("R_ChannelSwitcherHeader","channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @public @arg {R_VideoOwner} x */
	R_VideoOwner(x) {this.H_("R_VideoOwner","videoOwnerRenderer",x,this.D_VideoOwner);}
	/** @private @arg {R_MusicResponsiveListItem} x */
	R_MusicResponsiveListItem(x) {this.H_("R_MusicResponsiveListItem","musicResponsiveListItemRenderer",x,this.g);}
	/** @private @arg {R_MusicShelfDivider} x */
	R_MusicShelfDivider(x) {this.H_("R_MusicShelfDivider","musicShelfDividerRenderer",x,this.g);}
	/** @private @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("R_TextInputFormField","textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("R_Dropdown","dropdownRenderer",x,this.D_Dropdown);}
	/** @public @arg {R_TopicLink} x */
	R_TopicLink(x) {this.H_("R_TopicLink","topicLinkRenderer",x,this.D_TopicLink);}
	/** @public @arg {R_CarouselLockup} x */
	R_CarouselLockup(x) {this.H_("R_CarouselLockup","carouselLockupRenderer",x,this.D_CarouselLockup);}
	/** @public @arg {R_RichListHeader} x */
	R_RichListHeader(x) {this.H_("R_RichListHeader","richListHeaderRenderer",x,this.D_RichListHeader);}
	/** @public @arg {R_MacroMarkersListItem} x */
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
	/** @public @arg {R_Factoid} x */
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
	/** @public @arg {R_RichMetadataRow} x */
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
	/** @private @arg {R_TextHeader} x */
	R_TextHeader(x) {this.H_("R_TextHeader","textHeaderRenderer",x,this.D_TextHeader);}
	/** @private @arg {R_EmojiPickerCategory} x */
	R_EmojiPickerCategory(x) {this.H_("R_EmojiPickerCategory","emojiPickerCategoryRenderer",x,this.D_EmojiPickerCategory);}
	/** @private @arg {R_EmojiPickerCategoryButton} x */
	R_EmojiPickerCategoryButton(x) {this.H_("R_EmojiPickerCategoryButton","emojiPickerCategoryButtonRenderer",x,this.D_EmojiPickerCategoryButton);}
	/** @public @arg {R_CommentReplies} x */
	R_CommentReplies(x) {this.H_("R_CommentReplies","commentRepliesRenderer",x,this.D_CommentReplies);}
	/** @public @arg {R_MetadataRow} x */
	R_MetadataRow(x) {this.H_("R_MetadataRow","metadataRowRenderer",x,this.D_MetadataRow);}
	/** @private @arg {CD_TimedContinuation} x */
	CD_TimedContinuation(x) {this.H_("CD_TimedContinuation","timedContinuationData",x,this.DC_Timed);}
	/** @private @arg {CD_Reload} x */
	CD_Reload(x) {
		this.y("CD_Reload","reloadContinuationData",x,x => this.DC_Generic_CTP("reload.continuation",x));
	}
	/** @private @arg {CD_NextRadio} x */
	CD_NextRadio(x) {
		this.y("CD_NextRadio","nextRadioContinuationData",x,
			x => this.DC_Generic_CTP("next_radio.continuation",x));
	}
	/** @private @arg {AU_SubscribeButton} x */
	AU_SubscribeButton(x) {this.H_("UA_SubscribeButton","updateSubscribeButtonAction",x,this.AD_SubscribeButton);}
	/** @private @arg {AU_ChannelSwitcherPage} x */
	AU_ChannelSwitcherPage(x) {this.H_("UA_ChannelSwitcherPage","updateChannelSwitcherPageAction",x,this.AD_UpdateChannelSwitcherPage);}
	/** @private @arg {AD_GetMultiPageMenu} x */
	AD_GetMultiPageMenu(x) {this.H_("AD_GetMultiPageMenu","menu",x,x => this.TR_MultiPageMenu("TR_MultiPageMenu_Empty",x));}
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.H_("C_RunAttestation","runAttestationCommand",x,this.D_RunAttestation);}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",x); this.g(y); this.g(a);}
	/** @private @arg {C_RelatedChip} x */
	C_RelatedChip(x) {let [a,y]=this.TE_Endpoint_2("C_RelatedChip","relatedChipCommand",x); this.g(y); this.DC_RelatedChip(a);}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @arg {C_FollowUp} x */
	C_FollowUp(x) {let [a,y]=this.TE_Endpoint_2("C_FollowUp","addFollowUpSurveyCommand",x); this.g(y); this.DC_AddFollowUpSurvey(a);}
	/** @private @arg {DC_AddFollowUpSurvey} x */
	DC_AddFollowUpSurvey(x) {
		const cf="DC_AddFollowUpSurvey";
		const {followUpOptions,followUpText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @private @arg {DC_RelatedChip} x */
	DC_RelatedChip(x) {
		const cf="DC_RelatedChip";
		const {targetSectionIdentifier,loadCached,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(targetSectionIdentifier!=="sid-wn-chips") debugger;
		if(loadCached!==true) debugger;
	}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
	}
	/** @private @arg {DC_Timed} x */
	DC_Timed(x) {
		const cf="DC_Timed"; this.k(cf,x);
		const {timeoutMs,continuation,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(timeoutMs!==60000) debugger;
		this.params("timed_continuation.data",continuation);
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
		this.trackingParams(b);
		if(fullBleed!==false) debugger;
	}
	cg_mismatch_set=new Set();
	/** @type {[string,string][]} */
	cg_mismatch_list=[];
	/** @public @arg {D_FrameworkUpdates} x */
	D_FrameworkUpdates(x) {
		const cf="D_FrameworkUpdates"; this.k(cf,x);
		const {entityBatchUpdate,elementUpdate,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DR_DC_EntityBatchUpdate(entityBatchUpdate);
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
		this.trackingParams(trackingParams);
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
					this._primitive_of(expirationTime,"number");
					this.save_number(`${cf}.rootVe`,rootVe);
				} break;
				default: debugger; break;
			}
			return;
		}
		if("expirationTime" in x) {
			const {expirationTime,...y}=this.RS_BrowsePage_Omit(cf,x); this.g(y);
			this._primitive_of(expirationTime,"number");
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
		if("searchEndpoint" in x) return this.E_VE4724_Search(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {E_Settings} x */
	E_Settings(x) {x; debugger;}
	//#region E_ (Endpoints)
	/** @private @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {const [a,b,y]=this.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.DE_YpcGetCart(b);}
	/** @private @arg {E_PlaylistEditor} x */
	E_PlaylistEditor(x) {const [a,b,y]=this.TE_Endpoint_3("E_PlaylistEditor","playlistEditorEndpoint",x); this.g(y); this.M_Empty_WCM("DC_PlaylistEditor",a); this.DE_PlaylistEditor(b);}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
	/** @private @arg {string} cf @arg {M_Empty_WCM} x */
	M_Empty_WCM(cf,x) {this.codegen_typedef(cf,x); this.GEN(cf,x);}
	/** @private @arg {GM_YpcGetCart} x */
	GM_YpcGetCart(x) {this.T_GM("GM_YpcGetOffers",x,x => this.ceq(x,"/youtubei/v1/ypc/get_cart"));}
	/** @private @arg {DE_SuperThanksSelectedTier} x */
	DE_SuperThanksSelectedTier(x) {
		const cf="DE_SuperThanksSelectedTier";
		const {index,key,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		console.log("super_thanks_selected_tier.index",index);
		console.log("super_thanks_selected_tier.key",key);
	}
	/** @private @arg {DE_YpcGetCart} x */
	DE_YpcGetCart(x) {this.TD_Params("DE_YpcGetCart","ypc_get_cart.transaction_params","transactionParams",x);}
	/** @private @arg {DE_PlaylistEditor} x */
	DE_PlaylistEditor(x) {this.y("DE_PlaylistEditor","playlistId",x,this.playlistId);}
	/** @private @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse"; this.k(cf,x);
		x: {
			let jk=this.get_keys_of(x).join();
			if(jk==="responseContext,contents,header,metadata,trackingParams,topbar,microformat,onResponseReceivedActions,frameworkUpdates") break x;
			if(jk==="responseContext,continuationContents,metadata,trackingParams,microformat,onResponseReceivedActions,frameworkUpdates") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates") break x;
			if(jk==="responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,cacheMetadata") break x;
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
		const {responseContext,header,trackingParams,onResponseReceivedActions,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(trackingParams);
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
		if("uploadEndpoint" in x) return this.E_VE83769_Upload(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("signalNavigationEndpoint" in x) return this.E_SignalNavigation(x);
		if("urlEndpoint" in x) return this.E_VE83769_Url(x);
		x===""; this.codegen_typedef(cf,x);
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
		this.cg.make_codegen_group(cf,x);
	}
	/** @private @template {D_CompactLink} T @arg {CF_D_Link} cf @arg {T} x */
	D_Link_Omit(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		if("getSurveyCommand" in onCloseCommand) return this.C_GetSurvey(onCloseCommand);
		{debugger;}
	}
	/** @private @arg {D_PlaylistSidebar} x */
	D_PlaylistSidebar(x) {
		const cf="D_PlaylistSidebar"; this.k(cf,x);
		const {items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_PlaylistSidebarItem);
		this.trackingParams(trackingParams);
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>['endpoint']} x */
	D_Tab_subscriptionsEndpoint(x) {
		const cf="D_Tab_subscriptionsEndpoint"; this.k(cf,x);
		switch(x.commandMetadata.webCommandMetadata.rootVe) {
			default: this.codegen_typedef(cf,x); debugger; break;
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
					this.trackingParams(trackingParams);
				} break;
				case "FEsubscriptions": {
					const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(`${cf}_Subscriptions`,x); this.g(y);
					this.D_Tab_subscriptionsEndpoint(endpoint);
					if(selected!==true) debugger;
					if(!content.sectionListRenderer) debugger;
					this.R_SectionList(content);
					this.trackingParams(trackingParams);
				} break;
				case "FEwhat_to_watch": {
					const {selected,content,tabIdentifier: {},trackingParams,...y}=this.s(`${cf}_WhatToWatch`,x); this.g(y);
					if(selected!==true) debugger;
					if(!content.richGridRenderer) debugger;
					this.R_RichGrid(content);
					this.trackingParams(trackingParams);
				} break;
			}
			return;
		}
		if("selected" in x) {return;}
		if("content" in x) {
			/** @type {`${typeof cf}_${"R_MusicQueue"}`} */
			const cf2=`${cf}_${"R_MusicQueue"}`;
			const {content,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			this.R_MusicQueue(content);
			this.trackingParams(trackingParams);
			return;
		}
		x: {
			if(!("endpoint" in x)) break x;
			/** @type {`${typeof cf}_WithEndpoint`} */
			const cf2=`${cf}_WithEndpoint`;
			const {endpoint,title,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			if(endpoint.commandMetadata.webCommandMetadata.rootVe!==3611) debugger;
			this.GE_Browse(endpoint);
			this.trackingParams(trackingParams);
			this.save_string(`${cf2}.title`,title);
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
		this.trackingParams(trackingParams);
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
			this.trackingParams(trackingParams);
			this.save_number("Item.pos",[rowIndex,colIndex]);
			return;
		}
		const {content,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_RichItemContent(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_VideoLike_richThumbnail} x */
	D_VideoLike_richThumbnail(x) {
		const cf="D_VideoLike_richThumbnail"; this.k(cf,x);
		if("movingThumbnailRenderer" in x) return this.R_MovingThumbnail(x);
		x===""; this.codegen_typedef(cf,x);
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
	/** @private @arg {GR_MP_MenuNotificationSection_Item} x */
	GR_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item"; this.k(cf,x);
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @public @template {D_CompactPlaylist|D_Radio|D_CompactRadio} T @arg {CF_D_Menu_Omit} cf @arg {T} x */
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
	/** @public @arg {CF_D_Menu_Omit} cf @template {{thumbnailOverlays:G_ThumbnailOverlayItem[]}} T @arg {T} x */
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
		this.trackingParams(trackingParams);
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_Video_inlinePlaybackEndpoint} x */
	D_Video_inlinePlaybackEndpoint(x) {
		const cf="D_Video_inlinePlaybackEndpoint"; this.k(cf,x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		x===""; this.codegen_typedef(cf,x);
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
			case "watch": return this.RS_handle.RS_WatchPage(x);
			case "channel": return this.RS_Page_Channel(x);
			case "playlist": return this.G_RS_Page_Playlist(x);
			case "settings": return this.G_RS_Page_Settings(x);
			case "shorts": return this.G_RS_Page_Shorts(x);
			case "search": return this.RS_SearchPage(x);
			default: break;
		}
		console.log("pt",x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu"; this.k(cf,x);
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist"; this.k(cf,x);
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey"; this.k(cf,x);
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow"; this.k(cf,x);
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let pu=this.TA_OpenPopup("TA_OpenPopup:R_PdgBuyFlow",command);
		if("pdgBuyFlowRenderer" in pu) {this.R_PdgBuyFlow(pu);}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent"; this.k(cf,x);
		const {description,buyButton,trackingParams,commentPreview,disclaimerText,colorSlider,defaultPriceTier,superThanksSelectedTierEntity,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([description,disclaimerText],this.G_Text);
		this.R_Button(buyButton);
		this.trackingParams(trackingParams);
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
	ignore_incorrect_name_set=new Set([
		"D_CommonConfig",
	]);
	/** @private @arg {object} x1 */
	get_codegen_name(x1) {
		return this.cg.get_codegen_name_obj(x1);
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
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
		let ac=this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		if(!ac) return;
		let [r1]=ac;
		this.z(r1,this.g);
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
		this.trackingParams(trackingParams);
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
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {D_MP_MenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection"; this.k(cf,x);
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(items,this.GR_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {D_NotificationMenu_PopupItem} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem"; this.k(cf,x);
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_NotificationMenu_Popup} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup"; this.k(cf,x);
		const {popupType: a,popup: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(a!=="DROPDOWN") {this.codegen_typedef(cf,x); return null;}
		return b;
	}
	/** @private @arg {RSG_NotificationMenu_Action} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action"; this.k(cf,x);
		if("openPopupAction" in x) return this.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		x===""; this.codegen_typedef(cf,x);
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
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader"; this.k(cf,x);
		const {title,buttons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {string} x */
	RS_Next_ContextParams(x) {this.params("next.queue_context.params",x);}
	/** @private @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next"; this.k(cf,x);
		const {responseContext: {},contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,videoReporting,queueContextParams,continuationContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(contents,this.G_NextContents);
		this.t(currentVideoEndpoint,this.E_Watch);
		this.trackingParams(trackingParams);
		this.t(playerOverlays,this.R_PlayerOverlay);
		this.tz(onResponseReceivedEndpoints,a => this.GE_ResponseReceived(cf,a));
		this.tz(engagementPanels,this.R_EngagementPanelSectionList);
		this.t(topbar,this.R_DesktopTopbar);
		this.tz(pageVisualEffects,this.R_CinematicContainer);
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		this.t(videoReporting,this.R_ReportFormModal);
		this.t(queueContextParams,this.RS_Next_ContextParams);
		this.t(continuationContents,this.RC_PlaylistPanel);
	}
	/** @private @arg {RC_SectionList} x */
	RC_SectionList(x) {this.H_("RC_SectionList","sectionListContinuation",x,this.GD_RC_SectionList);}
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("RC_PlaylistPanel","playlistPanelContinuation",x,this.g);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("RC_LiveChat","liveChatContinuation",x,this.DC_LiveChat);}
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults"; this.k(cf,x);
		const {tabs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,this.R_Tab);
	}
	//#region pause
	//#endregion
	/** @template {{}} T @arg {T} x @arg {keyof T} k */
	T_EP_In(x,k) {return x[k];}
	/** @public @arg {string} cf @arg {{}} x */
	GEN(cf,x) {
		let name=this.get_codegen_name(x);
		if(!name) return;
		this.cg.codegen_renderer(x,`${cf}$${name}`);
		debugger;
	}
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {const cf="D_MenuServiceItem_Omit"; const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); f.call(this,serviceEndpoint); return y;}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem"; this.k(cf,x);
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(trackingParams);
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
	/** @template {number} T @arg {T} x @returns {`${T}`} */
	num_to_string(x) {return `${x}`;}
	/** @public @arg {CF_D_Menu_Omit} cf @template {D_Omit_Compact_Player} T @arg {T} x */
	D_Omit_Compact_Player(cf,x) {
		const {title,trackingParams,...y}=this.s(cf,x);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		return y;
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
	/** @private @template {D_CompactVideo} T @arg {"D_CompactVideo"} cf @arg {T} x @returns {T_OmitKey<T,Exclude<keyof T,Omit_y>>} */
	D_CompactVideo_Omit(cf,x) {
		let u=this.D_ThumbnailOverlay_Omit(cf,x);
		let {richThumbnail,accessibility,channelThumbnail,badges,viewCountText,shortViewCountText,...y}=u;
		this.t(richThumbnail,this.D_VideoLike_richThumbnail);
		this.D_Accessibility(accessibility);
		this.D_Thumbnail(channelThumbnail);
		this.tz(badges,this.RMD_Badge);
		/** @typedef {keyof typeof y} Omit_y */
		return as_any(y);
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
		x===""; this.codegen_typedef(cf,x);
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
	/** @private @arg {MG_AdLayout["layoutId"]} x */
	MG_AdLayout_LayoutId(x) {
		this.save_b64_binary("AdLayout.layoutId",x);
	}
	/** @private @arg {MG_AdLayout} x */
	MG_AdLayout(x) {
		const cf="MG_AdLayout";
		switch(x.layoutType) {
			default: debugger; break;
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES": {
				const {layoutType,layoutId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.MG_AdLayout_layoutType(layoutType);
				this.MG_AdLayout_LayoutId(layoutId);
			} break;
			case "LAYOUT_TYPE_DISPLAY_TOP_LANDSCAPE_IMAGE": {
				const {layoutType,layoutId,adLayoutLoggingData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.MG_AdLayout_layoutType(layoutType);
				this.MG_AdLayout_LayoutId(layoutId);
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
			this.save_number("AdSlot.slotId[0]",Number(n));
			this.save_number("AdSlot.slotId[1..]",sid.slice(1).map(e => Number.parseInt(e,10)));
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
		this.params("ad_slot_logging_data.serialized_slot_ad_serving_data_entry",a);
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
	/** @private @arg {AD_UpdateEngagementPanel} x */
	AD_UpdateEngagementPanel(x) {
		const cf="AD_UpdateEngagementPanel"; this.k(cf,x);
		const {content,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
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
		this.trackingParams(trackingParams);
		this.t(replacementEndpoint,this.E_ReelWatch);
		this.t(sequenceContinuation,this.a_primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @private @arg {GA_ResponseReceived} x */
	GA_ResponseReceived(x) {
		const cf="GA_ResponseReceived"; this.k(cf,x);
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("appendContinuationItemsAction" in x) return this.A_AppendContinuationItems(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		if("resetChannelUnreadCountCommand" in x) return this.C_ResetChannelUnreadCount(x);
		x===""; this.codegen_typedef(cf,x);
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
	/** @public @arg {P_ParamParse} cf @arg {string} x */
	decode_continuation_token(cf,x) {
		this.decode_continuation_token_no_uri(cf,decodeURIComponent(x));
	}
	/** @private @type {string[]} */
	typedef_cache=[];
	/** @api @public @arg {JsonReplacerState} s @arg {string} key @arg {unknown} obj @returns {unknown} */
	typedef_json_replace_bin(s,key,obj) {
		if(obj===null||obj===void 0) return obj;
		if(typeof obj==="bigint") return `TYPE::V_Bigint<${obj}n>`;
		if(typeof obj==="boolean") return obj;
		if(typeof obj==="function") return obj;
		if(typeof obj==="number") return obj;
		if(typeof obj==="symbol") return obj;
		if(typeof obj==="string") return this.cg.typedef_json_replace_string(obj,key);
		if(typeof obj!=="object") return obj;
		if(obj instanceof Array) {
			if(obj.length===1) {
				if(typeof obj[0]==="number") {
					return `TYPE::T_VW<${obj[0]}>`;
				}
				return `TYPE::T_VW<${this.gen_typedef_bin_json(s,obj[0])}>`;
			}
			/** @type {D_DecTypeNum} */
			let otu=as(obj);
			if(otu[0]==="child") return this.convert_arr_to_obj([otu]);
			if(otu[0]==="data32") return this.convert_arr_to_obj([otu]);
			/** @type {D_DecTypeNum[]} */
			let ota=obj;
			if(ota[0][0]==="child") {
				let res=this.convert_arr_to_obj(ota);
				if(res!==null) return res;
			}
			console.log("[maybe_handle_bin.do_handle_arr]",obj);
			return obj;
		}
		if(obj instanceof Uint8Array) return `TYPE::T_Uint8Array<${obj.length}>`;
		s;
		return obj;
	}
	/** @api @public @arg {JsonReplacerState} s @arg {object} x @returns {string} */
	gen_typedef_bin_json(s,x) {
		let json_res=JSON.stringify(x,this.typedef_json_replace_bin.bind(this,s),"\t");
		json_res=this.replace_until_same(json_res,/\[\s+{([^\[\]]*)}\s+\]/g,(_a,/**@type {string} */v) => {
			let vi=v.split("\n").map(e => `${e.slice(0,1).trim()}${e.slice(1)}`).join("\n");
			return `[${vi}]`;
		});
		json_res=json_res.replaceAll(/"TYPE::(.+)"/gm,(_a,/**@type {string} */x) => {
			let [f,...r]=x.replaceAll(/\\"|\\n|\\t/g,(/**@type {string} */v) => {
				if(v==="\\\"") return "\"";
				if(v==="\\n") return "\n";
				if(v==="\\t") return "\t";
				return v;
			}).split("\n");
			r=r.map(e => `\t${e}`);
			return [f,...r].join("\n");
		});
		json_res=json_res.replaceAll(/\"(\w+)\":/g,(_a,g) => {return g+":";});
		return json_res;
	}
	/** @api @public @arg {JsonReplacerState} s @arg {string} cf @arg {object} x @returns {string} */
	gen_typedef_bin(s,cf,x) {
		return `\ntype ${cf}=${this.gen_typedef_bin_json(s,x)}\n`;
	}
	/** @api @public @arg {string} cf @arg {object} x @arg {boolean} [do_break] @returns {string|null|void} */
	codegen_typedef_bin(cf,x,do_break=true) {
		/** @private @type {JsonReplacerState} */
		let s=new JsonReplacerState(cf,[],true);
		let res_str=this.gen_typedef_bin(s,cf,x);
		if(res_str) {
			if(!this.typedef_cache.includes(res_str)) {
				this.typedef_cache.push(res_str);
				console.log(res_str);
			}
		}
		if(do_break) {debugger;}
	}
	/** @protected @arg {K} k @template U @template {T_DistributedKeyof<T>} K @template {{[U in string]:T_VW<{}>;}} T @arg {string} cf @arg {T} x @arg {(this:this,x:T[K][0])=>U} f */
	H_d(cf,k,x,f) {
		if(!x) {debugger; return;}
		let wr=this.wn(cf,x,k);
		if(!wr) return;
		return f.call(this,wr[0][0]);
	}
	/** @private @arg {D_GetPgdBuyFlow} x */
	D_GetPgdBuyFlow(x) {x;}
	/** @private @arg {R_GetPgdBuyFlow} x */
	R_GetPgdBuyFlow(x) {
		const cf="R_GetPgdBuyFlow";
		if(1 in x) return this.H_d(cf,1,x,this.D_GetPgdBuyFlow);
		debugger;
	}
	/** @private @arg {P_ReelPlayerParams} x */
	P_ReelPlayerParamsObj(x) {
		if(30 in x) return;
		debugger;
	}
	/** @private @arg {P_ReelParams} x */
	P_ReelParams(x) {
		const cf="P_ReelParams"; this.k(cf,x);
		if(1 in x) {
			this.save_string(`${cf}_t${x[1]}`,Object.keys(x));
			return;
		}
		debugger;
	}
	/** @private @arg {P_ReelSequenceParams} x */
	P_ReelSequenceParams(x) {
		if(5 in x) return;
		debugger;
	}
	/** @type {string[]} */
	continuation_logged_str=[];
	/** @private @arg {P_ParamParse} cf @arg {V_ParamObj} x */
	decode_continuation_token_obj(cf,x) {
		switch(cf) {
			default: {
				if(this.continuation_logged_str.includes(cf)) break;
				this.continuation_logged_str.push(cf);
				console.log(`\ncase "${cf}":`);
				this.codegen_typedef_bin(`P_${cf.replaceAll(".","_")}`,x,false);
			} break;
			case "continuation_request.reel_watch_sequence.token": {
				/** @type {P_continuation_request_reel_watch_sequence_token} */
				let u=as_any(x); u;
			} break;
			case "entity.key": {
				/** @type {P_entity_key} */
				let u=as_any(x); u;
			} break;
			case "entity_key.normal": {
				/** @type {P_entity_key_normal} */
				let u=as_any(x); u;
			} break;
			case "playability_status.context_params": {
				/** @type {P_playability_status_context_params} */
				let u=as_any(x); u;
			} break;
			case "continuation_request.browse.token": {
				/** @type {P_continuation_request_browse_token} */
				let u=as_any(x); u;
			} break;
			case "unsubscribe.params": {
				/** @type {P_unsubscribe_params} */
				let u=as_any(x); u;
			} break;
			case "subscribe.params": {
				/** @type {P_subscribe_params} */
				let u=as_any(x); u;
			} break;
			case "remove_like.params": {
				/** @type {P_remove_like_params} */
				let u=as_any(x); u;
			} break;
			case "dislike.params": {
				/** @type {P_dislike_params} */
				let u=as_any(x); u;
			} break;
			case "like.params": {
				/** @type {P_LikeParams} */
				let u=as_any(x); u;
			} break;
			case "reel.sequence_params": {
				/** @type {P_ReelSequenceParams} */
				let u=as_any(x);
				this.P_ReelSequenceParams(u);
			} break;
			case "reel.params": {
				/** @type {P_ReelParams} */
				let u=as_any(x);
				this.P_ReelParams(u);
			} break;
			case "reel.player_params": {
				/** @type {P_ReelPlayerParams} */
				let u=as_any(x);
				this.P_ReelPlayerParamsObj(u);
			} break;
			case "get_pdg_buy_flow.params": {
				/** @type {R_GetPgdBuyFlow} */
				let u=as_any(x);
				this.R_GetPgdBuyFlow(u);
			} break;
			case "tracking.params": {
				/** @type {R_TrackingObj} */
				let u=as_any(x);
				this.R_TrackingObj(u);
			} break;
			case "tracking.click_tracking_params": {
				/** @type {R_ClickTrackingObj} */
				let u=as_any(x);
				this.R_ClickTrackingObj(u);
			} break;
		}
	}
	/** @private @arg {P_ParamParse} cf @arg {D_DecTypeNum[]} x */
	decode_continuation_token_dec_arr(cf,x) {
		if(x.length===0) debugger;
		let bin_obj=this.convert_arr_to_obj(x);
		if(!bin_obj) {debugger; return;}
		try {
			this.decode_continuation_token_obj(cf,bin_obj);
		} catch(e) {
			console.log("failed to decode token",bin_obj);
			console.log("[failed_with]");
			console.log(e);
		}
	}
	/** @private @arg {P_ParamParse} cf @arg {string} x */
	decode_continuation_token_no_uri(cf,x) {
		let buffer=base64_url_dec.decodeByteArray(x);
		if(!buffer) return;
		let reader=new MyReader(buffer);
		let dec=reader.try_read_any();
		if(!dec) {debugger; return;}
		this.decode_continuation_token_dec_arr(cf,dec);
	}
	/** @private @arg {V_VeDescObj} x */
	V_VeDescObj(x) {
		const {1: [a],2: [b],...y}=x; this.g(y);
		if(a!==3) debugger;
		if(b!==3832) debugger;
	}
	/** @private @arg {R_ClickTrackingObj} x */
	R_ClickTrackingObj(x) {
		const cf="R_ClickTrackingObj";
		const {4: [f4],...u}=x;
		this.V_BinaryTimestamp(f4);
		if(1 in u) {
			const {1: [f1],2: [f2],...z}=u;
			this.save_number(`${cf}.f1`,f1);
			this.a_primitive_num(f2);
			if(19 in z) {
				const {6: [f6],9: [f9],19: [f19],...y}=z; this.g(y);
				this.a_primitive_num(f2);
				if(f6!=="related-auto") debugger;
				this._primitive_of(f9,"bigint");
				this.V_VeDescObj(f19);
				return;
			}
			return;
		}
		if(6 in u) {
			const {6: [f6],...y}=u; this.g(y);
			if(f6!=="external") debugger;
			return;
		}
		this.g(u);
	}
	/** @private @arg {R_TrackingObj} x */
	R_TrackingObj(x) {
		const cf="R_TrackingObj";
		const {1: [f1],2: [f2],4: [f4],...u}=x;
		this.a_primitive_num(f1);
		this.a_primitive_num(f2);
		this.V_BinaryTimestamp(f4);
		if(3 in u) {
			const {3: [f3],...y}=u; this.g(y);
			this.save_number(`${cf}.f3`,f3);
			return;
		}
	}
	/** @private @arg {V_BinaryTimestamp} x */
	V_BinaryTimestamp(x) {
		const cf="V_BinaryTimestamp";
		const {1: [f1],2: [f2],3: [f3],...y}=this.s(cf,x); this.g(y);
		if(typeof f1!=="number") debugger;
		if(typeof f2==="number"&&f2>0b1010111011010101010000001011) {
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f2] --\n\n[0b${(f2).toString(2)}]`);
		}
		if(typeof f3==="number"&&f3>0b11111100000000010110010000100111) {
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f3] --\n\n[0b${(f3).toString(2)}]`);
		}
	}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification"; this.k(cf,x);
		const {trackingParams,thumbnail,videoThumbnail,shortMessage,sentTimeText,navigationEndpoint,read,recordClickEndpoint,contextualMenu,notificationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
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
		if("contents" in x) {
			const {contents: arr,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(!arr) {debugger; return;}
			/** @type {[R_ContinuationItem[],"comment-item-section","engagement-panel-comments-section"][]} */
			let ux_1=[];
			let ux_2=[];
			for(let item of arr) {
				const {itemSectionRenderer: x,...y}=item; this.g(y);
				if("targetId" in x) {
					let r=this.TD_ItemSection(`TD_ItemSection_3<"comment-item-section","engagement-panel-comments-section">`,x);
					if(r===null) continue;
					ux_1.push(r);
					continue;
				}
				let r=this.TD_ItemSection(`TD_ItemSection_1<any>`,x);
				ux_2.push(r);
				x;
			}
			this.z(ux_1,x => {
				/** @type {DC_SectionListBase} */
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
			this.trackingParams(trackingParams);
			return;
		}
		if("disablePullToRefresh" in x) {
			const {trackingParams,disablePullToRefresh,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.trackingParams(trackingParams);
			if(disablePullToRefresh!==true) debugger;
			return;
		}
		// this.tz(continuations,this.RD_NextContinuation);
		// this.t(subMenu,a => this.save_keys(`${cf}.subMenu`,a));
		// if(hideBottomSeparator!==void 0) this.save_boolean(`${cf}.hideBottomSeparator`,hideBottomSeparator);
		debugger;
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		if(targetId!=="browse-feedFEhistory") debugger;
	}
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
	/** @private @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript"; this.k(cf,x);
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {return this.AU_EngagementPanel(a);}
		});
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		this.t(formattedTitle,this.G_Text);
		if(!this.eq_keys(handlerDatas,["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"])) debugger;
	}
	/** @private @arg {D_GuideSection} x */
	D_GuideSection(x) {
		const cf="D_GuideSection"; this.k(cf,x);
		const {items,trackingParams,formattedTitle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(trackingParams);
		this.t(formattedTitle,this.G_Text);
	}
	/** @private @template {Extract<D_GuideEntry,{accessibility:any}>} T @arg {CF_D_GuideEntry} cf @arg {T} x */
	D_GuideEntry_Omit(cf,x) {
		const {accessibility,formattedTitle,trackingParams,...y}=this.s(cf,x);
		this.D_Accessibility(accessibility);
		this.G_Text(formattedTitle);
		this.trackingParams(trackingParams);
		return y;
	}
	/** @arg {Extract<D_GuideEntry,{targetId:any;}>["targetId"]} x */
	D_GuideEntry_TargetId(x) {
		const cf="D_GuideEntry_TargetId"; this.k(cf,x);
		switch(x) {
			default: this.cg.codegen_case(cf,x); break;
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
	/** @public @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		const [sec,id]=x; if(sec!=="shorts") debugger;
		this.indexed_db_put("video_id",{key: `video_id:shorts:${id}`,type: "shorts",v: id});
	}
	/** @protected @arg {string} x @returns {D_BrowseIdStr|null} */
	decode_browse_id(x) {
		if(this.str_starts_with(x,"FE")) {
			switch(x) {
				case "FEcomment_shorts_web_top_level":
				case "FEwhat_to_watch":
				case "FEexplore": return x;
				default: console.log(`--- [decode_browse_id] ---\n\n\ncase "${x}:`); return null;
			}
		}
		return null;
	}
	/** @private @type {string[]} */
	cache_playlist_index=[];
	log_start_radio=false;
	log_playlist_index=false;
	/** @public @arg {CF_L_TP_Params} root @arg {Extract<T_SplitOnce<ParseUrlWithSearchIn,"?">,["watch",...any]>[1]} x */
	parse_watch_page_url_url_arr(root,x) {
		let vv=split_string(x,"&");
		// spell:ignore RDMM
		for(let prop of vv) {
			/** @private @type {T_SplitOnce<typeof prop,"=">} */
			let res=split_string_once(prop,"=");
			switch(res[0]) {
				case "v": this.G_UrlInfoItem({type: "video",id: res[1]}); break;
				case "list": this.parse_guide_entry_id(res[1]); break;
				case "rv": this.G_UrlInfoItem({type: "video-referral",id: res[1]}); break;
				case "pp": {
					if(root==="R_WatchPage_VE3832") {
						const [,playerParams]=res;
						this.playerParams("watch.player_params",playerParams);
					} else {
						debugger;
					}
				} break;
				case "start_radio": {if(this.log_start_radio) console.log("[playlist_start_radio]",res[1]);} break;
				case "index": {
					if(this.cache_playlist_index.includes(res[1])) break;
					this.cache_playlist_index.push(res[1]);
					if(this.log_playlist_index) console.log("[playlist_index]",res[1]);
				} break;
				case "t": this.G_UrlInfoItem({type: "video-referral",id: res[1]}); break;
				case "playnext": this.G_UrlInfoItem({type: "play-next",value: res[1]}); break;
				default: res[0]===""; debugger;
			}
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
				this.E_VE83769_Url(x);
				break x;
			}
		}
		let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithNavEP:icon",icon,this.D_GuideEntry_IconType.WithNavEP);
		if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithNavEP,this.D_GuideEntry_MissingIconType);
		{
			let x=navigationEndpoint;
			if("urlEndpoint" in x) return this.E_VE83769_Url(x);
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
					default: icon===""; this.codegen_typedef(cf1,x); break;
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
			this.trackingParams(trackingParams);
			return;
		}
		if("icon" in x&&"trackingParams" in x&&"formattedTitle" in x&&"accessibility" in x) {
			const {icon,trackingParams,formattedTitle,accessibility,...y}=this.s(cf1,x); this.g(y);
			this.D_Accessibility(accessibility);
			this.trackingParams(trackingParams);
			this.G_Text(formattedTitle);
			this.D_Accessibility(accessibility);
			return;
		}
		this.codegen_typedef(cf1,x);
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
			this.trackingParams(trackingParams);
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
		x===""; this.codegen_typedef(cf,x); x==="";
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
	/** @public @arg {[RE_D_VE3832_PreconnectUrl]} x */
	parse_preconnect_arr(x) {
		if(x.length!==1) debugger;
		this.parse_preconnect_url(x[0]);
	}
	/** @type {string[]} */
	logged_hosts=[];
	log_googlevideo_host=false;
	/** @private @arg {RE_D_GoogleVideoUrl_Hostname} x */
	on_googlevideo_host(x) {
		this.save_string("googlevideo_host",x);
		if(this.log_googlevideo_host) {
			if(this.logged_hosts.includes(x)) return;
			this.logged_hosts.push(x);
			console.log("[googlevideo_host] [%s]",x);
			Promise.resolve().then(() => this.logged_hosts.length=0);
		}
	}
	/** @private @arg {RE_D_VE3832_PreconnectUrl} x */
	parse_preconnect_url(x) {
		let up=this.parse_with_url_parse(x);
		if(up.pathname!=="/generate_204") debugger;
		const hn=up.host;
		this.on_googlevideo_host(hn);
		let [ux,u1,...y]=split_string(hn,".googlevideo.com");
		if(y.length!==0) debugger;
		if(u1!=="") debugger;
		let ss2=split_string(ux,"---");
		if(!this.str_starts_with(ss2[0],"rr")) debugger;
		let ss3=split_string_once(ss2[0],"rr")[1];
		switch(ss3) {
			default: ss3===""; debugger; break;
			case "1": case "2": case "3": case "4": case "5":
		}
		let ss4=split_string_once(ss2[1],"sn-nx")[1];
		x: {
			if(this.str_starts_with_rx("5s7n",ss4)) break x;
			if(this.str_starts_with_rx("57yn",ss4)) break x;
			debugger;
			return;
		}
		let [s0,s1,s2,s3,...ss5]=split_string(ss4,"");
		let ss6=this.join_string(ss5,"");
		console.log(`google video [rr:${ss3}]---[sn]-[nx:${s0}${s1}:${s2}${s3}:${ss6}].[googlevideo.com]`);
		switch(ss6) {
			default: ss6===""; debugger; break;
			case "lk":
			case "sd": case "se": case "sk": case "sl": case "ss": case "sz":
			case "76": case "7d": case "7s": case "7y": case "7z":
			case "el": case "ee":
		}
	}
	/** @private @arg {"RS_Page_Channel"} cf @template {RS_Page_Channel} T @arg {T} x */
	RS_Page_Channel_Omit(cf,x) {
		const {page,endpoint,response,url,...y}=this.s(cf,x);/*#destructure_omit*/
		if(page!=="channel") debugger;
		this.GE_Browse(endpoint);
		this.RS_Channel(response);
		this.a_primitive_str(url);
		return y;
	}
	/** @private @arg {D_GraftedVeItem} x */
	D_GraftedVeItem(x) {
		const cf="D_GraftedVeItem";
		const {veData,csn,...y}=this.s(cf,x); this.g(y);
		this.D_VeCsn(csn);
	}
	/** @public @arg {string} x @arg {boolean} is_prev */
	D_VeCsn(x,is_prev=false) {
		let csn_dec=atob(x);
		if(is_prev) {
			console.log("[prev_csn_dec]",csn_dec);
		} else {
			console.log("[csn_dec]",csn_dec);
		}
	}
	/** @private @arg {RS_Page_Channel} x */
	RS_Page_Channel(x) {
		const cf="RS_Page_Channel";
		if("rootVe" in x) {
			const {...u}=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			const {rootVe,expirationTime,csn,...y}=u; this.g(y);
			this._primitive_of(expirationTime,"number");
			if(rootVe!==3611) debugger;
			this.t(csn,this.D_VeCsn);
			return;
		}
		if("csn" in x) {
			const {...u}=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			const {csn,expirationTime,graftedVes,...y}=u; this.g(y);
			this.D_VeCsn(csn);
			this.z(graftedVes,this.D_GraftedVeItem);
			this._primitive_of(expirationTime,"number");
			return;
		}
		if("expirationTime" in x&&"previousCsn" in x) {
			const u=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			const {previousCsn,expirationTime,...y}=u; this.g(y);
			this.D_VeCsn(previousCsn,true);
			this._primitive_of(expirationTime,"number");
			return;
		}
		if("expirationTime" in x) {
			const u=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			const {expirationTime,...y}=u; this.g(y);
			this._primitive_of(expirationTime,"number");
			return;
		}
		{
			const u=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			this.g(u);
		}
	}
	/** @private @arg {RS_Page_Search} x */
	RS_SearchPage(x) {
		const cf="RS_SearchPage"; this.k(cf,x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="search") debugger;
		this.E_VE4724_Search(endpoint);
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
	/** @private @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC","responseContext",x);}
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
		this.clickTrackingParams(clickTrackingParams);
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
		x===""; this.codegen_typedef(cf,x);
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
	/** @private @arg {D_TwoColumnBrowseResults} x */
	D_TwoColumnBrowseResults(x) {
		const cf="D_TwoColumnBrowseResults"; this.k(cf,x);
		const {tabs,secondaryContents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,this.RG_Result);
		this.t(secondaryContents,this.G_SecondaryContents);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel"; this.k(cf,x);
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {this.z(engagementPanels,this.R_EngagementPanelSectionList);}
	}
	/** @type {Map<string,((y:C_UpdateToggleButtonState)=>void)>} */
	h_m=new Map;
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript";
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @private @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel";
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,cacheMetadata,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_C4TabbedHeader(header);
		this.R_Channel_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.z(onResponseReceivedActions,this.C_ResetChannelUnreadCount);
		this.t(cacheMetadata,this.D_Cache_MD);
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
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {string} cf1 @arg {NonNullable<RS_Playlist['alerts']>[number]} x */
	RS_Playlist_AlertItem(cf1,x) {
		const cf2="RS_Playlist_AlertItem";
		if("alertWithButtonRenderer" in x) return this.R_AlertWithButton(x);
		this.codegen_typedef(`${cf1}$${cf2}`,x);
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings"; this.k(cf,x);
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_FeedFilterChipBar} x */
	D_FeedFilterChipBar(x) {
		const cf="D_FeedFilterChipBar"; this.k(cf,x);
		const {contents,trackingParams,nextButton,previousButton,styleType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_ChipCloudChip);
		this.trackingParams(trackingParams);
		this.t(nextButton,this.R_Button);
		this.t(previousButton,this.R_Button);
		switch(styleType) {
			default: debugger; break;
			case "FEED_FILTER_CHIP_BAR_STYLE_TYPE_CHANNEL_PAGE_GRID": break;
			case "FEED_FILTER_CHIP_BAR_STYLE_TYPE_DEFAULT": break;
		}
		this.save_enum("FEED_FILTER_CHIP_BAR_STYLE_TYPE",styleType);
	}
	/** @private @arg {D_ChipCloudChip} x */
	D_ChipCloudChip(x) {
		const cf="D_ChipCloudChip"; this.k(cf,x);
		if("navigationEndpoint" in x) return this.D_ChipCloudChip_WithNav(cf,x);
		if("isSelected" in x) {
			let d=this.D_ChipCloudChip_Omit(cf,x);
			const {style: a,isSelected: b,...y}=this.s(cf,d); this.g(y);/*#destructure_done*/
			switch(a.styleType) {
				default: debugger; break;
				case "STYLE_DEFAULT":
				case "STYLE_HOME_FILTER":
				case "STYLE_REFRESH_TO_NOVEL_CHIP":
			}
			if(b!==true) debugger;
			return;
		}
	}
	/** @private @arg {"D_ChipCloudChip"} cf @arg {Extract<D_ChipCloudChip,{navigationEndpoint:any}>} x */
	D_ChipCloudChip_WithNav(cf,x) {
		let {text,trackingParams,...x2}=this.D_ChipCloudChip_OmitNav(cf,x);
		this.G_Text(text);
		this.trackingParams(trackingParams);
		if(!("style" in x2)) {
			return;
		}
		const {style,...x1}=x2;
		let ia=this.strings_map.get(cf);
		if(!ia) this.strings_map.set(cf,ia=[]);
		ia.push(["style.styleType",[style.styleType]]);
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
	/** @private @arg {D_ChipCloudChip_navigationEndpoint} x */
	D_ChipCloudChip_navigationEndpoint(x) {
		const cf="D_ChipCloudChip_navigationEndpoint"; this.k(cf,x);
		if("continuationCommand" in x) return this.C_Continuation(x);
		if("relatedChipCommand" in x) return this.C_RelatedChip(x);
		if("feedbackEndpoint" in x) return this.E_Feedback(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @arg {CF_D_ChipCloudChip_Omit} cf @private @template {D_ChipCloudChip} T @arg {T} x */
	D_ChipCloudChip_Omit(cf,x) {
		const {text: b,trackingParams: c,...y}=this.s(cf,x);
		this.G_Text(b);
		this.trackingParams(c);
		return y;
	}
	/** @public @arg {D_AdLayoutLoggingData} x */
	D_AdLayoutLoggingData(x) {const cf="D_AdLayoutLogging"; this.H_(cf,"serializedAdServingDataEntry",x,x => this.params("ad_serving_data_entry",x));}
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
		this.trackingParams(a);
		this.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel"; this.k(cf,x);
		const {responseContext: {},trackingParams,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel_Action";
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @private @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe";
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,this.G_RS_Subscribe_Action);
		this.g(newNotificationButton);
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @public @arg {D_RadioShareUrl} b */
	D_RadioShareUrl(b) {
		const cf="D_RadioShareUrl";
		let up=this.parse_with_url_parse(b);
		{
			let obj=new UrlParseHelper(up);
			if(obj.get_with_pathname(up,"/watch")) {
				let {...s}=this.parse_url_search_params(up.search);
				if("v" in s) {
					let {v,playnext,list,...y}=this.s(cf,s); this.g(y);/*#destructure_done*/
					if(playnext!=="1") debugger;
					if(!list) debugger; this.parse_playlist_id(list);
					/** @returns {{k:1;a:string;}|{k:2;a:`RD${string}`}} */
					let gw=() => ({k: 1,a: v});
					let w=gw();
					if(this.str_starts_with_rx(w.a,"RD")) {
						w.k=2; w.k==2&&this.parse_playlist_id(w.a);
						return;
					}
					this.save_next_char("share_url.v",w.a[0]);
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
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_SubFeedOption["navigationEndpoint"]} x */
	D_SubFeedOption_NavEP(x) {
		const cf="D_SubFeedOption_NavEP"; this.k(cf,x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_SubFeedOption} x */
	D_SubFeedOption(x) {
		const cf="D_SubFeedOption"; this.k(cf,x);
		const {name,isSelected,navigationEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(name);
		this.a_primitive_bool(isSelected);
		this.D_SubFeedOption_NavEP(navigationEndpoint);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {AD_UpdateChannelSwitcherPage} x */
	AD_UpdateChannelSwitcherPage(x) {this.TA_Page("AD_UpdateChannelSwitcherPage",x,this.R_ChannelSwitcherPage);}
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
	/** @public @arg {CF_T_Items_TP} cf @template T @arg {T_Items_TP<T>} x */
	T_Items_TP(cf,x) {
		const {trackingParams,...y}=this.s(cf,x);/*#destructure_off*/
		this.trackingParams(trackingParams);
		return this.w_priv("items",y);
	}
	/** @arg {CF_T_Items} cf @template T @private @arg {T_Items<T>} x */
	T_Items(cf,x) {return this.w(`T_Items:${cf}`,"items",x);}
	/** @public @template T @arg {TR_MP_MenuSection<T>} x */
	TR_MP_MenuSection(x) {return x.multiPageMenuSectionRenderer;}
	/** @public @arg {D_NotificationMenuPopupMenuItem} x */
	D_NotificationMenuPopupMenuItem(x) {
		const cf="D_NotificationMenuPopupMenuItem"; this.k(cf,x);
		const {trackingParams,style,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		if(showLoadingSpinner!==true) debugger;
	}
	/** @private @arg {D_CommentsEntryPointTeaser} x */
	D_CommentsEntryPointTeaser(x) {
		const cf="D_CommentsEntryPointTeaser"; this.k(cf,x);
		const {teaserAvatar,teaserContent,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!teaserAvatar.accessibility) debugger;
		this.D_Thumbnail(teaserAvatar);
		this.G_Text(teaserContent);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {MP_AccountMenu} x */
	MP_AccountMenu(x) {
		const cf="MP_AccountMenu"; this.k(cf,x);
		const {style,trackingParams,showLoadingSpinner,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_ACCOUNT") debugger;
		this.trackingParams(trackingParams);
		if(showLoadingSpinner!==true) debugger;
	}
	/** @public @arg {D_GetAccountMenu_Popup} x */
	Popup_GetAccountMenu(x) {
		const cf="Popup_GetAccountMenu"; this.k(cf,x);
		const {popup: a,popupType: b,beReused: c,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(b!=="DROPDOWN") debugger;
		if(c!==true) debugger;
		return a;
	}
	/** @private @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe"; this.k(cf,x);
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			x;
		});
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @template T @arg {T_OpenPopup_Toast<T>} x */
	T_OpenPopup_Toast(x) {
		const cf="T_OpenPopup_Toast";
		const {popupType,popup,...y}=this.s(cf,x); this.g(y);
		if(popupType!=="TOAST") return null;
		return popup;
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference"; this.k(cf,x);
		const {responseContext,actions,trackingParams,frameworkUpdates,channelId,newNotificationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		let [u1]=this.z(actions,x => {
			if(!x.openPopupAction) debugger;
			let a=this.TA_OpenPopup(cf,x);
			return this.T_OpenPopup_Toast(a);
		});
		this.z(u1,this.RA_Notification);
		this.trackingParams(trackingParams);
		this.R_EntityBatchUpdate(frameworkUpdates);
		this.D_ChannelId(channelId);
		this.R_SubscriptionNotificationToggleButton(newNotificationButton);
	}
	/** @private @arg {D_ExpandableTab} x */
	D_ExpandableTab(x) {
		const cf="D_ExpandableTab";
		if(x.selected) {
			const {endpoint,title,selected,expandedText,content,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.E_VE3611(endpoint);
			this.a_primitive_str(title);
			this.a_primitive_bool(selected);
			this.t(expandedText,this.a_primitive_str);
			return this.t(content,this.R_SectionList);
		}
		const {endpoint,title,selected,...y}=this.s(cf,x);/*#destructure_later*/
		this.E_VE3611(endpoint);
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		if("expandedText" in y) {
			const {expandedText,...y1}=y; this.g(y1);
			return this.t(expandedText,this.a_primitive_str);
		}
		this.g(y);
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
		this.trackingParams(trackingParams);
		if(style!=="FEED_NUDGE_STYLE_CHIP") debugger;
		this.z(contents,this.R_ChipCloudChip);
	}
	/** @private @arg {D_SearchBox} x */
	D_SearchBox(x) {
		const cf="D_SearchBox"; this.k(cf,x);
		const {endpoint,searchButton,clearButton,placeholderText,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.GE_Browse(endpoint);
		this.R_Button(searchButton);
		this.R_Button(clearButton);
		this.G_Text(placeholderText);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_Comment} x */
	D_Comment(x) {
		const cf="D_Comment";
		const {authorText,authorThumbnail,actionButtons,actionMenu,authorEndpoint,authorIsChannelOwner,commentId,contentText,currentUserReplyThumbnail,voteCount,isLiked,expandButton,publishedTimeText,voteStatus,trackingParams,collapseButton,replyCount,loggingDirectives,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(authorText);
		this.D_Thumbnail(authorThumbnail);
		this.R_CommentActionButtons(actionButtons);
		this.R_Menu(actionMenu);
		this.GE_Browse(authorEndpoint);
		this.a_primitive_bool(authorIsChannelOwner);
		this.a_primitive_str(commentId);
		this.G_Text(contentText);
		this.D_Thumbnail(currentUserReplyThumbnail);
		this.t(voteCount,this.G_Text);
		this.a_primitive_bool(isLiked);
		this.R_Button(expandButton);
		this.G_Text(publishedTimeText);
		this.ceq(voteStatus,"INDIFFERENT");
		this.trackingParams(trackingParams);
		this.R_Button(collapseButton);
		this.t(replyCount,this.a_primitive_num);
		this.D_LoggingDirectives(loggingDirectives);
	}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader"; this.k(cf,x);
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Button(playButton);
		this.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.playlistId(playlistId);
		this.save_string(`${cf}.privacy`,privacy);
		this.R_Button(shufflePlayButton);
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		this.E_Watch(onTap);
		this.G_ThumbnailOverlayItem(thumbnailOverlays);
	}
	/** @private @arg {D_PlaylistByline} x */
	D_PlaylistByline(x) {this.y("D_PlaylistByline","text",x,this.G_Text);}
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
	}
	/** @public @arg {P_ParamParse} path @arg {DC_Generic_CTP} x */
	DC_Generic_CTP(path,x) {
		const {continuation,clickTrackingParams,...y}=this.s("DC_Generic_CTP",x); this.g(y);
		this.params(path,continuation);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @private @arg {DC_SectionList_SearchFeed} x */
	DC_SectionList_SearchFeed(x) {
		const cf="DC_SectionList_SearchFeed"; this.k(cf,x);
		const {trackingParams,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		if(targetId!=="search-feed") debugger;
		this.z(contents,this.TR_SectionListItem_3_Empty);
	}
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
		this.trackingParams(trackingParams);
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
	/** @public @arg {D_ClientMessages} x */
	D_ClientMessages(x) {this.k("D_ClientMessages",x); this.z(Object.values(x),this.G_Text);}
	/** @private @arg {D_CommentSimplebox} x */
	D_CommentSimplebox(x) {
		const cf="D_CommentSimplebox"; this.k(cf,x);
		const {submitButton,cancelButton,aadcGuidelinesStateEntityKey,authorThumbnail,avatarSize,placeholderText,emojiPicker,trackingParams,emojiButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Button(submitButton);
		this.R_Button(cancelButton);
		this.params("aadc_guidelines_state.entity_key",aadcGuidelinesStateEntityKey);
		this.D_Thumbnail(authorThumbnail);
		if(avatarSize!=="SIMPLEBOX_AVATAR_SIZE_TYPE_DEFAULT") debugger;
		this.G_Text(placeholderText);
		this.R_EmojiPicker(emojiPicker);
		this.trackingParams(trackingParams);
		this.R_Button(emojiButton);
	}
	/** @private @arg {D_CommentsSimplebox} x */
	D_CommentsSimplebox(x) {
		const cf="D_CommentsSimplebox";
		const {simpleboxAvatar,simpleboxPlaceholder,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(simpleboxAvatar);
		this.G_Text(simpleboxPlaceholder);
		this.trackingParams(trackingParams);
	}
	/** @protected @template {{}} T @arg {T|null|undefined|void} x @arg {(this:this,x:T)=>boolean} f */
	dt(x,f) {if(!x) return; let g=f.call(this,x); if(g) debugger;}
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
	/** @private @arg {D_SortFilterSubMenu} x */
	D_SortFilterSubMenu(x) {
		const cf="D_SortFilterSubMenu"; this.k(cf,x);
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
		const cf="D_ActionSetPlaylistVideoOrder"; this.k(cf,x);
		const {title,selected,continuation,serviceEndpoint,accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_bool(selected);
		this.t(continuation,this.CD_Reload);
		this.t(serviceEndpoint,this.C_Continuation);
		this.t(accessibility,this.D_Accessibility);
		this.trackingParams(trackingParams);
	}
	/** @arg {D_CustomEmoji['emojiId']} x */
	parse_emoji_id(x) {
		let eid=split_string_once(x,"/");
		this.D_ChannelId(eid[0]);
		return eid[1];
	}
	/** @arg {D_CustomEmoji['shortcuts'][number]} x */
	parse_emoji_shortcut(x) {
		let fs=split_string_once(x,":");
		let [ls,w]=split_string_once_last(fs[1],":",null); if(w!=="") debugger;
		return ls;
	}
	/** @public @template {D_CustomEmoji|D_LiveChatEmoji} T @arg {CF_D_CustomEmoji} cf @arg {T} x */
	D_CustomEmoji_Omit(cf,x) {
		const {emojiId,shortcuts,searchTerms,image,isCustomEmoji,...y}=this.s(cf,x);
		this.parse_emoji_id(emojiId);
		let [s_arr]=this.z(shortcuts,this.parse_emoji_shortcut);
		this.z(s_arr,this.a_primitive_str);
		this.save_string(`save://CustomEmoji.d/shortcuts/${emojiId}?custom=${isCustomEmoji}`,shortcuts.join(","));
		this.save_string(`save://CustomEmoji.d/searchTerms/${emojiId}?custom=${isCustomEmoji}`,searchTerms.join(","));
		this.D_EmojiImage(image);
		this.a_primitive_bool(isCustomEmoji);
		return y;
	}
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
	/** @private @arg {D_PlaylistPanelVideo} x */
	D_PlaylistPanelVideo(x) {
		const cf="D_PlaylistPanelVideo"; this.k(cf,x);
		const {thumbnail,thumbnailOverlays,title,trackingParams,videoId,playlistSetVideoId,darkColorPalette,lightColorPalette,longBylineText,shortBylineText,selected,lengthText,menu,navigationEndpoint,...y}=this.s(cf,x);/*#destructure_off*/
		this.D_Thumbnail(thumbnail);
		this.z(thumbnailOverlays,this.G_ThumbnailOverlayItem);
		this.G_Text(title);
		this.trackingParams(trackingParams);
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
			this.codegen_typedef(`${cf}:omit`,y);
		}
		this.g(y);
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
		this.trackingParams(trackingParams);
		this.t(sponsorButton,this.R_Button);
		this.G_Text(channelHandleText);
		this.G_Text(videosCountText);
	}
	/** @private @arg {D_ChannelHeaderLinks} x */
	D_ChannelHeaderLinks(x) {
		const cf="D_ChannelHeaderLinks";
		const {primaryLinks,secondaryLinks,...y}=this.s(cf,x); this.g(y);
		this.z(primaryLinks,this.D_PrimaryLinkItem);
		this.tz(secondaryLinks,this.D_PrimaryLinkItem);
	}
	/** @private @arg {D_Channel_MD} x */
	D_Channel_MD(x) {
		const cf="D_Channel_MD";
		const {title,description,androidDeepLink,iosAppindexingLink,isFamilySafe,facebookProfileId,externalId,androidAppindexingLink,availableCountryCodes,avatar,rssUrl,keywords,ownerUrls,channelUrl,vanityChannelUrl,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(facebookProfileId,this.a_primitive_str);
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
	/** @private @arg {D_RichMetadata} x */
	D_RichMetadata(x) {
		const cf="D_RichMetadata"; this.k(cf,x);
		switch(x.style) {
			default: this.cg.codegen_case_key(cf,x,"style","break"); break;
			case "RICH_METADATA_RENDERER_STYLE_BOX_ART": {
				const cf="D_RichMetadata_BoxArt";
				const {style: {},thumbnail,title,subtitle,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.D_Thumbnail(thumbnail);
				this.G_Text(title);
				this.t(subtitle,this.G_Text);
				this.G_Text(callToAction);
				this.T_Icon(`${cf}:icon`,callToActionIcon);
				if(!endpoint.browseEndpoint) debugger;
				this.GE_Browse(endpoint);
				this.trackingParams(trackingParams);
			} break;
			case "RICH_METADATA_RENDERER_STYLE_TOPIC": {
				const cf="D_RichMetadata_Topic";
				const {style: {},thumbnail,title,callToAction,callToActionIcon,endpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
				this.D_Thumbnail(thumbnail);
				this.G_Text(title);
				this.G_Text(callToAction);
				this.T_Icon(`${cf}:icon`,callToActionIcon);
				if(!endpoint.browseEndpoint) debugger;
				this.GE_Browse(endpoint);
				this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
	}
	/** @private @arg {"D_VideoOwner"} cf @arg {D_VideoOwner} x */
	D_VideoOwner_Omit(cf,x) {
		const {thumbnail,title,trackingParams,subscriberCountText,subscriptionButton,membershipButton,navigationEndpoint,...y}=this.s(cf,x);
		this.D_Thumbnail(thumbnail);
		this.G_Text(title);
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		this.ceq(itemSize,"COLLECTION_STYLE_ITEM_SIZE_MEDIUM");
	}
	/** @private @arg {D_MusicShelf} x */
	D_MusicShelf(x) {
		const cf="D_MusicShelf"; this.k(cf,x);
		const {contents,title,trackingParams,continuations,shelfDivider,autoReloadWhenEmpty,bottomButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_MusicResponsiveListItem);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		this.z(continuations,this.CD_Reload);
		this.R_MusicShelfDivider(shelfDivider);
		this.ceq(autoReloadWhenEmpty,true);
		this.R_Button(bottomButton);
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
		this.trackingParams(trackingParams);
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
	/** @private @arg {D_TopicLink} x */
	D_TopicLink(x) {
		const cf="D_TopicLink"; this.k(cf,x);
		const {thumbnailDetails,title,trackingParams,endpoint,callToActionIcon,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnailDetails);
		this.G_Text(title);
		this.trackingParams(trackingParams);
		this.GE_Browse(endpoint);
		if(callToActionIcon.iconType!=="CHEVRON_RIGHT") debugger;
	}
	/** @private @arg {D_CarouselLockup} x */
	D_CarouselLockup(x) {
		const cf="D_CarouselLockup"; this.k(cf,x);
		const {infoRows,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(infoRows,this.R_InfoRow);
	}
	/** @private @arg {D_Factoid} x */
	D_Factoid(x) {
		const cf="D_Factoid"; this.k(cf,x);
		const {value,label,accessibilityText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(value);
		this.G_Text(label);
		this.a_primitive_str(accessibilityText);
	}
	/** @private @arg {D_RichListHeader} x */
	D_RichListHeader(x) {
		const cf="D_RichListHeader"; this.k(cf,x);
		const {title,trackingParams,navigationButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.G_Text(title);
		this.R_Button(navigationButton);
	}
	/** @private @arg {D_MacroMarkersListItem} x */
	D_MacroMarkersListItem(x) {
		const cf="D_MacroMarkersListItem"; this.k(cf,x);
		if("playerStateEntityKey" in x) {
			const {title,timeDescription,thumbnail,onTap,trackingParams,shareButton,repeatButton,macroMarkerRepeatStateEntityKey: a,endRepeatCommand,playerStateEntityKey: b,carouselType,lightColorPalette,darkColorPalette,timeDescriptionA11yLabel,...y}=this.s(cf,x); this.g(y);
			this.G_Text(title);
			this.G_Text(timeDescription);
			this.D_Thumbnail(thumbnail);
			this.E_Watch(onTap);
			this.trackingParams(trackingParams);
			this.R_Button(shareButton);
			this.t(repeatButton,this.R_ToggleButton);
			this.params("macro_marker_repeat_state.entity_key",a);
			this.t(endRepeatCommand,this.C_CommandExecutor);
			this.params("player_state.entity_key",b);
			if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
			this.a_primitive_str(timeDescriptionA11yLabel);
			this.t_cf(cf,lightColorPalette,this.D_LightColorPalette);
			this.t_cf(cf,darkColorPalette,this.D_DarkColorPalette);
			return;
		}
		const {title,timeDescription,thumbnail,onTap,trackingParams,carouselType,layout,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.G_Text(timeDescription);
		this.D_Thumbnail(thumbnail);
		this.E_Watch(onTap);
		this.trackingParams(trackingParams);
		if(carouselType!=="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT") debugger;
		if(layout!=="MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL") debugger;
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
	/** @private @arg {TR_SectionListItem_3_Empty} x */
	TR_SectionListItem_3_Empty(x) {
		const cf="TR_SectionListItem_3_Empty";
		this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_NavigationLinkItem} x */
	D_PrimaryLinkItem(x) {
		const cf="D_PrimaryLinkItem"; this.k(cf,x);
		const {navigationEndpoint,icon,title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_VE83769_Url(navigationEndpoint);
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
		this.codegen_typedef(`${cf}.dismissalEndpoint`,dismissalEndpoint);
		this.G_Text(title);
		this.G_Text(subtitle);
		this.R_CompactVideo(inlineContent);
		this.R_ExpandableSurveyResponse(response);
		this.trackingParams(trackingParams);
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
				default: this.cg.codegen_case(`${cf}.icon`,icon.iconType); break;
				case "YOUTUBE_SHORTS_BRAND_24": break;
			}
		}
		this.G_Text(title);
		this.z(contents,this.R_RichItem);
		this.trackingParams(trackingParams);
		this.R_Menu(menu);
		this.R_Button(showMoreButton);
		switch(rowIndex) {
			default: this.cg.codegen_case(`${cf}.rowIndex`,rowIndex); break;
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
	}
	/** @arg {D_RatingSurvey} x */
	D_RatingSurvey(x) {
		const cf="D_ExpandableSurveyResponse"; this.k(cf,x);
		const {ratings,trackingParams,notSureButton,undoButton,notSureEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ratings,this.R_RatingSurveyOption);
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
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
		this.trackingParams(trackingParams);
		this.G_Text(titleText);
		if(isEditable!==true) debugger;
		this.t(previewDescription,this.g);
		this.t(numItemsToShow,x => {if(x!==25) debugger;});
	}
	/** @arg {D_AdLayoutMetadata} x */
	D_AdLayoutMetadata(x) {
		const cf="D_AdLayoutMetadata";
		const {layoutId,layoutType,adLayoutLoggingData,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.layoutId`,layoutId);
		if(layoutType!=="LAYOUT_TYPE_VIDEO_DISPLAY_BILLBOARD_IMAGE_BUTTONED") debugger;
		this.D_AdLayoutLoggingData(adLayoutLoggingData);
	}
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
	/** @arg {S_VideoGoodPutShape} x */
	S_VideoGoodPutShape(x) {
		const cf="S_VideoGoodPutShape";
		const {id,source,range,expire,ip,ms,mm,pl,nh,sparams,signature,key,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.id`,id);
		this.save_string(`${cf}.source`,source);
		this.save_string(`${cf}.range`,range);
		this.save_string(`${cf}.expire`,expire);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ms`,ms);
		this.save_string(`${cf}.mm`,mm);
		this.save_string(`${cf}.pl`,pl);
		this.save_string(`${cf}.nh`,nh);
		switch(sparams) {
			default: this.cg.codegen_case(`${cf}.sparams`,sparams); debugger; break;
			case "id,source,range,expire,ip,ms,mm,pl,nh": break;
		}
		this.parse_signature(signature);
		this.save_string(`${cf}.key`,key);
	}
	/** @override @protected @arg {string} k @arg {number|number[]|Uint8Array} x @arg {boolean} [force_update] */
	save_number(k,x,force_update=false) {
		if(x instanceof Uint8Array) x=[...x];
		return super.save_number(k,x,force_update);
	}
	/** @private @arg {string} x */
	D_VideoPlayback_ns(x) {
		this.save_b64_binary("video_playback.buf.ns",x);
	}
	/** @private @template {string} A @template {string} B @template {string} C @template {`sn-${A}${B}n${C}`} R @arg {R} x @returns {R extends `sn-${infer A1}${infer A2}n${infer BP extends C}`?[`${A1}${A2}`,BP]:[R]} */
	get_gv_parts(x) {
		let ss=split_string(x,"-")[1];
		let idx=5;
		let r1=ss.slice(0,idx);
		if(ss[idx]!=="n") return as_any([x]);
		let r2=ss.slice(idx+1);
		return as_any([r1,r2]);
	}
	/** @private @arg {D_VideoPlaybackShape} x */
	D_VideoPlaybackShape(x) {
		const cf1="D_VideoPlaybackShape",cf2="video_playback.api_url";
		const {expire,ei,ip,id,itag,aitags,source,requiressl,ctier,...y1}=this.s(cf1,x);
		this.a_primitive_str(expire);
		this.a_primitive_str(ei);
		this.a_primitive_str(ip);
		this.save_string(`${cf1}.id.0-2`,id.slice(0,2));
		this.save_string(`${cf1}.itag`,itag);
		if(aitags) this.save_string(`${cf1}.aitags`,aitags);
		this.save_string(`${cf1}.source`,source);
		this.save_string(`${cf1}.requiressl`,requiressl);
		this.t(ctier,x => this.ceq("SH",x));
		const {mh,mm,mn,ms,mv,mvi,pl,initcwndbps,vprv,xtags,mime,ns,gir,...y2}=y1;
		this.save_string(`${cf1}.mh`,mh);
		this.save_string(`${cf1}.mm`,mm);
		// cSpell:ignoreRegExp /"sn-(?:(o097zn|9gv7ln|n4v7sn|nx57yn).{2})"/
		let mn_arr=split_string(mn);
		for(let mi of mn_arr) {
			let ap=this.get_gv_parts(mi);
			if(ap.length!==2) debugger;
			this.save_string(`${cf1}.google_video_partition`,ap[0]);
			this.save_string(`${cf1}.google_video_selector`,ap[1]);
			switch(ap[0]) {
				default: {
					let [x]=ap;
					let gen=this.cg.codegen_case_cache(`js_gen_case:log_videoplayback:${cf1}.mn.host_partition`,x);
					if(gen.has) break;
					console.log(`-- [js_gen_case:log_videoplayback:${cf1}.mn.host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
				}; break;
				case "nx57y":
				case "o097z":
				case "nx5s7":
				case "9gv7l":
			}
		}
		this.save_string(`${cf1}.ms`,ms);
		this.save_string(`${cf1}.mv`,mv);
		this.save_string(`${cf1}.mvi`,mvi);
		this.save_string(`${cf1}.pl`,pl);
		{
			let x=initcwndbps;
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		}
		this.save_string(`${cf1}.vprv`,vprv);
		if(xtags) this.save_string(`${cf1}.xtags`,xtags);
		this.save_string(`${cf1}.mime`,mime);
		this.D_VideoPlayback_ns(ns);
		if(gir) this.save_string(`${cf1}.gir`,gir);
		const {clen,dur,lmt,mt,fvip,keepalive,fexp,c,txp,n,sparams,lsparams,lsig,spc,sig,cnr,ratebypass,...y3}=y2;
		this.t(clen,x => {
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		});
		let dur_=this.parse_number_template(dur);
		this.a_primitive_num(dur_);
		let lmt_=this.parse_number_template(lmt);
		this.a_primitive_num(lmt_);
		{
			let x=mt;
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		}
		this.save_string(`${cf1}.fvip`,fvip);
		keepalive&&this.save_string(`${cf1}.keepalive`,keepalive);
		this.save_string(`${cf1}.fexp`,fexp);
		this.save_string(`${cf1}.c`,c);
		this.save_string(`${cf1}.txp`,txp);
		this.save_b64_binary("video_playback.api_url.n",n);
		this.save_string(`${cf1}.sparams`,sparams);
		this.save_string(`${cf1}.lsparams`,lsparams);
		this.save_b64_binary(`${cf2}.lsig`,lsig);
		spc&&this.save_b64_binary(`${cf1}.spc`,spc);
		this.t(sig,x => this.save_b64_binary(`${cf2}.sig`,x));
		cnr&&this.save_string(`${cf1}.cnr`,cnr);
		ratebypass&&this.save_string(`${cf1}.ratebypass`,ratebypass);
		const {gcr,...y}=y3; this.g(y);
		this.t(gcr,x => this.ceq(x,"ca"));
	}
	/** @arg {UrlParse<Extract<D_UrlFormat,`https://${string}.googlevideo.com/${string}`>>} x */
	on_google_video_url(x) {
		// cSpell:ignoreRegExp /r\d---sn-.+?"/
		let s_host=split_string_once(x.host,".");
		this.on_googlevideo_host(x.host);
		switch(s_host[1]) {
			case "googlevideo.com": {
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
						this.S_VideoGoodPutShape(pp);
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
		this.t(clientId,x => this.save_string(`${cf}.clientId`,x));
	}
	/** @private @arg {D_TranscriptSegment} x */
	D_TranscriptSegment(x) {
		const cf="D_TranscriptSegment";
		const {startMs,endMs,snippet,startTimeText,trackingParams,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(startMs);
		this.a_primitive_str(endMs);
		this.G_Text(snippet);
		this.G_Text(startTimeText);
		this.trackingParams(trackingParams);
		this.D_Accessibility(accessibility);
		this.t(targetId,x => this.save_string(`${cf}.targetId`,x));
	}
	/** @private @arg {D_ChipColorPalette} x */
	D_ChipColorPalette(x) {const cf="D_ChipColorPalette"; this.codegen_typedef(cf,x); this.GEN(cf,x);}
	/** @private @arg {D_PdgCommentChip} x */
	D_PdgCommentChip(x) {
		const cf="D_PdgCommentChip";
		const {chipText,chipColorPalette,chipIcon,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(chipText);
		this.D_ChipColorPalette(chipColorPalette);
		if(chipIcon.iconType!=="FILL_DOLLAR_SIGN_HEART_12") debugger;
		this.trackingParams(trackingParams);
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
		this.D_Thumbnail(thumbnail);
		this.T_Icon(`${cf}:icon`,icon);
		this.G_Text(title);
		this.G_Text(description);
		this.G_Text(websiteText);
		this.R_Button(actionButton);
		this.E_VE83769_Url(navigationEndpoint);
		this.z(impressionCommands,this.D_ImpressionCommand);
		this.R_Menu(menu);
		this.trackingParams(trackingParams);
		this.z(clickLocationTargets,this.D_ClickLocationTarget);
		this.t(adBadge,this.RMD_Badge);
	}
	/** @private @arg {"DC_PlayerSeek"} cf @arg {P_ParamParse} path @arg {DC_Generic} x */
	DC_Generic(cf,path,x) {this.y(cf,"continuation",x,x => this.params(path,x));}
	/** @private @arg {DC_PlayerSeek} x */
	DC_PlayerSeek(x) {this.DC_Generic("DC_PlayerSeek","player_seek.continuation",x);}
	/** @private @arg {CD_PlayerSeek} x */
	CD_PlayerSeek(x) {this.y("CD_PlayerSeek","playerSeekContinuationData",x,this.DC_PlayerSeek);}
	/** @private @arg {DC_LiveChatReplay} x */
	DC_LiveChatReplay(x) {
		const cf="DC_LiveChatReplay";
		const {continuation,timeUntilLastMessageMsec,...y}=this.s(cf,x); this.g(y);
		this.params("live_chat_replay.continuation",continuation);
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
		this.params("invalidation.continuation",continuation);
		this.t(clickTrackingParams,this.clickTrackingParams);
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
	/** @private @arg {D_EmojiPicker} x */
	D_EmojiPicker(x) {
		const cf="D_EmojiPicker";
		const {id,categories,categoryButtons,searchPlaceholderText,searchNoResultsText,pickSkinToneText,trackingParams,clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel,...y}=this.s(cf,x); this.g(y);
		if(id!=="emoji") debugger;
		this.z(categories,this.R_EmojiPickerCategory);
		this.z(categoryButtons,this.R_EmojiPickerCategoryButton);
		this.G_Text(searchPlaceholderText);
		this.G_Text(searchNoResultsText);
		this.G_Text(pickSkinToneText);
		this.z([clearSearchLabel,skinToneGenericLabel,skinToneLightLabel,skinToneMediumLightLabel,skinToneMediumLabel,skinToneMediumDarkLabel,skinToneDarkLabel],this.a_primitive_str);
	}
	/** @private @arg {D_EmojiPickerCategory} x */
	D_EmojiPickerCategory(x) {
		if(x.categoryType==="CATEGORY_TYPE_GLOBAL") {
			const cf="D_EmojiPickerCategory:Global";
			const {categoryId,title,emojiIds,trackingParams,categoryType,...y}=this.s(cf,x); this.g(y);
			if(!this.str_starts_with(categoryId,"UC")) debugger;
			this.G_Text(title);
			this.z(emojiIds,x => {
				this.save_string(`${categoryId}.emojiId`,this.parse_emoji_id(x));
			});
			this.D_ChannelId(categoryId);
			this.trackingParams(trackingParams);
			return;
		}
		const cf="D_EmojiPickerCategory";
		const {categoryId,title,emojiIds,trackingParams,imageLoadingLazy,categoryType,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "people": case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.G_Text(title);
		this.z(emojiIds,x => {
			this.save_string(`${categoryId}.emojiId`,x);
		});
		this.trackingParams(trackingParams);
		if(imageLoadingLazy!==true) debugger;
		if(categoryType!=="CATEGORY_TYPE_UNICODE") debugger;
	}
	/** @private @arg {D_EmojiPickerCategoryButton} x @returns {x is {categoryId: `UC${string}`}} */
	Is_D_EmojiPickerCategoryButton_WithChannelCategoryId(x) {
		return this.str_starts_with(x.categoryId,"UC");
	}
	/** @private @arg {D_EmojiPickerCategoryButton} x */
	D_EmojiPickerCategoryButton(x) {
		if("targetId" in x) {
			const cf="D_EmojiPickerCategoryButton:targetId";
			const {categoryId,icon,tooltip,accessibility,targetId,...y}=this.s(cf,x); this.g(y);
			switch(categoryId) {
				default: debugger; break;
				case "people":
			}
			this.T_Icon(`${cf}:icon`,icon);
			if(tooltip!=="People") debugger;
			this.D_Accessibility(accessibility);
			if(targetId!=="emoji-picker-category-button-people") debugger;
			return;
		}
		if(this.Is_D_EmojiPickerCategoryButton_WithChannelCategoryId(x)) {
			const cf="D_EmojiPickerCategoryButton:ForChannel";
			const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
			this.D_ChannelId(categoryId);
			this.T_Icon(`${cf}:icon`,icon);
			if(tooltip!=="YouTube") debugger;
			this.D_Accessibility(accessibility);
			return;
		}
		const cf="D_EmojiPickerCategoryButton";
		const {categoryId,icon,tooltip,accessibility,...y}=this.s(cf,x); this.g(y);
		switch(categoryId) {
			default: debugger; break;
			case "nature": case "food": case "travel": case "activities": case "objects": case "symbols":
		}
		this.T_Icon(`${cf}:icon`,icon);
		switch(tooltip) {
			default: debugger; break;
			case "Nature": case "Food": case "Travel": case "Activities": case "Objects": case "Symbols":
		}
		this.D_Accessibility(accessibility);
	}
	/** @private @arg {D_ImpressionCommand} x */
	D_ImpressionCommand(x) {
		const cf="D_ImpressionCommand";
		const {clickTrackingParams,loggingUrls,pingingEndpoint,...y}=this.s(cf,x); this.g(y);
		this.clickTrackingParams(clickTrackingParams);
		this.z(loggingUrls,x => this.T_BaseUrl(x,x => this.parser.parse_url(`${cf}:LoggingUrlItem`,x)));
		this.B_Hack(pingingEndpoint);
	}
	/** @private @arg {D_ClickLocationTarget} x */
	D_ClickLocationTarget(x) {
		const cf="D_ClickLocationTarget";
		const {location,code,behaviorType,...y}=this.s(cf,x); this.g(y);
		this.save_enum("PROMOTED_SPARKLES_CLICK_LOCATION",location);
		this.save_number(`${cf}.code`,code);
		this.save_enum("PROMOTED_SPARKLES_CLICK_BEHAVIOR_TYPE",behaviorType);
	}
	/** @private @arg {D_CommentActionButtons} x */
	D_CommentActionButtons(x) {
		const cf="D_CommentActionButtons";
		const {likeButton,replyButton,dislikeButton,trackingParams,protoCreationMs,style,...y}=this.s(cf,x); this.g(y);
		this.R_ToggleButton(likeButton);
		this.R_Button(replyButton);
		this.R_ToggleButton(dislikeButton);
		this.trackingParams(trackingParams);
		this.a_primitive_str(protoCreationMs);
		if(style!=="COMMENT_ACTION_BUTTON_STYLE_TYPE_DESKTOP_TOOLBAR") debugger;
	}
	/** @protected @arg {Extract<D_ToggleButton,{defaultServiceEndpoint:any}>["defaultServiceEndpoint"]} x */
	D_Button_DefServiceEP(x) {
		const cf="D_Button_DefServiceEP"; this.k(cf,x);
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("performCommentActionEndpoint" in x) return this.E_PerformCommentAction(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @protected @arg {Extract<D_ToggleButton,{toggledServiceEndpoint:any}>["toggledServiceEndpoint"]} x */
	D_Button_ToggledServiceEP(x) {
		const cf="D_Button_ToggledServiceEP"; this.k(cf,x);
		if("likeEndpoint" in x) return this.E_Like(x);
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("performCommentActionEndpoint" in x) return;
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_CommentReplies} x */
	D_CommentReplies(x) {
		const cf="D_CommentReplies";
		const {contents,trackingParams,viewReplies,hideReplies,targetId,...y}=this.s(cf,x); this.g(y);
		this.z(contents,this.R_ContinuationItem);
		this.trackingParams(trackingParams);
		this.R_Button(viewReplies);
		this.R_Button(hideReplies);
		if(!this.str_starts_with(targetId,"comment-replies-item-")) debugger;
	}
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		if(sig_0.match(/^[0-9A-F]+$/)===null) debugger; if(sig_0.length!==40) debugger;
		if(sig_1.match(/^[0-9A-F]+$/)===null) debugger; if(sig_1.length!==40) debugger;
	}
	/** @private @arg {D_MetadataRow} x */
	D_MetadataRow(x) {
		const cf="D_MetadataRow";
		const {title,contents,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(title);
		this.z(contents,this.G_Text);
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
		this.decode_continuation_token(cf,continuation);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @private @arg {D_LiveChatHeader} x */
	D_LiveChatHeader(x) {
		const cf="D_LiveChatHeader";
		const {overflowMenu,collapseButton,viewSelector,...y}=this.s(cf,x); this.g(y);
		this.R_Menu(overflowMenu);
		this.R_Button(collapseButton);
		this.R_SortFilterSubMenu(viewSelector);
	}
	/** @public @arg {D_PlayerConfig} x */
	D_PlayerConfig(x) {
		const cf="D_PlayerConfig";
		const {audioConfig,playbackStartConfig,streamSelectionConfig,mediaCommonConfig,webPlayerConfig,...y}=this.s(cf,x); this.g(y);
	}
	/** @public @arg {D_VideoDetails} x */
	D_VideoDetails(x) {
		const cf="D_VideoDetails";
		const {videoId,title,lengthSeconds,keywords,channelId,isOwnerViewing,shortDescription,isCrawlable,thumbnail,allowRatings,viewCount,author,isPrivate,isUnpluggedCorpus,isLiveContent,...y}=this.s(cf,x); this.g(y);
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
