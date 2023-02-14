// ==UserScript==
// @name	YTPlugin Support Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.1
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support.user.js
// ==/UserScript==
const __module_name__="mod$SupportService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
const ServiceMethods=required(store["mod$ServiceMethods"]).ServiceMethods;
const split_string_once=bs.split_string_once;
class TypedefGenerator extends ServiceMethods {
	/** @arg {D_TypedefGenerator_Popup} x */
	D_TypedefGenerator_Popup(x) {
		const cf="popup_dialog"; cf; this.k(cf,x);
		let x1=this.unpack_popup_dialog(x);
		if(!x1[0]) {debugger; return null;}
		let dialog=x1[1];
		return this.D_TypedefGenerator_Popup_R(dialog);
	}
	/** @arg {D_TypedefGenerator_Popup_R} x */
	D_TypedefGenerator_Popup_R(x) {
		const cf="R_ConfirmDialog"; cf; this.k(cf,x);
		if("confirmDialogRenderer" in x) return "TYPE::Popup_ConfirmDialog";
		if("fancyDismissibleDialogRenderer" in x) return "TYPE::Popup_DismissibleDialog";
		return null;
	}
}
class HandleRS extends ServiceMethods {
	//#region dup
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		if(sig_0.match(/^[0-9A-F]+$/)===null) debugger; if(sig_0.length!==40) debugger;
		if(sig_1.match(/^[0-9A-F]+$/)===null) debugger; if(sig_1.length!==40) debugger;
	}
	/** @private @arg {DR_DC_EntityBatchUpdate} x */
	DR_DC_EntityBatchUpdate(x) {this.x.get("handle_types").DR_DC_EntityBatchUpdate(x);}
	/** @private @arg {D_FrameworkUpdates} x */
	D_FrameworkUpdates(x) {
		const cf="D_FrameworkUpdates"; this.k(cf,x);
		const {entityBatchUpdate,elementUpdate,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DR_DC_EntityBatchUpdate(entityBatchUpdate);
		this.t(elementUpdate,this.R_ElementUpdate);
	}
	/** @private @arg {R_ElementUpdate} x */
	R_ElementUpdate(x) {this.H_("ElementUpdate","updates",x,x => this.z(x,this.D_ElementUpdate));}
	/** @private @arg {D_ElementUpdate} x */
	D_ElementUpdate(x) {
		const cls_=this.x.get("handle_types");
		const cf="D_ElementUpdate"; this.k(cf,x);
		if("templateUpdate" in x) return cls_.R_TemplateUpdate(x);
		if("resourceStatusInResponseCheck" in x) return cls_.R_ResourceStatusInResponseCheck(x);
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_Cache_MD} x */
	D_Cache_MD(x) {
		const cf="CacheMetadata"; this.k(cf,x);
		const {isCacheHit,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(!isCacheHit) debugger;
	}
	//#endregion
	/** @public @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player";
		const {responseContext: {},playabilityStatus,streamingData,heartbeatParams,playerAds,playbackTracking,videoDetails,playerConfig,storyboards,microformat,cards,trackingParams,attestation,videoQualityPromoSupportedRenderers,captions,adPlacements,frameworkUpdates,endscreen,paidContentOverlay,annotations,cacheMetadata,...y}=this.s(cf,x); this.g(y);
		this.D_PlayabilityStatus(playabilityStatus);
		this.t(streamingData,this.DD_Streaming);
		heartbeatParams;
		this.t(heartbeatParams,this.D_HeartbeatParams);
		this.tz(playerAds,this.R_DesktopWatchAds);
		this.t(playbackTracking,this.D_PlaybackTracking);
		this.t(videoDetails,this.D_VideoDetails);
		this.t(playerConfig,this.D_PlayerConfig);
		this.t(storyboards,this.G_PlayerStoryboards);
		this.t(microformat,this.R_PlayerMicroformat);
		this.t(cards,this.R_CardCollection);
		this.trackingParams(cf,trackingParams);
		this.t(attestation,this.R_PlayerAttestation);
		this.t(videoQualityPromoSupportedRenderers,this.R_VideoQualityPromo);
		this.t(captions,this.R_PlayerCaptionsTracklist);
		this.tz(adPlacements,x => {
			if("adPlacementRenderer" in x) return this.R_AdPlacement(x);
			let ka=this.get_keys_of(x);
			if(ka.length!==0) debugger;
		});
		this.t(frameworkUpdates,this.D_FrameworkUpdates);
		this.t(endscreen,this.R_Endscreen);
		this.t(paidContentOverlay,this.g);
		this.tz(annotations,x => {
			if(!x.playerAnnotationsExpandedRenderer) debugger;
			this.R_PlayerAnnotationsExpanded(x);
		});
		this.t(cacheMetadata,this.D_Cache_MD);
	}
	/** @public @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @private @arg {DE_Unsubscribe} x */
	DE_Unsubscribe(x) {
		const cf="DE_Unsubscribe";
		const {channelIds,params,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(channelIds,this.D_ChannelId);
		this.params(cf,"unsubscribe.params",params);
	}
	/** @private @arg {GM_YpcGetOffers} x */
	GM_YpcGetOffers(x) {this.T_GM("GM_YpcGetOffers",x,x => this.ceq(x,"/youtubei/v1/ypc/get_offers"));}
	/** @private @arg {GM_CreateComment} x */
	GM_CreateComment(x) {this.T_GM("GM_CreateComment",x,x => this.ceq(x,"/youtubei/v1/comment/create_comment"));}
	/** @private @arg {M_YpcGetOffers} x */
	M_YpcGetOffers(x) {this.T_WCM("M_YpcGetOffers",x,this.GM_YpcGetOffers);}
	/** @private @arg {M_CreateComment} x */
	M_CreateComment(x) {this.T_WCM("M_CreateComment",x,this.GM_CreateComment);}
	/** @private @arg {M_Unsubscribe} x */
	M_Unsubscribe(x) {this.T_WCM("M_Unsubscribe",x,this.GM_Unsubscribe);}
	/** @private @arg {R_EndscreenElement} x */
	R_EndscreenElement(x) {this.H_("R_EndscreenElement","endscreenElementRenderer",x,this.D_EndscreenElement);}
	/** @private @arg {R_InstreamVideoAd} x */
	R_InstreamVideoAd(x) {this.H_("R_InstreamVideoAd","instreamVideoAdRenderer",x,this.D_InstreamVideoAd);}
	/** @private @arg {R_AdActionInterstitial} x */
	R_AdActionInterstitial(x) {this.H_("R_AdActionInterstitial","adActionInterstitialRenderer",x,this.g);}
	/** @private @arg {DE_CreateComment} x */
	DE_CreateComment(x) {this.TD_Params("DE_CreateComment","createCommentParams","create_comment.params",x);}
	/** @private @arg {E_Unsubscribe} x */
	E_Unsubscribe(x) {const [a,b,y]=this.TE_Endpoint_3("E_Unsubscribe","unsubscribeEndpoint",x); this.g(y); this.DE_Unsubscribe(b); this.M_Unsubscribe(a);}
	/** @private @arg {E_CreateComment} x */
	E_CreateComment(x) {const [a,b,y]=this.TE_Endpoint_3("E_CreateComment","createCommentEndpoint",x); this.g(y); this.DE_CreateComment(b); this.M_CreateComment(a);}
	/** @private @arg {R_ClientForecastingAd} x */
	R_ClientForecastingAd(x) {this.H_("R_ClientForecastingAd","clientForecastingAdRenderer",x,this.D_ClientForecastingAd);}
	/** @private @arg {R_LinearAdSequence} x */
	R_LinearAdSequence(x) {this.H_("R_LinearAdSequence","linearAdSequenceRenderer",x,this.D_LinearAdSequence);}
	/** @private @arg {R_AdPlacementConfig} x */
	R_AdPlacementConfig(x) {this.H_("R_AdPlacementConfig","adPlacementConfig",x,this.D_AdPlacementConfig);}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("R_PlayerAnnotationsExpanded","playerAnnotationsExpandedRenderer",x,this.D_PlayerAnnotationsExpanded);}
	/** @private @arg {R_Miniplayer} x */
	R_Miniplayer(x) {this.H_("R_Miniplayer","miniplayerRenderer",x,this.D_Miniplayer);}
	/** @private @arg {R_DesktopWatchAds} x */
	R_DesktopWatchAds(x) {this.H_("R_DesktopWatchAds","playerLegacyDesktopWatchAdsRenderer",x,this.D_DesktopWatchAds);}
	/** @private @arg {R_PlayerCaptionsTracklist} x */
	R_PlayerCaptionsTracklist(x) {this.H_("R_Miniplayer","playerCaptionsTracklistRenderer",x,this.D_PlayerCaptionsTracklist);}
	/** @private @arg {R_VideoQualityPromo} x */
	R_VideoQualityPromo(x) {this.H_("R_Miniplayer","videoQualityPromoRenderer",x,this.D_VideoQualityPromo);}
	/** @private @arg {R_PlayerAttestation} x */
	R_PlayerAttestation(x) {this.H_("R_Miniplayer","playerAttestationRenderer",x,this.D_PlayerAttestation);}
	/** @private @arg {R_CardCollection} x */
	R_CardCollection(x) {this.H_("R_Miniplayer","cardCollectionRenderer",x,this.D_CardCollection);}
	/** @private @arg {R_PlayerMicroformat} x */
	R_PlayerMicroformat(x) {this.H_("R_Miniplayer","playerMicroformatRenderer",x,this.D_PlayerMicroformat);}
	/** @private @arg {R_AdPlacement} x */
	R_AdPlacement(x) {this.H_("R_Miniplayer","adPlacementRenderer",x,this.D_AdPlacement);}
	/** @private @arg {R_Endscreen} x */
	R_Endscreen(x) {this.H_("R_Endscreen","endscreenRenderer",x,this.D_Endscreen);}
	/** @public @arg {R_Button} x */
	R_Button(x) {this.H_("R_Button","buttonRenderer",x,this.D_Button);}
	/** @private @arg {G_PlayerStoryboards} x */
	G_PlayerStoryboards(x) {
		const cf="G_PlayerStoryboards"; this.k(cf,x);
		if("playerStoryboardSpecRenderer" in x) return;
		if("playerLiveStoryboardSpecRenderer" in x) return;
		this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch"; const ht=this.x.get("handle_types");
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=ht.s(cf,x); this.g(y);/*#destructure_done*/
		ht.RC_ResponseContext(responseContext);
		ht.R_TwoColumnWatchNextResults(contents);
		ht.E_Watch(currentVideoEndpoint);
		ht.trackingParams(cf,trackingParams);
		ht.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => ht.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,x => ht.R_EngagementPanelSectionList(x));
		ht.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,x => ht.R_CinematicContainer(x));
		ht.D_FrameworkUpdates(frameworkUpdates);
	}
	/** @private @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cls_=this.x.get("handle_types");
		const cf="R_WatchPage_VE3832"; this.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,...y}=cls_.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==3832) debugger;
		let wp_params=cls_.parse_watch_page_url(cf,url);
		this.save_keys(`VE3832.${cf}.wp_params`,wp_params);
		cls_.E_Watch(endpoint);
		if(preconnect!==void 0) cls_.parse_preconnect_arr(preconnect);
		this.RS_Player(playerResponse);
		this.RS_Watch(response);
	}
	/** @private @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cls_=this.x.get("handle_types");
		const cf="RS_Page_Watch"; this.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		cls_.E_Watch(endpoint);
		this.RS_Watch(response);
		this.RS_Player(playerResponse);
		let wp_params=cls_.parse_watch_page_url(cf,url);
		this.save_keys(`${cf}.wp_params`,wp_params);
		this.t(previousCsn,x => cls_.D_VeCsn(x,true));
	}
	/** @private @arg {R_AdBreakService} x */
	R_AdBreakService(x) {this.H_("R_AdBreakService","adBreakServiceRenderer",x,this.D_AdBreakService);}
	/** @private @arg {D_AdBreakService} x */
	D_AdBreakService(x) {
		const cf="D_AdBreakService";
		const {prefetchMilliseconds,getAdBreakUrl,...y}=this.s(cf,x); this.g(y);
		if(prefetchMilliseconds!=="10000") debugger;
		debugger;
	}
	/** @private @arg {E_YpcGetOffers} x */
	E_YpcGetOffers(x) {const cf="E_YpcGetOffers",[a,b,y]=this.TE_Endpoint_3(cf,"ypcGetOffersEndpoint",x); this.g(y); this.M_YpcGetOffers(a); this.D_Params(`D${cf}`,b,"ypc_get_offers.params");}
	/** @private @arg {G_AdPlacementRendererItem} x */
	G_AdPlacementRendererItem(x) {
		if("adBreakServiceRenderer" in x) return this.R_AdBreakService(x);
		if("clientForecastingAdRenderer" in x) return this.R_ClientForecastingAd(x);
		if("instreamVideoAdRenderer" in x) return this.R_InstreamVideoAd(x);
		if("linearAdSequenceRenderer" in x) return this.R_LinearAdSequence(x);
		debugger;
	}
	/** @private @arg {D_CaptionTrackItem} x */
	D_CaptionTrackItem(x) {
		const cf="D_CaptionTrackItem";
		const {baseUrl,name,vssId,languageCode,kind,isTranslatable,...y}=this.s(cf,x); this.g(y);
		{
			let x=baseUrl;
			let x1=split_string_once(x,"?");
			if(x1[0]!=="https://www.youtube.com/api/timedtext") debugger;
			let {...rx}=this.parse_url_search_params(x1[1]);
			this.D_TimedTextApi(rx);
		}
		this.G_Text(name);
		this.save_string(`${cf}.vssId`,vssId);
		this.save_string(`${cf}.languageCode`,languageCode);
		this.t(kind,x => this.save_string(`${cf}.kind`,x));
		if(isTranslatable!==true) debugger;
	}
	/** @private @arg {D_AudioTrackItem} x */
	D_AudioTrackItem(x) {
		const cf="D_AudioTrackItem";
		if("defaultCaptionTrackIndex" in x) {
			const {captionTrackIndices,defaultCaptionTrackIndex,visibility,hasDefaultTrack,captionsInitialState,...y}=this.s(cf,x); this.g(y);
			this.z(captionTrackIndices,this.a_primitive_num);
			this.a_primitive_num(defaultCaptionTrackIndex);
			this.ceq(visibility,"UNKNOWN");
			this.ceq(hasDefaultTrack,true);
			if(captionsInitialState!=="CAPTIONS_INITIAL_STATE_OFF_RECOMMENDED") debugger;
			return;
		}
		const {captionTrackIndices,...y}=this.s(cf,x); this.g(y);
		this.z(captionTrackIndices,this.a_primitive_num);
	}
	/** @private @arg {D_TranslationLanguage} x */
	D_TranslationLanguage(x) {
		const cf="D_TranslationLanguage";
		const {languageCode,languageName,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(languageCode);
		this.G_Text(languageName);
	}
	/** @private @arg {D_Endscreen} x */
	D_Endscreen(x) {
		const cf="D_Endscreen";
		const {elements,startMs,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.z(elements,this.R_EndscreenElement);
		this.t(startMs,this.a_primitive_str);
		this.trackingParams(cf,trackingParams);
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
	/** @private @arg {D_PlayabilityStatus} x */
	D_PlayabilityStatus(x) {
		const cf="D_PlayabilityStatus";
		const {status,playableInEmbed,offlineability,miniplayer,contextParams,...y}=this.s(cf,x); this.g(y);
		if(status!=="OK") debugger;
		this.a_primitive_bool(playableInEmbed);
		this.t(offlineability,this.R_Button);
		this.t(miniplayer,this.R_Miniplayer);
		let ctx=atob(contextParams);
		this.params(cf,"playability_status.context_params",ctx);
	}
	/** @private @arg {D_PlayerAnnotationsExpanded} x */
	D_PlayerAnnotationsExpanded(x) {
		const cf="D_PlayerAnnotationsExpanded"; this.k(cf,x);
		const {featuredChannel,allowSwipeDismiss,annotationId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_FeaturedChannel(featuredChannel);
		this.parse_uuid(annotationId);
		this.a_primitive_bool(allowSwipeDismiss);
	}
	/** @private @arg {D_HeartbeatParams} x */
	D_HeartbeatParams(x) {
		const cf="D_HeartbeatParams";
		const {intervalMilliseconds,softFailOnError,heartbeatServerData,...y}=this.s(cf,x); this.g(y);
		this.save_string(`${cf}.intervalMilliseconds`,intervalMilliseconds);
		this.ceq(softFailOnError,false);
		this.save_string(`${cf}.heartbeatServerData`,heartbeatServerData);
	}
	/** @private @arg {D_Miniplayer} x */
	D_Miniplayer(x) {
		const cf="D_Miniplayer";
		const {playbackMode,...y}=this.s(cf,x); this.g(y);
		if(playbackMode!=="PLAYBACK_MODE_ALLOW") debugger;
	}
	/** @private @arg {D_DesktopWatchAds} x */
	D_DesktopWatchAds(x) {
		const cf="D_DesktopWatchAds";
		const {gutParams,playerAdParams,showCompanion,showInstream,useGut,...y}=this.s(cf,x);
		let params_tag=this.B_TagObj(gutParams);
		// cSpell:ignoreRegExp /\\\\4061\\\\ytpwmpu/
		if(params_tag!=="\\4061\\ytpwmpu") debugger;
		this.ceq(showCompanion,true);
		this.ceq(showInstream,true);
		this.ceq(useGut,true);
		let ka=this.get_keys_of(y);
		if(ka.length>0) {
			console.log(`[${cf}.next_key] [${ka.shift()}]`);
		}
	}
	/** @private @arg {D_PlayerMicroformat} x */
	D_PlayerMicroformat(x) {
		const cf="D_PlayerMicroformat";
		const {thumbnail,embed,title,description,lengthSeconds,ownerProfileUrl,externalChannelId,isFamilySafe,availableCountries,isUnlisted,hasYpcMetadata,viewCount,category,publishDate,ownerChannelName,liveBroadcastDetails,uploadDate,...y}=this.s(cf,x); this.g(y);
		this.D_Thumbnail(thumbnail);
		this.t(embed,this.D_MicroformatEmbed);
		this.G_Text(title);
		this.t(description,this.G_Text);
		this.a_primitive_str(lengthSeconds);
		this.parser.parse_url(cf,ownerProfileUrl);
		this.D_ChannelId(externalChannelId);
		this.a_primitive_bool(isFamilySafe);
		this.z(availableCountries,this.a_primitive_str);
		this.a_primitive_bool(isUnlisted);
		this.a_primitive_bool(hasYpcMetadata);
		this.a_primitive_str(viewCount);
		this.D_VideoCategory(category);
		this.a_primitive_str(publishDate);
		this.a_primitive_str(ownerChannelName);
		this.t(liveBroadcastDetails,this.D_LiveBroadcastDetails);
		this.a_primitive_str(uploadDate);
	}
	/** @private @arg {D_AdPlacement} x */
	D_AdPlacement(x) {
		const cf="D_AdPlacement";
		const {config,renderer,...y}=this.s(cf,x); this.g(y);
		this.R_AdPlacementConfig(config);
		this.G_AdPlacementRendererItem(renderer);
	}
	/** @private @arg {D_PlaybackTracking} x */
	D_PlaybackTracking(x) {
		const cf="D_PlaybackTracking"; this.k(cf,x);
		let [a,u]=this.unwrap_prefix(x,"videostats");
		{
			const {defaultFlushIntervalSeconds,delayplayUrl,playbackUrl,scheduledFlushWalltimeSeconds,watchtimeUrl,...y}=a; this.g(y);
		}
		const {atrUrl,ptrackingUrl,qoeUrl,youtubeRemarketingUrl,...y}=u; this.g(y);
		this.D_UrlAndElapsedMediaTime(atrUrl,this.a_primitive_str);
		this.T_BaseUrl(ptrackingUrl,this.a_primitive_str);
		this.T_BaseUrl(qoeUrl,this.a_primitive_str);
		this.t(youtubeRemarketingUrl,x => this.T_BaseUrl(x,this.a_primitive_str));
	}
	/** @private @arg {D_PlayerCaptionsTracklist} x */
	D_PlayerCaptionsTracklist(x) {
		const cf="D_PlayerCaptionsTracklist";
		const {captionTracks,audioTracks,translationLanguages,defaultAudioTrackIndex,openTranscriptCommand,...y}=this.s(cf,x); this.g(y);
		this.z(captionTracks,this.D_CaptionTrackItem);
		this.z(audioTracks,this.D_AudioTrackItem);
		this.z(translationLanguages,this.D_TranslationLanguage);
		this.a_primitive_num(defaultAudioTrackIndex);
		this.t(openTranscriptCommand,x => {
			if("changeEngagementPanelVisibilityAction" in x) return this.A_ChangeEngagementPanelVisibility(x);
			debugger;
		});
	}
	/** @private @arg {D_VideoQualityPromo} x */
	D_VideoQualityPromo(x) {
		const cf="D_VideoQualityPromo";
		const {triggerCriteria,text,endpoint,trackingParams,snackbar,...y}=this.s(cf,x); this.g(y);
		this.D_TriggerCriteria(triggerCriteria);
		this.G_Text(text);
		this.E_Url(endpoint);
		this.trackingParams(cf,trackingParams);
		this.RA_Notification(snackbar);
	}
	/** @private @arg {D_PlayerAttestation} x */
	D_PlayerAttestation(x) {
		const cf="D_PlayerAttestation";
		const {challenge,botguardData,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(challenge);
		this.D_Botguard(botguardData);
	}
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
	/** @private @arg {DD_Streaming} x */
	DD_Streaming(x) {
		const cf="DD_Streaming";
		const {expiresInSeconds,adaptiveFormats,formats,probeUrl,...y}=this.s(cf,x); this.g(y);
		this.parse_number_template(expiresInSeconds);
		this.z(adaptiveFormats,this.D_AdaptiveFormatItem);
		this.z(formats,this.D_FormatItem);
		this.t(probeUrl,x => this.parser.parse_url(cf,x));
	}
	/** @private @arg {D_ClientForecastingAd} x */
	D_ClientForecastingAd(x) {
		const cf="D_ClientForecastingAd";
		const {impressionUrls,...y}=this.s(cf,x); this.g(y);
		this.z(impressionUrls,x => this.T_BaseUrl(x,x => {
			this.parser.parse_url(`${cf}.impressionUrl`,x);
		}));
	}
	/** @private @arg {D_LinearAdSequence} x */
	D_LinearAdSequence(x) {
		const cf="D_LinearAdSequence";
		const {adLayoutMetadata,linearAds,...y}=this.s(cf,x); this.g(y);
		this.MG_AdLayout_PlayerBytes(adLayoutMetadata);
		this.z(linearAds,this.G_LinearAdsItem);
	}
	/** @private @arg {D_Button_NavEP} x */
	D_Button_NavEP(x) {
		const cf="D_Button_NavEP"; this.k(cf,x);
		if("shareEntityServiceEndpoint" in x) return this.E_ShareEntityService(x);
		if("browseEndpoint" in x) return this.GE_Browse(x);
		if("watchEndpoint" in x) return this.E_Watch(x);
		if("urlEndpoint" in x) return this.E_Url(x);
		if("createCommentReplyDialogEndpoint" in x) return;
		x===""; this.codegen_typedef_all(cf,x);
	}
	/** @private @arg {D_AdPlacementConfig} x */
	D_AdPlacementConfig(x) {
		const cf="D_AdPlacementConfig";
		const {kind,adTimeOffset,hideCueRangeMarker,...y}=this.s(cf,x); this.g(y);
		switch(kind) {
			default: debugger; break;
			case "AD_PLACEMENT_KIND_END":
			case "AD_PLACEMENT_KIND_SELF_START":
			case "AD_PLACEMENT_KIND_START":
		}
		this.t(adTimeOffset,this.D_AdTimeOffset);
		this.ceq(hideCueRangeMarker,true);
	}
	/** @private @arg {D_TriggerCriteria} x */
	D_TriggerCriteria(x) {
		const cf="D_TriggerCriteria";
		const {connectionWhitelist,joinLatencySeconds,rebufferTimeSeconds,watchTimeWindowSeconds,refractorySeconds,...y}=this.s(cf,x); this.g(y);
		if(connectionWhitelist.length!==1) debugger;
		this.ceq(connectionWhitelist[0],"WIFI");
		if(joinLatencySeconds!==15) debugger;
		if(rebufferTimeSeconds!==10) debugger;
		if(watchTimeWindowSeconds!==180) debugger;
		if(refractorySeconds!==2592000) debugger;
	}
	/** @private @arg {D_TimedTextApi} x */
	D_TimedTextApi(x) {
		const cf="D_TimedTextApi";
		let {v,caps,xoaf,xoadf,xosf,hl,ip,ipbits,expire,signature,sparams,key,kind,lang,...y}=this.s(cf,x); this.g(y);
		this.videoId(v);
		this.save_string(`${cf}.caps`,caps);
		this.save_string(`${cf}.xoaf`,xoaf);
		if(xoadf) this.save_string(`${cf}.xoadf`,xoadf);
		this.save_string(`${cf}.xosf`,xosf);
		this.save_string(`${cf}.hl`,hl);
		this.save_string(`${cf}.ip`,ip);
		this.save_string(`${cf}.ipbits`,ipbits);
		let e_num=this.parse_number_template(expire);
		if(Number.isNaN(e_num)) debugger;
		this.a_primitive_num(e_num);
		this.parse_signature(signature);
		this.save_string(`${cf}.sparams`,sparams);
		this.save_string(`${cf}.key`,key);
		this.save_string(`${cf}.kind`,kind);
		this.save_string(`${cf}.lang`,lang);
	}
	/** @private @arg {MG_AdLayout_PlayerBytes} x */
	MG_AdLayout_PlayerBytes(x) {
		const cf="MG_AdLayout_PlayerBytes";
		const {layoutType,layoutId,...y}=this.s(cf,x); this.g(y);
		switch(layoutType) {
			default: debugger; break;
			case "LAYOUT_TYPE_COMPOSITE_PLAYER_BYTES":
		}
		this.save_string(`${cf}.layoutId`,layoutId);
	}
	/** @private @arg {G_LinearAdsItem} x */
	G_LinearAdsItem(x) {
		if("instreamVideoAdRenderer" in x) return this.R_InstreamVideoAd(x);
		if("adActionInterstitialRenderer" in x) return this.R_AdActionInterstitial(x);
		debugger;
	}
	/** @private @arg {D_FormatItem} x */
	D_FormatItem(x) {
		const cf="D_FormatItem";
		const {itag,url,mimeType,bitrate,width,height,lastModified,contentLength,quality,fps,qualityLabel,projectionType,averageBitrate,audioQuality,approxDurationMs,audioSampleRate,audioChannels,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.a_primitive_str(lastModified);
		this.t(contentLength,this.a_primitive_str);
		this.a_primitive_str(quality);
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.a_primitive_num);
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,x => {
			switch(x) {
				default: debugger; break;
				case "44100": case "48000":
			}
		});
		this.t(audioChannels,x => {if(x!==2) debugger;});
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
	/** @private @arg {D_UUIDString} x */
	parse_uuid(x) {
		let uuid_parts=split_string(x,"-");
		let [_up0,_up1,_up2,up3,_up4]=uuid_parts;
		let bd=parseInt(split_string(up3,"")[0],16).toString(2);
		if(bd.length!==4) debugger;
		if(bd.slice(0,2)!=="10") debugger;
		return uuid_parts;
	}
	/** @private @arg {D_FeaturedChannel} x */
	D_FeaturedChannel(x) {
		const cf="D_FeaturedChannel"; this.k(cf,x);
		const {startTimeMs,endTimeMs,watermark,trackingParams,navigationEndpoint,channelName,subscribeButton,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z([startTimeMs,endTimeMs],this.a_primitive_str);
		this.D_Thumbnail(watermark);
		this.trackingParams(cf,trackingParams);
		this.GE_Browse(navigationEndpoint);
		this.a_primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
	}
	/** @private @arg {D_PlayerConfig} x */
	D_PlayerConfig(x) {
		const cf="D_PlayerConfig";
		const {audioConfig,streamSelectionConfig,mediaCommonConfig,webPlayerConfig,...y}=this.s(cf,x); this.g(y);
	}
	/** @private @arg {D_VideoDetails} x */
	D_VideoDetails(x) {
		const cf="D_VideoDetails";
		const {videoId,title,lengthSeconds,keywords,channelId,isOwnerViewing,shortDescription,isCrawlable,thumbnail,allowRatings,author,isPrivate,isUnpluggedCorpus,isLiveContent,...y}=this.s(cf,x); this.g(y);
	}
	/** @template T @private @arg {D_UrlAndElapsedMediaTime<T>} x @arg {(this:this,x:T)=>void} f */
	D_UrlAndElapsedMediaTime(x,f) {
		const cf="D_UrlAndElapsedMediaTime";
		const {baseUrl,elapsedMediaTimeSeconds,...y}=this.s(cf,x); this.g(y);
		f.call(this,baseUrl);
		this.a_primitive_num(elapsedMediaTimeSeconds);
	}
	/** @private @arg {D_Botguard} x */
	D_Botguard(x) {
		const cf="D_Botguard";
		const {program,interpreterSafeUrl,serverEnvironment,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(program);
		let interpreterUrl=this.UrlWrappedValueT(interpreterSafeUrl);
		this.a_primitive_str(interpreterUrl);
		this.save_number(`${cf}.serverEnvironment`,serverEnvironment);
	}
	/** @private @arg {D_CardCollection} x */
	D_CardCollection(x) {
		const cf="D_CardCollection";
		const {cards,headerText,icon,closeButton,trackingParams,allowTeaserDismiss,logIconVisibilityUpdates,...y}=this.s(cf,x); this.g(y);
		this.z(cards,this.R_Card);
		this.G_Text(headerText);
		this.R_InfoCardIcon(icon);
		this.R_InfoCardIcon(closeButton);
		this.trackingParams(cf,trackingParams);
		this.ceq(allowTeaserDismiss,true);
		this.ceq(logIconVisibilityUpdates,true);
	}
	/** @private @arg {D_MicroformatEmbed} x */
	D_MicroformatEmbed(x) {
		const cf="D_CardCollection";
		const {iframeUrl,flashUrl,width,height,flashSecureUrl,...y}=this.s(cf,x); this.g(y);
		this.parser.parse_url(cf,iframeUrl);
		this.parser.parse_url(cf,flashUrl);
		switch(width) {
			default: debugger; break;
			case 1280: case 480: case 405:
		}
		switch(height) {
			default: debugger; break;
			case 720: case 360:
		}
		this.parser.parse_url(cf,flashSecureUrl);
	}
	/** @private @arg {D_VideoCategory} x */
	D_VideoCategory(x) {
		switch(x) {
			default: {
				switch(x) {
				}
				debugger;
			} break;
			case "Sports":
			case "Education":
			case "Pets & Animals":
			case "Autos & Vehicles": case "Comedy": case "Entertainment": case "Film & Animation": case "Gaming":
			case "Howto & Style": case "Music": case "People & Blogs": case "Science & Technology":
		}
	}
	/** @private @arg {D_LiveBroadcastDetails} x */
	D_LiveBroadcastDetails(x) {
		const cf="D_LiveBroadcastDetails";
		const {isLiveNow,startTimestamp,...y}=this.s(cf,x);
		this.a_primitive_bool(isLiveNow);
		this.a_primitive_str(startTimestamp);
		if("endTimestamp" in y) {
			const {endTimestamp,...y1}=y; this.g(y1);
			return;
		}
		this.g(y);
	}
	/** @private @arg {D_AdaptiveFormatItem} x */
	D_AdaptiveFormatItem(x) {
		const cf="D_AdaptiveFormatItem";
		const {itag,url,mimeType,bitrate,width,height,initRange,indexRange,lastModified,contentLength,quality,xtags,fps,qualityLabel,projectionType,audioTrack,averageBitrate,colorInfo,highReplication,audioQuality,approxDurationMs,audioSampleRate,audioChannels,loudnessDb,signatureCipher,...y}=this.s(cf,x); this.g(y);
		this.t(audioTrack,this.D_AudioTrack);
		this.a_primitive_num(itag);
		this.t(url,x => this.parser.parse_url(cf,x));
		this.a_primitive_str(mimeType);
		this.a_primitive_num(bitrate);
		this.t(width,this.a_primitive_num);
		this.t(height,this.a_primitive_num);
		this.D_Range(initRange);
		this.D_Range(indexRange);
		this.a_primitive_str(lastModified);
		this.a_primitive_str(contentLength);
		this.a_primitive_str(quality);
		this.t(xtags,x => this.params(cf,"adaptive_format.xtags",x));
		this.t(fps,this.D_FormatFps);
		this.t(qualityLabel,this.a_primitive_str);
		if(projectionType!=="RECTANGULAR") debugger;
		this.t(averageBitrate,this.a_primitive_num);
		this.t(colorInfo,this.D_FormatColorInfo);
		this.t(highReplication,x => {if(x!==true) debugger;});
		this.t(audioQuality,x => {
			switch(x) {
				default: debugger; break;
				case "AUDIO_QUALITY_LOW":
				case "AUDIO_QUALITY_MEDIUM":
			}
		});
		this.a_primitive_str(approxDurationMs);
		this.t(audioSampleRate,x => {
			switch(x) {
				default: debugger; break;
				case "44100": case "48000":
			}
		});
		this.t(audioChannels,x => {
			if(x!==2) debugger;
		});
		this.t(loudnessDb,this.a_primitive_num);
		this.t_cf(cf,signatureCipher,this.D_Format_signatureCipher);
	}
}
export_(exports => {exports.TypedefGenerator=TypedefGenerator;});
export_(exports => {exports.HandleRS=HandleRS;});
