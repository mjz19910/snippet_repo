//#region Response
type RS_WatchReelItem={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E_ReelWatch;
	sequenceContinuation?: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};
type RS_SettingsPage={
	page: "settings";
	endpoint: GE_Browse;
	response: RS_Settings;
	url: string;
}|{
	page: "settings";
	endpoint: GE_Browse;
	response: RS_Settings;
	url: string;
	rootVe: 23462;
};
type RS_ShortsPage={
	page: "shorts";
	endpoint: E_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse?: RS_ReelWatchSequence;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: RS_ReelWatchSequence;
}|{
	rootVe: 37414;
	url: `/shorts/${string}`;
	endpoint: E_ReelWatch;
	page: "shorts";
	playerResponse: RS_Player;
	reelWatchSequenceResponse: RS_ReelWatchSequence|undefined;
	response: RS_Reel;
	cachedReelWatchSequenceResponse: RS_ReelWatchSequence;
};
type RS_AccountMenu={
	responseContext: RC_ResponseContext;
	actions: TA_OpenPopup_Empty[];
	trackingParams: string;
};
type RS_AccountsList={
	responseContext: RC_ResponseContext;
	selectText: G_Text;
}&T_Actions<AU_ChannelSwitcherPage>;
type RS_AttGet={
	responseContext: RC_ResponseContext;
	challenge: string;
	bgChallenge: D_AttBgChallenge;
};
type RS_AttLog_RC={responseContext: RC_ResponseContext;};
type RS_Browse={
	responseContext: RC_ResponseContext;
	contents?: G_BrowseContents;
	continuationContents?: C_SectionList;
	header?: G_BrowseHeader;
	alerts?: R_AlertWithButton[];
	metadata?: G_Browse_MD;
	trackingParams: string;
	topbar?: R_DesktopTopbar;
	microformat?: R_Microformat;
	frameworkUpdates?: R_EntityBatchUpdate;
	maxAgeStoreSeconds?: number;
	background?: R_MusicThumbnail;
	onResponseReceivedActions?: A_ResponseReceived[];
	sidebar?: G_BrowseSidebar;
	observedStateTags?: B_StateTag[];
	cacheMetadata?: D_Cache_MD;
};
type Alt_RS_Browse_raw=[
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates",
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions",
	"responseContext,contents,trackingParams,topbar,sidebar",
	"responseContext,header,trackingParams,onResponseReceivedActions",
	"responseContext,trackingParams,onResponseReceivedActions",
	"responseContext,contents,header,trackingParams,topbar",
];
type Alt_RS_Get<T extends number>=Required<{[U in T_Split<Alt_RS_Browse_raw[T],",">[number]]: U extends keyof RS_Browse? RS_Browse[U]:never;}>;
type Alt_RS_Browse=[
	Alt_RS_Get<0>,
	Alt_RS_Get<1>,
	Alt_RS_Get<2>,
	Alt_RS_Get<3>,
	Alt_RS_Get<4>,
	Alt_RS_Get<5>,
][number];
type Alt_RS_Check={[U in keyof Alt_RS_Browse]: RS_Browse[U]};
type RS_Channel={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_C4TabbedHeader;
	metadata: R_Channel_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_Microformat;
	onResponseReceivedActions: C_ResetChannelUnreadCount[];
};
type RS_Feedback={
	responseContext: RC_ResponseContext;
	feedbackResponses: D_FeedbackResponseItem[];
};
type RS_GetLiveChat={
	responseContext: RC_ResponseContext;
	continuationContents: RC_LiveChat;
	trackingParams?: string;
};
type RS_Watch={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnWatchNextResults;
	currentVideoEndpoint: E_Watch;
	trackingParams: string;
	playerOverlays: R_PlayerOverlay;
	onResponseReceivedEndpoints: GE_ResponseReceived[];
	engagementPanels: R_EngagementPanelSectionList[];
	topbar: R_DesktopTopbar;
	pageVisualEffects: R_CinematicContainer[];
	frameworkUpdates: A_FrameworkUpdates;
};
type RS_Guide={
	responseContext: RC_ResponseContext;
	items: G_GuideItem[];
	trackingParams: string;
};
type RS_Next={
	responseContext: RC_ResponseContext;
	contents?: G_NextContents;
	continuationContents?: RC_PlaylistPanel;
	currentVideoEndpoint?: E_Watch;
	trackingParams: string;
	playerOverlays?: R_PlayerOverlay;
	videoReporting?: R_ReportFormModal;
	queueContextParams?: string;
	onResponseReceivedEndpoints?: GE_ResponseReceived[];
	engagementPanels?: R_EngagementPanelSectionList[];
	topbar?: R_DesktopTopbar;
	pageVisualEffects?: R_CinematicContainer[];
	frameworkUpdates?: A_FrameworkUpdates;
};
type RS_Player={
	responseContext: RC_ResponseContext;
	playabilityStatus: D_PlayabilityStatus;
	streamingData?: DD_Streaming;
	heartbeatParams?: D_HeartbeatParams;
	playerAds?: R_DesktopWatchAds[];
	playbackTracking?: D_PlaybackTracking;
	captions?: R_PlayerCaptionsTracklist;
	videoDetails?: D_VideoDetails;
	playerConfig?: D_PlayerConfig;
	storyboards?: R_PlayerStoryboardSpec|R_PlayerLiveStoryboardSpec;
	microformat?: R_PlayerMicroformat;
	cards?: R_CardCollection;
	trackingParams: string;
	attestation?: R_PlayerAttestation;
	videoQualityPromoSupportedRenderers?: R_VideoQualityPromo;
	adPlacements?: T_AnyObjectOrEmpty<R_AdPlacement>[];
	frameworkUpdates: A_FrameworkUpdates;
	endscreen?: R_Endscreen;
	paidContentOverlay?: {};
	annotations?: R_PlayerAnnotationsExpanded[];
};
type RS_Playlist=Record<"contents",R_TwoColumnBrowseResults>&{
	responseContext: RC_ResponseContext;
	header: R_PlaylistHeader;
	alerts?: R_AlertWithButton[];
	metadata: R_Playlist_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_Microformat;
	sidebar: R_PlaylistSidebar;
};
type RS_Reel={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};
type RS_ReelWatchSequence={
	responseContext: RC_ResponseContext;
	entries: T_Command$<E_ReelWatch>[];
	trackingParams: string;
	continuationEndpoint?: C_Continuation;
};
type RS_Search=Record<"contents",R_TwoColumnSearchResults>&{
	responseContext: RC_ResponseContext;
	estimatedResults: `${number}`;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	refinements: string[];
	onResponseReceivedCommands: C_AdsControlFlowOpportunityReceived[];
	targetId: "search-page";
};
type RS_SetSetting={
	responseContext: RC_ResponseContext;
	settingItemId: `${D_AccountSettingIdList[number]}`;
};
type RS_Settings={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	onResponseReceivedEndpoints?: {}[];
	sidebar: R_SettingsSidebar;
};
type RS_Subscribe={
	responseContext: RC_ResponseContext;
	actions: G_RS_Subscribe_Action[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};
type RS_Success={
	responseContext: RC_ResponseContext;
	success: boolean;
};
type RS_Unsubscribe={
	responseContext: RC_ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup_Empty|AU_SubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};
//#endregion
