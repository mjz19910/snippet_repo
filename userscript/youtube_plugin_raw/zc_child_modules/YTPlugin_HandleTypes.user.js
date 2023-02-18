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

const {as,base64_url_dec,split_string_once,MyReader,split_string,do_export,as_any}=require("./YtPlugin_Base.user");
const {ECatcherService}=require("./YTPlugin_ECatcherService.user");
const {ServiceMethods}=require("./YTPlugin_ServiceMethods.user");
const {TypedefGenerator}=require("./YTPlugin_Support_Service.user");

//#region module setup
const __module_name__="mod$HandleTypes";
if(!window.__youtube_plugin_base_loaded__) {throw new Error("Failed to load base plugin");}
if(window.__yt_plugin_log_imports__) console.log("Load HandleTypes Service");
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
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
//#region Constants
/** @type {{value:TypedefGenerator|null}} */
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
// [new_fexp_expected]
ECatcherService.known_experiments.push(...[
	[24476774],
].flat());
class HandleTypes extends ServiceMethods {
	/** @protected @template {(string|number)[]} T @template {T} R @arg {T} src @arg {R} target @returns {src is R} */
	is_eq_keys(src,target) {return this.eq_keys(src,target);}
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
	/** @arg {ResolverT<ServiceLoader,ServiceOptions>} x */
	constructor(x) {
		super(x);
	}
	//#endregion
	/** @private @arg {D_WatchNextTabbedResults} x */
	D_WatchNextTabbedResults(x) {
		const cf="D_WatchNextTabbedResults";
		const {tabs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(tabs,x => this.x.get("x_EventInput").R_Tab(x));
	}
	/** @public @arg {D_WebPlayerConfig} x */
	D_WebPlayerConfig(x) {
		const cf="D_WebPlayerConfig";
		const {useCobaltTvosDash,webPlayerActionsPorting,...y}=this.s(cf,x); this.g(y);
		this.ceq(useCobaltTvosDash,true);
		this.D_WebPlayerActionsPorting(webPlayerActionsPorting);
	}
	/** @public @arg {D_WebPlayerActionsPorting} x */
	D_WebPlayerActionsPorting(x) {
		const cf="D_WebPlayerActionsPorting";
		const {getSharePanelCommand,subscribeCommand,unsubscribeCommand,addToWatchLaterCommand,removeFromWatchLaterCommand,...y}=this.s(cf,x); this.g(y);
	}
	/** @public @arg {CF_L_TP_Params} cf @arg {D_WatchPageUrl} x */
	D_WatchPageUrl(cf,x) {
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
		this.parser.parse_url(cf,x);
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
	/** @protected @template T @arg {T_Command$<T>} x @arg {(this:this,x:T)=>void} f */
	T_Command_TP(x,f) {
		const cf="T_Command_TP";
		const {trackingParams,command: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		f.call(this,a);
	}
	/** @private @arg {G_PlaylistSidebarItem} x */
	G_PlaylistSidebarItem(x) {
		const cf="G_PlaylistSidebarItem";
		if("playlistSidebarPrimaryInfoRenderer" in x) return this.R_PlaylistSidebarPrimaryInfo(x);
		if("playlistSidebarSecondaryInfoRenderer" in x) return this.R_PlaylistSidebarSecondaryInfo(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_NextContents} x */
	G_NextContents(x) {
		const cf="G_NextContents";
		if("twoColumnWatchNextResults" in x) return this.R_TwoColumnWatchNextResults(x);
		if("singleColumnMusicWatchNextResultsRenderer" in x) return this.R_SingleColumnMusicWatchNextResults(x);
		x===""; this.codegen_typedef(cf,x);
		x===0;
	}
	/** @private @arg {G_GuideSectionItem} x */
	G_GuideSectionItem(x) {
		const cf="G_GuideSectionItem";
		if("guideEntryRenderer" in x) return this.R_GuideEntry(x);
		if("guideCollapsibleSectionEntryRenderer" in x) return this.R_GuideCollapsibleSectionEntry(x);
		if("guideDownloadsEntryRenderer" in x) return this.R_GuideDownloadsEntry(x);
		if("guideCollapsibleEntryRenderer" in x) return this.R_GuideCollapsibleEntry(x);
		if("guideSubscriptionsSectionRenderer" in x) return this.R_GuideSubscriptionsSection(x);
		if("guideSectionRenderer" in x) return this.R_GuideSection(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RS_Subscribe_Action} x */
	G_RS_Subscribe_Action(x) {
		const cf="RS_Subscribe_ActionItem";
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
	/** @private @arg {G_LiveChatContinuationItem} x */
	G_LiveChatContinuationItem(x) {
		const cf="G_LiveChatContinuationItem";
		if("invalidationContinuationData" in x) return this.CD_Invalidation(x);
		if("liveChatReplayContinuationData" in x) return this.CD_LiveChatReplay(x);
		if("playerSeekContinuationData" in x) return this.CD_PlayerSeek(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_RA_LiveChatContinuationActions} x */
	G_LiveChatContinuationActions(x) {
		const cf="G_LiveChatContinuationActions";
		if("replayChatItemAction" in x) return this.A_ReplayChatItem(x);
		if("addChatItemAction" in x) return this.A_AddChatItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_ChannelSwitcherContent} x */
	G_ChannelSwitcherContent(x) {
		const cf="G_ChannelSwitcherContent";
		if("buttonRenderer" in x) return this.R_Button(x);
		if("accountItem" in x) return this.A_AccountItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_ChatItem} x */
	G_ChatItem(x) {
		const cf="G_ChatItem";
		if("liveChatTextMessageRenderer" in x) return this.R_LiveChatTextMessage(x);
		if("liveChatPlaceholderItemRenderer" in x) return this.R_LiveChatPlaceholderItem(x);
		if("liveChatViewerEngagementMessageRenderer" in x) return this.R_LiveChatViewerEngagementMessage(x);
		x===""; this.codegen_typedef(cf,x);
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
	//#endregion
	//#region web_command_metadata
	//#endregion
	//#region general done
	/** @private @arg {A_GetMultiPageMenu} x */
	A_GetMultiPageMenu(x) {this.H_("getMultiPageMenuAction",x,this.AD_GetMultiPageMenu);}
	/** @private @arg {A_AddToGuideSection} x */
	A_AddToGuideSection(x) {let [a,y]=this.TE_Endpoint_2("A_AddToGuideSection","addToGuideSectionAction",x); this.g(y); this.AD_AddToGuideSection(a);}
	/** @private @arg {A_AddChatItem} x */
	A_AddChatItem(x) {let [a,y]=this.TE_Endpoint_2("A_AddChatItem","addChatItemAction",x); this.g(y); this.AD_AddChatItem(a);}
	/** @private @arg {A_ReplayChatItem} x */
	A_ReplayChatItem(x) {this.H_("replayChatItemAction",x,this.AD_ReplayChatItem);}
	/** @private @arg {A_AccountItem} x */
	A_AccountItem(x) {this.H_("accountItem",x,this.AD_AccountItem);}
	/** @public @arg {R_SettingsSidebar} x */
	R_SettingsSidebar(x) {this.H_("settingsSidebarRenderer",x,this.D_SettingsSidebar);}
	/** @public @arg {R_PlaylistSidebar} x */
	R_PlaylistSidebar(x) {this.H_("playlistSidebarRenderer",x,this.D_PlaylistSidebar);}
	/** @private @arg {R_PlaylistSidebarPrimaryInfo} x */
	R_PlaylistSidebarPrimaryInfo(x) {this.H_("playlistSidebarPrimaryInfoRenderer",x,this.D_PlaylistSidebarPrimaryInfo);}
	/** @private @arg {D_PlaylistSidebarPrimaryInfo} x */
	D_PlaylistSidebarPrimaryInfo(x) {
		const cf="D_PlaylistSidebarPrimaryInfo";
		const {thumbnailRenderer,title,stats,menu,navigationEndpoint,badges,description,showMoreText,titleForm,descriptionForm,privacyForm,...y}=this.D_Omit_ThumbnailOverlay(cf,x); this.g(y);
		this.R_PlaylistVideoThumbnail(thumbnailRenderer);
		this.t(title,this.G_Text);
		this.z(stats,this.G_Text);
		this.R_Menu(menu);
		this.E_Watch(navigationEndpoint);
		this.tz(badges,this.RMD_Badge);
		this.tg(description);
		this.G_Text(showMoreText);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
	/** @private @arg {R_PdgBuyFlow} x */
	R_PdgBuyFlow(x) {this.H_("pdgBuyFlowRenderer",x,this.D_PdgBuyFlow);}
	/** @private @arg {R_SuperVodBuyFlowContent} x */
	R_SuperVodBuyFlowContent(x) {this.H_("superVodBuyFlowContentRenderer",x,this.D_SuperVodBuyFlowContent);}
	/** @private @arg {R_PdgColorSlider} x */
	R_PdgColorSlider(x) {this.H_("pdgColorSliderRenderer",x,this.D_PdgColorSlider);}
	/** @private @arg {R_PdgCommentPreview} x */
	R_PdgCommentPreview(x) {this.H_("pdgCommentPreviewRenderer",x,this.D_PdgCommentPreview);}
	/** @private @arg {R_PdgBuyFlowHeader} x */
	R_PdgBuyFlowHeader(x) {this.H_("pdgBuyFlowHeaderRenderer",x,this.D_PdgBuyFlowHeader);}
	/** @private @arg {R_SingleColumnMusicWatchNextResults} x */
	R_SingleColumnMusicWatchNextResults(x) {this.H_("singleColumnMusicWatchNextResultsRenderer",x,this.R_Tabbed);}
	/** @private @arg {R_Tabbed} x */
	R_Tabbed(x) {this.H_("tabbedRenderer",x,this.R_WatchNextTabbedResults);}
	/** @public @arg {R_TemplateUpdate} x */
	R_TemplateUpdate(x) {this.H_("templateUpdate",x,this.D_TemplateUpdate);}
	/** @private @arg {D_TemplateUpdate} x */
	D_TemplateUpdate(x) {
		const cf="D_TemplateUpdate";
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
	/** @private @arg {R_Transcript} x */
	R_Transcript(x) {this.H_("transcriptRenderer",x,this.D_Transcript);}
	/** @private @arg {D_Transcript} x */
	D_Transcript(x) {
		const cf="D_Transcript";
		const {trackingParams,content: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.R_TranscriptSearchPanel(a);
	}
	/** @private @arg {R_TwoColumnSearchResults} x */
	R_TwoColumnSearchResults(x) {this.H_("twoColumnSearchResultsRenderer",x,this.D_TwoColumnSearchResults);}
	/** @private @arg {D_TwoColumnSearchResults} x */
	D_TwoColumnSearchResults(x) {this.H_("primaryContents",x,this.R_SectionList);}
	/** @private @arg {R_TranscriptSegmentList} x */
	R_TranscriptSegmentList(x) {this.H_("transcriptSegmentListRenderer",x,this.D_TranscriptSegmentList);}
	/** @private @arg {D_TranscriptSegmentList} x */
	D_TranscriptSegmentList(x) {
		const cf="D_TranscriptSegmentList";
		const {initialSegments,noResultLabel,retryLabel,touchCaptionsEnabled,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(initialSegments,this.R_TranscriptSegment);
		this.G_Text(noResultLabel);
		this.G_Text(retryLabel);
		this.a_primitive_bool(touchCaptionsEnabled);
	}
	/** @private @arg {R_TranscriptFooter} x */
	R_TranscriptFooter(x) {this.H_("transcriptFooterRenderer",x,this.D_TranscriptFooter);}
	/** @private @arg {R_TranscriptSearchPanel} x */
	R_TranscriptSearchPanel(x) {this.H_("transcriptSearchPanelRenderer",x,this.D_TranscriptSearchPanel);}
	/** @private @arg {D_TranscriptSearchPanel} x */
	D_TranscriptSearchPanel(x) {
		const cf="D_TranscriptSearchPanel";
		const {body,footer,trackingParams,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TranscriptSegmentList(body);
		this.R_TranscriptFooter(footer);
		this.trackingParams(trackingParams);
		if(targetId!=="engagement-panel-searchable-transcript-search-panel") debugger;
	}
	/** @private @arg {R_TranscriptSegment} x */
	R_TranscriptSegment(x) {this.H_("transcriptSegmentRenderer",x,this.D_TranscriptSegment);}
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
	/** @private @arg {D_TranscriptFooter} x */
	D_TranscriptFooter(x) {this.H_("languageMenu",x,this.R_SortFilterSubMenu);}
	/** @public @arg {D_TimedTextApi} x */
	D_TimedTextApi(x) {
		const cf="D_TimedTextApi";
		let {v,caps,xoaf,xoadf,xosf,hl,ip,ipbits,expire,signature,sparams,key,kind,lang,...y}=this.s(cf,x); this.g(y);
		this.videoId(v);
		caps&&this.save_string(`${cf}.caps`,caps);
		this.save_string(`${cf}.xoaf`,xoaf);
		xoadf&&this.save_string(`${cf}.xoadf`,xoadf);
		xosf&&this.save_string(`${cf}.xosf`,xosf);
		this.save_string(`${cf}.hl`,hl);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ipbits`,ipbits);
		let e_num=this.parse_number_template(expire);
		if(Number.isNaN(e_num)) debugger;
		this.a_primitive_num(e_num);
		this.parse_signature(signature);
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.key`,key);
		kind&&this.save_string(`${cf}.kind`,kind);
		this.save_string(`${cf}.lang`,lang);
	}
	/** @private @arg {R_WatchNextTabbedResults} x */
	R_WatchNextTabbedResults(x) {this.H_("watchNextTabbedResultsRenderer",x,this.D_WatchNextTabbedResults);}
	/** @private @arg {R_GuideSubscriptionsSection} x */
	R_GuideSubscriptionsSection(x) {this.H_("guideSubscriptionsSectionRenderer",x,this.D_GuideSubscriptionsSection);}
	/** @private @arg {R_GuideDownloadsEntry} x */
	R_GuideDownloadsEntry(x) {this.H_("guideDownloadsEntryRenderer",x,this.D_GuideDownloadsEntry);}
	/** @private @arg {R_GuideCollapsibleEntry} x */
	R_GuideCollapsibleEntry(x) {this.H_("guideCollapsibleEntryRenderer",x,this.D_GuideCollapsibleEntry);}
	/** @private @arg {R_GuideEntryData} x */
	R_GuideEntryData(x) {this.H_("guideEntryData",x,this.D_GuideEntryData);}
	/** @private @arg {R_GuideCollapsibleSectionEntry} x */
	R_GuideCollapsibleSectionEntry(x) {this.H_("guideCollapsibleSectionEntryRenderer",x,this.D_GuideCollapsibleSectionEntry);}
	/** @private @arg {R_GuideEntry} x */
	R_GuideEntry(x) {this.H_("guideEntryRenderer",x,this.D_GuideEntry);}
	/** @private @arg {R_GuideSection} x */
	R_GuideSection(x) {this.H_("guideSectionRenderer",x,this.D_GuideSection);}
	/** @public @arg {R_ResourceStatusInResponseCheck} x */
	R_ResourceStatusInResponseCheck(x) {this.H_("resourceStatusInResponseCheck",x,this.D_ResourceStatusInResponseCheck);}
	/** @private @arg {R_ReportFormModal} x */
	R_ReportFormModal(x) {this.H_("reportFormModalRenderer",x,this.g);}
	/** @arg {R_RichShelf} x */
	R_RichShelf(x) {this.H_("richShelfRenderer",x,this.D_RichShelf);}
	/** @arg {R_RatingSurveyOption} x */
	R_RatingSurveyOption(x) {this.H_("ratingSurveyOptionRenderer",x,this.D_RatingSurveyOption);}
	/** @arg {R_RatingSurvey} x */
	R_RatingSurvey(x) {this.H_("ratingSurveyRenderer",x,this.D_RatingSurvey);}
	/** @private @arg {R_PlaylistSidebarSecondaryInfo} x */
	R_PlaylistSidebarSecondaryInfo(x) {this.H_("playlistSidebarSecondaryInfoRenderer",x,this.D_PlaylistSidebarSecondaryInfo);}
	/** @public @arg {R_Channel_MD} x */
	R_Channel_MD(x) {this.H_("channelMetadataRenderer",x,this.D_Channel_MD);}
	/** @public @arg {R_Playlist_MD} x */
	R_Playlist_MD(x) {this.H_("playlistMetadataRenderer",x,this.D_Playlist_MD);}
	/** @private @arg {R_ChannelSwitcherPage} x */
	R_ChannelSwitcherPage(x) {this.H_("channelSwitcherPageRenderer",x,this.D_ChannelSwitcherPage);}
	/** @private @arg {R_PlaylistVideoThumbnail} x */
	R_PlaylistVideoThumbnail(x) {this.H_("playlistVideoThumbnailRenderer",x,this.D_PlaylistVideoThumbnail);}
	/** @private @arg {R_Message} x */
	R_Message(x) {this.H_("messageRenderer",x,this.g);}
	/** @private @arg {D_LiveBroadcastingBadge} x */
	D_LiveBroadcastingBadge(x) {
		const cf="D_LiveBroadcastingBadge";
		const {liveBroadcasting,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(liveBroadcasting);
	}
	/** @private @arg {R_LiveChatParticipantsList} x */
	R_LiveChatParticipantsList(x) {this.H_("liveChatParticipantsListRenderer",x,this.g);}
	/** @private @arg {R_LiveChatTicker} x */
	R_LiveChatTicker(x) {this.H_("liveChatTickerRenderer",x,this.g);}
	/** @private @arg {R_LiveChatItemList} x */
	R_LiveChatItemList(x) {this.H_("liveChatItemListRenderer",x,this.g);}
	/** @private @arg {R_LiveChatMessageInput} x */
	R_LiveChatMessageInput(x) {this.H_("liveChatMessageInputRenderer",x,this.g);}
	/** @public @arg {R_LiveChatViewerEngagementMessage} x */
	R_LiveChatViewerEngagementMessage(x) {this.H_("liveChatViewerEngagementMessageRenderer",x,this.D_LiveChatViewerEngagementMessage);}
	/** @public @arg {D_LiveChatViewerEngagementMessage} x */
	D_LiveChatViewerEngagementMessage(x) {
		const cf="D_LiveChatViewerEngagementMessage";
		const {id,timestampUsec,icon,message,actionButton,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.trackingParams(trackingParams);
	}
	/** @public @arg {R_LiveChatPlaceholderItem} x */
	R_LiveChatPlaceholderItem(x) {this.H_("liveChatPlaceholderItemRenderer",x,this.D_LiveChatPlaceholderItem);}
	/** @public @arg {D_LiveChatPlaceholderItem} x */
	D_LiveChatPlaceholderItem(x) {
		const cf="D_LiveChatPlaceholderItem";
		const {id,timestampUsec,...y}=this.s(cf,x); this.g(y);
		console.log(`${cf}.id`,id);
		let u_seconds=this.parse_number_template(timestampUsec);
		this.a_primitive_num(u_seconds);
	}
	/** @public @arg {R_LiveChatTextMessage} x */
	R_LiveChatTextMessage(x) {this.H_("liveChatTextMessageRenderer",x,this.D_LiveChatTextMessage);}
	/** @public @arg {D_LiveChatTextMessage} x */
	D_LiveChatTextMessage(x) {
		const cf="D_LiveChatTextMessage";
		const {message,authorName,authorPhoto,contextMenuEndpoint,id,authorBadges,timestampUsec,authorExternalChannelId,contextMenuAccessibility,timestampText,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		console.log(`${cf}.id`,id);
	}
	/** @private @arg {D_LiveChatEmoji} x */
	D_LiveChatEmoji(x) {
		const cf="D_LiveChatEmoji";
		const {isLocked,...y}=this.D_CustomEmoji_Omit(cf,x); this.g(y);
		this.a_primitive_bool(isLocked);
	}
	/** @private @arg {R_ChannelSwitcherHeader} x */
	R_ChannelSwitcherHeader(x) {this.H_("channelSwitcherHeaderRenderer",x,this.D_ChannelSwitcherHeader);}
	/** @private @arg {D_ChannelSwitcherPage} x */
	D_ChannelSwitcherPage(x) {
		const cf="D_ChannelSwitcherPage";
		const {header,targetId,contents,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ChannelSwitcherHeader(header);
		this.ceq(targetId,"ceq");
		this.z(contents,this.G_ChannelSwitcherContent);
	}
	/** @private @arg {D_ChannelSwitcherHeader} x */
	D_ChannelSwitcherHeader(x) {
		const cf="D_ChannelSwitcherHeader";
		const {title,button,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.R_Button(button);
	}
	/** @private @arg {D_ChipColorPalette} x */
	D_ChipColorPalette(x) {const cf="D_ChipColorPalette"; this.codegen_typedef(cf,x); this.GEN(cf,x);}
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
	/** @private @arg {R_PdgCommentOption} x */
	R_PdgCommentOption(x) {this.H_("pdgCommentOptionRenderer",x,this.D_PdgCommentOption);}
	/** @arg {R_InlineSurvey} x */
	R_InlineSurvey(x) {this.H_("inlineSurveyRenderer",x,this.D_InlineSurvey);}
	/** @arg {R_SourcePivotHeader} x */
	R_SourcePivotHeader(x) {this.H_("sourcePivotHeaderRenderer",x,this.D_SourcePivotHeader);}
	/** @arg {R_ProfilePageHeaderInformationViewModel} x */
	R_ProfilePageHeaderInformationViewModel(x) {this.H_("profilePageHeaderInformationViewModel",x,this.D_ProfilePageHeaderInformation);}
	/** @arg {R_ProfilePageHeaderTitleViewModel} x */
	R_ProfilePageHeaderTitleViewModel(x) {this.H_("profilePageHeaderTitleViewModel",x,this.D_ProfilePageHeaderTitle);}
	/** @arg {R_ProfilePageHeaderThumbnailViewModel} x */
	R_ProfilePageHeaderThumbnailViewModel(x) {this.H_("profilePageHeaderThumbnailViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderMetadataViewModel} x */
	R_ProfilePageHeaderMetadataViewModel(x) {this.H_("profilePageHeaderMetadataViewModel",x,this.g);}
	/** @arg {R_ProfilePageHeaderButtonRowViewModel} x */
	R_ProfilePageHeaderButtonRowViewModel(x) {this.H_("profilePageHeaderButtonRowViewModel",x,this.g);}
	/** @arg {R_ExpandableSurveyResponse} x */
	R_ExpandableSurveyResponse(x) {this.H_("expandableSurveyResponseRenderer",x,this.D_ExpandableSurveyResponse);}
	/** @arg {R_AutomixPreviewVideo} x */
	R_AutomixPreviewVideo(x) {this.H_("automixPreviewVideoRenderer",x,this.g);}
	/** @private @arg {D_AttBgChallenge} x */
	D_AttBgChallenge(x) {
		const cf="D_AttBgChallenge";
		const {interpreterUrl,interpreterHash,program,globalName,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.t(interpreterUrl,a => {
			let uw=this.UrlWrappedValueT(a);
			this.a_primitive_str(uw);
		});
		this.a_primitive_str(interpreterHash);
		this.a_primitive_str(program);
		if(globalName!=="trayride") debugger;
	}
	/** @public @arg {D_AudioConfig} x */
	D_AudioConfig(x) {
		const cf="D_AudioConfig";
		const {loudnessDb,perceptualLoudnessDb,enablePerFormatLoudness,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_num(loudnessDb);
		this.a_primitive_num(perceptualLoudnessDb);
		this.a_primitive_bool(enablePerFormatLoudness);
	}
	/** @public @arg {R_DynamicReadaheadConfig} x */
	R_DynamicReadaheadConfig(x) {this.H_("dynamicReadaheadConfig",x,this.D_DynamicReadaheadConfig);}
	/** @public @arg {D_DynamicReadaheadConfig} x */
	D_DynamicReadaheadConfig(x) {
		const cf="D_DynamicReadaheadConfig";
		const {maxReadAheadMediaTimeMs,minReadAheadMediaTimeMs,readAheadGrowthRateMs,...y}=this.s(cf,x); this.g(y);
		this.ceq(maxReadAheadMediaTimeMs,120000);
		this.ceq(minReadAheadMediaTimeMs,15000);
		this.ceq(readAheadGrowthRateMs,1000);
	}
	/** @private @arg {R_PdgCommentChip} x */
	R_PdgCommentChip(x) {this.H_("pdgCommentChipRenderer",x,this.D_PdgCommentChip);}
	/** @private @arg {CD_TimedContinuation} x */
	CD_TimedContinuation(x) {this.H_("timedContinuationData",x,this.DC_Timed);}
	/** @private @arg {AU_SubscribeButton} x */
	AU_SubscribeButton(x) {this.H_("updateSubscribeButtonAction",x,this.AD_SubscribeButton);}
	/** @private @arg {AU_ChannelSwitcherPage} x */
	AU_ChannelSwitcherPage(x) {this.H_("updateChannelSwitcherPageAction",x,this.AD_UpdateChannelSwitcherPage);}
	/** @private @arg {AD_GetMultiPageMenu} x */
	AD_GetMultiPageMenu(x) {this.H_("menu",x,x => this.TR_MultiPageMenu("TR_MultiPageMenu_Empty",x));}
	/** @private @arg {C_RunAttestation} x */
	C_RunAttestation(x) {this.H_("runAttestationCommand",x,this.D_RunAttestation);}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @arg {C_FollowUp} x */
	C_FollowUp(x) {let [a,y]=this.TE_Endpoint_2("C_FollowUp","addFollowUpSurveyCommand",x); this.g(y); this.DC_AddFollowUpSurvey(a);}
	/** @private @arg {DC_AddFollowUpSurvey} x */
	DC_AddFollowUpSurvey(x) {
		const cf="DC_AddFollowUpSurvey";
		const {followUpOptions,followUpText,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
	}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
	}
	/** @private @arg {DC_Timed} x */
	DC_Timed(x) {
		const cf="DC_Timed";
		const {timeoutMs,continuation,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(timeoutMs!==60000) debugger;
		this.params("timed_continuation.data",continuation);
	}
	/** @private @arg {D_PlaylistSidebarSecondaryInfo} x */
	D_PlaylistSidebarSecondaryInfo(x) {this.H_("videoOwner",x,this.R_VideoOwner);}
	cg_mismatch_set=new Set();
	/** @type {[string,string][]} */
	cg_mismatch_list=[];
	/** @template A1,A2,A3,A4 @template {[(a1:A1,a2:A2,a3:A3,a4:A4,...n:any[])=>void]} T @arg {[T,A1,A2,A3,A4]} arg0 */
	make_bind([func,a1,a2,a3,a4]) {return [func,a1,a2,a3,a4];}
	//#region Grouped Endpoints
	//#region E_ (Endpoints)
	/** @private @arg {E_YpcGetCart} x */
	E_YpcGetCart(x) {const [a,b,y]=this.TE_Endpoint_3("E_YpcGetCart","ypcGetCartEndpoint",x); this.g(y); this.M_YpcGetCart(a); this.DE_YpcGetCart(b);}
	/** @private @arg {M_YpcGetCart} x */
	M_YpcGetCart(x) {this.T_WCM("M_YpcGetCart",x,this.GM_YpcGetCart);}
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
	/** @arg {Omit<Omit<Omit<D_Microformat, `url${string}`>, `ios${string}`>, `twitter${string}`>} x */
	D_Microformat_Other(x) {
		const cf="D_Microformat_Other";
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
	/** @public @arg {B_HrefUrl} x */
	B_HrefUrl(x) {this.y("B_HrefUrl","hrefUrl",x,x => this.parser.parse_url("B_HrefUrl.url",x));}
	/** @private @arg {D_SettingsSidebar} x */
	D_SettingsSidebar(x) {
		const cf="D_SettingsSidebar";
		const {title,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(items,this.R_CompactLink);
	}
	/** @private @arg {D_PdgBuyFlow} x */
	D_PdgBuyFlow(x) {
		const cf="D_PdgBuyFlow";
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
		const cf="D_PlaylistSidebar";
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
	/** @public @arg {RS_AccountMenu} x */
	RS_AccountMenu(x) {
		const cf="RS_AccountMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RSG_Survey} x */
	RSG_Survey(x) {
		const cf="RSG_Survey";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RSG_PdgBuyFlow} x */
	RSG_PdgBuyFlow(x) {
		const cf="RSG_PdgBuyFlow";
		const {responseContext: {},command,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let pu=this.TA_OpenPopup("TA_OpenPopup:R_PdgBuyFlow",command);
		if("pdgBuyFlowRenderer" in pu) {this.R_PdgBuyFlow(pu);}
		pu.pdgBuyFlowRenderer;
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_SuperVodBuyFlowContent} x */
	D_SuperVodBuyFlowContent(x) {
		const cf="D_SuperVodBuyFlowContent";
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
		const cf="D_PdgColorSlider";
		const {notches,superThanksSelectedTierEntity,maxTierValue,minTierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(notches,this.D_NotchesItem);
		this.DE_SuperThanksSelectedTier(superThanksSelectedTierEntity);
		this.G_Text(maxTierValue);
		this.G_Text(minTierValue);
	}
	/** @private @arg {D_NotchesItem} x */
	D_NotchesItem(x) {
		const cf="NotchesItem";
		const {linearGradientCssStyle,knobColorArgb,purchaseCommand,tierValue,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(linearGradientCssStyle) {debugger;}
		if(knobColorArgb!==4280191205) debugger;
		this.E_YpcGetCart(purchaseCommand);
		this.G_Text(tierValue);
	}
	ignore_incorrect_name_set=new Set([
		"D_CommonConfig",
	]);
	/** @public @arg {RS_UpdateMetadata} x */
	RSU_M(x) {
		const cf="RSU_M";
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
	/** @public @arg {RS_Search} x */
	RS_Search(x) {
		const cf="RS_Search";
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
	/** @public @arg {RSG_SearchSuggestions} x */
	RSG_SearchSuggestions(x) {
		const cf="RSG_SearchSuggestions";
		const {responseContext: {},trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RSL_Like} x */
	RSL_Like(x) {
		const cf="RSL_Like";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
	}
	/** @public @arg {RSL_Dislike} x */
	RSL_Dislike(x) {
		const cf="RSL_Dislike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let ac=this.tz(actions,x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		});
		if(!ac) return;
		let [r1]=ac;
		this.z(r1,this.g);
	}
	/** @public @arg {RSL_RemoveLike} x */
	RSL_RemoveLike(x) {
		const cf="RSL_RemoveLike";
		const {responseContext: {},actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("openPopupAction" in x) return this.TA_OpenPopup("TA_OpenPopup_Empty",x);
			return null;
		}));
	}
	/** @public @arg {RS_ReelWatchSequence} x */
	RS_ReelWatchSequence(x) {
		const cf="RS_ReelWatchSequence";
		const {responseContext: {},entries,trackingParams,continuationEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,x => this.T_Command_TP(x,x => this.x.get("x_VE37414").E_ReelWatch(x)));
		this.trackingParams(trackingParams);
		this.t(continuationEndpoint,this.C_Continuation);
	}
	/** @public @arg {RS_GetLiveChat} x */
	RS_GetLiveChat(x) {
		const cf="RS_GetLiveChat";
		const {responseContext: {},continuationContents: a1,trackingParams: a2,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_LiveChat(a1);
		this.t_cf(cf,a2,this.trackingParams);
	}
	/** @private @arg {string} x */
	RS_Next_ContextParams(x) {this.params("next.queue_context.params",x);}
	/** @public @arg {RS_Next} x */
	RS_Next(x) {
		const cf="RS_Next";
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
	/** @private @arg {RC_PlaylistPanel} x */
	RC_PlaylistPanel(x) {this.H_("playlistPanelContinuation",x,this.g);}
	/** @private @arg {RC_LiveChat} x */
	RC_LiveChat(x) {this.H_("liveChatContinuation",x,this.DC_LiveChat);}
	//#region pause
	//#endregion
	/** @template {{}} T @arg {T} x @arg {keyof T} k */
	T_EP_In(x,k) {return x[k];}
	/** @protected @template T @template {string} U @arg {D_MenuServiceItem_Icon<U, T>} x @arg {(this:this,x:T)=>void} f */
	D_MenuServiceItem_Omit(x,f) {const cf="D_MenuServiceItem_Omit"; const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); f.call(this,serviceEndpoint); return y;}
	/** @protected @arg {D_MenuServiceItem<{}>} x */
	D_MenuServiceItem(x) {
		const cf="D_MenuServiceItem";
		const {text,serviceEndpoint,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		this.g(serviceEndpoint);
		this.trackingParams(trackingParams);
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
	/** @private @arg {AD_UpdateEngagementPanel} x */
	AD_UpdateEngagementPanel(x) {
		const cf="AD_UpdateEngagementPanel";
		const {content,targetId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_Transcript(content);
		if(targetId!=="engagement-panel-searchable-transcript") debugger;
	}
	/** @public @arg {REG_DatasyncIds} x */
	REG_DatasyncIds(x) {
		const cf="REG_DatasyncIds";
		const {responseContext: {},datasyncIds,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(datasyncIds,this.a_primitive_str);
	}
	/** @public @arg {REG_AccountSwitcher} x */
	REG_AccountSwitcher(x) {
		const cf="REG_AccountSwitcher";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.A_GetMultiPageMenu);
	}
	/** @public @arg {RS_AccountsList} x */
	RS_AccountsList(x) {
		const cf="RS_AccountsList";
		const {responseContext: {},selectText,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(selectText);
		this.z(actions,this.AU_ChannelSwitcherPage);
	}
	/** @public @arg {RS_WatchReelItem} x */
	RSW_ReelItem(x) {
		const cf="RSW_ReelItem";
		const {responseContext: {},overlay,status,trackingParams,replacementEndpoint,sequenceContinuation,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(trackingParams);
		this.t(replacementEndpoint,x => this.x.get("x_VE37414").E_ReelWatch(x));
		this.t(sequenceContinuation,this.a_primitive_str);
		this.R_DesktopTopbar(desktopTopbar);
		this.z(engagementPanels,this.R_EngagementPanelSectionList);
	}
	/** @public @arg {RS_SetSetting} x */
	RS_SetSetting(x) {
		const cf="RS_SetSetting";
		const {responseContext: {},settingItemId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(settingItemId!=="407") debugger;
	}
	/** @public @arg {RS_Feedback} x */
	RS_Feedback(x) {
		const cf="RS_Feedback";
		const {responseContext: {},feedbackResponses,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(feedbackResponses,this.D_FeedbackResponseProcessedStatus);
	}
	/** @public @arg {P_ParamParse} cf @arg {string} x */
	decode_binary_obj(cf,x) {
		let binary_arr=this.read_b64_protobuf(decodeURIComponent(x));
		if(!binary_arr) {debugger; return;}
		this.decode_binary_arr(cf,binary_arr);
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
			/** @type {D_ProtobufObj|V_ParamObj_2[number]} */
			let otu=as(obj);
			if(otu[0]==="child") {
				if(otu.length===3) {
					const [,binary_arr,obj]=otu;
					if(obj!==null) {
						if(1 in obj&&2 in obj&&3 in obj&&obj[1][0]==="data32") {
							if(obj[1][0]==="data32"&&obj[2][0]==="data_fixed32"&&obj[3][0]==="data_fixed32") {
								let kk=this.get_keys_of(obj);
								if(this.eq_keys(kk,[1,2,3])) {
									/** @type {V_BinaryTimestamp} */
									let bts={...obj,1: obj[1],2: obj[2],3: obj[3]}; bts;
									return `TYPE::T_VW_2<V_BinaryTimestamp>`;
								}
							}
							console.log("maybe_handle_bin.do_V_BinaryTimestamp",obj);
							return `TYPE::T_VW_2<${this.typedef_json_replace_bin(s,"vw.bin_ts",obj)}>`;
						}
						console.log("maybe_handle_bin.do_obj",obj);
						return `TYPE::T_VW_2<${this.typedef_json_replace_bin(s,"vw",obj)}>`;
					}
					let decoded_string=this._decoder.decode(binary_arr);
					if(binary_arr[0]===0) {
						console.log("[maybe_handle_bin.do_maybe_string]",decoded_string);
						return otu;
					}
					return `TYPE::T_VW_2<"${decoded_string}">`;
				}
				return this.convert_arr_to_obj([otu]);
			}
			if(otu[0]==="data32") {
				if(otu.length===2) {
					return `TYPE::T_D32<${otu[1]}>`;
				}
				return this.convert_arr_to_obj([otu]);
			}
			if(otu[0]==="data_fixed32") {
				if(otu.length===2) {
					return `TYPE::T_FD32<${otu[1]}>`;
				}
				return this.convert_arr_to_obj([otu]);
			}
			if(otu[0]==="raw") {
				switch(otu[1][0]) {
					case "string": return `TYPE::T_VSR<"${otu[1][1]}">`;
					case "bigint": return `TYPE::T_VW_Bigint<${otu[1][1]}n>`;
				}
				return `TYPE::T_VW_R<"${otu[1][0]}",${otu[1][1]}>`;
			}
			if(otu[0]==="data64") {
				if(otu.length===3) {
					return `TYPE::T_VW_Bigint<${otu[2]}n>`;
				}
				return this.convert_arr_to_obj([otu]);
			}
			/** @type {(D_ProtobufObj|V_ParamObj_2[number])[]} */
			let ota=obj;
			if(ota[0][0]==="child") {
				debugger;
				let otr=[];
				for(let item of ota) {
					otr.push(item);
				}
				return otr;
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
		return `\ntype ${cf}=${this.gen_typedef_bin_json(s,x)};\n`;
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
		if(!x) {debugger; return null;}
		this.k(cf,x);
		let keys=this.get_keys_of(x);
		if(keys.length!==1) debugger;
		if(k!=keys[0]) {debugger; return null;}
		const a=x[k];
		if(!a) {debugger; return null;}
		const [value]=a;
		return f.call(this,value);
	}
	/**
	 * @protected
	 * @template V @template {PropertyKey} K @template {{[U in K]:T_VW<{}>;}} T
	 * @arg {K} k @arg {string} cf @arg {T} x @arg {(this:this,x:T[K][0])=>V} f
	 * @returns {[y,ret]}
	 */
	H_a(cf,k,x,f,save=false) {
		if(save) this.k(cf,x);
		const {[k]: [a],...y}=x;
		const ret=f.call(this,a);
		return [y,ret];
	}
	/** @type {string[]} */
	continuation_logged_str=[];
	/** @private @arg {P_ParamParse} cf @arg {D_ProtobufObj[]} x */
	decode_binary_arr(cf,x) {
		if(x.length===0) debugger;
		let bin_obj=this.convert_arr_to_obj(x);
		if(!bin_obj) {debugger; return;}
		try {
			this.binary_result(cf,bin_obj);
		} catch(e) {
			console.log("[binary_result_obj]",bin_obj);
			console.log("[binary_result_error]");
			console.log(e);
		}
	}
	/** @private @arg {string} x */
	read_b64_protobuf(x) {
		let buffer=base64_url_dec.decodeByteArray(x);
		if(!buffer) {debugger; return null;}
		let reader=new MyReader(buffer);
		return reader.try_read_any();
	}
	/** @public @arg {RSG_Transcript} x */
	RSG_Transcript(x) {
		const cf="RSG_Transcript";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,a => {
			if("updateEngagementPanelAction" in a) {return this.AU_EngagementPanel(a);}
		});
		this.trackingParams(trackingParams);
	}
	/** @public @arg {RS_AttGet} x */
	RS_AttGet(x) {
		const cf="RS_AttGet";
		const {responseContext: {},challenge,bgChallenge,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(challenge);
		this.D_AttBgChallenge(bgChallenge);
	}
	/** @public @arg {RS_Guide} x */
	RS_Guide(x) {
		const cf="RS_Guide";
		const {responseContext: {},items,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(items,this.G_GuideSectionItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_GuideCollapsibleEntry} x */
	D_GuideCollapsibleEntry(x) {
		const cf="D_GuideCollapsibleEntry";
		const {expanderItem,expandableItems,collapserItem,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_GuideEntry(expanderItem);
		this.z(expandableItems,x => {
			if("guideEntryRenderer" in x) return this.G_GuideSectionItem(x);
		});
		this.R_GuideEntry(collapserItem);
	}
	/** @private @arg {D_GuideDownloadsEntry} x */
	D_GuideDownloadsEntry(x) {
		const cf="D_GuideDownloadsEntry";
		const {alwaysShow,entryRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(alwaysShow!==false) debugger;
		if(!entryRenderer.guideEntryRenderer) debugger;
		this.R_GuideEntry(entryRenderer);
	}
	/** @private @arg {D_GuideSubscriptionsSection} x */
	D_GuideSubscriptionsSection(x) {
		const cf="D_GuideSubscriptionsSection";
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
		const cf="D_GuideSection";
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
		const cf="D_GuideEntry_TargetId";
		switch(x) {
			default: this.cg.codegen_case(cf,x); break;
			case "downloads-guide-item":
			case "library-guide-item":
		}
	}
	/** @private @arg {"D_GuideEntry"} cf @arg {Extract<D_GuideEntry,{targetId:any;}>|D_GuideEntry_OfflineDownloadEntry|D_GuideEntry_VideoLibrary} x */
	D_GuideEntry_WithTargetId(cf,x) {
		const {navigationEndpoint,icon,targetId,isPrimary,...y}=this.D_GuideEntry_Omit(cf,x); this.g(y);
		{
			let x2=navigationEndpoint;
			if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
			if(this.is_TE_VE(x2,42352)) return this.E_VE42352(x2);
			debugger;
		}
		if(icon.iconType!=="VIDEO_LIBRARY_WHITE") debugger;
		this.T_Icon_AnyOf("D_GuideEntry_Icon",icon,["OFFLINE_DOWNLOAD","VIDEO_LIBRARY_WHITE"]);
		this.D_GuideEntry_TargetId(targetId);
		if(isPrimary!==true) debugger;
	}
	/** @public @arg {Extract<T_SplitOnce<NS_DP_Parse.ParseUrlStr_0,"/">,["shorts",any]>} x */
	parse_shorts_url(x) {
		const [sec,id]=x; if(sec!=="shorts") debugger;
		this.indexed_db_put("video_id",{key: `video_id:shorts:${id}`,type: "video_id:shorts",v: id});
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
		const cf="D_GuideEntryData";
		const {guideEntryId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.parse_guide_entry_id(guideEntryId);
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
			if(this.is_TE_VE(navigationEndpoint,3854)) {
				this.E_VE3854(navigationEndpoint);
			} else if(this.is_TE_VE(navigationEndpoint,96368)) {
				this.E_VE96368(navigationEndpoint);
			} else {
				debugger;
			}
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
			let x2=navigationEndpoint;
			if("browseEndpoint" in x2) {
				if(this.is_TE_VE(x2,3611)) return this.E_VE3611(x2);
				if(this.is_TE_VE(x2,5754)) return this.E_VE5754(x2);
				if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
				if(this.is_TE_VE(x2,11487)) return this.E_VE11487(x2);
				if(this.is_TE_VE(x2,23462)) return this.E_VE23462(x2);
				x2; debugger;
				break x;
			}
			if("urlEndpoint" in x2) {
				this.E_VE83769_Url(x2);
				break x;
			}
		}
		let is_not_in_set=this.T_Icon_AnyOf("D_GuideEntry_WithNavEP:icon",icon,this.D_GuideEntry_IconType.WithNavEP);
		if(is_not_in_set) this.onMissingIcon(cf2,icon,x,this.D_GuideEntry_IconType.WithNavEP,this.D_GuideEntry_MissingIconType);
		{
			let x2=navigationEndpoint;
			if("urlEndpoint" in x2) return this.E_VE83769_Url(x2);
			if("browseEndpoint" in x2) {
				if(this.is_TE_VE(x2,6827)) return this.E_VE6827(x2);
				if(this.is_TE_VE(x2,5754)) return this.E_VE5754(x2);
				x2; debugger;
				return;
			};
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
				this.x.get("x_VE37414").E_ReelWatch(x);
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
				this.E_VE5754(navigationEndpoint);
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
			if(presentationStyle!=="GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT") debugger;
			this.D_Thumbnail(thumbnail);
			this.D_LiveBroadcastingBadge(badges);
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
		const cf="D_GuideEntry";
		if("targetId" in x) return this.D_GuideEntry_WithTargetId(cf,x);
		if("icon" in x) return this.D_GuideEntry_WithIcon(cf,x);
		if("presentationStyle" in x) {
			const {navigationEndpoint,thumbnail,badges,trackingParams,formattedTitle,accessibility,entryData,presentationStyle,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.E_VE3611(navigationEndpoint);
			this.D_Thumbnail(thumbnail);
			this.D_LiveBroadcastingBadge(badges);
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
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {D_GuideCollapsibleSectionEntry} x */
	D_GuideCollapsibleSectionEntry(x) {
		const cf="D_GuideCollapsibleSectionEntry";
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
		this.RE_D_VE3832_PreconnectUrl(x[0]);
	}
	/** @type {string[]} */
	logged_hosts=[];
	log_googlevideo_host=false;
	/** @private @arg {RE_D_GoogleVideoUrl_Hostname} x */
	on_googlevideo_host(x) {
		let url_parts=split_string_once(x,".");
		let [m2]=url_parts;
		let m3=split_string_once(m2,"---");
		let [,mi]=m3;
		/** @type {D_GoogleVideoHostPartition} */
		let ap=this.get_gv_parts(mi);
		this.D_GoogleVideoHostPartition("url",ap);
		const gen_cf="js_gen_case:log_googlevideo_host";
		let ap_z=ap.partition;
		switch(ap_z) {
			default: {
				let gen=this.cg.codegen_case_cache(`${gen_cf}:host_partition`,ap.partition);
				if(gen.has) break;
				console.log(`-- [${gen_cf}:host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
			}; break;
			case "a5mek": case "hp57k": case "nx5s7": case "nx57y": case "p5qls": case "p5qs7":
		}
		if(this.log_googlevideo_host) {
			if(this.logged_hosts.includes(x)) return;
			this.logged_hosts.push(x);
			console.log("[googlevideo_host] [%s]",x);
			Promise.resolve().then(() => this.logged_hosts.length=0);
		}
	}
	/** @private @arg {"RE_D_VE3832_PreconnectUrl"|"D_VideoPlaybackShape_LS_Params"|"url"} cf @arg {D_GoogleVideoHostPartition} x */
	D_GoogleVideoHostPartition(cf,x) {
		this.save_string(`google_video.${cf}.partition`,x.partition);
		this.save_string(`google_video.${cf}.selector`,x.selector);
	}
	/** @private @arg {RE_D_VE3832_PreconnectUrl} x */
	RE_D_VE3832_PreconnectUrl(x) {
		const cf="RE_D_VE3832_PreconnectUrl";
		let up=this.parse_with_url_parse(x);
		if(up.pathname!=="/generate_204") debugger;
		const hn=up.host;
		this.on_googlevideo_host(hn);
		let [ux,u1,...y]=split_string(hn,".googlevideo.com");
		if(y.length!==0) debugger;
		if(u1!=="") debugger;
		/** @type {`rr${1}---sn-${"nx57y"}n7z`} */
		let utx=as_any(ux);
		let ss2=split_string(utx,"---");
		if(!this.str_starts_with(ss2[0],"rr")) debugger;
		let ss3=split_string_once(ss2[0],"rr")[1];
		/** @type {`${1|2|3|4|5}`} */
		let s3_t=as_any(ss3);
		switch(s3_t) {
			default: s3_t===""; debugger; break;
			case "1": case "2": case "3": case "4": case "5":
		}
		let [,mi]=ss2;
		let ap=this.get_gv_parts(mi);
		this.D_GoogleVideoHostPartition(cf,ap);
		switch(ap.partition) {
			default: {
				let gen=this.cg.codegen_case_cache(`${cf}.host_partition`,mi);
				if(gen.has) break;
				console.log(`-- [js_gen_case:${cf}.host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
				debugger;
			}; break;
			case "nx57y": case "nx5s7":
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
		/** @type {G_Gv_1|"lk"|`s${"d"|"e"|"k"|"l"|"s"|"z"}`|`7${"6"|"d"|"s"|"y"|"z"}`|`e${"l"|"e"}`} */
		let s6=as_any(ss6);
		console.log(`google video [rr:${ss3}]---[sn]-[nx:${s0}${s1}:${s2}${s3}:${ss6}].[googlevideo.com]`);
		switch(s6) {
			default: s6===""; debugger; break;
			case "lk":
			case "sd": case "se": case "sk": case "sl": case "ss": case "sz":
			case "76": case "7d": case "7s": case "7y": case "7z":
			case "el": case "ee":
		}
	}
	/** @public @arg {RS_AttLog_RC} x */
	RS_AttLog_RC(x) {this.HD_("RS_AttLog_RC","responseContext",x);}
	/** @private @arg {D_FeedbackResponseProcessedStatus} x */
	D_FeedbackResponseProcessedStatus(x) {
		const cf="D_FeedbackResponseProcessedStatus";
		const {isProcessed,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(isProcessed,"boolean");
	}
	/** @private @arg {AU_EngagementPanel} x */
	AU_EngagementPanel(x) {
		const cf="AU_EngagementPanel";
		const {updateEngagementPanelAction,clickTrackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.AD_UpdateEngagementPanel(updateEngagementPanelAction);
		this.clickTrackingParams(clickTrackingParams);
	}
	/** @type {Map<string,((y:C_UpdateToggleButtonState)=>void)>} */
	h_m=new Map;
	/** @public @arg {RS_Channel} x */
	RS_Channel(x) {
		const cf="RS_Channel";
		const {responseContext: {},contents,header,metadata,topbar,trackingParams,microformat,onResponseReceivedActions,cacheMetadata,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_C4TabbedHeader(header);
		this.R_Channel_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.tz(onResponseReceivedActions,this.C_ResetChannelUnreadCount);
		this.t(cacheMetadata,this.D_Cache_MD);
	}
	/** @private @arg {D_ResourceStatusInResponseCheck} x */
	D_ResourceStatusInResponseCheck(x) {
		const cf="D_ResourceStatusInResponseCheckData";
		const {serverBuildLabel,resourceStatuses: a,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(serverBuildLabel);
		this.z(a,this.D_ElementResourceStatus);
	}
	/** @private @arg {D_ElementResourceStatus} x */
	D_ElementResourceStatus(x) {
		const cf="D_ElementResourceStatus";
		const {identifier,status,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(status!=="ELEMENTS_RESOURCE_STATUS_ATTACHED") debugger;
		this.a_primitive_str(identifier);
	}
	/** @public @arg {RSG_SharePanel} x */
	RSG_SharePanel(x) {
		const cf="RSG_SharePanel";
		const {responseContext: {},trackingParams,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(actions,x => {
			const cf="RSG_SharePanel_Action";
			const {clickTrackingParams,openPopupAction,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.clickTrackingParams(clickTrackingParams);
			console.log("[RSG_SharePanel.openPopupAction]",openPopupAction);
		});
	}
	/** @public @arg {RS_Subscribe} x */
	RS_Subscribe(x) {
		const cf="RS_Subscribe";
		const {responseContext: {},actions,newNotificationButton,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(actions,this.G_RS_Subscribe_Action);
		this.g(newNotificationButton);
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {AD_UpdateChannelSwitcherPage} x */
	AD_UpdateChannelSwitcherPage(x) {this.TA_Page("AD_UpdateChannelSwitcherPage",x,this.R_ChannelSwitcherPage);}
	/** @private @arg {AD_AddToGuideSection} x */
	AD_AddToGuideSection(x) {
		const cf="AD_AddToGuideSection";
		const {handlerData,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		switch(handlerData) {
			case "GUIDE_ACTION_ADD_TO_PLAYLISTS": break;
			case "GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS": break;
		}
		this.z(items,this.R_GuideEntry);
	}
	/** @private @arg {AD_SubscribeButton} x */
	AD_SubscribeButton(x) {
		const cf="AD_SubscribeButton";
		const {subscribed,channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_bool(subscribed);
		this.D_ChannelId(channelId);
	}
	/** @public @arg {RS_Unsubscribe} x */
	RS_Unsubscribe(x) {
		const cf="RS_Unsubscribe";
		const {responseContext,actions,trackingParams,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.z(actions,x => {
			x;
		});
		this.trackingParams(trackingParams);
		this.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {D_PlaylistVideoThumbnail} x */
	D_PlaylistVideoThumbnail(x) {
		const cf="D_PlaylistVideoThumbnail";
		const {thumbnail,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_Thumbnail(thumbnail);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {DC_LiveChat} x */
	DC_LiveChat(x) {
		const cf="DC_LiveChat";
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
	/** @private @arg {D_Playlist_MD} x */
	D_Playlist_MD(x) {
		const cf="D_Playlist_MD";
		const {title,iosAppindexingLink,androidAppindexingLink,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(title);
		this.a_primitive_str(iosAppindexingLink);
		this.a_primitive_str(androidAppindexingLink);
	}
	/** @private @arg {D_RunAttestation} x */
	D_RunAttestation(x) {
		const cf="D_RunAttestation";
		const {ids,engagementType,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ids,this.D_ExternalChannelId);
		if(engagementType!=="ENGAGEMENT_TYPE_SUBSCRIBE") debugger;
	}
	/** @private @arg {D_ExternalChannelId} x */
	D_ExternalChannelId(x) {
		const cf="D_ExternalChannelId";
		const {externalChannelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(externalChannelId);
	}
	/** @private @arg {D_PdgCommentPreview} x */
	D_PdgCommentPreview(x) {
		const cf="D_PdgCommentPreview";
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
		const cf="D_PdgCommentOption";
		const {commentText,chipRenderer,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(commentText);
		this.R_PdgCommentChip(chipRenderer);
	}
	/** @private @arg {AD_AccountItem} x */
	AD_AccountItem(x) {
		const cf="AD_AccountItem";
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
		const cf="D_InlineSurvey";
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
		const cf="D_RichShelf";
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
		const cf="D_SourcePivotHeader";
		const {headerInformation,buttonRow,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ProfilePageHeaderInformationViewModel(headerInformation);
		this.R_ProfilePageHeaderButtonRowViewModel(buttonRow);
		this.trackingParams(trackingParams);
	}
	/** @arg {D_ProfilePageHeaderInformation} x */
	D_ProfilePageHeaderInformation(x) {
		const cf="D_ProfilePageHeaderInformation";
		const {title,metadata,thumbnail,alignment,onTap,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ProfilePageHeaderTitleViewModel(title);
		this.R_ProfilePageHeaderMetadataViewModel(metadata);
		this.R_ProfilePageHeaderThumbnailViewModel(thumbnail);
		if(alignment!=="a") debugger;
		this.C_Innertube(onTap);
	}
	/** @arg {D_ExpandableSurveyResponse} x */
	D_ExpandableSurveyResponse(x) {
		const cf="D_ExpandableSurveyResponse";
		const {options,submitButton,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_RatingSurvey(options);
		this.R_Button(submitButton);
		this.trackingParams(trackingParams);
	}
	/** @arg {D_RatingSurvey} x */
	D_RatingSurvey(x) {
		const cf="D_ExpandableSurveyResponse";
		const {ratings,trackingParams,notSureButton,undoButton,notSureEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(ratings,this.R_RatingSurveyOption);
		this.trackingParams(trackingParams);
		this.R_Button(notSureButton);
		this.R_Button(undoButton);
		this.g(notSureEndpoint);
	}
	/** @arg {D_RatingSurveyOption} x */
	D_RatingSurveyOption(x) {
		const cf="D_ExpandableSurveyResponse";
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
	/** @arg {S_VideoGoodPutShape} x */
	S_VideoGoodPutShape(x) {
		const cf="S_VideoGoodPutShape";
		const {id,source,range,expire,ip,ms,mm,pl,nh,sparams,signature,key,...y}=this.s(cf,x); this.g(y);
		this.save_b64_binary(`${cf}.id`,id);
		this.save_string(`${cf}.source`,source);
		this.save_string(`${cf}.range`,range);
		let exp=this.parse_number_template(expire);
		this.a_primitive_num(exp);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ms`,ms);
		this.save_string(`${cf}.mm`,mm);
		this.save_string(`${cf}.pl`,pl);
		this.save_b64_binary(`${cf}.nh`,nh);
		switch(sparams) {
			default: this.cg.codegen_case(`${cf}.sparams`,sparams); debugger; break;
			case "id,source,range,expire,ip,ms,mm,pl,nh": break;
		}
		this.parse_signature(signature);
		this.save_string(`${cf}.key`,key);
	}
	/** @override @protected @arg {string} k @arg {number|number[]|Uint8Array} x */
	save_number(k,x) {
		if(x instanceof Uint8Array) x=[...x];
		return super.save_number(k,x);
	}
	/** @private @template {string} A @template {string} B @template {string} C @template {`sn-${A}${B}n${C}`} R @arg {R} x @returns {D_GoogleVideoHostPartition} */
	get_gv_parts(x) {
		let parts=this.get_gv_parts_impl(x);
		return as_any({
			partition: parts[0],
			selector: parts[1],
		});
	}
	/** @private @template {string} A @template {string} B @template {string} C @template {`sn-${A}${B}n${C}`} R @arg {R} x @returns {R extends `sn-${infer A1}${infer A2}n${infer BP extends C}`?[`${A1}${A2}`,BP]:[R]} */
	get_gv_parts_impl(x) {
		let ss=split_string(x,"-")[1];
		let idx=5;
		let r1=ss.slice(0,idx);
		let r2=ss.slice(idx+1);
		/** @type {any} */
		let rt=[r1,r2];
		if(ss[idx]!=="n") debugger;
		return rt;
	}
	/** @private @arg {D_VideoPlaybackShape_S_Params} x */
	D_VideoPlaybackShape_S_Params(x) {
		const cf1="D_VideoPlaybackShape_S_Params",cf2="video_playback.api_url"; cf2;
		const {expire,ei,ip,aitags,id,itag,source,requiressl,ctier,spc,vprv,xtags,mime,ns,cnr,gir,clen,ratebypass,dur,lmt,...y}=this.s(cf1,x); this.g(y);
		this.a_primitive_str(expire);
		this.a_primitive_str(ei);
		this.a_primitive_str(ip);
		aitags&&this.save_string(`${cf1}.aitags`,aitags);
		this.save_b64_binary(`${cf2}.id`,id);
		itag&&this.save_string(`${cf1}.itag`,itag);
		this.save_string(`${cf1}.source`,source);
		this.save_string(`${cf1}.requiressl`,requiressl);
		this.t(ctier,x => this.ceq("SH",x));
		spc&&this.save_b64_binary(`${cf1}.spc`,spc);
		this.save_string(`${cf1}.vprv`,vprv);
		if(xtags) this.save_string(`${cf1}.xtags`,xtags);
		this.save_string(`${cf1}.mime`,mime);
		this.save_b64_binary(`${cf2}.ns`,ns);
		cnr&&this.save_string(`${cf1}.cnr`,cnr);
		if(gir) this.save_string(`${cf1}.gir`,gir);
		this.t(clen,x => {
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		});
		ratebypass&&this.save_string(`${cf1}.ratebypass`,ratebypass);
		let dur_=this.parse_number_template(dur);
		this.a_primitive_num(dur_);
		let lmt_=this.parse_number_template(lmt);
		this.a_primitive_num(lmt_);
	}
	/** @private @arg {D_VideoPlaybackShape_LS_Params} x */
	D_VideoPlaybackShape_LS_Params(x) {
		const cf1="D_VideoPlaybackShape_LS_Params",cf2="video_playback.api_url"; cf2;
		const {mh,mm,mn,ms,mv,mvi,pl,initcwndbps,...y}=this.s(cf1,x); this.g(y);
		this.save_string(`${cf1}.mh`,mh);
		this.save_string(`${cf1}.mm`,mm);
		// cSpell:ignoreRegExp /"sn-(?:(o097zn|9gv7ln|n4v7sn|nx57yn).{2})"/
		let mn_arr=split_string(mn);
		for(let mi of mn_arr) {
			/** @type {D_GoogleVideoHostPartition} */
			let ap=this.get_gv_parts(mi);
			this.D_GoogleVideoHostPartition(cf1,ap);
			switch(ap.partition) {
				default: {
					let {partition: x}=ap;
					let gen=this.cg.codegen_case_cache(`js_gen_case:log_videoplayback:${cf1}.mn.host_partition`,x);
					if(gen.has) break;
					console.log(`-- [js_gen_case:log_videoplayback:${cf1}.mn.host_partition] --\n\n${this.cg.codegen_case_ret(gen)}`);
				}; break;
				case "n4v7s": case "nx57y": case "o097z": case "nx5s7": case "9gv7l":
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
	}
	/** @private @arg {D_VideoPlaybackShape_Other} x */
	D_VideoPlaybackShape_Other(x) {
		const cf1="D_VideoPlaybackShape_Other",cf2="video_playback.api_url";
		const {fvip,keepalive,fexp,c,txp,n,lsig,sig,...y1}=this.s(cf1,x);
		this.save_string(`${cf1}.fvip`,fvip);
		keepalive&&this.save_string(`${cf1}.keepalive`,keepalive);
		this.save_string(`${cf1}.fexp`,fexp);
		this.save_string(`${cf1}.c`,c);
		this.save_string(`${cf1}.txp`,txp);
		this.save_b64_binary(`${cf2}.n`,n);
		this.save_b64_binary(`${cf2}.lsig`,lsig);
		this.t(sig,x => this.save_b64_binary(`${cf2}.sig`,x));
		const {gcr,mt,itag,...y}=y1; this.g(y);
		itag&&this.save_string(`${cf1}.itag`,itag);
		{
			let x=mt;
			let x1=this.parse_number_template(x);
			this.a_primitive_num(x1);
		}
		this.t(gcr,x => this.ceq(x,"ca"));
	}
	/** @private @arg {D_VideoPlaybackShape} x */
	D_VideoPlaybackShape(x) {
		const cf1="D_VideoPlaybackShape";
		const {sparams}=this.s(cf1,x);
		/** @type {{[U in T_Split<typeof sparams>[number]]:D_VideoPlaybackShape[U]}} */
		let obj_sparams=as({});
		let kk_x=this.get_keys_of(x);
		let idx=kk_x.indexOf("sparams");
		kk_x.splice(idx,1);
		let kk_sparams=this.split_str(sparams);
		/** @template T @arg {T} trg @arg {T} src @arg {keyof T} k */
		function set_obj(trg,src,k) {
			trg[k]=src[k];
		}
		/** @type {any} */
		let xa=x;
		/** @type {typeof obj_sparams} */
		let xt=xa;
		for(let k of kk_sparams) {
			set_obj(obj_sparams,xt,k);
			let idx=kk_x.indexOf(k);
			kk_x.splice(idx,1);
		}
		this.D_VideoPlaybackShape_S_Params(obj_sparams);
		const {lsparams}=x;
		idx=kk_x.indexOf("lsparams");
		kk_x.splice(idx,1);
		let kk_lsparams=this.split_str(lsparams);
		/** @type {{[U in T_Split<typeof lsparams>[number]]:D_VideoPlaybackShape[U]}} */
		let obj_lsparams=as({});
		/** @type {typeof obj_lsparams} */
		let xt1=xa;
		for(let k of kk_lsparams) {
			set_obj(obj_lsparams,xt1,k);
			let idx=kk_x.indexOf(k);
			kk_x.splice(idx,1);
		}
		/** @typedef {"sparams"|"lsparams"|keyof D_VideoPlaybackShape_S_Params|keyof D_VideoPlaybackShape_LS_Params} OmitY1Keys */
		/** @type {Omit<typeof x,OmitY1Keys>} */
		let y1=as({});
		/** @type {Exclude<(typeof kk_x)[number],OmitY1Keys>[]} */
		let kk_y1=as(kk_x);
		for(let k of kk_y1) {
			set_obj(y1,x,k);
		}
		this.save_string(`${cf1}.sparams`,sparams);
		this.save_string(`${cf1}.lsparams`,lsparams);
		this.D_VideoPlaybackShape_LS_Params(obj_lsparams);
		this.D_VideoPlaybackShape_Other(y1);
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
	/** @private @arg {D_PdgCommentChip} x */
	D_PdgCommentChip(x) {
		const cf="D_PdgCommentChip";
		const {chipText,chipColorPalette,chipIcon,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.G_Text(chipText);
		this.D_ChipColorPalette(chipColorPalette);
		if(chipIcon.iconType!=="FILL_DOLLAR_SIGN_HEART_12") debugger;
		this.trackingParams(trackingParams);
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
	/** @protected @arg {Extract<D_ToggleButton,{defaultServiceEndpoint:any}>["defaultServiceEndpoint"]} x */
	D_Button_DefServiceEP(x) {
		const cf="D_Button_DefServiceEP";
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("repeatChapterCommand" in x) return this.C_RepeatChapter(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("performCommentActionEndpoint" in x) return this.E_PerformCommentAction(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @protected @arg {Extract<D_ToggleButton,{toggledServiceEndpoint:any}>["toggledServiceEndpoint"]} x */
	D_Button_ToggledServiceEP(x) {
		const cf="D_Button_ToggledServiceEP";
		if("likeEndpoint" in x) return this.E_Like(x);
		if("commandExecutorCommand" in x) return this.C_CommandExecutor(x);
		if("signalServiceEndpoint" in x) return this.E_SignalService_SendPost(x);
		if("performCommentActionEndpoint" in x) return;
		x===""; this.codegen_typedef(cf,x);
	}
	/** @arg {string} cf @arg {string} sig_str */
	validate_sig(cf,sig_str) {
		if(sig_str.match(/^[0-9A-F]+$/)===null) debugger;
		this.save_number(cf,sig_str.length);
		switch(sig_str.length) {
			default: debugger; break;
			case 38: case 40:
		}
	}
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		this.validate_sig("sig.0",sig_0);
		this.validate_sig("sig.1",sig_1);
	}
	/** @public @arg {D_PlayerConfig} x */
	D_PlayerConfig(x) {
		const cf="D_PlayerConfig";
		const {audioConfig,playbackStartConfig,streamSelectionConfig,mediaCommonConfig,webPlayerConfig,...y}=this.s(cf,x); this.g(y);
		this.D_AudioConfig(audioConfig);
		this.t(playbackStartConfig,this.D_StartSeconds);
		this.D_StreamSelectionConfig(streamSelectionConfig);
		this.R_DynamicReadaheadConfig(mediaCommonConfig);
		this.D_WebPlayerConfig(webPlayerConfig);
	}
	/** @public @arg {D_VideoDetails} x */
	D_VideoDetails(x) {
		const cf="D_VideoDetails";
		const {videoId,title,lengthSeconds,keywords,channelId,isOwnerViewing,shortDescription,isCrawlable,thumbnail,allowRatings,viewCount,author,isLowLatencyLiveStream,isPrivate,isUnpluggedCorpus,latencyClass,isLiveContent,...y}=this.s(cf,x); this.g(y);
		this.videoId(videoId);
		this.a_primitive_str(title);
		let num=this.parse_number_template(lengthSeconds);
		this.a_primitive_num(num);
		this.tz(keywords,this.a_primitive_str);
		this.channelId(channelId);
		this.a_primitive_bool(isOwnerViewing);
		this.ceq(isOwnerViewing,false);
		this.a_primitive_str(shortDescription);
		this.ceq(isCrawlable,true);
		this.D_Thumbnail(thumbnail);
		this.a_primitive_bool(allowRatings);
		this.t(viewCount,x => {
			let num=this.parse_number_template(x);
			this.a_primitive_num(num);
		});
		this.a_primitive_str(author);
		this.ceq(isPrivate,false);
		this.ceq(isUnpluggedCorpus,false);
		this.ceq(isLiveContent,false);
	}
	/** @public @arg {D_StartSeconds} x */
	D_StartSeconds(x) {this.y("D_StartSeconds","startSeconds",x,this.a_primitive_num);}
	/** @public @arg {D_StreamSelectionConfig} x */
	D_StreamSelectionConfig(x) {this.y("D_StreamSelectionConfig","maxBitrate",x,x => this.a_primitive_num(this.parse_number_template(x)));}
	/** @public @arg {R_PlaylistHeader} x */
	R_PlaylistHeader(x) {this.H_("playlistHeaderRenderer",x,this.D_PlaylistHeader);}
	/** @private @arg {D_PlaylistHeader} x */
	D_PlaylistHeader(x) {
		const cf="D_PlaylistHeader";
		const {playButton,playlistHeaderBanner,playlistId,privacy,shufflePlayButton,trackingParams,editableDetails,editorEndpoint,isEditable,ownerEndpoint,serviceEndpoints,moreActionsMenu,title,numVideosText,descriptionTapText,descriptionText,onDescriptionTap,shareData,stats,briefStats,byline,ownerText,viewCountText,cinematicContainer,...y}=this.s(cf,x);
		this.R_Button(playButton);
		this.R_HeroPlaylistThumbnail(playlistHeaderBanner);
		this.playlistId(playlistId);
		this.save_string(`${cf}.privacy`,privacy);
		this.R_Button(shufflePlayButton);
		this.trackingParams(trackingParams);
		this.D_EditableDetails(editableDetails);
		this.t(editorEndpoint,this.E_PlaylistEditor);
		this.a_primitive_bool(isEditable);
		this.E_VE3611(ownerEndpoint);
		this.z(serviceEndpoints,x => {
			if("playlistEditEndpoint" in x) return this.E_PlaylistEdit(x);
			if("deletePlaylistEndpoint" in x) return this.E_PlaylistDelete(x);
			this.codegen_typedef("EF_PlaylistHeader",x,false);
		});
		this.R_Menu(moreActionsMenu);
		this.G_Text(title);
		this.G_Text(numVideosText);
		this.t(descriptionTapText,this.G_Text);
		this.g(descriptionText);
		this.TA_OpenPopup(`${cf}.onDescriptionTap`,onDescriptionTap);
		this.D_CanShare(shareData);
		this.z(stats,this.G_Text);
		this.z(briefStats,this.G_Text);
		this.z(byline,this.R_PlaylistByline);
		this.G_Text(ownerText);
		this.G_Text(viewCountText);
		this.R_CinematicContainer(cinematicContainer);
		const {shareButton,titleForm,descriptionForm,privacyForm,...y1}=y; this.g(y1);
		this.t(shareButton,this.R_Button);
		this.t(titleForm,this.R_InlineForm);
		this.t(descriptionForm,this.R_InlineForm);
		this.t(privacyForm,this.R_DropdownFormField);
	}
	/** @public @arg {R_InlineForm} x */
	R_InlineForm(x) {x;}
	/** @public @arg {R_DropdownFormField} x */
	R_DropdownFormField(x) {x;}
	//#region binary
	/** @public @arg {BinaryVe} x */
	BinaryVe(x) {
		switch(x) {
			default: x; debugger; break;
			case 3832:
			case 3854:
			case 5754: break;
		}
	}
	/** @protected @arg {RB_Obj_f19} x @name V_VeDescObj */
	RB_Obj_f19(x) {
		const cf="R_Obj_f19";
		if(2 in x&&!(3 in x)&&!(1 in x)) {
			const {2: [,f2],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.f2.BinaryVe@base`,f2);
			return;
		}
		if(1 in x) {
			const {1: [,f1],2: [,f2],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.f1`,f1);
			this.save_number(`${cf}.f2.BinaryVe@f1`,f2);
			this.BinaryVe(f2);
			return;
		}
		if(3 in x) {
			const {2: [,f2],3: [,f3],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.f2.BinaryVe@f3`,f2);
			this.BinaryVe(f2);
			this.save_number(`${cf}.f3`,f3);
			return;
		}
		this.codegen_typedef_bin(cf,x,false);
	}
	/** @protected @arg {P_tracking_params} x */
	P_tracking_params(x) {const cf="P_tracking_params"; this.k(cf,x);}
	/** @protected @template T @arg {T_VW_2<T>} x @template U @arg {(this:this,x:T)=>U} f */
	T_VW_2(x,f) {
		if(x[0]!=="child") {debugger; return null;}
		return f.call(this,x[2]);
	}
	/** @protected @arg {Extract<RB_TrackingObj,{16:any}>[16]} x */
	RB_TrackingObj_f16(x) {x;}
	/** @protected @arg {Extract<RB_TrackingObj,{1:any}>} x */
	RB_TrackingObj_t1(x) {
		const cf="RB_TrackingObj_t1";
		if(1 in x) {
			const {1: [,f1]}=x;
			this.save_number(`${cf}.f1`,f1);
		}
		if(19 in x) {
			if(11 in x) {
				const {1: [,f1],2: [,f2],4: [,,f4],3: f3,6: f6,11: f11,19: [t19,,f19],...y}=this.s(cf,x); this.g(y);
				this.save_number(`${cf}.w19.f1`,f1);
				this.save_number(`${cf}.w19.f2`,f2);
				this.t(f3,([t,x]) => this.ceq(t,"data32")&&this.save_number(`${cf}.w19.f3`,x));
				this.V_BinaryTimestamp(f4);
				if(t19!=="child") debugger;
				this.RB_Obj_f19(f19);
				return;
			}
			if(9 in x&&6 in x&&3 in x) {
				const {1: [,f1],2: [,f2],3: [,f3],4: [,,f4],6: f6,9: [,,f9],19: [t19,,f19],...y}=this.s(cf,x); this.g(y);
				this.save_number(`${cf}.w19.f1`,f1);
				this.save_number(`${cf}.w19.f2`,f2);
				this.save_number(`${cf}.w19.f3`,f3);
				this.V_BinaryTimestamp(f4);
				this.a_primitive_bigint(f9);
				if(t19!=="child") debugger;
				this.RB_Obj_f19(f19);
				return;
			}
			if(9 in x) {
				const {1: [,f1],2: [,f2],4: [,,f4],6: f6,9: [,,f9],19: [t19,,f19],...y}=this.s(cf,x); this.g(y);
				this.save_number(`${cf}.w19.f1`,f1);
				this.save_number(`${cf}.w19.f2`,f2);
				this.V_BinaryTimestamp(f4);
				this.a_primitive_bigint(f9);
				if(t19!=="child") debugger;
				this.RB_Obj_f19(f19);
				return;
			}
			return;
		}
		if(16 in x) {
			const {1: [,f1],2: [,f2],4: [,,f4],16: f16,...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.n3.f1`,f1);
			this.save_number(`${cf}.n3.f2`,f2);
			this.V_BinaryTimestamp(f4);
			this.RB_TrackingObj_f16(f16);
			return;
		}
		if(9 in x) {
			const {1: [,f1],2: [,f2],3: [,f3],4: [,,f4],9: [,,f9],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.w9.f1`,f1);
			this.save_number(`${cf}.w9.f2`,f2);
			this.save_number(`${cf}.w9.f3`,f3);
			this.V_BinaryTimestamp(f4);
			this.a_primitive_bigint(f9);
			return;
		}
		if(8 in x) {
			const {1: [,f1],2: [,f2],3: [,f3],4: [,,f4],8: f8,...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.w3.f1`,f1);
			this.save_number(`${cf}.w9.f2`,f2);
			this.save_number(`${cf}.w3.f3`,f3);
			this.V_BinaryTimestamp(f4);
			return;
		}
		if(6 in x&&3 in x) {
			const {1: [,f1],2: [,f2],3: f3,4: [,,f4],6: [t1,[t2,f6]],7: m7,...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.w6.f1`,f1);
			this.save_number(`${cf}.w6.f2`,f2);
			this.V_BinaryTimestamp(f4);
			this.save_string(`${cf}.w6.f6.type`,`${t1}:${t2}`);
			this.save_string(`${cf}.w6.f6`,f6);
			this.t(m7,x => {
				const [,[,f7]]=x;
				this.save_b64_binary(`${cf}.f7`,f7);
			});
			return;
		}
		if(6 in x) {
			const {1: [,f1],2: [,f2],4: [,,f4],6: [t1,[t2,f6]],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.w6.f1`,f1);
			this.save_number(`${cf}.w6.f2`,f2);
			this.V_BinaryTimestamp(f4);
			this.save_string(`${cf}.w6.f6.type`,`${t1}:${t2}`);
			this.save_string(`${cf}.w6.f6`,f6);
			return;
		}
		if(1 in x&&2 in x&&!(3 in x)&&4 in x) {
			const {1: [,f1],2: [,f2],4: [,,f4],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.n3.f1`,f1);
			this.save_number(`${cf}.n3.f2`,f2);
			this.V_BinaryTimestamp(f4);
			return;
		}
		if(3 in x) {
			const {1: [,f1],2: [,f2],3: [,f3],4: [,,f4],...y}=this.s(cf,x); this.g(y);
			this.save_number(`${cf}.w3.f1`,f1);
			this.save_number(`${cf}.w9.f2`,f2);
			this.save_number(`${cf}.w3.f3`,f3);
			this.V_BinaryTimestamp(f4);
			return;
		}
		x;
		debugger;
	}
	/** @protected @arg {RB_TrackingObj} x @arg {{type:"tracking"|"click_tracking"}} flags */
	RB_TrackingObj(x,flags) {
		/** @type {`RB_TrackingObj:${typeof flags["type"]}`} */
		const cf=`RB_TrackingObj:${flags.type}`;
		if(1 in x) return this.RB_TrackingObj_t1(x);
		const {4: [,,f4],...u}=this.s(cf,x);
		this.V_BinaryTimestamp(f4);
		if(6 in u) {
			const {6: [ty,[ty2,f6]],...y}=u; this.g(y);
			if(ty!=="raw") debugger;
			if(ty2!=="string") debugger;
			if(f6!=="external") debugger;
			return;
		}
		this.g(u);
	}
	/** @template {number} T @arg {T} t @arg {{1:T_D32<number>}} x @returns {x is {1:T_D32<T>}} */
	is_tp_xx(x,t) {return x[1][1]===t;}
	/** @template {number} T @arg {T} t @arg {{2:T_D32<number>}} x @returns {x is {2:T_D32<T>}} */
	is_tp_xx_2(x,t) {return x[2][1]===t;}
	/** @private @arg {V_BinaryTimestamp} x */
	V_BinaryTimestamp(x) {
		const cf="V_BinaryTimestamp";
		const {1: [,f1],2: [,f2],3: [,f3],...y}=this.s(cf,x); this.g(y);
		if(typeof f1!=="number") debugger;
		if(typeof f2==="number"&&f2>0b1010111011010101010000001011) {
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f2] --\n\n[0b${(f2).toString(2)}]`);
		}
		if(typeof f3==="number"&&f3>0b11111111000011111010011111000000) {
			console.log(`-- [max_gen:V_BinaryTimestamp_gen:f3] --\n\n[0b${(f3).toString(2)}]`);
		}
	}
	/** @private @arg {P_ParamParse} cf @arg {V_ParamObj_2} x */
	decode_binary_object_log_info(cf,x) {
		this.continuation_logged_str.push(cf);
		const n_cf=`P_${cf.replaceAll(".","_")}`;
		this.codegen_typedef_bin(n_cf,x,false);
		let str_arr=[""];
		/** @arg {string} code */
		function ap(code) {str_arr.push(`${"\t".repeat(pad)}${code}`);}
		let pad=1;
		ap(`case "${cf}": {`);
		pad+=1;
		ap(`/** @type {${n_cf}} */`);
		ap("let u=as_any(x);");
		ap(`this.${n_cf}(u);`);
		pad-=1;
		ap(`} break;`);
		console.log(`-- [binary_gen_case:${cf}] --\n${str_arr.join("\n")}`);
		console.log(`-- [binary_gen_function:${cf}] --\n\n/** @private @arg {${n_cf}} x */\n${n_cf}(x) {x;}`);
	}
	/** @private @arg {P_ParamParse} cf @arg {V_ParamObj_2} x */
	binary_result(cf,x) {
		switch(cf) {
			case "reel.player_params": {
				/** @type {P_reel_player_params} */
				let u=as_any(x);
				this.P_reel_player_params(u);
			} break;
			case "create_playlist.params": {
				/** @type {P_create_playlist_params} */
				let u=as_any(x);
				this.P_create_playlist_params(u);
			} break;
			case "continuation_request.browse.token": {
				/** @type {P_continuation_request_browse_token} */
				let u=as_any(x);
				this.P_continuation_request_browse_token(u);
			} break;
			case "ad_slot_logging_data.serialized_slot_ad_serving_data_entry": {
				/** @type {P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry} */
				let u=as_any(x);
				this.P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry(u);
			} break;
			case "ad_layout.ad_serving_data_entry": {
				/** @type {P_ad_layout_ad_serving_data_entry} */
				let u=as_any(x);
				this.P_ad_layout_ad_serving_data_entry(u);
			} break;
			case "params.click_tracking": {
				/** @type {RB_TrackingObj} */
				let u=as_any(x);
				this.RB_TrackingObj(u,{type: "click_tracking"});
			} break;
			case "params.tracking": {
				/** @type {P_tracking_params} */
				let u=as_any(x);
				this.RB_TrackingObj(u,{type: "tracking"});
			} break;
			case "reel.params": {
				/** @type {P_reel_params} */
				let u=as_any(x);
				this.P_reel_params(u);
			} break;
			case "logging_context.serialized_context_data": {
				/** @type {P_logging_context_serialized_context_data} */
				let u=as_any(x);
				this.P_logging_context_serialized_context_data(u);
			} break;
			case "like.params": {
				/** @type {P_like_params} */
				let u=as_any(x);
				this.P_like_params(u);
			} break;
			case "playability_status.context_params": {
				/** @type {P_playability_status_context_params} */
				let u=as_any(x);
				this.P_playability_status_context_params(u);
			} break;
			case "entity.key": {
				/** @type {P_entity_key} */
				let u=as_any(x);
				this.P_entity_key(u);
			} break;
			case "remove_like.params": {
				/** @type {P_remove_like_params} */
				let u=as_any(x);
				this.P_remove_like_params(u);
			} break;
			case "dislike.params": {
				/** @type {P_dislike_params} */
				let u=as_any(x);
				this.P_dislike_params(u);
			} break;
			case "subscribe_button.entity_key": {
				/** @type {P_subscribe_button_entity_key} */
				let u=as_any(x);
				this.P_subscribe_button_entity_key(u);
			} break;
			case "subscribe.params": {
				/** @type {P_subscribe_params} */
				let u=as_any(x);
				this.P_subscribe_params(u);
			} break;
			case "unsubscribe.params": {
				/** @type {P_unsubscribe_params} */
				let u=as_any(x);
				this.P_unsubscribe_params(u);
			} break;
			case "continuation_request.watch_next.token": {
				/** @type {P_continuation_request_watch_next_token} */
				let u=as_any(x);
				this.P_continuation_request_watch_next_token(u);
			} break;
			case "entity_key.normal": {
				/** @type {P_entity_key_normal} */
				let u=as_any(x);
				this.P_entity_key_normal(u);
			} break;
			case "watch_playlist.params": {
				/** @type {P_watch_playlist_params} */
				let u=as_any(x);
				this.P_watch_playlist_params(u);
			} break;
			case "playlist_loop_state.entity.key": {
				/** @type {P_playlist_loop_state_entity_key} */
				let u=as_any(x);
				this.P_playlist_loop_state_entity_key(u);
			} break;
			case "load_markers.entity_key": {
				/** @type {P_load_markers_entity_key} */
				let u=as_any(x);
				this.P_load_markers_entity_key(u);
			} break;
			case "create_backstage_post.params": {
				/** @type {P_create_backstage_post_params} */
				let u=as_any(x);
				this.P_create_backstage_post_params(u);
			} break;
			case "subscription_state.key": {
				/** @type {P_subscription_state_key} */
				let u=as_any(x);
				this.P_subscription_state_key(u);
			} break;
			case "shorts.source.bp": {
				/** @type {P_shorts_source_bp} */
				let u=as_any(x);
				this.P_shorts_source_bp(u);
			} break;
			case "get_transcript.params": {
				/** @type {P_get_transcript_params} */
				let u=as_any(x);
				this.P_get_transcript_params(u);
			} break;
			case "transcript_track_selection.entity.key": {
				/** @type {P_transcript_track_selection_entity_key} */
				let u=as_any(x);
				this.P_transcript_track_selection_entity_key(u);
			} break;
			case "transcript_track_selection.serialized_params": {
				/** @type {P_transcript_track_selection_serialized_params} */
				let u=as_any(x);
				this.P_transcript_track_selection_serialized_params(u);
			} break;
			case "continuation_request.reel_watch_sequence.token": {
				/** @type {P_continuation_request_reel_watch_sequence_token} */
				let u=as_any(x);
				this.P_continuation_request_reel_watch_sequence_token(u);
			} break;
			case "reel.sequence_params": {
				/** @type {P_reel_sequence_params} */
				let u=as_any(x);
				this.P_reel_sequence_params(u);
			} break;
			case "get_pdg_buy_flow.params": {
				/** @type {P_get_pdg_buy_flow_params} */
				let u=as_any(x);
				this.P_get_pdg_buy_flow_params(u);
			} break;
			case "continuation.params": {
				/** @type {P_continuation_params} */
				let u=as_any(x);
				this.P_continuation_params(u);
			} break;
			case "create_comment.params": {
				/** @type {P_create_comment_params} */
				let u=as_any(x);
				this.P_create_comment_params(u);
			} break;
			case "aadc_guidelines_state.entity_key": {
				/** @type {P_aadc_guidelines_state_entity_key} */
				let u=as_any(x);
				this.P_aadc_guidelines_state_entity_key(u);
			} break;
			default: {
				if(this.continuation_logged_str.includes(cf)) break;
				this.decode_binary_object_log_info(cf,x);
				debugger;
			} break;
		}
	}
	/** @private @arg {P_aadc_guidelines_state_entity_key} x */
	P_aadc_guidelines_state_entity_key(x) {x;}
	/** @private @arg {P_create_comment_params} x */
	P_create_comment_params(x) {x;}
	/** @private @arg {P_continuation_params} x */
	P_continuation_params(x) {x;}
	/** @private @arg {P_get_pdg_buy_flow_params} x */
	P_get_pdg_buy_flow_params(x) {x;}
	/** @private @arg {P_reel_sequence_params} x */
	P_reel_sequence_params(x) {x;}
	/** @private @arg {P_continuation_request_reel_watch_sequence_token} x */
	P_continuation_request_reel_watch_sequence_token(x) {x;}
	/** @private @arg {P_transcript_track_selection_serialized_params} x */
	P_transcript_track_selection_serialized_params(x) {x;}
	/** @private @arg {P_transcript_track_selection_entity_key} x */
	P_transcript_track_selection_entity_key(x) {x;}
	/** @private @arg {P_get_transcript_params} x */
	P_get_transcript_params(x) {x;}
	/** @private @arg {P_shorts_source_bp} x */
	P_shorts_source_bp(x) {x;}
	/** @private @arg {P_subscription_state_key} x */
	P_subscription_state_key(x) {x;}
	/** @private @arg {P_create_backstage_post_params} x */
	P_create_backstage_post_params(x) {x;}
	/** @private @arg {P_load_markers_entity_key} x */
	P_load_markers_entity_key(x) {x;}
	/** @private @arg {P_watch_playlist_params} x */
	P_watch_playlist_params(x) {x;}
	/** @private @arg {P_playlist_loop_state_entity_key} x */
	P_playlist_loop_state_entity_key(x) {x;}
	/** @private @arg {P_entity_key_normal} x */
	P_entity_key_normal(x) {x;}
	/** @private @arg {P_continuation_request_watch_next_token} x */
	P_continuation_request_watch_next_token(x) {x;}
	/** @private @arg {P_unsubscribe_params} x */
	P_unsubscribe_params(x) {x;}
	/** @private @arg {P_subscribe_params} x */
	P_subscribe_params(x) {x;}
	/** @private @arg {P_subscribe_button_entity_key} x */
	P_subscribe_button_entity_key(x) {x;}
	/** @private @arg {P_dislike_params} x */
	P_dislike_params(x) {x;}
	/** @private @arg {P_remove_like_params} x */
	P_remove_like_params(x) {x;}
	/** @private @arg {P_entity_key} x */
	P_entity_key(x) {x;}
	/** @private @arg {P_playability_status_context_params} x */
	P_playability_status_context_params(x) {x;}
	/** @private @arg {P_like_params} x */
	P_like_params(x) {x;}
	/** @private @arg {P_logging_context_serialized_context_data} x */
	P_logging_context_serialized_context_data(x) {x;}
	/** @private @arg {P_reel_params} x */
	P_reel_params(x) {x;}
	/** @private @arg {P_ad_layout_ad_serving_data_entry} x */
	P_ad_layout_ad_serving_data_entry(x) {x;}
	/** @private @arg {P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry} x */
	P_ad_slot_logging_data_serialized_slot_ad_serving_data_entry(x) {x;}
	/** @private @arg {P_continuation_request_browse_token} x */
	P_continuation_request_browse_token(x) {x;}
	/** @private @arg {P_create_playlist_params} x */
	P_create_playlist_params(x) {x;}
	/** @private @arg {P_reel_player_params} x */
	P_reel_player_params(x) {x;}
	//#endregion binary
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
