//#region Long Objects
type DE_Url=
	|DE_U_InternalUrl
	|DE_U_RedirectUrl
	|DE_U_ExternalUrl
	|DE_U_ChannelUrl
	|DE_U_ExternalUrl_GRU_Open
	;
;
type DE_VE3832_Watch={
	videoId: string;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: boolean;
	loggingContext?: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: R_PrefetchHintConfig;
	playerParams?: string;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	nofollow?: boolean;
	playerExtraUrlParams?: [G_ExtraUrlParamItem];
}|({
	videoId: string;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: boolean;
	loggingContext?: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: R_PrefetchHintConfig;
	playerParams?: string;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	nofollow?: boolean;
	playerExtraUrlParams?: [G_ExtraUrlParamItem];
}&D_PlaylistId);
type DE_ReelWatch={
	videoId?: string;
	playerParams: string;
	thumbnail?: D_Thumbnail;
	overlay: R_ReelPlayerOverlay;
	params: string;
	loggingContext?: D_LoggingContext;
	sequenceProvider?: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";
	inputType?: "REEL_WATCH_INPUT_TYPE_SEEDLESS";
	sequenceParams?: string;
};
type DE_VE83769_Url_1$d$ad_url2={
	utm_term: "";
	utm_campaign: "DISPLAY campaign for \"web development\" landing page";
	utm_source: "adwords";
	utm_medium: "ppc";
	hsa_acc: `${number}`;
	hsa_cam: `${number}`;
	hsa_grp: `${number}`;
	hsa_ad: `${number}`;
	hsa_src: "d";
	hsa_tgt: "";
	hsa_kw: "";
	hsa_mt: "";
	hsa_net: "adwords";
	hsa_ver: "3";
	gclid: string;
};
type DE_VE83769_Url_Shape={
	sa: "l";
	ai: string;
	ae: "1";
	num: "1";
	cid: string;
	sig: string;
	client: `ca-pub-${number}`;
	rf: "3";
	adurl: `https://plantagreenhouses.ca/?gclid=${string}`|`https://www.newdawndevelopments.com/service/custom-homes?gclid=${string}&hsa_ver=3&hsa_net=adwords&hsa_mt=&hsa_kw=&hsa_tgt=&hsa_src=d&hsa_ad=${number}&hsa_grp=${number}&hsa_cam=${number}&hsa_acc=${number}&utm_medium=ppc&utm_source=adwords&utm_campaign=DISPLAY+campaign+for+%22web+development%22+landing+page&utm_term=`;
};
type DE_VE83769_Url_1={
	url: `https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`;
	target: "TARGET_NEW_WINDOW";
};
//#endregion
