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
type RS_AccountMenu={
	responseContext: RC_ResponseContext;
	actions: TA_OpenPopup_Empty[];
	trackingParams: string;
};
type RS_AccountsList={
	responseContext: RC_ResponseContext;
	actions: AU_ChannelSwitcherPage[];
	selectText: G_Text;
};
type RS_AttGet={
	responseContext: RC_ResponseContext;
	challenge: string;
	bgChallenge: D_AttBgChallenge;
};
type RS_AttLog_RC={responseContext: RC_ResponseContext;};
type RS_Browse={
	responseContext: RC_ResponseContext;
	contents?: G_BrowseContents;
	continuationContents?: RC_SectionList;
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
//#region Response page

type RS_Page_Settings={
	page: "settings";
	endpoint: GE_Browse;
	response: RS_Settings;
	url: string;
};
type RS_VE23462_Page_Settings={
	page: "settings";
	endpoint: GE_Browse;
	response: RS_Settings;
	url: string;
	rootVe: 23462;
};
type RS_Page_Shorts={
	page: "shorts";
	endpoint: E_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse?: RS_ReelWatchSequence;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse?: RS_ReelWatchSequence;
};
type RS_Page_Watch={
	page: "watch";
	endpoint: E_Watch;
	response: RS_Watch;
	playerResponse: RS_Player;
	url: D_WatchPageUrl;
	previousCsn?: string;
};
type RS_Page_Browse={
	page: "browse";
	endpoint: GE_Browse;
	response: RS_Browse;
	url: "/";
}|{
	page: "browse";
	endpoint: GE_Browse;
	response: RS_Browse;
	url: "/";
	expirationTime: number;
};
type RS_Page_Channel={
	page: "channel";
	endpoint: GE_Browse;
	response: RS_Channel;
	url: string;
};
type RS_Page_Playlist={
	page: "playlist";
	endpoint: GE_Browse;
	response: RS_Playlist;
	url: string;
};
type RS_Page_Search={
	page: "search";
	endpoint: E_Search;
	response: RS_Search;
	url: `/results?search_query=${string}`;
};
//#endregion
//#region RS_VE
type RS_VE3832_Page_Watch={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [D_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
};
type RS_VE5754_Page_Playlist={
	page: "playlist";
	endpoint: GE_Browse;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
type RS_VE37414_Shorts={
	page: "shorts";
	endpoint: E_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse: RS_ReelWatchSequence|undefined;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse: RS_ReelWatchSequence;
	rootVe: 37414;
};
//#endregion
