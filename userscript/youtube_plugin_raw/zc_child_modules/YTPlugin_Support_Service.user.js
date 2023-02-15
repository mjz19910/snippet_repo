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
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// ==/UserScript==
const __module_name__="mod$SupportService";
const store=required(window.__plugin_modules__);
const bs=required(store["mod$YoutubePluginBase"]);
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {bs.do_export(fn,flags,exports,__module_name__);}
const as_any=bs.as_any; as_any;
const ServiceMethods=required(store["mod$ServiceMethods"]).ServiceMethods;
const split_string=bs.split_string;
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
		x===""; this.codegen_typedef(cf,x);
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
		const cf="RS_Player"; const cls_=this.x.get("handle_types");
		const {responseContext: {},playabilityStatus,streamingData,heartbeatParams,playerAds,playbackTracking,videoDetails,playerConfig,storyboards,microformat,cards,trackingParams,attestation,videoQualityPromoSupportedRenderers,captions,adPlacements,frameworkUpdates,endscreen,paidContentOverlay,annotations,cacheMetadata,...y}=this.s(cf,x); this.g(y);
		this.D_PlayabilityStatus(playabilityStatus);
		this.t(streamingData,this.DD_Streaming);
		this.t(heartbeatParams,this.D_HeartbeatParams);
		this.tz(playerAds,this.R_DesktopWatchAds);
		this.t(playbackTracking,this.D_PlaybackTracking);
		this.t(videoDetails,x => cls_.D_VideoDetails(x));
		this.t(playerConfig,x => cls_.D_PlayerConfig(x));
		this.t(storyboards,this.G_PlayerStoryboards);
		this.t(microformat,this.R_PlayerMicroformat);
		this.t(cards,this.R_CardCollection);
		this.trackingParams(trackingParams);
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
		this.t(paidContentOverlay,this.R_PaidContentOverlay);
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
	/** @private @arg {R_EndscreenElement} x */
	R_EndscreenElement(x) {this.H_("R_EndscreenElement","endscreenElementRenderer",x,this.D_EndscreenElement);}
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
	/** @private @arg {R_PaidContentOverlay} x */
	R_PaidContentOverlay(x) {this.H_("R_PaidContentOverlay","paidContentOverlayRenderer",x,this.D_PaidContentOverlay);}
	/** @private @arg {D_PaidContentOverlay} x */
	D_PaidContentOverlay(x) {
		const cf="D_PaidContentOverlay";
		const {text,durationMs,navigationEndpoint,icon,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		if(durationMs!=="10000") debugger;
		this.E_VE83769_Url(navigationEndpoint);
		this.T_Icon(cf,icon);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {G_PlayerStoryboards} x */
	G_PlayerStoryboards(x) {
		const cf="G_PlayerStoryboards"; this.k(cf,x);
		if("playerStoryboardSpecRenderer" in x) return;
		if("playerLiveStoryboardSpecRenderer" in x) return;
		this.codegen_typedef(cf,x);
	}
	/** @private @arg {RS_Watch} x */
	RS_Watch(x) {
		const cf="RS_Watch";
		const {responseContext,contents,currentVideoEndpoint,trackingParams,playerOverlays,onResponseReceivedEndpoints,engagementPanels,topbar,pageVisualEffects,frameworkUpdates,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.R_TwoColumnWatchNextResults(contents);
		this.E_Watch(currentVideoEndpoint);
		this.trackingParams(trackingParams);
		this.R_PlayerOverlay(playerOverlays);
		this.z(onResponseReceivedEndpoints,x => this.GE_ResponseReceived(cf,x));
		this.z(engagementPanels,x => this.R_EngagementPanelSectionList(x));
		this.R_DesktopTopbar(topbar);
		this.z(pageVisualEffects,x => this.R_CinematicContainer(x));
		this.D_FrameworkUpdates(frameworkUpdates);
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
		this.trackingParams(trackingParams);
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
		this.params("playability_status.context_params",ctx);
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
		this.E_VE83769_Url(endpoint);
		this.trackingParams(trackingParams);
		this.RA_Notification(snackbar);
	}
	/** @private @arg {D_PlayerAttestation} x */
	D_PlayerAttestation(x) {
		const cf="D_PlayerAttestation";
		const {challenge,botguardData,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(challenge);
		this.D_Botguard(botguardData);
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
		if(kind) this.save_string(`${cf}.kind`,kind);
		this.save_string(`${cf}.lang`,lang);
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
		this.trackingParams(trackingParams);
		this.GE_Browse(navigationEndpoint);
		this.a_primitive_str(channelName);
		this.R_SubscribeButton(subscribeButton);
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
		this.trackingParams(trackingParams);
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
		this.t(xtags,x => this.params("adaptive_format.xtags",x));
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
	/** @private @arg {R_Card} x */
	R_Card(x) {this.H_("R_Card","cardRenderer",x,this.D_Card);}
	/** @private @arg {R_InfoCardIcon} x */
	R_InfoCardIcon(x) {this.H_("R_InfoCardIcon","infoCardIconRenderer",x,this.D_InfoCardIcon);}
	/** @private @arg {"D_AdaptiveFormatItem"|"D_FormatItem"} cf @arg {D_FormatItem_signatureCipher} x */
	D_Format_signatureCipher(cf,x) {
		/** @type {`${cf}:signatureCipher`} */
		const cf1=`${cf}:signatureCipher`;
		let {s: {},sp,url,...y}=this.parse_url_search_params(x); this.g(y);
		switch(sp) {
			default: debugger; break;
			case "sig": break;
		}
		this.parser.parse_url(cf1,url);
	}
	/** @private @arg {D_FormatColorInfo} x */
	D_FormatColorInfo(x) {
		const cf="D_Range";
		const {primaries,transferCharacteristics,matrixCoefficients,...y}=this.s(cf,x); this.g(y);
		switch(primaries) {
			default: debugger; break;
			case void 0:
			case "COLOR_PRIMARIES_BT709":
		}
		switch(transferCharacteristics) {
			default: debugger; break;
			case "COLOR_TRANSFER_CHARACTERISTICS_BT709":
		}
		switch(matrixCoefficients) {
			default: debugger; break;
			case void 0:
			case "COLOR_MATRIX_COEFFICIENTS_BT709":
		}
	}
	/** @private @arg {D_FormatFps} x */
	D_FormatFps(x) {
		const cf="D_FormatFps";
		this.save_number(cf,x);
	}
	/** @private @arg {D_Range} x */
	D_Range(x) {
		const cf="D_Range";
		const {start,end,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(start);
		this.a_primitive_str(end);
	}
	/** @private @arg {D_AdTimeOffset} x */
	D_AdTimeOffset(x) {
		const cf="D_AdTimeOffset";
		const {offsetStartMilliseconds,offsetEndMilliseconds,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(offsetStartMilliseconds);
		if(offsetEndMilliseconds!=="-1") debugger;
	}
	/** @private @arg {D_EndscreenElement} x */
	D_EndscreenElement(x) {
		const cf="D_EndscreenElement";
		const {style,image,playlistLength,icon,left,width,top,aspectRatio,startMs,endMs,title,metadata,callToAction,dismiss,endpoint,hovercardButton,trackingParams,isSubscribe,id,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);
		switch(style) {
			default: debugger; break;
			case "CHANNEL":
			case "VIDEO":
			case "WEBSITE":
			case "PLAYLIST":
		}
		this.D_Thumbnail(image);
		this.t(playlistLength,this.G_Text);
		this.t(icon,this.D_Thumbnail);
		this.a_primitive_num(left);
		this.a_primitive_num(width);
		this.a_primitive_num(top);
		this.a_primitive_num(aspectRatio);
		this.a_primitive_str(startMs);
		this.a_primitive_str(endMs);
		this.G_Text(title);
		this.G_Text(metadata);
		this.t(callToAction,this.G_Text);
		this.t(dismiss,this.G_Text);
		this.D_EndscreenElement_EP(endpoint);
		this.t(hovercardButton,this.R_SubscribeButton);
		this.trackingParams(trackingParams);
		this.t(isSubscribe,x => this.ceq(x,true));
		this.a_primitive_str(id);
		this.tz(thumbnailOverlays,this.G_ThumbnailOverlayItem);
	}
	/** @private @arg {D_AudioTrack} x */
	D_AudioTrack(x) {
		const cf="D_AudioTrack";
		const {displayName,id,audioIsDefault,...y}=this.s(cf,x); this.g(y);
		this.a_primitive_str(displayName);
		this.save_string(`${cf}.id`,id);
		this.ceq(audioIsDefault,false);
	}
	/** @private @arg {D_Card} x */
	D_Card(x) {
		const cf="D_Card";
		const {teaser,cueRanges,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.R_SimpleCardTeaser(teaser);
		this.z(cueRanges,this.D_CueRangeItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_TrackingParams} x */
	D_InfoCardIcon(x) {this.D_TrackingParams("D_InfoCardIcon",x);}
	/** @private @arg {R_SimpleCardTeaser} x */
	R_SimpleCardTeaser(x) {this.H_("R_Card","simpleCardTeaserRenderer",x,this.D_SimpleCardTeaser);}
	/** @private @arg {D_CueRangeItem} x */
	D_CueRangeItem(x) {
		const cf="D_CueRangeItem";
		const {startCardActiveMs,endCardActiveMs,teaserDurationMs,iconAfterTeaserMs,...y}=this.s(cf,x); this.g(y);
		if(startCardActiveMs!=="0") debugger;
		if(endCardActiveMs!=="5000") debugger;
		if(teaserDurationMs!=="6000") debugger;
		if(iconAfterTeaserMs!=="5000") debugger;
	}
	/** @private @arg {D_SimpleCardTeaser} x */
	D_SimpleCardTeaser(x) {
		const cf="D_SimpleCardTeaser";
		const {message,trackingParams,prominent,logVisibilityUpdates,onTapCommand,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		this.trackingParams(trackingParams);
		this.ceq(prominent,true);
		this.ceq(logVisibilityUpdates,true);
		this.A_ChangeEngagementPanelVisibility(onTapCommand);
	}
}
export_(exports => {exports.TypedefGenerator=TypedefGenerator;});
export_(exports => {exports.HandleRS=HandleRS;});
