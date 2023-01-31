type GU_VE5754_Id=`VL${"LL"|"WL"|`PL${string}`}`;
type GU_VE6827_Id_1="FElibrary"|"FEhistory"|"FEguide_builder"|"SPreport_history";
type GU_VE6827_Id_Params="FEtrending"|"FEstorefront";
type GU_VE6827_Id=GU_VE6827_Id_1|GU_VE6827_Id_Params;
type GU_VE23462_Url="/account"|"/account_notifications";
type GU_VE23462_Id="SPaccount_notifications"|"SPaccount_overview";
type GU_VE37414_Url="/shorts/";
type GU_VE83769_Url=GU_VE83769_Url_Internal|GU_VE83769_Url_External;
type GU_VE83769_Url_Internal="/upload";
type GU_VE83769_Url_External=
	|`https://studio.youtube.com/channel/UC${string}`
	|`https://studio.youtube.com/channel/UC${string}/videos`
	|"https://studio.youtube.com/"
	|"https://studio.youtube.com"
	|"https://music.youtube.com/"
	|"https://music.youtube.com"
	|"https://www.youtubekids.com?source=youtube_web"
	|"https://www.youtubekids.com/?source=youtube_web"
	|"https://tv.youtube.com/?utm_source=youtube_web&utm_medium=ep&utm_campaign=home&ve=34273"
	;
;
