//#region Response
type RS_WatchReelItem={
	responseContext: RC_ResponseContext;
	overlay: R_ReelPlayerOverlay;
	status: "REEL_ITEM_WATCH_STATUS_SUCCEEDED";
	trackingParams: string;
	replacementEndpoint?: E_VE37414_ReelWatch;
	sequenceContinuation?: string;
	desktopTopbar: R_DesktopTopbar;
	engagementPanels: R_EngagementPanelSectionList[];
};
type D_MultiPageMenuSection={
	items: R_CompactLink[];
	trackingParams: string;
};
type R_MultiPageMenuSection={multiPageMenuSectionRenderer: D_MultiPageMenuSection;};
type GM_VE12924={
	url: "/select_site";
	webPageType: "WEB_PAGE_TYPE_SETTINGS";
	rootVe: 12924;
};
type M_VE12924={webCommandMetadata: GM_VE12924;};
type D_ActiveAccountHeader={
	accountName: G_Text;
	accountPhoto: D_Thumbnail;
	settingsEndpoint: E_ApplicationSettings;
	manageAccountTitle: G_Text;
	trackingParams: string;
	channelHandle: G_Text;
};
type R_ActiveAccountHeader={activeAccountHeaderRenderer: D_ActiveAccountHeader;};
type RS_AccountMenu={
	responseContext: RC_ResponseContext;
	actions: A_GetSystemMenu[];
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
	// responseContext,contents,header,metadata,trackingParams,topbar,microformat,onResponseReceivedActions,frameworkUpdates
	responseContext: RC_ResponseContext;
	contents?: G_BrowseContents;
	header?: G_BrowseHeader;
	// continuationContents,metadata,trackingParams,microformat,onResponseReceivedActions,frameworkUpdates
	continuationContents?: RC_SectionList;
	alerts?: R_AlertWithButton[];
	metadata?: G_Browse_MD;
	trackingParams: string;
	onResponseReceivedEndpoints?: C_ReloadContinuationItems[];
	topbar?: R_DesktopTopbar;
	microformat?: R_MicroformatData;
	frameworkUpdates?: DC_EntityBatchUpdate;
	maxAgeStoreSeconds?: number;
	background?: R_MusicThumbnail;
	onResponseReceivedActions?: GA_ResponseReceived[];
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
	microformat: R_MicroformatData;
	onResponseReceivedActions?: C_ResetChannelUnreadCount[];
	cacheMetadata?: D_Cache_MD;
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
	frameworkUpdates: D_FrameworkUpdates;
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
	frameworkUpdates?: D_FrameworkUpdates;
};
type D_PaidContentOverlay={
	text: G_Text;
	durationMs: "10000";
	navigationEndpoint: E_Url;
	icon: T_Icon<"MONEY_HAND">;
	trackingParams: string;
};

