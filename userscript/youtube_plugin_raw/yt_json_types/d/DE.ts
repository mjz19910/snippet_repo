//#region String Enum
type DE_AdPlacementKind=T_EnumStr<"AD_PLACEMENT_KIND","END"|"SELF_START"|"START">;
type DE_OpportunityType=T_EnumStr<"OPPORTUNITY_TYPE",T_EnumStr<"ORGANIC",T_EnumStr<"BROWSE"|"WATCH_NEXT","RESPONSE_RECEIVED">>>;
type DE_IconType_Button=
	|"SETTINGS"|"DELETE"
	|"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
	|"CHEVRON_RIGHT"|"CHEVRON_LEFT"|"REMOVE"|"INFO"|"CLOSE"|"MICROPHONE_ON"
	;
;
type DE_MP_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",
	|"SWITCHER"
	|"CREATION"
	|"NOTIFICATIONS"
	|"ACCOUNT"
>;
//#endregion
//#region DE_VE
type DE_VE<T>={browseId: T;};
type DE_VE3611_BaseUrl=
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
type DE_VE3611={
	params?: string; browseId: `UC${string}`;
	canonicalBaseUrl?: DE_VE3611_BaseUrl;
	query?: string;
};
type DE_VE3854=DE_VE<"FEwhat_to_watch">;
type DE_VE5754=DE_VE<GU_VE5754_BrowseId>|{
	browseId: DU_BrowseId_Playlist;
	canonicalBaseUrl: `/playlist?list=PL${string}`;
};
type DE_VE6827={
	browseId: GU_VE6827_Id;
	params?: string;
	query?: "";
};
type DE_VE11487=DE_VE<"SPunlimited">;
type DE_VE23462=DE_VE<GU_VE23462_Id>;
type DE_VE42352=DE_VE<"FEdownloads">;
type DE_VE96368=DE_VE<"FEsubscriptions">;
//#endregion
//#region DE_
//#region Objects
type D_SerializedContextData={serializedContextData: string;};
type DE_AdditionalDatas={additionalDatas: G_AdditionalDataItem[];};
type DE_AddToPlaylistService={videoId: string;};
type DE_AdFeedback={content: R_AdFeedback;};
type DE_BucketIdentifier={bucketIdentifier: "live_chat"; hack: true;};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_Feedback_ActionItem=C_FilterChipTransform|A_ReplaceEnclosing;
type DE_Feedback={feedbackToken: string; uiActions?: D_HideEnclosingContainer; actions?: DE_Feedback_ActionItem[];};
type DE_GetNotificationMenu={ctoken: string;};
type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type DE_PerformCommentAction={action: string; clientActions: A_UpdateCommentVote[];};
type DE_PlaylistDelete=D_PlaylistId;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId?: "WL"; params?: string;};
type DE_PlaylistEditor=D_PlaylistId;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type DE_Search={params?: string; query: string;};
type DE_Settings={browseId: "SPaccount_overview";};
type DE_ShareEntityService={serializedShareEntity: string; commands: A_ShareEntityService[];};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
type DE_Subscribe={params: string; channelIds: DU_ChannelId[];};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
type DE_Unsubscribe={params: string; channelIds: `UC${string}`[];};
type DE_Upload=B_Hack;
type DE_VE83769_Url_SearchObj={gclid: string;};
type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
type DE_WebPlayerShareEntityService={serializedShareEntity: string;};
type DE_YpcGetCart={transactionParams: string;};
//#endregion
//#region Only params
type DE_GetReportForm=DC_Params;
type DE_GetTranscript=DC_Params;
type DE_YpcGetOffers=DC_Params;
type DE_YpcGetOfflineUpsell=DC_Params;
//#endregion
//#endregion
//#region Unions
type DE_MutationItem=DU_MutationReplace|DU_MutationDelete;
type G_DE_UserFeedback=DE_AdditionalDatas|DE_BucketIdentifier;
//#endregion
//#region Long Objects
type DE_Url=
	|DU_InternalUrl
	|DU_RedirectUrl
	|DU_ExternalUrl
	|DU_ChannelUrl
	|{
		url: `https://support.google.com/youtube?${string}`;
		grwOpenInOverride: "GRW_OPEN_IN_OVERRIDE_USE_PREFERRED_APP_NO_PROMPT";
	}
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
type D_LoggingContext={
	vssLoggingContext: D_SerializedContextData;
	qoeLoggingContext: D_SerializedContextData;
};
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
