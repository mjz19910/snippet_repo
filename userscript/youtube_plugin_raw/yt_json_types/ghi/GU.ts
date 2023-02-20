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
type GU_VE23462_Url="/account"|"/account_notifications";
type GU_VE23462_Id="SPaccount_notifications"|"SPaccount_overview";
type GU_VE37414_Url="/shorts/"|`/shorts/${string}`;
type GU_VE42352_Url="/feed/downloads";
type GU_VE83769_Url=
	|GU_VE83769_Url_Internal
	|GU_YoutubeUrlRedirect
	|GU_VE83769_Url_External
	|`https://support.google.com/youtube/answer/${number}`
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
	|`https://googleads.g.doubleclick.net/aclk?sa=l&ai=${string}&ae=1&num=1&cid=${string}&sig=${string}&client=${string}&rf=3&adurl=${string}`
	|`https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`
	;
;
