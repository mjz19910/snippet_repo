//#region TemplateStrings
type T_MixPlaylistStr=`RD${string}`;
//#endregion
//#region GU_VE
//#endregion
// TODO: #8 Get the SettingsEndpoint type
type E_Settings={_tag:"E_Settings"};
type GE_Browse=
	|E_VE3611_Browse
	|E_VE3854_Browse
	|E_VE5754_Browse
	|E_VE6827_Browse
	|E_VE11487_Browse
	|E_VE23462_Browse
	|E_VE42352_Browse
	|E_VE96368_Browse
	;
;
type SE_CreatePlaylist=TE_Endpoint_3<"createPlaylistServiceEndpoint",DS_CreatePlaylist,M_CreatePlaylist>;
type SE_ShareEntity=TE_Endpoint_3<"shareEntityServiceEndpoint",D_ShareEntityService,M_GetSharePanel>;
type SE_Signal_SubscribeButton=TE_Endpoint_3<"signalServiceEndpoint",G_ClientSignal,M_SendPost>;
type SE_Signal_SendPost=T_SE_Signal<M_SendPost,G_ClientSignal>;

type EX_GetNotificationMenuRequest=T_SE_Signal<M_GetNotificationMenu,Signal_GetNotificationsMenu>;

type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
// TODO #4
type DC_PlaylistPanel={};
type C_SectionList={sectionListContinuation: DC_SectionList;};
type T_DC_Content<T>={trackingParams: string; contents: T[];};
type T_DC_Content_2<T extends string,U>={trackingParams: string; targetId: T; contents: U[];};
type T_DC_Content_3<SectionId_T extends string,TargetId_T extends string,T_Content>={contents: T_Content[]; trackingParams: string; sectionIdentifier: SectionId_T; targetId: TargetId_T;};
type DC_SectionList=
	|DC_SectionListBase
	|DC_SectionList_SearchFeed
	|DC_SectionList_BrowseFeed_ChannelFeatured
	|DC_SectionList_BrowseFeed_Subscriptions
	;
type DC_SectionList_T=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_SearchFeed=T_DC_Content_2<"search-feed",TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_BrowseFeed_Subscriptions=T_DC_Content_2<"browse-feedFEsubscriptions",TR_SectionListItem_3<{},{},{}>>;
type DC_SectionList_BrowseFeed_ChannelFeatured=T_DC_Content_2<`browse-feedUC${string}featured`,TR_SectionListItem_3<{},{},{}>>;
type DC_SectionListBase=T_DC_Content<TR_SectionListItem_3<{},{},{}>>;
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type DC_LiveChat={
	continuations: G_LiveChatContinuationItem[];
	actions?: G_RA_LiveChatContinuationActions[];
	actionPanel?: R_LiveChatMessageInput;
	itemList?: R_LiveChatItemList;
	header?: R_LiveChatHeader;
	ticker?: R_LiveChatTicker;
	trackingParams: string;
	participantsList?: R_LiveChatParticipantsList;
	popoutMessage?: R_Message;
	emojis?: D_LiveChatEmoji[];
	clientMessages?: D_ClientMessages;
	viewerName?: string;
};
type RC_MusicShelf={musicShelfContinuation: {};};
type DC_Generic={continuation: string;};
type DC_Invalidation={
	invalidationId: D_InvalidationId;
	timeoutMs: 10000;
	continuation: string;
	clickTrackingParams?: string;
};
type DC_LiveChatReplay={
	timeUntilLastMessageMsec: number;
	continuation: string;
};
type DC_Timed={
	timeoutMs: 60000;
	continuation: string;
};

type D_EngagementPanelSectionList=
	|G_SI_DB_EngagementPanel
	|SI_VE76278_EngagementPanel
	|SI_VE99999_EngagementPanel
	|SI_VE124975_EngagementPanel
	|SI_VE126250_EngagementPanel
	|SI_VE139722_EngagementPanel
	;
;
type G_EngagementPanelSectionShowCommands=A_ChangeEngagementPanelVisibility|A_ShowEngagementPanelScrim|C_ScrollToEngagementPanel;
type AC_Executor=[
	A_ChangeEngagementPanelVisibility,
	A_HideEngagementPanelScrim,
	C_ScrollToEngagementPanel,
	C_Loop,
	C_UpdateToggleButtonState,
	TA_OpenPopup_Empty,
][number];
type DC_UpdateToggleButtonState={
	toggled: false;
	buttonId: "TOGGLE_BUTTON_ID_TYPE_STRUCTURED_DESCRIPTION";
};

type C_UpdateToggleButtonState={
	clickTrackingParams: string;
	updateToggleButtonStateCommand: DC_UpdateToggleButtonState;
};
type GC_EngagementPanelSectionShow=
	|A_ChangeEngagementPanelVisibility
	|A_ShowEngagementPanelScrim
	|C_ScrollToEngagementPanel
	;
;
type C_ScrollToEngagementPanel={clickTrackingParams: string; scrollToEngagementPanelCommand: DC_ScrollToEngagementPanel;};
type D_EngagementPanelSectionShortsComments=Record<"content",R_SectionList>&{
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "shorts-comments-panel";
	};
	loggingDirectives: {};
	targetId: "shorts-comments-panel";
	veType: 139722;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelSectionTargetId=T_TargetIdStr<
	"engagement-panel",[
		"ads",
		"clip-create",
		"structured-description",
		"comments-section",
		"macro-markers-description-chapters",
	][number]
>;
type D_EngagementPanelStructuredDescription=Record<"content",{}>&{
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "engagement-panel-structured-description";
	};
	loggingDirectives: {};
	targetId: "engagement-panel-structured-description";
	veType: 124975;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelTargetId="engagement-panel-comments-section"|"engagement-panel-clip-view"|"engagement-panel-clip-create"|"engagement-panel-structured-description"|"engagement-panel-macro-markers-auto-chapters"|"engagement-panel-macro-markers-description-chapters";
type D_EngagementPanelVisibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";

type D_TargetIdStr=[
	AD_AppendContinuationItems['targetId'],
	TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>['targetId'],
	"comments-section",
	"search-feed",
	D_EngagementPanelSectionTargetId,
	DC_ScrollToEngagementPanel['targetId'],
	RS_Search['targetId'],
	D_TranscriptSearchPanel['targetId'],
	AD_UpdateEngagementPanel['targetId'],
	A_WatchNextContinuation['targetId'],
	D_ChipCloudChip_tid['targetId'],
	`shopping_panel_for_entry_point_${"5"|"22"}`,
	"clip-info-button",
	"sponsorships-button",
	D_Menu_TargetId,
	G_SI_DB_EngagementPanel['targetId'],
	D_Button_TargetId,
][number];
type D_UiTargetId="browse-feedFEwhat_to_watch"|"watch-next-feed";
type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
type R_VE5754_PlaylistPage={
	page: "playlist";
	endpoint: GE_Browse;
	response: RS_Playlist;
	url: string;
	rootVe: 5754;
};
type R_WatchPage_VE3832={
	rootVe: 3832;
	url: D_WatchPageUrl;
	endpoint: E_Watch;
	page: "watch";
	preconnect?: [D_VE3832_PreconnectUrl];
	playerResponse: RS_Player;
	response: RS_Watch;
};
