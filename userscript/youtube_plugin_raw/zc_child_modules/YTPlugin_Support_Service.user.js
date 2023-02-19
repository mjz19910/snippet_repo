// ==UserScript==
// @name	YTPlugin Support Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/zc_child_modules/YTPlugin_Support_Service.user.js
// ==/UserScript==

const {do_export,as,split_string_once,split_string,split_string_once_ex,split_string_once_last,ApiBase}=require("./YtPlugin_Base.user");
const {ServiceMethods}=require("./YTPlugin_ServiceMethods.user");

const __module_name__="mod$SupportService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn,flags={global: false}) {do_export(fn,flags,exports,__module_name__);}
/** @private @arg {WA|null} _wa @template {[string,string]} WA @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {TI_SplitOnce_v2<WA,S,D>} */
function split_string_once_ex_v2(s,d=as(","),_wa) {
	if(s==="") {
		/** @private @type {[]} */
		let r=[];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @private @type {[S]} */
		let r=[s];
		/** @private @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @private @type {[string,string]} */
	let r=[a,b];
	/** @private @type {any} */
	let q=r;
	return as(q);
}
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
class Support_RS_Player extends ServiceMethods {
	//#region dup
	/** @arg {`${string}.${string}`} x */
	parse_signature(x) {
		let [sig_0,sig_1]=split_string_once(x,".");
		if(sig_0.match(/^[0-9A-F]+$/)===null) debugger;
		switch(sig_0.length) {
			default: debugger; break;
			case 38: case 40:
		}
		if(sig_1.match(/^[0-9A-F]+$/)===null) debugger; if(sig_1.length!==40) debugger;
	}
	//#endregion
	/** @public @arg {RS_Player} x */
	RS_Player(x) {
		const cf="RS_Player";
		const {responseContext: {},playabilityStatus,streamingData,heartbeatParams,playerAds,playbackTracking,videoDetails,playerConfig,storyboards,microformat,cards,trackingParams,attestation,videoQualityPromoSupportedRenderers,captions,adPlacements,frameworkUpdates,endscreen,paidContentOverlay,annotations,cacheMetadata,...y}=this.s(cf,x); this.g(y);
		this.D_PlayabilityStatus(playabilityStatus);
		this.t(streamingData,this.DD_Streaming);
		this.t(heartbeatParams,this.D_HeartbeatParams);
		this.tz(playerAds,this.R_DesktopWatchAds);
		this.t(playbackTracking,this.D_PlaybackTracking);
		this.t(videoDetails,x => this.handle_types.D_VideoDetails(x));
		this.t(playerConfig,x => this.handle_types.D_PlayerConfig(x));
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
	/** @private @arg {R_EndscreenElement} x */
	R_EndscreenElement(x) {this.H_("endscreenElementRenderer",x,this.D_EndscreenElement);}
	/** @private @arg {R_AdPlacementConfig} x */
	R_AdPlacementConfig(x) {this.H_("adPlacementConfig",x,this.D_AdPlacementConfig);}
	/** @private @arg {R_PlayerAnnotationsExpanded} x */
	R_PlayerAnnotationsExpanded(x) {this.H_("playerAnnotationsExpandedRenderer",x,this.D_PlayerAnnotationsExpanded);}
	/** @private @arg {R_Miniplayer} x */
	R_Miniplayer(x) {this.H_("miniplayerRenderer",x,this.D_Miniplayer);}
	/** @private @arg {R_DesktopWatchAds} x */
	R_DesktopWatchAds(x) {this.H_("playerLegacyDesktopWatchAdsRenderer",x,this.D_DesktopWatchAds);}
	/** @private @arg {R_PlayerCaptionsTracklist} x */
	R_PlayerCaptionsTracklist(x) {this.H_("playerCaptionsTracklistRenderer",x,this.D_PlayerCaptionsTracklist);}
	/** @private @arg {R_VideoQualityPromo} x */
	R_VideoQualityPromo(x) {this.H_("videoQualityPromoRenderer",x,this.D_VideoQualityPromo);}
	/** @private @arg {R_PlayerAttestation} x */
	R_PlayerAttestation(x) {this.H_("playerAttestationRenderer",x,this.D_PlayerAttestation);}
	/** @private @arg {R_CardCollection} x */
	R_CardCollection(x) {this.H_("cardCollectionRenderer",x,this.D_CardCollection);}
	/** @private @arg {R_PlayerMicroformat} x */
	R_PlayerMicroformat(x) {this.H_("playerMicroformatRenderer",x,this.D_PlayerMicroformat);}
	/** @private @arg {R_AdPlacement} x */
	R_AdPlacement(x) {this.H_("adPlacementRenderer",x,this.D_AdPlacement);}
	/** @private @arg {R_Endscreen} x */
	R_Endscreen(x) {this.H_("endscreenRenderer",x,this.D_Endscreen);}
	/** @private @arg {R_PaidContentOverlay} x */
	R_PaidContentOverlay(x) {this.H_("paidContentOverlayRenderer",x,this.D_PaidContentOverlay);}
	/** @private @arg {D_PaidContentOverlay} x */
	D_PaidContentOverlay(x) {
		const cf="D_PaidContentOverlay";
		const {text,durationMs,navigationEndpoint,icon,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(text);
		if(durationMs!=="10000") debugger;
		this.bc.E_VE83769_Url(navigationEndpoint);
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
	/** @private @arg {D_CaptionTrackItem} x */
	D_CaptionTrackItem(x) {
		const cf="D_CaptionTrackItem";
		const {baseUrl,name,vssId,languageCode,kind,isTranslatable,...y}=this.s(cf,x); this.g(y);
		{
			let x=baseUrl;
			let x1=split_string_once(x,"?");
			if(x1[0]!=="https://www.youtube.com/api/timedtext") debugger;
			let {...rx}=this.parse_url_search_params(x1[1]);
			this.handle_types.D_TimedTextApi(rx);
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
		const {thumbnail,embed,title,description,lengthSeconds,ownerProfileUrl,externalChannelId,isFamilySafe,availableCountries,isUnlisted,hasYpcMetadata,viewCount,category,publishDate,ownerChannelName,liveBroadcastDetails,uploadDate,learningResource,...y}=this.s(cf,x); this.g(y);
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
		this.t(learningResource,this.D_LearningResource);
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
		this.bc.E_VE83769_Url(endpoint);
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
		x: {
			let x2=navigationEndpoint;
			if(this.is_TE_VE(x2,3611)) {this.E_VE3611(x2); break x;}
			debugger;
		}
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
		this.save_number(`${cf}.width`,width);
		this.save_number(`${cf}.height`,height);
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
			case "Nonprofits & Activism":
			case "Travel & Events": case "Sports": case "Education": case "Pets & Animals":
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
	R_Card(x) {this.H_("cardRenderer",x,this.D_Card);}
	/** @private @arg {R_InfoCardIcon} x */
	R_InfoCardIcon(x) {this.H_("infoCardIconRenderer",x,this.D_InfoCardIcon);}
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
		const {style,image,playlistLength,icon,left,width,top,aspectRatio,startMs,endMs,title,metadata,callToAction,dismiss,endpoint,subscribersText,hovercardButton,trackingParams,isSubscribe,id,thumbnailOverlays,...y}=this.s(cf,x); this.g(y);
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
		this.t(subscribersText,this.G_Text);
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
		const {teaser,content,cueRanges,icon,trackingParams,cardId,feature,...y}=this.s(cf,x); this.g(y);
		this.R_SimpleCardTeaser(teaser);
		this.t_cf(`${cf}$content`,content,(cf,x) => {
			if("collaboratorInfoCardContentRenderer" in x) return this.R_CollaboratorInfoCardContent(x);
			if("playlistInfoCardContentRenderer" in x) return this.R_PlaylistInfoCardContent(x);
			this.codegen_typedef(cf,x,false);
		});
		this.z(cueRanges,this.D_CueRangeItem);
		this.trackingParams(trackingParams);
		this.t(cardId,this.a_primitive_str);
		this.t(feature,x => {
			if(x!=="cards") debugger;
		});
	}
	/** @private @arg {R_PlaylistInfoCardContent} x */
	R_PlaylistInfoCardContent(x) {this.H_("playlistInfoCardContentRenderer",x,this.D_PlaylistInfoCardContent);}
	/** @private @arg {D_PlaylistInfoCardContent} x */
	D_PlaylistInfoCardContent(x) {x;}
	/** @private @arg {R_CollaboratorInfoCardContent} x */
	R_CollaboratorInfoCardContent(x) {this.H_("collaboratorInfoCardContentRenderer",x,this.D_CollaboratorInfoCardContent);}
	/** @private @arg {D_CollaboratorInfoCardContent} x */
	D_CollaboratorInfoCardContent(x) {x;}
	/** @private @arg {D_TrackingParams} x */
	D_InfoCardIcon(x) {this.D_TrackingParams("D_InfoCardIcon",x);}
	/** @private @arg {R_SimpleCardTeaser} x */
	R_SimpleCardTeaser(x) {this.H_("simpleCardTeaserRenderer",x,this.D_SimpleCardTeaser);}
	/** @arg {`${number}`} x */
	_bd=x => this.mb(this.parse_number_template,this.m(x));
	/** @arg {`${number}`} x */
	_pn=x => this.mb(this.a_primitive_num,this._bd(x));
	/** @arg {string} cf @arg {M_Optional<number>} x */
	_ns=(cf,x) => this.mb(x => this.save_number(cf,x),x);
	/** @arg {string} cf @arg {string} k @arg {`${number}`} x */
	_ns_cf(cf,k,x) {this._ns(`${cf}.${k}`,this._bd(x));}
	get ns() {return this._ns.bind(this);}
	get bd() {return this._bd.bind(this);}
	get pn() {return this._pn.bind(this);}
	get nsf() {return this._ns_cf.bind(this);}
	/** @private @arg {D_CueRangeItem} x */
	D_CueRangeItem(x) {
		const cf="D_CueRangeItem";
		const {startCardActiveMs,endCardActiveMs,teaserDurationMs,iconAfterTeaserMs,...y}=this.s(cf,x); this.g(y);
		let {pn,nsf,exact_arr: a}=this;
		this.z([startCardActiveMs,endCardActiveMs],pn);
		this.z([a("teaserDurationMs",teaserDurationMs),a("iconAfterTeaserMs",endCardActiveMs)],x => nsf(cf,x[0],x[1]));
	}
	/** @private @arg {D_SimpleCardTeaser} x */
	D_SimpleCardTeaser(x) {
		const cf="D_SimpleCardTeaser";
		const {message,trackingParams,prominent,logVisibilityUpdates,onTapCommand,...y}=this.s(cf,x); this.g(y);
		this.G_Text(message);
		this.trackingParams(trackingParams);
		this.ceq(prominent,true);
		this.ceq(logVisibilityUpdates,true);
		this.t(onTapCommand,this.A_ChangeEngagementPanelVisibility);
	}
	/** @private @arg {D_LearningResource} x */
	D_LearningResource(x) {
		const cf="D_LearningResource";
		const {learningResourceType,educationalLevel,educationalLevelCountry,...y}=this.s(cf,x); this.g(y);
		this.save_string("D_LearningResource.learningResourceType",learningResourceType);
		educationalLevel&&this.save_string("D_LearningResource.educationalLevel",educationalLevel);
		educationalLevelCountry&&this.save_string("D_LearningResource.educationalLevelCountry",educationalLevelCountry);
	}
}
class Support_RS_WatchPage extends ServiceMethods {
	/** @public @arg {G_RS_WatchPage} x */
	RS_WatchPage(x) {
		const cf="R_WatchPage"; this.k(cf,x);
		if("rootVe" in x) switch(x.rootVe) {
			case 3832: return this.RS_VE3832_Page_Watch(x);
			default: debugger; return;
		}
		this.RS_Page_Watch(x);
	}
	/** @private @arg {RS_VE3832_Page_Watch} x */
	RS_VE3832_Page_Watch(x) {
		const cf="R_WatchPage_VE3832"; this.k(cf,x);
		const {page: {},rootVe,url,endpoint,preconnect,playerResponse,response,csn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==3832) debugger;
		let wp_params=this.handle_types.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`VE3832.${cf}.wp_params`,wp_params);
		this.E_Watch(endpoint);
		if(preconnect!==void 0) this.handle_types.parse_preconnect_arr(preconnect);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.t(csn,x => this.D_VeCsn(x));
	}
	/** @private @arg {RS_Page_Watch} x */
	RS_Page_Watch(x) {
		const cf="RS_Page_Watch"; this.k(cf,x);
		const {page: {},endpoint,response,playerResponse,url,previousCsn,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Watch(endpoint);
		this.x.get("x_RS_Watch").RS_Watch(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		let wp_params=this.handle_types.D_WatchPageUrl(cf,url);
		wp_params&&this.save_keys(`${cf}.wp_params`,wp_params);
		this.t(previousCsn,x => this.D_VeCsn(x,true));
	}
}
class Support_RS_Watch extends ServiceMethods {
	/** @public @arg {RS_Watch} x */
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
}
class Support_RS_Page_Browse extends ServiceMethods {
	/** @public @arg {RS_Page_Browse} x */
	RS_Page_Browse(x) {
		const cf="RS_Page_Browse";
		if("rootVe" in x) {
			switch(x.rootVe) {
				case 3854: {
					const {rootVe,expirationTime,...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
					this._primitive_of(expirationTime,"number");
					this.save_number(`${cf}.rootVe`,rootVe);
				} break;
				default: debugger; break;
			}
			return;
		}
		if("expirationTime" in x) {
			const {expirationTime,...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
			this._primitive_of(expirationTime,"number");
			return;
		}
		const {...y}=this.RS_Page_Browse_Omit(cf,x); this.g(y);
	}
	/** @private */
	log_url=false;
	/** @private @arg {"RS_Page_Browse"} cf @template {RS_Page_Browse} T @arg {T} x */
	RS_Page_Browse_Omit(cf,x) {
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(this.log_url) console.log("[browse_url] [%s]",JSON.stringify(url));
		debugger;
		if(page!=="browse") debugger;
		this.x.get("x_RS_Browse").RS_Browse(response);
		return y;
	}
}
class Support_RS_Browse extends ServiceMethods {
	/** @public @arg {RS_Browse} x */
	RS_Browse(x) {
		const cf="RS_Browse";
		x: {
			let kk=this.get_keys_of(x);
			let jk=kk.filter(e => {
				if(e==="responseContext") return false;
				return true;
			}).join();
			// contents,header [tag_1]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="contents") return false;
					if(e==="header") return false;
					return true;
				}).join();
				if(jk==="metadata,trackingParams,topbar,microformat,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions,cacheMetadata") break x;
				if(jk==="metadata,trackingParams,topbar,microformat,frameworkUpdates") break x;
				if(jk==="alerts,metadata,trackingParams,topbar,microformat,sidebar") break x;
				if(jk==="trackingParams,topbar,observedStateTags,cacheMetadata") break x;
				if(jk==="metadata,trackingParams,topbar,microformat,sidebar") break x;
				if(jk==="trackingParams,topbar,onResponseReceivedActions") break x;
				if(jk==="trackingParams,topbar,observedStateTags") break x;
				if(jk==="trackingParams,topbar") break x;
				if("contents" in x&&"header" in x) {
					console.log(`-- [RS_Browse.jk_gen_tag_1] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// contents [tag_2]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="contents") return false;
					return true;
				}).join();
				if(jk==="trackingParams,topbar,sidebar") break x;
				if(jk==="trackingParams,topbar") break x;
				if("contents" in x) {
					console.log(`-- [RS_Browse.jk_gen_tag_2] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// -contents,header [tag_3]
			{
				jk=kk.filter(e => {
					if(e==="responseContext") return false;
					if(e==="header") return false;
					return true;
				}).join();
				if(jk==="header,trackingParams,onResponseReceivedActions") break x;
				if("header" in x) {
					console.log(`-- [RS_Browse.tag_3] --\n\nif(jk==="${jk}") break x;`);
					break x;
				}
			}
			// -contents,-header [tag_4]
			{
				if(jk==="continuationContents,metadata,trackingParams,microformat,onResponseReceivedActions,frameworkUpdates") break x;
				if(jk==="trackingParams,onResponseReceivedEndpoints") break x;
				if(jk==="trackingParams,onResponseReceivedActions") break x;
				console.log(`-- [RS_Browse.tag_4] --\n\nif(jk==="${jk}") break x;`);
				break x;
			}
		}
		const {responseContext,header,trackingParams,onResponseReceivedActions,onResponseReceivedEndpoints,contents,topbar,frameworkUpdates,sidebar,observedStateTags,cacheMetadata,metadata,microformat,maxAgeStoreSeconds,background,continuationContents,alerts,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.RC_ResponseContext(responseContext);
		this.t(header,this.G_BrowseHeader);
		this.trackingParams(trackingParams);
		this.tz(onResponseReceivedActions,this.GA_ResponseReceived);
		this.tz_cf(cf,onResponseReceivedEndpoints,this.GE_ResponseReceived);
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
	/** @private @arg {R_FeedTabbedHeader} x */
	R_FeedTabbedHeader(x) {this.H_("feedTabbedHeaderRenderer",x,this.D_FeedTabbedHeader);}
	/** @private @arg {D_FeedTabbedHeader} x */
	D_FeedTabbedHeader(x) {
		const cf="D_FeedTabbedHeader";
		const {title,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
	}
	/** @private @arg {G_BrowseHeader} x */
	G_BrowseHeader(x) {
		const cf="G_BrowseHeader";
		if("feedTabbedHeaderRenderer" in x) return this.R_FeedTabbedHeader(x);
		if("c4TabbedHeaderRenderer" in x) return this.R_C4TabbedHeader(x);
		if("playlistHeaderRenderer" in x) return this.handle_types.R_PlaylistHeader(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_MusicThumbnail} x */
	R_MusicThumbnail(x) {this.H_("musicThumbnailRenderer",x,this.D_MusicThumbnail);}
	/** @private @arg {D_MusicThumbnail} x */
	D_MusicThumbnail(x) {
		const cf="D_MusicThumbnail";
		const {trackingParams: a,thumbnail,thumbnailCrop,thumbnailScale,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(a);
		this.D_Thumbnail(thumbnail);
		if(thumbnailCrop!=="MUSIC_THUMBNAIL_CROP_UNSPECIFIED") debugger;
		if(thumbnailScale!=="MUSIC_THUMBNAIL_SCALE_UNSPECIFIED") debugger;
	}
	/** @private @arg {G_Browse_MD} x */
	G_Browse_MD(x) {
		const cf="G_Browse_MD";
		if("channelMetadataRenderer" in x) return this.handle_types.R_Channel_MD(x);
		if("playlistMetadataRenderer" in x) return this.handle_types.R_Playlist_MD(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseSidebar} x */
	G_BrowseSidebar(x) {
		const cf="G_BrowseSidebar";
		if("settingsSidebarRenderer" in x) return this.handle_types.R_SettingsSidebar(x);
		if("playlistSidebarRenderer" in x) return this.handle_types.R_PlaylistSidebar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {C_ResetChannelUnreadCount} x */
	C_ResetChannelUnreadCount(x) {let [a,y]=this.TE_Endpoint_2("C_ResetChannelUnreadCount","resetChannelUnreadCountCommand",x); this.g(y); this.DC_ResetChannelUnreadCount(a);}
	/** @private @arg {DC_ResetChannelUnreadCount} x */
	DC_ResetChannelUnreadCount(x) {
		const cf="DC_ResetChannelUnreadCount";
		const {channelId,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.D_ChannelId(channelId);
	}
	/** @private @arg {GA_ResponseReceived} x */
	GA_ResponseReceived(x) {
		const cf="GA_ResponseReceived";
		if("adsControlFlowOpportunityReceivedCommand" in x) return this.C_AdsControlFlowOpportunityReceived(x);
		if("appendContinuationItemsAction" in x) return this.A_AppendContinuationItems(x);
		if("reloadContinuationItemsCommand" in x) return this.C_ReloadContinuationItems(x);
		if("resetChannelUnreadCountCommand" in x) return this.C_ResetChannelUnreadCount(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {G_BrowseContents} x */
	G_BrowseContents(x) {
		const cf="G_BrowseContents";
		if("twoColumnBrowseResultsRenderer" in x) return this.R_TwoColumnBrowseResults(x);
		if("feedFilterChipBarRenderer" in x) return this.R_FeedFilterChipBar(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {RC_SectionList} x */
	RC_SectionList(x) {this.H_("sectionListContinuation",x,this.GD_RC_SectionList);}
}
class Support_GenericApi extends ServiceMethods {
	// //#region TODO
	/** @private @arg {Popup_NotificationMenu} x */
	D_NotificationMenu_Popup(x) {
		const cf="D_NotificationMenu_Popup";
		const {popupType: a,popup: b,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(a!=="DROPDOWN") {this.codegen_typedef(cf,x); return null;}
		return b;
	}
	//#endregion
	/** @public @arg {Response} response @arg {G_ResponseTypes} x */
	G_ResponseTypes(response,x) {
		const cf="G_ResponseTypes"; this.ks(cf,x);
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
			case "account.account_menu": return this.handle_types.RS_AccountMenu(x.data);
			case "account.accounts_list": return this.handle_types.RS_AccountsList(x.data);
			case "account.set_setting": return this.handle_types.RS_SetSetting(x.data);
			case "att.get": return this.handle_types.RS_AttGet(x.data);
			case "att.log": return this.handle_types.RS_AttLog_RC(x.data);
			case "browse.edit_playlist": return this.RSB_EditPlaylist(x.data);
			case "browse": return this.x.get("x_RS_Browse").RS_Browse(x.data);
			case "feedback": return this.handle_types.RS_Feedback(x.data);
			case "get_transcript": return this.handle_types.RSG_Transcript(x.data);
			case "get_survey": return this.handle_types.RSG_Survey(x.data);
			case "getAccountSwitcherEndpoint": return this.handle_types.REG_AccountSwitcher(x.data);
			case "getDatasyncIdsEndpoint": return this.handle_types.REG_DatasyncIds(x.data);
			case "guide": return this.handle_types.RS_Guide(x.data);
			case "like.like": return this.handle_types.RSL_Like(x.data);
			case "like.dislike": return this.handle_types.RSL_Dislike(x.data);
			case "like.removelike": return this.handle_types.RSL_RemoveLike(x.data);
			case "live_chat.get_live_chat_replay": return this.handle_types.RS_GetLiveChat(x.data);
			case "live_chat.get_live_chat": return this.handle_types.RS_GetLiveChat(x.data);
			case "music.get_search_suggestions": return this.handle_types.RSG_SearchSuggestions(x.data);
			case "next": return this.handle_types.RS_Next(x.data);
			case "notification.get_notification_menu": return this.RSG_NotificationMenu(x.data);
			case "notification.get_unseen_count": return this.RSG_GetUnseenCount(x.data);
			case "notification.modify_channel_preference": return this.RSM_ChannelPreference(x.data);
			case "notification.record_interactions": return this.RS_Success(x.data);
			case "player": return this.x.get("x_RS_Player").RS_Player(x.data);
			case "playlist.get_add_to_playlist": return this.RSG_AddToPlaylist(x.data);
			case "reel.reel_item_watch": return this.handle_types.RSW_ReelItem(x.data);
			case "reel.reel_watch_sequence": return this.handle_types.RS_ReelWatchSequence(x.data);
			case "share.get_share_panel": return this.handle_types.RSG_SharePanel(x.data);
			case "subscription.subscribe": return this.handle_types.RS_Subscribe(x.data);
			case "subscription.unsubscribe": return this.handle_types.RS_Unsubscribe(x.data);
			case "search": return this.handle_types.RS_Search(x.data);
			case "updated_metadata": return this.handle_types.RSU_M(x.data);
			case "pdg.get_pdg_buy_flow": return this.handle_types.RSG_PdgBuyFlow(x.data);
			default: debugger; return g(x);
		}
	}
	/** @private @arg {RSG_AddToPlaylist} x */
	RSG_AddToPlaylist(x) {
		const cf="RS_GetAddToPlaylist";
		const {responseContext: {},contents,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(contents,this.R_AddToPlaylist);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSB_EditPlaylist} x */
	RSB_EditPlaylist(x) {
		const cf="RSB_EditPlaylist";
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
	/** @private @arg {RSG_NotificationMenu} x */
	RSG_NotificationMenu(x) {
		const cf="RSG_NotificationMenu";
		const {responseContext: {},actions,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		let [ar]=this.z(actions,this.RSG_NotificationMenu_Action);
		let [u2]=this.z(ar,this.D_NotificationMenu_Popup);
		let [u3]=this.z(u2,x => this.TR_MultiPageMenu("D_NotificationMenu_PopupItemMenu",x));
		this.z(u3,this.D_NotificationMenu_PopupItem);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {RSM_ChannelPreference} x */
	RSM_ChannelPreference(x) {
		const cf="RSM_ChannelPreference";
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
	/** @private @arg {RS_Success} x */
	RS_Success(x) {
		const cf="RS_Success";
		const {responseContext: {},success,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._primitive_of(success,"boolean");
	}
	/** @private @arg {RSG_GetUnseenCount} x */
	RSG_GetUnseenCount(x) {
		const cf="RSG_GetUnseenCount";
		const {responseContext: {},actions,unseenCount,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.tz(actions,(x => {
			if("updateNotificationsUnseenCountAction" in x) return this.AU_NotificationsUnseenCount(x);
		}));
		if(unseenCount!==void 0) this.a_primitive_num(unseenCount);
	}
	/** @private @arg {A_NotificationMenuPopup} x */
	RSG_NotificationMenu_Action(x) {
		const cf="RSG_NotificationMenu_Action";
		if("openPopupAction" in x) return this.TA_OpenPopup("RSG_NotificationMenu_Action",x);
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {AU_NotificationsUnseenCount} x */
	AU_NotificationsUnseenCount(x) {let [a,y]=this.TE_Endpoint_2("AU_NotificationsUnseenCount","updateNotificationsUnseenCountAction",x); this.g(y); this.AD_UpdateNotificationsUnseenCount(a);}
	/** @private @template T @arg {T_OpenPopup_Toast<T>} x */
	T_OpenPopup_Toast(x) {
		const cf="T_OpenPopup_Toast";
		const {popupType,popup,...y}=this.s(cf,x); this.g(y);
		if(popupType!=="TOAST") return null;
		return popup;
	}
	/** @private @arg {AD_UpdateNotificationsUnseenCount} x */
	AD_UpdateNotificationsUnseenCount(x) {
		const cf="AD_UpdateNotificationsUnseenCount";
		const {handlerData,unseenCount,timeoutMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.a_primitive_str(handlerData);
		this.a_primitive_num(unseenCount);
		this.a_primitive_num(timeoutMs);
	}
	/** @private @arg {R_AddToPlaylist} x */
	R_AddToPlaylist(x) {this.H_("addToPlaylistRenderer",x,this.D_AddToPlaylist);}
	/** @private @arg {D_AddToPlaylist} x */
	D_AddToPlaylist(x) {
		const cf="D_AddToPlaylist";
		const {playlists,actions,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(playlists,this.R_PlaylistAddToOption);
		this.z(actions,this.R_AddToPlaylistCreate);
	}
	/** @private @arg {R_AddToPlaylistCreate} x */
	R_AddToPlaylistCreate(x) {this.H_("addToPlaylistCreateRenderer",x,this.D_AddToPlaylistCreate);}
	/** @private @arg {D_AddToPlaylistCreate} x */
	D_AddToPlaylistCreate(x) {
		const cf="D_AddToPlaylistCreate";
		const {openCreateLink,nameInput,privacyInput,createAction,serviceEndpoint,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_CompactLink(openCreateLink);
		this.R_TextInputFormField(nameInput);
		this.R_Dropdown(privacyInput);
		this.R_Button(createAction);
		this.E_CreatePlaylistService(serviceEndpoint);
	}
	/** @private @arg {R_PlaylistAddToOption} x */
	R_PlaylistAddToOption(x) {this.H_("playlistAddToOptionRenderer",x,this.D_PlaylistAddToOption);}
	/** @private @arg {C_RefreshPlaylist} x */
	C_RefreshPlaylist(x) {let [a,y]=this.TE_Endpoint_2("C_RefreshPlaylist","refreshPlaylistCommand",x); this.g(y); this.g(a);}
	/** @private @arg {D_NotificationMenu_Popup_SectionItem} x */
	D_NotificationMenu_Popup_SectionItem(x) {
		const cf="D_NotificationMenu_Popup_SectionItem";
		if("multiPageMenuNotificationSectionRenderer" in x) return this.R_MP_MenuNotificationSection(x);
		x===""; this.codegen_typedef(cf,x);
		return null;
	}
	/** @private @arg {D_PopupItemMenu} x */
	D_NotificationMenu_PopupItem(x) {
		const cf="D_NotificationMenu_PopupItem";
		const {header,sections,style,trackingParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this._R_SimpleMenuHeader(header);
		this.z(sections,this.D_NotificationMenu_Popup_SectionItem);
		if(style!=="MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS") debugger;
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_PlaylistAddToOption} x */
	D_PlaylistAddToOption(x) {
		const cf="D_PlaylistAddToOption";
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
	/** @private @arg {R_SimpleMenuHeader} x */
	_R_SimpleMenuHeader(x) {this.H_("simpleMenuHeaderRenderer",x,this.D_SimpleMenuHeader);}
	/** @private @arg {D_SimpleMenuHeader} x */
	D_SimpleMenuHeader(x) {
		const cf="D_SimpleMenuHeader";
		const {title,buttons,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(title);
		this.z(buttons,this.R_Button);
	}
	/** @private @arg {R_TextInputFormField} x */
	R_TextInputFormField(x) {this.H_("textInputFormFieldRenderer",x,this.D_TextInputFormField);}
	/** @private @arg {D_TextInputFormField} x */
	D_TextInputFormField(x) {
		const cf="D_TextInputFormField";
		const {label,maxCharacterLimit,placeholderText,validValueRegexp,invalidValueErrorMessage,required,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.G_Text(label);
		if(maxCharacterLimit!==150) debugger;
		this.a_primitive_str(placeholderText);
		if(validValueRegexp!=="[^<>]*") debugger;
		this.G_Text(invalidValueErrorMessage);
		this.ceq(required,true);
	}
	/** @private @arg {R_Dropdown} x */
	R_Dropdown(x) {this.H_("dropdownRenderer",x,this.D_Dropdown);}
	/** @private @arg {D_Dropdown_Privacy} x */
	D_Dropdown(x) {
		const cf="D_Dropdown";
		const {entries,label,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.z(entries,this.R_PrivacyDropdownItem);
		if(label!=="Privacy") debugger;
	}
	/** @private @arg {R_MP_MenuNotificationSection} x */
	R_MP_MenuNotificationSection(x) {this.H_("multiPageMenuNotificationSectionRenderer",x,this.D_MP_MenuNotificationSection);}
	/** @private @arg {D_MP_MenuNotificationSection} x */
	D_MP_MenuNotificationSection(x) {
		const cf="D_MP_MenuNotificationSection";
		const {trackingParams,items,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.trackingParams(trackingParams);
		this.z(items,this.GR_MP_MenuNotificationSection_Item);
	}
	/** @private @arg {R_PrivacyDropdownItem} x */
	R_PrivacyDropdownItem(x) {this.H_("privacyDropdownItemRenderer",x,this.D_PrivacyDropdownItem);}
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
	/** @private @arg {GR_MP_MenuNotificationSection_Item} x */
	GR_MP_MenuNotificationSection_Item(x) {
		const cf="R_MP_MenuNotificationSection_Item";
		if("notificationRenderer" in x) return this.R_Notification(x);
		if("continuationItemRenderer" in x) return this.R_ContinuationItem(x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {R_Notification} x */
	R_Notification(x) {this.H_("notificationRenderer",x,this.D_Notification);}
	/** @private @arg {D_Notification} x */
	D_Notification(x) {
		const cf="D_Notification";
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
}
class Support_EventInput extends ServiceMethods {
	/** @private @arg {E_Settings} x */
	E_Settings(x) {
		const cf="E_Settings";
		const {_tag,...y}=this.s(cf,x); this.g(y);
		if(_tag!=="E_Settings") debugger;
	}
	/** @arg {{endpoint:TE_VE<number>}} x @template {number} T @arg {T} t @returns {x is {endpoint:TE_VE<T>}} */
	is_EP_Val(x,t) {return this.is_TE_VE(x.endpoint,t);}
	/** @private @arg {R_PageTypeBrowse["response"]} x */
	R_PageTypeBrowse_Response(x) {
		const cf="R_PageTypeBrowse_Response";
		if("rootVe" in x) {
			switch(x.rootVe) {
				case 3854: {
					const {rootVe,page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
					switch(url) {
						case "/":
					}
				} break;
			}

			return;
		}
		if(this.is_EP_Val(x,3854)) {
			const {page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			switch(url) {
				default: url===""; debugger; switch(url) {
					case "/":
				} break;
				case "/":
			}
			return;
		}
		if(this.is_EP_Val(x,6827)) {
			const {page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			if(this.str_is_search(url)) {
				let up=split_string_once(url,"?");
				switch(up[0]) {
					default: up[0]===""; debugger; switch(up[0]) {
						case "/":
					} break;
					case "/feed/trending": {
						let {bp,...y}=this.parse_url_search_params(up[1]); this.g(y);
						this.params("trending.bp",bp);
					}
				}
				return;
			}
			switch(url) {
				default: url===""; debugger; switch(url) {
					case "/":
				} break;
				case "/feed/history":
				case "/feed/library":
			}
			return;
		}
		if(this.is_EP_Val(x,96368)) {
			const {page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			switch(url) {
				default: url===""; debugger; switch(url) {
					case "/":
				} break;
				case "/feed/subscriptions":
			}
			return;
		}
		debugger;
	}
	/** @private @arg {R_PageTypeBrowse} x */
	R_PageTypeBrowse(x) {
		const cf="R_PageTypeBrowse";
		if(this.is_EP_Val(x,3854)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.E_VE3854(endpoint);
			this.R_PageTypeBrowse_Response(response);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,6827)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_PageTypeBrowse_Response(response);
			this.E_VE6827(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		if(this.is_EP_Val(x,96368)) {
			const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.R_PageTypeBrowse_Response(response);
			this.E_VE96368(endpoint);
			if(pageType!=="browse") debugger;
			this._primitive_of(fromHistory,"boolean");
			this.a_primitive_num(navigationDoneMs);
			return;
		}
		debugger;
	}
	/** @private @arg {R_PageTypeChannel} x */
	R_PageTypeChannel(x) {
		const cf="R_PageTypeChannel";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.DataResponsePageType(response);
		this.E_VE3611(endpoint);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypePlaylist} x */
	R_PageTypePlaylist(x) {
		const cf="R_PageTypePlaylist";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_VE5754(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeSearch} x */
	R_PageTypeSearch(x) {
		const cf="R_PageTypeSearch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_VE4724_Search(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeSettings} x */
	R_PageTypeSettings(x) {
		const cf="R_PageTypeSettings";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Settings(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeShorts} x */
	R_PageTypeShorts(x) {
		const cf="R_PageTypeShorts";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.x.get("x_VE37414").E_ReelWatch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @private @arg {R_PageTypeWatch} x */
	R_PageTypeWatch(x) {
		const cf="R_PageTypeWatch";
		const {response,endpoint,pageType,fromHistory,navigationDoneMs,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.E_Watch(endpoint);
		this.DataResponsePageType(response);
		this.parser.parse_page_type(pageType);
		this._primitive_of(fromHistory,"boolean");
		this.a_primitive_num(navigationDoneMs);
	}
	/** @public @arg {YTNavigateFinishDetail} x */
	YTNavigateFinishDetail(x) {
		const cf="YTNavigateFinishDetail"; this.k(cf,x);
		switch(x.pageType) {
			default: debugger; break;
			case "browse": return this.R_PageTypeBrowse(x);
			case "channel": return this.R_PageTypeChannel(x);
			case "playlist": return this.R_PageTypePlaylist(x);
			case "search": return this.R_PageTypeSearch(x);
			case "settings": return this.R_PageTypeSettings(x);
			case "shorts": return this.R_PageTypeShorts(x);
			case "watch": return this.R_PageTypeWatch(x);
		}
	}
	/** @private @arg {DataResponsePageType} x */
	DataResponsePageType(x) {
		const cf="DataResponsePageType";
		this.RC_ResponseContext(x.response.responseContext);
		switch(x.page) {
			case "browse": return this.x.get("x_RS_Page_Browse").RS_Page_Browse(x);
			case "watch": return this.x.get("x_RS_WatchPage").RS_WatchPage(x);
			case "channel": return this.RS_Page_Channel(x);
			case "playlist": return this.G_RS_Page_Playlist(x);
			case "settings": return this.G_RS_Page_Settings(x);
			case "shorts": return this.G_RS_Page_Shorts(x);
			case "search": return this.RS_Page_Search(x);
			default: break;
		}
		console.log("pt",x);
		x===""; this.codegen_typedef(cf,x);
	}
	/** @private @arg {"RS_Page_Channel"} cf @template {RS_Page_Channel} T @arg {T} x */
	RS_Page_Channel_Omit(cf,x) {
		const {page,endpoint,response,url,...y}=this.s(cf,x);/*#destructure_omit*/
		if(page!=="channel") debugger;
		debugger;
		this.handle_types.RS_Channel(response);
		this.a_primitive_str(url);
		return y;
	}
	/** @private @arg {RS_Page_Channel} x */
	RS_Page_Channel(x) {
		const cf="RS_Page_Channel";
		if("rootVe" in x) {
			const {url,endpoint,page,response,...u}=this.s(cf,x);/*#destructure_done*/
			{
				let sp=split_string(url,"/");
				switch(sp.length) {
					default: debugger; break;
					case 2: {
						if(!sp[1].startsWith("@")) debugger;
						if(sp[0]!=="") debugger;
					} break;
					case 3: {
						let [f1,f2,f3]=sp;
						if(f1!=="") debugger;
						if(!f2.startsWith("@")) debugger;
						if(this.str_is_search(f3)) {
							let [p,s]=split_string_once(f3,"?");
							if(p!=="search") debugger;
							let {query,...y}=this.parse_url_search_params(s); this.g(y);
							this.a_primitive_str(query);
							return;
						}
						switch(f3) {
							default: debugger; break;
							case "videos": case "playlists": case "community": case "channels":
						}
					}
				}
			}
			this.E_VE3611(endpoint);
			this.handle_types.RS_Channel(response);
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
			const {page,endpoint,response,url,expirationTime,...y}=this.s(cf,x); this.g(y);
			if(page!=="channel") debugger;
			this.E_VE3611(endpoint);
			this.handle_types.RS_Channel(response);
			{
				let sp=split_string(url,"/");
				switch(sp.length) {
					default: debugger; break;
					case 2: {
						if(!sp[1].startsWith("@")) debugger;
						if(sp[0]!=="") debugger;
					} break;
					case 3: {
						let [f1,f2,f3]=sp;
						if(f1!=="") debugger;
						if(!f2.startsWith("@")) debugger;
						if(this.str_is_search(f3)) {
							let [p,s]=split_string_once(f3,"?");
							if(p!=="search") debugger;
							let {query,...y}=this.parse_url_search_params(s); this.g(y);
							this.a_primitive_str(query);
							return;
						}
						switch(f3) {
							default: debugger; break;
							case "shorts": case "videos": case "playlists": case "search":
						}
					}
				}
			}
			this._primitive_of(expirationTime,"number");
			return;
		}
		{
			const u=this.RS_Page_Channel_Omit(cf,x);/*#destructure_done*/
			this.g(u);
		}
	}
	/** @private @arg {G_RS_Page_Playlist} x */
	G_RS_Page_Playlist(x) {
		const cf="R_PlaylistPage";
		const {url,endpoint,page,response,...y}=this.s(cf,x);
		if(page!=="playlist") debugger;
		this.E_VE5754(endpoint);
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
	/** @private @arg {G_RS_Page_Settings} x */
	G_RS_Page_Settings(x) {
		const cf="R_SettingsPage";
		if("rootVe" in x) return this.RS_VE23462_Page_Settings(x);
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		debugger;
		this.RS_Settings(response);
		this.a_primitive_str(url);
	}
	/** @private @arg {G_RS_Page_Shorts} x */
	G_RS_Page_Shorts(x) {
		const cf="RS_ShortsPage";
		if("rootVe" in x) return this.RS_VE37414_Shorts(x);
		const {page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,previousCsn,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="shorts") debugger;
		this.x.get("x_VE37414").E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.t(reelWatchSequenceResponse,x => this.handle_types.RS_ReelWatchSequence(x));
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		this.t(previousCsn,x => this.D_VeCsn(x,true));
		this.t(cachedReelWatchSequenceResponse,x => this.handle_types.RS_ReelWatchSequence(x));
	}
	/** @private @arg {RS_Page_Search} x */
	RS_Page_Search(x) {
		const cf="RS_SearchPage";
		const {page,endpoint,response,url,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="search") debugger;
		this.E_VE4724_Search(endpoint);
		this.handle_types.RS_Search(response);
		if(!this.str_starts_with(url,"/results?search_query=")) debugger;
		if(url.includes("&")) debugger;
	}
	/** @private @arg {D_GraftedVeItem} x */
	D_GraftedVeItem(x) {
		const cf="D_GraftedVeItem";
		const {veData,csn,...y}=this.s(cf,x); this.g(y);
		this.D_VeCsn(csn);
	}
	/** @private @arg {RS_VE23462_Page_Settings} x */
	RS_VE23462_Page_Settings(x) {
		const cf="Settings_VE23462";
		const {page,endpoint,response,url,rootVe,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(page!=="settings") debugger;
		debugger;
		this.RS_Settings(response);
		this.a_primitive_str(url);
		if(rootVe!==23462) debugger;
	}
	/** @private @arg {RS_VE37414_Shorts} x */
	RS_VE37414_Shorts(x) {
		const cf="Shorts_VE37414";
		const {rootVe,page,playerResponse,endpoint,response,reelWatchSequenceResponse,url,cachedReelWatchSequenceResponse,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		if(rootVe!==37414) debugger;
		if(page!=="shorts") debugger;
		this.x.get("x_RS_Player").RS_Player(playerResponse);
		this.x.get("x_VE37414").E_ReelWatch(endpoint);
		this.RS_Reel(response);
		this.t(reelWatchSequenceResponse,x => this.handle_types.RS_ReelWatchSequence(x));
		if(!this.str_starts_with(url,"/shorts/")) debugger;
		if(url.includes("&")) debugger;
		if(!cachedReelWatchSequenceResponse) debugger;
		this.handle_types.RS_ReelWatchSequence(cachedReelWatchSequenceResponse);
	}
	/** @private @arg {RS_Reel} x */
	RS_Reel(x) {
		const cf="RS_Reel";
		const {responseContext: {},overlay,status,trackingParams,desktopTopbar,engagementPanels,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_ReelPlayerOverlay(overlay);
		if(status!=="REEL_ITEM_WATCH_STATUS_SUCCEEDED") debugger;
		this.trackingParams(trackingParams);
		this.R_DesktopTopbar(desktopTopbar);
		if(!engagementPanels) debugger;
		else {this.z(engagementPanels,this.R_EngagementPanelSectionList);}
	}
	/** @private @arg {RS_Playlist} x */
	RS_Playlist(x) {
		const cf="RS_Playlist";
		const {responseContext: {},contents,header,alerts,metadata,topbar,trackingParams,microformat,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.handle_types.R_PlaylistHeader(header);
		this.tz_cf(cf,alerts,this.RS_Playlist_AlertItem);
		this.handle_types.R_Playlist_MD(metadata);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.R_Microformat(microformat);
		this.handle_types.R_PlaylistSidebar(sidebar);
	}
	/** @private @arg {RS_Settings} x */
	RS_Settings(x) {
		const cf="RS_Settings";
		const {responseContext: {},contents,topbar,trackingParams,onResponseReceivedEndpoints,sidebar,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.R_TwoColumnBrowseResults(contents);
		this.R_DesktopTopbar(topbar);
		this.trackingParams(trackingParams);
		this.tz(onResponseReceivedEndpoints,(this.g));
		this.handle_types.R_SettingsSidebar(sidebar);
	}
	/** @private @arg {D_Tab_WhatToWatch} x */
	D_Tab_WhatToWatch(x) {
		const {selected,content,tabIdentifier: {},trackingParams,...y}=this.s("D_Tab_WhatToWatch",x); this.g(y);
		this.ceq(selected,true);
		this.handle_types.R_RichGrid(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_Tab_Library} x */
	D_Tab_Library(x) {x;}
	/** @public @arg {R_Tab} x */
	R_Tab(x) {this.H_("tabRenderer",x,this.D_Tab);}
	/** @private @arg {D_Tab} x */
	D_Tab(x) {
		const cf="D_Tab";
		if("tabIdentifier" in x) {
			let ux=x;
			switch(x.tabIdentifier) {
				default: this.codegen_typedef(`${cf}_${ux.tabIdentifier}`,x,false); break;
				case "FEhistory": return this.D_Tab_History(x);
				case "FEsubscriptions": return this.D_Tab_Subscriptions(x);
				case "FEwhat_to_watch": return this.D_Tab_WhatToWatch(x);
				case "FElibrary": return this.D_Tab_Library(x);
			}
			return;
		}
		if("selected" in x) {return;}
		if("content" in x) {
			/** @type {`${typeof cf}_${"R_MusicQueue"}`} */
			const cf2=`${cf}_${"R_MusicQueue"}`;
			const {content,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			this.handle_types.R_MusicQueue(content);
			this.trackingParams(trackingParams);
			return;
		}
		x: {
			if(!("endpoint" in x)) break x;
			/** @type {`${typeof cf}_WithEndpoint`} */
			const cf2=`${cf}_WithEndpoint`;
			const {endpoint,title,trackingParams,...y}=this.s(cf2,x); this.g(y);/*#destructure_done*/
			y: {
				if(this.is_TE_VE(endpoint,3611)) {this.E_VE3611(endpoint); break y;}
				debugger;
			}
			this.trackingParams(trackingParams);
			this.save_string(`${cf2}.title`,title);
		}
	}
	/** @private @arg {D_Tab_History} x */
	D_Tab_History(x) {
		const cf="D_Tab_History";
		const {selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		if(selected!==true) debugger;
		if(!content.sectionListRenderer) debugger;
		this.R_SectionList(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {D_Tab_Subscriptions} x */
	D_Tab_Subscriptions(x) {
		const cf="D_Tab_Subscriptions";
		const {endpoint,selected,content,tabIdentifier: {},accessibility,trackingParams,...y}=this.s(cf,x); this.g(y);
		this.D_Tab_Subscriptions_EP(endpoint);
		this.ceq(selected,true);
		this.R_SectionList(content);
		this.trackingParams(trackingParams);
	}
	/** @private @arg {Extract<D_Tab,{tabIdentifier:"FEsubscriptions"}>["endpoint"]} x */
	D_Tab_Subscriptions_EP(x) {
		const cf="D_Tab_Subscriptions_EP";
		if(this.is_TE_VE(x,96368)) return this.E_VE96368(x);
		x===""; this.codegen_typedef(cf,x);
	}
}
//#region SeenDatabase
/** @private @template T */
class BitmapResult {
	/** @constructor @public @arg {T[]} map_arr @arg {string} bitmap */
	constructor(map_arr,bitmap) {
		this.map_arr=map_arr;
		this.bitmap=bitmap;
	}
}
class StoreData {
	seen_string_obj={
		/** @type {Map<string,number>} */
		index: new Map,
		data: [],
		new_data: [],
	};
	seen_number_obj={
		/** @type {Map<string,number>} */
		index: new Map,
		data: [],
		new_data: [],
	};
	seen_keys_obj={
		/** @type {Map<string,number>} */
		index: new Map,
		data: [],
		new_data: [],
	};
	seen_bool_obj={
		/** @type {Map<string,number>} */
		index: new Map,
		data: [],
		new_data: [],
	};
	seen_ve_num_obj={
		/** @type {Map<string,number>} */
		index: new Map,
		data: [],
		new_data: [],
	};
	/** @returns {StoreDescription<boolean>} */
	get_boolean_store() {return this.seen_bool_obj;}
	/** @returns {StoreDescription<string>} */
	get_string_store() {return this.seen_string_obj;}
	/** @returns {StoreDescription<string>} */
	get_keys_store() {return this.seen_keys_obj;}
	/** @returns {StoreDescription<number>} */
	get_number_store() {return this.seen_number_obj;}
	/** @returns {StoreDescription<number>} */
	get_root_visual_elements_store() {return this.seen_ve_num_obj;}
	get_changed_stores() {
		/** @type {("bool"|"string"|"keys"|"number"|"ve")[]} */
		let changed=[];
		if(this.seen_bool_obj.new_data.length>0) changed.push("bool");
		if(this.seen_string_obj.new_data.length>0) changed.push("string");
		if(this.seen_keys_obj.new_data.length>0) changed.push("keys");
		if(this.seen_number_obj.new_data.length>0) changed.push("number");
		if(this.seen_ve_num_obj.new_data.length>0) changed.push("ve");
		return changed;
	}
}
class LocalStorageSeenDatabase extends ServiceMethods {
	/** @arg {string} key */
	get_store_keys(key) {
		return this.get_data_store().get_string_store().data.find(e => e[0]===key);
	}
	/** @private @type {{[x:string]:{arr:any[],set(o:{}):void}}} */
	save_key_objs={};
	do_save_keys_obj=false;
	/** @public @template {string} T @arg {`[${T}]`} x @returns {T} */
	unwrap_brackets(x) {
		/** @returns {T|null} */
		function gn() {return null;}
		let wv=gn();
		let wa=split_string_once_ex(x,"[",wv);
		let [_s1,s2]=wa;
		let ua=split_string_once_last(s2,"]",wv);
		let [s3,_s4]=ua;
		return s3;
	}
	#get_keys_store() {return this.#data_store.get_keys_store();}
	/** @api @public @template {{}} T @arg {string} k @arg {T|undefined} x */
	save_keys_impl(k,x) {
		if(!x) return;
		let ki=k;
		if(this.do_save_keys_obj) {
			if(!(ki in this.save_key_objs)) this.save_key_objs[ki]={
				arr: [],
				/** @private @arg {{}} o */
				set(o) {this.arr.push(o);}
			};
			this.save_key_objs[ki]?.set(x);
		}
		if(typeof x!=="object") return this.save_string(`${ki}.type`,typeof x);
		if(x instanceof Array) return this.save_string(`${ki}.type`,"array");
		let store=this.#get_keys_store();
		let keys=this.get_keys_of(x);
		return this.save_to_store_2("save_keys",k,keys.join(),store);
	}
	#data_store=new StoreData;
	get_data_store() {return this.#data_store;}
	/** @no_mod @type {number|null|Nullable<{}>} */
	#idle_id=null;
	#onDataChange() {
		if(this.#idle_id!==null) return;
		this.#idle_id=requestIdleCallback(() => {
			this.#idle_id=null;
			this.load_database();
			this.is_ready=true;
		});
	}
	/** @template {string} A @template {string} B @arg {`boxed_id:${A}:${B}`} k */
	split_box_type(k) {
		/** @returns {`${A}:${B}`|null} */
		function gn() {return null;}
		let wv=gn();
		let wa=split_string_once_ex(k,":",wv);
		if(wa.length===2) {
			wa;
		}
		/** @type {`${A}:${B}`} */
		let z1=wa[1];
		/** @returns {[A,B]|null} */
		function gb_a() {return null;}
		let [za,zb]=split_string_once_ex_v2(z1,":",gb_a());
		return this.exact_arr(za,zb);
	}
	/** @arg {StoreDescription<string>} ss @arg {(DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes])[]} boxed */
	async export_db_data(ss,boxed) {
		if(ss.data.length>0) {
			for(let sd of ss.data) {
				const [key,arr]=sd;
				/** @type {`boxed_id:str:${string}`} */
				const find_key=`boxed_id:str:${key}`;
				/** @arg {DT_DatabaseStoreTypes[keyof DT_DatabaseStoreTypes]} v @returns {v is {key: typeof find_key}} */
				let fk=v => v.key===find_key;
				const box=boxed.find(v => v.key===find_key);
				if(box) {
					if(!fk(box)) continue;
					switch(arr[0]) {
						case "many": {
							let from_db=box.id[1];
							if(from_db[0]!=="many") continue;
							for(let src_item of arr[1]) {
								let has=from_db[1].find(v => this.eq_keys(v,src_item));
								if(has===null) {
									debugger;
								}
							}
						} break;
						case "one": {
							debugger;
						} break;
					}
					return;
				}
				this.indexed_db.put("boxed_id",{
					key: find_key,
					type: "str",
					id: ["many_str",arr],
				},3);
			}
		}
	}
	log_load_database=false;
	async do_boxed_update_from_database() {
		let boxed=await this.indexed_db.getAll("boxed_id");
		if(this.log_load_database) console.log("load_database all boxed",boxed);
		if(boxed.length===0) {
			let store=this.#data_store;
			let changes=store.get_changed_stores();
			for(let changed of changes) {
				if(changed==="string") continue;
				debugger;
			}
			let ss=store.get_string_store();
			this.export_db_data(ss,boxed);
		} else {
			let store=this.#data_store;
			let ss=store.get_string_store();
			// let changed_data=false;
			for(let to_load of boxed) {
				switch(to_load.type) {
					case "num": {
						debugger;
					} break;
					case "str": {
						/** @type {string[][]} */
						let str_arr=[];
						for(let item of to_load.id[1][1]) {
							if(item instanceof Array) {
								let res=[];
								for(let val of item) {
									if(typeof val!=="string") continue;
									res.push(val);
								}
								str_arr.push(res);
								continue;
							}
							if(typeof item!=="string") continue;
							str_arr.push([item]);
						}
						let k_parts=this.split_box_type(to_load.key);
						if(k_parts[0]!=="str") debugger;
						// save database to local
						for(let from_db of str_arr) {
							let local_data=ss.data.find(v => v[0]===k_parts[1]);
							if(!local_data) {
								if(from_db.length!==1) {debugger; continue;}
								ss.data.push([k_parts[1],["one",from_db]]);
								continue;
							}
							switch(local_data[1][0]) {
								case "many": {
									let mv=local_data[1][1];
									if(mv.findIndex(v => this.eq_keys(v,from_db))>=0) continue;
									local_data[1][1].push(from_db);
								} break;
								case "one": {
									if(from_db.length!==1) {debugger; continue;}
									if(local_data[1][1].includes(from_db[0])) continue;
									local_data[1][1].push(from_db[0]);
								}
							}
						}
						// save local to database
						for(let from_db of str_arr) {
							let local_data=ss.data.find(v => v[0]===k_parts[1]);
							if(local_data) {
								let ck=local_data[1];
								if(from_db.length===1) {
									if(ck[0]==="many") continue;
									if(ck[1].includes(from_db[0])) continue;
									ck[1].push(from_db[0]);
								} else {
									if(ck[0]==="one") continue;
									let mv=ck[1];
									if(mv.findIndex(v => this.eq_keys(v,from_db))>=0) continue;
									mv.push(from_db);
								}
								continue;
							}
							ss.data.push([k_parts[1],["one",from_db]]);
							debugger;
						}
					}
				}
			}
			this.export_db_data(ss,boxed);
		}
	}
	expected_id=0;
	async load_database() {
		let update_id=await this.indexed_db.get("boxed_id","boxed_id:update_id");
		if(!update_id) {
			this.indexed_db.put("boxed_id",{
				key: "boxed_id:update_id",
				type: "update_id",
				id: 1,
			},3);
			this.expected_id=1;
		} else {
			if(update_id.id!==this.expected_id) {
				await this.do_boxed_update_from_database();
				this.indexed_db.put("boxed_id",{
					key: "boxed_id:update_id",
					type: "update_id",
					id: this.expected_id,
				},3);
				return;
			}
			this.expected_id++;
			this.indexed_db.put("boxed_id",{
				key: "boxed_id:update_id",
				type: "update_id",
				id: this.expected_id,
			},3);
		}
	}
	#get_string_store() {return this.#data_store.get_string_store();}
	/** @private @template T @arg {string} k @arg {StoreDescription<T>['data'][number][1]} x @arg {StoreDescription<T>} store */
	add_to_index(k,x,store) {
		/** @private @type {StoreDescription<T>['data'][number]} */
		let p=[k,x];
		let nk=store.data.push(p)-1;
		store.index.set(k,nk);
		return p;
	}
	/** @private @template T @arg {string} key @arg {StoreDescription<T>} store */
	get_seen_string_item_store(key,store) {
		const {index,data}=store;
		let idx=index.get(key);
		if(idx) return data[idx];
		idx=data.findIndex(e => e[0]===key);
		if(idx<0) return this.add_to_index(key,["one",[]],store);
		store.index.set(key,idx);
		return data[idx];
	}
	/** @private @template T @arg {T|T[]} x @arg {[string, ["one", T[]] | ["many", T[][]]]} data_item */
	save_to_data_item(x,data_item) {
		let target=data_item[1];
		if(x instanceof Array) {return this.add_many_to_data_item(x,data_item);} else {return this.add_one_to_data_arr(x,target);}
	}
	/** @private @template T @arg {T} x @arg {["one", T[]] | ["many", T[][]]} target */
	add_one_to_data_arr(x,target) {
		if(target[0]==="one") {if(!target[1].includes(x)) return target[1].push(x);} else if(target[0]==="many") {
			let res=target[1].find(([e,...r]) => !r.length&&e===x);
			if(!res) return target[1].push([x]);
		}
		return -1;
	}
	/** @private @template T @arg {T[]} x @arg {[string, ["one", T[]] | ["many", T[][]]]} item */
	add_many_to_data_item(x,item) {
		let target=item[1];
		if(target[0]==="one") {
			let inner=target[1].map(e => [e]);
			target=["many",inner];
			item[1]=target;
		}
		let found=target[1].find(e => {
			if(e.length!==x.length) return false;
			for(let i=0;i<e.length;i++) {
				let c=e[i]; let o=x[i];
				if(c!==o) return false;
			}
			return true;
		});
		if(!found) return target[1].push(x);
		return -1;
	}
	is_ready=false;
	/** @public @template T @arg {string} ns @arg {string} k @arg {T|T[]} x @arg {StoreDescription<T>} store */
	save_to_store_2(ns,k,x,store) {
		let store_item=this.get_seen_string_item_store(k,store);
		let store_index=this.save_to_data_item(x,store_item);
		if(store_index<0) return false;
		store.new_data.push([k,x]);
		if(!this.is_ready) {
			this.#onDataChange();
			return;
		}
		console.log(`store [${ns}] [${k}] %o`,x);
		let idx=store.data.indexOf(store_item);
		if(idx<0) {debugger; return;}
		this.show_strings_bitmap(ns,idx,store);
		if(this.do_random_breakpoint&&Math.random()>0.999) debugger;
		return true;
	}
	#get_number_store() {return this.#data_store.get_number_store();}
	do_random_breakpoint=false;
	/** @api @public @arg {string} k @arg {number|number[]} x */
	save_number_impl(k,x) {
		if(x===void 0) {debugger; return;}
		let store=this.#get_number_store();
		return this.save_to_store_2("save_number",k,x,store);
	}
	/** @api @public @arg {string} k @arg {string|string[]} x */
	save_string_impl(k,x) {
		if(x===void 0) {debugger; return;}
		let store=this.#get_string_store();
		return this.save_to_store_2("save_string",k,x,store);
	}
	/** @public @template T @arg {string} ns @arg {number} idx @arg {StoreDescription<T>} store */
	show_strings_bitmap(ns,idx,store) {
		let p=store.data[idx];
		if(!p) return;
		let k=p[0];
		let cur=p[1];
		if(cur[0]==="many") {
			let src_data=cur[1];
			let max_len=src_data.map(e => e.length).reduce((a,b) => Math.max(a,b));
			for(let bitmap_src_idx=0;bitmap_src_idx<max_len;bitmap_src_idx++) {
				let bitmap_src=src_data.filter(e => bitmap_src_idx<e.length).map(e => e[bitmap_src_idx]);
				let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
				console.log(` --------- [${ns}] [store["${k}"][${bitmap_src_idx}]] --------- `);
				console.log(index_map.map(e => `"${e}"`).join(","));
				console.log(bitmap);
			}
			return;
		} else {
			let bitmap_src=cur[1];
			if(bitmap_src.length===0) return;
			let linear_map=bitmap_src.every(e => {
				if(typeof e!=="string") return false;
				return !e.includes(",");
			});
			if(linear_map) {
				console.log(` --------- [${ns}] [${k}] --------- `);
				console.log(bitmap_src.join(","));
				return;
			}
			let {bitmap,map_arr: index_map}=this.generate_bitmap(bitmap_src);
			console.log(` --------- [${ns}] [${k}] --------- `);
			console.log(index_map.join(","));
			console.log(bitmap);
		}
	}
	/** @private @arg {string} x */
	rle_enc(x) {
		let rle=x.replaceAll(/(1+)|(0+)/g,(v,c1,c2) => {
			let rle=c1?.length??c2?.length;
			if(rle<4) return "!"+v[0]+":"+v.length;
			if(c1?.length!==void 0) return "!"+c1[0]+":"+c1.length;
			if(c2?.length!==void 0) return "!"+c2[0]+":"+c2.length;
			return ["!",c1?.length,"$",c2?.length,":"]+"";
		}).split("!").slice(1);
		return rle.join("!");
	}
	num_bitmap_console() {
		let gg=this.get_data_store().get_number_store().data.find(e => e[0]==="P_tracking_params.f1");
		if(!gg) return;
		let g1=gg[1];
		if(g1[0]==="many") return;
		let sr=g1[1].slice().sort((a,b) => a-b);
		this.save_number("arr.P_tracking_params.f1",sr);
		let bm=this.generate_bitmap_num(g1[1]).bitmap;
		this.save_string("bitmap.P_tracking_params.f1",bm.split("!").map((e,u) => [u,e].join("$")).join(","));
		this.#get_string_store().data.find(e => e[0]==="bitmap.P_tracking_params.f1")?.[1]?.[1];
	}
	/** @private @template T @arg {T[]} bitmap_src */
	generate_bitmap(bitmap_src) {
		let map_arr=[...new Set([...bitmap_src.map(e => {
			if(typeof e!=="string") return [];
			return e.split(",");
		}).flat()])];
		let bitmap="\n"+bitmap_src.map(e => {
			if(typeof e!=="string") return [];
			return e.split(",").map(e => map_arr.indexOf(e));
		}).map(e => {
			let ta=new Array(map_arr.length).fill(0);
			for(let x of e) ta[x]=1;
			let bs=ta.join("");
			return bs;
		}).sort((a,b) => b.split("0").length-a.split("0").length).join("\n")+"\n";
		return new BitmapResult(map_arr,bitmap);
	}
	/** @private @arg {number[]} src */
	generate_bitmap_num_raw(src) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(0);
		src.forEach(e => {ta[e]=1;});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
	}
	/** @private @arg {number[]} src */
	generate_bitmap_num_raw_fill(src,fill_value=0) {
		let map_arr=[...new Set([...src])].sort((a,b) => a-b);
		let zz=map_arr.at(-1)??0;
		let ta=new Array(zz+1).fill(fill_value);
		/** @private @type {0|1} */
		let replace_value;
		if(fill_value===0) {replace_value=1;} else {replace_value=0;}
		src.forEach(e => {ta[e]=replace_value;});
		let bs=ta.join("");
		return new BitmapResult(map_arr,bs);
	}
	bitmap_console_todo_1() {
		let yt_plugin={ds: this,};
		let gg=yt_plugin.ds.get_data_store().get_number_store().data.find(e => e[0]==="tracking.trackingParams.f1");
		if(!gg) return;
		if(gg[1][0]==="many") return;
		gg[1][1].sort((a,b) => a-b);
		let g1=gg[1];
		/** @private @arg {string} str */
		function find_one_set_bit(str) {
			let rx=/(?<=0)1{1}(?=0)/g;
			/** @private @type {[number,string][]} */
			let r=[];
			for(;;) {
				let rr=rx.exec(str);
				if(rr===null) return r;
				r.push([rx.lastIndex,rr[0]]);
			}
		}
		let bm=yt_plugin.ds.generate_bitmap_num_raw_fill(g1[1],1).bitmap;
		let mm=find_one_set_bit(bm);
		/** @private @arg {string} bm */
		function unset_bits(bm) {
			let mu=bm.split("");
			for(let u of mm) {
				let [k,v]=u;
				let cx=k-1;
				let off=0;
				if(v.length===2) off=0;
				if(v.length===1) off=1;
				for(let i=cx-1;i<k+v.length-2;i++) {
					let ui=i+off;
					let log_clear=false;
					if(log_clear) console.log("clear",ui,"of",mu[ui]);
					mu[ui]="0";
				}
			}
			return mu;
		}
		/** @private @arg {string[]} s */
		function swap_mask(s) {return s.map(e => e==="0"? "1":"0").join("");}
		let mu=unset_bits(bm);
		new Map(mm);
		yt_plugin.ds.rle_enc(mu.join(""));
		let mc=swap_mask(mu);
		mm=find_one_set_bit(mc);
		mu=unset_bits(mc);
		let mu_=swap_mask(mu);
		let mx=mu_;
		let rle_x=yt_plugin.ds.rle_enc(mx);
		console.log(rle_x.split("!"));
	}
	console_code_2() {"0:0!1:1".split("!").map(e => e.split(":").map(e => parseInt(e,10))).map((e,i) => [...e,i]).sort(([,a],[,b]) => a-b).map(([a,b,i]) => `${b}$${i}$${a}`);}
	/** @private @arg {number[]} bitmap_src */
	generate_bitmap_num(bitmap_src) {
		let {map_arr,bitmap}=this.generate_bitmap_num_raw(bitmap_src);
		let bitmap_rle=this.rle_enc(bitmap);
		return new BitmapResult(map_arr,bitmap_rle);
	}
	/** @api @public @arg {string} k @arg {boolean} x */
	save_boolean_impl(k,x) {
		let store=this.#data_store.get_boolean_store();
		return this.save_to_store_2("boolean",k,x,store);
	}
	/** @api @public @arg {number} x */
	save_root_visual_element(x) {
		let store=this.#data_store.get_root_visual_elements_store();
		const k="root_visual_element";
		return this.save_to_store_2(k,k,x,store);
	}
}
class Support_VE extends ServiceMethods {
	/** @public @arg {R_VssLoggingContext} x */
	R_VssLoggingContext(x) {this.H_("vssLoggingContext",x,this.D_VssLoggingContext);}
	/** @public @arg {D_VssLoggingContext} x */
	D_VssLoggingContext(x) {
		const cf="D_VssLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("logging_context.serialized_context_data",serializedContextData);
	}
}
class Support_VE37414 extends ServiceMethods {
	/** @private @arg {D_SerializedContextData} x */
	D_QoeLoggingContext(x) {
		const cf="D_QoeLoggingContext";
		const {serializedContextData,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
		this.params("logging_context.serialized_context_data",serializedContextData);
	}
	/** @private @arg {DE_ReelWatch} x */
	DE_VE37414_ReelWatch(x) {
		const cf="DE_ReelWatch";
		if("videoId" in x) {
			const {videoId,playerParams,thumbnail,overlay,params,loggingContext,sequenceProvider,sequenceParams,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.t(videoId,this.videoId);
			this.params("reel.player_params",playerParams);
			this.t(thumbnail,this.D_Thumbnail);
			this.R_ReelPlayerOverlay(overlay);
			this.params("reel.params",params);
			if(loggingContext) {
				this.x.get("x_VE").D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			this.t(sequenceProvider,x => this.ceq(x,"REEL_WATCH_SEQUENCE_PROVIDER_RPC"));
			this.t(sequenceParams,x => this.params("reel.sequence_params",x));
			return;
		}
		if("inputType" in x) {
			const {playerParams,overlay,params,sequenceProvider,inputType,loggingContext,...y}=this.s(cf,x); this.g(y);/*#destructure_done*/
			this.params("reel.player_params",playerParams);
			this.R_ReelPlayerOverlay(overlay);
			this.params("reel.params",params);
			this.t(sequenceProvider,x => {if(x!=="REEL_WATCH_SEQUENCE_PROVIDER_RPC") debugger;});
			this.t(inputType,x => {if(x!=="REEL_WATCH_INPUT_TYPE_SEEDLESS") debugger;});
			if(loggingContext) {
				this.x.get("x_VE").D_VssLoggingContext(loggingContext.vssLoggingContext);
				this.D_QoeLoggingContext(loggingContext.qoeLoggingContext);
			}
			return;
		}
		this.g(x);
	}
	/** @public @arg {E_ReelWatch} x */
	E_ReelWatch(x) {const [a,b,y]=this.TE_Endpoint_3("E_ReelWatch","reelWatchEndpoint",x); this.g(y); this.M_VE37414(a); this.DE_VE37414_ReelWatch(b);}
	/** @public @arg {M_VE37414} x */
	M_VE37414(x) {this.T_WCM("M_VE37414",x,this.GM_VE37414);}
	/** @public @arg {GM_VE37414} x @returns {`VE${rootVe}`} */
	GM_VE37414(x) {
		const cf="GM_VE37414_WC";
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
}
/** @template {{}} T */
class OnePropertyObjArray {
	/** @arg {ApiBase} cls */
	constructor(cls) {
		this.cls=cls;
	}
	/** @type {T[]} */
	arr=[];
	/** @arg {T} v */
	push(v) {
		if(this.cls.get_keys_of(v).length!==1) debugger;
		this.arr.push(v);
	}
	get length() {return this.arr.length;}
	[Symbol.iterator]() {return this.arr[Symbol.iterator]();}
}
export_(exports => {
	exports.TypedefGenerator=TypedefGenerator;
	exports.LocalStorageSeenDatabase=LocalStorageSeenDatabase;
	exports.OnePropertyObjArray=OnePropertyObjArray;
});
export_(exports => {
	exports.Support_RS_Player=Support_RS_Player;
	exports.Support_RS_WatchPage=Support_RS_WatchPage;
	exports.Support_RS_Watch=Support_RS_Watch;
	exports.Support_RS_Page_Browse=Support_RS_Page_Browse;
	exports.Support_RS_Browse=Support_RS_Browse;
	exports.Support_GenericApi=Support_GenericApi;
	exports.Support_EventInput=Support_EventInput;
	exports.Support_VE37414=Support_VE37414;
	exports.Support_VE=Support_VE;
});
