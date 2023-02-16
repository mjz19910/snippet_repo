type GU_VE3611_Url=|"/gaming"
	|`/@${string}`
	|`/channel/UC${string}`
	|`/source/${string}/shorts?bp=${string}`
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
type GU_VE23462_Url="/account"|"/account_notifications";
type GU_VE23462_Id="SPaccount_notifications"|"SPaccount_overview";
type GU_VE37414_Url="/shorts/"|`/shorts/${string}`;
type GU_VE42352_Url="/feed/downloads";
type GU_VE83769_Url=
	|GU_VE83769_Url_Internal
	|GU_YoutubeUrlRedirect
	|GU_VE83769_Url_External
	;
;
type GU_VE96368_Url="/feed/subscriptions";
type ST_EncodedURIComponent=string&{_tag: "EncodedURIComponent";};
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
type GU_YoutubeUrlRedirect=
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}&v=${string}`
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}`
	;
;
type GU_VE83769_Url_Internal="/upload";
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
	|`https://googleads.g.doubleclick.net/aclk?sa=l&ai=${string}&ae=1&num=1&cid=CAQSGwDUE5ymnWT3OXutClglsJNPdbyVZHb-FKmsARgB&sig=AOD64_27x_iDAZA3amyOVWA0dZ41NZteDA&client=ca-pub-6219811747049371&rf=3&adurl=https://www.newdawndevelopments.com/service/custom-homes%3Futm_term%3D%26utm_campaign%3DDISPLAY%2Bcampaign%2Bfor%2B%2522web%2Bdevelopment%2522%2Blanding%2Bpage%26utm_source%3Dadwords%26utm_medium%3Dppc%26hsa_acc%3D6163404992%26hsa_cam%3D14380444759%26hsa_grp%3D143153779636%26hsa_ad%3D632985586463%26hsa_src%3Dd%26hsa_tgt%3D%26hsa_kw%3D%26hsa_mt%3D%26hsa_net%3Dadwords%26hsa_ver%3D3%26gclid%3DEAIaIQobChMIr87m7fSZ_QIVSARPCB1noQTREAEYASAAEgJpHPD_BwE`
	;
;
