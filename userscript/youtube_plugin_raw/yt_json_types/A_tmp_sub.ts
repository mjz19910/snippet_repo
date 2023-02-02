type A_AccountItem={accountItem: AD_AccountItem;};
type A_ActionAddVideo={
	addedVideoId: string;
	action: "ACTION_ADD_VIDEO";
};
type A_ActionSetPlaylistVideoOrder={
	action: "ACTION_SET_PLAYLIST_VIDEO_ORDER";
};
type A_BrowserMediaSession={browserMediaSession: R_BrowserMediaSession;}&T_Actions<R_LikeButton>;
type A_ExternalChannelId={
	externalChannelId: `UC${string}`;
};
type A_FrameworkUpdates={
	entityBatchUpdate: D_EntityBatchUpdate;
	elementUpdate?: R_ElementUpdate;
};
type D_LoggingDirectives={
	trackingParams: string;
	visibility: TM_Visibility;
	enableDisplayloggerExperiment?: boolean;
	gestures?: D_LoggingDirectives_Gestures;
};
type A_ResponseReceived=
	|C_AdsControlFlowOpportunityReceived
	|C_ReloadContinuationItems;
type A_WatchNextContinuation=TA_Continuation<"watch-next-feed",G_WatchNext>;