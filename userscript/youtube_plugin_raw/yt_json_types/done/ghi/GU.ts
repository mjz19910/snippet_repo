type GU_VE5754_Id=`VL${"LL"|"WL"|`PL${string}`}`;
type GU_VE6827_Id_1="FElibrary"|"FEhistory"|"FEguide_builder"|"SPreport_history";
type GU_VE6827_Id_Params="FEtrending"|"FEstorefront"|"FEhashtag";
type GU_VE6827_Id=GU_VE6827_Id_1|GU_VE6827_Id_Params;
type GU_VE23462_Url="/account"|"/account_notifications";
type GU_VE23462_Id="SPaccount_notifications"|"SPaccount_overview";
type GU_VE37414_Url="/shorts/"|`/shorts/${string}`;
type GU_VE83769_Url=
	|`https://myactivity.google.com/activitycontrols/youtube?${string}`
	|GU_VE83769_Url_Internal
	|GU_YoutubeUrlRedirect
	|GU_VE83769_Url_External
	;
type ST_EncodedURIComponent=string&{_tag: "EncodedURIComponent";};
type UrlInfoMap={["https://www.youtube.com/redirect"]: GU_YoutubeUrlRedirect_Info;};
type GU_YoutubeUrlRedirect_Info={
	url: `https://www.youtube.com/redirect?event=video_description&redir_token=${string}&q=${string}&v=${string}`,
	encoded_params: {q: ST_EncodedURIComponent;};
};
type GU_YoutubeUrlRedirect_Event=
	|"video_description"
	|"product_shelf"
	;
type GU_YoutubeUrlRedirect=
	|`https://www.youtube.com/redirect?event=${GU_YoutubeUrlRedirect_Event}&redir_token=${string}&q=${string}&v=${string}`
	;
;
type GU_VE83769_Url_Internal="/upload";
type D_StrOnlyLen<T extends number,U extends string>=T_Split<U,"">['length'] extends T? U:never;
type GU_VE83769_Url_External=
	|"https://studio.youtube.com/channel/UC/livestreaming"
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}`
	|`https://studio.youtube.com/channel/UC${D_StrOnlyLen<24,"AAAAAAAAAAAAAAAAAAAAAAAA">}/videos`
	|"https://studio.youtube.com/"
	|"https://studio.youtube.com"
	|"https://music.youtube.com/"
	|"https://music.youtube.com"
	|"https://www.youtubekids.com?source=youtube_web"
	|"https://www.youtubekids.com/?source=youtube_web"
	|"https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
	;
;
