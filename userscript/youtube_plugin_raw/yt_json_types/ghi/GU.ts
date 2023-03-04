type GU_VE3611_Url=
	|"/gaming"
	|`/@${string}`
	|`/channel/UC${string}`
	|`/source/${string}/shorts?bp=${string}`
	|`/c/${string}`
	;
;
// cspell:ignore RDCMUC
type GU_PlaylistId=GU_PlaylistId_NoRadio|`RD${string}`|`RDMM${string}`|`RDCMUC${string}`;
type GU_PlaylistId_NoRadio="WL"|"LL"|`UU${string}`|`PL${string}`;
type GU_VE5754_Id=`VL${GU_PlaylistId_NoRadio}`;
type GU_VE6827_Id=
	|"FEguide_builder"
	|"FEhashtag"
	|"FEhistory"
	|"FElibrary"
	|"FEsfv_audio_pivot"
	|"FEstorefront"
	|"FEtrending"
	|"SPreport_history"
	;
;
type GU_VE6827_Url=
	|"/feed/guide_builder"
	|`/feed/history`
	|`/feed/library`
	|`/feed/storefront?${string}`
	|`/feed/trending?${string}`
	|`/hashtag/${string}`
	|"/hashtag/shorts/shorts"
	|`/reporthistory`
	|`/source/${string}/shorts`
	;
;
type GU_VE11487_Url="/premium";
type GU_VE23462_Url=
	|"/account_advanced"
	|"/account_billing"
	|"/account_notifications"
	|"/account_playback"
	|"/account_privacy"
	|"/account_sharing"
	|"/account"
	;
;
type GU_VE23462_Id=
	|"SPaccount_advanced"
	|"SPaccount_billing"
	|"SPaccount_notifications"
	|"SPaccount_overview"
	|"SPaccount_playback"
	|"SPaccount_privacy"
	|"SPaccount_sharing"
	;
;
type GU_VE37414_Url="/shorts/"|`/shorts/${string}`;
type GU_VE42352_Url="/feed/downloads";
type GU_VE83769_Url_Internal=
	|"/upload"
	|`https://youtube.com/${string}`
	;
;
type GU_VE83769_Url=
	|GU_VE83769_Url_Internal
	|GU_VE83769_Url_Redirect
	|GU_VE83769_Url_External
	|`https://support.google.com/youtube/answer/${number}`
	|`https://myaccount.google.com/u/${number}/b/${bigint}/?${string}`
	;
;
type GU_VE96368_Url="/feed/subscriptions";
type ST_EncodedURIComponent=string&{_tag: "EncodedURIComponent";};
type D_UrlInfoMap={
	["https://www.youtube.com/redirect"]: GU_YoutubeUrlRedirect_Info;
};
type GU_YoutubeUrlRedirect_Info={
	url: `https://www.youtube.com/redirect?event=video_description&redir_token=${string}&q=${string}&v=${string}`,
	encoded_params: {q: ST_EncodedURIComponent;};
};
type GU_YoutubeUrlRedirect_Event=
	|""
	|"channel_banner"
	|"endscreen"
	|"product_shelf"
	|"video_description"
	;
type GU_VE83769_Url_Redirect=
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}&v=${string}`
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}`
	;
;
type D_StrOnlyLen<T extends number,U extends string>=T_Split<U,"">['length'] extends T? U:never;
type GU_VE83769_Url_External=
	|"https://music.youtube.com"
	|"https://music.youtube.com/"
	|"https://studio.youtube.com"
	|"https://studio.youtube.com/"
	|"https://studio.youtube.com/channel/UC/livestreaming"
	|"https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
	|"https://www.google.com/get/videoqualityreport/"
	|"https://www.youtubekids.com?source=youtube_web"
	|"https://www.youtubekids.com/?source=youtube_web"
	|`https://myactivity.google.com/activitycontrols/youtube?${string}`
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}/videos`
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}`
	|`https://www.googleadservices.com/pagead/aclk?${string}`
	|`https://googleads.g.doubleclick.net/aclk?sa=l&ai=${string}&ae=1&num=1&cid=${string}&sig=${string}&client=${string}&rf=3&adurl=${string}`
	|`https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`
	;
