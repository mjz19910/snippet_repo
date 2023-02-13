type GU_VE3611_Url="/gaming"|`/@${string}`|`/channel/UC${string}`;
// cspell:ignore RDCMUC
type GU_PlaylistId=GU_PlaylistId_NoRadio|`RD${string}`|`RDMM${string}`|`RDCMUC${string}`;
type GU_PlaylistId_NoRadio="WL"|"LL"|`UU${string}`|`PL${string}`;
type GU_VE5754_Id=`VL${GU_PlaylistId_NoRadio}`;
type GU_VE6827_Id_1="FElibrary"|"FEhistory"|"FEguide_builder"|"SPreport_history";
type GU_VE6827_Id_Params="FEtrending"|"FEstorefront"|"FEhashtag"|"FEsfv_audio_pivot";
type GU_VE6827_Id=GU_VE6827_Id_1|GU_VE6827_Id_Params;
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
	|"video_description"
	|"product_shelf"
	;
type GU_YoutubeUrlRedirect=
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}&v=${string}`
	|`https://www.youtube.com/redirect?event=channel_banner&redir_token=${string}&q=${string}`
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
	;
;