type R_PaidContentOverlay={
	paidContentOverlayRenderer: D_PaidContentOverlay;
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
	storyboards?: G_PlayerStoryboards;
	microformat?: R_PlayerMicroformat;
	cards?: R_CardCollection;
	trackingParams: string;
	attestation?: R_PlayerAttestation;
	videoQualityPromoSupportedRenderers?: R_VideoQualityPromo;
	adPlacements?: T_AnyObjectOrEmpty<R_AdPlacement>[];
	frameworkUpdates?: D_FrameworkUpdates;
	endscreen?: R_Endscreen;
	paidContentOverlay?: R_PaidContentOverlay|R_PaidContentOverlay;
	annotations?: R_PlayerAnnotationsExpanded[];
	cacheMetadata?: D_IsCacheHit;
};
type RS_Playlist={
	responseContext: RC_ResponseContext;
	contents: R_TwoColumnBrowseResults;
	header: R_PlaylistHeader;
	alerts?: R_AlertWithButton[];
	metadata: R_Playlist_MD;
	trackingParams: string;
	topbar: R_DesktopTopbar;
	microformat: R_MicroformatData;
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
	entries: T_Command_TP<E_VE37414_ReelWatch>[];
	prevEntries?: T_Command_TP<E_VE37414_ReelWatch>[];
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
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
type RS_Success={
	responseContext: RC_ResponseContext;
	success: boolean;
};
type RS_Unsubscribe={
	responseContext: RC_ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup_Empty|AU_SubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
type RS_Search_1={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: RC_MusicShelf;
	trackingParams: string;
	header?: R_MusicHeader;
};
type RS_SearchApi=RS_Search_1|RS_Search;
type RS_UpdateMetadata={
	responseContext: RC_ResponseContext;
	continuation: CD_TimedContinuation;
	actions: UMA_Item[];
};
//#endregion
//#region Response page

type RS_Page_Settings={
	page: "settings";
	endpoint: E_VE23462;
	response: RS_Settings;
	url: string;
};
type RS_VE23462_Page_Settings={
	page: "settings";
	endpoint: E_VE23462;
	response: RS_Settings;
	url: string;
	rootVe: 23462;
};
type RS_Page_Shorts={
	page: "shorts";
	endpoint: E_VE37414_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse?: RS_ReelWatchSequence;
	url: `/shorts/${string}`;
	previousCsn?: string;
	cachedReelWatchSequenceResponse?: RS_ReelWatchSequence;
};
// cspell: ignoreRegExp /"([A-Za-z0-9]{27})\."/
type RS_Page_Watch={
	page: "watch";
	endpoint: E_Watch;
	response: RS_Watch;
	playerResponse: RS_Player;
	url: D_WatchPageUrl;
	previousCsn?: string;
	csn?: "MC4wMjg2Nzc5NzkwNzQ3NjQ1NDg.";
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
}|{
	rootVe: 3854;
	url: "/";
	endpoint: GE_Browse;
	page: "browse";
	response: RS_Browse;
	expirationTime: number;
};
type R_ChannelMetadata=R_Channel_MD;
type RS_Page_Channel_1={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: `/@${string}`;
	previousCsn: string;
	expirationTime: number;
};

type RS_Page_Channel_2={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: GU_VE3611_2;
	expirationTime: number;
};

type RS_Page_Channel_3={
	rootVe: 3611;
	url: GU_VE3611_3;
	endpoint: E_VE3611;
	page: "channel";
	response: RS_Channel;
	expirationTime: number;
	csn?: string;
};

type RS_Page_Channel_4={
	page: "channel";
	endpoint: E_VE3611;
	response: RS_Channel;
	url: `/@${string}`;
	expirationTime: number;
	graftedVes: D_GraftedVeItem[];
	csn: string;
};
type RS_ChannelPage=
	|RS_Page_Channel_1
	|RS_Page_Channel_2
	|RS_Page_Channel_3
	|RS_Page_Channel_4
	|{
		page: "channel";
		endpoint: E_VE3611;
		response: {
			responseContext: RC_ResponseContext;
			contents: R_TwoColumnBrowseResults;
			header: R_C4TabbedHeader;
			metadata: R_ChannelMetadata;
			trackingParams: string;
			topbar: R_DesktopTopbar;
			microformat: R_MicroformatData;
		};
		url: "/@SBMowingShorts/featured";
		expirationTime: number;
	}
	;
;
type RS_Page_Playlist_R={
	page: "playlist";
	endpoint: E_VE5754;
	response: RS_Playlist;
	url: "/playlist?list=WL";
};
type RS_PlaylistPage={
	page: "playlist";
	endpoint: E_VE5754;
	response: {
		responseContext: RC_ResponseContext;
		contents: R_TwoColumnBrowseResults;
		header: R_PlaylistHeader;
		metadata: R_Playlist_MD;
		trackingParams: string;
		topbar: R_DesktopTopbar;
		microformat: R_MicroformatData;
		sidebar: R_PlaylistSidebar;
	};
	url: "/playlist?list=WL";
};
type RS_SearchPage={
	page: "search";
	endpoint: E_Search;
	response: RS_Search;
	url: D_ResultsPageUrl;
};
//#endregion
//#region Response with {rootVe:number}
type RS_VE3832_Page_Watch={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [DU_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
	csn?: string;
};
type RS_VE5754_Page_Playlist={
	page: "playlist";
	endpoint: E_VE5754;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
type RS_VE37414_Shorts={
	page: "shorts";
	endpoint: E_VE37414_ReelWatch;
	response: RS_Reel;
	playerResponse: RS_Player;
	reelWatchSequenceResponse: RS_ReelWatchSequence|undefined;
	url: `/shorts/${string}`;
	cachedReelWatchSequenceResponse: RS_ReelWatchSequence;
	rootVe: 37414;
};
//#endregion