;
type GU_VE5754_Url=`/playlist?list=${"WL"|"LL"|`PL${string}`}`;
type GU_VE3611_2=
	|`/@${string}/about`
	|`/@${string}/channels`
	|`/@${string}/featured`
	|`/@${string}/playlists`
	|`/@${string}/search?query=${string}`
	|`/@${string}/search`
	|`/@${string}/shorts`
	|`/@${string}/videos`
	|`/@${string}`
	|`/c/${string}`
	;
;
type GU_VE3611_3=
	|`/@${string}/about`
	|`/@${string}/channels`
	|`/@${string}/community`
	|`/@${string}/playlists`
	|`/@${string}/search?query=${string}`
	|`/@${string}/shorts`
	|`/@${string}/videos`
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
//#region Url Templates
type GU_CaptionTrackItem_BaseUrl=`https://www.youtube.com/api/timedtext?v=${D_TimedTextApi["v"]}&caps=${D_TimedTextApi_Req["caps"]}&xoaf=${D_TimedTextApi["xoaf"]}&xoadf=${D_TimedTextApi_Req["xoadf"]}&xosf=${D_TimedTextApi_Req["xosf"]}&hl=${D_TimedTextApi["hl"]}&ip=${D_IpFormat}&ipbits=${D_TimedTextApi["ipbits"]}&expire=${D_TimedTextApi["expire"]}&sparams=${D_TimedTextApi["sparams"]}&signature=${D_TimedTextApi["signature"]}&key=${D_TimedTextApi["key"]}&kind=${D_TimedTextApi_Req["kind"]}&lang=${D_TimedTextApi["lang"]}`;
type GU_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RD${string}`
	;
;
type GU_InitPlaybackUrl=`https://${GV_SubDomain}.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=55c84a1a739ba4f3&ip=${D_IpFormat}&initcwndbps=581250&mt=1677051923&oweuc=`;
type D_IpFormat=`${number}.${number}.${number}.${number}`;
// ApiStatsAdsArgs
// spell:ignore trackclk aclk
type GU_ExternalUrl=
	|GU_InitPlaybackUrl
	|`https://ad.doubleclick.net/ddm/trackclk/${string}`
	|`https://i.ytimg.com/vi/${string}/maxresdefault.jpg`
	|`https://music.youtube.com/`
	|`https://music.youtube.com`
	|`https://studio.youtube.com/`
	|`https://studio.youtube.com`
	|`https://support.google.com/youtube/answer/${number}`
	|`https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273`
	|`https://www.google.com/get/videoqualityreport/`
	|`https://www.googleadservices.com/pagead/aclk?${string}`
	|`https://www.gstatic.com/youtube/img/watch/yt_music_channel.jpeg`
	|`https://www.youtube.com/api/stats/ads?${string}`
	|`https://www.youtubekids.com/?source=youtube_web`
	|`https://www.youtubekids.com?source=youtube_web`
	|`https://yt${number}.ggpht.com/${string}=s88-c-k-c0x00ffffff-no-rj`
	;
;
type D_GoodPut_ProbeUrl_SP=`id=${string}&source=${string}&range=${string}&expire=${number}&ip=${D_IpFormat}&ms=${string}&mm=${string}&pl=${string}&nh=${string}&sparams=${string}&signature=${D_TimedTextApi["signature"]}&key=${string}`;
type GU_GoodPut_ProbeUrl=`https://${GV_SubDomain}.googlevideo.com/videogoodput?${D_GoodPut_ProbeUrl_SP}`;
type D_VideoPlayback_SP=`expire=${number}&ei=${string}&ip=${D_IpFormat}&id=${string}&itag=${number}&aitags=${string}&source=youtube&requiressl=yes&mh=B2&mm=${string}&mn=${string}&ms=${string}&mv=m&mvi=3&pl=24&initcwndbps=${number}&spc=${string}&vprv=1&mime=${string}&ns=${string}&gir=yes&clen=${number}&dur=${number}&lmt=${number}&mt=${number}&fvip=4&keepalive=yes&fexp=24007246&c=WEB&txp=number&n=${string}&sparams=expire,ei,ip,id,itag,source,requiressl,vprv,mime,ns,cnr,ratebypass,dur,lmt&sig=${string}&lsparams=mh,mm,mn,ms,mv,mvi,pl,initcwndbps&lsig=${string}`;
type GU_VideoPlaybackUrl=`https://${GV_SubDomain}.googlevideo.com/videoplayback?${D_VideoPlayback_SP}`;
type D_FormatItem_SignatureCipher_SP=`s=${string}&sp=${"sig"}&url=https://${GV_SubDomain}.googlevideo.com/videoplayback%3Fexpire%3D${D_VPS_Req["expire"]}%26ei%3D${D_VPS_Req["ei"]}%26ip%3D${D_VPS_Req["ip"]}%26id%3D${D_VPS_Req["id"]}%26itag%3D${number}%26aitags%3D${string}%26source%3D${D_VPS_Req["source"]}%26requiressl%3D${D_VPS_Req["requiressl"]}%26mh%3D${D_VPS_Req["mh"]}%26mm%3D${D_VPS_Req["mm"]}%26mn%3D${D_VPS_Req["mn"]}%26ms%3D${D_VPS_Req["ms"]}%26mv%3D${D_VPS_Req["mv"]}%26mvi%3D${D_VPS_Req["mvi"]}%26pl%3D${D_VPS_Req["pl"]}%26initcwndbps%3D${D_VPS_Req["initcwndbps"]}%26spc%3D${D_VPS_Req["spc"]}%26vprv%3D${D_VPS_Req["vprv"]}%26mime%3D${D_VPS_Req["mime"]}%26ns%3D${D_VPS_Req["ns"]}%26gir%3D${D_VPS_Req["gir"]}%26clen%3D${D_VPS_Req["clen"]}%26dur%3D${D_VPS_Req["dur"]}%26lmt%3D${D_VPS_Req["lmt"]}%26mt%3D${D_VPS_Req["mt"]}%26fvip%3D${D_VPS_Req["fvip"]}%26keepalive%3D${D_VPS_Req["keepalive"]}%26fexp%3D${D_VPS_Req["fexp"]}%26c%3D${D_VPS_Req["c"]}%26txp%3D${D_VPS_Req["txp"]}%26n%3D${D_VPS_Req["n"]}%26sparams%3D${string}%26sig%3D${D_VPS_Req["sig"]}%26lsparams%3D${string}%26lsig%3D${D_VPS_Req["lsig"]}`;
type UU=Decay<TP_ParseUrlSearchParams<D_FormatItem_SignatureCipher_SP>>["url"];
//#endregion
//#region Url strings
type GU_YTExternalUrl="https://m.youtube.com/premium";
type GU_YtDomain="https://www.youtube.com";
//#endregion
//#region Extract on Url
type GU_YoutubeUrl_1=Extract<DE_Url['url'],`${string}www.youtube.com${string}`>;
type GU_YoutubeKidsUrl_1=Extract<DE_Url['url']|"https://www.youtubekids.com/?source=youtube_web",`https://www.youtubekids.com${string}`>;
//#endregion
//#region UrlShape objects
type D_VideoPlaybackShape_S_Params={
	expire: `${T_UnixTime_In6Hours<number>}`;
	ei: string;
	ip: D_IpFormat;
	id: string;
	itag?: D_VideoPlayback_Itag;
	aitags?: "133,134,135,136,137,160,242,243,244,247,248,278,394,395,396,397,398,399";
	source: "youtube";
	requiressl: "yes";
	ctier?: "SH";
	gcr?: "ca";
	spc?: string;
	vprv: "1";
	ufph?: "1";
	live?: "1";
	hang?: "1";
	noclen?: "1";
	xtags?: "acont=dubbed:lang=es-MX";
	mime: "video/mp4";
	ns: string;
	cnr?: "14";
	gir?: "yes";
	clen?: `${number}`;
	ratebypass?: "yes";
	dur?: `${number}`;
	lmt: `${number}`;
};
//#endregion
